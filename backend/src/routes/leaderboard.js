const express = require("express");
const router = express.Router();
const { listLeaderboardEntries } = require("../data/leaderboard");
const { isPrivatePublicId, publicId } = require("../data/friendStore");
const { listAccounts, isConsentGranted } = require("../data/authStore");

// GET /api/leaderboard?limit=10
// Clasament all-time după XP. Profilurile private nu apar, în afară de tine.
function grantedEntry(entry) {
  const account = listAccounts().find(item => publicId(item.email) === entry.id);
  return Boolean(account && isConsentGranted(account));
}

router.get("/", (req, res) => {
  if (req.auth && !isConsentGranted(req.auth.account)) {
    return res.status(403).json({ error: "consent_pending" });
  }
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const currentEmail = req.auth?.email || "";
  const raw = listLeaderboardEntries({ limit: 50, currentEmail });
  const board = raw
    .filter(entry => grantedEntry(entry) && (entry.isCurrentUser || !isPrivatePublicId(entry.id)))
    .slice(0, limit);

  res.json({
    leaderboard: board,
    period: "all_time",
    mocked: false,
    generated_at: new Date().toISOString()
  });
});

module.exports = router;
