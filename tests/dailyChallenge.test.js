import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { challengeFor } from '../backend/src/dailyChallenge.js';

describe('provocarea zilei', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('alege aceeași întrebare pentru aceeași zi și nu o inventează', () => {
    const first = challengeFor({ grade: 6, date: '2026-10-09' });
    const again = challengeFor({ grade: 6, date: '2026-10-09' });
    expect(again).toEqual(first);
    expect(first.id).toBeTruthy();
    expect(first.question.length).toBeGreaterThan(8);
    expect(first.options.length).toBeGreaterThan(1);
    expect(first.options[first.correctIndex]).toBeTruthy();
    const otherDay = challengeFor({ grade: 6, date: '2026-10-10' });
    expect(otherDay.id).toBeTruthy();
    expect(otherDay.date).toBe('2026-10-10');
  });

  it('dă feedback pe loc, puncte o singură dată, și ține seria de zile', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-10-08T12:00:00.000Z'));
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app, { class: '6' });

    const hidden = await created.agent.get('/api/economy/daily');
    expect(hidden.status).toBe(200);
    expect(hidden.body.explain).toBeUndefined();
    expect(hidden.body.answer).toBeUndefined();
    expect(hidden.body.correctIndex).toBeUndefined();
    expect(hidden.body.question).toBeTruthy();

    const today = challengeFor({ grade: 6, date: '2026-10-08' });
    const wrongIndex = today.correctIndex === 0 ? 1 : 0;
    const missed = await created.agent.post('/api/economy/daily').send({ choice: wrongIndex });
    expect(missed.status).toBe(200);
    expect(missed.body.correct).toBe(false);
    expect(missed.body.xp).toBe(0);
    expect(missed.body.streak).toBe(1);
    expect(missed.body.explain).toBeTruthy();
    expect((await created.agent.get('/api/auth/me')).status).toBe(200);

    const repeat = await created.agent.post('/api/economy/daily').send({ choice: today.correctIndex });
    expect(repeat.body.already).toBe(true);
    expect(repeat.body.xp).toBe(0);
    expect(repeat.body.streak).toBe(1);

    vi.setSystemTime(new Date('2026-10-09T12:00:00.000Z'));
    const next = challengeFor({ grade: 6, date: '2026-10-09' });
    const hit = await created.agent.post('/api/economy/daily').send({ choice: next.correctIndex });
    expect(hit.body.correct).toBe(true);
    expect(hit.body.streak).toBe(2);
    expect(hit.body.xp).toBeGreaterThan(0);
    expect(hit.body.coins).toBeGreaterThan(0);

    const again = await created.agent.post('/api/economy/daily').send({ choice: next.correctIndex });
    expect(again.body.already).toBe(true);
    expect(again.body.xp).toBe(0);

    vi.setSystemTime(new Date('2026-10-11T12:00:00.000Z'));
    const later = challengeFor({ grade: 6, date: '2026-10-11' });
    const reset = await created.agent.post('/api/economy/daily').send({ choice: later.correctIndex });
    expect(reset.body.streak).toBe(1);
    expect((await created.agent.get('/api/auth/me')).status).toBe(200);
  });
});
