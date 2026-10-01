'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = { lessons: [
  lesson({
    id: 'cazuri',
    title: 'Cinci cazuri, cinci roluri',
    kind: 'limba',
    boxes: [{
      type: 'definitie',
      title: 'Cinci cazuri',
      text: 'Nominativ, acuzativ, genitiv, dativ, vocativ. Nominativul dă subiectul și numele predicativ. Vocativul strigă și nu primește funcție.'
    }],
    theory: [
      'În Ioana este prietena mea, ambele substantive sunt la nominativ: unul subiect, altul nume predicativ. La acuzativ poate sta un atribut cu prepoziție. Model: Vaza cu flori este din porțelan.',
      'Tot acuzativul primește complementul direct. Un model este Citesc o carte. Alt model este L-am cunoscut pe autor. Complementul cu prepoziție: Discutăm despre poezie. Circumstanțialul: Săptămâna aceasta merg la teatru.',
      'Cazul genitiv poate fi atribut. Model: Lumea teatrului este fascinantă. Poate fi și nume predicativ: Sentimentele sunt ale cititorilor. Poate fi și circumstanțial.',
      'Dativul poate fi complement indirect ori atribut. Un model este I-am dat mamei un cadou. Altul: Maria este nepoată mamei mele. Vocativul doar cheamă.',
      'Centru de grup nominal, trei modele: copacii albi, apoi cartea de pe masă, apoi sunetul viorii. Adjunct în același grup: fulgii de nea și sunetul ploii. Adjunct lângă verb: recită poezia, mă gândesc la prietenii mei.',
      'Propoziția de analizat este Casa cu etaj are flori roșii la balcoane. Cuvântul Casa stă la nominativ, ca subiect și ca centru. Grupul cu etaj este adjunct, atribut cu prepoziție, acuzativ.',
      'Flori este complement direct, acuzativ. Roșii nu este substantiv, este adjectiv. La balcoane este circumstanțial de loc, tot acuzativ.',
      'Propoziția Tema textului este iubirea pune Tema ca subiect, la nominativ, și iubirea ca nume predicativ, tot nominativ.',
      'Propoziția S-a îndreptat spre strada cu teii bătrâni pune strada la circumstanțial de loc, acuzativ. Teii este adjunct.',
      'Cu atenție: circumstanțial de mod, acuzativ. Despre susținerea: complement cu prepoziție. La bunicii mei: tot complement cu prepoziție.',
      'Colegilor: complement indirect, dativ. La teatru: circumstanțial de loc. Sâmbătă: circumstanțial de timp.',
      'Cu emoție, pe rând: Emoția a trecut, subiect. Simt emoția, complement direct. Vorbesc despre emoție, complement cu prepoziție. Așteaptă cu emoție, circumstanțial de mod.',
      'Cu îmbrățișare: Îmbrățișarea este caldă, nominativ. Aștept îmbrățișarea, acuzativ. Căldura îmbrățișării rămâne, genitiv. M-am bucurat îmbrățișării, dativ.',
      'Model, pe propoziția noastră I-a strâns mâna: mâna este complement direct, substantiv comun și simplu, feminin singular, acuzativ, cu articolul hotărât a.'
    ].join('\n\n'),
    example: [
      'În Ioana este prietena mea, ambele substantive stau la nominativ. La Citesc o carte, cartea este complement direct, acuzativ. Lumea teatrului aduce genitivul. La I-am dat mamei un cadou, mamei este dativ.',
      'Casa este subiect. Iubirea este nume predicativ. În I-a strâns mâna, mâna este complement direct. Vocativul rămâne fără funcție.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Așteaptă cu emoție pune emoție la acuzativ, circumstanțial de mod. Căldura îmbrățișării rămâne pune îmbrățișării la genitiv. M-am bucurat îmbrățișării o pune la dativ.'
    }],
    practice: [
      '1) La Casa cu etaj are flori roșii la balcoane, ce caz și ce funcție au Casa și flori? Ce este roșii?',
      '2) În Tema textului este iubirea, ce funcție are iubirea?',
      '3) Ce funcție au cu atenție, colegilor și sâmbătă?',
      '4) În I-a strâns mâna, ce funcție are mâna și cu ce articol stă?'
    ].join('\n\n'),
    answers: [
      'Casa este nominativ, subiect. Flori este acuzativ, complement direct. Roșii este adjectiv, nu substantiv.',
      'Nume predicativ, la nominativ.',
      'Cu atenție este circumstanțial de mod. Colegilor este complement indirect, dativ. Sâmbătă este circumstanțial de timp.',
      'Complement direct, cu articolul hotărât a.'
    ],
    mistakes: 'Roșii, lângă flori, nu se ia drept substantiv. Vocativul cheamă, dar nu capătă funcție. Al cui ține de genitiv, cui ține de dativ.',
    tryThis: 'Fă patru enunțuri cu emoție: subiect, complement direct, complement cu prepoziție, circumstanțial de mod. Fă patru enunțuri cu îmbrățișare, câte unul la fiecare caz în afară de vocativ. Pentru la teatru și la bunicii mei, scrie funcția.',
    keyPoints: [
      'Cazurile sunt cinci: nominativ, acuzativ, genitiv, dativ, vocativ.',
      'Subiectul și numele predicativ stau la nominativ. Acuzativul apare des cu prepoziție sau drept complement direct.',
      'La al cui răspunde genitivul, la cui răspunde dativul, iar vocativul doar strigă.'
    ]
  }),
  lesson({
    id: 'prepozitie',
    title: 'Leagă și cere un caz',
    kind: 'limba',
    boxes: [{
      type: 'definitie',
      title: 'Prepoziția',
      text: 'Nu se schimbă după gen sau număr. Leagă un atribut ori un complement de termenul determinat și cere un caz.'
    }],
    theory: [
      'Un singur cuvânt, deci simple: la, lângă, între, în, apoi sub, de, cu. Mai multe cuvinte, deci compuse: înspre, despre, de pe lângă, până la, de la.',
      'Locuțiunea se poartă la fel. Exemple: în spatele, în afară de, în fața, față de. Aici rămân îmbinări libere din punct de vedere, cu scopul, din pricina și din cauza.',
      'Acuzativul este cerut de cele mai multe, simple sau compuse, ca de sub și până la. La fel unele locuțiuni: conform cu, în afară de, față de.',
      'Genitiv cer contra și asupra, formele venite din adverbe cu articol, precum înaintea, dedesubtul, deasupra, și locuțiuni precum în mijlocul, în spatele, în fața, de-a latul, de-a lungul, în susul, în josul.',
      'Dativ cer grație, mulțumită și datorită. Datorită vine dintr-un participiu. Potrivit, contrar, conform, aidoma și asemenea sunt adverbe.',
      'Seria a nu este curată, fiindcă contrar și potrivit sunt adverbe. Seria b are conjuncții, ca să și fiindcă. Seria d amestecă conjuncția deci cu articolul lui.',
      'Seria c este curată: asupra, înaintea, printre, sub. Litera bună este c.',
      'Completările cu sens stau fiecare în fraza ei. Se gândește la anii copilăriei. Apoi: De la vârsta de 6 ani a crescut pe tărâmul bunicilor. Apoi: De la bunici a învățat ce înseamnă libertatea. La urmă: Va păstra mereu în buchetul amintirilor icoana bunicilor.',
      'De pe masă spune că lucrul stătuse deasupra. După masă spune că stătuse în spate. În pauza de masă înseamnă chiar în răstimpul pauzei.',
      'Orașul se leagă cu la, nu cu în. Modelul este Merge la Iași. Gluga nu intră în cap: Și-a pus gluga pe cap.',
      'În frazele cu poezii apar cinci legături. Simple sunt din și cu. Compuse sunt despre, până la și de la.',
      'Frazele, pe rând: Vorbește despre cărți. Stă până la ora închiderii. Împrumută de la bibliotecă. Citește texte din clasici. Ioanei îi plac poeziile cu tema iubirii.',
      'Ce stă înainte depinde de verb, ori de substantiv, prin legătura făcută de prepoziție.'
    ].join('\n\n'),
    example: [
      'La, de și cu sunt simple. Despre și de la sunt compuse. Locuțiune: în fața. Grup liber, aici: din cauza.',
      'Doar seria c are numai prepoziții. Pentru oraș: Merge la Iași. Pentru glugă: stă pe cap. Datorită cere dativul. Contrar rămâne adverb.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'De pe masă înseamnă că obiectul fusese deasupra. După masă înseamnă că fusese în spate. Pentru oraș spui la Iași, nu în Iași.'
    }],
    practice: [
      '1) În frazele cu poezii, care legături sunt simple și care sunt compuse?',
      '2) Care serie este numai din prepoziții: a cu contrar, b cu ca să, c cu asupra, înaintea, printre și sub, sau d cu deci?',
      '3) Ce caz cere datorită și ce sunt conform și potrivit?',
      '4) Cum spui corect drumul spre Iași și locul glugii?'
    ].join('\n\n'),
    answers: [
      'Simple: cu și din. Compuse: de la, până la și despre.',
      'Seria c.',
      'Datorită cere dativul. Conform și potrivit sunt adverbe.',
      'Merge la Iași. Și-a pus gluga pe cap.'
    ],
    mistakes: 'Contrar și potrivit nu sunt prepoziții. Orașul nu se leagă prin în. Gluga nu intră în cap. Din cauza rămâne, aici, grup liber.',
    tryThis: 'Completează separat: anii copilăriei, vârsta de 6 ani, tărâmul bunicilor, bunicii, buchetul amintirilor, cu prepoziția potrivită. Arată deosebirea dintre de pe masă și după masă. Arată de ce seria a nu este curată.',
    keyPoints: [
      'Prepoziția nu se flexionează și leagă un atribut sau un complement. Cele simple au un termen, cele compuse au mai mulți.',
      'Singura serie curată strânge sub, printre, înaintea și asupra. Orașul se leagă prin la, iar gluga stă pe cap.',
      'Datorită cere dativ. Contrar și potrivit sunt adverbe.'
    ]
  }),
  lesson({
    id: 'adjectiv',
    title: 'Grade, acord și topica',
    kind: 'limba',
    boxes: [{
      type: 'definitie',
      title: 'Adjectivul',
      text: 'Este flexibil, arată o însușire și stă pe lângă un substantiv. Se acordă cu el în gen, număr și caz.'
    }],
    theory: [
      'Poate fi propriu-zis: curat, frumos, dulce, bun. Sau venit din altă clasă. Din participiu: emoția transmisă, petala căzută, rochia croită. Din gerunziu: mâncare aburindă. Din adverb: asemenea om și așa copil.',
      'Participialul vine din participiu. Sunt de acest fel femeia aplecată și florile puse în vază. Visătoare, lângă femeie, rămâne propriu-zis acolo, fiindcă numește o însușire, nu o faptă încheiată.',
      'Cel variabil își schimbă forma. Clar are patru: clar, clară, clari, clare. Drag are trei: drag, dragă, dragi. Dulce are două: dulce, dulci. Fără schimbare: cumsecade, gri, roz, bej, kaki.',
      'Număr de forme: nou trei, cuminte două, vechi două, obosit patru, mare două, portocaliu trei. Lung trei, blând trei, șubred trei, strălucitor patru, suav patru, verde două, întreg trei.',
      'Din șirul cuminte, kaki, vesel, cumsecade, bej, relaxat, propice, mare, vechi, roz, verde, gălăgios, fricos, nu se schimbă kaki, cumsecade, bej și roz. Restul se schimbă.',
      'Pozitiv: mobilă veche. Egalitate, în trei formule: tot așa de veche, tot atât de veche, la fel de veche. Superioritate: mai veche. Inferioritate: mai puțin veche.',
      'Relativ de superioritate: cea mai veche. Relativ de inferioritate: cea mai puțin veche. Absolut de superioritate: foarte veche. Absolut de inferioritate: foarte puțin veche.',
      'Nu primesc grade ultim, maxim, plin, complet, viu, nici cele deja la capăt, precum superior sau unic.',
      'De obicei stă după substantiv: stelele strălucitoare. Pus înainte, ia articolul hotărât: strălucitoarele stele. Prin derivare: argintiu, bunicel, neatent, incorect. Prin compunere: verde-deschis, galben-pai, cumsecade.',
      'Sărman înainte arată milă: sărmanul copil. Sărman după substantiv arată lipsa banilor: copil sărman. Biet, de regulă înainte, înseamnă vrednic de milă. Așezat după substantiv, locul nu este cel obișnuit.',
      'Tabloul Lorica cu crizanteme îl semnează Ștefan Luchian. Îl descrii numai când îl vezi. În textul tău subliniezi adjectivele și spui dacă se schimbă. Verde la inferioritate: mai puțin verde. La relativ de superioritate: cea mai verde.'
    ].join('\n\n'),
    example: [
      'Rochia croită este participial. Fata blândă este propriu-zis. Mai veche urcă un grad. Cea mai veche este relativ. Foarte veche este absolut.',
      'Plin stă fără grade. Roz nu se schimbă. Verde face verzi, deci se schimbă. La nou sunt trei forme. La obosit sunt patru. Milă: sărmanul copil. Lipsa banilor: copil sărman.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Frunza mai puțin verde este comparativ de inferioritate. Absolutul mai iese și prin rarisim, prin extrafin sau prin grozav de cald.'
    }],
    practice: [
      '1) Împarte bun, croită, căzută, dulce și aburindă în propriu-zise și în forme venite din verb.',
      '2) Ce grad au mobilă veche, mai veche, cea mai veche și foarte veche?',
      '3) Câte forme au nou, obosit, verde și șubred, și de ce roz nu se schimbă?',
      '4) Ce schimbă locul lui sărman în sărmanul copil față de copil sărman?'
    ].join('\n\n'),
    answers: [
      'Propriu-zise: bun și dulce. Din participiu: croită și căzută. Aburindă vine din gerunziu.',
      'Pozitiv, comparativ de superioritate, superlativ relativ de superioritate, superlativ absolut de superioritate.',
      'Nou are trei, obosit patru, verde două, șubred trei. Roz este invariabil.',
      'Înainte arată milă. După substantiv arată lipsa de bani.'
    ],
    mistakes: 'Plin, ultim și viu nu primesc grade. Roz, bej, cumsecade și kaki nu își schimbă forma. Sărman înainte nu înseamnă sărăcie, ci milă.',
    tryThis: 'Din kaki, vesel, cumsecade, bej, vechi, roz și fricos, desparte variabilele de invariabile. Spune câte forme au întreg, suav, strălucitor, blând, lung, portocaliu, mare, vechi și cuminte. Pune verde la inferioritate și la relativul de sus. Alege trei fără grade: viu, plin, ultim.',
    keyPoints: [
      'Adjectivul arată însușirea și se acordă în gen, număr și caz. Este propriu-zis sau participial, variabil sau nu.',
      'Treptele sunt pozitivul, comparativul și superlativul. Viu, plin și ultim rămân fără trepte.',
      'Nou are trei forme, obosit patru. Sărman înainte înseamnă milă, după substantiv înseamnă lipsă de bani.'
    ]
  }),
  lesson({
    id: 'combinari-adjectiv',
    title: 'Adjectivul centru și adjectivul adjunct',
    kind: 'limba',
    boxes: [{
      type: 'regula',
      title: 'Două roluri',
      text: 'Ca adjunct, stă atribut sau nume predicativ. Ca centru, poate primi un complement sau un circumstanțial.'
    }],
    theory: [
      'Lângă substantiv, adjunctul este atribut: O emoție puternică i-a cuprins sufletul. La fel Experiențe minunate. Legat de subiect prin a fi, este nume predicativ: Lacrimile sunt reci.',
      'Atributul poate fi propriu-zis. Poate veni din participiu: Tabloul pictat a fost expus. Poate veni din gerunziu: Soba fumegândă a fost reparată.',
      'Când este centru, adjectivul primește un substantiv sau un pronume, cu prepoziție sau fără. Acel adaos este complement sau circumstanțial.',
      'În Este amabilă cu musafirii, amabilă este centru, iar cu musafirii este complement. În Copilul este recunoscător lor, recunoscător este centru, lor este adaos. În Este nemâncată de la prânz, nemâncată este centru, de la prânz este circumstanțial.',
      'Locuțiunea adjectivală lucrează ca un adjectiv și poate avea funcție și grade. Bătător la ochi înseamnă vizibil. De ispravă înseamnă vrednic. Cu stare înseamnă înstărit.',
      'Ca vai de el înseamnă jalnic. De folos înseamnă util. Cu dare de mână înseamnă bogat. Oameni de treabă înseamnă oameni cumsecade. Cu scaun la cap înseamnă înțelept.',
      'Ca să nu lipim versuri, analiza stă pe scena noastră. Nora este calmă cu musafirii. Calmă este și nume predicativ, și centru. Complementul ei este cu musafirii. Rochia albă este atribut. Albă este adjunct.',
      'În Jucăria, de Magda Isanos, ultimul adjectiv stă la comparativ de superioritate, fiindcă vine cu mai. Pentru frumos, pozitivul este frumoasă, iar superlativul relativ este cea mai frumoasă.',
      'Din aceeași poezie, fără strofă: miere nu are plural. Aduceri-aminte este locuțiune substantivală. Formele lui șubred sunt trei. Formele lui strălucitor sunt patru.'
    ].join('\n\n'),
    example: [
      'Emoție puternică este atribut. Lacrimile sunt reci dă nume predicativ. La amabilă cu musafirii, adjectivul este centru.',
      'Înțelept se spune cu scaun la cap. Bogat se spune cu dare de mână. Mai frumoasă urcă un grad. Miere stă fără plural.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'De folos înseamnă util, de ispravă înseamnă vrednic. Un sfat de folos și un om de ispravă sunt grupuri cu rol de adjectiv. Șubred are trei forme, strălucitor are patru.'
    }],
    practice: [
      '1) Ce funcție are adjectivul în O emoție puternică i-a cuprins sufletul? Dar în Lacrimile sunt reci?',
      '2) În Este amabilă cu musafirii, care cuvânt este centru și care este adaosul?',
      '3) Ce înseamnă cu scaun la cap, cu dare de mână și bătător la ochi?',
      '4) Ce grad are mai frumoasă și câte forme au șubred și strălucitor?'
    ].join('\n\n'),
    answers: [
      'În primul enunț este atribut. În al doilea este nume predicativ.',
      'Amabilă este centru. Cu musafirii este complementul adjectivului.',
      'Înțelept, bogat, vizibil.',
      'Urcă un grad, comparativ. Șubred: trei forme. Strălucitor: patru forme.'
    ],
    mistakes: 'Atributul stă lângă substantiv. Numele predicativ se leagă prin a fi. Mai frumoasă nu este nici pozitiv, nici superlativ. Miere nu primește plural.',
    tryThis: 'În Copilul este recunoscător lor și în Este nemâncată de la prânz, arată centrul și adaosul. Dă înțelesul pentru de ispravă, pentru cu stare, pentru ca vai de el, pentru de folos și pentru oameni de treabă. Fă un enunț cu de folos și altul cu de ispravă. Pune frumos la pozitiv și la superlativul relativ.',
    keyPoints: [
      'Adjunctul este atribut sau nume predicativ. Centrul poate primi un complement, cum se vede la amabilă cu musafirii.',
      'Înțelepciunea stă în cu scaun la cap. Bogăția stă în cu dare de mână.',
      'Mai frumoasă urcă un grad. La șubred sunt trei forme, la strălucitor patru.'
    ]
  }),
  lesson({
    id: 'sanziene',
    title: '24 iunie, iubire și fertilitate',
    kind: 'comunicare',
    boxes: [{
      type: 'definitie',
      title: 'Sânziene',
      text: 'Sărbătoare populară românească, cu obiceiuri și superstiții, ținută pe 24 iunie. Înseamnă iubire și fertilitate. Se mai spune Drăgaica.'
    }],
    theory: [
      'În aceeași zi, calendarul ortodox pomenește și Nașterea Sfântului Ioan Botezătorul. Numele Sânziene este pus în legătură cu zeița romană Santa Diana, ocrotitoarea vânătorii și a pădurilor.',
      'Alte nume: Frumoasele, Zânele, Drăgaicele. În formularea de la început, Ardealul zice Sânziene, iar Muntenia și Oltenia zic Drăgaică.',
      'Obiceiul este mai vechi decât creștinismul. Pe vremea lui Cantemir, erau și flori, și ființe cu chip omenesc. Fitomorf înseamnă formă de plantă. Antropomorf înseamnă înfățișare de om.',
      'Credința le vede femei frumoase, preotese ale soarelui, zâne bune. Ielele, legate și de Rusalii, aduc rele. Dacă ziua nu le este ținută, și Sânzienele pot strica: vijelie, grindină, holdă stearpă, flori fără leac.',
      'Alte nume de loc: Mireasa, Regina Holdelor, Stăpâna Surorilor, Împărăteasa. Puteri: miros mai tare, leacuri mai tari, copii păziți, bob de grâu mai plin, rod sporit, grindină gonită, păsări mai multe, prunci și ursit.',
      'În noaptea dinainte, fetele ascund flori de sânziene sub pernă, ca să viseze ursitul. Coronițe lăsate afară, ude de rouă în zori, vesteau măritiș.',
      'Cununi prinse spre răsărit, dacă agață păr ori pene, arată viețuitoarea cu an bun. Florile ajung la biserică: se sfințesc, apoi se păstrează.',
      'Furnica roșie, în acea zi, înseamnă noroc. Pe cea din portofel n-o alungi: se crede că aduce bani. Ziua se mai cheamă Amuțitul Cucului. Cuc tăcut mai devreme înseamnă vară secetoasă.',
      'La seceriș: cicoare la brâu, fiertură de iarbă mare pe păr, focuri cu miros tare.',
      'Credința spune că în noaptea aceasta cerurile se deschid. Alaiul are zece zeițe tinere. Jocul ține de Soare și de ziua cea mai lungă. Hora pornește noaptea, înainte de 24 iunie.',
      'A doua hartă a numelor pune Drăgaica în centrul și în sudul Moldovei, în Dobrogea și în Muntenia, iar Sânziana în Bucovina, Maramureș, Oltenia, Banat și Transilvania. Oltenia stă în ambele. Spui pe care te sprijini.',
      'Bâlciuri: Broșteni, Mehedinți, Giurgeni, Ialomița, Pitești, Cărbunești, Olt, Ipătești, Buda, Vrancea, Câmpulung Muscel, Focșani, Buzău. Târgul de Fete stă pe Muntele Găina.',
      'Lângă imagini: Călușul, Drăgaica, Alunelul.',
      'La portofoliu poți lua Muma-Pădurii, Făt-Frumos sau busuioc, plus un fapt de la un popor cu limbă romanică. Dacă nu l-ai citit, scrii că îl cauți. Nu îl născoci.'
    ].join('\n\n'),
    example: [
      'Ziua este 24 iunie. Numele se leagă de Santa Diana. Ardealul zice Sânziene. Muntenia și Oltenia zic Drăgaică.',
      'Nu sunt ca Ielele: rămân zâne bune, însă o zi nerespectată poate aduce grindină. Hora pornește în noaptea dinainte. Târgul de Fete stă pe Muntele Găina.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Florile de sub pernă sunt pentru visul ursitului. Cucul care amuțește mai devreme vestește secetă. Fitomorf înseamnă formă de plantă. Obiceiul e mai vechi decât creștinismul.'
    }],
    tryThis: [
      'În enunțuri: ce sunt Sânzienele, când cad, de unde vine numele în lecție, unde se zice Drăgaică, cum se despart de Iele, două puteri și când începe hora.',
      'Notează perna cu flori și cucul amuțit. Adaugă vechimea, mai mare decât creștinismul, și sensul lui fitomorf: formă de plantă.',
      'Numeste târgul de pe Muntele Găina. La portofoliu, ia un element românesc din listă și o asemănare numai dacă ai citit elementul celălalt.'
    ].join('\n\n'),
    keyPoints: [
      'Pe 24 iunie se țin Sânzienele, sărbătoare de iubire și de fertilitate. Ardealul le zice așa, Muntenia și Oltenia le zic Drăgaică.',
      'Numele se leagă de Santa Diana. Sunt zâne bune, nu ca Ielele, și hora lor pornește în noaptea dinainte.',
      'Târgul de Fete este pe Muntele Găina. Pentru portofoliu, ce nu ai citit nu se inventează.'
    ]
  }),
  lesson({
    id: 'proiect-lada',
    title: 'Lada cu sentimente și tradiții',
    kind: 'comunicare',
    boxes: [{
      type: 'regula',
      title: 'Proiectul',
      text: 'Lucrarea Lada cu sentimente și tradiții românești pune împreună o tradiție și un sentiment. Le arăți prin blog, printr-o pagină web sau prin slide-uri.'
    }],
    theory: [
      'În echipă intrați câte 5 sau 6. Alegeți o tradiție românească și sentimentul legat de ea. Rolurile se despart, ca să nu facă toți același lucru.',
      'Culegătorii adună folclor. Tehnoredactorul așază materia. La sunet, tehnicianul caută melodia. Graficianul aduce imaginile. Raportorul vorbește clasei.',
      'Pașii de lucru sunt șapte. Grila cu inimi, care ar fi a opta, nu predă. Întâi stabiliți cine ce face. Apoi alegeți forma. Căutați informații.',
      'Păstrați ce este viu și specific. Uniți text, imagine și sunet. Controlați împreună dacă e gata. Prezentați colegilor.',
      'Un plan bun poate sta pe Sânziene, la 24 iunie. Sentimentul ales: bucuria verii, legată de ursit. Culegătorul notează data, cum se zice în Ardeal și cum se zice în Muntenia.',
      'Graficianul desenează o coroniță, nu lipește o poză fără sursă. Tehnicianul caută o melodie de horă și nu născocește un titlu neauzit.',
      'Raportorul dă trei fapte plus sentimentul, legate cu pentru că. Ce lipsește din sursă nu se inventează. Hora de nuntă poate fi altă tradiție, dacă o ții pe fapte: cerc, mâini, vătaf.',
      'Forma se potrivește cu rolurile. Blogul cere text și o recomandare. Slide-urile cer imagini desenate și un loc pentru sunet.',
      'Controlul comun întreabă trei lucruri: faptele au sursă, sentimentul se leagă prin pentru că, melodia n-are titlu născocit.',
      'Grila cu inimi măsoară, dar nu înlocuiește materia. Dacă lipsește un fapt, îl cauți. Nu îl completezi ca să umpli o rubrică.',
      'În clasă, raportorul spune trei fapte clare și sentimentul. Se aud data, numele regional și un obicei, nu o poveste fără suport.',
      'Poți lucra și hora de la nuntă, cu Zamfira și Viorel doar ca nume de baladă, fără strofe. Sentimentul poate fi bucuria jocului. Sursa rămâne lecția.'
    ].join('\n\n'),
    example: [
      'Echipa are 5 sau 6 elevi. Rolurile: culegător, tehnoredactor, tehnician de sunet, grafician, raportor. Tradiția din plan: Sânzienele. Sentimentul: bucuria.',
      'Data: 24 iunie. Grila cu inimi nu predă. Un titlu de melodie neauzit nu se scrie.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Raportorul poate spune că pe 24 iunie se țin Sânzienele, că Ardealul le zice așa, și că bucuria verii vine pentru că fetele își visează ursitul. Trei fapte și un pentru că, fără titlu născocit.'
    }],
    tryThis: [
      'Fă planul unei tradiții pe care o poți ține cu fapte din lecții, bunăoară Sânzienele sau hora de la nuntă. Pune rolurile, tradiția, sentimentul și trei fapte adevărate.',
      'Scrie pe rând: cine ce face, forma, documentarea, selecția, îmbinarea, controlul, prezentarea.',
      'Arată că grila cu inimi nu înlocuiește materia. Dacă titlul melodiei îți lipsește, scrie că îl cauți. Nu îl născoci.'
    ].join('\n\n'),
    keyPoints: [
      'Lucrarea pune o tradiție românească lângă un sentiment și o arată pe blog, pe o pagină web sau în slide-uri.',
      'Echipa, de 5 sau 6, are culegător, tehnoredactor, om de sunet, grafician și raportor.',
      'Drumul merge de la roluri până la vorbirea din clasă. Ce nu stă într-o sursă nu se inventează.'
    ]
  }),
  lesson({
    id: 'recap-sentimente',
    title: 'Jucăria de lemn, de la fereastră',
    kind: 'recapitulare',
    boxes: [{
      type: 'atentie',
      title: 'Fără grilă',
      text: 'Închiderea nu stă pe foaia cu puncte și nici pe fișa de observare. Lucrezi scena, versificația și gramatica, fără strofe lipite.'
    }],
    theory: [
      'La clasă, textul deschis poate fi Jucăria, de Magda Isanos, sau Iubire, de Lucian Blaga. Strofele rămân netranscrise. Scena de lucru este a noastră.',
      'Duminică seara, Nora stă la geam. În palmă are o jucărie de lemn, stricată. Lampa dă lumină caldă. Spune că jucăria a rămas frumoasă, însă n-o aruncă, fiindcă nu are alta.',
      'Dorul este sentimentul care rămâne. Tristețea este emoția scurtă. Vorbește fata, la persoana întâi, deci textul e subiectiv. Vocea nu este autoarea.',
      'Roua urcă pe o frunză are 8 silabe. Un catren cu rimă încrucișată leagă rândul 1 de 3 și rândul 2 de 4.',
      'Fapte, fără strofe: în Jucăria, primele patru rânduri au rimă încrucișată. Tot acolo miere nu are plural. Aduceri-aminte este locuțiune substantivală.',
      'Formele: șubred trei, strălucitor patru. Adjectivul frumos, când vine cu mai, urcă un grad. Pozitivul este frumoasă. Relativul de sus este cea mai frumoasă.',
      'În Iubire, strofa întâi încrucișează rima. Repetiția reia un verb de adresare. Enumerația adună anotimpul și focul.',
      'Itemul de măsură are două rânduri, unul cu 9 silabe și altul cu 8. Răspunsul bun este 9–8. Suav este propriu-zis, cu patru forme. Verde are două. Întreg are trei.',
      'Pătruns, la forma pătrunsă, este participial. O întrebare în care florile sunt complement direct: Vezi florile? O exclamație în care suav este nume predicativ: Ce suavă este lumina!',
      'La verde, treapta de jos este frunza mai puțin verde, iar relativul de sus este frunza cea mai verde. Enunț asertiv, cu complement indirect: I-am dat jucăriei un loc pe raft. Forma jucăriei stă la dativ.',
      'Nume predicativ, enunț interogativ: Este lumina strălucitoare? Din scenă faci trei pași, cu alte etichete: ce stă scris, ce observi, ce ai face, cu pentru că.'
    ].join('\n\n'),
    example: [
      'Ce scrie: duminică seara, Nora are în palmă jucăria de lemn stricată și o păstrează, deși s-a stricat, fiindcă nu are alta. Ce vezi: O văd la geam, cu jucăria în palmă.',
      'Aș așeza jucăria pe raft, pentru că Nora n-o aruncă. Modelul încrucișează rima. Mai frumoasă urcă un grad. Itemul de măsură dă 9 și 8.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Vezi florile? pune florile la complement direct, în întrebare. I-am dat jucăriei un loc pe raft pune jucăriei la dativ. Este lumina strălucitoare? pune strălucitoare la nume predicativ.'
    }],
    tryThis: [
      'Pe scena Norei, scrie ce stă scris, ce observi și ce ai face, cu pentru că. Rândul din mijloc începe cu O văd. Pune emoția, sentimentul, persoana și motivul pentru care vocea nu este autoarea.',
      'Numără silabele din Roua urcă pe o frunză și spune rima modelului. Ca fapte: rima de la începutul Jucăriei și rima din strofa întâi a Iubirii. Itemul de măsură dă 9–8.',
      'Spune câte forme au întreg, verde, suav, strălucitor și șubred. Scrie treapta de jos a lui verde și treapta relativă de sus.',
      'Fă un enunț asertiv cu jucărie la complement indirect și unul interogativ cu strălucitoare la nume predicativ. Încheie cu o descriere de minimum 150 de cuvinte despre o sărbătoare: aer, oameni, emoții, o întâmplare de minimum 30 de cuvinte. Poți lua Sânzienele.'
    ].join('\n\n'),
    keyPoints: [
      'Închiderea stă pe scenă, nu pe foaia cu puncte. Nora ține jucăria stricată fiindcă nu are alta.',
      'Modelul numără 8 silabe și încrucișează rima. Mai frumoasă urcă un grad. Cele două rânduri din item măsoară 9 și 8.',
      'Patru forme la suav, două la verde, trei la întreg. Trei la șubred, patru la strălucitor.'
    ]
  })
]};
