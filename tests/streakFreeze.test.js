import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRequire } from 'node:module';

const nodeRequire = createRequire(import.meta.url);
const { dayKey, addDays, weekKey } = nodeRequire('../backend/src/ops/bucharestDay.js');
const { blankGuard, settle, record } = nodeRequire('../backend/src/data/streakFreeze.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');

afterEach(() => {
  vi.useRealTimers();
});

describe('ziua de la București', () => {
  it('ține ziua de calendar, nu pe cea UTC', () => {
    expect(dayKey(new Date('2026-10-14T20:30:00Z'))).toBe('2026-10-14');
    expect(dayKey(new Date('2026-10-14T21:30:00Z'))).toBe('2026-10-15');
    expect(addDays('2026-10-14', -1)).toBe('2026-10-13');
    expect(addDays('2026-03-29', 1)).toBe('2026-03-30');
  });

  it('grupează luni–duminică și schimbă săptămâna lunea următoare', () => {
    expect(weekKey('2026-10-12')).toBe(weekKey('2026-10-18'));
    expect(weekKey('2026-10-14')).toBe(weekKey('2026-10-12'));
    expect(weekKey('2026-10-19')).not.toBe(weekKey('2026-10-18'));
  });
});

describe('înghețarea seriei', () => {
  it('crește doar când termină ceva, o singură dată pe zi', () => {
    const guard = blankGuard();
    record(guard, '2026-10-12');
    record(guard, '2026-10-12');
    expect(guard.count).toBe(1);
    record(guard, '2026-10-13');
    expect(guard.count).toBe(2);
    expect(guard.freezes).toBe(1);
  });

  it('folosește singură înghețarea dacă lipsește exact o zi', () => {
    const guard = blankGuard();
    record(guard, '2026-10-12');
    settle(guard, '2026-10-14');
    expect(guard.count).toBe(1);
    expect(guard.freezes).toBe(0);
    expect(guard.frozenDay).toBe('2026-10-13');
    record(guard, '2026-10-14');
    expect(guard.count).toBe(2);
  });

  it('nu acoperă două zile lipsă și nu dă a doua înghețare în aceeași săptămână', () => {
    const guard = blankGuard();
    record(guard, '2026-10-12');
    settle(guard, '2026-10-15');
    expect(guard.count).toBe(0);
    expect(guard.freezes).toBe(1);

    const once = blankGuard();
    record(once, '2026-10-12');
    settle(once, '2026-10-14');
    record(once, '2026-10-14');
    settle(once, '2026-10-16');
    expect(once.count).toBe(0);
    expect(once.freezes).toBe(0);
  });

  it('dă o înghețare nouă în săptămâna următoare', () => {
    const guard = blankGuard();
    record(guard, '2026-10-12');
    settle(guard, '2026-10-14');
    expect(guard.freezes).toBe(0);
    settle(guard, '2026-10-19');
    expect(guard.freezes).toBe(1);
    expect(guard.count).toBe(0);
  });
});

describe('seria ajunge în rezumat', () => {
  it('numără lecția terminată și aplică înghețarea când elevul revine', () => {
    const email = `serie.${Date.now()}@example.com`;
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-10-12T10:00:00Z'));
    economy.recordProgress({
      userId: email,
      type: 'session_complete',
      trusted: true,
      meta: { subject: 'matematica', grade: '5', chapterId: 'naturale', title: 'Naturale' }
    });
    let summary = economy.getSummary(email);
    expect(summary.completionStreak).toBe(1);
    expect(summary.streakFreezes).toBe(1);

    vi.setSystemTime(new Date('2026-10-14T10:00:00Z'));
    summary = economy.getSummary(email);
    expect(summary.completionStreak).toBe(1);
    expect(summary.streakFreezes).toBe(0);
    expect(summary.streakFrozeYesterday).toBe(true);

    economy.recordProgress({
      userId: email,
      type: 'session_complete',
      trusted: true,
      meta: { subject: 'matematica', grade: '5', chapterId: 'fractii', title: 'Fracții' }
    });
    summary = economy.getSummary(email);
    expect(summary.completionStreak).toBe(2);
  });
});
