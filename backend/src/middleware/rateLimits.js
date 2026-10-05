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
    || /\/api(?:\/v1)?\/health/.test(req.originalUrl),
  handler: romanianHandler("Prea multe cereri. Încearcă din nou în câteva minute.")
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  ...common,
  handler: (req, res) => {
    const reset = req.rateLimit && req.rateLimit.resetTime ? new Date(req.rateLimit.resetTime).getTime() : 0;
    const seconds = reset ? Math.max(1, Math.ceil((reset - Date.now()) / 1000)) : 60;
    res.status(429).json({
      error: `Prea multe încercări de conectare. Mai încearcă în ${seconds} secunde.`,
      retryAfter: seconds,
      code: "rate_limited"
    });
  }
});

// Întrebările către tutore (chat și lecție) sunt limitate în
// safety/tutorQuota.js: 10 pe minut și 60 pe oră, pe cont, fără blocare.

const accessCodeVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  ...common,
  keyGenerator: req => (req.auth && req.auth.email) || req.ip,
  handler: romanianHandler("Prea multe încercări de verificare a codului. Așteaptă înainte să reîncerci.")
});

const usernameCheckLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  ...common,
  handler: romanianHandler("Prea multe verificări de nume. Încearcă din nou peste câteva minute.")
});

const clientErrorLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  ...common,
  handler: romanianHandler("Prea multe raportări de eroare. Încearcă din nou mai târziu.")
});

// POST /creator verifică parola înainte de limiterul de pe /api.
// Fără limita asta, parola unică de creator poate fi încercată la nesfârșit.
const PREVIEW_PASSWORD_MAX = 10;

const previewPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: PREVIEW_PASSWORD_MAX,
  ...common,
  skip: () => skipInTests() && process.env.ENFORCE_PREVIEW_LIMIT !== "1",
  handler: romanianHandler("Prea multe încercări de parolă. Așteaptă înainte să reîncerci.")
});

module.exports = {
  generalApiLimiter,
  authLimiter,
  clientErrorLimiter,
  usernameCheckLimiter,
  accessCodeVerifyLimiter,
  previewPasswordLimiter,
  PREVIEW_PASSWORD_MAX
};
