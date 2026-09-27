// Capitolul I din Matematică, clasa a VII-a, Litera, A1742 (2024):
// mulțimea numerelor reale.
// Text original. Nu copiem enunțuri, teste sau exemple din manual.
// Nu predăm formule de calcul prescurtat, descompunerea algebrică în factori
// și nici raționalizarea cu conjugată: acelea sunt la clasa a VIII-a.

function lesson(id, title, block) {
  const example = String(block.example || '').replace(/^Exemplu lucrat:\s*/i, '');
  const platter = [
    block.theory,
    `Exemplu lucrat: ${example}`,
    block.practice ? `Exersează: ${block.practice}` : '',
    block.mistakes ? `Greșeli frecvente: ${block.mistakes}` : '',
    block.tryThis,
    block.recap
  ].filter(Boolean).join('\n\n');
  return {
    id, title, platter,
    theory: block.theory,
    example,
    practice: block.practice,
    mistakes: block.mistakes,
    tryThis: block.tryThis,
    recap: block.recap,
    figure: block.figure,
    formulas: block.formulas
  };
}

const REALE_LESSONS = [
  lesson('recap-sase', 'Ne amintim din clasa a VI-a', {
    figure: 'integer-line',
    formulas: ['ℕ ⊂ ℤ ⊂ ℚ', '|a| este distanța până la 0'],
    theory: 'Înainte de numerele reale, pune la loc ce ai lucrat anul trecut. O mulțime strânge elemente distincte. În ℕ cauți divizori, numere prime și pe cel mai mare divizor comun.\n\nUn raport compară două mărimi. O proporție are două rapoarte egale. Procentul este o fracție cu numitorul 100.\n\nℤ adaugă numerele negative. ℚ strânge fracțiile cu numitor nenul. Modulul este distanța până la 0. În ℤ ai rezolvat și inecuații. Aici, la reale, compari numere, dar nu deschizi un capitol de inecuații.\n\nÎn geometrie știi unghiuri, drepte paralele, triunghiuri congruente, triunghiul isoscel, pe cel echilateral și pe cel dreptunghic. Teorema lui Pitagora o folosești din nou, cu o demonstrație nouă, mai târziu.',
    example: 'Un dreptunghi are laturile 6 cm și 8 cm. Diagonala se află cu Pitagora: 6^2 + 8^2 = 36 + 64 = 100, deci diagonala are 10 cm. Același calcul te ajută imediat la lungimi de forma √n.',
    practice: '1. 0 este în ℕ? 2. |−4| este cât? 3. 6^2 + 8^2 este cât?\n\nRăspunsuri: da. 4. 100.',
    mistakes: 'Nu confunda ℕ cu ℤ: negativele nu sunt naturale. Nu spune că modulul păstrează semnul minus. Nu relua testele de anul trecut ca pe niște enunțuri de copiat.',
    tryThis: 'Alege două laturi întregi ale unui dreptunghi, mai mici decât 10. Calculează pătratele lor, adună-le și spune dacă suma este un pătrat perfect.',
    recap: 'Anul trecut ai mulțimi, divizibilitate, rapoarte, ℤ, ℚ, ecuații, unghiuri, paralele și triunghiuri. Pitagora rămâne unealta pentru lungimi. De aici începe dreapta numerelor reale.'
  }),

  lesson('radical-patrat', 'Rădăcina pătrată a unui pătrat perfect', {
    figure: 'power-grid',
    formulas: ['√(n^2) = n pentru n natural', '√(a·b) = √a · √b când a și b sunt pătrate perfecte'],
    theory: 'Un pătrat perfect este un număr natural care se scrie n^2, cu n natural. 0, 1, 4, 9, 16, 25, 36, 49, 64, 81 și 100 sunt pătrate perfecte.\n\nRădăcina pătrată din n^2 este chiar n. Semnul √ se numește radical. Numărul de sub el se numește radicaland. √9 = 3, pentru că 3 · 3 = 9. Radicalul nu înseamnă împărțire la 2.\n\nUltima cifră a unui pătrat perfect poate fi 0, 1, 4, 5, 6 sau 9. Dacă un număr se termină în 2, în 3, în 7 sau în 8, nu este pătrat perfect.\n\nCa să afli rădăcina, poți descompune numărul în factori primi și grupa factorii câte doi. 36 = 2^2 · 3^2, deci √36 = 2 · 3 = 6. Asta este descompunere în factori primi, nu calculul algebric de la clasa a VIII-a.',
    example: '√(9 · 16) − √9 · 2. Întâi √(9 · 16) = √144 = 12. Apoi √9 = 3 și 3 · 2 = 6. Diferența este 12 − 6 = 6. Poți și √9 · √16 = 3 · 4 = 12, pentru că ambii factori sunt pătrate perfecte.',
    practice: '1. √49. 2. √16 + 1. 3. 2 · √9. 4. 23 poate fi pătrat perfect?\n\nRăspunsuri: 7. 5. 6. Nu, se termină în 3.',
    mistakes: 'Nu împărți la 2 ca să „scoți” radicalul. Nu aduna sub radical: √9 + √16 nu este √25. Nu spune că un număr terminat în 2 este pătrat perfect.',
    tryThis: 'Scrie pătratele numerelor de la 0 la 10. Încercuiește ultima cifră a fiecărui pătrat și notează care cifre nu apar niciodată.',
    recap: 'Pentru n natural, √(n^2) = n. Radicalul întreabă ce număr, înmulțit cu el însuși, dă radicalandul. Ultima cifră a unui pătrat este 0, 1, 4, 5, 6 sau 9.'
  }),

  lesson('radical-rational', 'Rădăcina pătrată a unui rațional', {
    figure: 'decimal-line',
    formulas: ['√(a^2) = |a|', '√(a/b) = √a / √b pentru b > 0'],
    theory: 'Pentru un număr rațional a, √(a^2) este |a|, nu neapărat a. Dacă a este negativ, pătratul lui este pozitiv, iar rădăcina pătrată se ia nenegativă. √((−5)^2) = √25 = 5 = |−5|.\n\nDacă a și b sunt pătrate perfecte și b nu este 0, atunci √(a/b) = √a / √b. Radicalul trece și la numărător, și la numitor.\n\nLa numere zecimale cauți un zecimal al cărui pătrat este numărul dat. 0,5 · 0,5 = 0,25, deci √0,25 = 0,5. 1,2 · 1,2 = 1,44, deci √1,44 = 1,2. Numără cifrele zecimale: la radical, numărul lor se înjumătățește când pătratul este „exact”.',
    example: '√(49/16) = √49 / √16 = 7/4. Și √(9/4) = 3/2. Pentru un zecimal: √0,09 = 0,3, fiindcă 0,3 · 0,3 = 0,09. Iar √((−3)^2) = 3, nu −3.',
    practice: '1. √(25/4). 2. √0,36. 3. √((−7)^2).\n\nRăspunsuri: 5/2. 0,6. 7.',
    mistakes: 'Nu scrii √(a^2) = a când a este negativ. Răspunsul rădăcinii pătrate este 0 sau pozitiv. Nu uiți numitorul: √(9/4) nu este 3.',
    tryThis: 'Calculează 0,4 · 0,4. Scrie apoi rădăcina pătrată a rezultatului și verifică dacă te întorci la 0,4.',
    recap: '√(a^2) = |a|. La o fracție, radicalul se desparte: √(a/b) = √a / √b, cu b > 0. La zecimale, pătratul exact îți spune rădăcina.'
  }),

  lesson('estimare-radical', 'Estimarea rădăcinii pătrate', {
    figure: 'triangle-right',
    formulas: ['dacă n^2 < a < (n+1)^2, atunci n < √a < n+1'],
    theory: 'Dacă a nu este pătrat perfect, √a stă între două naturale consecutive. Cauți n astfel încât n^2 < a < (n+1)^2. Atunci n < √a < n+1.\n\nPentru zecimi, încerci pătratele numerelor cu o zecimală. Aproximarea prin lipsă este mai mică decât √a. Aproximarea prin adaos este mai mare. Rotunjirea alege pe cea mai apropiată.\n\nPoți aproxima și din aproape în aproape. Alegi o încercare g. Apoi iei media dintre g și a/g. Noua încercare este mai aproape de rădăcină.\n\nLegătura cu Pitagora: într-un pătrat de latură 1, diagonala are lungimea √2. Într-un dreptunghi 2 pe 3, diagonala are lungimea √(2^2 + 3^2) = √13.',
    example: '√5 stă între 2 și 3, pentru că 2^2 = 4 și 3^2 = 9. Pătratul lui 2,2 este 4,84. Pătratul lui 2,3 este 5,29. Deci 2,2 < √5 < 2,3. Prin lipsă la zecimi: 2,2. Prin adaos: 2,3. O aproximare succesivă: pornești de la 2, apoi (2 + 5/2)/2 = (2 + 2,5)/2 = 2,25. Pătratul lui 2,25 este 5,0625, puțin peste 5.',
    practice: '1. Între ce naturale stă √20? 2. Câți naturali n au 3 < √n < 6? 3. Diagonala pătratului de latură 1 este ce radical?\n\nRăspunsuri: între 4 și 5, fiindcă 16 < 20 < 25. 26, de la 10 până la 35. √2.',
    mistakes: 'Nu pune √20 între 10 și 20. Compari cu pătrate, nu cu dublul. Nu spune că aproximarea prin lipsă este mai mare decât numărul.',
    tryThis: 'Încadrează √10 între două zecimi. Calculează pătratele lui 3,1 și 3,2 și spune care aproximare este prin lipsă.',
    recap: '√a se încadrează între pătrate vecine. Zecimile se verifică tot prin pătrat. Aproximarea succesivă face media dintre încercare și a împărțit la încercare. Diagonala se măsoară cu Pitagora.'
  }),

  lesson('irationale', 'Numere iraționale', {
    figure: 'triangle-right',
    formulas: ['√2, √3 și π sunt iraționale', 'ℝ \\ ℚ este mulțimea iraționalelor'],
    theory: 'Un număr rațional are scriere zecimală finită sau infinită periodică. Un număr irațional are scriere zecimală infinită și neperiodică. Nu îl poți scrie ca fracție de doi întregi.\n\n√2, √3 și √n, când n nu este pătrat perfect, sunt iraționale. Și π este irațional. π este raportul dintre lungimea cercului și diametru. Îl aproximezi cu 3,14 sau cu 22/7, dar niciuna nu este valoarea exactă.\n\nLe construiești cu rigla și compasul, prin Pitagora. Catete de lungime 1 dau ipotenuza √2. Apoi o catetă √2 și o catetă 1 dau ipotenuza √3. Continui la fel pentru √4, care este 2, apoi √5 și tot așa.\n\nMulțimea numerelor iraționale se scrie ℝ \\ ℚ. Ele stau pe axă, chiar dacă scrierea nu se termină.',
    example: '√2 este aproximativ 1,414, fără perioadă. Stă între 1 și 2. √4 = 2 este rațional, pentru că 4 este pătrat perfect. π este aproximativ 3,1416 și nu se așază într-o perioadă.',
    practice: '1. √9 este irațional? 2. √2 este între ce naturale? 3. 22/7 este chiar π?\n\nRăspunsuri: nu, √9 = 3. Între 1 și 2. Nu, 22/7 este doar o aproximare.',
    mistakes: 'Nu spune că un irațional „nu există”. Nu confunda aproximarea cu numărul exact. Nu trata √4 ca irațional.',
    tryThis: 'Desenează un pătrat de latură 1. Marchează diagonala și scrie lungimea ei exactă, apoi o aproximare cu două zecimale.',
    recap: 'Iraționalul are zecimale infinite, fără perioadă. √n este irațional când n nu este pătrat perfect. π este irațional. ℝ \\ ℚ le strânge pe toate.'
  }),

  lesson('multime-reale', 'Mulțimea numerelor reale', {
    figure: 'number-line',
    formulas: ['ℝ = ℚ ∪ (ℝ \\ ℚ)', 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ'],
    theory: 'Mulțimea numerelor reale, ℝ, este toată axa. Este reuniunea raționalelor cu iraționalele: ℝ = ℚ ∪ (ℝ \\ ℚ). Orice punct de pe axă este un număr real.\n\nIncluziunile sunt ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Orice natural este întreg, orice întreg este rațional, orice rațional este real. Reciproca nu este adevărată: √2 este real, dar nu este rațional. −3 este întreg, dar nu este natural.\n\nℝ* este ℝ fără 0. ℝ₊ este mulțimea realelor mai mari sau egale cu 0. ℝ₋ este mulțimea realelor mai mici sau egale cu 0. 0 stă și în ℝ₊, și în ℝ₋, dar nu stă în ℝ*.\n\nCa să spui unde se află un număr, verifici pe rând: este natural, întreg, rațional sau doar real?',
    example: '5 ∈ ℕ, deci 5 ∈ ℤ, 5 ∈ ℚ și 5 ∈ ℝ. −2 ∈ ℤ, deci −2 ∈ ℚ și −2 ∈ ℝ, dar −2 ∉ ℕ. 3/2 ∈ ℚ și 3/2 ∈ ℝ₊, dar 3/2 ∉ ℤ. √2 ∈ ℝ și √2 ∈ ℝ₊, dar √2 ∉ ℚ. 0 ∈ ℝ₊ și 0 ∈ ℝ₋, dar 0 ∉ ℝ*.',
    practice: '1. √16 este în ℕ? 2. π este în ℚ? 3. −1 este în ℝ₊?\n\nRăspunsuri: da, √16 = 4. Nu. Nu, −1 este negativ.',
    mistakes: 'Nu pune iraționalele în ℚ. Nu scoate pe 0 din ℝ₊. Nu uita că un întreg negativ este rațional: −4 = −4/1.',
    tryThis: 'Alege cinci numere: un natural, un întreg negativ, o fracție, √3 și 0. Pentru fiecare, spune cea mai mică mulțime dintre ℕ, ℤ, ℚ și ℝ în care stă sigur.',
    recap: 'ℝ este axa întreagă: raționale plus iraționale. ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. ℝ* nu are pe 0. ℝ₊ ține pe 0 și pozitivele. ℝ₋ ține pe 0 și negativele.'
  }),

  lesson('scoatere-factori', 'Scoaterea factorilor de sub radical', {
    formulas: ['√(a^2 · b) = |a| · √b', '√(a · b) = √a · √b pentru a ≥ 0 și b ≥ 0'],
    theory: 'Dacă sub radical stă un pătrat înmulțit cu altceva, scoți pătratul afară. Pentru b ≥ 0, √(a^2 · b) = |a| · √b. Modulul apare fiindcă radicalul este nenegativ.\n\nDacă a ≥ 0 și b ≥ 0, radicalul produsului este produsul radicalilor: √(a · b) = √a · √b. Suma nu se desparte: √(a + b) nu este √a + √b.\n\nForma cea mai simplă este cea în care sub radical nu mai rămâne niciun pătrat perfect mai mare decât 1, iar coeficientul din față este întreg, dacă se poate.',
    example: '√50 = √(25 · 2) = 5√2. √12 = √(4 · 3) = 2√3. √(9 · 16) = 3 · 4 = 12. Dacă a este −4 și b este 2, √((−4)^2 · 2) = √(16 · 2) = 4√2 = |−4| · √2.',
    practice: '1. √18. 2. √72. 3. √8 + √2, scris cu un singur radical de același fel.\n\nRăspunsuri: 3√2. 6√2. 2√2 + √2 = 3√2.',
    mistakes: 'Nu scoate factorul fără pătrat: din √12 nu iese 4√3. Nu uiți modulul când baza pătratului este negativă. Nu despărți o sumă sub radical.',
    tryThis: 'Descompune 48 în factori primi. Scoate pătratele de sub √48 și scrie forma simplă.',
    recap: 'Un pătrat iese de sub radical ca modul. Produsul se desparte doar când factorii sunt nenegativi. Forma simplă nu mai ascunde un pătrat sub radical.'
  }),

  lesson('introducere-factori', 'Introducerea factorilor sub radical', {
    figure: 'compare-line',
    formulas: ['a√b = √(a^2 · b) pentru a ≥ 0'],
    theory: 'Introducerea este mișcarea inversă. Dacă a ≥ 0 și b ≥ 0, atunci a√b = √(a^2 · b). Coeficientul intră sub radical doar după ce l-ai ridicat la pătrat.\n\nDacă a este negativ, radicalul rămâne nenegativ, deci semnul minus stă afară. −3√2 = −√(9 · 2) = −√18. Nu scrii √(−18).\n\nMișcarea aceasta te ajută la comparare. Două numere de forma p√q și r√s, cu p și r pozitivi, se compară după ce le aduci sub radical: compari numerele de sub radical.',
    example: 'Compară 2√3 și 3√2. 2√3 = √(4 · 3) = √12. 3√2 = √(9 · 2) = √18. 12 < 18, deci √12 < √18 și 2√3 < 3√2. Pentru un coeficient negativ: −2√3 = −√12, care este negativ, deci mai mic decât ambele.',
    practice: '1. Scrie 4√5 sub un singur radical. 2. Care este mai mare: 3√2 sau 2√5? 3. −5√2 este egal cu √50?\n\nRăspunsuri: √80. 2√5, pentru că √20 < √25. Nu, −5√2 = −√50.',
    mistakes: 'Nu introduci coeficientul fără să-l ridici la pătrat. Nu bagi semnul minus sub radical. Nu compari doar coeficienții și ignori ce stă sub radical.',
    tryThis: 'Alege 5√2 și 3√6. Introdu coeficienții sub radical și spune care număr este mai mare.',
    recap: 'Pentru a ≥ 0, a√b = √(a^2 · b). Semnul minus rămâne în față. Sub radical, numărul mai mare dă radicalul mai mare.'
  }),

  lesson('aproximare-axa', 'Aproximare și reprezentare pe axă', {
    figure: 'number-line',
    formulas: ['prin lipsă: te oprești mai jos', 'prin adaos: treci pe treapta de deasupra'],
    theory: 'Un irațional nu are un loc „la o zecimală exactă”, dar îl poți așeza pe axă prin aproximări. Aproximarea prin lipsă este mai mică decât numărul. Aproximarea prin adaos este mai mare. Rotunjirea alege aproximarea cea mai apropiată. Dacă te oprești exact la jumătate, rotunjirea obișnuită urcă.\n\nPe axă, întâi găsești întregii vecini, apoi zecimile. √2 este aproximativ 1,414. Prin lipsă la sutimi este 1,41. Prin adaos la sutimi este 1,42. Punctul stă între 1,41 și 1,42, mai aproape de 1,41.\n\nPoți plasa și prin construcție. √2 este diagonala pătratului de latură 1. Compasul mută lungimea aceea pe axă, la dreapta lui 0.',
    example: 'π este aproximativ 3,1415. Prin lipsă la zecimi: 3,1. Prin adaos la zecimi: 3,2. Rotunjit la zecimi: 3,1, pentru că a doua zecimală este 4. Pe axă, π stă între 3 și 4, puțin după 3,1.',
    practice: '1. √3 este aproximativ 1,732. Cum îl scrii prin lipsă la sutimi? 2. Dar prin adaos la sutimi? 3. Între ce întregi îl pui pe axă?\n\nRăspunsuri: 1,73. 1,74. Între 1 și 2.',
    mistakes: 'Nu pune √2 la stânga lui 1. Nu numi „prin lipsă” o valoare mai mare decât numărul. Nu confunda rotunjirea cu trunchierea: 1,414 la sutimi prin lipsă este 1,41, iar rotunjit tot 1,41, dar 1,415 rotunjit la sutimi urcă.',
    tryThis: 'Marchează pe o axă punctele 1, 1,5 și 2. Așază aproximativ √2 și √3 și spune care este mai aproape de 1,5.',
    recap: 'Lipsă înseamnă mai mic, adaos înseamnă mai mare. Pe axă, radicalul stă între pătratele vecine. Construcția cu compasul dă locul exact, nu doar aproximarea.'
  }),

  lesson('comparare-reale', 'Compararea numerelor reale', {
    figure: 'compare-line',
    formulas: ['dacă 0 ≤ x < y, atunci x^2 < y^2', '√x < √y când 0 ≤ x < y'],
    theory: 'Întâi compari semnele. Orice număr negativ este mai mic decât orice număr pozitiv. 0 stă între ele.\n\nDacă ambele sunt pozitive, ai trei căi. Le aduci la același fel de radical, introducând factorii. Le ridici la pătrat: pentru numere nenegative, pătratul păstrează ordinea. Le compari prin aproximări zecimale, când radicalii sunt diferiți.\n\nRadicalul păstrează și el ordinea: dacă 0 ≤ x < y, atunci √x < √y.',
    example: 'Compară √12 și 3√2. √12 = 2√3. Apoi 2√3 = √12 și 3√2 = √18. 12 < 18, deci 2√3 < 3√2. Altă cale: (2√3)^2 = 12 și (3√2)^2 = 18. Aceeași concluzie. √2 și 1,5: (1,5)^2 = 2,25 > 2, deci √2 < 1,5.',
    practice: '1. √7 și √11, care este mai mic? 2. 4√2 și √30? 3. −√9 și −2?\n\nRăspunsuri: √7. 4√2 = √32, deci √30 este mai mic. −√9 = −3, deci −3 < −2.',
    mistakes: 'Nu ridica la pătrat două numere negative și să crezi că ordinea rămâne aceeași. Nu compari √8 cu 4 doar uitându-te la cifre. Nu uiți semnul când un termen este negativ.',
    tryThis: 'Ordonează crescător √8, 3 și 2√3. Arată calculele prin care le-ai adus la pătrate sau sub radical.',
    recap: 'Negativele sunt la stânga. La pozitive, introduci sub radical, ridici la pătrat sau aproximezi. Pătratul păstrează ordinea doar pentru numere nenegative.'
  }),

  lesson('modul-real', 'Modulul unui număr real', {
    figure: 'integer-line',
    formulas: ['|x| = x dacă x ≥ 0', '|x| = −x dacă x < 0', '|x| = a'],
    theory: 'Modulul lui x, scris |x|, este distanța de la x până la 0 pe axă. Distanța nu este negativă. |5| = 5 și |−5| = 5. |0| = 0.\n\nDacă x ≥ 0, |x| = x. Dacă x < 0, |x| = −x, adică opusul, care este pozitiv. |x| = |−x|. Produsul modulelor este modulul produsului.\n\nPoți calcula și |√a − b|. Întâi faci scăderea, apoi scoți semnul dacă rezultatul este negativ.\n\nEcuația |x| = a se citește „distanța până la 0 este a”. Dacă a > 0, sunt două soluții: x = a și x = −a. Dacă a = 0, singura soluție este x = 0. Dacă a < 0, nu există soluție, fiindcă o distanță nu este negativă.',
    example: '|√9 − 5| = |3 − 5| = |−2| = 2. |√2 − 1| rămâne √2 − 1, pentru că √2 > 1. Ecuația |x| = 4 are soluțiile 4 și −4. |x| = −3 nu are soluție reală.',
    practice: '1. |−7|. 2. |√16 − 7|. 3. Soluțiile lui |x| = 0.\n\nRăspunsuri: 7. 3. Doar x = 0.',
    mistakes: 'Nu lași semnul minus la rezultat. Nu spui că |x| = −3 are soluție. Nu uiți a doua soluție când a este pozitiv.',
    tryThis: 'Alege un număr negativ și măsoară pe axă câți pași sunt până la 0. Scrie modulul și opusul și spune care dintre ele este pozitiv.',
    recap: 'Modulul este distanța până la origine. Este 0 sau pozitiv. |x| = a are două soluții când a > 0, una când a = 0 și niciuna când a < 0.'
  }),

  lesson('operatii-reale', 'Operații cu numere reale', {
    formulas: ['√a · √b = √(a · b) pentru a ≥ 0 și b ≥ 0', '√a / √b = √(a/b) pentru b > 0'],
    theory: 'În ℝ rămân valabile comutativitatea, asociativitatea și distributivitatea. Le folosești la fel ca la raționale.\n\nTermenii asemenea au același radical, scris la fel. Îi aduni sau îi scazi doar pe coeficienți: 3√2 + 5√2 = 8√2. √2 + √3 nu se strânge într-un singur radical.\n\nÎnmulțirea: √a · √b = √(a · b), cu a ≥ 0 și b ≥ 0. Împărțirea: √a / √b = √(a/b), cu b > 0. Înainte de adunare, scoți factorii ca radicalii să arate la fel.',
    example: '√8 + √18 − √2 = 2√2 + 3√2 − √2 = 4√2. Produsul √6 · √24 = √144 = 12. Câtul √50 / √2 = √(50/2) = √25 = 5.',
    practice: '1. 4√3 − √3. 2. √3 · √12. 3. √45 / √5.\n\nRăspunsuri: 3√3. √36 = 6. √9 = 3.',
    mistakes: 'Nu aduni radicalii diferiți: √4 + √9 nu este √13. Nu înmulți coeficientul cu numărul de sub radical. Nu împarți la un radical nul: √b trebuie să fie nenul.',
    tryThis: 'Calculează √12 + √27. Scoate întâi factorii, apoi adună coeficienții lui √3.',
    recap: 'Aduni doar termeni cu același radical. Produsul și câtul radicalilor se strâng sub un singur radical, când numerele sunt nenegative și împărțitorul nu este 0.'
  }),

  lesson('puteri-reale', 'Puteri ale numerelor reale', {
    figure: 'power-grid',
    formulas: ['(√a)^2 = a pentru a ≥ 0', 'a^m · a^n = a^(m+n)', 'a^(−n) = 1/a^n pentru a ≠ 0'],
    theory: 'Pentru un număr real a și un exponent natural n, a^n înseamnă a înmulțit cu el de n ori. a^1 = a. Pentru a ≠ 0, a^0 = 1.\n\nRegulile rămân: a^m · a^n = a^(m+n), (a^m)^n = a^(m·n), (a·b)^n = a^n · b^n și a^m / a^n = a^(m−n), când a ≠ 0. Pentru exponent negativ, a^(−n) = 1/a^n, cu a ≠ 0.\n\nPătratul unui radical readuce numărul: dacă a ≥ 0, (√a)^2 = a. În schimb √(a^2) = |a|. Cele două nu spun același lucru când a este negativ.',
    example: '(√7)^2 = 7. √(7^2) = 7. √((−7)^2) = 7, nu −7. 2^3 · 2^2 = 2^5 = 32. 5^(−2) = 1/5^2 = 1/25. (3√2)^2 = 9 · 2 = 18.',
    practice: '1. (√5)^2. 2. √(5^2). 3. 10^(−1). 4. (2√3)^2.\n\nRăspunsuri: 5. 5. 1/10. 12.',
    mistakes: 'Nu scrii √(a^2) = a pentru a negativ. Nu aduni exponenții la un produs de baze diferite. Nu spui că a^(−n) este un număr negativ: semnul îl dă baza, nu exponentul.',
    tryThis: 'Calculează (√10)^2 și 10^(−1). Spune care rezultat este 10 și care este 1/10.',
    recap: 'Puterea cu exponent întreg urmează aceleași reguli ca la raționale. (√a)^2 = a pentru a ≥ 0. √(a^2) = |a|.'
  }),

  lesson('rationalizare', 'Raționalizarea numitorului a√b', {
    formulas: ['6/√3 = 2√3', 'amplifici cu √b'],
    theory: 'Raționalizarea schimbă scrierea, nu valoarea. Când numitorul este de forma a√b, cu a ≠ 0 și b > 0, amplifici fracția cu √b. Sus și jos se înmulțesc cu același număr nenul.\n\n(√b)^2 = b, deci radicalul din numitor dispare. Apoi simplifici, dacă se poate.\n\nAici numitorul are un singur termen cu radical. Nu deschidem altă metodă.',
    example: '6/√3 se amplifică cu √3: numărătorul devine 6√3, numitorul devine 3. 6√3 împărțit la 3 este 2√3. Verificare prin aproximare: √3 este cam 1,732. 6 împărțit la 1,732 este cam 3,464. Și 2 · 1,732 este cam 3,464.',
    practice: '1. Scrie 6/√3 de forma a√3. 2. Raționalizează 5/√5. 3. Raționalizează 3/(2√3).\n\nRăspunsuri: 2√3. √5. 3√3 împărțit la 6, adică √3 / 2.',
    mistakes: 'Nu ștergi numitorul. Îl înmulțești. Nu amplifici doar sus. Nu împarți coeficientul greșit: 6√3 împărțit la 3 este 2√3, nu 6√3.',
    tryThis: 'Pornește de la 8/√2. Amplifică cu √2, simplifică și spune coeficientul rămas în fața radicalului.',
    recap: 'La un numitor a√b amplifici cu √b. Radicalul din numitor devine b. Apoi simplifici. Valoarea fracției rămâne aceeași.'
  }),

  lesson('ordine-operatii', 'Ordinea operațiilor', {
    formulas: ['întâi parantezele', 'apoi puterile și radicalii', 'apoi · și :', 'la urmă + și −'],
    theory: 'Într-un calcul cu reale respecți aceeași ordine. Întâi parantezele, de la cea mai dinăuntru. Apoi puterile și radicalii. Apoi înmulțirile și împărțirile, de la stânga la dreapta. La urmă adunările și scăderile, de la stânga la dreapta.\n\nO bară de fracție este o paranteză: calculezi tot numărătorul și tot numitorul, apoi împărți. Un radical este și el o paranteză: întâi ce este sub el.',
    example: '2 + √9 · 4. Radicalul este 3, apoi 3 · 4 = 12, apoi 2 + 12 = 14. Nu faci (2 + 3) · 4. Alt calcul: (√16 + √9)^2 = (4 + 3)^2 = 7^2 = 49. Și 12/√4 − 2^3 = 12/2 − 8 = 6 − 8 = −2.',
    practice: '1. √16 + √9 · 2. 2. (√25 − √9)^2. 3. 3 · 2^2 − √4.\n\nRăspunsuri: 4 + 3 · 2 = 10. (5 − 3)^2 = 4. 3 · 4 − 2 = 10.',
    mistakes: 'Nu aduni înainte să înmulțești. Nu scoți radicalul după ce ai adunat cu termenul de dinainte. Nu uiți că 2^3 este 8, nu 6.',
    tryThis: 'Scrie un calcul cu o paranteză, un radical și o putere. Rezolvă-l în ordinea corectă și spune ce număr greșit ai fi obținut dacă adunai primul.',
    recap: 'Paranteze, apoi puteri și radicali, apoi înmulțiri și împărțiri, apoi adunări și scăderi. Bara de fracție și radicalul lucrează ca niște paranteze.'
  }),

  lesson('medie-ponderata', 'Media aritmetică ponderată', {
    figure: 'frequency-bars',
    formulas: ['media aritmetică = (a + b)/2 pentru două numere', 'media ponderată = (p·a + q·b)/(p + q)'],
    theory: 'Media aritmetică a două numere este (a + b)/2. Pentru mai multe numere, aduni și împărți la câte sunt. Toate intră cu aceeași greutate.\n\nMedia ponderată ține cont că unele valori apar de mai multe ori sau contează mai mult. Dacă a are ponderea p și b are ponderea q, media este (p·a + q·b)/(p + q). Ponderile sunt numere pozitive. La un șir cu frecvențe, frecvența este ponderea.\n\nO folosești la medii școlare, când un test contează altfel decât o temă, și la prețuri, când cumperi cantități diferite.',
    example: 'Notele 9, 7 și 10 au ponderile 1, 2 și 1. Media este (1 · 9 + 2 · 7 + 1 · 10)/(1 + 2 + 1) = (9 + 14 + 10)/4 = 33/4 = 8,25. Dacă toate ponderile ar fi 1, media ar fi (9 + 7 + 10)/3 = 26/3.',
    practice: '1. Media aritmetică a lui 4 și 16. 2. Două caiete costă 8 lei și trei costă 10 lei bucata. Prețul mediu pe caiet? 3. Notele 10 și 6, cu ponderile 3 și 1.\n\nRăspunsuri: 10. (2 · 8 + 3 · 10)/5 = 46/5 = 9,2. (3 · 10 + 1 · 6)/4 = 9.',
    mistakes: 'Nu împărți la numărul de valori diferite când unele se repetă. Împărți la suma ponderilor. Nu aduni ponderile la note în loc să le înmulțești.',
    tryThis: 'Inventă trei prețuri și spune câte bucăți cumperi din fiecare. Calculează prețul mediu pe bucată cu ponderi.',
    recap: 'Media aritmetică împarte suma la numărul termenilor. Media ponderată înmulțește fiecare valoare cu ponderea ei și împarte la suma ponderilor.'
  }),

  lesson('medie-geometrica', 'Media geometrică', {
    formulas: ['media geometrică = √(a · b) pentru a > 0 și b > 0', '√(a · b) ≤ (a + b)/2'],
    theory: 'Media geometrică a două numere reale pozitive a și b este √(a · b). Este pozitivă, ca orice rădăcină pătrată.\n\nEa este mai mică sau egală cu media aritmetică. Egalitatea are loc doar când a = b. Ideea: diferența √a − √b, ridicată la pătrat, este 0 sau mai mare. Din calcul rămâne a + b − 2√(a · b) ≥ 0, deci (a + b)/2 ≥ √(a · b).\n\nMedia geometrică apare la laturi, la scări și la un dreptunghi: latura pătratului cu aceeași arie ca dreptunghiul de laturi a și b este chiar √(a · b).',
    example: 'Pentru 4 și 16, media aritmetică este (4 + 16)/2 = 10. Media geometrică este √(4 · 16) = √64 = 8. 8 < 10. Pentru 5 și 5, ambele medii sunt 5.',
    practice: '1. Media geometrică a lui 4 și 16. 2. Media geometrică a lui 9 și 4. 3. Pentru 7 și 7, care medie este mai mare?\n\nRăspunsuri: 8. 6. Sunt egale, ambele 7.',
    mistakes: 'Nu calcula (a + b)/2 când ți se cere media geometrică. Nu pune sub radical o sumă. Nu spune că media geometrică poate depăși media aritmetică pentru numere pozitive.',
    tryThis: 'Desenează un dreptunghi 4 pe 9. Aria este 36. Latura pătratului cu aceeași arie este media geometrică. Calculeaz-o.',
    recap: 'Media geometrică este √(a · b), cu a și b pozitivi. Este cel mult media aritmetică. Sunt egale doar când cele două numere sunt egale.'
  }),

  lesson('ecuatie-patrat', 'Ecuații de forma x^2 = a', {
    figure: 'number-line',
    formulas: ['dacă a > 0, x = √a sau x = −√a', 'dacă a = 0, x = 0', 'dacă a < 0, nu există soluție în ℝ'],
    theory: 'Ecuația x^2 = a întreabă ce număr real, înmulțit cu el însuși, dă a.\n\nDacă a > 0, sunt două soluții: x = √a și x = −√a. Ambele, ridicate la pătrat, dau a. Dacă a = 0, singura soluție este x = 0. Dacă a < 0, nu există soluție în ℝ, pentru că un pătrat nu este negativ.\n\nUnele ecuații se aduc la această formă. Scoți coeficientul lui x^2 prin împărțire, sau izolezi un pătrat. Nu folosi formule de calcul prescurtat: le înveți la clasa a VIII-a. Aici doar reduci la x^2 = a.',
    example: 'x^2 = 9. Soluțiile sunt 3 și −3. x^2 = 0 dă x = 0. x^2 = −4 nu are soluție reală. 4x^2 = 36 se împarte la 4: x^2 = 9, deci x = 3 sau x = −3. (x − 1)^2 = 9 înseamnă x − 1 = 3 sau x − 1 = −3, deci x = 4 sau x = −2.',
    practice: '1. x^2 = 25. 2. x^2 = −1. 3. 2x^2 = 8.\n\nRăspunsuri: 5 și −5. Nicio soluție reală. x^2 = 4, deci 2 și −2.',
    mistakes: 'Nu da doar soluția pozitivă. Nu inventa o soluție când a este negativ. Nu împărți doar o parte a ecuației la coeficient.',
    tryThis: 'Scrie trei ecuații x^2 = a: una cu două soluții, una cu o soluție și una fără soluție reală. Rezolvă-le.',
    recap: 'x^2 = a are două soluții reale când a > 0, anume √a și −√a. Are soluția 0 când a = 0. Nu are soluție reală când a < 0.'
  }),

  lesson('recap-reale', 'Recapitulare: numere reale', {
    figure: 'number-line',
    formulas: ['√(a^2) = |a|', 'a√b = √(a^2 · b) pentru a ≥ 0', '6/√3 = 2√3'],
    theory: 'ℝ este axa: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Iraționalele, ca √2 și π, au zecimale infinite neperiodice.\n\nRadicalul scoate un pătrat. √(n^2) = n pentru n natural. √(a^2) = |a|. Scoți factori cu |a|, îi introduci la loc doar după ce i-ai ridicat la pătrat și doar cu grijă la semn.\n\nCompari prin radical comun, prin pătrat sau prin aproximare. Modulul este distanța până la 0. Operațiile adună doar termeni asemenea. Puterile urmează regulile cunoscute, iar (√a)^2 = a pentru a ≥ 0.\n\nNumitorul a√b se raționalizează prin amplificare cu √b. Media ponderată folosește ponderi. Media geometrică este √(a · b) și nu depășește media aritmetică. x^2 = a are 2, 1 sau 0 soluții reale, după semnul lui a.',
    example: 'Un calcul mixt: √(9 · 16) − √9 · 2 = 12 − 6 = 6. Media geometrică a lui 4 și 16 este 8, iar cea aritmetică este 10. 6/√3 = 2√3. |x| = 2 dă x = 2 sau x = −2.',
    practice: '1. √50 în formă simplă. 2. Soluțiile lui x^2 = 4. 3. Media ponderată a notelor 8 și 10, cu ponderile 1 și 3.\n\nRăspunsuri: 5√2. 2 și −2. (8 + 30)/4 = 38/4 = 9,5.',
    mistakes: 'Nu amesteca √(a + b) cu √a + √b. Nu da o singură soluție la x^2 = a când a > 0. Nu numi media aritmetică drept medie geometrică.',
    tryThis: 'Fă un fluturaș cu cinci rânduri: un radical simplificat, un număr pus pe axă, un modul, o medie și o ecuație x^2 = a. Rezolvă fiecare rând.',
    recap: 'Realele umplu axa. Radicalul, modulul, puterea și mediile sunt uneltele capitolului. x^2 = a se judecă după semnul lui a.'
  })
];

module.exports = { REALE_LESSONS };
