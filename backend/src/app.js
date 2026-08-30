const fs = require("fs");
const path = require("path");
const express = require("express");

const config = require("./config");
const chatRoute = require("./routes/chat");
const detectRoute = require("./routes/detect");
const wolframRoute = require("./routes/wolfram");
const mathpixRoute = require("./routes/mathpix");
const subscriptionsRoute = require("./routes/subscriptions");
const healthRoute = require("./routes/health");
const leaderboardRoute = require("./routes/leaderboard");
const calendarRoute = require("./routes/calendar");
const flashcardsRoute = require("./routes/flashcards");
const diagnosticsRoute = require("./routes/diagnostics");
const economyRoute = require("./routes/economy");
const authRoute = require("./routes/auth");
const linksRoute = require("./routes/links");
const accountRoute = require("./routes/account");
const friendsRoute = require("./routes/friends");
const { spec: openapiSpec } = require("./openapi");
const { basicAuth } = require("./middleware/basicAuth");
const { attachUser, authRequired, studentRequired } = require("./middleware/auth");
const { corsAllowlist } = require("./middleware/corsAllowlist");
const { generalApiLimiter, chatLimiter, detectLimiter } = require("./middleware/rateLimits");
const persistence = require("./data/persistence");
const calendarOauthRoute = require("./routes/calendarOauth");
const curriculumRoute = require("./routes/curriculum");
const { handleStripeWebhook } = require("./payments/stripe");

function createApp(options = {}) {
  const { autosave = true } = options;

  // Store-urile se înregistrează la require, deci restaurăm înainte de cereri.
  const restored = persistence.isLoaded() ? { loaded: true } : persistence.load();
  if (autosave) persistence.startAutosave();

  const app = express();
  app.set("trust proxy", 1);

  app.use(basicAuth({
    user: config.STAGING_AUTH_USER,
    password: config.STAGING_AUTH_PASSWORD,
    skipPaths: [
      "/api/health",
      "/api/v1/health",
      "/api/subscriptions/webhook",
      "/api/v1/subscriptions/webhook",
      "/api/calendar/oauth/google/callback",
      "/api/calendar/oauth/notion/callback",
      "/api/v1/calendar/oauth/google/callback",
      "/api/v1/calendar/oauth/notion/callback"
    ]
  }));

  app.use(corsAllowlist);

  // Stripe semnează body-ul brut. Parser-ul JSON trebuie montat DUPĂ webhook.
  app.post("/api/subscriptions/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);
  app.post("/api/v1/subscriptions/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

  app.use(express.json({ limit: "10mb" }));
  app.use("/api", generalApiLimiter);
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
    app.use(`${prefix}/curriculum`, curriculumRoute);

    const studentOnly = [authRequired, studentRequired];

    app.use(`${prefix}/calendar/oauth`, calendarOauthRoute);
    app.use(`${prefix}/chat`, ...studentOnly, chatLimiter, chatRoute);
    app.use(`${prefix}/detect`, ...studentOnly, detectLimiter, detectRoute);
    app.use(`${prefix}/wolfram`, ...studentOnly, wolframRoute);
    app.use(`${prefix}/mathpix`, ...studentOnly, mathpixRoute);
    app.use(`${prefix}/flashcards`, ...studentOnly, flashcardsRoute);
    app.use(`${prefix}/diagnostics`, ...studentOnly, diagnosticsRoute);
    app.use(`${prefix}/calendar`, ...studentOnly, calendarRoute);
    app.use(`${prefix}/economy`, ...studentOnly, economyRoute);
    app.use(`${prefix}/links`, ...studentOnly, linksRoute);
    app.use(`${prefix}/account`, ...studentOnly, accountRoute);
    app.use(`${prefix}/friends`, ...studentOnly, friendsRoute);
    app.use(`${prefix}/subscriptions`, subscriptionsRoute);
  }

  mountApi("/api");
  mountApi("/api/v1");

  const distDir = path.join(__dirname, "..", "..", "frontend", "dist");
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get(/^\/(?!api\/).*/, (req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  } else {
    app.get(/^\/(?!api\/).*/, (req, res) => {
      res.status(503).type("text/plain").send(
        "Frontend-ul nu este compilat. Rulează `npm run build` sau, în development, `npm run dev`."
      );
    });
  }

  return { app, restored };
}

module.exports = { createApp };
