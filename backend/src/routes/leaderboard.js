const express = require("express");
const router = express.Router();
const { listLeaderboardEntries, lessonsThisWeek } = require("../data/leaderboard");
const { isPrivatePublicId, publicId, findByPublicId, isBlocked } = require("../data/friendStore");
const { listAccounts, isConsentGranted } = require("../data/authStore");
const { authRequired, consentRequired } = require("../middleware/auth");
const { usernameIssue } = require("../safety/usernamePolicy");

// GET /api/leaderboard?limit=10
// Clasament all-time după XP. Profilurile private rămân cu locul și punctajul, fără nume.
function grantedEntry(entry) {
  const account = listAccounts().find(item => publicId(item.email) === entry.id);
  return Boolean(account && isConsentGranted(account));
}

router.get("/summary", (req, res) => {
  res.json({ lectiiSaptamanaAsta: lessonsThisWeek() });
});

router.get("/", authRequired, consentRequired, (req, res) => {
  if (req.auth?.account?.mustRename) {
    return res.status(409).json({ error: "Alege un alt nume de utilizator.", code: "username_required" });
  }
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const currentEmail = req.auth?.email || "";
  const raw = listLeaderboardEntries({ limit: 50, currentEmail });
  const visible = raw
    .filter(entry => grantedEntry(entry))
    .filter(entry => {
      const account = findByPublicId(entry.id);
      if (account?.hiddenFromLeaderboard || account?.mustRename) return false;
      if (account && usernameIssue(account.profile?.username || "")) return false;
      if (currentEmail && account && isBlocked(currentEmail, account.email)) return false;
      return true;
    });
  const capped = visible.slice(0, limit);
  const self = visible.find(entry => entry.isCurrentUser);
  if (self && !capped.some(entry => entry.isCurrentUser)) capped.push(self);
  const board = capped.map(entry => {
    if (entry.isCurrentUser || !isPrivatePublicId(entry.id)) return entry;
    return { rank: entry.rank, xp: entry.xp, private: true };
  });

  res.json({
    leaderboard: board,
    period: "all_time",
    mocked: false,
    generated_at: new Date().toISOString()
  });
});

module.exports = router;
