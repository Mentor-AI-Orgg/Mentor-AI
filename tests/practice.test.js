import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { allChapterKeys, chapterKey, listChapterQuestions } from '../backend/src/data/practiceBank.js';
import { allExerciseKeys, checkExercise, listChapterExercises } from '../backend/src/data/exerciseBank.js';
import { pickPractice } from '../backend/src/data/practicePicker.js';
import { GRADES, GUIDES, SUBJECT_IDS } from '../backend/src/data/gimnaziuGuide.js';

const PASSWORD = 'Testpass1!';

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

describe('chapter practice bank', () => {
  it('has original theory questions with 4 options for every 5–8 chapter', () => {
    const keys = allChapterKeys();
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        (GUIDES[subject][grade].units || []).forEach(unit => {
          expect(keys).toContain(chapterKey(subject, grade, unit.id));
        });
      });
    });
    expect(keys.filter(key => key.startsWith('matematica:')).length).toBe(15);
    expect(keys.filter(key => key.startsWith('romana:')).length).toBe(20);
    keys.forEach(key => {
      const [subject, grade, chapterId] = key.split(':');
      const items = listChapterQuestions(subject, grade, chapterId);
      expect(items.length).toBeGreaterThanOrEqual(6);
      items.forEach(item => {
        expect(item.options).toHaveLength(4);
        expect(item.correct).toBeGreaterThanOrEqual(0);
        expect(item.correct).toBeLessThan(4);
        expect(item.question.length).toBeGreaterThan(12);
        expect(item.explain.length).toBeGreaterThan(8);
      });
    });
  });

  it('has solve-it exercises for every 5–8 chapter, without leaking the key in the public card', () => {
    expect(allExerciseKeys().length).toBe(35);
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        (GUIDES[subject][grade].units || []).forEach(unit => {
          const items = listChapterExercises(subject, grade, unit.id);
          expect(items.length).toBeGreaterThanOrEqual(4);
          items.forEach(item => {
            expect(item.prompt.length).toBeGreaterThan(12);
            expect(item.answers.length).toBeGreaterThan(0);
            expect(item.explain.length).toBeGreaterThan(8);
          });
        });
      });
    });
    const pack = pickPractice({ subject: 'matematica', grade: 5, chapterId: 'naturale', kind: 'test', count: 4 });
    expect(pack.cards).toHaveLength(4);
    expect(pack.cards[0].prompt).toBeTruthy();
    expect(pack.cards[0].options).toBeUndefined();
    expect(pack.cards[0].answers).toBeUndefined();
    expect(pack.cards[0].steps).toBeUndefined();
    expect(pack.cards[0].explain).toBeUndefined();
    expect(checkExercise(pack.cards[0].id, 'nu-asta').found).toBe(true);
  });

  it('keeps unique ids and returns worked steps only after a check', () => {
    const ids = [];
    allExerciseKeys().forEach(key => {
      const [subject, grade, chapterId] = key.split(':');
      listChapterExercises(subject, grade, chapterId).forEach(item => {
        ids.push(item.id);
        expect(item.steps.length).toBeGreaterThan(0);
        expect(item.explain.length).toBeGreaterThan(8);
      });
    });
    expect(new Set(ids).size).toBe(ids.length);

    const power = checkExercise('e5n1', '20');
    expect(power.ok).toBe(true);
    expect(power.steps).toEqual(expect.arrayContaining(['72 − 16 = 20']));

    const identity = checkExercise('e8a1', '24');
    expect(identity.ok).toBe(true);
    expect(identity.steps.length).toBeGreaterThan(2);

    const venn = checkExercise('e6m2', '5');
    expect(venn.ok).toBe(true);
  });

  it('can keep generating after coverage by marking review', () => {
    const first = pickPractice({ subject: 'matematica', grade: 5, chapterId: 'naturale', kind: 'test', count: 5 });
    const again = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'test',
      excludeIds: first.cards.map(card => card.id),
      seenPoints: first.cards.map(card => card.point),
      count: 5
    });
    expect(again.cards.length).toBeGreaterThan(0);
    expect(again.coverage.total).toBeGreaterThan(0);
  });

  it('shuffles the four choices so the right one is not always A', () => {
    const seen = new Set();
    for (let i = 0; i < 24; i += 1) {
      const pack = pickPractice({ subject: 'matematica', grade: 5, chapterId: 'naturale', kind: 'flashcards', count: 6 });
      pack.cards.forEach(card => {
        expect(card.options).toHaveLength(4);
        expect(card.correct).toBeGreaterThanOrEqual(0);
        expect(card.correct).toBeLessThan(4);
        expect(card.options[card.correct]).toBeTruthy();
        seen.add(card.correct);
      });
    }
    expect(seen.size).toBeGreaterThan(1);
  });
});

describe('practice API', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('returns a chapter test and records seen ideas', async () => {
    const agent = request.agent(app);
    const register = await agent.post('/api/auth/register').send({
      email: uniqueEmail('quiz'),
      password: PASSWORD,
      role: 'student',
      parentEmail: uniqueEmail('parinte'),
      parental_consent: true,
      privacy_accepted: true
    });
    expect(register.status).toBe(201);

    const generated = await agent.post('/api/flashcards/generate').send({
      chapter_id: 'fractii',
      subject: 'matematica',
      class_level: 5,
      kind: 'test',
      count: 5
    });
    expect(generated.status).toBe(200);
    expect(generated.body.cards).toHaveLength(4);
    expect(generated.body.cards[0].prompt).toBeTruthy();
    expect(generated.body.cards[0].options).toBeUndefined();
    expect(generated.body.cards[0].answers).toBeUndefined();
    expect(generated.body.engine_used).toBe('chapter_bank');

    const checked = await agent.post('/api/flashcards/check').send({
      card_id: generated.body.cards[0].id,
      answer: '10'
    });
    expect(checked.status).toBe(200);
    expect(typeof checked.body.ok).toBe('boolean');
    expect(Array.isArray(checked.body.steps)).toBe(true);
    expect(checked.body.steps.length).toBeGreaterThan(0);
    expect(checked.body.explain).toBeTruthy();

    const card = generated.body.cards[0];
    const seen = await agent.post('/api/flashcards/seen').send({
      chapter_id: 'fractii',
      subject: 'matematica',
      class_level: 5,
      point: card.point,
      card_id: card.id
    });
    expect(seen.status).toBe(200);
    expect(seen.body.coverage.seen).toBeGreaterThanOrEqual(1);

    const testAward = await agent.post('/api/economy/progress').send({
      type: 'chapter_test',
      note: 'Fracții',
      meta: { subject: 'matematica', grade: '5', chapterId: 'fractii', score: 4 }
    });
    expect(testAward.status).toBe(200);
    expect(testAward.body.awarded.coins).toBe(10);
  });
});
