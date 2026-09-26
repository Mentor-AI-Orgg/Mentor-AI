// Lecții originale, „pe tavă”, după programa 5–8 (OMEN 3393/2017).
// Nu copiem manuale. Fiecare lecție: idee + exemplu lucrat + ce să reții.
// La clasa a V-a, cuprinsul manualului Litera A1259 stă în mate5Naturale.js,
// mate5Fractii.js și mate5Geometrie.js.

const { NATURALE_LESSONS } = require('./mate5Naturale');
const { FRACTII_LESSONS } = require('./mate5Fractii');
const { GEOMETRIE_LESSONS } = require('./mate5Geometrie');

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
  'matematica:6:multimi': [
    lesson(
      'apartine',
      'Apartenență, reuniune, intersecție',
      'x ∈ A înseamnă „x e un element din A”. Reuniunea A ∪ B strânge tot ce e în cel puțin una, fără dubluri. Intersecția A ∩ B ține doar ce e în amândouă.',
      'Mulțimea vidă ∅ nu are elemente. {0} nu e vidă: zero e un oaspete.',
      'Exemplu lucrat: A={2,4,6,8}, B={1,2,3,4}, C={4,8,12}. A ∪ B = {1,2,3,4,6,8}. (A ∪ B) ∩ C = {4,8}. Două elemente.',
      'Reține: reuniunea e „sau”, intersecția e „și”.'
    ),
    lesson(
      'cardinal',
      'Câte elemente: cardinalul',
      '|A| e numărul de elemente distincte. {1,3,5,7} are 4, nu 16. Nu aduni valorile — numeri oaspeții.',
      'La probleme cu „câți fac cel puțin una”, folosești |A ∪ B| = |A| + |B| − |A ∩ B|, ca să nu numeri de două ori intersecția.',
      'Exemplu lucrat: 32 elevi, 18 mate, 16 română, 7 pe amândouă. În cel puțin un cerc: 18+16−7=27. În niciunul: 32−27=5.',
      'Reține: intersecția se scade o dată din sumă, nu se ignoră.'
    ),
    lesson(
      'factori',
      'Descompunere în factori primi',
      'Scrii numărul ca produs de prime. 12 = 2 × 2 × 3 = 2² × 3. 48 = 2⁴ × 3. Împarți la 2 cât poți, apoi la 3, 5…',
      'Factorii primi sunt cărămizile. Cu ele găsești c.m.m.d.c. și c.m.m.m.c. fără ghicit.',
      'Exemplu lucrat: 18 = 2 × 3². 48 = 2⁴ × 3. Pentru c.m.m.d.c. iei puterile cele mai mici: 2¹ × 3¹ = 6.',
      'Reține: 1 nu e prim. Nu intra în descompunere.'
    ),
    lesson(
      'cmmdc',
      'c.m.m.d.c.',
      'Cel mai mare număr care împarte pe amândoi. Pe factori: iei puterile cele mai mici comune. 12=2²×3, 18=2×3² → c.m.m.d.c.=2×3=6.',
      'Dacă nu au factor comun în afară de 1, sunt prime între ele: c.m.m.d.c.=1.',
      'Exemplu lucrat: c.m.m.d.c.(48,18)×c.m.m.m.c.(48,18):48. Produsul c.m.m.d.c. și c.m.m.m.c. e 48×18, deci iese 18.',
      'Reține: „cel mai mare care împarte”, nu „cel mai mic multiplu”.'
    ),
    lesson(
      'cmmmc',
      'c.m.m.m.c.',
      'Cel mai mic număr care se împarte la amândoi. Pe factori: iei puterile cele mai mari. 8=2³, 12=2²×3 → c.m.m.m.c.=2³×3=24.',
      'E „prima stație comună” pe axa multiplilor. Semafoare, coincidențe, resturi egale.',
      'Exemplu lucrat: semnale la 8 s, 12 s, 18 s. 8=2³, 12=2²×3, 18=2×3². c.m.m.m.c.=2³×3²=72.',
      'Reține: c.m.m.m.c. e mai mare (sau egal) decât ambele numere, c.m.m.d.c. e mai mic (sau egal).'
    ),
    lesson(
      'diagrame',
      'Probleme cu mulțimi',
      'Desenează două cercuri. În intersecție pui pe cei care sunt în amândouă. În restul fiecărui cerc: doar acea categorie. Afară: niciuna.',
      'Nu aduna 18+16 fără să scoți cei 7 de două ori numărați.',
      'Exemplu lucrat: 18 sport, 16 muzică, 7 amândouă. Doar sport: 18−7=11. Doar muzică: 16−7=9. Amândouă: 7. Cel puțin una: 11+9+7=27.',
      'Reține: desenul evită dubla numărare.'
    )
  ],
  'matematica:6:proportii': [
    lesson(
      'raport',
      'Raportul',
      'Un raport compară două mărimi printr-o împărțire. 3:6 = 1:2. Împarți ambele părți cu același număr. Poți scrie și 3/6.',
      'Ordinea contează: 3:6 nu e 6:3.',
      'Exemplu lucrat: simplifică 3:6. Împarți la 3: 1:2. Verificare: 1/2 = 3/6.',
      'Reține: raportul e o comparație, nu o scădere.'
    ),
    lesson(
      'proportie',
      'Proporția',
      'O proporție e două rapoarte egale: a/b = c/d. Produsele în cruce sunt egale: a×d = b×c. Asta e unealta ca să afli un loc gol.',
      'Exemplu lucrat: 2/5 = x/20. 2×20 = 5x, 40=5x, x=8. Verificare: 2/5 = 8/20.',
      'Reține: crucea e pentru proporții, nu pentru orice două fracții pe care le vezi.'
    ),
    lesson(
      'direct',
      'Direct proporționale',
      'Cresc sau scad împreună, în același ritm. Dublu cantitate, dublu preț, dacă prețul pe bucată e fix. Raportul rămâne constant.',
      'Exemplu lucrat: 8 m costă 96 lei. 1 m = 12 lei. 5 m = 60 lei. Apoi 10% reducere: 6 lei, plătești 54.',
      'Reține: „împreună” nu e destul. Trebuie același ritm (raport constant).'
    ),
    lesson(
      'invers',
      'Invers proporționale',
      'Una crește când cealaltă scade, iar produsul rămâne. Mai mulți robinete, mai puțin timp. 6 robinete × 4 ore = 24 = 3 robinete × 8 ore.',
      'Exemplu lucrat: 6 robinete umplu în 4 ore. La 3 robinete: 6×4=24, 24:3=8 ore.',
      'Reține: nu înjumătățești ambele. Dacă înjumătățești lucrătorii, dublezi timpul.'
    ),
    lesson(
      'regula3',
      'Regula de trei',
      'Trei valori știute, a patra se află. Reduci la unitate sau pui o proporție. Direct sau invers, după cum se leagă mărimile.',
      'Exemplu lucrat: 8 m = 96 lei, cumperi 5 m cu 10% reducere. Unitate: 12 lei/m, 5 m = 60, 10% = 6, rămân 54.',
      'Reține: întâi întrebi: dacă una crește, cealaltă crește sau scade?'
    ),
    lesson(
      'scara',
      'Scară și procent la rapoarte',
      'Scara 1:50 000 înseamnă 1 cm pe hartă = 50 000 cm reali. Treci km în cm (sau invers) înainte să împarți. Procentul e tot un raport cu 100 la numitor.',
      'Exemplu lucrat: 2,5 km pe teren, scara 1:50 000. 2,5 km = 250 000 cm. 250 000 : 50 000 = 5 cm pe hartă.',
      'Reține: scara e un raport, nu un procent de 1%.'
    )
  ],
  'matematica:6:intregi-rationale': [
    lesson(
      'axa',
      'Axa, opusul, modulul',
      'Minusul e direcție: −3 e trei pași în stânga lui 0, ca −3 °C. Opusul lui 5 e −5; suma e 0. Modulul |−5| = 5 e distanța până la zero, deci pozitivă.',
      'Exemplu lucrat: |−5| − |3−8| + |−2|. |3−8|=|−5|=5. 5 − 5 + 2 = 2.',
      'Reține: modulul nu „șterge minusul de formă”. E o distanță.'
    ),
    lesson(
      'adunare',
      'Adunare și scădere de întregi',
      'Aduni un negativ = te muți spre stânga. 5+(−2)=3. Scăderea e adunarea opusului: 4−(−4)=4+4=8.',
      'Exemplu lucrat: (−7)+12+(−9)−(−4). −7+12=5, 5+(−9)=−4, −4−(−4)=0.',
      'Reține: două minusuri la rând, la scădere, se fac plus.'
    ),
    lesson(
      'semne',
      'Înmulțire și împărțire cu semne',
      'Semne la fel → plus. Semne diferite → minus. (−3)×4 = −12. (−3)×(−4)=12. Aceeași regulă la împărțire.',
      'Exemplu lucrat: (−2)×4 = −8. Apoi (−3/4)+(5/6): numitor 12, −9/12+10/12=1/12.',
      'Reține: semnul se decide separat de mărime.'
    ),
    lesson(
      'rationale',
      'Numere raționale',
      'Se scriu ca fracție de întregi, numitor ≠ 0. −3/4, 0,7, 5 sunt raționale. Pe axă stau printre întregi, nu „altundeva”.',
      'Operațiile sunt cele de la fracții, plus regula semnelor.',
      'Exemplu lucrat: (−3/4)+(5/6). c.m.m.m.c.(4,6)=12. −9/12+10/12=1/12.',
      'Reține: rațional ≠ „rezonabil”. Înseamnă „fracție de întregi”.'
    ),
    lesson(
      'ecuatie',
      'Ecuații simple',
      'x + 5 = 12 întreabă ce număr plus 5 face 12. Scazi 5 din ambele părți: x=7. 3x−8=−2x+7: treci necunoscutele într-o parte, numerele în cealaltă.',
      'Exemplu lucrat: 3x−8=−2x+7. 3x+2x=7+8, 5x=15, x=3. Verificare: 9−8=1, −6+7=1.',
      'Reține: ce faci într-o parte faci și în cealaltă. Apoi verifici.'
    ),
    lesson(
      'verificare',
      'Verificarea e parte din treabă',
      'După ce găsești x, îl pui înapoi. Dacă stânga nu e dreapta, ai greșit un semn sau o mutare, nu „aproape”.',
      'Exemplu lucrat: x=3 în 3x−8 și −2x+7. 9−8=1, −6+7=1. Egalitate adevărată.',
      'Reține: verificarea nu e opțională la gimnaziu. E cum știi că ai închis cântarul.'
    )
  ],
  'matematica:6:triunghi': [
    lesson(
      'opuse',
      'Unghiuri când se taie dreptele',
      'Două drepte se taie: unghiurile față în față (opuse la vârf) sunt egale. Alăturatele fac 180°. Paralele tăiate de o secantă: unghiurile corespunzătoare sunt egale.',
      'Exemplu lucrat: un unghi 62°. Opusul e 62°. Alăturatul e 118°. Suma opus + alăturat = 180°.',
      'Reține: „față în față” = egale; „pe aceeași linie” = 180°.',
      { figure: 'parallels', formulas: ['corespunzătoare = egale', 'interne de aceeași parte: 180°'] }
    ),
    lesson(
      'cerc',
      'Cerc: rază, diametru, lungime',
      'Raza e de la centru la cerc. Diametrul e 2 raze în linie, trece prin centru. Coarda unește două puncte de pe cerc, nu neapărat prin centru. Lungimea cercului: L=πd=2πr.',
      'Exemplu lucrat: diametru 14 cm, π=22/7. L=(22/7)×14=44.',
      'Reține: diametrul e o coardă specială, cea mai lungă.',
      { figure: 'circle', formulas: ['d = 2r', 'L = 2πr = πd'] }
    ),
    lesson(
      'clasif',
      'Cum clasifici un triunghi',
      'După unghiuri: ascuțitunghic, dreptunghic (un 90°), obtuzunghic. După laturi: oarecare, isoscel (două laturi egale), echilateral (toate egale). Dreptunghicul are ipotenuza vizavi de 90°.',
      'Exemplu lucrat: isoscel, vârful 40°. Baza: (180−40):2=70° fiecare.',
      'Reține: un triunghi nu poate avea două unghiuri drepte — suma ar trece de 180°.',
      { figure: 'triangle-iso', formulas: ['isoscel: două laturi egale', 'echilateral: 60° + 60° + 60°'] }
    ),
    lesson(
      'suma180',
      'Suma unghiurilor e 180°',
      'Oricâte forme ar avea, cele trei colțuri fac un unghi alungit. Dacă știi două, al treilea e 180 minus ele.',
      'Exemplu lucrat: 50° și 60°. Al treilea: 70°. La isoscel, unghiurile de la baza egală sunt egale.',
      'Reține: 180° e lege, nu medie. Nu e 90°, nu e 360°.',
      { figure: 'triangle', formulas: ['A + B + C = 180°', 'A = (bază × h) / 2'] }
    ),
    lesson(
      'linii-tri',
      'Înălțime, mediană, bisectoare, mediatoare',
      'Înălțimea e perpendiculara din vârf pe latura opusă — o folosești la arie. Mediana unește vârful cu mijlocul laturii opuse; cele trei se taie la 2/3 de la vârf. Bisectoarea taie unghiul în două; se întâlnesc în centrul cercului înscris. Mediatoarea e perpendiculara prin mijlocul laturii; se întâlnesc în centrul cercului circumscris.',
      'Nu le amesteca: „linia din mijloc” nu e destul. Întrebi: taie latura, taie unghiul, sau e perpendiculară?',
      'Exemplu lucrat: isoscel cu baza 8 cm, vârful deasupra mijlocului. Înălțimea pe bază e și mediană, și bisectoare. Dacă baza e 8, medianele pe bază cad la 4 cm de fiecare capăt.',
      'Reține: patru nume, patru trebi. Aria cere înălțime, nu mediană.',
      { figure: 'triangle-lines', formulas: ['înălțime → arie', 'mediană → mijlocul laturii', 'bisectoare → cerc înscris'] }
    ),
    lesson(
      'congr',
      'Congruența',
      'Triunghiuri congruente au aceeași formă și aceleași mărimi: se potrivesc dacă le suprapui. Criterii LUL, ULU, LLL — le vei exersa pe cazuri, nu ca pe lozinci goale.',
      'Exemplu lucrat: dacă două triunghiuri au laturile 3, 4, 5, sunt congruente (aceleași trei lungimi). Aria lor e aceeași, dar și forma.',
      'Reține: aceeași arie nu e destul. Un dreptunghi lung și un pătrat pot avea aceeași arie și forme diferite.'
    ),
    lesson(
      'pitagora',
      'Pitagora ca verificare',
      'În triunghiul dreptunghic, a² + b² = c², unde c e ipotenuza (față de 90°). Triplete: 3-4-5, 5-12-13, și multiplii lor (6-8-10).',
      'Exemplu lucrat: catete 9 și 12. 81+144=225=15². Perimetrul: 9+12+15=36.',
      'Reține: Pitagora e doar în dreptul. Nu o pui pe un ascuțitunghic oarecare.',
      { figure: 'triangle-right', formulas: ['a² + b² = c²', 'A = (a × b) / 2'] }
    )
  ],
  'matematica:7:reale': [
    lesson(
      'radical',
      'Rădăcina pătrată',
      '√n întreabă: ce număr pozitiv, înmulțit cu el, dă n? √9=3 pentru că 3×3=9. √(a²)=a dacă a>0. √(9×16)=√144=12, nu e obligatoriu √9×√16, dar aici da: 3×4=12.',
      'Exemplu lucrat: √(9×16) − √9 × 2 = 12 − 3×2 = 12−6=6.',
      'Reține: radicalul „desface” un pătrat, nu împarte la 2.'
    ),
    lesson(
      'irational',
      'Raționale și iraționale, pe aceeași axă',
      'Un irațional nu se scrie frumos ca fracție de întregi. √2 ≈ 1,41 stă între 1 și 2. Realele = raționale + iraționale, toată dreapta continuă.',
      'Exemplu lucrat: 3 < √n < 6. n ≥ 10 și n ≤ 35. De la 10 la 35: 26 numere naturale.',
      'Reține: √2 nu e „inexistent”. E un punct pe axă, doar scrierea e infinită fără periodicitate.'
    ),
    lesson(
      'operatii-rad',
      'Operații cu radicali',
      '√a × √b = √(ab). Nu aduni sub radical: √a + √b nu e √(a+b). Poți scoate un pătrat: √50 = √(25×2)=5√2.',
      'Exemplu lucrat: 2 × √9 = 2×3=6. √16 + 1 = 4+1=5.',
      'Reține: produsul se strânge sub un acoperiș; suma nu.'
    ),
    lesson(
      'rationaliz',
      'Raționalizarea numitorului',
      'Scapi de radicalul de la numitor, înmulțind sus și jos potrivit. 6/√3 × √3/√3 = 6√3/3 = 2√3. Valoarea rămâne, scrierea se liniștește.',
      'Exemplu lucrat: 6/√3 → 2√3. Verificare numerică: 6/1,732… ≈ 3,464 și 2×1,732… ≈ 3,464.',
      'Reține: nu ștergi numitorul. Îl înmulțești ca să dispară radicalul.'
    ),
    lesson(
      'medii',
      'Medii',
      'Aritmetică: (a+b)/2. Geometrică: √(ab). Pentru 4 și 16: aritmetică 10, geometrică √64=8. Geometrica e mai mică sau egală (egalitate când a=b).',
      'Exemplu lucrat: media geometrică a lui 4 și 16 e 8. Nu e 10.',
      'Reține: „medie” fără adjectiv, la note, e de obicei aritmetică. La radicali, întreabă care.'
    )
  ],
  'matematica:7:ecuati': [
    lesson(
      'cantar',
      'Ecuația ca un cântar',
      'Ce faci într-o parte faci și în cealaltă. x+5=12 → x=7. 2x=10 → x=5. (3x−1)/2 = x+4: înmulțești cu 2, apoi strângi necunoscutele.',
      'Exemplu lucrat: (3x−1)/2 = x+4. 3x−1=2x+8, x=9. Verificare: (27−1)/2=13, 9+4=13.',
      'Reține: nu schimbi doar stânga. Cântarul trebuie să rămână echilibrat.'
    ),
    lesson(
      'paranteze-eq',
      'Paranteze și fracții în ecuație',
      'Întâi scapi de numitor (înmulțești totul). Apoi deschizi parantezele. Apoi aduni termenii asemenea.',
      'Exemplu lucrat: 3x−8=−2x+7, deja fără numitor. 5x=15, x=3.',
      'Reține: un numitor comun pe toată ecuația, nu doar pe un termen.'
    ),
    lesson(
      'substituie',
      'Sisteme: substituția',
      'Un sistem e două cântare cu aceleași necunoscute. Dintr-una afli o necunoscută (x=y+2) și o pui în cealaltă.',
      'Exemplu lucrat: 3x+2y=16, x=y+2. 3(y+2)+2y=16, 5y=10, y=2, x=4.',
      'Reține: înlocuiești tot x-ul, nu doar într-un loc.'
    ),
    lesson(
      'reducere',
      'Sisteme: reducerea',
      'Aduni sau scazi ecuațiile ca să dispară o necunoscută. Poți înmulți mai întâi ca termenii să se anuleze. 2x+y=11 și x−y=1: aduni, 3x=12, x=4, apoi y=3.',
      'Exemplu lucrat: x−y=1, x+y=7. Aduni: 2x=8, x=4, y=3.',
      'Reține: dispariția e intenționată. Nu „se anulează” de la sine dacă nu ai pregătit coeficienții.'
    ),
    lesson(
      'solutie',
      'Verificarea perechii (x, y)',
      'Soluția trebuie să țină în ambele ecuații. Dacă una minte, perechea nu e bună. Calculezi 4x−y și, separat, verifici x+2y.',
      'Exemplu lucrat: (1, −2). 4·1 − (−2)=6. 1+2·(−2)=−3. Dacă a doua ecuație cere −3, da.',
      'Reține: două bife, nu una.'
    )
  ],
  'matematica:7:date': [
    lesson(
      'axe',
      'Axe, origine, coordonate',
      'Originea e (0,0), acolo se taie axele. Abscisa e x (prima). Ordonata e y (a doua). A(2,3): 2 la dreapta, 3 în sus.',
      'Exemplu lucrat: la A(2,3), abscisa e 2. Nu e 3 și nu e originea.',
      'Reține: prima cifră e pe orizontală.'
    ),
    lesson(
      'simetrie',
      'Simetrie față de origine și față de axe',
      'Față de origine: schimbi ambele semne. A(3,−2) → (−3,2). Față de Ox: schimbi semnul lui y. Față de Oy: semnul lui x.',
      'Exemplu lucrat: A(3,−2) simetric față de origine: B(−3,2).',
      'Reține: origine = ambele semne; Ox = doar y.'
    ),
    lesson(
      'distanta',
      'Distanța dintre două puncte',
      'Pitagora pe diferențele de coordonate. Δx și Δy, apoi √(Δx²+Δy²).',
      'Exemplu lucrat: A(−1,4), C(5,−4). Δx=6, Δy=8. 36+64=100, distanța 10.',
      'Reține: nu scazi x-urile și te oprești. Ai nevoie de ambele diferențe, apoi radical.'
    ),
    lesson(
      'tabel',
      'Tabele și dependențe',
      'Un tabel leagă x de y, nu e o listă oarecare. Cauți regula: +2 la y când x crește cu 1, deci y=2x+k. Verifici pe un punct.',
      'Exemplu lucrat: x=0,1,2 și y=3,5,7. y=2x+3. Pentru x=4, y=11.',
      'Reține: regula trebuie să țină pe toate rândurile, nu pe două din trei.'
    ),
    lesson(
      'grafic',
      'Citirea graficului',
      'Punctele unei dependențe liniare stau pe o dreaptă. y=−3x+5: pentru y=−4, −3x+5=−4, x=3. Intersecția cu Oy e f(0).',
      'Exemplu lucrat: y=−3x+5, y=−4 → x=3. Punctul (3,−4) e pe dreaptă.',
      'Reține: citești un punct: cobori la x, apoi la y, nu ghicești din ochi.'
    )
  ],
  'matematica:7:geo7': [
    lesson(
      'patrulatere',
      'Paralelogram, dreptunghi, romb, pătrat',
      'Paralelogram: laturi opuse paralele și egale, unghiuri opuse egale, aria = bază × înălțime. Dreptunghi: unghiuri 90°. Romb: toate laturile egale, diagonale perpendiculare. Pătrat: și romb, și dreptunghi.',
      'Exemplu lucrat: paralelogram 9 cm și 6 cm, un unghi 90° — e dreptunghi, aria 54.',
      'Reține: pătratul e un caz special, nu o figură „de altceva”.',
      { figure: 'parallelogram', formulas: ['A = bază × h', 'P = 2(a + b)', 'diagonalele se taie în jumătăți'] }
    ),
    lesson(
      'romb',
      'Rombul',
      'Rombul are toate laturile egale. Diagonalele sunt perpendiculare și se taie în jumătăți. Aria e (d₁ × d₂) / 2, sau bază × înălțime. Dacă mai are și unghiuri de 90°, e pătrat.',
      'Nu e „pătrat strâmb” ca insultă: e o figură cu reguli ale ei. Unghiurile opuse sunt egale.',
      'Exemplu lucrat: diagonale 6 cm și 8 cm. A = 48/2 = 24 cm². Latura: jumătățile 3 și 4, deci 5 (Pitagora). P = 20 cm.',
      'Reține: patru laturi egale. Diagonalele ⊥. 90° doar dacă e și pătrat.',
      { figure: 'rhombus', formulas: ['P = 4a', 'A = (d₁ × d₂) / 2'] }
    ),
    lesson(
      'trapez',
      'Trapezul și ariile',
      'Trapez: exact o pereche de laturi paralele (bazele). Aria: (B+b)×h / 2. Isoscel: laturile neparalele egale, diagonale egale. Dreptunghic: o latură neparalelă e și înălțime.',
      'Exemplu lucrat: baze 10 și 6, înălțime 4. (10+6)×4 / 2 = 32.',
      'Reține: înălțimea e perpendiculara dintre baze, nu o latură piezișă.',
      { figure: 'trapezoid', formulas: ['A = (B + b) × h / 2', 'linie mijlocie = (B + b) / 2'] }
    ),
    lesson(
      'cerc7',
      'Lungimea cercului și aria discului',
      'L=2πr=πd. Aria discului πr². Lungimea e gardul, aria e umplutura.',
      'Exemplu lucrat: rază 7, π=22/7. L=2×(22/7)×7=44. Aria=(22/7)×49=154.',
      'Reține: πr² nu e lungimea. 2πr nu e aria.',
      { figure: 'circle', formulas: ['L = 2πr', 'A = πr²'] }
    ),
    lesson(
      'hexagon',
      'Hexagonul regulat',
      'Șase laturi egale, șase unghiuri egale. Se taie în 6 triunghiuri echilaterale cu latura a. Raza cercului circumscris e tot a. Perimetrul 6a. Aria: (3a²√3)/2.',
      'Dacă știi echilateralul, știi hexagonul: e o floare de 6 triunghiuri.',
      'Exemplu lucrat: latură 4 cm. P = 24 cm. Un triunghi din cele 6 are aria (16√3)/4 = 4√3, deci tot hexagonul 24√3 cm².',
      'Reține: R = a la hexagonul regulat. Nu e valabil la pentagon.',
      { figure: 'hexagon', formulas: ['P = 6a', 'A = (3a²√3) / 2', 'R = a'] }
    ),
    lesson(
      'thales',
      'Thales: paralele, segmente proporționale',
      'O paralelă taie laturile unui unghi (sau ale triunghiului) în segmente proporționale. 4/6 = x/(x+3).',
      'Exemplu lucrat: 4/6 = x/(x+3). 4(x+3)=6x, 4x+12=6x, x=6.',
      'Reține: aceeași ordine: mic/mare pe o secantă ca mic/mare pe cealaltă.',
      { figure: 'thales', formulas: ['a / a′ = b / b′'] }
    ),
    lesson(
      'asemanare',
      'Asemănarea',
      'Aceeași formă, altă scară. Raportul laturilor e k; raportul ariilor e k²; al perimetrelor e k.',
      'Exemplu lucrat: raport laturi 3/2, aria mare 54. Aria mică: 54 × 4/9 = 24.',
      'Reține: ariile cresc cu pătratul scării, nu cu scara.',
      { figure: 'similar', formulas: ['raport laturi = k', 'raport arii = k²'] }
    ),
    lesson(
      'trig',
      'Sinus, cosinus, tangentă',
      'În triunghiul dreptunghic, pe un unghi ascuțit: sin = opusă/ipotenuză, cos = alăturată/ipotenuză, tg = opusă/alăturată. Ipotenuza e cea mai lungă.',
      'Exemplu lucrat: catete 8 și 15, ipotenuză 17. cos unghiului opus lui 8: alăturata e 15, deci 15/17.',
      'Reține: „opusă” e vizavi de unghiul despre care vorbești, nu de 90°.',
      { figure: 'triangle-right', formulas: ['sin = opusă / ipotenuză', 'cos = alăturată / ipotenuză', 'tg = opusă / alăturată'] }
    )
  ],
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
