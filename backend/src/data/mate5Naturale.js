// Capitolul I din Matematică, clasa a V-a, Litera, cod A1259 (2022):
// numere naturale, operații, puteri, metode aritmetice, divizibilitate.
// Lecțiile vecine rămân separate, ca în cuprins. Textul e al nostru:
// nu copiem enunțurile, tabelele și testele din manual.

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
    id,
    title,
    platter,
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

const NATURALE_LESSONS = [
  lesson('curiozitati', 'Curiozități din lumea numerelor naturale', {
    figure: 'dot-numbers',
    formulas: ['Triunghiular: 1 + 2 + … + n', 'Pătrat perfect: n × n'],
    theory: 'Unele numere se pot desena. Un număr triunghiular se așază în puncte, ca un triunghi: 1, apoi 1+2, apoi 1+2+3. El este suma primelor numere de la 1 până la n.\n\nUn număr pătratic, sau pătrat perfect, se așază într-un pătrat de puncte. Latura are n puncte, iar totalul este n înmulțit cu n.\n\nMai târziu vei învăța ce este un număr prim. De acolo pleacă alte familii. Două numere prime gemene sunt prime și au diferența 2, ca 3 și 5. Două numere prietene se țin una de alta: fiecare este suma divizorilor celuilalt, fără numărul însuși. Prima pereche cunoscută este 220 și 284.\n\nDacă S este suma divizorilor lui n, fără n, atunci n este perfect când n = S, ca 6 = 1+2+3. Este deficient când S este mai mic decât n, ca la 8, unde 1+2+4 = 7. Este abundent când S este mai mare decât n, ca la 12, unde 1+2+3+4+6 = 16.\n\nUn număr puternic are o regulă în plus: dacă un număr prim îl împarte, atunci și pătratul acelui prim îl împarte. La 72, primii sunt 2 și 3, iar 4 și 9 tot îl împart pe 72.',
    example: '1+2+3+4 = 10, deci 10 este triunghiular. 4×4 = 16, deci 16 este pătrat perfect. 5 și 7 sunt prime gemene, pentru că 7−5 = 2. 6 este perfect. 8 este deficient. 12 este abundent.',
    practice: '1. Calculează 1+2+3+4+5 și spune dacă rezultatul este triunghiular. 2. Desenează 3×3 puncte și scrie pătratul perfect. 3. Alege un exemplu pentru număr perfect, unul pentru deficient și unul pentru abundent.\n\nRăspunsuri: 15, triunghiular. 9. De pildă 6, 8 și 12.',
    mistakes: 'Nu orice număr impar este prim. 9 este impar, dar 9 = 3×3. Nu confunda pătratul perfect cu un număr care doar se termină în cifră pară. 16 este pătrat. 14 nu este.',
    tryThis: 'Fă un portofoliu de o pagină. Pune câte un exemplu, cu o propoziție, pentru: triunghiular, pătrat perfect, prime gemene, prietene, perfect, deficient, abundent, puternic. La final adaugă o curiozitate nouă pe care ai căutat-o tu.',
    recap: 'Numărul triunghiular este o sumă 1+2+…+n. Pătratul perfect este n×n. Primele gemene diferă prin 2. La numerele prietene, fiecare este suma divizorilor celuilalt. La numărul perfect, numărul este egal cu suma divizorilor, fără el însuși. La cel deficient, numărul este mai mare decât suma. La cel abundent, numărul este mai mic decât suma. La un număr puternic, pătratul fiecărui prim divizor tot îl divide.'
  }),

  lesson('scriere', 'Scrierea și citirea numerelor naturale', {
    figure: 'place-value',
    formulas: ['10 unități = 1 zece', '10 zeci = 1 sută', '10 sute = 1 mie'],
    theory: 'Numerele naturale sunt 0, 1, 2, 3 și tot ce numeri mai departe. Le scriem cu cifrele 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Cifrele se pot repeta. La un număr cu măcar două cifre, prima cifră nu poate fi 0.\n\nLocul cifrei se numește ordin. Ultima cifră este ordinul unităților. Spre stânga urmează zecile, sutele, miile și tot așa. Zece unități de un ordin fac o unitate de ordinul următor: 10 unități fac o zece, 10 zeci fac o sută, 10 sute fac o mie.\n\nCifrele se grupează în clase de câte trei, de la dreapta la stânga: clasa unităților, clasa miilor, clasa milioanelor, clasa miliardelor. Citești de la stânga la dreapta. Cifra 0 nu se citește la ordinul ei.\n\nScrierea asta, cu zece cifre, se numește scriere în baza 10. Orice număr natural se desface într-un singur fel în unități, zeci, sute și așa mai departe. Asta este descompunerea zecimală.\n\nCând nu știm cifrele, le notăm cu litere: ab are două cifre, abc are trei, abcd are patru. Prima literă nu este 0.',
    example: '530 957 se citește cinci sute treizeci de mii nouă sute cincizeci și șapte. Descompunerea: 5×100000 + 3×10000 + 0×1000 + 9×100 + 5×10 + 7. Zero de la mii nu se citește. Numărul ab = 10×a + b. Dacă ab = 79, atunci a = 7 și b = 9.',
    practice: '1. Scrie cu cifre: douăzeci și patru de mii șaizeci. 2. Citește 40 805. 3. La numărul 6 084, ce ordin are cifra 6?\n\nRăspunsuri: 24 060. Patruzeci de mii opt sute cinci. Cifra 6 este cifra miilor.',
    mistakes: 'Nu pui 0 în față ca să „arate” mai lung: 081 nu este un număr de trei cifre, este 81. Nu citi zeroul din mijloc ca pe o cifră de ordin. La 40 805 nu spui „zero mii”.',
    tryThis: 'Alege un număr de șase cifre care are un 0. Scrie-l cu o pauză la clase, citește-l și descompune-l ca sumă de zeci, sute și mii.',
    recap: 'Scriem cu zece cifre, în baza 10. Prima cifră nu este 0. Fiecare loc este un ordin, iar ordinele se strâng în clase de câte trei. Citim de la stânga, fără zerourile de ordin. Descompunerea zecimală arată numărul ca sumă, o singură dată.'
  }),

  lesson('axa', 'Numerele naturale pe axă', {
    figure: 'number-line',
    formulas: ['Origine O', 'Sens pozitiv', 'Unitate de măsură u', 'P(n)'],
    theory: 'Șirul numerelor naturale 0, 1, 2, 3, … nu se termină. Nu există un cel mai mare număr natural. Două numere vecine, n și n+1, se numesc consecutive. n este predecesorul lui n+1. n+1 este succesorul lui n. La 0 nu există predecesor natural.\n\nAxa numerelor este o dreaptă cu trei lucruri alese de tine: un punct O, numit origine, un sens pozitiv și un segment u, numit unitate de măsură.\n\nNumărul n stă în punctul la care ajungi dacă numeri n unități din O, în sensul pozitiv. Punctul se scrie P(n). Spui „P de coordonată n”. Distanța de la O la P este n unități.\n\nAcelași desen își schimbă numerele dacă schimbi unitatea. Dacă unitatea se dublează, coordonatele se înjumătățesc. Originea, sensul și unitatea fac împreună reperul.',
    example: 'Pe o axă, A este la 1 unitate, B la 3, C la 4 și D la 7. Scriem A(1), B(3), C(4), D(7). Dacă unitatea devine segmentul de la O până la B, atunci B are coordonata 1, iar un punct care era la 6 unități vechi are coordonata 2.',
    practice: '1. Scrie succesorul lui 49 și predecesorul lui 50. 2. Pe axă, M este la 4 unități de O. Scrie notația. 3. Dacă unitatea se face de două ori mai lungă, ce coordonată are vechiul punct de la 8?\n\nRăspunsuri: 50 și 49. M(4). Coordonata 4.',
    mistakes: 'Nu măsori „din ochi” fără să spui unitatea. Același punct poate avea altă coordonată pe altă unitate. Nu porni numărătoarea de la 1 când originea este 0.',
    tryThis: 'Desenează o axă. Marchează O, sensul și unitatea. Pune punctele A(2), B(5) și C(6). Scrie care sunt consecutive.',
    recap: 'Șirul natural este infinit. Vecinii n și n+1 sunt consecutivi. Axa are origine, sens pozitiv și unitate. P(n) este punctul numărului n. Schimbi unitatea, se schimbă coordonatele.'
  }),

  lesson('comparare', 'Compararea și ordonarea', {
    figure: 'compare-line',
    formulas: ['Mai multe cifre → număr mai mare', 'La egal de cifre, compari de la stânga'],
    theory: 'A compara două numere naturale înseamnă să spui care relație este adevărată: mai mic, egal sau mai mare. Scrii <, = sau >.\n\nDacă numerele nu au același număr de cifre, este mai mare cel cu mai multe cifre. 999 are trei cifre, 1000 are patru, deci 999 < 1000.\n\nDacă au la fel de multe cifre, compari de la stânga, ordin cu ordin. Prima cifră care diferă decide. Cifra mai mare face numărul mai mare.\n\nOrdonarea înseamnă să le așezi crescător, de la mic la mare, sau descrescător, de la mare la mic. Pe axă, numărul mai mare stă mai la dreapta, în sensul pozitiv.',
    example: 'Comparăm 2 817 și 2 871. Ambele au patru cifre. Miile sunt 2 și 2. Sutele sunt 8 și 8. Zecile sunt 1 și 7. 1 < 7, deci 2 817 < 2 871. Ordinea crescătoare a numerelor 84, 408 și 480 este 84, 408, 480.',
    practice: '1. Pune crescător: 3 090, 390, 3 009. 2. Completează cu <, = sau >: 7 065 … 7 650. 3. Care este cel mai mare număr de forma 3a5, cu a cifră?\n\nRăspunsuri: 390, 3 009, 3 090. 7 065 < 7 650. 395.',
    mistakes: 'Nu te uita întâi la ultima cifră. 2 901 nu este mai mare decât 3 100 doar pentru că se termină cu 1. Nu spune că un număr este mai mare doar pentru că cifra lui de la sute este mare, dacă are mai puține cifre.',
    tryThis: 'Scrie trei numere de patru cifre care încep la fel. Ordonează-le crescător și încercuiește prima cifră care a decis ordinea.',
    recap: 'Compari ca să afli mai mic, egal sau mai mare. Mai multe cifre înseamnă număr mai mare. La același număr de cifre, decizia vine de la stânga. Pe axă, mai mare înseamnă mai la dreapta.'
  }),

  lesson('aproximari', 'Aproximări și estimări', {
    theory: 'A rotunji un număr la un ordin înseamnă să-l apropii de un număr „rotund” de acel ordin. Te uiți la cifra din dreapta ordinului ales. Dacă ea este mai mică decât 5, lași cifra ordinului neschimbată: aproximezi prin lipsă. Dacă este 5 sau mai mare, crești cifra ordinului cu 1: aproximezi prin adaos. Cifrele din dreapta devin 0.\n\nAproximarea prin lipsă la zeci, sute sau mii este cel mai mare număr de acel fel care nu trece peste numărul dat. Aproximarea prin adaos este cel mai mic număr de acel fel care nu este mai mic decât numărul dat. Numărul este între ele: cel puțin aproximarea prin lipsă și cel mult aproximarea prin adaos.\n\nDacă numărul este la fel de departe de cele două aproximări, rotunjești prin adaos. Dacă nu, alegi apropierea mai mică.\n\nEstimarea este o apreciere când nu ai toate datele exacte, sau când calculezi cu numere deja rotunjite. Eroarea unei aproximări la zeci este mai mică decât 10, la sute mai mică decât 100. La o estimare nu știi dinainte cât de aproape ești. De multe ori rotunjirea dă o estimare mai apropiată decât dacă aproximezi toți termenii doar prin lipsă sau doar prin adaos.',
    example: 'La 279 345, cifra unităților este 5, deci la zeci rotunjești prin adaos: 279 350. Cifra zecilor este 4, deci la sute rămâne 279 300. La 185, lipsă la zeci este 180, adaos este 190, distanțele sunt egale, deci rotunjirea este 190. Două penare de 34 lei și patru cutii de 17 lei costă exact 136 lei. Prin adaos la zeci estimezi 160. Prin lipsă estimezi 100. Prin rotunjire estimezi 140.',
    practice: '1. Aproximează 4 638 prin lipsă la zeci și prin adaos la sute. 2. Rotunjește 2 650 la sute. 3. Estimează 18×49 rotunjind fiecare factor la zeci.\n\nRăspunsuri: 4 630 și 4 700. 2 700, pentru că este la mijloc și alegi adaosul. 20×50 = 1 000.',
    mistakes: 'Nu rotunjești uitându-te la ultima cifră când ți se cere rotunjire la sute. La sute te uiți la cifra zecilor. Nu spune că aproximarea prin adaos poate fi mai mică decât numărul. Ea este egală sau mai mare.',
    tryThis: 'Ia prețurile a trei lucruri din cameră, rotunjește-le la zeci și estimează suma. Apoi calculează suma exactă și spune care estimare a fost mai aproape.',
    recap: 'Cifra din dreapta spune lipsa sau adaosul: sub 5 lipsește, de la 5 în sus se adaugă. Prin lipsă nu treci peste număr. Prin adaos nu cobori sub el. La distanță egală alegi adaosul. Estimarea folosește date necomplete sau numere deja apropiate.'
  }),

  lesson('recap-numere', 'Recapitulare: numere naturale', {
    figure: 'number-line',
    theory: 'În unitatea aceasta ai scris și ai citit numere, le-ai pus pe axă, le-ai comparat și le-ai aproximat. Ești gata dacă poți trece de la cuvinte la cifre și înapoi, dacă spui ordinul unei cifre, dacă marchezi P(n) cu unitatea spusă, dacă ordonezi și dacă deosebești lipsa, adaosul, rotunjirea și estimarea.\n\nLa o verificare, un răspuns bun arată regula, nu doar numărul. La forma abc spui că a nu este 0. La axă spui originea, sensul și unitatea. La rotunjire spui cifra la care te-ai uitat.',
    example: 'Numărul 20 507 se citește douăzeci de mii cinci sute șapte. Cifra 2 este cifra zecilor de mii. Aproximarea prin lipsă la sute este 20 500. Succesorul lui 20 507 este 20 508. Pe axă, punctul lui stă la dreapta lui 20 500.',
    practice: '1. Scrie cel mai mic număr de patru cifre cu cifre distincte. 2. Ordonează descrescător 8 040, 8 400 și 840. 3. Rotunjește 3 465 la zeci.\n\nRăspunsuri: 1 023. 8 400, 8 040, 840. 3 470.',
    mistakes: 'La recapitulare nu amesteca ordinul cu clasa. Cifra 5 din 20 507 este cifra sutelor, iar clasa ei este clasa miilor. Nu rotunji la zeci uitându-te la cifra sutelor.',
    tryThis: 'Fă o fișă de o jumătate de pagină cu patru rânduri: un număr citit, un punct pe axă, o comparație și o rotunjire. La fiecare rând scrie regula în cinci cuvinte.',
    recap: 'Recapitularea ține la un loc scrierea, citirea, axa, compararea și aproximarea. Citești fără zerourile de ordin, compari de la stânga, pui numărul pe axă numai după ce ai unitatea și rotunjești după cifra din dreapta ordinului ales.'
  }),

  lesson('adunare', 'Adunarea numerelor naturale', {
    figure: 'bar-sum',
    formulas: ['(a + b) + c = a + (b + c)', 'a + b = b + a', 'a + 0 = a'],
    theory: 'Adunarea îi dă fiecărei perechi de numere naturale a și b un singur număr, a + b, numit sumă. a și b sunt termenii.\n\nAdunarea este asociativă: poți grupa termenii cum vrei, (a + b) + c = a + (b + c). Este comutativă: a + b = b + a. Zero este element neutru: a + 0 = 0 + a = a. Nu schimbă suma.\n\nDacă două numere sunt egale și aduni același lucru la amândouă, rămân egale. Dacă unul era mai mic, rămâne mai mic după ce aduni același număr. Poți muta un termen dintr-o parte în alta a unei egalități numai dacă păstrezi valoarea de adevăr, de pildă dacă aduni sau scazi același număr în ambele părți.',
    example: '12 + 29 + 30. Întâi 12 + 29 = 41, apoi 41 + 30 = 71. Dacă grupezi 29 + 30 = 59 și aduni 12, tot 71. 12 + 29 = 29 + 12. 12 + 0 = 12. Dacă n + 5 = 8, atunci n + 6 = 9, pentru că ai adunat 1 în ambele părți.',
    practice: '1. Calculează 40 + 17 + 60 grupând zecile. 2. Dacă x + 9 = 15, cât este x + 10? 3. Completează: 0 + 26 = …\n\nRăspunsuri: 117. 16. 26.',
    mistakes: 'Nu schimba rezultatul când muți paranteza la adunare. (8 + 2) + 5 și 8 + (2 + 5) sunt ambele 15. Nu crede că zero mărește numărul. 30 + 0 rămâne 30.',
    tryThis: 'Scrie trei termeni și calculează suma în două grupări. Arată că ai obținut același număr.',
    recap: 'Suma a + b este unică. Poți schimba locul termenilor și gruparea. Zero nu schimbă suma. Aceeași adunare în ambele părți păstrează egalitatea și sensul unei inegalități.'
  }),

  lesson('scadere', 'Scăderea numerelor naturale', {
    formulas: ['a − b = c înseamnă a = b + c', 'a − 0 = a', 'a − a = 0'],
    theory: 'Scăderea îl caută pe numărul care, adunat cu scăzătorul, dă descăzutul. Dacă a − b = c, atunci a = b + c. Poți scădea b din a numai când a este mai mare sau egal cu b. Rezultatul se numește diferență.\n\nScăderea nu este comutativă: 9 − 4 nu este 4 − 9 în numerele naturale. Nu este nici asociativă: (10 − 6) − 1 nu este același lucru cu 10 − (6 − 1) dacă nu ești atent la ce scazi. a − 0 = a și a − a = 0.\n\nProba scăderii este o adunare: diferența plus scăzătorul dau descăzutul. Dacă aduni același număr la descăzut și la scăzător, diferența rămâne. Dacă îi scazi pe amândoi cu același număr, și diferența rămâne, cât timp scăderea are sens.',
    example: 'Dintr-o clasă de 28 de copii pleacă 9. Diferența este 19, pentru că 19 + 9 = 28. 15 − 0 = 15. 15 − 15 = 0. (20 − 5) − 3 = 12, iar 20 − (5 − 3) = 18. Nu sunt egale.',
    practice: '1. Calculează 70 − 28 și fă proba. 2. Află x dacă x + 16 = 40. 3. Este 4 − 9 un număr natural? Scrie da sau nu.\n\nRăspunsuri: 42, proba 42 + 28 = 70. x = 24. Nu.',
    mistakes: 'Nu scădea „pe din două” numărul mai mare din cel mai mic și să pui rezultatul ca număr natural. Nu schimba locul la scădere cum faci la adunare. Nu uita proba.',
    tryThis: 'Alege un descăzut și un scăzător mai mic. Calculează diferența, apoi adun-o cu scăzătorul. Scrie propoziția probei.',
    recap: 'Scazi numai când descăzutul este destul de mare. Diferența plus scăzătorul fac descăzutul. Scăderea nu se schimbă la loc și nu se grupează oricum. Zero scăzut lasă numărul pe loc.'
  }),

  lesson('inmultire', 'Înmulțirea numerelor naturale', {
    formulas: ['m × n = n + n + … + n', 'a × (b + c) = a×b + a×c', 'a × 0 = 0', 'a × 1 = a'],
    theory: 'Înmulțirea este o adunare repetată. m × n înseamnă n scris de m ori și adunat, sau m scris de n ori. Rezultatul se numește produs. m și n sunt factori.\n\nÎnmulțirea este asociativă și comutativă. 1 este element neutru: a × 1 = a. 0 „înghite” produsul: a × 0 = 0.\n\nÎnmulțirea se împarte peste o sumă și peste o diferență. Asta se numește distributivitate: a × (b + c) = a×b + a×c și, dacă b este cel puțin c, a × (b − c) = a×b − a×c. Citită de-a-ndoarselea, aceeași regulă scoate factorul comun: a×b + a×c = a × (b + c).\n\nDacă două numere sunt egale, le poți înmulți cu același număr și rămân egale. Dacă unul este mai mic sau egal, produsul cu același factor rămâne mai mic sau egal.',
    example: '4 × 6 = 6+6+6+6 = 24. 5 × (10 + 3) = 5×10 + 5×3 = 50 + 15 = 65. Factor comun: 12×7 + 12×3 = 12 × (7 + 3) = 12×10 = 120. 9 × 0 = 0 și 9 × 1 = 9.',
    practice: '1. Calculează 8 × 25 folosind 8 × (20 + 5). 2. Scoate factorul comun din 6×9 + 6×1. 3. Cât este 0 × 47?\n\nRăspunsuri: 200. 6×10 = 60. 0.',
    mistakes: 'Nu aduna factorii: 4 × 6 nu este 10. Nu uita un termen când desfac paranteza. La a × (b − c) ai voie numai dacă b nu este mai mic decât c.',
    tryThis: 'Scrie 7 × 14 ca 7 × (10 + 4), calculează și verifică prin adunare repetată de două ori, nu de paisprezece ori: 14 + 14, de șapte ori, este lung. Verifică măcar 7×10 + 7×4.',
    recap: 'Produsul este o adunare repetată. Poți schimba locul și gruparea factorilor. 1 lasă numărul, 0 face produsul 0. Înmulțirea se distribuie la sumă și la diferență, iar factorul comun se scoate din toți termenii.'
  }),

  lesson('impartire-exacta', 'Împărțirea cu rest zero', {
    formulas: ['a : b = c înseamnă a = b × c', 'b nu este 0'],
    theory: 'Împărțirea exactă desface un număr în grupe egale, fără să rămână nimic. a : b = c înseamnă a = b × c. a este deîmpărțitul, b este împărțitorul, c este câtul. Împărțitorul nu poate fi 0. Împărțirea la 0 nu are sens.\n\nPoți gândi împărțirea și ca scăderi repetate: de câte ori poți scădea b din a până ajungi la 0. Numărul scăderilor este câtul, dacă restul este 0.\n\nÎmpărțirea exactă nu este comutativă: 12 : 3 nu este 3 : 12 în numere naturale. a : 1 = a. Dacă a nu este 0, a : a = 1. 0 : a = 0, când a nu este 0.\n\nAlgoritmul este același și când împărțitorul are multe cifre. La fiecare pas estimezi cifra câtului, înmulțești, scazi și cobori cifra următoare. Proba este înmulțirea: câtul înmulțit cu împărțitorul dă deîmpărțitul.',
    example: '24 : 4 = 6, pentru că 4 × 6 = 24. Poți scădea 4 din 24 de șase ori și ajungi la 0. 36 : 1 = 36. 36 : 36 = 1. 0 : 9 = 0. 15 : 0 nu se calculează.',
    practice: '1. Calculează 84 : 4 și fă proba. 2. Câte grupe de 6 sunt în 54, fără rest? 3. Completează: 0 : 7 = …\n\nRăspunsuri: 21, proba 21×4 = 84. 9 grupe. 0.',
    mistakes: 'Nu împărți la 0. Nu inversa deîmpărțitul cu împărțitorul. Nu spune că 12 : 3 = 3 : 12. La proba împărțirii exacte restul trebuie să fie 0.',
    tryThis: 'Alege un cât și un împărțitor. Înmulțește-le ca să afli deîmpărțitul, apoi împarte înapoi și arată că revii la cât.',
    recap: 'Împărțirea exactă are rest 0 și se verifică prin înmulțire. Împărțitorul este nenul. 1 nu schimbă numărul, numărul împărțit la el însuși dă 1, iar 0 împărțit la un număr nenul dă 0.'
  }),

  lesson('impartire-rest', 'Împărțirea cu rest', {
    figure: 'remainder',
    formulas: ['a = b × q + r', '0 ≤ r < b', 'b nu este 0'],
    theory: 'Când grupele egale nu ies exact, rămâne un rest. Teorema împărțirii cu rest spune așa: pentru orice număr natural a și orice împărțitor b nenul, există un singur cât q și un singur rest r astfel încât a = b × q + r și restul este mai mic decât b. Restul poate fi 0, 1, 2, …, până la b − 1.\n\nProba se scrie la fel: deîmpărțitul este împărțitorul înmulțit cu câtul, plus restul. Dacă restul este 0, ai împărțire exactă.\n\nUn număr este par când restul la 2 este 0. Este impar când restul la 2 este 1.',
    example: '17 : 5. 5 × 3 = 15 și mai rămân 2. Deci 17 = 5 × 3 + 2, iar 2 < 5. Câtul este 3, restul este 2. 17 este impar, pentru că 17 = 2 × 8 + 1.',
    practice: '1. Împarte 46 la 7. Scrie câtul și restul. 2. Verifică 100 = 9 × 11 + 1. Este restul corect? 3. Spune dacă 2 048 este par.\n\nRăspunsuri: cât 6, rest 4, pentru că 46 = 7×6 + 4. Da, 1 < 9. Par, se termină cu 8, restul la 2 este 0.',
    mistakes: 'Restul nu are voie să fie cât împărțitorul sau mai mare. Dacă ai rest 7 la împărțirea cu 7, mai încape o grupă în cât. Nu uita restul în probă.',
    tryThis: 'Împarte 25 la 4. Desenează grupele și restul, apoi scrie egalitatea a = b×q + r.',
    recap: 'Orice împărțire cu împărțitor nenul are un singur cât și un singur rest, iar restul este mai mic decât împărțitorul. Proba este b×q + r. Par înseamnă rest 0 la 2. Impar înseamnă rest 1 la 2.'
  }),

  lesson('recap-operatii', 'Recapitulare: operații', {
    theory: 'Cele patru operații stau pe două idei. Adunarea strânge. Scăderea desface adunarea. Înmulțirea repetă adunarea. Împărțirea desface înmulțirea, exact sau cu rest.\n\nLa adunare și la înmulțire poți schimba locul și gruparea. Scăderea și împărțirea nu se schimbă la loc. Zero este neutru la adunare și face produsul zero. Unu este neutru la înmulțire. La împărțire, împărțitorul nu este zero, iar restul este mai mic decât el.\n\nÎntr-o problemă, întâi spui ce știi și ce cauți, apoi alegi operația. Proba te aduce înapoi la date.',
    example: 'O cutie are 3 rânduri a câte 8 creioane, deci 24. Dai 5 copii câte 4 creioane, deci 20. Rămân 4. Proba adunării: 20 + 4 = 24. Dacă împărți 24 la 5, scrii 24 = 5×4 + 4. Restul 4 este mai mic decât 5, deci câtul este 4 și restul este 4. Creioanele rămase după daruri sunt o scădere. Restul apare numai când împarți.',
    practice: '1. Calculează 6×7 − 10. 2. Împarte 50 la 8 și scrie proba. 3. Dacă a + 0 = 13, cât este a?\n\nRăspunsuri: 32. 50 = 8×6 + 2. a = 13.',
    mistakes: 'Nu face întâi adunarea într-un exercițiu în care înmulțirea stă lângă ea, dacă nu sunt paranteze. Lecția următoare, la puteri, vei vedea ordinea întreagă. Aici nu scădea dintr-un produs cifra, nu factorul.',
    tryThis: 'Inventeză o problemă cu o înmulțire și o scădere, cu bile. Rezolv-o și scrie proba adunării.',
    recap: 'Adunarea și înmulțirea au locul schimbabil și gruparea liberă. Scăderea și împărțirea se verifică prin operația pereche. Restul este mai mic decât împărțitorul. Zero și unu au roluri fixe, iar împărțirea la zero nu există.'
  }),

  lesson('putere', 'Puterea cu exponent natural', {
    figure: 'power-grid',
    formulas: ['aⁿ = a × a × … × a', 'a¹ = a', 'a⁰ = 1, dacă a nu este 0'],
    theory: 'O putere este o înmulțire în care același factor se repetă. aⁿ înseamnă a scris de n ori și înmulțit. a se numește bază. n se numește exponent. Exponentul spune de câte ori apare baza, nu cu cât o aduni.\n\na¹ = a. Dacă a nu este 0, a⁰ = 1. 0⁰ nu se folosește aici. Pătratul este puterea a doua: a² = a×a. Cubul este puterea a treia: a³ = a×a×a.\n\n10ⁿ este 1 urmat de n zerouri. De aceea descompunerea zecimală se poate scrie cu puteri ale lui 10.',
    example: '3⁴ = 3×3×3×3 = 81. Nu este 3×4 și nu este 34. 2³ = 8. 5² = 25. 10³ = 1 000. 7⁰ = 1. 4¹ = 4.',
    practice: '1. Calculează 6² și 2⁵. 2. Scrie 81 ca putere cu baza 3. 3. Cât este 9⁰?\n\nRăspunsuri: 36 și 32. 3⁴. 1.',
    mistakes: 'Exponentul nu este un factor de adunat și nu este o cifră lipită de bază. 2³ nu este 6 și nu este 23. Nu calcula 0⁰. La a⁰, baza trebuie să fie nenulă.',
    tryThis: 'Desenează un pătrat 4 pe 4 de puncte. Numără punctele și scrie egalitatea ca putere.',
    recap: 'Baza se înmulțește cu ea însăși de atâtea ori cât spune exponentul. Pătratul este exponentul 2, cubul este exponentul 3. a¹ = a și, dacă a nu este 0, a⁰ = 1.'
  }),

  lesson('reguli-puteri', 'Reguli de calcul cu puteri', {
    formulas: ['aᵐ × aⁿ = aᵐ⁺ⁿ', 'aᵐ : aⁿ = aᵐ⁻ⁿ', '(aᵐ)ⁿ = aᵐˣⁿ', '(a×b)ⁿ = aⁿ × bⁿ'],
    theory: 'Când bazele sunt la fel, înmulțești puterile adunând exponenții: aᵐ × aⁿ = aᵐ⁺ⁿ. Împarți puterile cu aceeași bază, dacă împărțirea este exactă, scăzând exponenții: aᵐ : aⁿ = aᵐ⁻ⁿ, cu m cel puțin n și a nenul.\n\nO putere de putere înmulțește exponenții: (aᵐ)ⁿ = aᵐˣⁿ. Un produs la aceeași putere se desface: (a×b)ⁿ = aⁿ × bⁿ. Un cât exact la aceeași putere se desface la fel: (a:b)ⁿ = aⁿ : bⁿ, când b nu este 0 și împărțirea are sens.\n\nÎnainte de reguli, scrii bazele la fel. 4 este 2², 8 este 2³, 9 este 3².',
    example: '2³ × 2⁴ = 2⁷ = 128. 3⁵ : 3² = 3³ = 27. (2³)² = 2⁶ = 64. (2×5)² = 2² × 5² = 4×25 = 100. 8 × 4 = 2³ × 2² = 2⁵ = 32.',
    practice: '1. Scrie 5² × 5³ ca o singură putere. 2. Calculează (3²)³. 3. Scrie 16 × 8 ca putere a lui 2.\n\nRăspunsuri: 5⁵. 3⁶ = 729. 2⁴ × 2³ = 2⁷ = 128.',
    mistakes: 'Nu înmulți bazele când aduni exponenții: 2³ × 2⁴ nu este 4⁷. Nu aduna exponenții la o putere de putere. (2³)² este 2⁶, nu 2⁵.',
    tryThis: 'Alege baza 2 și doi exponenți mici. Verifică regula produsului desfăcând puterile în înmulțiri.',
    recap: 'Aceeași bază: la produs aduni exponenții, la cât îi scazi. Puterea de putere înmulțește exponenții. Produsul și câtul urcă la putere factor cu factor. Mai întâi adu bazele la același număr.'
  }),

  lesson('comparare-puteri', 'Compararea puterilor', {
    theory: 'Două puteri cu aceeași bază și același exponent sunt egale. Ca să le compari pe celelalte, le aduci la o formă ușoară.\n\nDacă baza este aceeași și este cel puțin 2, puterea cu exponentul mai mare este mai mare. 2⁵ > 2³, pentru că 5 > 3.\n\nDacă exponentul este același și este cel puțin 1, puterea cu baza mai mare este mai mare. 5² > 4², pentru că 5 > 4.\n\nDacă nu poți face nici aceeași bază, nici același exponent, compari cu o putere pe care o știi, sau le calculezi când sunt mici.',
    example: 'Comparăm 3⁴ și 9². 9 = 3², deci 9² = (3²)² = 3⁴. Sunt egale. 2⁵ = 32 și 5² = 25, deci 2⁵ > 5². 7³ > 7², aceeași bază mai mare decât 1, exponent mai mare.',
    practice: '1. Pune semnul între 4³ și 8². 2. Ordonează crescător 2⁴, 3³ și 5². 3. Compară 10² și 2¹⁰. Poți folosi 10² = 100 și 2¹⁰ = 1 024.\n\nRăspunsuri: 4³ = 64 și 8² = 64, deci sunt egale. 2⁴ = 16, 5² = 25, 3³ = 27, deci ordinea este 2⁴, 5², 3³. 10² < 2¹⁰.',
    mistakes: 'Nu compara doar exponenții când bazele diferă. 2⁵ este mai mare decât 5², deși 2 este mai mic decât 5. Nu spune că baza 1 crește când crește exponentul: 1ⁿ rămâne 1.',
    tryThis: 'Alege două puteri care par greu de comparat. Scrie-le cu aceeași bază sau calculează-le, apoi pune semnul și o propoziție care spune de ce.',
    recap: 'Aceeași bază, de la 2 în sus: câștigă exponentul mai mare. Același exponent, de la 1 în sus: câștigă baza mai mare. Altfel, rescrii puterile sau le compari cu una cunoscută.'
  }),

  lesson('patrat-perfect', 'Pătratul unui număr natural', {
    figure: 'square',
    formulas: ['n = k²', 'Ultima cifră: 0, 1, 4, 5, 6, 9'],
    theory: 'Un număr natural este pătrat perfect dacă este pătratul unui număr natural. 0 = 0², 1 = 1², 4 = 2², 9 = 3², 16 = 4² și tot așa.\n\nÎntre două pătrate perfecte vecine nu mai încape alt pătrat perfect. Dacă un număr stă strict între k² și (k+1)², nu este pătrat perfect.\n\nProdusul a două pătrate perfecte este pătrat perfect, pentru că a² × b² = (a×b)². Dacă un pătrat perfect se împarte la un număr prim, se împarte și la pătratul acelui prim.\n\nUltima cifră a unui pătrat perfect poate fi doar 0, 1, 4, 5, 6 sau 9. Dacă numărul se termină în 2, 3, 7 sau 8, nu este pătrat perfect. Atenție: ultima cifră bună nu ajunge. 26 se termină în 6 și tot nu este pătrat.',
    example: '144 = 12², deci este pătrat perfect. 110 stă între 10² = 100 și 11² = 121, deci nu este pătrat perfect. 36 × 49 = 6² × 7² = 42². 13² se termină în 9, pentru că 3² = 9.',
    practice: '1. Este 81 pătrat perfect? 2. Poate 2 347 să fie pătrat perfect? 3. Scrie pătratul lui 20.\n\nRăspunsuri: Da, 9². Nu, se termină în 7. 400.',
    mistakes: 'Nu declara pătrat perfect un număr doar pentru că ultima cifră este 0, 1, 4, 5, 6 sau 9. 50 se termină în 0 și nu este pătrat. Nu uita că 0 și 1 sunt pătrate perfecte.',
    tryThis: 'Scrie pătratele de la 0² până la 10². Încercuiește ultima cifră a fiecăruia și notează care cifre apar.',
    recap: 'Pătratul perfect este k². Între două pătrate vecine nu este altul. Produsul a două pătrate este pătrat. Ultima cifră nu poate fi 2, 3, 7 sau 8, dar o cifră permisă nu dovedește singură că numărul este pătrat.'
  }),

  lesson('baze', 'Baza 10 și baza 2', {
    figure: 'place-value',
    formulas: ['În baza 10, cifrele sunt 0–9', 'În baza 2, cifrele sunt 0 și 1'],
    theory: 'În baza 10, zece unități de un ordin fac o unitate de ordinul următor. Un număr se scrie ca sumă de cifre înmulțite cu puteri ale lui 10. Cifrele sunt de la 0 la 9. De exemplu, un număr de patru cifre abcd înseamnă a×10³ + b×10² + c×10 + d×10⁰.\n\nÎn baza 2 folosești doar cifrele 0 și 1. Două unități de un ordin fac o unitate de ordinul următor. Numărul se desface cu puteri ale lui 2. Ca să treci din baza 10 în baza 2, împarți repetat la 2 și citești resturile de la ultimul către primul. Ultimul rest este 1 și este cifra din stânga, dacă numărul nu este 0.\n\nCa să treci din baza 2 în baza 10, înmulțești fiecare cifră cu puterea lui 2 de la locul ei și aduni.',
    example: '110 în baza 2 înseamnă 1×4 + 1×2 + 0×1 = 6 în baza 10. Invers, 6 : 2 = 3 rest 0, 3 : 2 = 1 rest 1, 1 : 2 = 0 rest 1. Citești resturile de la coadă: 110 în baza 2. 183 în baza 10 este 1×100 + 8×10 + 3.',
    practice: '1. Scrie 13 în baza 2. 2. Ce număr în baza 10 este 1 010 în baza 2? 3. Descompune 2 045 cu puteri ale lui 10.\n\nRăspunsuri: 1 101 în baza 2. 8+2 = 10. 2×10³ + 0×10² + 4×10 + 5.',
    mistakes: 'În baza 2 nu există cifra 2. Nu citi resturile de la primul către ultimul: le citești de la ultimul împărțitor către primul rest. Nu uita 10⁰ = 1 în baza 10.',
    tryThis: 'Alege un număr mai mic decât 16. Scrie-l în baza 2 prin împărțiri la 2, apoi întoarce-l în baza 10 și verifică că ai același număr.',
    recap: 'Baza 10 folosește cifrele 0–9 și puterile lui 10. Baza 2 folosește 0 și 1 și puterile lui 2. Resturile împărțirilor la 2, citite de la sfârșit, dau scrierea binară. Suma cifră ori putere te aduce înapoi în baza 10.'
  }),

  lesson('ordine', 'Ordinea operațiilor și parantezele', {
    formulas: ['Întâi parantezele, din interior', 'Apoi puterile', 'Apoi × și :', 'Apoi + și −'],
    theory: 'Operațiile au ordine. Ordinul I este adunarea și scăderea. Ordinul II este înmulțirea și împărțirea. Ordinul III sunt puterile.\n\nFără paranteze, faci întâi puterile, apoi înmulțirile și împărțirile de la stânga la dreapta, apoi adunările și scăderile de la stânga la dreapta.\n\nParantezele rotunde se fac înaintea celor drepte, iar cele drepte înaintea acoladelor, mereu din interior spre exterior. Înăuntrul unei paranteze respecți aceeași ordine a operațiilor.\n\nParanteza nu este o podoabă. Ea spune ce lucrare este prima.',
    example: '3 + 4 × 2 = 3 + 8 = 11, nu 14. (3 + 4) × 2 = 14. 2³ × 5 = 8 × 5 = 40. 5 × [18 − (3 + 5)] : 2 + 7. În rotundă: 8. Apoi 18 − 8 = 10. 5 × 10 = 50. 50 : 2 = 25. 25 + 7 = 32.',
    practice: '1. Calculează 20 − 12 : 3. 2. Calculează (18 − 6) : 3. 3. Calculează 2² + 3 × 2.\n\nRăspunsuri: 16. 4. 10.',
    mistakes: 'Nu aduna înainte să înmulțești, dacă nu există paranteză. Nu calcula puterea ca pe o înmulțire a bazei cu exponentul. Nu sări dintr-o paranteză exterioară peste cea din interior.',
    tryThis: 'Scrie exercițiul 8 + 2 × 3 de două ori: o dată fără paranteză și o dată cu paranteză în jurul adunării. Calculează ambele și spune de ce diferă.',
    recap: 'Fără paranteze: puteri, apoi înmulțire și împărțire de la stânga, apoi adunare și scădere de la stânga. Cu paranteze: din interior spre exterior, iar în fiecare paranteză aceeași ordine.'
  }),

  lesson('recap-puteri', 'Recapitulare: puteri', {
    figure: 'power-grid',
    theory: 'Unitatea puterilor leagă scrierea, regulile, compararea, pătratele, baza 2 și ordinea operațiilor. Ești gata dacă deosebești baza de exponent, dacă aduni sau înmulțești exponenții la regula potrivită, dacă știi când câștigă baza și când câștigă exponentul, dacă recunoști un pătrat perfect și dacă treci un număr mic din baza 10 în baza 2.\n\nLa un calcul cu mai multe operații, paranteza interioară este prima, apoi puterea, apoi înmulțirea și împărțirea, apoi adunarea și scăderea.',
    example: '2³ × 2 = 2⁴ = 16. 3² = 9, deci 9 este pătrat perfect. 5 în baza 2: 101, pentru că 4 + 1. 4 + 2² = 4 + 4 = 8, nu 6².',
    practice: '1. Calculează 10² − 4². 2. Compară 2⁶ și 4³. 3. Scrie 9 în baza 2.\n\nRăspunsuri: 100 − 16 = 84. Egale, ambele 64. 1 001 în baza 2.',
    mistakes: 'Nu trata 10² − 4² ca pe (10 − 4)². 6² este 36, iar diferența pătratelor de aici este 84. Nu citi 101 din baza 2 ca pe o sută unu din baza 10.',
    tryThis: 'Fă trei exerciții pe caiet: o regulă de puteri, o comparație și un număr scris în baza 2. Lângă fiecare scrie regula folosită.',
    recap: 'Puterea repetă baza. Regulile lucrează pe exponenți numai după ce bazele se potrivesc. Pătratul perfect are ultima cifră din lista 0, 1, 4, 5, 6, 9 și este un k². Baza 2 folosește doar 0 și 1. Ordinea din exercițiu începe cu parantezele și cu puterile.'
  }),

  lesson('reducere', 'Metoda reducerii la unitate', {
    theory: 'Într-o problemă, întâi spui ce știi, ce trebuie să afli și cum depind mărimile. Apoi alegi metoda, scrii datele scurt și abia după aceea calculezi.\n\nReducerea la unitate te duce la o singură bucată. Dacă două mărimi cresc sau scad de același număr de ori, afli cât face o unitate, apoi înmulțești cu câte unități cere întrebarea. Dacă una crește când cealaltă scade de același număr de ori, unitatea se poartă pe dos: mai multe bucăți înseamnă mai puțin pentru fiecare.\n\nMetoda are de obicei doi pași: află valoarea pentru 1, apoi pentru numărul cerut.',
    example: '24 de caiete costă 168 de lei. Un caiet costă 168 : 24 = 7 lei. 10 caiete costă 7 × 10 = 70 lei. Alt caz: 6 copii vopsesc un gard în 4 ore, în același ritm. Un copil, singur, ar lucra de 6 ori mai mult, deci 24 de ore. 3 copii lucrează de 3 ori mai repede decât unul, deci 24 : 3 = 8 ore.',
    practice: '1. 5 kg de mere costă 25 de lei. Cât costă 8 kg? 2. 4 pompe golesc un bazin în 6 ore. În câte ore îl golesc 2 pompe, la fel de puternice?\n\nRăspunsuri: 40 de lei. 12 ore.',
    mistakes: 'Nu înmulți mai departe dacă mărimile merg pe dos. La pompe, mai puține pompe înseamnă mai multe ore, nu mai puține. Nu sări peste pasul „cât face una”.',
    tryThis: 'Scrie o problemă cu bilete și preț, în care prețul crește odată cu numărul. Rezolv-o în doi pași: prețul unui bilet, apoi prețul cerut.',
    recap: 'Reducerea la unitate află valoarea pentru 1, apoi o duce la numărul din întrebare. Dacă mărimile cresc împreună, înmulțești. Dacă una crește și cealaltă scade, împarți pe dos.'
  }),

  lesson('comparatie', 'Metoda comparației', {
    theory: 'Metoda comparației se folosește când ai două situații cu aceleași feluri de lucruri și vrei să scoți una dintre necunoscute. Scrii datele una sub alta. Te uiți ce este la fel și ce se schimbă.\n\nDiferența de bani, sau de cantitate, vine doar din ceea ce s-a schimbat. Afli prețul unei bucăți din diferență, apoi te întorci într-o situație și afli cealaltă bucată.\n\nMetoda merge și când dublezi sau înmulțești o situație ca să faci una dintre mărimi egală în ambele rânduri, și abia apoi scazi.',
    example: '2 caiete și 3 creioane costă 19 lei. 5 caiete și 3 creioane costă 34 lei. Creioanele sunt la fel de multe, deci diferența de 15 lei vine din cele 3 caiete în plus. Un caiet costă 15 : 3 = 5 lei. Două caiete costă 10 lei, deci 3 creioane costă 19 − 10 = 9 lei. Un creion costă 3 lei. Proba: 2×5 + 3×3 = 10 + 9 = 19.',
    practice: '1. 2 mingi și 1 rachetă costă 50 de lei. 2 mingi și 3 rachete costă 90 de lei. Cât costă o rachetă și cât costă o minge? 2. Verifică suma în prima situație.\n\nRăspunsuri: două rachete în plus costă 40 de lei, deci o rachetă costă 20. Două mingi costă 30, deci o minge costă 15. Proba: 30 + 20 = 50.',
    mistakes: 'Nu scădea prețurile dacă ai scăzut și obiecte diferite, fără să vezi ce a rămas. Nu împărți diferența de bani la numărul total de obiecte. O împarți doar la câte obiecte explică diferența.',
    tryThis: 'Scrie două rânduri în care creioanele sunt la fel de multe, iar caietele diferă. Pune prețuri care ies întregi. Află prețul unui caiet din diferență.',
    recap: 'Pui situațiile una sub alta, scoți ce este la fel și explici diferența prin ceea ce s-a schimbat. Din diferență afli o necunoscută, apoi te întorci și afli cealaltă. Proba reface sumele din enunț.'
  }),

  lesson('figurativa', 'Metoda figurativă', {
    figure: 'segments',
    formulas: ['Suma și diferența: a = (s − d) : 2', 'Suma și câtul: întregul se taie în părți egale'],
    theory: 'Metoda figurativă, sau grafică, desenează legătura dintre numere când ea nu se vede dintr-o operație gata făcută. De obicei desenezi un segment pentru numărul mai mic și îl iei ca unitate. Celălalt număr se desenează din atâtea unități câte spune relația.\n\nDacă știi suma și diferența a două numere, segmentul mare și segmentul mic, puse bine, arată că suma minus diferența face de două ori numărul mic. Dacă știi suma și de câte ori este unul mai mare decât celălalt, tai suma în părți egale. Dacă știi diferența și de câte ori este unul față de celălalt, diferența este făcută din părțile care prisosesc.',
    example: 'Suma a două numere este 30, iar diferența este 6. Desenezi două segmente. Bucata comună, de două ori, este 30 − 6 = 24. Numărul mic este 12. Numărul mare este 12 + 6 = 18. Altă problemă: suma este 40, iar numărul mare este de 3 ori numărul mic. Sunt 4 părți egale în sumă. O parte este 10, deci numerele sunt 10 și 30.',
    practice: '1. Suma este 24, diferența este 8. Află numerele. 2. Suma este 36, iar un număr este de 2 ori celălalt. Află-le.\n\nRăspunsuri: 8 și 16. 12 și 24.',
    mistakes: 'Nu împărți suma la 2 dacă numerele nu sunt egale. La suma și diferența, împarți la 2 numai ce rămâne după ce scoți diferența, iar acel rezultat este numărul mic, nu numărul mare. Nu uita să verifici și suma, și diferența.',
    tryThis: 'Desenează două segmente pentru numerele 7 și 11. Arată pe desen suma și diferența, apoi scrie cele două verificări.',
    recap: 'Un segment este unitatea. Relația spune câte unități desenezi. Din sumă și diferență, scoți diferența și înjumătățești restul ca să afli numărul mic. Din sumă și cât, tai suma în părți egale.'
  }),

  lesson('mers-invers', 'Metoda mersului invers', {
    theory: 'La mersul invers știi rezultatul de la sfârșit și vrei numărul de la început. Parcurgi operațiile de la coadă spre cap, fiecare cu operația ei pereche. Adunarea se desface prin scădere. Scăderea se desface prin adunare. Înmulțirea se desface prin împărțire exactă. Împărțirea exactă se desface prin înmulțire.\n\nUltima operație făcută în enunț este prima pe care o desfac. La sfârșit verifici: pornești de la numărul găsit și refaci drumul din enunț. Trebuie să ajungi la rezultatul dat.',
    example: 'Mă gândesc la un număr. Îl înmulțesc cu 2, adun 6 și obțin 20. Invers: 20 − 6 = 14, apoi 14 : 2 = 7. Verificare: 7 × 2 = 14, 14 + 6 = 20.',
    practice: '1. Un număr este înmulțit cu 3, apoi se scade 4 și se obține 11. Care este numărul? 2. Verifică drumul.\n\nRăspunsuri: 5. 5×3 = 15, 15 − 4 = 11.',
    mistakes: 'Nu desface operațiile în ordinea din enunț. Le desfac în ordine inversă. Nu scădea când ultima operație a fost o scădere: o desfac prin adunare. Nu uita verificarea.',
    tryThis: 'Inventeză un drum din trei operații, pornește de la 4 și ajunge la un rezultat. Dă-i colegului doar rezultatul și operațiile. Verifică numărul la care a ajuns.',
    recap: 'Mersul invers desface operațiile de la sfârșit spre început, fiecare cu perechea ei. Verificarea reface enunțul de la numărul găsit și trebuie să dea rezultatul cunoscut.'
  }),

  lesson('falsa-ipoteza', 'Metoda falsei ipoteze', {
    theory: 'Falsa ipoteză se folosește când ai două feluri de obiecte și știi câte sunt la un loc și încă un total, de pildă o sumă de bani sau o cantitate. Nu știi câte sunt din fiecare fel.\n\nPresupui, pentru o clipă, că toate sunt de un singur fel. Calculezi totalul acestei presupuneri. Diferența față de totalul real vine din obiectele de celălalt fel. Împarți diferența la cât aduce în plus un singur obiect de felul celălalt. Afli câte sunt de felul al doilea, apoi le scazi din numărul total.\n\nLa sfârșit verifici ambele date: numărul de obiecte și totalul de bani sau de litri.',
    example: 'S-au vândut 30 de bilete, unele de 10 lei și altele de 15 lei, și s-au încasat 380 de lei. Presupunem că toate cele 30 sunt de 10 lei: ar fi 300 de lei. Lipsesc 80 de lei. Fiecare bilet de 15 lei aduce cu 5 lei mai mult. 80 : 5 = 16 bilete de 15 lei. Bilete de 10 lei: 14. Proba: 14 + 16 = 30 și 14×10 + 16×15 = 140 + 240 = 380.',
    practice: '1. În 10 cutii sunt mere, câte 2 sau câte 5, în total 32 de mere. Câte cutii de fiecare fel sunt? 2. Fă proba.\n\nRăspunsuri: dacă toate ar avea 2 mere, ar fi 20. Lipsesc 12. Fiecare cutie de 5 aduce 3 mere în plus. 12 : 3 = 4 cutii de 5 mere și 6 cutii de 2 mere. Proba: 6×2 + 4×5 = 12 + 20 = 32.',
    mistakes: 'Nu împărți diferența de bani la prețul întreg al biletului scump. O împarți la diferența dintre cele două prețuri. Nu uita să scazi din total biletele aflate, ca să le găsești pe celelalte.',
    tryThis: 'Schimbă numerele din exemplul cu bilete astfel încât împărțirea să iasă exact. Scrie presupunerea, diferența și proba.',
    recap: 'Presupui că toate obiectele sunt de un fel, vezi cu cât greșești față de totalul real și împarți greșeala la cât aduce în plus un obiect de celălalt fel. Proba reface și numărul, și totalul.'
  }),

  lesson('recap-metode', 'Recapitulare: metode aritmetice', {
    figure: 'segments',
    theory: 'Ca să rezolvi o problemă, spui ipoteza și concluzia, vezi cum depind mărimile, alegi metoda, desenezi sau scrii datele scurt, calculezi și verifici.\n\nReducerea la unitate caută valoarea pentru 1. Comparația scoate o necunoscută din diferența a două situații. Metoda figurativă desenează segmente. Mersul invers desface operațiile de la coadă. Falsa ipoteză presupune un caz simplu și corectează diferența.\n\nNu există o singură metodă pentru toate problemele. O alegi pe cea care face datele mai limpezi. Poți și să le combini.',
    example: '3 tricouri identice costă 90 de lei. Unul costă 30, deci 5 costă 150. Asta este reducere la unitate, nu comparație, pentru că ai o singură situație și mărimile cresc împreună.',
    practice: '1. Un număr, împărțit exact la 4, dă 9. Care este numărul? Ce metodă folosești? 2. Suma a două numere este 20, diferența este 4. Ce metodă desenează repede răspunsul?\n\nRăspunsuri: 36, mers invers. Metoda figurativă: numerele sunt 8 și 12.',
    mistakes: 'Nu începe cu calcule înainte să spui ce cauți. Nu folosi falsa ipoteză când ai un singur preț și o singură cantitate: acolo ajunge reducerea la unitate.',
    tryThis: 'Ia o problemă scurtă cu două prețuri. Scrie de ce ai ales comparația sau falsa ipoteză, într-o singură propoziție, apoi rezolv-o.',
    recap: 'Cele cinci metode sunt reducerea la unitate, comparația, figurativa, mersul invers și falsa ipoteză. Fiecare pornește de la felul datelor. Verificarea se face în enunț, nu doar în ultima împărțire.'
  }),

  lesson('divizor', 'Divizor și multiplu', {
    formulas: ['d divide a dacă a = d × k', 'a este multiplu al lui d'],
    theory: 'Numărul d, nenul, este divizor al lui a dacă împărțirea lui a la d este exactă. Scrii d | a și spui „d divide a”. Atunci există un număr natural k astfel încât a = d × k. Dacă nu se împarte exact, scrii d nu divide a.\n\nÎn același timp, a este multiplu al lui d. Divizorii lui a sunt numerele care îl împart exact. Multiplii lui a sunt a×0, a×1, a×2 și tot așa. 0 este multiplu al oricărui număr natural nenul, pentru că 0 = a × 0. 1 este divizor al oricărui număr natural.\n\nOrice număr natural nenul se divide pe el însuși. Ca să găsești divizorii, încerci numerele de la 1 până la a și păstrezi împărțirile exacte. Ei vin în perechi: dacă d îl împarte pe a, atunci și a : d îl împarte.',
    example: 'Divizorii lui 12 sunt 1, 2, 3, 4, 6 și 12, pentru că 12 = 1×12 = 2×6 = 3×4. 5 nu îl divide pe 12. 12 este multiplu al lui 3. 0 este multiplu al lui 12. 1 divide 12.',
    practice: '1. Scrie divizorii lui 18. 2. Este 24 multiplu al lui 8? 3. Este 2 divizor al lui 15?\n\nRăspunsuri: 1, 2, 3, 6, 9, 18. Da, 8×3 = 24. Nu.',
    mistakes: 'Nu spune că 0 este divizor. Împărțitorul este nenul. Nu confunda „d divide a” cu „a divide d”. 3 divide 12, dar 12 nu divide 3.',
    tryThis: 'Alege numărul 20. Scrie toți divizorii în perechi și toți multiplii mai mici decât 100.',
    recap: 'd divide a când a este d înmulțit cu un număr natural. Atunci a este multiplu al lui d. 1 divide orice număr natural. 0 este multiplu, nu divizor. Divizorii se grupează în perechi.'
  }),

  lesson('comun', 'Divizor comun și multiplu comun', {
    theory: 'Un divizor comun al mai multor numere este un număr care le divide pe toate. 1 este divizor comun al tuturor numerelor naturale. Dacă un număr este divizor comun al lui a și al lui b, atunci el divide și suma a + b, și diferența lor, când diferența este naturală.\n\nUn multiplu comun este un număr care se divide la fiecare dintre numerele date. 0 este multiplu comun al tuturor numerelor naturale nenule. În probleme cauți de multe ori multiplii comuni nenuli, mai ales pe cel mai mic dintre ei, sau divizorii comuni, mai ales pe cel mai mare dintre ei.\n\nLa buchete egale, numărul de buchete este un divizor comun al tuturor cantităților. La o clasă care se grupează și câte 2, și câte 5, efectivul este un multiplu comun al lui 2 și al lui 5.',
    example: 'Divizorii lui 8 sunt 1, 2, 4, 8. Ai lui 12 sunt 1, 2, 3, 4, 6, 12. Divizorii comuni sunt 1, 2 și 4. Cel mai mare este 4. Multiplii comuni nenuli ai lui 4 și 6, mai mici decât 30, sunt 12 și 24. Cel mai mic nenul este 12. 4 divide 8 + 12, pentru că 4 divide și 8, și 12.',
    practice: '1. Scrie divizorii comuni ai lui 18 și 24. 2. Care este cel mai mare? 3. Care este cel mai mic multiplu comun nenul al lui 3 și 5?\n\nRăspunsuri: 1, 2, 3, 6. 6. 15.',
    mistakes: 'Nu lua un divizor al unui singur număr și să-l numești comun. El trebuie să dividă fiecare număr. Nu spune că 0 este singurul multiplu comun: este unul dintre ei, iar în problemele cu obiecte îl lași deoparte.',
    tryThis: 'Ai 12 creioane roșii și 18 albastre. Găsește în câte feluri poți face grupe egale, cu același număr de grupe, folosind toate creioanele. Spune câți creioane are o grupă în fiecare caz.',
    recap: 'Divizorul comun le împarte pe toate. Multiplul comun se împarte la toate. 1 este mereu divizor comun. Cel mai mare divizor comun și cel mai mic multiplu comun nenul rezolvă problemele cu grupe egale și cu momente care se întâlnesc.'
  }),

  lesson('criterii-2510', 'Criteriile pentru 2, 5 și 10', {
    theory: 'Un criteriu de divizibilitate îți spune dacă un număr se împarte exact la altul, fără să faci toată împărțirea. Orice număr cu măcar două cifre este un număr de zeci plus ultima cifră. Numărul de zeci se împarte la 2, la 5 și la 10. De aceea decide ultima cifră.\n\nUn număr se împarte la 2 dacă ultima cifră este pară: 0, 2, 4, 6 sau 8. Se împarte la 5 dacă ultima cifră este 0 sau 5. Se împarte la 10 dacă ultima cifră este 0.\n\nDacă se împarte la 10, se împarte și la 2, și la 5. Reciproca nu este adevărată: un număr se poate împărți la 2 și la 5 numai dacă se împarte la 10, pentru că 2 și 5 nu au divizori comuni în afară de 1. Dacă se împarte și la 2, și la 5, ultima cifră trebuie să fie 0.',
    example: '48 se termină cu 8, deci se împarte la 2, nu la 5 și nu la 10. 75 se termină cu 5, deci se împarte la 5, nu la 2. 130 se termină cu 0, deci se împarte la 2, la 5 și la 10.',
    practice: '1. Care dintre 26, 45 și 90 se împarte la 10? 2. Alege numerele divizibile cu 2 și cu 5 din lista 15, 20, 32, 40. 3. Ultima cifră a lui 238 + 297 se vede din 8 + 7. Care este?\n\nRăspunsuri: 90. 20 și 40. 5, pentru că 15 se termină cu 5.',
    mistakes: 'Nu aduna toate cifrele ca să vezi divizibilitatea cu 2. La 2, la 5 și la 10 contează doar ultima cifră. Nu spune că un număr terminat în 5 este par.',
    tryThis: 'Scrie patru numere de trei cifre: unul doar pentru 2, unul doar pentru 5, unul pentru 10 și unul pentru niciunul. Lângă fiecare scrie ultima cifră care a decis.',
    recap: 'La 2 te uiți dacă ultima cifră este pară. La 5, ultima cifră este 0 sau 5. La 10, ultima cifră este 0. Cine se împarte la 10 se împarte și la 2, și la 5. Cine se împarte și la 2, și la 5 se împarte la 10.'
  }),

  lesson('criterii-39', 'Criteriile pentru 3 și pentru 9', {
    theory: 'La 3 și la 9 nu ajunge ultima cifră. Aduni cifrele numărului. Dacă suma cifrelor se împarte la 3, numărul se împarte la 3. Dacă suma cifrelor se împarte la 9, numărul se împarte la 9.\n\nPoți repeta suma dacă ea este mare. 9 999 are suma 36, iar 3 + 6 = 9. Și 36, și 9 se împart la 9, deci numărul se împarte la 9.\n\nCine se împarte la 9 se împarte și la 3, pentru că 9 = 3 × 3. Cine se împarte la 3 nu se împarte neapărat la 9. 12 se împarte la 3, pentru că 1 + 2 = 3, dar 3 nu se împarte la 9, deci nici 12.',
    example: '45: 4 + 5 = 9. 9 se împarte la 3 și la 9, deci 45 se împarte la 3 și la 9. 52: 5 + 2 = 7. 7 nu se împarte nici la 3, nici la 9, deci nici 52. 111: 1+1+1 = 3, deci se împarte la 3, nu la 9.',
    practice: '1. Se împarte 2 076 la 3? Dar la 9? 2. Se împarte 81 la 9? 3. Găsește cel mai mic număr de trei cifre, mai mare decât 100, care se împarte la 9.\n\nRăspunsuri: 2+0+7+6 = 15, deci la 3 da, la 9 nu. Da, 8+1 = 9. 108.',
    mistakes: 'Nu folosi ultima cifră pentru 3 sau pentru 9. 15 se termină cu 5 și tot se împarte la 3. Nu crede că suma cifrelor trebuie să fie chiar 3 sau 9: poate fi 6, 12, 18 sau alt multiplu.',
    tryThis: 'Scrie un număr de patru cifre. Calculează suma cifrelor și spune, fără împărțire lungă, dacă numărul se împarte la 3 și dacă se împarte la 9.',
    recap: 'Aduni cifrele. Dacă suma se împarte la 3, numărul se împarte la 3. Dacă suma se împarte la 9, numărul se împarte la 9. Divizibilitatea cu 9 o aduce și pe cea cu 3. Invers nu este obligatoriu.'
  }),

  lesson('prime', 'Numere prime și numere compuse', {
    theory: 'Orice număr natural a, mai mare sau egal cu 2, are măcar doi divizori: 1 și el însuși. Ei se numesc divizori improprii. Ceilalți divizori, dacă există, se numesc divizori proprii. Pentru 0 și pentru 1 nu vorbim despre divizori proprii sau improprii. 1 are un singur divizor natural, pe 1. 0 se împarte la orice număr nenul.\n\nUn număr prim are exact doi divizori: 1 și el însuși. 2, 3, 5, 7, 11, 13 sunt prime. 2 este singurul prim par. Un număr compus are și alți divizori în afară de 1 și de el însuși. 4, 6, 8, 9, 15 sunt compuse. 1 nu este prim și nu este compus.\n\nUn pătrat perfect mai mare decât 1 nu este prim, pentru că are măcar trei divizori: 1, rădăcina și numărul însuși. Ca să verifici un număr mic, încerci divizorii primi până la un prim al cărui pătrat trece peste număr.',
    example: '17 are divizorii 1 și 17, deci este prim. 22 are divizorii 1, 2, 11 și 22, deci este compus. 49 = 7×7, deci este compus, chiar dacă este impar. Între 40 și 50, după ce tai parele, pe 45 = 9×5 și pe 49 = 7×7, rămân primele 41, 43 și 47.',
    practice: '1. Este 1 prim? 2. Este 2 prim? 3. Câte numere prime sunt între 10 și 20?\n\nRăspunsuri: Nu. Da. Patru: 11, 13, 17, 19.',
    mistakes: 'Nu spune că orice număr impar este prim. 9, 15, 21, 25, 27 sunt impare și compuse. Nu spune că 1 este prim. Nu spune că 2 este compus doar pentru că este par.',
    tryThis: 'Scrie numerele de la 1 la 30. Taie-l pe 1. Încercuiește-le pe cele prime și spune de ce 25 și 27 nu sunt prime.',
    recap: 'Prim înseamnă exact doi divizori, 1 și el însuși. Compus înseamnă și alți divizori. 1 nu este nici prim, nici compus. 2 este singurul prim par. Pătratul perfect mai mare decât 1 este compus.'
  }),

  lesson('recap-divizibilitate', 'Recapitulare: divizibilitate', {
    theory: 'Capitolul numerelor naturale se închide cu divizibilitatea. Știi să recunoști un divizor și un multiplu, un divizor comun și un multiplu comun, criteriile pentru 2, 5, 10, 3 și 9, și deosebești numărul prim de cel compus.\n\nÎntr-o verificare, criteriul se spune în cuvinte: ultima cifră sau suma cifrelor. La un număr prim arăți că nu are alt divizor. La o problemă cu grupe, spui dacă numărul de grupe este divizor comun sau dacă efectivul este multiplu comun.\n\nSchema capitolului ține la un loc scrierea, axa, compararea, aproximarea, cele patru operații, puterile, metodele și divizibilitatea. Fiecare problemă folosește doar bucata de care are nevoie.',
    example: '120 se termină cu 0, deci se împarte la 2, la 5 și la 10. 1+2+0 = 3, deci se împarte și la 3, nu la 9. 120 este compus. Cel mai mic număr de trei cifre care se împarte la 2, la 3 și la 5 este 120, pentru că trebuie să se termine în 0 și suma cifrelor să fie multiplu de 3. 30 este prea scurt. 60, 90 la fel. 120 este primul cu trei cifre.',
    practice: '1. Este 2 439 divizibil cu 3? Dar cu 9? 2. Scrie cel mai mare divizor comun al lui 15 și 25, adică cel mai mare divizor pe care îl au împreună. 3. Este 31 prim?\n\nRăspunsuri: 2+4+3+9 = 18, deci da și da. 5. Da, 31 are doar divizorii 1 și 31.',
    mistakes: 'Nu amesteca criteriul lui 2 cu criteriul lui 3. Nu numi prim un pătrat, doar pentru că „nu se vede” dintr-o privire. 49 pare greu și tot este 7×7.',
    tryThis: 'Fă o schemă de o pagină a capitolului, cu câte o regulă scurtă pentru scriere, axă, operații, puteri, o metodă aleasă de tine și divizibilitate. Pune lângă fiecare un exemplu al tău.',
    recap: 'd divide a când împărțirea este exactă. Divizorul comun și multiplul comun servesc grupele și întâlnirile. Pentru 2, 5 și 10 te uiți la ultima cifră. Pentru 3 și 9 aduni cifrele. Prim înseamnă exact doi divizori. Compus înseamnă mai mulți. 1 nu este prim.'
  })
];

module.exports = { NATURALE_LESSONS };
