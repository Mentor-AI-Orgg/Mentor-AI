import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PREVIEW_COOKIE, previewToken } from '../backend/src/middleware/comingSoon.js';
import { PREVIEW_PASSWORD_MAX } from '../backend/src/middleware/rateLimits.js';

describe('coming soon gate', () => {
  afterEach(() => {
    delete process.env.SITE_CLOSED;
    delete process.env.SITE_PUBLIC;
    delete process.env.PREVIEW_PASSWORD;
    delete process.env.PREVIEW_COOKIE_SECRET;
    delete process.env.STAGING_AUTH_PASSWORD;
    delete process.env.ENABLE_STAGING_AUTH;
    delete process.env.STAGING_AUTH_USER;
    delete process.env.ENFORCE_PREVIEW_LIMIT;
  });

  it('keeps the app open in tests by default', async () => {
    const { app } = createApp({ autosave: false });
    const health = await request(app).get('/api/health');
    expect(health.status).toBe(200);
    const home = await request(app).get('/');
    expect(home.text).not.toMatch(/În curând/);
  });

  it('shows În curând and blocks the API when SITE_CLOSED=1', async () => {
    process.env.SITE_CLOSED = '1';
    const { app } = createApp({ autosave: false });

    const page = await request(app).get('/');
    expect(page.status).toBe(200);
    expect(page.text).toContain('Sunt de 10');
    expect(page.text).toContain('În curând');
    expect(page.text).toContain('@suntde10');
    expect(page.text).toContain('Intrare creator');
    expect(page.text).not.toContain('Mentor AI');
    expect(page.headers['x-robots-tag']).toMatch(/noindex/);

    const register = await request(app).post('/api/auth/register').send({
      email: 'intrus@example.com',
      password: 'Testpass1!',
      role: 'student',
      parental_consent: true,
      privacy_accepted: true
    });
    expect(register.status).toBe(503);
    expect(register.body.comingSoon).toBe(true);

    const health = await request(app).get('/api/health');
    expect(health.status).toBe(200);

    const robots = await request(app).get('/robots.txt');
    expect(robots.status).toBe(200);
    expect(robots.text).toContain('Disallow: /');
  });

  it('stays closed when PREVIEW_PASSWORD is unset, even with the old built-in password', async () => {
    process.env.SITE_CLOSED = '1';
    const { app } = createApp({ autosave: false });

    const fromUrl = await request(app).get('/?acces=suntde10-creator');
    expect(fromUrl.status).toBe(200);
    expect(fromUrl.text).toContain('În curând');

    const posted = await request(app)
      .post('/creator')
      .type('form')
      .send({ password: 'suntde10-creator' });
    expect(posted.status).toBe(401);
    expect(posted.text).toContain('nu e corectă');
  });

  it('lets the team in with PREVIEW_PASSWORD and then serves the app', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'lucru-secret';
    const { app } = createApp({ autosave: false });

    const locked = await request(app).get('/');
    expect(locked.text).toContain('Intrare creator');

    const unlock = await request(app).post('/creator').type('form').send({ password: 'gresit' });
    expect(unlock.status).toBe(401);
    expect(unlock.text).toContain('nu e corectă');

    const agent = request.agent(app);
    const ok = await agent.post('/creator').type('form').send({ password: 'lucru-secret' });
    expect(ok.status).toBe(303);
    expect(ok.headers.location).toBe('/');

    const opened = await agent.get('/');
    expect(opened.text).not.toMatch(/În curând/);

    const health = await agent.get('/api/health');
    expect(health.status).toBe(200);
  });

  it('opens the app from /creator and can return to the public page', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'lucru-secret';
    const { app } = createApp({ autosave: false });

    const login = await request(app).get('/creator');
    expect(login.status).toBe(200);
    expect(login.text).toContain('Intrare creator');

    const agent = request.agent(app);
    const ok = await agent.post('/creator').type('form').send({ password: 'lucru-secret' });
    expect(ok.status).toBe(303);

    const opened = await agent.get('/');
    expect(opened.text).not.toMatch(/În curând/);

    const leave = await agent.get('/creator/iesire');
    expect(leave.status).toBe(303);

    const locked = await agent.get('/');
    expect(locked.text).toContain('În curând');
  });

  it('SITE_PUBLIC=1 wins over SITE_CLOSED', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.SITE_PUBLIC = '1';
    const { app } = createApp({ autosave: false });
    const page = await request(app).get('/');
    expect(page.text).not.toMatch(/În curând/);
  });

  it('keeps the creator door when SITE_PUBLIC=1 so moderation can still be unlocked', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'lucru-secret';
    process.env.PREVIEW_COOKIE_SECRET = 'secret-de-cookie-separat';
    const { app } = createApp({ autosave: false });

    const closed = await request(app).post('/api/auth/login').send({});
    expect(closed.status).toBe(503);
    expect(closed.body.comingSoon).toBe(true);

    process.env.SITE_PUBLIC = '1';

    const home = await request(app).get('/');
    expect(home.text).not.toMatch(/În curând/);
    expect(home.text).not.toContain('Intrare creator');

    const openLogin = await request(app).post('/api/auth/login').send({});
    expect(openLogin.status).toBe(400);

    const denied = await request(app).get('/api/moderation/reports');
    expect(denied.status).toBe(403);

    const fromUrl = await request(app).get('/creator?password=lucru-secret');
    expect(fromUrl.status).toBe(200);
    expect(fromUrl.text).toContain('Intrare creator');
    expect(fromUrl.text).not.toMatch(/În curând/);
    expect(fromUrl.headers['set-cookie'] || []).not.toEqual(
      expect.arrayContaining([expect.stringContaining(PREVIEW_COOKIE)])
    );

    const wrong = await request(app).post('/creator').type('form').send({ password: 'gresit' });
    expect(wrong.status).toBe(401);
    expect(wrong.text).toContain('nu e corectă');
    expect(wrong.headers['set-cookie'] || []).not.toEqual(
      expect.arrayContaining([expect.stringContaining(PREVIEW_COOKIE)])
    );

    const agent = request.agent(app);
    const ok = await agent.post('/creator').type('form').send({ password: 'lucru-secret' });
    expect(ok.status).toBe(303);
    expect(ok.headers.location).toBe('/');
    expect(ok.headers['set-cookie'].join(';')).toContain(`${PREVIEW_COOKIE}=`);

    const reports = await agent.get('/api/moderation/reports');
    expect(reports.status).toBe(200);
    expect(reports.body.reports).toEqual(expect.any(Array));

    const visitor = await request(app).get('/api/moderation/reports');
    expect(visitor.status).toBe(403);

    const left = await agent.get('/creator/iesire');
    expect(left.status).toBe(303);
    const afterLeave = await agent.get('/api/moderation/reports');
    expect(afterLeave.status).toBe(403);
  });

  it('refuses creator entry on the public site when PREVIEW_PASSWORD is unset', async () => {
    process.env.SITE_PUBLIC = '1';
    const { app } = createApp({ autosave: false });
    const posted = await request(app)
      .post('/creator')
      .type('form')
      .send({ password: 'orice-parola' });
    expect(posted.status).toBe(401);
    expect(posted.headers['set-cookie'] || []).not.toEqual(
      expect.arrayContaining([expect.stringContaining(PREVIEW_COOKIE)])
    );
    const home = await request(app).get('/');
    expect(home.text).not.toMatch(/În curând/);
  });

  it('rate-limits creator password attempts before a correct password is accepted', async () => {
    expect(PREVIEW_PASSWORD_MAX).toBeGreaterThan(0);
    expect(PREVIEW_PASSWORD_MAX).toBeLessThanOrEqual(10);

    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'lucru-secret';
    process.env.ENFORCE_PREVIEW_LIMIT = '1';
    const { app } = createApp({ autosave: false });
    const attacker = '203.0.113.50';

    for (let n = 0; n < PREVIEW_PASSWORD_MAX; n += 1) {
      const attempt = await request(app)
        .post('/creator')
        .set('X-Forwarded-For', attacker)
        .type('form')
        .send({ password: `gresit-${n}` });
      expect(attempt.status).toBe(401);
    }

    const blocked = await request(app)
      .post('/creator')
      .set('X-Forwarded-For', attacker)
      .type('form')
      .send({ password: 'lucru-secret' });
    expect(blocked.status).toBe(429);
    expect(blocked.body.code).toBe('rate_limited');
    expect(blocked.headers['set-cookie'] || []).not.toEqual(
      expect.arrayContaining([expect.stringContaining(PREVIEW_COOKIE)])
    );

    const other = await request(app)
      .post('/creator')
      .set('X-Forwarded-For', '203.0.113.51')
      .type('form')
      .send({ password: 'gresit' });
    expect(other.status).toBe(401);

    const wall = await request(app).get('/');
    expect(wall.text).toContain('În curând');
  });

  it('accepts the preview cookie without a query string', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'cookie-ok';
    process.env.PREVIEW_COOKIE_SECRET = 'secret-de-cookie-separat';
    const { app } = createApp({ autosave: false });
    const page = await request(app).get('/').set('Cookie', `${PREVIEW_COOKIE}=${previewToken()}`);
    expect(page.text).not.toMatch(/În curând/);
  });
});
