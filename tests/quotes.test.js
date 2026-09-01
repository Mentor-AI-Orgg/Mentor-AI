import { describe, it, expect } from 'vitest';
import { QUOTES, formatQuote, quoteFor } from '../backend/src/data/quotes.js';

describe('motivational quotes', () => {
  it('has attributed Romanian quotes', () => {
    expect(QUOTES.length).toBeGreaterThanOrEqual(12);
    QUOTES.forEach(entry => {
      expect(entry.text.length).toBeGreaterThan(8);
      expect(entry.by.length).toBeGreaterThan(2);
    });
    expect(formatQuote(quoteFor(1))).toMatch(/„.*” — /);
  });
});
