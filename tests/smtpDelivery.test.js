import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted, uniqueEmail } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const config = nodeRequire('../backend/src/config.js');
const nodemailer = nodeRequire('nodemailer');
const monitor = nodeRequire('../backend/src/ops/errorMonitor.js');

const SMTP_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
const PASSWORD = 'parola-de-test';
const FROM = 'nu-raspunde@example.test';

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

function mailText(spy) {
  return spy.mock.calls.map((call) => String(call[0])).join('\n');
}

describe('livrare SMTP', () => {
  const previousConfig = {};
  const previousEnv = savedEnv();
  SMTP_KEYS.forEach((key) => {
    previousConfig[key] = config[key];
  });
  let sendMail;
  let errorSpy;

  afterEach(() => {
    applySmtp(previousConfig);
    SMTP_KEYS.forEach((key) => {
      if (previousEnv[key] == null) delete process.env[key];
      else process.env[key] = previousEnv[key];
    });
    SMTP_KEYS.forEach((key) => {
      config[key] = previousConfig[key];
    });
    if (errorSpy) errorSpy.mockRestore();
    vi.restoreAllMocks();
    delete process.env.ERROR_LOG_DIR;
    monitor.resetAlerts();
  });

  function arm({ host = 'localhost', port = '25' } = {}) {
    applySmtp({
      SMTP_HOST: host,
      SMTP_PORT: port,
      SMTP_USER: FROM,
      SMTP_PASS: PASSWORD,
      SMTP_FROM: FROM
    });
    sendMail = vi.fn().mockResolvedValue({ messageId: 'ok' });
    vi.spyOn(nodemailer, 'createTransport').mockImplementation(() => ({
      sendMail,
      close: vi.fn()
    }));
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  }

  it('predă linkul de părinte transportului SMTP și răspunde la fel dacă adresa lipsește', async () => {
    arm();
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const unknown = uniqueEmail('nimeni');

    const known = await request(app).post('/api/parent/magic').send({ email: created.parentEmail });
    const missing = await request(app).post('/api/parent/magic').send({ email: unknown });

    expect(known.status).toBe(missing.status);
    expect(known.body).toEqual(missing.body);
    expect(known.body.message).toMatch(/Dacă există un cont/);
    expect(JSON.stringify(known.body)).not.toContain(created.parentEmail);
    expect(sendMail).toHaveBeenCalledTimes(1);
    const message = sendMail.mock.calls[0][0];
    expect(message.to).toBe(created.parentEmail);
    expect(message.from).toBe(FROM);
    expect(message.text).toContain('/#/parinte/');
    const options = nodemailer.createTransport.mock.calls[0][0];
    expect(options.host).toBe('127.0.0.1');
    expect(options.port).toBe(25);
    expect(options.ignoreTLS).toBe(true);
    expect(options.auth).toBeUndefined();
    expect(mailText(errorSpy)).toContain('smtp_accepted');
    expect(mailText(errorSpy)).not.toContain(created.parentEmail);
    expect(mailText(errorSpy)).not.toContain(PASSWORD);
    expect(mailText(errorSpy)).not.toContain(message.text);
  });

  it('predă resetarea de parolă transportului și păstrează același răspuns', async () => {
    arm({ host: 'mail.example.test', port: '587' });
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const missingName = `lipsa${Date.now()}`;

    const known = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: created.username });
    const missing = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: missingName });

    expect(known.status).toBe(missing.status);
    expect(known.body).toEqual(missing.body);
    expect(known.body.success).toBe(true);
    expect(known.body.mocked).toBe(false);
    expect(known.body.message).toMatch(/părintelui/);
    expect(JSON.stringify(known.body)).not.toContain(created.parentEmail);
    expect(sendMail).toHaveBeenCalledTimes(1);
    const message = sendMail.mock.calls[0][0];
    expect(message.to).toBe(created.parentEmail);
    expect(message.to).not.toMatch(/@elev\.invalid$/);
    expect(message.from).toBe(FROM);
    expect(message.text).toContain('/#/parola/');
    const options = nodemailer.createTransport.mock.calls[0][0];
    expect(options.host).toBe('mail.example.test');
    expect(options.port).toBe(587);
    expect(options.secure).toBe(false);
    expect(options.auth).toEqual({ user: FROM, pass: PASSWORD });
    expect(mailText(errorSpy)).not.toContain(PASSWORD);
    expect(mailText(errorSpy)).not.toContain(created.parentEmail);
    expect(mailText(errorSpy)).not.toContain(message.text);
  });

  it('nu cheamă SMTP la înscriere', async () => {
    arm();
    const { app } = createApp({ autosave: false });
    sendMail.mockClear();
    nodemailer.createTransport.mockClear();
    const created = await registerGranted(app);
    expect(created.res.status).toBe(201);
    expect(created.res.body.user.consent).toBe('notified');
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('scrie codul când SMTP lipsește, fără destinatar', async () => {
    arm();
    applySmtp({
      SMTP_HOST: '',
      SMTP_PORT: '',
      SMTP_USER: '',
      SMTP_PASS: '',
      SMTP_FROM: ''
    });
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'smtp-miss-'));
    process.env.ERROR_LOG_DIR = dir;
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    errorSpy.mockClear();
    const known = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: created.username });
    const missing = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: `lipsa${Date.now()}` });
    expect(known.body).toEqual(missing.body);
    expect(known.body.success).toBe(true);
    expect(known.body.mocked).toBe(true);
    expect(sendMail).not.toHaveBeenCalled();
    const logged = `${mailText(errorSpy)}\n${fs.readFileSync(path.join(dir, 'errors.log'), 'utf8')}`;
    expect(logged).toContain('smtp_unconfigured');
    expect(logged).toContain('forgot_password');
    expect(logged).not.toContain(created.parentEmail);
    expect(logged).not.toContain(created.username);
    expect(logged).not.toContain(PASSWORD);
    expect(logged).not.toContain('/#/parola/');
  });

  it('scrie parent_magic când SMTP lipsește, cu același răspuns', async () => {
    arm();
    applySmtp({
      SMTP_HOST: '',
      SMTP_PORT: '',
      SMTP_USER: '',
      SMTP_PASS: '',
      SMTP_FROM: ''
    });
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'smtp-parent-'));
    process.env.ERROR_LOG_DIR = dir;
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    errorSpy.mockClear();
    const known = await request(app).post('/api/parent/magic').send({ email: created.parentEmail });
    const missing = await request(app).post('/api/parent/magic').send({ email: uniqueEmail('nimeni') });
    expect(known.status).toBe(missing.status);
    expect(known.body).toEqual(missing.body);
    expect(known.body.message).toMatch(/Dacă există un cont de părinte/);
    expect(sendMail).not.toHaveBeenCalled();
    const logged = `${mailText(errorSpy)}\n${fs.readFileSync(path.join(dir, 'errors.log'), 'utf8')}`;
    expect(logged).toContain('smtp_unconfigured');
    expect(logged).toContain('parent_magic');
    expect(logged).not.toContain(created.parentEmail);
    expect(logged).not.toContain('/#/parinte/');
  });

  it('scrie doar codul când SMTP eșuează, apoi răspunde la fel', async () => {
    arm({ host: 'mail.example.test', port: '587' });
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'smtp-fail-'));
    process.env.ERROR_LOG_DIR = dir;
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const secretBody = `corp-secret-${created.parentEmail}-${PASSWORD}`;
    sendMail.mockRejectedValue(
      Object.assign(new Error(`535 ${created.parentEmail} ${PASSWORD} ${secretBody}`), {
        code: 'EAUTH',
        response: created.parentEmail,
        command: `AUTH PLAIN ${PASSWORD}`
      })
    );
    errorSpy.mockClear();
    const known = await request(app).post('/api/parent/magic').send({ email: created.parentEmail });
    const missing = await request(app)
      .post('/api/parent/magic')
      .send({ email: uniqueEmail('nimeni') });
    expect(known.status).toBe(missing.status);
    expect(known.body).toEqual(missing.body);
    expect(known.body.success).toBe(true);
    expect(sendMail).toHaveBeenCalledTimes(1);
    const logged = `${mailText(errorSpy)}\n${fs.readFileSync(path.join(dir, 'errors.log'), 'utf8')}`;
    expect(logged).toContain('smtp_EAUTH');
    expect(logged).not.toContain(created.parentEmail);
    expect(logged).not.toContain(PASSWORD);
    expect(logged).not.toContain(secretBody);
    expect(logged).not.toContain('AUTH PLAIN');
    expect(logged).not.toContain('/#/parinte/');
  });

  it('reîncearcă cu autentificare când relay-ul local refuză, fără textul erorii', async () => {
    arm();
    const parent = 'parinte@example.test';
    sendMail
      .mockRejectedValueOnce(
        Object.assign(new Error(`550 relay for ${parent} ${PASSWORD}`), { code: 'EENVELOPE' })
      )
      .mockResolvedValueOnce({ messageId: 'ok' });
    const { sendEmail } = nodeRequire('../backend/src/notify/deliver.js');
    errorSpy.mockClear();
    const result = await sendEmail({ to: parent, subject: 'subiect', body: `corp ${parent}` });
    expect(result.delivered).toBe(true);
    expect(result.error).toBeUndefined();
    expect(nodemailer.createTransport).toHaveBeenCalledTimes(2);
    expect(nodemailer.createTransport.mock.calls[0][0].auth).toBeUndefined();
    expect(nodemailer.createTransport.mock.calls[1][0].auth).toEqual({
      user: FROM,
      pass: PASSWORD
    });
    expect(nodemailer.createTransport.mock.calls[1][0].ignoreTLS).toBe(false);
    const logged = mailText(errorSpy);
    expect(logged).toContain('smtp_accepted');
    expect(logged).not.toContain(parent);
    expect(logged).not.toContain(PASSWORD);
    expect(logged).not.toContain('550');
    expect(logged).not.toContain('corp');
  });

  it('citește numele de utilizator din câmp, nu doar din starea React', () => {
    const source = fs.readFileSync(
      path.join(__dirname, '../frontend/components/LoginScreen.jsx'),
      'utf8'
    );
    expect(source).toContain('emailRef.current?.value');
    expect(source).toContain('onForgotPassword(name)');
  });
});
