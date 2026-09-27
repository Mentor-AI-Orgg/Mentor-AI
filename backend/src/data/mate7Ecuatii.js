// Capitolul II din Matematică, clasa a VII-a, Litera, A1742 (2024):
// ecuații și sisteme de ecuații liniare.
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

const ECUATII_LESSONS = [
  lesson('egalitati', 'Egalități echivalente și identități', {
    formulas: ['aceeași adunare în ambele părți', 'înmulțire cu un număr nenul în ambele părți'],
    theory: 'O egalitate spune că două scrieri au aceeași valoare. O ecuație este o egalitate în care cauți necunoscuta.\n\nDouă egalități sunt echivalente dacă au exact aceleași soluții. Poți aduna sau scădea același număr în ambele părți. Poți înmulți sau împărți ambele părți cu același număr nenul. Dacă înmulțești cu 0, strici echivalența: totul devine 0 = 0 sau ajungi la o minciună.\n\nO identitate este o egalitate adevărată pentru orice valoare la care are sens. 2(x + 3) = 2x + 6 este identitate. x + 1 = 5 nu este: ține doar pentru x = 4.',
    example: 'Pornești de la x + 5 = 12. Scazi 5 în ambele părți și rămâne x = 7. Verificare: 7 + 5 = 12. 2(x + 3) = 2x + 6 este adevărată și pentru x = 0, și pentru x = 10. Nu o „rezolvi”: este identitate.',
    practice: '1. Din 2x = 10, cât este x? 2. x − 3 = 4. 3. 3(x + 1) = 3x + 3 este ecuație cu o soluție sau identitate?\n\nRăspunsuri: 5. 7. Identitate.',
    mistakes: 'Nu schimbi doar partea stângă. Nu împarți la 0. Nu cauți „soluția” unei identități: ea ține pentru toate valorile permise.',
    tryThis: 'Scrie o identitate scurtă cu x și o ecuație care are soluția 4. Spune ce ai făcut ca să treci de la ecuație la x = 4.',
    recap: 'Ce faci într-o parte faci și în cealaltă, cu un număr nenul la înmulțire și la împărțire. Identitatea este adevărată pentru orice valoare permisă. Ecuația alege valorile care o fac adevărată.'
  }),

  lesson('ecuatie-axb', 'Ecuația ax + b = 0', {
    formulas: ['dacă a ≠ 0, x = −b/a', 'dacă a = 0 și b = 0, orice x real este soluție', 'dacă a = 0 și b ≠ 0, nu există soluție'],
    theory: 'Forma ax + b = 0 are coeficienți reali. a stă lângă x. b este termenul liber.\n\nDacă a ≠ 0, există o singură soluție: x = −b/a. O aduci acolo trecând b în partea cealaltă și împărțind la a. Coeficienții pot fi și radicali, dacă radicalul este un număr cunoscut.\n\nDacă a = 0 și b = 0, ecuația devine 0 = 0. Orice număr real este soluție. Dacă a = 0 și b ≠ 0, ajungi la o egalitate falsă, de tipul 5 = 0. Nu există soluție.\n\nPoți cere soluția doar în ℕ, doar în ℤ, doar în ℚ sau în ℝ. Uneori numărul găsit în ℝ nu stă în mulțimea cerută.\n\nEcuațiile cu paranteze sau cu fracții se reduc la aceeași formă. Deschizi parantezele. La fracții, înmulțești toată ecuația cu un numitor comun nenul.',
    example: '(3x − 1)/2 = x + 4. Înmulțești cu 2: 3x − 1 = 2x + 8. Scazi 2x și aduni 1: x = 9. Verificare: (27 − 1)/2 = 13 și 9 + 4 = 13. Alt caz: 0 · x + 5 = 0 nu are soluție. 0 · x + 0 = 0 are orice x real. √2 · x − √8 = 0 dă x = √8 / √2 = √4 = 2.',
    practice: '1. x + 5 = 12. 2. 2x = 10. 3. 3x − 8 = −2x + 7. 4. Soluția lui 2x = 3 este în ℕ?\n\nRăspunsuri: 7. 5. 5x = 15, deci x = 3. Nu, 3/2 nu este natural.',
    mistakes: 'Nu împarți la a fără să verifici că a nu este 0. Nu înmulțești doar un termen cu numitorul. Nu spui că o ecuație fără soluție are soluția 0.',
    tryThis: 'Rezolvă (x + 4)/3 = 2. Spune în care mulțimi dintre ℕ, ℤ și ℚ stă soluția.',
    recap: 'ax + b = 0 are o soluție unică când a ≠ 0. Are toate realele când a și b sunt 0. Nu are soluție când a este 0 și b nu este 0. Parantezele și numitorii se curăță înainte.'
  }),

  lesson('doua-necunoscute', 'Ecuații cu două necunoscute', {
    figure: 'axes',
    formulas: ['ax + by + c = 0', 'o soluție este o pereche (x, y)'],
    theory: 'O ecuație liniară cu două necunoscute are forma ax + by + c = 0, cu a și b nu ambele nule. Cauți perechi ordonate (x, y).\n\nOrdinea contează: (1, 2) nu este aceeași pereche cu (2, 1).\n\nDacă nu mai pui o a doua condiție, soluțiile sunt o infinitate. Poți alege liber pe x, apoi îl afli pe y, sau invers, când coeficientul lui nu este 0. Pe axe, perechile stau pe o dreaptă.',
    example: 'x + y − 5 = 0, adică y = 5 − x. Pentru x = 0, y = 5, perechea (0, 5). Pentru x = 2, y = 3, perechea (2, 3). Pentru x = 5, y = 0. Sunt infinit de multe perechi. (1, 4) este soluție. (4, 1) este și ea soluție, dar este altă pereche.',
    practice: '1. În x − y = 1, dacă y = 3, cât este x? 2. Perechea (2, 1) verifică x + y = 3? 3. Câte soluții are x + y = 3 în ℝ, fără altă condiție?\n\nRăspunsuri: 4. Da. O infinitate.',
    mistakes: 'Nu schimba locul numerelor din pereche. Nu spune că o singură ecuație cu două necunoscute are o singură pereche. Nu uiți să înlocuiești ambele litere la verificare.',
    tryThis: 'Pentru 2x + y = 8, alege trei valori pentru x și calculează y. Scrie cele trei perechi.',
    recap: 'Soluția este o pereche (x, y), nu un singur număr. O ecuație liniară cu două necunoscute are o infinitate de perechi, dacă coeficienții nu sunt amândoi nuli.'
  }),

  lesson('sisteme', 'Sisteme de două ecuații', {
    formulas: ['perechea trebuie să țină în ambele ecuații'],
    theory: 'Un sistem de două ecuații liniare cu două necunoscute îți dă două condiții deodată. Le scrii una sub alta, cu o acoladă.\n\nSoluția este perechea (x, y) care face adevărate ambele ecuații. Dacă o ecuație ține și cealaltă nu, perechea nu este soluție.\n\nVerificarea înseamnă două înlocuiri. Calculezi partea stângă și partea dreaptă în fiecare ecuație.\n\nUn sistem poate avea o singură pereche, nicio pereche sau o infinitate. Aici înveți să recunoști perechea și să o verifici. Metodele de aflare vin în lecția următoare.',
    example: 'Sistemul 4x − y = 6 și x + 2y = −3. Încerci perechea (1, −2). Prima ecuație: 4 · 1 − (−2) = 4 + 2 = 6. A doua: 1 + 2 · (−2) = 1 − 4 = −3. Ambele țin, deci (1, −2) este soluție. Perechea (1, 2) dă la prima ecuație 4 − 2 = 2, nu 6, deci nu este soluție.',
    practice: '1. (1, −2) dă 4x − y = ? 2. Aceeași pereche verifică x + 2y = −3? 3. (0, 0) verifică x + y = 1?\n\nRăspunsuri: 6. Da. Nu.',
    mistakes: 'Nu te oprești după o singură ecuație. Nu schimbi semnul când înlocuiești un y negativ: minus și minus fac plus. Nu numi soluție o pereche care „aproape” verifică.',
    tryThis: 'Inventă o pereche (x, y). Scrie două ecuații adevărate pentru ea. Apoi încearcă o pereche greșită și arată care ecuație o respinge.',
    recap: 'Sistemul cere ca aceeași pereche să țină în ambele ecuații. Verifici de două ori. O singură bifă nu ajunge.'
  }),

  lesson('metode-sistem', 'Metoda substituției și metoda reducerii', {
    formulas: ['substituție: înlocuiești o necunoscută', 'reducere: aduni sau scazi ecuațiile'],
    theory: 'Substituția: dintr-o ecuație scoți o necunoscută, de pildă x = y + 2. O pui în cealaltă ecuație, peste tot unde apare. Rămâne o ecuație cu o singură necunoscută. O rezolvi, apoi te întorci și afli cealaltă literă.\n\nReducerea: aduni sau scazi ecuațiile ca să dispară o necunoscută. Dacă coeficienții nu sunt opuși, înmulțești întâi o ecuație cu un număr nenul, ca termenii să se anuleze. Apoi revii în una dintre ecuații.\n\nAlegi metoda după cum arată sistemul. Dacă o literă este deja scoasă, substituția este scurtă. Dacă coeficienții unei litere sunt opuși, reducerea este scurtă. Coeficienții pot fi fracții sau reali: îi cureți la început, înmulțind cu un numitor comun.',
    example: 'Substituție: 3x + 2y = 16 și x = y + 2. 3(y + 2) + 2y = 16, deci 3y + 6 + 2y = 16, 5y = 10, y = 2 și x = 4. Verificare: 3 · 4 + 2 · 2 = 16.\n\nReducere: 2x + y = 11 și x − y = 1. Aduni: 3x = 12, deci x = 4. Din a doua, 4 − y = 1, deci y = 3. Verificare: 2 · 4 + 3 = 11.',
    practice: '1. 3x + 2y = 16 și x = y + 2. Cât este x? 2. 2x + y = 11 și x − y = 1. Cât este y? 3. x − y = 1 și x + y = 7. Cât este x?\n\nRăspunsuri: 4. 3. 4.',
    mistakes: 'Nu înlocuiești x doar într-un singur loc. Nu aduni ecuațiile dacă termenii nu sunt pregătiți să dispară. Nu uiți să afli și a doua necunoscută.',
    tryThis: 'Rezolvă x + y = 10 și x − y = 2 prin reducere. Apoi rezolvă același sistem prin substituție și compară perechea.',
    recap: 'Substituția înlocuiește o literă cu ce ai scos din cealaltă ecuație. Reducerea adună sau scade ecuațiile ca o literă să dispară. La ambele, verifici perechea în sistem.'
  }),

  lesson('probleme-sisteme', 'Probleme cu ecuații și sisteme', {
    formulas: ['alegi necunoscutele', 'scrii condițiile', 'rezolvi', 'verifici în poveste'],
    theory: 'O problemă se traduce în ecuații. Pașii sunt aceștia. Alegi necunoscutele și spui ce înseamnă, cu unitatea lor. Scrii câte o ecuație pentru fiecare condiție. Rezolvi. Verifici în ambele condiții. Interpretezi: un număr de mere nu poate fi negativ, o vârstă nu poate fi o fracție fără sens în poveste.\n\nTipuri uzuale: două numere, vârste, mișcare, amestecuri și figuri. La mișcare, distanța este viteză ori timp, când viteza este constantă. La amestec, cantitatea de substanță pură se adună. La geometrie, folosești perimetrul sau suma unghiurilor.',
    example: 'Suma a două numere este 11 și diferența lor este 1. Notezi numerele x și y. x + y = 11 și x − y = 1. Prin reducere, 2x = 12, deci x = 6 și y = 5. Suma 11 și diferența 1 se verifică.\n\nUn dreptunghi are perimetrul 30 cm și lungimea cu 3 cm mai mare decât lățimea. L + l = 15, fiindcă perimetrul este dublul sumei. L = l + 3. Atunci l + 3 + l = 15, deci 2l = 12, l = 6 și L = 9.',
    practice: '1. Două numere au suma 11 și diferența 1. Care este cel mai mic? 2. Un număr este cu 4 mai mare decât altul, iar suma lor este 20. Care este cel mare? 3. Două vârste au suma 36 de ani, iar una este dublul celeilalte. Care este vârsta mică?\n\nRăspunsuri: 5. 12. 12.',
    mistakes: 'Nu uita unitatea. Nu verifica doar în ecuație și ignora povestea: o lungime negativă se aruncă. Nu nota două lucruri cu aceeași literă.',
    tryThis: 'Inventează o problemă cu două numere: suma 20 și diferența 6. Scrie sistemul, rezolvă-l și verifică în fraza ta.',
    recap: 'Numerele, vârstele, mișcarea, amestecul și figurile se pun în ecuații după ce ai spus ce este fiecare necunoscută. La sfârșit te întorci la poveste, nu doar la litere.'
  }),

  lesson('recap-ecuati', 'Recapitulare: ecuații și sisteme', {
    formulas: ['ax + b = 0', 'o pereche (x, y) în ambele ecuații'],
    theory: 'O egalitate rămâne echivalentă dacă lucrezi la fel în ambele părți și nu înmulțești cu 0. Identitatea ține pentru orice valoare permisă.\n\nax + b = 0 are o soluție, niciuna sau o infinitate, după a și b. O ecuație cu două necunoscute are o infinitate de perechi. Sistemul alege perechea care le ține pe amândouă.\n\nSubstituția înlocuiește. Reducerea anulează o literă. Problema cere traducere, rezolvare, verificare și interpretare.',
    example: '(3x − 1)/2 = x + 4 dă x = 9. Sistemul 2x + y = 11 și x − y = 1 dă x = 4 și y = 3. Perechea (1, −2) dă 4x − y = 6 și verifică x + 2y = −3.',
    practice: '1. x + 5 = 12. 2. Din 2x + y = 11 și x − y = 1, cât este y? 3. 0 · x = 5 are soluție?\n\nRăspunsuri: 7. 3. Nu.',
    mistakes: 'Nu schimba o singură parte a egalității. Nu declara o pereche soluție după o singură ecuație. Nu lăsa o lungime negativă în răspunsul unei probleme.',
    tryThis: 'Rezolvă un sistem ales de tine, cu numere mici, o dată prin substituție și o dată prin reducere. Scrie perechea o singură dată, dacă ai găsit același rezultat.',
    recap: 'Cântarul rămâne echilibrat. O necunoscută dă un număr. Două necunoscute dau o pereche. Sistemul cere două verificări.'
  })
];

module.exports = { ECUATII_LESSONS };
