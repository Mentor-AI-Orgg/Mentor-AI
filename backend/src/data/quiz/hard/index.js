const { lessonsFor } = require('../../gimnaziuLessons');
const { LESSON_ID_MAP } = require('../../lessonIdMap');
const mate = require('./mate');
const mate6 = require('./mate6');
const mate6b = require('./mate6b');
const mate7 = require('./mate7');
const mate7b = require('./mate7b');
const mate8 = require('./mate8');
const mate8b = require('./mate8b');
const { extraGrids } = require('./mateFill');
const { extraTests } = require('./roFill');
const ro5 = require('./ro5');
const ro6 = require('./ro6');
const ro7 = require('./ro7');
const ro8 = require('./ro8');

const FILL_KEYS = [
  'matematica:5:naturale',
  'matematica:5:fractii',
  'matematica:5:geometrie',
  'matematica:6:multimi',
  'matematica:6:proportii',
  'matematica:6:intregi-rationale',
  'matematica:6:triunghi',
  'matematica:7:reale',
  'matematica:7:ecuati',
  'matematica:7:date',
  'matematica:7:geo7',
  'matematica:7:geo7',
  'matematica:8:intervale',
  'matematica:8:algebric'
];

function collectPacks() {
  const packs = new Map();
  const mods = [mate, mate6, mate6b, mate7, mate7b, mate8, mate8b, ro5, ro6, ro7, ro8];
  mods.forEach(mod => {
    Object.values(mod).forEach(build => {
      const pack = build();
      if (packs.has(pack.key)) throw new Error(`pachet dublu: ${pack.key}`);
      packs.set(pack.key, {
        flashcards: pack.flashcards.slice(),
        tests: pack.tests.slice()
      });
    });
  });
  const extras = extraGrids();
  if (extras.length !== FILL_KEYS.length) throw new Error('lista de completări nu se potrivește');
  extras.forEach((card, index) => {
    const key = FILL_KEYS[index];
    const pack = packs.get(key);
    if (!pack) throw new Error(`nu există capitolul ${key}`);
    pack.flashcards.push(card);
  });
  const moreTests = extraTests();
  moreTests.forEach((tests, key) => {
    const pack = packs.get(key);
    if (!pack) throw new Error(`nu există capitolul ${key}`);
    pack.tests.push(...tests);
  });
  return packs;
}

function assertPack(key, pack, errors) {
  const [subject, grade, chapterId] = key.split(':');
  const lessons = new Set((lessonsFor(subject, Number(grade), chapterId) || []).map(lesson => lesson.id));
  const seen = new Set();
  [...pack.flashcards, ...pack.tests].forEach(item => {
    if (seen.has(item.id)) errors.push(`id dublu în ${key}: ${item.id}`);
    seen.add(item.id);
    if (!lessons.has(item.lesson)) errors.push(`${item.id}: lecție necunoscută ${item.lesson} în ${key}`);
    if (LESSON_ID_MAP[`${key}:${item.lesson}`]) errors.push(`${item.id}: lecție mutată`);
    if (!item.challenge) errors.push(`${item.id}: lipsește marca de dificultate`);
  });
}

const PACKS = collectPacks();
const PACK_ERRORS = [];
PACKS.forEach((pack, key) => assertPack(key, pack, PACK_ERRORS));
if (PACK_ERRORS.length) {
  throw new Error(PACK_ERRORS.join('\n'));
}

const IDS = new Set();
PACKS.forEach(pack => {
  [...pack.flashcards, ...pack.tests].forEach(item => {
    if (IDS.has(item.id)) throw new Error(`id dublu între capitole: ${item.id}`);
    IDS.add(item.id);
  });
});

function packFor(key) {
  return PACKS.get(String(key || '')) || { flashcards: [], tests: [] };
}

function flashcardsFor(key) {
  return packFor(key).flashcards;
}

function testsFor(key) {
  return packFor(key).tests;
}

module.exports = { PACKS, packFor, flashcardsFor, testsFor };
