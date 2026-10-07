const { grid, numExam } = require('./shape');

function g(row) {
  return grid(row);
}

function n(row) {
  return numExam(row);
}

function functii() {
  const flashcards = [
    g({
      id: 'hx-m8f-01', lesson: 'notiune-functie', level: 1, skill: 'apply', point: 'functie',
      question: 'f(x) = 2x + 1. Cât este f(3)?',
      correct: '7',
      wrong: ['6', '5', '9'],
      explain: 'Înlocuiești x cu 3: 2 × 3 + 1 = 7. 6 uită plus 1. 9 înmulțește 3 cu 3. 5 scade 1 în loc să-l adune.'
    }),
    g({
      id: 'hx-m8f-02', lesson: 'functia-axb', level: 2, skill: 'trap', point: 'functie',
      question: 'f(x) = −2x + 9. Cât este f(2)?',
      correct: '5',
      wrong: ['13', '−5', '7'],
      explain: '−2 × 2 + 9 = 5. 13 adună 4 la 9 și pierde semnul lui −2. −5 uită +9. 7 este −2 + 9, fără să înmulțești coeficientul cu 2.'
    }),
    g({
      id: 'hx-m8f-03', lesson: 'grafic-functie', level: 3, skill: 'apply', point: 'grafic',
      question: 'Dreapta f(x) = 3x − 1 taie axa Oy în punctul…',
      correct: '(0, −1)',
      wrong: ['(0, 3)', '(−1, 0)', '(3, −1)'],
      explain: 'Pe Oy, x este 0, deci f(0) = −1. Punctul este (0, −1). (0, 3) ia panta drept ordonată. (−1, 0) schimbă coordonatele.'
    }),
    g({
      id: 'hx-m8f-04', lesson: 'indicatori', level: 4, skill: 'false', point: 'mediana',
      question: 'Pentru valorile 2, 2, 5, 7 și 9, care enunț este fals?',
      correct: 'Mediana este valoarea care apare de cele mai multe ori.',
      wrong: [
        'Modul este valoarea care apare de cele mai multe ori.',
        'Amplitudinea este diferența dintre cea mai mare și cea mai mică valoare.',
        'Media se obține împărțind suma la numărul de valori.'
      ],
      explain: 'Valoarea care se repetă este modul, nu mediana. Mediana este valoarea din mijloc după ordonare. Aici mijlocul este 5, iar modul este 2.'
    }),
    g({
      id: 'hx-m8f-05', lesson: 'frecventa', level: 5, skill: 'trap', point: 'modul',
      question: 'Nota 7 apare de 4 ori, nota 8 de 6 ori, nota 9 de 2 ori. Modul este…',
      correct: '8',
      wrong: ['6', '7', '9'],
      explain: 'Modul este nota cu frecvența cea mai mare, deci 8. 6 este de câte ori apare, nu nota însăși. 7 și 9 apar mai rar.'
    }),
    g({
      id: 'hx-m8f-06', lesson: 'indicatori', level: 6, skill: 'analyze', point: 'mediana',
      question: 'Mediana șirului 2, 5, 6, 10, 11, 20 este…',
      correct: '8',
      wrong: ['6', '10', '9'],
      explain: 'Sunt șase valori, deja ordonate. Mediana este media celor două din mijloc: (6 + 10) / 2 = 8. 6 și 10 sunt capetele din mijloc, nu media lor. 9 este o medie aproximată din ochi.'
    }),
    g({
      id: 'hx-m8f-07', lesson: 'functia-axb', level: 6, skill: 'apply', point: 'functie',
      question: 'f(x) = −3x + 10. Cât este f(2) + f(4)?',
      correct: '2',
      wrong: ['6', '4', '−2'],
      explain: 'f(2) = 4 și f(4) = −2. Suma este 2. 6 iese dacă scazi −2 din 4 cu semnul greșit. 4 și −2 sunt valorile separate, nu suma.'
    }),
    g({
      id: 'hx-m8f-08', lesson: 'indicatori', level: 7, skill: 'trap', point: 'amplitudine',
      question: 'Scoți valoarea 20 din setul 3, 5, 8, 20. Noua amplitudine este…',
      correct: '5',
      wrong: ['17', '12', '8'],
      explain: 'Fără 20 rămân 3, 5 și 8. Amplitudinea este 8 − 3 = 5. 17 este 20 − 3, amplitudinea veche. 12 este 20 − 8. 8 este noul maxim, nu diferența.'
    }),
    g({
      id: 'hx-m8f-09', lesson: 'functia-axb', level: 7, skill: 'analyze', point: 'functie',
      question: 'f(x) = 2x − 1. Pentru ce x avem f(x) = f(3) + 6?',
      correct: '6',
      wrong: ['3', '5', '11'],
      explain: 'f(3) = 5, deci f(x) = 11. 2x − 1 = 11 dă x = 6. 3 este valoarea folosită la început. 5 este f(3). 11 este f(x), nu x.'
    }),
    g({
      id: 'hx-m8f-10', lesson: 'tabel-diagrame', level: 5, skill: 'apply', point: 'tabel',
      question: 'Tabelul are x = 0, 1, 2 și y = 1, 4, 7. Dacă regula rămâne, y pentru x = 3 este…',
      correct: '10',
      wrong: ['9', '8', '11'],
      explain: 'De la un x la următorul, y crește cu 3. Regula este y = 3x + 1. Pentru x = 3, y = 10. 9 uită +1. 11 adaugă încă un pas.'
    }),
    g({
      id: 'hx-m8f-11', lesson: 'functie-interval', level: 8, skill: 'analyze', point: 'imagine',
      question: 'f(x) = x + 2 este definită doar pe {1, 2, 3}. Câte valori distincte are imaginea?',
      correct: '3',
      wrong: ['2', '4', '6'],
      explain: 'Imaginile sunt 3, 4 și 5. Sunt trei numere diferite. 2 este numărul adunat, nu câte valori ies. 6 este suma argumentelor. 4 este doar una dintre imagini.'
    }),
    g({
      id: 'hx-m8f-12', lesson: 'indicatori', level: 8, skill: 'analyze', point: 'medie',
      question: 'Pentru 2, 3, 3 și 12, diferența dintre medie și modul este…',
      correct: '2',
      wrong: ['3', '5', '0'],
      explain: 'Suma este 20, media este 5. Modul este 3, singura valoare repetată. 5 − 3 = 2. 0 ar însemna că media și modul coincid. 5 este media, nu diferența.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m8f-01', lesson: 'functia-axb', level: 6, point: 'functie', skill: 'apply',
      prompt: 'f(x) = −3x + 10. Calculează f(2) + f(4).',
      explain: 'f(2) = 4 și f(4) = −2. Suma este 2.',
      steps: ['f(2) = −6 + 10 = 4', 'f(4) = −12 + 10 = −2', '4 + (−2) = 2'],
      proof: () => (-3 * 2 + 10) + (-3 * 4 + 10)
    }),
    n({
      id: 'hz-m8f-02', lesson: 'indicatori', level: 6, point: 'medie', skill: 'apply',
      prompt: 'Pentru valorile 2, 3, 3 și 12, cât este media minus modul?',
      explain: 'Media este 5, modul este 3. Diferența este 2.',
      steps: ['Suma = 20, media = 5', 'Modul = 3', '5 − 3 = 2'],
      proof: () => (2 + 3 + 3 + 12) / 4 - 3
    }),
    n({
      id: 'hz-m8f-03', lesson: 'indicatori', level: 7, point: 'mediana', skill: 'analyze',
      prompt: 'Ordonează 2, 9, 4, 9, 1, 6 și află mediana.',
      explain: 'Ordinea este 1, 2, 4, 6, 9, 9. Mediana este (4 + 6) / 2 = 5.',
      steps: ['Ordine: 1, 2, 4, 6, 9, 9', 'Mijlocul are două valori', '(4 + 6) / 2 = 5'],
      proof: () => (4 + 6) / 2
    }),
    n({
      id: 'hz-m8f-04', lesson: 'indicatori', level: 7, point: 'amplitudine', skill: 'trap',
      prompt: 'Din setul 3, 5, 20, 8 scoți valoarea 20. Cât este amplitudinea nouă?',
      explain: 'Rămân 3, 5 și 8. Amplitudinea este 8 − 3 = 5.',
      steps: ['Fără 20: 3, 5, 8', 'Maximul este 8, minimul este 3', '8 − 3 = 5'],
      proof: () => 8 - 3
    }),
    n({
      id: 'hz-m8f-05', lesson: 'functia-axb', level: 8, point: 'functie', skill: 'analyze',
      prompt: 'f(x) = 2x − 1. Află x pentru care f(x) = f(3) + 6.',
      explain: 'f(3) = 5, deci 2x − 1 = 11 și x = 6.',
      steps: ['f(3) = 6 − 1 = 5', '5 + 6 = 11', '2x − 1 = 11', 'x = 6'],
      proof: () => 6
    }),
    n({
      id: 'hz-m8f-06', lesson: 'frecventa', level: 8, point: 'modul', skill: 'analyze',
      prompt: 'Notele sunt 6, 6, 7, 7, 7 și 9. Cât este modul?',
      explain: '7 apare de trei ori, mai des decât 6 sau 9. Modul este 7.',
      steps: ['6 apare de 2 ori', '7 apare de 3 ori', '9 apare o dată', 'Modul = 7'],
      proof: () => 7
    }),
    n({
      id: 'hz-m8f-07', lesson: 'grafic-functie', level: 8, point: 'grafic', skill: 'apply',
      prompt: 'f(x) = 5x − 8. Cât este ordonata punctului în care graficul taie axa Oy?',
      explain: 'La x = 0, f(0) = −8. Ordonata este −8.',
      steps: ['Pe Oy, x = 0', 'f(0) = −8'],
      proof: () => -8
    }),
    n({
      id: 'hz-m8f-08', lesson: 'tabel-diagrame', level: 7, point: 'tabel', skill: 'apply',
      prompt: 'x ia valorile 0, 1, 2, iar y ia 1, 4, 7. Dacă regula se păstrează, cât este y când x = 4?',
      explain: 'y crește cu 3 la fiecare pas: y = 3x + 1. Pentru x = 4, y = 13.',
      steps: ['Diferența pe y este 3', 'y = 3x + 1', '3 × 4 + 1 = 13'],
      proof: () => 3 * 4 + 1
    })
  ];
  return { key: 'matematica:8:functii', flashcards, tests };
}

