import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { redact } from '../backend/src/logger.js';
import { PASSWORD, registerGranted } from './registerStudent.js';

describe('antete, cookie și jurnale', () => {
  it('pune CSP pe același site și nu publică integrările', async () => {
    const { app } = createApp({ autosave: false });
    const privacy = await request(app).get('/confidentialitate');
    expect(privacy.status).toBe(200);
    const csp = privacy.headers['content-security-policy'];
    expect(csp).toMatch(/default-src 'self'/);
    expect(csp).not.toMatch(/fonts\.googleapis/);
    expect(privacy.text).toContain('s10_session');

    const health = await request(app).get('/api/health');
    expect(health.body).toEqual({ ok: true, version: '3.0.0' });
    expect(health.body.integrations).toBeUndefined();
    expect(JSON.stringify(health.body)).not.toMatch(/openai|mathpix|smtp/i);
  });

  it('marchează cookie-ul Secure doar în producție', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    process.env.SITE_PUBLIC = '1';
    try {
      const login = await request(app).post('/api/auth/login').send({
        email: created.username,
        password: PASSWORD
      });
      const cookie = login.headers['set-cookie'].join(';').toLowerCase();
      expect(cookie).toContain('s10_session=');
      expect(cookie).toContain('httponly');
      expect(cookie).toContain('secure');
      expect(cookie).toContain('samesite=lax');
      expect(cookie).not.toContain('mentor_');
    } finally {
      process.env.NODE_ENV = previous;
      delete process.env.SITE_PUBLIC;
    }
  });

  it('setează cookie-ul de elev s10_session', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const cookie = created.res.headers['set-cookie'].join(';');
    expect(cookie).toContain('s10_session=');
    expect(cookie).not.toContain('mentor_session=');
    const login = await request(app).post('/api/auth/login').send({
      email: created.username,
      password: PASSWORD
    });
    expect(login.headers['set-cookie'].join(';')).toContain('s10_session=');
  });

  it('respinge un corp mai mare decât limita', async () => {
    const { app } = createApp({ autosave: false });
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send(`{"email":"a","password":"${'x'.repeat(300 * 1024)}"}`);
    expect(res.status).toBe(413);
  });

  it('scoate parola și emailul dintr-un jurnal', () => {
    const text = redact('login password=secret123 email=copil@example.com token: abcdef scris catre copil@example.com 0722000111');
    expect(text).not.toContain('secret123');
    expect(text).not.toContain('copil@example.com');
    expect(text).not.toContain('abcdef');
    expect(text).not.toContain('0722000111');
    expect(text).toContain('[redactat]');
    expect(text).toContain('[email]');
    expect(text).toContain('[telefon]');
  });

  it('verifică prelansarea fără să oprească procesul când SMTP lipsește', () => {
    const result = spawnSync(process.execPath, ['backend/src/ops/prelansare.js'], {
      cwd: path.resolve('.'),
      env: {
        ...process.env,
        SMTP_HOST: '',
        SMTP_FROM: '',
        PREVIEW_PASSWORD: '',
        PREVIEW_COOKIE_SECRET: '',
        SESSION_SECRET: '',
        LEGAL_OPERATOR_NAME: '',
        LEGAL_OPERATOR_ADDRESS: '',
        LEGAL_CONTACT: '',
        PRELANSARE_SKIP_AUDIT: '1'
      },
      encoding: 'utf8'
    });
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('✗ SMTP');
    expect(result.stdout).toContain('✗ PREVIEW_PASSWORD');
    expect(result.stdout).toContain('✗ LEGAL');
    expect(result.stdout).toContain('✓ CSP');
  });

  it('refuză un POST cu Origin străin și câmpuri necunoscute', async () => {
    const { app } = createApp({ autosave: false });
    const foreign = await request(app).post('/api/auth/login').set('Origin', 'https://evil.example').send({
      email: 'nimeni',
      password: 'parola-lunga'
    });
    expect(foreign.status).toBe(403);
    const extra = await request(app).post('/api/auth/login').send({
      email: 'nimeni',
      password: 'parola-lunga',
      extra: 'nu'
    });
    expect(extra.status).toBe(400);
  });

  it('pune HSTS doar în producție și blochează frame-urile', async () => {
    const previous = process.env.NODE_ENV;
    const previousPublic = process.env.SITE_PUBLIC;
    process.env.NODE_ENV = 'production';
    process.env.SITE_PUBLIC = '1';
    try {
      const { app } = createApp({ autosave: false });
      const page = await request(app).get('/confidentialitate');
      expect(page.headers['strict-transport-security']).toMatch(/max-age=/);
      expect(page.headers['x-content-type-options']).toBe('nosniff');
      expect(page.headers['content-security-policy']).toMatch(/frame-ancestors 'none'/);
      expect(page.headers['permissions-policy']).toBe('camera=(self), microphone=(self), geolocation=()');
    } finally {
      process.env.NODE_ENV = previous;
      if (previousPublic === undefined) delete process.env.SITE_PUBLIC;
      else process.env.SITE_PUBLIC = previousPublic;
    }
  });

  it('blochează contul după 5 parole greșite, la fel pentru un nume inexistent', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const wrong = { email: created.username, password: 'gresita-123' };
    const missing = { email: `lipsa${Date.now()}`, password: 'gresita-123' };
    for (let n = 0; n < 4; n += 1) {
      expect((await request(app).post('/api/auth/login').send(wrong)).status).toBe(401);
      expect((await request(app).post('/api/auth/login').send(missing)).status).toBe(401);
    }
    const known = await request(app).post('/api/auth/login').send(wrong);
    const unknown = await request(app).post('/api/auth/login').send(missing);
    expect(known.status).toBe(429);
    expect(unknown.status).toBe(429);
    expect(known.body.error).toBe(unknown.body.error);
  });

  it('limitează înscrierile de pe același IP', async () => {
    process.env.ENFORCE_LIMITS = '1';
    try {
      const { app } = createApp({ autosave: false });
      for (let n = 0; n < 5; n += 1) {
        const created = await registerGranted(app);
        expect(created.res.status).toBe(201);
      }
      const blocked = await registerGranted(app);
      expect(blocked.res.status).toBe(429);
      expect(blocked.res.body.error).toContain('câteva minute');
    } finally {
      delete process.env.ENFORCE_LIMITS;
    }
  });

  it('nu are script inline și nu folosește innerHTML în index', () => {
    const index = require('node:fs').readFileSync(path.join(process.cwd(), 'frontend', 'index.html'), 'utf8');
    expect(index).not.toContain('innerHTML');
    expect(index).not.toMatch(/<script(?![^>]*\bsrc=)/);
  });
});
