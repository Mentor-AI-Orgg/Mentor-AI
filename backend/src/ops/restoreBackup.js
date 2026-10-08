// Restaurează ultimul backup criptat peste fișierul de date.
// Se rulează de mână: node backend/src/ops/restoreBackup.js
// În STORE=mysql scrie rândurile din copia rapidă, nu un fișier.

const fs = require("fs");
const persistence = require("../data/persistence");

function readRolling() {
  const { backupKeyConfigured, decrypt } = require("./backupCrypto");
  const files = [`${persistence.DATA_FILE}.bak1.enc`, `${persistence.DATA_FILE}.bak1`];
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file);
    if (file.endsWith(".enc")) {
      if (!backupKeyConfigured()) throw new Error("BACKUP_KEY lipsește");
      return decrypt(raw).toString("utf8");
    }
    return raw.toString("utf8");
  }
  return "";
}

function restoreMysql() {
  require("../data/loadUserStores");
  const text = readRolling();
  if (!text) return { ok: false, reason: "no_backup" };
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, reason: "corrupt" };
  }
  persistence.load();
  const saved = persistence.importDocument(parsed);
  if (!saved.saved && saved.reason !== "unchanged") return { ok: false, reason: saved.reason || "failed" };
  return { ok: true, reason: "mysql" };
}

function restoreBackup() {
  if (require("../data/storeMode").storeMode() === "mysql") return restoreMysql();
  if (!fs.existsSync(`${persistence.DATA_FILE}.bak1.enc`) && !fs.existsSync(`${persistence.DATA_FILE}.bak1`)) {
    return { ok: false, reason: "no_backup" };
  }
  const broken = `${persistence.DATA_FILE}.inainte-de-restaurare`;
  if (fs.existsSync(persistence.DATA_FILE)) {
    fs.copyFileSync(persistence.DATA_FILE, broken);
    fs.rmSync(persistence.DATA_FILE);
  }
  const restored = persistence.load();
  if (!restored.loaded) return { ok: false, reason: restored.reason || "failed" };
  persistence.saveNow();
  return { ok: true, reason: restored.reason || "backup" };
}

if (require.main === module) {
  const result = restoreBackup();
  if (!result.ok) {
    console.error(`Nu am putut restaura (${result.reason}).`);
    process.exit(1);
  }
  console.log("Datele au fost restaurate din backup.");
  process.exit(0);
}

module.exports = { restoreBackup };
