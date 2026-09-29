import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Mascota, { MOODS } from '../frontend/components/mascot/Mascota.jsx';
import { MASCOT_NAME } from '../frontend/config/mascot.js';

function markup(props) {
  return renderToStaticMarkup(createElement(Mascota, props));
}

describe('furnicuța', () => {
  it('desenează corpul mare cu șase picioare și zece pe abdomen', () => {
    const html = markup({ mood: 'salut', size: 'lg' });
    expect(html.match(/data-part="picior-/g)).toHaveLength(6);
    expect(html.match(/data-part="antena-/g)).toHaveLength(2);
    expect(html).toContain('data-part="cap"');
    expect(html).toContain('data-part="torace"');
    expect(html).toContain('data-part="abdomen"');
    expect(html).toContain('data-part="ochelari"');
    expect(html).toContain('>10<');
    expect(html).toContain('#091C3C');
    expect(html).toContain('#44D6D7');
    expect(html).toContain('#93FC09');
    expect(html).toContain(`aria-label="${MASCOT_NAME}, furnicuța care te ajută"`);
  });

  it('randează fiecare stare fără numele scris direct în componentă', () => {
    for (const mood of MOODS) {
      const html = markup({ mood, size: 'lg', message: 'Salut.' });
      expect(html).toContain(`data-mood="${mood}"`);
      expect(html).toContain(MASCOT_NAME);
      expect(html).toContain('aria-live="polite"');
    }
    const source = readFileSync(join(import.meta.dirname, '../frontend/components/mascot/Mascota.jsx'), 'utf8');
    expect(source).not.toContain('Zecița');
  });

  it('la 32px rămâne doar capul, cu ochelari și antene', () => {
    const html = markup({ mood: 'salut', size: 'sm' });
    expect(html).not.toContain('data-part="picior-1"');
    expect(html).toContain('data-part="cap"');
    expect(html).toContain('data-part="ochelari"');
    expect(html).toContain('data-part="antena-stanga"');
    expect(html).toContain('width="32"');
  });
});
