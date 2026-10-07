const { grid, numExam, exam } = require('./shape');

function g(row) {
  return grid(row);
}

function n(row) {
  return numExam(row);
}

function intregi() {
  const flashcards = [
    g({
      id: 'hx-m6i-01', lesson: 'inmultire-intregi', level: 3, skill: 'trap', point: 'semne',
      question: 'Cât face (−3) × (−4)?',
      correct: '12',
      wrong: ['−12', '−7', '7'],
      explain: 'Două semne minus dau plus. 3 × 4 = 12. −12 păstrează un singur minus. −7 și 7 adună, nu înmulțesc.'
    }),
    g({
      id: 'hx-m6i-02', lesson: 'modul-comparare', level: 4, skill: 'trap', point: 'modul',
      question: 'Cât face |−5 + 2|?',
      correct: '3',
      wrong: ['7', '−3', '5'],
      explain: 'Întâi −5 + 2 = −3, apoi modulul este 3. 7 adună distanțele fără să țină cont de semne înăuntrul modulului. Modulul nu este niciodată negativ.'
    }),
    g({
      id: 'hx-m6i-03', lesson: 'adunare-intregi', level: 2, skill: 'apply', point: 'adunare',
      question: 'Cât face 5 + (−8)?',
      correct: '−3',
      wrong: ['3', '−13', '13'],
      explain: 'De la 5 cobori 8 și ajungi la −3. 3 schimbă semnul rezultatului. −13 și 13 adună valorile ca și cum ar avea același sens.'
    }),
    g({
      id: 'hx-m6i-04', lesson: 'inmultire-intregi', level: 5, skill: 'false', point: 'semne',
      question: 'Care enunț este fals?',
      correct: 'Minus ori minus dă minus.',
      wrong: [
        'Minus ori plus dă minus.',
        'Plus ori plus dă plus.',
        'Modulul unui număr este 0 sau un număr pozitiv.'
      ],
      explain: 'Două minusuri la înmulțire dau plus. Enunțul răstoarnă regula. Celelalte trei descriu corect semnele și modulul.'
    }),
    g({
      id: 'hx-m6i-05', lesson: 'ecuatii-intregi', level: 6, skill: 'apply', point: 'ecuatie',
      question: 'În ecuația 2x − 7 = 3, x este…',
      correct: '5',
      wrong: ['2', '−2', '10'],
      explain: '2x = 3 + 7 = 10, deci x = 5. 10 uită împărțirea la 2. −2 schimbă semnul când trece −7.'
    }),
    g({
      id: 'hx-m6i-06', lesson: 'puteri-intregi', level: 7, skill: 'trap', point: 'putere',
      question: 'Cât face −2²?',
      correct: '−4',
      wrong: ['4', '−2', '2'],
      explain: 'Fără paranteză, pătratul se aplică doar lui 2, apoi rămâne semnul minus: −(2²) = −4. (−2)² ar fi fost 4. Paranteza schimbă totul.'
    }),
    g({
      id: 'hx-m6i-07', lesson: 'adunare-rational', level: 6, skill: 'apply', point: 'rationale',
      question: 'Cât face (−1/4) + 2/3, ireductibil?',
      correct: '5/12',
      wrong: ['1/7', '1/12', '−5/12'],
      explain: 'Numitor 12: −3/12 + 8/12 = 5/12. 1/7 adună numerele separat. −5/12 păstrează semnul fracției mai mici.'
    }),
    g({
      id: 'hx-m6i-08', lesson: 'adunare-intregi', level: 8, skill: 'analyze', point: 'adunare',
      question: 'Cât face −8 + 3 − (−2)?',
      correct: '−3',
      wrong: ['−13', '−7', '3'],
      explain: '−8 + 3 = −5. A scădea −2 înseamnă a aduna 2: −5 + 2 = −3. −13 adună toate valorile cu minus. −7 uită că minusul din fața parantezei schimbă semnul.'
    }),
    g({
      id: 'hx-m6i-09', lesson: 'modul-comparare', level: 8, skill: 'analyze', point: 'modul',
      question: 'Cât face |−6| − |3 − 8|?',
      correct: '1',
      wrong: ['11', '−1', '5'],
      explain: '|−6| = 6. |3 − 8| = |−5| = 5. 6 − 5 = 1. 11 adună modulele. −1 scade în ordine inversă.'
    }),
    g({
      id: 'hx-m6i-10', lesson: 'ecuatii-intregi', level: 7, skill: 'apply', point: 'ecuatie',
      question: 'În 2(x − 3) = x + 1, x este…',
      correct: '7',
      wrong: ['5', '4', '1'],
      explain: '2x − 6 = x + 1, deci x = 7. 5 iese dacă uiți să treci −6. 4 împarte 1 + 3 + ceva la 2 prea devreme.'
    }),
    g({
      id: 'hx-m6i-11', lesson: 'inmultire-intregi', level: 4, skill: 'apply', point: 'semne',
      question: 'Cât face (−2) × 4 × (−1)?',
      correct: '8',
      wrong: ['−8', '6', '−6'],
      explain: 'Două minusuri și un plus: rezultatul este pozitiv. 2 × 4 × 1 = 8. −8 lasă un minus în plus.'
    }),
    g({
      id: 'hx-m6i-12', lesson: 'puteri-intregi', level: 5, skill: 'trap', point: 'putere',
      question: 'Cât face (−2)³?',
      correct: '−8',
      wrong: ['8', '−6', '6'],
      explain: 'Trei factori negativi dau semn minus: (−2) × (−2) × (−2) = −8. 8 ar fi fost pentru exponent par. −6 înmulțește baza cu exponentul.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m6i-01', lesson: 'adunare-intregi', level: 6, point: 'adunare', skill: 'apply',
      prompt: 'Calculează (−7) + 15 + (−9) − (−4).',
      explain: '−7 + 15 = 8. 8 + (−9) = −1. −1 − (−4) = 3.',
      steps: ['−7 + 15 = 8', '8 + (−9) = −1', '−1 + 4 = 3'],
      proof: () => -7 + 15 + -9 - -4
    }),
    n({
      id: 'hz-m6i-02', lesson: 'modul-comparare', level: 6, point: 'modul', skill: 'apply',
      prompt: 'Calculează |−6| − |3 − 8| + |−2|.',
      explain: '|−6| = 6, |3 − 8| = 5, |−2| = 2. 6 − 5 + 2 = 3.',
      steps: ['|3 − 8| = 5', '|−6| = 6 și |−2| = 2', '6 − 5 + 2 = 3'],
      proof: () => Math.abs(-6) - Math.abs(3 - 8) + Math.abs(-2)
    }),
    n({
      id: 'hz-m6i-03', lesson: 'ecuatii-intregi', level: 7, point: 'ecuatie', skill: 'apply',
      prompt: 'Află x: 4x − 9 = −x + 6.',
      explain: '4x + x = 6 + 9, deci 5x = 15 și x = 3.',
      steps: ['4x + x = 6 + 9', '5x = 15', 'x = 3'],
      proof: () => 3
    }),
    exam({
      id: 'hz-m6i-04', lesson: 'adunare-rational', level: 7, point: 'rationale', skill: 'apply',
      prompt: 'Calculează (−2/3) + 5/6. Fracție ireductibilă.',
      answers: ['1/6'],
      explain: 'Numitor 6: −4/6 + 5/6 = 1/6.',
      steps: ['−2/3 = −4/6', '−4/6 + 5/6 = 1/6'],
      match: 'exact'
    }),
    n({
      id: 'hz-m6i-05', lesson: 'puteri-intregi', level: 8, point: 'putere', skill: 'trap',
      prompt: 'Calculează (−3)² − (−2)³.',
      explain: '(−3)² = 9. (−2)³ = −8. 9 − (−8) = 17.',
      steps: ['(−3)² = 9', '(−2)³ = −8', '9 − (−8) = 17'],
      proof: () => (-3) ** 2 - (-2) ** 3
    }),
    n({
      id: 'hz-m6i-06', lesson: 'ecuatii-intregi', level: 8, point: 'ecuatie', skill: 'analyze',
      prompt: 'Află x din 2(x − 4) = 10, apoi calculează |x − 12|.',
      explain: 'x − 4 = 5, deci x = 9. |9 − 12| = 3.',
      steps: ['x − 4 = 5', 'x = 9', '|9 − 12| = 3'],
      proof: () => Math.abs(9 - 12)
    }),
    n({
      id: 'hz-m6i-07', lesson: 'inmultire-intregi', level: 7, point: 'semne', skill: 'apply',
      prompt: 'Calculează (−4) × (−3) − (−5) × 2.',
      explain: '12 − (−10) = 12 + 10 = 22. Al doilea produs este negativ, iar minusul din fața lui îl face pozitiv.',
      steps: ['(−4) × (−3) = 12', '(−5) × 2 = −10', '12 − (−10) = 22'],
      proof: () => (-4) * (-3) - (-5) * 2
    }),
    n({
      id: 'hz-m6i-08', lesson: 'modul-comparare', level: 8, point: 'modul', skill: 'analyze',
      prompt: 'Calculează |−4 × 3| − |−2|². Atenție: modulul lui −2, apoi pătratul.',
      explain: '|−12| = 12. |−2| = 2, iar 2² = 4. 12 − 4 = 8. Pătratul este în afara modulului doar după ce ai luat modulul, cum cere enunțul.',
      steps: ['−4 × 3 = −12, modulul este 12', '|−2| = 2', '2² = 4', '12 − 4 = 8'],
      proof: () => Math.abs(-4 * 3) - (Math.abs(-2) ** 2)
    })
  ];
  return { key: 'matematica:6:intregi-rationale', flashcards, tests };
}

