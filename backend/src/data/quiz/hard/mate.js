const { grid, numExam, exam } = require('./shape');

function g(row) {
  return grid(row);
}

function n(row) {
  return numExam(row);
}

function naturale() {
  const flashcards = [
    g({
      id: 'hx-m5n-01', lesson: 'comparare', level: 2, skill: 'apply', point: 'comparare',
      question: 'Care număr este mai mare: 4 098 sau 4 189?',
      correct: '4 189',
      wrong: ['4 098', 'sunt egale, au același număr de cifre', '4 098, pentru că se termină cu o cifră mai mare'],
      explain: 'Ambele au 4 cifre, deci compari de la stânga. La sute, 1 este mai mare decât 0, deci 4 189 > 4 098. Ultima cifră nu decide.'
    }),
    g({
      id: 'hx-m5n-02', lesson: 'criterii-2510', level: 4, skill: 'trap', point: 'divizibilitate',
      question: 'Care afirmație este adevărată?',
      correct: 'Orice număr divizibil cu 2 și cu 5 este divizibil cu 10.',
      wrong: [
        'Un număr divizibil cu 10 poate să nu fie divizibil cu 2.',
        '25 se împarte exact la 2, pentru că se termină cu 5.',
        '14 se împarte exact la 5, pentru că este par.'
      ],
      explain: '2 și 5 sunt prime între ele, deci cine se împarte și la 2, și la 5 se împarte la 10. Celelalte trei enunțuri răstoarnă criteriul.'
    }),
    g({
      id: 'hx-m5n-03', lesson: 'criterii-39', level: 5, skill: 'analyze', point: 'div3',
      question: 'Care număr se împarte exact la 3, dar nu se împarte exact la 9?',
      correct: '24',
      wrong: ['18', '27', '45'],
      explain: 'Suma cifrelor lui 24 este 6: se împarte la 3, nu la 9. La 18, 27 și 45 suma cifrelor este 9 sau 18, deci se împart și la 9.'
    }),
    g({
      id: 'hx-m5n-04', lesson: 'prime', level: 4, skill: 'false', point: 'prime',
      question: 'Care enunț este fals?',
      correct: '1 este număr prim, pentru că se împarte doar la 1.',
      wrong: [
        '2 este singurul număr prim par.',
        '9 este număr compus: 9 = 3 × 3.',
        '4 are și alți divizori în afară de 1 și el însuși.'
      ],
      explain: 'Un număr prim are exact doi divizori distincți: 1 și el. 1 are un singur divizor, deci nu este prim. Celelalte trei enunțuri sunt adevărate.'
    }),
    g({
      id: 'hx-m5n-05', lesson: 'putere', level: 6, skill: 'trap', point: 'puteri',
      question: 'Cât face 3⁴ − 4³?',
      correct: '17',
      wrong: ['0', '69', '145'],
      explain: '3⁴ = 81 și 4³ = 64, deci 81 − 64 = 17. 0 iese dacă înmulțești baza cu exponentul. 69 iese dacă iei 4³ ca 4 × 3. 145 iese dacă aduni pătratele în loc să le scazi.'
    }),
    g({
      id: 'hx-m5n-06', lesson: 'ordine', level: 6, skill: 'trap', point: 'ordine',
      question: 'Cât face 4 + 6 × 3 − 8 : 2?',
      correct: '18',
      wrong: ['11', '26', '7'],
      explain: 'Întâi înmulțirea și împărțirea: 6 × 3 = 18 și 8 : 2 = 4. Apoi 4 + 18 − 4 = 18. 11 iese dacă lucrezi doar de la stânga la dreapta. 26 iese din (4 + 6) × 3 − 4. 7 iese dacă scazi 8 înainte de împărțire.'
    }),
    g({
      id: 'hx-m5n-07', lesson: 'impartire-rest', level: 7, skill: 'apply', point: 'rest',
      question: 'Împarți 100 la 7. Care pereche este corectă?',
      correct: 'cât 14, rest 2',
      wrong: ['cât 14, rest 1', 'cât 13, rest 9', 'cât 15, rest 5'],
      explain: '7 × 14 = 98 și 100 − 98 = 2, iar restul este mai mic decât împărțitorul. 13 × 7 = 91 lasă rest 9. 15 × 7 = 105 trece de 100.'
    }),
    g({
      id: 'hx-m5n-08', lesson: 'aproximari', level: 3, skill: 'trap', point: 'rotunjire',
      question: 'Rotunjești 3 462 la sute. Ce obții?',
      correct: '3 500',
      wrong: ['3 400', '3 460', '3 000'],
      explain: 'Cifra sutelor este 4, iar imediat la dreapta este 6, deci rotunjești prin adaos: 3 500. 3 400 ignoră pe 6. 3 460 este rotunjire la zeci, nu la sute.'
    }),
    g({
      id: 'hx-m5n-09', lesson: 'patrat-perfect', level: 5, skill: 'analyze', point: 'patrat',
      question: 'Care număr este pătrat perfect?',
      correct: '49',
      wrong: ['48', '50', '45'],
      explain: '7 × 7 = 49. 48, 50 și 45 stau lângă un pătrat, dar nu sunt pătrate: între 6² = 36 și 8² = 64 nu mai este alt pătrat decât 49.'
    }),
    g({
      id: 'hx-m5n-10', lesson: 'divizor', level: 7, skill: 'apply', point: 'divizori',
      question: 'Câți divizori pozitivi distincți are 12?',
      correct: '6',
      wrong: ['4', '3', '5'],
      explain: 'Divizorii lui 12 sunt 1, 2, 3, 4, 6 și 12, deci șase. 3 numără doar factorii primi. 4 uită câte un capăt al listei.'
    }),
    g({
      id: 'hx-m5n-11', lesson: 'prime', level: 8, skill: 'analyze', point: 'prime',
      question: 'Câte numere prime sunt strict între 20 și 30?',
      correct: '2',
      wrong: ['3', '4', '1'],
      explain: 'Între 20 și 30 rămân 23 și 29. 21, 25 și 27 se descompun, iar parele cad. 3 sau 4 ies dacă lași în listă un compus.'
    }),
    g({
      id: 'hx-m5n-12', lesson: 'mers-invers', level: 8, skill: 'apply', point: 'mers-invers',
      question: 'Gândesc un număr, îl dublez, adaug 10 și obțin 36. Ce număr am gândit?',
      correct: '13',
      wrong: ['8', '26', '23'],
      explain: 'Ultima operație a fost +10, deci înainte erau 26. 26 : 2 = 13. 8 iese dacă scazi 10 înainte să împărți. 26 uită împărțirea. 23 adună 10 în loc să-l scoată.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m5n-01', lesson: 'ordine', level: 6, point: 'ordine', skill: 'apply',
      prompt: 'Calculează 5 × [20 − (6 + 4)] : 2 + 3. Doar rezultatul.',
      explain: 'Paranteza mică 10, apoi 20 − 10 = 10. 5 × 10 = 50, 50 : 2 = 25, 25 + 3 = 28.',
      steps: ['6 + 4 = 10', '20 − 10 = 10', '5 × 10 = 50', '50 : 2 = 25', '25 + 3 = 28'],
      proof: () => 5 * (20 - (6 + 4)) / 2 + 3
    }),
    n({
      id: 'hz-m5n-02', lesson: 'criterii-2510', level: 6, point: 'divizibilitate', skill: 'apply',
      prompt: 'Cel mai mic număr de 3 cifre care se împarte exact la 2, la 3 și la 5. Doar numărul.',
      explain: 'Cel mai mic multiplu comun al lui 2, 3 și 5 este 30. Primul multiplu de 30 cu 3 cifre este 120.',
      steps: ['2, 3 și 5 sunt prime între ele', 'Cel mai mic multiplu comun nenul este 30', '100 nu se împarte la 30', '120 = 4 × 30'],
      proof: () => 120
    }),
    n({
      id: 'hz-m5n-03', lesson: 'putere', level: 6, point: 'puteri', skill: 'apply',
      prompt: 'Calculează 2⁵ + 3³ − 5². Doar rezultatul.',
      explain: '2⁵ = 32, 3³ = 27, 5² = 25. 32 + 27 − 25 = 34.',
      steps: ['2⁵ = 32', '3³ = 27', '5² = 25', '32 + 27 − 25 = 34'],
      proof: () => 2 ** 5 + 3 ** 3 - 5 ** 2
    }),
    n({
      id: 'hz-m5n-04', lesson: 'prime', level: 7, point: 'prime', skill: 'analyze',
      prompt: 'Câte numere prime p există cu 50 < p < 70? Doar numărul lor.',
      explain: 'Rămân 53, 59, 61 și 67. 51, 55, 57, 63, 65 și 69 se descompun, iar parele cad.',
      steps: ['Tai parele dintre 50 și 70', '51 = 3 × 17, 55 = 5 × 11, 57 = 3 × 19', '63 = 9 × 7, 65 = 5 × 13, 69 = 3 × 23', 'Rămân 53, 59, 61, 67'],
      proof: () => 4
    }),
    n({
      id: 'hz-m5n-05', lesson: 'divizor', level: 7, point: 'divizori', skill: 'apply',
      prompt: 'Câți divizori pozitivi distincți are 36?',
      explain: '36 = 2² × 3². Numărul de divizori este (2 + 1) × (2 + 1) = 9.',
      steps: ['36 = 2² × 3²', 'La exponentul lui 2 ai 3 alegeri: 0, 1 sau 2', 'La fel la 3', '3 × 3 = 9'],
      proof: () => 9
    }),
    n({
      id: 'hz-m5n-06', lesson: 'impartire-rest', level: 7, point: 'rest', skill: 'apply',
      prompt: 'Un număr împărțit la 8 dă câtul 7 și restul 5. Care este numărul?',
      explain: 'Numărul este împărțitor × cât + rest: 8 × 7 + 5 = 61.',
      steps: ['Împărțitor × cât = 56', 'Adaugi restul 5', '56 + 5 = 61', 'Verificare: 61 = 8 × 7 + 5'],
      proof: () => 8 * 7 + 5
    }),
    n({
      id: 'hz-m5n-07', lesson: 'falsa-ipoteza', level: 8, point: 'consecutive', skill: 'analyze',
      prompt: 'Trei numere pare consecutive au suma 48. Care este cel mai mare?',
      explain: 'Mijlocul este 48 : 3 = 16. Numerele sunt 14, 16 și 18. Cel mai mare este 18.',
      steps: ['Suma a trei termeni la fel de depărtați are mijlocul 48 : 3', 'Mijlocul este 16', 'Parele vecine sunt 14 și 18', 'Cel mai mare este 18'],
      proof: () => 18
    }),
    n({
      id: 'hz-m5n-08', lesson: 'putere', level: 8, point: 'puteri', skill: 'apply',
      prompt: 'Calculează 12² − 11², apoi înmulțește rezultatul cu 2. Doar numărul final.',
      explain: 'Diferență de pătrate: (12 − 11) × (12 + 11) = 23. 23 × 2 = 46.',
      steps: ['12² − 11² = (12 − 11) × (12 + 11)', '1 × 23 = 23', '23 × 2 = 46'],
      proof: () => (12 ** 2 - 11 ** 2) * 2
    }),
    n({
      id: 'hz-m5n-09', lesson: 'mers-invers', level: 8, point: 'mers-invers', skill: 'analyze',
      prompt: 'Scad 8 dintr-un număr, înmulțesc rezultatul cu 3 și obțin 39. Ce număr am avut la început?',
      explain: 'Împărți 39 la 3 și obții 13, apoi aduni înapoi pe 8: 21.',
      steps: ['Înainte de ×3 era 39 : 3 = 13', '13 este numărul după ce ai scăzut 8', '13 + 8 = 21'],
      proof: () => 39 / 3 + 8
    })
  ];
  return { key: 'matematica:5:naturale', flashcards, tests };
}

