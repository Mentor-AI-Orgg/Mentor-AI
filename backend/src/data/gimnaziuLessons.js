// Lecții originale, „pe tavă”, după programa 5–8 (OMEN 3393/2017).
// Nu copiem manuale. Fiecare lecție: idee + exemplu lucrat + ce să reții.

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
  'matematica:5:naturale': [
    lesson(
      'citire',
      'Citire, scriere, comparare',
      'Un număr natural e un număr de numărat: 0, 1, 2, 3… Nu are virgulă și nu e negativ. Citirea merge de la stânga: sute de mii, zeci de mii, mii, sute, zeci, unități. 3 405 se citește „trei mii patru sute cinci”.',
      'Ca să compari, te uiți întâi cine are mai multe cifre: 999 < 1000. Dacă au același număr de cifre, compari de la stânga, prima cifră care diferă decide. 2 817 și 2 871: sutele sunt egale (8), zecile 1 < 7, deci 2 817 < 2 871.',
      'Exemplu lucrat: pune în ordine 408, 480, 84. 84 are două cifre, deci e cel mai mic. 408 și 480 au ambele 4 sute; zecile 0 < 8, deci 408 < 480. Ordinea: 84, 408, 480.',
      'Reține: compararea nu e adunare. Spune doar care e mai mare sau dacă sunt egale.'
    ),
    lesson(
      'operatii',
      'Cele patru operații',
      'Adunarea pune grămezi la un loc. Scăderea ia dintr-o grămadă. Înmulțirea e adunare repetată: 4 × 6 = 6+6+6+6. Împărțirea taie în părți egale: 24 : 4 = 6, pentru că 4 × 6 = 24.',
      'Restul la împărțire e ce rămâne când nu iese exact. 17 : 5 = 3 rest 2, pentru că 5 × 3 = 15 și mai rămân 2.',
      'Exemplu lucrat: o cutie are 3 rânduri a câte 8 creioane. Câte sunt? 3 × 8 = 24. Dai 5 copii câte 4. 5 × 4 = 20. Rămân 24 − 20 = 4 creioane.',
      'Reține: înmulțirea și împărțirea se „desfac” una pe alta. Dacă 7 × 9 = 63, atunci 63 : 9 = 7.'
    ),
    lesson(
      'puteri',
      'Puteri',
      'O putere e o înmulțire a aceluiași număr cu el însuși. Baza e numărul care se înmulțește; exponentul spune de câte ori. 3⁴ = 3 × 3 × 3 × 3 = 81. Nu e 3 × 4 și nu e 34.',
      '2³ = 8, 5² = 25, 10² = 100. 10ⁿ e 1 urmat de n zerouri: 10³ = 1000.',
      'Exemplu lucrat: calculează 2³ × 5. Întâi puterea: 2 × 2 × 2 = 8, apoi 8 × 5 = 40. Dacă ai fi făcut 2 × 3 × 5 = 30, ai fi greșit exponentul.',
      'Reține: exponentul nu e un plus lipit. E „de câte ori se înmulțește baza”.'
    ),
    lesson(
      'paranteze',
      'Paranteze și ordinea operațiilor',
      'Fără paranteze, întâi puterile, apoi înmulțirea și împărțirea (de la stânga la dreapta), apoi adunarea și scăderea. Parantezele schimbă regula: întâi interiorul.',
      '3 + 4 × 2 = 3 + 8 = 11, nu 14. Dar (3 + 4) × 2 = 7 × 2 = 14.',
      'Exemplu lucrat: 5 × [18 − (3 + 5)] : 2 + 7. Paranteza mică: 3+5=8. Apoi 18−8=10. 5×10=50. 50:2=25. 25+7=32.',
      'Reține: parantezele nu sunt ornament. Ele spun „fă treaba asta prima”.'
    ),
    lesson(
      'divizibilitate',
      'Când un număr se împarte exact',
      'La 2: ultima cifră e pară (0, 2, 4, 6, 8). La 5: ultima e 0 sau 5. La 10: ultima e 0. La 3 și la 9: te uiți la suma cifrelor. Dacă suma se împarte la 3, numărul se împarte la 3. La 9, suma trebuie să se împartă la 9.',
      '45: 4+5=9, 9 se împarte la 3 și la 9, deci 45 se împarte la 3 și la 9. 45 se termină cu 5, deci și la 5.',
      'Exemplu lucrat: cel mai mic număr de 3 cifre care se împarte și la 2, și la 3, și la 5. Trebuie multiplu de 2, 3 și 5, deci de 30. Primul de 3 cifre: 120. Verificare: se termină cu 0 (la 2 și 5), 1+2+0=3 (la 3).',
      'Reține: nu împarți „din ochi”. Ai o regulă pe ultima cifră sau pe suma cifrelor.'
    ),
    lesson(
      'prime',
      'Prime, compuse, metode aritmetice',
      'Un număr prim are exact doi divizori: 1 și el însuși. 2, 3, 5, 7, 11, 13 sunt prime. 1 nu e prim (are un singur divizor). Un număr compus are și alți divizori: 4, 6, 8, 9, 15.',
      'Reducerea la unitate: dacă 3 caiete costă 18 lei, un caiet costă 18:3=6, deci 5 caiete costă 30. Mersul invers: dacă la final ai 20 după ce ai adunat 8, înainte era 12.',
      'Exemplu lucrat: câte prime sunt între 40 și 50? Tai parele. 45=9×5, 49=7×7. Rămân 41, 43, 47 — trei numere.',
      'Reține: prim ≠ impar. 9 e impar și totuși compus.'
    )
  ],
  'matematica:5:fractii': [
    lesson(
      'parte',
      'Ce e o fracție',
      'O fracție arată câte părți egale luăm dintr-un întreg. Numitorul (jos) taie turtă în felii egale. Numărătorul (sus) spune câte felii iei. 3/4: turtă tăiată în 4, iei 3.',
      'Dacă numărătorul e cât numitorul, ai tot întregul: 4/4=1. Dacă numărătorul e mai mare, ai mai mult de un întreg: 5/4 = 1 și 1/4.',
      'Exemplu lucrat: 1/2 din 20. Împarți 20 la 2: 10. 1/4 din 20: 20:4=5. Nu înmulți 1 cu 20 și atât.',
      'Reține: numitorul e „cât de mici sunt feliile”, numărătorul e „câte iei”.'
    ),
    lesson(
      'amplif',
      'Amplificare și simplificare',
      'Amplificarea: înmulțești sus și jos cu același număr. Valoarea rămâne. 1/3 × 2/2 = 2/6. Simplificarea: împarți sus și jos prin același număr. 18/24 : 6/6 = 3/4.',
      'Cauți un divizor comun. Dacă nu mai găsești, fracția e ireductibilă.',
      'Exemplu lucrat: simplifică 18/24, apoi amplifică rezultatul cu 5. 18:6=3, 24:6=4 → 3/4. Apoi 3×5=15, 4×5=20 → 15/20. 15/20 e aceeași valoare cu 3/4.',
      'Reține: nu tai doar o cifră. Tai un factor comun din ambele.'
    ),
    lesson(
      'numitor',
      'Adunare cu numitor comun',
      'Nu poți aduna felii de mărimi diferite. 1/3 + 1/6 cere același numitor. 1/3 = 2/6, deci 2/6 + 1/6 = 3/6 = 1/2.',
      'Numitorul comun e un multiplu al ambilor numitori. Cel mai mic e cel mai comod.',
      'Exemplu lucrat: 5/6 − 1/3 + 1/2. Trec totul la 6: 5/6 − 2/6 + 3/6 = 6/6 = 1.',
      'Reține: la adunare și scădere, numitorul rămâne (după ce e comun); lucrezi pe numărător.'
    ),
    lesson(
      'zecimal',
      'Zecimale',
      'Virgula e altă scriere a fracției. 0,5 = 1/2, 0,25 = 1/4, 0,75 = 3/4. Prima cifră după virgulă e zecimi, a doua sutimi.',
      '1,2 l = 1200 ml, pentru că 1 l = 1000 ml. Nu amesteca unitățile.',
      'Exemplu lucrat: 0,5 + 0,25. 5 zecimi + 25 sutimi = 50 sutimi + 25 sutimi = 75 sutimi = 0,75, adică 3/4.',
      'Reține: zecimala nu e „un număr mic”. E aceeași idee ca fracția.'
    ),
    lesson(
      'procent',
      'Procente',
      'Procentul e „părți din o sută”. 25% = 25/100 = 1/4. 10% dintr-un număr e a zecea parte. 50% e jumătate.',
      'La o reducere, scazi procentul din preț, nu îl aduni. 15% din 80 = 12, deci plătești 80 − 12 = 68.',
      'Exemplu lucrat: carte 80 lei, redusă 15%, apoi mai tai 10 lei. 15% din 80 = 12, rămân 68, minus 10 = 58 lei.',
      'Reține: procentul e din prețul de atunci, nu dintr-un număr inventat.'
    ),
    lesson(
      'media',
      'Media aritmetică',
      'Media e suma împărțită la câți termeni ai. Notele 6, 8, 9, 9: suma 32, 4 note, media 8. Nu e nota cea mare și nu e produsul.',
      'Media e un rezumat: „cam pe unde stau” valorile, nu fiecare notă în parte.',
      'Exemplu lucrat: 4 și 8. Suma 12, doi termeni, 12:2=6. Dacă mai pui un 10: (4+8+10):3=22:3, nu e întreg — scrii 7,333… sau 22/3.',
      'Reține: aduni tot, apoi împarți la câți sunt, nu la câți îți convin.'
    )
  ],
  'matematica:5:geometrie': [
    lesson(
      'punct',
      'Punct, dreaptă, segment',
      'Punctul arată un loc, fără lungime. Dreapta nu se termină. Segmentul are două capete: îl poți măsura. Semidreapta are un capăt și merge la infinit într-o parte.',
      'Două puncte determină o dreaptă. Trei puncte pot fi pe o dreaptă (coliniare) sau formează un triunghi.',
      'Exemplu lucrat: de la A la B ai un segment de 7 cm. Dacă prelungești dincolo de B fără capăt, ai o semidreaptă cu originea în A, care trece prin B.',
      'Reține: punctul e „unde”, segmentul e „cât de lung”.',
      { figure: 'points-line', formulas: ['Două puncte determină o dreaptă', 'Segmentul are lungime'] }
    ),
    lesson(
      'unghi',
      'Unghiuri',
      'Unghiul e deschiderea dintre două semidrepte cu același vârf. Drept: 90° (colțul pătratului). Ascuțit: sub 90°. Obtuz: între 90° și 180°. Alungit: 180° (linie dreaptă).',
      'Două unghiuri alăturate pe o linie fac 180°. Dacă unul e 47°, celălalt e 133°.',
      'Exemplu lucrat: un ascuțit de 47° și un obtuz alăturat formează un alungit. 180 − 47 = 133°. 133° e obtuz, deci se potrivește.',
      'Reține: nu ghicești „pare ascuțit”. Compari cu 90°.',
      { figure: 'angle', formulas: ['drept = 90°', 'ascuțit < 90°', 'obtuz: 90°–180°'] }
    ),
    lesson(
      'perimetru',
      'Perimetrul',
      'Perimetrul e „gardul”: suma lungimilor laturilor. Pătrat de latură a: 4a. Dreptunghi L pe l: 2(L+l).',
      'Nu confunda perimetrul cu aria. Perimetrul e linie, aria e interior.',
      'Exemplu lucrat: dreptunghi 12 cm × 5 cm. P = 2×(12+5)=34 cm. Un pătrat cu același perimetru: 34:4=8,5 cm latura.',
      'Reține: același perimetru nu înseamnă aceeași arie.',
      { figure: 'rectangle', formulas: ['Pătrat: P = 4a', 'Dreptunghi: P = 2(L + l)'] }
    ),
    lesson(
      'patrat',
      'Pătratul',
      'Pătratul are patru laturi egale și patru unghiuri drepte. E un dreptunghi special și un romb special. Diagonalele sunt egale, perpendiculare și se taie în jumătăți. Diagonala măsoară a√2.',
      'Nu e „altceva” decât dreptunghiul: e dreptul cu L = l.',
      'Exemplu lucrat: latură 6 cm. P = 24 cm. A = 36 cm². Diagonala: 6√2 cm. Un dreptunghi 9×4 are tot perimetrul 26, nu 24 — nu e pătrat.',
      'Reține: patru laturi egale nu ajung (poate fi romb strâmb). Mai trebuie și 90°.',
      { figure: 'square', formulas: ['P = 4a', 'A = a²', 'diagonală = a√2'] }
    ),
    lesson(
      'arie',
      'Aria pătratului și a dreptunghiului',
      'Aria e câte pătrățele de 1 cm² încap înăuntru. Pătrat: latură × latură. Dreptunghi: lungime × lățime.',
      'Dacă tai o bucată, scazi aria tăieturii din aria foii.',
      'Exemplu lucrat: foaie 20×14 cm, tai un pătrat de latură 6 cm. 20×14=280, 6×6=36, rămân 244 cm².',
      'Reține: unitatea ariei e cm², nu cm. Cm e pentru lungimi.',
      { figure: 'square', formulas: ['A_pătrat = a²', 'A_dreptunghi = L × l'] }
    ),
    lesson(
      'volum',
      'Volumul cubului și al cutiei',
      'Volumul e câte cubulețe umplu cutia. Cub de latură a: a×a×a. Cutie (paralelipiped): lungime × lățime × înălțime.',
      'Nu înmulți doar două dimensiuni: aia e o față, nu cutia.',
      'Exemplu lucrat: cub de 5 cm. Volum 125 cm³. Tai din colț un cubuleț de 2 cm: 8 cm³. Rămân 117 cm³.',
      'Reține: volum = cm³. Aria unei fețe = cm².',
      { figure: 'cube', formulas: ['V_cub = a³', 'V_cutie = L × l × h', 'A_totală cub = 6a²'] }
    ),
    lesson(
      'unitati',
      'Unități de măsură',
      '1 m = 100 cm = 1000 mm. 1 km = 1000 m. 1 l = 1000 ml. Când treci la o unitate mai mică, înmulțești. Când treci la una mai mare, împarți.',
      'Nu aduni metri cu centimetri până nu sunt aceeași unitate.',
      'Exemplu lucrat: vas 1,2 l, bei 350 ml. 1,2 l = 1200 ml. 1200 − 350 = 850 ml.',
      'Reține: treci totul într-o singură unitate, apoi calculezi.'
    )
  ],
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

  'romana:5:oral': [
    lesson(
      'ascult',
      'Să asculți: întâi firul',
      'Când asculți, prinzi întâi ce se întâmplă (ideea), apoi detaliile. Nu sari la răspuns și nu numeri cuvintele. Firul, nu broderia.',
      'Exemplu: anunțul „Mâine, ora 9, sala 3, aduceți atlasul.” Firul: aduci atlasul, mâine la 9. Sala e utilă, dar secundă dacă trebuie să rezumi în 8 cuvinte.',
      'Reține: dacă poți spune „ce și când”, ai ascultat. Dacă repeți tot, ai copiat.'
    ),
    lesson(
      'mesaj',
      'Mesajul scurt: ce, când, unde',
      'Un mesaj oral bun spune întâi ce trebuie făcut și când. Receptorul trebuie să știe ce să facă, nu toate adjectivele.',
      'Exemplu: „Ana, mâine ora 10, adu dicționarul.” Ce: dicționarul. Când: ora 10. Cine: Ana.',
      'Reține: trei ancore țin un anunț. Restul e umplutură.'
    ),
    lesson(
      'povesti',
      'Povestirea orală în trei părți',
      'Început: cine, unde. Mijloc: ce s-a întâmplat. Sfârșit: cum s-a încheiat. Fără mijloc, e doar un cadru. Fără sfârșit, firul atârnă.',
      'Exemplu: „În curtea școlii, Mihai a scăpat atlasul. L-a ridicat Ioana. Au râs și au intrat la oră.” Trei momente, nu o listă de adjective.',
      'Reține: oralul tot are schelet, chiar dacă nu scrii pe caiet.'
    ),
    lesson(
      'intrebare',
      'Întrebarea clară',
      'O întrebare bună cere ceva anume, nu tot deodată. „Când începe pauza?” e o întrebare. „Spune-mi tot despre pauză și despre teme și despre…” e o listă.',
      'Exemplu: vrei ora pauzei → „Când începe pauza?” cu semnul ?.',
      'Reține: o întrebare, un lucru. Semnul ? arată că lași loc celuilalt.'
    ),
    lesson(
      'ton',
      'Ton, pauză, privire',
      'Aceleași cuvinte, alt ton: alt mesaj. „Da” spus plictisit transmite dezinteres, nu acord vesel. Pauza lasă ideea să se așeze. Privirea arată că ești cu celălalt, nu cu telefonul.',
      'Exemplu: „Poți veni?” spus aspru nu e o invitație. E aproape un ordin.',
      'Reține: tonul e parte din mesaj, nu decor.'
    )
  ],
  'romana:5:lectura': [
    lesson(
      'idee',
      'Ideea principală',
      'E ce se întâmplă cu adevărat, pe scurt. Restul e decor (vreme, culoare, o vorbă de fundal). Cine + ce face.',
      'Exemplu: „Ana a udat florile, apoi a citit. Seara era liniștită.” Ideea: Ana udă florile și citește. Seara liniștită e cadru.',
      'Reține: dacă tai detaliul și firul rămâne, detaliul nu era ideea.'
    ),
    lesson(
      'personaj',
      'Personaj, timp, loc',
      'Personajul e cine face treaba în text, nu neapărat autorul. Timpul și locul ancorează scena: unde și când.',
      'Exemplu: „Ionel a pierdut mingea în parc. Mihai i-a dat-o înapoi.” Principalul e Ionel (firul lui). Mihai ajută. Locul: parcul.',
      'Reține: cine vrea ceva, cine se mișcă — ăla e personajul pe care îl urmărești.'
    ),
    lesson(
      'naratiune',
      'Narațiune și descriere',
      'Narativul spune ce se întâmplă, în ordine: început, mijloc, capăt. Descrierea arată cum e un loc sau un om, cu detalii de simțuri, nu neapărat cu o faptă care schimbă tot.',
      'Exemplu: „A alergat, a căzut, s-a ridicat” e narațiune. „Curtea e udă, miroase a tei” e descriere.',
      'Reține: întreabă: se întâmplă sau se arată?'
    ),
    lesson(
      'comparatie',
      'Comparația',
      'A e ca B, ca să înțelegi A. Are „ca” / „precum” / „decât”. „Repede ca o săgeată” nu e o săgeată adevărată.',
      'Exemplu: „E iute ca un iepure” — comparație. Cauți „ca”.',
      'Reține: fără „ca”, s-ar putea să fie altă figură (metaforă, personificare).'
    ),
    lesson(
      'personificare',
      'Personificarea',
      'Dă însușiri omenești lucrurilor. Vântul „șoptește”. Stelele „râd”. Nu e „ca”. Lucrul primește o faptă de om.',
      'Exemplu: „Stelele râd pe cer.” Stelele (ne-om) râd (faptă omenească) → personificare.',
      'Reține: cine primește fapta de om? Dacă nu e om, e personificare.'
    )
  ],
  'romana:5:redactare': [
    lesson(
      'pasi',
      'Idei, plan, text',
      'Nu începi cu fraza frumoasă. Aduni ideile, le pui în plan, abia apoi scrii. Fără plan, începutul se pierde în mijloc.',
      'Exemplu: temă „ghiozdanul”. Idei: cade, se pierde, e găsit. Plan: început (cine), mijloc (căderea), sfârșit (găsirea). Apoi cele 2–3 fraze.',
      'Reține: trei pași, în ordine. Textul e ultimul, nu primul.'
    ),
    lesson(
      'structura',
      'Început, cuprins, sfârșit',
      'Începutul bagă cititorul în scenă. Cuprinsul e fapta sau ideea. Sfârșitul închide, nu deschide alt fir.',
      'Exemplu: descrii biblioteca. Început: ușa, lumina. Cuprins: rafturile, liniștea. Sfârșit: ieși cu o carte, nu începi o poveste despre autobuz.',
      'Reține: ușa se trage la capăt. Nu se deschide alt coridor.'
    ),
    lesson(
      'povestire',
      'Povestirea scurtă',
      'Se vede o faptă, nu doar adjective. Un verb de acțiune ține scena. Două fraze pot ajunge, dacă au cine + ce s-a întâmplat.',
      'Exemplu: „Ghiozdanul a căzut pe trepte. Vlad l-a ridicat și a râs.” Faptă, nu „era frumos, era mare, era roșu” fără eveniment.',
      'Reține: verbul arată ce s-a întâmplat. Adjectivul doar colorează.'
    ),
    lesson(
      'descriere',
      'Descriere de loc și autoportret',
      'Un detaliu bun e concret: culoare, sunet, gest. „Era frumos” e etichetă goală. Autoportretul arată un obicei sau un gest, nu o listă de laude.',
      'Exemplu: nu „sunt cuminte”. Ci „îmi așez caietul înainte de sonerie”. Cititorul vede.',
      'Reține: arăți, nu etichetezi.'
    ),
    lesson(
      'orto',
      'Ortografia e respect',
      'Litera mare, punctul, virgula ajută ochiul, nu te pedepsesc. Destinatarul merită un text pe care îl poate citi dintr-o răsuflare.',
      'Exemplu: „maine aduc atlasul” vs „Mâine aduc atlasul.” Al doilea se citește; primul se ghicește.',
      'Reține: ortografia e pentru celălalt, nu un concurs de virgule.'
    )
  ],
  'romana:5:limba5': [
    lesson(
      'propozitie',
      'Propoziția, subiectul, predicatul',
      'Propoziția simplă are subiect și predicat. Dezvoltată: mai are însoțitori (atribut, complement). Subiectul răspunde la cine? / ce? Predicatul spune ce se face: verbul.',
      'Exemplu: „Pisica doarme pe fotoliu.” Cine? Pisica. Ce face? Doarme. „pe fotoliu” e locul, nu predicatul și nu subiectul.',
      'Reține: nu lua ultimul cuvânt ca subiect. Întreabă cine face.'
    ),
    lesson(
      'atribut',
      'Atributul',
      'Spune ceva despre un substantiv: cum e, a cui, care. „Cartea nouă a Anei” — nouă și a Anei țin de carte.',
      'Exemplu: „Cartea nouă a Anei e pe masă.” Atribute: nouă, a Anei. Predicat: e. Subiect: cartea.',
      'Reține: atributul se lipește de un nume, nu de verb.'
    ),
    lesson(
      'verb',
      'Verbul: indicativ și imperativ',
      'Indicativul constată: citește, aleargă. Imperativul dă un îndemn: citește!, aleargă! Același verb, altă treabă.',
      'Exemplu: „Ana citește o carte” (indicativ). „Citește pagina 3!” (imperativ).',
      'Reține: întreabă: se întâmplă sau e un ordin?'
    ),
    lesson(
      'nume',
      'Substantivul și articolul',
      'Substantivul numește. Articolul (un, o, -ul, -a) arată dacă e cunoscut sau nu, și se lipește de nume. Pronumele personal ține locul numelui: el, ea, noi.',
      'Exemplu: „o carte” (neprecizat) vs „cartea” (știi care). „Ana citește. Ea subliniază.” Ea = Ana.',
      'Reține: articolul nu e un adjectiv. E o unealtă a numelui.'
    ),
    lesson(
      'adjectiv',
      'Adjectivul și numeralul',
      'Adjectivul arată o însușire a substantivului: carte groasă. Numeralul arată un număr sau o ordine: două cărți, a treia pagină.',
      'Exemplu: „două caiete groase”. două = numeral, groase = adjectiv, caiete = substantiv.',
      'Reține: adjectivul se acordă cu numele (groasă / groase).'
    ),
    lesson(
      'vocab5',
      'Sinonime, antonime, silabe',
      'Sinonimele spun aproape același lucru: curajos / viteaz. Antonimele se opun: cald / rece. Silaba e o bucată de cuvânt cu o vocală: ca-rte.',
      'Exemplu: „repede” ≈ „iute”. „cald” ↔ „rece”. „carte” are două silabe.',
      'Reține: dicționarul e unealtă, nu mobilă. Cauți când ești în dubiu.'
    )
  ],
  'romana:5:inter5': [
    lesson(
      'eu',
      'Cine sunt: cu un exemplu',
      'Să spui cine ești începe cu un exemplu din viața ta, nu cu o listă de sloganuri. Familie, loc, limbă, școală — ancore din care poți povesti.',
      'Exemplu: nu „sunt patriot”. Ci „acasă vorbim seara despre bunici”. Se vede cine ești.',
      'Reține: eu, apoi noi. Exemplul ține mai bine decât lozinca.'
    ),
    lesson(
      'acasa',
      'Acasă: loc și obiceiuri',
      '„Acasă” e un loc și o lume de obiceiuri, nu doar o adresă. Poți arăta, nu doar numi.',
      'Exemplu: „Acasă, duminica, coacem pâine.” Un obicei + un loc. Cititorul intră.',
      'Reține: arată un gest. Adresa nu e o poveste.'
    ),
    lesson(
      'legenda',
      'Legenda: loc sau erou + fir',
      'O legendă nu e știre de azi. E un fir despre un loc sau un erou, care se povestește. Dacă nu poți spune o frază cu un nume, n-ai luat-o cu tine.',
      'Exemplu: Meșterul Manole — zidește, soția, jertfa. O frază, cuvintele tale, nu titlul gol.',
      'Reține: legendă ≠ știre. Are un nume (loc sau erou) și o faptă.'
    ),
    lesson(
      'carte-ro',
      'Poveștile noastre au istorie',
      'O carte românească de-a lungul timpului arată că poveștile noastre au trecut, nu e predică. E un fir: cine a scris, cine a citit, ce s-a păstrat.',
      'Exemplu: poți spune, scurt, că basmele s-au spus întâi, apoi s-au scris. Nu e o formulă de manual copiată — e o ordine în timp.',
      'Reține: istoria cărții e un fir, nu un imn.'
    )
  ],

  'romana:6:oral6': [
    lesson(
      'rezumat-oral',
      'Rezumatul oral',
      'Păstrezi ordinea întâmplărilor importante și cauza, tai adjectivele. Firul, nu broderia. „A plouat. Trenul a întârziat. Ana a ajuns la 10.” → Ana a întârziat pentru că trenul, din cauza ploii.',
      'Exemplu: o frază cu Ana și de ce. Nu recopiezi cele trei propoziții ca pe o listă.',
      'Reține: cauza leagă. Fără ea, e un catalog.'
    ),
    lesson(
      'dialog',
      'De la monolog la dialog',
      'Îl lași pe celălalt să vorbească: o întrebare, un „da, și…”. Nu e un discurs de 3 minute în care nimeni nu intră.',
      'Exemplu: „Tu ce-ai înțeles din anunț?” Semnul ? e ușa.',
      'Reține: dialogul are două voci. Dacă e doar a ta, e monolog.'
    ),
    lesson(
      'parere6',
      'O părere cu motiv, pe o temă din clasă',
      'Nu doar „îmi place”. Lipești „pentru că” și un motiv concret: liniște, timp, o carte.',
      'Exemplu: „Îmi place lectura în pauză pentru că am 10 minute fără zgomot de hol.”',
      'Reține: părere + pentru că + faptă, nu slogan.'
    ),
    lesson(
      'ordine',
      'Ordinea rezumatului',
      'Început – mijloc – sfârșit, ca timpul poveștii. Nu începi cu capătul ca să „impresionezi”, decât dacă anunți că faci un salt și revii.',
      'Exemplu: pune în ordine sfârșit, început, mijloc → început-mijloc-sfârșit.',
      'Reține: rezumatul urmează firul, nu remixul.'
    )
  ],
  'romana:6:lectura6': [
    lesson(
      'persoana',
      'Narațiune la persoana I sau a III-a',
      '„M-am așezat și am deschis jurnalul.” Verbele m-am, am = persoana I (eu). „El a deschis jurnalul” = persoana a III-a. Nu e etichetă: e pronumele și desinența.',
      'Exemplu: scrii I sau III și un pronume/verb care te-a ajutat („am”, „el”).',
      'Reține: cauți cine vorbește, nu titlul lecției.'
    ),
    lesson(
      'stire',
      'Știrea: cine, ce, unde, când',
      'O știre răspunde întâi la patru întrebări. Detaliile vin după. E-mailul are cine, cui, de ce.',
      'Exemplu: absență către diriginte — cine scrie, cui (diriginte), de ce (absența). O frază ține cele trei.',
      'Reține: cele patru (sau trei, la e-mail) înaintea umpluturii.'
    ),
    lesson(
      'deduc',
      'Ce e spus și ce se deduce',
      'Text: „Ușa e deschisă, ghiozdanul e pe hol, dar nimeni nu răspunde.” Deducție prudentă: probabil nu e nimeni în casă. Nu „a fost o spargere” — asta e film, nu indiciu.',
      'Exemplu: o frază cu „probabil” sau „se pare”, nu un roman polițist.',
      'Reține: deduce din ce e scris. Nu inventa un al treilea act.'
    ),
    lesson(
      'portret',
      'Portretul din indicii',
      'Portretul se recunoaște după ce face și ce spune personajul, nu după eticheta „e bun”. Compari ce e clar cu ce se deduce.',
      'Exemplu: dacă închide ușa încet și așteaptă, poți spune „e atent”, cu dovadă, nu „e un sfânt”.',
      'Reține: indiciu în text, apoi etichetă scurtă.'
    ),
    lesson(
      'tabele',
      'Texte continue, tabele, e-mail',
      'Tabelul se citește pe coloane: ce compară. E-mailul are destinatar și scop. Textul continuu are paragrafe. Nu le citești la fel.',
      'Exemplu: un tabel cu ore și materii — cauți rândul zilei, coloana orei. Nu ca pe o poezie.',
      'Reține: forma îți spune cum să citești.'
    )
  ],
  'romana:6:redactare6': [
    lesson(
      'destinatar',
      'Tonul urmează destinatarul',
      'Scrii bunicii sau directorului? Tonul se schimbă. Formalul nu e „mai multe adjective”. E distanță și claritate.',
      'Exemplu: directorului — „Vă rog să aprobați…”. Bunicii — „Dragă bunico, azi…”.',
      'Reține: cine citește dictează tonul, nu tema.'
    ),
    lesson(
      'jurnal',
      'Jurnal și e-mail',
      'Jurnalul e pentru tine, dar tot e în ordine: o faptă + o stare, persoana I („am”). E-mailul are cine, cui, de ce, un subiect.',
      'Exemplu: „Azi am întârziat. M-am enervat, apoi am râs.” Două fraze, am + simțire.',
      'Reține: jurnalul nu e haos. E eu, în ordine.'
    ),
    lesson(
      'emotie',
      'Descrii o emoție fără etichetă',
      'Bucuria fără cuvântul „bucurie”: un gest sau un gând. Detaliul bate eticheta.',
      'Exemplu: „Am zâmbit fără să vreau când am văzut caietul corectat.” Nu scrii „am simțit bucurie”.',
      'Reține: interzis cuvântul-etichetă. Arăți trupul sau gândul.'
    ),
    lesson(
      'intamplare',
      'Întâmplarea cu momente',
      'Început, tensiune (mijloc), capăt. Nu un singur adjectiv. Ce se încurcă, apoi cum se rezolvă.',
      'Exemplu: atlasul lipsește (început), cauți (tensiune), e sub bancă (capăt).',
      'Reține: trei momente, nu „a fost haios”.'
    )
  ],
  'romana:6:limba6': [
    lesson(
      'nume-pred',
      'Predicatul nominal',
      '„Este” (sau similar) + un nume / adjectiv. „Ana e harnică”: e + harnică. Nu e un verb de mișcare. Numele predicativ e centrul: „elev” în „El este elev silitor” — silitor e atribut.',
      'Exemplu: „El este elev silitor.” Nume predicativ: elev.',
      'Reține: cauți verbul de legătură, apoi ce este subiectul.'
    ),
    lesson(
      'cd',
      'Complementul direct și indirect',
      'CD: pe cine? / ce? după verb. „Citesc o carte” — ce citesc? o carte. Indirectul: cui? / la cine? Circumstanțialele: unde, când, cum.',
      'Exemplu: „Citesc o carte interesantă în parc.” CD = carte. Loc = parc. interesantă = atribut.',
      'Reține: după verb, întreabă pe cine/ce, apoi unde/când/cum.'
    ),
    lesson(
      'circ',
      'Circumstanțiale de loc, timp, mod',
      'Loc: unde. Timp: când. Mod: cum. „Alergăm în parc în fiecare dimineață”: parc = loc, dimineață = timp.',
      'Exemplu: „în fiecare dimineață” e timp, nu loc.',
      'Reține: o întrebare pentru fiecare: unde / când / cum.'
    ),
    lesson(
      'caz',
      'Cazul: rolul numelui',
      'Forma se schimbă după treabă: cine, pe cine, cui, a cui. Nu e un unghi. E rolul în propoziție.',
      'Exemplu: „Ana” (cine) vs „Anei” (cui / a cui, după context).',
      'Reține: întreabă ce treabă are numele, apoi te uiți la formă.'
    ),
    lesson(
      'hiat',
      'Diftong, triftong, hiat',
      'Diftong: două vocale, o silabă (stea). Hiat: două vocale, silabe diferite (po-e-zie). Triftong: trei vocale într-o silabă (a-leai). Ca să desparți corect.',
      'Exemplu: stea = diftong. poezie = hiat la o-e.',
      'Reține: numeri silabele cu vocea, nu din ochi.'
    ),
    lesson(
      'vocab6',
      'Sens propriu, figurat, omonime',
      'Propriu: sensul de bază. Figurat: mutat, ca în „a înghețat de frică” (nu e gheață). Omonimele sună/se scriu la fel, sensuri diferite: broască (animal / la ușă).',
      'Exemplu: „broasca uși” vs „broasca din iaz” — același șir de sunete, altă treabă.',
      'Reține: contextul decide, nu cuvântul izolat.'
    )
  ],
  'romana:6:inter6': [
    lesson(
      'lume',
      'Româna nu trăiește doar în clasă',
      'E vorbită și dincolo de granița caietului: vorbitori din alte țări, aceleași cuvinte, alte locuri. Limba e a oamenilor, nu a hărții goale.',
      'Exemplu: o frază cu „și acolo” sau „vorbitori” — oameni, nu granițe.',
      'Reține: da, româna e vorbită și în alte țări. Asta nu anulează gramatica din clasă.'
    ),
    lesson(
      'popular',
      'Cultura populară: proverbe, obiceiuri',
      'E un depozit de povești, nu muzeu mort. Un proverb e o idee scurtă, verificată de mulți. O valoare din basm se vede în faptă (curaj, cinste), nu în slogan.',
      'Exemplu: scrii un proverb (clasic sau cu cuvintele tale), minimum 5 cuvinte. Sau: eroul muncește — hărnicie.',
      'Reține: compari, nu pui în vitrină.'
    ),
    lesson(
      'legende',
      'Compari o legendă a noastră cu a altora',
      'Cauți ce întrebări avem în comun, nu cine e „mai bun”. Comun vs deosebire. Oglindă, nu concurs.',
      'Exemplu: două povești despre un meșter sau un râu — ce au la fel (jertfă, loc), ce au diferit (nume, sfârșit).',
      'Reține: comparația e curiozitate.'
    ),
    lesson(
      'respect6',
      'Când vorbești despre alții',
      'Descrii, nu cobori. Nu ironizezi. Curiozitatea ține ușa deschisă.',
      'Exemplu: completezi „descrii, nu… jignești / ironizezi”.',
      'Reține: primul verb e descrii.'
    )
  ],

  'romana:7:oral7': [
    lesson(
      'prezentare',
      'Prezentarea: idee, exemplu, timp',
      'Sinteză ≠ copie de 10 pagini. Un plan de 2 minute: idee, exemplu, închidere. Dacă treci de timp, tai din mijloc, păstrezi deschiderea și capătul.',
      'Exemplu: „pauza e zgomotoasă” + „colegii strigă pe hol, ușa se trânteste” — exemplu cu verb de acțiune, nu o glumă goală.',
      'Reține: exemplul servește ideea, nu o înlocuiește cu povești.'
    ),
    lesson(
      'voce',
      'Vocea și gesturile',
      'Volumul se potrivește sălii: se aude, nu doare. Claritate: se înțeleg cuvintele. Pauze la idei. Gesturile ajută dacă nu fură ochii de la conținut.',
      'Exemplu: două unelte — volum și claritate (sau pauze). Mâinile nu țin loc de plan.',
      'Reține: se aude în spate, fără urlet. Gestul nu e conținut.'
    ),
    lesson(
      'sinteza',
      'Să sintetizezi',
      'Ții firul, tai surplusul. Mai scurt, același miez. Nu copiezi tot articolul cu vocea.',
      'Exemplu: trei cuvinte de plan — idee, exemplu, închidere.',
      'Reține: scurt și același, nu scurt și altceva.'
    ),
    lesson(
      'argument7',
      'O părere cu motiv',
      'Argument = afirmație + de ce. Volumul nu e un argument. Nici emoji-ul.',
      'Exemplu: „Temele în weekend merită limitate pentru că… (un motiv care se poate discuta).”',
      'Reține: fără „pentru că”, e slogan.'
    )
  ],
  'romana:7:lectura7': [
    lesson(
      'epic',
      'Epic: se întâmplă ceva',
      'Acțiune + personaje + (de obicei) un narator. Urmărești ce s-a întâmplat, cui. Dacă sunt personaje și întâmplări, cauți întâi firul epic.',
      'Exemplu: un text cu acțiune și personaje e, de regulă, epic. Spui cuvântul și o frază de de ce.',
      'Reține: epic ≠ „epos vechi”. E genul cu plot.'
    ),
    lesson(
      'liric',
      'Liric: o stare, o voce',
      'Nu neapărat o întâmplare. Cine vorbește și ce simte. Nu numeri faptele ca la un rezumat de acțiune.',
      'Exemplu: un text e doar o stare, fără plot → liric.',
      'Reține: simți, nu numeri episodul.'
    ),
    lesson(
      'dramatic',
      'Dramatic: de jucat',
      'Replici, scene, conflict care se joacă. Citit, tot auzi voci, nu un povestitor continuu.',
      'Exemplu: de ce e „de jucat”? Pentru că are replici / scene / conflict pe scenă. O frază.',
      'Reține: dramaticul e tăiat în voci, nu în paragrafe de povestitor.'
    ),
    lesson(
      'dovada',
      'Două puncte de vedere, o dovadă',
      'Compari, nu ștergi un unghi. „Personajul e timid” cere o frază care începe cu „în text” — o faptă sau o vorbă.',
      'Exemplu: „În text, stă la uşă și nu bate.” Eticheta fără citat nu ține.',
      'Reține: degetul pe rând. Apoi eticheta.'
    ),
    lesson(
      'narator',
      'Naratorul nu e automat autorul',
      'Cine spune povestea. Persoana I sau a III-a se vede din pronume. Autorul e cine a scris cartea; naratorul e vocea din text.',
      'Exemplu: „El a plecat” — narator la persoana a III-a, nu „eu, autorul”.',
      'Reține: vocea din text ≠ biografia de pe copertă.'
    )
  ],
  'romana:7:redactare7': [
    lesson(
      'portret',
      'Caracterizarea din fapte și vorbe',
      'Fără „bun” și „frumos” înșirate. O faptă, o vorbă. Arăți, nu etichetezi. Portretul se construiește, nu se lipește ca un sticker.',
      'Exemplu: 2 fraze despre un coleg: ce face, ce spune. Interzis bun/frumos.',
      'Reține: fapta bate adjectivul gol.'
    ),
    lesson(
      'cerere',
      'Cererea: text cu scop oficial',
      'Destinatar, ce soliciți, date (ale tale și ale cererii). E un formular în proză, nu o povestire.',
      'Exemplu: trei piese — destinatar, solicitare, date.',
      'Reține: scopul alege forma. Cererea nu e jurnal.'
    ),
    lesson(
      'recenzie',
      'Recenzia',
      'Titlul (ce recenzezi) + recomand sau nu + un motiv cu „pentru”. Cititorul decide dacă se apropie.',
      'Exemplu: o frază: titlu + „pentru că”.',
      'Reține: o recenzie fără motiv e o reclamă.'
    ),
    lesson(
      'calatorie',
      'Jurnal de călătorie, interviu',
      'Texte cu un scop clar: să arate un loc / să afle de la cineva. Interviul are întrebări, nu un monolog al tău. Călătoria are loc, observație, un capăt.',
      'Exemplu: înainte să scrii, întrebi: cu ce scop? pentru cine?',
      'Reține: scopul întâi. Forma după.'
    )
  ],
  'romana:7:limba7': [
    lesson(
      'fraza',
      'Fraza: propoziții legate',
      'Nu mai e o insulă. „și”, „dar”, „deci” leagă de același rang (coordonare). Numeri predicatele, nu virgulele, ca să știi câte propoziții sunt.',
      'Exemplu: „Am plecat și am ajuns târziu, pentru că ploua.” Trei predicații: am plecat, am ajuns, ploua → 3 propoziții.',
      'Reține: câte predicate, atâtea propoziții (în mare, la acest nivel).'
    ),
    lesson(
      'coord',
      'Coordonare: umăr la umăr',
      'Părți de același rang. Două idei, nu una sub cealaltă. „dar” opune, „deci” trage o urmare, „și” adaugă.',
      'Exemplu: „Am plecat și am ajuns târziu” — două fapte, același rang.',
      'Reține: coordonarea nu subordonează. Subordonarea răspunde la de ce, când, cine…'
    ),
    lesson(
      'cauza',
      'Cauză și scop',
      'Cauza: de ce? pentru că, căci. Scopul: în ce scop? ca să. „Am rămas acasă pentru că ploua” = cauză, nu scop.',
      'Exemplu: rescrii a doua parte ca răspuns la „de ce?”.',
      'Reține: de ce vs ca să. Nu sunt același raport.'
    ),
    lesson(
      'familie',
      'Familie lexicală, derivare, compunere',
      'Aceeași rădăcină: carte, cărticică, cărturar. Derivarea adaugă sufixe/prefixe. Compunerea lipește cuvinte. Nu e o listă de antonime.',
      'Exemplu: un cuvânt din familia lui „carte”, alta decât „carte”.',
      'Reține: rădăcina, nu sinonimul din altă familie (a citi e înrudit, dar alt cuvânt-bază).'
    ),
    lesson(
      'pleonasm',
      'Pleonasm și paronime',
      'Pleonasm: spui de două ori același lucru — „coboară jos”, „avansează înainte”. Tai surplusul. Paronimele seamănă, dar nu înseamnă la fel: temporal / temporar.',
      'Exemplu: „Coboară jos pe scări.” → „Coboară pe scări.”',
      'Reține: tai ce e deja în verb. La paronime, te uiți în dicționar, nu ghicești.'
    ),
    lesson(
      'registre',
      'Popular vs termeni de specialitate',
      'Nu e „greșit” vs „frumos”. E potrivit locului. La un test de știință, termenul precis. Într-o povestire orală, poți rămâne aproape de vorbirea de zi cu zi, fără greșeli de acord.',
      'Exemplu: „apă” e bun acasă; „H₂O” e bun la chimie — dar aici, la română, alegi cuvântul care se potrivește textului.',
      'Reține: registrul urmează situația.'
    )
  ],
  'romana:7:inter7': [
    lesson(
      'mit',
      'Mitul explică o lume',
      'Nu e minciună de copii. E un model: de ce e noaptea noapte, cine a pus o rânduială. Are un nume și o faptă. Dacă se rupe firul când îl spui tu, mai citești.',
      'Exemplu: 2 fraze, un mit (Manole, Dochía, Miorița…) — nume + ce se întâmplă, cuvintele tale.',
      'Reține: mit ≠ știre. E fir de origini / eroi.'
    ),
    lesson(
      'vecini',
      'Mituri și culturi din jur',
      'Se ating de a noastră. Merită descrise. Compari ca să vezi ce întrebări avem în comun, nu un clasament.',
      'Exemplu: de ce compari două mituri? O frază cu „aceleași” sau „pentru că”.',
      'Reține: curiozitate, nu rang. Soarele răsare și la alții.'
    ),
    lesson(
      'schimb',
      'Limba se schimbă când oamenii se întâlnesc',
      'Cuvintele călătoresc: comerț, lectură, vecini. Nu e o teoremă. E o observație: limba e vie.',
      'Exemplu: completezi verbul — se întâlnesc / se împrumută.',
      'Reține: întâlnirea mută cuvintele. Caietul nu e tot locul limbii.'
    ),
    lesson(
      'ascult-mit',
      'Față de mitul altora',
      'Primul verb: asculți. Apoi întrebi. Ironia închide ușa.',
      'Exemplu: asculți / ironizezi? — asculți.',
      'Reține: curiozitate > rang.'
    )
  ],

  'romana:8:oral8': [
    lesson(
      'argument8',
      'Argumentarea: afirmație + motiv + sursă',
      'O părere ține dacă are un motiv și, la nevoie, o sursă. Sursa sprijină, nu înlocuiește gândul. „Pentru că” e scheletul. Volumul nu e argument.',
      'Exemplu: teme în weekend — părere + pentru că + motiv discutabil, minimum 8 cuvinte.',
      'Reține: fără motiv, e slogan. Fără „am auzit ideea”, sari peste celălalt.'
    ),
    lesson(
      'dezbatere',
      'Dezbaterea: asculți ca să răspunzi',
      'Întâi înțelegi ce s-a zis. Reiei / rezumi ideea celuilalt, apoi adaugi. „Da, și…” înainte de „dar”. Nu strigi ca să aștepți rândul.',
      'Exemplu: un verb — reiei, rezumi, reformulezi — înainte să contrazici.',
      'Reține: arăți că ai auzit. Apoi argumentul tău.'
    ),
    lesson(
      'info',
      'Informație vs intenție',
      'Informația se poate verifica. Intenția e ce vrea vorbitorul. O știre anunță; un discurs de campanie vrea să convingă.',
      'Exemplu: știre vs campanie — verbul pentru campanie: să convingă.',
      'Reține: le deosebești. Nu sunt același lucru cu opinia ta.'
    ),
    lesson(
      'concluzie',
      'Concluzia strânge',
      'Nu deschide alt război. Ce rămâne după argumente. O frază, nu un capitol nou.',
      'Exemplu: „Așadar, … (revii la teză, nu la o temă nouă).”',
      'Reține: ușa se trage. Nu se deschide alt coridor.'
    )
  ],
  'romana:8:lectura8': [
    lesson(
      'necunoscut',
      'Text necunoscut: întâi firul',
      'Citești, apoi întrebi. Nu sari la grilă. Nu importi un comentariu de acasă. Textul din față.',
      'Exemplu: primul pas, un cuvânt — citești. Nu sari, nu inventezi.',
      'Reține: uneltele se mută pe textul nou, nu recitarea.'
    ),
    lesson(
      'tema',
      'Tema și esențialul',
      'Tema e despre ce e, pe scurt — nu formula magică „autorul vrea să transmită”. Esențialul ține firul; restul e ornament. Dacă tai un adjectiv și sensul rămâne, era ornament.',
      'Exemplu: text despre prietenie la școală — tema în 4–6 cuvinte, trebuie „prieten”.',
      'Reține: despre ce e, cu dovezi. Nu un citat învățat gol.'
    ),
    lesson(
      'dovada8',
      'Dovada din text',
      'Un cuvânt sau un fapt pe care îl poți arăta. Degetul pe rând. O părere a ta fără text nu e dovadă.',
      'Exemplu: „În rândul… personajul…” — loc + faptă.',
      'Reține: arăți, apoi numești.'
    ),
    lesson(
      'nonlit',
      'Nonliterar: afiș, tabel, știre',
      'Informează, explică, convinge — verifici datele. Afișul: cine, ce, când — mesajul util, apoi decorul. Tabelul: coloane și ce compară.',
      'Exemplu: afiș de serbare — cine anunță, cui, ora, locul. O frază.',
      'Reține: forma e parte din mesaj. Nu citești afișul ca pe o poezie.'
    )
  ],
  'romana:8:redactare8': [
    lesson(
      'arg-text',
      'Textul argumentativ: schelet vizibil',
      'Părere + motive + exemple. Un paragraf, o idee. Se vede scheletul, nu inspirația de moment. La EN, timpul e scurt: planul ține firul.',
      'Exemplu: ce lipsește din „părere + motive + …”? exemplele.',
      'Reține: un bloc, o treabă. Ideea următoare: paragraf nou.'
    ),
    lesson(
      'paragraf',
      'Paragraful',
      'O idee de bază. Nu amesteci trei fire într-un bloc. Cititorul respiră la capăt de paragraf.',
      'Exemplu: câte idei de bază într-un paragraf? Una.',
      'Reține: 1 paragraf = 1 idee.'
    ),
    lesson(
      'incheiere8',
      'Încheierea și planul la EN',
      'Încheierea nu aduce un subiect nou. La textul scris de examen, primul lucru e planul, nu inspirația. Chiar creativul are capăt + mijloc.',
      'Exemplu: încheierea aduce subiect nou? Nu. Primul lucru: plan.',
      'Reține: plan înainte. Ușa se închide după.'
    ),
    lesson(
      'creativ',
      'Text creativ scurt, tot cu plan',
      'Inspirația fără plan sare peste capăt. 3 puncte pe ciornă: scenă, faptă, capăt. Apoi scrii.',
      'Exemplu: o întâmplare de 8–12 rânduri — tot începe cu cine/unde, nu cu un adjectiv izolat.',
      'Reține: creativ nu înseamnă fără schelet.'
    )
  ],
  'romana:8:limba8': [
    lesson(
      'reluare',
      'Limba la a VIII-a: leagă ce știi',
      'Nu e materie nouă de la zero. Acord, caz, vocabular, punctuație — pe texte noi, ca la examen. Antrenezi gândirea, nu un singur articol tocit.',
      'Exemplu: „Elevii merge la curs” → „Elevii merg la curs.” Pluralul subiectului cere verbul la plural.',
      'Reține: dacă „se simte ciudat”, verifici cine se leagă de cine.'
    ),
    lesson(
      'acord',
      'Acorduri care țin piesele',
      'Subiect–predicat. Două subiecte → predicat la plural. „Fata și băiatul aleargă.” Atributul se acordă cu numele.',
      'Exemplu: completezi „Fata și băiatul … la poartă” cu aleargă.',
      'Reține: numeri cine face, apoi pui verbul.'
    ),
    lesson(
      'punctuatie8',
      'Punctuația frazei complexe',
      'Arată respirația și rolurile. Virgula după circumstanțialul antepus. Înainte de „deși”, adesea virgulă. Nu e confetti.',
      'Exemplu: „Când plouă, ies cu umbrela, deși e aproape.”',
      'Reține: virgula e pentru ochi și pentru rol, nu pentru frumusețe goală.'
    ),
    lesson(
      'doom',
      'DOOM: referință, nu capcană',
      'Te uiți când ești în dubiu. Nu tocești tot dicționarul. Norma e o unealtă.',
      'Exemplu: „greșeală gravă”, nu „grea” ca o geantă. Contextul decide colocarea.',
      'Reține: dicționarul când ai dubiu, nu 200 de capcane învățate pe de rost.'
    ),
    lesson(
      'vocab8',
      'Cuvântul potrivit în context',
      'La examen, vocabularul se vede în alegere, nu în lista tocită. Paronime, colocări, un sinonim care stă în frază.',
      'Exemplu: „A făcut o greșeală gravă.” gravă, nu grea.',
      'Reține: contextul, apoi cuvântul.'
    )
  ],
  'romana:8:inter8': [
    lesson(
      'lume-lit',
      'Un model din literatura lumii',
      'Merită dacă pune aceleași întrebări, și aiurea. Te uiți afară ca să te vezi. Nu e album exotic și nu înlocuiește româna.',
      'Exemplu: de ce merită? O frază cu „aceleași” sau „și noi”.',
      'Reține: aceleași unelte — idee, dovadă, ton. Nu schimbi grila pentru că e „străin”.'
    ),
    lesson(
      'punte8',
      'Cu ce unelte citești',
      'Idee, dovadă, ton — aceleași ca la un text românesc. Uneltele de română călătoresc.',
      'Exemplu: numește 2 unelte. Nu o teoremă, nu un unghi.',
      'Reține: nu schimbi uneltele. Citești, nu judeci rangul.'
    ),
    lesson(
      'noi',
      'Noi și ceilalți',
      'Primul verb: descrii, nu cobori. Curiozitate, nu rang. Valorile românești văzute din afară sunt o oglindă, nu un altar.',
      'Exemplu: descrii sau cobori? — descrii.',
      'Reține: oglinda, nu concursul.'
    ),
    lesson(
      'reflectie',
      'Reflecția: ce rămâne după',
      'Nu e doar relatare. Întrebi ce rămâne după ce s-a întâmplat. O frază, nu un eseu de liceu.',
      'Exemplu: completezi în 8–12 cuvinte, cu „după”.',
      'Reține: după fapte, un gând. Nu doar faptele.'
    )
  ]
};

function lessonsFor(subject, grade, chapterId) {
  const key = `${String(subject || '').toLowerCase()}:${String(grade || '')}:${String(chapterId || '')}`;
  return LESSONS[key] ? LESSONS[key].slice() : [];
}

module.exports = { LESSONS, lessonsFor, lesson };
