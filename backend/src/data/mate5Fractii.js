// Capitolele II și III din Matematică, clasa a V-a, Litera, cod A1259 (2022):
// fracții ordinare, operații cu ele, fracții zecimale și organizarea datelor.
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

const FRACTII_LESSONS = [
  lesson('fractali', 'Fractali: triunghiul și pătratul', {
    figure: 'sierpinski',
    formulas: ['Mijloacele laturilor se unesc', 'Mijlocul rămâne necolorat'],
    theory: 'Un fractal este un desen care se repetă, din ce în ce mai mic.\n\nPornești de la un triunghi cu toate laturile egale. Marchezi mijlocul fiecărei laturi și le unești. Apar patru triunghiuri mai mici. Colorezi trei, iar pe cel din mijloc îl lași gol. La pasul următor faci la fel în fiecare triunghi colorat. Poți repeta pașii de la 0 până la 4.\n\nLa pătrat împarți fiecare latură în trei părți egale. Obții nouă pătrate mici. Colorezi doar pătratele din colțuri. Apoi repeți desenul în fiecare pătrat colorat.\n\nFracțiile colorate din desen îți arată ce parte din întreg ai umplut la fiecare pas.',
    example: 'La primul pas al triunghiului colorezi 3 din 4 triunghiuri mici, deci 3/4. Mijlocul, 1/4, rămâne gol. La pătrat, 4 colțuri din 9 pătrate înseamnă 4/9 colorat.',
    practice: '1. La primul pas al triunghiului, ce fracție rămâne goală? 2. La pătratul tăiat în 9, câte pătrate colorezi dacă iei doar colțurile? 3. Dacă repeți o dată desenul doar în colțuri, părțile devin mai mari sau mai mici?\n\nRăspunsuri: 1/4. 4. Mai mici.',
    mistakes: 'Nu colora și triunghiul din mijloc: regula spune că el rămâne gol. Nu tăia pătratul în 4 când regula cere 3 părți pe fiecare latură.',
    tryThis: 'Desenează un triunghi și fă doi pași. Colorează și scrie, lângă desen, fracția colorată la fiecare pas. Pune foaia într-un portofoliu de fracții.',
    recap: 'La triunghi unești mijloacele și lași gol mijlocul. La pătrat tai latura în trei și colorezi colțurile. La fiecare pas, desenul se repetă mai mic. Fracția spune partea colorată din întreg.'
  }),

  lesson('fractie', 'Fracția ordinară', {
    figure: 'fraction-bar',
    formulas: ['Numitorul nu este 0', '1/100 = 1%'],
    theory: 'O fracție ordinară se scrie a/b. Numărul de sus, a, este numărătorul. Numărul de jos, b, este numitorul. Linia dintre ei este bara de fracție. Numitorul nu poate fi 0, pentru că nu tai întregul în zero părți.\n\nNumitorul spune în câte părți egale tai un întreg: o ciocolată, un tort, un teren. Numărătorul spune câte astfel de părți iei.\n\nDacă numărătorul este mai mic decât numitorul, fracția este subunitară: este mai mică decât 1. Așa sunt 0/2 și 1/2. Dacă sunt egali, fracția este echiunitară: este chiar 1, ca 2/2. Dacă numărătorul este mai mare, fracția este supraunitară: trece de un întreg, ca 3/2.\n\nFracția 1/n se numește fracție unitate. Un întreg are exact n părți de câte 1/n.\n\nO sutime, 1/100, este un procent. Scrii 1%. În general, n/100 se scrie n%.',
    example: 'O ciocolată tăiată în 8 pătrate, din care iei 3, se scrie 3/8. Este subunitară. 8/8 este toată ciocolata, deci echiunitară. 11/8 înseamnă o ciocolată întreagă și încă 3 pătrate. 4% înseamnă 4/100.',
    practice: '1. 3/8 este subunitară, echiunitară sau supraunitară? 2. Dar 6/6? 3. Dar 9/4? 4. Scrie 4% ca fracție.\n\nRăspunsuri: subunitară. Echiunitară. Supraunitară. 4/100.',
    mistakes: 'Nu pune numitorul 0. Nu schimba locul: la 3/8 iei 3 părți din 8, nu 8 din 3. Nu spune că orice fracție este mai mică decât 1. 9/4 este mai mare decât 1.',
    tryThis: 'Taie pe hârtie un dreptunghi în 5 părți egale. Colorează 2 și scrie fracția. Apoi scrie și 5/5 și 7/5 și spune din ce fel este fiecare.',
    recap: 'Numărătorul este sus, numitorul este jos și nu este 0. Subunitară înseamnă mai mică decât 1, echiunitară înseamnă 1, supraunitară înseamnă mai mare decât 1. 1/n este o parte din n părți egale. n/100 se citește n procente.'
  }),

  lesson('echivalente', 'Fracții echivalente', {
    figure: 'equivalent-bars',
    formulas: ['a/b = c/d dacă a·d = b·c'],
    theory: 'Două fracții echivalente arată aceeași parte din același întreg, chiar dacă sunt tăiate altfel. Jumătate dintr-o ciocolată este totuna cu două sferturi: 1/2 = 2/4.\n\nProba se face în cruce. a/b și c/d sunt echivalente dacă a înmulțit cu d este egal cu b înmulțit cu c. Dacă produsele diferă, fracțiile nu sunt echivalente.\n\nPoți obține o fracție echivalentă dacă înmulțești, sau împarți, și numărătorul și numitorul cu același număr nenul. Valoarea nu se schimbă. Se schimbă doar felul în care tai întregul.',
    example: '2/5 și 6/15: 2·15 = 30 și 5·6 = 30, deci sunt echivalente. 3/4 și 5/7: 3·7 = 21 și 4·5 = 20. Produsele diferă, deci fracțiile nu sunt echivalente.',
    practice: '1. Sunt 2/5 și 6/15 echivalente? 2. Sunt 3/4 și 5/7 echivalente? 3. Amplifică 1/4 cu 3 și scrie fracția nouă.\n\nRăspunsuri: da, pentru că 2·15 = 5·6. Nu, pentru că 21 nu este 20. 3/12.',
    mistakes: 'Nu aduna același număr sus și jos. 1/2 plus 1 sus și jos devine 2/3, care nu mai este jumătate. Trebuie să înmulțești. Nu compara doar numărătorii.',
    tryThis: 'Desenează două bare de aceeași lungime. Taie una în 3 și colorează 1. Taie cealaltă în 6 și colorează până ajungi la aceeași lungime. Scrie cele două fracții și verifică proba în cruce.',
    recap: 'Fracțiile echivalente sunt aceeași parte din întreg. Proba este a·d = b·c. Înmulțești sau împarți sus și jos cu același număr nenul.'
  }),

  lesson('comparare-fractii', 'Compararea fracțiilor ordinare', {
    figure: 'equivalent-bars',
    formulas: ['Același numitor: câștigă numărătorul mai mare', 'Același numărător: câștigă numitorul mai mic'],
    theory: 'A compara două fracții înseamnă să spui care este mai mică, dacă sunt egale sau care este mai mare.\n\nDacă au același numitor, feliile sunt la fel de mari. Câștigă cine ia mai multe: din a mai mic decât b rezultă a/n mai mic decât b/n.\n\nDacă au același numărător, iei la fel de multe felii, dar felia mică vine dintr-un numitor mare. Câștigă numitorul mai mic: din a mai mic decât b rezultă n/a mai mare decât n/b.\n\nLa fracțiile unitate, mai multe părți înseamnă o felie mai mică. De aceea 1/1 este mai mare decât 1/2, care este mai mare decât 1/3, și tot așa.\n\nDacă nu au nici același numitor, nici același numărător, le aduci la fracții echivalente pe care știi să le compari.',
    example: '4/9 și 7/9 au același numitor, iar 4 este mai mic decât 7, deci 4/9 este mai mic decât 7/9. 5/6 și 5/8 au același numărător. 6 este mai mic decât 8, deci felia de 1/6 este mai mare și 5/6 este mai mare decât 5/8.',
    practice: '1. Pune semnul între 4/9 și 7/9. 2. Pune semnul între 5/6 și 5/8. 3. Ordonează descrescător 1/2, 1/5 și 1/3.\n\nRăspunsuri: 4/9 < 7/9. 5/6 > 5/8. 1/2, apoi 1/3, apoi 1/5.',
    mistakes: 'Nu alege numitorul mai mare când numărătorii sunt egali. 1/8 este mai mic decât 1/3. Nu aduna fracțiile ca să le compari.',
    tryThis: 'Ia două benzi de hârtie egale. Taie una în 4 și una în 6. Colorează câte 2 părți pe fiecare și spune care bandă colorată este mai lungă. Verifică cu regula de la același numărător.',
    recap: 'Același numitor: câștigă numărătorul mai mare. Același numărător: câștigă numitorul mai mic. Fracția unitate scade când numitorul crește.'
  }),

  lesson('axa-fractii', 'Fracții pe axa numerelor', {
    figure: 'fraction-line',
    formulas: ['0/n stă în origine', 'a/n înseamnă a pași de câte 1/n'],
    theory: 'Axa numerelor are o origine O, un sens și un segment unitate. La fracții, segmentul unitate este un întreg.\n\nFracția 0/n stă în origine, oricare ar fi n nenul. Fracțiile cu numitorul 1, și cele echivalente cu ele, stau pe numerele naturale: 3/1 este în punctul 3.\n\nCa să pui a/n, împarți unitatea în n părți egale și numeri a pași de câte 1/n, din origine, în sensul pozitiv.\n\nFracțiile echivalente stau în același punct. De aceea 1/2 și 2/4 sunt un singur loc pe axă.\n\nPe axă, fracția mai mică stă mai la stânga. Ordonarea crescătoare merge spre dreapta. Ordonarea descrescătoare merge spre stânga.\n\nComparația trece mai departe. Dacă a/b este mai mic decât c/d și c/d este mai mic decât m/n, atunci a/b este mai mic decât m/n. Asta se numește tranzitivitate.',
    example: 'Unitatea este un segment de la 0 la 1. 0/5 stă în origine. 4/4 stă în 1. 3/2 înseamnă trei pași de câte 1/2, deci un întreg și încă o jumătate, la dreapta lui 1. Pentru că 1/2 < 1 și 1 < 3/2, rezultă 1/2 < 3/2.',
    practice: '1. Unde stă 0/5? 2. Unde stă 4/4? 3. 3/2 este la stânga lui 1 sau la dreapta?\n\nRăspunsuri: în origine. În punctul 1. La dreapta lui 1.',
    mistakes: 'Nu pune 1/2 la jumătatea drumului dintre 1 și 2. Jumătatea întregului este între 0 și 1. Nu desena două puncte pentru două fracții echivalente.',
    tryThis: 'Desenează o axă de la 0 la 2. Marchează 1/2, 1, 3/2 și 2/4. Spune care două etichete stau în același punct.',
    recap: 'Unitatea este un întreg. 0/n este în origine. a/n înseamnă a pași de 1/n. Echivalentele împart punctul. Pe axă, mai mic înseamnă mai la stânga. Tranzitivitatea duce comparația peste o fracție din mijloc.'
  }),

  lesson('mixte', 'Numere mixte', {
    figure: 'mixed-number',
    formulas: ['m = n·c + r, cu r < n', 'm/n = c și r/n'],
    theory: 'O fracție supraunitară se poate scrie și ca număr mixt: un număr natural și o fracție subunitară, una lângă alta.\n\nÎmparți numărătorul la numitor. Dacă m = n·c + r și restul r este mai mic decât n, atunci m/n = c și r/n. Numărul c arată întregii. Fracția r/n arată ce a mai rămas. Trecerea asta se numește scoaterea întregilor.\n\nInvers, introducerea întregilor lipește întregul în fracție. c și r/n înseamnă (c·n + r)/n.\n\nNumărul mixt și fracția spun același lucru. Pe axă stau în același punct.',
    example: '17 împărțit la 5 este 3, cu rest 2, pentru că 17 = 5·3 + 2. Deci 17/5 = 3 și 2/5. Invers, 3 și 1/5 = (3·5 + 1)/5 = 16/5.',
    practice: '1. Scoate întregii din 11/4. 2. Introdu întregii din 3 și 1/5. 3. Scrie 8/3 ca număr mixt.\n\nRăspunsuri: 2 și 3/4. 16/5. 2 și 2/3.',
    mistakes: 'Nu înmulți întregul doar cu numărătorul. La 3 și 1/5 înmulțești 3 cu numitorul 5, apoi aduni 1. Nu lăsa restul mai mare sau egal cu numitorul.',
    tryThis: 'Desenează trei pătrate. Colorează două întregi și un sfert din al treilea. Scrie și numărul mixt, și fracția improprie.',
    recap: 'Scoți întregii prin împărțirea numărătorului la numitor. Restul rămâne fracție. Introduci întregii cu c·n + r la numărător și n la numitor.'
  }),

  lesson('cmmdc-fractii', 'Cel mai mare divizor comun', {
    formulas: ['1 îi împarte pe toți', 'Un divizor comun nu trece peste niciun număr'],
    theory: 'Un divizor comun al unor numere naturale le împarte pe toate exact. Cel mai mare dintre ei se numește cel mai mare divizor comun. Ca să scrii scurt, pui c.m.m.d.c.\n\nPoți lucra cu două numere sau cu mai multe. Scrii divizorii fiecăruia, păstrezi pe cei comuni și îl alegi pe cel mai mare.\n\n1 este divizor al oricărui număr natural, deci este mereu divizor comun. Un divizor comun nu poate fi mai mare decât cel mai mic dintre numere, pentru că trebuie să încapă în fiecare.\n\nLa fracții, c.m.m.d.c. al numărătorului și al numitorului te ajută să simplifici dintr-o dată.',
    example: 'Divizorii lui 12 sunt 1, 2, 3, 4, 6 și 12. Divizorii lui 18 sunt 1, 2, 3, 6, 9 și 18. Comuni: 1, 2, 3 și 6. Cel mai mare este 6. Scrii c.m.m.d.c.(12, 18) = 6.',
    practice: '1. Scrie divizorii lui 12. 2. Care este c.m.m.d.c.(12, 18)? 3. Care este c.m.m.d.c.(8, 12)?\n\nRăspunsuri: 1, 2, 3, 4, 6, 12. 6. 4.',
    mistakes: 'Nu alege produsul numerelor. c.m.m.d.c. împarte, nu înmulțește. Nu sări peste 1: el este mereu pe listă, chiar dacă de obicei nu este cel mai mare.',
    tryThis: 'Alege două numere mai mici decât 30. Scrie divizorii pe două rânduri, încercuiește-i pe cei comuni și subliniază-l pe cel mai mare. Pune lângă rezultat prescurtarea c.m.m.d.c.',
    recap: 'Divizorii comuni îi împart pe toți. c.m.m.d.c. este cel mai mare dintre ei. 1 este mereu divizor comun. Niciun divizor comun nu trece peste numerele date.'
  }),

  lesson('amplificare', 'Amplificare și simplificare', {
    figure: 'equivalent-bars',
    formulas: ['Amplifici cu p: (p·a)/(p·b)', 'Simplifici prin d, d diferit de 1'],
    theory: 'Amplificarea înmulțește numărătorul și numitorul cu același număr natural nenul p. a/b devine (p·a)/(p·b). Fracția nouă este echivalentă cu cea veche. Ai tăiat întregul în părți mai mici și ai luat mai multe, dar partea din întreg a rămas aceeași.\n\nSimplificarea împarte numărătorul și numitorul la un divizor comun d, diferit de 1. Fracția se strânge. Valoarea rămâne.\n\nO fracție este ireductibilă dacă singurul divizor comun al numărătorului și al numitorului este 1. Altfel este reductibilă.\n\nDacă simplifici prin c.m.m.d.c., ajungi dintr-un pas la fracția ireductibilă.',
    example: 'Amplifici 2/7 cu 3: (2·3)/(7·3) = 6/21. Simplifici 18/24 prin c.m.m.d.c.(18, 24) = 6: (18:6)/(24:6) = 3/4. 3 și 4 nu mai au alt divizor comun în afară de 1, deci 3/4 este ireductibilă.',
    practice: '1. Amplifică 2/7 cu 3. 2. Simplifică 15/25 prin 5. 3. Simplifică 18/24 prin c.m.m.d.c. și spune dacă rezultatul este ireductibil.\n\nRăspunsuri: 6/21. 3/5. 3/4, ireductibilă.',
    mistakes: 'Nu amplifica doar sus. Nu simplifica prin 1 și să spui că ai schimbat fracția: 1 nu o strânge. Nu te opri la un divizor mic dacă mai există unul mai mare și ți se cere forma ireductibilă.',
    tryThis: 'Scrie 12/18. Găsește c.m.m.d.c. și simplifică. Apoi amplifică rezultatul cu 4 și arată, prin proba în cruce, că ai revenit la o fracție echivalentă.',
    recap: 'Amplifici cu p nenul: înmulțești sus și jos. Simplifici printr-un divizor comun diferit de 1. Forma ireductibilă apare când simplifici prin c.m.m.d.c.'
  }),

  lesson('cmmmc-numitor', 'Cel mai mic multiplu comun și numitorul comun', {
    formulas: ['0 este multiplu comun', 'Numitorul cel mai mic este c.m.m.m.c.'],
    theory: 'Un multiplu comun al unor numere naturale se împarte exact la fiecare dintre ele. 0 este multiplu comun al tuturor, pentru că 0 se împarte la orice număr nenul. La probleme vrei cel mai mic multiplu comun nenul. Prescurtarea este c.m.m.m.c.\n\nÎl găsești scriind multiplii nenuli și alegând primul număr care apare pe toate listele.\n\nA aduce fracțiile la numitor comun înseamnă să le scrii ca fracții echivalente cu același numitor. Poți amplifica fiecare fracție cu numitorul celeilalte. Numitorul nou este un multiplu comun, dar nu mereu cel mai mic.\n\nCa să lucrezi cu numere mici, simplifici întâi fracțiile, apoi iei c.m.m.m.c. al numitorilor. Amplifici fiecare fracție cu câtul dintre acest numitor comun și numitorul ei.',
    example: 'Multiplii nenuli ai lui 4: 4, 8, 12, 16… Ai lui 6: 6, 12, 18… Primul comun nenul este 12, deci c.m.m.m.c.(4, 6) = 12. Atunci 1/4 = 3/12 și 1/6 = 2/12.',
    practice: '1. Care este c.m.m.m.c.(4, 6)? 2. Scrie 1/4 și 1/6 cu numitorul 12. 3. Este 0 un multiplu comun al lui 4 și 6?\n\nRăspunsuri: 12. 3/12 și 2/12. Da, dar cel mai mic nenul este 12.',
    mistakes: 'Nu alege 0 când ți se cere cel mai mic multiplu comun nenul. Nu aduna numitorii ca să faci numitor comun. La 4 și 6, 10 nu se împarte nici la 4, nici la 6.',
    tryThis: 'Scrie multiplii de două cifre ai lui 6 și ai lui 8. Încercuiește-i pe cei comuni și subliniază-l pe cel mai mic. Apoi adu 1/6 și 1/8 la acel numitor.',
    recap: 'c.m.m.m.c. este cel mai mic multiplu comun nenul. 0 este multiplu comun, dar nu el rezolvă problema. Numitorul comun cel mai mic este c.m.m.m.c. al numitorilor, după ce fracțiile sunt ireductibile.'
  }),

  lesson('recap-ordinare', 'Recapitulare: fracții ordinare', {
    theory: 'Până aici ai desenat fractali, ai numit numărătorul și numitorul și ai deosebit fracția subunitară, echiunitară și supraunitară. Știi că 1/100 este un procent.\n\nRecunoști fracțiile echivalente prin proba în cruce. Compari la același numitor sau la același numărător și le pui pe axă. Scoți și introduci întregii. Folosești c.m.m.d.c. la simplificare și c.m.m.m.c. la numitorul comun.\n\nLa o verificare, arăți regula, nu doar rezultatul. La echivalente scrii cele două produse. La numitor comun spui de ce ai ales acel număr.',
    example: '3/4 este subunitară. 3/4 = 6/8, pentru că 3·8 = 4·6. 6/8 este mai mare decât 5/8. 11/4 = 2 și 3/4. c.m.m.d.c.(6, 8) = 2, deci 6/8 = 3/4, ireductibilă.',
    practice: '1. Ce fel de fracție este 5/5? 2. Verifică 2/3 și 8/12. 3. Adu 1/3 și 1/4 la cel mai mic numitor comun.\n\nRăspunsuri: echiunitară. Echivalente, pentru că 2·12 = 3·8. 4/12 și 3/12.',
    mistakes: 'Nu amesteca amplificarea cu adunarea. Nu pune pe axă fracția supraunitară înainte de 1. Nu numi c.m.m.d.c. un multiplu.',
    tryThis: 'Fă o fișă cu cinci rânduri: un fel de fracție, o probă de echivalență, o comparație, un număr mixt și un numitor comun. La fiecare rând scrie regula în câteva cuvinte.',
    recap: 'Fracția taie un întreg în părți egale. Echivalentele trec proba în cruce. Compari feliile la fel de mari sau numărul de felii. Axă, întregi, c.m.m.d.c. și c.m.m.m.c. sunt uneltele cu care scrii fracția într-o formă comodă.'
  }),

  lesson('adunare-fractii', 'Adunarea și scăderea fracțiilor', {
    figure: 'fraction-bar',
    formulas: ['Același numitor: (a ± b)/n', 'La scădere, primul termen este cel puțin al doilea'],
    theory: 'Aduni sau scazi fracții ordinare doar când au același numitor. Atunci feliile sunt la fel de mari. Aduni sau scazi numărătorii și păstrezi numitorul: (a + b)/n și (a − b)/n.\n\nLa scădere, primul numărător trebuie să fie mai mare sau egal cu al doilea. Altfel diferența nu este o fracție de felul celor învățate aici.\n\nDacă numitorii diferă, îi aduci întâi la un numitor comun, de preferat cel mai mic. Apoi aduni sau scazi. La sfârșit scrii rezultatul ireductibil, dacă se mai poate simplifica.\n\nAdunarea fracțiilor este comutativă și asociativă, ca la numerele naturale. Scăderea nu este.',
    example: '2/7 + 3/7 = 5/7. 5/6 − 1/6 = 4/6 = 2/3. Pentru 1/2 + 1/3, numitorul comun este 6: 3/6 + 2/6 = 5/6.',
    practice: '1. Calculează 2/7 + 3/7. 2. Calculează 5/6 − 1/6 și simplifică. 3. Calculează 1/2 + 1/3.\n\nRăspunsuri: 5/7. 2/3. 5/6.',
    mistakes: 'Nu aduna numitorii între ei. 1/2 + 1/3 nu este 2/5. Nu scădea dacă primul numărător este mai mic și numitorii sunt deja la fel, până nu schimbi ordinea pe care o cere problema.',
    tryThis: 'Desenează o bară tăiată în 6. Colorează 1/2, apoi încă 1/3, cu altă culoare. Numără pătrățelele colorate și scrie suma.',
    recap: 'Același numitor, lucrezi pe numărători. La numitori diferiți, aduci fracțiile la numitor comun. Scrii rezultatul ireductibil. Scăderea cere primul termen cel puțin egal cu al doilea.'
  }),

  lesson('inmultire-fractii', 'Înmulțirea fracțiilor', {
    formulas: ['b · (a/n) = (b·a)/n', '(a/n) · (b/m) = (a·b)/(n·m)'],
    theory: 'Să înmulțești un număr natural b cu fracția a/n înseamnă să iei fracția de b ori. Rezultatul este (b·a)/n. Dacă b este 0, produsul este 0.\n\nSă înmulțești două fracții înseamnă să înmulțești numărătorii între ei și numitorii între ei: (a/n) · (b/m) = (a·b)/(n·m).\n\nÎnmulțirea este comutativă și asociativă. 1 este element neutru: fracția rămâne neschimbată. 0 înghite produsul.\n\nDupă înmulțire, simplifică dacă există un divizor comun. Poți simplifica și înainte, un factor de sus cu un factor de jos.',
    example: '4 · (2/5) = 8/5. 0 · (3/7) = 0. (2/3) · (3/8) = 6/24 = 1/4. Poți tăia 3 cu 3 înainte: (2/1) · (1/8) = 2/8 = 1/4.',
    practice: '1. Calculează 4 · (2/5). 2. Calculează 0 · (3/7). 3. Calculează (2/3) · (3/8) ireductibil.\n\nRăspunsuri: 8/5. 0. 1/4.',
    mistakes: 'Nu aduna numitorii la înmulțire. Nu spune că înmulțirea face mereu fracția mai mică: 4 · (2/5) este mai mare decât 2/5.',
    tryThis: 'Calculează (3/4) · (2/9) în două feluri: întâi înmulțești, apoi simplifici, și întâi tai factorii comuni. Arată că ajungi la același rezultat.',
    recap: 'Natural ori fracție: înmulțești numărătorul. Fracție ori fracție: înmulțești sus cu sus și jos cu jos. 0 dă produs 0. La sfârșit simplifici.'
  }),

  lesson('parte-procent', 'Fracție dintr-un număr și procentul', {
    figure: 'fraction-bar',
    formulas: ['Fracție dintr-un număr = produs', 'n% = n/100'],
    theory: 'O fracție dintr-un număr, sau dintr-o altă fracție, este produsul lor. 2/5 din 30 înseamnă (2/5) · 30. 2/3 din 1/2 înseamnă (2/3) · (1/2).\n\nProcentul este o sutime. n% înseamnă n/100. Ca să afli n% dintr-un număr, înmulțești numărul cu n/100.\n\nContează întregul despre care vorbești. O treime dintr-un pumn de boabe nu este o treime din trei coșuri. Aceeași fracție, alt întreg, alt rezultat.\n\nLa o reducere, procentul se ia din prețul de la care pornești, apoi îl scazi din acel preț.',
    example: '1/4 din 24 este 24 : 4 = 6. 2/3 din 1/2 este 2/6 = 1/3. 20% din 50 este (20/100) · 50 = 10. O treime din 3 mere este 1 măr. O treime din 30 de mere este 10 mere.',
    practice: '1. Cât este 1/4 din 24? 2. Cât este 2/3 din 1/2? 3. Cât este 20% din 50?\n\nRăspunsuri: 6. 1/3. 10.',
    mistakes: 'Nu înmulți doar numărătorul cu întregul și să uiți numitorul. 1/4 din 24 nu este 24. Nu lua al doilea procent din prețul vechi, dacă reducerea nouă se aplică prețului deja schimbat.',
    tryThis: 'Alege un număr de 20 de obiecte. Calculează 1/5 din ele și 10% din ele. Spune de ce rezultatele diferă și care întreg l-ai folosit.',
    recap: 'Fracția dintr-un număr este un produs. Procentul este număr de sutimi. Întregul la care se referă fracția schimbă rezultatul.'
  }),

  lesson('impartire-fractii', 'Împărțirea fracțiilor', {
    formulas: ['a/b : c/d = a/b · d/c', 'Inversele au produsul 1'],
    theory: 'Două fracții nenule a/b și b/a sunt inverse. Produsul lor este 1. Inversa lui a, adică a/1, este 1/a. Inversa lui 1/a este a. Fracția 0 nu are inversă, pentru că nu împărți la 0.\n\nA împărți fracția a/b la fracția nenulă c/d înseamnă a înmulți prima fracție cu inversa celei de-a doua: a/b : c/d = a/b · d/c = (a·d)/(b·c).\n\nCazuri scurte: a/b : c = a/(b·c) și a : (c/d) = (a·d)/c.\n\nLa mai multe împărțiri una după alta, a/b : c/d : e/f = a/b : (c/d · e/f), cu toate fracțiile nenule.\n\nProba împărțirii este înmulțirea: câtul înmulțit cu împărțitorul dă deîmpărțitul.',
    example: 'Inversa lui 5/2 este 2/5, pentru că produsul este 1. 3/4 : 2 = 3/4 · 1/2 = 3/8. 2/3 : 4/5 = 2/3 · 5/4 = 10/12 = 5/6. Proba: 5/6 · 4/5 = 20/30 = 2/3.',
    practice: '1. Scrie inversa lui 5/2. 2. Calculează 3/4 : 2. 3. Calculează 2/3 : 4/5 ireductibil.\n\nRăspunsuri: 2/5. 3/8. 5/6.',
    mistakes: 'Nu răsturna prima fracție. O răstorni pe a doua, cea la care împarți. Nu împărți la 0. Nu lăsa numărul mixt neprefăcut în fracție înainte de împărțire.',
    tryThis: 'Alege două fracții nenule. Împarte-le, apoi fă proba prin înmulțire. Scrie o propoziție: câtul ori împărțitorul dă deîmpărțitul.',
    recap: 'Inversele dau produsul 1. Împărțirea este înmulțire cu inversa. La un șir de împărțiri, grupezi împărțitorii într-un produs. Verifici prin înmulțire.'
  }),

  lesson('puteri-fractii', 'Puterea unei fracții', {
    formulas: ['(a/b)^n = a^n / b^n', '(a/b)^0 = 1 dacă fracția nu este 0'],
    theory: 'Puterea a n-a a fracției a/b, cu n natural nenul, este fracția înmulțită cu ea însăși de n ori. Asta dă (a/b)^n = a^n / b^n. a/b este baza. n este exponentul.\n\nDacă exponentul este 0 și fracția nu este 0, puterea este 1. (0/b)^n este 0 pentru n nenul. (a/b)^1 este chiar a/b.\n\nRegulile sunt cele de la puterile numerelor naturale. La aceeași bază aduni exponenții când înmulțești și îi scazi când împarți, dacă primul exponent este cel puțin egal cu al doilea și baza nu este 0. La același exponent, înmulțești sau împarți bazele. O putere de putere înmulțește exponenții.',
    example: '(1/2)^3 = 1/8. (3/4)^0 = 1. (2/5)^2 · (2/5)^1 = (2/5)^3 = 8/125. (2/3)^2 : (2/3)^2 = (2/3)^0 = 1.',
    practice: '1. Calculează (1/2)^3. 2. Calculează (3/4)^0. 3. Scrie (2/5)^2 · (2/5) ca o singură putere și calculeaz-o.\n\nRăspunsuri: 1/8. 1. (2/5)^3 = 8/125.',
    mistakes: 'Nu înmulți baza cu exponentul. (1/2)^3 nu este 3/6. Nu da puterea 0 fracției 0. Nu scădea exponenții când bazele diferă.',
    tryThis: 'Scrie trei puteri cu baza 1/2: exponent 1, 2 și 3. Desenează, pentru exponentul 2, un pătrat tăiat în 4 și colorează una dintre părți.',
    recap: 'Ridici și numărătorul, și numitorul la exponent. Exponentul 0 dă 1 la o fracție nenulă. Regulile de adunat, scăzut și înmulțit exponenți rămân cele de la numerele naturale.'
  }),

  lesson('recap-operatii-fractii', 'Recapitulare: operații cu fracții', {
    theory: 'Cu fracțiile ordinare aduni și scazi la numitor comun, înmulțești sus cu sus și jos cu jos, iei o fracție dintr-un număr prin produs și împarți înmulțind cu inversa. Procentul este cazul sutimilor. Puterea urcă și numărătorul, și numitorul.\n\nOrdinea, când nu sunt paranteze, este cea învățată la numerele naturale: întâi puterea, apoi înmulțirea și împărțirea, de la stânga la dreapta, apoi adunarea și scăderea. Paranteza se face prima.\n\nLa sfârșit scrii fracția ireductibilă sau numărul mixt, dacă ți se cere.',
    example: '1/2 + 1/4 · 2. Întâi produsul: 1/4 · 2 = 1/2. Apoi suma: 1/2 + 1/2 = 1. Cu paranteză, (1/2 + 1/4) · 2 = 3/4 · 2 = 3/2.',
    practice: '1. Calculează 3/5 − 1/5. 2. Calculează 2/3 · 3/4. 3. Calculează 1/2 + 1/4 · 2.\n\nRăspunsuri: 2/5. 1/2. 1.',
    mistakes: 'Nu faci adunarea înaintea înmulțirii dacă nu există paranteză. Nu uita inversa la împărțire. Nu lăsa 4/8 când ți se cere forma ireductibilă.',
    tryThis: 'Scrie un exercițiu scurt cu o adunare și o înmulțire. Rezolvă-l o dată fără paranteză și o dată cu paranteză în jurul adunării. Compară rezultatele.',
    recap: 'Aduni la același numitor, înmulțești în crucea fracției, împarți prin inversă și ridici la putere sus și jos. Procentul este n/100. Ordinea operațiilor rămâne cea de la numerele naturale.'
  }),

  lesson('tabel-sir', 'Un tabel pentru un șir de date', {
    formulas: ['O coloană pentru loc, una pentru valoare', 'Frecvența spune de câte ori apare'],
    theory: 'Un șir de date este o listă de numere, în ordinea în care le-ai primit. Ca să le vezi mai clar, le pui într-un tabel. O coloană ține locul în șir: 1, 2, 3 și tot așa. Cealaltă ține valoarea.\n\nPoți ordona valorile crescător sau descrescător. Poți căuta un număr în tabel. Poți adăuga un rând nou sau poți tăia un rând.\n\nFrecvența unui număr spune de câte ori apare. O scrii într-o coloană mică, lângă valoarea diferită. Din tabel poți și aduna, și calcula media, când vei avea regula ei.\n\nAcelași tabel îl poți face pe hârtie. Mai târziu îl poți trece și într-un program de calcul, fără să schimbi numerele.',
    example: 'Șirul 4, 7, 4, 9, 7 intră pe cinci rânduri. Ordonat crescător: 4, 4, 7, 7, 9. Frecvența lui 4 este 2, a lui 7 este 2, a lui 9 este 1.',
    practice: '1. Câte rânduri are tabelul șirului 3, 5, 3, 8? 2. Ordonează-l crescător. 3. Ce frecvență are 3?\n\nRăspunsuri: 4. 3, 3, 5, 8. 2.',
    mistakes: 'Nu schimba valorile când le ordonezi. Nu număra rândurile goale ca frecvență. Nu aduna locul din șir cu valoarea.',
    tryThis: 'Notează șase numere de la un joc sau de la teme. Fă tabelul cu loc și valoare, apoi un tabel mic de frecvențe. Spune care număr apare cel mai des.',
    recap: 'Tabelul păstrează locul și valoarea. Ordonarea mută rândurile, nu schimbă numerele. Frecvența spune de câte ori apare o valoare.'
  }),

  lesson('scriere-zecimala', 'Scrierea fracțiilor zecimale', {
    figure: 'decimal-place',
    formulas: ['1/10 = 0,1', '1/100 = 0,01', '1/1000 = 0,001'],
    theory: 'O fracție zecimală se scrie cu virgulă. În fața virgulei este partea întreagă. După virgulă sunt zecimalele: zecimi, sutimi, miimi, zecimi de miime și tot așa.\n\n1/10 = 0,1. 1/100 = 0,01. 1/1000 = 0,001. După virgulă sunt atâtea cifre cât este exponentul lui 10 de la numitor. Dacă fracția este subunitară, în fața virgulei pui 0 și completezi cu zerouri până la locul corect. Dacă este supraunitară, întregii stau în fața virgulei.\n\nDouă zecimi se scriu 0,2. Douăzeci și nouă de sutimi se scriu 0,29. Douăzeci și nouă de zecimi se scriu 2,9.\n\nZerourile de după ultima zecimală nenulă nu schimbă valoarea: 0,1 = 0,10 = 0,100. Un număr natural se poate scrie cu zerouri după virgulă: 7 = 7,0.\n\nCa să treci de la o zecimală cu număr finit de zecimale nenule la o fracție ordinară, scrii la numărător cifrele fără virgulă, iar la numitor 10 la puterea numărului de zecimale. Apoi simplifici, dacă poți.',
    example: '3/10 = 0,3. 7/100 = 0,07. 25/10 = 2,5. Invers, 0,6 = 6/10 = 3/5. 2,01 = 201/100.',
    practice: '1. Scrie 3/10, 7/100 și 25/10 ca zecimale. 2. Scrie cu cifre: două zecimi și trei sutimi. 3. Transformă 0,6 în fracție ireductibilă.\n\nRăspunsuri: 0,3, 0,07 și 2,5. 0,2 și 0,03. 3/5.',
    mistakes: 'Nu pune trei sutimi ca 0,3. 0,3 înseamnă trei zecimi. Nu citi partea întreagă a lui 5,78 ca 57. Partea întreagă este 5.',
    tryThis: 'Scrie numărul 4,205 și spune ce cifră este la zecimi, la sutimi și la miimi. Apoi scrie-l ca fracție cu numitor 1000.',
    recap: 'Virgula desparte întregii de zecimale. Numărul zecimalelor este exponentul lui 10. Zerourile finale nu schimbă valoarea. Trecerea înapoi pune cifrele la numărător și o putere a lui 10 la numitor.'
  }),

  lesson('comparare-zecimale', 'Compararea fracțiilor zecimale', {
    figure: 'decimal-line',
    formulas: ['Întregul mai mare câștigă', 'La întregi egali, compari zecimală cu zecimală'],
    theory: 'Între două fracții zecimale este adevărată exact una dintre relații: mai mic, egal sau mai mare.\n\nLe poți transforma în fracții ordinare cu numitor o putere a lui 10 și apoi compara. Există și o regulă directă, ca la numerele naturale.\n\nDacă părțile întregi diferă, este mai mare zecimala cu întregul mai mare. Dacă părțile întregi sunt egale, compari cifra zecimilor. Dacă și ea este egală, compari sutimile, apoi miimile, până la prima cifră care diferă. Cifra mai mare face zecimala mai mare.\n\nPoți completa cu zerouri ca să ai la fel de multe zecimale. 7,39 = 7,390. Pe axă, zecimala mai mică stă mai la stânga.',
    example: '6,4 și 6,39 au același întreg. 6,4 = 6,40, iar 4 este mai mare decât 3 la zecimi, deci 6,4 > 6,39. 3,20 = 3,2, pentru că zeroul final nu schimbă valoarea. 8,1 > 7,99, pentru că 8 > 7.',
    practice: '1. Pune semnul între 6,4 și 6,39. 2. Pune semnul între 3,20 și 3,2. 3. Ordonează crescător 1,9, 2,01 și 1,89.\n\nRăspunsuri: 6,4 > 6,39. 3,20 = 3,2. 1,89, apoi 1,9, apoi 2,01.',
    mistakes: 'Nu alege numărul cu mai multe cifre după virgulă. 6,39 are mai multe zecimale decât 6,4 și tot este mai mic. Nu compara 0,8 cu 0,75 uitând că 0,8 = 0,80.',
    tryThis: 'Scrie patru prețuri cu virgulă, toate între 2 lei și 3 lei. Ordonează-le crescător și spune la ce cifră s-a decis fiecare pereche.',
    recap: 'Întregul mai mare câștigă. La întregi egali, prima zecimală diferită decide. Zerourile de la final nu schimbă egalitatea. Pe axă, ordinea crescătoare merge spre dreapta.'
  }),

  lesson('aproximari-zecimale', 'Aproximări și zecimale pe axă', {
    figure: 'decimal-line',
    formulas: ['Cifra 0–4: lipsă', 'Cifra 5–9: adaos'],
    theory: 'Aproximarea prin lipsă la un ordin este cea mai mare zecimală, oprită la acel ordin, care nu trece peste număr. Aproximarea prin adaos este cea mai mică zecimală, oprită la acel ordin, care nu este mai mică decât numărul.\n\nRotunjirea alege aproximarea mai apropiată. Dacă cele două sunt la fel de aproape, alegi adaosul.\n\nRegula practică: te uiți la cifra din dreapta ordinului. Dacă este 0, 1, 2, 3 sau 4, rotunjești prin lipsă. Dacă este 5, 6, 7, 8 sau 9, rotunjești prin adaos. Aceeași idee merge și la zeci, sute sau mii.\n\nPe axă, fiecare zecimală cu un număr finit de zecimale nenule are un singur punct. Ca să-l găsești, vezi între ce întregi stă, apoi între ce zecimi, apoi între ce sutimi. La fiecare pas, unitatea se împarte în 10. Întregul de pe axă rămâne același. Doar te uiți mai de aproape.',
    example: 'La 4,273, lipsa la zecimi este 4,2, iar adaosul este 4,3. Cifra sutimilor este 7, deci rotunjirea la zecimi este 4,3. La 2,65, lipsa la zecimi este 2,6 și adaosul este 2,7, la fel de departe, deci rotunjești la 2,7. 1,4 stă între 1 și 2, mai aproape de 1.',
    practice: '1. Aproximează 4,273 prin lipsă și prin adaos la zecimi, apoi rotunjește-l la zecimi. 2. Rotunjește 2,65 la zecimi. 3. Între ce întregi stă 1,4?\n\nRăspunsuri: 4,2 și 4,3, rotunjire 4,3. 2,7. Între 1 și 2.',
    mistakes: 'Nu tăia pur și simplu cifrele și să numești asta rotunjire. 4,273 tăiat la zecimi arată 4,2, dar rotunjirea este 4,3. Nu pune 1,4 mai aproape de 2 decât de 1.',
    tryThis: 'Desenează axa de la 1 la 2, împarte unitatea în zecimi și marchează 1,4. Scrie și rotunjirea lui 1,46 la zecimi.',
    recap: 'Lipsa nu trece peste număr. Adaosul nu rămâne sub număr. Rotunjirea alege apropierea, iar la egalitate alege adaosul. Pe axă îngustezi din 10 în 10.'
  }),

  lesson('recap-scriere-zecimale', 'Recapitulare: scrierea zecimalelor', {
    theory: 'Știi să scrii o fracție cu numitor o putere a lui 10 ca zecimală și să te întorci la fracția ordinară. Compari după întregi și apoi după zecimale. Aproximezi prin lipsă sau prin adaos și rotunjești. Pui zecimala pe axă între întregi, zecimi și sutimi.\n\nLa o verificare, spui ordinul la care te uiți. La egalitate, arăți zeroul care nu schimbă valoarea.',
    example: '13/100 = 0,13. 0,50 = 1/2. 2,38 > 2,3, pentru că 2,38 > 2,30. Rotunjirea lui 2,38 la zecimi este 2,4. Pe axă, 2,38 stă între 2 și 3, apoi între 2,3 și 2,4.',
    practice: '1. Scrie 13/100 ca zecimală. 2. Compară 2,38 și 2,3. 3. Rotunjește 2,38 la zecimi.\n\nRăspunsuri: 0,13. 2,38 > 2,3. 2,4.',
    mistakes: 'Nu confunda zecimile cu sutimile. Nu rotunji înainte să spui ordinul. Nu pune două puncte pentru 0,5 și 1/2.',
    tryThis: 'Alege o zecimală cu trei cifre după virgulă. Scrie-o ca fracție, compar-o cu rotunjirea ei la zecimi și spune de ce parte a rotunjirii stă pe axă.',
    recap: 'Virgula, comparația cifră cu cifră, lipsa, adaosul și axa țin la un loc scrierea zecimalelor finite.'
  }),

  lesson('adunare-zecimale', 'Adunarea și scăderea zecimalelor', {
    formulas: ['Virgulă sub virgulă', '10 zecimi = 1 unitate'],
    theory: 'Aduni zecimale cu un număr finit de zecimale nenule ca pe numere naturale, dar ții virgulele una sub alta. Cifrele de același ordin stau una sub alta. Unde lipsește o cifră, pui 0.\n\nAduni de la dreapta la stânga. Dacă suma unui ordin este cel puțin 10, scrii cifra unităților și duci 1 la ordinul următor. 10 zecimi fac o unitate. 10 sutimi fac o zecime. Virgula rezultatului stă sub celelalte virgule.\n\nScăderea se așază la fel. Dacă cifra de sus este mai mică, împrumuți o unitate de la ordinul din stânga, adică 10 unități de ordinul la care ești. Completează cu zerouri când scăzătorul are mai multe zecimale.\n\nAdunarea zecimalelor are aceleași proprietăți ca adunarea fracțiilor ordinare. Scăderea, la fel. Proba adunării spune că, din sumă, scoți un termen și rămâne celălalt.',
    example: '3,25 + 1,40 = 4,65. 8,03 − 2,70 = 5,33. 0,6 + 0,45 = 1,05. Poți verifica ultima sumă: 6/10 + 45/100 = 60/100 + 45/100 = 105/100 = 1,05.',
    practice: '1. Calculează 3,25 + 1,4. 2. Calculează 8,03 − 2,7. 3. Calculează 0,6 + 0,45.\n\nRăspunsuri: 4,65. 5,33. 1,05.',
    mistakes: 'Nu alinia ultima cifră dacă virgulele nu stau una sub alta. 23,41 plus 1,834 nu se adună ca și cum 1 ar sta sub 4. Nu uita unitatea pe care o duci mai departe.',
    tryThis: 'Adună 1,75 și 2,5 pe caiet, virgulă sub virgulă. Apoi scrie aceleași numere ca fracții și adună-le. Arată că rezultatul este același.',
    recap: 'Virgulă sub virgulă, zerouri unde lipsește cifra, adunare sau împrumut de la dreapta la stânga. 10 unități de un ordin fac o unitate de ordinul din stânga.'
  }),

  lesson('inmultire-zecimale', 'Înmulțirea zecimalelor', {
    formulas: ['Înmulțirea cu 10 mută virgula la dreapta', 'Zecimalele produsului se adună'],
    theory: 'Ca să înmulțești o zecimală cu 10, cu 100 sau cu 1000, muți virgula spre dreapta peste atâtea cifre cât este exponentul lui 10. Dacă nu mai ai cifre, pui zerouri.\n\nLa două zecimale, înmulțești numerele ca și cum nu ar avea virgulă. Apoi, din dreapta produsului, numeri atâtea zecimale cât au cei doi factori împreună și pui virgula. Zerourile din produs se numără și ele.\n\nDacă un factor este număr natural, numeri doar zecimalele celuilalt factor.\n\nÎnmulțirea zecimalelor are aceleași proprietăți ca înmulțirea fracțiilor. Puterea unei zecimale este zecimala înmulțită cu ea însăși, de atâtea ori cât spune exponentul. Regulile de la puterile fracțiilor rămân valabile.',
    example: '2,5 · 10 = 25. 1,4 · 0,2: fără virgulă, 14 · 2 = 28. Împreună sunt două zecimale, deci 0,28. 0,3 · 100 = 30.',
    practice: '1. Calculează 2,5 · 10. 2. Calculează 1,4 · 0,2. 3. Calculează 0,3 · 100.\n\nRăspunsuri: 25. 0,28. 30.',
    mistakes: 'Nu aduna zecimalele factorilor la numărătorul fracției și să uiți să le numeri în produs. Nu muta virgula la stânga când înmulțești cu 10.',
    tryThis: 'Calculează 0,4 · 0,4 și (0,4)^2. Spune câte zecimale are produsul și de ce.',
    recap: 'Cu o putere a lui 10, virgula se mută la dreapta. La alți factori, înmulțești fără virgulă și pui înapoi atâtea zecimale cât au factorii la un loc.'
  }),

  lesson('impartire-media', 'Împărțirea cu rezultat zecimal și media', {
    figure: 'bar-sum',
    formulas: ['Media = suma : numărul termenilor'],
    theory: 'Împărțirea a două numere naturale are mereu sens dacă împărțitorul nu este 0. Dacă deîmpărțitul se împarte exact, câtul este număr natural. Dacă nu, după cifra unităților pui virgula la cât și cobori câte un 0, până obții zecimalele de care ai nevoie.\n\nOrice număr natural se poate scrie cu zerouri după virgulă: 7 = 7,0. Ele nu schimbă valoarea, dar te ajută să continui împărțirea.\n\nMedia aritmetică a două sau mai multe numere este suma lor împărțită la câte sunt. Pentru n numere, cu n cel puțin 2, media este (a1 + a2 + … + an) : n. Media poate ieși număr natural sau zecimală.\n\nDacă știi media și câți termeni sunt, suma este media înmulțită cu numărul termenilor.',
    example: '13 : 4 = 3,25, pentru că 13 = 4 · 3 + 1, apoi 10 : 4 dă încă 2, și 20 : 4 dă 5. Media lui 6, 8 și 10 este (6 + 8 + 10) : 3 = 24 : 3 = 8. Media lui 3 și 8 este 11 : 2 = 5,5.',
    practice: '1. Calculează 13 : 4. 2. Media numerelor 6, 8 și 10. 3. Media numerelor 3 și 8.\n\nRăspunsuri: 3,25. 8. 5,5.',
    mistakes: 'Nu împărți suma la 2 dacă ai trei numere. Nu opri împărțirea la rest și să spui că rezultatul este doar câtul întreg, când ți se cere zecimala. Nu împărți la 0.',
    tryThis: 'Alege trei note între 1 și 10. Adună-le, împarte la 3 și spune dacă media este întreg sau zecimală. Verifică suma: media înmulțită cu 3.',
    recap: 'Dacă împărțirea nu este exactă, pui virgula și cobori zerouri. Media este suma împărțită la numărul termenilor. Din medie recuperezi suma înmulțind înapoi.'
  }),

  lesson('periodicitate', 'De la fracție ordinară la zecimală periodică', {
    formulas: ['Doar 2 și 5 la numitor: zecimală finită', 'Nici 2, nici 5: perioadă simplă'],
    theory: 'Orice fracție ordinară se poate scrie ca zecimală împărțind numărătorul la numitor. Uneori împărțirea se termină. Alteori un grup de cifre se repetă la nesfârșit. Grupul se numește perioadă.\n\nDacă perioada începe imediat după virgulă, zecimala este periodică simplă. O scrii cu perioada în paranteză: 0,121212… = 0,(12), citit zero virgulă perioadă doisprezece. Dacă între virgulă și perioadă mai sunt cifre, zecimala este periodică mixtă: 19,0351212… = 19,035(12).\n\nPerioada nu se scrie (9).\n\nLa o fracție ireductibilă, felul zecimalei se vede din numitor. Dacă numitorul are doar factori primi 2 sau 5, zecimala este finită. Dacă nu se împarte nici la 2, nici la 5, zecimala este periodică simplă. Dacă se împarte la 2 sau la 5 și mai are și un alt factor prim, zecimala este periodică mixtă.\n\nContinui împărțirea până vezi tot grupul care se repetă.',
    example: '3/4 = 0,75, pentru că 4 = 2·2. 2/3 = 0,666… = 0,(6). 1/6 = 0,1666… = 0,1(6), pentru că 6 = 2·3.',
    practice: '1. 3/4 dă zecimală finită sau periodică? Scrie-o. 2. Scrie 2/3 cu perioadă. 3. Scrie 1/6 și spune dacă perioada este simplă sau mixtă.\n\nRăspunsuri: finită, 0,75. 0,(6). 0,1(6), mixtă.',
    mistakes: 'Nu pune paranteza în jurul tuturor cifrelor dacă unele nu se repetă. La 0,1(6), 1 nu este în perioadă. Nu spune că 1/3 = 0,3. Este 0,(3).',
    tryThis: 'Împarte 1 la 3 pe caiet până vezi că restul se repetă. Scrie 0,(3). Apoi fă la fel cu 1 împărțit la 6 și încercuiește doar cifra care se repetă.',
    recap: 'Împărțirea dă zecimala. Finită, când la numitor rămân doar 2 și 5. Periodică simplă, când nu apare nici 2, nici 5. Mixtă, când apar și 2 sau 5, și un alt prim. Perioada stă în paranteză.'
  }),

  lesson('impartire-zecimale', 'Împărțirea a două zecimale', {
    formulas: ['Împărțirea la 10 mută virgula la stânga', 'Înmulțești ambii termeni cu aceeași putere a lui 10'],
    theory: 'Împărțirea unei zecimale la 10, 100 sau 1000 mută virgula spre stânga peste atâtea cifre cât este exponentul. Dacă nu ajung cifrele, pui zerouri în față: 9,5 : 100 = 0,095.\n\nÎmpărțirea unei zecimale la un număr natural nenul seamănă cu împărțirea numerelor naturale. Pui virgula la cât chiar când urmează să cobori cifra zecimilor.\n\nCa să împarți două zecimale, înmulțești și deîmpărțitul, și împărțitorul cu aceeași putere a lui 10. O alegi așa încât împărțitorul să devină număr natural. Câtul nu se schimbă. Apoi faci împărțirea nouă.\n\nNumărul zerourilor mutate este numărul zecimalelor semnificative ale împărțitorului, de la virgulă până la ultima zecimală nenulă.',
    example: '4,8 : 10 = 0,48. 6,3 : 3 = 2,1. 1,2 : 0,4 = 12 : 4 = 3, pentru că ai înmulțit ambele numere cu 10. Proba: 3 · 0,4 = 1,2.',
    practice: '1. Calculează 4,8 : 10. 2. Calculează 6,3 : 3. 3. Calculează 1,2 : 0,4.\n\nRăspunsuri: 0,48. 2,1. 3.',
    mistakes: 'Nu muta virgula doar la deîmpărțit. Trebuie mutată și la împărțitor, cu același număr de locuri. Nu muta virgula la dreapta când împarți la 10.',
    tryThis: 'Calculează 2,5 : 0,5 înmulțind ambele numere cu 10. Fă proba: câtul ori 0,5 trebuie să dea 2,5.',
    recap: 'La o putere a lui 10, virgula merge la stânga. La două zecimale, faci împărțitorul număr natural înmulțind ambele numere cu aceeași putere a lui 10. Câtul rămâne același.'
  }),

  lesson('zecimal-ordinar', 'De la zecimală la fracție ordinară', {
    formulas: ['Finită: cifrele peste 10^m', 'Periodică simplă: peste nouări'],
    theory: 'Orice fracție ordinară se scrie într-un singur fel ca zecimală finită, sau periodică simplă cu perioada diferită de (9), sau periodică mixtă cu perioada diferită de (9). De aceea poți și inversa drumul, ca să calculezi exact.\n\nLa o zecimală finită, numeri zecimalele. La numărător pui cifrele fără virgulă. La numitor pui 1 urmat de atâtea zerouri. Apoi simplifici.\n\nLa o periodică simplă, din numărul făcut cu întregul și cu perioada scazi întregul. La numitor pui atâtea cifre de 9 cât are perioada. 0,(3) = 3/9 = 1/3.\n\nLa o periodică mixtă, din numărul făcut cu toate cifrele scazi numărul făcut doar cu cifrele din afara perioadei. La numitor pui atâtea cifre de 9 cât are perioada, apoi atâtea zerouri cât are partea neperiodică de după virgulă.\n\nCu periodice este mai sigur să treci la fracții ordinare înainte de adunări lungi. Dacă rămâi la virgulă și tai perioada, obții doar o aproximare.',
    example: '0,25 = 25/100 = 1/4. 0,(2) = 2/9. 0,1(3) = (13 − 1)/90 = 12/90 = 2/15. Într-adevăr, 2/15 = 0,1333… = 0,1(3).',
    practice: '1. Transformă 0,25 în fracție ireductibilă. 2. Transformă 0,(2). 3. Transformă 0,1(3) în fracție ireductibilă.\n\nRăspunsuri: 1/4. 2/9. 2/15.',
    mistakes: 'Nu pune 0,(2) = 2/10. Numitorul perioadei simple este făcut din 9, nu din 0. Nu include cifra neperiodică în numărul pe care îl scazi greșit: la 0,1(3) scazi 1, nu 13.',
    tryThis: 'Scrie 0,(1) ca fracție, apoi amplific-o sau simplific-o până o recunoști. Verifică prin împărțirea numărătorului la numitor: trebuie să vezi din nou perioada.',
    recap: 'Zecimala finită are la numitor o putere a lui 10. Periodica simplă are la numitor nouări. Periodica mixtă are nouări și apoi zerouri. Simplifici la final.'
  }),

  lesson('rational', 'Numărul rațional pozitiv și ordinea operațiilor', {
    figure: 'fraction-line',
    formulas: ['Un rațional = o familie de fracții echivalente', 'Inversa lui x este 1/x, dacă x nu este 0'],
    theory: 'Toate fracțiile ordinare echivalente cu a/b, unde a și b sunt naturale nenule, formează numărul rațional pozitiv a/b. Fiecare fracție din familie este un reprezentant. Pe axă, toate stau în același punct. Scrierea unică ca fracție ireductibilă este reprezentantul cel mai scurt.\n\nNumerele naturale nenule sunt raționale pozitive, pentru că n = n/1. Fracțiile 0/b formează numărul rațional 0, care stă în origine.\n\nDouă raționale sunt egale exact atunci când reprezentanții lor sunt fracții echivalente.\n\nAcelași rațional se scrie și ca zecimală, într-un singur fel: finită, periodică simplă cu perioada diferită de (9), sau periodică mixtă cu perioada diferită de (9). 2/5 = 0,4. 7/3 = 2,(3).\n\nOperațiile cu fracții ordinare și cu zecimale sunt operații cu raționale. Înainte de calcul, alege o singură scriere. Periodicele se transformă în fracții ordinare dacă vrei rezultatul exact.\n\nOrdinea este cea de la numerele naturale. Fără paranteze, întâi puterea, apoi înmulțirea și împărțirea de la stânga la dreapta, apoi adunarea și scăderea. Cu paranteze, începi cu cele rotunde, din interior. Adunarea și înmulțirea sunt asociative și comutative. 0 este neutru la adunare. 1 este neutru la înmulțire. Înmulțirea se distribuie față de adunare și față de scădere. Orice rațional pozitiv x are inversa 1/x. 0 nu are inversă.',
    example: '1/2, 2/4 și 0,5 sunt același rațional, în mijlocul segmentului de la 0 la 1. 1/2 + 1/4 · 2 = 1/2 + 1/2 = 1. Cu paranteză, (1/2 + 1/4) · 2 = 3/2.',
    practice: '1. Sunt 2/4 și 1/2 același rațional? 2. Este 0 un număr rațional? 3. Calculează 1/2 + 1/4 · 2.\n\nRăspunsuri: da. Da, este 0/b. 1.',
    mistakes: 'Nu spune că orice rațional este natural. 1/2 nu este natural. Nu calcula o periodică tăind-o după două cifre și să numești rezultatul exact. Nu căuta inversa lui 0.',
    tryThis: 'Scrie trei reprezentanți ai aceluiași rațional: o fracție ireductibilă, o fracție amplificată și o zecimală. Marchează punctul lor, o singură dată, pe axă.',
    recap: 'Un rațional pozitiv este familia fracțiilor echivalente, cu un reprezentant ireductibil și un punct pe axă. 0 este rațional. Ordinea operațiilor rămâne cea cunoscută. Inversa există pentru orice rațional diferit de 0.'
  }),

  lesson('metode-unitati', 'Metode cu fracții și unități de măsură', {
    figure: 'segments',
    formulas: ['1 kg = 1000 g', '1 km = 1000 m', '1 l = 1000 ml'],
    theory: 'Metodele de la numerele naturale merg și când datele sunt raționale pozitive. Întâi spui ce știi și ce trebuie să afli. Apoi vezi cum depind mărimile, alegi metoda, scrii datele scurt și abia după aceea calculezi.\n\nNoutatea este calculul cu fracții sau cu zecimale și trecerea dintre unități. 1 kg = 1000 g, 1 km = 1000 m, 1 m = 100 cm, 1 l = 1000 ml. Treci totul în aceeași unitate înainte de operație.\n\nReducerea la unitate află valoarea pentru 1, apoi pentru cât ți se cere. Comparația scoate diferența dintre două situații. Metoda figurativă desenează segmente. Mersul invers desface operațiile de la rezultat spre început. Falsa ipoteză presupune un caz simplu, măsoară diferența și o împarte la cât de mult se schimbă un singur obiect.',
    example: '400 g de miere costă 6 lei. 400 g = 0,4 kg. Un kilogram costă 6 : 0,4 = 15 lei. Atunci 1,2 kg costă 15 · 1,2 = 18 lei. Asta este reducere la unitate, după ce unitățile sunt la fel.',
    practice: '1. Câți kilogrami sunt 250 g? 2. Dacă 250 g costă 4 lei, cât costă 1 kg? 3. Cât costă atunci 1,5 kg?\n\nRăspunsuri: 0,25 kg. 16 lei. 24 lei.',
    mistakes: 'Nu aduna 1,2 km cu 250 m înainte să treci în aceeași unitate. Nu folosi comparația când ai o singură situație: acolo este reducere la unitate. Nu uita să verifici rezultatul în enunț.',
    tryThis: 'Scrie o problemă scurtă cu două prețuri și aceleași feluri de lucruri. Rezolv-o prin comparație. Apoi scrie una cu un drum măsurat și în kilometri, și în metri, și rezolv-o prin mers invers.',
    recap: 'Aceleași metode: reducere la unitate, comparație, desen, mers invers, falsă ipoteză. Înainte de calcul, unitățile trebuie să fie aceleași. Operațiile se fac cu fracții sau cu zecimale.'
  }),

  lesson('recap-zecimale', 'Recapitulare: fracții zecimale', {
    theory: 'Zecimala finită este o fracție cu numitor o putere a lui 10. O compari, o aproximezi și o pui pe axă. O aduni și o scazi cu virgula aliniată. O înmulțești numărând zecimalele. O împarți după ce faci împărțitorul comod. Media este un caz de împărțire.\n\nFracția ordinară poate da zecimală finită sau periodică. Drumul înapoi, de la periodică la fracție, îți dă rezultatul exact. Toate aceste scrieri sunt reprezentanți ai numerelor raționale pozitive. La probleme, metodele vechi merg mai departe dacă unitățile sunt aceleași.\n\nEști gata dacă spui ordinul unei cifre, dacă alegi lipsa sau adaosul, dacă știi când perioada este simplă și când este mixtă și dacă nu amesteci metrii cu centimetrii.',
    example: '0,5 = 1/2 este un rațional. 1/3 = 0,(3). 1/6 = 0,1(6). Media lui 2 și 5 este 3,5. 3,5 lei pentru 0,5 kg înseamnă 7 lei pentru 1 kg.',
    practice: '1. Scrie 1/4 ca zecimală. 2. Scrie 0,(4) ca fracție. 3. Media numerelor 2 și 6.\n\nRăspunsuri: 0,25. 4/9. 4.',
    mistakes: 'Nu trata virgula ca pe un punct decorativ. Nu numi periodice toate zecimalele. 0,25 se termină. Nu calcula media împărțind la un număr ales de tine.',
    tryThis: 'Fă o fișă cu patru rânduri: o scriere zecimală, o comparație, o medie și o transformare în fracție. La fiecare rând scrie regula folosită.',
    recap: 'Zecimala, perioada, media și raționalul închid scrierea numerelor. Aceeași valoare poate sta ca fracție, ca virgulă sau ca punct pe axă. Urmează organizarea unui set de date.'
  }),

  lesson('frecventa', 'Tabelul de frecvențe', {
    formulas: ['Frecvența = de câte ori apare valoarea', 'Valorile numerice se ordonează crescător'],
    theory: 'Uneori strângi date despre un grup: notele unei clase, limba aleasă, înălțimea. Trăsătura pe care o urmărești se numește caracteristică sau variabilă. Persoanele sau obiectele alese formează un eșantion. Ce poate lua variabila se numește valoare. Valorile pot fi numere, ca notele, sau însușiri, ca numele unei limbi.\n\nDatele se așază în ordine. La numere, de obicei crescător. La însușiri, alegi tu o ordine și o ții.\n\nFrecvența unei valori este de câte ori apare ea. Tabelul de frecvențe are pe primul rând valorile, iar pe al doilea frecvențele. Cu el răspunzi repede: aduni frecvențele valorilor care te interesează, fără să numeri din nou lista lungă.\n\nPoți afla câți sunt peste un prag, câți sunt sub un prag și care valoare apare cel mai des.',
    example: 'Notele sunt 5, 7, 8, 8, 8, 9, 9, 10. În ordine, sunt deja crescătoare. Frecvențele: 5 apare o dată, 7 o dată, 8 de trei ori, 9 de două ori, 10 o dată. Sunt 8 note. Peste 8 sunt notele 9 și 10, deci 2 + 1 = 3 elevi. Cel mai des apare 8.',
    practice: '1. În exemplul de mai sus, care este frecvența notei 9? 2. Câți elevi au notă mai mică decât 8? 3. Care valoare are frecvența cea mai mare?\n\nRăspunsuri: 2. 2. Nota 8.',
    mistakes: 'Nu lăsa lista amestecată când construiești tabelul: ordoneaz-o întâi. Nu confunda valoarea cu frecvența. 8 este nota. 3 este de câte ori apare. Nu aduna notele ca să afli câți elevi: aduni frecvențele.',
    tryThis: 'Notează într-un tabel ce fruct preferă opt colegi, cu trei fructe la alegere. Fă tabelul de frecvențe și spune care fruct apare cel mai des. Nu calcula o medie: fructul nu este un număr.',
    recap: 'Variabila este trăsătura studiată. Frecvența spune de câte ori apare o valoare. Tabelul are valorile și, sub ele, frecvențele. Întrebările despre „câți” se rezolvă adunând frecvențe.'
  }),

  lesson('grafice-media', 'Grafice și media unui set de date', {
    figure: 'frequency-bars',
    formulas: ['Bara are înălțimea frecvenței', 'Media = suma valorilor : numărul lor', 'Media se scrie, de regulă, cu două zecimale'],
    theory: 'Tabelul de frecvențe se poate desena. Iei două semidrepte cu aceeași origine: Ox pe orizontală și Oy pe verticală.\n\nLa barele verticale, pe Ox pui valorile, iar pe Oy pui frecvențele. Fiecare bară pornește de pe axă și urcă până la frecvența valorii. La barele orizontale, valorile stau pe Oy, iar lungimea barei este frecvența.\n\nLa diagrama cu linii, pentru fiecare valoare marchezi punctul la înălțimea frecvenței, apoi unești punctele printr-o linie frântă.\n\nMedia unui set de date numerice este media aritmetică a tuturor valorilor. Aduni valorile și împarți la câți sunt. Poți folosi și tabelul: fiecare valoare se înmulțește cu frecvența ei, aduni produsele și împarți la numărul total. De regulă, scrii media cu două zecimale exacte. Poți estima întâi, uitându-te unde se înghesuie datele, apoi compari estimarea cu calculul.\n\nDacă valorile nu sunt numere, nu există medie. Nu faci media unor culori sau a unor limbi.',
    example: 'La notele 5, 7, 8, 8, 8, 9, 9, 10, suma este 64, iar media este 64 : 8 = 8. Cu frecvențe: 5 · 1 + 7 · 1 + 8 · 3 + 9 · 2 + 10 · 1 = 64, apoi 64 : 8 = 8. Bara cea mai înaltă este la nota 8. O estimare „pe lângă 8” se potrivește cu calculul.',
    practice: '1. Media numerelor 4, 6 și 8. 2. Dacă valoarea 6 apare de 2 ori și valoarea 10 apare o dată, câți sunt în total? 3. Poți calcula media culorilor preferate?\n\nRăspunsuri: 6. 3. Nu.',
    mistakes: 'Nu împărți suma la o frecvență oarecare. Împarți la numărul tuturor datelor, adică la suma frecvențelor. Nu citi bara ca pe valoarea însăși: înălțimea este frecvența. Nu calcula media când variabila nu este numerică.',
    tryThis: 'Alege șase note ale tale, fă tabelul de frecvențe și graficul cu bare. Estimează media, apoi calculeaz-o. Scrie dacă estimarea a fost aproape.',
    recap: 'Barele și linia frântă arată frecvențele. Media numerică este suma împărțită la câți sunt, de regulă cu două zecimale. Fără numere nu există medie.'
  }),

  lesson('recap-date', 'Recapitulare: organizarea datelor', {
    figure: 'frequency-bars',
    formulas: ['Frecvența numără aparițiile', 'Media = suma : efectiv'],
    theory: 'Un set de date se ordonează, apoi se strânge într-un tabel de frecvențe. Din tabel afli câți sunt peste un prag și care valoare apare cel mai des.\n\nGraficul cu bare sau cu linii face același lucru vizibil. Media se calculează doar pentru valori numerice. Capitolul fracțiilor se închide aici: scrierea, operațiile, raționalul și, la urmă, datele.',
    example: 'Valorile 3, 3, 5, 7 au frecvențele 2, 1 și 1. Suma este 18. Media este 18 : 4 = 4,5. Bara lui 3 este cea mai înaltă.',
    practice: '1. Frecvența lui 3 în lista 3, 3, 5, 7. 2. Media aceleiași liste. 3. Graficul cu bare pune pe înălțime valoarea sau frecvența?\n\nRăspunsuri: 2. 4,5. Frecvența.',
    mistakes: 'Nu uita o valoare cu frecvența 0 dacă tabelul trebuie să arate toate notele posibile. Nu împărți media la numărul de coloane ale tabelului, ci la suma frecvențelor.',
    tryThis: 'Fă o fișă cu un tabel de patru valori, barele lor și media, dacă valorile sunt numere. Scrie într-o propoziție ce ai aflat.',
    recap: 'Ordonezi, numeri frecvențele, desenezi bare sau o linie și, la numere, calculezi media. Asta închide organizarea datelor din capitolul fracțiilor.'
  })
];

module.exports = { FRACTII_LESSONS };
