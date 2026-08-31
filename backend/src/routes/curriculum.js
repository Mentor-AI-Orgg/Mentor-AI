const express = require("express");
const router = express.Router();
const { getGuide, listCatalog } = require("../data/gimnaziuGuide");
const { getEnGuide, listEnCatalog, enCounts } = require("../data/en8Guide");
const { recommendedList, generatePaper, publicPaperById, getBaremItem, itemKey } = require("../data/enPaperFactory");
const { openPaper, canReveal, markReveal } = require("../data/enSessionStore");
const { authRequired, studentRequired } = require("../middleware/auth");

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

router.get("/en/papers", (req, res) => {
  const subject = req.query.subject || "matematica";
  res.json({
    subject,
    papers: recommendedList(subject),
    infinite: true,
    note: "Modelele A–C sunt recomandate. „Alt model” aduce o variantă nouă, fără repetare."
  });
});

router.post("/en/papers/generate", authRequired, studentRequired, (req, res) => {
  const subject = req.body?.subject || req.query.subject || "matematica";
  const excludeIds = Array.isArray(req.body?.exclude_ids) ? req.body.exclude_ids : [];
  const paper = generatePaper(subject, excludeIds);
  const session = openPaper(req.auth.email, paper.id);
  res.json({ paper, session, infinite: true });
});

router.post("/en/papers/open", authRequired, studentRequired, (req, res) => {
  const paperId = String(req.body?.paper_id || "");
  const paper = publicPaperById(paperId);
  if (!paper) return res.status(404).json({ error: "Modelul nu a fost găsit." });
  const session = openPaper(req.auth.email, paperId);
  res.json({ paper, session });
});

router.post("/en/barem", authRequired, studentRequired, (req, res) => {
  const paperId = String(req.body?.paper_id || "");
  const blockLabel = String(req.body?.block || "");
  const n = Number(req.body?.n);
  if (!paperId || !blockLabel || !Number.isFinite(n)) {
    return res.status(400).json({ error: "Trimite paper_id, block și n." });
  }
  const key = itemKey(blockLabel, n);
  const gate = canReveal(req.auth.email, paperId, key);
  if (!gate.ok) {
    return res.status(429).json({ error: gate.reason, waitMs: gate.waitMs || 0 });
  }
  const item = getBaremItem(paperId, blockLabel, n);
  if (!item) return res.status(404).json({ error: "Nu există barem pentru acest item." });
  if (!gate.already) markReveal(req.auth.email, paperId, key);
  res.json({
    ...item,
    already: Boolean(gate.already),
    hint: "Ai desfăcut un singur item. Următorul are pauză. Nu există „arată tot”."
  });
});

module.exports = router;
