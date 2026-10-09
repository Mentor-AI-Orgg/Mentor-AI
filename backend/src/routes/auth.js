const express = require("express");
const path = require("path");
const router = express.Router();

const {
  createStudentAccount,
  authenticate,
  publicAccount,
  findAccount,
  findByUsername,
  createSession,
  destroySession,
  normalizeEmail,
  issueResetToken,
  consumeResetToken,
  resetMailRecentlySent,
  noteResetMailSent,
  isInternalEmail,
  isConsentGranted,
  accountIsOpen,
  markPending,
  markNotified,
  ensureParentAccount,
  linkChildToParent,
  grantConsent,
  stripLegacyProfile
} = require("../data/authStore");
const {
  POLICY_VERSION,
  confirmationAllowed,
  markConfirmationSent,
  issueConsentToken,
  peekConsent,
  consumeConsent,
  consumeEmailChangeToken
} = require("../data/consentStore");
const legal = require("../../../shared/legal.json");
const { SESSION_COOKIE, authRequired, STUDENTS_ONLY } = require("../middleware/auth");
const { sessionCookieOptions: buildSessionCookie } = require("../http/sessionCookie");
const { authLimiter, usernameCheckLimiter } = require("../middleware/rateLimits");
const { validateBody } = require("../middleware/validate");
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, consentActionSchema, parentEmailSchema, tokenSchema, usernameCheckSchema } = require("../validation/schemas");
const { usernameIssue } = require("../safety/usernamePolicy");
const { publicBaseUrl } = require("../publicUrl");
const { ensureUser, pushNotification } = require("../data/economyStore");
const { deliverMessage, smtpConfigured, warnIfSmtpMissing } = require("../notify/deliver");
const { MASCOT_NAME } = require("../config/mascot");
const {
  loginState,
  noteLoginFailure,
  clearLoginFailures,
  allowSignupIp,
  allowSignupParent
} = require("../safety/attemptGuard");

function ignoreChildIdentity(req, _res, next) {
  if (req.body && typeof req.body === "object" && !Array.isArray(req.body)) {
    delete req.body.name;
    delete req.body.fullName;
    delete req.body.surname;
    delete req.body.phone;
    delete req.body.email;
    delete req.body.school;
  }
  next();
}

const WAIT_MESSAGE = "Așteaptă puțin și încearcă din nou.";

// Aceleași reguli pe care le arată RegisterScreen în interfață. Validarea din
// browser e doar pentru UX; asta e cea care contează, pentru că un client
// poate trimite orice direct către API.
const { passwordError } = require("../safety/passwordPolicy");

const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));

function validatePassword(password, username = "") {
  return passwordError(password, username);
}

function sessionCookieOptions(maxAge, req) {
  return buildSessionCookie(maxAge, req && req.get ? req.get("user-agent") : "");
}

function consentMail({ req, account, token }) {
  const link = `${publicBaseUrl(req)}/#/acord/${token}`;
  const subject = "Confirmați contul copilului dumneavoastră pe Sunt de 10";
  const body = [
    "Cineva a creat un cont de copil pe Sunt de 10, aplicația gratuită de română și matematică.",
    "Nu are reclame și nu folosește un serviciu de inteligență artificială plătit.",
    `Păstrăm numele de utilizator (${account.profile.username}), clasa (${account.profile.class}), progresul și emailul părintelui, ca să știm cine învață și cine a dat acordul.`,
    "Profilul este privat de la început.",
    `Politica de confidențialitate: ${publicBaseUrl(req)}/confidentialitate`,
    "Contul este deja deschis. Mesajul vă anunță; nu trebuie să apăsați un buton ca să rămână deschis.",
    "Dacă mesajul nu e în inbox, uită-te în Spam.",
    "Puteți deschide linkul dacă vreți să confirmați, sau să spuneți că nu ați creat contul.",
    link,
    "Doar un cont vechi rămas în așteptare, fără acest email, se șterge după 14 zile."
  ].join("\n");
  const escape = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const alt = escape(`${MASCOT_NAME}, furnicuța care te ajută`);
  const html = `<p>${escape(body).replace(/\n/g, "</p><p>")}</p><img src="cid:mascot" alt="${alt}" width="96" height="96">`;
  const attachments = [{
    filename: "mascot-salut.png",
    path: path.join(__dirname, "../notify/mascot-salut.png"),
    cid: "mascot"
  }];
  return { link, subject, body, html, attachments };
}

