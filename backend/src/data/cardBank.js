const mathCards = require('./cards/matematica');
const romanaCards = require('./cards/romana');

const BY_KEY = { ...mathCards.BY_KEY, ...romanaCards.BY_KEY };

function chapterKey(subject, grade, chapterId) {
  return `${String(subject || '').toLowerCase()}:${grade}:${chapterId}`;
}

function listCards(subject, grade, chapterId, lessonId) {
  const pack = BY_KEY[chapterKey(subject, grade, chapterId)];
  const cards = pack?.cards || [];
  if (!lessonId) return cards.slice();
  return cards.filter(card => card.lesson === String(lessonId));
}

function findCard(id) {
  const wanted = String(id || '');
  for (const [key, pack] of Object.entries(BY_KEY)) {
    const found = (pack.cards || []).find(card => card.id === wanted);
    if (found) return { ...found, key };
  }
  return null;
}

function allCardKeys(subject) {
  const keys = Object.keys(BY_KEY);
  if (!subject) return keys;
  const name = String(subject).toLowerCase();
  return keys.filter(key => key.startsWith(`${name}:`));
}

module.exports = { listCards, findCard, allCardKeys, BY_KEY };
