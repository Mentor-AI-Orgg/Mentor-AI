const helmet = require("helmet");

const CSP_MODE = "enforce";

function securityHeaders() {
  const guarded = helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        styleSrcAttr: ["'unsafe-inline'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'"],
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
      res.setHeader("Permissions-Policy", "camera=(self), microphone=(), geolocation=()");
      next();
    });
  };
}

module.exports = { securityHeaders, CSP_MODE };
