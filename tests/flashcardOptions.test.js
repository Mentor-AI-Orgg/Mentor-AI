import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
import { listChapterQuestions } from '../backend/src/data/practiceBank.js';
import { pickPractice } from '../backend/src/data/practicePicker.js';

const nodeRequire = createRequire(import.meta.url);
const { judgeAnswer } = nodeRequire('../backend/src/grading/answerJudge.js');
const { retuneCard, sameCategory, isNearNumber } = nodeRequire('../backend/src/data/quiz/hard/closeOptions.js');

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function wrongsOf(item) {
  return item.options.filter((_, index) => index !== item.correct);
}

describe('variante apropiate la flashcard-uri', () => {
  it('înlocuiește variantele fără legătură cu termeni din aceeași clasă', () => {
    const pool = listChapterQuestions('matematica', 5, 'naturale');
    const card = pool.find(item => fold(item.options[item.correct]) === 'triunghiular');
    expect(card).toBeTruthy();
    const tuned = retuneCard(card, pool);
    expect(tuned.options[0]).toBe(card.options[card.correct]);
    const wrongs = tuned.options.slice(1);
    expect(wrongs.filter(word => sameCategory(tuned.options[0], word)).length).toBe(3);
    wrongs.forEach(word => {
      expect(fold(word)).not.toBe(fold(tuned.options[0]));
      const judged = judgeAnswer({
        given: word,
        answers: [tuned.options[0]],
        choices: tuned.options,
        letter: 'A'
      });
      expect(judged.ok, word).toBe(false);
    });
    expect(wrongs.some(word => ['măcar', 'cantităților'].includes(word))).toBe(false);
  });

  it('ține numerele aproape de răspuns, nu din alt ordin de mărime', () => {
    const tuned = retuneCard({
      id: 'lq-num',
      secondary: true,
      correct: 0,
      question: 'Cât rămâne?',
      options: ['48', 'un milion', 'albastru', 'poate']
    }, []);
    expect(tuned.options[0]).toBe('48');
    tuned.options.slice(1).forEach(word => {
      expect(isNearNumber('48', word), word).toBe(true);
    });
  });

  it('lasă grilele cu variante alese de mână neschimbate', () => {
    const pool = listChapterQuestions('matematica', 5, 'naturale');
    const card = pool.find(item => item.challenge && item.options);
    const tuned = retuneCard(card, pool);
    expect(tuned.options).toEqual(card.options);
    expect(tuned.correct).toBe(card.correct);
  });

  it('servește la lecție variantele apropiate, nu lista veche', () => {
    const pool = listChapterQuestions('matematica', 5, 'naturale');
    const source = pool.find(item => fold(item.options[item.correct]) === 'adunare');
    expect(source).toBeTruthy();
    const hidden = pool
      .filter(item => item.lesson === source.lesson && item.id !== source.id)
      .map(item => item.id);
    const pack = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'flashcards',
      lessonId: source.lesson,
      excludeIds: hidden,
      count: 1
    });
    const served = pack.cards.find(card => card.id === source.id);
    expect(served).toBeTruthy();
    const wrongs = wrongsOf(served);
    expect(wrongs.filter(word => sameCategory(served.options[served.correct], word)).length).toBeGreaterThanOrEqual(2);
    expect(new Set(served.options.map(fold)).size).toBe(4);
  });
});
