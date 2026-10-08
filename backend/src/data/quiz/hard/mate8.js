const { grid, numExam } = require('./shape');

function g(row) {
  return grid(row);
}

function n(row) {
  return numExam(row);
}

function intervale() {
  const flashcards = [
    g({
      id: 'hx-m8i-01', lesson: 'intervale-reale', level: 3, skill: 'trap', point: 'interval',
      question: 'Câte numere întregi sunt în (−2, 4]?',
      correct: '6',
      wrong: ['7', '5', '4'],
      explain: '−2 nu intră. Intru −1, 0, 1, 2, 3 și 4: șase numere. 7 îl numără și pe −2. 5 uită un capăt.'
    }),
    g({
      id: 'hx-m8i-02', lesson: 'proprietati-inegalitati', level: 5, skill: 'trap', point: 'semn',
      question: 'Din −3x < 6 rezultă…',
      correct: 'x este mai mare decât −2',
      wrong: ['x este mai mic decât −3', 'x este mai mare decât 2', 'x este mai mic decât 2'],
      explain: 'Împarți la −3 și schimbi sensul: x este mai mare decât −2. Sensul neschimbat dă o soluție greșită. Împărțirea la 3 fără semnul minus mută capătul la 2.'
    }),
    g({
      id: 'hx-m8i-03', lesson: 'semne-fractii', level: 6, skill: 'analyze', point: 'semn',
      question: 'Mulțimea soluțiilor lui (x − 1)(x − 3) > 0 este…',
      correct: '(−∞, 1) ∪ (3, +∞)',
      wrong: ['(1, 3)', '(−∞, 1] ∪ [3, +∞)', '(−∞, 3)'],
      explain: 'Rădăcinile sunt 1 și 3. Produsul a doi factori cu același semn este pozitiv în afara rădăcinilor, nu între ele. Capetele nu intră, pentru că inegalitatea este strictă.'
    }),
    g({
      id: 'hx-m8i-04', lesson: 'operatii-intervale', level: 6, skill: 'apply', point: 'intersectie',
      question: 'Câte întregi sunt în [0, 5) ∩ (3, 6]?',
      correct: '1',
      wrong: ['2', '4', '0'],
      explain: 'Intersecția este (3, 5). Singurul întreg este 4. 5 nu intră în primul interval, 3 nu intră în al doilea.'
    }),
    g({
      id: 'hx-m8i-05', lesson: 'intervale-reale', level: 4, skill: 'false', point: 'capete',
      question: 'Care enunț este fals?',
      correct: 'Intervalul [2, 5) îl conține pe 5.',
      wrong: [
        'Intervalul [2, 5) îl conține pe 2.',
        'Intervalul (2, 5) nu îl conține nici pe 2, nici pe 5.',
        'x ≥ 0 și x < 4 se scriu [0, 4).'
      ],
      explain: 'Paranteza rotundă de la 5 taie capătul. 5 nu este în [2, 5). Celelalte trei enunțuri citesc corect parantezele.'
    }),
    g({
      id: 'hx-m8i-06', lesson: 'inecuatie-axb', level: 7, skill: 'apply', point: 'inecuatie',
      question: 'Cel mai mic număr întreg x cu x > 3 este…',
      correct: '4',
      wrong: ['3', '5', '2'],
      explain: 'Inegalitatea este strictă, deci 3 nu intră. Primul întreg de după 3 este 4.'
    }),
    g({
      id: 'hx-m8i-07', lesson: 'proprietati-inegalitati', level: 8, skill: 'analyze', point: 'modul',
      question: 'Mulțimea soluțiilor lui |x| < 3 este…',
      correct: 'interval deschis, de o parte și de alta a lui zero',
      wrong: [
        'interval închis, de o parte și de alta a lui zero',
        'doar valorile din afara capetelor, fără interior',
        'interval închis la stânga și deschis la dreapta'
      ],
      explain: 'Distanța până la zero este strict mai mică decât 3, deci x stă între capete, fără să le includă. Capetele ar intra doar la o inegalitate nestrictă.'
    }),
    g({
      id: 'hx-m8i-08', lesson: 'inecuatie-axb', level: 8, skill: 'analyze', point: 'inecuatie',
      question: 'Cel mai mic întreg x cu 2(x − 3) > x + 1 este…',
      correct: '8',
      wrong: ['7', '6', '9'],
      explain: '2x − 6 > x + 1, deci x > 7. Cel mai mic întreg strict mai mare decât 7 este 8. 7 nu verifică inegalitatea strictă.'
    }),
    g({
      id: 'hx-m8i-09', lesson: 'operatii-intervale', level: 7, skill: 'apply', point: 'reuniune',
      question: 'Câte întregi sunt în [−1, 2) ∪ {2}?',
      correct: '4',
      wrong: ['3', '5', '2'],
      explain: '[−1, 2) are −1, 0 și 1. Reuniunea cu {2} îl adaugă pe 2. Sunt patru întregi: −1, 0, 1, 2.'
    }),
    g({
      id: 'hx-m8i-10', lesson: 'semne-fractii', level: 8, skill: 'analyze', point: 'semn',
      question: 'Câte întregi verifică (x − 2)(x + 1) ≤ 0?',
      correct: '4',
      wrong: ['2', '3', '5'],
      explain: 'Produsul este negativ sau zero între rădăcini, inclusiv capetele: x de la −1 până la 2. Întregii sunt −1, 0, 1 și 2.'
    }),
    g({
      id: 'hx-m8i-11', lesson: 'inecuatie-axb', level: 2, skill: 'apply', point: 'inecuatie',
      question: 'Din x + 4 ≥ 1 rezultă…',
      correct: 'x este mai mare sau egal cu −3',
      wrong: ['x este mai mare sau egal cu 5', 'x este mai mic sau egal cu −4', 'x este mai mare sau egal cu 3'],
      explain: 'Scazi 4: x este mai mare sau egal cu −3. 5 adună 4 la 1. Sensul nu se schimbă, pentru că nu ai înmulțit cu un număr negativ.'
    }),
    g({
      id: 'hx-m8i-12', lesson: 'operatii-intervale', level: 5, skill: 'trap', point: 'intersectie',
      question: 'Câți întregi pari sunt în [−4, 6] ∩ [0, 5]?',
      correct: '3',
      wrong: ['4', '2', '6'],
      explain: 'Intersecția este [0, 5]. Parele sunt 0, 2 și 4. 6 nu intră în al doilea interval. 5 este impar.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m8i-01', lesson: 'intervale-reale', level: 6, point: 'interval', skill: 'apply',
      prompt: 'Câte numere întregi sunt în [−3, 4)?',
      explain: 'De la −3 până la 3 inclusiv. 4 nu intră. Sunt 7 numere.',
      steps: ['−3 intră', '4 nu intră', 'De la −3 la 3 sunt 7 numere'],
      proof: () => 3 - (-3) + 1
    }),
    n({
      id: 'hz-m8i-02', lesson: 'inecuatie-axb', level: 6, point: 'inecuatie', skill: 'trap',
      prompt: 'Care este cel mai mic număr întreg x cu −2x < 6?',
      explain: 'Împarți la −2 și schimbi sensul: x > −3. Cel mai mic întreg este −2.',
      steps: ['−2x < 6', 'x > −3', 'Primul întreg este −2'],
      proof: () => -2
    }),
    n({
      id: 'hz-m8i-03', lesson: 'operatii-intervale', level: 7, point: 'intersectie', skill: 'apply',
      prompt: 'Câte numere întregi sunt în [−1, 5] ∩ (2, 6)?',
      explain: 'Intersecția este (2, 5]. Întregii sunt 3, 4 și 5.',
      steps: ['Capătul stâng devine 2, deschis', 'Capătul drept rămâne 5', '3, 4 și 5'],
      proof: () => 3
    }),
    n({
      id: 'hz-m8i-04', lesson: 'semne-fractii', level: 7, point: 'semn', skill: 'analyze',
      prompt: 'Câte numere întregi verifică (x − 2)(x + 1) ≤ 0?',
      explain: 'Între −1 și 2, inclusiv: −1, 0, 1, 2. Sunt 4.',
      steps: ['Rădăcini −1 și 2', 'Produsul ≤ 0 între ele, cu capete', 'Patru întregi'],
      proof: () => 4
    }),
    n({
      id: 'hz-m8i-05', lesson: 'inecuatie-axb', level: 8, point: 'inecuatie', skill: 'analyze',
      prompt: 'Care este cel mai mic număr întreg x cu 2(x − 3) > x + 1?',
      explain: '2x − 6 > x + 1, deci x > 7. Cel mai mic întreg este 8.',
      steps: ['2x − 6 > x + 1', 'x > 7', 'Cel mai mic întreg este 8'],
      proof: () => 8
    }),
    n({
      id: 'hz-m8i-06', lesson: 'operatii-intervale', level: 8, point: 'modul', skill: 'analyze',
      prompt: 'Câte numere întregi verifică și |x| ≤ 4, și x > 1?',
      explain: '|x| ≤ 4 înseamnă de la −4 la 4. Cu x > 1 rămân 2, 3 și 4.',
      steps: ['|x| ≤ 4 dă [−4, 4]', 'Tai cu x > 1', 'Rămân 2, 3, 4'],
      proof: () => 3
    }),
    n({
      id: 'hz-m8i-07', lesson: 'intervale-reale', level: 8, point: 'interval', skill: 'analyze',
      prompt: 'Câte numere întregi pare sunt în [−3, 8) ∩ [−1, 6]?',
      explain: 'Intersecția este [−1, 6]. Parele sunt −0? −1 nu, apoi 0, 2, 4, 6. Sunt 4.',
      steps: ['Intersecția = [−1, 6]', 'Parele: 0, 2, 4, 6', 'Sunt 4'],
      proof: () => 4
    }),
    n({
      id: 'hz-m8i-08', lesson: 'proprietati-inegalitati', level: 7, point: 'semn', skill: 'trap',
      prompt: 'Rezolvă −2x ≤ 8. Care este cel mai mic număr întreg din soluție?',
      explain: 'Împarți la −2 și schimbi sensul: x ≥ −4. Capătul intră, deci cel mai mic întreg este −4.',
      steps: ['−2x ≤ 8', 'x ≥ −4', 'Cel mai mic întreg este −4'],
      proof: () => -4
    })
  ];
  return { key: 'matematica:8:intervale', flashcards, tests };
}

