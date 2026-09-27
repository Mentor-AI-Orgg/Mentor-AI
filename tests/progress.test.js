import { describe, it, expect, beforeAll } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { levelFromXp, XP_THRESHOLDS } from '../backend/src/data/progressEngine.js';
import { xpProgress } from '../frontend/xpProgress.js';

const nodeRequire = createRequire(import.meta.url);
const economyStore = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

let app;

async function registerStudent(agent) {
  const created = await registerGranted(app, { agent, class: '6' });
  expect(created.res.status).toBe(201);
  expect(created.confirm.status).toBe(200);
  return created.username;
}

describe('verified study progress', () => {
  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('awards chapter, session, flashcards and focus from server actions, not shop forms', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);

    const login = await agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    expect(login.status).toBe(200);
    expect(login.body.balance).toBe(30);
    expect(login.body.summary.xp).toBe(20);
    expect(login.body.summary.level).toBe(1);

    const spoof = await agent.post('/api/economy/claim').send({
      type: 'flashcards_5',
      correct_count: 99,
      topic: 'hack'
    });
    expect(spoof.status).toBe(400);
    expect(spoof.body.reason).toBe('use_study_actions');
    expect(spoof.body.balance).toBe(30);

    const open = await agent.post('/api/economy/progress').send({
      type: 'chapter_open',
      note: 'Fracții',
      meta: { subject: 'matematica', grade: '6', chapterId: 'fractii', title: 'Fracții' }
    });
    expect(open.status).toBe(200);
    expect(open.body.awarded).toBeNull();
    expect(open.body.summary.balance).toBe(30);
    expect(open.body.summary.xp).toBe(20);

    const again = await agent.post('/api/economy/progress').send({
      type: 'chapter_open',
      meta: { subject: 'matematica', grade: '6', chapterId: 'fractii', title: 'Fracții' }
    });
    expect(again.status).toBe(200);
    expect(again.body.awarded).toBeNull();

    const session = await agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '6', chapterId: 'fractii', title: 'Fracții' }
    });
    expect(session.status).toBe(200);
    expect(session.body.awarded).toBeNull();
    expect(session.body.summary.balance).toBe(30);
    expect(session.body.summary.chaptersDone).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < 5; i += 1) {
      const known = await agent.post('/api/economy/progress').send({
        type: 'flashcard_known',
        meta: { topic: 'fractii' }
      });
      expect(known.status).toBe(200);
      expect(known.body.awarded).toBeNull();
    }

    const focus = await agent.post('/api/economy/progress').send({
      type: 'focus_session',
      meta: { minutes: 25 }
    });
    expect(focus.status).toBe(200);
    expect(focus.body.awarded).toBeNull();
    expect(focus.body.summary.xp).toBe(20);

    const blocked = await agent.post('/api/economy/progress').send({ type: 'mentor_message' });
    expect(blocked.status).toBe(400);
  });

  it('emails the parent for each study action', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);

    const first = await agent.post('/api/economy/progress').send({
      type: 'chapter_open',
      meta: { subject: 'romana', grade: '6', chapterId: 'text', title: 'Text' }
    });
    expect(first.status).toBe(200);
    expect(first.body.parentNotify.skipped).toBe(false);

    const second = await agent.post('/api/economy/progress').send({
      type: 'focus_session',
      meta: { minutes: 50 }
    });
    expect(second.status).toBe(200);
    expect(second.body.parentNotify.skipped).toBe(false);
  });

  it('still emails the parent for every chapter test after the daily digest', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);

    const digest = await agent.post('/api/economy/progress').send({
      type: 'chapter_open',
      meta: { subject: 'romana', grade: '6', chapterId: 'text', title: 'Text' }
    });
    expect(digest.body.parentNotify.skipped).toBe(false);

    const test = await agent.post('/api/economy/progress').send({
      type: 'chapter_test',
      note: 'Fracții',
      meta: { subject: 'matematica', grade: '6', chapterId: 'fractii', title: 'Fracții', gradeNote: 8, durationMs: 420000 }
    });
    expect(test.status).toBe(200);
    expect(test.body.parentNotify.skipped).toBe(false);
  });

  it('fills the current level and keeps climbing after the last table step', () => {
    expect(XP_THRESHOLDS[1]).toBe(60);
    expect(XP_THRESHOLDS[4]).toBe(650);

    expect(levelFromXp(0)).toMatchObject({ level: 1, xpIntoLevel: 0, xpToNext: 60, levelSpan: 60, nextLevelAt: 60 });
    expect(levelFromXp(30)).toMatchObject({ level: 1, xpIntoLevel: 30, xpToNext: 30, levelSpan: 60 });
    expect(levelFromXp(59)).toMatchObject({ level: 1, xpToNext: 1 });
    expect(levelFromXp(60)).toMatchObject({ level: 2, xpIntoLevel: 0, xpToNext: 120, nextLevelAt: 180 });
    expect(levelFromXp(650)).toMatchObject({ level: 5, xpIntoLevel: 0, xpToNext: 250 });
    expect(levelFromXp(2900)).toMatchObject({ level: 11, xpIntoLevel: 0, xpToNext: 400 });
    expect(levelFromXp(3300)).toMatchObject({ level: 12, xpIntoLevel: 0, xpToNext: 400 });
    expect(levelFromXp(3500)).toMatchObject({ level: 12, xpIntoLevel: 200, xpToNext: 200, levelSpan: 400 });

    const mid = xpProgress({ level: 1, xp: 30, xpIntoLevel: 30, xpToNext: 30, levelSpan: 60 });
    expect(mid.pct).toBe(50);
    expect(mid.nextLevel).toBe(2);
    expect(mid.toNext).toBe(30);
  });

  it('returns level fields on economy summary after study XP', async () => {
    const agent = request.agent(app);
    const username = await registerStudent(agent);

    const login = await agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    expect(login.body.summary.xp).toBe(20);
    expect(login.body.summary.level).toBe(1);
    expect(login.body.summary.xpIntoLevel).toBe(20);
    expect(login.body.summary.xpToNext).toBe(40);
    expect(login.body.summary.levelSpan).toBe(60);
    expect(login.body.summary.nextLevelAt).toBe(60);

    const email = authStore.findByUsername(username).email;
    const opened = economyStore.recordProgress({
      userId: email,
      type: 'chapter_open',
      trusted: true,
      meta: { subject: 'matematica', grade: '6', chapterId: 'nivel-bar', title: 'Nivel' }
    });
    expect(opened.summary.xp).toBe(45);
    expect(opened.summary.level).toBe(1);
    expect(opened.summary.xpIntoLevel).toBe(45);
    expect(opened.summary.xpToNext).toBe(15);

    const session = economyStore.recordProgress({
      userId: email,
      type: 'session_complete',
      trusted: true,
      meta: { subject: 'matematica', grade: '6', chapterId: 'nivel-bar', title: 'Nivel' }
    });
    expect(session.summary.xp).toBe(70);
    expect(session.summary.level).toBe(2);
    expect(session.summary.xpIntoLevel).toBe(10);
    expect(session.summary.xpToNext).toBe(110);
    expect(session.summary.levelSpan).toBe(120);
  });

  it('stops trusted awards at the daily cap so a burst cannot reach level 5', async () => {
    const agent = request.agent(app);
    const username = await registerStudent(agent);
    const email = authStore.findByUsername(username).email;
    await agent.post('/api/economy/claim').send({ type: 'login_bonus' });

    let last = null;
    for (let i = 0; i < 12; i += 1) {
      last = economyStore.recordProgress({
        userId: email,
        type: 'session_complete',
        trusted: true,
        meta: { subject: 'matematica', grade: '6', chapterId: `rafala-${i}`, title: `Rafală ${i}` }
      });
    }
    expect(last.summary.xp).toBeGreaterThan(20);
    expect(last.summary.xp).toBeLessThanOrEqual(140);
    expect(last.summary.level).toBeLessThan(5);
    expect(last.summary.balance).toBeLessThanOrEqual(110);
  });
});
