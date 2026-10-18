import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
import { confirmPasswordIssue, shouldKeepUsername } from '../frontend/signupFields.js';

const nodeRequire = createRequire(import.meta.url);
const { usernameIssue, suggestUsernames, takenError } = nodeRequire('../backend/src/safety/usernamePolicy.js');

describe('câmpurile de înscriere', () => {
  it('lasă numele obișnuite și nu golește câmpul când browserul îl șterge dintr-o dată', () => {
    for (const name of ['kitty', 'morcov', 'curcubeu']) {
      expect(usernameIssue(name), name).toBeNull();
    }
    expect(shouldKeepUsername('kitty', '', '')).toBe('kitty');
    expect(shouldKeepUsername('morcov', '', 'insertReplacementText')).toBe('morcov');
    expect(shouldKeepUsername('kitty', '', 'deleteContentBackward')).toBe('');
    expect(shouldKeepUsername('k', '', '')).toBe('');
    expect(suggestUsernames('kitty')).toEqual(['kitty123', 'kitty_10', 'kitty7']);
    expect(takenError('kitty', ['kitty123'])).toBe('Numele kitty e deja folosit, încearcă kitty123.');
  });

  it('spune de ce nu coincid parolele și ignoră spațiul de la capete', () => {
    expect(confirmPasswordIssue('pisica verde sare ', 'pisica verde sare')).toBe('');
    expect(confirmPasswordIssue('pisica verde sare', 'pisica verde sare\u00a0')).toBe('');
    expect(confirmPasswordIssue('pisica verde sare', '')).toMatch(/Confirmarea e goală/);
    expect(confirmPasswordIssue('pisica verde sare', 'alta fraza lung')).toMatch(/nu sunt la fel/);
  });
});
