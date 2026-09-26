// Capitolul I din Matematică, clasa a VI-a, Litera, A1498 (2023):
// mulțimi, relații, operații, divizibilitate în ℕ.
// Text original. Nu copiem enunțuri, teste sau exemple din manual.

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

const MULTIMI_LESSONS = [
  lesson('multimi-naturale', 'Mulțimi. Mulțimea numerelor naturale', {
    figure: 'venn',
    formulas: ['x ∈ A înseamnă „x este în A”', 'x ∉ A înseamnă „x nu este în A”', '∅ nu are niciun element'],
    theory: 'O mulțime este o colecție de obiecte bine alese și diferite între ele. O notezi cu literă mare: A, B, N. Elementele se notează cu litere mici: a, b, x.\n\nDacă x este în A, scrii x ∈ A și citești „x aparține lui A”. Dacă nu este, scrii x ∉ A.\n\nPoți da mulțimea în trei feluri. O enumeri: A = {2, 4, 6}. O descrii printr-o proprietate: numerele naturale pare mai mici decât 8. O desenezi cu o diagramă: un cerc, iar elementele stau în interior.\n\nMulțimea finită are un număr de elemente pe care îl poți număra. Acel număr este cardinalul. Mulțimea infinită nu se termină. Mulțimea vidă, ∅, nu are niciun element. {0} nu este vidă: zero este un element.\n\nℕ este mulțimea numerelor naturale: 0, 1, 2, 3 și tot așa. ℕ* este ℕ fără 0: 1, 2, 3 și tot așa.',
    example: 'A = {1, 3, 5}. 3 ∈ A și 4 ∉ A. Cardinalul lui A este 3. ∅ are cardinalul 0. 0 ∈ ℕ, dar 0 ∉ ℕ*.',
    practice: '1. Câte elemente are {2, 2, 5}? 2. 0 este în ℕ*? 3. {0} este vidă?\n\nRăspunsuri: 1, pentru că elementele se scriu o singură dată. Nu. Nu.',
    mistakes: 'Nu pune același element de două ori și să-l numeri de două ori. Nu confunda ∅ cu {0}. Nu folosi literă mică pentru numele mulțimii.',
    tryThis: 'Scrie mulțimea vocalelor din cuvântul „mare” prin enumerare. Spune cardinalul. Apoi spune un element care nu îi aparține.',
    recap: 'Mulțimea strânge obiecte distincte. ∈ înseamnă că elementul este înăuntru. Cardinalul numără elementele. ∅ este goală. ℕ conține pe 0. ℕ* începe de la 1.'
  }),

  lesson('relatii-multimi', 'Relații între mulțimi', {
    figure: 'venn',
    formulas: ['A ⊂ B înseamnă că A este submulțime a lui B', 'A = B dacă au exact aceleași elemente', 'O mulțime cu n elemente are 2^n submulțimi'],
    theory: 'A este submulțime a lui B dacă fiecare element din A este și în B. Scrii A ⊂ B. Dacă găsești un element din A care nu este în B, scrii A ⊄ B.\n\nDouă mulțimi sunt egale dacă au exact aceleași elemente, indiferent de ordine. Atunci fiecare este submulțime a celeilalte.\n\nMulțimea vidă este submulțime a oricărei mulțimi. Orice mulțime este submulțime a ei însăși.\n\nCa să numeri submulțimile, le listezi. Pentru fiecare element ai două alegeri: îl pui sau nu îl pui. La n elemente, numărul submulțimilor este 2^n. Aici intră și mulțimea vidă, și mulțimea întreagă.\n\nPe diagramă, cercul lui A stă în interiorul cercului lui B când A ⊂ B.',
    example: 'A = {1, 2}. Submulțimile sunt ∅, {1}, {2} și {1, 2}. Sunt 4, adică 2^2. {2, 1} = {1, 2}. {1} ⊂ A, dar {1, 3} ⊄ A.',
    practice: '1. {2} ⊂ {2, 5}? 2. Câte submulțimi are {a, b, c}? 3. {1, 2} este egală cu {2, 1}?\n\nRăspunsuri: da. 8. Da.',
    mistakes: 'Nu uita submulțimea vidă când listezi. Nu spune că {1} = 1: una este mulțime, cealaltă este element. Nu schimba ⊂ cu ∈. 1 ∈ A, dar {1} ⊂ A.',
    tryThis: 'Alege o mulțime cu două elemente din penarul tău. Scrie toate submulțimile. Numără-le și verifică dacă ai 2^2.',
    recap: 'Submulțimea stă cu totul în cealaltă mulțime. Egalitatea înseamnă aceleași elemente. La n elemente listezi 2^n submulțimi, cu vida și cu mulțimea întreagă.'
  }),

  lesson('operatii-multimi', 'Reuniunea, intersecția, diferența', {
    figure: 'venn',
    formulas: ['A ∪ B = tot ce este în A sau în B', 'A ∩ B = doar ce este în amândouă', 'A \\ B = ce este în A, dar nu în B'],
    theory: 'Reuniunea A ∪ B strânge elementele care sunt în A, în B sau în amândouă. Pe fiecare îl scrii o singură dată.\n\nIntersecția A ∩ B ține doar elementele comune. Dacă nu există niciunul, intersecția este vidă. Atunci mulțimile sunt disjuncte.\n\nDiferența A \\ B ține elementele din A care nu sunt în B. Nu este același lucru cu B \\ A.\n\nPe diagramă, reuniunea este tot desenul colorat. Intersecția este zona în care cercurile se acoperă. Diferența este partea dintr-un cerc care rămâne singură.',
    example: 'A = {2, 4, 6, 8} și B = {1, 2, 3, 4}. A ∪ B = {1, 2, 3, 4, 6, 8}. A ∩ B = {2, 4}. A \\ B = {6, 8}. B \\ A = {1, 3}.',
    practice: '1. {1, 2} ∩ {3, 4} este ce mulțime? 2. {1, 2} ∪ {2, 3}. 3. {1, 2, 3} \\ {2}.\n\nRăspunsuri: ∅, deci sunt disjuncte. {1, 2, 3}. {1, 3}.',
    mistakes: 'Nu scrie de două ori elementul comun în reuniune. Nu inversezi diferența. Nu spune că intersecția vidă înseamnă că mulțimile nu există: ele există, doar nu au elemente comune.',
    tryThis: 'Desenează două cercuri. Pune în intersecție numerele pare și mai mici decât 6 care sunt și divizori ai lui 12. Completează restul cercurilor cu elemente alese de tine și scrie cele trei operații.',
    recap: 'Reuniunea este „sau”. Intersecția este „și”. Diferența scoate din prima mulțime ce se află și în a doua. Intersecție vidă înseamnă mulțimi disjuncte.'
  }),

  lesson('aplicatii-multimi', 'Aplicații cu mulțimi', {
    figure: 'venn',
    formulas: ['|A ∪ B| = |A| + |B| − |A ∩ B|'],
    theory: 'Când mulțimile sunt date prin enumerare, faci operațiile element cu element. Când sunt date prin proprietate, cauți numerele care îndeplinesc condiția.\n\nCardinalul reuniunii nu este mereu suma cardinalelor. Elementele comune ar fi numărate de două ori. Le scazi o dată: |A ∪ B| = |A| + |B| − |A ∩ B|.\n\nPe diagramă pui întâi intersecția, apoi restul fiecărui cerc, apoi pe cei care nu sunt în niciun cerc.',
    example: 'Într-un grup de 32 de elevi, 18 fac mate și 16 fac română. 7 le fac pe amândouă. În cel puțin un cerc: 18 + 16 − 7 = 27. În niciun cerc: 32 − 27 = 5. Doar mate: 18 − 7 = 11. Doar română: 16 − 7 = 9.',
    practice: '1. 10 copii au câine, 8 au pisică, 3 au amândouă. Câți au cel puțin un animal dintre acestea? 2. Doar câine? 3. Dacă sunt 20 de copii în total, câți nu au nici câine, nici pisică?\n\nRăspunsuri: 15. 7. 5.',
    mistakes: 'Nu aduna 18 + 16 fără să scoți pe cei 7. Nu pune intersecția și în „doar A”, și în „doar B”. Nu uita zona din afara cercurilor când ți se cere „câți nu”.',
    tryThis: 'Întreabă opt colegi dacă le place fotbalul, desenul sau amândouă. Fă diagrama și scrie cardinalul reuniunii cu formula.',
    recap: 'Întâi partea comună, apoi restul. La „cel puțin una” scazi intersecția din sumă o singură dată. La „niciuna” scazi reuniunea din total.'
  }),

  lesson('divizibilitate', 'Divizibilitate în ℕ', {
    formulas: ['a | b înseamnă că a îl împarte pe b', 'b ⋮ a înseamnă același lucru', 'D_n = divizorii lui n', 'M_n = multiplii lui n'],
    theory: 'a este divizor al lui b dacă împărțirea lui b la a este exactă. Scrii a | b sau b ⋮ a. Atunci b este multiplu al lui a.\n\nD_n este mulțimea divizorilor naturali ai lui n. M_n este mulțimea multiplilor naturali ai lui n. M_n este infinită. D_n este finită.\n\nUn număr este par dacă se divide la 2: ultima cifră este 0, 2, 4, 6 sau 8. Se divide la 5 dacă ultima cifră este 0 sau 5. Se divide la 10^n dacă ultimele n cifre sunt 0. Se divide la 3 dacă suma cifrelor se divide la 3. Se divide la 9 dacă suma cifrelor se divide la 9.\n\nNumărul prim are exact doi divizori naturali: 1 și el însuși. Numărul compus are mai mulți. 1 nu este prim și nu este compus. 0 nu este prim.',
    example: '24 ⋮ 6, deci 6 | 24. D_6 = {1, 2, 3, 6}. 10^2 = 100, iar 1400 se divide la 100 pentru că se termină în doi de 0. 27 se divide la 9, fiindcă 2 + 7 = 9. 7 este prim. 9 este compus.',
    practice: '1. 15 se divide la 3? 2. 230 se divide la 10? 3. 1 este prim?\n\nRăspunsuri: da, 1 + 5 = 6. Nu, nu se termină în 0. Nu.',
    mistakes: 'Nu spune că 1 este prim. Nu confunda a | b cu b | a. Nu uita că 2 este singurul prim par.',
    tryThis: 'Alege un număr de trei cifre. Verifică pe rând divizibilitatea cu 2, cu 3, cu 5 și cu 9. Scrie ce criteriu ai folosit la fiecare.',
    recap: 'Divizorul împarte exact. Multiplul se împarte exact. Criteriile cu 2, 5, 10^n, 3 și 9 te scutesc de împărțirea lungă. Primul are exact doi divizori.'
  }),

  lesson('descompunere', 'Descompunerea în factori primi', {
    formulas: ['Scrierea canonică: produs de puteri de prime', 'Dacă n = p^a · q^b, numărul divizorilor este (a + 1)(b + 1)'],
    theory: 'Descompui un număr natural mai mare decât 1 împărțindu-l la numere prime, în ordine: la 2 cât poți, apoi la 3, la 5 și tot așa. Te oprești când câtul este 1.\n\nScrierea canonică pune factorii primi o dată, cu exponent: 12 = 2^2 · 3. 1 nu intră în produs.\n\nDin scrierea canonică numeri divizorii fără să-i listezi pe toți. La fiecare prim, exponentul din divizor poate fi de la 0 până la exponentul din număr. Dacă n = p^a · q^b, numărul divizorilor este (a + 1)(b + 1).',
    example: '36 : 2 = 18, 18 : 2 = 9, 9 : 3 = 3, 3 : 3 = 1. Deci 36 = 2^2 · 3^2. Numărul divizorilor este (2 + 1)(2 + 1) = 9. Ei sunt 1, 2, 3, 4, 6, 9, 12, 18, 36.',
    practice: '1. Scrie 18 ca produs de puteri de prime. 2. Câți divizori are 18? 3. 1 apare în descompunere?\n\nRăspunsuri: 2 · 3^2. (1 + 1)(2 + 1) = 6. Nu.',
    mistakes: 'Nu te opri la un factor compus, cum ar fi 4 sau 6, și să-l lași în produsul „prim”. Nu uita exponentul 0 când numeri divizorii: el dă factorul 1. Nu pune 1 ca factor prim.',
    tryThis: 'Descompune 60. Scrie forma canonică și listează toți divizorii. Verifică numărul lor cu produsul de (exponent + 1).',
    recap: 'Împarți mereu la prime. Scrierea canonică ține fiecare prim o dată, la puterea lui. Numărul divizorilor se citește din exponenți: aduni 1 la fiecare și înmulțești.'
  }),

  lesson('cmmdc', 'Cel mai mare divizor comun', {
    formulas: ['(a, b) = c.m.m.d.c.', 'Factori comuni, la puterea cea mai mică', 'Prime între ele: (a, b) = 1'],
    theory: 'Cel mai mare divizor comun al lui a și b este cel mai mare număr natural care îl împarte și pe a, și pe b. Îl notezi (a, b) sau c.m.m.d.c.(a, b).\n\nÎl poți găsi ca cel mai mare element din D_a ∩ D_b. Cu descompunerea este mai scurt: iei doar primele comune, fiecare la exponentul cel mai mic.\n\nDacă (a, b) = 1, numerele sunt prime între ele. Nu trebuie ca fiecare să fie prim. 8 și 9 sunt prime între ele, deși niciunul nu este prim.\n\nLa fracții, împarți numărătorul și numitorul la c.m.m.d.c. și ajungi la fracția ireductibilă.',
    example: '48 = 2^4 · 3 și 18 = 2 · 3^2. Comun este 2^1 · 3^1, deci (48, 18) = 6. 8 = 2^3 și 9 = 3^2 nu au prim comun, deci (8, 9) = 1. Fracția 18/48 se simplifică prin 6 și devine 3/8.',
    practice: '1. (12, 18). 2. 14 și 15 sunt prime între ele? 3. Simplifică 12/18.\n\nRăspunsuri: 6. Da, (14, 15) = 1. 2/3.',
    mistakes: 'Nu lua exponentul cel mai mare: acela este pentru c.m.m.m.c. Nu spune că două numere pare sunt prime între ele. Nu simplifica printr-un divizor care nu este comun.',
    tryThis: 'Alege două numere de pe caiet, descompune-le și scrie (a, b). Apoi fă fracția lor și simplific-o prin acel număr.',
    recap: 'c.m.m.d.c. este cel mai mare divizor comun. Din descompunere iei primele comune la puterea mică. Dacă iese 1, numerele sunt prime între ele. Cu el simplifici fracția.'
  }),

  lesson('cmmmc', 'Cel mai mic multiplu comun', {
    formulas: ['[a, b] = c.m.m.m.c.', 'Toți factorii, la puterea cea mai mare', '(a, b) · [a, b] = a · b'],
    theory: 'Cel mai mic multiplu comun al lui a și b este cel mai mic număr natural nenul care se împarte și la a, și la b. Îl notezi [a, b] sau c.m.m.m.c.(a, b).\n\nDin descompunere iei toți factorii primi, comuni și necomuni, fiecare la exponentul cel mai mare.\n\nPentru două numere nenule ai relația (a, b) · [a, b] = a · b. Dacă știi produsul și c.m.m.d.c., îl afli pe c.m.m.m.c. prin împărțire.\n\nÎl folosești când două evenimente se repetă și vrei prima dată când coincid, sau când aduci fracții la același numitor.',
    example: '8 = 2^3 și 12 = 2^2 · 3. [8, 12] = 2^3 · 3 = 24. (8, 12) = 4, iar 4 · 24 = 96 = 8 · 12. Două semnale, la 8 secunde și la 12 secunde, coincid din nou după 24 de secunde. Numitorul comun al fracțiilor 1/8 și 1/12 poate fi 24.',
    practice: '1. [6, 8]. 2. Dacă (10, 15) = 5, cât este [10, 15]? 3. [4, 6] este 12, iar 4 · 6 = 24. Cât este (4, 6)?\n\nRăspunsuri: 24. 30, pentru că 10 · 15 : 5 = 30. 2.',
    mistakes: 'Nu înmulți numerele și să te oprești acolo, dacă au divizori comuni: produsul este un multiplu comun, dar nu mereu cel mai mic. Nu confunda parantezele rotunde, pentru c.m.m.d.c., cu cele drepte, pentru c.m.m.m.c.',
    tryThis: 'Două becuri clipesc, unul la 6 secunde și unul la 9. Calculează după câte secunde clipesc împreună. Verifică și cu relația dintre c.m.m.d.c. și c.m.m.m.c.',
    recap: 'c.m.m.m.c. este cel mai mic multiplu comun nenul. Iei puterile cele mai mari. Produsul dintre c.m.m.d.c. și c.m.m.m.c. este produsul numerelor. Îl folosești la coincidențe și la numitor comun.'
  }),

  lesson('proprietati-div', 'Proprietăți ale divizibilității', {
    formulas: ['a | a', 'a | b și b | c implică a | c', 'a | b și a | c implică a | (b + c) și a | (b − c)', 'a | b implică a | (b · c)', 'a | c, b | c și (a, b) = 1 implică a · b | c'],
    theory: 'Orice număr natural nenul se divide la el însuși: a | a. Dacă a îl împarte pe b și b îl împarte pe c, atunci a îl împarte pe c.\n\nDacă a îl împarte și pe b, și pe c, atunci a împarte suma și diferența lor, când diferența este naturală. Dacă a îl împarte pe b, atunci a îl împarte și pe b · c, pentru orice natural c.\n\nDacă a și b sunt prime între ele și fiecare îl împarte pe c, atunci și produsul a · b îl împarte pe c. Fără condiția (a, b) = 1, produsul poate să nu-l împartă.\n\nCa să arăți o divizibilitate, scrii ce știi, spui regula folosită și tragi concluzia. Nu sări de la date la rezultat fără regula din mijloc.',
    example: '3 | 12 și 4 | 12. (3, 4) = 1, deci 12 | 12. În schimb 4 | 12 și 6 | 12, dar (4, 6) = 2, nu 1. Produsul 24 nu îl împarte pe 12. Asta arată de ce ai nevoie de numere prime între ele.',
    practice: '1. Dacă 5 | 20 și 5 | 15, 5 împarte suma? 2. Dacă 2 | 6, 2 împarte 6 · 7? 3. 6 | 6?\n\nRăspunsuri: da, suma este 35. Da, 42 este par. Da.',
    mistakes: 'Nu înmulți doi divizori care nu sunt primi între ei și să spui că produsul divide. Nu uita că diferența trebuie să rămână un număr natural în lecția asta. Nu sări regula când explici.',
    tryThis: 'Alege a = 4 și b = 9. Găsește un c pe care îl împart amândoi. Verifică că 36 îl împarte pe c. Spune de ce a mers: (4, 9) = 1.',
    recap: 'Divizibilitatea trece mai departe printr-un lanț, prin sumă, prin diferență și printr-un factor în plus. Produsul a doi divizori îl împarte pe c doar dacă acei divizori sunt primi între ei.'
  }),

  lesson('recap-multimi', 'Recapitulare: mulțimi și divizibilitate', {
    figure: 'venn',
    formulas: ['∈, ⊂, ∪, ∩, \\', '(a, b) și [a, b]'],
    theory: 'O mulțime se dă prin enumerare, prin proprietate sau prin diagramă. Elementele sunt distincte. ∅ nu are elemente. ℕ conține pe 0, ℕ* nu.\n\n⊂ spune că o mulțime stă în alta. Egalitatea cere aceleași elemente. Submulțimile se listează, iar la n elemente sunt 2^n.\n\nReuniunea adună fără dubluri. Intersecția ține partea comună. Diferența scoate ce este și în a doua mulțime. La cardinalul reuniunii scazi intersecția o dată.\n\nÎn ℕ, divizorul împarte exact. Criteriile cu 2, 5, 10^n, 3 și 9 rămân. Descompunerea în prime dă c.m.m.d.c., c.m.m.m.c. și numărul divizorilor. Proprietățile te ajută să justifici, nu doar să calculezi.',
    example: 'A = {1, 2, 4} și B = {2, 4, 6}. A ∩ B = {2, 4}, A ∪ B = {1, 2, 4, 6}, deci |A ∪ B| = 4. (12, 18) = 6 și [12, 18] = 36. 6 · 36 = 216 = 12 · 18.',
    practice: '1. Câte submulțimi are o mulțime cu 1 element? 2. (9, 28). 3. [4, 6].\n\nRăspunsuri: 2, adică ∅ și mulțimea însăși. 1. 12.',
    mistakes: 'Nu amesteca ∈ cu ⊂. Nu lua puterea mare la c.m.m.d.c. Nu număra de două ori intersecția.',
    tryThis: 'Fă o fișă cu trei rânduri: o diagramă cu două mulțimi, o descompunere și o proprietate de divizibilitate folosită într-o propoziție a ta.',
    recap: 'Mulțimile spun cine este înăuntru și cine este în comun. Divizibilitatea spune cine împarte exact. Descompunerea leagă cele două: divizorii comuni și multiplii comuni se citesc din prime.'
  })
];

module.exports = { MULTIMI_LESSONS };
