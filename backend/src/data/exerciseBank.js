// Exerciții originale de rezolvat (teste), nu grilă și nu copiate din culegeri.
// Programa 5–8 e doar lista de teme. Răspunsurile și pașii rămân pe server;
// clientul primește enunțul; rezolvarea apare abia la finalizarea testului.

const { EXTRAS } = require('./exerciseExtras');

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
    long: Boolean(extra.long),
    minWords: Number(extra.minWords) || 0,
    steps: Array.isArray(extra.steps) ? extra.steps.slice() : [],
    level: Number(extra.level) || 0
  };
}

const BANK = {
  'matematica:5:naturale': [
    ex('e5n1', 'puteri', 'Calculează 3² × 2³ − 4². Doar rezultatul.', ['20'], '3²=9, 2³=8, 9×8=72, 4²=16, 72−16=20.', { hint: 'Întâi puterile, apoi înmulțirea, apoi scăderea.', numeric: { value: 20, tolerance: 0 }, steps: ['3² = 9 și 2³ = 8', '9 × 8 = 72', '4² = 16', '72 − 16 = 20'] }),
    ex('e5n2', 'paranteze', 'Calculează 5 × [18 − (3 + 5)] : 2 + 7.', ['32'], 'Paranteza mică 8, apoi 18−8=10, 5×10=50, 50:2=25, 25+7=32.', { hint: 'Din interior spre exterior.', numeric: { value: 32, tolerance: 0 }, steps: ['3 + 5 = 8', '18 − 8 = 10', '5 × 10 = 50', '50 : 2 = 25', '25 + 7 = 32'] }),
    ex('e5n3', 'div3', 'Cel mai mic număr de 3 cifre care se împarte exact și la 2, și la 3, și la 5.', ['120'], 'Trebuie multiplu de 2, 3 și 5, deci de 30. Primul de 3 cifre: 120.', { hint: 'c.m.m.m.c. al lui 2, 3, 5.', numeric: { value: 120, tolerance: 0 }, steps: ['2, 3 și 5 sunt prime între ele', 'c.m.m.m.c. = 30', 'Cel mai mic de 3 cifre multiplu de 30 e 120', 'Verificare: 120 se termină cu 0 (la 2 și 5), 1+2+0=3 (la 3)'] }),
    ex('e5n4', 'prime', 'Un număr prim p, 40 < p < 50. Câte astfel de numere există? Scrie numărul lor.', ['3'], 'Între 40 și 50: 41, 43, 47. (45, 49 nu sunt prime.)', { hint: 'Taie parele, pe 45 și pe 49.', numeric: { value: 3, tolerance: 0 }, steps: ['Parele cad (divizibile cu 2)', '45 = 9×5, 49 = 7×7', 'Rămân 41, 43, 47 — deci 3'] })
  ],
  'matematica:5:fractii': [
    ex('e5f1', 'numitor', 'Calculează 5/6 − 1/3 + 1/2. Scrie ca fracție ireductibilă.', ['1', '1/1', '6/6'], 'Numitor 6: 5/6 − 2/6 + 3/6 = 6/6 = 1.', { hint: 'Adu totul la 6.', steps: ['1/3 = 2/6, 1/2 = 3/6', '5/6 − 2/6 + 3/6 = 6/6', '6/6 = 1'] }),
    ex('e5f2', 'amplif', 'Simplifică 18/24, apoi amplifică rezultatul cu 5. Ce fracție obții?', ['15/20'], '18/24 = 3/4, apoi ×5: 15/20.', { hint: 'Împarte 18 și 24 la 6.', steps: ['18:6=3, 24:6=4 → 3/4', '3×5=15, 4×5=20 → 15/20'] }),
    ex('e5f3', 'procent', 'O carte costă 80 lei. E redusă cu 15%, apoi mai tai 10 lei. Cât plătești?', ['58', '58 lei'], '15% din 80 = 12, rămân 68, minus 10 = 58.', { hint: 'Întâi procentul, apoi cei 10 lei.', numeric: { value: 58, tolerance: 0 }, steps: ['15% din 80 = 12 lei', '80 − 12 = 68', '68 − 10 = 58'] }),
    ex('e5f4', 'media', 'Notele 6, 8, 9 și 9. Media aritmetică. Scrie și cu virgulă dacă trebuie.', ['8', '8.0'], '(6+8+9+9):4 = 32:4 = 8.', { numeric: { value: 8, tolerance: 0 }, steps: ['Suma = 32', 'Sunt 4 note', '32 : 4 = 8'] })
  ],
  'matematica:5:geometrie': [
    ex('e5g1', 'unghi', 'Un unghi ascuțit și unul obtuz sunt alăturate și formează un unghi alungit (180°). Dacă ascuțitul e 47°, cât e obtuzul?', ['133', '133°'], '180 − 47 = 133°.', { numeric: { value: 133, tolerance: 0 }, steps: ['Alungit = 180°', '180 − 47 = 133', '133° e obtuz (între 90 și 180)'] }),
    ex('e5g2', 'perimetru', 'Un dreptunghi 12 cm × 5 cm. Un pătrat are același perimetru. Cât e latura pătratului, în cm?', ['8.5', '8,5', '17/2'], 'Perimetrul dreptunghiului: 2×(12+5)=34. Latura pătratului: 34:4=8,5 cm.', { hint: 'Mai întâi perimetrul, apoi împarte la 4.', numeric: { value: 8.5, tolerance: 0.01 }, steps: ['P = 2×(12+5) = 34 cm', 'Pătrat: 4 laturi egale', '34 : 4 = 8,5 cm'] }),
    ex('e5g3', 'arie-drep', 'O foaie 20 cm × 14 cm. Tai un pătrat de latură 6 cm din colț. Câtă arie rămâne, în cm²?', ['244'], '20×14=280, pătratul 36, 280−36=244.', { numeric: { value: 244, tolerance: 0 }, steps: ['Aria foii = 280 cm²', 'Aria tăieturii = 6×6 = 36', '280 − 36 = 244'] }),
    ex('e5g4', 'unitati', 'Un vas are 1,2 l. Bei 350 ml. Câți mililitri au rămas?', ['850', '850 ml'], '1,2 l = 1200 ml. 1200 − 350 = 850 ml.', { hint: 'Treci totul în ml.', numeric: { value: 850, tolerance: 0 }, steps: ['1 l = 1000 ml, deci 1,2 l = 1200 ml', '1200 − 350 = 850 ml'] })
  ],
  'matematica:6:multimi': [
    ex('e6m1', 'reuniune', 'A = {2, 4, 6, 8}, B = {1, 2, 3, 4}, C = {4, 8, 12}. Câte elemente are (A ∪ B) ∩ C?', ['2'], 'A ∪ B = {1,2,3,4,6,8}. Intersectat cu C rămân {4,8}. Două elemente.', { hint: 'Întâi reuniunea, apoi taie cu C.', numeric: { value: 2, tolerance: 0 }, steps: ['A ∪ B = {1, 2, 3, 4, 6, 8}', 'C = {4, 8, 12}', 'Comune: 4 și 8', 'Deci 2 elemente'] }),
    ex('e6m2', 'intersectie', 'Într-o clasă sunt 32 de elevi. 18 fac un cerc de mate, 16 un cerc de română, 7 le fac pe amândouă. Câți nu fac niciun cerc? Scrie doar numărul.', ['5'], '|M ∪ R| = 18 + 16 − 7 = 27. În afara cercurilor: 32 − 27 = 5.', { hint: 'Câți sunt în cel puțin un cerc, apoi scazi din 32.', numeric: { value: 5, tolerance: 0 }, steps: ['În cel puțin un cerc: 18 + 16 − 7 = 27', 'Nu aduni 18+16 fără să scoți intersecția', 'În niciun cerc: 32 − 27 = 5'] }),
    ex('e6m3', 'cmmdc', 'c.m.m.d.c.(48, 18) × c.m.m.m.c.(48, 18) : 48. Cât iese?', ['18'], 'Produsul c.m.m.d.c. și c.m.m.m.c. e chiar 48×18. Deci (48×18)/48 = 18.', { hint: 'Produsul c.m.m.d.c. și c.m.m.m.c. e produsul numerelor.', numeric: { value: 18, tolerance: 0 }, steps: ['48 = 2⁴×3, 18 = 2×3²', 'c.m.m.d.c. = 6, c.m.m.m.c. = 144', '6×144 = 864', '864 : 48 = 18'] }),
    ex('e6m4', 'cmmmc', 'Trei semafoare: unul la 8 s, unul la 12 s, unul la 18 s. După câte secunde se aprind din nou toate trei împreună, dacă au pornit odată?', ['72'], 'c.m.m.m.c.(8,12,18) = 72.', { hint: 'Descompune în factori, ia puterile cele mai mari.', numeric: { value: 72, tolerance: 0 }, steps: ['8 = 2³, 12 = 2²×3, 18 = 2×3²', 'c.m.m.m.c. = 2³ × 3² = 8 × 9 = 72'] })
  ],
  'matematica:6:proportii': [
    ex('e6p1', 'regula3', '8 m de stofă costă 96 lei. Cumperi 5 m și primești 10% reducere pe comandă. Cât plătești?', ['54', '54 lei'], '1 m = 12 lei, 5 m = 60, 10% din 60 = 6, rămân 54.', { hint: 'Întâi prețul celor 5 m, apoi reducerea.', numeric: { value: 54, tolerance: 0 }, steps: ['96 : 8 = 12 lei/m', '5 × 12 = 60 lei', '10% din 60 = 6', '60 − 6 = 54'] }),
    ex('e6p2', 'invers', '6 robinete umplu un bazin în 4 ore. Câte ore le-ar lua la 3 robinete, același debit?', ['8', '8 ore'], 'Invers: 6×4 = 24 = 3×8.', { numeric: { value: 8, tolerance: 0 }, steps: ['Produsul lucrători × ore rămâne', '6 × 4 = 24', '24 : 3 = 8'] }),
    ex('e6p3', 'procent6', 'Un preț crește cu 20%, apoi scade cu 20% din noul preț. Dacă a fost 100 lei, cât e acum?', ['96', '96 lei'], '120, apoi −24 = 96. Nu te întorci la 100.', { hint: 'Al doilea 20% e din 120, nu din 100.', numeric: { value: 96, tolerance: 0 }, steps: ['100 + 20% = 120', '20% din 120 = 24', '120 − 24 = 96'] }),
    ex('e6p4', 'scara', 'Hartă 1:50 000. Distanța reală e 2,5 km. Câți cm pe hartă?', ['5', '5 cm'], '2,5 km = 250 000 cm. 250000/50000 = 5 cm.', { hint: 'Treci km în cm.', numeric: { value: 5, tolerance: 0 }, steps: ['2,5 km = 250 000 cm', '1 cm pe hartă = 50 000 cm reali', '250 000 : 50 000 = 5'] })
  ],
  'matematica:6:intregi-rationale': [
    ex('e6i1', 'adunare', 'Calculează (−7) + 12 + (−9) − (−4).', ['0'], '−7+12=5, 5+(−9)=−4, −4−(−4)=0.', { numeric: { value: 0, tolerance: 0 }, steps: ['−7 + 12 = 5', '5 + (−9) = −4', '−4 − (−4) = 0'] }),
    ex('e6i2', 'modul', 'Calculează |−5| − |3 − 8| + |−2|.', ['2'], '|−5|=5, |3−8|=|−5|=5, |−2|=2. 5−5+2=2.', { numeric: { value: 2, tolerance: 0 }, steps: ['3 − 8 = −5, deci |3 − 8| = 5', '|−5| = 5 și |−2| = 2', '5 − 5 + 2 = 2'] }),
    ex('e6i3', 'ecuatie', 'Află x: 3x − 8 = −2x + 7.', ['3'], '3x+2x=7+8, 5x=15, x=3.', { numeric: { value: 3, tolerance: 0 }, steps: ['Treci −2x la stânga: 3x + 2x', 'Treci −8 la dreapta: 7 + 8', '5x = 15, x = 3'] }),
    ex('e6i4', 'rationale', 'Calculează (−3/4) + (5/6). Fracție ireductibilă.', ['1/12'], 'Numitor 12: −9/12 + 10/12 = 1/12.', { steps: ['c.m.m.m.c.(4, 6) = 12', '−3/4 = −9/12, 5/6 = 10/12', '−9/12 + 10/12 = 1/12'] })
  ],
  'matematica:6:triunghi': [
    ex('e6t1', 'suma180', 'Triunghi isoscel, unghiul din vârf 40°. Cât are un unghi de la bază?', ['70', '70°'], 'Baza: (180−40):2 = 70°.', { numeric: { value: 70, tolerance: 0 }, steps: ['Suma unghiurilor = 180°', 'Rămân 140° pentru bazele egale', '140 : 2 = 70°'] }),
    ex('e6t2', 'pitagora', 'Triunghi dreptunghic, catete 9 cm și 12 cm. Cât e perimetrul, în cm?', ['36'], 'Ipotenuza: 81+144=225=15². Perimetrul: 9+12+15=36.', { hint: 'Întâi ipotenuza, apoi aduni cele trei laturi.', numeric: { value: 36, tolerance: 0 }, steps: ['9² + 12² = 81 + 144 = 225', '√225 = 15', 'Perimetrul = 9 + 12 + 15 = 36'] }),
    ex('e6t3', 'cerc', 'Un cerc are diametrul 14 cm. Cât e lungimea cercului, dacă iei π = 22/7? Doar numărul.', ['44'], 'L = πd = (22/7)×14 = 44.', { numeric: { value: 44, tolerance: 0 }, steps: ['d = 14, π = 22/7', '(22/7) × 14 = 22 × 2 = 44'] }),
    ex('e6t4', 'opuse', 'Două drepte se taie. Un unghi e 62°. Cât e suma dintre opusul la vârf și unul alăturat?', ['180', '180°'], 'Opusul e tot 62°, alăturatul e 118°. 62+118=180°.', { hint: 'Opusele sunt egale; alăturatele fac 180°.', numeric: { value: 180, tolerance: 0 }, steps: ['Opusul la vârf = 62°', 'Alăturatul (suplementar) = 180 − 62 = 118°', 'Suma = 62 + 118 = 180°'] })
  ],
  'matematica:7:reale': [
    ex('e7r1', 'radical', 'Calculează √(9×16) − √9 × 2.', ['6'], '√144 − 3×2 = 12 − 6 = 6.', { numeric: { value: 6, tolerance: 0 }, steps: ['√(9×16) = √144 = 12', '√9 = 3, 3×2 = 6', '12 − 6 = 6'] }),
    ex('e7r2', 'ordin', 'Câți naturali n există cu 3 < √n < 6?', ['26'], '√n>3 ⇒ n≥10; √n<6 ⇒ n≤35. De la 10 la 35: 26 numere.', { hint: 'n ≥ 10 și n ≤ 35.', numeric: { value: 26, tolerance: 0 }, steps: ['√n > 3 ⇒ n ≥ 10', '√n < 6 ⇒ n ≤ 35', '35 − 10 + 1 = 26'] }),
    ex('e7r3', 'rationaliz', 'Raționalizează 6/√3 și simplifică. Scrie de forma a√3 (ex. 2√3).', ['2√3', '2*sqrt(3)', '2sqrt3', '2 sqrt 3'], '6/√3 × √3/√3 = 6√3/3 = 2√3.', { steps: ['Înmulțești sus și jos cu √3', '6√3 / 3', '2√3'] }),
    ex('e7r4', 'medii', 'Media aritmetică a lui 4 și 16 e 10. Media geometrică? Doar numărul.', ['8'], '√(4×16)=√64=8.', { numeric: { value: 8, tolerance: 0 }, steps: ['Media geometrică = √(ab)', '√(4×16) = √64 = 8'] })
  ],
  'matematica:7:ecuati': [
    ex('e7e1', 'cantar', 'Rezolvă (3x − 1)/2 = x + 4.', ['9'], '3x−1 = 2x+8, x=9.', { numeric: { value: 9, tolerance: 0 }, steps: ['Înmulțești cu 2: 3x − 1 = 2x + 8', '3x − 2x = 8 + 1', 'x = 9'] }),
    ex('e7e2', 'sistem', '2x + y = 11, x − y = 1. Află y.', ['3'], 'Din a doua x=y+1. 2(y+1)+y=11, 3y=9, y=3.', { numeric: { value: 3, tolerance: 0 }, steps: ['x = y + 1', '2(y + 1) + y = 11', '2y + 2 + y = 11', '3y = 9, y = 3'] }),
    ex('e7e3', 'substituie', '3x + 2y = 16, x = y + 2. Cât e x?', ['4'], '3(y+2)+2y=16, 5y=10, y=2, x=4.', { numeric: { value: 4, tolerance: 0 }, steps: ['Înlocuiești x: 3(y+2)+2y=16', '3y+6+2y=16', '5y=10, y=2', 'x=2+2=4'] }),
    ex('e7e4', 'solutie', 'Pentru perechea (1, −2) calculează 4x − y. Verifică și dacă x + 2y = −3. Scrie valoarea, apoi da sau nu (ex. 6 da).', ['6 da', '6, da', '6da'], '4·1 − (−2) = 6. 1 + 2·(−2) = −3. Deci 6 și da.', { tokens: ['6', 'da'], steps: ['4·1 − (−2) = 4 + 2 = 6', '1 + 2·(−2) = 1 − 4 = −3', 'Prima valoare e 6; a doua ecuație e verificată → da'] })
  ],
  'matematica:7:date': [
    ex('e7d1', 'origine', 'Punctul B e simetricul lui A(3, −2) față de origine. Scrie B ca (x, y).', ['(-3, 2)', '(-3,2)'], 'Simetric față de (0,0): schimbi ambele semne.', { steps: ['Originea inversează ambele coordonate', '3 → −3, −2 → 2', 'B(−3, 2)'] }),
    ex('e7d2', 'pereche', 'A(−1, 4) și C(5, −4). Cât e lungimea AC?', ['10'], 'Δx = 6, Δy = 8. 36+64=100, √100=10.', { hint: 'Pitagora pe diferențele de coordonate.', numeric: { value: 10, tolerance: 0 }, steps: ['5 − (−1) = 6', '−4 − 4 = −8, deci 8', '6² + 8² = 36 + 64 = 100', '√100 = 10'] }),
    ex('e7d3', 'citire', 'Tabel: x = 0, 1, 2 și y = 3, 5, 7. Care e y când x = 4, dacă regula e aceeași?', ['11'], 'y = 2x+3. Pentru x=4, y=11.', { numeric: { value: 11, tolerance: 0 }, steps: ['De la 3 la 5 la 7: +2 când x crește cu 1', 'y = 2x + 3', '2×4 + 3 = 11'] }),
    ex('e7d4', 'depend', 'y = −3x + 5. Pentru ce x avem y = −4?', ['3'], '−3x+5=−4, −3x=−9, x=3.', { numeric: { value: 3, tolerance: 0 }, steps: ['−3x + 5 = −4', '−3x = −9', 'x = 3'] })
  ],
  'matematica:7:geo7': [
    ex('e7g1', 'paralelogram', 'Paralelogram, o latură 9 cm, cealaltă 6 cm, un unghi 90°. Aria, cm²?', ['54'], 'Unghi 90°: e dreptunghi. 9×6=54.', { numeric: { value: 54, tolerance: 0 }, steps: ['Unghi 90° + laturi opuse paralele = dreptunghi', 'Aria = 9 × 6 = 54'] }),
    ex('e7g2', 'trig', 'Catete 8 și 15, ipotenuză 17. cos unghiului opus catetei 8? Fracție.', ['15/17'], 'Alăturata unghiului opus lui 8 e 15, ipotenuza 17.', { steps: ['cos = cateta alăturată / ipotenuză', 'Unghiul opus catetei 8 are alăturată 15', '15/17'] }),
    ex('e7g3', 'asemanare', 'Asemenea, raportul laturilor (mare:mic) e 3/2. Aria celui mare e 54. Aria celui mic?', ['24'], 'Raportul ariilor = (3/2)² = 9/4. 54 × 4/9 = 24.', { numeric: { value: 24, tolerance: 0 }, steps: ['Raportul ariilor = pătratul raportului laturilor', '(3/2)² = 9/4', 'Aria mică = 54 × 4/9 = 24'] }),
    ex('e7g4', 'thales', 'Paralele taie 4 cm și 6 cm pe o secantă. Pe a doua, segmentele sunt x și x+3. Află x.', ['6'], '4/6 = x/(x+3), 4x+12=6x, 12=2x, x=6.', { numeric: { value: 6, tolerance: 0 }, steps: ['4/6 = x/(x+3)', '4(x+3) = 6x', '4x + 12 = 6x', '12 = 2x, x = 6'] })
  ],
  'matematica:8:intervale': [
    ex('e8i1', 'inecuatie', 'Rezolvă −2x + 3 ≤ 11. Scrie intervalul, ex. [−4, +∞).', ['[-4, +inf)', '[-4,+inf)', '[-4, +∞)', '[-4,+∞)', 'x>=-4', 'x ≥ -4'], '−2x ≤ 8, x ≥ −4 (schimbi sensul).', { steps: ['−2x + 3 ≤ 11', '−2x ≤ 8', 'Împarți la −2 și schimbi sensul', 'x ≥ −4, adică [−4, +∞)'] }),
    ex('e8i2', 'semn', 'Rezolvă (x−1)(x+3) > 0. Reuniunea de intervale, ex. (−∞, −3) ∪ (1, +∞).', ['(-inf, -3) u (1, +inf)', '(-∞, -3) ∪ (1, +∞)', 'x<-3 sau x>1'], 'Rădăcini −3 și 1. Produs pozitiv în afara lor.', { steps: ['Rădăcini: x = 1 și x = −3', 'Parabola se deschide în sus: pozitiv în afara rădăcinilor', '(−∞, −3) ∪ (1, +∞)'] }),
    ex('e8i3', 'interval', 'Câte întregi sunt în (−2, 5]?', ['7'], '−1, 0, 1, 2, 3, 4, 5 — șapte. −2 nu e inclus.', { numeric: { value: 7, tolerance: 0 }, steps: ['−2 nu intră (capăt deschis)', '5 intră (capăt închis)', 'De la −1 la 5: 7 numere'] }),
    ex('e8i4', 'intersect-int', '([−1, 4) ∪ (2, 6]) ∩ [0, 5]. Scrie cât mai simplu.', ['[0, 5]', '[0,5]'], 'Reuniunea acoperă [−1, 6], intersecția cu [0, 5] e [0, 5].', { steps: ['[−1, 4) ∪ (2, 6] = [−1, 6]', 'Tai cu [0, 5]', 'Rămâne [0, 5]'] })
  ],
  'matematica:8:algebric': [
    ex('e8a1', 'patrat', 'Calculează (x+3)² − (x−1)² pentru x = 2. Poți folosi a² − b².', ['24'], '(x+3)² − (x−1)² = [(x+3)−(x−1)][(x+3)+(x−1)] = 4·(2x+2) = 8(x+1). Pentru x=2: 8·3=24.', { hint: 'Diferență de pătrate, sau înlocuiești x=2.', numeric: { value: 24, tolerance: 0 }, steps: ['a = x+3, b = x−1', 'a − b = 4, a + b = 2x + 2', 'Produsul: 4(2x+2) = 8(x+1)', 'Pentru x=2: 8×3 = 24'] }),
    ex('e8a2', 'diferenta', 'Descompune 9x² − 25, apoi calculează pentru x=2.', ['11'], '(3x−5)(3x+5). Pentru 2: (6−5)(6+5)=1×11=11.', { numeric: { value: 11, tolerance: 0 }, steps: ['9x² − 25 = (3x−5)(3x+5)', 'x=2: (6−5)(6+5) = 1×11 = 11'] }),
    ex('e8a3', 'factor', 'Scoate factorul, apoi calculează 4x² − 6x pentru x=5.', ['70'], '2x(2x−3). 10×(10−3)=70.', { numeric: { value: 70, tolerance: 0 }, steps: ['4x² − 6x = 2x(2x−3)', 'x=5: 10 × 7 = 70'] }),
    ex('e8a4', 'asemenea', 'Simplifică (x²−9)/(x−3) pentru x=5 (x≠3).', ['8'], '(x−3)(x+3)/(x−3)=x+3. 5+3=8.', { numeric: { value: 8, tolerance: 0 }, steps: ['x² − 9 = (x−3)(x+3)', 'Se taie x−3 (x≠3)', 'Rămâne x+3 = 8'] })
  ],
  'matematica:8:functii': [
    ex('e8f1', 'dreapta', 'f(x)=−2x+7. Pentru ce x avem f(x)=f(3)+4?', ['1'], 'f(3)=1, deci f(x)=5, −2x+7=5, x=1.', { numeric: { value: 1, tolerance: 0 }, steps: ['f(3) = −6 + 7 = 1', '1 + 4 = 5', '−2x + 7 = 5', '−2x = −2, x = 1'] }),
    ex('e8f2', 'medie', 'Date: 3, 7, 7, 10, 13. Media minus mediana. Cât iese?', ['1'], 'Media 8, mediana 7, diferența 1.', { numeric: { value: 1, tolerance: 0 }, steps: ['Suma 40, media 8', 'Șirul e deja ordonat, mediana e 7', '8 − 7 = 1'] }),
    ex('e8f3', 'mediana', 'Set: 2, 9, 4, 9, 1, 6. Mediana după ordonare.', ['5'], '1,2,4,6,9,9. Mijloc: (4+6)/2=5.', { numeric: { value: 5, tolerance: 0 }, steps: ['Ordine: 1, 2, 4, 6, 9, 9', 'N par: media celor două din mijloc', '(4+6)/2 = 5'] }),
    ex('e8f4', 'amplitudine', 'După ce scoți valoarea 20 din setul 3, 5, 20, 8, amplitudinea nouă?', ['5'], 'Fără 20: min 3, max 8, amplitudine 5.', { numeric: { value: 5, tolerance: 0 }, steps: ['Fără 20 rămân 3, 5, 8', 'Amplitudine = max − min = 8 − 3 = 5'] })
  ],
  'matematica:8:spatiu': [
    ex('e8s1', 'prisma', 'Prismă dreaptă, bază dreptunghi 6×4, înălțime 5. Aria laterală (fără baze), cm²?', ['100'], 'Perimetrul bazei 20, × h = 100.', { numeric: { value: 100, tolerance: 0 }, steps: ['Perimetrul bazei = 2×(6+4) = 20', 'Aria laterală = 20 × 5 = 100'] }),
    ex('e8s2', 'piramida', 'Piramidă regulată, bază pătrat de latură 6, apotema feței laterale 5. Aria laterală?', ['60'], '4 × (6×5/2) = 60.', { numeric: { value: 60, tolerance: 0 }, steps: ['O față triunghi: (6×5)/2 = 15', '4 fețe: 60'] }),
    ex('e8s3', 'cilindru', 'Cilindru r=3, h=4, π=3. Volumul aproximativ?', ['108'], 'πr²h ≈ 3×9×4=108.', { numeric: { value: 108, tolerance: 3 }, steps: ['r² = 9', '9 × 4 = 36', '36 × 3 = 108'] }),
    ex('e8s4', 'desfasurare', 'Cub de latură 5. Tai dintr-un colț un cubuleț de latură 2. Cât e volumul rămas?', ['117'], '125 − 8 = 117.', { numeric: { value: 117, tolerance: 0 }, steps: ['Volumul cubului mare = 5³ = 125', 'Cubulețul = 2³ = 8', '125 − 8 = 117'] })
  ],
  'romana:5:oral': [
    ex('e5o1', 'mesaj', 'Un anunț spune: „Mâine, ora 9, sala 3, aduceți atlasul.” În maximum 8 cuvinte, scrie ideea (ce, când). Trebuie să apară atlasul și ora.', ['atlas', '9'], 'Ancora e ce trebuie să faci și când, nu fiecare vorbă.', { long: true, tokens: ['atlas', '9'], steps: ['Ce: aduci atlasul', 'Când: mâine, ora 9', 'Unde (bonus): sala 3', 'Nu recopiezi tot anunțul'] }),
    ex('e5o2', 'intrebare', 'Transformă în întrebare clară: vrei să afli ora la care începe pauza. Scrie întrebarea (cu semnul ?).', ['cand', 'când', 'ora'], 'O întrebare scurtă: „Când începe pauza?” / „La ce oră…?”', { tokens: ['pauza'], steps: ['Spui ce vrei să afli: ora pauzei', 'Forma e întrebare, nu afirmație', 'Exemplu: „Când începe pauza?”'] }),
    ex('e5o3', 'povesti', 'În 3 părți scurte, numește scheletul unei povestiri orale. Folosește: început, apoi (sau mijloc), sfârșit.', ['inceput', 'sfarsit'], 'Început → ce s-a întâmplat → sfârșit.', { long: true, tokens: ['inceput', 'sfarsit'], steps: ['Început: cine, unde', 'Mijloc: ce s-a întâmplat', 'Sfârșit: cum s-a încheiat'] }),
    ex('e5o4', 'ton', 'Același cuvânt „da”, spus plictisit. Ce transmite tonul? Un cuvânt: plictiseală / dezinteres / enervare.', ['plictiseala', 'dezinteres', 'enervare', 'plictiseală'], 'Tonul schimbă mesajul la fel de mult ca vorba.', { steps: ['Cuvântul e „da” (acord)', 'Felul în care e spus e plictisit', 'Mesajul real: plictiseală sau dezinteres'] })
  ],
  'romana:5:lectura': [
    ex('e5l1', 'personaj', 'Text: „Ionel a pierdut mingea în parc. Mihai a găsit-o și i-a dat-o înapoi.” Cine e personajul principal? Scrie numele și un motiv (un verb din text).', ['ionel'], 'Principalul e cel pe care îl urmărim: Ionel pierde și primește înapoi. Mihai ajută.', { long: true, tokens: ['ionel'], minWords: 4, steps: ['Cine pornește acțiunea? Ionel pierde mingea', 'Mihai intervine, dar firul e al lui Ionel', 'Răspuns: Ionel + un verb (a pierdut / a primit)'] }),
    ex('e5l2', 'comparatie', '„E iute ca un iepure.” și „Vântul șoptește.” Ce figură e în prima, ce figură e în a doua? Scrie cele două cuvinte, în ordine.', ['comparatie, personificare', 'comparatie personificare', 'comparație, personificare'], 'Prima are „ca” (comparație). A doua dă vântului o faptă omenească (personificare).', { tokens: ['comparatie', 'personificare'], steps: ['„ca un iepure” = comparație', '„vântul șoptește” = personificare', 'Ordinea: comparație, personificare'] }),
    ex('e5l3', 'personif', '„Stelele râd pe cer.” E personificare sau comparație? Un cuvânt, apoi spune de ce (cine primește o faptă de om).', ['personificare'], 'Stelele (ne-om) râd (faptă omenească). Nu e „ca”.', { long: true, tokens: ['personificare'], minWords: 5, steps: ['Caută „ca” / „precum”: nu e', 'Stelele primesc „râd”', 'Deci personificare'] }),
    ex('e5l4', 'idee', 'Text: „Ana a udat florile, apoi a citit. Seara era liniștită.” Într-o frază, ideea principală — trebuie să apară Ana și ce a făcut.', ['ana'], 'Detaliile (seara liniștită) sprijină, nu înlocuiesc fapta.', { long: true, tokens: ['ana'], minWords: 6, steps: ['Cine? Ana', 'Ce face? Udă florile, apoi citește', '„Seara liniștită” e cadru, nu ideea'] })
  ],
  'romana:5:redactare': [
    ex('e5r1', 'pasi', 'Scrie, în ordine, cei 3 pași înainte să scrii un text (idei, plan, text).', ['idei', 'plan', 'text'], 'Fără plan, începutul se pierde.', { tokens: ['plan'], steps: ['Aduni ideile', 'Le pui în plan', 'Abia apoi scrii textul'] }),
    ex('e5r2', 'structura', 'Un text scurt are nevoie de trei părți. Numește-le în ordine.', ['inceput', 'cuprins', 'sfarsit'], 'Început, cuprins, sfârșit.', { tokens: ['inceput', 'sfarsit'], steps: ['Început: intra cititorul', 'Cuprins: ideea / fapta', 'Sfârșit: închizi, nu începi alt fir'] }),
    ex('e5r3', 'povestire', 'În 2 fraze, povestește o întâmplare inventată cu un ghiozdan. Trebuie un verb de acțiune și cuvântul „ghiozdan”.', ['ghiozdan'], 'Se vede o faptă, nu doar adjective.', { long: true, tokens: ['ghiozdan'], minWords: 10, steps: ['Alegi o faptă (cade, se pierde, e găsit)', 'Scrii 2 fraze, nu o listă de adjective', 'Verbul arată ce s-a întâmplat'] }),
    ex('e5r4', 'notite', 'Rescrie ca notiță scurtă (max 8 cuvinte): „Mâine aducem atlasul și creioanele colorate.” Trebuie „atlas”.', ['atlas'], 'Prinzi ce trebuie să faci, nu copiezi tot.', { tokens: ['atlas'], steps: ['Ce aduci: atlas + creioane', 'Când: mâine', 'Tai umplutura'] })
  ],
  'romana:5:limba5': [
    ex('e5lg1', 'predicat', '„Pisica doarme pe fotoliu.” Scrie subiectul și predicatul, despărțite prin virgulă.', ['pisica, doarme', 'pisica doarme'], 'Cine? Pisica. Ce face? Doarme. „pe fotoliu” e circumstanțial, nu predicat.', { tokens: ['pisica', 'doarme'], steps: ['Întrebarea „cine?” → pisica (subiect)', 'Întrebarea „ce face?” → doarme (predicat)', '„pe fotoliu” spune unde, nu e predicat'] }),
    ex('e5lg2', 'subiect', '„Cartea nouă a Anei e pe masă.” Care sunt cele două atribute (cuvinte care spun ceva despre carte)? Scrie-le.', ['noua', 'nouă', 'anei'], '„nouă” și „a Anei” determină „cartea”.', { tokens: ['noua'], steps: ['Despre ce vorbim? cartea', 'Cum e? nouă — atribut', 'A cui? a Anei — tot atribut'] }),
    ex('e5lg3', 'atribut', 'Corectează dacă e nevoie: „Subiectul în «Pisica doarme pe fotoliu» e fotoliul.” Scrie subiectul real.', ['pisica'], 'Fotoliul e locul. Cine doarme? Pisica.', { steps: ['Predicatul e „doarme”', 'Cine doarme? Pisica', 'Fotoliul răspunde la „unde?”, nu la „cine?”'] }),
    ex('e5lg4', 'sinonime', 'Înlocuiește „frumos” într-o frază despre un desen, fără să repeți „frumos”. Un cuvânt potrivit (drăguț, plăcut, îngrijit…).', ['dragut', 'drăguț', 'placut', 'plăcut', 'minunat', 'ingrijit', 'îngrijit', 'fermecator', 'fermecător'], 'Aproape ca sens, potrivit contextului.', { steps: ['Nu copiezi „frumos”', 'Alegi un sinonim care stă într-o frază despre un desen', 'Ex.: îngrijit, plăcut, drăguț'] })
  ],
  'romana:5:inter5': [
    ex('e5c1', 'legenda', 'În 2 fraze, spune cu cuvintele tale ce e o legendă (loc sau erou + poveste).', ['poveste', 'legenda'], 'Nu e știre: e un fir despre un loc sau un erou.', { long: true, tokens: ['poveste'], minWords: 8, steps: ['Legendă ≠ știre de azi', 'Are un loc sau un erou', 'Se povestește, nu se verifică ca o factură'] }),
    ex('e5c2', 'identitate', 'Numește 2 lucruri din care ți-ai putea povesti identitatea (familie, loc, limbă…).', ['familie', 'limba', 'loc', 'scoala', 'școală', 'nume'], 'Cine ești, fără laudă.', { tokens: [], long: true, minWords: 4, steps: ['Alegi două ancore: familie, loc, limbă, școală…', 'Nu e listă de laude', 'Sunt lucruri din care poți povesti'] }),
    ex('e5c3', 'noi', 'Un subiect potrivit pentru „eu și lumea mea apropiată”: scrie un exemplu (casă / școală / prieteni).', ['casa', 'scoala', 'prieteni', 'familie', 'sat', 'oras'], 'Cercul e mic, ca să-l descrii bine.', { steps: ['Cercul e aproape: casă, școală, prieteni', 'Nu „toată țara” dintr-odată', 'Un exemplu concret'] }),
    ex('e5c4', 'retell', 'Rezumă în o frază o legendă pe care o știi. Trebuie un nume de loc sau de erou.', ['legenda', 'erou', 'traian', 'miorita', 'manole', 'dochia'], 'Dacă nu poți povesti, n-ai luat-o cu tine.', { long: true, minWords: 8, steps: ['Alegi o legendă pe care o știi', 'Pui un nume (loc sau erou)', 'O frază, nu trei pagini'] })
  ],
  'romana:6:oral6': [
    ex('e6o1', 'rezumat-oral', 'Rezumă în o frază, păstrând cauza: „A plouat. Trenul a întârziat. Ana a ajuns la 10.” Trebuie Ana și de ce a întârziat.', ['ana', 'tren'], 'Idei în ordine, cu legătura cauză-efect, fără umplutură.', { long: true, tokens: ['ana'], minWords: 8, steps: ['Cauză: a plouat', 'Efect: trenul a întârziat', 'Urmare: Ana a ajuns la 10'] }),
    ex('e6o2', 'parere', 'O părere + un motiv: „Îmi place lectura în pauză pentru că…” — termină tu cu un motiv concret.', ['pentru ca', 'pentru că'], 'Nu doar „îmi place”: de ce?', { long: true, tokens: ['pentru'], minWords: 8, steps: ['Părerea: îți place lectura în pauză', 'Lipești „pentru că”', 'Motivul e concret (liniște, timp, o carte)'] }),
    ex('e6o3', 'dialog', 'Scrie o replică de dialog în care îl lași pe celălalt să vorbească (o întrebare, cu ?).', ['?'], 'Întrebi, asculți, răspunzi.', { steps: ['Nu e monolog', 'Pui o întrebare', 'Semnul ? arată că lași loc celuilalt'] }),
    ex('e6o4', 'ordine', 'Pune în ordine, despărțite prin liniuță: sfârșit, început, mijloc — în ordinea corectă a rezumatului.', ['inceput-mijloc-sfarsit', 'început-mijloc-sfârșit', 'inceput - mijloc - sfarsit'], 'Păstrezi firul, nu broderia.', { steps: ['Rezumatul urmează timpul poveștii', 'Întâi începutul, apoi mijlocul', 'Sfârșitul închide, nu deschide'] })
  ],
  'romana:6:lectura6': [
    ex('e6l1', 'pers1', '„M-am așezat și am deschis jurnalul.” La ce persoană e narațiunea? Scrie I sau III și un pronume din text care te-a ajutat.', ['i', '1', 'intai', 'întâi', 'persoana i'], '„m-am”, „am” = persoana I (eu).', { tokens: ['am'], long: true, steps: ['Caută verbele: m-am așezat, am deschis', 'Sunt la persoana I', 'Nu e „el a deschis” (persoana III)'] }),
    ex('e6l2', 'stire', 'O știre trebuie să răspundă la 4 întrebări de bază. Numește-le (cine, ce, unde, când).', ['cine', 'ce', 'unde', 'cand'], 'Apoi vin detaliile.', { tokens: ['cine', 'ce'], steps: ['Cine? Ce s-a întâmplat?', 'Unde? Când?', 'Detaliile vin după aceste patru'] }),
    ex('e6l3', 'deduc', 'Text: „Ușa e deschisă, ghiozdanul e pe hol, dar nimeni nu răspunde.” Ce poți deduce, fără să inventezi un film? O frază.', ['plecat', 'afara', 'nu e', 'gol', 'lipseste', 'nimeni'], 'Indicii: e gol acasă / au ieșit. Nu „a fost o spargere” fără dovadă.', { long: true, minWords: 6, steps: ['Ușa deschisă + ghiozdan + nimeni nu răspunde', 'Deducție prudentă: probabil nu e nimeni în casă', 'Nu sari la o poveste de film'] }),
    ex('e6l4', 'email', 'Cine, cui, de ce — completează pentru un e-mail către diriginte despre o absență. O frază.', ['diriginte', 'absenta', 'absență'], 'Destinatar + scop.', { long: true, tokens: ['dirig'], minWords: 8, steps: ['Cine scrie: tu / părintele', 'Cui: dirigintelui', 'De ce: anunți o absență'] })
  ],
  'romana:6:redactare6': [
    ex('e6r1', 'destinatar', 'Scrii bunicii sau directorului. Pentru cine e tonul mai formal? Un cuvânt.', ['director', 'directorului'], 'Tonul urmează destinatarul.', { steps: ['Bunica: ton apropiat', 'Directorul: ton formal', 'Alegi după cine citește'] }),
    ex('e6r2', 'jurnal', 'Scrie 2 fraze de jurnal: ce ți s-a întâmplat azi + ce ai simțit. Folosește „am”.', ['am'], 'E pentru tine, dar tot e în ordine.', { long: true, tokens: ['am'], minWords: 10, steps: ['O faptă (ce s-a întâmplat)', 'O stare (ce ai simțit)', 'Persoana I: „am…”'] }),
    ex('e6r3', 'emotie', 'Descrie bucuria fără să scrii cuvântul „bucurie”. Un gest sau un gând, minimum 6 cuvinte.', ['zambet', 'zâmbet', 'ochi', 'sarit', 'am'], 'Detaliul bate eticheta.', { long: true, minWords: 6, steps: ['Interzis: cuvântul „bucurie”', 'Arăți un gest (zâmbet, salt) sau un gând', 'Cititorul recunoaște starea'] }),
    ex('e6r4', 'intamplare', 'Numește cele 3 momente ale unei întâmplări (început, tensiune / mijloc, capăt).', ['inceput', 'sfarsit', 'capat', 'mijloc', 'tensiune'], 'Nu un singur adjectiv.', { tokens: ['inceput'], steps: ['Început: intrarea în faptă', 'Mijloc / tensiune: ce se încurcă', 'Capăt: cum se rezolvă'] })
  ],
  'romana:6:limba6': [
    ex('e6g1', 'cd', '„Citesc o carte interesantă în parc.” Care e complementul direct și care e circumstanțialul de loc? Scrie: CD = …, loc = …', ['carte', 'parc'], 'Pe cine / ce? o carte. Unde? în parc. „interesantă” e atribut.', { tokens: ['carte', 'parc'], steps: ['Predicat: citesc', 'Ce citesc? o carte → CD', 'Unde? în parc → circumstanțial de loc', '„interesantă” determină cartea (atribut)'] }),
    ex('e6g2', 'nume-pred', '„El este elev silitor.” Care e numele predicativ? Un cuvânt (centrul).', ['elev'], 'Verb de legătură „este” + nume predicativ „elev”. „silitor” e atribut.', { steps: ['„este” = verb de legătură', 'Ce este el? elev', '„silitor” spune cum e elevul, nu e predicativul'] }),
    ex('e6g3', 'circ', '„Alergăm în parc în fiecare dimineață.” Ce fel de circumstanțial e „în fiecare dimineață”? (loc / timp / mod)', ['timp'], 'Când? = timp. „în parc” ar fi loc.', { steps: ['„în parc” = unde = loc', '„în fiecare dimineață” = când = timp', 'Răspunsul cerut: timp'] }),
    ex('e6g4', 'diftong', 'Compară „stea” și „po-e-zie” (la „poezie”). În care e diftong și în care e hiat? Scrie: stea = …, poezie = …', ['diftong', 'hiat'], 'stea: ea în aceeași silabă (diftong). poezie: o-e în silabe diferite (hiat).', { tokens: ['diftong', 'hiat'], steps: ['Diftong: două vocale, o silabă', '„stea” se silabisește stea — ea împreună', '„poezie”: po-e-zi-e — o și e se despart (hiat)'] })
  ],
  'romana:6:inter6': [
    ex('e6c1', 'popular', 'Scrie un proverb pe care îl știi, cu cuvintele tale sau clasic (minimum 5 cuvinte).', ['cine', 'nu', 'face', 'lucru'], 'O idee scurtă, verificată de mulți.', { long: true, minWords: 5, steps: ['Proverbul e o idee scurtă, nu o poveste', 'Poți cita clasic sau reformula', 'Are o învățătură'] }),
    ex('e6c2', 'valori', 'Dintr-un basm, numește o valoare văzută în fapte (curaj, hărnicie…). Un cuvânt.', ['curaj', 'harnicie', 'hărnicie', 'cinste', 'prietenie', 'dreptate'], 'Nu slogan: ce face eroul.', { steps: ['Te gândești la o faptă din basm', 'Ce valoare se vede? (curaj, cinste…)', 'Nu scrii „e frumos”'] }),
    ex('e6c3', 'compar-leg', 'În o frază, ce cauți când compari două legende (comun vs deosebire).', ['comun', 'aseman', 'deoseb'], 'Nu e concurs: e oglindă.', { long: true, minWords: 6, steps: ['Ce au la fel (comun)', 'Ce au diferit (loc, erou, motiv)', 'Nu zici care e „mai bună”'] }),
    ex('e6c4', 'respect', 'Completează: când vorbești despre alt popor, descrii, nu… (un verb).', ['ironizezi', 'jignesti', 'jignești', 'bati joc', 'bați joc'], 'Curiozitate, nu rang.', { steps: ['Descrii ce vezi / ce citești', 'Nu ironizezi și nu jignești', 'Curiozitatea ține ușa deschisă'] })
  ],
  'romana:7:oral7': [
    ex('e7o1', 'sinteza', 'Pentru o prezentare de 2 minute, scrie în 3 cuvinte planul: idee, exemplu, închidere.', ['idee', 'exemplu'], 'Sinteză ≠ copie de 10 pagini.', { tokens: ['idee', 'exemplu'], steps: ['O idee, nu trei fire', 'Un exemplu care se vede', 'O închidere scurtă'] }),
    ex('e7o2', 'timp', 'Dacă treci de timp, tai din mijloc, salut sau capăt? Un cuvânt.', ['mijloc'], 'Păstrezi deschiderea și închiderea.', { steps: ['Salutul anunță despre ce e', 'Capătul închide ideea', 'Tai din mijloc (exemple în plus)'] }),
    ex('e7o3', 'exemplu', 'Dă un exemplu concret (o frază) pentru ideea „pauza e zgomotoasă”. Trebuie un verb de acțiune.', ['pauza', 'zgomot', 'striga', 'alearga', 'aleargă', 'strigă'], 'Un exemplu bun e scurt și se vede.', { long: true, minWords: 6, steps: ['Nu repeți „e zgomotoasă”', 'Arăți o faptă: strigă, aleargă, trântesc uși', 'O frază, nu un eseu'] }),
    ex('e7o4', 'voce', 'Numește 2 lucruri care țin de controlul vocii (volum, claritate, pauze…).', ['volum', 'claritate', 'pauze', 'pauza'], 'Se aude în spate, fără urlet.', { tokens: [], long: true, minWords: 2, steps: ['Volum: se aude, nu urlă', 'Claritate: se înțeleg cuvintele', 'Pauze: la idei, nu la fiecare virgulă'] })
  ],
  'romana:7:lectura7': [
    ex('e7l1', 'epic', 'Un text are acțiune, personaje și un narator. E, de regulă, epic, liric sau dramatic? Un cuvânt + de ce (o frază).', ['epic'], 'Se povestește ceva: acțiune + personaje.', { long: true, tokens: ['epic'], minWords: 6, steps: ['Are acțiune și personaje → epic', 'Liricul pune starea, nu plotul', 'Dramaticul e de jucat (replici, scene)'] }),
    ex('e7l2', 'liric', 'Un text pune în față o stare, nu un plot. Cum îl numești? Un cuvânt.', ['liric'], 'Cine vorbește și ce simte.', { steps: ['Nu urmărești „ce s-a întâmplat apoi”', 'Urmărești vocea și starea', 'Genul: liric'] }),
    ex('e7l3', 'dovada', 'Ai zis „personajul e timid”. Scrie o frază de dovadă care începe cu „în text”.', ['in text', 'în text'], 'Arăți locul, nu ghicești.', { long: true, tokens: ['text'], minWords: 6, steps: ['Eticheta fără citat nu ține', 'Începi cu „în text”', 'Pui o faptă sau o vorbă a personajului'] }),
    ex('e7l4', 'dramatic', 'De ce e un text dramatic „de jucat”? Un motiv (replici / scene / conflict). O frază.', ['replici', 'scene', 'conflict', 'scena'], 'Citit, tot auzi voci.', { long: true, minWords: 6, steps: ['Are replici, nu doar poveste', 'E tăiat în scene', 'Conflictul se joacă, nu doar se povestește'] })
  ],
  'romana:7:redactare7': [
    ex('e7rd1', 'caracterizare', 'Caracterizează un coleg în 2 fraze fără „bun” și „frumos” — doar fapte sau vorbe.', ['el', 'ea', 'cand', 'când'], 'Arată, nu eticheta.', { long: true, minWords: 10, steps: ['Interzis: bun, frumos', 'O faptă (ce face)', 'O vorbă (ce spune)'] }),
    ex('e7rd2', 'cerere', 'Numește 3 piese ale unei cereri (destinatar, ce soliciți, date).', ['destinatar', 'date'], 'E un text cu scop oficial.', { tokens: ['destinatar'], steps: ['Cui i te adresezi', 'Ce soliciți, clar', 'Date: ale tale și ale cererii'] }),
    ex('e7rd3', 'recenzie', 'O recenzie: titlul unei cărți + un motiv dacă o recomanzi. O frază cu „pentru”.', ['pentru', 'pentru ca'], 'Cititorul decide dacă se apropie.', { long: true, minWords: 8, steps: ['Titlul (ce recenzezi)', 'Recomand sau nu', 'Un motiv cu „pentru”'] }),
    ex('e7rd4', 'scop', 'Înainte să scrii, ce întrebi întâi? (cu ce scop / pentru cine)', ['scop', 'pentru cine', 'destinatar'], 'Scopul alege forma.', { steps: ['Pentru cine scrii?', 'Cu ce scop?', 'Apoi alegi cerere, recenzie, povestire'] })
  ],
  'romana:7:limba7': [
    ex('e7lg1', 'fraza', '„Am plecat și am ajuns târziu, pentru că ploua.” Câte propoziții are fraza? Scrie numărul.', ['3', 'trei'], 'Trei predicații: am plecat, am ajuns, ploua.', { hint: 'Numără predicatele, nu virgulele.', numeric: { value: 3, tolerance: 0 }, steps: ['Predicat 1: am plecat', 'Predicat 2: am ajuns', 'Predicat 3: ploua', 'Trei propoziții'] }),
    ex('e7lg2', 'cauza', '„Am rămas acasă pentru că ploua.” Ce exprimă a doua parte? (cauză / scop / loc) + rescrie-o ca răspuns la „de ce?”.', ['cauza', 'cauză'], 'Răspunde la „de ce?”: pentru că ploua.', { tokens: ['cauza'], long: true, steps: ['Întrebarea: de ce ai rămas acasă?', 'Răspuns: pentru că ploua', 'Raport: cauză, nu scop'] }),
    ex('e7lg3', 'pleonasm', 'Corectează: „Coboară jos pe scări.” Scrie varianta fără surplus (fără „jos”).', ['coboara', 'coboară'], 'Pleonasm: cobori deja înseamnă în jos.', { tokens: ['coboara'], steps: ['„a coborî” include direcția în jos', '„jos” e surplus', 'Rămâne: „Coboară pe scări.”'] }),
    ex('e7lg4', 'familie', 'Un cuvânt din familia lexicală a lui „carte” (alta decât „carte”).', ['carticica', 'cărticică', 'carturar', 'cărturar', 'incartirui', 'cartureasa', 'cărturărie'], 'Aceeași rădăcină, nu „a citi” (familie înrudită, dar alt cuvânt-bază).', { steps: ['Rădăcina: cart-', 'Derivate: cărticică, cărturar…', 'Nu pui un sinonim din altă familie'] })
  ],
  'romana:7:inter7': [
    ex('e7c1', 'mit', 'În 2 fraze, un mit românesc pe care îl știi (nume + ce se întâmplă).', ['zamolxe', 'miorita', 'traian', 'manole', 'dochia'], 'Nu e știre: e un fir de origini / eroi.', { long: true, minWords: 8, steps: ['Alegi un mit (Manole, Dochía, Miorița…)', 'Numele + o faptă', 'Nu e rezumat de manual copiat'] }),
    ex('e7c2', 'retell', 'Testul că ai înțeles: spune mitul în o frază, cu cuvintele tale.', ['a fost', 'erou', 'zeu', 'legenda', 'mit'], 'Dacă se rupe firul, mai citești.', { long: true, minWords: 8, steps: ['O frază, nu trei pagini', 'Cuvintele tale, nu titlul gol', 'Se vede cine face ce'] }),
    ex('e7c3', 'intalnire', 'Limba se schimbă când oamenii se… (un verb).', ['intalnesc', 'întâlnesc', 'intalnire', 'imprumuta', 'împrumută'], 'Cuvintele călătoresc.', { steps: ['Oamenii se întâlnesc, fac comerț, citesc', 'Iau cuvinte unii de la alții', 'Limba se mișcă'] }),
    ex('e7c4', 'respect7', 'Față de un mit al altora, primul verb potrivit: asculți / ironizezi?', ['asculti', 'asculți'], 'Curiozitate > rang.', { steps: ['Întâi asculți / citești', 'Apoi întrebi', 'Ironia închide ușa'] })
  ],
  'romana:8:oral8': [
    ex('e8o1', 'argument', 'O părere + „pentru că” + un motiv, despre teme în weekend. Minimum 8 cuvinte.', ['pentru ca', 'pentru că'], '„Pentru că” e scheletul.', { long: true, tokens: ['pentru'], minWords: 8, steps: ['Părerea (de acord / nu)', '„pentru că”', 'Un motiv care se poate discuta, nu „doar pentru că”'] }),
    ex('e8o2', 'info-intentie', 'O știre vrea să anunțe; un discurs de campanie vrea să… (un verb).', ['convinga', 'convingă', 'convinge'], 'Informație vs intenție.', { steps: ['Știrea: anunță fapte', 'Campania: vrea să te miște', 'Verbul: să convingă'] }),
    ex('e8o3', 'ascult8', 'Într-o dezbatere, înainte să adaugi, ce faci cu ideea celuilalt? Un verb.', ['reiei', 'repeți', 'reformulezi', 'rezumi'], 'Arăți că ai auzit.', { steps: ['Nu sari peste ce-a zis celălalt', 'Reiei / rezumi ideea', 'Apoi adaugi argumentul tău'] }),
    ex('e8o4', 'surasa', 'Numește o sursă scurtă pentru o afirmație din clasă (text, oră, martor).', ['text', 'ora', 'oră', 'profesor', 'manual', 'martor'], 'Nu e bibliografie de 2 pagini.', { steps: ['De unde știi?', 'Text, oră, martor, manual', 'O sursă, nu zece'] })
  ],
  'romana:8:lectura8': [
    ex('e8l1', 'tema', 'Tema e „despre ce e, în mare”. Pentru un text despre prietenie la școală, scrie tema în 4-6 cuvinte. Trebuie „prieten”.', ['prietenie'], 'Nu un citat magic: despre ce e.', { tokens: ['prieten'], steps: ['Nu copiezi un vers', 'Spui despre ce e, în mare', 'Ex.: prietenia încercată la școală'] }),
    ex('e8l2', 'esential', 'Tai un detaliu: rămâne sensul? Ce e esențial — tema sau ornamentul? Un cuvânt.', ['tema', 'temă'], 'Ornamentul e culoare, nu schelet.', { steps: ['Tai un adjectiv, o imagine', 'Dacă sensul rămâne, era ornament', 'Scheletul e tema'] }),
    ex('e8l3', 'necunoscut', 'La un text necunoscut, ce faci întâi: citești firul sau sari la grilă? Un cuvânt.', ['citesti', 'citești', 'firul', 'textul'], 'Textul din față, nu comentariul de acasă.', { steps: ['Întâi textul', 'Apoi întrebările', 'Nu importi un comentariu gata'] }),
    ex('e8l4', 'nonlit', 'Un afiș e text nonliterar. Ce întrebi: cine, cui, ce vrea? Răspunde pe scurt pentru un afiș de serbare.', ['serbare', 'cine', 'cui'], 'Forma e parte din mesaj.', { long: true, minWords: 8, steps: ['Cine anunță (școala, clasa)', 'Cui (părinți, elevi)', 'Ce vrea (să vii la serbare, ora, locul)'] })
  ],
  'romana:8:redactare8': [
    ex('e8r1', 'arg', 'Scheletul argumentativ: părere + motive + … (ce lipsește?)', ['exemple', 'exemplu'], 'Se vede scheletul.', { steps: ['Părerea (teza)', 'Motivele (de ce)', 'Exemplele (unde se vede)'] }),
    ex('e8r2', 'paragraf', 'Un paragraf = câte idei de bază? Un număr.', ['1', 'o idee', 'una'], 'Un bloc, o treabă.', { numeric: { value: 1, tolerance: 0 }, steps: ['Un paragraf = o idee', 'Ideea următoare: paragraf nou', 'Nu amesteci trei fire într-un bloc'] }),
    ex('e8r3', 'incheiere', 'Încheierea aduce un subiect nou? da sau nu.', ['nu'], 'Ușa se închide, nu se deschide alt coridor.', { steps: ['Încheierea leagă ce-ai zis', 'Nu deschizi un capitol nou', 'Răspuns: nu'] }),
    ex('e8r4', 'en-scriere', 'La EN, primul lucru la textul scris: plan sau inspirație de moment? Un cuvânt.', ['plan'], 'Capăt + mijloc, chiar dacă e creativ.', { steps: ['Timpul e scurt', 'Planul ține firul', 'Inspirația fără plan sare peste capăt'] })
  ],
  'romana:8:limba8': [
    ex('e8g1', 'acord', 'Corectează: „Elevii merge la curs în fiecare luni.” Scrie propoziția corectă.', ['elevii merg', 'elevii merg la curs'], 'Subiectul „elevii” (plural) cere „merg”, nu „merge”.', { tokens: ['merg'], steps: ['Subiect: elevii (plural)', 'Verbul trebuie la plural: merg', '„în fiecare luni” rămâne'] }),
    ex('e8g2', 'acord2', '„Fata și băiatul … la poartă.” Completează verbul la forma potrivită (aleargă).', ['alearga', 'aleargă'], 'Două subiecte → predicat la plural.', { steps: ['Fata + băiatul = două subiecte', 'Predicatul e la plural', 'aleargă'] }),
    ex('e8g3', 'punctuatie', 'Pune virgulele: „Când plouă ies cu umbrela deși e aproape.” Scrie propoziția.', ['cand ploua, ies', 'când plouă, ies'], 'Virgula după circumstanțialul antepus; a doua, înainte de „deși”, e acceptată.', { tokens: ['ies'], steps: ['„Când plouă” e antepus → virgulă', '„ies cu umbrela” e principala', '„deși e aproape” e concesivă: virgulă înainte de „deși”'] }),
    ex('e8g4', 'vocab8', 'Alege cuvântul potrivit: „A făcut o … greșeală” (gravă / grea). Unul.', ['grava', 'gravă'], 'Greșeala e gravă (serioasă), nu „grea” ca o geantă.', { steps: ['„greu” = greutate / dificultate', '„grav” = serios, important', 'Colocăm: greșeală gravă'] })
  ],
  'romana:8:inter8': [
    ex('e8c1', 'punte', 'Cu ce unelte citești un text „al lumii”? Numește 2 (idee, dovadă, ton).', ['idee', 'dovada', 'dovadă', 'ton'], 'Uneltele de română călătoresc.', { tokens: ['idee'], steps: ['Aceeași grilă: idee, dovadă, ton', 'Nu schimbi uneltele pentru că e „străin”', 'Citești, nu judeci rangul'] }),
    ex('e8c2', 'noi-ceilalti', '„Noi și ceilalți”: primul verb — descrii sau cobori?', ['descrii', 'descrie'], 'Curiozitate, nu rang.', { steps: ['Întâi descrii ce vezi / citești', 'Nu cobori pe celălalt', 'Apoi compari, dacă e cazul'] }),
    ex('e8c3', 'reflectie', 'O reflecție întreabă „ce rămâne după…”. Completează în 5-8 cuvinte.', ['dupa', 'după'], 'Nu doar relatare.', { long: true, minWords: 5, steps: ['Nu repeți faptele', 'Întrebi ce rămâne după', 'O frază scurtă, nu un eseu'] }),
    ex('e8c4', 'lume-lit', 'De ce merită un model din literatura lumii? O frază cu „aceleași” sau „și aiurea”.', ['aceleasi', 'aceleași', 'aiurea', 'lume'], 'Te uiți afară ca să te vezi.', { long: true, minWords: 6, steps: ['Nu e exotism de album', 'Cauți aceleași întrebări, și aiurea', 'Te vezi mai clar'] })
  ]
};

