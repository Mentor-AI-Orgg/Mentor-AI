// Texte EN de română generate pe seed: literar + nonliterar originale,
// itemi legați de faptele din texte. Nu copiem subiecte publicate.
// Combinările (kit × loc × nume × obiect × citat × orar × paragrafe) nu se epuizează.

const { pick, shuffle, int } = require('./itemRng');

const NOVEL =
  'Poți porni de la o carte citită la gimnaziu (Amintiri din copilărie, Povestea lui Harap-Alb, Dumbrava minunată, Toate pânzele sus! sau alta). O valoare comună + un fapt din opera ta + un fapt din fragment.';

const ASSOCIATE_TOKENS = [
  'amintiri', 'creanga', 'creangă', 'harap', 'dumbrava', 'sadoveanu', 'tudoran', 'pânze', 'panze',
  'prieten', 'familie', 'curaj', 'grij', 'natur', 'copil', 'bunici', 'bunic', 'onest', 'adevăr', 'adevar',
  'responsabil', 'învățătur', 'invatatur', 'lectur', 'carte', 'roman', 'poveste', 'oper'
];

const NAMES = [
  'Mara', 'Nica', 'Luca', 'Ira', 'Teo', 'Ana', 'Daria', 'Irina', 'Sofia', 'Matei',
  'Vlad', 'Ilinca', 'Radu', 'Eva', 'David', 'Lara', 'Codrin', 'Mia'
];

const HELPERS = [
  'un băiat de la a șaptea', 'o fată de la a șasea', 'colegul de bancă', 'bunicul',
  'bunica', 'profesorul de serviciu', 'o vecină cu sacoșa', 'maistrul', 'bibliotecara'
];

const WHEN = [
  'înainte de prima oră', 'la recreația mare', 'după ultima oră', 'sâmbăta de dimineață',
  'într-o luni udă', 'vineri, când holul e gol', 'în amurg', 'când clopoțelul încă n-a sunat'
];

const SENSE = [
  'aerul miroase a cretă udă și a ghiozdane deschise în grabă',
  'aerul miroase a pământ ud și a frunze frecate',
  'aerul miroase a rumeguș dulce și a ulei vechi',
  'aerul miroase a cafea de automat și a oțel ud',
  'aerul miroase a mere tăiate și a lemn cald',
  'aerul miroase a hârtie veche și a praf de pe pervaz',
  'aerul miroase a pâine caldă și a ploaie pe asfalt',
  'aerul miroase a clor slab și a halate spălate'
];

const WEATHER = [
  'Joi a plouat de dimineață',
  'Vântul mută o frunză pe alee',
  'Soarele bate în geamul crăpat',
  'Norii stau jos, ca o pătură spălată prost',
  'Aerul e rece și se lipește de unghii',
  'Ploaia bate în tablă ca o numărătoare'
];

const SCHOOLS = [
  'Școala Gimnazială „Scara 3”',
  'Școala Gimnazială nr. 4',
  'Școala Gimnazială „Zidul verde”',
  'Școala Gimnazială nr. 2',
  'Școala Gimnazială „Masa caldă”',
  'Școala Gimnazială „Ora din noi”'
];

const WEEKDAYS = ['luni', 'marți', 'miercuri', 'joi', 'vineri'];
const MONTHS = ['martie', 'aprilie', 'mai', 'octombrie', 'noiembrie'];

const DISTRACTOR_PLACES = [
  'un peron de gară', 'o sală de sport a directorului', 'un laborator de chimie',
  'un chioșc de ziare', 'o cabină de tren', 'un pod de autostradă'
];
const DISTRACTOR_OBJECTS = [
  'un telefon', 'o geacă uitată', 'un caiet de mate gol', 'un afiș al directorului', 'o minge de fotbal'
];

