import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PREVIEW_COOKIE, previewToken } from '../backend/src/middleware/comingSoon.js';

describe('pagina de creator pentru mascotă', () => {
  const previous = {
    PREVIEW_PASSWORD: process.env.PREVIEW_PASSWORD,
    PREVIEW_COOKIE_SECRET: process.env.PREVIEW_COOKIE_SECRET
  };

  afterEach(() => {
    if (previous.PREVIEW_PASSWORD === undefined) delete process.env.PREVIEW_PASSWORD;
    else process.env.PREVIEW_PASSWORD = previous.PREVIEW_PASSWORD;
    if (previous.PREVIEW_COOKIE_SECRET === undefined) delete process.env.PREVIEW_COOKIE_SECRET;
    else process.env.PREVIEW_COOKIE_SECRET = previous.PREVIEW_COOKIE_SECRET;
  });

  it('refuză vizitatorul și acceptă cookie-ul de creator', async () => {
    process.env.PREVIEW_PASSWORD = 'creator-secret';
    process.env.PREVIEW_COOKIE_SECRET = 'creator-cookie-secret';
    const { app } = createApp({ autosave: false });
    const closed = await request(app).get('/api/creator/status');
    expect(closed.status).toBe(403);

    const cookie = `${PREVIEW_COOKIE}=${previewToken()}`;
    const open = await request(app).get('/api/creator/status').set('Cookie', cookie);
    expect(open.status).toBe(200);
    expect(open.body.ok).toBe(true);
  });
});
