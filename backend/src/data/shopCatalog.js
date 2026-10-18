const cosmetics = require("../../../shared/cosmetics.json");
const { dayKey } = require("../ops/bucharestDay");

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

// Edițiile cu availableUntil se închid la sfârșitul acelei zile, ora București.
function isSaleOpen(item, now = new Date()) {
  const until = String(item?.availableUntil || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(until)) return true;
  return dayKey(now) <= until;
}

function catalogAt(now = new Date()) {
  return SHOP_CATALOG.map(item => {
    if (!item.availableUntil) return item;
    return { ...item, saleOpen: isSaleOpen(item, now) };
  });
}

module.exports = { SHOP_CATALOG, shopItemById, MYTHIC_MIN_LEVEL, isSaleOpen, catalogAt };
