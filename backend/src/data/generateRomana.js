const { int, pick } = require('./itemRng');

const NAMES = ['Ana', 'Mihai', 'Ioana', 'Andrei', 'Elena', 'Radu', 'Maria', 'Vlad'];
const PLACES = ['curtea școlii', 'parcul din sat', 'biblioteca', 'sala de clasă', 'drumul spre casă'];
const THINGS = ['atlasul', 'caietul', 'dicționarul', 'romanul', 'afișul'];

function flash(point, question, options, explain, level) {
  return { point, question, options, correct: 0, explain, level };
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
    level: extra.level || 1
  };
}

function rung(level, fns) {
  const n = fns.length;
  const i = ((Math.max(1, Number(level) || 1) - 1) % n + n) % n;
  return fns[i];
}

function synonymFlash(rand, level) {
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
  return flash('sinonime', `Sinonim potrivit pentru „${w}”:`, [syn, ...wrong], `„${w}” și „${syn}” spun aproape același lucru.`, level || 1);
}

function antonymFlash(rand, level) {
  const pairs = [
    ['cald', 'rece', 'fierbinte', 'moale', 'lung'],
    ['mare', 'mic', 'uriaș', 'rotund', 'nou'],
    ['a urca', 'a coborî', 'a alerga', 'a citi', 'a mânca'],
    ['luminos', 'întunecat', 'galben', 'înalt', 'scurt'],
    ['a deschide', 'a închide', 'a citi', 'a alerga', 'a râde'],
    ['plin', 'gol', 'rotund', 'cald', 'nou']
  ];
  const [w, ant, ...wrong] = pick(rand, pairs);
  return flash('antonime', `Antonimul lui „${w}” e…`, [ant, ...wrong], `Antonimele se opun: ${w} ↔ ${ant}.`, level || 2);
}

function subiectFlash(rand, level) {
  const name = pick(rand, NAMES);
  const verb = pick(rand, ['citește', 'aleargă', 'desenează', 'ascultă']);
  const rest = pick(rand, ['o carte', 'în curte', 'o hartă', 'explicația']);
  return flash('subiect', `În „${name} ${verb} ${rest}.” subiectul e…`, [name, verb, rest.split(' ')[0], 'și'], 'Subiectul răspunde la cine? / ce?', level || 3);
}

function predicatFlash(rand, level) {
  const name = pick(rand, NAMES);
  const verbs = [['citește', 'o carte'], ['aleargă', 'în curte'], ['desenează', 'o hartă'], ['ascultă', 'explicația']];
  const [verb, rest] = pick(rand, verbs);
  return flash('predicat', `În „${name} ${verb} ${rest}.” predicatul e…`, [verb, name, rest.split(' ')[0], 'și'], 'Predicatul spune ce se face: verbul.', level || 4);
}

function ideaFlash(rand, level) {
  const name = pick(rand, NAMES);
  const place = pick(rand, PLACES);
  const thing = pick(rand, THINGS);
  return flash('idee', `${name} uită ${thing} în ${place} și se întoarce după el. Ideea principală e…`, [
    `${name} se întoarce după ${thing}`,
    'Vremea e frumoasă',
    'Școala se închide',
    'Nimeni nu citește'
  ], 'Cauți ce se întâmplă cu adevărat, nu detaliul de fundal.', level || 3);
}

