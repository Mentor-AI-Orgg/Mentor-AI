'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f) {
  return romanaLesson(f);
}

module.exports = {
  id: 'cartea',
  title: 'Cartea, sursă de cunoaștere și legătură între generații',
  inOwnWords: 'Unitatea pune cartea între citit, vorbire și scris. Înveți cum se grupează cuvintele, cum se scriu literele, silaba și accentul, apoi cum se aleg vorbele apropiate sau opuse. La urmă vin notița, paragraful, proiectul și felul în care asculți un coleg. Regulile stau în lecții, cu o scenă pe care o poți relua.',
  toc: [
    'Cărțile, căi de cunoaștere și autocunoaștere. Carte românească de învățătură',
    'Câmpul lexical. Cuvinte-cheie',
    'Cuvântul, forma și sensul. Alfabetul limbii române',
    'Specificul limbii române în scriere',
    'Silaba. Tipuri de sunete. Accentul. Corespondența litere–sunete',
    'Sinonime și antonime',
    'Prezentarea textului. Scrisul de mână. Paragraful',
    'Etapele scrierii: generarea ideilor, planificare, scriere',
    'Tema. Detaliul. Dialogul. Empatia',
    'Recapitulare și evaluare'
  ],
  glossary: [
    {
      term: 'câmp lexical',
      meaning: 'Cuvinte înrudite ca înțeles. Dacă sunt multe, acolo este tema.'
    },
    {
      term: 'cuvânt-cheie',
      meaning: 'Vorba fără de care nu mai înțelegi despre ce este textul.'
    },
    {
      term: 'diacritice',
      meaning: 'Semne pe literă: căciulița (ă), virgula (ș, ț), circumflexul (â, î).'
    },
    {
      term: 'silabă',
      meaning: 'Ce spui dintr-o singură deschidere a gurii. În ea stă o singură vocală.'
    },
    {
      term: 'semivocală',
      meaning: 'e, i, o sau u care nu ține singură silaba, ci stă lângă o vocală.'
    },
    {
      term: 'accent',
      meaning: 'Silaba spusă mai puternic. Poate schimba sensul cuvântului.'
    },
    {
      term: 'sinonim',
      meaning: 'Altă formă, același înțeles. Contextul alege care se potrivește.'
    },
    {
      term: 'antonim',
      meaning: 'Alt cuvânt, cu sensul din partea opusă: bucurie / tristețe.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-carte',
      title: 'Harta unității despre carte',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Harta și ora',
        text: 'Cuprinsul îți arată popasurile din față. Ora de azi predă unul singur. Titlul doar zărit dinainte nu este încă exersat.'
      }],
      theory: [
        'Din volume afli cum este lumea și cum gândești tu. Cei care au trăit înainte ți-au lăsat ce au descoperit. Așa se țin generațiile, prin carte.',
        'Întâi lucrezi grupurile de vorbe, apoi forma cuvântului, lista de litere, tăietura în silabe și apăsarea. Vorbele cu sens apropiat vin după aceste popasuri, nu odată cu ele.',
        'Sunt opt competențe de urmărit pe parcurs. Întâi 1.1, alături de 1.3. Apoi 2.5. La mijloc stau 3.2 și, lângă ea, 3.3. La urmă vin 4.2, separat 4.3, iar la capăt 5.1.',
        'Niciuna nu se marchează din titlu. Fiecare cere o scenă și o scriere curată. O propoziție ruptă de ora aceea nu acoperă competența.',
        'Când ora este despre litere, exercițiul rămâne acolo. Un titlu doar anunțat, cum sunt vorbele apropiate, așteaptă altă dată. Cuprinsul dă ordinea. Ora face lucrul.',
        'Legătura care nu se rupe este cartea. Învățătura poate sta pe o foaie veche sau pe ecran, în altă vreme. Suportul se schimbă. Rostul de a păstra ce s-a aflat rămâne.',
        'La deschiderea unității notezi trei lucruri: popasul de acum, popasul de mai târziu și competența pe care o exersezi. Cuprinsul citit o dată nu înseamnă capitol încheiat.',
        'Un coleg poate crede că a lucrat apăsarea doar pentru că a văzut-o anunțată. Nu ajunge. Apăsarea se lucrează când îi vine rândul, pe un cuvânt, cu locul tare verificat.',
        'Scrierea curată se vede în semne puse corect și în fraze legate de scenă. Contextul se vede când răspunsul folosește datele orei, nu o vorbă fără faptă.'
      ].join('\n\n'),
      example: [
        'Ora de acum stă pe lista literelor, deci exercițiul nu sare la vorbele apropiate. Acelea rămân un popas de mai târziu, nu un titlu marcat azi.',
        'Aceeași învățătură poate trece de pe o foaie veche pe ecran. Cartea ține legătura, chiar dacă suportul și vremea sunt altele.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă pe cuprins vezi și silaba, și apăsarea, iar ora este despre litere, marchezi doar literele. Silaba așteaptă. Apăsarea la fel.'
      }],
      tryThis: [
        'Scrie două propoziții despre cuprins. În prima arată că el doar anunță traseul, iar vorbele cu sens apropiat rămân pentru mai târziu. Folosește lume, generații, câmp lexical, cuvânt, alfabet, silabă și accent.',
        'În a doua spune că ora de acum este alfabetul. Numește competențele în grupuri: 1.1 cu 1.3, apoi 2.5, apoi 3.2 cu 3.3, apoi 4.2, 4.3 și, separat, 5.1. Adaugă scena și scrierea curată.'
      ].join('\n\n'),
      keyPoints: [
        'Cuprinsul dă ordinea popasurilor. Ora de azi predă unul singur.',
        'Opt competențe cer o scenă și o scriere curată, nu un titlu doar zărit.',
        'Cartea ține generațiile legate: învățătura rămâne, suportul se poate schimba.'
      ]
    }),
    lesson({
      id: 'carte-lexic',
      title: 'Cuvântul-cheie și câmpul lexical',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Cheie și câmp',
        text: 'Cheia este vorba fără de care tema se rătăcește. Câmpul lexical strânge vorbe înrudite ca înțeles. Unde se adună multe, acolo stă subiectul.'
      }],
      theory: [
        'Ce știau oamenii a stat întâi pe piatră, apoi pe lut, apoi pe hârtie și, mai târziu, pe ecran. Suportul s-a tot schimbat. Nevoia a rămas: să nu se piardă învățătura.',
        'Scoți cheia și textul nu mai spune tema. O vorbă doar frumoasă, fără legătură cu subiectul, rămâne podoabă. Cheia te ajută și când cauți.',
        'Dacă tema este biblioteca, în câmp intră raftul și fișa. Pe un afiș scurt, cheia este împrumutul. Fără acest cuvânt, afișul nu mai arată ce faci în sală.',
        'Câmpul lexical grupează vorbe de același fel. Pot fi păsări. Poate fi timpul. Pot fi rudele. Nu pui în aceeași listă lucruri care nu țin de un singur fel.',
        'Un text poate purta două câmpuri deodată, de pildă cartea și timpul. Rândunica stă cu vrabia. Lângă ele stă ciocănitoarea. Toate trei țin de păsări. Secolul stă cu epoca. Lângă ele stă mileniul. Toate trei țin de timp.',
        'Papirusul stă cu tiparul și cu ecranul: țin de carte. Raftul stă cu coperta și cu foaia: tot de carte. Vrabia pusă lângă secol înseamnă două liste, nu una.',
        'La o cultură străină grupezi la fel, dar pe alte teme: mâncarea, muzica, clădirile. Alegi un câmp, cum sunt hobby-ul, sportul sau simbolurile, și pui chei care anunță subiectul, nu o vorbă goală.',
        'Posterul este lucrarea făcută de tine. Unește textul cu imaginea. Faptele vin din mai multe discipline, fiindcă una singură nu dă diversitate. Un desen din care lipsește vorba temei nu ține loc de poster.',
        'Când subiectul este ciorba, cheia este chiar ciorba. Istoria îți dă o sărbătoare. Geografia îți dă o regiune. Desenul îți dă farfuria. Trei discipline rămân în câmpul mâncării.'
      ].join('\n\n'),
      example: [
        'Tema aleasă este biblioteca. Cheia afișului scurt este împrumutul. O vorbă doar frumoasă, fără legătură cu el, rămâne podoabă.',
        'Păsările stau într-o listă: rândunică, vrabie, ciocănitoare. Timpul stă în alta: secol, epocă, mileniu. La ciorbă, cheia este ciorba, cu sărbătoare, regiune și farfurie.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Papirusul, tiparul și ecranul formează lista cărții. Dacă strecori mileniul între ele, ai băgat timpul în alt câmp. Listele se țin despărțite.'
      }],
      tryThis: [
        'Fă planul unui poster despre mâncare, cu cheia ciorba. Spune cele trei discipline: de la istorie iei sărbătoarea, de la geografie iei regiunea, de la desen iei farfuria.',
        'Desparte lista cărții, cu papirus, tipar, ecran, raft, copertă și foaie, de lista timpului, cu secol, epocă și mileniu. Scrie o propoziție despre bibliotecă și subliniază împrumutul.'
      ].join('\n\n'),
      keyPoints: [
        'Fără cheie, tema se pierde. O vorbă doar frumoasă rămâne podoabă.',
        'Câmpul lexical strânge vorbe de un singur fel. Vrabia și secolul nu stau împreună.',
        'Posterul unește text, imagine și fapte din mai multe discipline. Desenul fără cheie nu ajunge.'
      ]
    }),
    lesson({
      id: 'stea-intrebari',
      title: 'Steaua de întrebări',
      kind: 'lectura',
      boxes: [{
        type: 'regula',
        title: 'Centru și raze',
        text: 'Tema stă în mijloc, iar întrebările stau în jur. Pui minimum patru. Un răspuns poate naște o întrebare nouă.'
      }],
      theory: [
        'Steaua este o schemă cu care explorezi tema. Cuvântul stă la mijloc. În jur nu pui definiții gata făcute, ci întrebări care deschid părți diferite.',
        'Întrebările bune încep cu ce și cu la ce. Urmează pentru cine, apoi cu cine. Mai departe vin cum, unde și când. La urmă stă de ce. Nu le lași pe toate goale.',
        'Unde îți cere un loc, nu o părere. De ce îți cere un motiv, nu o umplutură. Dacă răspunsul este doar că tema contează, steaua a rămas închisă.',
        'Ajung și patru raze, dacă sunt lucrate. Poți pune toate cele opt, când tema le suportă. O singură propoziție nu cuprinde părțile pe care le deschid razele.',
        'Din răspuns poate crește o întrebare nouă. Dacă spui că volumul păstrează o poveste, poți întreba pentru cine a fost scrisă povestea aceea. Tema se lărgește.',
        'Centrul poate fi cartea. La întrebarea la ce folosește, răspunsul pe larg este că păstrează o poveste. La unde o cauți acum, locul poate fi biblioteca sau ecranul.',
        'La de ce există, motivul este că oamenii nu au vrut să uite. Pentru cine se poate răspunde cu un cititor. Cu cine se poate răspunde cu un coleg, la o lectură împreună.',
        'Cum arată drumul: pe hârtie ori pe ecran. Când poate fi seara sau ora de la școală. Eticheta că tema contează nu dă nici loc, nici motiv.',
        'Schema nu se închide la prima frază. După patru răspunsuri, alegi unul și mai pui o întrebare. Așa nu rămâi la o etichetă.'
      ].join('\n\n'),
      example: [
        'În centru stă cartea. La ce folosește: ține o poveste. Unde o cauți acum: în bibliotecă sau pe ecran. De ce a apărut: ca oamenii să nu uite.',
        'Din răspunsul despre poveste pornește o întrebare nouă, anume pentru cine a fost scrisă. Eticheta că tema contează rămâne goală: nu are loc și nu are motiv.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă la unde răspunzi bibliotecă, întrebarea nouă poate fi când se deschide sala. Locul a deschis timpul. Steaua crește din răspuns, nu dintr-o etichetă.'
      }],
      tryThis: [
        'Desenează steaua cu cartea în mijloc. Pe raze pune ce, la ce, pentru cine și cu cine. Separat, adaugă cum, unde, când, de ce. La fiecare rază dă câte un răspuns.',
        'Pentru unde numești un loc. Pentru de ce numești un motiv. Din unul dintre răspunsuri fă o întrebare nouă. Nu te opri la eticheta că tema contează.'
      ].join('\n\n'),
      keyPoints: [
        'Tema stă în mijloc. În jur stau măcar patru întrebări.',
        'Locul răspunde la unde. Motivul răspunde la de ce. Eticheta că tema contează nu deschide steaua.',
        'Un răspuns poate naște o întrebare nouă, iar tema se împarte în mai multe părți.'
      ]
    }),
    lesson({
      id: 'lucru-grup',
      title: 'Roluri în grup',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Cinci roluri',
        text: 'Liderul ține echipa laolaltă. Administratorul pregătește materialele. Informaticianul păstrează sursele. Ilustratorul strânge imaginile. Cronometrul păzește minutele.'
      }],
      theory: [
        'Munca în grup are rost când fiecare poartă un rol limpede. Dacă rolul lipsește, se aude o singură voce, iar ceilalți așteaptă. Semnătura pusă la urmă nu ține loc de treabă.',
        'Liderul nu lucrează singur tot proiectul. El îl cheamă și pe colegul tăcut, ca grupul să rămână întreg. Fără întrebarea aceasta, tăcerea trece drept acord.',
        'Administratorul aduce materialele înainte de căutare. Informaticianul scrie de unde vine fiecare imagine, într-o listă ținută separat de textul lucrării.',
        'Ilustratorul leagă imaginile de idee. Nu le pune doar ca să umple foaia. Cronometrul oprește căutarea la timp, ca să rămână minute și pentru scris.',
        'Se vorbește pe rând. Nu se vorbește peste coleg. Cine are o idee așteaptă pauza celuilalt. Doi care pornesc odată nu se mai aud.',
        'Un refuz se spune politicos și vine cu un motiv. Poți spune că nu iei imaginea aceea, fiindcă nu ține de axa cărții. Un nu scurt, fără motiv, închide discuția.',
        'Nu ajunge ca un singur elev să ducă toată treaba, iar restul doar să iscălească. Fiecare rol lasă o urmă: o listă, o imagine, un timp păzit sau o întrebare pusă.',
        'Trei colegi pot construi axa cărții, din lut până la ecran. Cronometrul taie căutarea. Liderul îl cheamă pe cel tăcut. Informaticianul trece sursa imaginii în lista separată.',
        'Lista de surse nu se amestecă în textul de pe axă. Cine citește lucrarea trebuie să vadă și ideea, și locul din care a venit imaginea.'
      ].join('\n\n'),
      example: [
        'Trei colegi construiesc axa, din lut până la ecran. Cronometrul oprește căutarea când minutele s-au terminat. Liderul îi cere părerea colegului care a tăcut.',
        'Informaticianul trece originea imaginii în lista ținută separat. Dacă unul scrie totul și ceilalți doar iscălesc, rolurile nu au fost ținute.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Ilustratorul aduce o imagine de pe ecran. Informaticianul o refuză politicos: nu are sursă. Imaginea intră abia după ce sursa stă în listă.'
      }],
      tryThis: [
        'Scrie cinci propoziții despre un proiect cu axa cărții, din lut până la ecran. Folosește lider, administrator, informatician, ilustrator și cronometru.',
        'Arată vorbirea pe rând, refuzul politicos cu motiv și lista de surse ținută separat. Arată și că iscălitura fără muncă nu ține loc de rol.'
      ].join('\n\n'),
      keyPoints: [
        'Fiecare coleg poartă un rol: lider, administrator, informatician, ilustrator sau cronometru.',
        'Se vorbește pe rând. Refuzul este politicos și are un motiv. Sursele stau într-o listă aparte.',
        'Un elev care face totul, iar restul doar iscălește, nu ține rolurile.'
      ]
    }),
    lesson({
      id: 'cuvant-alfabet',
      title: 'Alfabetul și literele împrumutate',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Formă și ordine',
        text: 'Cuvântul are un sens și o formă: sunete la vorbire, litere la scris. Alfabetul înșiră literele într-o ordine stabilă, aceeași pe care o urmezi în dicționar.'
      }],
      theory: [
        'Lista românească numără 31 de litere. Ea coboară din alfabetul latin. În dicționar nu răsfoiești la întâmplare. Mergi după ordinea literelor, de la capătul de început spre final.',
        'R este așezat înaintea lui V. De aceea roman apare înaintea lui viitor. Dacă răsfoiești invers, pierzi cuvântul, chiar dacă îl știi pe de rost.',
        'Carte și book trimit la același obiect, dar cu alte litere. Sensul se caută în dicționar. Litera se verifică la forma corectă, nu după cum îți sună.',
        'Chirilica este alfabetul slav de demult, cel cu care s-au scris primele volume românești. A rămas scrierea oficială până la anul 1860. După aceea au intrat literele latine folosite azi.',
        'O cronică veche poate purta semne pe care nu le cunoști și totuși să fie românească. O foaie din alte veacuri poate trece la alt alfabet și totuși să rămână românească. Acum scriem cu litere latine.',
        'În alfabet intră și k, și w, și q, și y. Le vezi mai ales la împrumuturi și la nume, cum sunt kilometrul, kilogramul și wattul.',
        'Nu le schimbi după ureche, când norma le păstrează. La kilogram stă k, nu c. La watt rămâne w. Altfel forma nu mai este cea din dicționar și cuvântul poate să nu mai fie găsit.',
        'Litera nu se confundă cu diacritica. Diacritica este semnul pus deasupra sau dedesubt. Dacă înlocuiești k cu c numai fiindcă așa auzi, ai schimbat forma, nu ai adăugat un semn.'
      ].join('\n\n'),
      example: [
        'Ca să găsești roman într-un dicționar tipărit, urmezi ordinea. Pentru că R stă înaintea lui V, roman vine înaintea lui viitor.',
        'Kilogramul își păstrează k. Wattul își păstrează w. Pusă în chirilică, aceeași idee arată ca un rând necunoscut, până recunoști semnele. Totuși limba poate fi româna. Până la 1860, scrierea oficială a fost chirilica.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Kilometrul se scrie cu k, la fel ca kilogramul. Dacă pui c în locul lui k, forma iese din normă și dicționarul nu te mai duce la cuvânt.'
      }],
      practice: [
        '1) Cât de lung este alfabetul românesc și din ce alfabet coboară?',
        '2) În dicționar, cine stă înainte, roman sau viitor, și din ce motiv?',
        '3) Până la ce an a fost chirilica scriere oficială și ce litere au urmat?',
        '4) Variante pentru kilogram și watt: a) cilogram și vat; b) kilogram și vat; c) kilogram și watt. Ce se bifează?'
      ].join('\n\n'),
      answers: [
        'Numără 31 de litere și coboară din alfabetul latin.',
        'Roman stă înaintea lui viitor, fiindcă R este așezat înaintea lui V.',
        'Până la anul 1860. După aceea au intrat literele latine.',
        'se bifează c'
      ],
      mistakes: 'Nu înlocui k și w după ureche. La kilogram nu pui c, iar watt nu rămâne fără w. Semnele chirilice nu înseamnă automat altă limbă. Litera nu este totuna cu diacritica.',
      tryThis: [
        'Ordonează cinci cuvinte, cu roman înaintea lui viitor, ca să arăți că R îl precede pe V.',
        'Scrie propoziții despre cele 31 de litere, despre originea latină, despre chirilică și despre anul 1860. Mai scrie kilometru, kilogram și watt, cu k și cu w păstrate, și folosește q și y într-un nume sau într-un împrumut.'
      ].join('\n\n'),
      keyPoints: [
        'Alfabetul românesc numără 31 de litere și coboară din cel latin. Dicționarul se răsfoiește în ordinea lor.',
        'Roman apare înaintea lui viitor, fiindcă R stă înaintea lui V. Chirilica a fost oficială până la 1860.',
        'Kilogramul păstrează k, wattul păstrează w. Litera nu se confundă cu diacritica.'
      ]
    }),
    lesson({
      id: 'diacritice',
      title: 'Diacriticele și scrierea lui î',
      kind: 'limba',
      boxes: [{
        type: 'regula',
        title: 'Trei semne',
        text: 'Pe ă stă căciulița. Pe ș și pe ț stă virgula. Pe â și pe î stă accentul circumflex. Semnele se scriu mereu: schimbă sunetul și pot schimba sensul.'
      }],
      theory: [
        'Diacritica este semnul așezat pe literă. Fără el, vorba poate însemna altceva, iar celălalt poate râde tocmai fiindcă sensul s-a mutat. Nu le rezervi pentru momentele în care ți se par decorative.',
        'Masă, scrisă cu căciuliță, nu este vorba masa. Român, scris cu accent circumflex, nu spune ce spune roman. O literă lăsată fără semn poate muta cuvântul.',
        'Sunetul î se notează cu î la începutul cuvântului și la capătul lui. Așa stau în și coborî. În interior, când nu urmează unui prefix, se notează cu â. Modelele sunt adânc, apoi român.',
        'Când rădăcina pornește cu î și primește un prefix, î rămâne î. Așa se scriu neîngrijit, apoi reîncepe, apoi subînțeles. După ne- nu pui â, pentru că rădăcina este îngrijit.',
        'Când după prefixul în- urmează b sau p, în loc de n se scrie m. La împăduri urmează p, deci stă m. La îmbătrâni urmează b, deci stă tot m. Forma înpădurire se înlocuiește cu împădurire.',
        'Nu adăuga un i numai fiindcă așa auzi în grabă. Forma bună a lui era nu este iera. Forma bună a lui epocă nu este iepocă. Le păstrezi corecte pe toate, nu doar pe prima din frază.',
        'Căciulița, virgula și accentul circumflex sunt semne, nu litere noi. Le vezi pe ă, pe ș, pe ț, pe â și pe î. Apoi verifici și locul lui î față de prefix.'
      ].join('\n\n'),
      example: [
        'Scrii Acolo era altă epocă, nu iera și nu iepocă. Împădurirea ia m, fiindcă după prefix urmează p. Îmbătrâni ia m, fiindcă urmează b.',
        'Adânc se scrie cu â: sunetul este în mijloc și nu stă după un prefix. Neîngrijit păstrează î după ne-, cum fac reîncepe și subînțeles. Masă nu este masa. Român nu este roman.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'La coborî, î stă la capăt, deci rămâne î. La adânc, sunetul este în interior și nu urmează unui prefix, deci se notează â. Cele două locuri nu se tratează la fel.'
      }],
      practice: [
        '1) Ce semn stă pe ă? Ce semn stă pe ș și pe ț? Ce semn stă pe â și pe î?',
        '2) Cum notezi sunetul î în în, în coborî, în adânc și în neîngrijit?',
        '3) De ce împădurire se scrie cu m, iar înpădurire nu este forma bună? Ce se întâmplă și la îmbătrâni?',
        '4) Corectează iera și iepocă. Ce se schimbă la sens între masă și masa?'
      ].join('\n\n'),
      answers: [
        'Pe ă stă căciulița. Pe ș și pe ț stă virgula. Pe â și pe î stă accentul circumflex.',
        'î la început, în în; î la capăt, în coborî; â în interior, în adânc; î după prefix, în neîngrijit.',
        'După prefix urmează p, deci se scrie m: împădurire. La îmbătrâni urmează b, deci este tot m.',
        'Formele bune sunt era și epocă. Masă, cu căciuliță, nu este aceeași vorbă cu masa.'
      ],
      mistakes: 'După ne- nu pui â dacă rădăcina începe cu î: forma este neîngrijit, nu neângrijit. Înainte de b sau de p nu lași n în prefixul în-. Nu lipi un i de era și nici de epocă.',
      tryThis: [
        'Scrie propoziții cu în, cu coborî, cu adânc, cu român, cu neîngrijit, cu reîncepe, cu subînțeles, cu împăduri, cu îmbătrâni și cu împădurire.',
        'Mai scrie trei enunțuri corecte, unul cu era, unul cu epocă și unul cu împădurire. Arată cum diferă masă de masa și român de roman. Spune numele celor trei semne: căciuliță, virgulă, circumflex.'
      ].join('\n\n'),
      keyPoints: [
        'Căciulița, virgula și accentul circumflex schimbă sunetul. Masă diferă de masa, iar român diferă de roman.',
        'Î se scrie la capete și după un prefix pus pe o rădăcină cu î. În interior, fără prefix, se scrie â.',
        'Înainte de b sau de p, prefixul în- ia litera m. Era și epocă nu primesc un i în plus.'
      ]
    }),
    lesson({
      id: 'silaba',
      title: 'Silaba și semivocala',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'O deschidere',
        text: 'O silabă se rostește dintr-o singură deschidere a gurii. În ea stă o vocală, numai una. Literele nu se numesc silabe.'
      }],
      theory: [
        'Vocalele se pot rosti singure. Șirul lor începe cu a și cu ă. Urmează â și î. La final stau e, i, o și u. Consoanele au nevoie de o vocală ca să încapă într-o silabă.',
        'Printre consoane stau b și c, apoi d, f și g. Mai departe vin h, j, k, l și m. Urmează n, p, r, s și ș. Încheie t, ț, v și z. Numărătoarea silabelor urmărește vocalele care le țin, nu toate semnele de pe rând.',
        'Acasă se taie a-ca-să. Sunt trei deschideri, deci trei silabe. Le țin a, apoi din nou a, apoi ă. Restul literelor nu intră la numărătoarea aceasta.',
        'Consoana b nu deschide singură o silabă, fiindcă îi trebuie o vocală. Dacă numeri literele și spui că ai tot atâtea silabe, proba este greșită.',
        'Semivocala este sunetul lui e, al lui i, al lui o sau al lui u când nu poartă singure silaba, ci se sprijină pe vocala de lângă ele. Când chiar ele poartă silaba, aceleași litere redevin vocale.',
        'Le recunoști ușor când după ele vin a, ă sau î, cum vezi în seară. Semivocala sună mai scurt, vocala sună mai lung.',
        'Nu orice e și nu orice i poartă silaba. La tei, t este consoană, iar e ține silaba. I rămâne semivocală și nu deschide o silabă nouă.',
        'În zeu, e ține silaba, deci intră la vocale. Nu așeza i din tei în grupa lui e din zeu. Una nu ține silaba. Cealaltă o ține.'
      ].join('\n\n'),
      example: [
        'Tăietura lui acasă este a-ca-să: trei silabe, ținute de a, de a și de ă. Consoana b nu deschide gura singură într-o silabă.',
        'La tei, e ține silaba, iar i este semivocală. La zeu, e ține silaba și sună mai lung. La seară, semivocala sună mai scurt decât vocala de lângă ea.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Carte are vocalele a și e, deci două silabe: car-te. Consoanele nu se numără ca silabe. Tei rămâne o singură silabă, fiindcă i nu deschide una nouă.'
      }],
      practice: [
        '1) Taie acasă în silabe. Câte sunt și ce vocale le țin?',
        '2) În tei, ce rol au t, e și i?',
        '3) În zeu, ce rol are e? De ce nu stă în aceeași grupă cu i din tei?',
        '4) De ce consoana b nu ține singură o silabă? În seară, care sunet este mai scurt, semivocala sau vocala?'
      ].join('\n\n'),
      answers: [
        'a-ca-să, trei silabe, ținute de a, de a și de ă.',
        't este consoană, e este vocală, i este semivocală.',
        'e poartă silaba și este vocală. i din tei nu ține singur o silabă.',
        'Îi trebuie o vocală. În seară, semivocala sună mai scurt.'
      ],
      mistakes: 'Nu numi literele silabe și nu număra toate semnele din cuvânt. Nu așeza i din tei lângă e din zeu, ca și cum ar avea același rol. Semivocala sună mai scurt, vocala mai lung.',
      tryThis: [
        'Taie în silabe acasă și carte. Spune, în două enunțuri, ce vocale poartă fiecare tăietură.',
        'Apoi descrie rolurile din tei și din zeu. Folosește tăietura a-ca-să, cuvântul seară și termenii vocală, semivocală, consoană, deschidere.'
      ].join('\n\n'),
      keyPoints: [
        'Silaba se rostește dintr-o deschidere și ține o singură vocală. Consoanele au nevoie de vocală.',
        'Acasă se taie a-ca-să. Se numără vocalele care țin silaba, nu toate literele.',
        'e, i, o și u sunt semivocale când stau lângă altă vocală. În zeu, e poartă silaba. În tei, i nu o poartă.'
      ]
    }),
    lesson({
      id: 'accent',
      title: 'Accentul, litera și sunetul',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Apăsarea',
        text: 'Accentul înseamnă că o silabă se spune mai tare sau mai sus. Poate muta sensul. Ține de limba standard și, la îndoială, se caută în DOOM.'
      }],
      theory: [
        'Limba standard este forma comună, ținută de norme. Accentul intră în această formă. La îndoială, deschizi DOOM. Nu lași apăsarea unde îți vine.',
        'Aceleași litere, cu apăsarea mutată, pot fi alt cuvânt. În carte, silaba tare este car. Nu muți apăsarea pe te numai fiindcă așa auzi în grabă.',
        'Enunțul Maria e veselă poate însemna că ea este voioasă, dacă apeși începutul. Dacă apeși mijlocul, veselă poate numi vasele de pe masă. Sensul îl decide silaba tare.',
        'De obicei, unui sunet îi corespunde o literă. Nu este o regulă fără excepții. Litera x redă două sunete: pe cs, cum auzi în fix, sau pe gz, cum auzi în exemplu.',
        'Un sunet poate fi notat cu litere diferite. În casă, sunetul k ia litera c. În karate, același sunet ia litera k. Sunetul v se notează v sau w. Nu repari un cuvânt după celălalt doar fiindcă încep la fel.',
        'Fix are 3 litere, dar 4 sunete, fiindcă x înseamnă cs. Nu egala numărul literelor cu numărul sunetelor. În exemplu, x înseamnă gz: iarăși două sunete într-o literă.',
        'Casă și karate încep cu același sunet, însă karate începe cu k, nu cu c. Dacă îi schimbi litera de la început, cuvântul nu mai este cel din normă.'
      ].join('\n\n'),
      example: [
        'Apeși începutul lui veselă și Maria este voioasă. Apeși mijlocul și pe masă stau vasele. În carte, silaba tare este car. Forma nesigură se caută în DOOM.',
        'Fix are 3 litere și 4 sunete, fiindcă x înseamnă cs. În exemplu, x înseamnă gz. Karate își păstrează k la început, chiar dacă sunetul seamănă cu cel din casă. Sunetul v se notează și v, și w.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'În fix, x nu este un singur sunet. De aceea sunetele trec peste litere. Aceeași observație nu te pune să scrii karate cu c.'
      }],
      practice: [
        '1) În carte, care silabă este cea tare?',
        '2) La Maria e veselă, ce sens apare dacă apeși începutul și ce sens apare dacă apeși mijlocul?',
        '3) Câte litere și câte sunete are fix? Cum se aude x în fix și cum se aude în exemplu?',
        '4) Casă și karate încep cu același sunet. Ce literă păstrează karate la început? Unde verifici o apăsare nesigură?'
      ].join('\n\n'),
      answers: [
        'Silaba tare este car.',
        'La început, voioasă. La mijloc, vasele de pe masă.',
        '3 litere și 4 sunete. În fix, x înseamnă cs. În exemplu, x înseamnă gz.',
        'Karate păstrează k. Apăsarea nesigură se verifică în DOOM.'
      ],
      mistakes: 'Nu pune accentul unde îți vine și nu socoti literele drept sunete. X din fix nu este un singur sunet. Nu schimba k din karate în c doar fiindcă sunetul seamănă cu cel din casă.',
      tryThis: [
        'Scrie două propoziții cu veselă. Una arată persoana voioasă și spune că apăsarea cade la început. Alta arată vasele de pe masă și spune că apăsarea cade la mijloc.',
        'Apoi scrie propoziții cu fix, cu exemplu, cu casă și cu karate. Folosește DOOM, silaba car, grupurile cs și gz, numerele 3 litere și 4 sunete, plus k și w. Arată că litera de la început rămâne a fiecărui cuvânt.'
      ].join('\n\n'),
      keyPoints: [
        'Accentul poate muta sensul, ca la veselă, și se caută în DOOM, fiindcă ține de limba standard.',
        'În carte, silaba tare este car. Aceleași litere, cu altă apăsare, pot fi alt cuvânt.',
        'Litera x redă cs sau gz. Fix are 3 litere și 4 sunete. Sunetul k ia c în casă și k în karate.'
      ]
    }),
    lesson({
      id: 'litera-ajutatoare',
      title: 'Litera care doar ajută',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Literă ajutătoare',
        text: 'Unele litere nu se aud ca ele însele. Ele ajută pronunția. Litera din stânga sau din dreapta decide dacă semnul se aude sau doar ajută.'
      }],
      theory: [
        'Nu orice semn dintr-un grup se citește separat. Uneori stă acolo ca să schimbe sunetul vecinului. De aceea te uiți la litera de alături înainte să pronunți.',
        'În grupurile che și chi, ca și în ghe și ghi, h nu se aude cum se aude h în haz. Dacă despici che în trei bucăți, c apoi h apoi e, ai citit ceva ce gura nu face.',
        'În hrană, h este consoană și se rostește. Același semn are alt rol în chemare: acolo ajută pronunția și nu se rostește ca în hrană.',
        'În grupurile ce și ci, ca și în ge și gi, e ori i rămâne marcă pentru consoana moale, nu o vocală plină. Vecinul îți spune dacă vocala se aude întreagă.',
        'În geme, e pus după g mută sunetul lui g. Acest g nu este g-ul din gaz, unde se aude plin. Aici e doar ajută, nu se citește ca o vocală lungă pusă după un g tare.',
        'În che, h este semn, nu un h rostit aparte. Proba este simplă. Dacă îl auzi ca în haz, l-ai citit greșit. Dacă grupul sună dintr-o bucată, h și-a făcut rolul de ajutor.',
        'La un item cu trei variante despre h din che, varianta bună spune că h ajută pronunția și nu se citește separat. Acolo se bifează c.'
      ].join('\n\n'),
      example: [
        'În chemare, h nu se rostește ca în hrană, fiindcă are rol de ajutor. Hrană, în schimb, îl are pe h drept consoană rostită, la fel ca în haz.',
        'În geme, e de după g mută sunetul lui g. În gaz, g se aude plin. La variantele despre h din che, se bifează c: h ajută și nu se citește separat.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'În ghi, h nu se aude cum se aude în haz. Grupul se citește dintr-o bucată. Dacă adaugi un h separat, ai citit o consoană care în grupul acela este doar semn.'
      }],
      practice: [
        '1) În chemare, h se aude ca în hrană? Ce rol are acolo?',
        '2) În hrană, h este consoană sau semn ajutător? Cu ce h se compară?',
        '3) În geme, ce face e de după g, față de g din gaz?',
        '4) Variante pentru h din che: a) se citește ca h din haz; b) lipsește din cuvânt; c) ajută și nu se citește separat. Ce se bifează?'
      ].join('\n\n'),
      answers: [
        'Nu se aude ca în hrană. Ajută pronunția.',
        'Este consoană și se aude. Se compară cu h din haz.',
        'Schimbă sunetul lui g. În gaz, g se aude plin.',
        'se bifează c'
      ],
      mistakes: 'Nu citi che ca pe trei bucăți, c apoi h apoi e. Nu trata h din chemare ca pe h din hrană. În ge și în gi, e sau i pot fi marcă pentru consoana moale, nu vocală plină.',
      tryThis: [
        'Scrie patru propoziții, cu chemare, cu hrană, cu geme și cu gaz. Spune, pentru fiecare, dacă h ori e se rostește plin sau doar ajută.',
        'Adu și șirul che cu chi, apoi ghe cu ghi, apoi ce cu ci, apoi ge cu gi, împreună cu haz. La itemul cu trei variante despre h din che, arată că se bifează c.'
      ].join('\n\n'),
      keyPoints: [
        'Litera ajutătoare nu se aude ca ea însăși. Vecinul decide rolul.',
        'În che, în chi, în ghe și în ghi, h nu se rostește ca în haz. În hrană, h este consoană.',
        'În ce, în ci, în ge și în gi, e sau i pot marca o consoană moale. La variantele despre h din che, se bifează c.'
      ]
    }),
    lesson({
      id: 'sinonime',
      title: 'Sinonime și antonime',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Aproape și opus',
        text: 'Sinonimul are altă formă, dar același înțeles. Antonimul are altă formă și sens din partea opusă. Pe amândouă le alegi din frază, nu din capul unei liste.'
      }],
      theory: [
        'Fraza alege sinonimul. În au ridicat un zid, înlocuitorul este a construi, deci au clădit. În i-au ridicat pedeapsa, sensul este că au anulat-o. A construi nu mai încape acolo.',
        'Dacă spui frumos de patru ori, textul slăbește. Poți păstra ideea cu alte forme, ca vorbele să nu se calce. Alegi forma potrivită frazei, nu prima din listă.',
        'O pisică poate fi blândă. Poate avea mustăți lungi. Poate avea ochi limpezi. Trei detalii țin locul repetiției. Cititorul vede animalul, nu aude mereu aceeași vorbă.',
        'Antonimul este o vorbă diferită. Perechi lucrate aici sunt mare cu mic, bucurie cu tristețe, furie cu calm, speranță cu disperare. Îl verifici în frază, nu îl lipești mecanic.',
        'Nu merg se opune lui merg, însă nu este antonim. Este aceeași vorbă oprită cu nu, adică o negație. Antonimul trebuie să fie alt cuvânt, nu aceeași vorbă blocată.',
        'La emoții, perechea bucuriei este tristețea, nu furia. Furia își are perechea ei, calmul. Dacă amesteci perechile, opoziția nu mai este cea din frază.',
        'Urâtă schimbă frumusețea, nu lumina, deci nu stă în fața lui luminoasă. Pentru o cameră luminoasă, opusul care se potrivește este întunecoasă, fiindcă se schimbă lumina.',
        'O listă de sinonime nu se copiază la întâmplare în text. Întâi citești fraza, apoi alegi forma. La antonime faci la fel: verifici ce se opune, lumina sau frumusețea, bucuria sau furia.'
      ].join('\n\n'),
      example: [
        'La zidul din au ridicat un zid, înlocuitorul bun este a construi. La pedeapsa din i-au ridicat pedeapsa, sensul este anulare, deci a construi nu mai este bun.',
        'Pisica poate fi blândă, poate avea mustăți lungi și ochi limpezi, fără frumos repetat. Pentru o cameră luminoasă, opusul este întunecoasă, nu urâtă. Nu merg este negație, nu antonim pentru merg.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Bucuria nu se opune furiei. Perechea bucuriei este tristețea, iar perechea furiei este calmul. Două emoții tari nu sunt automat antonime.'
      }],
      practice: [
        '1) În au ridicat un zid, ce sinonim se potrivește? În i-au ridicat pedeapsa, ce sens are grupul?',
        '2) Cum descrii o pisică fără să repeți frumos? Dă trei înlocuiri.',
        '3) De ce nu merg nu este antonimul lui merg?',
        '4) Pentru o cameră luminoasă, opusul bun este urâtă sau întunecoasă? Bucuria stă în fața cui?'
      ].join('\n\n'),
      answers: [
        'a construi, deci au clădit. La pedeapsă, sensul este că au anulat-o.',
        'blândă, mustăți lungi, ochi limpezi.',
        'Este aceeași vorbă cu nu, deci este negație, nu un alt cuvânt.',
        'întunecoasă. Bucuria stă în fața tristeții.'
      ],
      mistakes: 'Nu lua primul sinonim din listă, fără să citești fraza. Nu numi negația antonim. Nu pune urâtă în fața lui luminoasă și nu pune furia în fața bucuriei.',
      tryThis: [
        'Scrie trei propoziții despre o pisică. În locul lui frumos repetat, folosește blândă, mustăți lungi și ochi limpezi.',
        'Scrie perechi cu mare și mic, cu bucurie și tristețe, cu furie și calm, cu speranță și disperare. Adaugă o propoziție cu zidul clădit și una cu pedeapsa anulată. Arată că nu merg este negație.'
      ].join('\n\n'),
      keyPoints: [
        'Sinonimele se aleg după frază. La zid merge a construi. La pedeapsă, sensul este anulare.',
        'Frumos repetat se înlocuiește cu detalii: blândă, mustăți lungi, ochi limpezi.',
        'Antonimul este alt cuvânt, cu sens opus. Negația nu este antonim. Luminoasă stă în fața lui întunecoasă.'
      ]
    }),
    lesson({
      id: 'notite',
      title: 'Notițele și paragraful',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'De recitit',
        text: 'Notița este o însemnare pe care o înțelegi și după șapte zile. Are titlu, spațiu liber, data sus în dreapta și cheile subliniate.'
      }],
      theory: [
        'Însemnările îți aparțin. Între titlu și rânduri lași un spațiu, ca să vezi unde începe textul. Data o așezi în colțul de sus din dreapta, despărțită de primul rând.',
        'Cheile se subliniază. Poți colora sau desena o schemă. Unele texte au doar paragrafe. Altele pun lângă vorbe un desen sau o hartă. Nu strânge totul grămadă, fără titlu și fără loc gol.',
        'Un paragraf ține o singură idee și se deschide cu alineat. Ideea nouă cere rând nou. Nu o continui pe rândul anterior.',
        'De ce s-a întâmplat stă în cauză. Ce a urmat stă în efect. Le poți despărți în două paragrafe sau le poți lega printr-o schemă. Lipite, fără alineat, ele ascund locul în care firul se schimbă.',
        'Poți intitula însemnarea Cauza și efectul. Copilul cere dulciuri fără oprire. Ce urmează: oamenii din casă obosesc. Săgeata dintre fapte este schema.',
        'Alt caz: cineva repetă toată ziua o singură vorbă. Ce urmează: cei de lângă el nu o mai aud. Fiecare fapt primește paragraful lui.',
        'Schema nu șterge titlul. Poți avea săgeată și, separat, două paragrafe. Săgeata arată legătura. Alineatul arată schimbarea de idee.',
        'După o săptămână trebuie să recunoști însemnarea fără ajutor. Data, titlul, spațiul și cheile subliniate sunt modul în care te regăsești, nu o podoabă.'
      ].join('\n\n'),
      example: [
        'Titlul ales este Cauza și efectul. Data stă în colțul de sus, la dreapta, cu spațiu până la text. Copilul cere dulciuri fără oprire. Oamenii din casă obosesc. Între fapte pui o săgeată.',
        'Ideile stau separat, fiecare cu alineat. La fel, o vorbă repetată toată ziua nu mai este auzită de cei de lângă. Fiecare fapt are bucata lui.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă lipești cauza și urmarea pe același rând, săgeata nu mai ajută. Cititorul nu vede schimbarea. Alineatul nou desparte cererea de dulciuri de oboseala celor din casă.'
      }],
      tryThis: [
        'Notează cu titlul Cauza și efectul. Pune data în colțul din dreapta sus, lasă spațiu sub titlu și subliniază cheile. Poți colora sau desena.',
        'Deschide două paragrafe. În primul, cauza: un copil cere dulciuri fără oprire. În al doilea, urmarea: oamenii din casă obosesc. Leagă-le cu o săgeată. Mai adaugă că o vorbă repetată o zi întreagă a încetat să mai fie auzită.'
      ].join('\n\n'),
      keyPoints: [
        'Notița se înțelege și după șapte zile: titlu, spațiu liber, data sus în dreapta, chei subliniate.',
        'O idee stă într-un paragraf și primește alineat propriu. Blocul fără aer amestecă firul.',
        'Cauza arată motivul. Efectul arată urmarea. Săgeata le leagă, fără să le pună pe același rând.'
      ]
    }),
    lesson({
      id: 'proiect',
      title: 'Proiectul și cum îl notezi',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Înainte de scris',
        text: 'Proiectul se construiește pas cu pas, de la o temă aleasă de tine. Întâi întrebi, apoi îngustezi, afli termenul și abia după aceea alegi forma.'
      }],
      theory: [
        'Pui pe hârtie măcar două întrebări de documentare. Apoi strângi tema la o expresie, la o credință sau la un desen. Afli când trebuie predată lucrarea. Planul vine după termen, nu înainte.',
        'Lucrarea poate fi compunere, prezentare sau poster. Sursele pot fi cărți de școală, enciclopedii sau alte volume. Nu pornești scrisul înainte să știi ce formă ți se cere.',
        'Tema largă poate fi animalele. Poți întreba de ce unor oameni le e teamă de pisica neagră și cum o privesc alte culturi. Când termenul este scurt, produsul este un poster.',
        'Te notezi singur, cu un plafon de 100 de puncte și cu șapte criterii. O structură dintr-o bucată valorează 10. O temă cu nuanțe valorează 20. Felul în care arată foaia valorează 10.',
        'Sursele de încredere valorează 10. Anexa în care se văd sursele valorează 20. Felul în care legi textul de imagine valorează 10. Tema și anexa cântăresc cel mai greu.',
        'La scriere iei 20 de puncte dacă greșelile sunt mai puține de patru. Dacă treci de patru, iei 10. Dacă treci de opt, iei 5. La cinci greșeli nu mai iei 20, ci 10.',
        'Un colaj frumos, care nu arată sursa informației, pierde anexa, adică 20 de puncte. Desenul nu acoperă lipsa listei.',
        'Întrebările despre pisica neagră strâng tema largă a animalelor. Dacă termenul este scurt, alegi posterul. Nu pornești o compunere lungă fără să știi forma.',
        'Punctele se adună după cele șapte criterii și nu trec de 100. Înainte de predare verifici structura, nuanța, foaia, sursele, anexa, legătura dintre text și imagine și numărul greșelilor.'
      ].join('\n\n'),
      example: [
        'Tema largă este animalele. Întrebi de ce unor oameni le e teamă de pisica neagră și cum o privesc alte culturi. Apoi alegi un poster, fiindcă termenul este scurt.',
        'Ai un poster limpede, însă lista de surse lipsește, deci anexa cade: 20 de puncte. Cu cinci greșeli la scris iei 10, nu 20. Sub patru greșeli iei 20. Peste opt iei 5.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă tema rămâne doar animalele, fără o întrebare îngustă, nuanța lipsește. Cele 20 de puncte ale temei nu se iau pe un titlu larg, ci pe o credință, o expresie sau un desen ales.'
      }],
      tryThis: [
        'Alege o temă pe placul tău. Poți porni de la animale. Formulează două întrebări: de ce le e teamă unora de pisica neagră și cum o privesc alte culturi. Strânge tema la o expresie, la o credință sau la un desen.',
        'Notează termenul, apoi un plan scurt pentru poster, compunere sau prezentare. Numește sursele. Treci cele șapte criterii, cu punctele 10, 20, 10, 10, 20 și 10, plus scrierea: 20 dacă greșelile sunt sub patru, 10 dacă treci de patru, 5 dacă treci de opt.'
      ].join('\n\n'),
      keyPoints: [
        'Proiectul pornește de la întrebări, se îngustează, așteaptă termenul și abia apoi primește o formă.',
        'Te notezi cu cel mult 100 de puncte, împărțite pe șapte criterii. Tema cu nuanțe și anexa valorează câte 20.',
        'Dacă lipsește lista de surse, pierzi 20 de puncte. Cu cinci greșeli la scris iei 10, nu 20.'
      ]
    }),
    lesson({
      id: 'empatie',
      title: 'Tema, empatia și dialogul atent',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Trei unelte',
        text: 'Tema se spune scurt, printr-un substantiv. Detaliul o face de crezut prin gest, prin obiect sau prin loc. Empatia înseamnă să înțelegi dorința celuilalt, chiar dacă nu ești de acord cu tot.'
      }],
      theory: [
        'Tema este ideea din centru, spusă în linii mari. O poți numi călătorie, copilărie sau școală. Un adjectiv lung nu ține locul substantivului. Cititorul trebuie să poată rosti tema într-un cuvânt.',
        'Detaliul este un gest văzut. Spui că a fost frumos, dar fără o faptă, și detaliul lipsește. Spui că erai emoționat, fără obiect și fără loc, și detaliul rămâne gol.',
        'Prin empatie pricepi ce gândește și ce își dorește celălalt și te pui în locul lui. Poți înțelege și fără să accepți tot ce spune.',
        'În dialogul atent ești, pe rând, cel care vorbește și cel care ascultă. Vorbitorul spune limpede, rămâne pe temă, ține o voce potrivită, cât să fie auzit și nu cât să deranjeze, și îl cheamă și pe celălalt.',
        'Ascultătorul îl privește, nu îl taie și nu pornește odată cu el. Dacă nu a priceput, cere o lămurire. Doi care vorbesc în același timp nu fac un dialog atent.',
        'Încap și patru replici. Ioana anunță tema copilăriei și spune că ghiozdanul îi lovea genunchiul. Apoi explică de ce i-a plăcut un personaj și tace.',
        'Andrei o privește și, după ce ea a terminat, o întreabă ce anume i s-a părut grijuliu. El vrea să scrie, nu doar să asculte. Vorbește la rândul lui, cu o voce doar cât să se audă.',
        'Din scenă faci trei pași, în propoziții separate. Întâi spui ce se povestește. Apoi spui ce imagine vezi. La urmă spui ce ai face tu și legi fapta prin pentru că.',
        'La școală repeți pașii pe textul deschis în fața ta. Nu sari la părere înainte să spui ce se vede. Lămurirea vine după ce celălalt a tăcut, nu peste vorbele lui.'
      ].join('\n\n'),
      example: [
        'Ce se povestește: ghiozdanul îi lovea genunchiul, Ioana tace, iar Andrei, după pauză, o întreabă ce anume i s-a părut grijuliu.',
        'Ce vezi: Ioana cu ghiozdanul la genunchi și Andrei alături. Eu aș aștepta puțin, apoi aș vorbi încet, pentru că Ioana tace, iar Andrei o privește.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Eram emoționat, fără gest, rămâne gol. Ghiozdanul care bate în genunchi este detaliu, fiindcă se văd un obiect și o mișcare. Tema rămâne copilăria, spusă printr-un substantiv.'
      }],
      tryThis: [
        'Matei spune că tema lui este școala și pune creionul pe bancă. Vorbește limpede, rămâne pe temă, ține vocea cât să fie auzit și îl cheamă pe coleg. Colegul îl privește, nu îl taie și cere o lămurire.',
        'Cei doi nu pornesc odată. Matei pricepe că și colegul vrea să spună o dorință. Scrie trei propoziții: ce se povestește, ce vezi și ce ai face tu, legate prin pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Tema se spune printr-un substantiv. Detaliul este un gest, un obiect sau un loc, nu o vorbă goală.',
        'În dialogul atent se vorbește pe rând. Ascultătorul nu taie vorba și cere o lămurire dacă nu a priceput.',
        'Din scenă iei trei pași: ce se povestește, ce vezi și ce ai face, legate prin pentru că.'
      ]
    }),
    lesson({
      id: 'tiparita-digitala',
      title: 'Carte tipărită sau digitală',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Două suporturi',
        text: 'Volumul tipărit și volumul digital duc același text. Amândouă sunt cărți. Se schimbă suportul, nu faptul de a fi carte. Alegi după drum, nu după modă.'
      }],
      theory: [
        'Forma tipărită este un suport pentru text. Forma digitală este celălalt suport. Poți citi aceeași poveste în amândouă. Nu una este carte, iar cealaltă este altceva.',
        'Tipăritura nu are baterie. O poți dărui, o poți da cu împrumut și nu o ștergi printr-un clic. Limita ei este greutatea, când porți multe volume.',
        'Forma de pe ecran îți dă multe volume, cu greutate mică. Zece povești pot încăpea într-un e-reader. Limita ei este bateria: când se termină, cititul se oprește.',
        'Fiecare suport are un câștig și o limită. Nu există unul bun pentru orice clipă. Întrebarea este ce drum ai în față, nu ce formă este la modă.',
        'În tren, e-readerul ține zece povești fără să îngreuneze rucsacul. Acolo câștigul digital este limpede: multe volume, greutate mică. Riscul rămâne bateria.',
        'Seara, pe noptieră, foaia care foșnește și pe care o poți da mai departe este cea tipărită. O poți dărui a doua zi. Nu depinde de un clic și nu se stinge odată cu bateria.',
        'Dacă drumul este lung, ecranul te scapă de greutate. Dacă vrei să lași cartea în mâna cuiva, tipăritura se dăruiește mai simplu. Aceeași poveste poate sta în ambele.',
        'Moda nu alege în locul tău. Poți prefera ecranul luni și hârtia marți. Schimbarea nu scoate niciun suport din rândul cărților.',
        'Când compari, spui câștigul și limita fiecăruia. Tipăritura: fără baterie, se dăruiește, nu dispare printr-un clic. Ecranul: multe volume, greutate mică, baterie care se poate termina.'
      ].join('\n\n'),
      example: [
        'În tren, zece povești încap în e-reader. Este forma de pe ecran, cu multe volume și cu greutate mică. Se oprește dacă bateria se termină.',
        'Pe noptieră, foaia care foșnește și pe care o dai mai departe este tipăritura. Nu are baterie și o poți dărui. Alegi după drum, nu după modă. Amândouă sunt cărți.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Un cadou de pus în mână stă mai bine tipărit, fiindcă se dăruiește și nu se șterge printr-un clic. Pentru un drum cu multe titluri, e-readerul scade greutatea.'
      }],
      tryThis: [
        'Scrie trei propoziții în care pui față în față volumul tipărit și pe cel digital, o dată pentru drumul cu trenul și o dată pentru seara de acasă.',
        'Folosește, pe rând, trenul și e-readerul, cele zece povești, bateria, verbul a dărui, noptiera, clicul, greutatea și moda. Încheie spunând că drumul alege, iar amândouă rămân cărți.'
      ].join('\n\n'),
      keyPoints: [
        'Tipăritura și forma digitală duc același text. Amândouă sunt cărți. Se schimbă suportul.',
        'Tipăritura nu are baterie și se poate dărui. Nu dispare printr-un clic.',
        'Ecranul ține multe volume, cu greutate mică, dar bateria se poate termina. Alegerea ține de drum, nu de modă.'
      ]
    }),
    lesson({
      id: 'intrebare-deschisa',
      title: 'Întrebarea deschisă',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Răspuns pe larg',
        text: 'Întrebarea deschisă nu se închide prin da și nici prin nu. Poate începe cu ce, cu care, cu cum sau cu de ce. Întrebarea închisă se rezolvă prin da sau prin nu.'
      }],
      theory: [
        'De la o întrebare deschisă primești un răspuns dezvoltat, nu un semn din cap. Celălalt trebuie să spună un titlu, un motiv sau un fel de a citi. Da și nu nu ajung.',
        'Ce cere un lucru sau un titlu. Care cere o alegere dintre mai multe. Cum cere un fel. De ce cere un motiv. Toate patru deschid fraza, nu o închid.',
        'Îți place cartea se poate rezolva scurt, prin da sau prin nu, deci este închisă. Ce carte ai reciti îți dă un titlu, deci este deschisă.',
        'Când cauți un dar, întrebi ce anume l-a bucurat, nu doar dacă îi place lectura. Întrebarea despre plăcerea de a citi se poate închide cu un semn. Întrebarea despre ce i-a plăcut cere o amintire.',
        'Patru întrebări care așteaptă da sau nu nu sunt de ajuns pentru a-l cunoaște pe coleg. Poți afla că citește, că are o carte, că a primit un dar și că îi place, și tot să nu știi ce titlu i-ar prinde.',
        'Pentru dar, pui pe rând ce, care, cum și de ce. Ce carte ai reciti. Care scenă ți-a rămas. Cum citești seara. De ce ai relua titlul acela.',
        'Poți păstra și o întrebare închisă, ca să vezi contrastul: îi place să citească. Răspunsul da nu îți dă titlul. De aceea nu te oprești la ea.',
        'Un semn din cap răspunde la o întrebare închisă. Un titlu, un motiv și un fel de a citi răspund la întrebări deschise. Pentru cadou ai nevoie de al doilea fel.',
        'Dacă toate întrebările încep cu oare și așteaptă da sau nu, colegul rămâne necunoscut. Schimbă începutul. Ce, care, cum și de ce îl pun să povestească.'
      ].join('\n\n'),
      example: [
        'Îți place cartea primește da sau nu, deci este închisă. Ce carte ai reciti îți dă un titlu, deci este deschisă.',
        'Care, cum și de ce deschid, la rândul lor, fraza. De aceea le folosești când cauți un dar. Patru întrebări care așteaptă doar da sau nu nu îl fac cunoscut pe coleg.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Îi place să citească se închide cu da. Ce i-a plăcut ultima oară cere un titlu sau o scenă. Pentru dar, a doua întrebare este cea care te ajută.'
      }],
      tryThis: [
        'Scrie patru întrebări deschise, pornite din ce, din care, din cum și din de ce, ca să afli ce volum i-ar plăcea unui coleg drept dar.',
        'Adaugă și forma închisă, anume dacă îi place să citească, ca să vezi contrastul cu da și cu nu. Nu te opri la patru întrebări care așteaptă doar da sau nu.'
      ].join('\n\n'),
      keyPoints: [
        'Întrebarea deschisă poate începe cu ce, cu care, cu cum sau cu de ce și nu se închide prin da sau prin nu.',
        'Întrebarea închisă se rezolvă prin da sau prin nu și dă un semn, nu un titlu.',
        'Pentru un dar ai nevoie de un răspuns dezvoltat. Patru întrebări închise nu îl fac cunoscut pe coleg.'
      ]
    }),
    lesson({
      id: 'de-ce-citim',
      title: 'De ce să citești',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Citit cu folos',
        text: 'Este lectura din care înțelegi, nu una în care doar aluneci cu ochii pe rânduri. Poți trăi fără volume, dar pierzi o convorbire cu alte vremuri.'
      }],
      theory: [
        'Lectura fără înțelegere rămâne goală. Citești ca să poți repovesti o scenă, nu ca să numeri foile. Dacă ai trecut prin text și nu poți spune despre ce era, lectura nu a avut folos.',
        'Un copil a parcurs zece foi și nu poate spune despre ce erau. Cititul lui a rămas gol. Colegul poate spune scena cu vorbele lui, așa că lectura a avut folos și ține legătura cu alte vremuri.',
        'Poți spune că trăiești și fără volume. Este adevărat ca fapt de toate zilele. Ce se pierde este legătura cu oameni și cu vremuri pe care nu le-ai trăit tu.',
        'Tiparul în limba română pornește în veacul al XVI-lea. Un volum din anul 1544 nu a ajuns până la noi. Cea mai veche tipăritură românească din care au rămas exemplare stă între 1551 și 1553.',
        'Anul 1544 nu se confundă cu intervalul din care avem exemplare. Dacă spui că cea mai veche carte păstrată este din 1544, ai mutat data. 1544 este anul unui volum care nu a ajuns până la noi.',
        'Din scenă faci trei pași. Întâi spui ce se povestește. Apoi spui ce imagine vezi. La urmă spui ce ai face tu și legi alegerea prin pentru că.',
        'La școală repeți pașii pe textul deschis. Nu sări la sfat înainte să spui cine poate povesti scena și cine a rămas doar cu numărul foilor.',
        'Ana poate spune că trăiește fără cărți, dar pierde convorbirea cu alte vremuri. Dacă a citit doar ca să numere foile și nu poate povesti nimic, cititul ei a rămas gol.',
        'Radu poate povesti o scenă dintr-o tipăritură aflată între 1551 și 1553. El ține minte că volumul din 1544 nu a ajuns până la noi și că tiparul românesc pornește în veacul al XVI-lea.'
      ].join('\n\n'),
      example: [
        'Ce se povestește: un copil a parcurs zece foi și nu poate spune subiectul, în timp ce colegul poate reda scena.',
        'Ce vezi: copilul cu foile în față și colegul alături. Eu m-aș așeza lângă coleg, pentru că el poate repovesti scena, deci a citit cu folos.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă cineva numește 1544 drept cea mai veche tipăritură păstrată, data este mutată. Volumul din 1544 nu a ajuns până la noi. Exemplarele vechi de care știm stau între 1551 și 1553.'
      }],
      tryThis: [
        'Ana zice că s-ar descurca și fără volume, însă pierde convorbirea cu alte vremuri. Ea a citit numai ca să numere foile și nu poate reda nimic.',
        'Radu repovestește o scenă dintr-o tipăritură aflată între 1551 și 1553. El spune că volumul din 1544 nu a ajuns până la noi și că tiparul românesc pornește în veacul al XVI-lea. Scrie trei propoziții: ce se povestește, ce vezi și ce ai face tu, legate prin pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Cititul cu folos te lasă să povestești o scenă. Număratul foilor, fără înțelegere, rămâne gol.',
        'Fără cărți se poate trăi, însă se pierde convorbirea cu alte vremuri.',
        'Tiparul românesc pornește în veacul al XVI-lea. Volumul din 1544 nu a ajuns până la noi. Exemplarele vechi stau între 1551 și 1553.'
      ]
    }),
    lesson({
      id: 'placere-indatorire',
      title: 'Îndatorire și plăcere',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Două coloane',
        text: 'Fișa desparte datoria de plăcere. Scrii trei îndatoriri și trei plăceri, spui unde stă cititul și pui un titlu temei.'
      }],
      theory: [
        'Lista nu rămâne amestecată. O coloană este datoria, alta este plăcerea. Cititul poate sta la datorie, la plăcere sau în ambele. Titlul spune alegerea, nu o lasă ghicită.',
        'Mai adaugi două spuse pe da și două spuse pe nu. Ele au detalii, nu o vorbă goală de felul e ok. Fără detaliu, fișa nu arată când citești și când nu.',
        'O datorie este exercițiul de matematică. O plăcere este povestea citită seara. Titlul poate fi Cititul meu stă la plăcere, dacă așa stă la tine.',
        'Afirmativ poți scrie Citesc după cină. Negativ poți scrie Nu citesc în pauza de zece minute. Ambele au un timp precis. Vorba e ok nu spune nici ora, nici locul.',
        'Fișa completă are trei datorii și trei plăceri, plus cele două spuse pe da și cele două spuse pe nu. Dacă amesteci coloanele, fișa nu se mai citește.',
        'Din scenă faci trei pași. Întâi spui ce se povestește. Apoi spui ce imagine vezi. La urmă spui ce ai face tu și legi fapta prin pentru că.',
        'La școală repeți pașii pe textul deschis. Nu sări la titlu înainte să desparți datoria de plăcere. Titlul vine după ce ai văzut unde stă cititul.',
        'Tema de română poate fi o datorie. Iar în curte, fotbalul este plăcerea. Atunci titlul poate spune că lectura ține și de datorie, și de plăcere, dacă intră în ambele coloane.',
        'Afirmativ poți spune Citesc când am timp. Negativ nu folosești vorba goală e ok. Spui un fapt: nu citești în pauza scurtă, sau nu lași lista amestecată. Detaliul ține fișa de crezut.'
      ].join('\n\n'),
      example: [
        'Ce se povestește: o datorie este exercițiul de matematică, iar o plăcere este povestea de seară. Titlul spune că cititul stă la plăcere.',
        'Ce vezi: tema de matematică și povestea de seară, în coloane separate. Eu aș citi povestea seara, pentru că acolo stă plăcerea, nu în pauza de zece minute.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Citesc după cină este afirmativ și are un timp. Nu citesc în pauza de zece minute este negativ și are tot un timp. E ok nu are nici timp, nici faptă, deci nu intră pe fișă.'
      }],
      tryThis: [
        'Tema de română este o datorie. Iar în curte, fotbalul este plăcerea. Titlul spune că lectura ține și de datorie, și de plăcere.',
        'Pe da scrii Citesc când am timp. La forma negativă evită vorba goală e ok și pune un detaliu. Lista stă despărțită, cu trei datorii și trei plăceri. Scrie trei propoziții: ce se povestește, ce vezi și ce ai face tu, legate prin pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Fișa desparte trei datorii de trei plăceri și spune, prin titlu, unde stă cititul.',
        'Trebuie două spuse pe da și două spuse pe nu, cu detalii. Vorba e ok nu ajunge.',
        'Din scenă iei trei pași: ce se povestește, ce vezi și ce ai face, legate prin pentru că.'
      ]
    })
  ]
};
