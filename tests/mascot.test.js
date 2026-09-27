import { describe, expect, it } from 'vitest';
import { AQUA, LIME, MOODS, NAVY, mascotAria, mascotSvg } from '../shared/mascotArt.js';
import { MASCOT_NAME } from '../backend/src/config/mascot.js';

describe('furnicuța', () => {
  it('varianta mare are corpul de furnică și textul 10', () => {
    const svg = mascotSvg({ mood: 'explica', size: 'lg' });
    for (let n = 1; n <= 6; n += 1) expect(svg).toContain(`data-part="picior-${n}"`);
    expect(svg).toContain('data-part="antena-stanga"');
    expect(svg).toContain('data-part="antena-dreapta"');
    expect(svg).toContain('data-part="cap"');
    expect(svg).toContain('data-part="torace"');
    expect(svg).toContain('data-part="abdomen"');
    expect(svg).toContain('data-part="ochelari"');
    expect(svg).toContain('data-part="zece"');
    expect(svg).toContain('>10<');
    expect(svg).toContain(NAVY);
    expect(svg).toContain(AQUA);
    expect(svg).toContain(LIME);
  });

  it('cele 9 stări se desenează și eticheta folosește numele din config', () => {
    expect(MOODS).toHaveLength(9);
    for (const mood of MOODS) {
      const svg = mascotSvg({ mood, size: 'lg' });
      expect(svg).toContain(`mascot-mood-${mood}`);
      expect(svg.length).toBeGreaterThan(80);
    }
    expect(mascotAria(MASCOT_NAME)).toContain(MASCOT_NAME);
    expect(mascotSvg({ size: 'sm' })).toContain('data-part="ochelari"');
    expect(mascotSvg({ size: 'sm' })).not.toContain('data-part="picior-1"');
  });
});
