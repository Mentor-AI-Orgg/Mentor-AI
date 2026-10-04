import { describe, it, expect } from 'vitest';
import { pickPractice } from '../backend/src/data/practicePicker.js';
import { checkExercise, findExercise, listChapterExercises } from '../backend/src/data/exerciseBank.js';
import { findQuestion } from '../backend/src/data/practiceBank.js';
import { fromGeneratedId, generateOne, generateMany, itemLooksSound, parseGenId } from '../backend/src/data/itemGenerator.js';
import { GRADES, GUIDES, SUBJECT_IDS } from '../backend/src/data/gimnaziuGuide.js';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

describe('infinite generated practice', () => {
  it('rebuilds the same item from its id and keeps whole-number answers', () => {
    for (let i = 0; i < 24; i += 1) {
      const item = generateOne({ kind: 'test', subject: 'matematica', grade: 5, chapterId: 'fractii', level: (i % 7) + 1 });
      expect(item, `fractii #${i}`).toBeTruthy();
      const again = fromGeneratedId(item.id);
      expect(again.prompt).toBe(item.prompt);
      expect(again.answers).toEqual(item.answers);
      if (item.numeric) {
        expect(Number.isInteger(item.numeric.value) || Math.abs(item.numeric.value - Math.round(item.numeric.value)) < 1e-9).toBe(true);
      }
      expect(checkExercise(item.id, item.answers[0]).ok).toBe(true);
    }
  });

  it('rejects generated items that cannot be graded fairly', () => {
    expect(itemLooksSound({ prompt: 'Cât e 2+2?', answers: ['4'], numeric: { value: 4 } }, 'test')).toBe(true);
    expect(itemLooksSound({ prompt: 'Cât e 2+2?', answers: [] }, 'test')).toBe(false);
    expect(itemLooksSound({ prompt: '', answers: ['4'] }, 'test')).toBe(false);
    expect(itemLooksSound({ prompt: 'Cât e 2+2?', answers: ['4'], numeric: { value: Number.NaN } }, 'test')).toBe(false);
    expect(itemLooksSound({ prompt: 'Volum', answers: ['84.857142857'], numeric: { value: 84.857142857 } }, 'test')).toBe(false);
    expect(itemLooksSound({ prompt: 'Reducere', answers: ['37.5'], numeric: { value: 37.5 } }, 'test')).toBe(false);
    expect(itemLooksSound({ prompt: 'Cât e 1/2 din 15?', answers: ['7.5'], numeric: { value: 7.5 } }, 'test')).toBe(false);
    expect(itemLooksSound({ options: ['2', '3', '4', '5'], correct: 2 }, 'flashcards')).toBe(true);
    expect(itemLooksSound({ options: ['2', '3', '4', '4'], correct: 0 }, 'flashcards')).toBe(false);
    expect(itemLooksSound({ options: ['2', '3', '4'], correct: 0 }, 'flashcards')).toBe(false);
    expect(itemLooksSound({ options: ['2', '3', '4', '5'], correct: 4 }, 'flashcards')).toBe(false);
  });

  it('rebuilds a generated test from its id and grades the known answer', () => {
    const item = generateOne({ kind: 'test', subject: 'matematica', grade: 5, chapterId: 'naturale' });
    expect(item).toBeTruthy();
    expect(item.id).toMatch(/^g:t:matematica:5:naturale:[0-9a-f]+$/i);
    const again = fromGeneratedId(item.id);
    expect(again.prompt).toBe(item.prompt);
    expect(again.answers).toEqual(item.answers);
    const result = checkExercise(item.id, item.answers[0]);
    expect(result.found).toBe(true);
    expect(result.ok).toBe(true);
    expect(result.steps.length).toBeGreaterThan(0);
  });

  it('rebuilds a generated flashcard and keeps four options', () => {
    const item = generateOne({ kind: 'flashcards', subject: 'romana', grade: 5, chapterId: 'cuvinte' });
    expect(item.options).toHaveLength(4);
    const again = fromGeneratedId(item.id);
    expect(again.question).toBe(item.question);
    expect(again.options).toEqual(item.options);
    expect(again.correct).toBe(0);
    expect(new Set(item.options.map(String)).size).toBe(4);
  });

  it('fills a second test pack with generated cards after all static ids are excluded', () => {
    const staticIds = listChapterExercises('matematica', 5, 'naturale').map(item => item.id);
    const pack = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'test',
      excludeIds: staticIds,
      count: 7
    });
    expect(pack.cards).toHaveLength(7);
    expect(pack.infinite).toBe(true);
    expect(pack.cards.every(card => String(card.id).startsWith('g:'))).toBe(true);
    expect(pack.cards.every(card => card.level >= 6)).toBe(true);
    expect(pack.cards.map(card => card.level)).toEqual([6, 6, 7, 7, 7, 8, 8]);
    expect(pack.cards[0].answers).toBeUndefined();
    const graded = checkExercise(pack.cards[0].id, 'nu-asta');
    expect(graded.found).toBe(true);
  });

  it('keeps distinct ids across a long generated run', () => {
    const many = generateMany({ kind: 'test', subject: 'matematica', grade: 6, chapterId: 'triunghi' }, 40);
    expect(many).toHaveLength(40);
    expect(new Set(many.map(item => item.id)).size).toBe(40);
  });

  it('makes generated rungs actually harder: level 1 is not level 7', () => {
    const easy = generateOne({ kind: 'test', subject: 'matematica', grade: 5, chapterId: 'naturale', level: 1 });
    const hard = generateOne({ kind: 'test', subject: 'matematica', grade: 5, chapterId: 'naturale', level: 7 });
    expect(easy.id).toMatch(/^g:t:matematica:5:naturale:1:[0-9a-f]+$/i);
    expect(hard.id).toMatch(/^g:t:matematica:5:naturale:7:[0-9a-f]+$/i);
    expect(easy.prompt).not.toBe(hard.prompt);
    expect(easy.point).toBe('adunare');
    expect(['paranteze', 'cmmmc']).toContain(hard.point);
    const easyFlash = generateOne({ kind: 'flashcards', subject: 'matematica', grade: 5, chapterId: 'naturale', level: 1 });
    const hardFlash = generateOne({ kind: 'flashcards', subject: 'matematica', grade: 5, chapterId: 'naturale', level: 8 });
    expect(easyFlash.question).not.toBe(hardFlash.question);
  });

  it('orders flashcards from easy to hard like tests', () => {
    const pack = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'flashcards',
      count: 8
    });
    expect(pack.cards).toHaveLength(8);
    expect(pack.cards.map(card => card.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(pack.cards[0].options).toHaveLength(4);
    expect(Number.isInteger(pack.cards[0].correct)).toBe(true);
  });

  it('can generate original items for every 5–8 chapter', () => {
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        (GUIDES[subject][grade].units || []).forEach(unit => {
          const flash = generateOne({ kind: 'flashcards', subject, grade, chapterId: unit.id });
          const exam = generateOne({ kind: 'test', subject, grade, chapterId: unit.id });
          expect(flash, `${subject}:${grade}:${unit.id} flash`).toBeTruthy();
          expect(exam, `${subject}:${grade}:${unit.id} test`).toBeTruthy();
          expect(flash.options).toHaveLength(4);
          expect(exam.prompt.length).toBeGreaterThan(12);
          expect(exam.answers.length).toBeGreaterThan(0);
        });
      });
    });
  });

  it('grades the known answer on every chapter test and flashcard pack', () => {
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        (GUIDES[subject][grade].units || []).forEach(unit => {
          const tests = pickPractice({ subject, grade, chapterId: unit.id, kind: 'test', count: 7 });
          expect(tests.cards).toHaveLength(7);
          expect(tests.cards.every(card => card.level >= 6)).toBe(true);
          expect(Math.max(...tests.cards.map(card => card.level))).toBeGreaterThanOrEqual(7);
          tests.cards.forEach((card, index) => {
            const exercise = findExercise(card.id);
            expect(exercise, `${subject}:${grade}:${unit.id} test ${index + 1}`).toBeTruthy();
            const key = exercise.answers[0];
            const result = checkExercise(card.id, key);
            expect(result.ok, `${subject}:${grade}:${unit.id} #${index + 1} «${card.prompt}» vs «${key}»`).toBe(true);
          });

          const flashes = pickPractice({ subject, grade, chapterId: unit.id, kind: 'flashcards', count: 8 });
          expect(flashes.cards).toHaveLength(8);
          expect(flashes.cards[0].level).toBe(1);
          expect(flashes.cards[flashes.cards.length - 1].level).toBeGreaterThanOrEqual(7);
          flashes.cards.forEach((card, index) => {
            const item = findQuestion(card.id);
            expect(item, `${subject}:${grade}:${unit.id} flash ${index + 1}`).toBeTruthy();
            expect(item.options).toHaveLength(4);
            expect(item.options[item.correct]).toBeTruthy();
          });
        });
      });
    });
  });

  it('aduce nivelul 9 și 10 la 8 în id, iar /check îl corectează', async () => {
    const item = generateOne({ kind: 'test', subject: 'matematica', grade: 5, chapterId: 'naturale', level: 10 });
    expect(item).toBeTruthy();
    expect(item.level).toBe(8);
    expect(item.id).toMatch(/^g:t:matematica:5:naturale:8:[0-9a-f]+$/i);
    expect(parseGenId(item.id).level).toBe(8);
    expect(parseGenId(item.id).chapterId).toBe('naturale');
    const again = fromGeneratedId(item.id);
    expect(again.prompt).toBe(item.prompt);
    expect(again.answers).toEqual(item.answers);

    const nine = generateMany({ kind: 'test', subject: 'matematica', grade: 5, chapterId: 'naturale', levels: [9] }, 1);
    expect(nine[0].level).toBe(8);
    expect(nine[0].id).toMatch(/:naturale:8:/);
    expect(parseGenId(nine[0].id).level).toBe(8);

    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const res = await created.agent.post('/api/flashcards/check').send({
      card_id: item.id,
      answer: item.answers[0]
    });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
