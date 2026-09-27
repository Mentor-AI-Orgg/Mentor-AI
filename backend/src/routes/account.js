// Exportul și ștergerea contului (GDPR: dreptul de acces și de ștergere).
// Orchestrează toate store-urile: un DELETE trebuie să șteargă sesiunile,
// monedele, calendarul, conversațiile, invitațiile și abonamentul, nu doar
// rândul din authStore.

const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validate");
const { deleteAccountSchema, profileSchema, passwordChangeSchema } = require("../validation/schemas");
const {
  publicAccount,
  deleteAccount,
  findAccount,
  updateProfile,
  usernameTaken,
  changePassword,
  normalizeEmail
} = require("../data/authStore");
const { SESSION_COOKIE } = require("../middleware/auth");
const economyStore = require("../data/economyStore");
const calendarStore = require("../data/calendarStore");
const memory = require("../memory/memoryStore");
const linkStore = require("../data/linkStore");
const subscriptionStore = require("../data/subscriptionStore");

function collectExport(email) {
  const account = findAccount(email);
  return {
    exportedAt: new Date().toISOString(),
    account: publicAccount(account),
    economy: economyStore.exportUser(email),
    calendar: {
      events: calendarStore.getEvents(email),
      connections: calendarStore.getConnections(email)
    },
    conversations: memory.exportForEmail(email),
    links: {
      invitations: linkStore.listForUser(email),
      active: linkStore.listLinks(email)
    },
    subscription: subscriptionStore.getSubscription(email)
  };
}

function eraseAccount(email) {
  linkStore.purgeForEmail(email);
  memory.deleteForEmail(email);
  calendarStore.deleteUser(email);
  economyStore.deleteUser(email);
  subscriptionStore.deleteSubscription(email);
  deleteAccount(email);
}

router.get("/export", (req, res) => {
  const payload = collectExport(req.auth.email);
  res.setHeader("Content-Disposition", "attachment; filename=\"mentor-ai-date.json\"");
  res.json(payload);
});

router.patch("/profile", validateBody(profileSchema), async (req, res) => {
  const patch = { ...req.body };
  delete patch.name;
  delete patch.phone;
  delete patch.school;
  const nextParent = patch.parentEmail;
  delete patch.parentEmail;
  if (patch.class && !["5", "6", "7", "8"].includes(String(patch.class))) {
    return res.status(400).json({ error: "Clasa trebuie să fie 5, 6, 7 sau 8.", field: "class" });
  }
  if (nextParent && normalizeEmail(nextParent) !== normalizeEmail(req.auth.account.profile.parentEmail)) {
    const { issueEmailChangeToken } = require("../data/consentStore");
    const { deliverMessage } = require("../notify/deliver");
    const { publicBaseUrl } = require("../publicUrl");
    const token = issueEmailChangeToken(req.auth.email, nextParent);
    req.auth.account.profile.parentEmailPending = normalizeEmail(nextParent);
    const link = `${publicBaseUrl(req)}/#/email-nou/${token}`;
    if (process.env.NODE_ENV !== "production") console.log(`[DEV] ${link}`);
    await deliverMessage({
      to: nextParent,
      subject: "Confirmați noul email de părinte pe Sunt de 10",
      body: `Confirmați că vreți să primiți veștile despre ${req.auth.account.profile.username || "copil"} la această adresă.\n${link}\nPână atunci rămâne valabilă adresa veche.`,
      channel: "email"
    });
    const previous = req.auth.account.profile.parentEmail;
    if (previous) {
      await deliverMessage({
        to: previous,
        subject: "S-a cerut schimbarea emailului de părinte",
        body: `Pentru ${req.auth.account.profile.username || "copil"} s-a cerut o adresă nouă. Până la confirmare, mesajele vin în continuare aici.`,
        channel: "email"
      });
    }
  }
  if (patch.username && usernameTaken(patch.username, req.auth.email)) {
    return res.status(409).json({ error: "Username-ul este deja folosit.", field: "username" });
  }
  if (patch.parentEmail && normalizeEmail(patch.parentEmail) === normalizeEmail(req.auth.email)) {
    return res.status(400).json({ error: "Emailul părintelui trebuie să fie diferit de al tău.", field: "parentEmail" });
  }
  const account = updateProfile(req.auth.email, patch);
  if (!account) {
    return res.status(404).json({ error: "Contul nu a fost găsit." });
  }
  economyStore.ensureUser(account.email, {
    role: account.role,
    className: account.profile.class,
    profileName: account.profile.name,
    username: account.profile.username,
    parentEmail: account.profile.parentEmail
  });
  res.json({ success: true, user: publicAccount(account) });
});

router.post("/password", validateBody(passwordChangeSchema), async (req, res) => {
  const next = String(req.body.newPassword || "");
  if (next.length < 8 || !/[A-ZĂÂÎȘȚ]/.test(next) || !/[0-9]/.test(next) || !/[^A-Za-z0-9ĂÂÎȘȚăâîșț]/.test(next)) {
    return res.status(400).json({
      error: "Parola nouă: minim 8 caractere, o literă mare, o cifră și un caracter special.",
      field: "newPassword"
    });
  }
  const result = await changePassword(req.auth.email, req.body.currentPassword, next);
  if (!result.ok) {
    return res.status(result.reason === "wrong" ? 401 : 400).json({
      error: result.reason === "wrong" ? "Parola actuală este greșită." : "Nu am putut schimba parola."
    });
  }
  res.json({ success: true });
});

router.delete("/", validateBody(deleteAccountSchema), (req, res) => {
  const email = req.auth.email;
  eraseAccount(email);
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ success: true, deleted: email });
});

module.exports = router;
module.exports.eraseAccount = eraseAccount;
module.exports.collectExport = collectExport;
