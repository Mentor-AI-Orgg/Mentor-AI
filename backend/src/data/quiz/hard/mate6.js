const { grid, numExam } = require('./shape');

function g(row) {
  return grid(row);
}

function n(row) {
  return numExam(row);
}

function multimi() {
  const flashcards = [
    g({
      id: 'hx-m6m-01', lesson: 'operatii-multimi', level: 3, skill: 'apply', point: 'reuniune',
      question: 'A = {1, 2, 3, 4}, B = {3, 4, 5}. Câte elemente are A ∪ B?',
      correct: '5',
      wrong: ['6', '2', '4'],
      explain: 'Reuniunea este {1, 2, 3, 4, 5}. Pe 3 și pe 4 nu le numeri de două ori, deci sunt 5 elemente, nu 4 + 2.'
    }),
    g({
      id: 'hx-m6m-02', lesson: 'operatii-multimi', level: 4, skill: 'apply', point: 'intersectie',
      question: 'A = {1, 2, 3, 4}, B = {3, 4, 5, 6}. Câte elemente are A ∩ B?',
      correct: '2',
      wrong: ['4', '8', '1'],
      explain: 'Comune sunt doar 3 și 4. 4 ar fi dacă ai număra toată pe A. 8 adună cardinalele.'
    }),
    g({
      id: 'hx-m6m-03', lesson: 'aplicatii-multimi', level: 6, skill: 'analyze', point: 'venn',
      question: 'Într-un grup de 30, 18 fac sport și 16 fac muzică, iar 7 le fac pe amândouă. Câți nu fac niciuna?',
      correct: '3',
      wrong: ['5', '4', '0'],
      explain: 'În cel puțin una: 18 + 16 − 7 = 27. În afară: 30 − 27 = 3. Dacă aduni 18 + 16 fără să scoți intersecția, grupul pare mai mare decât este.'
    }),
    g({
      id: 'hx-m6m-04', lesson: 'relatii-multimi', level: 2, skill: 'false', point: 'multime-vida',
      question: 'Care enunț este fals?',
      correct: 'Mulțimea vidă conține numărul 0.',
      wrong: [
        '0 poate fi element al unei mulțimi, dar nu este mulțimea vidă.',
        'A ⊂ B înseamnă că orice element din A este și în B.',
        'Două mulțimi fără elemente comune sunt disjuncte.'
      ],
      explain: 'Mulțimea vidă nu are niciun element. 0 este un număr; {0} are un element. Confuzia dintre „nimic” și „zero” este capcana.'
    }),
    g({
      id: 'hx-m6m-05', lesson: 'cmmdc', level: 5, skill: 'trap', point: 'cmmdc',
      question: 'c.m.m.d.c.(48, 18) este…',
      correct: '6',
      wrong: ['144', '18', '2'],
      explain: '48 = 2⁴ × 3, 18 = 2 × 3². Factorii comuni la puterea mică dau 2 × 3 = 6. 144 este c.m.m.m.c., nu c.m.m.d.c.'
    }),
    g({
      id: 'hx-m6m-06', lesson: 'cmmmc', level: 6, skill: 'apply', point: 'cmmmc',
      question: 'Trei semnale pornesc împreună și se repetă la 8 s, 12 s și 18 s. După câte secunde coincid din nou?',
      correct: '72',
      wrong: ['36', '144', '48'],
      explain: '8 = 2³, 12 = 2² × 3, 18 = 2 × 3². c.m.m.m.c. ia puterile cele mai mari: 2³ × 3² = 72. 36 nu se împarte la 8.'
    }),
    g({
      id: 'hx-m6m-07', lesson: 'descompunere', level: 7, skill: 'apply', point: 'divizori',
      question: 'Câți divizori pozitivi are 36?',
      correct: '9',
      wrong: ['6', '8', '4'],
      explain: '36 = 2² × 3², deci (2 + 1) × (2 + 1) = 9 divizori. 6 numără doar câțiva dintre ei, nu formula.'
    }),
    g({
      id: 'hx-m6m-08', lesson: 'operatii-multimi', level: 7, skill: 'analyze', point: 'diferenta',
      question: 'A = {1, 2, 3, 4, 5}, B = {4, 5, 6}. Câte elemente sunt în A, dar nu în B?',
      correct: '3',
      wrong: ['5', '2', '1'],
      explain: 'A fără B păstrează 1, 2 și 3. 5 este tot A. 2 este intersecția, nu diferența.'
    }),
    g({
      id: 'hx-m6m-09', lesson: 'cmmdc', level: 8, skill: 'analyze', point: 'cmmdc',
      question: 'c.m.m.d.c.(48, 18) × c.m.m.m.c.(48, 18) : 48 este egal cu…',
      correct: '18',
      wrong: ['6', '144', '48'],
      explain: 'Produsul dintre c.m.m.d.c. și c.m.m.m.c. este produsul numerelor. (48 × 18) : 48 = 18. Nu mai trebuie să calculezi 6 și 144 ca să vezi rezultatul.'
    }),
    g({
      id: 'hx-m6m-10', lesson: 'aplicatii-multimi', level: 8, skill: 'analyze', point: 'venn',
      question: '18 fac sport, 16 fac muzică, 7 le fac pe amândouă. Câți fac exact una, nu pe amândouă?',
      correct: '20',
      wrong: ['27', '34', '9'],
      explain: 'Doar sport: 18 − 7 = 11. Doar muzică: 16 − 7 = 9. Exact una: 11 + 9 = 20. 27 este reuniunea, care îi include și pe cei 7.'
    }),
    g({
      id: 'hx-m6m-11', lesson: 'descompunere', level: 4, skill: 'trap', point: 'factori',
      question: 'Descompunerea în factori primi a lui 60 este…',
      correct: '2² × 3 × 5',
      wrong: ['2 × 30', '4 × 3 × 5', '2 × 3 × 10'],
      explain: '60 = 2 × 2 × 3 × 5. 4 și 10 nu sunt prime, deci acele produse nu sunt descompuneri în factori primi, chiar dacă dau 60.'
    }),
    g({
      id: 'hx-m6m-12', lesson: 'relatii-multimi', level: 5, skill: 'false', point: 'incluziune',
      question: 'Care enunț este fals?',
      correct: 'Dacă A ⊂ B și B ⊂ A, atunci A și B pot fi diferite.',
      wrong: [
        'Dacă A ⊂ B și B ⊂ A, atunci A = B.',
        'Orice mulțime este submulțime a ei însăși.',
        'Mulțimea vidă este submulțime a oricărei mulțimi.'
      ],
      explain: 'Incluziunea în ambele sensuri înseamnă egalitate. Nu rămâne loc pentru elemente doar într-o parte.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m6m-01', lesson: 'aplicatii-multimi', level: 6, point: 'venn', skill: 'analyze',
      prompt: 'Într-o clasă de 32 de elevi, 18 fac matematică, 16 fac română și 7 le fac pe amândouă. Câți nu fac niciun cerc?',
      explain: 'În cel puțin un cerc: 18 + 16 − 7 = 27. În afară: 32 − 27 = 5.',
      steps: ['Reuniunea = 18 + 16 − 7 = 27', 'Nu aduni 18 + 16 fără intersecția 7', '32 − 27 = 5'],
      proof: () => 32 - (18 + 16 - 7)
    }),
    n({
      id: 'hz-m6m-02', lesson: 'cmmmc', level: 6, point: 'cmmmc', skill: 'apply',
      prompt: 'Trei semafoare clipesc la 8, 12 și 18 secunde și au clipit împreună la secunda 0. După câte secunde clipesc iar toate trei?',
      explain: 'c.m.m.m.c.(8, 12, 18) = 2³ × 3² = 72.',
      steps: ['8 = 2³', '12 = 2² × 3', '18 = 2 × 3²', '2³ × 3² = 72'],
      proof: () => 72
    }),
    n({
      id: 'hz-m6m-03', lesson: 'cmmdc', level: 7, point: 'cmmdc', skill: 'analyze',
      prompt: 'c.m.m.d.c.(84, 36) × c.m.m.m.c.(84, 36) : 84. Cât obții?',
      explain: 'Produsul c.m.m.d.c. și c.m.m.m.c. este 84 × 36. Împărțit la 84 rămâne 36.',
      steps: ['(a, b) × [a, b] = a × b', '84 × 36 : 84 = 36'],
      proof: () => 36
    }),
    n({
      id: 'hz-m6m-04', lesson: 'aplicatii-multimi', level: 7, point: 'venn', skill: 'analyze',
      prompt: '20 de elevi fac sport, 14 fac muzică și 6 le fac pe amândouă. Câți fac exact una?',
      explain: 'Doar sport: 14. Doar muzică: 8. Exact una: 22.',
      steps: ['20 − 6 = 14 fac doar sport', '14 − 6 = 8 fac doar muzică', '14 + 8 = 22'],
      proof: () => (20 - 6) + (14 - 6)
    }),
    n({
      id: 'hz-m6m-05', lesson: 'descompunere', level: 8, point: 'divizori', skill: 'apply',
      prompt: 'Câți divizori pozitivi are 180?',
      explain: '180 = 2² × 3² × 5. Numărul de divizori este 3 × 3 × 2 = 18.',
      steps: ['180 = 2² × 3² × 5¹', '(2 + 1) × (2 + 1) × (1 + 1) = 18'],
      proof: () => 3 * 3 * 2
    }),
    n({
      id: 'hz-m6m-06', lesson: 'cmmmc', level: 8, point: 'cmmmc', skill: 'analyze',
      prompt: 'Două autobuze pleacă împreună. Unul revine la 12 minute, celălalt la 18. De la minutul 0 până la minutul 72, inclusiv, de câte ori pleacă iar împreună, fără plecarea de la 0?',
      explain: 'c.m.m.m.c.(12, 18) = 36. În 72 de minute încap 72 : 36 = 2 plecări comune, la 36 și la 72.',
      steps: ['12 = 2² × 3, 18 = 2 × 3²', 'c.m.m.m.c. = 36', '72 : 36 = 2'],
      proof: () => 72 / 36
    }),
    n({
      id: 'hz-m6m-07', lesson: 'operatii-multimi', level: 7, point: 'reuniune', skill: 'apply',
      prompt: 'A are 11 elemente, B are 8, iar A ∩ B are 3. Câte elemente are A ∪ B?',
      explain: 'Reuniunea numără o singură dată elementele comune: 11 + 8 − 3 = 16.',
      steps: ['|A ∪ B| = |A| + |B| − |A ∩ B|', '11 + 8 − 3 = 16'],
      proof: () => 11 + 8 - 3
    }),
    n({
      id: 'hz-m6m-08', lesson: 'cmmdc', level: 8, point: 'cmmdc', skill: 'apply',
      prompt: 'Cel mai mare pătrat perfect care îl împarte pe 180. Care este?',
      explain: '180 = 2² × 3² × 5. Pentru un pătrat, exponenții trebuie pari, deci scoți pe 5: 2² × 3² = 36.',
      steps: ['180 = 2² × 3² × 5', 'Pătratul păstrează exponenții pari', '2² × 3² = 36'],
      proof: () => 36
    })
  ];
  return { key: 'matematica:6:multimi', flashcards, tests };
}

