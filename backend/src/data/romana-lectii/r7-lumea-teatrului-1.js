'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f) {
  return romanaLesson(f);
}

module.exports = {
  lessons: [
    lesson({
      id: 'deschidere-teatru',
      title: 'Harta măștilor și a chipurilor',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Harta unității',
          text: 'Harta anunță teatrul, vorbirea, pronumele și întâlnirea dintre culturi. Grila cu puncte măsoară, nu predă.'
        }
      ],
      theory: [
        'Unitatea se deschide printr-o hartă. De acolo citești teatru și înveți să desparți actul de scenă, replica de nota de regie, pe scriitor de cel care joacă.',
        'Mai departe urmărești cum un text ajunge seară de spectacol. Înveți și cum se alcătuiește un interviu, apoi o cronică despre reprezentație.',
        'La oral ții emoția în frâu când stai dinaintea sălii și recunoști un schimb de replici. La gramatică, pronumele se reia: pornești de la personal și te oprești la numeral.',
        'La interculturalitate spui ce înseamnă un contact cultural. Este un obicei sau un meșteșug mutat de la un popor către altul.',
        'De ținut minte sunt douăsprezece competențe. Le așezi pe grupuri: 1.1, separat 1.3, apoi 1.4. Urmează 2.1 cu 2.2 și, alături, 2.3. Mai departe 3.1 și 3.2. La urmă 4.1, apoi 4.5, plus 5.1 și, la final, 5.2.',
        'Mihail Sebastian a compus piesa Steaua fără nume. Viața lui se întinde între 1907 și 1945. Tiradele nu se lipesc. Rămân autorul, titlul și anii.',
        'Feeria Sânziana și Pepelea îi aparține lui Vasile Alecsandri. Aduce pe scenă o lume de basm. Și aici păstrezi faptele, nu replicile lungi.',
        'Nici grila cu puncte, nici fișa pe care se observă nu țin loc de lecție. Dacă pe bancă titlul piesei e altul, metoda de lucru nu se schimbă.',
        'Harta doar rânduiește drumul: text de teatru, dialog, spectacol, interviu, emoția din sală, cronică, pronume, numeral și contact între culturi. Ea nu înlocuiește exercițiul.',
        'Cine desparte nota de regie de replică știe cine are voce în text. Cine desparte jucătorul de scriitor știe cine urcă pe scenă și cine a compus piesa.'
      ].join('\n\n'),
      example: 'Pe hartă stau textul de teatru, reprezentația, interviul, cronica, pronumele și contactul dintre culturi. Competențele sunt douăsprezece. Steaua fără nume e piesa lui Sebastian. Sânziana și Pepelea e feeria lui Alecsandri.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Schimbi titlul de pe bancă și tot desparți actul de scenă, scriitorul de actor. Anii lui Sebastian rămân 1907 și 1945. Grila nu se învață ca text.'
        }
      ],
      tryThis: 'Fă trei propoziții. Prima: tema e teatrul și azi lucrezi textul dramatic. A doua: sunt douăsprezece competențe; le scrii pe grupuri și închei cu 5.1, apoi cu 5.2.\n\nA treia: Mihail Sebastian a trăit din 1907 până în 1945, iar grila de puncte nu e lecție.',
      keyPoints: [
        'Harta strânge teatrul, oralul, pronumele și contactul cultural. Competențele sunt douăsprezece.',
        'Sebastian, 1907–1945, a scris Steaua fără nume. Alecsandri a scris feeria Sânziana și Pepelea.',
        'Grila și fișa de observare nu predau. Metoda rămâne chiar dacă titlul de pe bancă se schimbă.'
      ]
    }),

    lesson({
      id: 'text-dramatic',
      title: 'Acte, scene și indicații',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Două scrieri',
          text: 'Actul se marchează roman, scena arab. Replica e a personajului. Didascalia e a autorului.'
        }
      ],
      theory: [
        'Textul de teatru se scrie ca să fie jucat. Odată spectacol, nici timpul, nici spațiul nu mai sunt fără margini.',
        'Spațiul are două fețe. Una e scena, locul jocului. Cealaltă e lumea născocită de autor, spațiul ficțiunii.',
        'Și timpul are două fețe: cât ține seara în sală și clipa povestită în piesa scrisă. Nu le amesteci.',
        'Tăietura se face în acte și în scene. Actul adună mai multe scene și primește cifră romană. Scena, o felie din act, primește cifră arabă.',
        'O scenă se închide când cineva intră, când cineva iese sau când decorul se schimbă.',
        'Scrisul e dublu. Replicile personajelor alcătuiesc dialogul. Notele autorului se numesc didascalii, adică indicații scenice.',
        'Ele îi călăuzesc pe actori și îi arată cititorului imaginea. În afara replicii stau titlul, distribuția, decorul, timpul, spațiul și așezarea: didascalii externe.',
        'Între paranteze rotunde, lângă nume sau în interiorul replicii, stau cele interne. Ele arată intrarea, ieșirea, mersul, tonul, mimica, gestul, atitudinea, simțirea.',
        'Scena de lucru înlocuiește piesa. Actul I: noapte, gara unui târg mic. În distribuție intră șeful gării, profesorul Marin, o doamnă și domnișoara Lina.',
        'Scena 1 lasă pe peron doar șeful și profesorul. Sub braț, el ține un volum despre stele. Scena 2 pornește odată cu coborârea doamnei din tren. Femeia nu își dă numele.',
        'Profesorul îi oferă adăpost până în zori și biletul abia după leafă. Lina intră amenințătoare: volumul scump i se pare o nebunie, iar școala, zice ea, trebuie anunțată.',
        'Fragmentul are un singur act și două scene. Noaptea și gara, puse în afara replicii, sunt didascalii externe. Cuvântul amenințătoare, în paranteze, e didascalie internă: arată atitudinea.',
        'Profesorul și doamna se leagă prin simpatie, fiindcă el o găzduiește. Lina și profesorul sunt în conflict, nu în nepăsare. Steaua fără nume se citește pe roluri, căci numele stă înaintea replicii.',
        'Durata serii o afli doar din sală, nu din imaginație. Pală numește o sabie lată și scurtă. Aht numește oftatul.',
        'În feeria lui Alecsandri, actul I stă pe o câmpie pârjolită de soare. În fund e pădure. Căsuța dintre copaci fără frunze e în stânga. Lacul e în dreapta.',
        'Pepelea, flăcău sărac și orfan, sosește din Țara Românească. Sânziana poartă supărare: a fost luată de la părinți și ținută departe de lume.',
        'Zmeul socotește supărarea jucată și plănuiește închiderea fetei în turn. Din scenă se vede o iubire fără răspuns.'
      ].join('\n\n'),
      example: 'Fragmentul de gară are un act și două scene. Gara nopții e didascalie externă. Amenințătoare e didascalie internă. Roman pentru act, arab pentru scenă. Zmeul crede că Sânziana joacă supărarea. Închiderea e în turn. Sensuri: pală numește sabia, iar aht numește oftatul.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Didascalie externă nouă: dimineața, în clasă, lângă o hartă a cerului. Internă: în șoaptă. Ambele sunt ale autorului. Replica rămâne a celui care arată steaua.'
        }
      ],
      tryThis: 'La gară, numără actele și scenele. Explică de ce a doua scenă pornește la coborârea doamnei. Dă o didascalie externă, una internă și spune că ambele sunt ale autorului.\n\nSpune legătura profesor–doamnă și legătura Lina–profesor. Pentru feerie, scrie locul, personajele, supărarea Sânzienei, părerea Zmeului și turnul. Adaugă sensul lui pală și al lui aht.',
      keyPoints: [
        'Textul de teatru se joacă. Actul ia cifră romană, scena cifră arabă. Didascalia e a autorului.',
        'Externe sunt decorul și lista. Interne, în paranteze, sunt gestul și atitudinea.',
        'În feerie, Zmeul vrea închiderea Sânzienei în turn și crede că supărarea ei e prefăcută.'
      ]
    }),

    lesson({
      id: 'dialog-dramatic',
      title: 'Autorul scrie, actorul joacă',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei persoane',
          text: 'Dramaturgul compune piesa. Personajul e închipuit. Actorul, om real, duce emoția pe scenă.'
        }
      ],
      theory: [
        'În piesa de teatru, dialogul e felul de expunere cel mai des întâlnit. Este schimbul de replici dintre personaje.',
        'Prin el afli întâmplarea și vezi cum e omul. Actorii îl rostesc, dar vorbele rămân ale personajelor. Și spectatorul, și cititorul primesc vestea tot de aici.',
        'Pe hârtie, dialogul se recunoaște după liniuță sau după semnele de citare. În piesă, fiecare intervenție e o replică și poartă înainte numele celui care vorbește.',
        'Sunt patru tipuri: întrebare cu răspuns, replică urmată de completare, replică urmată de continuare, replică urmată de confirmare.',
        'Monologul dramatic e o vorbire lungă a unui singur personaj. Poate avea sau nu martori. Nu așteaptă replică și nu schimbă destinatarul pe parcurs.',
        'Autorul, numit și dramaturg, e omul real care născocește acțiunea, vorbele și indicațiile de joc. Personajul dramatic e făcut de el.',
        'Actorul, tot om real, dă glas personajului și mută emoțiile pe scenă. Lista de la început îi rânduiește după greutate sau după statut, cu o prezentare scurtă.',
        'Scriitorul intră în text doar prin didascalii. Conflictul dramatic e neînțelegerea dintre două idei sau două atitudini, ori o neliniște pentru care se caută o ieșire.',
        'În gară, Lina vrea ca școala să afle de volumul scump. Profesorul răspunde că nebunia e a lui și că nu dă socoteală. Ea cere control. El cere libertatea lecturii. De aici pornește conflictul.',
        'Vorba Linei și caracterizează, și aduce o veste. Dacă o lungești fără răspuns, se face monolog. Profesorul e figura principală a scenei: el hotărăște găzduirea și apără cartea.',
        'Fișa Linei: învățătoare, severă, vine noaptea să certe. Fișa profesorului: iubește stelele, e sărac, e darnic cu oaspetele.',
        'Steaua din piesa lui Sebastian încă n-are nume. El vrea două silabe, ca să o așeze lângă Alcor. Vega e modelul de două silabe pe care îl amintește. Poți propune alt nume.',
        'Versurile nu se lipesc. Asemănarea, cu vorbele tale: și în feerie, și în gara de noapte, o fată tânără respinge soarta hotărâtă de altcineva.',
        'Deosebirea: una se petrece în basm, cu zmeu și cu turn. Cealaltă ține o singură noapte, într-o haltă de provincie.'
      ].join('\n\n'),
      example: 'Numele stă înaintea replicii. Monologul nu așteaptă răspuns. Scriitorul compune, actorul joacă. Cearta Linei cu profesorul pornește de la prețul cărții. Steaua cere două silabe. Vega e modelul. Profesorul e figura principală.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Întrebare: Cât a costat volumul? Răspuns: Prea mult pentru leafă. Completare: Și totuși îl țin. Dacă Lina continuă singură, fără replică, bucata devine monolog.'
        }
      ],
      tryThis: 'Alege două feluri de replici. Pentru fiecare, inventează o vorbă scurtă din gară. Arată ce face vorba prin care Lina vrea școala anunțată. Lungește-o tu în patru rânduri, fără răspuns.\n\nSpune legătura dintre personaj și actor. Argumentează conflictul. Scrie două fișe, cu meseria, două trăsături și o vorbă de recunoaștere, numai din faptele de aici. Propune două silabe pentru stea, lângă Alcor.',
      keyPoints: [
        'Dialogul e schimb de replici și rămâne al personajelor. Monologul e lung și nu așteaptă răspuns.',
        'Dramaturgul creează. Actorul joacă. Conflictul e neînțelegerea dintre atitudini.',
        'Steaua are nevoie de două silabe, ca Vega, ca să stea lângă Alcor.'
      ]
    }),

    lesson({
      id: 'spectacol',
      title: 'De la text la reprezentație',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Lanțul',
          text: 'Scriitorul dă textul. Regizorul face seara. Actorul întrupează personajul. Cititorul ajunge spectator.'
        }
      ],
      theory: [
        'Artele spectacolului își arată opera pe scenă, într-un răstimp mărginit: teatru, balet, operă, operetă. Artiștii lucrează cu vocea, cu corpul ori cu obiecte.',
        'Teatrul se vede în reprezentație, iar la ea muncesc mai mulți. Dramaturgul scrie. Regizorul conduce montarea.',
        'El face scenariul, își alege distribuția, o călăuzește la repetiții și dă aviz pe decor și pe costume. Actorul joacă rolul și rămâne omul din mijlocul scenei.',
        'Scenograful, călăuzit de regizor, desenează decorul și costumele. Coregraful conduce mișcarea. Costumierul coase. Machiorul pregătește fața.',
        'Un tehnician ține luminile. Altul ține sunetul. Publicul închide șirul. Fără oameni în sală, seara rămâne fără destinatar.',
        'Legătura e simplă. Autorul predă textul. Regizorul îl preface în spectacol. Actorul dă trup personajului. Cel care a citit ajunge privitor în sală.',
        'Conflictul lăuntric îl face pe cel din sală să țină partea cuiva și să aștepte o dezlegare.',
        'Teatrul la radio mută piesa din sală în unde. Rămân vorbele, muzica și efectele. Ascultătorul își închipuie chipurile și decorul. Ținta e urechea, nu ochiul.',
        'Un amănunt citit de un personaj, într-o înregistrare, se notează abia după ascultare. Nu se născocește.',
        'Proiectul clasei: montați o scenă scurtă, scrisă de voi, cu roluri pentru toată echipa, un decor, un afiș și o prezentare la școală.',
        'Afișul poartă titlul, distribuția și locul. Nu se copiază o bucată dintr-o piesă gata făcută. Scena voastră e a voastră.',
        'Fără public, lanțul rămâne deschis. De aceea afișul spune și unde vine sala, nu doar cine joacă.'
      ].join('\n\n'),
      example: 'Omul din mijlocul scenei e actorul. Regizorul alege distribuția și avizează decorul. Scenograful desenează. La radio rămân vocea, muzica și efectele. Privitorul din sală corespunde cititorului. Conflictul lăuntric ține atenția până la dezlegare.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Afiș scurt: Steaua de pe peron. Roluri: profesor, doamnă, șef de gară. Loc: sala de clasă. Decor: o bancă și un felinar. Indicații proprii: stinge felinarul; șoapte pe peron.'
        }
      ],
      tryThis: 'Spune pentru ce se scrie textul dramatic și cum ajunge spectacol. Numește oamenii care lucrează și de ce actorul e cel mai văzut pe scenă.\n\nCompletează șirul: autor, text, regizor, spectacol, personaj, actor, cititor, spectator. Dă două deosebiri între seara văzută și teatrul la radio. Schițează un afiș de cinci minute: titlu, trei roluri, un decor.',
      keyPoints: [
        'Din text, regizorul, actorii și tehnicienii fac seara. Actorul stă în centrul scenei.',
        'La radio rămân dialogul, muzica și efectele. Ascultătorul imaginează chipul și decorul.',
        'Ce nu ai văzut și nu ai auzit nu se născocește. Afișul poartă titlu, distribuție și loc.'
      ]
    }),

    lesson({
      id: 'interviu',
      title: 'Întrebări deschise, răspunsuri de meșteșug',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Interviu',
          text: 'Text nonliterar, de presă, făcut să informeze: reporterul întreabă, invitatul răspunde, pe o temă de interes.'
        }
      ],
      theory: [
        'Interviul e un dialog, scris sau rostit. Întrebarea deschisă cere o părere. Cea închisă cere doar da sau nu.',
        'Pașii, în ordine: alegi tema și omul, te documentezi, pui întrebările pe hârtie, stai de vorbă, redactezi. La urmă confrunți notițele cu vorbitorul.',
        'Întâia întrebare îl înfățișează pe musafir și deschide relația. Scopul e informarea. Rolurile nu se schimbă: unul întreabă, celălalt răspunde.',
        'În discuția aceasta stau reportera și Mircea Anghel. La 30 aprilie 2022 el avea 32 de ani. A absolvit regia la UNATC București.',
        'A vrut actorie. Timp de opt ani a susținut proba și nu a intrat. Abia apoi a trecut la regie, fiindcă regizorul orientează seara, chiar când alături lucrează un scenograf.',
        'Pentru el, teatrul îi apropie pe oameni, meseriași și spectatori. Montarea de la care a plecat e Steaua fără nume, de Mihail Sebastian.',
        'Despre stea, fără formula lui: ea rămâne pe traiectoria ei. Peste zece ani nu vede teatrul ca pe un film privit de acasă.',
        'Teatrul se petrece o singură dată, aici și acum, între cel din sală și actor. Sfatul de început e domestic: haina se agață, resturile se aruncă, omul sosește la timp, textul se învață, problema se spune și se rezolvă.',
        'Munca, crede el, stă înaintea talentului. Fără repetiție, talentul lasă doar sclipiri. Meșteșugul, adică să știi să faci, vine din trudă.',
        'Drumul de lucru rămâne, chiar dacă reușita vine târziu. Din pandemie a înțeles că rezistența cântărește mai greu decât gloria. Încheie chemând lumea la teatru.',
        'Un interviu al tău păstrează pașii, nu frazele lui. Întrebările deschise cer părerea unui regizor pe care ți-l alegi tu.'
      ].join('\n\n'),
      example: 'Interviul informează și e nonliterar. Întâia întrebare cere o prezentare. În aprilie 2022, Anghel avea 32 de ani și terminase regia la UNATC. Opt ani a picat la actorie. Plecarea lui e Steaua fără nume. Meșteșugul vine din trudă. Teatrul se petrece o dată, aici.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Deschisă: Ce te-a împins spre regie după opt ani de actorie? Închisă: Mai vrei să fii actor? La închisă răspunzi da sau nu. La deschisă spui o părere.'
        }
      ],
      tryThis: 'Spune scopul interviului, rostul primei întrebări și cei doi: reportera și Mircea Anghel. Notează vârsta, școala și piesa de la care a pornit.\n\nSpune cum vede teatrul peste zece ani și de ce truda stă înaintea talentului. Schițează șapte întrebări deschise către un regizor, plus una închisă. Răspunsurile le scrii tu.',
      keyPoints: [
        'Interviul e dialog de presă, cu întrebări deschise și închise. Reporterul întreabă, invitatul răspunde.',
        'În aprilie 2022 Anghel avea 32 de ani, terminase regia la UNATC și plecase de la Steaua fără nume.',
        'Teatrul, pentru el, se petrece o singură dată, între sală și actor. Meșteșugul vine din trudă, nu din sclipirea fără repetiție.'
      ]
    }),

    lesson({
      id: 'trac',
      title: 'Emoția din fața sălii',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei canale',
          text: 'Verbal: idei. Nonverbal: gest, mimică, postură. Paraverbal: ritmul vocii și tăria ei.'
        }
      ],
      theory: [
        'Tracul comunicativ e emoția care apare când stai dinaintea unui public. Se cunoaște după frisoane, sudoare, puls înalt, amețeală și o respirație grea.',
        'Ai șase căi. Întâi te documentezi. Apoi îți faci un plan. Repeți rolul sau mesajul, de mai multe ori.',
        'Primești emoția și o schimbi cu o vorbă de sprijin. Poți spune Și eu pot. Separat: Voi reuși. Apoi: Va fi bine. La urmă: Sunt pregătit.',
        'Ții în frâu suflul, fața și ținuta: tragi aer, apoi îl dai afară. Sala întreagă se reduce la un singur om pe care îl cunoști.',
        'În comunicare, dialogul leagă cel puțin doi oameni. Partea verbală poartă idei și păreri. Partea nonverbală poartă gestul, mimica, postura. Partea paraverbală poartă ritmul și tăria glasului.',
        'Conversația e forma pe care o întâlnești cel mai des. Replica e vorba unei persoane. Ca să fie dialog, trebuie măcar două replici legate prin înțeles.',
        'Vorbești corect, civilizat, limpede, lași și celuilalt dreptul să răspundă și potrivești tonul cu situația. Poți asculta pasiv, poți asculta activ sau poți fi cel care vorbește.',
        'Cel care ascultă activ arată că a priceput: te privește și pune o întrebare scurtă. În gară, Lina vorbește amenințător. Profesorul ascultă, apoi răspunde.',
        'Gestul de amenințare ține de nonverbal. Glasul ridicat ar ține de paraverbal. Între citit și văzut, alegerea se explică: lectura îți dă notele de regie, seara îți dă glasul și decorul.',
        'Amândouă sunt bune, fiecare pentru altceva. Nu le pui una împotriva celeilalte.',
        'O afirmație scurtă, spusă înainte de intrare, nu șterge emoția. O mută: din frică, în hotărâre.'
      ].join('\n\n'),
      example: 'Tracul se vede la puls, la suflu și la sudoare. Planul, repetiția și vorba Voi reuși îl țin în frâu. Dialogul cere măcar două replici. Gestul e nonverbal. Tăria glasului e paraverbală. Cine ascultă activ pune o întrebare scurtă.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'În fața clasei spui: Sunt pregătit. Tragi aer de două ori și privești un coleg cunoscut, nu toată sala. Gestul liniștit e nonverbal. Glasul coborât e paraverbal.'
        }
      ],
      tryThis: 'Dă trei semne ale tracului și trei căi din cele șase. Pentru o prezentare în fața clasei, scrie vorba care te sprijină.\n\nNotează cinci reguli scurte ca să nu uiți textul. Apoi fă opt replici: regizorul stă de vorbă cu actorul din rolul de profesor. Arată un gest și locul unde glasul coboară.',
      keyPoints: [
        'Tracul apare dinaintea publicului. Îl ții cu documentare, plan, repetiție, vorbe de sprijin și suflu controlat.',
        'Dialogul leagă replici, plus gest și glas. Cine ascultă activ arată că a priceput.',
        'Lectura îți dă didascaliile. Seara îți dă glasul și decorul. Amândouă folosesc.'
      ]
    }),

    lesson({
      id: 'cronica',
      title: 'Cum scrii despre un spectacol',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei părți',
          text: 'Începutul așază piesa. Mijlocul arată jocul și viziunea. Finalul spune cui i se adresează și cu ce efect.'
        }
      ],
      theory: [
        'Cronica de teatru e un articol de presă. Notează o seară și o comentează. Textul e nonliterar.',
        'Ținta: să informeze și să recomande, sau să nu recomande. Se adresează celui care își alege ce să vadă.',
        'Are trei bucăți. Începutul așază piesa în dramaturgie și în repertoriu. Finalul arată publicul vizat și efectul posibil.',
        'La mijloc intră acțiunea, oamenii și dialogul, valoarea textului, viziunea de regie, apoi atmosfera: lumini, costume, muzică, ritm, ton și joc.',
        'Seara comentată e Steaua fără nume. Regia: Victor Ioan Frunză. Întâia dată: miercuri, 9 decembrie 2015.',
        'Sala acelei seri: Centrul Cultural pentru UNESCO Nicolae Bălcescu. Mai era o reprezentație marți, 15 decembrie 2015, în București, pe Strada 11 Iunie, la numărul 41.',
        'Semnătura e a Mariei Ruxandra Burcescu. Pentru ea, piesa lui Sebastian e o capodoperă, iar montarea a trecut peste ce aștepta.',
        'Târgul numără 8.000 de locuitori. Distracția lor e să privească trenurile. Într-o seară, acceleratul oprește o călătoare fără bilet. Femeia nu acceptă legitimarea.',
        'Miroiu o primește peste noapte și făgăduiește biletul către București după leafă. Întâmplarea ține noaptea aceea și dimineața care vine.',
        'Miroiu e un intelectual de provincie: iubește astronomia, are idei multe și lucruri puține. Decorul îndreaptă ochiul spre Ursa Mare.',
        'Adrian Nicolae îl joacă, cu umor, pe șeful de gară și, în altă distribuție, pe Miroiu. Luminița Erga este domnișoara Cucu.',
        'Cucu e ridicolă și austeră. În actul al treilea e greu de adus spre omenesc. Articolul laudă, deci nu stă neutru: e o recomandare caldă.',
        'Cronica ta o scrii tu, despre o seară văzută sau despre gara lucrată mai devreme, cu un decor, un actor și o recomandare. Articolul citit nu se copiază.',
        'La O scrisoare pierdută, de Ion Luca Caragiale, data montării se ia de pe afișul pe care l-ai văzut. Nu se inventează.'
      ].join('\n\n'),
      example: 'Cronica e nonliterară și poate recomanda. Regia e a lui Victor Ioan Frunză, în 9 decembrie 2015. Nicolae joacă șeful gării. Erga o joacă pe Cucu. Faptele țin o noapte plus dimineața. Târgul are 8.000 de oameni. Decorul duce spre Ursa Mare.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Final posibil, al tău: gara merită văzută de cine vrea o noapte de provincie, un profesor sărac și o stea încă nenumită. Lauda înseamnă recomandare, nu neutralitate.'
        }
      ],
      tryThis: 'Spune pentru cine se scrie cronica, de ce e nonliterară și care îi e ținta. Dă regizorul, data, locul, apoi doi actori cu rolurile lor.\n\nSpune ce rezolvă Miroiu în gară și cât ține acțiunea. Descrie decorul într-o propoziție. Arată că lauda înseamnă recomandare. Scrie apoi 80–100 de cuvinte: început, un fapt de joc, final cu recomandare.',
      keyPoints: [
        'Cronica notează o seară în trei părți și e nonliterară. Poate recomanda sau nu.',
        'Frunză a montat piesa la 9 decembrie 2015. Nicolae e șeful gării, Erga e Cucu.',
        'Faptele țin o noapte și dimineața de după. O dată de pe un afiș nevăzut nu se inventează.'
      ]
    }),

    lesson({
      id: 'pronume-personal',
      title: 'Eu, dumneavoastră și sine',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Personal',
          text: 'Înlocuiește un nume și arată persoana. Scurtele, cliticele, se leagă cu cratimă sau stau libere.'
        }
      ],
      theory: [
        'Pronumele înlocuiește un nume. Personalul arată cine ia parte la vorbire: persoana I, a II-a sau a III-a.',
        'Nominativ: eu, noi, tu, voi, el, ea, ei, ele. Acuzativ cu accent: mine, noi, tine, voi, el, ea, ei, ele.',
        'Acuzativ fără accent: mă sau m-, ne sau ne-, te sau te-, vă sau v-, îl sau l-, o, îi sau i-, le sau le-.',
        'Dativ cu accent: mie, nouă, ție, vouă, lui, ei, lor. Dativ fără accent: îmi sau mi-, ne- sau ni-, îți sau ți-, vă, v- sau vi-, îi sau i-, le- sau li-.',
        'Genitiv doar la a III-a: lui, ei, lor. Vocativ: tu, voi. Scurtele sunt clitice. Cratima leagă, ca în ne-a oferit. Reiau: Ioanei i-am spus adevărul. Separat, L-a văzut pe copil.',
        'În bilet, eu e accentuat, I, singular, nominativ, subiect. În salut, vă e politețe, a II-a, cu pluralul. Mă duc: reflexiv, I, acuzativ. Vă duc cu trăsura: personal, a II-a, fiindcă duci pe alții.',
        'Politețea arată respect la a II-a și a III-a. Genul doar la a III-a singular. Forme: dumneata, dumneavoastră, dumitale, dumnealui, dumnealor, dumneaei. Plural chiar pentru un om: Dumneavoastră veniți.',
        'Respect mare, cu majusculă, fără liniuță: Excelența Sa, Domnia Ta, Domnia Voastră, Înălțimea Ta, Sfinția Ta. Respect mic: dumneata, dânsul, dânșii, dânsele, matale, mătăluță, mătălică, tălică.',
        'Reflexivul: obiectul e subiectul. La a III-a: sine, se, s-, sie, sieși, își, și-. La I și a II-a ia cliticele personalului. Mă plictisesc e reflexiv. Mă plictisești e personal, căci subiectul e tu.',
        'Funcții. Noi: subiect, nominativ. Ei lângă împreună cu: asociere, acuzativ. Dumnealui condus: subiect. Ne îndreptăm: reflexiv. Spre voi: loc. Ca tine: mod. Am scris dumnealui: indirect, dativ.',
        'Ale lui: atribut, genitiv. Înaintea lor: timp, genitiv. Pe mine reluat de mă: direct. Despre mine: prepozițional. Pentru dumnealor: atribut prepozițional. Poezia ei: atribut. Pentru sine: scop. Își și sieși: indirecte. De sine: atribut. Mă spăl: reflexiv, direct.',
        'Îngrijit: i-a spus, M-a văzut, L-a certat, Va veni, sa s-a dus, Își amintește. În S-a spălat, s- e reflexiv. Sunt în gară e predicativ. Sunt profesor e copulativ.'
      ].join('\n\n'),
      example: 'Eu din bilet e accentuat, I, subiect. Mă duc e reflexiv. Vă duc e personal. Dumneavoastră cere plural. Îngrijit: i-a spus. Sunt în gară e predicativ. Sunt profesor e copulativ.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Excelența Sa sosește la premieră. Dumneata vii mai devreme. Prima formulă e de respect maxim, cu literă mare și fără cratimă. A doua e de respect mic.'
        }
      ],
      practice: [
        '1) Ia pe rând eu din biletul promis, vă din salut, mă din Mă duc și vă din trăsură. Dă felul, persoana și numărul.',
        '2) De ce dumneavoastră cere pluralul? Dă o formulă de respect maxim și una de respect mic.',
        '3) La Noi vom merge împreună cu ei, la Pe mine mă interesează și la Am scris dumnealui, dă cazul și funcția.',
        '4) Îndreaptă El ia spus, apoi Mai văzut, apoi La certat. Spune rolul lui s- și felul lui sunt în gară, apoi la profesor.'
      ].join('\n\n'),
      answers: [
        'eu: personal accentuat, I, singular; vă din salut: politețe, a II-a; mă: reflexiv, I singular; vă din duc: personal, a II-a',
        'plural chiar pentru o persoană; maxim Excelența Sa; mic dumneata',
        'Noi: nominativ, subiect; ei: acuzativ, circumstanțial de asociere; mine: acuzativ, complement direct; dumnealui: dativ, complement indirect',
        'i-a spus; M-a văzut; L-a certat; Va veni; Sora sa s-a dus; Își amintește; s- reflexiv; în gară predicativ; profesor copulativ'
      ],
      mistakes: 'Vă salut cere pluralul. Vă duc e personal. Dumneavoastră veniți. Îngrijit: i-a spus și M-a văzut.',
      tryThis: 'Compune o replică unde apare Excelența Sa și alta cu dumneata. Arată s- reflexiv, sunt predicativ și sunt copulativ.',
      keyPoints: [
        'Personalul arată persoana. Cliticele pot lua cratimă și pot relua complementul.',
        'Dumneavoastră stă cu pluralul. Respectul maxim are literă mare și nu are cratimă.',
        'Reflexivul se acordă cu verbul. Sunt în gară e predicativ. Sunt profesor e copulativ.'
      ]
    }),

    lesson({
      id: 'pronume-posesiv',
      title: 'Al meu și cartea mea',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Posesiv',
          text: 'Ține locul lucrului posedat și al posesorului. Al se schimbă după obiect. Forma de posesiv, după posesor.'
        }
      ],
      theory: [
        'Posesivul înlocuiește și lucrul avut, și pe cel care îl are. Se construiește din al, semiindependent pentru obiect, plus forma posesorului, ca tău.',
        'Al, a, ai, ale, alor urmează genul și numărul obiectului. Partea de posesiv urmează persoana și numărul celui care posedă.',
        'Nominativ-acuzativ, un posesor, un obiect: al meu, a mea, al tău, a ta, al său, a sa. Un posesor, mai multe obiecte: ai mei, ale mele, ai tăi, ale tale, ai săi, ale sale.',
        'Mai mulți posesori, un obiect: al nostru, a noastră, al vostru, a voastră. Mai mulți posesori, mai multe obiecte: ai noștri, ale noastre, ai voștri, ale voastre.',
        'La genitiv și la dativ lipsește singularul. Pluralul: alor mei, alor mele, alor tăi, alor tale, alor săi, alor sale, alor noștri, alor noastre, alor voștri, alor voastre.',
        'Pentru a III-a plural nu există forme proprii. Se ia genitivul personalului: a lor, al lor, ale lor, ai lor. Iar al nostru înseamnă mai mulți stăpâni și un singur obiect.',
        'O completare: Prăjitura mea este delicioasă, dar a ta este aspectuoasă. Alta, despărțită: Florile noastre sunt viu colorate, pe când ale voastre sunt parfumate.',
        'Mai departe: Poți să mi le împrumuți pe ale tale. Și: Andrei schimbă tunsoarea pe a sa. Aici a ta, ale voastre, ale tale și a sa sunt pronume.',
        'Lângă un nume, corect e adjectivul. Exemple despărțite: Prietenii noștri sunt pregătiți. Apoi Colega sa va pregăti lucrarea. Apoi Costumele tale sunt reușite. Greșit aici: noștrii, s-a, tele.',
        'Ai noștri, fără nume alături, rămâne pronume. Ai mei poate fi subiect. Iar a noastră poate fi nume predicativ. Pe ai voștri: direct. Camera alor mei: atribut genitival. Le-am comunicat alor mei: indirect, dativ.',
        'Înaintea alor voștri cere genitivul și e timp. Ca ai noștri: mod. Lângă ai mei: loc.',
        'Lângă un nume, cu acord, devine adjectiv pronominal, atribut. Forma urmărește obiectul: decorul tău, apoi piesa ta, apoi prietenii tăi.'
      ].join('\n\n'),
      example: 'Al nostru: mai mulți posesori, un obiect. A ta e pronume, pentru prăjitura celuilalt. Prietenii noștri, colega sa, costumele tale sunt adjective. Ai mei poate fi subiect. A noastră, nume predicativ. Alor mei, complement indirect.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Decorul tău, piesa ta, prietenii tăi: forma se schimbă după obiect. Toate trei sunt adjective, atribute. Fără nume lângă ele, ai tăi ar fi pronume.'
        }
      ],
      practice: [
        '1) Din ce e făcut al nostru și ce arată despre posesori și despre obiecte?',
        '2) Completează prăjitura mea, dar a ta. Apoi florile noastre, pe când ale voastre, pe ale tale și pe a sa. Alege noștri, sa, tale lângă Prietenii, Colega, Costumele.',
        '3) Dă cazul și funcția. Ai mei au fost la teatru. Apoi Victoria va fi a noastră. Apoi Pe ai voștri, Camera alor mei și Le-am comunicat alor mei.',
        '4) Scrie decorul tău, piesa ta, prietenii tăi și spune partea de vorbire și funcția.'
      ].join('\n\n'),
      answers: [
        'din al plus forma de posesiv; mai mulți posesori, un obiect',
        'a ta; ale voastre; ale tale; a sa; noștri; sa; tale',
        'Ai mei: nominativ, subiect; a noastră: nominativ, nume predicativ; ai voștri: acuzativ, complement direct; alor mei la cameră: genitiv, atribut; alor mei la comunicat: dativ, complement indirect',
        'adjective pronominale posesive, atribute'
      ],
      mistakes: 'Lângă nume nu scrie noștrii, s-a sau tele. Corect: prietenii noștri, colega sa, costumele tale. Al nostru nu înseamnă un singur posesor. La a III-a plural se ia a lor, nu o formă de alor.',
      tryThis: 'Fă două enunțuri. Într-unul ai noștri e pronume. În celălalt noștri stă lângă un nume și e adjectiv. Spune funcția în fiecare.',
      keyPoints: [
        'Posesivul înlocuiește și lucrul, și pe stăpân. Al urmează obiectul posedat.',
        'Al nostru: posesori mulți, obiect unul. Lângă nume devine adjectiv.',
        'Ai mei poate sta subiect. A noastră poate sta nume predicativ. Alor mei poate sta complement indirect.'
      ]
    })
  ]
};
