// Lecții originale, „pe tavă”, după programa 5–8 (OMEN 3393/2017).
// Nu copiem manuale. Fiecare lecție: idee + exemplu lucrat + ce să reții.
// La clasa a V-a, cuprinsul manualului Litera A1259 stă în mate5Naturale.js,
// mate5Fractii.js și mate5Geometrie.js.

const { NATURALE_LESSONS } = require('./mate5Naturale');
const { FRACTII_LESSONS } = require('./mate5Fractii');
const { GEOMETRIE_LESSONS } = require('./mate5Geometrie');
const { MULTIMI_LESSONS } = require('./mate6Multimi');
const { PROPORTII_LESSONS } = require('./mate6Proportii');
const { NUMERE_LESSONS } = require('./mate6Numere');
const { GEOMETRIE6_LESSONS } = require('./mate6Geometrie');
const { REALE_LESSONS } = require('./mate7Reale');
const { ECUATII_LESSONS } = require('./mate7Ecuatii');
const { DATE_LESSONS } = require('./mate7Date');
const { GEO7_LESSONS } = require('./mate7Geometrie');

function lesson(id, title, ...paragraphs) {
  let extra = {};
  const last = paragraphs[paragraphs.length - 1];
  if (last && typeof last === 'object' && !Array.isArray(last)) {
    extra = last;
    paragraphs = paragraphs.slice(0, -1);
  }
  return { id, title, platter: paragraphs.join('\n\n'), ...extra };
}

