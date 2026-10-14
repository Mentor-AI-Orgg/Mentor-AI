const { getUser, childShare } = require("../data/economyStore");
const { lateActivityNote } = require("../ops/bucharestDay");
const { inboxFor, setSettings, getSettings } = require("../data/friendStore");

function dayKey(time) {
  return new Date(time).toISOString().slice(0, 10);
}

function minutesToday(email, now = Date.now()) {
  const user = getUser(email) || {};
  const key = dayKey(now);
  const events = Array.isArray(user.digestEvents) ? user.digestEvents : [];
  return events
    .filter(event => String(event.at || "").slice(0, 10) === key)
    .reduce((sum, event) => sum + (Number(event.minutes) || 0), 0);
}

function timeBlocked(account, now = Date.now()) {
  const limit = Number(account?.profile?.dailyLimit) || 0;
  if (!limit) return false;
  return minutesToday(account.email, now) >= limit;
}

function buildPanel(email) {
  const user = getUser(email) || {};
  const events = Array.isArray(user.digestEvents) ? user.digestEvents : [];
  const log = Array.isArray(user.activityLog) ? user.activityLog : [];
  const start = Date.now() - 6 * 24 * 60 * 60 * 1000;
  const days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const key = dayKey(Date.now() - i * 24 * 60 * 60 * 1000);
    const slice = events.filter(event => String(event.at || "").slice(0, 10) === key);
    days.push({
      day: key,
      lessons: slice.filter(event => event.type !== "en_exam" && event.type !== "chapter_test").length,
      minutes: slice.reduce((sum, event) => sum + (Number(event.minutes) || 0), 0)
    });
  }
  const chapters = Object.entries(user.chapters || {}).map(([id, chapter]) => ({
    id,
    title: chapter.title || id,
    subject: chapter.subject || "",
    percent: Math.min(100, Math.round(Number(chapter.percent || chapter.progress || 0)))
  }));
  const fromBook = {};
  for (const card of Object.values(user.mistakeBoxes || {})) {
    if (!card) continue;
    const wrong = (Array.isArray(card.results) ? card.results : []).filter(row => row && row.correct === false).length || 1;
    const title = card.lesson || "Lecție";
    if (!fromBook[title]) {
      fromBook[title] = {
        title,
        count: 0,
        lessonId: card.lessonId || "",
        subject: card.subject || "",
        grade: card.grade || ""
      };
    }
    fromBook[title].count += wrong;
  }
  let mistakes = Object.values(fromBook).sort((a, b) => b.count - a.count).slice(0, 5);
  if (!mistakes.length) {
    const misses = {};
    for (const event of events) {
      if (event.correct == null || event.total == null) continue;
      const wrong = Number(event.total) - Number(event.correct);
      if (wrong <= 0) continue;
      const title = event.title || "Lecție";
      misses[title] = (misses[title] || 0) + wrong;
    }
    mistakes = Object.entries(misses)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, count]) => ({ title, count, lessonId: "", subject: "", grade: "" }));
  }
  const done = log
    .filter(entry => entry.type === "session_complete" || entry.type === "chapter_test")
    .slice(-5)
    .map(entry => ({ type: entry.type, at: entry.createdAt || "" }));
  const en = events
    .filter(event => event.type === "en_exam")
    .slice(-8)
    .map(event => ({ title: event.title || "Simulare", correct: event.correct, total: event.total, at: event.at }));
  const social = inboxFor(email);
  const share = childShare(email);
  return {
    readiness: share.readiness,
    milestones: share.milestones,
    lateNote: lateActivityNote(user.lateActivity?.at),
    days: days.filter(day => Date.parse(day.day) >= start - 24 * 60 * 60 * 1000),
    chapters,
    mistakes,
    done,
    en,
    friends: (social.friends || []).map(person => ({ username: person.username, id: person.id })),
    incoming: (social.incoming || []).map(item => ({ id: item.id, username: item.from?.username || "" })),
    friendsEnabled: getSettings(email).acceptFriendRequests !== false
  };
}

function setFriendAccess(email, enabled) {
  setSettings(email, { acceptFriendRequests: Boolean(enabled) });
}

module.exports = { buildPanel, setFriendAccess, timeBlocked, minutesToday };
