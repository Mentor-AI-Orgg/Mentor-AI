const { grids, counts, words, pack } = require('./routil');

function examen() {
  const flashcards = grids([
    {
      id: 'hx-r8e-01', lesson: 'algoritmul-frazei', level: 1, skill: 'apply', point: 'fraza',
      question: 'Ca să numeri propozițiile dintr-o frază, numeri…',
      correct: 'predicatele',
      wrong: ['virgulele', 'majusculele', 'liniuțele'],
      explain: 'Fiecare predicat deschide o propoziție. Virgulele, majusculele și liniuțele pot apărea și înăuntrul unei singure propoziții.'
    },
    {
      id: 'hx-r8e-02', lesson: 'algoritmul-frazei', level: 2, skill: 'analyze', point: 'fraza',
      question: 'În «Irina repetă, fiindcă vrea o notă bună.», câte propoziții sunt?',
      correct: '2',
      wrong: ['1', '3', '4'],
      explain: 'repetă și vrea sunt două predicate. fiindcă le leagă, nu adaugă un al treilea predicat.'
    },
    {
      id: 'hx-r8e-03', lesson: 'doom-capcane', level: 3, skill: 'trap', point: 'acord',
      question: 'Care enunț respectă acordul?',
      correct: 'Fata pe care am văzut-o a plecat.',
      wrong: [
        'Fata pe care am văzut-o au plecat.',
        'Fetele pe care am văzut-o a plecat.',
        'Fata pe care am văzut au plecat.'
      ],
      explain: 'Subiectul fata cere a plecat. pe care am văzut-o reia un complement la feminin singular. au plecat și lipsa lui o strică acordul.'
    },
    {
      id: 'hx-r8e-04', lesson: 'vers-la-prima-vedere', level: 4, skill: 'trap', point: 'figuri',
      question: '«Casa e o scoică.» față de «Casa e ca o scoică.» Prima figură este…',
      correct: 'metaforă',
      wrong: ['comparație', 'enumerație', 'inversiune'],
      explain: 'Fără ca, casa este identificată cu scoica: metaforă. Cu ca rămâne comparație. Nu este o listă și nu este doar o schimbare de topică.'
    },
    {
      id: 'hx-r8e-05', lesson: 'baiatul-din-sat', level: 5, skill: 'false', point: 'text',
      question: 'Text: «Băiatul a tăiat drumul prin holdă, deși îl aștepta poteca.» Care enunț este fals?',
      correct: 'Băiatul a mers doar pe potecă.',
      wrong: [
        'A tăiat drumul prin holdă.',
        'Poteca îl aștepta, dar el a ales altfel.',
        'deși introduce o concesie.'
      ],
      explain: 'Textul spune că a tăiat prin holdă, nu că a rămas pe potecă. Celelalte enunțuri urmează textul.'
    },
    {
      id: 'hx-r8e-06', lesson: 'limba-pe-rand', level: 6, skill: 'trap', point: 'diftong',
      question: 'În «noapte», grupul oa este…',
      correct: 'diftong',
      wrong: ['hiat', 'prefix', 'desinență'],
      explain: 'oa stă în aceeași silabă: noap-te. La hiat, vocalele ar fi în silabe vecine. oa nu este un prefix și nu este desinența.'
    },
    {
      id: 'hx-r8e-07', lesson: 'cinci-compuneri', level: 7, skill: 'analyze', point: 'argument',
      question: 'Într-o compunere de tip argumentare, exemplul trebuie…',
      correct: 'să susțină părerea',
      wrong: ['să o contrazică fără să observi', 'să înlocuiască părerea', 'să fie doar o rimă'],
      explain: 'Exemplul arată că părerea stă în picioare. Dacă o contrazice, trebuie să schimbi fie exemplul, fie părerea. Rima nu argumentează.'
    },
    {
      id: 'hx-r8e-08', lesson: 'foaia-en', level: 8, skill: 'analyze', point: 'fraza',
      question: '«Nu a întârziat fiindcă a dormit, ci fiindcă a ajutat-o pe bunica.» Cauza reală este…',
      correct: 'ajutorul dat bunicii',
      wrong: ['somnul', 'lipsa oricărui motiv', 'faptul că a venit devreme'],
      explain: 'Nu... ci respinge prima cauză și o păstrează pe a doua. A dormit este cauza negată, nu cea reală.'
    }
  ]);
  const tests = [
    ...counts([
      {
        id: 'hz-r8e-01', lesson: 'algoritmul-frazei', level: 6, skill: 'apply', point: 'fraza',
        prompt: 'Câte propoziții are «Irina repetă, fiindcă vrea o notă bună.»?',
        explain: 'Două predicate: repetă și vrea.',
        steps: ['repetă', 'vrea', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r8e-02', lesson: 'foaia-en', level: 8, skill: 'analyze', point: 'fraza',
        prompt: 'Câte propoziții are «Nu a întârziat fiindcă a dormit, ci fiindcă a ajutat-o pe bunica.»?',
        explain: 'Trei predicate: a întârziat, a dormit, a ajutat-o.',
        steps: ['a întârziat', 'a dormit', 'a ajutat-o', 'Total: 3'],
        proof: () => 3
      }
    ]),
    ...words([
      {
        id: 'hz-r8e-03', lesson: 'vers-la-prima-vedere', level: 6, skill: 'trap', point: 'figuri',
        prompt: '«Casa e o scoică» este metaforă sau comparație? Scrie: metaforă.',
        answer: 'metaforă',
        explain: 'Lipsește ca, deci identificarea este metaforă.',
        steps: ['Nu apare ca', 'scoică ține loc de casă', 'Este metaforă']
      },
      {
        id: 'hz-r8e-04', lesson: 'limba-pe-rand', level: 7, skill: 'trap', point: 'diftong',
        prompt: 'În «noap-te», oa este diftong sau hiat? Scrie: diftong.',
        answer: 'diftong',
        explain: 'Cele două vocale stau în aceeași silabă.',
        steps: ['noap este o silabă', 'o și a nu se despart', 'Este diftong']
      }
    ])
  ];
  return pack('romana:8:recapitulare-examen', flashcards, tests);
}

function calatoria() {
  const flashcards = grids([
    {
      id: 'hx-r8c-01', lesson: 'argumentare', level: 1, skill: 'apply', point: 'argument',
      question: 'Care enunț argumentează?',
      correct: 'Merg pe jos, fiindcă autobuzul întârzie zilnic.',
      wrong: ['Merg pe jos.', 'Ce drum!', 'Drum, drum, drum.'],
      explain: 'fiindcă aduce un motiv. Enunțul scurt, exclamația și repetiția nu explică de ce.'
    },
    {
      id: 'hx-r8c-02', lesson: 'figuri-subiect', level: 2, skill: 'trap', point: 'personificare',
      question: '«Drumul se plictisește de pașii noștri.» Drumul este…',
      correct: 'personificat',
      wrong: ['comparat prin ca', 'enumerat', 'pus la supin'],
      explain: 'Plictiseala este omenească. Nu apare ca, nu este o listă și nu este o formă de supin.'
    },
    {
      id: 'hx-r8c-03', lesson: 'parti-de-vorbire', level: 3, skill: 'analyze', point: 'adverb',
      question: 'În «A mers departe.», departe este…',
      correct: 'adverb',
      wrong: ['substantiv articulat', 'prepoziție', 'numeral'],
      explain: 'departe arată cât de mult s-a întins deplasarea. Nu numește un obiect, nu leagă și nu numără.'
    },
    {
      id: 'hx-r8c-04', lesson: 'activ-pasiv', level: 4, skill: 'trap', point: 'pasiv',
      question: 'Transpus la diateza pasivă, «Vântul a rupt ramura.» devine…',
      correct: 'Ramura a fost ruptă de vânt.',
      wrong: [
        'Ramura a rupt vântul ieri.',
        'Vântul a fost rupt de ramură.',
        'Ramura rupe.'
      ],
      explain: 'La pasiv, obiectul devine subiect: ramura a fost ruptă, iar autorul trece după de. Inversarea vântului cu ramura schimbă cine suferă acțiunea.'
    },
    {
      id: 'hx-r8c-05', lesson: 'reflexiv', level: 5, skill: 'apply', point: 'reflexiv',
      question: 'În «Drumețul se odihnește.», se arată că…',
      correct: 'acțiunea se întoarce asupra subiectului',
      wrong: ['subiectul lipsește', 'verbul este la supin', 'se este prepoziție'],
      explain: 'Reflexivul se leagă acțiunea de cel care o face. Subiectul este drumețul. se nu este prepoziție.'
    },
    {
      id: 'hx-r8c-06', lesson: 'impersonal-concesie', level: 6, skill: 'analyze', point: 'concesie',
      question: 'În «A plecat, deși ploua.», concesia este…',
      correct: 'ploaia, care nu l-a oprit',
      wrong: ['plecarea însăși', 'lipsa oricărui verb', 'un epitet'],
      explain: 'deși ploua arată piedica învinsă. Plecarea este fapta principală, nu concesia.'
    },
    {
      id: 'hx-r8c-07', lesson: 'vocabular-drum', level: 7, skill: 'trap', point: 'sens',
      question: 'În «A ținut calea drept înainte.», «a ținut calea» înseamnă…',
      correct: 'a mers fără să o schimbe',
      wrong: ['a închis drumul cu un lacăt', 'a desenat o hartă', 'a numărat pietrele'],
      explain: 'Expresia înseamnă că a urmat drumul. Nu este un lacăt și nu este un desen.'
    },
    {
      id: 'hx-r8c-08', lesson: 'argumentare', level: 8, skill: 'false', point: 'argument',
      question: 'Care enunț este fals despre un text argumentativ la examen?',
      correct: 'Exemplul poate contrazice părerea, iar textul rămâne convingător.',
      wrong: [
        'Părerea trebuie să se vadă limpede.',
        'Motivul răspunde la de ce.',
        'Un exemplu bine ales întărește motivul.'
      ],
      explain: 'Dacă exemplul contrazice părerea, argumentarea se rupe. Părerea, motivul și exemplul aliniat sunt cerințe reale.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r8c-01', lesson: 'figuri-subiect', level: 6, skill: 'trap', point: 'personificare',
        prompt: 'În «Drumul se plictisește.», figura este personificare sau metaforă? Scrie: personificare.',
        answer: 'personificare',
        explain: 'Drumul primește o stare omenească.',
        steps: ['Plictiseala este omenească', 'Nu apare ca', 'Este personificare']
      },
      {
        id: 'hz-r8c-02', lesson: 'impersonal-concesie', level: 8, skill: 'analyze', point: 'concesie',
        prompt: 'În «A plecat, deși ploua.», deși introduce concesie sau scop? Scrie: concesie.',
        answer: 'concesie',
        explain: 'Plecarea se face împotriva ploii.',
        steps: ['deși opune o piedică', 'ca să ar fi scop', 'Este concesie']
      }
    ]),
    ...counts([
      {
        id: 'hz-r8c-03', lesson: 'argumentare', level: 6, skill: 'apply', point: 'argument',
        prompt: 'În «Merg pe jos, fiindcă autobuzul întârzie.», câte propoziții sunt?',
        explain: 'Două: merg și întârzie.',
        steps: ['Merg pe jos', 'fiindcă autobuzul întârzie', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r8c-04', lesson: 'activ-pasiv', level: 7, skill: 'trap', point: 'pasiv',
        prompt: 'În «Ramura a fost ruptă de vânt.», câți autori ai ruperii sunt numiți?',
        explain: 'Autorul ruperii este unul singur: vântul.',
        steps: ['de vânt arată autorul', 'ramura suferă acțiunea', 'Total: 1'],
        proof: () => 1
      }
    ])
  ];
  return pack('romana:8:calatoria', flashcards, tests);
}

function sentimente() {
  const flashcards = grids([
    {
      id: 'hx-r8s-01', lesson: 'text-liric', level: 1, skill: 'apply', point: 'liric',
      question: 'Într-un text liric, eul este…',
      correct: 'vocea care își spune starea',
      wrong: ['tipograful', 'indexul de nume', 'cuprinsul'],
      explain: 'Eul liric este instanța care vorbește în text. Tipograful, indexul și cuprinsul stau în afara vocii.'
    },
    {
      id: 'hx-r8s-02', lesson: 'versificatie', level: 2, skill: 'apply', point: 'ritm',
      question: 'Două versuri rimează când…',
      correct: 'li se potrivesc sunetele de la final',
      wrong: ['au același număr de cuvinte', 'încep cu aceeași literă', 'stau pe aceeași pagină'],
      explain: 'Rima este o potrivire de final. Numărul de cuvinte, inițiala și pagina nu o creează.'
    },
    {
      id: 'hx-r8s-03', lesson: 'coordonare', level: 3, skill: 'analyze', point: 'coordonare',
      question: 'În «Cânt și tac.», raportul dintre propoziții este de…',
      correct: 'coordonare',
      wrong: ['subordonare', 'incidență', 'aposiziție'],
      explain: 'și leagă două propoziții de același rang. Niciuna nu determină un cuvânt din cealaltă.'
    },
    {
      id: 'hx-r8s-04', lesson: 'subordonare', level: 4, skill: 'analyze', point: 'subordonare',
      question: 'În «Cânt când se face seară.», propoziția cu când este…',
      correct: 'temporală',
      wrong: ['atributivă', 'finală', 'subiectivă'],
      explain: 'când răspunde la în ce moment. Atributiva ar sta pe lângă un substantiv. Finala ar avea ca să. Subiectiva ar ține locul subiectului.'
    },
    {
      id: 'hx-r8s-05', lesson: 'elipsa-apozitie', level: 5, skill: 'trap', point: 'elipsa',
      question: 'În «Eu, spre deal; tu, spre vale.», lipsa verbului este…',
      correct: 'elipsă',
      wrong: ['pleonasm', 'diftong', 'supin'],
      explain: 'Verbul de mișcare se înțelege, dar nu este scris. Asta este elipsă. Nu se repetă un sens și nu este o formă verbală.'
    },
    {
      id: 'hx-r8s-06', lesson: 'elipsa-apozitie', level: 6, skill: 'apply', point: 'apozitie',
      question: 'În «Eminescu, poetul, a rămas în programă.», poetul este…',
      correct: 'apoziție',
      wrong: ['complement direct', 'predicat verbal', 'interjecție'],
      explain: 'poetul explică numele, stând lângă el. Nu este obiectul unui verb tranzitiv și nu este predicatul.'
    },
    {
      id: 'hx-r8s-07', lesson: 'mesaj-fantana', level: 7, skill: 'false', point: 'mesaj',
      question: 'Text scurt, original: «Fântâna satului a secat, iar oamenii au tăcut.» Care enunț este fals?',
      correct: 'Oamenii au sărbătorit apa nouă.',
      wrong: [
        'Fântâna a secat.',
        'Oamenii au tăcut.',
        'iar leagă două propoziții.'
      ],
      explain: 'Textul are secare și tăcere, nu o sărbătoare. Celelalte enunțuri se citesc direct din frază.'
    },
    {
      id: 'hx-r8s-08', lesson: 'coordonare', level: 8, skill: 'analyze', point: 'coordonare',
      question: 'Schimbi și cu dar în «Cânt și tac.» Ce se schimbă?',
      correct: 'raportul de însumare devine opoziție',
      wrong: ['numărul predicatelor', 'cazul substantivului cânt', 'faptul că sunt propoziții'],
      explain: 'Predicatele rămân două. și adună, dar opune. cânt aici este verb, nu un substantiv cu caz.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r8s-01', lesson: 'subordonare', level: 6, skill: 'analyze', point: 'subordonare',
        prompt: 'În «Cânt când se face seară.», propoziția cu când este temporală sau finală? Scrie: temporală.',
        answer: 'temporală',
        explain: 'când așază fapta în timp.',
        steps: ['Răspunde la când', 'ca să ar fi finală', 'Este temporală']
      },
      {
        id: 'hz-r8s-02', lesson: 'elipsa-apozitie', level: 8, skill: 'trap', point: 'elipsa',
        prompt: 'În «Eu, spre deal; tu, spre vale.», lipsa verbului este elipsă sau pleonasm? Scrie: elipsă.',
        answer: 'elipsă',
        explain: 'Verbul se înțelege, dar nu este scris.',
        steps: ['Lipsește predicatul', 'Sensul tot se înțelege', 'Este elipsă']
      }
    ]),
    ...counts([
      {
        id: 'hz-r8s-03', lesson: 'coordonare', level: 6, skill: 'apply', point: 'coordonare',
        prompt: 'Câte propoziții coordonate sunt în «Cânt și tac.»?',
        explain: 'Două propoziții de același rang.',
        steps: ['Cânt', 'tac', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r8s-04', lesson: 'mesaj-fantana', level: 7, skill: 'analyze', point: 'mesaj',
        prompt: 'În «Fântâna a secat, iar oamenii au tăcut.», câte propoziții sunt?',
        explain: 'Două propoziții legate prin iar.',
        steps: ['Fântâna a secat', 'oamenii au tăcut', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:8:lume-sentimente', flashcards, tests);
}

function valori() {
  const flashcards = grids([
    {
      id: 'hx-r8v-01', lesson: 'atributiva', level: 1, skill: 'apply', point: 'atributiva',
      question: 'În «Cartea care lipsește este a mea.», care introduce o propoziție…',
      correct: 'atributivă',
      wrong: ['subiectivă', 'finală', 'circumstanțială de mod'],
      explain: 'care lipsește determină substantivul cartea, ca un atribut. Nu ține locul subiectului întregii fraze și nu arată un scop.'
    },
    {
      id: 'hx-r8v-02', lesson: 'completiva-directa', level: 2, skill: 'analyze', point: 'directa',
      question: 'În «Știu că ai dreptate.», că ai dreptate este…',
      correct: 'completivă directă',
      wrong: ['atributivă', 'circumstanțială de loc', 'apoziție'],
      explain: 'Întrebi ce știu. Propoziția ține loc de complement direct pe lângă știu. Nu determină un substantiv și nu spune unde.'
    },
    {
      id: 'hx-r8v-03', lesson: 'completiva-indirecta', level: 3, skill: 'analyze', point: 'indirecta',
      question: 'În «Mă bucur că ai venit.», propoziția cu că răspunde la…',
      correct: 'de ce anume mă bucur',
      wrong: ['unde stau', 'cât costă', 'a cui este'],
      explain: 'Completiva indirectă completează un verb ca mă bucur. Nu este complement de loc, de preț sau de posesie.'
    },
    {
      id: 'hx-r8v-04', lesson: 'completiva-prepozitionala', level: 4, skill: 'trap', point: 'prepozitionala',
      question: 'În «M-am gândit la ce ai spus.», la ce ai spus depinde de…',
      correct: 'verbul m-am gândit',
      wrong: ['un substantiv neexprimat din titlu', 'o rimă', 'un prefix'],
      explain: 'Te gândești la ceva. Propoziția este completiva prepozițională a verbului, nu un ornament de vers.'
    },
    {
      id: 'hx-r8v-05', lesson: 'parti-propozitie', level: 5, skill: 'trap', point: 'subiect',
      question: 'În «Cine tace pierde.», subiectul propoziției principale este…',
      correct: 'propoziția cine tace',
      wrong: ['pierde', 'tace singur', 'punctul'],
      explain: 'Cine tace ține loc de subiect pentru pierde: cel care tace este cel care pierde. pierde este predicatul principalei.'
    },
    {
      id: 'hx-r8v-06', lesson: 'ascultare', level: 6, skill: 'analyze', point: 'ascultare',
      question: 'Într-o ascultare, notița bună păstrează…',
      correct: 'ideea și vorbitorul',
      wrong: ['doar tusea din sală', 'doar culoarea scaunului', 'doar ora la care ai clipit'],
      explain: 'Ca să redai mesajul, notezi cine a spus și ce idee a avut. Zgomotele și scaunul nu sunt conținutul.'
    },
    {
      id: 'hx-r8v-07', lesson: 'structuri-text', level: 7, skill: 'false', point: 'structura',
      question: 'Care enunț este fals?',
      correct: 'O completivă directă determină un adjectiv, nu un verb.',
      wrong: [
        'Atributiva determină un substantiv.',
        'Completiva directă răspunde la ce.',
        'Circumstanțiala de timp răspunde la când.'
      ],
      explain: 'Completiva directă stă pe lângă un verb, nu pe lângă un adjectiv. Celelalte trei funcții sunt descrise corect.'
    },
    {
      id: 'hx-r8v-08', lesson: 'atributiva', level: 8, skill: 'analyze', point: 'atributiva',
      question: 'În «Fata care a vorbit a ieșit.», câte propoziții sunt și care este principală?',
      correct: 'două, iar principala este a ieșit',
      wrong: [
        'una singură, care a vorbit',
        'două, iar principala este care a vorbit',
        'trei, fără principală'
      ],
      explain: 'A ieșit este predicatul principalei, cu subiectul fata. care a vorbit este atributivă. Sunt două propoziții, nu trei.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r8v-01', lesson: 'atributiva', level: 6, skill: 'analyze', point: 'atributiva',
        prompt: 'În «cartea care lipsește», propoziția cu care este atributivă sau completivă directă? Scrie: atributivă.',
        answer: 'atributivă',
        explain: 'Determină substantivul cartea.',
        steps: ['stă pe lângă un substantiv', 'nu completează un verb de tipul știu', 'este atributivă']
      },
      {
        id: 'hz-r8v-02', lesson: 'completiva-directa', level: 8, skill: 'analyze', point: 'directa',
        prompt: 'În «Știu că ai dreptate.», propoziția cu că este completivă directă sau atributivă? Scrie: completivă directă.',
        answer: 'completivă directă',
        explain: 'Răspunde la ce știu și depinde de verb.',
        steps: ['Întrebi ce știu', 'Nu determină un substantiv', 'Este completivă directă']
      }
    ]),
    ...counts([
      {
        id: 'hz-r8v-03', lesson: 'atributiva', level: 6, skill: 'apply', point: 'atributiva',
        prompt: 'În «Fata care a vorbit a ieșit.», câte propoziții sunt?',
        explain: 'Atributiva și principala. Două.',
        steps: ['care a vorbit', 'a ieșit', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r8v-04', lesson: 'parti-propozitie', level: 7, skill: 'analyze', point: 'subiect',
        prompt: 'În «Cine tace pierde.», câte predicate sunt?',
        explain: 'tace și pierde. Două.',
        steps: ['tace', 'pierde', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:8:valori-ascultare', flashcards, tests);
}

function traditie() {
  const flashcards = grids([
    {
      id: 'hx-r8d-01', lesson: 'circumstantiala-loc', level: 1, skill: 'apply', point: 'loc',
      question: 'În «Stau unde e umbră.», unde e umbră este circumstanțială de…',
      correct: 'loc',
      wrong: ['cauză', 'scop', 'mod'],
      explain: 'Răspunde la unde stau. Cauza ar răspunde la de ce, scopul la ca să, modul la cum.'
    },
    {
      id: 'hx-r8d-02', lesson: 'circumstantiala-timp', level: 2, skill: 'apply', point: 'timp',
      question: 'În «Plec când se sting luminile.», propoziția cu când este…',
      correct: 'temporală',
      wrong: ['de loc', 'atributivă', 'de mod'],
      explain: 'când așază plecarea în timp. Nu spune unde și nu determină un substantiv.'
    },
    {
      id: 'hx-r8d-03', lesson: 'circumstantiala-mod', level: 3, skill: 'analyze', point: 'mod',
      question: 'În «Scrie cum ți-am arătat.», cum ți-am arătat arată…',
      correct: 'modul',
      wrong: ['posesorul', 'numărul', 'cazul'],
      explain: 'Răspunde la în ce fel scrii. Nu spune a cui este obiectul și nu dă un caz.'
    },
    {
      id: 'hx-r8d-04', lesson: 'cauzala', level: 4, skill: 'trap', point: 'cauza',
      question: 'În «A rămas fiindcă ținea la obicei.», fiindcă introduce…',
      correct: 'cauza',
      wrong: ['scopul', 'locul', 'apoziția'],
      explain: 'Ținerea la obicei este motivul rămânerii. Scopul ar fi ca să păstreze, formulat altfel. Nu este un loc.'
    },
    {
      id: 'hx-r8d-05', lesson: 'finala', level: 5, skill: 'trap', point: 'scop',
      question: 'În «A rămas ca să păstreze obiceiul.», ca să introduce…',
      correct: 'scopul',
      wrong: ['cauza deja împlinită', 'locul', 'atributul numelui'],
      explain: 'ca să arată ținta. fiindcă ar fi arătat o cauză. Propoziția nu determină un substantiv ca atribut.'
    },
    {
      id: 'hx-r8d-06', lesson: 'persuasiune', level: 6, skill: 'analyze', point: 'persuasiune',
      question: 'Care formulare încearcă să convingă, nu doar să informeze?',
      correct: 'Dacă păstrăm datina, satul nu își pierde chipul.',
      wrong: [
        'Datina are loc sâmbăta.',
        'Satul are o sută de case.',
        'Ora începe la șase.'
      ],
      explain: 'Dacă... atunci leagă o faptă de o urmare dorită. Celelalte enunțuri dau doar date.'
    },
    {
      id: 'hx-r8d-07', lesson: 'comparare-cozia', level: 7, skill: 'false', point: 'comparatie',
      question: 'Care enunț este fals?',
      correct: 'O comparație între două obiceiuri trebuie să le declare identice.',
      wrong: [
        'Poți spune ce seamănă.',
        'Poți spune ce diferă.',
        'Concluzia poate păstra ambele diferențe.'
      ],
      explain: 'Comparația caută și asemănări, și deosebiri. Nu ești obligat să le faci identice.'
    },
    {
      id: 'hx-r8d-08', lesson: 'cauzala', level: 8, skill: 'analyze', point: 'cauza',
      question: 'Înlocuiești fiindcă cu ca să în «A rămas fiindcă ținea la obicei.» Sensul…',
      correct: 'mută motivul în țintă și trebuie rescris',
      wrong: ['rămâne identic', 'devine o atributivă', 'șterge predicatul a rămas'],
      explain: 'fiindcă dă cauza, ca să dă scopul. Predicatul principalei rămâne, dar legătura logică se schimbă și cere altă continuare.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r8d-01', lesson: 'cauzala', level: 6, skill: 'trap', point: 'cauza',
        prompt: 'În «A rămas fiindcă ținea la obicei.», fiindcă introduce cauză sau scop? Scrie: cauză.',
        answer: 'cauză',
        explain: 'fiindcă răspunde la de ce a rămas.',
        steps: ['Întrebi de ce', 'ca să ar fi scop', 'Este cauză']
      },
      {
        id: 'hz-r8d-02', lesson: 'finala', level: 8, skill: 'trap', point: 'scop',
        prompt: 'În «A rămas ca să păstreze obiceiul.», ca să introduce scop sau cauză? Scrie: scop.',
        answer: 'scop',
        explain: 'ca să arată ținta rămânerii.',
        steps: ['ca să privește ținta', 'fiindcă ar fi cauză', 'Este scop']
      }
    ]),
    ...counts([
      {
        id: 'hz-r8d-03', lesson: 'circumstantiala-timp', level: 6, skill: 'apply', point: 'timp',
        prompt: 'În «Plec când se sting luminile.», câte propoziții sunt?',
        explain: 'Principala și temporala. Două.',
        steps: ['Plec', 'când se sting luminile', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r8d-04', lesson: 'circumstantiala-loc', level: 7, skill: 'apply', point: 'loc',
        prompt: 'În «Stau unde e umbră și unde e liniște.», câte propoziții de loc coordonate sunt, în afara principalei?',
        explain: 'Două propoziții de loc: unde e umbră și unde e liniște.',
        steps: ['unde e umbră', 'unde e liniște', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:8:traditie-inovatie', flashcards, tests);
}

function modele() {
  const flashcards = grids([
    {
      id: 'hx-r8m-01', lesson: 'trei-figuri', level: 1, skill: 'trap', point: 'epitet',
      question: 'În «o tăcere de sticlă», figura dominantă este…',
      correct: 'epitet metaforic',
      wrong: ['numeral cardinal', 'prepoziție compusă', 'mod supin'],
      explain: 'de sticlă dă tăcerii o imagine, nu o măsură. Nu numeri, nu legi printr-o prepoziție goală și nu ai un verb la supin.'
    },
    {
      id: 'hx-r8m-02', lesson: 'limbaj-figurat', level: 2, skill: 'trap', point: 'hiperbola',
      question: '«Am așteptat o veșnicie la ușă.» este…',
      correct: 'hiperbolă',
      wrong: ['diftong', 'genitiv', 'ordinale'],
      explain: 'Veșnicia mărește așteptarea peste ce s-a întâmplat de fapt. Este o exagerare, nu un caz și nu o silabă.'
    },
    {
      id: 'hx-r8m-03', lesson: 'fonetica-en', level: 3, skill: 'analyze', point: 'hiat',
      question: 'În «po-e-zie», o și e sunt…',
      correct: 'în hiat',
      wrong: ['un diftong', 'o consoană', 'un prefix'],
      explain: 'Stau în silabe diferite, deci hiat. Diftongul le-ar ține în aceeași silabă, ca oa din noapte.'
    },
    {
      id: 'hx-r8m-04', lesson: 'derivare-compunere', level: 4, skill: 'apply', point: 'derivare',
      question: '«neînfricat» este format prin…',
      correct: 'derivare cu prefixe',
      wrong: ['compunere din două substantive', 'schimbare de diateză', 'elipsă'],
      explain: 'ne- și în- stau înaintea rădăcinii fric. Nu s-au lipit două substantive și nu s-a schimbat doar diateza.'
    },
    {
      id: 'hx-r8m-05', lesson: 'conversiune', level: 5, skill: 'analyze', point: 'conversiune',
      question: 'În «un bine făcut la timp», bine a trecut de la adverb la…',
      correct: 'substantiv',
      wrong: ['verb la supin', 'numeral', 'interjecție'],
      explain: 'un bine îl folosește ca nume, cu articol. Nu este o formă verbală și nu numără.'
    },
    {
      id: 'hx-r8m-06', lesson: 'redactare-examen', level: 6, skill: 'false', point: 'redactare',
      question: 'Care enunț este fals despre o compunere de examen?',
      correct: 'Poți schimba persoana și timpul de la o frază la alta, fără motiv.',
      wrong: [
        'Introducerea anunță ideea.',
        'Exemplele trebuie legate de idee.',
        'Încheierea nu repetă introducterea cuvânt cu cuvânt.'
      ],
      explain: 'Saltul de persoană sau de timp fără motiv rupe textul. Introducerea, exemplele și încheierea au roluri stabile.'
    },
    {
      id: 'hx-r8m-07', lesson: 'cuvinte-straine', level: 7, skill: 'trap', point: 'imprumut',
      question: 'Într-un text despre școală, «feedback» poate fi înlocuit, când vrei limba standard, cu…',
      correct: 'părere de revenire',
      wrong: ['diftong', 'cauzală', 'supin'],
      explain: 'Împrumutul numește o reacție la o lucrare. Părerea de revenire spune același lucru în română. Nu este o figură și nu este un mod.'
    },
    {
      id: 'hx-r8m-08', lesson: 'trei-figuri', level: 8, skill: 'analyze', point: 'figuri',
      question: 'Aceeași imagine, trei forme. Care este personificarea?',
      correct: 'Luna se uită în fântână.',
      wrong: ['Luna e o monedă.', 'Luna e ca o monedă.', 'Luna, monedă palidă, stă.'],
      explain: 'Se uită dă lunii un gest omenesc. e o monedă este metaforă. ca o monedă este comparație. Apoziția monedă palidă nu dă un gest.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r8m-01', lesson: 'limbaj-figurat', level: 6, skill: 'trap', point: 'hiperbola',
        prompt: '«Am așteptat o veșnicie» este hiperbolă sau hiat? Scrie: hiperbolă.',
        answer: 'hiperbolă',
        explain: 'Exagerează durata. Hiatul ține de silabe, nu de sens.',
        steps: ['Veșnicia întrece așteptarea reală', 'Nu despărțim vocale', 'Este hiperbolă']
      },
      {
        id: 'hz-r8m-02', lesson: 'fonetica-en', level: 8, skill: 'analyze', point: 'hiat',
        prompt: 'În «po-e-zie», o și e sunt în hiat sau în diftong? Scrie: hiat.',
        answer: 'hiat',
        explain: 'Vocalele stau în silabe vecine.',
        steps: ['po și e sunt silabe diferite', 'diftongul le-ar uni', 'Este hiat']
      }
    ]),
    ...counts([
      {
        id: 'hz-r8m-03', lesson: 'derivare-compunere', level: 6, skill: 'apply', point: 'derivare',
        prompt: 'În «neînfricat», câte prefixe stau înaintea rădăcinii fric?',
        explain: 'ne și în. Două prefixe.',
        steps: ['ne', 'în', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r8m-04', lesson: 'trei-figuri', level: 7, skill: 'analyze', point: 'figuri',
        prompt: 'În lista «Luna se uită. Luna e o monedă. Luna e ca o monedă.», câte enunțuri sunt?',
        explain: 'Trei enunțuri, fiecare cu figura lui.',
        steps: ['se uită', 'e o monedă', 'e ca o monedă', 'Total: 3'],
        proof: () => 3
      }
    ])
  ];
  return pack('romana:8:modele-antimodele', flashcards, tests);
}

function familie() {
  const flashcards = grids([
    {
      id: 'hx-r8f-01', lesson: 'coerenta-text', level: 1, skill: 'apply', point: 'coerenta',
      question: 'Un text coerent…',
      correct: 'își leagă frazele de aceeași idee',
      wrong: ['schimbă subiectul la fiecare frază', 'nu are verbe', 'repetă un cuvânt fără sens'],
      explain: 'Coerența ține firul. Saltul de subiect, lipsa verbelor și repetiția goală îl rup.'
    },
    {
      id: 'hx-r8f-02', lesson: 'fraza-orala', level: 2, skill: 'analyze', point: 'oral',
      question: 'Într-o intervenție orală de un minut, ce tai întâi?',
      correct: 'digresiunea care nu susține ideea',
      wrong: ['verbul ideii principale', 'exemplul scurt', 'formula de adresare'],
      explain: 'Digresiunea consumă timpul fără să ajute. Verbul, exemplul și adresarea țin textul în picioare.'
    },
    {
      id: 'hx-r8f-03', lesson: 'jargon-argou', level: 3, skill: 'trap', point: 'registru',
      question: 'Într-o cerere către primărie, registrul potrivit este…',
      correct: 'standard, politicos',
      wrong: ['argou de grup', 'doar interjecții', 'rimă forțată'],
      explain: 'Instituția citește un text limpede și politicos. Argoul, interjecțiile și rima îl fac greu de folosit.'
    },
    {
      id: 'hx-r8f-04', lesson: 'colocvial-cultivat', level: 4, skill: 'analyze', point: 'registru',
      question: '«Nu pot veni, am de învățat.» față de «Nu am posibilitatea de a participa, întrucât învăț.» Primul este…',
      correct: 'colocvial',
      wrong: ['juridic', 'arhaic', 'nonverbal'],
      explain: 'Prima formă este vorbirea de toate zilele. A doua este cultivată. Niciuna nu este un text de lege vechi și ambele au cuvinte.'
    },
    {
      id: 'hx-r8f-05', lesson: 'originalitate', level: 5, skill: 'false', point: 'original',
      question: 'Care enunț este fals?',
      correct: 'Originalitatea înseamnă să ignori complet textul citit.',
      wrong: [
        'Poți porni de la un detaliu pe care alții îl sar.',
        'Părerea ta trebuie legată de probe.',
        'O idee nouă tot se verifică pe enunțuri.'
      ],
      explain: 'Ideea nouă stă pe text, nu în locul lui. Detaliul, probele și verificarea sunt căi corecte.'
    },
    {
      id: 'hx-r8f-06', lesson: 'baltagul', level: 6, skill: 'analyze', point: 'personaj',
      question: 'Într-o scenă originală, o femeie întreabă de trei ori același lucru, iar răspunsul se scurtează. Ce vezi?',
      correct: 'o tensiune care crește',
      wrong: ['o descriere de peisaj', 'un tabel', 'o listă de sinonime'],
      explain: 'Repetarea întrebării și scurtarea răspunsului strâng conflictul. Nu este un peisaj și nu este un tabel.'
    },
    {
      id: 'hx-r8f-07', lesson: 'spirit-civic', level: 7, skill: 'analyze', point: 'civic',
      question: 'Care gest este civic, nu doar politicos în familie?',
      correct: 'Anunți la primărie un capac de canal lipsă.',
      wrong: ['Pui masa pentru bunici.', 'Îți strângi camera.', 'Uzi florile.'],
      explain: 'Anunțul protejează și alți oameni, nu doar casa ta. Masa, camera și florile sunt grijă de acasă.'
    },
    {
      id: 'hx-r8f-08', lesson: 'atitudini-orale', level: 8, skill: 'trap', point: 'atitudine',
      question: 'Într-o dezbatere, «Nu te ascult, pentru că ești mai mic.» este…',
      correct: 'un atac la persoană',
      wrong: ['un argument pe fapte', 'o concesie', 'o atributivă'],
      explain: 'Respinge vorbitorul, nu ideea. Un argument ar vorbi despre fapte. Nu este o concesie și nu este o funcție sintactică.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r8f-01', lesson: 'jargon-argou', level: 6, skill: 'trap', point: 'registru',
        prompt: 'O cerere către primărie se scrie în registru standard sau în argou? Scrie: standard.',
        answer: 'standard',
        explain: 'Instituția așteaptă limba comună, politicos.',
        steps: ['Destinatarul este o instituție', 'Argoul ține de un grup', 'Registrul este standard']
      },
      {
        id: 'hz-r8f-02', lesson: 'atitudini-orale', level: 8, skill: 'analyze', point: 'atitudine',
        prompt: '«Nu te ascult, pentru că ești mai mic» este un atac la persoană sau un argument? Scrie: atac.',
        answer: 'atac',
        explain: 'Lovește vârsta vorbitorului, nu ideea discutată.',
        steps: ['Nu există o faptă discutată', 'Se respinge persoana', 'Este atac']
      }
    ]),
    ...counts([
      {
        id: 'hz-r8f-03', lesson: 'baltagul', level: 6, skill: 'analyze', point: 'personaj',
        prompt: 'În scena în care femeia întreabă de trei ori, câte întrebări repetă?',
        explain: 'Femeia repetă întrebarea de trei ori.',
        steps: ['prima', 'a doua', 'a treia', 'Total: 3'],
        proof: () => 3
      },
      {
        id: 'hz-r8f-04', lesson: 'coerenta-text', level: 7, skill: 'apply', point: 'coerenta',
        prompt: 'Un paragraf are ideea, exemplul și legătura cu ideea următoare. Câte mișcări numeri?',
        explain: 'Trei mișcări ale paragrafului.',
        steps: ['ideea', 'exemplul', 'legătura', 'Total: 3'],
        proof: () => 3
      }
    ])
  ];
  return pack('romana:8:familia-comunitate', flashcards, tests);
}

module.exports = { examen, calatoria, sentimente, valori, traditie, modele, familie };
