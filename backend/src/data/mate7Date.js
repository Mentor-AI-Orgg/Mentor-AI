// Capitolul III din Matematică, clasa a VII-a, Litera, A1742 (2024):
// produs cartezian, axe și dependențe.
// Text original. Noțiunea de funcție este la clasa a VIII-a, așa că aici
// vorbim doar despre dependență: fiecărui element din A îi corespunde unul singur din B.

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

const DATE_LESSONS = [
  lesson('produs-cartezian', 'Produsul cartezian', {
    figure: 'dot-grid',
    formulas: ['A × B = perechile (a, b)', 'card(A × B) = card A · card B'],
    theory: 'O pereche ordonată (a, b) ține minte cine este primul și cine este al doilea. (1, 2) nu este egală cu (2, 1).\n\nProdusul cartezian A × B este mulțimea tuturor perechilor (a, b) cu a din A și b din B. A și B sunt nevide.\n\nDacă A are m elemente și B are n elemente, atunci A × B are m · n elemente. Scrii card(A × B) = card A · card B.\n\nPoți arăta produsul într-un tabel: liniile sunt elementele lui A, coloanele sunt elementele lui B, iar fiecare căsuță este o pereche. Poți desena și o rețea de puncte: un punct pentru fiecare pereche.',
    example: 'A = {1, 2} și B = {3, 4, 5}. Perechile sunt (1, 3), (1, 4), (1, 5), (2, 3), (2, 4) și (2, 5). Sunt 2 · 3 = 6. (3, 1) nu este în A × B, pentru că 3 nu este în A. B × A are tot 6 perechi, dar ele sunt scrise invers.',
    practice: '1. Câte perechi are {a, b} × {1, 2, 3}? 2. (2, 1) este în {1} × {2}? 3. A × A pentru A = {0, 1} are câte elemente?\n\nRăspunsuri: 6. Nu. 4.',
    mistakes: 'Nu schimba ordinea din pereche și să spui că este aceeași. Nu aduna cardinalele: le înmulțești. Nu uita perechile în care cele două componente sunt egale, când faci A × A.',
    tryThis: 'Alege două mulțimi mici din penar: culori și numere. Scrie toate perechile și verifică dacă numărul lor este produsul cardinalelor.',
    recap: 'A × B strânge perechile ordonate. Numărul lor este produsul numerelor de elemente. Tabelul și rețeaua de puncte arată același produs.'
  }),

  lesson('axe', 'Sistem de axe ortogonale', {
    figure: 'axes',
    formulas: ['originea este (0, 0)', 'distanța pe orizontală: |x2 − x1|', 'mijlocul: ((x1 + x2)/2, (y1 + y2)/2)'],
    theory: 'Două axe perpendiculare se taie în origine, punctul (0, 0). Axa orizontală este Ox. Axa verticală este Oy. Ele împart planul în patru cadrane.\n\nUn punct A are coordonatele (x, y). x este abscisa: cât mergi pe orizontală, la dreapta lui 0 dacă x este pozitiv, la stânga dacă este negativ. y este ordonata: în sus dacă este pozitivă, în jos dacă este negativă. A(2, 3) are abscisa 2 și ordonata 3.\n\nDacă două puncte au aceeași ordonată, segmentul este paralel cu Ox, iar distanța este |x2 − x1|. Dacă au aceeași abscisă, segmentul este paralel cu Oy, iar distanța este |y2 − y1|. Dacă diferă ambele coordonate, faci un triunghi dreptunghic și folosești Pitagora: distanța este √((x2 − x1)^2 + (y2 − y1)^2).\n\nMijlocul segmentului are coordonatele medii: ((x1 + x2)/2, (y1 + y2)/2).\n\nPunctul de pe cealaltă parte a originii, la aceeași distanță, are ambele semne schimbate. A(3, −2) corespunde lui (−3, 2). Oglinda față de Ox păstrează abscisa și schimbă semnul ordonatei: A(2, 3) corespunde lui (2, −3).',
    example: 'A(−1, 4) și C(5, −4). Diferența absciselor este 5 − (−1) = 6. Diferența ordonatelor este −4 − 4 = −8, deci lungimea pe verticală este 8. 6^2 + 8^2 = 36 + 64 = 100, iar distanța este 10. Mijlocul este ((−1 + 5)/2, (4 + (−4))/2) = (2, 0). Simetricul lui A(3, −2) față de origine este (−3, 2).',
    practice: '1. La A(2, 3), care este abscisa? 2. Distanța dintre A(−1, 4) și C(5, −4). 3. Simetricul lui A(3, −2) față de origine. 4. Simetricul lui (2, 3) față de Ox, doar ordonata.\n\nRăspunsuri: 2. 10. (−3, 2). −3.',
    mistakes: 'Nu inversezi abscisa cu ordonata. Nu uiți modulul când scaderea iese negativă: distanța este pozitivă. Nu schimbi un singur semn când oglinda este față de origine.',
    tryThis: 'Desenează axele. Pune punctele (0, 0), (3, 1) și (−2, 4). Spune în ce cadran este fiecare și calculează distanța dintre (3, 1) și (3, 5), care stau pe o paralelă la Oy.',
    recap: 'Ox și Oy se taie în (0, 0). Prima coordonată este abscisa, a doua este ordonata. Distanța folosește modulul sau Pitagora. Mijlocul face media coordonatelor.'
  }),

  lesson('dependente-tabel', 'Dependențe prin diagrame și tabele', {
    figure: 'venn',
    formulas: ['fiecărui element din A îi corespunde un singur element din B'],
    theory: 'O dependență de la A la B face așa: pentru fiecare element din A există exact un element din B. Nu zero și nu două.\n\nO poți desena cu o diagramă: din fiecare element al lui A pleacă o singură săgeată spre B. Dacă dintr-un element pleacă două săgeți, nu este dependență. Dacă unui element din A nu îi pleacă nicio săgeată, iar nu este.\n\nTabelul face același lucru. O coloană este A, cealaltă este B. Pe fiecare linie, un element din A apare o singură dată. Mai multe elemente din A pot avea aceeași valoare în B. Asta este permis: important este ca unui x să nu îi dai două valori.',
    example: 'A = {0, 1, 2} și valorile 1, 3 și 5. Tabelul x = 0 dă 1, x = 1 dă 3, x = 2 dă 5. Fiecărui x îi corespunde un singur număr. Regula poate fi „dublu plus 1”. Dacă ai scrie pentru x = 1 și valoarea 3, și valoarea 4, tabelul nu mai este o dependență.',
    practice: '1. x = 0, 1, 2 și y = 1, 2, 3 este dependență? 2. Dacă x = 2 apare de două ori, cu y = 4 și y = 5? 3. y = x + 1 pentru x = 2. Cât este y?\n\nRăspunsuri: da. Nu. 3.',
    mistakes: 'Nu cere ca și elementele din B să apară o singură dată. Nu lăsa un x fără pereche. Nu numi dependență o listă în care același x are două y-uri.',
    tryThis: 'Fă un tabel cu patru zile și temperatura de la amiază. Arată că fiecărei zile îi corespunde o singură temperatură.',
    recap: 'Dependența dă un singur corespondent în B pentru fiecare element din A. Diagrama are o singură săgeată din fiecare element. Tabelul nu repetă un x cu valori diferite.'
  }),

  lesson('dependente-grafic', 'Dependențe prin grafice', {
    figure: 'axes',
    formulas: ['la mărimi direct proporționale, punctele stau pe o dreaptă prin origine'],
    theory: 'Un grafic pune perechile unei dependențe pe axe. Fiecare linie din tabel devine un punct. Dacă punctele stau pe o dreaptă, dependența este liniară.\n\nLa mărimi direct proporționale, dublul lui x dă dublul lui y, iar dreapta trece prin origine. Prețul și cantitatea, la același preț pe bucată, sunt un exemplu: dacă o bucată costă 4 lei, atunci y = 4x.\n\nCa să citești un punct, cobori la abscisă și te uiți la ordonată. Ca să afli unde taie graficul axa Oy, pui x = 0. Nu este nevoie de un nume nou pentru regulă: o scrii y = ... și înlocuiești.',
    example: 'Tabelul x = 0, 1, 2 și y = 3, 5, 7. Când x crește cu 1, y crește cu 2, iar la x = 0 ai y = 3. Regula este y = 2x + 3. Pentru x = 4, y = 11. Punctele stau pe o dreaptă care taie Oy în (0, 3).\n\nAltă regulă: y = −3x + 5. Vrei y = −4. −3x + 5 = −4, deci −3x = −9 și x = 3. Punctul (3, −4) este pe grafic. La x = 0, y = 5, deci graficul taie Oy în (0, 5).',
    practice: '1. y = x + 1 și x = 2. Cât este y? 2. Din tabelul 0, 1, 2 și 3, 5, 7, cât este y la x = 4? 3. y = −3x + 5 și y = −4. Cât este x?\n\nRăspunsuri: 3. 11. 3.',
    mistakes: 'Nu citești un punct din ochi, fără să te duci la axe. Nu spui că orice dreaptă trece prin origine: doar proporția directă o face, dintre dreptele pe care le desenăm aici. Nu dai aceluiași x două ordonate.',
    tryThis: 'Fă tabelul pentru y = 3x, cu x de la 0 la 3. Desenează punctele. Spune cu cât crește y când x crește cu 1 și unde taie dreapta axa Oy.',
    recap: 'Graficul este desenul perechilor. La proporție directă, dreapta trece prin origine. Citești x și y de pe axe. Regula se verifică pe toate punctele, nu doar pe două.'
  }),

  lesson('recap-date', 'Recapitulare: organizarea datelor', {
    figure: 'axes',
    formulas: ['card(A × B) = card A · card B', 'distanța: √((x2 − x1)^2 + (y2 − y1)^2)'],
    theory: 'Produsul cartezian enumeră perechile ordonate. Numărul lor este produsul cardinalelor.\n\nAxele Ox și Oy se taie în origine. Abscisa este prima coordonată, ordonata este a doua. Distanța este modulul, când segmentul este paralel cu o axă, sau Pitagora, când nu este. Mijlocul face media coordonatelor.\n\nO dependență dă un singur y pentru fiecare x. O arăți prin săgeți, prin tabel sau prin puncte pe axe. Graficul se citește, nu se ghicește.',
    example: 'A = {1, 2} și B = {1, 2} dau 4 perechi. A(−1, 4) și C(5, −4) sunt la distanța 10. Tabelul 0, 1, 2 și 3, 5, 7 continuă cu y = 11 la x = 4. Simetricul lui (3, −2) față de origine este (−3, 2).',
    practice: '1. card({1, 2, 3} × {1, 2}). 2. Abscisa lui (4, −1). 3. y = 2x + 3 la x = 4.\n\nRăspunsuri: 6. 4. 11.',
    mistakes: 'Nu confunda (a, b) cu (b, a). Nu numi ordonata „prima coordonată”. Nu trage două săgeți din același element.',
    tryThis: 'Desenează patru puncte ale unei dependențe y = x + 2. Scrie tabelul și produsul dintre mulțimea absciselor și mulțimea ordonatelor, apoi spune câte perechi are produsul și câte dintre ele sunt pe graficul tău.',
    recap: 'Perechile ordonate fac produsul cartezian și punctele de pe axe. Dependența alege, pentru fiecare x, un singur y. Tabelul și graficul spun aceeași poveste.'
  })
];

module.exports = { DATE_LESSONS };
