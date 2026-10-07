const { grid } = require('./shape');

function g(row) {
  return grid(row);
}

function extraGrids() {
  return [
    g({
      id: 'hx-m5n-13', lesson: 'comparare', level: 1, skill: 'apply', point: 'comparare',
      question: 'Care număr este mai mare: 2 090 sau 2 900?',
      correct: '2 900',
      wrong: ['2 090', 'sunt egale, au tot patru cifre', '2 090, pentru că se termină cu zero'],
      explain: 'Ambele au patru cifre. La sute, 9 este mai mare decât 0, deci 2 900 este mai mare. Zero-ul de la final nu face numărul mai mare.'
    }),
    g({
      id: 'hx-m5f-13', lesson: 'fractie', level: 1, skill: 'apply', point: 'fractie',
      question: 'O pizza este tăiată în 8 felii egale. Mănânci 3. Ce fracție ai mâncat?',
      correct: '3/8',
      wrong: ['8/3', '5/8', '3/5'],
      explain: 'Numitorul spune în câte felii egale este tăiat întregul, deci 8. Numărătorul spune câte ai luat, deci 3. 5/8 este ce a rămas, nu ce ai mâncat.'
    }),
    g({
      id: 'hx-m5g-13', lesson: 'clasificare-unghi', level: 1, skill: 'apply', point: 'unghi',
      question: 'Un unghi de 100° este…',
      correct: 'obtuz',
      wrong: ['ascuțit', 'drept', 'alungit'],
      explain: 'Peste 90° și sub 180° unghiul este obtuz. 100° nu este drept și nu este încă un unghi alungit de 180°.'
    }),
    g({
      id: 'hx-m6m-13', lesson: 'relatii-multimi', level: 1, skill: 'apply', point: 'apartine',
      question: 'A = {2, 5, 8}. Care enunț este adevărat?',
      correct: '5 aparține lui A',
      wrong: ['4 aparține lui A', 'A are patru elemente', '2 nu aparține lui A'],
      explain: '5 este scris în acolade, deci aparține lui A. 4 nu este element. Mulțimea are trei elemente, nu patru.'
    }),
    g({
      id: 'hx-m6p-13', lesson: 'rapoarte', level: 1, skill: 'apply', point: 'raport',
      question: '3 mere costă 6 lei. Cât costă un măr, în lei?',
      correct: '2',
      wrong: ['3', '9', '18'],
      explain: 'Raportul preț pe bucată este 6 : 3 = 2 lei. 9 adună prețul cu numărul de mere. 18 le înmulțește.'
    }),
    g({
      id: 'hx-m6i-13', lesson: 'adunare-intregi', level: 1, skill: 'apply', point: 'adunare',
      question: 'Cât este 4 + (−6)?',
      correct: '−2',
      wrong: ['10', '2', '−10'],
      explain: 'Aduni un negativ: de la 4 te muți 6 pași spre stânga și ajungi la −2. 10 adună modulele. 2 uită semnul direcției.'
    }),
    g({
      id: 'hx-m6t-13', lesson: 'suma-unghiuri', level: 1, skill: 'apply', point: 'suma',
      question: 'Două unghiuri ale unui triunghi au 40° și 65°. Al treilea are…',
      correct: '75°',
      wrong: ['105°', '90°', '80°'],
      explain: 'Suma este 180°. 180 − 40 − 65 = 75. 105 adună cele două unghiuri date în loc să le scadă din 180.'
    }),
    g({
      id: 'hx-m7r-13', lesson: 'radical-patrat', level: 1, skill: 'apply', point: 'radical',
      question: 'Cât este √49?',
      correct: '7',
      wrong: ['49', '14', '8'],
      explain: '7 × 7 = 49, deci √49 = 7. 14 este 7 + 7. Radicalul cere numărul care, înmulțit cu el însuși, dă 49.'
    }),
    g({
      id: 'hx-m7e-13', lesson: 'ecuatie-axb', level: 1, skill: 'apply', point: 'ecuatie',
      question: 'Dacă x + 6 = 10, atunci x este…',
      correct: '4',
      wrong: ['16', '6', '60'],
      explain: 'Scazi 6 din ambele părți: x = 4. 16 adună 6 la 10. 60 le înmulțește.'
    }),
    g({
      id: 'hx-m7d-13', lesson: 'axe', level: 1, skill: 'apply', point: 'coordonate',
      question: 'Punctul (0, 4) stă…',
      correct: 'pe axa Oy',
      wrong: ['pe axa Ox', 'în cadranul al treilea', 'în origine'],
      explain: 'Abscisa 0 îl așază pe Oy, la înălțimea 4. Pe Ox ordonata ar fi 0. Originea este (0, 0).'
    }),
    g({
      id: 'hx-m7g-13', lesson: 'patrulater-convex', level: 1, skill: 'apply', point: 'patrulater',
      question: 'Un patrulater convex are un unghi de 100°. Suma celorlalte trei unghiuri este…',
      correct: '260°',
      wrong: ['360°', '180°', '80°'],
      explain: 'Suma unghiurilor unui patrulater convex este 360°. 360 − 100 = 260. 180 este suma dintr-un triunghi. 80 este 180 − 100, nu 360 − 100.'
    }),
    g({
      id: 'hx-m7g-14', lesson: 'paralelogram', level: 2, skill: 'apply', point: 'unghiuri',
      question: 'Într-un paralelogram un unghi are 70°. Unghiul alăturat lui are…',
      correct: '110°',
      wrong: ['70°', '90°', '140°'],
      explain: 'Unghiurile alăturate dintr-un paralelogram sunt suplementare: 180 − 70 = 110. 70 este unghiul opus, nu cel alăturat. 140 dublează 70.'
    }),
    g({
      id: 'hx-m8i-13', lesson: 'intervale-reale', level: 1, skill: 'apply', point: 'interval',
      question: 'Câte numere întregi sunt în {1, 2, 3, 4}?',
      correct: '4',
      wrong: ['3', '5', '1'],
      explain: 'Mulțimea scrie patru elemente: 1, 2, 3 și 4. Nu numeri doar capetele și nu adaugi un număr care nu este scris.'
    }),
    g({
      id: 'hx-m8a-13', lesson: 'calcule-litere', level: 1, skill: 'apply', point: 'asemenea',
      question: 'Pentru x = 2, cât este 3x?',
      correct: '6',
      wrong: ['5', '8', '9'],
      explain: '3x înseamnă 3 înmulțit cu x. 3 × 2 = 6. 5 adună 3 cu 2. 8 este 4 × 2. 9 este 3 × 3.'
    })
  ];
}

module.exports = { extraGrids };