async function sendConsentEmail(req, account, { resend = false } = {}) {
  const parentEmail = account.profile && account.profile.parentEmail;
  if (!parentEmail) return { sent: false, reason: "no_parent" };
  const room = confirmationAllowed(account.email, parentEmail, { resend });
  if (!room.ok) return { sent: false, limited: true, message: room.message };
  const token = issueConsentToken(account.email);
  const mail = consentMail({ req, account, token });
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DEV] ${mail.link}`);
  }
  const delivery = await deliverMessage({
    to: parentEmail,
    subject: mail.subject,
    body: mail.body,
    html: mail.html,
    attachments: mail.attachments,
    channel: "email"
  });
  markConfirmationSent(account.email, parentEmail, { resend });
  return { sent: true, delivery, link: mail.link, subject: mail.subject, body: mail.body };
}

async function maybeAskReconsent(req, account) {
  if (!legal.requiresReconsent || !isConsentGranted(account)) return { sent: false };
  if (account.consent.policyVersion === POLICY_VERSION) return { sent: false };
  if (account.reconsentFor === POLICY_VERSION) return { sent: false };
  const confirmation = await sendConsentEmail(req, account);
  if (confirmation.sent) account.reconsentFor = POLICY_VERSION;
  return confirmation;
}

router.post("/username-check", usernameCheckLimiter, validateBody(usernameCheckSchema), (req, res) => {
  const issue = usernameIssue(req.body.username);
  if (issue) return res.json({ ok: false, code: issue.code, error: issue.error });
  const existing = findByUsername(req.body.username);
  if (existing && (!req.auth || existing.email !== req.auth.email)) {
    return res.json({
      ok: false,
      code: "username_taken",
      error: "Acest nume de utilizator este deja folosit."
    });
  }
  res.json({ ok: true });
});

router.post("/register", authLimiter, ignoreChildIdentity, validateBody(registerSchema), async (req, res) => {
  const { username, password, confirmPassword, class: className, parentEmail, role = "student" } = req.body || {};

  if (role !== "student") {
    return res.status(403).json({ ...STUDENTS_ONLY, field: "role" });
  }
  if (String(password) !== String(confirmPassword)) {
    return res.status(400).json({ error: "Parolele nu coincid.", field: "confirmPassword" });
  }
  const passwordError = validatePassword(password, username);
  if (passwordError) return res.status(400).json({ error: passwordError, field: "password" });
  if (!isValidEmail(parentEmail)) {
    return res.status(400).json({
      error: "Contul de elev cere emailul unui părinte sau tutore.",
      field: "parentEmail"
    });
  }
  if (findByUsername(username)) {
    return res.status(409).json({
      error: "Acest nume de utilizator este deja folosit.",
      field: "username",
      code: "username_taken"
    });
  }
  if (!allowSignupIp(req.ip)) {
    return res.status(429).json({
      error: "Încearcă din nou peste câteva minute.",
      code: "rate_limited"
    });
  }
  if (!allowSignupParent(parentEmail)) {
    return res.status(429).json({
      error: "Cu acest email de părinte s-au făcut deja 3 conturi astăzi. Încearcă mâine.",
      code: "rate_limited"
    });
  }

  const created = await createStudentAccount({
    username,
    password,
    className,
    parentEmail
  });
  if (!created.ok) {
    if (created.reason === "username_taken") {
      return res.status(409).json({
        error: "Acest nume de utilizator este deja folosit.",
        field: "username",
        code: "username_taken"
      });
    }
    return res.status(400).json({ error: "Nu am putut crea contul." });
  }

  ensureUser(created.account.email, {
    role: "student",
    className: created.account.profile.class,
    username: created.account.profile.username
  });

  const parent = await ensureParentAccount(created.account.profile.parentEmail);
  if (parent) linkChildToParent(parent.email, created.account.email);

  const { token, maxAge } = createSession(created.account.email);
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(maxAge, req));
  res.status(201).json({
    success: true,
    user: publicAccount(created.account),
    parentNotified: false
  });
});

router.post("/login", authLimiter, validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Numele de utilizator și parola sunt obligatorii." });
  }

  const waiting = loginState(email);
  if (waiting.locked) {
    return res.status(429).json({ error: WAIT_MESSAGE, code: "rate_limited", retryAfter: waiting.retryAfter });
  }

  const result = await authenticate({ email, password });
  if (!result.ok) {
    const failed = noteLoginFailure(email);
    if (failed.alert) {
      const account = findByUsername(email) || findAccount(email);
      const parentEmail = account && account.profile && account.profile.parentEmail;
      if (parentEmail) {
        deliverMessage({
          to: parentEmail,
          subject: "Încercări de parolă pe Sunt de 10",
          body: `Cineva a greșit parola de mai multe ori la contul ${account.profile.username}. Dacă nu a fost copilul tău, schimbă parola.`,
          channel: "email"
        }).catch(() => {});
      }
    }
    if (failed.locked) {
      return res.status(429).json({ error: WAIT_MESSAGE, code: "rate_limited", retryAfter: failed.retryAfter });
    }
    return res.status(401).json({ error: "Numele de utilizator sau parola nu sunt corecte." });
  }
  clearLoginFailures(email);

  if (result.account.role !== "student") {
    return res.status(403).json(STUDENTS_ONLY);
  }

  if (Date.parse(result.account.suspendedUntil || "") > Date.now()) {
    return res.status(403).json({ error: "Contul este suspendat temporar.", code: "suspended" });
  }

  if (usernameIssue(result.account.profile?.username || "")) {
    result.account.mustRename = true;
  }

  if (!accountIsOpen(result.account)) {
    stripLegacyProfile(result.account);
    if (result.account.profile?.parentEmail) {
      markNotified(result.account);
      const parent = await ensureParentAccount(result.account.profile.parentEmail);
      if (parent) linkChildToParent(parent.email, result.account.email);
    } else {
      markPending(result.account);
    }
  } else if (isConsentGranted(result.account)) {
    await maybeAskReconsent(req, result.account);
  }

  result.account.lastLoginAt = new Date().toISOString();
  result.account.inactivityWarningSent = false;

  ensureUser(result.account.email, {
    role: result.account.role,
    username: result.account.profile.username,
    className: result.account.profile.class,
    profileName: result.account.profile.name
  });

  const { token, maxAge } = createSession(result.account.email);
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(maxAge, req));

  res.json({
    success: true,
    user: publicAccount(result.account),
    parentNotified: false
  });
});

router.post("/logout", (req, res) => {
  destroySession(req.sessionToken);
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions(0, req));
  res.json({ success: true });
});

router.get("/me", authRequired, (req, res) => {
  if (req.auth.role !== "student") {
    destroySession(req.sessionToken);
    res.clearCookie(SESSION_COOKIE, sessionCookieOptions(0, req));
    return res.status(403).json(STUDENTS_ONLY);
  }
  const user = publicAccount(req.auth.account);
  user.timeBlocked = require("../parent/panel").timeBlocked(req.auth.account);
  res.json({ user });
});

// Răspundem identic indiferent dacă adresa are cont, ca să nu permitem
// enumerarea utilizatorilor. Dacă SMTP e configurat, emailul pleacă doar
// când contul există; mesajul către client rămâne același.
router.post("/forgot-password", authLimiter, validateBody(forgotPasswordSchema), async (req, res) => {
  const { email } = req.body || {};
  const account = (isValidEmail(email) ? findAccount(email) : null) || findByUsername(email);

  const recent = Boolean(account) && resetMailRecentlySent(account.email);
  if (account && !recent) {
    const token = issueResetToken(account.email);
    noteResetMailSent(account.email);
    const link = `${publicBaseUrl(req)}/#/parola/${token}`;
    const subject = "Resetare parolă Sunt de 10";
    const body = [
      "Ai cerut o parolă nouă.",
      "Linkul este valabil 45 de minute și se folosește o singură dată:",
      link,
      "Dacă nu ai fost tu, ignoră mesajul. După schimbare, sesiunile vechi se închid."
    ].join("\n");
    const parentEmail = account.profile && account.profile.parentEmail;
    const who = account.profile.username || "copilul";
    const parentBody = `Copilul ${who} a cerut o parolă nouă.\n${link}`;
    pushNotification(account.email, parentEmail || account.email, subject, isInternalEmail(account.email) ? parentBody : body, "email", { mocked: !smtpConfigured() });
    if (!warnIfSmtpMissing("forgot_password")) {
      if (parentEmail) {
        await deliverMessage({
          to: parentEmail,
          subject,
          body: parentBody,
          channel: "email",
          action: "forgot_password"
        });
      }
      if (!isInternalEmail(account.email)) {
        await deliverMessage({ to: account.email, subject, body, channel: "email", action: "forgot_password" });
      }
    }
  } else if (warnIfSmtpMissing("forgot_password")) {
    /* același jurnal, fie că există contul, e prea devreme, sau nu; fără link în log */
  }

  res.json({
    success: true,
    mocked: !smtpConfigured(),
    message: "Dacă există un cont, am trimis un link părintelui tău."
  });
});

