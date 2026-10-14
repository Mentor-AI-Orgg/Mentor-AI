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
    completionStreak: typeof summary.completionStreak === 'number' ? summary.completionStreak : prev.completionStreak,
    streakFreezes: typeof summary.streakFreezes === 'number' ? summary.streakFreezes : prev.streakFreezes,
    streakFrozeYesterday: Boolean(summary.streakFrozeYesterday),
    readiness: summary.readiness || prev.readiness || null,
    praiseNotice: Object.prototype.hasOwnProperty.call(summary, 'praiseNotice') ? (summary.praiseNotice || null) : (prev.praiseNotice || null),
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
    savedSessions: summary.savedSessions || prev.savedSessions,
    streakDays: summary.streakDays || prev.streakDays,
    missions: summary.missions || prev.missions,
    chapterMaps: summary.chapterMaps || prev.chapterMaps,
    mentorLeft: summary.mentorLeft ?? prev.mentorLeft,
    collection: summary.collection || prev.collection,
    nudge: summary.nudge || prev.nudge || null,
    unlockedTitleIds: Array.isArray(summary.titles?.unlocked) ? summary.titles.unlocked : prev.unlockedTitleIds
  };
}

export { AVATAR_ICONS, THEME_ACCENTS, avatarIcon, itemEmoji, applyTheme, applyProgress };
export { xpProgress } from './xpProgress.js';
