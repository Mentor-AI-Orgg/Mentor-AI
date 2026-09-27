// Capitolul III din Matematică, clasa a VIII-a, Litera, A1984 (2025):
// funcții și elemente de statistică.
// Text original. Nu copiem enunțuri, teste sau exemple din manual.
// Plan principal: funcția, graficul, f(x) = ax + b și indicatorii
// frecvență, medie, mediană, mod, amplitudine.
// Nu folosim termenii pantă, monotonie, funcție liniară, funcție pătratică,
// frecvență relativă, abatere sau probabilitate.

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

const FUNCTII_LESSONS = [
  lesson('notiune-functie', 'Noțiunea de funcție', {
    figure: 'venn',
    formulas: ['f: A → B', 'fiecare x are exact un y', 'imaginea este în codomeniu'],
    theory: 'Plan principal. O funcție f de la A la B, scrisă f: A → B, leagă fiecare element x din A de exact un element y din B. A este domeniul. B este codomeniul. Regula care face legătura este legea de corespondență. f(x) înseamnă valoarea pe care o primești când intră x. Nu înseamnă „f ori x“.\n\nImaginea lui f, notată Im f, este mulțimea valorilor care ies efectiv. Este inclusă în codomeniu. Codomeniul poate fi mai mare decât imaginea.\n\nO funcție o poți da în mai multe feluri. Printr-o diagramă cu săgeți. Printr-un tabel cu două coloane. Printr-o formulă. Sau prin mai multe formule, pe porțiuni, dacă fiecare x cade într-o singură porțiune și primește o singură valoare.\n\nNu este funcție o diagramă în care un x are două săgeți spre valori diferite. Este funcție dacă două x-uri diferite ajung în același y. De la o mulțime cu 2 elemente la o mulțime cu 2 elemente există 4 funcții: fiecare element din domeniu are 2 alegeri, iar alegerile se înmulțesc.',
    example: 'f(x) = 3x + 1. f(2) = 3 · 2 + 1 = 7. Nu este 32. Pe porțiuni: f(x) = x când x < 0 și f(x) = 2 când x ≥ 0. f(−1) = −1 și f(0) = 2. Un x nu primește două valori. De la {1, 2} la {a, b} sunt 4 funcții.',
    practice: '1. f(x) = 3x + 1. f(2). 2. Un x cu două săgeți diferite este funcție? 3. Câte funcții sunt de la o mulțime cu 2 elemente la o mulțime cu 2 elemente?\n\nRăspunsuri: 7. Nu. 4.',
    mistakes: 'Nu citi f(2) ca f ori 2. Nu accepta două valori pentru același x. Nu confunda codomeniul cu imaginea: imaginea este doar ce se atinge.',
    tryThis: 'Fă un tabel cu x egal cu 0, 1 și 2 pentru f(x) = x + 4. Spune domeniul pe care l-ai folosit și imaginea celor trei valori.',
    recap: 'Funcția dă fiecărui x din domeniu exact un y din codomeniu. O poți descrie prin diagramă, tabel, formulă sau formule pe porțiuni. Două săgeți din același x o strică.'
  }),

  lesson('grafic-functie', 'Graficul unei funcții', {
    figure: 'axes',
    formulas: ['graficul este mulțimea perechilor (x, f(x))', 'un punct este pe grafic dacă y = f(x)', 'funcția numerică are valori reale'],
    theory: 'Plan principal. Graficul funcției f este mulțimea perechilor (x, f(x)), cu x din domeniu. Dacă domeniul și codomeniul sunt submulțimi ale lui ℝ, funcția este numerică. Perechile se desenează în sistemul de axe xOy, pe care îl știi de anul trecut.\n\nUn punct M(a, b) este pe grafic dacă b = f(a). Dacă nu, punctul este în afara graficului, chiar dacă stă aproape de el.\n\nCa să desenezi, alegi câteva valori din domeniu, calculezi f(x) și pui punctele. La o formulă pe porțiuni, desenezi fiecare bucată pe domeniul ei.',
    example: 'f(x) = −2x + 7. f(0) = 7, deci (0, 7) este pe grafic. f(3) = −6 + 7 = 1, deci (3, 1) este pe grafic. (3, 4) nu este, pentru că f(3) nu este 4.',
    practice: '1. f(x) = x + 1. Este (4, 5) pe grafic? 2. f(0) pentru f(x) = −2x + 7. 3. f(3) pentru aceeași funcție.\n\nRăspunsuri: da. 7. 1.',
    mistakes: 'Nu pune un punct pe grafic doar pentru că îți place poziția. Verifici y = f(x). Nu amesteca abscisa cu ordonata.',
    tryThis: 'Pentru f(x) = x − 2, calculează trei puncte și spune care dintre (0, −2), (2, 0) și (1, 1) stau pe grafic.',
    recap: 'Graficul este mulțimea perechilor (x, f(x)). În axe, un punct stă pe grafic doar când ordonata este chiar valoarea funcției în abscisă.'
  }),

  lesson('functia-axb', 'Funcția f(x) = ax + b', {
    figure: 'axes',
    formulas: ['când a ≠ 0, graficul este o dreaptă', 'când a = 0, f(x) este constantă', 'f(0) = b'],
    theory: 'Plan principal. f: ℝ → ℝ, f(x) = ax + b, cu a și b reali. O întâlnești la prețuri. Un taxi pornește cu 3 lei și mai cere 2 lei pentru fiecare kilometru. Dacă x este numărul de kilometri, f(x) = 2x + 3.\n\nDacă a ≠ 0, x apare la puterea întâi. Funcția se numește de gradul I. Graficul ei este o dreaptă. Două puncte o determină. Dacă a = 0, f(x) = b pentru orice x. Este o funcție constantă, iar graficul este o dreaptă orizontală.\n\nNu numim aici înclinarea printr-un termen special. Spunem direct: când x crește cu 1, f(x) se schimbă cu a. Dacă a este pozitiv, dreapta urcă. Dacă a este negativ, dreapta coboară. b este valoarea lui f când x este 0, deci înălțimea la care dreapta taie axa verticală.\n\nEcuația dreptei este y = ax + b. Taie axa verticală în (0, b). Taie axa orizontală unde ax + b = 0, dacă a ≠ 0. Un punct este pe dreaptă când coordonatele lui verifică ecuația.\n\nDin două puncte afli a și b. Dacă unul are abscisa 0, b este ordonata lui. Altfel, schimbi lui x între cele două puncte, vezi cu cât se schimbă y și împărți schimbarea lui y la schimbarea lui x. Acela este a.\n\nPoți avea și formule pe porțiuni, dacă pe fiecare bucată de domeniu scrii o singură regulă de forma ax + b.',
    example: 'f(x) = −2x + 7. f(3) = −6 + 7 = 1. f(3) + 4 = 5. Ecuația f(x) = 5 este −2x + 7 = 5, deci −2x = −2 și x = 1. Dreapta taie axa verticală în (0, 7). Când x crește cu 1, f scade cu 2. Două puncte: (0, 3) și (2, 7) dau b = 3 și a = (7 − 3)/2 = 2, deci g(x) = 2x + 3.',
    practice: '1. f(x) = −2x + 7. Pentru ce x avem f(x) = f(3) + 4? 2. f(x) = 3x + 4. f(0). 3. f(x) = 2x. Cu cât crește f de la x = 1 la x = 3?\n\nRăspunsuri: 1. 4. 4.',
    mistakes: 'Nu schimba rolul lui a cu rolul lui b. a spune schimbarea, b spune tăietura cu axa verticală. Nu citi f(3) ca f ori 3. Nu trage o dreaptă dintr-un singur punct, dacă nu știi și pe a.',
    tryThis: 'Un abonament costă 5 lei pe zi, fără sumă fixă. Scrie f(x), calculează f(4) și spune unde taie axa verticală.',
    recap: 'f(x) = ax + b are graficul o dreaptă. a este schimbarea lui f când x crește cu 1. b este f(0). Două puncte determină dreapta. Constanta are a = 0.'
  }),

  lesson('functie-interval', 'Funcții pe un interval. Lecturi grafice', {
    figure: 'axes',
    formulas: ['pe un interval închis, graficul este un segment', 'capătul gol nu intră în domeniu', 'f(x) = g(x) se citește la intersecție'],
    theory: 'Plan principal. Dacă domeniul D este un interval, nu toată axa, graficul lui f(x) = ax + b este doar bucata de dreaptă de deasupra lui D. Pe un interval mărginit este un segment. Capetele incluse se desenează pline. Capetele excluse se desenează goale. Pe o semidreaptă, graficul este o semidreaptă.\n\nDe pe grafic citești domeniul: proiecția pe axa orizontală. Mulțimea valorilor este proiecția pe axa verticală. Imaginea unui punct se citește pe verticală, de la x până la grafic. Soluțiile ecuației f(x) = g(x) sunt abscisele punctelor în care cele două grafice se taie.\n\nPoți recupera funcția din grafic. Citești două puncte clare, apoi afli a și b ca în lecția precedentă. Dacă domeniul este un interval, îl scrii lângă formulă.',
    example: 'f(x) = −2x + 7 pe [0, 3]. Punctele capetelor sunt (0, 7) și (3, 1), ambele incluse. Valorile merg de la 1 până la 7. g(x) = x + 1 taie f când −2x + 7 = x + 1, deci 6 = 3x și x = 2. Punctul comun este (2, 3). Dacă domeniul era (0, 3), capetele 0 și 3 nu ar intra.',
    practice: '1. f(x) = −2x + 7 pe [0, 3]. f(0) și f(3). 2. x pentru care −2x + 7 = x + 1. 3. Capătul unui interval deschis se desenează plin sau gol?\n\nRăspunsuri: 7 și 1. 2. Gol.',
    mistakes: 'Nu prelungești segmentul în afara domeniului. Nu incluzi un capăt gol în mulțimea valorilor. Nu citești intersecția după ordonată când ți se cere x-ul soluție.',
    tryThis: 'Desenează f(x) = x + 1 pe [−1, 2]. Marchează capetele pline și spune cea mai mică și cea mai mare valoare.',
    recap: 'Pe un interval, dreapta se taie la un segment sau la o semidreaptă. Capetele urmează paranteza intervalului. De pe grafic citești domeniul, valorile, imaginea unui punct și soluțiile lui f(x) = g(x).'
  }),

  lesson('frecventa', 'Sortare și frecvență', {
    figure: 'frequency-bars',
    formulas: ['frecvența absolută numără aparițiile', 'datele se ordonează înainte de mediană', 'variabila poate fi numerică sau calitativă'],
    theory: 'Plan principal. O populație statistică este grupul pe care îl studiezi: elevii din clasă, biletele vândute, temperaturile dintr-o săptămână. O unitate este un element al populației. Variabila, sau caracteristica, este ce măsori la fiecare unitate. Poate fi numerică, ca nota sau înălțimea. Poate fi calitativă, ca culoarea sau mijlocul de transport.\n\nDatele numerice se ordonează crescător când vrei să vezi mijlocul sau întinderea. Ordinea din caietul de culegere nu este ordinea de lucru.\n\nFrecvența absolută a unei valori este de câte ori apare. La notele 7, 8, 7 și 10, frecvența lui 7 este 2, iar a lui 8 este 1. Nu o transformăm aici într-un alt nume de frecvență. Spunem doar de câte ori apare.',
    example: 'Într-o clasă, culorile preferate sunt albastru, verde, albastru și roșu. Variabila este calitativă. Frecvența lui albastru este 2. La numerele 3, 7, 7, 10 și 13, frecvența lui 7 este 2, iar a lui 3 este 1. Șirul este deja ordonat.',
    practice: '1. Frecvența lui 7 în lista 3, 7, 7, 10, 13. 2. Culoarea este variabilă numerică sau calitativă? 3. De ce ordonezi datele înainte să cauți mijlocul?\n\nRăspunsuri: 2. Calitativă. Ca să vezi valoarea din mijloc, nu pe cea scrisă la întâmplare.',
    mistakes: 'Nu confunda populația cu variabila. Nu spune că frecvența este valoarea însăși. Nu lăsa datele neordonate când cauți mediana.',
    tryThis: 'Notează cinci note imaginare între 4 și 10. Ordonează-le și scrie frecvența fiecărei note diferite.',
    recap: 'Populația este grupul, unitatea este elementul, variabila este ce măsori. Frecvența absolută spune de câte ori apare o valoare. Ordonarea pregătește mediana.'
  }),

  lesson('tabel-diagrame', 'Tabel, bare și poligon', {
    figure: 'frequency-bars',
    formulas: ['în tabel, valoarea stă lângă frecvență', 'barele au înălțimea frecvenței', 'poligonul unește vârfurile'],
    theory: 'Plan principal. Tabelul de frecvențe are două coloane: valoarea și frecvența absolută. Suma frecvențelor este numărul de unități.\n\nCând valorile sunt multe, le grupezi în clase. O clasă este un interval de valori, de exemplu de la 0 până la 10, fără 10, apoi de la 10 până la 20, fără 20. Fiecare dată intră într-o singură clasă. Frecvența clasei numără datele din ea.\n\nDiagrama cu bare are câte o bară pentru fiecare valoare sau clasă. Înălțimea barei este frecvența. Diagrama circulară arată partea din întreg: unghiul sau felia este ponderea în procente. 1/4 din total este 25%.\n\nGraficul care duce valoarea în frecvență pune pe orizontală valoarea și pe verticală frecvența. Poligonul frecvențelor unește cu segmente vârfurile barelor sau punctele acestui grafic. Nu este graficul unei funcții de forma ax + b. Este desenul datelor.',
    example: 'Notele 6, 6, 8, 8, 8 și 10 dau tabelul: 6 de două ori, 8 de trei ori, 10 o dată. Suma frecvențelor este 6. Bara lui 8 este cea mai înaltă. 8 este jumătate din cele 6 note, deci 50% pe o diagramă circulară. 3/6 = 1/2.',
    practice: '1. Suma frecvențelor pentru 6, 6, 8, 8, 8, 10. 2. Ce înălțime are bara unei valori? 3. 1/4 dintr-un disc este cât la sută?\n\nRăspunsuri: 6. Frecvența. 25%.',
    mistakes: 'Nu pune înălțimea barei egală cu valoarea, dacă axa verticală este frecvența. Nu lași o dată în două clase. Nu numi poligonul frecvențelor dreapta unei funcții ax + b.',
    tryThis: 'Fă tabelul pentru valorile 2, 2, 5, 5, 5. Desenează trei bare și spune ce procent este valoarea 5.',
    recap: 'Tabelul așază valoarea lângă frecvență. Clasele grupează valorile multe. Barele, discul și poligonul arată aceleași frecvențe, în desene diferite.'
  }),

  lesson('indicatori', 'Media, mediana, modul și amplitudinea', {
    figure: 'frequency-bars',
    formulas: ['media = suma împărțită la numărul de valori', 'mediana este mijlocul după ordonare', 'amplitudinea = maxim − minim'],
    theory: 'Plan principal. Amplitudinea este maximul minus minimul. Spune cât de întins este setul. Nu este media.\n\nMedia aritmetică este suma valorilor împărțită la câte sunt. Dacă ai frecvențe, media ponderată înmulțește fiecare valoare cu frecvența ei, adună și împarte la suma frecvențelor. Este aceeași medie, scrisă mai scurt.\n\nMediana se caută după ordonare. Dacă numărul de valori este impar, mediana este valoarea din mijloc. Dacă este par, mediana este media celor două valori din mijloc.\n\nModul este valoarea cu frecvența cea mai mare. Poate să nu fie unic, când două valori apar de același număr maxim de ori.\n\nO valoare extremă trage media mai tare decât mediana. La salariile 3, 4, 4, 5 și 20, în mii, media este 36/5 = 7,2, iar mediana este 4. Mediana rămâne la mijlocul șirului. Media urcă din cauza lui 20.',
    example: 'Datele 3, 7, 7, 10 și 13 au suma 40. Media este 8. Șirul este ordonat și are 5 valori, deci mediana este 7. Media minus mediana este 1. Modul este 7. Setul 2, 9, 4, 9, 1 și 6, ordonat, este 1, 2, 4, 6, 9, 9. Mijlocul par este (4 + 6)/2 = 5. Fără 20, din 3, 5, 20 și 8 rămân 3, 5 și 8. Amplitudinea este 8 − 3 = 5.',
    practice: '1. Media minus mediana pentru 3, 7, 7, 10, 13. 2. Mediana lui 2, 9, 4, 9, 1, 6. 3. Amplitudinea lui 3, 5 și 8.\n\nRăspunsuri: 1. 5. 5.',
    mistakes: 'Nu calcula mediana înainte să ordonezi. Nu împărți media la 2 încă o dată. Nu spune că modul este mereu unic. Nu confunda amplitudinea cu media.',
    tryThis: 'Adaugă 30 la setul 4, 4, 4. Calculează media și mediana înainte și după. Spune care indicator s-a mișcat.',
    recap: 'Amplitudinea este maxim minus minim. Media împarte suma la numărul de valori. Mediana este mijlocul șirului ordonat. Modul este valoarea cea mai frecventă și poate să nu fie unic. Extremele mișcă media mai tare decât mediana.'
  }),

  lesson('recap-functii', 'Recapitulare: funcții și statistică', {
    figure: 'axes',
    formulas: ['un x, un singur f(x)', 'f(x) = ax + b are graficul o dreaptă', 'mediană după ordonare'],
    theory: 'Plan principal. Funcția f: A → B dă fiecărui x exact un y. O descrii prin diagramă, tabel, formulă sau porțiuni. Graficul este mulțimea perechilor (x, f(x)). Un punct stă pe grafic doar dacă ordonata este f(x).\n\nf(x) = ax + b are graficul o dreaptă când domeniul este ℝ. a spune cu cât se schimbă f când x crește cu 1. b este f(0). Pe un interval, dreapta se taie la segment sau la semidreaptă, cu capete pline sau goale. f(x) = g(x) se citește la intersecție.\n\nLa date, populația și variabila se separă. Frecvența absolută numără aparițiile. Tabelul, barele, discul și poligonul arată aceleași numere. Amplitudinea este maxim minus minim. Media poate fi ponderată cu frecvențele. Mediana cere ordonare. Modul poate să nu fie unic. O valoare foarte mare mișcă media și lasă mediana mai aproape de mijloc.',
    example: 'f(x) = −2x + 7. f(3) = 1 și f(x) = 5 dă x = 1. Pentru 3, 7, 7, 10 și 13, media este 8 și mediana este 7, diferența este 1. Mediana lui 1, 2, 4, 6, 9 și 9 este 5. Amplitudinea lui 3, 5 și 8 este 5.',
    practice: '1. f(x) = x + 1. f(4). 2. Media lui 2, 4 și 6. 3. Amplitudinea lui 3, 5 și 9.\n\nRăspunsuri: 5. 4. 6.',
    mistakes: 'Nu da două valori aceluiași x. Nu numi schimbarea lui a printr-un termen care nu este în lecție. Nu uita ordonarea la mediană.',
    tryThis: 'Scrie o funcție ax + b, calculează două puncte și spune unde taie axa verticală. Apoi ia trei numere, ordonează-le și scrie media, mediana și amplitudinea.',
    recap: 'Funcția leagă un x de un singur f(x), iar f(x) = ax + b se desenează ca dreaptă sau ca bucată de dreaptă. Statistica rezumă un set prin frecvență, medie, mediană, mod și amplitudine.'
  })
];

module.exports = { FUNCTII_LESSONS };
