import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { scoreSet } from '../scripts/tutor-eval.mjs';

describe('setul de întrebări al tutorelui', () => {
  it('răspunde corect la întrebările salvate, fără model plătit', () => {
    const file = new URL('./fixtures/tutor-eval-set.json', import.meta.url);
    const items = JSON.parse(readFileSync(file, 'utf8'));
    const report = scoreSet(items);
    expect(report.failures).toEqual([]);
    expect(report.helpfulRate).toBe(1);
    expect(report.accuracy).toBe(1);
  });
});
