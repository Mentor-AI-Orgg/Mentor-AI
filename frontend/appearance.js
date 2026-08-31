import { AVATAR_ICONS, THEME_ACCENTS, avatarIcon, itemEmoji } from './shopLook.js';

function applyTheme(themeId) {
  if (typeof document === 'undefined') return;
  const accent = THEME_ACCENTS[themeId];
  document.documentElement.style.setProperty('--user-accent', accent || '');
  document.documentElement.classList.toggle('has-user-theme', Boolean(accent));
}

function applyProgress(summary = {}, prev = {}) {
  if (!summary) return prev;
  return {
    ...prev,
    coins: typeof summary.balance === 'number' ? summary.balance : prev.coins,
    streak: typeof summary.streak === 'number' ? summary.streak : prev.streak,
    xp: typeof summary.xp === 'number' ? summary.xp : prev.xp,
    level: summary.level || prev.level || 1,
    xpToNext: summary.xpToNext ?? prev.xpToNext,
    xpIntoLevel: summary.xpIntoLevel ?? prev.xpIntoLevel,
    nextLevelAt: summary.nextLevelAt ?? prev.nextLevelAt,
    levelSpan: summary.levelSpan ?? prev.levelSpan,
    score: typeof summary.score === 'number' ? summary.score : prev.score,
    chaptersDone: summary.chaptersDone,
    chaptersTotal: summary.chaptersTotal,
    avatarId: summary.equipped?.avatar || prev.avatarId,
    themeId: summary.equipped?.background || prev.themeId,
    titleId: summary.titleId || summary.equipped?.title || prev.titleId,
    titleName: summary.titleName || prev.titleName,
    chapters: summary.chapters || prev.chapters,
    lastStudy: summary.lastStudy || prev.lastStudy,
    savedSessions: summary.savedSessions || prev.savedSessions
  };
}

export { AVATAR_ICONS, THEME_ACCENTS, avatarIcon, itemEmoji, applyTheme, applyProgress };
export { xpProgress } from './xpProgress.js';
