'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  lessons: [
    lesson({
      id: 'conjunctiv-optativ',
      title: 'Acțiunea posibilă și acțiunea dorită',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Două moduri',
          text: 'Conjunctivul marchează o acțiune realizabilă. Semnul lui este să. Condițional-optativul marchează o dorință ori o acțiune ținută de o condiție.'
        }
      ],
      theory: [
        'Semnul conjunctivului este să. La prezent pui să și o formă apropiată de indicativul prezent, afară de persoana a III-a: să pictez, să pictezi, să picteze, să pictăm, să pictați, să picteze.',
        'La perfect pui să, apoi a fi, apoi participiul. Forma e aceeași la toate persoanele: să fi pictat. La condițional-optativ prezent, auxiliarul a avea stă lângă infinitiv: aș picta, ai picta, ar picta, am picta, ați picta, ar picta.',
        'La perfectul aceluiași mod: aș fi pictat, ai fi pictat, ar fi pictat. Am încercat să-mi păstrez echilibrul, dar aș fi căzut dacă o creangă nu m-ar fi prins.',
        'Indicativ, perfect compus: am încercat. Conjunctiv, prezent: să-mi păstrez. Condițional-optativ, perfect: aș fi căzut. Tot condițional-optativ, perfect: nu m-ar fi prins.',
        'În Am un nou animal de companie, a avea este predicativ, fiindcă înseamnă posed. În Să fi mers cu noi, a fi este auxiliar, la conjunctiv perfect.',
        'În A făcut voluntariat, a avea este auxiliar, la perfect compus. În Să fii atent, a fi este copulativ, la conjunctiv prezent. În Aș fi participat stau și a avea, și a fi, ca auxiliari, la condițional perfect.',
        'În Mi-aș fi dorit să fi fost acasă stau tot auxiliari. Să fi învățat ține conjunctivul perfect. N-ai fi avut ține condiționalul perfect.',
        'Mi-ar fi plăcut ține condiționalul perfect, iar să mă plimb ține conjunctivul prezent. Maria ar dori ține condiționalul prezent, iar să meargă ține conjunctivul prezent.',
        'Ți-ar fi plăcut ține condiționalul perfect, iar să fi ascultat ține conjunctivul perfect. Îmi place să citesc are conjunctiv prezent. Știu să înot are conjunctiv prezent. Vreau să rămân are conjunctiv prezent.'
      ].join('\n\n'),
      example: [
        'Să picteze: conjunctiv prezent, persoana a III-a. Să fi pictat: conjunctiv perfect. Aș picta: condițional prezent. Aș fi pictat: condițional perfect.',
        'În fraza cu creanga, am încercat ține indicativul, să-mi păstrez ține conjunctivul prezent, iar aș fi căzut și nu m-ar fi prins țin perfectul condiționalului. Am un animal este predicativ. Să fi mers este auxiliar.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Știu să înot ține conjunctivul prezent după să. Să fi știut mută aceeași idee la perfect, cu să fi și participiul. Condiția nu schimbă marca: să rămâne semnul conjunctivului.'
        }
      ],
      practice: [
        '1) În fraza cu echilibrul și creanga, scrie modul și timpul fiecărui verb.',
        '2) Spune unde a fi și a avea sunt auxiliare: animal de companie, să fi mers, voluntariat, să fii atent, aș fi participat, mi-aș fi dorit.',
        '3) Dă timpul pentru Să fi învățat, n-ai fi avut, să mă plimb, Maria ar dori și să fi ascultat.',
        '4) Umple golul din Îmi place să, din Știu să și din Vreau să, cu verbe la conjunctiv prezent.'
      ].join('\n\n'),
      answers: [
        'am încercat: indicativ, perfect compus; să-mi păstrez: conjunctiv prezent; aș fi căzut: perfect, condițional-optativ; nu m-ar fi prins: perfect, condițional-optativ',
        'auxiliare: Să fi mers, A făcut, Aș fi participat, Mi-aș fi dorit să fi fost; predicativ: Am un nou animal; copulativ: Să fii atent',
        'Să fi învățat conjunctiv perfect, n-ai fi avut condițional perfect; Mi-ar fi plăcut condițional perfect, să mă plimb conjunctiv prezent; Maria ar dori condițional prezent, să meargă conjunctiv prezent; Ți-ar fi plăcut condițional perfect, să fi ascultat conjunctiv perfect',
        'de pildă: Îmi place să citesc; Știu să înot; Vreau să rămân'
      ],
      mistakes: 'Să nu lipsește de la conjunctiv. Am un animal nu are auxiliar: a avea înseamnă posed. Să fii atent este copulativ, nu auxiliar. Perfectul conjunctivului este să fi pictat, nu să pictat.',
      tryThis: 'La fraza cu echilibrul și creanga, dă modul și timpul fiecărui verb.\n\nSpune de ce Am un nou animal de companie nu are auxiliar, iar Să fi mers cu noi are. Umple golul din Îmi place să, din Știu să și din Vreau să.',
      keyPoints: [
        'Conjunctivul marchează o acțiune realizabilă. Marca este să. Perfectul este să fi pictat.',
        'Condiționalul prezent este aș picta. Perfectul este aș fi pictat și ține de o dorință sau de o condiție.',
        'Am un animal ține a avea ca predicat. Să fi mers îl ține pe a fi ca auxiliar.'
      ]
    }),
    lesson({
      id: 'infinitiv',
      title: 'Forma de dicționar a verbului',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Infinitiv',
          text: 'Infinitivul este forma din dicționar. Nu are persoană și nu are număr. Nu poate fi predicat. După a putea, particula a poate lipsi.'
        }
      ],
      theory: [
        'Infinitivul este o formă verbală nepersonală. Forma lui nu depinde de persoană ori de număr. Forma scurtă stă cu prepoziția a: a picta.',
        'După a putea, a poate lipsi: poate picta. Forma lungă, cu -re, stă în închinare-aș. Negativ: a nu spune. Cu pronume: a-l asculta.',
        'Funcții. Ca subiect: A încerca este minunat. Ca nume predicativ: Dorința sa este de a picta. Pasiunea lui este a cânta.',
        'Ca complement direct: Eu vreau a reuși. Ca complement prepozițional: Mă gândesc la a citi. Ca circumstanțial de mod: Fără a sta pe gânduri, au rupt-o la fugă.',
        'Circumstanțial de timp: Înainte de a mânca, s-a spălat pe mâini. Atribut verbal: Plăcerea de a picta este minunată.',
        'În Poți afla rezultatul, afla este infinitiv scurt, lângă a putea.',
        'Să-i cunosc este conjunctiv, fiindcă are să, nu infinitiv. Lucrăm cu cinci conjugări. I: a dansa, infinitivul în -a. A II-a: a avea, în -ea. A III-a: a crede și a merge, în -e.',
        'A IV-a: a privi, în -i. A V-a: a hotărî, în -î. A urî V, pentru că infinitivul se termină în î, ca a hotărî. A spera I. A dori IV. A putea II. A înțelege III.',
        'Apoi: a cerne III, a zâmbi IV, a ploua I, a avea II. Mai reții a tăbărî V, a vrea II și a deschide III.',
        'Perechi: va hotărî dă a hotărî, se temea dă a se teme, vrea dă a vrea, ar zbura dă a zbura, îndrăzniseră dă a îndrăzni, am adus dă a aduce, să gândească dă a gândi, ar călători dă a călători.',
        'Conjunctivul se poate înlocui: Este indicat a asculta. Vreau a-i oferi cartea mea.',
        'La Elena, a călători și a vizita sunt infinitive. Visate și rămase sunt adjective din participiu. A citit, a mers și a reluat sunt perfect compus.',
        'Mara a chemat colega. A chemat este predicativ, conjugarea I, perfect compus, persoana a III-a, predicat verbal.'
      ].join('\n\n'),
      example: [
        'A încerca este subiect. Poți afla are infinitiv scurt. Să-i cunosc este conjunctiv.',
        'A urî este conjugarea a V-a. Visate este adjectiv din participiu, nu infinitiv.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A hotărî și a tăbărî stau la conjugarea a V-a, fiindcă infinitivul se termină în î. A vrea stă la a II-a, alături de a avea și de a putea, cu terminația -ea.'
        }
      ],
      practice: [
        '1) Dă conjugarea lui a cerne, a spera, a zâmbi, a putea, a ploua, a dori, a urî, a înțelege și a avea.',
        '2) Adu la infinitiv formele va hotărî, se temea, vrea, ar zbura, îndrăzniseră, am adus, să gândească și ar călători.',
        '3) Pune infinitiv în locul conjunctivului în Este indicat să asculți, Pasiunea lui este să scrie, Nu este permis să te apleci și Vreau să-i ofer.',
        '4) În enunțul despre proiectul Elenei, desparte infinitivele, adjectivele participiale și perfectul compus. Arată de ce să-i cunosc nu este infinitiv.'
      ].join('\n\n'),
      answers: [
        'III, I, IV, II, I, IV, V, III, II',
        'a hotărî, a se teme, a vrea, a zbura, a îndrăzni, a aduce, a gândi, a călători',
        'Este indicat a asculta; Pasiunea lui este a scrie; Nu este permis a te apleca; Vreau a-i oferi',
        'infinitive: a călători, a vizita; adjective participiale: visate, rămase; perfect compus: a citit, a mers, a reluat; să-i cunosc are să, deci este conjunctiv'
      ],
      mistakes: 'Să-i cunosc are să, deci este conjunctiv. A urî, cu î, este conjugarea a V-a. A citit cu auxiliar nu este participiu singur.',
      tryThis: 'Spune funcția pentru a cânta, pentru de a călători și pentru de a dansa.\n\nÎnchide prin analiza pentru Mara a chemat colega: predicativ, conjugarea I, perfect compus, persoana a III-a.',
      keyPoints: [
        'Infinitivul numește acțiunea fără persoană și număr și nu poate fi predicat.',
        'Conjugările se cunosc după -a, -ea, -e, -i, -î. A urî este a V-a.',
        'Să-i cunosc este conjunctiv. Visate este adjectiv. A citit, cu auxiliar, este perfect compus.'
      ]
    }),
    lesson({
      id: 'participiu',
      title: 'Acțiunea terminată',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Participiu',
          text: 'Participiul numește o acțiune deja încheiată, suferită ori îndeplinită. Intră în timpurile și modurile compuse, după un auxiliar. Singur, devine adjectiv.'
        }
      ],
      theory: [
        'La indicativ, perfect compus: am pictat. La viitor anterior: voi fi scris. La conjunctiv perfect: să fi ascultat. La condițional-optativ perfect: aș fi mers. În toate, participiul stă după auxiliar.',
        'Sufixele sunt -at, -ut, -s, -t, -it, -ât. Exemplele pereche sunt cântat, crezut, mers, copt, privit, hotărât. Sufixul se vede la finalul formei, nu la auxiliar.',
        'Folosit singur, participiul devine adjectiv. Poate fi atribut adjectival, de pildă tabloul pictat, drumul parcurs, rochia croită. Poate fi și nume predicativ, de pildă Mărul este copt.',
        'Afirmativ: lucrat. Negativ, cu prefixul ne-: nelucrat. Negativul nu schimbă sufixul. Doar adaugă ne- în față.',
        'Iată modurile și timpurile cerute. M-aș fi bucurat ține condițional-optativul perfect, iar să fi citit ține conjunctivul perfect. Să fi vrut ține conjunctivul perfect, iar ar fi ajuns ține condițional-optativul perfect.',
        'Voi fi plecat și vor fi ajuns sunt viitor anterior. Să fi venit este conjunctiv perfect, ar mai fi găsit este condițional-optativ perfect.',
        'Participiile cerute: a repeta dă repetat, sufixul -at. A vedea dă văzut, sufixul -ut. A scrie dă scris, sufixul -s. A privi dă privit, sufixul -it. A crede dă crezut, sufixul -ut.',
        'Lângă un substantiv, ele devin adjective: exercițiul repetat, fereastra văzută. Acordul la fereastra văzută arată că participiul a ieșit din verb și a intrat la adjectiv.',
        'Dacă scoți auxiliarul din am pictat, rămâne pictat, care poate sta lângă un tablou. Dacă îl lași cu am, el ține perfectul compus și nu este atribut.'
      ].join('\n\n'),
      example: [
        'Am pictat are participiul pictat în perfectul compus. Voi fi scris este viitor anterior. Mărul este copt are participiul ca nume predicativ. Tabloul pictat îl are ca atribut.',
        'Repetat are sufixul -at. Văzut are sufixul -ut. Scris are sufixul -s. Nelucrat este forma negativă.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Drumul parcurs este atribut, pentru că participiul stă lângă substantiv, fără auxiliar. Voi fi parcurs ar fi viitor anterior: același participiu, dar după voi fi.'
        }
      ],
      practice: [
        '1) Pentru M-aș fi bucurat să fi citit la timp și pentru Să fi vrut și tot nu ar fi ajuns, notează modul și timpul fiecărui verb compus.',
        '2) Pentru Voi fi plecat când vor fi ajuns părinții și pentru Să fi venit mai devreme, ar mai fi găsit prăjituri, scrie modul și timpul.',
        '3) Formează participiul lui a repeta, a vedea, a scrie, a privi și a crede și spune sufixul.',
        '4) Alege două participii și pune-le lângă substantive. Spune că, în enunțurile tale, participiul a devenit adjectiv. Mai scrie forma negativă a lui lucrat.'
      ].join('\n\n'),
      answers: [
        'M-aș fi bucurat: condițional-optativ perfect; să fi citit: conjunctiv perfect; Să fi vrut: conjunctiv perfect; ar fi ajuns: condițional-optativ perfect',
        'Voi fi plecat și vor fi ajuns: viitor anterior; Să fi venit: conjunctiv perfect; ar mai fi găsit: condițional-optativ perfect',
        'repetat, -at; văzut, -ut; scris, -s; privit, -it; crezut, -ut',
        'de pildă exercițiul repetat și fereastra văzută, ambele adjective; negativul este nelucrat'
      ],
      mistakes: 'Voi fi plecat nu este perfect compus. Este viitor anterior. Nelucrat se face cu ne-, nu cu nu lucrat. Lângă substantiv, fără auxiliar, participiul este adjectiv.',
      tryThis: 'Alege un verb dintre a scrie și a crede. Pune-l o dată într-un timp compus și o dată lângă un substantiv.\n\nSpune, în primul caz, modul și timpul, iar în al doilea, că forma a devenit adjectiv. Adaugă negativul lui lucrat.',
      keyPoints: [
        'Participiul intră în perfectul compus, în viitorul anterior, în conjunctivul perfect și în condiționalul perfect.',
        'Sufixele lui sunt -at, -ut, -s, -t, -it și -ât. Repetat are -at, văzut are -ut, scris are -s.',
        'Singur, devine adjectiv, atribut sau nume predicativ. Negativul se face cu ne-: nelucrat.'
      ]
    }),
    lesson({
      id: 'gerunziu',
      title: 'Acțiunea în desfășurare',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Gerunziu',
          text: 'Gerunziul numește o acțiune care se desfășoară. O recunoști după sufixele -ând și -ind. Dacă se acordă, devine adjectiv.'
        }
      ],
      theory: [
        'Exemple de sufix: intrând și alergând au -ând, citind și privind au -ind. Afirmativ: scriind. Negativ, cu prefixul ne-: nescriind. Prefixul nu înlocuiește sufixul.',
        'Dacă se acordă în gen, număr și caz cu substantivul, devine adjectiv: mâna tremurândă. Fără acord, tremurând rămâne gerunziu.',
        'Iată funcțiile. Ca subiect: Se aude tunând. Ca complement direct: Aud șuierând vântul. Ca circumstanțial de mod: Aleargă șchiopătând.',
        'Ca circumstanțial de timp: Trecând, l-a văzut cu coada ochiului. Ca atribut verbal: Mâna tremurând îi mângâia obrazul. Ca atribut adjectival, când este acordat: Mâna tremurândă îi mângâia obrazul.',
        'Deosebirea dintre tremurând și tremurândă este acordul. Prima formă nu se schimbă. A doua ia terminație de adjectiv și stă lângă mâna.',
        'Cvintetul are cinci trepte și nu se copiază dintr-un text gata scris. Întâia treaptă este un substantiv, tema. A doua treaptă are două adjective.',
        'A treia treaptă are trei gerunzii, adică acțiuni care se desfășoară. A patra treaptă are patru cuvinte și spune ceva esențial. A cincea treaptă are un singur cuvânt, de obicei un verb.',
        'Modelul nostru, spus în proză, are cinci trepte. Substantivul este Globul. Adjectivele sunt albastru și tăcut. Gerunziile sunt stând, lucind și chemând.',
        'Enunțul de patru cuvinte este Mara lasă globul jos. Cuvântul final este Așteaptă. Gerunziile din treapta a treia arată acțiunea în desfășurare.',
        'Sufixele lor sunt -ând și -ind: stând, lucind, chemând. Formele negative cerute: neștiind, nearanjând, necitind, nemergând.',
        'Un cvintet nou nu reia globul. Poți pleca de la un alt obiect, cu alte adjective și cu alte trei gerunzii, dacă păstrezi cele cinci trepte.'
      ].join('\n\n'),
      example: [
        'Se aude tunând are gerunziul ca subiect. Aleargă șchiopătând îl are ca circumstanțial de mod. Mâna tremurândă este adjectiv, pentru că s-a acordat.',
        'În modelul cu Globul, treapta a treia are trei gerunzii. Neștiind este negativul lui știind.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Aud șuierând vântul ține gerunziul ca complement direct. Trecând, l-a văzut cu coada ochiului îl ține ca circumstanțial de timp. Acordul lipsește, deci nu sunt adjective.'
        }
      ],
      practice: [
        '1) Ce fel de acțiune numește gerunziul și care îi sunt sufixele -ând și -ind?',
        '2) Ce funcție au tunând, șuierând, șchiopătând, trecând, tremurând și tremurândă în enunțurile din lecție?',
        '3) Construiește un cvintet nou. Treapta întâi: un substantiv. Apoi două adjective. Apoi trei gerunzii. Apoi o propoziție de patru cuvinte. La final, un verb. Nu relua modelul cu globul.',
        '4) Dă forma negativă a gerunziilor din Știind, a rezolvat, Aranjând hainele, Citind ziarul și Mergând la bunici.'
      ].join('\n\n'),
      answers: [
        'acțiune în desfășurare; sufixele sunt -ând și -ind',
        'tunând: subiect; șuierând: complement direct; șchiopătând: circumstanțial de mod; trecând: circumstanțial de timp; tremurând: atribut verbal; tremurândă: atribut adjectival',
        'răspuns personal, cu cinci trepte și fără glob',
        'neștiind, nearanjând, necitind, nemergând'
      ],
      mistakes: 'Tremurândă nu mai este gerunziu, fiindcă s-a acordat și a devenit adjectiv. Negativul este neștiind, nu nu știind. Cvintetul are trei gerunzii la treapta a treia, nu două.',
      tryThis: 'Construiește cinci trepte noi, fără glob: un substantiv, apoi două adjective, apoi trei gerunzii, apoi patru cuvinte, apoi un verb.\n\nSpune sufixul fiecărui gerunziu. Adaugă forma negativă a unuia dintre ele, cu ne-.',
      keyPoints: [
        'Gerunziul arată o acțiune care se desfășoară și se termină în -ând sau în -ind.',
        'Negativul primește ne-. Dacă forma se acordă, ca în tremurândă, ea devine adjectiv.',
        'Cvintetul are cinci trepte: substantiv, două adjective, trei gerunzii, patru cuvinte, un cuvânt final.'
      ]
    }),
    lesson({
      id: 'supin',
      title: 'Prepoziția și participiul',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Supin',
          text: 'Supinul este o formă nepersonală. Unește participiul cu una dintre prepozițiile la, de, din, după ori pentru. Exemplu: de citit.'
        }
      ],
      theory: [
        'Alte modele: pentru pictat, la cules. Afirmativ: de reținut. Negativ: de nereținut, cu ne- pe participiu. Prepoziția rămâne. Se schimbă doar participiul.',
        'Iată funcțiile. Ca subiect: E ușor de identificat greșelile. E ușor de lucrat acest exercițiu. Ca nume predicativ: Cartea este pentru colorat. Atitudinea ei este de apreciat.',
        'Atribut verbal: Mașina de spălat e nouă. Pasiunea pentru scris a avut-o din copilărie. Mașina de măcinat cafea s-a stricat după utilizat.',
        'Complement direct: Am de memorat poezia. Am terminat de pictat tabloul. S-a apucat de învățat rolul ține complementul prepozițional de învățat. M-am apucat de citit este tot complement prepozițional.',
        'Modelul de analiză: pentru scris este verb predicativ, conjugarea a III-a, supin, atribut verbal. Conjugarea se ia din infinitivul a scrie, nu din prepoziție.',
        'Deosebirile cerute: A învățat lecția este indicativ, perfect compus. Are de învățat lecția este supin, iar de învățat este complement direct.',
        'A cules fructe este indicativ, perfect compus. A sosit timpul pentru cules fructe are supinul pentru cules, cu funcția de atribut verbal.',
        'În lista de analiză, Citind, aburind și bătând sunt gerunzii. Pentru scris, de apreciat, de lucrat, de pictat, de învățat, de măcinat și după utilizat sunt supine.',
        'Câte o pereche, ca să le poți forma: a picta dă pictând și de pictat. A vedea dă văzând și de văzut. A cere dă cerând și de cerut. A ști dă știind și de știut.',
        'A coborî dă coborând și de coborât. A cânta dă cântând și de cântat. A curge dă curgând și de curs. Gerunziul are sufix. Supinul are prepoziție plus participiu.',
        'Fără prepoziție, participiul de după am, ai sau a ține perfectul compus, nu supinul.'
      ].join('\n\n'),
      example: [
        'De citit este supin. Pentru scris este atribut verbal, conjugarea a III-a. Are de învățat are supinul ca complement direct. Timpul pentru cules are supinul ca atribut verbal.',
        'A învățat este perfect compus, nu supin. De nereținut este forma negativă. Citind este gerunziu.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A picta dă și pictând, gerunziu, și de pictat, supin. Prima formă arată acțiunea în desfășurare. A doua o leagă de prepoziția de și de participiu.'
        }
      ],
      practice: [
        '1) Dă gerunziul și supinul lui a picta, a vedea, a cere, a ști, a coborî, a cânta și a curge.',
        '2) Analizează, pe modelul pentru scris, formele din Pasiunea pentru scris, Atitudinea ei este de apreciat, E ușor de lucrat și Citind cartea.',
        '3) Continuă analiza pentru Am terminat de pictat, mâncarea aburind, S-a apucat de învățat, Mașina de măcinat, după utilizat și Aude bătând vântul.',
        '4) Spune funcția lui de învățat din Are de învățat lecția și funcția lui pentru cules din A sosit timpul pentru cules. Scrie și forma negativă de nereținut.'
      ].join('\n\n'),
      answers: [
        'pictând, de pictat; văzând, de văzut; cerând, de cerut; știind, de știut; coborând, de coborât; cântând, de cântat; curgând, de curs',
        'pentru scris: supin, atribut verbal, conjugarea a III-a; de apreciat: supin, nume predicativ; de lucrat: supin, subiect; Citind: gerunziu',
        'de pictat: supin, complement direct; aburind: gerunziu; de învățat: supin, complement prepozițional; de măcinat: supin, atribut verbal; după utilizat: supin; bătând: gerunziu',
        'de învățat: complement direct; pentru cules: atribut verbal; negativul este de nereținut'
      ],
      mistakes: 'A învățat este perfect compus, nu supin. Supinul are prepoziție: de, la, din, după sau pentru. Citind și bătând sunt gerunzii, nu supine. Negativul este de nereținut, cu ne- pe participiu.',
      tryThis: 'Alege două verbe dintre a picta, a ști și a curge. Scrie pentru fiecare un enunț cu gerunziu și unul cu supin.\n\nSpune funcția supinului. Adaugă, la final, forma de nereținut și arată unde stă ne-.',
      keyPoints: [
        'Supinul unește o prepoziție, la, de, din, după sau pentru, cu participiul.',
        'Poate fi subiect, nume predicativ, atribut verbal, complement direct sau complement prepozițional.',
        'A învățat este perfect compus. Are de învățat este supin. Negativul este de nereținut.'
      ]
    }),
    lesson({
      id: 'combinari-verb',
      title: 'Verbul centru și verbul adjunct',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Centru și adjunct',
          text: 'Centrul la mod personal dă predicat verbal ori nominal. Infinitivul, gerunziul și supinul pot fi adjuncte.'
        }
      ],
      theory: [
        'Ca centru, verbul la mod personal dă predicat verbal, de pildă în Merge în pădure, ori predicat nominal, dacă un verb copulativ stă lângă un nume predicativ: Ioana este foarte veselă.',
        'Centrul se leagă de subiect. Subiectul cere acordul predicatului, la persoană și la număr. Predicatul cere subiectului cazul nominativ.',
        'Se mai leagă de numele predicativ și de complemente ori circumstanțiale. Exemple: Citesc o revistă. Nu mă tem de păianjeni. Îi scriu bunicii. Mă plimb prin pădure. A venit de o săptămână. Lucrează fără entuziasm.',
        'Formele nepersonale, ca centru, pot avea nume predicativ: Fiind grăbit, a uitat agenda. Pot avea și complemente: A fotografia locurile vizitate e o plăcere. Spunându-i adevărul, s-a liniștit.',
        'Ca adjunct, infinitivul, gerunziul și supinul pot fi subiect: E bine a asculta de sfaturile lui. Nume predicativ: Dorința sa este de a călători.',
        'Pot fi complement sau circumstanțial: Știe a vorbi engleza. Are de citit cartea. Se gândește la a renunța. Am văzut căzând copacii. A plecat fără a anunța.',
        'Exercițiul se rezolvă așa. Mihai citește o povestire fantastică: citește este centrul, predicat verbal, iar o povestire este complement direct.',
        'Mă gândesc deseori la prietenii din copilărie: gândesc este centrul, iar la prietenii este complement prepozițional.',
        'Adjunctele: a scrie, din A învățat a scrie corect, este infinitiv și complement direct. De finalizat, din Are de finalizat proiectul, este supin și complement direct.',
        'Intrând, din Intrând în casă, a sunat telefonul, este gerunziu și circumstanțial de timp. L-a protejat mereu pe fratele său: predicat verbal.',
        'Rezolvând exercițiul, a găsit soluția: Rezolvând este gerunziu, circumstanțial de timp, iar a găsit este predicat verbal. Lăstarul a devenit un pomișor: predicat nominal.',
        'Maria are de exersat la vioară: are este centrul, predicat verbal. De exersat este supin adjunct, complement direct.'
      ].join('\n\n'),
      example: [
        'Mihai citește este centru și predicat verbal. O povestire este complement direct. A scrie este infinitiv adjunct. De finalizat este supin adjunct.',
        'Intrând este gerunziu de timp. Lăstarul a devenit un pomișor este predicat nominal. De exersat, lângă are, este complement direct.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'E bine a asculta de sfaturile lui ține infinitivul ca subiect, deci ca adjunct. Dorința sa este de a călători îl ține ca nume predicativ. În ambele, centrul rămâne verbul la mod personal din propoziție.'
        }
      ],
      practice: [
        '1) În Mihai citește o povestire fantastică și în Mă gândesc la prietenii din copilărie, spune care este verbul centru și ce funcție are grupul de lângă el.',
        '2) Pentru a scrie, de finalizat și Intrând, spune forma nepersonală și funcția.',
        '3) Pentru L-a protejat, Rezolvând exercițiul, a găsit soluția, Lăstarul a devenit un pomișor și Maria are de exersat la vioară, spune tipul predicatului și, unde există, forma adjunctului.',
        '4) Scrie două enunțuri în care a alerga și a privi, o dată la gerunziu și o dată la supin, sunt adjuncte.'
      ].join('\n\n'),
      answers: [
        'citește, predicat verbal, o povestire complement direct; gândesc, centru, la prietenii complement prepozițional',
        'a scrie: infinitiv, complement direct; de finalizat: supin, complement direct; Intrând: gerunziu, circumstanțial de timp',
        'L-a protejat: predicat verbal; Rezolvând: gerunziu, circumstanțial de timp, a găsit: predicat verbal; a devenit: predicat nominal; are: predicat verbal, de exersat: supin, complement direct',
        'răspuns personal, cu un gerunziu și un supin adjuncte'
      ],
      mistakes: 'Lăstarul a devenit un pomișor este predicat nominal, nu verbal. De exersat nu este centrul: centrul este are. Intrând este adjunct de timp, nu predicat.',
      tryThis: 'Construiește două enunțuri. În unul, a alerga stă la gerunziu și este adjunct. În celălalt, a privi stă la supin și este adjunct.\n\nSpune funcția fiecărei forme. Arată și care verb rămâne centru, la mod personal.',
      keyPoints: [
        'Verbul la mod personal, când este centru, dă fie predicat verbal, fie predicat nominal.',
        'Subiectul, la nominativ, se acordă cu predicatul.',
        'Infinitivul, gerunziul și supinul pot fi adjuncte: subiect, nume predicativ, complement sau circumstanțial. Are de exersat ține supinul ca complement direct.'
      ]
    }),
    lesson({
      id: 'mit-dochia',
      title: 'Dochia, Traian și stâncile de pe Ceahlău',
      kind: 'lectura',
      boxes: [
        {
          type: 'atentie',
          title: 'Fapte, nu copiere',
          text: 'Mitul se spune cu vorbele tale. Păstrezi faptele Dochiei și ale lui Traian. Nu lipești o narațiune gata scrisă și nu inventezi o legendă pe care nu ai citit-o.'
        }
      ],
      theory: [
        'Mitul este o povestire fabuloasă. Ea spune cum a apărut un fenomen, așa cum crede un popor. Mitologia strânge toate miturile unui popor.',
        'Mitologia românească adună credințe și datini, apoi superstiții, basme și legende. În ea apar Făt-Frumos și Ileana Cosânzeana. Mai apar Zmeul, Căpcăunul și Balaurul. Nu lipsesc Zâna și Muma Pădurii.',
        'Povestea Dochiei cu Traian lămurește cum s-a născut poporul român. O redai cu formulările tale. Rezumatul de mai jos ține faptele, nu o povestire literară copiată.',
        'Dochia îi este soră lui Decebal. După ce cade Sarmizegetusa, Traian o cheamă spre Roma. Ea nu acceptă, ca să nu ajungă roabă.',
        'Se preface în păstoriță și suie pe Ceahlău, împreună cu oile. Când soldații vor să o ia cu forța, ea cere să devină piatră, o stană, și să rămână acasă, în țară.',
        'Fata și mioarele se fac stânci. Românii le spun Baba Dochia și turma ei. În povestire stau două popoare: dacii și romanii.',
        'Sfatul Dochiei către Traian sună așa: un neam nou ar putea lega dârzenia dacilor de măreția romanilor. Ce ține textul, ca valoare, este liantul cu țara. Oamenii rămân legați de pământul lor așa cum stâncile rămân legate de munte.',
        'Două trăsături, legate de fapte, sunt vitejia și statornicia. Vitejia se vede când își apără cetatea. Statornicia se vede când alege piatra, nu robia.',
        'Textul este mit: o întâmplare fabuloasă lămurește pietrele de pe Ceahlău și nașterea unui neam. Dialogul nu se reproduce.',
        'Pentru portofoliu, cauți o legendă verificabilă despre nașterea unui alt stat din Europa. Dacă nu e deja în caiet, notezi că o cauți. Nu o născocești.',
        'Legenda scrisă de tine este deosebită: o pădure albastră, cu o ființă din mitologia românească, de pildă o zână ori o păstoriță devenită piatră. Tu alegi încheierea.'
      ].join('\n\n'),
      example: [
        'Dochia îi este soră lui Decebal și refuză Roma. Pe Ceahlău, stâncile poartă numele Baba Dochia și turma ei. Popoarele din povestire sunt dacii și romanii.',
        'Valoarea este liantul cu țara. Mitul lămurește și pietrele, și nașterea unui neam. O legendă despre un alt stat se caută. Nu se născocește.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Vitejia Dochiei se leagă de apărarea cetății. Statornicia se leagă de alegerea pietrei în locul robiei. Ambele trăsături stau pe fapte, nu pe un citat.'
        }
      ],
      tryThis: 'Scrie, cu formulările tale, cele două popoare, valoarea textului, cine sunt Dochia și Traian și două trăsături ale Dochiei, fiecare cu fapta care o arată.\n\nÎn trei rânduri, arată cum mitul lămurește nașterea poporului român. În șase rânduri, argumentează că povestirea este mit. Ea cuprinde o întâmplare fabuloasă și lămurește un lucru din lume.\n\nApoi alcătuiește 120–150 de cuvinte: o pădure albastră, cu o zână ori cu o păstoriță de piatră. Nu relua o legendă deja scrisă. Pentru un alt popor din Europa, dă un titlu doar dacă l-ai citit. Altfel notează că îl cauți într-o sursă.',
      keyPoints: [
        'Mitul, povestire fabuloasă, spune cum crede un popor că a apărut un fenomen.',
        'Pe Ceahlău, Dochia, sora lui Decebal, preferă piatra robiei de la Roma. Stâncile poartă numele Baba Dochia și turma ei.',
        'Popoarele din povestire sunt dacii și romanii. Valoarea este liantul cu țara. O legendă necitită nu se născocește.'
      ]
    }),
    lesson({
      id: 'recap-punti',
      title: 'Medalionul de pe blat',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Scena, nu grila',
          text: 'Recapitularea stă pe scenă. Fișa de observare și grila de puncte nu țin loc de lecție. Medalionul deschide o vedere, iar Mara nu află încotro duce lumina.'
        }
      ],
      theory: [
        'Uneori textul de la oră este Dosarele Cronos, roman de Rysa Walker. Fragmentul nu se lipește. Scena de lucru este construită aici.',
        'Joi, dis-de-dimineață, Mara era în bucătăria a cărei ușă dă spre curte. Pe blat, lângă o cutie de covrigi, a dat peste un medalion ușor. L-a ținut în palmă.',
        'Din cerc a ieșit o lumină subțire. A auzit vânt printr-un lan de grâu și a zărit o casă albă. Nu a aflat încotro duce lumina. Tema este obiectul prin care se deschide o vedere.',
        'Cuvântul-cheie este medalion. Timpul marcat este joi dimineața. Personajul este Mara. Spațiul marcat este bucătăria, blatul și lanul, doar auzit.',
        'Vocea nu folosește eu, deci nararea stă la persoana a III-a. Modelul textului este narativ și are o secvență fantastică, fiindcă lumina și lanul se arată fără ieșirea Marei din bucătărie.',
        'Pentru aceeași persoană, mai-mult-ca-perfectul este Lumina țâșnise din cerc. Țâșni o lumină este perfect simplu. În Medalionul este pe blat, este este predicativ, fiindcă înseamnă se află.',
        'În Să fi fost atentă, a fi este auxiliar. În Mara este prietena mea, numele predicativ este prietena. Predicat verbal: a găsit. În Medalionul este ușor, predicatul este nominal.',
        'În a găsit, a avea este auxiliar. În Mara are un medalion, a avea este predicativ, fiindcă înseamnă posedă. În A lua medalionul este un pas, subiectul este infinitivul.',
        'În Luând medalionul, a auzit vântul, gerunziul ține circumstanțialul de timp. Într-un exercițiu școlar, aceleași forme se recunosc și dacă propoziția diferă.',
        'Răzbăteau ține imperfectul. A spus ține perfectul compus. Să hrănesc ține conjunctivul prezent. A replicat ține perfectul compus. Vine ține prezentul. Vuiau ține imperfectul.',
        'Din scena asta faci trei pași. Notezi faptele scrise. Notezi imaginea. La urmă alegi tu o faptă și o legi cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce scrie: pe blat, joi dimineața, Mara a luat un medalion ușor, iar din cerc a ieșit o lumină. Imaginea: O văd pe Mara ținând medalionul în palmă.',
        'Aș lăsa eu medalionul pe blat, fiindcă Mara nu a aflat încotro duce lumina. Țâșnise ține mai-mult-ca-perfectul. În Mara este prietena mea, numele predicativ este prietena. Auxiliarul a avea stă în a găsit.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Mara are un medalion ține a avea ca predicat, fiindcă înseamnă posedă. A găsit îl ține ca auxiliar. Aceeași familie de forme, două valori, ca în lecția despre verb.'
        }
      ],
      tryThis: 'Pe scena Marei, notează faptele, imaginea, cu O văd, și fapta ta, cu pentru că.\n\nDă tema, cuvântul-cheie, timpul, spațiul, naratorul și de ce secvența este fantastică. Spune timpurile lui țâșnise și țâșni.\n\nCe valoare are a fi în Să fi fost atentă și în Medalionul este pe blat? Un enunț cu prietenă nume predicativ. Unul cu a avea predicativ.\n\nArată un gerunziu de timp și un infinitiv cu rol de subiect. Scrie 100–120 de cuvinte, o recenzie fără deznodământ. Apoi o scrisoare către tine peste zece ani, cu conjunctiv și condițional, și opt rânduri, Povestea unei cărți uitate, cu indicativ și imperativ.',
      keyPoints: [
        'Recapitularea se face pe scena medalionului. Grila de puncte nu ține loc de lecție.',
        'Lumina iese din cerc, iar Mara nu află încotro duce. Țâșnise este mai-mult-ca-perfect. Țâșni este perfect simplu.',
        'Prietena poate sta ca nume predicativ. În a găsit, a avea e auxiliar. În are un medalion, a avea e predicativ.'
      ]
    })
  ]
};
