// Modele EN: 4 variante (A–D) ca la examen. Răspunsurile NU pleacă odată
// cu testul. Cronometrul pornește la „Începe test”. Predare anticipată
// după 60 minute (metodologia EN); lucrare 120 minute. Baremul și nota
// apar abia după finalizare. Redactarea are idei de barem, nu un text gata.
//
// Tipurile de item (procent, interval, medie, funcție, Pitagora, prismă…)
// urmează structura publică CNPEE (modele + bareme pe subiecte.edu.ro).
// Enunțurile, numerele și textele sunt originale. Nu copiem culegeri.

const { rng, seedFromHex, newSeed, int, pick, shuffle, uniqueOptions } = require('./itemRng');
const roBank = require('./enRomanaBank');

const LETTERS = ['A', 'B', 'C', 'D'];

function mcqRow(rand, prompt, correct, wrongs, explain, steps) {
  const choices = shuffle(rand, uniqueOptions(rand, correct, wrongs));
  const idx = Math.max(0, choices.findIndex(choice => String(choice) === String(correct)));
  return {
    prompt,
    choices,
    letter: LETTERS[idx],
    explain,
    steps
  };
}

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
  'Apasă „Începe test Evaluare Națională”. Ca la examen, stai cu lucrarea deschisă cel puțin o oră. Subiectele I și II: 4 variante. Subiectul III: două probleme de geometrie, fiecare cu a) și b) — aici scrii doar rezultatul; rezolvarea o faci pe caiet. După predare poți fotografia pagina (maximum 3 poze pe zi) ca mentorul să-ți dea feedback pe barem.';

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

// ——— Matematică: modele recomandate + generator ———

