import { describe, expect, it } from 'vitest';
import { rate, buildDeck, replayOnce, addDays, STUDY_GAPS } from '../backend/src/data/spacedRepetition.js';

const TODAY = '2026-10-01';

describe('repetarea spațiată a cardurilor', () => {
  it('pune cardul nou în cutia 2 dacă îl știai și în cutia 1 altfel', () => {
    const knew = rate({}, 'stiam', TODAY);
    expect(knew.b).toBe(2);
    expect(knew.due).toBe(addDays(TODAY, STUDY_GAPS[2]));
    const missed = rate({}, 'nu', TODAY);
    expect(missed.b).toBe(1);
    expect(missed.due).toBe(addDays(TODAY, 1));
    expect(missed.w).toBe(1);
    const close = rate({}, 'aproape', TODAY);
    expect(close.b).toBe(1);
    expect(close.due).toBe(addDays(TODAY, 1));
  });

  it('urcă la știut, rămâne la aproape și cade la nu, cu plafonul 5', () => {
    let card = { b: 1, due: TODAY, n: 1, w: 0, last: TODAY };
    card = rate(card, 'stiam', TODAY);
    expect(card.b).toBe(2);
    expect(card.due).toBe(addDays(TODAY, 3));
    card = rate({ ...card, b: 3 }, 'aproape', TODAY);
    expect(card.b).toBe(3);
    expect(card.due).toBe(addDays(TODAY, 1));
    card = rate({ b: 4, due: TODAY, n: 3, w: 0 }, 'nu', TODAY);
    expect(card.b).toBe(1);
    expect(card.w).toBe(1);
    const top = rate({ b: 5, due: TODAY, n: 8, w: 0 }, 'stiam', TODAY);
    expect(top.b).toBe(5);
    expect(top.due).toBe(addDays(TODAY, 60));
  });

  it('în modul extra, știam nu urcă, iar nu coboară în cutia 1', () => {
    const kept = rate({ b: 2, due: '2026-10-20', n: 1, w: 0 }, 'stiam', TODAY, 'extra');
    expect(kept.b).toBe(2);
    expect(kept.due).toBe('2026-10-20');
    const dropped = rate({ b: 3, due: '2026-10-20', n: 1, w: 0 }, 'nu', TODAY, 'extra');
    expect(dropped.b).toBe(1);
    expect(dropped.due).toBe(addDays(TODAY, 1));
  });

  it('dă întâi cardurile scadente, apoi cel mult 8 noi', () => {
    const cards = [
      { id: 'new-1', lesson: 'comparare' },
      { id: 'due-1', lesson: 'comparare' },
      { id: 'later-1', lesson: 'comparare' }
    ];
    const boxes = {
      'due-1': { b: 1, due: '2026-09-30' },
      'later-1': { b: 2, due: '2026-10-20' }
    };
    const deck = buildDeck({ cards, boxes, today: TODAY, mode: 'lesson' });
    expect(deck.map(card => card.id)).toEqual(['due-1', 'new-1']);
    const many = Array.from({ length: 12 }, (_, index) => ({ id: `n${index}`, lesson: 'comparare' }));
    expect(buildDeck({ cards: many, boxes: {}, today: TODAY, mode: 'lesson' })).toHaveLength(8);
  });

  it('amestecă capitolul pe lecții, nu ia 20 din prima', () => {
    const cards = [];
    for (let i = 0; i < 10; i += 1) cards.push({ id: `a${i}`, lesson: 'comparare' });
    for (let i = 0; i < 10; i += 1) cards.push({ id: `b${i}`, lesson: 'adunare' });
    const deck = buildDeck({ cards, boxes: {}, today: TODAY, mode: 'chapter' });
    expect(deck).toHaveLength(8);
    expect(deck.filter(card => card.lesson === 'comparare').length).toBe(4);
    expect(deck.filter(card => card.lesson === 'adunare').length).toBe(4);
    expect(deck[0].lesson).not.toBe(deck[1].lesson);
  });

  it('readuce cardul cu nu o singură dată în sesiune', () => {
    const card = { id: 'c5n-comparare-1', lesson: 'comparare' };
    const once = replayOnce([{ id: 'altul' }], card, 'nu');
    expect(once.map(item => item.id)).toEqual(['altul', 'c5n-comparare-1']);
    expect(once[1].replayed).toBe(true);
    const twice = replayOnce(once.slice(1), once[1], 'nu');
    expect(twice.filter(item => item.id === 'c5n-comparare-1')).toHaveLength(1);
    expect(replayOnce([{ id: 'altul' }], card, 'stiam')).toHaveLength(1);
  });
});
