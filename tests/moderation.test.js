import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PREVIEW_COOKIE, previewToken } from '../backend/src/middleware/comingSoon.js';
import { PASSWORD, registerGranted, uniqueUsername } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const deliver = nodeRequire('../backend/src/notify/deliver.js');
const moderation = nodeRequire('../backend/src/data/moderationStore.js');

async function publicIdOf(agent) {
  const me = await agent.get('/api/friends/me');
  return me.body.id || '';
}

describe('raportare și moderare', () => {
  const previous = {
    PREVIEW_PASSWORD: process.env.PREVIEW_PASSWORD,
    PREVIEW_COOKIE_SECRET: process.env.PREVIEW_COOKIE_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL
  };

  afterEach(() => {
    moderation.resetAlerts();
    if (previous.PREVIEW_PASSWORD === undefined) delete process.env.PREVIEW_PASSWORD;
    else process.env.PREVIEW_PASSWORD = previous.PREVIEW_PASSWORD;
    if (previous.PREVIEW_COOKIE_SECRET === undefined) delete process.env.PREVIEW_COOKIE_SECRET;
    else process.env.PREVIEW_COOKIE_SECRET = previous.PREVIEW_COOKIE_SECRET;
    if (previous.ADMIN_EMAIL === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = previous.ADMIN_EMAIL;
  });

  it('cere logare la clasament, motive permise, blocare reciprocă și jurnal de creator', async () => {
    process.env.PREVIEW_PASSWORD = 'mod-secret';
    process.env.PREVIEW_COOKIE_SECRET = 'mod-cookie-secret-val';
    process.env.ADMIN_EMAIL = 'admin@example.com';
    const spy = vi.spyOn(deliver, 'deliverMessage').mockResolvedValue({ delivered: true, mocked: true });
    const { app } = createApp({ autosave: false });
    const anon = await request(app).get('/api/leaderboard');
    expect(anon.status).toBe(401);

    const reporter = await registerGranted(app, { username: uniqueUsername('vulpe') });
    const target = await registerGranted(app, { username: uniqueUsername('iepure') });
    const targetId = await publicIdOf(target.agent);
    expect(targetId).toBeTruthy();

    const bad = await reporter.agent.post('/api/friends/report').send({ user_id: targetId, reason: 'gluma' });
    expect(bad.status).toBe(400);

    const report = await reporter.agent.post('/api/friends/report').send({
      user_id: targetId,
      reason: 'nume_nepotrivit'
    });
    expect(report.status).toBe(201);
    expect(report.body.message).toBe('Mulțumim! Un adult va verifica.');

    const again = await reporter.agent.post('/api/friends/report').send({
      user_id: targetId,
      reason: 'ma_deranjeaza'
    });
    expect(again.status).toBe(201);
    const adminMails = spy.mock.calls.filter(call => call[0]?.to === 'admin@example.com');
    expect(adminMails).toHaveLength(1);

    const targetMe = await target.agent.get('/api/friends/me');
    const asked = await reporter.agent.post('/api/friends/request-code').send({ code: targetMe.body.settings.friendCode });
    expect(asked.status).toBe(201);
    const inbox = await target.agent.get('/api/friends/me');
    const requestId = inbox.body.incoming[0].id;
    expect((await target.agent.post('/api/friends/respond').send({ request_id: requestId, action: 'accept' })).status).toBe(200);

    expect((await reporter.agent.post('/api/friends/block').send({ user_id: targetId })).status).toBe(200);
    const reporterFriends = await reporter.agent.get('/api/friends/me');
    const targetFriends = await target.agent.get('/api/friends/me');
    expect(reporterFriends.body.friends.some(person => person.id === targetId)).toBe(false);
    expect(targetFriends.body.friends.some(person => person.username === reporter.username)).toBe(false);
    const hidden = await target.agent.get('/api/friends/search').query({ q: reporter.username });
    expect(hidden.body.results).toHaveLength(0);

    const forbidden = await request(app).get('/api/moderation/reports');
    expect(forbidden.status).toBe(403);

    const creator = request(app);
    const cookie = `${PREVIEW_COOKIE}=${previewToken()}`;
    const open = await creator.get('/api/moderation/reports').set('Cookie', cookie);
    expect(open.status).toBe(200);
    const reportId = open.body.reports.find(item => item.target === targetId)?.id;
    expect(reportId).toBeTruthy();

    expect((await creator.post(`/api/moderation/reports/${reportId}/rename`).set('Cookie', cookie)).status).toBe(200);
    const needsName = await target.agent.get('/api/friends/me');
    expect(needsName.status).toBe(409);
    expect(needsName.body.code).toBe('username_required');
    const renamed = await target.agent.post('/api/account/rename').send({ username: uniqueUsername('nou') });
    expect(renamed.status).toBe(200);
    expect(renamed.body.user.mustRename).toBe(false);

    expect((await creator.post(`/api/moderation/reports/${reportId}/hide`).set('Cookie', cookie)).status).toBe(200);
    expect((await creator.post(`/api/moderation/reports/${reportId}/suspend`).set('Cookie', cookie)).status).toBe(200);
    expect((await creator.post(`/api/moderation/reports/${reportId}/close`).set('Cookie', cookie)).status).toBe(200);

    const after = await creator.get('/api/moderation/reports').set('Cookie', cookie);
    const actions = after.body.log.filter(item => item.reportId === reportId).map(item => item.action);
    expect(actions).toEqual(expect.arrayContaining(['nume', 'ascunde', 'suspenda', 'inchide']));
    expect(JSON.stringify(after.body.log)).not.toContain(target.parentEmail);

    const parentMails = spy.mock.calls.filter(call => call[0]?.to === target.parentEmail);
    expect(parentMails.length).toBeGreaterThan(0);
    expect(parentMails.some(call => String(call[0].body).includes('nume') || String(call[0].body).includes('suspendat'))).toBe(true);

    const suspended = await target.agent.get('/api/friends/me');
    expect(suspended.status).toBe(403);
    expect(suspended.body.code).toBe('suspended');

    spy.mockRestore();
  });

  it('anonimizează rapoartele făcute de un cont șters', async () => {
    process.env.PREVIEW_PASSWORD = 'mod-secret';
    process.env.PREVIEW_COOKIE_SECRET = 'mod-cookie-secret-val';
    const { app } = createApp({ autosave: false });
    const reporter = await registerGranted(app, { username: uniqueUsername('bufnita') });
    const target = await registerGranted(app, { username: uniqueUsername('arici') });
    const targetId = await publicIdOf(target.agent);
    const report = await reporter.agent.post('/api/friends/report').send({
      user_id: targetId,
      reason: 'altceva',
      note: 'ma deranjeaza'
    });
    expect(report.status).toBe(201);
    const exported = await reporter.agent.get('/api/account/export');
    expect(exported.body.moderare.rapoarte.some(item => item.reason === 'altceva')).toBe(true);

    const removed = await reporter.agent.delete('/api/account').send({ confirm: 'ȘTERGE', password: PASSWORD });
    expect(removed.status).toBe(200);

    const cookie = `${PREVIEW_COOKIE}=${previewToken()}`;
    const open = await request(app).get('/api/moderation/reports').set('Cookie', cookie);
    const kept = open.body.reports.find(item => item.id === report.body.reportId);
    expect(kept).toBeTruthy();
    expect(kept.reporter).toBe('anonim');
    expect(JSON.stringify(kept)).not.toContain(reporter.username);
  });
});
