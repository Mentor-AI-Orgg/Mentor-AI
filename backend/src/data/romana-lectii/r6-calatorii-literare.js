'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f) {
  return romanaLesson(f);
}

module.exports = {
  id: 'calatorii-literare',
  title: 'Călătorii literare',
  inOwnWords: 'Unitatea 5 urmărește proza care povestește, clipa faptei față de clipa relatării, locul întâmplării față de locul povestitorului și personajul la persoana întâi. Mai intră recenzia, actul de limbaj și compunerea care unește narațiunea cu descrierea. Gramatica aduce adverbul, complementul și circumstanțialul de loc, pe cel de timp și pe cel de mod. La final stau româna între limbile Europei și jurnalul de cititor. Scenele sunt scrise în lecții. La clasă, textul de pornire poate purta alt titlu. Grilele de punctaj nu țin loc de lecție.',
  toc: [
    'Harta unității',
    'Timpul și spațiul narațiunii',
    'Recenzia și atitudinea față de lectură',
    'Actul de limbaj',
    'Tiparul narativ-descriptiv',
    'Adverbul',
    'Complementul',
    'Circumstanțialele',
    'Limba română în Europa',
    'Jurnalul de cititor',
    'Recapitularea unității'
  ],
  glossary: [
    {
      term: 'rememorare',
      meaning: 'Aducere aminte: povestirea începe din prezent și se întoarce la o întâmplare din trecut.'
    },
    {
      term: 'adverb',
      meaning: 'Parte de vorbire neflexibilă, care arată locul, timpul sau felul unei acțiuni.'
    },
    {
      term: 'recenzie',
      meaning: 'Prezentare scurtă a unei cărți, cu o idee și cu o părere.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-calatorii',
      title: 'Ce vei lucra despre călătorii',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Harta',
          text: 'Parcurgi citirea, recenzia, vorbirea, redactarea, gramatica, limba și jurnalul. Titlul de la clasă poate diferi. Pașii nu se schimbă.'
        }
      ],
      theory: [
        'Harta deschide unitatea Călătorii literare. Citești proză care povestește o întâmplare. Separi momentul faptei de momentul în care cineva o spune. Locul unde s-a petrecut fapta poate fi altul decât locul din care se vorbește.',
        'Recunoști personajul care spune eu. Înveți ce cuprinde o recenzie: titlu, autor, o idee și o părere despre lectură. Atitudinea poate fi curajul, apropierea dintre oameni sau amintirea lăsată de o carte subțire.',
        'La comunicare legi forma unei propoziții de intenția vorbitorului și de efectul asupra celuilalt. Aceeași vorbă poate anunța, îndemna, promite sau ruga, după context și după ton.',
        'La redactare scrii o întâmplare și oprești fapta ca să arăți un loc, o persoană sau un obiect. Introducerea, cuprinsul și încheierea rămân vizibile în compunere.',
        'Gramatica are trei opriri. Prima este adverbul, cu felurile lui și cu gradele. A doua este complementul direct, cel cu prepoziție și cel indirect. A treia este circumstanțialul: locul, timpul și modul.',
        'Apoi cauți locul românei între limbile Europei: familie, număr de vorbitori, un document vechi și o zi a limbii. La încheiere lucrezi, în grup, un jurnal de cititor.',
        'Ținta are treisprezece competențe. Înțelegerea aduce 1.1, 1.2, 1.3 și 1.4. Comunicarea aduce 2.3 și 2.4. Urmează 3.1, apoi 3.3 și 3.4.',
        'Redactarea aduce 4.2, 4.3 și 4.4. Competența 5.2 leagă cultura ta de altele. Codurile arată unde vrei să ajungi. Nu înlocuiesc lecția de azi. La clasă, titlul de pe bancă poate fi altul.'
      ].join('\n\n'),
      example: [
        'Pe hartă stau narațiunea, recenzia, vorbirea cu intenție, adverbul, complementul, circumstanțialul și jurnalul.',
        'Cele treisprezece coduri sunt ținta unității. Lecția de azi ia doar timpul și spațiul unei întâmplări. Restul hărții rămâne pentru zilele următoare.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă pe bancă textul poartă alt titlu, tot separi clipa faptei de clipa relatării. Codul 1.1 ține de înțelegerea textului citit, nu de o fișă gata scrisă.'
        }
      ],
      tryThis: 'Scrie două propoziții. În prima spui că tema este drumul prin lectură și că azi separi când s-a petrecut fapta de când se povestește. În a doua spui că sunt treisprezece competențe și le grupezi ca în lecție.',
      keyPoints: [
        'Harta anunță citirea, recenzia, intenția, gramatica și jurnalul.',
        'Clipa faptei și clipa relatării se țin separat, la fel și locurile.',
        'Codurile de competență sunt treisprezece și nu înlocuiesc lecția.'
      ]
    }),
    lesson({
      id: 'narativ-timp',
      title: 'Când se întâmplă și unde se povestește',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Două măsuri',
          text: 'Timpul întâmplării măsoară fapta. Timpul povestirii măsoară vorbirea. Cele două locuri pot fi diferite.'
        }
      ],
      theory: [
        'Proza care povestește poate înșira faptele de la prima la ultima sau le poate aduce din memorie. Rememorarea nu pornește de la fapta veche. Pornește de la omul care, acum, își aduce aminte.',
        'Cât a ținut fapta este timpul întâmplării: minute, o oră, ani. Cât ține vorbirea este timpul povestirii. Într-un minut de vorbă pot încăpea luni. Sala faptei poate să nu fie camera din care se vorbește.',
        'Naratorul la persoana întâi spune eu și este, totodată, personajul principal, atunci când își amintește propria întâmplare. Trăsătura nu se lipește ca o etichetă. Se vede din ce face omul.',
        'La clasă, textul de pornire poate purta titlul Fascinații. L-a scris George Șovu, trăit din 1931 până în 2016. A publicat romane și proză scurtă, a lucrat ca scenarist și ca inspector școlar și a întocmit cărți pentru școală.',
        'Scenariile seriei de filme Liceenii sunt ale lui. Acolo cineva își amintește o lectură. Fragmentul acela nu se transcrie. Scena pe care o lucrezi este a Marei.',
        'Câteva cuvinte din jurul cititului: amfitrion înseamnă gazdă. Tihna este liniște deplină. Patima, când e vorba de cărți, este o dorință foarte puternică. Strădania este efort stăruitor. Formidabil înseamnă ieșit din comun.',
        'Duminică, pe înserat, Mara stă în odaia ei și își aduce aminte vara. Atunci, între rafturi, a terminat un volum într-o oră. Vorba despre asta ține un minut. Vara a ținut două luni. Odaia de acum nu este sala de atunci.',
        'Lângă ea era Doru. I-a arătat un gest: pagina se întoarce mai iute. Mara a spus mulțumesc. În amintire este elevă, nu profesoară. Pe amândoi îi leagă lectura. Mulțumirea arată recunoștința. Metoda arătată arată dărnicia lui Doru.',
        'Seara stă în text înaintea verii, deci felul este rememorare. Trei pași ajung: ce este scris, ce vezi, ce ai face tu. Ce vezi pornește de la o văd. Fapta ta se leagă prin pentru că.'
      ].join('\n\n'),
      example: [
        'Scrisul spune că, seara, în odaie, Mara se întoarce la vara petrecută între rafturi, unde a terminat un volum într-o oră. Doru, de lângă ea, i-a arătat cum se întoarce pagina mai iute.',
        'Ce vezi: o văd pe Mara în odaie și, în amintire, lângă Doru, între rafturi. Eu aș fi cerut încă un volum, pentru că ora a ajuns și Doru era alături.',
        'Vara ține două luni, lectura o oră, povestirea un minut. Odaia este locul vorbirii. Sala cu rafturi este locul faptei.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Mara narează, fiindcă spune eu. Doru nu povestește. Trăsătura lui iese din gestul cu pagina, nu dintr-un adjectiv gol. Dacă ar apărea amfitrion, cuvântul ar numi gazda.'
        }
      ],
      tryThis: 'Pe scena Marei scrie trei propoziții: ce este scris, ce vezi și ce ai face, cu pentru că. Ce vezi pornește de la o văd. Spune durata verii, a lecturii și a povestirii, cele două locuri, de ce este aducere aminte, cine narează și ce trăsătură are Doru. Adaugă anii 1931 și 2016 și sensul lui amfitrion.',
      keyPoints: [
        'Rememorarea pleacă de la omul care își amintește acum.',
        'Fapta și vorbirea se măsoară cu două durate, iar locurile pot fi două.',
        'Persoana întâi îl face pe povestitor și personaj. Trăsătura stă în gest.'
      ]
    }),
    lesson({
      id: 'recenzia',
      title: 'O carte și părerea despre ea',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Patru date',
          text: 'Recenzia are titlu, autor, o idee și o atitudine față de lectură. Frazele altcuiva nu se copiază.'
        }
      ],
      theory: [
        'O recenzie înfățișează pe scurt o operă. Are și comentarii, și o apreciere. Poți spune că cititul ți-a dat curaj, că te-a apropiat de oameni sau că un volum subțire ți-a rămas în minte.',
        'Rui Barreira Zink a venit pe lume la Lisabona, în Portugalia, în ziua de 16 iunie 1961. Predă literatură la Universitatea Nouă din Lisabona. A publicat romane, nuvele, eseuri, teatru și cărți pentru copii. În portugheză, a făcut întâia carte electronică.',
        'Un roman al lui poartă titlul Cititorul din peșteră. Prezentarea folosită la școală spune că volumul are cam 120 de pagini și stă în trei părți. Cea dintâi se cheamă Călătoria. Personajul Anibalector ține la cărți.',
        'Două idei, cu vorbele noastre: te duci la un volum ca să îl descoperi. Cititul îți lasă libertatea de a alege ce păstrezi. Fraza altcuiva nu se copiază.',
        'Scena Liei este alta. Într-o marți, chiar la română, ea a rostit tare opt rânduri. Romanul pe care l-a terminat are nouăzeci de pagini. În el, un băiat caută o hartă. Ea a spus că cititul i-a dat curaj.',
        'Părerea ei este că și un volum subțire poate sta mult în amintire. Are, așadar, o idee și o atitudine. La clasă, cartea deschisă poate fi alta. Pașii nu se schimbă.',
        'Când scrii tu, pui numele cărții, pe autor, o idee și urma lăsată de citit. Dacă romanul nu este gata, o spui și folosești scena Marei, de la rafturi.',
        'Pe scena Liei faci trei pași: ce este scris, ce vezi, ce ai face tu. Ce vezi pornește de la o văd. Legătura se face prin pentru că.'
      ].join('\n\n'),
      example: [
        'Lia, marți, la română, a citit cu voce tare o foaie de opt rânduri. Romanul are 90 de pagini. Un băiat caută o hartă. Curajul este ce i-a lăsat cititul.',
        'O văd în clasă, foaia în mână. Eu aș întreba titlul, pentru că a notat 90 de pagini și a vorbit despre curaj.',
        'Data de naștere a lui Rui Zink este 16 iunie 1961. Anibalector ține la cărți. În prezentarea de școală, partea întâi se cheamă Călătoria.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Opt rânduri ajung dacă au titlul, autorul, ideea cu băiatul și harta și părerea că cititul a dat curaj. Nu e nevoie de fraza altcuiva.'
        }
      ],
      tryThis: 'Pentru Lia, scrie ce este scris, ce vezi și ce ai face, legate prin pentru că. Propoziția cu ce vezi pornește de la o văd. Spune ce este o recenzie, data de naștere a lui Rui Zink, câte părți are romanul în prezentarea de școală și ce iubește Anibalector.\n\nApoi scrie cam zece rânduri despre o carte citită de tine: titlu, autor, o idee, ce ți-a rămas după lectură. Dacă romanul nu e gata, o spui și folosești scena Marei.',
      keyPoints: [
        'În recenzie intră titlul, autorul, o idee și o părere.',
        'Zink s-a născut în 1961. Anibalector ține la cărți.',
        'Tu scrii despre o carte pe care ai dus-o până la capăt.'
      ]
    }),
    lesson({
      id: 'act-limbaj',
      title: 'Ce vrei să se întâmple din vorbă',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei piese',
          text: 'Un act de limbaj stă pe context, pe intenție și pe efect. Tonul și relația pot muta rostul aceleiași propoziții.'
        }
      ],
      theory: [
        'Actul de limbaj este bucata cea mai mică dintr-o discuție. Ca să existe, îi trebuie situația, ce vrea vorbitorul și ce se întâmplă la celălalt.',
        'Poți anunța o veste, poți atrage atenția, poți mustra sau poți cere un lucru. Semnele stau în verbe: întreb, afirm, cer, mulțumesc, promit, doresc. Mai stau în imperativ, în gest, în mimică, în ton și în volum.',
        'Un singur enunț trece prin declarație, prin promisiune, prin amenințare sau prin rugăminte. Nu decid doar cuvintele. Decid intenția și contextul.',
        'Vorbirea trece prin patru canale, iar ascultătorul o poate prinde cu patru urechi. Urechea faptelor ține datele concrete. Urechea cerințelor ține dorința ca celălalt să facă ceva.',
        'Legătura dintre cei doi ține de urechea relației. Starea celui care vorbește ține de urechea autodezvăluirii. La capăt, celălalt se poate supăra, se poate pune în mișcare, poate rămâne pasiv sau poate simți neliniște.',
        'Declarația sună Încep să citesc. Constatarea sună Începi să citești. Îndemnul sună Începe imediat să citești. Promisiunea este Promit să încep să citesc. Rugămintea este Te rog să începi să citești.',
        'Virgula mută actul. Fără ea, Hai să mâncăm bunica pare că bunica este mâncarea. Cu virgulă, Hai să mâncăm, bunica, o strigi pe ea. Atunci bunica este vocativ.',
        'Enunțul Vom reuși cu siguranță își schimbă actul după cine îl spune și după glas. Poate fi declarație, promisiune, amenințare sau rugăminte.',
        'La Ai lăsat cartea pe bancă, fapta este cartea rămasă acolo. Cerința este s-o iei. Între colegi, asta este o atenționare. Autodezvăluirea: dezordinea te deranjează.',
        'În clasă, profesorul anunță că se apropie evaluarea de la capătul clasei a VI-a. Intenția lui este o atenționare. Efectul poate fi neliniștea.'
      ].join('\n\n'),
      example: [
        'Lui Radu, Ana îi spune în clasă propoziția Avem mult de scris. Dacă doar îl anunță, el poate deschide caietul. Actul este informare.',
        'Când glasul se face aspru, vorbele acelea devin reproș. Radu se poate supăra, deși propoziția nu s-a schimbat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Înainte de concurs, un coleg spune Vom reuși cu siguranță și dă curaj: e promisiune. Același enunț, strigat de un adversar, poate suna a amenințare.'
        }
      ],
      tryThis: 'Notează cele cinci acte, fiecare cu propoziția lui: declarație, constatare, îndemn, promisiune, rugăminte. Arată ce face virgula în chemarea Hai să mâncăm, bunica.\n\nPentru Vom reuși cu siguranță alege două intenții și scrie, la fiecare, contextul și efectul. Încheie cu un dialog de patru replici, doi colegi în parc. La replica din urmă spui ce se vrea și ce urmează.',
      keyPoints: [
        'Contextul, intenția și efectul țin un act de limbaj.',
        'Glasul poate muta o veste simplă într-un reproș.',
        'Virgula arată că bunica este chemată, nu pusă în farfurie.'
      ]
    }),
    lesson({
      id: 'narativ-descriptiv',
      title: 'Povestești și te oprești să arăți',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Două viteze',
          text: 'Narațiunea duce fapta înainte. Descrierea o încetinește: vezi locul, persoana sau lucrul.'
        }
      ],
      theory: [
        'Compunerea se sprijină pe trei bucăți: introducere, cuprins, încheiere. În tiparul narativ cauți personaje, întâmplări și repere de timp și de spațiu.',
        'Tiparul descriptiv strânge trăsături. Poate fi o persoană, detalii, un obiect, adjectivul lângă substantiv ori un peisaj.',
        'Când descrierea intră într-o povestire, fapta încetinește. Dacă stă la început, așază timpul și spațiul. Dacă stă în cuprins, arată un om, un loc sau un lucru.',
        'Exemplul care urmează este scurt. Din el vezi la ce folosește fiecare bucată. După-amiaza de joi m-a găsit intrând în biblioteca școlii. Aceasta este introducerea.',
        'Sala stătea liniștită. Rafturile, înalte, erau din lemn. În fund, pe masă, ardea o lampă galbenă. Descrierea de cadru așază spațiul și oprește fapta.',
        'Am luat un volum subțire. Am citit până când a sunat clopoțelul. Aici întâmplarea înaintează: este cuprinsul narativ.',
        'Coperta, albastră și moale, avea litere argintii. Obiectul este descris în cuprins. Apoi am așezat cartea la loc. Am ieșit bucuroasă. Asta închide textul.',
        'Reperul de timp este după-amiaza de joi. Reperul de spațiu este biblioteca din școală. Galben, lângă lampă, și albastru, lângă copertă, sunt adjective lângă substantive.',
        'Când citești, marchezi în minte descrierea. Spui dacă ea deschide textul sau apare după o faptă. Verbul de acțiune, ca am citit, ține de narațiune. La clasă, textul poate fi altul. Pașii rămân aceiași.'
      ].join('\n\n'),
      example: [
        'Intrarea din biblioteca școlii, joi după-amiază, deschide modelul. Sala descrisă oprește mersul și așază locul.',
        'Volumul ales și cititul până la clopoțel țin de narațiune. Coperta albastră arată obiectul, în cuprins. Ieșirea bucuroasă închide pagina.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă descrierea stă înainte de prima faptă, ea fixează cadrul. Dacă apare după ce personajul a ales cartea, ea arată obiectul. În ambele locuri, fapta încetinește.'
        }
      ],
      tryThis: 'Scrie, la persoana întâi, o întâmplare de lectură, cam o sută de cuvinte, până pe la o sută douăzeci. Pune început, mijloc și încheiere.\n\nDescrierea să aibă măcar douăzeci de cuvinte. Pune un reper de timp și unul de spațiu. Schimbă locul și cartea față de lampa galbenă. La sfârșit spune unde stă descrierea: la început sau în cuprins.',
      keyPoints: [
        'Povestirea înaintează prin personaje, fapte, timp și spațiu.',
        'Oprirea descriptivă poate deschide textul sau poate sta în cuprins.',
        'Începutul, mijlocul și încheierea rămân vizibile în compunere.'
      ]
    }),
    lesson({
      id: 'adverbul',
      title: 'Loc, timp, fel și grade',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Fără flexiune',
          text: 'Adverbul păstrează o singură formă. Spune locul, timpul sau felul unei fapte, al unei stări ori al unei însușiri.'
        }
      ],
      theory: [
        'Adverbul nu se schimbă după gen, număr sau persoană. El spune cum, unde sau când se petrece o acțiune, o stare ori o însușire și în ce împrejurare stă ea.',
        'Poate sta lângă un verb. În Bătrânul se plimbă agale, agale spune felul. În A ajuns devreme acasă, devreme spune timpul.',
        'De loc, în altă ordine decât lista obișnuită: sus, jos, acasă, aici, acolo. Mai ții dincolo, departe, aproape, ici-colo, colea și împrejur.',
        'De timp: niciodată, imediat, ieri, mâine, acum. Mai sunt atunci, astăzi, târziu, devreme, odată, totdeauna și vreodată.',
        'De mod: tare, rar, repede, alene, încet, ușor, bine și așa. Nu orice adverb are grade. Cele care au urmează tiparul adjectivului.',
        'Pozitivul este forma simplă, repede. Mai dă comparativul de superioritate. La fel de, tot așa de și tot atât de dau egalitatea. Mai puțin dă inferioritatea.',
        'Cel mai dă superlativul relativ de superioritate, cel mai puțin pe cel de inferioritate. Foarte dă absolutul de superioritate, foarte puțin pe cel de inferioritate. Prea, ca în prea târziu, dă tot absolutul.',
        'Semiaderbele nu au funcție și stau de obicei înaintea verbului. Începutul listei: numai și doar. Urmează chiar și mai. La final: tot, decât, prea, cam.',
        'O să tot vină arată că fapta se repetă. În S-a cam supărat, cam micșorează. Decât cere, de obicei, o propoziție cu negație. Modelul este Nu am decât două exerciții.',
        'Când decât înseamnă în loc să, poate sta și fără negația obișnuită. Spui atunci Decât să desenez, mai bine citesc. Doar cere afirmație. Modelul este Doar el a venit devreme.',
        'Odată, scris legat, înseamnă cândva, ca în Locuia odată un bătrân. Scris despărțit, o dată numește o singură ocurență, ca în O dată pe săptămână.',
        'Bineînțeles se scrie legat. Deloc se scrie legat. Demult, într-un singur cuvânt, trimite la un trecut îndepărtat, ca în Demult s-a întâmplat. Când numeri timp mult, lași două cuvinte: de mult timp.',
        'Totuna și întruna se scriu legate. Întruna înseamnă neîncetat. Sensuri figurate: covrig înseamnă ghemuit, cobză înseamnă rău, tun înseamnă adânc, glonț înseamnă foarte iute, foc înseamnă foarte supărat.'
      ].join('\n\n'),
      example: [
        'Mai puțin devreme este inferioritate. La fel de rar este egalitate. Foarte încet și prea târziu sunt absolut. Cel mai puțin bine este relativ de inferioritate. Cel mai aproape este relativ de superioritate.',
        'Pentru bătrânul care locuia cândva, scrii odată. Legat mai stau bineînțeles, deloc, demult, totuna și întruna.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'În Te mai întâlnești cu el la bibliotecă, mai este semiadverb: stă înaintea verbului și nu are funcție. Negația cu decât și afirmația cu doar nu se amestecă.'
        }
      ],
      practice: [
        '1) Împarte pe loc, timp și mod, în ordinea aceasta: acasă, târziu, bine, ici-colo, rar, devreme, colea, vreodată, departe, repede.',
        '2) Spune gradul, în ordinea aceasta: tot atât de repede, mai sus, cel mai puțin bine, foarte încet.',
        '3) Alege forma legată sau despărțită: odată pentru cândva, bineînțeles, deloc, întruna.',
        '4) Ce sens au doarme tun și grupul a țâșnit glonț?'
      ].join('\n\n'),
      answers: [
        'loc: acasă, ici-colo, colea, departe; timp: târziu, devreme, vreodată; mod: bine, rar, repede',
        'egalitate; comparativ de superioritate; superlativ relativ de inferioritate; superlativ absolut',
        'odată; bineînțeles; deloc; întruna',
        'adânc; foarte repede'
      ],
      mistakes: 'Prea târziu nu se pune la comparativ. Prea, așezat înainte, dă superlativ absolut. Două cuvinte, o dată, înseamnă o singură dată, nu cândva.',
      tryThis: 'Scrie aproape cu mai și cu foarte. Construiește o negație în care apare decât și o afirmație în care apare doar. Spune sensul din doarme covrig și din supărat foc.',
      keyPoints: [
        'Forma adverbului nu se schimbă. El spune locul, timpul sau felul.',
        'Pozitivul, comparativul și superlativul sunt gradele lui.',
        'Când înseamnă cândva, odată se scrie legat.'
      ]
    }),
    lesson({
      id: 'complemente',
      title: 'Pe cine, despre cine, cui',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei întrebări',
          text: 'Directul răspunde la pe cine și la ce. Cel cu prepoziție rămâne în acuzativ. Indirectul răspunde la cui.'
        }
      ],
      theory: [
        'Complementul este o parte secundară și, de obicei, lămurește un verb. Felurile de aici sunt direct, prepozițional și indirect.',
        'Directul arată lucrul sau ființa atinse de acțiune, fără o prepoziție obligatorie. Întrebi pe cine și ce. Cazul este acuzativul.',
        'Un clitic de acuzativ îl poate dubla. Înaintea complementului, cliticul anticipează: L-am întrebat pe Ionel. După complement, cliticul reia: Pe Ana a certat-o.',
        'Comun: Citește o carte. Propriu: L-am văzut pe Andrei. Personal: L-am chemat pe el. Politețe: Pe dumneavoastră vă așteptam. Reflexiv: Mă curăț de praf.',
        'Numeralul cardinal stă în I-am supărat pe cei doi. Numeralul ordinal stă în Pe al treilea l-au premiat.',
        'Cel prepozițional spune la ce se leagă fapta. Cazul rămâne acuzativul, însă apare o prepoziție. Întrebi despre cine ori despre ce, cu cine ori cu ce, pentru cine ori pentru ce.',
        'Model despre: Vorbim despre lucruri importante. Model pentru: Votează pentru ei. Separat: Discută despre colegi. Apoi: Mergem cu Andrei. Apoi: Se gândește la el.',
        'Cu politețe: Mă întreabă despre dumnealui. Cu reflexiv: Ne spune despre sine. Prima bucată este Cu cei doi m-am întâlnit. A doua este să vorbim despre al treilea.',
        'Indirectul arată cui îi este destinată fapta. Întrebarea este cui. Cazul este dativul. Poate urma verbului sau îl poate preceda.',
        'După verb: I-am explicat Ioanei exercițiul. Înaintea verbului: Ioanei i-am explicat exercițiul. Un dativ: Îi spun colegului vestea. Altul: I-a dat fetei o floare. Altul: Îi spun Mariei adevărul.',
        'La numeral: Celor doi le este foame. La ordinal: Celui de-al treilea i-am oferit scuze. La pronume: Lui îi este frică. Alt pronume: Dumnealui i-am cerut un sfat. Reflexiv: Sieși își reproșează.',
        'Dublarea indirectului folosește i- și le-. La nume, dativul bun este Mariei, iar nu construcția la Maria. Cristina face Cristinei, nu lui Cristina.',
        'Gabi, tratat aici ca nume de băiat, face lui Gabi, nu Gabiei. Alexandra face Alexandrei. Forma Lui Alexandra nu este cea bună.'
      ].join('\n\n'),
      example: [
        'În Am citit o poezie, grupul o poezie răspunde la ce. Este direct, prin substantiv comun.',
        'În Vorbim despre lucruri importante, grupul cu despre este prepozițional. În Îi spun Mariei adevărul, Mariei răspunde la cui, iar adevărul răspunde la ce.',
        'Ioanei i-am explicat exercițiul mută indirectul înaintea verbului, fără să îi schimbe rolul. Dativele de ținut minte: Mariei, Cristinei, lui Gabi, Alexandrei.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pe Ionel, în L-am întrebat pe Ionel, este direct anticipat de L-. Pe Ana, în Pe Ana a certat-o, este direct reluat. Cu Andrei, în Mergem cu Andrei, este prepozițional.'
        }
      ],
      practice: [
        '1) Numește directul și partea de vorbire în Citește o carte, apoi în L-am văzut pe Andrei.',
        '2) Numește grupul prepozițional din Discută despre colegi și din Votează pentru ei.',
        '3) În I-a dat fetei o floare, ce este fetei și ce este o floare?',
        '4) Alege dativul, în ordinea aceasta: Alexandrei sau Lui Alexandra; lui Gabi sau Gabiei; Cristinei sau lui Cristina; Mariei sau la Maria.'
      ].join('\n\n'),
      answers: [
        'o carte, substantiv comun; pe Andrei, substantiv propriu',
        'despre colegi; pentru ei',
        'fetei este indirect, o floare este direct',
        'Alexandrei; lui Gabi; Cristinei; Mariei'
      ],
      mistakes: 'Construcția la Maria nu ține loc de dativ. Lui Cristina și Lui Alexandra nu sunt formele bune. La un Gabi băiat nu scrii Gabiei, scrii lui Gabi.',
      tryThis: 'Spune directul și partea de vorbire din Pe dumneavoastră vă așteptam și din Pe al treilea l-au premiat. Scrie o propoziție în care indirectul stă înaintea verbului, pe tiparul cu Ioana și exercițiul.',
      keyPoints: [
        'Directul stă în acuzativ și răspunde la pe cine sau la ce.',
        'Prepoziția nu mută cazul: prepoziționalul rămâne în acuzativ.',
        'Indirectul stă în dativ și răspunde la cui.'
      ]
    }),
    lesson({
      id: 'circumstantiale',
      title: 'Unde, când și cum',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Rolul, nu cuvântul',
          text: 'Același cuvânt poate fi subiect, nume predicativ sau circumstanțial. Hotărăște rolul din propoziție, nu forma goală.'
        }
      ],
      theory: [
        'Circumstanțialul de loc spune unde se petrece fapta, de unde pleacă, încotro merge, până unde și pe ce drum. Substantivul, pronumele și numeralul stau în acuzativ, cu prepoziție. Uneori locul este spus de un adverb.',
        'Întrebi unde, de unde, până unde, încotro, pe unde. Unde: În parc s-au adunat mulți copii. De unde: Ne întoarcem de la stadion. Direcție: Mergeau în București.',
        'Limită: A ajuns până la marginea pădurii. Drum: Ei aleargă pe pistă. Spre: Se îndreaptă spre ea. Până la numeral: Merge până la cei doi. Adverb: Plecăm acasă.',
        'Circumstanțialul de timp spune când, cât durează, până când și cât de des. Întrebările sunt când, de când, până când, cât timp. Se poate exprima prin substantiv, prin pronume, prin numeral sau prin adverb.',
        'Substantiv: După Mihai au sosit ei. Pronume: Vom sosi înaintea lui. Numeral: După cei trei a intrat și el. Adverb: Astăzi vom merge în excursie.',
        'Rolul se citește din propoziție. În Noaptea este un sfetnic bun, noaptea face acțiunea: este subiect, la nominativ. În Am ajuns noaptea, noaptea spune când: este circumstanțial de timp.',
        'Când spui că anotimpul preferat este toamna, rolul ei este de nume predicativ. În Toamna începe școala, toamna spune când. În propoziția despre luni însorită, ziua face acțiunea, deci e subiect. În Luni vom merge în parc, luni spune când.',
        'Circumstanțialul de mod spune felul unei acțiuni sau felul unei însușiri. Întrebi cum. Mai întrebi în ce fel, apoi în ce mod, apoi cât.',
        'Cu prepoziție: Desenează ca sora lui. Comparație: Este mai cuminte decât mine. Ionel, față de cel de-al treilea, este puțin mai înalt. Adverb: Bunica merge alene.',
        'Țintă: Se uită țintă. Liniște: Merg în liniște. Grup: Se comportă precum cei trei. Grijă: Citește cu atenție. Iuțeală: Destul de repede a dispărut. Intrare: Am intrat și noi precum el. Politețe: Se poartă ca dumneavoastră.'
      ].join('\n\n'),
      example: [
        'Grupul în parc răspunde la unde. Este loc, prin substantiv cu prepoziție. În Plecăm acasă, acasă este adverb de loc.',
        'În Astăzi vom merge în excursie, astăzi spune când și este adverb. În Bunica merge alene, alene spune cum.',
        'Noaptea este subiect când răspunde la cine. Devine circumstanțial de timp când răspunde la când. Toamna de după este este nume predicativ.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ca sora lui răspunde la cum: mod, prin substantiv cu prepoziție. Ziua, în propoziția despre ziua de luni însorită, este subiect. Luni, când spuneți că mergeți în parc, spune când.'
        }
      ],
      practice: [
        '1) Ce întrebare pui și prin ce se exprimă locul în În parc s-au adunat mulți copii? Dar în Plecăm acasă?',
        '2) Ce funcție are noaptea în Noaptea este un sfetnic bun și ce funcție are în Am ajuns noaptea?',
        '3) Spune rolul lui toamna după este și în Toamna începe școala, apoi rolul lui ziua și al lui luni.',
        '4) Ce întrebare și ce parte de vorbire ai în Bunica merge alene și în Desenează ca sora lui?'
      ].join('\n\n'),
      answers: [
        'unde, substantiv cu prepoziție; unde, adverb de loc',
        'subiect la nominativ; circumstanțial de timp',
        'nume predicativ; circumstanțial de timp; subiect; circumstanțial de timp',
        'cum, adverb; cum, substantiv cu prepoziție'
      ],
      mistakes: 'Nu pune noaptea mereu la complement. Când deschide propoziția Noaptea este un sfetnic bun, ea este subiect. După este, toamna poate fi nume predicativ.',
      tryThis: 'Spune întrebarea pentru întoarcerea de la stadion și pentru excursia de astăzi. Scrie trei propoziții despre drumul până la bibliotecă: loc, timp și mod.',
      keyPoints: [
        'Locul se întreabă cu unde și cu încotro, timpul cu când, modul cu cum.',
        'Noaptea este subiect când face acțiunea și circumstanțial când marchează momentul.',
        'După este, toamna poate fi nume predicativ, nu complement de timp.'
      ]
    }),
    lesson({
      id: 'limba-romana',
      title: 'Limba română între limbile Europei',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'A cincea',
          text: 'Româna ține de familia romanică. După numărul de vorbitori vine a cincea, în urma spaniolei, a portughezei, a francezei și a italienei.'
        }
      ],
      theory: [
        'Țara stă în sud-estul Europei Centrale. O străbate Dunărea pe cursul ei de jos. La sud este Peninsula Balcanică. Spre mare, țărmul este cel de nord-vest al Mării Negre.',
        'După cucerirea lui Traian, ținuturile de la nord de Dunăre au intrat în Imperiu, iar Dacia a devenit provincie romană. Originea învățată aici este amestecul celor două popoare.',
        'Româna este limbă romanică. La numărul de vorbitori stă pe locul cinci, după spaniolă, portugheză, franceză și italiană. Cam 28 de milioane de oameni o vorbesc.',
        'Cam 24 de milioane o au de la mama. În România sunt cam 17 milioane dintre vorbitori. Aici este limbă oficială și, pentru peste 90 la sută din locuitori, limbă maternă.',
        'A crescut din latina de toate zilele a romanilor și din limba dacilor, cu influențe venite mai târziu. De limbile romanice din apus s-a despărțit între veacurile al V-lea și al VIII-lea.',
        'Ca să o despartă de aromână, de meglenoromână și de istroromână, lingvistica comparată îi spune daco-română. Înainte de statul modern, oamenii își ziceau rumâni sau români. Limbii îi ziceau rumână sau românească.',
        'O notiță din 1574, lăsată de Pierre Lescalopier, spune că moldovenii, valahii și mulți transilvăneni se vedeau urmași ai romanilor. Limbii îi spuneau românește.',
        'Din 1521 ne-a rămas, de la Câmpulung, Scrisoarea lui Neacșu. Este cel mai vechi text românesc păstrat. Literele sunt chirilice. Alfabetul chirilic s-a mai folosit până în veacul al XIX-lea.',
        'În 1687, Miron Costin nota o origine comună în De neamul moldovenilor. În 1714, Dimitrie Cantemir făcea la fel în Descriptio Moldaviae: moldoveni, valahi și oameni din regatul Ungariei.',
        'Sub UNESCO s-a alcătuit un dicționar internațional de termeni literari. Intră acolo dor, doină și colindă, trei cuvinte românești greu de tradus exact. Legea 53/2013 a fixat Ziua Limbii Române la 31 august.',
        'În Republica Moldova, din 1990, aceeași zi poartă numele Limba noastră. La clasă puteți alcătui împreună o cărticică. Textul tău se scrie aici, fără vers copiat.'
      ].join('\n\n'),
      example: [
        'Locul cinci, între limbile romanice, vine după spaniolă, portugheză, franceză și italiană. Ții minte trei numere, în milioane: 28, 24 și 17.',
        'Neacșu a scris în 1521. Ziua limbii cade în 31 august, prin legea din 2013. Dor, doină și colindă se traduc greu, fără echivalent exact.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Sărbătoarea din Republica Moldova, începută în 1990, se numește Limba noastră și cade tot la 31 august. Legea nu este aceeași, ziua da.'
        }
      ],
      tryThis: 'În cam zece rânduri, cu vorbele tale, pune 31 august și legea din 2013. Adaugă cele patru limbi din familia romanică, numerele 28, 24 și 17, scrisoarea din 1521 și fie dor, fie doină, fie colindă. Spune și numele sărbătorii din Republica Moldova.',
      keyPoints: [
        'După numărul de vorbitori, româna este a cincea limbă romanică.',
        'Legea 53/2013 a pus ziua limbii la 31 august.',
        'Textul cel mai vechi păstrat este scrisoarea din 1521.'
      ]
    }),
    lesson({
      id: 'proiect-cititor',
      title: 'Jurnalul meu de cititor',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Grupul',
          text: 'Lucrați patru sau cinci. Alegeți un titlu și trei metode. Secretarul notează reflecția. De pe copertă nu se iau citate.'
        }
      ],
      theory: [
        'Proiectul se face cu patru sau cu cinci colegi. Fiecare își alege un titlu din meniu. Dacă nu l-ai citit încă, îl treci la lecturi viitoare. Jurnalul de azi se scrie despre o carte terminată, chiar dacă nu este pe listă.',
        'La clasă repeți jurnalul pe cartea deschisă acolo. Meniul este o listă de lectură, nu o temă pe o carte nevăzută.',
        'La familie, trei autori. Hector Malot a scris Singur pe lume. Mihail Sadoveanu a scris Dumbrava minunată. Ionel Teodoreanu a scris La Medeleni.',
        'La prietenie, alți trei. Cezar Petrescu a scris Fram, ursul polar. Antoine de Saint-Exupéry a scris Micul prinț. Johanna Spyri a scris Heidi, fetița munților.',
        'La aventură: Constantin Chiriță a scris Cireșarii. Radu Tudoran a scris Toate pânzele sus. Mark Twain a scris Aventurile lui Tom Sawyer.',
        'La lectură: Rui Zink a scris Cititorul din peșteră. Jo Cotterill a scris Lămâi, cărți și prieteni. Markus Zusak a scris Hoțul de cărți.',
        'Din șase metode luați trei. Puteți lua scheletul de recenzie ori oglinda cărții. Mai sunt fișele de lectură și harta textului. Rămân jurnalul de cititor și harta mentală.',
        'Apoi faceți o prezentare gândită de voi. Secretarul strânge reflecția: de ce ați ales cartea, de la cine ați cerut sprijin, cum ați împărțit sarcinile, ce ați învățat și cum prezentați.',
        'Citatele de pe copertă nu se copiază. Jurnalul, la persoana întâi, spune unde ai citit și ce ai simțit. Titlul necittit se anunță limpede.'
      ].join('\n\n'),
      example: [
        'Cinci elevi lucrează împreună. Ana își pune Fram, ursul polar, la lecturi viitoare. Jurnalul de azi îl scrie despre o carte citită vara, între rafturi.',
        'Alege jurnalul de cititor, fișa de lectură și harta mentală. Vlad, ca secretar, notează de ce prietenia este tema, cine a dat ajutor și cum se face prezentarea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă grupul alege Cireșarii, dar nimeni nu a terminat volumul, jurnalul de azi rămâne pe o carte citită. Cireșarii se notează ca lectură viitoare, nu ca text inventat.'
        }
      ],
      tryThis: 'Alege un titlu din cele patru grupe și trei metode din cele șase. Scrie cam zece rânduri de jurnal, la persoana întâi: locul lecturii și o emoție.\n\nDacă volumul ales nu l-ai terminat, o spui și treci pe cartea cunoscută. La urmă, ca secretar: motivul cărții, ajutorul, împărțirea sarcinilor, felul prezentării.',
      keyPoints: [
        'Grupul are patru sau cinci membri și un titlu din meniu.',
        'Trei metode, dintre șase, pregătesc prezentarea.',
        'Însemnarea la persoana întâi spune locul lecturii și emoția.'
      ]
    }),
    lesson({
      id: 'recap-calatorii',
      title: 'Încheierea despre călătorii',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'atentie',
          title: 'O singură scenă',
          text: 'Recapitularea se face pe scena Irinei. Amintirea despre Eminescu rămâne fapt istoric, nu text de copiat.'
        }
      ],
      theory: [
        'Unitatea se închide pe o scenă scrisă aici. Irina, sâmbătă seara, stă acasă și deschide jurnalul. Notează lectura de ieri. A citit la bibliotecă, repede. Volumul era o carte despre corăbii.',
        'Timpul scrisului, sâmbătă seara, este circumstanțial. Locul acasă este adverb. Ieri, tot adverb, ține de timpul lecturii. Repede, adverb, ține de mod.',
        'La a deschis, jurnalul este complement direct. La a citit, o carte este tot complement direct. Despre corăbii este complement prepozițional. Locul lecturii, la bibliotecă, este circumstanțial.',
        'Scrisul se petrece sâmbătă seara, lectura a fost ieri. Pentru că clipa de acum stă înaintea faptei, textul este rememorare.',
        'Există o amintire din 18 iunie 1889, intitulată În Nirvana, scrisă de Ion Luca Caragiale. La 17 ani, în București, a făcut cunoștință cu Mihai Eminescu.',
        'La Giurgiu, un actor îl găsise citind. Portretul acela nu se copiază. Lucrezi scena Irinei. Pașii sunt cei știuți: ce este scris, ce vezi, ce ai face tu, legate prin pentru că.',
        'Ce vezi pornește de la o văd. Mai recunoști un adverb de timp, unul de loc, complementul direct și complementul prepozițional.',
        'La final scrii, la persoana întâi, șase până la opt rânduri despre aceeași seară. Pui un reper de timp, un reper de spațiu și o descriere de măcar douăzeci de cuvinte. Descrierea încetinește fapta, cum ai văzut la tiparul narativ-descriptiv.'
      ].join('\n\n'),
      example: [
        'Scrisul spune că Irina, sâmbătă seara, acasă, deschide jurnalul. Acolo notează că ieri a citit repede, la bibliotecă, o carte despre corăbii.',
        'O văd seara, la ea acasă, jurnalul stând deschis. Aș fi adăugat titlul, pentru că volumul era despre corăbii.',
        'Ieri spune când, acasă spune unde, repede spune cum. O carte este direct. Despre corăbii este prepozițional.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă descrii jurnalul, cu coperte groase și o panglică roșie, fapta se oprește. Reperul de timp rămâne sâmbătă seara. Reperul de spațiu rămâne acasă.'
        }
      ],
      tryThis: 'Pentru Irina, scrie ce este scris, ce vezi și ce ai face, cu pentru că. Ce vezi pornește de la o văd. Numește un adverb de timp, unul de loc, directul și prepoziționalul. Spune de ce textul este rememorare.\n\nApoi, la persoana întâi, scrie șase până la opt rânduri despre aceeași seară, cu narațiune și descriere. Pune un reper de timp, unul de spațiu și o descriere de măcar douăzeci de cuvinte.',
      keyPoints: [
        'Irina scrie acasă, sâmbătă seara, despre lectura de ieri.',
        'În aceeași scenă stau rememorarea, adverbul și complementul.',
        'Portretul din amintirea despre Eminescu nu se transcrie.'
      ]
    })
  ]
};
