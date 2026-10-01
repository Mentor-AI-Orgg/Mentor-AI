'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  id: 'lume-sentimente',
  title: 'O lume plină de sentimente',
  inOwnWords: 'Aici liricul se judecă pe emoție, nu pe rimă. Versificația se numără pe rândul deschis. Argumentarea ține pro și contra în ordine. Coordonarea pune virgula la locul ei, iar subordonarea se transcrie cu elementul de relație.',
  toc: [
    'Ce este liric, pe text',
    'Mesajul Fântânii',
    'Măsură și rimă',
    'Argumente în ordine',
    'Coordonarea și virgula',
    'Subordonarea',
    'Elipsa și apoziția',
    'O zi pentru poezie',
    'Târguri și traduceri',
    'Recapitularea sentimentelor'
  ],
  glossary: [
    {
      term: 'liric',
      meaning: 'Text în care emoția stă în prim-plan. Versificația nu este trăsătura lui definitorie.'
    },
    {
      term: 'monorimă',
      meaning: 'Toate versurile unei strofe rimează între ele: a, a, a, a.'
    },
    {
      term: 'joncțiune',
      meaning: 'Legătura dintre propoziții printr-o conjuncție: și, dar, sau, deci.'
    }
  ],
  lessons: [
    lesson({
      id: 'text-liric',
      title: 'Liricul nu este versificația',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Liric',
          text: 'Trăsătura de ținut este subiectivitatea: o voce spune ce simte. Rima poate apărea și în epic, și în dramatic. Există și proză lirică.'
        }
      ],
      theory: [
        'La mesajul unei poezii se punctează emoția, tema, tabloul și figurile, nu definiția de dicționar. Persoana I este caracteristică, nu obligatorie în fiecare rând.',
        'Prezentul este timpul des, nu singurul timp posibil. Emoția se transmite direct. De aceea patru enunțuri se judecă așa.',
        'Versificația este principala trăsătură: fals. Pronumele și verbele sunt numai la persoana I: fals. Verbele sunt doar la prezent: fals. Textul liric transmite emoții direct: adevărat.',
        'Exprimarea directă a sentimentelor se face des cu verbe la persoana I. Asta nu închide liricul într-o singură formă.',
        'Dorința, de Mihai Eminescu, a apărut în 1876, în Convorbiri literare, apoi în volumul Poesii, din 1883. Versurile nu se lipesc aici.',
        'Valoarea de rezervă, pentru asociere: dorul de un loc liniștit, lângă cineva drag. La examen, măsura și rima se iau de pe rândul deschis.',
        'O scenă scurtă ține loc de text. O voce vrea un colț de pădure și spune dorul la persoana I. Locul gol de lângă ea arată că lipsește cineva. Emoția stă în față, chiar dacă rândurile nu rimează.',
        'Tema scenei este dorul de liniște. Tabloul este pădurea. Emoția este lipsa. Dacă schimbi scena într-o întâmplare cu deznodământ, textul nu mai este liric, chiar dacă păstrezi persoana I.'
      ].join('\n\n'),
      example: [
        'Ce scrie: o voce vrea un loc liniștit și spune dorul la persoana I. Ce vezi: îl văd pe cel care vorbește, cu un colț de pădure în față.',
        'Eu aș lăsa un loc gol lângă mine, pentru că dorul este după cineva care lipsește. Eminescu a publicat Dorința în 1876. Proza poate fi lirică dacă emoția stă în față.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un jurnal de două rânduri, la persoana I, despre o pădure liniștită, poate fi liric. O baladă cu rimă, care povestește o bătălie până la deznodământ, rămâne epică. Rima nu decide specia.'
        }
      ],
      tryThis: 'Răspunde adevărat sau fals la cele patru enunțuri despre versificație, persoana I, prezent și emoție. Notează anul 1876, revista și anul volumului Poesii. Scrie, în 40–60 de cuvinte, o asociere: valoarea dorul de liniște, cu titlul Dorința și cu autorul Mihai Eminescu, fără versuri.',
      keyPoints: [
        'Liricul are în centru emoția, nu rima.',
        'Persoana I și prezentul sunt dese, nu unice.',
        'Dorința a apărut în 1876, în Convorbiri literare, și a intrat în Poesii în 1883.'
      ]
    }),
    lesson({
      id: 'mesaj-fantana',
      title: 'Mesajul de la fântână',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Compunerea de mesaj',
          text: 'Cere opinia, două argumente pe text, o încheiere și cel puțin 150 de cuvinte. Strofele nu se copiază.'
        }
      ],
      theory: [
        'Fântâna, de Alexandru Macedonski, a apărut în 1892, în revista Literatorul, apoi în volumul Excelsior, din 1895. El a înființat revista Literatorul.',
        'Ideea, fără versuri: vocea cunoaște o fântână pe o vale umbrită și vrea să adoarmă acolo, ca să uite orașul. O pasăre râde, el oftează.',
        'Temele care se potrivesc sunt natura și retragerea din oraș, nu istoria. Opoziția dintre viața obosită din oraș și armonia naturii este în text.',
        'Verbele de tip să adorm și să uit arată dorința de a ieși în spațiul natural. Titlul numește locul ascuns în care vocea vrea să se retragă, nu o fântână de oraș.',
        'În 30–50 de cuvinte, fântâna ascunsă înseamnă un loc ferit, departe de orașul care o obosește. Nu este o construcție de inventariat.',
        'Vers și viers sunt paronime. Versul este rândul de poezie. Viersul este cântecul, glasul. Cunosc este indicativ prezent, persoana I. Am oftat este perfect compus, persoana I.',
        'Pe schema învățată pentru acest text, măsura este de 11 și de 12 silabe, iar rima este încrucișată. La teză numeri rândul din față.',
        'Metafora pune durerea în rol de stăpână. Personificarea dă păsării un râs. Epitetul dă culoare păsării și umbră văii. Repetiția aduce iar fântâna și valea.',
        'Câmpul păsărilor: grangur și mierlă. A suferi este și a îndura o durere, și a admite o excepție. Râs, hohotul, are ca omonim râsul, animalul. Valoarea pentru asociere: nevoia de un loc în care să te oprești.'
      ].join('\n\n'),
      example: [
        'Opinie: mesajul este retragerea din oraș spre un loc viu. Argumentul întâi: vocea vrea să uite orașul lângă fântână.',
        'Argumentul al doilea: râsul păsării și oftatul lui stau față în față, deci natura rămâne întreagă, iar el rămâne obosit. Încheiere: titlul nu numește o construcție, ci adăpostul.',
        'Anul revistei este 1892. Anul volumului este 1895.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Versul de pe tablă este un rând. Viersul ciobanului este un cântec. Dacă le schimbi, paronimul cade. Râsul din iarbă poate fi animalul, nu hohotul.'
        }
      ],
      tryThis: 'Spune anii 1892 și 1895 și numele revistei. Alege temele potrivite dintre natură, istorie și iubire. Scrie vers și viers în câte un enunț. Analizează cunosc și am oftat: mod, timp, persoană. În 30–50 de cuvinte, spune ce înseamnă fântâna ascunsă.',
      keyPoints: [
        'Fântâna a apărut în 1892 în Literatorul și în 1895 în Excelsior.',
        'Mesajul este retragerea din oraș către un loc viu.',
        'Versul este rândul, viersul este cântecul, iar rima din schemă este încrucișată.'
      ]
    }),
    lesson({
      id: 'versificatie',
      title: 'Măsura, rima, versul alb',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Măsura',
          text: 'Măsura este numărul de silabe din versul pe care îl ai în față. Nu se ghicește din titlu.'
        }
      ],
      theory: [
        'Rima se spune după schemă. Împerecheată: a, a, b, b. Îmbrățișată: a, b, b, a. Încrucișată: a, b, a, b. Monorimă: a, a, a, a. Versurile fără rimă sunt albe.',
        'Versificația are reguli de rimă: adevărat. Ea ține de muzicalitatea poeziei, adică de sunetul și de ritmul rândurilor: adevărat.',
        'Enunțul că ea nu caracterizează deloc textul liric este fals ca formulă absolută. Poate apărea și în alte tipuri, dar nu lipsește din liric prin definiție. Ritmul se simte. Nu se cere o formulă.',
        'La Sara pe deal, de Mihai Eminescu, primul vers are 12 silabe, rima este împerecheată, iar strofele sunt catrene, de câte patru versuri. Poezia nu se lipește.',
        'Model original de împerecheată: Seara coboară lin pe dealul gol. Dacă numeri silabele și îți ies 12, măsura este 12. Al doilea rând, ca să țină schema a, a, se încheie cu același sunet.',
        'Ana Blandiana, pe numele din acte Otilia Valeria Rusan, s-a născut în 1942. La un festival, măsura se ia tot de pe rând, nu din biografie.',
        'Versurile albe nu au rimă și pot fi totuși lirice, pentru că emoția nu stă în rimă. Un catren cu rimă poate fi și el liric, dacă emoția stă în față.',
        'La școală, numără silabele cu voce tare, pe rândul tipărit. Dacă îți iese alt număr decât 12, nu forța măsura din memorie.'
      ].join('\n\n'),
      example: [
        'Numără: Sea-ra co-boa-ră lin pe dea-lul gol. Dacă îți ies 12, măsura este 12. Rima cu un al doilea rând care se încheie la fel este împerecheată doar dacă al treilea schimbă sunetul.',
        'Sara pe deal: primul vers, 12 silabe, rimă împerecheată, strofe de patru versuri. Versul alb poate rămâne liric.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Patru finale inventate: lac, drac, foc, joc. Schema aaaa este monorimă. Dacă al treilea sunet se schimbă, nu mai este monorimă, chiar dacă strofa are tot patru rânduri.'
        }
      ],
      tryThis: 'Definește măsura și cele patru tipuri de rimă, plus versul alb. Spune măsura, rima și tipul de strofă la Sara pe deal, fără să copiezi versul. Numără silabele dintr-un rând scris de tine. Notează numele din acte al Anei Blandiana și anul nașterii.',
      keyPoints: [
        'Măsura se numără pe versul deschis.',
        'Rima este împerecheată, îmbrățișată, încrucișată sau monorimă. Versul alb nu are rimă.',
        'La Sara pe deal, primul vers are 12 silabe, rima este împerecheată, strofa este catren.'
      ]
    }),
    lesson({
      id: 'argument-online',
      title: 'Pro, contra și ordinea',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Ordinea',
          text: 'Ipoteză, argumente cu exemplu, concluzie. Conectorii se punctează la compunerea de cel puțin 150 de cuvinte, nu la opinia scurtă.'
        }
      ],
      theory: [
        'Conectorii leagă paragrafele: în primul rând, în al doilea rând, pe de-o parte, pe de altă parte, totuși, în concluzie. Argumentele se ordonează: primul este cel mai important pentru tine.',
        'Comparația pune două lucruri alături. Analogia este o asemănare parțială. Pro și contra stau în două coloane, apoi alegi.',
        'Pe textul despre rețele, ipoteza este că internetul domină comunicarea. Argument: rețelele au schimbat vorbirea de zi cu zi.',
        'Exemplul din text, nu o cifră de azi: la începutul lui 2018, Facebook avea peste două miliarde de utilizatori. Unele rețele au un scop îngust.',
        'Twitter este microblogging. LinkedIn este pentru lucru. Goodreads este o bază de cărți în care cititorii discută și notează. Analogia: Goodreads și un club de lectură din școală adună cititori în jurul cărților.',
        'Concluzia textului: mijloacele online intră în viața de toate zilele, de la afacere până la relații.',
        'Inteligența artificială, cum este lămurită în lecție, este capacitatea unei mașini de a imita raționamentul, învățarea, planificarea și creativitatea.',
        'Unele tehnologii au peste 50 de ani. Au crescut prin puterea de calcul, prin cantitatea de date și prin algoritmi noi. Este o prioritate a Uniunii Europene.',
        'Se vede la cumpărăturile cu recomandări, la căutare, la asistenții din telefon, la traducerea automată și la detectarea știrilor false, după cuvinte senzaționale și după sursă.'
      ].join('\n\n'),
      example: [
        'Ipoteză: inteligența artificială poate ajuta la învățare, cu o limită. În primul rând, căutarea și traducerea scurtează drumul până la o sursă.',
        'În al doilea rând, recomandarea după căutările vechi poate închide omul în ce știa deja. Totuși, eu o folosesc ca să verific un cuvânt, nu ca să scriu tema în locul meu.',
        'În concluzie, ajută când rămâne unealtă. Două miliarde este cifra din text, de la începutul lui 2018, nu un număr de azi.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Analogie scurtă: Goodreads adună cititori în jurul cărților, cum adună un club de lectură elevii în jurul aceleiași povești. Asemănarea este parțială: unul este online, celălalt este în sală.'
        }
      ],
      tryThis: 'Notează ipoteza, două argumente și concluzia textului despre rețele. Spune ce sunt Twitter, LinkedIn și Goodreads. Pune trei argumente pro și trei contra pentru ideea că comunicarea online este utilă tinerilor. Definește inteligența artificială cu cele patru funcții din lecție.',
      keyPoints: [
        'Argumentarea are ipoteză, argumente cu exemplu și concluzie.',
        'La începutul lui 2018, textul dă Facebook peste două miliarde de utilizatori.',
        'Inteligența artificială imită raționamentul, învățarea, planificarea și creativitatea.'
      ]
    }),
    lesson({
      id: 'coordonare',
      title: 'Virgula la coordonare',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Virgula',
          text: 'Înainte de și, nici, sau, ori și fie nu se pune virgulă când leagă direct. Înainte de dar, iar, însă, ci și deci, virgula este obligatorie.'
        }
      ],
      theory: [
        'Fraza are cel puțin două propoziții, deci cel puțin două predicate. Coordonarea leagă propoziții care pot sta și singure.',
        'Juxtapunerea le pune cu virgulă sau cu punct și virgulă, fără conjuncție. Joncțiunea le leagă prin conjuncție.',
        'Copulative: și, nici. Disjunctive: fie, sau, ori. Adversative: dar, iar, însă, ci. Concluzive: deci.',
        'Maria citește și sora ei scrie, fără virgulă înainte de și. Maria citește, iar sora ei scrie, cu virgulă. Maria a terminat, deci va pleca, cu virgulă.',
        'Am participat, dar nu am câștigat: virgula este corectă. Fie stai, fie pleci: coordonare disjunctivă. Ana și Dan au râs și cântat conține conjuncția și, chiar dacă aici leagă părți din aceeași propoziție.',
        'Interpretarea ei mi-a plăcut; mult: punctul și virgula nu pot sta înaintea unui singur cuvânt lăsat în aer. Enunțul este greșit.',
        'Alexandru Macedonski a publicat volume și a înființat Literatorul: două predicate, coordonare prin și. Fără și, dacă stau doar cu virgulă, este juxtapunere.',
        'Înainte de a pune virgula, întreabă dacă legătura este și sau dar. Și nu o cere. Dar o cere. Aceeași frază își schimbă semnul odată cu conjuncția.'
      ].join('\n\n'),
      example: [
        'Predicate: a publicat și a înființat. Este frază. Legătura prin și este joncțiune copulativă, fără virgulă înainte de și.',
        'Am plecat la bibliotecă, voi împrumuta acea carte: două predicate, juxtapunere, virgula ține loc de conjuncție.',
        'Am participat dar nu am câștigat, fără virgulă, nu respectă regula adversativului.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ori citești, ori scrii. Disjunctivă, fără virgulă înainte de ori. Citești, deci înțelegi. Concluzivă, cu virgulă înainte de deci.'
        }
      ],
      practice: [
        '1) Pune virgula doar unde trebuie: Maria citește iar sora ei scrie.',
        '2) Spune dacă Am participat, dar nu am câștigat are virgula corectă.',
        '3) Arată predicatele din fraza despre Macedonski și spune dacă legătura este juxtapunere sau joncțiune.',
        '4) Spune de ce punctul și virgula nu pot sta înaintea lui mult singur.'
      ].join('\n\n'),
      answers: [
        'Maria citește, iar sora ei scrie.',
        'da, virgula este corectă',
        'a publicat și a înființat; joncțiune',
        'nu poate sta înaintea unui rest de un cuvânt'
      ],
      mistakes: 'Virgula înainte de și, când și leagă direct, este în plus. Lipsa virgulei înainte de dar este greșeală.',
      tryThis: 'Construiește patru fraze scurte, cu și, dar, sau și deci. Pune virgula doar unde regula o cere.',
      keyPoints: [
        'Coordonarea leagă propoziții care pot sta singure.',
        'Și, nici, sau, ori și fie nu cer virgulă înainte.',
        'Dar, iar, însă, ci și deci cer virgulă. Juxtapunerea nu are conjuncție.'
      ]
    }),
    lesson({
      id: 'subordonare',
      title: 'Elementul de relație intră în transcriere',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Să',
          text: 'Când deschide o subordonată, să este și conjuncție, și marca conjunctivului. Singur, ca îndemn, nu face o subordonată.'
        }
      ],
      theory: [
        'Subordonarea leagă o regentă de o propoziție care nu stă singură cu același sens. Mi-a adus cartea, a găsit-o este coordonare: ambele pot sta singure.',
        'Mi-a adus cartea pe care a găsit-o este subordonare: pe care a găsit-o nu stă singură. Elementul de relație intră în transcriere.',
        'Conjuncții subordonatoare: să, că, ca să, dacă, deși, căci, deoarece, fiindcă. Pronume relative: cine, ce, care, cât. Adverbe relative: unde, cum, când.',
        'Deși și dacă apar ca elemente, dar condiționala și concesiva nu sunt în programa de examen. Le recunoști ca formă, nu le exersezi ca item.',
        'Ceea ce se transcrie rămâne atributiva, completivele și circumstanțialele de loc, timp, mod, cauză și scop.',
        'M-a rugat să o ajut: să o ajut este subordonată, să este conjuncție, să ajut este conjunctiv. Să mergem la sală, ca îndemn, nu are regentă.',
        'Fraza rezolvată: El a ajuns când noi plecam și ne-a dat cheia. Predicate: a ajuns, plecam, a dat. Când noi plecam este de timp. Între a ajuns și ne-a dat este coordonare prin și.',
        'Nu am aflat cui i-a dat telefonul: cui este pronume relativ. Întrebarea este ce nu am aflat, deci completivă directă. El caută o persoană care să știe: atributivă.'
      ].join('\n\n'),
      example: [
        'Transcriere: când noi plecam. Felul: circumstanțială de timp. Elementul: când, adverb relativ.',
        'Din Nu am aflat cui i-a dat telefonul: cui i-a dat telefonul. Elementul cui este pronume relativ. Felul: completivă directă.',
        'Să o ajut, din M-a rugat să o ajut, este completivă directă. Să mergem singur nu este subordonată.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Nu ne așteptam să-i întâlnim. Subordonata este să-i întâlnim. Felul: completivă directă. Să este conjuncție și marcă de conjunctiv. Regenta este nu ne așteptam.'
        }
      ],
      practice: [
        '1) Pe El a ajuns când noi plecam și ne-a dat cheia, spune care raport este subordonare și care este coordonare.',
        '2) Transcrie subordonata din Nu am aflat cui i-a dat telefonul și spune ce este cui.',
        '3) Spune rolul lui să în Să mergem la sală și în M-a rugat să o ajut.'
      ].join('\n\n'),
      answers: [
        'când noi plecam este subordonare; ne-a dat cheia se coordonează cu a ajuns',
        'cui i-a dat telefonul; pronume relativ',
        'în îndemn este doar marcă de conjunctiv; în subordonată este și conjuncție'
      ],
      mistakes: 'Dacă lași cui afară, transcrierea este incompletă. Să mergem, fără regentă, nu se etichetează completivă.',
      tryThis: 'Construiește o atributivă cu care și o completivă directă cu că. Nu construi seturi cu deși.',
      keyPoints: [
        'Subordonata nu stă singură și se transcrie cu elementul de relație.',
        'Când este adverb relativ, cui este pronume relativ, că și să sunt conjuncții.',
        'În fraza cu cheia, când noi plecam este de timp, iar ne-a dat cheia se coordonează cu a ajuns.'
      ]
    }),
    lesson({
      id: 'elipsa-apozitie',
      title: 'Omisiunea și apoziția, o mențiune',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Două noțiuni',
          text: 'Elipsa recuperează un cuvânt spus înainte. Apoziția explică un cuvânt și este echivalentă cu el. Nu sunt item de examen.'
        }
      ],
      theory: [
        'Enunțul eliptic a pierdut un cuvânt care a fost spus înainte. Omisiunea se marchează, de obicei, cu virgulă sau cu linie de pauză.',
        'El citește poezii, iar ea, povești înseamnă iar ea citește povești. În dreapta este lacul, în stânga – pădurea înseamnă în stânga este pădurea.',
        'Îmi place la munte, dar la mare, nu: lipsește îmi place. Sus este foarte frig, dar aici – plăcut: lipsește este. El a escaladat Alpii, ea – Himalaya: lipsește a escaladat.',
        'Afară, strigat din senin, nu este elipsă de acest fel, pentru că verbul nu a fost spus înainte. Este o omisiune de îndemn.',
        'Apoziția se izolează prin virgule, linii de pauză sau două puncte. Alina, colega noastră, este pasionată. Poate fi substantiv, pronume, numeral sau formă nepersonală.',
        'L-am văzut pe Mihai, pe colegul meu: ambele sunt acuzativ, apoziția preia cazul. L-am văzut pe Mihai, colegul meu: colegul rămâne nominativ.',
        'I-am dat lui Andrei, colegului meu: apoziția preia dativul. Cartea lui Andrei, a colegului meu: preia genitivul.',
        'Ioana, sora mea este apoziție simplă. Mihaela, sora prietenei mele este dezvoltată, pentru că sora prietenei mele este un grup.',
        'Adverbe care o introduc: adică, respectiv, și anume, mai exact. Autorul textului, Mihai este apoziție, izolată prin virgulă.'
      ].join('\n\n'),
      example: [
        'Vii cu noi mâine? Da, vin. Contextul arată cuvântul lipsă. Ioana, sora mea, a vizitat Parisul: sora mea este apoziție simplă, între virgule.',
        'L-am văzut pe Andrei, pe colegul meu: apoziția preia acuzativul. L-am văzut pe Andrei, colegul meu: nu îl preia. Afară nu recuperează un verb spus înainte.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Cartea, adică romanul de pe raft, este a ei. Adică introduce apoziția. Romanul de pe raft explică cartea și se poate scoate fără să cadă subiectul.'
        }
      ],
      practice: [
        '1) Completează cuvântul lipsă în El a escaladat Alpii, ea – Himalaya.',
        '2) Spune de ce Afară nu este același tip de elipsă.',
        '3) Spune dacă în pe colegul meu cazul este preluat.',
        '4) Notează două adverbe care introduc apoziția.'
      ].join('\n\n'),
      answers: [
        'a escaladat',
        'verbul nu a fost spus înainte',
        'da, preia acuzativul',
        'adică, respectiv'
      ],
      mistakes: 'Apoziția nu se confundă cu atributiva. Apoziția nu are predicat propriu. Atributiva are.',
      tryThis: 'Identifică apoziția din Ioana, sora mea. Notează și anume și mai exact lângă cele două adverbe deja scrise. Nu scrie o compunere doar ca să numeri apoziții.',
      keyPoints: [
        'Elipsa recuperează un cuvânt spus înainte, marcat cu virgulă sau cu linie de pauză.',
        'Apoziția explică și se izolează prin virgule, linii sau două puncte.',
        'Poate prelua cazul, ca pe colegul meu, sau poate rămâne în nominativ.'
      ]
    }),
    lesson({
      id: 'poezie-zi',
      title: 'Ziua poeziei și pălăriile',
      kind: 'comunicare',
      boxes: [
        {
          type: 'atentie',
          title: 'Oralul',
          text: 'Pălăriile sunt puncte de vedere pentru o discuție. Proba de examen rămâne scrisă. Nu inventa un record care nu este în sursă.'
        }
      ],
      theory: [
        'Ziua Internațională a Poeziei a fost declarată de UNESCO la 21 martie, din anul 1999. În România, mai multe instituții marchează ziua.',
        'La Colegiul I.L. Caragiale din Ploiești, elevii au vrut să scrie versuri și formule matematice pe 5 kilometri de rolă, prin școală, ca să intre într-o carte a recordurilor. Știrea este adaptată după zvp.',
        'O a doua știre, de Cristina Radu, descrie tramvaiul poeziei din aceeași zi. Elevi de la Colegiul Național Gheorghe Șincai recită, cu orgă, chitară și vioară de la o școală de arte.',
        'Traseul merge de la Depoul Victoriei, cel mai vechi depou al STB, până în Piața Bucur Obor. Pensionarii recită texte cunoscute. Alex, de 16 ani, elev la Colegiul Tehnic de Arhitectură I.N. Socolescu, spune că lumea ar trebui îndrumată spre poezie.',
        'O călătoare pune un poet lângă altul. Versurile unui angajat nu se copiază. Faptul verificabil rămâne data și traseul.',
        'Pălăriile sunt puncte de vedere, nu o lecție de examen. Alba este obiectivă: spune faptele. Galbenă este entuziastă: spune avantajele. Neagră este pesimistă: spune piedicile.',
        'Roșie este emotivă: spune ce simți. Verde este creativă: propune un proiect al școlii tale. Albastră evaluează: claritate și respectarea cerinței. Dacă prezinți, ții rândul la cuvânt.',
        'Examenul nu cere pălăria. Cere un fapt și o părere scrisă. Data de 21 martie 1999 rămâne faptul pe care îl poți verifica.'
      ].join('\n\n'),
      example: [
        'Faptul verificabil: 21 martie, din 1999, UNESCO. Proiectul din Ploiești: versuri și formule pe 5 kilometri de rolă, la Colegiul I.L. Caragiale.',
        'Pălăria albă spune acest fapt. Pălăria neagră spune o piedică posibilă: rola se rupe sau versul este folosit fără drept. Pălăria albastră întreabă dacă piedica este spusă clar.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pălăria verde, pe același fapt: școala poate pune o strofă aleasă de elevi pe un perete, nu pe cinci kilometri de rolă. Propunerea pleacă de la fapt, nu înlocuiește data UNESCO.'
        }
      ],
      tryThis: 'Notează data și anul declarației UNESCO. Spune, în trei rânduri, proiectul din Ploiești, numai cu faptele din lecție. Alege o pălărie și scrie cinci rânduri din punctul ei de vedere. Încheie cu o frază de argument: ipoteză plus un fapt.',
      keyPoints: [
        'Ziua Internațională a Poeziei este 21 martie, din 1999, declarată de UNESCO.',
        'La Ploiești, proiectul punea versuri și formule pe 5 kilometri de rolă.',
        'Pălăriile sunt puncte de vedere pentru oral. Proba de examen rămâne scrisă.'
      ]
    }),
    lesson({
      id: 'targuri',
      title: 'Târguri de carte și o traducere',
      kind: 'comunicare',
      boxes: [
        {
          type: 'atentie',
          title: 'Nu este item',
          text: 'Târgurile nu se punctează ca subiect de examen. Contează dacă legi o valoare culturală de un text, la asociere. Anul care lipsește nu se inventează.'
        }
      ],
      theory: [
        'Târgul de carte de la Varșovia, ediția a opta, este anunțat între 18 și 21 mai. Standul românesc este pregătit de Institutul Cultural Român de la Varșovia, împreună cu Ambasada României: volume, dicționare, albume.',
        'BOOKerini, ediția a doua, la Biblioteca Națională a României, ține de joi 17 octombrie până duminică 20 octombrie, între 10:00 și 18:00, cu peste 50 de evenimente pentru copii. Anul exact al acelor ediții nu este în bucata citită.',
        'Târgul de la Beijing s-a încheiat duminică, 28 august 2016, după cinci zile. Standul României a avut peste o mie de vizitatori.',
        'La Poetry Vicenza, ediția 2019, Ana Blandiana și Bruno Mazzoni sunt anunțați pe 26 mai, de la ora 17:00. Masa rotundă de la ora 19:00 îi mai cuprinde pe Jorge Maximino, Andrew Greig și Ida Travi.',
        'Ana Blandiana s-a născut în 1942. În italiană au apărut, între altele, volume în 2008 și în 2015. A fost la Festivalul Literar de la Veneția în 2016 și la Salonul de carte de la Torino în 2012, 2015 și 2018.',
        'Bruno Mazzoni s-a născut în 1946. A primit în 2002 Ordinul Național Pentru Merit în grad de Comandor, de la Guvernul României, și în 2008 Premiul Național pentru Traducere, în Italia.',
        'Motivul decorației: activitatea culturală și științifică. Valoarea: o literatură circulă când cineva o traduce.'
      ].join('\n\n'),
      example: [
        'Deosebire, în 30–50 de cuvinte: târgul din Varșovia duce cărți românești către un public din Polonia. BOOKerini îi aduce pe copii la autori, la Biblioteca Națională, cu activități de desen și de citit.',
        'Beijing, 28 august 2016, peste o mie de vizitatori la standul României. Blandiana, 26 mai, în anunțul din 2019. Mazzoni, decorat în 2002.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Asociere într-o frază: valoarea este circulația unei literaturi prin traducere. O legi de un titlu și un autor din lecțiile de până acum, nu de un an inventat pentru Varșovia.'
        }
      ],
      tryThis: 'Scrie deosebirea dintre târgul de la Varșovia și BOOKerini, în 30–50 de cuvinte. Notează data de încheiere de la Beijing și numărul de vizitatori. Spune cine este anunțat la Vicenza, în ce zi și de ce a fost decorat Bruno Mazzoni.',
      keyPoints: [
        'Beijing s-a încheiat pe 28 august 2016, cu peste o mie de vizitatori la standul României.',
        'Ana Blandiana s-a născut în 1942. Bruno Mazzoni, născut în 1946, a fost decorat în 2002.',
        'Valoarea de ținut este circulația unei literaturi prin traducere.'
      ]
    }),
    lesson({
      id: 'recap-sentimente',
      title: 'Recapitularea sentimentelor',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Scena',
          text: 'Recapitularea se face pe frazele Marei, nu pe o foaie de puncte. Versurile nu se lipesc.'
        }
      ],
      theory: [
        'Seara, Mara spune: Cunosc o fântână la marginea orașului și vreau să uit zgomotul. Prietena ei scrie, iar Mara citește. Știe că liniștea ține puțin.',
        'Cine: Mara. Când: seara. Unde: la marginea orașului. Ce: vrea să iasă din zgomot. Textul este liric dacă emoția stă în față, chiar fără rimă.',
        'Verbul cunosc este persoana I, indicativ prezent. Fraza Prietena ei scrie, iar Mara citește este coordonare adversativă, cu virgulă înainte de iar.',
        'Știe că liniștea ține puțin are completivă directă: că liniștea ține puțin. Elementul este că.',
        'Dacă numeri silabele într-un rând scris de tine, ai măsura. Rima împerecheată este a, a, b, b. Mesajul se spune cu opinie și două argumente, cel puțin 150 de cuvinte când aceasta este compunerea.',
        'Fântâna lui Macedonski rămâne textul de rezervă: 1892 și 1895. Dorința lui Eminescu: 1876 și 1883. Anii se țin pereche, revista cu volumul.',
        'Dacă scrii compunerea de mesaj, opinia spune retragerea din zgomot. Un argument este fântâna de la margine. Al doilea este faptul că liniștea ține puțin. Concluzia nu se cere la opinia scurtă de 6 puncte.',
        'Coordonarea cu iar cere virgula. Subordonata cu că se copiază întreagă. Cele două reguli stau în aceeași scenă, ca să nu le înveți pe foi separate.'
      ].join('\n\n'),
      example: [
        'Ce scrie: seara, Mara vrea să uite zgomotul orașului lângă o fântână de la margine. Ce vezi: o văd la marginea orașului, cu o fântână în față.',
        'Eu aș închide telefonul, pentru că ea vrea să uite zgomotul. Completiva este că liniștea ține puțin. Virgula stă înainte de iar. Anul revistei Literatorul, pentru Fântâna, este 1892.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Opinie scurtă: liniștea de la marginea orașului ține puțin, dar merită. Argument: Mara vrea să uite zgomotul. Al doilea: știe că liniștea nu durează. Conectorul în concluzie închide compunerea, nu opinia de 6 puncte.'
        }
      ],
      tryThis: 'Pe scena Marei, scrie ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu O văd. Transcrie completiva și spune felul. Arată virgula de la iar. Spune de ce textul poate fi liric fără rimă. Notează anii pentru Fântâna și pentru Dorința.',
      keyPoints: [
        'Liricul este emoția, nu rima. Completiva directă se transcrie cu că.',
        'Înainte de iar se pune virgulă.',
        'Fântâna a apărut în 1892 și în volum în 1895. Dorința a apărut în 1876 și în Poesii în 1883.'
      ]
    })
  ]
};
