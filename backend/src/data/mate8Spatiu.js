// Capitolele IV și V din Matematică, clasa a VIII-a, Litera, A1984 (2025):
// geometrie în spațiu, apoi arii și volume. Un singur capitol în aplicație.
// Text original. Nu copiem enunțuri, teste sau exemple din manual.
// Plan principal: tot ce enumeră programa.
// Plan secundar: Thales în spațiu, porecla unei proprietăți, corpurile lui Platon
// ca istorie, principiul lui Cavalieri ca investigație. Fără pași de click.

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

const SPATIU_LESSONS = [
  lesson('puncte-plane', 'Puncte, drepte și plane', {
    figure: 'planes',
    formulas: ['două puncte determină o dreaptă', 'o dreaptă cu două puncte în plan stă în plan', 'planul se desenează ca un paralelogram'],
    theory: 'Plan principal. În spațiu ai puncte, drepte și plane. Un plan este o foaie infinită, fără grosime. Masa este doar o bucată dintr-un plan. Pe caiet, planul se desenează ca un paralelogram, ca să se vadă că stă înclinat. Muchiile care sunt paralele în spațiu rămân paralele pe desen. Lungimile și unghiurile nu se citesc „la fel“ de pe desenul în perspectivă.\n\nDouă puncte distincte determină o singură dreaptă. Dacă o dreaptă are două puncte într-un plan, atunci toată dreapta stă în plan. Un punct poate fi în plan sau în afara lui.\n\nNotația AB poate însemna dreapta, segmentul sau lungimea, după propoziție. Te uiți la context.',
    example: 'Două colțuri ale copertei determină o dreaptă. Dacă ambele colțuri stau pe masă, dreapta lor stă pe planul mesei. Un creion ridicat are puncte care nu sunt în planul mesei.',
    practice: '1. Câte drepte determină două puncte distincte? 2. Dacă o dreaptă are două puncte în plan, unde este dreapta? 3. Cum desenezi un plan, ca formă?\n\nRăspunsuri: una. În plan. Ca un paralelogram.',
    mistakes: 'Nu măsura un unghi din spațiu direct pe desenul strâmb, fără o justificare. Nu spune că o dreaptă cu un singur punct în plan stă toată în plan.',
    tryThis: 'Desenează un paralelogram pentru un plan și o dreaptă care taie două dintre laturile lui. Spune de ce dreapta stă în plan.',
    recap: 'Două puncte dau o dreaptă. Două puncte ale dreptei în plan țin toată dreapta în plan. Planul se desenează ca un paralelogram, cu paralelele păstrate.'
  }),

  lesson('determinare-plan', 'Drepte în spațiu și determinarea planului', {
    figure: 'planes',
    formulas: ['dreptele coplanare stau în același plan', 'dreptele necoplanare nu se taie și nu sunt paralele', 'trei puncte necoliniare determină un plan'],
    theory: 'Plan principal. Două drepte sunt coplanare dacă există un plan care le cuprinde pe amândouă. Atunci sunt confundate, secante sau paralele. Dreptele necoplanare, numite și oarecare, nu stau în niciun plan comun: nu se taie și nu sunt paralele.\n\nPrintr-un punct exterior unei drepte trece o singură paralelă la dreapta dată. Dacă două drepte sunt paralele cu a treia, sunt paralele între ele. Asta este tranzitivitatea paralelismului.\n\nUn plan este determinat, adică este unic, în patru situații. Trei puncte necoliniare. O dreaptă și un punct din afara ei. Două drepte secante. Două drepte paralele.',
    example: 'Trei picioare ale unui trepied, necoliniare, determină planul podelei pe care stau. Două muchii opuse ale unui cub, care nu sunt pe aceeași față, sunt necoplanare: nu se întâlnesc și nu sunt pe aceeași direcție cu o față comună. Muchiile unei fețe care nu se taie sunt paralele și coplanare.',
    practice: '1. Două drepte paralele determină un plan? 2. Trei puncte coliniare determină un plan? 3. Dacă a ∥ b și b ∥ c, ce legătură are a cu c?\n\nRăspunsuri: da. Nu. a ∥ c.',
    mistakes: 'Nu numi paralele două drepte doar pentru că nu se taie pe desen. În spațiu pot fi necoplanare. Nu determina un plan cu trei puncte pe aceeași dreaptă.',
    tryThis: 'Pe un cub desenat, marchează două muchii paralele și două muchii necoplanare. Spune în ce caz există un plan care le cuprinde.',
    recap: 'Coplanare înseamnă același plan: confundate, secante sau paralele. Necoplanare înseamnă că nu se taie și nu sunt paralele. Planul se fixează prin trei puncte necoliniare, o dreaptă plus un punct, două secante sau două paralele.'
  }),

  lesson('dreapta-plan', 'Dreapta și planul', {
    figure: 'planes',
    formulas: ['dreapta poate fi inclusă, secantă sau paralelă cu planul', 'd ∥ d′ din plan și d nu stă în plan implică d ∥ plan'],
    theory: 'Plan principal. O dreaptă și un plan au trei poziții. Dreapta este inclusă în plan, când toate punctele ei sunt în plan. Este secantă, când îl taie într-un singur punct. Este paralelă cu planul, când nu are niciun punct comun cu el.\n\nCriteriul de paralelism: dacă dreapta d nu stă în plan și este paralelă cu o dreaptă d′ din plan, atunci d este paralelă cu planul. Un creion ținut deasupra mesei, paralel cu o linie de pe masă, nu atinge masa.\n\nDacă dreapta are un punct în plan și nu este paralelă cu nicio dreaptă din plan care să o țină afară, ea înțeapă planul sau stă în el. La exercițiu desenezi și spui care dintre cele trei poziții este.',
    example: 'O riglă culcată pe masă este inclusă în plan. Un cui bătut în masă dă o dreaptă secantă. Un neon paralel cu o margine a tavanului, fără să atingă tavanul, este paralel cu planul tavanului.',
    practice: '1. Cum se numește dreapta care taie planul într-un singur punct? 2. Dacă d ∥ d′ și d′ stă în plan, iar d nu stă în plan, ce urmează? 3. O dreaptă cu două puncte în plan este paralelă cu planul?\n\nRăspunsuri: secantă. d este paralelă cu planul. Nu, este inclusă.',
    mistakes: 'Nu spune că o dreaptă paralelă cu planul este paralelă cu toate dreptele din plan. Este paralelă cu unele și necoplanară cu altele. Nu confunda inclusă cu secantă.',
    tryThis: 'În cameră, dă un exemplu de dreaptă inclusă în podea, una care înțeapă podeaua și una paralelă cu podeaua.',
    recap: 'Dreapta este în plan, taie planul într-un punct sau nu-l atinge. Dacă este paralelă cu o dreaptă din plan și nu stă în plan, este paralelă cu planul.'
  }),

  lesson('plane-paralele', 'Plane secante și plane paralele', {
    figure: 'planes',
    formulas: ['planele paralele nu se taie', 'două drepte secante paralele cu două drepte secante din celălalt plan dau plane paralele'],
    theory: 'Plan principal. Două plane sunt confundate, secante sau paralele. Secantele se taie după o dreaptă. Paralelele nu au niciun punct comun. Printr-un punct exterior unui plan trece un plan paralel cu el.\n\nCriteriul: dacă două drepte secante dintr-un plan sunt paralele, fiecare, cu două drepte secante din celălalt plan, atunci planele sunt paralele. Manualul îi spune uneori teorema acoperișului. Numele este o poreclă. Proprietatea este cea de mai sus.\n\nTavanul și podeaua sunt plane paralele. Doi pereți vecini sunt plane secante: se taie după muchia camerei.',
    example: 'Pe tavan, două șipci se taie. Pe podea, două rosturi se taie și fiecare este paralel cu câte o șipcă. Atunci tavanul este paralel cu podeaua. Doi pereți vecini se taie după o dreaptă verticală.',
    practice: '1. Cum se taie două plane secante? 2. Două plane paralele au puncte comune? 3. Proprietatea cu două perechi de drepte secante paralele ce îți spune despre plane?\n\nRăspunsuri: după o dreaptă. Nu. Că sunt paralele.',
    mistakes: 'Nu crede că două plane care par depărtate pe desen sunt paralele, fără un criteriu. Nu spune că planele secante se taie într-un punct: se taie după o dreaptă.',
    tryThis: 'Desenează două paralelograme unul deasupra celuilalt, pentru podea și tavan. Marchează dreapta de intersecție a doi pereți.',
    recap: 'Planele se confundă, se taie după o dreaptă sau sunt paralele. Două drepte secante paralele cu două drepte secante din celălalt plan dovedesc că planele sunt paralele.'
  }),

  lesson('piramida', 'Piramida și desfășurarea ei', {
    figure: 'pyramid',
    formulas: ['baza este un poligon', 'fețele laterale sunt triunghiuri', 'tetraedrul regulat are toate muchiile egale'],
    theory: 'Plan principal. Piramida are un vârf și o bază poligonală. Muchiile laterale unesc vârful cu vârfurile bazei. Fețele laterale sunt triunghiuri. Înălțimea este perpendiculara din vârf pe planul bazei.\n\nPiramida regulată are baza un poligon regulat, iar piciorul înălțimii este centrul bazei. Fețele laterale sunt triunghiuri isoscele congruente.\n\nTetraedrul este piramida cu baza triunghi. Tetraedrul regulat are toate cele șase muchii egale și toate cele patru fețe triunghiuri echilaterale.\n\nDesfășurarea unei piramide este poligonul bazei plus cele n triunghiuri laterale, lipite de laturile bazei. La tetraedrul regulat sunt patru triunghiuri echilaterale. La piramida cu baza pătrat sunt pătratul și patru triunghiuri isoscele. La baza hexagon regulat sunt hexagonul și șase triunghiuri.\n\nPlan secundar. Cele cinci corpuri ale lui Platon, cu fețe poligoane regulate egale, sunt o poveste din istoria geometriei. Nu sunt o listă de formule.',
    example: 'O piramidă cu baza pătrat are 5 fețe, 5 vârfuri și 8 muchii. Desfășurarea are un pătrat și patru triunghiuri. Tetraedrul regulat are 4 fețe, 4 vârfuri și 6 muchii egale.',
    practice: '1. Câte fețe laterale are o piramidă cu baza hexagon? 2. Câte fețe are tetraedrul? 3. Înălțimea piramidei regulate cade unde în bază?\n\nRăspunsuri: 6. 4. În centru.',
    mistakes: 'Nu numi înălțime o muchie laterală înclinată. Nu pune la desfășurare dreptunghiuri: fețele laterale ale piramidei sunt triunghiuri. Nu confunda tetraedrul cu cubul.',
    tryThis: 'Desenează desfășurarea unei piramide cu baza triunghi echilateral: un triunghi central și trei triunghiuri lipite de laturi.',
    recap: 'Piramida are vârf, bază și fețe triunghiulare. Cea regulată cade cu înălțimea în centrul bazei. Tetraedrul regulat are toate muchiile egale. Desfășurarea lipește triunghiurile de bază.'
  }),

  lesson('prisma', 'Prisma dreaptă și desfășurarea ei', {
    figure: 'cube',
    formulas: ['fețele laterale ale prismei drepte sunt dreptunghiuri', 'cubul are 6 fețe pătrate', 'muchiile paralele rămân paralele pe desen'],
    theory: 'Plan principal. Prisma dreaptă are două baze poligoane congruente, în plane paralele, iar muchiile laterale sunt perpendiculare pe planele bazelor. Fețele laterale sunt dreptunghiuri. La prisma regulată, baza este un poligon regulat.\n\nParalelipipedul dreptunghic, adică o cutie, are bazele dreptunghiuri și fețele laterale tot dreptunghiuri. Cubul este cutia cu toate muchiile egale: șase fețe pătrate, douăsprezece muchii, opt vârfuri.\n\nPe desen păstrezi paralelele. Nu judeca o muchie mai scurtă doar pentru că perspectiva o micșorează.\n\nDesfășurarea are cele două baze congruente și n dreptunghiuri laterale. Poți strânge fețele laterale într-un singur dreptunghi: lățimea lui este perimetrul bazei, înălțimea lui este înălțimea prismei.',
    example: 'O cutie 6 cm pe 4 cm pe 5 cm are fețele laterale dreptunghiuri. Perimetrul bazei este 20 cm. Dreptunghiul lateral din desfășurare are 20 cm pe 5 cm. Cubul de latură 2 cm are fiecare față un pătrat de latură 2 cm.',
    practice: '1. Ce formă au fețele laterale ale prismei drepte? 2. Câte fețe pătrate are cubul? 3. Lățimea dreptunghiului lateral din desfășurare este ce element al bazei?\n\nRăspunsuri: dreptunghiuri. 6. Perimetrul.',
    mistakes: 'Nu desena fețele laterale ca paralelograme înclinate dacă prisma este dreaptă și desfășurarea este plană: în plan ele sunt dreptunghiuri. Nu confunda cubul cu un paralelipiped oarecare.',
    tryThis: 'Desenează desfășurarea unui cub: cruce din șase pătrate. Numără fețele și spune de ce nu lipsește niciuna.',
    recap: 'Prisma dreaptă are baze congruente și fețe laterale dreptunghiuri. Cutia și cubul sunt cazuri. Desfășurarea este două baze plus un dreptunghi de lățime cât perimetrul bazei.'
  }),

  lesson('cilindru', 'Cilindrul circular drept', {
    figure: 'cylinder',
    formulas: ['bazele sunt discuri congruente', 'generatoarea este înălțimea', 'desfășurarea are un dreptunghi și două discuri'],
    theory: 'Plan principal. Cilindrul circular drept se obține rotind un dreptunghi în jurul unei laturi. Bazele sunt două discuri congruente, în plane paralele. Raza bazei este R. Generatoarea G este segmentul care unește un punct de pe un cerc cu punctul corespunzător de pe celălalt cerc. La cilindrul drept, G este și înălțimea, iar axa, dreapta centrelor, este axă de simetrie.\n\nDesfășurarea are un dreptunghi și două discuri. Lățimea dreptunghiului este lungimea cercului, 2πR. Înălțimea dreptunghiului este G.',
    example: 'Un cilindru cu R = 3 cm și G = 4 cm are desfășurarea laterală un dreptunghi de lățime 2π · 3 și înălțime 4. Dacă lucrezi cu π = 3, lățimea este 18 cm. Două capace sunt discuri de rază 3 cm.',
    practice: '1. Ce formă au bazele? 2. La cilindrul drept, generatoarea este egală cu ce? 3. Cu π = 3 și R = 3, cât este 2πR?\n\nRăspunsuri: discuri. Cu înălțimea. 18.',
    mistakes: 'Nu uita cele două discuri din desfășurare. Nu înlocui lungimea cercului cu aria discului. Nu înclina generatoarea dacă cilindrul este drept.',
    tryThis: 'Desenează un dreptunghi 18 pe 4 și două cercuri de rază 3, ca desfășurare, cu π = 3. Spune care bucată este mantaua.',
    recap: 'Cilindrul drept are două discuri și generatoare perpendiculare pe baze. Desfășurarea este dreptunghiul 2πR pe G, plus două discuri.'
  }),

  lesson('con', 'Conul circular drept', {
    figure: 'cone',
    formulas: ['G^2 = R^2 + h^2', 'desfășurarea laterală este un sector de rază G', 'unghiul sectorului este (360 · R) / G grade'],
    theory: 'Plan principal. Conul circular drept se obține rotind un triunghi dreptunghic în jurul unei catete. Baza este un disc de rază R. Vârful este capătul înălțimii h, perpendiculară pe bază în centrul discului. Generatoarea G este ipotenuza. Din Pitagora, G^2 = R^2 + h^2.\n\nDesfășurarea are discul bazei și un sector de cerc de rază G. Arcul sectorului este lungimea bazei, 2πR. Unghiul la centru al sectorului, în grade, este (360 · R) / G. Nu împărți 360 la G și să uiți raza.',
    example: 'R = 3 și h = 4 dau G^2 = 9 + 16 = 25, deci G = 5. Unghiul sectorului este (360 · 3) / 5 = 1080 / 5 = 216 grade. Desfășurarea are un sector de rază 5 cm și un disc de rază 3 cm.',
    practice: '1. G pentru R = 3 și h = 4. 2. Unghiul sectorului, în grade, pentru aceste valori. 3. Înălțimea cade în centrul bazei?\n\nRăspunsuri: 5. 216. Da.',
    mistakes: 'Nu lua generatoarea drept înălțime. Nu calcula unghiul sectorului ca 360 / G, fără R. Nu uita discul din desfășurare.',
    tryThis: 'Cu R = 6 și h = 8, află G și spune raza sectorului din desfășurare.',
    recap: 'La conul drept, G^2 = R^2 + h^2. Desfășurarea laterală este un sector de rază G, cu unghiul (360 · R) / G grade, plus discul bazei.'
  }),

  lesson('unghi-drepte', 'Unghiul a două drepte în spațiu', {
    figure: 'cube',
    formulas: ['unghiurile cu laturile respectiv paralele sunt congruente sau suplementare', 'unghiul a două drepte este între 0° și 90°'],
    theory: 'Plan principal. Două unghiuri cu laturile respectiv paralele sunt congruente sau suplementare. Congruente, când sensurile se potrivesc la fel. Suplementare, când un sens este inversat. Suma suplementară este 180°.\n\nUnghiul a două drepte în spațiu, chiar necoplanare, se măsoară ducând printr-un punct paralele la ele și luând unghiul ascuțit sau drept dintre aceste paralele. Măsura este între 0° și 90°. Dacă dreptele sunt paralele, unghiul este 0°.\n\nÎn cub, muchiile care pleacă din același vârf fac 90°. O muchie și o muchie necoplanară pe direcție perpendiculară fac tot 90°, pentru că unghiul se mută pe o paralelă.',
    example: 'În cub, muchia de jos din față și muchia de sus din spate, pe direcții perpendiculare, nu se ating. Prin un vârf duci paralele la ele și vezi un unghi de 90°. Două muchii de pe aceeași direcție dau unghiul 0°.',
    practice: '1. Între ce măsuri stă unghiul a două drepte? 2. Două drepte paralele ce unghi fac? 3. Două unghiuri cu laturile paralele și un sens inversat sunt ce fel de unghiuri?\n\nRăspunsuri: între 0° și 90°. 0°. Suplementare.',
    mistakes: 'Nu măsura unghiul necoplanar direct pe desen, fără o paralelă ajutătoare. Nu lua un unghi obtuz ca măsură a două drepte: alegi pe cel de cel mult 90°.',
    tryThis: 'Pe un cub, alege două muchii necoplanare. Spune dacă direcțiile lor sunt paralele sau perpendiculare și ce unghi dau.',
    recap: 'Unghiul a două drepte se citește între paralele duse prin același punct și este cel mult 90°. Laturile respectiv paralele dau unghiuri congruente sau suplementare.'
  }),

  lesson('dreapta-paralela-plan', 'Dreaptă paralelă cu un plan', {
    figure: 'planes',
    formulas: ['d ∥ plan dacă nu se ating', 'planul prin d taie planul paralel după o paralelă', 'paralelismul dreptelor este tranzitiv și în spațiu'],
    theory: 'Plan principal. Dreapta paralelă cu un plan nu îl înțeapă și rămâne la distanță constantă. Criteriul l-ai văzut: este paralelă cu o dreaptă din plan și nu stă în plan.\n\nDacă un plan conține o dreaptă paralelă cu un alt plan, intersecția celor două plane este o dreaptă paralelă cu dreapta dată. Tăietura „alunecă“ paralel.\n\nParalelismul dreptelor rămâne tranzitiv în spațiu. Dacă d ∥ a și a ∥ b, atunci d ∥ b, chiar dacă dreptele nu sunt toate în același plan de la început.',
    example: 'Un sertar are marginea din față paralelă cu fundul, pentru că este paralelă cu marginea din spate, care stă pe fund, și nu atinge fundul cât timp sertarul este ridicat. Planul feței sertarului taie fundul după o dreaptă paralelă cu marginea din față.',
    practice: '1. O dreaptă paralelă cu un plan îl taie? 2. Dacă d ∥ a și a este în plan, iar d nu este în plan, d este paralelă cu planul? 3. Din d ∥ a și a ∥ b ce iese?\n\nRăspunsuri: nu. Da. d ∥ b.',
    mistakes: 'Nu coborî distanța la 0 și să o mai numești paralelă. Nu uita condiția că dreapta nu stă deja în plan.',
    tryThis: 'Ține un creion paralel cu marginea mesei, fără să atingi masa. Spune ce dreaptă din planul mesei este paralelă cu creionul.',
    recap: 'Paralela la o dreaptă din plan, dusă în afara planului, este paralelă cu planul. Planul care o conține taie planul dat după o paralelă. Paralelismul dreptelor se transmite.'
  }),

  lesson('plane-taiate', 'Plane paralele tăiate de o secantă', {
    figure: 'planes',
    formulas: ['un plan secant taie două plane paralele după drepte paralele', 'paralelismul planelor este tranzitiv'],
    theory: 'Plan principal. Dacă un plan taie două plane paralele, dreptele de intersecție sunt paralele. Manualul îi spune uneori teorema fierăstrăului. Porecla nu înlocuiește propoziția: secțiunile sunt drepte paralele.\n\nParalelismul planelor este tranzitiv. Dacă planul α este paralel cu β și β este paralel cu γ, atunci α este paralel cu γ.\n\nO foaie verticală care taie tavanul și podeaua, paralele, lasă pe ele două drepte paralele.',
    example: 'Podeaua și tavanul sunt paralele. Un perete le taie după două muchii orizontale. Muchiile sunt paralele. Dacă și un al treilea plan, un tavan fals, este paralel cu tavanul, este paralel și cu podeaua.',
    practice: '1. Un plan taie două plane paralele. Dreptele de tăiere sunt ce? 2. α ∥ β și β ∥ γ. Ce legătură are α cu γ? 3. Porecla „fierăstrău“ ce proprietate numește?\n\nRăspunsuri: paralele. α ∥ γ. Secțiunile paralele date de un plan secant.',
    mistakes: 'Nu spune că dreptele de intersecție se întâlnesc undeva departe. Dacă planele sunt paralele, dreptele rămân paralele. Nu confunda porecla cu enunțul.',
    tryThis: 'Desenează două drepte paralele ca tăieturi ale unui perete pe podea și pe tavan. Spune de ce sunt paralele.',
    recap: 'Un plan secant taie două plane paralele după drepte paralele. Dacă un plan este paralel cu al doilea și al doilea cu al treilea, primul este paralel cu al treilea.'
  }),

  lesson('sectiuni-trunchiuri', 'Secțiuni paralele cu baza și trunchiuri', {
    figure: 'frustum',
    formulas: ['în prismă și cilindru, secțiunea paralelă cu baza este congruentă cu baza', 'în piramidă și con, secțiunea este asemenea cu baza', 'trunchiul rămâne între două baze paralele'],
    theory: 'Plan principal. O secțiune este intersecția corpului cu un plan. Dacă planul este paralel cu baza, figura depinde de corp.\n\nLa prismă și la cilindru, secțiunea este congruentă cu baza: aceeași formă și aceeași mărime. La piramidă și la con, secțiunea este asemenea cu baza. Raportul de asemănare este raportul distanțelor de la vârf. Apare o piramidă mică sau un con mic, de aceeași formă.\n\nTrunchiul de piramidă este ce rămâne după ce tai piramida cu un plan paralel cu baza și îndepărtezi piramida mică. Are două baze poligoane asemenea, în plane paralele. Cel regulat are bazele poligoane regulate. Trunchiul de con are două discuri, de raze R și r. Se obține și rotind un trapez dreptunghic în jurul laturii perpendiculare pe baze. Aici îi descrii și îi desenezi. Ariile și volumele vin mai târziu.',
    example: 'Într-o piramidă, un plan paralel cu baza taie înălțimea la jumătate, măsurată din vârf. Raportul de asemănare este 1/2. Aria secțiunii este 1/4 din aria bazei, pentru că ariile țin pătratul raportului. Între secțiune și bază rămâne un trunchi.',
    practice: '1. Secțiunea paralelă cu baza, la cilindru, este congruentă sau doar asemenea cu baza? 2. La con, dacă raportul liniar este 1/2, raportul ariilor este cât? 3. Trunchiul de con câte baze are?\n\nRăspunsuri: congruentă. 1/4. Două.',
    mistakes: 'Nu spune că secțiunea din piramidă este congruentă cu baza. Este asemenea, mai mică. Nu confunda trunchiul cu un cilindru: are două raze diferite.',
    tryThis: 'Desenează un con și o linie paralelă cu baza. Marchează conul mic și trunchiul. Spune raportul dacă tăietura este la jumătatea înălțimii, din vârf.',
    recap: 'Paralel cu baza, prisma și cilindrul dau o secțiune congruentă, piramida și conul dau o secțiune asemenea. Trunchiul este corpul dintre cele două baze paralele.'
  }),

  lesson('thales-spatiu', 'Plan secundar: Thales în spațiu', {
    figure: 'planes',
    formulas: ['planele paralele taie proporțional două secante', 'nu este un item separat în programă'],
    theory: 'Plan secundar. Programa nu enumeră teorema lui Thales în spațiu. O recunoști scurt, fără un set de probleme de examen.\n\nMai multe plane paralele taie două drepte secante în segmente proporționale. Este același gând ca la Thales din plan, mutat pe plane paralele. Dacă pe o secantă bucățile sunt 2 cm și 4 cm, iar pe cealaltă a doua bucată este 6 cm, prima bucată de acolo este 3 cm, pentru că 2/4 = 3/6.',
    example: '2/4 = x/6 dă 4x = 12, deci x = 3. Rapoartele sunt egale. Nu extinzi exemplul într-o fișă de examen.',
    practice: '1. 2/4 = x/6. Cât este x? 2. Teorema aceasta este plan principal sau plan secundar?\n\nRăspunsuri: 3. Plan secundar.',
    mistakes: 'Nu o pune în locul proprietății că un plan secant taie planele paralele după drepte paralele. Aia este plan principal. Nu schimba ordinea termenilor din proporție.',
    tryThis: 'Scrie o proporție cu bucăți 3 cm și 6 cm pe o secantă și 4 cm pe prima bucată a celeilalte. Află a doua bucată și oprește-te aici.',
    recap: 'Planele paralele taie secantele în segmente proporționale. Este o recunoaștere scurtă, în plan secundar. Metoda de lucru rămâne desenul și proporția.'
  }),

  lesson('perp-plan', 'Dreaptă perpendiculară pe un plan', {
    figure: 'perpendicular',
    formulas: ['d ⊥ plan dacă d este perpendiculară pe orice dreaptă din plan prin picior', 'ajung două drepte secante din plan', 'înălțimea piramidei regulate cade în centru'],
    theory: 'Plan principal. Două drepte sunt perpendiculare în spațiu, chiar necoplanare, când unghiul lor este 90°.\n\nO dreaptă este perpendiculară pe un plan dacă este perpendiculară pe orice dreaptă din plan care trece prin piciorul ei. Nu trebuie să le verifici pe toate. Criteriul: dacă este perpendiculară pe două drepte secante din plan, este perpendiculară pe plan.\n\nPrintr-un punct trece o singură perpendiculară pe un plan dat. Două drepte perpendiculare pe același plan sunt paralele. Două plane perpendiculare pe aceeași dreaptă sunt paralele.\n\nDistanța de la un punct la o dreaptă este lungimea perpendicularei. Distanța de la un punct la un plan este lungimea perpendicularei din punct pe plan. Orice oblică este mai lungă.\n\nÎnălțimea unei piramide regulate cade în centrul bazei. La fel, înălțimea conului drept cade în centrul discului.',
    example: 'Un stâlp vertical este perpendicular pe două rosturi secante ale podelei, deci este perpendicular pe podea. Distanța de la vârful stâlpului până la podea este lungimea stâlpului, nu o sârmă înclinată. Într-o piramidă regulată cu baza pătrat, piciorul înălțimii este intersecția diagonalelor.',
    practice: '1. Pe câte drepte secante din plan trebuie să fie perpendiculară o dreaptă ca să fie perpendiculară pe plan? 2. Două drepte perpendiculare pe același plan sunt ce? 3. Distanța până la plan se măsoară pe perpendiculară sau pe oblică?\n\nRăspunsuri: două. Paralele. Pe perpendiculară.',
    mistakes: 'Nu declara o dreaptă perpendiculară pe plan dacă ai verificat o singură dreaptă din plan. Nu măsura distanța pe o oblică. Nu pune piciorul înălțimii într-un vârf al bazei, la piramida regulată.',
    tryThis: 'Spune de ce piciorul unui echer așezat pe masă, dacă stă drept față de două margini care se taie, este perpendicular pe masă.',
    recap: 'Perpendiculara pe două drepte secante din plan este perpendiculară pe plan. Distanța este lungimea ei. Înălțimea piramidei regulate și a conului drept cade în centrul bazei.'
  }),

  lesson('distanta-plane', 'Distanța dintre plane paralele', {
    figure: 'prism',
    formulas: ['distanța este lungimea perpendicularei comune', 'înălțimea trunchiului este diferența înălțimilor', 'raportul de asemănare leagă piramida mică de cea mare'],
    theory: 'Plan principal. Distanța de la o dreaptă până la un plan paralel cu ea este lungimea perpendicularei dintr-un punct al dreptei pe plan. Distanța dintre două plane paralele este lungimea segmentului perpendicular pe ambele. Nu depinde de punctul ales.\n\nAceastă distanță este înălțimea prismei drepte, a cilindrului drept, a trunchiului de piramidă și a trunchiului de con.\n\nDacă trunchiul provine dintr-o piramidă sau dintr-un con, înălțimea corpului mare minus înălțimea corpului mic este înălțimea trunchiului. Asemănarea dă raportul. Dacă piramida mică are înălțimea o treime din cea mare, bazele sunt în raportul 1/3.',
    example: 'Piramida mare are înălțimea 9 cm. Cea mică, tăiată de un plan paralel cu baza, are înălțimea 3 cm. Raportul este 1/3. Înălțimea trunchiului este 9 − 3 = 6 cm. Aceeași lungime este distanța dintre planele bazelor.',
    practice: '1. Înălțimea trunchiului dacă piramida mare are 9 cm și cea mică 3 cm. 2. Raportul de asemănare în acest caz. 3. Distanța dintre plane paralele se schimbă dacă muți piciorul perpendicularei?\n\nRăspunsuri: 6 cm. 1/3. Nu.',
    mistakes: 'Nu aduna înălțimile ca să afli trunchiul. Le scazi. Nu măsura distanța dintre plane pe o muchie înclinată.',
    tryThis: 'Desenează o piramidă de înălțime 8 cm și o tăietură paralelă la 2 cm de vârf. Calculează înălțimea trunchiului și raportul de asemănare.',
    recap: 'Distanța dintre plane paralele este perpendiculara comună. Ea este înălțimea prismei, a cilindrului și a trunchiurilor. Înălțimea trunchiului este diferența înălțimilor, iar asemănarea dă raportul.'
  }),

  lesson('plane-perpendiculare', 'Plane perpendiculare și secțiuni', {
    figure: 'cube',
    formulas: ['un plan este perpendicular pe altul dacă conține o dreaptă perpendiculară pe el', 'secțiunea diagonală trece printr-o diagonală a bazei', 'la piramida triunghiulară regulată, VO nu este axă de simetrie'],
    theory: 'Plan principal. Două plane sunt perpendiculare dacă unul conține o dreaptă perpendiculară pe celălalt. Podeaua și un perete: peretele conține stâlpul vertical, perpendicular pe podea.\n\nO secțiune diagonală trece printr-o diagonală a bazei și prin muchiile sau vârful corespunzător. La prisma dreaptă iese un dreptunghi. La piramida regulată iese un triunghi isoscel. La trunchiul regulat iese un trapez isoscel. Numărul acestor secțiuni este numărul diagonalelor bazei.\n\nSecțiunea axială trece prin axa corpului de rotație. La cilindru și la con este dreptunghiul sau triunghiul isoscel care conține axa.\n\nAxa de simetrie a unui corp este o dreaptă față de care simetricul oricărui punct al corpului, printr-o întoarcere de 180°, rămâne în corp. La piramida triunghiulară regulată, VO, din vârf în centrul bazei, nu este axă de simetrie: vârfurile bazei nu cad unul peste altul după o întoarcere de 180°.\n\nMai târziu vei vedea și definiția prin diedrul de 90°. Este aceeași pereche de plane, spusă cu unghiul dintre ele. Nu facem pași de click într-un program de desen.',
    example: 'Cubul are pereții vecini perpendiculari, pentru că muchia verticală este perpendiculară pe bază. O secțiune diagonală este un dreptunghi. Baza pătrat are două diagonale, deci două secțiuni diagonale. La o piramidă regulată cu baza triunghi, VO nu este axă de simetrie.',
    practice: '1. Un perete și podeaua sunt plane perpendiculare dacă peretele conține ce fel de dreaptă față de podea? 2. Secțiunea diagonală a prismei drepte ce patrulater este? 3. VO este axă de simetrie la piramida triunghiulară regulată?\n\nRăspunsuri: o dreaptă perpendiculară pe podea. Dreptunghi. Nu.',
    mistakes: 'Nu numi secțiune diagonală orice tăietură. Trebuie să prindă o diagonală a bazei. Nu declara VO axă de simetrie doar pentru că este înălțime.',
    tryThis: 'Pe un cub, desenează una dintre cele două secțiuni diagonale și spune ce unghi face planul ei cu baza, dacă muchia este verticală.',
    recap: 'Planele sunt perpendiculare când unul conține o perpendiculară pe celălalt. Secțiunile diagonale și axiale arată dreptunghiuri, triunghiuri isoscele sau trapeze isoscele. VO nu este axă de simetrie la piramida triunghiulară regulată.'
  }),

  lesson('proiectii', 'Proiecții pe un plan', {
    figure: 'planes',
    formulas: ['proiecția unui punct este piciorul perpendicularei', 'proiecția unei drepte este o dreaptă sau un punct', 'lungimea proiecției este cel mult lungimea segmentului'],
    theory: 'Plan principal. Proiecția ortogonală a unui punct pe un plan este piciorul perpendicularei din punct pe plan. Proiecția unei figuri este mulțimea proiecțiilor punctelor ei.\n\nProiecția unui segment este segmentul dintre proiecțiile capetelor. Dacă segmentul este paralel cu planul, proiecția are aceeași lungime. Dacă este perpendicular pe plan, proiecția este un punct. În celelalte cazuri, proiecția este mai scurtă decât segmentul.\n\nProiecția unei drepte este o dreaptă, sau un punct când dreapta este perpendiculară pe plan. Punctele coliniare rămân coliniare după proiecție.\n\nProiecția pe o dreaptă, nu pe un plan, este piciorul perpendicularei pe acea dreaptă. O folosești când măsori distanța în planul unei fețe.',
    example: 'Un segment de 10 cm paralel cu podeaua are proiecția tot de 10 cm. Un băț vertical are proiecția un punct. Trei puncte pe muchia unei mese rămân coliniare în proiecția de pe podea, dacă muchia nu este verticală.',
    practice: '1. Proiecția unui segment paralel cu planul are lungimea cum față de segment? 2. Proiecția unei drepte perpendiculare pe plan este ce? 3. Coliniaritatea se păstrează?\n\nRăspunsuri: egală. Un punct. Da.',
    mistakes: 'Nu spune că proiecția este mereu mai scurtă. La paralelă este egală. Nu proiecta „pieziș“: proiecția ortogonală cade pe perpendiculară.',
    tryThis: 'Ține un creion paralel cu masa și unul înclinat. Spune în ce caz proiecția are aceeași lungime cu creionul.',
    recap: 'Proiecția cade pe perpendiculară. O dreaptă se proiectează ca dreaptă sau ca punct. Lungimea proiecției nu depășește lungimea segmentului și este egală când segmentul este paralel cu planul.'
  }),

  lesson('unghi-dreapta-plan', 'Unghiul dintre o dreaptă și un plan', {
    figure: 'pyramid',
    formulas: ['unghiul este între dreaptă și proiecția ei', 'măsura este între 0° și 90°', 'proiecția = segment · cosinusul unghiului'],
    theory: 'Plan principal. Unghiul dintre o dreaptă și un plan este unghiul dintre dreaptă și proiecția ei pe plan. Măsura este între 0° și 90°. Este 0° când dreapta este paralelă cu planul sau este inclusă în el. Este 90° când dreapta este perpendiculară pe plan.\n\nDacă A′ și B′ sunt proiecțiile capetelor unui segment AB, atunci A′B′ = AB înmulțit cu cosinusul unghiului dintre AB și plan. Cosinusul îl știi din triunghiul dreptunghic: cateta alăturată împărțită la ipotenuză.\n\nÎn piramidă, muchia laterală face cu baza unghiul dintre muchie și proiecția ei, care este segmentul din centrul bazei până la vârful bazei, sau din piciorul înălțimii până la acel vârf.',
    example: 'Un segment de 10 cm face 60° cu podeaua. Cosinusul de 60° este 1/2. Proiecția are 10 · (1/2) = 5 cm. Dacă segmentul stă vertical, unghiul cu podeaua este 90° și proiecția este un punct.',
    practice: '1. Proiecția unui segment de 10 cm care face 60° cu planul. 2. Unghiul dintre o dreaptă perpendiculară pe plan și plan. 3. Unghiul dintre o dreaptă paralelă cu planul și plan.\n\nRăspunsuri: 5 cm. 90°. 0°.',
    mistakes: 'Nu lua un unghi mai mare decât 90°. Nu înmulți lungimea cu sinusul când vrei proiecția pe plan: proiecția folosește cosinusul unghiului cu planul.',
    tryThis: 'Un cablu de 8 cm face 0° cu tavanul. Cât este proiecția lui pe tavan? Spune și cazul în care cablul ar face 90°.',
    recap: 'Unghiul dreaptă-plan este unghiul cu proiecția și stă între 0° și 90°. Lungimea proiecției este lungimea segmentului înmulțită cu cosinusul acestui unghi.'
  }),

  lesson('diedru', 'Unghiul diedru', {
    figure: 'cube',
    formulas: ['diedrul are muchie și două fețe', 'unghiul plan se citește într-un plan perpendicular pe muchie', 'planele perpendiculare fac 90°'],
    theory: 'Plan principal. Un diedru este regiunea dintre două semiplane cu aceeași muchie. Fețele sunt cele două semiplane. Ca să-i măsori unghiul, tai cu un plan perpendicular pe muchie. Dreptele de tăiere formează unghiul plan al diedrului. Măsura lui nu depinde de locul în care tai, cât timp planul rămâne perpendicular pe muchie.\n\nUnghiul a două plane este cel mai mic dintre unghiurile plane ale diedrelor pe care le formează. Este între 0° și 90°.\n\nPlanele perpendiculare se pot spune și așa: unghiul lor este 90°. Aceasta este definiția clasică, a doua. Prima spunea că un plan conține o dreaptă perpendiculară pe celălalt. Cele două definiții descriu aceeași situație.\n\nÎn cub, două fețe vecine fac un diedru de 90°. Două fețe opuse sunt paralele, deci unghiul lor este 0°.',
    example: 'Muchia dintre podea și perete este muchia diedrului. Un plan vertical, perpendicular pe această muchie, taie podeaua și peretele după două drepte care fac 90°. Deci planele sunt perpendiculare și după definiția cu unghiul.',
    practice: '1. Planul în care citești unghiul diedrului este cum față de muchie? 2. Unghiul a două fețe vecine ale cubului. 3. Cele două definiții ale planelor perpendiculare spun situații diferite?\n\nRăspunsuri: perpendicular. 90°. Nu, aceeași situație.',
    mistakes: 'Nu măsura diedrul într-un plan care nu este perpendicular pe muchie. Nu lua unghiul obtuz dintre plane: unghiul a două plane este cel mic, cel mult 90°.',
    tryThis: 'Deschide o carte ca un diedru. Ține cotorul ca muchie și spune unde ai tăia ca să vezi unghiul plan.',
    recap: 'Diedrul se măsoară prin unghiul plan, într-un plan perpendicular pe muchie. Unghiul a două plane este cel mic. La 90°, planele sunt perpendiculare, la fel ca în definiția cu o dreaptă perpendiculară.'
  }),

  lesson('trei-perpendiculare', 'Teorema celor trei perpendiculare', {
    figure: 'perpendicular',
    formulas: ['dacă proiecția oblicei este perpendiculară pe dreaptă, și oblica este', 'reciproca întoarce enunțul când piciorul este proiecția', 'distanța până la o dreaptă din plan se vede pe oblică'],
    theory: 'Plan principal. Fie un plan, o dreaptă d în plan și un punct A în afara planului. O este piciorul perpendicularei din A pe plan. Din O duci perpendiculara pe d și îi spui piciorului B. Atunci și oblica AB este perpendiculară pe d.\n\nDe ce: AO este perpendiculară pe plan, deci AO ⊥ d. OB ⊥ d din construcție. AO și OB se taie și sunt amândouă perpendiculare pe d, deci d este perpendiculară pe planul lor. AB stă în acel plan, deci AB ⊥ d.\n\nReciproca I: dacă O este proiecția lui A pe plan și AB ⊥ d, atunci și OB ⊥ d. O folosești când cauți distanța dintre plane paralele: perpendiculara coboară drept.\n\nReciproca II te ajută să verifici o perpendiculară pe plan și distanța de la punct la plan. Ca să arăți că o dreaptă este perpendiculară pe plan, o arăți perpendiculară pe două drepte secante din plan. Teorema îți mută perpendicularitatea de pe proiecție pe oblică, sau invers, ca să obții acele două drepte.\n\nDistanța de la A la dreapta d din plan este lungimea lui AB, nu a lui AO. AO este distanța până la plan. Distanța dintre două plane paralele este perpendiculara comună.',
    example: 'AO = 4 cm și OB = 3 cm, cu OB ⊥ d. Atunci AB = 5 cm, din Pitagora: 16 + 9 = 25. AB este distanța de la A la dreapta d, iar AO = 4 cm este distanța până la plan. Într-un colț de cameră, trei muchii perpendiculare două câte două dau un tetraedru tridreptunghic: la vârful din colț, fețele fac unghiuri drepte.',
    practice: '1. Dacă AO = 4 și OB = 3, cu unghi drept în O, cât este AB? 2. Distanța de la A la plan este AO sau AB? 3. Ca să fie perpendiculară pe plan, pe câte drepte secante trebuie verificată dreapta?\n\nRăspunsuri: 5. AO. Două.',
    mistakes: 'Nu numi distanță până la dreapta din plan perpendiculara până la plan. Mai ai un pas, până la dreaptă. Nu aplica teorema dacă B nu este piciorul din O pe dreaptă.',
    tryThis: 'Desenează podeaua, o linie pe podea și un punct la 4 cm deasupra unui punct O. Pune OB = 3 cm, perpendicular pe linie. Calculează AB.',
    recap: 'Perpendiculara pe proiecția oblicei este perpendiculară și pe oblică. Reciproca aduce perpendicularitatea înapoi pe proiecție. Distanța până la o dreaptă din plan este oblica, iar distanța până la plan este perpendiculara.'
  }),

  lesson('distante-corpuri', 'Distanțe în corpuri', {
    figure: 'box3d',
    formulas: ['d^2 = a^2 + b^2 + c^2', 'diagonala cubului este a√3', 'distanța de la centru la față folosește teorema celor trei perpendiculare'],
    theory: 'Plan principal. Pe fețe lucrezi ca în geometria plană: Pitagora, arii, unghiuri. În interior, distanțele trec prin spațiu.\n\nDiagonala unei cutii cu muchiile a, b și c se află în doi pași. Întâi diagonala bazei, a^2 + b^2. Apoi, cu înălțimea c, d^2 = a^2 + b^2 + c^2. Manualul îi spune Pitagora în spațiu. Calculul este cel cerut. La cub, a = b = c, deci d^2 = 3a^2 și d = a√3.\n\nDistanța de la centrul bazei unei piramide regulate până la o față laterală folosește teorema celor trei perpendiculare. Din centru cobori pe latura bazei: este apotema bazei, perpendiculară pe latură. Atunci și segmentul din vârf până la mijlocul laturii este perpendicular pe latură. În triunghiul dreptunghic format de înălțime, apotema bazei și apotema piramidei, distanța de la centru la față este perpendiculara pe apotema piramidei.',
    example: 'O cutie 2 cm, 3 cm și 6 cm are d^2 = 4 + 9 + 36 = 49, deci diagonala este 7 cm. Cubul de latură 2 cm are diagonala 2√3. La o piramidă cu înălțimea 4 cm și apotema bazei 3 cm, apotema piramidei este 5 cm. Distanța de la centru la față iese din (4 · 3) / 5 = 12/5 cm, pentru că aria triunghiului se scrie și ca (4 · 3) / 2, și ca (5 · distanță) / 2.',
    practice: '1. Diagonala cutiei 2, 3 și 6. 2. Diagonala cubului de latură 2. 3. Distanța 12/5 de mai sus este până la față sau până la bază?\n\nRăspunsuri: 7 cm. 2√3. Până la față.',
    mistakes: 'Nu opri diagonala cutiei la diagonala bazei. Mai urcă cu înălțimea. Nu confunda a√2, diagonala feței pătratului, cu a√3, diagonala cubului.',
    tryThis: 'Calculează diagonala unui cub de latură 3 cm și diagonala unei fețe. Spune care este mai lungă și de ce.',
    recap: 'În cutie, d^2 = a^2 + b^2 + c^2. În cub, diagonala este a√3. Distanța de la centrul bazei la o față laterală se citește în triunghiul înălțimii, după teorema celor trei perpendiculare.'
  }),

  lesson('unghiuri-corpuri', 'Unghiuri în corpuri', {
    figure: 'pyramid',
    formulas: ['cosinus = alăturată / ipotenuză', 'sinus = opusă / ipotenuză', 'tangenta = opusă / alăturată'],
    theory: 'Plan principal. Unghiurile din spațiu se calculează cu sinus, cosinus și tangentă, în triunghiul dreptunghic pe care îl decupezi. Nu te limita la 30°, 45° și 60°, dar le folosești când apar.\n\nUnghiul dintre o muchie și un plan este unghiul cu proiecția muchiei. Unghiul dintre două plane este unghiul plan al diedrului. În piramida regulată, diedrul dintre o față laterală și bază se vede în triunghiul format de înălțime, apotema bazei și apotema piramidei.\n\nLa prisma dreaptă, muchia laterală face 90° cu baza. La cub, fețele vecine fac 90°.',
    example: 'Înălțimea este 4 cm, apotema bazei este 3 cm, apotema piramidei este 5 cm. Unghiul dintre muchia laterală și bază depinde de muchie. Unghiul dintre fața laterală și bază are tangenta 4/3, pentru că în triunghiul dreptunghic cateta opusă acestui unghi de la baza feței este înălțimea, iar cateta alăturată este apotema bazei. Sinusul aceluiași unghi este 4/5, cosinusul este 3/5.',
    practice: '1. Tangenta unghiului dintre față și bază, cu catete 4 și 3, opusa fiind 4. 2. Sinusul, dacă ipotenuza este 5. 3. Unghiul dintre muchia laterală a prismei drepte și bază.\n\nRăspunsuri: 4/3. 4/5. 90°.',
    mistakes: 'Nu schimba cateta opusă cu cea alăturată. Nu măsura diedrul pe desenul în perspectivă, fără triunghiul dreptunghic. Nu spune că orice muchie face 90° cu baza: la piramidă muchia este înclinată.',
    tryThis: 'Cu catete 3 cm și 4 cm și ipotenuză 5 cm, scrie sinusul, cosinusul și tangenta unghiului opus catetei de 4 cm.',
    recap: 'Unghiul dreaptă-plan și unghiul plan-plan se citesc într-un triunghi dreptunghic, cu sinus, cosinus sau tangentă. La prisma dreaptă, muchia laterală stă la 90° față de bază.'
  }),

  lesson('arii-prisma', 'Aria și volumul prismei', {
    figure: 'prism',
    formulas: ['aria laterală = perimetrul bazei · h', 'aria totală = aria laterală + două arii ale bazei', 'volumul = aria bazei · h'],
    theory: 'Plan principal. Aria laterală este suma ariilor fețelor laterale. La prisma dreaptă, fețele sunt dreptunghiuri de înălțime h, deci aria laterală este perimetrul bazei înmulțit cu h. Aria totală adaugă cele două baze.\n\nVolumul prismei este aria bazei înmulțită cu înălțimea. La cutie, cu muchiile a, b și c, volumul este a · b · c. Două prisme cu baze de arii egale și cu aceeași înălțime au volume egale, chiar dacă bazele nu sunt congruente.\n\nCazurile regulate se deduc, nu se memorează ca o listă. Baza triunghi echilateral are aria l^2 · √3 împărțit la 4. Baza pătrat are aria l^2. Baza hexagon regulat se împarte în șase triunghiuri echilaterale. Cubul de latură a are volumul a^3, aria laterală 4a^2 și aria totală 6a^2.\n\nAria triunghiului, a pătratului, a hexagonului și a discului se iau din anii trecuți, apoi se înmulțesc cu înălțimea.',
    example: 'Prisma cu baza 6 cm pe 4 cm și înălțimea 5 cm are perimetrul bazei 20 cm. Aria laterală este 20 · 5 = 100 cm². Aria bazei este 24 cm², volumul este 24 · 5 = 120 cm³. Cubul de latură 5 cm are volumul 125 cm³. Dacă tai dintr-un colț un cubuleț de latură 2 cm, rămân 125 − 8 = 117 cm³.',
    practice: '1. Aria laterală a prismei 6 pe 4, cu înălțimea 5. 2. Volumul cubului de latură 5, după ce scoți un cubuleț de latură 2. 3. Aria totală a cubului de latură 2.\n\nRăspunsuri: 100 cm². 117 cm³. 24 cm².',
    mistakes: 'Nu uita cele două baze la aria totală. Nu calcula volumul cubului ca 6a^2: aceea este aria totală. Nu memora o formulă separată pentru fiecare poligon dacă o poți deduce din perimetru și din aria bazei.',
    tryThis: 'O prismă dreaptă are baza un pătrat de latură 3 cm și înălțimea 4 cm. Calculează aria laterală și volumul.',
    recap: 'La prisma dreaptă, aria laterală este perimetrul bazei ori înălțimea, aria totală adaugă două baze, volumul este aria bazei ori înălțimea. Cubul este cazul cu muchiile egale.'
  }),

  lesson('arii-piramida', 'Aria și volumul piramidei', {
    figure: 'pyramid',
    formulas: ['aria laterală = (perimetrul bazei · apotema) / 2', 'volumul = (aria bazei · h) / 3', 'ap^2 = ab^2 + h^2'],
    theory: 'Plan principal. La piramida regulată, apotema piramidei este înălțimea unei fețe laterale, dusă din vârf până la o latură a bazei. Apotema bazei este distanța de la centrul bazei până la o latură. Dacă le notezi ap și ab, atunci ap^2 = ab^2 + h^2. Muchia laterală m îndeplinește m^2 = ap^2 + (l/2)^2 și m^2 = h^2 + R^2, unde l este latura bazei și R este distanța de la centru până la un vârf al bazei.\n\nAria laterală este suma ariilor triunghiurilor. La cea regulată, este perimetrul bazei înmulțit cu apotema piramidei, totul împărțit la 2. Aria totală adaugă baza.\n\nVolumul oricărei piramide este aria bazei înmulțită cu înălțimea, totul împărțit la 3. Pentru bazele triunghi echilateral, pătrat sau hexagon regulat, aria bazei se deduce la fiecare problemă. Tetraedrul regulat este piramida cu toate fețele triunghiuri echilaterale: volumul tot (aria bazei · h) / 3, când cunoști înălțimea.',
    example: 'Baza pătrat de latură 6 cm și apotema feței 5 cm. O față are aria (6 · 5) / 2 = 15 cm². Patru fețe au 60 cm². Dacă înălțimea este 4 cm și apotema bazei este 3 cm, atunci 3^2 + 4^2 = 5^2, deci apotema feței este 5 cm. Aria bazei este 36 cm². Volumul este (36 · 4) / 3 = 48 cm³.',
    practice: '1. Aria laterală, bază pătrat de latură 6 și apotema 5. 2. Volumul, dacă aria bazei este 36 și înălțimea este 4. 3. ap^2 dacă ab = 3 și h = 4.\n\nRăspunsuri: 60. 48. 25.',
    mistakes: 'Nu împărți aria la 3. Împărțirea la 3 este la volum. Nu confunda apotema feței cu înălțimea piramidei. Nu uita factorul 1/2 când aria laterală este un triunghi.',
    tryThis: 'Calculează aria laterală a unei piramide regulate cu baza triunghi echilateral de latură 4 cm și apotema 6 cm. Perimetrul este 12 cm.',
    recap: 'Apotema feței, apotema bazei și înălțimea fac un triunghi dreptunghic. Aria laterală folosește perimetrul și apotema. Volumul oricărei piramide este o treime din aria bazei ori înălțime.'
  }),

  lesson('trunchi-piramida', 'Trunchiul de piramidă regulată', {
    figure: 'frustum-pyramid',
    formulas: ['aria laterală = (perimetrul mare + perimetrul mic) · apotema / 2', 'volumul = (h/3) · (aria mare + aria mică + radical din produsul ariilor)'],
    theory: 'Plan principal. Trunchiul de piramidă regulată are bazele poligoane regulate asemenea, în plane paralele. Fețele laterale sunt trapeze isoscele congruente. Apotema trunchiului este înălțimea unui astfel de trapez.\n\nAria laterală este suma perimetrelor bazelor, înmulțită cu apotema trunchiului, totul împărțit la 2. Aria totală adaugă ambele baze.\n\nVolumul este h/3 înmulțit cu suma dintre aria bazei mari, aria bazei mici și radicalul din produsul celor două arii. Înălțimea h este diferența dintre înălțimea piramidei mari și înălțimea piramidei mici.',
    example: 'Baza mare are aria 36 cm², baza mică 9 cm², înălțimea trunchiului este 3 cm. Radical din 36 · 9 este radical din 324, adică 18. Volumul este (3/3) · (36 + 9 + 18) = 63 cm³. Dacă perimetrele sunt 24 cm și 12 cm, iar apotema trunchiului este 5 cm, aria laterală este (24 + 12) · 5 / 2 = 90 cm².',
    practice: '1. Volumul cu ariile 36 și 9 și înălțimea 3. 2. Aria laterală cu perimetrele 24 și 12 și apotema 5. 3. Fețele laterale ce trapeze sunt?\n\nRăspunsuri: 63 cm³. 90 cm². Isoscele congruente.',
    mistakes: 'Nu folosi volumul piramidei întregi pentru trunchi. Ai două arii și radicalul produsului. Nu uita baza mică la aria totală.',
    tryThis: 'Verifică 36 + 9 + 18 și spune de ce radicalul din produsul ariilor este 18, nu 45.',
    recap: 'Trunchiul regulat are baze asemenea și fețe trapeze isoscele. Aria laterală face media perimetrelor, înmulțită cu apotema. Volumul adună cele două arii și radicalul produsului lor, apoi înmulțește cu h/3.'
  }),

  lesson('arii-cilindru', 'Aria și volumul cilindrului', {
    figure: 'cylinder',
    formulas: ['aria laterală = 2πR · G', 'aria totală = 2πR · (G + R)', 'volumul = π · R^2 · G'],
    theory: 'Plan principal. La cilindrul drept, G este înălțimea. Aria laterală este aria dreptunghiului din desfășurare: lungimea cercului ori generatoarea, adică 2πR · G. Aria totală adaugă două discuri, fiecare de arie πR^2, deci 2πR · (G + R).\n\nVolumul este aria bazei ori înălțimea: π · R^2 · G.\n\nPlan secundar. Principiul lui Cavalieri spune că două corpuri cu aceeași înălțime și cu secțiuni de arii egale la fiecare nivel au același volum. Este o investigație, nu o demonstrație pe care să o reproduci.',
    example: 'R = 3, h = 4 și π = 3. Volumul este 3 · 9 · 4 = 108. Aria laterală este 2 · 3 · 3 · 4 = 72. Aria totală este 72 + 2 · 3 · 9 = 72 + 54 = 126.',
    practice: '1. Volumul pentru R = 3, h = 4 și π = 3. 2. Aria laterală în aceleași date. 3. Ce mai adaugi la aria laterală ca să iasă aria totală?\n\nRăspunsuri: 108. 72. Două discuri.',
    mistakes: 'Nu opri volumul la πR^2. Mai înmulțești cu înălțimea. Nu calcula aria laterală cu πR^2. Aceea este baza.',
    tryThis: 'Cu π = 3, R = 2 și h = 5, calculează volumul și aria laterală. Spune care număr este „umplutura“ și care este „mantaua“.',
    recap: 'Aria laterală este 2πR · G, aria totală adaugă două baze, volumul este π · R^2 · G. Cavalieri rămâne o idee de investigație, în plan secundar.'
  }),

  lesson('arii-con', 'Aria și volumul conului', {
    figure: 'cone',
    formulas: ['aria laterală = π · R · G', 'aria totală = π · R · (G + R)', 'volumul = (π · R^2 · h) / 3'],
    theory: 'Plan principal. Aria laterală a conului este aria sectorului din desfășurare: π · R · G. Aria totală adaugă discul: π · R · (G + R).\n\nVolumul este o treime din volumul cilindrului cu aceeași bază și aceeași înălțime: (π · R^2 · h) / 3. La volum folosești h, nu G. G intră la arie. Le leagă G^2 = R^2 + h^2.',
    example: 'R = 3, h = 4, deci G = 5. Cu π = 3, aria laterală este 3 · 3 · 5 = 45. Aria totală este 45 + 3 · 9 = 72. Volumul este (3 · 9 · 4) / 3 = 36.',
    practice: '1. G pentru R = 3 și h = 4. 2. Volumul cu π = 3. 3. Aria laterală cu π = 3 și G = 5.\n\nRăspunsuri: 5. 36. 45.',
    mistakes: 'Nu împărți aria laterală la 3. Împărțirea la 3 este la volum. Nu pune G în locul lui h la volum.',
    tryThis: 'Cu R = 3 și h = 4, scrie pe două rânduri aria laterală și volumul, cu π = 3, și spune de ce numerele 45 și 36 nu se pot schimba între ele.',
    recap: 'Aria laterală este π · R · G, aria totală adaugă baza, volumul este o treime din π · R^2 · h. Generatoarea și înălțimea nu se înlocuiesc una pe alta.'
  }),

  lesson('trunchi-con', 'Trunchiul de con', {
    figure: 'frustum',
    formulas: ['aria laterală = π · G · (R + r)', 'volumul = (π · h / 3) · (R^2 + r^2 + R · r)'],
    theory: 'Plan principal. Trunchiul de con are două baze, de raze R și r, și generatoarea G înclinată. G^2 se află cu Pitagora din înălțime și din diferența razelor: diferența razelor este o catetă, înălțimea este cealaltă.\n\nAria laterală este π · G · (R + r). Aria totală adaugă cele două discuri, πR^2 și πr^2.\n\nVolumul este π · h / 3 înmulțit cu (R^2 + r^2 + R · r). Seamănă cu volumul trunchiului de piramidă: în loc de arii apar pătratele razelor și produsul lor.',
    example: 'R = 6, r = 3, h = 4 și π = 3. Diferența razelor este 3, deci G^2 = 9 + 16 = 25 și G = 5. Aria laterală este 3 · 5 · (6 + 3) = 135. Volumul este (3 · 4 / 3) · (36 + 9 + 18) = 4 · 63 = 252.',
    practice: '1. G pentru R = 6, r = 3 și h = 4. 2. Volumul cu π = 3. 3. Ce raze intră în formulă?\n\nRăspunsuri: 5. 252. Ambele, R și r.',
    mistakes: 'Nu calcula trunchiul ca un cilindru cu o singură rază. Nu uita produsul R · r din paranteza volumului. Nu lua G egal cu h.',
    tryThis: 'Verifică 36 + 9 + 18 și înmulțește cu 4. Spune de ce iese 252 când π = 3.',
    recap: 'Aria laterală este π · G · (R + r). Volumul este π · h / 3 înmulțit cu R^2 + r^2 + R · r. Generatoarea iese din înălțime și din diferența razelor.'
  }),

  lesson('sfera', 'Sfera', {
    figure: 'sphere',
    formulas: ['aria = 4πR^2', 'volumul = (4/3) · π · R^3', 'raza secțiunii iese din Pitagora'],
    theory: 'Plan principal. Sfera S(O, R) este mulțimea punctelor din spațiu aflate la distanța R de centrul O. Corpul sferic, bila, este interiorul împreună cu suprafața. Se obține rotind un semicerc în jurul diametrului. Sfera nu are desfășurare pe plan, fără încrețituri.\n\nAria este 4πR^2. Volumul este (4/3) · π · R^3. Le folosești fără demonstrație. La arie, raza este la puterea a doua. La volum, la puterea a treia.\n\nUn plan taie sfera după un cerc, sau într-un punct, sau deloc. Dacă distanța de la centru la plan este d, mai mică decât R, raza cercului de secțiune este radical din R^2 − d^2.',
    example: 'R = 3 și π = 3. Aria este 4 · 3 · 9 = 108. Volumul este (4/3) · 3 · 27 = 4 · 27 = 108. Numerele coincid doar pentru că π a fost înlocuit cu 3 și R este 3. Formulele rămân diferite. Dacă R = 5 și planul este la distanța 3 de centru, raza secțiunii este radical din 25 − 9, adică 4.',
    practice: '1. Volumul pentru R = 3 și π = 3. 2. Aria pentru aceleași date. 3. Raza secțiunii când R = 5 și d = 3.\n\nRăspunsuri: 108. 108. 4.',
    mistakes: 'Nu schimba aria cu volumul. Puterea lui R îți spune care este. Nu da sferei o desfășurare din dreptunghiuri. Nu uita să scazi pătratul distanței când cauți raza secțiunii.',
    tryThis: 'Cu π = 3 și R = 1, calculează aria și volumul. Spune care este mai mare și ce putere a lui R ai folosit.',
    recap: 'Sfera este locul punctelor la distanța R de centru. Aria este 4πR^2, volumul este (4/3) · π · R^3, fără demonstrație. Secțiunea plană este un cerc a cărui rază iese din Pitagora.'
  }),

  lesson('recap-spatiu', 'Recapitulare: geometrie în spațiu și clasa a VIII-a', {
    figure: 'cube',
    formulas: ['aria laterală a prismei = perimetrul · h', 'volumul piramidei = (aria bazei · h) / 3', 'volumul sferei = (4/3) · π · R^3'],
    theory: 'Plan principal. În spațiu, două puncte dau o dreaptă, iar un plan se fixează prin trei puncte necoliniare, o dreaptă și un punct, două secante sau două paralele. Dreptele sunt coplanare sau necoplanare. O dreaptă este în plan, îl taie sau îi este paralelă. Planele se taie după o dreaptă sau sunt paralele.\n\nPiramide, prisme, cilindri și conuri se recunosc din elemente și din desfășurare. Secțiunea paralelă cu baza este congruentă la prismă și la cilindru, asemenea la piramidă și la con. Trunchiul este ce rămâne între două baze paralele.\n\nUnghiul a două drepte se citește prin paralele. Perpendiculara pe plan se probează pe două drepte secante. Proiecția, unghiul cu planul și diedrul măsoară înclinarea. Teorema celor trei perpendiculare mută unghiul drept de pe proiecție pe oblică. Diagonala cutiei ține d^2 = a^2 + b^2 + c^2, iar a cubului este a√3.\n\nAriile și volumele se deduc: prisma din perimetru și din aria bazei, piramida cu împărțire la 3, trunchiurile cu ambele baze, cilindrul și conul cu π, sfera cu 4πR^2 și (4/3) · π · R^3.\n\nPe tot anul: intervalele și inecuațiile descriu bucăți de axă, literele și formulele scurte pregătesc ecuația de gradul II, funcția ax + b este o dreaptă, iar media, mediana, modul și amplitudinea rezumă un set de date.\n\nPlan secundar. Formula cu Δ, Thales în spațiu, poreclele de demonstrație și corpurile lui Platon nu înlocuiesc metodele de mai sus.',
    example: 'Prisma 6 pe 4 cu înălțimea 5 are aria laterală 100. Piramida cu latura 6 și apotema 5 are aria laterală 60. Cilindrul cu R = 3, h = 4 și π = 3 are volumul 108. Cubul de latură 5, fără un cubuleț de latură 2, are volumul 117. Sfera cu R = 3 și π = 3 are volumul 108 și aria 108, din formule diferite.',
    practice: '1. Aria laterală a prismei 6 pe 4, înălțime 5. 2. Aria laterală a piramidei cu latura 6 și apotema 5. 3. Volumul cilindrului R = 3, h = 4, π = 3.\n\nRăspunsuri: 100. 60. 108.',
    mistakes: 'Nu toci o formulă fără să știi dacă este arie sau volum. Nu măsura distanța pe o oblică. Nu trata planul secundar ca pe metoda obligatorie.',
    tryThis: 'Alege un corp, desenează-l, scrie elementele lui și calculează o arie sau un volum cu numere mici. Spune de ce formula se potrivește corpului.',
    recap: 'Spațiul se judecă prin paralelism, perpendicularitate, proiecții și secțiuni. Ariile și volumele ies din desfășurare și din înălțime. Împreună cu intervalele, literele și funcțiile, acestea sunt nucleul clasei a VIII-a.'
  })
];

module.exports = { SPATIU_LESSONS };
