import { describe, it, expect } from 'vitest';
import { hashForRoute, parseAppHash } from '../frontend/appRoutes.js';

describe('app hash routes', () => {
  it('round-trips the student screens a child actually uses', () => {
    const cases = [
      ['welcome', {}, '#/start'],
      ['login', {}, '#/conectare'],
      ['register', {}, '#/cont'],
      ['home', {}, '#/acasa'],
      ['professor', {}, '#/mentor'],
      ['shop', {}, '#/magazin'],
      ['profile', {}, '#/profil'],
      ['calendar', {}, '#/calendar'],
      ['learn', {}, '#/lectii'],
      ['learn', { subject: 'romana', grade: '6', chapter: 'fractii' }, '#/lectii/romana/6/fractii'],
      ['learn', { track: 'en', subject: 'matematica' }, '#/en/matematica'],
      ['reset', { token: 'abc' }, '#/parola/abc'],
      ['consent', { token: 'abc' }, '#/acord/abc'],
      ['parent', {}, '#/parinte'],
      ['parent', { token: 'abc' }, '#/parinte/abc'],
      ['consent-wait', {}, '#/asteptare']
    ];

    for (const [screen, extras, hash] of cases) {
      expect(hashForRoute(screen, extras)).toBe(hash);
      const parsed = parseAppHash(hash);
      expect(parsed.screen).toBe(screen === 'welcome' ? 'welcome' : screen);
    }
  });

  it('reads EN and lesson hashes after refresh', () => {
    expect(parseAppHash('#/en/romana')).toEqual({
      kind: 'app',
      screen: 'learn',
      navScreen: 'learn',
      extras: { track: 'en', subject: 'romana', grade: '8', chapter: null }
    });
    expect(parseAppHash('#/lectii/matematica/7')).toMatchObject({
      kind: 'app',
      screen: 'learn',
      extras: { subject: 'matematica', grade: '7', track: null }
    });
  });

  it('treats an empty hash as the welcome page', () => {
    expect(parseAppHash('')).toEqual({ kind: 'guest', screen: 'welcome' });
    expect(parseAppHash('#/')).toEqual({ kind: 'guest', screen: 'welcome' });
  });
});
