const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validate");
const { friendSettingsSchema, friendRequestSchema, friendRespondSchema } = require("../validation/schemas");
const friends = require("../data/friendStore");
const { notifyParent } = require("../notify/parentActivity");

router.get("/me", (req, res) => {
  res.json(friends.inboxFor(req.auth.email));
});

router.patch("/settings", validateBody(friendSettingsSchema), (req, res) => {
  const settings = friends.setSettings(req.auth.email, req.body);
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

router.post("/respond", validateBody(friendRespondSchema), (req, res) => {
  const result = friends.respondRequest(req.auth.email, req.body.request_id, req.body.action);
  if (!result.ok) {
    return res.status(result.status || 400).json({ error: result.error });
  }
  res.json({ success: true, status: result.status });
});

module.exports = router;
