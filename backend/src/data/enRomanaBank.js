// Modele EN română pe structura publică 2025–2026 (CNPEE):
// Subiectul I (70p) = A înțelegere pe 2 texte lungi + B gramatică grile;
// Subiectul II (20p) = compunere min. 150 de cuvinte, pe caiet.
// Textele sunt originale. Nu copiem fragmente din manuale sau subiecte publicate.

const { rng, seedFromHex, shuffle } = require('./itemRng');
const { assembleOfficial, legacyToSpec } = require('./enRomanaOfficial');

const LETTERS = ['A', 'B', 'C', 'D'];

const NOVEL_HINT =
  'Poți porni de la o carte citită la gimnaziu (Amintiri din copilărie, Povestea lui Harap-Alb, Dumbrava minunată, Toate pânzele sus! sau alta). Nu copia rezumatul din culegere: o valoare comună + un fapt din opera ta + un fapt din fragment.';

const ASSOCIATE_TOKENS = [
  'amintiri', 'creanga', 'creangă', 'harap', 'dumbrava', 'sadoveanu', 'tudoran', 'pânze', 'panze',
  'prieten', 'familie', 'curaj', 'grij', 'natur', 'copil', 'bunici', 'bunic', 'onest', 'adevăr', 'adevar',
  'responsabil', 'învățătur', 'invatatur', 'lectur', 'carte', 'roman', 'poveste', 'oper'
];

function wordCount(text) {
  return String(text || '').trim().split(/\s+/).filter(Boolean).length;
}

function shuffleMcqBundle(bundle, rand) {
  if (!bundle?.public || !bundle.barem) return bundle;
  (bundle.public.blocks || []).forEach(block => {
    (block.items || []).forEach(item => {
      if (!item.n || !Array.isArray(item.choices) || item.choices.length < 2) return;
      const key = `${block.label}:${item.n}`;
      const row = bundle.barem[key];
      if (!row || !row.letter) return;
      const idx = LETTERS.indexOf(String(row.letter).toUpperCase());
      if (idx < 0 || idx >= item.choices.length) return;
      const correct = item.choices[idx];
      const next = shuffle(rand, item.choices.slice());
      item.choices = next;
      const newIdx = next.indexOf(correct);
      row.letter = LETTERS[Math.max(0, newIdx)];
    });
  });
  return bundle;
}

