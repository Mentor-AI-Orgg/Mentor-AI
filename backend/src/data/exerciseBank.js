// Exerciții originale de rezolvat (teste), nu grilă și nu copiate din culegeri.
// Programa 5–8 e doar lista de teme. Răspunsurile și pașii rămân pe server;
// clientul primește enunțul; rezolvarea apare abia la finalizarea testului.

const { EXTRAS } = require('./exerciseExtras');
const { judgeAnswer } = require('../grading/answerJudge');

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
    ex('e5n3', 'div3', 'Cel mai mic număr de 3 cifre care se împarte exact și la 2, și la 3, și la 5.', ['120'], 'Trebuie multiplu comun al lui 2, 3 și 5. Cel mai mic astfel de număr nenul este 30. Primul de 3 cifre: 120.', { hint: 'Un multiplu comun al lui 2, 3 și 5.', numeric: { value: 120, tolerance: 0 }, steps: ['2, 3 și 5 nu au divizori comuni în afară de 1', 'Cel mai mic multiplu comun nenul este 30', 'Cel mai mic de 3 cifre multiplu de 30 e 120', 'Verificare: 120 se termină cu 0 (la 2 și 5), 1+2+0=3 (la 3)'] }),
    ex('e5n4', 'prime', 'Un număr prim p, 40 < p < 50. Câte astfel de numere există? Scrie numărul lor.', ['3'], 'Între 40 și 50: 41, 43, 47. (45, 49 nu sunt prime.)', { hint: 'Taie parele, pe 45 și pe 49.', numeric: { value: 3, tolerance: 0 }, steps: ['Parele cad (divizibile cu 2)', '45 = 9×5, 49 = 7×7', 'Rămân 41, 43, 47 — deci 3'] })
  ],
  'matematica:5:fractii': [
    ex('e5f1', 'numitor', 'Calculează 5/6 − 1/3 + 1/2. Scrie ca fracție ireductibilă.', ['1', '1/1', '6/6'], 'Numitor 6: 5/6 − 2/6 + 3/6 = 6/6 = 1.', { hint: 'Adu totul la 6.', steps: ['1/3 = 2/6, 1/2 = 3/6', '5/6 − 2/6 + 3/6 = 6/6', '6/6 = 1'] }),
    ex('e5f2', 'amplif', 'Simplifică 18/24, apoi amplifică rezultatul cu 5. Ce fracție obții?', ['15/20'], '18/24 = 3/4, apoi ×5: 15/20.', { hint: 'Împarte 18 și 24 la 6.', steps: ['18:6=3, 24:6=4 → 3/4', '3×5=15, 4×5=20 → 15/20'] }),
    ex('e5f3', 'procent', 'O carte costă 80 lei. E redusă cu 15%, apoi mai tai 10 lei. Cât plătești?', ['58', '58 lei'], '15% din 80 = 12, rămân 68, minus 10 = 58.', { hint: 'Întâi procentul, apoi cei 10 lei.', numeric: { value: 58, tolerance: 0 }, steps: ['15% din 80 = 12 lei', '80 − 12 = 68', '68 − 10 = 58'] }),
    ex('e5f4', 'media', 'Notele 6, 8, 9 și 9. Media aritmetică. Scrie și cu virgulă dacă trebuie.', ['8', '8.0'], '(6+8+9+9):4 = 32:4 = 8.', { numeric: { value: 8, tolerance: 0 }, steps: ['Suma = 32', 'Sunt 4 note', '32 : 4 = 8'] })
  ],
  'matematica:5:geometrie': [
    ex('e5g1', 'unghi', 'Un unghi ascuțit și unul obtuz sunt alăturate și formează un unghi alungit (180°). Dacă ascuțitul e 35°, cât e obtuzul?', ['145', '145°'], '180 − 35 = 145°.', { numeric: { value: 145, tolerance: 0 }, steps: ['Alungit = 180°', '180 − 35 = 145', '145° e obtuz (între 90 și 180)'] }),
    ex('e5g2', 'perimetru', 'Un dreptunghi are 12 cm și 5 cm. Un pătrat are același perimetru. Cât este latura pătratului, în cm?', ['8.5', '8,5', '17/2'], 'Perimetrul dreptunghiului: 2×(12+5)=34. Latura pătratului: 34:4=8,5 cm.', { hint: 'Mai întâi perimetrul, apoi împarte la 4.', numeric: { value: 8.5, tolerance: 0.01 }, steps: ['P = 2×(12+5) = 34 cm', 'Pătratul are 4 laturi egale', '34 : 4 = 8,5 cm'] }),
    ex('e5g3', 'arie-drep', 'Un dreptunghi are 9 cm și 4 cm. Câtă arie are, în cm²?', ['36'], '9 × 4 = 36 cm².', { numeric: { value: 36, tolerance: 0 }, steps: ['Aria = lungime × lățime', '9 × 4 = 36'] }),
    ex('e5g4', 'unitati', 'Un vas are 1,5 l. Bei 200 ml. Câți mililitri au rămas?', ['1300', '1300 ml'], '1,5 l = 1500 ml. 1500 − 200 = 1300 ml.', { hint: 'Treci totul în ml. 1 l = 1000 ml.', numeric: { value: 1300, tolerance: 0 }, steps: ['1,5 l = 1500 ml', '1500 − 200 = 1300 ml'] })
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
    ex('e6t3', 'cerc', 'Un cerc are raza de 7 cm. Cât este diametrul, în cm?', ['14'], 'Diametrul trece prin centru și este de două ori raza: 2 × 7 = 14.', { numeric: { value: 14, tolerance: 0 }, steps: ['d = 2r', '2 × 7 = 14'] }),
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
  'romana:5:cartea': [
    ex('e5r3', 'etape', 'În 2 fraze, povestește o întâmplare inventată cu un ghiozdan. Trebuie un verb de acțiune și cuvântul „ghiozdan”.', ['ghiozdan'], 'Se vede o faptă, nu doar adjective. E pasul de scriere, după idee și plan.', { long: true, tokens: ['ghiozdan'], minWords: 10, steps: ['Alegi o faptă (cade, se pierde, e găsit)', 'Scrii 2 fraze, nu o listă de adjective', 'Verbul arată ce s-a întâmplat'] })
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

function judgeExercise(given, exercise) {
  return judgeAnswer({
    given,
    answers: exercise.answers || [],
    numeric: exercise.numeric,
    tokens: exercise.tokens || [],
    explain: exercise.explain || '',
    match: exercise.match || ''
  });
}

function answersMatch(given, exercise) {
  return judgeExercise(given, exercise).ok;
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
  if (!exercise) return { ok: false, found: false, credit: 0, verdict: 'wrong' };
  const { gradeWriting, isWritingItem } = require('../grading/writingRubric');
  const writing = isWritingItem(exercise);
  const rubric = writing ? gradeWriting(given, exercise) : null;
  const judge = judgeExercise(given, exercise);
  const correct = writing ? Boolean((rubric && rubric.ok) || judge.ok) : judge.ok;
  const empty = !String(given || '').trim();
  const verdict = writing
    ? (correct ? (judge.kind === 'equivalent' ? 'equivalent' : 'exact') : (empty ? 'empty' : 'wrong'))
    : judge.kind;
  const teacher = writing
    ? (rubric ? rubric.teacher : exercise.explain)
    : judge.teacher;
  return {
    ok: correct,
    credit: writing ? (correct ? 1 : 0) : Number(judge.credit) || 0,
    verdict,
    found: true,
    explain: teacher,
    sample: writing ? (rubric?.sampleHint || exercise.explain) : (judge.sample || exercise.answers[0] || ''),
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
      credit: Number(result.credit) || 0,
      verdict: result.verdict || (result.ok ? 'exact' : 'wrong'),
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
  return 'Nu e capăt. Lucrează pe foaie, cere tutorelui pașii, apoi mai încerci.';
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
