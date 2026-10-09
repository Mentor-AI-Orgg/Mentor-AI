import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { inAppSocialBrowser, sessionCookieOptions } from '../backend/src/http/sessionCookie.js';
import { shouldShowBrowserBanner } from '../frontend/inAppBrowser.js';

const FACEBOOK = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/462.0.0.0;FBDV/iPhone]';
const INSTAGRAM = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.0.0 Mobile Safari/537.36 Instagram 350.0.0.0.0';
const CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

function cookieHeader(res) {
  return String(res.headers['set-cookie'] || '').toLowerCase();
}

describe('sesiunea în browserul din Facebook', () => {
  it('recunoaște doar webview-ul de Facebook sau Instagram', () => {
    expect(inAppSocialBrowser(FACEBOOK)).toBe(true);
    expect(inAppSocialBrowser(INSTAGRAM)).toBe(true);
    expect(inAppSocialBrowser('Mozilla/5.0 FB_IAB/1')).toBe(true);
    expect(inAppSocialBrowser(CHROME)).toBe(false);
    expect(inAppSocialBrowser('Mozilla/5.0 (iPhone) Version/17.5 Mobile/15E148 Safari/604.1')).toBe(false);
    expect(shouldShowBrowserBanner(FACEBOOK, false)).toBe(true);
    expect(shouldShowBrowserBanner(FACEBOOK, true)).toBe(false);
    expect(shouldShowBrowserBanner(CHROME, false)).toBe(false);
  });

  it('pune SameSite=None doar în webview și lasă Lax în browserul normal', () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    try {
      const facebook = sessionCookieOptions(1000, FACEBOOK);
      const chrome = sessionCookieOptions(1000, CHROME);
      expect(facebook.sameSite).toBe('none');
      expect(facebook.secure).toBe(true);
      expect(facebook.httpOnly).toBe(true);
      expect(facebook.path).toBe('/');
      expect(facebook.domain).toBeUndefined();
      expect(facebook.partitioned).toBeUndefined();
      expect(chrome.sameSite).toBe('lax');
      expect(chrome.secure).toBe(true);
    } finally {
      process.env.NODE_ENV = previous;
    }
  });

  it('păstrează sesiunea după login în Facebook și nu o închide pe cea din Chrome', async () => {
    const { app } = createApp({ autosave: false });
    const facebookStudent = await registerGranted(app);
    const chromeStudent = await registerGranted(app);
    const previous = process.env.NODE_ENV;
    const previousPublic = process.env.SITE_PUBLIC;
    process.env.NODE_ENV = 'production';
    process.env.SITE_PUBLIC = '1';
    try {
      const facebookLogin = await request(app)
        .post('/api/auth/login')
        .set('User-Agent', FACEBOOK)
        .send({ email: facebookStudent.username, password: facebookStudent.password });
      const chromeLogin = await request(app)
        .post('/api/auth/login')
        .set('User-Agent', CHROME)
        .send({ email: chromeStudent.username, password: chromeStudent.password });

      expect(facebookLogin.status).toBe(200);
      expect(cookieHeader(facebookLogin)).toContain('samesite=none');
      expect(cookieHeader(facebookLogin)).toContain('secure');
      expect(cookieHeader(facebookLogin)).toContain('httponly');
      expect(cookieHeader(chromeLogin)).toContain('samesite=lax');
      expect(cookieHeader(chromeLogin)).not.toContain('samesite=none');

      const facebookCookie = facebookLogin.headers['set-cookie'][0].split(';')[0];
      const chromeCookie = chromeLogin.headers['set-cookie'][0].split(';')[0];
      const facebookMe = await request(app).get('/api/auth/me').set('Cookie', facebookCookie);
      const chromeMe = await request(app).get('/api/auth/me').set('Cookie', chromeCookie);
      expect(facebookMe.status).toBe(200);
      expect(facebookMe.body.user.username).toBe(facebookStudent.username);
      expect(chromeMe.status).toBe(200);
      expect(chromeMe.body.user.username).toBe(chromeStudent.username);
    } finally {
      process.env.NODE_ENV = previous;
      if (previousPublic == null) delete process.env.SITE_PUBLIC;
      else process.env.SITE_PUBLIC = previousPublic;
    }
  });
});
