import { describe, it, expect } from 'vitest';
import { gradeWriting, isWritingItem } from '../backend/src/grading/writingRubric.js';
import { checkExercise, findExercise } from '../backend/src/data/exerciseBank.js';

describe('writing rubric', () => {
  it('marks a thin answer as not yet ready and still returns a teacher barem', () => {
    const exercise = findExercise('e5r3');
    expect(isWritingItem(exercise)).toBe(true);
    const thin = gradeWriting('ghiozdan', exercise);
    expect(thin.ok).toBe(false);
    expect(thin.max).toBe(30);
    expect(thin.criteria).toHaveLength(5);
    expect(thin.criteria.map(row => row.id)).toEqual(['cerinta', 'continut', 'organizare', 'stil', 'corect']);
    expect(thin.teacher).toMatch(/ca la clasă/i);
    expect(thin.teacher).not.toMatch(/dragi colegi|era o zi frumoasă de primăvară/i);
    expect(thin.sampleHint).not.toMatch(/era o zi frumoasă|dragi colegi/i);
  });

  it('scores a developed paragraph higher and can pass', () => {
    const exercise = findExercise('e5r3');
    const developed = gradeWriting(
      'Ghiozdanul a căzut din cuier. Apoi l-am ridicat, pentru că nu voiam să-l calc.',
      exercise
    );
    const thin = gradeWriting('ghiozdan', exercise);
    expect(developed.total).toBeGreaterThan(thin.total);
    expect(developed.ok).toBe(true);
    expect(developed.note10).toBeGreaterThanOrEqual(5);
    expect(developed.criteria.find(row => row.id === 'continut').points).toBeGreaterThan(2);
  });

  it('keeps token answers working and attaches a rubric on long items', () => {
    const ok = checkExercise('e5r3', 'Ghiozdanul a zburat din bancă când am alergat.');
    expect(ok.found).toBe(true);
    expect(ok.ok).toBe(true);
    expect(ok.rubric.criteria.length).toBe(5);
    expect(ok.explain).toMatch(/barem|clasă|cerinț/i);
    expect(ok.sample).not.toMatch(/dragi colegi/i);

    const math = checkExercise('e5n1', '20');
    expect(math.ok).toBe(true);
    expect(math.rubric).toBeNull();
  });
});
