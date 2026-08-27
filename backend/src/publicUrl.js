const config = require("./config");

// URL-ul public al aplicației, folosit pentru redirecturi Stripe și OAuth.
// Preferă APP_BASE_URL când e setat (producție). Altfel reconstruiește din
// request, ca fluxul să meargă și pe localhost / Vite proxy fără configurare.
function publicBaseUrl(req) {
  const configured = String(config.APP_BASE_URL || "").replace(/\/$/, "");
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
