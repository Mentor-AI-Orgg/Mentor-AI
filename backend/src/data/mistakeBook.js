const { rate, buildDeck } = require("./spacedRepetition");
const { resolveLessonId } = require("./lessonIds");
const { findExercise, checkExercise } = require("./exerciseBank");
const { findQuestion } = require("./practiceBank");
const { judgeAnswer } = require("../grading/answerJudge");

const DAILY_CAP = 10;
const MASTERED = "Pe asta ai învățat-o de tot! Bob cu bob.";

function dayKey(now = Date.now()) {
  return new Date(now).toISOString().slice(0, 10);
}

function clip(value, max = 120) {
  return String(value || "").trim().slice(0, max);
}

function boxesOf(user) {
  if (!user.mistakeBoxes || typeof user.mistakeBoxes !== "object") user.mistakeBoxes = {};
  return user.mistakeBoxes;
}

function reviewDay(user, now = Date.now()) {
  const key = dayKey(now);
  if (!user.mistakeReviewDay || user.mistakeReviewDay.date !== key) {
    user.mistakeReviewDay = { date: key, count: 0 };
  }
  return user.mistakeReviewDay;
}

function promptFor(id) {
  const exercise = findExercise(id);
  if (exercise?.prompt) return clip(exercise.prompt, 400);
  const question = findQuestion(id);
  if (question?.question) return clip(question.question, 400);
  return "";
}

function judgeItem(id, answer) {
  const exercise = checkExercise(id, answer);
  if (exercise.found) return exercise;
  const question = findQuestion(id);
  if (!question) return { ok: false, found: false };
  const chosen = String(answer || "").trim();
  const sample = question.options[question.correct] || "";
  const letter = "ABCD"[question.correct] || "";
  const judge = judgeAnswer({
    given: chosen,
    answers: [sample, letter].filter(Boolean),
    choices: question.options || [],
    letter,
    explain: question.explain || ""
  });
  return { ok: judge.ok, found: true, explain: judge.teacher || question.explain || "" };
}

function remember(card, correct, now, info = {}) {
  const results = Array.isArray(card.results) ? card.results.slice(-11) : [];
  results.push({ at: now, correct: Boolean(correct) });
  const given = info.given != null && String(info.given).trim()
    ? clip(info.given, 400)
    : clip(card.given || "", 400);
  return {
    box: card.box,
    streak: card.streak,
    due: card.due,
    lesson: clip(info.lesson || card.lesson || ""),
    lessonId: resolveLessonId(info.lessonId || card.lessonId || ""),
    subject: clip(info.subject || card.subject || "", 40),
    grade: clip(info.grade || card.grade || "", 8),
    skill: clip(info.skill || card.skill || "", 80),
    given,
    results
  };
}

function recordWrong(user, info = {}, now = Date.now()) {
  const id = clip(info.itemId, 80);
  if (!id) return null;
  const boxes = boxesOf(user);
  const next = rate(boxes[id] || {}, false, now);
  boxes[id] = remember({ ...(boxes[id] || {}), ...next }, false, now, info);
  return { id, card: boxes[id] };
}

function noteCards(user, items = [], info = {}) {
  for (const item of items) {
    if (!item || item.ok || item.skipped || item.found === false || !item.id) continue;
    recordWrong(user, {
      itemId: item.id,
      lesson: info.lesson || item.point || item.id,
      lessonId: info.lessonId || "",
      subject: info.subject || "",
      grade: info.grade || "",
      skill: item.skill || item.point || "",
      given: item.given || ""
    });
  }
}

function publicCard(id, card, now) {
  return {
    id,
    lesson: card.lesson || id,
    lessonId: resolveLessonId(card.lessonId || ""),
    subject: card.subject || "",
    grade: card.grade || "",
    due: card.due || null,
    box: card.box || 0,
    ready: Number(card.due || 0) <= now,
    prompt: promptFor(id)
  };
}

function snapshot(user, now = Date.now()) {
  const day = reviewDay(user, now);
  const left = Math.max(0, DAILY_CAP - day.count);
  const boxes = boxesOf(user);
  const due = buildDeck(boxes, now, left).map(row => ({
    ...row,
    lessonId: resolveLessonId(row.lessonId),
    prompt: promptFor(row.id),
    given: undefined
  }));
  const groups = {};
  for (const [id, card] of Object.entries(boxes)) {
    if (!card || card.retired) continue;
    const key = card.lesson || "Lecție";
    if (!groups[key]) {
      groups[key] = {
        lesson: key,
        lessonId: resolveLessonId(card.lessonId || ""),
        subject: card.subject || "",
        grade: card.grade || "",
        items: []
      };
    }
    groups[key].items.push(publicCard(id, card, now));
  }
  return {
    due,
    count: due.length,
    cap: DAILY_CAP,
    reviewedToday: day.count,
    groups: Object.values(groups)
  };
}

function review(user, itemId, answer, now = Date.now()) {
  const id = clip(itemId, 80);
  const boxes = boxesOf(user);
  const current = boxes[id];
  if (!current) return { ok: false, status: 404, error: "Exercițiul nu e în caiet." };
  if (Number(current.due || 0) > now) {
    return { ok: false, status: 400, error: "Încă nu e ziua acestui exercițiu." };
  }
  const day = reviewDay(user, now);
  if (day.count >= DAILY_CAP) {
    return { ok: false, status: 429, error: "Azi ai recapitulat deja 10 exerciții. Restul rămân pe mâine." };
  }
  const judged = judgeItem(id, answer);
  if (!judged.found) return { ok: false, status: 404, error: "Exercițiul nu a fost găsit." };
  day.count += 1;
  const next = rate(current, judged.ok, now);
  let message = "";
  if (next.retired) {
    delete boxes[id];
    message = MASTERED;
  } else {
    boxes[id] = remember({ ...current, ...next }, judged.ok, now, current);
  }
  return {
    ok: true,
    status: 200,
    correct: judged.ok,
    retired: next.retired,
    message,
    explain: judged.ok ? "" : (judged.explain || ""),
    book: snapshot(user, now)
  };
}

function exportRows(user) {
  return Object.entries(boxesOf(user)).map(([id, card]) => ({
    id,
    lectie: card.lesson || "",
    lectieId: resolveLessonId(card.lessonId || ""),
    rezultate: (Array.isArray(card.results) ? card.results : []).map(row => ({
      la: row.at,
      corect: Boolean(row.correct)
    }))
  }));
}

module.exports = {
  DAILY_CAP,
  MASTERED,
  recordWrong,
  noteCards,
  snapshot,
  review,
  exportRows,
  promptFor
};
