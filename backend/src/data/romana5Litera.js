// Planul clasei a V-a, după cuprinsul manualului aprobat:
// Marilena Pavelescu, Limba și literatura română, clasa a V-a,
// Editura Litera, 2022, cod manuale.edu.ro A1249,
// aprobat prin OM 4065/16.06.2022, conform OMEN 3393/28.02.2017.
//
// Lecțiile vecine din cuprins sunt unite acolo unde spuneau aceeași idee
// pe una-două pagini. Textul de aici e un rezumat propriu al temelor
// oficiale. Nu copiem fragmentele literare, citatele și exercițiile.

function lesson(id, title, ...paragraphs) {
  const block = paragraphs[0];
  if (paragraphs.length === 1 && block && typeof block === 'object' && block.theory) {
    const example = String(block.example || '').replace(/^Exemplu lucrat:\s*/i, '');
    const platter = [block.theory, `Exemplu lucrat: ${example}`, block.tryThis, block.recap].join('\n\n');
    return {
      id,
      title,
      platter,
      theory: block.theory,
      example,
      tryThis: block.tryThis,
      recap: block.recap
    };
  }
  return { id, title, platter: paragraphs.join('\n\n') };
}

const MANUAL = {
  code: 'A1249',
  title: 'Limba și literatura română. Manual pentru clasa a V-a',
  author: 'Marilena Pavelescu',
  publisher: 'Editura Litera',
  year: 2022,
  isbn: '978-606-33-9056-2',
  approval: 'Ordinul ministrului educației nr. 4065/16.06.2022',
  curriculum: 'OMEN nr. 3393/28.02.2017',
  sourceUrl: 'https://manuale.edu.ro/manuale/Clasa%20a%20V-a/Limba%20si%20literatura%20romana/R1JVUCBFRElUT1JJQUwg/A1249.pdf'
};

const COMPETENCIES = [
  { code: '1', text: 'Participarea la interacțiuni verbale în diverse situații de comunicare, prin receptarea și producerea textului oral.' },
  { code: '1.1', text: 'Identificarea temei, a unor informații esențiale și de detaliu, a intențiilor de comunicare explicite și/sau a comportamentelor care exprimă emoții din texte narative, monologate sau dialogate.' },
  { code: '1.2', text: 'Prezentarea orală, pe baza unor repere date de profesor, a unor informații și a unor idei, exprimând opinii, emoții și sentimente prin participarea la discuții pe teme familiare, de interes sau pornind de la textele ascultate/citite.' },
  { code: '1.3', text: 'Identificarea unor elemente paraverbale și nonverbale, în funcție de situația de comunicare.' },
  { code: '1.4', text: 'Realizarea unei interacțiuni verbale cu doi interlocutori, folosind strategii simple de ascultare activă și manifestând un comportament comunicativ politicos față de interlocutor(i).' },
  { code: '2', text: 'Receptarea textului scris de diverse tipuri.' },
  { code: '2.1', text: 'Identificarea informațiilor importante din texte literare și nonliterare, continue, discontinue și multimodale.' },
  { code: '2.2', text: 'Identificarea temei și a ideilor principale și secundare din texte diverse.' },
  { code: '2.3', text: 'Formularea unui răspuns personal și/sau a unui răspuns creativ pe marginea unor texte de diferite tipuri, pe teme familiare.' },
  { code: '2.4', text: 'Manifestarea interesului și focalizarea atenției în timpul lecturii unor texte pe teme familiare.' },
  { code: '2.5', text: 'Observarea comportamentelor și a atitudinilor de lectură, identificând aspectele care necesită îmbunătățire.' },
  { code: '3', text: 'Redactarea textului scris de diverse tipuri.' },
  { code: '3.1', text: 'Redactarea unui text scurt pe teme familiare, având în vedere etapele procesului de scriere și structurile specifice, pentru a comunica idei și informații sau pentru a relata experiențe trăite sau imaginate.' },
  { code: '3.2', text: 'Redactarea, individual și/sau în echipă, a unui text simplu, pe o temă familiară, cu integrarea unor imagini, desene, scheme.' },
  { code: '3.3', text: 'Analizarea constantă a propriului scris/a unor texte diverse din punctul de vedere al corectitudinii, al lizibilității, al coerenței și al clarității.' },
  { code: '3.4', text: 'Observarea atitudinilor manifestate în procesul redactării unui text, identificând aspectele care necesită îmbunătățire.' },
  { code: '4', text: 'Utilizarea corectă, adecvată și eficientă a limbii în procesul comunicării orale și scrise.' },
  { code: '4.1', text: 'Utilizarea achizițiilor sintactice și morfologice de bază ale limbii române standard pentru înțelegerea și exprimarea corectă a intențiilor comunicative.' },
  { code: '4.2', text: 'Aplicarea achizițiilor lexicale și semantice de bază, în procesul de înțelegere și de exprimare corectă a intențiilor comunicative.' },
  { code: '4.3', text: 'Monitorizarea propriei pronunții și scrieri și a pronunției și scrierii celorlalți, valorificând achizițiile fonetice de bază.' },
  { code: '4.4', text: 'Respectarea normelor ortografice și ortoepice în utilizarea structurilor fonetice, lexicale și sintactico-morfologice în interacțiunea verbală.' },
  { code: '4.5', text: 'Utilizarea competenței lingvistice în corelație cu gândirea logică/analogică, în procesul de învățare pe tot parcursul vieții.' },
  { code: '5', text: 'Exprimarea identității lingvistice și culturale proprii în context național și internațional.' },
  { code: '5.1', text: 'Asocierea unor experiențe proprii de viață și de lectură cu acelea provenind din alte culturi.' },
  { code: '5.2', text: 'Identificarea unor valori culturale promovate în textele autorilor români din diferite perioade istorice.' }
];

