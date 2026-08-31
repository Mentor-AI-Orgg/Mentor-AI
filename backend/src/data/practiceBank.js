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
    item('m5g1', 'punct', 'Un punct, în geometria de clasa a V-a, e…', ['o locație, fără lungime', 'o linie infinită', 'o suprafață', 'un cub'], 0, 'Punctul doar arată „unde”.'),
    item('m5g2', 'unghi', 'Un unghi drept măsoară…', ['90 de grade', '45 de grade', '180 de grade', '360 de grade'], 0, 'Colțul unui pătrat e un unghi drept.'),
    item('m5g3', 'ascutit', 'Un unghi ascuțit e…', ['mai mic decât 90°', 'exact 90°', 'mai mare decât 90°', 'doar 0°'], 0, 'Ascuțit = îngust, sub un drept.'),
    item('m5g4', 'perimetru', 'Perimetrul unei figuri e…', ['suma lungimilor laturilor', 'spațiul din interior', 'o diagonală', 'un unghi'], 0, 'E „gardul” din jurul figurii.'),
    item('m5g5', 'arie-drep', 'Aria dreptunghiului se gândește ca…', ['lungime × lățime', 'suma laturilor', 'doar lungimea', 'volumul cutiei'], 0, 'Câte pătrățele de 1 cm încap înăuntru.'),
    item('m5g6', 'volum-cub', 'Volumul cubului e…', ['latură × latură × latură', '4 × latură', 'suma muchiilor', 'doar o față'], 0, 'Câte cubulețe umplu cutia.'),
    item('m5g7', 'unitati', 'Când treci de la metri la centimetri…', ['înmulțești cu 100', 'împarți cu 100', 'aduni 100', 'nu schimbi nimic'], 0, '1 m = 100 cm. Nu amesteca unitățile în același calcul.')
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
  'romana:5:oral': [
    item('r5o1', 'mesaj', 'Când asculți un mesaj, primul pas e…', ['să prinzi despre ce e vorba, nu fiecare vorbă', 'să-l întrerupi', 'să memorezi virgulele', 'să numeri cuvintele'], 0, 'Ideea principală e ancora.'),
    item('r5o2', 'povesti', 'O povestire orală bună are…', ['început, ce s-a întâmplat, sfârșit', 'doar adjective', 'doar date', 'doar întrebări'], 0, 'Ascultătorul trebuie să poată redesena scena.'),
    item('r5o3', 'intrebare', 'O întrebare clară…', ['spune ce vrei să afli, pe scurt', 'are 20 de rânduri', 'nu așteaptă răspuns', 'e o exclamație'], 0, 'Cine / ce / unde / de ce ajută.'),
    item('r5o4', 'ton', 'Tonul vocii tale…', ['schimbă mesajul la fel de mult ca vorbele', 'nu contează', 'e doar pentru teatru', 'înlocuiește subiectul'], 0, 'Același „da” poate fi bucurie sau plictiseală.'),
    item('r5o5', 'pauza', 'Pauza în vorbire e…', ['timp să se așeze ideea, nu gol', 'o greșeală', 'un semn de punctuație scris', 'un predicat'], 0, 'Respiri, apoi continui.'),
    item('r5o6', 'privire', 'Privirea către cel căruia îi vorbești…', ['arată că mesajul e pentru el', 'e interzisă', 'înlocuiește conținutul', 'e un atribut'], 0, 'Dialogul e între oameni, nu către perete.')
  ],
  'romana:5:lectura': [
    item('r5l1', 'idee', 'Ideea principală a unui text scurt e…', ['ce vrea textul să rămână, în o frază', 'ultimul cuvânt', 'numărul de rânduri', 'titlul copertat'], 0, 'Restul sunt detalii care o sprijină.'),
    item('r5l2', 'personaj', 'Personajul e…', ['cine face sau trăiește acțiunea', 'locul', 'timpul', 'semnul de punctuație'], 0, 'Poate fi om, animal, uneori un obiect „însuflețit”.'),
    item('r5l3', 'timp-loc', 'Timpul și locul…', ['ancorează povestea: când și unde', 'sunt predicate', 'sunt procente', 'nu apar în narațiune'], 0, 'Fără ele, scena plutește.'),
    item('r5l4', 'naratiune', 'O narațiune se deosebește de o listă prin…', ['are întâmplare, nu doar înșiruire', 'are doar numere', 'nu are verbe', 'e un tabel'], 0, 'Se întâmplă ceva, într-o ordine.'),
    item('r5l5', 'comparatie', 'Comparația pune…', ['un lucru lângă altul ca să-l înțelegi („ca”, „asemenea”)', 'două predicate', 'un procent', 'un cub'], 0, 'Nu e definiție tocită: e o punte.'),
    item('r5l6', 'personif', 'Personificarea…', ['dă însușiri omenești unui ne-om', 'e o listă', 'e un tabel', 'e un unghi'], 0, 'Vântul „șoptește” — e imagine, nu meteorologie.')
  ],
  'romana:5:redactare': [
    item('r5r1', 'pasi', 'Ordinea sănătoasă la scriere e…', ['idei → plan → text', 'text → idei la întâmplare', 'doar titlul', 'doar corectură'], 0, 'Fără plan, începutul se pierde.'),
    item('r5r2', 'structura', 'Un text scurt are nevoie de…', ['început, cuprins, sfârșit', 'doar cuprins', 'doar o vorbă', 'doar semnătură'], 0, 'Cititorul trebuie să știe de unde vine și unde ajunge.'),
    item('r5r3', 'povestire', 'Într-o povestire scurtă…', ['se vede o întâmplare, nu o listă de adjective', 'scrii doar definiții', 'nu folosești verbe', 'numeri paginile'], 0, 'Ce s-a întâmplat, cui, cum s-a terminat.'),
    item('r5r4', 'descriere', 'Descrierea unui loc…', ['arată ce se vede, aude, simte, într-o ordine', 'e o argumentare de examen', 'e un sistem de ecuații', 'e un tabel gol'], 0, 'Alegi detaliile, nu torni tot.'),
    item('r5r5', 'ortografie', 'Ortografia, aici, e…', ['respect pentru cititor, nu pedeapsă', 'opțională', 'doar pentru poezie', 'un predicat'], 0, 'Virgula și litera mare ajută respirația textului.'),
    item('r5r6', 'notite', 'Notițele bune…', ['prind idei scurte, nu copiezi tot', 'sunt romanul întreg', 'nu au verbe', 'sunt doar desene'], 0, 'Scrii ca să-ți amintești tu, nu ca să umpli pagina.')
  ],
  'romana:5:limba5': [
    item('r5g1', 'propozitie', 'O propoziție simplă are…', ['o singură predicație: un predicat', 'două fraze', 'zero verbe', 'doar interjecții'], 0, 'Dezvoltată = mai mulți „însoțitori” lângă schelet.'),
    item('r5g2', 'predicat', 'Predicatul verbal spune…', ['ce face sau ce se întâmplă', 'cine e descris mereu prin „este”', 'locul', 'titlul'], 0, 'Aleargă, citește, doarme — acțiune sau stare cu verb propriu-zis.'),
    item('r5g3', 'subiect', 'Subiectul răspunde la…', ['cine? ce?', 'unde?', 'când?', 'de ce?'], 0, 'E „vedeta” despre care se spune ceva.'),
    item('r5g4', 'atribut', 'Atributul, în propoziție,…', ['spune ceva despre un substantiv (care? ce fel de?)', 'e predicatul', 'e o frază', 'e un procent'], 0, '„Cartea nouă” — nouă e atribut.'),
    item('r5g5', 'verb-mod', 'Indicativul, pe scurt, e modul în care…', ['prezinți fapta ca reală', 'dai un ordin', 'dorești fără să afirmi', 'nu există verb'], 0, 'Imperativul cere: „Citește!”.'),
    item('r5g6', 'silaba', 'O silabă, pe scurt, e…', ['un grup de sunete cu o vocală, cât „înghite” glasul o dată', 'o propoziție', 'un personaj', 'un tabel'], 0, 'Vocalele țin silaba în picioare.'),
    item('r5g7', 'sinonime', 'Sinonimele sunt cuvinte…', ['apropiate ca sens', 'opuse', 'cu același sunet și sens diferit', 'din altă limbă obligatoriu'], 0, 'Antonimul e perechea de pe celălalt mal.')
  ],
  'romana:5:inter5': [
    item('r5c1', 'identitate', 'Identitatea, în textele voastre, pornește de la…', ['cine sunt, familia, locul, limba', 'doar notele', 'doar geometrie', 'un procent'], 0, 'Te poți povesti fără să te lauzi.'),
    item('r5c2', 'carte', 'Ideea de carte românească de-a lungul timpului…', ['arată că poveștile noastre au istorie, nu doar un manual de azi', 'înlocuiește lectura', 'e o formulă de mate', 'e un tabel gol'], 0, 'O legendă spusă azi e tot o „carte” orală.'),
    item('r5c3', 'legenda', 'O legendă, de obicei,…', ['explică un loc sau un erou cu fir de poveste, nu cu lecție moralizatoare goală', 'e o cerere', 'e un sistem', 'e un procent'], 0, 'O poți retell cu cuvintele tale.'),
    item('r5c4', 'model', 'Un model din legendă merită…', ['spus: ce a făcut, de ce ți-a rămas', 'tocit ca slogan', 'șters', 'transformat în ecuație'], 0, 'Dacă nu-l poți povesti, nu l-ai luat cu tine.'),
    item('r5c5', 'noi', '„Eu și lumea mea apropiată” înseamnă…', ['texte despre casă, școală, prieteni, sat/oraș', 'doar mitologie greacă', 'doar EN', 'doar algebră'], 0, 'Cercul e mic, ca să-l poți descrie bine.'),
    item('r5c6', 'limba-acasă', 'Limba de acasă și limba de la școală…', ['se întâlnesc: amândouă sunt română, cu roluri diferite', 'sunt limbi diferite', 'una e greșită mereu', 'nu se vorbesc'], 0, 'Poți povesti în amândouă, curat.')
  ],
  'romana:6:oral6': [
    item('r6o1', 'rezumat-oral', 'Un rezumat oral…', ['spune pe scurt ce ai auzit, fără detalii de umplutură', 'repetă tot cuvânt cu cuvânt', 'e o poezie', 'e un tabel'], 0, 'Idei, ordine, gata.'),
    item('r6o2', 'dialog', 'Trecerea de la monolog la dialog înseamnă…', ['lași loc și celuilalt, nu ții tot microfonul', 'vorbesc doar eu', 'nu mai există subiect', 'e un predicat'], 0, 'Întrebi, asculți, răspunzi.'),
    item('r6o3', 'parere', 'O părere pe o temă din clasă are nevoie de…', ['un motiv, nu doar „îmi place”', 'un procent', 'un cub', 'o legendă obligatorie'], 0, 'De ce? — o frază e de ajuns la început.'),
    item('r6o4', 'ascultare', 'Ca să rezumi, întâi…', ['asculți până la capăt', 'întrerupi', 'scrii romanul', 'calculezi media'], 0, 'Nu poți spune pe scurt ce n-ai auzit.'),
    item('r6o5', 'ordine', 'În rezumat, păstrezi…', ['ordinea întâmplărilor importante', 'toate adjectivele', 'doar titlul', 'doar data'], 0, 'Firul, nu broderia.'),
    item('r6o6', 'clar', 'Vorbești clar când…', ['celălalt poate relua ideea ta', 'folosești doar termeni rari', 'șoptești', 'nu te oprești'], 0, 'Testul e prietenul din bancă, nu dicționarul.')
  ],
  'romana:6:lectura6': [
    item('r6l1', 'continuu', 'Un text continuu e…', ['proze, știri, e-mail — rând după rând', 'doar un tabel', 'doar un afiș cu săgeți', 'o mulțime'], 0, 'Îl citești liniar, apoi poți compara cu un tabel.'),
    item('r6l2', 'deduc', 'Ce se deduce…', ['nu e scris clar, dar textul te lasă să înțelegi', 'e titlul', 'e numărul paginii', 'e un procent'], 0, 'Cauți indicii, nu inventezi.'),
    item('r6l3', 'portret', 'Un portret în text…', ['arată un om din detalii alese (chip, gest, vorbă)', 'e o cerere', 'e o ecuație', 'e un grafic'], 0, 'Nu e fișa medicală: e o alegere de trăsături.'),
    item('r6l4', 'pers1', 'Narațiunea la persoana I…', ['spune „eu”, ca un jurnal', 'spune doar „el/ea”', 'nu are verbe', 'e un tabel'], 0, 'Persoana a III-a privește din afară.'),
    item('r6l5', 'stire', 'O știre pune în față…', ['ce s-a întâmplat, cine, unde, când', 'o metaforă lungă', 'un mit', 'un sistem'], 0, 'Apoi pot veni detalii.'),
    item('r6l6', 'email', 'Un e-mail se citește ca…', ['text cu destinatar, scop, formulă de adresare', 'o poezie fără rânduri', 'un cub', 'un prim'], 0, 'Cine scrie, cui, de ce.')
  ],
  'romana:6:redactare6': [
    item('r6r1', 'destinatar', 'Când scrii o scrisoare sau un e-mail, te gândești la…', ['cine citește și ce vrei de la el', 'doar la tine', 'doar la notă', 'la un cub'], 0, 'Tonul către bunica nu e tonul către director.'),
    item('r6r2', 'jurnal', 'Jurnalul prinde…', ['ce ți s-a întâmplat și ce ai simțit, pe scurt', 'doar știri de televizor', 'doar teoreme', 'un tabel gol'], 0, 'E pentru tine, dar tot se citește în ordine.'),
    item('r6r3', 'intamplare', 'O întâmplare cu momente are…', ['câteva scene, nu un singur adjectiv', 'doar titlul', 'zero verbe', 'doar numere'], 0, 'Început → tensiune → capăt.'),
    item('r6r4', 'emotie', 'Ca să descrii o emoție…', ['arăți ce se vede în gest și în gând, nu spui doar „era frumos”', 'scrii „frumos” de trei ori', 'faci un procent', 'desenezi un cub'], 0, 'Detaliul mic e mai tare decât eticheta.'),
    item('r6r5', 'fenomen', 'Descrierea unui fenomen (ploaie, pauză zgomotoasă)…', ['prinde ordine: înainte, în timpul, după', 'e o legendă obligatorie', 'e o inecuație', 'e un afiș gol'], 0, 'Cititorul „vede” fără să fi fost acolo.'),
    item('r6r6', 'blog', 'Un blog de gimnaziu tot are nevoie de…', ['un scop și paragrafe, nu haos', 'doar emoji', 'zero punctuație', 'un sistem de ecuații'], 0, 'E text public, deci se înțelege.')
  ],
  'romana:6:limba6': [
    item('r6g1', 'nume-pred', 'Predicatul nominal e…', ['un verb de legătură (des „a fi”) + un nume predicativ', 'doar un verb de mișcare', 'un subiect', 'un procent'], 0, '„Este elev” — este + elev.'),
    item('r6g2', 'cd', 'Complementul direct răspunde de obicei la…', ['pe cine? ce?', 'unde?', 'când?', 'de ce?'], 0, 'Primește acțiunea: citesc o carte.'),
    item('r6g3', 'circ', 'Circumstanțialele de loc, timp, mod spun…', ['unde, când, cum se face fapta', 'cine e subiectul', 'ce e atributul', 'titlul'], 0, 'Decorul predicatului.'),
    item('r6g4', 'caz', 'Cazul substantivului…', ['arată rolul în propoziție (cine, pe cine, cui…)', 'e un procent', 'e un cub', 'e o legendă'], 0, 'Forma se schimbă când se schimbă treaba cuvântului.'),
    item('r6g5', 'diftong', 'Diftongul, la fonetică, e…', ['două vocale în aceeași silabă', 'trei propoziții', 'un personaj', 'un tabel'], 0, 'Hiatul le desparte în silabe diferite.'),
    item('r6g6', 'figurat', 'Sensul figurat…', ['nu e litera de dicționar, e o imagine', 'e doar greșeală', 'e un prim', 'e un volum'], 0, '„Inima de piatră” nu e diagnostic.'),
    item('r6g7', 'omonime', 'Omonimele sunt cuvinte care…', ['sună (sau se scriu) la fel, sensuri diferite', 'sunt sinonime', 'sunt antonime', 'sunt predicate'], 0, 'Contextul alege sensul.')
  ],
  'romana:6:inter6': [
    item('r6c1', 'lume', 'Româna „în lume” amintește că…', ['limba se vorbește și în afara clasei, uneori în alte țări', 'există o singură școală', 'e o formulă', 'e un cub'], 0, 'Aceeași limbă, alte case.'),
    item('r6c2', 'popular', 'Cultura populară (basm, proverb)…', ['adu valori pe care le poți povesti, nu doar cita', 'înlocuiește gramatica', 'e un sistem', 'e un procent'], 0, 'Un proverb e o idee scurtă, verificată de mulți.'),
    item('r6c3', 'compar-leg', 'Compari o legendă de-a noastră cu una a altui popor ca să…', ['vezi ce e comun și ce e al locului', 'le amesteci într-una', 'le ștergi', 'le faci ecuații'], 0, 'Nu e concurs: e oglindă.'),
    item('r6c4', 'valori', 'O valoare dintr-un text popular…', ['se vede în fapte, nu în slogan', 'e un titlu gol', 'e un radical', 'e un tabel'], 0, 'Curajul e ce face eroul, nu ce scrie pe afiș.'),
    item('r6c5', 'eu-jur', 'Tema „eu și lumea din jur” lărgește cercul la…', ['cartier, știri, e-mail, alți oameni', 'doar camera ta', 'doar EN', 'doar algebră'], 0, 'Mai mulți destinatari, același respect.'),
    item('r6c6', 'respect', 'Când vorbești despre alt popor…', ['descrii, nu ironizezi din auzite', 'inventezi', 'folosești doar adjective urâte', 'faci un procent'], 0, 'Comparația e curiozitate, nu rang.')
  ],
  'romana:7:oral7': [
    item('r7o1', 'sinteza', 'O prezentare în fața clasei…', ['spune ideea, apoi 1–2 exemple, în timpul dat', 'citește 10 pagini fără aer', 'e o poezie obligatorie', 'e un cub'], 0, 'Sinteză ≠ copie.'),
    item('r7o2', 'voce', 'Controlul vocii înseamnă…', ['se aude în spate, fără să urli', 'șoaptă tot timpul', 'un singur ton plat', 'fără pauze'], 0, 'Volum + claritate.'),
    item('r7o3', 'timp', 'Timpul prezentării…', ['se împarte: început scurt, mijloc, închidere', 'e infinit', 'e doar salutul', 'e un procent de mate'], 0, 'Dacă treci de timp, tai din mijloc, nu din salut și capăt.'),
    item('r7o4', 'gest', 'Gesturile ajută când…', ['arată ideea, nu fură ochii de la ea', 'fluturi mâinile tot timpul', 'stai cu spatele', 'ți-acoperi gura'], 0, 'Dacă încurcă, le liniștești.'),
    item('r7o5', 'exemplu', 'Un exemplu bun…', ['e concret și scurt', 'e o altă prezentare întreagă', 'e un tabel gol', 'e un radical'], 0, 'Unul bun bate cinci vagi.'),
    item('r7o6', 'privire7', 'Te uiți la clasă ca să…', ['vezi dacă te-au urmat', 'citești doar foița', 'te ascunzi', 'calculezi media'], 0, 'Ochii sunt feedback.')
  ],
  'romana:7:lectura7': [
    item('r7l1', 'epic', 'Textul epic se recunoaște după…', ['acțiune, personaje, o întâmplare', 'doar stări fără faptă', 'doar replici de scenă', 'doar un tabel'], 0, 'Se povestește ceva.'),
    item('r7l2', 'liric', 'Textul liric…', ['pune în față o stare, o voce, imagini — nu neapărat o poveste cu plot', 'e o știre', 'e o cerere', 'e un sistem'], 0, 'Cine vorbește și ce simte, nu „ce s-a întâmplat apoi”.'),
    item('r7l3', 'dramatic', 'Textul dramatic e gândit…', ['să se joace: replici, scene, conflict', 'doar ca tabel', 'doar ca procent', 'fără personaje'], 0, 'Citit, tot „auzi” voci.'),
    item('r7l4', 'puncte', 'Două puncte de vedere pe același text…', ['pot evidenția lucruri diferite, amândouă cu dovezi', 'una e mereu greșită', 'se adună ca numere', 'sunt predicate'], 0, 'Compari, nu anulezi.'),
    item('r7l5', 'dovada', 'O afirmație despre text stă în picioare dacă…', ['arăți locul din text', 'e lungă', 'e șoptită', 'e un cub'], 0, '„Pentru că acolo scrie / se vede…”.'),
    item('r7l6', 'eticheta', 'Etichetele epic/liric/dramatic…', ['vin după ce ai recunoscut ce se întâmplă, nu înainte', 'se tocesc goale', 'înlocuiesc lectura', 'sunt procente'], 0, 'Întâi textul, apoi numele.')
  ],
  'romana:7:redactare7': [
    item('r7r1', 'caracterizare', 'Personajul se construiește din…', ['fapte și vorbe, nu din adjective înșirate', 'doar „bun și frumos”', 'doar vârsta', 'un tabel de note'], 0, 'Arată, nu eticheta.'),
    item('r7r2', 'recenzie', 'O recenzie spune…', ['ce e textul / filmul / cartea și ce crezi, cu un motiv', 'doar „mi-a plăcut”', 'doar rezumat de 10 pagini', 'o ecuație'], 0, 'Cititorul decide dacă se apropie.'),
    item('r7r3', 'cerere', 'O cerere are…', ['destinatar, ce soliciți, date, formulă politică', 'doar o glumă', 'zero structură', 'un mit'], 0, 'E un text cu scop: vrei ceva oficial.'),
    item('r7r4', 'interviu', 'Într-un interviu…', ['întrebările deschid, răspunsurile dezvoltă', 'vorbește un singur om tot timpul', 'nu există scop', 'e un cub'], 0, 'Pregătești întrebările, asculți răspunsul.'),
    item('r7r5', 'jurnal-cal', 'Jurnalul de călătorie prinde…', ['locuri, oameni, ce ți s-a schimbat în cap', 'doar orele de tren', 'doar prețuri', 'un sistem'], 0, 'Drumul e scuză pentru ochi.'),
    item('r7r6', 'scop', 'Orice text de clasa a VII-a întreabă întâi…', ['cu ce scop îl scriu', 'câte adjective am', 'ce notă iau', 'ce radical folosesc'], 0, 'Scopul alege forma.')
  ],
  'romana:7:limba7': [
    item('r7g1', 'fraza', 'O frază leagă…', ['propoziții (și, dar, deci…)', 'doar silabe', 'doar personaje', 'procente'], 0, 'Nu mai e o insulă: e un lanț.'),
    item('r7g2', 'coord', 'Coordonarea pune propoziții…', ['pe același plan, legate prin joncțiuni de tip și/dar/deci', 'una sub cealaltă ca atribut', 'într-un cub', 'într-un tabel'], 0, 'Sunt „colegi”, nu „șef și angajat”.'),
    item('r7g3', 'cauza', 'O construcție de cauză răspunde la…', ['de ce?', 'unde?', 'cine?', 'cât?'], 0, 'Scopul răspunde la „cu ce intenție?”.'),
    item('r7g4', 'nepers', 'Formele nepersonale ale verbului (infinitiv, gerunziu, participiu)…', ['nu au persoană ca „eu/tu”, dar tot țin de acțiune', 'sunt substantive mereu', 'sunt interjecții', 'sunt numere'], 0, 'a citi / citind / citit.'),
    item('r7g5', 'familie', 'O familie lexicală…', ['cuvinte din același rădăcină', 'sinonime oarecare', 'omonime', 'propoziții'], 0, 'carte, a încartirui, cărticică — același neam.'),
    item('r7g6', 'pleonasm', 'Pleonasmul e…', ['spui de două ori același lucru („coboară jos”)', 'un antonim', 'un hiat', 'un cub'], 0, 'Tai ce e în plus.'),
    item('r7g7', 'paronime', 'Paronimele se aseamănă la formă, dar…', ['nu înseamnă același lucru', 'sunt identice', 'sunt predicate', 'sunt volume'], 0, 'Alege-l pe cel potrivit, nu pe cel care „sună aproape”.')
  ],
  'romana:7:inter7': [
    item('r7c1', 'mit', 'Un mit românesc…', ['spune o poveste despre origini / eroi, pe care o poți retell', 'e o cerere', 'e o inecuație', 'e un tabel'], 0, 'Nu e știre: e un fir de lume.'),
    item('r7c2', 'vecini', 'Culturile din jurul României…', ['se pot compara fără să le ierarhizezi', 'nu există', 'sunt identice', 'sunt calcule'], 0, 'Orizontul se lărgește.'),
    item('r7c3', 'intalnire', 'Limba se schimbă când…', ['oamenii se întâlnesc, împrumută, traduc', 'e interzisă', 'e un cub', 'e un prim'], 0, 'Cuvintele călătoresc.'),
    item('r7c4', 'orizont', '„Orizonturile lumii” la a VII-a înseamnă…', ['texte și idei dincolo de curtea școlii', 'doar camera ta', 'doar EN', 'doar algebră'], 0, 'Același român, hărți mai late.'),
    item('r7c5', 'respect7', 'Față de un mit al altora…', ['asculți regula lor de poveste, nu o ironizezi din auzite', 'îl rescrii ca glumă obligatoriu', 'îl faci procent', 'îl ignori'], 0, 'Curiozitate > rang.'),
    item('r7c6', 'retell', 'Cel mai bun test că ai înțeles un mit e…', ['să-l spui pe scurt, cu cuvintele tale', 'să-l copiezi', 'să-l numeri', 'să-l faci ecuație'], 0, 'Dacă se rupe firul, mai citești o dată.')
  ],
  'romana:8:oral8': [
    item('r8o1', 'argument', 'O părere ține dacă are…', ['un motiv (și, la nevoie, o sursă)', 'doar volum', 'doar adjective', 'un cub'], 0, '„Pentru că…” e scheletul.'),
    item('r8o2', 'dezbatere', 'În dezbatere…', ['continui ideea celuilalt fără s-o strici, apoi adaugi', 'țipi', 'întrerupi mereu', 'citești romanul'], 0, 'Nu e meci de box: e construție.'),
    item('r8o3', 'info-intentie', 'Informația e ce se spune; intenția e…', ['de ce se spune (să convingă, să anunțe, să emoționeze)', 'titlul', 'numărul de rânduri', 'un procent'], 0, 'Aceeași știre, scopuri diferite.'),
    item('r8o4', 'surasa', 'O sursă, la oral, e…', ['de unde știi (text, oră, martor), spus pe scurt', 'un secret', 'un radical', 'un tabel gol'], 0, 'Nu e bibliografie de 2 pagini.'),
    item('r8o5', 'ascult8', 'Ca să continui ideea altcuiva…', ['o repeți pe scurt corect, apoi adaugi', 'o schimbi din start', 'o ignori', 'faci un calcul'], 0, 'Reformularea arată că ai auzit.'),
    item('r8o6', 'calm', 'Tonul într-o dezbatere de clasă e…', ['ferm și politicos', 'doar ironie', 'șoaptă fără conținut', 'tăcere'], 0, 'Ideea câștigă, nu volumul.')
  ],
  'romana:8:lectura8': [
    item('r8l1', 'tema', 'Tema unui text e…', ['despre ce e, în mare, nu un citat magic', 'ultimul rând', 'numele autorului', 'un procent'], 0, 'Motivele sunt cărămizile mai mici.'),
    item('r8l2', 'esential', 'Ce e esențial…', ['ține tema; ornamentul e culoare, nu schelet', 'e totul egal', 'e doar titlul', 'e un cub'], 0, 'Tai ce poți pierde fără să cadă sensul.'),
    item('r8l3', 'nonlit', 'Un text nonliterar (afiș, tabel, anunț)…', ['are tot un mesaj, doar forma e alta', 'nu se citește', 'e o poezie', 'e o inecuație'], 0, 'Cine, cui, ce vrea.'),
    item('r8l4', 'autorul', 'Formula „autorul vrea să transmită”…', ['nu e magică: trebuie dovadă din text', 'înlocuiește lectura', 'e obligatorie în fiecare rând', 'e un radical'], 0, 'Arăți, nu ghicești intimitatea autorului.'),
    item('r8l5', 'necunoscut', 'La un text necunoscut, ca la EN, faci…', ['citești de două ori: întâi firul, apoi întrebările', 'sari la răspunsuri', 'înveți un comentariu gata', 'calculezi media'], 0, 'Textul din fața ta, nu cel de acasă.'),
    item('r8l6', 'tabel-afis', 'Tabelul și afișul se citesc…', ['pe coloane / pe ierarhia vizuală, apoi în cuvinte', 'ca o poezie de la cap la coadă doar', 'ca un cub', 'ca un prim'], 0, 'Forma e parte din mesaj.')
  ],
  'romana:8:redactare8': [
    item('r8r1', 'arg', 'Un text argumentativ are…', ['părere + motive + exemple, în paragrafe', 'doar o vorbă', 'doar rezumat', 'un sistem'], 0, 'Se vede scheletul.'),
    item('r8r2', 'paragraf', 'Un paragraf bun…', ['duce o idee, apoi lași loc alteia', 'amestecă tot', 'e o silabă', 'e un cub'], 0, 'Un bloc = o treabă.'),
    item('r8r3', 'en-scriere', 'La EN, textul scris cere…', ['plan, nu inspirație de moment', 'un comentariu tocit', 'zero structură', 'un radical'], 0, 'Fie despre un text, fie creativ: tot ai un capăt și un mijloc.'),
    item('r8r4', 'creativ', 'Textul creativ tot are…', ['personaje / voce / ordine, chiar dacă e scurt', 'doar adjective', 'doar date', 'un tabel gol'], 0, 'Libertatea nu e haos.'),
    item('r8r5', 'exemplu8', 'Exemplul din argumentare…', ['e concret și leagă motivul', 'e o altă poveste fără capăt', 'e un procent gol', 'e un gest'], 0, 'Unul potrivit bate trei vagi.'),
    item('r8r6', 'incheiere', 'Încheierea unui text…', ['revine la idee, nu aduce un subiect nou', 'e un nou roman', 'lipsește mereu', 'e un cub'], 0, 'Ușa se închide, nu se deschide alt coridor.')
  ],
  'romana:8:limba8': [
    item('r8g1', 'reluare', 'La a VIII-a, limba e…', ['reluarea și legarea a ce știi: acord, caz, vocabular, punctuație', 'o materie nouă de la zero', 'doar mituri', 'doar algebră'], 0, 'Antrenezi pe texte noi.'),
    item('r8g2', 'acord', 'Acordul (subiect–predicat, atribut…)…', ['ține piesele împreună', 'e opțional', 'e un procent', 'e un cub'], 0, 'Dacă „se simte ciudat”, verifici cine se leagă de cine.'),
    item('r8g3', 'doom', 'DOOM, la limba română, e…', ['o referință de normă, nu o capcană de concurs', 'un roman', 'un sistem de ecuații', 'un afiș'], 0, 'Te uiți când ești în dubiu, nu tocești tot dicționarul.'),
    item('r8g4', 'punctuatie', 'Punctuația la frază complexă…', ['arată respirația și rolurile', 'e decor', 'e un radical', 'e un volum'], 0, 'Virgula nu e confetti.'),
    item('r8g5', 'vocab8', 'Vocabularul de examen se vede…', ['în alegerea cuvântului potrivit în context', 'în lista tocită fără text', 'într-un cub', 'într-un prim'], 0, 'Contextul decide.'),
    item('r8g6', 'text-nou', 'Exersezi pe texte noi ca să…', ['nu depinzi de un comentariu gata', 'memorezi un singur articol', 'sari EN', 'faci doar mate'], 0, 'Gândirea se mută, nu recitarea.')
  ],
  'romana:8:inter8': [
    item('r8c1', 'lume-lit', 'Modele din literatura lumii…', ['arată că aceleași întrebări se pun și aiurea', 'înlocuiesc româna', 'sunt calcule', 'sunt tabele'], 0, 'Te uiți afară ca să te vezi și pe tine.'),
    item('r8c2', 'valori-afara', 'Valori românești „văzute din afară”…', ['îți arată ce e vizibil și altora, nu doar ție', 'sunt greșite mereu', 'sunt procente', 'sunt cuburi'], 0, 'O oglindă, nu un concurs.'),
    item('r8c3', 'relatii', 'Relațiile culturale…', ['se povestesc: cine s-a întâlnit, ce s-a schimbat', 'nu există', 'sunt inecuații', 'sunt titluri goale'], 0, 'Ieși din „doar manualul meu”.'),
    item('r8c4', 'reflectie', '„Reflecții asupra lumii” înseamnă…', ['texte în care te gândești, nu doar relatare', 'doar știri', 'doar EN grilă', 'doar algebră'], 0, 'Întrebi: ce rămâne după ce s-a întâmplat?'),
    item('r8c5', 'noi-ceilalti', '„Noi și ceilalți” cere…', ['să descrii fără să cobori pe celălalt', 'ironie obligatorie', 'tăcere', 'un cub'], 0, 'Curiozitate, nu rang.'),
    item('r8c6', 'punte', 'Când un text e „al lumii”, tot îl citești…', ['cu aceleași unelte: idee, dovadă, ton', 'fără să înțelegi cuvintele', 'ca pe un radical', 'ca pe un tabel gol'], 0, 'Uneltele de română călătoresc.')
  ]
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