const TEXTS = {
  a: {
    litTitle: 'Textul 1 (literar)',
    nonTitle: 'Textul 2 (nonliterar)',
    lit: `Textul 1 (literar — versuri)

Cireșul din spatele școlii
nu mai are flori, dar ține
trei cireșe tari, ca nasturi
uitați pe-o haină prea mare.

Mara vine înainte de oră.
Holul miroase a cretă udă.
Pune o pungă de pânză la rădăcină,
cu două pietre de râu deasupra,
ca să nu o ia vântul dinspre teren.

„Nu e al nostru”, zice un băiat
de la a șaptea, lângă jgheab.
„E al curții. Directorul taie
toamna, că umbrește sala.”

Mara nu răspunde. Săpă
un șanț subțire, cu lingura.
Pământul e rece și se lipește
de unghii. A doua zi, punga e acolo.

În ea, un bilet fără nume:
„Udați-l joi.” Scrisul e grăbit,
dar literele stau drepte, ca de om
care se teme să greșească, nu să fie prins.

Miercuri, trei fete râd
când o văd cu sticla de apă.
Mara toarnă încet, să nu se facă noroi.
Un profesor trece și dă din cap.

Joi a plouat de dimineață.
Mara zâmbește în hol, cu ghiozdanul ud,
ca și cum ploaia ar fi un acord
secret între ea și cineva necunoscut.

Vineri, băiatul îndreaptă o piatră.
Nu ia punga. Pleacă fluierând.
Mara vede totul de la etaj.
Cireșul nu spune nimic. Pământul e încă viu.

Duminică trece fără sticlă.
Îndreaptă pietrele, ca pe o treabă
care nu cere martori. Scrie acasă
un rând, fără să-l predea: „Cineva udă.”`,
    non: `Textul 2 (nonliterar)

Biblioteca școlii „Scara 3” — anunț pentru elevi
Data: 5 mai

De luni, 12 mai, sala de lectură se deschide la 8:00 și se închide la 16:00. Miercuri și joi, în sesiunea de teste, ultima oră de acces e 14:30. Sâmbăta sala e închisă, exceptând ultima sâmbătă din lună, când Consiliul elevilor ține „Ora de citit în liniște” (10:00–12:00).

Reguli:
• ghiozdanele stau în cuierul de la ușă;
• apa e permisă doar în sticlă închisă;
• se vorbește în șoaptă; nu se țin grupuri de lucru fără profesor;
• cărțile din sală (raftul albastru) nu se împrumută acasă;
• de la ghișeu: maximum 3 volume, 14 zile; întârzierea se notează în caietul de evidență.

Tabel. Zi / locuri în sală / clasă de gardă
• luni — 24 — VII A
• marți — 24 — VIII C
• miercuri — 16 — VI B
• joi — 16 — VIII A
• vineri — 24 — VII D

Nu se ține locul cu un caiet sau cu o geacă. Dacă sala e plină, te înscrii pe lista de pe ușa bibliotecarei și aștepți pe holul de la etajul 1, nu pe scara de incendiu. Lista se șterge la 16:00; cine n-a intrat revine a doua zi, fără prioritate.

În sesiunea de teste, raftul albastru rămâne în sală. Nu se fac fotografii la pagini. Dacă ai nevoie de un citat pentru portofoliu, ceri o copie la ghișeu, nu rupi fila.

Întrebări: biblioteca@scara3.scoala.ro, zile lucrătoare, 8:30–15:00. Telefon intern: 21.

Cine pierde un volum plătește taxa de pe listă, afișată lângă catalogul electronic; nu se negociază la ghișeu. Cărțile rezervate se ridică în maximum 48 de ore, altfel revin pe raft. Clubul de lectură se înscrie până în ultima vineri a lunii, pe formularul de la secretariat. În perioada simulărilor, sala se închide cu o oră mai târziu doar pentru clasa a VIII-a, pe baza carnetului. Părinții pot citi regulamentul pe site-ul școlii; nu au acces în sală în timpul orelor. Reclamațiile se depun în scris, nu verbal la bibliotecar. Copiile din fondul de referință (maximum zece pagini pe elev pe lună) se fac doar cu acordul bibliotecarei.

În prima lună după renovare, fiecare clasă are o oră rezervată pe săptămână, ca sala să nu se aglomereze. Lista de noutăți stă lângă catalog. Clasa a V-a are prioritate la dicționarele ilustrate; clasa a VIII-a, la ghidurile de lectură pentru examen. Conducerea reamintește că biblioteca este un spațiu de lucru, nu de recreere zgomotoasă. Telefoanele se lasă la intrare, în cutia marcată, inclusiv în „Ora de citit în liniște”.

Director adjunct, prof. Elena Munteanu`
  },
  b: {
    litTitle: 'Textul 1 (literar)',
    nonTitle: 'Textul 2 (nonliterar)',
    lit: `Textul 1 (literar)

Peronul 2 e o bandă de beton frecată de valize. Dimineața, aerul miroase a cafea de automat și a oțel ud. Un ceas rotund, cu sticla fisurată, arată un minut în urma anunțurilor, ca un bătrân care aude, dar nu se grăbește. Nimeni nu se uită la el de două ori; îl verifici din obișnuință, ca pe un buzunar gol.

Pe bancă stau trei oameni care nu se privesc: o femeie cu un plic galben ținut pe genunchi cu amândouă mâinile, un elev cu un caiet deschis la o pagină plină de săgeți, un bărbat care numără monede și le pune în două grămezi — una mică, una și mai mică. Deasupra, un afiș jumătate dezlipit promite un festival de luna trecută. Colțul afișului se mișcă când trece vântul dintre vagoanele goale.

Șinele, fără tren, par două linii de caiet foarte lungi. Un porumbel umblă printre mucuri și o sticlă de plastic. Elevul închide caietul când se anunță întârzierea de douăsprezece minute. Femeia nu clipește. Bărbatul termină de numărat și începe din nou, ca și cum suma s-ar putea schimba dacă o iei de la capăt.

Când trenul tot nu vine, cineva râde scurt, undeva la capătul peronului. Nu e o glumă bună; e doar aer scos din piept. Elevul își pune caietul în ghiozdan. Femeia deschide plicul, se uită înăuntru, îl închide. Nu scoate nimic. Un copil trece ținând o valiză cu rotițe care scârțâie pe beton; mama lui spune „nu alerga”, dar copilul aleargă până la linia galbenă și se oprește exact acolo, ca la o regulă învățată pe de rost. Peronul rămâne. Nimeni nu rămâne pe peron ca să-l descrie, dar el stă acolo și după ce oamenii pleacă, cu ceasul lui care minte cu un minut și cu șinele care așteaptă altceva decât descrierea noastră. Dacă ai sta până seara, ai vedea aceleași trei tipuri de oameni, doar cu alte fețe: cineva cu un plic, cineva cu un caiet, cineva care numără. Locul nu se plictisește. Noi da.

Un vânzător de ziare trece cu o plasă de sfoară. Nu strigă. Așază un teanc pe o ladă și așteaptă, ca și ceilalți. Elevul cumpără un ziar pe care nu-l citește: îl pune sub caiet, ca să nu se ude de la banca rece. Femeia cu plicul galben își schimbă locul cu un pas, suficient cât să nu-i atingă nimeni plicul. Bărbatul cu monedele a terminat de numărat a treia oară. Suma e aceeași. El o știe. Numără totuși, pentru că mâinile au nevoie de o treabă până vine trenul.

Când în sfârșit se aude anunțul corect, peronul se ridică deodată, ca o clasă la sfârșitul orei. Nimeni nu mulțumește ceasului. Nimeni nu se uită înapoi la bancă. Rămân mucurile, sticla de plastic, afișul dezlipit și cele două linii de caiet foarte lungi. Un porumbel revine. Peronul 2 își reia tăcerea, pregătit pentru alt minut mincinos și pentru alți trei oameni care nu se privesc.`,
    non: `Textul 2 (nonliterar)

Aviz — Consiliul elevilor, 3 martie

Sâmbătă, 8 martie, între 10:00 și 13:00, holul de la parter se transformă în „Târgul caietelor uitate”. Aduci un obiect școlar în stare bună (caiet, stilou, mapă, carte de lectură fără însemnări personale), primești un bon. Cu două bonuri iei un obiect de pe masă.

Nu se vând lucruri pe bani. Nu se aduc telefoane, căști sau haine. Profesorul de serviciu stă la ușa dinspre curte. Clasa a VIII-a B ține lista și verifică starea obiectelor. Dacă un obiect e stricat, se pune în cutia „pentru reciclare”, nu pe masă.

Dacă plouă, târgul se mută în sala 12, nu se amână. Dacă sâmbătă e o festivitate în hol, se afișează un anunț vineri până la ora 12:00.

Înscrieri: până vineri, 7 martie, ora 14:00, la avizierul de lângă cancelarie. Fiecare elev poate aduce cel mult cinci obiecte. Lista de obiecte se afișează pe ușa sălii 12, nu pe holul de la etaj. Dacă un obiect are numele tău pe copertă, îl ștergi înainte; altfel rămâne la cutia „uitate cu nume” și nu intră în schimb.

Cine vine după ora 13:00 nu mai lasă obiecte, dar poate lua, dacă mai sunt. Nu se rezervă un obiect cu un bilețel. Profesorul de serviciu poate opri târgul zece minute dacă holul se aglomerează: nu se strigă, nu se aleargă între mese.

Întrebări: consiliul@scara.ro, până vineri, ora 12:00.

Obiectele rămase după ora 13:00 se pun în cutia „pentru săptămâna următoare”, nu se aruncă. Cine vrea un obiect după închidere lasă un bilet cu numele și clasa la profesorul de serviciu; nu se trimit mesaje pe grup. Lista de bonuri se arhivează în sala 12 până luni, ora 8:00, apoi se șterge. Nu se fac fotografii la masa de schimb, ca să nu apară nume pe copertă în imagini.

Dacă un elev aduce mai mult de cinci obiecte, primele cinci stau pe masă, restul se întorc acasă. Dacă un obiect e nou, în ambalaj, tot se schimbă pe bonuri, nu pe bani. Profesorul de serviciu poate cere să se lase o alee liberă de un metru între mese. Târgul se închide la 13:00, chiar dacă mai sunt obiecte: punctualitatea e parte din regulament, nu un detaliu.

Responsabil: Andrei Popescu, clasa a VIII-a B, cu sprijinul doamnei diriginte.`
  },
  c: {
    litTitle: 'Textul 1 (literar)',
    nonTitle: 'Textul 2 (nonliterar)',
    lit: `Textul 1 (literar)

Podul de lemn trece pârâul ca o propoziție neterminată: scândurile au goluri prin care vezi apa, nu destul de late cât să-ți cadă piciorul, destul cât să-ți cadă privirea. Ira ține o sacoșă cu pâine. Nu se uită în jos. Se uită la malul celălalt, unde câinele vecinilor așteaptă de parcă podul ar fi o regulă, nu o scândură.

A mai trecut de o sută de ori. De fiecare dată numără în gând până la zece, deși podul n-are zece pași. Apa e mică vara și se aude pe pietre. Iarna, când îngheață la mal, podul scârțâie altfel, mai ascuțit. Azi e o zi obișnuită de aprilie: norii stau jos, ca o pătură spălată prost.

La mijloc, o scândură e mai subțire. Ira o știe. Pune piciorul lângă cuie, nu pe mijloc. Sacoșa se lovește de genunchi. Câinele nu latră. Mișcă din coadă o dată, apoi stă. Când Ira ajunge, îi rupe o coajă. Câinele o ia fără grabă, ca un om care a așteptat și nu mai are de ce să se grăbească.

În sacoșă mai rămâne pâinea pentru masă. Mama a zis: „Du-te drept, nu te opri la povești.” Ira se oprește totuși, pentru că un câine care așteaptă pe mal nu e o poveste, e o treabă. Se întoarce pe același pod. De data asta se uită o clipă în jos. Apa duce o frunză. Frunza trece pe sub scânduri și iese dincolo, întreagă. Un bătrân vine din față, cu o plasă de cumpărături. Ira se lipește de balustradă ca să-i facă loc. Bătrânul zice „să trăiești” și trece fără să se uite în goluri. Podul rămâne în spate, cu golurile lui, gata să țină pe altcineva care nu se uită în jos — sau care, o dată, se uită. Ira ajunge acasă cu pâinea încă caldă pe fundul sacoșei și cu mirosul de pârâu pe palme. Mama nu întreabă de câine. Ira nu spune. Unele treceri țin dacă le faci și taci.

A doua zi, podul e ud. Ira numără iar până la zece. Câinele e tot acolo, mai la stânga, ca și cum ar fi învățat ora. De data asta, Ira rupe o coajă mai mică: pâinea e pentru masă, nu pentru povești, dar o treabă mică tot trebuie făcută. Un copil de la clasa a cincea aleargă pe scânduri și se oprește la mijloc, deasupra golului. Ira zice, fără să ridice vocea: „Lângă cuie.” Copilul mută piciorul. Apoi râde și trece. Podul nu se clatină. Se clatină doar privirea.

Seara, Ira desenează în caiet un pod cu goluri, nu unul întreg. Nu e tema. E o amintire care nu cere notă. Mama trece pe lângă masă și nu întreabă. Ira închide caietul. Pârâul, undeva, duce altă frunză. Podul așteaptă. Câinele, probabil, de asemenea.`,
    non: `Textul 2 (nonliterar)

Regulament — laboratorul de științe
Școala Gimnazială nr. 4

Intrarea se face doar cu halat și păr prins. Nu se gustă substanțe. Nu se aleargă între mese. Chiuveta din stânga e doar pentru sticlărie clătită, nu pentru resturi de experiment. Resturile se pun în recipientul galben, etichetat, de lângă dulapul roșu.

Program: luni–joi 12:10–14:00; vineri închis pentru inventar. Grupele de câte 4. Dacă lipsește un coleg, nu se lucrează în doi fără profesor. Dacă lipsește profesorul, laboratorul rămâne închis; nu „intrăm noi, că știm”.

Accident mic (tăietură, strop pe piele sau pe bancă): speli imediat, anunți, completezi fișa de pe ușa dulapului roșu. Nu „rezolvi tu” și pleci. Ochelarii de protecție sunt obligatorii la încălzirea substanțelor.

La începutul orei, profesorul citește lista grupei. Cine e în întârziere peste cinci minute nu mai intră. La sfârșit, fiecare grupă șterge banca, verifică robinetul și semnează caietul de predare. Dacă lipsește o eprubetă, se anunță înainte de a pleca, nu a doua zi.

Telefonul rămâne în geantă. Fotografiile se fac doar dacă profesorul cere un rezultat pentru portofoliu. Halatele atârnă pe cuierele din dreapta ușii; nu se pun pe spătarul scaunului. Dacă un halat e ud, îl schimbi cu cel de rezervă din dulapul gri, nu lucrezi fără.

La începutul anului, fiecare clasă semnează fișa de instruire. Cine lipsește atunci o semnează înainte de prima oră de laborator, nu „în pauză, pe hol”.

Substanțele din dulapul roșu se scot doar cu semnătură în caietul de evidență. Nu se mută etichetele. Nu se amestecă resturi „ca să ocupăm mai puțin loc”. Apa de la chiuveta din dreapta e doar pentru spălat mâinile; sticlăria se clătește la chiuveta din stânga. Dacă un robinet picură, se anunță înainte de a pleca. Ușa laboratorului se încuie de profesor, nu de ultimul elev „că știm noi cheia”.

În săptămâna simulărilor, laboratorul rămâne deschis după programul obișnuit, dar numai cu profesor. Nu se țin experimente de unul singur pentru portofoliu. Fotografiile de rezultat, când sunt cerute, se fac pe fundal alb, fără chipuri. Halatele murdare se lasă în sacul de la ușa din dreapta, nu în bancă.

Responsabil laborator: prof. Radu Ionescu`
  },
  d: {
    litTitle: 'Textul 1 (literar)',
    nonTitle: 'Textul 2 (nonliterar)',
    lit: `Textul 1 (literar)

Fereastra de la etajul doi dă spre curtea interioară, nu spre stradă. Teo numără ghivecele de pe pervazul de vizavi: trei vara, unul iarna. Azi sunt două, plus o sârmă pe care atârnă un prosop albastru, încă ud. Jos, cineva bate un covor. Praful se ridică drept, ca un stâlp, apoi se rupe și se așază pe iarba scurtă de lângă alee.

Teo închide geamul. În cameră rămâne mirosul de praf și de săpun de rufe. Pe masă, un caiet deschis la o pagină goală. A încercat să scrie o descriere pentru școală și s-a oprit după „Curtea e…”. Cuvântul următor nu venea, pentru că curtea nu stătea locului: un copil a țipat, o ușă a trântit, covorul a primit încă o lovitură.

Teo scrie un singur rând: „Am închis geamul.” Apoi ascultă. Bătăile au încetat. Prosopul se mișcă, deși vântul nu se simte aici. Cineva, dincolo, a deschis o fereastră pe care el n-o vede. Aude un radio mic, o voce care dă știri și o oală pusă pe aragaz.

Se așază pe scaun și mai scrie: „Afară continuă fără mine.” Nu e o plângere. E o constatare, ca atunci când numeri ghivecele și vezi că s-a schimbat cifra. Caietul rămâne deschis. Teo nu trage storul. Lasă lumina să intre prin geamul închis, ca un acord: el stă înăuntru, curtea își vede de treaba ei, și totuși se aud. Mai târziu, cineva de vizavi strânge prosopul. Sârma rămâne goală. Teo numără din nou ghivecele: tot două. Cifra n-a schimbat lumea. A schimbat doar pagina din caiet, care nu mai e goală. Aude iarăși o ușă. Nu coboară să vadă. Scrie, sub rândul cu geamul: „Am auzit, și e destul.” Asta îi ajunge pentru temă. Nu e o descriere frumoasă. E adevărată.

După-amiază, covorul nu se mai bate. Curtea e tăcută, dar nu goală: un pisoi trece pe alee, un radio rămâne deschis după o fereastră, cineva udă un ghiveci pe care Teo nu-l văzuse dimineață. El notează: „Trei ghivece? Nu. Doi, plus unul pe care nu-l numărasem.” Se corectează. Asta e treaba descrierii: să nu minți cifra ca să iasă frumos.

Seara, mama întreabă dacă a scris tema. Teo arată pagina. Mama citește și dă din cap. Nu zice „e scurt”. Zice „e al tău”. Teo închide caietul, dar lasă geamul închis, nu tras cu storul. Curtea continuă. El a auzit destul ca să știe că lumea de jos nu cere să coboare, ci să fie privită drept.`,
    non: `Textul 2 (nonliterar)

Anunț — Consiliul elevilor, 14 aprilie

Săptămâna „Curtea curată” începe luni, 21 aprilie. Fiecare clasă are o zi de colectare: hârtie (luni), plastic (miercuri), capace de plastic (vineri). Punctele de strângere: holul de la parter, lângă scara B. Sâmbăta nu se colectează.

Program: 8:10–8:25 (înainte de prima oră) și 13:40–14:00 (după ultima oră). Nu se aduc saci de acasă după ora 14:00. Clasa a VIII-a C ține tabelul cu numărul de saci. Sacii trebuie să fie închiși; nu se lasă grămezi pe jos.

Dacă plouă, colectarea se mută în sala 4, nu se anulează. Dacă un sac e rupt, se schimbă la punctul de strângere; nu se golește pe hol.

Premiul: o oră de lectură în curte, vineri, 25 aprilie, doar dacă s-au strâns cel puțin 12 saci. Înscrieri (clasele care vor să ajute la cântărire): până joi, 17 aprilie, la avizier. Cântărirea se face cu cântarul de la sala de sport, nu „din ochi”. Fiecare sac e etichetat cu clasa și ziua.

Nu se aduc sticle sparte, baterii sau resturi de mâncare. Acestea au alt circuit, afișat lângă cancelarie. Dacă un elev aduce un sac după ora 14:00, se notează pentru săptămâna următoare, nu se lasă pe hol peste noapte.

Tabelul cu saci se afișează joi la avizier, nu „din memorie”. Cine ajută la cântărire poartă mănuși de la sala de sport. Sacii de hârtie stau separat de cei de plastic, ca să nu se amestece la predare. Dacă plouă torențial și sala 4 e ocupată, colectarea se mută în holul de la etajul 1, lângă scara A, nu se anulează.

Ora de lectură în curte (premiul) se ține vineri, 25 aprilie, 13:40–14:20, doar dacă s-au strâns cel puțin 12 saci. Dacă nu, ora rămâne oră de clasă. Nu se aduc pături de acasă. Se stă pe băncile din curte. Profesorul de serviciu închide punctul de strângere la 14:00 și predă cheia dirigintelui.

Coordonator: dirigintele clasei a VIII-a C`
  },
  e: {
    litTitle: 'Textul 1 (literar)',
    nonTitle: 'Textul 2 (nonliterar)',
    lit: `Textul 1 (literar)

Bunicul nu vorbește mult când pescuiește. Stă pe o piatră lată, cu undița sprijinită de un băț înfipt în mal, și privește locul unde firul intra în apă ca și cum acolo ar fi o ușă. Luca stă lângă el, cu genunchii în iarbă. A învățat să nu întrebe „a mușcat?” la fiecare minut. Întreabă totuși cu ochii.

Râul e îngust aici și se aude pe pietre. O rață trece cu puii, ținând mijlocul apei, departe de undiță. Bunicul zice, fără să întoarcă capul: „Nu arunci cu pietre. Nu e loc de spectacol.” Luca dă din cap. Ține o cutie de râme. Capacul e găurit cu cuiul.

Când vârful undiței se apleacă, bunicul nu saltă. Trage încet, ca pe o ușă care nu trebuie trântită. Pe mal iese un pește mic, argintiu, care se zbate scurt. Bunicul îl desprinde și îl pune înapoi. „E pentru altă dată.” Luca vrea să întrebe de ce au venit atunci, dacă dau peștele înapoi. Nu întreabă. Bunicul îi pune undița în mână. Firul e umed și miroase a mâl.

Luca așteaptă. Nu mușcă nimeni. O frunză se lipește de fir. Bunicul o ia cu două degete. „Asta nu e pește.” Luca râde, apoi tace. Soarele coboară în spatele sălciilor. Un ciclist trece pe podul de mai sus și sună din clopoțel, deși n-are cine să-i iasă în față. Bunicul strânge undița. Firul face un opt în aer și se așază cuminte. Se întorc pe potecă cu găleata goală și cu mâinile mirosind a râu. Luca înțelege, pe drum, că golul găleții nu e un eșec: au stat împreună până a venit seara, și râul a rămas acolo, pentru altă dată. Acasă, pune cutia de râme pe treaptă și se spală până îi miroase a săpun, nu a mâl. Bunicul bea apă din cană și nu întreabă dacă i-a plăcut. Nu trebuie.

A doua duminică, Luca duce el undița. Bunicul merge în urmă, cu găleata. Pe piatră, locurile sunt aceleași. Râul e un pic mai mare. Luca nu aruncă cu pietre. Nu întreabă „a mușcat?”. Ține firul și privește locul unde intra în apă ca pe o ușă. Când vârful se apleacă, trage prea tare. Peștele scapă. Bunicul nu ceartă. Zice: „Încet, ca ușa.” Luca dă din cap. Încearcă din nou. Nu iese nimic. Găleata rămâne goală. Pe drum, Luca zice totuși: „A fost bine.” Bunicul zâmbește fără dinți, doar cu ochii. Asta e destul.

În caietul de română, luni, Luca scrie o descriere scurtă: piatra lată, firul, frunza care nu e pește. Nu pune titlu. Nu spune că au dat peștele înapoi. Lasă golul găleții să se înțeleagă singur, dacă cineva vrea să înțeleagă.`,
    non: `Textul 2 (nonliterar)

Anunț — Clubul de drumeție al școlii
11 octombrie

Duminică, 19 octombrie, plecăm la Cheile mici (traseu albastru, 6 km dus-întors, diferență de nivel mică). Întâlnirea: 7:30, la poarta școlii. Sosire estimată: 15:00. Participă clasele a VII-a și a VIII-a, cu acordul scris al părintelui (fișa de pe avizier).

Ce aduci: bocanci sau teniși cu talpă aderentă, geacă de ploaie, 1 litru de apă, sandwich, un fruct. Nu se aduc boxe, mingi sau băuturi carbogazoase. Telefonul rămâne în buzunar, pe silențios, exceptând urgențele.

Grupurile de câte 8, fiecare cu un profesor. Nu se iese din potecă. La popasul de la km 3 se face recenzia: cine lipsește din grup oprește tot șirul.

Dacă plouă moderat, traseul se păstrează. Dacă e furtună sau drum închis, se amână pentru 26 octombrie și se anunță sâmbătă până la 18:00 pe grupul claselor.

Înscrieri: până joi, 16 octombrie, ora 13:00, la sala de sport. Locuri: 32. Cine se înscrie și nu vine, fără anunț, pierde locul la următoarea ieșire. Acordul scris rămâne la profesorul de grupă, nu în ghiozdanul elevului.

La popas se mănâncă stând, nu pe stânci ude. Gunoiul se ia înapoi până la autobuz. Dacă un elev are nevoie de pauză, spune profesorului de grupă, nu iese singur din șir. Autobuzul așteaptă la parcarea de la baza traseului; nu se aleargă pe șosea.

Traseul albastru e marcat cu puncte pe stâncă și cu săgeți la intersecții. Nu se scurtează prin pădure. La km 1 există un izvor; apa de acolo se poate bea doar dacă profesorul confirmă, altfel folosești sticla adusă. Bocancii se verifică sâmbătă seara: șireturi, talpă. Cine vine în șlapi rămâne la autobuz, nu pe traseu.

Lista de prezență se face de două ori: la poarta școlii și la întoarcere. Părinții primesc un mesaj scurt la sosire, nu fotografii din grup. Dacă un elev se simte rău, grupa se oprește; nu se „merge un pic înainte”. Întoarcerea se face pe același traseu, nu pe scurtătura de pe versantul sudic.

Prof. Mara Stoica, coordonator`
  },
  f: {
    litTitle: 'Textul 1 (literar)',
    nonTitle: 'Textul 2 (nonliterar)',
    lit: `Textul 1 (literar)

Bucătăria bunicii miroase a mere tăiate și a lemn cald. Ana stă pe un scăunel prea jos și curăță un măr cu un cuțit scurt, ținând degetul mare departe, cum a învățat. Coaja iese lungă, ca o panglică. Bunica zice că dacă iese întreagă, vine un an bun. Ana nu crede în farmece, dar încearcă totuși, pentru că e frumos să vezi panglica căzând în vas.

La radio, o voce vorbește despre vreme. Afara e noiembrie: geamul are un abur pe care Ana desenează un ochi, apoi îl șterge cu mâneca. Pe masă stau făina, zahărul, un ou și o carte de bucate cu filele lipite de suc. Bunică nu se uită în carte. Știe aluatul din palme.

„Tu pui sarea. Cât un vârf.” Ana pune. Bunica gustă aluatul crud, încuviințează. Cuptorul pocnește. Pisica stă pe pervaz și privește curtea, unde un vecin taie lemne. Ana vrea să povestească despre un test greu. Bunică ascultă, frământând. Nu spune „o să fie bine” din automat. Spune: „Ai citit de două ori cerința?” Ana dă din cap. Apoi tace, pentru că în bucătăria asta întrebarea e destul.

Când plăcinta iese, e prea fierbinte. Așteaptă. Aburul miroase a scorțișoară. Ana taie o felie strâmbă. Bunică râde și taie una dreaptă, pentru ea. Pe masă rămâne cartea închisă. Nu le trebuie. Au făcut treaba cu mâinile și cu o vorbă pusă la timp. Ana duce felia la geam, ca să se răcească. Pe pervaz, pisica se mută fără să ceară. Afară, vecinul a terminat lemnele. Rămâne mirosul de cuptor și liniștea în care o întrebare scurtă ține loc de predică. Ana își amintește cerința testului și, de data asta, o citește în gând de două ori, înainte să se întoarcă la teme.

A doua zi, la școală, Ana nu povestește plăcinta. Povestește, dacă e întrebată, doar sfatul: citește cerința de două ori. Colega de bancă râde. Ana nu se supără. Unele sfaturi țin dacă le ții pentru tine până le folosești. Seara, bunica pune un alt măr pe masă. Ana curăță iar coaja, încercând panglica întreagă. Nu iese întreagă. Bunica zice: „Anul tot poate fi bun.” Ana crede, de data asta, nu în farmece, ci în faptul că ai voie să o iei de la capăt.

Pe caietul de română, scrie o descriere a bucătăriei: miros, radio, pisică, o întrebare scurtă. Nu pune titlu. Nu copiază din cartea de bucate. Lasă aluatul să se înțeleagă din palme, cum a văzut.`,
    non: `Textul 2 (nonliterar)

Regulament de redacție — revista școlii „Glasul curții”
Anul 7, nr. 2

Revista apare de trei ori pe an (noiembrie, martie, iunie). Articolele se trimit până în data de 10 a lunii precedente, pe adresa revista@scoala.ro sau pe hârtie, la sala 8, în cutia „Redacție”.

Ce primim: reportaje de maxim 250 de cuvinte, recenzii de carte, interviuri cu un profesor sau un elev, desene alb-negru. Nu primim teme copiate, mesaje de jignire, fotografii fără acordul persoanelor din imagine.

Fiecare text e citit de doi redactori. Dacă se cere o rescriere, ai 5 zile. Semnătura e obligatorie (prenume + inițiala numelui sau numele întreg, la alegere). Textele fără autor nu se publică.

Ședința de redacție: miercuri, 14:10–15:00, sala 8. Clasa a VIII-a A ține arhiva. Tirajul se afișează la avizier: 80 de exemplare pe holuri, 20 la bibliotecă. Exemplarele rămase se pun, vineri, în cutia de la bibliotecă, nu se aruncă.

Corectura se face cu creionul pe print, nu pe telefon. Dacă un articol e respins, primești o notă scurtă (de ce, ce poți reface), nu un „nu”. Interviurile se înregistrează doar cu acordul celui întrebat; telefonul stă pe masă, vizibil.

Textele se trimit într-un singur fișier, nu în trei mesaje. Titlul e scurt (maximum opt cuvinte). Nu se folosesc majuscule pe tot rândul. Dacă un articol trece de 250 de cuvinte, redacția cere tăiere, nu „îl publicăm așa, că e frumos”. Desenele se predau pe hârtie A4 sau scanate lizibil; nu se fotografiază din caiet, în umbră.

Arhiva se ține în sala 8, în mapa albastră. Exemplarele de la bibliotecă nu se împrumută acasă. Cine vrea un număr vechi citește acolo. Ședința de miercuri începe la timp: cine întârzie peste șapte minute nu mai votează rubrica, dar poate lăsa un articol în cutie.

Redactor-șef: Ioana Pavel, clasa a VIII-a A, sub îndrumarea prof. de română.`
  }
};

