// Capitolul IV din Matematică, clasa a V-a, Litera, cod A1259 (2022):
// punct, dreaptă, plan, semidreaptă, segment, unghiuri, figuri congruente,
// axă de simetrie și unități de măsură.
// Lecțiile vecine rămân separate, ca în cuprins. Textul e al nostru:
// nu copiem enunțurile, tabelele și testele din manual.

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
    id,
    title,
    platter,
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

const GEOMETRIE_LESSONS = [
  lesson('punct-plan', 'Punct, dreaptă, plan', {
    figure: 'points-line',
    formulas: ['Punctul are doar poziție', 'Dreapta nu se termină', 'Planul se desenează ca un paralelogram'],
    theory: 'Punctul, dreapta și planul sunt ideile de la care pornește geometria. Le desenezi după o înțelegere comună: toată lumea citește desenul la fel.\n\nPunctul este doar un loc. Nu are lungime și nu are grosime. Îl desenezi ca o bulină mică și îl numești cu o literă mare: A, B, M. Dacă două puncte stau în același loc, sunt identice și scrii A = B. Dacă stau în locuri diferite, sunt distincte și scrii A ≠ B.\n\nDreapta este ca un fir întins, fără capete, în ambele sensuri. Are o infinitate de puncte. O notezi cu literă mică, a sau d, ori cu două puncte ale ei, AB. Pe caiet vezi doar o bucată, pentru că dreapta întreagă nu încape.\n\nPlanul este ca fața unei mese, continuată în toate direcțiile, fără margine. În desen arată ca un paralelogram. Îl notezi cu literă mică, p, sau cu o literă grecească, alfa, beta, gama.\n\nDouă drepte identice au toate punctele comune și scrii d = a. Două drepte diferite scrii d ≠ a. La un cub, vârful este un punct, muchia este o bucată de dreaptă, iar fața este o bucată de plan.',
    example: 'Punctele P și Q desenate unul peste altul sunt identice: P = Q. Punctele A și B, depărtate, sunt distincte: A ≠ B. Dreapta care trece prin A și B se poate numi AB. Dacă o altă dreaptă, a, are exact aceleași puncte, atunci AB = a.',
    practice: '1. Punctul are lungime? 2. Cum notezi două puncte care nu stau în același loc? 3. Ce este o față a cutiei: punct, bucată de dreaptă sau bucată de plan?\n\nRăspunsuri: nu. A ≠ B. Bucată de plan.',
    mistakes: 'Nu pune literă mică la punct și literă mare la dreaptă. A este punct. a este dreaptă. Nu spune că dreapta se termină unde se termină creionul: desenul este doar o bucată.',
    tryThis: 'Desenează un cub. Marchează cu albastru patru vârfuri, cu portocaliu trei muchii și cu verde două fețe. Scrie lângă desen: punct, dreaptă, plan.',
    recap: 'Punctul are doar poziție. Dreapta nu are capete. Planul nu are margine. Literele mari numesc puncte. Literele mici numesc drepte și plane. Identic înseamnă același loc. Distinct înseamnă locuri diferite.'
  }),

  lesson('coliniare', 'Punctul și dreapta. Puncte coliniare', {
    figure: 'collinear',
    formulas: ['Prin două puncte distincte trece o singură dreaptă', 'Coliniare = pe aceeași dreaptă'],
    theory: 'Un punct și o dreaptă au două poziții. Dacă punctul stă pe dreaptă, el îi aparține: dreapta trece prin el și îl conține. Dacă nu stă pe ea, este în afara dreptei.\n\nPrin un singur punct poți trasa oricâte drepte, ca spițele unei roți. Prin două puncte distincte trece o singură dreaptă. Dacă două drepte au două puncte distincte comune, ele sunt aceeași dreaptă.\n\nTrei sau mai multe puncte distincte care stau pe aceeași dreaptă sunt coliniare. Dacă nu există o dreaptă care să le cuprindă pe toate, sunt necoliniare.\n\nCând A, B și C sunt coliniare, unul dintre ele stă între celelalte două. Scrii A – B – C când B este între A și C. Trei puncte necoliniare dau trei drepte: AB, AC și BC. Trei puncte coliniare dau o singură dreaptă.',
    example: 'A, B și C stau pe aceeași linie, iar D este deasupra. A, B, C sunt coliniare. A, B, D sunt necoliniare. Prin A și B trece o singură dreaptă. Prin A poți trasa încă o dreaptă, spre D.',
    practice: '1. Câte drepte trec prin două puncte distincte? 2. Trei puncte necoliniare câte drepte distincte dau? 3. Dacă B este între A și C, cum scrii ordinea?\n\nRăspunsuri: una. Trei. A – B – C.',
    mistakes: 'Nu spune că prin două puncte trec mai multe drepte. Rigla îți arată una singură. Nu numi coliniare trei puncte care fac un triunghi: acelea sunt necoliniare.',
    tryThis: 'Pune trei puncte pe caiet. Trasează toate dreptele care unesc măcar două dintre ele. Spune dacă ai obținut o dreaptă sau trei, și de ce.',
    recap: 'Punctul este pe dreaptă sau în afara ei. Prin două puncte distincte trece o singură dreaptă. Punctele de pe aceeași dreaptă sunt coliniare. Între ele, unul stă la mijlocul drumului pe linie.'
  }),

  lesson('semidreapta', 'Semidreaptă, segment, semiplan', {
    figure: 'points-line',
    formulas: ['Semidreapta are o origine', 'Segmentul are două capete', 'Dreapta taie planul în două semiplane'],
    theory: 'Dacă pe dreapta d stă punctul A, porțiunea care începe în A și merge într-un singur sens este semidreapta cu originea A. Fiecare punct al dreptei face două semidrepte opuse. Semidreapta cu originea A care trece prin B se notează AB: litera originii este prima.\n\nSegmentul AB este bucata de dreaptă cu capetele A și B. Punctele dintre A și B sunt ale segmentului. El este partea comună a semidreptelor AB și BA. AB și BA numesc același segment.\n\nO dreaptă dintr-un plan îl taie în două zone, ca un pod care taie apa. Fiecare zonă, împreună cu dreapta, este un semiplan. Două puncte sunt de aceeași parte dacă drumul drept dintre ele nu taie dreapta. Sunt de o parte și de alta dacă drumul drept o taie.',
    example: 'Pe o dreaptă, B, A, C stau în ordinea asta, iar A este între B și C. Semidreptele AB și AC sunt opuse. Segmentul BC îi cuprinde pe B, A și C. Un punct deasupra dreptei și unul dedesubt sunt în semiplane diferite.',
    practice: '1. Câte capete are o semidreaptă? 2. Câte capete are un segment? 3. Două semidrepte opuse fac împreună ce figură?\n\nRăspunsuri: unul, originea. Două. O dreaptă.',
    mistakes: 'Nu schimba ordinea literelor la semidreaptă: AB pornește din A, nu din B. Nu spune că segmentul continuă după capete. Nu uita că dreapta însăși desparte cele două semiplane.',
    tryThis: 'Desenează o dreaptă și un punct A pe ea. Colorează o semidreaptă cu roșu și semidreapta opusă cu albastru. Marchează apoi segmentul dintre două puncte de pe dreaptă.',
    recap: 'Semidreapta are origine și un singur sens. Două semidrepte opuse refac dreapta. Segmentul are două capete. O dreaptă împarte planul în două semiplane.'
  }),

  lesson('drepte', 'Poziții relative a două drepte', {
    figure: 'parallels',
    formulas: ['Identice: toate punctele comune', 'Concurente: un singur punct comun', 'Paralele: niciun punct comun'],
    theory: 'Două drepte dintr-un plan se cunosc după câte puncte au în comun.\n\nDacă au toate punctele comune, sunt identice. Dacă au exact un punct comun, sunt concurente, sau secante. Punctul acela este intersecția lor. Dacă nu au niciun punct comun, sunt paralele.\n\nParalelele le poți desena cu rigla și echerul. Ții rigla fixă. Sprijini echerul pe riglă și trasezi prima dreaptă. Apoi muți echerul pe aceeași riglă și trasezi a doua. Ca să verifici două drepte deja desenate, repeți mișcarea: dacă echerul le atinge pe amândouă fără să întorci rigla, ele sunt paralele.\n\nTrei drepte pot fi paralele două câte două. Pot fi și două câte două concurente, fără ca toate trei să treacă prin același punct: atunci laturile unui triunghi stau pe cele trei drepte. La un cub, unele muchii se întâlnesc într-un vârf, altele nu se întâlnesc deloc.',
    example: 'Dreptele a și b se taie într-un singur punct, deci sunt concurente. Dreptele a și c nu se ating, deci sunt paralele. Dacă a și AB au două puncte distincte comune, atunci a și AB sunt aceeași dreaptă.',
    practice: '1. Cum se numesc două drepte cu un singur punct comun? 2. Cum se numesc două drepte din plan fără niciun punct comun? 3. Două drepte cu toate punctele comune sunt…\n\nRăspunsuri: concurente. Paralele. Identice.',
    mistakes: 'Nu numi paralele două drepte care încă nu s-au întâlnit în desen, dar s-ar întâlni dacă le prelungești. Prelungirea face parte din dreaptă. Nu spune că paralelele se taie „foarte departe”.',
    tryThis: 'Cu rigla și echerul desenează două drepte paralele și o a treia care le taie pe amândouă. Spune ce poziție are a treia față de fiecare.',
    recap: 'În plan, două drepte sunt identice, concurente sau paralele. Concurente înseamnă un punct de intersecție. Paralele înseamnă niciun punct comun. Echerul pe riglă ține direcția.'
  }),

  lesson('lungime', 'Distanța și segmente congruente', {
    figure: 'midpoint',
    formulas: ['Lungimea este distanța dintre capete', 'Dacă A – B – C, atunci AC = AB + BC', 'AB ≡ CD înseamnă aceeași lungime'],
    theory: 'Distanța dintre A și B este lungimea segmentului AB. O măsori cu rigla gradată: pui gradația 0 în A și citești gradația din B. Unitatea poate fi centimetrul. Scrii AB = 7 cm. Aceeași notație AB poate însemna segmentul, lungimea lui sau distanța, după propoziție.\n\nDacă A, B, C sunt coliniare și B este între A și C, atunci AC = AB + BC. Și invers: dacă lungimile îndeplinesc AC = AB + BC, atunci punctele sunt coliniare în ordinea A – B – C. Dacă C este între A și B, atunci AC = AB − BC.\n\nPoți construi un segment de 7 cm cu rigla: 0 în A, semnul 7 dă punctul B. Cu compasul, deschizi de la 0 la 7 pe riglă, apoi păstrezi deschiderea și o așezi cu acul în A.\n\nDouă segmente care se suprapun perfect sunt congruente. Scrii AB ≡ CD și citești „AB congruent cu CD”. Ele au aceeași lungime, și orice segmente de aceeași lungime sunt congruente. Orice segment este congruent cu el însuși. Dacă AB ≡ CD, atunci și CD ≡ AB. Dacă AB ≡ CD și CD ≡ EF, atunci AB ≡ EF.\n\nCu compasul copiezi un segment fără să-i măsori numărul: deschizi compasul între capete, apoi duci arcul din noul capăt.',
    example: 'AB = 5 cm și BC = 2 cm. Dacă B este între A și C, atunci AC = 7 cm. Dacă C este între A și B, atunci AC = 3 cm. Un segment de 5 cm este congruent cu orice alt segment de 5 cm.',
    practice: '1. AB = 4 cm, BC = 6 cm și B este între A și C. Cât este AC? 2. AB = 9 cm și C este între A și B, cu AC = 2 cm. Cât este CB? 3. Două segmente de 8 cm sunt congruente?\n\nRăspunsuri: 10 cm. 7 cm. Da.',
    mistakes: 'Nu aduna AB și BC dacă B nu este între A și C. Nu confunda semnul ≡, care spune „se suprapun”, cu semnul = pus la puncte identice. La lungimi, aceeași mărime se scrie și cu =.',
    tryThis: 'Construiește un segment de 6 cm cu rigla. Apoi, numai cu compasul, construiește unul congruent cu el. Verifică la final cu rigla.',
    recap: 'Lungimea segmentului este distanța dintre capete. Pe o linie, bucățile vecine se adună. Segmentele congruente se suprapun și au aceeași lungime. Compasul copiază lungimea.'
  }),

  lesson('mijloc', 'Mijlocul unui segment', {
    figure: 'midpoint',
    formulas: ['AM = MB = jumătate din AB', 'B este simetricul lui A față de mijloc'],
    theory: 'Mijlocul segmentului AB este punctul M de pe segment, la fel de departe de A și de B. Deci AM = MB, și M este între A și B. Poți spune și AM ≡ MB. Atunci AM și MB sunt fiecare jumătate din AB: AM = MB = AB : 2.\n\nCu rigla, măsori AB, împărți la 2 și marchezi lungimea asta de la A, pe segment.\n\nDacă C este mijlocul lui AB, punctul B este simetricul lui A față de C, iar A este simetricul lui B față de C. A, C și B sunt coliniare și AC = CB. Dacă îndoi segmentul în C, A cade peste B.\n\nCa să construiești simetricul lui A față de C, trasezi dreapta AC și copiezi lungimea AC de cealaltă parte a lui C. Punctul nou, B, este simetricul. Cu compasul, acul stă în C, deschiderea este AC, iar arcul taie dreapta încă o dată, în B.',
    example: 'AB = 18 cm și M este mijlocul. Atunci AM = MB = 9 cm. Dacă AM = 4 cm și M este mijlocul, atunci AB = 8 cm. Simetricul lui A față de M este B.',
    practice: '1. AB = 14 cm. Cât este AM dacă M este mijlocul? 2. BM = 3,5 cm și M este mijlocul. Cât este AB? 3. Capetele și mijlocul sunt coliniare?\n\nRăspunsuri: 7 cm. 7 cm. Da.',
    mistakes: 'Nu pui mijlocul oriunde la aceeași distanță de capete: un punct din afara dreptei poate fi la fel de departe de A și de B, dar nu este mijlocul. Mijlocul stă pe segment. Nu iei AM = AB.',
    tryThis: 'Desenează un segment de 10 cm. Marchează mijlocul cu rigla. Apoi construiește simetricul unui capăt față de mijloc și vezi că ajungi în celălalt capăt.',
    recap: 'Mijlocul stă pe segment și taie lungimea în două părți congruente. Fiecare parte este AB : 2. Simetricul față de un punct se obține copiind distanța de cealaltă parte, pe aceeași dreaptă.'
  }),

  lesson('recap-drepte', 'Recapitulare: punct, dreaptă, segment', {
    figure: 'collinear',
    formulas: ['O dreaptă prin două puncte', 'Paralele, concurente sau identice', 'AC = AB + BC când B este între A și C'],
    theory: 'Punctul are doar poziție. Dreapta nu are capete. Planul nu are margine. Un punct este pe dreaptă sau în afara ei. Prin două puncte distincte trece o singură dreaptă. Punctele de pe ea sunt coliniare.\n\nSemidreapta are o origine. Segmentul are două capete. Dreapta taie planul în două semiplane. Două drepte din plan sunt identice, concurente sau paralele.\n\nLungimea se măsoară cu rigla. Pe o linie, bucățile vecine se adună. Segmentele de aceeași lungime sunt congruente. Mijlocul taie segmentul în două părți egale.',
    example: 'A – B – C, AB = 3 cm, BC = 4 cm, deci AC = 7 cm. Mijlocul lui AC este la 3,5 cm de A. O dreaptă care nu taie AC și nu se confundă cu ea este paralelă cu AC, dacă stau în același plan și nu se întâlnesc.',
    practice: '1. Trei puncte necoliniare câte drepte dau? 2. AB = 10 cm, B între A și C, BC = 2 cm. Cât este AC? 3. Mijlocul unui segment de 10 cm taie ce lungime?\n\nRăspunsuri: trei. 12 cm. 5 cm.',
    mistakes: 'Nu prelungești un segment și să-l mai numești segment. Nu aduni lungimi care nu sunt cap la cap, în ordine. Nu numești paralele două drepte care se taie în afara foii.',
    tryThis: 'Fă o schemă cu trei coloane: punct și dreaptă, segment, două drepte. În fiecare coloană pune un desen mic și o propoziție a ta.',
    recap: 'Două puncte fixează o dreaptă. Segmentul este bucata dintre ele. Lungimile de pe aceeași linie se adună când un punct este între celelalte. Paralelele nu se întâlnesc. Mijlocul înjumătățește.'
  }),

  lesson('unghi', 'Unghiul: vârf, laturi, interior', {
    figure: 'angle',
    formulas: ['Două semidrepte cu aceeași origine', 'Vârful se scrie la mijloc', 'Interiorul este zona dintre laturi'],
    theory: 'Un unghi este figura făcută din două semidrepte cu aceeași origine. Originea este vârful. Semidreptele sunt laturile. Limbile unui ceas, prelungite din centrul cadranului, îți arată un unghi.\n\nCa să-l numești, iei vârful și câte un punct pe fiecare latură, diferit de vârf. La unghiul cu vârful O și punctele A și B pe laturi scrii unghiul AOB sau unghiul BOA. Litera vârfului stă mereu la mijloc. Dacă în desen nu mai este alt unghi cu vârful O, poți scrie doar unghiul O.\n\nDacă M este pe latura OA și N este pe latura OB, unghiul MON este același unghi cu AOB.\n\nLaturile taie planul în două zone. Interiorul unghiului ABC este partea comună a două semiplane: semiplanul delimitat de AB care îl conține pe C și semiplanul delimitat de BC care îl conține pe A. Exteriorul este restul planului, în afara unghiului: punctele care nu stau în ambele semiplane deodată.',
    example: 'La unghiul AOB, vârful este O, iar laturile sunt semidreptele OA și OB. Scrierea BOA este aceeași figură. Un punct între laturi, aproape de vârf, este în interior. Un punct din spatele unei laturi este în exterior.',
    practice: '1. În scrierea AOB, care literă este vârful? 2. Din ce este făcut un unghi? 3. Două nume, AOB și BOA, pot fi același unghi?\n\nRăspunsuri: O. Din două semidrepte cu aceeași origine. Da.',
    mistakes: 'Nu pune vârful pe prima sau pe ultima poziție când folosești trei litere. OAB nu numește unghiul cu vârful O. Nu confunda interiorul cu toată foaia din jurul vârfului.',
    tryThis: 'Desenează un unghi, notează-l în două feluri corecte și hașurează interiorul. Pune un punct în interior și unul în exterior și scrie de ce.',
    recap: 'Unghiul are un vârf și două laturi. În numele cu trei litere, vârful este la mijloc. Interiorul este zona dintre laturi. Exteriorul este în afara ei.'
  }),

  lesson('masura-unghi', 'Măsura unui unghi', {
    figure: 'angle',
    formulas: ['Unitatea este gradul, 1°', 'Raportorul are 180 de diviziuni', '0° ≤ măsura ≤ 180°'],
    theory: 'Deschiderea unui unghi se vede pe un arc de cerc dus cu centrul în vârf. Arcul mai lung înseamnă unghi mai mare, dacă deschiderea compasului este aceeași.\n\nUnitatea de măsură este gradul sexagesimal, notat 1°. Instrumentul este raportorul. El are două semicercuri cu același centru, fiecare tăiat în 180 de părți egale. O diviziune este 1°. Centrul se pune pe vârf. Gradația 0° stă pe o latură. Cealaltă latură îți arată măsura, pe același semicerc pe care ai citit 0°.\n\nMăsura este numărul de unghiuri de 1° care încap în deschidere. Pentru unghiul de până la o linie dreaptă, numărul α îndeplinește 0° ≤ α ≤ 180°. Unghiul AOB și unghiul BOA au aceeași măsură.\n\nCa să construiești un unghi de 70°, trasezi semidreapta OA, pui centrul raportorului în O, așezi 0° pe OA și marchezi 70° pe semicercul potrivit. Apoi trasezi semidreapta OB.',
    example: 'Raportorul citește 41° pentru unghiul AOB. Atunci și unghiul BOA are 41°. Un unghi de 70° se construiește punând 0° pe o latură și marcând diviziunea 70 pe același semicerc.',
    practice: '1. Cum se numește unitatea de măsură a unghiului? 2. Câte diviziuni de 1° are un semicerc al raportorului? 3. Poate un unghi din lecția asta avea 200°?\n\nRăspunsuri: gradul sexagesimal. 180. Nu, măsura este cel mult 180°.',
    mistakes: 'Nu citi 0° pe semicercul mare și măsura pe semicercul mic: cele două sensuri sunt opuse. Nu pune centrul raportorului în altă parte decât în vârf. Nu măsura un arc lung și unul scurt făcute cu compasuri deschise diferit.',
    tryThis: 'Construiește cu raportorul un unghi de 60° și unul de 120°. Scrie sub fiecare măsura și spune care are interiorul mai larg.',
    recap: 'Gradul este unitatea. Raportorul se așază cu centrul în vârf și cu 0° pe o latură. Citești pe același semicerc. Măsura este între 0° și 180°.'
  }),

  lesson('clasificare-unghi', 'Clasificări și unghiuri congruente', {
    figure: 'angle',
    formulas: ['Ascuțit: sub 90°', 'Drept: 90°', 'Obtuz: între 90° și 180°', 'Nul: 0°. Alungit: 180°'],
    theory: 'Unghiul drept are 90°. Cu el compari celelalte. Unghiul ascuțit are măsura mai mică decât 90°. Unghiul obtuz are măsura mai mare decât 90° și mai mică decât 180°.\n\nDacă laturile stau pe drepte diferite, cele trei puncte din nume sunt necoliniare. Dacă laturile stau pe aceeași dreaptă, apar două cazuri. Unghiul nul are 0°: laturile sunt aceeași semidreaptă. Unghiul alungit are 180°: laturile sunt semidrepte opuse.\n\nDouă unghiuri care se suprapun sunt congruente. Scrii unghiul ABC ≡ unghiul DEF. Ele au aceeași măsură, și două unghiuri de aceeași măsură sunt congruente. Orice unghi este congruent cu el însuși. Congruența merge în ambele sensuri și se transmite: dacă primul este congruent cu al doilea și al doilea cu al treilea, atunci primul este congruent cu al treilea.\n\nCând două drepte diferite se taie, unghiurile față în față au laturile pe semidrepte opuse și sunt congruente. Unghiurile alungite de pe cele două drepte au fiecare 180°, deci sunt și ele congruente.',
    example: 'Un unghi de 30° este ascuțit. Unul de 90° este drept. Unul de 150° este obtuz. 0° este nul. 180° este alungit. Două unghiuri de 30°, față în față la intersecția a două drepte, sunt congruente.',
    practice: '1. Un unghi de 89° este ascuțit, drept sau obtuz? 2. Câte grade are unghiul alungit? 3. Două unghiuri de 47° sunt congruente?\n\nRăspunsuri: ascuțit. 180°. Da.',
    mistakes: 'Nu spune „pare ascuțit” fără să compari cu 90°. Nu numi obtuz un unghi de 180°: acela este alungit. Nu crede că unghiurile față în față sunt suplementare: ele sunt egale. Cele alăturate pe o dreaptă fac împreună 180°.',
    tryThis: 'Desenează două drepte care se taie. Măsoară un unghi ascuțit. Fără raportor, scrie măsura unghiului din față și a celui de lângă el, pe aceeași dreaptă.',
    recap: 'Sub 90° este ascuțit. 90° este drept. Între 90° și 180° este obtuz. 0° este nul. 180° este alungit. Aceeași măsură înseamnă unghiuri congruente. La două drepte secante, unghiurile față în față sunt congruente.'
  }),

  lesson('grade-minute', 'Grade și minute', {
    figure: 'angle',
    formulas: ['1° = 60′', '60′ fac 1°', 'Suma a două unghiuri nu trece de 180°'],
    theory: 'Minutul sexagesimal este a 60-a parte dintr-un grad. Scrii 1° = 60′. Când scrii măsura, minutele sunt mai puține decât 60. De exemplu, 29°45′ înseamnă 29 de grade și 45 de minute.\n\nDouă unghiuri congruente au același număr de grade și același număr de minute. Dacă un unghi are mai multe grade, este mai mare. La același număr de grade, te uiți la minute.\n\nAduni gradele cu gradele și minutele cu minutele. Dacă minutele ajung la 60 sau trec peste, fiecare 60′ devin 1° și se adaugă la grade. Suma a două unghiuri rămâne un unghi doar dacă nu trece de 180°.\n\nScazi doar dacă primul unghi este mai mare. Dacă minutele nu ajung, împrumuți 1°, adică 60′. La înmulțirea cu un număr natural, înmulțești gradele și minutele, apoi strângi fiecare 60′ într-un grad. La împărțirea la un număr natural nenul, împărți gradele, iar restul îl prefaci în minute și îl aduni la minutele deja existente, apoi împărți minutele.',
    example: '18°40′ + 7°25′ = 25°65′ = 26°5′, pentru că 65′ = 1°5′. 40°15′ − 12°40′ = 39°75′ − 12°40′ = 27°35′. (12°30′) · 2 = 24°60′ = 25°. (15°30′) : 3 = 5°10′.',
    practice: '1. Câte minute are un grad? 2. Calculează 20°50′ + 10°20′. 3. Calculează 30°10′ − 8°25′.\n\nRăspunsuri: 60. 31°10′. 21°45′.',
    mistakes: 'Nu lăsa 75′ în rezultat: treci 60′ la grade. Nu scădea dacă primul unghi este mai mic. Nu aduna două unghiuri peste 180° și să spui că suma este tot un unghi din lecția asta.',
    tryThis: 'Alege două măsuri sub 90°, cu minute. Adună-le. Apoi scade-le pe cea mică din cea mare. Verifică dacă minutele din rezultate sunt mai mici decât 60.',
    recap: '1° = 60′. La adunare, 60′ urcă un grad. La scădere, un grad împrumutat aduce 60′. Înmulțirea și împărțirea se fac la fel, cu aceeași regulă a minutelor. Rezultatul se scrie cu mai puțin de 60′.'
  }),

  lesson('recap-unghiuri', 'Recapitulare: unghiuri', {
    figure: 'angle',
    formulas: ['Vârful la mijloc', 'Drept = 90°', '1° = 60′'],
    theory: 'Unghiul este făcut din două semidrepte cu aceeași origine. Vârful se scrie la mijloc. Interiorul este zona dintre laturi.\n\nMăsura se citește cu raportorul, în grade, de la 0° la 180°. Sub 90° este ascuțit, 90° este drept, între 90° și 180° este obtuz, 0° este nul, 180° este alungit. Aceeași măsură înseamnă unghiuri congruente.\n\nMinutul este a 60-a parte din grad. Calculele cu grade și minute respectă pragul de 60′.',
    example: 'Unghiul AOB de 35° este ascuțit. Unghiul din față, la două drepte secante, are tot 35°. Cel alăturat, pe aceeași dreaptă, are 180° − 35° = 145°, deci este obtuz. 20°50′ + 0°20′ = 21°10′.',
    practice: '1. Un unghi de 90° cum se numește? 2. 50′ + 20′ câte grade și minute fac? 3. Unghiurile de aceeași măsură sunt…\n\nRăspunsuri: drept. 1°10′. Congruente.',
    mistakes: 'Nu pune vârful la marginea numelui. Nu citi raportorul pe semicercul greșit. Nu lăsa 70′ nestrans într-un grad.',
    tryThis: 'Construiește un unghi drept cu raportorul și unul de 30°. Spune cum se numește fiecare și calculează diferența lor în grade și minute.',
    recap: 'Unghiul are vârf și două laturi. Măsura este în grade, între 0° și 180°. Numele depinde de comparația cu 90° și cu 180°. Minutele se grupează câte 60.'
  }),

  lesson('congruente', 'Figuri congruente', {
    figure: 'square',
    formulas: ['Se suprapun perfect', 'Laturile corespunzătoare sunt congruente', 'Unghiurile corespunzătoare sunt congruente'],
    theory: 'Două figuri geometrice sunt congruente dacă, așezate una peste alta, coincid. Segmentele congruente au aceeași lungime. Unghiurile congruente au aceeași măsură. Verifici cu o folie: copiezi figura, o muți și vezi dacă se așază exact.\n\nLa suprapunere, vârfurile care cad unul peste altul sunt vârfuri corespunzătoare. Laturile dintre ele sunt laturi corespunzătoare. Unghiurile lor sunt unghiuri corespunzătoare.\n\nDacă două figuri sunt congruente, toate segmentele corespunzătoare sunt congruente și toate unghiurile corespunzătoare sunt congruente.\n\nLa un pătrat poți suprapune copia în mai multe feluri, pentru că laturile sunt egale și unghiurile sunt drepte. La un triunghi oarecare, potrivirea care îl acoperă perfect este una singură: fiecare vârf are perechea lui.',
    example: 'Un segment de 5 cm este congruent cu alt segment de 5 cm. Un unghi de 40° este congruent cu alt unghi de 40°. Două pătrate cu latura de 3 cm se suprapun, deci sunt congruente. Laturile lor corespunzătoare au fiecare 3 cm.',
    practice: '1. Două segmente de 4 cm sunt congruente? 2. Două unghiuri, unul de 30° și unul de 40°, sunt congruente? 3. La figuri congruente, unghiurile corespunzătoare au aceeași măsură?\n\nRăspunsuri: da. Nu. Da.',
    mistakes: 'Nu spune că două figuri sunt congruente doar pentru că arată „asemănător”, dar una este mai mare. Congruent înseamnă aceeași mărime, nu doar aceeași formă. Nu amesteca vârfurile la suprapunere.',
    tryThis: 'Decupează două pătrate cu aceeași latură și un dreptunghi mai lung. Vezi care se suprapun. Scrie perechile de laturi care cad una peste alta.',
    recap: 'Figurile congruente coincid prin suprapunere. Segmentele corespunzătoare au aceeași lungime. Unghiurile corespunzătoare au aceeași măsură. Pătratul se poate potrivi în mai multe feluri. Triunghiul oarecare, într-unul singur.'
  }),

  lesson('simetrie', 'Axă de simetrie', {
    figure: 'symmetry-axis',
    formulas: ['Îndoitura suprapune figura', 'Mijlocul stă pe axă', 'Axa face 90° cu segmentul dintre punctele simetrice'],
    theory: 'Desenezi o dreaptă d și un punct M în afara ei. Îndoi foaia după d. Copia lui M, de cealaltă parte, este punctul N. M și N sunt simetrice față de dreapta d. Dreapta d este axă de simetrie pentru figura făcută din cele două puncte.\n\nSegmentul MN taie axa în P. P este mijlocul lui MN. La îndoire, MP cade peste NP, deci d este axă de simetrie și pentru segmentul MN. Unghiul MPN este alungit, de 180°. Îndoirea îl taie în două unghiuri congruente, deci fiecare are 90°. Axa este perpendiculară pe MN.\n\nO figură are axă de simetrie dacă îndoirea după dreapta aceea o suprapune pe ea însăși. Poți vedea asta la frunze, la fluturi sau la litere desenate cu grijă. Nu orice dreaptă printr-un desen este axă: îndoitura trebuie să potrivească tot.',
    example: 'M și N sunt de o parte și de alta a dreptei d, iar P, mijlocul lui MN, stă pe d. Dacă MP = NP și unghiul dintre d și MN este drept, atunci d este axă de simetrie pentru M și N. Un segment îndoit după mediatoarea lui, adică după perpendiculara din mijloc, își suprapune capetele.',
    practice: '1. Punctele simetrice față de o dreaptă coincid la îndoire? 2. Unde stă mijlocul segmentului care le unește? 3. Ce măsură are unghiul dintre axă și segmentul MN?\n\nRăspunsuri: da. Pe axă. 90°.',
    mistakes: 'Nu trasa o dreaptă la întâmplare prin mijlocul desenului și să o numești axă, fără îndoire. Nu uita că punctul de pe axă este simetric cu el însuși. Nu înclina segmentul MN: la simetrie, el face unghi drept cu axa.',
    tryThis: 'Taie o inimă sau o frunză din hârtie, îndoită o dată. Deschide și trasează cu rigla îndoitura. Aceea este o axă. Marchează două puncte simetrice și mijlocul dintre ele.',
    recap: 'Axa de simetrie este dreapta după care figura se îndoaie și se suprapune. Punctele simetrice sunt la fel de depărtate de axă. Mijlocul stă pe axă. Segmentul dintre ele face 90° cu axa.'
  }),

  lesson('recap-congruente', 'Recapitulare: congruență și simetrie', {
    figure: 'symmetry-axis',
    formulas: ['Congruent = se suprapune', 'Axa pliază figura peste ea'],
    theory: 'Congruent înseamnă că două figuri coincid când le așezi una peste alta. Atunci laturile corespunzătoare sunt congruente și unghiurile corespunzătoare sunt congruente.\n\nAxa de simetrie este o dreaptă de îndoire. Punctele simetrice cad unul peste altul. Segmentul dintre ele este tăiat în două de axă și face cu ea un unghi drept.',
    example: 'Două pătrate cu latura de 4 cm sunt congruente. Axa prin mijloacele a două laturi opuse îndoaie pătratul peste el însuși. Două unghiuri de 25° sunt congruente, chiar dacă stau în locuri diferite pe foaie.',
    practice: '1. O figură mai mare, de aceeași formă, este congruentă cu cea mică? 2. Mijlocul dintre două puncte simetrice stă pe axă? 3. Unghiul dintre axă și segmentul lor are câte grade?\n\nRăspunsuri: nu. Da. 90°.',
    mistakes: 'Nu confunda „arată la fel, dar este mai mare” cu congruent. Nu numi axă o linie care lasă o parte a figurii neacoperită la îndoire.',
    tryThis: 'Desenează un segment și mediatoarea lui. Marchează două puncte simetrice. Apoi desenează un pătrat congruent cu unul dat, cu aceeași latură.',
    recap: 'Suprapunerea perfectă înseamnă congruență. Îndoirea perfectă înseamnă axă de simetrie. În ambele cazuri, măsurile care se corespund sunt egale.'
  }),

  lesson('lungime-unitati', 'Unități pentru lungime și perimetrul', {
    figure: 'rectangle',
    formulas: ['1 km = 1000 m', '1 m = 100 cm', 'P = suma laturilor'],
    theory: 'Unitatea principală pentru lungime este metrul. Multiplii lui sunt decametrul, hectometrul și kilometrul. Submultiplii sunt decimetrul, centimetrul și milimetrul. Pentru o lungime mare alegi un multiplu. Pentru una mică, un submultiplu.\n\nCând treci la un submultiplu, înmulțești cu 10, cu 10^2, cu 10^3 și așa mai departe, câte un pas pe scara unităților. Când treci la un multiplu, împarți la aceleași puteri ale lui 10. 1 km = 1000 m. 1 m = 10 dm = 100 cm = 1000 mm.\n\nNu aduni lungimi scrise în unități diferite. Le aduci întâi în aceeași unitate.\n\nPerimetrul este lungimea liniei închise care mărginește o suprafață. La o figură, este suma lungimilor laturilor. La triunghi, P = a + b + c. La patrulater, P = a + b + c + d. Poți verifica cu un fir: îl întinzi pe contur, apoi îl măsori. Lungimea firului este perimetrul.',
    example: '4 km = 4000 m. 250 cm = 2,5 m, pentru că 250 : 100 = 2,5. Un triunghi cu laturile 5 cm, 6 cm și 7 cm are P = 18 cm. Un patrulater cu laturile 3 cm, 4 cm, 3 cm și 4 cm are P = 14 cm.',
    practice: '1. Câți metri sunt în 3 km? 2. Câți centimetri sunt în 2 m? 3. Un triunghi are laturile 4 cm, 4 cm și 6 cm. Cât este perimetrul?\n\nRăspunsuri: 3000 m. 200 cm. 14 cm.',
    mistakes: 'Nu aduna 2 m cu 30 cm și să scrii 32. Întâi 2 m = 200 cm, apoi 230 cm. Nu confunda perimetrul cu o singură latură. Nu sări peste un pas pe scară: de la metru la milimetru sunt trei pași, deci 10^3, nu 10.',
    tryThis: 'Măsoară laturile unui dreptunghi din cameră sau de pe caiet, în centimetri. Calculează perimetrul. Apoi scrie aceeași sumă și în milimetri.',
    recap: 'Metrul este unitatea de lungime. Spre unități mai mici înmulțești cu puteri ale lui 10. Spre unități mai mari împarți. Perimetrul este suma laturilor, măsurate în aceeași unitate.'
  }),

  lesson('arie-unitati', 'Unități pentru arie', {
    figure: 'rectangle',
    formulas: ['1 m^2 = 100 dm²', 'Aria dreptunghiului = L · l', 'Aria pătratului = l^2'],
    theory: 'Aria măsoară suprafața. Unitatea de arie este suprafața unui pătrat cu latura de o unitate de lungime. Metrul pătrat, m^2, este pătratul cu latura de 1 m. Mai sunt decimetrul pătrat, centimetrul pătrat, milimetrul pătrat și multiplii: decametrul pătrat, hectometrul pătrat, kilometrul pătrat.\n\nUn metru pătrat cuprinde 10 rânduri de câte 10 decimetri pătrați, deci 1 m^2 = 10^2 dm² = 100 dm². La fiecare pas pe scară înmulțești sau împarți cu 100, adică cu 10^2. Două pătrate mai departe înseamnă 10^4, și tot așa. Terenurile se mai măsoară în ari și hectare: 1 ar = 100 m^2, 1 ha = 10000 m^2. Un pogon este 0,5 ha, adică 5000 m^2.\n\nCa să afli aria, acoperi suprafața cu pătrate unitate, fără găuri și fără încălecări. La dreptunghi, dacă lungimea cuprinde L unități și lățimea l unități, de același fel, aria este L · l. La pătrat, latura se repetă, deci aria este l^2. Dimensiunile trebuie să fie în aceeași unitate de lungime înainte de înmulțire. Ariile pe care le aduni trebuie să fie și ele în aceeași unitate de arie.',
    example: 'Un dreptunghi de 6 cm pe 4 cm are aria 6 · 4 = 24 cm². Un pătrat cu latura de 5 cm are aria 5^2 = 25 cm². 3 m^2 = 300 dm². 1 ha = 10000 m^2.',
    practice: '1. Aria unui dreptunghi de 8 cm pe 3 cm. 2. Aria unui pătrat cu latura de 4 cm. 3. Câți decimetri pătrați are 2 m^2?\n\nRăspunsuri: 24 cm². 16 cm². 200 dm².',
    mistakes: 'Nu înmulți metri cu centimetri. Treci ambele laturi în aceeași unitate. Nu confunda aria cu perimetrul: perimetrul adună laturile, aria le înmulțește la dreptunghi. Nu trece de la m^2 la dm² înmulțind doar cu 10.',
    tryThis: 'Desenează pe caietul cu pătrățele un dreptunghi de 5 pe 2 pătrățele. Numără pătrățelele. Apoi calculează 5 · 2 și compară. Scrie unitatea: pătrățele, adică unități de arie.',
    recap: 'Unitatea de arie este un pătrat. La fiecare pas, factorul este 100. Dreptunghiul are aria L · l. Pătratul are aria l^2. 1 ar = 100 m^2 și 1 ha = 10000 m^2.'
  }),

  lesson('volum-unitati', 'Unități pentru volum și capacitate', {
    figure: 'cube',
    formulas: ['Volumul cubului = a^3', 'Volumul cutiei = a · b · c', '1 l = 1 dm³'],
    theory: 'Volumul măsoară cât loc ocupă un corp. Unitatea de volum este un cub cu latura de o unitate de lungime. Metrul cub, m^3, este cubul cu latura de 1 m. Un metru cub se umple cu 10 straturi de câte 10 · 10 decimetri cubi, deci 1 m^3 = 10^3 dm³ = 1000 dm³. La fiecare pas pe scară înmulțești sau împarți cu 1000, adică cu 10^3.\n\nCubul cu latura de a unități are volumul a^3. Paralelipipedul dreptunghic, cutia, cu dimensiunile a, b și c în aceeași unitate, are volumul a · b · c. Nu te opri la două dimensiuni: aceea este o față, nu cutia.\n\nLichidul ocupă locul pe care îl umple într-un vas. Capacitatea vasului se măsoară în litri. Litrul este capacitatea unui cub cu muchia de 1 dm. Scrii 1 l = 1 dm³. Multiplii sunt decalitrul, hectolitrul și kilolitrul. Submultiplii sunt decilitrul, centilitrul și mililitrul. Pe scara litrului, un pas înseamnă tot factorul 10. 1 l = 1000 ml. Pentru că 1 dm³ = 1000 cm³, ai și 1 ml = 1 cm³.\n\nDacă bagi un obiect într-un vas cu apă, volumul lui este diferența dintre nivelul de după și nivelul de dinainte, apoi îl treci în centimetri cubi dacă ți se cere.',
    example: 'Un cub cu latura de 3 cm are volumul 3^3 = 27 cm³. O cutie de 5 cm, 4 cm și 2 cm are volumul 5 · 4 · 2 = 40 cm³. 2 l = 2 dm³ = 2000 cm³. Dacă apa urcă de la 400 ml la 650 ml, obiectul are 250 ml, adică 250 cm³.',
    practice: '1. Volumul cubului cu latura de 2 cm. 2. Volumul cutiei 6 cm × 2 cm × 2 cm. 3. Câți mililitri are 1 l?\n\nRăspunsuri: 8 cm³. 24 cm³. 1000 ml.',
    mistakes: 'Nu calcula volumul cubului ca 4 · a: aceea ar fi o sumă de muchii, nu volumul. Nu înmulți doar două laturi ale cutiei. Nu amesteca litri cu centimetri cubi fără transformare: 1 l = 1000 cm³, nu 1000 dm³.',
    tryThis: 'Umple un pahar și spune că volumul apei este o capacitate. Scrie 1 l = 1 dm³ = 1000 ml și dă un exemplu de obiect al cărui volum l-ai putea afla prin diferența de nivel.',
    recap: 'Unitatea de volum este un cub. Cubul are volumul a^3. Cutia are volumul a · b · c. La fiecare pas, factorul este 1000. Litrul măsoară lichide: 1 l = 1 dm³ = 1000 ml = 1000 cm³.'
  }),

  lesson('recap-unitati', 'Recapitulare: geometrie și unități', {
    figure: 'cube',
    formulas: ['Lungime: factor 10', 'Arie: factor 100', 'Volum: factor 1000'],
    theory: 'Geometria de anul acesta pornește de la punct, dreaptă și plan. Construiești semidrepte, segmente și unghiuri. Măsori lungimi cu rigla și unghiuri cu raportorul. Recunoști drepte paralele sau concurente, segmente și unghiuri congruente, mijlocul și axa de simetrie.\n\nLungimile se transformă cu puteri ale lui 10. Ariile, cu puteri ale lui 100. Volumele, cu puteri ale lui 1000. Perimetrul adună laturile. Aria dreptunghiului înmulțește lungimea cu lățimea. Volumul cutiei înmulțește trei dimensiuni. Litrul este pentru capacitate: 1 l = 1 dm³.',
    example: 'Un dreptunghi 10 cm pe 2 cm are perimetrul 24 cm și aria 20 cm². Un cub cu latura de 10 cm are volumul 1000 cm³, adică 1 dm³, adică 1 l. Un unghi de 30° este ascuțit și congruent cu orice alt unghi de 30°.',
    practice: '1. 5 m câți centimetri sunt? 2. Aria pătratului cu latura de 3 cm. 3. 2 dm³ câți litri sunt?\n\nRăspunsuri: 500 cm. 9 cm². 2 l.',
    mistakes: 'Nu folosi același factor 10 la arie și la volum. Aria urcă cu 100. Volumul urcă cu 1000. Nu lăsa unitățile amestecate într-o sumă.',
    tryThis: 'Fă un tabel cu trei rânduri: lungime, arie, volum. Pe fiecare rând scrie unitatea principală, factorul de transformare și un exemplu al tău.',
    recap: 'Desenezi, numești și măsori. Congruența este suprapunerea. Simetria este îndoirea. Lungimea, aria și volumul au unități diferite și factori diferiți: 10, 100 și 1000. Litrul este un decimetru cub.'
  })
];

module.exports = { GEOMETRIE_LESSONS };
