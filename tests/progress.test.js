import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

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

  it('sends only one parent study digest per day', async () => {
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
    expect(second.body.parentNotify.skipped).toBe(true);
    expect(second.body.parentNotify.reason).toBe('study_digest_today');
  });
});
