import { describe, it, expect } from 'vitest';
import { splitLessonParagraphs } from '../frontend/lessonParagraphs.js';
import { grade8Guide } from '../backend/src/data/romana8Litera.js';

describe('lesson paragraphs', () => {
  it('keeps a short block whole and respects blank lines', () => {
    const parts = splitLessonParagraphs('Prima frază este scurtă.\n\nA doua stă singură.');
    expect(parts).toEqual(['Prima frază este scurtă.', 'A doua stă singură.']);
  });

  it('does not cut initials or thousands', () => {
    const text = 'J. K. Rowling a scris despre Hogwarts. I. L. Caragiale a scris o comedie. Expoziția adună 3.000 de ani de haine. Apoi urmează muzeul.';
    const parts = splitLessonParagraphs(text, 40);
    const joined = parts.join(' ');
    expect(parts.some(part => part.includes('J. K. Rowling a scris'))).toBe(true);
    expect(parts.some(part => part.includes('I. L. Caragiale a scris'))).toBe(true);
    expect(joined).toContain('3.000 de ani');
    expect(joined).toBe(text);
  });

  it('breaks a long grade 8 theory into readable paragraphs without dropping words', () => {
    const lesson = grade8Guide().units
      .find(unit => unit.id === 'familia-comunitate')
      .lessons.find(entry => entry.id === 'baltagul');
    const parts = splitLessonParagraphs(lesson.theory);
    expect(parts.length).toBeGreaterThan(3);
    expect(parts.every(part => part.length <= 900)).toBe(true);
    expect(parts.join(' ').replace(/\s+/g, ' ')).toBe(lesson.theory.replace(/\s+/g, ' '));
  });
});
