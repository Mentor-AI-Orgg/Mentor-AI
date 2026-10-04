import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { BANK, listChapterQuestions, allChapterKeys, findQuestion } from '../backend/src/data/practiceBank.js';
import { listChapterExercises, allExerciseKeys, findExercise, checkExercise } from '../backend/src/data/exerciseBank.js';
import { EXTRAS } from '../backend/src/data/exerciseExtras.js';
import { lessonsFor } from '../backend/src/data/gimnaziuLessons.js';
import { getGuide } from '../backend/src/data/gimnaziuGuide.js';

function lessonIdsFor(subject, grade, chapterId) {
  const math = lessonsFor(subject, Number(grade), chapterId) || [];
  if (math.length) return new Set(math.map(lesson => lesson.id));
  const unit = (getGuide(subject, Number(grade)).units || []).find(row => row.id === chapterId);
  return new Set((unit?.lessons || []).map(lesson => lesson.id));
}
import { LESSON_ID_MAP } from '../backend/src/data/lessonIdMap.js';
import { BY_KEY } from '../backend/src/data/quiz/matematica/index.js';
import { BY_KEY as ROMANA_QUIZ } from '../backend/src/data/quiz/romana/index.js';
import { BY_KEY as CARD_KEYS, allCardKeys } from '../backend/src/data/cardBank.js';
import { allProblems } from '../backend/src/data/problemBank.js';
import { pickPractice } from '../backend/src/data/practicePicker.js';
import { generateOne, fromGeneratedId } from '../backend/src/data/itemGenerator.js';

const PENDING_CHAPTERS = [
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
  'matematica:8:intervale',
  'matematica:8:algebric',
  'matematica:8:functii',
  'matematica:8:spatiu'
];

const QUIZ_DIR = path.join(process.cwd(), 'backend/src/data/quiz/matematica');
const SEDILA = /[şţŞŢ]/;
const BAD_MARKUP = /\\frac|\$|<\/?[a-z]+/i;
const BAD_UNIT = /(?:^|[^A-Za-zĂÂÎȘȚăâîșț])[A-Za-zĂÂÎȘȚăâîșț]\/[sl](?![A-Za-z])/u;

function textsOf(item) {
  return [
    item.question, item.prompt, item.explain, item.hint,
    ...(item.options || []),
    ...(item.answers || []),
    ...(item.choices || []),
    ...(item.steps || [])
  ].filter(Boolean).join('\n');
}

function looksLikeOne(item) {
  if (item.numeric && Number(item.numeric.value) === 1) return true;
  return (item.answers || []).some(answer => {
    const text = String(answer).trim().replace(',', '.');
    return text === '1' || text === '1.0';
  });
}

function mathItems() {
  const rows = [];
  allChapterKeys().filter(key => key.startsWith('matematica:')).forEach(key => {
    const [subject, grade, chapterId] = key.split(':');
    listChapterQuestions(subject, grade, chapterId).forEach(item => rows.push({ key, kind: 'grila', item }));
    listChapterExercises(subject, grade, chapterId).forEach(item => rows.push({ key, kind: 'test', item }));
  });
  return rows;
}

