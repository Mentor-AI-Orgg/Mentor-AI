import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { levelFromXp, XP_THRESHOLDS } from '../backend/src/data/progressEngine.js';
import { xpProgress } from '../frontend/xpProgress.js';

const PASSWORD = 'Testpass1!';
let app;

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

async function registerStudent(agent) {
  const email = uniqueEmail('prog');
  const res = await agent.post('/api/auth/register').send({
    email,
    password: PASSWORD,
    role: 'student',
    class: '6',
    parentEmail: uniqueEmail('parinte'),
    parental_consent: true,
    privacy_accepted: true
  });
  expect(res.status).toBe(201);
  return email;
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
    expect(open.body.awarded.coins).toBe(8);
    expect(open.body.summary.balance).toBeGreaterThanOrEqual(38);

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
    expect(session.body.awarded.coins).toBe(15);
    expect(session.body.summary.chaptersDone).toBeGreaterThanOrEqual(1);

    let knownAward = null;
    for (let i = 0; i < 5; i += 1) {
      const known = await agent.post('/api/economy/progress').send({
        type: 'flashcard_known',
        meta: { topic: 'fractii' }
      });
      expect(known.status).toBe(200);
      if (known.body.awarded) knownAward = known.body.awarded;
    }
    expect(knownAward).toBeTruthy();
    expect(knownAward.coins).toBe(10);

    const focus = await agent.post('/api/economy/progress').send({
      type: 'focus_session',
      meta: { minutes: 25 }
    });
    expect(focus.status).toBe(200);
    expect(focus.body.awarded.coins).toBe(12);

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
    await registerStudent(agent);

    const login = await agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    expect(login.body.summary.xp).toBe(20);
    expect(login.body.summary.level).toBe(1);
    expect(login.body.summary.xpIntoLevel).toBe(20);
    expect(login.body.summary.xpToNext).toBe(40);
    expect(login.body.summary.levelSpan).toBe(60);
    expect(login.body.summary.nextLevelAt).toBe(60);

    const opened = await agent.post('/api/economy/progress').send({
      type: 'chapter_open',
      meta: { subject: 'matematica', grade: '6', chapterId: 'nivel-bar', title: 'Nivel' }
    });
    expect(opened.body.summary.xp).toBe(45);
    expect(opened.body.summary.level).toBe(1);
    expect(opened.body.summary.xpIntoLevel).toBe(45);
    expect(opened.body.summary.xpToNext).toBe(15);

    const session = await agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '6', chapterId: 'nivel-bar', title: 'Nivel' }
    });
    expect(session.body.summary.xp).toBe(70);
    expect(session.body.summary.level).toBe(2);
    expect(session.body.summary.xpIntoLevel).toBe(10);
    expect(session.body.summary.xpToNext).toBe(110);
    expect(session.body.summary.levelSpan).toBe(120);
  });
});