function triunghi() {
  const flashcards = [
    g({
      id: 'hx-m6t-01', lesson: 'isoscel', level: 4, skill: 'apply', point: 'isoscel',
      question: 'Într-un triunghi isoscel, unghiul din vârf are 40°. Un unghi de la bază are…',
      correct: '70°',
      wrong: ['40°', '80°', '50°'],
      explain: 'Baza împarte restul: (180 − 40) : 2 = 70. 40 repetă vârful. 80 uită să împartă la 2 după o scădere greșită.'
    }),
    g({
      id: 'hx-m6t-02', lesson: 'suma-unghiuri', level: 5, skill: 'apply', point: 'exterior',
      question: 'Într-un triunghi, două unghiuri au 50° și 60°. Unghiul exterior alăturat celui de-al treilea are…',
      correct: '110°',
      wrong: ['70°', '120°', '130°'],
      explain: 'Al treilea unghi interior este 70°. Exteriorul alăturat lui este 180 − 70 = 110, adică suma celor două interioare nealăturate: 50 + 60.'
    }),
    g({
      id: 'hx-m6t-03', lesson: 'pitagora', level: 6, skill: 'trap', point: 'pitagora',
      question: 'Catetele au 5 cm și 12 cm. Ipotenuza are…',
      correct: '13 cm',
      wrong: ['17 cm', '7 cm', '60 cm'],
      explain: '5² + 12² = 25 + 144 = 169 = 13². 17 adună catetele. 7 le scade. 60 este produsul, nu ipotenuza.'
    }),
    g({
      id: 'hx-m6t-04', lesson: 'opuse-varf', level: 3, skill: 'false', point: 'opuse',
      question: 'Două drepte se taie. Care enunț este fals?',
      correct: 'Unghiurile opuse la vârf sunt suplementare.',
      wrong: [
        'Unghiurile opuse la vârf sunt egale.',
        'Două unghiuri alăturate formate astfel au suma 180°.',
        'Dacă unul are 40°, opusul lui are tot 40°.'
      ],
      explain: 'Opusele sunt egale, nu suplementare. Suplementare sunt cele alăturate, care formează un unghi alungit.'
    }),
    g({
      id: 'hx-m6t-05', lesson: 'cerc-elemente', level: 2, skill: 'trap', point: 'cerc',
      question: 'Un cerc are raza de 7 cm. Diametrul este…',
      correct: '14 cm',
      wrong: ['7 cm', '21 cm', '3,5 cm'],
      explain: 'Diametrul este de două ori raza: 14 cm. 7 repetă raza. 3,5 o înjumătățește încă o dată.'
    }),
    g({
      id: 'hx-m6t-06', lesson: 'suma-unghiuri', level: 3, skill: 'apply', point: 'suma',
      question: 'Două unghiuri ale unui triunghi au 50° și 60°. Al treilea are…',
      correct: '70°',
      wrong: ['80°', '110°', '90°'],
      explain: '180 − 50 − 60 = 70. 110 este suma celor două cunoscute, nu al treilea unghi. 80 greșește scăderea cu 10.'
    }),
    g({
      id: 'hx-m6t-07', lesson: 'triunghi-clasif', level: 4, skill: 'analyze', point: 'inegalitate',
      question: 'Care triplete NU pot fi laturile unui triunghi?',
      correct: '2 cm, 3 cm, 6 cm',
      wrong: ['3 cm, 4 cm, 5 cm', '5 cm, 5 cm, 6 cm', '4 cm, 4 cm, 4 cm'],
      explain: '2 + 3 = 5, mai mic decât 6, deci laturile nu se întâlnesc. La celelalte, suma oricăror două este mai mare decât a treia.'
    }),
    g({
      id: 'hx-m6t-08', lesson: 'secanta', level: 7, skill: 'apply', point: 'paralele',
      question: 'Două drepte paralele sunt tăiate de o secantă. Un unghi are 65°. Unghiul corespondent are…',
      correct: '65°',
      wrong: ['115°', '25°', '130°'],
      explain: 'Unghiurile corespondente, formate de o secantă cu două paralele, sunt egale. 115° este suplementarul, nu corespondentul.'
    }),
    g({
      id: 'hx-m6t-09', lesson: 'pitagora', level: 8, skill: 'analyze', point: 'pitagora',
      question: 'Catete 9 cm și 12 cm. Perimetrul triunghiului dreptunghic este…',
      correct: '36 cm',
      wrong: ['21 cm', '15 cm', '54 cm'],
      explain: 'Ipotenuza este 15, pentru că 9² + 12² = 225. Perimetrul este 9 + 12 + 15 = 36. 21 uită ipotenuza. 54 este aria, nu perimetrul.'
    }),
    g({
      id: 'hx-m6t-10', lesson: 'isoscel', level: 8, skill: 'analyze', point: 'exterior',
      question: 'Triunghi isoscel, un unghi de la bază are 55°. Unghiul exterior alăturat vârfului are…',
      correct: '110°',
      wrong: ['70°', '125°', '55°'],
      explain: 'Vârful este 180 − 55 − 55 = 70. Exteriorul alăturat vârfului este 180 − 70 = 110, cât cele două unghiuri de la bază împreună.'
    }),
    g({
      id: 'hx-m6t-11', lesson: 'congruenta', level: 6, skill: 'false', point: 'congruenta',
      question: 'Care enunț este fals?',
      correct: 'Două triunghiuri cu aceeași arie sunt congruente.',
      wrong: [
        'Laturile corespunzătoare ale triunghiurilor congruente sunt egale.',
        'Criteriul LLL spune că trei laturi egale, corespunzător, dau congruență.',
        'Într-un triunghi echilateral toate unghiurile au 60°.'
      ],
      explain: 'Aceeași arie nu fixează forma. Congruența cere laturi și unghiuri corespunzătoare egale, nu doar suprafața.'
    }),
    g({
      id: 'hx-m6t-12', lesson: 'opuse-varf', level: 7, skill: 'apply', point: 'opuse',
      question: 'Două drepte se taie și un unghi are 38°. Suma dintre opusul lui și unul alăturat este…',
      correct: '180°',
      wrong: ['76°', '142°', '218°'],
      explain: 'Opusul este tot 38°, alăturatul este 142°. 38 + 142 = 180. Oricare ar fi unghiul, opusul plus un alăturat fac un unghi alungit.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m6t-01', lesson: 'isoscel', level: 6, point: 'isoscel', skill: 'apply',
      prompt: 'Triunghi isoscel, unghiul din vârf 40°. Câte grade are un unghi de la bază?',
      explain: 'Rămân 140° pentru cele două unghiuri egale de la bază. 140 : 2 = 70.',
      steps: ['180 − 40 = 140', '140 : 2 = 70'],
      proof: () => (180 - 40) / 2
    }),
    n({
      id: 'hz-m6t-02', lesson: 'pitagora', level: 6, point: 'pitagora', skill: 'apply',
      prompt: 'Catete 8 cm și 15 cm. Cât este perimetrul triunghiului dreptunghic, în cm?',
      explain: '8² + 15² = 64 + 225 = 289 = 17². Perimetrul este 8 + 15 + 17 = 40.',
      steps: ['8² + 15² = 289', '√289 = 17', '8 + 15 + 17 = 40'],
      proof: () => 8 + 15 + 17
    }),
    n({
      id: 'hz-m6t-03', lesson: 'isoscel', level: 7, point: 'exterior', skill: 'analyze',
      prompt: 'Triunghi isoscel, un unghi de la bază are 55°. Câte grade are unghiul exterior alăturat vârfului?',
      explain: 'Vârful are 70°. Exteriorul alăturat este 110°, cât suma unghiurilor de la bază.',
      steps: ['Vârful = 180 − 2 × 55 = 70', 'Exteriorul = 180 − 70 = 110'],
      proof: () => 180 - (180 - 2 * 55)
    }),
    n({
      id: 'hz-m6t-04', lesson: 'opuse-varf', level: 7, point: 'opuse', skill: 'apply',
      prompt: 'Două drepte se taie. Un unghi are 38°. Cât este suma dintre opusul la vârf și unul alăturat, în grade?',
      explain: 'Opusul este 38°, alăturatul este 142°. Suma este 180°.',
      steps: ['Opusul = 38', 'Alăturatul = 180 − 38 = 142', '38 + 142 = 180'],
      proof: () => 38 + (180 - 38)
    }),
    n({
      id: 'hz-m6t-05', lesson: 'secanta', level: 8, point: 'paralele', skill: 'apply',
      prompt: 'Două paralele tăiate de o secantă formează un unghi de 65°. Câte grade are un unghi interior, de aceeași parte a secantei, alăturat cu el pe paralelă? Scrie măsura unghiului consecutiv intern.',
      explain: 'Unghiurile consecutive interne sunt suplementare. 180 − 65 = 115.',
      steps: ['Corespondentul este 65°', 'Consecutivul intern este suplementar', '180 − 65 = 115'],
      proof: () => 180 - 65
    }),
    n({
      id: 'hz-m6t-06', lesson: 'pitagora', level: 8, point: 'pitagora', skill: 'analyze',
      prompt: 'Catete 9 cm și 12 cm. Care este aria triunghiului dreptunghic, în cm²?',
      explain: 'Aria este semiprodusul catetelor: 9 × 12 : 2 = 54. Ipotenuza nu intră în arie.',
      steps: ['Aria = (9 × 12) : 2', '108 : 2 = 54'],
      proof: () => 9 * 12 / 2
    }),
    n({
      id: 'hz-m6t-07', lesson: 'suma-unghiuri', level: 8, point: 'exterior', skill: 'analyze',
      prompt: 'Într-un triunghi, unghiurile sunt 40°, 60° și 80°. Suma celor trei unghiuri exterioare, câte unul la fiecare vârf, este…? În grade.',
      explain: 'Fiecare exterior este 180° minus interiorul. Suma este 140 + 120 + 100 = 360.',
      steps: ['Exterioarele: 140°, 120°, 100°', '140 + 120 + 100 = 360', 'Suma exterioarelor unui triunghi este 360°'],
      proof: () => (180 - 40) + (180 - 60) + (180 - 80)
    }),
    n({
      id: 'hz-m6t-08', lesson: 'cerc-elemente', level: 7, point: 'cerc', skill: 'apply',
      prompt: 'Raza unui cerc este 9 cm. Câți centimetri fac împreună diametrul și încă o rază?',
      explain: 'Diametrul are 18 cm. Încă o rază are 9 cm. Împreună au 27 cm.',
      steps: ['Diametrul = 18', '18 + 9 = 27'],
      proof: () => 9 * 2 + 9
    })
  ];
  return { key: 'matematica:6:triunghi', flashcards, tests };
}

module.exports = { intregi, triunghi };
