'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  lessons: [
    lesson({
      id: 'colocvial-cultivat',
      title: 'Colocvial și cultivat',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Două registre',
          text: 'Cultivatul respectă norma și stă în comunicare formală. Colocvialul este familiar. Popularul regional este un alt strat, nu același lucru.'
        }
      ],
      theory: [
        'Limbajul cultivat este varianta îngrijită a limbii literare. Se folosește la teză, la cerere și la știre.',
        'Limbajul standard este limba literară. Normele le dă Academia Română, prin gramatici și prin Dicționarul ortografic, ortoepic și morfologic, ediția a III-a.',
        'Colocvialul este o variantă nonstandard, de mediu familiar. Între apropiați nu strică, singur, înțelegerea. Nu se recomandă în situație formală.',
        'În literatură, colocvialul poate caracteriza un personaj. Vocea compunerii de examen rămâne cultivată. Dacă foaia cere o replică familiară, ea stă în gura personajului.',
        'Termenii științifici țin de cultivat: cuvinte de domeniu, adesea împrumuturi recente, cu circulație internațională.',
        'Popularul se aude mai ales la sat și are variante regionale. Curechi înseamnă varză. Barabule înseamnă cartofi. Nu le confunda cu zice sau cu mișto.',
        'Mirela consideră că originalitatea este foarte importantă într-un text este cultivat. Mirela zice că e bine să fii original este colocvial.',
        'Vroiam să spun că îmi pare rău devine Voiam să spun că îmi pare rău. Ea ar fi vrut să nu aibe dreptate devine Ea ar fi vrut să nu aibă dreptate.',
        'Colegu lu Andrei, cu tăierea lui i, devine Colegul lui Andrei este înscris la concurs. Mă dusei la școală mai devreme decât de obicei este perfect simplu familiar. Standard: M-am dus la școală mai devreme decât de obicei.',
        'Anunțul Se recomandă închiderea telefoanelor mobile în timpul zborului nu conține colocvial. Elevii sunt informați în legătură cu normele privind protecția muncii în laboratoare este cultivat.',
        'Maria așază cărțile de la bibliotecă pă raftul de sus devine Maria așază cărțile de la bibliotecă pe raftul de sus. Standardizarea trece și prin dicționare.',
        'La un concurs, cu paznicul se vorbește îngrijit: Bună ziua. Aș dori să intru, pentru că sunt înscris. Cu un coleg, pe bune poate rămâne. Cu bibliotecara se revine la aș dori.',
        'Fragmentul din Ovidiu Verdeș, Muzici și faze, este colocvial: se recunoaște după fază, nene și mișto, într-o stație, la un băiat rămas singur. Paragraful nu se lipește.',
        'Enunțul Este recomandată respectarea normelor de protecția muncii este cultivat.'
      ].join('\n\n'),
      example: [
        'Cultivat: Mirela consideră. Colocvial: Mirela zice. Forme îngrijite: Voiam, aibă, Colegul lui Andrei, M-am dus, pe raftul de sus.',
        'Anunțul din avion nu este colocvial. Protecția muncii este cultivată. La concurs, cu paznicul: aș dori. Cu colegul, familiarul poate rămâne.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Curechi și barabule sunt regionalisme populare. Nu sunt greșeli de registru colocvial. Într-o teză se scriu varză și cartofi, dacă nu caracterizezi un personaj.'
        }
      ],
      practice: [
        '1) Spune care enunț al Mirelei este cultivat și care este colocvial.',
        '2) Rescrie standard: vroiam, aibe, colegu lu Andrei, mă dusei.',
        '3) Anunțul din avion este colocvial sau nu? Norma de protecție a muncii este cultivată sau colocvială?',
        '4) Înlocuiește pă în enunțul despre raft. Spune de ce fragmentul lui Verdeș este colocvial, fără să îl copiezi.'
      ].join('\n\n'),
      answers: [
        'consideră este cultivat; zice este colocvial',
        'Voiam; aibă; Colegul lui Andrei; M-am dus',
        'anunțul nu este colocvial; norma este cultivată',
        'pe raftul de sus; fază, nene și mișto sunt mărci familiare'
      ],
      mistakes: 'Colocvialul nu este totuna cu popularul. Voiam, aibă, lui și pe sunt formele îngrijite. Teza nu se scrie cu zice și cu mișto.',
      tryThis: 'Construiește două replici: una cu paznicul, una cu un coleg. Scrie, în registru cultivat, două argumente despre rolul limbajului, fără să copiezi un paragraf.',
      keyPoints: [
        'Cultivatul ține norma și stă în teza scrisă. Colocvialul stă între apropiați.',
        'Popularul regional, curechi și barabule, este alt strat. Voiam, aibă, lui și pe raft sunt formele îngrijite.',
        'Standardizarea trece și prin dicționar. În literatură, familiarul caracterizează, nu înlocuiește vocea compunerii.'
      ]
    }),
    lesson({
      id: 'fraza-orala',
      title: 'Fraza vorbită și fraza scrisă',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Două construcții',
          text: 'Scrisul ține norma și poate lega mai multe subordonate. Vorbirea are întreruperi, aproximări și forme scurtate. Logica rămâne obligatorie în ambele.'
        }
      ],
      theory: [
        'Argumentul de examen rămâne în limba scrisă standard. Mărci ale oralității: întreruperi, repetiția după o intercalare, și pus în lanț, aproximarea pe la șase, cuvintele ăsta, ăla și aicea.',
        'Complementul direct rămâne uneori fără pe: Fata care am văzut-o, în loc de Fata pe care am văzut-o. Atributiva se deschide uneori prin de: fata de stă la tanti Rica devine fata care stă la doamna Rica.',
        'Prezentul narativ spune un fapt trecut ca și cum se întâmplă acum. Proverbul Vorba dulce mult aduce se argumentează standard: o vorbă calmă poate deschide o înțelegere.',
        'Apostroful din vorbire taie o literă. Forma lu, cu literă tăiată, se scrie lui. Io îi zic lu mama: Vino lângă mine devine Eu îi spun mamei: Vino lângă mine.',
        'Fata care am văzut-o era sora lu Mircea devine Fata pe care am văzut-o era sora lui Mircea. Sora lu Mircea pleacă în stațiune devine Sora lui Mircea pleacă în stațiune.',
        'Ăla nu vrea să vină la petrecere devine Acela nu vrea să vină la petrecere. Nu vrea să vină aicea nici în ruptul capului devine Nu vrea să vină aici nici în ruptul capului.',
        'Vine pă la bunica atunci când poate devine Vine pe la bunica atunci când poate. Melodia care am ascultat-o mi-a plăcut devine Melodia pe care am ascultat-o mi-a plăcut.',
        'Relatarea despre Andu, îndreptată, spune că mama lui îl îndeamnă să învețe, ca să nu aibă cine să îl judece la serviciul pe care o să îl aibă. Transformări: lu devine lui, aibe devine aibă, care devine pe care. Întreruperea dispare.',
        'Comunitatea urbană, spusă ca grup uman a cărui particularitate este aceea de a locui în același loc, cu acțiuni comune, este scrisă standard. Are atributivă și nu are ăsta, pă sau lu.',
        'În autobuz, mărcile orale sunt dupe pentru după, ăsta, io pentru eu și mamaie ca apelativ. Standard: Nu știu sigur. Mai bine întrebați pe cineva care știe, pentru că eu merg mai mult pe jos.',
      ].join('\n\n'),
      example: [
        'Vorbit: Io îi zic lu mama. Scris: Eu îi spun mamei. Vorbit: melodia care am ascultat-o. Scris: melodia pe care am ascultat-o.',
        'Vorbit: pă la bunica. Scris: pe la bunica. Comunitatea urbană este scrisă din start, cu a cărui particularitate. Autobuz: dupe, ăsta și io sunt oralitate.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'O urare liniștită la o nuntă poate calma oaspeții, chiar dacă vorbitorul are un năcaz. În argument, fraza rămâne standard. Marca orală, dacă o pui, stă într-o replică, nu în concluzie.'
        }
      ],
      practice: [
        '1) Rescrie standard: ăla, aicea, pă la bunica, melodia care am ascultat-o.',
        '2) Numește trei transformări din relatarea despre Andu: lui, aibă, pe care.',
        '3) Enunțul despre comunitatea urbană este limbă vorbită sau scrisă? De ce?',
        '4) Numește trei mărci orale din autobuz și dă replica standard a tânărului.'
      ].join('\n\n'),
      answers: [
        'acela; aici; pe la bunica; melodia pe care am ascultat-o',
        'lu devine lui; aibe devine aibă; care devine pe care',
        'scrisă: are atributivă și nu are ăsta, pă sau lu',
        'dupe, ăsta, io; Nu știu sigur. Mai bine întrebați pe cineva care știe.'
      ],
      mistakes: 'Care fără pe, când este complement direct, rămâne vorbire. Lu nu se scrie în loc de lui. Argumentul nu se construiește cu ăsta și cu aicea.',
      tryThis: 'Construiește un enunț cu două mărci de oralitate și spune care sunt. Apoi rescrie-l standard. Pentru proverb, dă un argument îngrijit, fără să copiezi o replică.',
      keyPoints: [
        'Limba scrisă ține norma și poate lega subordonate. Limba vorbită are întreruperi, aproximări și ăsta sau aicea.',
        'Lu cu literă tăiată se scrie lui. Pe care înlocuiește care când este complement direct.',
        'Argumentul de examen rămâne scris standard. Oralitatea, dacă este cerută, stă într-un dialog scurt.'
      ]
    }),
    lesson({
      id: 'coerenta-text',
      title: 'Coerență și anaforă',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Anaforă',
          text: 'Anafora trimite la același lucru din realitate, numit referent. Coerența pune ideile în ordine și ține concordanța timpurilor.'
        }
      ],
      theory: [
        'Mai-mult-ca-perfectul arată o acțiune dinaintea altei acțiuni trecute. Am ajuns acasă, dar ea plecase deja la școală. Plecase este înainte de am ajuns.',
        'Viitorul anterior arată o acțiune dinaintea altei acțiuni viitoare. Ea va fi plecat la școală când eu voi ajunge acasă. Va fi plecat stă înainte de voi ajunge.',
        'Limbajul clar nu lasă două înțelesuri pe aceeași frază. Vitoria a pornit la drum împreună cu fiul său. Ea dorea să afle adevărul. Aceasta nu se va opri până nu va descoperi ce s-a întâmplat.',
        'Ea și aceasta trimit la Vitoria. Fiul său trimite la copilul ei. Pe foaia de gramatică, Pe Gheorghiță l-a condus Vitoria, l-a dus mama sa îl are pe Vitoria și pe mama ca același referent.',
        'În enunțul de gramatică, numele soțului este scris Nichifor. În roman, soțul este Nechifor Lipan. Nu le amesteca: una este grafia enunțului, cealaltă este numele din roman.',
        'Relatarea orală se îndreaptă prin tăierea dublării. Vitoria, care merge în căutarea soțului, a respectat nunta și botezul pe care le-a întâlnit.',
        'Apoi: Ea îi spune lui Gheorghiță: Ia vezi, fiule, pe unde crezi că o luăm acum. Au căzut ea de prisos, după care, și forma cu pă, înlocuită cu pe.',
        'Al doilea text, îndreptat: Am citit romanul lui Sadoveanu, care mi-a plăcut în mod deosebit. Romanul prezintă o călătorie, iar Vitoria este personajul principal.',
        'Este mama lui Gheorghiță, care pornește și el în călătorie cu mama lui. Ei voiau să își găsească tatăl, despre care nu știau dacă trăiește sau a murit.',
        'În fragmentul citit la clasă, Vitoria ajunge la o nuntă și la un botez și se poartă cu stăpânire. Au căzut asta, lu, vroiau, întreruperea și dezacordul un nuntă. Se scrie o nuntă, voiau, a murit, fără întrerupere.',
        'Text scurt despre lectură, 20–30 de cuvinte: Cititul zilnic îmi ține mintea trează. El mă ajută să țin firul unei povești. Această obișnuință cere un sfert de oră. El și această obișnuință trimit la citit.',
        'În cronica Eliei Bădică despre Haruki Murakami, pe bookaholic.ro, volumul Meseria de romancier are 12 eseuri și aproape 300 de pagini. El trimite la Murakami. Eu trimite la autoare.',
        'Afirmația, spusă pe scurt: un roman îl poate scrie cine leagă paragrafe, dacă este creativ și are un pix și un caiet. Limita: paragrafele înșiruite nu țin loc de subiect și de frază proprie.'
      ].join('\n\n'),
      example: [
        'Mai-mult-ca-perfect: plecase, înainte de am ajuns. Viitor anterior: va fi plecat, înainte de voi ajunge. Anaforă: ea, pentru Vitoria.',
        'Text îndreptat: Vitoria este personajul principal. Ea este mama lui Gheorghiță. Ei voiau să își găsească tatăl. Fără asta, fără lu, fără vroiau. Pixul nu înlocuiește subiectul.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Baltagul are un drum, un om care lipsește și o femeie care își stăpânește fața la datină. Asta este un subiect, nu o înșiruire de paragrafe. Fără o idee a ta, paragraful copiat este plagiat.'
        }
      ],
      tryThis: 'Spune ce timp este plecase față de am ajuns și ce timp este va fi plecat față de voi ajunge. Construiește 20–30 de cuvinte despre lectură, cu două anafore. Notează 12 eseuri și aproape 300 de pagini. Opinia despre roman rămâne coerentă și îngrijită.',
      keyPoints: [
        'Coerența pune ideile în ordine. Mai-mult-ca-perfectul stă înaintea unui trecut. Viitorul anterior stă înaintea unui viitor.',
        'Anafora trimite la același referent. În roman, soțul este Nechifor Lipan. În enunțul de gramatică, grafia este Nichifor.',
        'Paragrafele înșiruite nu țin loc de subiect. Cronica despre Murakami are 12 eseuri și aproape 300 de pagini.'
      ]
    }),
    lesson({
      id: 'spirit-civic',
      title: 'Trei fapte și o patrulă',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Civic',
          text: 'Civic înseamnă cetățenesc. Responsabilitatea este obligația de a face un lucru, de a răspunde și de a suporta consecințele.'
        }
      ],
      theory: [
        'Anul care nu este în text nu se inventează. Prima știre, de pe zcj.ro: trei elevi ai Liceului Teoretic Jósika Miklós din Turda au găsit, la 25 septembrie, un telefon mobil în parcul central și l-au predat la poliție. Anul nu este în text.',
        'Marți, în Săptămâna prevenirii criminalității, polițiștii clujeni i-au premiat cu diplome, în fața colegilor și a profesorilor, pentru cinste. Inspectoratul de Poliție Județean Cluj a prezentat cazul în școlile unde s-au ținut activități de prevenire.',
        'Scopul acțiunii din școlile din Turda: prevenirea victimizării minorilor. Din câmpul elevului fac parte colegi, liceu și cadre didactice.',
        'A doua știre, Festivalul cunoașterii, ProFest: prima ediție, 25–27 august 2017, în Râșnov, județul Brașov. Oameni cu spirit civic, artiști și activiști împărtășesc soluții pentru problemele societății.',
        'Sunt unsprezece teme. Atelierele privesc proiecte civice, veghea instituțiilor și sancționarea abuzurilor. Organizarea este a voluntarilor, sub egida CENTRAS.',
        'O sută de activități, zece spații, între 4.000 și 5.000 de participanți. Voluntarii sunt profesioniști, de la juridic și management până la comunicare, și pun motivația mai presus de meserie. Sursa este stiri.ong. Detaliile se caută la anunțul evenimentului.',
        'A treia știre, despre deșeurile electrice: norma Uniunii Europene este patru kilograme pe cap de locuitor. Țara nu a strâns nici măcar un kilogram într-un an. Așa a apărut Patrula de Reciclare.',
        'Ada Lungu, de la relațiile publice ale programului, o descrie ca educație de mediu: o echipă națională de preșcolari, liceeni și profesori care promovează colectarea deșeurilor de echipamente electrice și electronice.',
        'În fiecare școală: 20–25 de elevi și un profesor, tot anul. Alexandra Arnăutu, manager de proiect, spune că elevii au puterea exemplului în comunitate.',
        'Programul ține de mai bine de patru ani, în peste 1.800 de școli, și a strâns aproape un milion de kilograme.',
        'Știrea audio de la Liceul Tehnologic Turceni, în Gorj: o echipă de robotică a făcut un robot care adună deșeurile de sub ape, pentru că până atunci le strângeau scafandrii. Sursa este tvrinfo.ro. Anul nu este în transcriere.',
        'Robotul a câștigat marele premiu și premiul de popularitate la Târgul Național de Știință. Elevii au cerut sfatul unui profesor de fizică.',
        'Broșura: echipă de trei sau patru, o temă dintre colectarea selectivă, poluarea aerului, tăierile ilegale sau apele din zonă. Ultimul cadru este bibliografia. Încheierea este o opinie despre familie și comunitate față de mediu.'
      ].join('\n\n'),
      example: [
        'Telefonul din Turda a fost predat, nu păstrat. Data este 25 septembrie, fără an. ProFest: 25–27 august 2017, Râșnov, 11 teme, 100 de activități.',
        'Patrula: peste 1.800 de școli, aproape un milion de kilograme, manager Alexandra Arnăutu. Robotul din Turceni strânge deșeuri din apă și a luat marele premiu la târgul național.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Opinie scurtă: merită să predai un telefon găsit, pentru că cei trei elevi au primit diplomă pentru cinste, nu pentru că l-au oprit. Faptul stă în știre. Anul lipsă nu se adaugă.'
        }
      ],
      tryThis: 'Notează liceul din Turda, data de 25 septembrie și ce au făcut elevii cu telefonul. Notează perioada ProFest, locul, temele, activitățile și organizatorul. Spune norma de patru kilograme, numărul de școli și cele două nume: Arnăutu și Lungu.',
      keyPoints: [
        'La Turda, trei elevi predau un telefon găsit la 25 septembrie. Anul nu este în text.',
        'ProFest este la Râșnov, 25–27 august 2017, cu 11 teme și 100 de activități, sub egida CENTRAS.',
        'Patrula de Reciclare strânge aproape un milion de kilograme în peste 1.800 de școli. Robotul din Turceni adună deșeuri din apă.'
      ]
    }),
    lesson({
      id: 'proiecte-an',
      title: 'Trei proiecte, fără foaia de puncte',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Nu este compunerea',
          text: 'Proiectul se prezintă la școală. Posterul nu ține loc de teză. La prezentare contează coerența, corectitudinea și timpul.'
        }
      ],
      theory: [
        'Primul proiect, Literatura și comunitatea mea: echipe de trei sau patru. Legați comunitatea de o poveste sau de o legendă locală, ori de o operă care are legătură cu regiunea.',
        'Căutați contextul, valorile și temele. Prezentarea, în 10 minute, dă detalii ale operei și semnificația pentru comunitate. Dacă citiți un fragment, el este scurt și ales de voi.',
        'Dezbaterea întreabă cum reflectă literatura identitatea comunității și ce valori mai sunt de folos azi. Întrebarea ce prezentare te-a impresionat este reflecție, nu punctaj de examen.',
        'Al doilea proiect, Autori celebri: echipă de doi sau trei, cel mult cinci minute, cu o scenă în care se văd relațiile dintre personaje. Careul nu se reconstruiește aici. Indicațiile orizontale numesc autorii, în ordine.',
        'Isaac Asimov, pentru Fundația, Roboții și Imperiul, Eu, robotul. Rick Riordan, pentru Percy Jackson, fiul lui Poseidon. J. K. Rowling, pentru școala Hogwarts.',
        'Charles Dickens, pentru Marile speranțe, David Copperfield și Aventurile lui Oliver Twist. William Shakespeare, pentru Hamlet, Romeo și Julieta, Othello și Richard al III-lea.',
        'Alexandre Dumas, pentru muschetari. Mark Twain, pentru Aventurile lui Tom Sawyer și Prinț și cerșetor. Jules Verne, pentru Insula misterioasă și Căpitan la 15 ani.',
        'J. R. R. Tolkien, pentru Pământul de Mijloc, cu oameni, hobbiți, elfi, gnomi și orci. E. B. White, pentru Stuart Little și Pânza Charlottei.',
        'Miguel de Cervantes, pentru Don Quijote de la Mancha, personaj inventat în 1605. Roald Dahl, pentru Marele uriaș prietenos și Matilda. Jeff Kinney, pentru Jurnalul unui puști.',
        'Verticala cu numărul 5 cere numele și prenumele unui scriitor român din secolul al XX-lea, apreciat pentru proza fantastică și pentru studiile de istoria religiilor. Indicația îl descrie pe Mircea Eliade. Literele din careu nu se inventează.',
        'Al treilea proiect este broșura despre mediu, legată de faptele civice. Bibliografia stă pe ultimul cadru. Nu pui o sursă pe care nu ai deschis-o.',
        'Scena unui autor se scrie numai dacă ai citit textul: tema, două personaje, o relație. Dacă nu l-ai citit, spui că nu inventezi scena. Optzeci de cuvinte ajung pentru schiță, nu pentru roman.',
        'Timpul se respectă: zece minute la comunitate, cel mult cinci la autor. Inimioarele de pe fișa de observare nu sunt puncte de examen.'
      ].join('\n\n'),
      example: [
        'Asimov cu roboții, Riordan cu Percy Jackson, Rowling cu Hogwarts, Dickens cu Oliver Twist, Shakespeare cu Hamlet, Dumas cu muschetarii.',
        'Twain cu Tom Sawyer, Verne cu Insula misterioasă, Tolkien cu Pământul de Mijloc, White cu Pânza Charlottei, Cervantes cu Don Quijote în 1605, Dahl cu Matilda, Kinney cu Jurnalul unui puști. Verticala 5: Mircea Eliade.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'O legendă locală se leagă de comunitate numai dacă poți spune locul, personajele și o valoare încă de folos. Fără aceste trei piese, prezentarea de zece minute rămâne o listă de titluri.'
        }
      ],
      tryThis: 'Spune ce intră în prezentarea de 10 minute și ce două întrebări deschid dezbaterea. Numește cei treisprezece autori cu câte o operă. Spune că verticala 5 îl descrie pe Mircea Eliade, fără careu inventat.',
      keyPoints: [
        'Proiectul despre comunitate durează 10 minute și pornește de la o operă pe care o poți verifica.',
        'Careul îi numește, între alții, pe Asimov, Dickens, Shakespeare, Verne, Tolkien și Cervantes, cu Don Quijote în 1605.',
        'Indicația verticală îl descrie pe Mircea Eliade. Ultimul cadru al broșurii este bibliografia.'
      ]
    }),
    lesson({
      id: 'recap-familie',
      title: 'Anul se închide pe o scenă',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Pașii, nu foaia',
          text: 'Caracterizarea are trăsături, mijloace și minimum 150 de cuvinte. Patru trăsături se enunță. Două se dezvoltă pe fapte. Fraza este a ta.'
        }
      ],
      theory: [
        'Recapitularea și evaluările finale sunt foi cu puncte. Nu sunt lecția. Titlurile de mai jos sunt repere, nu texte de copiat.',
        'Mara, de Ioan Slavici, pentru caracterizare. O nuntă la Festivalul de Cultură Carassauga, în Mississauga, Canada, pentru un text nonliterar.',
        'Neamul Șoimăreștilor, de Mihail Sadoveanu, pentru narativ. Melancolie, de Mihai Eminescu, pentru liric. Două loturi, de I. L. Caragiale, pentru narativ.',
        'Evadare din biblioteca domnului Lemoncello, de Chris Grabenstein, pentru o narațiune de 150–300 de cuvinte. O scrisoare pierdută, de I. L. Caragiale, pentru dramatic. Fișa de observare a comportamentului nu se predă.',
        'Pașii, pe o scenă a noastră. Sâmbătă dimineața, în târg, Irina stă la o masă cu mere. Doi copii de-ai ei aleargă desculți și se întorc când le este foame. Ea se ceartă pentru preț, apoi râde când îi vede.',
        'Irina și ea sunt anafore: același referent. Mai întâi a venit la târg. Apoi s-a târguit. Timpurile stau în ordine. Forma îngrijită este pe masă, nu varianta cu pă.',
        'Trăsături: hărnicie, pentru că stă la masă toată dimineața. Afecțiune, pentru că râde când îi vede pe copii. Mijlocul este fapta, deci caracterizare indirectă.',
        'Pentru narativ spui narator, personaje, spațiu și succesiune. Pentru liric spui emoție, figuri și un eu care simte, nu o întâmplare cu deznodământ.',
        'Pentru dramatic spui numele înaintea replicii, paranteze pentru gest, dialog și conflict jucat acum. Cele trei tipuri nu se amestecă în aceeași caracterizare.',
        'Originalitatea: fraza este a ta. Sursa se indică dacă ai luat o idee. La asociere, valoarea este grija pentru ai tăi. Textul studiat poate fi Baltagul, de Mihail Sadoveanu: și Vitoria își acoperă năcazul cu o față liniștită la datină.',
        'Opinia scurtă are părere, motiv și fapt, în 50–100 de cuvinte. Nu cere conectorii compunerii lungi. Registrul rămâne îngrijit.',
        'La școală repeți aceiași pași pe textul deschis: două anafore, două trăsături cu mijlocul, deosebirea dintre narativ, liric și dramatic. Nu copia o poezie și nu copia o replică de teatru.'
      ].join('\n\n'),
      example: [
        'Ce scrie: sâmbătă, în târg, Irina vinde mere, se ceartă pentru preț și râde când copiii se întorc flămânzi.',
        'Ce vezi: o văd în spatele mesei, cu doi copii desculți care se opresc lângă ea. Eu aș întreba dacă au mâncat, pentru că textul spune că se întorc când le este foame. Anafora: ea este Irina. Râsul arată afecțiunea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Asociere, în două rânduri: valoarea este grija pentru ai tăi. În Baltagul, Vitoria trece prin datină fără să își arate tot năcazul. Faptul este al ei. Fraza de asociere este a ta.'
        }
      ],
      tryThis: 'Pe scena Irinei, numește două anafore și două trăsături, cu mijlocul. Spune de ce pe masă este forma standard. Deosebește, în câte o frază, narativul, liricul și dramaticul. Caracterizarea rămâne pe faptele din scenă.',
      keyPoints: [
        'Foaia cu puncte nu ține loc de text. Caracterizarea are trăsături, mijloace și minimum 150 de cuvinte.',
        'Anafora trimite la același om. Narativul povestește, liricul simte, dramaticul se joacă în replici.',
        'Originalitatea cere fraza ta. Grija pentru ai tăi se poate asocia cu Vitoria, din Baltagul.'
      ]
    })
  ]
};
