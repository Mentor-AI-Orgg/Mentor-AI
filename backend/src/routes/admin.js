const express = require("express");
const { creatorRequired } = require("../middleware/comingSoon");
const { listAccounts } = require("../data/authStore");
const { getUser, xpFromUser } = require("../data/economyStore");
const { accountStats, xpLeaderboard } = require("../ops/accountStats");

const router = express.Router();

router.use(creatorRequired);

router.get("/stats", (req, res) => {
  res.set("Cache-Control", "no-store");
  const accounts = listAccounts();
  const xpFor = email => {
    const user = getUser(email);
    return user ? xpFromUser(user) : 0;
  };
  res.json({
    ...accountStats(accounts),
    ...xpLeaderboard(accounts, xpFor)
  });
});

module.exports = router;
