import { readFileSync, existsSync } from 'node:fs';
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
  it('folosește ilustrația potrivită pentru fiecare stare mare', () => {
    const html = markup({ mood: 'salut', size: 'lg' });
    expect(html).toContain('src="/mascot/salut.png"');
    expect(html).toContain('data-mood="salut"');
    expect(html).toContain(`alt="${MASCOT_NAME}, furnicuța care te ajută"`);
    expect(markup({ mood: 'mandru', size: 'lg' })).toContain('/mascot/mandru.png');
    expect(markup({ mood: 'gandeste', size: 'md' })).toContain('/mascot/gandeste.png');
    expect(markup({ mood: 'explica', size: 'lg' })).toContain('/mascot/explica.png');
    expect(markup({ mood: 'bucuros', size: 'lg' })).toContain('/mascot/bucuros.png');
    expect(markup({ mood: 'sarbatoare', size: 'lg' })).toContain('/mascot/bucuros.png');
    for (const file of ['salut.png', 'mandru.png', 'gandeste.png', 'explica.png', 'bucuros.png', 'cap.png']) {
      expect(existsSync(join(import.meta.dirname, '../frontend/public/mascot', file))).toBe(true);
    }
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

  it('la 32px rămâne doar capul', () => {
    const html = markup({ mood: 'salut', size: 'sm' });
    expect(html).toContain('src="/mascot/cap.png"');
    expect(html).not.toContain('/mascot/salut.png');
    expect(html).toContain('width="32"');
    expect(markup({ mood: 'explica', size: 'sm', art: 'semnatura' })).toContain('src="/mascot/cap.png"');
  });

  it('bustul de semnătură arată ochelarii, 10 și creionul, cu animație scurtă', () => {
    const html = markup({ mood: 'bucuros', size: 'bust', art: 'semnatura', pulse: 'succes' });
    expect(html).toContain('src="/mascot/explica.png"');
    expect(html).not.toContain('/mascot/bucuros.png');
    expect(html).toContain('width="176"');
    expect(html).toContain('is-succes');
    expect(markup({ mood: 'explica', size: 'bust', pulse: 'gresit' })).toContain('is-gresit');
  });
});
