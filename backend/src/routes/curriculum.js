const express = require("express");
const router = express.Router();
const { getGuide, listCatalog } = require("../data/gimnaziuGuide");

router.get("/", (req, res) => {
  const { subject, class_level: classLevel } = req.query || {};
  if (subject || classLevel) {
    return res.json(getGuide(subject, classLevel));
  }
  return res.json(listCatalog());
});

module.exports = router;
