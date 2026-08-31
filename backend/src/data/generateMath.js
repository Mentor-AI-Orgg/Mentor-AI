const { int, pick, uniqueOptions, gcd, lcm } = require('./itemRng');

function flash(point, question, options, explain, level) {
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
  const i = ((Math.max(1, Number(level) || 1) - 1) % n + n) % n;
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
      (rand) => flash('paranteze', 'În 3 + 4 × 2, întâi…', ['înmulțești 4 × 2', 'aduni 3 + 4', 'faci 3 × 2', 'scazi 4'], 'Înmulțirea bate adunarea, dacă nu sunt paranteze.', 6),
      (rand) => flash('cmmdc', 'c.m.m.d.c. a două numere e…', ['cel mai mare număr care le împarte pe amândouă', 'cel mai mic multiplu comun', 'suma lor', 'produsul lor'], 'Cel mai mare „prieten” la împărțire.', 7),
      (rand) => flash('cmmmc', 'c.m.m.m.c. e…', ['cel mai mic număr care se împarte la amândouă', 'cel mai mare divizor', 'diferența lor', 'un număr prim'], 'Prima stație comună pe axa multiplilor.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 2, 9); const b = int(rand, 2, 9); return test('adunare', `Calculează ${a} + ${b}. Doar rezultatul.`, a + b, [`${a} + ${b} = ${a + b}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 8); return test('puteri', `Calculează ${a}².`, a * a, [`${a} × ${a} = ${a * a}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 6); const b = int(rand, 2, 5); const c = int(rand, 1, 8); const val = a ** 2 * b + c; return test('paranteze', `Calculează ${a}² × ${b} + ${c}.`, val, [`${a}² = ${a * a}`, `${a * a} × ${b} = ${a * a * b}`, `+ ${c} = ${val}`], { level: lv }); },
      (rand, lv) => { const n = int(rand, 12, 40) * 3; const sum = String(n).split('').reduce((acc, d) => acc + Number(d), 0); return test('div3', `Suma cifrelor numărului ${n}. Doar suma.`, sum, [`Cifrele lui ${n}`, `Suma = ${sum}`], { level: lv }); },
      (rand, lv) => { const g = int(rand, 2, 6); const a = g * int(rand, 2, 7); const b = g * int(rand, 2, 7); return test('cmmdc', `Cel mai mare divizor comun al numerelor ${a} și ${b}.`, gcd(a, b), [`c.m.m.d.c.(${a}, ${b}) = ${gcd(a, b)}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [4, 6, 8, 9, 10]); const b = pick(rand, [6, 8, 12, 15]); return test('cmmmc', `Cel mai mic multiplu comun al numerelor ${a} și ${b}.`, lcm(a, b), [`c.m.m.m.c.(${a}, ${b}) = ${lcm(a, b)}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 5); const b = int(rand, 2, 4); const c = int(rand, 2, 6); const val = a ** 2 * b - c ** 2; return test('paranteze', `Calculează ${a}² × ${b} − ${c}². Doar rezultatul.`, val, [`${a}² = ${a * a}`, `${a * a} × ${b} = ${a * a * b}`, `${c}² = ${c * c}`, `${a * a * b} − ${c * c} = ${val}`], { level: lv }); }
    ]
  },
  fractii: {
    flashes: [
      (rand) => flash('parte', 'O fracție arată…', ['câte părți egale luăm dintr-un întreg', 'doar un număr mic', 'o temperatură', 'un unghi'], 'Numitorul taie; numărătorul spune câte felii.', 1),
      (rand) => { const k = int(rand, 2, 7); return flash('amplif', `Amplifici 1/${k} cu 2. Ce obții?`, [`2/${k * 2}`, `1/${k * 2}`, `${k}/2`, `2/${k}`], `Înmulțești sus și jos cu 2: 2/${k * 2}.`, 2); },
      (rand) => { const k = int(rand, 2, 5); return flash('simplif', `Fracția ${2 * k}/${4 * k} se simplifică la…`, ['1/2', '2/4', `${k}/${2 * k}`, '1/4'], `Împarți sus și jos cu ${2 * k}.`, 3); },
      (rand) => { const p = pick(rand, [10, 20, 25, 50]); return flash('procent', `${p}% înseamnă…`, [`${p}/100`, `${p}/10`, `${100 - p}/100`, `${p * 2}/100`], 'Procentul e o sutime.', 4); },
      (rand) => flash('numitor', 'Ca să aduni 1/3 cu 1/6 trebuie…', ['același numitor', 'același numărător', 'să le înmulțești', 'să le faci zecimale obligatoriu'], 'Părțile trebuie să fie de aceeași mărime.', 5),
      (rand) => flash('zecimal', '0,5 e aceeași idee cu…', ['1/2', '5/1', '1/5', '2/5'], 'Virgula e altă scriere a fracției.', 6),
      (rand) => flash('media', 'Media a două note e…', ['suma împărțită la 2', 'produsul lor', 'nota cea mare', 'diferența'], 'Aduni, apoi împarți la câți termeni ai.', 7),
      (rand) => flash('parte-din', '1/4 din 20 e…', ['5', '4', '16', '24'], 'Împarți 20 la 4.', 8)
    ],
    tests: [
      (rand, lv) => { const n = pick(rand, [8, 10, 12, 16, 20]); return test('parte', `Cât este 1/2 din ${n}?`, n / 2, [`${n} : 2 = ${n / 2}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 5, 9); const y = int(rand, 5, 9); const z = int(rand, 5, 9); const val = (x + y + z) / 3; return test('media', `Media aritmetică a notelor ${x}, ${y}, ${z}.`, val, [`Suma = ${x + y + z}`, `Împarți la 3 → ${val}`], { tol: 0.05, answers: [String(val), String(val).replace('.', ',')], level: lv }); },
      (rand, lv) => { const d = pick(rand, [6, 8, 12]); const a = 1; const b = d / 2; const g = gcd(a + b, d); const num = (a + b) / g; const den = d / g; return test('numitor', `Calculează ${a}/${d} + ${b}/${d}. Fracție ireductibilă sau întreg.`, den === 1 ? num : `${num}/${den}`, [`Același numitor ${d}`, `${a}+${b}=${a + b}`], { answers: den === 1 ? [String(num)] : [`${num}/${den}`], numeric: den === 1, level: lv }); },
      (rand, lv) => { const pret = pick(rand, [40, 50, 80, 100]); const p = pick(rand, [10, 20, 25]); const cut = (pret * p) / 100; return test('procent', `Un obiect costă ${pret} lei. Reducere ${p}%. Cât plătești?`, pret - cut, [`${p}% din ${pret} = ${cut}`, `${pret} − ${cut} = ${pret - cut}`], { level: lv }); },
      (rand, lv) => { const n = pick(rand, [12, 18, 24, 30, 36]); const k = pick(rand, [3, 4, 6]); return test('parte', `Cât este 1/${k} din ${n}?`, n / k, [`${n} : ${k} = ${n / k}`], { level: lv }); },
      (rand, lv) => { const pret = pick(rand, [80, 100, 120]); const p = pick(rand, [10, 15, 20]); const cut = (pret * p) / 100; const extra = pick(rand, [5, 8, 10]); return test('procent', `Preț ${pret} lei, reducere ${p}%, apoi mai scazi ${extra} lei. Cât rămâne?`, pret - cut - extra, [`${p}% = ${cut}`, `${pret} − ${cut} = ${pret - cut}`, `${pret - cut} − ${extra} = ${pret - cut - extra}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [2, 3, 4]); const b = pick(rand, [3, 4, 6]); const d = lcm(a, b); const n1 = d / a; const n2 = d / b; const g = gcd(n1 + n2, d); return test('numitor', `Calculează 1/${a} + 1/${b}. Fracție ireductibilă.`, `${(n1 + n2) / g}/${d / g}`, [`Numitor comun ${d}`, `1/${a}=${n1}/${d}, 1/${b}=${n2}/${d}`, `Suma = ${(n1 + n2) / g}/${d / g}`], { answers: [`${(n1 + n2) / g}/${d / g}`], numeric: false, level: lv }); }
    ]
  },
  geometrie: {
    flashes: [
      (rand) => flash('unghi', 'Un unghi drept măsoară…', ['90 de grade', '45 de grade', '180 de grade', '360 de grade'], 'Colțul pătratului.', 1),
      (rand) => flash('ascutit', 'Un unghi ascuțit e…', ['mai mic decât 90°', 'exact 90°', 'mai mare decât 90°', 'doar 0°'], 'Ascuțit = îngust, sub un drept.', 2),
      (rand) => { const a = int(rand, 3, 9); return flash('arie-patrat', `Aria pătratului de latură ${a} cm e…`, uniqueOptions(rand, `${a * a} cm²`, [`${4 * a} cm²`, `${2 * a} cm²`, `${a + a} cm²`]), `latura × latura = ${a * a}.`, 3); },
      (rand) => { const L = int(rand, 4, 12); const l = int(rand, 3, 8); const p = 2 * (L + l); return flash('perimetru', `Perimetrul unui dreptunghi ${L} cm × ${l} cm e…`, uniqueOptions(rand, `${p} cm`, [`${L * l} cm`, `${L + l} cm`, `${2 * L} cm`]), `2 × (${L}+${l}) = ${p}.`, 4); },
      (rand) => { const L = int(rand, 5, 10); const l = int(rand, 3, 7); return flash('arie-drep', `Aria dreptunghiului ${L}×${l} e…`, uniqueOptions(rand, L * l, [2 * (L + l), L + l, L * 2]), `lungime × lățime = ${L * l}.`, 5); },
      (rand) => flash('volum-cub', 'Volumul cubului e…', ['latură × latură × latură', '4 × latură', 'suma muchiilor', 'doar o față'], 'Câte cubulețe umplu cutia.', 6),
      (rand) => flash('unitati', 'Când treci de la metri la centimetri…', ['înmulțești cu 100', 'împarți cu 100', 'aduni 100', 'nu schimbi nimic'], '1 m = 100 cm.', 7),
      (rand) => flash('alungit', 'Un unghi alungit măsoară…', ['180°', '90°', '360°', '45°'], 'O linie dreaptă, văzută ca unghi.', 8)
    ],
    tests: [
      (rand, lv) => test('unghi', 'Câte grade are un unghi drept?', 90, ['Unghi drept = 90°'], { level: lv }),
      (rand, lv) => { const a = int(rand, 3, 9); return test('perimetru', `Pătrat de latură ${a} cm. Perimetrul, în cm.`, 4 * a, [`4 × ${a} = ${4 * a}`], { level: lv }); },
      (rand, lv) => { const L = int(rand, 6, 15); const l = int(rand, 3, 9); return test('perimetru', `Dreptunghi ${L} cm × ${l} cm. Perimetrul, în cm.`, 2 * (L + l), [`2 × (${L} + ${l}) = ${2 * (L + l)}`], { level: lv }); },
      (rand, lv) => { const L = int(rand, 6, 14); const l = int(rand, 4, 9); return test('arie-drep', `Aria unui dreptunghi ${L} cm × ${l} cm, în cm².`, L * l, [`${L} × ${l} = ${L * l}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 20, 70); return test('unghi', `Un unghi de ${a}° și unul alăturat fac 180°. Cât e alăturatul?`, 180 - a, [`180 − ${a} = ${180 - a}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 6, 14); const h = int(rand, 4, 10); const val = (b * h) / 2; return test('arie-tri', `Triunghi baza ${b} cm, înălțimea ${h} cm. Aria, cm².`, val, [`(${b} × ${h}) : 2 = ${val}`], { tol: 0.05, level: lv }); },
      (rand, lv) => { const L = int(rand, 10, 18); const l = int(rand, 6, 10); const cut = int(rand, 3, 5); return test('arie-drep', `Foaie ${L}×${l} cm. Tai un pătrat de latură ${cut} cm. Aria rămasă, cm².`, L * l - cut * cut, [`Aria foii = ${L * l}`, `Tăietura = ${cut * cut}`, `Rămân ${L * l - cut * cut}`], { level: lv }); }
    ]
  },
  multimi: {
    flashes: [
      (rand) => flash('apartine', '„x aparține mulțimii A” înseamnă…', ['x e un element din A', 'A e mai mare decât x', 'x e în afara lui A', 'A e vidă'], '∈ spune „face parte din”.', 1),
      (rand) => flash('reuniune', 'Reuniunea conține…', ['tot din cel puțin una, fără dubluri', 'doar elementele comune', 'doar ce lipsește', 'numerele impare'], 'Strângi tot, o dată.', 2),
      (rand) => flash('intersectie', 'Intersecția a două mulțimi conține…', ['doar elementele comune', 'tot din amândouă', 'doar ce lipsește', 'numerele pare'], 'Doar oaspeții de la ambele petreceri.', 3),
      (rand) => flash('factori', 'Descompunerea în factori primi…', ['scrii numărul ca produs de prime', 'aduni cifrele', 'îl faci par', 'îl rotunjești'], '12 = 2 × 2 × 3.', 4),
      (rand) => flash('cmmdc', 'c.m.m.d.c. e…', ['cel mai mare număr care împarte pe amândoi', 'cel mai mic multiplu comun', 'suma lor', 'produsul lor'], 'Cel mai mare prieten la împărțire.', 5),
      (rand) => flash('cmmmc', 'c.m.m.m.c. e…', ['cel mai mic număr care se împarte la amândoi', 'cel mai mare divizor', 'diferența lor', 'un număr prim'], 'Prima stație comună.', 6),
      (rand) => flash('vida', 'Mulțimea vidă…', ['nu are niciun element', 'are un zero', 'e infinită', 'e {0}'], 'Simbol: ∅. Zero e un element; vida e goală.', 7),
      (rand) => flash('cardinal', '|A| înseamnă…', ['câte elemente distincte are A', 'cel mai mare element', 'suma elementelor', 'un unghi'], 'Cardinalul e numărul de oaspeți, nu numele lor.', 8)
    ],
    tests: [
      (rand, lv) => { const n = int(rand, 3, 6); return test('cardinal', `Câte elemente are {${Array.from({ length: n }, (_, i) => 2 * i + 1).join(', ')}}?`, n, [`Sunt ${n} numere distincte`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 8, 16); const b = int(rand, 8, 16); const both = int(rand, 2, Math.min(5, a, b)); return test('reuniune', `${a} fac sport, ${b} muzică, ${both} pe amândouă. Câți fac cel puțin una?`, a + b - both, [`${a} + ${b} − ${both} = ${a + b - both}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 4, 9); const b = int(rand, 6, 12); return test('cmmdc', `c.m.m.d.c.(${a * 2}, ${b * 2}).`, gcd(a * 2, b * 2), [`c.m.m.d.c. = ${gcd(a * 2, b * 2)}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 8, 20); const b = int(rand, 8, 20); const both = int(rand, 2, Math.min(6, a, b)); const total = int(rand, a + b - both + 2, a + b - both + 10); const none = total - (a + b - both); return test('intersectie', `Grup de ${total}: ${a} mate, ${b} română, ${both} pe amândouă. Câți niciunul?`, none, [`În cel puțin un cerc: ${a + b - both}`, `${total} − ${a + b - both} = ${none}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [8, 12, 18]); const b = pick(rand, [12, 18, 24]); return test('cmmmc', `c.m.m.m.c.(${a}, ${b}).`, lcm(a, b), [`c.m.m.m.c. = ${lcm(a, b)}`], { level: lv }); },
      (rand, lv) => { const a = 48; const b = 18; return test('cmmdc', `c.m.m.d.c.(${a}, ${b}) × c.m.m.m.c.(${a}, ${b}) : ${a}.`, b, ['Produsul c.m.m.d.c. și c.m.m.m.c. e produsul numerelor', `${a}×${b}/${a} = ${b}`], { level: lv }); },
      (rand, lv) => { const x = pick(rand, [8, 10, 12]); const y = pick(rand, [12, 15, 18]); const z = pick(rand, [18, 20, 24]); return test('cmmmc', `Trei semnale la ${x}, ${y} și ${z} s. După câte secunde coincid din nou?`, lcm(lcm(x, y), z), [`c.m.m.m.c.(${x},${y},${z}) = ${lcm(lcm(x, y), z)}`], { level: lv }); }
    ]
  },
  proportii: {
    flashes: [
      (rand) => flash('raport', 'Un raport compară…', ['două mărimi printr-o împărțire', 'doar unghiuri', 'doar mulțimi', 'trei numere obligatoriu'], '3:4 spune „cât dintr-una față de cealaltă”.', 1),
      (rand) => { const a = int(rand, 2, 5); const b = a * int(rand, 2, 4); return flash('raport', `Raportul ${a}:${b} se simplifică la…`, [`1:${b / a}`, `${a}:${b}`, `${b}:${a}`, '1:1'], `Împarți ambele părți cu ${a}.`, 2); },
      (rand) => flash('direct', 'Mărimi direct proporționale…', ['cresc sau scad împreună, în același ritm', 'una crește când cealaltă scade', 'nu se leagă', 'sunt mereu egale'], 'Dublu cantitate, dublu preț dacă prețul e fix.', 3),
      (rand) => flash('invers', 'Mărimi invers proporționale…', ['una crește când cealaltă scade, produsul rămâne', 'cresc mereu împreună', 'sunt unghiuri', 'sunt fracții improprii'], 'Mai mulți lucrători, mai puțin timp.', 4),
      (rand) => flash('regula3', 'Regula de trei e…', ['o proporție cu un loc gol', 'o înmulțire de trei numere oarecare', 'o teoremă de geometrie', 'o medie'], 'Trei valori știute, a patra se află.', 5),
      (rand) => flash('procent6', 'Procentul, la rapoarte, e tot…', ['o parte din 100', 'un unghi', 'un prim', 'un volum'], 'Poți trece de la raport la procent.', 6),
      (rand) => flash('scara', 'Scara 1:100 pe o hartă înseamnă…', ['1 cm pe hartă e 100 cm în realitate', 'harta e de 100 de ori mai mare', 'sunt 100 de orașe', 'e un procent de 1%'], 'Scara e un raport între desen și real.', 7),
      (rand) => flash('regula3', 'Dacă 3 caiete = 18 lei, un caiet e…', ['6 lei', '15 lei', '21 lei', '9 lei'], 'Reduci la unitate: 18:3=6.', 8)
    ],
    tests: [
      (rand, lv) => { const n = int(rand, 2, 5); const unit = int(rand, 4, 9); return test('regula3', `${n} caiete costă ${n * unit} lei. Cât costă 1 caiet?`, unit, [`${n * unit} : ${n} = ${unit}`], { level: lv }); },
      (rand, lv) => { const n = int(rand, 4, 10); const pret = n * int(rand, 8, 15); const k = int(rand, 2, n - 1); const unit = pret / n; return test('regula3', `${n} caiete costă ${pret} lei. Cât costă ${k} caiete?`, unit * k, [`Un caiet: ${unit}`, `${k} × ${unit} = ${unit * k}`], { level: lv }); },
      (rand, lv) => { const p = pick(rand, [10, 20, 25]); const n = pick(rand, [40, 60, 80, 100]); return test('procent6', `${p}% din ${n}. Doar numărul.`, (n * p) / 100, [`${p}/100 × ${n} = ${(n * p) / 100}`], { level: lv }); },
      (rand, lv) => { const k = pick(rand, [2, 3, 4, 5]); const real = k * int(rand, 4, 12); return test('scara', `Scara 1:${k}. Pe hartă ${real / k} cm. Câți cm în realitate?`, real, [`${real / k} × ${k} = ${real}`], { level: lv }); },
      (rand, lv) => { const work = int(rand, 4, 8); const hours = int(rand, 3, 6); const half = work / 2; if (half !== Math.floor(half)) { return test('invers', `${work} robinete umplu un bazin în ${hours} ore. Câte ore la ${work * 2} robinete?`, hours / 2, [`Produsul rămâne ${work * hours}`, `${work * 2} × ? = ${work * hours}`, `? = ${hours / 2}`], { level: lv }); } return test('invers', `${work} robinete umplu un bazin în ${hours} ore. Câte ore la ${half} robinete?`, hours * 2, [`${work} × ${hours} = ${half} × ?`, `? = ${hours * 2}`], { level: lv }); },
      (rand, lv) => { const pret = pick(rand, [80, 100, 120]); return test('procent6', `Un preț de ${pret} lei crește cu 20%, apoi scade cu 20% din noul preț. Cât e acum?`, Math.round(pret * 1.2 * 0.8), [`${pret} + 20% = ${pret * 1.2}`, `20% din noul preț, nu din ${pret}`, `Rămân ${Math.round(pret * 1.2 * 0.8)}`], { level: lv }); },
      (rand, lv) => { const n = int(rand, 6, 10); const pret = n * int(rand, 10, 16); const k = int(rand, 3, n - 2); const p = pick(rand, [10, 20]); const brute = (pret / n) * k; const cut = (brute * p) / 100; return test('regula3', `${n} m costă ${pret} lei. Cumperi ${k} m cu ${p}% reducere. Cât plătești?`, brute - cut, [`1 m = ${pret / n}`, `${k} m = ${brute}`, `${p}% = ${cut}`, `Plătești ${brute - cut}`], { level: lv }); }
    ]
  },
  'intregi-rationale': {
    flashes: [
      (rand) => { const n = int(rand, 2, 9); return flash('opus', `Opusul lui ${n} este…`, uniqueOptions(rand, `-${n}`, [String(n), '0', String(n + 1)]), 'Opusul schimbă semnul; suma e 0.', 1); },
      (rand) => { const n = int(rand, 2, 9); return flash('modul', `|−${n}| este…`, uniqueOptions(rand, String(n), [`-${n}`, '0', String(n + 1)]), 'Modulul e distanța până la zero.', 2); },
      (rand) => flash('semn', 'Minusul la întregi arată…', ['direcția pe axă, nu „un număr urât”', 'că e fracție', 'că e prim', 'că e volum'], '−3 e trei pași în stânga lui zero.', 3),
      (rand) => flash('adunare', 'Când aduni un negativ, de fapt…', ['te muți spre stânga pe axă', 'înmulțești', 'ștergi semnul', 'faci o putere'], '5 + (−2) = 3.', 4),
      (rand) => flash('rationale', 'Un număr rațional se poate scrie…', ['ca o fracție de întregi (numitor ≠ 0)', 'doar ca radical', 'doar ca procent', 'doar ca volum'], '−3/4, 0,7, 5 sunt raționale.', 5),
      (rand) => flash('produs', '(−) × (+) dă…', ['minus', 'plus', 'zero', 'un unghi'], 'Semne diferite → rezultat negativ.', 6),
      (rand) => flash('ecuatie', 'x + 5 = 12 întreabă…', ['ce număr plus 5 face 12', 'cât e 5 × 12', 'dacă 12 e prim', 'perimetrul'], 'Scazi 5 din ambele părți: x = 7.', 7),
      (rand) => flash('verificare', 'După ce găsești x, ce faci?', ['Îl pui înapoi în enunț să vezi dacă iese', 'Îl ștergi', 'Îl înmulțești cu 10', 'Îl faci procent'], 'Verificarea e parte din treabă.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 2, 8); const b = int(rand, 3, 9); return test('adunare', `Calculează (−${a}) + ${b}.`, -a + b, [`−${a} + ${b} = ${-a + b}`], { level: lv }); },
      (rand, lv) => { const n = int(rand, 3, 12); return test('modul', `Cât este |−${n}|?`, n, [`Distanța până la 0 e ${n}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 8); const b = int(rand, 2, 8); return test('produs', `Calculează (−${a}) × ${b}.`, -a * b, ['Minus ori plus = minus', `= ${-a * b}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 3, 12); const b = int(rand, 2, 9); const c = int(rand, 1, 8); return test('adunare', `Calculează (−${a}) + ${b} + (−${c}).`, -a + b - c, [`−${a} + ${b} = ${-a + b}`, `${-a + b} + (−${c}) = ${-a + b - c}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 9); const b = int(rand, 2, 10); return test('ecuatie', `Află x: x + ${b} = ${x + b}.`, x, [`x = ${x + b} − ${b} = ${x}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 5); const x = int(rand, 2, 8); const b = int(rand, 1, 9); return test('ecuatie', `Află x: ${a}x − ${b} = ${a * x - b}.`, x, [`${a}x = ${a * x}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 4); const x = int(rand, 2, 6); const b = int(rand, 1, 8); const c = int(rand, 1, 5); return test('ecuatie', `Află x: ${a}x − ${b} = −${c}x + ${a * x - b + c * x}.`, x, [`Treci necunoscutele într-o parte`, `${a}x + ${c}x = ${a * x + c * x}`, `x = ${x}`], { level: lv }); }
    ]
  },
  triunghi: {
    flashes: [
      (rand) => flash('suma180', 'Suma unghiurilor unui triunghi e…', ['180°', '90°', '360°', '60°'], 'Cele trei colțuri fac un unghi alungit.', 1),
      (rand) => flash('drept', 'În triunghiul dreptunghic, cea mai lungă latură e…', ['ipotenuza, vizavi de unghiul de 90°', 'o catetă oarecare', 'înălțimea', 'baza isoscelului'], 'Ipotenuza e față de unghiul drept.', 2),
      (rand) => flash('opuse', 'Unghiurile opuse la vârf…', ['sunt egale', 'sunt suplementare mereu', 'sunt 90°', 'nu există'], 'Față în față, când două drepte se taie.', 3),
      (rand) => flash('paralele', 'Două drepte paralele tăiate de o secantă…', ['produc unghiuri corespunzătoare egale', 'se întâlnesc obligatoriu', 'formează un cub', 'anulează unghiurile'], 'Paralelele păstrează aceleași unghiuri cu tăietura.', 4),
      (rand) => flash('cerc', 'Diametrul unui cerc e…', ['de două ori raza, trece prin centru', 'jumătate din rază', 'o coardă oarecare', 'perimetrul'], 'Rază = centru la cerc; diametru = 2 raze.', 5),
      (rand) => flash('clasif', 'Un triunghi dreptunghic are…', ['un unghi de 90°', 'toate unghiurile obtuze', 'laturi paralele', 'un cerc de rază 1'], 'Un colț drept; celelalte două ascuțite.', 6),
      (rand) => flash('pitagora', 'Pitagora spune…', ['a² + b² = c² pe ipotenuză', 'o regulă de trei', 'o medie', 'o fracție'], 'c e latura din fața unghiului drept.', 7),
      (rand) => flash('congr', 'Triunghiuri congruente…', ['au aceeași formă și aceleași mărimi', 'doar aceeași arie, formă diferită', 'sunt cercuri', 'au un singur unghi egal'], 'Se potrivesc dacă le suprapui.', 8)
    ],
    tests: [
      (rand, lv) => test('suma180', 'Câte grade au împreună unghiurile unui triunghi?', 180, ['Mereu 180°'], { level: lv }),
      (rand, lv) => { const a = int(rand, 30, 70); const b = int(rand, 30, 80); const useB = a + b < 170 ? b : 40; return test('suma180', `Unghiurile ${a}° și ${useB}°. Al treilea unghi?`, 180 - a - useB, [`180 − ${a} − ${useB} = ${180 - a - useB}`], { level: lv }); },
      (rand, lv) => { const varf = pick(rand, [20, 30, 40, 50, 80]); const baza = (180 - varf) / 2; return test('suma180', `Triunghi isoscel, unghiul din vârf ${varf}°. Un unghi de la bază?`, baza, [`Rămân ${180 - varf}°`, `${180 - varf} : 2 = ${baza}`], { level: lv }); },
      (rand, lv) => { const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10]]; const [x, y, z] = pick(rand, triples); return test('pitagora', `Catete ${x} și ${y}. Ipotenuza?`, z, [`${x}² + ${y}² = ${z}²`], { level: lv }); },
      (rand, lv) => { const d = pick(rand, [7, 14, 21]); return test('cerc', `Diametru ${d} cm, π = 22/7. Lungimea cercului.`, (22 / 7) * d, [`L = πd = (22/7)×${d} = ${(22 / 7) * d}`], { level: lv }); },
      (rand, lv) => { const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13]]; const [x, y, z] = pick(rand, triples); const k = int(rand, 1, 3); return test('pitagora', `Catete ${x * k} și ${y * k}. Perimetrul triunghiului dreptunghic.`, (x + y + z) * k, [`Ipotenuza = ${z * k}`, `Perimetru = ${(x + y + z) * k}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [40, 50, 62]); return test('opuse', `Două drepte se taie. Un unghi e ${a}°. Suma dintre opusul la vârf și unul alăturat?`, 180, [`Opusul = ${a}°`, `Alăturatul = ${180 - a}°`, `Suma = 180`], { level: lv }); }
    ]
  },
  reale: {
    flashes: [
      (rand) => { const n = pick(rand, [4, 9, 16, 25, 36]); return flash('radical', `√${n} =`, uniqueOptions(rand, Math.sqrt(n), [n / 2, n, Math.sqrt(n) + 1]), `${Math.sqrt(n)} × ${Math.sqrt(n)} = ${n}.`, 1); },
      (rand) => flash('irațional', 'Un irațional…', ['nu se scrie frumos ca fracție de întregi', 'e mereu negativ', 'e un unghi', 'e 0'], '√2 nu e o fracție exactă, dar e pe axă.', 2),
      (rand) => flash('reale', 'Mulțimea numerelor reale cuprinde…', ['raționale și iraționale, pe aceeași axă', 'doar naturale', 'doar procente', 'doar volume'], 'Tot ce poți arăta pe o dreaptă continuă.', 3),
      (rand) => flash('ordin', 'Pe axă, √2 stă…', ['între 1 și 2', 'înainte de 0', 'după 10', 'pe 4'], '≈1,41, deci între 1 și 2.', 4),
      (rand) => flash('rationaliz', 'Raționalizarea unui numitor simplu…', ['scapi de radicalul de la numitor, înmulțind sus și jos', 'ștergi numitorul', 'faci procent', 'aduni 1'], 'Valoarea rămâne, scrierea se liniștește.', 5),
      (rand) => flash('produs-rad', '√a × √b = …', ['√(a×b)', '√(a+b)', 'a×b', '√a + √b'], 'Radicalii se strâng sub același acoperiș la produs.', 6),
      (rand) => flash('medii', 'Media geometrică a lui a și b e…', ['√(a×b)', '(a+b)/2', 'a−b', 'a/b'], 'Pentru 4 și 16: √64 = 8.', 7),
      (rand) => flash('radical', '√(a²) pentru a > 0 e…', ['a', '2a', 'a²', '0'], 'Rădăcina desfăce pătratul.', 8)
    ],
    tests: [
      (rand, lv) => { const r = int(rand, 3, 12); return test('radical', `Calculează √${r * r}.`, r, [`${r} × ${r} = ${r * r}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [4, 9, 16, 25]); return test('radical', `Calculează √${a} + 1.`, Math.sqrt(a) + 1, [`√${a} = ${Math.sqrt(a)}`, `+ 1 = ${Math.sqrt(a) + 1}`], { level: lv }); },
      (rand, lv) => { const a = pick(rand, [4, 9, 16, 25]); const b = pick(rand, [4, 9, 16]); return test('radical', `Calculează √${a} × √${b}.`, Math.sqrt(a) * Math.sqrt(b), [`√${a} = ${Math.sqrt(a)}`, `√${b} = ${Math.sqrt(b)}`, `Produs = ${Math.sqrt(a) * Math.sqrt(b)}`], { level: lv }); },
      (rand, lv) => { const k = pick(rand, [2, 3, 4]); const n = pick(rand, [9, 16, 25]); return test('radical', `Calculează ${k} × √${n}.`, k * Math.sqrt(n), [`√${n} = ${Math.sqrt(n)}`, `${k} × ${Math.sqrt(n)} = ${k * Math.sqrt(n)}`], { level: lv }); },
      (rand, lv) => test('rationaliz', 'Raționalizează 6/√3 și simplifică. Scrie de forma a√3 (ex. 2√3).', '2√3', ['6/√3 × √3/√3 = 6√3/3', '2√3'], { answers: ['2√3', '2*sqrt(3)', '2sqrt3'], numeric: false, level: lv }),
      (rand, lv) => test('medii', 'Media geometrică a lui 4 și 16. Doar numărul.', 8, ['√(4×16)=√64=8'], { level: lv }),
      (rand, lv) => { const lo = 3; const hi = 6; return test('ordin', `Câți naturali n există cu ${lo} < √n < ${hi}?`, 26, [`n ≥ ${lo * lo + 1} și n ≤ ${hi * hi - 1}`, 'De la 10 la 35: 26'], { level: lv }); }
    ]
  },
  ecuati: {
    flashes: [
      (rand) => flash('cantar', 'O ecuație e ca un cântar: …', ['ce faci într-o parte faci și în cealaltă', 'schimbi doar stânga', 'ștergi necunoscuta', 'înmulțești doar cu zero'], 'Egalitatea trebuie să rămână adevărată.', 1),
      (rand) => flash('necunoscuta', 'x e…', ['numărul pe care îl căutăm', 'mereu 0', 'un unghi', 'un procent'], 'Îl afli astfel încât egalitatea să țină.', 2),
      (rand) => flash('sistem', 'Un sistem e…', ['două (sau mai multe) ecuații cu aceleași necunoscute', 'o singură putere', 'un cerc', 'o medie'], 'Cauți perechea (x, y) care le satisface pe amândouă.', 3),
      (rand) => flash('substituie', 'Metoda substituției…', ['afli o necunoscută dintr-una și o pui în cealaltă', 'aduni orbește', 'ștergi y', 'înmulțești cu zero'], 'Înlocuiești, nu ghicești.', 4),
      (rand) => flash('reducere', 'Metoda reducerii…', ['aduni sau scazi ecuațiile ca să dispară o necunoscută', 'împarți la zero', 'faci procent', 'desenezi un cub'], 'Poți înmulți mai întâi ca termenii să se anuleze.', 5),
      (rand) => flash('verificare', 'Soluția unui sistem se verifică…', ['în ambele ecuații', 'doar în prima', 'doar pe grafic', 'nu se verifică'], 'Dacă una minte, perechea nu e bună.', 6),
      (rand) => flash('cantar', 'Dacă 2x = 10, x e…', ['5', '12', '8', '20'], 'Împarți ambele părți la 2.', 7),
      (rand) => flash('cantar', 'x − 3 = 4 dă x = …', ['7', '1', '12', '−1'], 'Treci −3 în dreapta: 4+3=7.', 8)
    ],
    tests: [
      (rand, lv) => { const x = int(rand, 2, 12); const b = int(rand, 2, 9); return test('cantar', `Află x: x + ${b} = ${x + b}.`, x, [`x = ${x + b} − ${b} = ${x}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 8); const x = int(rand, 2, 9); return test('cantar', `Află x: ${a}x = ${a * x}.`, x, [`Împarți la ${a}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 6); const x = int(rand, 2, 9); const b = int(rand, 1, 12); return test('cantar', `Află x: ${a}x + ${b} = ${a * x + b}.`, x, [`Scazi ${b}: ${a}x = ${a * x}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 3, 10); const a = int(rand, 2, 5); const b = int(rand, 1, 6); return test('cantar', `Află x: (${a}x − ${b})/2 = ${(a * x - b) / 2}.`, x, [`Înmulțești cu 2`, `${a}x = ${a * x}`, `x = ${x}`], { level: lv }); },
      (rand, lv) => { const y = int(rand, 2, 8); const x = y + 1; return test('sistem', `x − y = 1 și x + y = ${x + y}. Află y.`, y, [`Aduni: 2x = ${2 * x}`, `x = ${x}`, `y = ${y}`], { level: lv }); },
      (rand, lv) => { const y = int(rand, 2, 6); const x = y + 2; return test('substituie', `3x + 2y = ${3 * x + 2 * y}, x = y + 2. Cât e x?`, x, [`x = y + 2`, `3(y+2)+2y = ${3 * x + 2 * y}`, `y = ${y}, x = ${x}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 5); const y = int(rand, -3, 4); return test('solutie', `Pentru (${x}, ${y}) calculează 4x − y.`, 4 * x - y, [`4×${x} − (${y}) = ${4 * x - y}`], { level: lv }); }
    ]
  },
  date: {
    flashes: [
      (rand) => flash('origine', 'Originea e punctul…', ['(0, 0)', '(1, 1)', '(0, 1)', '(1, 0)'], 'Acolo se taie axele.', 1),
      (rand) => { const x = int(rand, 1, 5); const y = int(rand, 1, 6); return flash('origine', `Simetricul lui A(${x}, −${y}) față de origine e…`, [`(−${x}, ${y})`, `(${x}, ${y})`, `(−${x}, −${y})`, '(0, 0)'], 'Schimbi ambele semne.', 2); },
      (rand) => flash('abscisa', 'Abscisa e…', ['coordonata x, prima', 'coordonata y', 'originea', 'un unghi'], 'A(2, 3): abscisa e 2.', 3),
      (rand) => flash('ordonata', 'Ordonata e…', ['coordonata y, a doua', 'doar x', 'perimetrul', 'un prim'], 'A(2, 3): ordonata e 3.', 4),
      (rand) => flash('depend', 'y = x + 1 e o dependență: …', ['fiecărui x îi corespunde un y', 'x e mereu 0', 'e un cub', 'e un procent'], 'Tabel: x=0 → y=1; x=2 → y=3.', 5),
      (rand) => flash('grafic', 'Punctele unei dependențe liniare…', ['stau pe o dreaptă', 'formează un cerc', 'sunt un cub', 'nu se pot desena'], 'Unești punctele din tabel.', 6),
      (rand) => flash('tabel', 'Un tabel de date…', ['leagă valori, nu e o listă oarecare', 'e un unghi', 'e o poezie', 'e un prim'], 'Cauți regula dintre coloane.', 7),
      (rand) => flash('simetric-x', 'Simetricul față de axa Ox schimbă…', ['semnul lui y', 'semnul lui x', 'ambele', 'nimic'], 'A(2, 3) → (2, −3).', 8)
    ],
    tests: [
      (rand, lv) => { const x = int(rand, 1, 8); const y = int(rand, 1, 8); return test('origine', `La punctul A(${x}, ${y}), care e abscisa (x)?`, x, [`Prima coordonată e ${x}`], { level: lv }); },
      (rand, lv) => test('pereche', 'Scrie originea ca (x, y).', '(0, 0)', ['Axa x taie axa y în 0'], { answers: ['(0, 0)', '(0,0)', '0,0'], numeric: false, level: lv }),
      (rand, lv) => { const a = int(rand, 1, 5); const b = int(rand, 1, 8); const x = int(rand, 2, 6); return test('depend', `y = ${a}x + ${b}. Cât e y pentru x = ${x}?`, a * x + b, [`${a} × ${x} = ${a * x}`, `${a * x} + ${b} = ${a * x + b}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 1, 6); const y = int(rand, 1, 6); return test('origine', `Simetricul lui A(${x}, −${y}) față de origine. Scrie (x, y).`, `(-${x}, ${y})`, ['Schimbi ambele semne'], { answers: [`(-${x}, ${y})`, `(-${x},${y})`], numeric: false, level: lv }); },
      (rand, lv) => { const x1 = int(rand, 1, 4); const y1 = int(rand, 1, 5); const x2 = x1 + int(rand, 1, 3); const y2 = y1 + int(rand, 1, 3); return test('depend', `Din ( ${x1}, ${y1} ) la ( ${x2}, ${y2} ), cu cât crește y când x crește cu ${x2 - x1}?`, y2 - y1, [`Δx = ${x2 - x1}`, `Δy = ${y2 - y1}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 5); const x = int(rand, 3, 7); return test('depend', `y = ${a}x. Tabel: x=${x}. y=?`, a * x, [`${a} × ${x} = ${a * x}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 6); const y = int(rand, 2, 8); return test('origine', `A(${x}, ${y}). Simetric față de axa Ox. Ordonata noului punct?`, -y, ['Ox păstrează x, schimbă semnul lui y', `y → ${-y}`], { level: lv }); }
    ]
  },
  geo7: {
    flashes: [
      (rand) => flash('paralelogram', 'Aria unui paralelogram e…', ['bază × înălțime', 'suma laturilor', 'doar baza', 'doar un unghi'], 'Ca un dreptunghi „împins”.', 1),
      (rand) => flash('romb', 'Un romb are…', ['toate laturile egale', 'un singur unghi drept obligatoriu', 'laturi diferite', 'doar un cerc'], 'Ca un pătrat lățit; diagonalele sunt perpendiculare.', 2),
      (rand) => flash('trapez', 'Un trapez are…', ['exact o pereche de laturi paralele', 'toate laturile paralele', 'niciun unghi', 'doar un cerc'], 'Baza mare și baza mică sunt paralele.', 3),
      (rand) => flash('cerc-pi', 'Lungimea cercului e…', ['2πr sau πd', 'πr²', '4r', 'r²'], 'Gardul din jurul discului.', 4),
      (rand) => flash('disc', 'Aria discului e…', ['πr²', '2πr', 'πd', '4r'], 'Câte pătrățele umplu rontul.', 5),
      (rand) => flash('thales', 'Thales (la gimnaziu) spune, pe scurt…', ['o paralelă taie laturile proporțional', 'toate unghiurile sunt 90°', 'volumul cubului', 'o medie'], 'Aceeași formă, altă scară pe segmente.', 6),
      (rand) => flash('asemanare', 'La triunghiuri asemenea, raportul ariilor e…', ['pătratul raportului laturilor', 'același cu raportul laturilor', 'suma laturilor', 'un unghi'], 'Ariile cresc cu pătratul scării.', 7),
      (rand) => flash('trig', 'În triunghiul dreptunghic, sin α e…', ['cateta opusă / ipotenuză', 'cateta alăturată / ipotenuză', 'opusă / alăturată', 'perimetrul'], 'SOH: sinus = opposite / hypotenuse.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 3, 9); return test('paralelogram', `Pătrat de latură ${a} cm. Aria, cm²?`, a * a, [`${a}² = ${a * a}`], { level: lv }); },
      (rand, lv) => { const L = int(rand, 6, 12); const l = int(rand, 4, 10); return test('paralelogram', `Dreptunghi ${L}×${l}. Aria, cm².`, L * l, [`${L} × ${l} = ${L * l}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 6, 14); const h = int(rand, 4, 10); return test('paralelogram', `Paralelogram baza ${b} cm, înălțimea ${h} cm. Aria.`, b * h, [`${b} × ${h} = ${b * h}`], { level: lv }); },
      (rand, lv) => { const r = pick(rand, [3, 7, 14]); return test('cerc', `Cerc raza ${r}, π=22/7. Lungimea cercului.`, 2 * (22 / 7) * r, [`L = 2πr = 2×(22/7)×${r}`], { level: lv }); },
      (rand, lv) => { const k = pick(rand, [2, 3, 4]); return test('asemanare', `Raportul laturilor e 1:${k}. Raportul ariilor? Scrie pătratul (un număr).`, k * k, [`Ariile = pătratul scării`, `${k}² = ${k * k}`], { level: lv }); },
      (rand, lv) => { const B = int(rand, 8, 14); const b = int(rand, 4, 7); const h = int(rand, 4, 8); return test('trapez', `Trapez baze ${B} și ${b}, înălțime ${h}. Aria.`, ((B + b) * h) / 2, [`(${B}+${b})×${h} : 2 = ${((B + b) * h) / 2}`], { tol: 0.05, level: lv }); },
      (rand, lv) => { const ip = pick(rand, [10, 13, 15]); const op = pick(rand, [6, 8, 9]); return test('trig', `Triunghi dreptunghic, ipotenuză ${ip}, catetă opusă ${op}. sin α = opusă/ipotenuză. Scrie fracția ${op}/${ip} simplificată dacă se poate.`, `${op}/${ip}`, [`sin = ${op}/${ip}`], { answers: [`${op}/${ip}`], numeric: false, level: lv }); }
    ]
  },
  intervale: {
    flashes: [
      (rand) => flash('interval', 'Un interval e…', ['o bucată de axă', 'un unghi', 'un cub', 'un procent'], 'De la un capăt la altul, cu sau fără capete.', 1),
      (rand) => { const a = int(rand, 1, 4); const b = a + int(rand, 2, 5); return flash('interval', `Intervalul (${a}, ${b}] conține…`, [`${a + 1} … ${b}, dar nu pe ${a}`, `${a} … ${b}`, `doar ${a}`, `doar ${b}`], 'Rotunda taie capătul; dreapta îl ține.', 2); },
      (rand) => flash('inecuatie', 'O inecuație întreabă…', ['pentru ce x rămâne adevărat', 'care e singurul x', 'cât e perimetrul', 'dacă e prim'], 'Răspunsul e o mulțime, adesea un interval.', 3),
      (rand) => flash('deschis', '(2, 5) e deschis: …', ['nu conține pe 2 și nici pe 5', 'conține 2 și 5', 'conține doar 2', 'e un punct'], 'Paranteze rotunde = fără capete.', 4),
      (rand) => flash('inchis', '[2, 5] e închis: …', ['ține și 2, și 5', 'taie ambele capete', 'e vid', 'e un cerc'], 'Paranteze drepte = cu capete.', 5),
      (rand) => flash('reuniune-int', '[1, 2] ∪ (2, 3] e…', ['[1, 3] fără să lipsească 2? stai: 2 e în prima, deci [1, 3]', 'vid', 'doar {2}', 'un unghi'], '2 e deja în [1, 2], deci se lipește.', 6),
      (rand) => flash('semn', 'x > 3 pe axă e…', ['tot ce e la dreapta lui 3, fără 3', 'doar 3', 'totul la stânga', 'doar naturale'], 'Săgeată deschisă la 3.', 7),
      (rand) => flash('si', 'x ≥ 0 și x < 4 e…', ['[0, 4)', '(0, 4]', 'doar 0', 'toată axa'], 'Intersecție de condiții.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 1, 3); const b = a + int(rand, 3, 6); return test('interval', `Câte întregi sunt în [${a}, ${b}]?`, b - a + 1, [`De la ${a} la ${b} inclusiv: ${b - a + 1}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, -4, 1); const b = int(rand, 3, 8); return test('interval', `Câte întregi sunt în (${a}, ${b}]?`, b - a, [`${a} nu e inclus, ${b} da`, `De la ${a + 1} la ${b}: ${b - a}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 2, 6); return test('inecuatie', `Cea mai mică valoare întreagă a lui x dacă x > ${b}?`, b + 1, [`x întreg, strict mai mare decât ${b}: ${b + 1}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 0, 3); const b = a + int(rand, 4, 8); return test('interval', `Câte întregi în [${a}, ${b})?`, b - a, [`${b} nu e inclus`, `De la ${a} la ${b - 1}: ${b - a}`], { level: lv }); },
      (rand, lv) => test('inecuatie', 'Rezolvă x + 3 ≥ 7. Cel mai mic întreg x.', 4, ['x ≥ 4', 'Cel mai mic întreg: 4'], { level: lv }),
      (rand, lv) => { const k = int(rand, 2, 5); return test('inecuatie', `2x < ${2 * k}. Cel mai mare întreg x.`, k - 1, [`x < ${k}`, `Cel mai mare întreg: ${k - 1}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, -3, 0); const b = int(rand, 4, 7); return test('interval', `Câte întregi sunt în [${a}, ${b}) ∪ {${b}}?`, b - a + 1, [`[${a}, ${b}) plus capătul ${b} = [${a}, ${b}]`, `${b - a + 1} întregi`], { level: lv }); }
    ]
  },
  algebric: {
    flashes: [
      (rand) => flash('asemenea', 'Termeni asemenea au…', ['aceeași parte cu litere', 'doar același număr', 'un unghi', 'un volum'], '3x și −5x se strâng; 3x și 3y nu.', 1),
      (rand) => flash('binom', '(a+b)² se deschide…', ['a² + 2ab + b²', 'a² + b²', 'a² − b²', '(a+b)(a−b)'], 'Pătratul sumei: două pătrate și dublul produsului.', 2),
      (rand) => flash('diferenta', 'a² − b² se descompune…', ['(a−b)(a+b)', '(a−b)²', 'a − b', '(a+b)²'], 'Diferență de pătrate.', 3),
      (rand) => flash('factor', 'Scoaterea factorului comun…', ['tragi în față ce e în toți termenii', 'aduni coeficienții orbește', 'ștergi x', 'faci procent'], '2x + 6 = 2(x+3).', 4),
      (rand) => flash('fractie-lit', 'O fracție algebrică se simplifică dacă…', ['numărătorul și numitorul au un factor comun', 'aduni 1', 'ștergi numitorul', 'faci radical'], 'Ca la fracțiile obișnuite, dar cu litere.', 5),
      (rand) => flash('grad2', 'O ecuație de tip x² = 9 are soluții…', ['3 și −3', 'doar 3', 'doar 0', '9'], 'Două numere, înmulțite cu ele, dau 9.', 6),
      (rand) => flash('zero', 'Un produs e 0 dacă…', ['cel puțin un factor e 0', 'toți sunt 1', 'e un unghi', 'e un procent'], 'Asta deschide ecuații prin factori.', 7),
      (rand) => flash('minus-binom', '(a−b)² e…', ['a² − 2ab + b²', 'a² − b²', 'a² + 2ab + b²', '(a−b)(a+b)'], 'Atenție la mijloc: minus dublul produsului.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 2, 8); const b = int(rand, 2, 8); return test('asemenea', `Calculează ${a}x + ${b}x pentru x=1. (Doar coeficientul sumei, sau valoarea: ${a + b}.)`, a + b, [`${a}x + ${b}x = ${a + b}x`, `Pentru x=1: ${a + b}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 6); return test('diferenta', `Calculează (x+3)(x−3) pentru x=${x}.`, (x + 3) * (x - 3), ['E x² − 9', `${x}² − 9 = ${x * x - 9}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 6); return test('binom', `Calculează (x+3)² pentru x=${x}.`, x * x + 6 * x + 9, ['x² + 6x + 9', `${x * x} + ${6 * x} + 9 = ${x * x + 6 * x + 9}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 3, 8); return test('factor', `Calculează 2(x+4) pentru x=${x}.`, 2 * (x + 4), [`x+4 = ${x + 4}`, `×2 = ${2 * (x + 4)}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 4, 9); return test('binom', `Calculează (x−2)² pentru x=${x}.`, (x - 2) * (x - 2), ['x² − 4x + 4', `${(x - 2) ** 2}`], { level: lv }); },
      (rand, lv) => { const n = pick(rand, [4, 9, 16, 25]); return test('grad2', `Rezolvă x² = ${n}. Scrie soluția pozitivă.`, Math.sqrt(n), [`x = ±${Math.sqrt(n)}`, `Cerut: ${Math.sqrt(n)}`], { level: lv }); },
      (rand, lv) => { const x = int(rand, 2, 5); return test('diferenta', `Calculează (2x+1)(2x−1) pentru x=${x}.`, (2 * x + 1) * (2 * x - 1), ['E 4x² − 1', `${4 * x * x} − 1 = ${4 * x * x - 1}`], { level: lv }); }
    ]
  },
  functii: {
    flashes: [
      (rand) => flash('dreapta', 'f(x)=ax+b e…', ['o dreaptă', 'un cerc', 'un cub', 'un procent'], 'Funcție de gradul I: graficul e o dreaptă.', 1),
      (rand) => flash('f', 'f(2) înseamnă…', ['valoarea funcției când x=2', 'f ori 2', 'un unghi', 'un prim'], 'Înlocuiești x cu 2.', 2),
      (rand) => flash('a', 'În f(x)=ax+b, a spune…', ['cât de înclinată e dreapta (pantă)', 'unde taie Oy obligatoriu doar', 'volumul', 'un procent'], 'a>0 urcă; a<0 coboară.', 3),
      (rand) => flash('b', 'b e…', ['unde dreapta taie axa Oy', 'pantă', 'un cub', 'un prim'], 'f(0)=b.', 4),
      (rand) => flash('medie', 'Media unui set de date e…', ['suma împărțită la câți sunt', 'cel mai mare', 'cel mai mic', 'un unghi'], 'Un rezumat, nu fiecare valoare.', 5),
      (rand) => flash('mediana', 'Mediana e…', ['valoarea din mijloc, după ce sortezi', 'media', 'produsul', 'un prim'], 'Împarte șirul în două jumătăți egale ca număr.', 6),
      (rand) => flash('modul-stat', 'Modulul (moda) e…', ['valoarea care apare cel mai des', 'media', 'un unghi', 'un cub'], 'Cea mai „populară” notă.', 7),
      (rand) => flash('amplitudine', 'Amplitudinea e…', ['max − min', 'media', 'suma', 'un prim'], 'Cât de „întins” e setul.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 1, 5); const b = int(rand, 0, 8); const x = int(rand, 1, 6); return test('dreapta', `f(x)=${a}x + ${b}. Calculează f(${x}).`, a * x + b, [`${a} × ${x} = ${a * x}`, `+ ${b} = ${a * x + b}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, -4, 4) || 2; const b = int(rand, -6, 8); const x = int(rand, -3, 5); const y = a * x + b; const sign = b >= 0 ? `+ ${b}` : `− ${-b}`; return test('dreapta', `f(x)=${a}x ${sign}. Calculează f(${x}).`, y, [`${a} × ${x} = ${a * x}`, `${a * x} ${sign} = ${y}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 1, 9); return test('b', `f(x)=3x + ${b}. Cât e f(0)?`, b, ['f(0)=b', `${b}`], { level: lv }); },
      (rand, lv) => { const xs = [int(rand, 4, 8), int(rand, 5, 9), int(rand, 6, 9)]; const m = (xs[0] + xs[1] + xs[2]) / 3; return test('medie', `Media notelor ${xs.join(', ')}.`, m, [`Suma = ${xs[0] + xs[1] + xs[2]}`, `: 3 = ${m}`], { tol: 0.05, answers: [String(m), String(m).replace('.', ',')], level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 6); const b = a + 4; const c = a + 8; return test('mediana', `Mediana setului ${c}, ${a}, ${b} (sortezi întâi).`, b, [`Sortat: ${a}, ${b}, ${c}`, `Mijlocul e ${b}`], { level: lv }); },
      (rand, lv) => { const lo = int(rand, 2, 5); const hi = lo + int(rand, 6, 12); return test('amplitudine', `Amplitudinea unui set cu min ${lo} și max ${hi}.`, hi - lo, [`${hi} − ${lo} = ${hi - lo}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 2, 5); const x1 = int(rand, 1, 4); const x2 = x1 + int(rand, 2, 4); return test('dreapta', `f(x)=${a}x. Cu cât crește f când x crește de la ${x1} la ${x2}?`, a * (x2 - x1), [`Δx = ${x2 - x1}`, `Δf = ${a} × ${x2 - x1} = ${a * (x2 - x1)}`], { level: lv }); }
    ]
  },
  spatiu: {
    flashes: [
      (rand) => flash('prisma', 'Volumul cubului de latură a e…', ['a × a × a', '6a', '4a', 'a + a + a'], 'Câte cubulețe umplu cutia.', 1),
      (rand) => flash('desfasurare', 'Aria totală a cubului de latură a e…', ['6a²', 'a³', '4a', '2a'], 'Șase fețe pătrate.', 2),
      (rand) => flash('prisma-v', 'Volumul prismei e…', ['aria bazei × înălțimea', 'suma muchiilor', '6a', 'un unghi'], 'Câte „felii” de baza stivuite.', 3),
      (rand) => flash('piramida', 'Volumul piramidei e…', ['(aria bazei × înălțimea) : 3', 'bază × înălțime', '6a²', 'perimetrul'], 'Cam o treime din prismă cu aceeași bază și înălțime.', 4),
      (rand) => flash('cilindru', 'Volumul cilindrului e…', ['πr²h', '2πr', 'πr²', '4πr²'], 'Disc × înălțime.', 5),
      (rand) => flash('con', 'Volumul conului e…', ['(πr²h) : 3', 'πr²h', '2πr', '4πr²'], 'O treime din cilindru.', 6),
      (rand) => flash('sfera', 'Volumul sferei e…', ['(4/3)πr³', '4πr²', 'πr²', '2πr'], 'Umplutura mingii, nu coaja.', 7),
      (rand) => flash('paralel', 'O dreaptă paralelă cu un plan…', ['nu-l înțeapă, rămâne la distanță constantă', 'trece mereu prin centru', 'e o rază', 'e un unghi'], 'Ca un creion ținut deasupra mesei.', 8)
    ],
    tests: [
      (rand, lv) => { const a = int(rand, 3, 8); return test('desfasurare', `Cub de latură ${a}. Volumul.`, a ** 3, [`${a}³ = ${a ** 3}`], { level: lv }); },
      (rand, lv) => { const a = int(rand, 3, 8); return test('desfasurare', `Cub de latură ${a}. Aria totală.`, 6 * a * a, [`6 × ${a}² = ${6 * a * a}`], { level: lv }); },
      (rand, lv) => { const L = int(rand, 4, 8); const l = int(rand, 3, 6); const h = int(rand, 3, 7); return test('prisma', `Cutie ${L}×${l}×${h}. Volumul.`, L * l * h, [`${L}×${l}×${h} = ${L * l * h}`], { level: lv }); },
      (rand, lv) => { const b = int(rand, 4, 10); const h = int(rand, 6, 12); return test('piramida', `Piramidă cu baza pătrat ${b}×${b}, înălțime ${h}. Volumul.`, (b * b * h) / 3, [`Ab = ${b * b}`, `V = (${b * b}×${h})/3 = ${(b * b * h) / 3}`], { tol: 0.05, level: lv }); },
      (rand, lv) => { const r = pick(rand, [3, 7]); const h = pick(rand, [3, 6, 7]); return test('cilindru', `Cilindru r=${r}, h=${h}, π=22/7. Volumul.`, (22 / 7) * r * r * h, [`πr²h = (22/7)×${r}²×${h}`], { level: lv }); },
      (rand, lv) => { const r = pick(rand, [3, 6]); const h = pick(rand, [3, 9]); return test('con', `Con r=${r}, h=${h}, π=3. Volumul (aprox.).`, (3 * r * r * h) / 3, [`(πr²h)/3 = (3×${r * r}×${h})/3 = ${r * r * h}`], { level: lv }); },
      (rand, lv) => { const r = pick(rand, [3, 6]); return test('sfera', `Sferă r=${r}, π=3. Volumul aprox. (4/3)πr³.`, (4 / 3) * 3 * r ** 3, [`(4/3)×3×${r ** 3} = ${4 * r ** 3}`], { level: lv }); }
    ]
  }
};

function generateMath(chapterId, kind, rand, level) {
  const pack = BY_CHAPTER[chapterId];
  if (!pack) return null;
  const lv = Math.max(1, Number(level) || 1);
  if (kind === 'test') {
    const fn = rung(lv, pack.tests);
    return fn(rand, ((lv - 1) % pack.tests.length) + 1);
  }
  const fn = rung(lv, pack.flashes);
  return fn(rand);
}

module.exports = { generateMath, BY_CHAPTER };
