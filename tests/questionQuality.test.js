import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
import { checkExercise, listChapterExercises } from '../backend/src/data/exerciseBank.js';
import { listChapterQuestions } from '../backend/src/data/practiceBank.js';
import { getGuide, GRADES, SUBJECT_IDS } from '../backend/src/data/gimnaziuGuide.js';

const nodeRequire = createRequire(import.meta.url);
const { judgeAnswer } = nodeRequire('../backend/src/grading/answerJudge.js');
const { PACKS } = nodeRequire('../backend/src/data/quiz/hard/index.js');
const { retuneCard } = nodeRequire('../backend/src/data/quiz/hard/closeOptions.js');

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const BEFORE = {
  'matematica:5': { grids: 520, tests: 21 },
  'matematica:6': { grids: 457, tests: 28 },
  'matematica:7': { grids: 439, tests: 28 },
  'matematica:8': { grids: 382, tests: 28 },
  'romana:5': { grids: 678, tests: 1 },
  'romana:6': { grids: 498, tests: 0 },
  'romana:7': { grids: 624, tests: 0 },
  'romana:8': { grids: 450, tests: 0 }
};

describe('întrebări mai grele și mai variate', () => {
  it('nu dublează enunțul împreună cu răspunsul și ține baremul', () => {
    const seen = new Map();
    const skills = new Set(['apply', 'analyze', 'trap', 'false']);
    PACKS.forEach((pack, key) => {
      const [subject] = key.split(':');
      expect(pack.flashcards.length, key).toBeGreaterThanOrEqual(subject === 'romana' ? 6 : 8);
      expect(pack.tests.length, key).toBeGreaterThanOrEqual(subject === 'romana' ? 3 : 6);
      const levels = new Set(pack.flashcards.map(item => item.level));
      expect([...levels].some(level => level <= 2), key).toBe(true);
      expect([...levels].some(level => level >= 7), key).toBe(true);
      const usedSkills = new Set(pack.flashcards.map(item => item.skill));
      expect([...usedSkills].filter(skill => skills.has(skill)).length, key).toBeGreaterThanOrEqual(2);
      [6, 7, 8].forEach(level => {
        const count = pack.tests.filter(item => item.level === level).length;
        expect(count, `${key} nivel ${level}`).toBeGreaterThanOrEqual(2);
      });
      pack.flashcards.forEach(item => {
        const signature = `${fold(item.question)}||${fold(item.options[item.correct])}`;
        expect(seen.has(signature), `${item.id} dublură cu ${seen.get(signature)}`).toBe(false);
        seen.set(signature, item.id);
        expect(item.options).toHaveLength(4);
        expect(item.correct).toBe(0);
        expect(new Set(item.options.map(option => option.trim())).size).toBe(4);
        const sample = item.options[0];
        item.options.forEach((option, index) => {
          const judged = judgeAnswer({
            given: option,
            answers: [sample],
            choices: item.options,
            letter: 'A'
          });
          expect(judged.ok, `${item.id} «${option}»`).toBe(index === 0);
        });
        expect(checkExercise(item.id, sample).ok, item.id).toBe(true);
      });
      pack.tests.forEach(item => {
        const signature = `${fold(item.prompt)}||${fold(item.answers[0])}`;
        expect(seen.has(signature), `${item.id} dublură cu ${seen.get(signature)}`).toBe(false);
        seen.set(signature, item.id);
        expect(item.steps.length, item.id).toBeGreaterThan(0);
        expect(checkExercise(item.id, item.answers[0]).ok, item.id).toBe(true);
        expect(checkExercise(item.id, 'nu-asta').ok, item.id).toBe(false);
        if (item.numeric) {
          expect(Number.isInteger(item.numeric.value), item.id).toBe(true);
          expect(checkExercise(item.id, String(item.numeric.value)).ok, item.id).toBe(true);
        }
      });
    });
  });

  it('apropie variantele greșite de răspunsul lecției, când există destule', () => {
    const pool = listChapterQuestions('matematica', 5, 'naturale').filter(item => item.secondary && item.lesson);
    const sample = pool.find(item => {
      const mates = pool.filter(other => other.lesson === item.lesson && other.id !== item.id);
      return mates.length >= 3;
    });
    expect(sample).toBeTruthy();
    const tuned = retuneCard(sample, pool);
    expect(tuned.options[0]).toBe(sample.options[sample.correct]);
    expect(new Set(tuned.options).size).toBe(4);
    tuned.options.slice(1).forEach(option => {
      const judged = judgeAnswer({
        given: option,
        answers: [tuned.options[0]],
        choices: tuned.options,
        letter: 'A'
      });
      expect(judged.ok, option).toBe(false);
    });
  });

  it('scrie inventarul înainte și după', () => {
    const after = {};
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        const units = getGuide(subject, grade).units || [];
        const row = { grids: 0, tests: 0, challengeGrids: 0, challengeTests: 0, skills: {} };
        units.forEach(unit => {
          const pack = PACKS.get(`${subject}:${grade}:${unit.id}`);
          const questions = listChapterQuestions(subject, grade, unit.id);
          const exercises = listChapterExercises(subject, grade, unit.id);
          row.grids += questions.length;
          row.tests += exercises.length;
          row.challengeGrids += pack ? pack.flashcards.length : 0;
          row.challengeTests += pack ? pack.tests.length : 0;
          (pack ? pack.flashcards : []).forEach(item => {
            row.skills[item.skill] = (row.skills[item.skill] || 0) + 1;
          });
        });
        after[`${subject}:${grade}`] = row;
      });
    });
    console.log('BEFORE_RECALL', JSON.stringify(BEFORE));
    console.log('AFTER_CHALLENGE', JSON.stringify(after));
    expect(after['matematica:8'].challengeGrids).toBeGreaterThanOrEqual(48);
    expect(after['romana:8'].challengeTests).toBeGreaterThanOrEqual(24);
    expect(after['romana:5'].challengeGrids).toBeGreaterThan(BEFORE['romana:5'].tests);
  });
});