function algebric() {
  const flashcards = [
    g({
      id: 'hx-m8a-01', lesson: 'formule-scurte', level: 4, skill: 'trap', point: 'patrat',
      question: 'Pentru x = 2, (x + 3)² este…',
      correct: '25',
      wrong: ['13', '10', '11'],
      explain: '(2 + 3)² = 25. 13 este 2² + 3², fără dublul produsului. 10 este 2 + 3, apoi încă o dată adunat. Pătratul sumei nu este suma pătratelor.'
    }),
    g({
      id: 'hx-m8a-02', lesson: 'descompunere-formule', level: 5, skill: 'apply', point: 'diferenta',
      question: '4x² − 9 se descompune în…',
      correct: '(2x − 3)(2x + 3)',
      wrong: ['(2x − 3)²', '(4x − 3)(x + 3)', '(2x − 9)(2x + 1)'],
      explain: 'Este diferență de pătrate: (2x)² − 3². Nu este pătratul diferenței, care ar avea și termenul din mijloc.'
    }),
    g({
      id: 'hx-m8a-03', lesson: 'factor-grupare', level: 6, skill: 'apply', point: 'factor',
      question: 'Pentru x = 2, 6x² − 9x este…',
      correct: '6',
      wrong: ['15', '−6', '30'],
      explain: '3x(2x − 3) = 6 × 1 = 6. 6 × 4 − 9 × 2 = 24 − 18 = 6. 15 uită un semn sau un factor. 30 este doar 6x².'
    }),
    g({
      id: 'hx-m8a-04', lesson: 'fractii-domeniu', level: 7, skill: 'trap', point: 'simplificare',
      question: 'Pentru x = 5 și x ≠ 3, (x² − 9)/(x − 3) este…',
      correct: '8',
      wrong: ['4', '2', '16'],
      explain: 'x² − 9 = (x − 3)(x + 3). După simplificare rămâne x + 3 = 8. Nu împărți 25 − 9 la 2.'
    }),
    g({
      id: 'hx-m8a-05', lesson: 'ecuatie-grad2', level: 6, skill: 'apply', point: 'radacini',
      question: 'Ecuația x² = 16 are soluțiile…',
      correct: '4 și −4',
      wrong: ['doar 4', 'doar −4', '16 și −16'],
      explain: 'Două numere au pătratul 16: 4 și −4. 16 este pătratul, nu soluția.'
    }),
    g({
      id: 'hx-m8a-06', lesson: 'formule-scurte', level: 7, skill: 'trap', point: 'patrat',
      question: 'Pentru x = 5, (x − 2)² este…',
      correct: '9',
      wrong: ['21', '25', '3'],
      explain: '(5 − 2)² = 9. 21 este 25 − 4, fără dublul produsului cu semnul corect: x² − 4x + 4 = 25 − 20 + 4 = 9.'
    }),
    g({
      id: 'hx-m8a-07', lesson: 'descompunere-formule', level: 8, skill: 'apply', point: 'factor',
      question: 'x² − 5x + 6 se descompune în…',
      correct: '(x − 2)(x − 3)',
      wrong: ['(x − 1)(x − 6)', '(x + 2)(x + 3)', '(x − 5)(x − 1)'],
      explain: 'Cauți două numere cu suma 5 și produsul 6: 2 și 3, ambele cu minus din cauza semnului din mijloc. (x − 1)(x − 6) are produsul 6, dar suma 7.'
    }),
    g({
      id: 'hx-m8a-08', lesson: 'formule-scurte', level: 8, skill: 'analyze', point: 'diferenta',
      question: 'Pentru x = 3, (x + 4)² − (x − 1)² este…',
      correct: '45',
      wrong: ['33', '15', '9'],
      explain: 'Diferență de pătrate: (5) × (2x + 3) = 5 × 9 = 45. Sau 49 − 4 = 45. 15 este doar (x + 4) − (x − 1), înmulțit greșit.'
    }),
    g({
      id: 'hx-m8a-09', lesson: 'ecuatie-grad2', level: 8, skill: 'analyze', point: 'radacini',
      question: 'Suma soluțiilor ecuației x² − 5x + 6 = 0 este…',
      correct: '5',
      wrong: ['6', '−5', '1'],
      explain: 'Soluțiile sunt 2 și 3. Suma este 5, cât coeficientul lui x cu semn schimbat. 6 este produsul, nu suma.'
    }),
    g({
      id: 'hx-m8a-10', lesson: 'fractii-domeniu', level: 5, skill: 'false', point: 'domeniu',
      question: 'Care enunț este fals?',
      correct: 'Poți simplifica (x² − 9)/(x − 3) și pentru x = 3.',
      wrong: [
        'La x = 3, numitorul x − 3 este 0.',
        'Pentru x ≠ 3, fracția este egală cu x + 3.',
        '(a − b)(a + b) = a² − b².'
      ],
      explain: 'La x = 3 fracția nu există, pentru că împărți la 0. Simplificarea este valabilă doar acolo unde expresia este definită.'
    }),
    g({
      id: 'hx-m8a-11', lesson: 'factor-grupare', level: 3, skill: 'apply', point: 'factor',
      question: 'Factorul comun scos din 4x + 10 este…',
      correct: '2(2x + 5)',
      wrong: ['4(x + 10)', '2(2x + 10)', '4(x + 6)'],
      explain: '2 este în 4x și în 10. Rămâne 2x + 5, nu 2x + 10. 4 nu îl împarte pe 10.'
    }),
    g({
      id: 'hx-m8a-12', lesson: 'calcule-litere', level: 2, skill: 'trap', point: 'asemenea',
      question: '3x + 5x − 2x, pentru x = 1, este…',
      correct: '6',
      wrong: ['8', '10', '4'],
      explain: 'Coeficienții: 3 + 5 − 2 = 6, deci valoarea la x = 1 este 6. 10 adună doar primii doi coeficienți. 8 adaugă un termen în plus. 4 uită pe 5x.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m8a-01', lesson: 'formule-scurte', level: 6, point: 'patrat', skill: 'apply',
      prompt: 'Calculează (x + 4)² − (x − 1)² pentru x = 3.',
      explain: '7² − 2² = 49 − 4 = 45. Sau (5) × (2x + 3) = 5 × 9 = 45.',
      steps: ['x + 4 = 7 și x − 1 = 2', '49 − 4 = 45'],
      proof: () => (3 + 4) ** 2 - (3 - 1) ** 2
    }),
    n({
      id: 'hz-m8a-02', lesson: 'descompunere-formule', level: 6, point: 'diferenta', skill: 'apply',
      prompt: 'Calculează 4x² − 9 pentru x = 2.',
      explain: '(4 − 3)(4 + 3) = 1 × 7 = 7. Sau 16 − 9 = 7.',
      steps: ['4x² − 9 = (2x − 3)(2x + 3)', 'Pentru x = 2: 1 × 7 = 7'],
      proof: () => 4 * 4 - 9
    }),
    n({
      id: 'hz-m8a-03', lesson: 'factor-grupare', level: 7, point: 'factor', skill: 'apply',
      prompt: 'Calculează 6x² − 9x pentru x = 5.',
      explain: '3x(2x − 3) = 15 × 7 = 105.',
      steps: ['6 × 25 = 150', '9 × 5 = 45', '150 − 45 = 105'],
      proof: () => 6 * 25 - 9 * 5
    }),
    n({
      id: 'hz-m8a-04', lesson: 'fractii-domeniu', level: 7, point: 'simplificare', skill: 'trap',
      prompt: 'Simplifică (x² − 25)/(x − 5) pentru x = 8, unde x ≠ 5. Cât obții?',
      explain: 'Rămâne x + 5 = 13. Nu înlocui înainte să tai factorul comun.',
      steps: ['x² − 25 = (x − 5)(x + 5)', 'Pentru x ≠ 5 rămâne x + 5', '8 + 5 = 13'],
      proof: () => 8 + 5
    }),
    n({
      id: 'hz-m8a-05', lesson: 'ecuatie-grad2', level: 8, point: 'radacini', skill: 'analyze',
      prompt: 'Suma soluțiilor ecuației x² − 5x + 6 = 0.',
      explain: 'Soluțiile sunt 2 și 3. Suma este 5.',
      steps: ['(x − 2)(x − 3) = 0', 'x = 2 sau x = 3', '2 + 3 = 5'],
      proof: () => 2 + 3
    }),
    n({
      id: 'hz-m8a-06', lesson: 'formule-scurte', level: 8, point: 'patrat', skill: 'analyze',
      prompt: 'Calculează (2x − 1)² − (x − 1)(x + 1) pentru x = 3.',
      explain: '(6 − 1)² = 25. (x − 1)(x + 1) = x² − 1 = 8. 25 − 8 = 17.',
      steps: ['2 × 3 − 1 = 5, 5² = 25', '9 − 1 = 8', '25 − 8 = 17'],
      proof: () => (2 * 3 - 1) ** 2 - (3 ** 2 - 1)
    }),
    n({
      id: 'hz-m8a-07', lesson: 'ecuatie-grad2', level: 8, point: 'radacini', skill: 'analyze',
      prompt: 'Produsul soluțiilor ecuației x² − 7x + 12 = 0.',
      explain: 'Soluțiile sunt 3 și 4. Produsul este 12, termenul liber.',
      steps: ['(x − 3)(x − 4) = 0', '3 × 4 = 12'],
      proof: () => 12
    }),
    n({
      id: 'hz-m8a-08', lesson: 'descompunere-formule', level: 7, point: 'diferenta', skill: 'apply',
      prompt: 'Calculează (x + 2)² − (x − 2)² pentru x = 6.',
      explain: 'Diferența de pătrate dă 8x. 8 × 6 = 48.',
      steps: ['(a)² − (b)² = (a − b)(a + b)', 'a − b = 4 și a + b = 2x', '4 × 2x = 8x = 48'],
      proof: () => (6 + 2) ** 2 - (6 - 2) ** 2
    })
  ];
  return { key: 'matematica:8:algebric', flashcards, tests };
}

module.exports = { intervale, algebric };
