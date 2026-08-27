const express = require("express");
const router = express.Router();
const { listLeaderboardEntries } = require("../data/leaderboard");

// GET /api/leaderboard?limit=10
// Query-ul nu mai acceptă name/xp/streak de la client (era spoofabil și
// trimitea numele real al copilului). Identitatea evidențiată vine din sesiune.
router.get("/", (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const currentEmail = req.auth?.email || "";
  const board = listLeaderboardEntries({ limit, currentEmail });

  res.json({
    leaderboard: board,
    mocked: false,
    generated_at: new Date().toISOString()
  });
});

module.exports = router;
