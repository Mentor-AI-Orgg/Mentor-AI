const { BANK } = require("./data/practiceBank");
const { yesterdayKey } = require("./data/progressEngine");
const { ensureUser, recordDailyChallenge } = require("./data/economyStore");

function gradeOf(value) {
  const match = String(value == null ? "" : value).match(/[5-8]/);
  return match ? match[0] : "5";
}

function dayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function subjectForDate(dateKey) {
  const day = Number(String(dateKey).slice(-2));
  return day % 2 === 0 ? "romana" : "matematica";
}

function poolFor(subject, grade) {
  const prefix = `${subject}:${grade}:`;
  const list = [];
  Object.entries(BANK).forEach(([key, items]) => {
    if (!key.startsWith(prefix) || !Array.isArray(items)) return;
    items.forEach(item => {
      if (!item || !item.id || !item.question) return;
      if (!Array.isArray(item.options) || item.options.length < 2) return;
      if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct >= item.options.length) return;
      list.push(item);
    });
  });
  list.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  return list;
}

function pickIndex(dateKey, length) {
  let hash = 2166136261;
  const text = `provocare:${dateKey}`;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % length;
}

function challengeFor({ grade, date }) {
  const day = date || dayKey();
  let subject = subjectForDate(day);
  let pool = poolFor(subject, gradeOf(grade));
  if (!pool.length) {
    subject = subject === "romana" ? "matematica" : "romana";
    pool = poolFor(subject, gradeOf(grade));
  }
  if (!pool.length) return null;
  const item = pool[pickIndex(day, pool.length)];
  return {
    date: day,
    subject,
    id: item.id,
    question: item.question,
    options: item.options.slice(),
    correctIndex: item.correct,
    explain: item.explain || ""
  };
}

function visibleStreak(user, today) {
  const row = user.dailyChallenge || {};
  if (row.date === today) return Number(row.streak) || 0;
  if (row.date === yesterdayKey(new Date(`${today}T12:00:00.000Z`))) return Number(row.streak) || 0;
  return 0;
}

function publicCard(picked, extra) {
  return {
    date: picked.date,
    subject: picked.subject,
    id: picked.id,
    question: picked.question,
    options: picked.options,
    ...extra
  };
}

function dailyView(userId, grade, now = new Date()) {
  const picked = challengeFor({ grade, date: dayKey(now) });
  if (!picked) return null;
  const user = ensureUser(userId);
  const row = user.dailyChallenge || {};
  const answered = row.date === picked.date;
  const card = publicCard(picked, {
    streak: visibleStreak(user, picked.date),
    answered
  });
  if (answered) {
    card.correct = Boolean(row.correct);
    card.answer = picked.correctIndex;
    card.explain = picked.explain;
  }
  return card;
}

function answerDaily(userId, grade, choice, now = new Date()) {
  const picked = challengeFor({ grade, date: dayKey(now) });
  if (!picked) return { ok: false, error: "Nu am o provocare pentru azi." };
  const user = ensureUser(userId);
  const row = user.dailyChallenge || {};
  if (row.date === picked.date) {
    return {
      ok: true,
      already: true,
      ...publicCard(picked, {
        answered: true,
        correct: Boolean(row.correct),
        answer: picked.correctIndex,
        explain: picked.explain,
        streak: Number(row.streak) || 0,
        xp: 0,
        coins: 0
      }),
      summary: null
    };
  }
  const correct = Number(choice) === picked.correctIndex;
  const streak = row.date === yesterdayKey(now) ? (Number(row.streak) || 0) + 1 : 1;
  const granted = recordDailyChallenge(user, {
    date: picked.date,
    id: picked.id,
    correct,
    streak
  });
  return {
    ok: true,
    already: false,
    ...publicCard(picked, {
      answered: true,
      correct,
      answer: picked.correctIndex,
      explain: picked.explain,
      streak,
      xp: granted.xp,
      coins: granted.coins
    }),
    summary: granted.summary
  };
}

module.exports = {
  challengeFor,
  dailyView,
  answerDaily,
  subjectForDate,
  gradeOf
};
