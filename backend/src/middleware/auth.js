// Middleware de autentificare și autorizare.
//
// Înainte de asta, fiecare rută își lua utilizatorul din `user_id` trimis de
// client (`req.query.user_id || 'demo_user'`), deci oricine putea citi sau
// modifica datele oricui, doar schimbând un parametru. Identitatea vine acum
// exclusiv din cookie-ul de sesiune, semnat server-side și imposibil de
// falsificat din browser.

const { getSession, findAccount, isConsentGranted } = require("../data/authStore");
const { getParentSession } = require("../data/consentStore");

const SESSION_COOKIE = "s10_session";
const PARENT_COOKIE = "s10_parent";

// Parser minimal de cookie-uri, ca să nu adăugăm dependința `cookie-parser`
// pentru un singur cookie.
function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() === name) {
      return decodeURIComponent(part.slice(separator + 1).trim());
    }
  }
  return null;
}

// Atașează utilizatorul dacă există o sesiune validă, fără să blocheze
// cererea. Rutele publice pot astfel personaliza răspunsul, iar cele
// protejate folosesc `authRequired` mai jos.
function attachUser(req, res, next) {
  req.auth = null;
  const token = readCookie(req, SESSION_COOKIE);
  const session = getSession(token);
  if (!session) return next();

  const account = findAccount(session.email);
  if (!account) return next(); // contul a dispărut (ex. restart de proces)

  req.auth = { email: account.email, role: account.role, account };
  req.sessionToken = token;
  next();
}

function authRequired(req, res, next) {
  if (!req.auth) {
    return res.status(401).json({ error: "Autentificare necesară.", code: "unauthenticated" });
  }
  next();
}

const STUDENTS_ONLY = {
  error: "Mentor AI este doar pentru elevi. Părinții primesc email cu activitatea copilului, fără cont.",
  code: "students_only"
};

function consentRequired(req, res, next) {
  if (!req.auth) {
    return res.status(401).json({ error: "Autentificare necesară.", code: "unauthenticated" });
  }
  if (!isConsentGranted(req.auth.account)) {
    return res.status(403).json({ error: "consent_pending" });
  }
  next();
}

function parentRequired(req, res, next) {
  const token = readCookie(req, PARENT_COOKIE);
  const session = getParentSession(token);
  if (!session) {
    return res.status(401).json({ error: "Autentificare necesară.", code: "unauthenticated" });
  }
  const account = findAccount(session.email);
  if (!account || account.role !== "parent") {
    return res.status(401).json({ error: "Autentificare necesară.", code: "unauthenticated" });
  }
  req.parentAuth = { email: account.email, role: "parent", account, token };
  next();
}

function studentRequired(req, res, next) {
  if (!req.auth) {
    return res.status(401).json({ error: "Autentificare necesară.", code: "unauthenticated" });
  }
  if (req.auth.role !== "student") {
    return res.status(403).json(STUDENTS_ONLY);
  }
  next();
}

// Verifică rolul DUPĂ autentificare. Rolul vine din contul stocat pe server,
// nu din body-ul cererii, deci un client nu poate pretinde că e profesor.
function roleGuard(...roles) {
  return (req, res, next) => {
    if (!req.auth) {
      return res.status(401).json({ error: "Autentificare necesară.", code: "unauthenticated" });
    }
    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({
        error: "Contul tău nu are acces la această resursă.",
        code: "forbidden_role"
      });
    }
    next();
  };
}

module.exports = {
  SESSION_COOKIE,
  PARENT_COOKIE,
  readCookie,
  attachUser,
  authRequired,
  studentRequired,
  consentRequired,
  parentRequired,
  roleGuard,
  STUDENTS_ONLY
};