function assemble(helpers, key, meta) {
  const t = TEXTS[key];
  return assembleOfficial(helpers, legacyToSpec({ ...meta, literaryKind: meta.literaryKind }, t.lit, t.non));
}

function packs(helpers) {
  const a = assemble(helpers, 'a', {
    id: 'en-ro-a',
    title: 'Model recomandat A — limba română',
    literaryKind: 'poetry',
    aItems: [
      { n: 1, points: 5, prompt: 'Locul principal al întâmplărilor din textul 1 este…', extra: { choices: ['spatele școlii, lângă cireș', 'sala de sport a directorului', 'biblioteca de la Scara 3', 'un peron de gară'] } },
      { n: 2, points: 5, prompt: 'Ce pune Mara la rădăcina cireșului?', extra: { choices: ['o pungă de pânză cu două pietre de râu', 'un caiet de română', 'o sticlă goală', 'un afiș al directorului'] } },
      { n: 3, points: 5, prompt: 'Textul 2 are ca scop principal să…', extra: { choices: ['informeze și să dea reguli de folosire a sălii', 'povestească o întâmplare cu Mara', 'descrie un peisaj de munte', 'argumenteze că trebuie tăiat cireșul'] } },
      { n: 4, points: 5, prompt: 'În ce zile se închide sala de lectură mai devreme, în sesiunea de teste?', extra: { choices: ['miercuri și joi, la 14:30', 'luni și vineri, la 8:00', 'doar sâmbăta, tot timpul', 'niciodată, e deschisă non-stop'] } },
      { n: 5, points: 5, prompt: 'Un element comun celor două texte este ideea de…', extra: { choices: ['grijă pentru un loc al școlii și reguli care îl țin în viață', 'o călătorie cu trenul', 'un concurs de pescuit', 'o plăcintă de mere'] } },
      { n: 6, points: 5, prompt: 'Transcrie, din textul 1, enunțul scris pe biletul din pungă.', extra: { kind: 'short', minWords: 2, lines: 'un enunț din text' } },
      { n: 7, points: 5, prompt: 'Precizează, din textul 2, câte volume poți împrumuta de la ghișeu și pentru câte zile.', extra: { kind: 'short', minWords: 2, lines: 'cifră + zile' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, motivează ideea că o grijă mică (un copac, o sală de lectură) poate schimba atmosfera unei școli. Folosește o secvență din cel puțin unul dintre texte.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul literar (textul 1) cu o operă literară studiată sau citită, evidențiind o valoare comună (grija, statornicia, respectul față de natură sau față de un loc). 50–80 de cuvinte. ${NOVEL_HINT}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'Cuvântul „cireșul” se desparte în silabe…', choices: ['ci-re-șul', 'cir-eșul', 'cire-șul', 'ci-reș-ul'] },
      { n: 2, points: 2, prompt: 'În „trei cireșe tari”, „tari” este…', choices: ['adjectiv / epitet', 'verb la infinitiv', 'prepoziție', 'conjunctie'] },
      { n: 3, points: 2, prompt: 'Un sinonim potrivit, în context, pentru „grăbit” (scrisul de pe bilet) este…', choices: ['iute / precipitat', 'leneș', 'ud', 'oficial'] },
      { n: 4, points: 3, prompt: '„încă” din „pământul de la rădăcină e încă viu” este…', choices: ['adverb', 'substantiv', 'verb', 'prepoziție'] },
      { n: 5, points: 3, prompt: 'În „A săpat un șanț subțire, ca un cerc, și a tăcut.” predicatele verbale sunt…', choices: ['a săpat / a tăcut', 'șanț', 'Mara', 'cerc'] },
      { n: 6, points: 3, prompt: 'Subiectul din „Cărțile din sala de lectură nu se împrumută acasă” este…', choices: ['Cărțile', 'sala', 'acasă', 'lectură'] },
      { n: 7, points: 2, prompt: '„de pânză” din „o pungă de pânză” are funcția de…', choices: ['atribut', 'predicat', 'subiect', 'complement de loc'] },
      { n: 8, points: 3, prompt: 'În „Nu se ține locul cu un caiet.” subiectul este…', choices: ['locul', 'Nu', 'caiet', 'sala'] }
    ],
    composition: 'Redactează un eseu de minimum 150 de cuvinte în care să prezinți mesajul textului 1 (versurile despre cireș și Mara). Valorifică peisajul, două figuri de stil și emoția transmisă. O valoare: grija, discreția, statornicia. Fără titlu sau motto. Pe caiet.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Primul paragraf ancorează cireșul din spatele școlii.', steps: ['Cauți locul, nu tema'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Punga de pânză, două pietre de râu.', steps: ['Detaliu din paragraful 1'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Anunț, tabel, reguli = a informa / a reglementa.', steps: ['Genul textului 2'] },
      'Subiectul I A:4': { letter: 'A', explain: 'Miercuri și joi, 14:30, în sesiunea de teste.', steps: ['Programul din anunț'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Ambele texte țin un loc al școlii: copacul / sala, cu grijă și reguli.', steps: ['Temă comună'] },
      'Subiectul I A:6': { answers: ['Udați-l joi.', 'Udati-l joi', '„Udați-l joi.”'], explain: 'Biletul cere udarea joia.', tokens: ['udati', 'udați', 'joi'], steps: ['Transcrii exact'] },
      'Subiectul I A:7': { answers: ['3 volume, 14 zile', 'maximum 3 volume, 14 zile', '3 / 14'], explain: 'De la ghișeu: maximum 3 volume, 14 zile.', tokens: ['3', '14'], steps: ['Tabelul de împrumut'] },
      'Subiectul I A:8': { answers: ['grijă', 'sala de lectură', 'cireș'], tokens: ['grij', 'cires', 'cireș', 'sala', 'bibliotec', 'reguli', 'scoala', 'școal'], explain: 'Cerința vrea motivare cu secvență, 40–80 de cuvinte.', steps: ['Idee + citat scurt'] },
      'Subiectul I A:9': { answers: ['Amintiri din copilărie', 'Harap-Alb', 'Dumbrava minunată'], tokens: ASSOCIATE_TOKENS, explain: 'Asociere: o operă citită + o valoare comună (grijă/statornicie) + un fapt din fragment și unul din carte. Fără rezumat tocit.', steps: ['Titlul operei', 'Valoarea', 'Două fapte'] },
      'Subiectul I B:1': { letter: 'A', explain: 'ci-re-șul (trei silabe).', steps: ['Despartire'] },
      'Subiectul I B:2': { letter: 'A', explain: '„tari” determină „cireșe” — adjectiv, epitet.', steps: ['Ce parte de vorbire pictează?'] },
      'Subiectul I B:3': { letter: 'A', explain: 'În context: iute, precipitat.', steps: ['Sinonime de context'] },
      'Subiectul I B:4': { letter: 'A', explain: '„încă” modifică „viu” — adverb.', steps: ['Nu e nume, nu e acțiune'] },
      'Subiectul I B:5': { letter: 'A', explain: 'Două predicate verbale coordonate.', steps: ['Ce se face?'] },
      'Subiectul I B:6': { letter: 'A', explain: 'Cine nu se împrumută? Cărțile.', steps: ['Cine? / Ce?'] },
      'Subiectul I B:7': { letter: 'A', explain: 'De pânză determină pungă — atribut.', steps: ['Atributul'] },
      'Subiectul I B:8': { letter: 'A', explain: 'Ce nu se ține? Locul.', steps: ['Subiect'] },
      'Subiectul II:1': {
        letter: '',
        explain: 'Nu există o compunere-model de copiat. Ca profesor, punctez ce cere foaia. Scrie pe caiet; poza e pentru feedback, nu un text gata.',
        ideas: [
          'Încadrare: mesajul / semnificația versurilor, min. 150 de cuvinte, fără titlu/motto.',
          'Conținut: peisaj, două figuri de stil, emoția; o valoare (grijă, discreție).',
          'Organizare: plan, paragrafe, fir (întâi / apoi / așadar).',
          'Stil și corectitudine: acord, punctuație, fără copierea textului 1 cuvânt cu cuvânt.'
        ],
        steps: ['Plan pe ciornă', '150+ cuvinte', 'Două trăsături cu citat', 'Recitire']
      }
    }
  });

  const b = assemble(helpers, 'b', {
    id: 'en-ro-b',
    title: 'Model recomandat B — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'Locul descris în textul 1 este…', extra: { choices: ['un peron de gară', 'o sală de clasă', 'un pod de lemn', 'o bibliotecă'] } },
      { n: 2, points: 5, prompt: 'Ceasul e comparat cu…', extra: { choices: ['un bătrân care aude, dar nu se grăbește', 'o săgeată de tren', 'un porumbel', 'un plic galben'] } },
      { n: 3, points: 5, prompt: 'Târgul din textul 2 se ține…', extra: { choices: ['sâmbătă 8 martie, 10:00–13:00', 'vineri 7 martie, toată ziua', 'doar seara, în cancelarie', 'luni, la prima oră'] } },
      { n: 4, points: 5, prompt: 'Dacă plouă, târgul…', extra: { choices: ['se mută în sala 12, nu se amână', 'se anulează', 'se mută în curte', 'se ține online'] } },
      { n: 5, points: 5, prompt: 'Cele două texte se leagă prin tema…', extra: { choices: ['așteptarea / schimbul într-un loc de trecere al școlii sau al gării', 'pescuitul la râu', 'un laborator de chimie', 'o plăcintă'] } },
      { n: 6, points: 5, prompt: 'Precizează câte persoane stau pe bancă, în textul 1, fără să se privească.', extra: { kind: 'short', minWords: 1, lines: 'un număr' } },
      { n: 7, points: 5, prompt: 'Transcrie din textul 2 ce primești dacă aduci un obiect școlar în stare bună.', extra: { kind: 'short', minWords: 2, lines: 'un cuvânt din anunț' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, explică de ce locurile de așteptare (un peron, un hol de târg) spun ceva despre oameni, chiar când nimeni nu vorbește. Folosește o secvență.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul literar cu o operă citită, evidențiind așteptarea, drumul sau întâlnirea. 50–80 de cuvinte. ${NOVEL_HINT}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'Cuvântul „peronul” are accentul pe…', choices: ['e (pe-RON-ul)', 'pe (PE-ronul)', 'ultima silabă u', 'nu are accent'] },
      { n: 2, points: 2, prompt: '„foarte” din „linii de caiet foarte lungi” este…', choices: ['adverb de mod', 'substantiv', 'verb', 'articol'] },
      { n: 3, points: 2, prompt: 'Un atribut din „Un ceas rotund, cu sticla fisurată” este…', choices: ['rotund / fisurată', 'ceas', 'Un', 'anunțurilor'] },
      { n: 4, points: 3, prompt: 'Antonim de context pentru „se amână” (târgul nu se amână) e…', choices: ['se ține / se face la timp', 'se uită', 'se vinde', 'se pictează'] },
      { n: 5, points: 3, prompt: 'Predicatul din „Clasa a VIII-a B ține lista” este…', choices: ['ține', 'Clasa', 'lista', 'VIII-a'] },
      { n: 6, points: 3, prompt: 'În „Nimeni nu se uită la el de două ori.” subiectul este…', choices: ['Nimeni', 'el', 'ori', 'ceasul'] },
      { n: 7, points: 2, prompt: '„de automat” din „cafea de automat” e…', choices: ['atribut', 'predicat', 'subiect', 'complement direct'] },
      { n: 8, points: 3, prompt: '„Nu se vând lucruri pe bani.” predicatul este…', choices: ['nu se vând', 'lucruri', 'bani', 'târgul'] }
    ],
    composition: 'Scrie o compunere de minimum 150 de cuvinte în care să narezi, la persoana I, o așteptare (gară, hol, cabinet) în care se întâmplă ceva mic. Loc vizibil, o treaptă, un capăt. Fără titlu. Minimum 150 de cuvinte.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Peronul 2 e locul.', steps: ['Primul cuvânt'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Comparația din primul paragraf.', steps: ['„ca un bătrân…”'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Data și orele din anunț.', steps: ['Cine, când, unde'] },
      'Subiectul I A:4': { letter: 'A', explain: 'Sala 12, nu amânare.', steps: ['Condiția de ploaie'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Loc de trecere + oameni care așteaptă sau schimbă ceva fără bani.', steps: ['Temă comună'] },
      'Subiectul I A:6': { answers: ['trei', '3', '3 persoane'], tokens: ['trei', '3'], explain: 'Trei oameni pe bancă.', steps: ['Numără'] },
      'Subiectul I A:7': { answers: ['un bon', 'bon'], tokens: ['bon'], explain: 'Aduci obiect, primești un bon.', steps: ['Regula târgului'] },
      'Subiectul I A:8': { answers: ['așteptare', 'peron', 'oameni'], tokens: ['astept', 'aștept', 'peron', 'hol', 'oamen', 'tac', 'tacere'], explain: 'Motivare cu secvență.', steps: ['Idee + text'] },
      'Subiectul I A:9': { answers: ['Toate pânzele sus', 'Amintiri'], tokens: ASSOCIATE_TOKENS, explain: 'Operă + drum/așteptare + două fapte.', steps: ['Titlu', 'Valoare', 'Fapte'] },
      'Subiectul I B:1': { letter: 'A', explain: 'pe-RON-ul.', steps: ['Accent'] },
      'Subiectul I B:2': { letter: 'A', explain: 'Modifică adjectivul „lungi”.', steps: ['Adverb'] },
      'Subiectul I B:3': { letter: 'A', explain: 'rotund → ceas; fisurată → sticlă.', steps: ['Atribut'] },
      'Subiectul I B:4': { letter: 'A', explain: 'NU se amână = se ține.', steps: ['Antonim de context'] },
      'Subiectul I B:5': { letter: 'A', explain: 'Ce face clasa? Ține.', steps: ['Predicat'] },
      'Subiectul I B:6': { letter: 'A', explain: 'Cine nu se uită? Nimeni.', steps: ['Subiect'] },
      'Subiectul I B:7': { letter: 'A', explain: 'Determină cafea.', steps: ['Atribut'] },
      'Subiectul I B:8': { letter: 'A', explain: 'Acțiunea: nu se vând.', steps: ['Predicat'] },
      'Subiectul II:1': {
        letter: '',
        explain: 'Fără text-model. Narațiune la persoana I, așteptare + treaptă mică, min. 150 de cuvinte, pe caiet.',
        ideas: [
          'Încadrare: narațiune, persoana I, loc de așteptare.',
          'Conținut: ceva mic se întâmplă; capăt vizibil.',
          'Organizare, stil, corectitudine.'
        ],
        steps: ['Plan', 'Persoana I', '150+', 'Recitire']
      }
    }
  });

  const c = assemble(helpers, 'c', {
    id: 'en-ro-c',
    title: 'Model recomandat C — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'Ira trece…', extra: { choices: ['un pod de lemn peste un pârâu', 'o șosea de pe peron', 'o sală de lectură', 'un târg de caiete'] } },
      { n: 2, points: 5, prompt: 'Sacoșa Irei conține, la dus…', extra: { choices: ['pâine', 'cireșe', 'cărți de laborator', 'monede'] } },
      { n: 3, points: 5, prompt: 'Ca să intri în laborator trebuie…', extra: { choices: ['halat și păr prins', 'doar ghiozdanul', 'bilet de tren', '3 volume'] } },
      { n: 4, points: 5, prompt: 'Vineri laboratorul este…', extra: { choices: ['închis pentru inventar', 'deschis 12:10–14:00', 'mutat pe peron', 'fără reguli'] } },
      { n: 5, points: 5, prompt: 'Cele două texte vorbesc, împreună, despre…', extra: { choices: ['trecerea atentă și regulile care te țin în siguranță', 'un festival de muzică', 'o rețetă de plăcintă', 'un orar de tren'] } },
      { n: 6, points: 5, prompt: 'Transcrie comparația cu care începe textul 1 (podul e ca…).', extra: { kind: 'short', minWords: 3, lines: 'grupul comparativ' } },
      { n: 7, points: 5, prompt: 'Precizează ce faci la un accident mic în laborator (trei verbe din regulament).', extra: { kind: 'short', minWords: 3, lines: 'trei acțiuni' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, arată de ce Ira se uită la mal, nu în jos, și ce regulă nescrisă respectă. Folosește textul.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă citită în care un drum, un pod sau o încercare cere curaj și grijă. 50–80 de cuvinte. ${NOVEL_HINT}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: '„Nu se uită în jos.” predicatul este…', choices: ['nu se uită', 'jos', 'Ira', 'podul'] },
      { n: 2, points: 2, prompt: '„de lemn” din „Podul de lemn” e…', choices: ['atribut', 'predicat', 'subiect', 'complement direct'] },
      { n: 3, points: 2, prompt: 'Un antonim potrivit pentru „închis” (vineri, laboratorul) este…', choices: ['deschis', 'ud', 'lung', 'galben'] },
      { n: 4, points: 3, prompt: 'În „Nu se gustă substanțe.” subiectul este…', choices: ['substanțe', 'Nu', 'laboratorul', 'halat'] },
      { n: 5, points: 3, prompt: '„ca o propoziție neterminată” este…', choices: ['o comparație', 'un verb la gerunziu', 'un subiect', 'un articol'] },
      { n: 6, points: 3, prompt: 'Cuvântul „pârâul” se desparte…', choices: ['pâ-râ-ul', 'pâr-âul', 'pâ-râul', 'pârâu-l'] },
      { n: 7, points: 2, prompt: '„imediat” din „speli imediat” este…', choices: ['adverb de timp', 'substantiv', 'prepoziție', 'interjecție'] },
      { n: 8, points: 3, prompt: 'În „Ira îi rupe o coajă.” complementul direct este…', choices: ['o coajă', 'Ira', 'îi', 'mal'] }
    ],
    composition: 'Scrie o compunere de minimum 150 de cuvinte în care să argumentezi, cu două argumente și exemple de elev, de ce merită (sau nu) reguli stricte într-un laborator școlar. Teză, argumente, concluzie. Fără titlu. Minimum 150 de cuvinte.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Pod de lemn, pârâu.', steps: ['Loc'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Sacoșă cu pâine.', steps: ['Obiect'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Prima regulă din anunț.', steps: ['Acces'] },
      'Subiectul I A:4': { letter: 'A', explain: 'Vineri închis pentru inventar.', steps: ['Program'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Atenție la trecere / reguli de siguranță.', steps: ['Temă comună'] },
      'Subiectul I A:6': { answers: ['ca o propoziție neterminată', 'o propoziție neterminată'], tokens: ['propozitie', 'propoziție', 'neterminat'], explain: 'Comparația din prima frază.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['speli, anunți, completezi fișa', 'speli anunti completezi'], tokens: ['speli', 'anunt', 'anunț', 'fișa', 'fisa', 'completez'], explain: 'Trei verbe din regulament.', steps: ['Accident mic'] },
      'Subiectul I A:8': { answers: ['mal', 'goluri', 'câine'], tokens: ['mal', 'jos', 'gol', 'caine', 'câine', 'regula'], explain: 'Motivare din text.', steps: ['Idee + secvență'] },
      'Subiectul I A:9': { answers: ['Harap-Alb'], tokens: ASSOCIATE_TOKENS, explain: 'Drum/încercare + operă citită.', steps: ['Titlu', 'Valoare'] },
      'Subiectul I B:1': { letter: 'A', explain: 'Acțiunea: nu se uită.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'De lemn determină podul.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'închis ↔ deschis.', steps: ['Antonim'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Ce nu se gustă? Substanțe.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'ca + imagine = comparație.', steps: ['Figură'] },
      'Subiectul I B:6': { letter: 'A', explain: 'pâ-râ-ul.', steps: ['Silabe'] },
      'Subiectul I B:7': { letter: 'A', explain: 'Când? Imediat — adverb.', steps: ['Adverb'] },
      'Subiectul I B:8': { letter: 'A', explain: 'Ce rupe? O coajă.', steps: ['CD'] },
      'Subiectul II:1': {
        letter: '',
        explain: 'Text argumentativ, nu poveste. Teză vizibilă, 2 argumente de elev, concluzie, 150+ cuvinte, pe caiet.',
        ideas: ['Teză da/nu despre reguli de laborator', 'Două argumente (siguranță, timp, respect) cu exemplu', 'Concluzie fără slogan gol'],
        steps: ['Teză', '2 argumente', '150+', 'Recitire']
      }
    }
  });

  const d = assemble(helpers, 'd', {
    id: 'en-ro-d',
    title: 'Model generat D — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'Fereastra lui Teo dă spre…', extra: { choices: ['curtea interioară', 'strada principală', 'un peron', 'biblioteca'] } },
      { n: 2, points: 5, prompt: 'Ce atârnă pe sârmă, vizavi?', extra: { choices: ['un prosop albastru, încă ud', 'un caiet', 'un covor', 'un ghiveci'] } },
      { n: 3, points: 5, prompt: 'Textul 2 este, ca scop, un…', extra: { choices: ['anunț cu program și reguli de colectare', 'basm', 'portret', 'jurnal intim'] } },
      { n: 4, points: 5, prompt: 'Dacă plouă, colectarea…', extra: { choices: ['se mută în sala 4, nu se anulează', 'se amână o săptămână', 'se face doar vineri', 'se anulează'] } },
      { n: 5, points: 5, prompt: 'Un fir comun celor două texte este…', extra: { choices: ['curtea școlii / a blocului ca loc care continuă, cu sau fără tine', 'un pod peste pârâu', 'un tren întârziat', 'un laborator'] } },
      { n: 6, points: 5, prompt: 'Transcrie rândul pe care îl scrie Teo prima dată în caiet.', extra: { kind: 'short', minWords: 3, lines: 'citat' } },
      { n: 7, points: 5, prompt: 'Precizează câte saci trebuie strânși ca să existe ora de lectură în curte.', extra: { kind: 'short', minWords: 1, lines: 'un număr' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, comentează gestul de a închide geamul: e retragere, grijă sau constatare? Folosește textul 1.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă în care casa, curtea sau familia țin un loc central. 50–80 de cuvinte. ${NOVEL_HINT}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'În „Teo numără ghivecele” predicatul este…', choices: ['numără', 'Teo', 'ghivecele', 'fereastra'] },
      { n: 2, points: 2, prompt: '„încă” din „încă ud” e…', choices: ['adverb', 'substantiv', 'verb', 'prepoziție'] },
      { n: 3, points: 2, prompt: 'Un antonim potrivit pentru „închide” este…', choices: ['deschide', 'numără', 'scrie', 'ascultă'] },
      { n: 4, points: 3, prompt: 'Subiectul din „Clasa a VIII-a C ține tabelul” este…', choices: ['Clasa a VIII-a C', 'tabelul', 'ține', 'aprilie'] },
      { n: 5, points: 3, prompt: '„ca un stâlp” este…', choices: ['comparație', 'epitet izolat', 'dialog', 'un subiect'] },
      { n: 6, points: 3, prompt: '„albastru” din „prosop albastru” e…', choices: ['atribut / adjectiv', 'verb', 'prepoziție', 'interjecție'] },
      { n: 7, points: 2, prompt: 'Cuvântul „ghivecele” se desparte…', choices: ['ghi-ve-ce-le', 'ghiv-ece-le', 'ghi-vece-le', 'ghive-cele'] },
      { n: 8, points: 3, prompt: 'În „Nu se anulează.” predicatul este…', choices: ['nu se anulează', 'Nu', 'colectarea', 'sala'] }
    ],
    composition: 'Scrie o descriere de minimum 150 de cuvinte a unei curți interioare pe care o cunoști. Două simțuri, ordine în spațiu, fără poveste lungă și fără să copiezi textul 1. Fără titlu.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Curtea interioară, nu strada.', steps: ['Locul'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Prosop albastru, încă ud.', steps: ['Detaliu'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Anunț, program, reguli.', steps: ['Genul'] },
      'Subiectul I A:4': { letter: 'A', explain: 'Sala 4, nu se anulează.', steps: ['Rezervă'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Curtea continuă; colectarea o ține în ordine.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['Am închis geamul.', 'Am inchis geamul'], tokens: ['inchis', 'închis', 'geamul'], explain: 'Primul rând din caiet.', steps: ['Citat'] },
      'Subiectul I A:7': { answers: ['12', '12 saci', 'cel puțin 12'], tokens: ['12'], explain: 'Premiul dacă sunt cel puțin 12 saci.', steps: ['Anunț'] },
      'Subiectul I A:8': { answers: ['închide', 'constatare', 'praf'], tokens: ['geam', 'inchid', 'închid', 'praf', 'afara', 'afară', 'continua'], explain: 'Comentariu cu text.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Amintiri din copilărie'], tokens: ASSOCIATE_TOKENS, explain: 'Casă/curte/familie + operă.', steps: ['Titlu', 'Valoare'] },
      'Subiectul I B:1': { letter: 'A', explain: 'Ce face Teo? Numără.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: '„încă” modifică „ud”.', steps: ['Adverb'] },
      'Subiectul I B:3': { letter: 'A', explain: 'închide ↔ deschide.', steps: ['Antonim'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Cine ține tabelul? Clasa a VIII-a C.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'ca + stâlp = comparație.', steps: ['Figură'] },
      'Subiectul I B:6': { letter: 'A', explain: 'Albastru determină prosop.', steps: ['Atribut'] },
      'Subiectul I B:7': { letter: 'A', explain: 'ghi-ve-ce-le.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'Acțiunea: nu se anulează.', steps: ['Predicat'] },
      'Subiectul II:1': {
        letter: '',
        explain: 'Descriere de loc, 2 simțuri, ordine spațială, 150+, pe caiet, fără a copia curtea lui Teo.',
        ideas: ['Spațiu vizibil', 'Două simțuri', 'Fără narațiune lungă'],
        steps: ['Plan spațial', '150+', 'Recitire']
      }
    }
  });

  const e = assemble(helpers, 'e', {
    id: 'en-ro-e',
    title: 'Model generat E — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'Luca stă pe mal, lângă…', extra: { choices: ['bunicul care pescuiește', 'Mara și cireșul', 'un laborator', 'un peron'] } },
      { n: 2, points: 5, prompt: 'Ce face bunicul cu peștele mic?', extra: { choices: ['îl pune înapoi în râu', 'îl prăjește imediat', 'îl vinde la târg', 'îl uită pe piatră'] } },
      { n: 3, points: 5, prompt: 'Drumeția din textul 2 e programată…', extra: { choices: ['duminică 19 octombrie, întâlnire 7:30 la poartă', 'sâmbătă seara, în hol', 'vineri, la laborator', 'luni dimineața, în clasă'] } },
      { n: 4, points: 5, prompt: 'Câte locuri sunt la înscriere?', extra: { choices: ['32', '8', '150', '3'] } },
      { n: 5, points: 5, prompt: 'Textele se leagă prin…', extra: { choices: ['ieșirea în natură cu reguli și cu răbdare, nu cu spectacol', 'un anunț de bibliotecă', 'o caracterizare de personaj de laborator', 'un ceas de gară'] } },
      { n: 6, points: 5, prompt: 'Transcrie sfatul bunicului despre pietre.', extra: { kind: 'short', minWords: 3, lines: 'enunț' } },
      { n: 7, points: 5, prompt: 'Precizează ce se întâmplă dacă e furtună (textul 2).', extra: { kind: 'short', minWords: 4, lines: 'o frază' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, explică de ce găleata goală nu e un eșec. Folosește textul 1.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă despre natură, bunic, drum sau învățătură tăcută. 50–80 de cuvinte. ${NOVEL_HINT}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'În „Bunicul nu vorbește mult” predicatul este…', choices: ['nu vorbește', 'Bunicul', 'mult', 'râul'] },
      { n: 2, points: 2, prompt: '„argintiu” din „pește mic, argintiu” e…', choices: ['atribut / adjectiv', 'verb', 'prepoziție', 'subiect'] },
      { n: 3, points: 2, prompt: 'Un sinonim pentru „răbdare” (ideea așteptării la undiță) e…', choices: ['așteptare fără grabă', 'furie', 'spectacol', 'întârziere de tren'] },
      { n: 4, points: 3, prompt: 'Subiectul din „O rață trece cu puii” este…', choices: ['O rață', 'puii', 'trece', 'undița'] },
      { n: 5, points: 3, prompt: '„ca pe o ușă care nu trebuie trântită” este…', choices: ['comparație', 'un subiect', 'un articol hotărât', 'o interjecție'] },
      { n: 6, points: 3, prompt: '„Nu se iese din potecă.” predicatul este…', choices: ['nu se iese', 'potecă', 'Nu', 'grupurile'] },
      { n: 7, points: 2, prompt: 'Cuvântul „undița” se desparte…', choices: ['un-di-ța', 'und-ița', 'u-ndi-ța', 'undi-ța'] },
      { n: 8, points: 3, prompt: '„înceț” nu e în text; „încet” din „Trage încet” e…', choices: ['adverb de mod', 'substantiv', 'verb la infinitiv', 'prepoziție'] }
    ],
    composition: 'Scrie o narațiune de minimum 150 de cuvinte, la persoana I, despre o ieșire în natură (râu, pădure, chei) în care înveți ceva fără predică lungă. Un loc, o treaptă, un capăt. Fără titlu.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Bunicul pescuiește; Luca e lângă el.', steps: ['Personaje'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Peștele mic e pus înapoi.', steps: ['Fapt'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Duminică 19 octombrie, 7:30, poarta.', steps: ['Anunț'] },
      'Subiectul I A:4': { letter: 'A', explain: '32 de locuri.', steps: ['Cifră'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Natură + reguli + răbdare.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['Nu arunci cu pietre.', 'Nu arunci cu pietre. Nu e loc de spectacol.'], tokens: ['pietre', 'arunci', 'spectacol'], explain: 'Sfatul de pe mal.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['se amână pentru 26 octombrie', 'se amana 26'], tokens: ['amana', 'amână', '26', 'furtuna', 'furtună'], explain: 'Condiția de furtună.', steps: ['Anunț'] },
      'Subiectul I A:8': { answers: ['împreună', 'seara', 'râu'], tokens: ['goala', 'goală', 'impreuna', 'împreună', 'rand', 'rând', 'bunic', 'seara'], explain: 'Golul găleții ≠ eșec.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Amintiri din copilărie', 'Dumbrava minunată'], tokens: ASSOCIATE_TOKENS, explain: 'Natură / bunic / învățătură.', steps: ['Titlu', 'Valoare'] },
      'Subiectul I B:1': { letter: 'A', explain: 'nu vorbește.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'argintiu determină pește.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'Așteptare fără grabă.', steps: ['Sinonime'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Cine trece? O rață.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'ca + ușă = comparație.', steps: ['Figură'] },
      'Subiectul I B:6': { letter: 'A', explain: 'nu se iese.', steps: ['Predicat'] },
      'Subiectul I B:7': { letter: 'A', explain: 'un-di-ța.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'Cum trage? Încet — adverb.', steps: ['Adverb'] },
      'Subiectul II:1': {
        letter: '',
        explain: 'Narațiune la persoana I, natură, o învățătură fără predică, 150+, pe caiet.',
        ideas: ['Loc vizibil', 'O treaptă', 'Capăt', 'Fără a copia râul lui Luca cuvânt cu cuvânt'],
        steps: ['Plan', '150+', 'Recitire']
      }
    }
  });

  const f = assemble(helpers, 'f', {
    id: 'en-ro-f',
    title: 'Model generat F — limba română',
    aItems: [
      { n: 1, points: 5, prompt: 'Ana curăță mere în…', extra: { choices: ['bucătăria bunicii', 'laboratorul școlii', 'sala de lectură', 'un peron'] } },
      { n: 2, points: 5, prompt: 'Bunica știe aluatul…', extra: { choices: ['din palme, fără să se uite în carte', 'doar din telefon', 'dintr-un anunț de avizier', 'de la un regulament de laborator'] } },
      { n: 3, points: 5, prompt: 'Revista școlii apare de…', extra: { choices: ['trei ori pe an (noiembrie, martie, iunie)', 'în fiecare luni', 'doar în vacanță', 'o dată la opt ani'] } },
      { n: 4, points: 5, prompt: 'Un text fără autor…', extra: { choices: ['nu se publică', 'primește premiul întâi', 'e afișat pe scară', 'intră automat în arhivă'] } },
      { n: 5, points: 5, prompt: 'Firul comun: …', extra: { choices: ['o treabă făcută cu grijă (aluat / articol), cu reguli tăcute sau scrise', 'un pod peste pârâu', 'un tren', 'o undiță'] } },
      { n: 6, points: 5, prompt: 'Transcrie întrebarea bunicii despre test.', extra: { kind: 'short', minWords: 4, lines: 'enunț' } },
      { n: 7, points: 5, prompt: 'Precizează până la ce dată se trimit articolele (ziua lunii precedente).', extra: { kind: 'short', minWords: 1, lines: 'o dată' } },
      { n: 8, points: 5, prompt: 'În 40–80 de cuvinte, arată de ce o vorbă pusă la timp (în bucătărie sau în redacție) e mai de folos decât un sfat gol. Folosește un text.', extra: { kind: 'short', minWords: 40, lines: '40–80 de cuvinte' } },
      { n: 9, points: 10, prompt: `Asociază fragmentul cu o operă despre familie, învățătură sau casa copilăriei. 50–80 de cuvinte. ${NOVEL_HINT}`, extra: { kind: 'associate', minWords: 50, lines: '50–80 de cuvinte' } }
    ],
    bItems: [
      { n: 1, points: 2, prompt: 'În „Ana stă pe un scăunel” predicatul este…', choices: ['stă', 'Ana', 'scăunel', 'mere'] },
      { n: 2, points: 2, prompt: '„scurt” din „cuțit scurt” e…', choices: ['atribut / adjectiv', 'verb', 'prepoziție', 'subiect'] },
      { n: 3, points: 2, prompt: 'Un sinonim pentru „încuviințează” e…', choices: ['aprobă / e de acord', 'țipă', 'anulează', 'amână'] },
      { n: 4, points: 3, prompt: 'Subiectul din „Pisica stă pe pervaz” este…', choices: ['Pisica', 'pervaz', 'stă', 'curtea'] },
      { n: 5, points: 3, prompt: '„ca o panglică” este…', choices: ['comparație', 'un predicat', 'un articol', 'o prepoziție'] },
      { n: 6, points: 3, prompt: '„Nu primim teme copiate.” predicatul este…', choices: ['nu primim', 'teme', 'Nu', 'revista'] },
      { n: 7, points: 2, prompt: 'Cuvântul „bucătăria” se desparte…', choices: ['bu-că-tă-ri-a', 'buc-ătăria', 'bu-cătă-ria', 'bucă-tăria'] },
      { n: 8, points: 3, prompt: '„obligatorie” din „Semnătura e obligatorie” e…', choices: ['nume predicativ / adjectiv', 'verb la infinitiv', 'prepoziție', 'interjecție'] }
    ],
    composition: 'Scrie o compunere de minimum 150 de cuvinte în care să prezinți o întâmplare dintr-o bucătărie, o redacție sau un loc de lucru în familie, din care rămâne o vorbă utilă. Narațiune, persoana I sau III consecventă. Fără titlu.',
    barem: {
      'Subiectul I A:1': { letter: 'A', explain: 'Bucătăria bunicii.', steps: ['Loc'] },
      'Subiectul I A:2': { letter: 'A', explain: 'Aluatul din palme, cartea stă închisă.', steps: ['Fapt'] },
      'Subiectul I A:3': { letter: 'A', explain: 'Trei numere pe an.', steps: ['Anunț'] },
      'Subiectul I A:4': { letter: 'A', explain: 'Fără autor nu se publică.', steps: ['Regulă'] },
      'Subiectul I A:5': { letter: 'A', explain: 'Grijă + regulă, în bucătărie și în redacție.', steps: ['Temă'] },
      'Subiectul I A:6': { answers: ['Ai citit de două ori cerința?', 'Ai citit de doua ori cerinta'], tokens: ['citit', 'cerinta', 'cerința', 'doua', 'două'], explain: 'Întrebarea bunicii.', steps: ['Transcrii'] },
      'Subiectul I A:7': { answers: ['până în 10', 'data de 10', '10'], tokens: ['10'], explain: 'Până în 10 ale lunii precedente.', steps: ['Regulament'] },
      'Subiectul I A:8': { answers: ['cerință', 'vorbă', 'sfat'], tokens: ['cerint', 'cerinț', 'vorbe', 'sfat', 'test', 'rescriere', 'bunic'], explain: 'Motivare.', steps: ['Idee'] },
      'Subiectul I A:9': { answers: ['Amintiri din copilărie'], tokens: ASSOCIATE_TOKENS, explain: 'Familie / casă / învățătură.', steps: ['Titlu', 'Valoare'] },
      'Subiectul I B:1': { letter: 'A', explain: 'stă.', steps: ['Predicat'] },
      'Subiectul I B:2': { letter: 'A', explain: 'scurt determină cuțit.', steps: ['Atribut'] },
      'Subiectul I B:3': { letter: 'A', explain: 'încuviințează = aprobă.', steps: ['Sinonime'] },
      'Subiectul I B:4': { letter: 'A', explain: 'Pisica.', steps: ['Subiect'] },
      'Subiectul I B:5': { letter: 'A', explain: 'ca + panglică.', steps: ['Comparație'] },
      'Subiectul I B:6': { letter: 'A', explain: 'nu primim.', steps: ['Predicat'] },
      'Subiectul I B:7': { letter: 'A', explain: 'bu-că-tă-ri-a.', steps: ['Silabe'] },
      'Subiectul I B:8': { letter: 'A', explain: 'Nume predicativ.', steps: ['NP'] },
      'Subiectul II:1': {
        letter: '',
        explain: 'Narațiune cu o vorbă utilă, 150+, pe caiet, fără a copia bucătăria Anei.',
        ideas: ['Loc de lucru în familie sau redacție', 'O treaptă', 'O vorbă care rămâne'],
        steps: ['Plan', '150+', 'Recitire']
      }
    }
  });

  const merged = {
    a: shuffleMcqBundle(a, rng(seedFromHex('enroa01'))),
    b: shuffleMcqBundle(b, rng(seedFromHex('enrob02'))),
    c: shuffleMcqBundle(c, rng(seedFromHex('enroc03'))),
    d: shuffleMcqBundle(d, rng(seedFromHex('enrod04'))),
    e: shuffleMcqBundle(e, rng(seedFromHex('enroe05'))),
    f: shuffleMcqBundle(f, rng(seedFromHex('enrof06')))
  };
  const extra = require('./enRomanaExtra').packs(helpers);
  Object.entries(extra).forEach(([key, bundle], index) => {
    merged[key] = shuffleMcqBundle(bundle, rng(seedFromHex(`enro${key}${String(index + 7).padStart(2, '0')}`)));
  });
  return merged;
}

function generateRoPaper(helpers, rand, seed) {
  const generated = require('./enRomanaGenerate').generate(helpers, rand, seed);
  return shuffleMcqBundle(generated, rand);
}

module.exports = { packs, generateRoPaper, wordCount, TEXTS, NOVEL_HINT, shuffleMcqBundle };
