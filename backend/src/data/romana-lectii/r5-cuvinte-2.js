'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = { lessons: [
  lesson({
    id: 'roluri',
    title: 'Rolurile din dialogul politicos',
    kind: 'comunicare',
    boxes: [{
      type: 'definitie',
      title: 'Două roluri',
      text: 'Vorbitorul aduce vestea sau întrebarea. Ascultătorul tace, ca să poată primi răspunsul. Rolurile se pot schimba, însă numai pe rând.'
    }],
    theory: [
      'Într-un schimb politicos, cine are cuvântul fie anunță ceva, fie întreabă. Celălalt nu umple pauza: așteaptă, ca răspunsul să aibă loc. După ce a răspuns, poate prelua el cuvântul. Nimeni nu sare peste rând.',
      'Întrebările lipite, fără loc de răspuns, nu mai fac dialog. Rămân discurs. Politicos înseamnă o singură voce o dată. Ideea neîncheiată nu se taie. Doi oameni nu vorbesc în același timp.',
      'Întrebarea cere răspuns, nu o tăiere la mijloc. Ascultarea se vede din privire, către coleg, sau din A, da? Dacă ochii stau în telefon, nu se vede că asculți. La încheiere, fiecare își numește rolul și spune ce promite.',
      'Farsa blândă nu se face oricui. O pregătești doar pentru omul care chiar are nevoie de o lecție, cu aceleași reguli de rând. Vestea o poate da Ana. Farsa o poate propune Radu. Ioana așteaptă ca ideea să se închidă.',
      'Ordinea se verifică ușor. Ana vorbește, colegul tace. Apoi colegul întreabă și trece el la rolul de vorbitor. Un șir de întrebări fără pauză lasă vorbirea fără dialog.',
      'Când Radu își spune farsa, Ioana nu îl taie. Îl privește, confirmă prin A, da? și întreabă abia după închiderea ideii. Telefonul rămâne deoparte. Ana, Radu și Ioana încheie numindu-și rolul și promisiunea.',
      'Promisiunea nu este o vorbă goală. Fiecare spune ce rol a ținut și ce va repeta data viitoare: va aștepta rândul, nu va tăia ideea, nu va privi în telefon. Așa rămâne dialog.'
    ].join('\n\n'),
    example: [
      'Ana îi aduce colegului o veste, deci ea vorbește, iar el tace. Când el pune o întrebare, rolul trece la el. Întrebări lipite, fără pauză, ar face din schimb un discurs.',
      'Radu vine cu farsa blândă numai pentru cine are nevoie de o lecție. Ioana așteaptă finalul, îl privește și răspunde A, da? Telefonul stă jos. Apoi fiecare își spune rolul și ce va face.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'În pauză, Ana anunță ora plecării. Radu ascultă și abia apoi întreabă unde. Ioana nu îl întrerupe când explică pentru cine este farsa. Confirmă cu A, da? și pune întrebarea la urmă. Nimeni nu își lasă ochii în telefon.'
    }],
    tryThis: 'Alcătuiți patru replici. Intra Ana, Radu și Ioana. Vestea o dă Ana. Farsa blândă o propune Radu, doar pentru omul care merită o lecție. Ioana îl privește, ține telefonul deoparte și răspunde A, da? Cei trei încheie spunând ce promit.',
    keyPoints: [
      'Vorbitorul aduce vestea sau întrebarea, ascultătorul tace până răspunde, iar rolurile se schimbă pe rând.',
      'Fără pauză, fără privire către coleg și cu două voci deodată, schimbul devine discurs.',
      'Farsa blândă ține aceleași reguli și se pregătește numai pentru cine are nevoie de o lecție.'
    ]
  }),

  lesson({
    id: 'compliment',
    title: 'Cum primești și cum trimiți o laudă',
    kind: 'comunicare',
    boxes: [{
      type: 'definitie',
      title: 'Lauda',
      text: 'Complimentul este o laudă. O poți primi bucuros sau jenat și poți spune ce simți. Când o trimiți, te sprijini pe o faptă adevărată.'
    }],
    theory: [
      'Lauda nu rămâne o vorbă în aer. La primire poți simți bucurie ori jenă, iar ambele reacții au voie să fie spuse. La trimitere alegi canalul. Poate fi un mesaj scris de tine. Poate fi un e-mail. Poate fi o scrisoare.',
      'Puterea stă în fapta reală. Spui ce a făcut omul, nu înșiri adjective goale. Un text luat de pe un site sună străin și rămâne gol, fiindcă nu numește nicio faptă. Contează vorbele tale.',
      'După o laudă primită, spui cum ai reacționat. Când trimiți tu complimentul, alegi canalul și motivezi alegerea. Scrisoarea încape când vrei să stai mai mult lângă faptă. Mesajul scurt ajunge când fapta este una singură.',
      'Ana îi scrie mamei. Arată că a primit ajutor la proiect și că mama nu a lucrat în locul ei. Rândurile sunt ale Anei și stau pe o faptă adevărată. O frază lipită de pe un site nu numește fapta, de aceea scrisoarea este mai tare.',
      'Jenă și bucurie pot încăpea în aceeași scrisoare. Poți arăta că lauda te-a bucurat și că, uneori, te-a și jenat. Ambele țin de reacție, nu de o formulă împrumutată.',
      'Trei propoziții ajung dacă în ele apar mama, proiectul, ajutorul, bucuria și jena. Lauda rămâne legată de fapta reală. Nimic nu se copiază de pe un site.',
      'Canalul nu înlocuiește motivul. Poți alege scrisoarea fiindcă vrei să păstrezi fapta, nu fiindcă sună mai oficial. Mesajul scris de tine și e-mailul țin aceeași regulă: fapta este a omului lăudat, cuvintele sunt ale tale.'
    ].join('\n\n'),
    example: [
      'Ana alege scrisoarea către mamă. Arată că a primit ajutor la proiect și că mama nu a rezolvat tema în locul ei. Bucuria stă lângă faptă. Textul nu este luat de pe un site.',
      'O frază copiată ar suna gol, fiindcă ar lipsi fapta. De aceea rândurile Anei, cu vorbele ei, sunt mai puternice decât un compliment străin.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Radu îi trimite Ioanei un mesaj scris de el. Ea i-a explicat o temă, fără să i-o rezolve. El arată că o laudă primită altădată l-a bucurat, dar l-a și jenat puțin. Nu lipește un text de pe un site.'
    }],
    tryThis: 'Alcătuiți o scrisoare din trei propoziții. Introdu, nu neapărat în ordinea asta, mama, proiectul, ajutorul, bucuria și jena. Laudă o faptă adevărată și arată ce ai simțit când ai primit tu o laudă. Nu lipi un text găsit pe un site. Spune și de ce ai ales canalul.',
    keyPoints: [
      'Lauda se primește cu bucurie sau cu jenă, iar reacția se spune cu vorbele tale.',
      'Canalul poate fi mesaj, e-mail sau scrisoare, dar puterea stă în fapta reală, nu într-un text copiat.'
    ]
  }),

  lesson({
    id: 'propozitie',
    title: 'Propoziția și predicatul',
    kind: 'limba',
    boxes: [{
      type: 'definitie',
      title: 'Un predicat',
      text: 'Propoziția poartă un singur predicat. Acesta este verbul care marchează persoana și timpul și își schimbă forma după persoană.'
    }],
    theory: [
      'Un enunț devine propoziție când are un singur predicat. Verbul acesta marchează persoana și timpul. Forma lui se schimbă după persoană. O vezi în perechea înțeleg și am înțeles.',
      'Când predicatul este verbal, fapta este deja limpede. La Păsările cântă ajunge cântă. La Copiii râd ajunge râd. Nu mai adaugi un alt cuvânt lângă verb.',
      'Dacă verbul, luat singur, nu spune destul, notarea nu este gata. Modelul este Păsările erau galbene. Erau nu arată cum erau. Mai pui și galbene. Altfel predicatul rămâne neterminat.',
      'Două verbe care funcționează ca predicate nu se adună într-o singură propoziție. Fiecare își deschide propoziția. Nu orice formă de verb ține loc de predicat.',
      'Gerunziul, terminat în -ind, însoțește acțiunea și nu ia rolul. Singur, nu arată nici persoana, nici timpul. Ia enunțul Auzind vestea, mama a sunat. Predicatul de acolo este a sunat. Auzind doar însoțește.',
      'La fel se judecă Văzând ploaia, ei au intrat. Aici predicatul este au intrat. Văzând nu este predicat. Gerunziul însoțește intrarea, dar nu înlocuiește verbul la mod personal.'
    ].join('\n\n'),
    example: [
      'În Copiii râd, predicatul este râd, fiindcă verbul marchează persoana și timpul, iar fapta este clară. În Păsările cântă, predicatul este cântă, și aici ajunge verbul singur.',
      'La Păsările erau galbene notezi ambele părți: erau, apoi galbene. În enunțul Auzind vestea, mama a sunat, verbul-predicat este a sunat. Gerunziul auzind stă alături. În enunțul Văzând ploaia, ei au intrat, verbul-predicat este au intrat.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Înțeleg marchează persoana întâi, la prezent. Am înțeles mută același verb la un timp trecut. Auzind și văzând nu fac singure această schimbare și nu devin predicate.'
    }],
    practice: [
      '1) În Păsările cântă și în Copiii râd, numește predicatul și arată de ce verbul ajunge singur.',
      '2) În Păsările erau galbene, de ce notezi și erau, și galbene?',
      '3) Care este predicatul în Auzind vestea, mama a sunat și în Văzând ploaia, ei au intrat? Ce face forma în -ind?',
      '4) De ce două verbe-predicate nu alcătuiesc o singură propoziție? Ce arată perechea înțeleg și am înțeles?'
    ].join('\n\n'),
    answers: [
      'La prima, predicatul este cântă. La a doua, predicatul este râd. Verbul marchează persoana și timpul, iar fapta este deja limpede.',
      'Erau, singur, nu spune cum erau păsările. Se notează și galbene.',
      'Verbul-predicat este a sunat. Auzind doar însoțește. În cealaltă propoziție, verbul-predicat este au intrat, iar văzând nu este predicat.',
      'Fiecare predicat își deschide propoziția. Înțeleg și am înțeles arată schimbarea după persoană și după timp.'
    ],
    mistakes: 'Gerunziul în -ind nu se ia drept predicat. Două predicate nu se numără ca o propoziție. La Păsările erau galbene nu te oprești la erau, fiindcă lipsește galbene.',
    tryThis: 'Notează Păsările cântă și Copiii râd, cu predicatul subliniat. La Păsările erau galbene trece ambele părți. Arată predicatul din Auzind vestea, mama a sunat: este a sunat. Arată predicatul din Văzând ploaia, ei au intrat: este au intrat. Adaugă perechea înțeleg și am înțeles.',
    keyPoints: [
      'Propoziția poartă un singur predicat, verb care arată persoana și timpul.',
      'Dacă verbul nu spune destul, notezi și restul, ca la erau și galbene.',
      'Gerunziul în -ind însoțește acțiunea și nu ține loc de predicat.'
    ]
  }),

  lesson({
    id: 'scuze',
    title: 'Scuze, refuz, acceptare',
    kind: 'comunicare',
    boxes: [{
      type: 'regula',
      title: 'Potrivit omului',
      text: 'Scuza se mulează pe omul căruia îi ceri iertare. Cu un coleg poți fi mai simplu. Cu profesorul sau cu părintele, vorba este mai îngrijită.'
    }],
    theory: [
      'Scuza se potrivește persoanei, nu unui tipar unic. Cu colegul, tonul poate fi mai simplu. Cu profesorul, și la fel cu părintele, alegi o formulare mai îngrijită. Aceeași propoziție pentru toți trei nu ține.',
      'Refuzul politicos are trei mișcări. Întâi spui nu. Apoi spui motivul. La urmă spui ce ai simțit. Rămâne clar, dar rămâne și politicos. Un nu aruncat fără motiv este o tăiere, nu o scuză.',
      'Colegului îi poți spune că îți pare rău, fiindcă i-ai luat rigla. Fapta este mică. Vorba poate sta aproape de joacă, însă rămâne o scuză, nu o glumă goală.',
      'Profesorului îi ceri iertare cu o vorbă mai îngrijită, fiindcă ai întârziat. Nu repeți propoziția de la riglă. Nu o muți, neschimbată, nici către părinte.',
      'Prietenului îi poți refuza astfel: azi nu poți, ai o lucrare, iar pentru chemare mulțumești. Nu lași refuzul fără motiv. Mai spui și ce ai simțit, ca vorba să rămână omenească.',
      'Acceptarea stă în aceeași grijă. Dacă poți veni, o spui limpede. Dacă nu poți, motivul și mulțumirea țin locul unui nu sec. Părintele, profesorul și colegul nu primesc același enunț.',
      'Ajung trei texte scurte, fiecare din propoziții întregi. La coleg apar pare rău și rigla. La profesor apar rog, iertare și întârziat. La prieten, refuzul poartă nu, azi, lucrare, mulțumesc și m-am simțit.'
    ].join('\n\n'),
    example: [
      'Colegului îi spui că îți pare rău pentru rigla luată. Profesorului îi ceri iertare pentru întârziere. A doua formulare este mai îngrijită decât prima.',
      'Prietenului îi refuzi clar. Azi nu poți, fiindcă ai lucrare, și îi mulțumești că te-a chemat. Adaugi și ce ai simțit. Nu lași un nu gol.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Către părinte nu copiezi scuza de la coleg. Spui, mai îngrijit, că îți pare rău pentru întârziere și că data viitoare pleci mai devreme. Refuzul către prieten rămâne separat: azi nu, din cauza lucrării, cu mulțumire.'
    }],
    tryThis: 'Alcătuiți trei texte, fiecare din propoziții întregi. Pentru coleg introdu pare rău și rigla. Pentru profesor introdu rog, iertare și întârziat. Pentru un prieten fă refuzul și bagă, separat, m-am simțit, mulțumesc, lucrare, azi și nu. Nu muta aceeași propoziție și către părinte.',
    keyPoints: [
      'Scuza se potrivește omului: mai simplă către coleg, mai îngrijită către profesor sau către părinte.',
      'Un refuz politicos cuprinde nu, motivul și sentimentul, fără o propoziție unică pentru toți.'
    ]
  }),

  lesson({
    id: 'afirmativ-negativ',
    title: 'Propoziția afirmativă și cea negativă',
    kind: 'limba',
    boxes: [{
      type: 'definitie',
      title: 'Locul lui nu',
      text: 'Dacă nu stă lângă predicat, propoziția este negativă. Model: Nu vin. Dacă acest nu lipsește, propoziția este afirmativă. Model: Vin. O veste rea poate rămâne afirmativă.'
    }],
    theory: [
      'Forma se judecă după locul lui nu, nu după cât de plăcut sună conținutul. Lângă predicat, nu face propoziția negativă. Fără el, propoziția este afirmativă. Ține minte modelele Nu vin și Vin.',
      'Vestea poate fi rea și totuși forma să rămână afirmativă. Ia A fost incorect. Separat, ia A fost nedrept. Separat, ia Răspunsul a fost greșit. Niciunul nu neagă verbul. Ele judecă fapta, fără să pună nu lângă predicat.',
      'Atât da, cât și nu pot fi forme bune. Nu s-a schimbat regula. S-a schimbat doar decizia. O idee urâtă nu hotărăște singură eticheta de propoziție negativă. Te uiți la verb.',
      'Enunțul Nu vin azi la tine este un refuz. Ca formă, este negativ, fiindcă nu stă lângă predicat. Enunțul Da, vin azi la tine este o acceptare și este afirmativ. Ambele au formă corectă, deși spun lucruri opuse.',
      'Cele trei judecăți rămân afirmative: mai întâi A fost nedrept, apoi, separat, A fost incorect, apoi Răspunsul a fost greșit. Vestea este rea. Verbul, însă, nu este negat. Cuvinte ca nedrept sau greșit nu țin locul lui nu.',
      'Despre aceeași faptă poți face două enunțuri afirmative și două negative. La cele negative, nu stă numai lângă predicat. Nu îl împrăștii prin restul propoziției ca să pară mai tare.'
    ].join('\n\n'),
    example: [
      'Nu vin azi la tine refuză. Este negativă. Da, vin azi la tine acceptă. Este afirmativă. Forma ambelor este bună.',
      'Rămân afirmative, fiecare separat: A fost nedrept, apoi A fost incorect, apoi Răspunsul a fost greșit. Vestea doare, dar verbul nu primește nu.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Vin la antrenament este afirmativă. Nu vin la antrenament este negativă. A fost incorect să mutăm ora rămâne afirmativă, fiindcă nu nu stă lângă predicat. S-a schimbat decizia, nu regula formei.'
    }],
    practice: [
      '1) De ce Nu vin este negativă, iar Vin este afirmativă?',
      '2) Cum clasifici Nu vin azi la tine și Da, vin azi la tine, ca faptă de comunicare și ca formă?',
      '3) De ce rămân afirmative, fiecare în parte, A fost incorect, apoi A fost nedrept, apoi Răspunsul a fost greșit?',
      '4) Când vestea este rea, dar propoziția rămâne afirmativă, ce s-a schimbat: decizia sau regula?'
    ].join('\n\n'),
    answers: [
      'În Nu vin, nu stă lângă predicat. Vin nu are acest nu.',
      'Prima este refuz și propoziție negativă. A doua este acceptare și propoziție afirmativă. Ambele pot fi corecte ca formă.',
      'Nu neagă verbul. O veste rea nu face singură propoziția negativă.',
      'S-a schimbat doar hotărârea. Regula formei a rămas. O idee urâtă nu hotărăște forma.'
    ],
    mistakes: 'Nu pui eticheta negativă doar fiindcă vestea este rea. Nedrept, incorect și greșit nu neagă verbul. Nu se așază lângă predicat, nu oriunde în propoziție.',
    tryThis: 'Despre aceeași faptă, fă două enunțuri afirmative și două negative. Afirmativele pornesc de la Vin și de la Da, vin azi la tine. Negativele pornesc de la Nu vin și de la Nu vin azi la tine. Ține nu doar lângă predicat. Adaugă, separat, A fost incorect, apoi A fost nedrept, apoi Răspunsul a fost greșit, și arată că rămân afirmative.',
    keyPoints: [
      'Negativă este propoziția în care nu stă lângă predicat. Afirmativă este cea fără acest nu.',
      'Vestea rea nu schimbă singură forma. Atât da, cât și nu pot sta corect.'
    ]
  }),

  lesson({
    id: 'acte-vorbire',
    title: 'Acte de vorbire',
    kind: 'comunicare',
    boxes: [{
      type: 'definitie',
      title: 'Fapta din verb',
      text: 'Actul de vorbire este fapta făcută chiar prin verb. Predicatul actului îl rostește doar persoana care are rolul potrivit.'
    }],
    theory: [
      'Unele verbe nu povestesc fapta: o fac. Din grup fac parte, în altă ordine, a ruga, a renunța, a declara, a porunci și a mărturisi. Predicatul actului este verbul care face fapta, nu orice alt verb din aceeași propoziție.',
      'Vorba are putere doar în gura persoanei cu rolul potrivit. Declară președintele. Liniștea o cere profesorul. O declarație oficială o rostește conducătorul, nu oricine se află în sală. Schimbi persoana și actul se golește.',
      'Enunțul Declar deschisă ședința îi aparține celui care conduce. Aici predicatul este declar. Un coleg fără rol poate repeta vorbele, dar nu deschide ședința. Rolul lipsește, deci fapta nu se face.',
      'În Vă rog să tăceți, fapta de a ruga stă în rog. Tăceți spune doar ce se cere. Dacă iei tăceți drept predicat al actului, muți rugămintea într-o poruncă goală.',
      'Porunca fără rol nu mai are rost. Profesorul poate cere liniște. Colegul de bancă, cu aceleași cuvinte, nu dă o poruncă valabilă. Persoana s-a schimbat, actul s-a golit.',
      'A mărturisi și a renunța cer același drept. Le spui când rolul îți dă voie să mărturisești sau să renunți. Altfel verbul rămâne o imitație.',
      'Trei enunțuri ajung. La declarație stă conducătorul, cu Declar deschisă ședința. La rugăminte arăți că predicatul este rog. La poruncă stau vorbele prin care profesorul cere liniște.'
    ].join('\n\n'),
    example: [
      'Cel care conduce spune Declar deschisă ședința. Predicatul este declar. Fără rol, un coleg nu poate deschide ședința, chiar dacă repetă vorbele.',
      'La enunțul Vă rog să tăceți, actul stă în rog. Tăceți nu este predicatul actului. Liniștea o poate cere profesorul. Spusă de cine nu are rolul, porunca nu mai are rost.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Președintele poate declara. Profesorul poate cere liniște. Dacă Ioana, fără rol de conducător, spune Declar deschisă ședința, actul nu se face. La fel, a mărturisi și a renunța cer persoana îndreptățită.'
    }],
    tryThis: 'Alcătuiți trei enunțuri. La declarație pune Declar deschisă ședința. O rostește conducătorul. Un coleg nu o poate spune. Pentru rugăminte ia Vă rog să tăceți. Actul stă în rog, iar tăceți nu ține locul. La poruncă ia vorbele prin care profesorul cere liniște. Numeste și actele a mărturisi și a renunța.',
    keyPoints: [
      'Prin verb faci fapta actului, iar predicatul este tocmai verbul acela.',
      'Îl rostește persoana cu rolul potrivit. Dacă persoana se schimbă, declarația, rugămintea sau porunca își pierd rostul.'
    ]
  }),

  lesson({
    id: 'imagine-text',
    title: 'Legi imaginea de text',
    kind: 'comunicare',
    boxes: [{
      type: 'regula',
      title: 'Împreună',
      text: 'Desenul și fraza se citesc împreună. Spui ce au în comun: aceeași emoție sau o contrazicere. Imaginea nu este decor.'
    }],
    theory: [
      'Ca să legi imaginea de text, pui desenul lângă frază și spui partea comună. Desenul nu este podoabă. Dacă rămâi doar la linii și uiți fraza, ai sărit textul. Cele două se citesc laolaltă.',
      'Numești bucata care te-a făcut curios. Legătura poate fi o emoție împărtășită. Poate fi și o contrazicere. La emoția comună, chipul și fraza spun același lucru. La contrazicere, chipul spune una, fraza spune alta.',
      'În desen, băiatul are sprâncenele ridicate. Fraza spune că a auzit un preț uriaș. Tocmai bucata aceasta trezește curiozitatea. Emoția comună este mirarea. Nu este un zâmbet de bucurie.',
      'Dacă te oprești la sprâncene și uiți prețul, sari textul. Imaginea nu stă lângă frază ca ornament. Mirarea se vede și în chip, și în vestea despre prețul uriaș.',
      'Scena se închide în trei pași, în ordine. Întâi spui conținutul. Apoi spui ce observi. La urmă alegi o faptă a ta și o legi prin pentru că. Aceiași pași se aplică textului deschis în fața ta.',
      'La băiat, conținutul unește sprânceana ridicată cu prețul uriaș. Privirea îl așază lângă preț. Fapta ta poate fi să rămâi lângă el, pentru că a auzit un preț uriaș. Nu înlocui mirarea cu bucuria.',
      'Contrazicerea se lucrează la fel, dar concluzia se schimbă. Când fața nu face ce spune textul, o spui pe nume. Bucata care te face curios rămâne cea din frază, nu un amănunt de decor.'
    ].join('\n\n'),
    example: [
      'Conținut: desenul îl arată pe băiat cu sprâncenele ridicate, iar fraza spune că a auzit un preț uriaș. Privire: îl vezi lângă prețul acela uriaș.',
      'Faptă: ai rămâne lângă el, pentru că prețul auzit era uriaș. Legătura este mirarea, nu zâmbetul de bucurie. Desenul nu este decor.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Dacă ai descrie doar sprâncenele, ai sări textul. Secvența care stârnește curiozitatea este prețul uriaș. Emoția comună este mirarea. Pașii rămân trei: conținut, privire, faptă legată prin pentru că.'
    }],
    tryThis: 'În desen, fata își ține mâinile la urechi. Fraza spune că vestea auzită era bună și că ea a zâmbit. Fața desenată nu zâmbește, deci legătura este o contrazicere. Curiozitatea vine din vestea bună. În trei propoziții, arată conținutul, privirea și fapta ta, legate la final prin pentru că.',
    keyPoints: [
      'Desenul și fraza se citesc împreună, iar legătura este o emoție comună sau o contrazicere.',
      'Spui conținutul, spui ce observi, apoi alegi o faptă a ta și o legi prin pentru că.',
      'Descrierea doar a desenului sare textul și lasă imaginea drept decor.'
    ]
  }),

  lesson({
    id: 'subiect',
    title: 'Subiectul, propoziția și acordul',
    kind: 'limba',
    boxes: [{
      type: 'definitie',
      title: 'Cine face',
      text: 'Subiectul arată cine face fapta sau despre cine se spune ceva, alături de predicat. Un termen îl face simplu. Mai mulți termeni îl fac multiplu.'
    }],
    theory: [
      'La întrebarea cine face, un singur termen dă subiect simplu. Așa stau Radu desenează și Pisica doarme. Doi termeni, sau mai mulți, dau subiect multiplu și urcă predicatul la plural.',
      'Propoziția simplă păstrează doar subiectul și predicatul. Modele: Omul a plecat, apoi Elevii notează. Cea dezvoltată mai primește cuvinte legate de subiect ori de predicat.',
      'Dezvoltată este Omul obosit a plecat de acasă. Dezvoltată este, separat, Elevii de la biologie notează celula în caiet. Are materia și un obiect. Verbul rămâne notează. Materia este biologia.',
      'Dacă tai amănuntele, propoziția se subțiază. Le pui la loc și se îngroașă. Ajunge un loc sau o însușire. Pasărea cântă este simplă. Pasărea mică cântă în curte este dezvoltată.',
      'Acordul potrivește predicatul cu subiectul, la număr și la persoană. Pentru eu, la prezent, a citi dă citesc. Formele merg și la tu, la el și la ei. Când treci la plural, se schimbă și adjectivul: din băiat înalt se face băieți înalți.',
      'După conectorul apoi, două nume cer predicatul la plural. Întâi stă A înflorit un trandafir. Urmează au înflorit o lalea și un iris. Florile sunt două.'
    ].join('\n\n'),
    example: [
      'Ana și Ioana cântă strânge doi termeni, așa că verbul urcă la plural. Radu desenează are un singur termen. Propoziția Elevii de la biologie notează celula în caiet este dezvoltată. Verbul rămâne notează.',
      'Un trandafir cere A înflorit. Două flori, laleaua și irisul, cer au înflorit. Din băiat înalt se face băieți înalți.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Pisica doarme are subiect simplu. Pisica și câinele dorm are subiect multiplu. Omul a plecat este simplă. Omul obosit a plecat de acasă este dezvoltată, fiindcă are și o caracteristică, și un loc.'
    }],
    practice: [
      '1) Desparte subiectele simple de cele multiple. Simplele: Radu desenează, apoi Pisica doarme. Multiplele: Ana și Ioana cântă. Apoi Radu și Ana desenează. Apoi Pisica și câinele dorm. Apoi O pisică și un câine dorm.',
      '2) De ce Omul a plecat și Elevii notează sunt simple? De ce sunt dezvoltate Omul obosit a plecat de acasă și, separat, Elevii de la biologie notează celula în caiet? Ce verb rămâne și care este materia?',
      '3) Cum se acordă a citi la eu, la tu, la el și la ei? Ce devine băiat înalt la plural?',
      '4) De ce A înflorit un trandafir stă la singular, iar o lalea și un iris cer au înflorit? Ce fel de propoziție este Pasărea mică cântă în curte?'
    ].join('\n\n'),
    answers: [
      'Simple: Radu desenează, apoi Pisica doarme. Multiple: Ana și Ioana cântă, apoi Radu și Ana desenează, apoi Pisica și câinele dorm, apoi O pisică și un câine dorm. La cele multiple, predicatul stă la plural.',
      'Cele simple au doar subiect și predicat. Cele dezvoltate mai au însușire, loc, materie sau obiect. Verbul rămâne notează. Materia este biologia.',
      'La eu: citesc. La tu: citești. La el: citește. La ei: citesc. Din băiat înalt se face băieți înalți.',
      'Trandafirul este unul, deci predicatul stă la singular. Laleaua și irisul sunt două, deci predicatul stă la plural. Pasărea mică cântă în curte este dezvoltată, fiindcă are însușire și loc.'
    ],
    mistakes: 'Doi termeni nu primesc predicatul la singular. Un loc sau o însușire îngroașă propoziția, chiar dacă este scurtă. La plural, și adjectivul își schimbă forma, nu doar verbul.',
    tryThis: [
      'Notează Pisica doarme, cu un termen, și Ana și Ioana cântă, cu doi. Adaugă Radu și Ana desenează. Separat, Pisica și câinele dorm. Separat, O pisică și un câine dorm.',
      'Pune Omul a plecat, doar cu subiect și predicat, și Pasărea mică cântă în curte, cu însușire și loc. La științe scrie Elevii de la biologie notează celula în caiet. Pentru flori, întâi A înflorit un trandafir. Urmează au înflorit o lalea și un iris. Încheie cu băiat înalt și cu băieți înalți.'
    ].join('\n\n'),
    keyPoints: [
      'Un termen face subiectul simplu. Mai mulți termeni îl fac multiplu și urcă predicatul la plural.',
      'Propoziția simplă păstrează numai subiectul și predicatul. O îngroașă un loc sau o însușire.',
      'Predicatul se potrivește la număr și la persoană. La plural, adjectivul din grup își schimbă și el forma.'
    ]
  }),

  lesson({
    id: 'atribut',
    title: 'Atributul și detaliul',
    kind: 'limba',
    boxes: [{
      type: 'definitie',
      title: 'Lângă substantiv',
      text: 'Atributul stă lângă un substantiv și face grup cu el. Răspunde la care, la ce fel și la al cui. Locul faptei nu este atribut.'
    }],
    theory: [
      'Atributul precizează substantivul ori îi dă o caracteristică. Întrebările lui sunt care, ce fel, al cui. Trei modele scurte: om glumeț, apoi caietul nou, apoi geaca Anei. Locul faptei nu îl dă atributul.',
      'Grupul pe masă ține de verb, nu de substantivul carte. Grupul în curte este loc, nu atribut. În Cartea stă pe masă, pe masă nu descrie cartea. În Copiii aleargă în curte, în curte nu descrie copiii.',
      'Enunțul Prietenul cel nou a adus atlasul vechi are două atribute, câte unul pentru fiecare substantiv. De prieten ține cel nou. De atlas ține vechi. La mingea roșie, atributul este roșie: arată felul mingii.',
      'Bogăția descrierii este detaliul textului. Nu numeri rândurile. Numeri atributele de lângă substantive. Cu cât sunt mai multe atribute, cu atât descrierea este mai bogată. Un text lung, dacă nu descrie nimic, nu are automat mai mult detaliu.',
      'Le cauți și la științe, iar materia o spui pe nume. În Celula vegetală are perete, vegetală este atributul. Materia este biologia. Caietul nou albastru strânge două atribute: nou, alături de albastru.',
      'Pune alături Cățelul năzdrăvan visa pisici negre și Pisica a intrat. Primul are mai multe atribute. Detaliul se vede din atribute, nu din lungimea rândului. Pisica a intrat spune o faptă, fără caracteristică.'
    ].join('\n\n'),
    example: [
      'La Prietenul cel nou a adus atlasul vechi, de prieten ține cel nou, iar de atlas ține vechi. La Celula vegetală are perete, vegetală este atribut. Materia este biologia.',
      'În curte arată locul faptei și nu intră la atribute. Față de Pisica a intrat, enunțul Cățelul năzdrăvan visa pisici negre este mai bogat în atribute.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Mingea roșie are un atribut, roșie. Caietul nou albastru are două, nou și albastru. Geaca Anei răspunde la al cui. Pe masă, lângă stă, ține de predicat, nu de carte.'
    }],
    practice: [
      '1) Ce întrebări primește atributul? Numeste atributele din om glumeț, din caietul nou, din geaca Anei, din mingea roșie și din caietul nou albastru.',
      '2) De ce pe masă și în curte nu sunt atribute în Cartea stă pe masă și în Copiii aleargă în curte?',
      '3) La enunțul Prietenul cel nou a adus atlasul vechi, de ce substantive țin atributele? În Celula vegetală are perete, ce rol are vegetală și care este materia?',
      '4) De ce Cățelul năzdrăvan visa pisici negre are mai mult detaliu decât Pisica a intrat?'
    ].join('\n\n'),
    answers: [
      'Întrebările sunt care, ce fel și al cui. Atribute: glumeț, nou, Anei, roșie, iar la caiet nou și albastru.',
      'Pe masă ține de verb, nu de substantivul carte. În curte arată locul, nu o însușire a copiilor.',
      'Cel nou ține de prieten, vechi ține de atlas. Vegetală este atribut, iar disciplina este biologia.',
      'Are mai multe atribute. Detaliul se numără după atribute, nu după rânduri. Un text lung fără descriere nu are automat mai mult detaliu.'
    ],
    mistakes: 'Locul faptei nu se trece la atribute. Pe masă nu ține de substantivul carte. Rândurile multe nu înseamnă, singure, mai mult detaliu.',
    tryThis: 'Notează mingea roșie, apoi caietul nou albastru, apoi om glumeț, apoi geaca Anei. La Copiii aleargă în curte și la Cartea stă pe masă arată că locul ține de verb. Adaugă Prietenul cel nou a adus atlasul vechi. La Celula vegetală are perete numește materia: biologia. Pune față în față Cățelul năzdrăvan visa pisici negre și Pisica a intrat.',
    keyPoints: [
      'Atributul stă lângă substantiv și răspunde la care, la ce fel și la al cui.',
      'Locul faptei ține de predicat. Detaliul se măsoară numărând atributele, și la științe, unde spui disciplina.'
    ]
  }),

  lesson({
    id: 'plan-idei',
    title: 'Ideea principală și planul',
    kind: 'redactare',
    boxes: [{
      type: 'definitie',
      title: 'Esențialul',
      text: 'Ideea principală spune cine face și ce face. Planul simplu înșiră aceste idei. Cel dezvoltat pune dedesubt și ideile secundare, în ordinea din text.'
    }],
    theory: [
      'Din fiecare secvență reții esențialul: cine și ce face. Asta este ideea principală. Unui paragraf îi revine una singură. Secundara o lărgește printr-un exemplu, printr-un nume sau printr-un loc.',
      'Înainte de plan cauți cuvintele necunoscute. Apoi tai secvențele. Vezi dacă textul are deja un enunț gata, pe care îl poți scurta. La științe privești și titlul, ca să nu sari tema și să nu pui alta, născocită.',
      'Abia apoi întrebi ce, de ce, cum, unde, când. Răspunsurile sunt detalii, nu esențialul. Unde cere un amănunt de loc. Nu urca locul în locul ideii principale.',
      'Planul simplu înșiră ideile principale. Cel dezvoltat lasă esențialul deasupra și pune secundarele dedesubt, în ordinea textului. Nu copia paragraful întreg și nu-l boteza idee. Ideea este scurtă.',
      'Scrierea dezvoltată are două chipuri. Cu I și cu II: întâi esențialul, apoi secundarele. Sau cu cifra 1, iar dedesubt literele a și b. Sub ideea 1, detaliile stau la a și la b. Nu porni de la final doar fiindcă pare mai viu.',
      'Când povestești planul, leagă ideile cu mai întâi, cu apoi, cu după ce și cu în final. Ultima idee primește în final. Ordinea rămâne cea din text.',
      'Albinele duc polenul până în grădină, ca să hrănească stupul. Esențialul: cară polen. La unde răspunde grădina. La de ce răspunde hrana stupului. Domeniul este natura.',
      'Esențialul scenei: albinele lucrează împreună. Regina depune ouă. Lucrătoarele aduc polen. Mai întâi albinele părăsesc stupul. Apoi aduc polen. După hrănirea larvelor, în final închid ziua.'
    ].join('\n\n'),
    example: [
      'Conținut: albinele duc polenul până în grădină, pentru hrana stupului. Ouăle le depune regina. Ziua se închide la final. Privire: vezi albinele, polenul, grădina, regina și stupul.',
      'Faptă: ai sta lângă stup, pentru că polenul pleacă spre hrana stupului. Grădina rămâne răspuns la unde, nu ideea principală.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Ideea 1 stă deasupra: albinele lucrează împreună. Dedesubt, cu a și b: lucrătoarele aduc polen, regina depune ouă. Conectorii merg mai întâi, apoi, după ce, în final. Domeniul este natura.'
    }],
    tryThis: 'Pune ideea 1 deasupra: mai întâi albinele părăsesc stupul. Dedesubt, cu a și cu b, lucrătoarele aduc polen, iar regina depune ouă. După hrănirea larvelor vine închiderea zilei, legată prin în final. Domeniul este natura. Grădina răspunde la unde. În trei propoziții arată conținutul, privirea și fapta ta, legate prin pentru că.',
    keyPoints: [
      'Ideea principală este esențialul unei secvențe și răspunde la cine și ce face. Secundara aduce un exemplu, un nume sau un loc.',
      'Planul simplu înșiră ideile principale. Cel dezvoltat le pune deasupra, iar dedesubt stau a și b, în ordinea textului.',
      'La albine, esențialul este că duc polenul. La unde răspunde grădina. Ultima verigă se leagă prin în final.'
    ]
  }),

  lesson({
    id: 'capcana-nimeni',
    title: 'Negația și întrebarea pe dos',
    kind: 'limba',
    boxes: [{
      type: 'regula',
      title: 'Nume sau negație',
      text: 'Doar nu așezat lângă predicat face propoziția negativă. Dacă Nimeni este un nume, el este subiect, iar enunțul rămâne afirmativ.'
    }],
    theory: [
      'Nu orice vorbă care sună a refuz neagă propoziția. Negativă este numai cea cu nu lângă predicat. Nimeni poate fi nume de persoană. Atunci este subiect, nu negație. Numele nu neagă verbul.',
      'Enunțul Nimeni a intrat spune că a intrat persoana chemată așa. Forma este afirmativă. Enunțul Nu a intrat nimeni este negativ, fiindcă nu stă lângă predicat. Aceeași deosebire apare și la sunat.',
      'Eroul spune că îl cheamă Nimeni. Dacă altcineva rostește Nimeni a sunat, verbul nu este negat. Propoziția rămâne afirmativă. Perechea negativă este Nu a sunat nimeni. Te uiți la nu, nu la cât de gol pare numele.',
      'Întrebarea pe dos nu așteaptă un răspuns. Ea afirmă pe dos, ca să îl convingă pe celălalt. Formula Cum să nu-mi placă poate fi o prefăcătorie. O propoziție cu îmi place nu este, automat, bucurie sinceră.',
      'Sensul se prinde din fapta de dinainte, nu doar din semnul întrebării. Un oftat care arată plictiseală face întrebarea prefăcută. Sensul adevărat: nu îi place.',
      'Andrei, când vede tema, oftează. Abia apoi rostește Cum să nu-mi placă tema asta? Din oftat se vede că tema nu îi place. Semnul de la final, singur, te-ar păcăli să crezi că așteaptă un răspuns sau că se bucură.'
    ].join('\n\n'),
    example: [
      'Eroul poartă numele Nimeni. Nimeni a sunat rămâne afirmativă, fiindcă verbul nu este negat. Nu a sunat nimeni este negativă: nu stă lângă predicat.',
      'Andrei oftează la vederea temei. Apoi rostește Cum să nu-mi placă tema asta? Din oftat se înțelege sensul adevărat: tema nu îi place.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Nimeni a intrat este afirmativă, dacă Nimeni este numele. Nu a intrat nimeni este negativă. O întrebare pe dos se citește din fapta de dinainte, nu din semnul de la final.'
    }],
    practice: [
      '1) De ce Nimeni a intrat este afirmativă, iar Nu a intrat nimeni este negativă?',
      '2) Dacă Nimeni este numele eroului, cum stau Nimeni a sunat și Nu a sunat nimeni?',
      '3) De ce Cum să nu-mi placă tema asta, spus după un oftat, nu este bucurie sinceră?',
      '4) Ca să prinzi sensul unei întrebări pe dos, te uiți la semnul întrebării sau la fapta de dinainte?'
    ].join('\n\n'),
    answers: [
      'Nimeni este aici un nume, deci este subiect, iar verbul nu este negat. În a doua, nu stă lângă predicat, deci propoziția este negativă.',
      'Nimeni a sunat stă pe afirmativ. Forma negativă este Nu a sunat nimeni.',
      'Andrei oftează când vede tema. Oftatul arată plictiseală, iar sensul adevărat este că nu îi place.',
      'La fapta personajului de dinainte. Semnul întrebării, singur, nu arată dacă întrebarea este sinceră.'
    ],
    mistakes: 'Numele Nimeni nu se ia drept negație. Întrebarea cu îmi place nu este, automat, bucurie. Sensul pe dos se citește din oftat, nu doar din semnul întrebării.',
    tryThis: 'Scrie Nimeni a intrat și arată că Nimeni este nume, deci enunțul este afirmativ. Scrie Nu a intrat nimeni. Arată locul lui nu: lângă predicat. După aceea arată scena: Andrei vede tema, oftează și rostește Cum să nu-mi placă tema asta? Încheie cu sensul adevărat, tema nu îi place. Adaugă Nimeni a sunat, pe afirmativ, și Nu a sunat nimeni, pe negativ.',
    keyPoints: [
      'Negativă este doar propoziția în care nu stă lângă predicat. Numele Nimeni este subiect și lasă enunțul afirmativ.',
      'Întrebarea pe dos spune contrariul, ca să convingă. Sensul se prinde din fapta de dinainte, ca oftatul lui Andrei.'
    ]
  }),

  lesson({
    id: 'valori',
    title: 'Alegi o valoare și o motivezi',
    kind: 'comunicare',
    boxes: [{
      type: 'regula',
      title: 'Cu faptă',
      text: 'O valoare este un lucru bun, dorit și important. Din lista dată alegi una sau două, nu șirul întreg, și o legi de o faptă, în cel mult 50 de cuvinte.'
    }],
    theory: [
      'În lecție apar adevărul, binele, curajul și loialitatea. Nu le lua pe toate deodată. Din lista primită alegi una, cel mult două. Fără limită, textul devine înșiruire, nu alegere.',
      'Valoarea se leagă de o faptă din text. Ai la dispoziție cel mult 50 de cuvinte. Fără motiv, eticheta de model nu ajunge. Alegerea se vede din faptă. Cuvintele puține te țin la gest, nu la o vorbă goală.',
      'Ana primește lista cu răbdarea, generozitatea și curajul. Ea nu ia tot șirul. Rămâne la curaj. Fapta ei: a stat lângă coleg, deși ceilalți râdeau. Rămâne sub pragul de 50 de cuvinte. Dacă lipsește fapta, nu ajunge să spui că e model.',
      'Scena se închide în trei pași. Întâi spui conținutul. Apoi spui ce observi. La urmă alegi o faptă a ta și o legi prin pentru că. Aceiași pași se aplică textului deschis în fața ta.',
      'La Ana, conținutul este alegerea curajului și rămânerea lângă coleg. Privirea o vede acolo, în timp ce ceilalți râd. Fapta ta poate fi să rămâi și tu, pentru că ea nu a plecat când ceilalți au râs.',
      'Radu are altă listă: binele, adevărul și loialitatea. El nu ia șirul întreg. Alege loialitatea. Fapta: a spus adevărul pentru un prieten. Textul stă sub 50 de cuvinte. Gestul arată de ce a ales valoarea.',
      'Nu amesteca listele. Ana nu adaugă răbdarea doar ca să pară completă. Radu nu adaugă binele dacă gestul lui este loialitatea. O valoare motivată bate trei valori goale.'
    ].join('\n\n'),
    example: [
      'Conținut: Ana alege curajul. A stat lângă coleg, deși ceilalți râdeau. Privire: o vezi lângă el, iar ceilalți râd.',
      'Faptă: ai rămâne și tu lângă coleg, pentru că ea a rămas când ceilalți râdeau. Textul stă sub 50 de cuvinte. Nu spune doar că este un model.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Din lista cu bine, adevăr și loialitate, Radu păstrează loialitatea. A spus adevărul pentru un prieten. Nu ia șirul întreg. Sub 50 de cuvinte, motivul se vede din gest, nu din eticheta de model.'
    }],
    tryThis: 'Radu are lista bine, adevăr, loialitate și alege numai loialitatea. În mai puțin de 50 de cuvinte arată că a spus adevărul pentru un prieten. Nu ia șirul întreg. Fapta trebuie să arate motivul alegerii. În trei propoziții spune conținutul, privirea și fapta ta, legate prin pentru că.',
    keyPoints: [
      'Valoarea aleasă este un lucru bun, dorit și important. Din listă iei una sau două, nu tot șirul.',
      'O legi de o faptă, în cel mult 50 de cuvinte. Fără faptă, eticheta de model nu ajunge.'
    ]
  }),

  lesson({
    id: 'compunere-unitate',
    title: 'Compunerea de la finalul unității',
    kind: 'redactare',
    boxes: [{
      type: 'regula',
      title: 'Trei părți',
      text: 'Compunerea de final respectă tema. Are cel puțin două personaje, fiecare cu atribut, și trei părți. Lungimea minimă este de 80 de cuvinte.'
    }],
    theory: [
      'Textul de la finalul unității trebuie să țină tema. Intră minimum două personaje, iar fiecare primește un atribut. În dialog apar două refuzuri, propoziții negative, deci cu nu. Mai adaugi, pe rând, o afirmație, apoi o nedumerire, apoi o admirație și, la urmă, un îndemn.',
      'Lungimea pornește de la 80 de cuvinte. Părțile sunt trei: introducerea, cuprinsul, încheierea. Închiderea poartă enunțul O faptă se vede în ce faci pentru altul. Fără el, finalul rămâne neterminat.',
      'În introducere o prezinți pe sora cea răbdătoare și spui cererea primită. Nu începe cu deznodământul. Cititorul află întâi persoana și cererea.',
      'Cuprinsul o pune să refuze de două ori, cu nu. Lângă ea stă fratele grăbit. Acolo apar, pe rând, afirmația, nedumerirea, admirația și îndemnul. Atributele se văd în nume. Sunt două personaje, nu unul singur.',
      'Cele două refuzuri au nu lângă predicat. Afirmația spune un fapt. Nedumerirea întreabă. Admirația laudă o faptă. Îndemnul cheamă la o faptă. Nu le lipi pe toate într-o replică goală.',
      'Încheierea spune cum s-a terminat și păstrează pragul de 80 de cuvinte. Ultima propoziție este O faptă se vede în ce faci pentru altul. Cele trei părți rămân vizibile. Nu se amestecă într-un bloc.',
      'Scena se închide în trei pași. Întâi spui conținutul. Apoi spui ce observi. La urmă alegi o faptă a ta și o legi prin pentru că. Despre compunerea ta adaugi Eu aș, urmat de pentru că.'
    ].join('\n\n'),
    example: [
      'Conținut: sora cea răbdătoare, lângă fratele grăbit, refuză de două ori, cu nu. Finalul poartă O faptă se vede în ce faci pentru altul.',
      'Privire: îi vezi pe amândoi, sora și fratele. Faptă: ai rămâne lângă sora cea răbdătoare, pentru că refuză de două ori și tot stă lângă el.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Introducerea o prezintă pe sora cea răbdătoare și cererea. Cuprinsul are două refuzuri cu nu, plus afirmație, nedumerire, admirație și îndemn, lângă fratele grăbit. Încheierea spune sfârșitul și păstrează minimum 80 de cuvinte.'
    }],
    tryThis: 'Alcătuiți compunerea: minimum 80 de cuvinte, cu cele trei părți, introducere, cuprins, încheiere. Două personaje, fiecare cu atribut. În dialog, două refuzuri cu nu, apoi afirmație, nedumerire, admirație și îndemn. Ultima propoziție: O faptă se vede în ce faci pentru altul. Privind compunerea ta, adaugă Eu aș, urmat de pentru că.',
    keyPoints: [
      'Textul ține tema, are minimum 80 de cuvinte și trei părți: introducere, cuprins, încheiere.',
      'Cer două personaje, fiecare cu atribut, și două refuzuri care poartă nu, plus afirmație, nedumerire, admirație și îndemn.',
      'Încheierea spune cum s-a terminat și păstrează formula despre fapta făcută pentru altul.'
    ]
  }),

  lesson({
    id: 'portofoliu',
    title: 'Portofoliul de semestru',
    kind: 'comunicare',
    boxes: [{
      type: 'definitie',
      title: 'Dosarul',
      text: 'Portofoliul strânge semestrul întreg, nu o temă izolată. Are copertă, pagină de titlu, cuprins, fișe și o reflecție despre schimbare.'
    }],
    theory: [
      'Dosarul de semestru nu se reduce la o temă. Îi trebuie copertă, apoi pagină de titlu, apoi cuprins. Fără cele trei, nu se deschide ca un întreg. Coperta anunță. Pagina de titlu numește. Cuprinsul dă ordinea.',
      'Înăuntru stau fișele și lucrările. Stau și temele de echipă, puse în copie, plus foi alese de tine. Nu aduni tot ce ai scris. Alegi ce arată drumul. Copia temei de echipă dovedește lucrul împreună, nu doar tema făcută singur.',
      'Mai treci greșelile care se repetă, punctele tari, punctele slabe și o reflecție: ce s-a schimbat în unitate. Reflecția nu este o notă. Este fraza în care spui ce făceai înainte și ce faci acum.',
      'Coperta fără fișe nu face un portofoliu. Arată îngrijit pe dinafară și este goală pe dinăuntru. Fișele sunt miezul. Fără ele, cuprinsul nu are ce anunța.',
      'Ioana își amintește acordul. Înainte greșea pluralul. Acum numără câți termeni are subiectul. Progresul acesta ține de reflecție. Nu seamănă cu o copertă goală. Dosarul ei are copertă, pagină de titlu, cuprins și fișe.',
      'Pagina cerută se cheamă Portofoliul meu. Ca model ajung două fișe: acordul și enunțul. În text mai apar coperta, cuprinsul, lucrările și temele de echipă, ca să se vadă dosarul întreg, nu o fișă rătăcită.',
      'Reflecția cuprinde pluralul, subiectul, ce îți iese bine și ce îți iese greu. Arată și greșelile repetate, plus schimbarea din unitate. Modelul Ioanei rămâne: pluralul se numără pe termeni.'
    ].join('\n\n'),
    example: [
      'Ioana arată progresul la acord: înainte greșea pluralul, acum numără termenii subiectului. Fraza ține de reflecție.',
      'O copertă goală, fără fișe, nu este portofoliu. Dosarul ei are copertă, pagină de titlu, cuprins și fișe, deci se deschide ca dosar de semestru.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Radu își titrează pagina Portofoliul meu. Pune fișele acordul și enunțul, amintește lucrările și temele de echipă și scrie că punctul tare este ordinea, iar punctul slab era pluralul. Notează și greșelile care se repetă.'
    }],
    tryThis: 'Alcătuiți o pagină de portofoliu. Titlul: Portofoliul meu. Două fișe: acordul și enunțul. Introdu coperta, cuprinsul, lucrările și temele de echipă. În reflecție pune pluralul, subiectul, ce îți iese bine și ce îți iese greu. Arată că notezi greșelile care se repetă și ce s-a schimbat în unitate.',
    keyPoints: [
      'Portofoliul este dosarul semestrului: copertă, pagină de titlu, cuprins, fișe, lucrări și teme de echipă.',
      'Reflecția trece greșelile repetate, punctele tari, punctele slabe și schimbarea, ca la pluralul numărat pe termeni.',
      'Coperta fără fișe nu ține loc de dosar.'
    ]
  })
]};