function chapterKey(subject, grade, chapterId) {
  return `${String(subject || '').toLowerCase()}:${String(grade || '')}:${String(chapterId || '')}`;
}

function listChapterExercises(subject, grade, chapterId) {
  const key = chapterKey(subject, grade, chapterId);
  const extra = EXTRAS[key] || [];
  const base = BANK[key] || [];
  return [...extra, ...base].map((item, index) => ({
    ...item,
    level: item.level || index + 1
  }));
}

function listExercisePoints(subject, grade, chapterId) {
  return [...new Set(listChapterExercises(subject, grade, chapterId).map(item => item.point))];
}

function allExerciseKeys() {
  return Object.keys(BANK);
}

function findExercise(id) {
  const needle = String(id || '');
  if (needle.startsWith('g:')) {
    try {
      const { fromGeneratedId } = require('./itemGenerator');
      const generated = fromGeneratedId(needle);
      if (generated && generated.prompt) return generated;
    } catch {
      return null;
    }
  }
  for (const key of Object.keys(BANK)) {
    const found = listChapterExercises(...key.split(':')).find(item => item.id === needle);
    if (found) return found;
  }
  for (const list of Object.values(EXTRAS)) {
    const found = list.find(item => item.id === needle);
    if (found) return found;
  }
  return null;
}

