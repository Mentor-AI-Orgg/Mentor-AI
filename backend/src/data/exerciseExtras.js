// Trepte 1–3: foarte ușor → ușor. Inspirate de tipare de manual, nu copiate.
// Se lipesc în fața băncii principale ca testul să urce de la simplu la greu.

function ex(id, point, prompt, answers, explain, extra = {}) {
  return {
    id,
    point,
    prompt,
    answers: answers.slice(),
    explain,
    hint: extra.hint || '',
    numeric: extra.numeric || null,
    tokens: extra.tokens || [],
    long: false,
    minWords: Number(extra.minWords) || 0,
    steps: Array.isArray(extra.steps) ? extra.steps.slice() : [],
    level: Number(extra.level) || 1
  };
}

const { stampLists } = require('./quiz/legacyLessons');

const EXTRAS = {
  'matematica:5:naturale': [
    ex('e5n5', 'puteri', 'Calculează 2³. Doar rezultatul.', ['8'], '2×2×2 = 8. Exponentul 3 spune trei factori.', { level: 1, numeric: { value: 8, tolerance: 0 }, steps: ['2³ = 2 × 2 × 2', '4 × 2 = 8'] }),
    ex('e5n6', 'paranteze', 'Calculează 36 : 4 + 5.', ['14'], 'Întâi împărțirea: 9, apoi +5 = 14.', { level: 2, numeric: { value: 14, tolerance: 0 }, steps: ['36 : 4 = 9', '9 + 5 = 14'] }),
    ex('e5n7', 'div3', 'Se împarte 45 exact la 3? da sau nu.', ['da'], '4+5=9, 9 se împarte la 3, deci da.', { level: 3, tokens: ['da'], steps: ['Suma cifrelor: 4+5=9', '9 : 3 = 3', 'Da'] })
  ],
  'matematica:5:fractii': [
    ex('e5f5', 'numitor', 'Calculează 1/2 + 1/2. Doar rezultatul.', ['1', '2/2'], 'Aceleași părți: 2/2 = 1.', { level: 1, steps: ['Numitor comun 2', '1/2 + 1/2 = 2/2', '2/2 = 1'] }),
    ex('e5f6', 'procent', 'Cât e 20% din 50?', ['10'], '20/100 × 50 = 10. Douăzeci dintr-o sută.', { level: 2, numeric: { value: 10, tolerance: 0 }, steps: ['20% = 20/100 = 1/5', '50 : 5 = 10'] }),
    ex('e5f7', 'media', 'Media aritmetică a notelor 4 și 8.', ['6'], '(4+8):2 = 6. Aduni, apoi împarți la 2.', { level: 3, numeric: { value: 6, tolerance: 0 }, steps: ['Suma = 12', '12 : 2 = 6'] })
  ],
  'matematica:5:geometrie': [
    ex('e5g5', 'unghi', 'Câte grade are un unghi drept?', ['90', '90°'], 'Colțul pătratului: 90°.', { level: 1, numeric: { value: 90, tolerance: 0 }, steps: ['Unghi drept = 90°'] }),
    ex('e5g6', 'mijloc', 'Segmentul AB are 16 cm. M este mijlocul. Cât este AM, în cm?', ['8'], 'Mijlocul taie lungimea în două: 16 : 2 = 8.', { level: 2, numeric: { value: 8, tolerance: 0 }, steps: ['AM = AB : 2', '16 : 2 = 8'] }),
    ex('e5g7', 'unitati', '3 metri câți centimetri sunt?', ['300', '300 cm'], '1 m = 100 cm, deci 300 cm.', { level: 3, numeric: { value: 300, tolerance: 0 }, steps: ['1 m = 100 cm', '3 × 100 = 300'] })
  ],
  'matematica:6:multimi': [
    ex('e6m5', 'reuniune', 'Câte elemente are {1, 3, 5, 7}?', ['4'], 'Patru numere distincte.', { level: 1, numeric: { value: 4, tolerance: 0 }, steps: ['Numeri valorile dintre acolade', 'Sunt 4'] }),
    ex('e6m6', 'apartine', 'Este 4 element al mulțimii {2, 4, 6}? da sau nu.', ['da'], '4 apare în mulțime, deci aparține.', { level: 2, tokens: ['da'], steps: ['Cauți 4 între acolade', 'Da'] }),
    ex('e6m7', 'cmmdc', 'c.m.m.d.c.(12, 18). Doar numărul.', ['6'], 'Divizori comuni: 1,2,3,6. Cel mai mare: 6.', { level: 3, numeric: { value: 6, tolerance: 0 }, steps: ['12 = 2²×3, 18 = 2×3²', 'c.m.m.d.c. = 2×3 = 6'] })
  ],
  'matematica:6:proportii': [
    ex('e6p5', 'regula3', '2 kg costă 16 lei. Cât costă 1 kg?', ['8', '8 lei'], '16 : 2 = 8. Un kilogram costă jumătate din 16.', { level: 1, numeric: { value: 8, tolerance: 0 }, steps: ['Reduci la 1 kg', '16 : 2 = 8'] }),
    ex('e6p6', 'procent6', '10% din 80. Doar numărul.', ['8'], '10/100 × 80 = 8. Zece la sută e o zecime.', { level: 2, numeric: { value: 8, tolerance: 0 }, steps: ['10% = o zecime', '80 : 10 = 8'] }),
    ex('e6p7', 'scara', 'Simplifică raportul 3 : 6. Scrie a:b.', ['1:2', '1 : 2'], 'Împarți ambele părți la 3.', { level: 3, steps: ['3 și 6 se divid la 3', 'Rămâne 1 : 2'] })
  ],
  'matematica:6:intregi-rationale': [
    ex('e6i5', 'adunare', 'Calculează (−3) + 5.', ['2'], 'De la −3 urci 5: ajungi la 2.', { level: 1, numeric: { value: 2, tolerance: 0 }, steps: ['−3 + 5 = 2'] }),
    ex('e6i6', 'modul', 'Cât este modulul lui −7?', ['7'], 'Modulul e distanța până la 0.', { level: 2, numeric: { value: 7, tolerance: 0 }, steps: ['|−7| = 7'] }),
    ex('e6i7', 'inmultire', 'Calculează (−2) × 4.', ['-8', '−8'], 'Minus ori plus = minus. 8.', { level: 3, numeric: { value: -8, tolerance: 0 }, steps: ['2 × 4 = 8', 'Semn: minus'] })
  ],
  'matematica:6:triunghi': [
    ex('e6t5', 'suma180', 'Câte grade au împreună unghiurile unui triunghi?', ['180', '180°'], 'Mereu 180°. Cele trei unghiuri fac un unghi alungit.', { level: 1, numeric: { value: 180, tolerance: 0 }, steps: ['Suma = 180°'] }),
    ex('e6t6', 'pitagora', 'Catete 3 cm și 4 cm. Ipotenuza?', ['5'], '9+16=25=5². Ipotenuza e 5 cm.', { level: 2, numeric: { value: 5, tolerance: 0 }, steps: ['3² + 4² = 9 + 16', '25 = 5²'] }),
    ex('e6t7', 'drept', 'Un unghi drept are… grade? Doar numărul.', ['90'], 'Drept = 90°. Colțul pătratului are 90 de grade.', { level: 3, numeric: { value: 90, tolerance: 0 }, steps: ['Unghi drept = 90°'] })
  ],
  'matematica:7:reale': [
    ex('e7r5', 'radical', 'Calculează √49.', ['7'], '7 × 7 = 49, deci radicalul e 7.', { level: 1, numeric: { value: 7, tolerance: 0 }, steps: ['7 × 7 = 49', '√49 = 7'] }),
    ex('e7r6', 'ordin', 'Calculează √16 + 1.', ['5'], '√16 este 4, apoi 4 + 1 = 5.', { level: 2, numeric: { value: 5, tolerance: 0 }, steps: ['√16 = 4', '4 + 1 = 5'] }),
    ex('e7r7', 'radical', 'Calculează 2 × √9.', ['6'], '√9=3, 2×3=6. Întâi radicalul, apoi înmulțirea.', { level: 3, numeric: { value: 6, tolerance: 0 }, steps: ['√9 = 3', '2 × 3 = 6'] })
  ],
  'matematica:7:ecuati': [
    ex('e7e5', 'cantar', 'Află x: x + 5 = 12.', ['7'], 'x = 12 − 5 = 7. Scazi 5 din ambele părți.', { level: 1, numeric: { value: 7, tolerance: 0 }, steps: ['Treci 5 în dreapta', '12 − 5 = 7'] }),
    ex('e7e6', 'ecuatie', 'Află x: 2x = 10.', ['5'], 'x = 10 : 2 = 5. Împarți ambele părți la 2.', { level: 2, numeric: { value: 5, tolerance: 0 }, steps: ['Împarți la 2', 'x = 5'] }),
    ex('e7e7', 'ecuatie', 'Află x: x − 3 = 4.', ['7'], 'x = 4 + 3 = 7. Treci −3 de cealaltă parte.', { level: 3, numeric: { value: 7, tolerance: 0 }, steps: ['Treci −3 în dreapta', '4 + 3 = 7'] })
  ],
  'matematica:7:date': [
    ex('e7d5', 'origine', 'La punctul A(2, 3), care e abscisa (x)?', ['2'], 'Prima coordonată e x.', { level: 1, numeric: { value: 2, tolerance: 0 }, steps: ['A(x, y) = A(2, 3)', 'x = 2'] }),
    ex('e7d6', 'pereche', 'Scrie originea ca (x, y).', ['(0, 0)', '(0,0)', '0,0'], 'Originea e (0, 0). Acolo se taie axele.', { level: 2, steps: ['Axa x taie axa y în 0', '(0, 0)'] }),
    ex('e7d7', 'depend', 'y = x + 1. Dacă x = 2, cât e y?', ['3'], 'Înlocuiești: 2 + 1 = 3.', { level: 3, numeric: { value: 3, tolerance: 0 }, steps: ['Înlocuiești x', '2 + 1 = 3'] })
  ],
  'matematica:7:geo7': [
    ex('e7g5', 'paralelogram', 'Pătrat de latură 5 cm. Aria, cm²?', ['25'], 'Aria pătratului: 5 × 5 = 25.', { level: 1, numeric: { value: 25, tolerance: 0 }, steps: ['Aria pătratului = latură²', '25'] }),
    ex('e7g6', 'arie-drep', 'Dreptunghi 3 cm × 4 cm. Aria?', ['12'], 'Aria dreptunghiului: 3 × 4 = 12.', { level: 2, numeric: { value: 12, tolerance: 0 }, steps: ['Aria = lungime × lățime', '12'] }),
    ex('e7g7', 'paralelogram', 'Într-un paralelogram, un unghi e 70°. Cât e unghiul opus?', ['70', '70°'], 'Unghiurile opuse sunt egale.', { level: 3, numeric: { value: 70, tolerance: 0 }, steps: ['Opusele sunt egale', '70°'] })
  ],
  'matematica:8:intervale': [
    ex('e8i5', 'interval', 'Este 3 în intervalul [1, 5]? da sau nu.', ['da'], '1 ≤ 3 ≤ 5, capetele sunt incluse.', { level: 1, tokens: ['da'], steps: ['[ ] include capetele', '3 e între 1 și 5', 'Da'] }),
    ex('e8i6', 'inecuatie', 'Pentru x > 2, este 2 o soluție? da sau nu.', ['nu'], 'Deschis: 2 nu intră. Inegalitatea e strictă.', { level: 2, tokens: ['nu'], steps: ['x > 2 e deschis la 2', '2 nu e soluție'] }),
    ex('e8i7', 'numar', 'Câte întregi sunt în [1, 3]?', ['3'], '1, 2 și 3. Ambele capete sunt închise.', { level: 3, numeric: { value: 3, tolerance: 0 }, steps: ['Capetele intră', '1, 2, 3'] })
  ],
  'matematica:8:algebric': [
    ex('e8a5', 'patrat', 'Calculează 5² − 4².', ['9'], '25 − 16 = 9. Întâi pătratele, apoi diferența.', { level: 1, numeric: { value: 9, tolerance: 0 }, steps: ['25 − 16 = 9'] }),
    ex('e8a6', 'diferenta', 'Calculează (x+1)(x−1) pentru x = 3.', ['8'], '4 × 2 = 8, sau 9−1=8.', { level: 2, numeric: { value: 8, tolerance: 0 }, steps: ['x+1=4, x−1=2', '4 × 2 = 8'] }),
    ex('e8a7', 'patrat', 'Calculează (−2)². Doar rezultatul.', ['4'], 'Minus ori minus = plus, deci 4.', { level: 3, numeric: { value: 4, tolerance: 0 }, steps: ['(−2)×(−2)=4'] })
  ],
  'matematica:8:functii': [
    ex('e8f5', 'dreapta', 'f(x)=x+1. Cât e f(4)?', ['5'], 'Înlocuiești x: 4 + 1 = 5.', { level: 1, numeric: { value: 5, tolerance: 0 }, steps: ['Înlocuiești x=4', '5'] }),
    ex('e8f6', 'medie', 'Media numerelor 2, 4, 6.', ['4'], '(2+4+6):3=4. Suma împărțită la trei valori.', { level: 2, numeric: { value: 4, tolerance: 0 }, steps: ['Suma 12', '12 : 3 = 4'] }),
    ex('e8f7', 'amplitudine', 'Amplitudinea setului 3, 5, 9.', ['6'], 'Amplitudine = maxim minus minim: 9 − 3 = 6.', { level: 3, numeric: { value: 6, tolerance: 0 }, steps: ['max − min', '9 − 3 = 6'] })
  ],
  'matematica:8:spatiu': [
    ex('e8s5', 'cub', 'Cub de latură 2. Volumul?', ['8'], 'Volumul cubului: 2 × 2 × 2 = 8.', { level: 1, numeric: { value: 8, tolerance: 0 }, steps: ['2 × 2 × 2 = 8'] }),
    ex('e8s6', 'fata', 'Cub de latură 3. Aria unei fețe?', ['9'], 'Fața e pătrat: 3 × 3 = 9.', { level: 2, numeric: { value: 9, tolerance: 0 }, steps: ['Fața e pătrat', '9'] }),
    ex('e8s7', 'desfasurare', 'Cub de latură 2. Aria totală?', ['24'], '6 fețe × 4 = 24. Fiecare față e un pătrat de arie 4.', { level: 3, numeric: { value: 24, tolerance: 0 }, steps: ['O față = 4', '6 × 4 = 24'] })
  ],
};

stampLists(EXTRAS);

module.exports = { EXTRAS };
