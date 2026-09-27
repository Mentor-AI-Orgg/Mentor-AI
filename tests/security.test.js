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
    const privacy = await request(app).get('/privacy.html');
    expect(privacy.status).toBe(200);
    const csp = privacy.headers['content-security-policy'];
    expect(csp).toMatch(/default-src 'self'/);
    expect(csp).not.toMatch(/fonts\.googleapis/);
    expect(privacy.text).toContain('s10_session');

    const health = await request(app).get('/api/health');
    expect(health.body).toEqual({ ok: true });
    expect(health.body.integrations).toBeUndefined();
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
      .send(`{"email":"a","password":"${'x'.repeat(80_000)}"}`);
    expect(res.status).toBe(413);
  });

  it('scoate parola și emailul dintr-un jurnal', () => {
    const text = redact('login password=secret123 email=copil@example.com token: abcdef');
    expect(text).not.toContain('secret123');
    expect(text).not.toContain('copil@example.com');
    expect(text).not.toContain('abcdef');
    expect(text).toContain('[redactat]');
    expect(text).toContain('[email]');
  });

  it('verifică prelansarea fără să oprească procesul când SMTP lipsește', () => {
    const result = spawnSync(process.execPath, ['backend/src/ops/prelansare.js'], {
      cwd: path.resolve('.'),
      env: {
        ...process.env,
        SMTP_HOST: '',
        SMTP_FROM: '',
        PREVIEW_PASSWORD: '',
        PREVIEW_COOKIE_SECRET: ''
      },
      encoding: 'utf8'
    });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('SMTP: opțional, lipsește');
    expect(result.stdout).toContain('PREVIEW_PASSWORD: LIPSEȘTE');
    expect(result.stdout).not.toMatch(/process\.exit\(1\)/);
  });
});
