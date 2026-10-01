/**
 * Itemi originali EN Matematică pe structura EN 2025–2026:
 * I  6 grile × 5p (numere, rapoarte, date)
 * II 6 grile × 5p (geometrie, numerotate 1–6)
 * III 6 exerciții × 5p, fiecare a) 2p + b) 3p
 * Oficiu 10. Total 100. Enunțurile și numerele sunt originale.
 */

const { int, pick, shuffle, gcd, lcm, uniqueOptions } = require('./itemRng');
const { problemsForEnSlot, iiiFromProblem } = require('./problemBank');

function mcq(rand, prompt, correct, wrongs, explain, steps) {
  const filled = uniqueOptions(rand, correct, wrongs) || [String(correct), ...wrongs.map(String)];
  const seen = new Set(filled.map(String));
  let guard = 0;
  while (filled.length < 4 && guard < 20) {
    guard += 1;
    const extra = `${String(correct)}·${guard}`;
    if (!seen.has(extra)) {
      seen.add(extra);
      filled.push(extra);
    }
  }
  const choices = shuffle(rand, filled.slice(0, 4));
  const idx = Math.max(0, choices.findIndex(choice => String(choice) === String(correct)));
  return {
    prompt,
    choices,
    letter: ['A', 'B', 'C', 'D'][idx],
    explain,
    steps
  };
}

function part(prompt, answer, extras = {}) {
  const answers = extras.answers || [String(answer)];
  return {
    prompt,
    answer: String(answer),
    answers,
    explain: extras.explain || '',
    steps: extras.steps || [],
    solution: extras.solution || extras.explain || ''
  };
}