const FLASHES = {
  oral: [
    (r) => synonymFlash(r, 1),
    (r) => antonymFlash(r, 2),
    (r) => subiectFlash(r, 3),
    (r) => predicatFlash(r, 4),
    () => flash('mesaj', 'Un mesaj oral bun spune întâi…', ['ce și când, pe scurt', 'toate adjectivele', 'doar data nașterii', 'o teoremă'], 'Receptorul trebuie să știe ce să facă.', 5),
    () => flash('ton', 'Tonul vocii…', ['poate schimba mesajul, chiar cu aceleași cuvinte', 'nu contează', 'e un unghi', 'e un prim'], '„Poți veni?” spus aspru nu e o invitație.', 6),
    () => flash('intrebare', 'O întrebare bună…', ['cere ceva anume, nu tot deodată', 'e o listă de 20 de teme', 'e un strigăt', 'e o formulă'], 'Una, clară.', 7),
    () => flash('ascultare', 'Când asculți, întâi…', ['prinzi ideea, apoi detaliile', 'sari la răspuns', 'te uiți pe telefon', 'numeri cuvintele'], 'Firul, nu broderia.', 8)
  ],
  lectura: [
    (r) => ideaFlash(r, 1),
    () => flash('personaj', 'Personajul e…', ['cine face treaba în text', 'doar autorul', 'titlul', 'un unghi'], 'Cine vrea ceva, cine se mișcă.', 2),
    () => flash('timp-loc', 'Timpul și locul…', ['ancrează întâmplarea', 'sunt ideea principală mereu', 'nu se citesc', 'sunt o teoremă'], 'Unde și când, ca să vezi scena.', 3),
    () => flash('naratiune', 'Un text narativ…', ['spune ce se întâmplă, în ordine', 'e doar o listă de cumpărături', 'e un tabel', 'e o formulă'], 'Are început, mijloc, capăt.', 4),
    () => flash('descriere', 'O descriere…', ['arată cum e un loc sau un om, cu detalii', 'e o înmulțire', 'e un anunț de ora 8', 'e un prim'], 'Simțuri: ce vezi, auzi, simți.', 5),
    () => flash('comparatie', 'Comparația spune…', ['A e ca B, ca să înțelegi A', 'A e B, literal', 'e un unghi', 'e o medie'], '„Repede ca o săgeată” nu e o săgeată adevărată.', 6),
    () => flash('personificare', 'Personificarea…', ['dă însușiri omenești lucrurilor', 'e o teoremă', 'e un procent', 'șterge subiectul'], 'Vântul „șoptește”.', 7),
    () => flash('idee', 'Ideea principală e…', ['ce se întâmplă cu adevărat, pe scurt', 'un adjectiv izolat', 'data de pe caiet', 'un unghi'], 'Restul e decor.', 8)
  ],
  redactare: [
    () => flash('plan', 'Un text scurt are nevoie de…', ['început, cuprins, sfârșit', 'doar adjective', 'doar titlu', 'doar data'], 'Firul, nu broderia.', 1),
    () => flash('destinatar', 'Când scrii, te gândești întâi la…', ['cine citește și ce trebuie să afle', 'câte metafore pui', 'cât e de lung titlul', 'ce font folosești'], 'Destinatarul dictează tonul.', 2),
    () => flash('paragraf', 'Un paragraf…', ['ține o idee, apoi treci la alta', 'amestecă tot', 'e o formulă', 'e un unghi'], 'Un bloc, un gând.', 3),
    () => flash('ortografie', 'Ortografia e…', ['respect față de cititor, nu pedepsă', 'opțională', 'un unghi', 'un prim'], 'Virgula și litera mare ajută ochiul.', 4),
    () => flash('titlu', 'Titlul bun…', ['anunță despre ce e vorba, fără să spună tot', 'are 40 de cuvinte', 'e o teoremă', 'e data'], 'Ușa, nu toată casa.', 5),
    () => flash('detaliu', 'În descriere, un detaliu bun e…', ['concret: culoare, sunet, gest', '„era frumos” gol', 'un procent', 'un prim'], 'Arăți, nu etichetezi.', 6),
    () => flash('incheiere', 'Încheierea…', ['închide firul, nu deschide alt subiect', 'adaugă o temă nouă', 'e un unghi', 'e o medie'], 'Ușa se trage, nu se deschide alt coridor.', 7),
    () => flash('plan', 'Înainte de a scrie, faci…', ['un plan scurt, în 3 puncte', 'nimic', 'o teoremă', 'un cub'], 'Cap + mijloc + capăt.', 8)
  ]
};

