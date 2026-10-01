'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = {
  id: 'eroi',
  title: 'Eroi din cărți, din filme și din viață',
  inOwnWords: 'Unitatea 7 începe cu știrea, participanții, pronumele personal și pronumele de politețe, apoi respectul din Scrisoarea III, de Mihai Eminescu. Faptele sunt scrise în lecție, așa că poți răspunde fără să ai cartea deschisă. La școală repeți pașii pe textul tău.',
  toc: [
    'Textul narativ nonliterar. Participanții la acțiune',
    'Pronumele. Pronumele personal',
    'Eroii de ieri, modele pentru azi',
    'Pronumele de politețe. Comunicarea politicoasă (Scrisoarea III, de Mihai Eminescu)',
    'Nonverbalul și paraverbalul ca mărci ale persoanei',
    'Recapitulare și evaluare'
  ],
  glossary: [
    {
      term: 'pronume personal',
      meaning: 'Înlocuiește un nume: eu, tu, el, ea, noi, voi, ei, ele. Genul se vede doar la persoana a III-a.'
    },
    {
      term: 'pronume de politețe',
      meaning: 'dumneata, dumneavoastră, mata. Marchează distanța. dumneavoastră cere verbul la plural.'
    },
    {
      term: 'narativ nonliterar',
      meaning: 'Povestește fapte reale, cu participanți care pot fi numiți, ca să informeze.'
    },
    {
      term: 'participant',
      meaning: 'Omul real care face fapta într-o știre. Nu e personajul unei povestiri.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-eroi',
      title: 'Ce vei descoperi în unitate',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Harta despre eroi',
        text: 'Deschiderea îți arată ce reiei și ce abia acum afli. Eroul se cunoaște din faptă. Nu îți trebuie costum de supererou.'
      }],
      theory: [
        'Unitatea are șapte competențe. Întâi stă codul 1.2. Apoi vine 2.1. Mai departe stă 2.5. Urmează 3.4. Închid, pe rând, 4.2, apoi 4.4, iar la capăt 5.2.',
        'Reiei povestirea. Reiei oamenii reali din ea. Mai reiei personajele. Separat stau eroii de legendă și detaliul. Nu le lași deoparte.',
        'Noutatea este povestirea despre fapte adevărate, adică textul narativ nonliterar. Mai afli pronumele personal. Apoi afli pronumele de politețe. La urmă afli gestul.',
        'Aici lucrezi știrea, pronumele și gestul. Nu copiezi citate în lecția aceasta.',
        'Un copil își trece fratele afară din casa cuprinsă de foc. Fapta îl face erou. Costumul nu schimbă nimic.',
        'Harta nu ține loc de exercițiu. Ea așază temele, ca să recunoști sarcina când o întâlnești.',
        'Participantul este omul real din știre. Personajul stă într-o povestire. Nu îi schimbi între ei.',
        'Detaliul pe care îl reiei te ajută să nu rămâi la o etichetă. Fără el, portretul eroului e gol.',
        'La clasă, textul de pe bancă poate avea alt titlu. Pașii rămân: reiei, afli ce e nou, legi fapta de erou.',
        'Șapte coduri fixează ținta întregii unități. Niciunul, luat singur, nu închide o lecție.'
      ].join('\n\n'),
      example: [
        'Reiei povestirea și oamenii reali, apoi personajele și eroii de legendă, împreună cu detaliul. Noutățile sunt știrea, pronumele personal, formula de politețe și gestul.',
        'Un copil își scoate fratele din foc. Fapta ajunge. Costumul nu. Codurile se spun pe rând, de la 1.2 până la 5.2.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă scrii doar despre un costum și uiți fapta, nu ai vorbit despre erou. Gestul stă lângă pronume, nu în locul știrii.'
      }],
      tryThis: 'Scrie două propoziții. În prima spune ce reiei și ce afli acum. În a doua pune codurile pe rând: 1.2, apoi 2.1, apoi 2.5, apoi 3.4, apoi 4.2, apoi 4.4 și la urmă 5.2. Arată, prin scoaterea unui frate din foc, de ce fapta ajunge, iar costumul nu.',
      keyPoints: [
        'Șapte coduri fixează unitatea, spuse separat: 1.2, apoi 2.1, apoi 2.5, apoi 3.4, apoi 4.2, apoi 4.4, la capăt 5.2.',
        'Reiei povestirea, oamenii reali, personajele, eroii de legendă și detaliul. Afli știrea, cele două pronume și gestul.',
        'Eroul se vede din faptă. Costumul nu este de trebuință, iar citatele nu se copiază.'
      ]
    }),
    lesson({
      id: 'nonliterar',
      title: 'Știrea și participanții',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Faptă reală',
        text: 'Textul narativ nonliterar spune o întâmplare adevărată, cu loc și cu timp, ca cititorul să afle și să poată crede. Cine scrie este autorul. Cine face fapta este participantul și poate fi numit.'
      }],
      theory: [
        'Data este 22 mai 2019. Comuna se numește Runcu de Jos. Semnătura este a Cameliei Nuțu.',
        'Părinții lipseau de acasă. Ionuț Preda avea 12 ani. Fratele lui avea 5. Amândoi dormeau. Focul a izbucnit joi, noaptea.',
        'Flacăra a urcat până la geam. Întâi contează Ionuț. Apoi contează fratele. Ionuț l-a trecut pe cel mic prin fereastră.',
        'Fapta îl face erou. Asemănarea cu Spider-Man nu schimbă nimic. Nici un costum.',
        'ISU se citește Inspectoratul General pentru Situații de Urgență. SMURD se citește Serviciul Mobil de Urgență, Reanimare și Descarcerare. Ambele echipe au sosit. Nu a lucrat una singură.',
        'Deviza AUDACIA ET DEVOTIO se traduce prin curaj și prin devotament. Flăcările au fost stinse cam în trei ore.',
        'Explicația socotită cea mai plauzibilă ține de căldura produsă de curent. Nu o înlocui cu o bârfă.',
        'Cu elicopterul pleacă spre București băiatul de 12 ani. Nu unul de 15 ani. Fratele mic rămâne în Bistrița.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Dacă schimbi vârsta sau orașul, știrea se strică. 12 rămâne 12. Bistrița rămâne locul celui mic. București rămâne destinația celui mare.',
        'La clasă, dacă ai altă știre, păstrezi întrebările: cine scrie, cine face, unde, când, cine intervine.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: la Runcu de Jos, în mai 2019, Ionuț, în vârstă de 12 ani, îl trece prin fereastră pe fratele de 5 ani, după ce izbucnește focul. Părinții nu sunt acasă.',
        'Ce observ: Văd noaptea, casa, flăcările la geam și cei doi copii. Aș chema ajutorul și l-aș trece pe cel mic afară, pentru că în casă nu era niciun adult.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Echipa ISU și echipa SMURD au lucrat cam trei ore. Cel mare a zburat spre București. Cel mic a fost oprit în Bistrița.'
      }],
      tryThis: [
        'Reia, cu vorbele tale, textul Cameliei Nuțu. Data este 22 mai 2019. Comuna este Runcu de Jos. Ionuț avea 12 ani și l-a trecut pe fratele de 5 ani prin fereastră, după focul de joi noaptea.',
        'Au lucrat și ISU, și SMURD, cam trei ore. Cauza ține de căldura curentului. Elicopterul l-a dus pe cel mare spre București. Fratele mic a rămas în Bistrița. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'În 22 mai 2019, la Runcu de Jos, Camelia Nuțu semnează știrea. Ionuț Preda avea 12 ani și și-a scos fratele de 5 ani prin fereastră.',
        'Au sosit și ISU, și SMURD. Focul a ținut cam trei ore. Explicația plauzibilă ține de căldura curentului.',
        'Spre București zboară cel de 12 ani, nu un băiat de 15. Fratele mic rămâne în Bistrița. Deviza înseamnă curaj și devotament.'
      ]
    }),
    lesson({
      id: 'pronume',
      title: 'Pronumele personal',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'În locul numelui',
        text: 'Pronumele personal ține locul unui nume, ca să nu îl repeți. Arată cine vorbește, cu cine se vorbește și despre cine se vorbește. Genul se aude numai la a III-a.'
      }],
      theory: [
        'La singular ai eu, apoi tu. Pentru a III-a ai el și ai ea. La plural ai noi, apoi voi. Pentru a III-a plural ai ei și ai ele.',
        'La început de rând scrii Eu, cu un singur e. Pentru feminin scrii Ea. Ieu nu există. Nici Ia.',
        'Pentru puști alegi el. Pentru soră alegi ea. Nu inversa genul.',
        'Gabi vede bine: frica nu ține de toate fetele. Ionel se înșală. Ține minte cine judecă drept.',
        'Când pronumele nu este subiect, cratima îl lipește de verb. Un model este m-a ajutat. Alt model, cu Andrei, este l-a impresionat.',
        'Poți spune mie îmi place. Poți spune și mie mi-a plăcut. Cratima apare doar la forma lipită.',
        'Mi-au unește un pronume cu un verb. Miau, scris legat și fără cratimă, este o pisică. Nu le confunda la auz.',
        'Ne-a unește pronumele cu auxiliarul. Nea Ion este o chemare, nu grupul ne-a. În ea ia creionul nu pui cratimă, fiindcă ia este verb.',
        'La acuzativ întâlnești întâi mă și forma scurtă m-. Mai stau te, îl și o. La plural stau ne, apoi vă cu v-, apoi îi și le.',
        'La dativ stau mie, îmi și mi. Pentru a II-a stau ție, îți și ți. Pentru a III-a stau lui, îi, i- și ei. La plural stau nouă, ne și ni, apoi vouă, vă și vi, iar la urmă lor.',
        'În Nu i-a luat nimeni nimic cratima rămâne. Dacă obiceiul se păstrează, ea ia, iar ia rămâne verb.'
      ].join('\n\n'),
      example: [
        'Ioana desenează o casă. Mai târziu, ea colorează acoperișul. Ea a luat locul numelui. La început scrii Eu și scrii Ea.',
        'Un coleg m-a ajutat la temă. Mie mi-a plăcut drumul. Răspunsul l-a impresionat pe Andrei. Mi-au ține de pronume. Miau ține de pisică. Nea Ion ne-a întrebat. Ea ia creionul, fără cratimă.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Puștiul devine el, sora devine ea. Gabi judecă drept. Ionel nu. În Nu i-a luat nimeni nimic cratima rămâne.'
      }],
      practice: [
        '1) Ce forme de singular și de plural are pronumele personal și unde se aude genul?',
        '2) Cum scrii Eu și Ea? Ce rol au m-a, l-a și mi-a, față de Miau și de nea Ion?',
        '3) Cu ce înlocuiești puștiul și sora? Cine judecă drept între Gabi și Ionel? Cum rămâne ea ia?',
        '4) Dă trei forme de acuzativ și trei de dativ. Ce arată cratima din Nu i-a luat nimeni nimic?'
      ].join('\n\n'),
      answers: [
        'Singular: eu, tu, el, ea. Plural: noi, voi, ei, ele. Genul se aude numai la a III-a.',
        'Scrii Eu și Ea. M-a, l-a și mi-a lipesc pronumele de verb. Miau este pisica. Nea Ion este chemare, iar ne-a este pronume cu auxiliar.',
        'Puștiul devine el, sora devine ea. Gabi judecă drept, Ionel se înșală. Ea ia rămâne fără cratimă, fiindcă ia este verb.',
        'Acuzativ, de pildă: mă, te, îl. Dativ, de pildă: mie, ție, lor. În Nu i-a luat nimeni nimic, cratima rămâne.'
      ],
      mistakes: 'Nu scrie Ieu sau Ia. Nu confunda Miau cu Mi-au și nu confunda nea cu ne-a. Nu pune cratimă în ea ia.',
      tryThis: 'Scrie propoziții scurte cu eu, cu tu, cu el și cu ea, apoi cu noi, cu voi, cu ei și cu ele. Arată cratima în m-a, în l-a și în mi-a. Desparte Mi-au de Miau și ne-a de chemarea Nea Ion. Înlocuiește puștiul și sora. Spune că Gabi judecă drept, iar Ionel se înșală.',
      keyPoints: [
        'Pronumele personal ține locul unui nume. Genul se aude numai la a III-a. Scrii Eu și Ea, nu Ieu și nu Ia.',
        'Cratima lipește pronumele când nu e subiect, ca în m-a și în l-a. Miau este pisica. Nea este chemarea.',
        'Gabi judecă drept, Ionel se înșală. Ea ia rămâne verb, fără cratimă. Formele de acuzativ și de dativ se învață pe grupe.'
      ]
    }),
    lesson({
      id: 'compunere-eroica',
      title: 'Compunerea despre o faptă',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Trei alineate',
        text: 'Compunerea spune o faptă pe care o poți admira, fie că ai văzut-o, fie că ai auzit-o, fie că ai citit-o. Are titlu. Are trei alineate. În ea stau minimum doi oameni.'
      }],
      theory: [
        'Între cei doi pui o legătură: bună, rea sau neutră. Nu o lași nespusă.',
        'Clipa se dă printr-o dată sau printr-un numeral. Fără ea, cititorul nu știe când s-a petrecut fapta.',
        'Locul și oamenii se scriu ca nume plus însușire. Băiatul curajos este un astfel de grup. Geamul gros este altul.',
        'Pronumele arată pe cine înlocuiește. Dacă scrii el, spui că el este băiatul, nu fratele.',
        'Timpurile țin firul faptelor. Nu sari la sfârșit și apoi te întorci fără semn.',
        'Era ora două. Băiatul curajos, cel din sat, a spart geamul cel gros. Apoi l-a scos pe fratele mic. El îl înlocuiește pe băiat. Legătura dintre ei este bună.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Titlul nu repetă primul rând. El numește fapta. Cele trei alineate despart începutul, mijlocul și urmarea.',
        'Dacă ai un singur om, textul nu e gata. Al doilea poate fi fratele, un vecin sau cel salvat.',
        'O legătură rea se spune la fel de limpede ca una bună. Neutră înseamnă că nu se ajută și nu se dușmănesc.',
        'La clasă, fapta poate fi alta. Piesele rămân: titlu, trei alineate, doi oameni, o legătură, o clipă, un pronume.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: pe la ora două, băiatul curajos din sat sparge geamul cel gros și îl scoate afară pe fratele mic.',
        'Ce observ: Văd băiatul, geamul spart și fratele. Aș rămâne lângă cel mic, pentru că tocmai a fost scos, iar legătura lor este bună.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă scrii ea în loc de el, pronumele nu mai cade pe băiat. Verifici înlocuirea înainte să închizi alineatul.'
      }],
      tryThis: 'Scrie compunerea: pune titlu, apoi trei alineate. Pune minimum doi oameni, o legătură între ei, un numeral pentru clipă și un pronume care înlocuiește un nume. Încheie cu o faptă a ta, motivată prin pentru că.',
      keyPoints: [
        'Compunerea are titlu și trei alineate. În ea stau minimum doi oameni și o legătură bună, rea sau neutră.',
        'Clipa se dă printr-o dată sau printr-un numeral. Locul și oamenii stau ca nume plus însușire.',
        'Pe la ora două, băiatul curajos sparge geamul gros și îl scoate pe fratele mic. El cade pe băiat, nu pe frate.'
      ]
    }),
    lesson({
      id: 'politete',
      title: 'Politețea și pronumele de politețe',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Distanța în vorbire',
        text: 'Pronumele de politețe măsoară distanța față de omul cu care vorbești sau despre care vorbești. Nu stă la persoana I. Stă la a II-a și la a III-a.'
      }],
      theory: [
        'Distanța mare se spune prin dumneavoastră. Verbul rămâne la plural chiar pentru o singură persoană. Modelul este Dumneavoastră citiți.',
        'Distanța medie se spune prin dumneata. Dumitale stă la același nivel de apropiere.',
        'Despre o persoană de care vorbești stau dumnealui și dumneaei. Pentru mai mulți stă dumnealor. Nu le coborî la persoana I.',
        'Mata, ca și matale, se spune către un părinte sau către un bunic. Mai apar dânsul și dumisale.',
        'Acasă se aud mătălică și mătăluță. Se mai aud tălică și tăluță. La primărie nu le folosești.',
        'La primărie spui dumneavoastră. La fel la spital și la secretariat. Cu cineva de o vârstă cu tine spui tu. Un om în vârstă îi poate spune unui tânăr dumneata.',
        'Textul de reper se numește Scrisoarea III. L-a scris Mihai Eminescu. Are două părți. Din el înveți respectul și sensul lui domn.',
        'Întâi vezi năvălirea otomană în Țara Românească. Apare solul. Apare Baiazid. Vremea este a lui Mircea cel Bătrân. A doua parte judecă prezentul.',
        'Tema ține de dragostea pentru țară și de istorie. Nu ține de copilărie. Atunci, domn numea conducătorul. Azi este și o formulă de politețe.',
        'Jurnalul dublu desparte foaia în două coloane. Solul cere pace și pomenește domnul nostru. Baiazid i se adresează lui Mircea fără respect. Tonul disprețuiește.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că. Nu copia versuri.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: solul cere pace și pomenește domnul nostru. Baiazid i se adresează lui Mircea pe un ton care disprețuiește.',
        'Ce observ: Îi văd pe sol, apoi pe Baiazid, apoi pe Mircea. Aș vorbi liniștit, pentru că tonul lui Baiazid nu ține de respect. La secretariat aș spune Dumneavoastră citiți.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Unui coleg de o vârstă cu tine îi spui tu. Bunicii îi spui mata. Un om în vârstă îi poate spune unui tânăr dumneata.'
      }],
      tryThis: [
        'La primărie, copilul alege dumneavoastră și lasă verbul la plural. Acasă, către bunică, alege mata. Un om în vârstă îi spune unui tânăr dumneata.',
        'Pace o cere solul, care pomenește domnul nostru. Baiazid vorbește fără respect. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.',
      ].join('\n\n'),
      keyPoints: [
        'Dumneavoastră ține verbul la plural. Dumneata este distanța medie. Mata se spune către părinte sau către bunic.',
        'Scrisoarea III o semnează Mihai Eminescu și are două părți: năvălirea din vremea lui Mircea cel Bătrân, apoi judecata prezentului. Tema este țara și istoria.',
        'Solul cere pace. Baiazid disprețuiește. La secretariat stă dumneavoastră, iar către coleg stă tu.'
      ]
    }),
    lesson({
      id: 'marca-persoanei',
      title: 'Vocea, gestul și textul literar',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Politețe dincolo de cuvânt',
        text: 'Marca persoanei arată politețea și când nu stă în cuvânt: o vezi în gest și o auzi în voce. Intri aici postura, tonul și intonația.'
      }],
      theory: [
        'Stai la rând. Refuzi fără să jignești. Saluți. Lași loc între tine și celălalt, chiar dacă e coleg. Un cuvânt politicos, fără gest, rămâne pe jumătate.',
        'Cu majusculă, Apus numește Occidentul, iar Răsărit numește Orientul. Cu literă mică, apus numește asfințitul. Aceeași silabă, două sensuri.',
        'De la un conducător aștepți dragoste pentru țară și demnitate. Trufia nu intră. Nici supunerea.',
        'Baiazid arată că disprețuiește. Nu pune o întrebare ca să afle ceva. Tonul lui nu este politicos.',
        'Cratima grăbește rostirea. O auzi când pronumele se lipește de verb. Fără ea, grupul se desface și se aude mai rar.',
        'Unii eroi dispar. Iubirea de țară poate rămâne. Nu lega valoarea de un singur nume care trece.',
        'Cine este personajul, unde stă și când se petrece fapta se citesc în textul de la oră. Nu le inventa dacă textul le dă.',
        'Ana stă la rând, îl salută pe coleg și lasă distanță. Vocea ei rămâne calmă. Gestul și tonul spun aceeași politețe.',
        'Când vrea Occidentul, scrie Apus cu literă mare. Când vrea asfințitul, scrie apus cu literă mică. Verifici majuscula înainte să alegi sensul.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Dacă ridici vocea și te lipești de om, salutul nu mai ajunge. Distanța face parte din marcă.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: Ana stă la rând, salută și lasă distanță față de coleg. Vocea rămâne calmă.',
        'Ce observ: O văd pe Ana lângă un coleg, dar nu lipită de el. Aș saluta și aș aștepta, pentru că politețea ei stă și în gest.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Răsărit cu literă mare numește Orientul. Apus cu literă mică numește asfințitul. De la conducător aștepți demnitate, nu supunere.'
      }],
      practice: [
        '1) Ce face Ana ca să se vadă politețea în afara cuvântului? Ce rol au vocea și distanța?',
        '2) Ce numesc Apus și Răsărit când au majusculă? Ce numește apus scris cu literă mică?',
        '3) Ce aștepți de la un conducător și ce lași afară? Ce arată Baiazid?',
        '4) Ce face cratima când rostești? Ce poate rămâne după ce unii eroi dispar?'
      ].join('\n\n'),
      answers: [
        'Ana stă la rând, salută și lasă distanță. Vocea calmă și distanța țin de politețe, nu doar cuvântul.',
        'Cu majusculă, Apus este Occidentul, iar Răsărit este Orientul. Cu literă mică, apus este asfințitul.',
        'Aștepți dragoste pentru țară și demnitate. Lași afară trufia și supunerea. Baiazid disprețuiește și nu caută o informație.',
        'Cratima grăbește rostirea. Iubirea de țară poate rămâne după ce unii eroi dispar.'
      ],
      mistakes: 'Nu citi Apus cu majusculă ca asfințit și nu căuta trufia la un conducător bun. Nu anula distanța doar fiindcă saluți.',
      tryThis: 'Un băiat salută, stă la rând și refuză fără jignire o îmbrânceală. Scrie Răsărit cu literă mare când vrei Orientul și apus cu literă mică când vrei asfințitul. Vocea rămâne calmă. De la conducător așteaptă demnitate, nu supunere. Trei enunțuri, iar observația pornește cu Văd.',
      keyPoints: [
        'Politețea stă și în gest, în postură, în ton și în intonație. Stai la rând, saluți și lași distanță.',
        'Cu majusculă, Apus este Occidentul, iar Răsărit este Orientul. Cu literă mică, apus este asfințitul.',
        'De la conducător aștepți demnitate și dragoste pentru țară, nu trufie și nu supunere. Cratima grăbește rostirea.'
      ]
    }),
    lesson({
      id: 'recap-eroi',
      title: 'Recapitulare și evaluare',
      kind: 'recapitulare',
      boxes: [{
        type: 'regula',
        title: 'Închiderea anului',
        text: 'Proba de la final închide clasa a V-a. Cuprinsul este cel de aici. Ești gata când știi să desparți relatarea de povestirea literară și când pui pronumele potrivit în locul unui nume.',
      }],
      theory: [
        'Formula o alegi după situație. Către o profesoară cu care nu ești la per tu spui Dumneavoastră ați rămas după oră. Verbul rămâne la plural.',
        'Către un coleg de o vârstă cu tine spui tu. Distanța decide, nu obișnuința.',
        'Un personaj poate fi model doar dacă arăți o faptă. Fără faptă, modelul rămâne o etichetă.',
        'Proba stă pe textul din fața ta, la această verificare. Nu stă pe nume celebre învățate pe dinafară.',
        'Ții minte participantul. Ții minte pronumele personal. Ții minte pronumele de politețe. Ții minte fapta care poate fi model, locul și clipa.',
        'Maria a dat o mână de ajutor, apoi ea a mai rămas după oră. Ea ține locul numelui Maria. Textul este o relatare.',
        'Relatarea spune o faptă adevărată, cu oameni care pot fi numiți. Povestirea literară își construiește lumea. Una informează. Cealaltă imaginează.',
        'Dacă pui dumneavoastră și lași verbul la singular, acordul se strică. Pluralul rămâne chiar pentru o singură persoană.',
        'Locul și clipa se spun limpede. Fără ele, fapta de model plutește.',
        'În portofoliu poți pune o propoziție în care înlocuiești un nume și alta în care alegi formula de politețe.',
        'Anul de clasa a V-a se închide când poți face aceste lucruri pe textul din fața ta, nu când reciți nume celebre.'
      ].join('\n\n'),
      example: [
        'Maria ajută, apoi ea mai zăbovește după oră. Ea ține locul numelui. Textul este o relatare.',
        'Către profesoară spui Dumneavoastră ați rămas după oră, cu verbul la plural. Către un coleg de o vârstă cu tine spui tu.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă povestirea își inventează eroul, nu o confunda cu relatarea. Modelul se dovedește printr-o faptă, nu printr-un nume învățat pe dinafară.'
      }],
      tryThis: 'Scrie o relatare scurtă. Pune un participant, un pronume personal și unul de politețe. Înlocuiește un nume. Către profesoară folosește dumneavoastră, cu verbul la plural. Către un coleg folosește tu. Arată, printr-o faptă, de ce un personaj poate fi model și cum desparți relatarea de povestirea care imaginează. Nu uita locul și clipa.',
      keyPoints: [
        'Ești gata când desparți relatarea de povestirea literară și când pui pronumele potrivit în locul numelui.',
        'Către profesoară stă dumneavoastră, cu verbul la plural. Către colegul de o vârstă cu tine stă tu.',
        'Proba stă pe textul din fața ta. Ții minte participantul, cele două pronume, fapta de model, locul și clipa.'
      ]
    })
  ]
};