function makeI(rand) {
  const a = int(rand, 12, 48);
  const b = int(rand, 8, 36);
  const g = gcd(a, b);
  const p = pick(rand, [10, 15, 20, 25, 30]);
  const n = pick(rand, [80, 120, 160, 200, 240]);
  const pct = (p * n) / 100;
  const left = int(rand, 1, 5);
  const right = left + int(rand, 4, 9);
  const fa = int(rand, 2, 5);
  const fb = fa + int(rand, 2, 5);
  const of = fb * pick(rand, [4, 6, 8, 12]);
  const fracVal = (fa * of) / fb;
  const rad = pick(rand, [
    { n: 12, t: '2√3', d: ['3√2', '√12', '4√3'] },
    { n: 18, t: '3√2', d: ['2√3', '√18', '9√2'] },
    { n: 20, t: '2√5', d: ['5√2', '√20', '4√5'] },
    { n: 27, t: '3√3', d: ['9√3', '√27', '3√9'] },
    { n: 32, t: '4√2', d: ['2√4', '√32', '8√2'] },
    { n: 45, t: '3√5', d: ['5√3', '√45', '9√5'] },
    { n: 50, t: '5√2', d: ['2√5', '√50', '10√2'] },
    { n: 75, t: '5√3', d: ['3√5', '√75', '25√3'] }
  ]);
  const pa = int(rand, 2, 8);
  const pb = int(rand, 3, 9);
  const k = int(rand, 2, 6);

  const slot1 = pick(rand, [
    () => mcq(rand, `Cel mai mare divizor comun al numerelor ${a} și ${b} este:`, g, [g * 2, Math.max(1, g - 1), a], `c.m.m.d.c.(${a}, ${b}) = ${g}.`, [`${a} și ${b} se împart la ${g}`, `Niciun număr mai mare ca ${g} nu le împarte pe amândouă`]),
    () => {
      const x = int(rand, 6, 16);
      const y = int(rand, 8, 18);
      const m = lcm(x, y);
      return mcq(rand, `Cel mai mic multiplu comun al numerelor ${x} și ${y} este:`, m, [x * y, gcd(x, y), m + x], `c.m.m.m.c.(${x}, ${y}) = ${m}.`, ['Descompui în factori primi', `Produsul puterilor maxime = ${m}`]);
    },
    () => {
      const num = pick(rand, [24, 36, 48, 60]);
      let count = 0;
      for (let d = 1; d <= num; d += 1) if (num % d === 0) count += 1;
      return mcq(rand, `Numărul divizorilor naturali ai lui ${num} este:`, count, [count - 1, count + 2, Math.floor(num / 2)], `${num} are ${count} divizori naturali.`, ['Îi numeri pereche cu pereche', `Inclusiv 1 și ${num}`]);
    }
  ])();

  const slot2 = pick(rand, [
    () => mcq(rand, `${p}% din ${n} este egal cu:`, pct, [pct + p, n - p, p * 2], `${p}/100 × ${n} = ${pct}.`, [`${p}% = ${p}/100`, `${n} × ${p}/100 = ${pct}`]),
    () => {
      const r1 = int(rand, 2, 9);
      const r2 = int(rand, 3, 12);
      return mcq(rand, `Raportul ${r1 * 4}:${r2 * 4} este egal cu:`, `${r1}:${r2}`, [`${r2}:${r1}`, `${r1 * 2}:${r2}`, `${r1}:${r2 * 2}`], `Simplifici cu 4: ${r1}:${r2}.`, ['Împarți ambii termeni cu 4']);
    },
    () => {
      const old = pick(rand, [80, 100, 120, 160]);
      const pr = pick(rand, [10, 20, 25]);
      const neu = old + (old * pr) / 100;
      return mcq(rand, `Un preț de ${old} lei crește cu ${pr}%. Noul preț este:`, neu, [old + pr, old - (old * pr) / 100, old * pr], `${pr}% din ${old} = ${(old * pr) / 100}, deci ${neu} lei.`, [`Creștere = ${pr}% × ${old}`, `${old} + ${(old * pr) / 100} = ${neu}`]);
    }
  ])();

  const slot3 = pick(rand, [
    () => {
      const lo = int(rand, 2, 6);
      const hi = lo + int(rand, 3, 8);
      const mid = (lo + hi) / 2;
      return mcq(rand, `Mijlocul intervalului [${lo}; ${hi}] este:`, mid, [hi - lo, lo, (hi - lo) / 2], `(${lo} + ${hi}) / 2 = ${mid}.`, ['Mijlocul = media capetelor']);
    },
    () => {
      const vals = shuffle(rand, [int(rand, 4, 8), int(rand, 9, 12), int(rand, 13, 16), int(rand, 5, 9), int(rand, 6, 11)]);
      const sum = vals.reduce((s, x) => s + x, 0);
      const media = sum / vals.length;
      return mcq(rand, `Media aritmetică a numerelor ${vals.join(', ')} este:`, media, [sum, vals[2], media + 1], `(${vals.join(' + ')}) : ${vals.length} = ${media}.`, ['Aduni', `Împarți la ${vals.length}`]);
    },
    () => mcq(rand, `Lungimea intervalului (${left}; ${right}] este:`, right - left, [right - left + 1, right, left + right], `${right} − ${left} = ${right - left}.`, ['Lungimea = capăt dreapta − capăt stânga'])
  ])();

  const slot4 = pick(rand, [
    () => {
      const x = int(rand, 1, 4);
      const y = int(rand, 2, 5);
      const z = int(rand, 1, 3);
      const w = int(rand, 2, 6);
      const num = x * w + y * z;
      const den = y * w;
      const d = gcd(num, den);
      const ans = `${num / d}/${den / d}`;
      return mcq(rand, `Rezultatul calculului ${x}/${y} + ${z}/${w} este:`, ans, [`${x + z}/${y + w}`, `${num}/${den + 1}`, `${x * z}/${y * w}`], `Aduci la același numitor: ${ans}.`, [`Numitor comun ${den}`, `${num}/${den} = ${ans}`]);
    },
    () => mcq(rand, `${fa}/${fb} din ${of} este:`, fracVal, [of - fa, fa * fb, of / fa], `${fa}/${fb} × ${of} = ${fracVal}.`, [`${of} : ${fb} = ${of / fb}`, `× ${fa} = ${fracVal}`])
  ])();

  const slot5 = mcq(rand, `Forma simplificată a lui √${rad.n} este:`, rad.t, rad.d, `Scoți factorul pătrat din ${rad.n}.`, [`${rad.n} = pătrat × rest`, `√${rad.n} = ${rad.t}`]);

  const slot6 = pick(rand, [
    () => mcq(rand, `Dacă ${pa}/${pb} = ${pa * k}/x, atunci x este:`, pb * k, [pa * k, pa * pb, pb + k], `Termenii medii și extremi: ${pa} · x = ${pb} · ${pa * k}, x = ${pb * k}.`, ['Produsul extremilor = produsul mijlociilor', `x = ${pb * k}`]),
    () => {
      const moda = int(rand, 4, 12);
      const others = [moda + 2, moda - 1, moda + 4].map(v => Math.max(1, v));
      const data = shuffle(rand, [moda, moda, moda, ...others]);
      return mcq(rand, `Moda șirului de date ${data.join(', ')} este:`, moda, [others[0], Math.max(...data), data.length], `${moda} apare de cele mai multe ori.`, ['Moda = valoarea cu frecvența cea mai mare']);
    }
  ])();

  return [slot1, slot2, slot3, slot4, slot5, slot6];
}

