// Capitolele V, VI și recapitularea finală din Matematică, clasa a VI-a,
// Litera, A1498 (2023): unghiuri, paralele, perpendiculare, cerc, triunghi.
// Text original. Lungimea cercului cu π și aria discului nu sunt în acest manual.

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

const GEOMETRIE6_LESSONS = [
  lesson('unghi-recap', 'Unghiuri: recapitulare și completări', {
    figure: 'angle',
    formulas: ['1° = 60′', '1′ = 60″', 'Bisectoarea taie unghiul în două unghiuri congruente'],
    theory: 'Un unghi este format din două semidrepte cu aceeași origine. Originea este vârful. Semidreptele sunt laturile. Interiorul este zona dintre laturi. Exteriorul este restul planului.\n\nMăsori cu raportorul, în grade. Gradul se împarte în minute, iar minutul în secunde: 1° = 60′ și 1′ = 60″. La adunare, 60″ urcă un minut, iar 60′ urcă un grad.\n\nUnghiul nul are 0°. Cel ascuțit are mai puțin de 90°. Cel drept are 90°. Cel obtuz este între 90° și 180°. Cel alungit are 180°. Două unghiuri congruente au aceeași măsură.\n\nBisectoarea este semidreapta din vârf care împarte unghiul în două unghiuri congruente.',
    example: 'Un unghi de 40°15′ are bisectoarea la jumătate: 20°7′30″, pentru că 15′ : 2 = 7′30″. 20°50′ + 0°20′ = 21°10′. 1°20″ înseamnă un grad și 20 de secunde, nu 20 de minute.',
    practice: '1. Câte secunde are un minut? 2. 30′ + 40′. 3. Un unghi de 90° cum se numește?\n\nRăspunsuri: 60. 1°10′. Drept.',
    mistakes: 'Nu lăsa 70′ în rezultat. Nu confunda minutul ′ cu secunda ″. Nu numi bisectoare orice semidreaptă din vârf: cele două unghiuri trebuie să fie congruente.',
    tryThis: 'Construiește un unghi de 60° și bisectoarea lui. Scrie măsura fiecărei jumătăți.',
    recap: 'Unghiul are vârf și două laturi. Măsura merge de la 0° la 180° în lecțiile de până acum, cu minute și secunde. Bisectoarea îl taie în două părți congruente.'
  }),

  lesson('complementare', 'Unghiuri complementare și suplementare', {
    figure: 'complementary',
    formulas: ['Complementare: suma 90°', 'Suplementare: suma 180°'],
    theory: 'Două unghiuri sunt complementare dacă suma măsurilor lor este 90°. Complementul unui unghi ascuțit este 90° minus măsura lui.\n\nDouă unghiuri sunt suplementare dacă suma măsurilor lor este 180°. Suplementul unui unghi mai mic decât 180° este 180° minus măsura lui.\n\nNu trebuie să stea lipite ca să aibă aceste nume. Numele vorbește despre sumă, nu despre locul de pe foaie.',
    example: 'Complementul lui 35° este 55°. Suplementul lui 35° este 145°. Un unghi de 90° nu are complement pozitiv: ar rămâne 0°. Suplementul lui este tot 90°.',
    practice: '1. Complementul lui 28°. 2. Suplementul lui 110°. 3. Două unghiuri de 45° sunt complementare?\n\nRăspunsuri: 62°. 70°. Da, 45° + 45° = 90°.',
    mistakes: 'Nu calcula complementul pentru un unghi obtuz: 90° minus un număr mai mare decât 90° nu dă un unghi din lecția asta. Nu schimba 90° cu 180°.',
    tryThis: 'Alege un unghi ascuțit. Scrie complementul și suplementul lui. Adună fiecare pereche și verifică 90° și 180°.',
    recap: 'Complementul completează până la 90°. Suplementul completează până la 180°. Unghiurile pot sta în locuri diferite pe foaie.'
  }),

  lesson('opuse-varf', 'Unghiuri opuse la vârf', {
    figure: 'parallels',
    formulas: ['Unghiurile opuse la vârf sunt congruente', 'În jurul unui punct, suma măsurilor este 360°'],
    theory: 'Când două drepte se taie, formează patru unghiuri. Două unghiuri opuse la vârf au laturile pe semidrepte opuse: stau față în față, nu alături.\n\nEle sunt congruente. Pe scurt: un unghi și cel de lângă el, pe o dreaptă, sunt suplementare, deci fac 180°. Celălalt unghi de lângă același vecin face și el 180° cu vecinul. Scăzând același unghi din 180°, rămân măsuri egale.\n\nUnghiurile din jurul unui punct, așezate unul lângă altul și acoperind tot jurul, au suma măsurilor 360°.',
    example: 'Două drepte se taie și un unghi are 62°. Opusul la vârf are tot 62°. Fiecare alăturat are 180° − 62° = 118°. Suma celor patru este 62° + 118° + 62° + 118° = 360°.',
    practice: '1. Opusul unui unghi de 47°. 2. Suma dintre opus și un alăturat. 3. Trei unghiuri în jurul unui punct au 80°, 90° și 100°. Al patrulea.\n\nRăspunsuri: 47°. 180°. 90°.',
    mistakes: 'Nu spune că opusele la vârf sunt suplementare. Suplementare sunt cele alăturate pe o dreaptă. Nu aduna până la 180° când unghiurile înconjoară un punct.',
    tryThis: 'Desenează două drepte care se taie. Măsoară un unghi. Fără raportor, scrie celelalte trei măsuri și verifică suma 360°.',
    recap: 'Față în față înseamnă congruente. Alături pe o dreaptă înseamnă 180°. În jurul unui punct, măsurile fac 360°.'
  }),

  lesson('adiacente', 'Unghiuri adiacente', {
    figure: 'angle',
    formulas: ['Adiacente: același vârf, o latură comună, interioarele nu se acoperă', 'Bisectoarele a două unghiuri adiacente suplementare sunt perpendiculare'],
    theory: 'Două unghiuri adiacente au același vârf, o latură comună, iar interioarele lor nu se suprapun. Celelalte două laturi sunt de o parte și de alta a laturii comune.\n\nPot fi și suplementare: atunci laturile necomune sunt opuse și formează o dreaptă. Pot fi și complementare: laturile necomune formează un unghi drept.\n\nDacă două unghiuri adiacente sunt suplementare, bisectoarele lor formează un unghi de 90°. Jumătate din 180° este 90°, iar cele două jumătăți stau una lângă alta.',
    example: 'Două unghiuri adiacente suplementare au 50° și 130°. Bisectoarele fac 25° + 65° = 90°. Două unghiuri adiacente de 40° și 50° sunt complementare și formează împreună un unghi drept.',
    practice: '1. Două unghiuri adiacente suplementare au unul de 72°. Celălalt. 2. Unghiul dintre bisectoarele lor. 3. Au același vârf?\n\nRăspunsuri: 108°. 90°. Da.',
    mistakes: 'Nu numi adiacente două unghiuri doar pentru că sunt aproape. Le trebuie latură comună și interioare care nu se amestecă. Nu spune că bisectoarele lor sunt paralele: în cazul suplementar sunt perpendiculare.',
    tryThis: 'Desenează o dreaptă și o semidreaptă dintr-un punct al ei. Ai două unghiuri adiacente suplementare. Construiește bisectoarele și verifică cu echerul unghiul dintre ele.',
    recap: 'Adiacente înseamnă vecine pe o latură comună, fără să se acopere. Dacă sunt și suplementare, bisectoarele lor fac 90°.'
  }),

  lesson('paralele', 'Drepte paralele', {
    figure: 'parallels',
    formulas: ['a ∥ b înseamnă drepte paralele', 'Printr-un punct exterior trece o singură paralelă la o dreaptă'],
    theory: 'Două drepte din plan sunt concurente dacă se taie într-un punct, paralele dacă nu au niciun punct comun, sau confundate dacă sunt aceeași dreaptă. Paralelele se notează a ∥ b.\n\nAxioma paralelelor spune că printr-un punct care nu stă pe o dreaptă trece o singură dreaptă paralelă cu ea.\n\nO consecință: dacă două drepte sunt paralele cu a treia, atunci sunt paralele între ele.\n\nConstruiești o paralelă cu rigla și echerul. Ții rigla fixă, sprijini echerul și trasezi. Apoi muți echerul pe aceeași riglă și trasezi a doua dreaptă.',
    example: 'Dreapta a trece prin A, iar B nu este pe a. Paralela la a prin B este una singură. Dacă c ∥ a și b ∥ a, atunci c ∥ b.',
    practice: '1. Două drepte fără niciun punct comun, în plan, cum se numesc? 2. Câte paralele la dreapta d trec printr-un punct exterior? 3. Dacă a ∥ b și b ∥ c, ce poți spune despre a și c?\n\nRăspunsuri: paralele. Una. a ∥ c.',
    mistakes: 'Nu spune că paralelele se întâlnesc departe. În geometria aceasta nu se întâlnesc. Nu trasa două drepte „care par paralele” fără echer sau fără un criteriu.',
    tryThis: 'Construiește cu rigla și echerul două paralele și o a treia printr-un punct dat. Spune de ce a treia nu poate fi și ea paralelă cu prima dacă o taie.',
    recap: 'Paralelele nu au punct comun. Printr-un punct exterior trece exact o paralelă. Două drepte paralele cu a treia sunt paralele între ele.'
  }),

  lesson('secanta', 'Unghiuri formate cu o secantă', {
    figure: 'parallels',
    formulas: ['Alterne interne', 'Alterne externe', 'Corespunzătoare', 'De aceeași parte a secantei'],
    theory: 'O secantă taie două drepte în două puncte diferite. Se formează opt unghiuri, câte patru în fiecare intersecție.\n\nUnghiurile alterne interne stau între cele două drepte, de o parte și de alta a secantei. Alternale externe stau în afara celor două drepte, tot de părți diferite ale secantei.\n\nUnghiurile corespondente ocupă același loc în cele două intersecții: de exemplu ambele deasupra dreptei și la dreapta secantei.\n\nUnghiurile interne de aceeași parte a secantei stau amândouă între drepte, de aceeași parte a secantei. Cele externe de aceeași parte stau amândouă în afară, de aceeași parte.',
    example: 'Notează unghiurile din stânga sus, în fiecare intersecție, cu 1 și cu 5. Ele sunt corespondente. Unghiul dintre drepte, la stânga secantei, și unghiul dintre drepte, la dreapta secantei, în partea cealaltă, sunt alterne interne.',
    practice: '1. Cum se numesc două unghiuri care stau la fel față de dreaptă și față de secantă, în cele două intersecții? 2. Alternele interne stau între drepte sau în afara lor? 3. O secantă taie două drepte în câte puncte, în desenul acestei lecții?\n\nRăspunsuri: corespondente. Între drepte. Două.',
    mistakes: 'Nu numi corespondente două unghiuri doar pentru că par egale. Numele vine din poziție. Nu amesteca „de aceeași parte” cu „alterne”: alternele stau de părți diferite ale secantei.',
    tryThis: 'Desenează două drepte și o secantă. Colorează o pereche de alterne interne și o pereche de corespondente. Nu măsura încă: doar numește.',
    recap: 'Secanta face opt unghiuri. Le recunoști după loc: interne sau externe, de aceeași parte sau de părți diferite, în aceeași poziție sau nu.'
  }),

  lesson('criterii-paralelism', 'Criterii de paralelism', {
    figure: 'parallels',
    formulas: ['Dacă dreptele sunt paralele, alternele interne sunt congruente', 'Corespunzătoarele sunt congruente', 'Internele de aceeași parte sunt suplementare', 'Reciprocile sunt criterii de paralelism'],
    theory: 'Dacă două drepte paralele sunt tăiate de o secantă, atunci unghiurile alterne interne sunt congruente, alternele externe sunt congruente, corespondentele sunt congruente, iar unghiurile interne de aceeași parte sunt suplementare. La fel cele externe de aceeași parte.\n\nReciproca este criteriu. Dacă la două drepte tăiate de o secantă găsești o pereche de alterne interne congruente, dreptele sunt paralele. La fel dacă o pereche de corespondente sunt congruente, sau dacă o pereche de interne de aceeași parte sunt suplementare.\n\nCu aceste fapte calculezi unghiuri fără să măsori din nou fiecare.',
    example: 'Două paralele sunt tăiate de o secantă. Un unghi intern are 70°. Alternul intern are tot 70°. Internul de aceeași parte are 110°, pentru că 70° + 110° = 180°. Corespondentul are tot 70°.',
    practice: '1. Paralele, un corespondent de 58°. Celălalt corespondent. 2. Internul de aceeași parte cu un unghi de 58°, când dreptele sunt paralele. 3. Dacă două alterne interne au 40° și 40°, dreptele sunt paralele?\n\nRăspunsuri: 58°. 122°. Da.',
    mistakes: 'Nu spune că internele de aceeași parte sunt egale. Ele fac 180° când dreptele sunt paralele. Nu folosi reciproca dacă nu ai măsurat o pereche adevărată de alterne sau de corespondente.',
    tryThis: 'Construiește două paralele cu echerul și o secantă. Măsoară un unghi și scrie alte trei, folosind regulile, apoi verifică unul cu raportorul.',
    recap: 'Paralelele păstrează alternele și corespondentele congruente și fac suplementare unghiurile de aceeași parte, interne. Dacă vezi una dintre aceste situații, poți conchide că dreptele sunt paralele.'
  }),

  lesson('paralele-figuri', 'Paralele în figuri', {
    figure: 'square',
    formulas: ['Pătratul și dreptunghiul au laturile opuse paralele', 'La cub, muchiile de pe aceeași direcție sunt paralele'],
    theory: 'În pătrat și în dreptunghi, laturile opuse sunt paralele, iar laturile vecine sunt perpendiculare. Unghiurile sunt drepte.\n\nÎn hexagonul regulat, laturile opuse sunt paralele. Sunt trei perechi.\n\nLa cub și la paralelipipedul dreptunghic, muchiile care merg în aceeași direcție sunt paralele. Muchiile care se întâlnesc într-un vârf sunt perpendiculare. O față este un pătrat la cub și un dreptunghi la cutie.',
    example: 'Într-un dreptunghi ABCD, AB ∥ CD și AD ∥ BC. Unghiul A este 90°, deci AB ⊥ AD. Pe un cub, muchia de jos din față este paralelă cu muchia de jos din spate și cu cele două muchii de sus care merg în același sens.',
    practice: '1. Într-un pătrat, laturile opuse sunt paralele? 2. Laturile vecine ce unghi fac? 3. Câte perechi de laturi opuse paralele vezi la un hexagon regulat?\n\nRăspunsuri: da. 90°. Trei.',
    mistakes: 'Nu spune că toate muchiile unui cub sunt paralele. Doar cele cu aceeași direcție. Nu confunda perpendicular cu paralel.',
    tryThis: 'Desenează un cub în perspectivă simplă și marchează cu aceeași culoare trei muchii paralele. Cu altă culoare marchează două muchii perpendiculare.',
    recap: 'Paralelele și perpendicularele se văd pe figuri cunoscute: pătrat, dreptunghi, hexagon regulat, cub și cutie. Aceeași direcție înseamnă paralele. Colțul drept înseamnă perpendiculare.'
  }),

  lesson('perpendiculare', 'Drepte perpendiculare', {
    figure: 'perpendicular',
    formulas: ['d ⊥ a înseamnă unghi drept', 'Printr-un punct trece o singură perpendiculară pe o dreaptă', 'Distanța de la punct la dreaptă este lungimea perpendicularei'],
    theory: 'Două drepte perpendiculare se taie și formează un unghi drept. Le notezi d ⊥ a. Cu echerul construiești unghiul de 90°.\n\nPrintr-un punct al dreptei, sau printr-un punct din afara ei, trece o singură perpendiculară pe dreapta dată. Piciorul perpendicularei este punctul în care ea taie dreapta.\n\nDistanța de la un punct la o dreaptă este lungimea segmentului de perpendiculară dus din punct pe dreaptă. Orice altă dreaptă din punct care taie dreapta dată este o oblică. Segmentul de oblică este mai lung decât distanța.',
    example: 'Din A, în afara dreptei d, cobori perpendiculara și piciorul este H. AH este distanța. Dacă o altă dreaptă din A taie d în K, atunci AK este oblică și AK > AH.',
    practice: '1. Ce unghi fac două drepte perpendiculare? 2. Câte perpendiculare pe d trec printr-un punct? 3. Distanța se măsoară pe perpendiculară sau pe oblică?\n\nRăspunsuri: 90°. Una. Pe perpendiculară.',
    mistakes: 'Nu numi distanță o oblică, chiar dacă pare scurtă pe desenul strâmb. Nu duce două perpendiculare din același punct pe aceeași dreaptă: a doua nu este perpendiculară.',
    tryThis: 'Desenează o dreaptă și un punct în afara ei. Cu echerul coboară perpendiculara, marchează piciorul și scrie că segmentul acela este distanța.',
    recap: 'Perpendiculara face 90°. Dintr-un punct pleacă o singură perpendiculară pe o dreaptă. Distanța este lungimea ei până la picior. Oblica este mai lungă.'
  }),

  lesson('mediatoare', 'Mediatoarea unui segment', {
    figure: 'symmetry-axis',
    formulas: ['Mediatoarea trece prin mijloc și este perpendiculară pe segment'],
    theory: 'Mediatoarea unui segment este dreapta perpendiculară pe segment în mijlocul lui. Ea taie segmentul în două părți congruente și face 90° cu el.\n\nO construiești cu rigla și compasul. Deschizi compasul mai mult decât jumătatea segmentului. Cu acul în fiecare capăt trasezi câte un arc, de aceeași parte și de cealaltă. Dreapta prin cele două puncte de intersecție ale arcelor este mediatoarea.\n\nFaptul că orice punct de pe mediatoare este la fel de depărtat de capete se demonstrează mai jos, cu triunghiuri congruente. Aici o recunoști și o construiești.',
    example: 'AB = 8 cm. Mijlocul M este la 4 cm de A și de B. Mediatoarea trece prin M și este perpendiculară pe AB. Un punct P de pe ea, construit cu compasul, vede pe A și pe B la fel de departe, pentru că arcele au avut aceeași deschidere.',
    practice: '1. Prin ce punct al segmentului trece mediatoarea? 2. Ce unghi face cu segmentul? 3. Cu ce instrumente o construiești fără raportor?\n\nRăspunsuri: prin mijloc. 90°. Cu rigla și compasul.',
    mistakes: 'Nu confunda mediatoarea cu mediana: mediana este un segment dintr-un vârf, mediatoarea este o dreaptă prin mijlocul unei laturi. Nu pune „mijlocul” în afara segmentului.',
    tryThis: 'Desenează un segment de 6 cm și construiește mediatoarea cu compasul. Verifică mijlocul cu rigla și unghiul drept cu echerul.',
    recap: 'Mediatoarea este perpendiculara prin mijloc. Compasul, deschis la fel din ambele capete, îți dă două puncte ale ei. Egalitatea distanțelor până la capete se justifică la triunghiuri.'
  }),

  lesson('simetrie-dreapta', 'Simetrie față de o dreaptă', {
    figure: 'symmetry-axis',
    formulas: ['Simetricul stă pe perpendiculară, la aceeași distanță de axă'],
    theory: 'Simetricul unui punct M față de dreapta d se construiește așa: duci perpendiculara din M pe d, cu piciorul H, și iei pe aceeași perpendiculară punctul N astfel încât H să fie mijlocul lui MN. N este simetricul lui M. Dacă M este pe d, simetricul este M însuși.\n\nSimetricul unui segment este segmentul care unește simetricele capetelor. Figurile se transportă punct cu punct.\n\nO dreaptă este axă de simetrie a unei figuri dacă simetricul figurii față de acea dreaptă este figura însăși. Pătratul are patru axe. Dreptunghiul care nu este pătrat are două. Un triunghi oarecare poate să nu aibă niciuna.',
    example: 'M este la 3 cm de axa d, pe perpendiculară. Simetricul N este tot la 3 cm, de cealaltă parte. MN are 6 cm, iar mijlocul stă pe axă. Un pătrat îndoit după diagonala lui se acoperă: diagonala este axă.',
    practice: '1. Dacă M este pe axă, unde este simetricul? 2. Distanțele de la M și de la N până la axă sunt egale? 3. Un segment și simetricul lui au aceeași lungime?\n\nRăspunsuri: tot pe axă, în M. Da. Da.',
    mistakes: 'Nu lua simetricul pe o oblică. Perpendiculara este obligatorie. Nu spune că orice linie prin centrul unui desen este axă: îndoitura trebuie să acopere figura.',
    tryThis: 'Taie o inimă dintr-o foaie îndoită. Deschide și trasează îndoitura. Marchează un punct și simetricul lui față de acea axă.',
    recap: 'Simetricul față de o dreaptă stă pe perpendiculară, la aceeași distanță. Axa de simetrie este dreapta care acoperă figura peste ea însăși.'
  }),

  lesson('cerc-elemente', 'Cercul și elementele lui', {
    figure: 'circle',
    formulas: ['Raza unește centrul cu un punct de pe cerc', 'Diametrul este o coardă prin centru', 'd = 2r'],
    theory: 'Cercul cu centrul O și raza r este mulțimea punctelor din plan aflate la distanța r de O. Discul este cercul împreună cu interiorul. Interiorul este format din punctele a căror distanță până la O este mai mică decât r. Exteriorul, din punctele mai depărtate decât r.\n\nO coardă unește două puncte de pe cerc. Diametrul este coarda care trece prin centru. El are lungimea 2r și este cea mai lungă coardă. Un arc este bucata de cerc dintre două puncte. Semicercul este arcul determinat de un diametru.\n\nConstruiești cercul cu compasul: acul în centru, deschiderea egală cu raza.',
    example: 'O este centrul, OA = 3 cm este rază. Dacă A și B sunt capetele unui diametru, AB = 6 cm și arcul AB, de o parte a diametrului, este un semicerc. Un punct C cu OC = 2 cm este în interior.',
    practice: '1. Raza este 5 cm. Diametrul. 2. Un punct la 5 cm de centru stă pe cerc, în interior sau în exterior? 3. Diametrul este o coardă?\n\nRăspunsuri: 10 cm. Pe cerc. Da, coarda prin centru.',
    mistakes: 'Nu numi rază orice segment din interior. Raza pornește din centru și ajunge pe cerc. Nu confunda discul cu cercul: discul umple interiorul. Nu spune că orice coardă este diametru.',
    tryThis: 'Construiește un cerc cu raza de 4 cm. Desenează o rază, un diametru și o coardă care nu trece prin centru. Notează-le.',
    recap: 'Cercul este linia, discul este linia plus interiorul. Raza fixează distanța. Diametrul este de două ori raza și trece prin centru. Arcul este bucata de cerc.'
  }),

  lesson('unghi-centru', 'Unghi la centru', {
    figure: 'circle-angles',
    formulas: ['Unghiul la centru are vârful în centrul cercului', 'Măsura arcului mic este măsura unghiului la centru', 'Arce congruente în același cerc au coarde congruente'],
    theory: 'Unghiul la centru are vârful în centrul cercului, iar laturile trec prin două puncte de pe cerc. El cuprinde un arc mic, mai mic sau egal cu un semicerc, și lasă în afară arcul mare.\n\nMăsura arcului mic este egală cu măsura unghiului la centru care îl cuprinde. Un semicerc are 180°, pentru că diametrul dă un unghi alungit la centru. Tot cercul, ca drum închis, măsoară 360°.\n\nÎn același cerc, sau în cercuri congruente, arcele congruente au coarde congruente, și coardele congruente determină arce congruente.',
    example: 'Unghiul la centru AOB are 60°. Arcul mic AB are măsura 60°. Coarda AB este una dintre laturile triunghiului OAB, care are OA = OB, deci este isoscel. Un alt unghi la centru de 60°, în același cerc, dă un arc congruent și o coardă congruentă cu AB.',
    practice: '1. Unghi la centru de 90°. Măsura arcului mic. 2. Măsura unui semicerc. 3. Două coarde congruente în același cerc determină arce congruente?\n\nRăspunsuri: 90°. 180°. Da.',
    mistakes: 'Nu măsura arcul mare cu același număr ca unghiul mic, fără să spui că este arcul mare. Arcul mare are 360° minus arcul mic. Nu confunda unghiul la centru cu un unghi care are vârful pe cerc.',
    tryThis: 'Construiește un cerc și un unghi la centru de 60°. Desenează coarda. Construiește încă un unghi de 60° și verifică, cu compasul, că cele două coarde sunt congruente.',
    recap: 'Vârful în centru înseamnă unghi la centru. Arcul mic primește aceeași măsură. În același cerc, arce congruente și coarde congruente merg împreună.'
  }),

  lesson('pozitii-cerc', 'Poziții: dreaptă și cerc, două cercuri', {
    figure: 'circle-tangent',
    formulas: ['d > r: dreaptă exterioară', 'd = r: tangentă', 'd < r: secantă', 'Distanța centrelor decide poziția a două cercuri'],
    theory: 'Fie d distanța de la centrul cercului la o dreaptă, iar r raza. Dacă d > r, dreapta este exterioară: nu atinge cercul. Dacă d = r, dreapta este tangentă: are exact un punct comun cu cercul, punctul de contact. Dacă d < r, dreapta este secantă: taie cercul în două puncte.\n\nDouă cercuri cu razele r și R și cu distanța dintre centre egală cu d se clasifică așa. Exterioare: d > R + r. Tangente exterior: d = R + r. Secante: |R − r| < d < R + r. Tangente interior: d = |R − r|, când unul nu este identic cu celălalt. Interioare, fără punct comun: d < |R − r|. Concentrice: același centru, deci d = 0, și raze diferite.',
    example: 'Raza 5 cm, distanța de la centru la dreaptă 5 cm: tangentă. Două cercuri de raze 3 cm și 4 cm, cu centrele la 7 cm, sunt tangente exterior, pentru că 3 + 4 = 7. Dacă centrele sunt la 1 cm, 4 − 3 = 1, deci sunt tangente interior.',
    practice: '1. d = 2 cm și r = 5 cm. Dreapta este secantă, tangentă sau exterioară? 2. Raze 2 și 5, distanța centrelor 8. Poziția cercurilor. 3. Cercuri cu același centru și raze diferite cum se numesc?\n\nRăspunsuri: secantă. Exterioare, pentru că 8 > 2 + 5. Concentrice.',
    mistakes: 'Nu spune că tangenta taie cercul în două puncte. Are unul singur. Nu aduna razele când cercurile sunt unul în interiorul celuilalt: acolo compari cu diferența.',
    tryThis: 'Construiește un cerc și o tangentă cu echerul: raza până în punctul de contact trebuie să fie perpendiculară pe tangentă. Apoi desenează un al doilea cerc tangent exterior.',
    recap: 'Compari distanța până la dreaptă cu raza. Compari distanța centrelor cu suma și cu diferența razelor. Cazurile egalitate sunt tangențele. Același centru înseamnă cercuri concentrice.'
  }),

  lesson('recap-unghiuri-cerc', 'Recapitulare: unghiuri, paralele, cerc', {
    figure: 'circle',
    formulas: ['Opuse la vârf: congruente', 'Paralele: corespondente congruente', 'd = r: tangentă'],
    theory: 'Unghiul se măsoară în grade, minute și secunde. Complementul duce la 90°, suplementul la 180°. Opusele la vârf sunt congruente. În jurul unui punct sunt 360°. Adiacentele suplementare au bisectoare perpendiculare.\n\nPrintr-un punct exterior trece o singură paralelă. Secanta face alterne, corespondente și unghiuri de aceeași parte. Paralelele le fac congruente sau suplementare, după pereche. Perpendiculara este unică, iar distanța se măsoară pe ea. Mediatoarea trece prin mijloc. Simetria față de o dreaptă păstrează distanța până la axă.\n\nCercul are centru și rază. Diametrul este 2r. Unghiul la centru măsoară arcul mic. Dreapta și al doilea cerc se cunosc comparând distanțe cu raze.',
    example: 'Un unghi de 40° are complementul 50° și suplementul 140°. Opusul la vârf este 40°. O dreaptă la distanța r de centru este tangentă. Două coarde congruente în același cerc subîntind arce congruente.',
    practice: '1. Suplementul lui 20°. 2. d = r. Ce este dreapta față de cerc? 3. Câte paralele la o dreaptă trec printr-un punct exterior?\n\nRăspunsuri: 160°. Tangentă. Una.',
    mistakes: 'Nu măsura distanța pe oblică. Nu confunda arcul mare cu măsura unghiului la centru. Nu spune că internele de aceeași parte sunt egale când dreptele sunt paralele.',
    tryThis: 'Fă trei desene mici: opuse la vârf, paralele cu secantă, cerc cu tangentă. Sub fiecare scrie o propoziție.',
    recap: 'Unghiurile se recunosc după sumă și după poziție. Paralelele și perpendicularele se construiesc și se recunosc prin criterii. Cercul se conduce din centru, rază și distanțe.'
  }),

  lesson('triunghi-clasif', 'Triunghiul. Clasificare. Perimetru', {
    figure: 'triangle',
    formulas: ['Perimetrul = suma laturilor', 'Scalen, isoscel, echilateral', 'Ascuțitunghic, dreptunghic, obtuzunghic'],
    theory: 'Triunghiul are trei vârfuri, trei laturi și trei unghiuri. Interiorul este zona mărginită de laturi. Exteriorul este restul planului.\n\nDupă laturi: scalen, cu toate laturile diferite; isoscel, cu măcar două laturi congruente; echilateral, cu toate laturile congruente. Laturile congruente ale isoscelului se numesc laturi, iar a treia este baza. Vârful isoscelului este vârful comun al laturilor congruente.\n\nDupă unghiuri: ascuțitunghic, cu toate unghiurile ascuțite; dreptunghic, cu un unghi drept; obtuzunghic, cu un unghi obtuz. În triunghiul dreptunghic, latura opusă unghiului drept este ipotenuza, iar celelalte două sunt catete.\n\nPerimetrul este suma lungimilor laturilor.',
    example: 'Laturile 5 cm, 5 cm și 6 cm dau un triunghi isoscel. Perimetrul este 16 cm. Un triunghi cu un unghi de 90° și catete de 3 cm și 4 cm este dreptunghic. Un triunghi cu toate laturile de 4 cm este echilateral.',
    practice: '1. Laturile 3, 4 și 5 cm. Perimetrul. 2. Toate laturile egale: ce fel de triunghi după laturi? 3. Poate un triunghi avea două unghiuri obtuze?\n\nRăspunsuri: 12 cm. Echilateral. Nu. Un triunghi obtuzunghic are un singur unghi obtuz.',
    mistakes: 'Nu numi isoscel doar triunghiul cu exact două laturi egale și să excluzi echilateralul: echilateralul este și isoscel. Nu confunda perimetrul cu o latură. Nu pune ipotenuza lângă unghiul drept: ea este vizavi.',
    tryThis: 'Desenează un triunghi scalen și unul isoscel. Măsoară laturile și calculează perimetrele. Spune clasificarea fiecăruia după laturi.',
    recap: 'Trei vârfuri, trei laturi, trei unghiuri. Clasifici după laturi și după unghiuri. Perimetrul este suma laturilor. Ipotenuza stă vizavi de unghiul drept.'
  }),

  lesson('suma-unghiuri', 'Suma unghiurilor. Unghi exterior', {
    figure: 'triangle',
    formulas: ['Suma unghiurilor unui triunghi este 180°', 'Unghiul exterior = suma unghiurilor interioare neadiacente'],
    theory: 'Suma măsurilor unghiurilor unui triunghi este 180°. O idee de demonstrație: prin vârful A duci paralela la latura opusă. Unghiul din A și cele două unghiuri alterne interne, congruente cu unghiurile din B și din C, stau unul lângă altul și formează un unghi alungit, de 180°.\n\nDacă prelungești o latură, unghiul dintre prelungire și latura vecină este unghi exterior. El este adiacent și suplementar cu unghiul interior de lângă el. Măsura lui este egală cu suma celor două unghiuri interioare care nu îi sunt alăturate.\n\nConsecințe: într-un triunghi dreptunghic, unghiurile ascuțite sunt complementare. Într-un triunghi echilateral, fiecare unghi are 60°.',
    example: 'Unghiurile de 50° și 60° lasă al treilea de 70°. Dacă unghiul interior de lângă un exterior este 70°, exteriorul are 110°. Suma celorlalte două interioare este tot 110°. La isoscel cu unghiul din vârf de 40°, unghiurile de la bază au (180° − 40°) : 2 = 70° fiecare.',
    practice: '1. Unghiuri de 35° și 75°. Al treilea. 2. Triunghi echilateral: un unghi. 3. Într-un dreptunghic, un unghi ascuțit are 32°. Celălalt ascuțit.\n\nRăspunsuri: 70°. 60°. 58°.',
    mistakes: 'Nu aduna unghiurile până la 360°. Nu spune că unghiul exterior este egal cu cel interior de lângă el: ele fac împreună 180°. Nu uita să împarți restul la doi doar când cele două unghiuri de la bază sunt congruente.',
    tryThis: 'Decupează un triunghi de hârtie, rupe cele trei colțuri și lipește-le unul lângă altul. Vezi unghiul alungit. Scrie 180°.',
    recap: 'Cele trei unghiuri fac 180°. Exteriorul face 180° cu interiorul de lângă el și este egal cu suma celorlalte două interioare. Dreptunghicul are ascuțitele complementare. Echilateralul are 60°, 60°, 60°.'
  }),

  lesson('constructie-triunghi', 'Construcția triunghiurilor', {
    figure: 'triangle',
    formulas: ['LUL, ULU, LLL', 'Într-un triunghi, fiecare latură este mai mică decât suma celorlalte două'],
    theory: 'Construiești un triunghi cu rigla, compasul și raportorul, când datele îl determină.\n\nCazul LUL: știi două laturi și unghiul dintre ele. Desenezi unghiul, iei lungimile pe laturi și unești capetele.\n\nCazul ULU: știi o latură și unghiurile de la capetele ei. Desenezi latura, construiești unghiurile la capete și prelungești laturile până se taie. Al treilea unghi iese din suma 180°.\n\nCazul LLL: știi cele trei laturi. Desenezi una, iar din capete duci arce cu razele egale cu celelalte două laturi. Intersecția arcelor este al treilea vârf.\n\nTriunghiul există doar dacă fiecare latură este mai mică decât suma celorlalte două și mai mare decât diferența lor. Altfel arcele nu se taie.',
    example: 'Laturile 3 cm, 4 cm și 5 cm: 3 + 4 > 5, 3 + 5 > 4 și 4 + 5 > 3, deci triunghiul există. Laturile 2 cm, 3 cm și 6 cm: 2 + 3 < 6, deci nu există. La LUL, laturile 4 cm și 5 cm cu unghiul dintre ele de 60° se construiesc fără să mai cauți a treia latură dinainte.',
    practice: '1. 5, 5 și 9 pot fi laturile unui triunghi? 2. 2, 2 și 5? 3. La cazul LLL de ce folosești compasul?\n\nRăspunsuri: da, 5 + 5 > 9. Nu, 2 + 2 < 5. Ca să duci arce cu razele date din capetele primei laturi.',
    mistakes: 'Nu porni construcția dacă inegalitatea laturilor cade. Nu pune la LUL unghiul lângă o singură latură și să uiți că el trebuie să fie între cele două laturi date. Nu închide triunghiul „din ochi” când ai compasul.',
    tryThis: 'Construiește un triunghi cu laturile 6 cm, 5 cm și 4 cm. Verifică cu rigla că ai nimerit lungimile.',
    recap: 'LUL, ULU și LLL îți spun ce desenezi întâi. Inegalitatea laturilor spune dacă triunghiul există. Compasul păstrează lungimea.'
  }),

  lesson('bisectoare-tri', 'Bisectoarele triunghiului', {
    figure: 'triangle-lines',
    formulas: ['Bisectoarea dintr-un vârf taie unghiul în două', 'Cele trei bisectoare se întâlnesc în centrul cercului înscris'],
    theory: 'Bisectoarea unui unghi al triunghiului este semidreapta din vârf care împarte unghiul în două unghiuri congruente. În triunghi o desenezi până la latura opusă.\n\nCele trei bisectoare se întâlnesc într-un singur punct. Punctul acesta este egal depărtat de cele trei laturi. Distanța se măsoară pe perpendiculara până la latură. De aceea el este centrul cercului înscris: cercul din interior, tangent la cele trei laturi.',
    example: 'Într-un triunghi cu unghiurile de 50°, 60° și 70°, bisectoarele taie unghiurile în 25° și 25°, 30° și 30°, 35° și 35°. Punctul lor comun este centrul cercului înscris. Raza cercului este perpendiculara din acel punct pe oricare latură.',
    practice: '1. Bisectoarea taie unghiul sau latura în două părți neapărat egale? 2. Cercul înscris este tangent la laturi sau trece prin vârfuri? 3. Câte bisectoare are un triunghi?\n\nRăspunsuri: taie unghiul în două unghiuri congruente. Nu taie mereu latura opusă în părți egale. Tangent la laturi. Trei.',
    mistakes: 'Nu confunda bisectoarea cu mediana. Mediana merge la mijlocul laturii. Bisectoarea împarte unghiul. Nu desena cercul înscris prin vârfuri: acela este circumscris.',
    tryThis: 'Desenează un triunghi ascuțitunghic și cele trei bisectoare cu raportorul. Marchează punctul comun și încearcă cercul tangent la o latură.',
    recap: 'Bisectoarea împarte unghiul. Cele trei trec prin centrul cercului înscris, aflat la aceeași distanță de laturi.'
  }),

  lesson('mediatoare-tri', 'Mediatoarele triunghiului', {
    figure: 'triangle-lines',
    formulas: ['Mediatoarele se întâlnesc în centrul cercului circumscris'],
    theory: 'Mediatoarea unei laturi este perpendiculara prin mijlocul ei. În triunghi sunt trei.\n\nEle se întâlnesc într-un punct egal depărtat de cele trei vârfuri. Punctul este centrul cercului circumscris: cercul care trece prin toate vârfurile. Raza este distanța de la centru până la un vârf.\n\nLa triunghiul ascuțitunghic, centrul este în interior. La triunghiul dreptunghic, este mijlocul ipotenuzei. La triunghiul obtuzunghic, este în exterior.',
    example: 'Într-un dreptunghic cu ipotenuza AB, mediatoarele se taie în mijlocul lui AB. Cercul circumscris are diametrul AB. Într-un obtuzunghic, dacă încerci să pui centrul în interior, distanțele până la vârfuri nu se potrivesc: centrul iese afară.',
    practice: '1. Cercul circumscris trece prin vârfuri sau este tangent la laturi? 2. La triunghiul dreptunghic, unde stă centrul cercului circumscris? 3. Mediatoarea este perpendiculară pe latură?\n\nRăspunsuri: prin vârfuri. În mijlocul ipotenuzei. Da.',
    mistakes: 'Nu pune centrul cercului circumscris mereu în interior. La obtuzunghic este afară. Nu confunda acest cerc cu cel înscris.',
    tryThis: 'Construiește mediatoarele unui triunghi cu compasul. Așază acul compasului în punctul comun și verifică că treci prin toate vârfurile.',
    recap: 'Mediatoarele laturilor se întâlnesc în centrul cercului circumscris, la egală distanță de vârfuri. Locul centrului depinde de felul triunghiului: interior, pe ipotenuză sau exterior.'
  }),

  lesson('inaltimi', 'Înălțimile triunghiului', {
    figure: 'triangle-lines',
    formulas: ['Înălțimea este perpendiculara din vârf pe dreapta laturii opuse', 'Ortocentrul este intersecția înălțimilor'],
    theory: 'Înălțimea dintr-un vârf este perpendiculara dusă din acel vârf pe dreapta laturii opuse. Piciorul poate cădea pe latură sau pe prelungirea ei.\n\nÎn triunghiul ascuțitunghic, toate picioarele cad pe laturi, iar ortocentrul, intersecția înălțimilor, este în interior. În triunghiul dreptunghic, catetele sunt deja înălțimi, iar ortocentrul este vârful unghiului drept. În triunghiul obtuzunghic, două înălțimi cad pe prelungiri, iar ortocentrul este în exterior.',
    example: 'Într-un dreptunghic cu unghiul drept în C, înălțimile din A și din B folosesc catetele, iar înălțimea din C pe ipotenuză trece și ea prin C doar dacă este construită corect din C. Ortocentrul este C. Într-un ascuțitunghic, cele trei perpendiculare se taie înăuntru.',
    practice: '1. Ce unghi face înălțimea cu dreapta laturii opuse? 2. Unde este ortocentrul unui triunghi dreptunghic? 3. La obtuzunghic, ortocentrul este în interior?\n\nRăspunsuri: 90°. În vârful unghiului drept. Nu, este în exterior.',
    mistakes: 'Nu coborî înălțimea „pieziș”, până pare că ai atins latura. Ea este perpendiculară. Nu spune că piciorul stă mereu între capetele laturii: la obtuzunghic poate sta pe prelungire.',
    tryThis: 'Desenează un triunghi obtuzunghic și coboară o înălțime care cade în afara laturii. Marchează piciorul pe prelungire.',
    recap: 'Înălțimea este perpendiculara din vârf pe dreapta laturii opuse. Cele trei se taie în ortocentru. Locul lui este în interior, în vârful drept sau în exterior, după unghiuri.'
  }),

  lesson('mediane', 'Medianele triunghiului', {
    figure: 'triangle-lines',
    formulas: ['Mediana unește vârful cu mijlocul laturii opuse', 'Centrul de greutate taie fiecare mediană în raportul 2 : 1, cu partea lungă spre vârf'],
    theory: 'Mediana dintr-un vârf este segmentul de la vârf până la mijlocul laturii opuse. Cele trei mediane se întâlnesc într-un punct, centrul de greutate.\n\nPunctul acesta taie fiecare mediană în două părți. Partea de la vârf până la centru este de două ori partea de la centru până la mijlocul laturii. Dacă toată mediana are lungimea 3k, atunci 2k stau spre vârf și k spre bază. De aceea se spune două treimi de la vârf și o treime de la mijlocul laturii.',
    example: 'O mediană are 9 cm. Centrul de greutate este la 6 cm de vârf și la 3 cm de mijlocul laturii. 6 : 3 = 2 : 1. Într-un triunghi isoscel, mediana pe bază este și înălțime, pentru că mijlocul bazei este și piciorul perpendicularei din vârf.',
    practice: '1. Mediana unește vârful cu ce punct al laturii opuse? 2. Mediana are 12 cm. Distanța de la vârf până la centrul de greutate. 3. Cele trei mediane se taie într-un punct?\n\nRăspunsuri: cu mijlocul. 8 cm. Da.',
    mistakes: 'Nu pune centrul de greutate la jumătatea medianei. Raportul este 2 : 1, nu 1 : 1. Nu numi mediană o perpendiculară dacă nu trece prin mijlocul laturii.',
    tryThis: 'Desenează un triunghi, marchează mijloacele laturilor și du medianele. Măsoară una și verifică împărțirea în 2 și 1.',
    recap: 'Mediana ajunge în mijlocul laturii. Cele trei se taie în centrul de greutate. De la vârf până acolo sunt două treimi din mediană.'
  }),

  lesson('congruenta', 'Congruența triunghiurilor', {
    figure: 'triangle',
    formulas: ['△ABC ≡ △MNP dacă vârfurile corespund în ordinea scrisă'],
    theory: 'Două triunghiuri congruente se suprapun. Laturile corespunzătoare sunt congruente și unghiurile corespunzătoare sunt congruente.\n\nScrierea △ABC ≡ △MNP spune ordinea vârfurilor. A corespunde lui M, B lui N, C lui P. Atunci latura AB corespunde laturii MN, BC lui NP, CA lui PM. Unghiul din A corespunde unghiului din M.\n\nDacă schimbi ordinea literelor, spui altă corespondență. De aceea nu amesteci vârfurile doar ca să iasă aceleași litere.',
    example: '△ABC ≡ △DEF, cu A către D, B către E, C către F. Dacă AB = 5 cm, atunci DE = 5 cm. Dacă unghiul din C are 40°, unghiul din F are 40°. Latura BC corespunde laturii EF, nu laturii DE.',
    practice: '1. În △ABC ≡ △MNP, ce latură corespunde lui BC? 2. Unghiul din A cui corespunde? 3. Triunghiurile congruente au și perimetrele egale?\n\nRăspunsuri: NP. Unghiului din M. Da, pentru că laturile corespunzătoare sunt congruente.',
    mistakes: 'Nu scrie congruența cu vârfurile în altă ordine decât corespondența. Nu spune că aceeași arie ajunge pentru congruență. Nu potrivi o latură mică peste o latură mare.',
    tryThis: 'Desenează două triunghiuri congruente prin copiere pe calc. Notează vârfurile în corespondență și scrie trei perechi: o latură și două unghiuri.',
    recap: 'Congruența este suprapunerea. Ordinea literelor spune ce vârf cade peste ce vârf. Din ea urmează laturile și unghiurile corespunzătoare.'
  }),

  lesson('criterii-congruenta', 'Criterii de congruență', {
    figure: 'triangle',
    formulas: ['LUL: două laturi și unghiul dintre ele', 'ULU: o latură și unghiurile de lângă ea', 'LLL: cele trei laturi'],
    theory: 'Nu trebuie să știi toate cele șase elemente ca să spui că două triunghiuri sunt congruente. Ajunge unul dintre cazurile acestea.\n\nLUL: două laturi și unghiul cuprins între ele, congruente cu elementele corespunzătoare din celălalt triunghi.\n\nULU: o latură și cele două unghiuri de la capetele ei, congruente cu elementele corespunzătoare.\n\nLLL: cele trei laturi, fiecare congruentă cu latura corespunzătoare.\n\nÎn demonstrație spui cazul, arăți cele trei perechi și tragi concluzia. Apoi poți folosi și celelalte elemente, pentru că triunghiurile sunt congruente.',
    example: 'În △ABC și △MNP, AB = MN, AC = MP și unghiul din A este congruent cu unghiul din M. Unghiul este între laturile date. Cazul este LUL, deci △ABC ≡ △MNP. Atunci și BC = NP.',
    practice: '1. Știi cele trei laturi. Ce caz folosești? 2. Știi o latură și unghiurile de la capete. Ce caz? 3. Două laturi și un unghi care nu este între ele îți dau, în lecția asta, LUL?\n\nRăspunsuri: LLL. ULU. Nu. La LUL unghiul trebuie să fie cel cuprins între laturi.',
    mistakes: 'Nu aplica LUL când unghiul cunoscut este în afara celor două laturi. Nu amesteca ULU cu „orice unghi și orice latură”. Latura trebuie să fie cea dintre cele două unghiuri. Nu conchide congruența dintr-o singură latură egală.',
    tryThis: 'Construiește două triunghiuri cu aceleași trei laturi, în alt loc pe foaie. Decupează-le sau compară-le cu compasul și spune cazul folosit.',
    recap: 'LUL, ULU și LLL sunt suficiente. Scrii perechile care se potrivesc cazului, apoi spui că triunghiurile sunt congruente și folosești restul elementelor.'
  }),

  lesson('congruenta-dreptunghic', 'Congruența triunghiurilor dreptunghice', {
    figure: 'triangle-right',
    formulas: ['C.C.: cele două catete', 'C.U.: o catetă și unghiul ascuțit de lângă ea', 'I.U.: ipotenuza și un unghi ascuțit', 'I.C.: ipotenuza și o catetă'],
    theory: 'La triunghiurile dreptunghice, unghiul drept este deja congruent cu unghiul drept. De aceea criteriile se spun mai scurt.\n\nCatetă-catetă: cele două catete congruente cu cele două catete. Este un LUL, cu unghiul drept între catete.\n\nCatetă-unghi ascuțit: o catetă și unghiul ascuțit alăturat ei, congruente cu elementele corespunzătoare.\n\nIpotenuză-unghi ascuțit: ipotenuza și un unghi ascuțit, congruente cu elementele corespunzătoare.\n\nIpotenuză-catetă: ipotenuza și o catetă, congruente cu elementele corespunzătoare.\n\nÎn fiecare caz spui numele și perechile, apoi concluzionezi congruența.',
    example: 'Două triunghiuri dreptunghice au catetele de 3 cm și 4 cm. Cazul catetă-catetă le face congruente. Ipotenuza fiecăruia este aceeași, fără să o mai măsori de două ori. Dacă două dreptunghice au ipotenuza de 13 cm și o catetă de 5 cm, cazul ipotenuză-catetă dă congruența.',
    practice: '1. Două dreptunghice au ambele catete respectiv egale. Ce caz? 2. Au ipotenuza și un unghi de 30° egale. Ce caz? 3. Unghiul drept trebuie scris printre date sau este deja comun?\n\nRăspunsuri: catetă-catetă. Ipotenuză-unghi ascuțit. Este deja comun la toate triunghiurile dreptunghice.',
    mistakes: 'Nu folosi ipotenuză-catetă cu două catete și fără ipotenuză: acela este catetă-catetă. Nu uita că unghiul din caz trebuie să fie ascuțit, nu cel drept, când criteriul îl pomenește separat. Nu aplica aceste nume la un triunghi care nu este dreptunghic.',
    tryThis: 'Desenează două triunghiuri dreptunghice cu catetele 5 cm și 6 cm. Spune cazul și verifică cu compasul ipotenuzele.',
    recap: 'La dreptunghice, unghiul drept este deja o pereche. Restul se încheie cu catete, cu ipotenuză și cu un unghi ascuțit, în cele patru combinații: C.C., C.U., I.U., I.C.'
  }),

  lesson('metoda-congruente', 'Metoda triunghiurilor congruente', {
    figure: 'triangle',
    formulas: ['Ipoteză: ce știi', 'Concluzie: ce vrei să arăți', 'La mijloc: triunghiurile și cazul'],
    theory: 'Ca să arăți că două segmente sau două unghiuri sunt congruente, cauți două triunghiuri care le conțin. Arăți că triunghiurile sunt congruente printr-un caz. Apoi elementele corespunzătoare sunt congruente.\n\nRedactarea are trei părți. Ipoteza este ce îți dă desenul sau enunțul. Concluzia este ce vrei să dovedești. Demonstrația leagă ipoteza de concluzie, cu cazul de congruență și cu corespondența vârfurilor.\n\nNu sări de la „se vede” la „deci”. Spune perechile.',
    example: 'Segmentele AC și BD se taie în M. Știi că AM = CM, BM = DM, iar unghiurile AMB și CMD sunt opuse la vârf, deci congruente. Ipoteză: aceste trei perechi. Cazul LUL dă △AMB ≡ △CMD, cu A către C, M către M și B către D. Concluzie: AB = CD, pentru că sunt laturi corespunzătoare.',
    practice: '1. Ce scrii întâi într-o demonstrație, ipoteza sau concluzia? 2. După ce triunghiurile sunt congruente, elementele corespunzătoare sunt congruente? 3. „Se vede pe desen” înlocuiește cazul de congruență?\n\nRăspunsuri: ipoteza, apoi concluzia, apoi demonstrația. Da. Nu.',
    mistakes: 'Nu afirma congruența fără caz. Nu schimba corespondența vârfurilor la mijlocul demonstrației. Nu folosi concluzia ca și cum ar fi deja în ipoteză.',
    tryThis: 'Desenează două triunghiuri cu un vârf comun și o pereche de unghiuri opuse la vârf. Marchează două perechi de laturi egale care îți dau LUL și scrie ipoteza și concluzia.',
    recap: 'Metoda caută triunghiuri care poartă segmentele sau unghiurile cerute. Le faci congruente printr-un caz. Scrii ipoteza, concluzia și perechile. Corespondența vârfurilor rămâne aceeași până la capăt.'
  }),

  lesson('puncte-bisectoare', 'Puncte pe bisectoare și pe mediatoare', {
    figure: 'symmetry-axis',
    formulas: ['Un punct de pe bisectoare este la fel de depărtat de laturile unghiului', 'Un punct de pe mediatoare este la fel de depărtat de capetele segmentului'],
    theory: 'Orice punct de pe bisectoarea unui unghi este la aceeași distanță de laturile unghiului. Distanța se măsoară pe perpendiculară. Reciproc: dacă un punct din interiorul unghiului este la fel de depărtat de laturi, el stă pe bisectoare.\n\nIdeea: din punct cobori perpendicularele pe laturi. Triunghiurile dreptunghice care se formează au ipotenuza comună și un unghi ascuțit congruent, jumătate din unghiul dat. Cazul potrivit le face congruente, deci și distanțele sunt congruente.\n\nOrice punct de pe mediatoarea unui segment este la aceeași distanță de capete. Reciproc: dacă un punct este la fel de depărtat de capete, el stă pe mediatoare. Triunghiurile din capete și din punct au cele trei laturi respectiv egale, deci sunt congruente, iar unghiurile de la mijloc ies drepte și alăturate.',
    example: 'P este pe bisectoarea unghiului AOB. Perpendicularele din P pe laturi au aceeași lungime. Q este pe mediatoarea lui AB, deci QA = QB. Dacă un punct R are RA = RB, atunci R stă pe mediatoare.',
    practice: '1. Distanțele de la un punct al bisectoarei până la laturi sunt egale? 2. QA = QB. Unde stă Q față de AB? 3. Distanța până la o latură se măsoară pe perpendiculară?\n\nRăspunsuri: da. Pe mediatoarea lui AB. Da.',
    mistakes: 'Nu măsura distanța până la latură pe o oblică. Nu spune că orice punct egal depărtat de capete este mijlocul segmentului: poate sta în afara dreptei, pe mediatoare.',
    tryThis: 'Construiește mediatoarea unui segment și alege un punct pe ea. Cu compasul verifică distanțele până la capete. Apoi fă la fel pentru o bisectoare și distanțele până la laturi.',
    recap: 'Bisectoarea strânge punctele egal depărtate de laturi. Mediatoarea strânge punctele egal depărtate de capete. Ambele au și reciprocă: distanțele egale te aduc înapoi pe dreaptă.'
  }),

  lesson('isoscel', 'Triunghiul isoscel', {
    figure: 'triangle-iso',
    formulas: ['Unghiurile de la bază sunt congruente', 'Bisectoarea din vârf este și mediană, și înălțime, și mediatoare'],
    theory: 'Într-un triunghi isoscel, unghiurile de la bază sunt congruente. Reciproc: dacă într-un triunghi două unghiuri sunt congruente, atunci laturile opuse lor sunt congruente, deci triunghiul este isoscel.\n\nÎnălțimea, mediana, bisectoarea și mediatoarea care pleacă din vârful isoscelului, față de bază, sunt aceeași dreaptă. Bisectoarea din vârf cade în mijlocul bazei și este perpendiculară pe bază.\n\nDemonstrația împarte triunghiul în două triunghiuri congruente, prin LUL sau prin LLL, după ce duci bisectoarea.',
    example: 'Laturile congruente au 7 cm, baza are 4 cm. Unghiul din vârf are 40°. Unghiurile de la bază au câte 70°. Bisectoarea din vârf taie baza în 2 cm și 2 cm și face 90° cu baza.',
    practice: '1. Un triunghi are două unghiuri de 65°. Este isoscel? 2. Baza unui isoscel are 10 cm. Mediana din vârf o taie în ce lungimi? 3. Unghiul dintre această mediană și bază.\n\nRăspunsuri: da. 5 cm și 5 cm. 90°.',
    mistakes: 'Nu spune că toate unghiurile unui isoscel sunt egale. Doar cele de la bază, în general. Echilateralul este cazul în care sunt toate egale. Nu lua ca bază o latură congruentă cu alta dacă vârful pe care îl folosești nu este cel dintre ele.',
    tryThis: 'Construiește un isoscel cu compasul, aceeași deschidere din capetele bazei. Măsoară unghiurile de la bază. Verifică că mediana din vârf este perpendiculară pe bază.',
    recap: 'Două laturi congruente înseamnă două unghiuri de la bază congruente, și invers. Din vârful dintre laturile congruente, bisectoarea, mediana, înălțimea și mediatoarea coincid.'
  }),

  lesson('echilateral', 'Triunghiul echilateral', {
    figure: 'triangle-equilateral',
    formulas: ['Toate unghiurile au 60°', 'Un isoscel cu un unghi de 60° este echilateral', 'Liniile importante din fiecare vârf coincid'],
    theory: 'Triunghiul echilateral are toate laturile congruente. El este isoscel față de orice latură luată ca bază. De aceea toate unghiurile sunt congruente. Suma lor este 180°, deci fiecare are 60°.\n\nReciproc, un triunghi cu toate unghiurile de 60° este echilateral. Mai scurt: un triunghi isoscel care are un unghi de 60° este echilateral. Dacă unghiul de 60° este la vârf, unghiurile de la bază sunt și ele de 60°. Dacă este la bază, celălalt unghi de la bază este 60°, iar vârful iese tot de 60°.\n\nÎnălțimea, mediana, bisectoarea și mediatoarea corespunzătoare aceleiași laturi coincid. Toate aceste linii, din cele trei vârfuri, trec prin același punct. Acel punct este și centrul cercului înscris, și centrul cercului circumscris, și ortocentrul, și centrul de greutate.',
    example: 'Latura este 6 cm. Unghiurile sunt 60°, 60° și 60°. Înălțimea cade la 3 cm de fiecare capăt al bazei. Un isoscel cu unghiul din vârf de 60° are și unghiurile de la bază de 60°, deci este echilateral.',
    practice: '1. Un unghi al echilateralului. 2. Un isoscel cu un unghi la bază de 60° este echilateral? 3. Centrul cercului înscris și centrul cercului circumscris coincid la echilateral?\n\nRăspunsuri: 60°. Da. Da.',
    mistakes: 'Nu spune că orice isoscel este echilateral. Îți trebuie și unghiul de 60°, sau toate laturile egale. Nu căuta patru centre diferite: la echilateral ele sunt același punct.',
    tryThis: 'Construiește un echilateral cu compasul, deschiderea egală cu latura. Măsoară un unghi și verifică 60°.',
    recap: 'Trei laturi egale înseamnă trei unghiuri de 60°. Un isoscel cu un unghi de 60° este echilateral. Liniile importante se suprapun și se întâlnesc în același punct.'
  }),

  lesson('pitagora', 'Triunghiul dreptunghic și Pitagora', {
    figure: 'triangle-right',
    formulas: ['Cateta opusă unghiului de 30° este jumătate din ipotenuză', 'Mediana pe ipotenuză este jumătate din ipotenuză', 'a^2 + b^2 = c^2, cu c ipotenuza'],
    theory: 'Într-un triunghi dreptunghic, cateta opusă unghiului de 30° este jumătate din ipotenuză. Reciproc: dacă o catetă este jumătate din ipotenuză, unghiul opus ei are 30°, iar celălalt unghi ascuțit are 60°.\n\nMediana dusă din unghiul drept pe ipotenuză este jumătate din ipotenuză. Reciproc: dacă într-un triunghi o mediană este jumătate din latura pe care cade, triunghiul este dreptunghic în vârful din care pleacă mediana.\n\nTeorema lui Pitagora: dacă triunghiul este dreptunghic și c este ipotenuza, iar a și b sunt catetele, atunci a^2 + b^2 = c^2. O poți verifica măsurând un triunghi dreptunghic și comparând pătratele numerelor. Reciproca: dacă a^2 + b^2 = c^2, triunghiul cu aceste laturi este dreptunghic, iar unghiul drept este vizavi de c.\n\nTripletele 3, 4, 5 și 5, 12, 13, împreună cu multiplii lor, verifică relația.',
    example: 'Catetele 6 cm și 8 cm. 6^2 + 8^2 = 36 + 64 = 100 = 10^2. Ipotenuza este 10 cm. Perimetrul este 24 cm. Dacă ipotenuza este 10 cm și un unghi are 30°, cateta opusă are 5 cm. Mediana pe ipotenuză are tot 5 cm.',
    practice: '1. Catete 5 și 12. Ipotenuza. 2. Ipotenuză 18 cm, unghi de 30°. Cateta opusă. 3. Laturile 6, 8 și 10 formează un triunghi dreptunghic?\n\nRăspunsuri: 13. 9 cm. Da, pentru că 36 + 64 = 100.',
    mistakes: 'Nu aplica Pitagora într-un triunghi care nu este dreptunghic, decât ca să verifici reciproca pe laturi. Nu pune la pătrat și ipotenuza în stânga, lângă o catetă. Nu lua cateta alăturată unghiului de 30° drept jumătate din ipotenuză: jumătate este cea opusă.',
    tryThis: 'Desenează un dreptunghic 6 cm pe 8 cm, măsoară ipotenuza și verifică dacă este aproape de 10 cm. Apoi scrie 6^2 + 8^2 și 10^2.',
    recap: 'Vizavi de 30° stă jumătate din ipotenuză. Mediana pe ipotenuză este și ea jumătate. Pitagora leagă pătratele catetelor de pătratul ipotenuzei, iar reciproca recunoaște triunghiul dreptunghic.'
  }),

  lesson('recap-final', 'Recapitulare: triunghiul și clasa a VI-a', {
    figure: 'triangle-right',
    formulas: ['Suma unghiurilor = 180°', 'LUL, ULU, LLL', 'a^2 + b^2 = c^2'],
    theory: 'Anul a pornit de la mulțimi și de la divizibilitate, a continuat cu rapoarte, proporții, procente și probabilități, apoi cu întregii și cu raționalele. Geometria a adăugat unghiurile, paralelele, perpendicularele și cercul.\n\nTriunghiul se clasifică după laturi și după unghiuri. Suma unghiurilor este 180°. Se construiește în cazurile LUL, ULU și LLL, dacă laturile îndeplinesc inegalitatea.\n\nBisectoarele dau cercul înscris. Mediatoarele dau cercul circumscris. Înălțimile dau ortocentrul. Medianele dau centrul de greutate, la două treimi de vârf.\n\nCongruența se demonstrează prin LUL, ULU, LLL, iar la dreptunghice prin cele patru cazuri scurte. Isoscelul are unghiurile de la bază egale. Echilateralul are 60°. Dreptunghicul are regula de 30°, mediana pe ipotenuză și teorema lui Pitagora.',
    example: 'Un isoscel cu unghiul din vârf de 80° are baza cu unghiuri de 50° fiecare. Un dreptunghic cu catetele 9 și 12 are ipotenuza 15, pentru că 81 + 144 = 225 = 15^2. Un echilateral are toate unghiurile de 60° și un singur centru pentru liniile importante.',
    practice: '1. Suma unghiurilor unui triunghi. 2. Catete 3 și 4. Ipotenuza. 3. Mediana de 12 cm este tăiată de centrul de greutate la câți centimetri de vârf?\n\nRăspunsuri: 180°. 5. 8 cm.',
    mistakes: 'Nu confunda cercul înscris cu cel circumscris. Nu aplica Pitagora fără unghi drept sau fără reciproca verificată. Nu schimba ordinea vârfurilor într-o congruență.',
    tryThis: 'Alege o idee din fiecare mare capitol: o mulțime, o proporție, un întreg negativ, un rațional și un triunghi. Scrie pentru fiecare o propoziție și un număr calculat de tine.',
    recap: 'Compari, împarți, măsori și demonstrezi. Mulțimile și numerele îți dau calculul. Unghiurile și triunghiul îți dau figura. Congruența și Pitagora închid anul cu argumente, nu doar cu desene.'
  })
];

module.exports = { GEOMETRIE6_LESSONS };
