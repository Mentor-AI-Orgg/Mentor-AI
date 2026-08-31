const { int, pick } = require('./itemRng');

const NAMES = ['Ana', 'Mihai', 'Ioana', 'Andrei', 'Elena', 'Radu', 'Maria', 'Vlad'];
const PLACES = ['curtea școlii', 'parcul din sat', 'biblioteca', 'sala de clasă', 'drumul spre casă'];
const THINGS = ['atlasul', 'caietul', 'dicționarul', 'romanul', 'afișul'];

function flash(point, question, options, explain) {
  return { point, question, options, correct: 0, explain };
}

function test(point, prompt, answers, steps, extra = {}) {
  const list = Array.isArray(answers) ? answers : [String(answers)];
  return {
    point,
    prompt,
    answers: list,
    explain: extra.explain || steps[steps.length - 1] || '',
    hint: extra.hint || '',
    numeric: null,
    tokens: extra.tokens || list.slice(0, 1).map(item => String(item).toLowerCase()),
    long: extra.long || false,
    minWords: extra.minWords || 0,
    steps,
    level: extra.level || 2
  };
}

function synonymFlash(rand) {
  const pairs = [
    ['curajos', 'viteaz', 'leneș', 'ud', 'strâmt'],
    ['frumos', 'drăguț', 'urât', 'greu', 'rece'],
    ['a începe', 'a porni', 'a termina', 'a uita', 'a dormi'],
    ['repede', 'iute', 'încet', 'verde', 'gol'],
    ['trist', 'mâhnit', 'vesel', 'ascuțit', 'rotund'],
    ['a spune', 'a zice', 'a alerga', 'a măsura', 'a desena'],
    ['liniștit', 'calm', 'gălăgios', 'ascuțit', 'ud']
  ];
  const [w, syn, ...wrong] = pick(rand, pairs);
  return flash('sinonime', `Sinonim potrivit pentru „${w}”:`, [syn, ...wrong], `„${w}” și „${syn}” spun aproape același lucru, în contexte potrivite.`);
}

function antonymFlash(rand) {
  const pairs = [
    ['cald', 'rece', 'fierbinte', 'moale', 'lung'],
    ['mare', 'mic', 'uriaș', 'rotund', 'nou'],
    ['a urca', 'a coborî', 'a alerga', 'a citi', 'a mânca'],
    ['luminos', 'întunecat', 'galben', 'înalt', 'scurt'],
    ['a deschide', 'a închide', 'a citi', 'a alerga', 'a râde'],
    ['plin', 'gol', 'rotund', 'cald', 'nou']
  ];
  const [w, ant, ...wrong] = pick(rand, pairs);
  return flash('antonime', `Antonimul lui „${w}” e…`, [ant, ...wrong], `Antonimele se opun: ${w} ↔ ${ant}.`);
}

function subiectFlash(rand) {
  const name = pick(rand, NAMES);
  const verb = pick(rand, ['citește', 'aleargă', 'desenează', 'ascultă']);
  const rest = pick(rand, ['o carte', 'în curte', 'o hartă', 'explicația']);
  return flash('subiect', `În „${name} ${verb} ${rest}.” subiectul e…`, [name, verb, rest.split(' ')[0], 'și'], 'Subiectul răspunde la cine? / ce?');
}

function predicatFlash(rand) {
  const name = pick(rand, NAMES);
  const verbs = [
    ['citește', 'o carte'],
    ['aleargă', 'în curte'],
    ['desenează', 'o hartă'],
    ['ascultă', 'explicația']
  ];
  const [verb, rest] = pick(rand, verbs);
  return flash('predicat', `În „${name} ${verb} ${rest}.” predicatul e…`, [verb, name, rest.split(' ')[0], 'și'], 'Predicatul spune ce se face: verbul.');
}

function ideaFlash(rand) {
  const name = pick(rand, NAMES);
  const place = pick(rand, PLACES);
  const thing = pick(rand, THINGS);
  return flash('idee', `${name} uită ${thing} în ${place} și se întoarce după el. Ideea principală e…`, [
    `${name} se întoarce după ${thing}`,
    'Vremea e frumoasă',
    'Școala se închide',
    'Nimeni nu citește'
  ], 'Cauți ce se întâmplă cu adevărat, nu detaliul de fundal.');
}

