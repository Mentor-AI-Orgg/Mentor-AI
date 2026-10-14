import { describe, expect, it, beforeAll } from 'vitest';
import request from 'supertest';
import { createRequire } from 'node:module';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const daily = nodeRequire('../backend/src/data/dailyChallenge.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');
const auth = nodeRequire('../backend/src/data/authStore.js');

function sample(id, correct) {
  return {
    id,
    question: `Întrebarea de recapitulare ${id}?`,
    options: ['unu', 'doi', 'trei', 'patru'],
    correct
  };
}

describe('alegerea întrebărilor', () => {
  it('ia întrebări doar din capitolele terminate', () => {
    const pool = daily.reviewPool({
      'matematica:5:naturale': { status: 'done' },
      'matematica:5:fractii': { status: 'started' }
    });
    const ids = new Set(pool.map(item => item.id));
    expect(ids.has('m5n1')).toBe(true);
    expect(ids.has('m5f1')).toBe(false);
    expect(daily.reviewPool({ 'matematica:5:start': { status: 'done' } })).toEqual([]);
  });

  it('e stabilă pentru același elev și aceeași zi, și mai scurtă dacă nu sunt 5 întrebări', () => {
    const pool = ['a', 'b', 'c', 'd', 'e', 'f'].map((id, index) => sample(id, index % 4));
    const one = daily.pickDaily(pool, '2026-10-14:elev-a');
    const again = daily.pickDaily(pool, '2026-10-14:elev-a');
    const other = daily.pickDaily(pool, '2026-10-14:elev-b');
    expect(one.map(item => item.id)).toEqual(again.map(item => item.id));
    expect(one.map(item => item.options)).toEqual(again.map(item => item.options));
    expect(one.map(item => item.id).join()).not.toBe(other.map(item => item.id).join());
    expect(one).toHaveLength(5);
    one.forEach(item => {
      expect(item).not.toHaveProperty('explain');
      expect(item.correctAt).toBeGreaterThanOrEqual(0);
      expect(item.options[item.correctAt]).toBe(['unu', 'doi', 'trei', 'patru'][pool.find(row => row.id === item.id).correct]);
    });
    expect(daily.pickDaily(pool.slice(0, 2), '2026-10-14:elev-a')).toHaveLength(2);
    expect(daily.pickDaily([], '2026-10-14:elev-a')).toEqual([]);
  });

  it('ordonează clasamentul după scor și XP, doar cu porecla', () => {
    const board = daily.rankRows([
      { nickname: 'Mia', correct: 3, total: 5, xp: 60, email: 'mia@example.com' },
      { nickname: 'Ana', correct: 5, total: 5, xp: 100 },
      { nickname: 'Ion', correct: 3, total: 5, xp: 40 }
    ]);
    expect(board.map(row => row.nickname)).toEqual(['Ana', 'Mia', 'Ion']);
    expect(Object.keys(board[0]).sort()).toEqual(['correct', 'nickname', 'place', 'total', 'xp']);
    expect(JSON.stringify(board)).not.toContain('@');
  });
});

describe('provocarea zilei', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  async function finishChapter(agent, chapterId) {
    const res = await agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '5', chapterId, title: chapterId }
    });
    expect(res.status).toBe(200);
  }

  it('cere autentificare', async () => {
    const res = await request(app).get('/api/daily-challenge');
    expect(res.status).toBe(401);
  });

  it('arată mesajul către prima lecție când nu a terminat nimic', async () => {
    const created = await registerGranted(app);
    const res = await created.agent.get('/api/daily-challenge');
    expect(res.status).toBe(200);
    expect(res.body.ready).toBe(false);
    expect(res.body.message).toMatch(/prima lecție/);
    expect(res.body.questions).toBeUndefined();
  });

  it('dă cinci întrebări din lecția terminată, XP dublu o singură dată și clasament fără email', async () => {
    const first = await registerGranted(app);
    const second = await registerGranted(app);
    expect(first.res.status).toBe(201);
    expect(second.res.status).toBe(201);

    await finishChapter(first.agent, 'naturale');
    const summary = await first.agent.get('/api/economy/summary');
    expect(summary.body.summary.completionStreak).toBe(1);
    expect(summary.body.summary.streakFreezes).toBe(1);
    const xpBefore = summary.body.summary.xp;

    const open = await first.agent.get('/api/daily-challenge');
    expect(open.status).toBe(200);
    expect(open.body.ready).toBe(true);
    expect(open.body.done).toBe(false);
    expect(open.body.questions).toHaveLength(5);
    const allowed = new Set(daily.reviewPool({ 'matematica:5:naturale': { status: 'done' } }).map(item => item.id));
    open.body.questions.forEach(item => {
      expect(allowed.has(item.id)).toBe(true);
      expect(item).not.toHaveProperty('correct');
      expect(item).not.toHaveProperty('correctAt');
      expect(item).not.toHaveProperty('explain');
    });
    const again = await first.agent.get('/api/daily-challenge');
    expect(again.body.questions.map(item => item.id)).toEqual(open.body.questions.map(item => item.id));

    const email = auth.findByUsername(first.username).email;
    const stored = economy.getUser(email).dailyChallenge.questions;
    const answers = stored.map(item => ({ id: item.id, choice: item.correctAt }));
    const done = await first.agent.post('/api/daily-challenge/finish').send({ answers });
    expect(done.status).toBe(200);
    expect(done.body.done).toBe(true);
    expect(done.body.correct).toBe(5);
    expect(done.body.xp).toBe(100);
    expect(done.body.questions).toBeUndefined();
    expect(JSON.stringify(done.body)).not.toContain(email);
    expect(done.body.ranking[0]).toMatchObject({ nickname: first.username, correct: 5, xp: 100 });

    const after = await first.agent.get('/api/economy/summary');
    expect(after.body.summary.xp).toBe(xpBefore + 100);

    const repeat = await first.agent.post('/api/daily-challenge/finish').send({ answers });
    expect(repeat.body.xp).toBe(100);
    const still = await first.agent.get('/api/economy/summary');
    expect(still.body.summary.xp).toBe(xpBefore + 100);

    await finishChapter(second.agent, 'naturale');
    const quiet = await second.agent.post('/api/daily-challenge/finish').send({ answers: [] });
    expect(quiet.body.correct).toBe(0);
    const board = await first.agent.get('/api/daily-challenge');
    expect(board.body.ranking.map(row => row.nickname)).toEqual([first.username, second.username]);
    board.body.ranking.forEach(row => {
      expect(Object.keys(row).sort()).toEqual(['correct', 'nickname', 'place', 'total', 'xp']);
    });
    expect(JSON.stringify(board.body)).not.toContain(email);
    expect(JSON.stringify(board.body)).not.toContain(auth.findByUsername(second.username).email);
  });
});
