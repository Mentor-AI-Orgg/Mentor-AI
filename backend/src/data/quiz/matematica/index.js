const naturale = require('./m5-naturale');
const fractii = require('./m5-fractii');
const geometrie = require('./m5-geometrie');
const multimi = require('./m6-multimi');
const proportii = require('./m6-proportii');
const intregi = require('./m6-intregi-rationale');
const triunghi = require('./m6-triunghi');
const reale = require('./m7-reale');
const ecuati = require('./m7-ecuati');
const date = require('./m7-date');
const geo7 = require('./m7-geo7');
const intervale = require('./m8-intervale');
const algebric = require('./m8-algebric');
const functii = require('./m8-functii');
const spatiu = require('./m8-spatiu');
const hard = require('../hard');

const CHAPTERS = [
  naturale, fractii, geometrie, multimi, proportii, intregi, triunghi,
  reale, ecuati, date, geo7, intervale, algebric, functii, spatiu
];

const BY_KEY = Object.fromEntries(CHAPTERS.map(chapter => [chapter.key, {
  flashcards: [...(chapter.flashcards || []), ...hard.flashcardsFor(chapter.key)],
  tests: [...(chapter.tests || []), ...hard.testsFor(chapter.key)]
}]));

function chapterPack(key) {
  return BY_KEY[key] || { flashcards: [], tests: [] };
}

function flashcardsFor(key) {
  return chapterPack(key).flashcards;
}

function testsFor(key) {
  return chapterPack(key).tests;
}

module.exports = { BY_KEY, CHAPTERS, chapterPack, flashcardsFor, testsFor };
