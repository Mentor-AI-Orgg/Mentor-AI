import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PASSWORD, registerGranted, registerPending, uniqueEmail } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const persistence = nodeRequire('../backend/src/data/persistence.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const consentStore = nodeRequire('../backend/src/data/consentStore.js');
const pendingCleanup = nodeRequire('../backend/src/data/pendingCleanup.js');
const { deliverMessage } = nodeRequire('../backend/src/notify/deliver.js');

const DAY = 24 * 60 * 60 * 1000;
const LIMITED = 'Am trimis deja emailul. Roagă-ți părintele să verifice și în Spam.';

function hashToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

function savedText() {
  persistence.saveNow();
  return fs.readFileSync(persistence.DATA_FILE, 'utf8');
}

describe('acordul părintelui', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('creează contul fără datele personale trimise în plus', async () => {
    const { app } = createApp({ autosave: false });
    const planted = {
      name: 'NumeTainicXz',
      phone: '0700000099',
      email: 'copil-tainic-xz@example.com',
      school: 'ScoalaTainicaXz'
    };
    const created = await registerPending(app, planted);
    expect(created.res.status).toBe(201);
    expect(created.res.body.user.consent).toBe('pending');
    expect(created.res.body.user.email).toBe('');
    expect(created.res.body.user.username).toBe(created.username);

    const account = authStore.findByUsername(created.username);
    expect(account.email.endsWith('@elev.invalid')).toBe(true);
    expect(account.profile.name).toBe('');
    expect(account.profile.phone).toBe('');
    expect(account.profile.school).toBe('');
    const raw = savedText();
    for (const value of Object.values(planted)) {
      expect(raw).not.toContain(value);
    }
  });

  it('lasă lecțiile și exercițiile și oprește prietenii, clasamentul, memoria și fotografiile', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerPending(app);
    expect(created.res.status).toBe(201);
    const { agent } = created;

    const friends = await agent.get('/api/friends/me');
    expect(friends.status).toBe(403);
    expect(friends.body.error).toBe('consent_pending');

    const board = await agent.get('/api/leaderboard');
    expect(board.status).toBe(403);
    expect(board.body.error).toBe('consent_pending');

    const chat = await agent.post('/api/chat').send({ message: 'Ce este o fracție?' });
    expect(chat.status).toBe(403);
    expect(chat.body.error).toBe('consent_pending');

    const photos = await agent.get('/api/curriculum/en/photo-quota');
    expect(photos.status).toBe(403);
    expect(photos.body.error).toBe('consent_pending');

    const lessons = await agent.get('/api/curriculum').query({ subject: 'matematica', class_level: 5 });
    expect(lessons.status).toBe(200);

    const practice = await agent.post('/api/flashcards/generate').send({
      chapter_id: 'fractii',
      subject: 'matematica',
      class_level: 5,
      kind: 'test',
      count: 3
    });
    expect(practice.status).toBe(200);

    const progress = await agent.get('/api/economy/summary');
    expect(progress.status).toBe(200);

    const crisis = await agent.post('/api/chat').send({ message: 'sunt abuzat' });
    expect(crisis.status).toBe(200);
    expect(crisis.body.response).toContain('116 111');
    expect(crisis.body.response).toContain('112');
  });

  it('confirmă doar prin POST, păstrează tokenul ca hash și refuzul șterge contul', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerPending(app);
    const account = authStore.findByUsername(created.username);
    const raw = savedText();
    expect(raw).not.toContain(created.token);
    expect(raw).toContain(hashToken(created.token));

    const peek = await request(app).get(`/api/auth/consent/${created.token}`);
    expect(peek.status).toBe(200);
    expect(authStore.findAccount(account.email).consent.status).toBe('pending');

    const grant = await request(app).post('/api/auth/consent').send({
      token: created.token,
      action: 'grant'
    });
    expect(grant.status).toBe(200);
    const granted = authStore.findByUsername(created.username);
    expect(granted.consent.status).toBe('granted');
    expect(granted.consent.at).toBeTruthy();
    expect(granted.consent.policyVersion).toBe(consentStore.POLICY_VERSION);
    expect(granted.consent.method).toBe('email-link');
    expect(granted.consent.parentEmailHash).toBeTruthy();
    expect(granted.consent.ip).toBeUndefined();
    expect(authStore.findAccount(created.parentEmail).role).toBe('parent');

    const again = await request(app).post('/api/auth/consent').send({
      token: created.token,
      action: 'grant'
    });
    expect(again.status).toBe(400);

    const refused = await registerPending(app);
    const refusedAccount = authStore.findByUsername(refused.username);
    const refusal = await request(app).post('/api/auth/consent').send({
      token: refused.token,
      action: 'refuse'
    });
    expect(refusal.status).toBe(200);
    expect(refusal.body.deleted).toBe(true);
    expect(authStore.findAccount(refusedAccount.email)).toBeNull();
    const login = await request(app).post('/api/auth/login').send({
      email: refused.username,
      password: PASSWORD
    });
    expect(login.status).toBe(401);
  });

  it('respinge linkul de confirmare după 7 zile', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerPending(app);
    const start = Date.now();
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(start + 7 * DAY + 1000);
    const late = await request(app).post('/api/auth/consent').send({
      token: created.token,
      action: 'grant'
    });
    expect(late.status).toBe(400);
    expect(authStore.findByUsername(created.username).consent.status).toBe('pending');
  });

  it('limitează retrimiterile la 3 pe cont și la 5 pe adresă', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerPending(app);
    for (let n = 0; n < 3; n += 1) {
      const resend = await created.agent.post('/api/auth/consent/resend');
      expect(resend.status).toBe(200);
      expect(resend.body.sent).toBe(true);
    }
    const blocked = await created.agent.post('/api/auth/consent/resend');
    expect(blocked.status).toBe(429);
    expect(blocked.body.error).toBe(LIMITED);

    const parentEmail = uniqueEmail('aceeasi');
    const made = [];
    for (let n = 0; n < 5; n += 1) {
      const one = await registerPending(app, { parentEmail });
      expect(one.res.status).toBe(201);
      expect(one.token).toBeTruthy();
      made.push(one);
    }
    const sixth = await registerPending(app, { parentEmail });
    expect(sixth.res.status).toBe(201);
    expect(sixth.token).toBe('');
    expect(sixth.res.body.parentNotified).toBe(false);
    expect(sixth.res.body.confirmationMessage).toBe(LIMITED);
    expect(made).toHaveLength(5);
  });

  it('refuză trimiterea către adresa internă a copilului', async () => {
    const result = await deliverMessage({
      to: 'u-abc@elev.invalid',
      subject: 'Nu pleca',
      body: 'nimic',
      channel: 'email'
    });
    expect(result.refused).toBe(true);
    expect(result.delivered).toBe(false);
    expect(result.reason).toBe('elev_invalid');
  });

  it('dă același răspuns la linkul magic și ține sesiunile separate', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    expect(created.confirm.status).toBe(200);

    const logs = [];
    const original = console.log;
    console.log = (...args) => {
      logs.push(args.map(item => String(item)).join(' '));
    };
    let known;
    let unknown;
    try {
      known = await request(app).post('/api/parent/magic').send({ email: created.parentEmail });
      unknown = await request(app).post('/api/parent/magic').send({ email: uniqueEmail('nimeni') });
    } finally {
      console.log = original;
    }
    expect(known.status).toBe(unknown.status);
    expect(known.body).toEqual(unknown.body);

    const token = (logs.join('\n').match(/#\/parinte\/([a-f0-9]+)/) || [])[1];
    expect(token).toBeTruthy();
    const parentAgent = request.agent(app);
    const consume = await parentAgent.post('/api/parent/magic/consume').send({ token });
    expect(consume.status).toBe(200);
    expect(String(consume.headers['set-cookie'])).toMatch(/s10_parent=/);
    expect(String(consume.headers['set-cookie']).toLowerCase()).toContain('httponly');

    const parentOnChild = await parentAgent.get('/api/auth/me');
    expect(parentOnChild.status).toBe(401);
    const parentFriends = await parentAgent.get('/api/friends/me');
    expect(parentFriends.status).toBe(401);

    const childOnParent = await created.agent.get('/api/parent/me');
    expect(childOnParent.status).toBe(401);
    const zone = await parentAgent.get('/api/parent/me');
    expect(zone.status).toBe(200);
    expect(zone.body.children[0].username).toBe(created.username);

    const lateLogs = [];
    console.log = (...args) => {
      lateLogs.push(args.map(item => String(item)).join(' '));
    };
    try {
      await request(app).post('/api/parent/magic').send({ email: created.parentEmail });
    } finally {
      console.log = original;
    }
    const lateToken = (lateLogs.join('\n').match(/#\/parinte\/([a-f0-9]+)/) || [])[1];
    expect(lateToken).toBeTruthy();
    const start = Date.now();
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(start + 15 * 60 * 1000 + 1000);
    const late = await request(app).post('/api/parent/magic/consume').send({ token: lateToken });
    expect(late.status).toBe(400);
  });

  it('trece contul vechi în așteptare și șterge telefonul, numele real și școala', async () => {
    const { app } = createApp({ autosave: false });
    const parentEmail = uniqueEmail('vechi');
    const legacy = await authStore.createAccount({
      email: uniqueEmail('copilvechi'),
      password: PASSWORD,
      role: 'student',
      profile: {
        name: 'Ion Popescu',
        phone: '0712345678',
        school: 'Scoala Veche',
        username: 'ionvechi',
        parentEmail,
        class: '7'
      }
    });
    expect(legacy.ok).toBe(true);

    const untouched = await authStore.createAccount({
      email: uniqueEmail('doarstrip'),
      password: PASSWORD,
      role: 'student',
      profile: {
        name: 'Maria Ionescu',
        phone: '0722222222',
        school: 'Scoala Alta',
        username: 'mariaveche',
        parentEmail,
        class: '6'
      }
    });
    authStore.migrateLegacyProfiles();
    const stripped = authStore.findAccount(untouched.account.email);
    expect(stripped.profile.name).toBe('');
    expect(stripped.profile.phone).toBe('');
    expect(stripped.profile.school).toBe('');
    expect(stripped.profile.username).toBe('mariaveche');
    expect(stripped.email).toBe(untouched.account.email);

    const login = await request(app).post('/api/auth/login').send({
      email: 'ionvechi',
      password: PASSWORD
    });
    expect(login.status).toBe(200);
    expect(login.body.user.consent).toBe('pending');
    const after = authStore.findAccount(legacy.account.email);
    expect(after.profile.name).toBe('');
    expect(after.profile.phone).toBe('');
    expect(after.profile.school).toBe('');
    expect(after.email).toBe(legacy.account.email);
  });

  it('șterge conturile pending mai vechi de 14 zile și le păstrează pe cele confirmate', async () => {
    const { app } = createApp({ autosave: false });
    const stale = await registerPending(app);
    const fresh = await registerPending(app);
    const kept = await registerGranted(app);
    const staleAccount = authStore.findByUsername(stale.username);
    const freshAccount = authStore.findByUsername(fresh.username);
    const keptAccount = authStore.findByUsername(kept.username);
    staleAccount.consent.requestedAt = new Date(Date.now() - 15 * DAY).toISOString();
    keptAccount.consent.requestedAt = new Date(Date.now() - 40 * DAY).toISOString();

    const removed = pendingCleanup.runPendingCleanup();
    expect(removed).toContain(staleAccount.email);
    expect(authStore.findAccount(staleAccount.email)).toBeNull();
    expect(authStore.findAccount(freshAccount.email)).toBeTruthy();
    expect(authStore.findByUsername(kept.username).consent.status).toBe('granted');
  });
});
