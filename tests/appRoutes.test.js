import { describe, it, expect } from 'vitest';
import { hashForRoute, parseAppHash, screenForLoggedOut } from '../frontend/appRoutes.js';

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
      ['profile', { section: 'tema' }, '#/profil/tema'],
      ['profile', { section: 'prieteni' }, '#/profil/prieteni'],
      ['calendar', {}, '#/calendar'],
      ['caiet', {}, '#/caiet'],
      ['ajutor', {}, '#/ajutor'],
      ['mascota', {}, '#/creator/mascota'],
      ['moderare', {}, '#/creator/moderare'],
      ['statistici', {}, '#/creator/statistici'],
      ['learn', {}, '#/lectii'],
      ['learn', { subject: 'romana', grade: '6', chapter: 'fractii' }, '#/lectii/romana/6/fractii'],
      ['learn', { track: 'en', subject: 'matematica' }, '#/en/matematica'],
      ['learn', { subject: 'matematica', grade: '6', chapter: 'naturale', lessonId: 'm5-citire' }, '#/lectii/matematica/6/naturale/lectie-m5-citire'],
      ['start-lesson', {}, '#/incepe'],
      ['quick-start', {}, '#/inceput'],
      ['provocare', {}, '#/provocare'],
      ['progres', {}, '#/progres'],
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
    expect(parseAppHash('#/lectii/matematica/8/algebric/lectie-ecuatie-grad2')).toMatchObject({
      kind: 'app',
      screen: 'learn',
      extras: { subject: 'matematica', grade: '8', chapter: 'algebric', track: null }
    });
    expect(parseAppHash('#lectie-ecuatie-grad2')).toEqual({
      kind: 'anchor',
      screen: null,
      lessonId: 'ecuatie-grad2'
    });
  });

  it('treats an empty hash as the welcome page', () => {
    expect(parseAppHash('')).toEqual({ kind: 'guest', screen: 'welcome' });
    expect(parseAppHash('#/')).toEqual({ kind: 'guest', screen: 'welcome' });
  });

  it('keeps login and register for a logged-out visitor', () => {
    expect(screenForLoggedOut(parseAppHash('#/conectare'))).toBe('login');
    expect(screenForLoggedOut(parseAppHash('#/cont'))).toBe('register');
    expect(screenForLoggedOut(parseAppHash('#/start'))).toBe('welcome');
    expect(screenForLoggedOut(parseAppHash(''))).toBe('welcome');
    expect(screenForLoggedOut(parseAppHash('#/acasa'))).toBe('welcome');
  });

  it('deschide o secțiune reală din profil și ignoră una inventată', () => {
    expect(parseAppHash('#/profil/clasament').extras).toEqual({ section: 'clasament' });
    expect(parseAppHash('#/profil/setari').extras).toEqual({ section: 'setari' });
    expect(parseAppHash('#/profil')).not.toHaveProperty('extras');
    expect(hashForRoute('profile', { section: 'nu-exista' })).toBe('#/profil');
    expect(parseAppHash('#/profil/nu-exista')).not.toHaveProperty('extras');
  });
});
