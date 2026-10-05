// Sesiunea unui test de capitol ține lista de itemi pe server.
// /finish punctează doar id-urile din sesiune. Nota și durata nu vin din browser.

const crypto = require("crypto");
const { ensureUser } = require("./economyStore");

const MAX_DURATION_MS = 3 * 60 * 60 * 1000;
const MAX_STORED = 24;

function capDurationMs(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(Math.floor(n), MAX_DURATION_MS);
}

function sessionsOf(user) {
  if (!user.chapterTestSessions || typeof user.chapterTestSessions !== "object") {
    user.chapterTestSessions = {};
  }
  return user.chapterTestSessions;
}

function trimSessions(sessions) {
  const ids = Object.keys(sessions);
  if (ids.length <= MAX_STORED) return;
  const finished = ids
    .filter(id => sessions[id] && sessions[id].finishedAt)
    .sort((a, b) => (sessions[a].startedAt || 0) - (sessions[b].startedAt || 0));
  while (Object.keys(sessions).length > MAX_STORED && finished.length) {
    delete sessions[finished.shift()];
  }
}

function openChapterTest(userId, { cardIds = [], subject = "", grade = "", chapterId = "" } = {}) {
  const user = ensureUser(userId);
  const sessions = sessionsOf(user);
  const id = crypto.randomBytes(12).toString("hex");
  const ids = [...new Set((cardIds || []).map(idValue => String(idValue || "")).filter(Boolean))];
  sessions[id] = {
    id,
    cardIds: ids,
    subject: String(subject || ""),
    grade: String(grade || ""),
    chapterId: String(chapterId || ""),
    startedAt: Date.now(),
    finishedAt: 0,
    durationMs: 0,
    score: null
  };
  trimSessions(sessions);
  return sessions[id];
}

function getChapterTest(userId, sessionId) {
  const key = String(sessionId || "");
  if (!key) return null;
  const user = ensureUser(userId);
  const session = sessionsOf(user)[key];
  return session || null;
}

function hasForeignCard(session, answers) {
  const allowed = new Set(session?.cardIds || []);
  const list = Array.isArray(answers) ? answers : [];
  return list.some(row => {
    const id = String(row?.card_id || row?.id || "");
    return !allowed.has(id);
  });
}

function pairsForSession(session, answers) {
  const byId = new Map();
  (Array.isArray(answers) ? answers : []).forEach(row => {
    const id = String(row?.card_id || row?.id || "");
    if (!id || byId.has(id)) return;
    byId.set(id, row?.answer == null ? "" : row.answer);
  });
  return (session.cardIds || []).map(id => ({
    card_id: id,
    answer: byId.has(id) ? byId.get(id) : ""
  }));
}

function finishChapterTest(userId, sessionId, score = {}) {
  const session = getChapterTest(userId, sessionId);
  if (!session || session.finishedAt) return session;
  const now = Date.now();
  session.finishedAt = now;
  session.durationMs = capDurationMs(now - (session.startedAt || now));
  session.score = {
    correct: Number(score.correct) || 0,
    total: Number(score.total) || 0
  };
  return session;
}

function answerKeyVisible(userId, cardId) {
  const id = String(cardId || "");
  if (!id) return false;
  const sessions = Object.values(sessionsOf(ensureUser(userId)));
  let inOpen = false;
  let inFinished = false;
  sessions.forEach(session => {
    if (!session || !Array.isArray(session.cardIds) || !session.cardIds.includes(id)) return;
    if (session.finishedAt) inFinished = true;
    else inOpen = true;
  });
  return inFinished && !inOpen;
}

module.exports = {
  MAX_DURATION_MS,
  capDurationMs,
  openChapterTest,
  getChapterTest,
  hasForeignCard,
  pairsForSession,
  finishChapterTest,
  answerKeyVisible
};
