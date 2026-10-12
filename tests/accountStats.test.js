import { createRequire } from 'node:module';
import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PREVIEW_COOKIE, previewToken } from '../backend/src/middleware/comingSoon.js';
import { PASSWORD, registerGranted, uniqueUsername } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const { accountStats, startOfBucharestDay } = nodeRequire('../backend/src/ops/accountStats.js');
const { findByUsername, touchLastActive, ACTIVE_TOUCH_MS } = nodeRequire(
  '../backend/src/data/authStore.js'
);

const SUMMER = Date.parse('2026-07-15T21:30:00.000Z');
const BANNED_KEYS = ['email', 'username', 'name', 'phone', 'parentEmail', 'passwordHash'];

function keysOf(value, out = []) {
  if (!value || typeof value !== 'object') return out;
  for (const [key, child] of Object.entries(value)) {
    out.push(key);
    keysOf(child, out);
  }
  return out;
}

describe('numerele de conturi', () => {
  it('ține miezul nopții din București, vara și iarna', () => {
    expect(new Date(startOfBucharestDay(SUMMER, 0)).toISOString()).toBe('2026-07-15T21:00:00.000Z');
    expect(new Date(startOfBucharestDay(SUMMER, 6)).toISOString()).toBe('2026-07-09T21:00:00.000Z');
    const winter = Date.parse('2026-01-15T22:30:00.000Z');
    expect(new Date(startOfBucharestDay(winter, 0)).toISOString()).toBe('2026-01-15T22:00:00.000Z');
    const change = Date.parse('2026-10-25T00:30:00.000Z');
    expect(new Date(startOfBucharestDay(change, 0)).toISOString()).toBe('2026-10-24T21:00:00.000Z');
  });

  it('numără conturi unice, fără cele șterse, pe zilele din București', () => {
    const stats = accountStats(
      [
        {
          email: 'A@elev.invalid',
          role: 'student',
          createdAt: '2026-01-01T00:00:00.000Z',
          lastLoginAt: '2026-07-15T21:10:00.000Z',
          profile: { username: 'Ana', parentEmail: 'parinte@example.com' }
        },
        {
          email: 'a@elev.invalid',
          role: 'student',
          createdAt: '2026-06-01T00:00:00.000Z',
          lastActiveAt: '2026-07-10T00:00:00.000Z'
        },
        {
          email: 'gone@elev.invalid',
          role: 'student',
          deletedAt: '2026-07-01T00:00:00.000Z',
          createdAt: '2026-01-01T00:00:00.000Z',
          lastLoginAt: '2026-07-15T21:10:00.000Z'
        },
        {
          email: 'p@example.com',
          role: 'parent',
          createdAt: '2026-07-15T21:10:00.000Z'
        },
        {
          email: 't@example.com',
          role: 'teacher',
          createdAt: '2026-07-01T00:00:00.000Z',
          lastLoginAt: '2026-07-14T12:00:00.000Z'
        }
      ],
      SUMMER
    );

    expect(stats.total).toBe(3);
    expect(stats.students).toBe(1);
    expect(stats.parents).toBe(1);
    expect(stats.other).toBe(1);
    expect(stats.newAccounts).toEqual({ today: 1, days7: 1, days30: 2 });
    expect(stats.active).toEqual({ today: 1, days7: 2, days30: 2 });
    expect(stats.returning).toBe(2);
    expect(stats.retention).toEqual({ cohort: 2, active: 2, percent: 100 });
    expect(keysOf(stats).some((key) => BANNED_KEYS.includes(key))).toBe(false);
    expect(JSON.stringify(stats)).not.toMatch(/Ana|parinte@example.com|gone@elev/);
  });

  it('reținerea e goală când nimeni nu are 7 zile, iar revenirea cere mai mult de o zi', () => {
    const fresh = accountStats(
      [
        {
          email: 'nou@elev.invalid',
          role: 'student',
          createdAt: new Date(SUMMER - 20 * 60 * 60 * 1000).toISOString(),
          lastActiveAt: new Date(SUMMER).toISOString()
        }
      ],
      SUMMER
    );
    expect(fresh.returning).toBe(0);
    expect(fresh.retention).toEqual({ cohort: 0, active: 0, percent: null });

    const back = accountStats(
      [
        {
          email: 'vechi@elev.invalid',
          role: 'student',
          createdAt: new Date(SUMMER - 25 * 60 * 60 * 1000).toISOString(),
          lastLoginAt: new Date(SUMMER).toISOString()
        },
        { email: 'plecat@elev.invalid', role: 'student', createdAt: '2026-01-01T00:00:00.000Z' }
      ],
      SUMMER
    );
    expect(back.returning).toBe(1);
    expect(back.retention).toEqual({ cohort: 1, active: 0, percent: 0 });
  });

  it('notează activitatea cel mult o dată pe oră', () => {
    const account = { lastActiveAt: '' };
    expect(touchLastActive(account, 1_000)).toBe(true);
    expect(touchLastActive(account, 1_000 + ACTIVE_TOUCH_MS - 1)).toBe(false);
    expect(account.lastActiveAt).toBe(new Date(1_000).toISOString());
    expect(touchLastActive(account, 1_000 + ACTIVE_TOUCH_MS)).toBe(true);
    expect(account.lastActiveAt).toBe(new Date(1_000 + ACTIVE_TOUCH_MS).toISOString());
  });
});

