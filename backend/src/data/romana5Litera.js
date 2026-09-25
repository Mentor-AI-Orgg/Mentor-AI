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
      { term: 'atribut', meaning: 'Stă lângă un substantiv și îl precizează: nou, al Anei, de lemn.' },
      { term: 'subiect', meaning: 'Cine face acțiunea sau despre cine se spune ceva, împreună cu predicatul.' },
      { term: 'idee principală', meaning: 'Informația esențială dintr-o secvență. Înșirate în ordine, ideile principale fac planul simplu.' }
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
        theory: 'La prima lectură citești cerința, apoi firul: cine vorbește, ce vrea, ce se strică. Nu te oprești la fiecare cuvânt greu. Îl cauți după ce ai înțeles întâmplarea.',
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
        theory: 'O imagine nu este decor. O pui lângă text și numești secvența care te-a făcut curios. Poate fi aceeași emoție sau o contrazicere. Dacă descrii doar desenul, ai sărit textul.',
        example: 'Desenul arată un băiat cu sprâncenele ridicate. Textul spune că a auzit un preț uriaș. Legătura: „Fața mirată potrivește vestea din text. Nu este un zâmbet de bucurie.” Asta unește imaginea cu fraza.',
        tryThis: '1. Ajunge să descrii doar desenul? Scrie da sau nu. 2. Legătura dintre imagine și text se spune sau se sare? Scrie se spune sau se sare.',
        recap: 'Imaginea și textul se citesc împreună. Spui ce au în comun. Greșeală: un desen frumos, fără nicio vorbă despre text.'
      }),
      lesson('subiect', 'Subiectul, propoziția simplă și dezvoltată, acordul', {
        theory: 'Subiectul arată cine face acțiunea sau despre cine se spune ceva, împreună cu predicatul. Un singur termen îl face simplu: „Radu desenează.” Mai mulți termeni îl fac multiplu: „Radu și Ana desenează.” La multiplu, predicatul stă la plural.',
        example: 'În „Pisica doarme”, subiectul simplu este pisica. „Pisica și câinele doarme” este greșit. Sunt doi termeni, deci predicatul este „dorm”.',
        tryThis: '1. În „Caietul stă pe bancă”, subiectul este simplu sau multiplu? Un cuvânt. 2. „Ana și Ioana cântă.” Câți termeni are subiectul? Scrie numărul.',
        recap: 'Întrebi cine face. Un termen înseamnă simplu. Mai mulți înseamnă multiplu și verb la plural. Greșeală: lași verbul la singular când subiectul are doi termeni.'
      }),
      lesson('propozitie-simpla', 'Propoziția simplă și cea dezvoltată', {
        theory: 'Propoziția simplă are doar subiect și predicat: „Omul a plecat.” Cea dezvoltată mai are cuvinte legate de subiect sau de predicat: „Omul obosit a plecat de acasă.” Scoți amănuntele și rămâne simplă. Le pui la loc și devine dezvoltată. Poți lua exemple de la științe.',
        example: '„Elevii notează” este simplă. „Elevii de la biologie notează celula în caiet” este dezvoltată. Predicatul este „notează”. Disciplina este biologia.',
        tryThis: '1. „Pasărea cântă.” este simpla sau dezvoltata? Un cuvânt. 2. Dacă adaugi „în parc”, devine simpla sau dezvoltata? Un cuvânt.',
        recap: 'Simplă înseamnă subiect și predicat. Dezvoltată înseamnă și amănunte. Greșeală: orice propoziție scurtă ți se pare simplă, deși are un loc sau o caracteristică.'
      }),
      lesson('acord', 'Acordul predicatului cu subiectul', {
        theory: 'Predicatul se acordă cu subiectul la număr și la persoană. Eu citesc. Tu citești. El citește. Ei citesc. La plural se schimbă și adjectivul din grup: „băiat înalt” devine „băieți înalți”. Dacă după „apoi” numești două lucruri, predicatul lor stă la plural.',
        example: '„A înflorit un trandafir, apoi a înflorit o lalea și un iris” greșește la final. Laleaua și irisul sunt două. Corect este „au înflorit o lalea și un iris”.',
        tryThis: '1. Pentru „eu”, prezentul verbului „a citi” este citesc sau citeste? Un cuvânt. 2. „O pisică și un câine” cer doarme sau dorm? Un cuvânt.',
        recap: 'Acordul ține de număr și de persoană. Se schimbă și adjectivul. Greșeală: al doilea predicat rămâne la singular, deși are doi termeni.'
      }),
      lesson('atribut', 'Atributul', {
        theory: 'Atributul stă lângă un substantiv și face grup cu el. Îl precizează sau îi dă o caracteristică: „om glumeț”, „caietul nou”, „geaca Anei”. Nu spune unde se petrece fapta. „Pe masă” ține de predicat, nu de carte.',
        example: 'În „Prietenul cel nou a adus atlasul vechi”, „cel nou” ține de prieten, iar „vechi” ține de atlas. Sunt două atribute, pentru două substantive.',
        tryThis: '1. În „mingea roșie”, atributul este rosie sau mingea? Un cuvânt. 2. „în curte” este atribut sau loc? Un cuvânt.',
        recap: 'Atributul ține de nume. Răspunde la care, ce fel, al cui. Greșeală: subliniezi locul și îl numeri la atribute.'
      }),
      lesson('detaliu-atribut', 'Câte atribute are textul', {
        theory: 'Ca să vezi cât detaliu are un text, numeri atributele, nu rândurile. Mai multe atribute lângă substantive înseamnă o descriere mai bogată. Le cauți și într-un text de științe, apoi spui disciplina.',
        example: '„Celula vegetală are perete.” Atributul este „vegetală”, iar disciplina este biologia. „Cățelul năzdrăvan visa pisici negre” are mai multe atribute decât „Pisica a intrat”.',
        tryThis: '1. Câte atribute are „caietul nou albastru”? Scrie numărul. 2. Un text despre celulă ține de biologie sau de muzica? Un cuvânt.',
        recap: 'Numeri atributele ca să compari detaliul și spui materia. Greșeală: câștigă textul mai lung, chiar dacă nu descrie nimic.'
      }),
      lesson('plan-idei', 'Ideea principală și planul de idei', {
        theory: 'Ideea principală este informația esențială dintr-o secvență. Ideea secundară o detaliază: un exemplu, un nume, un loc. Planul simplu înșiră ideile principale, în ordinea din text. Planul dezvoltat pune sub fiecare și secundarele ei.',
        example: 'Albinele lucrează împreună. Regina depune ouă. Plan simplu: 1. Albinele lucrează împreună. Dezvoltat: a. Regina depune ouă. b. Lucrătoarele aduc polen.',
        tryThis: '1. Exemplul cu polenul este principala sau secundara? Un cuvânt. 2. Planul doar cu titluri, fără detalii, este simplu sau dezvoltat? Un cuvânt.',
        recap: 'Principală înseamnă esențialul. Secundară înseamnă detaliul. Simplu are doar principalele. Dezvoltat are și secundarele. Greșeală: copiezi paragraful și îl numești idee.'
      }),
      lesson('pasi-idee', 'Cum ajungi la ideea principală', {
        theory: 'Unui paragraf îi revine o idee principală. Cauți cuvintele necunoscute și delimitezi secvențele. Vezi dacă există un enunț gata făcut. La științe te uiți și la titlu. Întrebi cine și ce face, apoi ce, de ce, cum, unde și când.',
        example: '„În grădină, albinele aduc polen ca să hrănească stupul.” Esențialul este că albinele aduc polen. „În grădină” răspunde la unde. „Ca să hrănească” răspunde la de ce. Domeniul este natura.',
        tryThis: '1. Întrebarea „unde?” cere esential sau detaliu? Un cuvânt. 2. La un text de științe, titlul se uita sau se sare? Un cuvânt: uita sau sare.',
        recap: 'Un paragraf, o idee principală. Cine și ce face dau esențialul. Unde, când, cum și de ce dau detaliul. Greșeală: sari titlul și inventezi altă temă.'
      }),
      lesson('forme-plan', 'Formele planului și ordinea', {
        theory: 'Planul dezvoltat se scrie în două feluri. Cu I și II: întâi ideea principală, apoi secundarele. Sau cu 1, iar dedesubt a și b. Când îl povestești, legi ideile cu mai întâi, apoi, după ce, în final. Ordinea este cea din text.',
        example: 'Mai întâi albinele ies din stup. Apoi aduc polen. După ce hrănesc larvele, în final închid ziua. Dacă pui „în final” la ieșirea din stup, planul este întors.',
        tryThis: '1. Conectorul ultimei idei este apoi sau final? Un cuvânt. 2. Detaliile de sub ideea 1 se notează cu ab sau cu titlu? Un cuvânt.',
        recap: 'Două forme, aceeași ordine din text. Conectorii arată timpul faptelor. Greșeală: începi cu finalul pentru că ți se pare mai interesant.'
      }),
      lesson('capcana-nimeni', 'Când „nimeni” nu neagă', {
        theory: 'Propoziția este negativă doar când „nu” stă lângă predicat. „Nimeni” poate fi un nume. Atunci este subiect. „Nimeni a intrat” înseamnă că persoana chemată așa a intrat și propoziția este afirmativă. „Nu a intrat nimeni” este negativă.',
        example: 'Eroul spune că îl cheamă Nimeni. Când altul strigă „Nimeni m-a lovit”, verbul nu este negat. Propoziția rămâne afirmativă. Capcana este numele, nu regula de la „nu”.',
        tryThis: '1. „Nimeni a sunat”, dacă Nimeni este un nume, este afirmativa sau negativa? Un cuvânt. 2. „Nu a sunat nimeni” este afirmativa sau negativa? Un cuvânt.',
        recap: 'Negativ înseamnă „nu” la predicat. Numele Nimeni nu neagă verbul. Greșeală: vezi cuvântul nimeni și marchezi propoziția negativă fără să cauți „nu”.'
      }),
      lesson('pe-dos', 'Întrebarea care spune pe dos', {
        theory: 'Unele întrebări nu cer un răspuns. Spun pe dos. „Cum să nu-mi placă?” poate însemna că persoana se preface, ca să convingă pe altul. Ca să prinzi sensul, te uiți la ce face personajul înainte, nu doar la semnul întrebării.',
        example: 'Andrei oftează când vede tema. Apoi spune: „Cum să nu-mi placă tema asta?” Oftatul arată că nu îi place. Întrebarea este prefăcută. Sensul adevărat este „nu îmi place”.',
        tryThis: '1. Dacă oftatul arată plictiseală, întrebarea este sincera sau prefacuta? Un cuvânt. 2. Te uiți doar la semn sau și la fapta? Scrie semn sau fapta.',
        recap: 'Întrebarea poate spune pe dos. Fapta dinainte alege sensul. Greșeală: orice propoziție cu „îmi place” ți se pare o bucurie sinceră.'
      }),
      lesson('valori', 'Alegi o valoare și o motivezi', {
        theory: 'O valoare este ceva bun, dorit și important, cum sunt adevărul, binele, curajul sau loialitatea. Alegi una sau două din lista dată, nu toată lista. Le legi de o faptă din text, în cel mult 50 de cuvinte.',
        example: 'Din lista curaj, răbdare, generozitate, Ana alege curajul. Scrie: „A rămas lângă coleg când ceilalți au râs.” Are o faptă și puține cuvinte. „Este un model” fără motiv nu ajunge.',
        tryThis: '1. Alegi toata lista sau una-două? Scrie una sau toata. 2. Limita de cuvinte este 50 sau 500? Scrie numărul.',
        recap: 'Alegi una sau două valori și le legi de o faptă, în cel mult 50 de cuvinte. Greșeală: copiezi lista întreagă și nu spui de ce.'
      }),
      lesson('evaluare-unitate', 'Cum se notează evaluarea', {
        theory: 'La evaluarea unității primești 10 puncte din oficiu. Restul se adună din itemi, până la 100. Nota este totalul împărțit la 10. Mulți itemi valorează 6 puncte. Compunerea valorează mai mult: separat conținutul și redactarea. Citești baremul, nu rotunjești din memorie.',
        example: 'Ai 10 din oficiu și încă 80 din itemi. Totalul este 90. Nota este 9, pentru că 90 împărțit la 10 face 9. Un item sărit de 6 puncte se scade, nu se trece cu vederea.',
        tryThis: '1. Câte puncte sunt din oficiu? Scrie numărul. 2. 70 de puncte înseamnă nota 7 sau nota 70? Scrie numărul notei.',
        recap: 'Din oficiu sunt 10 puncte. Totalul se împarte la 10 ca să iasă nota. Greșeală: crezi că 100 de puncte înseamnă nota 100.'
      }),
      lesson('compunere-unitate', 'Compunerea de la finalul unității', {
        theory: 'Compunerea respectă tema. Are cel puțin două personaje, cu atribute. În dialog stau două propoziții negative. Mai pui afirmație, nedumerire, admirație și îndemn. Minimum 80 de cuvinte și trei părți: introducere, cuprins, încheiere. La final pui citatul cerut.',
        example: 'Introducerea spune cine și ce i s-a cerut. În cuprins, sora refuză de două ori, cu „nu”. Încheierea spune cum s-a terminat. Două atribute: „sora cea răbdătoare” și „fratele grăbit”.',
        tryThis: '1. Câte propoziții negative de refuz se cer? Scrie numărul. 2. Minimul de cuvinte este 80 sau 8? Scrie numărul.',
        recap: 'Temă, două personaje cu atribute, două refuzuri cu „nu”, patru enunțuri, 80 de cuvinte, trei părți. Greșeală: dialog fără „nu” sau text prea scurt.'
      }),
      lesson('portofoliu', 'Portofoliul de semestru', {
        theory: 'Portofoliul este dosarul semestrului, nu o singură temă. Are copertă, pagină de titlu și cuprins. Înăuntru stau fișele, lucrările, temele de echipă în copie și foi alese de tine. Mai notezi greșelile frecvente, punctele tari, punctele slabe și o reflecție: ce s-a schimbat în unitate.',
        example: 'Ioana scrie: „La acord greșeam pluralul. Acum număr termenii subiectului.” Asta este progres. O copertă fără fișe nu este portofoliu.',
        tryThis: '1. Portofoliul ține o tema sau semestrul? Un cuvânt. 2. Reflecția spune ce s-a schimbat? Scrie da sau nu.',
        recap: 'Dosar cu copertă, cuprins, fișe și reflecție. Notezi greșelile și progresul. Greșeală: aduni foi și nu spui ce ai învățat.'
      })
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
      { term: 'câmp lexical', meaning: 'Cuvinte înrudite ca înțeles. Dacă sunt multe, acolo este tema.' },
      { term: 'cuvânt-cheie', meaning: 'Vorba fără de care nu mai înțelegi despre ce este textul.' },
      { term: 'diacritice', meaning: 'Semne pe literă: căciulița (ă), virgula (ș, ț), circumflexul (â, î).' },
      { term: 'silabă', meaning: 'Ce spui dintr-o singură deschidere a gurii. În ea stă o singură vocală.' },
      { term: 'semivocală', meaning: 'e, i, o sau u care nu ține singură silaba, ci stă lângă o vocală.' },
      { term: 'accent', meaning: 'Silaba spusă mai puternic. Poate schimba sensul cuvântului.' },
      { term: 'sinonim', meaning: 'Altă formă, același înțeles. Contextul alege care se potrivește.' },
      { term: 'antonim', meaning: 'Alt cuvânt, cu sensul din partea opusă: bucurie / tristețe.' }
    ],
    lessons: [
      lesson('deschidere-carte', 'Harta unității despre carte', {
        theory: 'Prin carte afli despre lume și despre tine. Cei de dinainte îți lasă ce au învățat. Pe hartă sunt câmpul lexical, cuvântul, alfabetul, silaba și accentul. Sinonimele vin mai încolo. Competențele 1.1, 1.3, 2.5, 3.2, 3.3, 4.2, 4.3 și 5.1 cer context și scris îngrijit.',
        example: 'Dacă lecția de azi este alfabetul, nu bifezi paragraful doar pentru că îl vezi anunțat. Harta arată drumul. Cartea rămâne firul: aceeași învățătură, alt suport, altă vreme.',
        tryThis: '1. Câte competențe numerotate deschid unitatea? Scrie numărul. 2. Sinonimele se lucrează acum sau mai-tarziu? Un cuvânt.',
        recap: 'Cartea leagă generațiile. Harta anunță, lecția predă. Sunt opt competențe. Greșeală: înveți un titlu doar pentru că stă pe prima pagină.'
      }),
      lesson('carte-lexic', 'Cartea și cuvintele-cheie', {
        theory: 'Oamenii au păstrat ce știau pe piatră, pe lut, pe hârtie, apoi pe ecran. Suportul s-a schimbat. Nevoia a rămas: să nu se piardă învățătura. Cuvintele-cheie sunt vorbele fără de care nu înțelegi tema. Le folosești și la căutare.',
        example: 'Tema este biblioteca. În câmp stau raft și fișă. Cuvântul-cheie al unui afiș scurt este împrumut. Dacă îl scoți, nu se mai știe ce faci acolo.',
        tryThis: '1. Cuvântul fără de care tema cade este cheie sau decor? Un cuvânt. 2. De la lut la ecran s-a schimbat suportul sau nevoia? Un cuvânt.',
        recap: 'Aceeași învățătură, alt suport. Cuvântul-cheie poartă tema și ajută la căutare. Greșeală: alegi un cuvânt frumos, care nu spune despre ce este textul.'
      }),
      lesson('camp-lexical', 'Câmpul lexical', {
        theory: 'Câmpul lexical este o grupă de cuvinte înrudite ca înțeles: păsări, timp, rude. Dacă se adună multe din același câmp, acolo este subiectul. Un text poate avea două câmpuri, de pildă carte și timp. La o altă cultură grupezi la fel: mâncare, muzică, clădiri.',
        example: 'rândunică, vrabie și ciocănitoare țin de păsări. papirus, tipar și ecran țin de carte. secol, epocă și mileniu țin de timp. Vrabie lângă secol înseamnă două câmpuri, nu unul singur.',
        tryThis: '1. „raft, copertă, pagină” țin de carte sau de timp? Un cuvânt. 2. Un text poate avea și două câmpuri? Scrie da sau nu.',
        recap: 'Câmpul arată tema. Poți avea două câmpuri în același text. Greșeală: pui în aceeași listă cuvinte care nu spun același fel de lucru.'
      }),
      lesson('stea-intrebari', 'Steaua de întrebări', {
        theory: 'Ca să explorezi o temă, pui cuvântul în centru. În jur scrii întrebări: ce, la ce, pentru cine, cu cine, cum, unde, când, de ce. Din fiecare răspuns poate porni o întrebare nouă. Așa nu rămâi la o propoziție goală.',
        example: 'Centrul este carte. La ce folosește? Ca să păstrezi o poveste. De când există? De când oamenii au vrut să nu uite. Unde o cauți azi? La bibliotecă sau pe ecran. Trei întrebări, trei direcții.',
        tryThis: '1. Întrebarea „unde?” cere un loc sau un motiv? Scrie loc sau motiv. 2. Întrebarea „de ce?” cere un loc sau un motiv? Un cuvânt.',
        recap: 'Steaua deschide tema în mai multe părți. Greșeală: scrii doar „este important” și te oprești.'
      }),
      lesson('lucru-grup', 'Roluri în grup', {
        theory: 'În grup, fiecare are un rol. Liderul ține echipa unită. Administratorul are grijă de materiale. Informaticianul ține sursele. Ilustratorul adună imaginile. Cronometrul păzește timpul. Vorbiți pe rând. Refuzul se spune politicos, cu motiv. Sursele stau într-o listă separată.',
        example: 'Trei colegi fac o axă a cărții, de la lut la ecran. Cronometrul oprește căutarea la timp. Liderul îl întreabă pe cel tăcut ce crede. Informaticianul notează de unde este imaginea.',
        tryThis: '1. Cine păzește timpul: cronometrul sau liderul? Un cuvânt. 2. Poți vorbi peste coleg? Scrie da sau nu.',
        recap: 'Roluri clare, vorbă pe rând, surse notate. Greșeală: un singur elev face tot, iar ceilalți doar semnează.'
      }),
      lesson('poster-lexic', 'Posterul cu un câmp lexical', {
        theory: 'Posterul amestecă text și imagine. Alegi un câmp: hobby-ul tău sau mâncarea, sportul, simbolurile. Pui cuvinte-cheie care spun subiectul. Informațiile vin din mai multe discipline. Posterul este făcut de tine, nu copiat.',
        example: 'Subiectul este ciorba. Cuvântul-cheie este ciorba. De la istorie iei o sărbătoare, de la geografie o regiune, de la desen farfuria. Trei discipline, un singur câmp: mâncarea.',
        tryThis: '1. Pentru diversitate ajunge o singură disciplină? Scrie da sau nu. 2. Vorba care anunță subiectul este cheie sau gol? Un cuvânt.',
        recap: 'Câmp, cuvinte-cheie, mai multe materii, lucrare făcută de tine. Greșeală: un desen frumos, fără niciun cuvânt care să spună tema.'
      }),
      lesson('cuvant-alfabet', 'Cuvântul, alfabetul, formă și sens', {
        theory: 'Cuvântul este unitatea de bază a vocabularului. Are un sens și o formă: sunete când îl spui, litere când îl scrii. Alfabetul este lista literelor, într-o ordine fixă. Cel românesc are 31 de litere și vine din cel latin. În dicționar cauți după ordinea aceasta.',
        example: 'carte și book numesc același obiect, cu alte litere. Ca să cauți „roman” într-un dicționar tipărit, nu sări la mijloc. R vine înaintea lui V, deci roman stă înaintea lui viitor.',
        tryThis: '1. Câte litere are alfabetul limbii române? Scrie numărul. 2. „roman” stă înaintea lui „viitor” sau după? Scrie inainte sau dupa.',
        recap: 'Sensul plus forma fac cuvântul. Sunt 31 de litere, în ordine latină. Greșeală: cauți în dicționar la întâmplare, nu după alfabet.'
      }),
      lesson('chirilic', 'De la chirilică la litere latine', {
        theory: 'Primele cărți românești au fost scrise cu alfabet chirilic, un alfabet slav vechi. A fost scrisul oficial până în 1860. Apoi au venit literele latine de azi. O cronică veche poate avea semne necunoscute. Nu este neapărat altă limbă.',
        example: 'Cuvântul carte, scris cu litere latine, îl recunoști. Aceeași idee, scrisă chirilic, îți pare un șir străin până înveți semnele. Pagina nu și-a schimbat limba. Și-a schimbat alfabetul.',
        tryThis: '1. Până în ce an a fost chirilica scrierea oficială la noi? Scrie anul. 2. Literele de azi sunt latine sau chirilice? Un cuvânt.',
        recap: 'Până în 1860, oficial, chirilică. Azi, latină. Greșeală: crezi că o pagină cu alte litere este automat altă limbă.'
      }),
      lesson('litere-imprumut', 'Litere din cuvintele împrumutate', {
        theory: 'În alfabet stau și litere folosite mai ales în cuvinte luate din alte limbi sau în nume: k, w, q, y. Le întâlnești în kilometru sau în watt. Nu le schimbi după ureche, dacă norma le păstrează. Sensul îl cauți în dicționar. Litera o verifici la scrierea corectă.',
        example: 'kilogram se scrie cu k, nu cu c. watt păstrează w. Dacă înlocuiești litera din capul tău, cuvântul nu mai este cel din dicționar și poate să nu mai fie găsit.',
        tryThis: '1. Litera k din kilometru este imprumut sau diacritica? Un cuvânt. 2. O schimbi după ureche? Scrie da sau nu.',
        recap: 'k, w, q și y apar în împrumuturi și în nume. Le păstrezi cum cere norma. Greșeală: le înlocuiești cu c sau v doar pentru că așa ți se pare.'
      }),
      lesson('diacritice', 'Semnele de pe litere', {
        theory: 'Diacriticele sunt semne puse pe literă. Ele schimbă pronunția. Căciulița stă pe ă. Virgula stă pe ș și pe ț. Accentul circumflex stă pe â și pe î. Fără ele, cuvântul poate însemna altceva. Le pui mereu, nu doar când ți se pare că arată bine.',
        example: 'român fără căciuliță devine roman și nu mai spune același lucru. masă fără căciuliță este masa, care poate fi alt cuvânt. Celălalt râde pentru că s-a schimbat sensul.',
        tryThis: '1. Semnul de pe ă este caciulita sau virgula? Un cuvânt. 2. Fără diacritice, sensul rămâne acelasi sau se poate schimba? Scrie acelasi sau se-schimba.',
        recap: 'Trei semne: căciuliță, virgulă, circumflex. Ele pot schimba sensul. Greșeală: le lași din grabă și crezi că se înțelege la fel.'
      }),
      lesson('silaba', 'Silaba, sunetele, accentul, literă și sunet', {
        theory: 'Silaba este un sunet sau un grup spus dintr-o singură deschidere a gurii. Într-o silabă stă o singură vocală. Vocalele se rostesc singure: a, ă, â, î, e, i, o, u. Consoanele au nevoie de o vocală: b, c, d, f, g, h, j, k, l, m, n, p, r, s, ș, t, ț, v, z.',
        example: 'acasă se desparte a-ca-să. Sunt trei deschideri, deci trei silabe. Vocalele sunt a, a și ă. Nu numeri toate literele. Numeri vocalele care țin silaba.',
        tryThis: '1. Câte silabe are acasă? Scrie numărul. 2. Litera b este vocala sau consoana? Un cuvânt.',
        recap: 'O silabă, o vocală, o deschidere de gură. Greșeală: numeri toate literele și le numești silabe.'
      }),
      lesson('semivocala', 'Semivocala', {
        theory: 'e, i, o și u sunt vocale când poartă silaba. Sunt semivocale când nu fac singure o silabă, ci stau lângă o altă vocală. Le recunoști ușor când sunt urmate de a, ă sau î, ca în seară. Semivocala se aude mai scurt. Vocala se aude mai prelung.',
        example: 'În tei, t este consoană, e este vocală, iar i este semivocală. În zeu, e poartă silaba și este vocală. Nu pune i din tei în aceeași cutie cu e din zeu.',
        tryThis: '1. În tei, litera i este vocala sau semivocala? Un cuvânt. 2. Semivocala face singură o silabă? Scrie da sau nu.',
        recap: 'e, i, o și u pot fi vocale sau semivocale. Semivocala nu ține singură silaba. Greșeală: orice e sau i ți se pare vocală.'
      }),
      lesson('accent', 'Accentul', {
        theory: 'Accentul este pronunțarea mai puternică sau mai înaltă a unei silabe. Poate schimba sensul. Dacă nu ești sigur, cauți cuvântul în DOOM. Nu pui apăsarea unde îți vine. Limba standard este forma folosită de toată comunitatea, după norme. Accentul face parte din normă.',
        example: 'Maria e veselă poate însemna că e voioasă, dacă apeși începutul. Dacă apeși mijlocul, veselă poate însemna vasele de pe masă. Aceleași litere, alt accent, alt sens.',
        tryThis: '1. În carte, silaba accentuată este car sau te? Un cuvânt. 2. Accentul nesigur se verifică în doom sau dupa ureche? Scrie doom sau ureche.',
        recap: 'Accentul este silaba mai puternică și poate schimba sensul. Greșeală: apeși la întâmplare și crezi că este tot același cuvânt.'
      }),
      lesson('litere-sunete', 'Litere și sunete', {
        theory: 'De regulă, un sunet se scrie cu o literă. Nu este o lege fără excepții. Litera x redă două sunete: cs, ca în fix, sau gz, ca în exemplu. Același sunet poate avea litere diferite. Sunetul k se scrie c în casă și k în karate. Sunetul v se scrie v sau w.',
        example: 'fix are 3 litere și 4 sunete, pentru că x valorează cs. casă și karate încep cu același sunet, dar nu cu aceeași literă. Nu le corectezi una după cealaltă.',
        tryThis: '1. În fix, litera x valorează un sunet sau doua? Scrie unu sau doua. 2. karate începe cu litera c sau k? Un cuvânt.',
        recap: 'De obicei, o literă înseamnă un sunet. x înseamnă două sunete. k și w pot scrie sunete pe care le ai și cu c sau v. Greșeală: numeri literele și spui că ai tot atâtea sunete.'
      }),
      lesson('litera-ajutatoare', 'Litera care doar ajută', {
        theory: 'Unele litere nu se aud ca ele însele. În che, chi, ghe și ghi, h ajută pronunția și nu se citește ca h din haz. În ce, ci, ge și gi, e sau i poate fi doar semn pentru consoana moale, nu o vocală plină. Litera de lângă, adică contextul, decide.',
        example: 'În chemare, h nu se aude ca în hrană. În hrană, h este consoană. În geme, e de după g schimbă sunetul lui g. Nu este același g ca în gaz.',
        tryThis: '1. În hrană, h este consoana sau semn? Un cuvânt. 2. În chemare, h se aude ca în haz? Scrie da sau nu.',
        recap: 'h poate fi consoană sau literă ajutătoare. e și i pot marca un sunet moale. Greșeală: citești che ca pe c, plus h, plus e.'
      }),
      lesson('i-sau-a', 'î, â și m înainte de b', {
        theory: 'La începutul și la sfârșitul cuvântului scrii î: în, coborî. În interior scrii â: adânc, român. Dacă rădăcina începe cu î și pui un prefix, î rămâne: neîngrijit, reîncepe, subînțeles. Înainte de b sau p, prefixul în- se scrie cu m: împăduri, îmbătrâni.',
        example: 'neângrijit este greșit, pentru că după ne- rădăcina este îngrijit, cu î. Corect este neîngrijit. adânc are â, fiindcă sunetul stă în mijloc, fără prefix. împăduri are m, pentru că urmează p.',
        tryThis: '1. După ne-, forma corectă păstrează i sau a? Scrie i sau a. 2. Înainte de b sau p scrii m sau n? Un cuvânt.',
        recap: 'î la capete, â în interior, î după prefix, m înainte de b sau p. Greșeală: pui â peste tot în mijloc, chiar și după ne- sau re-.'
      }),
      lesson('sinonime', 'Sinonime și antonime', {
        theory: 'Sinonimele au formă diferită și același înțeles. Le alegi după frază, nu după primul cuvânt din listă. „Au ridicat un zid” înseamnă au construit. „I-au ridicat pedeapsa” înseamnă au anulat-o. Dacă repeți de patru ori „frumos”, textul slăbește.',
        example: '„Pisica e frumoasă. Are mustăți frumoase și ochi frumoși.” Devine: „Pisica e blândă. Are mustăți lungi și ochi limpezi.” Sensul rămâne. Vorbele nu se mai calcă una pe alta.',
        tryThis: '1. În „au ridicat un zid”, sinonimul este construi sau anula? Un cuvânt. 2. Același adjectiv de patru ori este bine sau slab? Un cuvânt.',
        recap: 'Aceeași idee, altă formă. Contextul alege sinonimul. Greșeală: lipești primul cuvânt din listă sau repeți același adjectiv.'
      }),
      lesson('antonime', 'Antonimele', {
        theory: 'Antonimele au formă diferită și sens opus: mare și mic, bucurie și tristețe, furie și calm, speranță și disperare. „Nu merg” se opune lui „merg”, dar nu este antonim. Este aceeași vorbă cu „nu”. Antonimul este alt cuvânt. Îl verifici în frază.',
        example: '„Camera e luminoasă.” Opusul potrivit este „întunecoasă”, nu „urâtă”. Urât schimbă frumusețea, nu lumina. La emoții, bucuria stă în fața tristeții, nu în fața furiei.',
        tryThis: '1. Antonimul lui bucurie este tristete sau furie? Un cuvânt. 2. „Nu merg” este antonim sau negatie? Un cuvânt.',
        recap: 'Antonimul este alt cuvânt, cu sensul din partea cealaltă. Greșeală: lipești „nu” și crezi că ai găsit antonimul.'
      }),
      lesson('notite', 'Cum îți iei notițe', {
        theory: 'Notițele trebuie citite și peste o săptămână. Lași loc între titlu și text. Data stă sus, în dreapta. Subliniezi cuvintele-cheie. Poți folosi culori și scheme. Unele texte sunt doar paragrafe. Altele amestecă vorbe cu desene sau hărți.',
        example: 'Titlu: Cauza și efectul. Data, în dreapta. Paragraf: un copil cere mereu dulciuri. Efect: cei din casă obosesc. Săgeata dintre cele două este schema. Nu scrii totul într-un bloc, fără aer.',
        tryThis: '1. Data se scrie sus, în dreapta sau în stanga? Un cuvânt. 2. Un paragraf ține una sau multe idei principale? Scrie una sau multe.',
        recap: 'Dată, spațiu, o idee pe paragraf, cuvinte-cheie subliniate. Greșeală: un caiet plin, fără titlu și fără loc între rânduri.'
      }),
      lesson('paragraf', 'Paragraful și etapele scrierii', {
        theory: 'Paragraful este o bucată unitară, cu o idee, despărțită printr-un alineat nou. Când treci la altă idee, începi rând nou. Cauza spune de ce se întâmplă. Efectul spune ce urmează. Le poți pune în două paragrafe sau într-o schemă.',
        example: 'Cauză: a repetat același cuvânt toată ziua. Efect: cei din jur nu l-au mai auzit. Două idei, două paragrafe. Dacă le lipești fără alineat, cititorul nu vede unde se schimbă firul.',
        tryThis: '1. Paragraful nou începe cu alineat sau in acelasi rand? Scrie alineat sau rand. 2. Ce urmează dintr-o cauză se numește efect sau titlu? Un cuvânt.',
        recap: 'Un alineat, o idee. Cauza explică. Efectul arată urmarea. Greșeală: tot textul într-un singur bloc.'
      }),
      lesson('proiect', 'Etapele unui proiect', {
        theory: 'Alegi o temă care te interesează. Scrii cel puțin două întrebări. Apoi o îngustezi: o expresie, o credință, un desen. Află termenul de predare. Abia apoi faci planul și alegi tipul: compunere, prezentare sau poster. Sursele pot fi manuale, enciclopedii sau cărți.',
        example: 'Tema mare este animalele. Întrebările: de ce se sperie unii de pisica neagră și cum o văd alte culturi. Produsul este un poster, pentru că termenul este scurt.',
        tryThis: '1. Câte întrebări de documentare scrii, minimum? Scrie numărul. 2. Planul se face înainte să știi termenul sau dupa? Un cuvânt.',
        recap: 'Întrebări, apoi detalii, apoi plan, după ce știi termenul. Greșeală: începi să scrii înainte să știi ce formă trebuie să aibă lucrarea.'
      }),
      lesson('autoevaluare-proiect', 'Cum îți notezi proiectul', {
        theory: 'Te notezi până la 100 de puncte. Structura unitară: 10. Tema nuanțată: 20. Scrierea: 20 sub patru greșeli, 10 peste patru, 5 peste opt. Pagina: 10. Surse credibile: 10. Anexa cu sursele: 20. Felul tău de a uni textul cu imaginea: 10.',
        example: 'Ai un poster clar, dar fără lista de surse. Pierzi anexa, adică 20 de puncte, chiar dacă desenul este frumos. La cinci greșeli de scriere nu mai iei 20, ci 10.',
        tryThis: '1. Câte puncte valorează anexa cu sursele? Scrie numărul. 2. Sub patru greșeli de scriere iei 20 sau 5? Scrie numărul.',
        recap: '100 de puncte pe șapte criterii. Sursele și tema cântăresc cel mai mult. Greșeală: un colaj frumos, fără să se vadă de unde ai luat informația.'
      }),
      lesson('empatie', 'Temă, detaliu, dialog, empatie', {
        theory: 'Tema este ideea centrală, în linii mari. O numești scurt: călătoria, copilăria, școala. Detaliul o face de crezut: un gest, un obiect, un loc. Empatia înseamnă să înțelegi gândurile și dorințele celuilalt. Te pui în pielea lui. Nu înseamnă să fii de acord cu tot.',
        example: 'Tema este copilăria. Detaliul bun: „ghiozdanul îmi bătea în genunchi”. Detaliul gol: „eram emoționat”. Empatie: înțelegi că vrea să scrie, nu doar să asculte.',
        tryThis: '1. Tema se numește cu un substantiv sau cu o pagina? Scrie substantiv sau pagina. 2. Empatia înseamnă să fii mereu de acord? Scrie da sau nu.',
        recap: 'Tema spune despre ce este. Detaliul arată. Empatia înseamnă să înțelegi dorința celuilalt. Greșeală: „a fost frumos”, fără o faptă.'
      }),
      lesson('dialog-atent', 'Vorbitor și ascultător, cu grijă', {
        theory: 'Ești pe rând vorbitor și ascultător. Vorbitorul spune clar, pe temă, cu voce cât să fie auzit, nu cât să deranjeze, și îl invită pe celălalt. Ascultătorul se uită la el, nu îl întrerupe și nu vorbește odată cu el. Dacă nu a înțeles, cere o clarificare.',
        example: 'Ioana spune de ce i-a plăcut un personaj, apoi tace. Andrei se uită la ea și întreabă ce i s-a părut grijuliu. „Ba nu!”, spus peste ea, nu este ascultare.',
        tryThis: '1. Ascultătorul poate întrerupe? Scrie da sau nu. 2. Vorbitorul îl invită pe celălalt sau vorbește doar el? Scrie invita sau doar-el.',
        recap: 'Clar, pe temă, cu voce potrivită. Celălalt se uită și întreabă după. Greșeală: doi oameni vorbesc deodată și numesc asta dialog.'
      }),
      lesson('tiparita-digitala', 'Carte tipărită sau digitală', {
        theory: 'Cartea tipărită și cea digitală duc același text. Tipărită: nu are baterie, o poți dărui și nu o ștergi dintr-un clic. Digitală: iei multe volume fără greutate, dar bateria se poate termina. Alegi după drum, nu după modă.',
        example: 'În tren, zece povești încap într-un e-reader. Asta este forma digitală. Pe noptieră, pagina care foșnește și pe care o poți împrumuta este tipărită. Ambele sunt cărți. Se schimbă suportul.',
        tryThis: '1. Cartea fără baterie este tiparita sau digitala? Un cuvânt. 2. Zece cărți fără greutate țin de tiparita sau de digitala? Un cuvânt.',
        recap: 'Aceeași lectură, alt suport. Fiecare are un câștig și o limită. Greșeală: spui că una dintre ele nu este carte.'
      }),
      lesson('intrebare-deschisa', 'Întrebarea deschisă', {
        theory: 'Întrebarea deschisă nu se rezolvă cu da sau nu. Începe cu ce, care, cum sau de ce. Așa afli un răspuns, nu un semn din cap. Pentru un cadou, întrebi ce i-a plăcut, nu doar dacă îi place să citească.',
        example: '„Îți place cartea?” este închisă. „Ce carte ai reciti?” este deschisă. A doua îți dă un titlu, nu un da. De aceea o folosești când cauți un cadou.',
        tryThis: '1. „Îți place să citești?” este deschisa sau inchisa? Un cuvânt. 2. „Ce gen preferi?” este deschisa sau inchisa? Un cuvânt.',
        recap: 'Deschis înseamnă un răspuns pe larg. Închis înseamnă da sau nu. Greșeală: pui patru întrebări cu da și nu și crezi că l-ai cunoscut pe coleg.'
      }),
      lesson('de-ce-citim', 'De ce să citești', {
        theory: 'Poți trăi fără cărți, dar pierzi o convorbire cu alte vremuri. Cititul fără înțelegere este gol. Tiparul în limba română începe în secolul al XVI-lea. O carte din 1544 nu s-a păstrat. Cea mai veche tipăritură din care au rămas exemplare este din 1551–1553.',
        example: 'Cineva a citit zece pagini și nu poate spune despre ce erau. Un coleg care poate povesti o scenă a citit cu folos.',
        tryThis: '1. Cititul fără înțelegere este util sau gol? Un cuvânt. 2. Cea mai veche tipăritură românească păstrată este din secolul 16 sau 20? Scrie numărul.',
        recap: 'Citești ca să înțelegi, nu ca să numeri pagini. Tiparul românesc păstrat începe în secolul al XVI-lea. Greșeală: crezi că ai citit doar pentru că ai trecut cu ochii.'
      }),
      lesson('nu-adauga-i', 'Nu adăuga un i în plus', {
        theory: 'Nu pune un i în plus doar pentru că așa îți sună în grabă. era nu se scrie iera. epocă nu se scrie iepocă. Rămâne și regula de dinainte: înainte de b sau p, prefixul în- se scrie îm. înpădurire este greșit. împădurire este corect.',
        example: '„Acolo iera altă iepocă” are două i-uri în plus. Corect: „Acolo era altă epocă.” înpădurirea primește m, pentru că urmează p: împădurirea. Le corectezi pe toate, nu doar pe prima.',
        tryThis: '1. Forma corectă este era sau iera? Un cuvânt. 2. Înainte de p scrii im sau in? Un cuvânt.',
        recap: 'Nu adăuga i unde nu este. Înainte de p sau b, scrii îm. Greșeală: copiezi mesajul grăbit și îl lași cu iera și cu înpădurire.'
      }),
      lesson('evaluare-carte', 'Evaluarea unității despre carte', {
        theory: 'Ai 10 puncte din oficiu. Nota iese din totalul împărțit la 10. Compunerea cere minimum 80 de cuvinte și subiectul dat. Pui detalii despre personaje, spațiu și timp. Introducerea, cuprinsul și încheierea stau în paragrafe separate.',
        example: 'O întâmplare cu o ființă, un spațiu și un moment, în trei paragrafe, ține cerința. Două rânduri, fără loc și fără timp, nu iau punctele de detaliu.',
        tryThis: '1. Câte puncte sunt din oficiu? Scrie numărul. 2. Minimul de cuvinte la compunere este 80 sau 8? Scrie numărul.',
        recap: 'Din oficiu sunt 10 puncte. Compunerea are 80 de cuvinte, detalii de personaj, spațiu și timp, trei paragrafe. Greșeală: o poveste scurtă, fără loc și fără alineate.'
      }),
      lesson('placere-indatorire', 'Îndatorire și plăcere', {
        theory: 'Pe fișă separi ce este îndatorire de ce îți face plăcere. Scrii trei și trei. Apoi spui unde stă cititul: la datorie, la plăcere sau la amândouă. Dai un titlu temei. Mai adaugi două enunțuri afirmative și două propoziții negative, cu detalii, nu cu „e ok”.',
        example: 'Îndatorire: îmi fac tema de mate. Plăcere: citesc seara o poveste. Titlul: Cititul meu stă la plăcere. Afirmativ: „Citesc după cină.” Negativ: „Nu citesc în pauza de zece minute.”',
        tryThis: '1. Câte lucruri scrii la îndatoriri? Scrie numărul. 2. Câte propoziții negative se cer? Scrie numărul.',
        recap: 'Trei îndatoriri, trei plăceri, un titlu, două afirmații și două negații. Greșeală: o listă amestecată, fără să spui unde stă cititul.'
      })
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
      { term: 'text narativ', meaning: 'Spune întâmplări imaginare, cu personaje, în timp și spațiu.' },
      { term: 'personificare', meaning: 'Un lucru, un animal sau un fenomen primește o faptă de om.' },
      { term: 'mod', meaning: 'Felul în care vorbitorul privește acțiunea: fapt, posibil, condiție sau cerere.' },
      { term: 'imperativ', meaning: 'Modul cu care ceri, îndemni, rogi, sfătuiești sau interzici, la persoana a II-a.' },
      { term: 'secvență narativă', meaning: 'O bucată cu o situație, o schimbare și un rezultat, nu toată cartea.' },
      { term: 'indicativ', meaning: 'Modul care prezintă acțiunea ca pe un fapt, în prezent, trecut sau viitor.' },
      { term: 'imperfect', meaning: 'Timp trecut pentru o acțiune care durează sau se repetă.' },
      { term: 'perfect compus', meaning: 'Timp trecut compus din a avea și participiu, pentru o acțiune încheiată.' },
      { term: 'perfect simplu', meaning: 'Timp trecut simplu, pentru o acțiune încheiată, vie în povestire.' },
      { term: 'mai-mult-ca-perfect', meaning: 'Acțiune trecută, terminată înaintea altei acțiuni trecute.' },
      { term: 'bandă desenată', meaning: 'Povestire în cadre, unde desenul cântărește mai mult decât vorba.' },
      { term: 'onomatopee', meaning: 'Cuvânt care imită un zgomot, o acțiune sau un sunet.' },
      { term: 'pantomimă', meaning: 'Povestire spusă doar prin gest, fără cuvinte.' }
    ],
    lessons: [
      lesson('deschidere-poveste', 'Poveștile care se transmit', {
        theory: 'Oamenii își trec poveștile din casă în casă, pe vorbă sau în scris. O povestire te poate amuza, întrista sau ține în suspans. Aici reiei personajul și verbul, apoi descoperi narativul literar, personificarea, imperativul și indicativul. Competențele sunt 1.1, 2.3, 3.1, 4.4 și 5.2.',
        example: 'Pe o hartă, o săgeată leagă două case și scrie „poveste spusă seara”. Așa se vede drumul unei întâmplări.',
        tryThis: '1. Câte competențe specifice deschid unitatea? Scrie numărul. 2. Banda desenată se face acum sau mai-tarziu? Un cuvânt, cu cratimă.',
        recap: 'Poveștile se transmit. Aici prinzi narativul, personificarea și două moduri. Greșeală: sari la timpurile verbului înainte să știi cine face acțiunea.'
      }),
      lesson('narativ', 'Textul narativ: acțiune, personaje, timp, spațiu, personificare', {
        theory: 'Un text cu întâmplări imaginare și personaje este narativ literar. Acțiunea e ce se schimbă. Personajele sunt participanți imaginari, creați de autor. Timpul spune când. Spațiul spune unde. Fără întâmplări, textul e descriere.',
        example: '„O fată pierde cheia și o caută până la poartă.” E narativ: se schimbă ceva. „Parcul are bănci verzi.” e descriere: nu se întâmplă nimic.',
        tryThis: '1. „Lacul e liniștit și albastru.” este narativ sau descriere? Un cuvânt. 2. Participanții imaginari se numesc personaje sau autori? Un cuvânt.',
        recap: 'Narativ literar înseamnă întâmplări imaginare și personaje. Timpul și spațiul le așază. Greșeală: numești povestire un tablou în care nu se schimbă nimic.'
      }),
      lesson('asteptari-titlu', 'Așteptarea din titlu', {
        theory: 'Titlul trezește o așteptare. După lectură, ea se confirmă sau se contrazice. O spui în două mișcări: citind titlul, apoi am aflat. Un titlu nou pentru un fragment dă un indiciu, nu repetă tot episodul.',
        example: '„Câinele viteaz” te face să aștepți curaj. Dacă textul arată un câine speriat, așteptarea se schimbă: „Citind titlul, m-am gândit că e curajos, apoi am aflat că îi era frică.”',
        tryThis: '1. Dacă titlul promite veselie, iar textul e trist, așteptarea e confirmata sau contrazisa? Un cuvânt. 2. Titlul unui fragment trebuie să dea un indiciu sau o gluma? Un cuvânt.',
        recap: 'Titlul deschide o așteptare. Lectura o ține sau o schimbă. Greșeală: spui doar „mi-a plăcut”, fără ce ai crezut și ce ai aflat.'
      }),
      lesson('indicii-timp', 'Indiciile de timp și de spațiu', {
        theory: 'Întâmplările stau într-un spațiu și într-un timp. Aduni mai multe indicii, nu un singur cuvânt. Dacă cineva pomenește Egiptul, acțiunea nu e automat acolo. Dacă păsările au plecat de săptămâni, e târziu în an. Descrierea arată locul și momentul.',
        example: '„Afară ningea, iar rândunica stătea la fereastră.” Timpul e iarna. Spațiul e lângă fereastră. „Africa”, spusă într-o amintire, nu mută scena.',
        tryThis: '1. Un personaj spune „piramide”. Asta înseamnă că toată acțiunea e în Egipt? Scrie da sau nu. 2. „Unde” se numește timp sau spatiu? Un cuvânt.',
        recap: 'Spațiul și timpul ies din mai multe indicii. Greșeală: muți povestea într-o țară doar pentru că un cuvânt o numește.'
      }),
      lesson('personificare', 'Personificarea', {
        theory: 'Personificarea dă unui lucru, unui fenomen sau unui animal o acțiune de om. Comparația are „ca” și nu transformă lucrul în om. O statuie care privește, vorbește sau plânge este personificare.',
        example: '„Statuia privește orașul și plânge.” face fapte de om: e personificare. „Statuia e rece ca gheața.” e comparație, pentru că apare „ca”.',
        tryThis: '1. „Vântul șoptește la geam.” este personificare sau comparatie? Un cuvânt. 2. „Pisica doarme ca un om.” are „ca”. E personificare? Scrie da sau nu.',
        recap: 'Personificarea pune o faptă de om pe un lucru, un animal sau un fenomen. Comparația păstrează „ca”. Greșeală: numești personificare orice propoziție cu un animal.'
      }),
      lesson('parere-schimbata', 'Părerea care se schimbă', {
        theory: 'Părerea despre cineva se poate schimba când apar fapte noi. O spui în trei pași: la început, apoi, în final. Nu toți țin aceeași atitudine tot textul. Când povestești schimbarea, arăți motivul, nu doar rezultatul.',
        example: 'La început, colegii cred că Mara e rea pentru că stă retrasă. Apoi văd că își împarte micul dejun. În final, spun că e timidă, nu rea.',
        tryThis: '1. Ultimul moment al schimbării se leagă cu început, apoi sau final? Un cuvânt. 2. O părere nouă apare fără nicio faptă nouă? Scrie da sau nu.',
        recap: 'Părerea se mișcă: la început, apoi, în final. Motivul e o faptă nouă. Greșeală: scrii doar finalul și lași cititorul fără drum.'
      }),
      lesson('compunere-narativa', 'Compunerea narativă', {
        theory: 'Compunerea narativă are cel puțin patru paragrafe: început, motiv, fapta în două sau trei episoade, tensiune și închidere. Timpii verbului arată ordinea. Poți adăuga o imagine. Iei ideea, nu copiezi textul citit.',
        example: 'Un băiat găsește o mănușă. Vrea să o ducă la proprietar. Întreabă la poartă, apoi la magazin. Magazinul se închide. O lasă la portar.',
        tryThis: '1. Câte paragrafe cere minimum compunerea? Scrie numărul. 2. Momentul cel mai strâns se numește inceput sau tensiune? Un cuvânt.',
        recap: 'Minimum patru paragrafe: început, motiv, fapte, tensiune, închidere. Timpii țin ordinea. Greșeală: un singur paragraf, fără motiv și fără tensiune.'
      }),
      lesson('verbul', 'Verbul: acțiune, timp, persoană', {
        theory: 'Verbul arată o acțiune, un eveniment sau o stare care se schimbă. Doar el își schimbă forma și pentru timp, și pentru persoană, față de momentul vorbirii. Timpul e prezent, trecut sau viitor. Mai ai persoană și număr. În dicționar cauți infinitivul: alint devine a alinta.',
        example: '„Acum plec.” e prezent, persoana I. „Ieri am plecat.” e trecut. „Mâine voi pleca.” e viitor. Aceeași faptă, trei forme.',
        tryThis: '1. „Voi citi diseară.” este trecut, prezent sau viitor? Un cuvânt. 2. Forma de dicționar pentru alint este alinta sau alintul? Un cuvânt.',
        recap: 'Verbul se schimbă după timp, persoană și număr. Dicționarul îl ține la infinitiv. Greșeală: cauți în DEX forma din propoziție, nu pe a alinta.'
      }),
      lesson('moduri', 'Modurile verbului', {
        theory: 'Modul arată cum privește vorbitorul acțiunea: sigură, dorită, condiționată, posibilă sau cerută. Indicativul o ia ca fapt: citesc. „Să citesc” o ia ca posibilă. „Aș citi dacă aș avea timp” o leagă de o condiție. „Citește!” o cere.',
        example: '„Sigur citesc povestea.” e indicativ. „E posibil să citesc.” arată o faptă posibilă. „Aș citi dacă aș avea timp.” e condiție. „Citește!” e cerere.',
        tryThis: '1. „Citește tot textul!” este indicativ sau imperativ? Un cuvânt. 2. „Aș citi dacă aș avea timp.” arată o cerere sau o conditie? Un cuvânt.',
        recap: 'Același verb, patru priviri: fapt, posibil, condiție, cerere. Greșeală: crezi că „Citește!” spune doar ce se întâmplă, nu ce se cere.'
      }),
      lesson('imperativ', 'Verbul, imperativul, nonverbalul, punctuația', {
        theory: 'La imperativ, verbul cere: ordin, îndemn, rugăminte, sfat sau interdicție. Are formă doar la persoana a II-a, singular și plural. Fața, gestul și tonul arată dacă e rugăminte sau ordin. În scris pui semnul exclamării. „A plecat.” este trecut, nu imperativ.',
        example: '„Stai!” e imperativ, persoana a II-a: ți se cere să te oprești. „A stat.” povestește o faptă gata. Palma ridicată ține aceeași cerere, fără un cuvânt nou.',
        tryThis: '1. Imperativul are forme la persoana I sau la persoana II? Scrie cifra romană. 2. „A plecat.” este ordin sau trecut? Un cuvânt.',
        recap: 'Imperativul cere, îndeamnă, roagă, sfătuiește sau interzice, la persoana a II-a. Tonul și semnul exclamării ajută. Greșeală: iei un verb la trecut drept ordin.'
      }),
      lesson('imperativ-scriere', 'Cum se scrie imperativul', {
        theory: 'Imperativul are capcane la scris. „Ești atent” devine „Fii atent!”, cu doi de i. „Fi atent” e greșit. Afirmativ spui „Fă!”. Negativ spui „Nu face!”, nu „Nu fă!”. „Du-te!” devine „Nu te duce!”, nu „Nu te du!”. De la persoana I treci la a II-a: „mă gândesc” devine „gândește-te”.',
        example: '„Ești calm.” devine „Fii calm!”. „Fă liniște.” la interdicție devine „Nu face gălăgie!”. „Du-te acasă.” devine „Nu te duce acum!”.',
        tryThis: '1. Forma corectă este fii sau fi? Un cuvânt. 2. Interdicția corectă este nu-fă sau nu-face? Un cuvânt, cu cratimă.',
        recap: 'Fii are doi de i. Negativul lui fă este nu face. Negativul lui du-te este nu te duce. Greșeală: pui doar „nu” în fața formei afirmative.'
      }),
      lesson('indicativ-1', 'Indicativul: prezent și imperfect', {
        theory: 'La indicativ, acțiunea e un fapt. În povestire, faptele stau într-o ordine. Dacă o schimbi, se schimbă înțelesul. Prezentul spune ce se întâmplă când vorbești, sau un adevăr care ține mereu. Imperfectul spune o acțiune trecută care durează sau se repetă.',
        example: '„Acum citesc.” e prezent. „În fiecare seară citeam.” e imperfect: se repeta. „Citeam când a sunat.” Fundalul e imperfect. Sunatul e fapta scurtă, la alt timp.',
        tryThis: '1. „Acum citesc.” este prezent sau imperfect? Un cuvânt. 2. O faptă trecută care se repetă este prezent sau imperfect? Un cuvânt.',
        recap: 'Indicativul prezintă fapte. Prezentul e acum sau mereu. Imperfectul durează sau se repetă. Greșeală: pui fundalul și întreruperea la același timp.'
      }),
      lesson('prezent-scriere', 'Conjugarea la prezent', {
        theory: 'Conjugarea schimbă forma după mod, timp, persoană și număr. La a fi, forma de azi este sunt. sînt e veche. îs și îi apar doar în unele contexte. Ei miros, nu miroase. Noi creăm, nu creem. Eu legăn, nu leagăn. La a crea urmezi a lucra: scoți ultima vocală și pui -ez, deci creez. Eu văd, nu văz. Eu prind, nu prinz.',
        example: '„Văz două păsări care zbor.” devine „Văd două păsări care zboară.” „Noi creem.” devine „Noi creăm.”',
        tryThis: '1. Forma standard de azi, la „noi”, pentru a fi este sunt sau sint? Un cuvânt. 2. Persoana I de la a crea este creez sau crez? Un cuvânt.',
        recap: 'Azi spui sunt, creăm, legăn, creez, văd. Greșeală: lași văz, zbor sau creem pentru că așa se aude în grabă.'
      }),
      lesson('imperfect-forme', 'Formele de imperfect', {
        theory: 'Imperfectul e o formă simplă. Terminațiile sunt -am, -ai, -a la singular și -am, -ați, -au la plural. La a merge: mergeam, mergeai, mergea, mergeam, mergeați, mergeau. Scrii eram, nu ieram. luam, nu luoam. ploua, nu ploa. dădeam, nu dam. stăteam, nu stam. La a vrea spui voiam sau vream. vroiam este greșit.',
        example: '„Eu ieram și vroiam să stau.” are două forme greșite. Corect: „Eu eram și voiam să stau.” „Afară ploua.” rămâne ploua, nu ploa.',
        tryThis: '1. Forma corectă este eram sau ieram? Un cuvânt. 2. Forma de evitat la a vrea este voiam sau vroiam? Un cuvânt.',
        recap: 'Imperfectul se termină în -am, -ai, -a, -am, -ați, -au. Fără i în plus și fără vroiam. Greșeală: scrii stam sau dam, fără ă și fără silaba care lipsește.'
      }),
      lesson('perfect-compus', 'Perfectul compus', {
        theory: 'Perfectul compus este un timp trecut pentru o acțiune încheiată. Se face din auxiliarul a avea și participiul în -t sau -s: am citit, ai scris, a venit. Auxiliarul se schimbă: am, ai, a, am, ați, au. Participiul rămâne. Imperfectul ține obișnuința. Perfectul compus aduce fapta care se termină.',
        example: '„În fiecare joi citeam.” e imperfect. „Joi am citit ultima pagină.” e perfect compus. Fără am, rămâne „citit” și nu se mai vede cine.',
        tryThis: '1. În „am citit”, auxiliarul este am sau citit? Un cuvânt. 2. Participiul lui a scrie este scris sau scriind? Un cuvânt.',
        recap: 'am, ai, a, am, ați, au plus participiu în -t sau -s. Fapta e încheiată. Greșeală: pui imperfectul pe fapta scurtă care întrerupe povestea.'
      }),
      lesson('ia-sau-la', 'ia, i-a, la, l-a', {
        theory: 'ia, fără cratimă, este prezentul lui a lua: ia cartea. i-a este perfect compus: i-a spus. la este prepoziție: la școală. l-a este pronume plus auxiliar: l-a văzut. a avea e verb de sine în „ei au o carte” și auxiliar în „ei au zis”. Dacă urmează un participiu, este auxiliar.',
        example: '„El ia sfaturile în serios.” e prezent. „El i-a spus un sfat.” e perfect. „Merge la școală.” are prepoziție. „L-a ascultat.” are auxiliar.',
        tryThis: '1. „El ia cartea.” este prezent sau perfect? Un cuvânt. 2. „Merg la școală.” se scrie la sau l-a? Un cuvânt.',
        recap: 'Cratima marchează auxiliarul: i-a, l-a. Fără cratimă, ia înseamnă a lua, iar la este prepoziție. Greșeală: pui cratimă la „la școală”.'
      }),
      lesson('perfecte', 'Perfectul simplu, mai-mult-ca-perfectul, secvența', {
        theory: 'Perfectul simplu este o acțiune trecută și încheiată. În povestire o face vie. În vorbire apare mai ales în Oltenia, pentru o faptă gata de foarte puțin timp. Mai-mult-ca-perfectul e fapta terminată înaintea altei fapte trecute. O secvență are o situație, o schimbare și un rezultat.',
        example: '„Când am intrat, el scrisese titlul.” „Scrisese” e mai-mult-ca-perfect. „Am intrat” vine după. Asta e o secvență, nu toată cartea.',
        tryThis: '1. Fapta scurtă și vie din povestire este perfect-simplu sau prezent? Un cuvânt, cu cratimă. 2. Fapta mai veche este plecase sau ajuns? Un cuvânt.',
        recap: 'Perfectul simplu învie fapta încheiată. Mai-mult-ca-perfectul stă înainte. Greșeală: îl iei drept prezent pentru că nu are auxiliar.'
      }),
      lesson('perfect-simplu-forme', 'Cum se scrie perfectul simplu', {
        theory: 'La plural, perfectul simplu primește grupul -ră: mâncarăm, mâncarăți, mâncară. La verbele în -i, eu are doi de i: venii. El este veni. „Cântă și dansează în fiecare zi” e prezent. „Cântă, apoi plecă” e perfect simplu. Verbul se acordă: Andrei zise, nu ziseră.',
        example: '„Îmi ziseră Andrei.” e greșit, pentru că Andrei e unul. Corect: „Îmi zise Andrei.” „Ei mâncară.” are -ră, pentru că sunt mai mulți.',
        tryThis: '1. La plural, perfectul simplu primește grupul ra sau se? Un cuvânt. 2. „Andrei zise.” Subiectul este singular sau plural? Un cuvânt.',
        recap: 'Pluralul are -ră. Eu venii, el veni. Contextul desparte prezentul de perfectul simplu. Greșeală: pui pluralul când subiectul e unul singur.'
      }),
      lesson('mmp-forme', 'Formele de mai-mult-ca-perfect', {
        theory: 'Mai-mult-ca-perfectul se formează din perfectul simplu, cu grupul se. gândi plus se dă gândise. Terminațiile sunt -sem, -seși, -se, -serăm, -serăți, -seră. La plural, -ră este normă azi: plecaseră, nu plecase, când sunt mai mulți. Eu încercasem. Ei încercaseră. Trei prieteni ajutaseră, nu ajutase.',
        example: '„Când a ajuns mama, invitații plecaseră.” Plecarea e mai veche decât sosirea. „Eu încercasem o dată.” rămâne la singular, pentru că subiectul e eu.',
        tryThis: '1. La persoana a III-a, terminația este se sau sem? Un cuvânt. 2. Pentru ei, forma corectă este plecasera sau plecase? Un cuvânt.',
        recap: 'Mai-mult-ca-perfectul are se în terminație. Pluralul cere -ră. Greșeală: lași plecase când subiectul e la plural.'
      }),
      lesson('viitor-banda', 'Viitorul și banda desenată', {
        theory: 'Viitorul spune o acțiune de după momentul vorbirii, luată ca sigură. Forma standard se face cu a vrea și infinitivul: voi veni, vei apărea, va fugi, vom dormi, veți dori, vor îndrăgi. Scrii va apărea, nu va apare. va fi, nu va fii. voi ieși, nu voi ieșii. În bandă desenată, casetele stau în ordinea acțiunii.',
        example: '„Mâine voi citi.” e viitor standard. „Voi citii” are un i în plus. Trei casete: privește, cade, ridică. Înainte de ultima poate spune „O voi ridica.”',
        tryThis: '1. Auxiliarul standard este voi sau sunt? Un cuvânt. 2. Forma corectă este va-fi sau va-fii? Un cuvânt, cu cratimă.',
        recap: 'voi, vei, va, vom, veți, vor plus infinitiv. Fără i în plus la ieși, citi, fi. Greșeală: scrii va fii sau va apare.'
      }),
      lesson('viitor-variante', 'Viitorul din vorbire și viitorul anterior', {
        theory: 'În vorbire, viitorul mai apare cu a avea și să: am să merg, ai să visezi, o să rămână. O să rămână e corect. o să rămâie nu e. Mai există viitorul anterior: voi fi plus participiu, voi fi venit, voi fi vorbit. Înseamnă că fapta va fi gata înaintea altui moment din viitor.',
        example: '„Am să fiu gata.” e forma din vorbire. „Până atunci voi fi citit capitolul.” e viitor anterior: cititul va fi gata înainte de momentul acela.',
        tryThis: '1. „Am să merg.” ține de vorbire sau de participiu? Un cuvânt. 2. În „voi fi citit”, participiul este citit sau citi? Un cuvânt.',
        recap: 'am să și o să țin de vorbire. voi fi plus participiu este viitor anterior. Greșeală: scrii o să rămâie sau iei viitorul anterior drept prezent.'
      }),
      lesson('ascultare-activa', 'Ascultarea activă', {
        theory: 'Ascultarea activă înseamnă că urmărești interlocutorul și nu îl întrerupi. Ca să arăți că ai înțeles, pui o întrebare scurtă sau reformulezi. Când repeți un plan la viitor, treci persoana I la a II-a: „voi citi” devine „vei citi”, „o să plec” devine „o să pleci”.',
        example: 'Colegul spune: „Mai întâi voi zbura, apoi o să scriu o carte.” Tu spui: „Înțeleg că vei zbura, apoi o să scrii o carte. Unde vei zbura?”',
        tryThis: '1. Reformularea „Înțeleg că vei…” trece la persoana I sau II? Scrie cifra romană. 2. Îl întrerupi ca să arăți că asculți? Scrie da sau nu.',
        recap: 'Asculți până la capăt, apoi reformulezi. Persoana I devine a II-a. Greșeală: îl întrerupi sau lași „voi” când vorbești despre planul lui.'
      }),
      lesson('timp-compus', 'Timpurile compuse și scrierea viitorului', {
        theory: 'Viitorul nu este singurul timp compus. Perfectul compus se face cu a avea și participiu. Viitorul standard este voi merge. o să merg și am să merg țin de vorbire. Viitorul anterior este voi fi plus participiu. Scrii va fi, nu v-a fii. veți, nu ve-ți. veți ști, nu veți știi.',
        example: '„Va fi gata.” e viitor. „V-a fi” amestecă perfectul cu viitorul. „Când v-a întrebat” e trecut. „Când va întreba” e viitor.',
        tryThis: '1. Viitorul este singurul timp compus al indicativului? Scrie da sau nu. 2. Forma corectă este veti sau ve-ti? Un cuvânt.',
        recap: 'Compuse sunt perfectul compus, viitorul și viitorul anterior. va fi nu se scrie v-a fii. Greșeală: pui cratimă în veți sau un i în plus la ști.'
      }),
      lesson('banda-desenata', 'Banda desenată', {
        theory: 'Banda desenată este un text narativ mixt: desenul cântărește mai mult decât vorba. Are mai multe cadre, citite în ordine. Bula stă pe fond alb: rotundă, curbată sau dreptunghiulară. Norul ține gândul sau visul. Cuvântul care imită un zgomot e o onomatopee. Linia frântă arată drumul. Chenarul explică. Coada bulei arată cine vorbește.',
        example: 'O fată aleargă, iar lângă pantof scrie „poc”. Norul spune „Oare prind autobuzul?”. Coada de la „Stai!” pleacă de la coleg.',
        tryThis: '1. Gândul stă într-o bulă sau într-un nor? Un cuvânt. 2. Cuvântul care imită un zgomot este onomatopee sau chenar? Un cuvânt.',
        recap: 'Cadrul, bula, norul, onomatopeea și coada țin povestea. Greșeală: pui gândul în bula de vorbire sau sari peste cadre.'
      }),
      lesson('banda-nonverbal', 'Nonverbalul din bandă și echipa', {
        theory: 'În desen, fața, poziția corpului, privirea și gestul spun ce nu e scris. Banda poate fi inventată de tine sau poate relua o carte, fără să copiezi textul. În echipă, unul scrie întâmplarea, celălalt o desenează. La sfârșit spui ce ți-a plăcut și ce ai reținut.',
        example: 'Un băiat stă cu umerii lăsați și nu privește spre coleg. Fără replică, se vede că e supărat. Unul a scris scena, celălalt a desenat-o.',
        tryThis: '1. În echipă, cine desenează și cine scrie sunt aceeași persoană? Scrie da sau nu. 2. Umerii lăsați, fără cuvinte, țin de verbal sau de nonverbal? Un cuvânt.',
        recap: 'Nonverbalul stă în față, poziție, privire și gest. Unul scrie, altul desenează. Greșeală: povestea rămâne doar în text.'
      }),
      lesson('forme-narative', 'Formele povestirii și etapele compunerii', {
        theory: 'O povestire poate fi film, desen animat, bandă desenată, text literar sau nonliterar: relatare, anecdotă, știre. Pantomima o spune doar prin gest, fără cuvinte. Compunerea are trei etape: introducerea pregătește, cuprinsul aduce schimbarea, încheierea închide.',
        example: 'Introducere: „Rămâneam după oră.” Cuprins: „A sunat alarma.” Încheiere: „Am ieșit în curte.” Aceeași întâmplare poate fi jucată și fără vorbe.',
        tryThis: '1. Povestea jucată doar prin gest se numește film sau pantomima? Un cuvânt. 2. Etapa care închide compunerea este cuprins sau incheiere? Un cuvânt.',
        recap: 'Narativul are mai multe forme, de la știre la pantomimă. Compunerea are introducere, cuprins, încheiere. Greșeală: pui deznodământul în introducere.'
      }),
      lesson('norma-sortare', 'Limbă standard și abatere', {
        theory: 'La recapitulare desparți forma standard de abatere. sunt e standard. îs nu e forma de azi. luam e corect. loam nu e. eu plecasem, nu plecaserăm: grupul -ră e de plural. vei pustii e corect, fără un i în plus. îngrijesc, nu îngrijăsc. așază și afișează sunt forme corecte de prezent.',
        example: '„Eu îs și loam caietul.” devine „Eu sunt și luam caietul.” „Eu plecaserăm” devine „Eu plecasem.” „îngrijăsc florile” devine „îngrijesc florile.”',
        tryThis: '1. Forma standard este sunt sau is? Un cuvânt. 2. Pentru eu, forma corectă este plecasem sau plecaseram? Un cuvânt.',
        recap: 'Standard înseamnă forma acceptată azi. -ră nu intră la eu. Greșeală: scrii îs, loam sau îngrijăsc pentru că așa se aude.'
      }),
      lesson('cratima-le', 'neam, ne-am, le-au', {
        theory: 'neam, cu sensul de popor, se scrie într-un cuvânt, fără cratimă. ne-am este altceva: noi ne-am dus. le-au leagă pronumele le de auxiliarul au: le-au prețuit. leau, lipit, e greșit. va fi se scrie cu un singur i. va fii are un i în plus și nu e viitorul lui a fi.',
        example: '„Un neam le-au păstrat poveștile.” neam nu se taie. le-au are cratimă. „Ne-am dus acasă.” e pronume, tot cu cratimă, dar înseamnă noi.',
        tryThis: '1. Poporul, „un neam”, se scrie neam sau ne-am? Un cuvânt. 2. „Le-au citit.” se scrie le-au sau leau? Un cuvânt.',
        recap: 'Cratima desparte pronumele de verb: ne-am, le-au. neam, poporul, nu se desparte. Greșeală: lipești leau sau tai neam în două.'
      }),
      lesson('proiect-taram', 'Proiectul despre tărâmul de poveste', {
        theory: 'Proiectul întreabă cum este văzut un tărâm de poveste în cărți și filme, la noi și în alte culturi. Lucrați în grupe de 4 sau 5. Întâi planul, apoi ciorna, apoi revizia, cu termene. Rolurile: liderul coordonează, administratorul adună materialele, informaticianul caută programe, ilustratorul desenează, cronometrul păzește termenele.',
        example: 'Patru colegi aleg câte un rol. Liderul împarte capitolele: peisaj și mod de viață. Cronometrul scrie data ciornei.',
        tryThis: '1. Grupa are 4-5 elevi sau 10? Scrie 4-5 sau 10. 2. Cine păzește termenele: liderul sau cronometrul? Un cuvânt.',
        recap: 'Plan, ciornă, revizie. Cinci roluri și o sarcină comună. Greșeală: toată lumea face de toate și nimeni nu ține termenul.'
      }),
      lesson('grila-proiect', 'Grila proiectului', {
        theory: 'Proiectul se apreciază pe șapte criterii. La fiecare scrii total, parțial sau absent. Tema e respectată și restrânsă. Are structură de carte sau de prezentare, capitole sau slide-uri, informații din mai multe discipline, bibliografie la sfârșit, desene sau tabele. E atractiv și original.',
        example: 'Trei slide-uri, o hartă și o listă de cărți la final iau „total” la structură, desene și bibliografie. Dacă tema e doar un titlu, scrii „parțial”.',
        tryThis: '1. Câte criterii are grila? Scrie numărul. 2. Bibliografia stă la început sau la sfarsit? Un cuvânt.',
        recap: 'Șapte criterii, fiecare total, parțial sau absent. Bibliografia închide proiectul. Greșeală: notezi doar „frumos”, fără să treci prin listă.'
      }),
      lesson('recap-poveste', 'Recapitulare și evaluare', {
        theory: 'La evaluare citești textul din manual și notele de subsol. Completezi enunțul întreg, nu doar spațiul gol. Ai 10 puncte din oficiu. Totalul este 100. Nota iese împărțind la 10. Compunerea are trei paragrafe, fiecare de minimum 15 cuvinte, două informații din text, o personificare subliniată și verbe la fiecare timp al indicativului.',
        example: 'Un stânjen măsura cam 2 metri. Dacă ceva a crescut cu un stânjen, alegi intervalul dintre 2 și 3 metri. Răspunsul se sprijină pe notă.',
        tryThis: '1. Câte puncte sunt din oficiu? Scrie numărul. 2. Minimum de cuvinte într-un paragraf este 15 sau 80? Scrie numărul.',
        recap: '10 din oficiu, 100 în total, nota e totalul împărțit la 10. Greșeală: răspunzi fără enunțul întreg.'
      }),
      lesson('barem-poveste', 'Baremul evaluării', {
        theory: 'Punctele pe subiecte sunt 6, 6, 6, 8, 8, 8, 8, 10, 10 și 20. Compunerea valorează 20: 6 pentru două informații, 1 pentru personificare, 1 dacă o subliniezi, 6 pentru timpurile indicativului, 3 pentru paragrafe, 3 pentru scriere. Din oficiu mai sunt 10. 90 plus 10 fac 100.',
        example: 'Dacă personificarea nu e subliniată, pierzi punctul de subliniere și păstrezi punctul pentru procedeul folosit.',
        tryThis: '1. Compunerea valorează 20 sau 6 puncte? Scrie numărul. 2. Primele trei subiecte valorează fiecare 6 sau 8? Scrie numărul.',
        recap: 'Compunerea are 20 de puncte. Primele trei subiecte au câte 6. Greșeală: uiți sublinierea și pierzi un punct care era al tău.'
      }),
      lesson('reflectie-unitate', 'Fișa de reflecție', {
        theory: 'După unitate completezi o fișă de reflecție, la persoana I. Spui ce ai aflat, ce folosești la altă disciplină, ce ai descoperit despre tine și ce vrei să afli. Mai spui ce ai învățat, unde îți folosește și la ce te descurci mai bine decât înainte. Fișele stau în portofoliu.',
        example: '„Am aflat că imperfectul ține fundalul. Îmi folosește când povestesc un film. Recunosc mai repede o personificare.”',
        tryThis: '1. Reflecția se scrie la persoana I sau a III-a? Scrie cifra romană. 2. Fișele stau în portofoliu sau se arunca? Un cuvânt.',
        recap: 'Reflecția e despre ce ai aflat și ce schimbi. O păstrezi în portofoliu. Greșeală: scrii „a fost ok”, fără un exemplu.'
      }),
      lesson('autoevaluare-verb', 'Verb de acțiune și verb de stare', {
        theory: 'Când te evaluezi, alegi verbul potrivit. La „Mi-a plăcut să…” pui un verb de acțiune: să desenez. La „Am simțit că…” pui o stare: că eram mândru. Mai completezi ce ai reținut, ce nu ți-a plăcut, ce vrei să știi și de ce ți-a amintit lecția.',
        example: '„Mi-a plăcut să ordonez cadrele.” e acțiune. „Am simțit că povestea era limpede.” e stare. „Am reținut că norul ține gândul.”',
        tryThis: '1. „Mi-a plăcut să desenez.” cere un verb de actiune sau de stare? Un cuvânt. 2. „Am simțit că eram bucuros.” este actiune sau stare? Un cuvânt.',
        recap: '„să” plus verb ține acțiunea. „Am simțit că” ține starea. Greșeală: pui aceeași propoziție la ambele începuturi.'
      }),
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
      { term: 'inferență', meaning: 'Ce poți deduce din indicii, fără să inventezi o altă poveste.' },
      { term: 'identitate', meaning: 'Nume, rol, limbă, etnie și respectul pentru tine, spuse prin fapte.' },
      { term: 'determinare', meaning: 'Cât de cunoscut este obiectul numit de substantiv, prin articol.' },
      { term: 'atribut', meaning: 'Cuvântul care lămurește un substantiv: bun, de ieri, lui.' },
      { term: 'prepoziție', meaning: 'Cuvânt neflexibil care leagă un substantiv sau un pronume de alt termen.' }
    ],
    lessons: [
      lesson('deschidere-prietenie', 'Respectul și ce vei descoperi', {
        theory: 'Unitatea pornește de la respectul pentru orice om. Reiei substantivul, identitatea personală și descrierea. Descoperi articolul, identitatea națională și textul descriptiv. Prepoziția vine mai târziu. Competențele sunt 1.4, 2.4, 3.1, 4.2 și 5.1.',
        example: 'Înainte de text notezi numele, rolul, etnia, un portret și un articol. Abia apoi citești scrisoarea din manual.',
        tryThis: '1. Câte competențe specifice deschid unitatea? Scrie numărul. 2. Prepoziția se învață acum sau mai-tarziu? Un cuvânt, cu cratimă.',
        recap: 'Respectul deschide unitatea. Aici sunt identitatea, descrierea și articolul. Greșeală: sari la prepoziție înainte să știi despre cine vorbești.'
      }),
      lesson('identitate', 'Identitate personală și națională', {
        theory: 'Identitatea personală se vede în nume, rol, naționalitate, religie și etnie. Imaginea de sine e ce crezi despre tine. Stima de sine e respectul pentru tine. Identitatea națională e limba, sărbătorile și locurile comune. Prietenia poate trece peste etnie. Pe 18 decembrie, Ziua Minorităților Naționale.',
        example: '„Mă cheamă Ion, sunt elev și vorbesc româna.” Asta e identitate prin fapte. „Sunt cel mai bun” nu spune nici numele, nici limba.',
        tryThis: '1. Ziua Minorităților Naționale este în ziua de 18 sau de 1? Scrie numărul. 2. Respectul pentru tine se numește imagine sau stima? Un cuvânt.',
        recap: 'Personal înseamnă nume, rol, etnie, imagine și stimă. Național înseamnă ce împărtășești. Greșeală: reduci omul la un singur grup.'
      }),
      lesson('scrisoare-prieten', 'Scrisoarea și cuvântul de azi', {
        theory: 'În manual citești scrisoarea Vasile Porojan, de Vasile Alecsandri, de la Mircești, din 1881. Destinatarul este cel salutat, nu neapărat cel despre care se povestește. O afirmație poate fi sigură, probabilă sau imposibilă. Cuvântul vechi țigan este înlocuit azi cu rom. Lunile se scriu cu literă mică.',
        example: 'Scrisoarea salută un prieten și povestește despre altcineva. „Îi este adresată celui povestit” este imposibil. Scrii septembrie, nu Septembrie.',
        tryThis: '1. În ce an este datată scrisoarea? Scrie numărul. 2. Cuvântul de azi este rom sau tigan? Un cuvânt.',
        recap: 'Mircești, 1881. Destinatarul stă în salut. Azi spui rom. Greșeală: crezi că scrisoarea îi este adresată celui despre care se vorbește.'
      }),
      lesson('proiect-romi', 'Proiectul despre o comunitate', {
        theory: 'Proiectul poate fi o broșură sau o prezentare, făcut singur sau în echipă. Tema este viața unei comunități înainte și după o schimbare mare, verificată în surse. Cauți în manuale și enciclopedii și poți vorbi cu oameni din comunitate. Un cuvânt nou, de pildă din limba romani, stă lângă înțelesul lui.',
        example: 'Trei capitole: familia, sărbătoarea, o personalitate. La sfârșit scrii sursele. Cuvântul nou nu rămâne singur pe pagină.',
        tryThis: '1. Proiectul se face doar în echipă? Scrie da sau nu. 2. La sfârșit pui sursele sau un zvon? Un cuvânt.',
        recap: 'Broșură sau prezentare, cu surse verificate. Greșeală: povestești din auzite și nu scrii de unde știi.'
      }),
      lesson('inferente', 'Explicativ, descriptiv, deducție, real și aparență', {
        theory: 'Secvența explicativă spune de ce sau cum. Secvența descriptivă spune cum arată. Inferența se oprește la indiciu. Prietenia reală stă pe vorbă directă, loialitate și respect. Pe internet, profilul poate să nu fie omul. ID-ul nu este automat numele real. Forumul adună mesaje. Chatul este o vorbă pe loc.',
        example: 'Cineva scrie mereu „sunt fericit” și nu răspunde. Aparența e veselia. Nu știi dacă e așa. Nu inventezi o viață dintr-un ID.',
        tryThis: '1. Numele de utilizator este mereu numele real? Scrie da sau nu. 2. Vorbirea pe loc, scurtă, este forum sau chat? Un cuvânt.',
        recap: 'Explici de ce, descrii cum arată. ID-ul nu dovedește cine scrie. Greșeală: iei aparența de pe ecran drept omul întreg.'
      }),
      lesson('portret-prieten', 'Portretul prietenului', {
        theory: 'Portretul începe cu un plan: nume, prenume, poreclă, rol, cum arată, ce îi place, unde vă întâlniți și despre ce vorbiți. Scrii o ciornă, o schimbi cu un coleg și asculți o sugestie. Textul final are un enunț scurt și trei paragrafe. Lângă substantiv pui un atribut: prieten loial.',
        example: 'Plan: Mara, colegă, păr scurt, îi place desenul, vă vedeți în parc. Introducere: „Mara e prietena mea.” Apoi trei paragrafe: înfățișare, ce faceți, de ce contează.',
        tryThis: '1. Câte paragrafe are portretul, după introducere? Scrie numărul. 2. În „prieten loial”, loial este atribut sau verb? Un cuvânt.',
        recap: 'Întâi planul, apoi ciorna, apoi trei paragrafe. Atributul stă lângă substantiv. Greșeală: un rând, fără înfățișare și fără loc.'
      }),
      lesson('explicativ', 'Textul explicativ, norma, pașii scrierii', {
        theory: 'Textul explicativ îl învață pe cititor ceva, în ordine. Anunți subiectul: în această prezentare voi vorbi despre. Apoi spui două sau trei aspecte. Le dezvolți cu o comparație sau cu un exemplu. Încheierea reia pe scurt: o reflecție sau o invitație. Pașii sunt idei, plan, text. Limba standard o înțelege și cine nu e în grupul tău.',
        example: '„Voi vorbi despre prietenul de aproape și cel de pe ecran.” Aspect: îl vezi sau nu. Exemplu: un cont poate folosi poza altcuiva. Încheiere: verifici înainte să crezi.',
        tryThis: '1. Câte mișcări mari are explicația? Scrie numărul. 2. Prima mișcare este anunt sau exemplu? Un cuvânt.',
        recap: 'Anunți, alegi aspectele, dai un exemplu, închei. Greșeală: o părere fără exemplu și fără concluzie.'
      }),
      lesson('norma-internet', 'Limba standard pe internet', {
        theory: 'Pe internet, limba standard e respect. Nu înlocui că și ce cu k sau sh. Articulează: copilul, nu copilu. Scrie cuvântul întreg: cineva, nu cnv. Cratima stă la locul ei: dă-mi, nu dămi. voi scrieți este un cuvânt. voi scrie-ți mută cratima greșit. Secundele în plus îl respectă pe cititor. Emoticonul poate arăta fața, gestul sau emoția.',
        example: '„Knd vii?” devine „Când vii?”. „Dămi caietul” devine „Dă-mi caietul.” „Cnv știe” devine „Cineva știe.”',
        tryThis: '1. Forma corectă este cineva sau cnv? Un cuvânt. 2. „Dă-mi” se scrie cu cratima sau lipit? Un cuvânt.',
        recap: 'Scrii cuvinte întregi, cu articolul și cratima la locul lor. Greșeală: prescurtezi tot și lași cititorul să ghicească.'
      }),
      lesson('substantiv', 'Substantivul: gen, număr, comun și propriu', {
        theory: 'Substantivul este cuvântul flexibil care numește persoane, ființe, lucruri, locuri sau idei. Are gen și număr și poate primi un articol. Comunul numește o clasă: băiat. Propriul ia majusculă: Andrei. Lunile stau cu literă mică. După numele strigat pui virgulă. bunătate e substantiv. vesel e adjectiv.',
        example: '„un băiat / doi băieți” e masculin. „o fată” e feminin. „un dulap / două dulapuri” e neutru. „cățel” e comun, „Max” e propriu.',
        tryThis: '1. Luna a noua se scrie septembrie sau Septembrie? Un cuvânt. 2. Numele unui singur câine este comun sau propriu? Un cuvânt.',
        recap: 'Substantivul numește și se schimbă după număr. Propriul ia majusculă, luna nu. Greșeală: scrii Septembrie sau uiți virgula când strigi.'
      }),
      lesson('plural-substantiv', 'Pluralul și forma de dicționar', {
        theory: 'Pluralul se marchează prin sunete: casă, case. În dicționar, substantivul stă la singular: pomi dai pom, lalele dai lalea, creioane dai creion. Formele recomandate: sandviciuri, nu sendvișuri. ghiozdane, nu ghiozdanuri. ciocolate, nu ciocolăți. chibrituri, nu chibrite. aragaze, nu aragazuri.',
        example: 'Cauți „injecții” la injecție și „mătuși” la mătușă. „Trei ghiozdane și două sandviciuri” urmează forma recomandată, nu cea auzită în grabă.',
        tryThis: '1. Pluralul recomandat este ghiozdane sau ghiozdanuri? Un cuvânt. 2. Forma de dicționar pentru pomi este pom sau pomi? Un cuvânt.',
        recap: 'Dicționarul ține singularul. Înveți pluralul recomandat. Greșeală: scrii chibrite sau sendvișuri.'
      }),
      lesson('articol-prepozitie', 'Articolul, ortografia, prepoziția', {
        theory: 'Determinarea arată cât de cunoscut este obiectul. În dicționar, substantivul nu are articol: prieten, nu prietenul. Articolul nehotărât stă în față și arată că obiectul e puțin cunoscut: un, o, niște, unui, unor. Articolul hotărât se lipește și arată că e bine cunoscut: băiatul, fata, copiii. Prepoziția, care leagă fără să numească, vine în lecția următoare.',
        example: '„Un prieten ajută.” e unul oarecare. „Prietenul meu ajută.” e unul știut de amândoi. În DEX cauți orășel, nu orășelul.',
        tryThis: '1. „Prietenul meu” este hotarat sau nehotarat? Un cuvânt. 2. În dicționar cauți orasel sau oraselul? Un cuvânt.',
        recap: 'Nehotărâtul stă în față: un, o, niște. Hotărâtul se lipește. Greșeală: cauți în dicționar forma cu -ul.'
      }),
      lesson('articol-scriere', 'Cum se scrie articolul', {
        theory: 'Articolul hotărât ține de gen și de număr. -ul la masculin singular: băiatul. -a la feminin: fata. -le la plural feminin: mingile, nu mingiile. Lângă niște, doi sau multe nu pui articolul din coadă: niște copii, doi băieți. Toți copiii are și pluralul, și articolul. La genitiv: Florinei, nu lui Florina.',
        example: '„Un copil. Doi copii. Toți copiii.” Trei scrieri. „Florinei i-am scris.” rămâne Florinei. „mingiei” nu este o formă.',
        tryThis: '1. După niște scrii copii sau copiii? Un cuvânt. 2. Genitivul corect este Florinei sau lui-Florina? Un cuvânt.',
        recap: 'niște și doi nu primesc articolul din coadă. Toți copiii îl are. Greșeală: scrii niște copiii sau lui Florina.'
      }),
      lesson('atribut-substantiv', 'Substantivul și atributul', {
        theory: 'Substantivul se combină cu un atribut, cuvântul care îl lămurește. Atributul poate fi un adjectiv: prieten bun. Poate fi o prepoziție cu un nume: prieten de ieri. Poate fi un pronume: prietenul lui. Substantivul este centrul grupului. Într-un început de compunere pui cel puțin două astfel de grupuri.',
        example: '„Două fantome simpatice intră în casă.” fantome e centrul, simpatice e atributul. „Prietenul lui râde.” lui este atributul.',
        tryThis: '1. În „prieten bun”, centrul este prieten sau bun? Un cuvânt. 2. Câte grupuri minimum pui la începutul compunerii? Scrie numărul.',
        recap: 'Centrul numește, atributul lămurește. Poate fi adjectiv, grup cu prepoziție sau pronume. Greșeală: un substantiv singur, fără nicio lămurire.'
      }),
      lesson('plural-acoperis', 'Pluralul de la acoperiș, aripă, fereastră', {
        theory: 'La plural, acoperiș dă acoperișuri, nu acoperișe. Genitivul este acoperișurilor. aripile, nu aripele. ferestrele, nu o formă cu r în plus. Când ochii sunt cei știuți, scrii ochii. ochi, fără articol, este forma nehotărâtă.',
        example: '„Acoperișurile sunt înalte.” „Aripile par albe.” „Ferestrele luminate par ochii unei case.” Articolul stă doar unde obiectul e cunoscut.',
        tryThis: '1. Pluralul corect este acoperisuri sau acoperise? Un cuvânt. 2. Forma corectă este aripile sau aripele? Un cuvânt.',
        recap: 'acoperișuri, aripile, ferestrele. Greșeală: inventezi aripele sau acoperișe pentru că așa ți se pare că sună.'
      }),
      lesson('prepozitie', 'Prepoziția', {
        theory: 'Prepoziția este neflexibilă: nu are număr, timp sau persoană. Stă înaintea unui substantiv sau a unui pronume și îl leagă de alt termen. Nu stă înaintea predicatului. „Râd de tine” înseamnă că îți bați joc. „Râd cu tine” înseamnă că râdeți împreună. „Gătesc regina” o pune în oală. „Gătesc cu regina” înseamnă că gătiți amândoi.',
        example: '„Abia aștept să râd cu tine.” cu repară biletul. „Pune cartea pe bancă.” pe leagă verbul de bancă.',
        tryThis: '1. Ca să râdeți împreună, scrii de sau cu? Un cuvânt. 2. Prepoziția stă înaintea predicatului? Scrie da sau nu.',
        recap: 'Prepoziția leagă și nu se schimbă. de și cu nu spun același lucru. Greșeală: o uiți și substantivul devine obiectul verbului.'
      }),
      lesson('prepozitie-norma', 'Prepoziția în limba de azi', {
        theory: 'La comparație scrii mai mari decât. după, nu dupe. Cânți la vioară. Ești interesat de cineva. Viteza se spune pe oră. Pleci la drum. Ești responsabil de curățenie. Pentru o soluție folosești pentru. Sună la telefon. La final de oră, nu pe final. Formele vechi sau regionale cătră, pi ici și dă pă devin către, pe aici, de pe.',
        example: '„Sună-mă la telefon la final de oră.” „Cântă la vioară.” „S-a ascuns după sobă.” „Nu te lua după mine” înseamnă nu mă copia. „Ia câinele de pe mine” înseamnă dă-l jos.',
        tryThis: '1. La instrument scrii la sau cu? Un cuvânt. 2. Forma de azi este dupa sau dupe? Un cuvânt.',
        recap: 'la vioară, la drum, pe oră, responsabil de, după. Greșeală: scrii dupe sau cânți cu vioară.'
      }),
      lesson('prejudecati', 'Lectură, prejudecăți, recapitulare', {
        theory: 'Prietenia e prețuită în cărți, filme și teatru. Principiile rămân: loialitate, acceptarea celuilalt așa cum este, sinceritate și încredere. O prejudecată este o părere gata făcută, înainte de om și de text. Lectura o verifică. În povești, prietenia poate lega ființe foarte diferite.',
        example: '„Toți cei din satul X sunt la fel” e prejudecată. „În carte, cei doi se ajută” e o observație. A doua poate deveni prietenie.',
        tryThis: '1. Părerea gata făcută, înainte de text, este prejudecata sau loialitate? Un cuvânt. 2. Acceptarea înseamnă să-l judeci sau să-l primesti? Un cuvânt.',
        recap: 'Loialitate, acceptare, sinceritate, încredere. Prejudecata se verifică în text. Greșeală: judeci omul înainte să vezi fapta.'
      }),
      lesson('carti-prietenie', 'Cărți în care prietenia trece peste diferență', {
        theory: 'Manualul te trimite la cărți în care prietenia trece peste diferență. Le cauți și le citești. Poți începe cu Epopeea lui Ghilgameș, Iliada, Muzicanții din Bremen, de frații Grimm, Vrăjitorul din Oz, de Lyman Frank Baum, Cei trei muschetari, de Alexandre Dumas, Tom Sawyer și Huckleberry Finn, de Mark Twain, sau Cireșarii, de Constantin Chiriță.',
        example: 'Alegi o carte și spui un motiv: „Vreau Cireșarii pentru că e o echipă.” Nu povestești capitolul. Colegul poate alege alt titlu.',
        tryThis: '1. Muzicanții din Bremen sunt de Grimm sau de Twain? Un cuvânt. 2. Cireșarii este de Chirita sau de Dumas? Un cuvânt.',
        recap: 'Titlul și autorul ajung ca recomandare. Greșeală: copiezi povestea în loc să spui de ce ai ales cartea.'
      }),
      lesson('scrisoare-veche', 'Scrisoarea veche și sensul din context', {
        theory: 'O scrisoare veche își arată anul și în forma cuvintelor. Ieși este grafia de atunci pentru Iași. bădie este respect pentru cineva mai în vârstă. Lângă o despărțire, scârba poate fi mâhnire, nu silă. Luna se scrie decembrie. Sărbătoarea rămâne 1 Decembrie. Scrisoarea sau e-mailul către un prieten plecat are minimum 60 de cuvinte.',
        example: 'Data se scrie decembrie 1877. Destinatarul primește un cuvânt de respect. În 1877 mesajul a mers pe hârtie.',
        tryThis: '1. Minimum de cuvinte la scrisoarea către prietenul plecat este 60 sau 15? Scrie numărul. 2. bădie este un salut de respect sau o insulta? Un cuvânt.',
        recap: 'Anul explică forma veche. Contextul alege sensul. 60 de cuvinte. Greșeală: citești orice scârbă doar ca dezgust.'
      }),
      lesson('locuitori', 'Numele locuitorilor', {
        theory: 'Numele locuitorilor sunt substantive comune, cu literă mică. niște moldoveni, apoi moldovenii. La fel: munteni și muntenii, olteni, bănățeni, maramureșeni, dobrogeni, transilvăneni. Articolul nehotărât stă în față. Articolul hotărât se lipește. Nu judeci o regiune dintr-o singură părere auzită.',
        example: '„Niște olteni au venit în vizită. Oltenii ne-au povestit despre Craiova.” Prima formă e nehotărâtă. A doua e hotărâtă. Ambele cu literă mică.',
        tryThis: '1. Locuitorii Moldovei se scriu moldoveni sau Moldoveni? Un cuvânt. 2. Forma cu articol hotărât este munteni sau muntenii? Un cuvânt.',
        recap: 'Locuitorii se scriu cu literă mică. niște în față, articolul hotărât la final. Greșeală: pui majusculă, ca în engleză.'
      }),
      lesson('telefon-scrisoare', 'Mesajul de pe telefon și scrisoarea', {
        theory: 'Mesajul de pe telefon ajunge repede și poate fi scurt. Se poate pierde între notificări și pleacă uneori înainte să-l recitești. Scrisoarea e mai lentă, dar rămâne o pagină. La evaluare scrii două avantaje și două dezavantaje, nu doar „e mai bun”.',
        example: 'Avantaj: îl primește în aceeași zi. Dezavantaj: un deget îl trimite prea devreme. Scrisoarea îți lasă timp să tai o propoziție, dar ajunge mai târziu.',
        tryThis: '1. Câte avantaje se cer? Scrie numărul. 2. Câte dezavantaje se cer? Scrie numărul.',
        recap: 'Două avantaje și două dezavantaje. Greșeală: alegi un singur camp și îl lași fără pereche.'
      }),
      lesson('evaluare-prietenie', 'Evaluarea unității despre prietenie', {
        theory: 'Zilele, lunile, popoarele și disciplinele stau cu literă mică, în afară de primul cuvânt al enunțului și de numele unei sărbători. Ai 10 puncte din oficiu. Totalul este 100. Nota iese împărțind la 10. Ultimul subiect cere un joc, în 80 până la 100 de cuvinte, cu cel puțin trei prepoziții subliniate, plus regulile.',
        example: '„Marți mă întâlnesc.” e corect: Marți deschide enunțul. „Ne vedem marți la matematică.” ambele cu literă mică. „1 Decembrie” rămâne nume de sărbătoare.',
        tryThis: '1. Câte puncte sunt din oficiu? Scrie numărul. 2. Jocul are minimum 80 sau 60 de cuvinte? Scrie numărul.',
        recap: '10 din oficiu, 100 în total. Trei prepoziții subliniate la joc. Greșeală: scrii Marți și în mijlocul enunțului.'
      }),
      lesson('barem-prietenie', 'Baremul evaluării', {
        theory: 'Primele opt subiecte au câte 8 puncte. La grup iei un punct fără subliniere și încă un punct dacă subliniezi atributul. Varianta fără explicație ia 2 puncte, justificarea ia 6. Subiectul 9 are 26: 5 pentru joc, 5 pentru reguli, 6 pentru prepoziții, 10 pentru redactare. 64 plus 26 fac 90. Cu oficiul, 100.',
        example: '„Prieten bun”, fără linie sub bun, păstrează punctul de grup și pierde punctul de subliniere. Prepozițiile nesubliniate scad din cei 6 puncte.',
        tryThis: '1. Subiectul 9 valorează 26 sau 8 puncte? Scrie numărul. 2. Fără subliniere, grupul mai ia 1 punct sau 0? Scrie numărul.',
        recap: 'Opt subiecte a câte 8, apoi 26. Subliniezi atributul și prepozițiile. Greșeală: le scrii corect și uiți linia cerută de barem.'
      }),
      lesson('reflectie-prietenie', 'Fișa de reflecție', {
        theory: 'La sfârșitul unității completezi fișa de reflecție, la persoana I: ce ai aflat, ce folosești în altă disciplină, ce ai descoperit despre tine și ce vrei să afli. Fișa intră în portofoliu, lângă cele din unitățile dinainte, ca să vezi ce s-a schimbat.',
        example: '„Am aflat că ID-ul nu e numele real. Îmi folosește când scriu un mesaj. Aleg mai atent prepoziția decât în unitatea despre povestire.”',
        tryThis: '1. Reflecția se scrie la persoana I sau a II-a? Scrie cifra romană. 2. Fișa nouă se pune în portofoliu sau se arunca? Un cuvânt.',
        recap: 'Spui ce ai aflat, cu un exemplu. O păstrezi. Greșeală: scrii „a fost ok”, fără o faptă din unitate.'
      }),
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
