'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = {
  id: 'prietenia',
  title: 'Puterea prieteniei',
  inOwnWords: 'Prietenia trece peste diferențe de etnie și de statut. Lucrezi identitatea personală și pe cea națională, textul care explică, apoi substantivul, articolul și prepoziția. Scrisoarea Vasile Porojan, scrisă de Vasile Alecsandri la Mircești, poate purta alt titlu la clasă.',
  toc: [
    'Dincolo de diferențe sociale sau etnice. Identitate personală și națională (Vasile Porojan, de Vasile Alecsandri)',
    'Secvența explicativă și descriptivă. Deducție. Inferențe',
    'Real și aparență. Înțelegerea unui text',
    'Etapele scrierii',
    'Textul explicativ. Limba standard. Normă și abatere',
    'Substantivul: număr, gen, comun și propriu',
    'Articolul hotărât și nehotărât. Ortografia',
    'Combinările substantivului. Prepoziția',
    'Lectură și prejudecăți',
    'Recapitulare și evaluare'
  ],
  glossary: [
    {
      term: 'substantiv',
      meaning: 'Numește o ființă, un lucru, o idee: copil, carte, prietenie.'
    },
    {
      term: 'articol',
      meaning: 'Hotărăște dacă vorbitorul știe despre care substantiv e vorba (hotărât) sau nu (nehotărât).'
    },
    {
      term: 'inferență',
      meaning: 'Ce poți deduce din indicii, fără să inventezi o altă poveste.'
    },
    {
      term: 'identitate',
      meaning: 'Nume, rol, limbă, etnie și respectul pentru tine, spuse prin fapte.'
    },
    {
      term: 'determinare',
      meaning: 'Cât de cunoscut este obiectul numit de substantiv, prin articol.'
    },
    {
      term: 'atribut',
      meaning: 'Cuvântul care lămurește un substantiv: bun, de ieri, lui.'
    },
    {
      term: 'prepoziție',
      meaning: 'Cuvânt neflexibil care leagă un substantiv sau un pronume de alt termen.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-prietenie',
      title: 'Respectul și ce vei descoperi',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Respectul',
        text: 'Respectul îi lasă omului dreptul să fie el. Unitatea despre prietenie se deschide cu acest gest, înainte de gramatică.'
      }],
      theory: [
        'Respectul nu este o formulă de politețe. Este recunoașterea că orice persoană poate rămâne ea însăși, cu numele și cu felul ei.',
        'De la acest gest pleacă întregul drum. Dacă îl sari, diferența de etnie sau de rol se preface în etichetă.',
        'Trei instrumente se reiau, pentru că le folosești imediat. Substantivul numește. Identitatea personală spune cine ești. Descrierea arată înfățișarea.',
        'Trei teme sunt noi. Articolul arată cât de cunoscut este numele. Identitatea națională adună limba și sărbătorile. Textul descriptiv înfățișează un om sau un loc.',
        'Prepoziția așteaptă o lecție de mai târziu. Ea leagă cuvinte, dar are nevoie de o persoană deja lămurită. Întâi stabilești despre cine scrii.',
        'Înainte de scrisoare alcătuiești o fișă. Treci numele, rolul și etnia. Fără aceste trei date, textul plutește.',
        'Pe fișă mai stau un portret, într-o singură propoziție, și o mostră de articol. Poți lua prietena și arăta finalul lipit de nume.',
        'Scrisoarea se citește abia după fișă. Altfel riști să judeci un om pe care nu l-ai numit.',
        'Maria ține ordinea. Notează cine este persoana, ce rol are în grup și din ce etnie vine. Portretul ei rămâne scurt.',
        'La prietena, Maria marchează articolul. Abia apoi deschide scrisoarea. Respectul ei se vede în succesiune, nu într-o vorbă goală.',
        'Țintele unității sunt cinci coduri. Le reții în șir: 1.4, urmat de 2.4, apoi 3.1. La capăt stau 4.2 și 5.1.',
        'Codurile nu înlocuiesc lecțiile. Ele spun ce trebuie să poți la final: să citești cu grijă, să scrii limpede și să vezi omul înaintea etichetei.'
      ].join('\n\n'),
      example: [
        'Maria trece pe fișă numele, rolul și etnia. Adaugă o propoziție de portret. La prietena subliniază articolul din coadă.',
        'Scrisoarea se deschide la urmă. Omul este cunoscut înainte de poveste. Fără fișă, textul ar vorbi despre cineva încă nenumit.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Andrei notează coleg, etnie și un portret de o linie: păr scurt, zâmbet liniștit. Exemplul de articol este băiatul. Scrisoarea rămâne închisă până termină fișa.'
      }],
      tryThis: [
        'Scrie cinci enunțuri scurte. Pornește de la respect, treci apoi la substantiv și la identitatea personală. Continuă cu descrierea, cu articolul, cu identitatea națională și cu textul descriptiv.',
        'Mai pune prepoziția, numele, rolul, etnia, portretul, scrisoarea și prietena. Arată că prepoziția vine după ce persoana este deja cunoscută.',
        'În ultimul enunț înșiră codurile 1.4, 2.4, 3.1, 4.2 și 5.1 și spune că sunt ținte, nu lecții separate.'
      ].join('\n\n'),
      keyPoints: [
        'Respectul recunoaște persoana înainte de text, iar drumul despre prietenie pleacă de la om.',
        'Se reiau substantivul, identitatea personală și descrierea. Apar articolul, identitatea națională și textul descriptiv.',
        'Fișa dinaintea scrisorii are nume, rol, etnie, portret și un articol, ca la prietena. Codurile sunt 1.4, 2.4, 3.1, 4.2, 5.1.'
      ]
    }),
    lesson({
      id: 'identitate',
      title: 'Identitate personală și națională',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Cine ești',
        text: 'Identitatea personală te deosebește ca om anume. Cea națională strânge limba, sărbătorile și locurile ținute împreună cu alții.'
      }],
      theory: [
        'Te arăți ca persoană prin date stabile: nume, rol, naționalitate, religie și etnie. Dacă lipsește una, portretul rămâne incomplet.',
        'Imaginea de sine înseamnă părerea formată despre propria persoană. Poate fi blândă sau aspră. Nu se confundă cu faptele văzute de colegi.',
        'Stima de sine înseamnă respectul purtat față de tine. O părere bună nu ține loc de respect, iar respectul nu se rezumă la o laudă.',
        'Identitatea națională nu te închide într-un grup. Ea adună ce este comun: limba vorbită, sărbătorile și locurile știute de mai mulți.',
        'O prietenie poate uni persoane a căror etnie nu este aceeași. Diferența nu rupe legătura. O face vizibilă și o pune la încercare.',
        'Calendarul fixează 18 decembrie pentru Ziua Minorităților Naționale. O notezi ca reper de respect, nu ca o temă străină de prietenie.',
        'Ion își trece numele și rolul de elev. Pe aceeași fișă stau naționalitatea, religia și etnia. Datele îl arată ca persoană, nu ca mostră de grup.',
        'Dacă Ion socotește că este un coleg de nădejde, aceasta ține de imaginea de sine. Respectul pentru propria persoană ține de stima de sine.',
        'Limba română, sărbătorile petrecute laolaltă și locurile comune țin de identitatea națională. Ele nu șterg etnia fiecăruia.',
        'Prietenia lui Ion îl apropie și de un coleg cu altă etnie. În ziua de 18 decembrie, el marchează minoritățile, nu trece data cu vederea.',
        'Din fișă faci trei mișcări. Întâi redai datele scrise. Apoi spui ce observi, iar rândul pornește cu Văd. La urmă alegi o faptă a ta.',
        'Fapta o legi prin pentru că. Motivul trebuie să iasă din date, nu dintr-o părere așezată înaintea omului.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: elevul Ion își așază pe fișă naționalitatea, religia și etnia. Prietenia îl apropie de un coleg dintr-o altă etnie.',
        'Ce observi: Văd doi colegi unul lângă altul. Aș vorbi calm cu cel de lângă Ion, pentru că legătura lor trece peste etnie.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Lara, elevă, pune pe fișă trei date: naționalitatea, religia, etnia. Se socotește o colegă calmă, iar aceasta ține de imaginea de sine. Respectul față de sine ține de stima de sine. La 18 decembrie marchează, cu o prietenă de altă etnie, ziua minorităților.'
      }],
      tryThis: [
        'Lara este elevă și trece pe fișă naționalitatea, apoi religia, apoi etnia. Despre sine crede că rămâne o colegă calmă. Această părere este imaginea de sine. Respectul purtat sieși este stima de sine.',
        'O apropie de o prietenă din altă etnie limba română, alături de sărbătorile ținute împreună și de locurile știute de amândouă. Data de 18 decembrie este, pentru ele, Ziua Minorităților Naționale.',
        'Scrie trei enunțuri: ce stă scris, ce observi și ce ai face tu. Observația începe cu Văd. Fapta ta se leagă prin pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Datele persoanei sunt numele, rolul, naționalitatea, religia și etnia. Imaginea de sine este părerea. Stima de sine este respectul.',
        'Identitatea națională adună limba, sărbătorile și locurile comune. Prietenia poate uni etnii diferite.',
        '18 decembrie este Ziua Minorităților Naționale. Din fișă redai datele, observi cu Văd și alegi o faptă motivată prin pentru că.'
      ]
    }),
    lesson({
      id: 'scrisoare-prieten',
      title: 'Scrisoarea și cuvântul de azi',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Cine primește scrisoarea',
        text: 'Destinatarul este omul salutat la început. Nu este, de la sine, persoana despre care se povestește mai departe.'
      }],
      theory: [
        'Scrisoarea Vasile Porojan îi aparține lui Vasile Alecsandri. Locul este Mircești. Anul este 1881. Aceste trei date fixează textul.',
        'Deschiderea salută un prieten. Firul de după salut îl are în centru pe un rom. Omul din salut și omul din povestire nu coincid.',
        'O judecată asupra textului cade în trei trepte: sigură, probabilă ori imposibilă. O așezi după dovezi, nu după impresia de la prima lectură.',
        'Afirmația că scrisoarea i-ar fi adresată celui povestit este imposibilă. Salutul arată alt om. Confuzia amestecă destinatarul cu subiectul.',
        'Forma veche țigan nu se mai folosește. În limba de azi spui rom. Schimbarea ține de respect, nu de o preferință de stil.',
        'Numele lunilor stau cu literă mică. Scrii septembrie, nu cu majusculă în interiorul enunțului. Doar începutul frazei cere majusculă.',
        'Când lucrezi textul, faci trei mișcări. Redai ce este scris: autor, loc, an, salut. Apoi spui ce observi. La urmă alegi o faptă a ta.',
        'Observația poate începe cu Îl văd, ca să arăți scena, nu să o inventezi. Fapta se leagă prin pentru că și trebuie să urmeze din salut.',
        'Dacă spui că destinatarul este romul din povestire, ai mutat scrisoarea la alt om. Proba este salutul de la început, nu firul amintirii.',
        'Sigur este ce stă în text. Probabil este ce se poate sprijini pe un indiciu, fără dovadă deplină. Imposibil contrazice o dată clară.',
        'La clasă, titlul de pe bancă poate diferi. Autorul, locul Mircești și anul 1881 rămân reperele. Cuvântul de azi rămâne rom.',
        'Luna septembrie, scrisă cu literă mică, este proba că știi norma, nu doar povestea. Data și forma cuvântului merg împreună.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: la Mircești, în 1881, Vasile Alecsandri compune scrisoarea Vasile Porojan și salută un prieten. Destinatarul rămâne omul din salut.',
        'Ce observi: Îl văd pe autor cu foaia în mână. Aș saluta prietenul din deschidere, pentru că lui îi este trimis textul, nu celui povestit.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă un coleg spune că scrisoarea îi este trimisă romului din amintire, afirmația este imposibilă. Salutul deschide către alt prieten. Luna din data se scrie septembrie.'
      }],
      tryThis: [
        'Scrie două enunțuri. În primul numește autorul scrisorii Vasile Porojan, locul Mircești și anul 1881.',
        'În al doilea spune cine este destinatarul: persoana din salut, nu neapărat cea din povestire. Amintește că azi spui rom și că septembrie stă cu literă mică.',
        'Închizi cu o faptă a ta, introdusă prin Eu aș și motivată prin pentru că, legată de un gest din textul tău.'
      ].join('\n\n'),
      keyPoints: [
        'Vasile Alecsandri scrie de la Mircești, în 1881, scrisoarea Vasile Porojan. Destinatarul este cel salutat.',
        'Judecata cade în trei trepte: sigur, probabil, imposibil. Ideea că textul i-ar fi fost trimis celui povestit cade la imposibil.',
        'Forma veche se înlocuiește cu rom. Lunile, între care septembrie, stau cu literă mică.'
      ]
    }),
    lesson({
      id: 'proiect-romi',
      title: 'Proiectul despre o comunitate',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Forma proiectului',
        text: 'Lucrarea ia forma unei broșuri ori a unei prezentări. Poate fi individuală sau de echipă. Subiectul este cum trăia o comunitate înaintea unei schimbări mari și cum trăiește după.'
      }],
      theory: [
        'Proiectul nu este o poveste inventată. Este o lucrare în care faptele se verifică. Fără sursă, o informație rămâne zvon.',
        'Cauți în volume școlare și în enciclopedii. Poți vorbi și cu oameni din comunitate. Trei feluri de surse se pot completa.',
        'O schimbare mare împarte viața în două: cum era înainte și cum a ajuns după. Ambele părți trebuie să aibă date, nu doar impresii.',
        'Poți lucra singur, dacă ții tu toate rolurile. În echipă, fiecare aduce o sursă. Nimeni nu semnează o fișă pe care nu a verificat-o.',
        'Un termen necunoscut, de exemplu unul din limba romani, nu rămâne fără tâlc. Lângă el așezi înțelesul, ca cititorul să nu ghicească.',
        'Trei capitole ajung pentru o broșură clară. Unul este despre familie. Altul despre sărbătoare. Al treilea despre o personalitate.',
        'La sfârșit treci sursele. Scrii volumele, enciclopedia și numele oamenilor care au vorbit, ca oricine să poată relua verificarea.',
        'Prezentarea orală urmează aceeași hartă. Nu schimbi tema pe drum. Înainte și după schimbare rămân cele două jumătăți.',
        'Dacă un cuvânt din limba romani stă fără tâlc, capitolul se închide pentru cel din afara grupului. Înțelesul este parte din respect.',
        'Personalitatea aleasă se leagă de comunitate prin fapte, nu printr-o laudă goală. Familia și sărbătoarea arată viața de zi cu zi.',
        'Schimbarea mare trebuie numită: o mutare, o lege, o școală nouă. Fără nume, înainte și după se amestecă.',
        'Broșura și prezentarea sunt două forme ale aceleiași lucrări. Alegi una. Sursele rămân obligatorii în ambele.'
      ].join('\n\n'),
      example: [
        'Grupul alcătuiește o broșură. Viața comunității este arătată în două timpuri, înaintea schimbării numite și după ea. Capitolele acoperă familia, sărbătoarea și o personalitate.',
        'Un termen din limba romani stă lipit de tâlcul lui. La capăt apar volumele școlare, enciclopedia și oamenii care au povestit.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Un elev lucrează singur o prezentare. Schimbarea este deschiderea unei școli. El pune familia înainte, sărbătoarea după, apoi o personalitate. Fiecare fapt are o sursă la sfârșit.'
      }],
      tryThis: [
        'Scrie șase enunțuri scurte. Folosește broșură, prezentare, singur, echipă, comunitate și schimbare.',
        'Mai pune volume școlare, enciclopedii, oameni, limba romani, înțeles, familie, sărbătoare, personalitate și surse.',
        'Arată că un cuvânt nou stă lângă tâlcul lui și că lista de surse închide lucrarea.'
      ].join('\n\n'),
      keyPoints: [
        'Lucrarea este broșură ori prezentare, individuală sau de echipă. Ea privește o comunitate în două momente: înaintea unei schimbări mari și după aceea.',
        'Faptele se verifică în volume școlare, enciclopedii sau la oameni din comunitate. Un cuvânt din limba romani stă lângă înțeles.',
        'Trei capitole ajung: familie, sărbătoare, personalitate. Sursele se scriu la sfârșit.'
      ]
    }),
    lesson({
      id: 'inferente',
      title: 'Explicativ, descriptiv, deducție, real și aparență',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Inferența',
        text: 'Inferența este concluzia scoasă dintr-un indiciu. Te oprești la el. Nu completezi întâmplarea cu ce textul a lăsat afară.'
      }],
      theory: [
        'Bucata explicativă arată motivul sau felul în care se petrece ceva. Ea răspunde la de ce și la cum se întâmplă.',
        'Bucata descriptivă dă înfățișarea: o ființă, un loc ori un lucru. Nu caută cauza. Înșiră trăsături.',
        'Prietenia adevărată are trei reazeme: vorba directă, loialitatea și respectul. Un cont vesel nu le înlocuiește.',
        'Forumul adună mai multe mesaje într-un loc. Chatul este o replică scurtă, rostită imediat. Când povestești, nu le contopești.',
        'ID-ul rămâne un nume de utilizator. Singur, nu dovedește numele din acte. Imaginea de pe ecran nu este persoana întreagă.',
        'Andrei primește în chat o replică scurtă, pe loc. În forum dă peste mesaje strânse. Canalele nu spun același lucru despre om.',
        'Motivul pentru care a scris ține de secvența explicativă. Înfățișarea contului ține de secvența descriptivă.',
        'Contul pare vesel. Aceasta este doar o aparență. Rămâi la indiciu. Nu hotărî că omul este vesel în toată viața.',
        'Dacă inventezi familia lui Andrei, ai ieșit din text. Inferența se sprijină doar pe ce se poate arăta.',
        'El caută o prietenie cu vorbă directă, cu loialitate și cu respect. Ecranul le poate amâna pe toate, dacă rămâi la cont.',
        'Din scenă faci trei mișcări, fără să lungești povestea. Redai ce este scris. Spui ce observi. Alegi o faptă a ta, legată prin pentru că.',
        'Observația poate începe cu Îl văd. Fapta trebuie să iasă din indiciu, nu dintr-o bănuială pusă peste ecran.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: Andrei primește în chat o replică scurtă, iar în forum dă peste mesaje strânse. Contul zâmbitor nu înseamnă omul întreg.',
        'Ce observi: Îl văd în fața ecranului, lângă mesaje și lângă un cont zâmbitor. Aș vorbi direct cu omul, pentru că prietenia adevărată cere vorbă, nu doar o imagine.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Maria dă pe forum peste mesaje despre un joc și primește în chat o replică scurtă. Motivul intrării în joc este explicație. Înfățișarea contului este descriere. ID-ul nu îi predă numele din acte. Ea rămâne la indiciu.'
      }],
      tryThis: [
        'Maria, în forum, dă peste mesaje strânse despre un joc. În chat i se spune o replică scurtă, imediat. Contul afișează un zâmbet, însă ID-ul nu coincide cu numele din acte.',
        'Motivul intrării în joc ține de secvența explicativă. Înfățișarea contului ține de secvența descriptivă. Ea caută vorbă directă, loialitate și respect.',
        'Scrie trei enunțuri: ce stă scris, ce observi și ce ai face tu. Observația începe cu Văd. Motivul se leagă prin pentru că. Rămâi la indiciu.'
      ].join('\n\n'),
      keyPoints: [
        'Inferența se oprește la indiciu. Bucata explicativă dă motivul sau felul. Bucata descriptivă dă înfățișarea.',
        'Forumul strânge mesaje. Chatul este o replică scurtă, imediată. ID-ul este nume de utilizator, nu numele din acte.',
        'Prietenia adevărată cere vorbă directă, loialitate și respect. Contul vesel rămâne aparență.'
      ]
    }),
    lesson({
      id: 'portret-prieten',
      title: 'Portretul prietenului',
      kind: 'lectura',
      boxes: [{
        type: 'regula',
        title: 'Trei forme',
        text: 'Portretul prietenului trece prin plan, prin ciornă și prin varianta gata. Nu predai prima încercare.'
      }],
      theory: [
        'Planul strânge datele, ca omul să nu se piardă în fraze goale. Treci numele și prenumele, apoi porecla și rolul.',
        'Mai notezi înfățișarea, plăcerea, locul întâlnirii și subiectul vorbei. Fără loc și fără subiect, portretul rămâne o listă.',
        'Ciorna se scrie repede, apoi ajunge la un coleg. Asculți o sugestie. Nu ești obligat să o copiezi, dar o iei în seamă.',
        'Varianta gata începe cu o frază scurtă și continuă cu trei paragrafe. Unul dă chipul. Altul spune ce faceți împreună. Al treilea dă motivul pentru care legătura contează.',
        'Lângă substantiv așezi atributul, cuvântul care îl lămurește. În prieten loial vezi centrul și lămurirea.',
        'În planul lucrat, prenumele este Andrei, porecla este Andi, rolul este coleg. Părul este scurt. Îi place fotbalul.',
        'Vă vedeți în curtea școlii. Vorbiți despre meci. Aceste două date țin portretul într-o scenă, nu în aer.',
        'După plan vine ciorna. O dai unui coleg. Sugestia lui poate cere un detaliu de chip sau un motiv mai clar.',
        'Fraza scurtă de la început anunță cine este omul. Cele trei paragrafe nu repetă anunțul. Îl dezvoltă.',
        'Loial stă lângă prieten, nu rătăcește la capătul frazei. Cititorul trebuie să vadă imediat ce substantiv este lămurit.',
        'Ca cititor, faci trei mișcări. Redai datele. Spui ce observi. Alegi o faptă a ta, legată prin pentru că.',
        'Dacă sari ciorna și sugestia, textul rămâne doar al tău, neverificat. Schimbul cu colegul ține de portret, nu este un adaos.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: Andrei este coleg, are porecla Andi și părul scurt. Întâlnirea stă în curtea școlii. Vorba lor este meciul.',
        'Ce observi: Îl văd în curte, cu părul scurt. Aș sta de vorbă despre meci, pentru că acesta este subiectul întâlnirii lor.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Planul pentru Mara: prenume Mara, poreclă Mari, rol colegă, păr lung, îi place desenul, locul este biblioteca, subiectul este un album. Ciorna trece la un coleg. Varianta gata are o frază și trei paragrafe. Grupul prietenă loială ține lămurirea lângă nume.'
      }],
      tryThis: [
        'Scrie două enunțuri: numele unui prieten, rolul lui, cum se arată și unde vă vedeți. Pune un adjectiv lângă un substantiv, modelul fiind prieten loial.',
        'Arată că varianta gata are o frază scurtă la început și trei paragrafe: chipul, activitatea comună și motivul pentru care legătura contează.',
        'Închizi cu o faptă a ta, prin Eu aș și prin pentru că, despre un gest din textul tău. Menționează că ciorna ajunge la un coleg.'
      ].join('\n\n'),
      keyPoints: [
        'Planul are nume, prenume, poreclă, rol, chip, plăcere, loc și subiect. Ciorna ajunge la un coleg, care dă o sugestie.',
        'Varianta gata are o frază scurtă și trei paragrafe: chip, ce faceți împreună, de ce contează legătura.',
        'Atributul se lipește de substantiv, cum vezi în prieten loial. Andrei, poreclit Andi, se vede în curtea școlii, iar discuția este meciul.'
      ]
    }),
    lesson({
      id: 'explicativ',
      title: 'Textul explicativ și limba standard',
      kind: 'redactare',
      boxes: [{
        type: 'definitie',
        title: 'Două idei',
        text: 'Textul explicativ predă ceva, în ordine, pe înțelesul oricui. Forma standard o înțelege și cine stă în afara grupului tău.'
      }],
      theory: [
        'Construcția are patru mișcări. Întâi anunți tema, de exemplu prin vorbele în această prezentare voi vorbi despre. Apoi alegi două sau trei aspecte.',
        'Aspectele cresc printr-o comparație ori printr-un exemplu. Sfârșitul este scurt: o reflecție sau o invitație. Nu deschizi o poveste nouă.',
        'Scrierea are trei pași: ideile, planul, textul. Dacă sari planul, aspectele se amestecă și cititorul pierde ordinea.',
        'Pe internet, limba standard arată respect pentru cititor. El poate să nu cunoască prescurtările grupului tău.',
        'Într-o prezentare despre prietenie, două aspecte pot fi vorba sinceră și timpul petrecut împreună. Comparația și exemplul le fac vizibile.',
        'Exemplul poate fi o întâlnire în care ascultați pe rând. Sfârșitul poate fi o invitație scurtă, nu un al patrulea aspect strecurat.',
        'Scrii că și ce întregi. Nu le înlocuiești cu k sau cu sh. Prescurtarea îl lasă pe cititor să ghicească.',
        'Articolul stă întreg: copilul, nu copilu. Cuvântul stă întreg: cineva, nu cnv. Cratima stă la locul ei: dă-mi, nu dămi.',
        'Voi scrieți se păstrează nedespărțit. Varianta voi scrie-ți mută cratima unde nu are ce căuta. Nu rupe terminația de verb.',
        'Secundele folosite ca să recitești îl respectă pe cititor. Emoticonul poate arăta fața, gestul sau emoția, dar nu înlocuiește fraza.',
        'Din prezentare faci trei verificări. Redai ce ai anunțat. Spui ce observi în scenă. Alegi o faptă a ta, cu pentru că.',
        'Dacă ai idee, plan și patru mișcări, dar pe ecran stau cnv și dămi, norma a căzut. Limba standard ține și de semnele mici.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: în întâlnirea despre prietenie, oamenii ascultă pe rând, iar desenul cu o față arată o emoție. Formula de început anunță tema.',
        'Ce observi: îi văd adunați, lângă un semn care are o față. Aș asculta pe rând, pentru că exemplul din text cere tocmai această răbdare.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'O prezentare despre jocul în echipă anunță două puncte, reguli clare și timp de ascultare. Ca ilustrare stă un meci cu așteptare pe rând. Sfârșitul este o reflecție. În mesaj apar cineva, copilul și dă-mi. Voi scrieți rămâne nedespărțit.'
      }],
      tryThis: [
        'Deschide prin vorbele în această prezentare voi vorbi despre, apoi numește jocul în echipă. Alege două puncte. Unul este regulile clare. Celălalt este timpul în care ascultați.',
        'Ilustrează printr-un meci unde stați la rând. Încheie cu o reflecție scurtă. În mesaj scrie că și ce întregi, apoi cineva, copilul și dă-mi. Păstrează voi scrieți nedespărțit.',
        'Scrie trei enunțuri: ce stă scris, ce observi și ce ai face tu. Observația începe cu Văd. Emoticonul poate arăta un zâmbet. Spune că secundele de recitire îl respectă pe cititor.'
      ].join('\n\n'),
      keyPoints: [
        'Textul explicativ anunță tema, dă două sau trei aspecte, le crește prin comparație ori exemplu și încheie scurt. Pașii sunt idei, plan, text.',
        'Limba standard se înțelege și în afara grupului. Scrii întregi că, ce, cineva, copilul și dă-mi.',
        'Voi scrieți rămâne nedespărțit. Recitirea este respect. Emoticonul poate arăta fața, gestul sau emoția.'
      ]
    }),
    lesson({
      id: 'substantiv',
      title: 'Substantivul și pluralul',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Substantivul',
        text: 'Substantivul numește o persoană, o ființă, un lucru, un loc sau o idee. Se schimbă: primește gen, număr și, când e cazul, articol.'
      }],
      theory: [
        'Comunul acoperă o clasă, de pildă băiatul sau cățelul. Propriul fixează un singur exemplar și cere majusculă, ca la Andrei și la Max.',
        'Luna din calendar rămâne cu minusculă, așa că scrii septembrie. Când strigi pe cineva, virgula vine imediat după nume: Andrei, vino aici.',
        'Bunătate numește o idee, deci stă la substantiv. Vesel arată o însușire, deci stă la adjectiv. Vecinătatea în frază nu le face aceeași clasă.',
        'Masculinul se vede la un băiat și, la plural, la doi băieți. Femininul se vede la o fată. Neutrul se vede la un dulap și, la plural, la două dulapuri.',
        'Mai multe exemplare se marchează prin alte sunete, nu printr-o terminație unică. Din casă faci case. Asta este pluralul.',
        'Dicționarul păstrează forma de un singur exemplar. Ai pomi, cauți pom. Ai lalele, cauți lalea. Ai creioane, cauți creion.',
        'Ai injecții, cauți injecție. Ai mătuși, cauți mătușă. Dacă intri cu pluralul, adesea nu găsești intrarea.',
        'La sandvici, pluralul bun este sandviciuri. Sendvișuri se lasă. La ghiozdan, forma este ghiozdane. Ghiozdanuri se lasă.',
        'Ciocolată dă ciocolate, nu ciocolăți. Chibrit dă chibrituri, nu chibrite. Aragaz dă aragaze, nu aragazuri.',
        'Acoperiș dă acoperișuri, nu acoperișe. Ca să spui ale cui sunt, genitivul este acoperișurilor. Cu articol cunoscut scrii aripile, nu aripele.',
        'La ferestre, forma cunoscută este ferestrele, fără un r adăugat. Când ochii sunt cei pe care îi știe toată lumea, păstrezi articolul: ochii. Fără articol, ochi rămâne nehotărât.'
      ].join('\n\n'),
      example: [
        'Andrei, apropie-te: lângă dulap stau un băiat și o fată. Vorba despre bunătate cade în septembrie. Max, cățelul, e vesel, iar vesel nu e substantiv.',
        'Doi băieți, două dulapuri. În sat, o casă stă lângă mai multe case. În dicționar intri cu pom, cu lalea, cu creion, cu injecție și cu mătușă.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'În trei ghiozdane găsești sandviciuri, alături de ciocolate și de o cutie cu chibrituri. Aragazele stau în bucătărie. Acoperișurile se văd înalte. Culoarea, spusă cu genitivul, este a acoperișurilor. Aripile par deschise. Ferestrele luminate seamănă cu ochii casei.'
      }],
      practice: [
        '1) Ce parte de vorbire este bunătate și ce este vesel?',
        '2) Ce formă cauți în dicționar când ai pomi, lalele, creioane, injecții și mătuși?',
        '3) Alege pluralul bun: sandviciuri sau sendvișuri. Ghiozdane sau ghiozdanuri. Chibrituri sau chibrite.',
        '4) Cum scrii forma cunoscută la aripi și la ferestre, plus genitivul de la acoperișuri?'
      ].join('\n\n'),
      answers: [
        'bunătate este substantiv; vesel este adjectiv',
        'pom, lalea, creion, injecție, mătușă',
        'sandviciuri; ghiozdane; chibrituri',
        'aripile; ferestrele; acoperișurilor'
      ],
      mistakes: 'Nu păstra sendvișuri, nici ghiozdanuri, nici ciocolăți, nici chibrite, nici aragazuri, nici acoperișe, nici aripele. Septembrie rămâne cu minusculă. Numele strigat primește virgulă. Ochii, cu articol, sunt cei cunoscuți.',
      tryThis: [
        'Scrie enunțuri scurte cu băiat, cățel, Andrei, Max și septembrie, apoi cu fată, dulap, băieți și dulapuri. După numele pe care îl chemi, pune virgulă.',
        'Mai folosește casă lângă case, apoi ciocolate, aragaze și acoperișuri. Adaugă acoperișurilor, aripile, ferestrele și ochii. Spune de ce la dicționar rămâi la un singur exemplar.'
      ].join('\n\n'),
      keyPoints: [
        'Substantivul numește și își schimbă genul și numărul. Clasa ține de comun. Majuscula ține de propriu. Luna rămâne cu minusculă.',
        'Pluralul se aude în terminație, cum vezi de la casă la case. La dicționar intri cu un exemplar: pom, apoi lalea, apoi creion, apoi injecție, apoi mătușă.',
        'Ține sandviciuri și ghiozdane. Ține ciocolate și chibrituri. Ține aragaze, acoperișuri și genitivul acoperișurilor. La urmă, aripile, ferestrele, ochii.'
      ]
    }),
    lesson({
      id: 'articol-prepozitie',
      title: 'Articolul și scrierea lui',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Determinare',
        text: 'Prin articol afli cât de cunoscut îți este lucrul numit de substantiv. Lămurirea aceasta poartă numele de determinare.'
      }],
      theory: [
        'Nehotărâtul stă înaintea substantivului și arată un obiect încă puțin știut. Îi reții cinci forme: un, o, niște, apoi unui și unor.',
        'Hotărâtul se lipește și arată un obiect deja știut. La masculin, singular, terminația este -ul. Exemplul este băiatul.',
        'La feminin, singular, terminația este -a. Exemplul este fata. La plural feminin, terminația este -le. Exemplul este mingile. Nu lungi la mingiile și nu coborî la mingiei.',
        'Pluralul hotărât mai dă copiii. Lângă niște, lângă doi sau lângă multe, articolul din coadă lipsește. Rămân niște copii, doi băieți, multe mingi.',
        'În toți copiii stau și pluralul, și hotărâtul. Toți cere lucruri deja știute, deci terminația nu cade.',
        'Genitivul spune al cui este lucrul. Pentru Florina scrii Florinei. Lui Florina nu este forma de aici.',
        'DEX-ul, ca orice dicționar, dă substantivul fără articol. Intrarea este prieten, nu prietenul. Intrarea este orășel, nu orășelul.',
        'Un prieten ajută când omul îți este încă necunoscut. Prietenul meu ajută pentru că îl știi. Articolul schimbă gradul de cunoaștere.',
        'Dacă la -le mai pui un i, ca în mingiile, ai dublat semnul. Mingile este forma cu -le. Lângă toți, copiii nu rămâne fără articol.',
        'Legătura fără nume, adică prepoziția, se predă în lecția care urmează. Aici rămâi la articol și la determinare.'
      ].join('\n\n'),
      example: [
        'Un băiat și o fată țin niște mingi. Hotărât, băiatul și fata le strâng. Mingea ajunge unui copil. Unor copii li se spune să aștepte.',
        'Joacă niște copii. Aleargă doi băieți. Jos stau multe mingi. Râd toți copiii. Mingile sunt în plasă. Despre joc i-am scris Florinei.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'În DEX intri la prieten și la orășel, fără -ul. Lui Florina nu este genitivul. Forma este Florinei. Lângă multe scrii multe mingi, nu mingile.'
      }],
      practice: [
        '1) Care sunt cele cinci forme ale articolului nehotărât?',
        '2) Cum scrii pluralul hotărât feminin de la mingi și de ce nu mingiile?',
        '3) Ce se întâmplă cu articolul din coadă când ai niște, când ai doi și când ai multe?',
        '4) Cum cauți în DEX formele prietenul și orășelul, și care este genitivul pentru Florina?'
      ].join('\n\n'),
      answers: [
        'un, o, niște, unui, unor',
        'mingile, pentru că se lipește -le, nu un i în plus',
        'nu se pune: niște copii, doi băieți, multe mingi',
        'prieten și orășel, fără articol; Florinei'
      ],
      mistakes: 'Nu scrie mingiile, nici mingiei, nici lui Florina. Lângă niște, lângă doi și lângă multe cade articolul din coadă, dar toți copiii îl păstrează. În DEX nu intri cu -ul.',
      tryThis: 'Alcătuiște patru propoziții cu un, o, niște, unui, unor, băiatul, fata, copiii și toți copiii. În una arată că în DEX intrarea este prieten, nu prietenul, și orășel, nu orășelul.',
      keyPoints: [
        'Nehotărâtul stă înainte: un, o, niște, apoi unui și unor. Hotărâtul se lipește, cu -ul, cu -a sau cu -le, ca la băiatul, la fata, la mingile și la copiii.',
        'Când ai niște, doi sau multe, terminația hotărâtă cade. Toți copiii o păstrează, pentru că are și plural, și hotărât.',
        'Genitivul pentru Florina este Florinei. În DEX intri fără articol, la prieten și la orășel. Prepoziția se ia în lecția care urmează.'
      ]
    }),
    lesson({
      id: 'atribut-substantiv',
      title: 'Substantivul și atributul',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Centrul grupului',
        text: 'Atributul stă lângă substantiv și îl lămurește. Centrul este substantivul, fiindcă el spune despre cine sau despre ce vorbim.'
      }],
      theory: [
        'Un atribut poate fi adjectiv. În prieten bun, centrul este prieten, iar bun spune ce fel de prieten. Fără adjectiv, numele rămâne gol.',
        'Un atribut poate fi un grup: prepoziție plus nume. În prieten de ieri, de ieri îl așază în timp. Prepoziția nu este centrul.',
        'Un atribut poate fi pronume. În prietenul lui, lui arată al cui este. Substantivul cu articol rămâne cuvântul care numește.',
        'La deschiderea unei compuneri pui măcar două grupuri de felul acesta. Unul singur lasă fraza săracă. Două dau și însușire, și legătură.',
        'Două fantome simpatice intră în casă. Centrul este fantome. Simpatice este atributul adjectiv. Nu îl lua pe simpatice drept substantiv.',
        'Prietenul de ieri râde în prag. De ieri este atributul construit cu prepoziție. Dacă îl scoți, rămâne doar prietenul, fără moment.',
        'În prietenul lui, pronumele lui nu numește o persoană nouă. O leagă de substantivul deja spus. De aceea este atribut, nu subiect.',
        'Poți deschide compunerea cu prieten bun lângă prieten de ieri. Două grupuri, două feluri de atribut, același tip de centru.',
        'Dacă duci atributul departe de substantiv, cititorul nu mai știe ce lămurește. Ține-l lângă centru, în același grup.',
        'Nu ești obligat să pui și pronume, dar prietenul lui arată că atributul nu este mereu adjectiv.'
      ].join('\n\n'),
      example: [
        'În casă intră două fantome simpatice, iar în prag râde prietenul de ieri. La primul grup, centrul este fantome, iar atributul este simpatice.',
        'De ieri lămurește prin prepoziție. La prietenul lui, centrul rămâne substantivul, iar lui este atributul pronume. Deschiderea cere măcar două grupuri.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Compunerea se deschide cu o scrisoare veche și cu prietenul lui. Veche este adjectiv. Lui este pronume. Ambele lămuresc un substantiv. Un singur grup ar fi fost prea puțin.'
      }],
      practice: [
        '1) Cine este centrul în prieten bun și ce fel de atribut este bun?',
        '2) Ce fel de atribut este de ieri în grupul prieten de ieri?',
        '3) Ce este lui în prietenul lui și de ce nu este centrul?',
        '4) Câte grupuri cu atribut pui, cel puțin, când deschizi o compunere?'
      ].join('\n\n'),
      answers: [
        'prieten este centrul; bun este atribut adjectiv',
        'atribut cu prepoziție',
        'atribut pronume; centrul este prietenul, fiindcă el numește',
        'cel puțin două'
      ],
      mistakes: 'Nu lua prepoziția sau pronumele drept centru. Centrul este substantivul. Un singur grup la deschiderea compunerii este prea puțin. În fantome simpatice, simpatice nu este substantiv.',
      tryThis: 'Scrie două propoziții ca să deschizi o compunere. Pune în ele grupul prieten bun, apoi grupul prieten de ieri, apoi grupul prietenul lui. La fiecare, spune centrul și atributul.',
      keyPoints: [
        'Atributul îl lămurește pe substantiv, iar substantivul rămâne centrul grupului.',
        'Poate fi adjectiv, ca la prieten bun, grup cu prepoziție, ca la prieten de ieri, sau pronume, ca la prietenul lui.',
        'Deschiderea compunerii cere măcar două grupuri. Fantome simpatice arată adjectivul lângă centru.'
      ]
    }),
    lesson({
      id: 'prepozitie',
      title: 'Prepoziția în limba de azi',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Cuvânt neflexibil',
        text: 'Prepoziția nu primește număr, timp sau persoană. Rămâne neschimbată. Stă înaintea unui nume ori a unui pronume, ca să îl lege de alt termen. Nu stă înaintea predicatului.'
      }],
      theory: [
        'Râd de tine înseamnă batjocură. Râd cu tine înseamnă râs împărtășit. De și cu nu sunt echivalente. Prepoziția alege sensul.',
        'Fără legătură, gătesc regina pune persoana în oală. Cu legătura cu, gătesc cu regina înseamnă că gătiți amândoi. Lipsa prepoziției schimbă fapta.',
        'În limba de azi alegi forma după sens, nu după o rostire veche sau de regiune. Comparația cere mai mari decât.',
        'Forma după păstrează litera ă. Dupe se lasă. La instrument scrii la, cum vezi când cânți la vioară. Pentru interes folosești de, ca în interesat de cineva.',
        'Viteza se leagă prin pe oră. Drumul se leagă prin la drum. Curățenia se leagă prin responsabil de. Soluția se leagă prin pentru. Telefonul se leagă prin la telefon.',
        'Finalul orei se leagă prin la final de oră. Pe final mută înțelesul și iese din norma de aici.',
        'Rostirile vechi se înlocuiesc pe rând. Cătră trece în către. Pi ici trece în pe aici. Dă pă trece în de pe.',
        'Expresia nu te lua după mine îți spune să nu copiezi pe cineva. Expresia ia câinele de pe mine îți spune să îl dai jos. După și de pe nu se schimbă între ele.',
        'Prepoziția nu modifică predicatul ca un adverb. După ea vine un nume sau un pronume.',
        'Dacă lași dupe, cătră sau dă pă într-o compunere de azi, ai păstrat o rostire care nu mai este forma recomandată.'
      ].join('\n\n'),
      example: [
        'După oră râdem împreună, iar supa o gătesc alături de regină. Cartea ajunge pe bancă. Dacă te interesează proiectul, sună-mă la telefon când ora se încheie.',
        'Pornește la drum și cântă la vioară. Rămâi responsabil de curățenie. Pentru temă caută o rezolvare, fiindcă voi sunteți mai mari decât noi.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'A venit către noi, mergând pe aici. Pentru viteză spui pe oră. I-am cerut să nu copieze gestul meu și să ia câinele de pe mine. Dupe, pi ici și dă pă nu rămân în textul de azi.'
      }],
      practice: [
        '1) Ce înseamnă râd de tine și ce înseamnă râd cu tine?',
        '2) Cum se scrie comparația pentru mai mari și care este forma corectă, după sau dupe?',
        '3) Înlocuiește cu forma de azi: cătră, pi ici, dă pă.',
        '4) Cu ce prepoziție legi viteza, drumul, telefonul și finalul orei?'
      ].join('\n\n'),
      answers: [
        'batjocură; râs împărtășit',
        'mai mari decât; după',
        'către; pe aici; de pe',
        'pe oră; la drum; la telefon; la final de oră'
      ],
      mistakes: 'Nu lăsa dupe, cătră, pi ici sau dă pă. Nu pune pe final în locul lui la final de oră. Gătesc regina, fără cu, schimbă sensul. Râd de tine nu înseamnă râs împărtășit.',
      tryThis: 'Scrie propoziții în limba de azi cu râd cu tine, cu gătesc cu regina, cu la vioară, cu interesat de, cu responsabil de curățenie, cu pentru, cu către și cu pe aici. Arată că după mine îți cere să nu copiezi pe cineva, iar câinele de pe mine se dă jos.',
      keyPoints: [
        'Prepoziția nu se schimbă și stă înaintea unui nume sau a unui pronume. De și cu nu sunt echivalente.',
        'În limba de azi, comparația stă cu mai mari decât, iar după păstrează ă. La vioară și la drum folosești la. Viteza stă cu pe oră. Curățenia cere responsabil de, soluția cere pentru, telefonul cere la, iar finalul orei tot la.',
        'Cătră trece în către, pi ici trece în pe aici, dă pă trece în de pe. Nu te lua după mine diferă de ia câinele de pe mine.'
      ]
    }),
    lesson({
      id: 'prejudecati',
      title: 'Prejudecăți și încheierea unității',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Prejudecata',
        text: 'Prejudecata este o părere pusă dinainte, înainte să vezi omul și înainte să citești. Lectura o poate verifica și o poate dărâma.'
      }],
      theory: [
        'Prietenia e ținută la preț în trei locuri: cărți, filme și teatru. Locul nu schimbă principiile. Ele rămân, chiar dacă scena diferă.',
        'Rămân patru principii: loialitate, acceptarea celuilalt așa cum este el, sinceritate și încredere. Un text le arată prin fapte, nu prin lozinci.',
        'În povești, o prietenie poate uni ființe care diferă mult. Diferența nu este obstacolul. Este proba că legătura nu cere asemănare.',
        'Cu literă mică stau zilele, lunile, popoarele și disciplinele. Excepție fac primul cuvânt din enunț și numele unei sărbători.',
        'Reflecția o scrii la persoana întâi. Notezi patru lucruri: o descoperire, o folosire într-o altă disciplină, ceva aflat despre tine și o curiozitate care rămâne.',
        'O pui în portofoliu, lângă fișele unităților deja închise. Nu o lași separată. Ea închide drumul și îl leagă de ce ai lucrat deja.',
        'În volum, două ființe care diferă mult își dau ajutor. Gestul lor adună loialitatea, acceptarea, sinceritatea și încrederea, toate patru.',
        'Dacă spui ceva despre toți dintr-un sat înainte să citești, rămâi la prejudecată. Textul încă nu a fost citit, deci părerea nu are probă.',
        'Marți stă cu literă mică: marți mă văd cu prietenii. La fel, marți avem matematică. Disciplina nu ia majusculă.',
        '1 Decembrie este nume de sărbătoare, deci păstrează majuscula. Nu o coborî doar pentru că lunile obișnuite stau cu minusculă.',
        'Jocul de încheiere ține de la 80 de cuvinte până la 100. Spui regulile. Subliniezi măcar trei prepoziții. Limita nu este o sugestie.',
        'În fișă poți nota două descoperiri. ID-ul nu dă numele din acte. Prepoziția o alegi mai atent decât la unitatea cu povestirea.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: în volum, două ființe care diferă mult își dau ajutor, iar gestul adună loialitatea, acceptarea, sinceritatea și încrederea.',
        'Ce observi: Văd două ființe diferite care se ajută. Aș ajuta și eu, pentru că ajutorul lor nu cere să semene una cu alta.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Într-un film, două ființe care diferă se ajută pe scenă. O părere despre tot satul, rostită înainte de lectură, rămâne prejudecată. Marți și matematică stau cu literă mică. 1 Decembrie rămâne sărbătoare. Jocul are cel puțin 80 de cuvinte și nu trece de 100.'
      }],
      tryThis: [
        'Scrie trei enunțuri despre un film în care două ființe care diferă mult se ajută. Arată loialitatea și încrederea. Spune că o părere despre tot satul, înainte de lectură, rămâne prejudecată.',
        'Mai scrie că marți te vezi cu prietenii și că marți ai matematică, ambele cu literă mică, iar 1 Decembrie rămâne nume de sărbătoare.',
        'Amintește că jocul ține de la 80 de cuvinte până la 100, că subliniezi măcar trei prepoziții și că fișa la persoana întâi poate spune că ID-ul nu dă numele din acte.'
      ].join('\n\n'),
      keyPoints: [
        'Prejudecata se pune dinainte, înainte de om și înainte de lectură. Lectura o verifică. Principiile sunt loialitatea, acceptarea, sinceritatea și încrederea.',
        'Zilele, lunile, popoarele și disciplinele rămân cu minusculă. Fac excepție primul cuvânt și sărbătoarea 1 Decembrie.',
        'Fișa la persoana întâi intră în portofoliu. Jocul are cel puțin 80 de cuvinte și nu trece de 100. Are reguli. Are măcar trei prepoziții subliniate.'
      ]
    }),
    lesson({
      id: 'carti-prietenie',
      title: 'Cărți în care prietenia trece peste diferență',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Recomandarea',
        text: 'Pentru o carte în care prietenia trece peste diferență ajung titlul, autorul și un motiv. Capitolul nu se povestește.'
      }],
      theory: [
        'Tu cauți cartea și o citești. Recomandarea vine după lectură, nu în locul ei. Un titlu auzit, fără motiv, nu este încă o alegere.',
        'Spui un singur motiv, legat de diferența pe care prietenia o trece. Colegul poate lua alt volum. Nu i-l impui pe al tău.',
        'Poți începe cu texte vechi. Epopeea lui Ghilgameș stă pe listă. Lângă ea stă Iliada. Ambele arată legături care nu cer oameni identici.',
        'Frații Grimm au scris Muzicanții din Bremen. Prietenia de acolo leagă ființe care nu seamănă. Motivul poate fi chiar această neasemănare.',
        'Lyman Frank Baum este autorul volumului Vrăjitorul din Oz. Îl poți recomanda dacă drumul îi apropie pe cei diferiți.',
        'Alexandre Dumas a scris Cei trei muschetari. Loialitatea din grup poate fi motivul tău, spus într-o propoziție, fără rezumat de capitol.',
        'Mark Twain îi are pe Tom Sawyer și pe Huckleberry Finn. Poți alege unul dintre titluri. Autorul se spune o dată, limpede.',
        'Un coleg recomandă Cireșarii. Autorul este Constantin Chiriță. El dă un singur motiv și nu intră în capitol. Alt coleg poate alege altceva.',
        'Titlul și autorul sunt de ajuns ca recomandare. Motivul arată de ce prietenia trece peste diferență. Restul rămâne de citit.',
        'Dacă povestești capitolul, colegul primește deznodământul și nu mai are de ce să deschidă cartea. Recomandarea se oprește înainte.',
        'Lista nu este obligatorie în întregime. Alegi un titlu. Celelalte rămân rezerve, ca fiecare să poată porni din alt loc.',
        'Din recomandare faci trei mișcări. Redai titlul și autorul. Spui ce observi la alegere. Apoi spui ce ai citi tu, cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: un elev alege Cireșarii, iar autorul este Constantin Chiriță. El spune un motiv, fără capitol. Colegul poate lua alt titlu.',
        'Ce observi: Îl văd cu volumul lângă un coleg. Aș citi Cireșarii, pentru că motivul lui ține de prietenia care trece peste diferență.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'O elevă alege Vrăjitorul din Oz și îl numește pe Lyman Frank Baum. Motivul este drumul făcut împreună de ființe diferite. Nu povestește capitolul. Celălalt poate lua Iliada. Poate lua și Epopeea lui Ghilgameș.'
      }],
      tryThis: [
        'Un elev alege Vrăjitorul din Oz. Autorul este Lyman Frank Baum. Motivul este că prietenia trece peste diferență. El nu intră în capitol.',
        'Celălalt poate lua Iliada. Poate lua și Epopeea lui Ghilgameș. Pentru recomandare ajung titlul împreună cu autorul.',
        'Scrie trei enunțuri: ce stă scris, ce observi și ce ai face tu. Observația începe cu Văd. Mai amintește, dacă vrei, pe frații Grimm, pe Alexandre Dumas sau pe Mark Twain, fiecare cu titlul lui.'
      ].join('\n\n'),
      keyPoints: [
        'Recomandarea cere titlul, autorul și un motiv. Capitolul nu se povestește. Colegul poate lua alt titlu.',
        'Pe listă stau Epopeea lui Ghilgameș, Iliada, Muzicanții din Bremen și Vrăjitorul din Oz.',
        'Mai stau Cei trei muschetari, Tom Sawyer, Huckleberry Finn și Cireșarii, scrise de Constantin Chiriță. Firul comun este prietenia peste diferență.'
      ]
    }),
    lesson({
      id: 'scrisoare-veche',
      title: 'Scrisoarea veche și locuitorii',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Anul se vede și în cuvinte',
        text: 'O scrisoare veche își arată anul și prin chipul cuvintelor, nu numai prin dată. Sensul se ia din context, nu din primul înțeles de azi.'
      }],
      theory: [
        'Ieși era felul de atunci de a scrie orașul Iași. Când vezi grafia, nu o îndrepți în minte ca pe o greșeală de caiet. Ea datează foaia.',
        'Bădie este un apel de respect către cineva mai în vârstă. Într-o scrisoare nouă, destinatarul tot primește un apel de respect, chiar dacă nu mai spui bădie.',
        'Lângă despărțire, scârba poate însemna mâhnire, nu silă. Contextul alege. Dacă o citești ca dezgust, pierzi durerea plecării.',
        'Luna se scrie decembrie, cu literă mică. Data lucrării este decembrie 1877. Mesajul a mers pe hârtie, nu pe un ecran.',
        'Sărbătoarea rămâne 1 Decembrie, cu majusculă, fiindcă este nume de zi festivă. Nu o amesteci cu luna decembrie.',
        'O scrisoare nouă sau un e-mail către un prieten plecat cere cel puțin 60 de cuvinte. Sub limită, mesajul rămâne o notiță, nu o scrisoare.',
        'Numele locuitorilor sunt substantive comune, deci stau cu literă mică. Nu le tratezi ca pe nume de țări sau de persoane.',
        'Nehotărâtul stă în față, cum vezi la niște moldoveni. Hotărâtul se lipește, cum vezi la moldovenii. Ambele forme păstrează litera mică.',
        'Nu judeci o regiune după o singură vorbă auzită. O frază despre toți locuitorii, fără text și fără fapte, este o etichetă.',
        'Pe foaia din decembrie 1877 apar Ieși și bădie. Lângă despărțire, scârba se citește ca mâhnire. Silă ar fi sensul nepotrivit aici.',
        'Tot cu literă mică stau munteni și muntenii. Separat notezi olteni, apoi bănățeni. Urmează maramureșeni, dobrogeni și transilvăneni.',
        'Din foaia veche faci trei mișcări. Redai data și cuvintele. Spui ce observi. Alegi o faptă a ta la despărțire, cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: în decembrie 1877, foaia îl strigă bădie pe omul mai în vârstă. La despărțire, scârba se citește drept mâhnire.',
        'Ce observi: În față am o foaie veche și un om vârstnic. Aș vorbi liniștit la plecare, pentru că sensul din context este mâhnire, nu silă.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Au venit în vizită niște moldoveni, iar moldovenii povestesc. Ambele stau cu literă mică, ca oltenii sau ca bănățenii. Mesajul către prietenul plecat cere cel puțin 60 de cuvinte și un apel de respect. 1 Decembrie rămâne sărbătoare.'
      }],
      tryThis: [
        'Scrie două enunțuri despre data decembrie 1877, despre apelul bădie și despre scârbă citită ca mâhnire când oamenii se despart. Amintește că Ieși era grafia pentru Iași.',
        'Mai folosește niște moldoveni și moldovenii, plus încă un nume de locuitori, toate cu literă mică. Spune că nu judeci o regiune după o singură vorbă auzită.',
        'Închizi cu o faptă a ta, prin Eu aș și prin pentru că. Amintește pragul de cel puțin 60 de cuvinte și că 1 Decembrie rămâne sărbătoare.'
      ].join('\n\n'),
      keyPoints: [
        'În decembrie 1877, Ieși înseamnă Iași, iar bădie este respect pentru cineva mai în vârstă. La despărțire, scârba poate fi mâhnire.',
        'Mesajul către prietenul plecat cere cel puțin 60 de cuvinte și un apel de respect. 1 Decembrie rămâne sărbătoare.',
        'Numele locuitorilor sunt substantive comune și stau cu literă mică, de la niște moldoveni la moldovenii și la celelalte regiuni.'
      ]
    }),
    lesson({
      id: 'telefon-scrisoare',
      title: 'Mesajul de pe telefon și scrisoarea',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Două canale',
        text: 'La evaluare notezi două câștiguri și două pierderi. Nu ajunge să declari că un canal îi este superior celuilalt.'
      }],
      theory: [
        'Mesajul de pe telefon ajunge iute și poate sta în puține cuvinte. Iuțeala este primul câștig. Scurtimea este al doilea, când ai puțin de spus.',
        'Același mesaj se poate rătăci printre notificări. Alteori pornește înainte de recitire. Un deget îl poate expedia prea devreme.',
        'Scrisoarea merge mai încet și sosește mai târziu. În schimb, rămâne o foaie pe care o poți reciti, iar timpul îți dă voie să tai o propoziție.',
        'Încetineala este pierdere când vestea e urgentă. Foaia păstrată este câștig când vrei urme. Nu le pui pe ambele în aceeași coloană.',
        'La evaluare nu alegi un câștigător. Notezi două câștiguri și două pierderi, ca ambele canale să fie văzute întregi.',
        'Dacă scrii doar că telefonul este mai bun, ai dat o părere, nu o comparație. Proba cere și ce se pierde, și ce se câștigă.',
        'Un câștig al telefonului: sosește în ziua în care l-ai scris. O pierdere: poate pleca nerecitit. Le numeri separat.',
        'Un câștig al scrisorii: poți tăia o propoziție înainte de trimitere. O pierdere: sosește cu întârziere. Patru enunțuri țin comparația dreaptă.',
        'Din scenă faci trei mișcări. Redai ce face fiecare canal. Spui ce observi, cu telefonul și cu foaia în față. Alegi o faptă a ta.',
        'Fapta se leagă prin pentru că. De pildă, ai reciti mesajul înainte să pornească, fiindcă un deget îl poate expedia prea devreme.',
        'Notificările nu sunt decor. Ele explică de ce un mesaj scurt se poate rătăci, chiar dacă a sosit în aceeași zi.',
        'Scrisoarea nu este mai nobilă de la sine. Este mai înceată și mai ușor de revizuit. Telefonul nu este superficial de la sine. Este rapid și riscant la trimitere.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: mesajul de pe telefon sosește în ziua scrierii, însă uneori pornește nerecitit. Scrisoarea sosește cu întârziere, rămâne o foaie și îți lasă răgaz să tai o propoziție.',
        'Ce observi: Văd telefonul cu mesajul și, lângă el, scrisoarea pe foaie. Aș reciti mesajul înainte să pornească, fiindcă un deget îl poate expedia prea devreme.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Câștig la telefon: ajunge iute. Câștig la scrisoare: poți tăia o propoziție. Pierdere la telefon: se rătăcește printre notificări. Pierdere la scrisoare: sosește târziu. Patru enunțuri, fără un câștigător declarat.'
      }],
      tryThis: [
        'Scrie patru enunțuri, două câștiguri și două pierderi, așezând mesajul de pe telefon lângă scrisoare.',
        'Un câștig al telefonului este că sosește în ziua scrierii. O pierdere este că poate porni nerecitit sau se poate rătăci printre notificări.',
        'Pentru scrisoare, arată că rămâne o foaie și că poți tăia o propoziție, dar că sosește cu întârziere. Închizi cu Eu aș, iar motivul, prin pentru că, privește o faptă din textul tău.'
      ].join('\n\n'),
      keyPoints: [
        'Mesajul de pe telefon ajunge iute și poate fi scurt, însă se poate rătăci printre notificări sau poate porni nerecitit.',
        'Scrisoarea merge mai încet, sosește mai târziu, rămâne o foaie și îți dă răgaz să tai o propoziție.',
        'La evaluare notezi două câștiguri și două pierderi. Nu declari doar că un canal este mai bun.'
      ]
    })
  ]
};
