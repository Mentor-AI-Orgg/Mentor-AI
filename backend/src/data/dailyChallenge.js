// Provocarea zilei e a elevului, nu a clasei: cinci întrebări din capitolele
// pe care le-a terminat deja. Aceeași zi și același elev dau mereu aceleași
// întrebări. Dacă a terminat prea puțin, luăm ce există.

const crypto = require('crypto');
const { BANK } = require('./practiceBank');
const mathQuiz = require('./quiz/matematica');
const romanaQuiz = require('./quiz/romana');

const GOAL = 5;
const RANK_LIMIT = 20;
const EMPTY_MESSAGE = 'Încă nu ai terminat o lecție. Provocarea zilei reia întrebări din lecțiile pe care le-ai făcut deja. Deschide prima lecție, apoi revino aici.';

function usable(item) {
  if (!item || typeof item.id !== 'string' || !item.id) return false;
  if (typeof item.question !== 'string' || item.question.length < 8) return false;
  if (!Array.isArray(item.options) || item.options.length < 2) return false;
  if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct >= item.options.length) return false;
  return true;
}

function questionsForChapter(key) {
  return [
    ...(BANK[key] || []),
    ...mathQuiz.flashcardsFor(key),
    ...mathQuiz.testsFor(key),
    ...romanaQuiz.flashcardsFor(key),
    ...romanaQuiz.testsFor(key)
  ].filter(usable);
}

function reviewPool(chapters) {
  const keys = Object.keys(chapters || {})
    .filter(key => chapters[key] && chapters[key].status === 'done')
    .sort();
  const seen = new Set();
  const pool = [];
  keys.forEach(key => {
    questionsForChapter(key).forEach(item => {
      if (seen.has(item.id)) return;
      seen.add(item.id);
      pool.push(item);
    });
  });
  return pool;
}

function hashInt(text) {
  return crypto.createHash('sha256').update(String(text)).digest().readUInt32BE(0);
}

function rng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function shuffle(list, rand) {
  const next = list.slice();
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rand() * (index + 1));
    const hold = next[index];
    next[index] = next[swap];
    next[swap] = hold;
  }
  return next;
}

function serve(item, seed) {
  const options = shuffle(item.options.map(option => String(option)), rng(hashInt(`${seed}:${item.id}`)));
  const correctText = String(item.options[item.correct]);
  const correctAt = options.indexOf(correctText);
  if (correctAt < 0) return null;
  return {
    id: item.id,
    question: item.question,
    options,
    correctAt
  };
}

function pickDaily(pool, seed, goal = GOAL) {
  const ordered = pool.slice().sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const chosen = shuffle(ordered, rng(hashInt(seed))).slice(0, Math.min(goal, ordered.length));
  return chosen.map(item => serve(item, seed)).filter(Boolean);
}

function publicQuestions(questions) {
  return (questions || []).map(item => ({
    id: item.id,
    question: item.question,
    options: item.options
  }));
}

function gradeAnswers(questions, answers) {
  const byId = new Map((questions || []).map(item => [item.id, item]));
  const seen = new Set();
  let correct = 0;
  (answers || []).forEach(answer => {
    const item = byId.get(answer.id);
    if (!item || seen.has(answer.id)) return;
    seen.add(answer.id);
    if (answer.choice === item.correctAt) correct += 1;
  });
  return correct;
}

function rankRows(rows) {
  const sorted = rows.slice().sort((a, b) =>
    b.correct - a.correct
    || b.xp - a.xp
    || String(a.nickname).localeCompare(String(b.nickname), 'ro'));
  return sorted.slice(0, RANK_LIMIT).map((row, index) => ({
    place: index + 1,
    nickname: row.nickname,
    correct: row.correct,
    total: row.total,
    xp: row.xp
  }));
}

module.exports = {
  GOAL,
  EMPTY_MESSAGE,
  reviewPool,
  pickDaily,
  publicQuestions,
  gradeAnswers,
  rankRows
};
