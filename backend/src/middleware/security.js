const helmet = require("helmet");

const CSP_MODE = "enforce";

function sentryOrigins() {
  const origins = [];
  ["SENTRY_DSN", "VITE_SENTRY_DSN"].forEach(key => {
    const dsn = String(process.env[key] || "").trim();
    if (!dsn) return;
    try {
      const url = new URL(dsn);
      const origin = `${url.protocol}//${url.host}`;
      if (origin && !origins.includes(origin)) origins.push(origin);
    } catch {
      /* DSN invalid: nu lărgesc CSP */
    }
  });
  return origins;
}

function securityHeaders() {
  const guarded = helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cloud.umami.is"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        styleSrcAttr: ["'unsafe-inline'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:"],
        // Umami rămâne. Gazda Sentry intră doar când DSN-ul e setat.
        connectSrc: ["'self'", "https://gateway.umami.is", ...sentryOrigins()],
        workerSrc: ["'self'"],
        manifestSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    hsts: process.env.NODE_ENV === "production"
      ? { maxAge: 15552000, includeSubDomains: false }
      : false
  });

  return (req, res, next) => {
    guarded(req, res, err => {
      if (err) return next(err);
      res.setHeader("Permissions-Policy", "camera=(self), microphone=(self), geolocation=()");
      next();
    });
  };
}

module.exports = { securityHeaders, CSP_MODE, sentryOrigins };
