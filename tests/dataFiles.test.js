import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const DATA_ROOT = path.join(process.cwd(), 'backend/src/data');
const CEDILLA = /[şţŞŢ]/;

function walkJs(dir) {
  const found = [];
  readdirSync(dir).forEach(name => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) found.push(...walkJs(full));
    else if (name.endsWith('.js')) found.push(full);
  });
  return found;
}

function isLessonFile(file) {
  const rel = path.relative(DATA_ROOT, file);
  return /^(mate|romana)/.test(rel)
    || rel.startsWith(`romana-lectii${path.sep}`)
    || rel.startsWith(`lessons${path.sep}`)
    || rel === 'en8Lessons.js'
    || rel === 'enRomanaGenerate.js'
    || rel === 'gimnaziuLessons.js';
}

describe('fișierele de date', () => {
  const files = walkJs(DATA_ROOT);

  it('ține fiecare fișier .js sub 100 000 de caractere', () => {
    const tooBig = [];
    files.forEach(file => {
      const text = readFileSync(file, 'utf8');
      const rel = path.relative(DATA_ROOT, file);
      if (text.length > 90000) console.warn(`${rel} are ${text.length} caractere, peste 90 000`);
      if (text.length >= 100000) tooBig.push(`${rel} ${text.length}`);
    });
    expect(tooBig).toEqual([]);
  });

  it('nu lasă sedile în fișierele de lecții', () => {
    const hits = [];
    files.filter(isLessonFile).forEach(file => {
      const text = readFileSync(file, 'utf8');
      if (CEDILLA.test(text)) hits.push(path.relative(DATA_ROOT, file));
    });
    expect(hits).toEqual([]);
  });
});