function normalizeAnswer(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/,/g, '.')
    .replace(/[–—−]/g, '-')
    .replace(/[∞]/g, 'inf')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/[^\p{L}\p{N}.\-/+()?! ]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripWrap(value) {
  return normalizeAnswer(value).replace(/[{}]/g, '').replace(/\s/g, '');
}

function answersMatch(given, exercise) {
  const raw = String(given || '').trim();
  if (!raw) return false;
  const g = normalizeAnswer(raw);
  const compact = stripWrap(g);

  if ((exercise.answers || []).some(answer => {
    const a = normalizeAnswer(answer);
    return a && (g === a || compact === stripWrap(a) || (a.length >= 4 && g.includes(a)));
  })) {
    return true;
  }

  const tokens = (exercise.tokens || []).map(normalizeAnswer).filter(Boolean);
  if (tokens.length && tokens.every(token => g.includes(token))) return true;

  if (exercise.minWords && raw.split(/\s+/).filter(Boolean).length >= exercise.minWords && (exercise.answers || []).some(answer => {
    const a = normalizeAnswer(answer);
    return !a || a.length < 3 || g.includes(a);
  })) {
    return true;
  }

  if (exercise.numeric && Number.isFinite(Number(exercise.numeric.value))) {
    const parsed = Number(String(g).replace(/[^\d.-]/g, ''));
    if (Number.isFinite(parsed) && Math.abs(parsed - Number(exercise.numeric.value)) <= (Number(exercise.numeric.tolerance) || 0)) {
      return true;
    }
  }
  return false;
}

