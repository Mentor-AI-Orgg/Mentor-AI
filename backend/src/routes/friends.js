const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validate");
const { friendSettingsSchema, friendRequestSchema, friendRespondSchema } = require("../validation/schemas");
const friends = require("../data/friendStore");
const { findAccount } = require("../data/authStore");
const { publicBaseUrl } = require("../publicUrl");
const { notifyParent } = require("../notify/parentActivity");
const { textRejected } = require("../safety/usernamePolicy");
const moderation = require("../data/moderationStore");

router.get("/me", (req, res) => {
  res.json(friends.inboxFor(req.auth.email));
});

router.patch("/settings", validateBody(friendSettingsSchema), (req, res) => {
  const before = friends.getSettings(req.auth.email).profilePrivate !== false;
  const settings = friends.setSettings(req.auth.email, req.body);
  if (before && settings.profilePrivate === false) {
    const account = findAccount(req.auth.email);
    const parentEmail = account?.profile?.parentEmail || "";
    if (parentEmail) {
      const token = friends.issuePrivatizeToken(req.auth.email);
      const link = `${publicBaseUrl(req)}/api/parent/make-private/${token}`;
      const username = account.profile?.username || "copilul";
      require("../notify/deliver").deliverMessage({
        to: parentEmail,
        subject: "Profilul copilului este public pe Sunt de 10",
        body: `${username} și-a făcut profilul public. Alți copii îi pot vedea numele de utilizator, avatarul și punctajul. Ca să-l faci din nou privat, deschide linkul (o singură dată):\n${link}`
      }).catch(() => {});
    }
  }
  res.json({ success: true, settings });
});

router.get("/search", (req, res) => {
  const q = String(req.query.q || "");
  res.json({ results: friends.searchStudents(q, req.auth.email) });
});

router.get("/profile/:id", (req, res) => {
  const account = friends.findByPublicId(req.params.id);
  if (!account || account.role !== "student") {
    return res.status(404).json({ error: "Nu am găsit acest elev." });
  }
  res.json({ profile: friends.publicCard(account, req.auth.email) });
});

router.post("/request-code", (req, res) => {
  const account = friends.findByFriendCode(req.body?.code);
  if (!account) return res.status(404).json({ error: "Codul nu se potrivește." });
  const result = friends.sendRequest(req.auth.email, friends.publicId(account.email), { viaCode: true });
  if (!result.ok) return res.status(result.status || 400).json({ error: result.error });
  notifyParent({
    studentEmail: req.auth.email,
    type: "friend_request",
    note: "A trimis o cerere de prietenie.",
    meta: { to: account.profile?.username || "" }
  }).catch(() => {});
  res.status(201).json({ success: true, remaining: result.remaining });
});

router.post("/request", validateBody(friendRequestSchema), async (req, res) => {
  const result = friends.sendRequest(req.auth.email, req.body.user_id);
  if (!result.ok) {
    return res.status(result.status || 400).json({ error: result.error });
  }
  const target = friends.findByPublicId(req.body.user_id);
  notifyParent({
    studentEmail: req.auth.email,
    type: "friend_request",
    note: "A trimis o cerere de prietenie.",
    meta: { to: target?.profile?.username || target?.profile?.name || "" }
  }).catch(() => {});
  res.status(201).json({ success: true, remaining: result.remaining });
});

router.post("/report", async (req, res) => {
  const note = String(req.body?.note || "");
  const rejected = textRejected(note);
  if (rejected) return res.status(400).json({ error: rejected });
  const target = friends.findByPublicId(req.body?.user_id);
  if (!target || target.role !== "student") {
    return res.status(404).json({ error: "Nu am găsit acest elev." });
  }
  const result = await moderation.createReport({
    reporterEmail: req.auth.email,
    targetId: friends.publicId(target.email),
    reason: String(req.body?.reason || ""),
    note
  });
  if (!result.ok) return res.status(result.status || 400).json({ error: result.error });
  res.status(201).json({ message: result.message, reportId: result.report.id });
});

router.post("/block", (req, res) => {
  const target = friends.findByPublicId(req.body?.user_id);
  if (!target || target.role !== "student") {
    return res.status(404).json({ error: "Nu am găsit acest elev." });
  }
  const result = friends.blockPair(req.auth.email, target.email);
  if (!result.ok) return res.status(result.status || 400).json({ error: result.error });
  res.json({ ok: true });
});

router.post("/respond", validateBody(friendRespondSchema), (req, res) => {
  const result = friends.respondRequest(req.auth.email, req.body.request_id, req.body.action);
  if (!result.ok) {
    return res.status(result.status || 400).json({ error: result.error });
  }
  res.json({ success: true, status: result.status });
});

module.exports = router;
