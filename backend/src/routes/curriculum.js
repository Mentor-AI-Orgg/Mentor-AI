const express = require("express");
const router = express.Router();
const { getGuide, listCatalog } = require("../data/gimnaziuGuide");
const { getEnGuide, listEnCatalog, enCounts } = require("../data/en8Guide");
const { catalogWithoutAnswers } = require("../data/lessonShape");
const { recommendedList, generatePaper, publicPaperById, getBaremItem, listBarem, scoreAttempt } = require("../data/enPaperFactory");
const { previewPaper, startPaper, canFinish, finishPaper, isFinished, saveSelfScore } = require("../data/enSessionStore");
const { photoStatus, PHOTO_DAILY_LIMIT } = require("../data/enPhotoQuota");
const { authRequired, studentRequired, consentRequired } = require("../middleware/auth");
const { notifyParent } = require("../notify/parentActivity");
const { recordProgress } = require("../data/economyStore");

function isEnTrack(query = {}) {
  const track = String(query.track || "").trim().toLowerCase();
  const classLevel = String(query.class_level || query.grade || "").trim().toLowerCase();
  return track === "en" || track === "evaluare" || classLevel === "en" || classLevel === "en8" || classLevel === "evaluare";
}

function lessonInGuide(guide, lessonId, unitId) {
  const units = Array.isArray(guide?.units) ? guide.units : [];
  const pool = unitId ? units.filter(unit => unit.id === unitId) : units;
  const hits = [];
  pool.forEach(unit => {
    (unit.lessons || []).forEach(lesson => {
      if (lesson && lesson.id === lessonId) hits.push(lesson);
    });
  });
  return hits.length === 1 ? hits[0] : null;
}

function explicitReveal(body) {
  const flag = body?.reveal;
  return flag === true || flag === 1 || flag === "1" || flag === "true";
}

// Catalogul și ghidul cer un elev. `answers` nu pleacă aici: butonul
// „Vezi răspunsurile” le cere pentru o singură lecție.
router.get("/", authRequired, studentRequired, (req, res) => {
  const { subject, class_level: classLevel } = req.query || {};
  if (isEnTrack(req.query)) {
    if (subject) return res.json(catalogWithoutAnswers(getEnGuide(subject)));
    return res.json(catalogWithoutAnswers(listEnCatalog()));
  }
  if (subject || classLevel) {
    return res.json(catalogWithoutAnswers(getGuide(subject, classLevel)));
  }
  return res.json(catalogWithoutAnswers(listCatalog()));
});

router.post("/lesson-answers", authRequired, studentRequired, (req, res) => {
  if (!explicitReveal(req.body)) {
    return res.status(403).json({
      error: "Răspunsurile se deschid când apeși „Vezi răspunsurile”.",
      code: "reveal_required"
    });
  }
  const lessonId = String(req.body?.lesson || req.body?.lesson_id || "").trim();
  const unitId = String(req.body?.unit || req.body?.unit_id || "").trim();
  if (!lessonId) return res.status(400).json({ error: "Trimite lecția." });
  const source = { ...(req.query || {}), ...(req.body || {}) };
  let guide;
  if (isEnTrack(source)) {
    guide = getEnGuide(source.subject || "matematica");
  } else if (!source.subject || !(source.class_level || source.grade)) {
    return res.status(400).json({ error: "Trimite materia și clasa." });
  } else {
    guide = getGuide(source.subject, source.class_level || source.grade);
  }
  const lesson = lessonInGuide(guide, lessonId, unitId);
  if (!lesson) return res.status(404).json({ error: "Lecția nu a fost găsită." });
  const answers = Array.isArray(lesson.answers)
    ? lesson.answers.map(item => String(item).trim()).filter(Boolean)
    : [];
  if (!answers.length) return res.status(404).json({ error: "Lecția nu are răspunsuri separate." });
  res.json({ lesson: lesson.id, answers });
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
  if (score) {
    const { ensureUser } = require("../data/economyStore");
    const { noteCards } = require("../data/mistakeBook");
    const recapId = paper.subject === "romana" ? "strategie" : "proba";
    noteCards(ensureUser(req.auth.email), (score.items || []).map(item => ({
      id: `${paperId}:${item.block}:${item.n}`,
      ok: item.ok,
      found: true,
      skipped: !String(item.given || item.text || item.letter || "").trim(),
      point: item.prompt
    })), {
      lesson: paper.title,
      lessonId: recapId,
      subject: paper.subject,
      grade: "8"
    });
  }
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

router.post("/en/papers/self-score", authRequired, studentRequired, (req, res) => {
  const paperId = String(req.body?.paper_id || "");
  const block = String(req.body?.block || "");
  const n = Number(req.body?.n);
  const ticked = Array.isArray(req.body?.ticked) ? req.body.ticked.map(String) : [];
  if (!paperId || !block || !Number.isFinite(n)) {
    return res.status(400).json({ error: "Trimite paper_id, block și n." });
  }
  if (!isFinished(req.auth.email, paperId)) {
    return res.status(403).json({ error: "Autoevaluarea se deschide după ce predai lucrarea." });
  }
  const item = getBaremItem(paperId, block, n);
  if (!item) return res.status(404).json({ error: "Nu există barem pentru acest item." });
  const steps = Array.isArray(item.stepBarem) ? item.stepBarem : [];
  const seen = new Set();
  let points = 0;
  ticked.forEach(id => {
    if (seen.has(id)) return;
    const step = steps.find(row => row.id === id);
    if (!step) return;
    seen.add(id);
    points += Number(step.points) || 0;
  });
  const max = steps.reduce((sum, step) => sum + (Number(step.points) || 0), 0) || 5;
  points = Math.max(0, Math.min(max, points));
  const session = saveSelfScore(req.auth.email, paperId, block, n, points);
  res.json({
    points,
    max,
    selfPoints: session?.result?.selfPoints,
    selfGrade: session?.result?.selfGrade
  });
});

module.exports = router;
