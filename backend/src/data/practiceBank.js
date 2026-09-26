// Întrebări de teorie, cuvintele noastre, după programa 5–8.
// Nu copiem manuale. Fiecare item are un „point” ca să știm ce idee din
// capitol a fost atinsă. Variantele (id diferit, același point) țin testele
// nelimitate după ce materia e acoperită.

function item(id, point, question, options, correct, explain) {
  return { id, point, question, options, correct, explain };
}

const BANK = {
  'matematica:5:naturale': [
    item('m5n1', 'citire', 'Ce înseamnă să compari două numere naturale?', ['Să vezi care e mai mare, fără să le aduni', 'Să le înmulțești mereu', 'Să le transformi în fracții', 'Să le rotunjești la zeci'], 0, 'Compararea spune doar care e mai mare sau dacă sunt egale.'),
    item('m5n2', 'puteri', 'O putere de tipul 3⁴ înseamnă…', ['3 înmulțit cu el însuși de 4 ori', '3 plus 4', '34', '3 × 4'], 0, 'Exponentul spune de câte ori se înmulțește baza cu ea însăși.'),
    item('m5n3', 'paranteze', 'De ce folosim paranteze într-un calcul?', ['Ca să arătăm ce se face primul', 'Ca să înfrumusețăm exercițiul', 'Ca să înlocuim plusul', 'Ca să evităm înmulțirea'], 0, 'Parantezele schimbă ordinea: întâi interiorul.'),
    item('m5n4', 'div2', 'Un număr natural se împarte exact la 2 dacă…', ['ultima cifră e pară', 'suma cifrelor e 9', 'se termină cu 5', 'are 3 cifre'], 0, 'Par = 0, 2, 4, 6 sau 8 la final.'),
    item('m5n5', 'div3', 'Regula de divizibilitate cu 3 privește…', ['suma cifrelor', 'doar ultima cifră', 'doar prima cifră', 'numărul de cifre'], 0, 'Dacă suma cifrelor se împarte la 3, numărul se împarte la 3.'),
    item('m5n6', 'prime', 'Un număr prim…', ['are exact doi divizori: 1 și el însuși', 'se împarte la orice număr', 'e mereu par', 'e mai mare decât 100'], 0, '2, 3, 5, 7 sunt prime. 1 nu e prim.'),
    item('m5n7', 'compuse', 'Un număr compus…', ['are și alți divizori în afară de 1 și el', 'nu se poate înmulți', 'e doar 0', 'e mereu impar'], 0, '4, 6, 8, 9, 15 sunt compuse.')
  ],
  'matematica:5:fractii': [
    item('m5f1', 'parte', 'O fracție arată…', ['câte părți egale luăm dintr-un întreg', 'doar un număr mai mic decât 1', 'o temperatură', 'un unghi'], 0, 'Numitorul taie întregul; numărătorul spune câte felii luăm.'),
    item('m5f2', 'amplif', 'Amplificarea unei fracții înseamnă…', ['înmulțim numărătorul și numitorul cu același număr', 'adunăm 1 la ambele', 'schimbăm semnul', 'tăiem numitorul'], 0, 'Valoarea rămâne aceeași, doar scrierea se schimbă.'),
    item('m5f3', 'simplif', 'Simplifici o fracție când…', ['împarți sus și jos prin același număr', 'ștergi numitorul', 'aduni numărătorul la numitor', 'înmulțești doar sus'], 0, 'Cauți un divizor comun și „strângi” fracția.'),
    item('m5f4', 'numitor', 'Ca să aduni 1/3 cu 1/6 trebuie…', ['același numitor', 'același numărător', 'să le înmulțești', 'să le faci zecimale obligatoriu'], 0, 'Părțile trebuie să fie de aceeași mărime.'),
    item('m5f5', 'procent', 'Un procent înseamnă…', ['părți din o sută', 'părți din zece', 'un număr prim', 'o putere'], 0, '25% = 25 din 100 = 1/4.'),
    item('m5f6', 'zecimal', 'O zecimală e…', ['aceeași idee ca fracția, scrisă cu virgulă', 'un număr fără valoare', 'doar pentru bani', 'opusul unui procent'], 0, '0,5 și 1/2 spun același lucru.'),
    item('m5f7', 'media', 'Media aritmetică a două note e…', ['suma lor împărțită la 2', 'produsul lor', 'nota cea mai mare', 'diferența lor'], 0, 'Aduni, apoi împarți la câți termeni ai.')
  ],
  'matematica:5:geometrie': [
    item('m5g1', 'punct', 'Un punct, în geometria de clasa a V-a, e…', ['o poziție, fără lungime', 'o linie infinită', 'o suprafață', 'un cub'], 0, 'Punctul doar arată „unde”.'),
    item('m5g2', 'unghi', 'Un unghi drept măsoară…', ['90 de grade', '45 de grade', '180 de grade', '360 de grade'], 0, 'Colțul unui pătrat e un unghi drept.'),
    item('m5g3', 'ascutit', 'Un unghi ascuțit e…', ['mai mic decât 90°', 'exact 90°', 'mai mare decât 90°', 'doar 0°'], 0, 'Ascuțit = sub un unghi drept.'),
    item('m5g4', 'perimetru', 'Perimetrul unei figuri e…', ['suma lungimilor laturilor', 'spațiul din interior', 'o diagonală', 'un unghi'], 0, 'Este lungimea conturului.'),
    item('m5g5', 'arie-drep', 'Aria dreptunghiului se gândește ca…', ['lungime × lățime', 'suma laturilor', 'doar lungimea', 'volumul cutiei'], 0, 'Câte pătrate unitate acoperă suprafața.'),
    item('m5g6', 'volum-cub', 'Volumul cubului e…', ['latură × latură × latură', '4 × latură', 'suma muchiilor', 'doar o față'], 0, 'Câte cuburi unitate umplu corpul.'),
    item('m5g7', 'unitati', 'Când treci de la metri la centimetri…', ['înmulțești cu 100', 'împarți cu 100', 'aduni 100', 'nu schimbi nimic'], 0, '1 m = 100 cm. Nu amesteca unitățile în același calcul.'),
    item('m5g8', 'mijloc', 'Mijlocul unui segment…', ['stă pe segment și este la fel de departe de capete', 'este orice punct la egală distanță, chiar în afara dreptei', 'este un capăt', 'taie unghiul în două'], 0, 'M este pe AB și AM = MB.')
  ],
  'matematica:6:multimi': [
    item('m6m1', 'apartine', '„x aparține mulțimii A” înseamnă…', ['x e un element din A', 'A e mai mare decât x', 'x e în afara lui A', 'A e vidă'], 0, 'Simbolul ∈ spune „face parte din”.'),
    item('m6m2', 'reuniune', 'Reuniunea a două mulțimi conține…', ['elementele care sunt în cel puțin una', 'doar ce e comun', 'doar ce lipsește', 'numerele prime'], 0, 'Strângi tot, fără să numeri de două ori același element.'),
    item('m6m3', 'intersectie', 'Intersecția e…', ['ce au cele două mulțimi în comun', 'tot ce e în ambele luate separat', 'mulțimea vidă mereu', 'un număr'], 0, 'Doar oaspeții invitați la ambele petreceri.'),
    item('m6m4', 'factori', 'Descompunerea în factori primi…', ['scrii numărul ca produs de numere prime', 'aduni cifrele', 'îl faci par', 'îl rotunjești'], 0, '12 = 2 × 2 × 3.'),
    item('m6m5', 'cmmdc', 'c.m.m.d.c. e…', ['cel mai mare număr care împarte pe amândoi', 'cel mai mic multiplu comun', 'suma lor', 'produsul lor'], 0, 'Cel mai mare „prieten comun” la împărțire.'),
    item('m6m6', 'cmmmc', 'c.m.m.m.c. e…', ['cel mai mic număr care se împarte la amândoi', 'cel mai mare divizor', 'diferența lor', 'un număr prim'], 0, 'Prima stație comună pe axa multiplilor.')
  ],
  'matematica:6:proportii': [
    item('m6p1', 'raport', 'Un raport compară…', ['două mărimi printr-o împărțire', 'doar unghiuri', 'doar mulțimi', 'trei numere obligatoriu'], 0, '3 : 4 sau 3/4 spun „cât dintr-una față de cealaltă”.'),
    item('m6p2', 'direct', 'Mărimi direct proporționale…', ['cresc sau scad împreună, în același ritm', 'una crește când cealaltă scade', 'nu se leagă deloc', 'sunt mereu egale'], 0, 'Dublu preț, dublu cantitate dacă prețul e fix pe bucată.'),
    item('m6p3', 'invers', 'Mărimi invers proporționale…', ['una crește când cealaltă scade, produsul rămâne cam același', 'cresc mereu împreună', 'sunt unghiuri', 'sunt fracții improprii'], 0, 'Mai mulți lucrători, mai puțin timp pentru aceeași treabă.'),
    item('m6p4', 'regula3', 'Regula de trei e…', ['o proporție cu un loc gol', 'o înmulțire de trei numere oarecare', 'o teoremă de geometrie', 'o medie'], 0, 'Trei valori știute, a patra se află din „la fel de multe ori”.'),
    item('m6p5', 'procent6', 'Procentul, la rapoarte, e tot…', ['o parte din 100', 'un unghi', 'un prim', 'un volum'], 0, 'Poți trece de la raport la procent când întregul e 100.'),
    item('m6p6', 'scara', 'O scară 1:100 pe o hartă înseamnă…', ['1 cm pe hartă e 100 cm în realitate (sau unitatea aleasă)', 'harta e de 100 de ori mai mare', 'sunt 100 de orașe', 'e un procent de 1%'], 0, 'Scara e un raport între desen și real.')
  ],
  'matematica:6:intregi-rationale': [
    item('m6i1', 'semn', 'Minusul la numere întregi arată…', ['direcția pe axă, nu „un număr urât”', 'că numărul e fracție', 'că e prim', 'că e volum'], 0, '−3 e trei pași în stânga lui zero, ca −3 grade.'),
    item('m6i2', 'modul', 'Modulul unui număr e…', ['distanța până la zero, deci mereu pozitivă', 'opusul lui', 'jumătatea lui', 'un unghi'], 0, '|−5| = 5.'),
    item('m6i3', 'adunare', 'Când aduni un negativ, de fapt…', ['te muți spre stânga pe axă', 'înmulțești', 'ștergi semnul', 'faci o putere'], 0, '5 + (−2) = 3.'),
    item('m6i4', 'rationale', 'Un număr rațional se poate scrie…', ['ca o fracție de întregi (numitor ≠ 0)', 'doar ca radical', 'doar ca procent', 'doar ca volum'], 0, '−3/4, 0,7, 5 sunt raționale.'),
    item('m6i5', 'ecuatie', 'O ecuație de tipul x + 5 = 12 întreabă…', ['ce număr plus 5 face 12', 'cât e 5 × 12', 'dacă 12 e prim', 'perimetrul'], 0, 'Scazi 5 din ambele părți: x = 7.'),
    item('m6i6', 'verificare', 'După ce găsești x, ce faci?', ['Îl pui înapoi în enunț să vezi dacă iese', 'Îl ștergi', 'Îl înmulțești cu 10', 'Îl faci procent'], 0, 'Verificarea e parte din treabă, nu opțională.')
  ],
  'matematica:6:triunghi': [
    item('m6t1', 'opuse', 'Unghiurile opuse la vârf…', ['sunt egale', 'sunt suplementare mereu', 'sunt 90°', 'nu există'], 0, 'Se formează când două drepte se taie: cele „față în față” coincid.'),
    item('m6t2', 'paralele', 'Două drepte paralele tăiate de o secantă…', ['produc unghiuri corespunzătoare egale', 'se întâlnesc obligatoriu', 'formează un cub', 'anulează unghiurile'], 0, 'Paralelele „păstrează” aceleași unghiuri cu tăietura.'),
    item('m6t3', 'cerc', 'Diametrul unui cerc e…', ['de două ori raza, trece prin centru', 'jumătate din rază', 'o coardă oarecare', 'perimetrul'], 0, 'Rază = de la centru la cerc; diametru = 2 raze în linie.'),
    item('m6t4', 'suma180', 'Suma unghiurilor unui triunghi e…', ['180°', '90°', '360°', '60°'], 0, 'Oricâte forme ar avea, cele trei colțuri fac un unghi alungit.'),
    item('m6t5', 'clasif', 'Un triunghi dreptunghic are…', ['un unghi de 90°', 'toate unghiurile obtuze', 'laturi paralele', 'un cerc înscris obligatoriu de rază 1'], 0, 'Un colț drept; celelalte două sunt ascuțite.'),
    item('m6t6', 'pitagora', 'Pitagora, la acest nivel, e mai ales…', ['o verificare pe triplete: a² + b² = c² pe ipotenuză', 'o regulă de trei', 'o medie', 'o fracție'], 0, 'Ipotenuza e latura din fața unghiului drept.'),
    item('m6t7', 'congr', 'Triunghiuri congruente…', ['au aceeași formă și aceleași mărimi', 'doar aceeași arie, formă diferită', 'sunt cercuri', 'au un singur unghi egal'], 0, 'Se potrivesc perfect dacă le suprapui.')
  ],
  'matematica:7:reale': [
    item('m7r1', 'radical', 'Rădăcina pătrată „desface”…', ['un pătrat: ce număr, înmulțit cu el, dă n', 'o împărțire la 2', 'un procent', 'un unghi'], 0, '√9 = 3 pentru că 3 × 3 = 9.'),
    item('m7r2', 'irațional', 'Un irațional…', ['nu se scrie frumos ca fracție de întregi', 'e mereu negativ', 'e un unghi', 'e 0'], 0, '√2 nu e o fracție exactă, dar e un punct pe axă.'),
    item('m7r3', 'reale', 'Mulțimea numerelor reale cuprinde…', ['raționale și iraționale, pe aceeași axă', 'doar naturale', 'doar procente', 'doar volume'], 0, 'Tot ce poți arăta pe o dreaptă continuă.'),
    item('m7r4', 'rationaliz', 'Raționalizarea unui numitor simplu înseamnă…', ['scapi de radicalul de la numitor, înmulțind sus și jos potrivit', 'ștergi numitorul', 'faci procent', 'aduni 1'], 0, 'Valoarea rămâne, scrierea se liniștește.'),
    item('m7r5', 'medii', 'O medie (aritmetică, geometrică, la nivelul vostru)…', ['rezumă mai multe numere într-unul', 'e un unghi', 'e un prim', 'e un cub'], 0, 'Spune „cam pe unde stau” valorile, nu fiecare în parte.'),
    item('m7r6', 'ordin', 'Pe axă, √2 stă…', ['între 1 și 2', 'înainte de 0', 'după 10', 'pe 4'], 0, '1,4… e puțin peste 1,4, deci între 1 și 2.')
  ],
  'matematica:7:ecuati': [
    item('m7e1', 'cantar', 'O ecuație e ca un cântar: …', ['ce faci într-o parte faci și în cealaltă', 'poți schimba doar stânga', 'ștergi necunoscuta', 'înmulțești doar cu zero'], 0, 'Egalitatea trebuie să rămână adevărată.'),
    item('m7e2', 'sistem', 'Un sistem de două ecuații…', ['are aceleași necunoscute în două relații', 'e o singură fracție', 'e un triunghi', 'e un procent'], 0, 'Două indicii despre aceiași x și y.'),
    item('m7e3', 'substituie', 'Metoda substituției înseamnă…', ['afli o necunoscută dintr-o ecuație și o pui în cealaltă', 'aduni cifrele', 'faci media', 'desenezi un cub'], 0, 'Înlocuiești, nu ghicești.'),
    item('m7e4', 'reducere', 'Reducerea (adunarea) la sisteme…', ['aduni/scazi ecuațiile ca să dispară o necunoscută', 'ștergi o ecuație', 'faci radical', 'calculezi un volum'], 0, 'Pregătești coeficienții ca unul să se anuleze.'),
    item('m7e5', 'solutie', 'O soluție a sistemului…', ['potrivește în ambele ecuații', 'potrivește doar în una', 'e un unghi', 'e mereu 0'], 0, 'Verifici perechea (x, y) în ambele.'),
    item('m7e6', 'enunt', 'După calcul, te întorci la…', ['enunțul real: ce însemnau x și y', 'doar radical', 'doar procent', 'volumul sferei'], 0, 'Matematica slujește povestea problemei.')
  ],
  'matematica:7:date': [
    item('m7d1', 'pereche', 'O pereche (x, y) pe axe e…', ['un punct în plan', 'o fracție', 'un unghi', 'un volum'], 0, 'x spune stânga-dreapta, y sus-jos.'),
    item('m7d2', 'tabel', 'Un tabel de valori arată…', ['cum se leagă două mărimi, pas cu pas', 'doar un număr', 'un cub', 'o poezie'], 0, 'Fiecare linie e o pereche.'),
    item('m7d3', 'grafic', 'Un grafic, la date, e…', ['desenul dependenței, nu „niște linii frumoase”', 'un procent', 'un prim', 'un dicționar'], 0, 'Citești: când x crește, ce face y?'),
    item('m7d4', 'depend', 'O dependență, la acest nivel, înseamnă…', ['o mărime se schimbă când se schimbă cealaltă', 'două mulțimi vide', 'un unghi drept', 'o sferă'], 0, 'Nu e coincidență: e o regulă.'),
    item('m7d5', 'origine', 'Originea axelor e…', ['punctul (0, 0)', 'punctul (1, 1)', 'infinitul', 'un cub'], 0, 'De acolo măsori ambele direcții.'),
    item('m7d6', 'citire', 'Ca să citești un punct de pe grafic…', ['cobori la x și te uiți la y', 'faci doar media', 'calculezi un volum', 'cauți un prim'], 0, 'Două citiri, o pereche.')
  ],
  'matematica:7:geo7': [
    item('m7g1', 'paralelogram', 'Într-un paralelogram…', ['laturile opuse sunt paralele (și, de obicei, egale)', 'există un singur unghi', 'toate unghiurile sunt 90° obligatoriu', 'nu există diagonale'], 0, 'Dreptunghiul, rombul, pătratul sunt cazuri speciale.'),
    item('m7g2', 'trapez', 'Un trapez are…', ['exact o pereche de laturi paralele', 'toate laturile paralele', 'zero laturi', 'doar unghiuri obtuze'], 0, 'Baza mare și baza mică sunt paralele.'),
    item('m7g3', 'cerc-in', 'Unghiul înscris în cerc „vede” un arc; față de unghiul la centru pe același arc e…', ['cam jumătate', 'dublu mereu invers', 'egal cu 180°', 'inexistent'], 0, 'Același arc, măsură diferită după unde stă vârful.'),
    item('m7g4', 'thales', 'Thales vorbește despre…', ['segmente proporționale pe drepte paralele tăiate de secante', 'volume de sfere', 'doar procente', 'numere prime'], 0, 'Paralelele taie „la fel de proporțional”.'),
    item('m7g5', 'asemanare', 'Triunghiuri asemenea au…', ['aceeași formă, altă scară; unghiuri egale, laturi proporționale', 'aceeași arie obligatoriu', 'un singur unghi', 'laturi paralele toate'], 0, 'Ca o fotografie mărită.'),
    item('m7g6', 'trig', 'Sinusul unui unghi ascuțit, în triunghi dreptunghic, e…', ['cateta opusă pe ipotenuză', 'suma catetelor', 'aria', 'perimetrul'], 0, 'Cosinus: alăturată pe ipotenuză. Tangentă: opusă pe alăturată.'),
    item('m7g7', 'cerc-arie', 'Aria discului se leagă de…', ['rază (și π)', 'doar de o coardă', 'de un cub', 'de un procent'], 0, 'π r² e „câte pătrățele” umple cercul.')
  ],
  'matematica:8:intervale': [
    item('m8i1', 'interval', 'Un interval e…', ['o bucată de axă, între două capete (cu sau fără ele)', 'un triunghi', 'un procent', 'un cub'], 0, 'Poate fi deschis, închis sau semideschis.'),
    item('m8i2', 'inecuatie', 'O inecuație întreabă…', ['pentru ce x rămâne adevărată o inegalitate', 'care e singurul x', 'cât e un unghi', 'volumul'], 0, 'Răspunsul e o mulțime, nu un punct.'),
    item('m8i3', 'semn', 'Când înmulțești o inecuație cu un negativ…', ['schimbi sensul inegalității', 'nu se întâmplă nimic', 'devine ecuație', 'dispar numerele'], 0, '−2 < −1, dar 2 > 1. Sensul se întoarce.'),
    item('m8i4', 'reuniune-int', 'Uneori soluția e o reuniune de intervale. Asta înseamnă…', ['x poate fi în mai multe bucăți de axă', 'x e un singur număr', 'nu există soluție', 'e un cub'], 0, '„Sau aici, sau acolo”.'),
    item('m8i5', 'intersect-int', 'Intersecția de intervale e…', ['porțiunea comună', 'totul lipit', 'axa întreagă', 'un prim'], 0, 'Trebuie să convină la toate condițiile.'),
    item('m8i6', 'desen', 'Cel mai sigur pas la inecuații e…', ['să desenezi axa și să hașurezi', 'să ghicești', 'să faci un procent', 'să calculezi un volum'], 0, 'Ochii văd ce uită algebra uneori.')
  ],
  'matematica:8:algebric': [
    item('m8a1', 'asemenea', 'Termeni asemenea au…', ['aceeași parte literară, pot fi adunați', 'doar același număr', 'unghiuri egale', 'volume egale'], 0, '3x² și 5x² se adună; 3x și 3x² nu.'),
    item('m8a2', 'patrat', '(a + b)² înseamnă…', ['a² + 2ab + b²', 'a² + b²', '2a + 2b', 'a² − b²'], 0, 'E un pătrat de binom, nu „pătratul fiecăruia separat” plus atât.'),
    item('m8a3', 'diferenta', 'a² − b² se descompune…', ['(a − b)(a + b)', '(a − b)²', 'a − b', '2ab'], 0, 'Diferență de pătrate: două paranteze prietene.'),
    item('m8a4', 'factor', 'Scoaterea factorului comun…', ['tragi în față ce e la toți termenii', 'ștergi un termen', 'faci radical', 'calculezi un unghi'], 0, '2x + 6 = 2(x + 3).'),
    item('m8a5', 'fractie-lit', 'O fracție algebrică se simplifică…', ['dacă sus și jos au un factor comun, după ce ai descompus', 'ștergând numitorul', 'adunând 1', 'făcând procent'], 0, 'Nu tai litere la întâmplare.'),
    item('m8a6', 'grad2', 'Ecuația de gradul II, cât cere gimnaziul, e…', ['o necunoscută la puterea a doua, cu formulă / descompunere, nu toată analiza de liceu', 'un sistem de 5 ecuații', 'doar geometrie', 'un procent'], 0, 'Căutăm valorile care o fac adevărată, apoi verificăm.')
  ],
  'matematica:8:functii': [
    item('m8f1', 'functie', 'O funcție leagă…', ['fiecare x permis de un singur f(x)', 'orice x de toate numerele', 'doar unghiuri', 'doar volume'], 0, 'O mașină: bagi x, iese un singur rezultat.'),
    item('m8f2', 'dreapta', 'f(x) = ax + b se citește din grafic ca…', ['o dreaptă: a e panta, b e unde taie axa y', 'un cerc', 'un cub', 'o poezie'], 0, 'a > 0 urcă; a < 0 coboară.'),
    item('m8f3', 'medie', 'Media unui set de date e…', ['suma valorilor împărțită la câți sunt', 'valoarea din mijloc mereu', 'cea mai frecventă', 'max − min'], 0, 'E „centrul de greutate” al numerelor.'),
    item('m8f4', 'mediana', 'Mediana unui set e…', ['valoarea din mijloc după ce ai ordonat', 'media', 'un unghi', 'un prim'], 0, 'Nu se sperie de un număr foarte mare la capăt.'),
    item('m8f5', 'modul-stat', 'Modulul (moda) e…', ['valoarea care apare cel mai des', 'media', 'max − min', 'un interval'], 0, '„Favoritea” setului.'),
    item('m8f6', 'amplitudine', 'Amplitudinea e…', ['cea mai mare minus cea mai mică', 'media', 'mediana', 'un procent'], 0, 'Cât de „întins” e setul.')
  ],
  'matematica:8:spatiu': [
    item('m8s1', 'plane', 'Un plan, în spațiu, e…', ['o „foaie” infinită, fără grosime', 'un punct', 'un cub gol', 'un procent'], 0, 'Masa e o bucată de plan.'),
    item('m8s2', 'paralel-sp', 'O dreaptă paralelă cu un plan…', ['nu-l înțeapă, rămâne la distanță constantă', 'trece mereu prin centru', 'e o rază', 'e un unghi'], 0, 'Ca un creion ținut deasupra mesei, fără s-o atingă.'),
    item('m8s3', 'prisma', 'O prismă are…', ['baze poligonale paralele și fețe laterale', 'doar un cerc', 'o singură față', 'doar un vârf'], 0, 'Cutia de pantofi e o prismă dreaptă.'),
    item('m8s4', 'piramida', 'O piramidă are…', ['o bază și fețe care se întâlnesc într-un vârf', 'două baze paralele', 'doar un cilindru', 'zero vârfuri'], 0, 'Cortul clasic e o piramidă.'),
    item('m8s5', 'cilindru', 'Cilindrul se gândește ca…', ['un cerc „tras” pe o înălțime', 'un triunghi', 'o fracție', 'un prim'], 0, 'Doza de suc: două capace și o bandă.'),
    item('m8s6', 'desfasurare', 'Aria unei corp e credibilă doar dacă…', ['vezi desfășurarea: ce fețe lipești', 'tocești formula fără desen', 'ignori înălțimea', 'folosești un procent'], 0, 'Volumul cere și „cât de înalt e teancul”.')
  ],
};

function chapterKey(subject, grade, chapterId) {
  return `${String(subject || '').toLowerCase()}:${String(grade || '')}:${String(chapterId || '')}`;
}

function listChapterQuestions(subject, grade, chapterId) {
  const key = chapterKey(subject, grade, chapterId);
  const list = BANK[key] ? BANK[key].slice() : [];
  return list.map((item, index) => ({
    ...item,
    level: item.level || index + 1
  }));
}

function listPoints(subject, grade, chapterId) {
  return [...new Set(listChapterQuestions(subject, grade, chapterId).map(q => q.point))];
}

function allChapterKeys() {
  return Object.keys(BANK);
}

function findQuestion(id) {
  const needle = String(id || '');
  if (needle.startsWith('g:')) {
    try {
      const { fromGeneratedId } = require('./itemGenerator');
      const generated = fromGeneratedId(needle);
      if (generated && generated.options) return generated;
    } catch {
      return null;
    }
  }
  for (const list of Object.values(BANK)) {
    const found = list.find(item => item.id === needle);
    if (found) return found;
  }
  return null;
}

module.exports = {
  BANK,
  chapterKey,
  listChapterQuestions,
  listPoints,
  allChapterKeys,
  findQuestion
};
