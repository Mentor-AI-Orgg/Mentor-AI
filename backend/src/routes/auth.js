const express = require("express");
const router = express.Router();

const config = require("../config");
const {
  ROLES,
  createAccount,
  authenticate,
  publicAccount,
  findAccount,
  createSession,
  destroySession
} = require("../data/authStore");
const { SESSION_COOKIE, authRequired } = require("../middleware/auth");
const { ensureUser, pushNotification } = require("../data/economyStore");
const { createInvitation } = require("../data/linkStore");

// Aceleași reguli pe care le arată RegisterScreen în interfață. Validarea din
// browser e doar pentru UX; asta e cea care contează, pentru că un client
// poate trimite orice direct către API.
const PASSWORD_RULES = [
  { test: v => v.length >= 8, message: "Parola trebuie să aibă minim 8 caractere." },
  { test: v => /[A-ZĂÂÎȘȚ]/.test(v), message: "Parola trebuie să conțină o literă mare." },
  { test: v => /[0-9]/.test(v), message: "Parola trebuie să conțină o cifră." },
  { test: v => /[^A-Za-z0-9ĂÂÎȘȚăâîșț]/.test(v), message: "Parola trebuie să conțină un caracter special." }
];

const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));

function validatePassword(password) {
  const value = String(password || "");
  for (const rule of PASSWORD_RULES) {
    if (!rule.test(value)) return rule.message;
  }
  return null;
}

function sessionCookieOptions(maxAge) {
  return {
    httpOnly: true,
    sameSite: "lax",
    // Cookie-ul se trimite doar pe HTTPS în producție. În development pe
    // localhost (http) trebuie să rămână disponibil.
    secure: config.IS_PRODUCTION,
    maxAge,
    path: "/"
  };
}

router.post("/register", async (req, res) => {
  const { email, password, role = "student", invite_code: inviteCode = "", ...profile } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Adresa de email nu este validă.", field: "email" });
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError, field: "password" });
  }
  if (!ROLES.includes(role)) {
    return res.status(400).json({ error: "Rol necunoscut.", field: "role" });
  }

  // Rolul de profesor dă acces la analitica mai multor elevi, deci nu poate fi
  // ales liber de client. Fără un cod de invitație configurat, înregistrarea
  // ca profesor este blocată complet.
  if (role === "teacher") {
    if (!config.TEACHER_INVITE_CODE) {
      return res.status(403).json({
        error: "Conturile de profesor se creează doar prin invitație. Contactează administratorul.",
        field: "role"
      });
    }
    if (inviteCode !== config.TEACHER_INVITE_CODE) {
      return res.status(403).json({ error: "Codul de invitație nu este valid.", field: "invite_code" });
    }
  }

  const created = await createAccount({ email, password, role, profile });
  if (!created.ok) {
    if (created.reason === "email_taken") {
      return res.status(409).json({ error: "Există deja un cont cu această adresă.", field: "email" });
    }
    return res.status(400).json({ error: "Nu am putut crea contul." });
  }

  // Contul de economie este ținut separat (monede, inventar, activitate) și
  // este indexat pe același email.
  ensureUser(created.account.email, {
    role: created.account.role,
    className: created.account.profile.class
  });

  // Emailurile de părinte/profesor completate la înregistrare NU mai leagă
  // conturile direct. Trimit doar o invitație, pe care celălalt cont trebuie
  // să o accepte - altfel un elev ar putea atașa un adult oarecare la contul
  // lui, sau invers.
  const invitations = [];
  if (created.account.role === "student") {
    if (created.account.profile.parentEmail) {
      const invite = createInvitation({
        fromEmail: created.account.email,
        fromRole: "student",
        toEmail: created.account.profile.parentEmail,
        kind: "parent_child"
      });
      if (invite.ok) invitations.push(invite.invitation);
    }
    if (created.account.profile.teacherEmail) {
      const invite = createInvitation({
        fromEmail: created.account.email,
        fromRole: "student",
        toEmail: created.account.profile.teacherEmail,
        kind: "teacher_student"
      });
      if (invite.ok) invitations.push(invite.invitation);
    }
  }

  const { token, maxAge } = createSession(created.account.email);
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(maxAge));
  res.status(201).json({ success: true, user: publicAccount(created.account), invitations });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Emailul și parola sunt obligatorii." });
  }

  const result = await authenticate({ email, password });
  if (!result.ok) {
    // Un singur mesaj pentru email inexistent și parolă greșită, ca să nu
    // confirmăm care adrese au cont.
    return res.status(401).json({ error: "Email sau parolă incorecte." });
  }

  ensureUser(result.account.email, { role: result.account.role });

  const { token, maxAge } = createSession(result.account.email);
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(maxAge));
  res.json({ success: true, user: publicAccount(result.account) });
});

router.post("/logout", (req, res) => {
  destroySession(req.sessionToken);
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ success: true });
});

router.get("/me", authRequired, (req, res) => {
  res.json({ user: publicAccount(req.auth.account) });
});

// Nu există încă trimitere reală de email (vezi Faza 6). Răspundem identic
// indiferent dacă adresa are cont, ca să nu permitem enumerarea utilizatorilor.
router.post("/forgot-password", (req, res) => {
  const { email } = req.body || {};
  const account = isValidEmail(email) ? findAccount(email) : null;

  if (account) {
    pushNotification(
      account.email,
      account.email,
      "Resetare parolă Mentor AI",
      "Ai cerut resetarea parolei. Trimiterea reală de email nu este încă implementată; deocamdată contactează administratorul.",
      "email"
    );
  }

  res.json({
    success: true,
    message: "Dacă adresa are un cont, vei primi instrucțiuni de resetare."
  });
});

module.exports = router;
