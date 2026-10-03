const config = require("./src/config");
const persistence = require("./src/data/persistence");
const { createApp } = require("./src/app");

if (process.env.NODE_ENV === "production") {
  const missing = ["PREVIEW_COOKIE_SECRET", "SESSION_SECRET"].filter(key => String(process.env[key] || "").trim().length < 32);
  if (missing.length) {
    console.error(`[prelansare] lipsesc secretele: ${missing.join(", ")}. Site-ul rămâne închis până le pui în DirectAdmin.`);
  }
}

const { app, restored } = createApp();
const { run: prelansare } = require("./src/ops/prelansare");
for (const item of prelansare().items) {
  if (!item.ok) {
    console.log(`[prelansare] ${item.key}: ${item.required ? "lipsește, site-ul rămâne închis" : "opțional, lipsește"}`);
  }
}

const { ensureRecentBackup } = require("./src/ops/backup");
const freshBackup = ensureRecentBackup();
if (!freshBackup.ok) console.error(`[backup] ${freshBackup.reason}`);

const { smtpConfigured } = require("./src/notify/deliver");
const { recordMailCode } = require("./src/ops/errorMonitor");
recordMailCode(smtpConfigured() ? "smtp_configured" : "smtp_unconfigured");

const server = app.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} backend listening on http://localhost:${config.PORT}`);
  const { isSiteClosed } = require("./src/middleware/comingSoon");
  console.log(`Site public: ${isSiteClosed() ? "ÎNCHIS (în curând)" : "deschis"}`);
  console.log(`Staging auth: ${(config.STAGING_AUTH_USER && config.STAGING_AUTH_PASSWORD) ? "activă" : "inactivă"}`);
  console.log(restored.loaded
    ? `Date: restaurate din ${persistence.DATA_FILE} (salvate la ${restored.savedAt})`
    : `Date: pornire pe curat (${restored.reason}); voi salva în ${persistence.DATA_FILE}`);
});

function shutdown(signal) {
  return () => {
    console.log(`${signal} primit, opresc serverul...`);
    persistence.stopAutosave();
    const result = persistence.saveNow();
    console.log(result.saved ? `Date salvate (${result.bytes} bytes).` : `Date nesalvate: ${result.reason}.`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  };
}

process.on("SIGTERM", shutdown("SIGTERM"));
process.on("SIGINT", shutdown("SIGINT"));
