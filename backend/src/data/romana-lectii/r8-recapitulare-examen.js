'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  id: 'recapitulare-examen',
  title: 'Foaia de examen',
  inOwnWords: 'Aici stă harta probei scrise: unde se adună punctele, cum se transcrie o subordonată, care forme de ortografie se cer des și cum se construiesc cele cinci compuneri. Scenele sunt scrise în lecție, ca să exersezi metoda, nu o foaie gata notată.',
  toc: [
    'Punctele de pe foaie',
    'Algoritmul frazei',
    'Capcanele de ortografie',
    'Cele cinci compuneri',
    'Mesajul unui text liric',
    'Caracterizarea',
    'Limba pe rândul dat'
  ],
  glossary: [
    {
      term: 'plan principal',
      meaning: 'Temele care aduc puncte aproape de fiecare dată: înțelegerea textului, fraza, ortografia și compunerea.'
    },
    {
      term: 'atributivă',
      meaning: 'Subordonată care spune ceva despre un substantiv și stă adesea cu care.'
    },
    {
      term: 'completivă directă',
      meaning: 'Subordonată care răspunde la ce sau pe cine și se deschide des cu că sau cu să.'
    },
    {
      term: 'redactare',
      meaning: 'Cele 8 puncte de la compunere, date doar dacă există minimumul de cuvinte și subiectul este dezvoltat.'
    }
  ],
  lessons: [
    lesson({
      id: 'foaia-en',
      title: 'Unde sunt punctele',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Harta punctelor',
          text: 'Din 100, 10 vin din oficiu. Restul de 90 se împart așa: lectura 38, limba 32, compunerea 20.'
        },
        {
          type: 'atentie',
          title: 'Două bife',
          text: 'La adevărat sau fals, două semne pe același rând anulează rândul, chiar dacă unul era bun.'
        }
      ],
      theory: [
        'Partea A lucrează pe două texte. Unul este literar: de obicei o întâmplare, uneori o poezie. Celălalt informează sau povestește o amintire: articol, jurnal, interviu.',
        'A1 face 2 puncte și cere un câmp de cuvinte sau o completare. A2, A3 și A4 sunt trei alegeri, tot câte 2 puncte.',
        'A5 face 6 puncte, pe șase enunțuri. Alegi adevărat sau fals numai din text. Un rând cu ambele semne este zero.',
        'A6 până la A9 sunt patru răspunsuri scrise, câte 6 puncte. A6 cere o figură, versificația, o trăsătură cu mijlocul ei sau tiparul textului.',
        'A7 cere ce au textele în comun, în cel puțin 30 de cuvinte. A8 cere o părere în 50–100 de cuvinte, cu un motiv și un fapt din text.',
        'A9 leagă o valoare de un text literar studiat. Spui valoarea, titlul și autorul, apoi o frază scurtă. Nu un rezumat.',
        'Partea B are 32 de puncte. B1–B4 sunt alegeri de câte 2 puncte: sunete, formarea cuvintelor și două itemi de vocabular.',
        'B5–B8 sunt deschise, câte 6 puncte: forme, două enunțuri cu condiții, subordonate și ortografie. La B6, punctul cade dacă lipsește o condiție sau semnul final.',
        'La fiecare item de 6 puncte din A6–A9, un punct ține de limită, iar un punct ține de norme, cu cel mult o greșeală.',
        'Compunerea dă 12 puncte pe conținut și 8 pe redactare. Cele 8 vin doar dacă ai atins minimumul de cuvinte și ai dezvoltat subiectul.',
        'Rubricile, câte un punct, sunt paragrafele, legătura ideilor, vocabularul, gramatica, claritatea, ortografia, punctuația și scrisul care se citește.',
        'Titlul și motto-ul nu se cer. Un citat nu este obligatoriu. La A8, sprijinul pe text face 2 puncte. La B5, două substantive în același caz aduc un singur punct.',
        'La B7 copiezi subordonata întreagă, cu elementul de relație, și îi spui felul pe nume: completivă directă, nu doar completivă.'
      ].join('\n\n'),
      example: [
        'La A5, dacă la enunțul despre narator pui și adevărat, și fals, rândul este zero.',
        'La A8, răspunsul are trei piese: părerea, motivul și un fapt din text. Conectorii nu se cer aici. Ei se punctează la compunerea argumentativă.',
        'O compunere de 140 de cuvinte pierde și conținutul subțire, și cele 8 puncte de redactare.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'B7. Fraza este Mara știe că trenul pleacă la șase. Transcrii că trenul pleacă la șase și scrii completivă directă. Dacă scrii doar completivă, numele este incomplet.'
        }
      ],
      tryThis: 'Desenează pe caiet patru căsuțe: A 38, B 32, compunerea 20, din oficiu 10. Notează cele opt rubrici de redactare și regula de la A5. Scrie, într-un rând, cele trei piese de la A8 și regula de la B7.',
      keyPoints: [
        'Lectura aduce 38, limba 32, compunerea 20, iar 10 se dau din oficiu.',
        'La itemii de 6 puncte, limita și normele au fiecare câte un punct.',
        'Redactarea de 8 puncte cere text dezvoltat și minimumul de cuvinte.'
      ]
    }),
    lesson({
      id: 'algoritmul-frazei',
      title: 'Cum transcrii o subordonată',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Trei pași',
          text: 'Numeri predicatele, desparți propozițiile și pui întrebarea de la regentă. Elementul de relație intră în transcriere.'
        },
        {
          type: 'definitie',
          title: 'Cele două dese',
          text: 'Completiva directă răspunde la ce sau pe cine. Atributiva spune ceva despre un substantiv.'
        }
      ],
      theory: [
        'Fraza este bucata de clasa a VIII-a care apare în lucrările citite. Câte predicate ai, atâtea propoziții ai.',
        'Regenta este verbul sau substantivul de care depinde bucata. Întrebarea pleacă de acolo, nu de la primul cuvânt care seamănă a legătură.',
        'În programă intră atributiva, completiva directă, completiva indirectă, completiva prepozițională și circumstanțialele de loc, timp, mod, cauză și scop.',
        'Cel mai des se cer completiva directă și atributiva. Directa stă adesea cu că, să, dacă, cine sau ce. Atributiva stă adesea cu care, ce sau unde.',
        'Mai rar apar timpul, cu când, modul, cu cum, cauza, cu pentru că, scopul, cu pentru a sau cu să, și completiva prepozițională, după un verb care cere prepoziție.',
        'Nu sunt item de transcriere: subiectiva, predicativa, condiționala, concesiva și consecutiva. Le recunoști ca formă, nu le exersezi ca set.',
        'Fără sprijin, tot a reușit este o piedică care nu oprește fapta. Este un grup, nu o subordonată de examen.',
        'Scena de lucru are șapte fraze. Mara știe că trenul pleacă la șase. Cartea care stă pe masă este a ei. Când se înserează, pleacă.',
        'Vorbește cum a învățat. A tăcut pentru că îi era dor. A plecat pentru a o revedea. Se gândește la ce urmează.'
      ].join('\n\n'),
      example: [
        'În prima frază, predicatele sunt știe și pleacă. Regenta este știe. Întrebarea este ce știe. Transcrii că trenul pleacă la șase. Felul este completivă directă. Elementul este că.',
        'În a doua, stă și este. Care stă pe masă ține de cartea. Întrebarea este care carte. Felul este atributivă.',
        'Când se înserează este de timp. Cum a învățat este de mod. Pentru că îi era dor este cauzală. Pentru a o revedea este finală.',
        'La ce urmează este completivă prepozițională, pentru că a se gândi cere la.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Mara vrea să prindă trenul. Predicate: vrea și prindă. Subordonata este să prindă trenul. Întrebarea este ce vrea. Felul: completivă directă. Elementul să este și conjuncție, și marca conjunctivului.'
        }
      ],
      practice: [
        '1) Transcrie subordonata din Mara știe că trenul pleacă la șase și spune felul.',
        '2) Transcrie subordonata din Cartea care stă pe masă este a ei și spune de ce cuvânt ține.',
        '3) Deosebește pentru că îi era dor de pentru a o revedea, fiecare cu felul ei.'
      ].join('\n\n'),
      answers: [
        'că trenul pleacă la șase; completivă directă',
        'care stă pe masă; ține de cartea; atributivă',
        'prima este cauzală, a doua este finală'
      ],
      mistakes: 'Dacă lași elementul de relație afară, transcrierea este incompletă. Dacă scrii doar completivă, fără directă, numele nu este cel cerut.',
      tryThis: 'Construiește o atributivă cu care și o completivă directă cu să. Spune, într-un rând, cele cinci feluri care nu se cer ca item.',
      keyPoints: [
        'Numărul predicatelor îți dă numărul propozițiilor.',
        'Directa răspunde la ce și se copiază cu că sau cu să.',
        'Atributiva ține de un nume și se copiază cu care.'
      ]
    }),
    lesson({
      id: 'doom-capcane',
      title: 'Ortografia care aduce șase puncte',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'S-a și sa',
          text: 'S-a este verb: s-a dus. Sa este posesiv: cartea sa. La fel, să-i este cu cratimă, nu sa-i.'
        },
        {
          type: 'atentie',
          title: 'Decât',
          text: 'Decât cere negație: Nu am decât un caiet. Fără negație se spune doar: Am doar un caiet.'
        }
      ],
      theory: [
        'Itemul de ortografie este în fiecare lucrare și face 6 puncte. Aceleași forme pot lua și punctul de norme de la răspunsurile deschise.',
        'Ia-ți este imperativ, cu ți: ia-ți caietul. I-ați este voi ați luat: i-ați dat cartea.',
        'Fi, fără al doilea i, este conjunctivul și infinitivul: să fi, a fi. Fii, cu doi i, este imperativul: Fii atent.',
        'Copii este pluralul nearticulat. Copiii este pluralul articulat. La fel stau membri și membrii, negri și negrii. Kilometri rămâne fără doi i la final.',
        'Articolul posesiv se acordă cu obiectul posedat: al, a, ai, ale. Cărei și căror țin de posesor. În fata al cărei caiet, al ține de caiet, cărei de fată.',
        'Bineînțeles și deodată se scriu într-un cuvânt. Înnorat are doi n. La genitiv-dativ: cenușii, plajei, livezii, Mariei.',
        'Condiționalul: mi-ar plăcea, ar apărea. Aceea este feminin singular. Aceia este masculin plural. Fiica și ideea se scriu cu i.',
        'A creat, perfectul compus, are a despărțit. Raporturi înseamnă legături. Rapoarte înseamnă dări de seamă sau câturi.',
        'Prefer mai bine este dublare. Se spune Prefer cartea sau Îmi place mai mult cartea. Europeni se scrie cu e mic când nu deschide propoziția.',
        'Solitari înseamnă singuri. Solidari înseamnă uniți. Datorită stă la o cauză primită ca bună: Datorită păcii, a rămas. Pentru o cauză rea se spune din cauza.'
      ].join('\n\n'),
      example: [
        'Nu am decât un caiet este corect. Am decât un caiet nu este. S-a dus și cartea sa despart verbul de posesiv.',
        'Fii gata să fi acolo. Copiii din clasă și doi copii. I-am scris Mariei. Mi-ar plăcea să apară. Fata aceea, nu aceia.',
        'Prefer drumul pe jos. Ei sunt solidari cu colegul care a rămas singur, deci nu sunt solitari.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Băiatul a cărui carte stă pe bancă. A se acordă cu cartea. Căruia nu încape aici: posesorul este băiatul, deci cărui, iar obiectul este cartea, deci a.'
        }
      ],
      practice: [
        '1) Alege forma corectă: Nu am decât un caiet sau Am decât un caiet.',
        '2) Completează: Fii gata să … acolo. Copiii din clasă și doi ….',
        '3) Corectează: Prefer mai bine drumul. Datorită furtunii am întârziat.'
      ].join('\n\n'),
      answers: [
        'Nu am decât un caiet',
        'fi; copii',
        'Prefer drumul. Din cauza furtunii am întârziat.'
      ],
      mistakes: 'Fii cu doi i nu este să fi. Datorită nu se pune la o cauză rea. Aceea nu se schimbă cu aceia când e vorba de o fată.',
      tryThis: 'Scrie câte un enunț cu s-a și sa, cu ia-ți și i-ați, cu copii și copiii. Pune genitivul la plajă, livadă și Maria. Spune diferența dintre raporturi și rapoarte.',
      keyPoints: [
        'S-a este verb, iar sa este posesiv.',
        'Decât stă numai lângă o negație.',
        'Datorită cere o cauză bună; din cauza cere una rea.'
      ]
    }),
    lesson({
      id: 'cinci-compuneri',
      title: 'Cinci tipuri, același minim',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Minimul',
          text: 'Compunerea cere, de regulă, cel puțin 150 de cuvinte. Rezumatul ține limita scrisă pe foaie. Conținutul face 12 puncte.'
        }
      ],
      theory: [
        'Subiectul al II-lea schimbă tipul de la o sesiune la alta. În lucrările citite au apărut toate cinci. Caracterizarea a fost cea mai deasă, dar nu este garantată.',
        'La caracterizare: două date de identificare, câte un punct; două trăsături morale, câte un punct. Pentru fiecare trăsătură, o secvență comentată face 2 puncte. Citatul fără comentariu ia un singur punct.',
        'Două mijloace de caracterizare fac câte un punct. Aprecierea personală face 2 puncte. Direct înseamnă că naratorul sau un personaj spune trăsătura. Indirect înseamnă că ea iese din faptă, vorbă sau gest.',
        'Rezumatul: ideile importante fac 6 puncte, ordinea 2, regulile 4. Regulile sunt persoana a III-a, fără citate și fără dialog, timpuri potrivite și ton neutru.',
        'La mesajul unui text liric: mesajul un punct, tema un punct, elementele tabloului 4, două figuri cu numele și cu interpretarea, emoția 2 puncte.',
        'Argumentativul are ipoteză, două argumente dezvoltate cu sprijin în text, concluzie și conectori, aceștia din urmă 2 puncte.',
        'Narativul cu descriere și dialog: potrivirea cu cerința 4 puncte, trăsăturile narațiunii 4, descrierea de cel puțin 30 de cuvinte 2 puncte, dialogul de cel puțin 4 replici 2 puncte.',
        'Interviul, jurnalul, e-mailul și piesa de teatru nu au fost cerute ca tip de compunere în lucrările citite. Le știi la nivel de bază, când apar la școală, fără să le iei drept foaia sigură.'
      ].join('\n\n'),
      example: [
        'Cerința este caracterizare. Planul, în cinci rânduri: Radu, elev sărac din sat; bun și răbdător; naratorul spune bunătatea, iar deprinderea cu orașul arată răbdarea; mijloacele sunt direct și indirect; aprecierea este că scrisoarea învățătorului i-a deschis școala.',
        'Dacă scrii era bun, fără secvență, secvența cade la un punct sau la zero. Dacă scrii un rezumat la persoana I, cu dialog, pierzi regulile.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Narativ. Descrierea curții are 40 de cuvinte, deci trece de 30. Dialogul are patru replici: două ale mamei și două ale băiatului. Sub 4 replici, punctul de dialog cade.'
        }
      ],
      tryThis: 'Copiază cele cinci grile, cu punctele, pe o pagină. Pentru caracterizare, scrie planul pe Radu în cinci rânduri, fără să dezvolți încă. Pentru rezumat, scrie cele patru reguli. Spune de ce un citat fără comentariu nu ia ambele puncte ale secvenței.',
      keyPoints: [
        'Cele cinci tipuri împart aceleași 12 puncte de conținut, cu grile diferite.',
        'Caracterizarea cere două secvențe comentate, nu două etichete goale.',
        'La narativ, descrierea are cel puțin 30 de cuvinte, iar dialogul cel puțin patru replici.'
      ]
    }),
    lesson({
      id: 'vers-la-prima-vedere',
      title: 'Mesajul unui text liric',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Cinci piese',
          text: 'Mesajul este ideea pe care o ia cititorul. Tema este domeniul. Tabloul sunt lucrurile văzute sau auzite. Figurile se copiază și se numesc. Emoția stă într-o frază.'
        }
      ],
      theory: [
        'Poezia cade rar ca text-suport. Când cade, aduce versificația la A6 și mesajul la compunere. Nu se lipește un poem învățat pe de rost.',
        'Măsura se numără pe rândul deschis, în silabe. Rima se spune după schemă: împerecheată aabb, încrucișată abab, îmbrățișată abba. Ritmul se simte. Nu se cere o formulă.',
        'La școală, textul poate fi o poezie de Mihai Eminescu al cărei titlu spune că, băiat fiind, cutreiera pădurile. Versurile nu se copiază aici.',
        'Trei note de dicționar rămân utile: a mânea înseamnă a rămâne peste noapte, preste înseamnă peste, bucium este instrumentul de suflat al ciobanilor.',
        'Scena de lucru ține loc de text. Titlul este Drumul de seară. Seara, pe poteca dintre fagi, băiatul se oprește lângă izvor. Își pune mâna sub cap, iar apa sună încet.',
        'O ceață argintie stă pe câmp. Un bucium cântă tainic. Mesajul: liniștea serii ține loc de adăpost. Tema: seara în natură. Tabloul: poteca, izvorul, ceața, buciumul.',
        'Tainic înseamnă misterios. Argintie vine din argint, prin derivare cu sufixul -ie. Diftongi: ea în seara, ia în băiat, iu în bucium, ai în tainic.',
        'Virgula dinaintea lui iar desparte două propoziții coordonate. În Un bucium cântă tainic, bucium este subiect, cântă este predicat verbal, tainic este circumstanțial de mod.',
        'Apa sună este personificare. Ceață argintie este epitet. Ceața, eșarfă pe câmp, este metaforă. Apa sună ca un glas subțire este comparație.'
      ].join('\n\n'),
      example: [
        'Ce scrie: seara, băiatul stă lângă izvor, cu mâna sub cap, iar un bucium cântă tainic. Ce vezi: îl văd culcat lângă apă, cu ceața pe câmp.',
        'Eu aș rămâne până se stinge sunetul, pentru că buciumul cântă tainic. Pentru mesaj: liniștea este adăpost, tema este seara, tabloul are patru elemente, două figuri sunt personificarea și epitetul, emoția este calmul.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Rând inventat, de numărat: Sea-ra stă pe po-te-că. Dacă îți ies opt silabe, măsura este 8. Nu lua numărul din memorie pentru un vers care nu este în față.'
        }
      ],
      tryThis: 'Pe scena Drumului de seară, scrie ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu Îl văd. Completează grila de mesaj. Spune un sinonim pentru tainic și formarea lui argintie. Analizează bucium, cântă și tainic.',
      keyPoints: [
        'Mesajul liric se punctează pe mesaj, temă, tablou, două figuri interpretate și emoție.',
        'Măsura se numără pe rândul din față, nu dintr-un poem ținut minte.',
        'A mânea înseamnă a rămâne peste noapte, iar bucium este instrumentul ciobanilor.'
      ]
    }),
    lesson({
      id: 'baiatul-din-sat',
      title: 'Caracterizarea lui Radu',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Grila scurtă',
          text: 'Două date, două trăsături, câte o secvență comentată, două mijloace și o apreciere. Minimum 150 de cuvinte.'
        }
      ],
      theory: [
        'Caracterizarea este compunerea cea mai deasă în sesiunile reale. O etichetă goală nu ține loc de secvență. Fiecare trăsătură se arată pe un fapt.',
        'Direct: naratorul sau un personaj spune trăsătura. Indirect: ea iese din faptă, vorbă sau gest. La urmă stă aprecierea ta, nu o morală lipită.',
        'Faptele scenei, spuse aici pe scurt. Radu învățase bine clasele primare, în sat, la domnul Ghervescu. Era cuminte și avea drag de carte.',
        'Învățătorul i-a scris un răvaș fratelui său, preot la București: băiatul este sărac și vrea să învețe mai departe. Fratele l-a primit.',
        'Ilinca, mama, i-a pregătit lucrurile în grabă. S-a despărțit de singurul ei copil când strugurii începeau să se coacă. I-a spus să nu uite casa.',
        'Radu s-a deprins cu orașul, pentru că era bun, supus și răbdător. Răvaș înseamnă scrisoare. Pârguit înseamnă care începe să se coacă. Autorul paginii de la școală este Alexandru Vlahuță.',
        'Date: Radu, elev sărac din sat. Bun este spus de narator, deci direct. Răbdător se vede și în același predicat, și în faptul că se deprinde, deci și indirect.',
        'Linia de dialog, pusă înaintea vorbelor, arată că vorbește Ilinca, nu naratorul. În enunțul cu s-a deprins, Radu este subiect, s-a deprins este predicat verbal, iar era băiat bun este predicat nominal în cauzală.',
        'Fraza cu dar: Radu era sărac, dar voia să învețe. Binefacere este compunere, bine pus lângă facere. Ideea principală: un băiat sărac pleacă la gimnaziu. Ideea secundară: despărțirea cade la începutul coacerii.',
        'Pentru asociere, valoarea este șansa de a învăța. Textul de rezervă se prezintă cu titlu și autor, într-o frază. La examen, textul trebuie să fie literar și studiat.'
      ].join('\n\n'),
      example: [
        'Ce scrie: când strugurii încep să se coacă, Ilinca îl lasă pe Radu să plece, iar el se deprinde pentru că este bun și răbdător.',
        'Ce vezi: o văd la poartă, cu lacrimi, și traista în mâna lui. Eu aș scrie un răvaș din drum, pentru că ea i-a cerut să nu uite.',
        'Secvență comentată: naratorul spune că era răbdător, iar deprinderea cu orașul arată că răbdarea nu rămâne un adjectiv, ci o faptă. Apreciere: scrisoarea învățătorului i-a deschis școala unui copil sărac.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Trăsătura drag de carte este indirectă dacă o arăți prin clasele primare învățate bine, nu prin eticheta silitor. Comentariul spune ce fapt dovedește dragostea de carte.'
        }
      ],
      tryThis: 'Scrie ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu O văd. Apoi schițează caracterizarea pe grila de 12 puncte, în cinci rânduri. Construiește fraza cu dar. Formulează ideea principală și pe cea secundară.',
      keyPoints: [
        'Radu este elev sărac din sat și pleacă mai departe pentru că învățătorul a scris un răvaș.',
        'Bunătatea este spusă de narator, iar răbdarea se vede și în deprindere.',
        'Răvaș înseamnă scrisoare, iar fiecare trăsătură cere o secvență comentată.'
      ]
    }),
    lesson({
      id: 'limba-pe-rand',
      title: 'Grilele scurte de limbă',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei procedee',
          text: 'Derivarea adaugă un afix. Compunerea lipește două cuvinte cu sens. Conversiunea schimbă partea de vorbire, fără afix.'
        },
        {
          type: 'regula',
          title: 'B6',
          text: 'Enunțul ia punctul doar dacă tipul, cazul, funcția și semnul final sunt toate respectate.'
        }
      ],
      theory: [
        'B1 este fonetică: aproape mereu diftong, uneori hiat, silabe sau accent. Diftongul stă într-o silabă: ea, ia, iu, ai, oa. Hiatul desparte vocalele în silabe vecine: fi-ință.',
        'B2 este formarea. Cel mai des se cere derivarea, cu prefix sau sufix, inclusiv diminutivul. Uneori se cere deosebirea dintre derivare, compunere și conversiune.',
        'Binefacere și deodată sunt compuse. Argintie și neașteptat sunt derivate. Bine, adverb, devine substantiv în un bine: aceasta este conversiune.',
        'B3 și B4 sunt vocabular în context. Cade des sensul unei secvențe, apoi omonimul, mai rar antonimul și sinonimul. Sinonimul trebuie să încapă în frază.',
        'Omonimul păstrează forma și schimbă sensul: somn, peștele, și somn, odihna. Paronimul seamănă: solitar și solidar, destins și distins. Ursuz înseamnă morocănos.',
        'B6 cere două enunțuri cu toate condițiile. Un model: enunț interogativ, substantiv în dativ, complement indirect. Cui i-ai scris? I-am scris Mariei?',
        'Verbul predicativ arată acțiunea. Verbul copulativ leagă subiectul de numele predicativ: a fi, a ajunge, a deveni, a însemna, când nu spun o acțiune de sine stătătoare.',
        'Este învingător este copulativ. Este în parc este predicativ, pentru că în parc spune locul, nu o însușire.'
      ].join('\n\n'),
      example: [
        'Pescarii au prins un somn mare. Mie îmi este somn. Primul somn este pește, al doilea este odihnă.',
        'Neașteptat este derivare. Binefacere este compunere. Un bine făcut la timp: bine este substantiv, prin conversiune.',
        'El a ajuns campion: a ajuns este copulativ, campion este nume predicativ. El a ajuns în gară: a ajuns este predicativ, în gară este circumstanțial de loc.',
        'I-am scris Mariei? respectă interogativul, dativul și complementul indirect.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ființă se desparte fi-in-ță. Vocalele i și i din mijloc stau în silabe vecine: hiat. Nu le lipi într-un diftong.'
        }
      ],
      practice: [
        '1) Scrie două enunțuri în care somn are sensuri diferite.',
        '2) Spune procedeul pentru neașteptat, binefacere și un bine.',
        '3) Deosebește a ajuns campion de a ajuns în gară.',
        '4) Alege un sinonim pentru ursuz care încape în Nicio față nu era ursuză.'
      ].join('\n\n'),
      answers: [
        'Pescarii au prins un somn. Mie îmi este somn.',
        'derivare; compunere; conversiune',
        'primul este copulativ, al doilea este predicativ',
        'morocănoasă'
      ],
      mistakes: 'Un sinonim care nu încape în frază nu ia punctul. A ajuns campion nu se etichetează predicativ doar pentru că verbul este a ajunge.',
      tryThis: 'Construiește un enunț interogativ cu un substantiv în dativ, complement indirect, și unul asertiv cu un substantiv în genitiv, atribut. Desparte ființă și numește hiatul.',
      keyPoints: [
        'Diftongul stă într-o silabă, iar hiatul stă între silabe.',
        'Somn este și pește, și odihnă, după frază.',
        'A ajuns campion este copulativ, iar a ajuns în gară este predicativ.'
      ]
    })
  ]
};
