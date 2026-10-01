import { describe, it, expect } from 'vitest';
import { getGuide } from '../backend/src/data/gimnaziuGuide.js';

describe('cuprinsul și lecțiile', () => {
  it('la matematică, toc-ul este lista titlurilor, în ordine', () => {
    [5, 6, 7, 8].forEach(grade => {
      getGuide('matematica', grade).units.forEach(unit => {
        const titles = (unit.lessons || []).map(lesson => lesson.title);
        expect(unit.toc, `matematica:${grade}:${unit.id}`).toEqual(titles);
      });
    });
  });

  it('la română, clasele VI–VIII, toc-ul are câte o intrare pe lecție', () => {
    [6, 7, 8].forEach(grade => {
      getGuide('romana', grade).units.forEach(unit => {
        expect((unit.toc || []).length, `romana:${grade}:${unit.id}`).toBe(unit.lessons.length);
      });
    });
  });
});
