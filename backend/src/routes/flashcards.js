const express = require("express");
const router = express.Router();

const { pickPractice } = require("../data/practicePicker");
const { checkExercise, checkMany, scoreToGrade, encouragementFor } = require("../data/exerciseBank");
const { findQuestion } = require("../data/practiceBank");
const { ensureUser, getTodayKey, recordProgress, recordSkillReview, getSkillHistory } = require("../data/economyStore");

function trimPracticeIds(ids) {
  const list = (ids || []).map(String);
  const staticIds = list.filter(id => !id.startsWith("g:"));
  const generated = list.filter(id => id.startsWith("g:")).slice(-800);
  return [...new Set([...staticIds, ...generated])];
}

router.post("/generate", (req, res) => {
  const {
    topic = "",
    chapter_id: chapterId = "",
    subject = "matematica",
    class_level: classLevel = 5,
    kind = "flashcards",
    exclude_ids: excludeIds = [],
    count
  } = req.body || {};

  if (!topic && !chapterId) {
    return res.status(400).json({ error: "Trimite chapter_id sau topic." });
  }

  const user = ensureUser(req.auth.email);
  if (!user.practiceSeen || typeof user.practiceSeen !== "object") user.practiceSeen = {};

  const preview = pickPractice({
    subject,
    grade: classLevel,
    chapterId,
    topic,
    kind: kind === "test" ? "test" : "flashcards",
    excludeIds: Array.isArray(excludeIds) ? excludeIds : [],
    seenPoints: [],
    count
  });

  const stored = user.practiceSeen[preview.key] || { points: [], questionIds: [], day: null };
  const pack = pickPractice({
    subject,
    grade: classLevel,
    chapterId: preview.chapterId,
    topic,
    kind: kind === "test" ? "test" : "flashcards",
    excludeIds: [...new Set([...(Array.isArray(excludeIds) ? excludeIds : []), ...(stored.questionIds || [])])],
    seenPoints: stored.points || [],
    count
  });

  res.json({
    ...pack,
    engine_used: "chapter_bank",
    mocked: false,
    topic: topic || pack.chapterId
  });
});

router.post("/check", (req, res) => {
  const { card_id: cardId = "", answer = "" } = req.body || {};
  if (!cardId) {
    return res.status(400).json({ error: "Trimite card_id." });
  }
  const result = checkExercise(cardId, answer);
  if (!result.found) {
    return res.status(404).json({ error: "Exercițiul nu a fost găsit." });
  }
  res.json({
    ok: result.ok,
    explain: result.explain,
    sample: result.ok || String(answer || "").trim() ? result.sample : "",
    steps: Array.isArray(result.steps) ? result.steps : []
  });
});

router.post("/seen", (req, res) => {
  const { chapter_id: chapterId = "", subject = "matematica", class_level: classLevel = 5, point = "", card_id: cardId = "", kind = "flashcards" } = req.body || {};
  const user = ensureUser(req.auth.email);
  if (!user.practiceSeen) user.practiceSeen = {};
  const pack = pickPractice({ subject, grade: classLevel, chapterId, topic: chapterId, kind: kind === "test" ? "test" : "flashcards", count: 3 });
  const key = pack.key;
  if (!user.practiceSeen[key]) user.practiceSeen[key] = { points: [], questionIds: [], day: getTodayKey() };
  if (point && !user.practiceSeen[key].points.includes(point)) user.practiceSeen[key].points.push(point);
  if (cardId && !user.practiceSeen[key].questionIds.includes(cardId)) {
    user.practiceSeen[key].questionIds.push(cardId);
    user.practiceSeen[key].questionIds = trimPracticeIds(user.practiceSeen[key].questionIds);
  }
  const total = pack.coverage.total;
  res.json({
    ok: true,
    coverage: {
      seen: user.practiceSeen[key].points.length,
      total,
      complete: user.practiceSeen[key].points.length >= total
    }
  });
});

router.get("/history", (req, res) => {
  res.json(getSkillHistory(req.auth.email));
});

router.post("/finish", (req, res) => {
  const {
    kind = "test",
    chapter_id: chapterId = "",
    subject = "matematica",
    class_level: classLevel = 5,
    title = "",
    answers = [],
    picks = []
  } = req.body || {};

  const isTest = kind !== "flashcards";
  let items = [];

  if (isTest) {
    items = checkMany(Array.isArray(answers) ? answers : []);
  } else {
    items = (Array.isArray(picks) ? picks : []).map(pick => {
      const question = findQuestion(pick.card_id || pick.id);
      if (!question) {
        return { id: pick.card_id, point: "", prompt: "", given: String(pick.chosen || ""), ok: false, found: false, explain: "", sample: "", steps: [] };
      }
      const chosen = String(pick.chosen || "").trim();
      const sample = question.options[question.correct] || "";
      const ok = chosen && chosen === sample;
      return {
        id: question.id,
        point: question.point,
        prompt: question.question,
        given: chosen,
        skipped: !chosen,
        ok,
        found: true,
        explain: question.explain,
        sample,
        steps: []
      };
    });
  }

  const correct = items.filter(item => item.ok).length;
  const total = items.length;
  const gradeNote = scoreToGrade(correct, total);
  const message = encouragementFor(gradeNote);
  const strengths = [...new Set(items.filter(item => item.ok).map(item => item.point).filter(Boolean))];
  const weaknesses = [...new Set(items.filter(item => !item.ok).map(item => item.point).filter(Boolean))];

  const user = ensureUser(req.auth.email);
  if (!user.practiceSeen) user.practiceSeen = {};
  const pack = pickPractice({
    subject,
    grade: classLevel,
    chapterId,
    topic: chapterId,
    kind: isTest ? "test" : "flashcards",
    count: 3
  });
  if (!user.practiceSeen[pack.key]) user.practiceSeen[pack.key] = { points: [], questionIds: [], day: getTodayKey() };
  items.forEach(item => {
    if (item.point && !user.practiceSeen[pack.key].points.includes(item.point)) {
      user.practiceSeen[pack.key].points.push(item.point);
    }
    if (item.id && !user.practiceSeen[pack.key].questionIds.includes(item.id)) {
      user.practiceSeen[pack.key].questionIds.push(item.id);
    }
  });
    user.practiceSeen[pack.key].questionIds = trimPracticeIds(user.practiceSeen[pack.key].questionIds);

  const review = recordSkillReview(req.auth.email, {
    kind: isTest ? "test" : "flashcards",
    subject,
    grade: classLevel,
    chapterId,
    title,
    correct,
    total,
    gradeNote,
    message,
    strengths,
    weaknesses,
    items
  });

  let award = null;
  if (isTest) {
    award = recordProgress({
      userId: req.auth.email,
      type: "chapter_test",
      note: title || "Test de capitol",
      meta: { subject, grade: classLevel, chapterId, title, score: correct, total, gradeNote }
    });
  } else if (correct >= 5) {
    award = recordProgress({
      userId: req.auth.email,
      type: "flashcard_known",
      note: title || "Flashcarduri",
      meta: { subject, grade: classLevel, chapterId, title, topic: title || chapterId, correct }
    });
  }

  res.json({
    items,
    correct,
    total,
    grade: gradeNote,
    message,
    strengths,
    weaknesses,
    history: review.snapshot,
    awarded: award?.awarded || null,
    summary: award?.summary || null
  });
});

module.exports = router;
