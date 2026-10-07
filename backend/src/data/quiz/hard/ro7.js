const { grids, counts, words, pack } = require('./routil');

function recap() {
  const flashcards = grids([
    {
      id: 'hx-r7i-01', lesson: 'jurnal-vacanta', level: 1, skill: 'apply', point: 'jurnal',
      question: 'Într-un jurnal de vacanță, «ieri» față de ziua în care scrii arată…',
      correct: 'ziua dinainte',
      wrong: ['ziua de mâine', 'un loc', 'o persoană'],
      explain: 'Ieri este ziua care a trecut deja. Mâine este viitorul. Nu numește un loc și nu numește o persoană.'
    },
    {
      id: 'hx-r7i-02', lesson: 'toamna-de-la-fereastra', level: 2, skill: 'analyze', point: 'descriere',
      question: '«Pe geam, frunzele se lipesc de sticlă.» Predomină…',
      correct: 'imaginea',
      wrong: ['porunca', 'tabelul', 'formula de adresare'],
      explain: 'Vezi un cadru, fără o cerere și fără date de tabel. Este o imagine de toamnă.'
    },
    {
      id: 'hx-r7i-03', lesson: 'recap-constructie', level: 3, skill: 'apply', point: 'fraza',
      question: 'În «Am rămas, deși ploua.», conectorul este…',
      correct: 'deși',
      wrong: ['Am', 'rămas', 'ploua'],
      explain: 'deși leagă ideea de a rămâne de ploaie și introduce o opoziție. Am rămas și ploua sunt predicate.'
    },
    {
      id: 'hx-r7i-04', lesson: 'prima-zi', level: 4, skill: 'trap', point: 'acord',
      question: 'Care enunț este corect?',
      correct: 'Noii colegi au găsit sala.',
      wrong: ['Noii colegi a găsit sala.', 'Noul coleg au găsit sala.', 'Noii colegi ați găsit sala.'],
      explain: 'Subiectul la plural, persoana a III-a, cere au găsit. a găsit este singular. ați este persoana a II-a.'
    },
    {
      id: 'hx-r7i-05', lesson: 'jurnal-vacanta', level: 5, skill: 'false', point: 'jurnal',
      question: 'Care enunț este fals?',
      correct: 'Jurnalul se scrie la persoana a III-a, ca o știre.',
      wrong: [
        'Jurnalul poate nota o emoție.',
        'Poate păstra ordinea zilelor.',
        'Eu este persoana firească a jurnalului.'
      ],
      explain: 'Jurnalul folosește eu, nu tonul unei știri. Emoția și ordinea zilelor îi sunt firești.'
    },
    {
      id: 'hx-r7i-06', lesson: 'toamna-de-la-fereastra', level: 6, skill: 'analyze', point: 'figuri',
      question: '«Vântul mătură curtea.» Vântul este…',
      correct: 'personificat',
      wrong: ['un numeral', 'o prepoziție', 'un diacritic'],
      explain: 'A mătura este o treabă omenească dată vântului. Nu este o parte de vorbire și nu este un semn.'
    },
    {
      id: 'hx-r7i-07', lesson: 'recap-constructie', level: 7, skill: 'analyze', point: 'concesiva',
      question: 'În «Am rămas, deși ploua.», deși introduce…',
      correct: 'o concesie',
      wrong: ['un scop', 'o posesie', 'un vocativ'],
      explain: 'Rămânerea se petrece împotriva ploii. Scopul ar fi ca să. Posesia ar fi genitivul. Vocativul cheamă pe cineva.'
    },
    {
      id: 'hx-r7i-08', lesson: 'prima-zi', level: 8, skill: 'analyze', point: 'inferenta',
      question: '«Și-a rescris eticheta de trei ori înainte de a intra.» Ce deduci?',
      correct: 'Ține la prima impresie.',
      wrong: ['A uitat cum îl cheamă.', 'Sala nu există.', 'Nu are caiet.'],
      explain: 'Repetarea etichetei arată grijă pentru cum va fi văzut. Nu dovedește că și-a uitat numele sau că sala lipsește.'
    }
  ]);
  const tests = [
    ...counts([
      {
        id: 'hz-r7i-01', lesson: 'recap-constructie', level: 6, skill: 'apply', point: 'fraza',
        prompt: 'Câte propoziții sunt în «Am rămas, deși ploua.»?',
        explain: 'Două propoziții: am rămas și deși ploua.',
        steps: ['Am rămas', 'deși ploua', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r7i-02', lesson: 'jurnal-vacanta', level: 7, skill: 'apply', point: 'jurnal',
        prompt: 'În «Ieri am mers la bunici, azi scriu.», câte repere de timp sunt?',
        explain: 'Ieri și azi. Două repere.',
        steps: ['ieri', 'azi', 'Total: 2'],
        proof: () => 2
      }
    ]),
    ...words([
      {
        id: 'hz-r7i-03', lesson: 'recap-constructie', level: 6, skill: 'analyze', point: 'concesiva',
        prompt: 'În «Am rămas, deși ploua.», deși introduce o concesie sau un scop? Scrie: concesie.',
        answer: 'concesie',
        explain: 'Fapta se petrece împotriva piedicii, deci este concesie.',
        steps: ['deși opune ploaia rămânerii', 'scopul ar fi ca să', 'Este concesie']
      },
      {
        id: 'hz-r7i-04', lesson: 'toamna-de-la-fereastra', level: 8, skill: 'analyze', point: 'figuri',
        prompt: 'În «Vântul mătură curtea.», figura este personificare sau comparație? Scrie: personificare.',
        answer: 'personificare',
        explain: 'Vântului i se dă o treabă omenească, fără cuvântul ca.',
        steps: ['Nu apare ca', 'Măturatul este omenesc', 'Este personificare']
      }
    ])
  ];
  return pack('romana:7:recapitulare-initiala', flashcards, tests);
}

function cunoastere() {
  const flashcards = grids([
    {
      id: 'hx-r7c-01', lesson: 'fraza', level: 1, skill: 'apply', point: 'fraza',
      question: 'O frază, spre deosebire de o propoziție, are…',
      correct: 'mai multe predicate',
      wrong: ['un singur sunet', 'doar un titlu', 'nicio virgulă posibilă'],
      explain: 'Fraza leagă propoziții, deci are cel puțin două predicate. Propoziția se oprește la un predicat.'
    },
    {
      id: 'hx-r7c-02', lesson: 'conjunctia', level: 2, skill: 'apply', point: 'conjunctie',
      question: 'În «Citește și notează.», conjuncția este…',
      correct: 'și',
      wrong: ['Citește', 'notează', 'punctul'],
      explain: 'și leagă cele două predicate. Verbele nu sunt conjuncții. Punctul închide enunțul.'
    },
    {
      id: 'hx-r7c-03', lesson: 'pleonasm', level: 3, skill: 'trap', point: 'pleonasm',
      question: 'Care enunț este pleonastic?',
      correct: 'A urcat sus pe scară.',
      wrong: ['A urcat pe scară.', 'A coborât încet.', 'A scris tema.'],
      explain: 'A urca spune deja direcția în sus. sus repetă ideea. Celelalte enunțuri nu dublează sensul.'
    },
    {
      id: 'hx-r7c-04', lesson: 'paronime', level: 4, skill: 'trap', point: 'paronim',
      question: 'În «A completat o fișă.», verbul potrivit pentru a umple rubricile este…',
      correct: 'a completa',
      wrong: ['a complimenta', 'a complota', 'a compătimi'],
      explain: 'A completa înseamnă a umple ce lipsește. A complimenta înseamnă a lăuda. A complota și a compătimi sunt alte verbe, apropiate doar ca sunet.'
    },
    {
      id: 'hx-r7c-05', lesson: 'derivarea', level: 5, skill: 'apply', point: 'derivare',
      question: 'În «reface», prefixul este…',
      correct: 're',
      wrong: ['face', 'fa', 'ce'],
      explain: 're- stă înaintea rădăcinii și înseamnă din nou. face este rădăcina, nu prefixul.'
    },
    {
      id: 'hx-r7c-06', lesson: 'fonetica', level: 6, skill: 'analyze', point: 'sunet',
      question: 'Câte sunete are cuvântul «ceas», dacă grupul ce este un singur sunet?',
      correct: '3',
      wrong: ['4', '2', '1'],
      explain: 'ce este un sunet, apoi a, apoi s. Trei sunete, deși scrii patru litere. Nu numeri fiecare literă.'
    },
    {
      id: 'hx-r7c-07', lesson: 'silaba-accent', level: 7, skill: 'trap', point: 'accent',
      question: 'În «fereastră», despărțit fe-reas-tră, accentul cade pe…',
      correct: 'silaba din mijloc',
      wrong: ['prima silabă', 'ultima silabă', 'toate silabele la fel'],
      explain: 'Spui fe-REAS-tră. Accentul stă pe reas, silaba din mijloc. Capetele fe și tră sunt mai slabe.'
    },
    {
      id: 'hx-r7c-08', lesson: 'locutiuni', level: 8, skill: 'false', point: 'locutiune',
      question: 'Care enunț este fals?',
      correct: 'O locuțiune este mereu un singur cuvânt lipit.',
      wrong: [
        'O locuțiune are sens unitar.',
        'Poate fi formată din mai multe cuvinte.',
        '«de dimineață» poate funcționa împreună.'
      ],
      explain: 'Locuțiunea este un grup cu un singur sens, nu un cuvânt lipit neapărat. de dimineață este un astfel de grup.'
    }
  ]);
  const tests = [
    ...counts([
      {
        id: 'hz-r7c-01', lesson: 'fraza', level: 6, skill: 'apply', point: 'fraza',
        prompt: 'Câte predicate are fraza «Citește și notează.»?',
        explain: 'Două predicate legate prin și.',
        steps: ['citește', 'notează', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r7c-02', lesson: 'fonetica', level: 7, skill: 'analyze', point: 'sunet',
        prompt: 'În «ceas», ce este un singur sunet. Câte sunete are cuvântul?',
        explain: 'ce, a și s. Trei sunete.',
        steps: ['ce', 'a', 's', 'Total: 3'],
        proof: () => 3
      }
    ]),
    ...words([
      {
        id: 'hz-r7c-03', lesson: 'pleonasm', level: 6, skill: 'trap', point: 'pleonasm',
        prompt: '«A urcat sus» este pleonasm sau omonimie? Scrie: pleonasm.',
        answer: 'pleonasm',
        explain: 'sus repetă direcția deja spusă de a urca.',
        steps: ['a urca include ideea de sus', 'cuvântul se repetă ca sens', 'este pleonasm']
      },
      {
        id: 'hz-r7c-04', lesson: 'paronime', level: 8, skill: 'trap', point: 'paronim',
        prompt: 'Ca să umpli o fișă, completezi sau complimentezi? Scrie: completezi.',
        answer: 'completezi',
        explain: 'Completezi rubricile. Complimentezi înseamnă că lauzi pe cineva.',
        steps: ['Fișa are rubrici goale', 'complimentul este o laudă', 'Verbul este completezi']
      }
    ])
  ];
  return pack('romana:7:pe-drumul-cunoasterii', flashcards, tests);
}

function punti() {
  const flashcards = grids([
    {
      id: 'hx-r7p-01', lesson: 'fantastic', level: 1, skill: 'apply', point: 'fantastic',
      question: 'Care element împinge textul spre fantastic?',
      correct: 'Ușa se deschide singură la miezul nopții.',
      wrong: ['Ușa are balamale.', 'Ora este trecută în orar.', 'Camera are o fereastră.'],
      explain: 'Deschiderea fără cauză obișnuită rupe realul. Balamalele, orarul și fereastra sunt detalii comune.'
    },
    {
      id: 'hx-r7p-02', lesson: 'infinitiv', level: 2, skill: 'apply', point: 'infinitiv',
      question: 'Forma de infinitiv este…',
      correct: 'a citi',
      wrong: ['citind', 'citit', 'citește'],
      explain: 'Infinitivul are a plus forma scurtă: a citi. citind este gerunziu, citit participiu, citește indicativ.'
    },
    {
      id: 'hx-r7p-03', lesson: 'gerunziu', level: 3, skill: 'trap', point: 'gerunziu',
      question: 'În «A intrat râzând.», râzând arată o acțiune…',
      correct: 'în același timp cu intrarea',
      wrong: ['de peste un an', 'interzisă', 'numărată'],
      explain: 'Gerunziul lipește o faptă de alta, simultan. Nu mută fapta în viitorul îndepărtat și nu o interzice.'
    },
    {
      id: 'hx-r7p-04', lesson: 'participiu', level: 4, skill: 'apply', point: 'participiu',
      question: 'În «cartea citită», citită este…',
      correct: 'participiu',
      wrong: ['infinitiv', 'imperativ', 'vocativ'],
      explain: 'Participiul arată o acțiune încheiată, aici ca adjectiv. Infinitivul ar fi a citi. Nu este o poruncă.'
    },
    {
      id: 'hx-r7p-05', lesson: 'supin', level: 5, skill: 'trap', point: 'supin',
      question: 'În «de citit», modul este…',
      correct: 'supin',
      wrong: ['gerunziu', 'condițional', 'vocativ'],
      explain: 'Supinul apare cu de, pentru, la: de citit. Gerunziul ar fi citind. Nu este o chemare.'
    },
    {
      id: 'hx-r7p-06', lesson: 'conjunctiv-optativ', level: 6, skill: 'analyze', point: 'moduri',
      question: '«Aș zbura» față de «zbor» mută fapta în…',
      correct: 'zona dorinței',
      wrong: ['trecutul încheiat', 'poruncă', 'enumerare'],
      explain: 'Conditionalul-optativ spune ce ai face, nu ce faci acum și nu ce ai terminat. Nu este imperativ.'
    },
    {
      id: 'hx-r7p-07', lesson: 'planuri-personaje', level: 7, skill: 'analyze', point: 'planuri',
      question: 'Eroul vede o ușă, naratorul știe ce e dincolo, eroul nu. Este…',
      correct: 'o diferență de cunoaștere',
      wrong: ['un pleonasm', 'un diacritic', 'un numeral ordinal'],
      explain: 'Cititorul sau naratorul poate ști mai mult decât personajul. Asta nu este o repetare de sens și nu este o parte de vorbire.'
    },
    {
      id: 'hx-r7p-08', lesson: 'moduri-timpuri', level: 8, skill: 'false', point: 'mod',
      question: 'Care enunț este fals?',
      correct: 'Gerunziul «citind» este un timp al indicativului.',
      wrong: [
        'Indicativul poate sta la prezent.',
        'Perfectul compus este un timp trecut.',
        'Conjunctivul poate fi introdus prin să.'
      ],
      explain: 'citind este gerunziu, un mod, nu un timp al indicativului. Celelalte enunțuri așază corect modurile și timpurile.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r7p-01', lesson: 'infinitiv', level: 6, skill: 'apply', point: 'infinitiv',
        prompt: 'Ce mod este «a citi»? Scrie: infinitiv.',
        answer: 'infinitiv',
        explain: 'a plus forma scurtă a verbului este infinitivul.',
        steps: ['Apare a', 'Nu este o formă personală', 'Modul este infinitiv']
      },
      {
        id: 'hz-r7p-02', lesson: 'supin', level: 8, skill: 'trap', point: 'supin',
        prompt: '«de citit» este supin sau gerunziu? Scrie: supin.',
        answer: 'supin',
        explain: 'de citit este supin. Gerunziul ar fi citind.',
        steps: ['de introduce supinul', 'citind ar fi gerunziu', 'Răspunsul este supin']
      }
    ]),
    ...counts([
      {
        id: 'hz-r7p-03', lesson: 'fantastic', level: 6, skill: 'analyze', point: 'fantastic',
        prompt: 'În «Ușa s-a deschis. Ceasul arăta miezul nopții.», câte propoziții sunt?',
        explain: 'Două propoziții, fiecare cu predicat.',
        steps: ['Ușa s-a deschis', 'Ceasul arăta', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r7p-04', lesson: 'gerunziu', level: 7, skill: 'apply', point: 'gerunziu',
        prompt: 'În «A intrat râzând și fluierând.», câte gerunzii sunt?',
        explain: 'râzând și fluierând. Două.',
        steps: ['râzând', 'fluierând', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:7:punti-intre-lumi', flashcards, tests);
}

function sentimente() {
  const flashcards = grids([
    {
      id: 'hx-r7s-01', lesson: 'text-liric', level: 1, skill: 'apply', point: 'liric',
      question: 'Textul liric pune pe primul plan…',
      correct: 'starea celui care vorbește',
      wrong: ['instrucțiunea de folosire', 'tabelul de prețuri', 'procesul-verbal'],
      explain: 'Liricul spune o emoție sau o viziune. Instrucțiunea, prețul și procesul-verbal informează practic.'
    },
    {
      id: 'hx-r7s-02', lesson: 'figuri-stil', level: 2, skill: 'trap', point: 'metafora',
      question: '«Inima lui e o cetate.» este…',
      correct: 'metaforă',
      wrong: ['comparație', 'enumerație', 'imperativ'],
      explain: 'Cetatea este pusă în locul inimii, fără ca. Comparația ar avea ca sau asemenea. Nu este o listă și nu este o poruncă.'
    },
    {
      id: 'hx-r7s-03', lesson: 'figuri-stil', level: 3, skill: 'trap', point: 'comparatie',
      question: '«Inima lui e ca o cetate.» față de enunțul fără ca este…',
      correct: 'comparație',
      wrong: ['metaforă', 'pleonasm', 'supin'],
      explain: 'ca ține cele două elemente distincte, deci este comparație. Fără ca, identificarea ar fi metaforă.'
    },
    {
      id: 'hx-r7s-04', lesson: 'versificatie', level: 4, skill: 'apply', point: 'vers',
      question: 'Rima privește…',
      correct: 'sfârșitul versurilor',
      wrong: ['prima literă', 'numărul de pagini', 'numele editurii'],
      explain: 'Rima este potrivirea sunetelor de la final. Inițiala, paginile și editura nu creează rima.'
    },
    {
      id: 'hx-r7s-05', lesson: 'substantiv', level: 5, skill: 'apply', point: 'substantiv',
      question: 'În «Dorul crește.», subiectul este…',
      correct: 'Dorul',
      wrong: ['crește', 'crește dorul', 'punctul'],
      explain: 'Dorul este lucrul despre care se spune că crește. crește este predicatul.'
    },
    {
      id: 'hx-r7s-06', lesson: 'cazuri', level: 6, skill: 'analyze', point: 'genitiv',
      question: 'În «tăcerea serii», «serii» este…',
      correct: 'genitiv',
      wrong: ['vocativ', 'imperativ', 'supin'],
      explain: 'Întrebi a cui tăcere: a serii. Este genitiv. Nu cheamă seara și nu este o formă verbală.'
    },
    {
      id: 'hx-r7s-07', lesson: 'adjectiv', level: 7, skill: 'trap', point: 'acord',
      question: 'Acordul corect este…',
      correct: 'inimi calme',
      wrong: ['inimi calm', 'inimă calmi', 'inimi calmul'],
      explain: 'inimi este feminin plural, deci calme. calm rămâne masculin. calmi nu se potrivește cu inimă. calmul este substantiv articulat.'
    },
    {
      id: 'hx-r7s-08', lesson: 'figuri-stil', level: 8, skill: 'false', point: 'epitet',
      question: 'Care enunț este fals?',
      correct: 'Orice adjectiv dintr-un text științific este epitet.',
      wrong: [
        'Epitetul dă o nuanță, nu doar o măsură.',
        '«lumină blândă» conține un epitet.',
        'Metafora identifică două lucruri fără ca.'
      ],
      explain: 'În textul științific, adjectivul poate fi doar exact, fără ornament. Epitetul, lumina blândă și metafora sunt descrise corect în celelalte enunțuri.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r7s-01', lesson: 'figuri-stil', level: 6, skill: 'trap', point: 'metafora',
        prompt: '«Inima e o cetate» este metaforă sau comparație? Scrie: metaforă.',
        answer: 'metaforă',
        explain: 'Nu apare ca. Un lucru este pus în locul celuilalt.',
        steps: ['Lipsește ca', 'cetate ține loc de inimă', 'Este metaforă']
      },
      {
        id: 'hz-r7s-02', lesson: 'figuri-stil', level: 8, skill: 'trap', point: 'comparatie',
        prompt: '«Inima e ca o cetate» este comparație sau personificare? Scrie: comparație.',
        answer: 'comparație',
        explain: 'ca apropie două elemente fără să dea inimii o faptă omenească.',
        steps: ['Apare ca', 'Nu este un gest omenesc', 'Este comparație']
      }
    ]),
    ...counts([
      {
        id: 'hz-r7s-03', lesson: 'versificatie', level: 6, skill: 'apply', point: 'strofa',
        prompt: 'O strofă are versurile 1, 2, 3 și 4. Câte versuri are?',
        explain: 'Patru versuri în strofă.',
        steps: ['1', '2', '3', '4', 'Total: 4'],
        proof: () => 4
      },
      {
        id: 'hz-r7s-04', lesson: 'adjectiv', level: 7, skill: 'apply', point: 'acord',
        prompt: 'În «inimi calme și calde», câte adjective sunt acordate cu inimi?',
        explain: 'calme și calde. Două adjective.',
        steps: ['calme', 'calde', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:7:taramul-sentimentelor', flashcards, tests);
}

function teatru() {
  const flashcards = grids([
    {
      id: 'hx-r7t-01', lesson: 'text-dramatic', level: 1, skill: 'apply', point: 'dramatic',
      question: 'În textul dramatic, faptele se află mai ales în…',
      correct: 'replici și indicații',
      wrong: ['un tabel de note', 'o listă de prețuri', 'un cuprins de atlas'],
      explain: 'Piesa înaintează prin ce spun personajele și prin indicațiile de scenă. Tabelul, prețul și atlasul sunt alte tipuri de text.'
    },
    {
      id: 'hx-r7t-02', lesson: 'dialog-dramatic', level: 2, skill: 'apply', point: 'dialog',
      question: 'O indicație de scenă spune…',
      correct: 'cum se mișcă personajul',
      wrong: ['rima finalului', 'numărul de silabe', 'cazul substantivului'],
      explain: 'Indicația arată gestul, vocea sau locul. Nu este o analiză de vers și nu este o lecție de cazuri.'
    },
    {
      id: 'hx-r7t-03', lesson: 'pronume-personal', level: 3, skill: 'trap', point: 'pronume',
      question: 'În replică, «Eu rămân.» pronumele marchează…',
      correct: 'persoana I',
      wrong: ['persoana a II-a', 'persoana a III-a', 'pluralul'],
      explain: 'Eu este persoana I singular. Tu ar fi a II-a. El ar fi a III-a. Noi ar fi pluralul.'
    },
    {
      id: 'hx-r7t-04', lesson: 'pronume-posesiv', level: 4, skill: 'apply', point: 'posesiv',
      question: 'În «Rolul meu», meu arată…',
      correct: 'posesia',
      wrong: ['timpul', 'locul', 'scopul'],
      explain: 'meu spune al cui este rolul. Nu spune când, unde sau pentru ce.'
    },
    {
      id: 'hx-r7t-05', lesson: 'pronume-relativ', level: 5, skill: 'analyze', point: 'relativ',
      question: 'În «Actorul care intră vorbește încet.», care îl reia pe…',
      correct: 'actorul',
      wrong: ['încet', 'vorbește', 'punctul'],
      explain: 'care deschide o propoziție despre actor. încet este mod, vorbește este predicat.'
    },
    {
      id: 'hx-r7t-06', lesson: 'numeral', level: 6, skill: 'trap', point: 'numeral',
      question: '«Actul al doilea» folosește un numeral…',
      correct: 'ordinal',
      wrong: ['cardinal', 'colectiv', 'fracționar'],
      explain: 'al doilea dă locul în serie. Cardinalul ar fi doi. Nu este o fracție și nu este un colectiv de tipul amândoi.'
    },
    {
      id: 'hx-r7t-07', lesson: 'pronume-negativ', level: 7, skill: 'trap', point: 'negativ',
      question: 'Acordul corect este…',
      correct: 'Nimeni nu iese din rol.',
      wrong: ['Nimeni nu ies din rol.', 'Nimeni nu ieșiți din rol.', 'Nimeni nu ieșim din rol.'],
      explain: 'Nimeni este singular, persoana a III-a: nu iese. ies, ieșiți și ieșim schimbă persoana.'
    },
    {
      id: 'hx-r7t-08', lesson: 'spectacol', level: 8, skill: 'false', point: 'spectacol',
      question: 'Care enunț este fals?',
      correct: 'Indicația de scenă se rostește tare, ca o replică a eroului.',
      wrong: [
        'Replica aparține unui personaj.',
        'Indicația poate descrie o lumină.',
        'Același text poate fi jucat diferit.'
      ],
      explain: 'Indicația îl ajută pe actor, nu este rostirea eroului către alt personaj. Replica, lumina și variantele de joc sunt reale.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r7t-01', lesson: 'numeral', level: 6, skill: 'trap', point: 'numeral',
        prompt: '«al doilea» este ordinal sau cardinal? Scrie: ordinal.',
        answer: 'ordinal',
        explain: 'Arată locul în serie, nu cantitatea doi.',
        steps: ['al doilea dă poziția', 'doi ar fi cardinal', 'Este ordinal']
      },
      {
        id: 'hz-r7t-02', lesson: 'pronume-relativ', level: 8, skill: 'analyze', point: 'relativ',
        prompt: 'În «actorul care intră», care este pronume relativ sau adverb? Scrie: relativ.',
        answer: 'relativ',
        explain: 'care reia substantivul și deschide o propoziție.',
        steps: ['reia actorul', 'introduce o propoziție', 'este relativ']
      }
    ]),
    ...counts([
      {
        id: 'hz-r7t-03', lesson: 'dialog-dramatic', level: 6, skill: 'apply', point: 'dialog',
        prompt: 'În «Ana: Vin. Ion: Te aștept.», câte replici sunt?',
        explain: 'Două replici, una pentru fiecare nume.',
        steps: ['Vin', 'Te aștept', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r7t-04', lesson: 'pronume-personal', level: 7, skill: 'apply', point: 'pronume',
        prompt: 'În «Eu rămân. Tu pleci. El tace.», câte pronume personale sunt?',
        explain: 'Pronumele sunt eu, tu și el, deci trei.',
        steps: ['Eu', 'Tu', 'El', 'Total: 3'],
        proof: () => 3
      }
    ])
  ];
  return pack('romana:7:lumea-teatrului', flashcards, tests);
}

function calator() {
  const flashcards = grids([
    {
      id: 'hx-r7k-01', lesson: 'adverb', level: 1, skill: 'apply', point: 'adverb',
      question: 'În «Vorbește încet.», adverbul este…',
      correct: 'încet',
      wrong: ['Vorbește', 'subiectul', 'articolul'],
      explain: 'încet arată felul vorbirii. Vorbește este verbul.'
    },
    {
      id: 'hx-r7k-02', lesson: 'grade-adverb', level: 2, skill: 'trap', point: 'comparativ',
      question: 'Comparativul corect al adverbului este…',
      correct: 'mai încet decât',
      wrong: ['cel mai mai încet', 'foarte decât încet', 'mai foarte încet'],
      explain: 'mai plus adverb plus decât este comparativul. cel mai trece la superlativ. foarte nu stă cu decât.'
    },
    {
      id: 'hx-r7k-03', lesson: 'interjectie', level: 3, skill: 'apply', point: 'interjectie',
      question: 'Cuvântul «Vai!» dintr-o reacție bruscă este…',
      correct: 'interjecție',
      wrong: ['prepoziție', 'numeral', 'conjuncție'],
      explain: 'Vai exprimă o reacție bruscă. Nu leagă propoziții, nu numără și nu introduce un complement.'
    },
    {
      id: 'hx-r7k-04', lesson: 'interjectie-predicativa', level: 4, skill: 'analyze', point: 'interjectie',
      question: 'În «Haide la drum!», haide ține loc de…',
      correct: 'îndemn',
      wrong: ['genitiv', 'epitet', 'cuprins'],
      explain: 'Haide cheamă la acțiune, ca un predicat de îndemn. Nu este un caz și nu este un adjectiv.'
    },
    {
      id: 'hx-r7k-05', lesson: 'stil', level: 5, skill: 'analyze', point: 'stil',
      question: 'Un jurnal de călătorie, față de o cerere oficială, poate fi…',
      correct: 'mai personal',
      wrong: ['fără verbe', 'doar în cifre', 'fără fapte'],
      explain: 'Jurnalul păstrează vocea celui care a fost acolo. Tot are verbe și fapte. Nu se reduce la cifre.'
    },
    {
      id: 'hx-r7k-06', lesson: 'secvente', level: 6, skill: 'analyze', point: 'secventa',
      question: 'Într-un text de drum, o secvență descriptivă se recunoaște fiindcă…',
      correct: 'oprește fapta ca să arate locul',
      wrong: ['dă o poruncă', 'numără doar silabe', 'schimbă persoana în noi fără motiv'],
      explain: 'Descrierea suspendă întâmplarea și arată peisajul. Nu este o poruncă și nu este o numărătoare de silabe.'
    },
    {
      id: 'hx-r7k-07', lesson: 'structura-epic', level: 7, skill: 'false', point: 'epic',
      question: 'Care enunț este fals?',
      correct: 'Într-o narațiune de drum nu poate exista dialog.',
      wrong: [
        'Poate exista un conflict mic.',
        'Poate alterna fapta cu descrierea.',
        'Finalul poate schimba planul eroului.'
      ],
      explain: 'Dialogul poate apărea oriunde se întâlnesc oameni. Conflictul, alternanța și finalul sunt posibile.'
    },
    {
      id: 'hx-r7k-08', lesson: 'comprehensiune', level: 8, skill: 'analyze', point: 'text',
      question: '«A luat trenul de dimineață, dar a coborât cu o stație mai devreme.» Ce nu rezultă?',
      correct: 'A ajuns neapărat seara.',
      wrong: ['A schimbat planul pe drum.', 'A pornit dimineața.', 'Nu a mers până la capăt.'],
      explain: 'Știi ora plecării și că a coborât mai devreme. Nu știi că a ajuns seara. Schimbarea planului și oprirea înainte de capăt rezultă din text.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r7k-01', lesson: 'interjectie', level: 6, skill: 'apply', point: 'interjectie',
        prompt: '«Vai!» este interjecție sau conjuncție? Scrie: interjecție.',
        answer: 'interjecție',
        explain: 'Exprimă o reacție, nu leagă două propoziții.',
        steps: ['Nu leagă predicate', 'Este o reacție', 'Este interjecție']
      },
      {
        id: 'hz-r7k-02', lesson: 'grade-adverb', level: 8, skill: 'trap', point: 'comparativ',
        prompt: '«mai încet decât» este comparativ sau superlativ? Scrie: comparativ.',
        answer: 'comparativ',
        explain: 'mai... decât compară două situații. cel mai ar fi superlativul.',
        steps: ['mai și decât', 'cel mai ar fi extremul', 'Este comparativ']
      }
    ]),
    ...counts([
      {
        id: 'hz-r7k-03', lesson: 'secvente', level: 6, skill: 'analyze', point: 'secventa',
        prompt: 'Textul are o secvență de faptă, una de descriere și una de dialog. Câte secvențe sunt?',
        explain: 'Sunt trei secvențe: faptă, descriere și dialog.',
        steps: ['faptă', 'descriere', 'dialog', 'Total: 3'],
        proof: () => 3
      },
      {
        id: 'hz-r7k-04', lesson: 'comprehensiune', level: 7, skill: 'analyze', point: 'text',
        prompt: '«A coborât cu o stație mai devreme.» Cu câte stații înainte de capăt a coborât?',
        explain: 'Textul spune că a coborât cu o stație mai devreme.',
        steps: ['Citești numeralul', 'o stație', 'Total: 1'],
        proof: () => 1
      }
    ])
  ];
  return pack('romana:7:calator-prin-lume', flashcards, tests);
}

function privind() {
  const flashcards = grids([
    {
      id: 'hx-r7m-01', lesson: 'metafora', level: 1, skill: 'trap', point: 'metafora',
      question: '«Timpul e un hoț.» este metaforă fiindcă…',
      correct: 'hoțul este pus în locul timpului',
      wrong: ['apare cuvântul ca', 'este o listă de trei obiecte', 'este o poruncă'],
      explain: 'Identificarea fără ca este metaforă. Comparația ar folosi ca. Nu este enumerație și nu este imperativ.'
    },
    {
      id: 'hx-r7m-02', lesson: 'atribut', level: 2, skill: 'apply', point: 'atribut',
      question: 'În «decizia grea», grea este…',
      correct: 'atribut',
      wrong: ['predicat verbal', 'conjuncție', 'interjecție'],
      explain: 'grea determină substantivul decizia. Nu arată o acțiune de sine stătătoare și nu leagă propoziții.'
    },
    {
      id: 'hx-r7m-03', lesson: 'cauza', level: 3, skill: 'analyze', point: 'cauza',
      question: 'În «A tăcut, pentru că se rușina.», cauza este…',
      correct: 'rușinea',
      wrong: ['tăcerea însăși', 'o rimă', 'un numeral'],
      explain: 'pentru că introduce motivul tăcerii: rușinea. Tăcerea este efectul, nu cauza.'
    },
    {
      id: 'hx-r7m-04', lesson: 'scop', level: 4, skill: 'analyze', point: 'scop',
      question: 'În «A tăcut ca să nu rănească.», ca să arată…',
      correct: 'scopul',
      wrong: ['cauza deja petrecută', 'locul', 'posesorul'],
      explain: 'ca să privește ținta: să nu rănească. Cauza ar fi pentru că. Nu spune unde și nu spune a cui.'
    },
    {
      id: 'hx-r7m-05', lesson: 'lectura-mea', level: 5, skill: 'false', point: 'lectura',
      question: 'Care enunț este fals?',
      correct: 'Dacă două persoane citesc același text, trebuie să aibă aceeași părere.',
      wrong: [
        'Poți argumenta o părere cu un detaliu din text.',
        'O interpretare se verifică pe enunțuri.',
        'Părerile pot diferi dacă ambele au probe.'
      ],
      explain: 'Același text poate susține interpretări diferite, dacă fiecare aduce probe. Obligația unei singure păreri este falsă.'
    },
    {
      id: 'hx-r7m-06', lesson: 'negociere', level: 6, skill: 'analyze', point: 'negociere',
      question: 'Într-o negociere reușită, fiecare parte…',
      correct: 'cedează câte ceva și păstrează ce contează',
      wrong: ['tace tot timpul', 'repetă doar insulta', 'pleacă înainte de orice ofertă'],
      explain: 'Negocierea mută ambele poziții. Tăcerea totală, insulta și plecarea nu sunt oferte.'
    },
    {
      id: 'hx-r7m-07', lesson: 'emotie', level: 7, skill: 'trap', point: 'emotie',
      question: '«Mi-e teamă, dar intru.» Emoția și fapta sunt…',
      correct: 'ambele prezente',
      wrong: ['anulate una de alta', 'o enumerație de culori', 'un superlativ'],
      explain: 'Teama rămâne, iar intrarea tot se face. dar le ține împreună, nu le șterge. Nu este o listă de culori.'
    },
    {
      id: 'hx-r7m-08', lesson: 'cauza', level: 8, skill: 'analyze', point: 'cauza',
      question: 'Schimbi «pentru că» cu «ca să» în «A plecat pentru că ploua.» Ce se schimbă?',
      correct: 'cauza devine scop, iar sensul se strică',
      wrong: ['doar numărul silabelor din ploua', 'doar cazul substantivului', 'nimic, sunt sinonime perfecte'],
      explain: 'pentru că dă motivul deja adevărat. ca să arată o țintă. Nu sunt sinonime, iar ploaia nu este un scop al plecării.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r7m-01', lesson: 'cauza', level: 6, skill: 'analyze', point: 'cauza',
        prompt: 'În «A tăcut, pentru că se rușina.», pentru că introduce cauză sau scop? Scrie: cauză.',
        answer: 'cauză',
        explain: 'pentru că răspunde la de ce.',
        steps: ['Întrebi de ce a tăcut', 'Răspunsul este rușinea', 'Este cauză']
      },
      {
        id: 'hz-r7m-02', lesson: 'scop', level: 8, skill: 'analyze', point: 'scop',
        prompt: 'În «A tăcut ca să nu rănească.», ca să introduce scop sau cauză? Scrie: scop.',
        answer: 'scop',
        explain: 'ca să arată ținta tăcerii.',
        steps: ['ca să privește ținta', 'pentru că ar fi cauză', 'Este scop']
      }
    ]),
    ...counts([
      {
        id: 'hz-r7m-03', lesson: 'metafora', level: 6, skill: 'apply', point: 'metafora',
        prompt: 'În «Timpul e un hoț.», câte elemente sunt identificate: timpul și hoțul?',
        explain: 'Două elemente puse față în față.',
        steps: ['timpul', 'hoțul', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r7m-04', lesson: 'atribut', level: 7, skill: 'apply', point: 'atribut',
        prompt: 'În «decizia grea și târzie», câte atribute are decizia?',
        explain: 'grea și târzie. Două atribute.',
        steps: ['grea', 'târzie', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:7:privind-catre-mine', flashcards, tests);
}

module.exports = { recap, cunoastere, punti, sentimente, teatru, calator, privind };
