import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import {
  DEFAULT_CREATOR_PASSWORD,
  PREVIEW_COOKIE,
  previewToken
} from '../backend/src/middleware/comingSoon.js';

describe('coming soon gate', () => {
  afterEach(() => {
    delete process.env.SITE_CLOSED;
    delete process.env.SITE_PUBLIC;
    delete process.env.PREVIEW_PASSWORD;
    delete process.env.STAGING_AUTH_PASSWORD;
    delete process.env.ENABLE_STAGING_AUTH;
    delete process.env.STAGING_AUTH_USER;
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

  it('lets the creator in with the default password when PREVIEW_PASSWORD is unset', async () => {
    process.env.SITE_CLOSED = '1';
    const { app } = createApp({ autosave: false });

    const unlock = await request(app).get('/?acces=gresit');
    expect(unlock.status).toBe(401);
    expect(unlock.text).toContain('nu e corectă');

    const agent = request.agent(app);
    const ok = await agent.get(`/?acces=${DEFAULT_CREATOR_PASSWORD}`);
    expect(ok.status).toBe(303);
    expect(ok.headers.location).toBe('/');

    const opened = await agent.get('/');
    expect(opened.text).not.toMatch(/În curând/);
  });

  it('lets the team in with PREVIEW_PASSWORD and then serves the app', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'lucru-secret';
    const { app } = createApp({ autosave: false });

    const locked = await request(app).get('/');
    expect(locked.text).toContain('Intrare creator');

    const unlock = await request(app).get('/?acces=gresit');
    expect(unlock.status).toBe(401);
    expect(unlock.text).toContain('nu e corectă');

    const agent = request.agent(app);
    const ok = await agent.get('/?acces=lucru-secret');
    expect(ok.status).toBe(303);
    expect(ok.headers.location).toBe('/');

    const opened = await agent.get('/');
    expect(opened.text).not.toMatch(/În curând/);

    const health = await agent.get('/api/health');
    expect(health.status).toBe(200);
  });

  it('opens the app from /creator and can return to the public page', async () => {
    process.env.SITE_CLOSED = '1';
    const { app } = createApp({ autosave: false });

    const login = await request(app).get('/creator');
    expect(login.status).toBe(200);
    expect(login.text).toContain('Intrare creator');

    const agent = request.agent(app);
    const ok = await agent.get(`/creator?acces=${DEFAULT_CREATOR_PASSWORD}`);
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

  it('accepts the preview cookie without a query string', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'cookie-ok';
    const { app } = createApp({ autosave: false });
    const page = await request(app)
      .get('/')
      .set('Cookie', `${PREVIEW_COOKIE}=${previewToken()}`);
    expect(page.text).not.toMatch(/În curând/);
  });
});