const GENERIC_FLASH = {
  oral: (rand) => pick(rand, [synonymFlash, predicatFlash, subiectFlash])(rand),
  lectura: ideaFlash,
  redactare: (rand) => flash('plan', 'Un text scurt are nevoie de…', ['început, cuprins, sfârșit', 'doar adjective', 'doar titlu', 'doar data'], 'Firul, nu broderia.'),
  limba5: (rand) => pick(rand, [predicatFlash, subiectFlash, synonymFlash, antonymFlash])(rand),
  inter5: (rand) => flash('identitate', 'O legendă locală te ajută să…', ['povestești de unde vii, cu un exemplu', 'înveți o formulă', 'calculezi arii', 'sari peste lectură'], 'Modelele se povestesc, nu se predică.'),
  oral6: (rand) => flash('rezumat', 'Un rezumat oral păstrează…', ['ordinea întâmplărilor importante', 'toate adjectivele', 'doar titlul', 'doar data'], 'Firul, nu broderia.'),
  lectura6: ideaFlash,
  redactare6: (rand) => flash('destinatar', 'Când scrii un e-mail, te gândești întâi la…', ['cine citește și ce trebuie să afle', 'câte metafore pui', 'cât e de lung titlul', 'ce font folosești'], 'Destinatarul dictează tonul.'),
  limba6: (rand) => pick(rand, [predicatFlash, subiectFlash, antonymFlash])(rand),
  inter6: (rand) => flash('lume', 'Româna „în lume” înseamnă că…', ['e vorbită și dincolo de granița clasei', 'e doar în manual', 'e o formulă', 'e un unghi'], 'Limba trăiește unde sunt vorbitori.'),
  oral7: (rand) => flash('prezentare', 'În fața clasei, un exemplu bun…', ['sprijină ideea, nu o înlocuiește cu povești goale', 'ține loc de plan', 'trebuie să fie o glumă', 'e obligatoriu lung'], 'Exemplul servește ideea.'),
  lectura7: (rand) => flash('epic', 'Un text e epic dacă…', ['se întâmplă ceva, cu personaje', 'e doar o stare, fără acțiune', 'e o teoremă', 'e un tabel'], 'Epic = acțiune + personaje.'),
  redactare7: (rand) => flash('portret', 'Portretul unui personaj se construiește din…', ['fapte și vorbe, nu din adjective înșirate', 'doar haine', 'doar data nașterii', 'doar titlul cărții'], 'Arăți, nu etichetezi.'),
  limba7: (rand) => pick(rand, [synonymFlash, antonymFlash])(rand),
  inter7: (rand) => flash('mit', 'Compari un mit al nostru cu al altora ca să…', ['vezi ce întrebări avem în comun', 'spui că ai noștri sunt mai buni', 'înveți o dată', 'sari gramatica'], 'Comparația e curiozitate, nu rang.'),
  oral8: (rand) => flash('argument', 'O părere ține dacă are…', ['un motiv (și, la nevoie, o dovadă)', 'doar volum', 'doar emojis', 'doar titlul lecției'], 'Argument = afirmație + de ce.'),
  lectura8: (rand) => flash('dovada', 'La un text necunoscut, întâi…', ['citești firul, apoi întrebi', 'sari la grilă', 'inventezi un comentariu', 'cauți autorul pe internet'], 'Textul din față, nu comentariul de acasă.'),
  redactare8: (rand) => flash('plan', 'La EN, un text scurt cere…', ['plan vizibil, paragraf cu o idee', 'cât mai multe citate învățate', 'să fie lung obligatoriu', 'să eviți exemplele'], 'Structură, nu inspirație de moment.'),
  limba8: (rand) => pick(rand, [predicatFlash, subiectFlash, synonymFlash, antonymFlash])(rand),
  inter8: (rand) => flash('lume-lit', 'Un model din literatura lumii merită dacă…', ['pune aceleași întrebări, și aiurea', 'e doar exotic', 'înlocuiește limba română', 'e mai scurt'], 'Te uiți afară ca să te vezi.')
};

function oralTest(rand) {
  const name = pick(rand, NAMES);
  const thing = pick(rand, THINGS);
  const hour = int(rand, 8, 16);
  return test(
    'mesaj',
    `Anunț: „${name}, mâine ora ${hour}, adu ${thing}.” În maximum 10 cuvinte, scrie ce și când. Trebuie să apară obiectul și ora.`,
    [thing.replace(/ul$/, ''), String(hour)],
    ['Ce trebuie adus', 'Când: ora', 'Nu recopiezi tot anunțul'],
    { long: true, tokens: [String(hour)], minWords: 3, level: 1 }
  );
}

function lecturaTest(rand) {
  const name = pick(rand, NAMES);
  const place = pick(rand, PLACES);
  const thing = pick(rand, THINGS);
  return test(
    'idee',
    `Text: ${name} lasă ${thing} în ${place}, apoi se întoarce îngrijorat. În 8–15 cuvinte, spune ideea principală (cine + ce face).`,
    [name.toLowerCase()],
    ['Cine: ' + name, 'Ce: se întoarce după ' + thing, 'Locul e detaliu, nu ideea'],
    { long: true, tokens: [name.toLowerCase()], minWords: 6, level: 2 }
  );
}

