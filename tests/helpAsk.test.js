import { describe, expect, it } from 'vitest';
import { hashForRoute, parseAppHash } from '../frontend/appRoutes.js';
import { APP_FAQ, askApp } from '../frontend/help/ask.js';

describe('întrebări despre aplicație, pe dispozitiv', () => {
  it('are răspuns și o rută reală pentru fiecare întrebare', () => {
    expect(APP_FAQ.length).toBeGreaterThanOrEqual(12);
    for (const item of APP_FAQ) {
      expect(item.answer.length).toBeGreaterThan(20);
      const hash = hashForRoute(item.screen, item.extras || {});
      const parsed = parseAppHash(hash);
      expect(parsed.screen).toBe(item.screen);
      if (item.extras?.section) expect(parsed.extras.section).toBe(item.extras.section);
    }
  });

  it('înțelege exemplele fără diacritice și cu greșeli mici', () => {
    expect(askApp('unde sunt setările?').extras.section).toBe('setari');
    expect(askApp('unde sunt setarile').extras.section).toBe('setari');
    expect(askApp('setarille').extras.section).toBe('setari');
    expect(askApp('cum schimb tema?').extras.section).toBe('tema');
    expect(askApp('cum schimb temma').extras.section).toBe('tema');
    expect(askApp('unde e clasamentul?').screen).toBe('home');
    expect(askApp('unde e clasamnetul').screen).toBe('home');
    expect(askApp('cum adaug un prieten?').extras.section).toBe('prieteni');
    expect(askApp('cum adaug un prietn').extras.section).toBe('prieteni');
  });

  it('trimite materia la tutore și nu inventează ecran', () => {
    const mate = askApp('cum se calculează aria cercului?');
    expect(mate.screen).toBe('professor');
    expect(mate.answer).toMatch(/tutore/);
    expect(hashForRoute(mate.screen, mate.extras)).toBe('#/mentor');

    const romana = askApp('ce este o metaforă');
    expect(romana.screen).toBe('professor');

    const miss = askApp('asdf qwerty');
    expect(miss.screen).toBe('');
    expect(miss.answer.length).toBeGreaterThan(20);
    expect(askApp('')).toBeNull();
  });
});