FLASHES.limba5 = [
  (r) => synonymFlash(r, 1),
  (r) => antonymFlash(r, 2),
  (r) => subiectFlash(r, 3),
  (r) => predicatFlash(r, 4),
  () => flash('propozitie', 'O propoziție dezvoltată…', ['are pe lângă subiect și predicat și alți însoțitori', 'are doar un cuvânt', 'e un unghi', 'e un prim'], '„Ana citește o carte” e dezvoltată.', 5),
  () => flash('verb', 'Verbul la indicativ…', ['spune ce se întâmplă, ca o constatare', 'dă un ordin', 'e un substantiv', 'e un unghi'], 'citește, aleargă — se întâmplă.', 6),
  () => flash('adjectiv', 'Adjectivul…', ['arată o însușire a substantivului', 'e predicatul mereu', 'e un număr prim', 'e un unghi'], 'carte groasă: groasă ține de carte.', 7),
  () => flash('silaba', 'Silaba e…', ['o bucată de cuvânt cu o vocală', 'o consoană izolată', 'un unghi', 'un prim'], 'ca-rte: două silabe.', 8)
];
FLASHES.inter5 = [
  () => flash('identitate', 'O legendă locală te ajută să…', ['povestești de unde vii, cu un exemplu', 'înveți o formulă', 'calculezi arii', 'sari peste lectură'], 'Modelele se povestesc, nu se predică.', 1),
  () => flash('acasă', '„Acasă” într-un text despre tine e…', ['un loc și o lume de obiceiuri', 'doar o adresă', 'un unghi', 'un prim'], 'Poți arăta, nu doar numi.', 2),
  () => flash('model', 'Un model dintr-o poveste…', ['e cineva a cărui faptă merită privită', 'e o teoremă', 'e un procent', 'e un cub'], 'Nu predică: arată.', 3),
  () => flash('carte-ro', 'O carte românească de-a lungul timpului…', ['arată că poveștile noastre au istorie', 'e o formulă', 'e un unghi', 'e un prim'], 'Nu e predică patriotică: e fir.', 4),
  () => flash('eu', 'Să spui cine ești începe cu…', ['un exemplu din viața ta, nu o listă de sloganuri', 'o teoremă', 'un procent', 'un cub'], 'Eu, apoi noi.', 5),
  () => flash('noi', '„Ai noștri” înseamnă, aici…', ['oameni și povești pe care le recunoști', 'o formulă', 'un unghi', 'un prim'], 'Nu e rang, e recunoaștere.', 6),
  () => flash('ascult', 'Când cineva își spune locul, tu…', ['asculți exemplul, nu judeci imediat', 'închizi urechea', 'faci o medie', 'calculezi aria'], 'Curiozitate, nu rang.', 7),
  () => flash('identitate', 'Identitatea se arată prin…', ['fapte și povești, nu prin lozinci', 'doar steag', 'un unghi', 'un prim'], 'Un exemplu ține mai bine decât un slogan.', 8)
];
FLASHES.oral6 = FLASHES.oral.map((fn, i) => (r) => {
  if (i === 0) return flash('rezumat', 'Un rezumat oral păstrează…', ['ordinea întâmplărilor importante', 'toate adjectivele', 'doar titlul', 'doar data'], 'Firul, nu broderia.', 1);
  return fn(r);
});
FLASHES.lectura6 = FLASHES.lectura;
FLASHES.redactare6 = FLASHES.redactare;
FLASHES.limba6 = [
  (r) => predicatFlash(r, 1),
  (r) => subiectFlash(r, 2),
  (r) => antonymFlash(r, 3),
  () => flash('nume-pred', 'Predicatul nominal e de forma…', ['a fi (sau similar) + un nume / adjectiv', 'doar un verb de mișcare', 'un unghi', 'un prim'], '„Ana e harnică”: e + harnică.', 4),
  () => flash('cd', 'Complementul direct răspunde la…', ['pe cine? / ce? după verb', 'unde?', 'când?', 'de ce?'], '„Citește o carte”: ce citește?', 5),
  () => flash('circ', 'Circumstanțialul de loc spune…', ['unde se întâmplă', 'cine face', 'ce e predicatul', 'un procent'], 'în curte, la școală.', 6),
  () => flash('caz', 'Cazul arată…', ['rolul numelui în propoziție (cine, pe cine, cui…)', 'un unghi', 'un prim', 'un cub'], 'Forma se schimbă după treabă.', 7),
  () => flash('hiat', 'Hiatul e…', ['două vocale alăturate, în silabe diferite', 'un unghi', 'un prim', 'un cub'], 'a-er, po-e-zie.', 8)
];
FLASHES.inter6 = [
  () => flash('lume', 'Româna „în lume” înseamnă că…', ['e vorbită și dincolo de granița clasei', 'e doar în manual', 'e o formulă', 'e un unghi'], 'Limba trăiește unde sunt vorbitori.', 1),
  () => flash('vorbitori', 'Vorbitorii din alte țări…', ['arată că limba nu e un zid', 'anulează gramatica', 'sunt o teoremă', 'sunt un prim'], 'Aceeași limbă, alte locuri.', 2),
  () => flash('popular', 'Cultura populară…', ['e un depozit de povești și obiceiuri, nu muzeu mort', 'e o formulă', 'e un unghi', 'e un prim'], 'O compari, nu o pui în vitrină.', 3),
  () => flash('legenda', 'Compari o legendă a noastră cu a altora ca să…', ['vezi ce întrebări avem în comun', 'spui că a noastră e mai bună', 'înveți o dată', 'sari gramatica'], 'Comparația e curiozitate.', 4),
  () => flash('lume', '„Și acolo” într-o frază despre română…', ['leagă limba de oameni, nu de hartă goală', 'e un unghi', 'e un prim', 'e un cub'], 'Oameni, nu granițe goale.', 5),
  () => flash('respect', 'Când vorbești despre alții…', ['descrii, nu cobori', 'îi ștergi', 'faci o medie', 'calculezi aria'], 'Curiozitate.', 6),
  () => flash('punte', 'O punte culturală e…', ['un exemplu comun, nu un rang', 'o teoremă', 'un unghi', 'un prim'], 'Ce avem la fel, ce avem altfel.', 7),
  () => flash('lume', 'Limba trăiește…', ['unde sunt vorbitori, nu doar în caiet', 'doar la EN', 'într-un cub', 'într-un unghi'], 'Clasa e un loc, nu tot locul.', 8)
];
FLASHES.oral7 = [
  () => flash('prezentare', 'În fața clasei, un exemplu bun…', ['sprijină ideea, nu o înlocuiește cu povești goale', 'ține loc de plan', 'trebuie să fie o glumă', 'e obligatoriu lung'], 'Exemplul servește ideea.', 1),
  () => flash('voce', 'Volumul vocii…', ['se potrivește sălii, nu strigă ca să pară sigur', 'e un unghi', 'e un prim', 'e un cub'], 'Se aude, nu doare.', 2),
  () => flash('timp', 'Timpul unei prezentări…', ['se respectă: spui esențialul', 'e infinit', 'e o teoremă', 'e un procent'], 'Un capăt, nu o rătăcire.', 3),
  () => flash('gest', 'Gesturile…', ['ajută dacă nu furi ochii de la idee', 'înlocuiesc planul', 'sunt un unghi', 'sunt un prim'], 'Mâinile nu țin loc de conținut.', 4),
  (r) => synonymFlash(r, 5),
  () => flash('sinteza', 'Să sintetizezi înseamnă…', ['să ții firul, să tai surplusul', 'să copiezi tot', 'să faci o medie de note', 'să calculezi aria'], 'Mai scurt, același miez.', 6),
  () => flash('argument', 'O părere ține dacă are…', ['un motiv (și, la nevoie, o dovadă)', 'doar volum', 'doar emojis', 'doar titlul lecției'], 'Argument = afirmație + de ce.', 7),
  () => flash('prezentare', 'Începutul unei prezentări…', ['spune despre ce e vorba, într-o frază', 'e o glumă obligatorie', 'e un unghi', 'e un prim'], 'Ușa, apoi casa.', 8)
];
FLASHES.lectura7 = [
  () => flash('epic', 'Un text e epic dacă…', ['se întâmplă ceva, cu personaje', 'e doar o stare, fără acțiune', 'e o teoremă', 'e un tabel'], 'Epic = acțiune + personaje.', 1),
  () => flash('liric', 'Un text e liric dacă…', ['e o stare, o voce, nu neapărat o întâmplare', 'are obligatoriu o bătaie', 'e un unghi', 'e un prim'], 'Simți, nu numeri faptele.', 2),
  () => flash('dramatic', 'Un text dramatic e făcut…', ['să se joace: replici, scene', 'doar de citit în gând', 'ca o teoremă', 'ca un procent'], 'Voci, nu un povestitor continuu.', 3),
  (r) => ideaFlash(r, 4),
  () => flash('punct-vedere', 'Două puncte de vedere pe același text…', ['pot vedea fapte diferite sau aceleași altfel', 'sunt o eroare', 'sunt un unghi', 'sunt un prim'], 'Compari, nu ștergi unul.', 5),
  () => flash('narator', 'Naratorul e…', ['cine spune povestea, nu neapărat autorul', 'titlul', 'un unghi', 'un prim'], 'Persoana I sau a III-a se vede din pronume.', 6),
  () => flash('conflict', 'Conflictul…', ['e ce se lovește: dorințe, oameni, lumi', 'e un procent', 'e un cub', 'e un unghi'], 'Fără frecare, epuizezi firul.', 7),
  () => flash('epic', 'Dacă sunt personaje și întâmplări, cauți întâi…', ['firul epic', 'doar rima', 'o teoremă', 'un prim'], 'Ce se întâmplă, cui.', 8)
];
FLASHES.redactare7 = FLASHES.redactare.map((fn, i) => (r) => {
  if (i === 0) return flash('portret', 'Portretul unui personaj se construiește din…', ['fapte și vorbe, nu din adjective înșirate', 'doar haine', 'doar data nașterii', 'doar titlul cărții'], 'Arăți, nu etichetezi.', 1);
  return fn(r);
});
FLASHES.limba7 = [
  (r) => synonymFlash(r, 1),
  (r) => antonymFlash(r, 2),
  () => flash('fraza', 'Fraza leagă…', ['propoziții (și, dar, deci…)', 'doar litere', 'unghiuri', 'prime'], 'Nu mai e o insulă de cuvinte.', 3),
  () => flash('coord', 'Coordonarea…', ['leagă părți de același rang, cu și / dar / deci', 'subordonează tot', 'e un unghi', 'e un prim'], 'Două idei, umăr la umăr.', 4),
  () => flash('cauza', 'O cauză răspunde la…', ['de ce?', 'unde?', 'când?', 'cine?'], 'pentru că, căci.', 5),
  () => flash('familie', 'Familia lexicală…', ['cuvinte din același rădăcină', 'o listă de antonime', 'un unghi', 'un prim'], 'carte, a citi, cititor.', 6),
  () => flash('pleonasm', 'Pleonasmul e…', ['să spui de două ori același lucru', 'un sinonim bun', 'un unghi', 'un prim'], '„Avansează înainte” e de evitat.', 7),
  () => flash('paronime', 'Paronimele…', ['seamănă, dar nu înseamnă la fel', 'sunt identice', 'sunt unghiuri', 'sunt prime'], 'temporal / temporar.', 8)
];
FLASHES.inter7 = [
  () => flash('mit', 'Compari un mit al nostru cu al altora ca să…', ['vezi ce întrebări avem în comun', 'spui că ai noștri sunt mai buni', 'înveți o dată', 'sari gramatica'], 'Comparația e curiozitate, nu rang.', 1),
  () => flash('mit2', 'Un mit explică…', ['o lume, nu o minciună de copii', 'o teoremă', 'un unghi', 'un prim'], 'De ce e noaptea noapte, într-un model.', 2),
  () => flash('vecini', 'Culturile din jur…', ['se ating de a noastră; merită descrise', 'nu există', 'sunt un cub', 'sunt un unghi'], 'Nu e concurs.', 3),
  () => flash('schimb', 'Limba se schimbă când…', ['oamenii se întâlnesc', 'e o teoremă', 'e un prim', 'e un cub'], 'Cuvinte călătoresc.', 4),
  () => flash('mit', '„De ce” într-un mit…', ['e întrebarea lumii, nu o glumă', 'e un unghi', 'e un prim', 'e un cub'], 'Explicație pe model.', 5),
  () => flash('respect', 'Când compari mituri…', ['cauți asemănări, nu un clasament', 'ștergi pe ai noștri', 'faci o medie', 'calculezi aria'], 'Curiozitate.', 6),
  () => flash('punte', 'O punte mitică e…', ['aceeași întrebare, alt nume', 'o teoremă', 'un unghi', 'un prim'], 'Soarele răsare și la alții.', 7),
  () => flash('lume', 'Mitul e al lumii, nu doar…', ['al caietului de clasa a VII-a', 'al unui cub', 'al unui unghi', 'al unui prim'], 'Întrebările rămân.', 8)
];
FLASHES.oral8 = [
  () => flash('argument', 'O părere ține dacă are…', ['un motiv (și, la nevoie, o dovadă)', 'doar volum', 'doar emojis', 'doar titlul lecției'], 'Argument = afirmație + de ce.', 1),
  () => flash('sursa', 'O sursă…', ['sprijină, nu înlocuiește gândul tău', 'e obligatoriu Wikipedia', 'e un unghi', 'e un prim'], 'Spui de unde, pe scurt.', 2),
  () => flash('contra', 'Să continui ideea altcuiva…', ['fără s-o strici: adaugi, nu o răstorni din start', 'înseamnă să taci', 'e un unghi', 'e un prim'], '„Da, și…” înainte de „dar”.', 3),
  () => flash('info', 'Informația e…', ['ce se poate verifica; intenția e ce vrea vorbitorul', 'același lucru cu opinia', 'un unghi', 'un prim'], 'Le deosebești.', 4),
  () => flash('dezbatere', 'În dezbatere, primul pas e…', ['să înțelegi ce s-a zis, apoi să răspunzi', 'să strigi', 'să calculezi aria', 'să faci un cub'], 'Asculți ca să răspunzi, nu ca să aștepți rândul.', 5),
  (r) => synonymFlash(r, 6),
  () => flash('concluzie', 'Concluzia…', ['strânge, nu deschide alt război', 'e o glumă', 'e un unghi', 'e un prim'], 'Ce rămâne după argumente.', 7),
  () => flash('argument', '„Pentru că” într-o frază de opinie…', ['leagă afirmația de motiv', 'e un ornament', 'e un unghi', 'e un prim'], 'Fără el, e slogan.', 8)
];
FLASHES.lectura8 = [
  () => flash('dovada', 'La un text necunoscut, întâi…', ['citești firul, apoi întrebi', 'sari la grilă', 'inventezi un comentariu', 'cauți autorul pe internet'], 'Textul din față, nu comentariul de acasă.', 1),
  () => flash('tema', 'Tema e…', ['despre ce e vorba, pe scurt', 'un citat învățat', 'un unghi', 'un prim'], 'Nu „autorul vrea să transmită” gol.', 2),
  () => flash('esential', 'Esențialul e…', ['ce ține firul; restul e ornament', 'toate adjectivele', 'data', 'un cub'], 'Tai, nu îngropi.', 3),
  () => flash('nonlit', 'Un text nonliterar…', ['informează, explică, convinge — verifici datele', 'e o poezie', 'e un unghi', 'e un prim'], 'Afiș, tabel, știre.', 4),
  () => flash('tabel', 'Un tabel se citește…', ['pe coloane și pe ce compară', 'ca o poezie', 'ca un unghi', 'ca un prim'], 'Ce e pe orizontală, ce e pe verticală.', 5),
  () => flash('afis', 'Un afiș cere întâi…', ['cine, ce, când — mesajul util', 'toate fonturile', 'un unghi', 'un prim'], 'Informația, apoi decorul.', 6),
  (r) => ideaFlash(r, 7),
  () => flash('dovada', 'O dovadă din text e…', ['un cuvânt sau un fapt pe care îl poți arăta', 'o părere a ta fără text', 'un unghi', 'un prim'], 'Degetul pe rând.', 8)
];
FLASHES.redactare8 = FLASHES.oral8;
FLASHES.limba8 = FLASHES.limba5;
FLASHES.inter8 = [
  () => flash('lume-lit', 'Un model din literatura lumii merită dacă…', ['pune aceleași întrebări, și aiurea', 'e doar exotic', 'înlocuiește limba română', 'e mai scurt'], 'Te uiți afară ca să te vezi.', 1),
  () => flash('punte', 'Cu ce unelte citești un text „al lumii”? ', ['idee, dovadă, ton — aceleași', 'o teoremă', 'un unghi', 'un prim'], 'Nu schimbi uneltele.', 2),
  () => flash('noi', '„Noi și ceilalți”: primul verb…', ['descrii, nu cobori', 'ștergi', 'calculezi', 'strigi'], 'Curiozitate, nu rang.', 3),
  () => flash('valori', 'Valorile românești văzute din afară…', ['te ajută să le vezi, nu să le pui în vitrină', 'dispar', 'sunt un unghi', 'sunt un prim'], 'Oglinda, nu altarul.', 4),
  () => flash('lume', 'De ce merită un text de aiurea?', ['aceleași întrebări, și noi', 'e exotic', 'e un cub', 'e un unghi'], 'Nu e album.', 5),
  () => flash('citire', 'Citești un text străin…', ['cu aceleași unelte de română', 'fără idee', 'cu o teoremă', 'cu un prim'], 'Fir, dovadă, ton.', 6),
  () => flash('reflectie', 'O reflecție întreabă…', ['ce rămâne după', 'doar faptele', 'un unghi', 'un prim'], 'Nu e relatare goală.', 7),
  () => flash('lume-lit', 'Te uiți afară ca să…', ['te vezi', 'fugi de română', 'faci un cub', 'calculezi aria'], 'Oglinda.', 8)
];

