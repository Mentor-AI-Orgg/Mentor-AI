// Texte EN de română generate pe seed: literar + nonliterar originale,
// itemi legați de faptele din texte. Nu copiem subiecte publicate.
// Combinările (kit × loc × nume × obiect × citat × orar × paragrafe) nu se epuizează.

const { pick, shuffle, int } = require('./itemRng');
const { assembleOfficial, ASSOCIATE_TOKENS, NOVEL_HINT, typoMessage } = require('./enRomanaOfficial');

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

${f.kit.predRule.charAt(0).toUpperCase()}${f.kit.predRule.slice(1)} „că mă cunoaște profesorul”. Reclamațiile se depun în scris, la secretariat, nu verbal la ușă. Părinții pot citi regulamentul pe site; nu au acces în timpul orelor.

Fotografiile se fac doar dacă un profesor cere un rezultat pentru portofoliu, pe fundal neutru, fără chipuri dacă un elev nu e de acord. În săptămâna simulărilor, programul rămâne ${f.openH}–${f.closeH}, fără prelungire, exceptând clasa a VIII-a pe baza carnetului.

Înscrieri: până în data de 5 a lunii, la avizier. Locurile se ocupă în ordine. Cine se înscrie și nu vine de două ori la rând, fără anunț, pierde locul în luna următoare.

