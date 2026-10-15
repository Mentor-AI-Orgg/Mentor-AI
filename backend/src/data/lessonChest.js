// Cufăr mic, o dată pe lecție terminată. Alegerea e fixă pentru elev și capitol,
// ca o reîmprospătare să nu schimbe premiul. Nu e din magazin și nu se cumpără.

const crypto = require('crypto');
const { MASCOT_NAME, possessiveName } = require('../config/mascot');

const COIN_AMOUNT = 4;
const DAILY_COIN_MAX = 12;

const STICKERS = [
  { id: 'zecita-stea', name: `Steaua ${possessiveName()}`, emoji: '⭐' },
  { id: 'zecita-cana', name: 'Cana de cacao', emoji: '☕' },
  { id: 'zecita-caiet', name: 'Caietul cu colț', emoji: '📒' },
  { id: 'zecita-fulg', name: 'Fulg de pauză', emoji: '❄️' }
];

const FACTS = [
  'Zero este un număr par.',
  'Un cerc nu are colțuri.',
  '10% din 50 este 5.',
  'Un triunghi are trei laturi, oricât de strâmb ar fi.',
  'O pauză scurtă ajută memoria mai mult decât încă o oră fără oprire.',
  'În limba română scriem „sunt”, chiar dacă uneori se aude altfel.',
  'Rădăcina pătrată din 9 este 3, pentru că 3 × 3 = 9.',
  `${MASCOT_NAME} își notează ideile într-un caiet, nu le ține doar în cap.`
];

function hashInt(text) {
  return crypto.createHash('sha256').update(String(text)).digest().readUInt32BE(0);
}

function stickerById(id) {
  return STICKERS.find(item => item.id === id) || null;
}

function decideChest({ userId, key, owned = [], coinRoom = 0 }) {
  const roll = hashInt(`${userId}:${key}:chest`) % 3;
  const sticker = STICKERS.find(item => !owned.includes(item.id)) || null;
  const fact = FACTS[hashInt(`${userId}:${key}:fact`) % FACTS.length];
  const coins = Math.min(COIN_AMOUNT, Math.max(0, Number(coinRoom) || 0));

  const asCoins = coins > 0 ? { kind: 'coins', coins, sticker: null, fact: '' } : null;
  const asSticker = sticker ? { kind: 'sticker', coins: 0, sticker, fact: '' } : null;
  const asFact = { kind: 'fact', coins: 0, sticker: null, fact };

  const order = roll === 0 ? [asCoins, asSticker, asFact] : roll === 1 ? [asSticker, asCoins, asFact] : [asFact, asCoins, asSticker];
  return order.find(Boolean);
}

function chestLabel(reward) {
  if (!reward) return '';
  if (reward.kind === 'coins') return `Ai găsit ${reward.coins} monede.`;
  if (reward.kind === 'sticker') return `${reward.sticker.emoji} ${reward.sticker.name}.`;
  return reward.fact;
}

module.exports = {
  COIN_AMOUNT,
  DAILY_COIN_MAX,
  STICKERS,
  stickerById,
  decideChest,
  chestLabel
};
