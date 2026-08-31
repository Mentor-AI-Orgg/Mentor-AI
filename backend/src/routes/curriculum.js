const express = require("express");
const router = express.Router();
const { getGuide, listCatalog } = require("../data/gimnaziuGuide");
const { getEnGuide, listEnCatalog, enCounts } = require("../data/en8Guide");

function isEnTrack(query = {}) {
  const track = String(query.track || "").trim().toLowerCase();
  const classLevel = String(query.class_level || query.grade || "").trim().toLowerCase();
  return track === "en" || track === "evaluare" || classLevel === "en" || classLevel === "en8" || classLevel === "evaluare";
}

router.get("/", (req, res) => {
  const { subject, class_level: classLevel } = req.query || {};
  if (isEnTrack(req.query)) {
    if (subject) return res.json(getEnGuide(subject));
    return res.json(listEnCatalog());
  }
  if (subject || classLevel) {
    return res.json(getGuide(subject, classLevel));
  }
  return res.json(listCatalog());
});

router.get("/en/counts", (req, res) => {
  res.json({ track: "en", grade: 8, counts: enCounts() });
});

module.exports = router;