Coordonator: dirigintele clasei ${f.classDuty}, cu sprijinul Consiliului elevilor.`;
}

function grammarOfficial(f, rand) {
  const hiatWord = pick(rand, ['idee', 'alee', 'poet', 'aerul']);
  const hiatMap = {
    idee: { correct: 'hiat (i-de-e)', distractors: ['diftong', 'triftong', 'o consoană dublă'] },
    alee: { correct: 'hiat (a-le-e)', distractors: ['diftong', 'triftong', 'o consoană dublă'] },
    poet: { correct: 'hiat (po-et)', distractors: ['diftong', 'triftong', 'o consoană dublă'] },
    aerul: { correct: 'hiat (a-e-rul)', distractors: ['diftong', 'triftong', 'o consoană dublă'] }
  };
  const derived = pick(rand, ['învățătură', 'cititor', 'închidere', 'răbdare']);
  const paronym = pick(rand, [
    { prompt: 'Perechea de paronime potrivită contextului este…', choices: ['familial / familiar', 'temporal / temporar', 'original / originar', 'liber / librar'], correct: 'familial / familiar' },
    { prompt: 'Perechea de paronime potrivită contextului este…', choices: ['temporal / temporar', 'familial / familiar', 'oral / orar', 'clasă / clasic'], correct: 'temporal / temporar' },
    { prompt: 'Perechea de paronime potrivită contextului este…', choices: ['orar / oral', 'familial / familiar', 'liber / librar', 'eminent / iminent'], correct: 'orar / oral' }
  ]);
  return {
    bMcq: [
      { prompt: `În cuvântul „${hiatWord}” există…`, choices: [hiatMap[hiatWord].correct, ...hiatMap[hiatWord].distractors], letter: 'A', explain: `${hiatWord}: hiat (vocale în hiat, nu diftong).`, steps: ['Vocale în silabe alăturate'] },
      { prompt: `Cuvântul „${derived}” este format prin…`, choices: ['derivare cu sufix', 'compunere', 'conversiune', 'schimbarea accentului'], letter: 'A', explain: `${derived} = radical + sufix.`, steps: ['Derivare'] },
      { prompt: 'Un sinonim potrivit, în context, pentru „se întoarce” (la loc) este…', choices: ['revine', 'pleacă de tot', 'uită', 'strigă'], letter: 'A', explain: 'În context: revine.', steps: ['Sens în text'] },
      { prompt: paronym.prompt, choices: paronym.choices, letter: 'A', explain: `Paronime: ${paronym.correct}.`, steps: ['Sensuri învecinate, forme diferite'] }
    ],
    morphWord: f.kit.adj
  };
}

function poetic(f) {
  const n = f.name;
  const loc = f.place.loc;
  const obj = f.object.obj;
  const weather = f.weather.replace(/\.$/, '');
  const stanzas = [
    `${loc.charAt(0).toUpperCase()}${loc.slice(1)} stă treaz,\n${weather.toLowerCase()}, fără grabă.\n${n} vine ${f.when},\ncând ${f.sense}.`,
    `Ține ${obj}\nca pe o treabă, nu ca pe-un spectacol.\n${f.place.prep.charAt(0).toUpperCase()}${f.place.prep.slice(1)} nimeni nu pune\no placă cu nume, un titlu, un ocol.`,
    `„${f.quote}”, aude,\nvorbă scurtă, litere drepte.\n${n} n-a uitat. ${f.kit.verb[0].toUpperCase()}${f.kit.verb.slice(1)} încet,\nverifică, tace, nu așteaptă recompense.`,
    `${f.helper} se oprește o clipă.\nN-a luat nimic. A îndreptat un detaliu\n— o piatră, un colț, o sfoară —\napoi a plecat, fără discurs, fără milă.`,
    `În clasă, un coleg șoptește:\n„Tu ești cu locul ăla.” ${n} dă din umeri.\nNu voia un titlu. Voia ca locul\nsă rămână viu până ${f.weekday}, dacă mai rămâne.`,
    `${f.kit.adjNoun.charAt(0).toUpperCase()}${f.kit.adjNoun.slice(1)} e o dovadă mică.\n${n} ${f.kit.verb} ${f.kit.compare}.\n${f.kit.rule} Asta nu e pedeapsă.\nE grijă: te ține întreg, și ține locul.`,
    `${obj.charAt(0).toUpperCase()}${obj.slice(1)} stă la vedere,\nnu în buzunarul de uitare.\n${n} ține minte și cuvântul „${f.kit.splitWord}”,\nca pe o unealtă, nu ca pe o podoabă rară.`,
    `La capăt, ${n} se uită o dată înapoi.\n${loc.charAt(0).toUpperCase()}${loc.slice(1)} nu spune nimic.\nRămâne ${f.kit.theme}.\nA doua oară, aceeași treabă, altă lumină, tot merită un pic.`
  ];
  return `Textul 1 (literar — versuri)\n\n${n} la ${loc}\n\n${stanzas.join('\n\n')}`;
}

function generate(helpers, rand, seed) {
  const f = pickFacts(rand);
  const poetry = rand() < 0.5;
  const lit = poetry ? poetic(f) : literary(f);
  const non = nonliterary(f);
  const placeChoices = [f.place.loc, ...shuffle(rand, DISTRACTOR_PLACES.slice()).slice(0, 3)];
  const objChoices = [f.object.obj, ...shuffle(rand, DISTRACTOR_OBJECTS.slice()).slice(0, 3)];
  const quoteKey = f.quote.split(/\s+/).slice(0, 3).join(' ').toLowerCase();
  const grammar = grammarOfficial(f, rand);
  const rewrite = typoMessage(non);

  const spec = {
    id: `en:g:romana:${seed}`,
    title: `Model generat — limba română · ${String(seed).slice(0, 4)}`,
    generated: true,
    literaryKind: poetry ? 'poetry' : 'prose',
    lit,
    non,
    transcribe: {
      prompt: 'Notează, din textul 1, vorba / enunțul pus între ghilimele (citatul ținut minte).',
      minWords: 2,
      lines: 'un enunț din text',
      answers: [f.quote, `„${f.quote}”`],
      tokens: quoteKey.split(/\s+/).filter(w => w.length > 2),
      explain: 'Citatul dintre ghilimele din textul 1.',
      steps: ['Transcrii exact']
    },
    mcq: [
      { prompt: 'Locul principal al întâmplărilor din textul 1 este…', choices: placeChoices, letter: 'A', explain: `Locul e ${f.place.loc}.`, steps: ['Cauți locul, nu tema'] },
      { prompt: `Ce ține / ce folosește ${f.name} în textul 1?`, choices: objChoices, letter: 'A', explain: `${f.name} ține ${f.object.obj}.`, steps: ['Detaliu din textul 1'] },
      { prompt: 'Textul 2 are ca scop principal să…', choices: ['informeze și să dea reguli de folosire a unui loc', 'narare o glumă lungă', 'descrie un peisaj de munte fără oameni', 'argumenteze că școala trebuie închisă'], letter: 'A', explain: 'Anunț / regulament, program, reguli = a informa / a reglementa.', steps: ['Genul textului 2'] }
    ],
    statements: [
      { text: `În textul 1, locul principal este ${f.place.loc}.`, answer: true },
      { text: `În textul 1, ${f.name} ține un telefon uitat de director.`, answer: false },
      { text: `În textul 1, ${f.name} aude vorba: „${f.quote}”.`, answer: true },
      { text: `Textul 2 dă un program și reguli (inclusiv ora de închidere ${f.closeH}).`, answer: true },
      { text: 'Textul 2 e o povestire cu dialog lung, fără reguli.', answer: false },
      { text: `Cele două texte se leagă prin ideea de ${f.kit.themeChoice}.`, answer: true }
    ],
    item6: poetry
      ? {
        prompt: 'Precizează măsura versurilor din textul 1 (numărul de silabe) și tipul rimei (împerecheată / încrucișată / îmbrățișată). Motivează pe scurt, cu un exemplu de versuri alăturate.',
        minWords: 12,
        maxWords: 40,
        lines: '12–40 de cuvinte',
        answers: ['încrucișată', 'ABAB', 'rimă încrucișată'],
        tokens: ['silab', 'incrucis', 'încruciș', 'abab', 'imperech', 'împerech', 'masura', 'măsur', 'vers'],
        explain: 'Măsura = numărul de silabe al versului; rima încrucișată e ABAB. Ilustrezi cu două versuri alăturate.',
        steps: ['Numărul de silabe', 'Numele rimei', 'Exemplu']
      }
      : {
        prompt: 'Menționează o trăsătură a tiparului textual din textul 1 (narativ / descriptiv / dialogat) și ilustreaz-o cu o secvență. Minimum două enunțuri.',
        minWords: 12,
        maxWords: 40,
        lines: '12–40 de cuvinte',
        answers: ['narativ', 'narațiune', 'dialog'],
        tokens: ['narativ', 'narati', 'narați', 'descript', 'dialog', 'secvent', 'secvenț', 'personaj', 'actiun', 'acțiun'],
        explain: 'Trăsătură a tiparului + o secvență din textul 1.',
        steps: ['Tiparul', 'Secvența']
      },
    item7: {
      prompt: 'Precizează un element comun celor două texte, valorificând câte o secvență din fiecare text. Minimum 30 de cuvinte.',
      minWords: 30,
      lines: 'minimum 30 de cuvinte',
      answers: [f.kit.themeChoice, f.kit.value],
      tokens: ['grij', 'regul', 'loc', 'intoar', 'întoar', f.object.token, 'textul', 'secvent', 'secvenț'],
      explain: 'Element comun + o secvență din textul 1 + o secvență din textul 2. Minimum 30 de cuvinte.',
      steps: ['Elementul', 'Secvență 1', 'Secvență 2', '30+']
    },
    item8: {
      prompt: `Justifică răspunsul la întrebarea: de ce o grijă mică (un loc, o regulă, o întoarcere) poate schimba o zi? Valorifică textul 1 sau textul 2. 50–100 de cuvinte.`,
      minWords: 50,
      maxWords: 100,
      lines: '50–100 de cuvinte',
      answers: [f.kit.value, f.place.loc],
      tokens: ['grij', 'regul', 'loc', 'intoar', 'întoar', f.object.token],
      explain: 'Justificare cu secvență, 50–100 de cuvinte.',
      steps: ['Întrebarea', 'Secvență', '50–100']
    },
    item9: {
      prompt: `Asociază fragmentul literar (textul 1) cu o operă literară studiată sau citită, evidențiind o valoare / o temă comună (${f.kit.value}). 50–100 de cuvinte. ${NOVEL_HINT}`,
      minWords: 50,
      maxWords: 100,
      lines: '50–100 de cuvinte',
      answers: [f.kit.novel, 'Amintiri din copilărie'],
      tokens: ASSOCIATE_TOKENS,
      explain: 'Asociere: o operă citită + o valoare/temă comună + un fapt din fragment și unul din carte.',
      steps: ['Titlul operei', 'Valoarea', 'Două fapte']
    },
    bMcq: grammar.bMcq,
    bWrite: [
      {
        prompt: `Precizează valoarea morfologică a cuvântului „${grammar.morphWord}” din „${f.kit.adjNoun}”. Motivează pe scurt.`,
        minWords: 8,
        lines: 'valoare morfologică',
        answers: ['adjectiv', 'atribut', grammar.morphWord],
        tokens: ['adjectiv', 'atribut', String(grammar.morphWord).slice(0, 5).toLowerCase()],
        explain: `„${grammar.morphWord}” determină substantivul — adjectiv / atribut.`,
        steps: ['Parte de vorbire', 'Funcție']
      },
      {
        prompt: `Alcătuiește două propoziții în care cuvântul „${grammar.morphWord}” să aibă valori morfologice sau sensuri diferite.`,
        minWords: 12,
        lines: 'două propoziții',
        answers: [grammar.morphWord],
        tokens: [String(grammar.morphWord).slice(0, 5).toLowerCase(), 'propozitie', 'propoziț'],
        explain: 'Două propoziții corecte, cu valori sau sensuri diferite.',
        steps: ['Două enunțuri']
      },
      {
        prompt: `Alcătuiește o frază în care să existe o propoziție subordonată (atributivă, completivă sau circumstanțială), pornind de la ideea că ${f.name} ${f.kit.verb} ${f.place.prep}. Marchează subordonata.`,
        minWords: 12,
        lines: 'o frază cu subordonată',
        answers: ['care', 'că', 'să', 'când'],
        tokens: ['care', 'că', 'să', 'când', 'unde', 'subordon'],
        explain: 'O frază cu subordonată marcată.',
        steps: ['Regent + subordonată']
      },
      {
        prompt: `Rescrie corectând greșelile de scriere, de diacritice și de acord din mesajul: „${rewrite}”.`,
        minWords: 10,
        lines: 'mesaj corectat',
        answers: [rewrite],
        tokens: ['și', 'în', 'sunt', 'stau', 'respectă'],
        explain: 'Rescrii tot mesajul, corectând ortografia și acordul.',
        steps: ['Citești greșelile', 'Rescrii']
      }
    ],
    composition: poetry
      ? `Redactează un eseu de minimum 150 de cuvinte în care să prezinți mesajul textului 1 (versurile despre ${f.name} și ${f.place.loc}). Valorifică peisajul, două figuri de stil și emoția transmisă. O valoare: ${f.kit.value}. Fără titlu sau motto. Pe caiet.`
      : `Scrie o compunere de minimum 150 de cuvinte în care să o/îl caracterizezi pe ${f.name}, personajul din textul 1. Ai în vedere: două date de identificare; două trăsături, fiecare cu o secvență din text; o valoare (${f.kit.value}). Fără titlu sau motto. Pe caiet.`,
    compositionBarem: {
      letter: '',
      explain: poetry
        ? 'Eseu pe mesajul poeziei, minimum 150 de cuvinte, pe caiet. Nu există text-model de copiat.'
        : 'Compunere de caracterizare, minimum 150 de cuvinte, pe caiet. Nu există text-model de copiat.',
      ideas: poetry
        ? [
          'încadrare: mesajul / semnificația textului 1, min. 150 de cuvinte, fără titlu/motto',
          'conținut: peisaj, două figuri de stil, emoția',
          'organizare: început – cuprins – încheiere'
        ]
        : [
          'încadrare: cine e personajul, unde, ce rol are',
          'conținut: două trăsături, fiecare cu secvență din text',
          'organizare: început – cuprins – încheiere, fără titlu sau motto'
        ],
      steps: ['Plan', '150+', 'Recitire']
    }
  };

  return assembleOfficial(helpers, spec);
}

module.exports = { generate, wordCount: text => String(text || '').trim().split(/\s+/).filter(Boolean).length };
