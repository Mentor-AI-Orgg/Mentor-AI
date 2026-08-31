const { int, pick, uniqueOptions, gcd, lcm } = require('./itemRng');

function flash(point, question, options, explain) {
  return { point, question, options, correct: 0, explain };
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
    level: extra.level || 2
  };
}

const BY_CHAPTER = {
  naturale: {
    flash(rand) {
      const kind = pick(rand, ['pow', 'div2', 'prime', 'div5', 'par']);
      if (kind === 'pow') {
        const b = int(rand, 2, 9);
        const e = pick(rand, [2, 3]);
        const val = b ** e;
        return flash('puteri', `Cât face ${b}${e === 2 ? '²' : '³'}?`, uniqueOptions(rand, val, [b * e, b + e, val + b, b * b + 1]), `${b} se înmulțește cu el însuși de ${e} ori.`);
      }
      if (kind === 'div2') {
        const n = int(rand, 21, 98);
        const even = n % 2 === 0;
        return flash('div2', `Numărul ${n} se împarte exact la 2?`, [even ? 'Da, ultima cifră e pară' : 'Nu, ultima cifră e impară', even ? 'Nu, e impar' : 'Da, orice număr de 2 cifre', 'Doar dacă se termină cu 5', 'Doar dacă suma cifrelor e 9'], even ? 'Par = 0, 2, 4, 6 sau 8 la final.' : 'Imparul nu se împarte exact la 2.');
      }
      if (kind === 'div5') {
        const n = pick(rand, [15, 20, 24, 35, 42, 50, 63, 80]);
        const ok = n % 5 === 0;
        return flash('div5', `${n} se împarte exact la 5?`, [ok ? 'Da, se termină cu 0 sau 5' : 'Nu, ultima cifră nu e 0 sau 5', 'Da, e impar', 'Doar dacă e prim', 'Doar dacă e par'], 'Criteriul lui 5: ultima cifră 0 sau 5.');
      }
      if (kind === 'par') {
        const n = int(rand, 10, 40) * 2;
        return flash('par', `${n} este…`, ['par', 'impar', 'prim obligatoriu', 'negativ'], 'Se împarte exact la 2, deci e par.');
      }
      const p = pick(rand, [11, 13, 17, 19, 23, 29]);
      return flash('prime', `${p} e un număr prim pentru că…`, ['are exact doi divizori: 1 și el', 'se împarte la 3', 'e par', 'are mulți divizori'], 'Prim = doar 1 și el însuși.');
    },
    test(rand) {
      const kind = pick(rand, ['ord', 'pow', 'div3', 'cmmdc', 'cmmmc']);
      if (kind === 'ord') {
        const a = int(rand, 2, 6);
        const b = int(rand, 2, 5);
        const c = int(rand, 2, 8);
        const val = a ** 2 * b + c;
        return test('paranteze', `Calculează ${a}² × ${b} + ${c}. Doar rezultatul.`, val, [`${a}² = ${a * a}`, `${a * a} × ${b} = ${a * a * b}`, `${a * a * b} + ${c} = ${val}`], { level: 1 });
      }
      if (kind === 'pow') {
        const a = int(rand, 2, 5);
        const b = int(rand, 2, 4);
        const val = a ** 2 + b ** 2;
        return test('puteri', `Calculează ${a}² + ${b}².`, val, [`${a}² = ${a * a}`, `${b}² = ${b * b}`, `Suma = ${val}`], { level: 2 });
      }
      if (kind === 'cmmdc') {
        const g = int(rand, 2, 6);
        const x = int(rand, 2, 7);
        const y = int(rand, 2, 7);
        const a = g * x;
        const b = g * y;
        const val = gcd(a, b);
        return test('cmmdc', `Cel mai mare divizor comun al numerelor ${a} și ${b}.`, val, [`Cauți cel mai mare număr care îi împarte pe amândoi`, `c.m.m.d.c.(${a}, ${b}) = ${val}`], { level: 4 });
      }
      if (kind === 'cmmmc') {
        const a = pick(rand, [4, 6, 8, 9, 10]);
        const b = pick(rand, [6, 8, 12, 15]);
        const val = lcm(a, b);
        return test('cmmmc', `Cel mai mic multiplu comun al numerelor ${a} și ${b}.`, val, [`Multiplii comuni, cel mai mic`, `c.m.m.m.c.(${a}, ${b}) = ${val}`], { level: 5 });
      }
      const n = int(rand, 12, 40) * 3;
      const sum = String(n).split('').reduce((acc, d) => acc + Number(d), 0);
      return test('div3', `Suma cifrelor numărului ${n}. Doar suma.`, sum, [`Cifrele lui ${n}`, `Suma = ${sum}`, 'Dacă suma se împarte la 3, numărul da'], { level: 3 });
    }
  },
  fractii: {
    flash(rand) {
      const kind = pick(rand, ['amplif', 'simpl', 'pct']);
      if (kind === 'amplif') {
        const k = int(rand, 2, 7);
        return flash('amplif', `Amplifici 1/${k} cu 2. Ce obții?`, [`2/${k * 2}`, `1/${k * 2}`, `${k}/2`, `2/${k}`], `Înmulțești sus și jos cu 2: 2/${k * 2}.`);
      }
      if (kind === 'simpl') {
        const k = int(rand, 2, 5);
        return flash('simplif', `Fracția ${2 * k}/${4 * k} se simplifică la…`, ['1/2', '2/4', `${k}/${2 * k}`, '1/4'], `Împarți sus și jos cu ${2 * k}.`);
      }
      const p = pick(rand, [10, 20, 25, 50]);
      return flash('procent', `${p}% înseamnă…`, [`${p}/100`, `${p}/10`, `${100 - p}/100`, `${p * 2}/100`], 'Procentul e o sutime: p din 100.');
    },
    test(rand) {
      const kind = pick(rand, ['add', 'pct', 'med', 'din']);
      if (kind === 'add') {
        const d = pick(rand, [6, 8, 12]);
        const a = 1;
        const b = d / 2;
        const val = (a + b) / d;
        const g = gcd(a + b, d);
        const num = (a + b) / g;
        const den = d / g;
        return test('numitor', `Calculează ${a}/${d} + ${b}/${d}. Fracție ireductibilă sau întreg.`, den === 1 ? num : `${num}/${den}`, [`Același numitor ${d}`, `Numărători: ${a}+${b}=${a + b}`, g > 1 ? `Simplifici cu ${g}` : 'E deja simplă'], { answers: den === 1 ? [String(num)] : [`${num}/${den}`, String(val)], numeric: den === 1, level: 2 });
      }
      if (kind === 'pct') {
        const pret = pick(rand, [40, 50, 80, 100, 120]);
        const p = pick(rand, [10, 20, 25]);
        const cut = (pret * p) / 100;
        const val = pret - cut;
        return test('procent', `Un obiect costă ${pret} lei. Reducere ${p}%. Cât plătești?`, val, [`${p}% din ${pret} = ${cut}`, `${pret} − ${cut} = ${val}`], { level: 3 });
      }
      if (kind === 'din') {
        const n = pick(rand, [12, 18, 24, 30, 36]);
        const k = pick(rand, [2, 3, 4, 6]);
        const val = n / k;
        return test('parte', `Cât este 1/${k} din ${n}?`, val, [`Împarți ${n} la ${k}`, `${n} : ${k} = ${val}`], { level: 4 });
      }
      const x = int(rand, 5, 9);
      const y = int(rand, 5, 9);
      const z = int(rand, 5, 9);
      const val = (x + y + z) / 3;
      return test('media', `Media aritmetică a notelor ${x}, ${y}, ${z}.`, val, [`Suma = ${x + y + z}`, `Împarți la 3 → ${val}`], { tol: 0.05, answers: [String(val), String(val).replace('.', ',')], level: 1 });
    }
  },
  geometrie: {
    flash(rand) {
      const kind = pick(rand, ['p', 'a', 'patrat']);
      if (kind === 'p') {
        const L = int(rand, 4, 12);
        const l = int(rand, 3, 8);
        const p = 2 * (L + l);
        return flash('perimetru', `Perimetrul unui dreptunghi ${L} cm × ${l} cm e…`, uniqueOptions(rand, `${p} cm`, [`${L * l} cm`, `${L + l} cm`, `${2 * L} cm`]), `2 × (${L}+${l}) = ${p}.`);
      }
      if (kind === 'patrat') {
        const a = int(rand, 3, 9);
        return flash('arie-patrat', `Aria pătratului de latură ${a} cm e…`, uniqueOptions(rand, `${a * a} cm²`, [`${4 * a} cm²`, `${2 * a} cm²`, `${a + a} cm²`]), `latura × latura = ${a * a}.`);
      }
      const L = int(rand, 5, 10);
      const l = int(rand, 3, 7);
      return flash('arie-drep', `Aria dreptunghiului ${L}×${l} e…`, uniqueOptions(rand, L * l, [2 * (L + l), L + l, L * 2]), `lungime × lățime = ${L * l}.`);
    },
    test(rand) {
      const kind = pick(rand, ['p', 'a', 'u', 'tri']);
      if (kind === 'p') {
        const L = int(rand, 6, 15);
        const l = int(rand, 3, 9);
        const p = 2 * (L + l);
        return test('perimetru', `Dreptunghi ${L} cm × ${l} cm. Perimetrul, în cm.`, p, [`2 × (${L} + ${l})`, `2 × ${L + l} = ${p}`], { level: 1 });
      }
      if (kind === 'a') {
        const L = int(rand, 6, 14);
        const l = int(rand, 4, 9);
        return test('arie-drep', `Aria unui dreptunghi ${L} cm × ${l} cm, în cm².`, L * l, [`${L} × ${l} = ${L * l}`], { level: 2 });
      }
      if (kind === 'tri') {
        const b = int(rand, 6, 14);
        const h = int(rand, 4, 10);
        const val = (b * h) / 2;
        return test('arie-tri', `Triunghi cu baza ${b} cm și înălțimea ${h} cm. Aria, în cm².`, val, [`(bază × înălțime) : 2`, `(${b} × ${h}) : 2 = ${val}`], { tol: 0.05, level: 4 });
      }
      const a = int(rand, 20, 70);
      return test('unghi', `Un unghi ascuțit de ${a}° și unul alăturat fac 180°. Cât e alăturatul?`, 180 - a, ['Alungit = 180°', `180 − ${a} = ${180 - a}`], { level: 3 });
    }
  },
  multimi: {
    flash(rand) {
      const kind = pick(rand, ['i', 'u']);
      if (kind === 'u') {
        return flash('reuniune', 'Reuniunea a două mulțimi conține…', ['tot din amândouă, fără dubluri', 'doar elementele comune', 'doar ce lipsește', 'numerele impare'], 'Reuniunea = tot ce e în cel puțin una.');
      }
      return flash('intersectie', 'Intersecția a două mulțimi conține…', ['doar elementele comune', 'tot din amândouă, fără excepție', 'doar ce lipsește', 'numerele pare'], 'Intersecția = ce e în ambele.');
    },
    test(rand) {
      const kind = pick(rand, ['none', 'union']);
      const a = int(rand, 8, 20);
      const b = int(rand, 8, 20);
      const both = int(rand, 2, Math.min(6, a, b));
      if (kind === 'union') {
        const uni = a + b - both;
        return test('reuniune', `${a} fac sport, ${b} muzică, ${both} pe amândouă. Câți fac cel puțin una?`, uni, [`|A ∪ B| = |A| + |B| − |A ∩ B|`, `${a} + ${b} − ${both} = ${uni}`], { level: 2 });
      }
      const total = int(rand, a + b - both + 2, a + b - both + 12);
      const none = total - (a + b - both);
      return test('intersectie', `Într-un grup de ${total}: ${a} fac mate, ${b} română, ${both} pe amândouă. Câți nu fac niciunul?`, none, [`În cel puțin un cerc: ${a}+${b}−${both} = ${a + b - both}`, `${total} − ${a + b - both} = ${none}`], { level: 3 });
    }
  },
  proportii: {
    flash(rand) {
      const kind = pick(rand, ['r3', 'rap']);
      if (kind === 'rap') {
        const a = int(rand, 2, 5);
        const b = a * int(rand, 2, 4);
        return flash('raport', `Raportul ${a}:${b} se simplifică la…`, [`1:${b / a}`, `${a}:${b}`, `${b}:${a}`, '1:1'], `Împarți ambele părți cu ${a}.`);
      }
      return flash('regula3', 'Regula de trei e…', ['o proporție cu un loc gol', 'o înmulțire de trei numere oarecare', 'o teoremă de geometrie', 'o medie'], 'Trei valori știute, a patra se află.');
    },
    test(rand) {
      const kind = pick(rand, ['caiete', 'scara']);
      if (kind === 'scara') {
        const k = pick(rand, [2, 3, 4, 5]);
        const real = k * int(rand, 4, 12);
        const harta = real / k;
        return test('scara', `Scara 1:${k}. Pe hartă, ${harta} cm. Câți cm în realitate?`, real, [`1 cm pe hartă = ${k} cm reali`, `${harta} × ${k} = ${real}`], { level: 3 });
      }
      const n = int(rand, 4, 10);
      const pret = n * int(rand, 8, 15);
      const k = int(rand, 2, n - 1);
      const unit = pret / n;
      const val = unit * k;
      return test('regula3', `${n} caiete costă ${pret} lei. Cât costă ${k} caiete, același preț?`, val, [`Un caiet: ${pret}:${n} = ${unit}`, `${k} × ${unit} = ${val}`], { level: 2 });
    }
  },
  'intregi-rationale': {
    flash(rand) {
      const kind = pick(rand, ['mod', 'opp']);
      const n = int(rand, 2, 9);
      if (kind === 'opp') {
        return flash('opus', `Opusul lui ${n} este…`, uniqueOptions(rand, `-${n}`, [String(n), '0', String(n + 1)]), 'Opusul schimbă semnul; suma cu numărul e 0.');
      }
      return flash('modul', `|−${n}| este…`, uniqueOptions(rand, String(n), [`-${n}`, '0', String(n + 1)]), 'Modulul e distanța până la zero, deci pozitiv.');
    },
    test(rand) {
      const kind = pick(rand, ['add', 'prod']);
      if (kind === 'prod') {
        const a = int(rand, 2, 8);
        const b = int(rand, 2, 8);
        const val = -a * b;
        return test('produs', `Calculează (−${a}) × ${b}.`, val, ['Minus ori plus = minus', `(−${a}) × ${b} = ${val}`], { level: 3 });
      }
      const a = int(rand, 3, 12);
      const b = int(rand, 2, 9);
      const c = int(rand, 1, 8);
      const val = -a + b - c;
      return test('adunare', `Calculează (−${a}) + ${b} + (−${c}).`, val, [`−${a} + ${b} = ${-a + b}`, `${-a + b} + (−${c}) = ${val}`], { level: 2 });
    }
  },
  triunghi: {
    flash(rand) {
      const kind = pick(rand, ['180', 'drept']);
      if (kind === 'drept') {
        return flash('drept', 'În triunghiul dreptunghic, cea mai lungă latură e…', ['ipotenuza, vizavi de unghiul de 90°', 'o catetă oarecare', 'înălțimea', 'baza isoscelului'], 'Ipotenuza e față de unghiul drept.');
      }
      return flash('suma180', 'Suma unghiurilor unui triunghi e…', ['180°', '90°', '360°', '60°'], 'Cele trei colțuri fac un unghi alungit.');
    },
    test(rand) {
      const kind = pick(rand, ['iso', 'pit', 'lipsa']);
      if (kind === 'iso') {
        const varf = pick(rand, [20, 30, 40, 50, 80]);
        const baza = (180 - varf) / 2;
        return test('suma180', `Triunghi isoscel, unghiul din vârf ${varf}°. Un unghi de la bază?`, baza, ['Suma = 180°', `Rămân ${180 - varf}° pentru baze`, `${180 - varf} : 2 = ${baza}`], { level: 2 });
      }
      if (kind === 'lipsa') {
        const a = int(rand, 30, 80);
        const b = int(rand, 30, 80);
        if (a + b >= 170) {
          return test('suma180', `Unghiurile ${a}° și ${40}°. Al treilea unghi al triunghiului?`, 180 - a - 40, ['Suma = 180°', `180 − ${a} − 40 = ${180 - a - 40}`], { level: 1 });
        }
        return test('suma180', `Unghiurile ${a}° și ${b}°. Al treilea unghi al triunghiului?`, 180 - a - b, ['Suma = 180°', `180 − ${a} − ${b} = ${180 - a - b}`], { level: 1 });
      }
      const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [9, 12, 15]];
      const [x, y, z] = pick(rand, triples);
      const k = int(rand, 1, 3);
      const p = (x + y + z) * k;
      return test('pitagora', `Catete ${x * k} și ${y * k}. Perimetrul triunghiului dreptunghic.`, p, [`Ipotenuza = ${z * k}`, `Perimetru = ${x * k}+${y * k}+${z * k} = ${p}`], { level: 4 });
    }
  },
  reale: {
    flash(rand) {
      const n = pick(rand, [4, 9, 16, 25, 36, 49, 81]);
      const r = Math.sqrt(n);
      return flash('radical', `√${n} =`, uniqueOptions(rand, r, [n / 2, n, r + 1]), `${r} × ${r} = ${n}.`);
    },
    test(rand) {
      const kind = pick(rand, ['prod', 'patrat']);
      if (kind === 'patrat') {
        const r = int(rand, 3, 12);
        return test('radical', `Calculează √${r * r}.`, r, [`Cauți numărul care la pătrat dă ${r * r}`, `${r} × ${r} = ${r * r}`], { level: 1 });
      }
      const a = pick(rand, [4, 9, 16, 25]);
      const b = pick(rand, [4, 9, 16]);
      const val = Math.sqrt(a) * Math.sqrt(b);
      return test('radical', `Calculează √${a} × √${b}.`, val, [`√${a} = ${Math.sqrt(a)}`, `√${b} = ${Math.sqrt(b)}`, `Produs = ${val}`], { level: 2 });
    }
  },
  ecuati: {
    flash(rand) {
      return flash('cantar', 'O ecuație e ca un cântar: …', ['ce faci într-o parte faci și în cealaltă', 'schimbi doar stânga', 'ștergi necunoscuta', 'înmulțești doar cu zero'], 'Egalitatea trebuie să rămână adevărată.');
    },
    test(rand) {
      const kind = pick(rand, ['axb', 'ax']);
      if (kind === 'ax') {
        const a = int(rand, 2, 8);
        const x = int(rand, 2, 9);
        return test('cantar', `Află x: ${a}x = ${a * x}.`, x, [`Împarți ambele părți la ${a}`, `x = ${x}`], { level: 1 });
      }
      const a = int(rand, 2, 6);
      const x = int(rand, 2, 9);
      const b = int(rand, 1, 12);
      const c = a * x + b;
      return test('cantar', `Află x: ${a}x + ${b} = ${c}.`, x, [`Scazi ${b}: ${a}x = ${c - b}`, `x = ${x}`], { level: 2 });
    }
  },
  date: {
    flash(rand) {
      const x = int(rand, 1, 5);
      const y = int(rand, 1, 6);
      return flash('origine', `Simetricul lui A(${x}, −${y}) față de origine e…`, [`(−${x}, ${y})`, `(${x}, ${y})`, `(−${x}, −${y})`, '(0, 0)'], 'Schimbi ambele semne.');
    },
    test(rand) {
      const a = int(rand, 1, 5);
      const b = int(rand, 1, 8);
      const x = int(rand, 2, 6);
      const y = a * x + b;
      return test('depend', `y = ${a}x + ${b}. Cât e y pentru x = ${x}?`, y, [`${a} × ${x} = ${a * x}`, `${a * x} + ${b} = ${y}`], { level: 2 });
    }
  },
  geo7: {
    flash(rand) {
      const kind = pick(rand, ['asem', 'para']);
      if (kind === 'para') {
        return flash('paralelogram', 'Aria unui paralelogram e…', ['bază × înălțime', 'suma laturilor', 'doar baza', 'doar un unghi'], 'Ca un dreptunghi „împins”: aceeași bază și înălțime.');
      }
      return flash('asemanare', 'La triunghiuri asemenea, raportul ariilor e…', ['pătratul raportului laturilor', 'același cu raportul laturilor', 'suma laturilor', 'un unghi'], 'Ariile cresc cu pătratul scării.');
    },
    test(rand) {
      const kind = pick(rand, ['drep', 'scara']);
      if (kind === 'scara') {
        const k = pick(rand, [2, 3, 4]);
        const a = int(rand, 6, 20);
        return test('asemanare', `Raportul laturilor e 1:${k}. Raportul ariilor? Scrie pătratul, un număr.`, k * k, ['Ariile = pătratul scării', `1² : ${k}² = 1:${k * k}`, `Răspunsul cerut: ${k * k}`], { level: 3 });
      }
      const L = int(rand, 6, 12);
      const l = int(rand, 4, 10);
      return test('paralelogram', `Dreptunghi ${L}×${l}. Aria, cm².`, L * l, [`Unghi 90°`, `${L} × ${l} = ${L * l}`], { level: 2 });
    }
  },
  intervale: {
    flash(rand) {
      const a = int(rand, 1, 4);
      const b = a + int(rand, 2, 5);
      return flash('interval', `Intervalul (${a}, ${b}] conține…`, [`${a + 1} … ${b}, dar nu pe ${a}`, `${a}, ${a + 1} … ${b}`, `doar ${a}`, `doar ${b}`], 'Paranteza rotundă taie capătul; cea dreaptă îl ține.');
    },
    test(rand) {
      const a = int(rand, -4, 1);
      const b = int(rand, 3, 8);
      const count = b - a;
      return test('interval', `Câte întregi sunt în (${a}, ${b}]?`, count, [`${a} nu e inclus`, `${b} e inclus`, `De la ${a + 1} la ${b}: ${count}`], { level: 2 });
    }
  },
  algebric: {
    flash(rand) {
      const kind = pick(rand, ['dif', 'patrat']);
      if (kind === 'patrat') {
        return flash('binom', '(a+b)² se deschide…', ['a² + 2ab + b²', 'a² + b²', 'a² − b²', '(a+b)(a−b)'], 'Pătratul sumei: două pătrate și dublul produsului.');
      }
      return flash('diferenta', 'a² − b² se descompune…', ['(a−b)(a+b)', '(a−b)²', 'a − b', '(a+b)²'], 'Diferență de pătrate.');
    },
    test(rand) {
      const kind = pick(rand, ['dif', 'sum']);
      const x = int(rand, 2, 6);
      if (kind === 'sum') {
        const val = x * x + 2 * x * 3 + 9;
        return test('binom', `Calculează (x+3)² pentru x=${x}.`, val, ['E x² + 6x + 9', `${x}² + 6×${x} + 9 = ${val}`], { level: 3 });
      }
      const val = (x + 3) * (x - 3);
      return test('diferenta', `Calculează (x+3)(x−3) pentru x=${x}.`, val, ['E x² − 9', `${x}² − 9 = ${x * x} − 9 = ${val}`], { level: 2 });
    }
  },
  functii: {
    flash(rand) {
      return flash('dreapta', 'f(x)=ax+b e…', ['o dreaptă', 'un cerc', 'un cub', 'un procent'], 'Funcție de gradul I: graficul e o dreaptă.');
    },
    test(rand) {
      const a = int(rand, -4, 4) || 2;
      const b = int(rand, -6, 8);
      const x = int(rand, -3, 5);
      const y = a * x + b;
      const sign = b >= 0 ? `+ ${b}` : `− ${-b}`;
      return test('dreapta', `f(x)=${a}x ${sign}. Calculează f(${x}).`, y, [`${a} × ${x} = ${a * x}`, `${a * x} ${sign} = ${y}`], { level: 2 });
    }
  },
  spatiu: {
    flash(rand) {
      const kind = pick(rand, ['vol', 'aria']);
      if (kind === 'aria') {
        return flash('desfasurare', 'Aria totală a cubului de latură a e…', ['6a²', 'a³', '4a', '2a'], 'Șase fețe pătrate.');
      }
      return flash('prisma', 'Volumul cubului de latură a e…', ['a × a × a', '6a', '4a', 'a + a + a'], 'Câte cubulețe umplu cutia.');
    },
    test(rand) {
      const kind = pick(rand, ['vol', 'aria']);
      const a = int(rand, 3, 8);
      if (kind === 'aria') {
        return test('desfasurare', `Cub de latură ${a}. Aria totală.`, 6 * a * a, [`6 × ${a}² = 6 × ${a * a} = ${6 * a * a}`], { level: 2 });
      }
      return test('desfasurare', `Cub de latură ${a}. Volumul.`, a ** 3, [`${a}³ = ${a ** 3}`], { level: 1 });
    }
  }
};

function generateMath(chapterId, kind, rand) {
  const pack = BY_CHAPTER[chapterId];
  if (!pack) return null;
  return kind === 'test' ? pack.test(rand) : pack.flash(rand);
}

module.exports = { generateMath, BY_CHAPTER };