function publicExercise(item, review = false) {
  return {
    id: item.id,
    point: item.point,
    prompt: item.prompt,
    hint: item.hint || '',
    level: item.level || 0,
    review,
    long: Boolean(item.long || (item.minWords && item.minWords >= 5))
  };
}

function checkExercise(id, given) {
  const exercise = findExercise(id);
  if (!exercise) return { ok: false, found: false };
  const { gradeWriting, isWritingItem } = require('../grading/writingRubric');
  const writing = isWritingItem(exercise);
  const rubric = writing ? gradeWriting(given, exercise) : null;
  const tokenOk = answersMatch(given, exercise);
  const correct = writing ? Boolean((rubric && rubric.ok) || tokenOk) : tokenOk;
  return {
    ok: correct,
    found: true,
    explain: rubric ? rubric.teacher : exercise.explain,
    sample: writing ? (rubric?.sampleHint || exercise.explain) : (exercise.answers[0] || ''),
    steps: exercise.steps || [],
    point: exercise.point || '',
    prompt: exercise.prompt || '',
    rubric
  };
}

function checkMany(pairs) {
  return (pairs || []).map(pair => {
    const id = pair.card_id || pair.id;
    const given = pair.answer == null ? '' : pair.answer;
    const result = checkExercise(id, given);
    return {
      id,
      point: result.point || '',
      prompt: result.prompt || '',
      given: String(given || ''),
      skipped: !String(given || '').trim(),
      ok: result.ok,
      found: result.found,
      explain: result.explain || '',
      sample: result.sample || '',
      steps: result.steps || [],
      rubric: result.rubric || null
    };
  });
}

function scoreToGrade(correct, total) {
  const t = Math.max(1, Number(total) || 0);
  const c = Math.max(0, Number(correct) || 0);
  return Math.max(1, Math.min(10, Math.round((c / t) * 10)));
}

function encouragementFor(grade) {
  if (grade >= 9) return 'Bravo. Ții calea, chiar și unde se îngroașă.';
  if (grade >= 7) return 'Bun ritm. Uită-te la cele greșite — acolo crești.';
  if (grade >= 5) return 'Ai prins o parte. Reia punctele slabe, apoi mai dai un test.';
  return 'Nu e capăt. Lucrează pe foaie, cere mentorului pașii, apoi mai încerci.';
}

module.exports = {
  BANK,
  chapterKey,
  listChapterExercises,
  listExercisePoints,
  allExerciseKeys,
  findExercise,
  normalizeAnswer,
  answersMatch,
  publicExercise,
  checkExercise,
  checkMany,
  scoreToGrade,
  encouragementFor
};
