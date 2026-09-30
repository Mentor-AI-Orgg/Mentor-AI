const express = require("express");
const { creatorRequired } = require("../middleware/comingSoon");

const router = express.Router();

router.get("/status", creatorRequired, (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
