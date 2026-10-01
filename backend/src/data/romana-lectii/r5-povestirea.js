'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = {
  id: 'povestirea',
  title: 'Fascinația povestirii',
  inOwnWords: 'Unitatea 3 e textul narativ: acțiune, personaje, timp, spațiu, personificare, apoi verbul la imperativ și la indicativ. Se închide cu banda desenată. Scenele sunt în lecții. Povestea de reper se numește Prințul fericit, de Oscar Wilde. La clasă titlul poate fi altul.',
  toc: [
    'Textul narativ literar. Personificarea (Prințul fericit, de Oscar Wilde)',
    'Acțiunea, personajele, timpul și spațiul',
    'Verbul. Modurile. Imperativul. Comunicarea nonverbală. Punctuația',
    'Indicativul: prezent, imperfect, perfect compus, perfect simplu, mai-mult-ca-perfect, viitor',
    'Secvența narativă',
    'Banda desenată și comunicarea nonverbală',
    'Recapitulare și evaluare'
  ],
  glossary: [
    {
      term: 'text narativ',
      meaning: 'Spune întâmplări imaginare, cu personaje, în timp și spațiu.'
    },
    {
      term: 'personificare',
      meaning: 'Un lucru, un animal sau un fenomen primește o faptă de om.'
    },
    {
      term: 'mod',
      meaning: 'Felul în care vorbitorul privește acțiunea: fapt, posibil, condiție sau cerere.'
    },
    {
      term: 'imperativ',
      meaning: 'Modul cu care ceri, îndemni, rogi, sfătuiești sau interzici, la persoana a II-a.'
    },
    {
      term: 'secvență narativă',
      meaning: 'O bucată cu o situație, o schimbare și un rezultat, nu toată cartea.'
    },
    {
      term: 'indicativ',
      meaning: 'Modul care prezintă acțiunea ca pe un fapt, în prezent, trecut sau viitor.'
    },
    {
      term: 'imperfect',
      meaning: 'Timp trecut pentru o acțiune care durează sau se repetă.'
    },
    {
      term: 'perfect compus',
      meaning: 'Timp trecut compus din a avea și participiu, pentru o acțiune încheiată.'
    },
    {
      term: 'perfect simplu',
      meaning: 'Timp trecut simplu, pentru o acțiune încheiată, vie în povestire.'
    },
    {
      term: 'mai-mult-ca-perfect',
      meaning: 'Acțiune trecută, terminată înaintea altei acțiuni trecute.'
    },
    {
      term: 'bandă desenată',
      meaning: 'Povestire în cadre, unde desenul cântărește mai mult decât vorba.'
    },
    {
      term: 'onomatopee',
      meaning: 'Cuvânt care imită un zgomot, o acțiune sau un sunet.'
    },
    {
      term: 'pantomimă',
      meaning: 'Povestire spusă doar prin gest, fără cuvinte.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-poveste',
      title: 'Poveștile care se transmit',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Întâmplarea care circulă',
        text: 'O povestire este o întâmplare dusă dintr-o locuință în alta. Merge pe voce sau rămâne pe hârtie, ca să nu se risipească.'
      }],
      theory: [
        'Oamenii poartă întâmplarea mai departe. Când o spui, trece prin voce. Când o așezi în caiet, poate fi recitită.',
        'Aceeași întâmplare poate stârni râsul. Poate aduce tristețe. Poate ține curiozitatea trează până afli continuarea.',
        'Cuvântul pentru curiozitatea aceasta este suspans. Vrei să știi ce urmează și nu închizi povestea la jumătate.',
        'Unitatea de acum reia două piese deja cunoscute. Personajul este cel care face. Verbul arată fapta.',
        'Pașii noi încep cu textul narativ literar. După el vine personificarea, apoi imperativul și indicativul.',
        'Ținta se leagă de cinci competențe, nu de cinci lecții separate. Codurile sunt 1.1 și 2.3. Urmează 3.1. La urmă stau 4.4 și 5.2.',
        'Pe voce, întâmplarea sare de la un prag la altul și se poate schimba puțin. Pe hârtie, faptele rămân așezate.',
        'Personificarea dă unui lucru sau unei ființe un gest de om. O recunoști mai târziu, pe o scenă scurtă, nu din titlul unității.',
        'Imperativul cere, îndeamnă sau oprește. Indicativul arată fapta drept ceva sigur, în clipa de acum, în trecut sau mai târziu.',
        'Când scrii cum circulă povestea, folosești amuză și întristează. Adaugi suspans, personaj și verb. Nu uiți narativ, personificare, imperativ și indicativ.',
        'Codurile se notează pe rând, ca să se vadă că țin de toată unitatea. Niciun cod, luat singur, nu închide drumul.',
        'La clasă, titlul de pe bancă poate fi altul. Ordinea rămâne: întâi circulația poveștii, apoi piesele noi.'
      ].join('\n\n'),
      example: [
        'Pe voce, întâmplarea trece pragul. Pe hârtie, poate fi recitită. Poate amuza, poate întrista sau poate ține suspansul.',
        'Personajul cu verbul revin în lucru. Noutățile sunt narativul literar și personificarea, apoi imperativul cu indicativul. Codurile se notează despărțit: 1.1 cu 2.3, după ele 3.1, iar 4.4 stă lângă 5.2.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă povestea se spune la masă, circulă prin voce. Dacă stă într-un caiet, întâmplarea poate fi reluată. Efectul poate fi râs, tristețe sau așteptare.'
      }],
      tryThis: [
        'Scrie două enunțuri. În primul arată cum aceeași întâmplare ajunge dintr-o locuință în alta prin voce.',
        'În al doilea arată drumul pe hârtie. Pune amuză ori întristează, apoi suspansul. Mai pune personajul, verbul și narativul. Închide cu personificarea, imperativul și indicativul. Codurile le scrii cu pauze: 1.1 lângă 2.3, apoi 3.1, la urmă 4.4 împreună cu 5.2.'
      ].join('\n\n'),
      keyPoints: [
        'Întâmplarea circulă prin voce sau pe hârtie și poate amuza, întrista ori ține curiozitatea.',
        'Drumul reia personajul și verbul, apoi adaugă narativul literar, personificarea, imperativul și indicativul.',
        'Unitatea are cinci coduri, scrise cu pauze: 1.1 lângă 2.3, apoi 3.1, iar 4.4 rămâne împreună cu 5.2.'
      ]
    }),
    lesson({
      id: 'narativ',
      title: 'Textul narativ și indiciile',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Narativ și descriere',
        text: 'Textul narativ literar are întâmplări închipuite și personaje făcute de autor. Dacă nu se schimbă nimic, textul rămâne descriere.'
      }],
      theory: [
        'Personajele sunt participanți închipuiți. Autorul îi creează. Ei nu sunt oameni pe care îi chemi din clasă.',
        'Acțiunea este șirul de schimbări. Timpul spune când se petrece fapta. Spațiul spune unde se petrece.',
        'Descrierea arată locul și clipa, fără o întâmplare care să miște lucrurile. O curte tăcută, în care nu se petrece nimic, rămâne descriere.',
        'Semnele care arată când și unde se numesc indicii. Le strângi din mai multe locuri. Un singur cuvânt nu hotărăște.',
        'Scena: un băiat lasă caietul pe bancă. Înainte de clopoțel se întoarce după el. Este dimineață, în clasă.',
        'Afară ninge de câteva ore. O rândunică stă pe pervaz. Din indicii, timpul este iarna, iar locul este lângă geam.',
        'Dacă un personaj rostește Africa doar ca amintire, scena nu se mută acolo. Egiptul pomenit într-o replică nu mută singur fapta.',
        'Păsările lipsesc de câteva săptămâni. Semnul arată că anul este târziu, chiar dacă nimeni nu spune luna.',
        'Din scenă faci trei mișcări. Notezi ce stă scris. Spui ce observi. Apoi alegi o faptă a ta, iar motivul stă după pentru că.',
        'Observația începe cu Văd, ca să se vadă că tu privești indiciile, nu că le inventezi.',
        'La clasă repeți aceleași trei mișcări pe textul deschis. Un nume de țară, rostit în treacăt, nu schimbă locul faptei.',
        'Dacă aduni ninsoarea, rândunica și întoarcerea înainte de clopoțel, timpul și spațiul se citesc împreună, nu dintr-un cuvânt izolat.'
      ].join('\n\n'),
      example: [
        'Ce scrie: dimineața, în clasă, băiatul uită caietul și revine înainte de clopoțel. Ninge. Rândunica stă pe pervaz.',
        'Ce vezi: Văd băiatul, caietul, ninsoarea și rândunica. Aș aștepta lângă bancă, pentru că el se întoarce după caiet înainte de clopoțel.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă în amintire apare Egiptul, fapta tot în clasă se petrece. Holul gol, fără nicio schimbare, rămâne descriere, nu narativ.'
      }],
      tryThis: [
        'După ore, în curtea școlii, o fată rămâne fără mănușă. O caută și dă de ea sub o bancă. Cerul stă gri de multe zile, iar frunzele s-au dus de săptămâni.',
        'Cineva pomenește Egiptul, însă întâmplarea nu părăsește curtea. Holul fără nicio mișcare rămâne o descriere. Alcătuiți trei enunțuri: ce stă scris, ce observi, ce ai alege, cu pentru că. Ce observi începe cu Văd.'
      ].join('\n\n'),
      keyPoints: [
        'Narativul literar mută întâmplări închipuite, cu personaje create de autor, într-un timp și într-un spațiu.',
        'Indiciile se adună. Un nume de loc rostit în amintire nu mută scena, iar lipsa întâmplării lasă descrierea.',
        'Din scenă notezi ce stă scris, ce observi și ce ai alege, cu pentru că.'
      ]
    }),
    lesson({
      id: 'asteptari-titlu',
      title: 'Așteptarea din titlu și părerea',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Titlu și părere',
        text: 'Titlul trezește o idee înainte să citești. După text, ideea se adeverește sau cade. Judecata despre un om se poate muta când apare o faptă nouă.'
      }],
      theory: [
        'Așteptarea o spui în două mișcări. Întâi notezi ce ai bănuit doar din titlu. Apoi notezi ce ți-a arătat lectura.',
        'Un titlu proaspăt lasă un semn. Nu reia episodul întreg și nu ține locul textului.',
        'Judecata despre un om se poate muta. Când apar fapte noi, părerea de la început nu mai stă pe loc.',
        'Nu orice voce ține aceeași atitudine de la primul rând la ultimul. Urmărești trei momente: începutul, mijlocul și finalul.',
        'La schimbare arăți de ce. De ce-ul este fapta apărută acum, nu doar concluzia goală.',
        'Titlul Pisica cea curajoasă promite un animal îndrăzneț. În poveste, pisica se pitulează de frică. Așteptarea pică.',
        'Colegii o văd întâi pe Mara ca rea, pentru că se ține deoparte. Mai târziu o văd împărțind micul dejun. Împărțirea este fapta nouă.',
        'La sfârșit o numesc timidă, nu rea. Un titlu făcut după episod dă numai un semn, fără să repete toată scena.',
        'Din scenă faci trei mișcări. Notezi ce stă scris. Spui ce observi, începând cu Văd. Apoi alegi o faptă a ta, legată prin pentru că.',
        'Dacă sari peste fapta nouă, schimbarea de părere rămâne neexplicată. Rezultatul, singur, nu ajunge.',
        'La clasă aplici aceleași mișcări pe textul deschis. Titlul se citește întâi, textul se citește apoi, iar comparația vine la urmă.',
        'Două mișcări pentru titlu și trei pași pentru părere stau alături. Nu le amesteci într-o singură propoziție grăbită.'
      ].join('\n\n'),
      example: [
        'Ce scrie: titlul Pisica cea curajoasă promite îndrăzneală, dar pisica se ascunde. Mara împarte micul dejun, iar colegii o văd timidă, nu rea.',
        'Ce vezi: Văd pisica pitită și pe Mara lângă micul dejun. Aș sta lângă Mara, pentru că ea împarte micul dejun.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Un titlu care spune doar Câinele lasă indiciul, fără episodul întreg. Părerea se mută abia când apare fapta nouă, nu dintr-un singur cuvânt.'
      }],
      tryThis: [
        'Titlul Câinele cel fioros anunță un animal rău, însă câinele dă din coadă. Clasa îl ia pe Vlad drept leneș, pentru că tace la oră.',
        'Apoi rămâne și ajută la curățenie. Ajutorul este fapta nouă. La sfârșit îl numești tăcut, nu leneș. Titlul nou dă numai un semn. Alcătuiți trei enunțuri: ce stă scris, ce observi, ce ai alege, cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Două mișcări ajung pentru titlu: bănuiala de dinainte și ce a arătat lectura.',
        'Părerea se citește la început, la mijloc și la final, iar motivul este fapta apărută acum.',
        'Titlul Pisica cea curajoasă se contrazice când pisica se ascunde, iar Mara trece de la rea la timidă după micul dejun împărțit.'
      ]
    }),
    lesson({
      id: 'personificare',
      title: 'Personificarea',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Gest de om',
        text: 'Personificarea dă unui lucru, unui fenomen sau unui animal o faptă de om. Comparația, legată prin ca, nu preface lucrul în om.'
      }],
      theory: [
        'O statuie care privește, vorbește sau plânge intră la personificare. Gestul ține de om, deși subiectul nu este om.',
        'Comparația stă altfel. Se sprijină pe ca. Lucrul rămâne lucru și nu capătă un gest omenesc.',
        'Animalul intră aici numai dacă primește un gest omenesc. Dacă doar aleargă, rămâne animal.',
        'În curte, fântâna se uită și oftează. Un lucru face gesturi de om, deci procedeul este personificare.',
        'Vântul șoptește la geam. Un fenomen primește o acțiune de om. Și acesta este personificare.',
        'Statuia care plânge face o faptă de om. Privitul, vorbitul și plânsul sunt semnele pe care le cauți.',
        'Enunțul fântâna rece ca gheața rămâne comparație. Apare ca, iar fântâna nu se preface în om.',
        'Din scenă faci trei mișcări. Notezi ce stă scris. Spui ce observi, cu Văd. Apoi alegi o faptă a ta, motivată prin pentru că.',
        'Nu pune personificare pe orice animal. Câinele care aleargă nu vorbește și nu oftează, deci procedeul lipsește.',
        'La clasă, pe textul deschis, cauți întâi fapta. Dacă fapta este de om și subiectul nu este om, notezi personificare.',
        'Dacă vezi ca, precum sau un al doilea termen, verifici comparația înainte să scrii personificare.',
        'O scenă poate avea ambele procedee, în enunțuri diferite. Le numeri separat, nu le lipești într-o singură etichetă.'
      ].join('\n\n'),
      example: [
        'Ce scrie: fântâna se uită spre curte și oftează. La geam, vântul șoptește. Statuia plânge. Rece ca gheața, fântâna rămâne la comparație.',
        'Ce vezi: Văd fântâna, geamul și statuia. Aș rămâne lângă fântână, pentru că ea privește și oftează.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Norul alb ca laptele ține comparația, fiindcă apare ca. Soarele care râde peste acoperișuri primește o faptă de om, deci este personificare.'
      }],
      tryThis: [
        'Statuia stă de vorbă cu piața și plânge sub ploaie. Soarele râde deasupra acoperișurilor, deci fenomenul capătă un gest de om. Câinele numai aleargă, deci gestul de om lipsește.',
        'Norul este alb ca laptele. Legătura ca ține comparația și nu preface norul în om. Alcătuiți trei enunțuri: ce stă scris, ce observi, ce ai alege, cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Personificarea se recunoaște după fapta de om dată unui lucru, unui fenomen sau unui animal.',
        'Comparația păstrează pe ca și nu transformă lucrul în om.',
        'Fântâna care oftează și vântul care șoptește stau la personificare, iar fântâna rece ca gheața stă la comparație.'
      ]
    }),
    lesson({
      id: 'compunere-narativa',
      title: 'Compunerea narativă',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Patru părți',
        text: 'Compunerea narativă povestește întâmplări în minimum patru alineate. Înăuntru stau începutul și motivul, fapta tăiată în două episoade sau în trei, apoi tensiunea și închiderea.'
      }],
      theory: [
        'Timpii verbului arată ordinea faptelor. Cititorul trebuie să vadă ce a fost întâi și ce a venit după.',
        'Poți adăuga o imagine, un desen sau o schiță. Ideea o iei, vorbele altcuiva nu le copiezi.',
        'Scena de lucru: un băiat găsește o mănușă. Vrea să o ducă la proprietar. Are început și motiv.',
        'Prima oprire este poarta. A doua oprire este magazinul. Două opriri înseamnă două episoade, deci cerința de două sau de trei este atinsă.',
        'Magazinul se închide. Acesta este momentul de tensiune. Nu știi, pentru o clipă, unde ajunge mănușa.',
        'La urmă o lasă la portar. Aceasta este închiderea. Timpii țin ordinea, de la găsire până la predare.',
        'Patru alineate sunt minimul. Poți avea mai multe dacă episoadele cer loc. Nu strânge totul într-un singur bloc.',
        'Din scenă faci trei mișcări. Notezi ce stă scris. Spui ce observi. Apoi alegi o faptă a ta, cu pentru că.',
        'Când scrii tu, ideea poate fi un copil care pierde o mănușă la poarta școlii. Vorbele sunt ale tale.',
        'Închizi cu alegerea ta, în forma Eu aș, urmată de pentru că. Alegerea se leagă de o faptă din textul tău.',
        'Imaginea, dacă o pui, nu înlocuiește episoadele. Tensiunea rămâne un moment în care ceva se poate pierde.',
        'La clasă, aceeași schemă se aplică pe o idee nouă. Începutul, motivul, episoadele, tensiunea și închiderea nu se sar.'
      ].join('\n\n'),
      example: [
        'Ce scrie: băiatul găsește mănușa și vrea să o înapoieze. Oprește la poartă, apoi la magazin. Magazinul trage oblonul. Predă mănușa portarului.',
        'Ce vezi: Văd mănușa în mâna băiatului, apoi poarta, magazinul și portarul. Aș preda mănușa portarului, pentru că oblonul magazinului cade.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă mai întreabă și la bibliotecă, apar trei episoade. Tensiunea poate fi soneria, iar închiderea tot predarea către portar.'
      }],
      tryThis: [
        'Scrie o compunere narativă în minimum patru alineate. Așază începutul și motivul, fapta în două episoade sau în trei, apoi tensiunea și închiderea.',
        'Ideea pleacă de la un copil care rămâne fără mănușă lângă poarta școlii. Vorbele sunt ale tale. Închide cu Eu aș, urmat de pentru că, despre o faptă din textul tău.'
      ].join('\n\n'),
      keyPoints: [
        'Compunerea narativă ține minimum patru alineate și o ordine clară a faptelor, dată de timpii verbului.',
        'Scheletul ține începutul cu motivul, episoadele, tensiunea și închiderea.',
        'Iei ideea, nu vorbele altcuiva, și poți adăuga o imagine fără să sari episoadele.'
      ]
    }),
    lesson({
      id: 'verbul',
      title: 'Verbul: acțiune, stare și timp',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Verbul',
        text: 'Verbul numește o faptă, un eveniment ori o stare care nu stă pe loc. Singur își schimbă înfățișarea după timp și după persoană, față de clipa în care vorbești.'
      }],
      theory: [
        'Timpul stă în trei locuri: clipa de acum, trecutul și viitorul. Lângă timp stau persoana și numărul. Conjugarea le ține laolaltă.',
        'În dicționar cauți infinitivul. Din alint ajungi la a alinta. Forma de lucru nu este forma de căutat.',
        'Verbul de acțiune arată ce ai făcut. Verbul de stare arată ce ai simțit, când te evaluezi.',
        'Șirul Mi-a plăcut să cere după el un verb de acțiune. Modelul este să desenez. Nu pui o stare în locul faptei.',
        'Șirul Am simțit că cere o stare. Modelul este că eram mândru. Aici nu pui o acțiune.',
        'Mai notezi ce ai reținut și de ce ți-a amintit lecția. Adaugi ce nu ți-a plăcut și ce vrei să știi. Toate stau la persoana întâi.',
        'Un model de reținut: norul ține gândul. Propoziția arată ce ai păstrat din lecție, nu o stare și nu o cerere.',
        'La a pleca, persoana întâi sună acum plec când ești în prezent. Trecutul sună ieri am plecat. Viitorul sună mâine voi pleca.',
        'Infinitivul lui plec este a pleca. La fel, alint se deschide în dicționar la a alinta. Nu căuta forma deja conjugată.',
        'Când amesteci acțiunea cu starea, evaluarea se încurcă. Desenez răspunde la ce ai făcut. Eram mândru răspunde la ce ai simțit.'
      ].join('\n\n'),
      example: [
        'Plec acum spre bibliotecă, la persoana întâi, deci prezent. Ieri am plecat mută fapta în trecut. Mâine voi pleca o duce în viitor. În dicționar stă a pleca.',
        'Mi-a plăcut să desenez cadrele pune acțiunea. Am simțit că eram mândru pune starea. Am reținut că norul ține gândul.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă scrii Mi-a plăcut să eram mândru, ai pus starea unde trebuia acțiunea. Forma bună desparte să desenez de că eram mândru.'
      }],
      practice: [
        '1) Ce arată verbul și după ce își schimbă forma, față de clipa vorbirii?',
        '2) La ce formă cauți în dicționar verbul din alint?',
        '3) Ce pui după Mi-a plăcut să și ce pui după Am simțit că?',
        '4) Pentru a pleca, la persoana întâi, dă forma de acum, forma de ieri și forma de mâine.'
      ].join('\n\n'),
      answers: [
        'Numește o faptă, un eveniment ori o stare care nu stă pe loc. Înfățișarea se schimbă după timp și după persoană. Mai contează numărul.',
        'La infinitiv: a alinta.',
        'După Mi-a plăcut să vine acțiunea, model să desenez. După Am simțit că vine starea, model că eram mândru.',
        'acum plec; pentru ieri, am plecat; pentru mâine, voi pleca.'
      ],
      mistakes: 'Nu căuta în dicționar forma alint. Caută a alinta. Nu pune o stare după Mi-a plăcut să și nu pune o acțiune după Am simțit că.',
      tryThis: [
        'Cu a pleca, scrie trei enunțuri: unul cu acum plec, unul cu ieri am plecat și unul cu mâine voi pleca.',
        'Notează infinitivul a pleca. Arată că alint se deschide la a alinta. Completează Mi-a plăcut să desenez și Am simțit că eram mândru.',
        'Spune ce ai reținut: gândul stă în nor. Notează separat ce nu ți-a plăcut. Spune ce vrei să știi. Închide cu motivul pentru care lecția ți-a amintit ceva.'
      ].join('\n\n'),
      keyPoints: [
        'Înfățișarea verbului ține de timp, de persoană și de număr, iar dicționarul îl dă la infinitiv.',
        'Acțiunea răspunde la ce ai făcut, starea răspunde la ce ai simțit.',
        'După Mi-a plăcut să vine o acțiune, după Am simțit că vine o stare, iar reflecția stă la persoana întâi.'
      ]
    }),
    lesson({
      id: 'moduri',
      title: 'Modurile verbului',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Modul',
        text: 'Modul arată cum privește vorbitorul fapta. Poate fi sigură. Poate fi dorită sau legată de o condiție. Mai poate fi posibilă ori cerută.'
      }],
      theory: [
        'Indicativul ia acțiunea drept fapt. Modelul scurt este citesc. Fapta este privită ca sigură.',
        'Forma să citesc lasă acțiunea ca posibilă. Nu este un fapt gata împlinit.',
        'Condiția se aude în aș citi dacă aș avea timp. Fără timp, cititul rămâne dorință legată.',
        'Citește, spus către cineva, este o cerere. Aceeași rădăcină poate fi sigură, apoi dorită, apoi condiționată. Mai poate fi posibilă ori cerută.',
        'Nu amesteca privirile. Dacă spui citesc, nu mai ești la posibil. Dacă spui să citesc, nu mai ești la fapt gata.',
        'Condiția se recunoaște după legătura dacă. Cererea se recunoaște după faptul că i te adresezi cuiva, la persoana a doua.',
        'Dorința poate sta lângă condiție, ca în aș citi. Posibilul stă lângă să. Siguranța stă la indicativ, fără să și fără dacă.',
        'Când numești privirea, spui sigură ori dorită, apoi condiționată. Mai spui posibilă și cerută. Nu le înlocui cu o literă.',
        'Patru enunțuri cu a citi ajung ca să arăți cele patru priviri de lucru: fapt, posibil, condiție și cerere.',
        'Indicativul din citesc rămâne modul faptului. Celelalte trei priviri nu îl înlocuiesc, ci arată altă atitudine a vorbitorului.'
      ].join('\n\n'),
      example: [
        'Sigur citesc povestea, deci indicativul ține faptul. Posibilul se aude în să citesc și nu e fapt gata. Condiția stă în aș citi dacă aș avea timp. Citește capitolul este cererea.',
        'Aceeași acțiune trece prin sigur, prin dorit și prin condiționat. Mai trece prin posibil și prin cerere, după forma aleasă.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă scrii doar citesc, lipsește condiția. Dacă scrii doar Citește, lipsește faptul sigur. Fiecare privire are forma ei.'
      }],
      practice: [
        '1) Ce este modul verbului?',
        '2) Ce privire arată citesc?',
        '3) Ce privire arată să citesc și ce privire arată aș citi dacă aș avea timp?',
        '4) Ce privire arată forma Citește?'
      ].join('\n\n'),
      answers: [
        'Felul în care vorbitorul privește fapta: sigură ori dorită, condiționată, posibilă sau cerută.',
        'O ia drept fapt sigur, la indicativ.',
        'să citesc lasă fapta doar posibilă. Șirul aș citi dacă aș avea timp stă sub o condiție.',
        'Este o cerere.'
      ],
      mistakes: 'Nu numi citesc drept cerere și nu numi Citește drept fapt sigur. să citesc nu este fapt gata. Condiția are nevoie de dacă.',
      tryThis: 'Scrie patru enunțuri cu a citi. Unul ca fapt sigur, cu citesc. Unul posibil, cu să citesc. Unul de condiție, în forma aș citi dacă aș avea timp. Unul de cerere, cu Citește. Numește privirile pe rând: sigură, apoi dorită, apoi condiționată, apoi posibilă și cerută.',
      keyPoints: [
        'Modul arată atitudinea vorbitorului: siguranță, dorință, condiție, posibil sau cerere.',
        'citesc ține de fapt, să citesc ține de posibil, iar aș citi dacă aș avea timp ține de condiție.',
        'Citește este cererea, iar cele patru forme nu se pot înlocui una pe alta.'
      ]
    }),
    lesson({
      id: 'imperativ',
      title: 'Imperativul și scrierea lui',
      kind: 'limba',
      boxes: [{
        type: 'regula',
        title: 'Persoana a doua',
        text: 'Imperativul cere, dă un îndemn, roagă, sfătuiește sau oprește. Forma există pentru tu și pentru voi.'
      }],
      theory: [
        'Fața, gestul și tonul despart rugămintea de ordin. Pe hârtie, cererea primește semnul exclamării.',
        'A plecat povestește ceva deja încheiat, la trecut. Sună hotărât, dar nu intră la imperativ.',
        'Din ești atent iese Fii atent, iar i-ul se dublează. Scrierea Fi atent cade.',
        'Când ceri să se facă, spui Fă. Când oprești, spui Nu face. Forma Nu fă nu ține oprirea.',
        'Du-te, când oprești, trece în Nu te duce. Scrierea Nu te du se lasă deoparte.',
        'Cererea părăsește persoana întâi. mă gândesc se mută în gândește-te.',
        'O palmă ridicată poate ține aceeași cerere, prin gest și prin ton. Nonverbalul nu repară o formă scrisă greșit.',
        'Rugămintea și ordinul stau ambele la tu sau la voi. Deosebirea vine din ton, din față și din gest.',
        'La verificare cauți doi de i în Fii, oprirea Nu face, oprirea Nu te duce și semnul exclamării.',
        'Dacă enunțul spune ce s-a întâmplat deja, ca în a plecat, îl lași la trecut.'
      ].join('\n\n'),
      example: [
        'Când intri, fii calm. Lângă cei care citesc, fă liniște. Gălăgia se oprește prin nu face. Plecarea de acum se oprește prin nu te duce.',
        'Trei scrieri cad: Fi atent, apoi Nu fă, apoi Nu te du. Gândește-te a ieșit din mă gândesc. Enunțul a plecat rămâne la trecut.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Ordinul Fii atent și rugămintea Fii bun folosesc aceeași formă, cu doi de i. Tonul cu fața arată deosebirea, iar semnul exclamării stă pe hârtie.'
      }],
      practice: [
        '1) Pentru cine are formă imperativul și ce fel de cereri acoperă?',
        '2) Cum treci ești atent într-o cerere scrisă corect?',
        '3) Cu ce oprești pe Fă și cu ce oprești pe Du-te?',
        '4) În ce formă trece mă gândesc și de ce a plecat nu cere nimic?'
      ].join('\n\n'),
      answers: [
        'Pentru tu și pentru voi. Acoperă ordinul, îndemnul, rugămintea, sfatul și oprirea.',
        'Fii atent, iar i-ul se dublează. Fi atent cade.',
        'Fă se oprește prin Nu face. Du-te se oprește prin Nu te duce.',
        'mă gândesc trece în gândește-te. a plecat spune o faptă deja încheiată, la trecut.'
      ],
      mistakes: 'Cade Fi atent. Cade și Nu fă. Cade și Nu te du. Cererea nu rămâne la eu. a plecat nu se preface în ordin. Pe hârtie nu uita semnul exclamării.',
      tryThis: 'Scrie o rugăminte și un ordin, ambele către tu. Folosește Fii, apoi Fă, apoi Nu face și Nu te duce. Mută mă gândesc în gândește-te. Adaugă un trecut cu a plecat. Arată de ce cade Fi atent, de ce cade Nu fă și de ce cade Nu te du. Numește fața, gestul și tonul.',
      keyPoints: [
        'Imperativul se adresează lui tu și lui voi, iar tonul, gestul, fața și semnul exclamării arată cererea.',
        'Fii atent poartă doi de i, Fă se oprește prin Nu face, iar Du-te se oprește prin Nu te duce.',
        'De la eu se trece la tu, ca în gândește-te, iar a plecat rămâne trecut.'
      ]
    }),
    lesson({
      id: 'indicativ-1',
      title: 'Indicativul: prezent și imperfect',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Fapt și fundal',
        text: 'Indicativul ia acțiunea drept fapt. Prezentul spune clipa de acum sau un adevăr statornic. Imperfectul, fără auxiliar, ține un trecut care se întinde sau revine.'
      }],
      theory: [
        'În povestire, faptele au o ordine. Dacă o răstorni, înțelesul se mută. Conjugarea schimbă verbul după mod, după timp, după persoană și după număr.',
        'La a fi, forma folosită azi este sunt. Sînt a îmbătrânit. îs și îi se aud doar în anumite contexte, nu ca normă de azi.',
        'Pentru ei spui miros, nu miroase. Pentru noi spui creăm, nu creem. La eu spui legăn, nu leagăn.',
        'Verbul a crea copiază tiparul lui a lucra. Tai ultima vocală și lipești -ez. Iese creez.',
        'Mai ții minte eu văd, nu văz, și eu prind, nu prinz. Când zboară păsările, nu scrii zbor.',
        'Imperfectul este simplu, fără auxiliar. Fundalul lung stă aici. Întreruperea scurtă pleacă la alt timp.',
        'Terminațiile de singular sunt -am, apoi -ai, apoi -a. La plural, după -am, vin -ați și -au.',
        'La a merge, eu, tu și el sună mergeam, mergeai, mergea. La voi și la ei urmează mergeați și mergeau. Persoana întâi de plural reia mergeam.',
        'Forma bună pentru a fi la imperfect este eram. ieram se lasă. luam înlocuiește luoam. Ploaia se spune ploua, nu ploa.',
        'dădeam ține, dam nu. stăteam ține, stam nu. La a vrea sunt bune voiam și vream. Vroiam iese din uz.',
        'În citeam când a sunat, citeam este fundalul. Sunatul, scurt, stă în alt timp.'
      ].join('\n\n'),
      example: [
        'Citesc acum la fereastră. Sunt acolo. Văd două păsări, iar ele zboară. Noi creăm povestea. Eu creez titlul, cu -ez, pe tiparul lui a lucra. Colegii miros hârtia. Eu prind creioanele. Eu legăn foaia.',
        'Seara, citeam des. Mergeam spre casă și eram ud, căci ploua. Voiam căldură. Luam prosopul, stăteam la geam și dădeam din cap.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă scrii sînt ori creem pentru formele de azi, ai ieșit din normă. La fel cad leagăn, văz, prinz, miroase și zbor. La imperfect cad ieram, luoam, ploa, dam, stam și vroiam.'
      }],
      practice: [
        '1) Alege forma de azi între sunt și sînt, între creăm și creem, între legăn și leagăn. După ce tipar iese creez?',
        '2) Alege între văd și văz, între prind și prinz, între miros și miroase, între zboară și zbor. Unde se aud îs și îi?',
        '3) Dă imperfectul lui a merge pentru eu, pentru tu și pentru el, apoi pentru voi și pentru ei. Ce înlocuiește ieram, luoam, ploa, dam, stam și vroiam?',
        '4) În citeam când a sunat, ce este fundal și ce este întreruperea?'
      ].join('\n\n'),
      answers: [
        'sunt, creăm, legăn. creez copiază tiparul lui a lucra: se taie ultima vocală și se lipește -ez.',
        'văd, prind, miros, zboară. îs și îi se aud doar în anumite contexte.',
        'mergeam, mergeai, mergea; apoi mergeați și mergeau. Bune sunt eram, luam, ploua, dădeam, stăteam, iar la vrere voiam sau vream.',
        'citeam este fundalul. a sunat este întreruperea scurtă, în alt timp.'
      ],
      mistakes: 'Nu lua sînt drept formă de azi. Nu lua miroase și nici zbor. Nu lua văz, prinz, leagăn sau creem pentru formele cerute. La imperfect nu scrie ieram, luoam, ploa, dam, stam sau vroiam.',
      tryThis: [
        'Scrie enunțuri de prezent cu sunt, cu creăm, cu legăn și cu creez. Mai pune văd, prind, miros și zboară.',
        'Spune că îs și îi se aud doar în anumite contexte și că creez copiază pe a lucra, prin -ez.',
        'La imperfect scrie eram, apoi voiam sau vream, apoi ploua, luam, dădeam și stăteam, plus formele lui a merge. Leagă un fundal de o întrerupere, ca în citeam când a sunat.'
      ].join('\n\n'),
      keyPoints: [
        'Prezentul de azi preferă sunt și creăm, apoi legăn cu creez. Mai țin văd, prind, miros și zboară.',
        'Imperfectul, fără auxiliar, ține fundalul lung, iar întreruperea scurtă pleacă la alt timp.',
        'Se scriu eram, luam și ploua, apoi dădeam cu stăteam, iar la vrere voiam sau vream.'
      ]
    }),
    lesson({
      id: 'perfect-compus',
      title: 'Perfectul compus: ia, i-a, la, l-a',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Auxiliar și participiu',
        text: 'Perfectul compus este trecutul unei fapte încheiate. Se sprijină pe a avea și pe un participiu terminat în -t ori în -s.'
      }],
      theory: [
        'Modele scurte: am citit, ai scris, a venit. Persoana schimbă auxiliarul. Participiul rămâne același.',
        'Șirul auxiliarului începe cu am și cu ai, apoi vine a. La plural revine am, urmat de ați și de au.',
        'Imperfectul păstrează obiceiul, fapta care revenea. Perfectul compus aduce închiderea, chiar și când întreruperea este scurtă.',
        'Dacă lipsește auxiliarul, rămâne participiul gol. Nu mai știi cine a încheiat fapta.',
        'Patru scrieri nu se amestecă. Lipsită de cratimă, ia este prezentul verbului a lua. Modelul scurt rămâne ia cartea.',
        'Când apare liniuța, i-a ține de perfectul compus. Modelul este i-a spus. la, fără cratimă, este prepoziție, ca în la școală.',
        'l-a lipește un pronume de auxiliar. Modelul este l-a văzut. Cratima schimbă sensul.',
        'Când spui ei au o carte, a avea stă de unul singur. Când spui ei au zis, a avea ajută participiul.',
        'Regula e simplă: participiu după a avea înseamnă auxiliar. Un nume după a avea înseamnă verb singur.',
        'Obiceiul stă la imperfect, cu citeam. Fapta încheiată din aceeași zi stă la perfect compus, cu am citit.',
        'ați și au intră în același șir, când subiectul este voi sau ei. Nu le înlocui cu forma de unul.'
      ].join('\n\n'),
      example: [
        'Joia, citeam câte o poveste. În joia aceea am citit finalul. Tu ai scris titlul. Ana a venit cu volumul.',
        'El ia sfaturile în serios, apoi i-a dat colegului un sfat. La școală, l-a ascultat pe profesor. În ei au o carte, verbul stă singur. În ei au zis, verbul ajută.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă rămâne doar citit, fără am, nu se vede cine a încheiat. ia cartea este prezent. i-a spus este trecut compus.'
      }],
      practice: [
        '1) Din ce se construiește perfectul compus și cum arată auxiliarul pe persoane?',
        '2) Ce păstrează imperfectul și ce aduce perfectul compus?',
        '3) Ce sunt, pe rând, ia, i-a, la și l-a?',
        '4) Ce rol are a avea în ei au o carte și ce rol are în ei au zis?'
      ].join('\n\n'),
      answers: [
        'Din a avea și dintr-un participiu în -t ori în -s. Auxiliarul: am, ai, a, apoi iar am, ați, au. Participiul nu se schimbă.',
        'Imperfectul păstrează obiceiul. Perfectul compus aduce fapta încheiată, chiar dacă întreruperea e scurtă.',
        'ia, fără liniuță, e prezentul verbului a lua. i-a, cu liniuță, e perfect compus. la e prepoziție. l-a e pronume lângă auxiliar.',
        'La ei au o carte, a avea stă de unul singur. La ei au zis, a avea ajută participiul.'
      ],
      mistakes: 'Nu lăsa participiul fără auxiliar. Nu pune ia în loc de i-a și nu pune la în loc de l-a. a avea dinaintea unui participiu nu stă singur.',
      tryThis: 'Scrie un obicei cu citeam și o faptă încheiată cu am citit, cu ai scris și cu a venit. Mai scrie câte un enunț pentru ia, pentru i-a, pentru la și pentru l-a. Adaugă ei au o carte și ei au zis. Folosește și ați, și au.',
      keyPoints: [
        'Perfectul compus lipește a avea de un participiu neschimbat și arată o faptă încheiată.',
        'Imperfectul păstrează obiceiul, iar fără auxiliar nu se vede cine a încheiat fapta.',
        'Cele patru scrieri sunt ia, apoi i-a, apoi la și l-a, iar a avea devine auxiliar numai când urmează participiul.'
      ]
    }),
    lesson({
      id: 'perfecte',
      title: 'Perfectul simplu și mai-mult-ca-perfectul',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Două trecute',
        text: 'Perfectul simplu este o faptă trecută și gata, fără auxiliar, vie în povestire. Mai-mult-ca-perfectul este fapta gata înaintea altei fapte din trecut.'
      }],
      theory: [
        'În vorbire, perfectul simplu se aude mai ales în Oltenia, pentru o faptă terminată de foarte puțină vreme. În povestire, fapta pare vie.',
        'La plural intră grupul -ră. La a mânca auzi mâncarăm, apoi mâncarăți, apoi mâncară.',
        'La verbele în -i, eu primește doi de i, deci eu venii. El rămâne veni, cu un singur i.',
        'Contextul desparte prezentul de perfectul simplu. Dacă cineva cântă și dansează în fiecare zi, timpul este prezent. Dacă cântă și îndată plecă, timpul este perfect simplu.',
        'Acordul leagă verbul de subiect. Andrei zise, fiindcă Andrei e unul. ziseră ar cere mai mulți.',
        'Mai-mult-ca-perfectul pleacă din perfectul simplu și primește grupul se. gândi împreună cu se dă gândise.',
        'La singular, terminațiile sunt -sem, apoi -seși, apoi -se. La plural stau -serăm, apoi -serăți, apoi -seră.',
        'Persoana a treia ia -se. -sem rămâne pentru eu, nu pentru ei.',
        'La plural, norma de azi cere grupul -ră. Când sunt mai mulți, scrii plecaseră. plecase rămâne pentru unul.',
        'Eu încercasem rămâne pentru unul. La plural, ei încercaseră. Trei prieteni, la fel, ajutaseră. ajutase nu acoperă trei oameni.',
        'O secvență este o bucată din povestire: o situație, o schimbare și un rezultat. Cartea întreagă este mai lată.'
      ].join('\n\n'),
      example: [
        'Ei mâncară la aceeași masă. Eu venii până la ușă. El veni în urma mea. Andrei zise o vorbă, fiindcă e unul, nu ziseră.',
        'Când am pășit înăuntru, titlul era deja scris, deci el gândise fapta mai devreme. Când a sosit mama, musafirii plecaseră. O dată încercasem eu. Ei încercaseră în mai multe rânduri. Și trei prieteni ajutaseră.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Intrarea, titlul deja gata și urmarea fac o secvență: situație, schimbare, rezultat. Volumul întreg depășește bucata.'
      }],
      practice: [
        '1) Ce este perfectul simplu și unde se aude mai ales în vorbire?',
        '2) Dă mâncarăm, mâncarăți, mâncară, eu venii și el veni. De ce Andrei zise, nu ziseră?',
        '3) Cum se face mai-mult-ca-perfectul și care îi sunt terminațiile?',
        '4) De ce la plural scrii plecaseră, încercaseră și ajutaseră? Ce cuprinde o secvență?'
      ].join('\n\n'),
      answers: [
        'Este o faptă trecută și gata, fără auxiliar, vie în povestire. În vorbire se aude mai ales în Oltenia, pentru o faptă terminată de foarte puțină vreme.',
        'mâncarăm, mâncarăți, mâncară; eu venii; el veni. Andrei e unul, deci zise, nu ziseră.',
        'Din perfectul simplu plus grupul se, ca în gândise. Terminațiile: -sem, -seși, -se, apoi -serăm, -serăți, -seră.',
        'Grupul -ră ține pluralul de azi. plecase și ajutase rămân pentru unul. O secvență are situație, schimbare și rezultat, nu tot volumul.'
      ],
      mistakes: 'Nu pune ziseră lângă un singur nume. Nu scrie plecase sau ajutase când subiectul e plural. Cântatul din fiecare zi este prezent, iar plecă dintr-un șir de fapte gata este perfect simplu.',
      tryThis: [
        'Scrie o secvență: o situație, apoi o schimbare, apoi un rezultat.',
        'Pune la perfect simplu mâncarăm, mâncarăți și mâncară, apoi eu venii, el veni și Andrei zise.',
        'Pune o faptă mai veche cu gândise, cu încercasem, cu plecaseră, cu încercaseră și cu ajutaseră. Arată că dansul din fiecare zi, împreună cu cântatul, este prezent. cântă urmat de plecă ține de perfectul simplu. Adaugă că, vorbind, forma aceasta se aude mai ales în Oltenia.'
      ].join('\n\n'),
      keyPoints: [
        'Perfectul simplu nu are auxiliar, învie fapta în povestire și, în vorbire, se aude mai ales în Oltenia.',
        'Pluralul ia -ră, verbele în -i au eu venii, iar acordul cere Andrei zise când e unul.',
        'Mai-mult-ca-perfectul adaugă se la perfectul simplu și, la plural, păstrează -ră, ca în plecaseră.'
      ]
    }),
    lesson({
      id: 'viitor-banda',
      title: 'Viitorul și timpurile compuse',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'După clipa vorbirii',
        text: 'Viitorul pune fapta după clipa în care vorbești și o ia drept sigură. Forma de normă lipește auxiliarul lui a vrea de infinitiv.'
      }],
      theory: [
        'Persoanele se împart. Eu spune voi veni. Tu spui vei apărea. El spune va fugi.',
        'Noi spunem vom dormi. Voi spuneți veți dori. Ei spun vor îndrăgi.',
        'Scrii va apărea. va fi are un singur i. Nu scrii va fii și nu scrii v-a fii.',
        'voi ieși nu primește încă un i, deci nu voi ieșii. voi citi rămâne fără un i adăugat.',
        'veți stă dintr-o bucată, nu ve-ți. veți ști nu se lungește în veți știi.',
        'v-a fi amestecă un trecut cu viitorul. v-a întrebat este trecut. va întreba este viitor.',
        'În vorbire, viitorul se face cu a avea și cu să. Auzi am să merg, apoi ai să visezi, apoi o să merg. Lângă ele stă o să rămână.',
        'Nu se scrie o să rămâie. Forma îngrijită este o să rămână.',
        'Viitorul anterior este alt timp: voi fi urmat de participiu. Modele: voi fi venit și voi fi vorbit. Fapta va fi gata înaintea altei clipe din viitor.',
        'În banda desenată, casetele urmează ordinea faptei și nu se amestecă.'
      ].join('\n\n'),
      example: [
        'De mâine voi veni și voi citi capitolul. La poartă va apărea colegul. Eu voi ieși întâi, iar rândul lui va fi după. După drum vom dormi. Pauza o veți dori voi. Ei vor îndrăgi finalul.',
        'Până la ora cinci, am să fiu gata. La drum ai să visezi. Planul o să rămână. Capitolul, până atunci, voi fi citit. Când profesorul va întreba, veți ști răspunsul. Întrebarea de ieri, v-a întrebat, stătea la trecut. Casetele se citesc așa: privește, după aceea cade, după aceea ridică.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'voi fi vorbit înseamnă că vorbitul se încheie înaintea altei clipe din viitor. Cad va apare, va fii, voi ieșii, ve-ți și veți știi.'
      }],
      practice: [
        '1) Dă viitorul de normă: eu la a veni, tu la a apărea, el la a fugi, noi la a dormi, voi la a dori, ei la a îndrăgi. Adaugă voi merge.',
        '2) Alege: va apărea sau va apare, va fi sau va fii, voi ieși sau voi ieșii, veți sau ve-ți, veți ști sau veți știi. voi citi primește un i în plus?',
        '3) Ce timp este v-a întrebat și ce timp este va întreba? Dă, pe rând, am să merg, apoi ai să visezi, apoi o să rămână.',
        '4) Ce este viitorul anterior, cum arată voi fi venit, și în ce ordine stau casetele privește, cade, ridică?'
      ].join('\n\n'),
      answers: [
        'la eu, voi veni; la tu, vei apărea; la el, va fugi; la noi, vom dormi; la voi, veți dori; la ei, vor îndrăgi; plus voi merge.',
        'va apărea; va fi; voi ieși; veți; veți ști. voi citi nu primește un i în plus.',
        'v-a întrebat este trecut. va întreba este viitor. În vorbire auzi am să merg. Apoi ai să visezi. Apoi o să rămână.',
        'Viitorul anterior lipește voi fi de participiu. Modelul este voi fi venit. Fapta se încheie înaintea altei clipe din viitor. Casetele: întâi privește, apoi cade, apoi ridică.'
      ],
      mistakes: 'Nu scrie va apare, va fii, v-a fii, voi ieșii, ve-ți, veți știi sau o să rămâie. v-a întrebat nu este viitor. Casetele nu se citesc de-a-ndoaselea.',
      tryThis: [
        'Scrie viitorul de normă pentru eu, pentru tu și pentru el, apoi pentru noi, pentru voi și pentru ei. Include voi merge.',
        'Adaugă va apărea lângă va fi, apoi voi ieși lângă voi citi și veți ști. În vorbire pune am să merg, după aceea ai să visezi, după aceea o să rămână.',
        'Încheie cu un viitor anterior și cu trei casete: privește, cade, ridică. va întreba e viitor, v-a întrebat e trecut.'
      ].join('\n\n'),
      keyPoints: [
        'Viitorul de normă lipește voi, vei, va, vom, veți și vor de infinitiv. Scrierile bune sunt va apărea și va fi, apoi voi ieși și voi citi.',
        'În vorbire auzi am să sau o să. Viitorul anterior lipește voi fi de un participiu.',
        'v-a întrebat este trecut, va întreba este viitor, iar casetele benzii urmează ordinea faptei.'
      ]
    }),
    lesson({
      id: 'ascultare-activa',
      title: 'Ascultarea activă',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Până la capăt',
        text: 'Ascultarea activă înseamnă să lași interlocutorul să termine, fără să intri peste el. Apoi pui o întrebare scurtă sau spui ideea cu vorbele tale.'
      }],
      theory: [
        'Reformularea arată că ai prins ideea. Nu repeți mecanic. Muți persoana când planul a fost spus de la eu.',
        'La viitor, eu devine tu. voi citi trece în vei citi. o să plec trece în o să pleci.',
        'Colegul anunță întâi voi citi și abia apoi o să plec. Tu aștepți sfârșitul. Nu îi tai fraza.',
        'Tu spui pe scurt: vei citi, iar după aceea o să pleci. Planul rămâne al lui, dar verbele au trecut la tu.',
        'El mai spune voi zbura și, după aceea, o să scriu o carte. Tu întorci: vei zbura și o să scrii o carte.',
        'Abia la capăt, după ce l-ai auzit, pui întrebarea unde vei zbura. Nu o pui la jumătatea frazei.',
        'Din scenă faci trei mișcări. Notezi ce stă scris. Spui ce observi. Apoi alegi o faptă a ta, cu pentru că.',
        'Dacă intri peste el, reformularea iese strâmbă, fiindcă planul nu era întreg. Așteptarea ține de ascultare.',
        'Întrebarea scurtă vine după ultima vorbă. Ea cere o lămurire, nu un plan nou pus de tine.',
        'La clasă, pe dialogul deschis, repeți aceleași mișcări. Persoana se schimbă doar când întorci planul celuilalt.',
        'voi și o să, spuse de la eu, devin vei și o să, spuse către tu. Nu lăsa eu când vorbești despre planul lui.',
        'Față în față, aștepți finalul chiar dacă ai prins o bucată. Restul frazei poate muta planul.'
      ].join('\n\n'),
      example: [
        'Ce scrie: aștepți sfârșitul, fiindcă el anunță întâi voi citi și abia apoi o să plec. Tu întorci: vei citi, iar după aceea o să pleci.',
        'Ce vezi: Văd doi colegi față în față. Aș aștepta sfârșitul, pentru că planul lui nu s-a încheiat.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă întrebi unde vei zbura înainte să tacă, ai intrat peste el. Întrebarea bună vine după ce a spus și cartea, nu peste ea.'
      }],
      tryThis: [
        'Irina anunță, în forma voi desena, că face o hartă și că o să cânt în timpul orei. Aștepți să tacă și nu o întrerupi. Întorci: vei desena o hartă și o să cânți.',
        'Abia după ultima vorbă întrebi ce vei desena. Alcătuiți trei enunțuri: ce stă scris, ce observi, ce ai alege, cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Ascultarea activă lasă interlocutorul să termine, apoi vine întrebarea scurtă sau reformularea.',
        'Un plan la viitor trece de la eu la tu. voi citi trece spre vei citi. o să plec trece spre o să pleci.',
        'Întrebarea unde vei zbura stă după ultima vorbă, nu peste ea.'
      ]
    }),
    lesson({
      id: 'banda-desenata',
      title: 'Banda desenată și nonverbalul',
      kind: 'redactare',
      boxes: [{
        type: 'definitie',
        title: 'Cadre și bulă',
        text: 'Banda desenată este un text narativ mixt. Desenul atârnă mai greu decât vorba. Cadrele se citesc în ordine.'
      }],
      theory: [
        'Bula stă pe fond alb. Poate fi rotundă. Poate fi curbată. Poate fi dreptunghiulară. Norul ține gândul ori visul.',
        'Cuvântul care imită un zgomot se numește onomatopee. Linia frântă arată drumul. Chenarul lămurește locul sau clipa.',
        'Coada bulei arată cine vorbește. Fără coadă, nu știi din ce gură iese replica.',
        'Nonverbalul din bandă este ce spun fața, ținuta corpului, privirea și gestul, când nimic din ele nu e scris.',
        'Banda poate fi născocită de tine. Poate relua o carte, fără să copiezi frazele. Ideea trece, rândul străin nu.',
        'În echipă, unul scrie întâmplarea, iar altul desenează. Nu cade aceeași persoană pe ambele roluri.',
        'La capăt, fiecare numește plăcerea și lucrul păstrat. Evaluarea închide lucrul, nu îl înlocuiește.',
        'Scena: o fată aleargă prin trei cadre, unul după altul. Lângă pantof scrie poc. poc este onomatopee.',
        'Norul ține gândul oare prind autobuzul. Coada de la Stai pornește de la coleg. Linia frântă marchează drumul. Chenarul spune încotro merge.',
        'Băiatul ține umerii lăsați și nu se uită spre coleg. Fără replică se vede că e supărat.',
        'Unul a scris scena pornind de la o carte, fără fraze copiate. Celălalt a desenat-o. Din scenă notezi ce stă scris, ce observi și ce ai alege, cu pentru că.',
        'Ordinea cadrelor este ordinea faptei. Dacă le amesteci, onomatopeea și norul nu mai spun aceeași întâmplare.'
      ].join('\n\n'),
      example: [
        'Ce scrie: fata aleargă prin trei cadre, lângă pantof stă poc, iar băiatul ține umerii lăsați și nu se uită spre coleg.',
        'Ce vezi: Văd fata, pantoful, băiatul și colegul. Aș sta lângă băiat și aș vorbi încet, pentru că umerii lăsați arată supărarea.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă norul spune oare prind autobuzul, gândul nu e replică rostită. Coada, nu norul, arată cine vorbește.'
      }],
      tryThis: [
        'Un băiat sare prin trei cadre, unul după altul. Lângă minge se aude buf. Visul din nor este oare zbor. Bula, curbată, stă pe fond alb. Coada arată cine vorbește.',
        'Spre poartă urcă linia frântă. Chenarul lămurește locul. Un coleg scrie scena fără fraze copiate, altul desenează, apoi fiecare numește plăcerea și lucrul păstrat. Alcătuiți trei enunțuri: ce stă scris, ce observi, ce ai alege, cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Banda amestecă desenul, mai greu decât vorba, cu cadre citite în ordine.',
        'Bula, norul, onomatopeea, linia frântă, chenarul și coada au roluri diferite.',
        'Fața și postura spun starea fără replică, iar în echipă unul scrie și altul desenează.'
      ]
    }),
    lesson({
      id: 'forme-narative',
      title: 'Formele povestirii și etapele compunerii',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Feluri și etape',
        text: 'O întâmplare poate deveni film sau desen animat, apoi bandă, text literar ori text care nu e literar. Compunerea urcă în trei etape: introducere, cuprins, încheiere.'
      }],
      theory: [
        'Textul nonliterar poate fi o relatare, o anecdotă sau o știre. El informează sau spune un caz, fără să aibă ca scop unic o lume doar închipuită.',
        'Pantomima spune povestea numai prin gest. Cuvintele lipsesc. Corpul ține locul replicii.',
        'Introducerea pregătește terenul. Cuprinsul aduce schimbarea. Încheierea pune capac. Ordinea nu se răstoarnă.',
        'În scena de lucru, introducerea arată că rămâneam după oră. Ea pregătește, nu rezolvă.',
        'Schimbarea vine când a sunat alarma. Închiderea vine când am ieșit în curte.',
        'Mai departe, aceeași întâmplare poate lua chip de film sau de desen animat. Poate sta și în bandă, în text literar, în relatare, în anecdotă, în știre ori în pantomimă.',
        'Din scenă faci trei mișcări. Notezi ce stă scris. Spui ce observi, cu Văd. Apoi alegi o faptă a ta, cu pentru că.',
        'Dacă sari introducerea, schimbarea pare fără cadru. Dacă sari încheierea, alarma rămâne fără urmare.',
        'Pantomima păstrează faptele și taie vorbele. Știrea păstrează faptele și le spune pe scurt, ca informație.',
        'La clasă, pe textul deschis, numești forma și cele trei etape. Nu le amesteci cu timpii din alte lecții.',
        'rămâneam este fundalul care pregătește. a sunat este schimbarea. am ieșit este închiderea.',
        'Poți muta aceeași schemă într-un hol, când se stinge lumina, fără să schimbi cele trei etape. Așteptarea pregătește, întunericul schimbă, iar întrerupătorul închide.'
      ].join('\n\n'),
      example: [
        'Ce scrie: după oră încă rămâneam. Apoi alarma a sunat. La urmă, în curte, am ieșit afară.',
        'Ce vezi: Văd clasa, alarma și curtea. Aș ieși afară, pentru că alarma a sunat.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Aceeași alarmă poate fi știre, dacă informezi, sau pantomimă, dacă arăți ieșirea doar prin gest, fără vorbe.'
      }],
      tryThis: [
        'Introducerea arată că așteptam în hol și pregătește scena. Schimbarea vine când s-a stins lumina. Închiderea vine când am găsit întrerupătorul.',
        'Aceeași întâmplare poate sta ca știre sau ca pantomimă, fără vorbe. Alcătuiți trei enunțuri: ce stă scris, ce observi, ce ai alege, cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Formele sunt filmul, desenul animat, banda, textul literar și textul nonliterar, adică relatarea, anecdota sau știrea.',
        'Pantomima spune întâmplarea doar prin gest.',
        'Compunerea urcă din introducerea care pregătește, prin cuprinsul care schimbă, spre încheierea care închide.'
      ]
    }),
    lesson({
      id: 'norma-sortare',
      title: 'Limbă standard și abatere',
      kind: 'limba',
      boxes: [{
        type: 'regula',
        title: 'Forma de azi',
        text: 'Limba standard este forma primită azi. Abaterea este forma care iese din această normă.'
      }],
      theory: [
        'sunt este forma de normă. îs nu este forma de azi. O lași pentru contextele în care se aude, nu o pui în enunțul îngrijit.',
        'luam este corect. loam nu este. Imperfectul nu pierde vocalele din mijloc.',
        'La eu spui plecasem. plecaserăm cere grupul -ră, iar -ră ține de plural.',
        'vei pustii este corect, fără un i adăugat. Un i în plus strică viitorul.',
        'îngrijesc este forma bună. îngrijăsc nu ține norma. Vocala din rădăcină rămâne e.',
        'așază și afișează sunt prezenturi corecte. Le recunoști după -ează, nu după o prescurtare.',
        'Când sortezi, pui norma într-o coloană și abaterea în alta. Nu le amesteci ca și cum ar fi egale.',
        'eu plecasem rămâne singular chiar dacă în jur sunt mai mulți oameni. Pentru ei ai spune plecaseră, nu eu plecaserăm.',
        'Un enunț cu sunt, unul cu luam și unul cu îngrijesc arată trei alegeri bune, fiecare cu abaterea lăsată deoparte.',
        'La vei pustii numeri literele i. Unul în plus scoate forma din normă.',
        'așază și afișează se folosesc când fapta este acum, nu când povestești un trecut.'
      ].join('\n\n'),
      example: [
        'Eu sunt lângă fereastră, nu îs. Seara luam caietul, nu loam, de pe masă. Ieri plecasem devreme. La eu nu stă plecaserăm, fiindcă -ră ține de plural.',
        'Vei pustii doar locul cerut, fără un i adăugat. Florile le îngrijesc eu. îngrijăsc cade. În vază, mama le așază. Ora o afișează panoul.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă subiectul este eu, plecaserăm cade, chiar dacă sună cunoscut. Forma care ține norma este plecasem.'
      }],
      practice: [
        '1) Ce este limba standard și ce este abaterea?',
        '2) Alege între sunt și îs, între luam și loam, între plecasem și plecaserăm. De ce -ră ține de plural?',
        '3) Cum se scrie vei pustii și ce alegi între îngrijesc și îngrijăsc?',
        '4) Ce timp au așază și afișează?'
      ].join('\n\n'),
      answers: [
        'Limba standard este forma primită azi. Abaterea iese din această normă.',
        'sunt, luam, plecasem. Grupul -ră ține de plural, deci plecaserăm nu stă la eu.',
        'vei pustii, fără un i în plus. Forma bună este îngrijesc. îngrijăsc cade.',
        'Sunt prezenturi corecte.'
      ],
      mistakes: 'îs, loam, plecaserăm la eu și îngrijăsc nu țin norma de azi. vei pustii nu primește un i în plus. așază și afișează nu se scurtează.',
      tryThis: 'Scrie câte un enunț cu sunt, cu luam și cu plecasem. Mai scrie cu vei pustii, cu îngrijesc, cu așază și cu afișează. Arată formele care ies din normă: îs, loam, plecaserăm, îngrijăsc. Grupul -ră ține de plural. vei pustii nu primește un i adăugat.',
      keyPoints: [
        'Norma de azi păstrează sunt, luam și eu plecasem.',
        'Grupul -ră marchează pluralul, iar vei pustii nu primește un i în plus.',
        'îngrijesc, așază și afișează sunt formele bune, iar îs, loam și îngrijăsc rămân abateri.'
      ]
    }),
    lesson({
      id: 'cratima-le',
      title: 'neam, ne-am, le-au',
      kind: 'limba',
      boxes: [{
        type: 'regula',
        title: 'Cratima',
        text: 'Cratima din ne-am și din le-au desparte pronumele de verb. neam, cu sensul de popor, stă dintr-o bucată, fără cratimă.'
      }],
      theory: [
        'ne-am nu este neam. În noi ne-am dus, ne-am înseamnă noi și ține de verb, cu cratimă.',
        'le-au leagă pronumele le de auxiliarul au. Modelul este le-au prețuit. Leau, lipit, nu se scrie.',
        'viitorul lui a fi se scrie va fi, cu un i. va fii lungește litera și nu ține locul acestui viitor.',
        'Ca să alegi, întrebi sensul. Dacă vrei poporul sau familia mare, scrii neam, dintr-o bucată.',
        'Dacă vrei noi am, scrii ne-am, cu cratimă. Sensul de popor nu primește liniuță.',
        'La le-au, pronumele stă înaintea auxiliarului. Lipirea leau șterge granița și nu e admisă.',
        'Viitorul lui a fi se verifică la fel: un i, nu doi. va fii amestecă forma cu alte moduri.',
        'Patru enunțuri ajung: unul cu neam, unul cu ne-am, unul cu le-au și unul cu va fi.',
        'Nu pui cratima din obișnuință. O pui doar când desparți pronumele de verb, ca în ne-am și în le-au.',
        'În povestire, un neam poate păstra întâmplările. Aici neam este substantiv. Nu îl confunda cu auxiliarul din ne-am dus.',
        'Când verifici va fi, acoperă al doilea i. Dacă mai rămâne unul, forma e bună. Dacă vezi doi, ai scris va fii.'
      ].join('\n\n'),
      example: [
        'Un neam a păstrat poveștile. Cuvântul stă dintr-o bucată, cu sensul de popor, și nu ia cratimă.',
        'Șirul ne-am dus acasă arată pe noi, cu cratimă. Le-au prețuit amintirile leagă pronumele de auxiliar. Mâine va fi rândul nostru, cu un i.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă scrii leau prețuit, lipirea e greșită. Despărțirea corectă este le-au. va fii nu înlocuiește va fi.'
      }],
      practice: [
        '1) Cum se scrie neam când înseamnă popor?',
        '2) Ce înseamnă ne-am în șirul noi ne-am dus?',
        '3) Cum legi pe le de au în le-au prețuit și de ce leau nu e bun?',
        '4) Cum se scrie viitorul lui a fi și de ce va fii cade?'
      ].join('\n\n'),
      answers: [
        'Dintr-o bucată, fără cratimă.',
        'Înseamnă noi, cu cratimă, nu popor.',
        'le-au, cu cratimă. leau, lipit, nu se scrie.',
        'va fi, cu un i. va fii lungește litera și nu ține locul viitorului lui a fi.'
      ],
      mistakes: 'Nu pune cratimă la neam cu sensul de popor. Nu lipi leau. Nu scrie va fii în locul lui va fi. ne-am nu înseamnă popor.',
      tryThis: 'Scrie patru enunțuri. Unul cu neam, în sensul de popor. Unul cu ne-am, ca în noi ne-am dus. Unul cu le-au, ca în le-au prețuit. Unul cu va fi. Arată că lipirea leau cade și că va fii nu ține locul viitorului lui a fi.',
      keyPoints: [
        'neam, popor, stă dintr-o bucată, iar ne-am desparte pronumele de verb.',
        'le-au leagă pe le de au, iar leau lipit nu se scrie.',
        'Viitorul lui a fi este va fi, cu un singur i.'
      ]
    }),
    lesson({
      id: 'proiect-taram',
      title: 'Proiectul despre tărâmul de poveste',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Grupa și rolurile',
        text: 'Proiectul arată cum văd cărțile și filmele un tărâm de poveste, la noi și în alte culturi. Grupa are 4 elevi sau 5.'
      }],
      theory: [
        'Întâi vine planul, apoi ciorna, apoi revizia. Fiecare etapă are termen. Fără termen, cronometrul nu are ce păzi.',
        'Rolurile sunt cinci. Liderul coordonează. Administratorul strânge materialele. Informaticianul caută programe.',
        'După el, ilustratorul desenează. Cronometrul, la fel, păzește termenele. Într-o grupă de 4, un elev poate ține două roluri mici, dar toate cinci rămân numite.',
        'Lucrarea ține șapte cerințe. Tema e respectată și îngustată. Nu luați tot basmul lumii, ci un colț clar.',
        'Structura e de carte ori de prezentare. Are capitole sau slide-uri. Alegeți una și o țineți până la capăt.',
        'Informațiile vin din mai multe discipline, nu dintr-o singură materie. Bibliografia stă la sfârșit.',
        'În pagini apar desene sau tabele. Lucrarea e atrăgătoare. Lucrarea e originală. Dacă bibliografia nu stă la sfârșit, o cerință cade.',
        'O temă îngustă poate fi peisajul și felul de a trăi dintr-un tărâm, văzute în cărți și în filme.',
        'Patru colegi pot împărți munca. Liderul ține capitolele. Cronometrul scrie data ciornei. O grupă de 5 poate face la fel, cu un rol de persoană.',
        'Trei slide-uri, o hartă și lista de cărți de la final țin structura, desenul și bibliografia.',
        'Original înseamnă lucrul vostru, nu un text lipit. Atrăgător înseamnă clar și îngrijit, nu încărcat fără rost.',
        'La noi și în alte culturi stau în același plan, ca să se vadă asemănarea și deosebirea, nu doar o singură lume.'
      ].join('\n\n'),
      example: [
        'Patru colegi își iau roluri despre peisaj și despre felul de a trăi. Planul e primul, ciorna urmează, revizia închide, cu data notată.',
        'Trei slide-uri, o hartă și lista de la final acoperă structura, desenul și bibliografia. Datele din mai multe discipline țin lucrarea pe temă, atrăgătoare și originală.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă lipsește lista de la final, bibliografia cade, chiar dacă hărțile sunt frumoase. Cele șapte cerințe se numără toate.'
      }],
      tryThis: [
        'Scrie planul unei grupe de 4 sau de 5. Numește liderul, administratorul, informaticianul, ilustratorul și cronometrul. Notează termenele de plan, de ciornă și de revizie.',
        'Arată tema îngustă. Arată structura, de carte ori de prezentare, cu capitole sau cu slide-uri. Arată datele luate din mai multe discipline. Pune bibliografia la sfârșit, plus desene sau tabele, și felul atrăgător, original. Folosește cărți și filme, peisajul, felul de a trăi, atât la noi, cât și în culturi de aiurea.'
      ].join('\n\n'),
      keyPoints: [
        'Proiectul se face în grupe de 4 sau de 5, cu plan, cu ciornă și cu revizie, fiecare având termen.',
        'Cele cinci roluri sunt liderul, administratorul, informaticianul, ilustratorul și cronometrul.',
        'Șapte cerințe țin tema îngustă, structura, disciplinele, bibliografia, desenele sau tabelele, textul atrăgător și textul original.'
      ]
    }),
    lesson({
      id: 'recap-poveste',
      title: 'Recapitulare: povestirea',
      kind: 'recapitulare',
      boxes: [{
        type: 'regula',
        title: 'Enunț întreg',
        text: 'Recapitularea cere fraza întreagă, nu doar locul gol. Răspunsul se sprijină pe nota de lucru și se scrie complet.'
      }],
      theory: [
        'Nota dă stânjenului cam 2 metri. O creștere de un stânjen se alege din bucata care stă între 2 metri și 3 metri.',
        'Alegerea se sprijină pe notă. Nu lași golul necompletat și nu sari la o măsură fără legătură cu cei 2 metri.',
        'Compunerea are trei alineate. Fiecare are cel puțin 15 cuvinte. Sub limită, alineatul nu contează.',
        'Pui două date din nota aceasta. Mai pui o personificare subliniată. Verbele acoperă fiecare timp al indicativului.',
        'Întâi pui prezentul și imperfectul. Separat pui perfectul compus și perfectul simplu. Mai adaugi mai-mult-ca-perfectul.',
        'La urmă vin viitorul și viitorul anterior. Niciun timp din șir nu rămâne fără un verb al lui.',
        'Fișa se umple la persoana întâi, când unitatea s-a încheiat. Începi prin ce ai aflat.',
        'Spui și la ce altă materie îți folosește. Spui ce ai descoperit despre tine. Spui ce vrei să afli mai departe.',
        'Mai notezi lecția învățată, locul în care îți folosește și deprinderea la care ești mai sigur decât înainte.',
        'Fișele rămân în portofoliu. Nu le lași pe bancă după ce le-ai completat.',
        'Model: am aflat rolul imperfectului, acela de fundal. La altă materie, îmi folosește când povestesc un film.',
        'Personificarea subliniată este un enunț în care un lucru face un gest de om. O marchezi, nu o lași amestecată printre verbele de timp.',
        'Două date din notă înseamnă două informații sprijinite pe ea. Una dintre ele este măsura stânjenului, cam 2 metri.'
      ].join('\n\n'),
      example: [
        'În notă, stânjenul are cam 2 metri, deci creșterea de un stânjen se ia din bucata dintre 2 metri și 3 metri. Răspunsul stă în fraza întreagă.',
        'Compunerea ține trei alineate. Fiecare are cel puțin 15 cuvinte. Înăuntru stau două date din notă și o personificare subliniată. Verbele acoperă fiecare timp al indicativului. Fișa rămâne în portofoliu.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă un alineat are 14 cuvinte, nu atinge pragul de 15. Dacă lipsește viitorul anterior, șirul timpurilor rămâne incomplet.'
      }],
      tryThis: [
        'Scrie răspunsul întreg despre stânjen. Folosește stânjen, 2 metri și bucata dintre 2 metri și 3 metri.',
        'Scrie o compunere în trei alineate. Fiecare are minimum 15 cuvinte. Pune două date din notă și o personificare subliniată. Pune verbe la prezent și la imperfect, apoi la perfectul compus și la perfectul simplu, apoi la mai-mult-ca-perfect, la viitor și la viitorul anterior.',
        'Apoi scrie fișa la persoana întâi. Spune ce ai aflat și la ce materie îți folosește. Spune ce ai găsit în tine. Spune ce mai vrei să afli. Spune lecția învățată și locul unde îți folosește. Spune și la ce ești mai sigur decât înainte. Fișa rămâne în portofoliu.'
      ].join('\n\n'),
      keyPoints: [
        'Răspunsul se scrie în fraza întreagă, iar un stânjen de cam 2 metri duce la bucata dintre 2 metri și 3 metri.',
        'Compunerea are trei alineate, fiecare de cel puțin 15 cuvinte, cu două date din notă, o personificare subliniată și toate timpurile indicativului.',
        'Fișa de reflecție stă la persoana întâi și se pune în portofoliu.'
      ]
    })
  ]
};
