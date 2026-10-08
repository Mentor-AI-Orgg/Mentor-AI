const config = require("./src/config");
const { productionBaseUrlError } = require("./src/appBaseUrl");

if (process.env.NODE_ENV === "production") {
  const problem = productionBaseUrlError(process.env.APP_BASE_URL);
  if (problem) {
    console.error(`[prelansare] APP_BASE_URL ${problem}. Opresc pornirea.`);
    process.exit(1);
  }
}

const persistence = require("./src/data/persistence");
const { storeMode } = require("./src/data/storeMode");
const { initSentry, flush: flushSentry } = require("./src/ops/sentry");
initSentry();
const { createApp } = require("./src/app");

if (process.env.NODE_ENV === "production") {
  const missing = ["PREVIEW_COOKIE_SECRET", "SESSION_SECRET"].filter(key => String(process.env[key] || "").trim().length < 32);
  if (missing.length) {
    const sitePublic = ["1", "true", "yes"].includes(String(process.env.SITE_PUBLIC || "").trim().toLowerCase());
    if (sitePublic) {
      console.error(`⚠ SITE_PUBLIC=1: site-ul e DESCHIS, dar lipsesc secretele: ${missing.join(", ")}.`);
    } else {
      console.error(`[prelansare] lipsesc secretele: ${missing.join(", ")}. Site-ul rămâne închis până le pui în DirectAdmin.`);
    }
  }
}

const { app, restored } = createApp();
const { run: prelansare, launchLog } = require("./src/ops/prelansare");
for (const line of launchLog(prelansare().items)) {
  console.error(line);
}

const { ensureRecentBackup, startDailyBackup } = require("./src/ops/backup");
const freshBackup = ensureRecentBackup();
if (!freshBackup.ok) console.error(`[backup] ${freshBackup.reason}`);
startDailyBackup();

const { smtpConfigured } = require("./src/notify/deliver");
const { recordMailCode, installProcessAlerts, reportError } = require("./src/ops/errorMonitor");
installProcessAlerts();
recordMailCode(smtpConfigured() ? "smtp_configured" : "smtp_unconfigured");

const server = app.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} backend listening on http://localhost:${config.PORT}`);
  const { isSiteClosed } = require("./src/middleware/comingSoon");
  console.log(`Site public: ${isSiteClosed() ? "ÎNCHIS (în curând)" : "deschis"}`);
  console.log(`Staging auth: ${(config.STAGING_AUTH_USER && config.STAGING_AUTH_PASSWORD) ? "activă" : "inactivă"}`);
  console.log(restored.loaded
    ? `Date: restaurate (${restored.source || storeMode()}${restored.savedAt ? `, salvate la ${restored.savedAt}` : ""})`
    : `Date: pornire pe curat (${restored.reason || "gol"}, ${storeMode()})`);
});

server.on("error", (error) => {
  reportError({
    status: 500,
    route: "listen",
    code: "health_listen",
    stack: error && error.stack ? error.stack : String(error || "")
  }).catch(() => {});
});

function shutdown(signal) {
  return () => {
    console.log(`${signal} primit, opresc serverul...`);
    persistence.stopAutosave();
    const result = persistence.saveNow();
    console.log(result.saved ? `Date salvate (${result.bytes || 0} bytes).` : `Date nesalvate: ${result.reason}.`);
    Promise.resolve(flushSentry(1500)).finally(() => {
      persistence.close();
      server.close(() => process.exit(0));
    });
    setTimeout(() => process.exit(1), 10000).unref();
  };
}

process.on("SIGTERM", shutdown("SIGTERM"));
process.on("SIGINT", shutdown("SIGINT"));
