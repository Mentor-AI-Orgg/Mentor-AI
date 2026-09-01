import { describe, it, expect } from 'vitest';
import { QUOTES, GRADE_QUOTES, gradeBand, formatQuote, quoteFor, quoteForGrade } from '../backend/src/data/quotes.js';
import { SLOGANS } from '../frontend/slogans.js';

describe('motivational quotes', () => {
  it('has attributed Romanian quotes', () => {
    expect(QUOTES.length).toBeGreaterThanOrEqual(12);
    QUOTES.forEach(entry => {
      expect(entry.text.length).toBeGreaterThan(8);
      expect(entry.by.length).toBeGreaterThan(2);
    });
    expect(formatQuote(quoteFor(1))).toMatch(/„.*” — /);
  });

  it('picks a quote by the grade the child just got', () => {
    expect(gradeBand(10)).toBe('high');
    expect(gradeBand(8.5)).toBe('good');
    expect(gradeBand(6)).toBe('ok');
    expect(gradeBand(3)).toBe('low');
    expect(GRADE_QUOTES.high).toHaveLength(3);
    expect(quoteForGrade(10, 0).text).toMatch(/ritmul|Succesul|Cunoașterea/);
    expect(quoteForGrade(3, 0).text).toMatch(/învins|eșuat|renunța/i);
    expect(quoteForGrade(10, 0).text).not.toBe(quoteForGrade(3, 0).text);
  });

  it('does not joke that math does not bite on the public site', () => {
    expect(SLOGANS.join(' ')).not.toMatch(/mușcă|musca/i);
  });
});
