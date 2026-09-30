const express = require("express");
const router = express.Router();
const { ensureUser } = require("../data/economyStore");
const { snapshot, review } = require("../data/mistakeBook");

router.get("/", (req, res) => {
  const user = ensureUser(req.auth.email);
  res.json(snapshot(user));
});

router.post("/review", (req, res) => {
  const user = ensureUser(req.auth.email);
  const result = review(user, req.body?.itemId, req.body?.answer);
  if (!result.ok) return res.status(result.status).json({ error: result.error });
  res.json({
    correct: result.correct,
    retired: result.retired,
    message: result.message,
    explain: result.explain,
    ...result.book
  });
});

module.exports = router;
