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
const { spec: openapiSpec } = require("./openapi");
const { basicAuth } = require("./middleware/basicAuth");
const { attachUser, authRequired } = require("./middleware/auth");
const { corsAllowlist } = require("./middleware/corsAllowlist");
const { generalApiLimiter, chatLimiter, detectLimiter } = require("./middleware/rateLimits");
const persistence = require("./data/persistence");

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
    skipPaths: ["/api/health", "/api/v1/health"]
  }));

  app.use(corsAllowlist);
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
