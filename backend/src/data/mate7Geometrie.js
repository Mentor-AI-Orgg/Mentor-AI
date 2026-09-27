// Capitolele IV–VII din Matematică, clasa a VII-a, Litera, A1742 (2024):
// patrulaterul, cercul, asemănarea, relații metrice.
// Text original. Linia mijlocie în triunghi și centrul de greutate stau la patrulater.
// Teorema bisectoarei este doar o aplicație a reciprocei lui Thales.
// Nu apar Menelaus, Ceva sau patrulaterul inscriptibil ca lecții.

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

const GEO7_LESSONS = [
  lesson('patrulater-convex', 'Patrulater convex și suma unghiurilor', {
    figure: 'parallelogram',
    formulas: ['suma unghiurilor unui patrulater convex este 360°'],
    theory: 'Un patrulater are patru laturi, patru unghiuri și două diagonale. Vârfurile se notează în ordine, de jur împrejur.\n\nEste convex dacă ambele diagonale stau în interior și fiecare unghi interior este mai mic decât 180°. Este concav dacă un unghi interior este mai mare decât 180° și o diagonală iese în afară.\n\nÎntr-un patrulater convex, suma unghiurilor interioare este 360°. O diagonală îl taie în două triunghiuri. Fiecare triunghi are 180°, deci împreună au 360°.',
    example: 'Un patrulater convex are unghiurile 80°, 100° și 70°. Al patrulea este 360° − 80° − 100° − 70° = 110°. Dacă un unghi ar fi 200°, patrulaterul nu ar fi convex.',
    practice: '1. Suma unghiurilor unui patrulater convex. 2. Trei unghiuri sunt 90°, 90° și 90°. Al patrulea? 3. O diagonală în interior taie patrulaterul în câte triunghiuri?\n\nRăspunsuri: 360°. 90°. Două.',
    mistakes: 'Nu aduna 180° ca la triunghi. Nu numi convex un patrulater cu un unghi mai mare decât 180°. Nu uita că diagonalele unui patrulater convex se taie în interior.',
    tryThis: 'Desenează un patrulater convex și una dintre diagonale. Colorează cele două triunghiuri și adună unghiurile lor ca să vezi de unde vine 360°.',
    recap: 'Patrulaterul convex are diagonalele înăuntru și unghiurile mai mici decât 180°. Suma unghiurilor lui este 360°.'
  }),

  lesson('paralelogram', 'Paralelogramul', {
    figure: 'parallelogram',
    formulas: ['laturile opuse sunt congruente', 'unghiurile opuse sunt congruente', 'unghiurile alăturate sunt suplementare'],
    theory: 'Paralelogramul este patrulaterul cu laturile opuse paralele. Are două perechi de laturi paralele.\n\nLaturile opuse sunt congruente. Unghiurile opuse sunt congruente. Unghiurile alăturate sunt suplementare: suma lor este 180°.\n\nDiagonalele se înjumătățesc. Punctul în care se taie este mijlocul fiecărei diagonale. Nu sunt neapărat egale și nu sunt neapărat perpendiculare.',
    example: 'Într-un paralelogram, un unghi are 70°. Opusul are tot 70°. Alăturatul are 180° − 70° = 110°. Dacă o diagonală are 10 cm, ea se taie în două segmente de 5 cm.',
    practice: '1. Un unghi al paralelogramului este 70°. Cât este opusul? 2. Cât este alăturatul? 3. O diagonală de 14 cm se taie în segmente de cât?\n\nRăspunsuri: 70°. 110°. 7 cm.',
    mistakes: 'Nu spune că toate unghiurile sunt de 90°. Nu spune că diagonalele sunt egale: asta se întâmplă la dreptunghi. Nu lua doar o pereche de laturi paralele și să-i spui paralelogram.',
    tryThis: 'Desenează un paralelogram care nu este dreptunghi. Măsoară unghiurile opuse și verifică dacă alăturatele fac împreună 180°.',
    recap: 'Paralelogramul are opusele paralele și congruente, opusele de unghi congruente, alăturatele suplementare, iar diagonalele se înjumătățesc.'
  }),

  lesson('conditii-paralelogram', 'Condiții pentru paralelogram', {
    figure: 'parallelogram',
    formulas: ['o pereche de laturi paralele și congruente', 'diagonalele se înjumătățesc'],
    theory: 'Ca să dovedești că un patrulater este paralelogram, îți ajunge una dintre aceste condiții.\n\nLaturile opuse sunt congruente, ambele perechi. Sau ai o pereche de laturi care sunt și paralele, și congruente. Sau unghiurile opuse sunt congruente, ambele perechi. Sau diagonalele se înjumătățesc.\n\nO singură pereche de laturi congruente nu ajunge. O singură pereche de unghiuri opuse congruente nu ajunge. Condiția trebuie să fie întreagă.',
    example: 'Patrulaterul ABCD are AB paralel cu CD și AB = CD. Este paralelogram, pentru că o pereche de laturi este și paralelă, și congruentă. Dacă știi doar că AB = CD, fără paralelism, nu poți trage concluzia.',
    practice: '1. Diagonalele unui patrulater se înjumătățesc. Este paralelogram? 2. Două laturi opuse sunt egale, dar nu paralele. Ajunge? 3. Ambele perechi de laturi opuse sunt egale. Ajunge?\n\nRăspunsuri: da. Nu. Da.',
    mistakes: 'Nu folosi jumătate de condiție. Nu confunda „laturi paralele” cu „laturi congruente”: uneori le ceri pe amândouă, la aceeași pereche.',
    tryThis: 'Desenează două segmente care se taie în mijlocul fiecăruia. Unește capetele. Spune de ce figura este paralelogram.',
    recap: 'Paralelogramul se recunoaște după opuse congruente, după o pereche paralelă și congruentă, după unghiuri opuse congruente sau după diagonale care se înjumătățesc.'
  }),

  lesson('linie-mijlocie', 'Linia mijlocie și centrul de greutate', {
    figure: 'triangle-lines',
    formulas: ['linia mijlocie este paralelă cu a treia latură', 'linia mijlocie = latura / 2', 'centrul de greutate taie mediana în raportul 2/1'],
    theory: 'Linia mijlocie în triunghi unește mijloacele a două laturi. Ea este paralelă cu a treia latură și egală cu jumătate din ea.\n\nReciproca: dacă duci prin mijlocul unei laturi paralela la o altă latură, ea taie a treia latură în mijlocul ei.\n\nMedianele se taie într-un singur punct, centrul de greutate. El împarte fiecare mediană în raportul 2/1. Bucata mai lungă este spre vârf, bucata mai scurtă spre latură.\n\nIdeea demonstrației folosește paralelogramul. Liniile mijlocii sunt paralele cu laturile și jumătate din ele. Cu o astfel de pereche, paralelă și congruentă, se închide un paralelogram. Diagonalele lui se înjumătățesc. Din faptul că linia mijlocie este jumătate de latură rezultă că partea de mediană dinspre vârf este dublul părții dinspre bază.',
    example: 'Într-un triunghi, latura BC are 10 cm. M și N sunt mijloacele lui AB și AC. MN este paralelă cu BC și are 5 cm. O mediană are 9 cm. Centrul de greutate o taie în 6 cm spre vârf și 3 cm spre bază, pentru că 6/3 = 2/1 și 6 + 3 = 9.',
    practice: '1. O latură are 14 cm. Linia mijlocie paralelă cu ea are cât? 2. O mediană are 12 cm. Cât este bucata dinspre vârf? 3. Raportul în care centrul de greutate taie mediana?\n\nRăspunsuri: 7 cm. 8 cm. 2/1.',
    mistakes: 'Nu pui bucata mai lungă lângă bază. Nu spui că linia mijlocie este o treime din latură. Nu confunda linia mijlocie cu mediana: mediana pleacă din vârf.',
    tryThis: 'Desenează un triunghi, marchează mijloacele a două laturi și unește-le. Măsoară segmentul și latura a treia. Verifică dacă ai jumătate și dacă liniile par paralele.',
    recap: 'Linia mijlocie este paralelă cu a treia latură și jumătate din ea. Centrul de greutate taie fiecare mediană în raportul 2/1, cu partea dublă spre vârf. Argumentul trece printr-un paralelogram.'
  }),

  lesson('dreptunghi', 'Dreptunghiul', {
    figure: 'rectangle',
    formulas: ['diagonalele dreptunghiului sunt congruente', 'un paralelogram cu un unghi drept este dreptunghi'],
    theory: 'Dreptunghiul este patrulaterul cu patru unghiuri drepte. Este un paralelogram, deci păstrează proprietățile lui: opusele congruente, diagonalele se înjumătățesc.\n\nÎn plus, diagonalele sunt congruente.\n\nȘi reciprocele sunt utile. Un paralelogram cu un unghi drept este dreptunghi. Un paralelogram cu diagonalele congruente este dreptunghi.',
    example: 'Un paralelogram are o latură de 9 cm, cealaltă de 6 cm și un unghi de 90°. Este dreptunghi. Aria este 9 · 6 = 54 cm². Diagonala se află cu Pitagora: 9^2 + 6^2 = 81 + 36 = 117, deci diagonala este √117 = 3√13.',
    practice: '1. Un paralelogram cu un unghi de 90° este ce figură? 2. Aria lui, dacă laturile sunt 9 cm și 6 cm. 3. Diagonalele unui dreptunghi sunt egale?\n\nRăspunsuri: dreptunghi. 54 cm². Da.',
    mistakes: 'Nu spune că orice paralelogram are diagonale egale. Nu uita că unghiurile dreptunghiului sunt toate de 90°, nu doar unul, după ce ai dovedit că este dreptunghi.',
    tryThis: 'Desenează un dreptunghi 6 cm pe 8 cm. Calculează diagonala și spune de ce cele două diagonale sunt egale fără să o măsori pe a doua.',
    recap: 'Dreptunghiul este paralelogramul cu un unghi drept, sau cu diagonale congruente. Toate unghiurile sunt de 90°, iar diagonalele sunt egale și se înjumătățesc.'
  }),

  lesson('romb', 'Rombul', {
    figure: 'rhombus',
    formulas: ['toate laturile sunt congruente', 'diagonalele sunt perpendiculare', 'A = (d · e) / 2'],
    theory: 'Rombul este patrulaterul cu toate laturile congruente. Este paralelogram.\n\nDiagonalele lui sunt perpendiculare și se înjumătățesc. Ele sunt și bisectoarele unghiurilor.\n\nUn paralelogram cu două laturi alăturate congruente este romb. Un paralelogram cu diagonalele perpendiculare este romb. Unghiurile nu trebuie să fie de 90°: dacă sunt, rombul este pătrat.',
    example: 'Diagonalele unui romb au 6 cm și 8 cm. Se taie în jumătăți de 3 cm și 4 cm, în unghi drept. Latura este √(3^2 + 4^2) = 5 cm. Perimetrul este 20 cm. Aria este (6 · 8) / 2 = 24 cm².',
    practice: '1. Diagonale 6 cm și 8 cm. Aria? 2. Latura? 3. Un paralelogram cu laturile alăturate egale este romb?\n\nRăspunsuri: 24 cm². 5 cm. Da.',
    mistakes: 'Nu spune că rombul are neapărat unghiuri drepte. Nu calcula aria ca produsul diagonalelor, fără să împărți la 2. Nu uita că jumătățile diagonalelor intră în Pitagora, nu diagonalele întregi.',
    tryThis: 'Desenează două segmente perpendiculare care se taie în mijlocul fiecăruia, de lungimi diferite. Unește capetele și spune de ce ai un romb care nu este pătrat.',
    recap: 'Rombul are toate laturile egale. Diagonalele sunt perpendiculare, se înjumătățesc și taie unghiurile în jumătate. Aria este semiprodusul diagonalelor.'
  }),

  lesson('patrat', 'Pătratul', {
    figure: 'square',
    formulas: ['pătratul este și dreptunghi, și romb', 'A = l^2', 'diagonala = l√2'],
    theory: 'Pătratul este patrulaterul cu toate laturile congruente și toate unghiurile drepte. Este și dreptunghi, și romb, deci strânge proprietățile amândurora.\n\nLaturile opuse sunt paralele. Diagonalele sunt congruente, perpendiculare, se înjumătățesc și sunt bisectoare. Ele taie unghiurile de 90° în unghiuri de 45°.\n\nÎl recunoști dacă este dreptunghi cu două laturi alăturate egale, sau romb cu un unghi drept, sau romb cu diagonalele egale.',
    example: 'Un pătrat are latura 5 cm. Perimetrul este 20 cm. Aria este 5^2 = 25 cm². Diagonala este 5√2 cm. Jumătatea ei este (5√2)/2 cm.',
    practice: '1. Latura 5 cm. Aria? 2. Un romb cu un unghi de 90° este pătrat? 3. Diagonalele pătratului sunt perpendiculare?\n\nRăspunsuri: 25 cm². Da. Da.',
    mistakes: 'Nu spune că orice romb este pătrat. Nu spune că orice dreptunghi este pătrat. Nu calcula diagonala ca dublul laturii.',
    tryThis: 'Listați pe o foaie proprietățile de paralelogram, de dreptunghi și de romb. Încercuiește-le pe cele care rămân toate adevărate la pătrat.',
    recap: 'Pătratul este dreptunghiul cu laturile egale și rombul cu unghiurile drepte. Are toate proprietățile lor deodată.'
  }),

  lesson('trapez', 'Trapezul', {
    figure: 'trapezoid',
    formulas: ['exact o pereche de laturi paralele', 'la isoscel, unghiurile de la bază sunt congruente'],
    theory: 'Trapezul are exact o pereche de laturi paralele. Ele se numesc baze. Celelalte două sunt laturile neparalele. Înălțimea este perpendiculara dintre baze.\n\nTrapezul oarecare are laturile neparalele de lungimi diferite. Trapezul isoscel le are congruente. Trapezul dreptunghic are o latură neparalelă perpendiculară pe baze. La el, latura aceea este și înălțime.\n\nLa trapezul isoscel, unghiurile alăturate aceleiași baze sunt congruente, iar diagonalele sunt congruente. Și reciprocele țin: un trapez cu unghiurile de la bază congruente este isoscel. Un trapez cu diagonalele congruente este isoscel.',
    example: 'Un trapez isoscel are baza mare de 10 cm, baza mică de 6 cm și laturile neparalele de 4 cm. Unghiurile de la baza mare sunt egale. Un trapez dreptunghic cu înălțimea 5 cm are una dintre laturile neparalele tot de 5 cm.',
    practice: '1. Câte perechi de laturi paralele are un trapez? 2. La isoscel, diagonalele sunt egale? 3. La trapez dreptunghic, cine poate fi înălțimea?\n\nRăspunsuri: exact una. Da. Latura neparalelă perpendiculară pe baze.',
    mistakes: 'Nu numi trapez un paralelogram: paralelogramul are două perechi de laturi paralele. Nu lua o latură piezișă drept înălțime. Nu spune că orice trapez are diagonalele egale.',
    tryThis: 'Desenează un trapez isoscel și unul dreptunghic. Marchează bazele și înălțimea în fiecare.',
    recap: 'Trapezul are exact două laturi paralele, bazele. Isoscelul are laturile neparalele egale, unghiurile de la bază egale și diagonalele egale. Dreptunghicul are o latură neparalelă care este și înălțime.'
  }),

  lesson('linie-trapez', 'Linia mijlocie a trapezului', {
    figure: 'trapezoid-iso',
    formulas: ['linia mijlocie = (B + b) / 2', 'segmentul tăiat de diagonale = (B − b) / 2'],
    theory: 'Linia mijlocie a trapezului unește mijloacele laturilor neparalele. Este paralelă cu bazele și egală cu media lor: (B + b) / 2. B este baza mare, b este baza mică.\n\nDiagonalele taie pe linia mijlocie un segment. Lungimea lui este (B − b) / 2.\n\nLinia mijlocie nu este înălțime. Înălțimea este perpendiculară pe baze. Linia mijlocie este paralelă cu bazele.',
    example: 'Bazele au 10 cm și 6 cm. Linia mijlocie are (10 + 6) / 2 = 8 cm. Segmentul tăiat de diagonale pe linia mijlocie are (10 − 6) / 2 = 2 cm.',
    practice: '1. Baze 10 și 6. Linia mijlocie? 2. Segmentul diagonalelor pe linia mijlocie? 3. Baze 12 și 8. Linia mijlocie?\n\nRăspunsuri: 8 cm. 2 cm. 10 cm.',
    mistakes: 'Nu scădea bazele când vrei linia mijlocie. Nu aduna bazele când vrei doar segmentul dintre diagonale. Nu confunda linia mijlocie cu înălțimea.',
    tryThis: 'Desenează un trapez cu bazele 8 cm și 4 cm. Marchează mijloacele laturilor neparalele, unește-le și calculează lungimea înainte să măsori.',
    recap: 'Linia mijlocie este paralelă cu bazele și egală cu (B + b) / 2. Diagonalele păstrează pe ea un segment de (B − b) / 2.'
  }),

  lesson('arii-dreptunghi', 'Perimetru și aria pătratului și a dreptunghiului', {
    figure: 'rectangle',
    formulas: ['pătrat: P = 4l și A = l^2', 'dreptunghi: P = 2(L + l) și A = L · l', '1 m^2 = 100 dm² = 10000 cm²'],
    theory: 'Perimetrul este lungimea gardului: suma laturilor. La pătrat este 4l. La dreptunghi este 2(L + l).\n\nAria este umplutura. La pătrat este l^2. La dreptunghi este L · l. Unitățile de arie sunt cm², dm² și m^2. 1 m^2 = 100 dm² = 10000 cm². 1 dm² = 100 cm².\n\nAria este aditivă. Dacă tai o figură în bucăți care nu se acoperă, aria întregului este suma ariilor bucăților. Dacă muți o bucată fără să o întinzi, aria rămâne aceeași.',
    example: 'Un dreptunghi are 5 dm pe 30 cm. Întâi aceeași unitate: 5 dm = 50 cm. Aria este 50 · 30 = 1500 cm², adică 15 dm². Perimetrul este 2(50 + 30) = 160 cm.',
    practice: '1. Pătrat de latură 5 cm. Aria? 2. Dreptunghi 3 cm pe 4 cm. Aria? 3. Câți cm² are 1 dm²?\n\nRăspunsuri: 25 cm². 12 cm². 100.',
    mistakes: 'Nu aduna laturile ca să afli aria. Nu amesteca cm cu dm fără transformare. Nu spune că 1 m^2 are 100 cm²: are 10000 cm².',
    tryThis: 'Măsoară un caiet în centimetri. Calculează perimetrul și aria copertei. Scrie aria și în dm².',
    recap: 'Perimetrul adună laturile. Aria pătratului este l^2, aria dreptunghiului este L · l. Unitățile se transformă cu 100 și cu 10000. Bucățile care nu se acoperă își adună ariile.'
  }),

  lesson('arie-paralelogram', 'Aria paralelogramului', {
    figure: 'parallelogram',
    formulas: ['A = b · h', 'P = 2(a + b)'],
    theory: 'Perimetrul paralelogramului este 2(a + b), cu a și b laturile diferite.\n\nAria este baza ori înălțimea corespunzătoare: A = b · h. Înălțimea este perpendiculara dintre bază și latura opusă, nu latura piezișă.\n\nPoți lua ca bază oricare latură, dar atunci înălțimea trebuie să cadă pe dreapta acelei laturi. Dacă unghiul este de 90°, înălțimea este chiar latura alăturată și paralelogramul este dreptunghi.',
    example: 'Baza are 9 cm și înălțimea corespunzătoare are 6 cm. Aria este 9 · 6 = 54 cm². Dacă latura piezișă are 7 cm, ea nu înlocuiește înălțimea, decât dacă unghiul este drept.',
    practice: '1. Bază 9 cm, înălțime 6 cm, unghi 90°. Aria? 2. Bază 10 cm, înălțime 4 cm. Aria? 3. Perimetrul unui paralelogram cu laturile 5 cm și 3 cm.\n\nRăspunsuri: 54 cm². 40 cm². 16 cm.',
    mistakes: 'Nu înmulți cele două laturi dacă unghiul nu este drept. Nu folosi înălțimea care cade pe altă latură decât baza aleasă.',
    tryThis: 'Decupează un paralelogram din hârtie și taie triunghiul de la un capăt. Lipește-l la celălalt capăt. Spune ce dreptunghi obții și de ce aria nu s-a schimbat.',
    recap: 'Aria paralelogramului este baza înmulțită cu înălțimea corespunzătoare. Perimetrul este dublul sumei a două laturi alăturate.'
  }),

  lesson('arie-triunghi', 'Aria triunghiului', {
    figure: 'triangle',
    formulas: ['A = (b · h) / 2', 'la dreptunghic, A = (c · d) / 2'],
    theory: 'Aria triunghiului este jumătate din baza ori înălțimea corespunzătoare: A = (b · h) / 2. Un paralelogram cu aceeași bază și aceeași înălțime se taie pe diagonală în două triunghiuri de aceeași arie.\n\nLa triunghiul dreptunghic, catetele sunt bază și înălțime una pentru alta. Dacă ele sunt c și d, aria este (c · d) / 2.\n\nMediana împarte triunghiul în două triunghiuri cu aceeași arie. Ele au baze egale, jumătățile laturii, și aceeași înălțime din vârful opus.\n\nDouă triunghiuri cu aceeași înălțime au ariile în raportul bazelor. Dacă bazele sunt egale și înălțimile sunt egale, ariile sunt egale.',
    example: 'Baza 10 cm și înălțimea 6 cm dau aria (10 · 6) / 2 = 30 cm². Un triunghi dreptunghic cu catetele 6 cm și 8 cm are aria (6 · 8) / 2 = 24 cm². Dacă mediana cade pe baza de 10 cm, fiecare jumătate are aria 15 cm².',
    practice: '1. Bază 8 cm, înălțime 5 cm. Aria? 2. Catete 6 cm și 8 cm. Aria? 3. Aceeași înălțime, baze 6 cm și 3 cm. Raportul ariilor?\n\nRăspunsuri: 20 cm². 24 cm². 2/1.',
    mistakes: 'Nu uita împărțirea la 2. Nu folosi o latură care nu este perpendiculară pe înălțimea aleasă. Nu spune că mediana împarte și unghiul: asta o face bisectoarea.',
    tryThis: 'Desenează un triunghi, alege o bază și coboară înălțimea. Calculează aria. Apoi du mediana pe aceeași bază și spune aria fiecărei jumătăți.',
    recap: 'Aria triunghiului este (b · h) / 2. La dreptunghic, catetele țin loc de bază și înălțime. Mediana face două arii egale. La aceeași înălțime, ariile țin raportul bazelor.'
  }),

  lesson('arie-romb', 'Aria rombului', {
    figure: 'rhombus',
    formulas: ['A = (d · e) / 2', 'A = l · h', 'P = 4l'],
    theory: 'Perimetrul rombului este 4l, pentru că toate laturile sunt egale.\n\nAria se poate calcula în două feluri. Ca la orice paralelogram, A = l · h, cu înălțimea corespunzătoare laturii. Cu diagonalele, A = (d · e) / 2.\n\nDiagonalele se taie în unghi drept și se înjumătățesc, deci rombul se desface în patru triunghiuri dreptunghice. De aici vine semiprodusul diagonalelor.',
    example: 'Diagonalele au 6 cm și 8 cm. Aria este (6 · 8) / 2 = 24 cm². Latura este 5 cm, deci perimetrul este 20 cm. Dacă înălțimea corespunzătoare laturii de 5 cm este h, atunci 5h = 24, deci h = 24/5 = 4,8 cm.',
    practice: '1. Diagonale 6 cm și 8 cm. Aria? 2. Perimetrul, dacă latura este 5 cm. 3. Latură 10 cm și înălțime 4 cm. Aria?\n\nRăspunsuri: 24 cm². 20 cm. 40 cm².',
    mistakes: 'Nu înmulți diagonalele fără să împărți la 2. Nu folosi perimetrul ca să afli aria. Nu uita că l · h și (d · e) / 2 trebuie să dea același număr.',
    tryThis: 'Alege diagonalele 10 cm și 6 cm. Calculează aria cu semiprodusul, apoi latura cu Pitagora pe jumătăți.',
    recap: 'Rombul are perimetrul 4l. Aria este l · h sau semiprodusul diagonalelor.'
  }),

  lesson('arie-trapez', 'Aria trapezului', {
    figure: 'trapezoid',
    formulas: ['A = ((B + b) · h) / 2', 'A = linia mijlocie · h'],
    theory: 'Perimetrul trapezului este suma celor patru laturi. Bazele nu se adună singure ca să iasă perimetrul.\n\nAria este media bazelor înmulțită cu înălțimea: A = ((B + b) · h) / 2. Linia mijlocie este chiar (B + b) / 2, deci aria este și linia mijlocie ori înălțimea.\n\nÎnălțimea este perpendiculara dintre baze. La trapezul dreptunghic, una dintre laturile neparalele poate fi înălțimea.',
    example: 'Bazele au 10 cm și 6 cm, înălțimea are 4 cm. Aria este ((10 + 6) · 4) / 2 = 32 cm². Linia mijlocie are 8 cm, iar 8 · 4 = 32 cm². Același rezultat.',
    practice: '1. Baze 10 și 6, înălțime 4. Aria? 2. Linia mijlocie 7 cm și înălțimea 5 cm. Aria? 3. Baze 9 și 5, înălțime 4. Aria?\n\nRăspunsuri: 32 cm². 35 cm². 28 cm².',
    mistakes: 'Nu înmulți suma bazelor cu înălțimea fără să împărți la 2. Nu folosi latura piezișă pe post de înălțime. Nu uita o bază.',
    tryThis: 'Desenează un trapez cu bazele 9 cm și 5 cm și înălțimea 4 cm. Calculează aria pe ambele căi: cu bazele și cu linia mijlocie.',
    recap: 'Aria trapezului este ((B + b) · h) / 2. Este același lucru cu linia mijlocie înmulțită cu înălțimea.'
  }),

  lesson('recap-patrulater', 'Recapitulare: patrulaterul', {
    figure: 'trapezoid',
    formulas: ['suma unghiurilor = 360°', 'A = b · h la paralelogram', 'A = (d · e) / 2 la romb'],
    theory: 'Patrulaterul convex are suma unghiurilor 360°. Paralelogramul are opusele paralele și congruente, iar diagonalele se înjumătățesc. Dreptunghiul adaugă unghiurile drepte și diagonalele egale. Rombul adaugă laturile egale și diagonalele perpendiculare. Pătratul le are pe toate.\n\nTrapezul are exact o pereche de laturi paralele. Linia lui mijlocie este (B + b) / 2.\n\nÎn triunghi, linia mijlocie și centrul de greutate se demonstrează cu paralelogramul. Ariile folosesc baza și înălțimea, iar la romb și diagonalele.',
    example: 'Paralelogram 9 cm pe 6 cm, cu un unghi de 90°: dreptunghi de arie 54 cm². Romb cu diagonalele 6 cm și 8 cm: arie 24 cm² și latură 5 cm. Trapez cu bazele 10 cm și 6 cm și înălțimea 4 cm: arie 32 cm².',
    practice: '1. Unghiul alăturat unui unghi de 70° într-un paralelogram. 2. Aria triunghiului cu baza 8 și înălțimea 5. 3. Linia mijlocie pentru bazele 12 și 4.\n\nRăspunsuri: 110°. 20. 8.',
    mistakes: 'Nu pune două perechi de laturi paralele la trapez. Nu uita jumătatea la aria triunghiului și la semiprodusul diagonalelor.',
    tryThis: 'Fă un tabel cu paralelogram, dreptunghi, romb, pătrat și trapez. Pe un rând scrie ce este paralel. Pe altul scrie formula de arie pe care o folosești.',
    recap: 'Patrulaterul convex însumează 360°. Paralelogramul se specializează în dreptunghi, romb și pătrat. Trapezul are o singură pereche de baze. Aria cere înălțimea care cade pe baza aleasă.'
  }),

  lesson('coarde-arce', 'Coarde și arce', {
    figure: 'circle-chord',
    formulas: ['arce congruente dau coarde congruente', 'diametrul perpendicular pe o coardă o înjumătățește'],
    theory: 'În același cerc, sau în cercuri congruente, la arce congruente corespund coarde congruente. Și invers: coarde congruente determină arce congruente, cele mici cu cele mici.\n\nDiametrul perpendicular pe o coardă înjumătățește coarda și înjumătățește arcul corespunzător. Perpendiculara din centru pe o coardă trece prin mijlocul coardei.\n\nDouă coarde paralele determină între ele arce congruente. Două coarde egal depărtate de centru sunt congruente. Și invers: coarde congruente sunt la aceeași distanță de centru.',
    example: 'O coardă are 8 cm. Diametrul perpendicular pe ea o taie în două segmente de 4 cm. Dacă o altă coardă este tot la 3 cm de centru, și ea are 8 cm.',
    practice: '1. Două arce congruente au coardele egale? 2. Diametrul perpendicular pe o coardă de 10 cm o taie în segmente de cât? 3. Coarde la fel de depărtate de centru sunt egale?\n\nRăspunsuri: da. 5 cm. Da.',
    mistakes: 'Nu spune că orice diametru înjumătățește orice coardă: trebuie să fie perpendicular pe ea. Nu compara coarde din cercuri de raze diferite fără să verifici cercurile.',
    tryThis: 'Desenează un cerc și o coardă. Du perpendiculara din centru pe coardă și măsoară cele două jumătăți.',
    recap: 'Arcele congruente și coardele congruente merg împreună. Diametrul perpendicular pe o coardă taie coarda și arcul în jumătate. Aceeași distanță până la centru înseamnă coarde egale.'
  }),

  lesson('unghi-inscris', 'Unghi înscris', {
    figure: 'circle-angles',
    formulas: ['unghiul înscris = jumătate din arcul cuprins', 'unghiul înscris într-un semicerc este drept'],
    theory: 'Unghiul la centru are vârful în centru. Măsura lui este măsura arcului cuprins între laturi.\n\nUnghiul înscris are vârful pe cerc, iar laturile sunt coarde. Măsura lui este jumătate din măsura arcului cuprins între laturi.\n\nDacă arcul este un semicerc, unghiul înscris are 90°. Ipotenuza unui triunghi dreptunghic înscris în cerc este diametru.\n\nDouă unghiuri înscrise care cuprind același arc sunt congruente. Ele văd arcul din puncte diferite de pe restul cercului.',
    example: 'Un arc are 80°. Unghiul la centru pe acel arc are 80°. Unghiul înscris care cuprinde același arc are 40°. Dacă arcul este de 180°, unghiul înscris are 90°.',
    practice: '1. Arcul are 100°. Unghiul înscris? 2. Unghiul înscris într-un semicerc. 3. Două unghiuri înscrise pe același arc de 70°. Cât are fiecare?\n\nRăspunsuri: 50°. 90°. 35°.',
    mistakes: 'Nu egala unghiul înscris cu arcul. Nu lua arcul cel mare când unghiul vede arcul cel mic. Nu spune că orice unghi cu vârful pe cerc este drept: doar cel care vede semicercul.',
    tryThis: 'Desenează un diametru și un punct pe cerc, în afara diametrului. Unește punctul cu capetele diametrului și spune cât este unghiul din acel punct.',
    recap: 'Unghiul înscris este jumătate din arcul pe care îl vede. În semicerc este drept. Unghiurile înscrise pe același arc sunt egale.'
  }),

  lesson('tangente', 'Tangente', {
    figure: 'circle-tangent',
    formulas: ['tangenta este perpendiculară pe rază', 'segmentele tangente dintr-un punct exterior sunt congruente'],
    theory: 'Tangenta atinge cercul într-un singur punct. În punctul de contact, ea este perpendiculară pe rază.\n\nDintr-un punct exterior poți duce două tangente. Segmentele de la punct până la contacte sunt congruente. Centrul cercului stă pe bisectoarea unghiului format de cele două tangente.\n\nDacă o dreaptă este perpendiculară pe rază în capătul ei de pe cerc, atunci dreapta este tangentă.',
    example: 'Din punctul P duci două tangente care ating cercul în A și B. PA = PB. Dacă PA are 5 cm, și PB are 5 cm. Raza în A este perpendiculară pe tangentă. Unghiul APB este tăiat în două unghiuri egale de dreapta care unește P cu centrul.',
    practice: '1. Tangenta și raza în punctul de contact formează un unghi de cât? 2. O tangentă din P are 7 cm. Cealaltă? 3. Centrul stă pe bisectoarea unghiului tangentelor?\n\nRăspunsuri: 90°. 7 cm. Da.',
    mistakes: 'Nu confunda tangenta cu o secantă: secanta taie cercul în două puncte. Nu spune că segmentele tangente sunt egale cu raza. Nu uita unghiul drept din punctul de contact.',
    tryThis: 'Desenează un cerc și un punct în afara lui. Construiește, cât poți de atent, două tangente. Măsoară segmentele până la contacte.',
    recap: 'Tangenta este perpendiculară pe raza din punctul de contact. Dintr-un punct exterior, cele două segmente tangente sunt egale, iar centrul stă pe bisectoarea unghiului lor.'
  }),

  lesson('poligoane-regulate', 'Poligoane regulate', {
    figure: 'hexagon',
    formulas: ['unghi la centru = 360/n', 'latura hexagonului regulat înscris este R'],
    theory: 'Un poligon regulat are toate laturile congruente și toate unghiurile congruente. Este înscris în cerc dacă toate vârfurile stau pe cerc.\n\nUnghiul la centru dintre două raze vecine are 360/n grade, unde n este numărul laturilor. Triunghiul echilateral înscris are unghiul la centru de 120°. Pătratul înscris îl are de 90°. Hexagonul regulat înscris îl are de 60°.\n\nHexagonul regulat se desface în șase triunghiuri echilaterale. Latura lui este egală cu raza. Triunghiul echilateral și pătratul se construiesc cu compasul pornind de la cerc. La hexagon, compasul deschis cu raza marchează de șase ori pe cerc.',
    example: 'Un hexagon regulat este înscris într-un cerc de rază 4 cm. Latura este 4 cm. Perimetrul este 24 cm. Unghiul la centru este 360/6 = 60°. Unghiul poligonului, în vârf, este 120°.',
    practice: '1. Unghiul la centru al pătratului înscris. 2. Latura hexagonului regulat de rază 5 cm. 3. Unghiul la centru al triunghiului echilateral înscris.\n\nRăspunsuri: 90°. 5 cm. 120°.',
    mistakes: 'Nu spune că la orice poligon regulat latura este egală cu raza: asta este special la hexagon. Nu calcula unghiul la centru ca 180/n.',
    tryThis: 'Desenează un cerc și, cu aceeași deschidere de compas, marchează șase puncte pe cerc. Unește-le și spune ce poligon ai obținut.',
    recap: 'Poligonul regulat are laturi egale și unghiuri egale. Unghiul la centru este 360/n. La hexagonul regulat înscris, latura este raza.'
  }),

  lesson('lungime-disc', 'Lungimea cercului și aria discului', {
    figure: 'circle-sector',
    formulas: ['L = 2πR', 'A = πR^2', 'arcul = (n/360) · L', 'sectorul = (n/360) · A'],
    theory: 'π este raportul dintre lungimea cercului și diametru. Este irațional. Îl aproximezi cu 3,14 sau cu 22/7.\n\nLungimea cercului este L = 2πR, sau π înmulțit cu diametrul. Aria discului este A = πR^2. Lungimea este gardul. Aria este umplutura.\n\nUn arc de măsură n grade este (n/360) din lungimea cercului. Un sector de disc, felia cu unghiul la centru de n grade, are aria (n/360) din aria discului.',
    example: 'Raza este 7 cm și π se ia 22/7. Lungimea este 2 · (22/7) · 7 = 44 cm. Aria este (22/7) · 49 = 154 cm². Pentru un sector de 90°, arcul are (90/360) · 44 = 11 cm, iar aria sectorului are (90/360) · 154 = 38,5 cm².',
    practice: '1. Rază 7, π = 22/7. Lungimea? 2. Aria discului? 3. Arcul de 180° este cât din lungime?\n\nRăspunsuri: 44 cm. 154 cm². Jumătate, deci 22 cm.',
    mistakes: 'Nu folosi πR^2 pentru lungime. Nu folosi 2πR pentru arie. Nu uita că sectorul se raportează la 360°, nu la 180°.',
    tryThis: 'Măsoară diametrul unei căni. Calculează lungimea cercului cu π aproximativ 3,14 și spune cât fir ai pune pe margine.',
    recap: 'L = 2πR și A = πR^2. Arcul și sectorul iau aceeași parte din întreg ca unghiul la centru din 360°.'
  }),

  lesson('recap-cerc', 'Recapitulare: cercul', {
    figure: 'circle',
    formulas: ['unghi înscris = jumătate din arc', 'L = 2πR', 'A = πR^2'],
    theory: 'Coardele congruente văd arce congruente. Diametrul perpendicular pe o coardă o înjumătățește. Unghiul înscris este jumătate din arc și este drept când vede un semicerc.\n\nTangenta este perpendiculară pe rază. Segmentele tangente dintr-un punct exterior sunt egale.\n\nPoligonul regulat înscris are unghiul la centru 360/n. Hexagonul regulat are latura egală cu raza. Lungimea și aria folosesc π, iar arcul și sectorul sunt părți din ele.',
    example: 'Un arc de 80° dă un unghi înscris de 40°. Un cerc de rază 7 cm, cu π = 22/7, are lungimea 44 cm și aria 154 cm². Hexagonul regulat în acest cerc are latura 7 cm.',
    practice: '1. Arc de 120°. Unghi înscris? 2. Două tangente din același punct, una de 9 cm. Cealaltă? 3. Unghiul la centru al hexagonului regulat.\n\nRăspunsuri: 60°. 9 cm. 60°.',
    mistakes: 'Nu dubla unghiul înscris când vrei măsura lui. Nu confunda lungimea cu aria. Nu pune latura pătratului înscris egală cu raza.',
    tryThis: 'Desenează un cerc, un unghi înscris și unghiul la centru pe același arc. Scrie relația dintre măsurile lor.',
    recap: 'Cercul leagă coarde, arce, unghiuri și tangente. Poligoanele regulate se sprijină pe unghiul 360/n. π dă lungimea și aria.'
  }),

  lesson('segmente-proportionale', 'Segmente proporționale', {
    figure: 'fraction-line',
    formulas: ['raportul a două segmente este câtul lungimilor', 'AM/MB = m/n'],
    theory: 'Raportul a două segmente este câtul lungimilor lor, măsurate cu aceeași unitate. Segmentele sunt proporționale când rapoartele lor sunt egale.\n\nUn punct D pe segmentul AB, între A și B, îl împarte în raportul m/n dacă AD/DB = m/n. Atunci AB se împarte în m + n părți egale. AD are m părți, DB are n părți.\n\nPunctul este interior. Nu îl pui în afara segmentului când raportul cerut este interior.',
    example: 'AB are 10 cm și D îl împarte în raportul 2/3, cu AD lângă A. Sunt 2 + 3 = 5 părți. O parte are 10/5 = 2 cm. AD are 4 cm și DB are 6 cm. Verificare: 4/6 = 2/3.',
    practice: '1. Raportul 2/3 pe un segment de 15 cm. Cât este partea mică? 2. 4/6 este egal cu 2/3? 3. Un segment de 12 cm împărțit în raportul 1/2. Partea mai mică?\n\nRăspunsuri: 6 cm. Da. 4 cm.',
    mistakes: 'Nu împarți lungimea doar la m, uitând părțile lui n. Nu inversezi raportul: 2/3 nu este același lucru cu 3/2 când spui care bucată este lângă A. Nu aduni lungimile ca să faci raportul.',
    tryThis: 'Taie o sfoară de 20 cm în raportul 3/2. Măsoară bucățile și verifică raportul și suma.',
    recap: 'Raportul compară lungimi. Punctul interior care taie în m/n face m + n părți egale pe tot segmentul.'
  }),

  lesson('paralele-echidistante', 'Paralele echidistante', {
    figure: 'parallels',
    formulas: ['paralele echidistante taie pe o secantă segmente congruente'],
    theory: 'Drepte paralele echidistante sunt paralele și la aceeași distanță una de alta.\n\nEle taie pe orice secantă segmente congruente. Dacă distanța dintre paralele este aceeași, bucățile de pe secantă sunt egale, chiar dacă secanta este piezișă.\n\nCu această proprietate împarți un segment în n părți congruente. Duci o semidreaptă dintr-un capăt. Pe ea marchezi n segmente egale, cu compasul. Unești ultimul semn cu celălalt capăt al segmentului. Apoi duci paralele la această linie prin celelalte semne. Paralelele taie segmentul în n părți egale.',
    example: 'Trei drepte paralele, la aceeași distanță, taie o secantă în bucăți de 4 cm și 4 cm. O a doua secantă este tăiată tot în bucăți egale între ele, chiar dacă acele bucăți nu au tot 4 cm.',
    practice: '1. Paralele echidistante taie pe o secantă segmente de 5 cm și cât? 2. Ca să împarți un segment în 4 părți egale, câte semne egale pui pe semidreaptă? 3. Secanta piezișă strică egalitatea bucăților?\n\nRăspunsuri: 5 cm. 4. Nu.',
    mistakes: 'Nu spune că bucățile de pe două secante diferite sunt egale între ele. Ele sunt egale pe aceeași secantă. Nu uita paralela prin fiecare semn.',
    tryThis: 'Desenează un segment și împarte-l în trei părți egale cu semidreapta și compasul, fără să măsori cu rigla decât la verificare.',
    recap: 'Paralelele echidistante taie segmente egale pe orice secantă. Așa împarți un segment în n părți congruente.'
  }),

  lesson('thales', 'Teorema lui Thales', {
    figure: 'thales',
    formulas: ['a/b = c/d', '4/6 = x/(x + 3)'],
    theory: 'O paralelă la o latură a unui triunghi taie celelalte două laturi în segmente proporționale. Același lucru se întâmplă pe laturile unui unghi tăiate de drepte paralele.\n\nProporția se poate scrie în mai multe feluri echivalente. Dacă AM/MB = AN/NC, atunci și AM/AB = AN/AC, iar produsele pe diagonală sunt egale. Păstrezi aceeași ordine: bucata mică cu bucata mică, sau bucata cu tot segmentul, pe ambele laturi la fel.\n\nNu amesteci o bucată de pe o latură cu tot segmentul de pe cealaltă, în altă ordine.',
    example: 'O paralelă taie pe o secantă segmentele de 4 cm și 6 cm. Pe a doua secantă, segmentele sunt x și x + 3, în aceeași ordine. 4/6 = x/(x + 3). Înmulțești pe diagonală: 4(x + 3) = 6x, deci 4x + 12 = 6x, 12 = 2x și x = 6. Segmentele de pe a doua secantă au 6 cm și 9 cm.',
    practice: '1. 4/6 = x/(x + 3). Cât este x? 2. Dacă AM/MB = 2/3 și MB = 6, cât este AM? 3. 2/3 = 4/6 este o proporție adevărată?\n\nRăspunsuri: 6. 4. Da.',
    mistakes: 'Nu schimba ordinea într-un singur raport. Nu uita paranteza când înmulțești x + 3. Nu aplica Thales dacă dreapta nu este paralelă cu latura.',
    tryThis: 'Desenează un triunghi și o paralelă la bază. Măsoară bucățile de pe o latură și una dintre bucățile de pe cealaltă. Calculează bucata rămasă cu o proporție.',
    recap: 'Paralela la o latură taie celelalte două proporțional. Scrii rapoartele în aceeași ordine și înmulțești pe diagonală.'
  }),

  lesson('reciproca-thales', 'Reciproca lui Thales', {
    figure: 'thales',
    formulas: ['dacă rapoartele sunt egale, dreapta este paralelă', 'BD/DC = AB/AC pe bisectoare'],
    theory: 'Reciproca spune inversul. Dacă o dreaptă taie două laturi ale unui triunghi în segmente proporționale, atunci ea este paralelă cu a treia latură. Proporția demonstrează paralelismul.\n\nO aplicație este teorema bisectoarei. Bisectoarea unui unghi al triunghiului taie latura opusă într-un punct care împarte latura în raportul celorlalte două laturi. Dacă bisectoarea din A taie BC în D, atunci BD/DC = AB/AC.\n\nÎn demonstrație apare o paralelă ajutătoare. Când rapoartele ies egale, reciproca lui Thales spune că acea dreaptă este paralelă. Aici nu facem din bisectoare o lecție separată: o folosești ca aplicație.',
    example: 'AB = 6 cm, AC = 9 cm și BC = 10 cm. Bisectoarea din A taie BC în D, cu BD/DC = 6/9 = 2/3. BD are 2 părți, DC are 3, iar împreună au 5 părți pe 10 cm. O parte are 2 cm. BD = 4 cm și DC = 6 cm.',
    practice: '1. AB/AC = 2/5 și BC = 14 cm. Bisectoarea din A taie BC în D. Cât sunt BD și DC? 2. Dacă o dreaptă taie laturile în rapoarte egale, ce poți spune despre ea și despre a treia latură? 3. 6/9 este egal cu 2/3?\n\nRăspunsuri: 4 cm și 10 cm. Este paralelă cu a treia latură. Da.',
    mistakes: 'Nu inversezi raportul laturilor. Nu spune că bisectoarea taie latura opusă în jumătate, decât dacă triunghiul este isoscel cu laturile egale din acel vârf. Nu folosi reciproca fără proporție.',
    tryThis: 'Desenează un triunghi cu laturile din A de 6 cm și 8 cm și baza de 7 cm. Calculează cum taie bisectoarea din A baza, apoi construiește punctul.',
    recap: 'Rapoarte egale pe două laturi înseamnă paralelă la a treia. Bisectoarea taie latura opusă în raportul celorlalte două laturi. Asta este o aplicație, nu un capitol nou.'
  }),

  lesson('parti-proportionale', 'Împărțirea în părți proporționale', {
    figure: 'parallels',
    formulas: ['părțile sunt proporționale cu numerele date', 'construcția folosește Thales'],
    theory: 'Ca să împarți un segment în părți proporționale cu niște numere, aduni numerele și afli câte părți egale ai avea. Apoi le grupezi.\n\nConstrucția cu rigla și compasul folosește Thales. Din capătul A al segmentului AB duci o semidreaptă. Pe ea marchezi, cu compasul, atâtea unități egale cât este suma numerelor. Unești ultimul semn cu B. Prin semnele care despart grupurile duci paralele la această linie. Ele taie AB în părțile cerute.',
    example: 'AB are 12 cm și trebuie împărțit în părți proporționale cu 1, cu 2 și cu 3. Suma este 6. O parte egală are 2 cm. Bucățile au 2 cm, 4 cm și 6 cm. Pe semidreaptă ai pune 6 semne egale și ai duce paralele după primul semn și după al treilea.',
    practice: '1. Segment de 20 cm, părți proporționale cu 2 și cu 3. Cât este bucata mică? 2. Cu 1, cu 1 și cu 2, pe 16 cm. Cea mai mare bucată? 3. Suma numerelor 2, 3 și 5 este cât?\n\nRăspunsuri: 8 cm. 8 cm. 10.',
    mistakes: 'Nu împarți segmentul la primul număr și ignori restul. Nu uiți că semnele de pe semidreaptă trebuie să fie egale. Nu duci paralelele în altă direcție decât linia care unește ultimul semn cu B.',
    tryThis: 'Împarte un segment de 15 cm în părți proporționale cu 2 și cu 3, întâi prin calcul, apoi prin semidreaptă și paralele.',
    recap: 'Aduni numerele, faci părți egale și le grupezi. Pe hârtie, semidreapta cu semne egale și paralelele lui Thales taie segmentul în raportul cerut.'
  }),

  lesson('triunghiuri-asemenea', 'Triunghiuri asemenea', {
    figure: 'similar',
    formulas: ['unghiuri congruente și laturi proporționale', 'raportul de asemănare este k'],
    theory: 'Două triunghiuri sunt asemenea dacă au unghiurile congruente și laturile corespunzătoare proporționale. Aceeași formă, altă scară. Raportul laturilor corespunzătoare este raportul de asemănare, k.\n\nOrdinea vârfurilor spune corespondența. La △ABC ~ △DEF, A corespunde lui D, B lui E și C lui F. Latura AB corespunde lui DE, nu unei laturi luate la întâmplare.\n\nAsemănarea este reflexivă: un triunghi este asemenea cu el însuși. Este simetrică: dacă primul este asemenea cu al doilea, și al doilea este asemenea cu primul. Este tranzitivă: dacă primul este asemenea cu al doilea și al doilea cu al treilea, atunci primul este asemenea cu al treilea.\n\nTeorema fundamentală: o paralelă la o latură a triunghiului taie un triunghi mic asemenea cu triunghiul mare. Unghiurile rămân aceleași, iar Thales dă laturile proporționale.',
    example: 'O paralelă la BC taie AB în M și AC în N. △AMN ~ △ABC. Dacă AM/AB = 1/2, atunci și AN/AC = 1/2, și MN/BC = 1/2. k = 1/2.',
    practice: '1. Dacă k = 1/2 și BC = 10 cm, cât este latura corespunzătoare din triunghiul mic? 2. Un triunghi este asemenea cu el însuși? 3. Ordinea vârfurilor contează?\n\nRăspunsuri: 5 cm. Da. Da.',
    mistakes: 'Nu pui în corespondență laturi care stau vizavi de unghiuri diferite. Nu confunda asemănarea cu congruența: la congruență, k = 1. Nu spune că ariile sunt în raportul k.',
    tryThis: 'Desenează un triunghi și o paralelă la bază, la jumătatea unei laturi. Măsoară baza mică și baza mare și verifică raportul.',
    recap: 'Triunghiurile asemenea au unghiuri egale și laturi proporționale. Ordinea vârfurilor dă corespondența. Paralela la o latură produce un triunghi asemenea cu cel mare.'
  }),

  lesson('criterii-asemanare', 'Criterii de asemănare', {
    figure: 'similar',
    formulas: ['UU, LUL și LLL', 'raportul perimetrelor = k', 'raportul ariilor = k^2'],
    theory: 'Ca să dovedești asemănarea, nu trebuie să verifici tot. Îți ajunge un criteriu.\n\nUU: două unghiuri congruente. Al treilea iese singur, pentru că suma este 180°. LUL: două laturi proporționale și unghiul dintre ele congruent. LLL: toate cele trei laturi proporționale.\n\nDacă raportul laturilor este k, raportul perimetrelor este tot k. Raportul ariilor este k^2. Aria crește cu pătratul scării, nu cu scara.',
    example: 'Două triunghiuri asemenea au raportul laturilor 3/2, cel mare față de cel mic. Aria celui mare este 54 cm². k^2 = (3/2)^2 = 9/4. Aria mică este 54 · (4/9) = 24 cm². Perimetrul mare este 3/2 din perimetrul mic.',
    practice: '1. Raportul laturilor, mare către mic, este 3/2. Aria mare este 54. Aria mică? 2. k = 2. Raportul ariilor? 3. Două unghiuri egale ajung pentru asemănare?\n\nRăspunsuri: 24. 4. Da, este criteriul UU.',
    mistakes: 'Nu înmulți aria cu k când vrei aria celeilalte figuri. Înmulțești cu k^2. Nu aplica LUL dacă unghiul congruent nu este între laturile proporționale.',
    tryThis: 'Desenează două triunghiuri asemenea cu k = 2. Calculează un perimetru și o arie pentru cel mic, apoi spune ce valori are cel mare.',
    recap: 'UU, LUL și LLL dovedesc asemănarea. Perimetrele țin raportul k. Ariile țin raportul k^2.'
  }),

  lesson('aplicatii-asemanare', 'Aplicații practice ale asemănării', {
    figure: 'similar',
    formulas: ['umbra ține raportul înălțimilor', 'scara hărții este un raport'],
    theory: 'Asemănarea măsoară ce nu poți atinge. Un băț și un copac, în aceeași lumină, fac umbre proporționale cu înălțimile. Triunghiurile umbrelor sunt asemenea.\n\nCu o oglindă pusă pe pământ, raza care pleacă din vârful obiectului și ajunge la ochi face două triunghiuri asemenea. Raportul înălțimilor este raportul distanțelor până la oglindă.\n\nPe o hartă sau pe un plan, scara este raportul dintre lungimea de pe hârtie și lungimea din teren. Dacă scara este 1/100, 1 cm de pe plan înseamnă 100 cm în realitate, adică 1 m. Ariile, și pe hartă, țin pătratul scării.',
    example: 'Un băț de 2 m are umbra de 3 m. Un copac are umbra de 12 m. Înălțimea copacului este 2 · (12/3) = 8 m. Pe un plan la scara 1/100, o cameră desenată de 4 cm pe 3 cm are în realitate 4 m pe 3 m. Aria de pe plan este 12 cm². Aria reală este 12 m², de 10000 de ori mai mare, pentru că 100^2 = 10000.',
    practice: '1. Băț de 2 m, umbră 3 m, umbra copacului 12 m. Înălțimea copacului? 2. Scara 1/100. 5 cm pe plan sunt câți metri? 3. k = 3. De câte ori crește aria?\n\nRăspunsuri: 8 m. 5 m. De 9 ori.',
    mistakes: 'Nu aduna umbrele ca să afli înălțimea. Nu transforma scara 1/100 în 100 m pentru 1 cm: sunt 100 cm, adică 1 m. Nu înmulți aria cu scara o singură dată.',
    tryThis: 'Pune un creion vertical în soare, măsoară creionul și umbra. Măsoară umbra unui stâlp sau a unui perete și estimează înălțimea cu raportul.',
    recap: 'Umbrele și oglinda fac triunghiuri asemenea. Harta înmulțește lungimile cu inversul scării și ariile cu pătratul acelui număr.'
  }),

  lesson('recap-asemanare', 'Recapitulare: asemănarea', {
    figure: 'similar',
    formulas: ['Thales: rapoarte egale', 'aria ține k^2'],
    theory: 'Segmentele proporționale se taie într-un raport dat. Paralelele echidistante fac părți egale. Thales dă proporții pe laturile tăiate de o paralelă. Reciproca dovedește paralelismul, iar bisectoarea este o aplicație: taie latura opusă în raportul celorlalte două laturi.\n\nTriunghiurile asemenea au aceeași formă. Criteriile sunt UU, LUL și LLL. Perimetrul ține raportul k, aria ține k^2. Cu ele măsori înălțimi și citești hărți.',
    example: '4/6 = x/(x + 3) dă x = 6. Raportul laturilor 3/2 și aria mare 54 dau aria mică 24. Un băț de 2 m cu umbra de 3 m măsoară un copac cu umbra de 12 m: înălțimea este 8 m.',
    practice: '1. x din 4/6 = x/(x + 3). 2. k = 3/2 și aria mare 54. Aria mică? 3. BD/DC dacă AB/AC = 1/2 și baza are 12 cm?\n\nRăspunsuri: 6. 24. 4 cm și 8 cm.',
    mistakes: 'Nu schimba ordinea rapoartelor. Nu trata aria ca și cum ar ține raportul k. Nu spune că bisectoarea înjumătățește baza în orice triunghi.',
    tryThis: 'Scrie pe o fișă trei rânduri: un Thales, o bisectoare ca aplicație și o arie cu k^2. Pune numere mici și rezolvă-le.',
    recap: 'Proporția vine de la paralele. Asemănarea păstrează forma. Lungimile țin k, ariile țin k^2.'
  }),

  lesson('proiectii', 'Proiecții ortogonale', {
    figure: 'triangle-right',
    formulas: ['proiecția unui punct este piciorul perpendicularei', 'p + q = ipotenuza'],
    theory: 'Proiecția ortogonală a unui punct pe o dreaptă este piciorul perpendicularei duse din punct pe dreaptă. Distanța de la punct la dreaptă este lungimea acelei perpendiculare.\n\nProiecția unui segment este segmentul dintre proiecțiile capetelor. Dacă segmentul este paralel cu dreapta, proiecția lui are aceeași lungime. Dacă este perpendicular pe dreaptă, proiecția este un punct.\n\nÎn triunghiul dreptunghic, înălțimea dusă din unghiul drept pe ipotenuză face două proiecții ale catetelor. Dacă le notezi p și q, atunci p + q este ipotenuza.',
    example: 'Într-un triunghi dreptunghic, proiecțiile catetelor pe ipotenuză au 2 cm și 8 cm. Ipotenuza are 2 + 8 = 10 cm. Piciorul înălțimii este punctul care desparte aceste proiecții.',
    practice: '1. Proiecții 3 cm și 5 cm. Ipotenuza? 2. Un segment paralel cu dreapta are 6 cm. Proiecția lui? 3. Proiecția unui punct este un punct sau un segment?\n\nRăspunsuri: 8 cm. 6 cm. Un punct.',
    mistakes: 'Nu numi proiecție o linie piezișă. Ea este perpendiculară. Nu uita să aduni proiecțiile ca să obții ipotenuza. Nu proiecta pe o dreaptă care nu este suportul ipotenuzei, dacă problema cere asta.',
    tryThis: 'Desenează o dreaptă și un punct în afara ei. Coboară perpendiculara și marchează proiecția. Apoi proiectează un segment pieziș.',
    recap: 'Proiecția ortogonală cade pe perpendiculară. Pe ipotenuză, proiecțiile catetelor stau una lângă alta și suma lor este ipotenuza.'
  }),

  lesson('teorema-inaltimii', 'Teorema înălțimii', {
    figure: 'triangle-right',
    formulas: ['h^2 = p · q', 'h = (a · b) / c'],
    theory: 'În triunghiul dreptunghic, înălțimea dusă din unghiul drept pe ipotenuză este media geometrică a celor două proiecții. Dacă proiecțiile sunt p și q, atunci h^2 = p · q, deci h = √(p · q).\n\nReciproca: dacă într-un triunghi înălțimea pe o latură îndeplinește h^2 = p · q, cu p și q segmentele făcute pe acea latură, atunci unghiul din vârful înălțimii este drept.\n\nAceeași înălțime se află și din arii. Catetele a și b și ipotenuza c dau două scrieri ale ariei: (a · b) / 2 și (c · h) / 2. Rezultă h = (a · b) / c.',
    example: 'Proiecțiile au 2 cm și 8 cm. h^2 = 2 · 8 = 16, deci h = 4 cm. Ipotenuza are 10 cm. Dacă catetele ar fi 4√5 și 2√5, produsul lor împărțit la 10 este (8 · 5) / 10 = 4. Aceeași înălțime.',
    practice: '1. Proiecții 4 cm și 9 cm. Înălțimea? 2. h^2 = 36 și o proiecție este 4 cm. Cealaltă? 3. Catete 6 cm și 8 cm, ipotenuză 10 cm. Înălțimea pe ipotenuză?\n\nRăspunsuri: 6 cm. 9 cm. (6 · 8) / 10 = 4,8 cm.',
    mistakes: 'Nu aduna proiecțiile ca să afli înălțimea. Nu uita că h este pozitiv. Nu aplica formula într-un triunghi care nu este dreptunghic, decât când tocmai verifici reciproca.',
    tryThis: 'Construiește un triunghi dreptunghic cu proiecțiile 1 cm și 4 cm. Calculează înălțimea înainte să o măsori.',
    recap: 'Înălțimea pe ipotenuză îndeplinește h^2 = p · q. Din arii, h = (a · b) / c. Reciproca recunoaște unghiul drept.'
  }),

  lesson('teorema-catetei', 'Teorema catetei', {
    figure: 'triangle-right',
    formulas: ['a^2 = c · p', 'b^2 = c · q'],
    theory: 'În triunghiul dreptunghic, pătratul unei catete este egal cu ipotenuza înmulțită cu proiecția acelei catete pe ipotenuză. Dacă cateta a are proiecția p și ipotenuza este c, atunci a^2 = c · p. La fel, b^2 = c · q.\n\nReciproca: dacă într-un triunghi pătratul unei laturi este egal cu produsul dintre altă latură și proiecția primei pe a doua, atunci triunghiul este dreptunghic.\n\nTeorema catetei și teorema înălțimii se folosesc împreună. Din proiecții afli catetele, sau din catete afli proiecțiile.',
    example: 'Ipotenuza are 10 cm, iar proiecția unei catete are 2 cm. Cateta este √(10 · 2) = √20 = 2√5 cm. Cealaltă proiecție are 8 cm, deci cealaltă catetă este √(10 · 8) = √80 = 4√5 cm. Înălțimea: h^2 = 2 · 8 = 16, deci h = 4 cm.',
    practice: '1. Ipotenuză 10 cm, proiecție 4 cm. Cateta? 2. Catetă 6 cm și ipotenuză 10 cm. Proiecția ei? 3. √(10 · 8) în formă simplă, dacă ai scos factorii?\n\nRăspunsuri: √40 = 2√10 cm. 36/10 = 3,6 cm. 4√5 cm.',
    mistakes: 'Nu înmulți ipotenuza cu cealaltă proiecție. Fiecare catetă stă cu proiecția ei. Nu uita radicalul când din pătrat vrei lungimea.',
    tryThis: 'Alege ipotenuza 25 cm și proiecțiile 9 cm și 16 cm. Calculează ambele catete și verifică dacă suma pătratelor lor este 25^2.',
    recap: 'Cateta la pătrat este ipotenuza ori proiecția ei. Împreună cu h^2 = p · q, afli toate lungimile din triunghiul dreptunghic.'
  }),

  lesson('pitagora', 'Teorema lui Pitagora și reciproca', {
    figure: 'triangle-right',
    formulas: ['a^2 + b^2 = c^2', 'diagonala pătratului = l√2', 'înălțimea echilateralului = (l√3) / 2'],
    theory: 'Teorema lui Pitagora se demonstrează cu teorema catetei. a^2 = c · p și b^2 = c · q. Aduni: a^2 + b^2 = c · p + c · q = c(p + q). Dar p + q este ipotenuza c, deci a^2 + b^2 = c^2.\n\nReciproca: dacă într-un triunghi pătratele a două laturi adunate dau pătratul celei de-a treia, atunci unghiul dintre primele două este drept. Latura cea mai lungă este ipotenuza.\n\nÎn pătratul de latură l, diagonala este l√2. În triunghiul echilateral de latură l, înălțimea este (l√3) / 2.\n\nNumerele pitagoreice sunt întregi care verifică relația. 3, 4 și 5 este un exemplu. Și multiplii lor: 6, 8 și 10. Mai este și 5, 12 și 13.\n\nÎn romb, jumătățile diagonalelor și latura fac un triunghi dreptunghic. În dreptunghi, diagonala se află cu Pitagora. În trapez, înălțimea cade și face un triunghi dreptunghic cu bucata de bază rămasă alături.',
    example: 'Laturile 6, 8 și 10: 36 + 64 = 100, deci triunghiul este dreptunghic. Diagonala unui pătrat de latură 5 cm este 5√2 cm. Înălțimea unui echilateral de latură 6 cm este (6√3) / 2 = 3√3 cm. Într-un romb cu diagonalele 6 cm și 8 cm, latura este 5 cm.',
    practice: '1. 5, 12 și 13 formează un triunghi dreptunghic? 2. Diagonala pătratului de latură 4 cm. 3. Înălțimea echilateralului de latură 2 cm.\n\nRăspunsuri: da, 25 + 144 = 169. 4√2 cm. √3 cm.',
    mistakes: 'Nu aduna laturile în locul pătratelor. Nu pune ipotenuza vizavi de un unghi ascuțit. Nu lua toată diagonala rombului în Pitagora: iei jumătățile.',
    tryThis: 'Verifică 9, 12 și 15. Spune dacă sunt multipli ai lui 3, 4 și 5 și dacă triunghiul este dreptunghic.',
    recap: 'a^2 + b^2 = c^2 iese din teorema catetei. Reciproca recunoaște unghiul drept. Diagonala pătratului este l√2, iar înălțimea echilateralului este (l√3) / 2.'
  }),

  lesson('trigonometrie', 'Sinus, cosinus, tangentă, cotangentă', {
    figure: 'triangle-right',
    formulas: ['sin = a/c', 'cos = b/c', 'tg = a/b', 'ctg = b/a'],
    theory: 'În triunghiul dreptunghic, pentru un unghi ascuțit, notezi cu a cateta opusă, cu b cateta alăturată și cu c ipotenuza.\n\nSinusul este a/c. Cosinusul este b/c. Tangenta este a/b. Cotangenta este b/a. Ele sunt rapoarte de lungimi, deci nu depind de cât de mare desenezi triunghiul, cât timp unghiul rămâne același.\n\nSinusul unui unghi este cosinusul complementului: sin x = cos(90° − x). Tangenta și cotangenta aceluiași unghi au produsul 1.\n\nValorile de ținut minte: la 30°, sinusul este 1/2, cosinusul este jumătate din √3, tangenta este √3 împărțit la 3. La 45°, sinusul și cosinusul sunt jumătate din √2, iar tangenta și cotangenta sunt 1. La 60°, sinusul este jumătate din √3, cosinusul este 1/2, tangenta este √3.',
    example: 'Catetele au 8 cm și 15 cm, ipotenuza are 17 cm. Pentru unghiul opus catetei de 8 cm, cateta alăturată este 15 cm. Cosinusul este 15/17. Sinusul este 8/17. Tangenta este 8/15. La 30°, un triunghi cu ipotenuza 10 cm are cateta opusă 10 · (1/2) = 5 cm.',
    practice: '1. Catete 8 și 15, ipotenuză 17. Cosinusul unghiului opus lui 8? 2. sin 30°. 3. tg 45°. 4. sin 60° este egal cu cos de câte grade?\n\nRăspunsuri: 15/17. 1/2. 1. 30°.',
    mistakes: 'Nu pui ipotenuza la tangență. Nu schimbi opusa cu alăturata când treci de la un unghi ascuțit la celălalt: ele își schimbă rolurile. Nu spune că sinusul poate fi mai mare decât 1 într-un triunghi dreptunghic.',
    tryThis: 'Desenează un triunghi dreptunghic cu un unghi de 45°. Măsoară catetele și spune de ce sinusul și cosinusul ies egale.',
    recap: 'Sinusul este opusa pe ipotenuză, cosinusul este alăturata pe ipotenuză, tangenta este opusa pe alăturată, cotangenta este invers. La 30°, 45° și 60° valorile se țin minte.'
  }),

  lesson('rezolvare-triunghi', 'Rezolvarea triunghiului dreptunghic', {
    figure: 'triangle-right',
    formulas: ['unghiurile ascuțite sunt complementare', 'a = c · sin', 'b = c · cos'],
    theory: 'A rezolva triunghiul dreptunghic înseamnă a afla toate laturile și toate unghiurile. Unghiul drept este cunoscut. Cele două ascuțite au suma 90°.\n\nDacă știi ipotenuza și o catetă, o afli pe cealaltă cu Pitagora. Un unghi ascuțit iese din cosinus sau din sinus, după cateta pe care o ai. Celălalt unghi este complementul.\n\nDacă știi ambele catete, ipotenuza iese din Pitagora. Un unghi iese din tangență: opusa pe alăturată.\n\nDacă știi o latură și un unghi ascuțit, afli celălalt unghi ca diferență până la 90°. Laturile lipsă ies din sinus, cosinus sau tangență, după perechea pe care o cunoști.',
    example: 'Ipotenuza are 10 cm și un unghi ascuțit are 30°. Cateta opusă este 10 · (1/2) = 5 cm. Celălalt unghi are 60°. Cateta alăturată lui 30° este 5√3 cm, pentru că la 30° alăturata este ipotenuza înmulțită cu jumătate din √3. Verificare: 5^2 + (5√3)^2 = 25 + 75 = 100.',
    practice: '1. Unghiuri 90° și 40°. Al treilea? 2. Catete 5 cm și 12 cm. Ipotenuza? 3. Ipotenuză 10 cm și unghi 30°. Cateta opusă?\n\nRăspunsuri: 50°. 13 cm. 5 cm.',
    mistakes: 'Nu căuta al treilea unghi adunând la 180° încă o dată unghiul drept, dacă l-ai folosit deja: ascuțitele fac 90°, toate trei fac 180°. Nu folosi tangenta când ai opusa și ipotenuza: aceea este sinus.',
    tryThis: 'Alege catetele 6 cm și 8 cm. Află ipotenuza și spune ce raport este tangenta unghiului opus lui 6.',
    recap: 'Triunghiul dreptunghic se închide cu Pitagora și cu un raport trigonometric. Unghiurile ascuțite sunt complementare. Din două elemente potrivite le afli pe celelalte.'
  }),

  lesson('aplicatii-poligoane', 'Aplicații în poligoane regulate', {
    figure: 'hexagon',
    formulas: ['hexagon: latura = R', 'pătrat înscris: latura = R√2', 'echilateral înscris: latura = R√3'],
    theory: 'Într-un poligon regulat înscris în cercul de rază R, razele către vârfuri fac triunghiuri cu vârful în centru. Apotema este perpendiculara din centru pe o latură.\n\nTriunghiul echilateral înscris are latura R√3. Apotema este R/2. Perimetrul este 3R√3. Aria este (3R^2 · √3) / 4.\n\nPătratul înscris are diagonala egală cu diametrul, deci latura este R√2. Apotema este (R√2) / 2. Perimetrul este 4R√2. Aria este 2R^2.\n\nHexagonul regulat înscris are latura R. Apotema este (R√3) / 2. Perimetrul este 6R. Aria este (3R^2 · √3) / 2.\n\nAceleași rapoarte măsoară înălțimi și distanțe. Dacă stai la 20 m de un copac și vezi vârful sub un unghi de 30° față de orizontală, înălțimea de deasupra ochiului este 20 înmulțit cu tangenta de 30°, adică (20√3) / 3 metri.',
    example: 'R = 2 cm. Hexagonul are latura 2 cm, perimetrul 12 cm și apotema √3 cm. Aria este (3 · 4 · √3) / 2 = 6√3 cm². Pătratul înscris în același cerc are latura 2√2 cm și aria 8 cm². La copacul văzut sub 30° de la 20 m, înălțimea peste ochi este (20√3) / 3 m.',
    practice: '1. Hexagon regulat, R = 2 cm. Latura? 2. Pătrat înscris, R = 2 cm. Aria? 3. Echilateral înscris, R = 2 cm. Latura?\n\nRăspunsuri: 2 cm. 8 cm². 2√3 cm.',
    mistakes: 'Nu pune latura pătratului înscris egală cu R. Nu uita că aria ține R^2, nu doar R. Nu confunda apotema cu raza: apotema cade perpendicular pe latură, raza ajunge în vârf.',
    tryThis: 'Pentru un cerc de rază 6 cm, calculează latura și perimetrul hexagonului regulat înscris și al pătratului înscris.',
    recap: 'În cercul de rază R, echilateralul înscris are latura R√3, pătratul are latura R√2, hexagonul are latura R. Apotema este perpendiculara din centru pe latură. Aceleași rapoarte măsoară și înălțimi din teren.'
  }),

  lesson('recap-clasa7', 'Recapitulare: relații metrice și clasa a VII-a', {
    figure: 'triangle-right',
    formulas: ['h^2 = p · q', 'a^2 = c · p', 'a^2 + b^2 = c^2', 'sin = a/c'],
    theory: 'Proiecția cade pe perpendiculară. În triunghiul dreptunghic, h^2 = p · q și cateta la pătrat este ipotenuza ori proiecția ei. Din ele iese Pitagora. Diagonala pătratului este l√2, înălțimea echilateralului este (l√3) / 2.\n\nSinusul, cosinusul, tangenta și cotangenta sunt rapoarte de laturi. Cu ele și cu Pitagora rezolvi triunghiul dreptunghic și poligoanele regulate înscrise.\n\nPe tot anul: ℝ umple axa, radicalul și modulul lucrează cu numere reale, ecuațiile și sistemele caută numere sau perechi, axele așază dependențele, patrulaterul și cercul dau forme, Thales și asemănarea dau scara.',
    example: 'Proiecții 2 cm și 8 cm: înălțimea este 4 cm, ipotenuza este 10 cm, catetele sunt 2√5 cm și 4√5 cm. Cosinusul unghiului opus catetei de 8 cm, într-un triunghi 8, 15, 17, este 15/17. Un cerc de rază 7 cm, cu π = 22/7, are lungimea 44 cm.',
    practice: '1. h^2 dacă proiecțiile sunt 3 și 12. 2. Diagonala pătratului de latură 1. 3. sin 30°.\n\nRăspunsuri: 36, deci h = 6. √2. 1/2.',
    mistakes: 'Nu amesteca proiecțiile între cele două catete. Nu folosi aria discului când ți se cere lungimea. Nu închide anul fără să spui în ce mulțime este soluția unei ecuații.',
    tryThis: 'Alege un triunghi dreptunghic cu laturile 6, 8 și 10. Scrie proiecțiile catetelor, înălțimea pe ipotenuză și sinusul unghiului opus lui 6.',
    recap: 'Relațiile metrice leagă proiecțiile, catetele și ipotenuza. Trigonometria le transformă în rapoarte. Împreună cu realele, ecuațiile, datele, patrulaterul, cercul și asemănarea, ele încheie clasa a VII-a.'
  })
];

module.exports = { GEO7_LESSONS };
