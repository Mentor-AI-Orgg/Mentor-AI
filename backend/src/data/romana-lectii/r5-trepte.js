'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = {
  id: 'trepte',
  title: 'Trepte în viață',
  inOwnWords: 'Unitatea 6 urcă pe trepte: emoții, voce, sat, numeral, apoi școala veche din Amintiri din copilărie, de Ion Creangă. Faptele și scena sunt în lecție. La școală, fragmentul din cartea ta poate avea alt titlu.',
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
    {
      term: 'numeral cardinal',
      meaning: 'Spune cât: unu, doi, douăzeci.'
    },
    {
      term: 'numeral ordinal',
      meaning: 'Spune al câtelea: primul, al doilea, a doua.'
    },
    {
      term: 'paraverbal',
      meaning: 'Cum spui: ton, ritm, pauză, tărie. Nu e cuvântul, nu e gestul.'
    },
    {
      term: 'nonverbal',
      meaning: 'Ce se vede: gest, față, poziția corpului.'
    },
    {
      term: 'patrimoniu',
      meaning: 'Obiceiuri, locuri și obiecte păstrate de la o generație la alta.'
    },
    {
      term: 'învechit',
      meaning: 'Formă sau sens care nu se mai folosește. În dicționar stă (Înv.).'
    },
    {
      term: 'dascăl',
      meaning: 'Și învățător, și cântăreț de biserică. Cuvântul a rămas din școala de lângă biserică.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-trepte',
      title: 'Ce vei descoperi în unitate',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Harta unității',
        text: 'Înainte de texte vezi ce reiei și ce descoperi. Numeralul face o știre verificabilă. Când apare o problemă, propui tu o ieșire.'
      }],
      theory: [
        'Unitatea are cinci competențe. Întâi stă codul 1.2. Apoi vine 2.5. Mai departe stă 3.2. Închid 4.4 și, separat, 5.2. Ele fixează ținta, nu cinci lecții separate.',
        'Reiei trei lucruri deja cunoscute: substantivul, școala și descrierea. Nu le lași deoparte, fiindcă se întorc în textele noi.',
        'Acum descoperi numeralul cardinal și pe cel ordinal. Mai descoperi emoția și comunicarea prin gest, adică nonverbalul.',
        'Schimbarea cuvintelor, privită în timp și de la un ținut la altul, stă mai încolo. Școala veche stă și ea mai încolo. Nu le lucrezi în deschidere.',
        'Înainte de text notezi cele cinci coduri, apoi un număr și un gest. Trei repere ajung ca să știi ce urmează. Harta îți arată și ce lași pe mai târziu, ca să nu amesteci temele.',
        'Proverbele de la început nu se lucrează în lecția aceasta. Le lași pentru alt moment, dacă apar.',
        'Numeralul nu este o podoabă. El face informația verificabilă: câți, al câtelea, cât de lung.',
        'Când întâlnești o problemă, nu te oprești la constatare. Propui o soluție pe care o poți spune în două rânduri.',
        'Harta nu ține loc de exercițiu. Ea așază temele, ca să recunoști sarcina când o întâlnești.',
        'La clasă, titlul de pe bancă poate fi altul. Ordinea rămâne: reiei, descoperi, notezi codurile, numeralul și gestul.'
      ].join('\n\n'),
      example: [
        'Reiei substantivul, apoi școala și descrierea. Descoperi cardinalul, ordinalul, emoția și gestul.',
        'Pe fișă stă codul 1.2, apoi 2.5. Mai stau 3.2 și 4.4. La urmă stă 5.2, plus un număr și un gest. Numeralul limpezește știrea. La problemă propui o ieșire.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă scrii doar emoția și uiți numeralul, harta rămâne incompletă. Gestul stă lângă emoție, nu în locul codurilor.'
      }],
      tryThis: 'Scrie două propoziții. În prima spune ce reiei și ce descoperi: substantiv, școală, descriere, cardinal, ordinal, emoție, gest. În a doua pune codul 1.2, apoi 2.5, apoi 3.2, apoi 4.4 și la urmă 5.2. Adaugă că schimbarea cuvintelor și proverbele de la început nu se lucrează acum.',
      keyPoints: [
        'Cinci coduri fixează unitatea, spuse pe rând: 1.2, apoi 2.5, apoi 3.2, apoi 4.4, iar la capăt 5.2.',
        'Reiei numele, școala și descrierea. Descoperi cardinalul, ordinalul, emoția și gestul.',
        'Variația cuvintelor și școala veche vin mai târziu. Proverbele de deschidere nu se lucrează aici.'
      ]
    }),
    lesson({
      id: 'atitudine',
      title: 'Emoții, atitudine și recitare',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Trei straturi',
        text: 'Emoția trece repede: frica, bucuria. Sentimentul durează, iar respectul este un exemplu. Felul în care te porți se numește atitudine.'
      }],
      theory: [
        'Alegi patru stări scurte și le dai câte o culoare. Negrul stă la frică. Galbenul stă la bucurie. Albastrul stă la uimire. Verdele stă la calm.',
        'Jurnalul dublu desparte foaia în două. Stânga păstrează textul. Dreapta păstrează ce ai simțit tu. Coloanele nu se schimbă între ele.',
        'Pentru casa din copilărie scrii trei porunci. Prima: Păstrează casa copilăriei. A doua: Ascultă bunicii. A treia: Desenează prispa.',
        'Recitarea este rostirea cu voce tare. Pauzele vin din punctuație. La virgulă te oprești scurt. La punct, pauza se aude clar.',
        'Ideile circulă prin vorbe. Stările se văd: un gest, o față, felul în care stai. Aceasta este zona nonverbală.',
        'Ele mai merg prin voce: intensitate, intonație, tempo și accent. Asta este paraverbalul. Cuvântul rămâne același, dar mesajul se schimbă.',
        'După ce ai rostit, notezi reușita și partea slabă. Fără această notiță, exercițiul nu se închide.',
        'Buncii îți spun cum arăta locuința lor, iar tu scrii un paragraf. Ana rostește un text despre casa din copilărie și oprește vocea unde e virgula.',
        'La Ana, coloana din stânga ține ideea de casă. Coloana din dreapta ține tristețea ei. Nu le amesteci.',
        'Un bravo rar, cu zâmbet, încurajează. Același cuvânt, dacă râzi scurt, ridici sprâncenele și schimbi tempo-ul, ia în râs.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: Ana recită despre casa copilăriei și oprește vocea la virgulă. Bravo-ul rar, cu zâmbet, încurajează.',
        'Ce observ: O văd pe Ana zâmbind. Aș spune și eu bravo rar, pentru că zâmbetul și vocea joasă încurajează, pe când râsul scurt batjocorește.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Bunica descrie prispa scundă și merii din ogradă. Nepotul face un paragraf și trei porunci. La rostire stă drept și grăbește puțin vocea.'
      }],
      tryThis: [
        'Bunica spune că locuința ei avea prispa scundă, iar în ogradă erau meri. Tu scrii un paragraf și trei porunci.',
        'La rostire stai drept, ridici mâna și vorbești rar. Accentul cade pe cuvântul din urmă. Pauza de după punct se aude. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Emoția trece repede, sentimentul ține, atitudinea este felul în care te porți. Patru emoții primesc patru culori.',
        'Jurnalul dublu desparte textul de impresie. Pentru casa copilăriei scrii trei imperative și un paragraf despre casa bunicilor.',
        'Recitarea ține pauzele. Ideile merg prin cuvinte, emoțiile prin gest și prin voce. La final notezi ce a mers și ce a șchiopătat.'
      ]
    }),
    lesson({
      id: 'vieru-casa',
      title: 'Vieru, tema și detaliile',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Temă sau detaliu',
        text: 'Tema este firul care trece prin tot textul. Detaliul este un amănunt, ținut deoparte. Dacă firul e peste tot, se bifează D. Dacă lipsește de peste tot, se bifează E.'
      }],
      theory: [
        'Anul de naștere al lui Grigore Vieru este 1935. S-a născut în fostul județ Hotin, pe teritoriul de azi al Republicii Moldova. Anul și locul rămân repere.',
        'Diploma de Onoare Hans Christian i-a fost dată în 1988. Membru corespondent al Academiei Române a devenit în 1993. Moartea lui, la Chișinău, este din 2009.',
        'Nu copiezi versuri și nu pui citate. Lucrezi tema și detaliul pe notițe, cu vorbele tale.',
        'În patru notițe despre casă, curtea liniștită apare de fiecare dată. De aceea casa, prin curte, ține tema.',
        'O fereastră mică stă numai în notița a doua. Rămâne detaliu, fiindcă nu trece prin tot textul.',
        'O stradă reală, încărcată de date, nu apare în nicio notiță. Pentru ea se bifează E.',
        'Pentru curtea care se repetă se bifează D. Nu bifezi D doar fiindcă îți place ideea. O vezi în toate părțile.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Dacă schimbi casa cu satul, regula rămâne. Ce se repetă este temă. Ce apare o dată este detaliu. Ce lipsește se bifează E.',
        'La clasă, textul de pe bancă poate avea alt titlu. Pașii rămân: cauți repetiția, izolezi detaliul, bifezi D sau E.',
        'Anii lui Vieru nu înlocuiesc lectura. Ei doar așază autorul: 1935, 1988, 1993, 2009.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: în patru notițe, curtea liniștită revine mereu. Fereastra mică stă doar în a doua.',
        'Ce observ: Văd casa, curtea și o fereastră mică. Aș sta în curte, pentru că ea se repetă și ține tema. Fereastra rămâne detaliu.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'În trei rânduri despre sat, drumul spre casă revine mereu, deci se bifează D. Un cuib de rândunică apare o dată, deci este detaliu. Un oraș cu multe date lipsește, deci se bifează E.'
      }],
      tryThis: 'În trei rânduri despre sat, drumul spre casă apare mereu, un cuib de rândunică apare o dată, iar un oraș cu date multe nu apare. Spune tema, detaliul și ce se bifează. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.',
      keyPoints: [
        'Tema străbate textul și se bifează D. Ce lipsește de peste tot se bifează E. Detaliul apare o dată.',
        'La notițele despre casă, curtea liniștită este temă, iar fereastra mică este detaliu.',
        'Reperele lui Vieru stau despărțite: nașterea în 1935, în fostul Hotin; diploma Hans Christian în 1988; locul de corespondent în 1993; moartea la Chișinău în 2009.'
      ]
    }),
    lesson({
      id: 'identitate-sat',
      title: 'Satul și identitatea națională',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Ce recunoaștem ca al nostru',
        text: 'Identitatea națională strânge ce simțim că ne aparține, ca popor. Satul intră în această recunoaștere. Părerea ta afirmă și cuprinde un amănunt.'
      }],
      theory: [
        'Muzeul Național al Satului poartă numele Dimitrie Gusti. Se află în București, lângă lacul Herăstrău. În el stau case aduse din regiuni diferite.',
        'Nu copiezi versuri și nu pui citate. Spui, cu vorbele tale, ce te reprezintă.',
        'Pentru cetățenie, cine nu o primește prin naștere învață limba standard. Mai învață simbolurile. Mai învață ziua națională și istoria.',
        'Enunțul asertiv afirmă. Nu întreabă și nu poruncește. În el pui un detaliu concret, nu o idee goală.',
        'O fetiță alege două semne: limba română și casa care are prispă. Prispa este amănuntul din enunț.',
        'Muzeul de lângă Herăstrău păstrează case din mai multe zone ale țării. Fetița poate lega prispa de o casă văzută acolo.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Un băiat poate alege hora sătească, împreună cu poarta din lemn. Poarta este amănuntul lui. Enunțul tot afirmă.',
        'Dacă vrea cetățenia și nu o are din naștere, învață aceleași patru lucruri: limba, simbolurile, ziua, istoria. Le spui pe rând, nu într-o grămadă.',
        'Casa bunicilor, cu o prispă îngustă, poate fi detaliul tău. Nu inventa un oraș dacă tema este satul.',
        'La clasă, textul poate avea alt titlu. Pașii rămân: identitate, detaliu, enunț care afirmă.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: fetița leagă limba română de casa cu prispă. Lângă Herăstrău, muzeul adună case din zone felurite ale țării.',
        'Ce observ: O văd lângă o casă cu prispă. Aș intra, pentru că prispa este detaliul care îi susține enunțul.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Băiatul afirmă că hora și poarta de lemn îl reprezintă. Pentru cetățenie învață, pe rând, limba îngrijită, semnele țării, sărbătoarea națională și trecutul.'
      }],
      tryThis: 'Un băiat alege hora sătească și poarta din lemn. Vrea cetățenia, deci învață limba îngrijită, apoi semnele țării, apoi sărbătoarea și trecutul. La bunici, prispa este îngustă. Părerea lui afirmă. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.',
      keyPoints: [
        'Satul ține de identitatea națională. Muzeul Dimitrie Gusti stă în București, lângă Herăstrău, cu case din regiuni diferite.',
        'Părerea ta este un enunț care afirmă și cuprinde un detaliu, cum este prispa.',
        'Cine nu primește cetățenia prin naștere învață, pe rând, limba îngrijită, semnele țării, sărbătoarea națională și trecutul.'
      ]
    }),
    lesson({
      id: 'numeral',
      title: 'Numeralul cardinal',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Cât, nu al câtelea',
        text: 'Numeralul dă o cantitate, un număr sau un loc în șir. Cardinalul răspunde la cât. Un și o numără doar dacă întrebarea este cât.'
      }],
      theory: [
        'Trei case spune cantitatea. Doisprezece ouă spune cantitatea. În ambele, cardinalul numără, nu arată locul.',
        'În cel puțin o fereastră, o răspunde la cât și este feminin. Un, când numără, este masculin. Genul se vede din numele de lângă el.',
        'În într-un coș, un nu numără. El prezintă coșul, deci este articol. Întrebarea cât nu are răspuns aici.',
        'În șirul care pornește de la doi, urmează al doilea, apoi doime, apoi de două ori. Toate se sprijină pe doi.',
        'De la unsprezece până la optsprezece, fiecare număr stă într-un singur cuvânt. Unșpe nu este forma bună. Nici unșpce.',
        'Pentru 16, forma bună este șaisprezece, nu șasesprezece. Pentru 17, forma bună este șăptesprezece, cu ă în prima silabă. Pentru 18, forma bună este optsprezece, nu optisprezece.',
        'Numărul 21 se desface în trei cuvinte: douăzeci, și, unu. Nu îl lipești într-unul singur.',
        'Ziua întâi pornește cu 12 ouă. În fiecare zi nouă iei un ou. Când ajungi la a șaptea zi, mai sunt 6.',
        'Cardinalul răspunde la cât. Dacă răspunsul este al câtelea, ai trecut la ordinal și nu mai ești în lecția aceasta.',
        'Când eziți între articol și numeral, pune întrebarea cât. Dacă nu se potrivește, un este articol.'
      ].join('\n\n'),
      example: [
        'În cel puțin o fereastră, o răspunde la cât și este numeral de feminin. În într-un coș, un doar prezintă, deci ține de articol.',
        'Șirul construit pe doi cuprinde și al doilea, și doime, și de două ori. 11 se scrie unsprezece. 21 se sparge în trei cuvinte. De la 12 ouă, luând câte unul, a șaptea zi păstrează 6.',
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Șaisprezece, șăptesprezece și optsprezece stau fiecare într-un cuvânt. Șasesprezece și optisprezece nu se scriu.'
      }],
      practice: [
        '1) În cel puțin o fereastră, ce este o? În într-un coș, ce este un și de ce?',
        '2) Pe ce număr se sprijină șirul care cuprinde al doilea, doime și de două ori?',
        '3) Cum se scriu 11, 16, 17, 18 și 21? Ce forme nu se folosesc: unșpe, unșpce, șasesprezece, optisprezece?',
        '4) Ziua întâi pornește cu 12 ouă și în fiecare zi iei unul. Câte rămân când ajungi la a șaptea zi?'
      ].join('\n\n'),
      answers: [
        'O din cel puțin o fereastră este numeral feminin. Un din într-un coș este articol, fiindcă prezintă coșul.',
        'Elementul de bază este doi.',
        '11 unsprezece, 16 șaisprezece, 17 șăptesprezece, 18 optsprezece. 21 se scrie în trei cuvinte: douăzeci și unu. Unșpe, unșpce, șasesprezece și optisprezece nu se folosesc.',
        'În ziua a șaptea sunt 6 ouă.'
      ],
      mistakes: 'Nu scrie unșpe, unșpce, șasesprezece sau optisprezece. Nu trata un din într-un coș ca numeral și nu lipi 21 într-un singur cuvânt.',
      tryThis: 'Scrie propoziții cu trei case, cu doisprezece ouă și cu grupul cel puțin o fereastră. Arată rolul lui un în într-un coș. Mai dă scrierea lui 11, a lui 16, a lui 17, a lui 18 și cele trei cuvinte din 21.',
      keyPoints: [
        'Cardinalul răspunde la cât. Un și o numără doar la această întrebare. În într-un coș, un ține de articol.',
        'Șirul cu al doilea, cu doime și cu de două ori se sprijină pe doi. Între 11 și 18, fiecare număr e un singur cuvânt.',
        '21 are trei cuvinte. De la 12 ouă, cu un ou mai puțin pe zi, în ziua a șaptea rămân 6.'
      ]
    }),
    lesson({
      id: 'ordinal',
      title: 'Numeralul ordinal',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Locul în grup',
        text: 'Ordinalul dă locul în șir, nu cantitatea. Masculinul are al doilea, apoi al treilea. Femininul are a doua, apoi a treia.'
      }],
      theory: [
        'În structură stau trei piese. Întâi al sau a. Apoi numeralul cardinal. La urmă articolul.',
        'Articolul de masculin este le. Îl auzi în al doilea. Articolul de feminin este a. Îl auzi în a doua. Genul se aude la ambele capete.',
        'Trei numără persoanele sau lucrurile. Al treilea le așază în șir. Dacă la întrebarea cât răspunzi cu al treilea, ai greșit întrebarea.',
        'Am trei ferestre dă cantitatea. A treia fereastră dă locul, la feminin. Al treilea perete dă locul, la masculin.',
        'Dacă muți rândurile și lași câte un singur obiect, locurile se mută. Numărul de obiecte nu se schimbă.',
        'La regi, ca și la capitole, X înseamnă zece, iar M înseamnă o mie. Nu le citești ca litere fără valoare.',
        'Ordinalul se acordă. Nu lași al doilea lângă un nume feminin și nu lași a doua lângă un nume masculin.',
        'Când inversezi obiectele, numeri din nou locurile. Primul devine ultimul doar dacă ai schimbat șirul, nu dacă ai schimbat cantitatea.',
        'X și M rămân cardinale ca valoare, dar în titluri de regi și de capitole marchează locul: al zecelea, al o miilea, spus prin cifră.',
        'Nu amesteca doime, care ține de fracție, cu al doilea, care ține de loc. Lecția aceasta este despre loc.'
      ].join('\n\n'),
      example: [
        'Am trei ferestre: trei numără. A treia fereastră arată locul, la feminin. Al treilea perete arată locul, la masculin.',
        'Dacă muți șirul și lași obiectele, se mută doar locurile. La regi, X valorează zece, iar M valorează o mie.',
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'A doua bancă este feminin. Al doilea rând este masculin. Articolul din urmă este a, respectiv le.'
      }],
      practice: [
        '1) Ce spune trei și ce spune al treilea? Dă câte un exemplu la masculin și la feminin.',
        '2) Din ce se construiește ordinalul și ce articol stă la masculin, ce articol stă la feminin?',
        '3) Dacă muți șirul și lași câte un obiect, ce se mută și ce rămâne neschimbat?',
        '4) Ce valorează X și ce valorează M când stau la regi sau la capitole?'
      ].join('\n\n'),
      answers: [
        'Trei numără. Al treilea așază. La masculin: al treilea perete. La feminin: a treia fereastră.',
        'Stau al sau a, cardinalul și articolul. La masculin articolul este le. La feminin articolul este a.',
        'Se mută locul. Numărul de obiecte rămâne.',
        'X valorează 10. M valorează 1000.',
      ],
      mistakes: 'Nu pune al doilea la feminin și nu răspunde la cât cu al treilea. Nu citi X și M ca litere fără valoare.',
      tryThis: 'Scrie câte o propoziție pentru al doilea și pentru al treilea, apoi pentru a doua și pentru a treia. Arată că trei numără, iar al treilea așază. La regi, X valorează zece, iar M valorează o mie.',
      keyPoints: [
        'Ordinalul dă locul și se acordă. Masculinul folosește al doilea și al treilea. Femininul folosește a doua și a treia.',
        'Structura are al sau a, apoi cardinalul, apoi articolul le ori a. Trei numără. Al treilea așază.',
        'Dacă muți șirul și lași obiectele, numărul lor rămâne. X valorează 10. M valorează 1000.',
      ]
    }),
    lesson({
      id: 'masuri-vechi',
      title: 'Unități de măsură, de azi și de demult',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Cu ce numeri',
        text: 'Unitatea de măsură este etalonul cu care numeri fie o lungime, fie o durată. Din 1960, etalonul de bază este Sistemul Internațional.'
      }],
      theory: [
        'Un kilometru are 1000 de metri. O oră are 60 de minute. Aceste două raporturi sunt de azi și se verifică ușor.',
        'Mila folosită pe mare măsoară 1852 de metri. Nu o confunzi cu kilometrul. Piciorul din sistemul anglo-saxon măsoară 0,304 metri.',
        'Din stânjen făceau parte piciorul și palma. În Moldova, stânjenul măsura 2,23 metri. În Muntenia, aceeași unitate măsura 1,97 metri.',
        'Aceeași unitate veche nu avea aceeași lungime peste tot. De aceea spui și regiunea, nu doar numele.',
        'Ultima devine ordinal numai la întrebarea a câta. Exemplul de loc este a cincea. În alte propoziții poate fi doar adjectivul de la capăt.',
        'Dacă păpușa din capăt este a cincea, numărând de la dreapta spre stânga, abia atunci ai locul. Scrii a cincea.',
        '1960 fixează trecerea la sistemul de azi. Înainte de el, stânjenul, piciorul și palma țineau de măsurile locului.',
        'Când compari o măsură veche cu una de azi, pui ambele numere. 2,23 și 1,97 nu se lasă fără metri.',
        'Ordinalul a cincea nu măsoară lungimea păpușii. El spune locul ei în șir.',
        'La răspuns numești unitatea, valoarea și, dacă e veche, regiunea.'
      ].join('\n\n'),
      example: [
        'Păpușa din capăt, numărată de la dreapta spre stânga, este a cincea. Abia atunci ultima devine ordinal.',
        'Mila de pe mare măsoară 1852 de metri. Piciorul anglo-saxon măsoară 0,304 metri. Stânjenul din Moldova măsura 2,23 metri, iar cel din Muntenia măsura 1,97 metri.',
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Un kilometru rămâne 1000 de metri, iar o oră rămâne 60 de minute. Ele nu se amestecă cu stânjenul.'
      }],
      practice: [
        '1) Câți metri are un kilometru, câte minute are o oră și din ce an folosim Sistemul Internațional?',
        '2) Câți metri are mila marină și câți metri are piciorul anglo-saxon?',
        '3) Ce lungime avea stânjenul în Moldova și ce lungime avea în Muntenia? Ce părți avea?',
        '4) Când este ultima un numeral ordinal? Dă exemplul cu păpușa.'
      ].join('\n\n'),
      answers: [
        'Un kilometru are 1000 de metri. O oră are 60 de minute. Sistemul Internațional este din 1960.',
        'Mila de pe mare măsoară 1852 de metri. Piciorul anglo-saxon măsoară 0,304 metri.',
        'În Moldova, stânjenul măsura 2,23 metri. În Muntenia măsura 1,97 metri. Piciorul și palma erau bucăți din el.',
        'Ultima este ordinal când spui a câta. Păpușa din capăt este a cincea.'
      ],
      mistakes: 'Nu lăsa stânjenul fără regiune și nu numi ultima ordinal în orice propoziție. Mila marină nu are 1000 de metri.',
      tryThis: 'Scrie două propoziții. În una pui mila marină, stânjenul din Moldova și pe cel din Muntenia, cu numerele lor. În alta spui că a cincea este ordinal când întrebi a câta.',
      keyPoints: [
        'Din 1960, Sistemul Internațional dă 1000 de metri la kilometru și 60 de minute la oră.',
        'Mila de pe mare măsoară 1852 de metri. Piciorul anglo-saxon măsoară 0,304 metri. Stânjenul din Moldova era de 2,23 metri, iar cel din Muntenia de 1,97.',
        'Ultima este ordinal numai când întrebi a câta. Modelul este a cincea.',
      ]
    }),
    lesson({
      id: 'patrimoniu',
      title: 'Patrimoniul și obiectivele',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Ce trece mai departe',
        text: 'Patrimoniul cultural strânge obiceiurile, tradițiile și arta pe care o comunitate le lasă urmașilor. UNESCO păstrează și locuri din natură.',
      }],
      theory: [
        'Pe listă stau Delta Dunării și Horezu, dar nu pe aceeași listă. Delta ține de natură. Horezu ține de cultură.',
        'Mai reții jocul Călușarilor. Separat stau lăcașurile din Moldova. Separat stau cele din Transilvania. La urmă stă biserica de lemn, cea din Maramureș.',
        'Zidurile te duc la Horezu. Pelicanii te duc la Deltă. Nu inversa indiciile.',
        'În prezentare pui fie un cardinal, fie un ordinal. Dacă ți se cere, cardinalul poate sta scris în litere, nu doar în cifre.',
        'Horezu poate fi al doilea obiectiv. Al doilea este ordinal. Doi pelicani numărați în Deltă sunt cardinal. Doi se poate scrie și cu litere.',
        'O prezentare fără număr rămâne vagă. Spui câte obiective, sau al câtelea, ca să se vadă locul în listă.',
        'Nu amesteca situl natural cu monumentul. Pelicanul nu stă la Horezu, iar zidul nu stă în Deltă.',
        'Călușarii țin de obicei, deci de patrimoniul care se joacă, nu de o clădire.',
        'Biserica de lemn din Maramureș nu se confundă cu bisericile din Moldova sau cu cele din Transilvania. Fiecare intrare își păstrează regiunea.',
        'Pe o scenă lucrezi în trei timpi doar dacă ai un text în față. Aici, sarcina este prezentarea: indiciu, număr, listă.',
        'Dacă scrii cardinalul cu cifre sau cu litere, valoarea rămâne aceeași. Se schimbă doar forma cerută.'
      ].join('\n\n'),
      example: [
        'Horezu este al doilea obiectiv, deci al doilea este ordinal. În Deltă am numărat doi pelicani, deci doi este cardinal și poate sta și în litere.',
        'Zidurile țin de Horezu. Pelicanii țin de Deltă. Cele două nume nu împart aceeași listă.',
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Călușarii își păstrează locul. Lăcașurile din Moldova stau separat de cele din Transilvania. Biserica de lemn, cea din Maramureș, își are și ea rândul.'
      }],
      tryThis: 'Scrie două propoziții. Du pelicanii spre Deltă, iar zidurile spre Horezu. Mai numește jocul Călușarilor, lăcașurile din Moldova, pe cele din Transilvania și biserica de lemn aflată în Maramureș. Pune un cardinal și un ordinal. Spune că Delta și Horezu nu împart lista.',
      keyPoints: [
        'Patrimoniul lasă urmașilor obiceiuri, tradiții și artă. UNESCO păstrează și locuri din natură.',
        'Delta și Horezu nu împart lista. Pelicanii țin de Deltă. Zidurile țin de Horezu.',
        'În prezentare lași fie un cardinal, fie un ordinal. Cardinalul poate sta și în litere, dacă așa ți se cere.',
      ]
    }),
    lesson({
      id: 'scoala',
      title: 'Școala și mesajul din Hamurabi',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'O singură clasă',
        text: 'Mesajul despre școală iese din vorbele și din cifrele unei clase anume. Diagrama nu se întinde peste școlile din toată țara.'
      }],
      theory: [
        'Cuvintele se împart în trei coloane. Una ține stările pozitive. Alta ține emoțiile negative. A treia ține cuvintele neutre.',
        'Afirmația că toți elevii din România ar fi triști nu iese din 18 răspunsuri. Sari din date dacă o spui.',
        'Chestionarul primește da sau nu. Mai adaugi un paragraf în care propui o soluție. Alt tip de răspuns nu e cerut.',
        'Mesajul unui text este ideea pentru care ai o faptă drept dovadă. Textul de aici se numește Hamurabi. L-a scris Mircea Sântimbreanu.',
        'Eugenița învață în clasa a cincea. Grupul dintr-a cincea arată locul, deci ține de ordinal.',
        'Starea stă lângă un nume, în rol de atribut, și primește linie. Alegi două stări bune și una rea. Fiecare se lipește de altă clipă.',
        'A doua stare bună cere o clipă diferită. Nu le înghesui pe toate în același moment.',
        'La Școala Constantin Brâncoveanu, clasa numără 18 elevi. Sunt 14 fete și 4 băieți. Calmul stă la stări pozitive. Stresul stă la emoții negative.',
        'La istorie, Eugenița nu își amintește lecția cu babilonienii, nici pe cea despre Hamurabi. Amână când e întrebată. Lângă privire stă speriată: este atribut și se subliniază.',
        'Ușurarea stă între stările bune. Frica de întrebare stă între cele rele. Ieșirea pe care o propui rămâne la clasa aceasta.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: la Școala Constantin Brâncoveanu, Eugenița, din clasa a cincea, nu își amintește lecția cu babilonienii și amână când e întrebată.',
        'Ce observ: O văd în clasă, cu privirea speriată. Aș vorbi liniștit cu ea, pentru că teama stă lângă întrebarea amânată, iar ușurarea poate veni după.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Un băiat așază liniștea între stările bune, graba între cele rele și banca între cele neutre. Lângă voce, tremurată este atribut și primește linie.',
      }],
      tryThis: [
        'În clasa cu 18 elevi, așază liniștea între stările bune, graba între cele rele și banca la neutre. O colegă zâmbește când e lăudată și se sperie când aude întrebarea.',
        'Soluția rămâne la această clasă. În vocea tremurată, subliniază atributul. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Trei coloane: stări pozitive, emoții negative, cuvinte neutre. Datele țin de o clasă, nu de toate școlile.',
        'La Brâncoveanu sunt 18 elevi, 14 fete și 4 băieți. Chestionarul primește da sau nu, plus o soluție.',
        'În Hamurabi, de Mircea Sântimbreanu, Eugenița din clasa a cincea amână întrebarea. Speriată este atribut și se subliniază.'
      ]
    }),
    lesson({
      id: 'variatie',
      title: 'Variația cuvintelor',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Formă și sens',
        text: 'Variația schimbă și forma, și înțelesul, fie odată cu anii, fie de la un ținut la altul. Marca (Înv.) se citește învechit. Marca (Reg.) se citește regional.',
      }],
      theory: [
        '(Înv.) nu înseamnă învățat. Este marca din dicționar pentru un cuvânt ieșit din uz. (Reg.) arată că forma ține de o zonă, nu de toată limba.',
        'Verbul a toci înseamnă repetare pe dinafară, fără să înțelegi. A învăța înseamnă să înțelegi. Nu le pui unul în locul celuilalt.',
        'La tocilar, primul înțeles este că ascuți unelte. Al doilea înțeles este memorarea fără gând. Pentru al doilea, antonimul dat este corijent.',
        'Litera mare scoate cuvântul în față. În spatele lui Spider-Man stă Peter Parker. Numele de persoană cere majusculă.',
        'Niște tocilari este formă nehotărâtă. Tocilarii, cu articol, este formă hotărâtă. Articolul schimbă felul în care prezinți grupul.',
        'Forma bună de azi este cea din limba standard. Excursie, ca și tematică, țin de anul 2022. Tartaj a rămas la Nică, care era elev în 1850.',
        'Reții patru formulări, fiecare în alt rând. Prima sună avantajele școlii. A doua sună dorințele familiei. A treia este facilității acesteia nu-i poți rezista. A patra este copiii de aici.',
        'Textul tău are trei paragrafe. În el stau două argumente. O bucată veche o treci în limba de azi, nu o lași cum suna în 1850.',
        'Dacă scrii tartaj într-un text de azi, îl marchezi ca vechi sau îl înlocuiești. Excursie nu se întoarce în gura lui Nică.',
        'Sensul 1 și sensul 2 ale lui tocilar nu se amestecă. Ascuțitul uneltelor nu este totuna cu memorarea.',
        'Pe textul deschis la clasă aplici aceleași mărci: (Înv.) pentru ieșit din uz, (Reg.) pentru regional.'
      ].join('\n\n'),
      example: [
        'Nu toci lecția pe dinafară: a toci este repetare fără înțelegere, iar a învăța cere să înțelegi. La tocilar, sensul 2 este memorarea, cu antonimul corijent.',
        'Niște tocilari rămâne nehotărât. Tocilarii este hotărât. Excursie și tematică țin de 2022. Tartaj rămâne cuvântul lui Nică, din 1850. Spider-Man este Peter Parker.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'O compunere de trei paragrafe, cu două argumente, poate folosi avantajele școlii și dorințele familiei, în limba standard.'
      }],
      tryThis: 'Scrie un text scurt, cu trei paragrafe și cu două motive, în limba de azi. Pune pe rânduri diferite avantajele școlii, apoi dorințele familiei, apoi formularea facilității acesteia nu-i poți rezista, apoi copiii de aici. Mai dă înțelesurile lui tocilar, antonimul corijent, mărcile (Înv.) și (Reg.), tartaj legat de 1850 și excursie legată de 2022.',
      keyPoints: [
        'Variația schimbă forma și sensul în timp sau după regiune. (Înv.) este învechit, (Reg.) este regional.',
        'A toci este repetare pe dinafară. Sensul 2 al lui tocilar este memorarea, cu antonimul corijent.',
        'Excursie și tematică țin de anul 2022. Tartaj a rămas la Nică, elev pe atunci, în 1850. Textul tău are trei paragrafe și două motive.',
      ]
    }),
    lesson({
      id: 'creanga-sat',
      title: 'Humulești și școala de altădată',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Școala din sat',
        text: 'Școala veche este cea din sat, spusă prin faptele locului, în Amintiri din copilărie. Autorul este Ion Creangă. Nu pui citate.'
      }],
      theory: [
        'Anul nașterii lui Ion Creangă este 1837. Locul este Humulești. A murit la Iași. Data este 31 decembrie 1889.',
        'Humulești se află dincolo de apa Neamțului. Are trei părți: Vatra, apoi Delenii, apoi Bejenii.',
        'Școala încăpea într-o chilie, lipită de poarta bisericii. Încăperea era mică. Scaunul cel nou n-a sosit din pricina unui elev în plus.',
        'Ascultarea cădea sâmbăta. Luna era mai. Banca lungă era numită Calul Bălan. Nuiaua purta numele Sfântul Nicolai, fiindcă acela era hramul.',
        'La prima abatere, Smărăndița primește pedeapsa. Nică îl judecă rău pe băiatul care îl ascultă. Replica din gând este a lui Nică.',
        'La dicționar, părintele se reduce la părinte. În părinte bun, substantivul este părinte, iar bun este atribut. Cuvântul ca semnalează comparația.',
        'Poți spune, cu vorbele tale, că chilia era mică, asemenea unei cutii. Nu pui un citat din carte.',
        'Altădată, pluralul lui școală suna școale. Carte putea însemna și scrisoare. Procitanie numește ascultarea, adică examinarea. Mă procitește se traduce prin mă ascultă.',
        'Dascăl a rămas și cântăreț la strană, și învățător, fiindcă primele școli au stat lângă biserică. Marca (Reg.) se citește regional, nu învechit.',
        'Cea dintâi școală românească atestată este din 1495. Locul este Șcheii Brașovului, la Sfântul Nicolae. 1495 este cardinal. Prima este ordinal.',
        'Pe o scenă lucrezi în trei timpi. Redai faptele cu vorbele tale. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce stă scris, pe scurt: la Humulești, școala încăpea într-o chilie de lângă biserică. Ascultarea cădea sâmbăta. Nică ședea pe banca căreia i se spunea Calul Bălan.',
        'Ce observ: Văd chilia strâmtă, banca cea lungă și nuiaua. Aș fi rămas cuminte pe bancă, pentru că ascultarea era sâmbăta, iar luna era mai.',
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Nuiaua se numea Sfântul Nicolai. Smărăndița era pedepsită la prima abatere. Anul 1495, la Șcheii Brașovului, ține de Sfântul Nicolae.'
      }],
      tryThis: 'Cu vorbele tale, fără citat, spune că sâmbăta, în luna mai, Nică aude Calul Bălan pentru bancă și Sfântul Nicolai pentru nuia. Adaugă pedeapsa Smărăndiței și anul 1495 din Șcheii Brașovului. Trei enunțuri: conținut, observație cu Văd, faptă cu pentru că.',
      keyPoints: [
        'Nașterea lui Creangă este în 1837, la Humulești. Moartea este la Iași, în 31 decembrie 1889. Satul, peste Neamț, cuprinde Vatra, Delenii și Bejenii.',
        'Încăperea de școală era o chilie. Ascultarea cădea sâmbăta, în mai. Banca era Calul Bălan, nuiaua era Sfântul Nicolai.',
        'Școale este pluralul vechi, carte putea fi scrisoare, procitanie este ascultarea, iar școala atestată din 1495 stă în Șcheii Brașovului.'
      ]
    }),
    lesson({
      id: 'timp-sumer',
      title: 'Deceniu, secol, mileniu',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Timpul lung',
        text: 'Deceniul, secolul și mileniul măsoară timpul lung și stau la cardinal. Deceniul ține 10 ani. Secolul ține 100 de ani. Mileniul ține 1000 de ani.',
      }],
      theory: [
        '10, 100 și 1000 nu sunt ordine în șir. Ele spun cât durează. De aceea stau la cardinal, nu la ordinal.',
        'Cam pe la 3500 î.Hr., scrisul sumerienilor folosea semne cuneiforme. Semnul era săpat, nu tras ca o literă de azi.',
        'La Uruk, cele dintâi cărți de școală erau tăblițe de lut. Pe ele stăteau liste de cuvinte. Nu le numi caiete.',
        'Uruk este nume propriu. Îl ții lângă civilizația veche, în lecția de istorie. Nu îl lipești, la întâmplare, de orice oraș.',
        'Există o carte numită Școala fricoșilor. Nu i se iau frazele. Dacă o pomenești, spui doar titlul.',
        'Un proverb se lămurește în două bucăți, cu vorbele tale. Întâi spui ce se înțelege. Apoi spui unde îl vezi azi.',
        'Nu lipi deceniul de o întâmplare de o zi. Pentru o zi ai ora. Pentru o viață de om poți avea deceniile.',
        'Cuneiformul și tăblița sunt probe că școala e veche. Numărul 3500 î.Hr. le fixează în timp.',
        'Când scrii 10, 100 sau 1000, spui și unitatea: ani. Fără ani, numărul rămâne gol.',
        'La clasă, proverb-ul de pe bancă poate fi altul. Cele două paragrafe rămân: sensul, apoi legătura cu tine.',
        'Numele Uruk nu se înlocuiește cu un oraș de azi. El ține de lecția de istorie, nu de o hartă oarecare.'
      ].join('\n\n'),
      example: [
        'Deceniul ține 10 ani. Secolul ține 100 de ani. Mileniul ține 1000 de ani. Toate trei stau la cardinal.',
        'Uruk se leagă de tăblițele de lut și de semnele cuneiforme, în jurul lui 3500 î.Hr. Proverbul se spune în două paragrafe, fără să copiezi Școala fricoșilor.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă pui Uruk lângă un oraș fără legătură cu sumerienii, numele propriu e pus la întâmplare. Îl lași în cuprinsul de istorie.'
      }],
      tryThis: 'Lămurește un proverb în două bucăți, cu vorbele tale. Spune că deceniul ține 10 ani, că secolul ține 100 de ani și că mileniul ține 1000. Mai pomenește anul 3500 î.Hr., semnele săpate, Uruk și tăblițele de lut. Titlul Școala fricoșilor rămâne necopiat.',
      keyPoints: [
        'Deceniul ține 10 ani, secolul ține 100, mileniul ține 1000. Toate stau la cardinal.',
        'Cam pe la 3500 î.Hr., la Uruk, scrisul era cuneiform, pe tăblițe de lut pline cu liste de cuvinte.',
        'Numele propriu stă în lecția de istorie. Proverbul se lămurește în două bucăți, iar Școala fricoșilor nu se copiază.',
      ]
    }),
    lesson({
      id: 'casa-memoriala',
      title: 'Casa memorială și relatarea',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Patru rubrici',
        text: 'Relatarea unei vizite spune o experiență în ordine. Pentru casa lui Ion Creangă faci întâi un tabel. Are patru rubrici. La fiecare spui cât de mult contează informația.'
      }],
      theory: [
        'În tabel notezi trei trepte: foarte importantă, puțin importantă sau neimportantă. Nu lași o rubrică fără treaptă.',
        'Casa stă pe malul Ozanei. Pentru vizită contează mult ora. Contează mult și ziua când poarta e închisă. Contează mult și GPS-ul. Râul Ozana își are rubrica lui.',
        'Pentru aceeași vizită, adresa de e-mail poate conta puțin sau deloc. Nu orice dată merită treapta de sus.',
        'O întâmplare de la școală se spune în patru bucăți. Cea dintâi dă cine, unde și când. Nu pornește de la motiv.',
        'Celelalte se leagă prin conectori. La început deschide. Apoi împinge. În timp ce pune două fapte împreună. După ce arată urmarea. În sfârșit închide.',
        'Dacă sari ora sau ziua închisă, poți ajunge la o poartă ferecată. De aceea ele stau sus în tabel.',
        'GPS-ul te duce la malul Ozanei. Fără el, râul rămâne un nume, nu un drum.',
        'Patru paragrafe nu înseamnă patru idei răzlețe. Ele țin o singură vizită, în ordine.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Tabelul se face înainte de relatare. Dacă scrii întâi povestea, riști să uiți ziua închisă.',
        'La clasă, casa poate fi alta. Rubricile și conectorii rămân aceiași.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: la casa lui Ion Creangă, pe malul Ozanei, ora contează mult, la fel ziua cu poarta închisă și la fel GPS-ul.',
        'Ce observ: Văd casa de pe mal. Aș aștepta lângă Ozana, pentru că fără oră și fără ziua deschisă vizita nu începe.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Adresa de e-mail poate sta jos, ca puțin folositoare. Povestirea tot are patru bucăți. Le legi cu la început, cu apoi, cu în timp ce, cu după ce și cu în sfârșit.'
      }],
      tryThis: 'Fă tabelul cu patru rubrici pentru casa de pe malul Ozanei. Pune ora sus, ziua cu poarta închisă tot sus și GPS-ul tot sus. Povestește o întâmplare de la școală în patru bucăți. Le legi, pe rând, cu la început, cu apoi, cu în timp ce, cu după ce și cu în sfârșit. Încheie cu o faptă a ta, motivată prin pentru că.',
      keyPoints: [
        'Tabelul are patru rubrici și trei trepte de importanță. La casa de pe Ozana, ora, ziua închisă și GPS-ul stau sus.',
        'E-mailul poate fi neimportant. Râul Ozana intră între rubrici.',
        'Întâmplarea de la școală are patru bucăți. Le legi cu la început, cu apoi, cu în timp ce, cu după ce și cu în sfârșit.',
      ]
    }),
    lesson({
      id: 'recap-trepte',
      title: 'Recapitulare: treptele',
      kind: 'recapitulare',
      boxes: [{
        type: 'regula',
        title: 'Proba unității',
        text: 'Recapitularea arată ce ții minte din școală, din numeral și din cuvinte. Numele primește o linie. Însușirea primește două linii.',
      }],
      theory: [
        'Din zona școlii fac parte temele și programul. Acolo se bifează b. Arborii, ca și pădurea, stau în altă zonă.',
        'Andrei caută o școală. Sora lui se numește Ioana. Ea vrea o școală privată, în același timp cu prietena ei.',
        'Revista se numește Capital. Data ei este 4 decembrie 2009. Nu schimba ziua și nu schimba titlul.',
        'Întâi, la Școală după școală, suma este mică, așa că rămâi la prânz. Primul este un ordinal simplu.',
        'Apoi primești ajutor la teme. Al doilea este ordinalul construit cu al. Nu îl confunda cu primul, care stă singur.',
        'Fișa de reflecție se scrie cu eu, când unitatea se închide. Notezi ce ai aflat. Notezi unde refolosești ideea, la altă materie.',
        'Mai notezi ce ai văzut la tine. Mai notezi ce vrei să cauți și ce ai priceput. Mai spui dacă mergi mai sigur decât la capitolul trecut.',
        'Portofoliul primește fișa, lângă tabelul prin care observi comportamentul. Nu o lași în caiet, în afara dosarului.',
        'Când subliniezi, numeri liniile. O linie pentru substantiv. Două linii pentru adjectiv. Dacă inversezi, proba se strică.',
        'Seria cu arbori și pădure ține de natură, nu de școală. De aceea, la câmpul școlii, se bifează b, cu teme și program.',
        'Poți lega Uruk de cuprinsul de istorie, ca faptă învățată. Marca (Înv.) rămâne învechit, nu învățat.'
      ].join('\n\n'),
      example: [
        'Seria teme și program ține de școală. Se bifează b, nu seria cu arbori și nu seria cu pădure.',
        'Întâi rămâi la prânz, fiindcă la Școală după școală suma e mică. Primul stă singur, ca ordinal simplu. Apoi capeți ajutor la teme. Al doilea se construiește cu al. Revista Capital poartă data de 4 decembrie 2009.',
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Andrei caută o școală fiindcă Ioana o vrea privată, în același timp cu prietena ei. Eu am aflat că marca (Înv.) se citește învechit. La istorie țin Uruk în lecția despre trecut.',
      }],
      tryThis: 'Scrie propoziții cu teme și cu program, apoi spune că se bifează b. Lasă arborii și pădurea în afara școlii. Mai folosește Andrei, Ioana, prietena, școala privată, Capital, data de 4 decembrie 2009 și Școală după școală. Numele primește o linie, însușirea primește două. Cu eu, spune ce ai aflat și dacă mergi mai sigur decât la unitatea dinainte.',
      keyPoints: [
        'Pentru câmpul școlii, cu teme și program, se bifează b. Arborii și pădurea rămân afară.',
        'Primul stă singur, ca ordinal simplu. Al doilea se construiește cu al. Revista Capital poartă data de 4 decembrie 2009.',
        'Fișa cu eu intră în portofoliu, lângă tabelul de observare. Spui și dacă mergi mai sigur decât la unitatea dinainte.',
      ]
    }),
    lesson({
      id: 'relatare-scoala',
      title: 'Fișa relatării',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Trei părți',
        text: 'Relatarea spune o întâmplare în trei bucăți. Deschiderea dă cine, unde și când. Varianta scurtă ține între 20 și 30 de cuvinte și nu pornește de la motiv.',
      }],
      theory: [
        'La mijloc spui motivul pentru care a pornit întâmplarea, apoi urmarea, apoi starea care a rămas. Trei lucruri, în această ordine.',
        'Închiderea arată schimbarea și ce păstrează cititorul. Fără ea, relatarea rămâne neterminată.',
        'Mai pui o exclamație și o poruncă. Porunca cuprinde un cardinal, fiindcă spune cât.',
        'Maria, la început, dă cine, unde și când. Textul ei ține între 20 și 30 de cuvinte. Nu pornește de la motiv.',
        'Ea spune cu mirare Ce zi lungă. Acesta este enunțul exclamativ. Mirarea se aude și în semnul de la capăt.',
        'Porunca Notează două detalii stă la imperativ. Două este numeral cardinal, fiindcă spune cât, nu al câtelea.',
        'Dacă introducerea trece de 30 de cuvinte, nu mai este forma scurtă. Dacă are sub 20, rămâne săracă.',
        'De ce stă în cuprins, nu în primul rând. Cine, unde și când deschid.',
        'Pe o scenă lucrezi în trei timpi. Redai ce stă scris. Spui ce observi. La urmă alegi o faptă a ta și o motivezi cu pentru că.',
        'Exclamativul nu înlocuiește porunca. Porunca nu înlocuiește introducerea. Fiecare piesă își vede rolul.',
        'La clasă, întâmplarea poate fi alta. Părțile, lungimea și numeralul din imperativ rămân.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: Maria deschide cu cine, cu unde și cu când, apoi strigă, mirată, Ce zi lungă.',
        'Ce observ: O văd pe Maria. Aș asculta relatarea, pentru că introducerea ei așază persoanele și locul înainte de motiv.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Notează două detalii este poruncă, iar două numără. Ce zi lungă rămâne exclamație, nu imperativ.'
      }],
      tryThis: 'Scrie o relatare scurtă. Ține-o între 20 și 30 de cuvinte și deschide cu cine, cu unde și cu când. Adaugă o exclamație și o poruncă în care stă un cardinal. Încheie cu o faptă a ta, motivată prin pentru că. Mai spune, într-un rând, ce s-a schimbat la final.',
      keyPoints: [
        'Deschiderea dă cine, unde și când, în 20 până la 30 de cuvinte, și nu pornește de la motiv.',
        'Mijlocul dă cauza, urmarea și starea. Închiderea arată schimbarea.',
        'Ce zi lungă este exclamativ. Notează două detalii este imperativ, iar două este cardinal.'
      ]
    })
  ]
};
