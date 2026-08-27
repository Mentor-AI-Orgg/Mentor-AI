import { describe, it, expect } from 'vitest';
import { interpolate, resolveUiLocale, translate } from '../frontend/i18n/translate.js';
import ro from '../frontend/i18n/locales/ro.json';
import en from '../frontend/i18n/locales/en.json';

const messages = { ro, en };

describe('i18n', () => {
  it('interpolates placeholders', () => {
    expect(interpolate('Bună, {name}.', { name: 'Ana' })).toBe('Bună, Ana.');
  });

  it('falls back to Romanian for unknown UI locales', () => {
    expect(resolveUiLocale('fr')).toBe('ro');
    expect(translate(messages, 'fr', 'login.submit')).toBe(ro.login.submit);
  });

  it('returns English copy for en', () => {
    expect(translate(messages, 'en', 'login.submit')).toBe('Sign in');
  });
});
