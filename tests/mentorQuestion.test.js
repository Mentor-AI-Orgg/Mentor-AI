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
    const hello = ask('ce mai faci tu', 'romana', 6);
    expect(hello.matched).toBe(false);
    expect(hello.text).toMatch(/lecți/);
    expect(hello.text).not.toMatch(/Din lecția/);
    expect(ask('azi e soare afara', 'romana', 6).matched).toBe(true);
  });
});

function continueChat(message, prior, subject, grade) {
  const history = Array.isArray(prior) ? prior : [{ role: 'user', content: prior }];
  return answerFromLessons({ message, subject, grade, history });
}

describe('urmăriri scurte, în aceeași temă', () => {
  const topic = 'prezintă-mi ce este un diftong';

  it('după diftong, „dă-mi un exemplu” rămâne la diftong', () => {
    const opened = ask(topic, 'romana', 6);
    expect(opened.matched).toBe(true);

    ['dă-mi un exemplu', 'da mi un exemplu', 'da-mi un exemplu', 'da mi un exemlu'].forEach(message => {
      const result = continueChat(message, topic, 'romana', 6);
      expect(result.matched, message).toBe(true);
      expect(result.lesson, message).toBe(opened.lesson);
      expect(result.text, message).toMatch(/exemplu/i);
      expect(result.text, message).toMatch(/diftong/i);
      expect(result.text, message).toMatch(/c[aâ]ine|âi/i);
      expect(result.text, message).not.toMatch(/Însușirea și șirul/);
    });
  });

  it('mai cere un exemplu sau o explicație scurtă, tot despre diftong', () => {
    const opened = ask(topic, 'romana', 6);
    const another = continueChat('mai dă un exemplu', topic, 'romana', 6);
    const other = continueChat('alt exemplu', topic, 'romana', 6);
    const again = continueChat('încă un exemplu', [
      { role: 'user', content: topic },
      { role: 'assistant', content: opened.text },
      { role: 'user', content: 'dă-mi un exemplu' }
    ], 'romana', 6);
    const shorter = continueChat('explică mai pe scurt', topic, 'romana', 6);
    const plain = continueChat('explica mai pe scurt', topic, 'romana', 6);
    const how = continueChat('cum se folosește', topic, 'romana', 6);

    [another, other, again].forEach(result => {
      expect(result.matched).toBe(true);
      expect(result.lesson).toBe(opened.lesson);
      expect(result.text).toMatch(/diftong/i);
      expect(result.text).toMatch(/exemplu/i);
    });
    expect(another.text).not.toBe(continueChat('dă-mi un exemplu', topic, 'romana', 6).text);

    expect(shorter.matched).toBe(true);
    expect(shorter.lesson).toBe(opened.lesson);
    expect(shorter.text).toMatch(/pe scurt/i);
    expect(shorter.text).toMatch(/diftong/i);
    expect(shorter.text).toMatch(/semivocal|silab/i);
    expect(shorter.text.length).toBeLessThan(opened.text.length);
    expect(plain.lesson).toBe(opened.lesson);

    expect(how.matched).toBe(true);
    expect(how.lesson).toBe(opened.lesson);
    expect(how.text).toMatch(/folosește|câine|caine|despărț|despart/i);
  });

  it('aceeași urmare merge și la procent, pe lecția de matematică', () => {
    const opened = ask('prezintă-mi ce este un procent', 'matematica', 6);
    const example = continueChat('da mi un exemplu', 'ce este un procent', 'matematica', 6);
    const shorter = continueChat('mai pe scurt', 'procent', 'matematica', 6);
    expect(opened.matched).toBe(true);
    expect(example.lesson).toBe(opened.lesson);
    expect(example.text).toMatch(/20%|80/);
    expect(example.text).toMatch(/procent/i);
    expect(shorter.lesson).toBe(opened.lesson);
    expect(shorter.text).toMatch(/pe scurt/i);
    expect(shorter.text).toMatch(/100/);
  });

  it('fără temă anterioară nu inventează lecția din cuvântul de cerere', () => {
    ['dă-mi un exemplu', 'da mi un exemplu', 'mai dă un exemplu', 'alt exemplu', 'explică mai pe scurt', 'cum se folosește', ''].forEach(message => {
      const result = ask(message, 'romana', 6);
      expect(result.matched, message || '(gol)').toBe(false);
      expect(result.text, message || '(gol)').toMatch(/Spune cu un cuvânt/);
      expect(result.text, message || '(gol)').not.toMatch(/Însușirea|învățătură scurtă|Autor, narator/);
    });
  });

  it('o prostie sau o temă nouă nu rămâne lipită de diftong', () => {
    const noise = continueChat('vreau o prajitura cu ciocolata', topic, 'romana', 6);
    expect(noise.matched).toBe(false);
    expect(noise.text).toMatch(/nu am găsit/);

    const unknown = continueChat('dă-mi un exemplu de blablabla', topic, 'romana', 6);
    expect(unknown.matched).toBe(false);

    const named = continueChat('ce este un exemplu', topic, 'romana', 6);
    expect(named.lesson).not.toBe('Diftong, triftong, hiat');

    const switched = continueChat('dă-mi un exemplu', [
      { role: 'user', content: topic },
      { role: 'user', content: 'ce este un omonim' }
    ], 'romana', 6);
    expect(switched.matched).toBe(true);
    expect(switched.lesson).toMatch(/omonim/i);
    expect(switched.text).toMatch(/omonim/i);
  });

  it('ține lecția și când în istoric a rămas doar răspunsul tutorelui', () => {
    const opened = ask(topic, 'romana', 6);
    const result = continueChat('mai dă un exemplu', [
      { role: 'assistant', content: opened.text, metadata: { lessonId: opened.lessonId } }
    ], 'romana', 6);
    expect(result.matched).toBe(true);
    expect(result.lesson).toBe(opened.lesson);
    expect(result.text).toMatch(/diftong/i);
  });

  it('la clasa a V-a, diftongul tot nu se inventează dintr-o urmare', () => {
    const result = continueChat('dă-mi un exemplu', topic, 'romana', 5);
    expect(result.matched).toBe(false);
    expect(result.text).toMatch(/Spune cu un cuvânt/);
  });
});

