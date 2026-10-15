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
const {
  capDurationMs,
  openChapterTest,
  getChapterTest,
  hasForeignCard,
  pairsForSession,
  finishChapterTest,
  answerKeyVisible
} = require("../data/chapterTestSession");
const { markOpen, releaseItems } = require("../data/practiceGate");

function sealedCheck(result) {
  const verdict = result.verdict || (result.ok ? "exact" : "wrong");
  let explain = "Nu am punctat. Baremul apare după ce predai testul.";
  if (verdict === "empty") explain = "Foaia e goală la acest item. Scrie răspunsul, chiar scurt.";
  else if (result.ok) explain = "Am punctat. Baremul apare după ce predai testul.";
  else if (verdict === "partial") explain = "Am dat jumătate. Baremul apare după ce predai testul.";
  else if (verdict === "near") explain = "Nu am punctat. Ești aproape. Baremul apare după ce predai testul.";
  return {
    ok: Boolean(result.ok),
    credit: Number(result.credit) || 0,
    verdict,
    explain,
    sample: "",
    steps: [],
    rubric: null
  };
}

function releasedCheck(result) {
  return {
    ok: Boolean(result.ok),
    credit: Number(result.credit) || 0,
    verdict: result.verdict || (result.ok ? "exact" : "wrong"),
    explain: result.explain || "",
    sample: result.sample || "",
    steps: Array.isArray(result.steps) ? result.steps : [],
    rubric: result.rubric || null
  };
}

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

  const chapterTest = (kind === "test") && !String(lessonId || "").trim();
  let sessionId = "";
  if (chapterTest && pack.cards.length) {
    const session = openChapterTest(req.auth.email, {
      cardIds: pack.cards.map(card => card.id),
      subject: pack.subject,
      grade: pack.grade,
      chapterId: pack.chapterId
    });
    sessionId = session.id;
  }
  if (pack.cards.length && (kind === "test" || kind === "flashcards")) {
    markOpen(user, pack.cards.map(card => card.id), {
      source: kind === "test" ? "quiz" : "flashcard",
      sessionId
    });
  }

  res.json({
    ...pack,
    session_id: sessionId,
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
  // Baremul (sample, pași, explicația cu răspunsul) doar după predare.
  const released = answerKeyVisible(req.auth.email, cardId);
  res.json(released ? releasedCheck(result) : sealedCheck(result));
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
    lesson_id: lessonId = "",
    session_id: sessionId = ""
  } = req.body || {};

  const isTest = kind !== "flashcards";
  const onLesson = Boolean(String(lessonId || "").trim());
  const isChapterTest = isTest && !onLesson;
  let session = null;
  if (isChapterTest) {
    session = getChapterTest(req.auth.email, sessionId);
    if (!session || session.finishedAt) {
      return res.status(400).json({ error: "Deschide testul din nou. Sesiunea nu e deschisă." });
    }
    if (hasForeignCard(session, answers)) {
      return res.status(400).json({ error: "Un exercițiu nu face parte din testul ăsta." });
    }
  }

  let items = [];

  if (isTest) {
    const pairs = session ? pairsForSession(session, answers) : (Array.isArray(answers) ? answers : []);
    items = checkMany(pairs);
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

  const scoredSubject = session ? session.subject : subject;
  const scoredGrade = session ? session.grade : classLevel;
  const scoredChapter = session ? session.chapterId : chapterId;

  const user = ensureUser(req.auth.email);
  if (!user.practiceSeen) user.practiceSeen = {};
  const pack = pickPractice({
    subject: scoredSubject,
    grade: scoredGrade,
    chapterId: scoredChapter,
    topic: scoredChapter,
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
    lesson: title || scoredChapter || "Lecție",
    lessonId: scoredChapter,
    subject: scoredSubject,
    grade: scoredGrade
  });

  const review = recordSkillReview(req.auth.email, {
    kind: isTest ? "test" : "flashcards",
    subject: scoredSubject,
    grade: scoredGrade,
    chapterId: scoredChapter,
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
  let duration = capDurationMs(durationMs);
  releaseItems(user, items.map(item => ({
    id: item.id,
    given: item.given,
    ok: item.ok,
    lesson: item.lesson
  })), {
    source: isTest ? "quiz" : "flashcard",
    sessionId: session?.id || "",
    subject: scoredSubject,
    grade: scoredGrade,
    chapterId: scoredChapter,
    lessonId: String(lessonId || "")
  });

  if (session) {
    const closed = finishChapterTest(req.auth.email, session.id, {
      correct,
      total,
      answers: items.map(item => ({ id: item.id, given: item.given, ok: item.ok }))
    });
    duration = closed ? closed.durationMs : duration;
  }

  if (isChapterTest) {
    award = recordProgress({
      userId: req.auth.email,
      type: "chapter_test",
      trusted: true,
      note: title || "Test de capitol",
      meta: {
        subject: scoredSubject,
        grade: scoredGrade,
        chapterId: scoredChapter,
        title,
        score: correct,
        correct,
        total,
        gradeNote,
        durationMs: duration,
        serverScored: true
      }
    });
  } else if (!isTest && correct >= 5) {
    award = recordProgress({
      userId: req.auth.email,
      type: "flashcard_known",
      trusted: true,
      note: title || "Flashcarduri",
      meta: { subject: scoredSubject, grade: scoredGrade, chapterId: scoredChapter, title, topic: title || scoredChapter, correct }
    });
  }

  const homework = weaknesses.slice(0, 3).map(point => ({
    point,
    task: isTest
      ? `Temă scurtă: ia ideea „${point}” și rezolvă un exemplu nou, cu alte numere, pe caiet. Apoi spune tutorelui primul pas, nu tot.`
      : `Repetă mâine ideea „${point}”: o întrebare, apoi explică de ce varianta ta e bună.`
  }));

  const lessons = lessonsFor(scoredSubject, scoredGrade, scoredChapter) || [];
  const titleByLesson = new Map(lessons.map(lesson => [lesson.id, lesson.title]));
  const lessonsToReview = [];
  const seenLessons = new Set();
  items.filter(item => !item.ok && item.lesson).forEach(item => {
    if (seenLessons.has(item.lesson) || lessonsToReview.length >= 3) return;
    seenLessons.add(item.lesson);
    lessonsToReview.push({ id: item.lesson, title: titleByLesson.get(item.lesson) || item.lesson });
  });

  let parentNotify = { skipped: true, reason: onLesson ? "lesson_test" : "not_a_test" };
  if (isChapterTest) {
    const { notifyParent } = require("../notify/parentActivity");
    parentNotify = await notifyParent({
      studentEmail: req.auth.email,
      type: "chapter_test",
      meta: {
        title: title || "Test de capitol",
        subject: scoredSubject,
        grade: scoredGrade,
        chapterId: scoredChapter,
        gradeNote,
        correct,
        score: correct,
        total,
        durationMs: duration,
        serverScored: true,
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
    chest: award?.chest || null,
    parentNotified: !parentNotify.skipped,
    parentNotify: {
      skipped: parentNotify.skipped,
      reason: parentNotify.reason || null
    }
  });
});

module.exports = router;
