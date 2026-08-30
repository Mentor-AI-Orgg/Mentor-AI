const cosmetics = require("../../../shared/cosmetics.json");

const SHOP_CATALOG = [
  ...cosmetics.avatars.map(item => ({ ...item, category: "avatar" })),
  ...cosmetics.backgrounds.map(item => ({ ...item, category: "background" }))
];

function shopItemById(id) {
  return SHOP_CATALOG.find(item => item.id === id) || null;
}

module.exports = { SHOP_CATALOG, shopItemById };
