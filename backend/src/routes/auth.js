const express = require("express");
const router = express.Router();

const config = require("../config");
const {
  createAccount,
  authenticate,
  publicAccount,
  findAccount,
  createSession,
  destroySession,
  normalizeEmail,
  issueResetToken,
  consumeResetToken
} = require("../data/authStore");
const { SESSION_COOKIE, authRequired, STUDENTS_ONLY } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimits");
const { validateBody } = require("../middleware/validate");
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require("../validation/schemas");
const { publicBaseUrl } = require("../publicUrl");
const { ensureUser, pushNotification } = require("../data/economyStore");
const { deliverMessage, smtpConfigured } = require("../notify/deliver");
const { notifyParent } = require("../notify/parentActivity");

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

router.post("/register", authLimiter, validateBody(registerSchema), async (req, res) => {
  const { email, password, role = "student", parental_consent: parentalConsent, privacy_accepted: privacyAccepted, ...profile } = req.body || {};

  if (!privacyAccepted) {
    return res.status(400).json({
      error: "Trebuie să accepți politica de confidențialitate și termenii de utilizare.",
      field: "privacy_accepted"
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Adresa de email nu este validă.", field: "email" });
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError, field: "password" });
  }
  if (role !== "student") {
    return res.status(403).json({
      ...STUDENTS_ONLY,
      field: "role"
    });
  }

  // Un elev minor nu își poate deschide contul fără un adult de contact și
  // fără consimțământ explicit. Părintele nu își face cont: primește emailuri.
  if (role === "student") {
    if (!isValidEmail(profile.parentEmail)) {
      return res.status(400).json({
        error: "Contul de elev cere emailul unui părinte sau tutore.",
        field: "parentEmail"
      });
    }
    if (normalizeEmail(profile.parentEmail) === normalizeEmail(email)) {
      return res.status(400).json({
        error: "Emailul părintelui trebuie să fie diferit de al elevului.",
        field: "parentEmail"
      });
    }
    if (parentalConsent !== true) {
      return res.status(400).json({
        error: "Contul de elev cere consimțământul parental.",
        field: "parental_consent"
      });
    }
  }

  const created = await createAccount({
    email,
    password,
    role,
    profile: {
      ...profile,
      parentalConsentAt: role === "student" ? new Date().toISOString() : null,
      privacyAcceptedAt: new Date().toISOString()
    }
  });
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
    className: created.account.profile.class,
    profileName: created.account.profile.name,
    username: created.account.profile.username
  });

  const parentNotify = await notifyParent({
    studentEmail: created.account.email,
    type: "account_created",
    note: "Contul a fost creat.",
    meta: {
      classLevel: created.account.profile.class,
      subject: created.account.profile.subject
    }
  });

  const { token, maxAge } = createSession(created.account.email);
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(maxAge));
  res.status(201).json({
    success: true,
    user: publicAccount(created.account),
    parentNotified: !parentNotify.skipped
  });
});

router.post("/login", authLimiter, validateBody(loginSchema), async (req, res) => {
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

  if (result.account.role !== "student") {
    return res.status(403).json(STUDENTS_ONLY);
  }

  ensureUser(result.account.email, {
    role: result.account.role,
    username: result.account.profile.username,
    className: result.account.profile.class,
    profileName: result.account.profile.name
  });

  const { token, maxAge } = createSession(result.account.email);
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(maxAge));

  const parentNotify = await notifyParent({
    studentEmail: result.account.email,
    type: "login",
    note: "Elevul s-a autentificat în aplicație."
  });

  res.json({
    success: true,
    user: publicAccount(result.account),
    parentNotified: !parentNotify.skipped
  });
});

router.post("/logout", (req, res) => {
  destroySession(req.sessionToken);
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ success: true });
});

router.get("/me", authRequired, (req, res) => {
  if (req.auth.role !== "student") {
    destroySession(req.sessionToken);
    res.clearCookie(SESSION_COOKIE, { path: "/" });
    return res.status(403).json(STUDENTS_ONLY);
  }
  res.json({ user: publicAccount(req.auth.account) });
});

// Răspundem identic indiferent dacă adresa are cont, ca să nu permitem
// enumerarea utilizatorilor. Dacă SMTP e configurat, emailul pleacă doar
// când contul există; mesajul către client rămâne același.
router.post("/forgot-password", authLimiter, validateBody(forgotPasswordSchema), async (req, res) => {
  const { email } = req.body || {};
  const account = isValidEmail(email) ? findAccount(email) : null;

  if (account) {
    const token = issueResetToken(account.email);
    const link = `${publicBaseUrl(req)}/#/parola/${token}`;
    const subject = "Resetare parolă Mentor AI";
    const body = [
      "Ai cerut o parolă nouă.",
      "Linkul este valabil 45 de minute și se folosește o singură dată:",
      link,
      "Dacă nu ai fost tu, ignoră mesajul. După schimbare, sesiunile vechi se închid."
    ].join("\n");
    const delivery = await deliverMessage({ to: account.email, subject, body, channel: "email" });
    pushNotification(account.email, account.email, subject, body, "email", delivery);
    const parentEmail = account.profile && account.profile.parentEmail;
    if (parentEmail) {
      await deliverMessage({
        to: parentEmail,
        subject,
        body: `Copilul cu adresa ${account.email} a cerut o parolă nouă.\n${link}`,
        channel: "email"
      });
    }
  }

  res.json({
    success: true,
    mocked: !smtpConfigured(),
    message: "Dacă adresa are un cont, vei primi instrucțiuni de resetare."
  });
});

router.post("/reset-password", authLimiter, validateBody(resetPasswordSchema), async (req, res) => {
  const passwordError = validatePassword(req.body.password);
  if (passwordError) return res.status(400).json({ error: passwordError, field: "password" });
  const result = await consumeResetToken(req.body.token, req.body.password);
  if (!result.ok) {
    return res.status(400).json({ error: "Linkul de resetare nu mai este valabil. Cere unul nou." });
  }
  res.json({ success: true });
});

module.exports = router;