const LESSONS = {
  'matematica:5:naturale': NATURALE_LESSONS,
  'matematica:5:fractii': FRACTII_LESSONS,
  'matematica:5:geometrie': GEOMETRIE_LESSONS,
  'matematica:6:multimi': MULTIMI_LESSONS,
  'matematica:6:proportii': PROPORTII_LESSONS,
  'matematica:6:intregi-rationale': NUMERE_LESSONS,
  'matematica:6:triunghi': GEOMETRIE6_LESSONS,
  'matematica:7:reale': REALE_LESSONS,
  'matematica:7:ecuati': ECUATII_LESSONS,
  'matematica:7:date': DATE_LESSONS,
  'matematica:7:geo7': GEO7_LESSONS,
  'matematica:8:intervale': [
    lesson(
      'interval',
      'Ce e un interval',
      'O bucată de axă. [2,5] ține capetele (închis). (2,5) le taie (deschis). [2,5) ține 2, taie 5. Rotund = fără, drept = cu.',
      'Exemplu lucrat: câte întregi în (−2,5]? −1,0,1,2,3,4,5 — șapte. −2 nu e inclus.',
      'Reține: întregii din interval se numără, nu lungimea în centimetri.'
    ),
    lesson(
      'reuniune-int',
      'Reuniune și intersecție de intervale',
      'Reuniunea lipește. Intersecția e overlap-ul. [−1,4) ∪ (2,6] = [−1,6]. Tai cu [0,5]: rămâne [0,5].',
      'Exemplu lucrat: ([−1,4) ∪ (2,6]) ∩ [0,5] = [0,5].',
      'Reține: desenează axa. Capetele deschise/închise se văd.'
    ),
    lesson(
      'inecuatie',
      'Inecuația: pentru ce x rămâne adevărat',
      'Nu cauți un singur x, ci o mulțime. x+3 ≥ 7 → x ≥ 4, adică [4,+∞). Cel mai mic întreg e 4.',
      'Exemplu lucrat: 2x < 10. x < 5. Cel mai mare întreg: 4.',
      'Reține: răspunsul e un interval (sau o reuniune), nu neapărat un număr.'
    ),
    lesson(
      'sens',
      'Când schimbi sensul inecuației',
      'Dacă înmulțești sau împarți cu un negativ, inegalitatea se întoarce. −2x+3 ≤ 11 → −2x ≤ 8 → x ≥ −4.',
      'Exemplu lucrat: −2x+3 ≤ 11. x ≥ −4, adică [−4,+∞).',
      'Reține: plusul și minusul la adunare nu întorc sensul. Negativul la înmulțire/împărțire da.'
    ),
    lesson(
      'produs',
      'Inecuații produs',
      '(x−1)(x+3)>0: produs pozitiv în afara rădăcinilor dacă parabola se deschide în sus. Rădăcini −3 și 1. (−∞,−3) ∪ (1,+∞).',
      'Exemplu lucrat: (x−1)(x+3)>0 → x<−3 sau x>1.',
      'Reține: faci un tabel de semne sau desenezi: plus în afară, minus între rădăcini (la x² cu coeficient +).'
    )
  ],
  'matematica:8:algebric': [
    lesson(
      'asemenea',
      'Termeni asemenea',
      'Aceeași parte cu litere. 3x și −5x se strâng: −2x. 3x și 3y nu. Coeficientul se adună, literele rămân.',
      'Exemplu lucrat: 4x+7x pentru x=1 e 11. 4x+7x=11x.',
      'Reține: 3x² și 3x nu sunt asemenea — exponentul e altul.'
    ),
    lesson(
      'binom',
      'Pătratul sumei și al diferenței',
      '(a+b)² = a²+2ab+b². (a−b)² = a²−2ab+b². Mijlocul e dublul produsului, cu semnul potrivit.',
      'Exemplu lucrat: (x+3)² pentru x=2: 4+12+9=25. Sau 5²=25.',
      'Reține: (a+b)² nu e a²+b². Lipsește 2ab.'
    ),
    lesson(
      'diferenta',
      'Diferența de pătrate',
      'a²−b²=(a−b)(a+b). 9x²−25=(3x−5)(3x+5). Pentru x=2: 1×11=11.',
      'Exemplu lucrat: (x+3)²−(x−1)² = 4·(2x+2)=8(x+1). Pentru x=2: 24.',
      'Reține: diferență de pătrate, nu pătratul diferenței. Sunt formule diferite.'
    ),
    lesson(
      'factor',
      'Factor comun și fracții algebrice',
      'Tragi în față ce e în toți termenii: 4x²−6x=2x(2x−3). O fracție se simplifică dacă numărătorul și numitorul au un factor comun. (x²−9)/(x−3)=x+3, x≠3.',
      'Exemplu lucrat: (x²−9)/(x−3) pentru x=5: 8. 4x²−6x pentru x=5: 70.',
      'Reține: nu simplifici termeni adunați. Doar factori.'
    ),
    lesson(
      'grad2',
      'x² = n, la nivelul gimnaziului',
      'x²=9 are soluții 3 și −3. Cerut adesea cea pozitivă. Un produs e 0 dacă cel puțin un factor e 0 — de-aici descompunerea.',
      'Exemplu lucrat: x²=16, soluția pozitivă 4. (2x+1)(2x−1)=4x²−1.',
      'Reține: două rădăcini la x²=n (n>0), nu doar cea „frumoasă”, dacă nu ți se cere una.'
    )
  ],
  'matematica:8:functii': [
    lesson(
      'functie',
      'Ce e o funcție',
      'Leagă un x de un singur f(x). f(2) înseamnă valoarea când x=2, nu „f ori 2”. Tabel: pentru fiecare x, un y.',
      'Exemplu lucrat: f(x)=3x+1. f(2)=7. Nu e 32.',
      'Reține: un x, un f(x). Nu două valori diferite pentru același x.'
    ),
    lesson(
      'dreapta',
      'f(x)=ax+b',
      'Graficul e o dreaptă. a e panta: a>0 urcă, a<0 coboară. b e unde taie Oy: f(0)=b. Δf = a·Δx.',
      'Exemplu lucrat: f(x)=−2x+7. f(3)=1. f(x)=f(3)+4=5 → −2x+7=5, x=1.',
      'Reține: a e înclinarea, b e interceptul, nu invers.'
    ),
    lesson(
      'grafic-f',
      'Citirea dreptei din grafic',
      'Cauți două puncte clare. Panta = urcarea / alergarea. Intersecția cu Oy se citește pe axă.',
      'Exemplu lucrat: f(x)=2x. De la x=1 la x=3, f crește cu 4. Δx=2, a=2.',
      'Reține: un punct nu e destul pentru o dreaptă (ai nevoie de pantă sau de încă un punct).'
    ),
    lesson(
      'stat1',
      'Medie, mediană, mod',
      'Media: suma / câți. Mediana: după sortare, valoarea din mijloc (dacă n e par, media celor două din mijloc). Modul: ce apare cel mai des.',
      'Exemplu lucrat: 3,7,7,10,13. Media 8, mediana 7, diferența 1. Set 2,9,4,9,1,6: sortat 1,2,4,6,9,9, mediana 5.',
      'Reține: mediana cere sortare. Media nu.'
    ),
    lesson(
      'amplitudine',
      'Amplitudinea',
      'max − min. Cât de „întins” e setul. Dacă scoți un extreme, amplitudinea se poate schimba.',
      'Exemplu lucrat: 3,5,20,8. Fără 20: min 3, max 8, amplitudine 5.',
      'Reține: amplitudinea nu e media. E lățimea.'
    )
  ],
  'matematica:8:spatiu': [
    lesson(
      'plane',
      'Puncte, drepte, plane',
      'În spațiu, o dreaptă paralelă cu un plan nu-l înțeapă. Perpendiculara face 90° cu dreptele din plan care trec prin picior. Vizualizează creionul și masa.',
      'Exemplu lucrat: un creion ținut deasupra mesei, la distanță constantă, e paralel cu planul mesei dacă nu o atinge și nu se apleacă.',
      'Reține: paralel în spațiu nu e „arată la fel pe caiet”. E o relație 3D.',
      { figure: 'planes', formulas: ['3 puncte necoliniare → un plan', 'drepte: paralele, concurente sau oarecare'] }
    ),
    lesson(
      'prisma',
      'Prisma și cubul',
      'Volumul prismei: aria bazei × înălțimea. Cub: a³. Aria laterală a prismei drepte: perimetrul bazei × h. Cub: aria totală 6a².',
      'Exemplu lucrat: prismă bază 6×4, h=5. Aria laterală: perimetru 20 × 5 = 100. Cub latură 5, tai cubuleț 2: volum 125−8=117.',
      'Reține: laterală = fără baze. Totală = cu baze.',
      { figure: 'cube', formulas: ['V_prismă = A_bază × h', 'V_cub = a³', 'A_totală cub = 6a²'] }
    ),
    lesson(
      'prisma-tri',
      'Prisma triunghiulară',
      'Baza e un triunghi. Volumul rămâne A_bază × h. Dacă baza e dreptunghică, A_bază = (catetă × catetă) / 2. Fețele laterale sunt dreptunghiuri (la prisma dreaptă).',
      'Nu înmulți cele trei laturi ale triunghiului — aia nu e aria bazei.',
      'Exemplu lucrat: bază 6-8-10 (dreptunghic), h=5. A_bază = 24. V = 120. A_lat = (6+8+10)×5 = 120.',
      'Reține: întâi aria triunghiului, apoi ori înălțimea prismei.',
      { figure: 'prism-tri', formulas: ['V = A_triunghi × h', 'A_lat = P_bază × h'] }
    ),
    lesson(
      'piramida',
      'Piramida',
      'Volum: (aria bazei × înălțimea) / 3. Aria laterală: suma ariilor triunghiurilor laterale. La piramidă regulată cu bază pătrat, 4 triunghiuri egale.',
      'Exemplu lucrat: bază 6×6, apotema feței 5. O față (6×5)/2=15, 4 fețe=60.',
      'Reține: /3 la volum, nu la arie. Înălțimea e din vârf perpendicular pe planul bazei, nu apotema.',
      { figure: 'pyramid', formulas: ['V = (A_bază × h) / 3'] }
    ),
    lesson(
      'tetraedru',
      'Tetraedrul regulat',
      'Patru fețe, toate triunghiuri echilaterale. 4 vârfuri, 6 muchii egale. E o piramidă triunghiulară „egală pe toate părțile”. Volum (a³√2)/12, arie totală a²√3.',
      'La EN recunoști figura și, de obicei, cer aria unei fețe sau o înălțime dată, nu neapărat formula lungă tocită.',
      'Exemplu lucrat: muchie 6. O față: (36√3)/4 = 9√3. Patru fețe: 36√3. Dacă ți se dă înălțimea 4 și baza echilaterală de latură 6, V = (9√3 × 4) / 3 = 12√3.',
      'Reține: 4 fețe, nu 6. Cubul are 6.',
      { figure: 'tetrahedron', formulas: ['4 fețe echilaterale', 'V = (a³√2) / 12', 'A = a²√3'] }
    ),
    lesson(
      'cilindru',
      'Cilindrul',
      'Volum πr²h (disc × înălțime). Aria laterală 2πrh (dreptunghiul din desfășurare).',
      'Exemplu lucrat: r=3, h=4, π=3. Volum ≈ 3×9×4=108.',
      'Reține: πr² e baza, nu volumul. Mai trebuie ×h.',
      { figure: 'cylinder', formulas: ['V = πr²h', 'A_lat = 2πrh'] }
    ),
    lesson(
      'con',
      'Conul',
      'Volum (πr²h)/3 — o treime din cilindru cu aceeași bază și înălțime. Nu confunda cu aria laterală πrG (G generatoare).',
      'Exemplu lucrat: r=3, h=3, π=3. V=(3×9×3)/3=27.',
      'Reține: /3 e la volum. Cilindrul nu se împarte la 3.',
      { figure: 'cone', formulas: ['V = πr²h / 3', 'A_lat = πrG', 'G² = r² + h²'] }
    ),
    lesson(
      'trunchiuri',
      'Trunchiul de piramidă și de con',
      'Tai cu un plan paralel cu baza. La con rămân două cercuri (R și r) și o centură. La piramidă, două poligoane asemenea. Volumul trunchiului de con: (πh/3)(R² + Rr + r²). Trunchiul de piramidă: (h/3)(A + A′ + √(A·A′)).',
      'Nu e „cilindru strâmb”. Are două baze, nu una.',
      'Exemplu lucrat: trunchi de con, R=6, r=3, h=4, π=3. V = (3·4/3)(36+18+9) = 4×63 = 252.',
      'Reține: apar ambele raze (sau ambele arii). Dacă uiți una, ai calculat un con sau un cilindru.',
      { figure: 'frustum', formulas: ['V_con-trunchi = (πh/3)(R² + Rr + r²)', 'V_piramidă-trunchi = (h/3)(A + A′ + √(AA′))'] }
    ),
    lesson(
      'sfera',
      'Sfera',
      'Volum (4/3)πr³ — umplutura. Aria 4πr² — coaja. Nu le schimba.',
      'Exemplu lucrat: r=3, π=3. V≈(4/3)×3×27=108.',
      'Reține: r³ la volum, r² la arie. Puterea spune dimensiunea.',
      { figure: 'sphere', formulas: ['A = 4πR²', 'V = (4/3)πR³'] }
    )
  ],




};

function lessonsFor(subject, grade, chapterId) {
  const key = `${String(subject || '').toLowerCase()}:${String(grade || '')}:${String(chapterId || '')}`;
  return LESSONS[key] ? LESSONS[key].slice() : [];
}

module.exports = { LESSONS, lessonsFor, lesson };