function makeII(rand) {
  const ab = int(rand, 4, 12);
  const bc = int(rand, 3, 10);
  const ang = int(rand, 25, 70);
  const k = pick(rand, [2, 3, 4]);
  const t1 = int(rand, 3, 8);
  const t2 = int(rand, 4, 10);
  const L = int(rand, 6, 16);
  const l = int(rand, 3, L - 1);
  const r = pick(rand, [3, 4, 5, 6, 7, 8]);
  const edge = int(rand, 3, 8);
  const boxA = int(rand, 4, 10);
  const boxB = int(rand, 3, 8);
  const boxC = int(rand, 3, 9);

  const s1 = mcq(
    rand,
    `Pe dreapta d, punctul B este între A și C. Dacă AB = ${ab} cm și BC = ${bc} cm, atunci AC este:`,
    `${ab + bc} cm`,
    [`${Math.abs(ab - bc)} cm`, `${ab * bc} cm`, `${ab} cm`],
    `AC = AB + BC = ${ab + bc} cm.`,
    ['B e între A și C', `AB + BC = ${ab + bc}`]
  );
  s1.figure = 'points-line';

  const s2 = pick(rand, [
    () => mcq(rand, `Măsura unui unghi este ${ang}°. Complementul său are măsura:`, `${90 - ang}°`, [`${180 - ang}°`, `${ang}°`, `${90 + ang}°`], `90° − ${ang}° = ${90 - ang}°.`, ['Complementare = 90°']),
    () => {
      const u = int(rand, 40, 140);
      return mcq(rand, `Măsura unui unghi este ${u}°. Suplementul său are măsura:`, `${180 - u}°`, [`${90 - (u % 90)}°`, `${u}°`, `${360 - u}°`], `180° − ${u}° = ${180 - u}°.`, ['Suplementare = 180°']);
    }
  ])();
  s2.figure = 'angle';

  const s3 = pick(rand, [
    () => {
      const row = mcq(rand, `Triunghiurile ABC și DEF sunt asemenea, cu raportul de asemănare ${k}. Dacă AB = ${t1} cm, atunci DE este:`, `${t1 * k} cm`, [`${t1 + k} cm`, `${t2 * k} cm`, `${t1} cm`], `DE = ${k} · AB = ${t1 * k} cm.`, ['Raportul de asemănare înmulțește lungimile']);
      row.figure = 'similar';
      return row;
    },
    () => {
      const c = int(rand, 5, 12);
      const row = mcq(rand, `Perimetrul triunghiului cu laturile ${t1} cm, ${t2} cm și ${c} cm este:`, `${t1 + t2 + c} cm`, [`${t1 * t2} cm`, `${t1 + t2} cm`, `${c * 2} cm`], `P = ${t1}+${t2}+${c} = ${t1 + t2 + c} cm.`, ['Suma laturilor']);
      row.figure = 'triangle';
      return row;
    }
  ])();

  const s4 = pick(rand, [
    () => {
      const row = mcq(rand, `Aria dreptunghiului cu lungimea ${L} cm și lățimea ${l} cm este:`, `${L * l} cm²`, [`${2 * (L + l)} cm²`, `${L + l} cm²`, `${L * l * 2} cm²`], `A = ${L} × ${l} = ${L * l} cm².`, ['lungime × lățime']);
      row.figure = 'rectangle';
      return row;
    },
    () => {
      const B = int(rand, 6, 16);
      const h = int(rand, 4, 12);
      const row = mcq(rand, `Aria triunghiului cu baza ${B} cm și înălțimea ${h} cm este:`, `${(B * h) / 2} cm²`, [`${B * h} cm²`, `${B + h} cm²`, `${2 * (B + h)} cm²`], `A = (${B} × ${h}) / 2 = ${(B * h) / 2} cm².`, ['(bază × înălțime) / 2']);
      row.figure = 'triangle';
      return row;
    }
  ])();

  const s5 = pick(rand, [
    () => {
      const row = mcq(rand, `Lungimea cercului de rază ${r} cm este:`, `${2 * r}π cm`, [`${r}π cm`, `${r * r}π cm`, `${2 * r} cm`], `L = 2πr = ${2 * r}π cm.`, ['L = 2πr']);
      row.figure = 'circle';
      return row;
    },
    () => {
      const row = mcq(rand, `Aria discului de rază ${r} cm este:`, `${r * r}π cm²`, [`${2 * r}π cm²`, `${r}π cm²`, `${2 * r * r} cm²`], `A = πr² = ${r * r}π cm².`, ['A = πr²']);
      row.figure = 'circle';
      return row;
    }
  ])();

  const s6 = pick(rand, [
    () => {
      const row = mcq(rand, `Volumul cubului cu muchia ${edge} cm este:`, `${edge ** 3} cm³`, [`${6 * edge * edge} cm³`, `${edge * edge} cm³`, `${4 * edge} cm³`], `V = a³ = ${edge ** 3} cm³.`, [`${edge}³ = ${edge ** 3}`]);
      row.figure = 'cube';
      return row;
    },
    () => {
      const row = mcq(rand, `Volumul paralelipipedului dreptunghic cu dimensiunile ${boxA} cm, ${boxB} cm și ${boxC} cm este:`, `${boxA * boxB * boxC} cm³`, [`${2 * (boxA * boxB + boxA * boxC + boxB * boxC)} cm³`, `${boxA * boxB} cm³`, `${boxA + boxB + boxC} cm³`], `V = ${boxA} × ${boxB} × ${boxC} = ${boxA * boxB * boxC} cm³.`, ['V = L · l · h']);
      row.figure = 'box3d';
      return row;
    },
    () => {
      const cr = int(rand, 2, 5);
      const ch = int(rand, 4, 10);
      const row = mcq(rand, `Volumul cilindrului cu raza bazei ${cr} cm și înălțimea ${ch} cm este:`, `${cr * cr * ch}π cm³`, [`${2 * cr * ch}π cm³`, `${cr * ch}π cm³`, `${cr * cr * ch} cm³`], `V = πr²h = ${cr * cr * ch}π cm³.`, ['V = πr²h']);
      row.figure = 'cylinder';
      return row;
    }
  ])();

  return [s1, s2, s3, s4, s5, s6];
}

