import { createRequire } from 'node:module';
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { parseAppHash } from '../frontend/appRoutes.js';

const require = createRequire(import.meta.url);
const { ensureParentViewToken } = require('../backend/src/data/authStore.js');

const PASSWORD = 'Testpass1!';

describe('parent read-only report', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('gives the parent a link and a report without a parent account', async () => {
    const agent = request.agent(app);
    const stamp = Date.now();
    const register = await agent.post('/api/auth/register').send({
      email: `parinte.view.${stamp}@example.com`,
      password: PASSWORD,
      role: 'student',
      name: 'Mara',
      username: `mara${stamp}`,
      class: '5',
      parentEmail: `adult.${stamp}@example.com`,
      parental_consent: true,
      privacy_accepted: true
    });
    expect([200, 201]).toContain(register.status);
    expect(register.body.user.parentViewToken).toBeUndefined();

    const generated = await agent.post('/api/flashcards/generate').send({
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      kind: 'test',
      count: 3
    });
    expect(generated.status).toBe(200);

    const finished = await agent.post('/api/flashcards/finish').send({
      kind: 'test',
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      title: 'Numere naturale',
      duration_ms: 90000,
      answers: generated.body.cards.map((card, index) => ({
        card_id: card.id,
        answer: index === 0 ? '8' : ''
      }))
    });
    expect(finished.status).toBe(200);
    expect(finished.body.parentNotify.skipped).toBe(false);
    expect(finished.body).not.toMatchObject({ parentViewToken: expect.anything() });

    const token = ensureParentViewToken(`parinte.view.${stamp}@example.com`);
    expect(token).toMatch(/^[a-f0-9]{48}$/i);
    expect(parseAppHash(`#/parinte/${token}`)).toMatchObject({ kind: 'guest', screen: 'parent' });

    const report = await request(app).get(`/api/parent/report?token=${token}`);
    expect(report.status).toBe(200);
    expect(report.body.student.name).toBe('Mara');
    expect(report.body.student.className).toBe('5');
    expect(report.body.tests.length).toBeGreaterThan(0);
    expect(typeof report.body.lastStudy).toBe('string');
    expect(report.body.note).toMatch(/email/i);

    const me = await agent.get('/api/auth/me');
    expect(me.status).toBe(200);
    expect(me.body.user.parentViewToken).toBeUndefined();

    await agent.patch('/api/account/profile').send({ parentEmail: `alt.${stamp}@example.com` });
    const stale = await request(app).get(`/api/parent/report?token=${token}`);
    expect(stale.status).toBe(404);

    const missing = await request(app).get('/api/parent/report?token=nu-exista-token-destul-de-lung-123456');
    expect(missing.status).toBe(404);
  });
});
