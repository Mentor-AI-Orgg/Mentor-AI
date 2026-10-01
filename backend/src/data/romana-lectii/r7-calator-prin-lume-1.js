'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f) {
  return romanaLesson(f);
}

module.exports = {
  lessons: [
    lesson({
      id: 'deschidere-calator',
      title: 'Harta unei călătorii',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Unsprezece coduri',
          text: 'Lista de lucru cuprinde 1.3, grupul 2.1 până la 2.4, apoi 3.1 cu 3.3, 4.2 cu 4.5, 5.1 și 5.2. Punctajul și fișa de observare stau în afara lecțiilor.'
        }
      ],
      theory: [
        'Unitatea se deschide cu o hartă. Pe ea stau textul epic, cele cinci momente ale subiectului și povestirea în ramă. Narațiunea nu rămâne singură: intră descrierea și intră dialogul.',
        'Vei ține un jurnal de drum. Vei asculta activ, adică vei putea relua ideea celuilalt. La scris vei urmări stilul și vei lega patru feluri de bucăți: narative, explicative, descriptive, dialogate.',
        'La gramatică revii la adverb, la felurile lui și la grade, apoi la interjecție și la cea predicativă. La interculturalitate alcătuiești cartea de vizită pentru țările din jurul României.',
        'Vasile Alecsandri a trăit din 1821 până în 1890. A fost poet și dramaturg, a cules folclor, a fost ministru și diplomat și a pus umărul la întemeierea Academiei Române. Balta-Albă e povestirea lui de drum prin Valahia.',
        'Mersul unității e acesta. Întâi cititul epic. Apoi jurnalul și ascultarea. După ele, stilul și secvențele. Gramatica urmează. Vecinii și ghidul închid drumul.',
        'Balta-Albă dă momentele pentru subiect. Don Quijote, tot epic, arată cum închipuirea se izbește de câmp. Jurnalul lui Bolintineanu aduce date adevărate, nu o lume născocită.',
        'La clasă, textul poate purta alt titlu. Pașii rămân: citești, marchezi momentele, scrii din fapte. Nu iei fraze gata făcute din operă.',
        'Competențele de numărat sunt unsprezece. Le spui cu codurile, nu cu o cifră rotundă goală. Grila de puncte nu înlocuiește nici lectura, nici exercițiul de gramatică.',
        'Codurile se învață pe grupe. Din zona 2 sunt patru, de la 2.1 până la 2.4. Lângă ele stau 1.3, perechea 3.1 și 3.3, perechea 4.2 și 4.5, apoi 5.1 cu 5.2. Fără listă, harta rămâne o promisiune.'
      ].join('\n\n'),
      example: [
        'Harta strânge epic, jurnal, ascultare, stil, adverb și interjecție. Codurile sunt unsprezece.',
        'Anii lui Alecsandri: 1821 și 1890. Balta-Albă ține de Valahia. Grila de puncte nu ține loc de lecție.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă azi desparți momentele unui drum, mâine poți muta aceleași popasuri într-un jurnal la persoana I. Adverbele de timp din jurnal se recunosc apoi la gramatică.'
        }
      ],
      tryThis: 'Scrie trei propoziții. Prima: tema e călătoria și lucrezi text epic. A doua: enumeri cele unsprezece coduri. A treia: dai anii lui Alecsandri și spui că grila nu e lecție.',
      keyPoints: [
        'Harta adună epic, jurnal, ascultare, stil, secvențe, adverb, interjecție și vecinii.',
        'Alecsandri, autorul din Balta-Albă, acoperă anii 1821-1890.',
        'Sunt unsprezece coduri. Grila de puncte rămâne în afara lecției.'
      ]
    }),
    lesson({
      id: 'balta-alba',
      title: 'O noapte de la Brăila până la baltă',
      kind: 'lectura',
      boxes: [
        {
          type: 'atentie',
          title: 'Fapte, nu proză',
          text: 'Reții autorul, locurile și momentele. Balta există. Noaptea zugravului e născocită. Nu relua frazele povestirii.'
        }
      ],
      theory: [
        'Balta-Albă e povestirea lui Vasile Alecsandri. Cadrul: Iași, seara, prieteni pe divanuri. Vorbește un zugrav francez, tânăr, la prima ieșire din țara lui.',
        'Nu știa, până atunci, de Moldova și de Valahia. Glumește că le-ar fi găsit el. I se răspunde, tot în glumă, că ar putea sfârși fript.',
        'La Brăila coboară înarmat, speriat de fiare și de hoți. Malul îl ignoră. Consulul francez îl primește. Acolo află de apa cu leac, găsită de curând, cu peste zece mii de oameni și cu vorbe de vindecare pentru orbi, surzi, ologi și bătrâni.',
        'Malposta lipsește. În locul trăsurii de poștă stă o ladă cu fân, roți stricate, cai slabi și un bărbos cu harapnic. Harapnicul e un bici mare, lung cât un stânjen. Se aruncă în ladă. Căruța pornește, el se rostogolește pe caldarâm. Râd consulul și ulița. Comicul vine din așteptare: voia poștă, a găsit o ladă.',
        'Noaptea aduce praf, hopuri și chiuit de surugiu. Către ora zece, o apă lată lucește la lună. Crezuse locul o stațiune, precum Marienbad, Ems sau Baden. Găsește bordeie cu stuf, cocostârci și cumpene înalte. Rămâne între spini, cam cu douăzeci de câini, fără graiul locului. Mirarea devine frică.',
        'Către opt îl scoală clopoței și bice. Iese cu pistoalele, crezând incendiu sau năvală. Vede cam treizeci de atelaje, de la brișcă până la caleașcă, cu patru, șase sau opt cai, spre apa din soare. Malul nu e târg și nu e bâlci: corturi, scânduri, bogatul lângă șatră. După 24 de ceasuri întreabă dacă Valahia e țară așezată sau ținut sălbatic și ce o separă de Moldova.',
        'Selamlâc: odaia bărbaților și a oaspeților, la turci. Antropofag: mănâncă carne omenească. Steeplechase: cai peste obstacole. Brișcă: trăsură ușoară, descoperită, două roți. Brașoveancă: căruță mare, cu coviltir.',
        'Caretă: închisă, patru roți. Șlic: căciulă mare, blană sau postav. Anteriu: haină lungă de boier. Lăicer: covor de lână, de la țară. Intrarea în poveste cere voie: vrea să fie ascultat.',
        'Pleacă pentru leac și pentru mulțime. Titlul numește locul luat drept oraș. Un oaspete din afară măsoară distanța de la vis la drum. Balta e reală, noaptea e ficțiune.',
        'La final întreabă, nu fuge. Ambele ținuturi țin de lumea românească, fiecare cu datinile ei. O noapte nu e toată țara. Curiozitatea, litera d, stă lângă cunoaștere. Pașii de lucru: ce e scris, ce observi, ce ai face, cu pentru că.'
      ].join('\n\n'),
      example: [
        'Scenă a noastră. La gară, Irina așteaptă perne și găsește fân. Cade când caii pornesc. Ce scrie: cade lângă roți. Ce vezi: o văd jos. Eu aș aștepta ziua, pentru că a căzut.',
        'Popasuri: Brăila, satul, malul. Durata: 24 de ceasuri. Către opt, cam treizeci de trăsuri. Litera d. Balta există. Noaptea e ficțiune.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Antropofag numește pe cine mănâncă carne omenească. Malposta e trăsura de poștă. Harapnicul e biciul mare. Lăicerul e covorul de lână. Tumba și lada sunt comice fiindcă așteptarea nu se potrivește cu locul.'
        }
      ],
      tryThis: 'Notează trei popasuri, durata și două scene comice, cu cauza. Spune că opera e ficțiune, iar balta e reală. Răspunde scurt despre Valahia și Moldova. Explică antropofag, apoi malpostă, harapnic, lăicer.',
      keyPoints: [
        'Cadrul e seara din Iași. Drumul ține 24 de ceasuri, de la Brăila până la baltă.',
        'Comicul iese din lada cu fân și din căderea pe caldarâm.',
        'Litera d ține de curiozitate. Balta e reală. Noaptea zugravului e ficțiune.'
      ]
    }),
    lesson({
      id: 'structura-epic',
      title: 'Cinci momente și o povestire în ramă',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Rama',
          text: 'Cinci momente: expozițiune, intrigă, desfășurare, punct culminant, deznodământ. Rama pune o narațiune în alta. Cadrul o naște pe cea dinăuntru.'
        }
      ],
      theory: [
        'Epicul se sprijină pe narațiune. Lângă ea stau descrierea și dialogul. Narațiunea pune faptele în ordine și are trei bucăți: starea de pornire, șirul întâmplărilor, starea de la capăt.',
        'Expozițiunea dă timpul, spațiul și personajele care deschid acțiunea. Intriga e cauza, momentul care pornește faptele. Desfășurarea e bucata cea mai lungă: ce se naște din intrigă, în ordine.',
        'Punctul culminant e tensiunea cea mai mare: o strâmtoare și efortul de a ieși din ea. Deznodământul închide acțiunea. Descrierea conturează cadrul și poate ține suspansul. Dialogul arată relații, gânduri, atitudini și dă mișcare.',
        'Povestirea în ramă se mai numește inserție. Planul-cadru și planul interior se țin unul de altul: întâiul îl cheamă pe al doilea.',
        'La Balta-Albă, cadrul e seara ieșeană, prieteni pe divanuri. Interiorul e drumul zugravului. Cine spune cadrul stă la persoana I, între prieteni. Cine spune drumul e tot la persoana I. Ambele narațiuni sunt subiective.',
        'Începutul: seara și mărturisirea că nu știa de cele două țări. Intriga: vestea de la consulat despre apa cu leac și hotărârea de a pleca îndată. Desfășurarea: căruța, tumba, noaptea, satul.',
        'Culmea: singur, noaptea, cam cu douăzeci de câini, și nu cunoaște graiul. Rezolvarea: dimineața, în loc de pustiu, cam treizeci de trăsuri și mulțimea de la apă. La capătul celor 24 de ceasuri se întreabă dacă Valahia e civilizată sau sălbatică.',
        'Zugravul: curios, sperios, apoi uimit. Consulul: vesel, practic. Postașul mână dur și dispare. Prietenii ascultă. Trăsăturile ies din fapte, deci caracterizarea e indirectă, și din vorbele altora.',
        'Scenă a noastră. Sâmbătă, la cină, unchiul istorisește amiaza din gară: harta îi căzuse, apoi a dat de ea în buzunar. Cina e cadrul. Gara e înăuntru. Pierderea e intriga. Găsirea e deznodământul.'
      ].join('\n\n'),
      example: [
        'Seara din Iași e cadrul. Drumul zugravului e povestea dinăuntru. Vestea despre baltă e intriga. Noaptea cu câinii e culmea. Întrebarea de după o zi și o noapte e încheierea.',
        'La unchi, cina e cadrul, gara e interiorul, harta pierdută e intriga, găsirea închide scena.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă la masă cineva spune că ieri, în tren, a rătăcit biletul și l-a găsit în buzunar, masa e cadrul, trenul e înăuntru, rătăcirea e intriga, găsirea e deznodământul.'
        }
      ],
      tryThis: 'Așază, pentru Balta-Albă, cele cinci momente în cinci propoziții, doar cu fapte de aici. Precizează cine spune cadrul și cine spune drumul. La unchi, numește cadrul, interiorul, intriga și deznodământul.',
      keyPoints: [
        'Subiectul trece prin expozițiune, intrigă, desfășurare, culme și deznodământ.',
        'Rama bagă un drum în altă întâmplare. La Iași, seara naște călătoria.',
        'Culmea din Balta-Albă: noaptea singur, între câini, fără limba locului.'
      ]
    }),
    lesson({
      id: 'comprehensiune',
      title: 'Trei feluri de text, aceiași pași',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Aceiași pași',
          text: 'Trei pași: ce e scris, ce observi, ce ai face tu. Observația începe cu O văd. Aceiași pași la epic, la liric și la dramatic.'
        }
      ],
      theory: [
        'Comprehensiunea înseamnă înțelegere. Textul literar e o creație, în versuri sau în proză: un univers închipuit, idei spuse cu un limbaj expresiv. Lucrează trei factori: textul, cititorul, contextul.',
        'Etapele: prelectura, lectura, postlectura. Cer informația din mesaj, o deducție despre spațiu, timp, cauză și soluție, apoi interpretarea, judecata critică și reflecția.',
        'Trei texte de călătorie, fără copiere. Epicul vine din cartea lui Lewis Carroll. Titlul: Alice în Țara Minunilor. Momentul: Alice cade în vizuina iepurelui. Aleargă după el, intră și alunecă pe o fântână adâncă.',
        'Pe drumul căderii zărește rafturi, cărți, hărți, tablouri. Borcanul poartă inscripția dulceață de portocale, însă e gol. Nu îl lasă să cadă: mai jos ar putea nimeri pe cineva. Narator la persoana a III-a. Personaje: Alice și iepurașul.',
        'Alice e curioasă: intră înainte să întrebe cum iese. Iepurașul fuge și dispare. Ideea: curiozitatea o trage înăuntru înainte de plan. Intriga e fuga. Desfășurarea e căderea. La țanc înseamnă la timp. Fleac: lucru mărunt. Nimica toată: ceva foarte ușor.',
        'Liric: Balada călătorului, de George Topîrceanu. Versurile nu se copiază. Tema: mers nocturn prin zăpadă, apoi o casă unde sunt lumini. În Moldova, ogeac poate numi hornul. Rima fragmentului e împerecheată: versurile se potrivesc două câte două.',
        'Silabele se numără pe rândul deschis. Primul model are 8: Drumul alb se-adună-n seară. Al doilea, tot 8: Casa ține-o lampă caldă. Epitet: drumul alb. Comparație: noaptea ca o mantie. Personificare: fereastra așteaptă.',
        'Piesa se cheamă Cucoana Chirița în balon. Autor: Vasile Alecsandri. Anul indicației: 1874. Locul: în dosul Mitropoliei, pe piața baloanelor. Numele balonului: Ciubăr-Vodă. Cabina agățată se cheamă naselă, sau nacelă.',
        'Dramaticul se cunoaște din trei semne: numele pus înaintea replicii, paranteza cu didascalii, schimbul de replici. Paranteza dă locul, gestul și tonul. E nota autorului. Râsul se naște din contrast: personajul se miră de un lucru banal de bâlci, balonul și strigătul cu alune.',
        'Corectări, pe rând. Șeapte se scrie șapte. Pintre se îndreaptă în printre. Primblă se îndreaptă în plimbă. Anonțuri se scrie anunțuri. Construcția a să se urce se scrie are să se urce. Scăpat din tufe: om de la sat, necunoscut cu orașul. Cu gura căscată: privește uimit. I-a fost scris: așa i-a fost sortit.',
        'Para: monedă măruntă, a suta parte a leului vechi. Lornieta: ochelari prinși de un mâner. Tema comună e călătoria: epicul istorisește o cădere, liricul dă emoția, dramaticul se joacă cu replici.',
        'Scena de lucru: la amiază, Mara vede o casă cu lampă și cere oprirea.'
      ].join('\n\n'),
      example: [
        'Ce scrie: Mara vede casa și cere oprirea. Ce vezi: o văd oprită, casa îi stă înainte. Eu aș ciocăni, pentru că e seară și lumina arde.',
        'Alice păstrează borcanul gol. Rima baladei e împerecheată. Șeapte se scrie șapte. Balonul din 1874 se numește Ciubăr-Vodă.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Drumul alb e epitet. Noaptea ca o mantie e comparație. Fereastra așteaptă e personificare. Silabele din primul rând: dru-mul, alb, se-a-du-nă-n, sea-ră, opt la număr.'
        }
      ],
      tryThis: 'Pe scena Marei, scrie cei trei pași. Ce vezi începe cu O văd. Pentru Alice, dă persoana, personajele și de ce păstrează borcanul. Spune rima baladei și formele corecte șapte, printre, anunțuri.',
      keyPoints: [
        'Înțelegerea trece prin prelectură, lectură și postlectură, cu text, cititor și context.',
        'Alice nu aruncă borcanul gol. Balada are rimă împerecheată. Modelul are 8 silabe.',
        'În piesa din 1874, balonul e Ciubăr-Vodă. Paranteza e indicația autorului. Șeapte se scrie șapte.'
      ]
    }),
    lesson({
      id: 'jurnal-calatorie',
      title: 'Fapte adevărate, la persoana I',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Jurnal de drum',
          text: 'Text de drum, nonliterar. Persoana e I. Locurile și faptele sunt reale. Descrierea e obiectivă. Emoția îl face operă, ca la Hogaș și la Vlahuță.'
        }
      ],
      theory: [
        'Jurnalul de călătorie aduce date adevărate și exacte, care îl privesc pe autor. Lângă narațiune stă descrierea obiectivă. Forma e personală. Tema e drumul.',
        'Sunt autori care au așezat în jurnal și cugetul trezit de cele văzute, și au făcut literatură. Lecția îi amintește pe Calistrat Hogaș și pe Alexandru Vlahuță. Fără emoția asta, textul rămâne nonliterar.',
        'Judecă așa. Locurile și faptele sunt adevărate: da. Participanții ar fi închipuiți: nu, fiindcă jurnalul vorbește despre oameni reali. Stau narațiunea și descrierea obiectivă: da. Ar fi la persoana a III-a: nu, stă la I. Ar intra în literar de la început: nu.',
        'Imaginea potrivită e harta, fiindcă fixează locuri reale. O poză poate însoți un loc. Un grafic nu e prima alegere, nici o diagramă: jurnalul nu ține un tabel.',
        'Fapte din Călătorii, de Dimitrie Bolintineanu. La 15 noiembrie ajunge la Orșova, numită și Rușava. Orașul stă lângă Cerna, pe Dunăre, lângă granița de atunci dintre Valahia și Austria.',
        'Chiar acolo strânge mâna lui Vasile Alecsandri. Se despart. Unul se întoarce acasă. Celălalt rămâne dincolo: porțile patriei stăteau închise exilaților, din motive politice. Proscris înseamnă alungat, fără apărarea legii, dus în exil.',
        'Vaporul spre Turcia așteaptă la Cladova, sat sârbesc, pe Dunăre, în jos de cataracte. Cataracta: cădere de apă pe pantă abruptă, mai multe trepte mici. Barca, largă și netedă, se cheamă și șeață. Îi duce mai departe. Apele stau jos, deci vasele mari nu răzbesc.',
        'Lasă în stânga gura Cernei. Timp: 15 noiembrie, seara, umbre pe stânci. Spațiu: Orșova, Cerna, Dunărea, Cladova. Persoana e I, fiindcă autorul își spune drumul. Repere: Cerna, Dunărea, Cladova.',
        'Emoții legate de fapte. Despărțirea de Alecsandri se leagă de nostalgie. Valurile care bat stâncile pot ține de teamă. O vorbă despre cât de dulce e locul poate ține de bucurie. Alegi emoția și o prinzi de fapt. Dacă îl iei tovarăș pe Columb, spui că pagina e închipuită și ții persoana I.'
      ].join('\n\n'),
      example: [
        'Jurnalul e nonliterar, la persoana I, cu fapte reale. Enunțul că ar sta la persoana a III-a e fals. Harta e imaginea potrivită.',
        'Data: 15 noiembrie. Loc: Orșova, lângă Cerna. Se desparte de Alecsandri. La Cladova așteaptă vaporul. Barca înlocuiește vasul mare, apele fiind joase.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Nostalgia se leagă de despărțirea de Alecsandri, nu de orice mal. Teama se poate lega de valurile lovite de stânci. Fără fapt, nu pui emoția.'
        }
      ],
      tryThis: 'Marchează adevărat sau fals cele cinci enunțuri despre jurnal. Scrie data și trei repere. Spune de ce iau barca. Nostalgia o legi de despărțirea de Alecsandri. Schițează un jurnal la persoana I, cu dată și două locuri.',
      keyPoints: [
        'Jurnalul de drum e nonliterar, la persoana I, cu locuri reale și descriere obiectivă.',
        'La 15 noiembrie, Bolintineanu e la Orșova și trece spre Cladova cu barca, apele fiind scăzute.',
        'Hogaș și Vlahuță au făcut operă din jurnal abia când au pus emoția în el.'
      ]
    }),
    lesson({
      id: 'don-quijote',
      title: 'Mori de vânt, nu uriași',
      kind: 'lectura',
      boxes: [
        {
          type: 'atentie',
          title: 'Litera d',
          text: 'Lupta reală e cu mori de vânt. Litera d. Litera c e doar credința lui, nu lucrul din câmp. Romanul nu se copiază.'
        }
      ],
      theory: [
        'Don Quijote de La Mancha e romanul lui Miguel de Cervantes. Fără frazele cărții, faptele sunt acestea. Câmpia numără treizeci, poate patruzeci, de mori de vânt. El îi spune scutierului Sancho Panza că vede uriași și că vrea să se bată.',
        'Sancho îl contrazice: sunt mori. Brațele sunt, de fapt, aripile care rotesc piatra. Don Quijote nu ascultă. Calul: Rosinante. Lancea nimerește aripa din față. Vântul răsucește aripa, rupe lancea și îi trântește pe amândoi jos.',
        'Sancho sosește cu măgarul și dă peste el amețit. Don Quijote îl învinuiește pe vrăjitorul Frestón: i-ar fi schimbat uriașii în mori, ca gloria să nu-i rămână. Apoi pleacă spre Puerto Lápice, trecătoare în La Mancha, între Madrid și Sevilla. Acolo așteaptă alte peripeții.',
        'Lupta reală e cu mori. Se bifează d, nu c. El e îndărătnic și curajos doar în închipuire. Sancho e prevăzător, spune adevărul, rămâne credincios. Sunt stăpân și scutier. Sancho avertizează, apoi îl scoală.',
        'Naratorul nu zice eu. Stă la persoana a III-a și povestește faptele amândurora. Atacul e narațiune. Părerile stau în dialog. Morile și câmpia stau în descriere. Râdem fiindcă lovește un lucru care nu e dușman și fiindcă se prăbușește.',
        'Nu renunță la uriași: dă vina pe vrăjitor, nu pe sine. Zicala cu morile de vânt numește o bătaie inutilă, dusă contra unui potrivnic care trăiește doar în minte. Tensiunea e în atac, născută din credință și din vânt.',
        'Sancho a făcut bine când l-a oprit. Pentru Don Quijote, drumul caută aventură și glorie. La următorul loc vrea întâmplări, nu odihnă. În fragment nu l-a ascultat. Mai târziu, nu știm.',
        'În mit, Briareu poartă o sută de brațe. Capetele sunt cincizeci. Furchet: cârlig de fier, prinde lancea la atac. Dulcineea e doamna strigată în ajutor, înainte de lovitură. Numele se rețin. Replicile rămân în roman. Jurnalul scris ca Sancho e al tău: dată, câmpie, mori, căzătură.'
      ].join('\n\n'),
      example: [
        'Atacul cade pe mori de vânt. Se bifează d. Sancho spune că aripile nu sunt brațe. Rosinante e calul. Naratorul e la persoana a III-a.',
        'Frestón e vrăjitorul învinuit. Puerto Lápice e trecătoarea. Expresia înseamnă luptă cu un dușman care există doar în minte.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă cineva lovește o umbră crezând că e hoț, iar umbra e un copac, lupta e tot cu un dușman închipuit. Sancho ar fi cel care spune că e copac, înainte de lovitură.'
        }
      ],
      tryThis: 'Spune cu cine se luptă și de ce se bifează d, nu c. Dă câte o trăsătură și relația. Arată o secvență narativă, una dialogată, una descriptivă. Explică expresia și ce așteaptă la Puerto Lápice.',
      keyPoints: [
        'În romanul lui Cervantes, atacul cade pe mori de vânt, nu pe uriași. Se bifează d.',
        'Sancho avertizează, apoi îl ridică. Naratorul stă la persoana a III-a.',
        'Expresia înseamnă luptă fără folos, cu un dușman care există doar în minte.'
      ]
    }),
    lesson({
      id: 'ascultare',
      title: 'Auzi și spui ce a spus celălalt',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Proba',
          text: 'Ascultătorul activ e prezent, nu judecă, nu taie vorba, spune ce a auzit și rezumă. Dacă ai întrerupt, nu ai fost activ, chiar cu câteva cuvinte prinse.'
        }
      ],
      theory: [
        'A asculta activ înseamnă că prinzi mesajul interlocutorului și îl poți da înapoi. Statul lângă el nu ajunge. Dai și un răspuns, un feedback.',
        'Ce face. E de față. Nu judecă în timp ce ascultă. Se uită la gest, la mimică, la postură. Nu întrerupe. Așteaptă capătul și abia apoi vorbește. Parafrazează: reia cu vorbele lui ce a auzit.',
        'Pune întrebări ca să lămurească. Strânge ideile. Empatizează. Aprobă pe drum, cu da sau cu înțeleg. Rămâi pe ideea lui, nu doar pe a ta.',
        'Întreruperea arată că n-ai fost atent. Proba: partenerul poate rosti trei fapte auzite, fără completări născocite. Dacă nu le poate rosti, n-a fost ascultare activă.',
        'Date din Robinson Crusoe, de Daniel Defoe. Anul nașterii: 1632. Orașul: York. Tatăl nu era de acolo. Nașterea lui: Bremen. S-a așezat la Hull, negoțul i-a adus avere, apoi a venit la York și s-a însurat.',
        'Neamul mamei se numea Robinson și era cunoscut în regiune. De aceea fiul poartă numele acesta. Numele întreg, Kreutznaer, a devenit în Anglia Crusoe, cum se schimbă adesea numele străine.',
        'A avut doi frați mai mari. E mezinul, al treilea copil. Nicio meserie nu-i fusese dată prin școală. Tatăl voia dreptul, un om de legi. Fiul nu visa decât marea.',
        'Meseria aleasă de tată e dreptul, nu marea. Dorința lui Robinson e marea. Datele se spun după ce ai ascultat. Nu le completezi din închipuire.'
      ].join('\n\n'),
      example: [
        'Activul nu taie vorba, parafrazează și rezumă. Întreruperea arată neatenție.',
        'Robinson: 1632, York. Tatăl: Bremen. Crusoe vine din Kreutznaer. Tatăl voia dreptul. Fiul voia marea. Doi frați mai mari, el al treilea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă partenerul spune că a mers la Brașov cu trenul, rezumatul păstrează Brașovul și trenul. Dacă adaugi ploaie pe care n-ai auzit-o, nu mai e ascultare activă.'
        }
      ],
      tryThis: 'Spune cinci lucruri ale ascultătorului activ și semnul de neatenție: întreruperea. Răspunde: orașul tatălui, anul și orașul lui Robinson, de ce poartă numele Robinson, ce voia tatăl, ce voia fiul, câți frați mai mari.',
      keyPoints: [
        'Proba e să poți spune ideea lui cu vorbele tale, nu pe a ta.',
        'Nu tai vorba. Reiei și strângi ideile. Gestul se observă, judecata așteaptă.',
        'Robinson, născut în 1632 la York, voia marea. Tatăl, din Bremen, voia dreptul.'
      ]
    })
  ]
};
