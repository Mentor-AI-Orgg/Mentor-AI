import { createRequire } from 'node:module';
import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const deliver = createRequire(import.meta.url)('../backend/src/notify/deliver.js');

describe('profil privat', () => {
  it('lasă locul și punctajul, fără nume sau id, și leagă prietenia prin cod', async () => {
    const { app } = createApp({ autosave: false });
    const ion = await registerGranted(app);
    const ana = await registerGranted(app);
    await ion.agent.post('/api/economy/claim').send({ type: 'login_bonus' });

    const board = await ana.agent.get('/api/leaderboard');
    expect(board.status).toBe(200);
    const hidden = board.body.leaderboard.find(row => row.private);
    expect(hidden).toBeTruthy();
    expect(hidden.name).toBeUndefined();
    expect(hidden.id).toBeUndefined();
    expect(hidden.xp).toBeGreaterThan(0);
    expect(JSON.stringify(hidden)).not.toContain(ion.username);

    const mine = await ion.agent.get('/api/leaderboard');
    const self = mine.body.leaderboard.find(row => row.isCurrentUser);
    expect(self.name).toBe(ion.username);

    const me = await ion.agent.get('/api/friends/me');
    const code = me.body.settings.friendCode;
    expect(code).toMatch(/^[A-HJ-NP-Z2-9]{6}$/);
    const asked = await ana.agent.post('/api/friends/request-code').send({ code });
    expect(asked.status).toBe(201);

    const spy = vi.spyOn(deliver, 'deliverMessage').mockResolvedValue({ mocked: true });
    await ion.agent.patch('/api/friends/settings').send({ profilePrivate: false, acceptFriendRequests: true });
    const body = spy.mock.calls.map(call => call[0]?.body || '').join('\n');
    const link = body.match(/\/api\/parent\/make-private\/([a-f0-9]+)/);
    expect(link).toBeTruthy();
    const back = await request(app).get(`/api/parent/make-private/${link[1]}`);
    expect(back.text).toContain('din nou privat');
    const again = await request(app).get(`/api/parent/make-private/${link[1]}`);
    expect(again.text).toContain('nu mai este valabil');
  });
});
