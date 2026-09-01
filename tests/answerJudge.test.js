import { describe, it, expect } from 'vitest';
import { judgeAnswer, letterOfChoice, numberHit } from '../backend/src/grading/answerJudge.js';
import { checkExercise } from '../backend/src/data/exerciseBank.js';
import { getBundle, recommendedList, scoreAttempt } from '../backend/src/data/enPaperFactory.js';

describe('intelligent barem', () => {
  it('accepts units, x = …, comma and fraction as the same result', () => {
    const lei = checkExercise('e5n1', '20 lei');
    expect(lei.ok).toBe(true);
    expect(lei.verdict).toBe('equivalent');
    expect(lei.explain).toMatch(/punctat/i);

    const unknown = checkExercise('e6i3', 'x = 3');
    expect(unknown.ok).toBe(true);
    expect(unknown.verdict).toBe('equivalent');

    const comma = checkExercise('e5g2', '8,5');
    expect(comma.ok).toBe(true);

    const fraction = checkExercise('e5g2', '17/2');
    expect(fraction.ok).toBe(true);
    expect(fraction.explain).toMatch(/fracție|virgulă|aceeași|altă/i);
  });

  it('does not mark a near miss as correct and explains the barem', () => {
    const near = checkExercise('e5n1', '21');
    expect(near.ok).toBe(false);
    expect(near.credit).toBe(0);
    expect(near.verdict).toBe('near');
    expect(near.explain).toMatch(/nu am punctat/i);
    expect(near.explain).toMatch(/20/);
  });

  it('keeps the exact key working and rejects a real miss', () => {
    expect(checkExercise('e5n1', '20').ok).toBe(true);
    expect(checkExercise('e5n1', '20').verdict).toBe('exact');
    const miss = checkExercise('e5n1', '4');
    expect(miss.ok).toBe(false);
    expect(miss.explain).toMatch(/nu am punctat/i);
    expect(miss.explain).toMatch(/20/);
  });

  it('accepts the text of the correct EN choice, not only the letter', () => {
    const paper = recommendedList('matematica')[0];
    const bundle = getBundle(paper.id);
    const item = paper.blocks[0].items.find(row => row.n === 1);
    const letter = bundle.barem['Subiectul I:1'].letter;
    const choice = item.choices['ABCD'.indexOf(letter)];
    const score = scoreAttempt(paper.id, [
      { block: 'Subiectul I', n: 1, text: choice }
    ]);
    const row = score.items.find(entry => entry.n === 1);
    expect(row.ok).toBe(true);
    expect(['exact', 'equivalent']).toContain(row.verdict);
    expect(row.points).toBe(item.points);
    expect(row.explain).toMatch(/punctat/i);

    const money = paper.blocks[0].items.find(entry => entry.n === 2);
    const moneyLetter = bundle.barem['Subiectul I:2'].letter;
    const moneyChoice = money.choices['ABCD'.indexOf(moneyLetter)];
    const onlyNumber = String(moneyChoice).replace(/[^\d.,-]/g, '');
    const moneyScore = scoreAttempt(paper.id, [
      { block: 'Subiectul I', n: 2, text: onlyNumber }
    ]);
    const moneyRow = moneyScore.items.find(entry => entry.n === 2);
    expect(moneyRow.ok).toBe(true);
    expect(moneyRow.verdict).toBe('equivalent');
  });

  it('rejects a wrong EN value and tells the child why', () => {
    const score = scoreAttempt('en-mate-a', [
      { block: 'Subiectul I', n: 1, text: '99' }
    ]);
    const row = score.items.find(entry => entry.n === 1);
    expect(row.ok).toBe(false);
    expect(row.points).toBe(0);
    expect(row.explain).toMatch(/nu am punctat/i);
  });

  it('maps a typed choice onto A–D', () => {
    expect(letterOfChoice(['14', '15', '17', '23'], '15')).toBe('B');
    expect(letterOfChoice(['14', '15', '17', '23'], 'b')).toBe('B');
    expect(numberHit('8,5 cm', 8.5)).toBe(true);
    const judged = judgeAnswer({
      given: '{4, 8}',
      answers: ['4 și 8', '{4,8}'],
      tokens: ['4', '8']
    });
    expect(judged.ok).toBe(true);
  });
});
