import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted, uniqueUsername } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const config = nodeRequire('../backend/src/config.js');
const nodemailer = nodeRequire('nodemailer');
const authStore = nodeRequire('../backend/src/data/authStore.js');

const SMTP_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
const FROM = 'nu-raspunde@example.test';
const SMTP_PASSWORD = 'parola-de-test';
const PUBLIC_MESSAGE = 'Dacă există un cont, am trimis un link părintelui tău.';

function savedEnv() {
  const values = {};
  SMTP_KEYS.forEach((key) => {
    values[key] = process.env[key];
  });
  return values;
}

function applySmtp(values) {
  SMTP_KEYS.forEach((key) => {
    const value = values[key] ?? '';
    config[key] = value;
    if (value) process.env[key] = value;
    else delete process.env[key];
  });
}

function tokenFrom(text) {
  return (String(text || '').match(/#\/parola\/([a-f0-9]+)/) || [])[1] || '';
}

describe('resetare de parolă', () => {
  const previousConfig = {};
  const previousEnv = savedEnv();
  SMTP_KEYS.forEach((key) => {
    previousConfig[key] = config[key];
  });
  let sendMail;

  afterEach(() => {
    vi.useRealTimers();
    applySmtp(previousConfig);
    SMTP_KEYS.forEach((key) => {
      if (previousEnv[key] == null) delete process.env[key];
      else process.env[key] = previousEnv[key];
    });
    SMTP_KEYS.forEach((key) => {
      config[key] = previousConfig[key];
    });
    vi.restoreAllMocks();
  });

  function arm() {
    applySmtp({
      SMTP_HOST: 'mail.example.test',
      SMTP_PORT: '587',
      SMTP_USER: FROM,
      SMTP_PASS: SMTP_PASSWORD,
      SMTP_FROM: FROM
    });
    sendMail = vi.fn().mockResolvedValue({ messageId: 'ok' });
    vi.spyOn(nodemailer, 'createTransport').mockImplementation(() => ({
      sendMail,
      close: vi.fn()
    }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
  }

  it('trimite un singur email în 15 minute și răspunde la fel dacă numele lipsește', async () => {
    arm();
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const other = await registerGranted(app);
    const missingName = uniqueUsername('lipsa');

    const known = await request(app).post('/api/auth/forgot-password').send({ email: created.username });
    const missing = await request(app).post('/api/auth/forgot-password').send({ email: missingName });
    const repeat = await request(app).post('/api/auth/forgot-password').send({ email: created.username });

    expect(known.status).toBe(200);
    expect(missing.status).toBe(known.status);
    expect(missing.body).toEqual(known.body);
    expect(repeat.body).toEqual(known.body);
    expect(known.body).toEqual({
      success: true,
      mocked: false,
      message: PUBLIC_MESSAGE
    });
    expect(JSON.stringify(repeat.body)).not.toContain(created.parentEmail);
    expect(JSON.stringify(repeat.body)).not.toContain(created.username);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0][0].to).toBe(created.parentEmail);
    const token = tokenFrom(sendMail.mock.calls[0][0].text);
    expect(token).toBeTruthy();

    expect((await created.agent.get('/api/auth/me')).status).toBe(200);
    expect((await other.agent.get('/api/auth/me')).status).toBe(200);

    const account = authStore.findByUsername(created.username);
    const extra = authStore.stageResetToken(account.email);
    const used = await request(app).post('/api/auth/reset-password').send({ token, password: 'Nouapass1!' });
    expect(used.status).toBe(200);
    const sibling = await request(app).post('/api/auth/reset-password').send({ token: extra, password: 'AltaPass1!' });
    expect(sibling.status).toBe(400);
    expect((await created.agent.get('/api/auth/me')).status).toBe(401);
    expect((await other.agent.get('/api/auth/me')).status).toBe(200);
  });

  it('după 15 minute trimite un link nou și îl închide pe cel din mailul vechi', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-06-01T08:00:00.000Z'));
    arm();
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);

    await request(app).post('/api/auth/forgot-password').send({ email: created.username });
    const oldToken = tokenFrom(sendMail.mock.calls[0][0].text);

    vi.setSystemTime(new Date('2026-06-01T08:14:59.000Z'));
    const stillEarly = await request(app).post('/api/auth/forgot-password').send({ email: created.username });
    expect(stillEarly.body.message).toBe(PUBLIC_MESSAGE);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect((await created.agent.get('/api/auth/me')).status).toBe(200);

    vi.setSystemTime(new Date('2026-06-01T08:15:00.000Z'));
    const again = await request(app).post('/api/auth/forgot-password').send({ email: created.username });
    expect(again.body).toEqual(stillEarly.body);
    expect(sendMail).toHaveBeenCalledTimes(2);
    const newToken = tokenFrom(sendMail.mock.calls[1][0].text);
    expect(newToken).toBeTruthy();
    expect(newToken).not.toBe(oldToken);

    const stale = await request(app).post('/api/auth/reset-password').send({ token: oldToken, password: 'Nouapass1!' });
    expect(stale.status).toBe(400);
    expect((await created.agent.get('/api/auth/me')).status).toBe(200);
    const fresh = await request(app).post('/api/auth/reset-password').send({ token: newToken, password: 'Nouapass1!' });
    expect(fresh.status).toBe(200);
    expect((await created.agent.get('/api/auth/me')).status).toBe(401);
  });
});
