const express = require("express");
const router = express.Router();

const { listCards, findCard } = require("../data/cardBank");
const { lessonsFor } = require("../data/gimnaziuLessons");
const { ensureUser, getTodayKey } = require("../data/economyStore");
const { rate, buildDeck } = require("../data/spacedRepetition");

const RESULTS = new Set(["nu", "aproape", "stiam"]);
const MODES = new Set(["lesson", "chapter", "extra"]);

function titlesFor(subject, grade, chapterId) {
  const lessons = lessonsFor(subject, grade, chapterId) || [];
  return new Map(lessons.map(lesson => [lesson.id, lesson.title]));
}

function studyBoxes(user) {
  if (!user.cardBoxes || typeof user.cardBoxes !== "object") user.cardBoxes = {};
  return user.cardBoxes;
}

function pruneMissingCards(boxes) {
  Object.keys(boxes).forEach(id => {
    const entry = boxes[id];
    if (entry && Number(entry.b) >= 1 && !findCard(id)) delete boxes[id];
  });
}

function countsFor(cards, boxes, today) {
  let due = 0;
  let fresh = 0;
  let learned = 0;
  let nextDue = "";
  cards.forEach(card => {
    const saved = boxes[card.id];
    if (!saved || !(Number(saved.b) >= 1)) {
      fresh += 1;
      return;
    }
    if (Number(saved.b) >= 4) learned += 1;
    if (String(saved.due || "") <= today) due += 1;
    else if (!nextDue || String(saved.due) < nextDue) nextDue = String(saved.due);
  });
  return { due, new: fresh, learned, nextDue: nextDue || null };
}

function publicCard(card, boxes, titles) {
  const saved = boxes[card.id];
  const known = saved && Number(saved.b) >= 1;
  return {
    id: card.id,
    lesson: card.lesson,
    lessonTitle: titles.get(card.lesson) || card.lesson,
    type: card.type,
    front: card.front,
    back: card.back,
    why: card.why,
    figure: card.figure || "",
    box: known ? Number(saved.b) : 0,
    isNew: !known
  };
}

router.post("/deck", (req, res) => {
  const subject = String(req.body?.subject || "matematica");
  const grade = req.body?.class_level;
  const chapterId = String(req.body?.chapter_id || "");
  const lessonId = String(req.body?.lesson_id || "");
  const mode = String(req.body?.mode || (lessonId ? "lesson" : "chapter"));
  if (!chapterId) return res.status(400).json({ error: "Trimite chapter_id." });
  if (!MODES.has(mode)) return res.status(400).json({ error: "Modul nu este recunoscut." });
  if (mode === "lesson" && !lessonId) return res.status(400).json({ error: "Trimite lesson_id." });

  const user = ensureUser(req.auth.email);
  const boxes = studyBoxes(user);
  const today = getTodayKey();
  const pool = listCards(subject, grade, chapterId, mode === "lesson" ? lessonId : "");
  const titles = titlesFor(subject, grade, chapterId);
  const picked = buildDeck({ cards: pool, boxes, today, mode });
  const counts = countsFor(pool, boxes, today);
  res.json({
    cards: picked.map(card => publicCard(card, boxes, titles)),
    counts: { due: counts.due, new: counts.new, learned: counts.learned },
    nextDue: counts.nextDue
  });
});

router.post("/rate", (req, res) => {
  const cardId = String(req.body?.card_id || "");
  const result = String(req.body?.result || "");
  const mode = String(req.body?.mode || "chapter");
  if (!RESULTS.has(result)) return res.status(400).json({ error: "Răspunsul poate fi nu, aproape sau stiam." });
  const card = findCard(cardId);
  if (!card) return res.status(404).json({ error: "Cardul nu a fost găsit." });

  const user = ensureUser(req.auth.email);
  const boxes = studyBoxes(user);
  pruneMissingCards(boxes);
  const today = getTodayKey();
  const next = rate(boxes[cardId] || {}, result, today, mode);
  boxes[cardId] = next;
  res.json({ box: next.b, due: next.due });
});

router.get("/summary", (req, res) => {
  const subject = String(req.query?.subject || "matematica");
  const grade = req.query?.class_level;
  const chapterId = String(req.query?.chapter_id || "");
  if (!chapterId) return res.status(400).json({ error: "Trimite chapter_id." });
  const user = ensureUser(req.auth.email);
  const boxes = studyBoxes(user);
  const today = getTodayKey();
  const titles = titlesFor(subject, grade, chapterId);
  const cards = listCards(subject, grade, chapterId);
  const byLesson = new Map();
  cards.forEach(card => {
    if (!byLesson.has(card.lesson)) {
      byLesson.set(card.lesson, { lesson: card.lesson, title: titles.get(card.lesson) || card.lesson, total: 0, due: 0, learned: 0, unseen: 0 });
    }
    const row = byLesson.get(card.lesson);
    row.total += 1;
    const saved = boxes[card.id];
    if (!saved || !(Number(saved.b) >= 1)) row.unseen += 1;
    else {
      if (Number(saved.b) >= 4) row.learned += 1;
      if (String(saved.due || "") <= today) row.due += 1;
    }
  });
  const counts = countsFor(cards, boxes, today);
  res.json({
    lessons: [...byLesson.values()],
    nextDue: counts.nextDue,
    total: cards.length,
    due: counts.due,
    unseen: counts.new
  });
});

module.exports = router;
