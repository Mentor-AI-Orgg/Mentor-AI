// Capitolul II din Matematică, clasa a VI-a, Litera, A1498 (2023):
// rapoarte, proporții, regula de trei, procente, grafice, probabilități.
// Text original. Nu copiem enunțuri și nu predăm pașii de click din Excel.

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

const PROPORTII_LESSONS = [
  lesson('rapoarte', 'Rapoarte', {
    formulas: ['Raportul lui a față de b este a : b sau a/b, cu b ≠ 0', 'Mărimile dintr-un raport au aceeași unitate'],
    theory: 'Raportul a două numere nenule, sau cu primul nenul și al doilea nenul, compară primul cu al doilea printr-o împărțire. Îl scrii a : b sau a/b. a este antecedentul, b este consecventul. Consecventul nu este 0.\n\nPoți avea raport de naturale, de fracții sau de zecimale. Două rapoarte sunt egale dacă, după simplificare, arată aceeași comparație.\n\nLa două mărimi de aceeași natură treci întâi în aceeași unitate. Nu faci raport între metri și lei.\n\nScara unei hărți este raportul dintre lungimea de pe hartă și lungimea reală, în aceeași unitate. Viteza medie este raportul dintre drum și timp. Concentrația unei soluții este raportul dintre cantitatea de substanță și cantitatea de soluție.',
    example: '3 : 6 = 1 : 2, pentru că împarți ambele numere la 3. 2,5 km = 250000 cm. La scara 1 : 50000, pe hartă sunt 250000 : 50000 = 5 cm. O soluție de 20 g sare în 100 g soluție are concentrația 20/100 = 1/5.',
    practice: '1. Simplifică 8 : 12. 2. 4 km la scara 1 : 100000 câți centimetri sunt pe hartă? 3. Viteza medie pe 120 km în 2 ore.\n\nRăspunsuri: 2 : 3. 4 km = 400000 cm, deci 4 cm. 60 km/h.',
    mistakes: 'Nu inversa ordinea: 3 : 6 nu este 6 : 3. Nu amesteca unitățile în același raport. Nu împărți la 0.',
    tryThis: 'Măsoară lungimea caietului și a unei rigle, în centimetri. Scrie raportul și simplifică-l. Spune ce compară.',
    recap: 'Raportul este o împărțire cu ordinea păstrată. La mărimi, unitatea este aceeași. Scara, viteza medie și concentrația sunt rapoarte din viața de zi cu zi.'
  }),

  lesson('proportii', 'Proporții', {
    formulas: ['a/b = c/d', 'a · d = b · c', 'b ≠ 0 și d ≠ 0'],
    theory: 'O proporție este egalitatea a două rapoarte: a/b = c/d. a și d sunt extremii. b și c sunt mezii.\n\nProprietatea fundamentală: produsul extremilor este egal cu produsul mezilor. a · d = b · c. Cu ea verifici patru numere și afli un termen necunoscut.\n\nPoți forma proporții derivate. Schimbi mezii între ei sau extremii între ei. Inversezi ambele rapoarte, dacă termenii nu sunt 0. Poți lua și alți termeni, dar verifici mereu proprietatea fundamentală înainte să spui că ai o proporție.',
    example: '2/5 = x/20. Extremii sunt 2 și 20, mezii sunt 5 și x. 2 · 20 = 5 · x, deci 40 = 5x și x = 8. Verificare: 2/5 = 8/20. 2, 3, 4, 6 formează proporția 2/3 = 4/6, fiindcă 2 · 6 = 3 · 4.',
    practice: '1. Află x din 3/4 = x/12. 2. 2, 5, 4, 10 formează o proporție în ordinea asta? 3. Dacă a/b = c/d, atunci b/a = d/c, când niciun termen nu este 0?\n\nRăspunsuri: 9. Da, 2 · 10 = 5 · 4. Da, rapoartele inversate rămân egale.',
    mistakes: 'Nu înmulți în cruce două fracții care nu sunt într-o proporție. Nu uiți că numitorii sunt nenuli. Nu schimbi un singur raport pe dos și să lași pe celălalt neschimbat.',
    tryThis: 'Scrie o proporție cu un loc gol, dintr-un preț pe care îl știi. Află locul gol cu produsele și verifică.',
    recap: 'Proporția este două rapoarte egale. Extremii și mezii își înmulțesc produsele. Din egalitatea produselor afli termenul lipsă și verifici înapoi.'
  }),

  lesson('sir-rapoarte', 'Șir de rapoarte egale', {
    formulas: ['a/b = c/d = e/f = k', '(a + c + e)/(b + d + f) = k, dacă numitorii sunt nenuli și suma numitorilor este nenulă'],
    theory: 'Mai multe rapoarte pot fi egale cu același număr k. Atunci suma numărătorilor, împărțită la suma numitorilor, este tot k, dacă suma numitorilor nu este 0.\n\nCu regula asta afli numere când știi un șir de rapoarte egale și suma sau diferența lor. Notezi părțile cu aceeași literă, aduni sau scazi, apoi afli o parte.',
    example: 'Două numere sunt în raportul 2/3, iar suma lor este 20. Le scrii 2k și 3k. 2k + 3k = 20, deci 5k = 20 și k = 4. Numerele sunt 8 și 12. Verificare: 8/12 = 2/3 și 8 + 12 = 20.',
    practice: '1. Numere în raportul 1/4, cu suma 15. Care sunt? 2. 2/5 = 4/10. Suma numărătorilor pe suma numitorilor este cât? 3. Două numere în raportul 3/5, cu diferența 8. Cel mic.\n\nRăspunsuri: 3 și 12. 6/15 = 2/5. 5k − 3k = 8, deci k = 4 și cel mic este 12.',
    mistakes: 'Nu aduni numărătorii și numitorii pe diagonală. Nu uiți că toate rapoartele trebuie să fie egale înainte să aduni. Nu împărți la o sumă de numitori care este 0.',
    tryThis: 'Împarte 24 de lei în două părți al căror raport este 1 : 2. Spune câte părți egale ai folosit și cât face o parte.',
    recap: 'La rapoarte egale, suma numărătorilor pe suma numitorilor păstrează valoarea. Numerele necunoscute se scriu ca părți k, apoi folosești suma sau diferența.'
  }),

  lesson('direct-invers', 'Mărimi direct și invers proporționale', {
    formulas: ['Direct: raportul rămâne constant', 'Invers: produsul rămâne constant'],
    theory: 'Două șiruri de numere nenule sunt direct proporționale dacă rapoartele termenilor corespunzători sunt egale. Când una se dublează, și cealaltă se dublează.\n\nSunt invers proporționale dacă produsele termenilor corespunzători sunt egale. Când una se dublează, cealaltă se înjumătățește.\n\nPrețul și cantitatea, la același preț pe bucată, sunt direct proporționale. Viteza și timpul, pe același drum, sunt invers proporționale. Numărul de muncitori și timpul pentru aceeași lucrare, la același ritm, sunt invers proporționale.\n\nCa să împărți un număr în părți direct proporționale cu 2, 3 și 5, faci 2k, 3k și 5k. Ca să-l împărți invers proporțional cu aceste numere, părțile sunt k/2, k/3 și k/5, apoi afli k din sumă.',
    example: '8 m de stofă costă 96 de lei. Raportul preț/lungime este 96/8 = 12 lei pe metru, constant, deci sunt direct proporționale. 6 robinete umplu un bazin în 4 ore. 6 · 4 = 24. La 3 robinete, timpul este 24 : 3 = 8 ore. Produsul a rămas 24, deci mărimile sunt invers proporționale.',
    practice: '1. 4 caiete costă 20 de lei. Cât costă 6 caiete? 2. 4 muncitori termină în 6 zile. În câte zile termină 8 muncitori, același ritm? 3. Împarte 36 în părți direct proporționale cu 1 și 2.\n\nRăspunsuri: 30 de lei. 3 zile. 12 și 24.',
    mistakes: 'Nu spune „cresc împreună” fără raport constant. Nu înjumătăți și muncitorii, și timpul. La invers, produsul stă pe loc, nu raportul.',
    tryThis: 'Scrie două exemple din casă: unul în care dublarea uneia o dublează pe cealaltă și unul în care dublarea uneia o înjumătățește pe cealaltă.',
    recap: 'Direct înseamnă același raport. Invers înseamnă același produs. Împărțirea în părți urmează același gând: k la direct, 1/număr la invers.'
  }),

  lesson('regula-trei', 'Regula de trei simplă', {
    formulas: ['Direct: reduci la unitate, apoi înmulțești', 'Invers: păstrezi produsul'],
    theory: 'Regula de trei simplă află a patra mărime când știi trei. Întâi întrebi: dacă prima crește, a doua crește sau scade?\n\nLa mărimi direct proporționale reduci la o unitate, apoi înmulțești cu numărul cerut. Poți și o proporție.\n\nLa mărimi invers proporționale păstrezi produsul. Mai puțini lucrători înseamnă mai mult timp. Nu pui rapoartele în aceeași ordine ca la cazul direct.',
    example: '5 caiete costă 30 de lei. Un caiet costă 6 lei, deci 8 caiete costă 48 de lei. Același drum: la 60 km/h îl faci în 2 ore. La 120 km/h produsul drumului este același, deci timpul este 1 oră. 60 · 2 = 120 · 1.',
    practice: '1. 3 kg costă 18 lei. Cât costă 7 kg? 2. 5 pompe golesc un bazin în 6 ore. Câte ore la 10 pompe? 3. Este al doilea caz direct sau invers?\n\nRăspunsuri: 42 de lei. 3 ore. Invers.',
    mistakes: 'Nu porni calculul înainte să spui direct sau invers. Nu folosi proporția directă la timp și viteză pe același drum. Nu uita unitatea de măsură în răspuns.',
    tryThis: 'Inventă o problemă cu trei numere știute și un loc gol. Spune dacă este directă sau inversă, rezolv-o și verifică produsul sau raportul.',
    recap: 'Trei valori cunoscute îți dau pe a patra. Direct: treci prin unitate. Invers: păstrezi produsul. Întrebarea „crește sau scade?” alege metoda.'
  }),

  lesson('procente', 'Procente', {
    formulas: ['p% = p/100', 'p% din N = p/100 · N', 'Întregul = partea : (p/100)'],
    theory: 'p% înseamnă p părți din 100, adică p/100. Ca să afli p% dintr-un număr, înmulțești numărul cu p/100.\n\nDacă știi partea și procentul, afli întregul împărțind partea la p/100. Dacă știi partea și întregul, procentul este partea/întreg · 100.\n\nO scumpire cu p% înmulțește prețul cu (100 + p)/100. O ieftinire cu p% îl înmulțește cu (100 − p)/100. Al doilea procent se aplică la noul preț, nu mereu la cel vechi.\n\nDobânda simplă pe un an este procent din sumă. Concentrația procentuală este tot un raport cu 100: cantitatea de substanță din 100 de unități de soluție.',
    example: '20% din 80 este 16. Dacă 20% dintr-un preț sunt 16 lei, prețul întreg este 16 : (20/100) = 80 lei. Un preț de 100 de lei crește cu 20% și ajunge la 120. Apoi scade cu 20% din 120, adică cu 24, și rămâne 96. Nu se întoarce la 100.',
    practice: '1. 25% din 60. 2. 15 lei sunt 10% din ce sumă? 3. 200 de lei, ieftinire cu 10%. Cât rămâne?\n\nRăspunsuri: 15. 150 de lei. 180 de lei.',
    mistakes: 'Nu aplica al doilea procent la prețul inițial dacă enunțul spune „din noul preț”. Nu confunda „cu 20% mai mult” cu „de 20 de ori”. Nu lăsa procentul ca pe un număr fără întreg.',
    tryThis: 'Alege un preț și fă o scumpire cu 10%, apoi o ieftinire cu 10% din noul preț. Scrie de ce nu ai ajuns la prețul de la început.',
    recap: 'Procentul este un raport cu numitorul 100. Din procent afli partea, din parte și procent afli întregul, din parte și întreg afli procentul. Scumpirea și ieftinirea se aplică pe prețul la care ești atunci.'
  }),

  lesson('grafice-date', 'Grafice și frecvențe', {
    figure: 'frequency-bars',
    formulas: ['Frecvența absolută = de câte ori apare valoarea', 'Frecvența relativă = frecvența absolută / efectiv', 'Efectivul este numărul tuturor datelor'],
    theory: 'Strângi datele într-un tabel. Efectivul este câți sunt în total. Frecvența absolută a unei valori este de câte ori apare. Frecvența relativă este frecvența absolută împărțită la efectiv. O poți scrie și ca procent.\n\nDiagrama cu bare sau coloane arată frecvențele prin lungimea barei. Diagrama circulară împarte discul în sectoare: sectorul mare înseamnă frecvență mare. Graficul liniar unește punctele și arată cum se schimbă un șir.\n\nDacă două mărimi sunt direct proporționale, punctele din tabel stau pe o semidreaptă care pornește din origine, când unești valorile corespunzătoare.\n\nGraficele se pot face și cu un program de calcul. Pe caiet îți ajung tabelul, axele și bara sau punctul. Nu ai nevoie de pașii din program ca să înțelegi graficul.',
    example: 'La 20 de aruncări, fața 6 a zarului a ieșit de 4 ori. Frecvența absolută este 4. Frecvența relativă este 4/20 = 1/5 = 20%. Dacă 2 kg costă 10 lei și 4 kg costă 20 lei, punctele (2, 10) și (4, 20) stau pe aceeași semidreaptă din origine: mărimile sunt direct proporționale.',
    practice: '1. Efectiv 25, valoarea apare de 5 ori. Frecvența relativă, ca fracție. 2. Aceeași frecvență, ca procent. 3. Bara mai înaltă înseamnă valoarea mai mare sau frecvența mai mare?\n\nRăspunsuri: 1/5. 20%. Frecvența mai mare.',
    mistakes: 'Nu împărți frecvența la numărul de coloane. O împărți la efectiv. Nu citi înălțimea barei ca pe valoarea însăși, dacă axa verticală este frecvența. Nu uni puncte care sar peste o valoare și să spui că ai măsurat-o.',
    tryThis: 'Notează culoarea preferată a zece persoane, fă tabelul de frecvențe absolute și relative și desenează barele. Spune care culoare are sectorul cel mai mare dacă ai face un disc.',
    recap: 'Efectivul este totalul. Frecvența absolută numără. Frecvența relativă este partea din total, uneori în procente. Barele, discul și linia arată aceleași date. Proporționalitatea directă se vede ca puncte pe o semidreaptă din origine.'
  }),

  lesson('probabilitati', 'Probabilități', {
    formulas: ['P = numărul cazurilor favorabile / numărul cazurilor posibile', '0 ≤ P ≤ 1'],
    theory: 'Un experiment aleator are mai multe rezultate posibile și nu știi dinainte care iese. Un eveniment este un grup din aceste rezultate.\n\nDacă rezultatele sunt egal posibile, probabilitatea evenimentului este numărul cazurilor favorabile împărțit la numărul cazurilor posibile. O scrii ca fracție și o poți trece în procent.\n\nP este între 0 și 1. Evenimentul imposibil are probabilitatea 0. Evenimentul sigur are probabilitatea 1.\n\nLa o monedă corectă sunt 2 cazuri. La un zar corect sunt 6. La extragerea unei bile dintr-o urnă, cazurile posibile sunt bilele, dacă fiecare are aceeași șansă.',
    example: 'Probabilitatea feței stema la o monedă este 1/2. La un zar, un număr par înseamnă 2, 4 sau 6, deci 3/6 = 1/2. Într-o urnă sunt 2 bile roșii și 3 albastre. Probabilitatea unei bile roșii este 2/5 = 40%. Evenimentul „iese 7” la un zar obișnuit este imposibil: P = 0.',
    practice: '1. Probabilitatea feței 5 la un zar. 2. Într-o urnă sunt 1 bilă verde și 3 bile galbene. Probabilitatea verdelui, ca fracție. 3. Poate P fi 3/2?\n\nRăspunsuri: 1/6. 1/4. Nu, pentru că favorabilele nu pot fi mai multe decât posibilele.',
    mistakes: 'Nu număra cazurile posibile doar pe cele care îți convin. Nu aduna probabilități de evenimente care se acoperă și să treci de 1 fără să verifici. Nu spune că 0 înseamnă „foarte greu”: 0 înseamnă imposibil în modelul acesta.',
    tryThis: 'Pune într-o pungă 5 bucăți de hârtie, două cu da și trei cu nu. Spune probabilitatea lui da, ca fracție și ca procent, înainte să extragi.',
    recap: 'Probabilitatea este favorabile pe posibile, când șansele sunt egale. Este o fracție între 0 și 1. Sigur înseamnă 1. Imposibil înseamnă 0. Procentul este aceeași fracție scrisă la 100.'
  }),

  lesson('recap-proportii', 'Recapitulare: rapoarte și proporții', {
    formulas: ['a · d = b · c', 'Direct: raport constant', 'Invers: produs constant', 'p% = p/100'],
    theory: 'Raportul compară două numere sau două mărimi de aceeași unitate. Proporția este egalitatea a două rapoarte, verificată prin produse. Șirul de rapoarte egale își păstrează valoarea la suma numărătorilor pe suma numitorilor.\n\nMărimile direct proporționale țin raportul. Cele invers proporționale țin produsul. Regula de trei alege una dintre ele. Procentul este raportul cu 100.\n\nDatele se văd în tabele și grafice. Frecvența relativă este o parte din efectiv. Probabilitatea, la cazuri egal posibile, este tot un raport: favorabile pe posibile.',
    example: '4 m costă 28 de lei, deci 6 m costă 42 de lei. 4 muncitori în 10 zile înseamnă 8 muncitori în 5 zile. 10% din 42 este 4,2. La un zar, P(față pară) = 1/2.',
    practice: '1. 2/x = 4/10. Află x. 2. 9 lei sunt 50% din ce sumă? 3. Frecvența 3 din efectivul 12, ca fracție simplificată.\n\nRăspunsuri: 5. 18 lei. 1/4.',
    mistakes: 'Nu trata inversul ca pe direct. Nu aplica procentul la alt întreg decât cel spus. Nu numi probabilitate o frecvență absolută.',
    tryThis: 'Fă o problemă scurtă cu o proporție, una cu un procent și una cu o urnă. La fiecare scrie regula folosită.',
    recap: 'Compari prin rapoarte, completezi prin proporții și alegi direct sau invers după cum se mișcă mărimile. Procentul, frecvența relativă și probabilitatea sunt tot părți dintr-un întreg.'
  })
];

module.exports = { PROPORTII_LESSONS };
