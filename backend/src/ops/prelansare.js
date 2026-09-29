// Lista de dinainte de lansare. Nu oprește procesul Node:
// site-ul închis trebuie să răspundă chiar dacă un punct e roșu.
// `npm run prelansare` iese cu cod 1 când un punct obligatoriu lipsește.

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { smtpConfigured } = require("../notify/deliver");
const { CSP_MODE } = require("../middleware/security");
const persistence = require("../data/persistence");

function value(env, key) {
  return String(env[key] || "").trim();
}

function backupFresh(now = Date.now()) {
  const file = `${persistence.DATA_FILE}.bak1.enc`;
  if (!fs.existsSync(file)) return false;
  return now - fs.statSync(file).mtimeMs < 26 * 60 * 60 * 1000;
}

function legalComplete() {
  const file = path.join(__dirname, "..", "..", "..", "shared", "legal.json");
  if (!fs.existsSync(file)) return false;
  return !fs.readFileSync(file, "utf8").includes("[DE COMPLETAT");
}

function auditClean() {
  if (process.env.PRELANSARE_SKIP_AUDIT === "1") return true;
  const result = spawnSync("npm", ["audit", "--omit=dev", "--audit-level=high"], {
    cwd: path.join(__dirname, "..", "..", ".."),
    encoding: "utf8"
  });
  return result.status === 0;
}

function checklist(env = process.env) {
  const secretOk = key => value(env, key).length >= 32;
  return [
    { key: "PREVIEW_PASSWORD", ok: Boolean(value(env, "PREVIEW_PASSWORD")), required: true },
    { key: "PREVIEW_COOKIE_SECRET", ok: secretOk("PREVIEW_COOKIE_SECRET"), required: true },
    { key: "SESSION_SECRET", ok: secretOk("SESSION_SECRET"), required: true },
    { key: "LEGAL", ok: legalComplete(), required: true },
    { key: "BACKUP_KEY", ok: value(env, "BACKUP_KEY").length >= 16, required: true },
    { key: "BACKUP_AGE", ok: backupFresh(), required: true },
    { key: "SMTP", ok: smtpConfigured(), required: true },
    { key: "CSP", ok: CSP_MODE === "enforce", required: true },
    { key: "AUDIT", ok: auditClean(), required: true },
    { key: "ADMIN_EMAIL", ok: Boolean(value(env, "ADMIN_EMAIL")), required: false },
    { key: "HEALTH_TOKEN", ok: secretOk("HEALTH_TOKEN"), required: false }
  ];
}

function report(items = checklist()) {
  return items.map(item => `${item.ok ? "✓" : "✗"} ${item.key}`).join("\n");
}

function run(env = process.env) {
  const items = checklist(env);
  const text = report(items);
  const ok = items.every(item => !item.required || item.ok);
  return { ok, items, text };
}

if (require.main === module) {
  const result = run();
  console.log(result.text);
  process.exit(result.ok ? 0 : 1);
}

module.exports = { checklist, report, run };