function easyWordTest(rand, lv) {
  const name = pick(rand, NAMES);
  const verb = pick(rand, ['citește', 'aleargă', 'desenează', 'ascultă']);
  return test('predicat', `Propoziția: „${name} ${verb} liniștit.” Care e predicatul? Un cuvânt.`, [verb], [`Cine? ${name}`, `Ce face? ${verb}`], { tokens: [verb], level: lv });
}

function easySubjectTest(rand, lv) {
  const name = pick(rand, NAMES);
  const verb = pick(rand, ['citește', 'aleargă']);
  return test('subiect', `Propoziția: „${name} ${verb}.” Care e subiectul? Un cuvânt.`, [name], [`Cine? ${name}`], { tokens: [name.toLowerCase()], level: lv });
}

function oralEasy(rand, lv) {
  const name = pick(rand, NAMES);
  const thing = pick(rand, THINGS);
  const hour = int(rand, 8, 16);
  return test('mesaj', `Anunț: „${name}, mâine ora ${hour}, adu ${thing}.” Scrie ora (doar numărul).`, [String(hour)], ['Când: ora'], { tokens: [String(hour)], level: lv });
}

function oralMid(rand, lv) {
  const name = pick(rand, NAMES);
  const thing = pick(rand, THINGS);
  const hour = int(rand, 8, 16);
  return test('mesaj', `Anunț: „${name}, mâine ora ${hour}, adu ${thing}.” În maximum 10 cuvinte, scrie ce și când. Trebuie obiectul și ora.`, [thing.replace(/ul$/, ''), String(hour)], ['Ce trebuie adus', 'Când: ora'], { long: true, tokens: [String(hour)], minWords: 3, level: lv });
}

