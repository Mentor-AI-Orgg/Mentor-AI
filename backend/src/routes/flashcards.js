const express = require("express");
const router = express.Router();

const { pickPractice } = require("../data/practicePicker");
const { checkExercise } = require("../data/exerciseBank");
const { ensureUser, getTodayKey } = require("../data/economyStore");

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
    sample: result.ok || String(answer || "").trim() ? result.sample : ""
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
    user.practiceSeen[key].questionIds = user.practiceSeen[key].questionIds.slice(-80);
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

module.exports = router;
