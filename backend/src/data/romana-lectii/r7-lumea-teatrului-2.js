'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f) {
  return romanaLesson(f);
}

module.exports = {
  lessons: [
    lesson({
      id: 'pronume-demonstrativ',
      title: 'Aproape, departe, același',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Demonstrativ',
          text: 'Ține locul unui lucru și arată aproape, departe, același sau altul. Nu are persoană.'
        }
      ],
      theory: [
        'Demonstrativul înlocuiește un obiect și marchează apropierea, depărtarea, identitatea ori diferența. Persoană nu are.',
        'Apropiere: acesta, aceasta, aceștia, acestea. La genitiv-dativ: acestuia, acesteia, acestora. Depărtare: acela, aceea, aceia, acelea, aceluia, aceleia, acelora.',
        'Identitate: același, aceeași, aceiași, aceleași, aceluiași, aceleiași, acelorași. Diferență: celălalt, cealaltă, ceilalți, celelalte, celuilalt, celeilalte, celorlalți, celorlalte.',
        'Vorbirea de fiecare zi aduce și ăsta, asta, ăștia, astea, ăla, aia, ăia, alea. Rolurile lor sunt cele ale substantivului.',
        'Acela este fratele meu: depărtare, subiect. În El are aceeași haină, identitatea e adjectiv, fiindcă aceeași stă lângă haină. Celuilalt: diferență, complement indirect, dativ. Apoi acestea au fost cadoul: apropiere, subiect.',
        'Aceluia poate fi atribut genitival. Pentru aceasta: atribut prepozițional, acuzativ. Ceilalți: subiect, nominativ. Aceia: nume predicativ, nominativ.',
        'În Am cerut acestora, acestora e complement indirect, dativ. Pe aceeași: complement direct, acuzativ. Despre celelalte: complement prepozițional.',
        'Înainte de aceștia: circumstanțial de timp. Lângă aceiași: circumstanțial de loc. Ca acelea: circumstanțial de mod. Lângă un nume devine adjectiv pronominal demonstrativ, atribut: filmul acela.',
        'Cele scurte, cel, cea, cei și cele, țin loc de pronume dacă înlocuiesc un nume și au atribut, cum sunt cei din casă și cea de aici. Exemplu: Cea frumoasă este sora mea. Altul: Cele de acolo sunt prietenele.',
        'Devin articol demonstrativ dacă preced un numeral, ca în cele două colege, dacă urcă un superlativ, ca în cea mai mare, dacă intră într-un nume dublu, ca Mircea cel Bătrân, ori dacă leagă un nume cu articol de un adjectiv. Exemple despărțite: copiii cei cuminți. Apoi copilul cel cuminte. Apoi fata cea isteață.',
        'Problema dată este cea mai dificilă: cea e articol de superlativ. Cei trei au rezolvat: cei e articol înaintea numeralului.',
        'Forme îngrijite. Aceeași carte. Apoi prăjitura fetei acesteia. Apoi dorințele băiatului aceluia. Apoi celelalte fete. Apoi desenului aceluia îi voi face ramă. Apoi floarea aceea este preferata mea.'
      ].join('\n\n'),
      example: 'Acela e depărtare și subiect. Aceeași haină e adjectiv de identitate. Celuilalt stă la dativ. Cea frumoasă e pronume. Cea mai dificilă e superlativ. Cele două colege: articol lângă numeral. Aceeași carte și floarea aceea sunt formele bune.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Filmul acela e adjectiv, lângă nume. Acela, singur, ar fi pronume de depărtare. Aceeași carte păstrează doi de ș la începutul lui aceeași, nu forma de plural aceiași.'
        }
      ],
      practice: [
        '1) Spune felul din Acela este fratele meu. Apoi din aceeași haină. Apoi din celuilalt. Apoi din Acestea au fost cadoul.',
        '2) Dă cazul și funcția: Poezia aceluia; Ceilalți vor participa; Sportivii sunt aceia; Am cerut acestora.',
        '3) Când e cel pronume și când e articol? Exemplu: cea de aici, cea mai mare, cele două colege, copiii cei cuminți.',
        '4) Alege: Aceeași sau Aceiași carte; acesteia sau acesta după fetei; aceluia sau acela după băiatului; Celelalte sau o formă greșită; aceea sau aceia pentru floarea.'
      ].join('\n\n'),
      answers: [
        'Acela: depărtare, subiect; aceeași: identitate, adjectiv; celuilalt: diferență, dativ; Acestea: apropiere, subiect',
        'aceluia: genitiv, atribut; Ceilalți: nominativ, subiect; aceia: nominativ, nume predicativ; acestora: dativ, complement indirect',
        'pronume când ține locul unui nume cu atribut, cea de aici; articol la superlativ, la numeral și la legătura cu adjectivul',
        'Aceeași carte; fetei acesteia; băiatului aceluia; Celelalte; floarea aceea'
      ],
      mistakes: 'Aceeași carte, nu Aceiași carte. După fetei vine acesteia, nu acesta. După băiatului vine aceluia. Celelalte se scrie cu e, nu cu o literă mutată. Floarea aceea, nu floarea aceia.',
      tryThis: 'Scrie filmul acela și spune că e adjectiv. Scrie Cea frumoasă este sora mea și spune că cea e pronume. Scrie cea mai mare și spune că cea e articol.',
      keyPoints: [
        'Demonstrativul arată aproape, departe, același sau altul. Lângă nume devine adjectiv, ca în filmul acela.',
        'Cel, cea, cei, cele sunt pronume când țin locul unui nume și articol la superlativ, la numeral sau lângă adjectiv.',
        'Se scriu Aceeași carte și floarea aceea. Cea mai dificilă are articol de superlativ.'
      ]
    }),

    lesson({
      id: 'pronume-nehotarat',
      title: 'Cineva, fără un nume precis',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Nehotărât',
          text: 'Ține locul unui nume fără să spună precis despre cine e vorba. Compusele se scriu într-un cuvânt.'
        }
      ],
      theory: [
        'Nehotărâtul înlocuiește un substantiv fără să fixeze persoana. Simple: unul, una, altul, alta, mult, puțin, atât, tot, cutare.',
        'Compuse, într-un singur cuvânt: altceva, altcineva, careva, ceva, cineva, fiecare, câtva, orice, oricine, oricare, oricât, vreunul.',
        'Locuțiuni: te miri cine, nu știu cine, cine știe ce, care mai de care. Funcțiile sunt ale substantivului. Lângă nume devine adjectiv pronominal nehotărât, atribut: toți actorii.',
        'Lângă nume, unul și una devin un și o. Iar amândoi, ambii, tustrei și câteșitrei au fost numerale și acum stau la nehotărâte.',
        'Când fiecare e subiect, verbul rămâne la singular. Exemplu: Fiecare a mers la concert. Se scrie lipit: vreunul, nu vre unul, și vreun, nu vre un. Oricare păstrează i.',
        'Compusul cu ori păstrează vocala i din silaba întâi: oricine, orice, oricât. De la care ies oricare, fiecare, careva. De la cine ies oricine, cineva, altcineva. De la ce ies orice, ceva, altceva.',
        'Sinonime. Cine știe cine înseamnă oricine. Apoi care mai de care înseamnă fiecare. Apoi nu știu cine înseamnă cineva. Apoi câte și mai câte acoperă lucruri felurite. Nu știu care înseamnă careva.',
        'Îngrijit: Orice spune este analizat. Apoi fiecare a mers. Apoi vreunul dintre ei va câștiga. Apoi vreo carte ne va atrage atenția. Apoi i-am cerut altei colege să mă ajute.',
        'Oricine: subiect, nominativ. Orice, în Îți arăt orice, e complement direct, acuzativ. Orice carte: adjectiv, atribut, acuzativ. Alta: nume predicativ, nominativ.',
        'Oricărui copil și Fiecăruia stau la dativ, indirecte. Ca oricare e mod. Despre orice e prepozițional.',
        'La premiul altui copil, altuia e atribut genitival, iar altui e adjectiv. Spre cineva: loc. Înaintea tuturor: timp, genitiv.',
        'Un brad și doi pini: un și doi sunt numerale. O bancă doar anunțată e articol. O colegă va planta: tot articol. Alta e pronume.',
        'Iar o, ce frumos, e interjecție. Apoi o vom ajuta e pronume personal. Toți sunt așteptați: pronume. Tot mai sunt lucruri: adverb. Tot parcul: adjectiv pronominal.'
      ].join('\n\n'),
      example: 'Oricine stă subiect. Fiecare a mers cere singularul. Vreunul se scrie lipit. Orice păstrează i. Altei colege e forma bună. Cine știe cine înseamnă oricine. Un brad e numeral. O, ce frumos e interjecție. O vom ajuta e pronume personal.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Orice carte îți place: orice e adjectiv, lângă carte. Îți arăt orice: orice e pronume, complement direct. Aceeași formă, două valori, după ce stă sau nu lângă nume.'
        }
      ],
      practice: [
        '1) Formează câte trei compuse de la care, de la cine și de la ce. Dă sinonimul pentru cine știe cine, care mai de care și nu știu cine.',
        '2) Alege: Orice sau Orce; Fiecare a sau au; Vreunul sau Vre unul; Vreo sau Vre-o; altei colege sau unei alta.',
        '3) Spune funcția lui Oricine, a lui orice din Îți arăt orice și a lui Fiecăruia.',
        '4) Dă valoarea: un brad, O ce frumos, O vom ajuta, tot parcul.'
      ].join('\n\n'),
      answers: [
        'oricare, fiecare, careva; oricine, cineva, altcineva; orice, ceva, altceva; oricine; fiecare; cineva',
        'Orice; Fiecare a mers; Vreunul; Vreo; altei colege',
        'Oricine: subiect; orice: complement direct; Fiecăruia: complement indirect',
        'un brad: numeral; O, ce frumos: interjecție; O vom ajuta: pronume personal; tot parcul: adjectiv pronominal'
      ],
      mistakes: 'Nu despărți vreunul și nu tăia i din orice, oricine, oricât. Fiecare, ca subiect, stă cu singularul: a mers, nu au mers. Lângă nume, unul devine un. O, ce frumos nu e pronume.',
      tryThis: 'Scrie un enunț în care orice e adjectiv: Orice carte îți place. Mai scrie unul în care orice e pronume. Spune deosebirea.',
      keyPoints: [
        'Nehotărâtul nu spune precis cine e obiectul. Compusele stau într-un cuvânt: vreunul, oricine, orice.',
        'Fiecare, ca subiect, cere singularul. Unul devine un lângă substantiv.',
        'O poate fi articol, pronume sau interjecție, după propoziție. Un poate număra, prezenta sau rămâne adjectiv.'
      ]
    }),

    lesson({
      id: 'pronume-interogativ',
      title: 'Cine, ce și cât, doar în întrebare',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Interogativ',
          text: 'Stă numai în întrebare și are funcția cuvântului așteptat ca răspuns. Lângă nume devine adjectiv.'
        }
      ],
      theory: [
        'Interogativul ține locul numelui pe care îl aștepți în răspuns. Apare doar în enunțuri interogative.',
        'Formele: cine, ce, cui, care, cât, câtă, câți, câte. Ele deschid enunțul. Funcția lor e funcția cuvântului așteptat.',
        'Întrebarea Ce citim? Citim o carte. Ce e complement direct, fiindcă o carte e complement direct. Lângă nume devine adjectiv pronominal interogativ, atribut: Ce culoare are?',
        'La ciocănitoare, întrebarea Ce culoare are ciocănitoarea pune pe ce lângă substantivul culoare, deci e adjectiv și atribut. Neagră e adjectiv propriu-zis și nume predicativ.',
        'Întrebările cerute: Cine a mers în excursie? Cine e subiect, nominativ. Apoi pe cine l-am întrebat? Pe cine e complement direct, acuzativ.',
        'Cui i-a propus? Cui e complement indirect, dativ. Apoi cine a fost câștigătoarea? Cine e nume predicativ, nominativ. Apoi al cui proiect a fost mai interesant? Aici al cui e atribut genitival.',
        'Câți au fost în excursie? Câți e subiect, nominativ. Alte funcții: Cine va fi noul campion e nume predicativ. Cine este prezentatorul e subiect. Cui îi dai e complement indirect.',
        'Pe câți colegi: care e adjectiv în complementul direct, aici cât. Al cui proiect: atribut. Al cui este proiectul: al cui e nume predicativ. Pe cine ai întrebat: complement direct.',
        'Ce cadou vei da: ce e adjectiv, atribut. Care floare: adjectiv, atribut. Cu cine vei merge: circumstanțial de asociere. Către care: circumstanțial de loc. Către care coleg: care e adjectiv.',
        'Forme bune: Pe care emisiune ai vizionat-o. La care întrebare vei răspunde. Ce-i cu toate aceste lucruri aruncate.'
      ].join('\n\n'),
      example: 'În Ce citim, ce e complement direct, ca răspunsul o carte. În Ce culoare, ce e adjectiv. Cine a mers e subiect. Cui i-a propus e complement indirect. Pe care emisiune e forma bună. Ce-i cu lucrurile e forma bună.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Care floare alegi? Care e adjectiv, lângă floare. Pe care ai ales-o? Care e pronume, complement direct. Întrebarea stă la început, iar funcția o dă răspunsul.'
        }
      ],
      practice: [
        '1) Din răspunsurile Mirela a mers în excursie, apoi L-am întrebat pe coleg, apoi I-a propus Anei, apoi Câștigătoarea a fost ea și apoi Au fost patru, fă întrebarea și dă cazul plus funcția.',
        '2) Ce funcție are ce în Ce culoare are ciocănitoarea și ce funcție are neagră?',
        '3) Alege varianta bună: Pe care ori Care emisiune, La care ori Cărei întrebare, Ce-i ori Ce-s.',
        '4) Fă trei întrebări unde care, cine și cât stau lângă un nume, deci sunt adjective.'
      ].join('\n\n'),
      answers: [
        'Cine a mers: nominativ, subiect; Pe cine: acuzativ, complement direct; Cui: dativ, complement indirect; Cine a fost: nominativ, nume predicativ; Câți: nominativ, subiect',
        'ce: adjectiv, atribut; neagră: adjectiv propriu-zis, nume predicativ',
        'Pe care emisiune; La care întrebare; Ce-i',
        'Care floare? Ce cadou? Câți colegi? Toate trei sunt adjective'
      ],
      mistakes: 'Nu începe emisiunea cu Care gol dacă ai vizionat-o: corect e Pe care emisiune. La întrebare nu pui Cărei. Lucrurile cer Ce-i, nu Ce-s. Funcția interogativului o copiază răspunsul, nu o ghicești din aer.',
      tryThis: 'Transformă o carte în întrebarea Ce citim și spune funcția. Pune care lângă floare și spune că a devenit adjectiv.',
      keyPoints: [
        'Interogativul stă doar în întrebare și împrumută funcția răspunsului așteptat.',
        'Formele sunt cine, ce, cui, care, cât. Lângă nume devine adjectiv: Ce culoare, care floare.',
        'Se scriu Pe care emisiune și Ce-i cu lucrurile. Neagră, lângă ciocănitoare, e nume predicativ.'
      ]
    }),

    lesson({
      id: 'pronume-relativ',
      title: 'Care leagă o propoziție de alta',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Relativ',
          text: 'Leagă o propoziție secundară de cea de care depinde. Are formele interogativului, plus ceea ce, și o funcție în secundară.'
        }
      ],
      theory: [
        'Relativul leagă o secundară de propoziția regentă. Formele sunt cele ale interogativului: cine, ce, cui, care, cât, câtă, câți, câte, plus compusul ceea ce.',
        'Secundara pe care o deschide are și funcție sintactică. Lângă nume devine adjectiv pronominal relativ, atribut: Știu ce carte vrei.',
        'Când cazul e genitiv, pronumele se potrivește în gen și în număr cu numele înlocuit. Articolul genitival se potrivește cu numele pe care îl determină pronumele.',
        'Modelul e floarea al cărei parfum. Articolul al se potrivește cu parfum. Forma cărei se potrivește cu floarea.',
        'Completări. Spectacolul pe care l-ai văzut este Steaua fără nume. Urmează: steaua despre care vorbește profesorul nu are încă nume.',
        'Urmează: piesa al cărei regizor este cunoscut a fost un succes. Urmează: colegul căruia i-am spus va merge și el.',
        'Genitive corecte. Cartea al cărei autor: al cu autor, cărei cu cartea. Cadouri a căror valoare: a cu valoare, căror cu cadouri.',
        'Elevul ale cărui realizări: ale cu realizări, cărui cu elevul. Prăjitura a cărei glazură: a cu glazură, cărei cu prăjitura.',
        'Funcții. Ce lucrări: ce e adjectiv, atribut, în complementul direct. Cine va fi conducătorul: cine e subiect. Cât timp: cât e adjectiv.',
        'Pe care ai ales-o: care e complement direct, reluat de o. Spre care alergăm: care e circumstanțial de loc. Ceea ce este necesar: ceea ce e subiect.',
        'Despre ce subiect: ce e adjectiv. Cui va fi atribuit: cui e complement indirect. Care obiectiv: care e subiect. La care vor sosi: care e atribut, în circumstanțialul de timp. Ale cărei pagini: atribut genitival.'
      ].join('\n\n'),
      example: 'Pe care l-ai văzut leagă secundara și e complement direct. La al cărei regizor, al se acordă cu regizor, cărei cu piesa. Cartea al cărei autor. Elevul ale cărui realizări. Ceea ce e subiect. Cui va fi atribuit e complement indirect.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Știu care carte vrei: care e adjectiv, lângă carte. Știu care vrei: care e pronume relativ și leagă secundara. Aceeași formă, două roluri.'
        }
      ],
      practice: [
        '1) Completează: spectacolul pe care l-ai văzut; steaua despre care vorbește; piesa al cărei regizor; colegul căruia i-am spus.',
        '2) Scrie genitivul pentru cartea … autor, cadouri … valoare, elevul … realizări, prăjitura … glazură și spune acordul articolului și al lui care.',
        '3) Dă funcția lui care în Lucrarea pe care ai ales-o și a lui ceea ce în Vom face ceea ce este necesar.',
        '4) Scrie o frază în care care e pronume relativ și una în care care e adjectiv: Știu care carte vrei.'
      ].join('\n\n'),
      answers: [
        'pe care; despre care; al cărei; căruia',
        'al cărei, al cu autor și cărei cu cartea; a căror, a cu valoare și căror cu cadouri; ale cărui, ale cu realizări și cărui cu elevul; a cărei, a cu glazură și cărei cu prăjitura',
        'care: complement direct, reluat de o; ceea ce: subiect',
        'pronume: Știu care vrei. Adjectiv: Știu care carte vrei.'
      ],
      mistakes: 'Articolul genitival nu se acordă cu care, ci cu numele determinat: al autor, a valoare, ale realizări. Care se acordă cu numele înlocuit: cărei cu cartea, căror cu cadouri, cărui cu elevul. Nu schimba perechile.',
      tryThis: 'Scrie floarea al cărei parfum și arată cu cine se acordă al și cu cine se acordă cărei. Mai leagă o secundară cu pe care.',
      keyPoints: [
        'Relativul leagă o secundară și are funcție în ea. Formele sunt ale interogativului, plus ceea ce.',
        'La genitiv, articolul se acordă cu numele determinat, iar care cu numele înlocuit.',
        'Modele: floarea al cărei parfum, cartea al cărei autor, elevul ale cărui realizări.'
      ]
    }),

    lesson({
      id: 'pronume-negativ',
      title: 'Nimeni și nicio carte',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Negativ',
          text: 'Marchează absența unui obiect și îi ia locul. Stă numai în enunțuri negative: nimeni, nimic, niciunul, niciuna.'
        }
      ],
      theory: [
        'Negativul arată că obiectul lipsește și înlocuiește numele. Apare doar în enunțuri negative. Formele: nimeni, nimic, niciunul, niciuna.',
        'Poate fi subiect: Nimeni nu va veni. Ca nume predicativ: Câștigătorul nu este niciunul dintre colegii mei. Ca obiect direct: Nu văd pe nimeni pe stradă.',
        'Ca obiect indirect: Nu va spune nimănui adevărul. Ca prepozițional: Nu mă gândesc la nimic. Ca atribut: Desenul nimănui nu a fost premiat. Ca loc: Nu mă îndrept spre nimeni.',
        'Lângă un nume, doar niciun și nicio sunt adjective. Exemplu: Nu am cumpărat nicio revistă. Apoi nimeni și nimic, când sunt subiect, stau la singular, chiar dacă te gândești la mai mulți. Exemple despărțite: Nimeni nu va ajunge. Apoi Niciunul nu a mers. Apoi Nimeni și nimic nu l-a speriat.',
        'Îngrijit: Nicio carte nu a rămas necitită. Apoi niciunul dintre copii nu a mers. Apoi nimeni nu va ajunge la timp. Apoi nu a promis niciuneia. Nici o, în două cuvinte înaintea unui nume, nu e forma de aici. Niciunul nu au e acord greșit.',
        'Funcții. Nicio prăjitură: adjectiv, atribut, în subiect. Nimic, în Nu îi comunic nimic, e complement direct. Nimeni nu vrea: subiect. A nimănui: atribut genitival.',
        'Nimănui, în Nu a cerut nimănui, e complement indirect. Despre niciun prieten: niciun e adjectiv. Despre nimic: complement prepozițional. Pentru nimeni: circumstanțial de scop. Lângă nimeni: circumstanțial de loc. Niciun joc: adjectiv, atribut.',
        'Nimic poate fi pronume, în Nu ni se oferă nimic. Nimicuri e substantiv, fiindcă are plural și înseamnă vorbe deșarte. Niciuna e pronume, subiect. Nicio carte e adjectiv.',
        'Un nimeni e substantiv, fiindcă primește articol și înseamnă om fără greutate. Nimeni nu îl ajută e pronume, subiect.'
      ].join('\n\n'),
      example: 'Nimeni nu va veni e subiect și cere singularul. Nu văd pe nimeni e complement direct. Nicio carte e adjectiv, într-un cuvânt. Niciunul nu a mers. Nimicuri e substantiv. Un nimeni e substantiv. Nimeni nu îl ajută e pronume.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Nicio revistă nu a rămas pe bancă: nicio e adjectiv, lipit. Niciuna nu a rămas: pronume. Un nimeni a intrat în sală: aici nimeni a devenit substantiv, cu articol.'
        }
      ],
      practice: [
        '1) Alege forma bună, pe rând: Nicio ori Nici o carte, nu a ori nu au după Niciunul, nu va ori nu vor după Nimeni, nu l-a ori nu l-au după Nimeni și nimic, niciuneia ori nici uneia.',
        '2) Dă cazul și funcția: Nimeni nu vrea; Nu îi comunic nimic; a nimănui; Nu a cerut nimănui.',
        '3) Spune valoarea lui nimic, nimicuri, niciuna, nicio și un nimeni în enunțurile din lecție.',
        '4) Scrie patru propoziții scurte, cu nimeni, nimic, niciunul și nicio, și subliniază-le în minte.'
      ].join('\n\n'),
      answers: [
        'Nicio carte; nu a mers; nu va ajunge; nu l-a speriat; niciuneia',
        'Nimeni: nominativ, subiect; nimic: acuzativ, complement direct; a nimănui: genitiv, atribut; nimănui: dativ, complement indirect',
        'nimic: pronume; nimicuri: substantiv; niciuna: pronume; nicio: adjectiv; un nimeni: substantiv',
        'propoziții cu cele patru forme, nicio lipit lângă nume, nimeni și nimic la singular'
      ],
      mistakes: 'Nicio carte se scrie într-un cuvânt, nu Nici o carte. Niciunul nu a mers, nu nu au. Nimeni și nimic cer singularul. Nimicuri și un nimeni sunt substantive, nu pronume.',
      tryThis: 'Fă o povestire de 80–100 de cuvinte, Povestea lui Nimeni, cu nimeni, nimic, niciunul și nicio. Păstrează singularul la nimeni și la nimic.',
      keyPoints: [
        'Negativul stă doar în enunțuri negative: nimeni, nimic, niciunul, niciuna.',
        'Ca subiect, nimeni și nimic cer singularul. Lângă nume, niciun și nicio sunt adjective, într-un cuvânt.',
        'Nimicuri și un nimeni sunt substantive. Nimeni nu îl ajută rămâne pronume.'
      ]
    }),

    lesson({
      id: 'intarire',
      title: 'Însuși, lângă nume',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Atribut',
          text: 'Azi se folosește adjectivul pronominal de întărire. Stă lângă un nume sau un personal, se acordă și e atribut.'
        }
      ],
      theory: [
        'Pronumele de întărire a ieșit din uzul de azi. Rămâne adjectivul pronominal de întărire. El stă pe lângă un nume sau pe lângă un pronume de persoană.',
        'Acordul privește genul, numărul și cazul. Funcția lui e de atribut. Singular, nominativ-acuzativ: însumi, însămi, însuți, însăți, însuși, însăși.',
        'Genitiv-dativ singular: însumi, însemi, însuți, înseți, însuși, înseși. Plural, nominativ-acuzativ: înșine, însene, înșivă, însevă, înșiși, înseși sau însele.',
        'Genitiv-dativ plural: înșine, însene, înșivă, însevă, înșiși, însele sau înseși. Completări. Mihai însuși a ales tema. Urmează: copiii înșiși s-au ocupat de organizare.',
        'Mariei înseși îi place decorul. Apoi fetele însele au realizat fiecare piesă. Apoi nouă înșine ne va aduce satisfacție, când grupul e mixt. Apoi pe noi înșine. Apoi voi, fiți înșivă pregătiți.',
        'Alegeri bune: Dansatoarele înseși. Copii, voi înșivă. Tu însuți vei fi campion, fiindcă campion e masculin. Noi, fetele însene.',
        'Gen și caz. Colegei înseși: feminin, dativ, determină colegei. Tine însăți: feminin, acuzativ, determină tine. Voi înșivă: masculin, nominativ, determină voi.',
        'Băiatului însuși: masculin, dativ. Prietenilor înșiși: masculin, genitiv. Eu însămi: feminin, nominativ, determină pronumele eu.',
        'Întărirea cunoscută despre Mircea se poate spune într-o propoziție a ta, fără vers: Mircea însuși conduce oastea. Însuși arată că el, nu altul, e în frunte.'
      ].join('\n\n'),
      example: 'Mihai însuși, copiii înșiși, Mariei înseși, fetele însele, voi înșivă. Dansatoarele înseși. Tu însuți, dacă e campion. Fetele însene. Eu însămi determină pe eu, nominativ, feminin. Adjectivul de întărire e atribut.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Profesorul însuși aprinde felinarul. Însuși e masculin, singular, nominativ și întărește pe profesor. Dacă ar fi doamna, ai scrie însăși. Acordul urmărește numele, nu decorul.'
        }
      ],
      practice: [
        '1) Pune forma de întărire după Mihai, după copiii, după Mariei, după fetele, după nouă și după voi.',
        '2) Alege înseși sau înșiși pentru dansatoare, înșivă sau înseți pentru voi, însuți sau însăți pentru tu campion, însene sau înșine pentru noi, fetele.',
        '3) Pentru colegei înseși, tine însăți și eu însămi, spune genul, cazul și cuvântul determinat.',
        '4) Scrie Mircea însuși conduce oastea și spune ce întărește însuși. Nu lipi versul.'
      ].join('\n\n'),
      answers: [
        'Mihai însuși; copiii înșiși; Mariei înseși; fetele însele; nouă înșine; voi înșivă',
        'Dansatoarele înseși; voi înșivă; tu însuți; fetele însene',
        'colegei înseși: feminin, dativ, colegei; tine însăți: feminin, acuzativ, tine; eu însămi: feminin, nominativ, eu',
        'însuși întărește că Mircea, nu altul, conduce oastea'
      ],
      mistakes: 'Dansatoarele cer înseși, nu înșiși. Campionul masculin cere tu însuți, nu însăți. Fetele cer însene, nu înșine. Eu însămi e feminin și stă lângă eu. Nu mai analiza forma ca pronume de sine stătător.',
      tryThis: 'Fă un acrostih scurt cu literele din însămi: câte un cuvânt care începe cu fiecare literă, despre tine. La final, pune eu însămi într-o propoziție.',
      keyPoints: [
        'Azi se folosește adjectivul pronominal de întărire. El e atribut și se acordă cu numele sau cu pronumele.',
        'Modele: Mihai însuși, Mariei înseși, fetele însele, tu însuți, eu însămi.',
        'Dansatoarele înseși și voi înșivă sunt formele care se acordă. Versul despre Mircea nu se lipește.'
      ]
    }),

    lesson({
      id: 'combinari-pronume',
      title: 'Pronumele centru și pronumele adjunct',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Două roluri',
          text: 'Centrul primește un atribut. Adjunctul poate fi atribut, complement sau circumstanțial. Adjectivul pronominal e atribut.'
        }
      ],
      theory: [
        'Pronumele poate sta în centru sau ca adjunct. În centru, primește un atribut. Un caz: Celălalt mai colorat este al meu. Alt caz: Fiecare dintre noi va aduce ceva nou.',
        'Alt caz: Acela de acolo este fratele meu. Alt caz: Ceva al colegului va fi păstrat. Rolul de adjunct poate fi atribut pronominal prepozițional, ca în Felicitarea pentru voi. Genitival, ca în Rochia acesteia. În dativ, ca în Acesta este frate lui.',
        'Complement direct: L-am văzut pe al vostru. Nu știu nimic. Complement prepozițional: Vorbim despre orice. Complement indirect: Cui îi spui.',
        'Locul: Ne îndreptăm spre dumnealor. De mod: Scrie ca acela. De timp: Momentul în care vei câștiga. Tot ca numele, poate fi și subiect: Oricine încearcă va reuși.',
        'Sau nume predicativ: Fratele meu este acesta. Pisica este a noastră. Adjectivul pronominal e atribut adjectival: Vocea mea este răgușită.',
        'Din lista de aplicare: Cine a venit primul e subiect, nominativ, interogativ. A noastră e nume predicativ, nominativ, posesiv. De sine e atribut prepozițional, acuzativ, reflexiv.',
        'Ai săi e subiect, nominativ, posesiv. De la ceilalți e atribut prepozițional, acuzativ, demonstrativ. Se, în Băiatul se analizează, e reflexiv, complement direct, acuzativ.',
        'Te, în Te-am certat, e personal, complement direct. La dumnealui e complement prepozițional. De nimeni e complement prepozițional, acuzativ, negativ. Pe la noi e circumstanțial de loc.',
        'După cine e complement prepozițional, interogativ. Ca acela e circumstanțial de mod. Alor tăi e atribut genitival. Sieși e complement indirect, dativ, reflexiv.',
        'Lui, în frate lui, e atribut în dativ. Al nostru ca nume predicativ stă în Proiectul este al nostru.'
      ].join('\n\n'),
      example: 'Fiecare dintre noi are centrul fiecare și atributul dintre noi. A noastră e nume predicativ. Se analizează are reflexivul drept complement direct. De nimeni e complement prepozițional. Proiectul este al nostru pune posesivul nume predicativ. Vocea mea e atribut adjectival.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Acesta de acolo e centru, cu atributul de acolo. Acesta, singur, în Fratele meu este acesta, e nume predicativ. Același cuvânt își schimbă rolul după propoziție.'
        }
      ],
      practice: [
        '1) Care pronume e centru, întâi în Fiecare dintre noi, apoi în Acela de acolo?',
        '2) Dă felul, cazul și funcția, pe rând, la Cine a venit, la Pisica este a noastră, la Stima de sine și la Băiatul se analizează.',
        '3) La Nu se teme de nimeni și la Îi este frate lui, dă felul, cazul și funcția.',
        '4) Încheie cu Proiectul este al nostru și spune funcția posesivului.'
      ].join('\n\n'),
      answers: [
        'Fiecare, cu atributul dintre noi; Acela, cu atributul de acolo',
        'Cine: interogativ, nominativ, subiect; a noastră: posesiv, nominativ, nume predicativ; de sine: reflexiv, acuzativ, atribut prepozițional; se: reflexiv, acuzativ, complement direct',
        'de nimeni: negativ, acuzativ, complement prepozițional; lui: personal, dativ, atribut',
        'al nostru: nume predicativ'
      ],
      mistakes: 'Nu pune centrul pe dintre noi: centrul e fiecare. Se din se analizează e complement direct, nu subiect. De nimeni nu e subiect. Al nostru, după este, e nume predicativ, nu atribut.',
      tryThis: 'Fă trei enunțuri unde acesta e centru: unul cu adjectiv, unul cu dintre, unul cu de acolo. Spune atributul în fiecare.',
      keyPoints: [
        'Pronumele centru primește un atribut. Adjunctul poate fi atribut, complement sau circumstanțial.',
        'Oricine poate fi subiect. Acesta poate fi nume predicativ. Adjectivul pronominal e atribut, ca vocea mea.',
        'Proiectul este al nostru pune posesivul în funcție de nume predicativ.'
      ]
    }),

    lesson({
      id: 'numeral',
      title: 'Cât, al câtelea și ce valoare are',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei valori',
          text: 'Cardinalul spune cât. Ordinalul spune al câtelea. Valoarea poate fi pronominală, substantivală sau adjectivală.'
        }
      ],
      theory: [
        'Cardinalul dă numărul sau cantitatea. Simple, cu pauză între ele: doi, apoi zece, apoi sută, mie, milion și miliard. Compusele, alt șir: unsprezece, paisprezece, șaisprezece, șaizeci. În șaisprezece și în șaizeci se păstrează i.',
        'Ordinalul spune locul în șir. După gen: primul și prima. Urmează întâiul și întâia. Apoi al doilea și a doua. Toate se fac din cardinal.',
        'Pentru masculin, al stă înainte și lea la capăt: al doilea. La feminin, a stă și la început, și la capăt: a doua. Valorile sunt trei.',
        'Dacă ține locul unui nume, e pronominală: în tabără vor merge cinci. Al treilea poate fi mai isteț. Cealaltă, substantivală, numește un număr sau un lucru prin număr: autobuzul cu indicativul 336 e plin.',
        'Cinci înmulțit cu trei dau cincisprezece. Adjectivală, când determină un nume: sunt înfloriți doi copaci. Concurentul al doilea a câștigat.',
        'Și un are trei valori. Un bilet costă doi lei: cardinal. Un tren oprește, când doar îl prezinți: articol nehotărât. Un oarecare copil: adjectiv pronominal nehotărât.',
        'Ca centru, cu valoare pronominală, e subiect sau nume predicativ: aleargă al cincilea. Concurenții sunt 14.',
        'Propoziția de lucru, spusă altfel: doi dintre cei trei elevi au urcat pe podium. Participantul al treilea a ieșit al patrulea. Pentru cele trei sfaturi, mulțumirea a mers spre antrenorul celui de-al doilea.',
        'Doi: cardinal, pronominal, centru, subiect, nominativ. Trei, lângă elevi: cardinal, adjectival, adjunct, atribut, acuzativ. Apoi al treilea, lângă participant: ordinal, adjectival, atribut, nominativ.',
        'Al patrulea: ordinal, pronominal, nume predicativ, nominativ. Apoi celui de-al doilea, lângă antrenor: ordinal, adjectival, complement indirect, dativ. Apoi cele trei, lângă sfaturi: cardinal, adjectival, atribut, acuzativ.',
        'Ordinalul lui nouă e al nouălea. Al nouălea aleargă: subiect. Apa merge către cel de-al nouălea: complement indirect. Cartea celui de-al nouălea: atribut genitival. Iar înaintea celui de-al nouălea arată timpul.',
        'În Apus de soare, de Barbu Ștefănescu Delavrancea, paisprezece și douăzeci și șase sunt cardinale, cu valoare adjectivală, lângă ani. Replica nu se lipește.'
      ].join('\n\n'),
      example: 'Șaisprezece și șaizeci păstrează i. Al doilea e masculin. A doua e feminin. Doi copaci sunt adjectivali. Un bilet e numeral. Un tren doar anunțat e articol. Al patrulea e nume predicativ. Al nouălea poate fi subiect.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Șapte vor rămâne la poartă: pronominal. Șapte scaune stau în sală: adjectival. Șapte e un număr norocos: substantival. Aceeași cifră, trei valori.'
        }
      ],
      practice: [
        '1) Arată formarea pentru al doilea și pentru a doua. Dă trei enunțuri cu doi: pronominal, substantival, adjectival. La fel cu șapte.',
        '2) Dă trei propoziții cu un: ca numeral, ca articol nehotărât, ca adjectiv nehotărât.',
        '3) La enunțul cu podiumul clasifică doi, trei, al treilea, al patrulea și celui de-al doilea.',
        '4) Construiește ordinalul lui nouă și fă-l subiect, apoi complement indirect. La Apus de soare, paisprezece și douăzeci și șase sunt cardinale, lângă ani.'
      ].join('\n\n'),
      answers: [
        'al înainte și lea la final; a înainte și la final; enunțuri cu cele trei valori pentru doi și pentru șapte',
        'Un bilet: numeral; Un tren oprește: articol; Un oarecare copil: adjectiv nehotărât',
        'doi: cardinal pronominal, subiect; trei: cardinal adjectival, atribut; al treilea: ordinal adjectival, atribut; al patrulea: ordinal pronominal, nume predicativ; celui de-al doilea: ordinal adjectival, complement indirect',
        'al nouălea; Al nouălea aleargă; Celui de-al nouălea îi dau apa; cardinale, valoare adjectivală, lângă ani'
      ],
      mistakes: 'Păstrează i în șaisprezece și în șaizeci. Al doilea are al și lea. A doua nu ia lea. Un tren doar anunțat e articol. Al patrulea după clasare e nume predicativ.',
      tryThis: 'Pune al nouălea în patru roluri scurte: subiect, complement indirect, atribut genitival, circumstanțial de timp. Nu schimba ordinalul.',
      keyPoints: [
        'Cardinalul dă cantitatea. Ordinalul arată al câtelea și se face din cardinal: al doilea, a doua.',
        'Valoarea e de pronume, de nume sau de adjectiv. Un poate număra, anunța sau rămâne nehotărât.',
        'Al patrulea poate fi nume predicativ. Al nouălea poate fi subiect. În Apus de soare, anii stau cu cardinale.'
      ]
    }),

    lesson({
      id: 'contacte',
      title: 'Ce trece de la un popor la altul',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Contact cultural',
          text: 'Un obicei sau un meșteșug mutat între două popoare. Poți da și poți primi.'
        }
      ],
      theory: [
        'Cultura adună ce are un popor, și în lucruri, și în spirit: credința, datina, obiceiul, simbolul și felul lui de a privi lumea.',
        'Contactul cultural apare când o datină sau o valoare pleacă de la un neam și se așază la altul.',
        'Temele de ținut minte sunt Constantin Brâncuși, ia românească, ceramica, dansurile, Castelul Peleș și Ciprian Porumbescu.',
        'Brâncuși l-a primit pe Amedeo Modigliani în atelier. Nu a predat și nu a oferit sfat. Chiar din acea zi, Modigliani a văzut geometria în spațiu altfel decât o învățase la școală.',
        'A preluat alungirea figurilor. Semnul se recunoaște și în picturile lui. Întâlnirea a schimbat ochiul, nu programa.',
        'În 1875, șantierul Peleșului avea 400 de oameni, din mai multe neamuri, sosiți cu familiile. Se auzeau paisprezece limbi.',
        'Carmen Sylva a lăsat scris amestecul de meșteșuguri. Bucătăria de aici a luat și rețete de la alte neamuri, reluate și schimbate, fiindcă drumul a fost umblat de multe popoare.',
        'Ciprian Porumbescu, compozitor, a trăit din 1853 până în 1883. Balada pentru vioară e lucrarea lui cea mai cunoscută. Ia e cămașa tradițională cu broderie.',
        'Trei domenii se influențează ușor: arta, arhitectura și bucătăria. Câștigul: un meșteșug se lărgește când dă peste altul. Poți da și poți primi.',
        'Pentru poster alegi o țară din Europa și trei domenii. O dată care nu stă în sursă nu se inventează. Dacă scrii despre localitatea ta, pui doar fapte pe care le poți verifica.',
        'Brâncuși nu a predat. A lăsat atelierul să lucreze. Deosebirea contează: contactul nu e o lecție ținută, ci o formă preluată.'
      ].join('\n\n'),
      example: 'Brâncuși nu i-a dat lui Modigliani nici sfat, nici lecție, dar i-a mutat privirea asupra geometriei. La Peleș, în 1875, erau 400 de muncitori și paisprezece limbi. Anii lui Porumbescu sunt 1853 și 1883. Ia e cămașa cu broderie. Arta, arhitectura și bucătăria se ating cel mai des.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'O rețetă venită de la alt neam, reluată și schimbată în bucătăria de aici, e contact cultural. La fel, o formă alungită plecată din atelierul lui Brâncuși și ajunsă în pictură.'
        }
      ],
      tryThis: 'Spune ce înseamnă cultura și ce înseamnă contactul cultural. Arată ce a preluat Modigliani din atelier și ce a refuzat Brâncuși să dea: sfatul și lecția.\n\nNotează 1875, câți oameni lucrau și câte limbi se auzeau la Peleș. Numără trei domenii care se ating. În 80–100 de cuvinte, compune un poster despre contactul cu o țară din Europa, pe trei domenii.',
      keyPoints: [
        'Cultura adună credința, datina și simbolul unui popor. Contactul mută un meșteșug între popoare.',
        'Modigliani a preluat alungirea figurilor din atelierul lui Brâncuși, fără lecție și fără sfat.',
        'La Peleș, în 1875, erau 400 de oameni și paisprezece limbi. Anii lui Porumbescu: 1853 și 1883.'
      ]
    }),

    lesson({
      id: 'recap-teatru',
      title: 'O scenă scurtă și o cronică',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei pași',
          text: 'Întâi spui ce stă scris. Apoi spui ce vezi. La urmă spui ce ai face și de ce.'
        }
      ],
      theory: [
        'Recapitularea nu stă pe foaia cu puncte. La clasă poți avea Apus de soare, de Barbu Ștefănescu Delavrancea, ori o bucată din piesa Take, Ianke și Cadâr, semnată de Victor Ion Popa.',
        'Lucrezi scena de mai jos. E toamnă. În curtea cetății, Domnul și Doamna stau pe banca de piatră. Lângă ei: o fântână și o salcie.',
        'Domnul numără paisprezece ani de cetate, douăzeci de pază la hotar și vreo șase fără râs. Mâna îi urcă la păr: iarna locuiește acolo. Doamna îi spune, cu Măria-ta, că primăvara ajunge și la părul alb. Un curtean anunță musafirii.',
        'Pe scenă: Domnul, Doamna, curteanul. Cei dintâi sunt soți. Curteanul e supus. Timp: o zi de toamnă. Loc: curtea cetății. Decor: fântâna și salcia.',
        'Toamna și gestul spre păr sunt note ale autorului. Domnul ține la cetate și își știe vârsta.',
        'Iarna din păr înseamnă bătrânețea. Numele Apus de soare înseamnă capătul unei domnii și oboseala celui care a apărat țara.',
        'Domnitorul Ștefan cel Mare a cârmuit Moldova. Pocuția e regiunea dintre Prutul de sus și Nistrul de sus, azi în Ucraina. Leș înseamnă polonez. Pârcălabul conducea un ținut. Zălogul e o garanție.',
        'În scena noastră, numeralele paisprezece, douăzeci și șase sunt cardinale, adjective, lângă ani, la acuzativ, atribute. Aceeași funcție de atribut nu e și de pronume.',
        'O valoare nouă pentru șase e pronominală, de subiect: Șase au rămas la poartă. Iar formula de respect e Măria-ta. Râsul tău e adjectiv posesiv.',
        'Poporul ăsta e adjectiv demonstrativ de apropiere, formă a vorbirii. Iar vreo șase e adjectiv nehotărât. Armele noastre e adjectiv posesiv.',
        'În șirul de la clasă, o are trei valori. Ordinea e articol nehotărât, interjecție, pronume personal. Litera cerută e b.',
        'Nu-mi, în nu-mi strica, e pronume personal, dativ, complement indirect. Ne, în să ne facă lege, e personal, dativ, complement indirect, fiindcă subiectul e altul.',
        'Devin reflexive în Nu-mi stric socotelile și în Ne facem lege noi. Iar o, în O, ce liniște, e interjecție. Într-o replică de tipul mă, tu, îți, o, eu, unde par să fie șase pronume, se numără cinci forme pronominale.',
        'Forma te, în Te-am rugat, e personal, acuzativ, complement direct. Devine reflexivă în Te speli. Iar eu însumi te-am rugat să-mi zici pe nume adaugă întărirea.'
      ].join('\n\n'),
      example: 'Ce scrie: toamna, Domnul numără anii de cetate, iar iarna stă în păr. Ce vezi: Îl văd pe bancă, cu mâna la păr. Eu aș aduce o mantie, pentru că bate vântul. Măria-ta e respect. Paisprezece e cardinal. O poate fi articol, interjecție și pronume. Se bifează b.',
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Nu-mi strica rămâne personal, fiindcă altcineva strică. Nu-mi stric socotelile devine reflexiv, fiindcă subiectul și obiectul coincid. Aceeași formă, două valori.'
        }
      ],
      tryThis: 'Pe scena cetății, scrie ce stă scris, ce vezi și ce ai face, adăugând un pentru că. Ce vezi începe cu Îl văd. Numește personajele, relația, timpul, locul și două elemente de decor.\n\nSpune ce înseamnă iarna din păr și numele Apus de soare. Clasifică paisprezece. Scrie Măria-ta și felul formulei. Dă cele trei valori ale lui o, în șir, și litera b.',
      keyPoints: [
        'Recapitularea stă pe scenă, nu pe grila de puncte. Domnul și Doamna sunt în curtea cetății, toamna.',
        'Măria-ta e formulă de respect. Paisprezece e numeral cardinal. Iarna din păr înseamnă bătrânețea.',
        'O poate fi, în ordine, articol, interjecție și pronume personal. Titlul înseamnă capătul unei domnii.'
      ]
    })
  ]
};
