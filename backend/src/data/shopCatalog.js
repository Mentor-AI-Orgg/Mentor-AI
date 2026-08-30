const cosmetics = require("../../../shared/cosmetics.json");

const MYTHIC_MIN_LEVEL = 5;

function decorate(item, category) {
  const next = { ...item, category };
  if (String(item.rarity) === "Mythic") next.minLevel = MYTHIC_MIN_LEVEL;
  return next;
}

const SHOP_CATALOG = [
  ...cosmetics.avatars.map(item => decorate(item, "avatar")),
  ...cosmetics.backgrounds.map(item => decorate(item, "background"))
];

function shopItemById(id) {
  return SHOP_CATALOG.find(item => item.id === id) || null;
}

module.exports = { SHOP_CATALOG, shopItemById, MYTHIC_MIN_LEVEL };