router.get("/consent/:token", (req, res) => {
  const info = peekConsent(req.params.token);
  if (!info) return res.status(400).json({ error: "Linkul nu mai este valabil." });
  res.json({ pending: info.status !== "granted", username: info.username, class: info.className });
});

router.post("/consent", validateBody(consentActionSchema), async (req, res) => {
  const account = consumeConsent(req.body.token);
  if (!account) return res.status(400).json({ error: "Linkul nu mai este valabil." });
  if (req.body.action === "refuse") {
    const { eraseAccount } = require("./account");
    eraseAccount(account.email);
    return res.json({ success: true, deleted: true });
  }
  const parentEmail = account.profile.parentEmail;
  grantConsent(account, { policyVersion: POLICY_VERSION, parentEmail });
  const parent = await ensureParentAccount(parentEmail);
  if (parent) linkChildToParent(parent.email, account.email);
  res.json({ success: true, consent: "granted" });
});

router.post("/consent/resend", authLimiter, async (req, res) => {
  if (!req.auth || req.auth.role !== "student") {
    return res.status(401).json({ error: "Autentificare necesară.", code: "unauthenticated" });
  }
  if (accountIsOpen(req.auth.account)) {
    return res.json({ success: true, already: true });
  }
  const confirmation = await sendConsentEmail(req, req.auth.account, { resend: true });
  if (confirmation.limited) {
    return res.status(429).json({ error: confirmation.message, code: "consent_limited" });
  }
  res.json({ success: true, sent: Boolean(confirmation.sent) });
});