function lecturaEasy(rand, lv) {
  const name = pick(rand, NAMES);
  return test('idee', `Text: ${name} aleargă. Cine aleargă? Un cuvânt.`, [name], [`Cine: ${name}`], { tokens: [name.toLowerCase()], level: lv });
}

function lecturaMid(rand, lv) {
  const name = pick(rand, NAMES);
  const place = pick(rand, PLACES);
  const thing = pick(rand, THINGS);
  return test('idee', `Text: ${name} lasă ${thing} în ${place}, apoi se întoarce îngrijorat. În 8–15 cuvinte, spune ideea principală (cine + ce face).`, [name.toLowerCase()], ['Cine + ce'], { long: true, tokens: [name.toLowerCase()], minWords: 6, level: lv });
}

function redactareEasy(rand, lv) {
  return test('plan', 'Un text scurt are 3 părți. Scrie cuvântul din mijloc: început, …, sfârșit.', ['cuprins', 'mijloc'], ['Început – cuprins – sfârșit'], { tokens: ['cuprins'], level: lv });
}

function redactareMid(rand, lv) {
  const place = pick(rand, PLACES);
  return test('plan', `Vrei să descrii ${place}. Scrie cele 3 părți ale planului, cu cuvintele: început, cuprins (sau mijloc), sfârșit.`, ['inceput', 'sfarsit'], ['Început, cuprins, sfârșit'], { long: true, tokens: ['inceput', 'sfarsit'], minWords: 5, level: lv });
}

