import { describe, expect, it } from 'vitest';
import { WEEKLY_TARGET, weeklyGoalFrom } from '../frontend/weeklyGoal.js';

describe('obiectivul săptămânii', () => {
  const wednesday = new Date('2026-09-30T12:00:00Z');

  it('numără doar zilele din săptămâna curentă, de luni', () => {
    const goal = weeklyGoalFrom([
      '2026-09-27',
      '2026-09-28',
      '2026-09-29',
      '2026-09-30'
    ], wednesday);
    expect(goal.week).toBe('2026-09-28');
    expect(goal.target).toBe(WEEKLY_TARGET);
    expect(goal.done).toBe(3);
    expect(goal.reached).toBe(false);
    expect(goal.days.filter(day => day.on).map(day => day.key)).toEqual([
      '2026-09-28',
      '2026-09-29',
      '2026-09-30'
    ]);
  });

  it('marchează obiectivul atins la 4 zile', () => {
    const goal = weeklyGoalFrom([
      '2026-09-28',
      '2026-09-29',
      '2026-09-30',
      '2026-10-01'
    ], wednesday);
    expect(goal.done).toBe(4);
    expect(goal.reached).toBe(true);
  });
});