function bankIII(slot, rand, options = {}) {
  const excluded = new Set(options.excludeProblemIds || []);
  const pool = problemsForEnSlot(slot, options.problems).filter(problem => !excluded.has(problem.id));
  if (!pool.length) return null;
  return iiiFromProblem(pool[Math.floor(rand() * pool.length)]);
}

function makeIII(rand, options = {}) {
  const u = int(rand, 8, 18);
  const z = int(rand, 3, 8);
  const n = int(rand, 4, 9);
  const total = u * n + z;
  const sum = int(rand, 20, 50);
  const diff = int(rand, 4, 16);
  const big = (sum + diff) / 2;
  const small = (sum - diff) / 2;
  const useSum = Number.isInteger(big) && Number.isInteger(small) && small > 0;

  const iii1 = useSum && int(rand, 0, 1)
    ? {
      prompt: `Suma a două numere este ${sum}, iar diferența lor este ${diff}.`,
      figure: null,
      parts: {
        a: part(`Arată că numărul mai mare este ${big}.`, String(big), {
          answers: [String(big), `${big}`],
          explain: `((${sum}) + ${diff}) : 2 = ${big}.`,
          steps: ['(suma + diferența) : 2', `${big}`],
          solution: `a) Numărul mare = (suma + diferența) / 2 = (${sum} + ${diff}) / 2 = ${big}.`
        }),
        b: part('Calculează produsul celor două numere.', String(big * small), {
          answers: [String(big * small)],
          explain: `${big} · ${small} = ${big * small}.`,
          steps: [`Micul = (${sum} − ${diff}) / 2 = ${small}`, `${big} × ${small} = ${big * small}`],
          solution: `b) Numărul mic = (${sum} − ${diff}) / 2 = ${small}. Produsul = ${big} · ${small} = ${big * small}.`
        })
      }
    }
    : {
      prompt: `La o librărie, ${n} caiete identice și un pix costă ${total} lei. Pixul costă ${z} lei.`,
      figure: null,
      parts: {
        a: part(`Arată că un caiet costă ${u} lei.`, String(u), {
          answers: [String(u), `${u} lei`],
          explain: `(${total} − ${z}) : ${n} = ${u} lei.`,
          steps: [`${total} − ${z} = ${total - z}`, `${total - z} : ${n} = ${u}`],
          solution: `a) Caietele costă ${total} − ${z} = ${total - z} lei. Un caiet: ${total - z} : ${n} = ${u} lei.`
        }),
        b: part('Câte lei costă 5 caiete și 2 pixuri?', String(5 * u + 2 * z), {
          answers: [String(5 * u + 2 * z), `${5 * u + 2 * z} lei`],
          explain: `5·${u} + 2·${z} = ${5 * u + 2 * z} lei.`,
          steps: [`5 × ${u} = ${5 * u}`, `2 × ${z} = ${2 * z}`, `suma ${5 * u + 2 * z}`],
          solution: `b) 5 caiete și 2 pixuri: 5 · ${u} + 2 · ${z} = ${5 * u + 2 * z} lei.`
        })
      }
    };

  const p = int(rand, 2, 6);
  const q = int(rand, 1, 10);
  const x0 = int(rand, 2, 8);
  const Ex0 = p * x0 - q;
  const target = p * int(rand, 2, 7) - q;
  const xTarget = (target + q) / p;
  const aa = int(rand, 1, 4);
  const bb = int(rand, 1, 6);
  const cc = int(rand, 0, 5);
  const nn = int(rand, 1, 4);
  const En = aa * nn * nn - bb * nn + cc;
  const useQuad = int(rand, 0, 1) === 1;

  const iii2 = useQuad
    ? {
      prompt: `Se consideră expresia E(x) = ${aa}x² − ${bb}x + ${cc}, unde x este număr real.`,
      figure: null,
      parts: {
        a: part(`Arată că E(${nn}) = ${En}.`, String(En), {
          answers: [String(En)],
          explain: `E(${nn}) = ${aa}·${nn}² − ${bb}·${nn} + ${cc} = ${En}.`,
          steps: [`${nn}² = ${nn * nn}`, `${aa}·${nn * nn} − ${bb}·${nn} + ${cc} = ${En}`],
          solution: `a) E(${nn}) = ${aa}(${nn})² − ${bb}(${nn}) + ${cc} = ${En}.`
        }),
        b: part('Calculează E(0) + E(1).', String(cc + (aa - bb + cc)), {
          answers: [String(cc + aa - bb + cc)],
          explain: `E(0) = ${cc}, E(1) = ${aa - bb + cc}, suma ${cc + aa - bb + cc}.`,
          steps: [`E(0) = ${cc}`, `E(1) = ${aa - bb + cc}`, `suma ${cc + aa - bb + cc}`],
          solution: `b) E(0) = ${cc}. E(1) = ${aa} − ${bb} + ${cc} = ${aa - bb + cc}. Suma = ${cc + aa - bb + cc}.`
        })
      }
    }
    : {
      prompt: `Se consideră expresia E(x) = ${p}x − ${q}, unde x este număr real.`,
      figure: null,
      parts: {
        a: part(`Arată că E(${x0}) = ${Ex0}.`, String(Ex0), {
          answers: [String(Ex0)],
          explain: `E(${x0}) = ${p}·${x0} − ${q} = ${Ex0}.`,
          steps: [`${p} × ${x0} = ${p * x0}`, `${p * x0} − ${q} = ${Ex0}`],
          solution: `a) E(${x0}) = ${p} · ${x0} − ${q} = ${Ex0}.`
        }),
        b: part(`Determină numărul real x pentru care E(x) = ${target}.`, String(xTarget), {
          answers: [String(xTarget), `x = ${xTarget}`, `x=${xTarget}`],
          explain: `${p}x − ${q} = ${target} ⇒ x = ${xTarget}.`,
          steps: [`${p}x = ${target + q}`, `x = ${xTarget}`],
          solution: `b) ${p}x − ${q} = ${target} ⇒ ${p}x = ${target + q} ⇒ x = ${xTarget}.`
        })
      }
    };

  const m = int(rand, 1, 5);
  const n0 = int(rand, 0, 8);
  const xf = int(rand, 2, 6);
  const fx0 = m * xf + n0;
  const y = m * int(rand, 1, 5) + n0;
  const xFromY = (y - n0) / m;
  const iii3 = {
    prompt: `Se consideră funcția f: ℝ → ℝ, f(x) = ${m}x + ${n0}.`,
    figure: null,
    parts: {
      a: part(`Arată că f(${xf}) = ${fx0}.`, String(fx0), {
        answers: [String(fx0)],
        explain: `f(${xf}) = ${m}·${xf} + ${n0} = ${fx0}.`,
        steps: [`${m} × ${xf} = ${m * xf}`, `+ ${n0} = ${fx0}`],
        solution: `a) f(${xf}) = ${m} · ${xf} + ${n0} = ${fx0}.`
      }),
      b: part(`Determină numărul real x pentru care f(x) = ${y}.`, String(xFromY), {
        answers: [String(xFromY), `x = ${xFromY}`, `x=${xFromY}`],
        explain: `${m}x + ${n0} = ${y} ⇒ x = ${xFromY}.`,
        steps: [`${m}x = ${y - n0}`, `x = ${xFromY}`],
        solution: `b) ${m}x + ${n0} = ${y} ⇒ x = ${xFromY}.`
      })
    }
  };

  const trapA = irEven(rand, 8, 16);
  const trapB = irEven(rand, 4, trapA - 2);
  const trapH = int(rand, 3, 8);
  const trapArea = ((trapA + trapB) * trapH) / 2;
  const baseT = 2 * int(rand, 4, 8);
  const hT = int(rand, 4, 10);
  const triArea = (baseT * hT) / 2;
  const useTrap = int(rand, 0, 1) === 0;
  const iii4 = useTrap
    ? {
      prompt: `Trapezul isoscel ABCD are bazele AB = ${trapA} cm, CD = ${trapB} cm și înălțimea ${trapH} cm.`,
      figure: 'trapezoid-iso',
      parts: {
        a: part(`Arată că linia mijlocie a trapezului este ${(trapA + trapB) / 2} cm.`, String((trapA + trapB) / 2), {
          answers: [String((trapA + trapB) / 2), `${(trapA + trapB) / 2} cm`],
          explain: `m = (${trapA}+${trapB})/2 = ${(trapA + trapB) / 2} cm.`,
          steps: [`(${trapA} + ${trapB}) / 2 = ${(trapA + trapB) / 2}`],
          solution: `a) Linia mijlocie este media bazelor: (${trapA} + ${trapB}) / 2 = ${(trapA + trapB) / 2} cm.`
        }),
        b: part('Calculează aria trapezului ABCD.', String(trapArea), {
          answers: [`${trapArea} cm²`, String(trapArea), `${trapArea} cm2`],
          explain: `A = (${trapA}+${trapB})·${trapH}/2 = ${trapArea} cm².`,
          steps: [`${trapA}+${trapB}=${trapA + trapB}`, `× ${trapH} / 2 = ${trapArea}`],
          solution: `b) A = (B + b) · h / 2 = (${trapA} + ${trapB}) · ${trapH} / 2 = ${trapArea} cm².`
        })
      }
    }
    : {
      prompt: `Triunghiul ABC are baza BC = ${baseT} cm și înălțimea corespunzătoare AD = ${hT} cm, D ∈ BC.`,
      figure: 'triangle',
      parts: {
        a: part(`Arată că AD = ${hT} cm.`, String(hT), {
          answers: [String(hT), `${hT} cm`],
          explain: `AD e înălțimea dată: ${hT} cm.`,
          steps: [`AD = ${hT} cm`],
          solution: `a) Din enunț, AD = ${hT} cm.`
        }),
        b: part('Calculează aria triunghiului ABC.', String(triArea), {
          answers: [`${triArea} cm²`, String(triArea)],
          explain: `A = (${baseT} · ${hT}) / 2 = ${triArea} cm².`,
          steps: [`(${baseT} × ${hT}) / 2 = ${triArea}`],
          solution: `b) A = (BC · AD) / 2 = (${baseT} · ${hT}) / 2 = ${triArea} cm².`
        })
      }
    };

  const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [9, 12, 15], [8, 15, 17]];
  const [ca, cb, cc2] = pick(rand, triples);
  const pitArea = (ca * cb) / 2;
  const iii5 = {
    prompt: `Triunghiul ABC este dreptunghic în A, AB = ${ca} cm, AC = ${cb} cm.`,
    figure: 'triangle-right',
    parts: {
      a: part(`Arată că BC = ${cc2} cm.`, `${cc2} cm`, {
        answers: [`${cc2} cm`, String(cc2), `BC = ${cc2}`, `BC=${cc2} cm`],
        explain: `Pitagora: ${ca}² + ${cb}² = ${cc2}², deci BC = ${cc2} cm.`,
        steps: [`${ca}² + ${cb}² = ${ca * ca + cb * cb}`, `BC = ${cc2} cm`],
        solution: `a) △ABC e dreptunghic în A, deci BC² = AB² + AC² = ${ca}² + ${cb}² = ${ca * ca + cb * cb}. BC = ${cc2} cm.`
      }),
      b: part('Calculează aria triunghiului ABC.', `${pitArea} cm²`, {
        answers: [`${pitArea} cm²`, String(pitArea), `${pitArea} cm2`, `A = ${pitArea}`],
        explain: `A = (${ca} × ${cb}) / 2 = ${pitArea} cm².`,
        steps: [`catetele sunt perpendiculare`, `(${ca} × ${cb}) / 2 = ${pitArea}`],
        solution: `b) A = (AB · AC) / 2 = (${ca} · ${cb}) / 2 = ${pitArea} cm².`
      })
    }
  };

  const kind6 = int(rand, 0, 2);
  let iii6;
  if (kind6 === 0) {
    const L = int(rand, 3, 8);
    const W = int(rand, 3, 7);
    const H = int(rand, 4, 10);
    const face = L * W;
    const vol = L * W * H;
    iii6 = {
      prompt: `Paralelipipedul dreptunghic ABCDEFGH are lungimea ${L} cm, lățimea ${W} cm și înălțimea ${H} cm.`,
      figure: 'box3d',
      parts: {
        a: part(`Arată că aria bazei ABCD este ${face} cm².`, `${face} cm²`, {
          answers: [`${face} cm²`, String(face), `${face} cm2`],
          explain: `${L} × ${W} = ${face} cm².`,
          steps: [`A_bază = ${L} × ${W}`],
          solution: `a) Baza ABCD e dreptunghi ${L} × ${W}, deci A = ${face} cm².`
        }),
        b: part('Calculează volumul paralelipipedului.', `${vol} cm³`, {
          answers: [`${vol} cm³`, String(vol), `${vol} cm3`],
          explain: `V = ${face} × ${H} = ${vol} cm³.`,
          steps: [`V = ${L} × ${W} × ${H} = ${vol}`],
          solution: `b) V = L · l · h = ${L} · ${W} · ${H} = ${vol} cm³.`
        })
      }
    };
  } else if (kind6 === 1) {
    const e = int(rand, 3, 9);
    iii6 = {
      prompt: `Cubul ABCDEFGH are muchia ${e} cm.`,
      figure: 'cube',
      parts: {
        a: part(`Arată că aria unei fețe este ${e * e} cm².`, `${e * e} cm²`, {
          answers: [`${e * e} cm²`, String(e * e), `${e * e} cm2`],
          explain: `Fața e pătrat ${e}×${e} = ${e * e} cm².`,
          steps: [`${e}² = ${e * e}`],
          solution: `a) O față e pătrat de latură ${e} cm: A = ${e}² = ${e * e} cm².`
        }),
        b: part('Calculează volumul cubului.', `${e ** 3} cm³`, {
          answers: [`${e ** 3} cm³`, String(e ** 3), `${e ** 3} cm3`],
          explain: `V = a³ = ${e ** 3} cm³.`,
          steps: [`${e}³ = ${e ** 3}`],
          solution: `b) V = a³ = ${e ** 3} cm³.`
        })
      }
    };
  } else {
    const cr = int(rand, 2, 5);
    const ch = int(rand, 4, 12);
    const base = cr * cr;
    const vol = cr * cr * ch;
    iii6 = {
      prompt: `Cilindrul circular drept are raza bazei ${cr} cm și înălțimea ${ch} cm.`,
      figure: 'cylinder',
      parts: {
        a: part(`Arată că aria bazei este ${base}π cm².`, `${base}π`, {
          answers: [`${base}π`, `${base}π cm²`, `${base} pi`, String(base)],
          explain: `A_bază = πr² = ${base}π cm².`,
          steps: [`r² = ${base}`, `× π`],
          solution: `a) A_bază = πr² = π · ${cr}² = ${base}π cm².`
        }),
        b: part('Calculează volumul cilindrului (coeficientul lui π).', String(vol), {
          answers: [String(vol), `${vol}π`, `${vol}π cm³`],
          explain: `V = πr²h = ${vol}π cm³, deci coeficientul e ${vol}.`,
          steps: [`${base} × ${ch} = ${vol}`],
          solution: `b) V = πr²h = ${base}π · ${ch} = ${vol}π cm³. Coeficientul lui π este ${vol}.`
        })
      }
    };
  }

  return [iii1, iii2, iii3, iii4, iii5, iii6].map((row, index) => bankIII(index + 1, rand, options) || row);
}

function irEven(rand, min, max) {
  let v = int(rand, min, max);
  if (v % 2) v += 1;
  if (v > max) v -= 2;
  return Math.max(min, v);
}

function generateMathContent(rand, options = {}) {
  return {
    I: makeI(rand),
    II: makeII(rand),
    III: makeIII(rand, options)
  };
}

module.exports = { generateMathContent };
