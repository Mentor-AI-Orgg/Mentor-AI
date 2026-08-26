const express = require("express");
const path = require("path");
const config = require("./src/config");

const chatRoute = require("./src/routes/chat");
const detectRoute = require("./src/routes/detect");
const wolframRoute = require("./src/routes/wolfram");
const mathpixRoute = require("./src/routes/mathpix");
const subscriptionsRoute = require("./src/routes/subscriptions");
const healthRoute = require("./src/routes/health");
const leaderboardRoute = require("./src/routes/leaderboard");
const calendarRoute = require("./src/routes/calendar");
const flashcardsRoute = require("./src/routes/flashcards");
const diagnosticsRoute = require("./src/routes/diagnostics");
const economyRoute = require("./src/routes/economy");
const authRoute = require("./src/routes/auth");
const linksRoute = require("./src/routes/links");
const accountRoute = require("./src/routes/account");
const { spec: openapiSpec } = require("./src/openapi");
const { basicAuth } = require("./src/middleware/basicAuth");
const { attachUser, authRequired } = require("./src/middleware/auth");
const { corsAllowlist } = require("./src/middleware/corsAllowlist");
const { generalApiLimiter, chatLimiter, detectLimiter } = require("./src/middleware/rateLimits");
const persistence = require("./src/data/persistence");

// Toate store-urile s-au înregistrat la persistence în momentul require-urilor
// de mai sus, deci acum putem restaura starea salvată. Trebuie făcut înainte de
// a accepta cereri, ca prima cerere să vadă datele complete.
const restored = persistence.load();
persistence.startAutosave();

const app = express();

// În producție aplicația rulează în spatele unui proxy (LiteSpeed/Passenger pe
// CloudLinux), deci protocolul și IP-ul real ajung prin headere X-Forwarded-*.
app.set("trust proxy", 1);

app.use(basicAuth({
  user: config.STAGING_AUTH_USER,
  password: config.STAGING_AUTH_PASSWORD,
  skipPaths: ["/api/health", "/api/v1/health"]
}));

app.use(corsAllowlist);
app.use(express.json({ limit: "10mb" }));
app.use("/api", generalApiLimiter);

const frontendDir = path.join(__dirname, "..", "frontend");

// Identifică utilizatorul din cookie-ul de sesiune, fără să blocheze cererea.
app.use(attachUser);

function mountApi(prefix) {
  app.get(`${prefix}/openapi.json`, (req, res) => res.json(openapiSpec));
  app.get(prefix, (req, res) => res.json({
    name: config.APP_NAME,
    version: config.APP_VERSION,
    ok: true,
    spec: `${prefix}/openapi.json`
  }));

  app.use(`${prefix}/auth`, authRoute);
  app.use(`${prefix}/health`, healthRoute);
  app.use(`${prefix}/leaderboard`, leaderboardRoute);

  app.use(`${prefix}/chat`, authRequired, chatLimiter, chatRoute);
  app.use(`${prefix}/detect`, authRequired, detectLimiter, detectRoute);
  app.use(`${prefix}/wolfram`, authRequired, wolframRoute);
  app.use(`${prefix}/mathpix`, authRequired, mathpixRoute);
  app.use(`${prefix}/flashcards`, authRequired, flashcardsRoute);
  app.use(`${prefix}/diagnostics`, authRequired, diagnosticsRoute);
  app.use(`${prefix}/calendar`, authRequired, calendarRoute);
  app.use(`${prefix}/economy`, authRequired, economyRoute);
  app.use(`${prefix}/links`, authRequired, linksRoute);
  app.use(`${prefix}/account`, authRequired, accountRoute);
  app.use(`${prefix}/subscriptions`, subscriptionsRoute);
}

// `/api` rămâne calea pe care o folosește frontend-ul. `/api/v1` este același
// contract, ca un client să poată ancora o versiune explicită.
mountApi("/api");
mountApi("/api/v1");

app.use(express.static(frontendDir));

app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

const server = app.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} backend listening on http://localhost:${config.PORT}`);
  console.log(`Staging auth: ${(config.STAGING_AUTH_USER && config.STAGING_AUTH_PASSWORD) ? "activă (site protejat prin parolă)" : "INACTIVĂ (site public)"}`);
  console.log(`Claude:  ${config.CLAUDE_KEY ? "real key detected" : "no CLAUDE_KEY set -> using mock replies"}`);
  console.log(`OpenAI:  ${config.OPENAI_KEY ? "real key detected" : "no OPENAI_KEY set -> using mock replies"}`);
  console.log(`Gemini:  ${config.GEMINI_KEY ? "real key detected" : "no GEMINI_KEY set -> using mock replies"}`);
  console.log(`Wolfram: ${config.WOLFRAM_KEY ? "real key detected" : "no WOLFRAM_KEY set -> using mock replies"}`);
  console.log(`Mathpix: ${(config.MATHPIX_APP_ID && config.MATHPIX_APP_KEY) ? "real keys detected" : "no MATHPIX keys set -> using mock replies"}`);
  console.log(restored.loaded
    ? `Date: restaurate din ${persistence.DATA_FILE} (salvate la ${restored.savedAt})`
    : `Date: pornire pe curat (${restored.reason}); voi salva în ${persistence.DATA_FILE}`);
});

// Passenger oprește procesul cu SIGTERM la fiecare redeploy sau când aplicația
// intră în idle. Închidem conexiunile în curs înainte de ieșire, cu un timeout
// de siguranță dacă vreo conexiune rămâne agățată.
function shutdown(signal) {
  return () => {
    console.log(`${signal} primit, opresc serverul...`);
    // Salvăm sincron înainte de ieșire: altfel s-ar pierde tot ce s-a schimbat
    // de la ultimul autosave, iar Passenger oprește procesul la fiecare deploy.
    persistence.stopAutosave();
    const result = persistence.saveNow();
    console.log(result.saved ? `Date salvate (${result.bytes} bytes).` : `Date nesalvate: ${result.reason}.`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  };
}

process.on("SIGTERM", shutdown("SIGTERM"));
process.on("SIGINT", shutdown("SIGINT"));