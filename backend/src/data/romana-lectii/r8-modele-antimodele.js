'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  id: 'modele-antimodele',
  title: 'Modele și antimodele',
  inOwnWords: 'Hiperbola, aliterația și antiteza se transcriu pe rânduri proprii. Lângă ele stau fonetica, cuvintele străine, derivarea, compunerea și conversiunea. Gestul, recenzia și sărbătoarea eroilor rămân scurte.',
  toc: [
    'Gest, ton și nomofobie',
    'Figuri deja cunoscute',
    'Imnul de la Putna',
    'Hiperbolă, aliterație, antiteză',
    'Colierul lui Sinan',
    'Scrisul de mână și rubrica',
    'Diftong, hiat, sunete',
    'Cuvinte străine',
    'Derivare și compunere',
    'Conversiunea',
    'Împrumuturi',
    'Erou și recenzie',
    'Recapitularea modelelor'
  ],
  glossary: [
    {
      term: 'hiperbolă',
      meaning: 'Exagerare intenționată, prin mărire sau prin micșorare, ca să impresioneze.'
    },
    {
      term: 'aliterație',
      meaning: 'Repetarea unui sunet sau a unui grup de sunete, pentru muzicalitatea rândului.'
    },
    {
      term: 'antiteză',
      meaning: 'Doi termeni cu sens opus, puși alături ca să se arate unul prin celălalt.'
    },
    {
      term: 'conversiune',
      meaning: 'Cuvânt nou prin schimbarea părții de vorbire, fără prefix și fără sufix.'
    },
    {
      term: 'nomofobie',
      meaning: 'Teama intensă când telefonul lipsește, nu are semnal sau rămâne fără baterie.'
    }
  ],
  lessons: [
    lesson({
      id: 'nonverbal',
      title: 'Gestul, tonul și telefonul',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Două canale',
          text: 'Nonverbalul se face prin gest, mimică și poziția corpului. Paraverbalul se face prin ton și prin ritmul vorbirii. Proba scrisă punctează faptul, nu gestul.'
        }
      ],
      theory: [
        'Ca să convingi la oral, ții contactul vizual, stai drept și apeși cuvintele-cheie. Vorbești clar. La scris, aceleași idei stau în fapte.',
        'Emisiunea Profesioniștii, realizată de Eugenia Vodă, îl are invitat pe actorul George Mihăiță. Ea întreabă despre Ziua Adolescentului și amintește o propunere de lege din 1994.',
        'El răspunde că ziua este a adolescenților, nu a tuturor, că la vârste diferite suntem singuri și că mulți nu găsesc un umăr. Ziua se ține în a doua duminică din mai.',
        'Clubul UNESCO Adolescenții funcționa pe lângă revista Salut. Legea a fost promulgată în 1997 de președintele Emil Constantinescu. Cartea Dramele adolescenților este o antologie de scrisori.',
        'Mihăiță spune că drama cea mai mare este lipsa de comunicare. Prima scrisoare se intitulează cu dorința de a fi ascultat. Comentariul de ținut: la vârste diferite suntem singuri. Unii găsesc un umăr. Alții nu.',
        'Nomofobia vine din engleză, no mobile phone phobia. Este teama intensă când telefonul este uitat, când este în afara semnalului sau când rămâne fără baterie.',
        'Un studiu britanic din lecție: 77 la sută dintre tinerii de 18–24 de ani nu reușesc să stea departe de mobil mai mult de câteva minute.',
        'Psihologul Elizabeth Waterman spune că devine alarmantă când strică relațiile cu apropiații sau când apar probleme la școală ori la serviciu, pentru că telefonul este folosit la altceva decât la învățătură sau la muncă.'
      ].join('\n\n'),
      example: [
        'Fapt: 77 la sută, între 18 și 24 de ani, nu stau departe de telefon decât câteva minute. Părere: merită să știi când dependența îți ia pauza de lângă un om.',
        'Motivul, de la Waterman: devine problemă când timpul de telefon întrece timpul dat oamenilor apropiați sau când încurcă școala. Gestul nu se punctează pe foaia scrisă.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Trei situații ale nomofobiei: telefon uitat, lipsă de semnal, baterie goală. Dacă lipsește una, definiția este incompletă. Procentul de 77 la sută se leagă de vârstele 18–24, nu de orice vârstă.'
        }
      ],
      tryThis: 'Definește comunicarea nonverbală și pe cea paraverbală. Notează cele trei situații ale nomofobiei și procentul, cu vârstele. Spune când o socotește alarmantă Elizabeth Waterman. Numește emisiunea, realizatoarea, invitatul și anii 1994 și 1997.',
      keyPoints: [
        'Nonverbalul este gest și mimică. Paraverbalul este ton și ritm.',
        'Nomofobia este teama când telefonul lipsește, nu are semnal sau nu are baterie.',
        '77 la sută dintre tinerii de 18–24 de ani, într-un studiu britanic din lecție, nu se despart de mobil mai mult de câteva minute.'
      ]
    }),
    lesson({
      id: 'limbaj-figurat',
      title: 'Figurile se transcriu și se numesc',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Transcriere',
          text: 'La itemul de figuri se copiază secvența și se spune felul. Sensul propriu este cel de bază. Sensul figurat mută cuvântul.'
        }
      ],
      theory: [
        'Personificarea dă unei ființe sau unui lucru o faptă de om. Epitetul alege o însușire deosebită. Enumerația înșiră termeni diferiți. Ea nu constă în repetarea aceluiași cuvânt. Repetiția este cea care reia.',
        'Metafora trece la alt sens, pentru că este comparația fără ca, precum sau ca și cum. Comparația păstrează cuvântul de apropiere.',
        'Andrei Mureșanu, în Deșteaptă-te, române, cheamă la luptă și pune viața în libertate față în față cu moartea. Numele istorice din text sunt Mihai, Ștefan, Corvine și Traian. Imnul nu se lipește.',
        'Vasile Alecsandri, în Dan, căpitan de plai, îl arată pe Dan tânăr: lumea i se părea îngustă pentru bine și prea largă pentru rău. Mânia lui este ca trăsnetul. Țara doarme, iar el veghează. Aceasta este personificare. Îngust și larg sunt antiteză. Versurile nu se lipesc.',
        'Model original: Munții stau de strajă. Personificare. Lancea lui ajungea la nori. Hiperbolă. Ziua e pâine, noaptea e fum. Antiteză. Vântul viu vuiește în vale. Aliterație. Soarele este o rană pe cer. Metaforă. Soarele este ca o rană. Comparație.',
        'Elementul comun dintre chemarea la libertate și veghea lui Dan: un om stă între țară și primejdie. Structura diferă: unul este imn de chemare, celălalt este portret de căpitan.',
        'La item se scrie întâi secvența, apoi numele figurii. Comparația se recunoaște după ca, precum sau ca și cum. Metafora le scoate și lasă doar apropierea.'
      ].join('\n\n'),
      example: [
        'Personificare: Munții stau de strajă. Epitet: strajă falnică. Enumerație: sabie, scut și corn. Repetiție: veghează, veghează. Metaforă: Soarele este o rană. Comparație: Soarele este ca o rană.',
        'În imnul lui Mureșanu, libertatea și moartea stau față în față. La Alecsandri, binele îngust și răul larg sunt opoziție.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Lumea îngustă pentru bine și largă pentru rău, în 30 de cuvinte: binele nu are loc, răul are prea mult. Opoziția se spune în proză. Versul nu se copiază. Numele figurii este antiteză.'
        }
      ],
      tryThis: 'Transcrie, din modelele lecției, o personificare, o metaforă, o antiteză și o aliterație și numește-le. Spune cele patru nume din imnul lui Mureșanu. În cel puțin 30 de cuvinte, compară chemarea la libertate cu veghea lui Dan.',
      keyPoints: [
        'Personificarea dă o faptă de om. Epitetul alege însușirea. Metafora este comparația fără ca.',
        'Enumerația înșiră termeni diferiți. Repetiția reia același cuvânt.',
        'Mureșanu îi numește pe Mihai, Ștefan, Corvine și Traian. Figura se transcrie și se numește.'
      ]
    }),
    lesson({
      id: 'imn-stefan',
      title: 'Elogiul de la Putna',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Elogiu',
          text: 'Textul laudă un om și îl aduce în fața celor care ascultă. La compunere se cer emoția, tema, tabloul și figurile, nu strofa lipită.'
        }
      ],
      theory: [
        'Imn lui Ștefan cel Mare, de Vasile Alecsandri, a fost scris pentru serbarea de la Mănăstirea Putna, din 15/27 august 1871, la 400 de ani de la construirea mănăstirii.',
        'Tema este elogiul: vitejia, jertfa, legătura dintre trecut, prezent și viitor, libertatea și unirea pe care el a prevăzut-o. Textul este un elogiu: adevărat.',
        'Cadrul spațial este la poalele Carpaților, lângă mormântul vechi. Carpații păzesc ca niște sentinele: personificare. Secolele șoptesc gloria: personificare. Ștefan este un soare care nu apune în suflete: metaforă.',
        'Sentinela falnică are epitet. Unirea spusă de două ori este repetiție. Adresarea directă îl cheamă pe domn în fața celor care jură, nu povestește la persoana a III-a.',
        'În chemarea O, Ștefan, erou sfânt, Ștefan este în vocativ. Vocativul cheamă și nu are funcție sintactică. Verbele la prezent îl țin pe erou în timpul cititorului.',
        'Sinonim pentru sublimă: măreață. Nu apui înseamnă nu dispari. În veci înseamnă pururea. Patru cuvinte-cheie: Ștefan, Carpați, mormânt, unire.',
        'Strofele sunt catrene. Rima este încrucișată. Primul vers are 8 silabe, pe rândul deschis de la școală. Imnul nu se lipește aici.',
        'Patru trăsături pentru compunerea de cel puțin 150 de cuvinte: emoția stă în față, vocea se adresează direct, prezentul îl face actual pe erou, figurile poartă lauda. Ultima strofă este un jurământ: lauda devine făgăduință.'
      ].join('\n\n'),
      example: [
        'Temă: elogiul lui Ștefan. Emoție: respectul amestecat cu jurământul. Tablou: Carpații lângă mormânt. Figură: soarele care nu apune în suflete, metaforă.',
        'Vocativ: Ștefan. Data: 15/27 august 1871. Locul: Putna. 400 de ani. Primul vers: 8 silabe. Rima: încrucișată. Catrene. Sublimă înseamnă măreață.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Jurământul final, în proză: un gând, în numele celor de față, se leagă de glorie și de patrie. Tema și mijlocul se întâlnesc acolo. Nu se copiază strofa ca să dovedești că ai citit-o.'
        }
      ],
      tryThis: 'Notează data, locul și cei 400 de ani. Spune tema, cadrul și cazul lui Ștefan în chemare. Dă sinonimul pentru sublimă. Alege, fără versuri copiate, o personificare și o metaforă din faptele lecției. Spune strofa, rima și măsura primului vers.',
      keyPoints: [
        'Imnul a fost scris pentru Putna, la 15/27 august 1871, la 400 de ani de la zidire.',
        'Ștefan, în chemare, este vocativ. Carpații și secolele sunt personificate. Soarele care nu apune este metaforă.',
        'Strofa este catren, rima este încrucișată, primul vers are 8 silabe. Sublimă înseamnă măreață.'
      ]
    }),
    lesson({
      id: 'trei-figuri',
      title: 'Mărește, repetă un sunet, opune',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei figuri',
          text: 'Hiperbola exagerează intenționat, în sus sau în jos. Aliterația repetă un sunet. Antiteza pune alături termeni cu sens opus.'
        }
      ],
      theory: [
        'În vechi și nouă, din Glossa lui Mihai Eminescu, cei doi termeni sunt în opoziție: este antiteză. Catrenul nu se lipește.',
        'În Scrisoarea III, bătălia repetă sunetul v, în vâjâit și în vijelie, și sunetul ș, în șuierul săgeților. Aceasta este aliterație. Versul nu se lipește.',
        'În Pașa Hassan, de George Coșbuc, Mihai este mărit peste firesc: vorba este tunet, respirația este ger, barda ajunge la cer, vodă este un munte. Aceasta este hiperbolă și caracterizare indirectă prin imagine. Strofa nu se lipește.',
        'Model original: Barda lui ajungea la nori. Hiperbolă. Vântul viu vuiește în vale. Aliterație, sunetul v. Ziua e liniște, noaptea e vacarm. Antiteză.',
        'Micșorarea este tot hiperbolă. Furnica muta un munte pe umăr este mărire. Firul de iarbă îi era palat poate fi micșorarea palatului sau mărirea firului. Ține definiția: exagerare intenționată, în ambele sensuri.',
        'La examen transcrii modelul și scrii numele. O definiție fără secvență nu ține locul figurii. Caracterizarea prin hiperbolă arată vitejia fără eticheta curajos.',
        'Hiperbola nu este o greșeală de măsură. Autorul știe că barda nu ajunge la cer și tot așa o descrie, ca să arate o forță peste firesc.',
        'Aliterația se aude. Același sunet se repetă la începutul unor cuvinte apropiate. Un singur v nu ajunge ca să existe figura.',
        'Antiteza ține doi poli în aceeași frază. Vechi lângă nouă este destul. Nu trebuie un paragraf întreg ca să se vadă opoziția.'
      ].join('\n\n'),
      example: [
        'Vechi și nouă: antiteză. Barda ajunge la cer, în portretul lui Mihai: hiperbolă. Sunetul v repetat în bătălie: aliterație.',
        'Modelul de caiet: Lancea lui atingea norul. Hiperbolă. Valea vuiește sub vânt. Aliterație. Lumină și beznă în aceeași frază: antiteză.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Hiperbolă prin micșorare: palatul îi era cât un degetar. Nu este o descriere realistă. Exagerează în jos, ca să impresioneze. Tot hiperbolă rămâne.'
        }
      ],
      tryThis: 'Definește cele trei figuri. Spune că vechi și nouă sunt în opoziție. Fără versuri, spune cum este mărit Mihai: tunet, ger, bardă, munte. Transcrie cele trei modele originale și numește figura. Scrie și o hiperbolă prin micșorare.',
      keyPoints: [
        'Hiperbola exagerează, în sus sau în jos. Aliterația repetă un sunet. Antiteza opune.',
        'Vechi și nouă sunt antiteză. Bătălia din Scrisoarea III repetă sunetul v.',
        'Mihai, în Pașa Hassan, este mărit până la tunet, ger, bardă și munte.'
      ]
    }),
    lesson({
      id: 'colierul',
      title: 'Mărgelele și povestea care rămâne',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Fapt, nu etichetă',
          text: 'Caracterizarea și figurile se aplică pe fapte. Titlul numește obiectul care poartă norocul și legenda, nu o bijuterie oarecare.'
        }
      ],
      theory: [
        'Doina Ruști, născută în 1957, a scris Colierul pentru școală. Faptele, pe scurt, fără frazele textului. Sinan, orfan de 12 ani, din Dibër, pleacă spre Istanbul. Recrutările de ieniceri nu mai întorceau pe nimeni odată trecut pe listă.',
        'Mătușa Emine îl îndeamnă să plece în armată, nu să rămână cerșetor. Îi dă mărgele de os pe un șnur și îi spune că, cât le poartă, este invincibil. El ajunge căpitan, apoi general și vizir.',
        'Koca Sinan Pașa înseamnă, în turcește, Sinan cel Mare. Osmanlâu înseamnă turc. Sangeac înseamnă, în context, purtătorul steagului. Vara, drumul spre Valahia trece prin valea Neajlovului, prin mocirlă. Apar bivoli negri. În turcă, siyah mandalar.',
        'Mărgelele se risipesc în mâl. În primăvara următoare, vizirul moare. Zvonul spune că l-ar fi salvat calul, apoi că acel cal a fost furat. Nu a lăsat urmași, ci legenda.',
        'Cronicile valahe scriu că, la Călugăreni, lui Sinan i-au sărit dinții de frică: cineva văzuse mărgelele și le luase drept dinți. Adevărat: era sărac și orfan. Fals: Emine îl oprește din armată. Adevărat: primește colierul. Fals: a avut urmași.',
        'Hiperbolă: din ochii lui păreau să zboare sute de vulturi. Antiteză: copilul de 12 ani și bărbatul temut. Aliterație scurtă: muștele bâzâiau.',
        'Însemnată înseamnă importantă. Virtuți înseamnă calități. Și-au luat nasul la purtare înseamnă că au devenit obraznici. A rămâne cu gura căscată înseamnă uimire. Damf înseamnă miros neplăcut.',
        'Separat, articolul de istorie: în august 1595, Mihai Viteazul îi atacă pe otomanii lui Sinan Pașa la Călugăreni. Cu ajutor din Moldova și din Transilvania, Mihai învinge la Târgoviște și la București în octombrie 1595. Nu amesteca luna morții din povestire cu luna bătăliei.'
      ].join('\n\n'),
      example: [
        'Ce scrie: Sinan, orfan de 12 ani, primește mărgele și ajunge vizir. Le pierde în mâlul Neajlovului. Cronicile vorbesc de dinți, nu de mărgele.',
        'Ce vezi: îl văd în șa, cu un șnur rupt și cu mărgele în noroi. Eu aș strânge mărgelele, pentru că încrederea stătea în ele. Sute de vulturi: hiperbolă. Copil și vizir: antiteză.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ideea, în două rânduri: credința în propriile puteri poate conta mai mult decât însușirile, iar după un om rămân poveștile. Mărgelele și dinții din cronici sunt faptele. Nu se lipesc frazele povestirii.'
        }
      ],
      tryThis: 'Răspunde adevărat sau fals la orfan, la îndemnul Eminei, la colier și la urmași. Spune ce înseamnă Koca, osmanlâu și siyah mandalar. Arată hiperbola și antiteza. Separă august și octombrie 1595 de primăvara morții din povestire.',
      keyPoints: [
        'Sinan are 12 ani, este orfan și primește mărgelele de la Emine, care îl îndeamnă să plece.',
        'Colierul rămâne în mâlul Neajlovului. Nu lasă urmași. Cronicile vorbesc de dinți la Călugăreni.',
        'Călugăreni este în august 1595. Târgoviște și București sunt în octombrie 1595.'
      ]
    }),
    lesson({
      id: 'redactare-examen',
      title: 'Lizibil, cu sursa scrisă',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Opt puncte',
          text: 'Redactarea se dă numai dacă ai minimumul de cuvinte și ai dezvoltat subiectul. Intră paragrafele, coerența, vocabularul, gramatica, claritatea, ortografia, punctuația și lizibilitatea.'
        }
      ],
      theory: [
        'Dacă nu se citește scrisul de mână, punctul de lizibilitate cade. Textul cules se citește mai ușor, dar tot trebuie verificată ortografia. Forma greșită o obținut se îndreaptă în a obținut.',
        'Fapte din articolul Biancăi Pădurean: în 1593, Mihai Viteazul cumpără tronul cu 400.000 de florini. O parte era împrumutată de la zarafii din Constantinopol. După înscăunare, creditorii se mută la București.',
        'În 1594 aderă la Liga Sfântă și poruncește să fie uciși creditorii, între ei și câțiva ieniceri. Fapta este o declarație de război față de Imperiul Otoman. Călugăreni și octombrie 1595 stau în lecția despre colier.',
        'Pentru Unirea din 1600, articolul Biancăi Ioniță dă 27 mai 1600, ziua în care Mihai Viteazul a devenit voievodul tuturor românilor.',
        'Bibliografia: nume, prenume, titlu, ediție, editură, an, pagini. Model: Djuvara, Neagu, O scurtă istorie a românilor povestită celor tineri, ediția a IV-a revăzută, Humanitas, 2002, pp. 114-115.',
        'Pentru un site: autor, titlu, adresă. La o prezentare, ultimul diapozitiv este bibliografia. Fontul se citește de la distanță.',
        'Opinia despre calculator, 150–300 de cuvinte, are două argumente, experiența ta, conectori și concluzie. Un avantaj: se caută o greșeală de literă înainte de predare. Un dezavantaj: bateria se termină, iar copia fără sursă nu este a ta.',
        'Cele opt rubrici cad dacă textul este sub minim sau dacă subiectul nu este dezvoltat. Un titlu nu înlocuiește paragrafele și nici sursa scrisă la final.'
      ].join('\n\n'),
      example: [
        'A obținut, nu o obținut. 1593: 400.000 de florini. 1594: Liga Sfântă. 27 mai 1600: Mihai, voievod al tuturor românilor, pe articolul citat.',
        'Bibliografie: autor, titlu, ediție, editură, an, pagini. Lizibilitatea este un punct. Ortografia este alt punct. Ambele cer text dezvoltat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Intrare de site, piesele: autor, titlu, adresă. Dacă lipsește autorul, scrii instituția. Nu pui o adresă pe care nu ai deschis-o.'
        }
      ],
      tryThis: 'Corectează o obținut. Notează 1593, suma, 1594 și 27 mai 1600, fiecare cu faptul lui. Scrie o intrare de bibliografie pe modelul Djuvara. Spune cele opt rubrici și condiția minimului de cuvinte.',
      keyPoints: [
        'Se scrie a obținut. În 1593, tronul costă 400.000 de florini. În 1594, Mihai rupe legătura cu creditorii.',
        'Pe 27 mai 1600, sursa îl dă voievod al tuturor românilor.',
        'Bibliografia are autor, titlu, ediție, editură, an și pagini. Lizibilitatea cere text dezvoltat.'
      ]
    }),
    lesson({
      id: 'fonetica-en',
      title: 'Sunetul, nu litera',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei grupuri',
          text: 'Diftongul este o vocală și o semivocală în aceeași silabă. Triftongul are o vocală și două semivocale. Hiatul este două vocale în silabe vecine.'
        }
      ],
      theory: [
        'Grila de fonetică este în fiecare lucrare: diftong, hiat, silabe sau accent, câte 2 puncte. Se alege o singură variantă.',
        'Gheață are 6 litere și 4 sunete: gh este un sunet, ea este un sunet, apoi ț și ă. Ghiocel are 7 litere și 6 sunete: în ghi și în ce, i și e sunt vocale, iar h nu notează un sunet.',
        'Două consoane între vocale se despart: ful-ger. Excepție: dacă prima este b, c, d, f, g, h, p, t sau v, iar a doua este l sau r, ambele trec în silaba următoare: ca-blu.',
        'Trei consoane se despart după prima. Excepție, între a doua și a treia, în grupuri ca lpt, mpt, ncț, rct: sculp-tu-ră. X notează ks în lexic și gz în examen.',
        'Sunetul î se scrie î sau â după loc: începe, românesc. Accentul corect este profesor, pe e, și butelie, pe i. La polip sunt admise ambele.',
        'Forme: descalifica, nu dezcalifica. Dezăpezi, nu deszăpezi. Cheamă, nu chiamă. Gheață, nu ghiață. Sculptură, nu scluptură. Preîntâmpina, nu preântâmpina.',
        'Véselă, accent pe primul e, este vasul. Vesélă, pe al doilea e, este cea bine dispusă. Acéle sunt cele de acolo. Acelé sunt acele de cusut. Háină este haina. Haínă este cea rea.',
        'Despărțiri: foș-net, bo-re-al, pro-pri-e-tar, a-van-ta-je, bo-ie-ri-me, u-nel-tea. Ceață: 5 litere, 4 sunete. Ger: 3 litere, 2 sunete. Chiar: 5 litere, 3 sunete. Cheag: 5 litere, 3 sunete.',
        'Prestigiului are 12 litere și 11 sunete. Externă are 7 litere și 8 sunete, pentru că x este ks. Veghea are diftongul ea, nu triftong. Gloriosul are hiat, i-o.',
        'În fragmentul de istorie, diftongi clari: dintâi, sprijinea, neamul, uneltea. Hiaturi clare: inițial, coaliții, antiotomane, plieze. Semivocala o stă în oa, ca în moartea. Vocala o stă în domni.'
      ].join('\n\n'),
      example: [
        'Gheață: 6 litere, 4 sunete. Ghiocel: 7 și 6. Chiar: 5 și 3. Externă: 7 și 8. Prestigiului: 12 și 11.',
        'Cheamă, gheață, sculptură, preîntâmpina, descalifica, dezăpezi. Profesor se accentuează pe e. Veselă, vasul, are accentul pe prima e. Haínă este cea rea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Boierime se desparte bo-ie-ri-me, cu hiat între i și e. Uneltea se desparte u-nel-tea, cu diftongul ea la final. Nu le trata la fel.'
        }
      ],
      practice: [
        '1) Spune câte litere și câte sunete are gheață.',
        '2) Spune câte sunete are externă și de ce sunt mai multe decât literele.',
        '3) Alege forma corectă: cheamă sau chiamă. Sculptură sau scluptură.',
        '4) Desparte boierime și spune dacă are hiat.'
      ].join('\n\n'),
      answers: [
        '6 litere și 4 sunete',
        '8 sunete, pentru că x notează ks',
        'cheamă; sculptură',
        'bo-ie-ri-me; da, hiat'
      ],
      mistakes: 'Ghiață și chiamă nu sunt formele corecte. Veghea nu este triftong. Numărul de litere nu este numărul de sunete.',
      tryThis: 'Desparte fulger, cablu, sculptură, foșnet și avantaje. Deosebește véselă de vesélă și háină de haínă. Spune accentul lui profesor și al lui butelie.',
      keyPoints: [
        'Diftongul stă într-o silabă. Hiatul desparte vocalele. Gheață are 6 litere și 4 sunete.',
        'Chiar are 3 sunete. Externă are 8. Prestigiului are 11.',
        'Se scrie cheamă, gheață, sculptură, preîntâmpina. Boierime se desparte bo-ie-ri-me.'
      ]
    }),
    lesson({
      id: 'cuvinte-straine',
      title: 'Cratima doar când sunetul nu coincide',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Cratima',
          text: 'Articolul se lipește fără cratimă dacă litera finală se aude ca în română: jobul, stafful, trendul. Cu cratimă, dacă nu se aude așa: show-ul, derby-ul.'
        }
      ],
      theory: [
        'Cuvintele străine nu urmează mereu regula românească. Haendel se citește hendăl. Racine se citește rasin. Shakespeare se citește șeicspir. Marrakech se citește Marakeș. Weekend se citește uichend. Hobby se citește hobi.',
        'Numele de locuri cunoscute au formă de origine și formă românească: London și Londra, Wien și Viena. La fel Augustus și August. Sunt acceptate derbi și derby. Rugby se citește ragbi.',
        'Forme: stres, nu stress. Bleu, nu bleo. Design, nu disain. Babysitter, nu beibisiter. Blues, nu bluz. Discount, nu discaunt. Lady, nu leidi.',
        'Talk-show-ul, cu cratimă înainte de ul. Derby-ul, cu cratimă, pentru că y nu se citește ca o literă românească finală. Nisa, nu Nice. Turnul Eiffel, cu i, nu Effel.',
        'E-mail se citește imeil. Marker se citește marcăr. Tester se citește testăr. Camping se citește kemping, cu c din casă, nu chemping.',
        'Stewardesă pentru stiuardesă, link pentru linc, rocker pentru rochăr. Show-ul, nu showul. Trendul, nu trend-ul, pentru că d se aude.',
        'Pentru Molière, Dickens și Chicago, pronunțarea se verifică în DOOM3. Nu se inventează. Într-o compunere, numele străine se scriu în forma învățată aici.'
      ].join('\n\n'),
      example: [
        'Jobul, stafful și trendul stau fără cratimă. Show-ul, derby-ul și talk-show-ul stau cu cratimă.',
        'Nisa, nu Nice. Eiffel, nu Effel. E-mail este imeil. Shakespeare este șeicspir. Weekend este uichend. Camping este kemping.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Link se scrie link și se citește linc. Rocker se citește rochăr. Dacă scrii rochăr în compunere, ai pus pronunțarea în locul formei. Forma este rocker.'
        }
      ],
      practice: [
        '1) Alege: jobul sau job-ul. Show-ul sau showul. Trendul sau trend-ul.',
        '2) Spune pronunțarea lui e-mail, weekend și Shakespeare.',
        '3) Alege forma: Nisa sau Nice. Eiffel sau Effel.',
        '4) Cum se citește camping: kemping sau chemping?'
      ].join('\n\n'),
      answers: [
        'jobul; show-ul; trendul',
        'imeil; uichend; șeicspir',
        'Nisa; Eiffel',
        'kemping'
      ],
      mistakes: 'Cratima nu se pune la tot ce sună străin. Se pune când litera finală nu se aude ca în română. Design nu se scrie disain.',
      tryThis: 'Notează hendăl, rasin, Marakeș și hobi. Corectează showul, trend-ul, stress și bleo. Spune că Molière, Dickens și Chicago se verifică în DOOM3.',
      keyPoints: [
        'Fără cratimă, dacă litera finală se aude: jobul, stafful, trendul. Cu cratimă: show-ul, derby-ul.',
        'Nisa și Eiffel sunt formele de aici. E-mail se citește imeil. Shakespeare se citește șeicspir.',
        'Ce nu este transcris în lecție se verifică în DOOM3.'
      ]
    }),
    lesson({
      id: 'derivare-compunere',
      title: 'Prefix, sufix sau două cuvinte',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Două procedee',
          text: 'Derivarea adaugă prefix, sufix sau pe ambele. Compunerea lipește două sau mai multe cuvinte. Sensul nou nu este suma simplă.'
        }
      ],
      theory: [
        'Sufixul stă la final: școlar, muncitor, fetiță, românesc, bărbătește. Prefixul stă la început: a împacheta, a desprinde, a reciti, neatent.',
        'A îngălbeni vine din galben, cu prefixul în- și cu sufixul -i. Dacă prefixul în- stă înaintea unui n, n-ul se dublează: a înnopta, a înnegri, a înnoda, s-au înnoit.',
        'Compunerea prin alăturare: Cluj-Napoca, câine-lup, cândva. Prin subordonare: floare-de-colț, bunăvoință, nou-născut. Prin abreviere: UE, UNESCO.',
        'Compusele nu se scriu întotdeauna cu cratimă. Hipertensiune nu este compus din două cuvinte de pe stradă. Este un termen cu prefixul hiper-. Floral, în florărie, vine din franțuzescul floral. Nu se analizează ca derivat românesc.',
        'Forme: bărbătește, derivare. Câine-lup, alăturare. Cândva, compunere. Cenușiu, tineret, învățăcel, derivare. Floare-de-leac, subordonare. Român-francez, alăturare.',
        'Se scrie înotător, nu înnotător. Înnoda, nu înoda. Curtea de Argeș, fără cratimă. Împacheta, nu înpacheta. Gura-leului, cu cratime, când este planta. Baia Mare, fără cratimă.',
        'Nou-născuții, nu Noi-născuții. S-au înnoit, nu s-au înoit. Pluralul este câini-lup. S-au despărțit înainte, nu înnainte. Bineînțeles și cumsecade stau într-un cuvânt. Mai-mult-ca-perfect are cratime.',
        'Războinic este derivat cu sufixul -nic. Îngenunchea este derivat cu prefix. Sufixul stă la final: adevărat. A înnegri are și prefix, și sufix: adevărat.'
      ].join('\n\n'),
      example: [
        'A îngălbeni: prefix și sufix, de la galben. A înnopta: n dublu. Floral: împrumut, nu derivat românesc.',
        'Câine-lup: alăturare. Floare-de-leac: subordonare. Înotător, înnoda, împacheta, Baia Mare, gura-leului, bineînțeles, mai-mult-ca-perfect.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Curtea de Argeș și Baia Mare stau fără cratimă. Gura-leului, planta, are cratime. Nu pune cratimă la orice nume de loc doar pentru că unele compuse o au.'
        }
      ],
      practice: [
        '1) Spune procedeul pentru bărbătește, câine-lup și floare-de-leac.',
        '2) Adevărat sau fals: compusele se scriu întotdeauna cu cratimă. Hipertensiune este compus din două cuvinte românești.',
        '3) Alege: înnoda sau înoda. Înotător sau înnotător.',
        '4) De ce floral nu se analizează ca derivat românesc?'
      ].join('\n\n'),
      answers: [
        'derivare; compunere prin alăturare; compunere prin subordonare',
        'fals; fals',
        'înnoda; înotător',
        'vine din franțuzescul floral, este împrumut'
      ],
      mistakes: 'În- dinaintea lui n dublează n: înnoda, înnoit. Înotător nu dublează n. Noi-născuții nu este forma corectă.',
      tryThis: 'Corectează Bine înțeles, mai mult ca perfect și cum se cade. Spune pluralul lui câine-lup. Alege scrierea pentru Curtea de Argeș și pentru planta gura-leului.',
      keyPoints: [
        'Derivarea adaugă prefix sau sufix. Compunerea lipește cuvinte. Nu toate compusele au cratimă.',
        'În- dinaintea lui n dublează n: înnoda, înnegri. Floral este împrumut.',
        'Baia Mare stă fără cratimă. Gura-leului, planta, are cratime. Bineînțeles stă într-un cuvânt.'
      ]
    }),
    lesson({
      id: 'conversiune',
      title: 'Aceeași formă, altă parte de vorbire',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Conversiune',
          text: 'Se naște un cuvânt nou prin schimbarea părții de vorbire, după context, fără prefix și fără sufix.'
        }
      ],
      theory: [
        'Participiul și gerunziul devin adjective: cărțile citite, mâinile tremurânde, copacul înflorit. Participiul și supinul devin substantive: rănitul, mersul.',
        'Adjectivul articulat devine substantiv: tânărul, frumosul, bătrânii. Adverbul articulat devine substantiv: binele, eul. Adjectivul devine adverb: scrie frumos. Adverbul devine adjectiv: un bărbat bine.',
        'Substantivul devine adverb: iarna merg, vineri plec, lucrez duminica. În copacul a înflorit, înflorit este verb. În copacul înflorit, este adjectiv.',
        'Frumosul copil: adjectiv. Frumosul a venit la bal: substantiv. Aproapele tău este substantiv, nu adverb. Ziua este luminoasă: ziua este subiect, nu adverb.',
        'Iarna merg la munte: adverb din substantiv. Era un domn bine: adjectiv din adverb. Tinerii sunt creativi: substantiv din adjectiv. Ahul este substantiv, nu interjecția ah.',
        'Duminica este zi de odihnă: substantiv. Lucrez duminica: adverb. Din familia lui om fac parte omenie, a omeni și omuleț. Uman și umanitate vin din latinescul pentru om, nu din om.',
        'Decât este compus. Împărăția și puternic sunt derivate. Câteodată este compus. În dreapta și în stânga, dreapta și stânga sunt substantive din adjective.',
        'Cuvântul conversiune mai înseamnă și preschimbarea unei valori, mai ales bănești. La gramatică, sensul este schimbarea părții de vorbire. Metoda se aplică pe cuvântul din frază.'
      ].join('\n\n'),
      example: [
        'Compus, lângă cântec, este adjectiv din participiu. Tremurânde este adjectiv din gerunziu. Optul este substantiv din numeral. Binele este substantiv din adverb.',
        'Iarna, lângă merg, este adverb din substantiv. Frumosul copil este adjectiv. Frumosul a venit este substantiv. Omenie, a omeni și omuleț sunt din familia lui om. Uman nu este.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Eu pronume: eu citesc. Eu substantiv: eul din oglindă. Bine adverb: scrie bine. Bine substantiv: binele făcut. Aceeași formă, altă clasă, fără afix.'
        }
      ],
      practice: [
        '1) Ce este tremurânde în mâinile tremurânde și din ce provine?',
        '2) Frumosul copil este adjectiv sau substantiv? Frumosul a venit?',
        '3) Ce este iarna în Iarna merg la munte?',
        '4) Fac parte omenie și uman din familia lui om?'
      ].join('\n\n'),
      answers: [
        'adjectiv, din gerunziu',
        'adjectiv; substantiv',
        'adverb, din substantiv',
        'omenie da, uman nu'
      ],
      mistakes: 'Aproapele nu este adverb. Ziua este luminoasă nu conține un adverb din substantiv. Uman nu se analizează ca derivat din om.',
      tryThis: 'Construiește duminica adverb și duminica substantiv. Spune că împărăția este derivat, iar decât este compus. Alege seria din familia lui om.',
      keyPoints: [
        'Conversiunea schimbă partea de vorbire, fără afix. Citite și tremurânde sunt adjective.',
        'Iarna și vineri, lângă verb, sunt adverbe. Un domn bine are adjectiv din adverb.',
        'Din om vin omenie, a omeni și omuleț. Uman nu vine din om. Decât este compus.'
      ]
    }),
    lesson({
      id: 'imprumuturi',
      title: 'Cuvântul vine din altă limbă',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Împrumut',
          text: 'Cuvântul intră din altă limbă. Nu se confundă cu derivatul și cu compusul, care se fac în română. Originea se verifică în dicționar.'
        }
      ],
      theory: [
        'Împrumuturi vechi: din slavă, strană și vesel. Din maghiară, chip și belșug. Din turcă, caraghios și catifea. Din greacă, dichisi și plictisi.',
        'Recente: din franceză, meniu și montaj. Din engleză, show și fan. Din italiană, basorelief și solfegiu. Din germană, crenvurst și boiler. Din rusă, agregat. Din spaniolă, fiesta. Din latina savantă, literă și veteran.',
        'Mouse și blog sunt din engleză. Adagio și mezzosoprană sunt din italiană. Detaliat este făcut în română, de la detaliu, iar detaliu este împrumutul. Cneaz, drag și plug sunt din slavă, nu din maghiară.',
        'Perechi: lacom, despre mâncare, și avid, despre dorința de a obține. Aspru și sever. Fățarnic și ipocrit. A hotărât și a decis. Deștept și inteligent. A îmbunătățit și a ameliorat. S-a adeverit și s-a confirmat.',
        'Pentru un secol al XVII-lea stau hatman, dușman, mărturie și vină. Pentru secolul al XX-lea stau comandant, adversar, depoziție și culpă.',
        'Efemer înseamnă trecător. Indubitabil înseamnă neîndoielnic. Insolit înseamnă neobișnuit. Pietate înseamnă evlavie. Comprehensiune înseamnă înțelegere.',
        'Meniu este împrumut. Floricică este derivat. Bunăvoință este compus. În 1931, un articol despre teatru folosește contingent cu sensul de ceea ce ține de împrejurarea de acum. Articolul nu se lipește.',
        'Într-o descriere de oraș, împrumuturile recente se folosesc cu sensul lor, nu ca podoabă. Versurile unei comedii nu se copiază.'
      ].join('\n\n'),
      example: [
        'Mouse, engleză. Adagio, italiană. Cneaz, drag, plug, slavă. Lacom despre mâncare, avid despre dorință.',
        'Secolul al XVII-lea: hatman și vină. Secolul al XX-lea: comandant și culpă. Efemer înseamnă trecător. Insolit înseamnă neobișnuit.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A decis nu înlocuiește a hotărât în orice frază, dar este sinonimul recent din pereche. Avid nu descrie foamea de la masă. Descrie dorința de a obține.'
        }
      ],
      practice: [
        '1) Din ce limbă sunt blog, mezzosoprană și cneaz?',
        '2) Ce sinonim recent stă lângă lacom și care este diferența?',
        '3) Dă sinonimul pentru efemer și pentru insolit.',
        '4) Meniu, floricică și bunăvoință: împrumut, derivat sau compus?'
      ].join('\n\n'),
      answers: [
        'engleză; italiană; slavă',
        'avid; lacom ține de mâncare, avid de dorința de a obține',
        'trecător; neobișnuit',
        'împrumut; derivat; compus'
      ],
      mistakes: 'Cneaz nu este din maghiară. Detaliat nu este împrumutul: detaliu este. Avid nu este totuna cu lacomul de mâncare.',
      tryThis: 'Alege seria de secol XVII și seria de secol XX din lecție. Spune sinonimele pentru indubitabil, pietate și comprehensiune.',
      keyPoints: [
        'Împrumutul intră din altă limbă. Derivarea și compunerea se fac în română.',
        'Blog este englez. Mezzosoprană este italiană. Cneaz, drag și plug sunt slave.',
        'Efemer înseamnă trecător. Insolit înseamnă neobișnuit. Hatman ține de registrul vechi, comandant de cel nou.'
      ]
    }),
    lesson({
      id: 'erou-recenzie',
      title: 'Trei sensuri și o prezentare scurtă',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei sensuri',
          text: 'Erou este omul curajos sau ostașul căzut, personajul principal și, în mit, semizeul. Recenzia este o prezentare scurtă, cu titlu, autor și o părere.'
        }
      ],
      theory: [
        'Sărbătoarea și specia recenziei nu sunt item de examen. Rămân opinia cu un fapt și asocierea cu un text literar, cu titlu și autor.',
        'Ziua Eroilor, în România, se ține de Înălțarea Domnului. Textul spune că România a fost prima țară care îi pomenește în aceeași zi pe eroii străini și pe cei români.',
        'Data ține de obligația din Tratatul de la Versailles: statele îngrijesc mormintele ostașilor îngropați la ele. În biserici se face pomenirea. Programul îl elaborează Oficiul Național pentru Cultul Eroilor. Este sărbătoare națională.',
        'Pe text, nu rezultă că alte țări țin aceeași sărbătoare la aceeași dată. Tratatul obligă la îngrijirea mormintelor.',
        'Faptele din recenzia de lectură, fără citate. Cititoarea este la volumul al doilea din Stăpânul Inelelor, de J.R.R. Tolkien. La o aniversare, Bilbo dispare și îi lasă lui Frodo un inel. Frodo pleacă să îl ducă într-un loc sigur, cu Sam și cu alți tovarăși. Descrierile sunt multe. Recenzia spune că, citite cu răbdare, își au rostul.',
        'În jurnal, elevul a văzut ultimul film. Éowyn își ascunde identitatea și se îmbracă în cavaler ca să ajungă pe câmp. Stăpânul acela se crede în siguranță pentru că socotește că niciun bărbat nu îl poate înfrunta. Ea își spune neamul și îl apără pe stăpânul de același sânge.',
        'În carte, lupta are o antiteză: umbra grea dispare și rămâne lumina. În film, dialogul este scurtat, iar această antiteză nu apare. Trăsături: curajul, pentru că nu se dă înapoi, și loialitatea, pentru că îl apără.',
        'Elementul comun: ambele vorbesc despre aceeași carte și despre un amănunt pe care graba îl pierde. Deosebirea: una prezintă începutul drumului, cealaltă o luptă din final. O recenzie a ta are titlul, autorul, o scenă citită și o părere. Dacă nu ai citit volumul, nu inventa scena.'
      ].join('\n\n'),
      example: [
        'Ostașul căzut este erou în primul sens. Frodo este erou pentru că este personajul principal. Semizeul este eroul din mit.',
        'Ziua Eroilor cade de Înălțarea Domnului. Éowyn își ascunde identitatea ca să lupte. Antiteza umbră-lumină este în carte. În film, lecția spune că lipsește.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Element comun, peste 30 de cuvinte: recenzia și jurnalul vorbesc despre același drum al inelului și despre ce se pierde când te grăbești. Recenzia stă la început, cu inelul lăsat lui Frodo. Jurnalul stă la o luptă din final. Deosebirea este locul din poveste, nu valoarea curajului.'
        }
      ],
      tryThis: 'Scrie trei enunțuri, cu cele trei sensuri ale lui erou. Spune data comemorării și instituția care face programul. Spune de ce Éowyn își ascunde identitatea și două trăsături, fiecare cu fapta ei. În cel puțin 30 de cuvinte, dă elementul comun și o diferență între recenzie și jurnal.',
      keyPoints: [
        'Erou înseamnă om curajos, personaj principal sau semizeu. Ziua Eroilor este de Înălțarea Domnului.',
        'Programul este al Oficiului Național pentru Cultul Eroilor. Bilbo îi lasă lui Frodo inelul.',
        'Éowyn se preface cavaler ca să ajungă în luptă. În carte, umbra și lumina se opun. În film, opoziția lipsește.'
      ]
    }),
    lesson({
      id: 'recap-modele',
      title: 'O frază, o figură, o formă',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Pe caiet',
          text: 'Recapitularea se face pe frazele Marei, nu pe foaia cu puncte. Versurile și replicile nu se copiază.'
        }
      ],
      theory: [
        'Sâmbătă, Mara scrie: Lancea eroului ajungea la nori, iar valea vuia sub vânt. Ziua era liniște, noaptea era vacarm. Iarna citește bine. Binele făcut rămâne.',
        'Lancea ajungea la nori este hiperbolă. Valea vuia sub vânt este aliterație. Ziua și noaptea sunt antiteză.',
        'Iarna, lângă citește, este adverb, deci conversiune din substantiv. Binele este substantiv, conversiune din adverb.',
        'Jobul ei este să noteze trei forme străine: show-ul, weekend și design. Show-ul are cratimă. Weekend se citește uichend. Design nu se scrie disain.',
        'Ștefan, la Putna, rămâne textul de rezervă: elogiu, 15/27 august 1871, vocativ, catren, rimă încrucișată. Sinan rămâne pentru caracterizare: orfan, mărgele, vizir, fără urmași.',
        'Opinia de 50–100 de cuvinte nu cere conectori. Compunerea argumentativă de 150 de cuvinte îi cere. O formă străină se verifică înainte de predare.',
        'La caracterizare numești patru trăsături și dezvolți două, pe fapte, în cel puțin 150 de cuvinte. La figuri transcrii modelul și scrii numele.',
        'Registrul compunerii rămâne îngrijit. Iarna de lângă un verb nu se tratează ca substantiv. Show-ul fără cratimă nu este forma din lecție.',
        'Asocierea cere o valoare și un text studiat, în două rânduri. Versul nu se lipește ca dovadă. Pe caiet rămân fraza, numele figurii și forma îngrijită, verificate înainte de predare. Mara le strânge în același loc.'
      ].join('\n\n'),
      example: [
        'Ce scrie: Mara notează o hiperbolă, o aliterație, o antiteză, două conversiuni și trei forme străine.',
        'Ce vezi: o văd cu caietul deschis, iar lancea desenată de ea trece de nor. Eu aș sublinia cratima din show-ul, pentru că fără cratimă forma nu este cea din lecție. Uichend este pronunțarea lui weekend.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Iarna citește: iarna este adverb. Iarna este lungă: iarna este substantiv. Aceeași formă își schimbă clasa după funcție. Asta este conversiunea, fără prefix și fără sufix.'
        }
      ],
      tryThis: 'Transcrie hiperbola, aliterația și antiteza și numește-le. Spune ce este iarna lângă citește și ce este binele. Scrie corect show-ul, weekend și design. Notează data de la Putna și faptul că Sinan nu a lăsat urmași.',
      keyPoints: [
        'Hiperbola mărește, aliterația repetă un sunet, antiteza opune.',
        'Iarna lângă verb este adverb. Binele este substantiv. Show-ul are cratimă. Weekend se citește uichend.',
        'Putna, 15/27 august 1871, este elogiul lui Ștefan. Sinan nu a lăsat urmași.'
      ]
    })
  ]
};
