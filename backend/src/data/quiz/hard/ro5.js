const { grids, counts, words, pack } = require('./routil');

function evaluareInitiala() {
  const flashcards = grids([
    {
      id: 'hx-r5e-01', lesson: 'text-suport', level: 1, skill: 'apply', point: 'text',
      question: 'Text: «În recreație, Mara a uitat creionul. Irina i-a întins creionul ei albastru.» Cine oferă creionul?',
      correct: 'Irina',
      wrong: ['Mara', 'recreația', 'creionul'],
      explain: 'Irina face fapta de a întinde creionul. Mara este cea care l-a uitat. Creionul este obiectul, nu persoana care ajută.'
    },
    {
      id: 'hx-r5e-02', lesson: 'intentie', level: 2, skill: 'apply', point: 'intentie',
      question: 'În același text, intenția Irinei este…',
      correct: 'să o ajute pe Mara',
      wrong: ['să o certe pe Mara', 'să ascundă creionul', 'să plece fără un gest'],
      explain: 'Întinde creionul ei, deci vrea să o scoată pe Mara din încurcătură. Nu există o mustrare și nici un gest de ascundere.'
    },
    {
      id: 'hx-r5e-03', lesson: 'text-suport', level: 3, skill: 'false', point: 'text',
      question: 'Textul de mai sus. Care enunț este fals?',
      correct: 'Mara i-a dat Irinei un creion roșu.',
      wrong: [
        'Irina îi întinde Marei un creion albastru.',
        'Mara a uitat creionul în recreație.',
        'Ajutorul vine de la o colegă, nu de la un obiect.'
      ],
      explain: 'Textul spune că Irina dă creionul albastru, nu că Mara oferă un creion roșu. Culoarea și direcția gestului sunt inversate în enunțul fals.'
    },
    {
      id: 'hx-r5e-04', lesson: 'intentie', level: 4, skill: 'analyze', point: 'intentie',
      question: 'Dacă Irina ar fi râs de Mara fără să-i dea creionul, intenția ar fi fost…',
      correct: 'de luare în râs',
      wrong: ['de ajutor concret', 'de împrumut', 'de împăcare'],
      explain: 'Râsul fără gest de ajutor schimbă intenția: nu mai repară problema, o expune. Împrumutul există doar când creionul este întins.'
    },
    {
      id: 'hx-r5e-05', lesson: 'text-suport', level: 5, skill: 'trap', point: 'text',
      question: 'Câte personaje fac câte o faptă în textul cu Mara și Irina?',
      correct: '2',
      wrong: ['1', '3', '4'],
      explain: 'Mara uită creionul, Irina îl întinde. Sunt două personaje. Creionul și recreația nu sunt personaje.'
    },
    {
      id: 'hx-r5e-06', lesson: 'text-suport', level: 6, skill: 'analyze', point: 'detaliu',
      question: 'Care detaliu arată că ajutorul este concret, nu doar o vorbă?',
      correct: 'Creionul este întins.',
      wrong: ['Irina are un nume.', 'Recreația este o pauză.', 'Clasa este o încăpere.'],
      explain: 'Gestul de a întinde creionul rezolvă lipsa. Numele, pauza și încăperea doar așază scena, nu dovedesc ajutorul.'
    },
    {
      id: 'hx-r5e-07', lesson: 'intentie', level: 7, skill: 'analyze', point: 'intentie',
      question: 'Text nou: «Tudor a rupt foaia colegului, apoi a cerut iertare și a adus o foaie nouă.» Ce rămâne neclar dacă tai ultima propoziție?',
      correct: 'dacă a reparat fapta',
      wrong: ['cine a rupt foaia', 'că a cerut iertare', 'că foaia era a colegului'],
      explain: 'Fără ultima propoziție vezi greșeala și scuza, dar nu mai vezi reparația. Iertarea cerută rămâne în a doua propoziție.'
    },
    {
      id: 'hx-r5e-08', lesson: 'intentie', level: 8, skill: 'false', point: 'intentie',
      question: 'Despre textul cu Tudor, care enunț este fals?',
      correct: 'Tudor a rupt foaia după ce a adus una nouă.',
      wrong: [
        'Tudor a cerut iertare după ce a rupt foaia.',
        'Foaia ruptă era a colegului.',
        'Foaia nouă vine ca o reparație.'
      ],
      explain: 'Ordinea din text este ruptură, apoi iertare, apoi foaie nouă. Enunțul fals întoarce începutul cu sfârșitul.'
    }
  ]);
  const tests = [
    ...counts([
      {
        id: 'hz-r5e-01', lesson: 'text-suport', level: 6, skill: 'apply', point: 'text',
        prompt: 'În textul «Mara a uitat creionul. Irina i-a întins creionul.» câte personaje acționează?',
        explain: 'Mara uită, Irina întinde. Sunt două personaje.',
        steps: ['Mara face o faptă', 'Irina face o faptă', 'Creionul nu este personaj', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r5e-02', lesson: 'text-suport', level: 7, skill: 'analyze', point: 'text',
        prompt: 'Numără predicatele din «Tudor a rupt foaia, a cerut iertare și a adus o foaie nouă.»',
        explain: 'Trei acțiuni: a rupt, a cerut, a adus.',
        steps: ['a rupt', 'a cerut', 'a adus', 'Sunt 3'],
        proof: () => 3
      }
    ]),
    ...words([
      {
        id: 'hz-r5e-03', lesson: 'intentie', level: 6, skill: 'apply', point: 'intentie',
        prompt: 'În «Irina i-a întins creionul ei albastru», intenția este de ajutor sau de ceartă? Scrie un singur cuvânt: ajutor sau ceartă.',
        answer: 'ajutor',
        explain: 'Gestul repară lipsa creionului, deci intenția este de ajutor.',
        steps: ['Irina dă creionul', 'Mara rămâne fără obiect', 'Gestul este de ajutor']
      },
      {
        id: 'hz-r5e-04', lesson: 'intentie', level: 8, skill: 'analyze', point: 'intentie',
        prompt: 'În «Tudor a rupt foaia, apoi a adus una nouă», fapta finală repară sau repetă greșeala? Scrie: repară.',
        answer: 'repară',
        explain: 'Foaia nouă pune ceva în locul celei rupte, deci ultima faptă repară.',
        steps: ['Întâi rupe', 'Apoi aduce o foaie nouă', 'A doua faptă repară']
      }
    ])
  ];
  return pack('romana:5:evaluare-initiala', flashcards, tests);
}

function cuvinte() {
  const flashcards = grids([
    {
      id: 'hx-r5c-01', lesson: 'enunt', level: 1, skill: 'apply', point: 'enunt',
      question: '«Ana citește.» este…',
      correct: 'o propoziție',
      wrong: ['un singur sunet', 'doar un titlu', 'o listă de cuvinte'],
      explain: 'Are subiect și predicat și spune o idee întreagă. Nu este un sunet izolat și nu este o listă.'
    },
    {
      id: 'hx-r5c-02', lesson: 'propozitie', level: 2, skill: 'apply', point: 'subiect',
      question: 'În «Ana citește o carte.», subiectul este…',
      correct: 'Ana',
      wrong: ['citește', 'cartea', 'o'],
      explain: 'Ana face acțiunea. «citește» este predicatul. «o carte» arată ce citește, nu cine citește.'
    },
    {
      id: 'hx-r5c-03', lesson: 'subiect', level: 3, skill: 'analyze', point: 'subiect',
      question: 'În «Prietenul meu a venit.», grupul subiect este…',
      correct: 'Prietenul meu',
      wrong: ['a venit', 'meu', 'Prietenul a'],
      explain: 'Întrebi cine a venit: prietenul meu. «meu» doar îl însoțește, nu este singur subiectul. «a venit» este predicatul.'
    },
    {
      id: 'hx-r5c-04', lesson: 'atribut', level: 4, skill: 'apply', point: 'atribut',
      question: 'În grupul «cartea nouă», cuvântul «nouă» este…',
      correct: 'atribut',
      wrong: ['predicat', 'subiect', 'verb copulativ'],
      explain: '«nouă» determină substantivul cartea și spune cum este. Nu arată o acțiune și nu este cel despre care se spune ceva de unul singur.'
    },
    {
      id: 'hx-r5c-05', lesson: 'dictionar', level: 5, skill: 'trap', point: 'sinonim',
      question: 'În enunțul «Elevul grăbește pasul ca să prindă ora.», cel mai apropiat înlocuitor pentru «grăbește» este…',
      correct: 'accelerează',
      wrong: ['oprește', 'uită', 'măsoară'],
      explain: 'A grăbi pasul înseamnă a-l face mai iute. A opri este antonimul. A uita și a măsura schimbă sensul scenei.'
    },
    {
      id: 'hx-r5c-06', lesson: 'capcana-nimeni', level: 6, skill: 'trap', point: 'acord',
      question: 'Care enunț este scris corect?',
      correct: 'Nimeni nu a uitat tema.',
      wrong: ['Nimeni nu au venit ieri.', 'Nimeni nu și-au luat ghiozdanele.', 'Cineva nu au răspuns.'],
      explain: 'Nimeni cere verbul la singular: nu a uitat. «au» și «și-au» cer un subiect la plural. Cineva, tot singular, nu se acordă cu au.'
    },
    {
      id: 'hx-r5c-07', lesson: 'dictionar', level: 7, skill: 'apply', point: 'silaba',
      question: 'Câte silabe are cuvântul «prieten»?',
      correct: '3',
      wrong: ['2', '4', '1'],
      explain: 'Desparți pri-e-ten. Sunt trei silabe. Două ar lipi vocalele din mijloc într-un singur grup, ceea ce aici nu se întâmplă.'
    },
    {
      id: 'hx-r5c-08', lesson: 'atribut', level: 8, skill: 'analyze', point: 'atribut',
      question: 'În «Fata cu rucsac verde a intrat.», atributul care arată culoarea este…',
      correct: 'verde',
      wrong: ['fata', 'a intrat', 'cu'],
      explain: 'Verde îl determină pe rucsac. «fata» este centrul subiectului. «a intrat» este predicatul. «cu» leagă, nu spune culoarea.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r5c-01', lesson: 'subiect', level: 6, skill: 'apply', point: 'subiect',
        prompt: 'În propoziția «Bunicul cuminte povestește.», cine este subiectul logic, grupul întreg? Scrie grupul: Bunicul cuminte.',
        answer: 'Bunicul cuminte',
        explain: 'Întrebi cine povestește: bunicul cuminte. «cuminte» ține de subiect, nu de predicat.',
        steps: ['Întrebi cine povestește', 'Răspunsul este bunicul cuminte', 'povestește este predicatul']
      },
      {
        id: 'hz-r5c-02', lesson: 'atribut', level: 8, skill: 'analyze', point: 'atribut',
        prompt: 'În «rucsacul verde», ce parte de propoziție este «verde»? Un cuvânt: atribut.',
        answer: 'atribut',
        explain: 'Verde determină substantivul rucsacul, deci este atribut.',
        steps: ['verde stă lângă un substantiv', 'spune o însușire', 'funcția este atribut']
      }
    ]),
    ...counts([
      {
        id: 'hz-r5c-03', lesson: 'propozitie', level: 6, skill: 'apply', point: 'propozitie',
        prompt: 'Câte propoziții sunt în fraza «Ana citește, iar Matei desenează.»?',
        explain: 'Două propoziții legate prin iar: Ana citește și Matei desenează.',
        steps: ['Ana citește', 'Matei desenează', 'iar le leagă', 'Sunt 2'],
        proof: () => 2
      },
      {
        id: 'hz-r5c-04', lesson: 'dictionar', level: 7, skill: 'apply', point: 'silaba',
        prompt: 'Câte silabe are cuvântul «carte»?',
        explain: 'car-te. Sunt două silabe.',
        steps: ['car', 'te', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:5:cuvinte', flashcards, tests);
}

function cartea() {
  const flashcards = grids([
    {
      id: 'hx-r5k-01', lesson: 'sinonime', level: 1, skill: 'apply', point: 'sinonim',
      question: 'Cel mai apropiat sinonim pentru «a citi» în «copilul citește o poveste» este…',
      correct: 'a parcurge textul',
      wrong: ['a rupe filele', 'a ascunde cartea', 'a număra coperțile'],
      explain: 'A citi înseamnă a urmări textul. Ruperea, ascunderea și numărarea coperților sunt alte fapte.'
    },
    {
      id: 'hx-r5k-02', lesson: 'diacritice', level: 2, skill: 'trap', point: 'diacritice',
      question: 'Care cuvânt numește semnul pus deasupra unei litere ca să-i schimbe sunetul?',
      correct: 'diacritic',
      wrong: ['sinonim', 'predicat', 'coperte'],
      explain: 'Sedila, căciula sau virgulița de pe literă sunt semne diacritice. Sinonimul ține de sens, predicatul de propoziție, coperta de carte.'
    },
    {
      id: 'hx-r5k-03', lesson: 'silaba', level: 3, skill: 'apply', point: 'silaba',
      question: 'Câte silabe are «carte»?',
      correct: '2',
      wrong: ['1', '3', '4'],
      explain: 'car-te. Două silabe. Nu despici fiecare literă și nu lași cuvântul într-un singur bloc dacă are două vocale în grupuri separate.'
    },
    {
      id: 'hx-r5k-04', lesson: 'cuvant-alfabet', level: 4, skill: 'apply', point: 'alfabet',
      question: 'În dicționar, care cuvânt apare primul?',
      correct: 'carte',
      wrong: ['copil', 'elev', 'poveste'],
      explain: 'La prima literă, c este înaintea lui e și p. Între carte și copil, a este înaintea lui o.'
    },
    {
      id: 'hx-r5k-05', lesson: 'litera-ajutatoare', level: 5, skill: 'trap', point: 'litera',
      question: 'Ca să scrii corect «eu iau», ce trebuie să verifici?',
      correct: 'grupul de vocale ia',
      wrong: ['numărul copertelor', 'numele autorului', 'culoarea semnului de carte'],
      explain: 'Greșeala frecventă este la grupul ia, nu la obiectul carte. Autorul și semnul de carte nu schimbă scrierea verbului.'
    },
    {
      id: 'hx-r5k-06', lesson: 'stea-intrebari', level: 6, skill: 'analyze', point: 'intrebare',
      question: 'După un capitol, care întrebare cere o idee, nu o copiere?',
      correct: 'De ce a ales personajul drumul lung?',
      wrong: [
        'Ce cuvânt stă al treilea în prima propoziție?',
        'Câte litere are titlul?',
        'Pe ce rând apare numele?'
      ],
      explain: '«De ce» cere o explicație gândită. Poziția unui cuvânt, numărul literelor și rândul cer doar o numărătoare din text.'
    },
    {
      id: 'hx-r5k-07', lesson: 'de-ce-citim', level: 7, skill: 'false', point: 'lectura',
      question: 'Care enunț este fals?',
      correct: 'Citești doar ca să numeri paginile.',
      wrong: [
        'Poți citi ca să înțelegi un personaj.',
        'Poți citi ca să afli o informație.',
        'Poți citi de plăcere, fără fișă.'
      ],
      explain: 'Număratul paginilor nu este scopul lecturii. Înțelegerea, informația și plăcerea sunt motive reale.'
    },
    {
      id: 'hx-r5k-08', lesson: 'tiparita-digitala', level: 8, skill: 'analyze', point: 'carte',
      question: 'O carte tipărită și același text pe ecran. Ce rămâne la fel?',
      correct: 'ideile textului',
      wrong: ['mirosul hârtiei', 'greutatea volumului', 'locul raftului'],
      explain: 'Suportul se schimbă, ideile rămân. Mirosul, greutatea și raftul țin de obiectul tipărit, nu de text.'
    }
  ]);
  const tests = [
    ...counts([
      {
        id: 'hz-r5k-01', lesson: 'silaba', level: 6, skill: 'apply', point: 'silaba',
        prompt: 'Câte silabe are cuvântul «poveste»?',
        explain: 'po-ves-te. Trei silabe.',
        steps: ['po', 'ves', 'te', 'Total: 3'],
        proof: () => 3
      },
      {
        id: 'hz-r5k-02', lesson: 'cuvant-alfabet', level: 6, skill: 'apply', point: 'alfabet',
        prompt: 'Între cuvintele elev, carte, poveste, câte stau înaintea lui «poveste» în dicționar?',
        explain: 'carte și elev încep cu c și e, ambele înaintea lui p. Sunt două.',
        steps: ['carte este înainte', 'elev este înainte', 'poveste este ultimul', 'Total: 2'],
        proof: () => 2
      }
    ]),
    ...words([
      {
        id: 'hz-r5k-03', lesson: 'sinonime', level: 7, skill: 'trap', point: 'sinonim',
        prompt: 'Înlocuiește «a răsfoi» din «răsfoiesc albumul» cu cel mai apropiat verb din listă: citesc, rup, ascund. Scrie verbul ales.',
        answer: 'citesc',
        explain: 'A răsfoi un album înseamnă a-i parcurge filele, deci citesc este cel mai aproape. Rup și ascund schimbă fapta.',
        steps: ['răsfoiesc înseamnă parcurg filele', 'rup este o distrugere', 'citesc păstrează ideea']
      },
      {
        id: 'hz-r5k-04', lesson: 'stea-intrebari', level: 8, skill: 'analyze', point: 'intrebare',
        prompt: 'Întrebarea «De ce a plecat eroul?» cere o cauză sau un număr de litere? Scrie: cauză.',
        answer: 'cauză',
        explain: 'De ce întreabă motivul, nu o numărătoare de litere.',
        steps: ['De ce cere un motiv', 'Numărul de litere ar fi o întrebare de formă', 'Răspunsul este cauză']
      }
    ])
  ];
  return pack('romana:5:cartea', flashcards, tests);
}

function povestirea() {
  const flashcards = grids([
    {
      id: 'hx-r5p-01', lesson: 'narativ', level: 1, skill: 'apply', point: 'narativ',
      question: 'Care enunț este narativ?',
      correct: 'Apoi băiatul a deschis poarta.',
      wrong: ['Poarta era verde și înaltă.', 'Ce poartă frumoasă!', 'Poarta, poarta, poarta.'],
      explain: 'Narativul spune o faptă în timp: a deschis. Descrierea spune cum arată. Exclamația și repetiția nu povestesc o întâmplare.'
    },
    {
      id: 'hx-r5p-02', lesson: 'personificare', level: 2, skill: 'trap', point: 'personificare',
      question: 'În «Vântul a trântit ușa și a oftat.», figura este…',
      correct: 'personificare',
      wrong: ['enumerație', 'repetiție', 'titlu'],
      explain: 'Vântul primește fapte omenești: trântește și oftează. Nu este o listă de obiecte și nu este o simplă repetare.'
    },
    {
      id: 'hx-r5p-03', lesson: 'verbul', level: 3, skill: 'apply', point: 'verb',
      question: 'În «Ieri am găsit cheia.», verbul este la timpul…',
      correct: 'trecut',
      wrong: ['prezent', 'viitor', 'imperativ'],
      explain: '«am găsit» arată o faptă încheiată. Ieri întărește trecutul. Nu este o poruncă și nu este o faptă care abia urmează.'
    },
    {
      id: 'hx-r5p-04', lesson: 'perfect-compus', level: 4, skill: 'trap', point: 'timp',
      question: 'Care formă este perfect compus?',
      correct: 'am citit',
      wrong: ['citeam', 'voi citi', 'citind'],
      explain: 'Perfectul compus se formează cu am, ai, a plus participiul: am citit. citeam este imperfect, voi citi este viitor, citind este gerunziu.'
    },
    {
      id: 'hx-r5p-05', lesson: 'viitor-banda', level: 5, skill: 'apply', point: 'viitor',
      question: 'Ca să anunți o faptă care încă nu s-a întâmplat, alegi…',
      correct: 'voi desena',
      wrong: ['am desenat', 'desenam', 'desenez acum'],
      explain: 'voi desena mută fapta în viitor. am desenat și desenam sunt în trecut. desenez acum este prezent.'
    },
    {
      id: 'hx-r5p-06', lesson: 'compunere-narativa', level: 6, skill: 'analyze', point: 'plan',
      question: 'Într-o compunere narativă, ce lipsește dacă ai doar «Era o casă veche.»?',
      correct: 'o întâmplare',
      wrong: ['un substantiv', 'un loc', 'un adjectiv'],
      explain: 'Propoziția descrie casa, dar nu spune ce se întâmplă. Ai deja loc și însușire. Îți trebuie o faptă.'
    },
    {
      id: 'hx-r5p-07', lesson: 'imperativ', level: 7, skill: 'trap', point: 'imperativ',
      question: '«Închide ușa!» este…',
      correct: 'o poruncă',
      wrong: ['o faptă deja făcută', 'o descriere a ușii', 'o întrebare'],
      explain: 'Imperativul cere cuiva să facă ceva acum. Nu povestește un trecut și nu descrie ușa.'
    },
    {
      id: 'hx-r5p-08', lesson: 'forme-narative', level: 8, skill: 'false', point: 'narativ',
      question: 'Care enunț este fals?',
      correct: 'O bandă desenată nu poate povesti, pentru că are imagini.',
      wrong: [
        'O povestire are întâmplări așezate în timp.',
        'Dialogul poate apărea înăuntrul unei povestiri.',
        'Naratorul este cel care spune faptele.'
      ],
      explain: 'Imaginile în ordine pot povesti la fel de bine ca propozițiile. Celelalte enunțuri descriu corect povestirea, dialogul și naratorul.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r5p-01', lesson: 'personificare', level: 6, skill: 'trap', point: 'personificare',
        prompt: 'Ce figură este în «Ploaia bate în geam și se plânge»? Un cuvânt: personificare.',
        answer: 'personificare',
        explain: 'Ploaia primește o faptă și o stare omenească, deci este personificare.',
        steps: ['Ploaia nu se plânge de fapt', 'I se dă un gest omenesc', 'Figura este personificare']
      },
      {
        id: 'hz-r5p-02', lesson: 'perfect-compus', level: 7, skill: 'apply', point: 'timp',
        prompt: 'Ce timp este «am găsit»? Scrie: perfect compus.',
        answer: 'perfect compus',
        explain: 'am plus participiul găsit formează perfectul compus.',
        steps: ['Auxiliarul am', 'Participiul găsit', 'Timpul este perfect compus']
      }
    ]),
    ...counts([
      {
        id: 'hz-r5p-03', lesson: 'narativ', level: 6, skill: 'analyze', point: 'narativ',
        prompt: 'În «A deschis poarta, a intrat și a închis.» câte acțiuni sunt?',
        explain: 'Trei verbe la perfect: a deschis, a intrat, a închis.',
        steps: ['a deschis', 'a intrat', 'a închis', 'Total: 3'],
        proof: () => 3
      },
      {
        id: 'hz-r5p-04', lesson: 'compunere-narativa', level: 8, skill: 'analyze', point: 'plan',
        prompt: 'Un plan narativ are început, cuprins și încheiere. Câte părți are acest plan?',
        explain: 'Trei părți: început, cuprins, încheiere.',
        steps: ['început', 'cuprins', 'încheiere', 'Total: 3'],
        proof: () => 3
      }
    ])
  ];
  return pack('romana:5:povestirea', flashcards, tests);
}

function prietenia() {
  const flashcards = grids([
    {
      id: 'hx-r5r-01', lesson: 'substantiv', level: 1, skill: 'apply', point: 'substantiv',
      question: 'În «Prietenul aduce o veste.», substantivul subiect este…',
      correct: 'Prietenul',
      wrong: ['aduce', 'o', 'veste'],
      explain: 'Prietenul numește persoana despre care se spune ceva. aduce este verb. veste este tot substantiv, dar este obiectul veștii, nu subiectul.'
    },
    {
      id: 'hx-r5r-02', lesson: 'scrisoare-prieten', level: 2, skill: 'apply', point: 'scrisoare',
      question: 'Într-o scrisoare către un prieten, formula de început potrivită este…',
      correct: 'Dragă Andrei,',
      wrong: ['Către instanță,', 'Subsemnatul declară,', 'Tabelul de mai jos,'],
      explain: 'Dragă plus numele deschide o scrisoare prietenoasă. Formulele de instanță, de declarație sau de tabel țin de alte texte.'
    },
    {
      id: 'hx-r5r-03', lesson: 'articol-prepozitie', level: 3, skill: 'trap', point: 'articol',
      question: 'În «i-am scris unui prieten», articolul nehotărât este…',
      correct: 'unui',
      wrong: ['i-am', 'scris', 'prieten'],
      explain: 'unui însoțește substantivul și arată că prietenul nu este numit cu un articol hotărât. i-am și scris țin de verb.'
    },
    {
      id: 'hx-r5r-04', lesson: 'prepozitie', level: 4, skill: 'apply', point: 'prepozitie',
      question: 'În «Merg la Andrei.», prepoziția este…',
      correct: 'la',
      wrong: ['Merg', 'Andrei', 'la Andrei'],
      explain: 'la leagă verbul de nume și arată direcția. Andrei este numele. Grupul întreg nu este doar prepoziția.'
    },
    {
      id: 'hx-r5r-05', lesson: 'explicativ', level: 5, skill: 'analyze', point: 'explicativ',
      question: 'Care enunț explică, nu doar povestește?',
      correct: 'A tăcut fiindcă se temea de ceartă.',
      wrong: ['A tăcut.', 'Apoi a plecat.', 'Era seară.'],
      explain: 'fiindcă dă cauza tăcerii. Celelalte enunțuri spun o faptă sau un timp, fără motiv.'
    },
    {
      id: 'hx-r5r-06', lesson: 'prejudecati', level: 6, skill: 'false', point: 'prejudecata',
      question: 'Care enunț este o prejudecată, nu o observație?',
      correct: 'Toți băieții joacă fotbal și nu citesc.',
      wrong: [
        'Andrei a citit azi o poveste.',
        'Irina a venit cu o carte nouă.',
        'În pauză, trei colegi au vorbit despre un meci.'
      ],
      explain: 'Prejudecata întinde o etichetă pe un grup întreg. Celelalte enunțuri spun fapte despre persoane anume, verificabile.'
    },
    {
      id: 'hx-r5r-07', lesson: 'inferente', level: 7, skill: 'analyze', point: 'inferenta',
      question: '«A pus două cești pe masă, deși era singur în cameră.» Ce poți deduce?',
      correct: 'Așteaptă pe cineva.',
      wrong: ['A spart o cană.', 'Nu are masă.', 'A plecat din cameră.'],
      explain: 'A doua ceașcă, pusă când e singur, pregătește un oaspete. Textul nu spune că a spart ceva și nici că masa lipsește.'
    },
    {
      id: 'hx-r5r-08', lesson: 'portret-prieten', level: 8, skill: 'analyze', point: 'portret',
      question: 'Într-un portret, care detaliu arată caracterul, nu doar înfățișarea?',
      correct: 'Împrumută creionul fără să fie rugat.',
      wrong: ['Are părul scurt.', 'Poartă o geacă albastră.', 'Stă în banca a doua.'],
      explain: 'Gestul de a împrumuta arată o trăsătură. Părul, geaca și banca descriu înfățișarea sau locul.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r5r-01', lesson: 'prepozitie', level: 6, skill: 'apply', point: 'prepozitie',
        prompt: 'Ce prepoziție este în «Stau cu Mara»? Scrie doar prepoziția.',
        answer: 'cu',
        explain: 'cu leagă verbul de numele Mara și arată însoțirea.',
        steps: ['Cauți cuvântul de legătură', 'cu stă înaintea numelui', 'Prepoziția este cu']
      },
      {
        id: 'hz-r5r-02', lesson: 'explicativ', level: 8, skill: 'analyze', point: 'explicativ',
        prompt: 'În «A tăcut fiindcă se temea.», cuvântul fiindcă introduce o cauză sau un loc? Scrie: cauză.',
        answer: 'cauză',
        explain: 'fiindcă răspunde la de ce, deci introduce cauza.',
        steps: ['fiindcă leagă două idei', 'a doua idee spune motivul', 'Este o cauză']
      }
    ]),
    ...counts([
      {
        id: 'hz-r5r-03', lesson: 'substantiv', level: 6, skill: 'apply', point: 'substantiv',
        prompt: 'Câte substantive sunt în «Prietenul aduce o veste.»?',
        explain: 'Prietenul și veste. Două substantive. aduce este verb, o este articol.',
        steps: ['Prietenul', 'veste', 'aduce nu este substantiv', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r5r-04', lesson: 'inferente', level: 7, skill: 'analyze', point: 'inferenta',
        prompt: 'În «A pus două cești, deși era singur.», câte cești a pus?',
        explain: 'Textul spune două cești.',
        steps: ['Citești numărul din enunț', 'două cești', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:5:prietenia', flashcards, tests);
}

function natura() {
  const flashcards = grids([
    {
      id: 'hx-r5n-01', lesson: 'emotie-adjectiv', level: 1, skill: 'apply', point: 'adjectiv',
      question: 'În «pădurea liniștită», adjectivul este…',
      correct: 'liniștită',
      wrong: ['pădurea', 'în', 'era'],
      explain: 'liniștită arată cum este pădurea. pădurea este substantivul determinat.'
    },
    {
      id: 'hx-r5n-02', lesson: 'grade', level: 2, skill: 'trap', point: 'comparativ',
      question: 'Forma corectă de comparativ este…',
      correct: 'mai înalt decât',
      wrong: ['cel mai mai înalt', 'foarte decât înalt', 'mai foarte înalt'],
      explain: 'Comparativul de superioritate este mai plus adjectiv plus decât. cel mai este superlativul. foarte nu se combină cu decât.'
    },
    {
      id: 'hx-r5n-03', lesson: 'comparatie', level: 3, skill: 'trap', point: 'comparatie',
      question: '«Frunza e ca o barcă mică.» este…',
      correct: 'comparație',
      wrong: ['personificare', 'enumerație', 'imperativ'],
      explain: 'ca leagă frunza de o barcă, deci este comparație. Frunza nu primește o faptă omenească și nu este o listă.'
    },
    {
      id: 'hx-r5n-04', lesson: 'descriptiv', level: 4, skill: 'analyze', point: 'descriere',
      question: 'Care enunț este descriptiv?',
      correct: 'Lacul era neted și cenușiu.',
      wrong: ['Apoi am plecat spre lac.', 'Închide fereastra!', 'De ce este lacul adânc?'],
      explain: 'Descrierea spune cum arată lacul. Celelalte enunțuri povestesc, poruncesc sau întreabă.'
    },
    {
      id: 'hx-r5n-05', lesson: 'camp-lexical', level: 5, skill: 'apply', point: 'camp',
      question: 'Care cuvânt nu stă în câmpul lexical al pădurii?',
      correct: 'farfurie',
      wrong: ['stejar', 'potecă', 'frunză'],
      explain: 'Stejarul, poteca și frunza țin de pădure. Farfuria ține de masă, nu de peisaj.'
    },
    {
      id: 'hx-r5n-06', lesson: 'descriere-stiintifica', level: 6, skill: 'false', point: 'descriere',
      question: 'Care enunț este fals despre o descriere științifică?',
      correct: 'Trebuie să personifice norul ca să fie exactă.',
      wrong: [
        'Poate spune culoarea și mărimea.',
        'Evită exclamațiile de uimire.',
        'Se sprijină pe ce se observă.'
      ],
      explain: 'Personificarea înfrumusețează, nu face descrierea mai exactă. Culoarea, mărimea și observația țin de textul științific.'
    },
    {
      id: 'hx-r5n-07', lesson: 'grade', level: 7, skill: 'analyze', point: 'superlativ',
      question: '«Cel mai scurt drum» este…',
      correct: 'superlativ relativ',
      wrong: ['comparativ de egalitate', 'grad pozitiv', 'imperativ'],
      explain: 'cel mai scoate un element dintr-un grup: superlativ relativ. Gradul pozitiv ar fi doar scurt. Egalitatea ar folosi la fel de.'
    },
    {
      id: 'hx-r5n-08', lesson: 'portret-fiinta', level: 8, skill: 'analyze', point: 'portret',
      question: 'În portretul unei păsări, care detaliu este de comportament?',
      correct: 'Se întoarce în fiecare seară la același cuib.',
      wrong: ['Are ciocul galben.', 'Penajul este sur.', 'Aripile sunt lungi.'],
      explain: 'Întoarcerea la cuib este o faptă repetată. Ciocul, penajul și aripile sunt trăsături de înfățișare.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r5n-01', lesson: 'comparatie', level: 6, skill: 'trap', point: 'comparatie',
        prompt: 'Ce figură este în «Frunza e ca o barcă»? Scrie: comparație.',
        answer: 'comparație',
        explain: 'Cuvântul ca apropie două lucruri diferite, deci este comparație.',
        steps: ['ca leagă frunza de barcă', 'Nu i se dă frunzei o faptă omenească', 'Figura este comparație']
      },
      {
        id: 'hz-r5n-02', lesson: 'grade', level: 8, skill: 'analyze', point: 'superlativ',
        prompt: '«cel mai înalt brad» este comparativ sau superlativ? Scrie: superlativ.',
        answer: 'superlativ',
        explain: 'cel mai alege extremul dintr-un grup, deci este superlativ.',
        steps: ['cel mai marchează extremul', 'comparativul ar fi mai înalt decât', 'Răspunsul este superlativ']
      }
    ]),
    ...counts([
      {
        id: 'hz-r5n-03', lesson: 'emotie-adjectiv', level: 6, skill: 'apply', point: 'adjectiv',
        prompt: 'Câte adjective sunt în «pădurea liniștită și verde»?',
        explain: 'liniștită și verde. Două adjective pentru pădure.',
        steps: ['liniștită', 'verde', 'pădurea este substantiv', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r5n-04', lesson: 'camp-lexical', level: 7, skill: 'apply', point: 'camp',
        prompt: 'Din lista stejar, potecă, farfurie, frunză, câte cuvinte țin de pădure?',
        explain: 'Stejar, potecă și frunză. Farfuria nu. Sunt trei.',
        steps: ['stejar intră', 'potecă intră', 'frunză intră', 'farfurie iese', 'Total: 3'],
        proof: () => 3
      }
    ])
  ];
  return pack('romana:5:natura', flashcards, tests);
}

function trepte() {
  const flashcards = grids([
    {
      id: 'hx-r5t-01', lesson: 'numeral', level: 1, skill: 'apply', point: 'numeral',
      question: 'În «Am trei caiete.», cuvântul «trei» este…',
      correct: 'numeral',
      wrong: ['verb', 'prepoziție', 'interjecție'],
      explain: 'trei arată cât de multe caiete sunt. Nu exprimă o acțiune și nu leagă două părți.'
    },
    {
      id: 'hx-r5t-02', lesson: 'ordinal', level: 2, skill: 'trap', point: 'ordinal',
      question: 'Care formă este numeral ordinal?',
      correct: 'al doilea',
      wrong: ['doi', 'dublu', 'îndoit'],
      explain: 'al doilea arată locul într-o serie. doi este cardinal. dublu și îndoit spun altceva decât ordinea.'
    },
    {
      id: 'hx-r5t-03', lesson: 'atitudine', level: 3, skill: 'analyze', point: 'atitudine',
      question: '«Nu mai încerca, tot nu îți iese.» exprimă…',
      correct: 'descurajare',
      wrong: ['încurajare', 'o rețetă', 'un orar'],
      explain: 'Mesajul taie cheful de a mai încerca. Încurajarea ar spune să continui. Nu este o rețetă și nu este un program.'
    },
    {
      id: 'hx-r5t-04', lesson: 'variatie', level: 4, skill: 'trap', point: 'regional',
      question: '«Bădiță» într-o povestire de la sat este mai ales…',
      correct: 'un cuvânt regional',
      wrong: ['un numeral', 'o prepoziție', 'un mod verbal'],
      explain: 'Bădiță ține de vorbirea unei zone și numește o persoană. Nu arată o cantitate și nu leagă propoziții.'
    },
    {
      id: 'hx-r5t-05', lesson: 'masuri-vechi', level: 5, skill: 'apply', point: 'masura',
      question: 'Într-un text vechi, «o palmă de loc» măsoară…',
      correct: 'o lungime aproximativă',
      wrong: ['o culoare', 'o emoție', 'un timp verbal'],
      explain: 'Palma era o măsură de lungime din vorbirea veche, nu o culoare și nu o stare.'
    },
    {
      id: 'hx-r5t-06', lesson: 'relatare-scoala', level: 6, skill: 'analyze', point: 'relatare',
      question: 'Într-o relatare despre o oră de curs, ce trebuie neapărat?',
      correct: 'fapte în ordine',
      wrong: ['doar adjective de laudă', 'o listă de coperți', 'un desen fără text'],
      explain: 'Relatarea urmărește ce s-a întâmplat, în ordine. Laudele fără fapte și lista de coperți nu spun întâmplarea.'
    },
    {
      id: 'hx-r5t-07', lesson: 'patrimoniu', level: 7, skill: 'false', point: 'patrimoniu',
      question: 'Care enunț este fals?',
      correct: 'O casă memorială este doar o clădire oarecare, fără legătură cu cineva.',
      wrong: [
        'O casă memorială păstrează amintirea unei persoane.',
        'Obiectele dinăuntru pot povesti un mod de viață.',
        'Patrimoniul se îngrijește, nu se aruncă la primul semn de uzură.'
      ],
      explain: 'Memorialul există tocmai pentru legătura cu o persoană sau cu o întâmplare. Celelalte enunțuri sunt adevărate.'
    },
    {
      id: 'hx-r5t-08', lesson: 'identitate-sat', level: 8, skill: 'analyze', point: 'identitate',
      question: 'Ce detaliu arată viața unui sat, nu doar o fotografie de peisaj?',
      correct: 'Oamenii ies seara la poartă și își spun vești.',
      wrong: ['Cerul este albastru.', 'Drumul este drept.', 'Iarba este verde.'],
      explain: 'Obiceiul de la poartă arată o comunitate. Cerul, drumul și iarba pot sta într-un peisaj fără oameni.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r5t-01', lesson: 'ordinal', level: 6, skill: 'trap', point: 'ordinal',
        prompt: '«al treilea» este numeral cardinal sau ordinal? Scrie: ordinal.',
        answer: 'ordinal',
        explain: 'al treilea arată poziția în serie, deci este ordinal. Cardinalul ar fi trei.',
        steps: ['al treilea dă locul în șir', 'trei ar fi cardinalul', 'Răspunsul este ordinal']
      },
      {
        id: 'hz-r5t-02', lesson: 'atitudine', level: 8, skill: 'analyze', point: 'atitudine',
        prompt: 'Replica «Mai încearcă o dată, ești aproape.» încurajează sau descurajează? Scrie: încurajează.',
        answer: 'încurajează',
        explain: 'Îl cheamă să continue și îi spune că este aproape, deci încurajează.',
        steps: ['Cere o nouă încercare', 'Recunoaște progresul', 'Atitudinea încurajează']
      }
    ]),
    ...counts([
      {
        id: 'hz-r5t-03', lesson: 'numeral', level: 6, skill: 'apply', point: 'numeral',
        prompt: 'În «Am trei caiete și două creioane.», câte numerale sunt?',
        explain: 'trei și două. Două numerale.',
        steps: ['trei', 'două', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r5t-04', lesson: 'relatare-scoala', level: 7, skill: 'analyze', point: 'relatare',
        prompt: 'O relatare are trei momente: sosirea, ora și pauza. Câte momente trebuie să acoperi?',
        explain: 'Trei momente, în această ordine.',
        steps: ['sosirea', 'ora', 'pauza', 'Total: 3'],
        proof: () => 3
      }
    ])
  ];
  return pack('romana:5:trepte', flashcards, tests);
}

function eroi() {
  const flashcards = grids([
    {
      id: 'hx-r5h-01', lesson: 'pronume', level: 1, skill: 'apply', point: 'pronume',
      question: 'În «El a deschis poarta.», pronumele este…',
      correct: 'El',
      wrong: ['a deschis', 'poarta', 'deschis'],
      explain: 'El ține locul unui nume de persoană. a deschis este predicatul. poarta este substantiv.'
    },
    {
      id: 'hx-r5h-02', lesson: 'nonliterar', level: 2, skill: 'apply', point: 'nonliterar',
      question: 'Care text este nonliterar?',
      correct: 'Instrucțiunea de pe un extinctor.',
      wrong: ['O poveste cu un zmeu.', 'Un pastel despre lac.', 'O legendă despre o cetate.'],
      explain: 'Instrucțiunea spune cum folosești un obiect. Povestea, pastelul și legenda sunt texte literare.'
    },
    {
      id: 'hx-r5h-03', lesson: 'politete', level: 3, skill: 'trap', point: 'politete',
      question: 'Cea mai potrivită cerere către un muzeograf este…',
      correct: 'Vă rog să îmi spuneți unde este sala.',
      wrong: ['Dă-mi sala aia.', 'Taci și arată.', 'Nu mă interesează regula.'],
      explain: 'Vă rog și forma de politețe cer informația fără să jignească. Porunca și refuzul regulii nu sunt cereri politicoase.'
    },
    {
      id: 'hx-r5h-04', lesson: 'marca-persoanei', level: 4, skill: 'analyze', point: 'persoana',
      question: 'În «Noi am păstrat scrisoarea.», marca persoanei I plural este…',
      correct: 'Noi',
      wrong: ['scrisoarea', 'am păstrat', 'păstrat'],
      explain: 'Noi arată cine face fapta, persoana I plural. Verbul se acordă cu noi, dar marca cerută este pronumele.'
    },
    {
      id: 'hx-r5h-05', lesson: 'compunere-eroica', level: 5, skill: 'false', point: 'erou',
      question: 'Care enunț este fals despre un portret de persoană curajoasă?',
      correct: 'Ajunge să spui că este erou, fără nicio faptă.',
      wrong: [
        'O faptă concretă face curajul vizibil.',
        'Frica poate apărea înainte de decizie.',
        'Detaliul mărunt poate fi mai convingător decât eticheta.'
      ],
      explain: 'Eticheta fără faptă nu arată curajul. O faptă, o ezitare și un detaliu concret construiesc portretul.'
    },
    {
      id: 'hx-r5h-06', lesson: 'pronume', level: 6, skill: 'trap', point: 'pronume',
      question: 'Înlocuiește corect numele repetat: «Ana a venit și Ana a vorbit.»',
      correct: 'Ana a venit și ea a vorbit.',
      wrong: [
        'Ana a venit și ei a vorbit.',
        'Ana a venit și eu a vorbit.',
        'Ana a venit și ele a vorbit.'
      ],
      explain: 'Ana este o persoană, feminin singular, deci ea. ei este plural sau altă formă. eu schimbă persoana. ele este plural.'
    },
    {
      id: 'hx-r5h-07', lesson: 'nonliterar', level: 7, skill: 'analyze', point: 'nonliterar',
      question: 'Într-o știre scurtă despre un incendiu stins, ce nu are ce căuta?',
      correct: 'o invocație către zei',
      wrong: ['locul', 'ora', 'cine a intervenit'],
      explain: 'Știrea cere fapte: unde, când, cine. Invocația ține de un text literar sau solemn, nu de informare.'
    },
    {
      id: 'hx-r5h-08', lesson: 'compunere-eroica', level: 8, skill: 'analyze', point: 'erou',
      question: 'Două texte despre același pompier. Care este mai convingător?',
      correct: 'A urcat scara și a scos copilul din fum.',
      wrong: [
        'Este cel mai brav om din lume.',
        'Erou, erou, erou.',
        'Toți pompierii sunt la fel.'
      ],
      explain: 'Fapta concretă se poate vedea. Superlativul gol, repetiția și eticheta de grup nu arată ce a făcut omul acela.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r5h-01', lesson: 'pronume', level: 6, skill: 'apply', point: 'pronume',
        prompt: 'Cu ce pronume o înlocuiești pe Ana în «Ana a vorbit»? Scrie: ea.',
        answer: 'ea',
        explain: 'Ana este feminin, o persoană, persoana a III-a singular: ea.',
        steps: ['Ana este o fată', 'Persoana a III-a singular', 'Pronumele este ea']
      },
      {
        id: 'hz-r5h-02', lesson: 'nonliterar', level: 8, skill: 'analyze', point: 'nonliterar',
        prompt: 'O rețetă de supă este text literar sau nonliterar? Scrie: nonliterar.',
        answer: 'nonliterar',
        explain: 'Rețeta dă pași de urmat, nu inventează o lume. Este nonliterar.',
        steps: ['Are pași și cantități', 'Nu construiește personaje', 'Este nonliterar']
      }
    ]),
    ...counts([
      {
        id: 'hz-r5h-03', lesson: 'marca-persoanei', level: 6, skill: 'apply', point: 'persoana',
        prompt: 'În «Noi am rămas. Voi ați plecat.», câte pronume personale sunt?',
        explain: 'Noi și voi. Două pronume.',
        steps: ['Noi', 'Voi', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r5h-04', lesson: 'compunere-eroica', level: 7, skill: 'analyze', point: 'erou',
        prompt: 'În «A urcat și a scos copilul.», câte acțiuni concrete are pompierul?',
        explain: 'A urcat și a scos. Două acțiuni.',
        steps: ['a urcat', 'a scos', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:5:eroi', flashcards, tests);
}

module.exports = {
  evaluareInitiala,
  cuvinte,
  cartea,
  povestirea,
  prietenia,
  natura,
  trepte,
  eroi
};