function pressUnclear(seed, times, subject, grade, phrase = 'Nu am înțeles') {
  const history = Array.isArray(seed)
    ? seed.map((item) => ({ ...item }))
    : [{ role: 'user', content: seed }];
  const replies = [];
  for (let index = 0; index < times; index += 1) {
    const result = answerFromLessons({ message: phrase, subject, grade, history });
    replies.push(result);
    history.push({ role: 'user', content: phrase });
    history.push({
      role: 'assistant',
      content: result.text,
      metadata: { lessonId: result.lessonId || '' }
    });
  }
  return replies;
}

describe('„Nu am înțeles” rămâne la lecție și coboară', () => {
  const topic = 'prezintă-mi ce este un diftong';

  it('după diftong, prima apăsare explică aceeași lecție mai simplu', () => {
    const opened = ask(topic, 'romana', 6);
    const [first] = pressUnclear(topic, 1, 'romana', 6);
    const plain = continueChat('nu am inteles', topic, 'romana', 6);

    expect(opened.matched).toBe(true);
    expect(first.matched).toBe(true);
    expect(first.lesson).toBe(opened.lesson);
    expect(first.lessonId).toBe(opened.lessonId);
    expect(first.text).toMatch(/diftong/i);
    expect(first.text).toMatch(/pași mici|în regulă/i);
    expect(first.text).toMatch(/exemplu mic/i);
    expect(first.text.length).toBeLessThan(opened.text.length);
    expect(first.text).not.toMatch(/Însușirea și șirul|Legenda și valoarea/);
    expect(plain.lesson).toBe(opened.lesson);
    expect(plain.text).toMatch(/diftong/i);
  });

  it('a doua și a treia apăsare rămân la diftong și nu se repetă', () => {
    const opened = ask(topic, 'romana', 6);
    const [first, second, third, fourth] = pressUnclear(
      [
        { role: 'user', content: topic },
        { role: 'assistant', content: opened.text, metadata: { lessonId: opened.lessonId } }
      ],
      4,
      'romana',
      6
    );

    [first, second, third, fourth].forEach((result) => {
      expect(result.matched).toBe(true);
      expect(result.lesson).toBe(opened.lesson);
      expect(result.text).toMatch(/diftong/i);
      expect(result.text).toMatch(/Rămânem la aceeași lecție/);
      expect(result.text.length).toBeLessThan(opened.text.length);
    });
    expect(second.text.length).toBeLessThan(first.text.length);
    expect(third.text.length).toBeLessThan(second.text.length);
    expect(new Set([first.text, second.text, third.text, fourth.text]).size).toBe(4);
    expect(third.text).toMatch(/Adică/);
    expect(third.text).toMatch(/c[aâ]i-ne/);
    expect(fourth.text).toMatch(/Altă privire/);
    expect(fourth.text).not.toMatch(/Grupul âi este diftongul/);
  });

  it('aceeași coborâre merge și la procent', () => {
    const opened = ask('prezintă-mi ce este un procent', 'matematica', 6);
    const [first, second, third] = pressUnclear(
      'ce este un procent',
      3,
      'matematica',
      6,
      'nu am inteles'
    );

    expect(opened.matched).toBe(true);
    expect(first.lesson).toBe(opened.lesson);
    expect(second.lesson).toBe(opened.lesson);
    expect(third.lesson).toBe(opened.lesson);
    [first, second, third].forEach((result) => {
      expect(result.text).toMatch(/procent/i);
      expect(result.text.length).toBeLessThan(opened.text.length);
    });
    expect(second.text.length).toBeLessThan(first.text.length);
    expect(new Set([first.text, second.text, third.text]).size).toBe(3);
  });

  it('fără temă anterioară nu inventează o lecție', () => {
    ['Nu am înțeles', 'nu am inteles', 'nu inteleg', ''].forEach((message) => {
      const result = ask(message, 'romana', 6);
      expect(result.matched, message || '(gol)').toBe(false);
      expect(result.text).toMatch(/Spune cu un cuvânt/);
      expect(result.text).not.toMatch(/Diftong, triftong|Procente|Însușirea/);
    });
  });

  it('după o prostie sau la clasa a V-a tot nu născocește diftongul', () => {
    const noise = continueChat('Nu am înțeles', 'vreau o prajitura cu ciocolata', 'romana', 6);
    expect(noise.matched).toBe(false);
    expect(noise.text).toMatch(/Spune cu un cuvânt|nu am găsit/);
    expect(noise.text).not.toMatch(/Diftong, triftong/);

    const early = continueChat('Nu am înțeles', topic, 'romana', 5);
    expect(early.matched).toBe(false);
    expect(early.text).toMatch(/Spune cu un cuvânt/);
  });

  it('după un răspuns fără lecție nu simplifică lecția mai veche', () => {
    const opened = ask(topic, 'romana', 6);
    const unmatched = ask('vreau o prajitura cu ciocolata', 'romana', 6);
    expect(opened.matched).toBe(true);
    expect(unmatched.matched).toBe(false);

    const unclear = continueChat(
      'Nu am înțeles',
      [
        { role: 'user', content: topic },
        { role: 'assistant', content: opened.text, metadata: { lessonId: opened.lessonId } },
        { role: 'user', content: 'vreau o prajitura cu ciocolata' },
        { role: 'assistant', content: unmatched.text, metadata: { lessonId: '' } }
      ],
      'romana',
      6
    );

    expect(unclear.matched).toBe(false);
    expect(unclear.lesson).toBeUndefined();
    expect(unclear.lessonId).toBeUndefined();
    expect(unclear.text).toMatch(/Nu am ce să simplific/);
    expect(unclear.text).toMatch(/Spune cu un cuvânt/);
    expect(unclear.text).not.toMatch(/Diftong/);
    expect(unclear.text).not.toMatch(/Rămânem la aceeași lecție/);
    expect(unclear.text).not.toBe(opened.text);
  });

  it('după o temă nouă, coborârea rămâne la tema nouă', () => {
    const switched = continueChat(
      'Nu am înțeles',
      [
        { role: 'user', content: topic },
        { role: 'user', content: 'ce este un omonim' }
      ],
      'romana',
      6
    );
    expect(switched.matched).toBe(true);
    expect(switched.lesson).toMatch(/omonim/i);
    expect(switched.text).toMatch(/omonim/i);
    expect(switched.text).not.toMatch(/Diftong, triftong/);
  });
});