router.post("/consent/parent-email", authLimiter, validateBody(parentEmailSchema), async (req, res) => {
  if (!req.auth || req.auth.role !== "student") {
    return res.status(401).json({ error: "Autentificare necesară." });
  }
  if (isConsentGranted(req.auth.account)) {
    return res.status(400).json({ error: "Acordul este deja confirmat." });
  }
  const nextEmail = normalizeEmail(req.body.parentEmail);
  const previous = req.auth.account.profile.parentEmail;
  req.auth.account.profile.parentEmail = nextEmail;
  if (accountIsOpen(req.auth.account)) {
    const previousParent = findAccount(previous);
    if (previousParent && Array.isArray(previousParent.children)) {
      previousParent.children = previousParent.children.filter(email => normalizeEmail(email) !== req.auth.account.email);
    }
    const parent = await ensureParentAccount(nextEmail);
    if (parent) linkChildToParent(parent.email, req.auth.account.email);
    return res.json({ success: true, user: publicAccount(req.auth.account) });
  }
  const confirmation = await sendConsentEmail(req, req.auth.account);
  res.json({
    success: true,
    user: publicAccount(req.auth.account),
    confirmationMessage: confirmation.message || ""
  });
});

router.post("/parent-email/confirm", validateBody(tokenSchema), async (req, res) => {
  const found = consumeEmailChangeToken(req.body.token);
  if (!found) return res.status(400).json({ error: "Linkul nu mai este valabil." });
  const previous = found.account.profile.parentEmail;
  const previousParent = findAccount(previous);
  if (previousParent && Array.isArray(previousParent.children)) {
    previousParent.children = previousParent.children.filter(email => normalizeEmail(email) !== found.account.email);
  }
  found.account.profile.parentEmail = found.nextEmail;
  delete found.account.profile.parentEmailPending;
  const parent = await ensureParentAccount(found.nextEmail);
  if (parent) linkChildToParent(parent.email, found.account.email);
  res.json({ success: true, parentEmail: found.nextEmail });
});

router.post("/reset-password", authLimiter, validateBody(resetPasswordSchema), async (req, res) => {
  const passwordError = validatePassword(req.body.password);
  if (passwordError) return res.status(400).json({ error: passwordError, field: "password" });
  const result = await consumeResetToken(req.body.token, req.body.password);
  if (!result.ok) {
    if (result.reason === "weak") return res.status(400).json({ error: result.error, field: "password" });
    return res.status(400).json({ error: "Linkul de resetare nu mai este valabil. Cere unul nou." });
  }
  res.json({ success: true });
});

module.exports = router;
