import { describe, expect, it } from 'vitest';
import { MASCOT_MESSAGES, emojiCount } from '../frontend/i18n/mascotMessages.js';
import { reactTo, resetMascotFeed } from '../frontend/mascot/mascotEvents.js';

describe('mesajele furnicuței', () => {
  it('fiecare categorie are două mesaje, fără nume scris și cu cel mult un emoji', () => {
    const keys = Object.keys(MASCOT_MESSAGES);
    expect(keys.length).toBeGreaterThanOrEqual(14);
    for (const pack of Object.values(MASCOT_MESSAGES)) {
      expect(pack.lines.length).toBeGreaterThanOrEqual(2);
      for (const line of pack.lines) {
        expect(line).not.toMatch(/Zecița|deștept|deșteaptă/);
        expect(emojiCount(line)).toBeLessThanOrEqual(1);
      }
    }
  });

  it('nu repetă mesajul și nu grăbește exercițiile', () => {
    resetMascotFeed();
    const first = reactTo('raspuns_corect', {}, 1_000);
    const second = reactTo('raspuns_corect', {}, 2_000);
    const later = reactTo('raspuns_corect', {}, 12_000);
    expect(first.message).toBeTruthy();
    expect(second).toBeNull();
    expect(later.message).not.toBe(first.message);
    const again = reactTo('raspuns_gresit', { attempt: 2, hint: 'uită-te la semn' }, 30_000);
    expect(again.mood).toBe('explica');
    expect(again.message).toContain('uită-te la semn');
  });
});
