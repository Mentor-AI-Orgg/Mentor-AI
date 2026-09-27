const fs = require("fs");
const path = require("path");
const express = require("express");

const config = require("./config");
const chatRoute = require("./routes/chat");
const healthRoute = require("./routes/health");
const leaderboardRoute = require("./routes/leaderboard");
const calendarRoute = require("./routes/calendar");
const flashcardsRoute = require("./routes/flashcards");
const diagnosticsRoute = require("./routes/diagnostics");
const economyRoute = require("./routes/economy");
const authRoute = require("./routes/auth");
const accountRoute = require("./routes/account");
const friendsRoute = require("./routes/friends");
const moderationRoute = require("./routes/moderation");
const { spec: openapiSpec } = require("./openapi");
const { basicAuth } = require("./middleware/basicAuth");
const { comingSoon } = require("./middleware/comingSoon");
const { attachUser, authRequired, studentRequired, consentRequired } = require("./middleware/auth");
const parentRoute = require("./routes/parent");
const placementRoute = require("./routes/placement");
const mistakesRoute = require("./routes/mistakes");
const { startRetention } = require("./data/retentionJob");
const { startDigestSchedule } = require("./notify/parentActivity");
const { migrateLegacyProfiles } = require("./data/authStore");
const { corsAllowlist } = require("./middleware/corsAllowlist");
const { generalApiLimiter, chatLimiter } = require("./middleware/rateLimits");
const { securityHeaders } = require("./middleware/security");
const { requestLog } = require("./logger");
const clientErrorRoute = require("./routes/clientError");
const { newId, reportError, watchOperations } = require("./ops/errorMonitor");
const persistence = require("./data/persistence");
const curriculumRoute = require("./routes/curriculum");
const { privacyHtml, termsHtml, legalContact } = require("./legal/pages");

function createApp(options = {}) {
  const { autosave = true } = options;

  // Store-urile se înregistrează la require, deci restaurăm înainte de cereri.
  const restored = persistence.isLoaded() ? { loaded: true } : persistence.load();
  if (autosave) persistence.startAutosave();
  if (fs.existsSync(persistence.DATA_FILE)) {
    const stamp = new Date().toISOString().slice(0, 10);
    const backup = `${persistence.DATA_FILE}.pre-t1-${stamp}`;
    if (!fs.existsSync(backup)) fs.copyFileSync(persistence.DATA_FILE, backup);
  }
  migrateLegacyProfiles();
  startRetention();
  startDigestSchedule();

  const app = express();
  app.set("trust proxy", 1);
  app.use(securityHeaders());
  app.use(requestLog);

  // Formularul de intrare creator trimite parola prin POST, nu prin adresă.
  app.use(express.urlencoded({ extended: false, limit: "2kb" }));
  app.use(comingSoon());

  app.use(basicAuth({
    user: config.STAGING_AUTH_USER,
    password: config.STAGING_AUTH_PASSWORD,
    skipPaths: [
      "/api/health",
      "/api/v1/health",
      "/api/client-error",
      "/api/v1/client-error"
    ]
  }));

  app.use(corsAllowlist);

  app.use(express.json({ limit: "64kb" }));
  app.use("/api", generalApiLimiter);
  app.use(attachUser);
  app.use("/api/client-error", clientErrorRoute);
  app.use("/api/v1/client-error", clientErrorRoute);

  if (options.probeErrors) {
    app.post("/api/__boom", (req, res, next) => {
      next(new Error("boom"));
    });
  }

  function mountApi(prefix) {
    app.get(`${prefix}/openapi.json`, (req, res) => res.json(openapiSpec));
    app.get(prefix, (req, res) => res.json({
      name: config.APP_NAME,
      version: config.APP_VERSION,
      ok: true,
      spec: `${prefix}/openapi.json`
    }));

    app.use(`${prefix}/auth`, authRoute);
    app.use(`${prefix}/parent`, parentRoute);
    app.use(`${prefix}/placement`, authRequired, placementRoute);
    app.use(`${prefix}/mistakes`, authRequired, mistakesRoute);
    app.use(`${prefix}/health`, healthRoute);
    app.use(`${prefix}/leaderboard`, leaderboardRoute);
    app.use(`${prefix}/moderation`, moderationRoute);
    app.use(`${prefix}/curriculum`, curriculumRoute);

    const studentOnly = [authRequired, studentRequired];

    app.use(`${prefix}/chat`, ...studentOnly, chatLimiter, chatRoute);
    app.use(`${prefix}/flashcards`, ...studentOnly, flashcardsRoute);
    app.use(`${prefix}/diagnostics`, ...studentOnly, diagnosticsRoute);
    app.use(`${prefix}/calendar`, ...studentOnly, calendarRoute);
    app.use(`${prefix}/economy`, ...studentOnly, economyRoute);
    app.use(`${prefix}/account`, ...studentOnly, accountRoute);
    app.use(`${prefix}/friends`, ...studentOnly, consentRequired, friendsRoute);
  }

  mountApi("/api");
  mountApi("/api/v1");

  app.get("/api/legal-contact", (_req, res) => {
    res.json({ contact: legalContact() });
  });
  app.get("/api/v1/legal-contact", (_req, res) => {
    res.json({ contact: legalContact() });
  });

  app.get("/privacy.html", (req, res) => {
    res.type("html").send(privacyHtml());
  });
  app.get("/terms.html", (req, res) => {
    res.type("html").send(termsHtml());
  });

  const distDir = path.join(__dirname, "..", "..", "frontend", "dist");
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir, {
      setHeaders(res, filePath) {
        const base = path.basename(filePath);
        if (base === "sw.js" || base === "manifest.webmanifest") {
          res.setHeader("Cache-Control", "no-cache");
        } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));
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

  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const status = Number(err.status || err.statusCode) || 500;
    if (status >= 400 && status < 500) {
      return res.status(status).json({ error: status === 413 ? "too_large" : "bad_request" });
    }
    const id = newId();
    const route = String(req.originalUrl || req.url || "/").split("?")[0];
    reportError({
      id,
      status: 500,
      route,
      code: err.code || err.name || "Error",
      stack: err.stack || ""
    }).catch(() => {});
    return res.status(500).json({ error: "server_error", id });
  });

  if (process.env.NODE_ENV !== "test") watchOperations(persistence.DATA_FILE);

  return { app, restored };
}

module.exports = { createApp };
