// Limitare de rată pe IP. `trust proxy` este deja setat în server.js, deci
// identificarea se face pe X-Forwarded-For (IP-ul real din spatele LiteSpeed).
//
// Limitele sunt gândite pentru un prototip educațional, nu pentru un atac
// distribuit: opresc enumerarea parolelor, brute-force pe OTP și spam-ul
// către providerii de AI (care se plătesc per cerere).

const rateLimit = require("express-rate-limit");

const romanianHandler = (message) => (_req, res) => {
  res.status(429).json({ error: message, code: "rate_limited" });
};

// Dezactivăm validările stricte de IP din express-rate-limit: suntem în spatele
// unui singur proxy (Passenger) și folosim keyGenerator pe email unde există sesiune.
const skipInTests = () => process.env.NODE_ENV === "test" || process.env.VITEST === "true";

const common = {
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  skip: skipInTests
};

const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  ...common,
  skip: req => skipInTests()
    || /\/health$/.test(req.path)
    || /\/api(?:\/v1)?\/health/.test(req.originalUrl)
    || /\/subscriptions\/webhook$/.test(req.path)
    || /\/calendar\/oauth\/[^/]+\/callback$/.test(req.path),
  handler: romanianHandler("Prea multe cereri. Încearcă din nou în câteva minute.")
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  ...common,
  handler: romanianHandler("Prea multe încercări de autentificare. Așteaptă câteva minute.")
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  ...common,
  keyGenerator: req => (req.auth && req.auth.email) || req.ip,
  handler: romanianHandler("Ai trimis prea multe mesaje. Așteaptă un moment înainte să continui.")
});

const accessCodeVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  ...common,
  keyGenerator: req => (req.auth && req.auth.email) || req.ip,
  handler: romanianHandler("Prea multe încercări de verificare a codului. Așteaptă înainte să reîncerci.")
});

const detectLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  ...common,
  keyGenerator: req => (req.auth && req.auth.email) || req.ip,
  handler: romanianHandler("Prea multe analize. Încearcă din nou într-un minut.")
});

module.exports = {
  generalApiLimiter,
  authLimiter,
  chatLimiter,
  accessCodeVerifyLimiter,
  detectLimiter
};
