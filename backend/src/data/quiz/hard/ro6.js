const { grids, counts, words, pack } = require('./routil');

function recap() {
  const flashcards = grids([
    {
      id: 'hx-r6i-01', lesson: 'jurnal-prima-zi', level: 1, skill: 'apply', point: 'jurnal',
      question: 'Într-un jurnal de zi, persoana care scrie este…',
      correct: 'eu',
      wrong: ['un narator anonim', 'un grup întreg', 'un obiect'],
      explain: 'Jurnalul notează ce a trăit cel care scrie, la persoana I. Nu este o povestire spusă de un martor ascuns.'
    },
    {
      id: 'hx-r6i-02', lesson: 'indicii-recap', level: 2, skill: 'apply', point: 'indiciu',
      question: 'În «Azi am uitat harta, dar am găsit poteca.», indiciul de timp este…',
      correct: 'Azi',
      wrong: ['harta', 'poteca', 'am găsit'],
      explain: 'Azi așază faptele într-o zi. Harta și poteca sunt obiecte. am găsit este predicatul.'
    },
    {
      id: 'hx-r6i-03', lesson: 'recap-constructie', level: 3, skill: 'analyze', point: 'fraza',
      question: '«Am desenat, iar tu ai colorat.» câte propoziții are?',
      correct: '2',
      wrong: ['1', '3', '4'],
      explain: 'Două propoziții legate prin iar. Fiecare are predicatul ei: am desenat și ai colorat.'
    },
    {
      id: 'hx-r6i-04', lesson: 'banda-scurta', level: 4, skill: 'analyze', point: 'banda',
      question: 'Într-o bandă desenată de patru cadre, ce dă ordinea faptelor?',
      correct: 'succesiunea cadrelor',
      wrong: ['culoarea ramei', 'mărimea bulei', 'numele fontului'],
      explain: 'Citești cadrele în ordine ca să vezi ce se întâmplă întâi. Culoarea, bula și fontul nu stabilesc timpul întâmplării.'
    },
    {
      id: 'hx-r6i-05', lesson: 'jurnal-prima-zi', level: 5, skill: 'trap', point: 'jurnal',
      question: 'Care enunț nu își are locul într-un jurnal personal de azi?',
      correct: 'A fost odată un împărat nemuritor.',
      wrong: [
        'Azi am întârziat cinci minute.',
        'La ora de sport am uitat șireturile.',
        'Seara am recitit prima pagină.'
      ],
      explain: 'Formula de basm mută textul în ficțiune. Celelalte enunțuri sunt fapte din ziua celui care scrie.'
    },
    {
      id: 'hx-r6i-06', lesson: 'indicii-recap', level: 6, skill: 'false', point: 'indiciu',
      question: 'Care enunț este fals?',
      correct: 'Cuvântul «ieri» anunță o faptă din viitor.',
      wrong: [
        'Cuvântul «ieri» mută fapta în trecut.',
        'Cuvântul «apoi» arată o ordine.',
        'Cuvântul «fiindcă» introduce un motiv.'
      ],
      explain: 'Ieri privește înapoi, nu înainte. Apoi ordonează faptele, iar fiindcă dă motivul.'
    },
    {
      id: 'hx-r6i-07', lesson: 'recap-constructie', level: 7, skill: 'analyze', point: 'fraza',
      question: 'În «Rămân acasă, fiindcă plouă.», propoziția principală este…',
      correct: 'Rămân acasă',
      wrong: ['fiindcă plouă', 'acasă, fiindcă', 'plouă'],
      explain: 'Ideea de bază este că rămân acasă. fiindcă plouă spune motivul și este secundară.'
    },
    {
      id: 'hx-r6i-08', lesson: 'banda-scurta', level: 8, skill: 'analyze', point: 'banda',
      question: 'Cadrul 1: ghiozdan închis. Cadrul 2: ghiozdan căzut, mere pe jos. Ce s-a întâmplat între ele?',
      correct: 'Ghiozdanul a căzut și s-a deschis.',
      wrong: ['Merele au intrat singure în ghiozdan.', 'Ghiozdanul a devenit mai nou.', 'Cadrul 2 este înaintea cadrului 1.'],
      explain: 'De la închis la deschis, cu merele pe jos, deduci căderea. Ordinea cadrelor nu se citește de la coadă la cap.'
    }
  ]);
  const tests = [
    ...counts([
      {
        id: 'hz-r6i-01', lesson: 'recap-constructie', level: 6, skill: 'apply', point: 'fraza',
        prompt: 'Câte propoziții sunt în «Am desenat, iar tu ai colorat.»?',
        explain: 'Două propoziții, fiecare cu predicatul ei.',
        steps: ['Am desenat', 'tu ai colorat', 'iar le leagă', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r6i-02', lesson: 'banda-scurta', level: 7, skill: 'analyze', point: 'banda',
        prompt: 'O bandă are cadrele 1, 2, 3 și 4, citite în ordine. Câte cadre sunt?',
        explain: 'Banda are patru cadre, numerotate de la unu la patru.',
        steps: ['1', '2', '3', '4', 'Total: 4'],
        proof: () => 4
      }
    ]),
    ...words([
      {
        id: 'hz-r6i-03', lesson: 'jurnal-prima-zi', level: 6, skill: 'apply', point: 'jurnal',
        prompt: 'La ce persoană se scrie de obicei un jurnal: I sau a III-a? Scrie cifra romană: I.',
        answer: 'I',
        explain: 'Jurnalul folosește eu, deci persoana I.',
        steps: ['Cel care scrie spune eu', 'eu este persoana I', 'Răspunsul este I']
      },
      {
        id: 'hz-r6i-04', lesson: 'indicii-recap', level: 8, skill: 'analyze', point: 'indiciu',
        prompt: 'În «Rămân acasă, fiindcă plouă.», fiindcă introduce o cauză sau un loc? Scrie: cauză.',
        answer: 'cauză',
        explain: 'fiindcă răspunde la de ce, deci introduce cauza.',
        steps: ['fiindcă leagă două propoziții', 'a doua spune motivul', 'Este cauză']
      }
    ])
  ];
  return pack('romana:6:recapitulare-initiala', flashcards, tests);
}

function acasa() {
  const flashcards = grids([
    {
      id: 'hx-r6a-01', lesson: 'autor-narator', level: 1, skill: 'apply', point: 'narator',
      question: 'Într-o povestire, cine spune faptele către cititor?',
      correct: 'naratorul',
      wrong: ['tipograful', 'cititorul', 'coperta'],
      explain: 'Naratorul este vocea care povestește. Autorul a scris cartea, dar în text auzi naratorul. Cititorul primește textul.'
    },
    {
      id: 'hx-r6a-02', lesson: 'omonime', level: 2, skill: 'trap', point: 'omonim',
      question: 'În «Am pus lac pe bancă.» și «Am văzut un lac lin.», cuvântul lac este…',
      correct: 'omonim',
      wrong: ['sinonim', 'antonim', 'numeral'],
      explain: 'Aceeași formă, sensuri diferite: lacul de pe lemn și lacul de apă. Nu sunt sinonime și nu sunt opuse.'
    },
    {
      id: 'hx-r6a-03', lesson: 'diftong-hiat', level: 3, skill: 'trap', point: 'diftong',
      question: 'În «soare», grupul oa este…',
      correct: 'diftong',
      wrong: ['hiat', 'consoană dublă', 'prefix'],
      explain: 'oa stă în aceeași silabă: soa-re. La hiat, vocalele s-ar despărți în silabe vecine, ca în po-e-zie.'
    },
    {
      id: 'hx-r6a-04', lesson: 'diftong-hiat', level: 4, skill: 'analyze', point: 'hiat',
      question: 'În «poezia», vocalele o și e sunt…',
      correct: 'în hiat',
      wrong: ['un diftong', 'o singură literă', 'un semn de punctuație'],
      explain: 'Desparți po-e-zi-a. o și e stau în silabe diferite, deci sunt în hiat, nu în diftong.'
    },
    {
      id: 'hx-r6a-05', lesson: 'silabe-reguli', level: 5, skill: 'apply', point: 'silaba',
      question: 'Câte silabe are «poezia»?',
      correct: '4',
      wrong: ['2', '3', '5'],
      explain: 'po-e-zi-a. Patru silabe. Dacă lipești o cu e, pierzi hiatul și numeri mai puțin.'
    },
    {
      id: 'hx-r6a-06', lesson: 'scrisoare', level: 6, skill: 'false', point: 'scrisoare',
      question: 'Care enunț este fals despre o scrisoare?',
      correct: 'Formula de încheiere se pune înaintea formulei de adresare.',
      wrong: [
        'Are un destinatar.',
        'Poate începe cu o formulă de adresare.',
        'Încheierea stă după mesaj.'
      ],
      explain: 'Întâi spui cui scrii, apoi mesajul, apoi încheierea. Enunțul fals întoarce capetele scrisorii.'
    },
    {
      id: 'hx-r6a-07', lesson: 'legenda', level: 7, skill: 'analyze', point: 'legenda',
      question: 'Ce deosebește o legendă de o știre?',
      correct: 'Legenda explică un loc printr-o întâmplare transmisă.',
      wrong: [
        'Știrea are neapărat un animal vorbitor.',
        'Legenda dă ora exactă și sursa.',
        'Știrea începe mereu cu A fost odată.'
      ],
      explain: 'Legenda păstrează o explicație veche, adesea fantastică. Știrea cere fapte verificabile, nu formula de basm.'
    },
    {
      id: 'hx-r6a-08', lesson: 'vocabular-sens', level: 8, skill: 'trap', point: 'sens',
      question: 'În «A lăsat masa și a ieșit.», «a lăsat» înseamnă…',
      correct: 'a părăsit',
      wrong: ['a construit', 'a vopsit', 'a numărat'],
      explain: 'În context, a lăsat masa înseamnă că s-a ridicat de la ea. Nu a construit-o și nu a vopsit-o.'
    }
  ]);
  const tests = [
    ...counts([
      {
        id: 'hz-r6a-01', lesson: 'silabe-reguli', level: 6, skill: 'apply', point: 'silaba',
        prompt: 'Câte silabe are «bibliotecă»?',
        explain: 'bi-bli-o-te-că. Cinci silabe.',
        steps: ['bi', 'bli', 'o', 'te', 'că', 'Total: 5'],
        proof: () => 5
      },
      {
        id: 'hz-r6a-02', lesson: 'diftong-hiat', level: 7, skill: 'analyze', point: 'diftong',
        prompt: 'În «soare» (soa-re), câte vocale stau în prima silabă?',
        explain: 'oa stă împreună în soa. Sunt două vocale în prima silabă.',
        steps: ['Prima silabă este soa', 'o și a stau împreună', 'Total: 2'],
        proof: () => 2
      }
    ]),
    ...words([
      {
        id: 'hz-r6a-03', lesson: 'omonime', level: 6, skill: 'trap', point: 'omonim',
        prompt: '«lac» din «lac de pădure» și «lac» din «lac de mobilă» sunt sinonime sau omonime? Scrie: omonime.',
        answer: 'omonime',
        explain: 'Forma este aceeași, sensul nu. Sunt omonime.',
        steps: ['Aceeași scriere', 'Sensuri diferite', 'Sunt omonime']
      },
      {
        id: 'hz-r6a-04', lesson: 'diftong-hiat', level: 8, skill: 'analyze', point: 'hiat',
        prompt: 'În «po-e-zie», vocalele o și e formează diftong sau hiat? Scrie: hiat.',
        answer: 'hiat',
        explain: 'Stau în silabe vecine, deci sunt în hiat.',
        steps: ['po și e sunt silabe diferite', 'Vocalele nu stau în aceeași silabă', 'Este hiat']
      }
    ])
  ];
  return pack('romana:6:lumea-de-acasa', flashcards, tests);
}

function prietenie() {
  const flashcards = grids([
    {
      id: 'hx-r6f-01', lesson: 'verbul', level: 1, skill: 'apply', point: 'verb',
      question: 'În «Mara scrie o scrisoare.», predicatul verbal este…',
      correct: 'scrie',
      wrong: ['Mara', 'scrisoare', 'o'],
      explain: 'scrie arată acțiunea. Mara este subiectul. scrisoare este obiectul asupra căruia se răsfrânge acțiunea.'
    },
    {
      id: 'hx-r6f-02', lesson: 'predicat-nominal', level: 2, skill: 'trap', point: 'nominal',
      question: 'În «Andrei este loial.», predicatul nominal este…',
      correct: 'este loial',
      wrong: ['Andrei', 'este', 'loial'],
      explain: 'Predicatul nominal cuprinde verbul copulativ și numele predicativ: este loial. Andrei este subiectul. Nici este, nici loial nu stau singure ca predicat întreg.'
    },
    {
      id: 'hx-r6f-03', lesson: 'conjunctiv', level: 3, skill: 'apply', point: 'conjunctiv',
      question: 'Care formă este la conjunctiv?',
      correct: 'să asculte',
      wrong: ['ascultă', 'a ascultat', 'ascultând'],
      explain: 'să plus verbul marchează conjunctivul. ascultă este indicativ prezent. a ascultat este perfect compus. ascultând este gerunziu.'
    },
    {
      id: 'hx-r6f-04', lesson: 'conditional-optativ', level: 4, skill: 'apply', point: 'conditional',
      question: '«Aș veni, dacă m-ai chema.» Verbul aș veni arată…',
      correct: 'o faptă dorită, legată de o condiție',
      wrong: ['o faptă deja încheiată', 'o poruncă', 'o descriere de loc'],
      explain: 'Conditionalul-optativ spune ce ar face vorbitorul dacă s-ar împlini condiția. Nu este trecut și nu este imperativ.'
    },
    {
      id: 'hx-r6f-05', lesson: 'vorbire-indirecta', level: 5, skill: 'trap', point: 'indirect',
      question: 'Transpus corect în vorbire indirectă, «Ana a spus: Vin mâine.» devine…',
      correct: 'Ana a spus că vine a doua zi.',
      wrong: [
        'Ana a spus că vin mâine.',
        'Ana a spus: Vin mâine.',
        'Ana a spus vin eu acum.'
      ],
      explain: 'În indirectă dispar două puncte și se schimbă persoana și reperul de timp: ea vine, a doua zi. Prima variantă greșită păstrează persoana I.'
    },
    {
      id: 'hx-r6f-06', lesson: 'rezumat', level: 6, skill: 'analyze', point: 'rezumat',
      question: 'Ce nu intră într-un rezumat?',
      correct: 'părerea ta despre cât de frumos a fost',
      wrong: ['cine este personajul', 'fapta principală', 'deznodământul'],
      explain: 'Rezumatul păstrează firul, nu aprecierea. Personajul, fapta și finalul sunt necesare.'
    },
    {
      id: 'hx-r6f-07', lesson: 'momente-subiect', level: 7, skill: 'analyze', point: 'subiect',
      question: 'Într-o narațiune, deznodământul este…',
      correct: 'felul în care se încheie conflictul',
      wrong: ['prima descriere de peisaj', 'titlul', 'numele editurii'],
      explain: 'Deznodământul închide încurcătura. Peisajul de început este expozițiune sau descriere. Titlul și editura stau în afara firului.'
    },
    {
      id: 'hx-r6f-08', lesson: 'dialog-literar', level: 8, skill: 'false', point: 'dialog',
      question: 'Care enunț este fals?',
      correct: 'În dialog, linia de pauză arată neapărat o descriere de peisaj.',
      wrong: [
        'Linia de pauză poate introduce replica unui personaj.',
        'Personajele pot avea voci diferite.',
        'Dialogul poate grăbi scena.'
      ],
      explain: 'Linia de dialog marchează o replică, nu un peisaj. Vocile diferite și ritmul scenei sunt roluri reale ale dialogului.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r6f-01', lesson: 'predicat-nominal', level: 6, skill: 'trap', point: 'nominal',
        prompt: 'În «Andrei este loial.», predicatul este verbal sau nominal? Scrie: nominal.',
        answer: 'nominal',
        explain: 'este loial spune o însușire prin verb copulativ și nume predicativ.',
        steps: ['este este copulativ', 'loial este nume predicativ', 'Predicatul este nominal']
      },
      {
        id: 'hz-r6f-02', lesson: 'conjunctiv', level: 8, skill: 'apply', point: 'conjunctiv',
        prompt: 'Ce mod este «să asculte»? Scrie: conjunctiv.',
        answer: 'conjunctiv',
        explain: 'să plus forma verbului marchează conjunctivul.',
        steps: ['Apare să', 'Verbul nu este la indicativ', 'Modul este conjunctiv']
      }
    ]),
    ...counts([
      {
        id: 'hz-r6f-03', lesson: 'rezumat', level: 6, skill: 'analyze', point: 'rezumat',
        prompt: 'Un rezumat păstrează începutul, conflictul și finalul. Câte momente sunt acestea?',
        explain: 'Trei momente ale firului.',
        steps: ['început', 'conflict', 'final', 'Total: 3'],
        proof: () => 3
      },
      {
        id: 'hz-r6f-04', lesson: 'dialog-literar', level: 7, skill: 'apply', point: 'dialog',
        prompt: 'În «— Vin. — Te aștept.», câte replici sunt?',
        explain: 'Două replici, fiecare după linia de pauză.',
        steps: ['Vin', 'Te aștept', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:6:taramul-prieteniei', flashcards, tests);
}

function intelepciune() {
  const flashcards = grids([
    {
      id: 'hx-r6w-01', lesson: 'fabula', level: 1, skill: 'apply', point: 'fabula',
      question: 'O fabulă se încheie de obicei cu…',
      correct: 'o învățătură',
      wrong: ['o listă de prețuri', 'un orar', 'o adresă'],
      explain: 'Fabula spune o întâmplare ca să lase o morală. Prețurile, orarul și adresa țin de texte practice.'
    },
    {
      id: 'hx-r6w-02', lesson: 'personificare', level: 2, skill: 'trap', point: 'personificare',
      question: '«Vulpea a zâmbit și a dat un sfat.» Aici vulpea este…',
      correct: 'personificată',
      wrong: ['un numeral', 'o prepoziție', 'un diacritic'],
      explain: 'Zâmbetul și sfatul sunt gesturi omenești date unui animal. Asta este personificare, nu o parte de vorbire.'
    },
    {
      id: 'hx-r6w-03', lesson: 'cazuri', level: 3, skill: 'apply', point: 'caz',
      question: 'În «Cartea Irinei este nouă.», «Irinei» stă în cazul…',
      correct: 'genitiv',
      wrong: ['vocativ', 'nominativ', 'acuzativ'],
      explain: 'Întrebi a cui este cartea: a Irinei. Genitivul arată posesia. Nominativul ar fi Irina, când ea este subiect.'
    },
    {
      id: 'hx-r6w-04', lesson: 'cazuri', level: 4, skill: 'trap', point: 'dativ',
      question: 'În «I-am dat Irinei creionul.», «Irinei» răspunde la…',
      correct: 'cui',
      wrong: ['unde', 'când', 'cum'],
      explain: 'Dativul răspunde la cui i-am dat. Unde, când și cum cer circumstanțiale, nu destinatarul.'
    },
    {
      id: 'hx-r6w-05', lesson: 'pronume-reflexiv', level: 5, skill: 'apply', point: 'reflexiv',
      question: 'În «Mara se spală.», pe cine privește acțiunea?',
      correct: 'pe Mara însăși',
      wrong: ['pe un coleg', 'pe o carte', 'pe nimeni'],
      explain: 'se arată că subiectul face acțiunea asupra lui. Nu este alt coleg și nu este un obiect.'
    },
    {
      id: 'hx-r6w-06', lesson: 'subiect-acord', level: 6, skill: 'trap', point: 'acord',
      question: 'Care enunț este corect?',
      correct: 'Copiii au venit devreme.',
      wrong: ['Copiii a venit devreme.', 'Copilul au venit devreme.', 'Copiii ați venit devreme.'],
      explain: 'Subiectul la plural cere au venit. a venit este pentru singular. ați venit este persoana a II-a.'
    },
    {
      id: 'hx-r6w-07', lesson: 'proverbe', level: 7, skill: 'analyze', point: 'proverb',
      question: '«Cine se scoală de dimineață departe ajunge.» sfătuiește…',
      correct: 'să începi treaba la timp',
      wrong: ['să dormi peste ora', 'să eviți orice drum', 'să numeri pașii'],
      explain: 'Proverbul leagă începutul de dimineață de un drum lung dus la capăt. Nu laudă întârzierea.'
    },
    {
      id: 'hx-r6w-08', lesson: 'pronume-personal', level: 8, skill: 'false', point: 'pronume',
      question: 'Care enunț este fals?',
      correct: 'Pronumele personal nu poate fi subiect.',
      wrong: [
        'Eu poate fi subiect.',
        'Pronumele ține locul unui nume.',
        'Se poate acorda verbul cu el.'
      ],
      explain: 'Eu citesc are pronumele eu ca subiect. Pronumele înlocuiește un nume și poate comanda acordul verbului.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r6w-01', lesson: 'cazuri', level: 6, skill: 'apply', point: 'caz',
        prompt: 'În «cartea Irinei», Irinei este genitiv sau acuzativ? Scrie: genitiv.',
        answer: 'genitiv',
        explain: 'Răspunde la a cui, deci este genitiv.',
        steps: ['Întrebi a cui este cartea', 'Irinei arată posesorul', 'Cazul este genitiv']
      },
      {
        id: 'hz-r6w-02', lesson: 'personificare', level: 8, skill: 'trap', point: 'personificare',
        prompt: 'În «Vulpea a zâmbit.», figura este personificare sau enumerație? Scrie: personificare.',
        answer: 'personificare',
        explain: 'Animalului i se dă un gest omenesc.',
        steps: ['Vulpea zâmbește', 'Zâmbetul este omenesc', 'Figura este personificare']
      }
    ]),
    ...counts([
      {
        id: 'hz-r6w-03', lesson: 'subiect-acord', level: 6, skill: 'trap', point: 'acord',
        prompt: 'În enunțul corect «Copiii au venit.», la ce persoană și număr este subiectul? Scrie câte persoane sunt numite de copiii, adică numărul copiilor dacă sunt trei în textul «trei copii au venit». Câți copii spune textul «trei copii au venit»?',
        explain: 'Textul spune trei copii.',
        steps: ['Citești numeralul', 'trei', 'Total: 3'],
        proof: () => 3
      },
      {
        id: 'hz-r6w-04', lesson: 'fabula', level: 7, skill: 'apply', point: 'fabula',
        prompt: 'O fabulă are întâmplarea și învățătura. Câte părți mari numeri aici?',
        explain: 'Două: întâmplarea și morala.',
        steps: ['întâmplarea', 'învățătura', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:6:intelepciunea-lumii', flashcards, tests);
}

function tablouri() {
  const flashcards = grids([
    {
      id: 'hx-r6b-01', lesson: 'pastelul', level: 1, skill: 'apply', point: 'pastel',
      question: 'Un pastel descrie mai ales…',
      correct: 'un peisaj',
      wrong: ['o rețetă', 'un regulament', 'un tabel de note'],
      explain: 'Pastelul pictează natura în versuri. Rețeta, regulamentul și tabelul sunt texte nonliterare.'
    },
    {
      id: 'hx-r6b-02', lesson: 'epitet-enumeratie', level: 2, skill: 'trap', point: 'epitet',
      question: 'În «lumina blândă a serii», epitetul este…',
      correct: 'blândă',
      wrong: ['lumina', 'serii', 'prepoziția'],
      explain: 'blândă dă o nuanță luminii, nu o măsoară tehnic. lumina este substantivul. serii arată când.'
    },
    {
      id: 'hx-r6b-03', lesson: 'epitet-enumeratie', level: 3, skill: 'apply', point: 'enumeratie',
      question: '«Au venit mere, pere și prune.» este…',
      correct: 'enumerație',
      wrong: ['epitet', 'diftong', 'genitiv'],
      explain: 'Trei nume de fructe sunt așezate în șir. Nu este un adjectiv ornamental și nu este un caz.'
    },
    {
      id: 'hx-r6b-04', lesson: 'versificatie', level: 4, skill: 'apply', point: 'strofa',
      question: 'O strofă este…',
      correct: 'un grup de versuri',
      wrong: ['un semn de punctuație', 'un caz al substantivului', 'o prepoziție'],
      explain: 'Versurile se grupează în strofe. Strofa nu este o parte de propoziție.'
    },
    {
      id: 'hx-r6b-05', lesson: 'adjectivul', level: 5, skill: 'trap', point: 'adjectiv',
      question: 'Care acord este corect?',
      correct: 'flori galbene',
      wrong: ['flori galben', 'floare galbeni', 'flori galbenă'],
      explain: 'flori este plural, deci galbene. galben rămâne masculin singular. galbeni nu se potrivește cu floare. galbenă este singular.'
    },
    {
      id: 'hx-r6b-06', lesson: 'stirea', level: 6, skill: 'analyze', point: 'stire',
      question: 'Într-o știre, ce informație este esențială?',
      correct: 'unde s-a întâmplat',
      wrong: ['ce rimă are titlul', 'ce epitet îți place', 'câți versi ai numărat'],
      explain: 'Știrea răspunde la unde, când, cine, ce. Rima, epitetul și versul țin de textul literar.'
    },
    {
      id: 'hx-r6b-07', lesson: 'text-descriptiv', level: 7, skill: 'false', point: 'descriere',
      question: 'Care enunț este fals?',
      correct: 'O descriere trebuie să aibă neapărat un conflict și un vinovat.',
      wrong: [
        'O descriere poate urmări culorile.',
        'Poate fi organizată din prim-plan spre fundal.',
        'Poate exista fără o ceartă între personaje.'
      ],
      explain: 'Conflictul ține de narațiune. Descrierea poate fi doar o imagine, fără vinovat.'
    },
    {
      id: 'hx-r6b-08', lesson: 'versificatie', level: 8, skill: 'analyze', point: 'rima',
      question: 'Versurile «seară / cărare» rimează pentru că…',
      correct: 'se termină cu același grup de sunete',
      wrong: ['au același număr de litere', 'încep cu aceeași literă', 'sunt substantive'],
      explain: 'Rima privește sfârșitul: ară. Numărul literelor, inițiala și partea de vorbire nu fac rima.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r6b-01', lesson: 'epitet-enumeratie', level: 6, skill: 'trap', point: 'epitet',
        prompt: 'În «lumina blândă», ce este «blândă»: epitet sau predicat? Scrie: epitet.',
        answer: 'epitet',
        explain: 'blândă determină lumină și îi dă o nuanță.',
        steps: ['stă lângă un substantiv', 'nu spune o acțiune', 'este epitet']
      },
      {
        id: 'hz-r6b-02', lesson: 'versificatie', level: 8, skill: 'analyze', point: 'rima',
        prompt: '«seară» și «cărare» rimează sau sunt omonime? Scrie: rimează.',
        answer: 'rimează',
        explain: 'Se termină la fel, dar au sensuri diferite și nu sunt aceeași formă. Rimează.',
        steps: ['Finalul este ară', 'Sensurile diferă', 'Este rimă']
      }
    ]),
    ...counts([
      {
        id: 'hz-r6b-03', lesson: 'epitet-enumeratie', level: 6, skill: 'apply', point: 'enumeratie',
        prompt: 'În «mere, pere și prune», câte elemente are enumerația?',
        explain: 'Enumerația are trei fructe: mere, pere și prune.',
        steps: ['mere', 'pere', 'prune', 'Total: 3'],
        proof: () => 3
      },
      {
        id: 'hz-r6b-04', lesson: 'versificatie', level: 7, skill: 'apply', point: 'strofa',
        prompt: 'O strofă de patru versuri se numește catren. Câte versuri are?',
        explain: 'Catrenul este o strofă de patru versuri.',
        steps: ['Catrenul are patru rânduri', 'Total: 4'],
        proof: () => 4
      }
    ])
  ];
  return pack('romana:6:tablouri-de-poveste', flashcards, tests);
}

function calatorii() {
  const flashcards = grids([
    {
      id: 'hx-r6c-01', lesson: 'adverbul', level: 1, skill: 'apply', point: 'adverb',
      question: 'În «Aleargă repede.», adverbul este…',
      correct: 'repede',
      wrong: ['Aleargă', 'subiectul', 'articolul'],
      explain: 'repede arată felul acțiunii. Aleargă este verbul. Grupul întreg nu este doar adverbul.'
    },
    {
      id: 'hx-r6c-02', lesson: 'complemente', level: 2, skill: 'apply', point: 'direct',
      question: 'În «Citesc o hartă.», complementul direct este…',
      correct: 'o hartă',
      wrong: ['Citesc', 'o', 'hartă citesc'],
      explain: 'Întrebi ce citesc: o hartă. Verbul este predicatul. Articolul singur nu este complementul.'
    },
    {
      id: 'hx-r6c-03', lesson: 'circumstantiale', level: 3, skill: 'trap', point: 'timp',
      question: 'În «Plecăm dis-de-dimineață.», dis-de-dimineață este complement…',
      correct: 'de timp',
      wrong: ['direct', 'de mod', 'de cauză'],
      explain: 'Răspunde la când plecăm. Complementul direct ar răspunde la ce. Modul ar răspunde la cum. Cauza ar răspunde la de ce.'
    },
    {
      id: 'hx-r6c-04', lesson: 'circumstantiale', level: 4, skill: 'analyze', point: 'loc',
      question: 'În «Harta stă în rucsac.», în rucsac arată…',
      correct: 'locul',
      wrong: ['timpul', 'persoana', 'numărul'],
      explain: 'în rucsac răspunde la unde. Nu spune când și nu este subiectul.'
    },
    {
      id: 'hx-r6c-05', lesson: 'recenzia', level: 5, skill: 'analyze', point: 'recenzie',
      question: 'O recenzie de carte trebuie să aibă…',
      correct: 'o părere argumentată',
      wrong: ['doar prețul', 'doar numărul de pagini', 'doar culoarea copertei'],
      explain: 'Recenzia spune ce crezi și de ce. Prețul, paginile și coperta pot fi detalii, dar nu țin loc de părere.'
    },
    {
      id: 'hx-r6c-06', lesson: 'act-limbaj', level: 6, skill: 'trap', point: 'act',
      question: '«Îți dau harta mea.» este mai ales…',
      correct: 'o ofertă',
      wrong: ['o descriere de munte', 'o întrebare', 'o interdicție'],
      explain: 'Vorbitorul oferă un obiect. Nu descrie un peisaj, nu întreabă și nu interzice.'
    },
    {
      id: 'hx-r6c-07', lesson: 'narativ-timp', level: 7, skill: 'false', point: 'timp',
      question: 'Care enunț este fals?',
      correct: 'Într-o povestire, faptele nu pot fi spuse decât în ordinea în care s-au petrecut.',
      wrong: [
        'Povestirea poate începe din mijlocul faptelor.',
        'Un indiciu de timp te ajută să reconstitui ordinea.',
        'Naratorul poate aminti o faptă mai veche.'
      ],
      explain: 'Textul poate începe din mijloc sau poate face o întoarcere. Ordinea povestirii nu este obligată să copieze ordinea vieții.'
    },
    {
      id: 'hx-r6c-08', lesson: 'narativ-descriptiv', level: 8, skill: 'analyze', point: 'mix',
      question: '«A urcat poteca. Bradul era acoperit de brumă.» A doua propoziție este…',
      correct: 'descriptivă',
      wrong: ['o poruncă', 'un titlu', 'o formulă de scrisoare'],
      explain: 'Întâi este o faptă, apoi o imagine a bradului. A doua propoziție descrie, nu poruncește.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r6c-01', lesson: 'circumstantiale', level: 6, skill: 'trap', point: 'timp',
        prompt: 'În «Plecăm dis-de-dimineață.», complementul este de timp sau de mod? Scrie: timp.',
        answer: 'timp',
        explain: 'dis-de-dimineață răspunde la când.',
        steps: ['Întrebi când', 'Nu întrebi cum', 'Este complement de timp']
      },
      {
        id: 'hz-r6c-02', lesson: 'act-limbaj', level: 8, skill: 'analyze', point: 'act',
        prompt: '«Îți dau harta.» este o ofertă sau o interdicție? Scrie: ofertă.',
        answer: 'ofertă',
        explain: 'Vorbitorul îi trece celuilalt harta, deci oferă.',
        steps: ['dau înseamnă că predau ceva', 'nu apare o oprire', 'este ofertă']
      }
    ]),
    ...counts([
      {
        id: 'hz-r6c-03', lesson: 'complemente', level: 6, skill: 'apply', point: 'direct',
        prompt: 'În «Citesc o hartă și un bilet.», câte complemente directe coordonate sunt?',
        explain: 'o hartă și un bilet. Două.',
        steps: ['o hartă', 'un bilet', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r6c-04', lesson: 'narativ-descriptiv', level: 7, skill: 'analyze', point: 'mix',
        prompt: 'În «A urcat. Bradul era alb.», câte propoziții sunt?',
        explain: 'Două propoziții, una de faptă și una de imagine.',
        steps: ['A urcat', 'Bradul era alb', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:6:calatorii-literare', flashcards, tests);
}

function ferestre() {
  const flashcards = grids([
    {
      id: 'hx-r6v-01', lesson: 'text-argumentativ', level: 1, skill: 'apply', point: 'argument',
      question: 'Un text argumentativ are nevoie de…',
      correct: 'o părere și un motiv',
      wrong: ['doar o rimă', 'doar o listă de culori', 'doar un vocativ'],
      explain: 'Argumentarea spune ce susții și de ce. Rima, culorile și vocativul nu țin loc de motiv.'
    },
    {
      id: 'hx-r6v-02', lesson: 'text-argumentativ', level: 2, skill: 'trap', point: 'argument',
      question: 'Care enunț este un argument, nu o simplă părere?',
      correct: 'Biblioteca trebuie prelungită, fiindcă sala de clasă se închide la patru.',
      wrong: [
        'Biblioteca îmi place.',
        'Ce bibliotecă!',
        'Biblioteca, biblioteca.'
      ],
      explain: 'fiindcă aduce un motiv verificabil. Celelalte enunțuri spun o plăcere, o exclamație sau o repetiție.'
    },
    {
      id: 'hx-r6v-03', lesson: 'sintaxa-principale', level: 3, skill: 'apply', point: 'principala',
      question: 'În «Citesc seara fiindcă e liniște.», principala este…',
      correct: 'Citesc seara',
      wrong: ['fiindcă e liniște', 'seara fiindcă', 'e liniște'],
      explain: 'Ideea de bază este că citesc seara. Propoziția cu fiindcă dă motivul și depinde de principală.'
    },
    {
      id: 'hx-r6v-04', lesson: 'sintaxa-secundare', level: 4, skill: 'analyze', point: 'cauzala',
      question: '«fiindcă e liniște» este propoziție…',
      correct: 'cauzală',
      wrong: ['temporală', 'finală', 'atributivă'],
      explain: 'Răspunde la de ce. Temporala ar răspunde la când, finala la cu ce scop, atributiva ar determina un substantiv.'
    },
    {
      id: 'hx-r6v-05', lesson: 'sintaxa-secundare', level: 5, skill: 'trap', point: 'finala',
      question: 'În «Închid geamul ca să nu bată vântul.», ca să introduce…',
      correct: 'un scop',
      wrong: ['un loc', 'o posesie', 'un numeral'],
      explain: 'ca să arată pentru ce închid geamul. Nu spune unde și nu arată a cui este ceva.'
    },
    {
      id: 'hx-r6v-06', lesson: 'stilul', level: 6, skill: 'analyze', point: 'stil',
      question: 'Pentru o cerere către director, stilul potrivit este…',
      correct: 'politicos și limpede',
      wrong: ['plin de porecle', 'doar în rimă', 'fără verb'],
      explain: 'Cererea trebuie înțeleasă și să respecte destinatarul. Poreclele și rima o duc spre joacă. Fără verb nu rămâne o cerere.'
    },
    {
      id: 'hx-r6v-07', lesson: 'text-auxiliar', level: 7, skill: 'false', point: 'auxiliar',
      question: 'Care enunț este fals?',
      correct: 'O hartă de lângă text nu poate ajuta la înțelegere.',
      wrong: [
        'O schemă poate rezuma pașii.',
        'Un tabel poate compara două idei.',
        'Textul auxiliar stă lângă textul principal.'
      ],
      explain: 'Harta, schema și tabelul sunt texte auxiliare tocmai ca să ajute. Enunțul fals le neagă rolul.'
    },
    {
      id: 'hx-r6v-08', lesson: 'atitudini-emotii', level: 8, skill: 'analyze', point: 'atitudine',
      question: '«Înțeleg că ești supărat, dar lovitul ghiozdanului nu repară nota.» Ce face vorbitorul?',
      correct: 'recunoaște emoția și oprește fapta',
      wrong: ['râde de notă', 'lovește și el ghiozdanul', 'schimbă subiectul în glumă'],
      explain: 'Întâi primește supărarea, apoi arată că gestul nu rezolvă problema. Nu o ia în râs și nu o repetă.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r6v-01', lesson: 'sintaxa-secundare', level: 6, skill: 'analyze', point: 'cauzala',
        prompt: 'În «Citesc fiindcă e liniște.», propoziția cu fiindcă este cauzală sau finală? Scrie: cauzală.',
        answer: 'cauzală',
        explain: 'fiindcă dă motivul, nu scopul.',
        steps: ['Răspunde la de ce', 'Scopul ar fi ca să', 'Este cauzală']
      },
      {
        id: 'hz-r6v-02', lesson: 'sintaxa-secundare', level: 8, skill: 'trap', point: 'finala',
        prompt: 'În «Închid geamul ca să nu bată vântul.», ca să introduce scop sau cauză? Scrie: scop.',
        answer: 'scop',
        explain: 'ca să arată pentru ce se face fapta.',
        steps: ['ca să privește ținta', 'fiindcă ar fi fost cauză', 'Este scop']
      }
    ]),
    ...counts([
      {
        id: 'hz-r6v-03', lesson: 'text-argumentativ', level: 6, skill: 'apply', point: 'argument',
        prompt: 'Un paragraf argumentativ are părerea, motivul și exemplul. Câte piese numeri?',
        explain: 'Paragraful are trei piese: părerea, motivul și exemplul.',
        steps: ['părerea', 'motivul', 'exemplul', 'Total: 3'],
        proof: () => 3
      },
      {
        id: 'hz-r6v-04', lesson: 'sintaxa-principale', level: 7, skill: 'apply', point: 'principala',
        prompt: 'În «Citesc seara fiindcă e liniște.», câte propoziții sunt?',
        explain: 'Principala și cauzala. Două.',
        steps: ['Citesc seara', 'fiindcă e liniște', 'Total: 2'],
        proof: () => 2
      }
    ])
  ];
  return pack('romana:6:ferestre-spre-viitor', flashcards, tests);
}

function incheiere() {
  const flashcards = grids([
    {
      id: 'hx-r6z-01', lesson: 'sunete-sensuri', level: 1, skill: 'apply', point: 'sunet',
      question: 'Cuvintele «mare» (întindere de apă) și «mare» (adjectiv) se despart la…',
      correct: 'sens',
      wrong: ['numărul de litere', 'accentul pus pe ultima literă', 'faptul că unul este verb'],
      explain: 'Au aceeași formă și același număr de litere. Le desparte sensul: apa și mărimea. Niciunul nu este verb aici.'
    },
    {
      id: 'hx-r6z-02', lesson: 'dimineata-recap', level: 2, skill: 'apply', point: 'recap',
      question: 'În «Dimineața am repetat regula, apoi am scris exemple.», ordinea este…',
      correct: 'întâi regula, apoi exemplele',
      wrong: ['întâi exemplele, apoi regula', 'doar exemplele', 'doar regula'],
      explain: 'apoi pune exemplele după regulă. Nu citești fraza de la coadă.'
    },
    {
      id: 'hx-r6z-03', lesson: 'compunere-gradina', level: 3, skill: 'analyze', point: 'compunere',
      question: 'Într-o compunere despre o grădină, care început promite o întâmplare?',
      correct: 'Când am deschis poarta, am găsit banca răsturnată.',
      wrong: [
        'Grădina este un loc.',
        'Verde, verde, verde.',
        'Îmi place mult.'
      ],
      explain: 'Prima propoziție dă o faptă neașteptată. Celelalte sunt o definiție, o repetiție sau o părere fără scenă.'
    },
    {
      id: 'hx-r6z-04', lesson: 'lectura-vara', level: 4, skill: 'false', point: 'lectura',
      question: 'Care enunț este fals?',
      correct: 'Vara nu poți citi decât manuale.',
      wrong: [
        'Poți citi o povestire aleasă de tine.',
        'Poți relua o carte începută în an.',
        'Poți nota într-un jurnal ce ți-a plăcut.'
      ],
      explain: 'Lectura de vacanță nu este limitată la manual. Alegerea, reluarea și jurnalul sunt toate posibile.'
    },
    {
      id: 'hx-r6z-05', lesson: 'sunete-sensuri', level: 5, skill: 'trap', point: 'sens',
      question: 'În «A tras o fugă până la poartă.», «a tras o fugă» înseamnă…',
      correct: 'a alergat puțin',
      wrong: ['a desenat o linie', 'a închis poarta cu cheia', 'a măsurat gardul'],
      explain: 'Expresia înseamnă o alergare scurtă. Nu este un desen și nu este o măsurare.'
    },
    {
      id: 'hx-r6z-06', lesson: 'compunere-gradina', level: 6, skill: 'analyze', point: 'final',
      question: 'Care încheiere închide o întâmplare, nu o taie?',
      correct: 'Am ridicat banca și am lăsat grădina liniștită.',
      wrong: ['Atât.', 'Nu știu.', 'Cuvinte, cuvinte.'],
      explain: 'Încheierea arată ce s-a rezolvat. Atât, nu știu și repetiția nu închid fapta.'
    },
    {
      id: 'hx-r6z-07', lesson: 'dimineata-recap', level: 7, skill: 'trap', point: 'acord',
      question: 'Alege forma corectă.',
      correct: 'Dimineața, copiii își verifică ghiozdanul.',
      wrong: [
        'Seara, ei și-au uitat penarul acasă.',
        'Copilul lor au plecat fără caiet.',
        'Eu își verific ghiozdanele vecinului.'
      ],
      explain: 'Copiii își arată că fiecare își vede lucrul. «și-au» cu ei schimbă persoana. «au» nu se potrivește cu copilul singular. «eu își» amestecă persoanele.'
    },
    {
      id: 'hx-r6z-08', lesson: 'lectura-vara', level: 8, skill: 'analyze', point: 'lectura',
      question: 'După o carte citită vara, cea mai utilă notiță este…',
      correct: 'Ce m-a făcut să schimb părerea despre personaj.',
      wrong: ['Câte litere are titlul.', 'Ce culoare are coperta.', 'Pe ce raft a stat.'],
      explain: 'Notița bună păstrează o idee. Literele, culoarea și raftul nu spun ce ai înțeles.'
    }
  ]);
  const tests = [
    ...words([
      {
        id: 'hz-r6z-01', lesson: 'sunete-sensuri', level: 6, skill: 'trap', point: 'sens',
        prompt: '«a tras o fugă» înseamnă a alerga puțin sau a desena? Scrie: alerga.',
        answer: 'alerga',
        explain: 'Expresia numește o alergare scurtă.',
        steps: ['Nu este un desen', 'Este o deplasare grăbită', 'Sensul este alerga']
      },
      {
        id: 'hz-r6z-02', lesson: 'lectura-vara', level: 8, skill: 'analyze', point: 'lectura',
        prompt: 'O notiță care spune de ce ți-a plăcut finalul este despre formă sau despre idee? Scrie: idee.',
        answer: 'idee',
        explain: 'Motivul pentru care îți place finalul este o idee, nu culoarea copertei.',
        steps: ['Întrebi de ce', 'Nu numeri litere', 'Este o idee']
      }
    ]),
    ...counts([
      {
        id: 'hz-r6z-03', lesson: 'dimineata-recap', level: 6, skill: 'apply', point: 'recap',
        prompt: 'În «Am repetat regula, apoi am scris exemple.», câte acțiuni sunt?',
        explain: 'Am repetat și am scris. Două.',
        steps: ['am repetat', 'am scris', 'Total: 2'],
        proof: () => 2
      },
      {
        id: 'hz-r6z-04', lesson: 'compunere-gradina', level: 7, skill: 'analyze', point: 'compunere',
        prompt: 'O compunere cu început, cuprins și încheiere are câte părți de plan?',
        explain: 'Planul are trei părți: început, cuprins și încheiere.',
        steps: ['început', 'cuprins', 'încheiere', 'Total: 3'],
        proof: () => 3
      }
    ])
  ];
  return pack('romana:6:incheierea-anului', flashcards, tests);
}

module.exports = {
  recap,
  acasa,
  prietenie,
  intelepciune,
  tablouri,
  calatorii,
  ferestre,
  incheiere
};
