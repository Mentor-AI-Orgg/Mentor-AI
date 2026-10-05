import { afterEach, describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const quota = nodeRequire('../backend/src/safety/tutorQuota.js');

describe('limita de întrebări către tutore', () => {
  afterEach(() => {
    quota.resetTutorQuota();
    delete process.env.ENFORCE_TUTOR_LIMIT;
  });

  it('ține 10 pe minut și 60 pe oră, apoi lasă contul să continue', () => {
    const start = Date.parse('2026-10-05T10:00:00Z');
    const key = 'cont:copil@example.com';
    for (let i = 0; i < quota.TUTOR_PER_HOUR; i += 1) {
      const now = start + Math.floor(i / quota.TUTOR_PER_MINUTE) * (quota.MINUTE_MS + 1000);
      const hit = quota.takeTutorQuestion(key, now);
      expect(hit.ok).toBe(true);
    }
    const blockedMinute = quota.takeTutorQuestion(key, start);
    expect(blockedMinute.ok).toBe(false);
    expect(blockedMinute.message).toBe('Încearcă din nou peste un minut.');

    quota.resetTutorQuota();
    for (let i = 0; i < quota.TUTOR_PER_HOUR; i += 1) {
      const now = start + Math.floor(i / quota.TUTOR_PER_MINUTE) * (quota.MINUTE_MS + 1000);
      expect(quota.takeTutorQuestion(key, now).ok).toBe(true);
    }
    const nextMinute = start + 6 * (quota.MINUTE_MS + 1000);
    const blockedHour = quota.takeTutorQuestion(key, nextMinute);
    expect(blockedHour.ok).toBe(false);
    expect(blockedHour.scope).toBe('hour');
    expect(blockedHour.message).toBe('Încearcă din nou peste o oră.');

    const afterHour = quota.takeTutorQuestion(key, nextMinute + quota.HOUR_MS);
    expect(afterHour.ok).toBe(true);
  });

  it('oprește a 11-a întrebare pe chat și pe lecție, fără să închidă contul', async () => {
    process.env.ENFORCE_TUTOR_LIMIT = '1';
    const { app } = createApp({ autosave: false });
    const first = await registerGranted(app);
    const second = await registerGranted(app);
    expect(first.res.status).toBe(201);
    expect(second.res.status).toBe(201);

    for (let n = 0; n < quota.TUTOR_PER_MINUTE; n += 1) {
      const res = await first.agent.post('/api/chat').send({
        message: `Ce este o fracție? întrebarea ${n}`,
        subject: 'matematica',
        class_level: '5'
      });
      expect(res.status).toBe(200);
    }

    const blocked = await first.agent.post('/api/v1/chat').send({
      message: 'Mai am o întrebare la lecție despre fracții.',
      subject: 'matematica',
      class_level: '5'
    });
    expect(blocked.status).toBe(429);
    expect(blocked.body).toEqual(expect.objectContaining({
      error: 'Încearcă din nou peste un minut.',
      code: 'rate_limited'
    }));
    expect(blocked.body.error).not.toMatch(/blocat|suspendat|permanent/i);

    const crisis = await first.agent.post('/api/chat').send({ message: 'sunt abuzat' });
    expect(crisis.status).toBe(200);
    expect(crisis.body.engine_used).toBe('crisis_help');
    expect(crisis.body.response).toMatch(/116/);

    const other = await second.agent.post('/api/chat').send({
      message: 'Ce este un număr prim?',
      subject: 'matematica',
      class_level: '6'
    });
    expect(other.status).toBe(200);

    const me = await first.agent.get('/api/auth/me');
    expect(me.status).toBe(200);
  });
});
