// Exportul și ștergerea contului (GDPR: dreptul de acces și de ștergere).
// Orchestrează toate store-urile: un DELETE trebuie să șteargă sesiunile,
// monedele, calendarul, conversațiile, invitațiile și abonamentul, nu doar
// rândul din authStore.

const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validate");
const { deleteAccountSchema, profileSchema } = require("../validation/schemas");
const { publicAccount, deleteAccount, findAccount, updateProfile } = require("../data/authStore");
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

router.patch("/profile", validateBody(profileSchema), (req, res) => {
  const account = updateProfile(req.auth.email, req.body || {});
  if (!account) {
    return res.status(404).json({ error: "Contul nu a fost găsit." });
  }
  economyStore.ensureUser(account.email, {
    role: account.role,
    className: account.profile.class,
    profileName: account.profile.name,
    username: account.profile.username
  });
  res.json({ success: true, user: publicAccount(account) });
});

router.delete("/", validateBody(deleteAccountSchema), (req, res) => {
  const email = req.auth.email;
  eraseAccount(email);
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ success: true, deleted: email });
});

module.exports = router;
