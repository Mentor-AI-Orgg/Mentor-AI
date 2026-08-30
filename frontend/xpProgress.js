function xpProgress(user = {}) {
  const level = Math.max(1, Number(user.level) || 1);
  const xp = Math.max(0, Number(user.xp) || 0);
  const into = Math.max(0, Number(user.xpIntoLevel) || 0);
  const toNextRaw = Number(user.xpToNext);
  const spanRaw = Number(user.levelSpan);
  const nextAt = Number(user.nextLevelAt);
  const span = spanRaw > 0
    ? spanRaw
    : Number.isFinite(toNextRaw)
      ? into + Math.max(0, toNextRaw)
      : nextAt > xp
        ? nextAt - (xp - into)
        : 60;
  const toNext = Number.isFinite(toNextRaw) ? Math.max(0, toNextRaw) : Math.max(0, span - into);
  const pct = Math.min(100, Math.round((into / Math.max(1, span)) * 100));
  return {
    level,
    nextLevel: level + 1,
    xp,
    into,
    toNext,
    span: Math.max(1, span),
    pct,
    nextAt: Number.isFinite(nextAt) ? nextAt : xp + toNext
  };
}

export { xpProgress };