const KITS = [
  {
    id: 'viu',
    theme: 'grijă pentru un loc viu, ținut cu o regulă mică',
    themeChoice: 'grijă pentru un loc viu, cu reguli simple',
    value: 'grija',
    novel: 'Dumbrava minunată',
    places: [
      { loc: 'sera din spatele școlii', prep: 'în seră' },
      { loc: 'cireșul din spatele școlii', prep: 'lângă cireș' },
      { loc: 'ghivecele de pe pervazul de la etajul doi', prep: 'la ghivece' },
      { loc: 'pajistea de lângă terenul de sport', prep: 'pe pajiste' }
    ],
    objects: [
      { obj: 'o sticlă cu apă', token: 'sticl' },
      { obj: 'o pungă de pânză cu două pietre', token: 'pung' },
      { obj: 'o sfoară pentru o tulpină strâmbă', token: 'sfoar' },
      { obj: 'o lingură veche din geantă', token: 'lingur' }
    ],
    quotes: [
      'Nu trânti geamul',
      'Udați-l joi',
      'Apa, la rădăcină, nu pe frunze',
      'Nu e al nostru, e al curții'
    ],
    verb: 'deschide',
    adj: 'umed',
    adjNoun: 'pământ umed',
    splitWord: 'geamul',
    split: 'ge-a-mul',
    compare: 'ca un deget de aer',
    rule: 'Nu se culege fără profesor.',
    predRule: 'nu se culege',
    nonKind: 'un regulament de grijă pentru un loc al școlii',
    nonTitle: 'Regulament — locul viu al școlii',
    numberLabel: 'ore de voluntariat pe lună',
    senses: [
      'aerul miroase a pământ ud și a frunze frecate',
      'aerul miroase a iarbă tăiată și a sticlă caldă de seră',
      'aerul miroase a scoarță udă și a praf de alee'
    ]
  },
  {
    id: 'drum',
    theme: 'așteptarea unui drum ținut cu o regulă, nu cu alergare',
    themeChoice: 'așteptarea unui drum care trebuie ținut cu reguli',
    value: 'răbdarea',
    novel: 'Toate pânzele sus',
    places: [
      { loc: 'banca udă din stația de autobuz', prep: 'în stație' },
      { loc: 'peronul 2, cu ceasul care minte un minut', prep: 'pe peron' },
      { loc: 'podul de lemn peste pârâu', prep: 'pe pod' },
      { loc: 'poarta școlii, la capătul aleii', prep: 'la poartă' }
    ],
    objects: [
      { obj: 'un bilet mototolit', token: 'bilet' },
      { obj: 'un plic galben ținut cu amândouă mâinile', token: 'plic' },
      { obj: 'o sacoșă cu pâine', token: 'sacoș' },
      { obj: 'un caiet deschis la o pagină cu săgeți', token: 'caiet' }
    ],
    quotes: [
      'Nu alerga',
      'Așteaptă în stație, nu pe șosea',
      'Du-te drept, nu te opri la povești',
      'Lângă cuie, nu pe mijloc'
    ],
    verb: 'așteaptă',
    adj: 'udă',
    adjNoun: 'banca udă',
    splitWord: 'autobuzul',
    split: 'a-u-to-bu-zul',
    compare: 'ca o regulă învățată pe de rost',
    rule: 'Nu se rezervă locuri.',
    predRule: 'nu se rezervă',
    nonKind: 'un anunț de program (navetă / orar / poartă)',
    nonTitle: 'Anunț — drumul spre școală',
    numberLabel: 'locuri pe tură',
    senses: [
      'aerul miroase a cafea de automat și a oțel ud',
      'aerul miroase a ploaie pe beton și a ghiozdane ude',
      'aerul miroase a pâine caldă și a asfalt după ploaie'
    ]
  },
  {
    id: 'mana',
    theme: 'o treabă de mână ținută de o regulă care te lasă întreg',
    themeChoice: 'o treabă făcută cu mâinile și cu o regulă care te ține întreg',
    value: 'răbdarea la treabă',
    novel: 'Povestea lui Harap-Alb',
    places: [
      { loc: 'atelierul cu miros de rumeguș și o menghină', prep: 'în atelier' },
      { loc: 'laboratorul de științe, cu dulapul roșu', prep: 'în laborator' },
      { loc: 'bucătăria bunicii, cu cuptorul care pocnește', prep: 'în bucătărie' },
      { loc: 'sala 8, cutia „Redacție” de pe masă', prep: 'la redacție' }
    ],
    objects: [
      { obj: 'o daltă cu tăișul în jos', token: 'dalt' },
      { obj: 'un halat ud pe un cuier', token: 'halat' },
      { obj: 'un caiet cu coperți moi', token: 'caiet' },
      { obj: 'un cuțit scurt de curățat mere', token: 'cuțit' }
    ],
    quotes: [
      'Scândura strâmbă nu e o greșeală, e lemn',
      'Citește-o cu voce. Dacă nu o poți spune, n-o lăsa',
      'Ai citit de două ori cerința?',
      'Tăișul stă în jos, niciodată în buzunar'
    ],
    verb: 'ține',
    adj: 'strâmbă',
    adjNoun: 'scândura strâmbă',
    splitWord: 'rumegușul',
    split: 'ru-me-gu-șul',
    compare: 'ca o manșetă de rumeguș',
    rule: 'Nu se aleargă între mese.',
    predRule: 'nu se aleargă',
    nonKind: 'un regulament de atelier / laborator / redacție',
    nonTitle: 'Regulament — treaba de mână',
    numberLabel: 'elevi într-o grupă',
    senses: [
      'aerul miroase a rumeguș dulce și a ulei vechi',
      'aerul miroase a mere tăiate și a lemn cald',
      'aerul miroase a clor slab și a halate spălate'
    ]
  },
  {
    id: 'sala',
    theme: 'un loc al școlii ținut de grijă și de o listă de reguli',
    themeChoice: 'grijă pentru un loc al școlii și reguli care îl țin în viață',
    value: 'respectul față de un loc comun',
    novel: 'Amintiri din copilărie',
    places: [
      { loc: 'sala de lectură de la subsolul bibliotecii', prep: 'în sala de lectură' },
      { loc: 'cantina, cu tăvile stivuite în dreapta', prep: 'în cantină' },
      { loc: 'curtea interioară, cu sârma de rufe', prep: 'în curte' },
      { loc: 'holul de la parter, lângă scara B', prep: 'pe hol' }
    ],
    objects: [
      { obj: 'un roman cu coperta uzată', token: 'roman' },
      { obj: 'un carnet de cantină', token: 'carnet' },
      { obj: 'un sac închis, etichetat cu clasa', token: 'sac' },
      { obj: 'un prosop albastru, încă ud', token: 'prosop' }
    ],
    quotes: [
      'Citește încet. Nu fugi de cuvinte',
      'Nu se ține locul cu un caiet',
      'Cântărește de două ori',
      'Am închis geamul'
    ],
    verb: 'citește',
    adj: 'uzată',
    adjNoun: 'coperta uzată',
    splitWord: 'biblioteca',
    split: 'bi-bli-o-te-ca',
    compare: 'ca un acord secret',
    rule: 'Nu se sare rândul.',
    predRule: 'nu se sare',
    nonKind: 'un anunț / regulament al unui loc din școală',
    nonTitle: 'Anunț — locul comun al școlii',
    numberLabel: 'volume (sau locuri / saci) permise',
    senses: [
      'aerul miroase a hârtie veche și a praf de pe pervaz',
      'aerul miroase a cretă udă și a ghiozdane deschise în grabă',
      'aerul miroase a ciorbă de cantină și a hol ud'
    ]
  }
];

