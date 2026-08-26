// CORS restrictiv: cookie-ul de sesiune (`credentials: include`) nu trebuie
// acceptat de pe origini oarecare. `app.use(cors())` reflecta orice Origin,
// deci un site terț putea face cereri autentificate în numele vizitatorului.
//
// Cereri fără header Origin (curl, health check, same-origin fără preflight)
// trec. Restul trebuie să fie pe listă, pe același host, sau (în development)
// pe localhost.

const cors = require("cors");
const config = require("../config");

function isAllowedOrigin(origin, req) {
  if (!origin) return true;

  if (config.CORS_ORIGINS.includes(origin)) return true;

  try {
    const url = new URL(origin);
    const requestHost = String(req.headers.host || "").split(":")[0];
    if (url.hostname === requestHost) return true;
    if (!config.IS_PRODUCTION && (url.hostname === "localhost" || url.hostname === "127.0.0.1")) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

function corsAllowlist(req, res, next) {
  return cors({
    origin(origin, callback) {
      callback(null, isAllowedOrigin(origin, req));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })(req, res, next);
}

module.exports = { corsAllowlist, isAllowedOrigin };
