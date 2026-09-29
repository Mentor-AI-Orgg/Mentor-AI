// Protecție temporară pentru site-ul de staging, prin HTTP Basic Auth.
//
// NU este sistemul de autentificare al aplicației și nu înlocuiește conturile
// de utilizator (vezi plan-imbunatatiri.md, Faza 1). Cât timp rutele
// identifică userul prin `user_id` trimis de client, oricine cunoaște adresa
// poate citi datele oricărui cont, inclusiv analitica despre un copil. Până
// la autentificare reală, o parolă la nivel de site ține aplicația în afara
// accesului public și a motoarelor de căutare.
//
// Se activează doar dacă AMBELE variabile de mediu sunt setate, ca să nu
// blocheze development-ul local.

const crypto = require("crypto");

// Comparație în timp constant, ca să nu scurgem informație prin durata
// răspunsului. `timingSafeEqual` cere buffere de lungime egală, deci
// verificăm lungimea separat.
function safeEqual(a, b) {
  const bufferA = Buffer.from(String(a));
  const bufferB = Buffer.from(String(b));
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

function parseCredentials(header) {
  if (!header || !header.startsWith("Basic ")) return null;
  const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  const separator = decoded.indexOf(":");
  if (separator === -1) return null;
  return { user: decoded.slice(0, separator), password: decoded.slice(separator + 1) };
}

function basicAuth({ user, password, skipPaths = [], skipPrefixes = [] }) {
  if (!user || !password) {
    return (req, res, next) => next();
  }

  return (req, res, next) => {
    // Health check-ul rămâne public, ca monitorizarea externă să poată
    // verifica serverul fără credențiale.
    // Creatorul care a trecut de pagina „În curând” nu mai ia și Basic Auth.
    if (req.previewAccess) return next();
    if (skipPaths.includes(req.path)) return next();
    if (skipPrefixes.some(prefix => req.path === prefix || req.path.startsWith(prefix))) return next();

    const credentials = parseCredentials(req.headers.authorization);
    if (credentials && safeEqual(credentials.user, user) && safeEqual(credentials.password, password)) {
      return next();
    }

    res.set("WWW-Authenticate", 'Basic realm="Sunt de 10", charset="UTF-8"');
    res.status(401).send("Acces restricționat.");
  };
}

module.exports = { basicAuth };