function pickFacts(rand) {
  const kit = pick(rand, KITS);
  const place = pick(rand, kit.places);
  const object = pick(rand, kit.objects);
  const name = pick(rand, NAMES);
  const helper = pick(rand, HELPERS);
  const when = pick(rand, WHEN);
  const sense = pick(rand, kit.senses || SENSE);
  const weather = pick(rand, WEATHER);
  const quote = pick(rand, kit.quotes);
  const school = pick(rand, SCHOOLS);
  const weekday = pick(rand, WEEKDAYS);
  const month = pick(rand, MONTHS);
  const day = int(rand, 2, 26);
  const openH = pick(rand, ['7:30', '8:00', '8:10']);
  const closeH = pick(rand, ['14:00', '14:30', '16:00', '16:10']);
  const number = pick(rand, [3, 4, 5, 12, 18, 24, 32]);
  const classDuty = pick(rand, ['V A', 'VI B', 'VII A', 'VIII B', 'VIII C']);
  const extraIdx = shuffle(rand, [0, 1, 2, 3, 4]).slice(0, 3);
  return {
    kit, place, object, name, helper, when, sense, weather, quote, school,
    weekday, month, day, openH, closeH, number, classDuty, extraIdx
  };
}

function extras(f) {
  const n = f.name;
  return [
    `${f.weather}. ${n} nu se grăbește. ${f.helper} trece și dă din cap, fără să oprească. Asta e destul: un semn scurt, ca o învoire tăcută.`,
    `Acasă, ${n} își spală mâinile și tot simte locul pe palme. Pe masă, caietul de română așteaptă. Scrie un rând, fără titlu, apoi îl lasă. Nu e temă. E o amintire care nu cere notă.`,
    `A doua zi, același loc. ${n} se întoarce. ${f.object.obj.charAt(0).toUpperCase()}${f.object.obj.slice(1)} e iarăși acolo, sau lipsește o clipă și revine. Locul nu mulțumește. ${n} nu cere mulțumire.`,
    `Un coleg râde: „E treaba ta?” ${n} ridică din umeri. Nu e un titlu. E o listă scurtă: locul, obiectul, vorba ținută. Lista încape într-un buzunar.`,
    `Seara, ${n} trece pe lângă un loc mai mare, de pe strada principală. Nu se oprește. ${f.place.loc} e altceva: l-a ales fără să ceară voie și îl ține cu o tăcere. Dacă dispare toamna, rămâne totuși săptămâna în care cineva a avut grijă.`
  ].filter((_, i) => f.extraIdx.includes(i));
}

