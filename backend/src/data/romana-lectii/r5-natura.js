'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = {
  id: 'natura',
  title: 'Omul, parte din natură',
  inOwnWords: 'Unitatea 5 leagă emoția față de natură de adjectiv, cu acord și grade, și de textul descriptiv. Scenele stau în lecții. Comparația se lucrează pe poezia Cioara, de George Topîrceanu. La școală titlul poate fi altul, iar cei trei pași rămân aceiași.',
  toc: [
    'Exprimarea emoțiilor. Omul în armonie cu natura',
    'Adjectivul. Acordul cu substantivul',
    'Gradele de comparație',
    'Textul descriptiv literar și nonliterar. Inferențe',
    'Comparația (Cioara, de George Topîrceanu)',
    'Recapitulare și evaluare'
  ],
  glossary: [
    {
      term: 'adjectiv',
      meaning: 'Spune însușirea unui substantiv și se acordă cu el.'
    },
    {
      term: 'comparativ',
      meaning: 'Pune două lucruri față în față: mai înalt decât, la fel de înalt ca.'
    },
    {
      term: 'text descriptiv',
      meaning: 'Arată cum este ceva, nu ce se întâmplă mai departe.'
    },
    {
      term: 'câmp lexical',
      meaning: 'Cuvinte care țin de aceeași temă: pădure, anotimp, pasăre.'
    },
    {
      term: 'comparație',
      meaning: 'Doi termeni cu o trăsătură comună, legați prin ca, precum sau decât.'
    },
    {
      term: 'inferență',
      meaning: 'Ce deduci dintr-un indiciu, fără o faptă pe care textul n-o dă.'
    }
  ],
  lessons: [
    lesson({
      id: 'emotie-adjectiv',
      title: 'Emoția, adjectivul, acordul',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Adjectivul se acordă',
        text: 'Adjectivul numește o însușire și preia genul substantivului, împreună cu numărul. După descriere, notița desparte vederea, auzul și starea.'
      }],
      theory: [
        'Când spui cum arată un lucru, adjectivul stă lângă numele lui. Dacă numele e feminin și la singular, adjectivul nu rămâne pe o formă de masculin.',
        'După niște, substantivul vine la plural și rămâne nearticulat. Grupul bun este niște codri. Forma cu articol, codrii, nu se lipește de niște.',
        'Strigarea caldă către păsări folosește dragele mele. Dacă textul cere afecțiune, nu o înlocuiești cu o formulă rece.',
        'Din pasăre poți face un adjectiv prin sufixul -esc. Iese păsăresc. Cuvântul spune că sunetul ține de pasăre, nu că pasărea însăși vorbește.',
        'Ana zărește frunze mici, de un verde pal, lângă ghiocei cu luciu de argint. Deasupra stau nori cenușii. Mai departe, alți nori par întunecați.',
        'Ea cheamă păsările prin formula dragele mele. Le aude pe străzi goale, în apropierea unor codri. Sunetul i se pare păsăresc.',
        'În notiță desparte trei lucruri, pe rânduri diferite: ce a zărit, ce a auzit, ce a simțit. Nu le topește într-o impresie vagă.',
        'Verzuie ține doar de feminin, la singular. Corect este o frunză verzuie. Antonimul, când sunt mai multe frunze, devine frunze albe.',
        'Pe o scenă lucrezi în trei timpi. Redai întâi ce stă scris. Apoi spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Dacă schimbi numărul și lași adjectivul pe loc, grupul se strică. Verzuie nu stă lângă frunze. Albe nu stă lângă o singură frunză.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: Ana vede frunze verzui, ghiocei argintii și nori cenușii. Păsările se aud pe străzi pustii, lângă codri.',
        'Ce observ: O văd pe Ana între frunze și nori. Aș asculta cântecul de lângă codri, pentru că sunetul vine de pe străzile goale.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'O frunză verzuie este corect, fiindcă ambele cuvinte stau la feminin singular. La plural, antonimul acordat este frunze albe.'
      }],
      practice: [
        '1) De ce verzuie stă doar lângă un nume feminin, la singular? Ce formă ia antonimul când sunt mai multe frunze?',
        '2) Ce formă are substantivul după niște? Dă grupul corect cu codri și spune de ce codrii nu se potrivește.',
        '3) Cum treci de la pasăre la păsăresc și ce anume arată adjectivul nou în scena Anei?',
        '4) Ce formulă de strigare folosește Ana? Ce trei lucruri desparte în notiță după descriere?'
      ].join('\n\n'),
      answers: [
        'Verzuie este feminin singular, ca în o frunză verzuie. La plural, antonimul acordat este frunze albe.',
        'După niște vine pluralul fără articol. Grupul bun este niște codri. Codrii este deja articulat.',
        'Sufixul -esc dă păsăresc. În scenă, adjectivul arată că sunetul ține de pasăre.',
        'Ana folosește dragele mele. Notița desparte vederea, auzul și starea.'
      ],
      mistakes: 'Nu lăsa verzuie la plural și nu articula numele de după niște. Păsăresc nu înlocuiește pasărea, iar dragele mele este strigare, nu o etichetă rece.',
      tryThis: [
        'Radu vede frunze verzui. Lângă el sunt niște codri, iar din copaci vine un sunet păsăresc. El strigă dragele mele. Străzile sunt pustii, norii sunt cenușii.',
        'Notează separat vederea, auzul și starea. Arată acordul la frunze albe și limita formei verzuie. Trei enunțuri: conținut, observație cu Văd, faptă motivată prin pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Adjectivul ia genul și numărul numelui de lângă el. Verzuie rămâne singular feminin, iar frunze albe este antonimul la plural.',
        'Niște cere plural nearticulat, ca în niște codri. Strigarea caldă este dragele mele, iar -esc dă păsăresc.',
        'După descriere desparți vederea, auzul și starea, apoi spui conținutul, observația și fapta ta.'
      ]
    }),
    lesson({
      id: 'grade',
      title: 'Gradele de comparație',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Cât de intens',
        text: 'Gradul arată cât de tare este o însușire, singură sau față de alt lucru. Pozitivul nu compară. Celelalte grade pun lucrurile în raport.'
      }],
      theory: [
        'La pozitiv, însușirea stă singură. Spui că râul este lat și nu îl măsori față de alt râu. Doar constată.',
        'Superioritatea urcă treapta prin mai ... decât. Egalitatea folosește la fel de ... ca. Inferioritatea coboară prin mai puțin ... decât.',
        'Superlativul relativ alege dintr-o mulțime. Marca lui este cel mai ... dintre. Fără mulțime, absolutul rămâne la foarte.',
        'Într-o reclamă, gradul apare o dată, în rândul care chiar compară. Nu îl repeți peste tot, ca să nu obosești cititorul.',
        'Nu lipi cel mai de foarte. Construcția greșită cu bătrân amestecă relativul cu absolutul și lasă două mărci pe aceeași însușire.',
        'Un mesteacăn poate întrece un tufiș la vârstă. Același copac poate fi mai îngust decât un stejar. Fiecare raport își păstrează marca.',
        'Cel mai bătrân dintre copaci presupune o mulțime. Foarte bătrân nu are nevoie de ea. El intensifică singur.',
        'Când scrii, întrebi întâi dacă există un al doilea termen. Dacă nu există, rămâi la pozitiv sau la absolut.',
        'Dacă alegi dintr-un grup, folosești dintre. Dacă pui doar două lucruri față în față, folosești decât ori ca.',
        'Cele șase trepte ale lui lat rămân separate: pozitivul, urcarea, egalitatea, coborârea, alegerea din grup și intensitatea singură. Nu le contopești.'
      ].join('\n\n'),
      example: [
        'Un râu stă la pozitiv: este lat, fără raport. Al doilea are aceeași lățime, deci egalitate. Mesteacănul întrece tufișul la vârstă, dar rămâne mai îngust decât stejarul.',
        'Dintre copaci, unul este cel mai bătrân. Foarte bătrân nu cere grup. În reclamă, gradul apare o singură dată, acolo unde chiar compară.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Stejarul este foarte lat nu cere o mulțime. Stejarul este cel mai lat dintre copacii din poiană cere grupul. Cele două mărci nu se lipesc.'
      }],
      practice: [
        '1) Ce grad este în râul este lat? Cum spui superioritatea, egalitatea și inferioritatea pentru lat?',
        '2) Prin ce se deosebește cel mai lat dintre de foarte lat? Care formă are nevoie de un grup?',
        '3) De ce nu e bună construcția în care cel mai stă lipit de foarte, înainte de bătrân?',
        '4) Într-o reclamă, de câte ori pui gradul și unde anume îl așezi?'
      ].join('\n\n'),
      answers: [
        'Râul este lat stă la pozitiv. Pentru urcare folosești mai lat decât. Pentru egalitate folosești la fel de lat ca. Pentru coborâre folosești mai puțin lat decât un alt râu.',
        'Cel mai lat dintre este relativ și alege din grup. Foarte lat este absolut și nu are grup.',
        'Cel mai și foarte amestecă relativul cu absolutul. Se păstrează o singură marcă.',
        'Gradul se pune o dată, în rândul care chiar compară.'
      ],
      mistakes: 'Nu scrie cel mai foarte bătrân. Nu pune dintre dacă nu ai un grup și nu pune foarte când alegi dintr-o mulțime.',
      tryThis: 'Alcătuiește șase propoziții, fiecare cu altă treaptă a lui lat: pozitivul, urcarea, egalitatea, coborârea, relativul cu dintre și absolutul cu foarte. Nu lipi cel mai de foarte.',
      keyPoints: [
        'Pozitivul constată, fără raport. Comparativul urcă, egalizează sau coboară.',
        'Relativul alege din grup, prin dintre. Absolutul intensifică singur, prin foarte.',
        'În reclamă gradul apare o dată. Cel mai nu se lipește de foarte.'
      ]
    }),
    lesson({
      id: 'descriptiv',
      title: 'Text descriptiv, inferențe, comparația',
      kind: 'redactare',
      boxes: [{
        type: 'definitie',
        title: 'Două feluri de descriere',
        text: 'Descrierea literară te cheamă să privești, să asculți și să simți. Cea nonliterară informează, cu termeni pe care îi poți verifica.'
      }],
      theory: [
        'O descriere are un scop limpede: ori te mișcă, ori te informează. Lumea imaginată doar seamănă cu una din afară. Nu o confunzi cu un raport.',
        'Inferența este concluzia care se oprește acolo unde se oprește indiciul. Nu adaugi o lună, un an sau o faptă absentă din text.',
        'Frunzele îngălbenite, împreună cu un vânt rece, susțin toamna. Atât. Fără un nume de lună, concluzia rămâne la anotimp.',
        'O grădină care pare că adoarme încet îți cere simțurile. Este descriere literară, fiindcă te pune în scenă, nu pe un panou.',
        'Enunțul despre frunza de stejar, anume că este lobată, informează printr-un termen exact. Poate sta pe un panou. Acolo cauți precizie, nu emoție.',
        'Albul se explică drept suma culorilor. Afirmația ține de informație, nu de o imagine inventată.',
        'Comparația legată prin ca se lucrează mai târziu în unitate. Aici o recunoști doar ca procedeu anunțat, fără să o dezvolți încă.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Dacă indiciul este apa rece a unui lac, te oprești la frig. Nu inventezi o dată. Malul nisipos poate sta pe un panou, ca termen exact.',
        'Scopul se vede din cuvinte. Imaginile care te mișcă țin de literar. Termenii verificabili țin de nonliterar. Ambele pot sta în tema naturii.',
        'Un titlu de panou nu înlocuiește descrierea literară. O metaforă nu înlocuiește termenul de pe panou.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: frunze galbene și vânt rece duc spre toamnă, iar grădina pare că adoarme. Pe panou scrie că frunza stejarului este lobată.',
        'Ce observ: Văd frunze galbene, grădina și panoul. Aș rămâne între straturi, ca să aud vântul, pentru că indiciile opresc concluzia la toamnă.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Lacul cenușiu îți arată apa și frigul. Inferența se oprește la apa rece. Malul nisipos informează și poate sta pe panou.'
      }],
      tryThis: [
        'Imaginează un lac cenușiu. Vezi apa, auzi vântul, simți frigul. Lumea doar seamănă cu una reală. Indiciul rămâne apa rece, deci nu pui o lună.',
        'Malul nisipos poate sta pe un panou. Albul rămâne suma culorilor. Comparația cu ca vine mai târziu. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Literarul te mișcă prin simțuri. Nonliterarul informează prin termeni exacți, buni de panou.',
        'Inferența se oprește la indiciu. Frunzele galbene și vântul rece dau toamna, nu o lună.',
        'Albul este suma culorilor. Comparația cu ca se lucrează mai departe în unitate.'
      ]
    }),
    lesson({
      id: 'camp-lexical',
      title: 'Câmpul lexical și tema',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Cuvinte din aceeași zonă',
        text: 'Câmpul lexical strânge cuvinte din aceeași zonă de înțeles. Ele țin imaginea laolaltă și arată tema: un animal, un peisaj sau un fenomen.'
      }],
      theory: [
        'Tema se citește din vorbele textului, nu dintr-un titlu pus la întâmplare. Dacă vorbele duc spre pădure, tema nu sare la bucătărie.',
        'La o ghicitoare alegi întâi tema, apoi aduci cheia. Ninsoarea, ca și ploaia, împinge spre anotimpuri. Când tema este timpul, cheia este durata.',
        'Transcrii două cuvinte și spui ce sunt: substantive, adjective sau verbe. Partea de vorbire arată cum se construiește imaginea.',
        'Frunza, scoarța și umbra sunt substantive. Toate trei țin de câmpul pădurii. Unul singur ar fi slab. Împreună fixează tema.',
        'În grupul vântul geme, geme este verb. El poate susține furtuna, deci un fenomen, nu doar un peisaj liniștit.',
        'O farfurie pusă în același șir rupe imaginea. Ea nu ține de pădure, nici de furtună, nici de anotimp.',
        'Când două cuvinte par vecine, întrebi dacă pot sta în aceeași imagine. Dacă nu pot, unul dintre ele este intrus.',
        'Animalul, peisajul și fenomenul sunt trei tipuri de temă. Nu le amesteci doar pentru că apar în natură.',
        'Durata nu măsoară ninsoarea. Dacă o pui cheie la anotimp, tema se mută greșit spre timp.',
        'La răspuns numești tema, dai cheia și spui partea de vorbire. Trei lucruri, nu o listă fără legătură.'
      ].join('\n\n'),
      example: [
        'Frunza, scoarța și umbra sunt substantive din câmpul pădurii. Verbul din vântul geme poate ține furtuna, deci un fenomen.',
        'Ninsoarea și ploaia deschid anotimpurile. Durata deschide timpul. Farfuria, așezată lângă umbră, rupe câmpul.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă lângă scoarță apare lingură, tema pădurii se clatină. Lingura nu ține de copac. O lași în afara câmpului.'
      }],
      practice: [
        '1) Ce temă susțin frunza, scoarța și umbra? Ce parte de vorbire sunt toate trei?',
        '2) În vântul geme, ce parte de vorbire este geme și ce fenomen poate susține?',
        '3) Ce chei alegi pentru anotimpuri și ce cheie alegi când tema este timpul?',
        '4) De ce o farfurie pusă lângă umbră încurcă tema pădurii?'
      ].join('\n\n'),
      answers: [
        'Tema este pădurea. Frunza, scoarța și umbra sunt substantive.',
        'Geme este verb. Poate susține furtuna, deci un fenomen.',
        'Pentru anotimpuri: ninsoare și ploaie. Pentru timp: durata.',
        'Farfuria nu ține de pădure. Intrusul rupe câmpul lexical.'
      ],
      mistakes: 'Nu pune farfuria în câmpul pădurii. Nu numi durata drept cheie de anotimp și nu lăsa verbul geme fără fenomenul pe care îl poate susține.',
      tryThis: 'Scrie propoziții scurte. Leagă frunza de scoarță și de umbră, apoi verbul din vântul geme de furtună. Separat, pune ninsoarea lângă ploaie, durata lângă timp, iar farfuria în afara pădurii. Spune partea de vorbire.',
      keyPoints: [
        'Câmpul lexical ține imaginea laolaltă. Din el citești tema, care poate fi animal, peisaj sau fenomen.',
        'Ninsoarea și ploaia deschid anotimpurile. Durata deschide timpul. Geme poate susține furtuna.',
        'Frunza, scoarța și umbra sunt substantive de pădure. Farfuria, pusă lângă ele, este intrus.'
      ]
    }),
    lesson({
      id: 'descriere-stiintifica',
      title: 'Descrierea care informează',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Termen verificabil',
        text: 'Descrierea care informează este un text nonliterar, făcut din termeni exacți. Pe un logo stă studiul, nu o imagine inventată.'
      }],
      theory: [
        'În portofoliu, pasărea sau animalul vin din zona în care stai. Scrii un paragraf documentat, bun de așezat pe un logo.',
        'Paragraful are trei piese: locul, o trăsătură pe care o poți controla și un termen exact. Fără ele, textul rămâne o impresie.',
        'Adjectivele din notă pot sta pe trepte diferite. Tu le numești. Nu le lași anonime.',
        'Construcția mai isteață decât este comparativ de superioritate. Marca mai ... decât urcă o însușire față de alt termen.',
        'O metaforă nu ajunge pe logo. Acolo stă studiul. O imagine inventată nu se poate verifica.',
        'Nota despre cioară dă un loc precis, Câmpia Bărăganului. Mai pomenește și împrejurimile Bucureștiului. În ambele, ciorile sunt multe.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Dacă pasărea e din satul tău, locul rămâne local. Nu copia harta ciorilor dacă nu ai date pentru ea.',
        'Mai iute decât se numește la fel: comparativ de superioritate. Gradul se spune, nu se ghicește.',
        'Documentat înseamnă că un cititor poate controla locul și trăsătura. Dacă nu poate, textul nu e bun de logo.',
        'Portofoliul păstrează paragraful lângă notă. Logo-ul nu primește o poveste în locul studiului.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: nota fixează locul. Câmpia Bărăganului adună multe ciori, la fel și zona din jurul Bucureștiului.',
        'Ce observ: Văd ciori pe câmp și lângă oraș. Aș rămâne pe câmp, pentru că nota leagă densitatea mare de aceste două locuri.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă pe notă scrie mai iute decât, numești comparativul de superioritate. Metafora rămâne în afara logo-ului.'
      }],
      tryThis: [
        'Lângă satul tău stă o pasăre. Pe logo lași locul, trăsătura controlabilă și termenul precis. Dacă nota are mai iute decât, numește gradul.',
        'Nu pui o metaforă pe logo. Pentru cioară, locurile din notă sunt Câmpia Bărăganului și zona din jurul Bucureștiului. Trei enunțuri, iar observația pornește cu Văd.'
      ].join('\n\n'),
      keyPoints: [
        'Paragraful de logo este documentat: loc, trăsătură verificabilă, termen exact. Metafora nu intră.',
        'La cioară, nota leagă densitatea mare de Câmpia Bărăganului și de zona din jurul Bucureștiului.',
        'Mai isteață decât și mai iute decât sunt comparative de superioritate. Gradul se numește.'
      ]
    }),
    lesson({
      id: 'comparatie',
      title: 'Comparația',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Doi termeni',
        text: 'Comparația alătură doi termeni care împart o trăsătură. Îi poate lega ca, ori precum. Mai stau asemănător cu, întocmai ca și decât.'
      }],
      theory: [
        'Tabelul are cinci locuri, în ordine. Întâi stă primul termen. Urmează legătura, apoi al doilea termen. Închei cu trăsătura împărtășită și cu starea.',
        'Trăsătura împărtășită poate fi culoarea, liniștea sau alt amănunt văzut la amândoi. Fără ea, alăturarea nu este comparație.',
        'Poezia lucrată aici se numește Cioara. Autorul este George Topîrceanu. Titlul rămâne reper, chiar dacă la clasă ai alt text.',
        'Personificarea împrumută o faptă de om unei ființe sau unui obiect. Nu are ca și nu are al doilea termen. Nu o pui în tabel.',
        'Pițigoiul este galben ca o lămâie. Primul termen este pițigoiul. Legătura este ca. Al doilea termen este lămâia. Culoarea le unește.',
        'Starea se notează în locul al cincilea. Nu o lași afară, chiar dacă pare mai puțin vizibilă decât culoarea.',
        'Pițigoiul râde este personificare. Pasărea primește o faptă de om. Lipsesc și ca, și al doilea termen.',
        'Poți schimba legătura. Precum stă bine. Asemănător cu stă bine. Întocmai ca și decât stau bine. Schema celor cinci locuri nu se schimbă.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'O rață liniștită precum o barcă legată păstrează schema: rața, precum, barca. Liniștea este punctul comun. Starea intră în ultimul loc.',
        'Rața cântă nu alătură doi termeni, deci este personificare. O numeri separat de comparație.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: pițigoiul este galben ca o lămâie. Separat, pițigoiul râde, deci primește o faptă omenească.',
        'Ce observ: Văd un pițigoi galben lângă o lămâie. Aș sta lângă el, pentru că galbenul se vede prin raport cu fructul. Reperul rămâne Cioara, de George Topîrceanu.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Rața liniștită precum o barcă are doi termeni și o legătură. Rața cântă nu are al doilea termen, deci este personificare.'
      }],
      tryThis: [
        'Pornește de la rața liniștită precum o barcă legată. Numește termenul din față, cuvântul de legătură, termenul al doilea, trăsătura comună și starea din ultimul loc.',
        'Arată de ce rața cântă este personificare. Reperul poetic rămâne Cioara, scrisă de George Topîrceanu. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Tabelul comparației are cinci locuri: termenii, legătura, trăsătura comună și starea.',
        'La pițigoiul galben ca o lămâie, punctul comun este culoarea. Pițigoiul râde este personificare.',
        'Poezia de reper este Cioara, de George Topîrceanu. Personificarea se numără separat.'
      ]
    }),
    lesson({
      id: 'portret-fiinta',
      title: 'Portretul unei ființe',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Ansamblu și detalii',
        text: 'Portretul cuprinde întregul și amănuntele. La o pasăre cauți capul și ochii, ciocul sau botul. Mai notezi aripile, locul în care trăiește, o iscusință și felul în care se leagă de om.'
      }],
      theory: [
        'Poți scrie și din privirea unei frunze, sau din privirea unei case. Pragul de jos este de trei paragrafe. Unul singur nu face portret.',
        'La o plantă, paragraful dintâi este real. În el stau cel puțin două grupuri, fiecare cu un substantiv și un adjectiv. Paragraful următor este de basm.',
        'După ele vin locul, un detaliu și legătura cu tine. Fără legătură, portretul rămâne o listă.',
        'O pasăre poate avea cap mic și ochi vii. Ciocul ei este subțire, aripile sunt line. Trăiește în copac, zboară, iar legătura cu omul poate fi liniștită.',
        'La plantă, o frunză lată stă pe o tulpină verde. Ai deja două grupuri de nume plus însușire, în paragraful care se poate verifica.',
        'Imaginea de basm începe altfel: frunza seamănă cu o umbrelă aurie și se lasă peste prag. Nu o muți în paragraful real.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Dacă sari ciocul sau mediul, portretul de pasăre rămâne incomplet. Ansamblul nu ține loc de amănunt.',
        'Paragraful real se verifică: poți arăta planta. Paragraful de basm se recunoaște prin imaginea care nu se măsoară.',
        'Locul vine după cele două paragrafe, nu înaintea grupurilor. Apoi detaliul. Apoi legătura cu tine, ca să se vadă de ce ai ales ființa.',
        'Trei paragrafe sunt pragul de jos. Poți scrie mai multe, dar nu mai puține, când privești prin ochii frunzei sau ai casei.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: pasărea cu cioc subțire stă în copac. Frunza lată stă pe tulpina verde. Apoi frunza, asemenea unei umbrele aurii, se lasă peste prag.',
        'Ce observ: Văd pasărea, frunza lată și umbrela de aur. Aș sta lângă tulpină, pentru că acolo paragraful real își arată cele două grupuri.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Petala subțire și spinul scurt sunt două grupuri reale. Petala ca o lanternă de seară deschide basmul. Locul și legătura cu tine vin după.'
      }],
      tryThis: 'Scrie portretul unei plante. Începe realist, cu două perechi de substantiv și adjectiv. Adaugă apoi o propoziție de basm. Încheie cu o faptă a ta, motivată prin pentru că.',
      keyPoints: [
        'Portretul are ansamblu, detalii, mediu, o abilitate și legătura cu omul. Minimumul este de trei paragrafe.',
        'La plantă, bucata reală are două grupuri de substantiv plus adjectiv. Bucata următoare este de basm.',
        'Frunza lată pe tulpina verde ține de real. Umbrelă de aur la prag deschide basmul.'
      ]
    }),
    lesson({
      id: 'carti-pasari',
      title: 'Două texte despre ciori',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Confirmă sau infirmă',
        text: 'Când textul sprijină un fapt din nota despre ciori, confirmi. Când nu îl sprijină, infirmi. Ajunge un motiv, legat prin deoarece.',
      }],
      theory: [
        'Răspunsul rămâne scurt. Scrii că textul confirmă, apoi deoarece și motivul. Sau scrii că textul infirmă, cu același tipar. Nu repovestești fabula.',
        'Lângă nota despre ciori stau două titluri. Primul este Cioara și ulciorul. Autorul este Esop. Al doilea este Corbul și vulpea. Autorul este Jean de La Fontaine.',
        'Pentru Esop folosești formula scurtă și un singur motiv. Același tipar stă și la La Fontaine. Nu schimbi regula de la un titlu la altul.',
        'Un motiv bun se vede în text: o faptă, o trăsătură, o urmare. O părere fără suport nu ajunge.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Dacă nota spune că cioara găsește o soluție, cauți în text o faptă care o arată sau o contrazice. Atât. Ulciorul nu se descrie.',
        'Nici vulpea nu se portretizează. Răspunsul rămâne la confirmare sau la infirmare.',
        'Esop și Jean de La Fontaine rămân autori diferiți. Nu lipești cele două fabule într-o singură poveste.',
        'Deoarece introduce motivul. Fără el, confirmarea este doar o etichetă.',
        'Poți alege confirmarea la un text și infirmarea la celălalt. Nu ești obligat să dai același răspuns de două ori.',
        'La clasă, dacă ai alt text lângă notă, păstrezi formula. Se schimbă motivul, nu tiparul.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: nota despre ciori stă între două cărți. Una este a lui Esop, Cioara și ulciorul. Cealaltă este a lui Jean de La Fontaine, Corbul și vulpea.',
        'Ce observ: Văd două volume lângă notă. Aș deschide volumul lui Esop, pentru că titlul lui stă chiar lângă notă. Răspunsul ar rămâne scurt, cu deoarece.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă fabula nu susține nota, scrii că textul infirmă, pui deoarece și un motiv. Nu lungești răspunsul cu ulciorul.'
      }],
      tryThis: [
        'Pentru Esop alegi confirmarea sau infirmarea și o legi prin deoarece, cu un singur motiv. La Jean de La Fontaine păstrezi același tipar.',
        'Nu povestești fabula. Nu descrii ulciorul. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Răspunsul spune că textul confirmă sau că infirmă, apoi deoarece și un singur motiv.',
        'Un titlu este Cioara și ulciorul, iar autorul este Esop. Celălalt titlu, Corbul și vulpea, îl are Jean de La Fontaine.',
        'Fabula nu se repovestește, iar ulciorul nu se descrie. Formula rămâne scurtă.'
      ]
    }),
    lesson({
      id: 'afis-tombola',
      title: 'Afișul pentru tombolă',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Trei etape',
        text: 'Afișul de Crăciun anunță o tombolă cu obiecte donate. Scopul este ajutorul copiilor cu note bune. Întâi strângi ideile, apoi fixezi planul, abia la urmă scrii.'
      }],
      theory: [
        'Pe afiș stau un substantiv și un atribut, o informație adevărată și o povestire scurtă. Mai pui un grad, cu măsură, o comparație și o personificare.',
        'Mai scrii trei enunțuri, fiecare cu rolul lui: o informație, o întrebare, o poruncă. Nu le contopești într-un singur rând.',
        'Informația rămâne adevărată. Nu umfli o însușire doar ca să urce prețul. Tombola nu minte ca să vândă.',
        'Stiloul este albastru și scrie fin. Povestea lui spune cum a fost dăruit, de Crăciun, ca să ajute copiii cu note bune. Albastru este atributul.',
        'Întrebarea poate suna așa: vrei un scris ca o linie liniștită? Acolo stă comparația și cheamă un răspuns. Nu pui câte un grad în fiecare rând.',
        'Porunca este Cumpără-l azi. Verbul stă la imperativ. Rândul de dinainte, cel cu informația, rămâne adevărat.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Etapa A nu scrie încă afișul. Ea doar adună. Etapa B alege locul și ordinea. Abia etapa C produce textul.',
        'Personificarea dă obiectului o faptă de om, de pildă stiloul care povestește. Comparația, în schimb, alătură scrisul cu o linie liniștită.',
        'Gradele stau cu măsură. Un singur mai sau un singur foarte ajunge. Excesul face reclama greu de crezut.',
        'Darul și notele bune rămân scopul. Dacă scoți scopul, afișul devine o simplă vânzare.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: de Crăciun, la tombolă, stiloul albastru este dăruit. Banii ajută copiii cu note bune.',
        'Ce observ: Văd stiloul albastru pe coală. Aș cumpăra obiectul, pentru că este donat și scopul rămâne ajutorul.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Informația stiloul albastru scrie fin stă lângă întrebarea cu comparația și lângă porunca Cumpără-l azi. Trei enunțuri, trei roluri.'
      }],
      tryThis: 'Pentru tombola de Crăciun scrie trei rânduri: o informație adevărată, cu nume și adjectiv, o întrebare care cuprinde o comparație și o poruncă. Încheie cu o faptă a ta, motivată prin pentru că.',
      keyPoints: [
        'Afișul vinde lucruri donate, ca să ajute copiii cu note bune, iar datele rămân adevărate.',
        'Are nume și atribut, o povestire, un grad măsurat, comparație, personificare, întrebare și poruncă.',
        'Întâi aduni ideile, apoi fixezi planul și locul, iar la urmă scrii afișul.'
      ]
    }),
    lesson({
      id: 'recap-natura',
      title: 'Recapitulare: natura',
      kind: 'recapitulare',
      boxes: [{
        type: 'regula',
        title: 'Trei coloane',
        text: 'La recapitularea pe fragmente acoperi bucata care urmează și spui ce bănuiești, înainte să citești mai departe.'
      }],
      theory: [
        'Tabelul de predicție se împarte în trei. În stânga stă bănuiala. La mijloc stau probele. În dreapta notezi ce s-a petrecut.',
        'Fragmentul poartă titlul Cioc! Cioc! Cioc! Autorul este Emil Gârleanu. Un titlu nou trebuie să cuprindă toată povestirea, nu doar o zicală.',
        'Zicala, luată singură, nu ține loc de probă. Dacă te sprijini doar pe ea, coloana din mijloc rămâne goală.',
        'Sufixul -esc, pus la pasăre, produce păsăresc. Personificarea se numără aparte de comparație. Nu le pui în aceeași căsuță.',
        'O elevă din clasa a V-a își amintește biologia prin poveste și reia metoda. Perișorul și stomata sunt termeni de biologie.',
        'Perișorii absorb apa. Prin stomată circulă gazele. Sunt doi termeni exacți, nu două imagini poetice.',
        'Personificarea îi dă plantei o faptă omenească. O piesă care cedează este o pană. Țeava spartă intră aici, nu la personificare.',
        'Fabricile, împreună cu betonul, sugerează un oraș. Clima lui este temperată. Pentru același spațiu, turnul înalt este un grup, iar podul îngust este al doilea.',
        'La închidere completezi două lucruri: tabelul prin care observi comportamentul și fișa de reflecție. Ambele stau la persoana I.',
        'În fișă spui ce ai aflat și unde refolosești ideea, la altă materie. Mai spui ce ai văzut la tine și ce vrei să cauți de acum. Fișele ajung în portofoliu, lângă materialele unităților trecute.',
        'Poți nota că fișa informează, iar comparația arată. La biologie, frunza se descrie cu doi termeni exacți. La următoarea descriere păstrezi un singur grad.'
      ].join('\n\n'),
      example: [
        'În tabel lași bănuiala, probele și urmarea. Poți nota că pasărea pare în căutare. Proba este ciocănitul. Apoi notezi ce s-a petrecut.',
        'Titlul nou cuprinde tot textul lui Emil Gârleanu, nu o zicală. Frunza care salută răsăritul este personificare. Țeava care cedează este o pană. Perișorii absorb apa. Stomata schimbă gazele.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Turnul înalt formează un grup. Podul îngust formează al doilea. Betonul și fabricile duc spre clima temperată. Fișa, la persoana I, intră în portofoliu.'
      }],
      tryThis: 'La persoana I, leagă titlul cu trei ciocănituri de numele Emil Gârleanu. Mai folosește probele, forma păsăresc, personificarea ținută separat de comparație, perișorul, stomata, pana unei țevi sparte, turnul înalt, podul îngust, fabricile, betonul, clima temperată și portofoliul. Spune că data viitoare păstrezi un singur grad.',
      keyPoints: [
        'Tabelul ține bănuiala, probele și urmarea. Titlul nou cuprinde tot textul Cioc! Cioc! Cioc!, scris de Emil Gârleanu.',
        'Păsăresc vine din pasăre prin -esc. Personificarea stă separat de comparație. Țeava spartă este o pană.',
        'Perișorii absorb apa, stomata schimbă gazele, iar fișa la persoana I intră în portofoliu. Data viitoare păstrezi un singur grad.'
      ]
    })
  ]
};