function spatiu() {
  const flashcards = [
    g({
      id: 'hx-m8s-01', lesson: 'prisma', level: 1, skill: 'apply', point: 'prisma',
      question: 'O prismă dreaptă are baza un dreptunghi 6 cm pe 4 cm. Câți centimetri are perimetrul bazei?',
      correct: '20',
      wrong: ['24', '10', '48'],
      explain: 'Perimetrul este 2 × (6 + 4) = 20. 24 este 6 × 4, adică aria bazei. 10 adună laturile o singură dată. 48 nu este conturul.'
    }),
    g({
      id: 'hx-m8s-02', lesson: 'arii-prisma', level: 3, skill: 'trap', point: 'arie',
      question: 'Aceeași prismă are înălțimea 5 cm. Aria laterală, în centimetri pătrați, este…',
      correct: '100',
      wrong: ['120', '24', '20'],
      explain: 'Aria laterală este perimetrul bazei ori înălțimea: 20 × 5 = 100. 120 este volumul, 6 × 4 × 5. 24 este aria unei baze. 20 este doar perimetrul.'
    }),
    g({
      id: 'hx-m8s-03', lesson: 'arii-prisma', level: 4, skill: 'analyze', point: 'volum',
      question: 'Volumul prismei cu baza 6 cm pe 4 cm și înălțimea 5 cm este…',
      correct: '120',
      wrong: ['100', '24', '30'],
      explain: 'Volumul este aria bazei ori înălțimea: 24 × 5 = 120. 100 este aria laterală. 30 este 6 × 5, fără lățimea. Nu confunda mantaua cu interiorul.'
    }),
    g({
      id: 'hx-m8s-04', lesson: 'arii-piramida', level: 5, skill: 'apply', point: 'piramida',
      question: 'O piramidă are baza un pătrat de latură 6 cm și înălțimea 6 cm. Volumul este…',
      correct: '72',
      wrong: ['216', '36', '108'],
      explain: 'Aria bazei este 36. Volumul piramidei este o treime din prisma cu aceeași bază și înălțime: 36 × 6 / 3 = 72. 216 este volumul prismei, fără împărțirea la 3.'
    }),
    g({
      id: 'hx-m8s-05', lesson: 'arii-cilindru', level: 6, skill: 'trap', point: 'cilindru',
      question: 'Un cilindru are raza 2 cm și înălțimea 5 cm. Folosești π = 3. Volumul este…',
      correct: '60',
      wrong: ['30', '120', '20'],
      explain: 'Volumul este π × r² × h = 3 × 4 × 5 = 60. 30 ia raza, nu pătratul razei. 120 folosește diametrul 4 ca și cum ar fi r². 20 este doar 4 × 5.'
    }),
    g({
      id: 'hx-m8s-06', lesson: 'arii-con', level: 6, skill: 'trap', point: 'con',
      question: 'Un con are aceeași rază 2 cm, aceeași înălțime 5 cm și π = 3. Volumul lui față de cilindrul de mai sus este…',
      correct: '20',
      wrong: ['60', '40', '15'],
      explain: 'Volumul conului este o treime din volumul cilindrului: 60 / 3 = 20. 60 este cilindrul întreg. 40 uită o parte din treime. Nu înmulți cu 3.'
    }),
    g({
      id: 'hx-m8s-07', lesson: 'recap-spatiu', level: 7, skill: 'analyze', point: 'volum',
      question: 'Un cub de latură 5 cm pierde dintr-un colț un cubuleț de latură 2 cm. Volumul rămas este…',
      correct: '117',
      wrong: ['125', '8', '100'],
      explain: '5³ = 125 și 2³ = 8. Rămân 117. 125 este cubul întreg. 8 este doar bucata tăiată. 100 este 5² × 4, o arie, nu un volum.'
    }),
    g({
      id: 'hx-m8s-08', lesson: 'sfera', level: 8, skill: 'apply', point: 'sfera',
      question: 'O sferă are raza 3 cm. Cu π = 3, volumul 4πr³/3 este…',
      correct: '108',
      wrong: ['36', '81', '27'],
      explain: '4 / 3 × 3 × 27 = 4 × 27 = 108. 36 este aria unui cerc de rază 3 cu π = 3? de fapt πr² = 27, iar 4πr² cu π = 3 este 108, dar aici 108 iese din volum. 27 este r³. 81 este 3⁴.'
    }),
    g({
      id: 'hx-m8s-09', lesson: 'plane-paralele', level: 2, skill: 'false', point: 'plane',
      question: 'Care enunț este fals?',
      correct: 'Două plane paralele se întâlnesc într-o dreaptă.',
      wrong: [
        'Două plane secante se taie după o dreaptă.',
        'O dreaptă paralelă cu un plan nu îl taie.',
        'O prismă dreaptă are două baze paralele.'
      ],
      explain: 'Planele paralele nu se întâlnesc. Dreapta de intersecție apare la plane secante. Celelalte enunțuri descriu corect paralelismul și prisma.'
    }),
    g({
      id: 'hx-m8s-10', lesson: 'piramida', level: 4, skill: 'trap', point: 'piramida',
      question: 'O piramidă și o prismă au aceeași bază și aceeași înălțime. Volumul piramidei este…',
      correct: 'o treime din volumul prismei',
      wrong: [
        'egal cu volumul prismei',
        'dublul volumului prismei',
        'jumătate din volumul prismei'
      ],
      explain: 'Piramida umple o treime din prisma cu aceeași bază și aceeași înălțime. Jumătatea este o capcană de la alte corpuri. Dublul ar face piramida mai mare decât prisma.'
    }),
    g({
      id: 'hx-m8s-11', lesson: 'arii-cilindru', level: 7, skill: 'analyze', point: 'arie',
      question: 'Cilindrul cu raza 2 cm și înălțimea 5 cm, π = 3, are aria laterală…',
      correct: '60',
      wrong: ['30', '24', '12'],
      explain: 'Aria laterală este 2πrh = 2 × 3 × 2 × 5 = 60. 30 uită factorul 2. 12 este doar 2 × 2 × 3, fără înălțimea. Aici aria laterală coincide numeric cu volumul, dar formula este alta: perimetrul bazei ori înălțimea.'
    }),
    g({
      id: 'hx-m8s-12', lesson: 'con', level: 8, skill: 'false', point: 'con',
      question: 'Care enunț este fals?',
      correct: 'Volumul conului este de trei ori volumul cilindrului cu aceeași bază și aceeași înălțime.',
      wrong: [
        'Volumul conului este o treime din volumul cilindrului cu aceeași bază și aceeași înălțime.',
        'Baza conului circular drept este un disc.',
        'Desfășurarea laterală a conului este un sector de disc.'
      ],
      explain: 'Conul este mai „subțire” decât cilindrul: volumul lui este o treime, nu triplu. Celelalte enunțuri descriu corect baza și desfășurarea.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m8s-01', lesson: 'arii-prisma', level: 6, point: 'arie', skill: 'apply',
      prompt: 'Prismă dreaptă, bază dreptunghi 6 cm pe 4 cm, înălțime 5 cm. Cât este aria laterală, în centimetri pătrați?',
      explain: 'Perimetrul bazei este 20. Aria laterală este 20 × 5 = 100.',
      steps: ['Perimetrul = 2 × (6 + 4) = 20', 'Aria laterală = 20 × 5 = 100'],
      proof: () => 2 * (6 + 4) * 5
    }),
    n({
      id: 'hz-m8s-02', lesson: 'arii-prisma', level: 6, point: 'volum', skill: 'trap',
      prompt: 'Pentru aceeași prismă, cât este volumul, în centimetri cubi?',
      explain: 'Aria bazei este 24. Volumul este 24 × 5 = 120. Nu înmulți perimetrul.',
      steps: ['Aria bazei = 6 × 4 = 24', 'Volumul = 24 × 5 = 120'],
      proof: () => 6 * 4 * 5
    }),
    n({
      id: 'hz-m8s-03', lesson: 'arii-piramida', level: 7, point: 'piramida', skill: 'apply',
      prompt: 'Piramidă cu baza un pătrat de latură 6 cm și înălțimea 6 cm. Cât este volumul?',
      explain: 'Aria bazei 36, apoi împărți produsul cu înălțimea la 3: 72.',
      steps: ['Aria bazei = 36', '36 × 6 = 216', '216 / 3 = 72'],
      proof: () => (6 * 6 * 6) / 3
    }),
    n({
      id: 'hz-m8s-04', lesson: 'arii-cilindru', level: 7, point: 'cilindru', skill: 'apply',
      prompt: 'Cilindru cu raza 2 cm și înălțimea 5 cm. Ia π = 3. Cât este volumul?',
      explain: 'πr²h = 3 × 4 × 5 = 60.',
      steps: ['r² = 4', '4 × 5 = 20', '20 × 3 = 60'],
      proof: () => 3 * 2 * 2 * 5
    }),
    n({
      id: 'hz-m8s-05', lesson: 'arii-con', level: 8, point: 'con', skill: 'trap',
      prompt: 'Con cu raza 2 cm și înălțimea 5 cm, π = 3. Cât este volumul?',
      explain: 'Este o treime din cilindrul corespunzător: 60 / 3 = 20.',
      steps: ['Volumul cilindrului = 60', 'Conul ia o treime', '60 / 3 = 20'],
      proof: () => (3 * 2 * 2 * 5) / 3
    }),
    n({
      id: 'hz-m8s-06', lesson: 'recap-spatiu', level: 8, point: 'volum', skill: 'analyze',
      prompt: 'Din un cub de latură 5 cm tai un cubuleț de latură 2 cm. Cât volum rămâne?',
      explain: 'Cubul mare are 125, cubulețul are 8, deci rămân 117.',
      steps: ['5³ = 125', '2³ = 8', '125 − 8 = 117'],
      proof: () => 5 ** 3 - 2 ** 3
    }),
    n({
      id: 'hz-m8s-07', lesson: 'sfera', level: 8, point: 'sfera', skill: 'apply',
      prompt: 'Sferă cu raza 3 cm și π = 3. Cât este volumul 4πr³/3?',
      explain: '4 / 3 × 3 × 27 = 108.',
      steps: ['r³ = 27', 'πr³ = 3 × 27 = 81', '4 / 3 × 81 = 108'],
      proof: () => (4 * 3 * 27) / 3
    }),
    n({
      id: 'hz-m8s-08', lesson: 'arii-cilindru', level: 7, point: 'arie', skill: 'analyze',
      prompt: 'Cilindrul cu raza 2 cm și înălțimea 5 cm, π = 3, are aria laterală 2πrh. Cât iese?',
      explain: '2 × 3 × 2 × 5 = 60. Este perimetrul cercului ori înălțimea.',
      steps: ['Perimetrul bazei = 2 × 3 × 2 = 12', '12 × 5 = 60'],
      proof: () => 2 * 3 * 2 * 5
    })
  ];
  return { key: 'matematica:8:spatiu', flashcards, tests };
}

module.exports = { functii, spatiu };
