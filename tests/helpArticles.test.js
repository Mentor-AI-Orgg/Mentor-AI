import { describe, expect, it } from 'vitest';
import { HELP_ARTICLES, HELP_CATEGORIES, searchHelp } from '../frontend/help/articles.js';

describe('panoul de ajutor', () => {
  it('are articole cu titlu și text, grupate pe categorii cunoscute', () => {
    const ids = new Set(HELP_CATEGORIES.map(item => item.id));
    expect(HELP_ARTICLES.length).toBeGreaterThan(5);
    for (const article of HELP_ARTICLES) {
      expect(article.title.length).toBeGreaterThan(3);
      expect(article.body.length).toBeGreaterThan(20);
      expect(ids.has(article.category)).toBe(true);
    }
    expect(HELP_ARTICLES.map(item => item.id)).toEqual(expect.arrayContaining([
      'lectie',
      'caiet',
      'obiectiv',
      'obiectiv-zi',
      'en',
      'telefon'
    ]));
  });

  it('caută fără diacritice și filtrează categoria', () => {
    expect(searchHelp('evaluare').map(item => item.id)).toEqual(['en']);
    expect(searchHelp('zilnic').map(item => item.id)).toEqual(['obiectiv-zi']);
    expect(searchHelp('CAIET', 'ritm').map(item => item.id)).toEqual(['caiet']);
    expect(searchHelp('caiet', 'examen')).toEqual([]);
    expect(searchHelp('').length).toBe(HELP_ARTICLES.length);
  });
});