function fractii() {
  const flashcards = [
    g({
      id: 'hx-m5f-01', lesson: 'comparare-fractii', level: 3, skill: 'trap', point: 'comparare',
      question: 'Care fracție este mai mare: 3/7 sau 3/8?',
      correct: '3/7',
      wrong: ['3/8', 'sunt egale, au același numărător', '3/8, pentru că 8 este mai mare decât 7'],
      explain: 'Același numărător: fracția cu numitorul mai mic este mai mare, pentru că părțile sunt mai mari. 3/7 > 3/8.'
    }),
    g({
      id: 'hx-m5f-02', lesson: 'echivalente', level: 4, skill: 'apply', point: 'simplificare',
      question: 'Forma ireductibilă a lui 18/24 este…',
      correct: '3/4',
      wrong: ['2/3', '4/5', '3/5'],
      explain: 'Împarți 18 și 24 la 6 și obții 3/4. 2/3, 4/5 și 3/5 sunt fracții vecine, dar nu au aceeași valoare cu 18/24.'
    }),
    g({
      id: 'hx-m5f-03', lesson: 'adunare-fractii', level: 5, skill: 'trap', point: 'adunare',
      question: 'Cât face 1/2 + 1/3?',
      correct: '5/6',
      wrong: ['2/5', '1/6', '2/6'],
      explain: 'Numitor comun 6: 3/6 + 2/6 = 5/6. 2/5 iese dacă aduni numerele de sus între ele și pe cele de jos între ele. 2/6 uită amplificarea lui 1/2.'
    }),
    g({
      id: 'hx-m5f-04', lesson: 'parte-procent', level: 5, skill: 'apply', point: 'procent',
      question: 'Un preț de 80 de lei crește cu 25%. Noul preț este…',
      correct: '100 de lei',
      wrong: ['105 lei', '20 de lei', '60 de lei'],
      explain: '25% din 80 este 20, deci noul preț este 80 + 20 = 100. 105 adună procentul ca pe un număr de lei. 60 scade în loc să adune.'
    }),
    g({
      id: 'hx-m5f-05', lesson: 'impartire-media', level: 6, skill: 'apply', point: 'media',
      question: 'Media notelor 7, 8, 6 și 9 este…',
      correct: '7,5',
      wrong: ['8', '7', '6,5'],
      explain: 'Suma este 30, iar notele sunt 4. 30 : 4 = 7,5. 8 este nota din mijloc, nu media. 7 uită restul de la împărțire.'
    }),
    g({
      id: 'hx-m5f-06', lesson: 'inmultire-fractii', level: 6, skill: 'trap', point: 'inmultire',
      question: 'Cât face 2/3 × 3/4, scris ireductibil?',
      correct: '1/2',
      wrong: ['5/7', '6/7', '3/4'],
      explain: 'Înmulțești sus și jos: 6/12 = 1/2. Poți tăia pe 3 înainte. 5/7 iese dacă aduni. 3/4 este doar al doilea factor.'
    }),
    g({
      id: 'hx-m5f-07', lesson: 'mixte', level: 4, skill: 'apply', point: 'mixt',
      question: 'Fracția improprie egală cu 2 întregi și 1/4 este…',
      correct: '9/4',
      wrong: ['3/4', '8/4', '7/4'],
      explain: '2 = 8/4, iar 8/4 + 1/4 = 9/4. 8/4 uită sfertul. 7/4 scade un sfert în loc să-l adauge. 3/4 amestecă întregul cu numărătorul.'
    }),
    g({
      id: 'hx-m5f-08', lesson: 'scriere-zecimala', level: 7, skill: 'analyze', point: 'zecimal',
      question: 'Care fracție ireductibilă este egală cu 0,75?',
      correct: '3/4',
      wrong: ['7/5', '5/4', '2/3'],
      explain: '0,75 = 75/100 = 3/4. 5/4 este 1,25. 7/5 este 1,4. 2/3 este aproximativ 0,66, nu 0,75.'
    }),
    g({
      id: 'hx-m5f-09', lesson: 'comparare-fractii', level: 7, skill: 'false', point: 'comparare',
      question: 'Care enunț este fals?',
      correct: 'La același numărător, fracția cu numitorul mai mare este mai mare.',
      wrong: [
        'La același numitor, fracția cu numărătorul mai mare este mai mare.',
        '2/4 și 1/2 sunt echivalente.',
        'O fracție supraunitară este mai mare decât 1.'
      ],
      explain: 'Părți mai mărunte înseamnă o fracție mai mică, dacă numeri la fel de multe. Enunțul corect este pe dos. Celelalte trei țin.'
    }),
    g({
      id: 'hx-m5f-10', lesson: 'parte-procent', level: 8, skill: 'trap', point: 'procent',
      question: 'Un preț de 50 de lei crește cu 20%, apoi scade cu 20% din noul preț. Cât rămâne?',
      correct: '48 de lei',
      wrong: ['50 de lei', '40 de lei', '46 de lei'],
      explain: '50 + 10 = 60. 20% din 60 este 12, nu din 50. 60 − 12 = 48. Nu te întorci la 50, pentru că al doilea procent se ia din suma mărită.'
    }),
    g({
      id: 'hx-m5f-11', lesson: 'adunare-fractii', level: 8, skill: 'apply', point: 'adunare',
      question: 'Cât face 2/3 + 1/4 − 1/6, ireductibil?',
      correct: '3/4',
      wrong: ['2/13', '1/2', '5/6'],
      explain: 'Numitor 12: 8/12 + 3/12 − 2/12 = 9/12 = 3/4. 2/13 adună și scade numerele separat. 5/6 uită scăderea lui 1/6.'
    }),
    g({
      id: 'hx-m5f-12', lesson: 'impartire-media', level: 2, skill: 'apply', point: 'media',
      question: 'Două note au media 8. Una este 6. Cealaltă este…',
      correct: '10',
      wrong: ['8', '9', '12'],
      explain: 'Suma celor două note este 16. Dacă una este 6, cealaltă este 10. 8 repetă media. 12 adună media la 6 în loc să completeze până la sumă.'
    })
  ];
  const tests = [
    exam({
      id: 'hz-m5f-01', lesson: 'adunare-fractii', level: 6, point: 'adunare', skill: 'apply',
      prompt: 'Calculează 2/3 + 1/4 − 1/6. Scrie fracția ireductibilă.',
      answers: ['3/4'],
      explain: 'Numitor 12: 8/12 + 3/12 − 2/12 = 9/12 = 3/4.',
      steps: ['c.m.m.m.c.(3, 4, 6) = 12', '2/3 = 8/12, 1/4 = 3/12, 1/6 = 2/12', '8/12 + 3/12 − 2/12 = 9/12', '9/12 = 3/4'],
      match: 'exact'
    }),
    n({
      id: 'hz-m5f-02', lesson: 'parte-procent', level: 6, point: 'procent', skill: 'apply',
      prompt: '10 m de stofă costă 80 de lei. Cumperi 4 m și primești 25% reducere. Cât plătești, în lei?',
      explain: 'Un metru costă 8 lei, 4 metri costă 32. 25% din 32 este 8, deci plătești 24.',
      steps: ['80 : 10 = 8 lei pe metru', '4 × 8 = 32', '25% din 32 = 8', '32 − 8 = 24'],
      proof: () => 80 / 10 * 4 * 3 / 4
    }),
    n({
      id: 'hz-m5f-03', lesson: 'impartire-media', level: 7, point: 'media', skill: 'analyze',
      prompt: 'Patru note au media 8. Care este suma lor?',
      explain: 'Media este suma împărțită la 4. Suma este 8 × 4 = 32.',
      steps: ['Media = suma : 4', 'Suma = 8 × 4', 'Suma = 32'],
      proof: () => 8 * 4
    }),
    n({
      id: 'hz-m5f-04', lesson: 'echivalente', level: 7, point: 'amplificare', skill: 'apply',
      prompt: 'Simplifică 42/56, apoi amplifică rezultatul cu 3. Care este numărătorul fracției obținute?',
      explain: '42/56 = 3/4. Amplifici cu 3: 9/12. Numărătorul este 9.',
      steps: ['42 și 56 se împart la 14', '3/4 × 3/3 = 9/12', 'Numărătorul este 9'],
      proof: () => 9
    }),
    n({
      id: 'hz-m5f-05', lesson: 'parte-procent', level: 8, point: 'procent', skill: 'trap',
      prompt: 'Un caiet costă 48 de lei. Are reducere 25%, apoi mai scazi o treime din ce a rămas. Cât plătești, în lei?',
      explain: '25% din 48 este 12, rămân 36. O treime din 36 este 12. 36 − 12 = 24.',
      steps: ['25% din 48 = 12', '48 − 12 = 36', '1/3 din 36 = 12', '36 − 12 = 24'],
      proof: () => 48 * 3 / 4 * 2 / 3
    }),
    n({
      id: 'hz-m5f-06', lesson: 'parte-procent', level: 8, point: 'parte', skill: 'analyze',
      prompt: '3/4 dintr-un drum sunt 18 km. Câți kilometri are tot drumul?',
      explain: 'O pătrime este 18 : 3 = 6 km. Drumul întreg are 4 pătrimi, deci 24 km.',
      steps: ['3 părți = 18 km', 'O parte = 6 km', '4 părți = 24 km'],
      proof: () => 18 / 3 * 4
    }),
    exam({
      id: 'hz-m5f-07', lesson: 'adunare-fractii', level: 7, point: 'adunare', skill: 'apply',
      prompt: 'Calculează 7/8 − 1/2. Fracție ireductibilă.',
      answers: ['3/8'],
      explain: '1/2 = 4/8. 7/8 − 4/8 = 3/8, deja ireductibilă.',
      steps: ['1/2 = 4/8', '7/8 − 4/8 = 3/8', '3 și 8 nu au divizor comun mai mare decât 1'],
      match: 'exact'
    }),
    n({
      id: 'hz-m5f-08', lesson: 'impartire-media', level: 8, point: 'media', skill: 'analyze',
      prompt: 'Notele 6, 8, 8 și 10 au media 8. Înlocuiești nota 6 cu 10. Care este noua medie?',
      explain: 'Suma veche este 32. Scoți 6 și pui 10: suma crește cu 4 și devine 36. 36 : 4 = 9.',
      steps: ['Suma inițială = 32', 'Noua sumă = 32 − 6 + 10 = 36', '36 : 4 = 9'],
      proof: () => (6 + 8 + 8 + 10 - 6 + 10) / 4
    })
  ];
  return { key: 'matematica:5:fractii', flashcards, tests };
}