function mathRecommended() {
  const a = {
    public: paperShell('en-mate-a', 'Model recomandat A — matematică', 'matematica', MATH_NOTE, [
      block('Subiectul I', 30, 'Itemi scurți, 4 variante. Pe foaie încercuiești litera.', [
        publicItem(1, 5, 'Valoarea expresiei 3² × 4 − 18 : 6 + 5 este…', { choices: ['14', '15', '17', '23'] }),
        publicItem(2, 5, 'Care dintre numerele de mai jos NU e rațional?', { choices: ['−4', '2/7', '√5', '1,25'] }),
        publicItem(3, 5, 'Un ghiozdan costă 160 lei. Reducere 15%, apoi încă 8 lei. Ce sumă se plătește?', { choices: ['128 lei', '136 lei', '144 lei', '152 lei'] }),
        publicItem(4, 5, '[−2, 3) ∪ (1, 5] este același cu…', { choices: ['[−2, 5]', '[−2, 5)', '(−2, 5]', '[−2, 3] ∪ [1, 5]'] }),
        publicItem(5, 5, 'Raportul merelor verzi : roșii este 2 : 5. Sunt 14 mere verzi. Câte mere sunt în total?', { choices: ['19', '28', '35', '49'] }),
        publicItem(6, 5, 'Dreptunghi 12 cm × 5 cm. Perimetrul și aria sunt…', { choices: ['P=34 cm, A=60 cm²', 'P=17 cm, A=60 cm²', 'P=34 cm, A=17 cm²', 'P=60 cm, A=34 cm²'] })
      ]),
      block('Subiectul II', 30, 'Algebră. Alege varianta corectă; calculele rămân pe foaie.', [
        publicItem(7, 5, '5(2x − 3) − 2(x + 4) + 7 se simplifică la…', { choices: ['8x − 16', '8x − 4', '12x − 16', '8x + 4'] }),
        publicItem(8, 5, '(2a − 5)² este…', { choices: ['4a² − 20a + 25', '4a² + 25', '4a² − 25', '4a² − 10a + 25'] }),
        publicItem(9, 5, 'Soluția în ℝ a ecuației 3(x − 4) = 2x + 1 este…', { choices: ['x = 13', 'x = 11', 'x = −13', 'x = 5'] }),
        publicItem(10, 5, 'Sistemul { 2x + y = 11 ; x − y = 1 } are soluția…', { choices: ['(4, 3)', '(3, 5)', '(5, 1)', '(2, 7)'] }),
        publicItem(11, 5, 'Inequația −2x + 6 ≤ 0 are mulțimea soluțiilor…', { choices: ['[3, +∞)', '(−∞, 3]', '(−∞, 3)', '[−3, +∞)'] }),
        publicItem(12, 5, 'f(x) = −x + 4. Punctul în care graficul taie Ox este…', { choices: ['(4, 0)', '(0, 4)', '(−4, 0)', '(0, −4)'] })
      ]),
      block('Subiectul III', 30, 'Geometrie, ca la examen: două probleme, fiecare cu a) și b). Pe caiet calculezi. Aici scrii doar rezultatul. Rezolvarea completă apare după predare.', [
        publicItem(1, 15, 'În planul foii este △ABC, dreptunghic în A, cu AB = 8 cm și AC = 6 cm.', {
          kind: 'en-parts',
          figure: 'triangle-right',
          parts: [
            { id: 'a', points: 6, prompt: 'Calculează lungimea ipotenuzei BC.' },
            { id: 'b', points: 9, prompt: 'Calculează aria triunghiului ABC.' }
          ]
        }),
        publicItem(2, 15, 'Un paralelipiped dreptunghic are lungimea 8 cm, lățimea 6 cm și înălțimea 5 cm.', {
          kind: 'en-parts',
          figure: 'box3d',
          parts: [
            { id: 'a', points: 6, prompt: 'Calculează aria totală a paralelipipedului.' },
            { id: 'b', points: 9, prompt: 'Calculează volumul.' }
          ]
        })
      ])
    ]),
    barem: {
      'Subiectul I:1': { letter: 'B', explain: '9×4=36, 18:6=3, 36−3+5=38? Stai: 3²×4=36, 18:6=3, 36−3=33, +5=38. Variantele: recalculez. 36 − 3 + 5 = 38, dar 38 nu e. 3²=9, 9×4=36, 18:6=3, 36−3+5=38. Hmm. Itemul original zicea 3² × 4 − 18 : 6 + 5 = 36 − 3 + 5 = 38. Corectez varianta: ar trebui 38. Recalculez opțiunile — am pus greșit. 36−3+5=38. Folosesc B=15 greșit. Corect: recalculez: 9*4=36, 18/6=3, 36-3+5=38. Voi pune letter D dacă 23 e greșit. WAIT I need to fix options.', steps: ['3² = 9', '9 × 4 = 36', '18 : 6 = 3', '36 − 3 + 5 = 38'] },
      'Subiectul I:2': { letter: 'C', explain: '√5 nu se scrie ca fracție de întregi. −4, 2/7, 1,25=5/4 sunt raționale.', steps: ['Rațional = p/q, q≠0', '√5 e irațional'] },
      'Subiectul I:3': { letter: 'A', explain: '15% din 160 = 24, rămân 136, minus 8 = 128 lei.', steps: ['15% × 160 = 24', '160 − 24 = 136', '136 − 8 = 128'] },
      'Subiectul I:4': { letter: 'A', explain: 'De la −2 închis până la 5 închis, pentru că 3 e deja în [−2,3) și (1,5] umple până la 5 inclusiv.', steps: ['[−2,3) ∪ (1,5] se lipește', 'Capătul stâng −2 inclus, capătul drept 5 inclus'] },
      'Subiectul I:5': { letter: 'D', explain: '2 părți = 14, o parte = 7, total 7 părți = 49.', steps: ['14 : 2 = 7', '7 × 7 = 49'] },
      'Subiectul I:6': { letter: 'A', explain: 'P=2×(12+5)=34 cm, A=12×5=60 cm².', steps: ['P = 2(12+5)=34', 'A=12×5=60'] },
      'Subiectul II:7': { letter: 'A', explain: '10x − 15 − 2x − 8 + 7 = 8x − 16.', steps: ['5·2x=10x, 5·(−3)=−15', '−2·x=−2x, −2·4=−8', '10x−2x=8x, −15−8+7=−16'] },
      'Subiectul II:8': { letter: 'A', explain: '(a−b)²=a²−2ab+b² → 4a² − 20a + 25.', steps: ['2a·2a=4a²', '2·2a·5=20a', '5²=25'] },
      'Subiectul II:9': { letter: 'A', explain: '3x − 12 = 2x + 1 → x = 13.', steps: ['3x − 2x = 1 + 12', 'x = 13', 'Verificare: 3(9)=27, 26+1=27'] },
      'Subiectul II:10': { letter: 'A', explain: 'Aduni: 3x=12, x=4, y=3.', steps: ['2x+y + x−y = 12', '3x=12, x=4', '4−y=1, y=3'] },
      'Subiectul II:11': { letter: 'A', explain: '−2x ≤ −6, împărțire la −2 inversează: x ≥ 3.', steps: ['−2x ≤ −6', 'x ≥ 3', '[3, +∞)'] },
      'Subiectul II:12': { letter: 'A', explain: 'f(x)=0 → −x+4=0 → x=4. Punct (4, 0).', steps: ['−x + 4 = 0', 'x = 4'] },
      'Subiectul III:1': partsBarem({
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
      'Subiectul III:2': partsBarem({
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

  // Fix item 1 options to include 38
  a.public.blocks[0].items[0].choices = ['32', '38', '41', '23'];
  a.barem['Subiectul I:1'] = {
    letter: 'B',
    explain: '3²=9, 9×4=36, 18:6=3, 36−3+5=38.',
    steps: ['3² = 9', '9 × 4 = 36', '18 : 6 = 3', '36 − 3 + 5 = 38']
  };
  a.barem['Subiectul II:9'] = {
    letter: 'A',
    explain: '3x − 12 = 2x + 1 → x = 13. Verificare: 3(13−4)=27, 26+1=27.',
    steps: ['3x − 12 = 2x + 1', '3x − 2x = 1 + 12', 'x = 13']
  };

  return { a, b: mathRecommendedB(), c: mathRecommendedC() };
}

function mathRecommendedB() {
  return {
    public: paperShell('en-mate-b', 'Model recomandat B — matematică', 'matematica', MATH_NOTE, [
      block('Subiectul I', 30, 'Variat, din toată programa de gimnaziu.', [
        publicItem(1, 5, 'c.m.m.d.c.(24, 36) și c.m.m.m.c.(24, 36) sunt…', { choices: ['12 și 72', '6 și 48', '24 și 36', '8 și 96'] }),
        publicItem(2, 5, '|−8| − |5 − 12| + (−3)×4 este…', { choices: ['−9', '7', '−17', '15'] }),
        publicItem(3, 5, '0,6 e aceeași idee cu…', { choices: ['3/5', '3/4', '2/3', '6/9'] }),
        publicItem(4, 5, '√48 = a√3, cu a natural. a este…', { choices: ['4', '16', '8', '3'] }),
        publicItem(5, 5, 'Notele 7, 9, 9, 5. Media aritmetică este…', { choices: ['7,5', '9', '7', '8'] }),
        publicItem(6, 5, '5 muncitori, 12 zile. 6 muncitori, același ritm, termină în…', { choices: ['10 zile', '14,4 zile', '6 zile', '12 zile'] })
      ]),
      block('Subiectul II', 30, 'Algebră și funcție.', [
        publicItem(7, 5, '2(x − 3) − 4(2 − x) se simplifică la…', { choices: ['6x − 14', '−2x − 14', '6x + 2', '2x − 14'] }),
        publicItem(8, 5, 'Soluția lui 4x + 5 = 21 este…', { choices: ['x = 4', 'x = 6,5', 'x = 16', 'x = −4'] }),
        publicItem(9, 5, '{ x + y = 10 ; x − y = 2 } are soluția…', { choices: ['(6, 4)', '(4, 6)', '(8, 2)', '(5, 5)'] }),
        publicItem(10, 5, 'f(x)=2x−1. f(3) este…', { choices: ['5', '6', '7', '2'] }),
        publicItem(11, 5, 'Graficul lui f(x)=2x−1 taie Oy în…', { choices: ['(0, −1)', '(1/2, 0)', '(0, 2)', '(−1, 0)'] }),
        publicItem(12, 5, 'Inequația 3x − 6 > 0 are soluțiile…', { choices: ['(2, +∞)', '[2, +∞)', '(−∞, 2)', '(−∞, 2]'] })
      ]),
      block('Subiectul III', 30, 'Geometrie, ca la examen: două probleme cu a) și b). Scrii doar rezultatul. Rezolvarea completă apare după predare.', [
        publicItem(1, 15, 'Trapezul isoscel ABCD are bazele AB = 14 cm, CD = 8 cm și înălțimea 5 cm.', {
          kind: 'en-parts',
          figure: 'trapezoid-iso',
          parts: [
            { id: 'a', points: 6, prompt: 'Calculează linia mijlocie a trapezului.' },
            { id: 'b', points: 9, prompt: 'Calculează aria trapezului ABCD.' }
          ]
        }),
        publicItem(2, 15, 'Un cub are muchia de 5 cm.', {
          kind: 'en-parts',
          figure: 'cube',
          parts: [
            { id: 'a', points: 6, prompt: 'Calculează aria unei fețe.' },
            { id: 'b', points: 9, prompt: 'Calculează volumul cubului.' }
          ]
        })
      ])
    ]),
    barem: {
      'Subiectul I:1': { letter: 'A', explain: '24=2³·3, 36=2²·3² → d=2²·3=12, m=2³·3²=72.', steps: ['c.m.m.d.c.=12', 'c.m.m.m.c.=72'] },
      'Subiectul I:2': { letter: 'A', explain: '8 − 7 + (−12) = 1 − 12 = −9.', steps: ['|−8|=8', '|5−12|=7', '(−3)×4=−12', '8−7−12=−9'] },
      'Subiectul I:3': { letter: 'A', explain: '0,6=6/10=3/5.', steps: ['6/10 simplificat cu 2'] },
      'Subiectul I:4': { letter: 'A', explain: '√48=√(16·3)=4√3.', steps: ['48=16×3', '√16=4'] },
      'Subiectul I:5': { letter: 'A', explain: '(7+9+9+5):4=30:4=7,5.', steps: ['Suma=30', '30:4=7,5'] },
      'Subiectul I:6': { letter: 'A', explain: 'Invers: 5×12=60=6×10.', steps: ['Mărimi invers proporționale', '60:6=10'] },
      'Subiectul II:7': { letter: 'A', explain: '2x−6−8+4x=6x−14.', steps: ['2x−6', '−8+4x', '6x−14'] },
      'Subiectul II:8': { letter: 'A', explain: '4x=16, x=4.', steps: ['21−5=16', '16:4=4'] },
      'Subiectul II:9': { letter: 'A', explain: '2x=12, x=6, y=4.', steps: ['Aduni cele două', 'x=6', 'y=4'] },
      'Subiectul II:10': { letter: 'A', explain: '2·3−1=5.', steps: ['2×3=6', '6−1=5'] },
      'Subiectul II:11': { letter: 'A', explain: 'f(0)=−1, deci (0, −1).', steps: ['x=0', 'y=−1'] },
      'Subiectul II:12': { letter: 'A', explain: '3x>6, x>2. Interval deschis.', steps: ['3x>6', 'x>2'] },
      'Subiectul III:1': partsBarem({
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
      'Subiectul III:2': partsBarem({
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
          solution: 'b) Volumul cubului: V = a³ = 5 · 5 · 5 = 125 cm³. Nu e 6×25 (asta ar fi aria totală).'
        }
      })
    }
  };
}

function mathRecommendedC() {
  return {
    public: paperShell('en-mate-c', 'Model recomandat C — matematică', 'matematica', MATH_NOTE, [
      block('Subiectul I', 30, 'Numere, procente, date.', [
        publicItem(1, 5, '−3 + 8 − (−2) este…', { choices: ['7', '3', '13', '−7'] }),
        publicItem(2, 5, '20% din 45 este…', { choices: ['9', '20', '25', '4,5'] }),
        publicItem(3, 5, 'Media notelor 6, 8, 10 este…', { choices: ['8', '6', '10', '24'] }),
        publicItem(4, 5, 'Intervalul (2, 7] conține…', { choices: ['7, dar nu 2', '2, dar nu 7', '2 și 7', 'nici 2, nici 7'] }),
        publicItem(5, 5, 'Raportul 8:12 se simplifică la…', { choices: ['2:3', '4:6', '8:12', '3:2'] }),
        publicItem(6, 5, '√81 este…', { choices: ['9', '8', '40,5', '3'] })
      ]),
      block('Subiectul II', 30, 'Litere și funcție.', [
        publicItem(7, 5, '3x + 2x − 4 este…', { choices: ['5x − 4', 'x − 4', '5x + 4', '6x − 4'] }),
        publicItem(8, 5, '(x + 3)(x − 3) este…', { choices: ['x² − 9', 'x² + 9', 'x² − 6x + 9', '2x'] }),
        publicItem(9, 5, '2x = 14. x este…', { choices: ['7', '16', '12', '28'] }),
        publicItem(10, 5, '{ x + 2y = 8 ; x = 2 }. y este…', { choices: ['3', '4', '2', '6'] }),
        publicItem(11, 5, 'f(x)=x+2. f(−1) este…', { choices: ['1', '−1', '3', '2'] }),
        publicItem(12, 5, 'x − 5 ≥ 0. Soluțiile sunt…', { choices: ['[5, +∞)', '(5, +∞)', '(−∞, 5]', '(−∞, 5)'] })
      ]),
      block('Subiectul III', 30, 'Geometrie, ca la examen: două probleme cu a) și b). Scrii doar rezultatul. Rezolvarea completă apare după predare.', [
        publicItem(1, 15, 'În △ABC, unghiul A măsoară 50°, unghiul B măsoară 70°.', {
          kind: 'en-parts',
          figure: 'triangle',
          parts: [
            { id: 'a', points: 6, prompt: 'Calculează măsura unghiului C.' },
            { id: 'b', points: 9, prompt: 'Calculează măsura unghiului exterior alăturat lui C.' }
          ]
        }),
        publicItem(2, 15, 'O piramidă regulată are baza un pătrat de latură 6 cm și înălțimea 4 cm.', {
          kind: 'en-parts',
          figure: 'pyramid',
          parts: [
            { id: 'a', points: 6, prompt: 'Calculează aria bazei.' },
            { id: 'b', points: 9, prompt: 'Calculează volumul piramidei.' }
          ]
        })
      ])
    ]),
    barem: {
      'Subiectul I:1': { letter: 'A', explain: '−3+8=5, 5−(−2)=7.', steps: ['8−3=5', '5+2=7'] },
      'Subiectul I:2': { letter: 'A', explain: '20/100 × 45 = 9.', steps: ['45:5=9'] },
      'Subiectul I:3': { letter: 'A', explain: '(6+8+10):3=8.', steps: ['24:3=8'] },
      'Subiectul I:4': { letter: 'A', explain: 'Paranteză rotundă = 2 afară; ] = 7 înăuntru.', steps: ['2 nu, 7 da'] },
      'Subiectul I:5': { letter: 'A', explain: 'Împarți cu 4.', steps: ['8:4=2, 12:4=3'] },
      'Subiectul I:6': { letter: 'A', explain: '9×9=81.', steps: ['√81=9'] },
      'Subiectul II:7': { letter: 'A', explain: 'Termeni asemenea: 5x − 4.', steps: ['3x+2x=5x'] },
      'Subiectul II:8': { letter: 'A', explain: 'Diferență de pătrate.', steps: ['x² − 3²'] },
      'Subiectul II:9': { letter: 'A', explain: 'x=7.', steps: ['14:2=7'] },
      'Subiectul II:10': { letter: 'A', explain: '2+2y=8, 2y=6, y=3.', steps: ['Înlocuiești x=2'] },
      'Subiectul II:11': { letter: 'A', explain: '−1+2=1.', steps: ['f(−1)=1'] },
      'Subiectul II:12': { letter: 'A', explain: 'x≥5.', steps: ['x−5≥0'] },
      'Subiectul III:1': partsBarem({
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
          explain: 'Exteriorul lângă C e suplementar: 180 − 60 = 120°. (Sau 50 + 70.)',
          steps: ['Unghi alăturat pe o dreaptă: 180°', '180 − 60 = 120°'],
          solution: 'b) Unghiul exterior alăturat lui C și unghiul C sunt suplementare: 180° − 60° = 120°. Teorema unghiului exterior: 50° + 70° = 120°.'
        }
      }),
      'Subiectul III:2': partsBarem({
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
          solution: 'b) Volumul piramidei: V = (A_bază · h) / 3 = (36 · 4) / 3 = 144 / 3 = 48 cm³. Factorul 1/3 nu se uită — fără el ai fi calculat o prismă (144).'
        }
      })
    }
  };
}

function takeSix(rand, pool) {
  return shuffle(rand, pool).slice(0, 6);
}

function generateMathPaper(rand, seed) {
  const { gcd } = require('./itemRng');
  const a = int(rand, 2, 8);
  const b = int(rand, 2, 6);
  const c = int(rand, 1, 9);
  const val1 = a * a * b - c;
  const L = int(rand, 8, 16);
  const l = int(rand, 3, 7);
  const p = 2 * (L + l);
  const area = L * l;
  const pret = pick(rand, [80, 100, 120, 160]);
  const proc = pick(rand, [10, 15, 20]);
  const platit = pret - (pret * proc) / 100;
  const g = int(rand, 2, 5);
  const n1 = g * int(rand, 3, 8);
  const n2 = g * int(rand, 3, 8);
  const d = gcd(n1, n2);
  const cat1 = pick(rand, [5, 6, 9]);
  const cat2 = cat1 === 5 ? 12 : cat1 === 6 ? 8 : 12;
  const ip = cat1 === 5 ? 13 : cat1 === 6 ? 10 : 15;
  const edge = int(rand, 3, 8);
  const fx = int(rand, 1, 4);
  const fb = int(rand, 1, 6);
  const x0 = int(rand, 2, 6);
  const fx0 = fx * x0 + fb;
  const notes = pick(rand, [[6, 8, 10], [7, 7, 10], [5, 9, 10]]);
  const mean = notes.reduce((sum, n) => sum + n, 0) / notes.length;
  const left = pick(rand, [-2, 0, 1, 2]);
  const right = left + pick(rand, [3, 4, 5]);
  const inside = left + 1;
  const day1 = pick(rand, [20, 25, 30]);
  const day2 = pick(rand, [40, 45, 50]);
  const track = 80;
  const built = (track * day1) / 100 + (track * day2) / 100;
  const leftB = pick(rand, [6, 8, 10]);
  const rightB = leftB + 6;
  const height = pick(rand, [4, 6]);
  const trap = ((leftB + rightB) * height) / 2;
  const base = pick(rand, [3, 6]);
  const pyrH = pick(rand, [3, 6, 9]);
  const pyrV = (base * base * pyrH) / 3;

  const poolI = [
    mcqRow(rand, `Calculează ${a}² × ${b} − ${c}.`, val1, [val1 + 2, val1 - 3, a * b + c], `${a}²=${a * a}, ori ${b} = ${a * a * b}, minus ${c} = ${val1}.`, [`${a}² = ${a * a}`, `${a * a} × ${b} = ${a * a * b}`, `${a * a * b} − ${c} = ${val1}`]),
    mcqRow(rand, `Un obiect costă ${pret} lei. Reducere ${proc}%. Cât plătești?`, platit, [pret, pret - proc, platit + 10], `${proc}% din ${pret} = ${(pret * proc) / 100}, rămân ${platit}.`, [`${proc}% × ${pret} = ${(pret * proc) / 100}`, `${pret} − ${(pret * proc) / 100} = ${platit}`]),
    mcqRow(rand, `c.m.m.d.c.(${n1}, ${n2}) este…`, d, [g, n1, n2], `Cel mai mare divizor comun e ${d}.`, ['Descompui', `c.m.m.d.c. = ${d}`]),
    mcqRow(rand, `Dreptunghi ${L} cm × ${l} cm. Perimetrul este…`, p, [area, L + l, 2 * L], `2×(${L}+${l})=${p}.`, [`${L}+${l}=${L + l}`, `×2 = ${p}`]),
    mcqRow(rand, `Aria aceluiași dreptunghi este…`, area, [p, L + l, L * 2], `${L}×${l}=${area}.`, ['lungime × lățime']),
    mcqRow(rand, `√${a * a} este…`, a, [a * a, 2 * a, a + 1], 'Radicalul „desface” pătratul.', [`√${a * a} = ${a}`]),
    mcqRow(rand, `Media aritmetică a notelor ${notes.join(', ')} este…`, mean, [notes[0], notes[2], mean + 1], `(${notes.join('+')}):${notes.length}=${mean}.`, ['Aduni', 'Împarți la câți sunt']),
    mcqRow(rand, `Numărul ${inside} aparține intervalului (${left}, ${right}] ?`, 'da, e înăuntru', ['nu, e în afară', 'doar dacă e întreg', 'doar capătul stâng'], `Deschis la ${left}, închis la ${right}. ${inside} e între ele.`, ['Capătul stâng afară', `${inside} e în interval`]),
    mcqRow(rand, `O alee are ${track} m. Într-o zi se asfaltează ${day1}%, a doua zi ${day2}%. Câți metri s-au asfaltat în total?`, built, [track, (track * day1) / 100, day1 + day2], `${day1}%+${day2}%=${day1 + day2}% din ${track} = ${built} m.`, [`${day1 + day2}% × ${track} = ${built}`])
  ];

  const poolII = [
    mcqRow(rand, `${g}(x − ${b}) + ${a} se desface la…`, `${g}x + ${a - g * b}`, [`${g}x + ${a + b}`, `${g}x − ${b}`, `${g + a}x`], `${g}x − ${g * b} + ${a} = ${g}x + ${a - g * b}.`, [`${g}·x`, `${g}·(−${b}) = −${g * b}`, `+ ${a}`]),
    mcqRow(rand, `Rezolvă ${fx}x + ${fb} = ${fx0}. x este…`, x0, [x0 + 1, fb, fx], `${fx}x = ${fx0 - fb}, x=${x0}.`, [`Scazi ${fb}`, `Împarți la ${fx}`]),
    mcqRow(rand, `f(x)=${fx}x+${fb}. f(${x0}) este…`, fx0, [fx + fb, x0, fx0 + 1], `${fx}·${x0}+${fb}=${fx0}.`, ['Înlocuiești x']),
    mcqRow(rand, `{ x + y = ${x0 + 3} ; x − y = ${Math.abs(x0 - 3) || 1} }. x este jumătatea sumei.`, Math.round((x0 + 3 + Math.abs(x0 - 3 || 1)) / 2), [x0, 3, 0], 'Aduni: 2x = sumă, x = jumătate.', ['Aduni', 'Împarți la 2']),
    mcqRow(rand, `(x + ${a})(x − ${a}) este…`, `x² − ${a * a}`, [`x² + ${a * a}`, `x² − ${2 * a}x + ${a * a}`, '2x'], 'Diferență de pătrate.', [`x² − ${a}²`]),
    mcqRow(rand, `${fx}x − ${fx * 2} ≥ 0. Soluțiile sunt…`, `[${2}, +∞)`, [`(${2}, +∞)`, `(−∞, ${2}]`, `[0, ${2}]`], 'x ≥ 2. Interval închis la 2.', [`${fx}x ≥ ${fx * 2}`, 'x ≥ 2']),
    mcqRow(rand, `f(x)=${fx}x−${fx * x0}. Punctul în care graficul taie Ox este…`, `(${x0}, 0)`, [`(0, ${x0})`, `(${-x0}, 0)`, `(0, ${-fx * x0})`], `f(x)=0 → ${fx}x=${fx * x0} → x=${x0}.`, ['Pui f(x)=0', `x=${x0}`])
  ];

  const itemsI = takeSix(rand, poolI);
  const itemsII = takeSix(rand, poolII);

  const planePool = [
    {
      prompt: `În △ABC, dreptunghic în A, AB = ${cat1} cm și AC = ${cat2} cm.`,
      figure: 'triangle-right',
      parts: {
        a: {
          prompt: 'Calculează lungimea ipotenuzei BC.',
          answer: `${ip} cm`,
          answers: [`${ip} cm`, `${ip}`],
          explain: `${cat1}²+${cat2}², apoi radical: ${ip} cm.`,
          steps: [`${cat1}² + ${cat2}² = ${cat1 * cat1 + cat2 * cat2}`, `BC = ${ip} cm`],
          solution: `a) Pitagora: BC² = ${cat1}² + ${cat2}² = ${cat1 * cat1 + cat2 * cat2}. BC = ${ip} cm.`
        },
        b: {
          prompt: 'Calculează aria triunghiului ABC.',
          answer: `${(cat1 * cat2) / 2} cm²`,
          answers: [`${(cat1 * cat2) / 2} cm²`, `${(cat1 * cat2) / 2}`],
          explain: `A = (${cat1}×${cat2})/2 = ${(cat1 * cat2) / 2} cm².`,
          steps: [`A = (${cat1} × ${cat2}) / 2`, `A = ${(cat1 * cat2) / 2} cm²`],
          solution: `b) A = (catetă × catetă) / 2 = (${cat1} · ${cat2}) / 2 = ${(cat1 * cat2) / 2} cm².`
        }
      }
    },
    {
      prompt: `Trapezul ABCD are bazele ${leftB} cm și ${rightB} cm și înălțimea ${height} cm.`,
      figure: 'trapezoid',
      parts: {
        a: {
          prompt: 'Calculează linia mijlocie a trapezului.',
          answer: `${(leftB + rightB) / 2} cm`,
          answers: [`${(leftB + rightB) / 2} cm`, `${(leftB + rightB) / 2}`],
          explain: `Media bazelor: (${leftB}+${rightB})/2 = ${(leftB + rightB) / 2} cm.`,
          steps: [`(${leftB} + ${rightB}) / 2 = ${(leftB + rightB) / 2}`],
          solution: `a) Linia mijlocie e (B+b)/2 = (${leftB}+${rightB})/2 = ${(leftB + rightB) / 2} cm.`
        },
        b: {
          prompt: 'Calculează aria trapezului.',
          answer: `${trap} cm²`,
          answers: [`${trap} cm²`, `${trap}`],
          explain: `A = (B+b)h/2 = ${trap} cm².`,
          steps: [`(${leftB}+${rightB})×${height}/2 = ${trap}`],
          solution: `b) A = (${leftB}+${rightB})·${height}/2 = ${trap} cm².`
        }
      }
    },
    {
      prompt: `În △ABC, unghiul A măsoară ${40 + a}°, unghiul B măsoară ${50 + b}°.`,
      figure: 'triangle',
      parts: {
        a: {
          prompt: 'Calculează măsura unghiului C.',
          answer: `${180 - (40 + a) - (50 + b)}°`,
          answers: [`${180 - (40 + a) - (50 + b)}°`, `${180 - (40 + a) - (50 + b)}`],
          explain: `C = 180 − ${40 + a} − ${50 + b} = ${180 - (40 + a) - (50 + b)}°.`,
          steps: [`180 − ${40 + a} − ${50 + b} = ${180 - (40 + a) - (50 + b)}`],
          solution: `a) A+B+C=180°, deci C = ${180 - (40 + a) - (50 + b)}°.`
        },
        b: {
          prompt: 'Calculează unghiul exterior alăturat lui C.',
          answer: `${(40 + a) + (50 + b)}°`,
          answers: [`${(40 + a) + (50 + b)}°`, `${(40 + a) + (50 + b)}`],
          explain: `Exterior = 180 − C = ${(40 + a) + (50 + b)}°.`,
          steps: [`180 − ${180 - (40 + a) - (50 + b)} = ${(40 + a) + (50 + b)}`],
          solution: `b) Exteriorul lângă C e suplementar cu C, deci ${(40 + a) + (50 + b)}° (sau A+B).`
        }
      }
    }
  ];

  const spacePool = [
    {
      prompt: `Un cub are muchia de ${edge} cm.`,
      figure: 'cube',
      parts: {
        a: {
          prompt: 'Calculează aria unei fețe.',
          answer: `${edge * edge} cm²`,
          answers: [`${edge * edge} cm²`, `${edge * edge}`],
          explain: `Fața e pătrat ${edge}×${edge}.`,
          steps: [`${edge}² = ${edge * edge}`],
          solution: `a) A_față = a² = ${edge * edge} cm².`
        },
        b: {
          prompt: 'Calculează volumul cubului.',
          answer: `${edge ** 3} cm³`,
          answers: [`${edge ** 3} cm³`, `${edge ** 3}`],
          explain: `V = a³ = ${edge ** 3} cm³.`,
          steps: [`${edge}³ = ${edge ** 3}`],
          solution: `b) V = a³ = ${edge ** 3} cm³.`
        }
      }
    },
    {
      prompt: `O prismă dreaptă are baza un pătrat de latură ${l} cm și înălțimea ${a} cm.`,
      figure: 'prism',
      parts: {
        a: {
          prompt: 'Calculează aria bazei.',
          answer: `${l * l} cm²`,
          answers: [`${l * l} cm²`, `${l * l}`],
          explain: `Pătrat ${l}×${l} = ${l * l} cm².`,
          steps: [`${l}² = ${l * l}`],
          solution: `a) A_bază = ${l}² = ${l * l} cm².`
        },
        b: {
          prompt: 'Calculează volumul prismei.',
          answer: `${l * l * a} cm³`,
          answers: [`${l * l * a} cm³`, `${l * l * a}`],
          explain: `V = Ab × h = ${l * l} × ${a} = ${l * l * a} cm³.`,
          steps: [`${l * l} × ${a} = ${l * l * a}`],
          solution: `b) V = A_bază × h = ${l * l} · ${a} = ${l * l * a} cm³.`
        }
      }
    },
    {
      prompt: `O piramidă regulată are baza un pătrat de latură ${base} cm și înălțimea ${pyrH} cm.`,
      figure: 'pyramid',
      parts: {
        a: {
          prompt: 'Calculează aria bazei.',
          answer: `${base * base} cm²`,
          answers: [`${base * base} cm²`, `${base * base}`],
          explain: `Pătrat ${base}×${base}.`,
          steps: [`${base}² = ${base * base}`],
          solution: `a) A_bază = ${base}² = ${base * base} cm².`
        },
        b: {
          prompt: 'Calculează volumul piramidei.',
          answer: `${pyrV} cm³`,
          answers: [`${pyrV} cm³`, `${pyrV}`],
          explain: `V = Ab·h/3 = ${pyrV} cm³.`,
          steps: [`${base * base} × ${pyrH} / 3 = ${pyrV}`],
          solution: `b) V = (${base * base} · ${pyrH}) / 3 = ${pyrV} cm³.`
        }
      }
    }
  ];

  const plane = pick(rand, planePool);
  const space = pick(rand, spacePool);

  const barem = {};
  const toBlock = (label, list, startN) => list.map((row, idx) => {
    const n = startN + idx;
    barem[itemKey(label, n)] = { letter: row.letter, explain: row.explain, steps: row.steps };
    return publicItem(n, 5, row.prompt, { choices: row.choices });
  });

  const toPartsItem = (n, row) => {
    barem[itemKey('Subiectul III', n)] = partsBarem(row.parts);
    return publicItem(n, 15, row.prompt, {
      kind: 'en-parts',
      figure: row.figure,
      parts: [
        { id: 'a', points: 6, prompt: row.parts.a.prompt },
        { id: 'b', points: 9, prompt: row.parts.b.prompt }
      ]
    });
  };

  const publicPaper = paperShell(
    `en:g:matematica:${seed}`,
    `Model generat — matematică · ${seed.slice(0, 4)}`,
    'matematica',
    MATH_NOTE,
    [
      block('Subiectul I', 30, 'Itemi scurți, 4 variante.', toBlock('Subiectul I', itemsI, 1)),
      block('Subiectul II', 30, 'Algebră și funcție.', toBlock('Subiectul II', itemsII, 7)),
      block('Subiectul III', 30, 'Geometrie: două probleme cu a) și b). Scrii doar rezultatul.', [
        toPartsItem(1, plane),
        toPartsItem(2, space)
      ])
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
  return roBank.generateRoPaper(roHelpers(), rand, seed, pick);
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
    for (const key of ['a', 'b', 'c', 'd', 'e', 'f']) {
      const row = STATIC[sid][key];
      if (row && row.public.id === paperId) return row;
    }
  }
  return null;
}

const GENERATED = new Map();

function generatePaper(subject, excludeIds = []) {
  const sid = String(subject || '').toLowerCase().includes('rom') ? 'romana' : 'matematica';
  const excluded = new Set((excludeIds || []).map(String));
  for (let i = 0; i < 24; i += 1) {
    const seed = newSeed();
    const id = `en:g:${sid}:${seed}`;
    if (excluded.has(id)) continue;
    const rand = rng(seedFromHex(seed));
    const bundle = sid === 'romana' ? generateRoPaper(rand, seed) : generateMathPaper(rand, seed);
    GENERATED.set(bundle.public.id, bundle);
    return stripSecrets(bundle.public);
  }
  const seed = newSeed();
  const rand = rng(seedFromHex(seed));
  const bundle = sid === 'romana' ? generateRoPaper(rand, seed) : generateMathPaper(rand, seed);
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
  const review = [];
  (paper.blocks || []).forEach(block => {
    (block.items || []).forEach(item => {
      if (!item.n || item.kind === 'passage' || item.passage) return;
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

  earned = Math.max(10, Math.min(100, earned));
  return {
    oficiu: Number(paper.oficiu) || 10,
    points: earned,
    max: 100,
    grade: (earned / 10).toFixed(2),
    items: review
  };
}

module.exports = {
  minStayMs,
  examMs,
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
