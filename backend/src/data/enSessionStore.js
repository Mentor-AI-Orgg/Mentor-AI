const { ensureUser } = require('./economyStore');
const {
  WORK_LOCK_MS,
  REVEAL_GAP_MS,
  FAST_WINDOW_MS,
  FAST_LIMIT,
  FAST_COOLDOWN_MS
} = require('./enPaperFactory');

function paperState(user, paperId) {
  if (!user.enPapers || typeof user.enPapers !== 'object') user.enPapers = {};
  if (!user.enPapers[paperId]) {
    user.enPapers[paperId] = { openedAt: 0, reveals: [], lastRevealAt: 0 };
  }
  return user.enPapers[paperId];
}

function openPaper(userId, paperId) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  if (!state.openedAt) state.openedAt = Date.now();
  const wait = Math.max(0, WORK_LOCK_MS - (Date.now() - state.openedAt));
  return {
    paperId,
    openedAt: state.openedAt,
    unlocked: wait === 0,
    waitMs: wait,
    revealed: state.reveals.map(row => row.key)
  };
}

function canReveal(userId, paperId, key) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  const now = Date.now();
  if (!state.openedAt) {
    return { ok: false, reason: 'Deschide mai întâi testul și lucrează pe foaie.' };
  }
  const lockWait = WORK_LOCK_MS - (now - state.openedAt);
  if (lockWait > 0) {
    return {
      ok: false,
      reason: `Baremul acestui item se deschide după ${Math.ceil(lockWait / 60000)} minute de lucru pe foaie. Nu există un buton „arată toate răspunsurile”.`,
      waitMs: lockWait
    };
  }
  if (state.reveals.some(row => row.key === key)) {
    return { ok: true, already: true };
  }
  const recent = state.reveals.filter(row => now - row.at < FAST_WINDOW_MS);
  if (recent.length >= FAST_LIMIT && now - state.lastRevealAt < FAST_COOLDOWN_MS) {
    const wait = FAST_COOLDOWN_MS - (now - state.lastRevealAt);
    return {
      ok: false,
      reason: 'Ai desfăcut prea multe itemi prea repede. Baremul e pentru verificare, nu pentru copiat. Mai așteaptă un pic.',
      waitMs: wait
    };
  }
  if (state.lastRevealAt && now - state.lastRevealAt < REVEAL_GAP_MS) {
    const wait = REVEAL_GAP_MS - (now - state.lastRevealAt);
    return {
      ok: false,
      reason: `Un item pe rând. Mai așteaptă ${Math.ceil(wait / 1000)} secunde înainte să desfaci alt barem.`,
      waitMs: wait
    };
  }
  return { ok: true };
}

function markReveal(userId, paperId, key) {
  const user = ensureUser(userId);
  const state = paperState(user, paperId);
  const now = Date.now();
  if (!state.reveals.some(row => row.key === key)) {
    state.reveals.push({ key, at: now });
  }
  state.lastRevealAt = now;
  return state;
}

module.exports = { openPaper, canReveal, markReveal, paperState };
