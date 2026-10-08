const { grid, numExam } = require('./shape');

function g(row) {
  return grid(row);
}

function n(row) {
  return numExam(row);
}

function reale() {
  const flashcards = [
    g({
      id: 'hx-m7r-01', lesson: 'radical-patrat', level: 4, skill: 'apply', point: 'radical',
      question: 'Cât face √(16 × 9) − √16 × 2?',
      correct: '4',
      wrong: ['10', '6', '8'],
      explain: '√144 = 12 și √16 × 2 = 8. 12 − 8 = 4. 10 uită înmulțirea cu 2. 6 scade și radicalul, și pe 2, și încă ceva. 8 este doar al doilea termen.'
    }),
    g({
      id: 'hx-m7r-02', lesson: 'estimare-radical', level: 6, skill: 'analyze', point: 'ordin',
      question: 'Câți naturali n verifică 2 < √n < 5?',
      correct: '20',
      wrong: ['21', '15', '12'],
      explain: 'n este de la 5 până la 24 inclusiv: 24 − 5 + 1 = 20. 4 nu intră, pentru că √4 = 2 nu este strict mai mare. 25 nu intră, pentru că √25 = 5.'
    }),
    g({
      id: 'hx-m7r-03', lesson: 'rationalizare', level: 5, skill: 'apply', point: 'rationalizare',
      question: 'După raționalizare și simplificare, 8/√2 este…',
      correct: '4√2',
      wrong: ['8√2', '2√2', '√2'],
      explain: 'Înmulțești sus și jos cu √2: 8√2 / 2 = 4√2. 8√2 uită simplificarea. 2√2 împarte și la 4.'
    }),
    g({
      id: 'hx-m7r-04', lesson: 'irationale', level: 3, skill: 'analyze', point: 'irational',
      question: 'Care număr este irațional?',
      correct: '√2',
      wrong: ['0,5', '2/3', '√9'],
      explain: '√2 nu se scrie ca fracție de întregi. 0,5 și 2/3 sunt raționale. √9 = 3, deci este întreg.'
    }),
    g({
      id: 'hx-m7r-05', lesson: 'radical-patrat', level: 7, skill: 'trap', point: 'radical',
      question: 'Pentru a = −3, √(a²) este…',
      correct: '3',
      wrong: ['−3', '9', '−9'],
      explain: 'Radicalul pătrat dă numărul nenegativ. a² = 9, iar √9 = 3, nu −3. Modulul lui a este 3.'
    }),
    g({
      id: 'hx-m7r-06', lesson: 'medie-geometrica', level: 5, skill: 'trap', point: 'medie',
      question: 'Media geometrică a lui 4 și 9 este…',
      correct: '6',
      wrong: ['6,5', '13', '36'],
      explain: '√(4 × 9) = √36 = 6. 6,5 este media aritmetică. 13 este suma. 36 este produsul, înainte de radical.'
    }),
    g({
      id: 'hx-m7r-07', lesson: 'comparare-reale', level: 4, skill: 'apply', point: 'comparare',
      question: 'Față de 3, √10 este…',
      correct: 'mai mare',
      wrong: ['mai mic', 'egal', 'mai mic decât 2'],
      explain: '3² = 9 și 4² = 16. 10 este între 9 și 16, deci √10 este între 3 și 4. Este mai mare decât 3.'
    }),
    g({
      id: 'hx-m7r-08', lesson: 'scoatere-factori', level: 8, skill: 'apply', point: 'factori',
      question: '2√18, scris cu cel mai mic radical, este…',
      correct: '6√2',
      wrong: ['2√18', '9√2', '3√2'],
      explain: '√18 = √(9 × 2) = 3√2. 2 × 3√2 = 6√2. 9√2 scoate 9 în loc de 3. 3√2 uită coeficientul 2.'
    }),
    g({
      id: 'hx-m7r-09', lesson: 'estimare-radical', level: 8, skill: 'analyze', point: 'ordin',
      question: 'Cel mai mic natural n cu √n > 6 este…',
      correct: '37',
      wrong: ['36', '49', '7'],
      explain: '√36 = 6, deci n = 36 nu este strict mai mare. Primul care trece este 37. 49 este 7², mult mai departe. 7 este radicalul, nu numărul de sub radical.'
    }),
    g({
      id: 'hx-m7r-10', lesson: 'rationalizare', level: 7, skill: 'trap', point: 'rationalizare',
      question: 'Coeficientul lui √3 după ce simplifici 12/√3 este…',
      correct: '4',
      wrong: ['12', '6', '2'],
      explain: '12/√3 × √3/√3 = 12√3 / 3 = 4√3. Coeficientul este 4. 12 uită împărțirea. 6 împarte la 2.'
    }),
    g({
      id: 'hx-m7r-11', lesson: 'medie-geometrica', level: 6, skill: 'false', point: 'medie',
      question: 'Care enunț este fals?',
      correct: 'Media geometrică a două numere pozitive este mereu mai mare decât media lor aritmetică.',
      wrong: [
        'Media geometrică a lui a și b, pozitive, este √(a × b).',
        'Media aritmetică a lui 4 și 16 este 10.',
        'Media geometrică a lui 4 și 16 este 8.'
      ],
      explain: 'Pentru numere pozitive diferite, media geometrică este mai mică sau egală cu cea aritmetică, nu mai mare. 8 < 10 la exemplul din celelalte enunțuri.'
    }),
    g({
      id: 'hx-m7r-12', lesson: 'scoatere-factori', level: 2, skill: 'apply', point: 'radical',
      question: '√49 + √16 este…',
      correct: '11',
      wrong: ['√65', '33', '13'],
      explain: '√49 = 7 și √16 = 4, deci 11. √65 ar fi radicalul sumei, nu suma radicalilor. 33 adună 49 cu ceva din 16, fără să scoată radicalul.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m7r-01', lesson: 'radical-patrat', level: 6, point: 'radical', skill: 'apply',
      prompt: 'Calculează √81 − √16 + √4.',
      explain: '9 − 4 + 2 = 7. Radicalul se calculează înainte de adunare și scădere.',
      steps: ['√81 = 9', '√16 = 4', '√4 = 2', '9 − 4 + 2 = 7'],
      proof: () => 9 - 4 + 2
    }),
    n({
      id: 'hz-m7r-02', lesson: 'estimare-radical', level: 6, point: 'ordin', skill: 'analyze',
      prompt: 'Câți naturali n există cu 4 < √n < 7?',
      explain: 'n merge de la 17 până la 48 inclusiv. 48 − 17 + 1 = 32.',
      steps: ['√n > 4 implică n ≥ 17', '√n < 7 implică n ≤ 48', '48 − 17 + 1 = 32'],
      proof: () => 48 - 17 + 1
    }),
    n({
      id: 'hz-m7r-03', lesson: 'rationalizare', level: 7, point: 'rationalizare', skill: 'apply',
      prompt: 'Raționalizezi 12/√3 și simplifici. Care este coeficientul lui √3?',
      explain: '12√3 / 3 = 4√3. Coeficientul este 4.',
      steps: ['Înmulțești sus și jos cu √3', '12√3 / 3 = 4√3', 'Coeficientul este 4'],
      proof: () => 4
    }),
    n({
      id: 'hz-m7r-04', lesson: 'medie-geometrica', level: 7, point: 'medie', skill: 'apply',
      prompt: 'Media geometrică a lui 9 și 16. Doar numărul.',
      explain: '√(9 × 16) = √144 = 12. Nu este media aritmetică 12,5.',
      steps: ['9 × 16 = 144', '√144 = 12'],
      proof: () => 12
    }),
    n({
      id: 'hz-m7r-05', lesson: 'estimare-radical', level: 8, point: 'ordin', skill: 'analyze',
      prompt: 'Câți dintre naturali n cu 2 < √n < 6 sunt pari?',
      explain: 'n merge de la 5 la 35. Parele merg de la 6 la 34: (34 − 6) : 2 + 1 = 15.',
      steps: ['n de la 5 la 35', 'Parele de la 6 la 34', '(34 − 6) : 2 + 1 = 15'],
      proof: () => {
        let even = 0;
        for (let k = 5; k <= 35; k += 1) if (k % 2 === 0) even += 1;
        return even;
      }
    }),
    n({
      id: 'hz-m7r-06', lesson: 'scoatere-factori', level: 8, point: 'factori', skill: 'apply',
      prompt: 'Scrie √50 − √8 ca coeficient al lui √2. Care este coeficientul?',
      explain: '√50 = 5√2 și √8 = 2√2. Diferența este 3√2. Coeficientul este 3.',
      steps: ['√50 = √(25 × 2) = 5√2', '√8 = √(4 × 2) = 2√2', '5√2 − 2√2 = 3√2'],
      proof: () => 3
    }),
    n({
      id: 'hz-m7r-07', lesson: 'radical-patrat', level: 7, point: 'radical', skill: 'trap',
      prompt: 'Calculează √(9 × 16) − √9 × 2.',
      explain: '√144 = 12. √9 × 2 = 6. 12 − 6 = 6. Înmulțirea din afara radicalului nu intră sub același acoperiș.',
      steps: ['√(9 × 16) = 12', '√9 × 2 = 6', '12 − 6 = 6'],
      proof: () => Math.sqrt(9 * 16) - Math.sqrt(9) * 2
    }),
    n({
      id: 'hz-m7r-08', lesson: 'comparare-reale', level: 8, point: 'comparare', skill: 'analyze',
      prompt: 'Cel mai mare pătrat perfect strict mai mic decât 50. Care este?',
      explain: '7² = 49 și 8² = 64. 49 este cel mai mare pătrat perfect sub 50.',
      steps: ['7² = 49', '8² = 64 > 50', 'Răspunsul este 49'],
      proof: () => 49
    })
  ];
  return { key: 'matematica:7:reale', flashcards, tests };
}

