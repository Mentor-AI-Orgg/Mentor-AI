import { describe, it, expect, beforeAll, vi } from 'vitest';
import { createRequire } from 'node:module';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { allChapterKeys, chapterKey, listChapterQuestions } from '../backend/src/data/practiceBank.js';
import { allExerciseKeys, checkExercise, findExercise, listChapterExercises } from '../backend/src/data/exerciseBank.js';
import { pickPractice } from '../backend/src/data/practicePicker.js';
import { GRADES, GUIDES, SUBJECT_IDS } from '../backend/src/data/gimnaziuGuide.js';
import { MAX_DURATION_MS } from '../backend/src/data/chapterTestSession.js';

const nodeRequire = createRequire(import.meta.url);
const { sendDueDigests } = nodeRequire('../backend/src/notify/parentActivity.js');
const economyStore = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

describe('chapter practice bank', () => {
  it('has original theory questions with 4 options for every 5–8 chapter', () => {
    const keys = allChapterKeys();
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        if (subject === 'romana') return;
        (GUIDES[subject][grade].units || []).forEach(unit => {
          expect(keys).toContain(chapterKey(subject, grade, unit.id));
        });
      });
    });
    expect(keys.filter(key => key.startsWith('matematica:')).length).toBe(15);
    expect(keys.filter(key => key.startsWith('romana:')).length).toBe(0);
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
    expect(allExerciseKeys().length).toBe(16);
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        if (subject === 'romana') return;
        (GUIDES[subject][grade].units || []).forEach(unit => {
          const items = listChapterExercises(subject, grade, unit.id);
          expect(items.length).toBeGreaterThanOrEqual(7);
          items.forEach(item => {
            expect(item.prompt.length).toBeGreaterThan(12);
            expect(item.answers.length).toBeGreaterThan(0);
            expect(item.explain.length).toBeGreaterThan(8);
          });
        });
      });
    });
    const pack = pickPractice({ subject: 'matematica', grade: 5, chapterId: 'naturale', kind: 'test', count: 7 });
    expect(pack.cards).toHaveLength(7);
    expect(pack.cards.every(card => card.level >= 6)).toBe(true);
    expect(pack.cards[0].level).toBeLessThan(pack.cards[pack.cards.length - 1].level);
    expect(Math.max(...pack.cards.map(card => card.level))).toBeGreaterThanOrEqual(7);
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
    const created = await registerGranted(app);
    expect(created.res.status).toBe(201);
    const agent = created.agent;

    const generated = await agent.post('/api/flashcards/generate').send({
      chapter_id: 'fractii',
      subject: 'matematica',
      class_level: 5,
      kind: 'test',
      count: 7
    });
    expect(generated.status).toBe(200);
    expect(generated.body.cards).toHaveLength(7);
    expect(generated.body.session_id).toBeTruthy();
    expect(generated.body.cards[0].prompt).toBeTruthy();
    expect(generated.body.cards[0].options).toBeUndefined();
    expect(generated.body.cards[0].answers).toBeUndefined();
    expect(generated.body.engine_used).toBe('chapter_bank');

    const modest = await agent.post('/api/flashcards/generate').send({
      chapter_id: 'fractii',
      subject: 'matematica',
      class_level: 5,
      kind: 'test',
      count: 10,
      target_note: 5
    });
    expect(modest.status).toBe(200);
    expect(modest.body.targetNote).toBe(5);
    expect(modest.body.cards.every(card => (card.level || 1) === 6)).toBe(true);

    const checked = await agent.post('/api/flashcards/check').send({
      card_id: generated.body.cards[0].id,
      answer: '10'
    });
    expect(checked.status).toBe(200);
    expect(typeof checked.body.ok).toBe('boolean');
    expect(checked.body.sample).toBe('');
    expect(checked.body.steps).toEqual([]);

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

    const finished = await agent.post('/api/flashcards/finish').send({
      kind: 'test',
      chapter_id: 'fractii',
      subject: 'matematica',
      class_level: 5,
      title: 'Fracții',
      session_id: generated.body.session_id,
      duration_ms: 185000,
      answers: generated.body.cards.map((card, index) => ({
        card_id: card.id,
        answer: index === 0 ? '1' : ''
      }))
    });
    expect(finished.status).toBe(200);
    expect(finished.body.total).toBe(generated.body.cards.length);
    expect(finished.body.grade).toBeGreaterThanOrEqual(1);
    expect(finished.body.grade).toBeLessThanOrEqual(10);
    expect(finished.body.message).toBeTruthy();
    expect(finished.body.items[0].steps.length).toBeGreaterThan(0);
    expect(finished.body.items[0].sample).toBeTruthy();
    expect(finished.body.history.log.length).toBeGreaterThan(0);
    expect(finished.body.parentNotified).toBe(true);
    expect(finished.body.parentNotify.skipped).toBe(false);
    expect(finished.body.durationMs).toBeGreaterThanOrEqual(0);
    expect(finished.body.durationMs).toBeLessThan(60 * 1000);

    const history = await agent.get('/api/flashcards/history');
    expect(history.status).toBe(200);
    expect(history.body.log[0].gradeNote).toBe(finished.body.grade);
  });

  it('rejects a foreign card, hides the barem until finish, and digests the server score', async () => {
    const created = await registerGranted(app);
    const agent = created.agent;
    const generated = await agent.post('/api/flashcards/generate').send({
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      kind: 'test',
      count: 7
    });
    expect(generated.status).toBe(200);
    const cards = generated.body.cards;
    const sessionId = generated.body.session_id;
    expect(sessionId).toBeTruthy();
    expect(cards.length).toBeGreaterThan(1);

    const first = findExercise(cards[0].id);
    expect(first.answers[0]).toBeTruthy();
    const peek = await agent.post('/api/flashcards/check').send({
      card_id: cards[0].id,
      answer: first.answers[0]
    });
    expect(peek.status).toBe(200);
    expect(peek.body.ok).toBe(true);
    expect(peek.body.sample).toBe('');
    expect(peek.body.steps).toEqual([]);
    expect(peek.body.rubric).toBeNull();
    expect(peek.body.explain || '').not.toContain(first.answers[0]);
    (first.steps || []).forEach(step => {
      if (String(step).length > 8) expect(JSON.stringify(peek.body)).not.toContain(step);
    });

    const outsider = await agent.post('/api/flashcards/check').send({
      card_id: 'e8a1',
      answer: '24'
    });
    expect(outsider.status).toBe(200);
    expect(outsider.body.sample).toBe('');
    expect(outsider.body.steps).toEqual([]);

    const email = authStore.findByUsername(created.username).email;
    const before = economyStore.getUser(email);
    const xpBefore = before.xp || 0;
    const forged = await agent.post('/api/economy/activity').send({
      type: 'chapter_test',
      meta: {
        chapterId: 'naturale',
        subject: 'matematica',
        grade: 5,
        correct: 8,
        score: 8,
        total: 10,
        minutes: 9999,
        durationMs: 9999 * 60000
      }
    });
    expect(forged.status).toBe(400);
    const spoof = await agent.post('/api/economy/progress').send({
      type: 'chapter_test',
      meta: {
        chapterId: 'naturale',
        subject: 'matematica',
        grade: 5,
        score: 100,
        correct: 100,
        total: 100,
        durationMs: 9e15
      }
    });
    expect(spoof.status).toBe(400);
    expect(economyStore.getUser(email).xp || 0).toBe(xpBefore);

    const foreign = await agent.post('/api/flashcards/finish').send({
      kind: 'test',
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      session_id: sessionId,
      duration_ms: 9e15,
      answers: [
        { card_id: cards[0].id, answer: first.answers[0] },
        { card_id: 'e8a1', answer: '24' }
      ]
    });
    expect(foreign.status).toBe(400);

    const missing = await agent.post('/api/flashcards/finish').send({
      kind: 'test',
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      duration_ms: 60000,
      answers: cards.map(card => ({ card_id: card.id, answer: '' }))
    });
    expect(missing.status).toBe(400);

    before.chapterTestSessions[sessionId].startedAt = Date.now() - 10 * 24 * 60 * 60 * 1000;
    const finished = await agent.post('/api/flashcards/finish').send({
      kind: 'test',
      chapter_id: 'alt-capitol',
      subject: 'matematica',
      class_level: 8,
      session_id: sessionId,
      duration_ms: 60000,
      answers: [{ card_id: cards[0].id, answer: first.answers[0] }]
    });
    expect(finished.status).toBe(200);
    expect(finished.body.total).toBe(cards.length);
    expect(finished.body.correct).toBe(1);
    expect(finished.body.durationMs).toBe(MAX_DURATION_MS);
    expect(finished.body.items[0].sample).toBeTruthy();
    expect(finished.body.items[0].steps.length).toBeGreaterThan(0);
    expect(finished.body.summary.xp).toBeGreaterThan(xpBefore);

    const revealed = await agent.post('/api/flashcards/check').send({
      card_id: cards[0].id,
      answer: first.answers[0]
    });
    expect(revealed.status).toBe(200);
    expect(revealed.body.sample).toBeTruthy();
    expect(revealed.body.steps.length).toBeGreaterThan(0);

    const user = economyStore.getUser(email);
    const stored = Object.values(user.practiceTests);
    expect(stored).toHaveLength(1);
    expect(stored[0].score).toBe(1);
    expect(stored[0].total).toBe(cards.length);
    expect(stored[0].durationMs).toBe(MAX_DURATION_MS);
    const digest = user.digestEvents.filter(event => event.type === 'chapter_test');
    expect(digest).toHaveLength(1);
    expect(digest[0].correct).toBe(1);
    expect(digest[0].total).toBe(cards.length);
    expect(digest[0].minutes).toBe(180);
    expect(digest[0].title).toBe('Numere naturale');

    const deliver = nodeRequire('../backend/src/notify/deliver.js');
    const delivery = vi.spyOn(deliver, 'deliverMessage').mockResolvedValue({
      mocked: false,
      delivered: true,
      channel: 'email'
    });
    let sent;
    try {
      sent = await sendDueDigests(new Date(), { force: true });
    } finally {
      delivery.mockRestore();
    }
    const mine = sent.find(row => row.username === created.username);
    expect(mine).toBeTruthy();
    expect(mine.body).toContain(`1 din ${cards.length}`);
    expect(mine.body).toContain('Numere naturale');
    expect(mine.body).toContain('180 minute');
    expect(mine.body).not.toContain('8 din 10');
    expect(mine.body).not.toContain('100 din 100');
  });
});