function geometrie() {
  const flashcards = [
    g({
      id: 'hx-m5g-01', lesson: 'clasificare-unghi', level: 3, skill: 'apply', point: 'unghi',
      question: 'Un unghi de 47° și unul alăturat formează un unghi alungit. Alăturatul măsoară…',
      correct: '133°',
      wrong: ['143°', '43°', '90°'],
      explain: 'Unghiul alungit are 180°. 180 − 47 = 133. 143 scade 37. 43 este complementul, nu suplementul. 90 este unghiul drept, nu rezultatul.'
    }),
    g({
      id: 'hx-m5g-02', lesson: 'clasificare-unghi', level: 2, skill: 'trap', point: 'clasificare',
      question: 'Un unghi de 91° este…',
      correct: 'obtuz',
      wrong: ['drept', 'ascuțit', 'alungit'],
      explain: 'Obtuz înseamnă mai mare decât 90° și mai mic decât 180°. 91° este doar puțin peste un unghi drept, deci nu este drept.'
    }),
    g({
      id: 'hx-m5g-03', lesson: 'lungime', level: 4, skill: 'trap', point: 'perimetru',
      question: 'Un dreptunghi are laturile de 7 cm și 4 cm. Perimetrul este…',
      correct: '22 cm',
      wrong: ['28 cm', '11 cm', '14 cm'],
      explain: 'Perimetrul este 2 × (7 + 4) = 22 cm. 28 este aria, 7 × 4. 11 adună laturile o singură dată. 14 ia doar lungimile de 7.'
    }),
    g({
      id: 'hx-m5g-04', lesson: 'lungime', level: 6, skill: 'analyze', point: 'perimetru',
      question: 'Un dreptunghi are 8 cm și 2 cm. Un pătrat are același perimetru. Latura pătratului este…',
      correct: '5 cm',
      wrong: ['4 cm', '10 cm', '8 cm'],
      explain: 'Perimetrul dreptunghiului este 2 × (8 + 2) = 20 cm. Latura pătratului este 20 : 4 = 5 cm. 10 este jumătatea perimetrului, nu latura.'
    }),
    g({
      id: 'hx-m5g-05', lesson: 'arie-unitati', level: 5, skill: 'false', point: 'arie',
      question: 'Care enunț este fals?',
      correct: 'Aria dreptunghiului este suma lungimii și lățimii.',
      wrong: [
        'Aria dreptunghiului este lungime × lățime.',
        'Perimetrul pătratului este de patru ori latura.',
        'Două figuri pot avea același perimetru și arii diferite.'
      ],
      explain: 'Aria este produsul, nu suma. Suma laturilor ține de perimetru. Un dreptunghi lung și îngust și un pătrat pot avea același contur și suprafețe diferite.'
    }),
    g({
      id: 'hx-m5g-06', lesson: 'lungime-unitati', level: 4, skill: 'trap', point: 'unitati',
      question: '2,5 m înseamnă…',
      correct: '250 cm',
      wrong: ['25 cm', '2 500 cm', '25 mm'],
      explain: '1 m = 100 cm, deci 2,5 × 100 = 250 cm. 25 uită un zero. 2 500 este trecerea în milimetri, nu în centimetri.'
    }),
    g({
      id: 'hx-m5g-07', lesson: 'volum-unitati', level: 6, skill: 'trap', point: 'volum',
      question: 'Volumul cubului cu latura de 4 cm este…',
      correct: '64 cm³',
      wrong: ['96 cm³', '16 cm³', '12 cm³'],
      explain: 'Volumul este 4 × 4 × 4 = 64 cm³. 96 este aria totală, 6 × 16. 16 este o față. 12 este suma a trei muchii.'
    }),
    g({
      id: 'hx-m5g-08', lesson: 'mijloc', level: 3, skill: 'apply', point: 'mijloc',
      question: 'M este mijlocul segmentului AB de 15 cm. AM măsoară…',
      correct: '7,5 cm',
      wrong: ['15 cm', '8 cm', '7 cm'],
      explain: 'Mijlocul împarte segmentul în două părți egale: 15 : 2 = 7,5 cm. 8 și 7 sunt rotunjiri, nu jumătatea exactă.'
    }),
    g({
      id: 'hx-m5g-09', lesson: 'masura-unghi', level: 7, skill: 'analyze', point: 'unghi',
      question: 'Complementul unui unghi de 28° măsoară…',
      correct: '62°',
      wrong: ['152°', '52°', '72°'],
      explain: 'Complementul completează până la 90°: 90 − 28 = 62. 152 este suplementul, până la 180°. 52 și 72 greșesc scăderea cu 10.'
    }),
    g({
      id: 'hx-m5g-10', lesson: 'congruente', level: 5, skill: 'false', point: 'congruenta',
      question: 'Care enunț este fals?',
      correct: 'Două figuri cu aceeași arie sunt întotdeauna congruente.',
      wrong: [
        'Figurile congruente se suprapun perfect.',
        'Segmentele congruente au aceeași lungime.',
        'Unghiurile congruente au aceeași măsură.'
      ],
      explain: 'Aceeași arie nu obligă aceeași formă: un dreptunghi lung și un pătrat pot avea aria 36 și să nu se suprapună. Congruența cere măsuri corespunzătoare egale.'
    }),
    g({
      id: 'hx-m5g-11', lesson: 'arie-unitati', level: 8, skill: 'analyze', point: 'arie',
      question: 'Un pătrat are aria 36 cm². Un dreptunghi are 12 cm și 3 cm. Care afirmație este adevărată?',
      correct: 'Au aceeași arie, dar perimetre diferite.',
      wrong: [
        'Au și aria, și perimetrul egale.',
        'Pătratul are perimetrul mai mare.',
        'Dreptunghiul are aria mai mare, pentru că una dintre laturi este 12.'
      ],
      explain: 'Aria pătratului este 36, aria dreptunghiului este 12 × 3 = 36. Perimetrul pătratului este 24 cm, al dreptunghiului este 30 cm. Aceeași arie nu înseamnă același contur.'
    }),
    g({
      id: 'hx-m5g-12', lesson: 'lungime-unitati', level: 8, skill: 'trap', point: 'unitati',
      question: '3 m și 40 cm, scriși doar în centimetri, sunt…',
      correct: '340 cm',
      wrong: ['3040 cm', '34 cm', '430 cm'],
      explain: '3 m = 300 cm, apoi 300 + 40 = 340 cm. 3040 lipește cifrele. 34 uită că metrul are 100 cm, nu 10.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m5g-01', lesson: 'lungime', level: 6, point: 'perimetru', skill: 'analyze',
      prompt: 'Dreptunghi 13 cm pe 5 cm. Un pătrat are același perimetru. Cât este latura pătratului, în cm?',
      explain: 'Perimetrul este 2 × (13 + 5) = 36 cm. Latura pătratului este 36 : 4 = 9 cm.',
      steps: ['13 + 5 = 18', 'Perimetrul = 2 × 18 = 36', '36 : 4 = 9'],
      proof: () => 2 * (13 + 5) / 4
    }),
    n({
      id: 'hz-m5g-02', lesson: 'clasificare-unghi', level: 6, point: 'unghi', skill: 'apply',
      prompt: 'Un unghi ascuțit de 28° și unul obtuz sunt alăturate și formează 180°. Câte grade are obtuzul?',
      explain: '180 − 28 = 152. 152 este între 90 și 180, deci obtuzul este chiar suplementul.',
      steps: ['Alungit = 180°', '180 − 28 = 152', '152 > 90, deci obtuz'],
      proof: () => 180 - 28
    }),
    n({
      id: 'hz-m5g-03', lesson: 'volum-unitati', level: 7, point: 'volum', skill: 'apply',
      prompt: 'Cub de latură 5 cm. Tai dintr-un colț un cubuleț de latură 2 cm. Care este volumul rămas, în cm³?',
      explain: 'Cubul mare are 125 cm³, cubulețul are 8 cm³. Rămân 117 cm³.',
      steps: ['5³ = 125', '2³ = 8', '125 − 8 = 117'],
      proof: () => 5 ** 3 - 2 ** 3
    }),
    n({
      id: 'hz-m5g-04', lesson: 'lungime-unitati', level: 7, point: 'unitati', skill: 'trap',
      prompt: 'O panglică are 2 m și 35 cm. O tai în bucăți de 5 cm. Câte bucăți obții, fără să rămână rest?',
      explain: '2 m și 35 cm = 235 cm. 235 : 5 = 47. Treci întâi totul în centimetri.',
      steps: ['2 m = 200 cm', '200 + 35 = 235 cm', '235 : 5 = 47'],
      proof: () => (2 * 100 + 35) / 5
    }),
    n({
      id: 'hz-m5g-05', lesson: 'arie-unitati', level: 8, point: 'arie', skill: 'analyze',
      prompt: 'Un dreptunghi are 12 cm și 3 cm. Un pătrat are aceeași arie. Cu câți centimetri este perimetrul dreptunghiului mai mare decât al pătratului?',
      explain: 'Aria este 36 cm², deci latura pătratului este 6 cm. Perimetrul dreptunghiului este 30, al pătratului este 24. Diferența este 6.',
      steps: ['Aria = 12 × 3 = 36', 'Latura pătratului = 6', 'Perimetrul dreptunghiului = 30', 'Perimetrul pătratului = 24', '30 − 24 = 6'],
      proof: () => 2 * (12 + 3) - 4 * 6
    }),
    n({
      id: 'hz-m5g-06', lesson: 'masura-unghi', level: 8, point: 'unghi', skill: 'analyze',
      prompt: 'Un unghi are 35°. Calculează dublul complementului său, în grade.',
      explain: 'Complementul este 90 − 35 = 55. Dublul este 110.',
      steps: ['Complement = 90 − 35 = 55', '2 × 55 = 110'],
      proof: () => 2 * (90 - 35)
    }),
    n({
      id: 'hz-m5g-07', lesson: 'mijloc', level: 7, point: 'mijloc', skill: 'apply',
      prompt: 'Segmentul AB are 24 cm. M este mijlocul, iar N este mijlocul lui MB. Cât măsoară AN, în cm?',
      explain: 'AM = MB = 12. N taie MB în două, deci MN = 6. AN = AM + MN = 18.',
      steps: ['AM = 12 și MB = 12', 'MN = 6', 'AN = 12 + 6 = 18'],
      proof: () => 24 / 2 + 24 / 4
    }),
    n({
      id: 'hz-m5g-08', lesson: 'arie-unitati', level: 8, point: 'arie', skill: 'trap',
      prompt: 'Un pătrat are perimetrul de 20 cm. Care este aria lui, în cm²?',
      explain: 'Latura este 20 : 4 = 5 cm. Aria este 5 × 5 = 25, nu 20.',
      steps: ['Latura = 20 : 4 = 5', 'Aria = 5 × 5 = 25'],
      proof: () => (20 / 4) ** 2
    })
  ];
  return { key: 'matematica:5:geometrie', flashcards, tests };
}

module.exports = { naturale, fractii, geometrie };
