const express = require("express");
const router = express.Router();
const { publicQuestion, questionsFor, scorePlacement } = require("../data/placement");
const { getUser, ensureUser } = require("../data/economyStore");

router.get("/", (req, res) => {
  const user = getUser(req.auth.email) || {};
  res.json({ placement: user.placement || null });
});

router.post("/questions", (req, res) => {
  const grade = req.auth.account?.profile?.class || "5";
  const subject = ["mate", "romana", "ambele"].includes(req.body?.subject) ? req.body.subject : "ambele";
  const user = ensureUser(req.auth.email);
  user.placement = { ...(user.placement || {}), startedAt: new Date().toISOString(), subject };
  res.json({
    questions: questionsFor(grade, subject).map(publicQuestion),
    note: "Pas cu pas, fără grabă."
  });
});

router.post("/skip", (req, res) => {
  const user = ensureUser(req.auth.email);
  user.placement = { ...(user.placement || {}), skippedAt: new Date().toISOString() };
  res.json({ success: true });
});

router.post("/finish", (req, res) => {
  const grade = req.auth.account?.profile?.class || "5";
  const subject = ["mate", "romana", "ambele"].includes(req.body?.subject) ? req.body.subject : "ambele";
  const result = scorePlacement(grade, subject, Array.isArray(req.body?.answers) ? req.body.answers : []);
  const user = ensureUser(req.auth.email);
  user.placement = { ...result, finishedAt: new Date().toISOString() };
  res.json({
    good: result.good,
    startWith: result.startWith,
    badge: "Primul pas"
  });
});

module.exports = router;
