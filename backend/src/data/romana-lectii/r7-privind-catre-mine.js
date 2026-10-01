'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f){return romanaLesson(f);}

module.exports = {
  id: 'privind-catre-mine',
  title: 'Privind către mine',
  inOwnWords: 'Unitatea închide anul cu lectura, cu metafora și cu trei feluri de a te privi: o poezie, o piesă și un roman grafic. Apoi vin negocierea, emoția, atributul, cauza, scopul și o investigație culturală. Recapitularea finală strânge scoicile din Cavarna și încurcătura dintr-o piesă. Faptele stau în lecții.',
  toc: [
    'Harta privirii',
    'Cum citești',
    'Metafora',
    'Pescărușul Jonathan',
    'Negocierea',
    'Emoția',
    'Atributul',
    'Cauza',
    'Scopul',
    'Contacte culturale',
    'Fata de cincisprezece ani',
    'Recapitularea finală'
  ],
  glossary: [
    {
      term: 'metaforă',
      meaning: 'Comparație din care lipsește legătura ca, precum, ca și când sau ca și cum.'
    },
    {
      term: 'atribut',
      meaning: 'Partea de propoziție care stă lângă un nume și răspunde la care, ce fel de, al cui.'
    },
    {
      term: 'circumstanțial de scop',
      meaning: 'Arată ținta unei acțiuni și răspunde la cu ce scop, în ce scop.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-privind',
      title: 'Harta privirii spre mine',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Harta unității',
          text: 'Cititul stă lângă metaforă. Negocierea stă lângă emoție. Atributul, cauza și scopul vin cu contactul cultural. Codurile sunt paisprezece. Scorul de pe grilă nu se învață ca lecție.'
        }
      ],
      theory: [
        'Privind către mine se deschide cu o hartă a privirii spre sine. Azi urmărești felul în care citești și separi trei tipare: liric, dramatic și roman grafic.',
        'Liricul poartă o emoție, la persoana I. Dramaticul așază numele înainte de replică și lasă didascalii. Romanul grafic împletește vorba cu desenul. Versurile și replicile se citesc doar când textul îți stă în față.',
        'Metafora apare când comparația pierde legătura. Poate cădea ca ori precum. Pot cădea și grupurile ca și când sau ca și cum. Cuvântul pleacă de la sensul obișnuit și capătă o imagine.',
        'În discuție negociezi sensul. Cât spui ține de cantitate. Adevărul ține de calitate. Tema ține de relevanță. Claritatea și scurtimea țin de manieră. Relația și ce simte celălalt țin de politețe.',
        'La scris, comentariul unui pasaj notează felul textului, apoi tema, vocea, timpul, personajele și, la urmă, sensul. Fiecare se sprijină pe un exemplu. Emoția se spune la persoana I, cu clipa de pornire, cu pașii și cu locul.',
        'Gramatica reia părțile propoziției. Atributul se lipește de un nume. Îl întrebi cu care, cu ce fel de și cu al cui. Cauza arată pricina. Scopul arată ținta.',
        'La interculturalitate cauți un contact dintre culturi și întrebi dacă astfel de legături pot naște prietenii. Dovezile se caută. Tradiția nu se născocește.',
        'Codurile sunt paisprezece. Întâi 1.1, 1.3 și 1.4. Apoi grupul 2.1, 2.2, 2.3. Apoi 3.1 cu 3.2. Apoi 4.1, 4.2, 4.4 și 4.5. La capăt, 5.1 și 5.2.',
        'Nichita Stănescu a trăit din 1933 până în 1983. Jocul de-a vacanța este piesa lui Mihail Sebastian. Anii și autorul sunt fapte, nu un text de copiat.',
        'Grila de puncte, ca și fișa de observare, stă în afara lecției. Înveți ideile de pe hartă, nu un scor.'
      ].join('\n\n'),
      example: [
        'Harta pune cititul lângă metaforă, politețea lângă emoție, iar atributul lângă cauză și lângă scop.',
        'Lista are paisprezece coduri. Anii 1933 și 1983 sunt ai lui Nichita Stănescu. O grilă de scor nu se predă ca lecție.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă sari un cod dintre 1.1 și 5.2, harta rămâne tăiată. Le numeri pe toate: paisprezece. Sebastian intră prin piesa despre vacanță, nu printr-un citat.'
        }
      ],
      tryThis: [
        'Scrie trei propoziții. Prima arată că tema e privirea către tine și că lucrul de azi este lectura.',
        'A doua grupează codurile: 1.1 cu 1.3 și 1.4, grupul de la 2.1 la 2.3, apoi 3.1 cu 3.2, apoi 4.1, 4.2, 4.4, 4.5, la urmă 5.1 cu 5.2. Spune că sunt paisprezece.',
        'A treia dă anii lui Nichita Stănescu și arată că grila de puncte nu ține loc de lecție.'
      ].join('\n\n'),
      keyPoints: [
        'Harta unește cititul, negocierea, emoția, gramatica și contactul dintre culturi.',
        'Paisprezece coduri, de la grupul 1.1 până la 5.2, spun ce antrenezi.',
        'Anii 1933–1983 și piesa lui Sebastian sunt fapte, iar grila de puncte stă în afara lecției.'
      ]
    }),
    lesson({
      id: 'lectura-mea',
      title: 'Cum știi că ai citit cu folos',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei tipare',
          text: 'Cititul cu folos lasă o temă, idei, cuvinte noi și o emoție pe care o poți explica. Cele trei texte se spun prin fapte și prin tipar, nu prin copiere.'
        }
      ],
      theory: [
        'Lectură, din latina lectura, înseamnă citire: descifrezi semnele și prinzi mesajul. Cu folos înseamnă grijă pentru carte, listă după vârstă și curiozitate. Necuvintele e a lui Nichita Stănescu, poet și eseist, primit în Academia Română după moarte. Ține de neomodernismul anilor 1960–1970 și a luat Premiul Herder.',
        'Debutează în martie 1957, deodată, la Tribuna din Cluj și la Gazeta literară. Sensul iubirii iese la finele lui 1960. O viziune a sentimentelor, la începutul lui 1964. Dreptul la timp, în martie 1965. Mai apar În dulcele stil clasic și 11 elegii. Urmează Necuvintele, apoi Operele imperfecte, apoi Noduri și semne.',
        'În poem, pomul și omul își dau frunza cu mâna, ramura cu brațul, trunchiul cu umărul. Aud seva lângă sânge, se străbat, apoi rămân fiecare de partea lui. Titlul arată că întâlnirea nu încape în vorba obișnuită. Tiparul e liric: emoție la persoana I, fără acțiune de roman.',
        'La Sebastian, Jocul de-a vacanța, actul I, scena XV: Corina îl iscodește pe Ștefan. Îi ajung șezlongul, pantalonul alb, cămașa, o carte neterminată, nicio amintire, nicio nostalgie și o indiferență mare. Corina îi pune florile în palmă și spune că e frumos. Constatarea e frumusețea, litera c. Tipar dramatic: nume, didascalii, dialog.',
        'BULLY, speranță în desen și în cuvinte, e al Elenei Ciolacu, născută în 1989. Iese în 2022, la editura muzeului bucureștean. Forma din 2012 avusese două premii britanice. E întâiul roman grafic românesc cu un singur autor la text și la desen. În 2008 termină colegiul Mircea cel Bătrân, la Râmnicu Vâlcea.',
        'Design la Universitatea de Vest, Timișoara, anii 2008–2010. Ilustrație plus animație, la Coventry, anii 2010–2013. Master de animație la UNATC, în 2018. Fără modă, reviste și bani de farduri, se ascunde în vis, lectură, scris și desen. Hărțuirea încetează. Visa studii peste hotare, lasă tot și urmează chemarea.',
        'Pornirea de a răzbi întrece frica. Încheierea e încredere: litera c înseamnă optimism. Drumul ei lasă în urmă locul hărțuirii. Comun: privirea spre sine. Subiectivitatea stă la persoana I și în emoția spusă pe nume.',
      ].join('\n\n'),
      example: [
        'Cititul cu folos înseamnă să prinzi mesajul și să formulezi tema. Stănescu debutează în martie 1957. Pomul și omul, după ce se străbat, rămân fiecare singur.',
        'Corina constată frumusețea, deci litera c. Ciolacu s-a născut în 1989. Încheierea din BULLY e optimism, aceeași literă c.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Titlul Necuvintele arată că întâlnirea om-pom nu încape în vorba obișnuită. Versurile copiate nu țin loc de idee. Fișa de idei și rezumatul arată că ai citit.'
        }
      ],
      tryThis: [
        'Numește patru gesturi de cititor atent și două fișe de control. La Necuvintele, dă anii, ideea, fără versuri copiate, și rostul titlului.',
        'La Sebastian, spune cu ce se mulțumește Ștefan și de ce se bifează c. La BULLY, dă anul 2022, editura, anul nașterii și de ce finalul e optimism, litera c.',
        'Spune ce leagă cele trei texte. Scrie Cine sunt eu: un punct tare, un lucru de îndreptat, o pasăre sau o plantă, cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Cititul cu folos lasă temă, însemnări, cuvinte noi și o emoție pe care o poți explica.',
        'În Necuvintele, pomul și omul se ating, apoi rămân singuri. La Sebastian, litera c este frumusețea.',
        'BULLY a apărut în 2022 și se încheie cu încredere: litera c înseamnă optimism, iar drumul e al ei.'
      ]
    }),
    lesson({
      id: 'metafora',
      title: 'Comparația din care lipsește ca',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Metafora',
          text: 'Metafora este comparația scurtată. Poate lipsi ca. Poate lipsi precum. Pot lipsi și grupurile ca și când sau ca și cum. Rămâne imaginea.'
        }
      ],
      theory: [
        'Metafora mută cuvântul de la sensul de toate zilele la un sens nou. Asemănarea rămâne doar subînțeleasă. Cuvântul de legătură nu mai apare.',
        'Model de lucru. Soarele este ca o lacrimă rămâne comparație, fiindcă păstrează ca. Soarele, lacrimă pe mare devine metaforă, fiindcă legătura a căzut.',
        'Metafora se poate lipi de un epitet, de o repetiție sau de o enumerație. Ca să o interpretezi, urmezi cinci pași de la figuri: tema, figura, emoția, tipul imaginii și sensul.',
        'În Necuvintele, ca leagă frunza de mână, ramura de braț, trunchiul de umăr. Dacă scoți ca, rămâne metafora, adică ramura-braț și brațul-ramură.',
        'Sensul, spus în 30–50 de cuvinte, e acesta. Fiecare îi dă celuilalt o bucată din sine, iar forma se schimbă. Ramura ajunge să se poarte ca un braț. Brațul ajunge să se poarte ca o ramură.',
        'Emoția e apropierea, până la trecerea unuia prin altul. Mesajul: omul și pomul se înțeleg și fără vorba de toate zilele.',
        'Sens propriu, ca idee: mână, sânge și umăr își păstrează sensul de bază când numesc corpul. Figurat, seva bate asemenea sângelui, iar trunchiul se apleacă asemenea unui om.',
        'Versurile nu se transcriu. La fata din romanul grafic, propria călătorie înseamnă ieșirea din locul hărțuirii, ca să învețe și ca să înceapă din nou.',
        'Titlul BULLY, lângă povestea despre speranță, spune rana împreună cu ieșirea. La școală, întrebările se repetă pe textul deschis. Aici le pui pe soare și pe ideea din Necuvintele.'
      ].join('\n\n'),
      example: [
        'Cu ca, soarele rămâne comparație: este ca o lacrimă. Fără ca, poate fi numit lacrimă pe mare, și atunci e metaforă.',
        'În poem, ramura își ia locul brațului de îndată ce cade ca. Călătoria ei e drumul spre locul în care o ia de la capăt. Încheierea cărții e optimism.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Luna este ca o monedă rămâne comparație. Luna, monedă pe cer e metaforă, fiindcă lipsește ca. Aceeași tăiere se face între ramură și braț.'
        }
      ],
      tryThis: [
        'Alcătuieste o comparație cu ca și metafora ei, după modelul soarelui. Spune ce cade: ca ori precum, apoi ca și când sau ca și cum.',
        'În 30–50 de cuvinte, interpretează schimbul de loc dintre ramură și braț. Pune emoția și mesajul. Dă două cuvinte proprii și două figurate.',
        'Explică drumul ei. Leagă rana din titlul BULLY de ieșirea spre speranță. Versurile rămân netranscrise.'
      ].join('\n\n'),
      keyPoints: [
        'Comparația păstrează ca. Metafora îl scoate și lasă imaginea singură.',
        'Ramura și brațul își schimbă rolul: apropierea ține până când omul și pomul trec unul prin altul.',
        'Propria călătorie e plecarea din locul hărțuirii, iar titlul BULLY ține și rana, și speranța.'
      ]
    }),
    lesson({
      id: 'jonathan',
      title: 'Zborul contează mai mult decât hrana',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Fapte, nu fraze',
          text: 'Cartea lui Richard Bach, Pescărușul Jonathan Livingston, se povestește prin fapte. Frazele nu se transcriu. Tema este libertatea prin învățătură.'
        }
      ],
      theory: [
        'Stolul învață doar drumul scurt, de la mal până la hrană și înapoi. Pentru ceilalți pescăruși contează mâncarea. Pentru Jonathan contează zborul.',
        'Părinții se sperie: stă singur zile în șir și repetă sute de planări, aproape de apă. Când revine, plaja e deja întunecată. E amețit, e obosit, și totuși e bucuros.',
        'Vrea să le arate că viața poate însemna altceva, că învățătura îi scoate din neștiință și că pot fi liberi. Bătrânul îl aduce în fața stolului, în locul numit Centrul pentru Rușine.',
        'Genunchii i se înmoaie. Rușinea nu i se pare dreaptă, fiindcă el crede că a descoperit un țel. Întreabă cine poartă mai multă răspundere decât un pescăruș care caută un sens deasupra capetelor de pește.',
        'Apoi pleacă singur, dincolo de Stâncile Îndepărtate. Nu singurătatea îl apasă. Îl apasă faptul că ceilalți nu vor să privească frumusețea zborului. Zi de zi învață.',
        'Sfatul de păstrat: să rămână liber, să asculte inima și să nu lase viața închisă între limite, fiindcă așa își pierde prețul. Drumul nu se încheie.',
        'Fletch nu pricepe cum poți iubi un stol care a vrut să te omoare. Răspunsul: nu iubești ura. Iubești pescărușul adevărat din fiecare și îl ajuți să și-l vadă. Asta numește el iubire.',
        'A fi liber înseamnă să mergi unde vrei și să rămâi tu. Legea care contează e cea care deschide libertatea. Ochii opresc la limită. Înțelegerea trece dincolo.',
        'Dorința lui cea mai mare: să zboare și să deprindă zborul, nu să mănânce. Trăsătura tare e stăruința. Exersează singur și nu cedează când e rușinat. Sensul vieții, la el, stă în a învăța, a descoperi și a fi liber.',
        'Două cuvinte-cheie: zbor și stol. Fișa despre Micul prinț se scrie numai dacă ai citit cartea. Altfel notezi că o cauți, fără asemănare născocită.'
      ].join('\n\n'),
      example: [
        'Stolul urmărește hrana. Jonathan urmărește zborul. Bătrânul îl duce în Centrul pentru Rușine.',
        'După plecare, îl doare refuzul celorlalți de a privi zborul, nu faptul că a rămas singur. Libertatea înseamnă să fii tu. Trăsătura lui e stăruința.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Fletch vede ura stolului. Jonathan vede pescărușul bun din fiecare și vrea să i-l arate. La el, iubirea nu iartă ura: ajută pe cineva să se vadă altfel.'
        }
      ],
      tryThis: [
        'Spune tema, două cuvinte-cheie și dorința cea mai mare a lui Jonathan. Deosebește miza stolului de miza lui.',
        'Notează locul chemării de către Bătrân și mâhnirea de după plecare. În patru rânduri, explică libertatea lui și iubirea din vorba cu Fletch.',
        'Spune, cu pentru că și cu un fapt de mai sus, dacă ai vrea un tovarăș la fel de stăruitor. Dacă n-ai citit Micul prinț, notează că îl cauți. Nu născoci o asemănare.'
      ].join('\n\n'),
      keyPoints: [
        'Stolul zboară după hrană. Jonathan repetă zborul și ajunge în Centrul pentru Rușine.',
        'Dincolo de Stâncile Îndepărtate, îl mâhnește refuzul celorlalți de a vedea zborul, nu singurătatea.',
        'A fi liber înseamnă să rămâi tu. Față de Fletch, iubirea înseamnă să vezi binele din fiecare, iar nu ura.'
      ]
    }),
    lesson({
      id: 'negociere',
      title: 'Cât spui, ce spui și cum spui',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Cinci principii',
          text: 'Într-o discuție, unul cere informația și altul o dă. Negocierea ține de volum, de adevăr, de temă, de claritate și de relație.'
        }
      ],
      theory: [
        'Cantitatea e volumul: nici potop de vorbe, nici o frântură. Calitatea cere știri adevărate. Relevanța te ține pe subiect. Maniera cere să fii clar și scurt. Politețea cântărește legătura dintre oameni, atenția și ce simte partenerul.',
        'În Căldură mare, schița lui Caragiale, un domn întreabă dacă stăpânul e acasă. Feciorul dă trei vești care nu se potrivesc. Întâi: a plecat la țară. Apoi: odaia e încuiată, iar cheia e la el. La urmă: n-a plecat, a ieșit în oraș, spre București.',
        'Domnul își tăinuie numele și pretinde că sunt prieteni. Mai și jignește. Ce primește se bate cap în cap, deci e incomplet. Se bifează d. Nu e clar, nu e scurt și nu e de ajuns.',
        'Din partea domnului lipsesc vorbele politicoase. Insultă nu ține loc de politețe. Feciorul spune domnule, dar se încurcă. Discuția e despre locul stăpânului și despre musafir.',
        'La Harap-Alb, feciorul craiului o bruschează pe bătrâna gata să-l sprijine. Replicile nu se transcriu. Lecția: disprețul strică schimbul, chiar dacă tu ești cel necăjit.',
        'O rescriere politicoasă, pe scena noastră. Bătrâna întreabă ce-l apasă și oferă ajutor. Băiatul: Vă mulțumesc. E necăjit acum și nu găsește ieșirea. Dacă ea știe un sfat, el ascultă.',
        'Volumul ajunge. Adevărul: spune că e necăjit, fără o boală născocită. Tema: rămâne la necaz. Felul: propoziții scurte. Relația: vă mulțumesc și vă ascult.'
      ].join('\n\n'),
      example: [
        'Cele cinci principii: cantitate, calitate, relevanță, manieră, politețe. În Căldură mare, feciorul se contrazice, întâi a plecat, apoi n-a plecat.',
        'Informația e incompletă. Se bifează d. Insultă nu negociază. Vă mulțumesc ține relația.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă băiatul născocește o boală ca să pară interesant, cade adevărul. Dacă sare la vreme sau la mâncare, cade tema. Vă ascult repară politețea pe care disprețul o stricase.'
        }
      ],
      tryThis: [
        'Definește cele cinci principii: volum, adevăr, temă, claritate, relație. La schița lui Caragiale, spune cine vorbește, ce se cere și de ce se bifează d.',
        'Arată lipsa de politețe prin jignire, nu printr-o replică copiată. Rescrie opt replici între un adolescent și o persoană mai în vârstă, despre cine ești.',
        'Pentru fiecare replică, marchează volumul, limpezimea și respectul. Pune vă și mulțumesc măcar o dată.'
      ].join('\n\n'),
      keyPoints: [
        'Volumul, adevărul, tema, claritatea și relația țin negocierea împreună.',
        'În Căldură mare, veștile feciorului se bat cap în cap, deci informația e incompletă, litera d.',
        'Disprețul strică schimbul. Vă mulțumesc și vă ascult îl repară, fără o boală născocită.'
      ]
    }),
    lesson({
      id: 'emotie',
      title: 'Comentezi pasajul și spui ce simți',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Doi pași',
          text: 'Comentariul sprijină pe un exemplu tipul, tema, vocea, timpul, personajele și sensul. Emoția se scrie la persoana I, cu clipa și cu locul.'
        }
      ],
      theory: [
        'Comentariul începe cu citirea și cu numele tipului. Urmează tema, cuvintele-cheie, cine vorbește, când și unde, cine apare, cum sunt legate personajele și ce sens iese din idei și din figuri.',
        'Fiecare afirmație se sprijină pe un exemplu din text. Când descrii o emoție, stai la persoana I. Arăți clipa de pornire, pașii, locul, oamenii, lucrurile și semnele prin care se vede.',
        'Păstrezi firul, claritatea, ortografia și punctuația. Cele două texte se spun prin fapte, nu prin copiere.',
        'În cartea lui Mircea Eliade, Romanul adolescentului miop, naratorul e singur și decide să pornească romanul în chiar ziua aceea. Va scrie în fiecare după-amiază. Nu așteaptă inspirația: viața îi e cunoscută. Dinu știe.',
        'Are caiete încă din clasa a IV-a. Jurnalul scris acum doi ani vorbea despre un adolescent neînțeles, care suferă din pricina asta. El recunoaște alt adevăr.',
        'Jurnalul îl lingușea și îi domolea pofta de a se răzbuna pe cei care nu-l înțelegeau. Romanul va fi altfel. Eroul e el. Se teme că viața liniștită, printre copii și cărți, nu va interesa.',
        'Totuși, ce i-a lipsit și ce a dorit din mansardă, în seri calde, valorează pentru el mai mult decât anii altora, risipiți în joc și în sărbătoare. Ideea de bază: vrea viața lui adevărată, nu jurnalul care îl consola.',
        'Emoția e dorul amestecat cu teama că n-o să intereseze. Dor, de Nicolae Labiș, e liric. Fără versuri: vocea a plecat, sensurile s-au închis, o flacără o strigă de sub zăpadă, iar ea vrea să iasă din liniște. Emoția e dorul.',
        'Cele două texte se întâlnesc în dorul după ceva absent. La Eliade, viața visată din mansardă. La Labiș, flacăra aflată sub zăpadă. În liric, forța vine din metaforă și dintr-o întrebare reluată. În narativ, din contrastul dintre credință și adevăr.'
      ].join('\n\n'),
      example: [
        'Comentariul dă felul și tema, apoi vocea cu timpul, apoi personajele, apoi sensul. Fiecare stă lângă o probă. Simțirea se spune cu eu.',
        'La Eliade, cel din roman e chiar povestitorul. Caietul de odinioară îi alina necazul. La Labiș, simțirea e dorul. Comun e dorul după ce lipsește.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă spui doar că ambele texte sunt frumoase, n-ai element comun. Comun e dorul: mansarda visată la Eliade, flacăra de sub zăpadă la Labiș. Fiecare fapt stă lângă numele autorului.'
        }
      ],
      tryThis: [
        'Spune cei șase pași ai comentariului. La Eliade, scrie ideea de bază, cine e eroul romanului și de ce jurnalul vechi nu era adevărul întreg.',
        'La Labiș, numește emoția și felul textului. Leagă textele prin dor, cu o probă la fiecare autor.',
        'După aceea, redactează un jurnal, cam o sută cincizeci până la două sute de cuvinte, spus cu eu, despre ce ai simțit la un eveniment: clipa, pașii, locul și cum s-a văzut. Poți alege bucuria, uimirea sau frica.'
      ].join('\n\n'),
      keyPoints: [
        'Comentariul sprijină fiecare observație pe un exemplu: tip, temă, voce, timp, personaje, sens.',
        'La Eliade, eroul e el, iar jurnalul vechi îl consola în loc să spună adevărul întreg.',
        'La Labiș, emoția e dorul. Cele două texte se întâlnesc în dorul după ce lipsește.'
      ]
    }),
    lesson({
      id: 'atribut',
      title: 'Ce stă lângă un nume',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Atributul',
          text: 'Atributul determină un substantiv sau un înlocuitor de substantiv. Îl întrebi cu care, cu ce fel de și cu al cui. Predicatul și subiectul rămân părțile de bază.'
        }
      ],
      theory: [
        'Predicatul verbal are trei haine, fiecare în alt enunț. Verb: Copiii merg la teatru. Locuțiune: A băgat de seamă greșeala. Interjecție: Hai în parc. Nominalul lipește un copulativ, la mod personal, de numele predicativ. Proba: Miruna a ajuns avocat. Numele predicativ e substantiv, pronume sau numeral, la nominativ, ori cu prepoziție.',
        'Pronume: Aceștia sunt părinții mei. Numeral: Cifra mea norocoasă este trei. Acuzativ: Haina este din blană. Subiectul poate fi nume, pronume, numeral, infinitiv sau supin. Inclus stă în Mergem în tabără. Subînțelesul iese din Se plimbă prin parc. Multiplu: Eu și tu plecăm. Supin: Este greu de înțeles. Atributul se lipește de un nume.',
        'Adjectiv: rochia galbenă. Participiu, alt model: revista cumpărată. Gerunziu, alt model: mâncarea aburindă. Negativ: niciun copil. Numeral: trei băieți. Nominativ: orașul București. Genitiv: jucăria copilului. Dativ: nepoată mamei. Cu prepoziție, întâi: cartea despre viața sa. Cu prepoziție, apoi: plimbarea de-a lungul râului.',
        'Adverb: cabana de aici. Ordinal: prăjitura pentru al treilea. Infinitiv, alt model: pasiunea de a desena. Gerunziu, încă un model: soba fumegând. Supin, încă un model: mașina de spălat. El este avocat e nominal. El este în parc e verbal, căci este înseamnă se află. Am rămas acasă e verbal. El rămâne nedumerit e nominal.',
        'Andrei a ieșit polițist e nominal, fiindcă a ieși înseamnă a ajunge. Noi ieșim zilnic în parc e verbal. Valahia e substantiv la nominativ. Dânselor e pronume la genitiv. De a mă întoarce e infinitiv. Repede e adverb. Din vitrină e atribut. Din tinerețe e timp. Din lemn e nume predicativ. Din cărți e complement prepozițional.',
        'Doar acest complement au vorbirea deasă despre sine și gândul la clipe fericite. Caietul cu schițe e atribut. Cu metroul e mod. Pe copil e direct. Haiducii adună ambele roluri. Pentru mama, lângă flori, e atribut.',
      ].join('\n\n'),
      example: [
        'La rochia galbenă, atributul e adjectival. La jucăria copilului, stă la genitiv. La cabana de aici, e adverb. El este avocat e nominal. El este în parc e verbal. Complement prepozițional: vorbirea despre sine, separat de gândul la clipe fericite. Din vitrină e atribut. Din lemn e nume predicativ.',
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Eu și tu plecăm are subiect multiplu. Mergem la teatru are subiect inclus. Este greu de înțeles are subiect la supin. Trei probe, trei feluri.'
        }
      ],
      practice: [
        '1) Spune cele trei haine ale predicatului verbal și cele două piese ale predicatului nominal.',
        '2) Construiește atribut cu genitiv, cu adjectiv invariabil, cu pronume negativ, cu numeral ordinal și cu adverb.',
        '3) Spune rolul lui din la vitrină, la tinerețe, la lemn și la cărți.',
        '4) Alege enunțurile doar cu complement prepozițional și spune felul predicatului în El este avocat și în El este în parc.'
      ].join('\n\n'),
      answers: [
        'Verbal: verb predicativ, locuțiune verbală sau interjecție predicativă. Nominal: copulativ la mod personal plus nume predicativ.',
        'genitiv, jucăria copilului. Invariabil, rochia gri. Negativ, niciun copil. Ordinal, prăjitura pentru al treilea. Adverb, cabana de aici.',
        'atribut; circumstanțial de timp; nume predicativ; complement prepozițional.',
        'Vorbirea deasă despre sine și gândul la clipe fericite. Primul predicat e nominal, al doilea e verbal.'
      ],
      mistakes: 'Nu pune același rol lui din în toate enunțurile. Lângă un nume poate fi atribut. După un copulativ poate fi nume predicativ. Lângă un verb de acțiune poate fi complement.',
      tryThis: 'Construiește câte un atribut cu Valahia, cu dânselor, cu întoarcerea la infinitiv și cu repede. Adaugă un subiect multiplu, unul inclus și unul la supin.',
      keyPoints: [
        'Atributul se lipește de un nume și se întreabă cu care, cu ce fel de ori cu al cui.',
        'El este avocat e nominal. El este în parc e verbal, fiindcă este înseamnă se află.',
        'Din vitrină e atribut, din tinerețe e timp, din lemn e nume predicativ, din cărți e complement.'
      ]
    }),
    lesson({
      id: 'cauza',
      title: 'Din ce pricină se întâmplă',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Cauza',
          text: 'Circumstanțialul de cauză e facultativ. Arată pricina unei fapte sau a unei însușiri. Îl întrebi cu din ce cauză și cu din ce pricină.'
        }
      ],
      theory: [
        'Poate depinde de un verb la mod personal, de o formă nepersonală, de o locuțiune, de un adjectiv sau de un adverb. Probele stau despărțite. Teama: Am înmărmurit de teamă. Lipsa: Lipsind, a pierdut multe lecții. Fuga: a rupt-o de frica întunericului. Invidia: Prietenii păreau roșii de invidie. Aici se închid probele de mai sus.',
        'Pricina se face din substantiv, din pronume sau din numeral, la acuzativ, cu de, din, pentru sau după. Emoție: Ochii i-au lăcrimat de emoție. Pronume: Mama ne-a certat pentru aceștia. Numeral: Am pierdut trenul pentru cei trei. Adjectivul cu prepoziție dă Plângea de fericită. Gerunziul dă Prinzându-ne furtuna, am fugit spre casă.',
        'Locuțiunea, aparte: Nebăgând de seamă piatra, s-a lovit. Poziția față de regent e liberă, înainte ori după. Virgula e obligatorie dacă stă înainte și e adjectiv cu prepoziție sau gerunziu. Model adjectiv: De supărată, nici nu m-a văzut. Model gerunziu: Nevăzând piatra, s-a lovit. Completările, pe etichete. Țipătul primește de durere.',
        'Nasul roșu primește de frig. Greșeala, cu virgulă înainte: De grăbit, a greșit. Îmbrățișarea primește de bucurie. Uitarea primește din grabă. Certarea primește pentru minciună. Frigul: a tremurat de frig. Dorul: a plecat de dor. Emoția: a tăcut de emoție. Supărarea: a rămas acasă de supărare. Perseverând e cauză la gerunziu, conjugarea I.',
        'Uimirea cu de e substantiv, acuzativ. Gerunziul care alunecă pe iarbă stă înainte și cere virgulă. În roșu de emoție, grupul de emoție determină adjectivul. De ciudă e substantiv cu de. Pentru cei doi e numeral cu pentru. De timidă e adjectiv cu prepoziție și cere virgulă, fiindcă stă înainte.',
      ].join('\n\n'),
      example: [
        'De teamă arată pricina. Adjectivul de supărată, pus înainte, cere virgulă. Perseverând e gerunziu de conjugarea I. Țipătul se leagă de durere. De grăbit, a greșit. Când gerunziul de cauză stă înainte, virgula e obligatorie.',
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Uitarea întâlnirii se explică din grabă: substantiv cu din, cauză, după regent, fără virgulă. Certarea se explică pentru minciună: substantiv cu pentru, tot cauză.'
        }
      ],
      practice: [
        '1) Leagă pricina, pe rând, de țipăt, de nasul roșu, de greșeală, de strânsul în brațe, de întâlnirea uitată și de certare.',
        '2) Construiește câte un enunț de pricină cu frigul, cu dorul, cu emoția și cu supărarea.',
        '3) La perseverând, la grupul de uimire, la gerunziul de pe iarbă și la de timidă, spune partea de vorbire și când se pune virgula.',
      ].join('\n\n'),
      answers: [
        'Țipăt: A țipat de durere. Nas: Are nasul roșu de frig. Graba: De grăbit, a greșit. Brațe: L-a strâns în brațe de bucurie. Uitare: A uitat de întâlnire din grabă. Certare: L-a certat pentru minciună.',
        'Frigul: A tremurat de frig. Dorul: A plecat de dor. Emoția: A tăcut de emoție. Supărarea: A rămas acasă de supărare.',
        'perseverând: gerunziu, conjugarea I, cauză. de uimire: substantiv, acuzativ, prepoziția de. pe iarbă: gerunziu, virgulă, stă înainte. de timidă: adjectiv cu prepoziție, virgulă, stă înainte.',
      ],
      mistakes: 'Virgula nu e la alegere când gerunziul de cauză sau adjectivul cu prepoziție stă înainte. După regent, aceeași cauză rămâne fără virgulă.',
      tryThis: 'În vreo șaptezeci de cuvinte, explică-i lui Jonathan de ce o carte a rămas neterminată. Folosește două pricini: un substantiv cu de și un gerunziu pus înainte, despărțit prin virgulă. Dacă o cunoști, adaugă un fapt. Altfel notează că n-ai ajuns la capăt.',
      keyPoints: [
        'Cauza se întreabă cu din ce pricină și se face cu de, din, pentru, după sau cu un gerunziu.',
        'De supărată și nevăzând piatra cer virgulă doar când stau înaintea regentului.',
        'Perseverând e gerunziu de cauză, conjugarea I. De grăbit, a greșit ține aceeași regulă a virgulei.'
      ]
    }),
    lesson({
      id: 'scop',
      title: 'Cu ce scop pleacă',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Scopul',
          text: 'Circumstanțialul de scop arată ținta unei fapte. Îl întrebi cu cu ce scop și cu în ce scop. Așezat înainte, cere virgulă.'
        }
      ],
      theory: [
        'Poate depinde de un verb la mod personal, de o locuțiune, de un adjectiv, de o interjecție predicativă sau de o formă nepersonală. Studiază pentru admiterea la facultate. Fuga are ținta pentru a nu-l prinde. Chemarea: Hai la plimbare. Concentrarea: Era concentrată spre a nu greși.',
        'Gerunziul de studiu: Învățând pentru examen, ne-am trezit devreme. Substantivul în acuzativ vine cu la, cu după, cu spre, cu pentru sau cu întru. A plecat la studii. La bibliotecă, ținta poate fi consultarea unui document. La pronume, ținta sună pentru el se pregătește. La numeral, ținta sună pentru cele două se antrenează.',
        'Infinitivul cu prepoziție: spre a finaliza proiectul. Supinul: s-a pregătit pentru alergat. Înaintea regentului, virgula e obligatorie. Pentru a-l susține, a venit din Portugalia. Șirul de lucru dă scopuri, pe rând. Întâi după pâine. Apoi spre a împrospăta. Apoi pentru a scăpa. La urmă pentru cele două. Deosebiri, fiecare cu eticheta ei.',
        'A plâns de durere rămâne cauză. La pescuit e scop și e supin. Timpul, alt rol: Ajunge acasă până a nu se însera. L-a trimis după făină e scop. A călătorit cu trenul e mod. Până la bunici e loc. La flori, pentru a le oferi e scop. Partea e infinitiv, conjugarea a IV-a, legată prin pentru. Grupul pentru aceștia e tot scop, dar e pronume.',
        'După căpșuni e scop, iar partea e un substantiv. Pentru a face o tartă rămâne scop, la infinitiv. Patru completări, ținute departe. Creionul se cumpără pentru desen. Agenda primește o notă, cu ținta pentru a nu uita. Florăria primește după un buchet. Sfatul se desparte: L-a sfătuit să fie atent. Ținta stă în pentru a nu greși.',
      ].join('\n\n'),
      example: [
        'Pentru a le oferi e țintă. Infinitivul e de conjugarea a IV-a. Ținte sunt și după pâine, și după făină. La pescuit e supin, tot țintă. De durere rămâne cauză. Până a nu se însera e timp. Cu trenul e mod. Pentru a-l susține, pus înainte, cere virgulă.',
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Până la bunici arată locul, nu ținta cumpărăturii. După căpșuni arată ținta: a plecat ca să le ia. Aceeași prepoziție, după, nu hotărăște singură rolul. Îl hotărăște întrebarea.'
        }
      ],
      practice: [
        '1) Pune ținta la creion, la agendă, la florărie și la sfat.',
        '2) Spune partea de vorbire. La după pâine. La spre a împrospăta. La pentru a scăpa. La pentru cele două.',
        '3) Deosebește rolul. Întâi de durere. Apoi la pescuit. Apoi până a nu se însera. Apoi după făină. Apoi cu trenul. La urmă până la bunici.',
        '4) Analizează, separat, grupul pentru a le oferi, grupul pentru aceștia și grupul după căpșuni. Scrie o țintă așezată înainte, cu virgulă.',
      ].join('\n\n'),
      answers: [
        'Creion: A cumpărat un creion pentru desen. Agendă: A notat totul în agendă, ținta fiind pentru a nu uita. Florărie: S-a oprit la florărie după un buchet. Sfat: L-a sfătuit să fie atent. Țintă: pentru a nu greși.',
        'după pâine: substantiv. spre a împrospăta: infinitiv. pentru a scăpa: infinitiv. pentru cele două: numeral.',
        'de durere: cauză. la pescuit: scop, supin. până a nu se însera: timp. după făină: scop. cu trenul: mod. până la bunici: loc.',
        'pentru a le oferi: scop, infinitiv, conjugarea a IV-a, prepoziția pentru. pentru aceștia: scop, pronume. după căpșuni: scop, substantiv cu după. Pentru a-l susține, a venit din Portugalia.',
      ],
      mistakes: 'Nu amesteca ținta cu pricina. De durere arată cauza. La pescuit și după pâine arată scopul. Ținta așezată înainte cere virgulă.',
      tryThis: 'Scrie patru enunțuri scurte: unul cu supin, unul cu infinitiv, unul cu după plus substantiv și unul cu ținta înaintea verbului. La ultimul pune virgula.',
      keyPoints: [
        'Scopul se întreabă cu în ce scop și se face cu la, după, spre, pentru, întru, cu infinitiv sau cu supin.',
        'De durere rămâne cauză. La pescuit și după făină rămân ținte. Până a nu se însera e timp.',
        'Pentru a le oferi e infinitiv, conjugarea a IV-a. Pus înainte, scopul cere virgulă.'
      ]
    }),
    lesson({
      id: 'contacte-doi',
      title: 'O investigație despre prietenie',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Cinci etape',
          text: 'Investigația pleacă de la o întrebare, trece prin dovezi și se oprește la reflecție. Nota de pe chestionar nu înlocuiește articolul.'
        }
      ],
      theory: [
        'Contactul cultural, reluat acum, poate apropia oameni. Întrebarea de cercetat: pot astfel de întâlniri să nască prietenii? Revista clasei poartă numele Punți prin cultură.',
        'Elevii se grupează în cinci echipe. Fiecare ia un domeniu: tradițiile, jocurile, muzica, literatura sau gastronomia. Caută un fapt pe care îl poate verifica.',
        'Drumul are cinci pași. Fixezi întrebarea. Explorezi, adică aduni dovezi și le analizezi. Explici ce ai găsit. Treci ce ai aflat mai departe, de pildă într-un articol. La urmă te uiți înapoi la munca ta.',
        'Chestionarul final cere de unde ai luat faptul, ce ți-a rămas, cum ți s-a părut mersul lucrului, motivul formei alese, ce notă îți pui și cum te-ai simțit. Nota nu e lecția. Conținutul e lecția.',
        'Contactul cultural și prietenia seamănă fiindcă amândouă leagă. Se despart așa: contactul duce o meserie sau un obicei de la un neam către altul, pe când prietenia leagă persoane.',
        'Și un copil reușește legătura, nu doar un om mare, dacă are o sursă: o melodie, un joc sau o bucată. Obiceiul nu se născocește. Dacă nu l-ai citit, scrii că îl cauți.',
        'Din lecțiile de până acum, interculturalitatea se vede ușor în bucătărie și în muzică. Articolul pentru revistă stă pe un fapt, nu pe o notă.'
      ].join('\n\n'),
      example: [
        'Revista se cheamă Punți prin cultură. Sunt cinci grupe și cinci domenii: tradiții, jocuri, muzică, literatură, gastronomie.',
        'Pașii: întrebare, explorare, explicație, transfer, reflecție. Meșteșugul trece prin contact. Persoanele se leagă prin prietenie. Punctajul nu ține loc de articol.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'O melodie auzită de la un coleg poate fi sursă, dacă spui de unde o știi. Dacă n-ai melodia, scrii că o cauți. Un obicei născocit ca să umple articolul nu e contact cultural.'
        }
      ],
      tryThis: [
        'Într-o propoziție, spune ce e interculturalitatea: oameni din culturi diferite își dau mai departe un obicei, un joc sau o mâncare. Arată ce apropie contactul cultural de prietenie și ce îi desparte.',
        'Alege unul dintre cele cinci domenii și scrie, pentru revistă, 80–100 de cuvinte, numai cu un fapt verificabil din lecții sau pe care îl cauți.',
        'Scrie cei cinci pași. La privirea înapoi, notează ce ți-a rămas. Punctajul nu înlocuiește faptul.'
      ].join('\n\n'),
      keyPoints: [
        'Cinci pași duc de la întrebare la privire înapoi, iar revista poartă numele Punți prin cultură.',
        'Grupele acoperă tradiții, jocuri, muzică, literatură și gastronomie.',
        'Contactul mută un meșteșug între popoare. Prietenia leagă persoane. Ce nu e într-o sursă nu se născocește.'
      ]
    }),
    lesson({
      id: 'recap-privind',
      title: 'Fata de cincisprezece ani',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Idee, nu scor',
          text: 'Recapitularea stă pe idee, nu pe foaia cu puncte. Textul deschis poate fi Fata asta de cincisprezece ani, poezia Magdei Isanos, sau Oglinda din adânc, a lui Lucian Blaga.'
        }
      ],
      theory: [
        'Versurile nu se transcriu. Iată faptele din poezia lui Isanos. Vocea o caută pe cea care a fost, la cincisprezece ani și jumătate. Chipul i se semăna, avea cozi, era veselă și cutezătoare.',
        'Acum i s-au uscat și nădejdea, și visurile. O caută în inima îmbătrânită, în ochii care nu mai zâmbesc și în gura amărâtă. Și-ar dori-o alături, cu părul neascultător și cu sufletul plin, ca să audă că încă n-a plecat.',
        'Starea e dorul, născut din lipsa fetei de atunci. Tema e timpul care desparte două vârste. Două cuvinte de ținut: fată, apoi dor. Tiparul e liric, fiindcă o voce, la persoana I, rostește o simțire, iar nu o poveste cu deznodământ.',
        'Subiectivitatea are două mărci: persoana I și mi-e dor, verbul prin care se simte lipsa. Sunt două vârste. Adolescența are cozile și îndrăzneala. Vârsta de acum are inima seacă.',
        'Visul din prima strofă înseamnă planuri uscate, nu somnul de noapte. Versul dintâi, prin întrebare, o strigă pe absenta. Primele patru versuri rimează încrucișat. Măsura se numără când ai strofa în față.',
        'Titlul numește persoana căutată: fata de atunci, încă strigată. Într-o propoziție a noastră, predicat verbal e purta cozi. Predicat nominal e inima este seacă.',
        'Subiectul fată e substantiv. Subiectul eu, în eu caut, e pronume. Dorul ca pricină: A tăcut de dor. Plecarea cu țintă stă în enunțul A plecat pentru a o revedea. Scorul de 60 de puncte stă în afara lecției.',
        'Din idee faci trei pași, pe scena noastră. În seara de duminică, Mara stă dinaintea oglinzii și spune că îi lipsește fata veselă de la amiază. Ce scrie stă în fraza asta. Ce vezi începe cu O văd.'
      ].join('\n\n'),
      example: [
        'Scrisul: în seara de duminică, Mara zice că îi lipsește fata veselă de la amiază. Privirea: O văd pe Mara dinaintea oglinzii.',
        'Eu aș pune un răvaș lângă sticlă, fiindcă îi e dor de fata de la prânz. La Isanos, vârstele sunt adolescența și clipa de acum. Rima celor dintâi patru versuri e încrucișată.',
        'A tăcut de dor e cauză. A plecat pentru a o revedea e scop.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Visul din strofa întâi nu e somnul de noapte. Sunt planurile care s-au uscat. Întrebarea din versul întâi nu cere o informație: o strigă pe cea absentă.'
        }
      ],
      tryThis: [
        'Pe scena Marei notează scrisul, privirea și fapta ta, cu pentru că. Privirea începe prin O văd. La Isanos, dă starea, tema, două cuvinte de ținut, motivul pentru care textul e liric și cele două vârste.',
        'Spune că primele patru versuri rimează încrucișat. Versul dintâi, prin întrebare, o strigă pe absenta. Dă un predicat verbal, unul nominal, un subiect nume și unul pronume.',
        'Pune dorul ca pricină și plecarea cu o țintă. Mai departe, cam o sută cincizeci până la două sute de cuvinte despre emoția revederii cuiva drag, la persoana I, cu o bucată de povestire și cu replici, între patru și șase.'
      ].join('\n\n'),
      keyPoints: [
        'Vocea lui Isanos o strigă pe cea de cincisprezece ani și jumătate. Simțirea e dorul, iar textul e liric.',
        'Primele patru versuri rimează încrucișat. Visul din strofa întâi înseamnă planuri uscate, nu somn.',
        'A tăcut de dor e cauză. A plecat pentru a o revedea e scop. Foaia cu 60 de puncte nu e lecția.'
      ]
    }),
    lesson({
      id: 'recap-finala',
      title: 'Scoicile din nisip și o corabie spre Constanța',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Două texte',
          text: 'Închiderea anului nu e o foaie de puncte. Poți avea un fragment din Ioana, de Anton Holban, și scena a doua din actul II al piesei O noapte furtunoasă. Frazele și replicile nu se transcriu.'
        }
      ],
      theory: [
        'Dimineața strânge scoici, daruri pentru prieteni din București. Pe pervaz farmecul moare, fereastra doboară câteva. Marfă rară, zero turiști, vameș fără treabă. Portul e oprit, hambarele hrănesc șobolani. Corabie mare, zile întregi dinaintea Cavarnei: țărmul oprește apropierea, grâne spre Constanța. Hacik îl știe pe comandant.',
        'Propune drumul, o zi acolo și întoarcerea cu aceeași corabie. Plecare pe la ora zece seara, haine bune, merinde. Vocea e la persoana I. Timpi despărțiți: dimineața toată, câteva zile, ora zece. Locuri: nisip, fereastră, Cavarna, Constanța. Temă: așteptarea unei plecări. Bucuria de dimineață vine din scoici. Diftongul și ch fac un sunet.',
        'Alegeam: 7 litere, 6 sunete, ea. Închideam: 9 litere, 7 sunete, ch și ea. Ele: 3 și 3. Ceas: 4 și 3. Serviciu: 8 și 7, iu. Pierdeam se taie pier-deam, ie cu ea. Corăbiile dau co-ră-bi-i-le, hiat i-i. Cunoaște: cu-noaș-te, oa. Misterioasă: mis-te-ri-oa-să. Fiecare se taie fi-e-ca-re, hiat i-e. Era: e-ra.',
        'Derivate: descoperire și misterioasă. Compus: niciodată. Se bifează b. Câmpul mării: scoică, corabie, port, țărm, vameș. Antonime: închide cu deschide, rar cu niciodată. Omonime: care, pronumele, față de care, căruța. Portul e rada. Port, la eu, ține de a purta. Foarte rar e superlativ absolut. Mai mult e comparativ de superioritate.',
        'A rămas e predicativ: a se afla. Era încântat: copulativ plus nume predicativ. Alt e adjectiv pronominal nehotărât. Căruia e relativ, dativ. Le e personal, acuzativ. Mă e reflexiv. Iar leagă două propoziții, prin joncțiune. Rică intră, o zărește pe Veta din spate, cade în genunchi și o numește înger. Ea țipă și se trage.',
        'Și-a pierdut judecata, dragostea l-a scos din fire. Crede că ea l-a chemat după ora zece, la numărul 9, pe Catilina, cu lampa micșorată. Râsul ei arată încurcătura. În scenă: Rică și Veta. Din casă sunt chemați Chiriac, apoi Spiridon. Afară: jupân Dumitrache și Ipingescu. Temă: dragoste pe o confuzie. E încurcat, căci nu ea l-a chemat.',
        'Dramatic: numele stă înaintea replicii, didascalii în paranteză. Fără dublare cu pentru prima oară: de când te-am văzut întâia oară. Fără dublare cu june: sunt un tânăr nefericit. Gerunzii stau în indicații. A comunica e infinitiv. Sunt, lângă cine și lângă tânăr, e nominal. Mă întrebi și iubește sunt verbale. Își e reflexiv.',
        'O poate fi nehotărât. Întâia e ordinal. A și ha sunt interjecții. Frunte: partea feței, sau începutul unei coloane. Proba asertivă: A venit pentru a comunica vestea. Rolul lui a comunica e scop. Întrebarea: Vorbești despre epistola aceasta, complement prepozițional.',
      ].join('\n\n'),
      example: [
        'Scrisul: scoici pe pervaz, farmecul moare. Privirea: Îl văd la geam. Alegeam: 7 litere față de 6 sunete. Rică greșește casa. Hacik e mai agitat, Constanța pare mare.',
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pe chip, fruntea e partea feței. La o coloană, fruntea e începutul. A venit pentru a comunica vestea e asertiv, iar a comunica e scop.'
        }
      ],
      tryThis: [
        'Notează scrisul, privirea, cu Îl văd, și fapta, cu pentru că. Dă timpii, locul și bucuria. Socotește alegeam și închideam. Taie pierdeam și corăbiile. La piesă, dă personajele, tema și dublările curate.',
      ].join('\n\n'),
      keyPoints: [
        'Scoicile mor pe pervaz. Corabia iese seara din Cavarna spre Constanța.',
        'Alegeam: 7 litere față de 6 sunete. Se bifează b. A rămas e predicativ.',
        'Rică e aprins pe o confuzie. Întâia oară stă fără grupul pentru prima oară.',
      ]
    })
  ]
};