function ecuati() {
  const flashcards = [
    g({
      id: 'hx-m7e-01', lesson: 'ecuatie-axb', level: 4, skill: 'apply', point: 'ecuatie',
      question: 'În (x + 1)/2 = 5, x este…',
      correct: '9',
      wrong: ['10', '4', '11'],
      explain: 'x + 1 = 10, deci x = 9. 10 uită să scoată pe 1. 4 împarte 5 + ceva prea devreme. 11 adună 1 după ce a înmulțit.'
    }),
    g({
      id: 'hx-m7e-02', lesson: 'sisteme', level: 5, skill: 'apply', point: 'sistem',
      question: 'Care pereche verifică și x + y = 10, și x − y = 2?',
      correct: '(6, 4)',
      wrong: ['(8, 2)', '(5, 5)', '(4, 6)'],
      explain: '6 + 4 = 10 și 6 − 4 = 2. (8, 2) dă diferența 6. (5, 5) dă diferența 0. (4, 6) răstoarnă pe x și y.'
    }),
    g({
      id: 'hx-m7e-03', lesson: 'ecuatie-axb', level: 6, skill: 'trap', point: 'ecuatie',
      question: 'În 3x − 2 = 10, x este…',
      correct: '4',
      wrong: ['12', '8/3', '6'],
      explain: '3x = 12, deci x = 4. 12 este 3x, nu x. 6 adună 2 la 10 și împarte la 2.'
    }),
    g({
      id: 'hx-m7e-04', lesson: 'metode-sistem', level: 7, skill: 'apply', point: 'substituie',
      question: 'În 3(x − 2) = x + 4, x este…',
      correct: '5',
      wrong: ['3', '6', '8'],
      explain: '3x − 6 = x + 4, deci 2x = 10 și x = 5. 6 iese dacă uiți să muți termenul cu x. 3 este doar numărul din paranteză.'
    }),
    g({
      id: 'hx-m7e-05', lesson: 'probleme-sisteme', level: 6, skill: 'analyze', point: 'probleme',
      question: 'Două numere au suma 20 și diferența 4. Cel mai mare este…',
      correct: '12',
      wrong: ['16', '10', '8'],
      explain: 'Mijlocul este 10. Numerele stau la câte 2 de o parte și de alta: 12 și 8. 16 adună diferența la sumă fără să împartă.'
    }),
    g({
      id: 'hx-m7e-06', lesson: 'sisteme', level: 8, skill: 'false', point: 'verificare',
      question: 'Care enunț este fals?',
      correct: 'O pereche care verifică o singură ecuație a sistemului este soluție.',
      wrong: [
        'Soluția unui sistem de două ecuații trebuie să le verifice pe amândouă.',
        'La substituție, înlocuiești o necunoscută, nu o ștergi.',
        'Poți aduna ecuațiile ca să dispară o necunoscută, dacă coeficienții sunt opuși.'
      ],
      explain: 'O singură ecuație lasă o infinitate de perechi. Soluția sistemului este perechea care le ține pe amândouă.'
    }),
    g({
      id: 'hx-m7e-07', lesson: 'metode-sistem', level: 8, skill: 'analyze', point: 'reducere',
      question: 'x + y = 11 și x − y = 3. y este…',
      correct: '4',
      wrong: ['7', '8', '3'],
      explain: 'Scăzând ecuațiile, 2y = 8, deci y = 4. Adunând, 2x = 14, x = 7. 7 este x, nu y. 8 este 2y.'
    }),
    g({
      id: 'hx-m7e-08', lesson: 'probleme-sisteme', level: 8, skill: 'analyze', point: 'probleme',
      question: 'Ana are de 3 ori mai mulți lei decât Ion. Împreună au 48. Ana are…',
      correct: '36 de lei',
      wrong: ['16 lei', '32 de lei', '24 de lei'],
      explain: '4 părți fac 48, deci o parte (Ion) este 12, iar Ana are 36. 16 este 48 : 3. 24 împarte în două, nu în patru părți.'
    }),
    g({
      id: 'hx-m7e-09', lesson: 'ecuatie-axb', level: 3, skill: 'apply', point: 'ecuatie',
      question: 'În 5x − 7 = 2x + 8, x este…',
      correct: '5',
      wrong: ['15', '1', '3'],
      explain: '3x = 15, deci x = 5. 15 este 3x. 1 iese dacă muți termenii fără să schimbi semnul corect.'
    }),
    g({
      id: 'hx-m7e-10', lesson: 'egalitati', level: 2, skill: 'false', point: 'identitate',
      question: 'Care enunț este fals?',
      correct: 'Poți înmulți doar membrul stâng cu 2, iar egalitatea rămâne adevărată.',
      wrong: [
        'Ce aduni într-un membru aduni și în celălalt.',
        'Împărțirea la același număr nenul păstrează egalitatea.',
        'Înmulțirea cu 0 face ambii membri 0 și nu te ajută să afli x.'
      ],
      explain: 'Operația se face în ambii membri. Dacă schimbi doar stânga, balanța se strică.'
    }),
    g({
      id: 'hx-m7e-11', lesson: 'ecuatie-axb', level: 7, skill: 'trap', point: 'ecuatie',
      question: 'În (x − 2)/3 + 1 = 4, x este…',
      correct: '11',
      wrong: ['9', '14', '5'],
      explain: '(x − 2)/3 = 3, deci x − 2 = 9 și x = 11. 9 este x − 2. 14 adună pe 3 în plus. 5 uită înmulțirea cu 3.'
    }),
    g({
      id: 'hx-m7e-12', lesson: 'metode-sistem', level: 4, skill: 'apply', point: 'substituie',
      question: 'Dacă x = y + 2 și y = 3, atunci x este…',
      correct: '5',
      wrong: ['1', '6', '3'],
      explain: 'Înlocuiești y: x = 3 + 2 = 5. 1 scade în loc să adune. 6 adună încă 1.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m7e-01', lesson: 'ecuatie-axb', level: 6, point: 'ecuatie', skill: 'apply',
      prompt: 'Rezolvă (3x − 1)/2 = x + 4. Cât este x?',
      explain: '3x − 1 = 2x + 8, deci x = 9.',
      steps: ['Înmulțești cu 2: 3x − 1 = 2x + 8', '3x − 2x = 8 + 1', 'x = 9'],
      proof: () => 9
    }),
    n({
      id: 'hz-m7e-02', lesson: 'ecuatie-axb', level: 6, point: 'ecuatie', skill: 'apply',
      prompt: 'Află x: 5x − 7 = 2x + 8.',
      explain: 'Muți 2x la stânga și −7 la dreapta: 3x = 15, deci x = 5.',
      steps: ['5x − 2x = 8 + 7', '3x = 15', 'x = 5'],
      proof: () => 5
    }),
    n({
      id: 'hz-m7e-03', lesson: 'sisteme', level: 7, point: 'sistem', skill: 'apply',
      prompt: '2x + y = 13 și x − y = 2. Cât este y?',
      explain: 'Aduni ecuațiile: 3x = 15, x = 5. Apoi y = 3.',
      steps: ['(2x + y) + (x − y) = 15', '3x = 15, x = 5', '5 − y = 2, y = 3'],
      proof: () => 3
    }),
    n({
      id: 'hz-m7e-04', lesson: 'metode-sistem', level: 7, point: 'substituie', skill: 'apply',
      prompt: 'x = y + 3 și 2x + y = 15. Cât este x?',
      explain: '2(y + 3) + y = 15, deci 3y = 9, y = 3 și x = 6.',
      steps: ['2(y + 3) + y = 15', '3y + 6 = 15', 'y = 3', 'x = 6'],
      proof: () => 6
    }),
    n({
      id: 'hz-m7e-05', lesson: 'probleme-sisteme', level: 8, point: 'probleme', skill: 'analyze',
      prompt: 'Ana are de 3 ori mai mulți lei decât Ion. Împreună au 48. Cu câți lei are Ana mai mult decât Ion?',
      explain: 'Ion are 12, Ana are 36. Diferența este 24.',
      steps: ['4 părți = 48, Ion = 12', 'Ana = 36', '36 − 12 = 24'],
      proof: () => 36 - 12
    }),
    n({
      id: 'hz-m7e-06', lesson: 'ecuatie-axb', level: 8, point: 'ecuatie', skill: 'apply',
      prompt: 'Află x: (x − 2)/3 + 1 = 4.',
      explain: '(x − 2)/3 = 3, deci x − 2 = 9 și x = 11.',
      steps: ['Scoți pe 1: (x − 2)/3 = 3', 'x − 2 = 9', 'x = 11'],
      proof: () => 11
    }),
    n({
      id: 'hz-m7e-07', lesson: 'sisteme', level: 8, point: 'sistem', skill: 'analyze',
      prompt: 'x + y = 11 și x − y = 3. Calculează x × y.',
      explain: 'x = 7 și y = 4. Produsul este 28.',
      steps: ['2x = 14, x = 7', 'y = 4', '7 × 4 = 28'],
      proof: () => 7 * 4
    }),
    n({
      id: 'hz-m7e-08', lesson: 'probleme-sisteme', level: 7, point: 'probleme', skill: 'apply',
      prompt: 'Două numere au suma 20 și diferența 4. Care este cel mai mare?',
      explain: 'Mijlocul este 10. Cel mare este 10 + 2 = 12.',
      steps: ['(sumă + diferență) : 2 = cel mare', '(20 + 4) : 2 = 12'],
      proof: () => (20 + 4) / 2
    })
  ];
  return { key: 'matematica:7:ecuati', flashcards, tests };
}

module.exports = { reale, ecuati };
