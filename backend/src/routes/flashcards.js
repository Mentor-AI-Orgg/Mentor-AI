const express = require("express");
const router = express.Router();

const { pickPractice } = require("../data/practicePicker");
const { checkExercise, checkMany, scoreToGrade, encouragementFor } = require("../data/exerciseBank");
const { findQuestion } = require("../data/practiceBank");
const { judgeAnswer } = require("../grading/answerJudge");
const { lessonsFor } = require("../data/gimnaziuLessons");
const { ensureUser, getTodayKey, recordProgress, recordSkillReview, getSkillHistory } = require("../data/economyStore");
const { noteCards } = require("../data/mistakeBook");
const { rate } = require("../data/spacedRepetition");

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
    count,
    track = "",
    target_note: targetNote,
    lesson_id: lessonId = ""
  } = req.body || {};

  const isEn = String(track).toLowerCase() === "en" || String(classLevel).toLowerCase() === "en";
  const training = String(req.body?.mode || "").toLowerCase() === "training";
  if (isEn && !training) {
    return res.status(400).json({
      error: "Modelele oficiale EN se deschid din lista de teste (Începe test Evaluare Națională). Pentru exerciții scurte deschide Antrenament EN."
    });
  }

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
    count,
    targetNote,
    lessonId
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
    seenQuestionIds: stored.questionIds || [],
    count: Number(count) || (lessonId ? (kind === "test" ? 5 : 8) : (kind === "test" ? 10 : 8)),
    targetNote,
    lessonId
  });

  res.json({
    ...pack,
    engine_used: isEn ? "en_training" : "chapter_bank",
    mocked: false,
    track: isEn ? "en" : "",
    topic: topic || pack.chapterId,
    infinite: lessonId ? false : true
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
  const user = ensureUser(req.auth.email);
  if (!user.cardBoxes) user.cardBoxes = {};
  const next = rate(user.cardBoxes[cardId] || {}, result.ok);
  if (next.retired) delete user.cardBoxes[cardId];
  else user.cardBoxes[cardId] = { box: next.box, streak: next.streak, due: next.due };
  if (!result.ok) noteCards(user, [{ id: cardId, ok: false, found: true, point: result.point }], { lesson: result.point || cardId });
  res.json({
    ok: result.ok,
    credit: Number(result.credit) || 0,
    verdict: result.verdict || (result.ok ? "exact" : "wrong"),
    explain: result.explain,
    sample: result.ok || String(answer || "").trim() ? result.sample : "",
    steps: Array.isArray(result.steps) ? result.steps : [],
    rubric: result.rubric || null
  });
});

router.post("/seen", (req, res) => {
  const { chapter_id: chapterId = "", subject = "matematica", class_level: classLevel = 5, point = "", card_id: cardId = "", kind = "flashcards", lesson_id: lessonId = "" } = req.body || {};
  const user = ensureUser(req.auth.email);
  if (!user.practiceSeen) user.practiceSeen = {};
  const pack = pickPractice({ subject, grade: classLevel, chapterId, topic: chapterId, kind: kind === "test" ? "test" : "flashcards", lessonId, count: 3 });
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
      complete: user.practiceSeen[key].points.length >= total,
      lessons: pack.coverage.lessons
    }
  });
});

router.get("/history", (req, res) => {
  res.json(getSkillHistory(req.auth.email));
});

router.post("/finish", async (req, res) => {
  const {
    kind = "test",
    chapter_id: chapterId = "",
    subject = "matematica",
    class_level: classLevel = 5,
    title = "",
    answers = [],
    picks = [],
    duration_ms: durationMs = 0,
    lesson_id: lessonId = ""
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
      const letter = "ABCD"[question.correct] || "";
      const judge = judgeAnswer({
        given: chosen,
        answers: [sample, letter].filter(Boolean),
        choices: question.options || [],
        letter,
        explain: question.explain || ""
      });
      return {
        id: question.id,
        point: question.point,
        lesson: question.lesson || "",
        prompt: question.question,
        given: chosen,
        skipped: !chosen,
        ok: judge.ok,
        credit: Number(judge.credit) || 0,
        verdict: judge.kind,
        found: true,
        explain: judge.teacher || question.explain,
        sample,
        steps: []
      };
    });
  }

  const correct = items.filter(item => item.ok).length;
  const credit = items.reduce((sum, item) => {
    const value = Number(item.credit);
    return sum + (Number.isFinite(value) ? value : (item.ok ? 1 : 0));
  }, 0);
  const total = items.length;
  const gradeNote = scoreToGrade(credit, total);
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

  noteCards(user, items, {
    lesson: title || chapterId || "Lecție",
    lessonId: chapterId,
    subject,
    grade: classLevel
  });

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
  const duration = Math.max(0, Number(durationMs) || 0);

  const onLesson = Boolean(String(lessonId || "").trim());
  if (isTest && !onLesson) {
    award = recordProgress({
      userId: req.auth.email,
      type: "chapter_test",
      trusted: true,
      note: title || "Test de capitol",
      meta: { subject, grade: classLevel, chapterId, title, score: correct, total, gradeNote, durationMs: duration }
    });
  } else if (!isTest && correct >= 5) {
    award = recordProgress({
      userId: req.auth.email,
      type: "flashcard_known",
      trusted: true,
      note: title || "Flashcarduri",
      meta: { subject, grade: classLevel, chapterId, title, topic: title || chapterId, correct }
    });
  }

  const homework = weaknesses.slice(0, 3).map(point => ({
    point,
    task: isTest
      ? `Temă scurtă: ia ideea „${point}” și rezolvă un exemplu nou, cu alte numere, pe caiet. Apoi spune tutorelui primul pas, nu tot.`
      : `Repetă mâine ideea „${point}”: o întrebare, apoi explică de ce varianta ta e bună.`
  }));

  const lessons = lessonsFor(subject, classLevel, chapterId) || [];
  const titleByLesson = new Map(lessons.map(lesson => [lesson.id, lesson.title]));
  const lessonsToReview = [];
  const seenLessons = new Set();
  items.filter(item => !item.ok && item.lesson).forEach(item => {
    if (seenLessons.has(item.lesson) || lessonsToReview.length >= 3) return;
    seenLessons.add(item.lesson);
    lessonsToReview.push({ id: item.lesson, title: titleByLesson.get(item.lesson) || item.lesson });
  });

  let parentNotify = { skipped: true, reason: onLesson ? "lesson_test" : "not_a_test" };
  if (isTest && !onLesson) {
    const { notifyParent } = require("../notify/parentActivity");
    parentNotify = await notifyParent({
      studentEmail: req.auth.email,
      type: "chapter_test",
      note: title || "Test de capitol",
      meta: {
        title: title || "Test de capitol",
        subject,
        gradeNote,
        durationMs: duration,
        answers: items.map(item => ({
          prompt: item.prompt,
          given: item.given,
          ok: item.ok,
          verdict: item.verdict || "",
          explain: item.explain || ""
        }))
      }
    });
  }

  res.json({
    items,
    correct,
    credit,
    total,
    grade: gradeNote,
    durationMs: duration,
    message,
    strengths,
    weaknesses,
    lessonsToReview,
    homework,
    history: review.snapshot,
    awarded: award?.awarded || null,
    summary: award?.summary || null,
    parentNotified: !parentNotify.skipped,
    parentNotify: {
      skipped: parentNotify.skipped,
      reason: parentNotify.reason || null
    }
  });
});

module.exports = router;
