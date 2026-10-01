const { ensureUser } = require('./economyStore');
const { timingForPaper, publicPaperById, selfGradeFor } = require('./enPaperFactory');

function clocks(paperId) {
  return timingForPaper(publicPaperById(paperId));
}

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
  const { stayMs, examMs: limitMs, mode } = clocks(paperId);
  const stayLeft = started && !finished ? Math.max(0, stayMs - (now - state.startedAt)) : 0;
  const examLeft = started && !finished ? Math.max(0, limitMs - (now - state.startedAt)) : 0;
  return {
    paperId,
    started,
    finished,
    startedAt: state.startedAt || 0,
    finishedAt: state.finishedAt || 0,
    durationMs: finished ? state.durationMs : elapsed,
    minStayMs: stayMs,
    examMs: limitMs,
    mode: mode || 'exam',
    canFinish: started && !finished && stayLeft === 0,
    waitMs: stayLeft,
    examLeftMs: examLeft,
    result: finished && state.score ? withSelf(state) : null
  };
}

function withSelf(state) {
  const score = state.score;
  if (!state.selfScores) return score;
  const extra = selfGradeFor(score, state.selfScores);
  return extra ? { ...score, ...extra } : score;
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
    return { ok: false, reason: 'Pornește testul înainte să predai lucrarea.' };
  }
  const { stayMs } = clocks(paperId);
  const wait = stayMs - (Date.now() - state.startedAt);
  if (wait > 0) {
    return {
      ok: false,
      reason: `Ca la examen, poți preda lucrarea abia după timpul minim de sală (${Math.ceil(stayMs / 60000)} minute). Mai așteaptă ${Math.ceil(wait / 60000)} minute. La antrenamentul scurt nu există această regulă.`,
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
        state.score.points = Math.max(
          Number(state.score.oficiu) || 10,
          Math.min(Number(state.score.max) || 100, (Number(state.score.points) || 10) + delta)
        );
        const ceiling = Number(state.score.max) || 100;
        state.score.grade = ((state.score.points / ceiling) * 10).toFixed(2);
      }
    }
  }
  return sessionView(state, paperId);
}

function saveSelfScore(userId, paperId, block, n, points) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  if (!state.finishedAt || !state.score) return null;
  if (!state.selfScores || typeof state.selfScores !== 'object') state.selfScores = {};
  state.selfScores[`${block}:${Number(n)}`] = points;
  const extra = selfGradeFor(state.score, state.selfScores);
  state.selfPoints = extra.selfPoints;
  state.selfGrade = extra.selfGrade;
  return sessionView(state, paperId);
}

function isFinished(userId, paperId) {
  const user = ensureUser(userId);
  return Boolean(paperState(user, paperId).finishedAt);
}

// Compat: open = preview, fără cronometru de examen.
const openPaper = previewPaper;

const { getUser } = require('./economyStore');
const registry = require('./userDataRegistry');

registry.register('evaluare', {
  exportFor(email) {
    const user = getUser(email);
    const papers = user?.enPapers && typeof user.enPapers === 'object' ? user.enPapers : {};
    return {
      lucrari: Object.entries(papers).map(([id, state]) => ({
        id,
        punctaj: state?.score ?? null,
        deschisLa: state?.openedAt || 0
      }))
    };
  },
  eraseFor(email) {
    const user = getUser(email);
    if (user) delete user.enPapers;
  }
});

module.exports = {
  previewPaper,
  openPaper,
  startPaper,
  canFinish,
  finishPaper,
  saveSelfScore,
  isFinished,
  applyPhotoReview,
  paperState,
  sessionView
};
