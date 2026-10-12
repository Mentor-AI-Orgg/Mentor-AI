const express = require("express");
const { creatorRequired } = require("../middleware/comingSoon");
const { listAccounts } = require("../data/authStore");
const { accountStats } = require("../ops/accountStats");

const router = express.Router();

router.use(creatorRequired);

router.get("/stats", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json(accountStats(listAccounts()));
});

module.exports = router;
