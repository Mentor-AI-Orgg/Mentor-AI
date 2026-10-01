'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  id: 'calatoria',
  title: 'Călătoria',
  inOwnWords: 'Unitatea pune la lucru argumentarea, textul epic, vocabularul în frază, figurile și părțile de vorbire, pentru că ele se aplică pe foaia de examen. Pasivul, reflexivul, impersonalul și concesia se știu scurt, fără set de itemi.',
  toc: [
    'Două texte, un element comun',
    'Opinia și argumentarea',
    'Vocabular în context',
    'Figuri, rimă, măsură',
    'Părțile de vorbire',
    'Textul nonliterar',
    'Activ și pasiv, pe scurt',
    'Reflexivul, pe scurt',
    'Impersonal și concesie, mențiune',
    'Texte de rezervă pentru asociere',
    'Recapitularea călătoriei'
  ],
  glossary: [
    {
      term: 'element comun',
      meaning: 'Ce ține cele două texte laolaltă, spus în cel puțin 30 de cuvinte.'
    },
    {
      term: 'asociere',
      meaning: 'O valoare comună cu un text literar studiat, cu titlu și autor.'
    },
    {
      term: 'plan secundar',
      meaning: 'Ce se predă la școală, dar lucrările citite nu l-au cerut ca item: se reține regula, fără set de exerciții.'
    }
  ],
  lessons: [
    lesson({
      id: 'lectura-en',
      title: 'Două texte și elementul comun',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'A7',
          text: 'Elementul comun are cel puțin 30 de cuvinte și spune ce este la fel în conținut. Nu se compară frumusețea.'
        }
      ],
      theory: [
        'Înțelegerea, itemii A2–A5, stă în toate lucrările: localizezi și spui adevărat sau fals numai din text. Două semne pe un rând anulează rândul.',
        'A8 este opinia, 50–100 de cuvinte: părere, motiv, fapt din text. Nu se cer conectori. A9 este asocierea: valoarea, titlul, autorul și o frază scurtă. Textul ales este literar și studiat.',
        'Momentele subiectului nu se recită. Nu se punctează teoria, se punctează aplicarea. Naratorul nu este autorul.',
        'Scena întâi. Marți seara, Mara urcă 1.480 de trepte spre o cetate, prin pădure de fag. Drumul durează cam 30 de minute. Sus se vede un baraj. Ea spune că drumul este lung, dar merită.',
        'Scena a doua. Luni dimineața, pe stația numită Ahra, călătorul predă cartela. Recepționerul o prinde cu îndemânare. Oasele îl dor după noaptea de pe un pat mai dur decât piatra. Fusese sfătuit să evite locul și tocmai de aceea a rămas.',
        'Elementul comun: amândoi merg pe un drum greu, știut dinainte ca greu, și rămân. La școală, a doua scenă poate veni din Horia Aramă. Autorul este Horia Aramă, nu Horia Furtună.',
        'Relatarea despre Ahra este la persoana I. Scena Marei este la persoana a III-a.'
      ].join('\n\n'),
      example: [
        'Ce scrie: Mara urcă treptele și spune că drumul merită. Călătorul rămâne pe Ahra, deși fusese sfătuit să plece.',
        'Element comun, peste 30 de cuvinte: în ambele texte cineva pornește știind că drumul este greu. Mara are multe trepte. Călătorul are un pat dur și un sfat de a pleca. Niciunul nu se întoarce la primul pas. Comună este hotărârea de a rămâne.',
        'A5: naratorul Marei este personaj, fals. Recepționerul prinde cartela cu îndemânare, adevărat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Opinie de A8, schelet: cred că un drum greu merită când știi de ce urci. Motivul: Mara spune că urcarea merită. Faptul: are 1.480 de trepte și tot continuă. Fără conectori de compunere.'
        }
      ],
      tryThis: 'Scrie elementul comun în cel puțin 30 de cuvinte, numai cu faptele din cele două scene. Răspunde adevărat sau fals: naratorul Marei este personaj; relatarea despre Ahra este la persoana I; autorul este Horia Furtună; recepționerul prinde cartela agil. Scrie o opinie de 50–100 de cuvinte despre un drum greu, cu un fapt din scena Marei.',
      keyPoints: [
        'Adevărat și fals se iau din text, câte un semn pe rând.',
        'Elementul comun spune ce este la fel, în cel puțin 30 de cuvinte.',
        'Horia Furtună nu a scris pagina despre Ahra. Autorul este Horia Aramă.'
      ]
    }),
    lesson({
      id: 'argumentare',
      title: 'Opinia scurtă și compunerea argumentativă',
      kind: 'redactare',
      boxes: [
        {
          type: 'atentie',
          title: 'Două locuri',
          text: 'La A8 ajung părerea, motivul și faptul. La compunerea argumentativă se adaugă al doilea argument, concluzia și conectorii.'
        }
      ],
      theory: [
        'Patru piese se recunosc într-o știre, iar examenul le împarte. Teza pune subiectul pe masă. Ipoteza este părerea. Justificarea explică. Proba dă faptul măsurabil.',
        'Teza din știre: oamenii de știință au descoperit șase planete noi. Ipoteza: planetele ar putea spune ceva despre geologia Pământului. Justificarea: se poate afla compoziția și se poate compara cu Terra.',
        'Proba: planetele numite DMPP-1c, DMPP-1d și DMPP-1e au mase de trei până la de zece ori mai mari decât Pământul. Temperaturile de la suprafață stau între 1100 și 1800 de grade Celsius.',
        'Știrea audio le leagă de telescopul Harps, de la Observatorul European Austral din Chile, și de Carole Haswell, de la Open University. Titlul de pe site spune NASA. Corpul știrii numește observatorul din Chile și pe Haswell.',
        'Masă, mărimea, face mase. Masă, mâncarea sau mobila, face mese. Nu le amesteca în aceeași frază fără să știi care sens lucrează.',
        'Oralul de trei minute este util doar cât te învață să ții un argument. Proba care se punctează este scrisă.',
        'La Observatorul Astronomic Amiral Vasile Urseanu, din București, luneta arată cerul real, dar Pata Roșie de pe Jupiter nu se vedea pentru cel care a scris relatarea. Modelul virtual i s-a părut mai clar. Deosebirea este fapt de text, nu o lecție de astronomie.'
      ].join('\n\n'),
      example: [
        'A8, fără concluzie obligatorie. Cred că modelul virtual ajută la școală. Motivul este că apropie ce ochiul nu prinde din sală. Faptul: Pata Roșie nu era vizibilă prin lunetă, iar imaginile virtuale păreau de atins.',
        'Compunerea argumentativă adaugă un al doilea argument și o concluzie cu așadar. În timpul deselor mese, vorbeau despre mase mari: prima este mâncarea, a doua este mărimea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Teză: șase planete noi. Probă: mase de trei până la zece ori mai mari. Dacă inventezi o a șaptea planetă sau o temperatură nouă, proba nu mai este din text.'
        }
      ],
      tryThis: 'Asociază teza, ipoteza, justificarea și proba cu cele patru enunțuri despre planete. Completează mese și mase într-o frază despre cină și despre corpuri cerești. Scrie un A8 de 50–100 de cuvinte despre realitatea virtuală la școală, cu faptul despre Pata Roșie. Nu inventa o cifră.',
      keyPoints: [
        'Opinia de 6 puncte cere părere, motiv și fapt, nu conectori.',
        'Compunerea argumentativă cere ipoteză, două argumente, concluzie și conectori.',
        'Mase ține de mărime. Mese ține de mâncare sau de mobilă.'
      ]
    }),
    lesson({
      id: 'vocabular-drum',
      title: 'Sensul din frază',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Patru relații',
          text: 'Sinonimul seamănă la sens și diferă la formă. Antonimul întoarce sensul. Omonimul păstrează forma. Paronimul doar seamănă.'
        }
      ],
      theory: [
        'Sensul se ia din frază, nu din prima intrare care îți vine în minte. Sinonimul trebuie să încapă acolo unde stă cuvântul.',
        'Oraș și citadelă pot fi sinonime dacă citadelă încape. Nocturn și diurn sunt antonime. Somn, peștele, și somn, odihna, sunt omonime.',
        'Familial ține de familie. Familiar înseamnă cunoscut. Sunt paronime: se confundă ușor și nu se înlocuiesc.',
        'Polisemia dă mai multe sensuri legate. Stea pe cer și stea de teatru. Înalt despre statură și înalt despre un standard. Sensul figurat mută cuvântul: înalt poate însemna nobil. Cuib, în oboseală, poate însemna adăpost, nu cuibul păsării.',
        'Câmpul lexical adună un domeniu. Din copac fac parte trunchi, frunze, crengi și ramuri.',
        'Pe scena despre Ahra, metoda se învață pe perechi. Ursuz are ca sinonim morocănos. Nociv are dăunător. Armonie are ca antonim dezordine. Prietenesc are dușmănos. Furia din text este mânia. Omonimul este Furia, ființa din mit.',
        'Dacă la teză cuvintele sunt altele, metoda rămâne: citești fraza, apoi alegi relația.'
      ].join('\n\n'),
      example: [
        'Pe cer este o stea. Ea este o stea a teatrului. Pescarii au prins un somn. Mie îmi este somn.',
        'Un gest familial ține de casă. Un gest familiar este unul știut. În Nicio față nu era ursuză, morocănoasă încape, colorată nu încape.',
        'Rece, despre apă, nu se înlocuiește cu un cuvânt care înseamnă nerecunoscător.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'S-a cuibărit în oboseală. Aici cuib nu este al păsării. Este adăpost. Sensul figurat se vede din cuvântul de lângă el, oboseală.'
        }
      ],
      practice: [
        '1) Scrie două enunțuri cu stea, fiecare cu alt sens.',
        '2) Deosebește familial de familiar într-o pereche de enunțuri.',
        '3) Alege sinonimul pentru ursuz care încape în Nicio față nu era ursuză.',
        '4) Notează patru cuvinte din câmpul lui copac.'
      ].join('\n\n'),
      answers: [
        'Pe cer este o stea. Ea este o stea a teatrului.',
        'Gest familial: ține de familie. Gest familiar: este cunoscut.',
        'morocănoasă',
        'trunchi, frunze, crengi, ramuri'
      ],
      mistakes: 'Un sinonim care nu încape în frază nu este răspuns. Paronimul nu se tratează ca sinonim doar pentru că seamănă la auz.',
      tryThis: 'Scrie omonimul lui furie într-un enunț în care nu înseamnă mânie. Arată de ce cuib poate fi adăpost. Notează antonime pentru armonie și prietenesc.',
      keyPoints: [
        'Sensul se judecă în frază, iar sinonimul trebuie să încapă acolo.',
        'Somn este și pește, și odihnă. Familial nu este familiar.',
        'Ursuz înseamnă morocănos. Furia, ființa din mit, nu este mânia.'
      ]
    }),
    lesson({
      id: 'figuri-subiect',
      title: 'Figuri, rimă și măsură',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'A6',
          text: 'Figura se transcrie și se numește. Măsura se numără pe rândul deschis. Nu se dă un număr din memorie.'
        }
      ],
      theory: [
        'Din clasele dinainte: personificarea dă o faptă de om, comparația apropie cu ca, epitetul alege însușirea, enumerația înșiră, repetiția reia, metafora este comparația fără ca.',
        'De clasa a VIII-a, pe rânduri originale: hiperbola mărește peste firesc, aliterația repetă un sunet, antiteza pune două laturi opuse.',
        'Munții ajungeau până la lună este hiperbolă. Vântul vuiește în văi este aliterație. Ziua e liniște, noaptea e vacarm este antiteză.',
        'Rima se spune după schemă, pe textul deschis: împerecheată, încrucișată sau îmbrățișată. Ritmul se simte. Nu se cere o formulă.',
        'Tiparul narativ se recunoaște din succesiune, personaje, timp și spațiu. Tiparul dialogat se recunoaște din replici. Recitarea momentelor subiectului nu se punctează.',
        'Ele pot sta în ciornă: expozițiune, intrigă, desfășurare, punct culminant, deznodământ. Harta care se punctează este cine, când, unde, ce.',
        'Pe un drum de seară, felinarul cheamă călătorul. Globul este ca o monedă, apoi, fără ca, globul este moneda nopții. Strada curbă alege o însușire: epitet.',
        'Dacă înșiri munte, codru, lac, ai enumerație. Dacă repeți încet, încet, ai repetiție. Nu schimba numele figurii doar pentru că ambele au mai multe cuvinte.',
        'La examen transcrii secvența exactă și scrii numele lângă ea. O definiție fără exemplu nu ține locul figurii cerute.'
      ].join('\n\n'),
      example: [
        'Felinarul cheamă este personificare. Globul ca o monedă este comparație. Stradă curbă este epitet. Globul, moneda nopții, este metaforă.',
        'Munte, codru, lac este enumerație. Încet, încet este repetiție. Cine: un călător. Când: seara. Unde: pe o stradă curbă. Ce: luminile se schimbă.',
        'Dacă numeri silabele pe un rând scris de tine, ai măsura. Nu o lua din titlul unei poezii pe care nu o ai în față. Schema de rimă se arată pe cuvintele finale, nu pe o strofă memorată.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Rime inventate: gol și mol, apoi lac și tac. Schema aabb este împerecheată. Dacă al treilea rând schimbă sunetul prea devreme, schema nu mai este împerecheată.'
        }
      ],
      tryThis: 'Construiește câte un exemplu propriu de personificare, comparație, epitet, metaforă, hiperbolă, aliterație și antiteză. Completează cine, când, unde, ce pe o întâmplare de o seară. Spune că momentele subiectului nu se scriu ca titluri în compunere.',
      keyPoints: [
        'Figura se copiază și se numește, nu se definește în locul exemplului.',
        'Hiperbola mărește peste firesc, aliterația repetă un sunet, antiteza opune.',
        'Harta narativă este cine, când, unde, ce.'
      ]
    }),
    lesson({
      id: 'parti-de-vorbire',
      title: 'Caz, mod și un enunț cu constrângeri',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'B6',
          text: 'Punctul vine doar când tipul enunțului, cazul, funcția și semnul final sunt toate corecte.'
        }
      ],
      theory: [
        'Morfologia de la B5 cere cazul, modul, timpul sau valoarea unui cuvânt, nu lista tocită. Flexibile sunt substantivul, pronumele, numeralul, adjectivul și verbul.',
        'Neflexibile sunt adverbul, prepoziția, conjuncția și interjecția. În gramatica din 2008, articolul nu mai este parte de vorbire.',
        'Genitivul spune al cui: cartea Mariei. Dativul spune cui: I-am scris Mariei. Acuzativul cu prepoziție: prin pădure. Nominativul este cazul subiectului.',
        'Am ieșit este indicativ, perfect compus, persoana I, singular. Mi-aș dori este condițional prezent. Să plec este conjunctiv prezent. Voi participa este indicativ viitor.',
        'Să fi fost este conjunctiv perfect. I-aș fi trimis este condițional perfect. Explicam este indicativ imperfect. A cânta este infinitiv, vorbind este gerunziu, de învățat este supin.',
        'Hai cu noi la concert conține interjecția predicativă hai. Cel pe care l-ai văzut este David, pentru că l- cere pe. Nicio colegă se scrie într-un cuvânt.',
        'Al cărui copil este caietul: al se acordă cu caietul, cărui cu copilul. Fata aceea, nu aceia. O poate fi pronume, articol sau interjecție, după loc.',
        'Model de atribut în genitiv, enunț asertiv: Am găsit cartea Mariei. Model de complement direct, enunț negativ: Nu am văzut filmul.'
      ].join('\n\n'),
      example: [
        'Ana i-a dat bunicii un buchet. Ana este nominativ, subiect. Bunicii este dativ, complement indirect. Buchet este acuzativ, complement direct.',
        'Cartea Mariei: Mariei este genitiv, atribut. Am ieșit pe terasă: perfect compus, persoana I. Cui i-ai scris? are complement indirect în dativ și semn de întrebare. Fără semn, condiția cade.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A ajuns campion: copulativ, campion este nume predicativ. A ajuns la gară: predicativ, la gară spune locul. Aceeași formă de verb își schimbă valoarea după ce urmează.'
        }
      ],
      practice: [
        '1) Analizează am ieșit: mod, timp, persoană, număr.',
        '2) Construiește un enunț interogativ cu complement indirect în dativ.',
        '3) Spune de ce se scrie Cel pe care l-ai văzut, nu Cel care l-ai văzut.',
        '4) Alege: fata aceea sau fata aceia.'
      ].join('\n\n'),
      answers: [
        'indicativ, perfect compus, persoana I, singular',
        'Cui i-ai scris?',
        'pentru că l- cere pe',
        'fata aceea'
      ],
      mistakes: 'Nicio se scrie legat înaintea substantivului. Enunțul interogativ fără semn de întrebare nu respectă toate condițiile.',
      tryThis: 'Construiește un enunț asertiv cu genitiv, atribut, și unul negativ cu acuzativ, complement direct. Arată că hai este interjecție predicativă. Spune că articolul, din 2008, nu mai este parte de vorbire.',
      keyPoints: [
        'Genitivul spune al cui, iar dativul spune cui.',
        'Am ieșit este perfect compus, persoana I.',
        'Enunțul de la B6 ia punctul doar când toate condițiile sunt vizibile.'
      ]
    }),
    lesson({
      id: 'cetatea',
      title: 'Articolul despre cetate',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Nonliterar',
          text: 'Textul care informează dă fapte. Nu are momente de subiect. Are distanțe, ani, nume și scopuri.'
        }
      ],
      theory: [
        'Al doilea text de la examen informează. Articolul este semnat de Cristian Voda și se numește Poenari, cetatea lui Negru Vodă.',
        'Faptele, spuse aici pe scurt: la 178 de kilometri de București, la peste 850 de metri, stă Cetatea Poenari. A fost construită în secolul al XIV-lea, pentru apărare și observație.',
        'Se crede că a fost loc de refugiu al lui Vlad Țepeș. Vizitatorul urcă 1.480 de trepte, cam 30 de minute. Sus se văd Barajul Vidraru, Cheile Argeșului și Transfăgărășanul.',
        'Au fost construite de autoritățile locale pentru a simplifica accesul. Au fost construite este pasiv. Pentru a simplifica accesul este finală, circumstanțială de scop.',
        'Se crede este impersonal: o mențiune, nu un item de aprofundat. Acestea este pronume demonstrativ. De este prepoziție. Autoritățile este substantiv. Locale este adjectiv. A simplifica este infinitiv.',
        'Substantive în acuzativ cu prepoziție: de București, la altitudine, de apărare. Domnitorul din titlu este Negru Vodă. Vlad Țepeș este refugiul crezut, nu titlul.',
        'Dacă amesteci cele două nume, itemul de înțelegere cade. Titlul îl leagă pe Negru Vodă de cetate. Vlad Țepeș apare doar ca loc de refugiu, cu verbul se crede.',
        'Narativul despre vizită nu copiază articolul. Pui o succesiune: plecarea, urcarea, priveliștea. Doi indici de timp și doi de loc ajung ca să se vadă tiparul.',
        'Compunerea narativă despre o vizită, când foaia cere 150–300 de cuvinte, are succesiune și două elemente de timp și de spațiu. Dacă se cer și descriere, și dialog, descrierea are cel puțin 30 de cuvinte, iar dialogul cel puțin patru replici.'
      ].join('\n\n'),
      example: [
        'Distanța este 178 de kilometri. Altitudinea este peste 850 de metri. Treptele sunt 1.480. Durata este cam 30 de minute.',
        'Ce scrie: cetatea stă sus, iar urcarea are 1.480 de trepte. Ce vezi: o văd pe Mara pe trepte, cu pădurea de fag în jur. Eu aș porni dimineața, pentru că drumul durează cam 30 de minute.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Finala se transcrie întreagă: pentru a simplifica accesul. Felul: circumstanțială de scop. Dacă scrii doar simplifica, rămâi fără elementul pentru a.'
        }
      ],
      tryThis: 'Scrie distanța, altitudinea, numărul de trepte și durata. Numește cei doi domnitori și rolul fiecăruia. Transcrie finala și spune felul. Arată că au fost construite este pasiv. Analizează acestea, de, autoritățile și locale.',
      keyPoints: [
        'Poenari este la 178 de kilometri de București, la peste 850 de metri, cu 1.480 de trepte.',
        'Articolul este al lui Cristian Voda și îl numește pe Negru Vodă.',
        'Pentru a simplifica accesul este finală, iar au fost construite este pasiv.'
      ]
    }),
    lesson({
      id: 'activ-pasiv',
      title: 'Copulativul și pasivul, fără set de itemi',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Întrebarea',
          text: 'A fi plus participiu: dacă urmează o însușire, este copulativ. Dacă urmează cine face fapta, este pasiv.'
        }
      ],
      theory: [
        'Deosebirea care cade la enunțuri este predicativ sau copulativ. Pasivizarea se știe ca regulă, pentru că lucrările citite nu au cerut construcția activă sau pasivă ca item. Nu se face un set lung.',
        'Este prea copt, despre cozonac, este predicat nominal: copt este nume predicativ. Este copt de brutar este predicat verbal pasiv: brutarul face acțiunea, de brutar este agent.',
        'Pasivul este a fi plus participiul acordat cu subiectul. Subiectul suportă acțiunea. Agentul stă cu de sau de către și poate lipsi.',
        'Verbul fără complement direct nu se pasivizează: a merge, a veni, a pleca, a sta, a exista. I-ar fi ajutat pe prieteni este condițional perfect activ. El ar fi ajutat de prieteni este pasiv.',
        'În Cărțile au fost citite ieri de Maria, subiectul este cărțile, nu Maria. Maria este agentul.',
        'El a ajuns campion este copulativ. El a ajuns acasă este predicativ. Aceeași formă se desparte prin ce urmează.',
        'La examen nu ți se cere să pasivizezi zece verbe. Ți se cere să nu confunzi însușirea cu agentul. Întrebarea cine face fapta desparte cele două construcții.',
        'Dacă agentul lipsește, te uiți la sens. Este prea copt spune o însușire a cozonacului. Nu există un brutar în propoziție, deci nu este pasiv.'
      ].join('\n\n'),
      example: [
        'Andrei scrie compunerea este activ. Compunerea este scrisă de Andrei este pasiv. Subiectul pasiv este compunerea. Agentul este de Andrei.',
        'Cozonacul este prea copt nu are agent. Cozonacul este copt de brutar are agent. A sta pe scaun nu trece la pasiv.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ușa este deschisă. Dacă urmează o însușire, deschisă este nume predicativ. Ușa este deschisă de portar. Aici de portar arată agentul, deci pasiv.'
        }
      ],
      practice: [
        '1) Deosebește este prea copt de este copt de brutar.',
        '2) Transformă Andrei scrie compunerea în pasiv și spune subiectul și agentul.',
        '3) Spune de ce a merge nu se pasivizează.'
      ].join('\n\n'),
      answers: [
        'primul este nominal, al doilea este pasiv',
        'Compunerea este scrisă de Andrei; subiectul este compunerea, agentul este de Andrei',
        'nu are complement direct'
      ],
      mistakes: 'În Cărțile au fost citite de Maria, subiectul nu este Maria. Agentul nu se confundă cu subiectul pasiv.',
      tryThis: 'Deosebește a ajuns campion de a ajuns acasă, fiecare într-o propoziție. Nu face o listă lungă de transformări.',
      keyPoints: [
        'Este prea copt este nominal. Este copt de brutar este pasiv.',
        'A ajuns campion este copulativ. A ajuns acasă este predicativ.',
        'Subiectul pasiv suportă acțiunea. Agentul stă cu de.'
      ]
    }),
    lesson({
      id: 'reflexiv',
      title: 'Reflexivul, două feluri',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Cu funcție și fără',
          text: 'Cu funcție, pronumele este complement și se poate dubla cu sine. Fără funcție, stă în predicat și nu se dublă.'
        }
      ],
      theory: [
        'Pronumele reflexiv nu a fost item des, dar morfologia poate atinge un pronume. Două feluri ajung.',
        'El se descrie pe sine: se se poate înlocui, deci are funcție de complement direct. El se miră: se stă în predicat. Nu se spune El se miră pe sine.',
        'A se duce înseamnă a merge. A duce înseamnă a căra. Nu merită, nu Nu se merită. El riscă, nu El se riscă. Termină, nu Termină-te.',
        'Nu este rentabil, nu Nu se rentează. Nu vreau să risc, nu Nu vreau să mă risc.',
        'Formele neaccentuate de acuzativ: mă, te, se, ne, vă, se. De dativ: îmi, îți, își, ne, vă, își.',
        'Și-a atribuit: și- este dativ, complement indirect. Se răstește: fără funcție, în a se răsti. M-am văzut: m- este complement direct. Mi-am dat seama: mi- fără funcție.',
        'Eu o cunosc: o este pronume personal. Eu mă cunosc: mă este reflexiv, complement direct.',
        'Proba de dublare este simplă. Dacă poți adăuga pe sine sau pe mine fără să strici sensul, pronumele are funcție. Dacă fraza devine ciudată, pronumele stă în predicat.',
        'Formele curate se învață ca perechi, nu ca listă de excepții fără sens. Nu merită înlocuiește Nu se merită. El riscă înlocuiește El se riscă.'
      ].join('\n\n'),
      example: [
        'El se laudă cu premiul: se poate înlocui, deci are funcție de complement direct. El se mândrește: se mândrește este un singur predicat.',
        'Se privește în oglindă: se este complement direct. Nu te răsti: te nu are funcție. Nu merită să rămâi este forma curată.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'M-am văzut în geam: m- este complement direct, pentru că pot spune pe mine. Mi-am dat seama de greșeală: mi- nu se dublează cu mie în același fel, pentru că stă în locuțiune.'
        }
      ],
      practice: [
        '1) Spune dacă se din El se laudă are funcție și care.',
        '2) Corectează Nu se merită și Nu vreau să mă risc.',
        '3) Deosebește Eu mă cunosc de Eu o cunosc.'
      ].join('\n\n'),
      answers: [
        'da, complement direct',
        'Nu merită. Nu vreau să risc.',
        'mă este reflexiv, o este pronume personal'
      ],
      mistakes: 'A se duce nu este a duce. Reflexivul fără funcție nu se dublează cu sine.',
      tryThis: 'Analizează și-a atribuit, se răstește, m-am văzut și mi-am dat seama. Scrie formele neaccentuate de dativ, toate persoanele.',
      keyPoints: [
        'Reflexivul cu funcție este complement și se poate dubla cu sine.',
        'Reflexivul fără funcție stă în predicat.',
        'Nu merită este forma curată. M-am văzut are complement direct.'
      ]
    }),
    lesson({
      id: 'impersonal-concesie',
      title: 'Impersonalul și concesia, o mențiune',
      kind: 'limba',
      boxes: [
        {
          type: 'atentie',
          title: 'Nu sunt item',
          text: 'Impersonalul, incidenta, condiția și concesia se recunosc. Nu se transcriu ca subordonate de examen.'
        }
      ],
      theory: [
        'Lucrările citite nu au cerut construcția impersonală, incidenta, concesiva sau condiționala ca item. Subordonatele condițională și concesivă nici nu sunt în programa de examen.',
        'Impersonalul nu are făptuitor-persoană: plouă, ninge, îi place, se merge, este important. Noi mergem este personal.',
        'Incidenta este un comentariu izolat prin virgule, linii de pauză sau paranteze: se pare, dintr-o greșeală. La zise el, după o replică, verbul stă înaintea subiectului.',
        'Condiția, ca grup, spune de ce depinde fapta: Fără condiția aceasta, nu ar fi participat. În caz de furtună, rămânem în cabană. Altfel și astfel sunt mărci de condiție.',
        'Concesia, ca grup, spune o piedică ce nu oprește fapta: Fără sprijin, tot a reușit. În ciuda furtunii, am urcat. Tot, totuși și chiar sunt mărci.',
        'Fără a avea condiție fizică, tot a urcat treptele este concesie, din cauza lui tot. Acestea nu se transcriu ca subordonate de examen.',
        'Cauzala și finala, cu pentru că și pentru a, rămân la algoritmul frazei. Nu le amesteca cu grupul concesiv.',
        'Semnul de recunoaștere la concesie este piedica care nu oprește: tot, totuși, chiar, în ciuda. La condiție, fapta depinde de ceva: în caz de, altfel, astfel.',
        'Dacă la transcriere vezi pentru că, rămâi la cauzală. Dacă vezi pentru a sau ca să, rămâi la finală. Grupurile fără predicat al lor nu se copiază ca propoziții.'
      ].join('\n\n'),
      example: [
        'Plouă de o oră este impersonal. Rezultatul, se pare, este gata: se pare este incidentă.',
        'În caz de furtună, rămânem este condiție. În ciuda furtunii, am urcat este concesie. Pentru că îi era dor rămâne cauzală, de examen.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Îi place drumul lung. Îi place este impersonal: nu are un el care face fapta. Mara urcă este personal: făptuitorul este Mara.'
        }
      ],
      practice: [
        '1) Etichetează plouă, se pare și în ciuda furtunii, fiecare într-un cuvânt.',
        '2) Spune de ce Fără sprijin, tot a reușit nu este item de subordonată.',
        '3) Scrie o cauzală cu pentru că și o finală cu pentru a.'
      ].join('\n\n'),
      answers: [
        'impersonal; incidentă; concesie',
        'este concesie de grup, nu subordonată din programă',
        'A tăcut pentru că îi era dor. A plecat pentru a o revedea.'
      ],
      mistakes: 'Pentru că nu se etichetează concesie. Tot și în ciuda marchează concesia de grup, nu cauza.',
      tryThis: 'Nu construi un set de concesive. Ține minte doar etichetele, ca să nu le pui în locul cauzalei și al finalei.',
      keyPoints: [
        'Plouă și îi place sunt impersonale. Se pare este incidentă.',
        'Fără sprijin, tot a reușit este concesie de grup, nu subordonată de examen.',
        'Pentru că și pentru a rămân la fraza din programă.'
      ]
    }),
    lesson({
      id: 'banca-a9',
      title: 'Texte de rezervă pentru asociere',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'A9',
          text: 'Se punctează valoarea, titlul și autorul, apoi o frază despre cum apare valoarea. Nu se povestește cartea.'
        }
      ],
      theory: [
        'Îți trebuie câteva texte literare, fiecare cu o valoare și o frază gata. Din unitatea aceasta țin patru, spuse scurt, fără pagini lipite.',
        'Mihai Eminescu, poezia al cărei titlu spune că, băiat fiind, cutreiera pădurile. Valoarea este libertatea copilăriei în natură. Fraza: vocea își amintește pădurea și izvorul ca pe un adăpost.',
        'Alexandru Vlahuță, Din durerile lumii. Valoarea este șansa de a învăța. Fraza: un învățător îi deschide unui copil sărac drumul spre gimnaziu.',
        'Horia Aramă, 1930–2007, Planeta celor doi sori, 1986. Valoarea este curiozitatea, cu grija de a nu judeca o lume după o singură față. Pe scurt: ziua, orașul Ahra este calm. Noaptea, sub celălalt soare, oamenii se schimbă. El numește Riluri o fată care nu-și spune numele.',
        'Ion Hobana, 1931–2011, Tranzacția, 1988. Valoarea este respectul față de o altă civilizație, pus lângă pofta de câștig. John Archibald Steel vrea minereul de pe Vonda. Pil Von refuză navele și uraniul, pentru că planeta și vombul le ajung.',
        'Strămoșul pirat este al lui Steel, nu al pilotului Robert Harvey. După aceea, Steel este încredințat lui Harvey.',
        'Pentru intercultural, scurt: romanul chinezesc Călătorie spre Vest, din secolul al XVI-lea, scris de Wu Cheng-en, stă la baza a două filme, unul din 2001 și unul din 2008. Valoarea este cărarea care te învață curaj.',
        'Siegfried, Roland, Arthur și Cidul sunt nume de galerie, nu texte de dezvoltat aici. Proiectul de proces și expoziția nu sunt itemi.'
      ].join('\n\n'),
      example: [
        'Asociere de 50–100 de cuvinte, model. Valoarea comună este curajul de a rămâne pe un drum greu. În Planeta celor doi sori, de Horia Aramă, rătăcitorul rămâne pe Ahra, deși fusese sfătuit să o evite.',
        'Titlul și autorul sunt în frază. Nu se povestește noaptea întreagă. Steel vrea profit: adevărat, pe faptele de aici. Pil Von renunță la vomb: fals. Piratul este strămoșul lui Harvey: fals.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Valoarea șansa de a învăța, titlul Din durerile lumii, autorul Alexandru Vlahuță. O frază: scrisoarea învățătorului deschide școala. Atât. Fără biografia personajului.'
        }
      ],
      tryThis: 'Alege două texte din cele patru și scrie, pentru fiecare, valoarea, titlul, autorul și o frază. Apoi fă un A9 de 50–100 de cuvinte: valoarea curajul de a rămâne, legată de un drum din lecție și de unul dintre texte. Răspunde adevărat sau fals: Steel vrea profit. Pil Von renunță la vomb. Piratul este strămoșul lui Harvey.',
      keyPoints: [
        'La asociere se spun valoarea, titlul, autorul și o frază.',
        'Eminescu ține de libertatea copilăriei, Vlahuță de șansa de a învăța, Aramă de curiozitate, Hobana de respectul față de altă lume.',
        'Steel vrea minereul. Pil Von refuză schimbul. Piratul este strămoșul lui Steel.'
      ]
    }),
    lesson({
      id: 'recap-calatorie',
      title: 'Recapitularea călătoriei',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Pe scenă',
          text: 'Recapitularea se face pe faptele Marei, nu pe o foaie de puncte și nu pe o fișă de observare.'
        }
      ],
      theory: [
        'Scena de lucru rămâne a Marei, marți seara, pe treptele cetății. Drumul este lung, dar merită. Dar este adversativ. Este lung este predicat nominal. Urcă este predicat verbal.',
        'Masă, la orele de masă, este mâncarea. Omonimul este mobila. Nu le amesteca. Un epitet, deal mohorât, nu este comparație. Comparația are ca sau de parcă.',
        'Patru trăsături narative: personaje, succesiune, timp, spațiu. Cine: Mara. Când: marți seara. Unde: pe trepte, prin fag. Ce: urcă și vede un baraj.',
        'Era un felinar nu este pasiv. Era este copulativ, felinar este nume predicativ. Întrebându-se este reflexiv, mențiune, nu item de set.',
        'Elementul comun cu călătorul de pe Ahra este drumul greu pe care nu îl abandonează. Fraza Mara știe că drumul merită are completivă directă: că drumul merită.',
        'Subordonata se transcrie întreagă, cu elementul. Compunerea, dacă o scrii, are cel puțin 150 de cuvinte și ține grila tipului ales dintre cele cinci.',
        'Un ținut fără oameni și fără hanuri se poate spune în 30–50 de cuvinte: drumuri rele, nicio gazdă, seară lungă. Aceasta este o descriere de spațiu, nu o comparație.',
        'Comparația are nevoie de ca sau de parcă. Deal mohorât rămâne epitet, pentru că mohorât alege o însușire și nu apropie două lucruri.'
      ].join('\n\n'),
      example: [
        'Ce scrie: marți seara, Mara urcă prin fag și vede un baraj. Ce vezi: o văd pe trepte, cu cetatea deasupra. Eu aș număra treptele rămase, pentru că drumul este lung.',
        'Era un felinar este nominal. Completiva este că drumul merită. Elementul comun, peste 30 de cuvinte, este hotărârea de a rămâne pe un drum știut ca greu.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Meleagurile fără hanuri, în 30–50 de cuvinte, înseamnă un ținut fără oameni primitori și cu drumuri rele. Nu este o comparație. Este o descriere de spațiu.'
        }
      ],
      tryThis: 'Pe scena Marei, scrie ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu O văd. Transcrie completiva din Mara știe că drumul merită. Deosebește masă de masă. Spune că era un felinar este copulativ. Scrie elementul comun cu scena de pe Ahra, în cel puțin 30 de cuvinte.',
      keyPoints: [
        'Textul narativ are personaje, succesiune, timp și spațiu.',
        'Masă poate fi mâncare sau mobilă. Era un felinar este predicat nominal.',
        'Completiva se transcrie întreagă, iar foaia cu puncte nu ține loc de text.'
      ]
    })
  ]
};
