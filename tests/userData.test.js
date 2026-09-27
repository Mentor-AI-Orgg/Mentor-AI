import { describe, expect, it } from 'vitest';
import { cleanStoredUser, toStoredUser } from '../frontend/userData.js';

describe('localStorage fără date personale', () => {
  it('nu salvează email, telefon, școală sau nume', () => {
    const stored = toStoredUser({
      email: 'copil@example.com',
      phone: '0712345678',
      parentEmail: 'parinte@example.com',
      school: 'Școala Veche',
      name: 'Ion',
      surname: 'Popescu',
      fullName: 'Ion Popescu',
      class: '6',
      themeId: 'noapte',
      isLoggedIn: true,
      username: 'ionel'
    });
    expect(stored.email).toBeUndefined();
    expect(stored.phone).toBeUndefined();
    expect(stored.parentEmail).toBeUndefined();
    expect(stored.school).toBeUndefined();
    expect(stored.name).toBeUndefined();
    expect(stored.fullName).toBeUndefined();
    expect(stored.class).toBe('6');
    expect(stored.themeId).toBe('noapte');
    expect(stored.isLoggedIn).toBe(true);
    expect(stored.username).toBe('ionel');
  });

  it('curăță cheile vechi la încărcare', () => {
    const cleaned = cleanStoredUser({
      email: 'copil@example.com',
      phone: '0712345678',
      parentEmail: 'parinte@example.com',
      school: 'Școala Veche',
      name: 'Ion',
      class: '7',
      themeId: 'zi'
    });
    expect(cleaned.email).toBeUndefined();
    expect(cleaned.phone).toBeUndefined();
    expect(cleaned.parentEmail).toBeUndefined();
    expect(cleaned.school).toBeUndefined();
    expect(cleaned.name).toBeUndefined();
    expect(cleaned.class).toBe('7');
    expect(cleaned.themeId).toBe('zi');
  });
});
