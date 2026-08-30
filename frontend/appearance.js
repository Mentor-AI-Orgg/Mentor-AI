const AVATAR_ICONS = {
  'avatar-neon-fox': 'fa-dog',
  'avatar-starlight-owl': 'fa-crow',
  'avatar-pixel-tiger': 'fa-cat',
  'avatar-cosmic-bear': 'fa-paw',
  'avatar-hero-robot': 'fa-robot',
  'avatar-galaxy-kid': 'fa-user-astronaut',
  'avatar-mentor-legend': 'fa-crown'
};

const THEME_ACCENTS = {
  'theme-pink-pulse': '#ff8fa3',
  'theme-orange-ember': '#ffb347',
  'theme-red-rush': '#ff6b6b',
  'theme-mint-aurora': '#63f2c7',
  'theme-golden-sun': '#ffd166',
  'theme-night-aurora': '#6fd7ff',
  'theme-violet-comet': '#b9a7ff'
};

function avatarIcon(avatarId) {
  return AVATAR_ICONS[avatarId] || null;
}

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
    xpToNext: summary.xpToNext,
    xpIntoLevel: summary.xpIntoLevel,
    score: typeof summary.score === 'number' ? summary.score : prev.score,
    chaptersDone: summary.chaptersDone,
    chaptersTotal: summary.chaptersTotal,
    avatarId: summary.equipped?.avatar || prev.avatarId,
    themeId: summary.equipped?.background || prev.themeId,
    titleId: summary.titleId || summary.equipped?.title || prev.titleId,
    titleName: summary.titleName || prev.titleName,
    chapters: summary.chapters || prev.chapters,
    savedSessions: summary.savedSessions || prev.savedSessions
  };
}

export { AVATAR_ICONS, THEME_ACCENTS, avatarIcon, applyTheme, applyProgress };
