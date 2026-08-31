import { describe, it, expect } from 'vitest';
import { pickPractice } from '../backend/src/data/practicePicker.js';
import { checkExercise, listChapterExercises } from '../backend/src/data/exerciseBank.js';
import { fromGeneratedId, generateOne, generateMany } from '../backend/src/data/itemGenerator.js';
import { GRADES, GUIDES, SUBJECT_IDS } from '../backend/src/data/gimnaziuGuide.js';

describe('infinite generated practice', () => {
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
    const item = generateOne({ kind: 'flashcards', subject: 'romana', grade: 5, chapterId: 'limba5' });
    expect(item.options).toHaveLength(4);
    const again = fromGeneratedId(item.id);
    expect(again.question).toBe(item.question);
    expect(again.options).toEqual(item.options);
    expect(again.correct).toBe(0);
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
    expect(pack.cards.map(card => card.level)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(pack.cards[0].answers).toBeUndefined();
    const graded = checkExercise(pack.cards[0].id, 'nu-asta');
    expect(graded.found).toBe(true);
  });

  it('keeps distinct ids across a long generated run', () => {
    const many = generateMany({ kind: 'test', subject: 'matematica', grade: 6, chapterId: 'triunghi' }, 40);
    expect(many).toHaveLength(40);
    expect(new Set(many.map(item => item.id)).size).toBe(40);
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
});
