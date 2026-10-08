import { describe, it, expect, beforeAll } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PASSWORD, registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const { passwordError, passwordStrength, commonPasswordCount } = nodeRequire('../backend/src/safety/passwordPolicy.js');

describe('child password policy', () => {
  it('keeps a long common list and accepts a passphrase', () => {
    expect(commonPasswordCount()).toBeGreaterThanOrEqual(1000);
    expect(passwordError(PASSWORD, 'elevtest')).toBeNull();
    expect(passwordError('pisica verde sare', 'elevtest')).toBeNull();
    expect(passwordError('password', 'elevtest')).toBe('Parola asta e prea cunoscută. Alege alta.');
    expect(passwordError('12345678', 'elevtest')).toBe('Parola asta e prea cunoscută. Alege alta.');
    expect(passwordError('scurt', 'elevtest')).toBe('Parola trebuie să aibă minim 8 caractere.');
    expect(passwordError('elevtest1', 'elevtest1')).toBe('Alege o parolă care nu e la fel cu numele de utilizator.');
    expect(passwordStrength('pisica verde sare').label).toBe('Bună. O frază e greu de ghicit.');
    expect(passwordStrength('ab').label).toBe('Prea scurtă. Mai scrie.');
    expect(passwordStrength('Testpass1!').label).toBe('E ok.');
    expect(passwordError('nu-i-parola', 'elevtest')).toBeNull();
    expect(passwordError('nuiparola', 'elevtest')).toBeNull();
  });
});

describe('register rejects weak child passwords', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('refuses a common password and a password equal to the username', async () => {
    const common = await request(app).post('/api/auth/register').send({
      username: 'zmeuparola1',
      password: 'password1',
      confirmPassword: 'password1',
      class: '6',
      parentEmail: `parinte.${Date.now()}@example.com`,
      acceptTerms: true
    });
    expect(common.status).toBe(400);
    expect(common.body.error).toBe('Parola asta e prea cunoscută. Alege alta.');

    const same = await request(app).post('/api/auth/register').send({
      username: 'zmeuelev99',
      password: 'zmeuelev99',
      confirmPassword: 'zmeuelev99',
      class: '6',
      parentEmail: `parinte.${Date.now()}.b@example.com`,
      acceptTerms: true
    });
    expect(same.status).toBe(400);
    expect(same.body.error).toBe('Alege o parolă care nu e la fel cu numele de utilizator.');
  });

  it('accepts a passphrase and still accepts the existing test password', async () => {
    const phrase = await request(app).post('/api/auth/register').send({
      username: 'zmeufraza1',
      password: 'pisica verde sare',
      confirmPassword: 'pisica verde sare',
      class: '6',
      parentEmail: `parinte.${Date.now()}.c@example.com`,
      acceptTerms: true
    });
    expect(phrase.status).toBe(201);

    const created = await registerGranted(app, { username: 'zmeutestpw' });
    expect(created.res.status).toBe(201);
    const changed = await created.agent.post('/api/account/password').send({
      currentPassword: PASSWORD,
      newPassword: 'pisica verde sare'
    });
    expect(changed.status).toBe(200);
  });
});
