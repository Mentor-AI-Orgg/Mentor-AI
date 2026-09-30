import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import WelcomeScreen, { contactLink } from '../frontend/components/WelcomeScreen.jsx';
import legal from '../shared/legal.json';

const html = renderToStaticMarkup(createElement(WelcomeScreen, {
  onConnect() {},
  onRegister() {},
  onParent() {}
}));

describe('landing page', () => {
  it('explains the app before asking for an account', () => {
    const required = [
      'Intră în cont',
      'Creează cont',
      'Sunt părinte',
      'Mate și română pentru clasele V–VIII, pe înțelesul tău',
      'Lecții după programa școlară, exerciții și un tutore care te ajută pas cu pas. Gratuit.',
      'Începe gratuit',
      'Puțin în fiecare zi te duce departe',
      'Evaluarea Națională',
      'Profilurile sunt private din start',
      'Nu vindem datele',
      'E gratuit?',
      'De ce trebuie emailul părintelui?',
      'Merge pe telefon?',
      'Ce clase acoperă?'
    ];
    for (const text of required) expect(html).toContain(text);
    expect(html.match(/Începe gratuit/g)).toHaveLength(2);
    expect(html).toContain('href="/confidentialitate"');
    expect(html).toContain('href="/termeni"');
    expect(html).toContain('data-mood="salut"');
    expect(html).toContain('alt="Sunt de 10"');
    expect(html).toContain('src="/emblema.png"');
  });

  it('does not invent numbers or write the mascot name by hand', () => {
    const source = readFileSync(join(import.meta.dirname, '../frontend/components/WelcomeScreen.jsx'), 'utf8');
    expect(source).not.toMatch(/Zecița/);
    expect(html.replace(/aria-label="[^"]*"/g, '').replace(/alt="[^"]*"/g, '')).not.toMatch(/Zecița|Mentor AI|utilizatori|recenzii|elevi activi/i);
    expect(html).not.toMatch(/\d+\s*%/);
    expect(html).not.toContain('[DE COMPLETAT');
  });

  it('links contact only when the operator email is real', () => {
    expect(contactLink(legal.contactEmail)).toBeNull();
    expect(contactLink('parinti@suntde10.ro')).toBe('mailto:parinti@suntde10.ro');
    expect(contactLink('[DE COMPLETAT] parinti@suntde10.ro')).toBeNull();
    expect(html).not.toContain('mailto:');
  });

  it('reserves a full-screen height that follows the phone browser', () => {
    const css = readFileSync(join(import.meta.dirname, '../frontend/styles.css'), 'utf8');
    const start = css.indexOf('.welcome-page {');
    const slice = css.slice(start, start + 220);
    expect(slice).toContain('min-height: 100vh;');
    expect(slice).toContain('min-height: 100dvh;');
  });
});
