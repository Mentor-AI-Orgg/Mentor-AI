import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PASSWORD, registerGranted, registerPending } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const persistence = nodeRequire('../backend/src/data/persistence.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const consentStore = nodeRequire('../backend/src/data/consentStore.js');
const memory = nodeRequire('../backend/src/memory/memoryStore.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');
const registry = nodeRequire('../backend/src/data/userDataRegistry.js');
const retention = nodeRequire('../backend/src/config/retention.js');
const { runRetention } = nodeRequire('../backend/src/data/retentionJob.js');
const { eraseAccount } = nodeRequire('../backend/src/routes/account.js');
const { crisisCount, bumpCrisis } = nodeRequire('../backend/src/safety/crisisCounter.js');
const deliver = nodeRequire('../backend/src/notify/deliver.js');

const DAY = retention.DAY_MS;

function wordUsername() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let out = 'zmeucopil';
  for (let i = 0; i < 6; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

function userHash(email) {
  return crypto.createHash('sha256').update(String(email).trim().toLowerCase()).digest('hex');
}

async function parentAgent(app, parentEmail) {
  const logs = [];
  const original = console.log;
  console.log = (...args) => logs.push(args.map(item => String(item)).join(' '));
  try {
    await request(app).post('/api/parent/magic').send({ email: parentEmail });
  } finally {
    console.log = original;
  }
  const token = (logs.join('\n').match(/#\/parinte\/([a-f0-9]+)/) || [])[1];
  const agent = request.agent(app);
  const consume = await agent.post('/api/parent/magic/consume').send({ token });
  return { agent, consume, token };
}

describe('export, ștergere și păstrare', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('exportă datele din fiecare store și le șterge din fișier', async () => {
    const { app } = createApp({ autosave: false });
    const username = wordUsername();
    const phrase = `zmeucaprioara ${username.slice(0, 4)}`;
    const created = await registerGranted(app, { username });
    expect(created.res.status).toBe(201);
    const account = authStore.findByUsername(username);
    const email = account.email;
    const friend = await registerGranted(app);
    const stranger = await registerGranted(app);

    const search = await created.agent.get('/api/friends/search').query({ q: friend.username });
    expect(search.status).toBe(200);
    const sent = await created.agent.post('/api/friends/request').send({ user_id: search.body.results[0].id });
    expect(sent.status).toBe(201);

    const progress = await created.agent.post('/api/economy/progress').send({
      type: 'chapter_open',
      meta: { subject: 'matematica', grade: '5', chapterId: 'fractii' }
    });
    expect(progress.status).toBe(200);
    await created.agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    economy.recordProgress({
      userId: email,
      type: 'session_complete',
      trusted: true,
      meta: { subject: 'matematica', grade: '5', chapterId: 'fractii-premiu', title: 'Premiu' }
    });
    await created.agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '5', chapterId: 'fractii' }
    });
    const buy = await created.agent.post('/api/economy/buy').send({ item_id: 'avatar-neon-fox' });
    expect(buy.status).toBe(200);

    const chat = await created.agent.post('/api/chat').send({
      message: phrase,
      subject: 'matematica',
      class_level: '5'
    });
    expect(chat.status).toBe(200);

    const event = await created.agent.post('/api/calendar/events').send({
      date: '2026-09-27',
      title: 'Recapitulare la fracții',
      type: 'important'
    });
    expect(event.status).toBe(200);

    const paper = await created.agent.post('/api/curriculum/en/papers/open').send({ paper_id: 'en-mate-a' });
    expect(paper.status).toBe(200);

    const exported = await created.agent.get('/api/account/export');
    expect(exported.status).toBe(200);
    expect(exported.body.explicatie).toContain('Sunt de 10');
    expect(exported.body.cont.utilizator).toBe(username);
    expect(exported.body.prieteni.cereri.some(item => item.utilizator === friend.username)).toBe(true);
    expect(exported.body.calendar.evenimente.some(item => item.titlu === 'Recapitulare la fracții')).toBe(true);
    expect(JSON.stringify(exported.body.conversatii)).toContain(phrase);
    expect(exported.body.economie.lectii.length).toBeGreaterThan(0);
    expect(exported.body.economie.cumparaturi).toContain('avatar-neon-fox');
    expect(exported.body.evaluare.lucrari.some(item => item.id === 'en-mate-a')).toBe(true);
    const dump = JSON.stringify(exported.body);
    expect(dump).not.toMatch(/passwordHash|"salt"|"token"/);
    expect(dump).not.toContain(PASSWORD);
    expect(dump).not.toContain(email);

    const parent = await parentAgent(app, created.parentEmail);
    expect(parent.consume.status).toBe(200);
    const mine = await parent.agent.get('/api/parent/me');
    const childId = mine.body.children[0].id;
    const parentExport = await parent.agent.get(`/api/parent/children/${childId}/export`);
    expect(parentExport.status).toBe(200);
    expect(parentExport.body.cont.utilizator).toBe(username);

    const other = await parentAgent(app, stranger.parentEmail);
    const forbidden = await other.agent.get(`/api/parent/children/${childId}/export`);
    expect(forbidden.status).toBe(403);
    const forbiddenDelete = await other.agent.post(`/api/parent/children/${childId}/delete`).send({ confirm: 'ȘTERGE' });
    expect(forbiddenDelete.status).toBe(403);

    const wrong = await created.agent.delete('/api/account').send({ confirm: 'ȘTERGE', password: 'Gresit1!' });
    expect(wrong.status).toBe(401);
    const badWord = await created.agent.delete('/api/account').send({ confirm: 'DELETE', password: PASSWORD });
    expect(badWord.status).toBe(400);
    expect(authStore.findAccount(email)).toBeTruthy();

    const spy = vi.spyOn(deliver, 'deliverMessage').mockResolvedValue({ mocked: true, delivered: false });
    const removed = await created.agent.delete('/api/account').send({ confirm: 'ȘTERGE', password: PASSWORD });
    expect(removed.status).toBe(200);
    expect(removed.body.deleted).toBe(true);
    expect(removed.body.email).toBeUndefined();
    const notices = spy.mock.calls.filter(call => String(call[0]?.body || '').includes('au fost șterse'));
    expect(notices).toHaveLength(1);
    await eraseAccount(email);
    const noticesAfter = spy.mock.calls.filter(call => String(call[0]?.body || '').includes('au fost șterse'));
    expect(noticesAfter).toHaveLength(1);

    expect(authStore.findAccount(email)).toBeNull();
    expect(authStore.findByUsername(username)).toBeNull();
    const hash = userHash(email);
    expect(registry.listDeletions().some(row => row.userIdHash === hash)).toBe(true);

    const saved = persistence.saveNow();
    expect(saved.saved).toBe(true);
    const parsed = JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
    const deletions = JSON.stringify(parsed.collections.deletions || {});
    delete parsed.collections.deletions;
    const rest = JSON.stringify(parsed);
    expect(rest).not.toContain(email);
    expect(rest).not.toContain(username);
    expect(rest).not.toContain(phrase);
    expect(rest).not.toContain(hash);
    expect(deletions).toContain(hash);
    expect(rest).not.toContain(created.parentEmail);
  });

  it('lasă părintele să șteargă fără parola copilului', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const parent = await parentAgent(app, created.parentEmail);
    const mine = await parent.agent.get('/api/parent/me');
    const childId = mine.body.children[0].id;
    const removed = await parent.agent.post(`/api/parent/children/${childId}/delete`).send({ confirm: 'ȘTERGE' });
    expect(removed.status).toBe(200);
    const email = authStore.findByUsername(created.username);
    expect(email).toBeNull();
    const login = await created.agent.get('/api/auth/me');
    expect(login.status).toBe(401);
  });

  it('ține fiecare termen și nu atinge contorul de criză', async () => {
    const start = Date.now();
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(start);
    const { app } = createApp({ autosave: false });
    vi.spyOn(deliver, 'deliverMessage').mockResolvedValue({ mocked: true, delivered: false });

    const before = crisisCount(new Date(start));
    bumpCrisis(new Date(start));
    const pending = await registerPending(app);
    const granted = await registerGranted(app);
    const pendingAccount = authStore.findByUsername(pending.username);
    const grantedAccount = authStore.findByUsername(granted.username);

    vi.setSystemTime(start + 15 * DAY);
    await runRetention();
    expect(authStore.findAccount(pendingAccount.email)).toBeNull();
    expect(authStore.findAccount(grantedAccount.email)).toBeTruthy();

    const token = consentStore.issueConsentToken(grantedAccount.email);
    const reset = authStore.issueResetToken(grantedAccount.email);
    vi.setSystemTime(start + 24 * DAY);
    await runRetention();
    expect(consentStore.peekConsent(token)).toBeNull();
    const resetResult = await authStore.consumeResetToken(reset, 'AltaParola1!');
    expect(resetResult.ok).toBe(false);

    memory.add(`${grantedAccount.email}::vechi`, 'user', 'memorie-veche', {});
    vi.setSystemTime(start + 24 * DAY + retention.TUTOR_MEMORY_MS + DAY);
    await runRetention();
    expect(memory.exportForEmail(grantedAccount.email)['vechi']).toBeUndefined();
    memory.add(`${grantedAccount.email}::nou`, 'user', 'memorie-noua', {});
    await runRetention();
    expect(memory.exportForEmail(grantedAccount.email)['nou']).toBeTruthy();

    const user = economy.getUser(grantedAccount.email) || economy.ensureUser(grantedAccount.email);
    const clock = Date.now();
    user.digestEvents = [
      { at: new Date(clock - 100 * DAY).toISOString(), type: 'chapter_open', title: 'Vechi' },
      { at: new Date(clock).toISOString(), type: 'chapter_open', title: 'Nou' }
    ];
    user.activityLog = [
      { createdAt: new Date(clock - 100 * DAY).toISOString(), type: 'vechi' },
      { createdAt: new Date(clock).toISOString(), type: 'nou' }
    ];
    await runRetention();
    expect(user.digestEvents.map(item => item.title)).toEqual(['Nou']);
    expect(user.activityLog.map(item => item.type)).toEqual(['nou']);

    const extra = await registerGranted(app);
    const extraAccount = authStore.findByUsername(extra.username);
    await eraseAccount(extraAccount.email);
    const hash = userHash(extraAccount.email);
    expect(registry.listDeletions().some(row => row.userIdHash === hash)).toBe(true);
    vi.setSystemTime(Date.now() + retention.DELETION_KEEP_MS + DAY);
    await runRetention();
    expect(registry.listDeletions().some(row => row.userIdHash === hash)).toBe(false);
    expect(authStore.findAccount(grantedAccount.email)).toBeTruthy();

    const warnings = () => deliver.deliverMessage.mock.calls.filter(call => (
      call[0]?.to === granted.parentEmail && String(call[0]?.subject || '').includes('va fi șters')
    ));
    vi.setSystemTime(start + retention.INACTIVE_MS - retention.WARNING_BEFORE_MS);
    await runRetention();
    expect(warnings()).toHaveLength(1);
    expect(grantedAccount.inactivityWarningSent).toBe(true);
    await runRetention();
    expect(warnings()).toHaveLength(1);
    expect(authStore.findAccount(grantedAccount.email)).toBeTruthy();

    vi.setSystemTime(start + retention.INACTIVE_MS + DAY);
    await runRetention();
    expect(authStore.findAccount(grantedAccount.email)).toBeNull();
    expect(crisisCount(new Date(start))).toBe(before + 1);
  });
});
