import cosmetics from '@shared/cosmetics.json';

const ALL_ITEMS = [
  ...cosmetics.avatars.map(item => ({ ...item, category: 'avatar' })),
  ...cosmetics.backgrounds.map(item => ({ ...item, category: 'background' }))
];

const BY_ID = Object.fromEntries(ALL_ITEMS.map(item => [item.id, item]));

const AVATAR_ICONS = Object.fromEntries(cosmetics.avatars.map(item => [item.id, item.icon]));
const THEME_ACCENTS = Object.fromEntries(
  cosmetics.backgrounds.filter(item => item.accent).map(item => [item.id, item.accent])
);

function shopItem(id) {
  return BY_ID[id] || null;
}

function itemEmoji(id) {
  return shopItem(id)?.emoji || '';
}

function avatarIcon(avatarId) {
  return AVATAR_ICONS[avatarId] || null;
}

function themeWash(themeId) {
  const item = shopItem(themeId);
  if (!item || item.category !== 'background') return null;
  if (Array.isArray(item.wash) && item.wash.length >= 2) return item.wash.slice(0, 2);
  if (item.accent) return [item.accent, item.accent];
  return null;
}

function shopItemVisible(item, owned) {
  if (!item) return false;
  if (item.saleOpen === false && !owned) return false;
  return true;
}

export {
  ALL_ITEMS,
  AVATAR_ICONS,
  THEME_ACCENTS,
  shopItem,
  itemEmoji,
  avatarIcon,
  themeWash,
  shopItemVisible
};
