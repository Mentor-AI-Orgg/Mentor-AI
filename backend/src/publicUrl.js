const config = require("./config");
const { canonicalAppBaseUrl, productionBaseUrlError } = require("./appBaseUrl");

// URL-ul public al aplicației, folosit în linkurile din email
// (acord, parolă, magic link de părinte).
// În producție singura sursă este APP_BASE_URL. Host și X-Forwarded-Host
// nu sunt de încredere: un client le poate falsifica și fura un link
// de unică folosință.
// În development și în teste, dacă APP_BASE_URL lipsește, rămâne
// originea din request sau localhost.
function configuredBaseUrl() {
  const fromEnv = process.env.APP_BASE_URL;
  const raw = fromEnv != null && String(fromEnv).trim() !== "" ? fromEnv : config.APP_BASE_URL;
  return canonicalAppBaseUrl(raw);
}

function publicBaseUrl(req) {
  if (process.env.NODE_ENV === "production") {
    const problem = productionBaseUrlError(process.env.APP_BASE_URL || config.APP_BASE_URL || "");
    if (problem) {
      throw new Error(`APP_BASE_URL ${problem}.`);
    }
    return configuredBaseUrl();
  }
  const configured = configuredBaseUrl();
  if (configured) return configured;
  const proto = String(req.headers["x-forwarded-proto"] || req.protocol || "http")
    .split(",")[0]
    .trim();
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || `localhost:${config.PORT}`)
    .split(",")[0]
    .trim();
  return `${proto}://${host}`;
}

module.exports = { publicBaseUrl };
