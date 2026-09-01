// Modele EN mate: structura clasică 2022 / e3.ro (I 6 grile numere, II 6 grile
// geometrie 1–6, III 6 exerciții a 2p + b 3p, oficiu 10). Răspunsurile NU pleacă
// odată cu testul. Cronometrul pornește la „Începe test”. Predare anticipată
// după 60 minute DOAR la simularea completă; antrenamentul scurt (mode=drill)
// nu are timp minim de sală. Lucrare 120 minute la examen, 25 la drill.
// Baremul și nota apar abia după finalizare. Redactarea are idei de barem, nu un text gata.
//
// Sloturile (divizori, procente, date, fracții, radical, proporții; apoi
// segmente, unghiuri, triunghi, arii, cerc, corpuri; apoi aritmetică, E(x),
// funcții, geometrie plană, spațiu) urmează structura publică a probei.
// Enunțurile, numerele și textele sunt originale. Nu copiem culegeri.

const { rng, seedFromHex, newSeed } = require('./itemRng');
const roBank = require('./enRomanaBank');
const { generateMathContent } = require('./enMateGenerate');

function envMs(name, fallback) {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function minStayMs() {
  return envMs('EN_MIN_STAY_MS', 60 * 60 * 1000);
}

function examMs() {
  return envMs('EN_EXAM_MS', 120 * 60 * 1000);
}

const MATH_NOTE =
  'Apasă „Începe test Evaluare Națională”. Ca la examen, stai cu lucrarea deschisă cel puțin o oră. Structura e cea clasică de EN (modele 2022): Subiectul I — 6 grile de numere (câte 5p); Subiectul II — 6 grile de geometrie, numerotate tot 1–6 (câte 5p); Subiectul III — 6 exerciții, fiecare cu a) 2p și b) 3p. La III scrii aici doar rezultatul; rezolvarea o faci pe caiet. După predare poți fotografia pagina (maximum 3 poze pe zi) ca mentorul să-ți dea feedback pe barem.';

const RO_NOTE =
  'Ca la EN 2026: două texte lungi (literar + nonliterar). Subiectul I A — înțelegere (grile + răspunsuri scrise + asociere cu o carte citită). Subiectul I B — doar gramatică, grile. Subiectul II — compunerea se scrie în caiet, nu se tastează; după predare o poți fotografia (3 poze/zi). Baremul se deschide după predare.';

function publicItem(n, points, prompt, extra = {}) {
  const row = { n, points, prompt, kind: extra.kind || (extra.choices ? 'mcq' : extra.parts ? 'en-parts' : 'short') };
  if (extra.choices) row.choices = extra.choices.slice(0, 4);
  if (extra.lines) row.lines = extra.lines;
  if (extra.passage) row.passage = true;
  if (extra.figure) row.figure = extra.figure;
  if (extra.photoOnly) row.photoOnly = true;
  if (extra.minWords) row.minWords = extra.minWords;
  if (extra.parts) {
    row.parts = extra.parts.map(part => ({
      id: part.id,
      points: part.points,
      prompt: part.prompt
    }));
  }
  return row;
}

function partsBarem(rows) {
  const parts = {};
  Object.entries(rows).forEach(([id, row]) => {
    parts[id] = {
      answer: row.answer,
      answers: row.answers || [row.answer],
      explain: row.explain || '',
      steps: row.steps || [],
      solution: row.solution || ''
    };
  });
  return {
    parts,
    explain: Object.values(parts).map(part => part.explain).filter(Boolean).join(' '),
    steps: Object.values(parts).flatMap(part => part.steps || []),
    solution: Object.values(parts).map(part => part.solution).filter(Boolean).join('\n\n')
  };
}

function block(label, points, intro, items) {
  return { label, points, intro: intro || '', items };
}

function paperShell(id, title, subject, hint, blocks, generated) {
  const stay = minStayMs();
  const exam = examMs();
  return {
    id,
    title,
    duration: '2 ore',
    oficiu: 10,
    completable: true,
    workOnPaper: false,
    generated: Boolean(generated),
    mode: 'exam',
    subject,
    hint,
    minStayMinutes: Math.max(1, Math.round(stay / 60000)),
    examMinutes: Math.max(1, Math.round(exam / 60000)),
    blocks,
    antiCheat: {
      baremAfterFinish: true,
      minStayMinutes: Math.max(1, Math.round(stay / 60000)),
      examMinutes: Math.max(1, Math.round(exam / 60000))
    }
  };
}

function timingForPaper(paper) {
  if (paper && (paper.mode === 'drill' || Number(paper.minStayMinutes) === 0)) {
    const examMinutes = Number(paper.examMinutes) > 0 ? Number(paper.examMinutes) : 25;
    return { stayMs: 0, examMs: examMinutes * 60 * 1000, mode: 'drill' };
  }
  return { stayMs: minStayMs(), examMs: examMs(), mode: 'exam' };
}

function asDrill(bundle, subject) {
  const clone = JSON.parse(JSON.stringify(bundle));
  const pub = clone.public;
  const sid = String(subject || pub.subject || '').toLowerCase().includes('rom') ? 'romana' : 'matematica';
  const seedBit = String(pub.id || '')
    .split(':')
    .filter(part => part && part !== 'drill')
    .pop() || '';
  pub.id = String(pub.id || '').endsWith(':drill') ? pub.id : `${pub.id}:drill`;
  pub.generated = true;
  pub.mode = 'drill';
  pub.duration = '25 de minute';
  pub.minStayMinutes = 0;
  pub.examMinutes = 25;
  pub.oficiu = 10;
  pub.antiCheat = {
    ...(pub.antiCheat || {}),
    minStayMinutes: 0,
    examMinutes: 25,
    baremAfterFinish: true
  };
  if (sid === 'romana') {
    pub.title = `Antrenament scurt — limba română · ${seedBit.slice(0, 4)}`;
    pub.hint =
      'Antrenament scurt: două texte, grile + două răspunsuri scrise, apoi 4 grile de gramatică. Fără compunere și fără ora de sală. Predai când termini. Baremul apare după predare.';
    pub.blocks = (pub.blocks || []).map(block => {
      if (block.label === 'Subiectul II') return null;
      if (block.label === 'Subiectul I A') {
        const items = (block.items || []).filter(item => item.n === 0 || item.kind === 'passage' || item.passage || item.n <= 7);
        return {
          ...block,
          points: items.filter(item => item.n > 0).reduce((sum, item) => sum + (Number(item.points) || 0), 0),
          intro: 'Citești cele două texte. Itemii 1–5 sunt grile. 6–7 se scriu scurt. Fără asociere și fără compunere.',
          items
        };
      }
      if (block.label === 'Subiectul I B') {
        const items = (block.items || []).filter(item => item.n > 0).slice(0, 4);
        return {
          ...block,
          points: items.reduce((sum, item) => sum + (Number(item.points) || 0), 0),
          intro: 'Gramatică — 4 grile, pe fragmente din texte.',
          items
        };
      }
      return block;
    }).filter(Boolean);
  } else {
    pub.title = `Antrenament scurt — matematică · ${seedBit.slice(0, 4)}`;
    pub.hint =
      'Antrenament scurt: 6 grile (Subiectul I) + 3 exerciții din Subiectul III, fiecare cu a) 2p și b) 3p. Fără grilele de geometrie (II) și fără ora de sală. La III scrii doar rezultatul. Predai când termini.';
    pub.blocks = (pub.blocks || []).map(block => {
      if (block.label === 'Subiectul II') return null;
      if (block.label === 'Subiectul III') {
        const items = (block.items || []).filter(item => item.n > 0).slice(0, 3);
        return {
          ...block,
          points: items.reduce((sum, item) => sum + (Number(item.points) || 0), 0),
          intro: 'Trei exerciții, ca la examen: fiecare cu a) 2 puncte și b) 3 puncte. Aici scrii doar rezultatul.',
          items
        };
      }
      return block;
    }).filter(Boolean);
  }
  const keep = new Set();
  (pub.blocks || []).forEach(block => {
    (block.items || []).forEach(item => {
      if (item.n > 0) keep.add(`${block.label}:${item.n}`);
    });
  });
  const nextBarem = {};
  Object.entries(clone.barem || {}).forEach(([key, row]) => {
    if (keep.has(key)) nextBarem[key] = row;
  });
  clone.barem = nextBarem;
  return clone;
}

function stripSecrets(paper) {
  return {
    ...paper,
    blocks: (paper.blocks || []).map(entry => ({
      ...entry,
      items: (entry.items || []).map(item => ({
        n: item.n,
        points: item.points,
        prompt: item.prompt,
        kind: item.kind,
        choices: item.choices ? item.choices.slice() : undefined,
        lines: item.lines,
        passage: item.passage,
        figure: item.figure,
        photoOnly: item.photoOnly || undefined,
        minWords: item.minWords || undefined,
        parts: item.parts
          ? item.parts.map(part => ({ id: part.id, points: part.points, prompt: part.prompt }))
          : undefined
      }))
    }))
  };
}

function itemKey(blockLabel, n) {
  return `${blockLabel}:${n}`;
}

// ——— Matematică: modele recomandate + generator (structură EN 2022 / e3.ro) ———

const III_INTRO =
  '6 exerciții, fiecare cu a) 2 puncte și b) 3 puncte. Pe caiet scrii rezolvarea. Aici scrii doar rezultatul. Rezolvarea completă apare după predare.';
const II_INTRO = 'Geometrie. 6 grile, numerotate 1–6. 4 variante. Calculele rămân pe foaie.';
const I_INTRO = 'Itemi scurți din numere, rapoarte și date. 6 grile, 4 variante. Pe foaie încercuiești litera.';

function mathPartsItem(n, prompt, extra) {
  return publicItem(n, 5, prompt, {
    kind: 'en-parts',
    figure: extra.figure,
    parts: [
      { id: 'a', points: 2, prompt: extra.a },
      { id: 'b', points: 3, prompt: extra.b }
    ]
  });
}

function mathRecommended() {
  const a = {
    public: paperShell('en-mate-a', 'Model recomandat A — matematică', 'matematica', MATH_NOTE, [
      block('Subiectul I', 30, I_INTRO, [
        publicItem(1, 5, 'Valoarea expresiei 3² × 4 − 18 : 6 + 5 este…', { choices: ['32', '38', '41', '23'] }),
        publicItem(2, 5, '15% din 160 lei, apoi încă 8 lei reducere. Ce sumă se plătește?', { choices: ['136 lei', '152 lei', '128 lei', '144 lei'] }),
        publicItem(3, 5, '[−2, 3) ∪ (1, 5] este același cu…', { choices: ['[−2, 5]', '[−2, 5)', '(−2, 5]', '[−2, 3] ∪ [1, 5]'] }),
        publicItem(4, 5, 'Fracția 12/18, adusă la forma ireductibilă, este…', { choices: ['2/3', '3/4', '4/6', '6/9'] }),
        publicItem(5, 5, 'Forma simplificată a lui √48 este…', { choices: ['16√3', '4√3', '8√3', '√16'] }),
        publicItem(6, 5, 'Raportul merelor verzi : roșii este 2 : 5. Sunt 14 mere verzi. Câte mere sunt în total?', { choices: ['19', '28', '35', '49'] })
      ]),
      block('Subiectul II', 30, II_INTRO, [
        publicItem(1, 5, 'Pe dreapta d, B este între A și C. AB = 7 cm, BC = 5 cm. AC este…', { choices: ['2 cm', '12 cm', '35 cm', '7 cm'], figure: 'points-line' }),
        publicItem(2, 5, 'Un unghi are 35°. Complementul său are măsura…', { choices: ['145°', '55°', '70°', '90°'], figure: 'angle' }),
        publicItem(3, 5, '△ABC ~ △DEF, raportul de asemănare 2. Dacă AB = 6 cm, atunci DE este…', { choices: ['8 cm', '3 cm', '12 cm', '24 cm'], figure: 'similar' }),
        publicItem(4, 5, 'Aria dreptunghiului 12 cm × 5 cm este…', { choices: ['34 cm²', '17 cm²', '60 cm²', '24 cm²'], figure: 'rectangle' }),
        publicItem(5, 5, 'Lungimea cercului de rază 5 cm este…', { choices: ['5π cm', '25π cm', '10π cm', '10 cm'], figure: 'circle' }),
        publicItem(6, 5, 'Volumul cubului cu muchia 4 cm este…', { choices: ['16 cm³', '24 cm³', '64 cm³', '96 cm³'], figure: 'cube' })
      ]),
      block('Subiectul III', 30, III_INTRO, [
        mathPartsItem(1, 'La o librărie, 6 caiete identice și un pix costă 50 lei. Pixul costă 8 lei.', {
          a: 'Arată că un caiet costă 7 lei.',
          b: 'Câte lei costă 5 caiete și 2 pixuri?'
        }),
        mathPartsItem(2, 'Se consideră expresia E(x) = 3x − 5, unde x este număr real.', {
          a: 'Arată că E(4) = 7.',
          b: 'Determină numărul real x pentru care E(x) = 10.'
        }),
        mathPartsItem(3, 'Se consideră funcția f: ℝ → ℝ, f(x) = 2x + 1.', {
          a: 'Arată că f(3) = 7.',
          b: 'Determină numărul real x pentru care f(x) = 11.'
        }),
        mathPartsItem(4, 'Trapezul isoscel ABCD are bazele AB = 14 cm, CD = 8 cm și înălțimea 5 cm.', {
          figure: 'trapezoid-iso',
          a: 'Arată că linia mijlocie a trapezului este 11 cm.',
          b: 'Calculează aria trapezului ABCD.'
        }),
        mathPartsItem(5, 'În planul foii este △ABC, dreptunghic în A, cu AB = 8 cm și AC = 6 cm.', {
          figure: 'triangle-right',
          a: 'Arată că lungimea ipotenuzei BC este 10 cm.',
          b: 'Calculează aria triunghiului ABC.'
        }),
        mathPartsItem(6, 'Un paralelipiped dreptunghic are lungimea 8 cm, lățimea 6 cm și înălțimea 5 cm.', {
          figure: 'box3d',
          a: 'Arată că aria totală a paralelipipedului este 236 cm².',
          b: 'Calculează volumul.'
        })
      ])
    ]),
    barem: {
      'Subiectul I:1': { letter: 'B', explain: '3²=9, 9×4=36, 18:6=3, 36−3+5=38.', steps: ['3² = 9', '9 × 4 = 36', '18 : 6 = 3', '36 − 3 + 5 = 38'] },
      'Subiectul I:2': { letter: 'C', explain: '15% din 160 = 24, rămân 136, minus 8 = 128 lei.', steps: ['15% × 160 = 24', '160 − 24 = 136', '136 − 8 = 128'] },
      'Subiectul I:3': { letter: 'A', explain: 'De la −2 închis până la 5 închis: cele două intervale se lipesc.', steps: ['[−2,3) ∪ (1,5] se lipește', 'Capătul stâng −2 inclus, capătul drept 5 inclus'] },
      'Subiectul I:4': { letter: 'A', explain: '12 și 18 se împart la 6: 2/3.', steps: ['c.m.m.d.c.(12,18)=6', '12:6=2, 18:6=3'] },
      'Subiectul I:5': { letter: 'B', explain: '√48 = √(16·3) = 4√3.', steps: ['48 = 16 × 3', '√16 = 4'] },
      'Subiectul I:6': { letter: 'D', explain: '2 părți = 14, o parte = 7, total 7 părți = 49.', steps: ['14 : 2 = 7', '7 × 7 = 49'] },
      'Subiectul II:1': { letter: 'B', explain: 'AC = AB + BC = 7 + 5 = 12 cm.', steps: ['B e între A și C', '7 + 5 = 12'] },
      'Subiectul II:2': { letter: 'B', explain: 'Complementul: 90 − 35 = 55°.', steps: ['Complementare = 90°', '90 − 35 = 55'] },
      'Subiectul II:3': { letter: 'C', explain: 'DE = 2 · AB = 12 cm.', steps: ['Raportul de asemănare înmulțește lungimile', '2 × 6 = 12'] },
      'Subiectul II:4': { letter: 'C', explain: 'A = 12 × 5 = 60 cm².', steps: ['lungime × lățime'] },
      'Subiectul II:5': { letter: 'C', explain: 'L = 2πr = 10π cm.', steps: ['L = 2πr', '2 × 5 = 10'] },
      'Subiectul II:6': { letter: 'C', explain: 'V = 4³ = 64 cm³.', steps: ['4 × 4 × 4 = 64'] },
      'Subiectul III:1': partsBarem({
        a: {
          answer: '7 lei',
          answers: ['7 lei', '7'],
          explain: '(50 − 8) : 6 = 42 : 6 = 7 lei.',
          steps: ['50 − 8 = 42', '42 : 6 = 7'],
          solution: 'a) Caietele costă 50 − 8 = 42 lei. Un caiet: 42 : 6 = 7 lei.'
        },
        b: {
          answer: '51 lei',
          answers: ['51 lei', '51'],
          explain: '5·7 + 2·8 = 35 + 16 = 51 lei.',
          steps: ['5 × 7 = 35', '2 × 8 = 16', '35 + 16 = 51'],
          solution: 'b) 5 caiete și 2 pixuri: 5 · 7 + 2 · 8 = 35 + 16 = 51 lei.'
        }
      }),
      'Subiectul III:2': partsBarem({
        a: {
          answer: '7',
          answers: ['7', 'E(4)=7', 'E(4) = 7'],
          explain: 'E(4) = 3·4 − 5 = 12 − 5 = 7.',
          steps: ['3 × 4 = 12', '12 − 5 = 7'],
          solution: 'a) E(4) = 3 · 4 − 5 = 12 − 5 = 7.'
        },
        b: {
          answer: '5',
          answers: ['5', 'x = 5', 'x=5'],
          explain: '3x − 5 = 10 ⇒ 3x = 15 ⇒ x = 5.',
          steps: ['3x = 15', 'x = 5'],
          solution: 'b) 3x − 5 = 10 ⇒ 3x = 15 ⇒ x = 5.'
        }
      }),
      'Subiectul III:3': partsBarem({
        a: {
          answer: '7',
          answers: ['7', 'f(3)=7', 'f(3) = 7'],
          explain: 'f(3) = 2·3 + 1 = 7.',
          steps: ['2 × 3 = 6', '6 + 1 = 7'],
          solution: 'a) f(3) = 2 · 3 + 1 = 7.'
        },
        b: {
          answer: '5',
          answers: ['5', 'x = 5', 'x=5'],
          explain: '2x + 1 = 11 ⇒ 2x = 10 ⇒ x = 5.',
          steps: ['2x = 10', 'x = 5'],
          solution: 'b) 2x + 1 = 11 ⇒ x = 5.'
        }
      }),
      'Subiectul III:4': partsBarem({
        a: {
          answer: '11 cm',
          answers: ['11 cm', '11'],
          explain: 'Linia mijlocie e media bazelor: (14+8)/2 = 11 cm.',
          steps: ['(B + b) / 2', '(14 + 8) / 2 = 11 cm'],
          solution: 'a) În trapez, linia mijlocie este media aritmetică a bazelor: m = (AB + CD) / 2 = (14 + 8) / 2 = 11 cm.'
        },
        b: {
          answer: '55 cm²',
          answers: ['55 cm²', '55', '55 cm2'],
          explain: 'A = (B+b)h/2 = (14+8)×5/2 = 55 cm².',
          steps: ['A = (14+8)×5 / 2', '22×5 = 110', '110/2 = 55 cm²'],
          solution: 'b) Aria trapezului: A = (B + b) · h / 2 = (14 + 8) · 5 / 2 = 110 / 2 = 55 cm². (Echivalent: linia mijlocie × înălțimea = 11 × 5 = 55.)'
        }
      }),
      'Subiectul III:5': partsBarem({
        a: {
          answer: '10 cm',
          answers: ['10 cm', '10', 'BC = 10', 'BC=10 cm'],
          explain: 'Pitagora: 8² + 6² = 64 + 36 = 100, deci BC = 10 cm.',
          steps: ['△ABC e dreptunghic în A', 'BC² = AB² + AC² = 64 + 36 = 100', 'BC = 10 cm'],
          solution: 'a) Triunghiul ABC este dreptunghic în A, deci ipotenuza e BC. Teorema lui Pitagora: BC² = AB² + AC² = 8² + 6² = 64 + 36 = 100. Așadar BC = 10 cm (tripletul 6-8-10).'
        },
        b: {
          answer: '24 cm²',
          answers: ['24 cm²', '24', '24 cm2', 'A = 24'],
          explain: 'A = (AB × AC) / 2 = 48 / 2 = 24 cm².',
          steps: ['Catetele sunt perpendiculare', 'A = (8 × 6) / 2 = 24 cm²'],
          solution: 'b) Aria unui triunghi dreptunghic e semiprodusul catetelor: A = (AB · AC) / 2 = (8 · 6) / 2 = 24 cm².'
        }
      }),
      'Subiectul III:6': partsBarem({
        a: {
          answer: '236 cm²',
          answers: ['236 cm²', '236', '236 cm2'],
          explain: 'A_t = 2(8·6 + 8·5 + 6·5) = 2(48+40+30) = 236 cm².',
          steps: ['Fețe: 8×6, 8×5, 6×5', '48 + 40 + 30 = 118', '×2 = 236 cm²'],
          solution: 'a) Aria totală a paralelipipedului dreptunghic: 2(Ll + Lh + lh) = 2(8·6 + 8·5 + 6·5) = 2(48 + 40 + 30) = 2·118 = 236 cm².'
        },
        b: {
          answer: '240 cm³',
          answers: ['240 cm³', '240', '240 cm3'],
          explain: 'V = L × l × h = 8 × 6 × 5 = 240 cm³.',
          steps: ['V = 8 × 6 × 5', '48 × 5 = 240 cm³'],
          solution: 'b) Volumul e produsul celor trei dimensiuni: V = 8 · 6 · 5 = 240 cm³.'
        }
      })
    }
  };

  return { a, b: mathRecommendedB(), c: mathRecommendedC() };
}

function mathRecommendedB() {
  return {
    public: paperShell('en-mate-b', 'Model recomandat B — matematică', 'matematica', MATH_NOTE, [
      block('Subiectul I', 30, I_INTRO, [
        publicItem(1, 5, 'c.m.m.d.c.(24, 36) și c.m.m.m.c.(24, 36) sunt…', { choices: ['12 și 72', '6 și 48', '24 și 36', '8 și 96'] }),
        publicItem(2, 5, 'Un obiect de 80 lei se scumpește cu 25%. Noul preț este…', { choices: ['105 lei', '100 lei', '85 lei', '120 lei'] }),
        publicItem(3, 5, 'Notele 7, 9, 9, 5. Media aritmetică este…', { choices: ['7,5', '9', '7', '8'] }),
        publicItem(4, 5, '0,6 e aceeași idee cu…', { choices: ['3/5', '3/4', '2/3', '6/9'] }),
        publicItem(5, 5, '√75, scris cu factor scos de sub radical, este…', { choices: ['5√3', '25√3', '3√5', '√25'] }),
        publicItem(6, 5, '5 muncitori, 12 zile. 6 muncitori, același ritm, termină în…', { choices: ['10 zile', '14,4 zile', '6 zile', '12 zile'] })
      ]),
      block('Subiectul II', 30, II_INTRO, [
        publicItem(1, 5, 'M este mijlocul segmentului AB, AB = 18 cm. AM este…', { choices: ['18 cm', '9 cm', '36 cm', '6 cm'], figure: 'points-line' }),
        publicItem(2, 5, 'Un unghi are 110°. Suplementul său are măsura…', { choices: ['70°', '20°', '80°', '250°'], figure: 'angle' }),
        publicItem(3, 5, 'Perimetrul triunghiului cu laturile 5 cm, 7 cm și 8 cm este…', { choices: ['20 cm', '35 cm', '13 cm', '40 cm'], figure: 'triangle' }),
        publicItem(4, 5, 'Aria triunghiului cu baza 10 cm și înălțimea 6 cm este…', { choices: ['60 cm²', '16 cm²', '30 cm²', '32 cm²'], figure: 'triangle' }),
        publicItem(5, 5, 'Aria discului de rază 4 cm este…', { choices: ['8π cm²', '4π cm²', '16π cm²', '16 cm²'], figure: 'circle' }),
        publicItem(6, 5, 'Volumul paralelipipedului 5 cm × 4 cm × 3 cm este…', { choices: ['12 cm³', '60 cm³', '47 cm³', '20 cm³'], figure: 'box3d' })
      ]),
      block('Subiectul III', 30, III_INTRO, [
        mathPartsItem(1, 'Suma a două numere este 30, iar diferența lor este 8.', {
          a: 'Arată că numărul mai mare este 19.',
          b: 'Calculează produsul celor două numere.'
        }),
        mathPartsItem(2, 'Se consideră expresia E(x) = 2x² − 3x + 1, unde x este număr real.', {
          a: 'Arată că E(2) = 3.',
          b: 'Calculează E(0) + E(1).'
        }),
        mathPartsItem(3, 'Se consideră funcția f: ℝ → ℝ, f(x) = −x + 4.', {
          a: 'Arată că f(1) = 3.',
          b: 'Determină punctul în care graficul taie Ox (abscisa).'
        }),
        mathPartsItem(4, 'Triunghiul ABC are baza BC = 12 cm și înălțimea AD = 5 cm, D ∈ BC.', {
          figure: 'triangle',
          a: 'Arată că AD = 5 cm.',
          b: 'Calculează aria triunghiului ABC.'
        }),
        mathPartsItem(5, 'Triunghiul ABC este dreptunghic în A, AB = 5 cm, AC = 12 cm.', {
          figure: 'triangle-right',
          a: 'Arată că BC = 13 cm.',
          b: 'Calculează aria triunghiului ABC.'
        }),
        mathPartsItem(6, 'Un cub are muchia de 5 cm.', {
          figure: 'cube',
          a: 'Arată că aria unei fețe este 25 cm².',
          b: 'Calculează volumul cubului.'
        })
      ])
    ]),
    barem: {
      'Subiectul I:1': { letter: 'A', explain: '24=2³·3, 36=2²·3² → d=12, m=72.', steps: ['c.m.m.d.c.=12', 'c.m.m.m.c.=72'] },
      'Subiectul I:2': { letter: 'B', explain: '25% din 80 = 20, noul preț 100 lei.', steps: ['80 : 4 = 20', '80 + 20 = 100'] },
      'Subiectul I:3': { letter: 'A', explain: '(7+9+9+5):4=30:4=7,5.', steps: ['Suma=30', '30:4=7,5'] },
      'Subiectul I:4': { letter: 'A', explain: '0,6=6/10=3/5.', steps: ['6/10 simplificat cu 2'] },
      'Subiectul I:5': { letter: 'A', explain: '√75=√(25·3)=5√3.', steps: ['75=25×3', '√25=5'] },
      'Subiectul I:6': { letter: 'A', explain: 'Invers: 5×12=60=6×10.', steps: ['Mărimi invers proporționale', '60:6=10'] },
      'Subiectul II:1': { letter: 'B', explain: 'Mijlocul taie segmentul în două: 18:2=9 cm.', steps: ['AM = AB / 2'] },
      'Subiectul II:2': { letter: 'A', explain: '180 − 110 = 70°.', steps: ['Suplementare = 180°'] },
      'Subiectul II:3': { letter: 'A', explain: '5+7+8=20 cm.', steps: ['Suma laturilor'] },
      'Subiectul II:4': { letter: 'C', explain: '(10×6)/2=30 cm².', steps: ['(bază × înălțime) / 2'] },
      'Subiectul II:5': { letter: 'C', explain: 'πr² = 16π cm².', steps: ['4² = 16'] },
      'Subiectul II:6': { letter: 'B', explain: '5×4×3=60 cm³.', steps: ['V = L·l·h'] },
      'Subiectul III:1': partsBarem({
        a: {
          answer: '19',
          answers: ['19'],
          explain: '(30 + 8) : 2 = 19.',
          steps: ['(suma + diferența) : 2'],
          solution: 'a) Numărul mare = (30 + 8) / 2 = 19.'
        },
        b: {
          answer: '209',
          answers: ['209'],
          explain: 'Micul = (30 − 8)/2 = 11, produsul 19×11=209.',
          steps: ['11', '19 × 11 = 209'],
          solution: 'b) Numărul mic = (30 − 8) / 2 = 11. Produsul = 19 · 11 = 209.'
        }
      }),
      'Subiectul III:2': partsBarem({
        a: {
          answer: '3',
          answers: ['3'],
          explain: 'E(2)=2·4 − 3·2 + 1 = 8 − 6 + 1 = 3.',
          steps: ['2²=4', '2·4=8', '3·2=6', '8−6+1=3'],
          solution: 'a) E(2) = 2(2)² − 3(2) + 1 = 8 − 6 + 1 = 3.'
        },
        b: {
          answer: '1',
          answers: ['1'],
          explain: 'E(0)=1, E(1)=2−3+1=0, suma 1.',
          steps: ['E(0)=1', 'E(1)=0', '1+0=1'],
          solution: 'b) E(0) = 1. E(1) = 2 − 3 + 1 = 0. Suma = 1.'
        }
      }),
      'Subiectul III:3': partsBarem({
        a: {
          answer: '3',
          answers: ['3'],
          explain: 'f(1)= −1 + 4 = 3.',
          steps: ['−1 + 4 = 3'],
          solution: 'a) f(1) = −1 + 4 = 3.'
        },
        b: {
          answer: '4',
          answers: ['4', 'x = 4', '(4, 0)', '(4,0)'],
          explain: 'f(x)=0 ⇒ −x+4=0 ⇒ x=4.',
          steps: ['−x + 4 = 0', 'x = 4'],
          solution: 'b) Intersecția cu Ox: f(x)=0 ⇒ −x + 4 = 0 ⇒ x = 4.'
        }
      }),
      'Subiectul III:4': partsBarem({
        a: {
          answer: '5 cm',
          answers: ['5 cm', '5'],
          explain: 'AD e înălțimea din enunț: 5 cm.',
          steps: ['AD = 5 cm'],
          solution: 'a) Din enunț, AD = 5 cm.'
        },
        b: {
          answer: '30 cm²',
          answers: ['30 cm²', '30', '30 cm2'],
          explain: 'A = (12 × 5) / 2 = 30 cm².',
          steps: ['(12 × 5) / 2 = 30'],
          solution: 'b) A = (BC · AD) / 2 = (12 · 5) / 2 = 30 cm².'
        }
      }),
      'Subiectul III:5': partsBarem({
        a: {
          answer: '13 cm',
          answers: ['13 cm', '13'],
          explain: '5²+12²=25+144=169, BC=13 cm.',
          steps: ['Pitagora', '√169 = 13'],
          solution: 'a) BC² = 5² + 12² = 25 + 144 = 169. BC = 13 cm.'
        },
        b: {
          answer: '30 cm²',
          answers: ['30 cm²', '30', '30 cm2'],
          explain: 'A = (5×12)/2 = 30 cm².',
          steps: ['(5 × 12) / 2 = 30'],
          solution: 'b) A = (AB · AC) / 2 = 30 cm².'
        }
      }),
      'Subiectul III:6': partsBarem({
        a: {
          answer: '25 cm²',
          answers: ['25 cm²', '25', '25 cm2'],
          explain: 'Fața e pătrat 5×5 = 25 cm².',
          steps: ['A_față = a² = 25 cm²'],
          solution: 'a) O față a cubului e un pătrat de latură 5 cm, deci A = 5² = 25 cm².'
        },
        b: {
          answer: '125 cm³',
          answers: ['125 cm³', '125', '125 cm3'],
          explain: 'V = a³ = 125 cm³.',
          steps: ['5³ = 125 cm³'],
          solution: 'b) Volumul cubului: V = a³ = 5 · 5 · 5 = 125 cm³.'
        }
      })
    }
  };
}

function mathRecommendedC() {
  return {
    public: paperShell('en-mate-c', 'Model recomandat C — matematică', 'matematica', MATH_NOTE, [
      block('Subiectul I', 30, I_INTRO, [
        publicItem(1, 5, '−3 + 8 − (−2) este…', { choices: ['7', '3', '13', '−7'] }),
        publicItem(2, 5, '20% din 45 este…', { choices: ['9', '20', '25', '4,5'] }),
        publicItem(3, 5, 'Intervalul (2, 7] conține…', { choices: ['7, dar nu 2', '2, dar nu 7', '2 și 7', 'nici 2, nici 7'] }),
        publicItem(4, 5, 'Raportul 8:12 se simplifică la…', { choices: ['2:3', '4:6', '8:12', '3:2'] }),
        publicItem(5, 5, '√81 este…', { choices: ['9', '8', '40,5', '3'] }),
        publicItem(6, 5, 'Media notelor 6, 8, 10 este…', { choices: ['8', '6', '10', '24'] })
      ]),
      block('Subiectul II', 30, II_INTRO, [
        publicItem(1, 5, 'AB = 9 cm, BC = 4 cm, B între A și C. AC este…', { choices: ['5 cm', '13 cm', '36 cm', '9 cm'], figure: 'points-line' }),
        publicItem(2, 5, 'Un unghi are 50°. Complementul său are măsura…', { choices: ['130°', '40°', '50°', '100°'], figure: 'angle' }),
        publicItem(3, 5, 'În △ABC, A = 50°, B = 70°. Măsura lui C este…', { choices: ['60°', '120°', '40°', '180°'], figure: 'triangle' }),
        publicItem(4, 5, 'Aria pătratului de latură 6 cm este…', { choices: ['24 cm²', '12 cm²', '36 cm²', '18 cm²'], figure: 'square' }),
        publicItem(5, 5, 'Lungimea cercului de rază 3 cm este…', { choices: ['6π cm', '9π cm', '3π cm', '6 cm'], figure: 'circle' }),
        publicItem(6, 5, 'Volumul cilindrului cu raza 2 cm și înălțimea 5 cm este…', { choices: ['20π cm³', '10π cm³', '4π cm³', '20 cm³'], figure: 'cylinder' })
      ]),
      block('Subiectul III', 30, III_INTRO, [
        mathPartsItem(1, 'Un tren se deplasează cu viteza constantă de 6 km la fiecare 10 minute.', {
          a: 'Arată că în 40 de minute trenul parcurge 24 km.',
          b: 'Ce distanță, în kilometri, parcurge în 30 de minute?'
        }),
        mathPartsItem(2, 'Se consideră expresia E(x) = 4x − 7, unde x este număr real.', {
          a: 'Arată că E(3) = 5.',
          b: 'Determină numărul real x pentru care E(x) = 9.'
        }),
        mathPartsItem(3, 'Se consideră funcția f: ℝ → ℝ, f(x) = 3x − 2.', {
          a: 'Arată că f(2) = 4.',
          b: 'Determină numărul real x pentru care f(x) = 10.'
        }),
        mathPartsItem(4, 'Trapezul ABCD are bazele 10 cm și 6 cm și înălțimea 4 cm.', {
          figure: 'trapezoid',
          a: 'Arată că linia mijlocie este 8 cm.',
          b: 'Calculează aria trapezului.'
        }),
        mathPartsItem(5, 'În △ABC, unghiul A măsoară 50°, unghiul B măsoară 70°.', {
          figure: 'triangle',
          a: 'Arată că măsura unghiului C este 60°.',
          b: 'Calculează măsura unghiului exterior alăturat lui C.'
        }),
        mathPartsItem(6, 'O piramidă regulată are baza un pătrat de latură 6 cm și înălțimea 4 cm.', {
          figure: 'pyramid',
          a: 'Arată că aria bazei este 36 cm².',
          b: 'Calculează volumul piramidei.'
        })
      ])
    ]),
    barem: {
      'Subiectul I:1': { letter: 'A', explain: '−3+8=5, 5−(−2)=7.', steps: ['8−3=5', '5+2=7'] },
      'Subiectul I:2': { letter: 'A', explain: '20/100 × 45 = 9.', steps: ['45:5=9'] },
      'Subiectul I:3': { letter: 'A', explain: 'Paranteză rotundă = 2 afară; ] = 7 înăuntru.', steps: ['2 nu, 7 da'] },
      'Subiectul I:4': { letter: 'A', explain: 'Împarți cu 4.', steps: ['8:4=2, 12:4=3'] },
      'Subiectul I:5': { letter: 'A', explain: '9×9=81.', steps: ['√81=9'] },
      'Subiectul I:6': { letter: 'A', explain: '(6+8+10):3=8.', steps: ['24:3=8'] },
      'Subiectul II:1': { letter: 'B', explain: '9+4=13 cm.', steps: ['AB + BC'] },
      'Subiectul II:2': { letter: 'B', explain: '90 − 50 = 40°.', steps: ['Complementare = 90°'] },
      'Subiectul II:3': { letter: 'A', explain: '180 − 50 − 70 = 60°.', steps: ['Suma unghiurilor e 180°'] },
      'Subiectul II:4': { letter: 'C', explain: '6² = 36 cm².', steps: ['A = a²'] },
      'Subiectul II:5': { letter: 'A', explain: '2πr = 6π cm.', steps: ['2 × 3 = 6'] },
      'Subiectul II:6': { letter: 'A', explain: 'πr²h = 4·5 π = 20π cm³.', steps: ['2² = 4', '4 × 5 = 20'] },
      'Subiectul III:1': partsBarem({
        a: {
          answer: '24 km',
          answers: ['24 km', '24'],
          explain: '40 min = 4 intervale de 10 min: 4 × 6 = 24 km.',
          steps: ['40 : 10 = 4', '4 × 6 = 24'],
          solution: 'a) În 40 de minute sunt 4 grupuri de 10 minute, deci 4 · 6 = 24 km.'
        },
        b: {
          answer: '18',
          answers: ['18', '18 km'],
          explain: '30 min = 3 × 6 = 18 km.',
          steps: ['30 : 10 = 3', '3 × 6 = 18'],
          solution: 'b) 30 de minute = 3 intervale de 10 minute: 3 · 6 = 18 km.'
        }
      }),
      'Subiectul III:2': partsBarem({
        a: {
          answer: '5',
          answers: ['5'],
          explain: 'E(3)=4·3 − 7 = 12 − 7 = 5.',
          steps: ['12 − 7 = 5'],
          solution: 'a) E(3) = 4 · 3 − 7 = 5.'
        },
        b: {
          answer: '4',
          answers: ['4', 'x = 4', 'x=4'],
          explain: '4x − 7 = 9 ⇒ 4x = 16 ⇒ x = 4.',
          steps: ['4x = 16', 'x = 4'],
          solution: 'b) 4x − 7 = 9 ⇒ 4x = 16 ⇒ x = 4.'
        }
      }),
      'Subiectul III:3': partsBarem({
        a: {
          answer: '4',
          answers: ['4'],
          explain: 'f(2)=3·2 − 2 = 4.',
          steps: ['6 − 2 = 4'],
          solution: 'a) f(2) = 6 − 2 = 4.'
        },
        b: {
          answer: '4',
          answers: ['4', 'x = 4', 'x=4'],
          explain: '3x − 2 = 10 ⇒ 3x = 12 ⇒ x = 4.',
          steps: ['3x = 12', 'x = 4'],
          solution: 'b) 3x − 2 = 10 ⇒ x = 4.'
        }
      }),
      'Subiectul III:4': partsBarem({
        a: {
          answer: '8 cm',
          answers: ['8 cm', '8'],
          explain: '(10+6)/2 = 8 cm.',
          steps: ['Media bazelor'],
          solution: 'a) Linia mijlocie = (10 + 6) / 2 = 8 cm.'
        },
        b: {
          answer: '32 cm²',
          answers: ['32 cm²', '32', '32 cm2'],
          explain: 'A = (10+6)×4/2 = 32 cm².',
          steps: ['16 × 4 / 2 = 32'],
          solution: 'b) A = (B + b) · h / 2 = 16 · 4 / 2 = 32 cm².'
        }
      }),
      'Subiectul III:5': partsBarem({
        a: {
          answer: '60°',
          answers: ['60°', '60', '60 grade'],
          explain: 'C = 180 − 50 − 70 = 60°.',
          steps: ['Suma unghiurilor e 180°', 'C = 60°'],
          solution: 'a) În orice triunghi, A + B + C = 180°. Deci C = 180° − 50° − 70° = 60°.'
        },
        b: {
          answer: '120°',
          answers: ['120°', '120', '120 grade'],
          explain: 'Exteriorul lângă C e suplementar: 180 − 60 = 120°.',
          steps: ['180 − 60 = 120°'],
          solution: 'b) Unghiul exterior alăturat lui C și unghiul C sunt suplementare: 180° − 60° = 120°. Teorema unghiului exterior: 50° + 70° = 120°.'
        }
      }),
      'Subiectul III:6': partsBarem({
        a: {
          answer: '36 cm²',
          answers: ['36 cm²', '36', '36 cm2'],
          explain: 'Baza e pătrat 6×6 = 36 cm².',
          steps: ['A_bază = 6² = 36 cm²'],
          solution: 'a) Baza e un pătrat de latură 6 cm, deci A_bază = 6 · 6 = 36 cm².'
        },
        b: {
          answer: '48 cm³',
          answers: ['48 cm³', '48', '48 cm3'],
          explain: 'V = A_bază × h / 3 = 36 × 4 / 3 = 48 cm³.',
          steps: ['V = 36 × 4 / 3', '144 / 3 = 48 cm³'],
          solution: 'b) Volumul piramidei: V = (A_bază · h) / 3 = (36 · 4) / 3 = 144 / 3 = 48 cm³.'
        }
      })
    }
  };
}

function generateMathPaper(rand, seed) {
  const content = generateMathContent(rand);
  const barem = {};
  const toMcq = (label, list) => list.map((row, idx) => {
    const n = idx + 1;
    barem[itemKey(label, n)] = { letter: row.letter, explain: row.explain, steps: row.steps };
    return publicItem(n, 5, row.prompt, { choices: row.choices, figure: row.figure || undefined });
  });
  const toPartsItem = (n, row) => {
    barem[itemKey('Subiectul III', n)] = partsBarem(row.parts);
    return publicItem(n, 5, row.prompt, {
      kind: 'en-parts',
      figure: row.figure || undefined,
      parts: [
        { id: 'a', points: 2, prompt: row.parts.a.prompt },
        { id: 'b', points: 3, prompt: row.parts.b.prompt }
      ]
    });
  };

  const publicPaper = paperShell(
    `en:g:matematica:${seed}`,
    `Model generat — matematică · ${seed.slice(0, 4)}`,
    'matematica',
    MATH_NOTE,
    [
      block('Subiectul I', 30, I_INTRO, toMcq('Subiectul I', content.I)),
      block('Subiectul II', 30, II_INTRO, toMcq('Subiectul II', content.II)),
      block('Subiectul III', 30, III_INTRO, content.III.map((row, idx) => toPartsItem(idx + 1, row)))
    ],
    true
  );
  return { public: publicPaper, barem };
}

// ——— Română: structura EN 2026 (I A + I B + II) ———

function roHelpers() {
  return { paperShell, publicItem, block, note: RO_NOTE };
}

function roRecommended() {
  return roBank.packs(roHelpers());
}

function generateRoPaper(rand, seed) {
  return roBank.generateRoPaper(roHelpers(), rand, seed);
}

const STATIC = {
  matematica: mathRecommended(),
  romana: roRecommended()
};

function recommendedList(subject) {
  const sid = String(subject || '').toLowerCase().includes('rom') ? 'romana' : 'matematica';
  const pack = STATIC[sid];
  return [stripSecrets(pack.a.public), stripSecrets(pack.b.public), stripSecrets(pack.c.public)];
}

function getStaticBundle(paperId) {
  for (const sid of ['matematica', 'romana']) {
    const pack = STATIC[sid] || {};
    for (const key of Object.keys(pack)) {
      const row = pack[key];
      if (row && row.public.id === paperId) return row;
    }
  }
  return null;
}

const GENERATED = new Map();

function generatePaper(subject, excludeIds = [], options = {}) {
  const sid = String(subject || '').toLowerCase().includes('rom') ? 'romana' : 'matematica';
  const mode = options.mode === 'drill' ? 'drill' : 'exam';
  const excluded = new Set((excludeIds || []).map(String));
  for (let i = 0; i < 24; i += 1) {
    const seed = newSeed();
    const id = mode === 'drill' ? `en:g:${sid}:${seed}:drill` : `en:g:${sid}:${seed}`;
    if (excluded.has(id) || excluded.has(`en:g:${sid}:${seed}`)) continue;
    const rand = rng(seedFromHex(seed));
    let bundle = sid === 'romana' ? generateRoPaper(rand, seed) : generateMathPaper(rand, seed);
    if (mode === 'drill') bundle = asDrill(bundle, sid);
    GENERATED.set(bundle.public.id, bundle);
    return stripSecrets(bundle.public);
  }
  const seed = newSeed();
  const rand = rng(seedFromHex(seed));
  let bundle = sid === 'romana' ? generateRoPaper(rand, seed) : generateMathPaper(rand, seed);
  if (mode === 'drill') bundle = asDrill(bundle, sid);
  GENERATED.set(bundle.public.id, bundle);
  return stripSecrets(bundle.public);
}

function getBundle(paperId) {
  if (GENERATED.has(paperId)) return GENERATED.get(paperId);
  return getStaticBundle(paperId);
}

function publicPaperById(paperId) {
  const bundle = getBundle(paperId);
  return bundle ? stripSecrets(bundle.public) : null;
}

function getBaremItem(paperId, blockLabel, n) {
  const bundle = getBundle(paperId);
  if (!bundle) return null;
  const key = itemKey(blockLabel, Number(n));
  const row = bundle.barem[key];
  if (!row) return null;
  return {
    paperId,
    blockLabel,
    n: Number(n),
    letter: row.letter || '',
    explain: row.explain || '',
    steps: row.steps || [],
    ideas: row.ideas || [],
    solution: row.solution || '',
    parts: row.parts || undefined
  };
}

function listBarem(paperId) {
  const bundle = getBundle(paperId);
  if (!bundle) return [];
  const items = [];
  (bundle.public.blocks || []).forEach(block => {
    (block.items || []).forEach(item => {
      if (!item.n || item.kind === 'passage' || item.passage) return;
      const row = bundle.barem[itemKey(block.label, item.n)];
      if (!row) return;
      items.push({
        paperId,
        blockLabel: block.label,
        n: item.n,
        letter: row.letter || '',
        explain: row.explain || '',
        steps: row.steps || [],
        ideas: row.ideas || [],
        solution: row.solution || '',
        parts: row.parts || undefined
      });
    });
  });
  return items;
}

function scoreAttempt(paperId, answers = []) {
  const bundle = getBundle(paperId);
  if (!bundle) return null;
  const { gradeWriting } = require('../grading/writingRubric');
  const { judgeAnswer } = require('../grading/answerJudge');
  const paper = bundle.public;
  const map = new Map();
  (Array.isArray(answers) ? answers : []).forEach(row => {
    const block = String(row.block || row.blockLabel || '');
    const n = Number(row.n);
    if (!block || !Number.isFinite(n)) return;
    map.set(itemKey(block, n), {
      letter: String(row.letter || '').trim().toUpperCase().slice(0, 1),
      text: String(row.text || row.given || ''),
      parts: row.parts && typeof row.parts === 'object' ? row.parts : {}
    });
  });

  let earned = Number(paper.oficiu) || 10;
  let itemMax = 0;
  const review = [];
  (paper.blocks || []).forEach(block => {
    (block.items || []).forEach(item => {
      if (!item.n || item.kind === 'passage' || item.passage) return;
      itemMax += Number(item.points) || 0;
      const key = itemKey(block.label, item.n);
      const barem = bundle.barem[key] || {};
      const given = map.get(key) || { letter: '', text: '' };
      const maxPts = Number(item.points) || 0;
      if (item.kind === 'en-parts' || (item.parts && item.parts.length)) {
        const givenParts = given.parts || {};
        let partPoints = 0;
        const partReview = (item.parts || []).map(part => {
          const baremPart = (barem.parts || {})[part.id] || {};
          const partGiven = String(givenParts[part.id] || '').trim();
          const partAnswers = baremPart.answers || [baremPart.answer].filter(Boolean);
          const judge = judgeAnswer({
            given: partGiven,
            answers: partAnswers,
            explain: baremPart.explain || ''
          });
          const maxP = Number(part.points) || 0;
          const pts = judge.ok ? maxP : Math.round((Number(judge.credit) || 0) * maxP);
          partPoints += pts;
          return {
            id: part.id,
            prompt: part.prompt,
            given: partGiven,
            expected: baremPart.answer || partAnswers[0] || '',
            points: pts,
            maxPoints: maxP,
            ok: judge.ok,
            teacher: judge.teacher,
            explain: judge.teacher,
            steps: baremPart.steps || [],
            solution: baremPart.solution || ''
          };
        });
        review.push({
          block: block.label,
          n: item.n,
          kind: 'en-parts',
          prompt: item.prompt,
          figure: item.figure,
          given: Object.values(givenParts).filter(Boolean).join(' · ') || '',
          expected: partReview.map(part => `${part.id}) ${part.expected}`).join(' · '),
          sample: partReview.map(part => part.expected).join(', '),
          parts: partReview,
          points: partPoints,
          maxPoints: maxPts,
          ok: partReview.every(part => part.ok),
          teacher: partReview.map(part => part.teacher).join(' '),
          explain: partReview.map(part => part.teacher).join(' '),
          barem: barem.explain || '',
          steps: barem.steps || [],
          solution: barem.solution || ''
        });
        earned += partPoints;
        return;
      }
      if (item.kind === 'short' || item.kind === 'associate') {
        const minWords = Number(item.minWords || (item.kind === 'associate' ? 50 : 0));
        const longish = item.kind === 'associate' || minWords >= 20;
        if (longish) {
          const rubric = gradeWriting(given.text, {
            minWords: Math.max(20, minWords),
            tokens: barem.tokens || [],
            answers: barem.answers || []
          });
          const pts = given.text.trim()
            ? Math.round((rubric.total / (rubric.max || 30)) * maxPts)
            : 0;
          review.push({
            block: block.label,
            n: item.n,
            kind: item.kind,
            prompt: item.prompt,
            given: given.text,
            text: given.text,
            points: pts,
            maxPoints: maxPts,
            ok: rubric.ok,
            explain: barem.explain,
            teacher: rubric.teacher,
            ideas: barem.ideas || [],
            steps: barem.steps || [],
            rubric
          });
          earned += pts;
          return;
        }
        const judge = judgeAnswer({
          given: given.text || given.letter,
          answers: barem.answers || [],
          tokens: barem.tokens || [],
          explain: barem.explain || ''
        });
        const pts = judge.ok ? maxPts : Math.round((Number(judge.credit) || 0) * maxPts);
        review.push({
          block: block.label,
          n: item.n,
          kind: 'short',
          prompt: item.prompt,
          given: given.text || given.letter,
          text: given.text,
          expected: (barem.answers || [])[0] || '',
          sample: (barem.answers || [])[0] || '',
          points: pts,
          maxPoints: maxPts,
          ok: judge.ok,
          teacher: judge.teacher,
          explain: judge.teacher,
          barem: barem.explain || '',
          steps: barem.steps || []
        });
        earned += pts;
        return;
      }
      if (item.kind === 'write') {
        const empty = !String(given.text || '').trim();
        const rubric = empty
          ? null
          : gradeWriting(given.text, {
            long: true,
            minWords: Number(item.minWords) || 60,
            tokens: ['narațiune', 'naratiune', 'argumentativ', 'descriere', 'teză', 'teza', 'pentru că', 'pentru ca', 'apoi', 'deci', 'într-o zi', 'intr-o zi', 'personaj', 'trăsătur', 'trasatur']
          });
        const pts = empty || !rubric ? 0 : Math.round((rubric.total / (rubric.max || 30)) * maxPts);
        review.push({
          block: block.label,
          n: item.n,
          kind: 'write',
          prompt: item.prompt,
          given: given.text,
          text: given.text,
          photoOnly: Boolean(item.photoOnly),
          photoPending: Boolean(item.photoOnly && empty),
          points: pts,
          maxPoints: maxPts,
          ok: rubric ? rubric.ok : false,
          explain: barem.explain,
          ideas: barem.ideas || [],
          steps: barem.steps || [],
          rubric: rubric || undefined
        });
        earned += pts;
        return;
      }
      const expected = String(barem.letter || '').toUpperCase();
      const sampleChoice = expected && Array.isArray(item.choices)
        ? String(item.choices['ABCD'.indexOf(expected)] || '')
        : '';
      const givenRaw = String(given.letter || given.text || '').trim();
      const judge = judgeAnswer({
        given: givenRaw,
        answers: [sampleChoice, expected].filter(Boolean),
        choices: item.choices || [],
        letter: expected,
        explain: barem.explain || ''
      });
      const pts = judge.ok ? maxPts : Math.round((Number(judge.credit) || 0) * maxPts);
      review.push({
        block: block.label,
        n: item.n,
        kind: item.kind || 'mcq',
        prompt: item.prompt,
        letter: given.letter || (judge.ok ? expected : ''),
        given: givenRaw,
        expected,
        sample: sampleChoice || expected,
        points: pts,
        maxPoints: maxPts,
        ok: judge.ok,
        credit: Number(judge.credit) || 0,
        verdict: judge.kind,
        teacher: judge.teacher,
        explain: judge.teacher,
        barem: barem.explain || '',
        steps: barem.steps || []
      });
      earned += pts;
    });
  });

  const ceiling = Math.max(Number(paper.oficiu) || 10, (Number(paper.oficiu) || 10) + itemMax);
  earned = Math.max(Number(paper.oficiu) || 10, Math.min(ceiling, earned));
  return {
    oficiu: Number(paper.oficiu) || 10,
    points: earned,
    max: ceiling,
    grade: ((earned / ceiling) * 10).toFixed(2),
    items: review
  };
}

module.exports = {
  minStayMs,
  examMs,
  timingForPaper,
  asDrill,
  recommendedList,
  generatePaper,
  publicPaperById,
  getBaremItem,
  listBarem,
  scoreAttempt,
  getBundle,
  stripSecrets,
  itemKey
};
