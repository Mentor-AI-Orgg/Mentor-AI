import fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { passwordHint } from '../frontend/passwordHint.js';
import { logoutNotice } from '../frontend/logoutNotice.js';
import { PASSWORD, registerGranted, uniqueEmail } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const authStore = nodeRequire('../backend/src/data/authStore.js');
const { registerSchema, resetPasswordSchema } = nodeRequire('../backend/src/validation/schemas.js');
const { launchLog, checklist } = nodeRequire('../backend/src/ops/prelansare.js');
const { TERMS_VERSION } = nodeRequire('../shared/terms.js');

const TERMS = 'Trebuie să fii de acord cu termenii și politica de confidențialitate.';

describe('cont nou, termeni și mesaje de lansare', () => {
  it('refuză înscrierea fără acord și păstrează mesajul în română', async () => {
    const { app } = createApp({ autosave: false });
    const username = `acord${Date.now().toString(16).slice(-6)}`;
    const res = await request(app).post('/api/auth/register').send({
      username,
      password: PASSWORD,
      confirmPassword: PASSWORD,
      class: '5',
      parentEmail: uniqueEmail('parinte')
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(TERMS);
    expect(authStore.findByUsername(username)).toBeFalsy();
  });

  it('salvează data și versiunea termenilor doar la conturile noi', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app, { username: `cu_acord_${Date.now().toString(16)}` });
    expect(created.res.status).toBe(201);
    const account = authStore.findByUsername(created.username);
    expect(account.termsVersion).toBe(TERMS_VERSION);
    expect(account.termsVersion).toBe('2026-10-01');
    expect(account.termsAcceptedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    const legacy = await authStore.createAccount({
      email: uniqueEmail('vechi'),
      password: PASSWORD,
      role: 'student',
      profile: { username: `cont_vechi_${Date.now().toString(16)}`, class: '6' }
    });
    expect(legacy.ok).toBe(true);
    expect(legacy.account.termsAcceptedAt).toBeUndefined();
    const login = await request(app).post('/api/auth/login').send({
      email: legacy.account.profile.username,
      password: PASSWORD
    });
    expect(login.status).toBe(200);
  });

  it('spune la fel ca serverul când parola e prea cunoscută', () => {
    const hint = passwordHint('12345678', 'elevtest');
    expect(hint.ok).toBe(false);
    expect(hint.label).toBe('Parola asta e prea cunoscută. Alege alta.');
    expect(passwordHint('pisica verde sare', 'elevtest').ok).toBe(true);
  });

  it('limitează parola și tokenul cu mesaje în română', () => {
    const password = registerSchema.safeParse({
      username: 'ana_buna',
      password: 'a'.repeat(201),
      confirmPassword: 'a'.repeat(201),
      class: '5',
      parentEmail: 'parinte@example.com',
      acceptTerms: true
    });
    expect(password.success).toBe(false);
    expect(password.error.issues[0].message).toBe('Parola poate avea cel mult 200 de caractere.');

    const token = resetPasswordSchema.safeParse({ token: 'scurt', password: PASSWORD });
    expect(token.success).toBe(false);
    expect(token.error.issues[0].message).toBe('Linkul nu mai este valabil.');
  });

  it('nu spune că emailul părintelui pleacă zilnic când ritmul e săptămânal', () => {
    const ro = JSON.parse(fs.readFileSync(new URL('../frontend/i18n/locales/ro.json', import.meta.url), 'utf8'));
    expect(ro.profile.parentNoteWeekly).toMatch(/săptămână/);
    expect(ro.profile.parentNoteWeekly).not.toMatch(/pe zi/);
    expect(ro.profile.parentEmptyWeekly).toMatch(/săptămână/);
    expect(ro.profile.parentEmptyWeekly).not.toMatch(/pe zi/);
    expect(ro.profile.parentNote).not.toMatch(/pe zi/);
    expect(ro.profile.parentEmpty).not.toMatch(/pe zi/);
    const screen = fs.readFileSync(new URL('../frontend/screens/ProfileScreen.jsx', import.meta.url), 'utf8');
    expect(screen).toContain('parentNoteWeekly');
    expect(screen).toContain('userData.parentEmails');
  });

  it('păstrează mesajul de cont șters după deconectare', () => {
    expect(logoutNotice('deleted', 'Te-ai deconectat.')).toBe('Contul a fost șters.');
    expect(logoutNotice(undefined, 'Te-ai deconectat.')).toBe('Te-ai deconectat.');
    const profile = fs.readFileSync(new URL('../frontend/screens/ProfileScreen.jsx', import.meta.url), 'utf8');
    expect(profile).toContain("reason: 'deleted'");
  });

  it('spune că site-ul e deschis când SITE_PUBLIC=1, iar un URL http nu e „lipsește”', () => {
    const open = launchLog([
      { key: 'APP_BASE_URL', ok: false, required: true, detail: 'nu este un URL https valid' },
      { key: 'SMTP', ok: false, required: true, detail: 'nu e configurat' }
    ], { SITE_PUBLIC: '1', NODE_ENV: 'production' });
    expect(open).toHaveLength(1);
    expect(open[0]).toContain('SITE_PUBLIC=1');
    expect(open[0]).toContain('DESCHIS');
    expect(open[0]).toContain('nu este un URL https valid');
    expect(open[0]).not.toContain('rămâne închis');

    const previousAudit = process.env.PRELANSARE_SKIP_AUDIT;
    process.env.PRELANSARE_SKIP_AUDIT = '1';
    try {
      const httpItem = checklist({ APP_BASE_URL: 'http://exemplu.local' }).find(item => item.key === 'APP_BASE_URL');
      expect(httpItem.ok).toBe(false);
      expect(httpItem.detail).toBe('nu este un URL https valid');
      const emptyItem = checklist({ APP_BASE_URL: '' }).find(item => item.key === 'APP_BASE_URL');
      expect(emptyItem.detail).toBe('lipsește');
    } finally {
      if (previousAudit === undefined) delete process.env.PRELANSARE_SKIP_AUDIT;
      else process.env.PRELANSARE_SKIP_AUDIT = previousAudit;
    }
  });

  it('ține butoanele pe culoarea lor la hover și întrebările testului pe un fundal lizibil', () => {
    const css = fs.readFileSync(new URL('../frontend/styles.css', import.meta.url), 'utf8');
    expect(css).not.toContain('#cbbdff');
    expect(css).toContain('.placement-quiz');
    expect(css).toContain('.placement-prompt');
    const home = fs.readFileSync(new URL('../frontend/screens/HomeScreen.jsx', import.meta.url), 'utf8');
    expect(home).toContain('className="placement-quiz"');
    expect(home).not.toContain('focus-card">\n          <p>Pas cu pas');
  });
});
