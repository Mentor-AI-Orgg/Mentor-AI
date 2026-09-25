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
      lesson('text-suport', 'Textul-suport și esențialul', {
        theory: 'Textul-suport este textul pe care îl citești la evaluarea inițială ca să arăți cum înțelegi acum o pagină pe care nu ai pregătit-o. Evaluarea inițială nu este un test de memorie din vara trecută, ci o oglindă a felului în care citești, iar în cuprins textul-suport este schița D-l Goe…, de Ion Luca Caragiale: o citești în manual, iar aici reții doar rolul ei. Citești o dată ca să vezi cine este și ce face, apoi a doua oară ca să desparți esențialul de amănunt, cum sunt o haină, o exclamație sau un loc, și nu sari la întrebări înainte de text. Informația esențială este partea fără de care povestea nu mai stă în picioare și răspunde la cine, ce face și ce iese, iar detaliul colorează întâmplarea, dar firul rămâne și fără el. Tema este despre ce este vorba, spusă într-un nume scurt, cum sunt o călătorie, o răsfățare sau o lecție de purtare, iar ideea principală este o propoziție care spune cine face ce. La evaluare nu copiezi tot textul și nu lași doar un adjectiv, pentru că esențialul ține povestea, iar detaliul o face vie, fără să o înlocuiască. Dacă nu găsești locul, recitești și nu inventezi, pentru că părerea ta vine după fapte, nu în locul lor.',
        example: 'După prima citire a schiței poți spune cine este și ce face, iar ideea principală poate fi că băiatul vrea să fie tratat ca un domn și din asta iese o încurcătură. Culoarea hainei, dacă nu schimbă încurcătura, rămâne detaliu, iar povestea se înțelege și fără acea culoare. Dacă te întreabă unde se întâmplă faptele, cauți locul în pagină și, dacă nu îl vezi, mai citești o dată acea parte.',
        tryThis: 'Scrie două propoziții în care spui cine este în textul-suport și ce face, apoi încă o propoziție cu ideea principală și una în care arăți un detaliu care poate lipsi fără să schimbe firul.',
        recap: 'Textul-suport este textul pe care îl citești la evaluarea inițială ca să arăți cum înțelegi o pagină nepregătită, iar esențialul spune cine face ce și ce iese. Detaliul colorează întâmplarea, iar părerea ta vine după fapte, nu în locul lor.'
      }),
      
      lesson('intentie', 'Intenția și răspunsul scurt', {
        theory: 'Intenția este ceea ce vrea vorbitorul atunci când spune o replică, nu doar șirul de cuvinte. Într-un dialog poți auzi că vrea să se laude, să ceară, să se scuze sau să comande, iar emoția se vede în ton, în repetiție și în felul în care celălalt răspunde. La textul citit marchezi o replică și spui intenția în patru sau cinci cuvinte, fără un termen de liceu, de pildă că vrea să pară important, iar un răspuns politicos nu repetă tonul ridicat. Răspunsul scurt și corect este o frază care răspunde la întrebare, cu o dovadă din text și cu ideea închisă, pentru că după citire scrii puțin și la obiect, iar o frază clară este mai bună decât un paragraf care ocolește. Te uiți dacă ai folosit o dovadă din text, dacă se înțelege scrisul și dacă ai închis ideea. Dacă ți se cere o părere, o legi de o faptă din text prin pentru că, altfel părerea rămâne în aer. Evaluarea inițială măsoară tocmai acest răspuns scurt, luat din text și însoțit de un motiv.',
        example: 'Cineva spune că știe mai bine, pe un ton ridicat, iar intenția nu este să informeze, ci să se pună deasupra, așa că celălalt poate răspunde liniștit, fără să copieze tonul. La întrebarea despre purtarea personajului poți scrie că nu ține cont de ceilalți, pentru că insistă să i se facă pe plac și se alege cu încurcătura. Fraza răspunde, aduce o faptă din text și se închide, iar se vede și părerea, și motivul.',
        tryThis: 'Scrie două replici de dialog și, după fiecare, o propoziție în care spui ce vrea vorbitorul, apoi un răspuns de două propoziții despre purtarea unui personaj, în care legi părerea de o faptă din text prin pentru că.',
        recap: 'Intenția este ceea ce vrea vorbitorul când spune o replică, iar emoția se vede în ton, în repetiție și în răspuns. Răspunsul scurt aduce o dovadă din text, iar părerea se leagă de o faptă prin pentru că.'
      }),
      
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
        theory: 'Harta unității este prima pagină care anunță drumul, nu lecția gata făcută. Vei lucra propoziția, enunțul, dicționarul, ideea și planul. Competențele 1.1, 2.2, 3.1, 4.5 și 5.1, adică cinci, cer să înțelegi, să scrii scurt și să folosești limba cu grijă. Dacă pe hartă scrie atributul, iar lecția de azi este enunțul, nu bifezi atributul, ci îl cauți când îi vine rândul. Harta îți arată drumul, dar nu îl parcurgi dintr-o privire, pentru că harta anunță, iar lecția predă.',
        example: 'Pe hartă vezi titlul atributului, dar ora de azi este despre enunț. Notezi atributul ca pe un popas viitor și lucrezi doar enunțul. Cele cinci competențe rămân ținta întregii unități, nu o lecție terminată dintr-o privire.',
        tryThis: 'Scrie o propoziție în care spui ce anunță harta unității și o a doua propoziție în care spui ce vei lucra la lecția de azi.',
        recap: 'Harta unității este prima pagină care anunță drumul, nu lecția gata făcută. Cele cinci competențe, 1.1, 2.2, 3.1, 4.5 și 5.1, cer să înțelegi, să scrii scurt și să folosești limba cu grijă, iar fiecare titlu se lucrează când îi vine rândul.'
      }),
      lesson('norma', 'Limba standard și abaterea', {
        theory: 'Limba standard este forma pe care o înțelege toată țara și pe care o scrii la temă. O abatere este o vorbă de-acasă sau o vorbă veche, pe care o recunoști fără să râzi de ea. La școală scrii „eu merg”, iar dacă auzi „io merg”, înțelegi cine vorbește, dar la temă rămâne „eu”. În poveste, vorba veche poate sta în gura personajului, ca să se audă locul lui, însă nu stă în titlu. Personajul poate păstra „io”, iar tema ta rămâne cu forma standard.',
        example: 'În caiet scrii „eu merg la școală”, pentru că tema cere limba standard. Într-o poveste, personajul poate spune „io merg”, ca să se audă felul lui de a vorbi. Titlul povestirii rămâne tot în forma pe care o înțelege toată țara.',
        tryThis: 'Scrie două propoziții, una de temă în limba standard și una pusă în gura unui personaj, cu o vorbă veche.',
        recap: 'Limba standard este forma pe care o înțelege toată țara și pe care o scrii la temă. Abaterea este o vorbă de-acasă sau veche, pe care o recunoști fără să râzi de ea și pe care o poți lăsa doar în gura personajului.'
      }),
      lesson('puterea', 'Vorba poate ajuta sau răni', {
        theory: 'Puterea vorbei este faptul că un cuvânt poate liniști pe cineva sau, spus tare și răutăcios, poate răni. Înainte de un mesaj te oprești o secundă și întrebi dacă vorba ajută sau taie. Dacă un coleg nu este gata, vorba că este lent taie, iar vorba că mai are două minute și că îl aștepți îi dă timp și îl ajută. Gluma nu șterge rana dacă celălalt a rămas lovit, deci alegi forma care ajută, nu pe cea care taie.',
        example: 'Colegul nu este gata, iar Ana îi spune că mai are două minute și că îl așteaptă. Vorba îi dă timp și îl ajută. Fapta rămâne aceeași, dar mesajul nu îl taie.',
        tryThis: 'Scrie două propoziții prin care ajuți un coleg care nu este gata, astfel încât vorba să îl liniștească.',
        recap: 'Puterea vorbei este faptul că același lucru poate liniști sau poate răni, după cum îl spui. Înainte de un mesaj te oprești și alegi forma care ajută, pentru că gluma nu șterge rana.'
      }),
      lesson('afectiv', 'A înțelege, a exprima, răspunsul afectiv', {
        theory: 'Răspunsul afectiv este ce ai simțit după lectură, legat de o bucată din text. Cu vorbele informăm, spunem o emoție, cerem scuze, încurajăm sau explicăm. Nu ajunge să scrii că ți-a plăcut: arăți bucata care te-a mirat și spui de ce. Mirarea se leagă de o faptă, nu rămâne o vorbă goală. Un text literar poate purta un mesaj serios într-o formă plăcută.',
        example: 'Radu scrie că l-a mirat faptul că eroul întoarce socoteala, pentru că el ar fi tăcut. Mirarea este legată de fapta din text. Se vede și emoția, și bucata care a trezit-o.',
        tryThis: 'Scrie două propoziții în care spui ce te-a mirat într-un text citit și de ce, legând emoția de o faptă.',
        recap: 'Răspunsul afectiv este ce ai simțit după lectură, legat de o faptă din text. Cu vorbele informăm, spunem o emoție, cerem scuze, încurajăm sau explicăm, iar un text literar poate purta un mesaj serios într-o formă plăcută.'
      }),
      lesson('canale', 'Unde ajunge vorba', {
        theory: 'Canalul este locul pe unde ajunge vorba: mesaj, forum, chat, o rețea sau un blog. Locul schimbă grija și lungimea, nu bunătatea vorbei. Pe chat scrii scurt, iar pe blog poți explica și de ce. Peste tot rămâne regula că nu rănești și nu copiezi un text gata făcut doar ca să pari deștept. Mesajul tău este scris de tine, iar un compliment copiat de pe un site rămâne străin.',
        example: 'Ioana vrea să încurajeze un coleg și pe chat scrie că mai are timp și că ea crede în el. Pe blog ar pune și de ce, tot cu vorbele ei, fără să lipească un compliment luat de pe un site.',
        tryThis: 'Scrie un mesaj scurt de chat și apoi două propoziții de blog, ambele cu vorbele tale, prin care încurajezi un coleg.',
        recap: 'Canalul este locul pe unde ajunge vorba, cum sunt mesajul, forumul, chatul, rețeaua sau blogul. Locul schimbă lungimea, nu bunătatea vorbei, iar mesajul rămâne scris de tine.'
      }),
      lesson('lectura-continua', 'Citești până la capăt', {
        theory: 'Lectura continuă este citirea cerinței și apoi a firului până la capăt, înainte să te oprești la fiecare cuvânt greu. La prima lectură urmărești cine vorbește, ce vrea și ce se strică. Cuvântul necunoscut îl cauți după ce ai înțeles întâmplarea, nu înainte, deci dicționarul vine după fir. Te pui lângă personaje ca să vezi ce se întâmplă. Dacă închizi cartea la primul cuvânt necunoscut, nu mai afli întâmplarea.',
        example: 'Mihai nu cunoaște un cuvânt de la început, dar nu închide cartea. Citește scena până la punct și înțelege firul: un om flămând și un preț nedrept. Abia apoi caută doar cuvântul care încă îi blochează sensul.',
        tryThis: 'Scrie două propoziții cu firul unei scene citite și încă o propoziție despre expresia grea pe care o cauți în dicționar abia după ce ai înțeles întâmplarea.',
        recap: 'Lectura continuă este citirea firului până la capăt, înainte de dicționar. Întâi vezi cine vorbește, ce vrea și ce se strică, apoi cauți doar cuvântul care încă blochează sensul.'
      }),
      lesson('jurnal-dublu', 'Jurnalul dublu', {
        theory: 'Jurnalul dublu este o pagină tăiată în două cu o linie dreaptă. În stânga pui cel puțin trei bucăți din text: un citat, o secvență sau un cuvânt care te-a oprit. În dreapta spui de ce le-ai ales, iar motivul poate fi ideea, emoția, o amintire, o legătură cu altă materie sau o curiozitate, și poți reciti ca să alegi mai bine. Trei rânduri de felul acesta fac jurnalul, iar coloana din dreapta nu rămâne goală.',
        example: 'În stânga notezi o secvență în care prețul devine uriaș. În dreapta scrii că te-a revoltat, pentru că masa era mică, iar socoteala era uriașă, și că la matematică ai fi cerut calculul. Mai pui încă două bucăți, fiecare cu motivul ei.',
        tryThis: 'Trasează o linie pe pagină și scrie în stânga trei bucăți dintr-un text, iar în dreapta, lângă fiecare, de ce ai ales-o.',
        recap: 'Jurnalul dublu este pagina tăiată în două, cu bucăți din text în stânga și motivul în dreapta. În stânga stau cel puțin trei citate, secvențe sau cuvinte, iar în dreapta spui de ce le-ai ales.'
      }),
      lesson('nedreptate', 'Iei atitudine și pentru altul', {
        theory: 'A lua atitudine pentru altul înseamnă să aperi pe cineva chiar dacă ție nu ți s-a făcut răul, deci intervii și când nu ești tu cel acuzat. Asta nu înseamnă să țipi, ci să spui ce este nedrept și să cauți o cale dreaptă. Spui ce ai văzut, pentru că tăcerea lasă nedreptatea în picioare. Eroul îndrăgit din povești rămâne în minte și pentru gestul acesta, nu doar pentru glumă.',
        example: 'Un coleg este acuzat pe nedrept că a rupt rigla, dar tu ai văzut că era deja crăpată. Spui ce ai văzut, deși nu ești tu acuzat. Gestul acesta este apărare, iar tăcerea ar fi lăsat nedreptatea în picioare.',
        tryThis: 'Scrie două propoziții în care aperi un coleg acuzat pe nedrept, spunând ce ai văzut și ce cale dreaptă propui.',
        recap: 'A lua atitudine pentru altul înseamnă să aperi pe cineva chiar dacă ție nu ți s-a făcut răul. Spui ce ai văzut și cauți o cale dreaptă, fără să țipi, pentru că tăcerea lasă nedreptatea în picioare.'
      }),
      lesson('personaj', 'Personaj sau persoană', {
        theory: 'Personajul este cel care face fapte imaginare într-o povestire inventată și pe care nu l-ai întâlni la magazin, pentru că nu a trăit în lumea reală. Persoana este omul care a trăit sau trăiește și are an, oraș și o meserie, iar pe el îl poți găsi într-o carte de istorie, nu doar într-o snoavă. Omul din știre, din familia ta sau un cântăreț care trăiește azi este persoană, iar un poet care a trăit în secolul al XIX-lea este tot persoană. Într-o snoavă, istețul care întoarce o socoteală nedreaptă este personaj, iar bunicul care îți spune snoava este persoană, pentru că unul este inventat, iar celălalt trăiește, așa că nu le pui același nume de rol. Personajul de folclor este inventat de povești, iar eroul unei snoave, care nu s-a născut nicăieri, rămâne personaj. Când asociezi o imagine, răspunsul schimbă eticheta, pentru că poza unui monument sau un desen din carte nu îl face pe eroul inventat om real.',
        example: 'Istețul din snoavă întoarce o socoteală nedreaptă și rămâne personaj, fiindcă faptele lui sunt inventate, iar bunicul care îți spune snoava stă lângă tine și este persoană. Un poet din secolul al XIX-lea are an de naștere și poate fi găsit într-o carte de istorie, deci este persoană. Eroul unei snoave nu s-a născut nicăieri, iar un desen sau un monument nu schimbă eticheta.',
        tryThis: 'Scrie două propoziții, una despre un personaj dintr-o povestire inventată și una despre o persoană din viața ta, apoi încă una despre un om care a trăit, cu un indiciu din viața lui, și una despre un erou care există doar într-o snoavă.',
        recap: 'Personajul face fapte imaginare într-o povestire inventată și nu l-ai întâlni la magazin, iar persoana este omul care trăiește sau a trăit, cu an, oraș și meserie. Un poet din secolul al XIX-lea, un cântăreț de azi sau bunicul tău sunt persoane, iar un monument nu face din eroul unei snoave un om real.'
      }),
      lesson('replica', 'Cine a spus replica', {
        theory: 'Replica este vorba unui vorbitor anume, iar fiecare replică are pe cineva care chiar o spune. Nu o lipești de personajul care apare cel mai des și nu câștigă cine are cele mai multe rânduri. Te uiți la ce se întâmplă chiar înainte și la ce cere replica, cum sunt o întrebare de judecător, o mirare sau o scuză, și abia apoi spui numele. Contextul vine înaintea numelui, nu numărul de rânduri.',
        example: 'În dialog, cineva întreabă cât costă, iar altcineva răspunde cu un preț uriaș. Prima replică este a musafirului, iar a doua este a celui care vinde. Nu le schimbi doar pentru că vânzătorul are mai multe rânduri.',
        tryThis: 'Scrie un dialog de două replici și, după fiecare, o propoziție în care spui cine o spune și din ce context ai aflat.',
        recap: 'Replica este vorba celui care chiar o spune, nu a personajului cu cele mai multe rânduri. Te uiți la contextul de dinainte și la ce cere replica, apoi spui numele.'
      }),
      lesson('alte-culturi', 'Istețul din alte povești', {
        theory: 'Istețul din alte povești este omul care îi prinde pe cei lacomi cu vorba și care nu este doar al nostru. În Balcani circulă și povești cu Nastratin Hogea, iar tu nu înveți o biografie pe de rost. Reții că gluma înțeleaptă are frați și în alte culturi și trece granița. Compari rolul, nu amesteci numele: nu spui că două personaje sunt același om, ci că seamănă, pentru că istețul pedepsește lăcomia printr-o socoteală pe dos. Doi eroi asemănători au roluri asemănătoare.',
        example: 'Și aici, și în alte părți, istețul pedepsește lăcomia printr-o socoteală pe dos. Nastratin Hogea seamănă la rol cu istețul din snoava noastră. Nu sunt același om, iar numele lor rămân deosebite.',
        tryThis: 'Scrie două propoziții în care compari rolul istețului dintr-o snoavă de la noi cu rolul lui Nastratin Hogea, fără să le amesteci numele.',
        recap: 'Istețul care îi prinde pe cei lacomi cu vorba nu este doar al nostru, iar în Balcani circulă și povești cu Nastratin Hogea. Compari rolul, nu amesteci numele, pentru că gluma înțeleaptă trece granița.'
      }),
      
      lesson('dictionar', 'Ce cauți în fiecare dicționar', {
        theory: 'Dicționarul explicativ este cartea care spune ce înseamnă un cuvânt. Bucata unui singur cuvânt se numește articol și are titlul, felul cuvântului și sensurile, iar caseta de vocabular din clasele mici este forma scurtă a acestui articol. Alegi sensul care încape în fraza ta, nu primul sens din reflex, așa cum la carte găsești și volum, și bucată la un joc, iar în „Deschid cartea la pagina 4” contextul alege volumul. DOOM este dicționarul ortografic, ortoepic și morfologic, locul unde verifici cum se scrie și cum se pronunță corect un cuvânt, iar dicționarul de sensuri, DEX, spune ce înseamnă cuvântul, și cele două nu se schimbă între ele. La o literă nesigură sau când nu ești sigur că un cuvânt se scrie cu cratimă cauți norma de scriere în DOOM, nu povestea cuvântului și nu întrebi ce simți, iar sensul, dacă îl știi deja, rămâne nemișcat, pentru că s-a schimbat doar haina literelor. Dicționarul cultural, numit și enciclopedic, explică pe scurt un lucru de cultură, cum sunt o persoană, un obicei sau o carte, și nu îl folosești ca să vezi dacă un verb se scrie cu cratimă, pentru că acolo stau lucruri și oameni, nu litere. Un nume de persoană din cultură, de pildă un culegător de povești, se caută la dicționarul cultural, iar verbul a semăna se caută la dicționarul de cuvinte, pentru că sunt două uși și două întrebări.',
        example: 'În fraza „Deschid cartea la pagina 4” alegi sensul de volum, iar sensul de bucată la un joc nu încape aici. Dacă nu ești sigur de o cratimă, cauți forma în DOOM, iar sensul rămâne cel din DEX. Un culegător de povești se caută în dicționarul cultural, iar verbul a semăna se caută în dicționarul de cuvinte.',
        tryThis: 'Scrie trei propoziții în care spui ce cauți în DEX, ce cauți în DOOM și ce cauți în dicționarul cultural, luând verbul a semăna și o persoană din cultură.',
        recap: 'Dicționarul explicativ, DEX, spune sensul într-un articol, DOOM verifică scrierea și pronunția, iar dicționarul cultural, numit enciclopedic, explică persoane, obiceiuri și cărți. Alegi sensul după frază, iar o cratimă se caută în DOOM, nu după ce simți.'
      }),
      
      
      lesson('carte-film', 'Cartea și filmul', {
        theory: 'Comparația dintre carte și film este felul în care spui cum arată același erou la lectură și pe ecran. Același erou poate fi altfel în film decât ți l-ai imaginat. Compari un gest sau o fire și spui o deosebire clară, nu doar că ți-a plăcut. Și desenul pornește din ce face personajul în text, nu din întâmplare, pentru că portretul iese din fapte.',
        example: 'După lectură, Ioana și-l închipuie înalt și zâmbitor, iar în film el este scund și serios. Ea scrie că în capul ei zâmbea, iar în film abia vorbește, deși lăcomia celuilalt rămâne la fel. Asta este o comparație între lectură și film.',
        tryThis: 'Scrie două propoziții în care compari un gest al unui personaj așa cum ți l-ai închipuit la lectură și așa cum apare într-un film.',
        recap: 'Comparația dintre carte și film spune cum arată același erou la lectură și pe ecran. Compari un gest sau o fire, iar portretul pornește din faptele din text.'
      }),
      lesson('enunt', 'Enunțul, tipurile și semnul final', {
        theory: 'Enunțul este o comunicare întreagă, spusă între două pauze și închisă cu un semn care îi arată scopul. Asertivul informează și ia punct, iar interogativul întreabă și ia semn de întrebare. Exclamativul arată o emoție, iar imperativul dă o poruncă, și ambele iau semnul exclamării, dar cu scop diferit. Fără semn, enunțul este incomplet, pentru că semnul marchează intonația și poate schimba scopul acelorași cuvinte.',
        example: '„Caietul este pe bancă.” informează și se închide cu punct, deci este enunț asertiv. „Adu caietul.” este imperativ, iar „Ce caiet frumos!” este exclamativ, ambele cu semnul exclamării, dar cu scop diferit. „Adu caietul?” schimbă aceeași vorbă în întrebare.',
        tryThis: 'Scrie patru enunțuri, câte unul asertiv, interogativ, exclamativ și imperativ, fiecare cu semnul potrivit la final.',
        recap: 'Enunțul este o comunicare întreagă, între două pauze, închisă cu un semn. Asertivul ia punct, interogativul ia semnul întrebării, iar exclamativul și imperativul iau semnul exclamării, cu scop diferit.'
      }),
      lesson('roluri', 'Rolurile din dialogul politicos', {
        theory: 'Vorbitorul este cel care dă o informație sau pune o întrebare, iar ascultătorul este cel care tace ca să primească răspunsul. În dialog schimbați rolurile: după întrebare, celălalt răspunde, apoi poate deveni el vorbitor, fiecare așteaptă rândul, iar un interogativ fără pauză de răspuns nu este dialog, ci un discurs. Dialogul politicos este o vorbire pe rând, în care nu întrerupi ideea neterminată și nu vorbiți deodată, iar întrebarea așteaptă răspuns, nu o întrerupere. Arăți că asculți dacă te uiți la coleg sau spui „A, da?”, nu dacă te uiți în telefon. La final, fiecare spune ce rol are și promite ce face. O farsă blândă se pregătește doar pentru cine chiar merită o lecție, nu pentru oricine, tot cu aceste reguli: Ana poate da o veste, Radu poate propune farsa, iar Ioana așteaptă să se închidă ideea.',
        example: 'Ana îi spune colegului o veste, deci ea este vorbitor, iar el ascultă, apoi el întreabă și devine vorbitor. Radu propune o farsă blândă, doar pentru cine chiar merită o lecție, iar Ioana nu îl taie, se uită la el și pune o întrebare după ce el a închis ideea. La final, fiecare spune ce rol are și promite să îl țină.',
        tryThis: 'Scrie un dialog de patru replici în care rolul de vorbitor trece de la un coleg la altul, unul arată că ascultă fără să se uite în telefon, iar la final fiecare promite ce face.',
        recap: 'Vorbitorul dă o informație sau pune o întrebare, iar ascultătorul tace ca să primească răspunsul, și rolurile se schimbă. În dialogul politicos nu întrerupi și nu vorbiți deodată, arăți că asculți, iar la final fiecare promite ce face.'
      }),
      
      lesson('compliment', 'Cum primești și cum trimiți o laudă', {
        theory: 'Complimentul este o laudă pe care o poți primi cu bucurie sau cu jenă și la care poți spune ce simți. Când îl trimiți, alegi canalul: mesaj scris de tine, e-mail sau scrisoare. Un compliment cu o faptă reală este tare, iar textul copiat de pe un site rămâne străin și gol, pentru că nu spune nicio faptă. Spui cum reacționezi la laudă, alegi canalul și motivezi.',
        example: 'Ana îi scrie mamei o scrisoare în care spune că a ajutat-o la proiect fără să îl facă ea. Textul este al Anei și se sprijină pe o faptă. De aceea scrisoarea este mai puternică decât o frază copiată, care nu spune nicio faptă.',
        tryThis: 'Scrie o scrisoare de trei propoziții în care lauzi pe cineva pentru o faptă reală și spui și cum te-ai simțit când ai primit o laudă.',
        recap: 'Complimentul este o laudă pe care o poți primi cu bucurie sau cu jenă și pe care o trimiți pe un canal ales de tine. Un compliment cu o faptă reală este tare, iar textul copiat de pe un site rămâne străin.'
      }),
      lesson('propozitie', 'Propoziția și predicatul', {
        theory: 'Propoziția este enunțul care are un singur predicat. Predicatul este verbul care arată persoana și timpul și se schimbă după persoană, ca în înțeleg și am înțeles, iar predicatul verbal spune destul despre ce face subiectul, cum face cântă în Păsările cântă și râd în Copiii râd. Dacă verbul singur nu ajunge, nu l-ai terminat de notat: în Păsările erau galbene, erau singur nu spune cum erau, deci mai notezi și galbene, și două verbe care sunt predicate nu se numără ca o singură propoziție. Nu orice formă verbală este predicat, iar forma în -ind stă lângă acțiune și nu preia rolul, pentru că nu arată singură persoana și timpul. În Auzind vestea, mama a sunat, predicatul este a sunat, iar auzind doar însoțește. În Văzând ploaia, ei au intrat, predicatul este au intrat, nu văzând.',
        example: 'În Copiii râd, predicatul este râd, pentru că verbul arată persoana și timpul și spune destul despre ce fac copiii. În Păsările erau galbene notezi și erau, și galbene, fiindcă verbul singur nu spune cum erau. În Auzind vestea, mama a sunat, predicatul este a sunat, iar auzind stă lângă acțiune.',
        tryThis: 'Scrie două propoziții cu predicat verbal, una în care verbul singur nu ajunge și mai notezi restul, și două care încep cu o formă în -ind, apoi arată în fiecare doar verbul care este predicat.',
        recap: 'Propoziția este enunțul cu un singur predicat, iar predicatul este verbul care arată persoana și timpul. Dacă verbul singur nu ajunge, mai notezi și restul, iar forma în -ind stă lângă acțiune și nu ține loc de predicat.'
      }),
      
      lesson('scuze', 'Scuze, refuz, acceptare', {
        theory: 'Scuza este un enunț potrivit persoanei căreia îi ceri iertare. Către coleg poți fi mai simplu, iar către profesor sau părinte vorbești mai îngrijit. Poți refuza politicos dacă spui nu, spui de ce și spui cum te-ai simțit, astfel încât refuzul rămâne clar și tot politicos. Nu folosești aceeași propoziție pentru coleg, profesor și părinte și nu arunci un nu fără motiv.',
        example: 'Către un coleg poți spune că îți pare rău că i-ai luat rigla. Către profesor spui că îl rogi să te ierte, pentru că ai întârziat. Un refuz politicos sună așa: nu poți azi, ai lucrare și mulțumești că ai fost chemat.',
        tryThis: 'Scrie o scuză către un coleg, o scuză către profesor și un refuz politicos către un prieten, fiecare în propoziții complete.',
        recap: 'Scuza este un enunț potrivit persoanei căreia îi ceri iertare, mai simplu către coleg și mai îngrijit către profesor sau părinte. Refuzul politicos spune nu, spune de ce și spune cum te-ai simțit.'
      }),
      lesson('afirmativ-negativ', 'Propoziția afirmativă și cea negativă', {
        theory: 'Propoziția negativă este propoziția care are „nu” lângă predicat, ca în „Nu vin.” Propoziția afirmativă nu are acest „nu”, ca în „Vin.” O veste rea poate fi tot afirmativă, pentru că „A fost incorect”, „A fost nedrept” și „Răspunsul a fost greșit.” nu neagă verbul. Și „da”, și „nu” pot fi corecte, dacă forma este bună, fiindcă s-a schimbat decizia, nu regula. Ideea urâtă nu face propoziția automat negativă.',
        example: '„Nu vin azi la tine” este refuz și propoziție negativă, pentru că „nu” stă lângă predicat. „Da, vin azi la tine” este acceptare și propoziție afirmativă, iar ambele sunt corecte ca formă. „A fost nedrept” rămâne afirmativă, chiar dacă vestea este rea.',
        tryThis: 'Scrie două propoziții afirmative și două propoziții negative despre aceeași faptă, punând nu doar lângă predicatul celor negative.',
        recap: 'Propoziția negativă are „nu” lângă predicat, iar propoziția afirmativă nu are acest „nu”. O veste rea poate rămâne afirmativă, iar și da, și nu pot fi corecte ca formă.'
      }),
      lesson('acte-vorbire', 'Acte de vorbire', {
        theory: 'Actul de vorbire este fapta pe care o faci chiar prin verb, cum sunt a declara, a porunci, a ruga, a mărturisi și a renunța, iar predicatul este verbul actului. Îl spune persoana care are rolul potrivit: președintele declară, profesorul cere liniște, iar conducătorul spune o declarație oficială, nu oricine. Dacă schimbi persoana, actul nu mai are rost.',
        example: '„Declar deschisă ședința” îl spune cel care conduce, iar predicatul este „declar”. În „Vă rog să tăceți”, predicatul actului este „rog”, nu „tăceți”. Un coleg fără acest rol nu poate declara ședința deschisă.',
        tryThis: 'Scrie trei enunțuri în care verbul actului este predicatul, unul de declarație, unul de rugăminte și unul de poruncă, fiecare spus de persoana care are rolul.',
        recap: 'Actul de vorbire este fapta pe care o faci prin verb, iar predicatul este verbul actului. Îl spune persoana care are rolul potrivit, nu oricine.'
      }),
      lesson('imagine-text', 'Legi imaginea de text', {
        theory: 'Legătura dintre imagine și text este felul în care pui desenul lângă frază și spui ce au în comun, pentru că o imagine nu este decor. Numești secvența care te-a făcut curios, iar legătura poate fi aceeași emoție sau o contrazicere. Dacă descrii doar desenul, ai sărit textul, fiindcă imaginea și textul se citesc împreună.',
        example: 'Desenul arată un băiat cu sprâncenele ridicate, iar textul spune că a auzit un preț uriaș. Legătura este că fața mirată potrivește vestea din text și nu este un zâmbet de bucurie. Așa unești imaginea cu fraza.',
        tryThis: 'Alege un desen de lângă un text și scrie două propoziții în care spui ce secvență din text se leagă de el și ce emoție au în comun.',
        recap: 'Legătura dintre imagine și text este felul în care spui ce au în comun desenul și fraza. Imaginea nu este decor, iar dacă descrii doar desenul, ai sărit textul.'
      }),
      lesson('subiect', 'Subiectul, propoziția și acordul', {
        theory: 'Subiectul este partea care arată cine face acțiunea sau despre cine se spune ceva, împreună cu predicatul. Când întrebi cine face, un termen înseamnă simplu, ca în Radu desenează și în Pisica doarme, iar doi sau mai mulți înseamnă multiplu și cer predicatul la plural, ca în Radu și Ana desenează, în Pisica și câinele dorm, în Ana și Ioana cântă și în O pisică și un câine dorm. Propoziția simplă este propoziția care are doar subiect și predicat, ca în Omul a plecat și în Elevii notează, iar propoziția dezvoltată mai are cuvinte legate de subiect sau de predicat, ca în Omul obosit a plecat de acasă și în Elevii de la biologie notează celula în caiet, unde predicatul rămâne notează, iar disciplina este biologia. Scoți amănuntele și rămâne simplă, iar dacă le pui la loc, devine dezvoltată, și un loc sau o caracteristică o face dezvoltată, chiar dacă propoziția este scurtă, iar poți lua exemple și de la științe. Acordul este potrivirea predicatului cu subiectul la număr și la persoană: eu citesc, tu citești, el citește, iar ei citesc, și pentru eu, prezentul verbului a citi este citesc. La plural se schimbă și adjectivul din grup, astfel că băiat înalt devine băieți înalți. Dacă după apoi numești două lucruri, predicatul lor stă la plural, ca în a înflorit un trandafir, apoi au înflorit o lalea și un iris, pentru că laleaua și irisul sunt două.',
        example: 'Ana și Ioana cântă, iar subiectul are doi termeni, deci verbul stă la plural. Elevii de la biologie notează celula în caiet, iar propoziția este dezvoltată, pentru că are și disciplina, și un obiect, iar predicatul rămâne notează. A înflorit un trandafir, apoi au înflorit o lalea și un iris, fiindcă cele două flori cer predicatul la plural.',
        tryThis: 'Scrie o propoziție cu subiect simplu, una cu subiect multiplu, una simplă despre o pasăre și una dezvoltată cu un loc și o caracteristică, apoi trei propoziții cu verbul a citi la eu, la el și la ei și încă una în care după apoi urmează două flori și predicatul este la plural.',
        recap: 'Subiectul arată cine face acțiunea, un termen îl face simplu, iar mai mulți termeni îl fac multiplu și cer predicatul la plural. Propoziția simplă are doar subiect și predicat, cea dezvoltată mai are un loc sau o caracteristică, iar acordul potrivește predicatul la număr și la persoană.'
      }),
      
      
      lesson('atribut', 'Atributul și detaliul', {
        theory: 'Atributul este cuvântul care stă lângă un substantiv, face grup cu el și îl precizează sau îi dă o caracteristică. Răspunde la care, ce fel și al cui, ca în om glumeț, caietul nou și geaca Anei, și nu spune unde se petrece fapta, așa că pe masă ține de predicat, nu de carte, iar în curte este loc, nu atribut. În Prietenul cel nou a adus atlasul vechi sunt două atribute, pentru două substantive, iar în mingea roșie atributul este roșie, pentru că spune ce fel de minge. Detaliul unui text este bogăția descrierii, iar o măsori numărând atributele de lângă substantive, nu rândurile, și mai multe atribute înseamnă o descriere mai bogată. Le cauți și într-un text de științe, apoi spui disciplina: în Celula vegetală are perete atributul este vegetală, iar disciplina este biologia. Caietul nou albastru are două atribute, nou și albastru, iar un text mai lung nu are automat mai mult detaliu dacă nu descrie nimic. Cățelul năzdrăvan visa pisici negre are mai multe atribute decât Pisica a intrat.',
        example: 'În Prietenul cel nou a adus atlasul vechi, cel nou ține de prieten, iar vechi ține de atlas. În textul despre celulă, vegetală este atribut, iar materia este biologia. În curte arată locul faptei, deci nu intră între atribute, iar detaliul se compară după atribute, nu după rânduri.',
        tryThis: 'Scrie două propoziții, una cu un singur atribut și una cu două atribute lângă substantive, apoi o a treia în care arăți un loc care nu este atribut, și numește disciplina unui text scurt despre celulă.',
        recap: 'Atributul stă lângă un substantiv și răspunde la care, ce fel și al cui, iar locul faptei ține de predicat. Detaliul unui text se măsoară numărând atributele, și le cauți și la științe, unde spui disciplina.'
      }),
      
      lesson('plan-idei', 'Ideea principală și planul', {
        theory: 'Ideea principală este informația esențială dintr-o secvență. Ea răspunde la cine și ce face, unui paragraf îi revine o singură idee principală, iar ideea secundară o detaliază printr-un exemplu, un nume sau un loc. Cauți cuvintele necunoscute, delimitezi secvențele și vezi dacă există un enunț gata făcut, iar la un text de științe te uiți și la titlu, ca să nu sari tema și să inventezi alta. Întrebi apoi ce, de ce, cum, unde și când, iar acestea dau detaliul, nu esențialul, deci întrebarea unde cere un detaliu: în enunțul despre albinele care aduc polen în grădină ca să hrănească stupul, esențialul este că albinele aduc polen, grădina răspunde la unde, hrănirea stupului răspunde la de ce, iar domeniul este natura. Planul simplu înșiră ideile principale, iar planul dezvoltat pune sub fiecare și secundarele ei, cu ideea principală deasupra, în ordinea din text, și nu copiezi paragraful întreg și nu îl numești idee, pentru că ideea este scurtă și spune esențialul. La albine, ideea principală este că lucrează împreună, iar dedesubt stau că regina depune ouă și că lucrătoarele aduc polen. Planul dezvoltat se scrie în două feluri, cu I și II, întâi ideea principală, apoi secundarele, sau cu 1, iar dedesubt a și b, iar când îl povestești legi ideile cu mai întâi, apoi, după ce și în final, și conectorul ultimei idei este în final. Nu începi cu finalul doar pentru că ți se pare mai interesant, așa cum mai întâi albinele ies din stup, apoi aduc polen, iar după ce hrănesc larvele, în final închid ziua, iar detaliile de sub ideea 1 se notează cu a și b.',
        example: 'Albinele lucrează împreună, iar asta este ideea principală, iar planul dezvoltat pune dedesubt că regina depune ouă și că lucrătoarele aduc polen. Grădina răspunde la unde, iar hrănirea stupului răspunde la de ce, și domeniul este natura. Mai întâi albinele ies din stup, apoi aduc polen, iar în final închid ziua.',
        tryThis: 'Scrie un plan simplu cu două idei principale despre albine, dezvoltă-l o dată cu I și II și o dată cu 1, a și b, cu câte două idei secundare, apoi leagă ideile cu mai întâi, apoi, după ce și în final.',
        recap: 'Ideea principală a unui paragraf răspunde la cine și ce face, iar secundarele dau exemplul, numele sau locul. Planul simplu are doar principalele, în ordinea din text, iar planul dezvoltat se scrie cu I și II sau cu 1, a și b și se povestește cu mai întâi, apoi, după ce și în final.'
      }),
      
      
      lesson('capcana-nimeni', 'Negația și întrebarea pe dos', {
        theory: 'Propoziția negativă este doar cea în care nu stă lângă predicat. Nimeni poate fi un nume, și atunci este subiect, nu o negație, iar numele nu neagă verbul: „Nimeni a intrat” înseamnă că persoana chemată așa a intrat și propoziția este afirmativă, pe când „Nu a intrat nimeni” este negativă. Întrebarea care spune pe dos este întrebarea care nu cere un răspuns, ci spune contrariul, ca să convingă pe altul, iar „Cum să nu-mi placă?” poate însemna că persoana se preface. Ca să prinzi sensul, te uiți la ce face personajul înainte, nu doar la semnul întrebării. Dacă oftatul arată plictiseală, întrebarea este prefăcută, iar sensul adevărat este că nu îi place, și nu orice propoziție cu îmi place este o bucurie sinceră. Andrei oftează când vede tema, apoi spune „Cum să nu-mi placă tema asta?”, iar oftatul arată că nu îi place.',
        example: 'Eroul spune că îl cheamă Nimeni, iar când altul spune Nimeni a sunat, verbul nu este negat și propoziția rămâne afirmativă. Nu a sunat nimeni este negativă, pentru că nu stă lângă predicat. Andrei oftează când vede tema și spune „Cum să nu-mi placă tema asta?”, iar oftatul arată că sensul adevărat este că nu îi place.',
        tryThis: 'Scrie două propoziții, una în care Nimeni este numele cuiva și propoziția este afirmativă și una în care nu stă lângă predicat, apoi o scenă în care un personaj oftează și pune o întrebare pe dos, iar la urmă spui sensul adevărat.',
        recap: 'Propoziția este negativă doar când nu stă lângă predicat, iar când Nimeni este un nume, el este subiect și propoziția rămâne afirmativă. Întrebarea care spune pe dos arată contrariul, iar sensul îl prinzi din fapta personajului de dinainte.'
      }),
      
      lesson('valori', 'Alegi o valoare și o motivezi', {
        theory: 'O valoare este ceva bun, dorit și important, cum sunt adevărul, binele, curajul sau loialitatea. Alegi una sau două din lista dată, nu toată lista. Le legi de o faptă din text, în cel mult 50 de cuvinte, pentru că „este un model”, fără motiv, nu ajunge, iar fapta arată de ce ai ales valoarea.',
        example: 'Din lista curaj, răbdare și generozitate, Ana alege curajul. Scrie că a rămas lângă coleg când ceilalți au râs. Are o faptă și puține cuvinte, sub limita de 50.',
        tryThis: 'Alege una sau două valori dintr-o listă și scrie, în cel mult 50 de cuvinte, o faptă dintr-un text care le arată.',
        recap: 'O valoare este ceva bun, dorit și important, cum sunt adevărul, binele, curajul sau loialitatea. Alegi una sau două din lista dată și le legi de o faptă din text, în cel mult 50 de cuvinte.'
      }),
      
      lesson('compunere-unitate', 'Compunerea de la finalul unității', {
        theory: 'Compunerea de la finalul unității este textul care respectă tema și are cel puțin două personaje, cu atribute. În dialog stau două propoziții negative de refuz, cu „nu”. Mai pui o afirmație, o nedumerire, o admirație și un îndemn. Minimum este de 80 de cuvinte și trei părți, introducere, cuprins și încheiere, iar la final pui citatul cerut.',
        example: 'Introducerea spune cine este și ce i s-a cerut. În cuprins, sora cea răbdătoare refuză de două ori, cu „nu”, iar lângă fratele grăbit apar și o afirmație, o nedumerire, o admirație și un îndemn. Încheierea spune cum s-a terminat, textul are cel puțin 80 de cuvinte, iar la final stă citatul cerut.',
        tryThis: 'Scrie o compunere de cel puțin 80 de cuvinte, cu introducere, cuprins și încheiere, în care apar două personaje cu atribute, două refuzuri cu nu, o afirmație, o nedumerire, o admirație, un îndemn și, la final, citatul cerut.',
        recap: 'Compunerea respectă tema, are cel puțin două personaje cu atribute, două refuzuri cu nu, plus afirmație, nedumerire, admirație și îndemn. Are minimum 80 de cuvinte, trei părți și la final citatul cerut.'
      }),
      lesson('portofoliu', 'Portofoliul de semestru', {
        theory: 'Portofoliul este dosarul semestrului, nu o singură temă, și are copertă, pagină de titlu și cuprins. Înăuntru stau fișele, lucrările, temele de echipă în copie și foi alese de tine. Mai notezi greșelile frecvente, punctele tari, punctele slabe și o reflecție despre ce s-a schimbat în unitate, pentru că o copertă fără fișe nu este portofoliu.',
        example: 'Ioana scrie că la acord greșea pluralul, iar acum numără termenii subiectului. Asta este progres și ține de reflecție. Dosarul are și copertă, cuprins și fișe, nu doar o copertă goală.',
        tryThis: 'Scrie o pagină de portofoliu cu titlu, două fișe pe care le-ai pune înăuntru și o reflecție despre ce s-a schimbat la tine în unitate.',
        recap: 'Portofoliul este dosarul semestrului, cu copertă, pagină de titlu, cuprins, fișe și reflecție. Notezi greșelile frecvente, punctele tari, punctele slabe și ce s-a schimbat în unitate.'
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
        theory: 'Harta unității despre carte este pagina care anunță drumul, nu lecția gata făcută. Prin carte afli despre lume și despre tine, iar cei de dinainte îți lasă ce au învățat, deci cartea leagă generațiile. Pe hartă sunt câmpul lexical, cuvântul, alfabetul, silaba și accentul, iar sinonimele vin mai încolo. Competențele 1.1, 1.3, 2.5, 3.2, 3.3, 4.2, 4.3 și 5.1, adică opt, cer context și scris îngrijit. Dacă lecția de azi este alfabetul, nu bifezi un titlu doar pentru că îl vezi anunțat, fiindcă harta arată drumul, lecția predă, iar cartea rămâne firul: aceeași învățătură, alt suport, altă vreme.',
        example: 'Lecția de azi este alfabetul, deci lucrezi literele, nu un titlu anunțat pentru mai târziu. Sinonimele rămân un popas viitor pe hartă. Cartea este tot firul, adică aceeași învățătură, pe un alt suport și în altă vreme.',
        tryThis: 'Scrie două propoziții în care spui ce anunță harta despre carte și ce vei lucra la lecția de azi, lăsând sinonimele pentru mai târziu.',
        recap: 'Harta unității despre carte anunță drumul prin care cartea leagă generațiile și te învață despre lume și despre tine. Pe hartă stau câmpul lexical, cuvântul, alfabetul, silaba și accentul, iar cele opt competențe cer context și scris îngrijit.'
      }),
      lesson('carte-lexic', 'Cuvântul-cheie și câmpul lexical', {
        theory: 'Cuvântul-cheie este vorba fără de care nu înțelegi tema și pe care o folosești și la căutare. Oamenii au păstrat ce știau pe piatră, pe lut, pe hârtie, apoi pe ecran, pentru că suportul s-a schimbat, iar nevoia a rămas, ca să nu se piardă învățătura, și dacă scoți cuvântul-cheie, nu se mai știe despre ce este textul, iar un cuvânt frumos, care nu spune tema, este decor, nu cheie. Când tema este biblioteca, în câmp stau raftul și fișa, iar cuvântul-cheie al unui afiș scurt este împrumut. Câmpul lexical este o grupă de cuvinte înrudite ca înțeles, cum sunt păsările, timpul sau rudele, iar dacă se adună multe din același câmp, acolo este subiectul, și un text poate avea două câmpuri, de pildă carte și timp. La o altă cultură grupezi la fel, pe mâncare, muzică și clădiri, și nu pui în aceeași listă cuvinte care nu spun același fel de lucru. Rândunică, vrabie și ciocănitoare țin de păsări, iar papirus, tipar și ecran țin de carte, secol, epocă și mileniu țin de timp, iar raft, copertă și pagină țin tot de carte, și vrabie lângă secol înseamnă două câmpuri, nu unul singur. Posterul cu un câmp lexical este o lucrare făcută de tine, care amestecă text și imagine, iar tu alegi un câmp, cum sunt hobby-ul tău, mâncarea, sportul sau simbolurile, și pui cuvinte-cheie care anunță subiectul, nu o vorbă goală. Informațiile vin din mai multe discipline, pentru că una singură nu ajunge pentru diversitate, iar un desen fără niciun cuvânt care să spună tema nu ține loc de poster, și dacă subiectul este ciorba, cuvântul-cheie este ciorba: de la istorie iei o sărbătoare, de la geografie o regiune, iar de la desen farfuria, deci trei discipline stau într-un singur câmp, mâncarea.',
        example: 'Tema este biblioteca, iar cuvântul-cheie al afișului este împrumut, pentru că fără el nu se mai știe ce faci acolo. Rândunică, vrabie și ciocănitoare stau la păsări, iar secol, epocă și mileniu stau la timp, fiindcă sunt două câmpuri. La posterul despre ciorbă iei o sărbătoare de la istorie, o regiune de la geografie și farfuria de la desen.',
        tryThis: 'Scrie planul unui poster despre mâncare, în care numești câmpul, trei cuvinte-cheie și trei discipline, apoi două liste, una pentru carte și una pentru timp, și o propoziție despre bibliotecă în care subliniezi cuvântul-cheie.',
        recap: 'Cuvântul-cheie este vorba fără de care nu înțelegi tema, iar câmpul lexical grupează cuvinte înrudite, cum sunt cartea și timpul. Posterul este o lucrare făcută de tine, cu text, imagine și informații din mai multe discipline.'
      }),
      
      lesson('stea-intrebari', 'Steaua de întrebări', {
        theory: 'Steaua de întrebări este schema în care pui cuvântul în centru și scrii în jur întrebări ca să explorezi tema. Întrebările sunt ce, la ce, pentru cine, cu cine, cum, unde, când și de ce, iar unde cere un loc și de ce cere un motiv. Din fiecare răspuns poate porni o întrebare nouă, ca să nu rămâi la o propoziție goală, de felul că este important, și astfel tema se deschide în mai multe părți.',
        example: 'Centrul stelei este carte. Întrebarea la ce folosește primește răspunsul că păstrează o poveste, iar întrebarea unde o cauți azi duce la bibliotecă sau la ecran. Întrebarea de când există pornește de la faptul că oamenii au vrut să nu uite.',
        tryThis: 'Desenează o stea cu cuvântul carte în centru și scrie în jur cel puțin patru întrebări, apoi răspunde la fiecare într-o propoziție.',
        recap: 'Steaua de întrebări este schema cu tema în centru și cu întrebări în jur. Unde cere un loc, de ce cere un motiv, iar din fiecare răspuns poate porni o întrebare nouă.'
      }),
      lesson('lucru-grup', 'Roluri în grup', {
        theory: 'Lucrul în grup este munca în care fiecare are un rol clar. Liderul ține echipa unită, administratorul are grijă de materiale, informaticianul ține sursele, ilustratorul adună imaginile, iar cronometrul păzește timpul. Vorbiți pe rând și nu vorbiți peste coleg. Refuzul se spune politicos, cu motiv, iar sursele stau într-o listă separată. Nu este de ajuns ca un singur elev să facă totul, iar ceilalți doar să semneze.',
        example: 'Trei colegi fac o axă a cărții, de la lut la ecran. Cronometrul oprește căutarea la timp, liderul îl întreabă pe cel tăcut ce crede, iar informaticianul notează de unde este imaginea. Fiecare își ține rolul și vorbește pe rând.',
        tryThis: 'Scrie cinci propoziții în care arăți ce face liderul, administratorul, informaticianul, ilustratorul și cronometrul într-un proiect despre carte.',
        recap: 'Lucrul în grup înseamnă că fiecare are un rol: lider, administrator, informatician, ilustrator și cronometru. Vorbiți pe rând, refuzul se spune politicos, cu motiv, iar sursele stau într-o listă separată.'
      }),
      
      lesson('cuvant-alfabet', 'Alfabetul și literele împrumutate', {
        theory: 'Cuvântul este unitatea de bază a vocabularului și are un sens și o formă: sunete când îl spui, litere când îl scrii. Alfabetul este lista literelor, într-o ordine fixă, iar cel românesc are 31 de litere și vine din cel latin, și în dicționar cauți după ordinea aceasta, nu la întâmplare, pentru că R vine înaintea lui V, deci roman stă înaintea lui viitor, și carte și book numesc același obiect, cu alte litere. Alfabetul chirilic este alfabetul slav vechi cu care au fost scrise primele cărți românești și a fost scrisul oficial până în 1860, apoi au venit literele latine de azi, cu care scriem acum. O cronică veche poate avea semne necunoscute, dar nu este neapărat altă limbă, pentru că pagina își poate schimba alfabetul și poate rămâne tot românească. Literele k, w, q și y sunt litere din alfabet folosite mai ales în cuvinte luate din alte limbi sau în nume, și le întâlnești în kilometru, în kilogram sau în watt. Nu le schimbi după ureche și nu le înlocuiești din capul tău, dacă norma le păstrează: kilogram se scrie cu k, nu cu c, iar watt păstrează w, pentru că litera nu este o diacritică, sensul îl cauți în dicționar, iar litera o verifici la scrierea corectă, altfel cuvântul nu mai este cel din dicționar și poate să nu mai fie găsit.',
        example: 'Ca să cauți roman într-un dicționar tipărit, urmărești alfabetul, iar R vine înaintea lui V, deci roman stă înaintea lui viitor. Kilometrul se scrie cu k, iar watt păstrează w, cum cere norma. Aceeași idee, scrisă chirilic, pare un șir străin până înveți semnele, dar limba paginii a rămas aceeași.',
        tryThis: 'Scrie cinci cuvinte așezate în ordinea alfabetului și două propoziții în care arăți că alfabetul limbii române are 31 de litere, vine din cel latin și că chirilica a fost scrierea oficială până în 1860, apoi încă două propoziții cu kilometru și watt, în care păstrezi literele k și w.',
        recap: 'Cuvântul are sens și formă, iar alfabetul românesc are 31 de litere, venite din cel latin, și în dicționar cauți după această ordine. Chirilica a fost scrierea oficială până în 1860, iar literele k, w, q și y se păstrează în cuvintele împrumutate, cum sunt kilogram și watt.'
      }),
      
      
      lesson('diacritice', 'Diacriticele și scrierea lui î', {
        theory: 'Diacriticele sunt semne puse pe literă, iar ele schimbă pronunția. Căciulița stă pe ă, virgula stă pe ș și pe ț, iar accentul circumflex stă pe â și pe î, și le pui mereu, nu doar când ți se pare că arată bine, pentru că fără ele cuvântul poate însemna altceva. Masă, cu căciuliță, nu este același cuvânt cu masa, iar român, cu accent circumflex, nu spune același lucru cu roman, și celălalt poate râde tocmai pentru că s-a schimbat sensul. Pentru sunetul î scrii î la începutul și la sfârșitul cuvântului, ca în în și coborî, iar în interior scrii â, ca în adânc și român. Dacă rădăcina începe cu î și pui un prefix, î rămâne, ca în neîngrijit, reîncepe și subînțeles, iar după ne- nu scrii â, pentru că rădăcina este îngrijit, deci forma este neîngrijit. Înainte de b sau p, prefixul în- se scrie cu m, ca în împăduri, unde urmează p, și ca în îmbătrâni, unde urmează b, iar forma cu n înainte de p, înpădurire, se înlocuiește cu împădurire. Nu pui un i în plus doar pentru că așa îți sună în grabă, deci era nu se scrie iera, iar epocă nu se scrie iepocă, și le păstrezi pe toate corecte, nu doar pe prima.',
        example: 'Scrii Acolo era altă epocă, fără i în plus la era și la epocă, iar împădurirea se scrie cu m, pentru că după prefix urmează p. Adânc are â, fiindcă sunetul stă în mijloc, fără prefix, iar neîngrijit păstrează î după ne-. Masă, cu căciuliță, nu este același cuvânt cu masa.',
        tryThis: 'Scrie propoziții în care folosești cuvinte cu î la început și la sfârșit, cu â în interior, cu î după un prefix și cu m înainte de p sau b, apoi încă trei propoziții corecte cu era, epocă și împădurire, și arată cum se schimbă sensul dacă lipsește semnul de pe literă.',
        recap: 'Diacriticele schimbă pronunția: căciulița pe ă, virgula pe ș și pe ț, accentul circumflex pe â și pe î. Scrii î la capete, â în interior, î după un prefix pe o rădăcină cu î, m înainte de b sau p, și nu pui un i în plus la era și la epocă.'
      }),
      lesson('silaba', 'Silaba și semivocala', {
        theory: 'Silaba este un sunet sau un grup spus dintr-o singură deschidere a gurii, iar într-o silabă stă o singură vocală. Vocalele se rostesc singure și sunt a, ă, â, î, e, i, o, u, iar consoanele au nevoie de o vocală și sunt b, c, d, f, g, h, j, k, l, m, n, p, r, s, ș, t, ț, v, z, și numeri vocalele care țin silaba, nu toate literele, și nu numești literele silabe. Acasă se desparte a-ca-să, deci sunt trei deschideri și trei silabe, iar vocalele sunt a, a și ă, și litera b este consoană, pentru că are nevoie de o vocală ca să stea într-o silabă. Semivocala este sunetul pe care îl fac e, i, o sau u când nu țin singure o silabă, ci stau lângă o altă vocală, iar aceleași litere sunt vocale când poartă silaba. Le recunoști ușor când sunt urmate de a, ă sau î, ca în seară, semivocala se aude mai scurt, iar vocala se aude mai prelung, deci nu orice e sau i este vocală. În tei, t este consoană, e este vocală, iar i este semivocală și nu face singură o silabă, iar în zeu, e poartă silaba și este vocală, așa că nu pui i din tei în aceeași cutie cu e din zeu.',
        example: 'Acasă se desparte a-ca-să, cu trei silabe, iar vocalele care le țin sunt a, a și ă. În tei, e este vocală și i este semivocală, pentru că i nu face singură o silabă. În zeu, e poartă silaba și se aude mai prelung.',
        tryThis: 'Desparte în silabe cuvintele acasă și carte și scrie două propoziții în care spui care vocale țin silabele fiecărui cuvânt, apoi încă două în care desparți rolurile literelor din tei și din zeu.',
        recap: 'Silaba se spune dintr-o singură deschidere a gurii și ține o singură vocală, iar consoanele au nevoie de o vocală. Semivocala este e, i, o sau u când stă lângă o altă vocală și se aude mai scurt, iar aceeași literă este vocală când poartă silaba.'
      }),
      
      lesson('accent', 'Accentul, litera și sunetul', {
        theory: 'Accentul este pronunțarea mai puternică sau mai înaltă a unei silabe și poate schimba sensul. Limba standard este forma folosită de toată comunitatea, după norme, iar accentul face parte din normă, și dacă nu ești sigur, cauți cuvântul în DOOM și nu pui apăsarea unde îți vine, pentru că aceleași litere, cu alt accent, pot fi alt cuvânt, iar în carte silaba accentuată este car. Maria e veselă poate însemna că este voioasă, dacă apeși începutul cuvântului, iar dacă apeși mijlocul, veselă poate însemna vasele de pe masă. De regulă, un sunet se scrie cu o literă, dar aceasta nu este o lege fără excepții, iar litera x redă două sunete, cs, ca în fix, sau gz, ca în exemplu. Același sunet poate avea litere diferite: sunetul k se scrie c în casă și k în karate, iar sunetul v se scrie v sau w. Fix are 3 litere și 4 sunete, pentru că x valorează cs, așa că nu numeri literele și nu spui că ai tot atâtea sunete, și nu corectezi un cuvânt după celălalt când încep cu același sunet, dar cu altă literă.',
        example: 'Maria e veselă poate însemna că este voioasă, dacă apeși începutul, sau că pe masă stau vasele, dacă apeși mijlocul, iar forma nesigură se verifică în DOOM. Fix are trei litere și patru sunete, pentru că x se aude cs. Casă și karate încep cu același sunet, dar karate începe cu litera k, nu cu c.',
        tryThis: 'Scrie două propoziții cu veselă, una pentru sensul de voioasă și una pentru vasele de pe masă, în care spui silaba pe care o apeși, apoi propoziții cu fix, exemplu, casă și karate, în care arăți că x se aude ca două sunete și că fiecare cuvânt își păstrează litera de la început.',
        recap: 'Accentul este pronunțarea mai puternică a unei silabe, poate schimba sensul și se verifică în DOOM, pentru că face parte din limba standard. Litera x redă două sunete, cs sau gz, iar același sunet se poate scrie cu litere diferite, cum sunt c și k sau v și w.'
      }),
      
      lesson('litera-ajutatoare', 'Litera care doar ajută', {
        theory: 'Litera ajutătoare este litera care nu se aude ca ea însăși, ci ajută pronunția, iar contextul, adică litera de lângă, decide. În che, chi, ghe și ghi, h nu se citește ca h din haz, iar în hrană h este consoană, deci nu citești che ca pe c, plus h, plus e. În ce, ci, ge și gi, e sau i poate fi doar semn pentru consoana moale, nu o vocală plină.',
        example: 'În chemare, h nu se aude ca în hrană, pentru că ajută pronunția. În hrană, h este consoană și se aude. În geme, e de după g schimbă sunetul lui g, care nu este același g ca în gaz.',
        tryThis: 'Scrie patru propoziții, cu cuvintele chemare, hrană, geme și gaz, și spune în fiecare dacă h sau e se aude ca literă plină sau doar ajută.',
        recap: 'Litera ajutătoare nu se aude ca ea însăși, ci ajută pronunția, iar contextul decide. H poate fi consoană, ca în hrană, sau semn, ca în che, iar e și i pot marca o consoană moale.'
      }),
      
      lesson('sinonime', 'Sinonime și antonime', {
        theory: 'Sinonimele sunt cuvinte cu formă diferită și același înțeles, alese după frază, nu după primul cuvânt din listă. Au ridicat un zid are sinonimul a construi, deci înseamnă au construit, iar I-au ridicat pedeapsa înseamnă au anulat-o, așa că contextul alege sinonimul, și dacă repeți de patru ori frumos, textul slăbește, chiar dacă aceeași idee poate sta în altă formă și vorbele nu se mai calcă una pe alta. Poți scrie că pisica este blândă, că are mustăți lungi și ochi limpezi. Antonimele sunt cuvinte cu formă diferită și sens opus, cum sunt mare și mic, bucurie și tristețe, furie și calm, speranță și disperare, iar antonimul este alt cuvânt și îl verifici în frază. Nu merg se opune lui merg, dar nu este antonim, ci aceeași vorbă cu nu, adică o negație. La emoții, bucuria stă în fața tristeții, nu în fața furiei, iar urâtă schimbă frumusețea, nu lumina, deci nu este opusul lui luminoasă. Pentru Camera e luminoasă, opusul potrivit este întunecoasă, pentru că se schimbă lumina.',
        example: 'În au ridicat un zid, sinonimul potrivit este a construi, pentru că fraza vorbește despre o construcție. Pisica poate fi blândă, cu mustăți lungi și ochi limpezi, fără să repeți frumos. Pentru o cameră luminoasă, opusul potrivit este întunecoasă, iar tristețea stă în fața bucuriei.',
        tryThis: 'Scrie trei propoziții despre o pisică în care înlocuiești repetarea lui frumos cu alte cuvinte potrivite în frază, apoi patru perechi de propoziții cu antonime, folosind mare și mic, bucurie și tristețe, furie și calm, speranță și disperare.',
        recap: 'Sinonimele au formă diferită și același înțeles, iar le alegi după frază, ca să nu repeți același cuvânt. Antonimele au sens opus și sunt alt cuvânt, iar nu pus lângă aceeași vorbă este negație.'
      }),
      
      lesson('notite', 'Notițele și paragraful', {
        theory: 'Notițele sunt însemnările pe care le poți citi și peste o săptămână. Lași loc între titlu și text, data stă sus, în dreapta, subliniezi cuvintele-cheie și poți folosi culori și scheme, iar unele texte sunt doar paragrafe, altele amestecă vorbe cu desene sau hărți, dar nu scrii totul într-un bloc, fără aer și fără titlu. Paragraful este o bucată unitară, cu o idee principală, despărțită printr-un alineat nou, iar când treci la altă idee, începi rând nou, nu rămâi pe același rând. Cauza spune de ce se întâmplă, iar efectul spune ce urmează, și le poți pune în două paragrafe sau într-o schemă. Dacă le lipești fără alineat, cititorul nu vede unde se schimbă firul. Titlul poate fi Cauza și efectul, un copil poate cere mereu dulciuri, iar efectul este că cei din casă obosesc, și săgeata dintre cele două este schema. Poți scrie și că cineva a repetat același cuvânt toată ziua, iar efectul este că cei din jur nu l-au mai auzit, fiecare idee în paragraful ei.',
        example: 'Titlul este Cauza și efectul, iar data stă sus, în dreapta. Un copil cere mereu dulciuri, iar efectul este că cei din casă obosesc, și săgeata dintre ele este schema. Cele două idei stau în două paragrafe, fiecare cu alineat nou.',
        tryThis: 'Scrie o pagină de notițe cu titlu, data sus în dreapta, două paragrafe începute cu alineat nou, unul cu o cauză și unul cu efectul, și o schemă cu săgeată între ele.',
        recap: 'Notițele se pot citi și peste o săptămână, au titlu, loc liber, data sus în dreapta și cuvintele-cheie subliniate. Paragraful ține o idee și începe cu alineat nou, cauza spune de ce, iar efectul spune ce urmează.'
      }),
      
      lesson('proiect', 'Proiectul și cum îl notezi', {
        theory: 'Proiectul este lucrarea pe care o pregătești în etape, pornind de la o temă care te interesează. Scrii cel puțin două întrebări, apoi o îngustezi la o expresie, o credință sau un desen, afli termenul de predare și abia apoi faci planul și alegi tipul, compunere, prezentare sau poster, iar sursele pot fi manuale, enciclopedii sau cărți, și nu începi să scrii înainte să știi ce formă trebuie să aibă lucrarea. Tema mare poate fi animalele, întrebările pot fi de ce se sperie unii de pisica neagră și cum o văd alte culturi, iar produsul este un poster când termenul este scurt. Autoevaluarea proiectului este notarea ta până la 100 de puncte, pe șapte criterii. Structura unitară valorează 10 puncte, tema nuanțată 20, pagina 10, sursele credibile 10, anexa cu sursele 20, iar felul tău de a uni textul cu imaginea 10 puncte. La scriere iei 20 de puncte sub patru greșeli, 10 peste patru și 5 peste opt, iar sursele și tema cântăresc cel mai mult. Un colaj frumos, fără să se vadă de unde ai luat informația, pierde anexa, adică 20 de puncte, iar la cinci greșeli de scriere nu mai iei 20, ci 10.',
        example: 'Tema mare este animalele, iar întrebi de ce se sperie unii de pisica neagră și cum o văd alte culturi, apoi alegi un poster, pentru că termenul este scurt. Ai un poster clar, dar fără lista de surse, deci pierzi anexa, adică 20 de puncte, chiar dacă desenul este frumos. La cinci greșeli de scriere nu mai iei 20, ci 10, iar punctele se adună după criterii, până la 100.',
        tryThis: 'Alege o temă care te interesează, scrie două întrebări de documentare și un plan scurt pentru un poster, o compunere sau o prezentare, după un termen pe care îl notezi, apoi notează proiectul pe cele șapte criterii, în propoziții, și adună punctele până la cel mult 100.',
        recap: 'Proiectul pornește de la o temă care te interesează, cu cel puțin două întrebări, iar planul și tipul lucrării se aleg după termenul de predare. Autoevaluarea împarte 100 de puncte pe șapte criterii, iar tema nuanțată și anexa cu sursele valorează câte 20.'
      }),
      
      lesson('empatie', 'Tema, empatia și dialogul atent', {
        theory: 'Tema este ideea centrală, în linii mari, și o numești scurt, cu un substantiv, cum sunt călătoria, copilăria sau școala. Detaliul o face de crezut printr-un gest, un obiect sau un loc, iar empatia înseamnă să înțelegi gândurile și dorințele celuilalt și să te pui în pielea lui, nu să fii mereu de acord cu tot. O vorbă de felul a fost frumos, fără o faptă, nu ține loc de detaliu, iar eram emoționat rămâne un detaliu gol pe lângă un gest concret, cum este că ghiozdanul bătea în genunchi. Dialogul atent este vorbirea în care ești pe rând vorbitor și ascultător, iar vorbitorul spune clar, pe temă, cu voce cât să fie auzit, nu cât să deranjeze, și îl invită pe celălalt. Ascultătorul se uită la el, nu îl întrerupe și nu vorbește odată cu el, iar dacă nu a înțeles, cere o clarificare, pentru că doi oameni care vorbesc deodată nu fac un dialog atent. Ioana poate spune de ce i-a plăcut un personaj, apoi tace, iar Andrei se uită la ea și întreabă ce i s-a părut grijuliu, după ce ea a terminat. Empatia se vede când înțelegi că celălalt vrea să scrie, nu doar să asculte.',
        example: 'Tema este copilăria, iar detaliul bun este că ghiozdanul bătea în genunchi. Ioana spune de ce i-a plăcut un personaj, apoi tace, iar Andrei se uită la ea și întreabă ce i s-a părut grijuliu. Înțelegi că el vrea să scrie, nu doar să asculte, fără să fii de acord cu tot.',
        tryThis: 'Scrie trei propoziții, una în care numești tema cu un substantiv, una cu un detaliu concret și una în care arăți că înțelegi dorința altcuiva, apoi un dialog de patru replici în care vorbitorul stă pe temă și îl invită pe celălalt, iar ascultătorul se uită la el și cere o lămurire.',
        recap: 'Tema se numește scurt, cu un substantiv, detaliul o face de crezut printr-un gest, iar empatia înseamnă să înțelegi dorința celuilalt. În dialogul atent vorbiți pe rând, cu voce potrivită, iar ascultătorul se uită, nu întrerupe și cere o lămurire.'
      }),
      
      lesson('tiparita-digitala', 'Carte tipărită sau digitală', {
        theory: 'Cartea tipărită și cartea digitală sunt două suporturi care duc același text, iar ambele sunt cărți. Tipărită nu are baterie, o poți dărui și nu o ștergi dintr-un clic. Digitală îți dă multe volume fără greutate, dar bateria se poate termina. Fiecare are un câștig și o limită, alegi după drum, nu după modă, iar se schimbă suportul, nu faptul că este carte.',
        example: 'În tren, zece povești încap într-un e-reader, iar asta este forma digitală. Pe noptieră, pagina care foșnește și pe care o poți împrumuta este tipărită. Ambele sunt cărți, iar tu alegi după drum.',
        tryThis: 'Scrie trei propoziții în care compari cartea tipărită cu cea digitală pentru un drum cu trenul și pentru seara de acasă.',
        recap: 'Cartea tipărită și cartea digitală duc același text, pe suporturi diferite. Tipărită nu are baterie și o poți dărui, iar digitală ține multe volume fără greutate, dar bateria se poate termina.'
      }),
      lesson('intrebare-deschisa', 'Întrebarea deschisă', {
        theory: 'Întrebarea deschisă este întrebarea care nu se rezolvă cu da sau nu și începe cu ce, care, cum sau de ce. Așa afli un răspuns pe larg, nu un semn din cap, în timp ce întrebarea închisă se rezolvă cu da sau nu. Pentru un cadou, întrebi ce i-a plăcut, nu doar dacă îi place să citească. Patru întrebări închise nu ajung ca să îl cunoști pe coleg.',
        example: '„Îți place cartea?” este închisă, pentru că se poate răspunde scurt, prin da sau prin nu. „Ce carte ai reciti?” este deschisă și îți dă un titlu. De aceea o folosești când cauți un cadou.',
        tryThis: 'Scrie patru întrebări deschise, cu ce, care, cum și de ce, prin care afli ce carte i-ar plăcea unui coleg ca dar.',
        recap: 'Întrebarea deschisă nu se rezolvă cu da sau nu și începe cu ce, care, cum sau de ce. Întrebarea închisă se rezolvă cu da sau nu, iar pentru un cadou ai nevoie de un răspuns pe larg.'
      }),
      lesson('de-ce-citim', 'De ce să citești', {
        theory: 'Cititul cu folos este lectura prin care înțelegi, nu doar treci cu ochii peste pagini. Poți trăi fără cărți, dar pierzi o convorbire cu alte vremuri, iar cititul fără înțelegere este gol. Tiparul în limba română începe în secolul al XVI-lea. O carte din 1544 nu s-a păstrat, iar cea mai veche tipăritură din care au rămas exemplare este din 1551–1553. Citești ca să poți povesti o scenă, nu ca să numeri paginile.',
        example: 'Cineva a citit zece pagini și nu poate spune despre ce erau, deci cititul a rămas gol. Un coleg care poate povesti o scenă a citit cu folos. Tiparul românesc păstrat începe în secolul al XVI-lea, cu exemplare din 1551–1553.',
        tryThis: 'Scrie trei propoziții în care spui de ce citești, ce poți povesti dintr-o carte și din ce veac vine cea mai veche tipăritură românească păstrată.',
        recap: 'Citești ca să înțelegi și ca să păstrezi o convorbire cu alte vremuri, nu ca să numeri pagini. Tiparul în limba română începe în secolul al XVI-lea, iar cea mai veche tipăritură păstrată este din 1551–1553.'
      }),
      
      
      lesson('placere-indatorire', 'Îndatorire și plăcere', {
        theory: 'Fișa de îndatorire și plăcere este pagina pe care separi ce este îndatorire de ce îți face plăcere. Scrii trei îndatoriri și trei plăceri, apoi spui unde stă cititul, la datorie, la plăcere sau la amândouă, și dai un titlu temei. Mai adaugi două enunțuri afirmative și două propoziții negative, cu detalii, nu cu o vorbă goală de felul „e ok”, iar lista nu rămâne amestecată.',
        example: 'O îndatorire este că îți faci tema de matematică, iar o plăcere este că citești seara o poveste. Titlul poate fi „Cititul meu stă la plăcere”. Afirmativ scrii „Citesc după cină.”, iar negativ scrii „Nu citesc în pauza de zece minute.”',
        tryThis: 'Scrie trei îndatoriri, trei plăceri, un titlu despre unde stă cititul la tine, două enunțuri afirmative și două propoziții negative cu detalii.',
        recap: 'Pe fișă separi trei îndatoriri de trei plăceri și spui unde stă cititul, apoi dai un titlu. Mai adaugi două enunțuri afirmative și două propoziții negative, cu detalii.'
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
        theory: 'O povestire este o întâmplare pe care oamenii o trec din casă în casă, pe vorbă sau în scris. Ea te poate amuza, te poate întrista sau te poate ține în suspans până afli ce urmează. În unitatea aceasta reiei personajul și verbul, apoi descoperi textul narativ literar, personificarea, imperativul și indicativul. Sunt cinci competențe: 1.1, 2.3, 3.1, 4.4 și 5.2.',
        example: 'Seara, bunica îi spune nepotului o întâmplare auzită de la mama ei. Povestea trece astfel dintr-o casă în alta, pe vorbă, și îl ține pe copil în suspans. A doua zi el o așterne în scris, ca să nu se piardă.',
        tryThis: 'Scrie două propoziții în care arăți cum aceeași poveste ajunge de la o casă la alta, una pe vorbă și una în scris.',
        recap: 'Povestirea este o întâmplare pe care oamenii o transmit din casă în casă, pe vorbă sau în scris, și te poate amuza, întrista sau ține în suspans. În unitatea aceasta reiei personajul și verbul și descoperi narativul literar, personificarea, imperativul și indicativul, la cele cinci competențe 1.1, 2.3, 3.1, 4.4 și 5.2.'
      }),
      lesson('narativ', 'Textul narativ și indiciile', {
        theory: 'Textul narativ literar este un text cu întâmplări imaginare și cu personaje, adică participanți imaginari creați de autor. Acțiunea este ceea ce se schimbă pe parcurs, timpul arată când se petrece întâmplarea, iar spațiul arată unde se petrece. Dacă nu există întâmplări și nu se schimbă nimic, textul este o descriere, iar descrierea arată locul și momentul. Indiciile de timp și de spațiu sunt semnele din text care arată unde și când se petrec întâmplările, iar pe ele le aduni pe mai multe și nu te oprești la un singur cuvânt. Dacă un personaj pomenește Egiptul, acțiunea nu este automat acolo, iar dacă păsările au plecat de săptămâni, momentul este târziu în an.',
        example: 'Un băiat uită caietul pe bancă și se întoarce după el înainte de sonerie, într-o dimineață, în clasă, deci se schimbă ceva și textul este narativ literar. Afară ningea de ore bune, iar rândunica stătea pe pervaz, așa că timpul este iarna, iar spațiul este lângă fereastră. Cuvântul Africa, rostit doar într-o amintire, nu mută scena acolo, iar curtea liniștită, fără nicio întâmplare, rămâne doar o descriere.',
        tryThis: 'Scrie în caiet o întâmplare scurtă cu un personaj, un timp și un spațiu, apoi adună mai multe indicii și arată că povestea nu se mută într-o țară doar pentru că un personaj îi spune numele.',
        recap: 'Textul narativ literar are întâmplări imaginare și personaje create de autor, acțiunea este ceea ce se schimbă, timpul arată când, spațiul arată unde, iar un text fără întâmplări este descriere. Locul și momentul ies din mai multe indicii, nu dintr-un singur cuvânt, menționarea Egiptului nu mută automat acțiunea acolo, iar plecarea păsărilor de săptămâni arată că este târziu în an.'
      }),
      lesson('asteptari-titlu', 'Așteptarea din titlu și părerea', {
        theory: 'Așteptarea din titlu este ideea pe care titlul o trezește înainte să citești textul. După lectură, așteptarea se confirmă sau se contrazice, iar o spui în două mișcări: întâi ce ai crezut citind titlul, apoi ce ai aflat din text. Un titlu nou pentru un fragment dă un indiciu și nu repetă tot episodul. Părerea care se schimbă este judecata despre cineva care nu rămâne aceeași când apar fapte noi, iar nu toți țin aceeași atitudine tot textul. O spui în trei pași, la început, apoi și în final, și când povestești schimbarea arăți motivul, adică fapta nouă, nu doar rezultatul.',
        example: 'Titlul Pisica cea curajoasă te face să aștepți un animal îndrăzneț, iar dacă în text pisica se ascunde speriată, așteptarea se contrazice. La început, colegii cred că Mara este rea, fiindcă stă retrasă. Apoi o văd că își împarte micul dejun, și aceasta este fapta nouă, iar în final spun că este timidă, nu rea.',
        tryThis: 'Scrie în caiet ce ai crezut citind un titlu și ce ai aflat după lectură, apoi arată cum se schimbă părerea despre un coleg, cu pașii la început, apoi și în final, și cu fapta nouă care este motivul.',
        recap: 'Titlul trezește o așteptare pe care lectura o confirmă sau o contrazice, o spui în două mișcări, iar un titlu nou pentru un fragment dă un indiciu și nu repetă tot episodul. Părerea despre cineva se poate schimba când apar fapte noi și se spune în trei pași, la început, apoi și în final, arătând motivul, nu doar rezultatul.'
      }),
      
      lesson('personificare', 'Personificarea', {
        theory: 'Personificarea este procedeul prin care un lucru, un fenomen sau un animal primește o acțiune de om. O statuie care privește, vorbește sau plânge este personificare, pentru că face fapte de om. Comparația este alt procedeu: are cuvântul ca și nu transformă lucrul în om. Un animal intră la personificare doar când primește o faptă de om.',
        example: 'Fântâna privește curtea și oftează, deci un lucru face fapte de om și avem personificare. Vântul șoptește la geam, deci și un fenomen poate primi o acțiune de om. Propoziția în care fântâna este rece ca gheața rămâne comparație, fiindcă apare cuvântul ca și lucrul nu se preface în om.',
        tryThis: 'Scrie două propoziții în care un lucru și un fenomen fac fapte de om, apoi o propoziție de comparație în care apare cuvântul ca.',
        recap: 'Personificarea dă unui lucru, unui fenomen sau unui animal o acțiune de om, cum sunt privitul, vorbitul sau plânsul. Comparația păstrează cuvântul ca și nu transformă lucrul în om.'
      }),
      
      lesson('compunere-narativa', 'Compunerea narativă', {
        theory: 'Compunerea narativă este o scriere cu întâmplări, alcătuită din cel puțin patru paragrafe. Ele cuprind începutul, motivul, fapta spusă în două sau trei episoade, tensiunea și închiderea. Timpii verbului arată ordinea faptelor. Poți adăuga o imagine. Iei ideea textului citit și nu copiezi textul.',
        example: 'Un băiat găsește o mănușă și vrea să o ducă la proprietar, deci are un început și un motiv. Întreabă la poartă, apoi la magazin, dar magazinul se închide, și acesta este momentul de tensiune. La urmă o lasă la portar, în închidere, iar timpii verbului țin ordinea, într-o compunere de cel puțin patru paragrafe.',
        tryThis: 'Scrie o compunere narativă de cel puțin patru paragrafe, cu început, motiv, fapta în două sau trei episoade, tensiune și închidere, luând o idee fără să copiezi textul citit.',
        recap: 'Compunerea narativă are cel puțin patru paragrafe: început, motiv, fapta în două sau trei episoade, tensiune și închidere. Timpii verbului arată ordinea, poți adăuga o imagine, iar ideea se ia fără să copiezi textul citit.'
      }),
      lesson('verbul', 'Verbul: acțiune, stare și timp', {
        theory: 'Verbul este cuvântul care arată o acțiune, un eveniment sau o stare care se schimbă, iar doar el își schimbă forma și pentru timp, și pentru persoană, față de momentul vorbirii. Timpul poate fi prezent, trecut sau viitor, iar pe lângă timp mai ai persoană și număr, iar în dicționar cauți infinitivul, deci alint devine a alinta. Verbul de acțiune este cel care arată ce ai făcut, iar verbul de stare este cel care arată ce ai simțit, când te evaluezi. La începutul Mi-a plăcut să pui un verb de acțiune, ca în să desenez, iar la începutul Am simțit că pui o stare, ca în că eram mândru. Mai completezi ce ai reținut, ce nu ți-a plăcut, ce vrei să știi și de ce ți-a amintit lecția.',
        example: 'Acum plec la bibliotecă, deci verbul este la prezent, persoana întâi, ieri am plecat este trecut, iar mâine voi pleca este viitor. În dicționar cauți infinitivul a pleca, așa cum alint se caută la a alinta. Mi-a plăcut să desenez cadrele, am simțit că eram mândru, iar am reținut că norul ține gândul.',
        tryThis: 'Scrie în caiet trei propoziții cu același verb, una la prezent, una la trecut și una la viitor, notează infinitivul din dicționar, apoi completează ce ți-a plăcut cu un verb de acțiune, ce ai simțit ca stare, ce ai reținut, ce nu ți-a plăcut, ce vrei să știi și de ce ți-a amintit lecția.',
        recap: 'Verbul arată o acțiune, un eveniment sau o stare care se schimbă și își schimbă forma după timp, persoană și număr, iar în dicționar îl cauți la infinitiv, ca atunci când alint devine a alinta. La Mi-a plăcut să pui un verb de acțiune, ca în să desenez, la Am simțit că pui o stare, ca în că eram mândru, și mai completezi ce ai reținut, ce nu ți-a plăcut, ce vrei să știi și de ce ți-a amintit lecția.'
      }),
      lesson('moduri', 'Modurile verbului', {
        theory: 'Modul verbului este felul în care vorbitorul privește acțiunea: ca sigură, dorită, condiționată, posibilă sau cerută. Indicativul o ia drept fapt, ca în citesc. Forma să citesc o ia drept faptă posibilă. Aș citi dacă aș avea timp o leagă de o condiție, iar Citește o cere.',
        example: 'Sigur citesc povestea, deci acțiunea este un fapt, la indicativ. E posibil să citesc arată o faptă posibilă, iar aș citi dacă aș avea timp o leagă de o condiție. Citește pagina este o cerere.',
        tryThis: 'Scrie patru propoziții cu verbul a citi, una ca fapt sigur, una ca faptă posibilă, una legată de o condiție și una ca cerere.',
        recap: 'Modul arată cum privește vorbitorul acțiunea: sigură, dorită, condiționată, posibilă sau cerută. Același verb poate fi fapt, ca în citesc, faptă posibilă, ca în să citesc, condiție, ca în aș citi dacă aș avea timp, sau cerere, ca în Citește.'
      }),
      lesson('imperativ', 'Imperativul și scrierea lui', {
        theory: 'Imperativul este modul în care verbul cere ceva, adică un ordin, un îndemn, o rugăminte, un sfat sau o interdicție, și are formă doar la persoana a doua, la singular și la plural. Fața, gestul și tonul arată dacă este rugăminte sau ordin, iar în scris pui semnul exclamării, pe când a plecat este timp trecut și povestește o faptă gata, deci nu este imperativ. Ești atent devine Fii atent, cu doi de i, iar Fi atent nu se scrie. Afirmativ spui Fă, iar la interdicție spui Nu face, nu Nu fă, și Du-te devine la interdicție Nu te duce, nu Nu te du. De la persoana întâi treci la a doua, deci mă gândesc devine gândește-te.',
        example: 'Fii calm când intri în clasă, fă liniște lângă cei care citesc și nu face gălăgie, iar dacă pleci, nu te duce acum. Gândește-te întâi, pentru că cererea a trecut de la mă gândesc la persoana a doua, iar semnul exclamării arată rugămintea sau ordinul. Palma ridicată ține aceeași cerere prin gest și ton, iar a plecat povestește o faptă gata, la trecut.',
        tryThis: 'Scrie în caiet o rugăminte și un ordin la persoana a doua, cu formele Fii, Fă, Nu face și Nu te duce, schimbă mă gândesc în gândește-te și adaugă o propoziție la trecut cu a plecat.',
        recap: 'Imperativul cere, îndeamnă, roagă, sfătuiește sau interzice, doar la persoana a doua, singular și plural, iar fața, gestul, tonul și semnul exclamării arată cererea. La scris, ești atent devine Fii atent, afirmativul este Fă și interdicția este Nu face, Du-te se interzice prin Nu te duce, de la persoana întâi treci la a doua, ca în gândește-te, iar a plecat nu este imperativ.'
      }),
      
      lesson('indicativ-1', 'Indicativul: prezent și imperfect', {
        theory: 'Indicativul este modul în care acțiunea este prezentată ca un fapt, iar în povestire faptele stau într-o ordine, așa că dacă schimbi ordinea se schimbă și înțelesul. Prezentul spune ce se întâmplă când vorbești sau un adevăr care ține mereu, iar conjugarea schimbă forma verbului după mod, timp, persoană și număr. La a fi, forma de azi este sunt, sînt este veche, iar îs și îi apar doar în unele contexte. La plural spui ei miros, nu miroase, și noi creăm, nu creem, la persoana întâi spui eu legăn, nu leagăn, iar la a crea urmezi modelul lui a lucra, scoți ultima vocală și pui terminația -ez, deci forma este creez, apoi mai spui eu văd, nu văz, eu prind, nu prinz, iar păsările zboară, nu zbor. Imperfectul spune o acțiune trecută care durează sau se repetă, este o formă simplă, fără auxiliar, fundalul care durează stă la imperfect, iar fapta scurtă care îl întrerupe stă la alt timp. Terminațiile sunt -am, -ai și -a la singular și -am, -ați și -au la plural, ca în mergeam, mergeai, mergea, mergeam, mergeați, mergeau. Scrii eram, nu ieram, luam, nu luoam, ploua, nu ploa, dădeam, nu dam, și stăteam, nu stam, iar la a vrea spui voiam sau vream, pe când vroiam nu se folosește.',
        example: 'Acum citesc la fereastră, eu sunt acolo și văd două păsări care zboară, noi creăm o poveste, eu creez titlul, colegii miros hârtia, prind creioanele, iar eu legăn foaia. În fiecare seară citeam, iar când mergeam spre casă eram ud, pentru că ploua, voiam să stau la căldură, luam prosopul, stăteam la fereastră și dădeam din cap. În propoziția citeam când a sunat, fundalul stă la imperfect, iar sunatul, fapta scurtă, stă la alt timp.',
        tryThis: 'Scrie în caiet propoziții la prezent cu sunt, creăm, legăn, creez, văd, prind, miros și zboară, apoi la imperfect cu eram, voiam sau vream, ploua, luam, dădeam, stăteam, mergeam, mergeai, mergea, mergeați și mergeau, și leagă un fundal la imperfect de o întrerupere scurtă.',
        recap: 'Indicativul prezintă fapte așezate într-o ordine, prezentul este acum sau mereu, cu forme ca sunt, creăm, legăn, creez, văd, prind, miros și zboară, iar imperfectul arată o acțiune trecută care durează sau se repetă, deosebită de fapta scurtă care o întrerupe. Imperfectul este o formă simplă, cu terminațiile -am, -ai, -a, -am, -ați, -au, ca în mergeam, mergeai, mergea, mergeați, mergeau, și scrii eram, luam, ploua, dădeam, stăteam, voiam sau vream.'
      }),
      
      
      lesson('perfect-compus', 'Perfectul compus: ia, i-a, la, l-a', {
        theory: 'Perfectul compus este un timp trecut pentru o acțiune încheiată și se face din auxiliarul a avea și din participiul în -t sau în -s, ca în am citit, ai scris și a venit. Auxiliarul se schimbă după persoană, am, ai, a, am, ați, au, iar participiul rămâne neschimbat. Imperfectul ține obișnuința, perfectul compus aduce fapta care se termină, inclusiv fapta scurtă care întrerupe povestea, iar fără auxiliar rămâne doar participiul și nu se mai vede cine a făcut acțiunea. Formele ia, i-a, la și l-a sunt patru scrieri diferite: fără cratimă, ia este prezentul lui a lua, ca în ia cartea, cu cratimă, i-a este perfect compus, ca în i-a spus, la este prepoziție, ca în la școală, iar l-a este pronume plus auxiliar, ca în l-a văzut. Verbul a avea este verb de sine stătător în ei au o carte și auxiliar în ei au zis, iar dacă urmează un participiu, este auxiliar.',
        example: 'În fiecare joi citeam câte o poveste, iar joi am citit ultima pagină, tu ai scris titlul și Ana a venit cu cartea. El ia sfaturile în serios, apoi i-a spus un sfat colegului, merge la școală și l-a ascultat pe profesor. În ei au o carte, a avea stă singur, iar în ei au zis este auxiliar, pentru că urmează participiul.',
        tryThis: 'Scrie în caiet o propoziție la imperfect pentru obișnuință și una la perfect compus pentru fapta încheiată, apoi câte o propoziție cu ia, cu i-a, cu la și cu l-a, și încă două în care a avea este o dată verb de sine stătător și o dată auxiliar.',
        recap: 'Perfectul compus este timpul trecut al unei acțiuni încheiate, cu am, ai, a, am, ați, au plus participiul în -t sau în -s, imperfectul ține obișnuința, iar fără auxiliar nu se mai vede cine a făcut fapta. Fără cratimă, ia este prezentul lui a lua, i-a este perfect compus, la este prepoziție, l-a este pronume plus auxiliar, iar a avea este auxiliar când urmează un participiu, ca în ei au zis.'
      }),
      
      lesson('perfecte', 'Perfectul simplu și mai-mult-ca-perfectul', {
        theory: 'Perfectul simplu este timpul unei acțiuni trecute și încheiate, nu are auxiliar, în povestire face fapta vie, iar în vorbire apare mai ales în Oltenia, pentru o faptă gata de foarte puțin timp. La plural primește grupul -ră, ca în mâncarăm, mâncarăți și mâncară, la verbele în i persoana întâi are doi de i, deci eu venii, iar persoana a treia este veni. Contextul desparte prezentul de perfectul simplu, căci cântă și dansează în fiecare zi este prezent, iar cântă, apoi plecă este perfect simplu, iar verbul se acordă cu subiectul, deci Andrei zise, pentru că Andrei este unul, nu ziseră. Mai-mult-ca-perfectul este fapta terminată înaintea altei fapte trecute și se formează din perfectul simplu cu grupul se, deci gândi plus se dă gândise. Terminațiile sunt -sem, -seși, -se, -serăm, -serăți și -seră, la persoana a treia terminația este -se, iar -sem este pentru persoana întâi. La plural, grupul -ră este norma de azi, deci plecaseră când sunt mai mulți, nu plecase, eu încercasem rămâne la singular, ei încercaseră stă la plural, iar trei prieteni ajutaseră, nu ajutase. O secvență este o bucată de povestire cu o situație, o schimbare și un rezultat, și secvența nu este toată cartea.',
        example: 'Ei mâncară împreună, eu venii la ușă, el veni după mine, iar Andrei zise o vorbă, pentru că subiectul este unul singur. Cântă, apoi plecă povestește fapte încheiate, iar când am intrat, el scrisese deja titlul. Când a ajuns mama, invitații plecaseră, eu încercasem o dată, ei încercaseră de mai multe ori, trei prieteni ajutaseră, iar intrarea, titlul gata și urmarea fac o secvență, nu toată cartea.',
        tryThis: 'Scrie în caiet o secvență cu o situație, o schimbare și un rezultat, în care o faptă stă la perfect simplu, cu grupul -ră, cu eu venii, cu el veni și cu Andrei zise, iar o faptă mai veche stă la mai-mult-ca-perfect, cu -sem, cu -se și cu plecaseră.',
        recap: 'Perfectul simplu este o acțiune trecută și încheiată, fără auxiliar, vie în povestire și, în vorbire, mai ales în Oltenia, cu grupul -ră la plural, ca în mâncarăm, mâncarăți și mâncară, cu eu venii și el veni, și cu acordul Andrei zise. Mai-mult-ca-perfectul, format din perfectul simplu cu grupul se și cu terminațiile -sem, -seși, -se, -serăm, -serăți și -seră, este fapta terminată înaintea altei fapte trecute, la plural cu -ră, ca în plecaseră, încercaseră și ajutaseră, iar o secvență are o situație, o schimbare și un rezultat.'
      }),
      
      
      lesson('viitor-banda', 'Viitorul și timpurile compuse', {
        theory: 'Viitorul este timpul unei acțiuni de după momentul vorbirii, luată ca sigură, iar forma standard se face cu auxiliarul de la a vrea și cu infinitivul, ca în voi merge, voi veni, vei apărea, va fugi, vom dormi, veți dori și vor îndrăgi. Scrii va apărea, nu va apare, va fi, nu va fii și nu v-a fii, voi ieși, nu voi ieșii, voi citi, fără un i în plus, veți, nu ve-ți, și veți ști, nu veți știi. Forma v-a fi amestecă perfectul cu viitorul, pentru că atunci când v-a întrebat timpul este trecut, iar când va întreba timpul este viitor. Viitorul din vorbire este forma cu a avea și cu să, ca în am să merg, ai să visezi, o să merg și o să rămână, iar o să rămâie nu se scrie. Viitorul anterior este alt timp, voi fi plus participiu, ca în voi fi venit și voi fi vorbit, și înseamnă că fapta va fi gata înaintea altui moment din viitor, iar timpurile compuse ale indicativului sunt formate din mai multe cuvinte, viitorul nu este singurul, pentru că perfectul compus se face cu a avea și participiu, alături de viitorul standard și de viitorul anterior. În banda desenată, casetele stau în ordinea acțiunii.',
        example: 'Mâine voi veni și voi citi capitolul, colegul va apărea la poartă, eu voi ieși înainte, apoi va fi rândul lui, vom dormi după drum, veți dori o pauză, iar ei vor îndrăgi finalul. Am să fiu gata înainte de ora cinci, ai să visezi la drum și o să rămână la plan, iar până atunci voi fi citit capitolul, așa că veți ști răspunsul când va întreba profesorul. Trei casete țin ordinea, privește, apoi cade, apoi ridică.',
        tryThis: 'Scrie în caiet propoziții la viitorul standard cu voi veni, vei apărea, va fugi, vom dormi, veți dori și vor îndrăgi, apoi la viitorul din vorbire cu am să merg și o să rămână, una la viitorul anterior cu voi fi plus participiu, una la perfect compus, cu va fi și veți ști, și așază trei casete de bandă desenată în ordinea acțiunii.',
        recap: 'Viitorul spune o acțiune de după momentul vorbirii, luată ca sigură, cu voi, vei, va, vom, veți, vor plus infinitivul, scrii va apărea, va fi, veți, voi ieși și voi citi, iar în vorbire spui am să sau o să, ca în am să merg, ai să visezi și o să rămână. Compuse sunt perfectul compus, viitorul și viitorul anterior, viitorul anterior este voi fi plus participiu, ca în voi fi venit, iar casetele benzii desenate stau în ordinea acțiunii.'
      }),
      
      lesson('ascultare-activa', 'Ascultarea activă', {
        theory: 'Ascultarea activă este felul în care urmărești interlocutorul până la capăt și nu îl întrerupi. Ca să arăți că ai înțeles, pui o întrebare scurtă sau reformulezi ce a spus. Când repeți un plan spus la viitor, treci persoana întâi la persoana a doua. Astfel, voi citi devine vei citi, iar o să plec devine o să pleci.',
        example: 'Colegul spune că mai întâi voi zbura, apoi o să scriu o carte. Tu aștepți finalul și reformulezi că înțelegi că vei zbura, apoi o să scrii o carte, și întrebi unde vei zbura. Întrebarea vine după ce l-ai ascultat, nu peste cuvintele lui.',
        tryThis: 'Scrie un dialog în care un coleg își spune planul la persoana întâi, cu voi citi și o să plec, iar tu reformulezi la persoana a doua, cu vei citi și o să pleci, și adaugi o întrebare scurtă după ce a terminat.',
        recap: 'Ascultarea activă înseamnă că urmărești interlocutorul până la capăt și nu îl întrerupi, apoi pui o întrebare scurtă sau reformulezi. Când repeți un plan la viitor, persoana întâi devine a doua, deci voi citi trece la vei citi, iar o să plec trece la o să pleci.'
      }),
      
      lesson('banda-desenata', 'Banda desenată și nonverbalul', {
        theory: 'Banda desenată este un text narativ mixt, în care desenul cântărește mai mult decât vorba, și are mai multe cadre, citite în ordine. Bula stă pe fond alb și poate fi rotundă, curbată sau dreptunghiulară, norul ține gândul sau visul, cuvântul care imită un zgomot este o onomatopee, linia frântă arată drumul, chenarul explică, iar coada bulei arată cine vorbește. Nonverbalul din bandă este ceea ce spun fața, poziția corpului, privirea și gestul, fără să fie scris. Banda poate fi inventată de tine sau poate relua o carte, fără să copiezi textul, iar în echipă unul scrie întâmplarea și celălalt o desenează, deci nu este aceeași persoană. La sfârșit spui ce ți-a plăcut și ce ai reținut.',
        example: 'O fată aleargă prin trei cadre, în ordine, lângă pantof scrie poc, iar poc este onomatopee, norul cuprinde gândul oare prind autobuzul, coada de la Stai pleacă de la coleg, o linie frântă arată drumul, iar chenarul explică unde se îndreaptă. Un băiat stă cu umerii lăsați și nu privește spre coleg, iar fără replică se vede că este supărat. Unul a scris scena după o carte, fără să copieze textul, celălalt a desenat-o, iar la sfârșit fiecare spune ce i-a plăcut și ce a reținut.',
        tryThis: 'Scrie în caiet o bandă desenată scurtă, cu trei cadre în ordine, o bulă de vorbire cu coadă, un nor pentru gând, o onomatopee, o linie frântă și un chenar, arată o stare prin umeri, privire și gest, lasă unul să scrie o scenă dintr-o carte fără să copieze textul și pe altul să o deseneze, apoi spune ce ți-a plăcut și ce ai reținut.',
        recap: 'Banda desenată este un text narativ mixt, cu cadre în ordine, bulă pe fond alb, rotundă, curbată sau dreptunghiulară, nor pentru gând sau vis, onomatopee, linie frântă, chenar și coadă care arată cine vorbește. Fața, poziția corpului, privirea și gestul spun ce nu este scris, banda poate fi inventată sau poate relua o carte fără copiere, în echipă unul scrie și altul desenează, iar la sfârșit spui ce ți-a plăcut și ce ai reținut.'
      }),
      
      lesson('forme-narative', 'Formele povestirii și etapele compunerii', {
        theory: 'Formele povestirii sunt felurile în care poate fi spusă o întâmplare: film, desen animat, bandă desenată, text literar sau text nonliterar. Textul nonliterar poate fi relatare, anecdotă sau știre. Pantomima este povestirea spusă doar prin gest, fără cuvinte. Compunerea are trei etape: introducerea pregătește, cuprinsul aduce schimbarea, iar încheierea închide.',
        example: 'Introducerea spune că rămâneam după oră și pregătește scena. Cuprinsul aduce schimbarea, când a sunat alarma, iar încheierea închide întâmplarea, când am ieșit în curte. Aceeași întâmplare poate fi jucată și prin pantomimă, fără vorbe.',
        tryThis: 'Scrie o compunere scurtă cu introducere, cuprins și încheiere despre aceeași întâmplare, apoi arată într-o propoziție cum ar putea fi spusă doar prin gest, ca pantomimă.',
        recap: 'Povestirea poate fi film, desen animat, bandă desenată, text literar sau nonliterar, adică relatare, anecdotă ori știre, iar pantomima o spune doar prin gest, fără cuvinte. Compunerea are introducere, care pregătește, cuprins, care aduce schimbarea, și încheiere, care închide.'
      }),
      lesson('norma-sortare', 'Limbă standard și abatere', {
        theory: 'Limba standard este forma acceptată azi, iar abaterea este forma care nu ține această normă. Forma sunt este standard, iar îs nu este forma de azi. Forma luam este corectă, iar loam nu este. La persoana întâi spui eu plecasem, nu plecaserăm, pentru că grupul -ră este de plural. Forma vei pustii este corectă, fără un i în plus, îngrijesc este forma bună, nu îngrijăsc, iar așază și afișează sunt forme corecte de prezent.',
        example: 'Eu sunt la fereastră, iar în fiecare seară luam caietul de pe masă. Ieri plecasem devreme, vei pustii doar spațiul cerut, iar eu îngrijesc florile. Mama le așază în vază, iar panoul afișează ora.',
        tryThis: 'Scrie câte o propoziție cu sunt, luam, plecasem, vei pustii, îngrijesc, așază și afișează.',
        recap: 'Limba standard este forma acceptată azi, deci spui sunt, nu îs, luam, nu loam, și eu plecasem, nu plecaserăm, pentru că grupul -ră este de plural. Forma vei pustii se scrie fără un i în plus, îngrijesc este forma bună, nu îngrijăsc, iar așază și afișează sunt forme corecte de prezent.'
      }),
      lesson('cratima-le', 'neam, ne-am, le-au', {
        theory: 'Cratima din ne-am și le-au este semnul care desparte pronumele de verb. Cuvântul neam, cu sensul de popor, se scrie într-un cuvânt, fără cratimă. Forma ne-am este altceva și înseamnă noi, ca în noi ne-am dus. Forma le-au leagă pronumele le de auxiliarul au, ca în le-au prețuit, iar leau, lipit, nu se scrie. Forma va fi se scrie cu un singur i, iar va fii are un i în plus și nu este viitorul lui a fi.',
        example: 'Un neam a păstrat poveștile, iar neam stă într-un cuvânt, cu sensul de popor. Ne-am dus acasă înseamnă noi, cu cratimă, iar le-au prețuit amintirile leagă pronumele de auxiliar. Mâine va fi rândul nostru, cu un singur i.',
        tryThis: 'Scrie patru propoziții, una cu neam în sensul de popor, una cu ne-am, una cu le-au și una cu va fi.',
        recap: 'Cuvântul neam, cu sensul de popor, se scrie într-un cuvânt, fără cratimă, iar ne-am și le-au despart pronumele de verb prin cratimă. Forma va fi, viitorul lui a fi, se scrie cu un singur i, iar leau nu se scrie lipit și va fii nu este viitorul lui a fi.'
      }),
      lesson('proiect-taram', 'Proiectul despre tărâmul de poveste', {
        theory: 'Proiectul despre tărâmul de poveste este lucrarea în care arătați cum este văzut un tărâm de poveste în cărți și în filme, la noi și în alte culturi. Lucrați în grupe de 4 sau 5 elevi. Întâi faceți planul, apoi ciorna, apoi revizia, fiecare cu termen. Rolurile sunt cinci: liderul coordonează, administratorul adună materialele, informaticianul caută programe, ilustratorul desenează, iar cronometrul păzește termenele. Lucrarea urmează șapte cerințe: tema este respectată și restrânsă, structura este de carte sau de prezentare, cu capitole sau slide-uri, informațiile vin din mai multe discipline, bibliografia stă la sfârșit, apar desene sau tabele, lucrarea este atractivă, iar lucrarea este originală.',
        example: 'Patru colegi aleg roluri și împart munca despre peisaj și modul de viață, liderul coordonează capitolele, iar cronometrul scrie data ciornei. Planul vine întâi, apoi ciorna și revizia, cu termenul notat. Trei slide-uri, o hartă și o listă de cărți la final țin structura, desenele și bibliografia, iar informațiile din mai multe discipline ajută lucrarea să rămână pe temă, atractivă și originală.',
        tryThis: 'Scrie în caiet planul grupei de 4 sau 5 elevi, cu rolurile de lider, administrator, informatician, ilustrator și cronometru, cu termenele pentru plan, ciornă și revizie, și arată tema, structura, informațiile din mai multe discipline, bibliografia de la sfârșit, desenele sau tabelele și felul atractiv și original.',
        recap: 'Proiectul arată cum este văzut un tărâm de poveste în cărți și filme, la noi și în alte culturi, în grupe de 4 sau 5, cu plan, ciornă și revizie și cu rolurile de lider, administrator, informatician, ilustrator și cronometru. Lucrarea ține cele șapte cerințe: tema restrânsă, structura de carte sau de prezentare, informații din mai multe discipline, bibliografia la sfârșit, desene sau tabele, text atractiv și text original.'
      }),
      
      lesson('recap-poveste', 'Recapitulare: povestirea', {
        theory: 'Recapitularea unității despre povestire este proba în care citești textul din manual și notele de subsol, apoi completezi enunțul întreg, nu doar spațiul gol. Compunerea are trei paragrafe, fiecare de minimum 15 cuvinte, două informații din text, o personificare subliniată și verbe la fiecare timp al indicativului. Dacă nota spune că un stânjen măsura cam 2 metri, iar ceva a crescut cu un stânjen, alegi intervalul dintre 2 și 3 metri, pentru că răspunsul se sprijină pe notă. Fișa de reflecție este textul pe care îl completezi după unitate, la persoana întâi, și spui ce ai aflat, ce folosești la altă disciplină, ce ai descoperit despre tine și ce vrei să afli. Mai spui ce ai învățat, unde îți folosește și la ce te descurci mai bine decât înainte, iar fișele stau în portofoliu.',
        example: 'În notă scrie că un stânjen măsura cam 2 metri, deci o creștere cu un stânjen se alege din intervalul dintre 2 și 3 metri, iar răspunsul se scrie în enunțul întreg. Compunerea ține trei paragrafe, fiecare cu cel puțin 15 cuvinte, cu două informații din text, o personificare subliniată și verbe la fiecare timp al indicativului. Am aflat că imperfectul ține fundalul unei povestiri, îmi folosește când povestesc un film la altă disciplină, iar fișa rămâne în portofoliu.',
        tryThis: 'Scrie în caiet răspunsul întreg la o întrebare care folosește nota despre stânjen, o compunere cu trei paragrafe de minimum 15 cuvinte, cu două informații, o personificare subliniată și verbe la fiecare timp al indicativului, apoi fișa de reflecție la persoana întâi.',
        recap: 'Acum poți citi textul și notele, completa enunțul întreg și scrie o compunere cu trei paragrafe de minimum 15 cuvinte, cu două informații, o personificare subliniată și verbe la fiecare timp al indicativului, alegând intervalul dintre 2 și 3 metri când un stânjen măsoară cam 2 metri. Poți scrie fișa de reflecție la persoana întâi, despre ce ai aflat, ce folosești, ce ai descoperit despre tine, ce vrei să afli și la ce te descurci mai bine, și o pui în portofoliu.'
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
        theory: 'Respectul este felul în care recunoști oricărui om dreptul de a fi el însuși, iar unitatea despre prietenie pornește de aici. În această unitate reiei substantivul, identitatea personală și descrierea. Descoperi articolul, identitatea națională și textul descriptiv. Prepoziția vine mai târziu, după ce știi despre cine se vorbește. Înainte de text notezi numele, rolul, etnia, un portret și un exemplu de articol, și abia apoi citești scrisoarea din manual. Competențele specifice sunt 1.4, 2.4, 3.1, 4.2 și 5.1.',
        example: 'Maria notează înainte de lectură numele, rolul, etnia, un portret scurt și articolul din cuvântul prietena. Abia apoi citește scrisoarea din manual. Așa respectul începe de la omul despre care urmează să citească.',
        tryThis: 'Scrie două propoziții în care spui ce reiei și ce descoperi în unitatea despre prietenie și amintești că prepoziția vine mai târziu.',
        recap: 'Respectul pentru orice om deschide unitatea despre prietenie. Reiei substantivul, identitatea personală și descrierea, descoperi articolul, identitatea națională și textul descriptiv, iar prepoziția vine mai târziu.'
      }),
      lesson('identitate', 'Identitate personală și națională', {
        theory: 'Identitatea personală este ceea ce te arată ca om anume și se vede în nume, rol, naționalitate, religie și etnie. Imaginea de sine este părerea pe care o ai despre tine, iar stima de sine este respectul pentru tine. Identitatea națională este ceea ce împărtășești cu ceilalți: limba, sărbătorile și locurile comune. Prietenia poate lega oameni chiar dacă etnia lor este diferită. Pe 18 decembrie se marchează Ziua Minorităților Naționale.',
        example: 'Mă cheamă Ion, sunt elev și vorbesc româna, iar aceste fapte arată identitatea mea personală. Stima de sine este respectul pe care mi-l port, iar limba și sărbătorile țin de identitatea națională. Pe 18 decembrie îmi amintesc de Ziua Minorităților Naționale.',
        tryThis: 'Scrie două propoziții în care îți prezinți identitatea prin nume, rol și limbă și spui ce înseamnă stima de sine.',
        recap: 'Identitatea personală se vede în nume, rol, naționalitate, religie și etnie, iar stima de sine este respectul pentru tine. Identitatea națională înseamnă limba, sărbătorile și locurile comune, prietenia poate trece peste etnie, iar pe 18 decembrie este Ziua Minorităților Naționale.'
      }),
      lesson('scrisoare-prieten', 'Scrisoarea și cuvântul de azi', {
        theory: 'Scrisoarea Vasile Porojan este textul din manual scris de Vasile Alecsandri, de la Mircești, din anul 1881. Destinatarul este persoana salutată la început, nu neapărat cea despre care se povestește. O afirmație despre text poate fi sigură, probabilă sau imposibilă, iar afirmația că scrisoarea îi este adresată celui povestit este imposibilă. Cuvântul vechi țigan este înlocuit azi cu rom. Lunile se scriu cu literă mică, așa că scrii septembrie.',
        example: 'În septembrie recitesc scrisoarea Vasile Porojan, scrisă de Vasile Alecsandri la Mircești, în 1881. Ea salută un prieten și povestește despre un rom, iar destinatarul rămâne cel din salut. Luna stă cu literă mică, cum se scrie orice lună.',
        tryThis: 'Scrie două propoziții în care spui cine a scris scrisoarea Vasile Porojan, din ce loc și din ce an, și explici cine este destinatarul.',
        recap: 'Scrisoarea Vasile Porojan, de Vasile Alecsandri, pleacă din Mircești, în 1881, iar destinatarul este cel salutat, nu neapărat cel despre care se povestește. O afirmație poate fi sigură, probabilă sau imposibilă, cuvântul de azi este rom, iar lunile se scriu cu literă mică.'
      }),
      lesson('proiect-romi', 'Proiectul despre o comunitate', {
        theory: 'Proiectul despre o comunitate este o broșură sau o prezentare, făcută de unul singur sau în echipă. Tema este viața unei comunități înainte și după o schimbare mare, iar faptele se verifică în surse. Cauți în manuale și în enciclopedii și poți vorbi cu oameni din comunitate. Un cuvânt nou, de pildă din limba romani, stă lângă înțelesul lui și nu rămâne singur pe pagină. Poți avea trei capitole, despre familie, despre sărbătoare și despre o personalitate, iar la sfârșit scrii sursele.',
        example: 'Echipa face o broșură despre viața comunității înainte și după o schimbare mare, cu capitole despre familie, sărbătoare și o personalitate. Lângă un cuvânt din limba romani este scris înțelesul lui. La sfârșit apar manualele și enciclopedia din care au fost verificate faptele.',
        tryThis: 'Scrie două propoziții în care îți alegi forma proiectului, spui ce surse vei folosi și unde așezi înțelesul cuvântului nou.',
        recap: 'Proiectul este o broșură sau o prezentare, făcută singur sau în echipă, despre viața unei comunități înainte și după o schimbare mare. Informațiile se verifică în manuale, enciclopedii sau la oameni din comunitate, cuvântul nou stă lângă înțeles, iar la sfârșit scrii sursele.'
      }),
      lesson('inferente', 'Explicativ, descriptiv, deducție, real și aparență', {
        theory: 'Secvența explicativă este partea de text care spune de ce sau cum se întâmplă ceva, iar secvența descriptivă este partea care spune cum arată o ființă, un loc sau un lucru. Inferența este concluzia pe care o tragi dintr-un indiciu și la care te oprești, fără să inventezi ce textul nu spune. Prietenia reală stă pe vorbă directă, pe loialitate și pe respect. Pe internet, profilul poate să nu fie omul, iar aparența de pe ecran nu este omul întreg. ID-ul este numele de utilizator și nu este, de la sine, numele real. Forumul este locul unde se adună mesaje, iar chatul este o vorbă scurtă, spusă pe loc.',
        example: 'Pe chat, Andrei primește o vorbă scurtă, spusă pe loc, iar pe forum găsește mai multe mesaje adunate. Profilul pare vesel, dar indiciul nu arată dacă omul este chiar așa, iar ID-ul nu este numele real. Prietenia reală se cunoaște după vorba directă, după loialitate și după respect.',
        tryThis: 'Scrie două propoziții în care explici diferența dintre forum și chat și arăți că ID-ul nu este numele real al omului.',
        recap: 'Secvența explicativă spune de ce sau cum, secvența descriptivă spune cum arată, iar inferența se oprește la indiciu. Prietenia reală stă pe vorbă directă, loialitate și respect, iar pe internet profilul și ID-ul nu dovedesc cine scrie.'
      }),
      lesson('portret-prieten', 'Portretul prietenului', {
        theory: 'Portretul prietenului este textul care îl arată pe un om apropiat, cu plan, cu ciornă și cu formă finală. Planul cuprinde numele, prenumele, porecla, rolul, cum arată, ce îi place, unde vă întâlniți și despre ce vorbiți. Scrii o ciornă, o schimbi cu un coleg și asculți o sugestie. Textul final are un enunț scurt și trei paragrafe: înfățișarea, ce faceți împreună și de ce contează prietenia. Lângă substantiv pui un atribut, adică un cuvânt care îl lămurește, ca în grupul prieten loial.',
        example: 'În plan scriu că Andrei este colegul meu, că porecla lui este Andi, că are părul scurt și că ne vedem în curtea școlii, unde vorbim despre fotbal. Enunțul scurt spune că Andrei este prietenul meu loial, iar loial este atributul de lângă substantiv. Cele trei paragrafe vorbesc despre înfățișare, despre ce facem împreună și despre de ce contează prietenia.',
        tryThis: 'Scrie două propoziții în care notezi planul portretului unui prieten, cu nume, rol, înfățișare și locul întâlnirii, și pui un atribut lângă un substantiv.',
        recap: 'Portretul prietenului începe cu un plan, trece printr-o ciornă schimbată cu un coleg și ajunge la un enunț scurt plus trei paragrafe. Atributul stă lângă substantiv și îl lămurește, ca în prieten loial.'
      }),
      lesson('explicativ', 'Textul explicativ și limba standard', {
        theory: 'Textul explicativ este textul care îl învață pe cititor ceva, pus în ordine, pe înțelesul oricui, iar limba standard este forma pe care o înțelege și cine nu face parte din grupul tău. Are patru mișcări mari: anunți subiectul, de pildă cu formula în această prezentare voi vorbi despre, apoi spui două sau trei aspecte, le dezvolți cu o comparație sau cu un exemplu și închei pe scurt, cu o reflecție sau cu o invitație. Pașii scrierii sunt ideile, planul și textul. Pe internet, limba standard este un semn de respect pentru cititor: nu înlocuiești că și ce cu k sau cu sh, pui articolul întreg, ca în copilul, nu ca în copilu, scrii cuvântul întreg, cineva, nu cnv, iar cratima stă la locul ei, ca în dă-mi, nu lipită ca în dămi. Forma voi scrieți este un singur cuvânt, iar voi scrie-ți mută cratima unde nu are loc, secundele în plus, folosite ca să scrii corect, îl respectă pe cititor, iar emoticonul este semnul care poate arăta fața, gestul sau emoția.',
        example: 'În această prezentare voi vorbi despre cum se leagă o prietenie adevărată, două aspecte sunt vorba sinceră și timpul petrecut împreună, iar exemplul este o întâlnire în care ascultați pe rând. Încheierea îl invită pe cititor să spună ce prețuiește la un prieten. Îi scriu colegului că vin și îl întreb ce facem, adaug dă-mi caietul, voi scrieți tema împreună, cineva poate pune un emoticon care arată un zâmbet, iar articolul stă lipit, ca în copilul.',
        tryThis: 'Scrie în caiet un text scurt în care anunți subiectul, numești două aspecte, dai un exemplu și închei cu o reflecție, apoi un mesaj pe internet cu cuvinte întregi, cu articol, cu cratima la locul ei și cu ce arată emoticonul ales.',
        recap: 'Textul explicativ îl învață pe cititor ceva, în ordine, cu subiect, două sau trei aspecte, o comparație sau un exemplu și o încheiere, iar pașii sunt idei, plan și text, în limba standard. Pe internet scrii cuvinte întregi, cu articolul și cu cratima la locul lor, voi scrieți rămâne un singur cuvânt, secundele în plus îl respectă pe cititor, iar emoticonul poate arăta fața, gestul sau emoția.'
      }),
      
      lesson('substantiv', 'Substantivul și pluralul', {
        theory: 'Substantivul este cuvântul flexibil care numește persoane, ființe, lucruri, locuri sau idei, are gen și număr și poate primi un articol. Substantivul comun numește o clasă întreagă, ca băiat sau cățel, substantivul propriu numește un exemplar anume și ia majusculă, ca Andrei sau Max, lunile stau cu literă mică, deci scrii septembrie, iar după numele pe care îl strigi pui virgulă. Cuvântul bunătate este substantiv, iar cuvântul vesel este adjectiv, masculinul se vede în un băiat și doi băieți, femininul în o fată, iar neutrul în un dulap și două dulapuri. Pluralul este forma care arată mai multe exemplare și se marchează prin sunete, ca în casă și case, iar în dicționar substantivul stă la singular: pentru pomi cauți pom, pentru lalele cauți lalea, pentru creioane cauți creion, pentru injecții cauți injecție, iar pentru mătuși cauți mătușă. Forma recomandată este sandviciuri, nu sendvișuri, ghiozdane, nu ghiozdanuri, ciocolate, nu ciocolăți, chibrituri, nu chibrite, și aragaze, nu aragazuri. De la acoperiș faci acoperișuri, nu acoperișe, iar genitivul, care arată ale cui sunt, este acoperișurilor. Cu articol hotărât scrii aripile, nu aripele, și ferestrele, nu o formă cu un r în plus, iar când ochii sunt cei știuți de toți scrii ochii, pe când forma ochi, fără articol, este nehotărâtă.',
        example: 'Andrei, vino să vezi un băiat și o fată lângă un dulap, iar în septembrie vorbim despre bunătate, doi băieți au două dulapuri, iar cățelul Max stă lângă ei. În trei ghiozdane stau sandviciuri, ciocolate și o cutie de chibrituri, iar în bucătărie sunt aragaze. Acoperișurile casei sunt înalte, aripile par albe lângă ferestrele luminate, iar ferestrele acestea par ochii unei case.',
        tryThis: 'Scrie în caiet două propoziții cu un substantiv comun, un substantiv propriu, luna septembrie și un nume strigat, apoi folosește ghiozdane, sandviciuri, chibrituri, acoperișuri, aripile, ferestrele și ochii și spune ce formă de dicționar cauți pentru pomi.',
        recap: 'Substantivul numește persoane, ființe, lucruri, locuri sau idei, se schimbă după gen și număr, comunul numește o clasă, propriul ia majusculă, luna stă cu literă mică, iar pluralul se marchează prin sunete și în dicționar stă la singular. Formele recomandate sunt sandviciuri, ghiozdane, ciocolate, chibrituri, aragaze, acoperișuri, cu genitivul acoperișurilor, aripile, ferestrele și ochii când sunt cei știuți.'
      }),
      
      lesson('articol-prepozitie', 'Articolul și scrierea lui', {
        theory: 'Articolul este cuvântul care arată cât de cunoscut este obiectul numit de substantiv, iar această lămurire se numește determinare. Articolul nehotărât stă în față și arată că obiectul este puțin cunoscut, cu formele un, o, niște, unui și unor, iar articolul hotărât se lipește de substantiv și arată că obiectul este bine cunoscut. La masculin singular pui -ul, ca în băiatul, la feminin singular pui -a, ca în fata, la plural feminin pui -le, ca în mingile, nu mingiile și nu mingiei, iar la plural hotărât mai spui copiii. Lângă niște, doi sau multe nu pui articolul din coadă, deci scrii niște copii și doi băieți, expresia toți copiii are și forma de plural, și articolul hotărât, iar la genitiv, când spui al cui este lucrul, scrii Florinei, nu lui Florina. În dicționar, inclusiv în DEX, substantivul nu are articol, deci cauți prieten, nu prietenul, și orășel, nu orășelul. Prepoziția, care leagă cuvintele fără să numească pe cineva sau ceva, vine în lecția următoare.',
        example: 'Un prieten ajută atunci când încă nu știi bine cine este el, iar prietenul meu ajută pentru că îl cunoaștem amândoi. Un copil aduce mingea, doi copii o pasează, toți copiii o țin pe teren, mingile stau în plasă, iar Florinei i-am scris despre joc. În DEX caut orășel, fără articolul de la final.',
        tryThis: 'Scrie în caiet două propoziții în care același substantiv apare o dată cu articol nehotărât și o dată cu articol hotărât, folosești niște copii și toți copiii, pui numele Florina la genitiv și spui ce cauți în DEX.',
        recap: 'Articolul arată cât de cunoscut este obiectul, nehotărâtul stă în față, cu un, o, niște, unui și unor, iar hotărâtul se lipește, cu -ul, -a sau -le, ca în băiatul, fata, mingile și copiii. Lângă niște, doi sau multe nu pui articolul din coadă, toți copiii îl are, genitivul lui Florina este Florinei, în dicționar cauți substantivul fără articol, iar prepoziția vine în lecția următoare.'
      }),
      
      lesson('atribut-substantiv', 'Substantivul și atributul', {
        theory: 'Atributul este cuvântul care stă lângă substantiv și îl lămurește. Poate fi un adjectiv, ca în prieten bun, un grup cu prepoziție și un nume, ca în prieten de ieri, sau un pronume, ca în prietenul lui. Substantivul este centrul grupului, pentru că el numește despre cine sau despre ce este vorba. Într-un început de compunere pui cel puțin două astfel de grupuri.',
        example: 'Două fantome simpatice intră în casă, iar prietenul de ieri râde în prag. Cuvântul fantome este centrul, simpatice este atributul adjectiv, iar de ieri este atributul cu prepoziție. În grupul prietenul lui, substantivul rămâne centrul, iar lui este atributul pronume.',
        tryThis: 'Scrie două propoziții pentru începutul unei compuneri, iar în fiecare pune un grup în care substantivul este centrul și atributul îl lămurește.',
        recap: 'Atributul este cuvântul care îl lămurește pe substantiv, iar substantivul este centrul grupului. Atributul poate fi adjectiv, grup cu prepoziție sau pronume, iar la începutul compunerii pui cel puțin două astfel de grupuri.'
      }),
      
      lesson('prepozitie', 'Prepoziția în limba de azi', {
        theory: 'Prepoziția este partea de vorbire neflexibilă, adică nu are număr, timp sau persoană și nu se schimbă, stă înaintea unui substantiv sau a unui pronume și îl leagă de alt termen din propoziție, nu înaintea predicatului. Râd de tine înseamnă că îți bați joc, iar râd cu tine înseamnă că râdeți împreună, iar fără prepoziție, gătesc regina înseamnă că regina ajunge în oală, pe când gătesc cu regina înseamnă că gătiți amândoi. Prepoziția în limba de azi este forma recomandată, aleasă după înțeles, nu după o rostire veche sau regională. La comparație scrii mai mari decât, iar după se scrie cu ă, nu dupe, la instrument scrii la, ca în cânți la vioară, ești interesat de cineva, viteza se spune pe oră, pleci la drum și ești responsabil de curățenie. Pentru o soluție folosești pentru, sună la telefon și spui la final de oră, nu pe final, iar formele vechi sau regionale cătră, pi ici și dă pă devin către, pe aici și de pe. Nu te lua după mine înseamnă să nu copiezi pe cineva, iar ia câinele de pe mine înseamnă să îl dai jos.',
        example: 'Abia aștept să râd cu tine după oră și gătesc cu regina o supă, apoi pun cartea pe bancă. Sună-mă la telefon la final de oră dacă ești interesat de proiect, pleacă la drum, cântă la vioară, caută o soluție pentru temă și fii responsabil de curățenie, fiindcă sunteți mai mari decât noi. S-a ascuns după sobă, a venit către noi pe aici, viteza se spune pe oră, iar eu i-am spus să nu se ia după mine și să ia câinele de pe mine.',
        tryThis: 'Scrie în caiet două propoziții în care o prepoziție leagă verbul de un pronume sau de un substantiv, cu sensul că faceți lucrul împreună, apoi două propoziții în limba de azi cu la vioară, la final de oră, după, către și de pe.',
        recap: 'Prepoziția este neflexibilă, stă înaintea unui substantiv sau a unui pronume și îl leagă de alt termen, iar cuvintele de și cu nu spun același lucru. În limba de azi alegi prepoziția după înțeles, mai mari decât, după, la vioară, la drum, pe oră, responsabil de, pentru, la telefon și la final de oră, iar cătră, pi ici și dă pă devin către, pe aici și de pe.'
      }),
      
      lesson('prejudecati', 'Prejudecăți și încheierea unității', {
        theory: 'Prejudecata este o părere gata făcută, pusă înainte de om și înainte de text, iar lectura o verifică. Prietenia este prețuită în cărți, în filme și în teatru, principiile care rămân sunt loialitatea, acceptarea celuilalt așa cum este, sinceritatea și încrederea, iar în povești prietenia poate lega ființe foarte diferite. O observație din carte, cum este faptul că doi se ajută, poate deveni prietenie, pe când o părere despre toți cei dintr-un sat, spusă înainte de text, rămâne prejudecată. Zilele, lunile, popoarele și disciplinele stau cu literă mică, în afară de primul cuvânt al enunțului și de numele unei sărbători, deci Marți mă întâlnesc este corect, ne vedem marți la matematică ține ambele cuvinte cu literă mică, iar 1 Decembrie rămâne nume de sărbătoare. Jocul are de la 80 până la 100 de cuvinte, cu cel puțin trei prepoziții subliniate și cu regulile. Fișa de reflecție se scrie la persoana I, spune ce ai aflat, ce folosești în altă disciplină, ce ai descoperit despre tine și ce vrei să afli, intră în portofoliu lângă cele din unitățile dinainte, iar o faptă concretă poate fi că ID-ul nu este numele real sau că alegi prepoziția mai atent decât în unitatea despre povestire.',
        example: 'În carte, cei doi se ajută, deși sunt foarte diferiți, iar loialitatea, acceptarea, sinceritatea și încrederea se văd în fapta lor. Marți mă întâlnesc cu prietenii, ne vedem marți la matematică, iar 1 Decembrie rămâne scris ca sărbătoare. Am aflat că ID-ul nu este numele real, aleg prepoziția mai atent decât în unitatea despre povestire, iar fișa rămâne în portofoliu.',
        tryThis: 'Scrie în caiet o observație dintr-o poveste despre prietenie și principiul care se vede, un joc de la 80 până la 100 de cuvinte cu cel puțin trei prepoziții subliniate și cu regulile, apoi patru propoziții la persoana I pentru fișa de reflecție.',
        recap: 'Acum poți verifica o prejudecată prin lectură, recunoaște loialitatea, acceptarea, sinceritatea și încrederea și scrie zilele, lunile, popoarele și disciplinele cu literă mică, afară de primul cuvânt și de sărbătoarea 1 Decembrie. Poți alcătui un joc de la 80 până la 100 de cuvinte, cu reguli și cu cel puțin trei prepoziții subliniate, și poți pune în portofoliu fișa la persoana I, inclusiv faptul că ID-ul nu este numele real.'
      }),
      lesson('carti-prietenie', 'Cărți în care prietenia trece peste diferență', {
        theory: 'Cărțile recomandate de manual sunt lecturi în care prietenia trece peste diferență, iar tu le cauți și le citești. Poți începe cu Epopeea lui Ghilgameș, cu Iliada, cu Muzicanții din Bremen, de frații Grimm, și cu Vrăjitorul din Oz, de Lyman Frank Baum. Mai sunt Cei trei muschetari, de Alexandre Dumas, Tom Sawyer și Huckleberry Finn, de Mark Twain, și Cireșarii, de Constantin Chiriță. Alegi o carte și spui un motiv, fără să povestești capitolul. Titlul și autorul ajung ca recomandare, iar colegul poate alege alt titlu.',
        example: 'Vreau Cireșarii, de Constantin Chiriță, pentru că este o echipă în care prietenia trece peste diferență. Nu povestesc capitolul, ci spun doar de ce am ales cartea. Colegul poate alege Muzicanții din Bremen, de frații Grimm, dacă titlul și autorul îi sunt de ajuns.',
        tryThis: 'Scrie două propoziții în care recomanzi o carte din lista manualului, cu titlul și autorul, și spui de ce prietenia din ea trece peste diferență.',
        recap: 'Manualul te trimite la cărți în care prietenia trece peste diferență, de la Epopeea lui Ghilgameș și Iliada până la Cireșarii, de Constantin Chiriță. Pentru recomandare ajung titlul, autorul și un motiv, fără povestea capitolului.'
      }),
      lesson('scrisoare-veche', 'Scrisoarea veche și locuitorii', {
        theory: 'Scrisoarea veche este mesajul care își arată anul și prin forma cuvintelor, nu doar prin dată. Ieși este grafia de atunci pentru Iași, bădie este un cuvânt de respect pentru cineva mai în vârstă, iar lângă o despărțire scârba poate fi mâhnire, nu silă, pentru că sensul se alege din context. Luna se scrie decembrie, data din lecție este decembrie 1877, când mesajul a mers pe hârtie, sărbătoarea rămâne 1 Decembrie, iar scrisoarea sau e-mailul către un prieten plecat are minimum 60 de cuvinte și destinatarul primește un cuvânt de respect. Numele locuitorilor sunt substantive comune, care numesc un grup de oameni și se scriu cu literă mică. Articolul nehotărât stă în față, ca în niște moldoveni, iar articolul hotărât se lipește, ca în moldovenii, și la fel se scriu munteni și muntenii, olteni, bănățeni, maramureșeni, dobrogeni și transilvăneni. Nu judeci o regiune dintr-o singură părere auzită.',
        example: 'Data scrisorii este decembrie 1877, mesajul a mers pe hârtie către cineva mai în vârstă, numit cu respect bădie, Ieși arată grafia de atunci pentru Iași, iar lângă despărțire scârba se citește ca mâhnire. O scrisoare nouă către prietenul plecat are cel puțin 60 de cuvinte. Niște olteni au venit în vizită, iar oltenii ne-au povestit despre Craiova, ambele forme cu literă mică.',
        tryThis: 'Scrie în caiet două propoziții în care explici data decembrie 1877, cuvântul bădie și sensul de mâhnire al lui scârbă lângă o despărțire, apoi folosești niște moldoveni, moldovenii și încă un nume de locuitori scris cu literă mică.',
        recap: 'O scrisoare veche își arată anul și în forma cuvintelor, ca în decembrie 1877, cu Ieși pentru Iași și cu bădie ca respect, contextul alege sensul lui scârbă, sărbătoarea rămâne 1 Decembrie, iar scrisoarea către prietenul plecat are minimum 60 de cuvinte. Numele locuitorilor sunt substantive comune, cu literă mică, articolul nehotărât stă în față, articolul hotărât se lipește, ca în moldoveni și moldovenii, iar o regiune nu se judecă dintr-o singură părere auzită.'
      }),
      
      lesson('telefon-scrisoare', 'Mesajul de pe telefon și scrisoarea', {
        theory: 'Mesajul de pe telefon este un text care ajunge repede și poate fi scurt. Se poate pierde între notificări și pleacă uneori înainte să îl recitești. Scrisoarea este mai lentă, dar rămâne o pagină și îți lasă timp să tai o propoziție, deși ajunge mai târziu. La evaluare scrii două avantaje și două dezavantaje, nu doar că un canal este mai bun.',
        example: 'Două avantaje pot fi că mesajul de pe telefon ajunge în aceeași zi și că scrisoarea îți lasă timp să tai o propoziție. Două dezavantaje pot fi că un deget trimite mesajul prea devreme și că scrisoarea ajunge mai târziu. Așa comparația are perechi, nu rămâne doar la ideea că un canal este mai bun.',
        tryThis: 'Scrie patru propoziții în care prezinți două avantaje și două dezavantaje, punând mesajul de pe telefon lângă scrisoare.',
        recap: 'Mesajul de pe telefon ajunge repede și poate fi scurt, dar se poate pierde între notificări sau pleca înainte de recitire. Scrisoarea este mai lentă și rămâne o pagină, iar la evaluare scrii două avantaje și două dezavantaje.'
      }),
      
      
      
    ]
  },
  {
    id: 'natura',
    title: 'Omul, parte din natură',
    inOwnWords:
      'Unitatea 5 leagă emoția față de natură de adjectiv, cu acord și grade, și de textul descriptiv, literar sau nonliterar. Comparația e lucrată pe Cioara, de George Topîrceanu. Recapitularea prezice pe fragmente, în Cioc! Cioc! Cioc!, de Emil Gârleanu. Evaluarea pune biologia într-o poveste.',
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
      { term: 'text descriptiv', meaning: 'Arată cum este ceva, nu ce se întâmplă mai departe.' },
      { term: 'câmp lexical', meaning: 'Cuvinte care țin de aceeași temă: pădure, anotimp, pasăre.' },
      { term: 'comparație', meaning: 'Doi termeni cu o trăsătură comună, legați prin ca, precum sau decât.' },
      { term: 'inferență', meaning: 'Ce deduci dintr-un indiciu, fără o faptă pe care textul n-o dă.' }
    ],
    lessons: [
      lesson('emotie-adjectiv', 'Emoția, adjectivul, acordul', {
        theory: 'Adjectivul este cuvântul care arată însușirea unui substantiv și se acordă cu el în gen și în număr. După o descriere notezi ce ai văzut, ce ai auzit și ce ai simțit. Se spune frunze verzui, ghiocei argintii, nori cenușii, străzi pustii și nori întunecați, iar verzuie rămâne doar pentru feminin singular. După niște stă pluralul fără articol, ca în niște codri, iar la strigare spui dragele mele. De la pasăre, cu sufixul -esc, faci păsăresc, iar antonimul se acordă și el, ca în frunze albe.',
        example: 'Mici frunze verzui se văd lângă ghiocei argintii, sub nori cenușii și sub nori întunecați. Dragele mele păsări, vă văd și vă aud pe străzi pustii, lângă niște codri, și simt un sunet păsăresc. Frunzele albe, antonimul, se acordă la fel, pentru că și ele iau genul și numărul substantivului.',
        tryThis: 'Scrie două propoziții în care adjectivul se acordă cu substantivul, folosind frunze verzui și niște codri, și mai pui adjectivul păsăresc.',
        recap: 'Adjectivul se acordă în gen și în număr cu substantivul, iar după descriere notezi ce ai văzut, auzit și simțit. După niște stă pluralul fără articol, la strigare spui dragele mele, iar de la pasăre faci păsăresc.'
      }),
      lesson('grade', 'Gradele de comparație', {
        theory: 'Gradele de comparație sunt formele adjectivului care arată cât de intensă este o însușire, singură sau față de altceva. Pozitivul nu compară, ca în râul este lat. Comparativul de superioritate este mai lat decât, cel de egalitate este la fel de lat ca, iar cel de inferioritate este mai puțin lat decât. Superlativul relativ este cel mai lat dintre, pentru că alege dintr-un grup, iar superlativul absolut, fără grup, este foarte lat. În reclamă pui gradul potrivit, nu în fiecare rând, și nu le amesteci în forma cel mai foarte bătrân.',
        example: 'Râul este lat, fără comparație, iar un alt râu este la fel de lat ca el. Mesteacănul este mai bătrân decât tufișul și mai puțin lat decât stejarul. Cel mai bătrân dintre copaci alege din grup, iar foarte bătrân stă singur, fără grup.',
        tryThis: 'Scrie trei propoziții în care același adjectiv apare la comparativ de superioritate, la superlativ relativ și la superlativ absolut.',
        recap: 'Pozitivul nu compară, superioritatea se spune mai lat decât, egalitatea la fel de lat ca, iar inferioritatea mai puțin lat decât. Superlativul relativ este cel mai lat dintre, superlativul absolut este foarte lat, fără grup, iar în reclamă gradul se pune potrivit, nu în fiecare rând.'
      }),
      lesson('descriptiv', 'Text descriptiv, inferențe, comparația', {
        theory: 'Descrierea literară este textul care te pune să vezi, să auzi și să simți, iar lumea imaginară doar seamănă cu una reală. Descrierea nonliterară este textul care informează, cu termeni exacți. Scopul unei descrieri este să emoționeze sau să informeze, iar inferența este concluzia oprită la indiciu. Albul este suma culorilor. Comparația, legată prin cuvântul ca, urmează mai departe în unitate.',
        example: 'Frunze galbene și vânt rece susțin toamna, fără să numească o lună anume. Pădurea ține liniștea în brațe, iar imaginea emoționează, pentru că seamănă cu o lume reală. Propoziția despre frunza stejarului, care este lobată, poate sta pe un panou, fiindcă informează cu un termen exact.',
        tryThis: 'Scrie două propoziții în care una descrie un peisaj ca să emoționeze, iar cealaltă informează cu un termen exact.',
        recap: 'Descrierea literară seamănă cu realitatea și te pune să vezi, să auzi și să simți, iar descrierea nonliterară informează cu termeni exacți. Inferența se oprește la indiciu, albul este suma culorilor, iar comparația cu ca urmează.'
      }),
      lesson('camp-lexical', 'Câmpul lexical și tema', {
        theory: 'Câmpul lexical este grupul de cuvinte din aceeași zonă de înțeles, care țin imaginea laolaltă și arată tema. Tema poate fi un animal, un peisaj sau un fenomen, și se citește din cuvintele textului. La o ghicitoare alegi tema și aduci un cuvânt-cheie: ninsoare și ploaie duc la anotimpuri, iar pentru timp cauți durata. Transcrii două cuvinte și spui dacă sunt substantive, adjective sau verbe. Cuvintele frunză, scoarță și umbră sunt substantive din câmpul pădurii, grupul vântul geme are un verb și poate susține furtuna, iar o farfurie pusă în același rând încurcă tema.',
        example: 'Cuvintele frunză, scoarță și umbră sunt substantive și țin tema pădurii, pentru că fac parte din același câmp lexical. În vântul geme, verbul poate susține furtuna, deci un fenomen. Cuvintele ninsoare și ploaie sunt cuvinte-cheie pentru anotimpuri, iar durata este cuvântul-cheie când tema este timpul.',
        tryThis: 'Scrie două propoziții în care notezi două cuvinte din câmpul lexical al pădurii și spui ce parte de vorbire este fiecare.',
        recap: 'Câmpul lexical este grupul de cuvinte care țin aceeași imagine și arată tema, fie ea animal, peisaj sau fenomen. Aduci un cuvânt-cheie din text și spui dacă este substantiv, adjectiv sau verb.'
      }),
      lesson('descriere-stiintifica', 'Descrierea care informează', {
        theory: 'Descrierea care informează este textul nonliterar făcut din termeni exacți, pe care îi poți verifica. Lângă cioară, manualul dă o notă de studiu și un loc cu densitate mare: Câmpia Bărăganului și împrejurimile Bucureștiului. La portofoliu alegi o pasăre sau un animal din zona ta și scrii un paragraf științific, documentat, bun de pus pe un logo. Adjectivele din notă pot sta la grade diferite, iar tu le numești, de pildă mai isteață decât este comparativ de superioritate. O metaforă nu ajunge pe logo, pentru că acolo stă studiul, nu o imagine inventată.',
        example: 'În Câmpia Bărăganului și în împrejurimile Bucureștiului trăiesc multe ciori, iar informația stă lângă sursa din manual. Mai isteață decât este comparativ de superioritate și poate apărea în nota de studiu, cu gradul numit. Paragraful pentru logo rămâne documentat, cu loc, trăsătură și termen exact.',
        tryThis: 'Scrie un paragraf științific despre o pasăre sau un animal din zona ta, cu locul, o trăsătură exactă și numele gradului de comparație al unui adjectiv.',
        recap: 'Descrierea nonliterară informează cu termeni exacți și se verifică prin loc, trăsătură și sursă. La cioară, locul din manual este Câmpia Bărăganului și împrejurimile Bucureștiului, iar paragraful de logo este documentat.'
      }),
      lesson('comparatie', 'Comparația', {
        theory: 'Comparația este procedeul care alătură doi termeni cu o trăsătură comună. Îi leagă unul dintre cuvintele ca, precum, asemănător cu, întocmai ca sau decât. Tabelul are cinci locuri: primul termen, legătura, al doilea termen, punctul comun și starea, iar punctul comun poate fi culoarea. Poezia din lecție este Cioara, de George Topîrceanu. Personificarea este procedeul care dă unei ființe sau unui lucru o faptă de om și nu are nici cuvântul ca, nici al doilea termen.',
        example: 'Mierla este neagră ca un cărbune ud, deci mierla este primul termen, ca este legătura, cărbunele este al doilea termen, iar culoarea este punctul comun. Starea se notează în al cincilea loc al tabelului. Enunțul în care mierla râde rămâne personificare, pentru că pasărea primește o faptă de om și nu are al doilea termen.',
        tryThis: 'Scrie două propoziții în care una este o comparație cu ca, iar cealaltă este o personificare, și numește termenii comparației.',
        recap: 'Comparația alătură doi termeni cu o trăsătură comună, legați prin ca, precum, asemănător cu, întocmai ca sau decât, iar tabelul are cinci locuri. Poezia este Cioara, de George Topîrceanu, iar personificarea dă o faptă de om și nu se confundă cu comparația.'
      }),
      lesson('portret-fiinta', 'Portretul unei ființe', {
        theory: 'Portretul unei ființe este descrierea care cuprinde ansamblul și detaliile: capul, ochii, ciocul sau botul, aripile, mediul, o abilitate și legătura cu omul. Prin ochii unei frunze sau ai unei case scrii minimum trei paragrafe. La o plantă, primul paragraf este real, cu minimum două grupuri de substantiv plus adjectiv, iar al doilea paragraf este de basm. După acestea vin locul, detaliul și legătura cu tine.',
        example: 'Ciocul subțire caută în scoarța aspră, iar acestea sunt două grupuri de substantiv și adjectiv în paragraful realist. Ciocul ca un ac de aur deschide ușa, și astfel începe paragraful de basm. Urmează locul, detaliul și legătura cu tine, în minimum trei paragrafe.',
        tryThis: 'Scrie începutul portretului unei plante, cu un paragraf realist în care sunt două grupuri de substantiv și adjectiv și cu o propoziție de basm.',
        recap: 'Portretul unei ființe are ansamblul și detaliile, mediul, o abilitate și legătura cu omul. Scrii minimum trei paragrafe, iar în cel realist pui minimum două grupuri de substantiv plus adjectiv, înainte de paragraful de basm.'
      }),
      lesson('carti-pasari', 'Două texte despre ciori', {
        theory: 'Confirmarea și infirmarea sunt felul în care spui dacă un text susține sau nu o informație din nota despre ciori. Cele două texte stau lângă această notă: Cioara și ulciorul este de Esop, iar Corbul și vulpea este de Jean de La Fontaine. Formula este textul confirmă sau textul infirmă, deoarece, și un singur motiv ajunge. Nu repovestești fabula și nu descrii ulciorul.',
        example: 'Textul lui Esop confirmă o pasăre care găsește o soluție, deoarece pasărea iese din încurcătură. La Jean de La Fontaine spui la fel de scurt dacă textul confirmă sau infirmă, tot cu deoarece. Un singur motiv ajunge, fără povestea ulciorului.',
        tryThis: 'Scrie două propoziții, câte una pentru Esop și pentru Jean de La Fontaine, în care spui dacă textul confirmă sau infirmă o informație și legi motivul prin deoarece.',
        recap: 'Cioara și ulciorul este de Esop, iar Corbul și vulpea este de Jean de La Fontaine. Spui dacă textul confirmă sau infirmă, cu deoarece și cu un singur motiv, fără să repovestești fabula.'
      }),
      lesson('afis-tombola', 'Afișul pentru tombolă', {
        theory: 'Afișul pentru tombola de Crăciun este pagina care anunță vânzarea unor obiecte donate, pentru copii cu note bune. El cuprinde substantiv și atribut, informație adevărată, o povestire scurtă, grade fără exces, o comparație și o personificare. Mai cuprinde trei enunțuri: o informație, o întrebare și o poruncă. Etapa A strânge ideile, etapa B fixează planul și locul, iar etapa C scrie pagina. Informația rămâne adevărată, iar o însușire nu se mărește doar ca să crească prețul.',
        example: 'Stiloul albastru scrie fin și povestește, într-o propoziție, cum a ajuns donat la tombolă, iar albastru este atributul. Întrebarea „Vrei un scris ca o linie liniștită” compară și cheamă la răspuns, fără un grad în fiecare rând. Cumpără-l azi este porunca, iar pagina cu aceste enunțuri se scrie la etapa C.',
        tryThis: 'Scrie trei enunțuri pentru afișul tombolei de Crăciun: o informație adevărată cu substantiv și atribut, o întrebare care conține o comparație și o poruncă.',
        recap: 'Afișul tombolei de Crăciun vinde obiecte donate pentru copii cu note bune și ține informația adevărată. Are substantiv și atribut, o povestire, grade cu măsură, comparație, personificare, o întrebare și o poruncă, iar pagina se scrie la etapa C, după ce A strânge ideile și B fixează planul.'
      }),
      lesson('recap-natura', 'Recapitulare: natura', {
        theory: 'Recapitularea pe fragmente este lectura în care acoperi bucata următoare și spui ce crezi că urmează, înainte să citești mai departe, iar tabelul are trei coloane: ce crezi că se va întâmpla, dovezile și ce s-a întâmplat. Textul este „Cioc! Cioc! Cioc!”, de Emil Gârleanu, un alt titlu trebuie să acopere tot textul, nu doar o zicală, o zicală nu ține loc de indiciu, de la pasăre faci păsăresc, iar personificarea și comparația se numără separat. Povestea o ajută pe o elevă de clasa a V-a să țină minte biologia și să repete metoda: termenii perișor și stomată țin de biologie, perișorii iau apa, stomata schimbă gazele, personificarea este procedeul care dă plantei o faptă de om, o piesă stricată, adică o pană, ca în țeava s-a spart, nu este personificare, iar fabricile și betonul duc la un oraș cu climă temperată. La sfârșit completezi tabelul de observare a comportamentului și fișa de reflecție, la persoana I, și spui ce ai aflat, ce folosești la altă disciplină, ce ai descoperit despre tine și ce vrei să afli. Fișele intră în portofoliu, lângă cele din unitățile dinainte, iar o faptă din unitate poate fi că fișa informează, iar comparația arată, că la biologie descrii o frunză cu doi termeni exacți și că data viitoare alegi un singur grad.',
        example: 'Scriu întâi că pasărea pare să caute ceva, pentru că se aude un ciocănit, pun ideea în prima coloană, cu dovada, apoi notez ce s-a întâmplat de fapt. Frunza salută răsăritul este personificare, turnul înalt și podul îngust sunt două grupuri pentru spațiul orașului, iar fabricile și betonul duc la o climă temperată, unde perișorii iau apa și stomata schimbă gazele. Am aflat că la biologie descriu o frunză cu doi termeni exacți, data viitoare aleg un singur grad, iar fișa și tabelul rămân în portofoliu.',
        tryThis: 'Scrie în caiet două propoziții în care prezici ce face pasărea din textul lui Emil Gârleanu și spui dovada, apoi una în care dai plantei o faptă de om și descrii orașul cu climă temperată, și patru propoziții la persoana I pentru fișă.',
        recap: 'Acum poți citi pe fragmente textul „Cioc! Cioc! Cioc!”, de Emil Gârleanu, prezice și verifica în tabel, acoperi tot textul cu titlul și forma păsăresc și despărți personificarea de comparație. Poți ține minte că perișorii iau apa, stomata schimbă gazele și că fabricile și betonul duc la un oraș cu climă temperată, apoi pui în portofoliu fișa la persoana I și tabelul de observare.'
      }),
      
      
      
    ]
  },
  {
    id: 'trepte',
    title: 'Trepte în viață',
    inOwnWords:
      'Unitatea 6 urcă pe trepte: emoții, voce, sat, numeral, apoi școala veche din Amintiri din copilărie, de Ion Creangă. Cuvintele se schimbă în timp. Evaluarea compară școala privată cu Școală după școală.',
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
      { term: 'numeral ordinal', meaning: 'Spune al câtelea: primul, al doilea, a doua.' },
      { term: 'paraverbal', meaning: 'Cum spui: ton, ritm, pauză, tărie. Nu e cuvântul, nu e gestul.' },
      { term: 'nonverbal', meaning: 'Ce se vede: gest, față, poziția corpului.' },
      { term: 'patrimoniu', meaning: 'Obiceiuri, locuri și obiecte păstrate de la o generație la alta.' },
      { term: 'învechit', meaning: 'Formă sau sens care nu se mai folosește. În dicționar stă (Înv.).' },
      { term: 'dascăl', meaning: 'Și învățător, și cântăreț de biserică. Cuvântul a rămas din școala de lângă biserică.' }
    ],
    lessons: [
      lesson('deschidere-trepte', 'Ce vei descoperi în unitate', {
        theory: 'Deschiderea unității este locul în care vezi ce reiei și ce descoperi, înainte să citești textele. Unitatea are cinci competențe specifice: 1.2, 2.5, 3.2, 4.4 și 5.2. Reiei substantivul, școala și descrierea, iar acum descoperi numeralul cardinal, numeralul ordinal, emoția și comunicarea nonverbală, adică gestul. Variația cuvintelor după timp și după loc, la fel ca școala de altădată, vine mai târziu. Cu numeralul spui o informație clară, iar la o problemă propui o soluție. Înainte de text notezi cinci competențe, un numeral și un gest, abia apoi citești fragmentele, iar proverbele de deschidere rămân în manual.',
        example: 'Înainte de lectură notez cele cinci competențe, un numeral și un gest, și abia apoi citesc fragmentele. Cu numeralul pot spune o informație clară, iar dacă apare o problemă propun o soluție. Proverbele de deschidere rămân în manual.',
        tryThis: 'Scrie două propoziții în care spui ce reiei și ce descoperi în această unitate și amintești că variația cuvintelor după timp și loc vine mai târziu.',
        recap: 'Deschiderea unității arată ce reiei și ce descoperi: substantivul, școala și descrierea sunt reluate, iar numeralul, emoția și gestul se lucrează acum. Cele cinci competențe sunt 1.2, 2.5, 3.2, 4.4 și 5.2, iar variația cuvintelor după timp și loc vine mai târziu.'
      }),
      lesson('atitudine', 'Emoții, atitudine și recitare', {
        theory: 'Emoția este starea scurtă care se vede, cum sunt frica și bucuria, sentimentul este starea care ține mai mult, cum este respectul, iar atitudinea este felul în care te porți. Numești patru emoții și le legi fiecare de o culoare, jurnalul dublu are două coloane, în stânga stă fragmentul, iar în dreapta stă impresia ta, și pentru casa copilăriei scrii trei îndemnuri la modul imperativ. Recitarea este rostirea cu voce tare a unui text, cu pauzele cerute de punctuație. Ideile merg mai ales prin cuvinte, iar emoțiile merg prin nonverbal, adică prin gest, prin față și prin poziția corpului, și prin paraverbal, adică prin intensitate, intonație, tempo și accent. La recitare rostești corect și ții pauzele din punctuație, apoi notezi ce a ieșit bine și ce a ieșit slab, iar de la bunici afli cum arăta casa lor și scrii un paragraf.',
        example: 'Pentru casa copilăriei scriu trei îndemnuri la imperativ, între care „Păstrează casa copilăriei”, iar în jurnalul dublu, în stânga pun ideea de casă și în dreapta scriu că m-a întristat. Cuvântul bravo, spus încet și cu zâmbet, încurajează, iar același cuvânt, spus cu râs scurt și cu sprâncene ridicate, bate joc. Sprânceana ridicată este semn nonverbal, tempo-ul vorbirii este semn paraverbal, iar pauza de la virgulă se aude când reciți.',
        tryThis: 'Scrie în caiet trei îndemnuri la imperativ despre casa copilăriei, un rând de jurnal dublu și un paragraf despre ce ai aflat de la bunici, apoi notează un gest nonverbal și un semn paraverbal pe care le folosești la recitare.',
        recap: 'Emoția este o stare scurtă, sentimentul ține mai mult, atitudinea este felul în care te porți, jurnalul dublu are două coloane, numești patru emoții legate de câte o culoare, iar pentru casa copilăriei scrii trei îndemnuri la imperativ. Recitarea este rostirea corectă, cu pauzele din punctuație, ideile merg prin cuvinte, iar emoțiile merg prin nonverbal și prin paraverbal, adică intensitate, intonație, tempo și accent.'
      }),
      
      lesson('vieru-casa', 'Vieru, tema și detaliile', {
        theory: 'Tema este ideea care străbate textul, iar detaliul este un fapt mic, ținut separat de temă. Grigore Vieru s-a născut în 1935, în fostul județ Hotin, în Republica Moldova. În 1988 a primit Diploma de Onoare Hans Christian, în 1993 a fost ales membru corespondent al Academiei Române, iar în 2009 a murit la Chișinău. Dacă ideea este în toate fragmentele, scrii D, iar dacă nu este în niciunul, scrii E.',
        example: 'Tema poate fi casa, iar o fereastră este doar un detaliu. O stradă reală, cu multe date, care nu apare în niciun fragment, se marchează cu E. Ideea care se află în toate fragmentele se marchează cu D.',
        tryThis: 'Scrie două propoziții în care separi tema casei de un detaliu și explici când marchezi o idee cu D și când o marchezi cu E.',
        recap: 'Tema este ideea care străbate textul, iar detaliul stă separat de ea. Grigore Vieru s-a născut în 1935, în fostul județ Hotin, și a murit în 2009, la Chișinău, iar ideea din toate fragmentele se marchează cu D, iar cea care nu este în niciunul se marchează cu E.'
      }),
      lesson('identitate-sat', 'Satul și identitatea națională', {
        theory: 'Identitatea națională este ceea ce recunoaștem ca fiind al nostru, ca popor, iar viața de la sat ține de ea. Muzeul Național al Satului „Dimitrie Gusti” stă lângă lacul Herăstrău, în București, și are case din mai multe regiuni. Pentru cetățenie, cine nu o are din naștere cunoaște limba standard, simbolurile, ziua națională și istoria. Părerea ta stă într-un enunț asertiv, adică într-o propoziție care afirmă, și cuprinde un detaliu.',
        example: 'Mă reprezintă limba română și casa cu prispă, iar acest enunț asertiv are detaliul prispei. Muzeul de lângă lacul Herăstrău păstrează case din mai multe regiuni ale țării. Pentru cetățenie, candidatul cunoaște limba standard, simbolurile, ziua națională și istoria.',
        tryThis: 'Scrie un enunț asertiv în care spui ce te reprezintă din viața de la sat, cu un detaliu, și o a doua propoziție despre ce cunoaște cine vrea cetățenia.',
        recap: 'Viața de la sat ține de identitatea națională, iar Muzeul Național al Satului „Dimitrie Gusti” stă lângă lacul Herăstrău, în București, cu case din mai multe regiuni. Pentru cetățenie, cine nu o are din naștere cunoaște limba standard, simbolurile, ziua națională și istoria, iar părerea ta stă într-un enunț asertiv cu un detaliu.'
      }),
      lesson('numeral', 'Numeralul cardinal', {
        theory: 'Numeralul este cuvântul care exprimă o cantitate, un număr sau o ordine, iar numeralul cardinal spune cât, ca în trei case și în doisprezece ouă. Cuvintele un și o sunt numerale când răspund la cât, ca în cel puțin o fereastră, un este masculin, iar o este feminin, iar în grupul într-un coș, un este articol, pentru că prezintă coșul și nu îl numără. În lista doi, al doilea, doime și de două ori, elementul de bază este doi. Cardinalul compus de la 11 la 18 se scrie într-un singur cuvânt: 11 este unsprezece, iar unșpe și unșpce nu sunt formele corecte, 16 este șaisprezece, nu șasesprezece, 17 este șăptesprezece, cu ă, iar 18 este optsprezece, nu optisprezece. Numărul 21 se scrie douăzeci și unu, în trei cuvinte, iar dacă prima zi are 12 ouă și în fiecare zi următoare scazi un ou, a șaptea zi are 6 ouă.',
        example: 'Orașul avea doi pereți, iar cel puțin o fereastră răspunde la cât, deci o este numeral feminin, pe când într-un coș cuvântul un este articol, pentru că prezintă coșul. În coș sunt unsprezece ouă, iar 16, 17 și 18 se scriu șaisprezece, șăptesprezece și optsprezece. Numărul 21 se scrie douăzeci și unu, iar dacă luni sunt 12 ouă și în fiecare zi scazi un ou, a șaptea zi are 6 ouă.',
        tryThis: 'Scrie în caiet două propoziții în care un numeral cardinal spune cât și explici de ce un din într-un coș este articol, apoi folosești unsprezece, șăptesprezece și douăzeci și unu și arăți câte ouă are a șaptea zi dacă începi de la 12.',
        recap: 'Numeralul exprimă o cantitate, un număr sau o ordine, cardinalul spune cât, un și o sunt numerale doar când răspund la cât, iar în lista doi, al doilea, doime și de două ori elementul de bază este doi. De la 11 la 18 scrii într-un cuvânt, unsprezece, șaisprezece, șăptesprezece și optsprezece, 21 se scrie douăzeci și unu, iar dacă prima zi are 12 ouă și scazi câte un ou, a șaptea zi are 6.'
      }),
      
      lesson('ordinal', 'Numeralul ordinal', {
        theory: 'Numeralul ordinal este cuvântul care spune locul în grup, nu cantitatea. La masculin spui al doilea și al treilea, iar la feminin spui a doua și a treia. În structură stau al sau a, numeralul cardinal și articolul: la masculin articolul este le, ca în al doilea, iar la feminin articolul este a, ca în a doua. Cuvântul trei spune câți sunt, iar al treilea spune locul, și dacă inversezi versurile și păstrezi câte un obiect, se schimbă ordinea, iar cantitatea rămâne aceeași. La regi și la capitole, cifra romană X este 10, iar M este 1000.',
        example: 'Am trei ferestre, deci trei spune cantitatea. A treia fereastră este a mea, deci a treia spune locul. Dacă inversez versurile și păstrez câte un obiect, se schimbă ordinea, iar numărul de obiecte rămâne același.',
        tryThis: 'Scrie două propoziții în care spui locul al treilea la masculin și la feminin și arăți că, dacă schimbi ordinea și păstrezi câte un obiect, cantitatea rămâne aceeași.',
        recap: 'Numeralul ordinal spune locul în grup și se acordă: al doilea și al treilea la masculin, a doua și a treia la feminin. Cuvântul trei spune câți sunt, al treilea spune locul, iar la regi și la capitole X este 10 și M este 1000.'
      }),
      lesson('masuri-vechi', 'Unități de măsură, de azi și de demult', {
        theory: 'Unitatea de măsură este mărimea stabilită cu care numeri o lungime sau un timp. În 1960 s-a adoptat Sistemul Internațional: 1 kilometru are 1000 de metri, iar 1 oră are 60 de minute. Mila marină are 1852 de metri, iar piciorul anglo-saxon are 0,304 metri. Piciorul și palma erau părți din stânjen, care avea 2,23 metri în Moldova și 1,97 metri în Muntenia. Cuvântul ultima este numeral ordinal doar când spui a câta, de pildă a cincea.',
        example: 'Dacă păpușa din capăt este a cincea de la dreapta la stânga, scrii a cincea, și abia atunci spui locul cu un numeral ordinal. Mila marină are 1852 de metri, iar piciorul anglo-saxon are 0,304 metri. Stânjenul are 2,23 metri în Moldova și 1,97 metri în Muntenia.',
        tryThis: 'Scrie două propoziții în care compari mila marină cu stânjenul din Moldova și din Muntenia și folosești a cincea ca numeral ordinal.',
        recap: 'Unitatea de măsură este mărimea cu care numeri o lungime sau un timp, iar din 1960 folosim Sistemul Internațional, cu 1000 de metri la un kilometru și 60 de minute la o oră. Mila marină are 1852 de metri, piciorul anglo-saxon are 0,304 metri, stânjenul are 2,23 metri în Moldova și 1,97 metri în Muntenia, iar ultima este ordinal doar când spui a câta, de pildă a cincea.'
      }),
      lesson('patrimoniu', 'Patrimoniul și obiectivele', {
        theory: 'Patrimoniul cultural este ceea ce o comunitate trece mai departe: obiceiuri, tradiții și artă. UNESCO are și situri naturale, iar Delta Dunării și Horezu stau pe liste diferite. Pe listă se află Delta Dunării, Horezu, Călușarii, biserici din Moldova și din Transilvania și biserica de lemn din Maramureș. Zidurile duc la Horezu, iar pelicanii duc la Deltă. În prezentare pui un numeral cardinal sau un numeral ordinal, iar cardinalul se scrie și cu litere, dacă așa cere sarcina.',
        example: 'Horezu este al doilea obiectiv de pe fișa mea, iar al doilea este numeral ordinal. În Deltă am numărat doi pelicani, iar doi se poate scrie și cu litere, dacă sarcina cere asta. Zidurile rămân la Horezu, iar pelicanii rămân la Deltă.',
        tryThis: 'Scrie două propoziții despre obiectivele de pe listă, una cu un numeral cardinal și una cu un numeral ordinal, și leagă pelicanii de Deltă, iar zidurile de Horezu.',
        recap: 'Patrimoniul cultural trece mai departe obiceiuri, tradiții și artă, iar UNESCO are și situri naturale. Delta și Horezu stau pe liste diferite, pelicanii duc la Deltă, zidurile duc la Horezu, iar în prezentare pui un cardinal sau un ordinal.'
      }),
      lesson('scoala', 'Școala și mesajul din Hamurabi', {
        theory: 'Mesajul despre școală este înțelesul pe care îl scoți din cuvintele și din datele unei singure clase, iar cuvintele se împart în trei coloane: stări pozitive, emoții negative și cuvinte neutre. Diagrama este a unei singure clase, cu 18 elevi, 14 fete și 4 băieți, la Școala Constantin Brâncoveanu, varianta despre toate școlile din România sare din aceste date, iar afirmația că toți elevii din România sunt triști nu iese din 18 răspunsuri. Chestionarul cere doar da sau nu, plus un paragraf cu o soluție. Mesajul textului este ideea pe care o poți dovedi cu o faptă din întâmplare, iar textul este Hamurabi, de Mircea Sântimbreanu. Eugenița este dintr-a cincea, iar dintr-a cincea este numeral ordinal, ora este de istorie, despre babilonieni și despre Hamurabi, iar dovada mesajului este că Eugenița nu știe lecția și amână întrebarea. Emoția stă lângă un substantiv, ca atribut, și se subliniază, iar alegi două stări pozitive și una negativă, fiecare legată de un moment.',
        example: 'În coloana stărilor pozitive pun calmul, în coloana emoțiilor negative pun stresul, iar clasa are 18 elevi, 14 fete și 4 băieți, la Școala Constantin Brâncoveanu. La întrebarea dacă simți stres, răspunsul cerut este doar da sau doar nu, apoi scriu un paragraf cu o soluție care rămâne la această clasă. În grupul privirea speriată, cuvântul speriată este atributul și se subliniază, ușurarea, în momentul în care crede că a scăpat, este o stare pozitivă, o a doua stare pozitivă stă lângă un alt moment, iar teama de întrebare este starea negativă din ora de istorie.',
        tryThis: 'Scrie în caiet un paragraf în care împarți trei cuvinte despre școală în cele trei coloane și propui o soluție doar pentru clasa cu 18 elevi, apoi trei propoziții despre ora de istorie din Hamurabi, două cu stări pozitive și una cu o stare negativă, și subliniază emoția folosită ca atribut.',
        recap: 'Cuvintele despre școală se împart în stări pozitive, emoții negative și cuvinte neutre, diagrama ține de o singură clasă, cu 18 elevi, 14 fete și 4 băieți, la Școala Constantin Brâncoveanu, iar chestionarul primește doar da sau nu, plus o soluție. Mesajul din Hamurabi, de Mircea Sântimbreanu, se dovedește cu fapta Eugenței, dintr-a cincea, care nu știe lecția despre babilonieni și amână întrebarea, iar emoția stă lângă substantiv, ca atribut.'
      }),
      
      lesson('variatie', 'Variația cuvintelor', {
        theory: 'Variația cuvintelor este schimbarea formei și a sensului în timp sau de la o regiune la alta, marca (Înv.) înseamnă învechit, nu învățat, iar marca (Reg.) înseamnă regional. Verbul a toci înseamnă repetarea pe dinafară, iar a învăța înseamnă să înțelegi, la tocilar sensul 1 este că ascute unelte, sensul 2, cel din manual, este memorarea mecanică, iar antonimul dat este corijent. Majusculele scot cuvântul în față, iar în fragment Spider-Man este Peter Parker, niște tocilari este formă nehotărâtă, iar tocilarii este formă hotărâtă. Forma corectă de azi este cuvântul scris cum se cere în limba standard, cuvintele excursie și tematică sunt de azi, din 2022, iar tartaj este cuvântul vechi, lăsat lui Nică, elev în 1850. Scrii avantajele școlii, dorințele familiei, facilității acesteia nu-i poți rezista și copiii de aici. Compunerea are trei paragrafe și două argumente, iar o secvență din text se dezvoltă în limba standard.',
        example: 'Nu toci lecția pe dinafară, pentru că a toci înseamnă repetare fără să înțelegi, iar sensul potrivit din manual, sensul 2, este memorarea mecanică, cu antonimul corijent. Avantajele școlii și dorințele familiei stau în limba standard, facilității acesteia nu-i poți rezista, iar copiii de aici sunt cei știuți. Compunerea are trei paragrafe și două argumente, excursie și tematică sunt din 2022, iar tartaj rămâne cuvântul lui Nică, elev în 1850.',
        tryThis: 'Scrie în caiet o compunere scurtă, în trei paragrafe și cu două argumente, în limba standard, cu avantajele școlii, dorințele familiei și copiii de aici, și explică sensul 2 al cuvântului tocilar și marca (Înv.).',
        recap: 'Variația cuvintelor este schimbarea formei și a sensului în timp sau după regiune, (Înv.) înseamnă învechit, (Reg.) înseamnă regional, a toci înseamnă repetare pe dinafară, iar sensul 2 al lui tocilar, din manual, este memorarea mecanică, cu antonimul corijent. Excursie și tematică sunt din 2022, tartaj este cuvântul lui Nică din 1850, iar scrii avantajele școlii, dorințele familiei, facilității acesteia nu-i poți rezista și copiii de aici, în trei paragrafe și cu două argumente.'
      }),
      lesson('creanga-sat', 'Humulești și școala de altădată', {
        theory: 'Școala de altădată, în cartea lui Ion Creangă, este școala din sat, spusă cu faptele locului, iar Ion Creangă s-a născut în 1837, la Humulești, și a murit pe 31 decembrie 1889, la Iași, cartea mare este Amintiri din copilărie, pe care nu o copiem. Satul stă peste apa Neamțului și are trei părți, Vatra, Delenii și Bejenii, școala era o chilie la poarta bisericii, ziua de ascultat era sâmbăta, la dicționar forma părintele devine părinte, afirmația că sala era foarte mare este falsă, scaunul nou nu a venit fiindcă mai apăruse un elev, iar tu prezici și apoi verifici în fragmentul următor. Banca cea lungă primește numele Calul Bălan, nuiaua primește numele Sfântul Nicolai, după hram, Smărăndița este pedepsită la prima abatere, părerea lui Nică despre băiatul care îl ascultă este proastă, replica spusă în gând îi aparține lui Nică, iar luna acelei ascultări este mai. Un grup are substantiv și atribut, iar comparația o cauți la cuvântul ca, în manual, și nu o copiezi. Forma veche este cuvântul folosit altădată, pluralul vechi al lui școală a fost școale, carte a însemnat și scrisoare, procitanie înseamnă ascultare sau examinare, iar dascăl a rămas și cântăreț de biserică, și învățător, pentru că primele școli au stat lângă biserică. Prima școală românească atestată este în 1495, în Șcheii Brașovului, la Sfântul Nicolae, 1495 este numeral cardinal, prima este numeral ordinal, iar marca (Reg.) înseamnă regional, nu învechit.',
        example: 'Satul Humulești stă peste apa Neamțului și are Vatra, Delenii și Bejenii, școala era o chilie la poarta bisericii, iar ascultarea era sâmbăta. Părinte bun este un grup în care bun este atributul, banca cea lungă se numește Calul Bălan, nuiaua se numește Sfântul Nicolai, iar luna ascultării rămâne mai. Forma veche mă procitește înseamnă mă ascultă, dascălul cântă la strană și dascălul predă, iar anul 1495, în Șcheii Brașovului, la Sfântul Nicolae, numără ca un cardinal.',
        tryThis: 'Scrie în caiet două propoziții despre satul Humulești, cu cele trei părți, școala de la poartă și ziua de ascultat, apoi spune ce nume primesc banca și nuiaua, cui îi aparține replica din gând și care sunt cele două sensuri ale cuvântului dascăl, cu anul și locul primei școli românești.',
        recap: 'Ion Creangă s-a născut în 1837 la Humulești și a murit pe 31 decembrie 1889 la Iași, satul stă peste apa Neamțului, cu Vatra, Delenii și Bejenii, școala era o chilie, ascultarea era sâmbăta, banca este Calul Bălan, nuiaua este Sfântul Nicolai, iar Smărăndița, Nică și luna mai țin de acea ascultare. Pluralul vechi a fost școale, carte a însemnat și scrisoare, procitanie înseamnă ascultare, dascăl înseamnă și cântăreț, și învățător, iar prima școală românească atestată este în 1495, în Șcheii Brașovului, la Sfântul Nicolae.'
      }),
      
      
      lesson('timp-sumer', 'Deceniu, secol, mileniu', {
        theory: 'Deceniul, secolul și mileniul sunt numerale cardinale cu care măsori timpul lung. Un deceniu are 10 ani, un secol are 100 de ani, iar un mileniu are 1000 de ani. În jurul anului 3500 î.Hr., sumerienii scriau cu semne cuneiforme, iar primele manuale, la Uruk, erau tăblițe de lut cu liste de cuvinte. Un nume propriu îl cauți în cuprinsul de istorie, nu la întâmplare. Școala fricoșilor este o carte pe care o deschizi, nu o copiezi, iar proverbul îl explici în două paragrafe, cu vorbele tale.',
        example: 'Un mileniu are 1000 de ani, iar 1000 este numeral cardinal, la fel ca 10 pentru un deceniu și 100 pentru un secol. Numele Uruk se caută în cuprins, la civilizația veche, lângă tăblițele de lut. Proverbul se explică în două paragrafe, cu vorbele tale.',
        tryThis: 'Scrie două paragrafe cu vorbele tale în care explici un proverb și spui câți ani au un deceniu, un secol și un mileniu.',
        recap: 'Deceniul, secolul și mileniul sunt numerale cardinale: 10 ani, 100 de ani și 1000 de ani. În jurul anului 3500 î.Hr., la Uruk, primele manuale erau tăblițe de lut cu liste de cuvinte, iar un nume propriu se caută în cuprinsul de istorie.'
      }),
      lesson('casa-memoriala', 'Casa memorială și relatarea', {
        theory: 'Relatarea unei vizite este textul în care spui o experiență în ordine, iar pentru Casa Memorială „Ion Creangă” faci întâi un tabel cu patru rubrici. În tabel notezi dacă informația este foarte importantă, puțin importantă sau neimportantă. Ora, ziua închisă și GPS-ul contează mult, iar casa stă pe malul Ozanei. O experiență de școală se spune în patru paragrafe, legate prin la început, apoi, în timp ce, după ce și în sfârșit.',
        example: 'Ora de deschidere este foarte importantă dacă vrei să intri, iar e-mailul poate fi neimportant pentru aceeași vizită. Casa stă pe malul Ozanei, așa că râul intră între rubrici. Primul paragraf spune cine, unde și când, iar celelalte merg cu apoi, în timp ce, după ce și în sfârșit.',
        tryThis: 'Scrie tabelul cu patru rubrici pentru Casa Memorială „Ion Creangă”, marchează ora, ziua închisă și GPS-ul ca foarte importante și povestește o experiență de școală în patru paragrafe legate prin la început, apoi, în timp ce, după ce și în sfârșit.',
        recap: 'Pentru Casa Memorială „Ion Creangă”, de pe malul Ozanei, faci un tabel cu patru rubrici și notezi ce este foarte important, puțin important sau neimportant. Ora, ziua închisă și GPS-ul contează mult, iar experiența de școală se spune în patru paragrafe, cu la început, apoi, în timp ce, după ce și în sfârșit.'
      }),
      lesson('recap-trepte', 'Recapitulare: treptele', {
        theory: 'Recapitularea este proba în care arăți ce ai învățat despre școală, despre numeral și despre cuvinte, iar la recapitulare subliniezi substantivul o dată și adjectivul de două ori. Din câmpul școlii țin teme și program, seria b, nu arbori și nu pădure, Andrei caută fiindcă sora lui, Ioana, vrea o școală privată odată cu prietena, iar revista este Capital, din 4 decembrie 2009. În primul rând, suma de la Școală după școală este mică și rămâi la prânz, iar în al doilea rând primești ajutor la teme, cuvântul primul este ordinal simplu, iar al doilea este ordinalul construit cu al. Fișa de reflecție este textul scris la persoana I, la sfârșitul unității, și spui ce ai aflat, ce folosești la altă disciplină, ce ai descoperit despre tine, ce vrei să afli și ce ai învățat. Spui și dacă te descurci mai bine decât la unitatea dinainte, iar fișa intră în portofoliu, lângă tabelul de observare a comportamentului.',
        example: 'Seria teme și program ține de școală și este seria b, în primul rând rămâi la prânz, pentru că suma de la Școală după școală este mică, iar în al doilea rând primești ajutor la teme. Revista Capital este din 4 decembrie 2009, iar Andrei caută fiindcă sora lui, Ioana, vrea o școală privată. Am aflat că marca (Înv.) înseamnă învechit, la istorie caut Uruk în cuprins, iar fișa stă în portofoliu, lângă tabelul de observare a comportamentului.',
        tryThis: 'Scrie în caiet două propoziții despre Școală după școală, una cu în primul rând și una cu în al doilea rând, subliniază substantivul o dată și adjectivul de două ori, apoi cinci propoziții la persoana I pentru fișa de reflecție.',
        recap: 'Acum poți recunoaște câmpul școlii, seria b, cu teme și program, ordinalul simplu primul și ordinalul al doilea, revista Capital din 4 decembrie 2009 și faptele despre Andrei, Ioana și Școală după școală. Poți scrie fișa la persoana I, spune dacă te descurci mai bine decât la unitatea dinainte și o pui în portofoliu, lângă tabelul de observare a comportamentului.'
      }),
      
      
      lesson('relatare-scoala', 'Fișa relatării', {
        theory: 'Relatarea este textul care spune o întâmplare în trei părți. Introducerea spune cine, unde și când, iar forma scurtă are 20–30 de cuvinte. Cuprinsul spune de ce a pornit întâmplarea, ce a urmat și ce emoție a rămas. Încheierea arată ce s-a schimbat și ce reține cititorul. Mai scrii un enunț exclamativ și un enunț la imperativ care cuprinde un numeral cardinal.',
        example: 'Propoziția Ce zi lungă, spusă cu mirare, este un enunț exclamativ. Porunca Notează două detalii este la imperativ, iar două este numeral cardinal. Introducerea spune cine, unde și când și nu începe cu de ce.',
        tryThis: 'Scrie o relatare scurtă, de 20–30 de cuvinte, cu cine, unde și când, apoi adaugă un enunț exclamativ și un imperativ care cuprinde un numeral cardinal.',
        recap: 'Relatarea are trei părți: introducerea spune cine, unde și când, cuprinsul spune de ce a pornit întâmplarea, ce a urmat și ce emoție a rămas, iar încheierea arată ce s-a schimbat. Forma scurtă are 20–30 de cuvinte și mai cuprinde un enunț exclamativ și un imperativ cu un numeral cardinal.'
      }),
      
    ]
  },
  {
    id: 'eroi',
    title: 'Eroi din cărți, din filme și din viață',
    inOwnWords:
      'Unitatea 7 începe cu știrea: text narativ nonliterar, participanți, pronume personal și pronume de politețe, apoi Scrisoarea III, de Mihai Eminescu. Bunica Safta, de Ion Agârbiceanu, vine în partea următoare. Cuprinsul le indică pe amândouă.',
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
      { term: 'pronume personal', meaning: 'Înlocuiește un nume: eu, tu, el, ea, noi, voi, ei, ele. Genul se vede doar la persoana a III-a.' },
      { term: 'pronume de politețe', meaning: 'dumneata, dumneavoastră, mata. Marchează distanța. dumneavoastră cere verbul la plural.' },
      { term: 'narativ nonliterar', meaning: 'Povestește fapte reale, cu participanți care pot fi numiți, ca să informeze.' },
      { term: 'participant', meaning: 'Omul real care face fapta într-o știre. Nu e personajul unei povestiri.' }
    ],
    lessons: [
      lesson('deschidere-eroi', 'Ce vei descoperi în unitate', {
        theory: 'Deschiderea unității despre eroi este locul în care vezi ce reiei și ce descoperi. Unitatea are șapte competențe specifice: 1.2, 2.1, 2.5, 3.4, 4.2, 4.4 și 5.2. Reiei textul narativ, participanții, personajele, eroii din legende și detaliul, iar descoperi textul narativ nonliterar, pronumele personal, pronumele de politețe și gestul. Eroul se cunoaște după faptă, iar costumul de supererou nu este de trebuință. Citatele rămân în manual, iar aici lucrezi știrea, pronumele și gestul.',
        example: 'Un copil îl scoate pe fratele lui dintr-o casă în flăcări. Fapta îl face erou în ziua aceea. Costumul de supererou nu este de trebuință, iar citatele rămân în manual.',
        tryThis: 'Scrie două propoziții în care spui ce reiei și ce descoperi în unitatea despre eroi și arăți, printr-o faptă, de ce un copil poate fi erou fără costum.',
        recap: 'Unitatea despre eroi are șapte competențe, 1.2, 2.1, 2.5, 3.4, 4.2, 4.4 și 5.2, și aici lucrezi știrea, pronumele și gestul. Reiei textul narativ, participanții, personajele, eroii din legende și detaliul, iar eroul se cunoaște după faptă.'
      }),
      lesson('nonliterar', 'Știrea și participanții', {
        theory: 'Textul narativ nonliterar este textul care povestește o faptă reală, într-un loc real și într-un timp real, ca să informeze și să fie crezut, participanții pot fi numiți, autorul este cel care scrie, iar participantul este cel care face fapta. Știrea din 22 mai 2019, de la Runcu de Jos, este semnată de Camelia Nuțu, iar Ionuț Preda, de 12 ani, își scoate fratele de 5 ani din foc și este erou prin faptă, nu pentru că seamănă cu Spider-Man. În ordine, întâi este Ionuț, apoi fratele lui, iar părinții erau plecați, copiii dormeau, apoi a izbucnit focul, joi noaptea, a venit rândul geamului, iar copilul de 5 ani a ieșit pe fereastră. ISU, din fragmentul a, este Inspectoratul General pentru Situații de Urgență, iar SMURD, din fragmentul b, este Serviciul Mobil de Urgență, Reanimare și Descarcerare, deci intervenția nu se reduce la un singur pompier. AUDACIA ET DEVOTIO înseamnă curaj și devotament, focul s-a stins în circa 3 ore, iar cauza cea mai probabilă este căldura curentului electric. Elicopterul îl duce pe băiatul de 12 ani la București, nu pe unul de 15 ani, iar cel mic rămâne la Bistrița.',
        example: 'Camelia Nuțu semnează știrea din 22 mai 2019, de la comuna Runcu de Jos, iar Ionuț Preda, de 12 ani, și fratele lui sunt participanții. Copiii dormeau, apoi a izbucnit focul, joi noaptea, și a venit rândul geamului, iar băiatul l-a scos pe cel de 5 ani pe fereastră. La final, elicopterul îl duce pe băiatul de 12 ani la București, cel mic rămâne la Bistrița, focul s-a stins în circa 3 ore, iar ISU și SMURD au intervenit.',
        tryThis: 'Scrie în caiet două propoziții în care spui cine este autoarea, cine sunt participanții și în ce ordine stau faptele, de la somn și foc până la elicopter, și explici ce înseamnă ISU, SMURD și AUDACIA ET DEVOTIO.',
        recap: 'Textul narativ nonliterar povestește o faptă reală, iar în știrea din 22 mai 2019, de la Runcu de Jos, semnată de Camelia Nuțu, Ionuț Preda, de 12 ani, își scoate fratele de 5 ani din foc, părinții erau plecați, iar ISU și SMURD intervin. Elicopterul îl duce pe băiatul de 12 ani la București, nu pe unul de 15 ani, cel mic rămâne la Bistrița, focul s-a stins în circa 3 ore, cauza cea mai probabilă este căldura curentului electric, iar AUDACIA ET DEVOTIO înseamnă curaj și devotament.'
      }),
      
      lesson('pronume', 'Pronumele personal', {
        theory: 'Pronumele personal este cuvântul care înlocuiește un substantiv, ca să nu repeți numele, și arată persoana față de vorbitor, la singular formele sunt eu, tu, el sau ea, la plural formele sunt noi, voi, ei sau ele, iar genul se vede doar la persoana a III-a. Scrii Eu și Ea, iar formele Ieu și Ia nu se folosesc, puștiul se înlocuiește cu el, sora se înlocuiește cu ea, iar în discuția din lecție Gabi are dreptate că nu toate fetele sunt sperioase, pe când Ionel nu are dreptate. Forma cu cratimă este pronumele care nu stă ca subiect și se leagă de verb, scrii m-a ajutat și l-a impresionat pe Andrei, iar spui mie îmi place și mie mi-a plăcut. Mi-au este pronume plus verb, iar Miau este pisica, forma ne-a este pronume plus auxiliar, iar nea Ion este o adresare. La acuzativ formele sunt mă, m-, te, îl, o, ne, vă, v-, îi și le, iar la dativ formele sunt mie, îmi, mi, ție, îți, ți, lui, îi, i-, ei, nouă, ne, ni, vouă, vă, vi și lor. Nu i-a luat nimeni nimic, iar dacă obiceiul ține, ea ia, pentru că ia este verbul, fără cratimă.',
        example: 'Ioana a desenat casa, iar ea a colorat apoi acoperișul, deci pronumele ea a înlocuit substantivul. Colegul m-a ajutat la problemă, mie mi-a plăcut rezolvarea, iar pe Andrei l-a impresionat răspunsul. Nea Ion ne-a întrebat dacă am înțeles, mi-au dat caietul înapoi, iar pisica Miau a rămas pe bancă.',
        tryThis: 'Scrie în caiet două propoziții despre un coleg și înlocuiește numele în a doua, apoi leagă un pronume de verb prin cratimă, cu m-a, cu mi-a și cu Mi-au, și folosește o dată nea Ion ca adresare.',
        recap: 'Pronumele personal înlocuiește un substantiv, cu formele eu, tu, el, ea, noi, voi, ei, ele, genul se vede doar la persoana a III-a, scrii Eu și Ea, iar Gabi are dreptate, pe când Ionel nu are dreptate. Când pronumele nu este subiect, cratima îl leagă de verb, ca în m-a ajutat și l-a impresionat, Miau este pisica, Mi-au este pronume plus verb, nea este adresarea, iar ne-a este pronume plus auxiliar.'
      }),
      
      lesson('compunere-eroica', 'Compunerea despre o faptă', {
        theory: 'Compunerea despre o faptă este textul care povestește o faptă demnă de admirat, văzută, auzită sau citită. Pui cel puțin doi participanți și o relație bună, rea sau neutră, iar timpul vine dintr-o dată sau dintr-un numeral. Locul și oamenii se scriu ca substantiv plus atribut, pronumele arată pe cine înlocuiește, iar timpurile păstrează ordinea faptelor. Compunerea are titlu și trei părți, fiecare cu alineat.',
        example: 'La ora două, băiatul curajos din sat a spart geamul gros. El l-a scos pe fratele mic, iar pronumele el îl înlocuiește pe băiat. Relația dintre cei doi este bună, iar textul are titlu și trei părți, cu alineat.',
        tryThis: 'Scrie o compunere cu titlu și trei părți, cu cel puțin doi participanți, o relație și un numeral care arată timpul, și înlocuiește un nume cu un pronume.',
        recap: 'Compunerea povestește o faptă demnă de admirat, cu cel puțin doi participanți, o relație bună, rea sau neutră, un timp dat de o dată sau de un numeral și un loc scris ca substantiv plus atribut. Are titlu și trei părți, cu alineat, pronumele arată pe cine înlocuiește, iar timpurile păstrează ordinea.'
      }),
      lesson('politete', 'Politețea și pronumele de politețe', {
        theory: 'Scrisoarea III, de Mihai Eminescu, este textul cu două părți din care înveți despre respect și despre cuvântul domn: prima parte prezintă invazia otomană în Țara Românească, solul, apoi pe Baiazid, pe vremea lui Mircea cel Bătrân, iar a doua parte critică prezentul. Tema este dragostea de țară și istoria, nu copilăria, pacea o cere solul, care vorbește de domnul nostru, iar Baiazid îi vorbește lui Mircea fără respect, pe un ton disprețuitor. Pe vremea aceea, domn era conducătorul, iar azi cuvântul este și o formulă politicoasă, iar jurnalul dublu are două coloane. Pronumele de politețe este pronumele cu care arăți distanța față de persoana căreia îi vorbești sau despre care vorbești, doar la persoana a II-a și la persoana a III-a. Formele sunt dumneavoastră, dumneata, dumitale, dumnealui, dumneaei, dumnealor, mata, matale, dânsul, dumisale, mătălică, mătăluță, tălică și tăluță. Forma dumneavoastră marchează distanța mare și cere verbul la plural, chiar când vorbești cu o singură persoană, ca în Dumneavoastră citiți, dumneata marchează distanța medie, mata se folosește pentru un părinte sau pentru un bunic, la primărie, la spital și la secretariat spui dumneavoastră, la aceeași vârstă spui tu, iar un vârstnic către un tânăr poate spune dumneata.',
        example: 'Solul cere pace pentru domn și vorbește de domnul nostru, iar tonul lui Baiazid este disprețuitor, pentru că îi vorbește lui Mircea fără respect. La secretariatul școlii spun Dumneavoastră citiți programul, vă rog, unui coleg de aceeași vârstă îi spun tu, iar bunicii îi spun mata. Pentru text țin un jurnal dublu cu două coloane.',
        tryThis: 'Scrie în caiet două propoziții în care spui cine cere pacea în Scrisoarea III și cum îi vorbește Baiazid lui Mircea, apoi una către secretariat cu dumneavoastră și verbul la plural și una către un bunic cu mata.',
        recap: 'Scrisoarea III, de Mihai Eminescu, are două părți, invazia otomană din vremea lui Mircea cel Bătrân și critica prezentului, tema este dragostea de țară și istoria, pacea o cere solul, iar Baiazid vorbește fără respect. Pronumele de politețe, la persoana a II-a și a III-a, arată distanța, dumneavoastră pentru distanță mare, cu verbul la plural, dumneata pentru distanță medie și mata pentru un părinte sau un bunic.'
      }),
      
      lesson('marca-persoanei', 'Vocea, gestul și textul literar', {
        theory: 'Marca persoanei este felul în care politețea se vede și în afara cuvintelor, prin voce și prin gest. Politețea este și gest, postură, ton și intonație: aștepți rândul, refuzi civilizat, saluți și păstrezi distanța, chiar și cu un coleg. Apus și Răsărit, scrise cu majusculă, înseamnă Occident și Orient, iar apus, cu literă mică, înseamnă asfințit. La un conducător cauți dragoste de țară și demnitate, nu trufie și nu supunere. Baiazid arată desconsiderare și nu cere o informație, iar cratima grăbește rostirea. Unii eroi trec, dragostea de țară poate rămâne, iar după această lecție urmează textul literar.',
        example: 'Aștept rândul și salut un coleg, păstrând distanța, iar tonul rămâne calm. Apus, cu majusculă, numește o lume, Occidentul, iar apus, cu literă mică, este asfințitul. La conducător caut dragoste de țară și demnitate.',
        tryThis: 'Scrie două propoziții în care descrii un gest politicos față de un coleg și folosești Apus cu majusculă și apus cu literă mică, cu înțelesul fiecărei forme.',
        recap: 'Politețea este și gest, postură, ton și intonație, nu doar cuvântul ales. Apus și Răsărit, cu majusculă, înseamnă Occident și Orient, apus cu literă mică înseamnă asfințit, iar la un conducător cauți dragoste de țară și demnitate.'
      }),
      lesson('recap-eroi', 'Recapitulare și evaluare', {
        theory: 'Recapitularea este verificarea cu care închizi anul de clasa a V-a, pe cuprinsul acesta. Ești gata dacă deosebești o relatare de o povestire literară, înlocuiești un nume cu pronumele potrivit, alegi tu sau dumneavoastră după situație și spui de ce un personaj poate fi model, cu o faptă. Evaluarea unității se face pe textul din manual, nu pe o listă de eroi celebri învățați pe dinafară. Reții participantul, pronumele personal, pronumele de politețe, fapta de model, spațiul și timpul.',
        example: 'Maria a ajutat, apoi ea a rămas după oră, iar pronumele ea ține locul numelui Maria, într-o relatare. Către o profesoară pe care nu o tutuiești spui: Dumneavoastră ați rămas după oră? Pronumele de politețe se acordă la plural.',
        tryThis: 'Scrie o relatare scurtă pe o faptă din textul din manual, înlocuiește numele cu pronumele potrivit și adaugă o propoziție cu dumneavoastră către o profesoară.',
        recap: 'Recapitularea închide anul de clasa a V-a dacă deosebești relatarea de povestirea literară, înlocuiești numele cu pronumele potrivit și alegi tu sau dumneavoastră după situație. Evaluarea stă pe textul din manual, iar tu reții participantul, pronumele personal, pronumele de politețe, fapta de model, spațiul și timpul.'
      })
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
