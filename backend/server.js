const config = require("./src/config");
const persistence = require("./src/data/persistence");
const { createApp } = require("./src/app");

const { app, restored } = createApp();
const { run: prelansare } = require("./src/ops/prelansare");
for (const item of prelansare().items) {
  if (!item.ok) {
    console.log(`[prelansare] ${item.key}: ${item.required ? "lipsește, site-ul rămâne închis" : "opțional, lipsește"}`);
  }
}

const server = app.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} backend listening on http://localhost:${config.PORT}`);
  const { isSiteClosed } = require("./src/middleware/comingSoon");
  console.log(`Site public: ${isSiteClosed() ? "ÎNCHIS (în curând)" : "deschis"}`);
  console.log(`Staging auth: ${(config.STAGING_AUTH_USER && config.STAGING_AUTH_PASSWORD) ? "activă (site protejat prin parolă)" : "INACTIVĂ"}`);
  console.log(`OpenAI:  ${config.OPENAI_KEY ? "real key detected" : "no OPENAI_KEY set -> photo review stays local"}`);
  console.log(`Mathpix: ${(config.MATHPIX_APP_ID && config.MATHPIX_APP_KEY) ? "real keys detected" : "no MATHPIX keys set -> photo review stays local"}`);
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