function proportii() {
  const flashcards = [
    g({
      id: 'hx-m6p-01', lesson: 'direct-invers', level: 3, skill: 'analyze', point: 'invers',
      question: '6 robinete identice umplu un bazin în 4 ore. 3 robinete, același debit, îl umplu în…',
      correct: '8 ore',
      wrong: ['2 ore', '12 ore', '7 ore'],
      explain: 'Produsul rămâne 6 × 4 = 24. 24 : 3 = 8 ore. Mai puține robinete înseamnă mai mult timp, nu jumătate din 4.'
    }),
    g({
      id: 'hx-m6p-02', lesson: 'procente', level: 6, skill: 'trap', point: 'procent',
      question: 'Un preț de 50 de lei crește cu 20%, apoi scade cu 20% din noul preț. Cât este acum?',
      correct: '48 de lei',
      wrong: ['50 de lei', '40 de lei', '46 de lei'],
      explain: '50 devine 60. 20% din 60 este 12, deci rămân 48. Al doilea procent nu se ia din prețul vechi.'
    }),
    g({
      id: 'hx-m6p-03', lesson: 'proportii', level: 4, skill: 'apply', point: 'scara',
      question: 'Pe o hartă la scara 1:50 000, 4 cm reprezintă în teren…',
      correct: '2 km',
      wrong: ['4 km', '200 m', '20 km'],
      explain: '4 × 50 000 cm = 200 000 cm = 2 km. 200 m uită doi de zero. 4 km ia centimetrul drept kilometru.'
    }),
    g({
      id: 'hx-m6p-04', lesson: 'proportii', level: 5, skill: 'false', point: 'proportie',
      question: 'Care proporție este adevărată?',
      correct: '2/3 = 4/6',
      wrong: ['2/3 = 3/6', '2/3 = 4/5', '2/3 = 6/4'],
      explain: 'Produsul extremilor 2 × 6 este 12, la fel produsul mezilor 3 × 4. La 2/3 = 3/6, 2 × 6 nu este 3 × 3.'
    }),
    g({
      id: 'hx-m6p-05', lesson: 'probabilitati', level: 4, skill: 'trap', point: 'probabilitate',
      question: 'Într-o pungă sunt 2 bile roșii și 3 albastre. Probabilitatea să extragi o bilă roșie este…',
      correct: '2/5',
      wrong: ['2/3', '3/5', '1/2'],
      explain: 'Cazuri favorabile 2, cazuri posibile 5. Nu împărți roșii la albastre. 3/5 este probabilitatea unei bile albastre.'
    }),
    g({
      id: 'hx-m6p-06', lesson: 'rapoarte', level: 2, skill: 'apply', point: 'raport',
      question: 'Raportul 12:18, scris ireductibil, este…',
      correct: '2:3',
      wrong: ['3:2', '6:9', '1:2'],
      explain: 'Împarți ambele părți la 6 și obții 2:3. 6:9 încă se simplifică. 3:2 răstoarnă raportul.'
    }),
    g({
      id: 'hx-m6p-07', lesson: 'procente', level: 5, skill: 'apply', point: 'procent',
      question: '15% din 60 este…',
      correct: '9',
      wrong: ['15', '6', '12'],
      explain: '10% din 60 este 6, iar 5% este 3, deci 15% este 9. 15 este procentul, nu partea. 6 este doar 10%.'
    }),
    g({
      id: 'hx-m6p-08', lesson: 'direct-invers', level: 7, skill: 'analyze', point: 'invers',
      question: '4 muncitori termină o lucrare în 6 ore. După 2 ore sosesc încă 4, același ritm. Câte ore mai durează de atunci?',
      correct: '2 ore',
      wrong: ['4 ore', '3 ore', '1 oră'],
      explain: 'Au rămas 4 ore de lucru la 4 oameni, adică 16 ore-om. 8 oameni le fac în 2 ore. 4 ore ar fi dacă nu ar sosi nimeni.'
    }),
    g({
      id: 'hx-m6p-09', lesson: 'regula-trei', level: 6, skill: 'apply', point: 'regula3',
      question: '8 caiete costă 56 de lei. Cât costă 5 caiete, fără reducere?',
      correct: '35 de lei',
      wrong: ['40 de lei', '30 de lei', '28 de lei'],
      explain: 'Un caiet costă 56 : 8 = 7 lei. 5 × 7 = 35. 40 ia 8 lei pe caiet. 28 este prețul a 4 caiete.'
    }),
    g({
      id: 'hx-m6p-10', lesson: 'procente', level: 8, skill: 'trap', point: 'procent',
      question: 'Un obiect costă 200 de lei. Reducere 10%, apoi încă 10% din noul preț. Cât plătești?',
      correct: '162 de lei',
      wrong: ['160 de lei', '180 de lei', '170 de lei'],
      explain: '10% din 200 este 20, rămân 180. Al doilea 10% este 18, nu 20. 180 − 18 = 162. 160 ar fi 20% din prețul inițial, dintr-o dată.'
    }),
    g({
      id: 'hx-m6p-11', lesson: 'rapoarte', level: 8, skill: 'false', point: 'direct',
      question: 'Care situație NU este direct proporțională?',
      correct: 'Mai mulți muncitori la aceeași lucrare, mai puține ore.',
      wrong: [
        'Mai mulți metri de stofă la același preț pe metru, mai mulți lei.',
        'Mai multe caiete la același preț pe bucată, mai mulți lei.',
        'O hartă la scară fixă: mai mulți centimetri pe hartă, mai mulți kilometri în teren.'
      ],
      explain: 'Muncitorii și orele sunt invers proporționale: produsul rămâne, nu raportul. La stofă, caiete și scară, dublarea uneia dublează pe cealaltă.'
    }),
    g({
      id: 'hx-m6p-12', lesson: 'probabilitati', level: 7, skill: 'analyze', point: 'probabilitate',
      question: 'Arunci un zar corect. Probabilitatea să iasă un număr prim este…',
      correct: '1/2',
      wrong: ['1/3', '1/6', '2/3'],
      explain: 'Pe zar, primele sunt 2, 3 și 5, deci 3 din 6, adică 1/2. 1 nu este prim. 2/3 le-ar număra și pe 1, și pe 4.'
    })
  ];
  const tests = [
    n({
      id: 'hz-m6p-01', lesson: 'regula-trei', level: 6, point: 'regula3', skill: 'apply',
      prompt: '10 m costă 80 de lei. Cumperi 4 m cu 25% reducere. Cât plătești, în lei?',
      explain: 'Metrul costă 8 lei, 4 metri costă 32. Reducerea este 8 lei, deci plătești 24.',
      steps: ['80 : 10 = 8', '4 × 8 = 32', '25% din 32 = 8', '32 − 8 = 24'],
      proof: () => 8 * 4 * 3 / 4
    }),
    n({
      id: 'hz-m6p-02', lesson: 'direct-invers', level: 6, point: 'invers', skill: 'analyze',
      prompt: '6 muncitori termină o lucrare în 8 ore. După 2 ore sosesc încă 6, același ritm. Câte ore mai durează de atunci?',
      explain: 'Rămâneau 6 ore la 6 oameni, adică 36 de ore-om. 12 oameni le fac în 3 ore.',
      steps: ['Au lucrat 2 ore din 8', 'Rămân 6 × 6 = 36 ore-om', '12 oameni: 36 : 12 = 3'],
      proof: () => (6 * (8 - 2)) / (6 + 6)
    }),
    n({
      id: 'hz-m6p-03', lesson: 'procente', level: 7, point: 'procent', skill: 'trap',
      prompt: 'Un preț de 80 de lei crește cu 25%, apoi scade cu 20% din noul preț. Cât este acum, în lei?',
      explain: '25% din 80 este 20, deci 100. 20% din 100 este 20. Rămân 80. Nu este același drum ca „plus 25 apoi minus 25”.',
      steps: ['80 + 25% = 100', '20% din 100 = 20', '100 − 20 = 80'],
      proof: () => 80 * 5 / 4 * 4 / 5
    }),
    n({
      id: 'hz-m6p-04', lesson: 'proportii', level: 7, point: 'scara', skill: 'apply',
      prompt: 'Hartă la scara 1:50 000. Distanța reală este 2,5 km. Câți centimetri măsoară pe hartă?',
      explain: '2,5 km = 250 000 cm. 250 000 : 50 000 = 5 cm.',
      steps: ['2,5 km = 250 000 cm', '1 cm pe hartă = 50 000 cm', '250 000 : 50 000 = 5'],
      proof: () => 250000 / 50000
    }),
    n({
      id: 'hz-m6p-05', lesson: 'procente', level: 8, point: 'procent', skill: 'analyze',
      prompt: 'Un obiect costă 160 de lei. Reducere 25%, apoi mai scazi 1/4 din ce a rămas. Cât plătești, în lei?',
      explain: '25% din 160 este 40, rămân 120. Un sfert din 120 este 30. 120 − 30 = 90.',
      steps: ['25% din 160 = 40', '160 − 40 = 120', '1/4 din 120 = 30', '120 − 30 = 90'],
      proof: () => 160 * 3 / 4 * 3 / 4
    }),
    n({
      id: 'hz-m6p-06', lesson: 'direct-invers', level: 8, point: 'invers', skill: 'analyze',
      prompt: '6 muncitori termină o lucrare în 8 ore. După 2 ore sosesc încă 3. Câte ore mai durează de atunci?',
      explain: 'Rămâneau 6 ore la 6 oameni, adică 36 ore-om. 9 oameni le fac în 4 ore.',
      steps: ['Rămân 6 ore la echipa inițială', '6 × 6 = 36 ore-om', '6 + 3 = 9 oameni', '36 : 9 = 4'],
      proof: () => (6 * (8 - 2)) / (6 + 3)
    }),
    n({
      id: 'hz-m6p-07', lesson: 'probabilitati', level: 7, point: 'probabilitate', skill: 'apply',
      prompt: 'Într-o urnă sunt 4 bile roșii și 6 albastre. Scoți una la întâmplare. Câte șanse din 5 ai să scoți o bilă albastră? Scrie numărătorul fracției ireductibile.',
      explain: 'Albastrele sunt 6 din 10, adică 3/5. Numărătorul este 3.',
      steps: ['6 / 10 = 3/5', 'Numărătorul ireductibil este 3'],
      proof: () => 3
    }),
    n({
      id: 'hz-m6p-08', lesson: 'regula-trei', level: 8, point: 'regula3', skill: 'analyze',
      prompt: '5 kg costă 40 de lei. Cumperi 2 kg și primești 25% reducere. Cât plătești, în lei?',
      explain: 'Kilogramul costă 8 lei, 2 kg costă 16. 25% din 16 este 4. Plătești 12.',
      steps: ['40 : 5 = 8 lei/kg', '2 × 8 = 16', '25% din 16 = 4', '16 − 4 = 12'],
      proof: () => 40 / 5 * 2 * 3 / 4
    })
  ];
  return { key: 'matematica:6:proportii', flashcards, tests };
}

module.exports = { multimi, proportii };
