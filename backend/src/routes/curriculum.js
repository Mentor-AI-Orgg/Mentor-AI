const express = require("express");
const router = express.Router();
const { getGuide, listCatalog } = require("../data/gimnaziuGuide");
const { getEnGuide, listEnCatalog, enCounts } = require("../data/en8Guide");
const { recommendedList, generatePaper, publicPaperById, getBaremItem, listBarem, scoreAttempt } = require("../data/enPaperFactory");
const { previewPaper, startPaper, canFinish, finishPaper, isFinished } = require("../data/enSessionStore");
const { photoStatus, PHOTO_DAILY_LIMIT } = require("../data/enPhotoQuota");
const { authRequired, studentRequired, consentRequired } = require("../middleware/auth");
const { notifyParent } = require("../notify/parentActivity");
const { recordProgress } = require("../data/economyStore");

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
    note: "Modelele A–C sunt recomandate. „Alt model” e simularea completă (minim 60 de minute). „Antrenament scurt” n-are ora de sală. Baremul apare după finalizare."
  });
});

router.post("/en/papers/generate", authRequired, studentRequired, (req, res) => {
  const subject = req.body?.subject || req.query.subject || "matematica";
  const excludeIds = Array.isArray(req.body?.exclude_ids) ? req.body.exclude_ids : [];
  const mode = String(req.body?.mode || "").toLowerCase() === "drill" ? "drill" : "exam";
  const paper = generatePaper(subject, excludeIds, { mode });
  const session = previewPaper(req.auth.email, paper.id);
  res.json({ paper, session, infinite: true, mode: paper.mode || mode });
});

router.post("/en/papers/open", authRequired, studentRequired, (req, res) => {
  const paperId = String(req.body?.paper_id || "");
  const paper = publicPaperById(paperId);
  if (!paper) return res.status(404).json({ error: "Modelul nu a fost găsit." });
  const session = previewPaper(req.auth.email, paperId);
  res.json({ paper, session, photoQuota: photoStatus(req.auth.email) });
});

router.post("/en/papers/start", authRequired, studentRequired, (req, res) => {
  const paperId = String(req.body?.paper_id || "");
  const paper = publicPaperById(paperId);
  if (!paper) return res.status(404).json({ error: "Modelul nu a fost găsit." });
  const session = startPaper(req.auth.email, paperId);
  res.json({ paper, session, photoQuota: photoStatus(req.auth.email) });
});

router.post("/en/papers/finish", authRequired, studentRequired, async (req, res) => {
  const paperId = String(req.body?.paper_id || "");
  const paper = publicPaperById(paperId);
  if (!paper) return res.status(404).json({ error: "Modelul nu a fost găsit." });
  const gate = canFinish(req.auth.email, paperId);
  if (!gate.ok) {
    return res.status(429).json({ error: gate.reason, waitMs: gate.waitMs || 0 });
  }
  const answers = Array.isArray(req.body?.answers) ? req.body.answers : [];
  if (gate.already) {
    const session = previewPaper(req.auth.email, paperId);
    return res.json({
      paper,
      session,
      result: session.result,
      already: true
    });
  }
  const score = scoreAttempt(paperId, answers);
  if (!score) return res.status(404).json({ error: "Modelul nu a fost găsit." });
  const session = finishPaper(req.auth.email, paperId, score, answers);
  recordProgress({
    userId: req.auth.email,
    type: "en_exam",
    note: paper.title,
    meta: {
      subject: paper.subject,
      title: paper.title,
      paperId,
      gradeNote: score.grade,
      points: score.points,
      durationMs: session.durationMs
    }
  });
  const parentNotify = await notifyParent({
    studentEmail: req.auth.email,
    type: "en_exam",
    note: paper.title,
    meta: {
      title: paper.title,
      subject: paper.subject,
      gradeNote: score.grade,
      durationMs: session.durationMs,
      answers: score.items.map(item => ({
        prompt: item.prompt,
        given: item.given,
        letter: item.letter || "",
        text: item.text || "",
        ok: item.ok,
        verdict: item.verdict || "",
        explain: item.teacher || item.explain || ""
      }))
    }
  });
  res.json({
    paper,
    session,
    result: session.result,
    parentNotified: !parentNotify.skipped,
    parentNotify: {
      skipped: parentNotify.skipped,
      reason: parentNotify.reason || null
    },
    photoQuota: photoStatus(req.auth.email)
  });
});

router.get("/en/photo-quota", authRequired, studentRequired, consentRequired, (req, res) => {
  res.json({ photoQuota: photoStatus(req.auth.email), limit: PHOTO_DAILY_LIMIT });
});

router.post("/en/photo-review", authRequired, studentRequired, consentRequired, (req, res) => {
  res.status(410).json({
    error: "Pozele nu se mai încarcă. Citirea unei fotografii folosea un serviciu plătit. Scrie răspunsul în casetă."
  });
});

router.post("/en/barem", authRequired, studentRequired, (req, res) => {
  const paperId = String(req.body?.paper_id || "");
  const blockLabel = String(req.body?.block || "");
  const n = Number(req.body?.n);
  if (!paperId) {
    return res.status(400).json({ error: "Trimite paper_id." });
  }
  if (!isFinished(req.auth.email, paperId)) {
    return res.status(403).json({
      error: "Baremul se deschide după ce finalizezi testul. Nu există un buton „arată răspunsurile” în timpul probei."
    });
  }
  if (!blockLabel || !Number.isFinite(n)) {
    return res.json({
      paperId,
      items: listBarem(paperId),
      hint: "Baremul întregului test, după predare."
    });
  }
  const item = getBaremItem(paperId, blockLabel, n);
  if (!item) return res.status(404).json({ error: "Nu există barem pentru acest item." });
  res.json({
    ...item,
    hint: "Baremul apare după finalizare, nu în timpul probei."
  });
});

module.exports = router;
