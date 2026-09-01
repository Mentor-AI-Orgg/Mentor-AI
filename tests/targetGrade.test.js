import { describe, it, expect } from 'vitest';
import { pickPractice } from '../backend/src/data/practicePicker.js';
import { listChapterExercises } from '../backend/src/data/exerciseBank.js';
import { levelPlan, maxLevelForNote, normalizeTargetNote } from '../backend/src/data/targetGrade.js';

describe('desired grade shapes the practice pack', () => {
  it('maps 5–10 to a rising ceiling and keeps a ramp from 1', () => {
    expect(normalizeTargetNote(8)).toBe(8);
    expect(normalizeTargetNote(3)).toBeNull();
    expect(maxLevelForNote(5)).toBe(2);
    expect(maxLevelForNote(10)).toBe(8);
    expect(levelPlan(10, 2)).toEqual([1, 1, 1, 1, 1, 2, 2, 2, 2, 2]);
    expect(levelPlan(7, 7)[0]).toBe(1);
    expect(levelPlan(7, 7)[6]).toBe(7);
  });

  it('keeps a modest target on easy rungs and a 10 on the full climb', () => {
    const modest = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'test',
      count: 10,
      targetNote: 5,
      excludeIds: listChapterExercises('matematica', 5, 'naturale').map(item => item.id)
    });
    expect(modest.cards).toHaveLength(10);
    expect(modest.targetNote).toBe(5);
    expect(modest.cards.every(card => (card.level || 1) <= 2)).toBe(true);
    expect(Math.max(...modest.cards.map(card => card.level || 1))).toBe(2);

    const top = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'test',
      count: 7,
      targetNote: 10,
      excludeIds: listChapterExercises('matematica', 5, 'naturale').map(item => item.id)
    });
    expect(Math.max(...top.cards.map(card => card.level || 1))).toBeGreaterThanOrEqual(6);
  });

  it('does not change the default pack when no target is sent', () => {
    const pack = pickPractice({
      subject: 'matematica',
      grade: 5,
      chapterId: 'naturale',
      kind: 'test',
      count: 7
    });
    expect(pack.cards.map(card => card.level)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(pack.targetNote).toBeNull();
  });
});
