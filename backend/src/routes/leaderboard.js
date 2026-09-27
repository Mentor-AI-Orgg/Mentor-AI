const express = require("express");
const router = express.Router();
const { listLeaderboardEntries, lessonsThisWeek } = require("../data/leaderboard");
const { isPrivatePublicId, publicId, findByPublicId, isBlocked } = require("../data/friendStore");
const { listAccounts, isConsentGranted } = require("../data/authStore");
const { authRequired, consentRequired } = require("../middleware/auth");

// GET /api/leaderboard?limit=10
// Clasament all-time după XP. Profilurile private nu apar, în afară de tine.
function grantedEntry(entry) {
  const account = listAccounts().find(item => publicId(item.email) === entry.id);
  return Boolean(account && isConsentGranted(account));
}

router.get("/summary", (req, res) => {
  res.json({ lectiiSaptamanaAsta: lessonsThisWeek() });
});

router.get("/", authRequired, consentRequired, (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const currentEmail = req.auth?.email || "";
  const raw = listLeaderboardEntries({ limit: 50, currentEmail });
  const board = raw
    .filter(entry => grantedEntry(entry) && (entry.isCurrentUser || !isPrivatePublicId(entry.id)))
    .filter(entry => {
      const account = findByPublicId(entry.id);
      if (account?.hiddenFromLeaderboard) return false;
      if (currentEmail && account && isBlocked(currentEmail, account.email)) return false;
      return true;
    })
    .slice(0, limit);

  res.json({
    leaderboard: board,
    period: "all_time",
    mocked: false,
    generated_at: new Date().toISOString()
  });
});

module.exports = router;
