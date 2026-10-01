#!/usr/bin/env node
// Lecții și cuvinte pe capitol. Fără argumente: toate capitolele.
// Cu argument: o cheie (`matematica:8:intervale`) sau un sufix (`intervale`).

const {
  listLessonChapters,
  visibleWordCount,
  hiddenWordCount,
  countWords
} = require('../backend/src/data/lessonWords');

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function median(values) {
  if (!values.length) return 0;
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[mid];
  return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

const filter = process.argv[2] || '';
const chapters = listLessonChapters().filter(chapter => {
  if (!filter) return true;
  return chapter.key === filter || chapter.key.endsWith(`:${filter}`);
});

if (!chapters.length) {
  console.error(`Niciun capitol pentru „${filter}”.`);
  process.exit(1);
}

console.log('| Cheie | Lecții | Vizibile | Ascunse | Platter | Min | Mediană | Max |');
console.log('|---|---:|---:|---:|---:|---:|---:|---:|');
chapters.forEach(chapter => {
  const visible = chapter.lessons.map(visibleWordCount);
  const hidden = chapter.lessons.map(hiddenWordCount);
  const platter = chapter.lessons.map(lesson => countWords(lesson.platter));
  console.log([
    chapter.key,
    chapter.lessons.length,
    sum(visible),
    sum(hidden),
    sum(platter),
    visible.length ? Math.min(...visible) : 0,
    median(visible),
    visible.length ? Math.max(...visible) : 0
  ].join(' | ').replace(/^/, '| ').replace(/$/, ' |'));
});