function redactareTest(rand) {
  const place = pick(rand, PLACES);
  return test(
    'plan',
    `Vrei să descrii ${place}. Scrie cele 3 părți ale planului, cu cuvintele: început, cuprins (sau mijloc), sfârșit.`,
    ['inceput', 'sfarsit'],
    ['Început: unde / impresie', 'Cuprins: 2-3 detalii', 'Sfârșit: ce rămâne'],
    { long: true, tokens: ['inceput', 'sfarsit'], minWords: 5, level: 2 }
  );
}

function limbaTest(rand) {
  const name = pick(rand, NAMES);
  const verb = pick(rand, ['citește', 'aleargă', 'desenează', 'ascultă']);
  if (rand() > 0.5) {
    return test(
      'subiect',
      `Propoziția: „${name} ${verb} liniștit.” Care e subiectul? Un cuvânt.`,
      [name],
      [`Cine? ${name} (subiect)`, `Ce face? ${verb} (predicat)`],
      { tokens: [name.toLowerCase()], level: 1 }
    );
  }
  return test(
    'predicat',
    `Propoziția: „${name} ${verb} liniștit.” Care e predicatul? Un cuvânt.`,
    [verb],
    [`Cine? ${name} (subiect)`, `Ce face? ${verb} (predicat)`],
    { tokens: [verb], level: 1 }
  );
}

function argumentTest(rand) {
  const tema = pick(rand, ['lectura zilnică', 'pauza de sport', 'vizita la bibliotecă']);
  return test(
    'argument',
    `Tema: ${tema}. Scrie o părere într-o frază care conține „pentru că”.`,
    ['pentru ca', 'pentru că'],
    ['Afirmația', 'Lipești un „pentru că”', 'Un motiv, nu un slogan'],
    { long: true, tokens: ['pentru'], minWords: 6, level: 3 }
  );
}

const GENERIC_TEST = {
  oral: oralTest,
  lectura: lecturaTest,
  redactare: redactareTest,
  limba5: limbaTest,
  inter5: (rand) => test('identitate', 'În 6–12 cuvinte, spune de ce o poveste a locului tău merită spusă. Folosește „acasă” sau „ai noștri”.', ['acasa', 'nostri', 'noștri'], ['Nu e predică', 'Un exemplu, nu o listă'], { long: true, minWords: 6, level: 3 }),
  oral6: oralTest,
  lectura6: lecturaTest,
  redactare6: redactareTest,
  limba6: limbaTest,
  inter6: (rand) => test('lume', 'Româna e vorbită și în alte țări. O frază cu „și acolo” sau „vorbitori”.', ['acolo', 'vorbitori'], ['Nu e doar manualul', 'Oameni, nu hartă goală'], { long: true, minWords: 6, level: 2 }),
  oral7: (rand) => test('prezentare', 'Scrie un exemplu scurt (o frază) care ar sprijini ideea: „Merită să citești cu voce tare.” Folosește „pentru că”.', ['pentru'], ['Ideea e dată', 'Exemplul o sprijină'], { long: true, tokens: ['pentru'], minWords: 6, level: 2 }),
  lectura7: (rand) => test('epic', 'Text cu personaje și întâmplări. E epic, liric sau dramatic? Un cuvânt, apoi de ce (min. 5 cuvinte).', ['epic'], ['Se întâmplă ceva', 'Sunt personaje'], { long: true, tokens: ['epic'], minWords: 6, level: 2 }),
  redactare7: redactareTest,
  limba7: limbaTest,
  inter7: (rand) => test('mit', 'Un mit explică o lume. O frază cu „de ce” sau „lume”.', ['de ce', 'lume'], ['Nu e minciună de copii', 'E un model de lume'], { long: true, minWords: 5, level: 3 }),
  oral8: argumentTest,
  lectura8: (rand) => test('dovada', 'Ai un text nou în față. Primul pas: un cuvânt (citești / sari / inventezi), apoi o frază.', ['citesti', 'citești'], ['Întâi textul', 'Apoi întrebările'], { long: true, tokens: ['cit'], minWords: 4, level: 2 }),
  redactare8: argumentTest,
  limba8: limbaTest,
  inter8: (rand) => test('lume-lit', 'De ce merită un text „de aiurea”? O frază cu „aceleași” sau „și noi”.', ['aceleasi', 'aceleași', 'noi'], ['Aceleași întrebări', 'Nu e album exotic'], { long: true, minWords: 6, level: 3 })
};

function generateRomana(chapterId, kind, rand) {
  if (kind === 'test') {
    const fn = GENERIC_TEST[chapterId] || lecturaTest;
    return fn(rand);
  }
  const fn = GENERIC_FLASH[chapterId] || ideaFlash;
  return fn(rand);
}

module.exports = { generateRomana };
