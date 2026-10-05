import fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const deliver = nodeRequire('../backend/src/notify/deliver.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

describe('profil privat', () => {
  it('lasă locul și punctajul, fără nume sau id, și leagă prietenia prin cod', async () => {
    const { app } = createApp({ autosave: false });
    const ion = await registerGranted(app);
    const ana = await registerGranted(app);
    const ionAccount = authStore.findByUsername(ion.username);
    const user = economy.ensureUser(ionAccount.email, {
      role: 'student',
      username: ion.username
    });
    user.xp = 1000000;

    const board = await ana.agent.get('/api/leaderboard').query({ limit: 50 });
    expect(board.status).toBe(200);
    expect(JSON.stringify(board.body)).not.toContain(ion.username);
    const hidden = board.body.leaderboard.find(row => row.private && row.xp === 1000000);
    expect(hidden).toBeTruthy();
    expect(hidden.name).toBeUndefined();
    expect(hidden.id).toBeUndefined();
    expect(Object.keys(hidden).sort()).toEqual(['private', 'rank', 'xp']);

    const mine = await ion.agent.get('/api/leaderboard').query({ limit: 50 });
    const self = mine.body.leaderboard.find(row => row.isCurrentUser);
    expect(self.name).toBe(ion.username);

    const missed = await ana.agent.get('/api/friends/search').query({ q: ion.username });
    expect(missed.body.results).toEqual([]);
    const byId = await ana.agent.post('/api/friends/request').send({ user_id: friendsPublicId(ionAccount.email) });
    expect(byId.status).toBe(403);

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
    spy.mockRestore();
  });

  it('arată avertismentul, codul și rândul fără nume în interfață', () => {
    const profile = fs.readFileSync('frontend/screens/ProfileScreen.jsx', 'utf8');
    const register = fs.readFileSync('frontend/components/RegisterScreen.jsx', 'utf8');
    const board = fs.readFileSync('frontend/components/Leaderboard.jsx', 'utf8');
    expect(profile).toContain('Am înțeles');
    expect(profile).toContain('Adaugă cu cod');
    expect(profile).toContain('Codul tău de prieten');
    expect(register).toContain('Alege alt nume. Nu folosi numele tău real.');
    expect(board).toContain('Profil privat');
    expect(board).toContain('fa-lock');
    expect(board).toContain('avatarEmoji');
    expect(board).toContain('leaderboard-badge');
  });

  it('pune avatarul și insignele doar pe rândul public', async () => {
    const { app } = createApp({ autosave: false });
    const ion = await registerGranted(app);
    const ana = await registerGranted(app);
    const ionAccount = authStore.findByUsername(ion.username);
    const anaAccount = authStore.findByUsername(ana.username);
    const hiddenUser = economy.ensureUser(ionAccount.email, { role: 'student', username: ion.username });
    hiddenUser.xp = 1000000;
    hiddenUser.equipped.avatar = 'avatar-neon-fox';
    hiddenUser.chapters['matematica:5:numere'] = { status: 'done', grade: '5', chapterId: 'numere' };
    hiddenUser.skillLog = [{ gradeNote: 10, kind: 'test' }];

    const shown = economy.ensureUser(anaAccount.email, { role: 'student', username: ana.username });
    shown.xp = 50;
    shown.equipped.avatar = 'avatar-starlight-owl';
    shown.chapters['romana:6:text'] = { status: 'done', grade: '6', chapterId: 'text' };
    shown.practiceTests['romana:6:text:2026-01-01'] = { score: 4, total: 4 };
    const opened = await ana.agent.patch('/api/friends/settings').send({
      profilePrivate: false,
      acceptFriendRequests: true
    });
    expect(opened.status).toBe(200);

    const board = await ion.agent.get('/api/leaderboard').query({ limit: 50 });
    const pub = board.body.leaderboard.find(row => row.name === ana.username);
    expect(pub.avatarEmoji).toBe('🦉');
    expect(pub.badges.map(badge => badge.id)).toEqual(['capitol', 'nota-10']);
    expect(pub.badges.map(badge => badge.label)).toEqual(['Capitol terminat', 'Nota 10']);
    expect(pub.school).toBeUndefined();
    expect(JSON.stringify(pub)).not.toContain(anaAccount.profile?.parentEmail || 'parinte');

    const hiddenBoard = await ana.agent.get('/api/leaderboard').query({ limit: 50 });
    const hidden = hiddenBoard.body.leaderboard.find(row => row.private && row.xp === 1000000);
    expect(Object.keys(hidden).sort()).toEqual(['private', 'rank', 'xp']);
    expect(JSON.stringify(hiddenBoard.body)).not.toContain(ion.username);
    expect(JSON.stringify(hiddenBoard.body)).not.toContain('🦊');
  });
});

function friendsPublicId(email) {
  const crypto = nodeRequire('node:crypto');
  return crypto.createHash('sha256').update(String(email).trim().toLowerCase()).digest('hex').slice(0, 12);
}