describe('GET /api/admin/stats', () => {
  const previous = {
    PREVIEW_PASSWORD: process.env.PREVIEW_PASSWORD,
    PREVIEW_COOKIE_SECRET: process.env.PREVIEW_COOKIE_SECRET
  };

  afterEach(() => {
    if (previous.PREVIEW_PASSWORD === undefined) delete process.env.PREVIEW_PASSWORD;
    else process.env.PREVIEW_PASSWORD = previous.PREVIEW_PASSWORD;
    if (previous.PREVIEW_COOKIE_SECRET === undefined) delete process.env.PREVIEW_COOKIE_SECRET;
    else process.env.PREVIEW_COOKIE_SECRET = previous.PREVIEW_COOKIE_SECRET;
  });

  it('răspunde 403 fără cookie de creator și nu publică date personale', async () => {
    process.env.PREVIEW_PASSWORD = 'stats-secret';
    process.env.PREVIEW_COOKIE_SECRET = 'stats-cookie-secret';
    const { app } = createApp({ autosave: false });
    const closed = await request(app).get('/api/admin/stats');
    expect(closed.status).toBe(403);
    expect(closed.body.code).toBe('creator_required');

    const created = await registerGranted(app, { username: uniqueUsername('stat') });
    expect(created.res.status).toBe(201);
    const studentOnly = await created.agent.get('/api/admin/stats');
    expect(studentOnly.status).toBe(403);

    const byName = findByUsername(created.username);
    expect(byName.lastActiveAt).toBeTruthy();
    const stale = new Date(Date.now() - ACTIVE_TOUCH_MS - 1000).toISOString();
    byName.lastActiveAt = stale;
    const touched = await created.agent.get('/api/auth/me');
    expect(touched.status).toBe(200);
    expect(Date.parse(byName.lastActiveAt)).toBeGreaterThan(Date.parse(stale));
    const again = byName.lastActiveAt;
    await created.agent.get('/api/auth/me');
    expect(byName.lastActiveAt).toBe(again);

    const cookie = `${PREVIEW_COOKIE}=${previewToken()}`;
    const open = await request(app).get('/api/admin/stats').set('Cookie', cookie);
    expect(open.status).toBe(200);
    expect(open.headers['cache-control']).toMatch(/no-store/);
    expect(open.body.students).toBeGreaterThanOrEqual(1);
    expect(open.body.parents).toBeGreaterThanOrEqual(1);
    expect(keysOf(open.body).some((key) => BANNED_KEYS.includes(key))).toBe(false);
    expect(JSON.stringify(open.body)).not.toContain(created.username);
    expect(JSON.stringify(open.body)).not.toContain(created.parentEmail);
    expect(open.body.activityNote).toMatch(/de acum/);

    const removed = await created.agent
      .delete('/api/account')
      .send({ confirm: 'ȘTERGE', password: PASSWORD });
    expect(removed.status).toBe(200);
    const after = await request(app).get('/api/admin/stats').set('Cookie', cookie);
    expect(after.body.students).toBe(open.body.students - 1);
    expect(after.body.parents).toBe(open.body.parents - 1);
    expect(after.body.total).toBe(open.body.total - 2);
  });
});
