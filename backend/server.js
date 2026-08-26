const express = require("express");
const cors = require("cors");
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
const { basicAuth } = require("./src/middleware/basicAuth");
const { attachUser, authRequired } = require("./src/middleware/auth");

const app = express();

// În producție aplicația rulează în spatele unui proxy (LiteSpeed/Passenger pe
// CloudLinux), deci protocolul și IP-ul real ajung prin headere X-Forwarded-*.
app.set("trust proxy", 1);

app.use(basicAuth({
  user: config.STAGING_AUTH_USER,
  password: config.STAGING_AUTH_PASSWORD,
  skipPaths: ["/api/health"]
}));

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const frontendDir = path.join(__dirname, "..", "frontend");

// Identifică utilizatorul din cookie-ul de sesiune, fără să blocheze cererea.
app.use(attachUser);

// Public: autentificare, health check, planuri de abonament, clasament.
app.use("/api/auth", authRoute);
app.use("/api/health", healthRoute);
app.use("/api/leaderboard", leaderboardRoute);

// Rutele de mai jos cer un cont. Pe lângă protejarea datelor, asta oprește și
// consumul anonim al providerilor de AI, care se plătește la fiecare cerere.
app.use("/api/chat", authRequired, chatRoute);
app.use("/api/detect", authRequired, detectRoute);
app.use("/api/wolfram", authRequired, wolframRoute);
app.use("/api/mathpix", authRequired, mathpixRoute);
app.use("/api/flashcards", authRequired, flashcardsRoute);
app.use("/api/diagnostics", authRequired, diagnosticsRoute);
app.use("/api/calendar", authRequired, calendarRoute);
app.use("/api/economy", authRequired, economyRoute);
app.use("/api/links", authRequired, linksRoute);

// Lista de planuri rămâne publică; rutele care ating un cont sunt protejate
// în interiorul router-ului.
app.use("/api/subscriptions", subscriptionsRoute);

app.use(express.static(frontendDir));

app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

app.get("/api", (req, res) => res.json({ name: config.APP_NAME, version: config.APP_VERSION, ok: true }));

const server = app.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} backend listening on http://localhost:${config.PORT}`);
  console.log(`Staging auth: ${(config.STAGING_AUTH_USER && config.STAGING_AUTH_PASSWORD) ? "activă (site protejat prin parolă)" : "INACTIVĂ (site public)"}`);
  console.log(`Claude:  ${config.CLAUDE_KEY ? "real key detected" : "no CLAUDE_KEY set -> using mock replies"}`);
  console.log(`OpenAI:  ${config.OPENAI_KEY ? "real key detected" : "no OPENAI_KEY set -> using mock replies"}`);
  console.log(`Gemini:  ${config.GEMINI_KEY ? "real key detected" : "no GEMINI_KEY set -> using mock replies"}`);
  console.log(`Wolfram: ${config.WOLFRAM_KEY ? "real key detected" : "no WOLFRAM_KEY set -> using mock replies"}`);
  console.log(`Mathpix: ${(config.MATHPIX_APP_ID && config.MATHPIX_APP_KEY) ? "real keys detected" : "no MATHPIX keys set -> using mock replies"}`);
});

// Passenger oprește procesul cu SIGTERM la fiecare redeploy sau când aplicația
// intră în idle. Închidem conexiunile în curs înainte de ieșire, cu un timeout
// de siguranță dacă vreo conexiune rămâne agățată.
function shutdown(signal) {
  return () => {
    console.log(`${signal} primit, opresc serverul...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  };
}

process.on("SIGTERM", shutdown("SIGTERM"));
process.on("SIGINT", shutdown("SIGINT"));