const UNITS = [
  {
    id: 'evaluare-initiala',
    title: 'Evaluare inițială',
    inOwnWords:
      'Înainte de unități, manualul verifică cum citești un text narativ scurt. Textul-suport indicat în cuprins este D-l Goe…, de I.L. Caragiale. Aici nu reluăm povestirea: prinzi tema, detaliul, intenția și un răspuns scurt al tău.',
    toc: ['Evaluare inițială (D-l Goe…, de I.L. Caragiale, text-suport)'],
    glossary: [
      { term: 'text-suport', meaning: 'Textul pe care se sprijină întrebările. Îl citești înainte să răspunzi.' },
      { term: 'informație esențială', meaning: 'Fără ea, nu mai știi ce s-a întâmplat.' }
    ],
    lessons: [
      lesson(
        'text-suport',
        'Textul-suport al evaluării',
        'Evaluarea inițială nu e un test de memorie din vara trecută. E o oglindă: cum citești acum un text pe care nu l-ai pregătit. În cuprins, textul-suport este schița D-l Goe…, de Ion Luca Caragiale. O citești în manual; aici reții doar rolul ei.',
        'Citești o dată ca să vezi cine e și ce face. A doua oară cauți ce e esențial și ce e amănunt (o haină, o exclamație, un loc). Nu sări la întrebări înainte de text.',
        'Exemplu lucrat: dacă cineva te întreabă „unde se întâmplă?”, răspunsul vine din text, nu din ce ți se pare că „ar fi” o schiță de Caragiale. Dacă nu găsești locul, recitești, nu inventezi.',
        'Reține: textul e sursa. Părerea ta vine după, nu în locul faptelor.'
      ),
      lesson(
        'esential',
        'Esențial și detaliu',
        'Informația esențială răspunde la cine, ce face, ce iese. Detaliul colorează, dar firul rămâne și fără el. La evaluare, amestecul ăsta e prima greșeală: copiezi tot sau lași doar un adjectiv.',
        'Tema e despre ce e vorba, într-un nume scurt (o călătorie, o răsfățare, o lecție de purtare). Ideea principală e o propoziție: cine face ce.',
        'Exemplu lucrat: „Băiatul insistă să fie tratat ca un domn și iese o încurcătură.” Asta e ideea. Culoarea hainei, dacă nu schimbă încurcătura, e detaliu.',
        'Reține: esențialul ține povestea în picioare. Detaliul o face vie, nu o înlocuiește.'
      ),
      lesson(
        'intentie',
        'Intenție, emoție, dialog',
        'Într-un dialog nu auzi doar cuvintele. Auzi și ce vrea vorbitorul: să se laude, să ceară, să se scuze, să comande. Emoția se vede în ton, în repetiție, în felul în care celălalt răspunde.',
        'La textul citit, marchezi o replică și spui intenția în patru-cinci cuvinte. Nu ai nevoie de termenul de liceu. „Vrea să pară important” e suficient.',
        'Exemplu lucrat: cineva spune „Eu știu mai bine” pe un ton ridicat. Intenția nu e să informeze, ci să se pună deasupra. Răspunsul politicos nu repetă tonul.',
        'Reține: intenția e de ce spune, nu doar ce cuvinte a folosit.'
      ),
      lesson(
        'raspuns-scurt',
        'Răspunsul scurt, corect',
        'După citire scrii puțin și la obiect. O frază care răspunde la întrebare bate un paragraf care ocolește. Te uiți: am folosit o dovadă din text? Se înțelege scrisul? Am închis ideea?',
        'Dacă ți se cere o părere, o legi de o faptă din text: „Mi se pare… pentru că în text…”. Fără „pentru că”, părerea rămâne în aer.',
        'Exemplu lucrat: întrebarea „Ce crezi despre purtarea personajului?”. Răspuns slab: „E nasol.” Răspuns de evaluare: „Nu ține cont de ceilalți, pentru că insistă să i se facă pe plac și se alege cu încurcătura.”',
        'Reține: scurt, din text, cu un motiv. Asta măsoară evaluarea inițială.'
      )
    ]
  },
  {
    id: 'cuvinte',
    title: 'Cuvinte potrivite',
    inOwnWords:
      'Unitatea 1 pune la un loc vorbirea potrivită și prima gramatică a propoziției: enunț, predicat, subiect, acord, atribut, apoi ideea principală și planul de idei. Textul de lucru din cuprins este snoava Păcală avocat.',
    toc: [
      'A înțelege și a exprima informații, intenții, atitudini și emoții',
      'Strategii de interpretare. Răspunsul afectiv (Păcală avocat)',
      'Dicționarul. Articolul de dicționar',
      'Enunțul. Tipuri de enunț și punctuația',
      'Roluri în comunicare: vorbitor, ascultător',
      'Tipuri de propoziții. Predicatul verbal',
      'Acte de limbaj: a cere și a primi scuze; a refuza și a accepta',
      'Propoziția afirmativă și propoziția negativă',
      'Subiectul simplu și multiplu. Propoziția simplă și dezvoltată',
      'Acordul predicatului cu subiectul',
      'Atributul',
      'Ideea principală. Planul simplu și planul dezvoltat de idei',
      'Recapitulare și evaluare'
    ],
    glossary: [
      { term: 'enunț', meaning: 'O rostire încheiată, între două pauze, cu un scop: spui, întrebi, exclami sau ceri.' },
      { term: 'predicat verbal', meaning: 'Verbul care arată persoana și timpul și spune destul despre ce face subiectul.' },
      { term: 'răspuns afectiv', meaning: 'Ce ai simțit după lectură, legat de o bucată anume din text.' },
      { term: 'atribut', meaning: 'Spune ceva în plus despre un substantiv: nou, al Anei, de lemn.' }
    ],
    lessons: [
      lesson('deschidere', 'Harta unității', {
        theory: 'Prima pagină este o hartă, nu lecția gata făcută. Vei lucra propoziția, enunțul, dicționarul, ideea și planul. Competențele 1.1, 2.2, 3.1, 4.5 și 5.1 cer să înțelegi, să scrii scurt și să folosești limba cu grijă.',
        example: 'Pe hartă scrie „atributul”. Dacă lecția de azi este enunțul, nu bifezi atributul. Îl cauți când îi vine rândul. Harta îți arată drumul. Nu îl parcurge dintr-o privire.',
        tryThis: '1. Câte competențe numerotate deschid unitatea? Scrie numărul. 2. Un titlu doar anunțat se lucrează acum sau mai-tarziu? Un cuvânt.',
        recap: 'Harta anunță. Lecția predă. Sunt cinci competențe la deschidere. Greșeală: crezi că ai învățat un titlu doar pentru că îl vezi pe prima pagină.'
      }),
      lesson('norma', 'Limba standard și abaterea', {
        theory: 'Limba standard este forma pe care o înțelege toată țara. O abatere este o vorbă de-acasă sau veche. Nu râzi de ea. La temă scrii forma standard. În poveste, vorba veche poate sta în gura personajului, nu în titlu.',
        example: 'La școală scrii „eu merg”. Dacă auzi „io merg”, înțelegi cine vorbește. La temă rămâne „eu”. Personajul din poveste poate păstra „io”, ca să se audă locul lui.',
        tryThis: '1. La temă scrii standard sau abatere? Un cuvânt. 2. Vorba veche din gura personajului o stergi sau o pastrezi? Un cuvânt.',
        recap: 'La temă folosești standardul. Abaterea se recunoaște, nu se batjocorește. Poate sta în replică. Greșeală: orice formă diferită ți se pare o prostie, sau o copiezi în toată tema.'
      }),
      lesson('puterea', 'Vorba poate ajuta sau răni', {
        theory: 'Un cuvânt poate liniști pe cineva. Același cuvânt, spus tare și răutăcios, poate răni. Înainte de un mesaj te oprești o secundă. Întrebi: ajută sau taie? Gluma nu șterge rana dacă celălalt a rămas lovit.',
        example: 'În loc de „Ești lent”, Ana spune „Mai ai două minute, te aștept.” Prima formă taie. A doua dă timp și ajută. Fapta este aceeași: colegul nu e gata.',
        tryThis: '1. „Hai, mai încearcă o dată.” Scrie ajuta sau taie. 2. „Ești prost.” Scrie ajuta sau taie.',
        recap: 'Te oprești înainte să trimiți. Ajută sau taie, asta alegi. Greșeală: spui „doar glumesc” și crezi că vorba rea a dispărut.'
      }),
      lesson('afectiv', 'A înțelege, a exprima, răspunsul afectiv', {
        theory: 'Cu vorbele informăm, spunem o emoție, cerem scuze, încurajăm sau explicăm. Răspunsul afectiv este ce ai simțit după lectură. Nu ajunge „mi-a plăcut”. Arăți bucata care te-a mirat și spui de ce.',
        example: 'Radu nu scrie „E haioasă”. Scrie: „M-a mirat că eroul întoarce socoteala, pentru că eu aș fi tăcut.” Mirarea e legată de faptă.',
        tryThis: '1. „Mi-a plăcut.” Este destul sau lipseste motivul? Un cuvânt: destul sau lipseste. 2. Emoția legată de o faptă din text se numește afectiv sau titlu? Un cuvânt.',
        recap: 'Spui la ce folosesc vorbele. Legi emoția de o faptă. Un text literar poate purta un mesaj serios într-o formă plăcută. Greșeală: rezumat fără ce ai simțit, sau emoție fără bucata din text.'
      }),
      lesson('canale', 'Unde ajunge vorba', {
        theory: 'Aceleași vorbe merg pe mesaj, pe forum, pe chat, pe o rețea sau pe un blog. Locul schimbă grija. Pe chat scrii scurt. Pe blog poți explica. Peste tot rămâne regula: nu rănești și nu copiezi un text gata făcut doar ca să pari deștept.',
        example: 'Ioana vrea să încurajeze un coleg. Pe chat scrie „Mai ai timp, eu cred în tine.” Pe blog ar pune și de ce. Nu lipește un compliment copiat de pe un site.',
        tryThis: '1. Un compliment copiat de pe un site este al tau sau strain? Un cuvânt. 2. Pe chat, textul este scurt sau lung? Un cuvânt.',
        recap: 'Canalul schimbă lungimea, nu bunătatea vorbei. Mesajul tău este scris de tine. Greșeală: lipești un text găsit și îl semnezi ca și cum l-ai gândit tu.'
      }),
      lesson('lectura-continua', 'Citești până la capăt', {
        theory: 'La prima lectură nu te oprești la fiecare cuvânt greu. Treci mai departe: cine vorbește, ce vrea, ce se strică. Cuvântul necunoscut îl cauți după ce ai firul.',
        example: 'Mihai nu știe un cuvânt la început. Nu închide cartea. Citește scena până la punct. Apoi caută doar cuvântul care încă îi blochează sensul. Firul era: un om flămând și un preț nedrept.',
        tryThis: '1. La prima lectură te opresti la cuvântul greu sau continui? Un cuvânt: opresti sau continui. 2. Dicționarul vine inainte sau dupa fir? Un cuvânt.',
        recap: 'Întâi firul, apoi cuvântul greu. Te pui lângă personaje. Greșeală: te oprești la primul cuvânt necunoscut și nu mai afli ce se întâmplă.'
      }),
      lesson('jurnal-dublu', 'Jurnalul dublu', {
        theory: 'Tai pagina în două, cu o linie dreaptă. În stânga pui cel puțin trei bucăți din text: un citat, o secvență sau un cuvânt care te-a oprit. În dreapta spui de ce. Poate fi ideea, emoția, o amintire, o legătură cu altă materie sau o curiozitate. Poți reciti ca să alegi mai bine.',
        example: 'Stânga: „prețul a crescut cât o avere”. Dreapta: „M-a revoltat, pentru că masa era mică, iar socoteala era uriașă. La mate aș fi cerut calculul.” Trei rânduri de felul acesta fac jurnalul.',
        tryThis: '1. Câte bucăți minimum stau în stânga? Scrie numărul. 2. Motivul stă în stanga sau in dreapta? Un cuvânt.',
        recap: 'Stânga: minimum trei bucăți. Dreapta: de ce le-ai ales. Greșeală: copiezi trei citate și lași coloana din dreapta goală.'
      }),
      lesson('nedreptate', 'Iei atitudine și pentru altul', {
        theory: 'Poți apăra pe cineva chiar dacă ție nu ți s-a făcut răul. Asta nu înseamnă să țipi. Înseamnă să spui ce e nedrept și să cauți o cale dreaptă. Eroul îndrăgit din povești rămâne în minte și pentru gestul acesta, nu doar pentru glumă.',
        example: 'Un coleg este acuzat pe nedrept că a rupt rigla. Tu ai văzut că era deja crăpată. Spui ce ai văzut. Nu ești tu acuzat. Tot intervii, pentru că tăcerea lasă nedreptatea în picioare.',
        tryThis: '1. Intervii doar când ești tu victima? Scrie da sau nu. 2. Gestul de a apăra pe altul este tacere sau aparare? Un cuvânt.',
        recap: 'Poți lua atitudine și pentru altcineva. Spui ce ai văzut. Greșeală: crezi că te privește doar bătaia care cade pe tine.'
      }),
      lesson('personaj', 'Ce este un personaj', {
        theory: 'Personajul face fapte imaginare, într-o povestire inventată. Nu l-ai întâlni la magazin, pentru că nu a trăit în lumea reală. Omul din știre sau din familia ta este persoană, nu personaj.',
        example: 'Într-o snoavă, istețul care întoarce o socoteală nedreaptă este personaj. Bunicul care îți spune snoava este persoană. Nu îi pui același nume de rol. Unul e inventat. Celălalt trăiește.',
        tryThis: '1. Eroul dintr-o snoavă este personaj sau persoana? Un cuvânt. 2. Un cântăreț care trăiește azi este personaj sau persoana? Un cuvânt.',
        recap: 'Personajul stă în textul inventat. Persoana trăiește sau a trăit. Greșeală: numești „personaj” orice om celebru.'
      }),
      lesson('replica', 'Cine a spus replica', {
        theory: 'Fiecare replică are un vorbitor. Nu o lipești de personajul care apare cel mai des. Te uiți la ce se întâmplă chiar înainte și la ce cere replica: o întrebare de judecător, o mirare, o scuză. Apoi spui numele.',
        example: 'În dialog, cineva întreabă „Cât costă?” și altcineva răspunde cu un preț uriaș. Prima replică este a musafirului. A doua este a celui care vinde. Nu le schimbi doar pentru că vânzătorul are mai multe rânduri.',
        tryThis: '1. Replica se dă celui cu cele mai multe vorbe sau celui care chiar o spune? Scrie spune. 2. Înainte de nume, cauți contextul? Scrie da sau nu.',
        recap: 'Cauți contextul, apoi numele. Nu câștigă cine are cele mai multe rânduri. Greșeală: toate replicile i le dai eroului principal.'
      }),
      lesson('alte-culturi', 'Istețul din alte povești', {
        theory: 'Omul care îi prinde pe cei lacomi cu vorba nu este doar al nostru. În Balcani circulă și povești cu Nastratin Hogea. Nu înveți o biografie pe de rost. Reții că gluma înțeleaptă are frați și în alte culturi.',
        example: 'Comparația corectă sună așa: „Și aici, și în alte părți, istețul pedepsește lăcomia printr-o socoteală pe dos.” Nu spui că cele două personaje sunt același om. Spui că seamănă la rol.',
        tryThis: '1. Ideea istețului care pedepsește lăcomia este doar la noi? Scrie da sau nu. 2. Doi eroi asemănători sunt acelasi om sau roluri asemanatoare? Scrie acelasi sau roluri.',
        recap: 'Compari rolul, nu amesteci numele. Gluma înțeleaptă trece granița. Greșeală: crezi că un singur popor a inventat istețimea.'
      }),
      lesson('real-personaj', 'Om adevărat sau personaj', {
        theory: 'Unii oameni au trăit: au an, oraș, o meserie. Personajul de folclor este inventat de povești. Când asociezi o imagine, întrebi: pot găsi omul acesta într-o carte de istorie, sau doar într-o snoavă? Răspunsul schimbă eticheta.',
        example: 'Un poet care a trăit în secolul al XIX-lea este persoană. Eroul unei snoave, care nu s-a născut nicăieri, este personaj. Poza unui monument nu îl face pe eroul inventat om real.',
        tryThis: '1. Un poet cu an de naștere este persoana sau personaj? Un cuvânt. 2. Eroul unei snoave, fără viață reală, este persoana sau personaj? Un cuvânt.',
        recap: 'Viața reală înseamnă persoană. Povestea inventată înseamnă personaj. Greșeală: dacă are desen în carte, crezi automat că a trăit.'
      }),
      lesson('dictionar', 'Dicționarul și articolul de dicționar', {
        theory: 'Dicționarul explicativ spune ce înseamnă un cuvânt. Bucata unui singur cuvânt se numește articol. Are titlul, felul cuvântului și sensurile. Caseta de vocabular din clasele mici este forma scurtă. Alegi sensul care încape în fraza ta.',
        example: 'La „carte” găsești și volum, și bucată la un joc. În „Deschid cartea la pagina 4” alegi volumul. Sensul de joc ar strica fraza. Nu lua primul sens din reflex.',
        tryThis: '1. Bucata care explică un singur cuvânt se numește articol sau pagina? Un cuvânt. 2. Când sunt două sensuri, alegi primul sau pe cel din fraza? Scrie fraza sau primul.',
        recap: 'Articolul explică un cuvânt. Contextul alege sensul. Greșeală: copiezi sensul 1 peste o frază care cere sensul 2.'
      }),
      lesson('doom', 'Unde verifici scrierea', {
        theory: 'Dicționarul de sensuri îți spune ce înseamnă cuvântul. Pentru cum se scrie și cum se pronunță corect există dicționarul ortografic, ortoepic și morfologic, numit DOOM. Nu le schimba între ele. La o literă nesigură cauți norma de scriere, nu povestea cuvântului.',
        example: 'Nu ești sigur dacă un cuvânt se scrie cu cratimă. Nu întrebi „ce simt eu”. Cauți forma în DOOM. Sensul, dacă îl știi deja, poate rămâne nemișcat. S-a schimbat doar haina literelor.',
        tryThis: '1. Scrierea corectă o cauți în doom sau in dex? Scrie doom sau dex. 2. Sensul cuvântului stă mai degrabă în dex sau in doom? Un cuvânt.',
        recap: 'DEX spune sensul. DOOM spune scrierea și pronunția. Greșeală: cauți ortografia într-un dicționar care îți dă doar înțelesul.'
      }),
      lesson('dictionar-cultural', 'Dicționarul cultural', {
        theory: 'Uneori cauți un lucru de cultură: o persoană, un obicei, o carte. Dicționarul cultural explică asta pe scurt. Se numește enciclopedic. Nu îl folosești ca să vezi dacă un verb se scrie cu cratimă.',
        example: 'Cauți un culegător de povești la dicționarul cultural. Verbul „a semăna” îl cauți la dicționarul de cuvinte. Două uși, două întrebări.',
        tryThis: '1. Un nume de persoană din cultură se caută la cultural sau la cratima? Scrie cultural sau cratima. 2. Dicționarul de lucruri și oameni se numește enciclopedic sau ortografic? Un cuvânt.',
        recap: 'Cultural înseamnă lucruri și oameni, nu litere. Enciclopedic este numele mare al acestui fel de dicționar. Greșeală: cauți acolo o regulă de scriere.'
      }),
      lesson('carte-film', 'Cartea și filmul', {
        theory: 'Același erou poate arăta altfel în film decât ți l-ai imaginat la lectură. Compari un gest sau o fire, nu spui doar „mi-a plăcut”. Și desenul pornește din ce face personajul în text.',
        example: 'După lectură, Ioana și-l închipuie înalt și zâmbitor. În film este scund și serios. Ea scrie: „În capul meu zâmbea. În film abia vorbește. Lăcomia celuilalt rămâne la fel.” Asta este comparație. „Mi-a plăcut filmul” nu este.',
        tryThis: '1. Compari un gest din carte cu filmul sau spui doar placut? Scrie gest sau placut. 2. Desenul pornește din text sau din intamplare? Un cuvânt: text sau intamplare.',
        recap: 'Spui o deosebire clară între lectură și film. Portretul iese din fapte. Greșeală: un singur „mi-a plăcut”, fără nicio diferență.'
      }),
      lesson('enunt', 'Enunțul, tipurile și semnul final', {
        theory: 'Enunțul este o comunicare întreagă, între două pauze. Asertivul informează și ia punct. Interogativul întreabă și ia semn de întrebare. Exclamativul arată emoție. Imperativul dă o poruncă. Ambele iau semnul exclamării, cu scop diferit. Fără semn, enunțul e incomplet.',
        example: '„Adu caietul.” este imperativ. „Adu caietul?” este interogativ. „Caietul este pe bancă.” este asertiv. „Ce caiet frumos!” este exclamativ. Semnul schimbă scopul.',
        tryThis: '1. Enunțul care cere o informație ia punct, intrebare sau exclamare? Un cuvânt. 2. Porunca „Stai jos.” ia punct sau exclamare? Un cuvânt.',
        recap: 'Patru scopuri: spui, întrebi, exclami, poruncești. Semnul marchează intonația. Greșeală: lași enunțul fără niciun semn.'
      }),
      lesson('roluri', 'Vorbitor și ascultător', {
        theory: 'În dialog schimbi rolul. Când dai o informație sau pui o întrebare, ești vorbitor. Când taci ca să primești răspunsul, ești ascultător. Apoi vă schimbați. Un interogativ fără pauză de răspuns nu este dialog. Este un discurs.',
        example: 'Ana îi spune colegului o veste nouă dintr-un interviu. Ea este vorbitor. El ascultă. Apoi el întreabă ce l-a mirat. Acum el este vorbitor, iar Ana ascultă. Fiecare așteaptă rândul.',
        tryThis: '1. Cine pune întrebarea este vorbitor sau ascultator? Un cuvânt. 2. După întrebare, celălalt trebuie să raspunda sau sa intrerupa? Scrie raspunda sau intrerupa.',
        recap: 'Rolurile se schimbă. Întrebarea așteaptă răspuns. Greșeală: vorbești tot tu și numești asta dialog.'
      }),
      lesson('reguli-dialog', 'Regulile unui dialog politicos', {
        theory: 'Vorbiți pe rând. Nu întrerupi ideea neterminată și nu vorbiți deodată. Când întrebi, aștepți răspunsul. Arăți că asculți: te uiți la coleg sau spui „A, da?”. La final, fiecare promite ce face.',
        example: 'Radu și Ioana pregătesc o farsă blândă, doar pentru cine chiar merită o lecție, nu pentru oricine. Radu propune. Ioana nu îl taie. Pune o întrebare după punct. Apoi fiecare spune ce rol are și promite să îl țină.',
        tryThis: '1. Poți vorbi exact când vorbește și celălalt? Scrie da sau nu. 2. Ca să arăți că asculți, te uiti la el sau te uiti in telefon? Scrie el sau telefon.',
        recap: 'Pe rând, fără suprapunere, cu răspuns și cu privire. Greșeală: știi regula pe de rost și tot întrerupi.'
      }),
      lesson('compliment', 'Cum primești și cum trimiți o laudă', {
        theory: 'Un compliment te poate bucura sau jena. Poți spune ce simți. Când îl trimiți, alege canalul: mesaj scris de tine, e-mail sau scrisoare. Textul copiat de pe un site rămâne străin.',
        example: 'Ana îi scrie mamei o scrisoare: „M-ai ajutat la proiect fără să îl faci tu.” Este al ei. Un mesaj copiat, „Ești cea mai bună din lume”, nu spune nicio faptă. De aceea scrisoarea este mai puternică aici.',
        tryThis: '1. Un compliment cu o faptă reală este tare sau gol? Un cuvânt. 2. Textul copiat de pe site este al tau sau strain? Un cuvânt.',
        recap: 'Spui cum reacționezi la laudă. Alegi canalul și motivezi. Greșeală: trimiți o frază copiată și crezi că ai fost atent.'
      }),
      lesson('propozitie', 'Propoziția și predicatul verbal', {
        theory: 'Propoziția are un singur predicat. Predicat este verbul care arată persoana și timpul: înțeleg, am înțeles. Predicatul verbal spune destul despre ce face subiectul. Dacă verbul singur nu ajunge, nu l-ai terminat de notat.',
        example: 'În „Păsările cântă”, „cântă” spune destul. Este predicat verbal. În „Păsările erau galbene”, „erau” singur nu spune cum erau. Mai notezi și „galbene”.',
        tryThis: '1. Câte predicate are o propoziție? Scrie numărul. 2. În „Copiii râd”, predicatul este râd sau copiii? Un cuvânt.',
        recap: 'Un singur predicat, cu persoană și timp. Verbal înseamnă că verbul spune destul. Greșeală: numeri două verbe într-o frază ca pe o singură propoziție, sau lași doar „erau” când fraza spune și cum erau.'
      }),
      lesson('nu-este-predicat', 'Verbul care nu este predicat', {
        theory: 'Nu orice formă verbală este predicat. Dacă nu arată persoana și timpul, nu preia rolul. Forma în -ind stă lângă acțiune. Predicatul este verbul care se schimbă după persoană.',
        example: 'În „Auzind vestea, mama a sunat”, „auzind” nu spune cine și la ce timp stă singur ca predicat. Predicatul este „a sunat”. Mama este cea care sună. Vestea doar însoțește.',
        tryThis: '1. În „Văzând ploaia, ei au intrat”, predicatul este vazand sau au intrat? Scrie vazand sau intrat. 2. Forma în -ind arată persoană și timp? Scrie da sau nu.',
        recap: 'Predicatul se conjugă: persoană și timp. Forma în -ind stă lângă el, nu în locul lui. Greșeală: subliniezi ambele forme și spui că ai două predicate.'
      }),
      lesson('scuze', 'Scuze, refuz, acceptare', {
        theory: 'Ceri scuze cu un enunț potrivit persoanei. Către coleg poți fi mai simplu. Către profesor sau părinte vorbești mai îngrijit. Poți refuza politicos: spui nu, spui de ce și spui cum te-ai simțit.',
        example: 'Către un coleg: „Îmi pare rău că ți-am luat rigla.” Către profesor: „Vă rog să mă iertați, am întârziat.” Refuz politicos: „Nu pot azi. Am lucrare. Îți mulțumesc că m-ai chemat.” Nu este „Nu, pleacă.”',
        tryThis: '1. Scuza către profesor este la fel de scurtă ca către coleg? Scrie da sau nu. 2. Un refuz politicos are și un motiv? Scrie da sau nu.',
        recap: 'Schimbi formula după persoană. Refuzul poate fi clar și tot politicos. Greșeală: aceeași propoziție pentru coleg, profesor și părinte, sau un nu aruncat fără motiv.'
      }),
      lesson('afirmativ-negativ', 'Propoziția afirmativă și cea negativă', {
        theory: 'Propoziția negativă are „nu” lângă predicat: „Nu vin.” Afirmativa nu are acest „nu”: „Vin.” O veste rea poate fi tot afirmativă. „A fost incorect” nu neagă verbul. Și „da”, și „nu” pot fi corecte, dacă forma e bună.',
        example: '„Nu vin azi la tine” este refuz, propoziție negativă. O întorci în acceptare: „Da, vin azi la tine.” Ambele sunt corecte ca formă. S-a schimbat decizia, nu regula. „A fost nedrept” rămâne afirmativă.',
        tryThis: '1. „Nu citesc acum.” este afirmativa sau negativa? Un cuvânt. 2. „Răspunsul a fost greșit.” este afirmativa sau negativa? Un cuvânt.',
        recap: '„Nu” lângă predicat face propoziția negativă. Ideea urâtă nu o face automat negativă. Greșeală: crezi că doar răspunsul cu „nu” poate fi corect.'
      }),
      lesson('acte-vorbire', 'Acte de vorbire', {
        theory: 'Unele verbe fac lucrul pe care îl numesc: a declara, a porunci, a ruga, a mărturisi, a renunța. Predicatul este verbul actului. Îl spune persoana care are rolul: președintele declară, profesorul cere liniște. Nu îl pui în gura oricui.',
        example: '„Declar deschisă ședința” îl spune cel care conduce, nu un coleg. Predicatul este „declar”. Dacă schimbi persoana, actul nu mai are rost.',
        tryThis: '1. În „Vă rog să tăceți”, predicatul actului este rog sau taceti? Scrie rog sau taceti. 2. O declarație oficială o spune oricine sau conducatorul? Un cuvânt: oricine sau conducatorul.',
        recap: 'Verbul actului este predicatul. Persoana trebuie să aibă rolul potrivit. Greșeală: legi replica de cine îți vine în minte, nu de verbul ei.'
      }),
      lesson('imagine-text', 'Legi imaginea de text', {
        theory: 'O imagine nu este decor. O privești și o pui lângă text: aceeași emoție, același gest sau o contrazicere. Apoi spui colegului ce vezi în amândouă. Dacă descrii doar desenul, ai sărit textul. Dacă povestești doar textul, ai sărit desenul.',
        example: 'Desenul arată un băiat cu sprâncenele ridicate. Textul spune că a auzit un preț uriaș. Legătura: „Fața mirată potrivește vestea din text. Nu este un zâmbet de bucurie.” Asta unește imaginea cu fraza.',
        tryThis: '1. Ajunge să descrii doar desenul? Scrie da sau nu. 2. Legătura dintre imagine și text se spune sau se sare? Scrie se spune sau se sare.',
        recap: 'Imaginea și textul se citesc împreună. Spui ce au în comun. Greșeală: un desen frumos, fără nicio vorbă despre text.'
      }),
      lesson(
        'subiect',
        'Subiectul, propoziția simplă și dezvoltată, acordul',
        'Subiectul răspunde la cine? sau ce? face acțiunea. Simplu: un singur nucleu („Ana citește.”). Multiplu: mai multe nuclee care fac aceeași faptă („Ana și Radu citesc.”).',
        'Propoziția simplă are doar subiect și predicat („Plouă.” poate să nu aibă subiect spus; „Ana citește.” e tiparul de bază). Propoziția dezvoltată mai are însoțitori: unde, ce, cum („Ana citește o carte în bibliotecă.”).',
        'Acordul: predicatul se potrivește cu subiectul. Unul singur cere singular („băiatul citește”). Doi sau mai mulți cer plural („băiatul și fata citesc”).',
        'Exemplu lucrat: „Caietul și pixul stă pe bancă” e greșit. Subiect multiplu → „stau”.',
        'Reține: întrebi cine face. Dacă sunt doi, verbul trece la plural.'
      ),
      lesson(
        'atribut',
        'Atributul',
        'Atributul nu e o întâmplare lângă verb. Stă pe lângă un nume și îl precizează: care, ce fel, al cui. „Cartea nouă”, „caietul de matematică”, „geaca Anei”.',
        'Fără atribut, numele e gol: „carte” poate fi orice. Cu atribut, știi despre care e vorba. Nu confunzi atributul cu locul: „pe masă” spune unde e cartea, nu ce fel de carte e.',
        'Exemplu lucrat: în „Prietenul cel nou a adus atlasul vechi.”, „cel nou” ține de prieten, „vechi” ține de atlas. Două atribute, două substantive.',
        'Reține: atributul răspunde la care? / ce fel de? / al cui? despre un substantiv.'
      ),
      lesson(
        'plan-idei',
        'Ideea principală și planul de idei',
        'Ideea principală e propoziția fără de care textul nu mai are fir. Ideile secundare o sprijină: un exemplu, un loc, o vorbă. Planul simplu de idei e o listă scurtă de titluri (ce se întâmplă, în ordine). Planul dezvoltat adaugă, sub fiecare titlu, un detaliu care chiar ajută.',
        'Îl faci înainte să povestești sau să scrii, ca să nu sari de la început la final.',
        'Exemplu lucrat: plan simplu — 1. Păcală e chemat. 2. Răspunde pe dos. 3. Ceilalți rămân fără cuvinte. Plan dezvoltat la punctul 2: spune un lucru pe care îl întoarce, nu tot textul.',
        'Recapitulare: enunțul are semn, propoziția are predicat, subiectul se acordă, atributul ține de nume, planul ține ideile în ordine. La evaluarea unității arăți asta pe un text scurt, nu recitând definițiile.',
        'Reține: plan simplu = titluri. Plan dezvoltat = titlu plus un sprijin, nu pagina copiată.'
      )
    ]
  },
  {
    id: 'cartea',
    title: 'Cartea, sursă de cunoaștere și legătură între generații',
    inOwnWords:
      'Unitatea 2 leagă lectura de vocabular și de scris: ce e un cuvânt, alfabetul, silaba, accentul, sinonimele și antonimele, apoi paragraful și pașii scrierii. Cartea românească e urmărită ca obiect de învățătură, de la tipar la forma digitală, fără să copiem paginile.',
    toc: [
      'Cărțile, căi de cunoaștere și autocunoaștere. Carte românească de învățătură',
      'Câmpul lexical. Cuvinte-cheie',
      'Cuvântul, forma și sensul. Alfabetul limbii române',
      'Specificul limbii române în scriere',
      'Silaba. Tipuri de sunete. Accentul. Corespondența litere–sunete',
      'Sinonime și antonime',
      'Prezentarea textului. Scrisul de mână. Paragraful',
      'Etapele scrierii: generarea ideilor, planificare, scriere',
      'Tema. Detaliul. Dialogul. Empatia',
      'Recapitulare și evaluare'
    ],
    glossary: [
      { term: 'câmp lexical', meaning: 'Cuvinte care țin de aceeași zonă de sens: carte, pagină, copertă, capitol.' },
      { term: 'sinonim', meaning: 'Altă formă, sens apropiat: curajos / viteaz.' },
      { term: 'antonim', meaning: 'Sens opus: cald / rece.' }
    ],
    lessons: [
      lesson(
        'carte-lexic',
        'Cartea și cuvintele-cheie',
        'În unitatea asta cartea e cale de cunoaștere: afli despre lume și despre tine. Cuprinsul urmărește cartea românească de învățătură de la prima carte tipărită până la cartea digitală. Nu memorezi un șir de ani aici; reții ideea: aceeași nevoie de a transmite, alt suport.',
        'Câmpul lexical strânge cuvintele unei teme. Cuvintele-cheie sunt cele fără de care nu poți spune tema. Dacă le scoți, textul cade.',
        'Exemplu lucrat: temă „bibliotecă”. Câmp: raft, fișă, împrumut, liniște, volum. Cuvânt-cheie într-un afiș scurt: împrumut. Fără el, afișul nu spune ce faci acolo.',
        'Reține: câmpul lexical e familia temei. Cuvântul-cheie e cel care poartă tema.'
      ),
      lesson(
        'cuvant-alfabet',
        'Cuvântul, alfabetul, formă și sens',
        'Cuvântul e unitatea de bază a vocabularului: o formă pe care o scrii și un sens pe care îl porți în context. Aceeași formă poate avea sensuri diferite; contextul alege.',
        'Alfabetul limbii române are 31 de litere. Scrierea noastră marchează sunete pe care alte limbi le scriu în mai multe feluri: ă, â, î, ș, ț nu sunt „litere în plus de decor”. Specificul scrierii e tocmai că fiecare literă trebuie pusă, nu ghicită.',
        'Exemplu lucrat: „copii” (fără i-ul de la pluralul lung) și „copiii” nu spun același număr în aceeași poziție. Forma schimbă sensul. Nu le amesteci ca să „arate bine”.',
        'Reține: forma e ce scrii. Sensul e ce înseamnă acolo. Alfabetul e lista cu care construiești forma.'
      ),
      lesson(
        'silaba',
        'Silaba, sunetele, accentul, literă și sunet',
        'Silaba e o bucată de cuvânt pe care o spui dintr-o singură mișcare de voce. O folosești când desparți în silabe la capăt de rând, nu ca să numeri de poftă.',
        'Sunetele sunt vocale (se rostesc singure: a, e, i, o, u, ă, î) și consoane (au nevoie de o vocală). O literă nu e mereu un sunet, și un sunet nu e mereu o literă: grupurile și literele cu semne (ș, ț) se învață ca perechi, nu ca picturi.',
        'Accentul e silaba pe care o spui mai apăsat. Uneori mută sensul sau măcar pronunția corectă. Nu îl pui „unde îți vine”.',
        'Exemplu lucrat: „car-te” are două silabe. Accentul cade pe prima: CAR-te. „co-pil” are tot două; accentul e pe a doua: co-PIL. Aceeași metodă: marchezi vocalele, tai silabele, spui care e mai apăsată.',
        'Reține: silaba se aude. Litera se vede. Nu sunt mereu una și aceeași numărare.'
      ),
      lesson(
        'sinonime',
        'Sinonime și antonime',
        'Sinonimele au formă diferită și sens apropiat. Nu sunt clone: „a merge” și „a păși” nu intră în orice frază la fel. Le alegi după context, nu după prima pereche din listă.',
        'Antonimele au sens opus: mare / mic, a deschide / a închide. Poți face opoziție și cu negația („vine” / „nu vine”), dar antonimul adevărat e alt cuvânt, nu doar „nu” lipit.',
        'Exemplu lucrat: în „Camera e luminoasă” antonimul potrivit e „întunecoasă”, nu „urâtă”. Urât schimbă altceva decât lumina.',
        'Reține: sinonim = aproape același sens. Antonim = sensul din partea cealaltă, tot în context.'
      ),
      lesson(
        'paragraf',
        'Paragraful și etapele scrierii',
        'Un text se prezintă ca să poată fi citit: scris lizibil, titlu, paragrafe. Un paragraf ține o idee. Când treci la alta, începi paragraf nou. Asta e și regulă de mână, și regulă de cap.',
        'Etapele scrierii din cuprins, unite aici: 1) generezi idei (ce ai putea spune), 2) planifici (ce rămâne și în ce ordine), 3) scrii. Nu începi cu fraza „frumoasă” înainte de plan.',
        'Exemplu lucrat: tema „o carte care m-a ținut”. Idei: titlul, o scenă, de ce am continuat. Plan: ce carte / ce scenă / ce am înțeles. Abia apoi paragraful.',
        'Reține: idei, apoi plan, apoi text. Paragraful = o idee.'
      ),
      lesson(
        'empatie',
        'Temă, detaliu, dialog, empatie',
        'Tema e despre ce scrii, spus scurt. Detaliul o face de crezut: un gest, un obiect, o replică, nu „a fost frumos”. În dialog, fiecare replică are un rost. Nu pui două personaje să spună același lucru ca să umpli pagina.',
        'Empatia, aici, e să ții cont de celălalt când vorbești sau scrii: ce știe deja, ce l-ar răni fără rost, ce are nevoie să afle. Nu e să fii de acord cu tot.',
        'Exemplu lucrat: tema „prima zi de școală”. Detaliu bun: „ghiozdanul îmi bătea în genunchi”. Detaliu gol: „eram emoționat”. Dialogul cu un coleg începe cu o întrebare, nu cu un discurs.',
        'Recapitulare: cuvânt, alfabet, silabă, accent, sinonim, antonim, paragraf, trei pași ai scrierii. Evaluarea unității cere să le folosești, nu să le enumeri.',
        'Reține: tema spune despre ce e. Detaliul arată. Empatia schimbă felul în care spui.'
      )
    ]
  },
  {
    id: 'povestirea',
    title: 'Fascinația povestirii',
    inOwnWords:
      'Unitatea 3 e textul narativ: acțiune, personaje, timp, spațiu, personificare, apoi verbul la imperativ și la indicativ (prezent, imperfect, perfect compus, perfect simplu, mai-mult-ca-perfect, viitor). Se închide cu banda desenată. Textul literar indicat în cuprins este Prințul fericit, de Oscar Wilde.',
    toc: [
      'Textul narativ literar. Personificarea (Prințul fericit, de Oscar Wilde)',
      'Acțiunea, personajele, timpul și spațiul',
      'Verbul. Modurile. Imperativul. Comunicarea nonverbală. Punctuația',
      'Indicativul: prezent, imperfect, perfect compus, perfect simplu, mai-mult-ca-perfect, viitor',
      'Secvența narativă',
      'Banda desenată și comunicarea nonverbală',
      'Recapitulare și evaluare'
    ],
    glossary: [
      { term: 'text narativ', meaning: 'Spune ce se întâmplă, în ordine, cu personaje.' },
      { term: 'personificare', meaning: 'Un lucru sau un animal primește o faptă sau o trăire de om.' },
      { term: 'secvență narativă', meaning: 'O bucată de acțiune cu început și rezultat, nu tot romanul.' }
    ],
    lessons: [
      lesson(
        'narativ',
        'Textul narativ: acțiune, personaje, timp, spațiu, personificare',
        'Textul narativ literar povestește. Are acțiune (ce se schimbă), personaje (cine o face), timp (când) și spațiu (unde). Fără acțiune ai o descriere. Fără personaje ai o listă de locuri.',
        'Personificarea dă unei ființe sau unui lucru ne-om o faptă, o vorbă sau un sentiment de om. O recunoști pentru că „cineva” care nu e om se poartă ca un om. În cuprins, textul de lucru este Prințul fericit, de Oscar Wilde. Îl citești în manual; aici nu îl repovestim.',
        'Exemplu lucrat: „Statuia privește orașul și se întristează.” Statuia nu poate privi și nu poate fi tristă în sens propriu. E personificare. „Statuia e înaltă ca un turn” e comparație, nu personificare: ai „ca”.',
        'Reține: narativ = se întâmplă ceva. Personificare = un ne-om face ceva omenesc. Comparația are un „ca”.'
      ),
      lesson(
        'imperativ',
        'Verbul, imperativul, nonverbalul, punctuația',
        'Verbul poartă acțiunea. Modul spune cum privești acțiunea: o constați, o ceri, o presupui. La clasa a V-a, cuprinsul oprește întâi la imperativ: verbul cu care ceri sau îndemni („Deschide!”, „Nu alerga!”).',
        'Comunicarea nonverbală e ce se vede fără cuvinte: gest, privire, postură. Într-o povestire o notezi ca să înțelegi personajul. Punctuația o marchează în scris: semnul exclamării la ordin, linia de dialog la replică.',
        'Exemplu lucrat: „Stai!” e imperativ, persoana a II-a, un singur lucru de făcut. „Stăteau.” nu e ordin, e o constatare la un timp trecut. Semnul și forma verbului spun diferența.',
        'Reține: imperativul cere. Nu povestește ce s-a întâmplat deja.'
      ),
      lesson(
        'indicativ-1',
        'Indicativul: prezent și imperfect',
        'Indicativul prezintă acțiunea ca un fapt. Prezentul spune că se întâmplă acum sau că e un adevăr obișnuit: „citește”, „plouă”, „apa fierbe la 100 °C”.',
        'Imperfectul e timpul fundalului și al obișnuinței în trecut: „citea în fiecare seară”, „afară ploua”. Nu e fapta scurtă care rupe povestea, e decorul în care se mișcă fapta.',
        'Exemplu lucrat: „Ana citea când a sunat telefonul.” „Citea” = imperfect, acțiunea era în curs. Sunatul e alt timp, o întâmplare scurtă. Nu le pui pe amândouă la imperfect dacă vrei să se vadă întreruperea.',
        'Reține: prezent = acum sau mereu. Imperfect = era în curs sau se repeta, în trecut.'
      ),
      lesson(
        'perfect-compus',
        'Perfectul compus',
        'Perfectul compus spune o faptă încheiată, legată de prezent (o vezi ca pe ceva gata). Se formează cu auxiliarul a avea la prezent + participiul: am citit, ai venit, a plecat, am mers.',
        'Auxiliarul se schimbă după persoană. Participiul, la forma asta, rămâne (citit, venit, plecat). Nu mai pui încă un „am” din obișnuință.',
        'Exemplu lucrat: „Ieri am terminat tema.” E perfect compus: fapta e gata. „Terminam tema în fiecare joi” e imperfect: obișnuință. Aceeași temă, alt timp, alt sens.',
        'Reține: am / ai / a / am / ați / au + participiu. Faptă încheiată.'
      ),
      lesson(
        'perfecte',
        'Perfectul simplu, mai-mult-ca-perfectul, secvența',
        'Perfectul simplu e fapta scurtă, dinamică, des în povestire: „deschise ușa”, „strigă”, „plecă”. Îl recunoști ca pe o bătaie în ritmul poveștii, nu ca pe o descriere lungă.',
        'Mai-mult-ca-perfectul e fapta și mai dinainte: se terminase înaintea altei fapte din trecut. „Plecase când am ajuns eu” = el era deja dus.',
        'Secvența narativă e o bucată cu un mic arc: o situație, o schimbare, un rezultat. Nu rezumi tot textul într-o secvență. Alegi una.',
        'Exemplu lucrat: „Când am intrat, el scrisese deja titlul.” „Scrisese” = mai-mult-ca-perfect, înainte de intrarea mea. Intrarea mea e perfect compus.',
        'Reține: perfect simplu = faptă scurtă în poveste. Mai-mult-ca-perfect = înaintea altei fapte din trecut.'
      ),
      lesson(
        'viitor-banda',
        'Viitorul și banda desenată',
        'Viitorul indicativului spune o acțiune pe care o iei ca sigură, mai târziu: voi citi, vei veni, va ploua. Se face cu auxiliarul a vrea (voi, vei, va, vom, veți, vor) + infinitivul. Nu e o bănuială slabă; e planul sau predicția pe care o prezinți ca fapt viitor.',
        'Banda desenată e tot narațiune, dar în imagini și cuvinte: casete în ordine, personaje, baloane de vorbire, uneori onomatopee. Comunicarea nonverbală e în desen (față, gest), nu doar în text.',
        'Exemplu lucrat: trei casete — 1. băiatul privește geanta; 2. geanta cade; 3. o ridică. Asta e o secvență. Viitorul ar fi replica „O să o ridic.”, spusă înainte de fapta din caseta 3.',
        'Reține: voi / vei / va + verb. În bandă desenată, ordinea casetelor e ordinea acțiunii.'
      ),
      lesson(
        'recap-poveste',
        'Recapitulare și evaluare',
        'Pui la un loc: cine, unde, când, ce se schimbă. Apoi timpul verbului. Dacă fundalul e lung, imperfect. Dacă fapta e gata și o spui de azi, perfect compus. Dacă e o lovitură scurtă în poveste, perfect simplu. Dacă era deja gata înainte, mai-mult-ca-perfect. Dacă urmează și o iei ca sigură, viitor. Ordinul e imperativ, nu indicativ.',
        'Personificarea nu se confundă cu comparația. Banda desenată se citește în ordinea casetelor.',
        'Exemplu lucrat: „Ploaia bătea în geam, iar Ana închisese fereastra. «Stai!» strigă fratele. «Voi veni imediat.»” Imperfect (bătea), mai-mult-ca-perfect (închisese), imperativ (stai), viitor (voi veni).',
        'Reține: întâi ce se întâmplă, apoi ce timp al verbului spune asta.'
      )
    ]
  },
  {
    id: 'prietenia',
    title: 'Puterea prieteniei',
    inOwnWords:
      'Unitatea 4 privește prietenia dincolo de diferențe, cu identitate personală și națională, text explicativ, substantiv, articol și prepoziție. Textul literar din cuprins este Vasile Porojan, de Vasile Alecsandri.',
    toc: [
      'Dincolo de diferențe sociale sau etnice. Identitate personală și națională (Vasile Porojan, de Vasile Alecsandri)',
      'Secvența explicativă și descriptivă. Deducție. Inferențe',
      'Real și aparență. Înțelegerea unui text',
      'Etapele scrierii',
      'Textul explicativ. Limba standard. Normă și abatere',
      'Substantivul: număr, gen, comun și propriu',
      'Articolul hotărât și nehotărât. Ortografia',
      'Combinările substantivului. Prepoziția',
      'Lectură și prejudecăți',
      'Recapitulare și evaluare'
    ],
    glossary: [
      { term: 'substantiv', meaning: 'Numește o ființă, un lucru, o idee: copil, carte, prietenie.' },
      { term: 'articol', meaning: 'Hotărăște dacă vorbitorul știe despre care substantiv e vorba (hotărât) sau nu (nehotărât).' },
      { term: 'inferență', meaning: 'Ce poți deduce din indicii, fără să inventezi o altă poveste.' }
    ],
    lessons: [
      lesson(
        'identitate',
        'Identitate personală și națională',
        'Prietenia din unitatea asta trece peste diferențe de mediu sau de neam. Identitatea personală e ce te face pe tine: nume, familie, obiceiuri, ce-ți place. Identitatea națională e ce ții în comun cu o comunitate: limbă, sărbători, locuri, povești. Nu e o listă de lozinci.',
        'Cuprinsul lucrează pe textul Vasile Porojan, de Vasile Alecsandri. Îl citești în manual. Metoda: cine sunt cei doi, ce îi separă, ce îi leagă, ce valoare rămâne (loialitate, respect), spusă cu o dovadă din text.',
        'Exemplu lucrat: „Sunt din orașul X, vorbesc româna, iar duminica merg la bunici.” Asta e identitate spusă prin fapte, nu prin „sunt cel mai bun”.',
        'Reține: personal = al tău. Național = ce împărtășești. Prietenia nu cere să fie identice.'
      ),
      lesson(
        'inferente',
        'Explicativ, descriptiv, deducție, real și aparență',
        'Secvența explicativă spune de ce sau cum. Secvența descriptivă spune cum arată. În același text le poți avea pe amândouă: întâi portretul, apoi motivul unei purtări.',
        'Deducția și inferența pleacă de la un indiciu și se opresc unde indiciul te lasă. „Ușa e închisă și lumina stinsă” te lasă să spui că probabil nu e nimeni treaz. Nu te lasă să spui că „au plecat în altă țară”.',
        'Real și aparență: ce pare (haină, ton, un zâmbet) poate să nu fie ce este. La prieteni virtuali, cuprinsul cere exact diferența asta: un profil nu e omul.',
        'Exemplu lucrat: cineva scrie mereu „sunt fericit” și nu răspunde la o întrebare simplă. Aparența e veselia. Inferența prudentă: nu știi dacă e așa. Nu inventezi o dramă.',
        'Reține: deduci doar cât ține indiciul. Aparența se verifică, nu se crede dintr-o dată.'
      ),
      lesson(
        'explicativ',
        'Textul explicativ, norma, pașii scrierii',
        'Textul explicativ îl învață pe cititor ceva: o regulă, un fenomen, un cuvânt. Are o idee clară și o ordine (ce e, apoi de ce, apoi un exemplu). Limba standard e forma îngrijită, pe care o înțeleg și cei din afara grupului tău. Abaterea poate fi greșeală sau poate fi voită (o glumă, un regionalism). La școală o marchezi, nu o copiezi fără să știi.',
        'Pașii scrierii rămân cei din unitatea anterioară: idei, plan, text. Aici îi aplici la o explicație, nu la o poveste.',
        'Exemplu lucrat: „Prietenul virtual nu e automat prieten.” Apoi de ce: nu îi vezi gestul, nu știi cine scrie. Apoi exemplu: un cont poate folosi poza altcuiva. Trei mișcări, un text explicativ.',
        'Reține: explici ca să înțeleagă și cine nu era în capul tău. Norma te ajută să fii citit.'
      ),
      lesson(
        'substantiv',
        'Substantivul: gen, număr, comun și propriu',
        'Substantivul dă nume. Genul, la română, e masculin, feminin sau neutru. Numărul e singular sau plural. Le vezi în însoțitori: un / o, doi / două, acest / această.',
        'Comun: nume de clasă (oraș, băiat, râu). Propriu: nume unic, scris cu majusculă (Iași, Andrei, Prut). Prietenia nu schimbă regula: prenumele rămâne propriu chiar când îl strigi pe un ton cald.',
        'Exemplu lucrat: „doi prieteni” (masculin plural), „două prietene” (feminin plural), „un caiet / două caiete” (neutru: singular ca masculinul, plural ca femininul).',
        'Reține: propriul ia majusculă. Genul și numărul se văd în cuvântul care stă lângă substantiv.'
      ),
      lesson(
        'articol-prepozitie',
        'Articolul, ortografia, prepoziția',
        'Articolul nehotărât (un, o, niște, unor) spune că substantivul nu e încă precizat pentru ascultător. Articolul hotărât (-l, -a, -i, -le și formele lui) spune că știi despre care e vorba. Ortografia se lipește de alegerea asta: „un prieten” nu e „prietenul”.',
        'Substantivul se combină cu atribut, cu alt nume, cu prepoziție. Prepoziția e cuvântul scurt de legătură: cu, de, la, pe, din, pentru. Ea singură nu are gen. Cere uneori o formă anume a numelui care urmează.',
        'Exemplu lucrat: „Vorbeam cu prietenul.” Prepoziția „cu” leagă verbul de substantivul hotărât. „Vorbeam cu un prieten.” schimbă articolul: nu e același, cunoscut.',
        'Reține: hotărât = știi care. Nehotărât = unul oarecare dintr-o clasă. Prepoziția leagă, nu numește.'
      ),
      lesson(
        'prejudecati',
        'Lectură, prejudecăți, recapitulare',
        'Interesul pentru lectură, în unitatea asta, nu e o notă la purtare. E obiceiul de a citi ca să înțelegi pe cineva diferit de tine. Prejudecata e o părere gata făcută, înainte de text și înainte de om. Prietenia din lecție o strică cu o faptă, nu cu un slogan.',
        'La recapitulare arăți: o inferență prudentă, un substantiv propriu scris corect, un articol ales conștient, o prepoziție care chiar leagă două idei, o explicație în trei pași.',
        'Exemplu lucrat: „Toți cei din satul X sunt…” e prejudecată. „În text, personajul din sat face asta” e o observație. A doua poate deveni prietenie. Prima închide conversația.',
        'Reține: citești ca să verifici părerea, nu ca să o confirmi dinainte.'
      )
    ]
  },
  {
    id: 'natura',
    title: 'Omul, parte din natură',
    inOwnWords:
      'Unitatea 5 leagă emoția față de natură de adjectiv (acord și grade de comparație) și de textul descriptiv, literar și nonliterar. Comparația e lucrată pe poezia Cioara, de George Topîrceanu.',
    toc: [
      'Exprimarea emoțiilor. Omul în armonie cu natura',
      'Adjectivul. Acordul cu substantivul',
      'Gradele de comparație',
      'Textul descriptiv literar și nonliterar. Inferențe',
      'Comparația (Cioara, de George Topîrceanu)',
      'Recapitulare și evaluare'
    ],
    glossary: [
      { term: 'adjectiv', meaning: 'Spune însușirea unui substantiv și se acordă cu el.' },
      { term: 'comparativ', meaning: 'Pune două lucruri față în față: mai înalt decât, la fel de înalt ca.' },
      { term: 'text descriptiv', meaning: 'Arată cum este ceva, nu ce se întâmplă mai departe.' }
    ],
    lessons: [
      lesson(
        'emotie-adjectiv',
        'Emoția, adjectivul, acordul',
        'Unitatea pleacă de la emoția potrivită când vorbești despre natură: nu orice strigăt e grijă, nu orice „frumos” e atenție. Omul e parte din natură, nu un spectator care o consumă. O spui prin ce observi, nu prin lozincă.',
        'Adjectivul dă însușirea: verde, înalt, liniștit. Se acordă în gen și număr cu substantivul: „pom înalt”, „pomi înalți”, „frunză verde”, „frunze verzi”. Dacă nu se acordă, fraza scârțâie și cititorul se poticnește.',
        'Exemplu lucrat: „Pădurea era liniștită și copacii era înalt.” Corect: „copacii erau înalți.” Adjectivul ia pluralul masculin al substantivului.',
        'Reține: adjectivul se uită la substantiv și se schimbă odată cu el.'
      ),
      lesson(
        'grade',
        'Gradele de comparație',
        'Pozitivul spune însușirea simplu: „râul e lat”. Comparativul de superioritate: „mai lat decât”. De egalitate: „la fel de lat ca”. De inferioritate: „mai puțin lat decât”. Superlativul relativ urcă sau coboară față de un grup: „cel mai lat dintre”. Superlativul absolut împinge însușirea tare, fără grup: „foarte lat”.',
        'Nu le amesteci în aceeași măsură fără rost („cel mai foarte lat”). Alegi un grad și un termen de comparație clar.',
        'Exemplu lucrat: „Stejarul e mai bătrân decât mesteacănul.” Comparativ de superioritate. Termenii sunt doi, nu tot pădurea.',
        'Reține: compari cu „mai… decât”, „la fel de… ca”, „cel mai…”. Pozitivul nu compară.'
      ),
      lesson(
        'descriptiv',
        'Text descriptiv, inferențe, comparația',
        'Textul descriptiv literar vrea să simți locul sau ființa. Cel nonliterar vrea să informeze exact (o fișă despre un animal, un panou din parc). Ambele arată cum este. Nu au obligația unei întâmplări.',
        'Inferența la descriere: din „frunzele sunt galbene și vântul e rece” poți spune că pare toamnă. Nu poți spune luna, dacă textul n-o dă.',
        'Comparația apropie două lucruri ca să înțelegi pe primul: „neagră ca pana”. Are de obicei „ca”, „cât”, „precum”. În cuprins, poezia de lucru este Cioara, de George Topîrceanu. O citești în manual; nu o copiem aici. Cauți comparațiile și spui ce înțelegi mai clar datorită lor.',
        'Exemplu lucrat: „Cioara e neagră.” e pozitiv, descriere seacă. „Cioara e neagră ca un cărbune ud” e comparație: vezi și luciul, nu doar culoarea. Personificarea ar fi „cioara râde”. Nu e același procedeu.',
        'Reține: descrierea arată. Comparația explică printr-un „ca”. Inferența nu sare peste text.'
      ),
      lesson(
        'recap-natura',
        'Recapitulare și evaluare',
        'La finalul unității știi să acordi un adjectiv, să alegi un grad de comparație și să deosebești o descriere literară de o fișă. Emoția față de natură stă într-un detaliu (un sunet, o culoare, un gest), nu în „iubesc natura” pus la început și uitat.',
        'Exemplu lucrat: fișă nonliterară — „Stejarul poate trăi sute de ani. Frunza e lobată.” Descriere literară — „Stejarul ține umbra ca o casă.” A doua are comparație. Prima are date.',
        'Evaluarea cere să le folosești pe un fragment, nu să repeți definiția.',
        'Reține: acord, grad, tip de descriere, comparație marcată cu „ca”.'
      )
    ]
  },
  {
    id: 'trepte',
    title: 'Trepte în viață',
    inOwnWords:
      'Unitatea 6 urcă pe trepte de vârstă și de școală: emoții și atitudini, semne paraverbale, identitate, numeral, apoi școala de acum și școala de altădată. Textele din cuprins: Hamurabi, de Mircea Sântimbreanu, și un fragment din Amintiri din copilărie, de Ion Creangă.',
    toc: [
      'Emoții. Sentimente. Atitudini',
      'Elemente paraverbale și nonverbale',
      'Identitatea națională',
      'Numeralul cardinal și ordinal',
      'Deschideri interdisciplinare și interculturale',
      'Școala. Atitudini și emoții',
      'Discutarea mesajului (Hamurabi, de Mircea Sântimbreanu)',
      'Variația cuvintelor în timp și spațiu',
      'Școala de altădată (Amintiri din copilărie, de Ion Creangă)',
      'Spațiu și timp în povestire',
      'Recapitulare și evaluare'
    ],
    glossary: [
      { term: 'numeral cardinal', meaning: 'Spune cât: unu, doi, douăzeci.' },
      { term: 'numeral ordinal', meaning: 'Spune al câtelea: primul, al doilea.' },
      { term: 'paraverbal', meaning: 'Cum spui: ton, ritm, pauză, tărie. Nu e cuvântul, nu e gestul.' }
    ],
    lessons: [
      lesson(
        'atitudine',
        'Emoții, sentimente, atitudini, paraverbal',
        'Emoția e scurtă și se vede (frică, bucurie, ciudă). Sentimentul ține mai mult (prietenie, respect). Atitudinea e felul în care te porți față de ceva: ești curios, închis, batjocoritor. Le deosebești ca să nu scrii „a fost supărat” pentru orice.',
        'Paraverbalul e vocea: tare, șoptit, repede, cu pauze. Nonverbalul e corpul: umeri, privire, deget. Același „bine” poate fi acord sau ironie, după voce.',
        'Exemplu lucrat: un coleg spune „bravo” zâmbind și încet, după ce ai reușit. Atitudine de încurajare. Același cuvânt, râs scurt și sprâncene ridicate, poate fi batjocură. Cuvântul nu ajunge.',
        'Reține: ce cuvânt, ce voce, ce gest. Trei straturi, nu unul.'
      ),
      lesson(
        'numeral',
        'Identitate și numeral',
        'Identitatea națională revine aici legată de trepte: ce sărbătorești, ce limbă înveți, ce povești ți se spun acasă. O spui concret, ca în unitatea despre prietenie.',
        'Numeralul cardinal numără: trei manuale, douăzeci de elevi. Numeralul ordinal ordonează: clasa a cincea, prima treaptă, al doilea semestru. „Cinci” nu e „a cincea”. Unul spune câți, altul spune pe ce loc.',
        'Exemplu lucrat: „Am trei trepte de parcurs. Sunt la a doua.” Cardinal: trei. Ordinal: a doua.',
        'Reține: cardinal = cât. Ordinal = al câtelea. La clase, „a V-a” e ordinal.'
      ),
      lesson(
        'scoala',
        'Școala, mesajul, deschiderile',
        'Școala e o treaptă, nu doar o clădire. Atitudinea față de ea (curiozitate, frică, plictiseală) se discută cu exemple, nu cu etichete pe colegi.',
        'Cuprinsul pune discutarea mesajului pe textul Hamurabi, de Mircea Sântimbreanu. În manual urmărești ce vrea textul să-ți spună despre dreptate și despre reguli, cu o dovadă, nu cu „autorul a vrut”. Deschiderile interdisciplinare și interculturale înseamnă că aceeași idee (o regulă, o școală, o pedeapsă) poate fi privită și din istorie sau din altă cultură, fără să amesteci materiile într-o salată.',
        'Exemplu lucrat: mesaj posibil — „regula fără măsură nu e dreptate”. Ca să țină, arăți o faptă din text. Dacă nu ai textul în față, nu inventa fapta: spune că dovada stă în manual.',
        'Reține: mesajul se discută cu o dovadă. Școala e temă de atitudine, nu doar de orar.'
      ),
      lesson(
        'variatie',
        'Cum se schimbă cuvintele. Școala de altădată',
        'Cuvintele se schimbă în timp și de la un loc la altul. „A toci” și „a învăța” nu sunt același gest: unul e repetare până la uzură, altul e înțelegere. Cuprinsul le pune față în față ca să vezi că limba poartă atitudinea față de școală.',
        'Școala de altădată e citită, în cuprins, prin Amintiri din copilărie, de Ion Creangă. Nu copiem fragmentul. Reții ce cauți: spațiul (unde e școala, cum arată), timpul (când, cât ține o zi), și ce e altfel față de școala ta. Diferența nu e „ei erau răi, noi suntem buni”. E o comparație de fapte.',
        'Exemplu lucrat: spațiu — odaie, laviță, ceaslov. Timp — o zi care începe altfel decât ora ta de 8. Atitudine — frica de dascăl nu e aceeași emoție cu nerăbdarea de la un test de azi, chiar dacă ambele sunt „emoții de școală”.',
        'Reține: cuvântul are istorie. Spațiul și timpul ancorează amintirea. Nu o judeci doar cu regulile de azi, o compari.'
      ),
      lesson(
        'recap-trepte',
        'Recapitulare și evaluare',
        'Unitatea se închide dacă poți: numi o emoție și o atitudine fără să le confunzi, marca un indiciu paraverbal, folosi un cardinal și un ordinal corect, spune mesajul unui text cu o dovadă, și așeza o scenă de școală în spațiu și timp.',
        'Exemplu lucrat: „În a doua oră, doi colegi au vorbit în șoaptă.” Ordinal: a doua. Cardinal: doi. Paraverbal: șoaptă. Spațiu implicit: clasa, la ora aceea.',
        'Evaluarea nu cere rezumatul lui Creangă pe de rost. Cere să lucrezi cu uneltele astea pe textul din manual.',
        'Reține: emoție, voce, număr, loc, timp, mesaj cu dovadă.'
      )
    ]
  },
  {
    id: 'eroi',
    title: 'Eroi din cărți, din filme și din viață',
    inOwnWords:
      'Unitatea 7 mută narațiunea pe nonliterar și pe modele: participanți, pronume personal, pronume de politețe, apoi din nou text literar cu spațiu și timp. Cuprinsul indică Scrisoarea III, de Mihai Eminescu, și Bunica Safta, de Ion Agârbiceanu.',
    toc: [
      'Textul narativ nonliterar. Participanții la acțiune',
      'Pronumele. Pronumele personal',
      'Eroii de ieri, modele pentru azi',
      'Pronumele de politețe. Comunicarea politicoasă (Scrisoarea III, de Mihai Eminescu)',
      'Nonverbalul și paraverbalul ca mărci ale persoanei',
      'Textul narativ literar. Personaje, spațiu, timp (Bunica Safta, de Ion Agârbiceanu)',
      'Recapitulare și evaluare'
    ],
    glossary: [
      { term: 'pronume personal', meaning: 'Înlocuiește un nume: eu, tu, el, ea, noi, voi, ei, ele.' },
      { term: 'pronume de politețe', meaning: 'dumneata, dumneavoastră — marchează distanța respectuoasă, nu apropierea.' },
      { term: 'narativ nonliterar', meaning: 'Povestește fapte reale sau prezentate ca reale: o știre, o relatare, o biografie scurtă.' }
    ],
    lessons: [
      lesson(
        'nonliterar',
        'Textul narativ nonliterar și participanții',
        'Și textul nonliterar poate povesti: o știre, o pagină de jurnal real, o fișă despre cineva. Are participanți (cine a făcut), acțiune (ce s-a întâmplat), dar scopul e să informeze, nu să construiască o lume imaginară. Nu îi pui „morala” dacă textul dă fapte.',
        'Participantul e omul sau grupul din acțiune. Îl deosebești de autor: autorul a scris, participantul a făcut.',
        'Exemplu lucrat: „Ieri, echipa școlii a câștigat meciul în minutul 40.” Participanți: echipa. Acțiune: a câștigat. Timp: ieri, minutul 40. Nu e literatură. E relatare.',
        'Reține: nonliterar narativ = fapte în ordine. Participantul nu e automat „erou”.'
      ),
      lesson(
        'pronume',
        'Pronumele personal',
        'Pronumele ține locul unui nume, ca să nu repeți substantivul în fiecare frază. Personalul arată persoana: eu / noi (cine vorbește), tu / voi (cu cine vorbești), el / ea / ei / ele (despre cine vorbești).',
        'Forma se schimbă după rol: eu citesc, pe mine mă cheamă, mie îmi place. Nu e „decor”. Dacă pui „pe mine” la nominativ, fraza se rupe.',
        'Exemplu lucrat: „Andrei a luat cartea. El a dus-o acasă.” „El” îl înlocuiește pe Andrei. „A dus-o”: „o” ține locul cărții. Două pronume, două nume înlocuite.',
        'Reține: pronumele personal spune cine, fără să repeți numele. Verifici la cine se referă.'
      ),
      lesson(
        'politete',
        'Eroi, politețe, pronumele de politețe',
        'Eroul din carte, din film sau din viață e un model doar dacă poți spune ce faptă îi iei, nu dacă îți place costumul. „Erou de ieri” înseamnă o faptă care încă are rost, nu o statuie pe care o numeri.',
        'Pronumele de politețe (dumneata, dumneavoastră) marchează respectul și distanța. Nu le amesteci cu „tu” când vorbești cu cineva pe care nu îl tutuiești. Verbul se acordă: dumneavoastră citiți, nu „dumneavoastră citești”.',
        'Cuprinsul leagă comunicarea politicoasă de Scrisoarea III, de Mihai Eminescu. În manual te uiți la cum e privit un personaj istoric și la ton, nu înveți poezia pe de rost ca să o lipești aici. Noi nu o reproducem.',
        'Exemplu lucrat: către un invitat în clasă spui „Dumneavoastră când ați publicat cartea?”, nu „Tu când ai scos cartea?”. Aceeași întrebare, alt pronume, altă atitudine.',
        'Reține: modelul e o faptă pe care o poți numi. Politețea se vede în pronume și în ton.'
      ),
      lesson(
        'marca-persoanei',
        'Vocea, gestul și textul literar',
        'Felul în care taci, râzi sau întinzi mâna e o marcă a persoanei, la fel ca vorba. La un erou din film notezi un gest care se repetă. La un om real nu îl caricaturizezi: un gest nu e tot caracterul.',
        'Textul literar de închidere, în cuprins, este Bunica Safta, de Ion Agârbiceanu. Cauți personaje, spațiu și timp, ca la orice narațiune. Bunica poate fi model prin ce face în text, nu prin eticheta „bătrână bună”. Dovada stă în manual.',
        'Exemplu lucrat: spațiu — o casă, o cameră, un drum. Timp — o seară, o vârstă, o amintire. Personaj — cine are grijă și cum se vede grija (un gest), nu adjectivul „bună” singur.',
        'Reține: nonverbalul repetat spune ceva despre persoană. În text, spațiul și timpul țin scena.'
      ),
      lesson(
        'recap-eroi',
        'Recapitulare și evaluare',
        'Închizi anul de clasa a V-a, pe cuprinsul ăsta, dacă deosebești o relatare de o povestire literară, înlocuiești un nume cu pronumele potrivit, alegi „tu” sau „dumneavoastră” după situație și spui de ce un personaj poate fi model, cu o faptă.',
        'Exemplu lucrat: „Maria a ajutat. Ea a rămas după oră.” E relatare, iar „ea” ține locul numelui. Către o profesoară pe care nu o tutuiești: „Dumneavoastră ați rămas după oră?” Pronumele de politețe se acordă la plural.',
        'Evaluarea unității e pe textul din manual, nu pe o listă de eroi celebri învățați pe dinafară.',
        'Reține: participant, pronume personal, pronume de politețe, faptă de model, spațiu și timp.'
      )
    ]
  }
];

function emptyYear(grade) {
  const label = { 6: 'VI', 7: 'VII', 8: 'VIII' }[grade];
  return {
    title: `Limba și literatura română, clasa a ${label}-a`,
    restored: false,
    manual: null,
    competencies: [],
    howISeeIt:
      'Planul scris înainte în aplicație, fără un manual anume, a fost șters. Clasa asta se reface de la zero, din manualul oficial, când îl aduci. Până atunci nu sunt capitole inventate.',
    units: []
  };
}

function grade5Guide() {
  return {
    title: 'Limba și literatura română, clasa a V-a',
    restored: true,
    manual: MANUAL,
    competencies: COMPETENCIES,
    howISeeIt:
      'Plan după cuprinsul manualului Marilena Pavelescu (Litera, 2022, aprobat prin OM 4065/2022), nu după un rezumat inventat. Lecțiile vecine sunt unite. Textele literare rămân în manual: aici sunt temele oficiale, spuse pe scurt.',
    units: UNITS
  };
}

module.exports = {
  MANUAL,
  COMPETENCIES,
  UNITS,
  emptyYear,
  grade5Guide
};
