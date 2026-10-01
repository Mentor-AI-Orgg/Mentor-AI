'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  lessons: [
    lesson({
      id: 'deschidere-punti',
      title: 'Harta dintre lumi',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Harta',
          text: 'Deschiderea funcționează ca hartă. Tema leagă cotidianul de o lume care nu se lasă lămurită până la capăt.'
        }
      ],
      theory: [
        'Unitatea se deschide cu o hartă. De o parte stă lumea pe care o recunoști. De cealaltă stă un fapt care nu primește o lămurire întreagă. Lecțiile merg pe puntea dintre ele.',
        'La textul epic urmărești acțiunea, timpul, spațiul și personajele. Apoi intri în literatura fantastică. Mai departe vin textul multimodal și enciclopedia, adică felul în care informația stă lângă imagine.',
        'La oral explici și recunoști respectul și toleranța. La scris parcurgi etapele redactării. Alcătuiești un text explicativ, care răspunde la de ce, și o recenzie, care prezintă o carte fără să-i dea deznodământul.',
        'La verb reiei tipurile, modurile și timpurile. Urmează conjunctivul și condițional-optativul. Apoi vin infinitivul, participiul, gerunziul și supinul. La final vezi cum se combină verbul, ca centru sau ca adjunct, cu alte cuvinte.',
        'La interculturalitate spui ce este un mit. Reții faptele Dochiei: sora lui Decebal, refuzul Romei, stâncile de pe Ceahlău. Nu lipești o narațiune gata făcută.',
        'Pe hartă stau treisprezece competențe. Le numeri cu pauze: 1.3, apoi 1.4, apoi 2.1. Urmează 2.2, 2.3 și 2.4. Apoi 3.1, 3.2, 3.4. Apoi 4.2, 4.3, 4.5. Lista se închide cu 5.2. Ele sunt ținta unității.',
        'Lângă unitate stau fișa de observare și grila de puncte. Ele nu țin loc de lecție. Notează ce ai făcut. Nu îți predau o noțiune nouă și nu înlocuiesc exercițiul.',
        'Doina Ruști și Sosuke Natsukawa sunt numele anunțate pe hartă. Le folosești ca repere de autor. Nu sunt un fragment pe care să-l lipești în caiet.',
        'Azi traseul strânge fantasticul, enciclopedia, verbul și mitul Dochiei. Restul orelor umple aceleași competențe, una câte una, până la recapitulare.'
      ].join('\n\n'),
      example: [
        'Harta de azi numește fantasticul, enciclopedia, verbul și mitul Dochiei. Ținta are treisprezece competențe.',
        'Cele două nume de autori rămân repere. Grila de puncte nu ține loc de lecție.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ordinea practică pornește de la planuri și personaje, trece prin enciclopedie, text explicativ, respect și recenzie, apoi intră în gramatica verbului. Mitul închide seria, înainte de recapitulare.'
        }
      ],
      tryThis: 'Alcătuiește trei propoziții. Prima arată tema: puntea dintre lumi. Tot acolo spui că lucrezi literatura fantastică.\n\nA doua înșiră codurile, cu pauze: 1.3, apoi 1.4, apoi 2.1. Urmează 2.2, 2.3 și 2.4. Apoi 3.1, 3.2, 3.4. Apoi 4.2, 4.3, 4.5. La urmă vine 5.2. Totalul este treisprezece.\n\nA treia amintește infinitivul și gerunziul. Adaugă mitul Dochiei. Separat, notează că grila de puncte nu este lecție.',
      keyPoints: [
        'Traseul trece prin fantastic, enciclopedie, respect, recenzie, verb și mitul Dochiei.',
        'Lista țintă are treisprezece competențe, începând cu 1.3 și închizând cu 5.2.',
        'Notarea stă în grila de puncte și în fișa de observare. Ele nu predau o noțiune.'
      ]
    }),
    lesson({
      id: 'fantastic',
      title: 'Două planuri și un lucru care nu se explică',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Fantastic',
          text: 'Fantasticul pune un fapt care nu se explică într-o lume luată drept reală. Încheierea rămâne deschisă.'
        }
      ],
      theory: [
        'Cuvântul vine din greacă: phantastikos, legat de imaginație. Din latină vine phantasticus, o plăsmuire. Îl recunoști după mister, după suspans și după incertitudine.',
        'Un obiect sau un fenomen straniu tulbură realitatea. Personajele se neliniștesc și caută un sens. Planurile sunt două: realul și irealul.',
        'Timpul poate încetini. Poate grăbi pasul. Se poate și întoarce. Locurile apasă adesea: un subsol sau o casă părăsită, apoi un loc pustiu. Mai apar o alee întunecată și o pădure.',
        'Acolo pot sta un talisman, un elixir sau o oglindă. Pot apărea și ființe din afara lumii cunoscute. Încheierea rămâne deschisă și ambiguă. Uneori deznodământul este nefericit.',
        'Basmul popular stă din capul locului în imaginar. Fantasticul lasă o apariție stranie să tulbure o realitate deja cunoscută.',
        'Protagonistul stă în centru: el dă peste supranatural. Poate fi erou. Uneori este antierou. Antagonistul i se opune, ca om, ca fenomen sau ca forță, și urcă tensiunea.',
        'În istoria literară, un reper este Moara lui Călifar. O semnează Gala Galaction. Alt reper: La hanul lui Mânjoală. O semnează Ion Luca Caragiale. Al treilea: Sărmanul Dionis, de Mihai Eminescu. Fragmentele nu se copiază.',
        'Doina Ruști s-a născut în 1957. Trilogia fanariotă are trei romane. Manuscrisul fanariot a apărut în 2015. Mâța Vinerii a apărut în 2017. Homeric a apărut în 2019.',
        'Înainte au mai ieșit Zogru, anul 2006, și Fantoma din moară, anul 2008. Lizoanca la 11 ani a apărut în 2009. Anul 2010 a adus Cămașa în carouri, apoi Omulețul roșu. Logodnica a apărut și ea în 2017.',
        'Separat de romane, Pădurea albastră a fost scrisă pentru clasa a VII-a. Textul nu se lipește. Locul lui îl ia scena de mai jos.',
        'În seara de miercuri, Mara era la parter. A auzit ciocănituri în geam. Pe pervaz stătea un glob albastru, de sticlă. Din el a ieșit un greier. A anunțat că volumul se află jos, în subsol.',
        'Afară, pădurea rămânea liniștită. Mara s-a speriat și a rămas sus. Camera, cu pădurea liniștită, ține de real. Greierul vorbitor ține de ireal. Elementul misterios este globul. Neliniștea este teama.',
        'Nu aflăm dacă Mara coboară, deci finalul stă deschis. Naratorul nu folosește eu. Relatarea este la persoana a III-a. Timpul marcat este miercuri seara. Spațiul: camera, pervazul, pădurea. Subsolul e doar numit.'
      ].join('\n\n'),
      example: [
        'Ce scrie: miercuri seara, la parter, Mara aude ciocănituri. Din globul albastru iese un greier. El spune că volumul este jos, în subsol.',
        'Imaginea: O văd pe Mara lângă pervaz. Eu aș aprinde lumina, pentru că teama a ținut-o sus. Camera ține de real. Greierul vorbitor ține de ireal.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă timpul s-ar întoarce doar în camera Marei, iar pădurea ar rămâne la fel de liniștită, tot ai două planuri. Globul ar rămâne elementul straniu, iar lipsa coborârii ar ține finalul deschis.'
        }
      ],
      tryThis: 'Pe scena Marei, notează ce este scris. Apoi ce vezi, începând cu O văd. Apoi ce ai face, folosind pentru că.\n\nDă timpul, spațiul, elementul misterios și planurile. Spune de ce finalul stă deschis și cum se desparte fantasticul de basm.\n\nDespre Doina Ruști, notează anul nașterii, un titlu fanariot și clasa pentru care a fost scrisă Pădurea albastră. Nu lipi un fragment.',
      keyPoints: [
        'Fantasticul tulbură realul printr-un element straniu și lasă încheierea deschisă. Basmul stă din start în imaginar.',
        'La Mara, camera ține de real, iar greierul vorbitor ține de ireal.',
        'Doina Ruști s-a născut în 1957. Pădurea albastră a fost scrisă pentru clasa a VII-a.'
      ]
    }),
    lesson({
      id: 'planuri-personaje',
      title: 'Cine leagă lumea reală de cea ireală',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Legătura',
          text: 'Când textul are două planuri, cauți elementul care le unește. Protagonistul dă peste supranatural. Antagonistul i se poate opune chiar dacă nu este om.'
        }
      ],
      theory: [
        'Când un text are două planuri, cauți elementul care le unește. La noi, globul de pe pervaz face legătura dintre Mara și greierul vorbitor.',
        'Sunt trei prezențe: Mara, greierul și cartea doar amintită, care tace. Mara este protagonist, fiindcă aude ciocănitul și se sperie.',
        'Greierul nu joacă rol de antagonist. El aduce o veste. Nu o împinge spre o faptă rea. Rolul potrivnic poate cădea pe bătaia fără explicație din geam: o forță, nu o persoană.',
        'Harta mentală pornește dintr-un nucleu. Aici nucleul este cuvântul glob. Din el pleacă ramuri: timp, spațiu, personaje, element misterios, emoție.',
        'O ții dacă aduce informație, dacă ai făcut-o tu și dacă o cuprinzi dintr-o privire. Altfel rămâne un desen gol.',
        'Gianni Rodari a lăsat un joc de fantezie. Îți închipui un animal neașteptat la ușă, care cere de mâncare. Formularea lui nu se reia. Păstrăm doar ideea de fantastic, cu date noi.',
        'Miercuri seara, un crocodil bate la ușa camerei. Cere o firimitură de pâine. Camera stă în real. Animalul care vorbește stă în ireal. Deznodământul nu se duce până la capăt.',
        'Pe textul de la oră arăți cine narează. Spui și ce ființe apar. Aici vocea este la persoana a III-a. Ființa din afara realului este greierul.',
        'Cei trei muschetari este roman. Îl semnează Alexandre Dumas. Două teme, de numit fără un capitol lipit, sunt prietenia și loialitatea. Volumele nu se numără fix, fiindcă edițiile nu coincid.'
      ].join('\n\n'),
      example: [
        'Globul unește camera cu greierul. Mara este protagonist. Bătaia din geam tulbură ca forță, nu ca om.',
        'Nucleul hărții mentale este glob. Crocodilul de la ușă este ireal, camera este reală. Romanul Cei trei muschetari îl are autor pe Alexandre Dumas. Temele sunt prietenia și loialitatea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă în locul greierului ar vorbi cartea, tot ea ar fi ființa din afara realului. Mara ar rămâne protagonist, iar bătaia din geam ar putea rămâne forța care tulbură, fără să fie un om.'
        }
      ],
      tryThis: 'Pe scena Marei, arată cine unește planurile. Spune cine este protagonist. Arată în ce fel bătaia din fereastră ar putea fi forță potrivnică, deși nu este om.\n\nSchițează în cuvinte o hartă mentală. Centrul este glob. Patru ramuri: timp, spațiu, emoție, element misterios.\n\nCompune 100–150 de cuvinte. Un crocodil bate la ușă. Cere pâine. Pui planul real, elementul ireal și finalul deschis. Adaugi că Alexandre Dumas a scris romanul Cei trei muschetari. Două teme: prietenia și loialitatea.',
      keyPoints: [
        'Cel care dă peste supranatural este protagonistul. Potrivnicul poate fi o forță, nu neapărat un om.',
        'Harta mentală are un nucleu. Aici globul unește planurile, iar încheierea nu se închide.',
        'Alexandre Dumas a scris Cei trei muschetari. De reținut sunt prietenia și loialitatea.'
      ]
    }),
    lesson({
      id: 'enciclopedie',
      title: 'Pagina care amestecă textul cu imaginea',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Multimodal',
          text: 'Un text multimodal spune informația în mai multe feluri: cuvinte, sunete, gesturi, imagini. Enciclopedia poate sta pe hârtie sau online.'
        }
      ],
      theory: [
        'O enciclopedie strânge informații din mai multe domenii sau dintr-unul singur. Varianta tipărită așază lângă explicații fotografii, desene, scheme și hărți. Varianta online poate aduce animație și sunet.',
        'Articolele arată lucrările folosite. Wikipedia este liberă și online. S-a deschis în 2001. Voluntarii o scriu împreună. Oricine îi poate schimba un articol, așa că mai cauți o sursă.',
        'La fel stă articolul despre Pădurea Hoia-Baciu. Ea se află la apus de Cluj-Napoca. Stă între oraș și comuna Baciu. Denumirea unește dealul Hoia cu localitatea Baciu.',
        'Textul informează, deci este nonliterar. Alătură cuvinte și imagine, deci este multimodal. Nu povestește. Se adresează oricărei persoane interesate de domeniu.',
        'Din șirul turist, sportiv, pădurar, nimeni, orice persoană interesată, alegi ultima variantă.',
        'Sosuke Natsukawa, născut în 1978, lucrează ca medic și ca scriitor, în Nagano. Debutul, Kamisama no Karute, a luat premiul Shogakukan la ficțiune. A luat și premiul librarilor din Japonia.',
        'Romanul din 2017 se cheamă, în traducere, Motanul care voia să salveze cărțile. A ajuns cunoscut. A fost tradus în 38 de limbi. Descrierea unui interior cu coridor și lustre nu se reia.',
        'Hallerbos, pădure belgiană de lângă Halle, își albăstrește poienile primăvara, de la flori. De aici vine și numele de pădure albastră. Într-un articol scurt pui locul, anotimpul și o imagine spusă în cuvinte. O legendă necitită nu se născocește.'
      ].join('\n\n'),
      example: [
        'Wikipedia s-a deschis în 2001. O poate schimba oricine, deci o verifici. Hoia-Baciu stă la vest de Cluj-Napoca.',
        'Articolul ei informează și amestecă textul cu imaginea. Cititorul vizat este orice persoană interesată. Anul nașterii lui Natsukawa este 1978. Traducerea romanului din 2017 a ajuns la 38 de limbi. Pădurea Hallerbos, în Belgia, se umple de albastru primăvara.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un articol despre Hallerbos poate spune: pădure belgiană, lângă localitatea Halle, poieni albastre primăvara. Lângă text ai pune o fotografie cu florile, nu o legendă inventată.'
        }
      ],
      tryThis: 'Definește textul multimodal. Arată de ce textul despre Hoia-Baciu este nonliterar. Arată și de ce este multimodal. Notează așezarea pădurii și legătura numelui.\n\nAlege destinatarul dintre turist, sportiv și pădurar, sau nimeni, sau orice persoană interesată. Despre Sosuke Natsukawa dă anul nașterii, meseria și numărul de limbi al romanului din 2017.\n\nCompune 80–100 de cuvinte despre Hallerbos: locul, ce aduce primăvara, ce imagine ai pune lângă text. Amintește că Wikipedia s-a deschis în 2001.',
      keyPoints: [
        'Multimodalul pune laolaltă cuvinte și imagini. Enciclopedia informează, pe hârtie sau online.',
        'Wikipedia s-a deschis în 2001. Hoia-Baciu stă la vest de Cluj-Napoca, iar textul despre ea informează.',
        'Hallerbos, lângă Halle, se albăstrește primăvara. Nu născocești o legendă pe care nu ai citit-o.'
      ]
    }),
    lesson({
      id: 'text-explicativ',
      title: 'De ce, cum și din ce cauză',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Explicația',
          text: 'O explicație răspunde la de ce, la cum și la cauză. Rămâne obiectivă: persoana a III-a, prezent, sens propriu.'
        }
      ],
      theory: [
        'O secvență explicativă îți dă ce-ți trebuie ca să pricepi un eveniment, o noțiune sau o cauză. Poate intra într-un text literar. Poate sta și într-unul nonliterar: o instrucțiune, o schiță, un prospect, o rețetă.',
        'Cuvintele păstrează sensul propriu și țin de un domeniu. Leagă cauza de efect conectori ca pentru că, deoarece, fiindcă, întrucât, deci și așadar. Forme cunoscute: articol de dicționar, prospect, rețetă, schemă.',
        'Explicația de lucru este a noastră. Globul din sticlă albastră se aburește. În cameră e cald. Sticla e rece. Aburul este efectul. Căldura camerei și sticla rece sunt cauza.',
        'Verbele rămân la prezent, de pildă se umple și este. Nu apare eu. Cel care explică este lecția, nu un personaj din scenă.',
        'Nu reluăm o rețetă dintr-o carte cu motani. Aici cina este scurtă și se poate verifica. Unui pisoi îi dai apă curată și, lângă ea, o lingură de hrană umedă. Are nevoie de lichid.',
        'Laptele dulce rămâne deoparte dacă nu e sigur că pisoiul îl suportă. Rămâi la explicație, nu aluneci în poveste. Întrebările de tip de ce și de tip cauză se aplică aici globului și cinei, pe textul nostru.',
        'Pentru că introduce cauza. Deci poate introduce efectul: pe sticlă apare abur. Aceeași legătură se poate spune cu deoarece sau cu așadar, fără alte fapte.'
      ].join('\n\n'),
      example: [
        'Globul se aburește, deoarece camera e caldă și sticla e rece. Pentru că ține cauza. Deci pe sticlă apare abur, deci ține efectul.',
        'Relatarea folosește persoana a III-a, la timpul prezent. Pisoiul primește apă curată, fiindcă are nevoie de lichid.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Hrana umedă stă lângă apă, întrucât pisoiul are nevoie de lichid. Laptele dulce lipsește, fiindcă nu știm dacă îl suportă. Enunțul rămâne la prezent și nu povestește o întâmplare.'
        }
      ],
      tryThis: 'În șase enunțuri, arată cauza aburului de pe glob. Leagă ideile prin pentru că, prin deoarece și prin deci. Ține persoana a III-a și prezentul.\n\nAdaugă o rețetă scurtă pentru un pisoi: ingrediente, pași și cauza fiecărui pas. Nu lua rețeta dintr-o carte.\n\nLa urmă, oral, în cinci rânduri, explică un joc de familie: locul, jucătorii, începutul și motivul încheierii.',
      keyPoints: [
        'Explicația răspunde la de ce, la cum și la cauză, cu sens propriu și cu conectori.',
        'Verbele stau la prezent, fără eu. Aburul apare fiindcă camera e caldă, iar sticla e rece.',
        'Cina pisoiului se poate verifica: apă curată, hrană umedă, pentru nevoia de lichid.'
      ]
    }),
    lesson({
      id: 'respect-toleranta',
      title: 'Atitudinea și fapta',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Două atitudini',
          text: 'Respectul arată prețuire, prin vorbă sau prin gest. Toleranța primește o părere alta decât a ta, fără jignire, chiar dacă nu ești de acord.'
        }
      ],
      theory: [
        'Atitudinea este felul în care privești pe cineva, o idee ori un lucru. Doi oameni, în aceeași situație, pot privi altfel. Comportamentul este fapta pe care o vezi.',
        'Faptele bune, numite prosociale, mențin apropierea dintre oameni. Faptele antisociale o destramă. În fapte bune se văd toleranța, respectul, responsabilitatea și înțelegerea.',
        'Toleranța primește, fără judecată, persoane, opinii și feluri de viață diferite de ale tale. Ține de libertatea celuilalt.',
        'În dialog ești tolerant când ești curios față de subiect, când primești un punct de vedere diferit, când nu jignești și când te poți adapta.',
        'Din șirul iubire și respect, apoi minciună, prejudecată, toleranță, discriminare, lenevire și egoism, sunt valori doar iubirea, respectul și toleranța. Restul nu sunt valori: minciuna, prejudecata, discriminarea, lenevirea, egoismul.',
        'Data de 16 noiembrie este Ziua internațională a toleranței. Scena: la bibliotecă, Mara voia globul doar pentru sine. Nora voia și ea să privească.',
        'Mara i-a făcut loc pe bancă și a poftit-o pe Nora să privească. Nu a râs de întrebarea Norei. Locul făcut este respect. Curiozitatea primită, alta decât a ei, este toleranță.',
        'Din scenă faci trei pași. Notezi faptele scrise. Notezi imaginea. La urmă alegi tu o faptă și o legi cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce scrie: la bibliotecă, Mara i-a făcut loc pe bancă Norei și a poftit-o să privească globul. Ce vezi: Le văd pe amândouă la aceeași bancă, iar globul stă între ele.',
        'Eu aș ruga-o pe Nora să spună ce observă în glob, fiindcă Mara nu a râs de curiozitatea ei. Din listă, valorile sunt iubirea, respectul și toleranța. Data este 16 noiembrie.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă Nora ar fi pus o întrebare neobișnuită și Mara ar fi ascultat-o fără râs, gestul ar fi rămas respect, iar ascultarea ar fi rămas toleranță. Minciuna nu ar fi intrat în valori.'
        }
      ],
      tryThis: 'Pe scena din bibliotecă, notează faptele, imaginea (pornește cu Le văd) și fapta ta, legată cu pentru că. Arată unde stă respectul și unde stă toleranța.\n\nDin șirul iubire, respect și minciună, apoi prejudecată, toleranță și discriminare, apoi lenevire, egoism, notează valorile. Spune de ce restul nu intră aici.\n\nDă două momente ale tale în care ai arăta toleranță. Notează patru semne ale unui dialog tolerant. Închide cu data de 16 noiembrie.',
      keyPoints: [
        'Respectul se arată în vorbă sau în gest. Toleranța primește o părere diferită și nu rănește.',
        'Valori sunt iubirea, respectul și toleranța. În afara lor stau minciuna, prejudecata, discriminarea, lenevirea și egoismul.',
        '16 noiembrie este ziua internațională a toleranței. În scenă, locul de pe bancă arată respect.'
      ]
    }),
    lesson({
      id: 'recenzie',
      title: 'Cum scrii despre o carte fără să-i spui finalul',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei părți',
          text: 'Recenzia spune pe scurt despre o operă și adaugă părerea ta. Cele trei părți sunt introducerea, cuprinsul și încheierea. Deznodământul rămâne nespus.'
        }
      ],
      theory: [
        'Recenzia este un text nonliterar. În introducere pui autorul, titlul, genul, editura, numărul de file, structura și vârsta cititorilor.',
        'Genul poate fi fantezie. Poate fi și științifico-fantastic, polițist ori aventură. Mai intră misterul, istoria sau suspansul. În cuprins stau ideile principale și temele.',
        'Dacă ai citit altă carte a aceluiași autor, o poți pune alături. Arăți un punct tare și un punct slab. Spui plăcerea ta și emoția. Partea finală trage o concluzie: recomanzi sau nu.',
        'Scrierea are cinci etape. Întâi alegi cartea. Apoi faci ciorna, cu cele trei părți. La revizuire adaugi sau tai.',
        'Lași deoparte punctul culminant. Lași și deznodământul. Verifici logica. Scoți repetițiile, apoi pleonasmele și cacofoniile. Dacă e nevoie, refaci topica. Îndrepți ortografia.',
        'La editare, titlul stă centrat. Imaginile stau lângă text. Poți publica în revistă. Poți pune textul pe un site. Poți citi cuiva în față.',
        'Modelul scurt nu se lipește. Hallerbos, ca titlu de carte, nu este un roman. Modelul nostru numește un roman fără să-i spună sfârșitul.',
        'Cei trei muschetari, semnat de Alexandre Dumas, ține de aventură. Tema este prietenia. Ritmul întâmplărilor este punctul tare. Cum se termină nu se spune. O recomanzi cui caută o poveste de prietenie.',
        'Dacă nu ai datele tehnice, de pildă numărul de file al unei ediții, nu le născocești. Scrii că le iei din caseta de titlu a volumului tău.'
      ].join('\n\n'),
      example: [
        'Introducere: Alexandre Dumas, romanul Cei trei muschetari, genul aventură. Filele se citesc pe ediția ta. Nu se ghicesc.',
        'Cuprins: tema este prietenia. Ritmul este un punct tare. Finalul rămâne nespus. Încheiere: merită citită de cine caută loialitate. Etapele: pregătirea, ciorna, revizuirea, editarea, publicarea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă nu știi editura, scrii că o citești din caseta de titlu. Punctul slab poate fi un ritm prea grăbit, fără să spui cine câștigă la final. Recomandarea rămâne pentru cine caută prietenie și loialitate.'
        }
      ],
      tryThis: 'Compune recenzia unei cărți, de aventură ori de fantezie, citită de tine sau aflată acasă. Include introducerea, apoi cuprinsul, apoi încheierea.\n\nDacă nu cunoști editura ori numărul de file, scrie că le citești din caseta de titlu. Nu dezvălui deznodământul. Arată un punct tare. Arată și o emoție.\n\nDupă ciornă, notează verificarea unei repetiții și a unui semn de punctuație. Titlul recenziei stă singur pe un rând, cum cere editarea.',
      keyPoints: [
        'Recenzia dă cartea și părerea ta, împărțite în introducere, cuprins și încheiere.',
        'Trecerile sunt pregătirea, ciorna, revizuirea, editarea și publicarea. Finalul cărții nu se spune.',
        'Ce nu știi nu se născocește. Filele și editura se citesc din caseta de titlu.'
      ]
    }),
    lesson({
      id: 'verbul',
      title: 'Predicativ, auxiliar și copulativ',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei valori',
          text: 'Predicativul poate sta singur ca predicat. Auxiliarul doar sprijină un timp sau un mod. Copulativul leagă subiectul de numele predicativ.'
        }
      ],
      theory: [
        'Verbul, parte de vorbire flexibilă, numește o acțiune, o stare sau o existență. Predicativul poate sta singur ca predicat: Băiatul venea la prăvălie.',
        'Auxiliarul sprijină un mod sau un timp compus. La perfect compus și la condițional-optativ intră a avea: eu am citit. Separat: eu aș citi. La viitor intră a vrea: eu voi citi.',
        'La viitorul anterior și la perfectul de conjunctiv ori de condițional intră a fi. Formele: voi fi citit. Apoi să fi citit. Apoi aș fi citit. Copulativul stă în predicatul nominal. Model: Mara este tristă.',
        'A fi este predicativ dacă îl schimbi cu a exista, a se afla, a costa, a dura sau a se întâmpla. Sunt multe cărți în prăvălie. Zece lei a fost cartea.',
        'Enunțul Așa a fost dintotdeauna are sensul așa s-a întâmplat, deci predicativ. Auxiliar stă în Să fi ascultat. Și în ar fi reușit. Când înlocuirea nu merge, e copulativ: Mara este elevă.',
        'A deveni rămâne mereu copulativ. Model: Fratele meu a devenit medic. Tot copulative, când au sensul a deveni, sunt a ieși, a se face și a ajunge. Trei modele: s-a făcut fotbalist. Va ajunge inginer. A ieșit avocat.',
        'La plimbare, a ieșit rămâne predicativ: înseamnă a pleca, nu a deveni. Copulativ este a ieșit premiant. Copulativ, dacă are subiect, este a părea: Ea părea grijulie.',
        'Predicativ este pare că plouă, fiindcă nu leagă un nume predicativ. Copulativ este a rămâne când nu înseamnă a sta pe loc. Model: a rămas neschimbat.',
        'Copulativ este a însemna când nu înseamnă a nota. Model: Bunicii au însemnat totul pentru ea. Apoi, am ajuns în tabără: predicativ. Lăstarul s-a făcut un copăcel: copulativ.',
        'În enunțul În text sunt multe verbe, forma sunt înseamnă există, deci e predicativă. Uimit este adjectiv. Verbele din șirul de exercițiu sunt se aflau, dormiseră, strigă, aș citi, am, să salvez și pornesc.',
        'Locuțiunea verbală lucrează ca verb. Cu mod, este predicat verbal. A avea haz, adică a fi amuzant. A face rost, adică a obține. A da comenzi, adică a porunci.',
        'A-și da seama, adică a înțelege. A băga în seamă are sensul a lua în considerare. A se da de-a dura, adică a se rostogoli.'
      ].join('\n\n'),
      example: [
        'Băiatul venea: predicativ. În eu am citit stă auxiliarul a avea. Mara este elevă: copulativ.',
        'A ieșit premiant: copulativ. La plimbare, a ieșit: predicativ.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pare că plouă nu leagă un nume predicativ, deci a părea este predicativ. Ea părea grijulie leagă subiectul de o însușire, deci a părea este copulativ. A deveni nu schimbă valoarea: rămâne copulativ.'
        }
      ],
      practice: [
        '1) Din șirul coridorul, intens, se aflau, mărgele, dormiseră, cărțile, strigă, aș citi, uimit, am, să salvez, scrie numai verbele.',
        '2) Ce valoare are a fi în Să fi ascultat, în Mara este elevă și în Așa a fost dintotdeauna.',
        '3) Spune dacă predicatul este verbal sau nominal la: plimbare, bunicii, plouă, tabără, lăstar, multe verbe, premiant.',
        '4) Dă sinonimul pentru a avea haz, a face rost, a da comenzi, a-și da seama, a băga în seamă și a se da de-a dura.'
      ].join('\n\n'),
      answers: [
        'se aflau, dormiseră, strigă, aș citi, am, să salvez',
        'auxiliar; copulativ; predicativ, fiindcă înseamnă s-a întâmplat',
        'verbal; nominal; verbal; verbal; nominal; verbal, sunt înseamnă există; nominal',
        'a fi amuzant; a obține; a porunci; a înțelege; a lua în considerare; a se rostogoli'
      ],
      mistakes: 'A ieșit la plimbare înseamnă a pleca, deci predicativ. A ieșit premiant este copulativ. Uimit este adjectiv.',
      tryThis: 'Completează locuțiunile luat peste picior, ține minte, bătut capul și ținut de vorbă.',
      keyPoints: [
        'Predicativul poate sta singur ca predicat. Auxiliarul doar sprijină un timp sau un mod.',
        'Copulativul leagă subiectul de numele predicativ, iar a deveni rămâne așa.',
        'Plimbarea ține predicativul, premiantul ține copulativul.'
      ]
    }),
    lesson({
      id: 'moduri-timpuri',
      title: 'Indicativul și imperativul',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Două moduri',
          text: 'Indicativul arată o acțiune reală, la trecut, prezent și viitor. Imperativul are doar persoana a II-a.'
        }
      ],
      theory: [
        'Modul spune cum vede vorbitorul acțiunea. Lista cuprinde indicativul, imperativul, conjunctivul și condițional-optativul.',
        'La prezent, a picta dă pictez, pictezi, pictează, pictăm, pictați, pictează. La imperfect: pictam, pictai, picta, pictam, pictați, pictau.',
        'La perfect compus, cu auxiliarul a avea și cu participiul, stau formele am pictat, ai pictat, a pictat, am pictat, ați pictat, au pictat.',
        'La perfect simplu: pictai, pictași, pictă, pictarăm, pictarăți, pictară. La persoana a III-a, el este timpul povestirii. În vorbirea de azi se mai aude regional: Oltenia, apoi Banat, apoi Crișana.',
        'La mai-mult-ca-perfect: pictasem, pictaseși, pictase, pictaserăm, pictaserăți, pictaseră. La viitor standard: voi picta, vei picta, va picta, vom picta, veți picta, vor picta.',
        'La viitor de limbă vorbită: am să pictez ori o să pictez. La viitor popular: oi picta, or picta. La viitor anterior: voi fi pictat.',
        'Imperativul cere un ordin, un îndemn, un sfat ori o rugăminte. Are numai persoana a II-a. Forme afirmative: Pictează, Pictați. Forme negative: Nu picta, Nu pictați.',
        'La a face, afirmativ este Fă, negativ este Nu face. La a fi, afirmativ este Fii, negativ este Nu fi. La a se duce, negativ este Nu te duce.',
        'În Aștepta autobuzul și-l întâlni pe coleg, forma ține persoana a III-a, perfect simplu, fiindcă aștepta stă tot la persoana a III-a. Persoana I ar fi întâlnii.',
        'Negativul bun este Nu face gălăgie, nu Nu fă gălăgie. Mama îl privi mirată, nu privii, fiindcă mama stă la persoana a III-a. Corect rămâne Mi-ar plăcea să mănânc înghețată, nu Mi-ar place.',
        'Mai sunt corecte Nu te duce, Nu fi obraznic și Să știi. La a crea, persoana I este creez, nu crez.',
        'Mara a vorbit cu colega este indicativ, perfect compus. Ascult-o pe colegă este imperativ.'
      ].join('\n\n'),
      example: [
        'Am pictat este perfect compus. Pictă este perfect simplu. Voi fi pictat este viitor anterior.',
        'Nu face gălăgie este negativul corect. Nu fi obraznic la fel. Creez este persoana I de la a crea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'O să pictez este viitor de limbă vorbită. Oi picta este viitor popular. Ambele spun o acțiune viitoare, dar nu țin locul formei voi picta când ți se cere standardul.'
        }
      ],
      practice: [
        '1) Pentru a picta, la persoana a III-a singular, dă prezentul, imperfectul, perfectul compus și perfectul simplu.',
        '2) În ce zone se mai aude perfectul simplu, în vorbirea de azi?',
        '3) Alege varianta bună: întâlni sau întâlnii în Aștepta autobuzul și-l … pe coleg; Nu face sau Nu fă gălăgie; privi sau privii în Mama îl … mirată; Mi-ar plăcea sau Mi-ar place.',
        '4) Alege varianta bună: Nu te du sau Nu te duce; Nu fii sau Nu fi obraznic; Să știi sau Să ști; Crez sau Creez. Notează modul pentru Ascult-o pe colegă și pentru Mara a vorbit cu colega.'
      ].join('\n\n'),
      answers: [
        'pictează; picta; a pictat; pictă',
        'Oltenia, apoi Banat, apoi Crișana',
        'întâlni; Nu face; privi; Mi-ar plăcea',
        'Nu te duce; Nu fi; Să știi; Creez; imperativ; indicativ, perfect compus'
      ],
      mistakes: 'Nu fă și Nu fii nu sunt negativele corecte. Corect: Nu face și Nu fi. La a crea spui creez. Întâlnii este persoana I.',
      tryThis: 'Pune a picta la persoana a III-a: prezent, imperfect, perfect compus, perfect simplu.\n\nAdaugă imperativul negativ de la a face și de la a fi. Spune modul lui Mara a vorbit cu colega și al lui Ascult-o pe colegă.',
      keyPoints: [
        'Indicativul arată o acțiune reală, la trecut, prezent și viitor. Perfectul compus se sprijină pe a avea.',
        'Perfectul simplu povestește la persoana a III-a și se mai aude în Oltenia, Banat și Crișana.',
        'Imperativul are doar persoana a II-a. Corect: Nu face, Nu fi, Nu te duce. La a crea: creez.'
      ]
    })
  ]
};
