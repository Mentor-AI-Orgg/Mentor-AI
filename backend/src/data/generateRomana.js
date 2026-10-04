const { int, pick } = require('./itemRng');

const NAMES = ['Ana', 'Mihai', 'Ioana', 'Andrei', 'Elena', 'Radu', 'Maria', 'Vlad'];
const PLACES = ['curtea școlii', 'parcul din sat', 'biblioteca', 'sala de clasă', 'drumul spre casă'];
const THINGS = ['atlasul', 'caietul', 'dicționarul', 'romanul', 'afișul'];

function flash(point, question, options, explain, level) {
  if (!Array.isArray(options) || options.length !== 4) return null;
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

function word(point, prompt, answers, why, lv, extra = {}) {
  const list = Array.isArray(answers) ? answers : [answers];
  return test(point, prompt, list, [why], {
    tokens: extra.tokens,
    long: Boolean(extra.long),
    minWords: extra.minWords || 0,
    level: lv
  });
}

function line(point, prompt, sample, why, lv, tokens, minWords) {
  return word(point, prompt, [sample], why, lv, {
    tokens,
    long: true,
    minWords: minWords || 6
  });
}

function row(point, prompt, sample, why, tokens, min) {
  return { point, prompt, sample, why, tokens, min };
}

function wordRow(point, prompt, answers, why, tokens) {
  return { point, prompt, answers, why, tokens };
}

function choice(rand, rows, lv) {
  const row = pick(rand, rows);
  const who = Number(lv) >= 6 ? pick(rand, NAMES) : '';
  const lead = who ? `Pentru ${who}: ` : '';
  if (row.answers) return word(row.point, `${lead}${row.prompt}`, row.answers, row.why, lv, { tokens: row.tokens });
  return line(row.point, `${lead}${row.prompt}`, row.sample, row.why, lv, row.tokens, row.min || 6);
}

function tale(rand) {
  const name = pick(rand, NAMES);
  const place = pick(rand, ['bibliotecă', 'parc', 'curte']);
  const thing = pick(rand, ['atlasul', 'scrisoarea', 'caietul']);
  const text = `${name} caută ${thing} în ${place}, apoi îl duce acasă, bucuros.`;
  return { name, place, thing, text };
}

function room(rand) {
  const name = pick(rand, NAMES);
  const place = pick(rand, ['bibliotecă', 'clasă', 'curte']);
  const text = `${name} intră în ${place}. Lumina e slabă, băncile sunt reci, iar pe masă stă un atlas vechi.`;
  return { name, place, text };
}

const TESTS = {};

TESTS.limba5 = [
  (r, lv) => {
    const name = pick(r, NAMES);
    return word('predicat', `În „${name} scrie o scrisoare prietenului.” predicatul este verbul. Un cuvânt.`, ['scrie'], 'Verbul arată ce face.', lv, { tokens: ['scrie'] });
  },
  (r, lv) => {
    const name = pick(r, NAMES);
    return word('subiect', `În „${name} caută atlasul în bibliotecă.” cine face acțiunea? Un cuvânt.`, [name], 'Subiectul răspunde la cine?', lv, { tokens: [name.toLowerCase()] });
  },
  (_r, lv) => word('acord', 'Alege forma corectă și scrie doar verbul: «Copiii (merge / merg) la bibliotecă.»', ['merg'], 'Subiectul e la plural.', lv, { tokens: ['merg'] }),
  (r, lv) => {
    const row = pick(r, [
      ['cumpătul', 'calmul', 'calm', 'graba, calmul, foamea sau zgomotul', 'Cumpătul e calmul, nu graba.'],
      ['curajos', 'viteaz', 'viteaz', 'leneș, viteaz, ud sau strâmt', 'Curajos și viteaz spun aproape același lucru.'],
      ['repede', 'iute', 'iute', 'iute, greu, verde sau gol', 'Repede și iute sunt sinonime.']
    ]);
    return word('sinonime', `Înlocuiește «${row[0]}» cu sinonimul potrivit din listă: ${row[3]}. Un cuvânt.`, [row[1]], row[4], lv, { tokens: [row[2]] });
  },
  (r, lv) => {
    const row = pick(r, [
      ['curajos', 'fricos', 'fric', 'Curajos și fricos se opun.'],
      ['lung', 'scurt', 'scurt', 'Lung și scurt se opun.'],
      ['vesel', 'trist', 'trist', 'Vesel și trist se opun.']
    ]);
    return word('antonime', `În enunț, «${row[0]}» cere antonimul. Scrie un cuvânt.`, [row[1], row[1] === 'fricos' ? 'laș' : row[1]], row[3], lv, { tokens: [row[2]] });
  },
  (r, lv) => {
    const who = pick(r, NAMES);
    const row = pick(r, [
      ['Andrei are inimă de piatră', 'piatră', 'figurat pentru că inima nu e o piatră adevărată'],
      ['Maria e o rază de soare', 'soare', 'figurat pentru că Maria nu e un soare pe cer'],
      ['Vlad e un leu în teren', 'leu', 'figurat pentru că Vlad nu e animalul leu'],
      ['Elena e o floare rară', 'floare', 'figurat pentru că Elena nu e o floare din grădină'],
      ['Radu are o inimă de aur', 'aur', 'figurat pentru că inima nu e făcută din aur'],
      ['Ioana e o albină harnică', 'albină', 'figurat pentru că Ioana nu e o albină'],
      ['Mihai e un stejar în echipă', 'stejar', 'figurat pentru că Mihai nu e un copac'],
      ['Ana înoată într-un ocean de teme', 'ocean', 'figurat pentru că temele nu sunt o apă']
    ]);
    return line('sens', `Pentru ${who}: în «${row[0]}», «${row[1]}» are sens propriu sau figurat? Scrie cuvântul și un motiv, minim 6 cuvinte.`, row[2], 'Sensul nu e cel din dicționarul de obiecte.', lv, ['figurat'], 6);
  },
  (r, lv) => {
    const row = pick(r, [
      ['Fetele citește o carte în bibliotecă.', 'Fetele citesc o carte în bibliotecă în fiecare zi.', 'citesc'],
      ['Copiii merge la muzeu după ore.', 'Copiii merg la muzeu după ore cu clasa.', 'merg'],
      ['Băieții scrie tema în clasă.', 'Băieții scriu tema în clasă în fiecare zi.', 'scriu']
    ]);
    return line('acord', `Rescrie corect, minim 6 cuvinte: «${row[0]}»`, row[1], 'Subiectul e la plural, deci și verbul.', lv, [row[2]], 6);
  },
  (r, lv) => {
    const who = pick(r, NAMES);
    const row = pick(r, [
      ['Fetele citește o carte în bibliotecă.', 'Fetele citesc o carte în bibliotecă', 'citesc', 'inimă de piatră'],
      ['Copiii merge la muzeu după ore.', 'Copiii merg la muzeu după ore', 'merg', 'rază de soare'],
      ['Băieții scrie tema în clasă.', 'Băieții scriu tema în clasă', 'scriu', 'leu în teren'],
      ['Elevele a citit poezia ieri.', 'Elevele au citit poezia ieri', 'citit', 'floare rară'],
      ['Băieții a plecat de la ora de sport.', 'Băieții au plecat de la ora de sport', 'plecat', 'inimă de aur'],
      ['Fetele a scris compunerea azi.', 'Fetele au scris compunerea azi', 'scris', 'ocean de teme'],
      ['Copiii a văzut filmul sâmbătă.', 'Copiii au văzut filmul sâmbătă', 'vazut', 'stejar în echipă'],
      ['Ei a dus atlasul înapoi.', 'Ei au dus atlasul înapoi', 'dus', 'albină harnică'],
      ['Fetele a plecat de la muzeu.', 'Fetele au plecat de la muzeu', 'plecat', 'rază de soare'],
      ['Copiii a scris tema aseară.', 'Copiii au scris tema aseară', 'scris', 'inimă de piatră'],
      ['Băieții citește romanul în clasă.', 'Băieții citesc romanul în clasă', 'citesc', 'stejar în echipă'],
      ['Elevele merge la bibliotecă mâine.', 'Elevele merg la bibliotecă mâine', 'merg', 'floare rară']
    ]);
    return line('acord', `Pentru ${who}, două lucruri într-un singur răspuns, minim 12 cuvinte. (1) Rescrie corect: «${row[0]}» (2) «${row[3]}» e sens propriu sau figurat? Spune și de ce, cu «pentru că».`, `${row[1]}, iar «${row[3]}» e figurat pentru că nu e obiectul din lumea reală.`, 'Acordul și sensul, amândouă.', lv, [row[2], 'figurat', 'pentru'], 12);
  }
];

TESTS.lectura = [
  (r, lv) => {
    const row = tale(r);
    return word('idee', `Text: ${row.text} Cine caută? Un cuvânt.`, [row.name], 'Personajul face acțiunea.', lv, { tokens: [row.name.toLowerCase()] });
  },
  (r, lv) => {
    const row = tale(r);
    return word('idee', `Text: ${row.text} Unde caută? Un cuvânt din text.`, [row.place], 'Locul e în enunț.', lv, { tokens: [row.place.toLowerCase()] });
  },
  (r, lv) => {
    const row = tale(r);
    return word('idee', `Text: ${row.text} Ce caută? Un cuvânt din text.`, [row.thing], 'Obiectul căutat.', lv, { tokens: [row.thing.toLowerCase()] });
  },
  (r, lv) => {
    const row = tale(r);
    return line('idee', `Text: ${row.text} În 6–10 cuvinte, spune cine și ce face.`, `${row.name} caută ${row.thing} și apoi îl duce acasă.`, 'Idee: cine + ce face.', lv, [row.name.toLowerCase(), 'cauta'], 6);
  },
  (r, lv) => {
    const row = tale(r);
    return line('idee', `Text: ${row.text} În 6–10 cuvinte, spune unde se petrece și ce stare are la final.`, `${row.name} e în ${row.place} și la final e bucuros.`, 'Locul și starea din final.', lv, ['bucuros'], 6);
  },
  (r, lv) => {
    const row = tale(r);
    return line('idee', `Text: ${row.text} În 8–12 cuvinte, formula ideea principală: cine, ce face, unde.`, `${row.name} caută ${row.thing} în ${row.place} și îl duce acasă.`, 'Firul întreg, nu un detaliu.', lv, [row.name.toLowerCase(), 'duce'], 8);
  },
  (r, lv) => {
    const row = tale(r);
    return line('argument', `Text: ${row.text} De ce e bine că duce lucrul acasă? O frază cu «pentru că», minim 8 cuvinte.`, `E bine pentru că ${row.thing} ajunge acasă, la locul lui.`, 'Părere și motiv.', lv, ['pentru', 'acasa'], 8);
  },
  (r, lv) => {
    const row = tale(r);
    return line('argument', `Text: ${row.text} Două lucruri, minim 12 cuvinte. (1) De ce e bine că duce lucrul acasă? Cu «pentru că». (2) «Bucuros» e un detaliu sau ideea? Spune care, cu «detaliu».`, `E bine pentru că ${row.thing} ajunge acasă, iar bucuros e un detaliu, nu ideea principală.`, 'Motiv și deosebire.', lv, ['pentru', 'detali', 'acasa'], 12);
  }
];

TESTS.redactare = [
  (r, lv) => word('plan', 'Început, cuprins, sfârșit. Care e partea din mijloc? Un cuvânt.', ['cuprins', 'mijloc'], 'Planul are trei părți.', lv, { tokens: ['cuprins'] }),
  (r, lv) => {
    const thing = pick(r, ['caiet', 'atlas', 'scrisoare']);
    return line('plan', `Vrei o povestire despre un ${thing} pierdut. Scrie cele trei părți ale planului, minim 5 cuvinte.`, `Început, cuprins și sfârșit pentru povestea cu ${thing}.`, 'Trei părți, nu un singur titlu.', lv, ['inceput', 'sfarsit'], 5);
  },
  (r, lv) => line('plan', 'În planul dezvoltat, ideile din mijloc sunt propoziții. Cum se numește partea asta? Un cuvânt, apoi «de idei». Minim 3 cuvinte.', 'cuprins de idei, partea din mijloc', 'Cuprinsul ține faptele.', lv, ['cuprins'], 3),
  (r, lv) => choice(r, [
    row('redactare', 'Scrie două fraze, minim 8 cuvinte, în care un copil găsește un caiet pierdut. Trebuie un verb de acțiune.', 'Copilul găsește caietul sub bancă și îl duce la catedră.', 'Se vede fapta.', ['caiet'], 8),
    row('redactare', 'Scrie două fraze, minim 8 cuvinte, în care un copil găsește un atlas în bibliotecă. Trebuie un verb de acțiune.', 'Copilul găsește atlasul pe raft și îl pune la loc, cu grijă.', 'Se vede fapta.', ['atlas'], 8),
    row('redactare', 'Scrie două fraze, minim 8 cuvinte, în care un copil găsește o scrisoare în curte. Trebuie un verb de acțiune.', 'Copilul găsește scrisoarea în curte și o duce în clasă.', 'Se vede fapta.', ['scrisoare'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('redactare', 'Descrie în 8–12 cuvinte drumul unui caiet de la bancă până acasă. Trebuie «apoi».', 'Caietul stă sub bancă, apoi ajunge în ghiozdan și acasă.', 'Ordinea faptelor.', ['apoi'], 8),
    row('redactare', 'Descrie în 8–12 cuvinte drumul unui atlas de la raft până în ghiozdan. Trebuie «apoi».', 'Atlasul stă pe raft, apoi ajunge în mâini și în ghiozdan.', 'Ordinea faptelor.', ['apoi'], 8),
    row('redactare', 'Descrie în 8–12 cuvinte drumul unei scrisori de la curte până în clasă. Trebuie «apoi».', 'Scrisoarea stă în curte, apoi ajunge în buzunar și în clasă.', 'Ordinea faptelor.', ['apoi'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce merită un plan înainte să scrii? O frază cu «pentru că», minim 8 cuvinte.', 'Merită un plan pentru că ideile rămân în ordine și nu se pierd.', 'Planul ține firul.', ['pentru', 'plan'], 8),
    row('argument', 'De ce cuprinsul nu e o listă de adjective? O frază cu «pentru că», minim 8 cuvinte.', 'Nu e o listă pentru că planul ține faptele, în ordine, nu podoaba.', 'Fapte, nu adjective.', ['pentru', 'plan'], 8),
    row('argument', 'De ce scrii întâi începutul, apoi cuprinsul? O frază cu «pentru că», minim 8 cuvinte.', 'Scrii așa pentru că planul arată ce se întâmplă întâi și ce urmează.', 'Ordinea ține textul.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Tema: un obiect pierdut și găsit. Scrie o părere, minim 8 cuvinte, cu «pentru că».', 'E bine să cauți obiectul pentru că altfel rămâne pierdut toată ziua.', 'Afirmație și motiv.', ['pentru'], 8),
    row('argument', 'Tema: de ce un plan scurt ajută la povestire. O frază cu «pentru că», minim 8 cuvinte.', 'Ajută pentru că știi începutul, cuprinsul și sfârșitul înainte să scrii.', 'Trei părți.', ['pentru'], 8),
    row('argument', 'Tema: de ce finalul nu se scrie înaintea faptelor. O frază cu «pentru că», minim 8 cuvinte.', 'Nu se scrie înainte pentru că finalul strânge faptele, nu le înlocuiește.', 'Întâi firul.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('plan', 'Două lucruri, minim 12 cuvinte. (1) Pune în ordine planul amestecat: sfârșit, început, cuprins. (2) Scrie cuprinsul unei întâmplări cu un caiet, cu «apoi».', 'Început, cuprins și sfârșit. În cuprins găsește caietul sub bancă, apoi îl duce la catedră.', 'Ordinea și fapta din mijloc.', ['inceput', 'apoi', 'caiet'], 12),
    row('plan', 'Două lucruri, minim 12 cuvinte. (1) Pune în ordine planul amestecat: cuprins, sfârșit, început. (2) Scrie cuprinsul unei întâmplări cu un atlas, cu «apoi».', 'Început, cuprins și sfârșit. În cuprins găsește atlasul pe raft, apoi îl pune la loc.', 'Ordinea și fapta din mijloc.', ['inceput', 'apoi', 'atlas'], 12),
    row('plan', 'Două lucruri, minim 12 cuvinte. (1) Pune în ordine planul amestecat: sfârșit, cuprins, început. (2) Scrie cuprinsul unei întâmplări cu o scrisoare, cu «apoi».', 'Început, cuprins și sfârșit. În cuprins găsește scrisoarea în curte, apoi o duce în clasă.', 'Ordinea și fapta din mijloc.', ['inceput', 'apoi', 'scrisoare'], 12)
  ], lv)
];

TESTS.oral = [
  (r, lv) => {
    const name = pick(r, NAMES);
    const thing = pick(r, THINGS);
    const hour = int(r, 8, 16);
    return word('mesaj', `Anunț: „${name}, mâine ora ${hour}, la bibliotecă, adu ${thing}.” Ce oră e? Doar numărul.`, [String(hour)], 'Ora din anunț.', lv, { tokens: [String(hour)] });
  },
  (r, lv) => {
    const thing = pick(r, THINGS);
    return word('mesaj', `Anunț: „Mâine la bibliotecă, adu ${thing} și anunță dacă întârzii.” Ce trebuie adus? Un cuvânt din anunț.`, [thing], 'Obiectul cerut.', lv, { tokens: [thing.slice(0, 5).toLowerCase()] });
  },
  (r, lv) => line('mesaj', 'Într-un anunț spui cine, când, unde și ce. Dacă lipsește ora, ce lipsește? Scrie «când» și ce înseamnă, minim 3 cuvinte.', 'când lipsește, adică timpul întâlnirii', 'Când = ora.', lv, ['cand'], 3),
  (r, lv) => {
    const name = pick(r, NAMES);
    const thing = pick(r, THINGS);
    const hour = int(r, 8, 16);
    return line('mesaj', `Anunț: „${name}, mâine ora ${hour}, la bibliotecă, adu ${thing}. Dacă întârzii, anunță.” Rezumat, minim 6 cuvinte, cu ora și obiectul.`, `${name} aduce ${thing} mâine la ora ${hour}, la bibliotecă.`, 'Cine, ce, când.', lv, [String(hour)], 6);
  },
  (r, lv) => choice(r, [
    row('mesaj', 'De ce anunți dacă întârzii? O frază cu «pentru că», minim 8 cuvinte.', 'Anunți pentru că ceilalți nu te așteaptă degeaba la bibliotecă.', 'Motivul politeții.', ['pentru'], 8),
    row('mesaj', 'De ce spui și locul, nu doar ora? O frază cu «pentru că», minim 8 cuvinte.', 'Spui locul pentru că altfel cei chemați nu știu unde să vină.', 'Unde ține anunțul.', ['pentru'], 8),
    row('mesaj', 'De ce repeți obiectul de adus, nu doar numele? O frază cu «pentru că», minim 8 cuvinte.', 'Îl repeți pentru că anunțul trebuie să spună ce aduci, nu doar cine vine.', 'Ce ține anunțul.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce e util un anunț scurt și clar? O frază cu «pentru că», minim 8 cuvinte.', 'E util pentru că toți înțeleg ora, locul și ce au de adus.', 'Claritatea ține mesajul.', ['pentru'], 8),
    row('argument', 'De ce un anunț fără oră nu se poate folosi? O frază cu «pentru că», minim 8 cuvinte.', 'Nu se poate folosi pentru că nimeni nu știe când să vină.', 'Când lipsește.', ['pentru'], 8),
    row('argument', 'De ce nu pui două întâlniri în același anunț scurt? O frază cu «pentru că», minim 8 cuvinte.', 'Nu le pui pentru că mesajul se amestecă și nu se mai știe ora.', 'Un mesaj, o întâlnire.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Tema: să asculți până la capăt înainte să răspunzi. O frază cu «pentru că», minim 8 cuvinte.', 'Asculți până la capăt pentru că altfel răspunzi la o întrebare care nu a fost pusă.', 'Întâi înțelegi, apoi vorbești.', ['pentru'], 8),
    row('argument', 'Tema: de ce ceri să se repete un anunț dacă ai pierdut ora. O frază cu «pentru că», minim 8 cuvinte.', 'Ceri repetarea pentru că fără oră nu știi când să ajungi.', 'Ora ține anunțul.', ['pentru'], 8),
    row('mesaj', 'Spune ce lipsește din «Vino la bibliotecă și adu caietul.» Minim 6 cuvinte, cu «ora» sau «când».', 'Lipsește ora, adică când trebuie să ajungi la bibliotecă.', 'Când lipsește.', ['ora'], 6)
  ], lv),
  (r, lv) => choice(r, [
    row('mesaj', 'Două lucruri, minim 12 cuvinte. (1) Fă un anunț cu ora 10, biblioteca și atlasul. (2) Spune ce lipsește din «Vino la bibliotecă», cu «ora».', 'Mâine la ora 10, la bibliotecă, adu atlasul. Din anunțul scurt lipsește ora, adică când să vii.', 'Anunț întreg și ce lipsește.', ['ora', 'atlas'], 12),
    row('mesaj', 'Două lucruri, minim 12 cuvinte. (1) Fă un anunț cu ora 9, sala de clasă și romanul. (2) Spune de ce nu întrerupi un coleg, cu «pentru că».', 'Vineri la ora 9, în sala de clasă, adu romanul. Nu întrerupi pentru că încă nu ai auzit ideea.', 'Anunț și ascultare.', ['ora', 'pentru', 'roman'], 12),
    row('mesaj', 'Două lucruri, minim 12 cuvinte. (1) Fă un anunț cu ora 8, curtea școlii și caietul. (2) Spune ce lipsește dacă nu zici locul, cu «unde».', 'Mâine la ora 8, în curtea școlii, adu caietul. Fără loc nu se știe unde să vii.', 'Anunț și locul.', ['ora', 'unde', 'caiet'], 12)
  ], lv)
];

TESTS.inter5 = [
  (r, lv) => word('identitate', 'O poveste de-acasă e a noastră sau a nimănui? Un cuvânt: noastră.', ['noastră', 'noastra', 'a noastră'], 'E a noastră.', lv, { tokens: ['noastr'] }),
  (r, lv) => line('identitate', 'Spune în 6–10 cuvinte de ce o poveste a locului tău merită spusă. Folosește «acasă».', 'O poveste de acasă merită spusă pentru că e a noastră.', 'Un exemplu, nu o etichetă.', lv, ['acasa'], 6),
  (r, lv) => line('identitate', 'Ce înseamnă «ai noștri» într-o poveste a locului? Minim 6 cuvinte, cu «noi».', 'Ai noștri suntem noi, oamenii locului din poveste.', 'Oameni, nu o hartă goală.', lv, ['noi'], 6),
  (r, lv) => choice(r, [
    row('identitate', 'Dă un exemplu de obicei de-acasă. Minim 8 cuvinte, cu «pentru că».', 'La noi se spune o poveste seara pentru că așa rămâne amintirea vie.', 'Exemplu și motiv.', ['pentru', 'acasa'], 8),
    row('identitate', 'Dă un exemplu de obicei de la masă, de-acasă. Minim 8 cuvinte, cu «pentru că».', 'La noi se spune poftă bună pentru că masa e a casei, nu a unuia singur.', 'Exemplu și motiv.', ['pentru', 'acasa'], 8),
    row('identitate', 'Dă un exemplu de sărbătoare de-acasă. Minim 8 cuvinte, cu «pentru că».', 'Acasă aprindem o lumânare de sărbătoare pentru că așa ținem amintirea bunicii.', 'Exemplu și motiv.', ['pentru', 'acasa'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('identitate', 'Compară obiceiul tău cu al unui coleg. Minim 8 cuvinte, cu «și» și «pentru că».', 'Eu povestesc acasă și colegul cântă, pentru că fiecare loc are obiceiul lui.', 'Compari, nu pui notă.', ['pentru'], 8),
    row('identitate', 'Compară o masă de la tine cu una de la un coleg. Minim 8 cuvinte, cu «pentru că».', 'La noi se stă împreună și la coleg se mănâncă pe rând, pentru că fiecare casă are ritmul ei.', 'Compari, nu pui notă.', ['pentru'], 8),
    row('identitate', 'Compară două feluri de a spune seară bună. Minim 8 cuvinte, cu «pentru că».', 'Eu spun noapte bună și bunica spune somn ușor, pentru că vorbele casei diferă.', 'Compari, nu pui notă.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce nu râzi de un obicei pe care nu-l cunoști? O frază cu «pentru că», minim 8 cuvinte.', 'Nu râzi pentru că obiceiul e al unor oameni, nu o glumă goală.', 'Respectul e parte din poveste.', ['pentru'], 8),
    row('argument', 'De ce întrebi înainte să judeci un obicei de-acasă? O frază cu «pentru că», minim 8 cuvinte.', 'Întrebi pentru că nu știi încă de ce oamenii țin obiceiul acela.', 'Întâi înțelegi.', ['pentru'], 8),
    row('argument', 'De ce o poveste a locului nu e „mai bună” decât alta? O frază cu «pentru că», minim 8 cuvinte.', 'Nu e mai bună pentru că fiecare poveste ține de oamenii ei, nu de un clasament.', 'Fără rang.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Tema: o întâmplare de-acasă spusă colegilor. O frază cu «pentru că», minim 8 cuvinte.', 'O spun pentru că și colegii pot recunoaște ceva din viața lor.', 'Povestea leagă.', ['pentru'], 8),
    row('argument', 'Tema: de ce păstrezi o vorbă a bunicilor. O frază cu «pentru că», minim 8 cuvinte.', 'O păstrezi pentru că în ea stă un obicei al casei, nu doar un cuvânt vechi.', 'Vorba ține casa.', ['pentru'], 8),
    row('identitate', 'Spune un obicei și cui aparține. Minim 8 cuvinte, cu «acasă» și «pentru că».', 'Obiceiul de seară e de acasă pentru că acolo l-am auzit prima dată.', 'Loc și motiv.', ['acasa', 'pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('identitate', 'Două lucruri, minim 12 cuvinte. (1) Ce rămâne dintr-o poveste de-acasă după ce o spui? Cu «după». (2) De ce nu schimbi finalul ca să pară mai tare? Cu «pentru că».', 'După ce o spui rămâne amintirea comună, și nu schimbi finalul pentru că povestea e a oamenilor.', 'Ce rămâne și de ce nu o schimbi.', ['dupa', 'pentru'], 12),
    row('identitate', 'Două lucruri, minim 12 cuvinte. (1) Numește un obicei de-acasă, cu «acasă». (2) Spune ce rămâne după ce îl povestești, cu «după».', 'Obiceiul de seară e de acasă, iar după ce îl povestești rămâne amintirea comună a casei.', 'Obicei și ce rămâne.', ['acasa', 'dupa'], 12),
    row('identitate', 'Două lucruri, minim 12 cuvinte. (1) Numește două lucruri care fac o poveste de-acasă. (2) De ce nu e „mai bună” decât alta? Cu «pentru că».', 'O fac oamenii casei și un obicei recunoscut, și nu e mai bună pentru că fiecare poveste ține de oamenii ei.', 'Semne și fără rang.', ['obicei', 'pentru'], 12)
  ], lv)
];

TESTS.limba6 = [
  (_r, lv) => word('timp', '«A plecat» este la timpul trecut sau prezent? Un cuvânt.', ['trecut'], 'A + participiu = trecut.', lv, { tokens: ['trecut'] }),
  (_r, lv) => word('acord', 'Scrie perfectul compus, plural, al lui «a pleca»: două cuvinte.', ['au plecat'], 'Ei au plecat.', lv, { tokens: ['au plecat'] }),
  (_r, lv) => word('substantiv', 'În «cartea stă pe masă», «cartea» este substantiv sau verb? Un cuvânt.', ['substantiv'], 'Numește lucrul.', lv, { tokens: ['substantiv'] }),
  (r, lv) => choice(r, [
    wordRow('timp', 'În «Atlasul stă pe masă, iar lumina e slabă.», «stă» este la prezent sau la trecut? Un cuvânt.', ['prezent'], 'Stă = acum.', ['prezent']),
    wordRow('timp', 'În «Ieri copiii au citit poezia în clasă.», «au citit» este la trecut sau la prezent? Un cuvânt.', ['trecut'], 'Au + participiu = trecut.', ['trecut']),
    wordRow('timp', 'În «Mâine voi duce caietul la bibliotecă.», «voi duce» este la viitor sau la prezent? Un cuvânt.', ['viitor'], 'Voi + verb = viitor.', ['viitor'])
  ], lv),
  (r, lv) => choice(r, [
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Copiii a mers ieri la parc.»', 'Copiii au mers ieri la parc după ore.', 'Plural: au mers.', ['au mers'], 6),
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Fetele a plecat de la muzeu.»', 'Fetele au plecat de la muzeu după ora de română.', 'Plural: au plecat.', ['au plecat'], 6),
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Băieții a scris tema aseară.»', 'Băieții au scris tema aseară la bibliotecă.', 'Plural: au scris.', ['au scris'], 6)
  ], lv),
  (r, lv) => choice(r, [
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Fetele a citit poezia ieri.»', 'Fetele au citit poezia ieri în clasă.', 'Plural: au citit.', ['au citit'], 6),
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Copiii a văzut filmul sâmbătă.»', 'Copiii au văzut filmul sâmbătă la școală.', 'Plural: au văzut.', ['au vazut'], 6),
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Ei a dus atlasul înapoi.»', 'Ei au dus atlasul înapoi la bibliotecă.', 'Plural: au dus.', ['au dus'], 6)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce verifici acordul predicatului cu subiectul? O frază cu «pentru că», minim 8 cuvinte.', 'Verifici acordul pentru că subiectul la plural cere predicat la plural.', 'Altfel propoziția nu stă.', ['pentru', 'plural'], 8),
    row('argument', 'De ce «copiii a mers» nu e corect? O frază cu «pentru că», minim 8 cuvinte.', 'Nu e corect pentru că subiectul e la plural și predicatul a rămas la singular.', 'Plural cu plural.', ['pentru', 'plural'], 8),
    row('argument', 'De ce schimbi «a citit» în «au citit» când subiectul e «fetele»? O frază cu «pentru că», minim 8 cuvinte.', 'Schimbi pentru că fetele e plural și perfectul compus cere au, nu a.', 'Au, nu a.', ['pentru', 'plural'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('acord', 'Două lucruri, minim 12 cuvinte. (1) Rescrie corect: «Fetele a citit poezia ieri.» (2) În «Azi citesc, ieri am citit, mâine voi citi» care formă e la viitor? Spune și de ce, cu «pentru că».', 'Fetele au citit poezia ieri în clasă, iar la viitor e voi citi pentru că voi arată o acțiune care urmează.', 'Acord și timp, amândouă.', ['au citit', 'voi citi', 'pentru'], 12),
    row('acord', 'Două lucruri, minim 12 cuvinte. (1) Rescrie corect: «Copiii a mers ieri la parc.» (2) În «Azi merg, ieri am mers, mâine voi merge» care formă e la trecut? Spune și de ce, cu «pentru că».', 'Copiii au mers ieri la parc după ore, iar la trecut e am mers pentru că am arată o acțiune încheiată.', 'Acord și timp, amândouă.', ['au mers', 'am mers', 'pentru'], 12),
    row('acord', 'Două lucruri, minim 12 cuvinte. (1) Rescrie corect: «Ei a uitat cartea.» (2) De ce «au uitat» și nu «a uitat» când subiectul e «ei»? Cu «pentru că».', 'Ei au uitat cartea în clasă, pentru că subiectul ei e la plural și cere au, nu a.', 'Forma corectă și motivul.', ['au uitat', 'pentru', 'plural'], 12)
  ], lv)
];

TESTS.lectura6 = [
  (r, lv) => {
    const row = room(r);
    return word('descriere', `Text: ${row.text} Textul descrie un loc sau povestește o călătorie? Un cuvânt: descriere.`, ['descriere'], 'Detalii de loc, nu un drum lung.', lv, { tokens: ['descriere'] });
  },
  (r, lv) => {
    const row = room(r);
    return word('timp', `Text: ${row.text} «Stă» este la prezent sau la trecut? Un cuvânt.`, ['prezent'], 'Acțiunea e acum.', lv, { tokens: ['prezent'] });
  },
  (r, lv) => {
    const row = room(r);
    return word('detaliu', `Text: ${row.text} Ce cuvânt arată lumina? Un cuvânt din text.`, ['slabă', 'slaba'], 'Lumina e slabă.', lv, { tokens: ['slab'] });
  },
  (r, lv) => {
    const row = room(r);
    return line('descriere', `Text: ${row.text} În 6–10 cuvinte, numește două detalii ale locului.`, `Lumina e slabă și băncile sunt reci în ${row.place}.`, 'Două detalii, nu povestea.', lv, ['slab', 'reci'], 6);
  },
  (r, lv) => {
    const row = room(r);
    return line('descriere', `Text: ${row.text} În 8–12 cuvinte, descrie locul ca pentru cineva care nu l-a văzut.`, `${row.place} are lumină slabă, bănci reci și un atlas vechi pe masă.`, 'Detalii, nu o etichetă.', lv, ['reci'], 8);
  },
  (r, lv) => {
    const row = room(r);
    return line('personaj', `Text: ${row.text} ${row.name} ar rămâne acolo? O frază cu «pentru că», minim 8 cuvinte.`, `${row.name} ar pleca pentru că lumina e slabă și băncile sunt reci.`, 'Părere legată de text.', lv, ['pentru'], 8);
  },
  (r, lv) => choice(r, [
    row('argument', 'De ce o descriere are nevoie de detalii, nu doar de «frumos»? O frază cu «pentru că», minim 8 cuvinte.', 'Are nevoie de detalii pentru că altfel cititorul nu vede locul.', 'Detaliul ține descrierea.', ['pentru', 'detali'], 8),
    row('argument', 'De ce «lumină slabă» spune mai mult decât «e urât»? O frază cu «pentru că», minim 8 cuvinte.', 'Spune mai mult pentru că detaliul arată locul, nu doar o părere goală.', 'Detaliul se vede.', ['pentru', 'detali'], 8),
    row('argument', 'De ce două detalii sunt mai bune decât un singur adjectiv? O frază cu «pentru că», minim 8 cuvinte.', 'Sunt mai bune pentru că cititorul vede și lumina, și băncile, nu doar un cuvânt.', 'Două detalii țin descrierea.', ['pentru'], 8)
  ], lv),
  (r, lv) => {
    const row = room(r);
    return line('descriere', `Text: ${row.text} Două lucruri, minim 12 cuvinte. (1) Numește două detalii ale locului. (2) Alege unul și spune ce stare dă, cu «pentru că».`, `Lumina e slabă și băncile sunt reci, iar băncile reci dau o stare rece pentru că locul nu pare primitor.`, 'Detalii și stare.', lv, ['slab', 'pentru', 'reci'], 12);
  }
];

TESTS.inter6 = [
  (_r, lv) => line('lume', 'Româna e vorbită doar în România? Scrie nu și motivul, minim 6 cuvinte.', 'Nu, româna e vorbită și în alte țări din jur.', 'Vorbitori și dincolo de graniță.', lv, ['nu', 'alte'], 6),
  (_r, lv) => line('lume', 'Spune un motiv pentru care merită să știi asta. Minim 6 cuvinte, cu «vorbitori».', 'Pentru că există vorbitori de română și în alte locuri.', 'Limba e a oamenilor.', lv, ['vorbitori'], 6),
  (_r, lv) => line('lume', 'Ce înseamnă să întâlnești limba «și acolo»? Minim 6 cuvinte.', 'Înseamnă că și acolo sunt oameni care o vorbesc zilnic.', 'Nu e doar o hartă.', lv, ['acolo'], 6),
  (r, lv) => choice(r, [
    row('lume', 'De ce nu e destul să spui «e limba noastră» și atât? Minim 8 cuvinte, cu «pentru că».', 'Nu e destul pentru că limba trăiește și la alți vorbitori, nu doar la noi.', 'Oameni, nu proprietate.', ['pentru', 'vorbitor'], 8),
    row('lume', 'De ce «doar la noi» e o propoziție prea scurtă? Minim 8 cuvinte, cu «pentru că».', 'E prea scurtă pentru că există vorbitori și dincolo de graniță.', 'Limba nu se oprește la hartă.', ['pentru', 'vorbitor'], 8),
    row('lume', 'De ce merită să știi că româna se aude și în alte locuri? Minim 8 cuvinte, cu «pentru că».', 'Merită pentru că vorbitorii nu stau toți în același oraș.', 'Oameni, nu hartă.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce merită un text scris de un vorbitor din altă țară? O frază cu «pentru că», minim 8 cuvinte.', 'Merită pentru că vezi aceeași limbă în altă viață de zi cu zi.', 'Aceeași limbă, alt loc.', ['pentru'], 8),
    row('argument', 'De ce nu tratezi textul acela ca pe un album exotic? O frază cu «pentru că», minim 8 cuvinte.', 'Nu îl tratezi așa pentru că e o viață spusă în limba ta, nu o curiozitate.', 'Text, nu vitrină.', ['pentru'], 8),
    row('argument', 'De ce cauți în text oameni, nu doar numele țării? O frază cu «pentru că», minim 8 cuvinte.', 'Cauți oameni pentru că limba e a lor, nu a unei hărți colorate.', 'Oameni, nu hartă.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Compară două feluri de a vorbi româna. Minim 8 cuvinte, cu «alții».', 'Unii o vorbesc acasă, alții o învață la școală, în alt oraș.', 'Compari, nu pui rang.', ['altii'], 8),
    row('argument', 'Compară româna de la tine cu româna dintr-o scrisoare de departe. Minim 8 cuvinte, cu «alții».', 'Tu o vorbești la masă, alții o scriu în scrisori, și limba rămâne a voastră.', 'Compari, nu pui rang.', ['altii'], 8),
    row('argument', 'Compară «acasă» și «la școală» ca locuri ale limbii. Minim 8 cuvinte, cu «alții».', 'Acasă o auzi de la ai tăi, alții o învață la școală, în alt oraș.', 'Două locuri, fără rang.', ['altii'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Tema: limba ca punte. O frază cu «pentru că», minim 8 cuvinte.', 'Limba e o punte pentru că oamenii se înțeleg chiar dacă nu stau în același loc.', 'Punte, nu zid.', ['pentru'], 8),
    row('argument', 'Tema: de ce o punte nu e un zid. O frază cu «pentru că», minim 8 cuvinte.', 'Nu e un zid pentru că pe punte treci, nu te închizi față de alți vorbitori.', 'Punte, nu zid.', ['pentru'], 8),
    row('argument', 'Tema: aceeași limbă, alt oraș. O frază cu «pentru că», minim 8 cuvinte.', 'Merită citită pentru că auzi limba ta în viața altor oameni.', 'Aceeași limbă.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('lume', 'Două lucruri, minim 12 cuvinte. (1) Spune un loc, în afară de orașul tău, unde se aude româna, cu «vorbitori». (2) Ce rămâne după un astfel de text? Cu «după».', 'Se aude și în alte locuri, pentru că există vorbitori dincolo de orașul tău, iar după text rămâne o viață recunoscută.', 'Loc și ce rămâne.', ['vorbitori', 'dupa'], 12),
    row('argument', 'Două lucruri, minim 12 cuvinte. (1) De ce nu pui note țărilor după cum vorbesc româna? Cu «pentru că». (2) Ce rămâne după text? Cu «după».', 'Nu pui note pentru că limba nu e un concurs, iar după text rămâne o viață recunoscută, nu doar țara.', 'Fără rang și ce rămâne.', ['pentru', 'dupa'], 12),
    row('lume', 'Două lucruri, minim 12 cuvinte. (1) De ce «doar la noi» e prea scurt? Cu «pentru că». (2) Ce iei cu tine după un text scris departe? Cu «după».', 'E prea scurt pentru că există vorbitori și dincolo de graniță, iar după text iei o viață recunoscută.', 'Motiv și ce rămâne.', ['pentru', 'dupa'], 12)
  ], lv)
];

TESTS.limba7 = [
  (_r, lv) => word('conjunctiv', '«Să vină» este la modul indicativ sau conjunctiv? Un cuvânt.', ['conjunctiv'], 'Să + verb = conjunctiv.', lv, { tokens: ['conjunctiv'] }),
  (_r, lv) => word('atributiva', 'În «cartea pe care o citesc», «pe care» introduce o atributivă sau o cauzală? Un cuvânt.', ['atributivă', 'atributiva'], 'Spune ceva despre carte.', lv, { tokens: ['atributiv'] }),
  (_r, lv) => word('conditionala', '«Dacă plouă, rămânem.» Propoziția cu «dacă» este condițională sau cauzală? Un cuvânt.', ['condițională', 'conditionala', 'condițională'], 'Dacă = condiție.', lv, { tokens: ['conditi'] }),
  (r, lv) => choice(r, [
    wordRow('cauzala', '«Am plecat, fiindcă ploua.» Propoziția cu «fiindcă» este cauzală sau temporală? Un cuvânt.', ['cauzală', 'cauzala'], 'Fiindcă dă motivul.', ['cauzal']),
    wordRow('timp', '«Când sună clopoțelul, ieșim.» Propoziția cu «când» este de timp sau de cauză? Un cuvânt.', ['timp'], 'Când = momentul.', ['timp']),
    wordRow('finala', '«Învață ca să înțeleagă.» Propoziția cu «ca să» este finală sau cauzală? Un cuvânt.', ['finală', 'finala'], 'Ca să = scopul.', ['final'])
  ], lv),
  (r, lv) => choice(r, [
    row('cauzala', 'De ce «fiindcă ploua» este cauză, nu timp? Minim 8 cuvinte, cu «pentru că».', 'Este cauză pentru că spune motivul plecării, nu ora la care a plouat.', 'Cauza răspunde la de ce.', ['pentru', 'motiv'], 8),
    row('timp', 'De ce «când sună» este timp, nu cauză? Minim 8 cuvinte, cu «pentru că».', 'Este timp pentru că arată momentul ieșirii, nu motivul ei.', 'Când = momentul.', ['pentru', 'moment'], 8),
    row('finala', 'De ce «ca să înțeleagă» este scop, nu cauză? Minim 8 cuvinte, cu «pentru că».', 'Este scop pentru că arată de ce învață, ținta, nu ce s-a întâmplat deja.', 'Ca să = scopul.', ['pentru', 'scop'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('atributiva', 'Ce rol are «pe care o citesc» lângă «cartea»? Minim 6 cuvinte.', 'Spune despre care carte este vorba, deci o lămurește.', 'Atributiva lămurește un substantiv.', ['carte'], 6),
    row('atributiva', 'Ce rol are «care întârzie» lângă «trenul»? Minim 6 cuvinte.', 'Spune despre care tren este vorba, deci îl lămurește.', 'Atributiva lămurește un substantiv.', ['tren'], 6),
    row('atributiva', 'Ce rol are «pe care o cauți» lângă «harta»? Minim 6 cuvinte.', 'Spune despre care hartă este vorba, deci o lămurește.', 'Atributiva lămurește un substantiv.', ['harta'], 6)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce deosebești cauzala de temporală? O frază cu «pentru că», minim 8 cuvinte.', 'Le deosebești pentru că una dă motivul, iar cealaltă dă momentul.', 'De ce nu e același lucru cu când.', ['pentru', 'motiv'], 8),
    row('argument', 'De ce «fiindcă» nu se înlocuiește orbește cu «când»? O frază cu «pentru că», minim 8 cuvinte.', 'Nu se înlocuiește pentru că fiindcă dă motivul, iar când dă momentul.', 'Două întrebări diferite.', ['pentru', 'motiv'], 8),
    row('argument', 'De ce la analiză spui și felul subordonatei? O frază cu «pentru că», minim 8 cuvinte.', 'Spui felul pentru că altfel nu se vede dacă e cauză, timp sau scop.', 'Felul e partea de programme.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('finala', 'Două lucruri, minim 12 cuvinte. (1) În «Plec ca să prind trenul care întârzie» ce fel are «ca să»? Cu «finală». (2) Ce fel are «care întârzie» și pe cine lămurește? Cu «atributivă».', '«Ca să» este finală pentru că arată scopul plecării, iar «care întârzie» este atributivă pentru că lămurește trenul.', 'Două subordonate, două feluri.', ['finala', 'atributiv', 'scop'], 12),
    row('cauzala', 'Două lucruri, minim 12 cuvinte. (1) În «Rămân, fiindcă plouă când sună» ce fel este «fiindcă plouă»? Cu «cauzală». (2) Ce fel este «când sună»? Cu «timp».', '«Fiindcă plouă» este cauzală pentru că dă motivul, iar «când sună» este de timp pentru că dă momentul.', 'Cauză și timp, deosebite.', ['cauzala', 'timp', 'motiv'], 12),
    row('atributiva', 'Două lucruri, minim 12 cuvinte. (1) În «Citesc ca să înțeleg cartea pe care o cauți» ce fel are «ca să»? Cu «finală». (2) Ce lămurește «pe care o cauți»? Cu «cartea».', '«Ca să» este finală pentru că arată scopul cititului, iar «pe care o cauți» lămurește cartea, deci e atributivă.', 'Scop și atributivă.', ['finala', 'carte', 'scop'], 12)
  ], lv)
];

TESTS.lectura7 = [
  (_r, lv) => word('liric', 'Text: „Vântul șoptește la geam. Inima îmi e un clopot greu.” E epic, liric sau dramatic? Un cuvânt.', ['liric'], 'Stare, nu șir de fapte.', lv, { tokens: ['liric'] }),
  (_r, lv) => word('metafora', 'În «inima îmi e un clopot», figura este metaforă sau enumerație? Un cuvânt.', ['metaforă', 'metafora'], 'Inima e pusă alături de un clopot, fără „ca”.', lv, { tokens: ['metafor'] }),
  (_r, lv) => word('personificare', '«Vântul șoptește» este personificare sau enumerație? Un cuvânt.', ['personificare'], 'Vântul primește o faptă de om.', lv, { tokens: ['personific'] }),
  (r, lv) => choice(r, [
    row('liric', 'Text: „Vântul șoptește. Inima îmi e un clopot.” E liric. De ce? Minim 6 cuvinte, cu «stare».', 'E liric pentru că arată o stare, nu o întâmplare cu personaje.', 'Genul se vede din ce face textul.', ['liric', 'stare'], 6),
    row('epic', 'Text: „Ion a plecat la gară și a pierdut trenul.” E epic sau liric? Un cuvânt, apoi de ce, minim 6 cuvinte.', 'epic pentru că se întâmplă o faptă, nu doar o stare.', 'Epicul povestește.', ['epic'], 6),
    row('liric', 'Text: „Noaptea îmi stă pe umăr ca o haină udă.” De ce e liric? Minim 6 cuvinte, cu «stare».', 'E liric pentru că arată o stare, nu un șir de fapte.', 'Stare, nu narațiune.', ['stare'], 6)
  ], lv),
  (r, lv) => choice(r, [
    row('figura', 'Ce figură este «inima îmi e un clopot»? Un cuvânt, apoi de ce, minim 6 cuvinte.', 'metaforă pentru că inima e numită clopot, fără comparație cu ca', 'Metafora identifică, nu compară cu „ca”.', ['metafor'], 6),
    row('figura', 'Ce figură este «noaptea, haină udă pe umăr»? Un cuvânt, apoi de ce, minim 6 cuvinte.', 'metaforă pentru că noaptea e numită haină, fără cuvântul ca', 'Metafora identifică.', ['metafor'], 6),
    row('figura', 'Ce figură este «vântul șoptește la geam»? Un cuvânt, apoi de ce, minim 6 cuvinte.', 'personificare pentru că vântul face o faptă de om', 'Un lucru primește o acțiune omenească.', ['personific'], 6)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce merită două puncte de vedere pe același text liric? O frază cu «pentru că», minim 8 cuvinte.', 'Merită pentru că aceeași stare poate fi citită diferit de doi cititori.', 'Compari lecturi.', ['pentru'], 8),
    row('argument', 'De ce nu e destul să scrii doar «e metaforă»? O frază cu «pentru că», minim 8 cuvinte.', 'Nu e destul pentru că trebuie să arăți ce se identifică în vers.', 'Figura se arată.', ['pentru'], 8),
    row('argument', 'De ce compari o metaforă cu o personificare pe același text? O frază cu «pentru că», minim 8 cuvinte.', 'Le compari pentru că fiecare figură face altceva în același text.', 'Nu sunt aceeași unealtă.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', '«Vântul șoptește» dă textului o voce. Explică în minim 8 cuvinte, cu «pentru că».', 'Personificarea ține pentru că vântul face o acțiune pe care o face un om.', 'Figura se arată.', ['pentru', 'vant'], 8),
    row('argument', '«Inima îmi e un clopot» nu e o comparație cu «ca». Explică în minim 8 cuvinte, cu «pentru că».', 'Este metaforă pentru că inima e pusă direct în locul clopotului.', 'Fără „ca”.', ['pentru', 'metafor'], 8),
    row('argument', '«Noaptea stă pe umăr» nu e o descriere de vreme. Explică în minim 8 cuvinte, cu «pentru că».', 'Este figurat pentru că noaptea nu stă, ca un om, pe umărul cuiva.', 'Sens figurat.', ['pentru', 'figurat'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('liric', 'Două lucruri, minim 12 cuvinte. (1) Deosebește liricul de epic, cu «stare» și «faptă». (2) În «inima îmi e un clopot» de ce nu scrii «comparație»? Cu «pentru că» și «metaforă».', 'Liricul arată o stare, iar epicul spune o faptă, și nu scrii comparație pentru că lipsește «ca» și apare o metaforă.', 'Gen și figură.', ['stare', 'fapta', 'metafor'], 12),
    row('figura', 'Două lucruri, minim 12 cuvinte. (1) Ce figură este «vântul șoptește»? Cu «personificare». (2) Ce figură este «ești un leu»? Cu «metaforă» și «pentru că».', '«Vântul șoptește» este personificare pentru că vântul face o faptă de om, iar «ești un leu» este metaforă pentru că lipsește «ca».', 'Două figuri, deosebite.', ['personific', 'metafor', 'pentru'], 12),
    row('personificare', 'Două lucruri, minim 12 cuvinte. (1) Dă o personificare scurtă, cu «vântul». (2) Spune de ce textul «Inima îmi e un clopot» e liric, cu «stare».', 'Personificare: vântul îmi șoptește la geam, iar textul e liric pentru că arată o stare, nu o faptă cu personaje.', 'Figura ta și genul.', ['vant', 'stare', 'liric'], 12)
  ], lv)
];

TESTS.inter7 = [
  (_r, lv) => line('mit', 'Un mit explică o lume. De ce nu e o minciună de copii? Minim 6 cuvinte, cu «pentru că».', 'Nu e o minciună pentru că pune o întrebare despre lume.', 'Model, nu glumă.', lv, ['pentru'], 6),
  (_r, lv) => line('mit', 'Ce fel de întrebare pune un mit despre noapte sau soare? O frază cu «de ce», minim 6 cuvinte.', 'Întreabă de ce e noaptea noapte sau de ce răsare soarele.', 'Întrebarea lumii.', lv, ['de ce'], 6),
  (_r, lv) => line('mit', 'De ce compari un mit de-al nostru cu unul din altă cultură? Minim 8 cuvinte, cu «aceleași» sau «pentru că».', 'Compari pentru că aceleași întrebări apar și la alții, cu alte nume.', 'Curiozitate, nu clasament.', lv, ['pentru'], 8),
  (r, lv) => choice(r, [
    row('mit', 'Ce rămâne la fel când două mituri explică soarele? Minim 8 cuvinte.', 'Rămâne aceeași întrebare despre soare, chiar dacă numele zeilor diferă.', 'Întrebarea, nu podoaba.', ['aceeasi'], 8),
    row('mit', 'Ce rămâne la fel când două mituri explică noaptea? Minim 8 cuvinte.', 'Rămâne aceeași întrebare despre noapte, chiar dacă poveștile au alte nume.', 'Întrebarea, nu podoaba.', ['aceeasi'], 8),
    row('mit', 'Ce rămâne la fel când două mituri explică ploaia? Minim 8 cuvinte.', 'Rămâne aceeași mirare, chiar dacă zeii și numele diferă.', 'Mirarea, nu podoaba.', ['aceeasi'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce nu spui că mitul nostru e „mai bun”? O frază cu «pentru că», minim 8 cuvinte.', 'Nu spui asta pentru că comparația caută asemănări, nu un câștigător.', 'Fără rang.', ['pentru'], 8),
    row('argument', 'De ce nu pui un mit străin „mai jos”? O frază cu «pentru că», minim 8 cuvinte.', 'Nu îl pui mai jos pentru că și el întreabă de unde vine lumea.', 'Fără rang.', ['pentru'], 8),
    row('argument', 'De ce comparația nu e un clasament? O frază cu «pentru că», minim 8 cuvinte.', 'Nu e un clasament pentru că cauți întrebarea comună, nu un premiu.', 'Fără rang.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Tema: o punte între două povești vechi. O frază cu «pentru că», minim 8 cuvinte.', 'Puntea ține pentru că ambele povești întreabă de unde vine lumea.', 'Aceeași întrebare.', ['pentru'], 8),
    row('argument', 'Tema: de ce un mit despre soare merită pus lângă altul. O frază cu «pentru că», minim 8 cuvinte.', 'Merită pentru că ambele întreabă de ce răsare soarele, cu alte nume.', 'Aceeași întrebare.', ['pentru'], 8),
    row('argument', 'Tema: numele zeilor diferă, întrebarea nu. O frază cu «pentru că», minim 8 cuvinte.', 'Numele diferă pentru că fiecare loc și-a spus mirarea cu vorbele lui.', 'Vorbele diferă, mirarea nu.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Ce înveți când un mit străin seamănă cu unul cunoscut? Minim 8 cuvinte, cu «pentru că».', 'Înveți că întrebările sunt comune pentru că oamenii se miră de aceleași lucruri.', 'Mirarea e comună.', ['pentru'], 8),
    row('reflectie', 'Ce rămâne după ce compari două mituri? Minim 8 cuvinte, cu «după».', 'După comparație rămâne întrebarea comună, nu lista de nume.', 'Ce rămâne.', ['dupa'], 8),
    row('mit', 'Spune o întrebare pe care o pune un mit despre lume. Minim 8 cuvinte, cu «de ce».', 'Întreabă de ce e noaptea noapte și de ce se întoarce soarele.', 'Întrebarea lumii.', ['de ce'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('mit', 'Două lucruri, minim 12 cuvinte. (1) Ce întrebare pune un mit despre soare? Cu «de ce». (2) Ce iei cu tine după un mit care nu e de la tine? Cu «după».', 'Întreabă de ce răsare soarele, iar după mit rămâne o întrebare pe care o poți pune și acasă.', 'Întrebarea și ce rămâne.', ['de ce', 'dupa'], 12),
    row('argument', 'Două lucruri, minim 12 cuvinte. (1) De ce nu râzi de un zeu cu alt nume? Cu «pentru că». (2) Deosebește întrebarea mitului de podoaba lui.', 'Nu râzi pentru că numele e al locului, iar întrebarea rămâne chiar dacă podoaba se schimbă.', 'Respect și fond.', ['pentru', 'intreb'], 12),
    row('reflectie', 'Două lucruri, minim 12 cuvinte. (1) De ce compari un mit de-al nostru cu unul din altă cultură? Cu «aceleași». (2) Ce rămâne după comparație? Cu «după».', 'Compari pentru că aceleași întrebări apar și la alții, iar după comparație rămâne mirarea, nu lista de nume.', 'Motiv și ce rămâne.', ['aceleasi', 'dupa'], 12)
  ], lv)
];

TESTS.limba8 = [
  (_r, lv) => word('cauzala', 'În «Plec, pentru că trenul a întârziat.» gruparea cu «pentru că» este cauzală, temporală sau finală? Un cuvânt.', ['cauzală', 'cauzala'], 'Pentru că dă motivul.', lv, { tokens: ['cauzal'] }),
  (_r, lv) => word('timp', 'În «Când sună clopoțelul, ieșim.» propoziția cu «când» este de timp sau de cauză? Un cuvânt.', ['timp'], 'Când = momentul.', lv, { tokens: ['timp'] }),
  (_r, lv) => word('atributiva', 'În «cartea pe care o citesc e nouă», «pe care o citesc» este atributivă sau cauzală? Un cuvânt.', ['atributivă', 'atributiva'], 'Lămurește substantivul.', lv, { tokens: ['atributiv'] }),
  (r, lv) => choice(r, [
    wordRow('derivare', '«Înfrumuseța» vine din «frumos» prin derivare sau prin compunere? Un cuvânt.', ['derivare'], 'Un prefix și un sufix, nu două cuvinte lipite.', ['deriv']),
    wordRow('derivare', '«Neînțeles» vine din «înțeles» prin derivare sau prin compunere? Un cuvânt.', ['derivare'], 'Prefixul ne- nu lipește două cuvinte de sine stătătoare.', ['deriv']),
    wordRow('compunere', '«Binevoitor» e compunere sau derivare? Un cuvânt.', ['compunere'], 'Bine + voitor: două părți care pot sta singure.', ['compun'])
  ], lv),
  (r, lv) => choice(r, [
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Fetele a citit cartea ieri.»', 'Fetele au citit cartea ieri în clasă.', 'Perfect compus, plural: au citit.', ['au citit'], 6),
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Băieții a scris eseul azi.»', 'Băieții au scris eseul azi la școală.', 'Plural: au scris.', ['au scris'], 6),
    row('acord', 'Rescrie corect, minim 6 cuvinte: «Ei a înțeles textul din prima.»', 'Ei au înțeles textul din prima lectură.', 'Plural: au înțeles.', ['au inteles'], 6)
  ], lv),
  (r, lv) => choice(r, [
    row('finala', 'În «Învață ca să înțeleagă.» propoziția cu «ca să» este finală. De ce? Minim 8 cuvinte, cu «scop».', 'Este finală pentru că arată scopul învățării, nu cauza și nu timpul.', 'Ca să = scopul.', ['scop'], 8),
    row('cauzala', 'În «Plec, pentru că trenul a întârziat.» de ce e cauzală, nu finală? Minim 8 cuvinte, cu «motiv».', 'Este cauzală pentru că dă motivul plecării, nu scopul ei.', 'Pentru că = motiv.', ['motiv'], 8),
    row('timp', 'În «Când sună, ieșim ca să prindem pauza.» ce fel este «când sună»? Minim 8 cuvinte, cu «timp».', 'Este de timp pentru că arată momentul ieșirii, nu scopul și nu cauza.', 'Când = momentul.', ['timp'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce la examen deosebești cauzala de finală? O frază cu «pentru că», minim 8 cuvinte.', 'Le deosebești pentru că una arată de ce s-a întâmplat, cealaltă arată scopul.', 'De ce ≠ ca să.', ['pentru', 'scop'], 8),
    row('argument', 'De ce «pentru că» nu e totuna cu «ca să»? O frază cu «pentru că», minim 8 cuvinte.', 'Nu e totuna pentru că pentru că dă motivul, iar ca să dă scopul.', 'Două întrebări.', ['pentru', 'scop'], 8),
    row('argument', 'De ce la subordonată scrii și întrebarea la care răspunde? O frază cu «pentru că», minim 8 cuvinte.', 'O scrii pentru că de ce, când și ca să nu sunt același fel de propoziție.', 'Întrebarea arată felul.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('atributiva', 'Două lucruri, minim 12 cuvinte. (1) În «Citesc ca să înțeleg cartea pe care o caut» ce fel are «ca să»? Cu «finală» și «scop». (2) Ce fel are «pe care o caut»? Cu «atributivă».', '«Ca să» este finală pentru că arată scopul cititului, iar «pe care o caut» este atributivă pentru că lămurește cartea.', 'Finală și atributivă.', ['finala', 'scop', 'atributiv'], 12),
    row('cauzala', 'Două lucruri, minim 12 cuvinte. (1) Analizează «fiindcă» în «Am rămas fiindcă ploua». Cu «cauzală». (2) De ce nu e totuna cu «ca să»? Cu «scop».', 'Este cauzală pentru că dă motivul pentru care am rămas, iar ca să arată scopul, nu motivul.', 'Cauză deosebită de scop.', ['cauzala', 'motiv', 'scop'], 12),
    row('finala', 'Două lucruri, minim 12 cuvinte. (1) «Învață ca să înțeleagă» este finală. De ce? Cu «scop». (2) «Plec, pentru că trenul a întârziat» este cauzală. De ce? Cu «motiv».', 'Prima este finală pentru că arată scopul învățării, iar a doua este cauzală pentru că dă motivul plecării.', 'Scop și motiv, în același răspuns.', ['scop', 'motiv', 'cauzal'], 12)
  ], lv)
];

TESTS.lectura8 = [
  (_r, lv) => word('dovada', 'Ai un text nou în față. Primul pas: citești, sari sau inventezi? Un cuvânt.', ['citești', 'citesti'], 'Întâi textul, apoi părerea.', lv, { tokens: ['cit'] }),
  (_r, lv) => line('dovada', 'De ce nu începi cu o părere învățată acasă? Minim 6 cuvinte, cu «text».', 'Pentru că textul din față trebuie citit înainte de orice părere.', 'Dovada e în text.', lv, ['text'], 6),
  (r, lv) => choice(r, [
    row('tema', 'Text: „Mara ascunde scrisoarea. Nu vrea ca fratele să afle adevărul, deși îi pare rău.” Care e tema? O frază cu «despre», minim 6 cuvinte.', 'Este despre o taină pe care Mara nu îndrăznește să o spună.', 'Tema = despre ce e vorba.', ['despre', 'tain'], 6),
    row('tema', 'Text: „Ion găsește caietul și îl duce la catedră, deși el l-a luat din greșeală.” Care e tema? O frază cu «despre», minim 6 cuvinte.', 'Este despre un băiat care repară o greșeală și duce caietul înapoi.', 'Tema = despre ce e vorba.', ['despre', 'caiet'], 6),
    row('tema', 'Text: „Ana tace când e întrebată de atlas, deși știe pe ce raft stă.” Care e tema? O frază cu «despre», minim 6 cuvinte.', 'Este despre o tăcere pe care Ana o alege, deși știe adevărul.', 'Tema = despre ce e vorba.', ['despre', 'tace'], 6)
  ], lv),
  (r, lv) => choice(r, [
    row('tema', 'Text: „Mara ascunde scrisoarea și îi pare rău.” Ce simte și ce face? Minim 8 cuvinte.', 'Mara ascunde scrisoarea și îi pare rău că nu spune adevărul.', 'Faptă și stare, împreună.', ['scrisoare'], 8),
    row('tema', 'Text: „Ion duce caietul la catedră, cu obrajii roșii.” Ce simte și ce face? Minim 8 cuvinte.', 'Ion duce caietul la catedră și se rușinează că l-a luat din greșeală.', 'Faptă și stare, împreună.', ['caiet'], 8),
    row('tema', 'Text: „Ana tace, dar se uită mereu spre raftul cu atlasul.” Ce simte și ce face? Minim 8 cuvinte.', 'Ana tace și se uită spre raft, pentru că știe unde este atlasul.', 'Faptă și stare, împreună.', ['atlas'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('caracterizare', 'Caracterizeaz-o pe Mara. Text: ascunde scrisoarea și nu spune adevărul. 8–12 cuvinte, cu «pentru că».', 'Mara e tăcută, pentru că ascunde scrisoarea și nu spune adevărul.', 'Trăsătură susținută de faptă.', ['pentru', 'ascunde'], 8),
    row('caracterizare', 'Caracterizează-l pe Ion. Text: duce caietul la catedră, deși l-a luat din greșeală. 8–12 cuvinte, cu «pentru că».', 'Ion e cinstit, pentru că duce caietul la catedră după greșeală.', 'Trăsătură susținută de faptă.', ['pentru', 'caiet'], 8),
    row('caracterizare', 'Caracterizeaz-o pe Ana. Text: tace, deși știe unde este atlasul. 8–12 cuvinte, cu «pentru că».', 'Ana e reținută, pentru că tace deși știe unde este atlasul.', 'Trăsătură susținută de faptă.', ['pentru', 'atlas'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce o caracterizare fără faptă din text nu ține? O frază cu «pentru că», minim 8 cuvinte.', 'Nu ține pentru că trăsătura trebuie arătată pe o faptă din text, nu pe o etichetă.', 'Dovada e fapta.', ['pentru', 'text'], 8),
    row('argument', 'De ce nu e destul să scrii «e bun» despre un personaj? O frază cu «pentru că», minim 8 cuvinte.', 'Nu e destul pentru că textul trebuie să arate fapta, nu doar eticheta.', 'Dovada e fapta.', ['pentru', 'fapta'], 8),
    row('argument', 'De ce legi trăsătura de o faptă din fragment? O frază cu «pentru că», minim 8 cuvinte.', 'O legi pentru că altfel caracterizarea nu are dovadă în text.', 'Dovada e fapta.', ['pentru', 'dovada'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('reflectie', 'Ce rămâne după ce Mara ascunde scrisoarea? Minim 8 cuvinte, cu «după».', 'După ce o ascunde, rămâne părerea de rău și adevărul nespus.', 'Reflecția trece de faptă.', ['dupa'], 8),
    row('reflectie', 'Ce rămâne după ce Ion duce caietul la catedră? Minim 8 cuvinte, cu «după».', 'După ce îl duce, rămâne gestul cinstit și greșeala recunoscută.', 'Reflecția trece de faptă.', ['dupa'], 8),
    row('reflectie', 'Ce rămâne după ce Ana tace despre atlas? Minim 8 cuvinte, cu «după».', 'După tăcere rămâne adevărul nespus și întrebarea colegei.', 'Reflecția trece de faptă.', ['dupa'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('caracterizare', 'Două lucruri, minim 12 cuvinte. (1) Caracterizeaz-o pe Mara: ascunde scrisoarea și nu spune adevărul, cu «pentru că». (2) Ce rămâne după, cu «după».', 'Mara e tăcută pentru că ascunde scrisoarea, iar după faptă rămâne adevărul nespus.', 'Trăsătură și ce rămâne.', ['pentru', 'dupa', 'ascunde'], 12),
    row('caracterizare', 'Două lucruri, minim 12 cuvinte. (1) Caracterizează-l pe Ion: duce caietul la catedră după greșeală, cu «pentru că». (2) Ce rămâne după, cu «după».', 'Ion e cinstit pentru că duce caietul la catedră, iar după gest rămâne greșeala recunoscută.', 'Trăsătură și ce rămâne.', ['pentru', 'dupa', 'caiet'], 12),
    row('caracterizare', 'Două lucruri, minim 12 cuvinte. (1) Caracterizeaz-o pe Ana: tace, deși știe unde este atlasul, cu «pentru că». (2) Ce rămâne după, cu «după».', 'Ana e reținută pentru că tace deși știe unde este atlasul, iar după tăcere rămâne adevărul nespus.', 'Trăsătură și ce rămâne.', ['pentru', 'dupa', 'atlas'], 12),
    row('caracterizare', 'Două lucruri, minim 12 cuvinte. (1) Caracterizează-l pe Radu: găsește scrisoarea și o pune la loc, cu «pentru că». (2) Ce rămâne după, cu «după».', 'Radu e cinstit pentru că pune scrisoarea la loc, iar după gest rămâne adevărul spus.', 'Trăsătură și ce rămâne.', ['pentru', 'dupa', 'scrisoare'], 12),
    row('caracterizare', 'Două lucruri, minim 12 cuvinte. (1) Caracterizeaz-o pe Elena: ascunde caietul colegei, cu «pentru că». (2) Ce rămâne după, cu «după».', 'Elena e reținută pentru că ascunde caietul, iar după faptă rămâne tăcerea ei.', 'Trăsătură și ce rămâne.', ['pentru', 'dupa', 'caiet'], 12),
    row('caracterizare', 'Două lucruri, minim 12 cuvinte. (1) Caracterizează-l pe Vlad: spune adevărul despre atlas, cu «pentru că». (2) Ce rămâne după, cu «după».', 'Vlad e deschis pentru că spune adevărul despre atlas, iar după vorbă rămâne încrederea colegilor.', 'Trăsătură și ce rămâne.', ['pentru', 'dupa', 'atlas'], 12),
    row('caracterizare', 'Două lucruri, minim 12 cuvinte. (1) Caracterizeaz-o pe Ioana: duce romanul înapoi la bibliotecă, cu «pentru că». (2) Ce rămâne după, cu «după».', 'Ioana e corectă pentru că duce romanul înapoi, iar după drum rămâne gestul cinstit.', 'Trăsătură și ce rămâne.', ['pentru', 'dupa', 'roman'], 12)
  ], lv)
];

TESTS.redactare8 = [
  (_r, lv) => line('plan', 'Înainte de compunerea de la examen, ce fixezi întâi: tema sau adjectivele? Un cuvânt, apoi de ce, minim 6 cuvinte.', 'tema, pentru că adjectivele vin abia după ce știi despre ce scrii', 'Întâi firul.', lv, ['tema'], 6),
  (_r, lv) => line('narativ', 'Scrie începutul unei întâmplări, minim 8 cuvinte, cu un personaj și un verb de acțiune.', 'Mara găsește scrisoarea pe bancă și o ascunde în caiet.', 'Se întâmplă ceva.', lv, ['gaseste'], 8),
  (_r, lv) => line('descriere', 'Descrie în 8–12 cuvinte un loc de examen, cu două detalii concrete.', 'Sala e tăcută, băncile sunt reci și lumina cade pe foaie.', 'Detalii, nu „frumos”.', lv, ['reci'], 8),
  (r, lv) => choice(r, [
    row('argument', 'Tema: de ce citești un text de două ori la examen. O frază cu «pentru că», minim 8 cuvinte.', 'Citești de două ori pentru că a doua oară vezi detaliul care ține răspunsul.', 'A doua lectură e lucru.', ['pentru'], 8),
    row('argument', 'Tema: de ce subliniezi o faptă, nu un adjectiv, în compunere. O frază cu «pentru că», minim 8 cuvinte.', 'Sublimezi fapta pentru că din ea se vede personajul, nu dintr-un cuvânt gol.', 'Fapta ține textul.', ['pentru'], 8),
    row('argument', 'Tema: de ce planul stă înaintea adjectivelor. O frază cu «pentru că», minim 8 cuvinte.', 'Stă înainte pentru că întâi știi despre ce scrii, apoi alegi cuvintele.', 'Întâi firul.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Susține o părere despre temele de vacanță. Minim 8 cuvinte, cu «pentru că» și un exemplu.', 'Temele scurte sunt utile pentru că păstrează ritmul, de exemplu zece minute de citit.', 'Părere, motiv, exemplu.', ['pentru', 'exemplu'], 8),
    row('argument', 'Susține o părere despre cititul cu voce tare. Minim 8 cuvinte, cu «pentru că» și un exemplu.', 'Ajută pentru că auzi fraza, de exemplu un alineat citit de două ori.', 'Părere, motiv, exemplu.', ['pentru', 'exemplu'], 8),
    row('argument', 'Susține o părere despre ciorna de la examen. Minim 8 cuvinte, cu «pentru că» și un exemplu.', 'Ciorna merită pentru că fixezi ideea, de exemplu trei cuvinte-cheie înainte de text.', 'Părere, motiv, exemplu.', ['pentru', 'exemplu'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('narativ', 'Continuă cu o faptă, minim 8 cuvinte: „Mara ține scrisoarea în mână.” Trebuie «apoi».', 'Mara ține scrisoarea în mână, apoi o pune la loc și spune adevărul.', 'Firul înaintează.', ['apoi'], 8),
    row('narativ', 'Continuă cu o faptă, minim 8 cuvinte: „Ion găsește caietul sub bancă.” Trebuie «apoi».', 'Ion găsește caietul sub bancă, apoi îl duce la catedră.', 'Firul înaintează.', ['apoi'], 8),
    row('descriere', 'Descrie în 8–12 cuvinte curtea școlii dimineața, cu două detalii. Trebuie «și».', 'Curtea e goală și băncile sunt ude, iar lumina cade pe poartă.', 'Două detalii.', ['ude'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce încheierea unei compuneri nu e un slogan? O frază cu «pentru că», minim 8 cuvinte.', 'Nu e un slogan pentru că încheierea strânge ideea, nu deschide alt subiect.', 'Strânge, nu reia titlul.', ['pentru'], 8),
    row('argument', 'De ce nu termini cu «și așa mai departe»? O frază cu «pentru că», minim 8 cuvinte.', 'Nu termini așa pentru că încheierea trebuie să strângă ideea, nu să o lase în aer.', 'Strânge ideea.', ['pentru'], 8),
    row('argument', 'De ce finalul nu repetă titlul? O frază cu «pentru că», minim 8 cuvinte.', 'Nu îl repetă pentru că finalul arată ce ai înțeles, nu cum se cheamă textul.', 'Înțelegere, nu titlu.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('narativ', 'Două lucruri, minim 12 cuvinte. (1) Scrie o faptă de mijloc despre un caiet pierdut, cu «apoi». (2) De ce încheierea nu e un slogan? Cu «pentru că».', 'Caută caietul în bancă, apoi îl găsește în ghiozdan, și încheierea nu e un slogan pentru că strânge ideea.', 'Faptă și încheiere.', ['apoi', 'pentru', 'caiet'], 12),
    row('descriere', 'Două lucruri, minim 12 cuvinte. (1) Descrie sala de examen cu două detalii, între care «lumină». (2) De ce planul stă înaintea adjectivelor? Cu «pentru că».', 'Sala e tăcută și lumina cade pe foaie, iar planul stă înainte pentru că întâi știi despre ce scrii.', 'Descriere și plan.', ['lumina', 'pentru'], 12),
    row('argument', 'Două lucruri, minim 12 cuvinte. (1) De ce pui un exemplu lângă părere? Cu «pentru că» și «exemplu». (2) Dă exemplul, cu «zece».', 'Pui un exemplu pentru că părerea fără faptă nu se vede, de exemplu zece minute de citit în fiecare zi.', 'Motiv și exemplu.', ['pentru', 'exemplu', 'zece'], 12)
  ], lv)
];

TESTS.oral8 = [
  (_r, lv) => line('argument', 'Într-o dezbatere, ce faci înainte să răspunzi? Minim 6 cuvinte.', 'Asculți ideea până la capăt și abia apoi răspunzi.', 'Întâi înțelegi.', lv, ['asculti'], 6),
  (_r, lv) => line('sursa', 'Cum folosești o sursă fără să o pui în locul părerii tale? Minim 6 cuvinte.', 'Spui pe scurt de unde e ideea și apoi adaugi ce crezi tu.', 'Sursa sprijină, nu înlocuiește.', lv, ['sursa'], 6),
  (_r, lv) => line('contra', 'Colegul spune o idee bună. Cum o continui, fără să o răstorni din prima? Minim 6 cuvinte, cu «adaugi».', 'Are dreptate, adaugi un exemplu al tău și abia apoi un „dar”.', 'Întâi continui, apoi completezi.', lv, ['adaugi'], 6),
  (r, lv) => choice(r, [
    row('argument', 'Deosebește o informație de o părere. Minim 8 cuvinte, cu «pentru că».', 'Informația se verifică, pentru că părerea rămâne a vorbitorului chiar dacă nu e măsurată.', 'Nu sunt același lucru.', ['pentru', 'informat'], 8),
    row('argument', 'Deosebește ora dintr-un anunț de părerea ta despre anunț. Minim 8 cuvinte, cu «pentru că».', 'Ora se verifică, pentru că părerea ta despre anunț nu schimbă ora.', 'Fapt și părere.', ['pentru'], 8),
    row('argument', 'De ce nu pui părerea în locul unei date? O frază cu «pentru că», minim 8 cuvinte.', 'Nu o pui pentru că data se verifică, iar părerea rămâne a ta.', 'Nu se amestecă.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Tema: pauza de sport. O frază cu «pentru că» și un motiv concret, minim 8 cuvinte.', 'Pauza de sport merită pentru că după ea te întorci mai atent la oră.', 'Afirmație și motiv.', ['pentru'], 8),
    row('argument', 'Tema: biblioteca deschisă la prânz. O frază cu «pentru că» și un motiv concret, minim 8 cuvinte.', 'Merită pentru că atunci poți împrumuta o carte fără să pierzi ora.', 'Afirmație și motiv.', ['pentru'], 8),
    row('argument', 'Tema: temele citite cu voce tare. O frază cu «pentru că» și un motiv concret, minim 8 cuvinte.', 'Ajută pentru că auzi unde se încurcă fraza și o poți repara.', 'Afirmație și motiv.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('contra', 'Răspunde la ideea „temele sunt inutile”. Minim 8 cuvinte, cu «pentru că», fără să jignești.', 'Nu sunt inutile pentru că o temă scurtă te ajută să nu uiți ce ai înțeles.', 'Contraargument, nu etichetă.', ['pentru'], 8),
    row('contra', 'Răspunde la ideea „nu are rost să asculți până la capăt”. Minim 8 cuvinte, cu «pentru că».', 'Are rost pentru că altfel răspunzi înainte să auzi ideea.', 'Contraargument.', ['pentru'], 8),
    row('contra', 'Răspunde la ideea „părerea ține loc de dovadă”. Minim 8 cuvinte, cu «pentru că».', 'Nu ține loc pentru că dovada se arată, iar părerea rămâne a ta.', 'Contraargument.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('concluzie', 'Încheie o discuție despre lectură. Minim 8 cuvinte, cu «așadar».', 'Așadar, citim ca să înțelegem textul, nu ca să numărăm paginile.', 'Concluzia strânge.', ['asadar'], 8),
    row('concluzie', 'Încheie o discuție despre pauza de sport. Minim 8 cuvinte, cu «așadar».', 'Așadar, pauza ajută la oră, nu ține locul ei.', 'Concluzia strânge.', ['asadar'], 8),
    row('concluzie', 'Încheie o discuție despre teme. Minim 8 cuvinte, cu «așadar».', 'Așadar, tema scurtă te ajută să ții minte, nu să umpli caietul.', 'Concluzia strânge.', ['asadar'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('sursa', 'Două lucruri, minim 12 cuvinte. (1) Cum spui o idee din manual fără să o pui în locul părerii tale? Cu «apoi». (2) Încheie de ce asculți înainte să răspunzi, cu «așadar».', 'Spui ideea din manual, apoi adaugi ce crezi tu. Așadar, asculți până la capăt și abia apoi răspunzi.', 'Sursă și concluzie.', ['apoi', 'asadar'], 12),
    row('contra', 'Două lucruri, minim 12 cuvinte. (1) Colegul spune „anunțul poate fi și fără oră”. Răspunde, cu «pentru că». (2) Încheie discuția, cu «așadar».', 'Nu poate pentru că fără oră nimeni nu știe când să vină. Așadar, anunțul ține ora, locul și obiectul.', 'Contraargument și concluzie.', ['pentru', 'asadar', 'ora'], 12),
    row('concluzie', 'Două lucruri, minim 12 cuvinte. (1) Deosebește o informație de o părere, cu «pentru că». (2) Încheie, cu «așadar».', 'Informația se verifică, pentru că părerea rămâne a ta chiar dacă nu e măsurată. Așadar, nu le amesteci.', 'Deosebire și concluzie.', ['pentru', 'asadar'], 12)
  ], lv)
];

TESTS.inter8 = [
  (_r, lv) => line('lume-lit', 'Un text din altă țară se citește cu aceleași unelte ca unul românesc? Scrie da și motivul, minim 6 cuvinte.', 'Da, cauți idee, dovadă și ton, ca la orice text.', 'Uneltele nu se schimbă.', lv, ['da', 'idee'], 6),
  (_r, lv) => line('lume-lit', 'De ce merită un text „de aiurea”? Minim 6 cuvinte, cu «aceleași» sau «și noi».', 'Merită pentru că pune aceleași întrebări pe care ni le punem și noi.', 'Nu e album exotic.', lv, ['aceleasi'], 6),
  (_r, lv) => line('noi', 'Cum vorbești despre „ceilalți” fără să-i cobori? Minim 6 cuvinte.', 'Îi descrii cu curiozitate și nu le pui o notă mai mică.', 'Descrii, nu cobori.', lv, ['curios'], 6),
  (r, lv) => choice(r, [
    row('reflectie', 'Ce rămâne după ce citești un text din altă cultură? Minim 8 cuvinte, cu «după».', 'După lectură rămâne o întrebare comună, nu doar numele locului.', 'Reflecție, nu fișă de țară.', ['dupa'], 8),
    row('reflectie', 'Ce rămâne după o poveste tradusă? Minim 8 cuvinte, cu «după».', 'După poveste rămâne o întrebare, nu doar numele țării de pe copertă.', 'Reflecție.', ['dupa'], 8),
    row('reflectie', 'Ce rămâne după ce compari două finaluri din culturi diferite? Minim 8 cuvinte, cu «după».', 'După comparație rămâne întrebarea comună, nu clasamentul.', 'Reflecție.', ['dupa'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'De ce nu schimbi uneltele de lectură când textul e tradus? O frază cu «pentru că», minim 8 cuvinte.', 'Nu le schimbi pentru că tema, dovada și tonul se citesc la fel.', 'Aceleași întrebări.', ['pentru'], 8),
    row('argument', 'De ce cauți și în textul tradus o dovadă? O frază cu «pentru că», minim 8 cuvinte.', 'Cauți dovada pentru că traducerea nu anulează întrebarea despre text.', 'Dovada rămâne.', ['pentru'], 8),
    row('argument', 'De ce tonul se citește și într-o traducere? O frază cu «pentru că», minim 8 cuvinte.', 'Se citește pentru că felul în care se spune ideea rămâne în text.', 'Tonul e unealtă.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('argument', 'Tema: noi și ceilalți, pe un text. O frază cu «pentru că», minim 8 cuvinte.', 'Ne uităm și la alții pentru că așa ne vedem mai limpede propriile întrebări.', 'Oglinda.', ['pentru'], 8),
    row('argument', 'Tema: de ce „ceilalți” nu sunt o notă mai mică. O frază cu «pentru că», minim 8 cuvinte.', 'Nu sunt o notă mai mică pentru că textul lor pune întrebări ca ale noastre.', 'Fără coborâre.', ['pentru'], 8),
    row('argument', 'Tema: curiozitatea în locul etichetei. O frază cu «pentru că», minim 8 cuvinte.', 'Curiozitatea ține pentru că descrii textul, nu pui oamenilor o notă.', 'Descrii, nu cobori.', ['pentru'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('reflectie', 'Încheie: ce iei cu tine dintr-un text străin? Minim 8 cuvinte, cu «după».', 'După text rămâne o idee pe care o poți pune lângă una de-acasă.', 'Ce rămâne.', ['dupa'], 8),
    row('reflectie', 'Încheie: ce nu iei dintr-un text străin. Minim 8 cuvinte, cu «după».', 'După text nu iei o notă pusă oamenilor, ci o întrebare.', 'Fără etichetă.', ['dupa'], 8),
    row('reflectie', 'Încheie cu o idee de pus lângă una de-acasă. Minim 8 cuvinte, cu «după».', 'După lectură pui întrebarea lor lângă o întrebare de-acasă.', 'Alăturare.', ['dupa'], 8)
  ], lv),
  (r, lv) => choice(r, [
    row('lume-lit', 'Două lucruri, minim 12 cuvinte. (1) De ce un text tradus tot cere idee și dovadă? Cu «pentru că». (2) Ce iei după text? Cu «după».', 'Cere pentru că uneltele de lectură nu se schimbă odată cu limba de pe copertă, iar după text iei o întrebare, nu o notă.', 'Unelte și ce rămâne.', ['pentru', 'dupa'], 12),
    row('noi', 'Două lucruri, minim 12 cuvinte. (1) Cum vorbești despre personajele dintr-un text străin? Cu «curiozitate». (2) Ce întrebare iei după text? Cu «după».', 'Vorbești cu curiozitate și nu le pui o notă mai mică, iar după text iei întrebarea despre curaj.', 'Felul și ce iei.', ['curiozitate', 'dupa'], 12),
    row('reflectie', 'Două lucruri, minim 12 cuvinte. (1) De ce nu schimbi uneltele când textul e tradus? Cu «pentru că». (2) Ce pui lângă o idee de-acasă? Cu «după».', 'Nu le schimbi pentru că tema și dovada se citesc la fel, iar după text pui întrebarea lor lângă una de-acasă.', 'Unelte și alăturare.', ['pentru', 'dupa'], 12)
  ], lv)
];

TESTS.oral6 = TESTS.oral;
TESTS.redactare6 = TESTS.redactare;
TESTS.oral7 = TESTS.oral8;
TESTS.redactare7 = TESTS.redactare8;

const CHAPTER_ALIAS = {
  'evaluare-initiala': 'lectura',
  cuvinte: 'limba5',
  cartea: 'redactare',
  povestirea: 'lectura',
  prietenia: 'inter5',
  natura: 'lectura',
  trepte: 'oral',
  eroi: 'lectura',
  'proba-ro': 'lectura8',
  receptare: 'lectura8',
  'limba-en': 'limba8',
  narativ: 'redactare8',
  descriptiv: 'redactare8',
  argumentativ: 'redactare8',
  strategie: 'oral8'
};

function testsFor(chapterId, grade) {
  const cid = CHAPTER_ALIAS[chapterId] || chapterId;
  if (Array.isArray(TESTS[cid])) return TESTS[cid];
  const g = Number(grade) || 5;
  if (g >= 8) return TESTS.lectura8;
  if (g >= 7) return TESTS.lectura7;
  if (g >= 6) return TESTS.lectura6;
  return TESTS.lectura;
}

function generateRomana(chapterId, kind, rand, level, grade) {
  const lv = Math.max(1, Number(level) || 1);
  const g = Number(grade) || 5;
  if (kind === 'test') {
    const list = testsFor(chapterId, g);
    const idx = Math.min(list.length - 1, lv - 1);
    return list[idx](rand, idx + 1);
  }
  const cid = CHAPTER_ALIAS[chapterId] || chapterId;
  const list = FLASHES[cid] || FLASHES.lectura;
  return list[idxSafe(list, lv)](rand);
}

function idxSafe(list, lv) {
  return Math.min(list.length - 1, lv - 1);
}

Object.keys(TESTS).forEach(key => {
  const list = TESTS[key];
  if (!Array.isArray(list) || list.length >= 8) return;
  list.push((rand, lv) => {
    const name = pick(rand, NAMES);
    const tema = pick(rand, ['o carte citită de două ori', 'un personaj care tace', 'o descriere cu două detalii']);
    return line('argument', `${name}, tema: ${tema}. Scrie o părere, minim 8 cuvinte, cu «pentru că».`, `${name} susține tema pentru că aduce o dovadă, nu doar un titlu.`, 'Părere și motiv, pe tema dată.', lv, ['pentru'], 8);
  });
});

module.exports = { generateRomana };
