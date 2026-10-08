const { grid, numExam } = require('./shape');

function g(row) {
  return grid(row);
}

function n(row) {
  return numExam(row);
}

function date() {
  const flashcards = [
    g({
      id: 'hx-m7d-01', lesson: 'axe', level: 3, skill: 'apply', point: 'simetrie',
      question: 'Simetricul lui A(2, −3) față de origine este…',
      correct: '(−2, 3)',
      wrong: ['(−2, −3)', '(2, 3)', '(3, −2)'],
      explain: 'Față de origine schimbi ambele semne. Față de Ox ai schimba doar pe y. Față de Oy ai schimba doar pe x. (3, −2) schimbă locul coordonatelor.'
    }),
    g({
      id: 'hx-m7d-02', lesson: 'axe', level: 4, skill: 'trap', point: 'simetrie',
      question: 'Simetricul lui A(2, −3) față de axa Ox este…',
      correct: '(2, 3)',
      wrong: ['(−2, −3)', '(−2, 3)', '(−3, 2)'],
      explain: 'Ox păstrează abscisa și schimbă semnul ordonatei: (2, 3). (−2, 3) este simetricul față de origine, nu față de Ox.'
    }),
    g({
      id: 'hx-m7d-03', lesson: 'axe', level: 6, skill: 'apply', point: 'distanta',
      question: 'Distanța de la (0, 0) la (6, 8) este…',
      correct: '10',
      wrong: ['14', '48', '100'],
      explain: '6² + 8² = 36 + 64 = 100, iar √100 = 10. 14 adună coordonatele. 48 este produsul. 100 este pătratul distanței.'
    }),
    g({
      id: 'hx-m7d-04', lesson: 'dependente-grafic', level: 5, skill: 'analyze', point: 'dreapta',
      question: 'Care punct NU stă pe dreapta y = 2x + 1?',
      correct: '(2, 4)',
      wrong: ['(0, 1)', '(1, 3)', '(3, 7)'],
      explain: 'Pentru x = 2, y = 5, nu 4. (0, 1), (1, 3) și (3, 7) verifică regula. Capcana este să aduni 2 + 2 în loc de 2 × 2 + 1.'
    }),
    g({
      id: 'hx-m7d-05', lesson: 'dependente-tabel', level: 6, skill: 'apply', point: 'panta',
      question: 'De la (1, 2) la (3, 6), cu cât crește y când x crește cu 1?',
      correct: '2',
      wrong: ['4', '3', '1'],
      explain: 'Δx = 2 și Δy = 4, deci pe o unitate de x, y crește cu 2. 4 este creșterea totală, nu pe unitate.'
    }),
    g({
      id: 'hx-m7d-06', lesson: 'axe', level: 2, skill: 'trap', point: 'coordonate',
      question: 'La A(−4, 5), abscisa este…',
      correct: '−4',
      wrong: ['5', '4', '−5'],
      explain: 'Abscisa este prima coordonată, x. 5 este ordonata. Semnul nu se schimbă doar pentru că întrebi „care este”.'
    }),
    g({
      id: 'hx-m7d-07', lesson: 'dependente-tabel', level: 7, skill: 'analyze', point: 'regula',
      question: 'Tabel: x = 0, 1, 2 și y = 1, 3, 5. Pentru x = 4, y este…',
      correct: '9',
      wrong: ['7', '8', '10'],
      explain: 'y crește cu 2 când x crește cu 1, iar y = 2x + 1. Pentru x = 4, y = 9. 7 ar fi la x = 3. 8 uită +1.'
    }),
    g({
      id: 'hx-m7d-08', lesson: 'axe', level: 7, skill: 'apply', point: 'mijloc',
      question: 'Mijlocul segmentului de la (1, 2) la (5, 6) este…',
      correct: '(3, 4)',
      wrong: ['(4, 4)', '(6, 8)', '(2, 3)'],
      explain: 'Media absciselor este (1 + 5) : 2 = 3. Media ordonatelor este (2 + 6) : 2 = 4. (6, 8) este suma, nu media.'
    }),
    g({
      id: 'hx-m7d-09', lesson: 'dependente-grafic', level: 8, skill: 'false', point: 'dependenta',
      question: 'Care enunț este fals?',
      correct: 'Pe o dreaptă de forma y = ax + b, fiecărui x îi corespund două valori y.',
      wrong: [
        'Abscisa se citește pe axa Ox.',
        'Simetricul față de Ox schimbă semnul lui y.',
        'Distanța dintre două puncte se poate afla cu Pitagora pe Δx și Δy.'
      ],
      explain: 'O dependență de forma y = ax + b dă un singur y pentru fiecare x. Două valori y ar însemna că nu este grafic de funcție.'
    }),
    g({
      id: 'hx-m7d-10', lesson: 'axe', level: 8, skill: 'analyze', point: 'simetrie',
      question: 'A(3, −2). Îl simetrizezi față de Ox, apoi pe rezultat față de origine. Punctul final este…',
      correct: '(−3, −2)',
      wrong: ['(−3, 2)', '(3, 2)', '(−2, −3)'],
      explain: 'Față de Ox: (3, 2). Față de origine schimbi ambele semne: (−3, −2). (−3, 2) este doar simetricul față de Oy al punctului inițial.'
    }),
    g({
      id: 'hx-m7d-11', lesson: 'dependente-grafic', level: 4, skill: 'apply', point: 'citire',
      question: 'y = −2x + 9. Pentru x = 3, y este…',
      correct: '3',
      wrong: ['15', '−3', '12'],
      explain: '−2 × 3 + 9 = 3. 15 uită semnul lui −2. −3 uită să adune 9. 12 este 9 + 3, fără înmulțire.'
    }),
    g({
      id: 'hx-m7d-12', lesson: 'produs-cartezian', level: 5, skill: 'apply', point: 'perechi',
      question: 'A = {1, 2}, B = {a, b}. Câte perechi are A × B?',
      correct: '4',
      wrong: ['2', '3', '8'],
      explain: 'Perechile sunt (1, a), (1, b), (2, a), (2, b). Cardinalul produsului este 2 × 2 = 4, nu suma.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m7d-01', lesson: 'axe', level: 6, point: 'distanta', skill: 'apply',
      prompt: 'Cât este distanța dintre A(−1, 2) și B(2, 6)?',
      explain: 'Δx = 3 și Δy = 4. 9 + 16 = 25, deci distanța este 5.',
      steps: ['2 − (−1) = 3', '6 − 2 = 4', '3² + 4² = 25', '√25 = 5'],
      proof: () => 5
    }),
    n({
      id: 'hz-m7d-02', lesson: 'dependente-grafic', level: 6, point: 'dreapta', skill: 'apply',
      prompt: 'y = −2x + 9. Cât este y pentru x = 4?',
      explain: 'Înlocuiești x cu 4: −2 × 4 + 9 = 1.',
      steps: ['−2 × 4 = −8', '−8 + 9 = 1'],
      proof: () => -2 * 4 + 9
    }),
    n({
      id: 'hz-m7d-03', lesson: 'axe', level: 7, point: 'simetrie', skill: 'apply',
      prompt: 'Simetricul lui A(4, −5) față de axa Oy. Care este abscisa noului punct?',
      explain: 'Oy schimbă semnul lui x și păstrează y. Abscisa devine −4.',
      steps: ['Oy schimbă semnul abscisei', '4 devine −4'],
      proof: () => -4
    }),
    n({
      id: 'hz-m7d-04', lesson: 'dependente-tabel', level: 7, point: 'regula', skill: 'analyze',
      prompt: 'Punctele (0, 1), (1, 3) și (2, 5) stau pe aceeași dreaptă. Cât este y când x = 5?',
      explain: 'y = 2x + 1. Pentru x = 5, y = 11.',
      steps: ['De la un punct la altul, y crește cu 2', 'y = 2x + 1', '2 × 5 + 1 = 11'],
      proof: () => 2 * 5 + 1
    }),
    n({
      id: 'hz-m7d-05', lesson: 'axe', level: 8, point: 'distanta', skill: 'analyze',
      prompt: 'A(1, 2) și B(7, 10). Cât este distanța AB?',
      explain: 'Δx = 6 și Δy = 8. 36 + 64 = 100, deci distanța este 10.',
      steps: ['7 − 1 = 6', '10 − 2 = 8', '6² + 8² = 100', '√100 = 10'],
      proof: () => 10
    }),
    n({
      id: 'hz-m7d-06', lesson: 'axe', level: 8, point: 'simetrie', skill: 'analyze',
      prompt: 'Punctul (2, 5) stă pe dreapta y = 3x − 1. Simetricul lui față de Ox are ordonata…?',
      explain: 'Ordonata pe dreaptă este 5. Față de Ox, semnul lui y se schimbă: −5.',
      steps: ['3 × 2 − 1 = 5', 'Ox schimbă semnul ordonatei', 'Ordonata simetricului este −5'],
      proof: () => -(3 * 2 - 1)
    }),
    n({
      id: 'hz-m7d-07', lesson: 'axe', level: 7, point: 'mijloc', skill: 'apply',
      prompt: 'Mijlocul lui A(−2, 4) și B(8, −2). Care este abscisa mijlocului?',
      explain: 'Mijlocul pe abscisă este (−2 + 8) : 2 = 3.',
      steps: ['Media absciselor', '(−2 + 8) : 2 = 3'],
      proof: () => (-2 + 8) / 2
    }),
    n({
      id: 'hz-m7d-08', lesson: 'dependente-grafic', level: 8, point: 'dreapta', skill: 'analyze',
      prompt: 'y = 2x + 1. Pentru ce x avem y = 15? Apoi calculează y pentru x-ul găsit, minus 4. Cât iese?',
      explain: '2x + 1 = 15, deci x = 7 și y = 15. 15 − 4 = 11. Întrebarea cere diferența, nu pe x.',
      steps: ['2x = 14, x = 7', 'y = 15', '15 − 4 = 11'],
      proof: () => 15 - 4
    })
  ];
  return { key: 'matematica:7:date', flashcards, tests };
}

