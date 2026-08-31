const { ensureUser } = require('./economyStore');
const { minStayMs, examMs } = require('./enPaperFactory');

function paperState(user, paperId) {
  if (!user.enPapers || typeof user.enPapers !== 'object') user.enPapers = {};
  if (!user.enPapers[paperId]) {
    user.enPapers[paperId] = {
      openedAt: 0,
      startedAt: 0,
      finishedAt: 0,
      durationMs: 0,
      answers: [],
      score: null
    };
  }
  return user.enPapers[paperId];
}

function sessionView(state, paperId) {
  const now = Date.now();
  const started = Boolean(state.startedAt);
  const finished = Boolean(state.finishedAt);
  const elapsed = started ? Math.max(0, (state.finishedAt || now) - state.startedAt) : 0;
  const stayLeft = started && !finished ? Math.max(0, minStayMs() - (now - state.startedAt)) : 0;
  const examLeft = started && !finished ? Math.max(0, examMs() - (now - state.startedAt)) : 0;
  return {
    paperId,
    started,
    finished,
    startedAt: state.startedAt || 0,
    finishedAt: state.finishedAt || 0,
    durationMs: finished ? state.durationMs : elapsed,
    minStayMs: minStayMs(),
    examMs: examMs(),
    canFinish: started && !finished && stayLeft === 0,
    waitMs: stayLeft,
    examLeftMs: examLeft,
    result: finished && state.score ? state.score : null
  };
}

function previewPaper(userId, paperId) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  if (!state.openedAt) state.openedAt = Date.now();
  return sessionView(state, paperId);
}

function startPaper(userId, paperId) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  if (!state.openedAt) state.openedAt = Date.now();
  if (!state.startedAt && !state.finishedAt) state.startedAt = Date.now();
  return sessionView(state, paperId);
}

function canFinish(userId, paperId) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  if (state.finishedAt) {
    return { ok: true, already: true };
  }
  if (!state.startedAt) {
    return { ok: false, reason: 'Apasă mai întâi „Începe test Evaluare Națională”.' };
  }
  const wait = minStayMs() - (Date.now() - state.startedAt);
  if (wait > 0) {
    return {
      ok: false,
      reason: `Ca la examen, poți preda lucrarea abia după timpul minim de sală (${Math.ceil(minStayMs() / 60000)} minute). Mai așteaptă ${Math.ceil(wait / 60000)} minute.`,
      waitMs: wait
    };
  }
  return { ok: true };
}

function finishPaper(userId, paperId, score, answers) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  if (state.finishedAt && state.score) {
    return sessionView(state, paperId);
  }
  const now = Date.now();
  state.finishedAt = now;
  state.durationMs = Math.max(0, now - (state.startedAt || now));
  state.answers = Array.isArray(answers) ? answers : [];
  state.score = score;
  return sessionView(state, paperId);
}

function isFinished(userId, paperId) {
  const user = ensureUser(userId);
  return Boolean(paperState(user, paperId).finishedAt);
}

// Compat: open = preview, fără cronometru de examen.
const openPaper = previewPaper;

module.exports = {
  previewPaper,
  openPaper,
  startPaper,
  canFinish,
  finishPaper,
  isFinished,
  paperState,
  sessionView
};
