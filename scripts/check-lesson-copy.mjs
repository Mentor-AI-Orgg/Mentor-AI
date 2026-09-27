#!/usr/bin/env node
// Compară lecțiile cu fișiere .txt extrase din manuale (doar pe laptop).
// Manualele nu sunt în repo, deci scriptul nu rulează în CI și nu ajunge pe server
// (scripts/ este exclus din deploy).
//
//   node scripts/check-lesson-copy.mjs --surse "C:\Users\Kiril\Desktop\manual-romana-8-litera\mai-putine"
//
// Scrie reports/lesson-copy.md: lecția, fișierul-sursă și secvența de cel puțin
// 10 cuvinte identici, după normalizeRo().

import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { normalizeRo } = require('../backend/src/grading/answerJudge.js');
const { getGuide, SUBJECT_IDS, GRADES } = require('../backend/src/data/gimnaziuGuide.js');

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WINDOW = 10;
const TEXT_FIELDS = [
  'theory', 'example', 'tryThis', 'recap', 'boxes', 'extraExamples',
  'practice', 'answers', 'mistakes', 'keyPoints', 'more'
];

function tokens(text) {
  return normalizeRo(text)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word && word !== '-');
}

function walk(value, visit) {
  if (typeof value === 'string') {
    if (value.trim()) visit(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach(item => walk(item, visit));
    return;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach(child => walk(child, visit));
  }
}

function collectLessons() {
  const lessons = [];
  SUBJECT_IDS.forEach(subject => {
    GRADES.forEach(grade => {
      const guide = getGuide(subject, grade);
      (guide.units || []).forEach(unit => {
        (unit.lessons || []).forEach(lesson => {
          const parts = [];
          TEXT_FIELDS.forEach(field => {
            if (lesson[field] != null) walk(lesson[field], text => parts.push(text));
          });
          lessons.push({
            id: `${subject}:${grade}:${unit.id}:${lesson.id || unit.id}`,
            title: lesson.title || lesson.id || unit.id,
            tokens: tokens(parts.join('\n'))
          });
        });
      });
    });
  });
  return lessons;
}

function indexLessons(lessons) {
  const index = new Map();
  lessons.forEach(lesson => {
    const list = lesson.tokens;
    for (let i = 0; i + WINDOW <= list.length; i += 1) {
      const gram = list.slice(i, i + WINDOW).join(' ');
      if (!index.has(gram)) index.set(gram, []);
      const bucket = index.get(gram);
      if (bucket.length < 3 && !bucket.some(item => item.id === lesson.id)) bucket.push(lesson);
    }
  });
  return index;
}

function listTxt(dir) {
  const files = [];
  readdirSync(dir).forEach(name => {
    const full = join(dir, name);
    let info;
    try {
      info = statSync(full);
    } catch {
      return;
    }
    if (info.isDirectory()) files.push(...listTxt(full));
    else if (name.toLowerCase().endsWith('.txt')) files.push(full);
  });
  return files;
}

function sequencesIn(fileTokens, index) {
  const found = [];
  let i = 0;
  while (i + WINDOW <= fileTokens.length) {
    const gram = fileTokens.slice(i, i + WINDOW).join(' ');
    const hits = index.get(gram);
    if (!hits) {
      i += 1;
      continue;
    }
    const ids = new Set(hits.map(lesson => lesson.id));
    let end = i + WINDOW;
    while (end < fileTokens.length) {
      const next = fileTokens.slice(end - WINDOW + 1, end + 1).join(' ');
      const nextHits = index.get(next);
      if (!nextHits || !nextHits.some(lesson => ids.has(lesson.id))) break;
      end += 1;
    }
    found.push({
      lessons: hits,
      sequence: fileTokens.slice(i, end).join(' ')
    });
    i = end;
  }
  return found;
}

function usage() {
  console.error('Folosire: node scripts/check-lesson-copy.mjs --surse <folder>');
  process.exit(1);
}

const args = process.argv.slice(2);
const surseAt = args.indexOf('--surse');
const folder = surseAt >= 0 ? args[surseAt + 1] : '';
if (!folder) usage();
if (!existsSync(folder)) {
  console.error(`Folderul nu există: ${folder}`);
  process.exit(1);
}

const lessons = collectLessons();
const index = indexLessons(lessons);
const files = listTxt(folder);
const rows = [];
files.forEach(file => {
  const text = readFileSync(file, 'utf8');
  sequencesIn(tokens(text), index).forEach(hit => {
    hit.lessons.forEach(lesson => {
      rows.push({
        lesson: lesson.id,
        title: lesson.title,
        source: relative(folder, file),
        sequence: hit.sequence
      });
    });
  });
});

const lines = [
  '# Secvențe copiate din manuale',
  '',
  `Surse: ${folder}`,
  `Fișiere .txt: ${files.length}. Lecții: ${lessons.length}. Secvențe: ${rows.length}.`,
  'O secvență are cel puțin 10 cuvinte la rând, după normalizeRo().',
  'Rescrierea se face cu prompt-cursor-lectii.md, unitate cu unitate.',
  ''
];
if (!rows.length) {
  lines.push('Nicio secvență de 10 cuvinte.', '');
} else {
  lines.push('| Lecție | Fișier-sursă | Secvență |');
  lines.push('| --- | --- | --- |');
  rows.forEach(row => {
    const sequence = row.sequence.length > 220 ? `${row.sequence.slice(0, 217)}...` : row.sequence;
    lines.push(`| ${row.lesson} | ${row.source} | ${sequence.replace(/\|/g, '/')} |`);
  });
  lines.push('');
}

const reportPath = join(ROOT, 'reports', 'lesson-copy.md');
mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, `${lines.join('\n')}\n`);
console.log(`Secvențe: ${rows.length}. Raport: ${reportPath}`);
