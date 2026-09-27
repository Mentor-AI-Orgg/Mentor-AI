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
  findAccount,
  authenticate,
  updateProfile,
  usernameTaken,
  changePassword,
  normalizeEmail
} = require("../data/authStore");
const { SESSION_COOKIE } = require("../middleware/auth");
const economyStore = require("../data/economyStore");
const registry = require("../data/userDataRegistry");

const SECRET_KEY = /password|salt|token|secret|hash/i;

function scrubSecrets(value) {
  if (Array.isArray(value)) return value.map(scrubSecrets);
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const [key, item] of Object.entries(value)) {
    if (SECRET_KEY.test(key)) continue;
    out[key] = scrubSecrets(item);
  }
  return out;
}

function collectExport(email) {
  const slices = registry.exportAll(email);
  return scrubSecrets({
    explicatie: "Acestea sunt datele păstrate despre acest cont pe Sunt de 10. Parola și tokenurile nu sunt incluse.",
    exportatLa: new Date().toISOString(),
    cont: slices.auth,
    economie: slices.economy,
    prieteni: slices.friends,
    calendar: slices.calendar,
    conversatii: slices.memory,
    invitatii: slices.links,
    abonament: slices.subscriptions,
    acord: slices.consent,
    evaluare: slices.evaluare,
    fotografii: slices.fotografii
  });
}

function eraseAccount(email) {
  const account = findAccount(email);
  if (!account) {
    registry.eraseAll(email);
    return Promise.resolve({ erased: false });
  }
  const parentEmail = account.role === "student" ? (account.profile?.parentEmail || "") : "";
  registry.eraseAll(email);
  registry.recordDeletion(email);
  if (parentEmail) {
    const parent = findAccount(parentEmail);
    if (parent && parent.role === "parent" && !(parent.children || []).length) {
      registry.eraseAll(parentEmail);
      registry.recordDeletion(parentEmail);
    }
  }
  const notice = parentEmail
    ? require("../notify/deliver").deliverMessage({
      to: parentEmail,
      subject: "Contul și datele au fost șterse",
      body: "Contul și datele au fost șterse.",
      channel: "email"
    }).catch(() => null)
    : Promise.resolve(null);
  return notice.then(() => ({ erased: true }));
}

router.get("/export", (req, res) => {
  const payload = collectExport(req.auth.email);
  res.setHeader("Content-Disposition", "attachment; filename=\"sunt-de-10-date.json\"");
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
  if (patch.username) {
    const { usernameError } = require("../safety/usernamePolicy");
    const nameError = usernameError(patch.username);
    if (nameError) return res.status(400).json({ error: nameError, field: "username" });
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

router.delete("/", validateBody(deleteAccountSchema), async (req, res) => {
  const check = await authenticate({ email: req.auth.email, password: req.body.password });
  if (!check.ok) {
    return res.status(401).json({ error: "Parola nu este corectă." });
  }
  await eraseAccount(req.auth.email);
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ success: true, deleted: true });
});

module.exports = router;
module.exports.eraseAccount = eraseAccount;
module.exports.collectExport = collectExport;