function literary(f) {
  const n = f.name;
  const paras = [
    `Textul 1 (literar)`,
    '',
    `${n} ajunge la ${f.place.loc} ${f.when}, când ${f.sense}. Ține ${f.object.obj}, ca pe o treabă, nu ca pe un spectacol. ${f.place.prep.charAt(0).toUpperCase()}${f.place.prep.slice(1)}, nimeni nu pune o placă cu nume.`,
    `„${f.quote}”, aude. Scrisul sau vorba e grăbită, dar literele (sau tonul) stau drepte, ca de om care se teme să greșească, nu să fie prins. ${n} n-a uitat. ${f.kit.verb[0].toUpperCase()}${f.kit.verb.slice(1)} încet, verifică, tace.`,
    `${f.helper} se oprește o clipă. N-a luat nimic. A îndreptat un detaliu — o piatră, un colț de afiș, o sfoară — apoi a plecat. ${n} a văzut totul și nu a strigat. Unele învoiri țin dacă le faci și taci.`,
    `În clasă, cineva șoptește un titlu: „Tu ești cu locul ăla.” ${n} dă din umeri. Nu voia un titlu. Voia ca ${f.place.loc} să rămână viu până ${f.weekday}, dacă mai rămâne. ${f.kit.adjNoun.charAt(0).toUpperCase()}${f.kit.adjNoun.slice(1)} e o dovadă mică, nu o poveste.`,
    `${n} ${f.kit.verb} și repetă gestul, ${f.kit.compare}. ${f.kit.rule} Asta nu e pedeapsă. E o formă de grijă: te ține întreg, și ține locul. ${f.object.obj.charAt(0).toUpperCase()}${f.object.obj.slice(1)} stă la vedere, nu în buzunarul de uitare. ${n} ține minte și cuvântul „${f.kit.splitWord}”, ca pe o unealtă, nu ca pe o podoabă.`,
    ...extras(f),
    `La capăt, ${n} se uită o dată înapoi. ${f.place.loc} nu spune nimic. Rămâne ${f.kit.theme}. ${n} închide ușa (sau geamul, sau caietul) fără grabă. A doua oară, când se va întoarce, va fi aceeași treabă, cu altă lumină, și tot va merita.`
  ];
  return paras.join('\n\n').replace(/\n\n\n+/g, '\n\n');
}