function geo7() {
  const flashcards = [
    g({
      id: 'hx-m7g-01', lesson: 'paralelogram', level: 3, skill: 'apply', point: 'unghiuri',
      question: 'Într-un paralelogram, un unghi are 70°. Unghiul alăturat lui are…',
      correct: '110°',
      wrong: ['70°', '20°', '90°'],
      explain: 'Unghiurile alăturate sunt suplementare: 180 − 70 = 110. 70° este cel opus, nu cel alăturat.'
    }),
    g({
      id: 'hx-m7g-02', lesson: 'arie-triunghi', level: 4, skill: 'trap', point: 'arie',
      question: 'Un triunghi are baza 10 cm și înălțimea corespunzătoare 6 cm. Aria este…',
      correct: '30 cm²',
      wrong: ['60 cm²', '16 cm²', '15 cm²'],
      explain: 'Aria este (10 × 6) : 2 = 30. 60 uită împărțirea la 2 și dă aria paralelogramului cu aceeași bază și înălțime.'
    }),
    g({
      id: 'hx-m7g-03', lesson: 'triunghiuri-asemenea', level: 7, skill: 'analyze', point: 'asemanare',
      question: 'Două triunghiuri asemenea au raportul laturilor 2:3 (mic:mare). Aria celui mare este 36. Aria celui mic este…',
      correct: '16',
      wrong: ['24', '18', '12'],
      explain: 'Raportul ariilor este (2/3)² = 4/9. 36 × 4/9 = 16. 24 înmulțește cu 2/3, nu cu pătratul raportului.'
    }),
    g({
      id: 'hx-m7g-04', lesson: 'unghi-inscris', level: 5, skill: 'apply', point: 'inscris',
      question: 'Un unghi la centru măsoară 80°. Unghiul înscris care vede același arc măsoară…',
      correct: '40°',
      wrong: ['80°', '160°', '20°'],
      explain: 'Unghiul înscris este jumătate din unghiul la centru pe același arc: 40°. 160 îl dublează. 20 îl împarte încă o dată.'
    }),
    g({
      id: 'hx-m7g-05', lesson: 'arie-trapez', level: 5, skill: 'apply', point: 'trapez',
      question: 'Trapez cu bazele 10 și 6 și înălțimea 4. Aria este…',
      correct: '32',
      wrong: ['40', '64', '20'],
      explain: '(10 + 6) × 4 : 2 = 32. 40 uită împărțirea la 2. 64 înmulțește bazele. 20 ia doar o bază.'
    }),
    g({
      id: 'hx-m7g-06', lesson: 'trigonometrie', level: 6, skill: 'trap', point: 'sinus',
      question: 'În triunghiul dreptunghic, sin α este…',
      correct: 'cateta opusă / ipotenuză',
      wrong: ['cateta alăturată / ipotenuză', 'cateta opusă / cateta alăturată', 'ipotenuză / cateta opusă'],
      explain: 'Sinusul este opusă pe ipotenuză. Alăturată pe ipotenuză este cosinusul. Opusă pe alăturată este tangenta. Raportul invers nu este sinusul.'
    }),
    g({
      id: 'hx-m7g-07', lesson: 'paralelogram', level: 4, skill: 'false', point: 'paralelogram',
      question: 'Care enunț este fals?',
      correct: 'Orice paralelogram este dreptunghi.',
      wrong: [
        'Într-un paralelogram, laturile opuse sunt egale.',
        'Într-un paralelogram, unghiurile opuse sunt egale.',
        'Dreptunghiul este un paralelogram cu un unghi drept.'
      ],
      explain: 'Paralelogramul are laturi opuse paralele, dar unghiurile nu sunt neapărat drepte. Dreptunghiul este un caz particular, nu regula.'
    }),
    g({
      id: 'hx-m7g-08', lesson: 'thales', level: 8, skill: 'apply', point: 'thales',
      question: 'O paralelă taie laturile unui unghi în segmente 3 și 6 pe o latură, iar pe cealaltă segmentele sunt x și 10, în aceeași ordine de la vârf. x este…',
      correct: '5',
      wrong: ['6', '4', '8'],
      explain: '3/6 = x/10, deci 1/2 = x/10 și x = 5. 6 copiază segmentul mare. 8 înmulțește 10 cu 3 și împarte la ceva apropiat de 4.'
    }),
    g({
      id: 'hx-m7g-09', lesson: 'trigonometrie', level: 8, skill: 'analyze', point: 'cosinus',
      question: 'Ipotenuza 17, cateta opusă unghiului α este 8. cos α este…',
      correct: '15/17',
      wrong: ['8/17', '8/15', '17/15'],
      explain: 'Cateta alăturată este 15, din 8² + 15² = 17². Cosinusul este alăturată pe ipotenuză: 15/17. 8/17 este sinusul.'
    }),
    g({
      id: 'hx-m7g-10', lesson: 'arie-paralelogram', level: 6, skill: 'trap', point: 'arie',
      question: 'Un paralelogram are baza 9 și înălțimea corespunzătoare 4. Aria este…',
      correct: '36',
      wrong: ['26', '18', '13'],
      explain: 'Aria este bază × înălțime = 36, nu semiprodusul. 26 este un perimetru posibil dacă ai și cealaltă latură, nu aria. 18 înjumătățește ca la triunghi.'
    }),
    g({
      id: 'hx-m7g-11', lesson: 'unghi-inscris', level: 7, skill: 'analyze', point: 'inscris',
      question: 'Un unghi înscris măsoară 35°. Unghiul la centru pe același arc măsoară…',
      correct: '70°',
      wrong: ['35°', '145°', '17,5°'],
      explain: 'Unghiul la centru este dublul celui înscris pe același arc. 145 este suplementarul. 17,5 înjumătățește încă o dată.'
    }),
    g({
      id: 'hx-m7g-12', lesson: 'triunghiuri-asemenea', level: 8, skill: 'false', point: 'asemanare',
      question: 'Care enunț este fals?',
      correct: 'La triunghiuri asemenea, raportul ariilor este egal cu raportul laturilor.',
      wrong: [
        'Triunghiurile asemenea au unghiurile respectiv egale.',
        'Raportul ariilor este pătratul raportului laturilor.',
        'Unghiul înscris este jumătate din unghiul la centru pe același arc.'
      ],
      explain: 'Ariile cresc cu pătratul scării, nu cu scara însăși. Dacă laturile sunt de două ori mai mari, aria este de patru ori mai mare.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m7g-01', lesson: 'arie-triunghi', level: 6, point: 'arie', skill: 'apply',
      prompt: 'Triunghi cu baza 12 cm și înălțimea corespunzătoare 5 cm. Aria, în cm²?',
      explain: '(12 × 5) : 2 = 30. Nu uita împărțirea la 2.',
      steps: ['12 × 5 = 60', '60 : 2 = 30'],
      proof: () => 12 * 5 / 2
    }),
    n({
      id: 'hz-m7g-02', lesson: 'unghi-inscris', level: 6, point: 'inscris', skill: 'apply',
      prompt: 'Un unghi la centru vede un arc de 100°. Câte grade are unghiul înscris care vede același arc?',
      explain: 'Unghiul înscris este jumătate: 50°.',
      steps: ['Unghiul la centru = măsura arcului = 100°', 'Unghiul înscris = 50°'],
      proof: () => 100 / 2
    }),
    n({
      id: 'hz-m7g-03', lesson: 'triunghiuri-asemenea', level: 7, point: 'asemanare', skill: 'analyze',
      prompt: 'Raportul laturilor a două triunghiuri asemenea este 3:2 (mare:mic). Aria celui mare este 45. Care este aria celui mic?',
      explain: 'Raportul ariilor este 9/4. Aria mică este 45 × 4/9 = 20.',
      steps: ['(3/2)² = 9/4', 'Aria mică = 45 × 4/9 = 20'],
      proof: () => 45 * 4 / 9
    }),
    n({
      id: 'hz-m7g-04', lesson: 'arie-trapez', level: 7, point: 'trapez', skill: 'apply',
      prompt: 'Trapez cu bazele 12 și 8, înălțimea 5. Aria?',
      explain: '(12 + 8) × 5 : 2 = 50.',
      steps: ['Suma bazelor = 20', '20 × 5 = 100', '100 : 2 = 50'],
      proof: () => (12 + 8) * 5 / 2
    }),
    n({
      id: 'hz-m7g-05', lesson: 'trigonometrie', level: 8, point: 'cosinus', skill: 'analyze',
      prompt: 'Triunghi dreptunghic, catete 8 și 15, ipotenuză 17. Cât măsoară cateta alăturată unghiului opus catetei de 8?',
      explain: 'Unghiul opus lui 8 are alăturată cealaltă catetă, 15.',
      steps: ['8² + 15² = 17²', 'Opusă lui α este 8', 'Alăturata este 15'],
      proof: () => 15
    }),
    n({
      id: 'hz-m7g-06', lesson: 'thales', level: 8, point: 'thales', skill: 'apply',
      prompt: 'Află x din proporția 3/5 = x/(x + 4).',
      explain: '3(x + 4) = 5x, deci 12 = 2x și x = 6.',
      steps: ['3/5 = x/(x + 4)', '3(x + 4) = 5x', '3x + 12 = 5x', 'x = 6'],
      proof: () => 6
    }),
    n({
      id: 'hz-m7g-07', lesson: 'paralelogram', level: 7, point: 'unghiuri', skill: 'apply',
      prompt: 'Într-un paralelogram, un unghi are 70°. Cât este suma unui unghi ascuțit și a unuia obtuz alăturat, în grade?',
      explain: 'Ascuțitul poate fi 70°, obtuzul alăturat este 110°. Suma lor este 180°.',
      steps: ['Alăturatele sunt suplementare', '70 + 110 = 180'],
      proof: () => 180
    }),
    n({
      id: 'hz-m7g-08', lesson: 'arie-triunghi', level: 8, point: 'arie', skill: 'analyze',
      prompt: 'Un triunghi dreptunghic are catetele 6 și 8. Ipotenuza este 10. Aria este semiprodusul catetelor. Cât este?',
      explain: '(6 × 8) : 2 = 24. Ipotenuza nu se înmulțește în arie.',
      steps: ['Aria = (6 × 8) : 2', '48 : 2 = 24'],
      proof: () => 6 * 8 / 2
    })
  ];
  return { key: 'matematica:7:geo7', flashcards, tests };
}

module.exports = { date, geo7 };