describe('acoperirea testelor de matematică', () => {
  it('arată capitolele încă în așteptare', () => {
    expect(PENDING_CHAPTERS).toHaveLength(15);
    console.log(`PENDING_CHAPTERS: ${PENDING_CHAPTERS.join(', ')}`);
  });

  it.todo('PENDING_CHAPTERS e goală după etapa finală');

  it('leagă fiecare item vechi de o lecție reală, cu nivel 1–8', () => {
    const ids = [];
    mathItems().forEach(({ key, kind, item }) => {
      const [subject, grade, chapterId] = key.split(':');
      const lessons = lessonIdsFor(subject, grade, chapterId);
      ids.push(item.id);
      expect(item.lesson, item.id).toBeTruthy();
      expect(lessons.has(item.lesson), `${item.id} → ${item.lesson}`).toBe(true);
      expect(LESSON_ID_MAP[`${key}:${item.lesson}`], item.id).toBeUndefined();
      expect(Number.isInteger(item.level), item.id).toBe(true);
      expect(item.level).toBeGreaterThanOrEqual(1);
      expect(item.level).toBeLessThanOrEqual(8);
      expect(String(item.id).startsWith('g:')).toBe(false);
      expect(String(item.id).includes(':')).toBe(false);
      const text = textsOf(item);
      expect(text).not.toMatch(SEDILA);
      expect(text).not.toMatch(BAD_MARKUP);
      expect(text).not.toMatch(BAD_UNIT);
      if (kind === 'grila') {
        expect(item.options).toHaveLength(4);
        expect(new Set(item.options.map(option => option.trim())).size).toBe(4);
        expect(item.correct).toBeGreaterThanOrEqual(0);
        expect(item.correct).toBeLessThan(4);
        expect(item.question.length).toBeGreaterThan(12);
        expect(item.explain.length).toBeGreaterThan(20);
        const exercise = findExercise(item.id);
        expect(checkExercise(item.id, item.options[item.correct]).ok, item.id).toBe(true);
        const wrong = item.options.find((_, index) => index !== item.correct);
        expect(checkExercise(item.id, wrong).ok, item.id).toBe(false);
        expect(exercise.lesson).toBe(item.lesson);
      } else {
        expect(item.answers.length).toBeGreaterThan(0);
        expect(item.steps.length).toBeGreaterThan(0);
        expect(item.explain.length).toBeGreaterThan(20);
        expect(checkExercise(item.id, item.answers[0]).ok, `${item.id} ${item.answers[0]}`).toBe(true);
        if (item.numeric) {
          expect(Number.isFinite(item.numeric.value)).toBe(true);
          expect(item.numeric.tolerance).toBeGreaterThanOrEqual(0);
          expect(checkExercise(item.id, String(item.numeric.value)).ok, item.id).toBe(true);
          expect(checkExercise(item.id, String(item.numeric.value + 7)).ok, item.id).toBe(false);
        }
        expect(checkExercise(item.id, 'a').ok, item.id).toBe(false);
        if (!looksLikeOne(item)) expect(checkExercise(item.id, '1').ok, item.id).toBe(false);
        if (item.choices) {
          expect(item.choices).toHaveLength(4);
          expect(new Set(item.choices.map(choice => choice.trim())).size).toBe(4);
          expect(item.choices).toContain(item.answers[0]);
        }
      }
    });
    expect(new Set(ids).size).toBe(ids.length);
    PENDING_CHAPTERS.forEach(key => {
      expect(BY_KEY[key]).toBeTruthy();
    });
  });

  it('ține fișierele de quiz sub 60 KB', () => {
    fs.readdirSync(QUIZ_DIR).filter(name => name.endsWith('.js')).forEach(name => {
      const bytes = fs.statSync(path.join(QUIZ_DIR, name)).size;
      expect(bytes, name).toBeLessThan(60 * 1024);
    });
  });

  it('nu dublează id-urile între grile, teste și fișierele noi', () => {
    const ids = [
      ...Object.values(BANK).flat().map(item => item.id),
      ...Object.values(EXTRAS).flat().map(item => item.id),
      ...Object.values(BY_KEY).flatMap(pack => [...pack.flashcards, ...pack.tests].map(item => item.id)),
      ...Object.values(ROMANA_QUIZ).flatMap(pack => [...pack.flashcards, ...pack.tests].map(item => item.id)),
      ...Object.values(CARD_KEYS).flatMap(pack => (pack.cards || []).map(card => card.id)),
      ...allProblems().map(problem => problem.id)
    ];
    expect(new Set(ids).size).toBe(ids.length);
    expect(allExerciseKeys()).toHaveLength(16);
    expect(allCardKeys('matematica')).toHaveLength(15);
    expect(allCardKeys('romana')).toHaveLength(30);
    expect(findQuestion('m5n1').lesson).toBe('comparare');
  });

  it('împrăștie testul de capitol pe niveluri și ține testul pe lecție în lecție', () => {
    const chapter = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'test',
      count: 7
    });
    expect(chapter.cards.every(card => card.level >= 4)).toBe(true);
    expect(chapter.cards[0].level).toBeLessThan(chapter.cards[chapter.cards.length - 1].level);
    expect(Math.max(...chapter.cards.map(card => card.level))).toBeGreaterThanOrEqual(7);
    expect(chapter.coverage.lessons.total).toBeGreaterThan(0);
    const lesson = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'test',
      lessonId: 'putere',
      count: 5
    });
    expect(lesson.cards.length).toBeGreaterThan(0);
    expect(lesson.cards.every(card => card.lesson === 'putere')).toBe(true);
    expect(lesson.cards.length).toBeLessThanOrEqual(5);
    const grids = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'flashcards',
      lessonId: 'comparare'
    });
    expect(grids.cards.every(card => card.lesson === 'comparare')).toBe(true);
    expect(grids.cards.length).toBeGreaterThan(0);
  });

  it('aduce nivelurile generate peste 8 la 8, ca /check să găsească itemul', () => {
    const item = generateOne({
      kind: 'test',
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      level: 9
    });
    expect(item).toBeTruthy();
    expect(item.id).toMatch(/^g:t:matematica:5:naturale:8:[0-9a-f]+$/);
    expect(item.id.includes(':9:')).toBe(false);
    expect(fromGeneratedId(item.id)?.prompt || fromGeneratedId(item.id)?.question).toBeTruthy();
  });

  it('verifică cardurile față-verso care există deja', () => {
    const types = new Set(['termen', 'formula', 'regula', 'intrebare', 'capcana']);
    const byLesson = new Map();
    Object.entries(CARD_KEYS).forEach(([key, pack]) => {
      const [subject, grade, chapterId] = key.split(':');
      const lessons = lessonIdsFor(subject, grade, chapterId);
      (pack.cards || []).forEach(card => {
        expect(lessons.has(card.lesson), card.id).toBe(true);
        expect(LESSON_ID_MAP[`${key}:${card.lesson}`], card.id).toBeUndefined();
        expect(types.has(card.type), card.id).toBe(true);
        expect(card.front.length).toBeGreaterThan(0);
        expect(card.front.length).toBeLessThanOrEqual(110);
        expect(card.back.length).toBeGreaterThan(0);
        expect(card.back.length).toBeLessThanOrEqual(140);
        expect(card.why.length).toBeGreaterThan(0);
        expect(card.why.length).toBeLessThanOrEqual(140);
        expect(card.why.includes('\n'), card.id).toBe(false);
        expect(`${card.front}\n${card.back}\n${card.why}`).not.toMatch(SEDILA);
        expect(`${card.front} ${card.back} ${card.why}`).not.toMatch(BAD_MARKUP);
        expect(String(card.id).includes(':')).toBe(false);
        expect(String(card.id).startsWith('g:')).toBe(false);
        const bucket = byLesson.get(`${key}:${card.lesson}`) || new Set();
        bucket.add(card.type);
        byLesson.set(`${key}:${card.lesson}`, bucket);
      });
    });
    PENDING_CHAPTERS.forEach(key => {
      if (PENDING_CHAPTERS.includes(key)) return;
      const lessons = lessonsFor(...key.split(':').map((part, index) => (index === 1 ? Number(part) : part)));
      (lessons || []).forEach(lesson => {
        const rows = (CARD_KEYS[key].cards || []).filter(card => card.lesson === lesson.id);
        expect(rows.length, lesson.id).toBeGreaterThanOrEqual(5);
        expect(new Set(rows.map(card => card.type)).size, lesson.id).toBeGreaterThanOrEqual(2);
      });
    });
    expect(byLesson.get('matematica:5:naturale:comparare').size).toBeGreaterThanOrEqual(2);
    expect(byLesson.get('matematica:5:naturale:adunare').has('formula')).toBe(true);
    expect(byLesson.get('matematica:5:naturale:adunare').has('capcana')).toBe(true);
  });
});
