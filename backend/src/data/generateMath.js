const { int, pick, uniqueOptions, gcd, lcm } = require('./itemRng');

function flash(point, question, options, explain, level) {
  if (!Array.isArray(options) || options.length !== 4) return null;
  return { point, question, options, correct: 0, explain, level };
}

function test(point, prompt, value, steps, extra = {}) {
  const answers = extra.answers || [String(value)];
  return {
    point,
    prompt,
    answers,
    explain: extra.explain || steps[steps.length - 1] || '',
    hint: extra.hint || '',
    numeric: extra.numeric !== false && Number.isFinite(Number(value)) ? { value: Number(value), tolerance: extra.tol || 0 } : null,
    tokens: extra.tokens || [],
    steps,
    level: extra.level || 1
  };
}

function rung(level, fns) {
  const n = fns.length;
  const lv = Math.max(1, Number(level) || 1);
  const i = Math.min(n - 1, lv - 1);
  return fns[i];
}

const BY_CHAPTER = {
  naturale: {
    flashes: [
      (rand) => { const n = int(rand, 10, 40) * 2; return flash('par', `${n} este…`, ['par', 'impar', 'prim obligatoriu', 'negativ'], 'Se împarte exact la 2, deci e par.', 1); },
      (rand) => { const b = int(rand, 2, 6); return flash('puteri', `Cât face ${b}²?`, uniqueOptions(rand, b * b, [b * 2, b + b, b * b + 1]), `${b} × ${b} = ${b * b}.`, 2); },
      (rand) => { const n = int(rand, 21, 98); const even = n % 2 === 0; return flash('div2', `Numărul ${n} se împarte exact la 2?`, [even ? 'Da, ultima cifră e pară' : 'Nu, ultima cifră e impară', even ? 'Nu, e impar' : 'Da, orice număr de 2 cifre', 'Doar dacă se termină cu 5', 'Doar dacă suma cifrelor e 9'], even ? 'Par = 0, 2, 4, 6 sau 8 la final.' : 'Imparul nu se împarte exact la 2.', 3); },
      (rand) => { const n = pick(rand, [15, 20, 24, 35, 42, 50]); const ok = n % 5 === 0; return flash('div5', `${n} se împarte exact la 5?`, [ok ? 'Da, se termină cu 0 sau 5' : 'Nu, ultima cifră nu e 0 sau 5', 'Da, e impar', 'Doar dacă e prim', 'Doar dacă e par'], 'Criteriul lui 5: ultima cifră 0 sau 5.', 4); },
      (rand) => { const p = pick(rand, [11, 13, 17, 19, 23, 29]); return flash('prime', `${p} e prim pentru că…`, ['are exact doi divizori: 1 și el', 'se împarte la 3', 'e par', 'are mulți divizori'], 'Prim = doar 1 și el însuși.', 5); },
      () => flash('paranteze', 'În 3 + 4 × 2, întâi…', ['înmulțești 4 × 2', 'aduni 3 + 4', 'faci 3 × 2', 'scazi 4'], 'Înmulțirea bate adunarea, dacă nu sunt paranteze.', 6),
      () => flash('cmmdc', 'Cel mai mare divizor comun al celor două numere e…', ['cel mai mare număr care le împarte pe amândouă', 'cel mai mic multiplu comun', 'suma lor', 'produsul lor'], 'Este cel mai mare dintre divizorii comuni.', 7),
      () => flash('cmmmc', 'Cel mai mic multiplu comun nenul e…', ['cel mai mic număr nenul care se împarte la amândouă', 'cel mai mare divizor', 'diferența lor', 'un număr prim'], 'Este primul multiplu comun pe care îl întâlnești după 0.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 12, 48); const b = int(rand, 6, 18); return test('adunare', `Calculează ${a} + ${b} × 2. Doar rezultatul.`, a + b * 2, [`Întâi înmulțirea: ${b} × 2 = ${b * 2}`, `${a} + ${b * 2} = ${a + b * 2}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 8); return test('puteri', `Calculează ${a}².`, a * a, [`${a} × ${a} = ${a * a}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 6); const b = int(rand, 2, 5); const c = int(rand, 1, 8); const val = a ** 2 * b + c; return test('paranteze', `Calculează ${a}² × ${b} + ${c}.`, val, [`${a}² = ${a * a}`, `${a * a} × ${b} = ${a * a * b}`, `+ ${c} = ${val}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 3, 8); const b = int(rand, 2, 6); const c = int(rand, 2, 9); const val = a * a * b + c * c; return test('paranteze', `Calculează ${a}² × ${b} + ${c}². Doar rezultatul.`, val, [`${a}² = ${a * a}`, `${a * a} × ${b} = ${a * a * b}`, `${c}² = ${c * c}`, `Suma = ${val}`], { level: lv }); },
      (rand, lv) => { const g = int(rand, 2, 6); const a = g * int(rand, 2, 7); const b = g * int(rand, 2, 7); return test('cmmdc', `Cel mai mare număr care împarte și pe ${a}, și pe ${b}.`, gcd(a, b), [`Divizorii comuni se opresc la ${gcd(a, b)}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [4, 6, 8, 9, 10, 12]); const b = pick(rand, [6, 8, 10, 12, 15, 18]); const val = lcm(a, b); return test('cmmmc', `Un autobuz pleacă la fiecare ${a} minute, altul la fiecare ${b}. Au plecat împreună acum. Peste câte minute pleacă iar împreună?`, val, [`c.m.m.m.c.(${a}, ${b})`, `${val} minute`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [4, 6, 8, 10]); const b = pick(rand, [6, 8, 12, 15]); const c = pick(rand, [9, 10, 12, 15]); const val = lcm(lcm(a, b), c); return test('cmmmc', `Trei clopoțele sună la ${a}, ${b} și ${c} minute. Au sunat împreună la minutul 0. După câte minute sună din nou toate trei?`, val, [`Întâi ${a} și ${b}: ${lcm(a, b)}`, `Apoi cu ${c}: ${val}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [4, 6, 8, 10]); const b = pick(rand, [6, 9, 12, 15]); const c = pick(rand, [8, 10, 12, 18]); const step = lcm(lcm(a, b), c); const k = pick(rand, [2, 3, 4, 5]); const span = k * step; return test('cmmmc', `Trei semafoare clipesc la ${a}, ${b} și ${c} secunde și au clipit împreună la secunda 0. De la secunda 0 până la secunda ${span}, inclusiv, de câte ori clipesc iar toate trei, fără clipirea de la 0?`, k, [`c.m.m.m.c. = ${step} s`, `Multiplii până la ${span}: ${span} : ${step} = ${k}`], { level: lv }); }
    ]
  },
  fractii: {
    flashes: [
      () => flash('parte', 'O fracție arată…', ['câte părți egale luăm dintr-un întreg', 'doar un număr mic', 'o temperatură', 'un unghi'], 'Numitorul taie; numărătorul spune câte felii.', 1),
      (rand) => { const k = int(rand, 2, 7); return flash('amplif', `Amplifici 1/${k} cu 2. Ce obții?`, [`2/${k * 2}`, `1/${k * 2}`, `${k}/2`, `2/${k}`], `Înmulțești sus și jos cu 2: 2/${k * 2}.`, 2); },
      (rand) => { const k = int(rand, 2, 5); return flash('simplif', `Fracția ${2 * k}/${4 * k} se simplifică la…`, ['1/2', '2/4', `${k}/${2 * k}`, '1/4'], `Împarți sus și jos cu ${2 * k}.`, 3); },
      (rand) => { const p = pick(rand, [10, 20, 25, 50]); return flash('procent', `${p}% înseamnă…`, [`${p}/100`, `${p}/10`, `${100 - p}/100`, `${p * 2}/100`], 'Procentul e o sutime.', 4); },
      () => flash('numitor', 'Ca să aduni 1/3 cu 1/6 trebuie…', ['același numitor', 'același numărător', 'să le înmulțești', 'să le faci zecimale obligatoriu'], 'Părțile trebuie să fie de aceeași mărime.', 5),
      () => flash('zecimal', '0,5 e aceeași idee cu…', ['1/2', '5/1', '1/5', '2/5'], 'Virgula e altă scriere a fracției.', 6),
      () => flash('media', 'Media a două note e…', ['suma împărțită la 2', 'produsul lor', 'nota cea mare', 'diferența'], 'Aduni, apoi împarți la câți termeni ai.', 7),
      () => flash('parte-din', '1/4 din 20 e…', ['5', '4', '16', '24'], 'Împarți 20 la 4.', 8)
    ],
    tests: [
      (rand, lv) => { const n = pick(rand, [8, 10, 12, 16, 20]); return test('parte', `Cât este 1/2 din ${n}?`, n / 2, [`${n} : 2 = ${n / 2}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 6, 9); const y = int(rand, 6, 9); const m = int(rand, 6, 9); let z = 3 * m - x - y; if (z < 5 || z > 10) { return test('media', 'Media aritmetică a notelor 7, 7, 7.', 7, ['Suma = 21', 'Împarți la 3 → 7'], { level: lv }); } return test('media', `Media aritmetică a notelor ${x}, ${y}, ${z}.`, m, [`Suma = ${x + y + z}`, `Împarți la 3 → ${m}`], { level: lv }); },
      (rand, lv) => { const d = pick(rand, [6, 8, 12]); const a = 1; const b = d / 2; const g = gcd(a + b, d); const num = (a + b) / g; const den = d / g; return test('numitor', `Calculează ${a}/${d} + ${b}/${d}. Fracție ireductibilă sau întreg.`, den === 1 ? num : `${num}/${den}`, [`Același numitor ${d}`, `${a}+${b}=${a + b}`], { answers: den === 1 ? [String(num)] : [`${num}/${den}`], numeric: den === 1, level: lv }); },
      (rand, lv) => { const pret = pick(rand, [40, 80, 100, 120]); const p = pick(rand, [10, 20, 25]); const cut = (pret * p) / 100; return test('procent', `Un obiect costă ${pret} lei. Reducere ${p}%. Cât plătești?`, pret - cut, [`${p}% din ${pret} = ${cut}`, `${pret} − ${cut} = ${pret - cut}`], { level: lv }); },
      (rand, lv) => { const k = pick(rand, [3, 4, 6]); const n = k * pick(rand, [3, 4, 5, 6]); return test('parte', `Cât este 1/${k} din ${n}?`, n / k, [`${n} : ${k} = ${n / k}`], { level: lv }); },
      (rand, lv) => { const pret = pick(rand, [80, 100, 120]); const p = pick(rand, [10, 15, 20]); const cut = (pret * p) / 100; const extra = pick(rand, [5, 8, 10]); return test('procent', `Preț ${pret} lei, reducere ${p}%, apoi mai scazi ${extra} lei. Cât rămâne?`, pret - cut - extra, [`${p}% = ${cut}`, `${pret} − ${cut} = ${pret - cut}`, `${pret - cut} − ${extra} = ${pret - cut - extra}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [2, 3, 4]); const b = pick(rand, [3, 4, 6]); const d = lcm(a, b); const n1 = d / a; const n2 = d / b; const g = gcd(n1 + n2, d); return test('numitor', `Calculează 1/${a} + 1/${b}. Fracție ireductibilă.`, `${(n1 + n2) / g}/${d / g}`, [`Numitor comun ${d}`, `1/${a}=${n1}/${d}, 1/${b}=${n2}/${d}`, `Suma = ${(n1 + n2) / g}/${d / g}`], { answers: [`${(n1 + n2) / g}/${d / g}`], numeric: false, level: lv }); },
      (rand, lv) => { const row = pick(rand, [[80, 25, 4, 45], [120, 10, 3, 72], [100, 20, 4, 60], [60, 10, 3, 36], [160, 20, 4, 96], [80, 10, 4, 54], [100, 10, 5, 72], [200, 10, 4, 135], [80, 20, 4, 48], [60, 20, 3, 32], [120, 20, 3, 64], [100, 25, 5, 60], [160, 10, 4, 108], [200, 20, 5, 128], [80, 25, 5, 48]]); const [pret, p, k, val] = row; const cut = (pret * p) / 100; const rest = pret - cut; const extra = rest / k; return test('procent', `Un obiect costă ${pret} lei. Întâi reducere de ${p}%, apoi mai scazi 1/${k} din ce a rămas. Cât plătești?`, val, [`${p}% din ${pret} = ${cut}`, `Rămân ${rest}`, `1/${k} din ${rest} = ${extra}`, `${rest} − ${extra} = ${val}`], { level: lv }); }
    ]
  },
  geometrie: {
    flashes: [
      () => flash('unghi', 'Un unghi drept măsoară…', ['90 de grade', '45 de grade', '180 de grade', '360 de grade'], 'Colțul pătratului.', 1),
      () => flash('ascutit', 'Un unghi ascuțit e…', ['mai mic decât 90°', 'exact 90°', 'mai mare decât 90°', 'doar 0°'], 'Ascuțit = sub un drept.', 2),
      (rand) => { const a = int(rand, 3, 9); return flash('arie-patrat', `Aria pătratului de latură ${a} cm e…`, uniqueOptions(rand, `${a * a} cm²`, [`${4 * a} cm²`, `${2 * a} cm²`, `${a + a} cm²`]), `latura × latura = ${a * a}.`, 3); },
      (rand) => { const a = int(rand, 3, 8); const b = int(rand, 3, 8); const c = int(rand, 3, 8); return flash('perimetru', `Perimetrul triunghiului cu laturile ${a}, ${b} și ${c} cm e…`, uniqueOptions(rand, `${a + b + c} cm`, [`${a * b * c} cm`, `${a + b} cm`, `${a * b} cm`]), `${a} + ${b} + ${c} = ${a + b + c}.`, 4); },
      (rand) => { const L = int(rand, 5, 10); const l = int(rand, 3, 7); return flash('arie-drep', `Aria dreptunghiului ${L}×${l} e…`, uniqueOptions(rand, L * l, [2 * (L + l), L + l, L * 2]), `lungime × lățime = ${L * l}.`, 5); },
      () => flash('volum-cub', 'Volumul cubului e…', ['latură × latură × latură', '4 × latură', 'suma muchiilor', 'doar o față'], 'Câte cuburi unitate umplu corpul.', 6),
      () => flash('unitati', 'Când treci de la metri la centimetri…', ['înmulțești cu 100', 'împarți cu 100', 'aduni 100', 'nu schimbi nimic'], '1 m = 100 cm.', 7),
      () => flash('alungit', 'Un unghi alungit măsoară…', ['180°', '90°', '360°', '45°'], 'Laturile sunt semidrepte opuse.', 8)
    ],
    tests: [
      (rand, lv) => test('unghi', 'Câte grade are un unghi drept?', 90, ['Unghi drept = 90°'], { level: lv }),
      (rand, lv) => { const a = int(rand, 3, 9); return test('perimetru', `Pătrat de latură ${a} cm. Perimetrul, în cm.`, 4 * a, [`Patru laturi egale`, `4 × ${a} = ${4 * a}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 4, 9); const b = int(rand, 4, 9); const c = int(rand, 4, 9); return test('perimetru', `Triunghi cu laturile ${a} cm, ${b} cm și ${c} cm. Perimetrul, în cm.`, a + b + c, [`${a} + ${b} + ${c} = ${a + b + c}`], { level: lv }); },
      (rand, lv) => { const L = int(rand, 6, 14); const l = int(rand, 4, 9); return test('arie-drep', `Aria unui dreptunghi ${L} cm × ${l} cm, în cm².`, L * l, [`${L} × ${l} = ${L * l}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 20, 70); return test('unghi', `Un unghi de ${a}° și unul alăturat fac 180°. Cât e alăturatul?`, 180 - a, [`180 − ${a} = ${180 - a}`], { level: lv }); },
      (rand, lv) => { let L = int(rand, 8, 16); let l = int(rand, 4, 9); if ((L + l) % 2) l += 1; const side = (L + l) / 2; return test('perimetru', `Dreptunghi ${L} cm pe ${l} cm. Un pătrat are același perimetru. Latura pătratului, în cm.`, side, [`P = 2×(${L}+${l}) = ${2 * (L + l)}`, `${2 * (L + l)} : 4 = ${side}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 6); return test('volum-cub', `Cub cu latura ${a} cm. Volumul, în cm³.`, a * a * a, [`${a} × ${a} × ${a} = ${a * a * a}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 10, 16); const b = int(rand, 2, Math.floor((a - 1) / 2)); const square = a * a; const cut = a * b; const rest = square - cut; const val = rest - cut; return test('arie-drep', `Pătrat de latură ${a} cm. Tai din el un dreptunghi ${a} cm pe ${b} cm. Cu cât este aria rămasă (cm²) mai mare decât dreptunghiul tăiat?`, val, [`Aria pătratului = ${square}`, `Tai ${cut}, rămân ${rest}`, `${rest} − ${cut} = ${val}`], { level: lv }); }
    ]
  },
  multimi: {
    flashes: [
      () => flash('apartine', '„x aparține mulțimii A” înseamnă…', ['x e un element din A', 'A e mai mare decât x', 'x e în afara lui A', 'A e vidă'], '∈ spune „face parte din”.', 1),
      () => flash('reuniune', 'Reuniunea conține…', ['tot din cel puțin una, fără dubluri', 'doar elementele comune', 'doar ce lipsește', 'numerele impare'], 'Strângi tot, o dată.', 2),
      () => flash('intersectie', 'Intersecția a două mulțimi conține…', ['doar elementele comune', 'tot din amândouă', 'doar ce lipsește', 'numerele pare'], 'Doar oaspeții de la ambele petreceri.', 3),
      () => flash('factori', 'Descompunerea în factori primi…', ['scrii numărul ca produs de prime', 'aduni cifrele', 'îl faci par', 'îl rotunjești'], '12 = 2 × 2 × 3.', 4),
      () => flash('cmmdc', 'c.m.m.d.c. e…', ['cel mai mare număr care împarte pe amândoi', 'cel mai mic multiplu comun', 'suma lor', 'produsul lor'], 'Cel mai mare prieten la împărțire.', 5),
      () => flash('cmmmc', 'c.m.m.m.c. e…', ['cel mai mic număr care se împarte la amândoi', 'cel mai mare divizor', 'diferența lor', 'un număr prim'], 'Prima stație comună.', 6),
      () => flash('vida', 'Mulțimea vidă…', ['nu are niciun element', 'are un zero', 'e infinită', 'e {0}'], 'Simbol: ∅. Zero e un element; vida e goală.', 7),
      () => flash('cardinal', '|A| înseamnă…', ['câte elemente distincte are A', 'cel mai mare element', 'suma elementelor', 'un unghi'], 'Cardinalul e numărul de oaspeți, nu numele lor.', 8)
    ],
    tests: [
      (rand, lv) => { const n = int(rand, 3, 6); return test('cardinal', `Câte elemente are {${Array.from({ length: n }, (_, i) => 2 * i + 1).join(', ')}}?`, n, [`Sunt ${n} numere distincte`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 8, 16); const b = int(rand, 8, 16); const both = int(rand, 2, Math.min(5, a, b)); return test('reuniune', `${a} fac sport, ${b} muzică, ${both} pe amândouă. Câți fac cel puțin una?`, a + b - both, [`${a} + ${b} − ${both} = ${a + b - both}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 4, 9); const b = int(rand, 6, 12); return test('cmmdc', `c.m.m.d.c.(${a * 2}, ${b * 2}).`, gcd(a * 2, b * 2), [`c.m.m.d.c. = ${gcd(a * 2, b * 2)}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 8, 20); const b = int(rand, 8, 20); const both = int(rand, 2, Math.min(6, a, b)); const total = int(rand, a + b - both + 2, a + b - both + 10); const none = total - (a + b - both); return test('intersectie', `Grup de ${total}: ${a} mate, ${b} română, ${both} pe amândouă. Câți niciunul?`, none, [`În cel puțin un cerc: ${a + b - both}`, `${total} − ${a + b - both} = ${none}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [8, 12, 18]); const b = pick(rand, [12, 18, 24]); return test('cmmmc', `c.m.m.m.c.(${a}, ${b}).`, lcm(a, b), [`c.m.m.m.c. = ${lcm(a, b)}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [36, 48, 60]); const b = pick(rand, [18, 24, 30]); return test('cmmdc', `c.m.m.d.c.(${a}, ${b}) × c.m.m.m.c.(${a}, ${b}) : ${a}.`, b, ['Produsul c.m.m.d.c. și c.m.m.m.c. e produsul numerelor', `${a}×${b}/${a} = ${b}`], { level: lv }); },
      (rand, lv) => { const x = pick(rand, [8, 10, 12]); const y = pick(rand, [12, 15, 18]); const z = pick(rand, [18, 20, 24]); return test('cmmmc', `Trei semnale la ${x}, ${y} și ${z} s. După câte secunde coincid din nou?`, lcm(lcm(x, y), z), [`c.m.m.m.c.(${x},${y},${z}) = ${lcm(lcm(x, y), z)}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 14, 24); const b = int(rand, 12, 22); const both = int(rand, 2, 6); const onlyA = a - both; const onlyB = b - both; return test('reuniune', `${a} fac sport, ${b} fac muzică, ${both} fac amândouă. Câți fac exact una, nu pe amândouă?`, onlyA + onlyB, [`Doar sport: ${onlyA}`, `Doar muzică: ${onlyB}`, `Exact una: ${onlyA + onlyB}`], { level: lv }); }
    ]
  },
  proportii: {
    flashes: [
      () => flash('raport', 'Un raport compară…', ['două mărimi printr-o împărțire', 'doar unghiuri', 'doar mulțimi', 'trei numere obligatoriu'], '3:4 spune „cât dintr-una față de cealaltă”.', 1),
      (rand) => { const a = int(rand, 2, 5); const b = a * int(rand, 2, 4); return flash('raport', `Raportul ${a}:${b} se simplifică la…`, [`1:${b / a}`, `${a}:${b}`, `${b}:${a}`, '1:1'], `Împarți ambele părți cu ${a}.`, 2); },
      () => flash('direct', 'Mărimi direct proporționale…', ['cresc sau scad împreună, în același ritm', 'una crește când cealaltă scade', 'nu se leagă', 'sunt mereu egale'], 'Dublu cantitate, dublu preț dacă prețul e fix.', 3),
      () => flash('invers', 'Mărimi invers proporționale…', ['una crește când cealaltă scade, produsul rămâne', 'cresc mereu împreună', 'sunt unghiuri', 'sunt fracții improprii'], 'Mai mulți lucrători, mai puțin timp.', 4),
      () => flash('regula3', 'Regula de trei e…', ['o proporție cu un loc gol', 'o înmulțire de trei numere oarecare', 'o teoremă de geometrie', 'o medie'], 'Trei valori știute, a patra se află.', 5),
      () => flash('procent6', 'Procentul, la rapoarte, e tot…', ['o parte din 100', 'un unghi', 'un prim', 'un volum'], 'Poți trece de la raport la procent.', 6),
      () => flash('scara', 'Scara 1:100 pe o hartă înseamnă…', ['1 cm pe hartă e 100 cm în realitate', 'harta e de 100 de ori mai mare', 'sunt 100 de orașe', 'e un procent de 1%'], 'Scara e un raport între desen și real.', 7),
      () => flash('regula3', 'Dacă 3 caiete = 18 lei, un caiet e…', ['6 lei', '15 lei', '21 lei', '9 lei'], 'Reduci la unitate: 18:3=6.', 8)
    ],
    tests: [
      (rand, lv) => { const n = int(rand, 2, 5); const unit = int(rand, 4, 9); return test('regula3', `${n} caiete costă ${n * unit} lei. Cât costă 1 caiet?`, unit, [`${n * unit} : ${n} = ${unit}`], { level: lv }); },
      (rand, lv) => { const n = int(rand, 4, 10); const pret = n * int(rand, 8, 15); const k = int(rand, 2, n - 1); const unit = pret / n; return test('regula3', `${n} caiete costă ${pret} lei. Cât costă ${k} caiete?`, unit * k, [`Un caiet: ${unit}`, `${k} × ${unit} = ${unit * k}`], { level: lv }); },
      (rand, lv) => { const p = pick(rand, [10, 20, 25]); const n = pick(rand, [40, 60, 80, 100]); return test('procent6', `${p}% din ${n}. Doar numărul.`, (n * p) / 100, [`${p}/100 × ${n} = ${(n * p) / 100}`], { level: lv }); },
      (rand, lv) => { const k = pick(rand, [2, 3, 4, 5]); const real = k * int(rand, 4, 12); return test('scara', `Scara 1:${k}. Pe hartă ${real / k} cm. Câți cm în realitate?`, real, [`${real / k} × ${k} = ${real}`], { level: lv }); },
      (rand, lv) => { const work = pick(rand, [3, 5, 7]); const hours = pick(rand, [2, 4, 6]); return test('invers', `${work} robinete umplu un bazin în ${hours} ore. Câte ore la ${work * 2} robinete?`, hours / 2, [`Produsul rămâne ${work * hours}`, `${work * 2} × ? = ${work * hours}`, `? = ${hours / 2}`], { level: lv }); },
      (rand, lv) => { const pret = int(rand, 1, 20) * 25; const up = pret * 6 / 5; const val = up * 4 / 5; return test('procent6', `Un preț de ${pret} lei crește cu 20%, apoi scade cu 20% din noul preț. Cât e acum?`, val, [`${pret} + 20% = ${up}`, `20% din noul preț, nu din ${pret}`, `Rămân ${val}`], { level: lv }); },
      (rand, lv) => { const n = int(rand, 6, 12); const unit = int(rand, 2, 8) * 10; const k = int(rand, 2, n - 1); const p = pick(rand, [10, 20]); const pret = n * unit; const brute = unit * k; const cut = brute * p / 100; return test('regula3', `${n} m costă ${pret} lei. Cumperi ${k} m cu ${p}% reducere. Cât plătești?`, brute - cut, [`1 m = ${unit}`, `${k} m = ${brute}`, `${p}% = ${cut}`, `Plătești ${brute - cut}`], { level: lv }); },
      (rand, lv) => { const row = pick(rand, [[4, 6, 2, 4, 2], [4, 8, 2, 2, 4], [4, 5, 2, 2, 2], [6, 6, 2, 2, 3], [6, 6, 2, 6, 2], [3, 6, 2, 3, 2], [3, 8, 2, 3, 3], [5, 6, 2, 5, 2], [5, 8, 2, 5, 3], [6, 8, 2, 3, 4], [4, 9, 3, 4, 3], [8, 5, 2, 4, 2], [3, 10, 4, 3, 3], [5, 4, 2, 5, 1], [6, 8, 4, 6, 2]]); const [n, h, t, k, val] = row; return test('invers', `${n} muncitori termină o lucrare în ${h} ore, același ritm. După ${t} ore sosesc încă ${k}. Câte ore mai durează de atunci?`, val, [`Rămâneau ${h - t} ore la ${n} oameni`, `Lucru rămas: ${n * (h - t)}`, `${n + k} oameni îl fac în ${val} ore`], { level: lv }); }
    ]
  },
  'intregi-rationale': {
    flashes: [
      (rand) => { const n = int(rand, 2, 9); return flash('opus', `Opusul lui ${n} este…`, uniqueOptions(rand, `-${n}`, [String(n), '0', String(n + 1)]), 'Opusul schimbă semnul; suma e 0.', 1); },
      (rand) => { const n = int(rand, 2, 9); return flash('modul', `|−${n}| este…`, uniqueOptions(rand, String(n), [`-${n}`, '0', String(n + 1)]), 'Modulul e distanța până la zero.', 2); },
      () => flash('semn', 'Minusul la întregi arată…', ['direcția pe axă, nu „un număr urât”', 'că e fracție', 'că e prim', 'că e volum'], '−3 e trei pași în stânga lui zero.', 3),
      () => flash('adunare', 'Când aduni un negativ, de fapt…', ['te muți spre stânga pe axă', 'înmulțești', 'ștergi semnul', 'faci o putere'], '5 + (−2) = 3.', 4),
      () => flash('rationale', 'Un număr rațional se poate scrie…', ['ca o fracție de întregi (numitor ≠ 0)', 'doar ca radical', 'doar ca procent', 'doar ca volum'], '−3/4, 0,7, 5 sunt raționale.', 5),
      () => flash('produs', '(−) × (+) dă…', ['minus', 'plus', 'zero', 'un unghi'], 'Semne diferite → rezultat negativ.', 6),
      () => flash('ecuatie', 'x + 5 = 12 întreabă…', ['ce număr plus 5 face 12', 'cât e 5 × 12', 'dacă 12 e prim', 'perimetrul'], 'Scazi 5 din ambele părți: x = 7.', 7),
      () => flash('verificare', 'După ce găsești x, ce faci?', ['Îl pui înapoi în enunț să vezi dacă iese', 'Îl ștergi', 'Îl înmulțești cu 10', 'Îl faci procent'], 'Verificarea e parte din treabă.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 2, 8); const b = int(rand, 3, 9); return test('adunare', `Calculează (−${a}) + ${b}.`, -a + b, [`−${a} + ${b} = ${-a + b}`], { level: lv }); },
      (rand, lv) => { const n = int(rand, 3, 12); return test('modul', `Cât este |−${n}|?`, n, [`Distanța până la 0 e ${n}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 8); const b = int(rand, 2, 8); return test('produs', `Calculează (−${a}) × ${b}.`, -a * b, ['Minus ori plus = minus', `= ${-a * b}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 3, 12); const b = int(rand, 2, 9); const c = int(rand, 1, 8); return test('adunare', `Calculează (−${a}) + ${b} + (−${c}).`, -a + b - c, [`−${a} + ${b} = ${-a + b}`, `${-a + b} + (−${c}) = ${-a + b - c}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 6, 15); const b = int(rand, 3, 9); const c = int(rand, 2, 8); const val = -a + b - c; return test('adunare', `Calculează (−${a}) − (−${b}) + (−${c}).`, val, [`−${a} − (−${b}) = ${-a + b}`, `${-a + b} + (−${c}) = ${val}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 5); const x = int(rand, 2, 8); const b = int(rand, 1, 9); return test('ecuatie', `Află x: ${a}x − ${b} = ${a * x - b}.`, x, [`${a}x = ${a * x}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 4); const x = int(rand, 2, 6); const b = int(rand, 1, 8); const c = int(rand, 1, 5); return test('ecuatie', `Află x: ${a}x − ${b} = −${c}x + ${a * x - b + c * x}.`, x, [`Treci necunoscutele într-o parte`, `${a}x + ${c}x = ${a * x + c * x}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [2, 3, 4, 5]); const b = pick(rand, [6, 7, 8, 9, 10, 12]); const x = int(rand, 1, b - 1); const rhs = -a * (x - b); const val = x - b; return test('ecuatie', `Află x din −${a}(x − ${b}) = ${rhs}, apoi calculează |x| − ${b}.`, val, [`x − ${b} = ${rhs / -a}`, `x = ${x}`, `|${x}| − ${b} = ${val}`], { level: lv }); }
    ]
  },
  triunghi: {
    flashes: [
      () => flash('suma180', 'Suma unghiurilor unui triunghi e…', ['180°', '90°', '360°', '60°'], 'Cele trei colțuri fac un unghi alungit.', 1),
      () => flash('drept', 'În triunghiul dreptunghic, cea mai lungă latură e…', ['ipotenuza, vizavi de unghiul de 90°', 'o catetă oarecare', 'înălțimea', 'baza isoscelului'], 'Ipotenuza e față de unghiul drept.', 2),
      () => flash('opuse', 'Unghiurile opuse la vârf…', ['sunt egale', 'sunt suplementare mereu', 'sunt 90°', 'nu există'], 'Față în față, când două drepte se taie.', 3),
      () => flash('paralele', 'Două drepte paralele tăiate de o secantă…', ['produc unghiuri corespunzătoare egale', 'se întâlnesc obligatoriu', 'formează un cub', 'anulează unghiurile'], 'Paralelele păstrează aceleași unghiuri cu tăietura.', 4),
      () => flash('cerc', 'Diametrul unui cerc e…', ['de două ori raza, trece prin centru', 'jumătate din rază', 'o coardă oarecare', 'perimetrul'], 'Rază = centru la cerc; diametru = 2 raze.', 5),
      () => flash('clasif', 'Un triunghi dreptunghic are…', ['un unghi de 90°', 'toate unghiurile obtuze', 'laturi paralele', 'un cerc de rază 1'], 'Un colț drept; celelalte două ascuțite.', 6),
      () => flash('pitagora', 'Pitagora spune…', ['a² + b² = c² pe ipotenuză', 'o regulă de trei', 'o medie', 'o fracție'], 'c e latura din fața unghiului drept.', 7),
      () => flash('congr', 'Triunghiuri congruente…', ['au aceeași formă și aceleași mărimi', 'doar aceeași arie, formă diferită', 'sunt cercuri', 'au un singur unghi egal'], 'Se potrivesc dacă le suprapui.', 8)
    ],
    tests: [
      (rand, lv) => test('suma180', 'Câte grade au împreună unghiurile unui triunghi?', 180, ['Mereu 180°'], { level: lv }),
      (rand, lv) => { const a = int(rand, 30, 70); const b = int(rand, 30, 80); const useB = a + b < 170 ? b : 40; return test('suma180', `Unghiurile ${a}° și ${useB}°. Al treilea unghi?`, 180 - a - useB, [`180 − ${a} − ${useB} = ${180 - a - useB}`], { level: lv }); },
      (rand, lv) => { const varf = pick(rand, [20, 30, 40, 50, 80]); const baza = (180 - varf) / 2; return test('suma180', `Triunghi isoscel, unghiul din vârf ${varf}°. Un unghi de la bază?`, baza, [`Rămân ${180 - varf}°`, `${180 - varf} : 2 = ${baza}`], { level: lv }); },
      (rand, lv) => { const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10]]; const [x, y, z] = pick(rand, triples); return test('pitagora', `Catete ${x} și ${y}. Ipotenuza?`, z, [`${x}² + ${y}² = ${z}²`], { level: lv }); },
      (rand, lv) => { const baza = pick(rand, [50, 65, 70]); const varf = 180 - 2 * baza; return test('suma180', `Triunghi isoscel, un unghi de la bază ${baza}°. Unghiul din vârf?`, varf, [`Cele două de la bază sunt egale`, `180 − ${baza} − ${baza} = ${varf}`], { level: lv }); },
      (rand, lv) => { const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13]]; const [x, y, z] = pick(rand, triples); const k = int(rand, 1, 3); return test('pitagora', `Catete ${x * k} și ${y * k}. Perimetrul triunghiului dreptunghic.`, (x + y + z) * k, [`Ipotenuza = ${z * k}`, `Perimetru = ${(x + y + z) * k}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [40, 50, 62]); return test('opuse', `Două drepte se taie. Un unghi e ${a}°. Suma dintre opusul la vârf și unul alăturat?`, 180, [`Opusul = ${a}°`, `Alăturatul = ${180 - a}°`, `Suma = 180`], { level: lv }); },
      (rand, lv) => { const baza = int(rand, 35, 80); const varf = 180 - 2 * baza; const ext = 2 * baza; return test('suma180', `Triunghi isoscel, un unghi de la bază are ${baza}°. Află unghiul din vârf, apoi unghiul exterior alăturat vârfului. Cât măsoară exteriorul?`, ext, [`Vârful: 180 − 2×${baza} = ${varf}`, `Exteriorul alăturat vârfului: 180 − ${varf} = ${ext}`], { level: lv }); }
    ]
  },
  reale: {
    flashes: [
      (rand) => { const n = pick(rand, [4, 9, 16, 25, 36]); return flash('radical', `√${n} =`, uniqueOptions(rand, Math.sqrt(n), [n / 2, n, Math.sqrt(n) + 1]), `${Math.sqrt(n)} × ${Math.sqrt(n)} = ${n}.`, 1); },
      () => flash('irațional', 'Un irațional…', ['nu se scrie frumos ca fracție de întregi', 'e mereu negativ', 'e un unghi', 'e 0'], '√2 nu e o fracție exactă, dar e pe axă.', 2),
      () => flash('reale', 'Mulțimea numerelor reale cuprinde…', ['raționale și iraționale, pe aceeași axă', 'doar naturale', 'doar procente', 'doar volume'], 'Tot ce poți arăta pe o dreaptă continuă.', 3),
      () => flash('ordin', 'Pe axă, √2 stă…', ['între 1 și 2', 'înainte de 0', 'după 10', 'pe 4'], '≈1,41, deci între 1 și 2.', 4),
      () => flash('rationaliz', 'Raționalizarea unui numitor simplu…', ['scapi de radicalul de la numitor, înmulțind sus și jos', 'ștergi numitorul', 'faci procent', 'aduni 1'], 'Valoarea rămâne, scrierea se liniștește.', 5),
      () => flash('produs-rad', '√a × √b = …', ['√(a×b)', '√(a+b)', 'a×b', '√a + √b'], 'Radicalii se strâng sub același acoperiș la produs.', 6),
      () => flash('medii', 'Media geometrică a lui a și b e…', ['√(a×b)', '(a+b)/2', 'a−b', 'a/b'], 'Pentru 4 și 16: √64 = 8.', 7),
      () => flash('radical', '√(a²) pentru a > 0 e…', ['a', '2a', 'a²', '0'], 'Rădăcina desfăce pătratul.', 8)
    ],
    tests: [
      (rand, lv) => { const r = int(rand, 3, 12); return test('radical', `Calculează √${r * r}.`, r, [`${r} × ${r} = ${r * r}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [4, 9, 16, 25]); return test('radical', `Calculează √${a} + 1.`, Math.sqrt(a) + 1, [`√${a} = ${Math.sqrt(a)}`, `+ 1 = ${Math.sqrt(a) + 1}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [4, 9, 16, 25]); const b = pick(rand, [4, 9, 16]); return test('radical', `Calculează √${a} × √${b}.`, Math.sqrt(a) * Math.sqrt(b), [`√${a} = ${Math.sqrt(a)}`, `√${b} = ${Math.sqrt(b)}`, `Produs = ${Math.sqrt(a) * Math.sqrt(b)}`], { level: lv }); },
      (rand, lv) => { const k = pick(rand, [2, 3, 4]); const n = pick(rand, [9, 16, 25]); return test('radical', `Calculează ${k} × √${n}.`, k * Math.sqrt(n), [`√${n} = ${Math.sqrt(n)}`, `${k} × ${Math.sqrt(n)} = ${k * Math.sqrt(n)}`], { level: lv }); },
      (rand, lv) => { const row = pick(rand, [[6, 3, 2, 3], [8, 2, 4, 2], [12, 3, 4, 3], [18, 2, 9, 2]]); const [num, rad, coef, root] = row; return test('rationaliz', `Raționalizează ${num}/√${rad} și simplifică. Scrie de forma a√${root}.`, `${coef}√${root}`, [`${num}/√${rad} × √${rad}/√${rad}`, `${coef}√${root}`], { answers: [`${coef}√${root}`, `${coef}*sqrt(${root})`, `${coef}sqrt${root}`], numeric: false, level: lv }); },
      (rand, lv) => { const lo = int(rand, 2, 6); const hi = lo + int(rand, 2, 4); const from = lo * lo + 1; const to = hi * hi - 1; return test('ordin', `Câți naturali n există cu ${lo} < √n < ${hi}?`, to - from + 1, [`n de la ${from} până la ${to}`, `${to - from + 1} numere`], { level: lv }); },
      (rand, lv) => { const lo = int(rand, 2, 6); const hi = lo + int(rand, 2, 4); const from = lo * lo + 1; const to = hi * hi - 1; return test('ordin', `Pentru naturali n cu ${lo} < √n < ${hi}, cât fac cel mai mic și cel mai mare adunate?`, from + to, [`Cel mai mic n = ${from}`, `Cel mai mare n = ${to}`, `Suma = ${from + to}`], { level: lv }); },
      (rand, lv) => { const lo = int(rand, 2, 7); const hi = lo + int(rand, 2, 4); const from = lo * lo + 1; const to = hi * hi - 1; let even = 0; for (let n = from; n <= to; n += 1) if (n % 2 === 0) even += 1; return test('ordin', `Întâi găsești naturali n cu ${lo} < √n < ${hi}. Câți dintre ei sunt pari?`, even, [`Intervalul: de la ${from} la ${to}`, `Pari: ${even}`], { level: lv }); }
    ]
  },
  ecuati: {
    flashes: [
      () => flash('cantar', 'O ecuație e ca un cântar: …', ['ce faci într-o parte faci și în cealaltă', 'schimbi doar stânga', 'ștergi necunoscuta', 'înmulțești doar cu zero'], 'Egalitatea trebuie să rămână adevărată.', 1),
      () => flash('necunoscuta', 'x e…', ['numărul pe care îl căutăm', 'mereu 0', 'un unghi', 'un procent'], 'Îl afli astfel încât egalitatea să țină.', 2),
      () => flash('sistem', 'Un sistem e…', ['două (sau mai multe) ecuații cu aceleași necunoscute', 'o singură putere', 'un cerc', 'o medie'], 'Cauți perechea (x, y) care le satisface pe amândouă.', 3),
      () => flash('substituie', 'Metoda substituției…', ['afli o necunoscută dintr-una și o pui în cealaltă', 'aduni orbește', 'ștergi y', 'înmulțești cu zero'], 'Înlocuiești, nu ghicești.', 4),
      () => flash('reducere', 'Metoda reducerii…', ['aduni sau scazi ecuațiile ca să dispară o necunoscută', 'împarți la zero', 'faci procent', 'desenezi un cub'], 'Poți înmulți mai întâi ca termenii să se anuleze.', 5),
      () => flash('verificare', 'Soluția unui sistem se verifică…', ['în ambele ecuații', 'doar în prima', 'doar pe grafic', 'nu se verifică'], 'Dacă una minte, perechea nu e bună.', 6),
      () => flash('cantar', 'Dacă 2x = 10, x e…', ['5', '12', '8', '20'], 'Împarți ambele părți la 2.', 7),
      () => flash('cantar', 'x − 3 = 4 dă x = …', ['7', '1', '12', '−1'], 'Treci −3 în dreapta: 4+3=7.', 8)
    ],
    tests: [
      (rand, lv) => { const x = int(rand, 2, 12); const b = int(rand, 2, 9); return test('cantar', `Află x: x + ${b} = ${x + b}.`, x, [`x = ${x + b} − ${b} = ${x}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 8); const x = int(rand, 2, 9); return test('cantar', `Află x: ${a}x = ${a * x}.`, x, [`Împarți la ${a}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 6); const x = int(rand, 2, 9); const b = int(rand, 1, 12); return test('cantar', `Află x: ${a}x + ${b} = ${a * x + b}.`, x, [`Scazi ${b}: ${a}x = ${a * x}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 3, 10); const a = int(rand, 2, 5); let b = int(rand, 1, 6); if ((a * x - b) % 2) b += 1; return test('cantar', `Află x: (${a}x − ${b})/2 = ${(a * x - b) / 2}.`, x, [`Înmulțești cu 2`, `${a}x = ${a * x}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const y = int(rand, 2, 8); const x = y + 1; return test('sistem', `x − y = 1 și x + y = ${x + y}. Află y.`, y, [`Aduni: 2x = ${2 * x}`, `x = ${x}`, `y = ${y}`], { level: lv }); },
      (rand, lv) => { const y = int(rand, 2, 24); const x = y + 2; return test('substituie', `3x + 2y = ${3 * x + 2 * y}, x = y + 2. Cât e x?`, x, [`x = y + 2`, `3(y+2)+2y = ${3 * x + 2 * y}`, `y = ${y}, x = ${x}`], { level: lv }); },
      (rand, lv) => { const y = int(rand, 2, 6); const x = y + int(rand, 1, 3); return test('sistem', `x + y = ${x + y} și x − y = ${x - y}. Află x.`, x, [`Aduni ecuațiile: 2x = ${2 * x}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const gap = pick(rand, [2, 4, 6, 8, 10]); const y = int(rand, 6, 24); const x = y + gap; const sum = x + y; const val = 2 * x - y; return test('sistem', `Ana și Ion au împreună ${sum} lei. Ana are cu ${gap} lei mai mult decât Ion. Cu cât este dublul sumei Anei mai mare decât suma lui Ion?`, val, [`Ana = ${x}, Ion = ${y}`, `2×${x} − ${y} = ${val}`], { level: lv }); }
    ]
  },
  date: {
    flashes: [
      () => flash('origine', 'Originea e punctul…', ['(0, 0)', '(1, 1)', '(0, 1)', '(1, 0)'], 'Acolo se taie axele.', 1),
      (rand) => { const x = int(rand, 1, 5); const y = int(rand, 1, 6); return flash('origine', `Simetricul lui A(${x}, −${y}) față de origine e…`, [`(−${x}, ${y})`, `(${x}, ${y})`, `(−${x}, −${y})`, '(0, 0)'], 'Schimbi ambele semne.', 2); },
      () => flash('abscisa', 'Abscisa e…', ['coordonata x, prima', 'coordonata y', 'originea', 'un unghi'], 'A(2, 3): abscisa e 2.', 3),
      () => flash('ordonata', 'Ordonata e…', ['coordonata y, a doua', 'doar x', 'perimetrul', 'un prim'], 'A(2, 3): ordonata e 3.', 4),
      () => flash('depend', 'y = x + 1 e o dependență: …', ['fiecărui x îi corespunde un y', 'x e mereu 0', 'e un cub', 'e un procent'], 'Tabel: x=0 → y=1; x=2 → y=3.', 5),
      () => flash('grafic', 'Punctele unei dependențe liniare…', ['stau pe o dreaptă', 'formează un cerc', 'sunt un cub', 'nu se pot desena'], 'Unești punctele din tabel.', 6),
      () => flash('tabel', 'Un tabel de date…', ['leagă valori, nu e o listă oarecare', 'e un unghi', 'e o poezie', 'e un prim'], 'Cauți regula dintre coloane.', 7),
      () => flash('simetric-x', 'Simetricul față de axa Ox schimbă…', ['semnul lui y', 'semnul lui x', 'ambele', 'nimic'], 'A(2, 3) → (2, −3).', 8)
    ],
    tests: [
      (rand, lv) => { const x = int(rand, 1, 8); const y = int(rand, 1, 8); return test('origine', `La punctul A(${x}, ${y}), care e abscisa (x)?`, x, [`Prima coordonată e ${x}`], { level: lv }); },
      (rand, lv) => test('pereche', 'Scrie originea ca (x, y).', '(0, 0)', ['Axa x taie axa y în 0'], { answers: ['(0, 0)', '(0,0)', '0,0'], numeric: false, level: lv }),
      (rand, lv) => { const a = int(rand, 1, 5); const b = int(rand, 1, 8); const x = int(rand, 2, 6); return test('depend', `y = ${a}x + ${b}. Cât e y pentru x = ${x}?`, a * x + b, [`${a} × ${x} = ${a * x}`, `${a * x} + ${b} = ${a * x + b}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 1, 6); const y = int(rand, 1, 6); return test('origine', `Simetricul lui A(${x}, −${y}) față de origine. Scrie (x, y).`, `(-${x}, ${y})`, ['Schimbi ambele semne'], { answers: [`(-${x}, ${y})`, `(-${x},${y})`], numeric: false, level: lv }); },
      (rand, lv) => { const x1 = int(rand, 1, 4); const y1 = int(rand, 1, 5); const x2 = x1 + int(rand, 1, 3); const y2 = y1 + int(rand, 1, 3); return test('depend', `Din ( ${x1}, ${y1} ) la ( ${x2}, ${y2} ), cu cât crește y când x crește cu ${x2 - x1}?`, y2 - y1, [`Δx = ${x2 - x1}`, `Δy = ${y2 - y1}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 5); const b = int(rand, 1, 6); const x = int(rand, 2, 7); const y = a * x + b; return test('depend', `y = ${a}x + ${b}. Pentru ce x avem y = ${y}?`, x, [`${a}x = ${y} − ${b} = ${y - b}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 6); const y = int(rand, 2, 8); return test('origine', `A(${x}, ${y}). Simetric față de axa Ox. Ordonata noului punct?`, -y, ['Ox păstrează x, schimbă semnul lui y', `y → ${-y}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 6); const b = int(rand, 1, 9); const x = int(rand, 1, 8); const y = a * x + b; return test('depend', `Dreapta y = ${a}x + ${b}. Punctul cu abscisa ${x} stă pe dreaptă. Simetricul lui față de axa Ox are ordonata…?`, -y, [`Ordonata pe dreaptă: ${a}×${x} + ${b} = ${y}`, `Față de Ox, semnul lui y se schimbă: ${-y}`], { level: lv }); }
    ]
  },
  geo7: {
    flashes: [
      () => flash('paralelogram', 'Aria unui paralelogram e…', ['bază × înălțime', 'suma laturilor', 'doar baza', 'doar un unghi'], 'Ca un dreptunghi „împins”.', 1),
      () => flash('romb', 'Un romb are…', ['toate laturile egale', 'un singur unghi drept obligatoriu', 'laturi diferite', 'doar un cerc'], 'Ca un pătrat lățit; diagonalele sunt perpendiculare.', 2),
      () => flash('trapez', 'Un trapez are…', ['exact o pereche de laturi paralele', 'toate laturile paralele', 'niciun unghi', 'doar un cerc'], 'Baza mare și baza mică sunt paralele.', 3),
      () => flash('cerc-pi', 'Lungimea cercului e…', ['2πr sau πd', 'πr²', '4r', 'r²'], 'Gardul din jurul discului.', 4),
      () => flash('disc', 'Aria discului e…', ['πr²', '2πr', 'πd', '4r'], 'Câte pătrățele umplu rontul.', 5),
      () => flash('thales', 'Thales (la gimnaziu) spune, pe scurt…', ['o paralelă taie laturile proporțional', 'toate unghiurile sunt 90°', 'volumul cubului', 'o medie'], 'Aceeași formă, altă scară pe segmente.', 6),
      () => flash('asemanare', 'La triunghiuri asemenea, raportul ariilor e…', ['pătratul raportului laturilor', 'același cu raportul laturilor', 'suma laturilor', 'un unghi'], 'Ariile cresc cu pătratul scării.', 7),
      () => flash('trig', 'În triunghiul dreptunghic, sin α e…', ['cateta opusă / ipotenuză', 'cateta alăturată / ipotenuză', 'opusă / alăturată', 'perimetrul'], 'SOH: sinus = opposite / hypotenuse.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 3, 9); return test('paralelogram', `Pătrat de latură ${a} cm. Aria, cm²?`, a * a, [`${a}² = ${a * a}`], { level: lv }); },
      (rand, lv) => { const L = int(rand, 6, 12); const l = int(rand, 4, 10); return test('paralelogram', `Dreptunghi ${L}×${l}. Aria, cm².`, L * l, [`${L} × ${l} = ${L * l}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 6, 14); const h = int(rand, 4, 10); return test('paralelogram', `Paralelogram baza ${b} cm, înălțimea ${h} cm. Aria.`, b * h, [`${b} × ${h} = ${b * h}`], { level: lv }); },
      (rand, lv) => { const r = pick(rand, [7, 14]); const val = (44 * r) / 7; return test('cerc', `Cerc raza ${r}, π=22/7. Lungimea cercului.`, val, [`L = 2πr = 2×(22/7)×${r} = ${val}`], { level: lv }); },
      (rand, lv) => { const k = pick(rand, [2, 3, 4]); return test('asemanare', `Raportul laturilor e 1:${k}. Raportul ariilor? Scrie pătratul (un număr).`, k * k, [`Ariile = pătratul scării`, `${k}² = ${k * k}`], { level: lv }); },
      (rand, lv) => { const B = int(rand, 8, 14); const b = int(rand, 4, 7); let h = int(rand, 4, 8); if (((B + b) * h) % 2) h += 1; const val = ((B + b) * h) / 2; return test('trapez', `Trapez baze ${B} și ${b}, înălțime ${h}. Aria.`, val, [`(${B}+${b})×${h} : 2 = ${val}`], { level: lv }); },
      (rand, lv) => { const ip = pick(rand, [10, 13, 15]); const op = pick(rand, [6, 8, 9]); const g = gcd(op, ip); const num = op / g; const den = ip / g; return test('trig', `Triunghi dreptunghic, ipotenuză ${ip}, catetă opusă ${op}. sin α = opusă/ipotenuză. Scrie fracția simplificată.`, `${num}/${den}`, [`sin = ${op}/${ip}`, g > 1 ? `Simplifici cu ${g}: ${num}/${den}` : `Deja ireductibilă: ${num}/${den}`], { answers: [`${num}/${den}`], numeric: false, level: lv }); },
      (rand, lv) => { const row = pick(rand, [[8, 4, 6, 6], [10, 2, 6, 6], [8, 8, 8, 8], [6, 6, 6, 6], [12, 6, 4, 6], [14, 4, 4, 6], [9, 3, 6, 6], [7, 5, 6, 6], [10, 6, 8, 8], [12, 4, 8, 8], [14, 2, 8, 8], [9, 7, 8, 8], [11, 5, 8, 8], [20, 12, 4, 8], [18, 14, 4, 8], [4, 2, 12, 6], [8, 8, 2, 4], [12, 4, 2, 4], [10, 6, 2, 4], [18, 6, 3, 6], [8, 8, 18, 12], [10, 6, 18, 12]]); const [B, b, h, side] = row; const area = ((B + b) * h) / 2; return test('trapez', `Trapez cu bazele ${B} și ${b}, înălțimea ${h}. Un pătrat are aceeași arie. Cât e latura pătratului?`, side, [`Aria trapezului = (${B}+${b})×${h} : 2 = ${area}`, `Latura pătratului = ${side}`], { level: lv }); }
    ]
  },
  intervale: {
    flashes: [
      () => flash('interval', 'Un interval e…', ['o bucată de axă', 'un unghi', 'un cub', 'un procent'], 'De la un capăt la altul, cu sau fără capete.', 1),
      (rand) => { const a = int(rand, 1, 4); const b = a + int(rand, 2, 5); return flash('interval', `Intervalul (${a}, ${b}] conține…`, [`${a + 1} … ${b}, dar nu pe ${a}`, `${a} … ${b}`, `doar ${a}`, `doar ${b}`], 'Rotunda taie capătul; dreapta îl ține.', 2); },
      () => flash('inecuatie', 'O inecuație întreabă…', ['pentru ce x rămâne adevărat', 'care e singurul x', 'cât e perimetrul', 'dacă e prim'], 'Răspunsul e o mulțime, adesea un interval.', 3),
      () => flash('deschis', '(2, 5) e deschis: …', ['nu conține pe 2 și nici pe 5', 'conține 2 și 5', 'conține doar 2', 'e un punct'], 'Paranteze rotunde = fără capete.', 4),
      () => flash('inchis', '[2, 5] e închis: …', ['ține și 2, și 5', 'taie ambele capete', 'e vid', 'e un cerc'], 'Paranteze drepte = cu capete.', 5),
      () => flash('reuniune-int', '[1, 2] ∪ (2, 3] e…', ['[1, 3] fără să lipsească 2? stai: 2 e în prima, deci [1, 3]', 'vid', 'doar {2}', 'un unghi'], '2 e deja în [1, 2], deci se lipește.', 6),
      () => flash('semn', 'x > 3 pe axă e…', ['tot ce e la dreapta lui 3, fără 3', 'doar 3', 'totul la stânga', 'doar naturale'], 'Săgeată deschisă la 3.', 7),
      () => flash('si', 'x ≥ 0 și x < 4 e…', ['[0, 4)', '(0, 4]', 'doar 0', 'toată axa'], 'Intersecție de condiții.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 1, 3); const b = a + int(rand, 3, 6); return test('interval', `Câte întregi sunt în [${a}, ${b}]?`, b - a + 1, [`De la ${a} la ${b} inclusiv: ${b - a + 1}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, -4, 1); const b = int(rand, 3, 8); return test('interval', `Câte întregi sunt în (${a}, ${b}]?`, b - a, [`${a} nu e inclus, ${b} da`, `De la ${a + 1} la ${b}: ${b - a}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 2, 6); return test('inecuatie', `Cea mai mică valoare întreagă a lui x dacă x > ${b}?`, b + 1, [`x întreg, strict mai mare decât ${b}: ${b + 1}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 0, 3); const b = a + int(rand, 4, 8); return test('interval', `Câte întregi în [${a}, ${b})?`, b - a, [`${b} nu e inclus`, `De la ${a} la ${b - 1}: ${b - a}`], { level: lv }); },
      (rand, lv) => { const k = int(rand, 2, 6); return test('inecuatie', `Rezolvă −2x ≤ ${2 * k}. Cel mai mic întreg x.`, -k, [`Împarți la −2 și schimbi sensul`, `x ≥ ${-k}`, `Cel mai mic întreg: ${-k}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 0, 6); const b = a + int(rand, 5, 12); return test('inecuatie', `Câți întregi x îndeplinesc și x ≥ ${a}, și x < ${b}?`, b - a, [`De la ${a} până la ${b - 1}`, `${b - a} întregi`], { level: lv }); },
      (rand, lv) => { const a = int(rand, -3, 0); const b = int(rand, 4, 7); return test('interval', `Câte întregi sunt în [${a}, ${b}) ∪ {${b}}?`, b - a + 1, [`[${a}, ${b}) plus capătul ${b} = [${a}, ${b}]`, `${b - a + 1} întregi`], { level: lv }); },
      (rand, lv) => { const left = int(rand, -4, 1); const right = int(rand, 8, 14); const low = int(rand, 0, 4); const high = int(rand, 7, 12); const from = Math.max(left, low); const to = Math.min(right, high); let val = 0; for (let n = from; n <= to; n += 1) if (n % 2 === 0) val += 1; return test('interval', `Câți întregi pari sunt în [${left}, ${right}] ∩ [${low}, ${high}]?`, val, [`Intersecția: [${from}, ${to}]`, `Pari: ${val}`], { level: lv }); }
    ]
  },
  algebric: {
    flashes: [
      () => flash('asemenea', 'Termeni asemenea au…', ['aceeași parte cu litere', 'doar același număr', 'un unghi', 'un volum'], '3x și −5x se strâng; 3x și 3y nu.', 1),
      () => flash('binom', '(a+b)² se deschide…', ['a² + 2ab + b²', 'a² + b²', 'a² − b²', '(a+b)(a−b)'], 'Pătratul sumei: două pătrate și dublul produsului.', 2),
      () => flash('diferenta', 'a² − b² se descompune…', ['(a−b)(a+b)', '(a−b)²', 'a − b', '(a+b)²'], 'Diferență de pătrate.', 3),
      () => flash('factor', 'Scoaterea factorului comun…', ['tragi în față ce e în toți termenii', 'aduni coeficienții orbește', 'ștergi x', 'faci procent'], '2x + 6 = 2(x+3).', 4),
      () => flash('fractie-lit', 'O fracție algebrică se simplifică dacă…', ['numărătorul și numitorul au un factor comun', 'aduni 1', 'ștergi numitorul', 'faci radical'], 'Ca la fracțiile obișnuite, dar cu litere.', 5),
      () => flash('grad2', 'O ecuație de tip x² = 9 are soluții…', ['3 și −3', 'doar 3', 'doar 0', '9'], 'Două numere, înmulțite cu ele, dau 9.', 6),
      () => flash('zero', 'Un produs e 0 dacă…', ['cel puțin un factor e 0', 'toți sunt 1', 'e un unghi', 'e un procent'], 'Asta deschide ecuații prin factori.', 7),
      () => flash('minus-binom', '(a−b)² e…', ['a² − 2ab + b²', 'a² − b²', 'a² + 2ab + b²', '(a−b)(a+b)'], 'Atenție la mijloc: minus dublul produsului.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 2, 8); const b = int(rand, 2, 8); return test('asemenea', `Calculează ${a}x + ${b}x pentru x=1. (Doar coeficientul sumei, sau valoarea: ${a + b}.)`, a + b, [`${a}x + ${b}x = ${a + b}x`, `Pentru x=1: ${a + b}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 6); return test('diferenta', `Calculează (x+3)(x−3) pentru x=${x}.`, (x + 3) * (x - 3), ['E x² − 9', `${x}² − 9 = ${x * x - 9}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 6); return test('binom', `Calculează (x+3)² pentru x=${x}.`, x * x + 6 * x + 9, ['x² + 6x + 9', `${x * x} + ${6 * x} + 9 = ${x * x + 6 * x + 9}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 3, 8); return test('factor', `Calculează 2(x+4) pentru x=${x}.`, 2 * (x + 4), [`x+4 = ${x + 4}`, `×2 = ${2 * (x + 4)}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 4, 9); return test('binom', `Calculează (x−2)² pentru x=${x}.`, (x - 2) * (x - 2), ['x² − 4x + 4', `${(x - 2) ** 2}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 5, 30); return test('asemenea', `Simplifică (x² − 16)/(x − 4) pentru x=${x} (x≠4).`, x + 4, [`x² − 16 = (x−4)(x+4)`, `Rămâne x+4 = ${x + 4}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 6); const k = int(rand, 2, 4); const val = (x + k) ** 2 - (x - k) ** 2; return test('diferenta', `Calculează (x+${k})² − (x−${k})² pentru x=${x}.`, val, [`Diferență de pătrate: (2×${k})×(2x) = ${4 * k}x`, `${4 * k}×${x} = ${val}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 8); const k = int(rand, 2, 5); const diff = 4 * k * x; const prod = x * x - k * k; const val = diff + prod; return test('diferenta', `Calculează (x+${k})² − (x−${k})² + (x−${k})(x+${k}) pentru x=${x}.`, val, [`(x+${k})² − (x−${k})² = ${4 * k}x = ${diff}`, `(x−${k})(x+${k}) = x² − ${k * k} = ${prod}`, `Suma = ${val}`], { level: lv }); }
    ]
  },
  functii: {
    flashes: [
      () => flash('dreapta', 'f(x)=ax+b e…', ['o dreaptă', 'un cerc', 'un cub', 'un procent'], 'Funcție de gradul I: graficul e o dreaptă.', 1),
      () => flash('f', 'f(2) înseamnă…', ['valoarea funcției când x=2', 'f ori 2', 'un unghi', 'un prim'], 'Înlocuiești x cu 2.', 2),
      () => flash('a', 'În f(x)=ax+b, a spune…', ['cât de înclinată e dreapta (pantă)', 'unde taie Oy obligatoriu doar', 'volumul', 'un procent'], 'a>0 urcă; a<0 coboară.', 3),
      () => flash('b', 'b e…', ['unde dreapta taie axa Oy', 'pantă', 'un cub', 'un prim'], 'f(0)=b.', 4),
      () => flash('medie', 'Media unui set de date e…', ['suma împărțită la câți sunt', 'cel mai mare', 'cel mai mic', 'un unghi'], 'Un rezumat, nu fiecare valoare.', 5),
      () => flash('mediana', 'Mediana e…', ['valoarea din mijloc, după ce sortezi', 'media', 'produsul', 'un prim'], 'Împarte șirul în două jumătăți egale ca număr.', 6),
      () => flash('modul-stat', 'Modulul (moda) e…', ['valoarea care apare cel mai des', 'media', 'un unghi', 'un cub'], 'Cea mai „populară” notă.', 7),
      () => flash('amplitudine', 'Amplitudinea e…', ['max − min', 'media', 'suma', 'un prim'], 'Cât de „întins” e setul.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 1, 5); const b = int(rand, 0, 8); const x = int(rand, 1, 6); return test('dreapta', `f(x)=${a}x + ${b}. Calculează f(${x}).`, a * x + b, [`${a} × ${x} = ${a * x}`, `+ ${b} = ${a * x + b}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, -4, 4) || 2; const b = int(rand, -6, 8); const x = int(rand, -3, 5); const y = a * x + b; const sign = b >= 0 ? `+ ${b}` : `− ${-b}`; return test('dreapta', `f(x)=${a}x ${sign}. Calculează f(${x}).`, y, [`${a} × ${x} = ${a * x}`, `${a * x} ${sign} = ${y}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 1, 9); return test('b', `f(x)=3x + ${b}. Cât e f(0)?`, b, ['f(0)=b', `${b}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 6, 9); const b = int(rand, 6, 9); const m = int(rand, 6, 9); let c = 3 * m - a - b; if (c < 5 || c > 10) { return test('medie', 'Media notelor 8, 8, 8.', 8, ['Suma = 24', ': 3 = 8'], { level: lv }); } return test('medie', `Media notelor ${a}, ${b}, ${c}.`, m, [`Suma = ${a + b + c}`, `: 3 = ${m}`], { level: lv }); },
      (rand, lv) => { const raw = [int(rand, 1, 5), int(rand, 6, 9), int(rand, 10, 14), int(rand, 3, 8), int(rand, 15, 20)]; const sorted = raw.slice().sort((x, y) => x - y); const med = sorted[2]; return test('mediana', `Mediana setului ${raw.join(', ')} după ordonare.`, med, [`Ordine: ${sorted.join(', ')}`, `Mijlocul e ${med}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 12); const b = int(rand, 2, 12); let c = int(rand, 2, 12); const fix = (3 - ((a + b + c) % 3)) % 3; c += fix; const mean = (a + b + c) / 3; return test('medie', `Media numerelor ${a}, ${b} și ${c}.`, mean, [`Suma = ${a + b + c}`, `Împarți la 3 → ${mean}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 6); const b = int(rand, 1, 8); const f2 = 2 * a + b; const f3 = 3 * a + b; const val = f2 + f3 - b; return test('dreapta', `f(x) = ${a}x + ${b}. Calculează f(2) + f(3) − f(0).`, val, [`f(2) = ${f2}`, `f(3) = ${f3}`, `f(0) = ${b}`, `${f2} + ${f3} − ${b} = ${val}`], { level: lv }); },
      (rand, lv) => { const low = int(rand, 1, 6); const mid = low + int(rand, 0, 3); let high = mid + int(rand, 6, 16); const fix = (3 - ((low + mid + high) % 3)) % 3; high += fix; const mean = (low + mid + high) / 3; const shown = [high, low, mid]; return test('medie', `Pentru ${shown.join(', ')}: calculează media și mediana, apoi spune cu cât este media mai mare decât mediana.`, mean - mid, [`Ordine: ${low}, ${mid}, ${high}`, `Media = ${mean}`, `Mediana = ${mid}`, `${mean} − ${mid} = ${mean - mid}`], { level: lv }); }
    ]
  },
  spatiu: {
    flashes: [
      () => flash('prisma', 'Volumul cubului de latură a e…', ['a × a × a', '6a', '4a', 'a + a + a'], 'Câte cubulețe umplu cutia.', 1),
      () => flash('desfasurare', 'Aria totală a cubului de latură a e…', ['6a²', 'a³', '4a', '2a'], 'Șase fețe pătrate.', 2),
      () => flash('prisma-v', 'Volumul prismei e…', ['aria bazei × înălțimea', 'suma muchiilor', '6a', 'un unghi'], 'Câte „felii” de baza stivuite.', 3),
      () => flash('piramida', 'Volumul piramidei e…', ['(aria bazei × înălțimea) : 3', 'bază × înălțime', '6a²', 'perimetrul'], 'Cam o treime din prismă cu aceeași bază și înălțime.', 4),
      () => flash('cilindru', 'Volumul cilindrului e…', ['πr²h', '2πr', 'πr²', '4πr²'], 'Disc × înălțime.', 5),
      () => flash('con', 'Volumul conului e…', ['(πr²h) : 3', 'πr²h', '2πr', '4πr²'], 'O treime din cilindru.', 6),
      () => flash('sfera', 'Volumul sferei e…', ['(4/3)πr³', '4πr²', 'πr²', '2πr'], 'Umplutura mingii, nu coaja.', 7),
      () => flash('paralel', 'O dreaptă paralelă cu un plan…', ['nu-l înțeapă, rămâne la distanță constantă', 'trece mereu prin centru', 'e o rază', 'e un unghi'], 'Ca un creion ținut deasupra mesei.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 3, 8); return test('desfasurare', `Cub de latură ${a}. Volumul.`, a ** 3, [`${a}³ = ${a ** 3}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 3, 8); return test('desfasurare', `Cub de latură ${a}. Aria totală.`, 6 * a * a, [`6 × ${a}² = ${6 * a * a}`], { level: lv }); },
      (rand, lv) => { const L = int(rand, 4, 8); const l = int(rand, 3, 6); const h = int(rand, 3, 7); return test('prisma', `Cutie ${L}×${l}×${h}. Volumul.`, L * l * h, [`${L}×${l}×${h} = ${L * l * h}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 4, 10); const h = (b % 3 === 0) ? int(rand, 4, 10) : pick(rand, [3, 6, 9, 12]); return test('piramida', `Piramidă cu baza pătrat ${b}×${b}, înălțime ${h}. Volumul.`, (b * b * h) / 3, [`Ab = ${b * b}`, `V = (${b * b}×${h})/3 = ${(b * b * h) / 3}`], { level: lv }); },
      (rand, lv) => { const r = pick(rand, [7, 14]); const h = int(rand, 2, 6); const val = (22 * r * r * h) / 7; return test('cilindru', `Cilindru r=${r}, h=${h}, π=22/7. Volumul.`, val, [`πr²h = (22/7)×${r}²×${h} = ${val}`], { level: lv }); },
      (rand, lv) => { const L = int(rand, 4, 9); const l = int(rand, 3, 8); const h = int(rand, 3, 8); const delta = L * l * 2; return test('prisma', `O cutie ${L}×${l}×${h} crește la înălțime cu 2 cm. Cu cât crește volumul?`, delta, [`Baza = ${L * l}`, `Creșterea = ${L * l} × 2 = ${delta}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 4, 8); const cut = int(rand, 1, 3); return test('desfasurare', `Cub de latură ${a}. Tai dintr-un colț un cubuleț de latură ${cut}. Volumul rămas.`, a ** 3 - cut ** 3, [`Cubul mare: ${a}³ = ${a ** 3}`, `Cubulețul: ${cut}³ = ${cut ** 3}`, `Rămân ${a ** 3 - cut ** 3}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 3, 15); const lat = 4 * a * a; const vol = a ** 3; return test('desfasurare', `Cub de latură ${a} cm. Aria laterală (4 fețe) plus volumul. Un singur număr.`, lat + vol, [`Aria laterală = 4×${a}² = ${lat}`, `Volumul = ${a}³ = ${vol}`, `Suma = ${lat + vol}`], { level: lv }); }
    ]
  }
};

const CHAPTER_ALIAS = {
  'algebra-en': 'algebric',
  'functii-en': 'functii',
  'geo-plana': 'geo7',
  'geo-spatiu': 'spatiu',
  numere: 'intervale',
  proba: 'naturale',
  date: 'date'
};

function generateMath(chapterId, kind, rand, level) {
  const pack = BY_CHAPTER[chapterId] || BY_CHAPTER[CHAPTER_ALIAS[chapterId]];
  if (!pack) return null;
  const lv = Math.max(1, Number(level) || 1);
  if (kind === 'test') {
    const n = pack.tests.length;
    const idx = Math.min(n - 1, lv - 1);
    return pack.tests[idx](rand, idx + 1);
  }
  const fn = rung(lv, pack.flashes);
  return fn(rand);
}

module.exports = { generateMath, BY_CHAPTER };
