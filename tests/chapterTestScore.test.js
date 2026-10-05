import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { findExercise } from '../backend/src/data/exerciseBank.js';

const nodeRequire = createRequire(import.meta.url);
const economyStore = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

describe('nota și durata testului de capitol', () => {
  it('le calculează pe server și ignoră scorul și durata trimise de browser', async () => {
    const { app } = createApp({ autosave: false });
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
    const email = authStore.findByUsername(created.username).email;
    const user = economyStore.getUser(email);
    const elapsed = 90 * 1000;
    user.chapterTestSessions[sessionId].startedAt = Date.now() - elapsed;

    const forged = await agent.post('/api/economy/progress').send({
      type: 'chapter_test',
      meta: {
        chapterId: 'naturale',
        score: 99,
        correct: 99,
        total: 1,
        durationMs: 1000,
        serverScored: true
      }
    });
    expect(forged.status).toBe(400);

    const finished = await agent.post('/api/flashcards/finish').send({
      kind: 'test',
      chapter_id: 'alt-capitol',
      subject: 'romana',
      class_level: 8,
      session_id: sessionId,
      duration_ms: 1000,
      correct: 99,
      score: 99,
      gradeNote: 10,
      answers: [{ card_id: cards[0].id, answer: first.answers[0] }]
    });
    expect(finished.status).toBe(200);
    expect(finished.body.correct).toBe(1);
    expect(finished.body.total).toBe(cards.length);
    expect(finished.body.correct).not.toBe(99);
    expect(finished.body.durationMs).toBeGreaterThan(80_000);
    expect(finished.body.durationMs).toBeLessThan(120_000);
    expect(finished.body.durationMs).not.toBe(1000);

    const stored = Object.values(economyStore.getUser(email).practiceTests);
    expect(stored).toHaveLength(1);
    expect(stored[0].score).toBe(1);
    expect(stored[0].total).toBe(cards.length);
    expect(stored[0].durationMs).toBe(finished.body.durationMs);

    const digest = economyStore.getUser(email).digestEvents.filter(event => event.type === 'chapter_test');
    expect(digest).toHaveLength(1);
    expect(digest[0].correct).toBe(1);
    expect(digest[0].total).toBe(cards.length);
    expect(digest[0].minutes).toBe(Math.round(finished.body.durationMs / 60000));
    expect(digest[0].minutes).not.toBe(0);
  });
});
