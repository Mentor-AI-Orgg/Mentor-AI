import { describe, it, expect } from 'vitest';
import { answerFromLessons } from '../backend/src/mentor/localMentor.js';

function ask(message, subject, grade) {
  return answerFromLessons({ message, subject, grade });
}

const DIFTONG = [
  'diftong',
  'prezintă-mi ce este un diftong',
  'prezinta mi ce este un diftong',
  'ce este un diftong',
  'explică-mi ce este un diftong',
  'explica-mi ce este un diftong',
  'prezintă-mi ce este un diftog',
  'ce este un diftung',
  'nu inteleg ce este un diftong',
  'diftongul'
];

const PROCENT = [
  'procent',
  'prezintă-mi ce este un procent',
  'prezinta mi ce este un procent',
  'ce este un procent',
  'explică-mi ce este un procent',
  'nu inteleg ce este un procent',
  'prezintă-mi ce este un procnet'
];

describe('întrebări spuse în propoziție', () => {
  it.each([6, 7, 8])('română, clasa %s: diftongul din propoziție ajunge la lecția cuvântului', grade => {
    const keyword = ask('diftong', 'romana', grade);
    expect(keyword.matched).toBe(true);
    expect(keyword.text).toMatch(/diftong/i);
    expect(keyword.text).toMatch(/silab|semivocal/i);

    DIFTONG.forEach(message => {
      const result = ask(message, 'romana', grade);
      expect(result.matched, message).toBe(true);
      expect(result.lesson, message).toBe(keyword.lesson);
      expect(result.text, message).toMatch(/diftong/i);
      expect(result.text, message).toMatch(/silab|semivocal/i);
    });
  });

  it('la clasa a V-a nu inventează lecția de diftong, nici din propoziție', () => {
    ['diftong', 'prezintă-mi ce este un diftong', 'ce este un diftong'].forEach(message => {
      const result = ask(message, 'romana', 5);
      expect(result.matched, message).toBe(false);
      expect(result.text).toMatch(/nu am găsit/);
    });
  });

  it.each([5, 6])('matematică, clasa %s: procentul din propoziție ajunge la lecția cuvântului', grade => {
    const keyword = ask('procent', 'matematica', grade);
    expect(keyword.matched).toBe(true);
    expect(keyword.lesson).toMatch(/procent/i);
    expect(keyword.text).toMatch(/procent/i);

    PROCENT.forEach(message => {
      const result = ask(message, 'matematica', grade);
      expect(result.matched, message).toBe(true);
      expect(result.lesson, message).toBe(keyword.lesson);
      expect(result.text, message).toMatch(/procent/i);
    });
  });

  it('matematică: ipotenuza și Pitagora rămân lecția lor și când sunt într-o propoziție', () => {
    const side = ask('ipotenuza', 'matematica', 6);
    const sideSentence = ask('prezintă-mi ce este ipotenuza', 'matematica', 6);
    const sidePlain = ask('ce este o ipotenuză', 'matematica', 6);
    expect(side.matched).toBe(true);
    expect(sideSentence.lesson).toBe(side.lesson);
    expect(sidePlain.lesson).toBe(side.lesson);
    expect(sideSentence.text).toMatch(/ipotenu/i);

    const theorem = ask('pitagora', 'matematica', 7);
    const theoremSentence = ask('explică-mi teorema lui Pitagora', 'matematica', 7);
    const theoremPlain = ask('ce este teorema lui pitagora', 'matematica', 7);
    expect(theorem.matched).toBe(true);
    expect(theoremSentence.lesson).toBe(theorem.lesson);
    expect(theoremPlain.lesson).toBe(theorem.lesson);
    expect(theoremSentence.text).toMatch(/pitagor/i);
  });

  it('matematică, clasele 7 și 8: o propoziție despre fracție nu rămâne fără lecție', () => {
    [7, 8].forEach(grade => {
      const keyword = ask('fracție', 'matematica', grade);
      const sentence = ask('prezintă-mi ce este o fracție', 'matematica', grade);
      const plain = ask('prezinta-mi ce este o fractie', 'matematica', grade);
      expect(keyword.matched).toBe(true);
      expect(sentence.lesson).toBe(keyword.lesson);
      expect(plain.lesson).toBe(keyword.lesson);
      expect(sentence.text).toMatch(/frac/i);
    });
  });

  it('cuvântul de cerere nu mută lecția pe o mențiune întâmplătoare', () => {
    const keyword = ask('ordinal', 'romana', 5);
    const sentence = ask('prezintă-mi ce este un ordinal', 'romana', 5);
    const both = ask('ce este un numeral ordinal', 'romana', 5);
    expect(keyword.matched).toBe(true);
    expect(keyword.lesson).toMatch(/ordinal/i);
    expect(sentence.lesson).toBe(keyword.lesson);
    expect(both.lesson).toBe(keyword.lesson);
  });

  it('o propoziție care nu e de școală nu primește o lecție născocită', () => {
    const noise = [
      'vreau o prajitura cu ciocolata',
      'prezintă-mi ce este un blablabla',
      'asdfgh qwerty'
    ];
    [['romana', 6], ['matematica', 6], ['romana', 8], ['matematica', 5]].forEach(([subject, grade]) => {
      noise.forEach(message => {
        const result = ask(message, subject, grade);
        expect(result.matched, `${subject} ${grade} ${message}`).toBe(false);
      });
    });

    expect(ask('explică-mi teorema lui Pitagora', 'matematica', 5).matched).toBe(false);
    expect(ask('azi e soare afara', 'matematica', 6).matched).toBe(false);
    expect(ask('ce mai faci tu', 'romana', 6).matched).toBe(true);
    expect(ask('azi e soare afara', 'romana', 6).matched).toBe(true);
  });
});