function nonliterary(f) {
  return `Textul 2 (nonliterar)

${f.kit.nonTitle}
${f.school}
Data: ${f.day} ${f.month}

Program: luni–vineri, ${f.openH}–${f.closeH}. Sâmbăta închis, exceptând ultima sâmbătă din lună (10:00–12:00), când Consiliul elevilor ține o oră de lucru în liniște.

Reguli:
• ${f.kit.rule.replace(/\.$/, '')};
• ${f.quote};
• ${f.object.obj} se lasă la locul marcat, nu „unde găsesc”;
• clasa de gardă: ${f.classDuty};
• ${f.kit.numberLabel}: ${f.number};
• nu se țin grupuri zgomotoase fără profesor;
• telefoanele stau în geantă, pe silențios.

Dacă lipsește un coleg, nu se lucrează singur. Dacă plouă, activitatea se mută înăuntru, nu se anulează. Cine întârzie peste cinci minute nu mai intră. La sfârșit se semnează condica, se verifică locul, se anunță ce lipsește — nu a doua zi „din memorie”.

${f.kit.predRule.charAt(0).toUpperCase()}${f.kit.predRule.slice(1)} „că mă cunoaște profesorul”. Reclamațiile se depun în scris, la secretariat, nu verbal la uşă. Părinții pot citi regulamentul pe site; nu au acces în timpul orelor.

Fotografiile se fac doar dacă un profesor cere un rezultat pentru portofoliu, pe fundal neutru, fără chipuri dacă un elev nu e de acord. În săptămâna simulărilor, programul rămâne ${f.openH}–${f.closeH}, fără prelungire, exceptând clasa a VIII-a pe baza carnetului.

Înscrieri: până în data de 5 a lunii, la avizier. Locurile se ocupă în ordine. Cine se înscrie și nu vine de două ori la rând, fără anunț, pierde locul în luna următoare.

Coordonator: dirigintele clasei ${f.classDuty}, cu sprijinul Consiliului elevilor.`;
}

function grammarItems(f) {
  const name = f.name;
  return [
    { n: 1, points: 2, prompt: `Predicatul din „${name} ${f.kit.verb}” este…`, choices: [f.kit.verb, name, f.place.loc.split(' ')[0], 'școala'] },
    { n: 2, points: 2, prompt: `„${f.kit.adj}” din „${f.kit.adjNoun}” e…`, choices: ['adjectiv / atribut', 'verb', 'prepoziție', 'subiect'] },
    { n: 3, points: 2, prompt: `Un sinonim potrivit, în context, pentru „se întoarce” (la loc) este…`, choices: ['revine', 'pleacă de tot', 'uită', 'strigă'] },
    { n: 4, points: 3, prompt: `Subiectul din „${f.kit.rule.replace(/\.$/, '')}” lipsește (propoziție neechivocă). Predicatul este…`, choices: [f.kit.predRule, 'locul', 'profesor', 'Nu'] },
    { n: 5, points: 3, prompt: `„${f.kit.compare}” este…`, choices: ['comparație', 'un predicat', 'un articol', 'o interjecție'] },
    { n: 6, points: 3, prompt: `Cuvântul „${f.kit.splitWord}” se desparte în silabe…`, choices: [f.kit.split, f.kit.splitWord.slice(0, 3) + '-' + f.kit.splitWord.slice(3), f.kit.split.replace(/-/g, ''), f.kit.splitWord] },
    { n: 7, points: 2, prompt: `În „${f.object.obj}”, cuvântul care precizează obiectul (atribut) ține de…`, choices: ['determinarea substantivului', 'un predicat verbal', 'un subiect subînțeles', 'o prepoziție izolată'] },
    { n: 8, points: 3, prompt: `„obligatoriu” / regula din textul 2 e, morfologic, mai aproape de…`, choices: ['adjectiv (nume predicativ sau atribut)', 'verb la infinitiv', 'prepoziție', 'interjecție'] }
  ];
}

