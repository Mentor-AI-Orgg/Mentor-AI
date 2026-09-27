// Verifică ce lipsește înainte de lansare. Nu oprește procesul:
// site-ul închis trebuie să răspundă chiar dacă SMTP nu e configurat.

const { smtpConfigured } = require("../notify/deliver");

function checklist(env = process.env) {
  const value = key => String(env[key] || "").trim();
  return [
    { key: "PREVIEW_PASSWORD", ok: Boolean(value("PREVIEW_PASSWORD")), required: true },
    { key: "PREVIEW_COOKIE_SECRET", ok: Boolean(value("PREVIEW_COOKIE_SECRET")), required: true },
    { key: "LEGAL_CONTACT", ok: Boolean(value("LEGAL_CONTACT")), required: false },
    { key: "SMTP", ok: smtpConfigured(), required: false }
  ];
}

function report(items = checklist()) {
  return items.map(item => {
    const state = item.ok ? "setat" : (item.required ? "LIPSEȘTE" : "opțional, lipsește");
    return `${item.key}: ${state}`;
  }).join("\n");
}

function run(env = process.env) {
  const items = checklist(env);
  const text = report(items);
  return { ok: true, items, text };
}

if (require.main === module) {
  const result = run();
  console.log(result.text);
  console.log("Prelansarea nu oprește aplicația. SMTP lipsă înseamnă emailuri de probă, nu o eroare de pornire.");
  process.exit(0);
}

module.exports = { checklist, report, run };
