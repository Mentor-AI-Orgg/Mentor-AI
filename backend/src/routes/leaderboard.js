const express = require("express");
const router = express.Router();
const { listLeaderboardEntries } = require("../data/leaderboard");
const { isPrivatePublicId } = require("../data/friendStore");

// GET /api/leaderboard?limit=10
// Clasament all-time după XP. Profilurile private nu apar, în afară de tine.
router.get("/", (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const currentEmail = req.auth?.email || "";
  const raw = listLeaderboardEntries({ limit: 50, currentEmail });
  const board = raw
    .filter(entry => entry.isCurrentUser || !isPrivatePublicId(entry.id))
    .slice(0, limit);

  res.json({
    leaderboard: board,
    period: "all_time",
    mocked: false,
    generated_at: new Date().toISOString()
  });
});

module.exports = router;
