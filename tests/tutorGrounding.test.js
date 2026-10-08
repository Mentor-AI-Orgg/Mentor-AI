import { describe, expect, it } from 'vitest';
import { answerFromLessons } from '../backend/src/mentor/localMentor.js';
import { AWARDS } from '../backend/src/data/progressEngine.js';

function ask(message, subject, grade) {
  return answerFromLessons({ message, subject, grade });
}

describe('tutore local, pe materialul salvat', () => {
  it('explică cmmdc din lecție, și din numele englezesc', () => {
    const ro = ask('explica cmmdc', 'matematica', 6);
    expect(ro.matched).toBe(true);
    expect(ro.text).toMatch(/divizor/i);

    const en = ask('what is the greatest common divisor', 'matematica', 6);
    expect(en.matched).toBe(true);
    expect(en.text).toMatch(/divizor/i);
    expect(en.text).toMatch(/saved in the app/i);
  });

  it('spune de unde vin monedele, cu sumele din aplicație', () => {
    const res = ask('cum castig monede', 'romana', 6);
    expect(res.text).toMatch(/#\/magazin/);
    expect(res.text).toContain(String(AWARDS.login_bonus.coins));
    expect(res.text).toMatch(/nu se cumpără/i);
  });

  it('răspunde la diphthong din lecția de diftong', () => {
    const res = ask('what is a diphthong', 'romana', 6);
    expect(res.matched).toBe(true);
    expect(res.text).toMatch(/diftong/i);
    expect(res.text).toMatch(/silab|semivocal/i);
  });

  it('la clasa a V-a nu inventează teorema lui Pitagora', () => {
    const res = ask('explică-mi teorema lui Pitagora', 'matematica', 5);
    expect(res.matched).toBe(false);
    expect(res.text).toMatch(/nu am găsit|Nu sunt sigură/);
  });

  it('nu calculează ipotenuza și nu dă rezultatul 5', () => {
    const res = ask('Rezolvă: catete 3 și 4, cât e ipotenuza? Dă rezultatul.', 'matematica', 7);
    expect(res.lesson).toMatch(/Pitagora/i);
    expect(res.text).toMatch(/Nu îți calculez/);
    expect(res.text).not.toMatch(/\b5\b/);
    expect(res.text).toMatch(/a\^2 \+ b\^2 = c\^2/);
  });

  it('salută fără să deschidă o lecție', () => {
    const res = ask('ce mai faci tu', 'romana', 6);
    expect(res.matched).toBe(false);
    expect(res.text).toMatch(/lecți/);
    expect(res.text).not.toMatch(/Din lecția/);
  });
});
