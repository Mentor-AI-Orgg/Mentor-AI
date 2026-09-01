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

function applyPhotoReview(userId, paperId, patch) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  if (!state.photoReviews) state.photoReviews = [];
  state.photoReviews.push({
    at: Date.now(),
    kind: patch.kind,
    block: patch.block,
    n: patch.n,
    feedback: patch.feedback,
    mocked: Boolean(patch.mocked)
  });
  if (state.score && Array.isArray(state.score.items) && patch.block && Number.isFinite(Number(patch.n))) {
    const item = state.score.items.find(row => row.block === patch.block && Number(row.n) === Number(patch.n));
    if (item) {
      item.photoFeedback = patch.feedback;
      item.photoTips = patch.tips || [];
      item.photoPending = false;
      if (patch.extracted) {
        item.given = patch.extracted;
        item.text = patch.extracted;
      }
      if (item.kind === 'write' && Number.isFinite(Number(patch.points))) {
        const maxPts = Number(item.maxPoints) || 20;
        const pts = Math.max(0, Math.min(maxPts, Math.round(Number(patch.points))));
        const delta = pts - (Number(item.points) || 0);
        item.points = pts;
        item.ok = pts >= Math.round(maxPts * 0.5);
        state.score.points = Math.max(10, Math.min(100, (Number(state.score.points) || 10) + delta));
        state.score.grade = (state.score.points / 10).toFixed(2);
      }
    }
  }
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
  applyPhotoReview,
  paperState,
  sessionView
};
