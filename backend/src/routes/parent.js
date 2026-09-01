const express = require("express");
const router = express.Router();

const { findAccountByParentToken } = require("../data/authStore");
const { buildParentReport } = require("../data/parentReport");

router.get("/report", (req, res) => {
  const token = String(req.query.token || "").trim();
  const account = findAccountByParentToken(token);
  if (!account) {
    return res.status(404).json({ error: "Linkul nu mai e valid. Cere copilului să mai facă un test — îți vine un email nou." });
  }
  res.json(buildParentReport(account));
});

module.exports = router;