function argumentHard(rand, lv) {
  const tema = pick(rand, ['lectura zilnică', 'pauza de sport', 'vizita la bibliotecă']);
  return test('argument', `Tema: ${tema}. Scrie o părere într-o frază care conține „pentru că”. Minim 8 cuvinte.`, ['pentru ca', 'pentru că'], ['Afirmație + pentru că + motiv'], { long: true, tokens: ['pentru'], minWords: 8, level: lv });
}

function makeTests(easy1, easy2, mid1, mid2, mid3, hard1, hard2) {
  return [easy1, easy2, mid1, mid2, mid3, hard1, hard2];
}

const TESTS = {
  oral: makeTests(oralEasy, easyWordTest, oralMid, oralMid, lecturaEasy, argumentHard, argumentHard),
  lectura: makeTests(lecturaEasy, easySubjectTest, lecturaMid, lecturaMid, easyWordTest, argumentHard, lecturaMid),
  redactare: makeTests(redactareEasy, easyWordTest, redactareMid, redactareMid, oralMid, argumentHard, argumentHard),
  limba5: makeTests(
    easyWordTest,
    easySubjectTest,
    easyWordTest,
    (_r, lv) => test('sinonime', 'Sinonim pentru „repede”? Un cuvânt (iute).', ['iute'], ['repede ≈ iute'], { tokens: ['iute'], level: lv }),
    (_r, lv) => test('antonime', 'Antonimul lui „cald”? Un cuvânt.', ['rece'], ['cald ↔ rece'], { tokens: ['rece'], level: lv }),
    (r, lv) => test('propozitie', `„${pick(r, NAMES)} citește o carte.” Predicatul?`, ['citește', 'citeste'], ['Verbul: citește'], { tokens: ['citeste'], level: lv }),
    argumentHard
  )
};

