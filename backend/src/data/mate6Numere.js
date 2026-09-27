// Capitolele III și IV din Matematică, clasa a VI-a, Litera, A1498 (2023):
// ℤ, apoi ℚ. Rămân în același capitol al aplicației.
// Text original. Inecuațiile în ℚ nu sunt lecție separată în manual.

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

const NUMERE_LESSONS = [
  lesson('multime-intregi', 'Mulțimea numerelor întregi', {
    figure: 'integer-line',
    formulas: ['ℕ ⊂ ℤ', 'ℤ* = ℤ fără 0'],
    theory: 'Numerele naturale nu ajung când cobori sub zero: temperatura de −3 °C, un etaj sub sol, un sold datorat. Numerele întregi sunt naturalele și opusele lor negative, împreună cu zero.\n\nℤ = {…, −3, −2, −1, 0, 1, 2, 3, …}. ℤ* este ℤ fără 0. Orice natural este întreg, deci ℕ ⊂ ℤ.\n\nAxa are originea 0, sensul pozitiv spre dreapta și o unitate de măsură. Întregii pozitivi stau la dreapta lui 0. Întregii negativi stau la stânga. Zero nu este nici pozitiv, nici negativ.',
    example: '−5 este întreg negativ. 5 este întreg pozitiv și este și natural. 0 ∈ ℤ, dar 0 ∉ ℤ*. Pe axă, −2 este la stânga lui 0, la două unități.',
    practice: '1. −4 este natural? 2. 7 este întreg? 3. Cel mai mic întreg pozitiv.\n\nRăspunsuri: nu. Da. 1.',
    mistakes: 'Nu spune că un număr negativ este „mai mic ca mărime” doar pentru că are minus. Pe axă, stânga înseamnă mai mic. Nu scoate pe 0 din ℤ.',
    tryThis: 'Scrie temperaturile −2 °C, 0 °C și 3 °C pe o axă desenată de tine. Spune care este cea mai mică.',
    recap: 'ℤ continuă naturalele spre stânga, dincolo de zero. ℕ este inclus în ℤ. Pe axă, pozitivele sunt la dreapta, negativele la stânga.'
  }),

  lesson('modul-comparare', 'Modulul și compararea', {
    figure: 'integer-line',
    formulas: ['Opusul lui a este −a', 'a + (−a) = 0', '|a| este distanța de la a la 0', '|x| = a, cu a > 0, are soluțiile x = a și x = −a'],
    theory: 'Opusul lui a este numărul care, adunat cu a, dă 0. Opusul lui 4 este −4. Opusul lui −4 este 4. Opusul lui 0 este 0.\n\nModulul lui a, scris |a|, este distanța de la a la 0 pe axă. Este 0 sau un număr pozitiv. |−5| = 5 și |5| = 5.\n\nPe axă, numărul mai din dreapta este mai mare. Un pozitiv este mai mare decât un negativ. Între două negative, este mai mare cel cu modulul mai mic: −2 > −7, pentru că −2 este mai la dreapta.\n\nOrdonezi crescător de la stânga la dreapta și descrescător invers. Ecuația |x| = a, cu a natural nenul, are două soluții întregi: a și −a. |x| = 0 are soluția 0. |x| = −3 nu are soluție, pentru că distanța nu este negativă.',
    example: '|−5| − |3 − 8| + |−2|. 3 − 8 = −5, deci |−5| = 5. Calculul este 5 − 5 + 2 = 2. Numerele −4, 2, −1, 0 se ordonează −4, −1, 0, 2. |x| = 3 dă x = 3 sau x = −3.',
    practice: '1. |−9|. 2. Care este mai mare, −1 sau −6? 3. Soluțiile lui |x| = 4 în ℤ.\n\nRăspunsuri: 9. −1. 4 și −4.',
    mistakes: 'Nu șterge minusul și să crezi că modulul schimbă numărul de pe axă: |−5| este distanța, nu „−5 a devenit locul lui 5”. Nu spune că −8 > −3. Nu căuta soluție la modul egal cu un negativ.',
    tryThis: 'Pune pe axă −3 și 3. Măsoară ambele distanțe până la 0 și scrie modulul fiecăruia. Apoi ordonează −3, 3, 0, −1.',
    recap: 'Opusul adus la zero schimbă semnul. Modulul este distanța până la zero. Compari pe axă: dreapta este mai mare. |x| = a dă două soluții când a este pozitiv.'
  }),

  lesson('adunare-intregi', 'Adunarea și scăderea în ℤ', {
    figure: 'integer-line',
    formulas: ['Scăderea: a − b = a + (−b)', '0 este element neutru'],
    theory: 'Aduni două întregi cu același semn punând semnul comun și adunând modulele. 3 + 5 = 8 și (−3) + (−5) = −8.\n\nLa semne diferite, semnul rezultatului este semnul modulului mai mare, iar mărimea este diferența modulelor. 7 + (−2) = 5. (−7) + 2 = −5.\n\nPe axă, un pozitiv te mută la dreapta, un negativ la stânga.\n\nAdunarea este comutativă și asociativă. 0 este element neutru: a + 0 = a. Opusul este numărul care dă suma 0.\n\nScăderea este adunarea cu opusul scăzătorului: a − b = a + (−b). De aceea 4 − (−4) = 4 + 4 = 8.',
    example: '(−7) + 12 + (−9) − (−4). (−7) + 12 = 5. 5 + (−9) = −4. −4 − (−4) = −4 + 4 = 0.',
    practice: '1. (−3) + 5. 2. (−6) + (−2). 3. 2 − (−8).\n\nRăspunsuri: 2. −8. 10.',
    mistakes: 'Nu aduna modulele și să păstrezi semnul celui scris primul, când semnele diferă. Nu lăsa două minusuri lipite la scădere: −(−4) este +4. Nu schimba locul termenilor dacă uiți semnul unuia.',
    tryThis: 'Pornește de la 0 pe axă. Fă trei mutări: +4, −7, +2. Scrie suma și punctul unde ai ajuns.',
    recap: 'Același semn: aduni modulele. Semne diferite: scazi modulele și ții semnul celui mai mare. Scăderea este adunare cu opusul. 0 nu schimbă suma.'
  }),

  lesson('inmultire-intregi', 'Înmulțirea în ℤ', {
    formulas: ['Semne la fel: plus', 'Semne diferite: minus', 'a · 0 = 0', 'a · 1 = a'],
    theory: 'Întâi înmulțești modulele. Apoi pui semnul. Semne la fel dau plus. Semne diferite dau minus. (−3) · 4 = −12. (−3) · (−4) = 12.\n\nÎnmulțirea este comutativă și asociativă. 1 este element neutru. Înmulțirea se distribuie față de adunare și față de scădere: a · (b + c) = a · b + a · c.\n\nProdusul cu 0 este 0. Dacă un produs de întregi este 0, măcar un factor este 0.',
    example: '(−2) · 4 = −8. (−5) · (−3) = 15. (−2) · (4 + (−6)) = (−2) · (−2) = 4. Același rezultat: (−2) · 4 + (−2) · (−6) = −8 + 12 = 4.',
    practice: '1. (−6) · 3. 2. (−4) · (−5). 3. 7 · 0.\n\nRăspunsuri: −18. 20. 0.',
    mistakes: 'Nu pui minus doar pentru că vezi un minus în exercițiu. Numără semnele negative: un număr par de factori negativi dă plus. Nu distribui uitând semnul din față.',
    tryThis: 'Calculează (−3) · (2 − 5) în două feluri: întâi paranteza, apoi distribuția. Rezultatele trebuie să coincidă.',
    recap: 'Mărimea vine din module. Semnul vine din regula semnelor. 1 lasă numărul pe loc. 0 face produsul zero. Distribuția îți desface paranteza.'
  }),

  lesson('impartire-intregi', 'Împărțirea în ℤ', {
    formulas: ['Aceeași regulă a semnelor ca la înmulțire', 'Împărțirea la 0 nu are sens', 'a | b în ℤ dacă există un întreg c cu b = a · c'],
    theory: 'Împarți în ℤ când deîmpărțitul este multiplu al împărțitorului, adică împărțirea este exactă. Semnul câtului urmează regula de la înmulțire: semne la fel dau plus, semne diferite dau minus.\n\n(−12) : 3 = −4. (−12) : (−3) = 4. 12 : (−3) = −4.\n\nÎmpărțirea la 0 nu are sens. Nu există un întreg care, înmulțit cu 0, să dea un număr nenul. 0 : 0 nu se definește nici el aici.\n\nÎn ℤ, divizorii unui număr vin în perechi de semne. Divizorii lui 6 sunt −6, −3, −2, −1, 1, 2, 3, 6. Multiplii continuă și spre negative.',
    example: '(−24) : (−6) = 4, pentru că (−6) · 4 = −24. 15 : (−5) = −3. 0 : (−7) = 0. (−8) : 0 nu se calculează.',
    practice: '1. (−18) : 6. 2. (−18) : (−9). 3. Câți divizori întregi are 4?\n\nRăspunsuri: −3. 2. 6, și anume −4, −2, −1, 1, 2, 4.',
    mistakes: 'Nu împărți la 0. Nu păstra semnul deîmpărțitului fără să te uiți la împărțitor. Nu lista doar divizorii pozitivi când ți se cer divizorii din ℤ.',
    tryThis: 'Alege un întreg nenul și scrie toți divizorii lui întregi, cu plus și cu minus. Verifică fiecare prin înmulțire.',
    recap: 'Împărțirea exactă în ℤ folosește regula semnelor. La 0 nu împărți. Divizorii întregi sunt cei pozitivi și opușii lor.'
  }),

  lesson('puteri-intregi', 'Puterea unui număr întreg', {
    formulas: ['a^n = a · a · … · a, de n ori, n ≥ 1', 'a^0 = 1 pentru a ≠ 0', 'a^1 = a', '(−a)^(par) este pozitiv', '(−a)^(impar) este negativ'],
    theory: 'Puterea cu exponent natural nenul a unui întreg nenul este baza înmulțită cu ea însăși de atâtea ori cât spune exponentul. a^1 = a. a^0 = 1 dacă a nu este 0. 0^0 nu se folosește aici.\n\nDacă baza este negativă, semnul depinde de exponent. Exponent par: rezultat pozitiv, pentru că semnele se grupează în perechi. Exponent impar: rezultat negativ.\n\nRegulile cunoscute rămân, pentru exponenți naturali și baze nenule: a^n · a^m = a^(n+m), a^n : a^m = a^(n−m) când n ≥ m, (a^n)^m = a^(n·m), (a · b)^n = a^n · b^n.',
    example: '(−2)^4 = 16. (−2)^3 = −8. (−2)^5 : (−2)^2 = (−2)^3 = −8, pentru că 5 − 2 = 3. (−3)^0 = 1.',
    practice: '1. (−1)^7. 2. (−5)^2. 3. 4^3 : 4^1.\n\nRăspunsuri: −1. 25. 4^2 = 16.',
    mistakes: 'Nu calcula (−2)^4 ca −16. Paranteza ține semnul în bază. Nu scrie −2^4 când vrei puterea lui −2: fără paranteză, minusul poate sta în fața puterii lui 2. Nu împărți puteri când exponentul de sus este mai mic, în lecția asta, fără să treci la exponenți negativi.',
    tryThis: 'Calculează (−1) la puterile 1, 2, 3 și 4. Scrie regula semnelor pe care o vezi.',
    recap: 'Exponentul numără factorii. La bază negativă, par înseamnă plus și impar înseamnă minus. a^0 = 1 pentru a nenul. La înmulțire aduni exponenții, la împărțire îi scazi, la putere de putere îi înmulțești.'
  }),

  lesson('calcule-intregi', 'Calcule cu adunări și scăderi', {
    formulas: ['+(a + b) = a + b', '−(a + b) = −a − b', '−(a − b) = −a + b'],
    theory: 'La sume lungi grupezi termenii care se anulează: un număr și opusul lui. Poți aduna separat pozitivele și negativele, apoi combina rezultatele.\n\nParanteza precedată de plus se desface cu semnele din interior. Paranteza precedată de minus schimbă semnul fiecărui termen din interior.\n\nO sumă cu semne alternante se poate grupa din doi în doi. De exemplu, (1 − 1) + (1 − 1) dă zero pe perechi.',
    example: '8 + (−3) + (−8) + 3 = (8 + (−8)) + ((−3) + 3) = 0. −(4 − 9) = −4 + 9 = 5. Suma 1 − 2 + 3 − 4 + 5 − 6 = (1 − 2) + (3 − 4) + (5 − 6) = (−1) + (−1) + (−1) = −3.',
    practice: '1. (−5) + 9 + 5 + (−9). 2. −(2 − 6). 3. 10 − 10 + 4.\n\nRăspunsuri: 0. 4. 4.',
    mistakes: 'Nu schimba semnul doar la primul termen din paranteza cu minus. Nu pierde un termen când grupezi. Nu aduna un număr cu opusul lui și să lași un rest.',
    tryThis: 'Scrie patru termeni care se anulează doi câte doi și un termen care rămâne. Calculează suma și spune ce ai grupat.',
    recap: 'Grupează opușii. Plusul din fața parantezei păstrează semnele. Minusul din fața parantezei le schimbă pe toate. Perechile cu semne alternante se pot strânge înainte de total.'
  }),

  lesson('ordine-intregi', 'Ordinea operațiilor în ℤ', {
    formulas: ['Întâi parantezele, de la cele mai dinăuntru', 'Apoi puterile', 'Apoi înmulțirile și împărțirile', 'La urmă adunările și scăderile'],
    theory: 'Fără paranteze, faci întâi puterile, apoi înmulțirile și împărțirile, de la stânga la dreapta, apoi adunările și scăderile, de la stânga la dreapta.\n\nParantezele rotunde se rezolvă înaintea celor drepte, iar cele drepte înaintea acoladelor, adică din interior spre exterior.\n\nSemnul din fața unei puteri sau al unui produs se aplică după ce ai aflat mărimea, dacă parantezele nu îl trag înăuntru.',
    example: '2 + (−3) · 4^1. Puterea: 4. Înmulțirea: (−3) · 4 = −12. Adunarea: 2 + (−12) = −10. Cu paranteză: (2 + (−3)) · 4 = (−1) · 4 = −4. Paranteza a schimbat rezultatul.',
    practice: '1. (−2)^2 + 3. 2. −2^2 + 3, adică minus puterea lui 2, plus 3. 3. 12 : (−3) · (−1).\n\nRăspunsuri: 4 + 3 = 7. −4 + 3 = −1. Întâi 12 : (−3) = −4, apoi (−4) · (−1) = 4.',
    mistakes: 'Nu face adunarea înaintea înmulțirii. Nu trata −2^2 ca (−2)^2 dacă minusul nu este în paranteză. Nu sări de la dreapta la stânga la înmulțiri și împărțiri.',
    tryThis: 'Scrie același calcul cu și fără o paranteză. Arată că rezultatele diferă și spune ce operație a fost mutată.',
    recap: 'Parantezele comandă. Apoi puterile, apoi înmulțirea cu împărțirea, apoi adunarea cu scăderea. Minusul din afara puterii nu intră în bază fără paranteză.'
  }),

  lesson('ecuatii-intregi', 'Ecuații în ℤ', {
    formulas: ['x + a = b', 'x − a = b', 'a · x = b', 'x : a = b, cu a ≠ 0', 'a · x + b = c'],
    theory: 'O ecuație în ℤ cere un întreg care face egalitatea adevărată. La x + a = b scazi a din ambele părți, sau aduni opusul. La x − a = b aduni a. La a · x = b, cu a ≠ 0, împărți la a doar dacă b se împarte exact la a în ℤ. La x : a = b înmulțești cu a.\n\nLa a · x + b = c muți întâi termenul fără x. Ce faci într-o parte faci și în cealaltă.\n\nMulțimea soluțiilor poate avea un element, mai multe, sau niciunul. Dacă împărțirea nu este exactă în ℤ, ecuația nu are soluție în ℤ, chiar dacă ar avea în fracții. După ce afli x, îl pui înapoi în ecuația inițială.',
    example: '3x − 8 = −2x + 7. 3x + 2x = 7 + 8, deci 5x = 15 și x = 3. Verificare: 3 · 3 − 8 = 1 și −2 · 3 + 7 = 1. Ecuația 2x = 5 nu are soluție în ℤ, pentru că 5 nu se împarte exact la 2.',
    practice: '1. x + (−4) = 6. 2. 4x = −12. 3. 3x = 4 are soluție în ℤ?\n\nRăspunsuri: x = 10. x = −3. Nu.',
    mistakes: 'Nu trece un termen în partea cealaltă fără să-i schimbi semnul, dacă îl muți prin adunarea opusului. Nu accepta un cât care nu este întreg când lucrezi în ℤ. Nu sări verificarea.',
    tryThis: 'Scrie o ecuație x + a = b cu soluția x = −2. Verifică înlocuind. Apoi scrie una de forma 2x = b fără soluție în ℤ.',
    recap: 'Operația inversă îl scoate pe x. În ℤ, înmulțirea trebuie să se împartă exact. Fără soluție este un răspuns corect. Verificarea închide calculul.'
  }),

  lesson('inecuatii-intregi', 'Inecuații în ℤ', {
    figure: 'integer-line',
    formulas: ['La înmulțirea sau împărțirea cu un negativ, sensul inegalității se schimbă'],
    theory: 'O inecuație cere toți întregii care fac o inegalitate adevărată. Poți lucra în ℤ sau într-o submulțime, de exemplu în ℕ, dacă enunțul o spune.\n\nAduni sau scazi același întreg în ambele părți și sensul rămâne. Înmulțești sau împarți cu un pozitiv și sensul rămâne. Înmulțești sau împarți cu un negativ și sensul se schimbă: < devine >, ≤ devine ≥.\n\nSoluția este o mulțime, nu mereu un singur număr. Pe axă o vezi ca o porțiune de puncte întregi.',
    example: 'x + 3 < 1, în ℤ. x < 1 − 3, deci x < −2. Soluțiile sunt −3, −4, −5 și tot așa. −2x ≤ 4. Împarți la −2 și schimbi sensul: x ≥ −2. În ℤ: −2, −1, 0, 1, 2, …',
    practice: '1. x − 2 ≥ 4, cel mai mic întreg x. 2. −x < 3. Care este sensul după înmulțirea cu −1? 3. 2x ≤ 7, cel mai mare întreg x.\n\nRăspunsuri: 6. x > −3. 3, pentru că x ≤ 3,5 nu este întreg, iar 4 · 2 = 8 trece de 7.',
    mistakes: 'Nu păstra sensul când înmulțești cu un negativ. Nu da un singur număr dacă inecuația are o infinitate de soluții, decât dacă ți se cere cel mai mic sau cel mai mare. Nu uita mulțimea în care lucrezi.',
    tryThis: 'Rezolvă x + 1 > 3 în ℕ și apoi în ℤ. Scrie cum diferă mulțimile, chiar dacă inegalitatea este aceeași.',
    recap: 'Inecuația dă o mulțime de întregi. Adunarea păstrează sensul. Înmulțirea cu un negativ îl schimbă. Spui în ce mulțime cauți soluțiile.'
  }),

  lesson('probleme-intregi', 'Probleme cu ecuații în ℤ', {
    formulas: ['Alegi necunoscuta', 'Scrii ecuația sau inecuația', 'Rezolvi', 'Verifici în poveste'],
    theory: 'Într-o problemă, x este un număr întreg cu înțeles: o temperatură, un etaj, un punctaj, o datorie. Îl alegi tu și scrii ce înseamnă.\n\nTraduci propozițiile într-o ecuație sau într-o inecuație. O rezolvi în ℤ. Apoi verifici dacă numărul are sens în poveste: un număr de etaje poate fi negativ dacă socotești subsolul, dar un număr de persoane nu.',
    example: 'Într-un joc, Ana are cu 7 puncte mai puțin decât Paul. Împreună au 13 puncte. Fie x punctele lui Paul. Ana are x − 7. x + (x − 7) = 13, deci 2x = 20 și x = 10. Ana are 3. Verificare: 10 + 3 = 13 și 10 − 3 = 7.',
    practice: '1. Un număr întreg, mărit cu 9, dă 4. Care este numărul? 2. Dublul unui întreg este −14. Care este întregul? 3. De ce 2x = 7 nu poate fi numărul de teme întregi gata?\n\nRăspunsuri: −5. −7. Pentru că 7 nu se împarte exact la 2 în ℤ.',
    mistakes: 'Nu alege x fără să spui ce este. Nu verifica doar în ecuație și să ignori sensul: un rezultat negativ pentru un număr de elevi nu se acceptă. Nu sări de la enunț la rezultat fără relație.',
    tryThis: 'Scrie o problemă cu temperatura de dimineață și cea de la prânz, în care apare un număr negativ. Rezolv-o cu o ecuație și verifică.',
    recap: 'Necunoscuta are înțeles. Ecuația traduce povestea. Soluția se verifică și în calcul, și în situație. Dacă nu este în mulțimea cerută, spui că problema nu are soluție acolo.'
  }),

  lesson('recap-intregi', 'Recapitulare: numere întregi', {
    figure: 'integer-line',
    formulas: ['|a| este distanța la 0', 'Semne la fel: plus', 'Semne diferite: minus'],
    theory: 'ℤ extinde naturalele cu negativele. Pe axă compari, iar modulul măsoară distanța până la zero. Adunarea mută punctul. Scăderea adună opusul. Înmulțirea și împărțirea exactă folosesc regula semnelor. Puterea unei baze negative depinde de paritatea exponentului.\n\nParantezele și ordinea operațiilor rămân. Ecuația caută întregi care egalizează. Inecuația caută o mulțime și schimbă sensul la înmulțirea cu un negativ.',
    example: '(−2)^3 + |−4| = −8 + 4 = −4. x + 5 = 1 dă x = −4. −2x < 6 dă x > −3, după schimbarea sensului.',
    practice: '1. (−3) · (−4). 2. |−2| + (−5). 3. x : (−2) = 6.\n\nRăspunsuri: 12. −3. x = −12.',
    mistakes: 'Nu împărți la 0. Nu uita schimbarea sensului la inecuație. Nu confunda −2^2 cu (−2)^2.',
    tryThis: 'Fă un șir de cinci calcule: o comparație, un modul, o sumă, un produs și o ecuație. La fiecare scrie regula.',
    recap: 'Minusul este direcție. Modulul este distanță. Semnele la produs și la cât se decid separat de mărime. Ecuația și inecuația se verifică în ℤ.'
  }),

  lesson('numar-rational', 'Numărul rațional', {
    formulas: ['ℚ este mulțimea fracțiilor de întregi cu numitor nenul', 'ℕ ⊂ ℤ ⊂ ℚ', 'a/b = c/d dacă a · d = b · c'],
    theory: 'Fracțiile echivalente arată același număr. Numărul rațional este toată familia de fracții echivalente. Reprezentantul ireductibil este fracția din familie care nu se mai simplifică, cu numitor pozitiv.\n\nℚ conține aceste numere. ℚ* este ℚ fără 0. ℚ₊ sunt raționalele pozitive. ℚ₋ sunt raționalele negative. Ai incluziunile ℕ ⊂ ℤ ⊂ ℚ, pentru că n = n/1.\n\nUn rațional se scrie și ca zecimală finită sau periodică, simplă ori mixtă. Drumul înapoi, de la zecimală la fracție, îți dă reprezentantul ca raport de întregi. 1/4 = 0,25. 1/3 = 0,(3). 1/6 = 0,1(6).',
    example: '−6/8 este același rațional cu −3/4, pentru că (−6) · 4 = 8 · (−3). Reprezentantul ireductibil este −3/4. 0,5 = 1/2. 5 = 5/1, deci 5 ∈ ℚ.',
    practice: '1. −2/4 și −1/2 sunt același rațional? 2. 0 este rațional? 3. Scrie 0,2 ca fracție ireductibilă.\n\nRăspunsuri: da. Da, 0/1. 1/5.',
    mistakes: 'Nu trata două scrieri echivalente ca pe două numere diferite. Nu pune numitorul 0. Nu spune că o zecimală periodică „nu este fracție”: ea este un rațional, doar scrierea diferă.',
    tryThis: 'Scrie trei fracții echivalente cu 2/5, una dintre ele cu numitor negativ. Spune care este reprezentantul ireductibil.',
    recap: 'Raționalul este clasa fracțiilor echivalente. Îl scrii ireductibil, cu numitor pozitiv, sau ca zecimală finită ori periodică. Naturalele și întregii sunt raționale.'
  }),

  lesson('axa-rational', 'Axa și modulul în ℚ', {
    figure: 'fraction-line',
    formulas: ['|a/b| = |a|/|b|', 'Opusul lui a/b este −a/b'],
    theory: 'Pe axă, unitatea se împarte în părți egale cu numitorul. Fracția a/b, cu b pozitiv, înseamnă a pași de câte 1/b din origine, spre dreapta dacă a este pozitiv și spre stânga dacă a este negativ. Zecimala se așază la fel, după valoarea ei.\n\nFracțiile echivalente stau în același punct. Opusele stau la fel de departe de 0, de o parte și de alta.\n\nModulul unui rațional este distanța până la 0. |−3/4| = 3/4. Ecuația |x| = 1/2 are soluțiile 1/2 și −1/2. |x| = −1/2 nu are soluție.',
    example: '−1/2 și −2/4 sunt același punct, la stânga lui 0. |−1/2| = 1/2. Opusul lui −1/2 este 1/2. 0,5 stă în același loc cu 1/2.',
    practice: '1. |−5/2|. 2. Opusul lui 3/7. 3. Soluțiile lui |x| = 2/3.\n\nRăspunsuri: 5/2. −3/7. 2/3 și −2/3.',
    mistakes: 'Nu pune −1/2 la dreapta lui 0. Nu crede că −2/4 este „mai la stânga” decât −1/2: sunt același punct. Nu dai modulului un semn minus.',
    tryThis: 'Împarte unitatea în patru și marchează 3/4 și −3/4. Scrie modulele și spune că sunt egale.',
    recap: 'Raționalul are un loc pe axă. Echivalentele se suprapun. Modulul este distanța până la origine. Ecuația cu modul dă două soluții când numărul din dreapta este pozitiv.'
  }),

  lesson('comparare-rational', 'Compararea numerelor raționale', {
    figure: 'fraction-line',
    formulas: ['La același numitor pozitiv, compari numărătorii', 'Două negative: este mai mare cel cu modulul mai mic'],
    theory: 'Aduci fracțiile la același numitor pozitiv, de preferat c.m.m.m.c., și compari numărătorii. Poți compara și prin scrierea zecimală, sau direct pe axă: dreapta este mai mare.\n\nUn pozitiv este mai mare decât un negativ. Între două negative, le compari modulele și inversezi concluzia: modulul mai mic înseamnă număr mai mare, pentru că este mai aproape de zero, dinspre stânga.\n\nOrdonezi crescător spre dreapta. Un rațional se încadrează între doi întregi consecutivi: partea întreagă și întregul următor, sau cei doi întregi între care stă.',
    example: '−3/4 și −1/2. −1/2 = −2/4. −2 > −3, deci −2/4 > −3/4. Pe axă, −1/2 este la dreapta lui −3/4. 7/3 = 2,(3) este între 2 și 3.',
    practice: '1. Care este mai mare, 2/3 sau 3/5? 2. Care este mai mare, −2/3 sau −1/5? 3. Între ce întregi consecutivi este 5/2?\n\nRăspunsuri: 2/3 = 10/15 și 3/5 = 9/15, deci 2/3. −1/5, pentru că este mai aproape de zero. 2 și 3.',
    mistakes: 'Nu compari numitori diferiți uitându-te doar la numărător. Nu spui că −5 < −1 este fals: este adevărat. Nu încadra 5/2 între 5 și 6.',
    tryThis: 'Alege trei fracții, una negativă, și ordonează-le crescător. Verifică pe o axă desenată.',
    recap: 'Același numitor pozitiv decide comparația. Pe axă, dreapta câștigă. La negative, modulul mai mic este numărul mai mare. Încadrarea spune între ce întregi stă numărul.'
  }),

  lesson('adunare-rational', 'Adunarea și scăderea în ℚ', {
    formulas: ['Adu la numitor comun', 'Scăderea este adunare cu opusul'],
    theory: 'Aduni și scazi fracții aducându-le la același numitor, de obicei c.m.m.m.c. al numitorilor pozitivi. Numărătorii se adună sau se scad cu semnele lor. Apoi simplifici.\n\nLa zecimale finite aliniez virgula. Zecimala periodică o transformi în fracție ordinară dacă vrei rezultatul exact.\n\nAdunarea rămâne comutativă și asociativă. 0 este neutru. Opusul există pentru fiecare rațional. a − b = a + (−b).',
    example: '(−3/4) + 5/6. Numitorul comun este 12. −9/12 + 10/12 = 1/12. 1,5 − 2,25 = −0,75. Același calcul: 3/2 − 9/4 = 6/4 − 9/4 = −3/4.',
    practice: '1. 1/2 + (−1/3). 2. −2/5 − 1/5. 3. 0,4 + 0,15.\n\nRăspunsuri: 1/6. −3/5. 0,55.',
    mistakes: 'Nu aduna numitorii între ei. Nu uita semnul numărătorului când îl amplifici. Nu alinia zecimalele la stânga, ci virgulele.',
    tryThis: 'Adună două fracții cu semne diferite, alese de tine. Scrie numitorul comun și rezultatul simplificat.',
    recap: 'Numitor comun, apoi numărătorii cu semn. Scăderea adună opusul. Zecimalele finite se aliniază la virgulă. Periodicele se întorc în fracție pentru rezultatul exact.'
  }),

  lesson('inmultire-rational', 'Înmulțirea și împărțirea în ℚ', {
    formulas: ['(a/b) · (c/d) = (a · c)/(b · d)', 'Împărțirea: înmulțești cu inversul', 'Inversul lui a/b este b/a, dacă a ≠ 0 și b ≠ 0'],
    theory: 'Produsul fracțiilor înmulțește numărătorii între ei și numitorii între ei. Simplifici înainte sau după. Semnul iese din regula semnelor.\n\nÎnmulțirea este comutativă, asociativă, are pe 1 ca neutru și se distribuie față de adunare. Produsul cu 0 este 0.\n\nInversul unui rațional nenul a/b este b/a. Produsul cu inversul este 1. Zero nu are invers.\n\nÎmpărțirea la un rațional nenul este înmulțirea cu inversul. (a/b) : (c/d) = (a/b) · (d/c). Zecimalele finite se înmulțesc și se împart ca la clasa a V-a. Periodicele se transformă în fracții ordinare înainte de calculul exact.',
    example: '(−2/3) · (9/4) = −(2 · 9)/(3 · 4). Simplifici 3 cu 9 și 2 cu 4: −3/2. (−2/3) : (4/5) = (−2/3) · (5/4) = −10/12 = −5/6.',
    practice: '1. (1/2) · (−4/5). 2. Inversul lui −3/7. 3. (2/3) : (4/9).\n\nRăspunsuri: −2/5. −7/3. (2/3) · (9/4) = 3/2.',
    mistakes: 'Nu încrucișa numărătorul cu numitorul la înmulțire: crucea este pentru proporții. Nu împărți la 0. Nu uita să simplifici rezultatul.',
    tryThis: 'Alege o fracție nenulă, scrie inversul și înmulțește-le. Trebuie să obții 1. Apoi împarte aceeași fracție la 1/2 și spune ce s-a întâmplat.',
    recap: 'La produs, sus cu sus și jos cu jos, plus semnul. Inversul răstoarnă fracția nenulă. Împărțirea înmulțește cu inversul. Periodicele se scriu ca fracții ordinare când vrei exact.'
  }),

  lesson('puteri-rational', 'Puterea cu exponent întreg', {
    formulas: ['(a/b)^n = a^n / b^n', 'a^(-n) = 1/a^n = (1/a)^n, pentru a ≠ 0', 'a^0 = 1 pentru a ≠ 0'],
    theory: 'Puterea cu exponent natural a unui rațional nenul urmează regula de la fracții: ridici numărătorul și numitorul la acea putere. Semnul este plus la exponent par și minus la exponent impar, dacă baza este negativă.\n\nExponentul întreg negativ se definește pentru bază nenulă: a^(-n) = 1/a^n, adică (1/a)^n. Asta extinde regulile de calcul la exponenți întregi.\n\na^n · a^m = a^(n+m), a^n : a^m = a^(n−m), (a^n)^m = a^(n·m), (a · b)^n = a^n · b^n, cu bazele nenule când exponenții o cer.\n\nCompari puteri cu aceeași bază pozitivă mai mare decât 1 uitându-te la exponent: exponentul mai mare dă puterea mai mare. La bază între 0 și 1, ordinea exponenților se răstoarnă.',
    example: '(2/3)^2 = 4/9. (1/2)^(-3) = 1/(1/2)^3 = 1/(1/8) = 8. (−1/3)^3 = −1/27. 2^5 : 2^3 = 2^2 = 4. 5^3 > 5^2, dar (1/5)^3 < (1/5)^2.',
    practice: '1. (3/4)^2. 2. 10^(-2). 3. (−2)^(-2).\n\nRăspunsuri: 9/16. 1/100. 1/4, pentru că (−2)^2 = 4 și răstorni.',
    mistakes: 'Nu calcula a^(-n) ca pe un număr negativ. Minusul este la exponent, nu la semn, până nu vezi baza. Nu aplica a^0 = 1 când a este 0. Nu compari puteri cu baze diferite doar după exponent.',
    tryThis: 'Scrie 2^3, 2^0 și 2^(-3) una sub alta. Spune cum treci de la una la alta înmulțind sau împărțind cu 2.',
    recap: 'Exponentul natural ridică și numărătorul, și numitorul. Exponentul negativ răstoarnă baza nenulă și apoi ridică la putere. Regulile de adunare și scădere a exponenților merg și în ℤ, cu baza nenulă.'
  }),

  lesson('ordine-rational', 'Ordinea operațiilor în ℚ', {
    formulas: ['Paranteze, puteri, înmulțiri și împărțiri, adunări și scăderi'],
    theory: 'Ordinea este cea din ℤ: paranteze din interior spre exterior, puteri, înmulțiri și împărțiri de la stânga la dreapta, adunări și scăderi de la stânga la dreapta.\n\nFracțiile etajate se citesc ca numărător peste tot restul de sub bară, sau după parantezele pe care le-ai pus. O bară lungă este o paranteză: tot ce este deasupra se calculează, tot ce este dedesubt se calculează, apoi împărți.\n\nPoți lucra în fracții ordinare sau în zecimale finite. Nu amesteca scrierile la mijlocul unui calcul dacă nu le-ai transformat corect.',
    example: '1/2 + (1/3) · (3/4). Întâi produsul: 1/4. Apoi suma: 1/2 + 1/4 = 3/4. Fracția (1 + 1/2)/(1/2) are sus 3/2 și jos 1/2, deci rezultatul este 3.',
    practice: '1. (1/2)^2 + 1/2. 2. 2/3 · 3/4 + 1/4. 3. (1/5) : (1/5) − 1.\n\nRăspunsuri: 1/4 + 1/2 = 3/4. 1/2 + 1/4 = 3/4. 1 − 1 = 0.',
    mistakes: 'Nu aduna înainte să înmulțești. Nu tăia o bară de fracție etajată fără să vezi tot numitorul. Nu lăsa un exponent negativ neaplicat și să continui ca și cum ar fi pozitiv.',
    tryThis: 'Scrie un calcul cu o putere, o înmulțire și o adunare de fracții. Rezolvă-l în ordine și spune ce ai făcut întâi.',
    recap: 'Aceeași ordine ca la întregi. Bara de fracție grupează. Rezultatul se simplifică. Scrierea aleasă, fracție sau zecimală, se ține până la capătul calculului.'
  }),

  lesson('ecuatii-rational', 'Ecuații în ℚ', {
    formulas: ['x + a = b', 'x · a = b, cu a ≠ 0', 'x : a = b, cu a ≠ 0', 'a · x + b = c'],
    theory: 'În ℚ, aceleași forme de ecuații se rezolvă prin operații inverse. Coeficienții pot fi fracții sau zecimale. De data asta împărțirea la un coeficient nenul are mereu soluție în ℚ, pentru că orice nenul are invers.\n\nx + a = b se rezolvă scăzând a. x · a = b se rezolvă înmulțind cu inversul lui a. x : a = b se rezolvă înmulțind cu a. a · x + b = c scoate întâi pe b, apoi înmulțește cu inversul lui a.\n\nPui soluția înapoi în ecuația de la început.',
    example: '(2/3)x + 1/3 = 1. (2/3)x = 1 − 1/3 = 2/3. x = (2/3) · (3/2) = 1. Verificare: 2/3 + 1/3 = 1. Ecuația 0,5x = 3 dă x = 6.',
    practice: '1. x + 1/4 = 3/4. 2. (3/5)x = 6. 3. x : 2 = −1/2.\n\nRăspunsuri: 1/2. 10, pentru că x = 6 · 5/3. −1.',
    mistakes: 'Nu împărți la coeficientul 0. Nu înmulți doar o parte cu inversul. Nu lăsa rezultatul neamplificat dacă se simplifică. Nu uita verificarea.',
    tryThis: 'Scrie o ecuație în care coeficientul lui x este o fracție subunitară. Rezolv-o și verific-o numeric, cu o zecimală, ca să vezi că ai același x.',
    recap: 'În ℚ, inversul există pentru orice coeficient nenul. Scazi termenul liber, înmulțești cu inversul și verifici. Fracțiile și zecimalele sunt același fel de coeficient, în scrieri diferite.'
  }),

  lesson('probleme-rational', 'Probleme cu ecuații în ℚ', {
    formulas: ['Partea + restul = întregul', 'p% din x = partea'],
    theory: 'Problemele cu fracții dintr-un număr, cu procente, cu vârste sau cu drumuri se scriu ca ecuații în ℚ. Alegi necunoscuta, traduci „o treime din”, „cu 2 ani mai mare” sau „20% din”, rezolvi și verifici în enunț.\n\nLa „rest din rest”, aplici a doua fracție la ce a rămas, nu mereu la întregul de la început. La mișcare, distanța este viteză ori timp, iar unitățile trebuie să fie aceleași.',
    example: 'Un elev citește o carte. În prima zi citește 1/3, în a doua zi 1/4 din toată cartea, și îi mai rămân 25 de pagini. Fie x numărul de pagini. x − x/3 − x/4 = 25. x/3 + x/4 = 4x/12 + 3x/12 = 7x/12. Rămâne x − 7x/12 = 5x/12 = 25, deci x = 60. Verificare: 20 + 15 + 25 = 60.',
    practice: '1. Jumătate dintr-un număr este 9. Care este numărul? 2. 20% dintr-o sumă sunt 10 lei. Care este suma? 3. După ce cheltuiești 1/5 din 40 de lei, cât îți rămâne?\n\nRăspunsuri: 18. 50 de lei. 32 de lei.',
    mistakes: 'Nu aplica a doua fracție la întregul dacă enunțul spune „din rest”. Nu aduna ani și fracții de pagini în aceeași ecuație. Nu uita să verifici că restul este pozitiv când povestea o cere.',
    tryThis: 'Scrie o problemă în care cheltuiești întâi o fracție dintr-o sumă și apoi un procent din rest. Rezolv-o cu o ecuație.',
    recap: 'Fracția dintr-un număr și procentul devin termenii ecuației. Restul este întregul minus părțile folosite. Soluția se citește în unitatea problemei și se verifică.'
  }),

  lesson('recap-numere', 'Recapitulare: numere raționale', {
    formulas: ['ℕ ⊂ ℤ ⊂ ℚ', 'a^(-n) = 1/a^n', 'Inversul înmulțește la împărțire'],
    theory: 'ℚ cuprinde întregii și fracțiile lor, cu numitor nenul. Același număr are mai multe scrieri: fracții echivalente, reprezentant ireductibil, zecimală finită sau periodică. Pe axă stă într-un singur loc. Modulul este distanța până la zero.\n\nOperațiile folosesc numitorul comun, regula semnelor și inversul. Puterea cu exponent negativ răstoarnă baza nenulă. Ordinea operațiilor nu se schimbă. Ecuațiile de forma învățată au soluție în ℚ când coeficientul lui x este nenul.',
    example: '(−1/2) + (3/4) = 1/4. (1/2)^(-2) = 4. (1/3)x = 2 dă x = 6. −0,5 și −1/2 sunt același punct pe axă.',
    practice: '1. Compară −1/2 și −3/4. 2. (2/5) · (5/2). 3. x − 1/5 = 2/5.\n\nRăspunsuri: −1/2 este mai mare. 1. x = 3/5.',
    mistakes: 'Nu despărți un rațional de scrierile lui. Nu trata exponentul negativ ca pe un semn minus în față. Nu căuta inecuații în ℚ în lecțiile acestea: manualul le lasă pentru mai târziu și le-ai lucrat în ℤ.',
    tryThis: 'Alege un rațional negativ. Scrie-l ca fracție, ca opus, ca modul și ca rezultat al unei ecuații simple. Spune ce ai verificat.',
    recap: 'De la ℕ la ℤ și apoi la ℚ, fiecare mulțime o cuprinde pe cea dinainte. Compari pe axă, calculezi cu fracții și cu semne, ridici la puteri întregi și rezolvi ecuații prin operația inversă.'
  })
];

module.exports = { NUMERE_LESSONS };
