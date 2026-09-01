// Perechi extra de texte EN (originale). Se lipesc de banca principală
// ca să rămână „Alt model” fără capăt. Nu copiem subiecte publicate.

const { assembleOfficial, legacyToSpec } = require('./enRomanaOfficial');

function packs(helpers) {
  const NOVEL =
    'Poți porni de la o carte citită la gimnaziu. O valoare comună + un fapt din opera ta + un fapt din fragment.';

  function assemble(key, meta, lit, non) {
    return assembleOfficial(helpers, legacyToSpec(meta, lit, non));
  }

  const g = assemble('g', {
    id: 'en-ro-g',
    title: 'Model G — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'Locul principal din textul 1 este…', extra: { choices: ['sera din spatele școlii', 'un peron de gară', 'o sală de lectură', 'un laborator de chimie'] } },
      { n: 2, points: 5, prompt: 'Ce uită Nica în seră, prima dată?', extra: { choices: ['o sticlă cu apă', 'un caiet de mate', 'o geacă', 'un telefon'] } },
      { n: 3, points: 5, prompt: 'Textul 2 este, în principal…', extra: { choices: ['un regulament de voluntariat', 'o povestire cu Nica', 'o recenzie de film', 'un anunț de tren'] } },
      { n: 4, points: 5, prompt: 'Câte ore de voluntariat se cer pe lună, în textul 2?', extra: { choices: ['4', '12', '2', '8'] } },
      { n: 5, points: 5, prompt: 'Cele două texte se leagă prin ideea de…', extra: { choices: ['grijă pentru un loc viu, cu reguli simple', 'o călătorie cu vaporul', 'un concurs de matematică', 'o rețetă de plăcintă'] } },
      { n: 6, points: 5, prompt: 'Transcrie sfatul profesorului despre geamul serei.', extra: { kind: 'short', minWords: 3, lines: 'enunț' } },
      { n: 7, points: 5, prompt: 'Precizează până la ce oră se semnează condica de voluntariat.', extra: { kind: 'short', minWords: 1, lines: 'oră' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, arată de ce o plantă (sau un program de voluntariat) ține doar dacă cineva se întoarce. Folosește un text.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul literar cu o operă despre natură, grijă sau copilărie. 50–80 de cuvinte. ${NOVEL}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'În „Nica deschide geamul” predicatul este…', choices: ['deschide', 'Nica', 'geamul', 'sera'] },
      { n: 2, points: 2, prompt: '„umed” din „pământ umed” e…', choices: ['adjectiv / atribut', 'verb', 'prepoziție', 'conjunctie'] },
      { n: 3, points: 2, prompt: 'Un sinonim pentru „întoarce” (se întoarce la seră) e…', choices: ['revine', 'pleacă', 'uită', 'strigă'] },
      { n: 4, points: 3, prompt: 'Subiectul din „Roșiile nu cer discursuri” este…', choices: ['Roșiile', 'discursuri', 'nu', 'sera'] },
      { n: 5, points: 3, prompt: '„ca o ușă” este…', choices: ['comparație', 'un predicat', 'un articol', 'o interjecție'] },
      { n: 6, points: 3, prompt: '„Nu se culege fără profesor.” predicatul este…', choices: ['nu se culege', 'fără', 'profesor', 'Nu'] },
      { n: 7, points: 2, prompt: 'Cuvântul „voluntariat” se desparte…', choices: ['vo-lun-ta-ri-at', 'vol-unta-riat', 'volu-ntariat', 'vo-luntariat'] },
      { n: 8, points: 3, prompt: '„obligatorii” din „mănușile sunt obligatorii” e…', choices: ['nume predicativ / adjectiv', 'verb', 'prepoziție', 'subiect'] }
    ],
    composition: 'Scrie o compunere de minimum 150 de cuvinte în care să narezi o grijă mică pentru un loc viu (seră, curte, ghiveci). Două momente, o valoare. Fără titlu.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Sera din spatele școlii.', steps: ['Loc'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Sticla cu apă.', steps: ['Detaliu'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Regulament, program, condică.', steps: ['Gen'] },
      'Subiectul I A:4': { letter: 'A', explain: '4 ore pe lună.', steps: ['Cifră'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Loc viu + reguli.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['Nu trânti geamul', 'nu trânti'], tokens: ['tranti', 'trânti', 'geam'], explain: 'Sfatul despre geam.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['14:00', '14', 'ora 14'], tokens: ['14'], explain: 'Condica până la 14:00.', steps: ['Orar'] },
      'Subiectul I A:8': { answers: ['întoarce', 'plantă'], tokens: ['intoar', 'întoar', 'plant', 'sera', 'seră', 'volunt'], explain: 'Motivare.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Dumbrava minunată'], tokens: ['dumbrava', 'creanga', 'natur', 'grij', 'copil'], explain: 'Natură / grijă.', steps: ['Titlu'] },
      'Subiectul I B:1': { letter: 'A', explain: 'deschide.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'Determină pământ.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'revine.', steps: ['Sinonime'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Roșiile.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'ca + ușă.', steps: ['Comparație'] },
      'Subiectul I B:6': { letter: 'A', explain: 'nu se culege.', steps: ['Predicat'] },
      'Subiectul I B:7': { letter: 'A', explain: 'vo-lun-ta-ri-at.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'NP / adjectiv.', steps: ['NP'] },
      'Subiectul II:1': { letter: '', explain: 'Narațiune, grijă pentru un loc viu, 150+, pe caiet, fără text-model.', ideas: ['Loc', 'Două momente', 'O valoare'], steps: ['Plan', '150+'] }
    }
  }, `Textul 1 (literar)

Sera e o cutie de sticlă lipită de zidul din spate, unde vara se adună căldura ca într-un buzunar. Nica deschide ușa cu umărul, pentru că mâinile îi sunt ocupate: o sticlă cu apă, un carnet ud la colțuri, o sfoară. Aerul dinăuntru miroase a pământ ud și a frunze frecate. Geamul din stânga e crăpat de un ger vechi; cineva l-a lipit cu bandă, de două ori, și banda s-a îngălbenit.

„Nu trânti geamul”, a zis profesorul de biologie, o dată, fără să ridice vocea. Nica n-a uitat. Trage încet, până rămâne un deget de aer. Roșiile din ghivece nu cer discursuri. Cer apă, și o zi fără uitare.

Prima oară a uitat sticla. A doua zi, pământul era uscat la suprafață, ca o crustă. Nica a turnat încet, de rușine, deși nu era nimeni. A treia zi a venit o fată de la a șasea, cu un carnet identic. N-au vorbit. Au udat din două părți, ca și cum sera ar fi fost o temă în doi, fără note.

Vineri, un băiat a râs: „Asta e grădina voastră de joacă?” Nica a ridicat din umeri. Nu e joacă. E o listă scurtă: geamul, apa, sfoara care ține o tulpină strâmbă. Sâmbătă, profesorul a trecut și a atins o frunză. „Ține”, a zis. Atât.

Nica a rămas un minut după ce ușa s-a închis. A auzit sticla crăpată când vântul a mișcat-o. Nu e un palat. E un loc care rămâne viu dacă te întorci. Acasă, își spală mâinile până nu mai miros a pământ, dar sub unghii rămâne o linie închisă, ca o dovadă. Lunea, sticla e iarăși acolo. Nimeni n-a pus o firmă. Sera nu are nevoie de firmă. Are nevoie de cineva care nu trântă geamul.

Marți a plouat. Nica a venit totuși. Pământul era deja ud, dar a verificat ghivecele din spate, unde soarele nu ajunge. O tulpină se aplecase. A legat-o cu sfoara, fără să strângă. Fata de la a șasea a venit târziu, cu carnetul ud. Au dat din cap. Atât. În seră, vorbele lungi nu țin loc de apă.

Vineri, profesorul a notat în condică: „ținut”. Nu a pus note. Nica a înțeles: ținut înseamnă că te-ai întors, nu că ai ținut un discurs. Acasă, a scris în jurnal un rând: „Geamul, un deget. Apa, la rădăcină.” Apoi a închis jurnalul. Sera, undeva, își vedea de treaba ei, cu sticla crăpată și cu banda îngălbenită.`, `Textul 2 (nonliterar)

Regulament — Voluntariat la sera școlii
Școala Gimnazială „Zidul verde”

Program: luni, miercuri, vineri, 13:40–14:20. Sâmbăta închis, exceptând ultima sâmbătă din lună (10:00–12:00), când se mută răsadurile.

Reguli:
• mănușile de lucru sunt obligatorii;
• nu se culege fără profesor;
• geamul din stânga se deschide cel mult un deget; nu se trântește;
• apa se toarnă la rădăcină, nu pe frunze la amiază;
• condica se semnează până la 14:00, la ușa serei, nu a doua zi „din memorie”.

Fiecare elev face minimum 4 ore pe lună. Grupele de câte 3. Dacă lipsește un coleg, nu se lucrează singur. Dacă plouă, se lucrează în seră, nu se anulează. Dacă e caniculă (anunț la avizier), udarea se mută la 8:10.

Accident mic (tăietură, țăndără de ghiveci): speli, anunți, completezi fișa de pe ușa dulapului verde.

Înscrieri: până în data de 5 a lunii, la sala de biologie. Locuri: 18.

Cine lipsește de două ori la rând, fără anunț, pierde locul în luna următoare. Uneltele (lopățică, stropitoare) stau pe suportul din dreapta; nu se duc acasă. Resturile de frunze se pun în sacul maro, nu pe alee. Dacă un ghiveci e spart, se anunță, nu se aruncă „după zid”.

În caniculă, programul de dimineață (8:10) înlocuiește ora de după-amiază; se anunță cu o zi înainte la avizier. Părinții nu au acces în seră în timpul orelor. Fotografiile de la voluntariat se fac doar cu profesor, fără chipuri dacă un elev nu e de acord.

Coordonator: prof. Ioana Radu`);

  const h = assemble('h', {
    id: 'en-ro-h',
    title: 'Model H — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'În textul 1, Luca așteaptă…', extra: { choices: ['un autobuz de seară, pe o bancă udă', 'un tren de noapte', 'o oră de sport', 'o seră'] } },
      { n: 2, points: 5, prompt: 'Ce ține Luca în mână?', extra: { choices: ['un bilet mototolit', 'o sticlă de apă pentru seră', 'un ghiveci', 'un regulament'] } },
      { n: 3, points: 5, prompt: 'Textul 2 anunță…', extra: { choices: ['programul navetei școlare', 'un târg de caiete', 'o rețetă', 'un concurs de pescuit'] } },
      { n: 4, points: 5, prompt: 'Ultimul autobuz de vineri pleacă, după anunț, la…', extra: { choices: ['16:10', '8:00', '14:00', '20:00'] } },
      { n: 5, points: 5, prompt: 'Tema comună e…', extra: { choices: ['așteptarea unui drum care trebuie ținut cu reguli', 'o seră de roșii', 'o plăcintă', 'un laborator'] } },
      { n: 6, points: 5, prompt: 'Transcrie ce spune mama, în textul 1, despre alergat.', extra: { kind: 'short', minWords: 3, lines: 'enunț' } },
      { n: 7, points: 5, prompt: 'Precizează ce faci dacă pierzi biletul de navetă (textul 2).', extra: { kind: 'short', minWords: 4, lines: 'o frază' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, explică de ce un orar (sau o bancă de așteptare) poate ține o zi întreagă. Folosește un text.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă despre drum, așteptare sau familie. 50–80 de cuvinte. ${NOVEL}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'Predicatul din „Luca așteaptă autobuzul” este…', choices: ['așteaptă', 'Luca', 'autobuzul', 'banca'] },
      { n: 2, points: 2, prompt: '„mototolit” determină…', choices: ['bilet', 'Luca', 'seara', 'orar'] },
      { n: 3, points: 2, prompt: 'Antonim pentru „întârzie” e…', choices: ['ajunge la timp', 'pleacă mai târziu', 'uită', 'aleargă'] },
      { n: 4, points: 3, prompt: 'Subiectul din „Banca e udă” este…', choices: ['Banca', 'udă', 'e', 'seara'] },
      { n: 5, points: 3, prompt: '„ca o regulă” este…', choices: ['comparație', 'predicat', 'articol', 'interjecție'] },
      { n: 6, points: 3, prompt: '„Nu se rezervă locuri.” predicatul este…', choices: ['nu se rezervă', 'locuri', 'Nu', 'naveta'] },
      { n: 7, points: 2, prompt: '„autobuzul” se desparte…', choices: ['a-u-to-bu-zul', 'auto-buzul', 'au-tobuzul', 'autobu-zul'] },
      { n: 8, points: 3, prompt: '„scurt” din „anunț scurt” e…', choices: ['atribut', 'predicat', 'subiect', 'prepoziție'] }
    ],
    composition: 'Narează, minimum 150 de cuvinte, o așteptare (stație, hol, poartă) în care se întâmplă ceva mic. Persoana I. Fără titlu.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Banca, autobuz de seară.', steps: ['Loc'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Bilet mototolit.', steps: ['Obiect'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Naveta școlară.', steps: ['Gen'] },
      'Subiectul I A:4': { letter: 'A', explain: '16:10 vineri.', steps: ['Orar'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Drum + regulă.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['nu alerga', 'Nu alerga'], tokens: ['alerg'], explain: 'Sfatul mamei.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['anunți profesorul', 'ghișeu', 'nu urci fără'], tokens: ['anunt', 'anunț', 'profesor', 'ghiseu', 'ghișeu'], explain: 'Procedura din anunț.', steps: ['Regulă'] },
      'Subiectul I A:8': { answers: ['așteptare', 'orar'], tokens: ['astept', 'aștept', 'orar', 'autobuz', 'banca'], explain: 'Motivare.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Toate pânzele sus'], tokens: ['pânze', 'panze', 'drum', 'astept', 'familie'], explain: 'Drum / așteptare.', steps: ['Titlu'] },
      'Subiectul I B:1': { letter: 'A', explain: 'așteaptă.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'bilet.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'la timp.', steps: ['Antonim'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Banca.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'comparație.', steps: ['ca'] },
      'Subiectul I B:6': { letter: 'A', explain: 'nu se rezervă.', steps: ['Predicat'] },
      'Subiectul I B:7': { letter: 'A', explain: 'a-u-to-bu-zul.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'atribut.', steps: ['Atribut'] },
      'Subiectul II:1': { letter: '', explain: 'Narațiune, așteptare, 150+, pe caiet.', ideas: ['Loc de așteptare', 'Treaptă mică'], steps: ['Plan', '150+'] }
    }
  }, `Textul 1 (literar)

Banca de la stație e udă, deși ploaia s-a oprit. Luca nu se așază. Stă cu o geantă între picioare și cu un bilet mototolit în pumn, ca pe o monedă care s-ar putea pierde. Farurile de pe șosea trec și nu sunt ale lui. Un câine trece prin iarbă, fără stăpân vizibil, și se oprește la linia galbenă exact ca un elev care a învățat regula.

Autobuzul întârzie douăsprezece minute, anunță un afiș scris de mână, cu o cifră corectată. Luca numără în gând, apoi se lasă păgubaș. Mama a zis: „Nu alerga.” El nu aleargă. Aleargă doar privirea, de la ceasul din telefon la drumul gol.

Când autobuzul vine, e jumătate gol. Șoferul nu zâmbește. Luca arată biletul, care s-a umezit la colț. Un băiat de la a șaptea râde scurt, undeva în spate. Nu e o glumă; e aer scos din piept. Luca se așază la geam. Sticla e rece. Satul rămâne în urmă ca o listă de lumini, nu ca o poveste.

Acasă, pune biletul pe calorifer să se usuce. Nu e un suvenir. E dovada că a așteptat până a venit ceva, și că nu a alergat. A doua zi, același orar. Banca e uscată. El tot nu se așază imediat. Stă un pic în picioare, ca și cum așteptarea ar fi o treabă, nu o pedeapsă. Autobuzul, când vine, e doar un autobuz. Luca urcă. Drumul își vede de treaba lui.

Vineri, autobuzul e mai plin. Luca ține ghiozdanul în poală. Un coleg vrea să țină locul de lângă cu geanta. Luca scutură din cap: nu se rezervă. Colegul râde, apoi mută geanta. Afară, satul trece iute. Luca nu numără casele. Numără stațiile, ca pe o listă care îl duce acasă fără să alerge.

Duminică, stația e goală. Luca trece pe acolo totuși, cu mama, spre magazin. Banca e uscată. El o atinge cu palma, fără să se așeze. Mama zice iar: „Nu alerga.” El nu aleargă. A învățat, pe o bancă udă, că un drum se ține dacă aștepți până vine, nu dacă alergi spre un far care nu e al tău.`, `Textul 2 (nonliterar)

Anunț — Naveta școlară
Consiliul de administrație, 2 octombrie

De luni, 7 octombrie, autobuzele de navetă circulă astfel:
• dimineața: 7:10 (satul Deal, capătul de linie) — sosire școală 7:45;
• după-amiaza: 14:20 (luni–joi), 16:10 (vineri).

Nu se rezervă locuri. Ghiozdanul stă în poală sau la picioare, nu pe scaunul de lângă. Biletul lunar se arată la urcare. Dacă îl pierzi, anunți profesorul de serviciu înainte de plecare; nu urci „că mă cunoaște șoferul”.

Dacă autobuzul întârzie peste 15 minute, se așteaptă în stație, nu pe șosea. Dacă e polei, naveta poate fi anulată; anunțul se pune până la 6:30 pe grupul claselor și la avizier.

Locuri: 32 pe tură. Înscrieri: până vineri, 4 octombrie, ora 13:00, la secretariat. Cine se înscrie și nu vine trei zile la rând, fără anunț, pierde locul în luna următoare.

Ghiozdanele voluminoase stau pe podea, în dreapta scaunului, nu pe culoar. Nu se mănâncă în autobuz. Urechile rămân libere: fără căști la volum mare. Dacă un elev ratează cursa de dimineață, vine cu părintele sau cu autobuzul de linie; nu aleargă după navetă pe șosea.

Lista de prezență se ține de profesorul de serviciu la urcarea de după-amiază. Părinții primesc orarul pe hârtie, la înscriere, nu doar pe grup. Modificările de iarnă (polei, ceată) se anunță până la 6:30. Cine e deja în stație așteaptă zece minute după anunț, apoi se întoarce acasă, nu rămâne pe întuneric.

Responsabil: dirigintele clasei a VIII-a A, cu sprijinul administratorului.`);

  const i = assemble('i', {
    id: 'en-ro-i',
    title: 'Model I — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'Atelierul din textul 1 e…', extra: { choices: ['o sală cu miros de rumeguș și o menghină', 'o seră', 'un peron', 'o bibliotecă'] } },
      { n: 2, points: 5, prompt: 'Ce învață Daria să nu facă cu dalta?', extra: { choices: ['să n-o lase cu tăișul în sus', 'să n-o spele', 'să n-o arate profesorului', 'să n-o țină în mână'] } },
      { n: 3, points: 5, prompt: 'Textul 2 este…', extra: { choices: ['regulamentul atelierului de lucru manual', 'o poveste cu Daria', 'un orar de tren', 'o recenzie'] } },
      { n: 4, points: 5, prompt: 'Ochelarii sunt obligatorii, după textul 2, la…', extra: { choices: ['tăierea cu ferăstrăul', 'semnarea condicii', 'pauza mare', 'ora de română'] } },
      { n: 5, points: 5, prompt: 'Textele vorbesc împreună despre…', extra: { choices: ['o treabă făcută cu mâinile și cu o regulă care te ține întreg', 'o așteptare de autobuz', 'o seră', 'o plăcintă'] } },
      { n: 6, points: 5, prompt: 'Transcrie ce zice maistrul despre scândura strâmbă.', extra: { kind: 'short', minWords: 3, lines: 'enunț' } },
      { n: 7, points: 5, prompt: 'Precizează ce se face cu rumegușul la sfârșitul orei.', extra: { kind: 'short', minWords: 3, lines: 'o frază' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, arată de ce o unealtă (sau un regulament) e o formă de grijă, nu o pedepsire. Folosește un text.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă despre muncă, învățătură sau un meșteșug. 50–80 de cuvinte. ${NOVEL}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'Predicatul din „Daria ține dalta” este…', choices: ['ține', 'Daria', 'dalta', 'atelierul'] },
      { n: 2, points: 2, prompt: '„strâmbă” din „scândura strâmbă” e…', choices: ['adjectiv / atribut', 'verb', 'subiect', 'prepoziție'] },
      { n: 3, points: 2, prompt: 'Sinonime pentru „întreg” (te ține întreg)…', choices: ['nevătămat / teafăr', 'rupt', 'ud', 'gol'] },
      { n: 4, points: 3, prompt: 'Subiectul din „Rumegușul se mătură” este…', choices: ['Rumegușul', 'se', 'mătură', 'ora'] },
      { n: 5, points: 3, prompt: '„ca un deget” este…', choices: ['comparație', 'predicat', 'articol', 'interjecție'] },
      { n: 6, points: 3, prompt: '„Nu se aleargă între mese.” predicatul este…', choices: ['nu se aleargă', 'mese', 'Nu', 'atelierul'] },
      { n: 7, points: 2, prompt: '„rumegușul” se desparte…', choices: ['ru-me-gu-șul', 'rum-egușul', 'ru-megu-șul', 'rumegu-șul'] },
      { n: 8, points: 3, prompt: '„obligatorii” e…', choices: ['adjectiv', 'verb', 'prepoziție', 'interjecție'] }
    ],
    composition: 'Descrie sau narează, 150+ cuvinte, o oră într-un atelier / o treabă de mână din care rămâne o regulă. Fără titlu.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Atelier, rumeguș, menghină.', steps: ['Loc'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Tăișul nu stă în sus.', steps: ['Regulă'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Regulament de atelier.', steps: ['Gen'] },
      'Subiectul I A:4': { letter: 'A', explain: 'La ferăstrău.', steps: ['Siguranță'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Mână + regulă.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['nu e greșeală, e lemn', 'e lemn'], tokens: ['lemn', 'gres', 'greș'], explain: 'Maistrul despre scândură.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['se mătură', 'du-l la sac'], tokens: ['matur', 'mătur', 'sac'], explain: 'Rumegușul la sfârșit.', steps: ['Regulă'] },
      'Subiectul I A:8': { answers: ['unealtă', 'grijă'], tokens: ['dalt', 'regul', 'grij', 'unelt', 'atelier'], explain: 'Motivare.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Harap-Alb'], tokens: ['harap', 'munca', 'învăță', 'mestes', 'meșteș'], explain: 'Muncă / încercare.', steps: ['Titlu'] },
      'Subiectul I B:1': { letter: 'A', explain: 'ține.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'atribut.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'nevătămat.', steps: ['Sinonime'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Rumegușul.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'comparație.', steps: ['ca'] },
      'Subiectul I B:6': { letter: 'A', explain: 'nu se aleargă.', steps: ['Predicat'] },
      'Subiectul I B:7': { letter: 'A', explain: 'ru-me-gu-șul.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'adjectiv.', steps: ['Atribut'] },
      'Subiectul II:1': { letter: '', explain: 'Atelier / treabă de mână, 150+, pe caiet.', ideas: ['Loc de lucru', 'O regulă care rămâne'], steps: ['Plan', '150+'] }
    }
  }, `Textul 1 (literar)

Atelierul miroase a rumeguș dulce și a ulei vechi de pe menghină. Daria își prinde părul, deși nimeni n-o mai ceartă: a învățat după ce o șuviță s-a lipit de o scândură. Maistrul nu ridică vocea. Pune dalta pe masă cu tăișul în jos și așteaptă să copiezi gestul.

„Scândura strâmbă nu e o greșeală”, zice. „E lemn. Tu alegi unde tai.” Daria alege prost prima dată: linia iese ca un râu bețiv. Nu aruncă scândura. O întoarce și taie din nou, mai aproape de linie. Rumegușul i se lipește de încheietură, ca o manșetă.

La recreație, un coleg întreabă dacă „e oră de joacă”. Daria arată dalta, cu tăișul în jos. Nu e joacă. E o listă: ochii, mâinile, tăișul, linia. Când clopoțelul sună, mătură fără să i se ceară. Maistrul dă din cap, o dată. Atât ajunge.

Acasă, Daria își spală mâinile și tot simte rumegușul. Pe masă, temele de română așteaptă. Ea desenează totuși, pe marginea caietului, o linie dreaptă, ca un exercițiu secret. Nu e o piesă de mobilă. E dovada că o scândură strâmbă poate deveni ceva, dacă nu o arunci la prima greșeală. A doua zi, dalta stă tot cu tăișul în jos. Daria o ia. Atelierul e tăcut. Tăcerea, aici, e o formă de respect, nu de plictiseală.

Joi, linia iese mai dreaptă. Maistrul nu laudă. Pune palma pe scândură și zice: „Ține.” Atât. Daria mătură iar, deși rumegușul e al grupei. Un coleg uită ochelarii. Daria i-i întinde fără vorbă. Ochelarii, ca tăișul, nu sunt un moft.

Seara, tatăl întreabă ce a făcut la atelier. Daria arată o așchie mică, păstrată în buzunar, ca un semn. Nu e un premiu. E o amintire că o treabă de mână lasă urme, și că urmele se spală, dar regula rămâne: tăișul în jos, linia aproape de adevăr, nu aruncată la prima greșeală.`, `Textul 2 (nonliterar)

Regulament — Atelierul de lucru manual
Școala Gimnazială nr. 2

Intrarea: halat, păr prins, încălțăminte închisă. Nu se aleargă între mese. Uneltele se iau de pe suport cu numele grupei, nu „de unde găsesc”.

Ochelarii de protecție sunt obligatorii la tăierea cu ferăstrăul și la șlefuirea cu mașina. Dalta stă cu tăișul în jos, pe masă sau în suport, niciodată în buzunar.

Program: marți și joi, 12:10–13:40. Vineri închis pentru ascuțire și inventar. Grupele de câte 4. Dacă lipsește maistrul, atelierul rămâne încuiat.

La sfârșitul orei: măturat rumegușul în sacul maro, verificat menghinele, semnat caietul de predare. Dacă lipsește o unealtă, se anunță înainte de a pleca.

Accident: speli, anunți, fișa de pe ușa dulapului roșu. Nu „e doar o zgârietură”.

Uneltele lipsă se caută înainte de a încuia, nu a doua zi. Ferăstrăul electric se folosește doar cu maistru lângă masă. Nu se șlefuiește fără mască de praf. Resturile de scândură sub 10 cm se pun în ladă, nu se aruncă la gunoiul de pe hol.

În săptămâna simulărilor, atelierul rămâne deschis după program doar joi, 13:40–15:00, pentru cei care trebuie să termine o piesă de portofoliu. Nu se lucrează singur. Ușa se încuie de maistru. Fotografiile de piesă se fac pe fundal neutru, fără chipuri.

Coordonator: maistru Radu Pavel, cu sprijinul prof. de tehnologii.`);

  const j = assemble('j', {
    id: 'en-ro-j',
    title: 'Model J — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'În textul 1, Irina scrie…', extra: { choices: ['un articol pentru revista școlii, noaptea, la bucătărie', 'un regulament de seră', 'un orar de autobuz', 'o rețetă'] } },
      { n: 2, points: 5, prompt: 'Ce șterge Irina de trei ori?', extra: { choices: ['prima frază', 'tot articolul', 'numele bunicii', 'orarul'] } },
      { n: 3, points: 5, prompt: 'Textul 2 reglementează…', extra: { choices: ['predarea articolelor la revista școlii', 'naveta', 'atelierul', 'sera'] } },
      { n: 4, points: 5, prompt: 'Termenul de predare a textelor, în textul 2, e…', extra: { choices: ['ziua de 12 a lunii precedente', 'vineri, 16:10', 'lunea, la 8:00', 'orice zi'] } },
      { n: 5, points: 5, prompt: 'Cele două texte țin împreună ideea că…', extra: { choices: ['o vorbă scrisă cere grijă și o regulă de predare', 'o scândură se taie drept', 'un autobuz întârzie', 'o roșie se udă'] } },
      { n: 6, points: 5, prompt: 'Transcrie sfatul bunicii despre fraza întâi.', extra: { kind: 'short', minWords: 4, lines: 'enunț' } },
      { n: 7, points: 5, prompt: 'Precizează câți redactori citesc un text, conform regulamentului.', extra: { kind: 'short', minWords: 1, lines: 'un număr' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, arată de ce o rescriere (în bucătărie sau în redacție) e treabă, nu eșec. Folosește un text.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă despre cuvânt, familie sau învățătură. 50–80 de cuvinte. ${NOVEL}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'Predicatul din „Irina scrie articolul” este…', choices: ['scrie', 'Irina', 'articolul', 'noaptea'] },
      { n: 2, points: 2, prompt: '„întâi” din „fraza întâi” e…', choices: ['numeral / atribut', 'verb', 'prepoziție', 'subiect'] },
      { n: 3, points: 2, prompt: 'Sinonime pentru „șterge” (fraza)…', choices: ['anulează / dă la o parte', 'publică', 'udă', 'taie lemn'] },
      { n: 4, points: 3, prompt: 'Subiectul din „Revista apare de trei ori pe an” este…', choices: ['Revista', 'trei', 'an', 'apare'] },
      { n: 5, points: 3, prompt: '„ca o temă” este…', choices: ['comparație', 'predicat', 'articol', 'interjecție'] },
      { n: 6, points: 3, prompt: '„Nu se publică fără autor.” predicatul este…', choices: ['nu se publică', 'autor', 'Nu', 'revista'] },
      { n: 7, points: 2, prompt: '„redacție” se desparte…', choices: ['re-dac-ți-e', 'red-acție', 'reda-cție', 're-dacție'] },
      { n: 8, points: 3, prompt: '„obligatorie” din „semnătura e obligatorie” e…', choices: ['nume predicativ', 'verb', 'prepoziție', 'subiect'] }
    ],
    composition: 'Scrie 150+ cuvinte despre o pagină pe care o rescrii (temă, articol, bilet). Fără titlu. O treaptă, un capăt.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Articol, bucătărie, noapte.', steps: ['Fapt'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Prima frază, de trei ori.', steps: ['Detaliu'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Regulament de revistă.', steps: ['Gen'] },
      'Subiectul I A:4': { letter: 'A', explain: '12 ale lunii precedente.', steps: ['Termen'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Scriere + regulă.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['Citește-o cu voce', 'cu voce'], tokens: ['citeste', 'citește', 'voce'], explain: 'Sfatul bunicii.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['doi', '2'], tokens: ['doi', '2'], explain: 'Doi redactori.', steps: ['Regulă'] },
      'Subiectul I A:8': { answers: ['rescriere', 'grijă'], tokens: ['rescri', 'fraza', 'grij', 'redact'], explain: 'Motivare.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Amintiri din copilărie'], tokens: ['amintiri', 'creanga', 'familie', 'invat', 'învăț'], explain: 'Cuvânt / familie.', steps: ['Titlu'] },
      'Subiectul I B:1': { letter: 'A', explain: 'scrie.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'numeral.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'anulează.', steps: ['Sinonime'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Revista.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'comparație.', steps: ['ca'] },
      'Subiectul I B:6': { letter: 'A', explain: 'nu se publică.', steps: ['Predicat'] },
      'Subiectul I B:7': { letter: 'A', explain: 're-dac-ți-e.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'NP.', steps: ['NP'] },
      'Subiectul II:1': { letter: '', explain: 'Rescriere, 150+, pe caiet.', ideas: ['O pagină', 'O treaptă'], steps: ['Plan', '150+'] }
    }
  }, `Textul 1 (literar)

Bucătăria e stinsă, în afara spotului de deasupra mesei. Irina scrie pe un caiet cu coperți moi, nu pe telefon: e articol pentru revista școlii și vrea să vadă ștersăturile. Prima frază cade de trei ori. Bunica, de pe scaunul de la geam, zice: „Citește-o cu voce. Dacă nu o poți spune, n-o lăsa.”

Irina citește. Fraza sună a temă copiată. O taie. Scrie altceva: un hol, un avizier, un băiat care îndreaptă o piatră la un cireș. Nu e despre ea, și totuși e. Ceainicul pocnește. Pisica sare de pe pervaz. Irina nu se uită. Termină paragraful al doilea înainte să se răcească ceaiul.

A doua zi, la redacție, o colegă zice: „E prea scurt.” Irina nu se supără. E o regulă, ca tăișul în jos. Rescrie seara, tot la aceeași masă. Bunica nu mai comentează. A pus doar o cană lângă caiet. Unele ajutoruri sunt tăcute și țin mai bine decât sfaturile lungi.

Când articolul pleacă, Irina păstrează pagina cu ștersături. Nu ca să se laude. Ca să-și amintească că prima frază poate fi o ușă greșită, și că o ușă se mai deschide o dată, dacă ai răbdare să stai la masă până se aude ceainicul.

La ședința de miercuri, articolul trece, cu o tăiere de două fraze. Irina nu se supără. Taie. Bunica, seara, pune iar o cană. Nu citește textul. Citește fața fetei. „Ai spus-o cu voce?” Irina dă din cap. Asta e regula din bucătărie, și se potrivește și în redacție.

Peste o săptămână, revista iese. Irina nu o arată la toată lumea. O pune pe masă, lângă caietul cu ștersături. Două versiuni ale aceleiași uși. Una e tipărită. Cealaltă e adevărată altfel: arată drumul. Ea păstrează drumul.

În weekend, bunica cere să i se citească articolul cu voce. Irina citește. Fraza întâi, cea nouă, stă. Ceainicul pocnește la timp, ca un semn că o pagină ținută până la capăt merită o cană. Irina nu se laudă la școală. Păstrează ștersăturile. Unele dovezi sunt urâte și țin mai bine decât pagina curată.

La următorul număr, scrie din nou noaptea. Prima frază cade o dată, nu de trei ori. E un progres mic, ca o ușă care se deschide mai ușor dacă ai mai trecut pe acolo.`, `Textul 2 (nonliterar)

Regulament de redacție — revista „Glasul curții”
Anul 8, nr. 1

Revista apare de trei ori pe an (noiembrie, martie, iunie). Textele se predau până în data de 12 a lunii precedente, pe revista@scoala.ro sau pe hârtie, sala 8, cutia „Redacție”.

Primim: reportaje de maximum 250 de cuvinte, recenzii, interviuri, desene alb-negru. Nu primim teme copiate, jigniri, fotografii fără acord.

Fiecare text e citit de doi redactori. Dacă se cere rescriere, ai 5 zile. Semnătura e obligatorie. Fără autor, nu se publică.

Ședința: miercuri, 14:10–15:00, sala 8. Tiraj: 80 de exemplare pe holuri, 20 la bibliotecă. Corectura se face pe print, cu creionul, nu pe telefon.

Textele se trimit într-un fișier, titlu de maximum opt cuvinte. Dacă un articol trece de 250 de cuvinte, se cere tăiere. Desenele se predau lizibil, nu fotografiate în umbră. Arhiva stă în mapa albastră din sala 8. Exemplarele de la bibliotecă nu se împrumută acasă.

Cine întârzie la ședință peste șapte minute nu mai votează rubrica, dar poate lăsa un articol în cutie. Interviurile se înregistrează cu telefonul pe masă, vizibil. Fără acord, nu se publică.

Redactor-șef: Mara Ionescu, clasa a VIII-a B, sub îndrumarea prof. de română.`);

  const k = assemble('k', {
    id: 'en-ro-k',
    title: 'Model K — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'Locul din textul 1 este…', extra: { choices: ['o piață acoperită, sâmbăta de dimineață', 'o seră', 'un peron', 'un atelier'] } },
      { n: 2, points: 5, prompt: 'Ce cântărește vânzătorul de două ori?', extra: { choices: ['o pungă cu mere', 'o scândură', 'un bilet de autobuz', 'un ghiveci'] } },
      { n: 3, points: 5, prompt: 'Textul 2 este, în principal…', extra: { choices: ['regulamentul cantinei școlii', 'o povestire cu piața', 'un orar de tren', 'o recenzie de carte'] } },
      { n: 4, points: 5, prompt: 'Cantina se închide, după anunț, la…', extra: { choices: ['14:30', '8:00', '16:10', '20:00'] } },
      { n: 5, points: 5, prompt: 'Cele două texte se leagă prin ideea de…', extra: { choices: ['o treabă de hrană ținută cu măsură și reguli', 'o daltă cu tăișul în sus', 'un cireș tăiat', 'un tren întârziat'] } },
      { n: 6, points: 5, prompt: 'Transcrie ce zice mama despre cântar.', extra: { kind: 'short', minWords: 3, lines: 'enunț' } },
      { n: 7, points: 5, prompt: 'Precizează ce faci dacă uiți carnetul de cantină (textul 2).', extra: { kind: 'short', minWords: 3, lines: 'o frază' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, arată de ce o cântărire (sau o listă de meniu) e o formă de grijă. Folosește un text.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă despre familie, muncă sau o treabă de fiecare zi. 50–80 de cuvinte. ${NOVEL}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'Predicatul din „Mama cântărește merele” este…', choices: ['cântărește', 'Mama', 'merele', 'piața'] },
      { n: 2, points: 2, prompt: '„acoperită” din „piață acoperită” e…', choices: ['adjectiv / atribut', 'verb', 'prepoziție', 'subiect'] },
      { n: 3, points: 2, prompt: 'Un sinonim pentru „măsură” (ține măsura) e…', choices: ['cumpătare / echilibru', 'grabă', 'uitare', 'zgomot'] },
      { n: 4, points: 3, prompt: 'Subiectul din „Cantina se închide la 14:30” este…', choices: ['Cantina', '14:30', 'se', 'închide'] },
      { n: 5, points: 3, prompt: '„ca o listă” este…', choices: ['comparație', 'predicat', 'articol', 'interjecție'] },
      { n: 6, points: 3, prompt: '„Nu se sare rândul.” predicatul este…', choices: ['nu se sare', 'rândul', 'Nu', 'cantina'] },
      { n: 7, points: 2, prompt: '„cântarul” se desparte…', choices: ['cân-ta-rul', 'cânt-arul', 'câ-ntarul', 'cânta-rul'] },
      { n: 8, points: 3, prompt: '„obligatoriu” din „carnetul e obligatoriu” e…', choices: ['nume predicativ / adjectiv', 'verb', 'prepoziție', 'subiect'] }
    ],
    composition: 'Narează, minimum 150 de cuvinte, o treabă de hrană (piață, bucătărie, cantină) ținută cu o regulă. Fără titlu.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Piața acoperită, sâmbăta.', steps: ['Loc'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Punga cu mere, de două ori.', steps: ['Detaliu'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Regulament de cantină.', steps: ['Gen'] },
      'Subiectul I A:4': { letter: 'A', explain: '14:30.', steps: ['Orar'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Hrană + măsură.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['cântărește de două ori', 'de două ori'], tokens: ['cantar', 'cântar', 'doua', 'două'], explain: 'Sfatul mamei despre cântar.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['anunți', 'lista de rezervă', 'nu iei masa'], tokens: ['anunt', 'anunț', 'rezerv', 'nu iei'], explain: 'Procedura fără carnet.', steps: ['Regulă'] },
      'Subiectul I A:8': { answers: ['măsură', 'grijă'], tokens: ['cantar', 'cântar', 'meniu', 'grij', 'masura', 'măsur'], explain: 'Motivare.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Amintiri din copilărie'], tokens: ['amintiri', 'creanga', 'familie', 'munca', 'piata', 'piață'], explain: 'Familie / treabă.', steps: ['Titlu'] },
      'Subiectul I B:1': { letter: 'A', explain: 'cântărește.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'atribut.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'cumpătare.', steps: ['Sinonime'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Cantina.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'comparație.', steps: ['ca'] },
      'Subiectul I B:6': { letter: 'A', explain: 'nu se sare.', steps: ['Predicat'] },
      'Subiectul I B:7': { letter: 'A', explain: 'cân-ta-rul.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'NP.', steps: ['NP'] },
      'Subiectul II:1': { letter: '', explain: 'Hrană, regulă, 150+, pe caiet.', ideas: ['Un loc de hrană', 'O măsură'], steps: ['Plan', '150+'] }
    }
  }, `Textul 1 (literar)

Piața acoperită miroase a mere ude și a hârtie de ziar. Sâmbăta de dimineață, mama ține o listă scurtă, scrisă pe spatele unui plic: mere, brânză, pâine. Nu e o sărbătoare. E o treabă. Un vânzător cântărește o pungă, se uită la cifră, o pune la loc și cântărește din nou. Mama zice, fără să ridice vocea: „Cântărește de două ori. Prima cifră minte când te grăbești.”

Eu țin sacoșa. Nu aleg merele strălucitoare. Aleg pe cele cu un semn mic, ca pe oameni care au lucrat. Vânzătorul râde. Mama nu râde. Plătește exact, numără restul. Un băiat de la școală trece cu o chiflă, fără listă. Eu nu-l judec. Eu țin lista.

La ieșire, ploaia bate în tabla acoperișului ca o numărătoare. Mama pune pâinea deasupra, ca să nu se zdrobească. În autobuz, sacoșa stă între noi, caldă. Acasă, merele se spală. Cântarul de bucătărie arată aproape aceeași cifră. Mama dă din cap. A doua cântărire a ținut.

Duminică, o felie de brânză e pentru mine, una pentru ea. Nu e un premiu. E măsura. Eu înțeleg, târziu, că o piață nu e un spectacol de culori, ci o listă ținută până la capăt, fără să sari rândul și fără să minți cântarul. Lunea, la cantina școlii, îmi amintesc lista. Nu sar rândul. Nu cer două feluri când e scris unul. Mama nu e acolo. Regula, da.

Marțea, mama pune pe masă restul de mere. Unele au un semn. Eu le tai, nu le arunc. Vânzătorul avea dreptate să râdă, dar mama avea dreptate să plătească exact. Între râs și cifră, eu aleg cifra. În caietul de română scriu o descriere scurtă: tabla acoperișului, ploaia, sacoșa caldă, a doua cântărire. Nu pun titlu. Las lista să se înțeleagă singură.

Sâmbăta următoare, aceeași piață. Vânzătorul recunoaște sacoșa. Cântărește de două ori, fără să i se ceară. Mama dă din cap. Eu țin sacoșa. Treaba e aceeași. Asta e, pentru mine, o formă de grijă: să te întorci la aceeași masă, cu aceeași listă, până cântarul nu mai minte.`, `Textul 2 (nonliterar)

Regulament — Cantina școlii
Școala Gimnazială „Masa caldă”
1 noiembrie

Program: luni–vineri, 11:40–14:30. Sâmbăta închis. Meniul se afișează luni, la ușa cantinei și la avizier. Nu se schimbă „din ochi” la ghișeu.

Reguli:
• carnetul de cantină e obligatoriu;
• nu se sare rândul;
• nu se iese cu mâncarea în curte, exceptând „Ora de lectură în aer” anunțată;
• resturile se lasă pe tavă, nu în chiuvetă;
• alergatul între mese e oprit.

Dacă uiți carnetul, anunți profesorul de serviciu; ești trecut pe lista de rezervă și iei masa la urmă, nu „că mă cunoaște bucătăreasa”. Dacă lipsești trei zile, anunți secretariatul, ca porția să nu se arunce.

Alergenii sunt afișați lângă meniu. Cine are scutire medicală aduce adeverința până în data de 5 a lunii. Nu se aduc băuturi carbogazoase. Apa e la dozator.

În săptămâna simulărilor, cantina rămâne deschisă până la 14:30, fără prelungire. Părinții nu au acces în sală în timpul servirii. Reclamațiile se depun în scris, la secretariat, nu verbal la ghișeu.

Meniul de post se anunță cu o săptămână înainte. Cine vrea porție dublă o cere la înscrierea lunară, nu la ghișeu. Tăvile se stivuiesc pe masa din dreapta; nu se lasă pe scaun. Dacă un elev varsă, anunță, nu șterge „în secret” cu mânecă.

Lista de alergii se actualizează în data de 5. Cine aduce adeverința mai târziu așteaptă luna următoare. Apa de la dozator e gratuită; paharele de unică folosință stau lângă, nu se iau teancuri la masă. Profesorul de serviciu închide ușa la 14:30, chiar dacă mai sunt elevi pe hol: punctualitatea e parte din regulament.

Administrator cantină: doamna Elena Rusu`);

  const l = assemble('l', {
    id: 'en-ro-l',
    title: 'Model L — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'În textul 1, ceasul din parc…', extra: { choices: ['e oprit de trei zile, dar tot e un punct de întâlnire', 'merge perfect', 'e un cireș', 'e un autobuz'] } },
      { n: 2, points: 5, prompt: 'Ce aduce Sofia sub ceas?', extra: { choices: ['o carte cu coperți moi', 'o daltă', 'o pungă de mere', 'un halat'] } },
      { n: 3, points: 5, prompt: 'Textul 2 anunță…', extra: { choices: ['regulamentul parcului de lângă școală', 'o rețetă', 'un orar de navetă', 'un laborator'] } },
      { n: 4, points: 5, prompt: 'Parcul se închide, iarna, la…', extra: { choices: ['17:00', '21:00', '8:00', '14:30'] } },
      { n: 5, points: 5, prompt: 'Tema comună e…', extra: { choices: ['un loc public ținut de o întâlnire și de o regulă', 'o piață de mere', 'o seră', 'o daltă'] } },
      { n: 6, points: 5, prompt: 'Transcrie ce zice bunicul despre ceasul oprit.', extra: { kind: 'short', minWords: 3, lines: 'enunț' } },
      { n: 7, points: 5, prompt: 'Precizează ce nu se face pe iarbă, conform anunțului.', extra: { kind: 'short', minWords: 2, lines: 'o frază' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, arată de ce un loc (ceas, parc) rămâne viu dacă cineva se întoarce. Folosește un text.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă despre un loc, o întâlnire sau timpul care trece. 50–80 de cuvinte. ${NOVEL}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'Predicatul din „Sofia aduce cartea” este…', choices: ['aduce', 'Sofia', 'cartea', 'ceasul'] },
      { n: 2, points: 2, prompt: '„oprit” din „ceasul oprit” e…', choices: ['adjectiv / atribut', 'verb la infinitiv', 'prepoziție', 'subiect'] },
      { n: 3, points: 2, prompt: 'Un antonim pentru „oprit” (ceasul) e…', choices: ['pornit / în mers', 'stricat', 'ud', 'gol'] },
      { n: 4, points: 3, prompt: 'Subiectul din „Parcul se închide la 17:00” este…', choices: ['Parcul', '17:00', 'se', 'închide'] },
      { n: 5, points: 3, prompt: '„ca un punct” este…', choices: ['comparație', 'predicat', 'articol', 'interjecție'] },
      { n: 6, points: 3, prompt: '„Nu se calcă iarba.” predicatul este…', choices: ['nu se calcă', 'iarba', 'Nu', 'parcul'] },
      { n: 7, points: 2, prompt: '„întâlnire” se desparte…', choices: ['în-tâl-ni-re', 'întâ-lnire', 'in-talnire', 'întâln-ire'] },
      { n: 8, points: 3, prompt: '„public” din „loc public” e…', choices: ['atribut', 'predicat', 'subiect', 'prepoziție'] }
    ],
    composition: 'Descrie sau narează, 150+ cuvinte, o întâlnire într-un loc public (parc, ceas, bancă). O regulă, o întoarcere. Fără titlu.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Ceas oprit, punct de întâlnire.', steps: ['Fapt'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Carte cu coperți moi.', steps: ['Obiect'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Regulament de parc.', steps: ['Gen'] },
      'Subiectul I A:4': { letter: 'A', explain: '17:00 iarna.', steps: ['Orar'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Loc + întoarcere.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['arată ora din noi', 'ora din noi'], tokens: ['ora', 'noi', 'arata', 'arată'], explain: 'Bunicul despre ceas.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['nu se calcă iarba', 'nu se calcă', 'nu se joacă mingea'], tokens: ['calca', 'calcă', 'iarba', 'minge'], explain: 'Regula ierbii.', steps: ['Anunț'] },
      'Subiectul I A:8': { answers: ['întoarce', 'loc'], tokens: ['intoar', 'întoar', 'parc', 'ceas', 'loc'], explain: 'Motivare.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Dumbrava minunată'], tokens: ['dumbrava', 'parc', 'loc', 'timp', 'intaln', 'întâln'], explain: 'Loc / natură.', steps: ['Titlu'] },
      'Subiectul I B:1': { letter: 'A', explain: 'aduce.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'atribut.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'pornit.', steps: ['Antonim'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Parcul.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'comparație.', steps: ['ca'] },
      'Subiectul I B:6': { letter: 'A', explain: 'nu se calcă.', steps: ['Predicat'] },
      'Subiectul I B:7': { letter: 'A', explain: 'în-tâl-ni-re.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'atribut.', steps: ['Atribut'] },
      'Subiectul II:1': { letter: '', explain: 'Loc public, întâlnire, 150+, pe caiet.', ideas: ['Un loc', 'O întoarcere'], steps: ['Plan', '150+'] }
    }
  }, `Textul 1 (literar)

Ceasul din parc e oprit de trei zile. Acele stau la douăsprezece și la patru, ca o gură care a uitat să închidă vorba. Sofia vine totuși. Aduce o carte cu coperți moi și se așază pe banca de sub cadran. Bunicul a zis: „Un ceas oprit tot arată ora din noi, dacă ne întoarcem.” Ea nu înțelege tot, dar vine.

Un copil aleargă pe alee și se oprește la linia de pietriș, ca la o regulă. O femeie citește un ziar de ieri. Un câine așteaptă lângă o bicicletă. Parcul nu e o poveste. E un loc unde oamenii își țin întâlnirile chiar când timpul de pe stâlp minte.

Sofia citește două pagini. Nu înțelege tot. Mintea îi fuge la tema de luni. Când ridică privirea, pe bancă e o frunză uscată. O pune între file, ca pe un semn. Un băiat de la a șaptea trece și zice: „E stricat.” Sofia dă din umeri. Nu e treaba ei să-l repare. E treaba ei să vină.

Acasă, spune bunicii că acele n-au mișcat. Bunicul zâmbește. „Ai mișcat tu.” Asta e destul. A doua zi, ceasul e tot oprit. Sofia tot vine. Cartea are un semn de frunză. Parcul își vede de treaba lui. Ora din noi, dacă există, stă acolo, sub cadran, nu pe cadran.

Lunea, la școală, Sofia nu povestește ceasul. Păstrează frunza. Unele întâlniri țin dacă le ții tăcute, ca o bancă care nu cere plăcuță cu nume.

Miercuri, un om cu o scară mică atinge cadranul, apoi coboară. Acele nu pornesc. Sofia nu urcă pe soclu. A citit anunțul: reparația e a primăriei. Ea își vede de carte. Băiatul de la a șaptea trece iar: „Tot stricat.” Sofia zice, de data asta: „Tot aici.” El dă din umeri și pleacă. Banca rămâne. Frunza, între file, de asemenea.

Seara, bunicul întreabă dacă s-a mișcat ceva. Sofia arată cartea. „Eu.” Bunicul râde încet, ca un ceas care nu are nevoie de baterie ca să țină o întâlnire. A doua vineri, clubul de lectură în aer se anunță la avizier. Sofia se înscrie. Ceasul poate rămâne oprit. Locul, nu.`, `Textul 2 (nonliterar)

Anunț — Parcul de lângă școală
Primăria, cu sprijinul Consiliului elevilor
12 martie

Parcul de lângă Școala Gimnazială nr. 2 e deschis zilnic: vara 7:00–21:00, iarna 7:00–17:00. Poarta de lângă terenul de sport se închide cu zece minute înainte.

Reguli:
• nu se calcă iarba de pe pajistea centrală;
• nu se joacă mingea lângă ceasul-monument;
• câinii stau în lesă;
• gunoiul se pune în coșurile verzi, nu lângă bancă;
• nu se lipesc afișe pe stâlpul ceasului.

Băncile de sub ceas sunt loc de lectură, nu de grupuri zgomotoase. În pauzele mari, elevii pot ieși doar cu profesorul de serviciu, pe poarta de lângă teren, nu pe cea spre stradă.

Dacă ceasul e oprit, se anunță la secretariat; nu se urcă pe soclu. Reparația e a primăriei, nu „îl învârtim noi”. În caz de furtună, parcul se închide; anunțul se pune la poartă și la avizierul școlii.

Clubul de lectură în aer (ultima vineri din lună, 15:00–16:00, vreme permisivă) se ține pe băncile de sub ceas. Înscrieri: până miercuri, la biblioteca școlii. Locuri: 24.

Iarna, aleile se sapă de zăpadă până la ceas, nu până la poarta spre stradă. Nisipul stă în ladă lângă poarta de la teren. Nu se fac tobogane pe pajistea centrală. Bicicletele se lasă în rastel, nu legate de stâlpul ceasului.

Dacă un banc e rupt, se anunță la secretariat; nu se mută. În weekend, parcul rămâne deschis după orar, dar elevii nu ies în grup de la școală fără profesor. Anunțurile de evenimente se pun pe panoul de la poartă, nu pe cadran. Primăria poate închide parcul pentru reparația ceasului; atunci clubul de lectură se mută în sala 8.

Responsabil din partea școlii: dirigintele clasei a VIII-a C`);

  return { g, h, i, j, k, l };
}

module.exports = { packs };