TESTS.inter5 = makeTests(
  (_r, lv) => test('identitate', 'Completează: o poveste de-acasă merită spusă pentru că e … (a noastră / a voastră). Un cuvânt.', ['noastra', 'a noastra', 'a noastră'], ['E a noastră, cu exemplu'], { tokens: ['noastr'], level: lv }),
  easySubjectTest,
  (_r, lv) => test('identitate', 'În 6–12 cuvinte, spune de ce o poveste a locului tău merită spusă. Folosește „acasă” sau „ai noștri”.', ['acasa', 'nostri', 'noștri'], ['Un exemplu, nu o listă'], { long: true, minWords: 6, level: lv }),
  oralMid,
  lecturaMid,
  argumentHard,
  (_r, lv) => test('identitate', 'Scrie 8–12 cuvinte despre un obicei de-acasă. Folosește „acasă” și „pentru că”.', ['acasa', 'pentru'], ['Exemplu + motiv'], { long: true, tokens: ['pentru'], minWords: 8, level: lv })
);
TESTS.oral6 = TESTS.oral;
TESTS.lectura6 = TESTS.lectura;
TESTS.redactare6 = TESTS.redactare;
TESTS.limba6 = TESTS.limba5;
TESTS.inter6 = makeTests(
  (_r, lv) => test('lume', 'Româna e vorbită și în alte țări. Da sau nu?', ['da'], ['Da: vorbitori și dincolo'], { tokens: ['da'], level: lv }),
  easyWordTest,
  (_r, lv) => test('lume', 'O frază cu „și acolo” sau „vorbitori” despre română. Minim 6 cuvinte.', ['acolo', 'vorbitori'], ['Oameni, nu hartă goală'], { long: true, minWords: 6, level: lv }),
  oralMid,
  lecturaMid,
  argumentHard,
  (_r, lv) => test('lume', 'De ce merită să știi că româna e vorbită și aiurea? O frază cu „pentru că”.', ['pentru'], ['Limba e a vorbitorilor'], { long: true, tokens: ['pentru'], minWords: 8, level: lv })
);
TESTS.oral7 = TESTS.oral;
TESTS.lectura7 = makeTests(
  (_r, lv) => test('epic', 'Text cu personaje și întâmplări. E epic, liric sau dramatic? Un cuvânt.', ['epic'], ['Se întâmplă ceva'], { tokens: ['epic'], level: lv }),
  lecturaEasy,
  (_r, lv) => test('epic', 'Text cu personaje și întâmplări. E epic, liric sau dramatic? Un cuvânt, apoi de ce (min. 5 cuvinte).', ['epic'], ['Se întâmplă ceva', 'Sunt personaje'], { long: true, tokens: ['epic'], minWords: 6, level: lv }),
  (_r, lv) => test('liric', 'Un text e doar o stare, fără acțiune. Un cuvânt: epic / liric / dramatic.', ['liric'], ['Stare, nu fir de fapte'], { tokens: ['liric'], level: lv }),
  lecturaMid,
  argumentHard,
  (_r, lv) => test('punct-vedere', 'De ce merită două puncte de vedere pe același text? O frază cu „pentru că”.', ['pentru'], ['Compari, nu ștergi'], { long: true, tokens: ['pentru'], minWords: 8, level: lv })
);
TESTS.redactare7 = TESTS.redactare;
TESTS.limba7 = TESTS.limba5;
TESTS.inter7 = makeTests(
  (_r, lv) => test('mit', 'Un mit explică o lume. Da sau nu?', ['da'], ['E un model de lume'], { tokens: ['da'], level: lv }),
  easyWordTest,
  (_r, lv) => test('mit', 'Un mit explică o lume. O frază cu „de ce” sau „lume”.', ['de ce', 'lume'], ['Nu e minciună de copii'], { long: true, minWords: 5, level: lv }),
  oralMid,
  argumentHard,
  argumentHard,
  (_r, lv) => test('mit', 'Compari două mituri. De ce? O frază cu „aceleași” sau „pentru că”.', ['pentru', 'aceleasi', 'aceleași'], ['Aceleași întrebări'], { long: true, minWords: 8, level: lv })
);
TESTS.oral8 = makeTests(easyWordTest, oralEasy, argumentHard, argumentHard, oralMid, argumentHard, argumentHard);
TESTS.lectura8 = makeTests(
  (_r, lv) => test('dovada', 'Ai un text nou. Primul pas, un cuvânt: citești / sari / inventezi.', ['citesti', 'citești'], ['Întâi textul'], { tokens: ['cit'], level: lv }),
  lecturaEasy,
  (_r, lv) => test('dovada', 'Ai un text nou în față. Primul pas: un cuvânt (citești / sari / inventezi), apoi o frază.', ['citesti', 'citești'], ['Întâi textul', 'Apoi întrebările'], { long: true, tokens: ['cit'], minWords: 4, level: lv }),
  lecturaMid,
  argumentHard,
  argumentHard,
  (_r, lv) => test('tema', 'Ce e tema unui text? O frază cu „despre”. Minim 6 cuvinte.', ['despre'], ['Despre ce e vorba, pe scurt'], { long: true, tokens: ['despre'], minWords: 6, level: lv })
);
TESTS.redactare8 = TESTS.oral8;
TESTS.limba8 = TESTS.limba5;
TESTS.inter8 = makeTests(
  (_r, lv) => test('lume-lit', 'Un text din altă țară se citește cu aceleași unelte? da / nu.', ['da'], ['Idee, dovadă, ton'], { tokens: ['da'], level: lv }),
  easySubjectTest,
  (_r, lv) => test('lume-lit', 'De ce merită un text „de aiurea”? O frază cu „aceleași” sau „și noi”.', ['aceleasi', 'aceleași', 'noi'], ['Aceleași întrebări'], { long: true, minWords: 6, level: lv }),
  argumentHard,
  lecturaMid,
  argumentHard,
  (_r, lv) => test('reflectie', 'O reflecție întreabă „ce rămâne după”. Completează în 8–12 cuvinte, cu „după”.', ['dupa', 'după'], ['Nu doar faptele'], { long: true, minWords: 8, level: lv })
);

function generateRomana(chapterId, kind, rand, level) {
  const lv = Math.max(1, Number(level) || 1);
  if (kind === 'test') {
    const list = TESTS[chapterId] || TESTS.lectura;
    return rung(lv, list)(rand, ((lv - 1) % list.length) + 1);
  }
  const list = FLASHES[chapterId] || FLASHES.lectura;
  return rung(lv, list)(rand);
}

module.exports = { generateRomana };