function localShuffle(list, salt) {
  const copy = list.slice();
  let a = salt;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    a = (a * 1664525 + 1013904223) >>> 0;
    const j = a % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generate(helpers, rand, seed) {
  const { paperShell, publicItem, block, note } = helpers;
  const f = pickFacts(rand);
  const lit = literary(f);
  const non = nonliterary(f);
  const salt = parseInt(String(seed).slice(0, 6), 16) || 1;
  const placeChoices = [f.place.loc, ...localShuffle(DISTRACTOR_PLACES, salt).slice(0, 3)];
  const objChoices = [f.object.obj, ...localShuffle(DISTRACTOR_OBJECTS, salt + 7).slice(0, 3)];
  const hourChoices = [f.closeH, '8:00', '20:00', 'miezul nopții'];
  const themeChoices = [f.kit.themeChoice, 'o rețetă de plăcintă', 'un concurs de pescuit', 'o călătorie cu vaporul'];

  const aItems = [
    { n: 1, points: 5, prompt: 'Locul principal al întâmplărilor din textul 1 este…', extra: { choices: placeChoices } },
    { n: 2, points: 5, prompt: `Ce ține / ce folosește ${f.name} în textul 1?`, extra: { choices: objChoices } },
    { n: 3, points: 5, prompt: 'Textul 2 are ca scop principal să…', extra: { choices: ['informeze și să dea reguli de folosire a unui loc', 'narare o glumă lungă', 'descrie un peisaj de munte fără oameni', 'argumenteze că școala trebuie închisă'] } },
    { n: 4, points: 5, prompt: 'Programul din textul 2 se închide, în zilele obișnuite, la…', extra: { choices: hourChoices } },
    { n: 5, points: 5, prompt: 'Un element comun celor două texte este ideea de…', extra: { choices: themeChoices } },
    { n: 6, points: 5, prompt: 'Transcrie, din textul 1, vorba / enunțul pus între ghilimele (citatul ținut minte).', extra: { kind: 'short', minWords: 2, lines: 'un enunț din text' } },
    { n: 7, points: 5, prompt: `Precizează, din textul 2, cifra pentru „${f.kit.numberLabel}” și ora de închidere.`, extra: { kind: 'short', minWords: 2, lines: 'cifră + oră' } },
    { n: 8, points: 5, prompt: `În 40–80 de cuvinte, motivează ideea că o grijă mică (un loc, o regulă, o întoarcere) poate schimba o zi. Folosește o secvență din cel puțin unul dintre texte.`, extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
    { n: 9, points: 10, prompt: `Asociază fragmentul literar (textul 1) cu o operă literară studiată sau citită, evidențiind o valoare comună (${f.kit.value}). 50–80 de cuvinte. ${NOVEL}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
  ];

  const bItems = grammarItems(f);
  const composition =
    `Scrie o compunere de minimum 150 de cuvinte în care să o/îl caracterizezi pe ${f.name}, personajul din textul 1. Ai în vedere: două date de identificare; două trăsături, fiecare cu o secvență din text; o valoare (${f.kit.value}). Fără titlu sau motto. Punctajul de redactare se acordă dacă ai minimum 150 de cuvinte și dezvolți subiectul.`;

  const quoteKey = f.quote.split(/\s+/).slice(0, 3).join(' ').toLowerCase();
  const bundle = {
    public: paperShell(`en:g:romana:${seed}`, `Model generat — limba română · ${String(seed).slice(0, 4)}`, 'romana', note, [
      block(
        'Subiectul I A',
        50,
        'Citește fiecare dintre cele două texte-suport (literar + nonliterar). Itemii 1–5 sunt grile. Itemii 6–8 se scriu scurt. Itemul 9 asociază fragmentul literar cu o operă citită de tine.',
        [
          publicItem(0, 0, lit, { passage: true, kind: 'passage' }),
          publicItem(0, 0, non, { passage: true, kind: 'passage' }),
          ...aItems.map(item => publicItem(item.n, item.points, item.prompt, item.extra || {}))
        ]
      ),
      block(
        'Subiectul I B',
        20,
        'Gramatică, vocabular, fonetică și sintaxă — doar grile, pe fragmente din textele de mai sus. Încercuiești litera.',
        bItems.map(item => publicItem(item.n, item.points, item.prompt, { choices: item.choices }))
      ),
      block(
        'Subiectul II',
        20,
        'Compunere, ca la examen: o scrii în caiet, de mână, minimum 150 de cuvinte. Aici NU o tastezi. După predare poți fotografia pagina (maximum 3 poze pe zi) ca mentorul să-ți dea feedback pe barem.',
        [
          publicItem(1, 20, composition, {
            kind: 'write',
            photoOnly: true,
            minWords: 150,
            lines: 'scrie în caiet, min. 150 de cuvinte'
          })
        ]
      )
    ], true),
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: `Locul e ${f.place.loc}.`, steps: ['Cauți locul, nu tema'] },
      'Subiectul I A:2': { letter: 'A', explain: `${f.name} ține ${f.object.obj}.`, steps: ['Detaliu din textul 1'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Anunț / regulament, program, reguli = a informa / a reglementa.', steps: ['Genul textului 2'] },
      'Subiectul I A:4': { letter: 'A', explain: `Se închide la ${f.closeH}.`, steps: ['Programul din anunț'] },
      'Subiectul I A:5': { letter: 'A', explain: f.kit.theme, steps: ['Temă comună'] },
      'Subiectul I A:6': { answers: [f.quote, `„${f.quote}”`], tokens: quoteKey.split(/\s+/).filter(w => w.length > 2), explain: 'Citatul dintre ghilimele din textul 1.', steps: ['Transcrii exact'] },
      'Subiectul I A:7': { answers: [`${f.number}, ${f.closeH}`, `${f.number} / ${f.closeH}`, String(f.number)], tokens: [String(f.number), f.closeH.split(':')[0]], explain: `${f.kit.numberLabel}: ${f.number}; închidere ${f.closeH}.`, steps: ['Cifra + ora'] },
      'Subiectul I A:8': { answers: [f.kit.value, f.place.loc], tokens: ['grij', 'regul', 'loc', 'intoar', 'întoar', f.object.token], explain: 'Cerința vrea motivare cu secvență, 40–80 de cuvinte.', steps: ['Idee + citat scurt'] },
      'Subiectul I A:9': { answers: [f.kit.novel, 'Amintiri din copilărie'], tokens: ASSOCIATE_TOKENS, explain: 'Asociere: o operă citită + o valoare comună + un fapt din fragment și unul din carte. Fără rezumat tocit.', steps: ['Titlul operei', 'Valoarea', 'Două fapte'] },
      'Subiectul I B:1': { letter: 'A', explain: `Predicatul este „${f.kit.verb}”.`, steps: ['Ce se întâmplă?'] },
      'Subiectul I B:2': { letter: 'A', explain: `„${f.kit.adj}” determină substantivul — adjectiv / atribut.`, steps: ['Ce parte de vorbire pictează?'] },
      'Subiectul I B:3': { letter: 'A', explain: 'În context: revine.', steps: ['Sinonime de context'] },
      'Subiectul I B:4': { letter: 'A', explain: `Predicatul regulii: ${f.kit.predRule}.`, steps: ['Regula din texte'] },
      'Subiectul I B:5': { letter: 'A', explain: 'Construcție cu „ca” — comparație.', steps: ['ca +'] },
      'Subiectul I B:6': { letter: 'A', explain: `${f.kit.splitWord} → ${f.kit.split}.`, steps: ['Despartire'] },
      'Subiectul I B:7': { letter: 'A', explain: 'Atributul precizează obiectul.', steps: ['Ce lămurește substantivul?'] },
      'Subiectul I B:8': { letter: 'A', explain: 'Adjectiv (NP sau atribut), nu verb.', steps: ['Morfologie'] },
      'Subiectul II:1': {
        letter: '',
        explain: 'Compunere de caracterizare, minimum 150 de cuvinte, pe caiet. Nu există text-model de copiat.',
        ideas: [
          'încadrare: cine e personajul, unde, ce rol are',
          'conținut: două trăsături, fiecare cu secvență din text',
          'organizare: început – cuprins – încheiere, fără titlu sau motto'
        ],
        steps: ['Plan', '150+', 'Recitire']
      }
    }
  };
  bundle.public.generated = true;
  return bundle;
}

module.exports = { generate, wordCount: text => String(text || '').trim().split(/\s+/).filter(Boolean).length };
