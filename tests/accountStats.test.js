import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PREVIEW_COOKIE, previewToken } from '../backend/src/middleware/comingSoon.js';
import { PASSWORD, registerGranted, uniqueUsername } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const { accountStats, startOfBucharestDay, xpLeaderboard, XP_BOARD_LIMIT } = nodeRequire(
  '../backend/src/ops/accountStats.js'
);
const { findByUsername, touchLastActive, ACTIVE_TOUCH_MS } = nodeRequire(
  '../backend/src/data/authStore.js'
);
const { getUser } = nodeRequire('../backend/src/data/economyStore.js');

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

  it('dă primii 100 de elevi după XP, fără email și fără părinte', () => {
    const students = Array.from({ length: XP_BOARD_LIMIT + 1 }, (_, index) => ({
      email: `e${index}@elev.invalid`,
      role: 'student',
      createdAt: '2026-01-01T00:00:00.000Z',
      profile: {
        username: `elev${String(index).padStart(3, '0')}`,
        parentEmail: 'parinte@example.com'
      },
      lastActiveAt: index === 3 ? '' : '2026-07-10T00:00:00.000Z',
      lastLoginAt: '2026-07-12T00:00:00.000Z'
    }));
    students.push(
      {
        email: 'parinte@example.com',
        role: 'parent',
        profile: { username: 'parintele' },
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        email: 'sters@elev.invalid',
        role: 'student',
        deletedAt: '2026-02-01T00:00:00.000Z',
        profile: { username: 'sters' },
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        email: 'fara@elev.invalid',
        role: 'student',
        profile: { username: '', name: 'Mara', parentEmail: 'alt@example.com' },
        createdAt: '2026-01-02T00:00:00.000Z',
        lastActiveAt: '2026-07-10T00:00:00.000Z'
      }
    );
    const xp = Object.fromEntries(students.map((account) => [account.email, 0]));
    students.forEach((account, index) => {
      if (account.role === 'student' && !account.deletedAt && account.email.startsWith('e')) {
        xp[account.email] = index;
      }
    });
    xp['fara@elev.invalid'] = 501;
    xp['parinte@example.com'] = 9000;
    xp['sters@elev.invalid'] = 9000;
    const board = xpLeaderboard(students, (email) => xp[email] || 0);
    expect(board.xpLeaderboard).toHaveLength(XP_BOARD_LIMIT);
    expect(board.xpLeaderboard[0]).toMatchObject({ rank: 1, nickname: 'Mara', xp: 501 });
    expect(
      board.xpLeaderboard.some((row) => row.nickname === 'elev000' || row.nickname === 'elev001')
    ).toBe(false);
    expect(
      board.xpLeaderboard.some((row) => row.nickname === 'parintele' || row.nickname === 'sters')
    ).toBe(false);
    expect(board.xpSummary).toEqual({ over0: 101, over100: 1, over500: 1 });
    expect(board.xpLeaderboard.find((row) => row.nickname === 'elev003').lastActiveAt).toBeNull();
    expect(board.xpLeaderboard.find((row) => row.nickname === 'elev004').lastActiveAt).toBe(
      '2026-07-10T00:00:00.000Z'
    );
    const dumped = JSON.stringify(board);
    expect(dumped).not.toMatch(/@|parinte|password/);
    expect(keysOf(board).some((key) => BANNED_KEYS.includes(key))).toBe(false);
    expect(
      readFileSync(new URL('../frontend/components/Leaderboard.jsx', import.meta.url), 'utf8')
    ).toContain('limit: 8');
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
    expect(JSON.stringify(open.body)).not.toContain(created.parentEmail);
    expect(JSON.stringify(open.body)).not.toContain(byName.email);
    const listed = open.body.xpLeaderboard.find((row) => row.nickname === created.username);
    expect(listed).toMatchObject({ xp: 0, lastActiveAt: byName.lastActiveAt });
    expect(listed.rank).toBeGreaterThan(0);
    expect(open.body.xpSummary.over500).toEqual(expect.any(Number));
    const user = getUser(byName.email);
    user.xp = 0;
    user.coinsEarned = 40;
    user.metrics.streak = 2;
    const scored = await request(app).get('/api/admin/stats').set('Cookie', cookie);
    const row = scored.body.xpLeaderboard.find((item) => item.nickname === created.username);
    expect(row.xp).toBe(60);
    expect(scored.body.xpSummary.over0).toBe(open.body.xpSummary.over0 + 1);
    expect(scored.body.xpSummary.over100).toBe(open.body.xpSummary.over100);
    user.xp = 550;
    const high = await request(app).get('/api/admin/stats').set('Cookie', cookie);
    expect(high.body.xpLeaderboard.find((item) => item.nickname === created.username).xp).toBe(550);
    expect(high.body.xpSummary.over500).toBe(scored.body.xpSummary.over500 + 1);
    expect(high.body.xpSummary.over100).toBe(scored.body.xpSummary.over100 + 1);
    expect(JSON.stringify(high.body)).not.toContain(created.parentEmail);
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
