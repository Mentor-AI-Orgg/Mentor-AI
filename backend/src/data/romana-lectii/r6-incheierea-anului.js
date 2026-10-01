'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f){return romanaLesson(f);}

module.exports = {
  id: 'incheierea-anului',
  title: 'Încheierea anului',
  inOwnWords: 'Încheierea anului reia, pe scene scrise aici, narațiunea, descrierea, dialogul, sunetele, sensurile și propoziția. Lista de lectură închide anul. Textele de pe foaia de examen rămân la școală. Grilele de punctaj nu sunt lecții.',
  toc: [
    'O dimineață de recapitulare',
    'Sunete și sensuri',
    'Grădina, în cuvintele tale',
    'Ce citești vara'
  ],
  glossary: [
    {
      term: 'tablou',
      meaning: 'Descriere a unui loc, nu a unei persoane.'
    },
    {
      term: 'omonim',
      meaning: 'Același șir de sunete, cu sensuri care nu se leagă între ele.'
    }
  ],
  lessons: [
    lesson({
      id: 'dimineata-recap',
      title: 'Pașii pe o scenă nouă',
      kind: 'recapitulare',
      boxes: [{
        type: 'regula',
        title: 'Trei mișcări',
        text: 'Pe o întâmplare întreagă notezi faptele, apoi imaginea, apoi fapta ta. Fapta ta se prinde cu pentru că.'
      }],
      theory: [
        'Anul se închide cu aceeași metodă, pe o întâmplare completă. La clasă, bucata deschisă poate purta alt titlu. Scena de aici e făcută pentru exercițiu.',
        'Unele recapitulări pleacă din Trenul către Locurile imposibile, cartea lui P. G. Bell. Fragmentul se citește la clasă. La noi, casa și zgomotul sunt altele.',
        'Noaptea de miercuri, pe la ora două, Ana se trezește în casa de la țară. Pe uliță nu trece nimeni. Din bucătărie urcă un zgomot metalic. O cuprinde teama.',
        'Coboară treptele și dă peste două șine lucioase, pe podea. Strigă: Mamă, tu ești? Din cămară răspunde un glas. El se află acolo și a adus macheta trenului.',
        'Povestitorul nu folosește eu pentru sine, deci naratorul stă la persoana a III-a. Timpul e noaptea de miercuri, pe la două. Locurile sunt ulița, podeaua, bucătăria, cămara și casa de la țară.',
        'Trezirea este expozițiunea. Zgomotul metalic este intriga. Șinele lucioase sunt momentul culminant. Glasul din cămară este deznodământul.',
        'Teama se naște din metalul auzit. Ușurarea vine când răspunsul din cămară se aude. Ulița pustie ține de descriere. Coborârea ține de narațiune. Replicile țin de dialog.',
        'Vorbirea indirectă mută replica în povestire. Ana a întrebat dacă în casă se află mama. Glasul a lămurit că tot el e acolo și că macheta trenului îi aparține.',
        'Metoda are trei mișcări. Notezi ce stă scris, fără o a doua întâmplare. Imaginea începe cu o văd. La urmă spui ce ai fi făcut și legi alegerea prin pentru că, cu un motiv din scenă.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: noaptea, Ana coboară spre un zgomot metalic, găsește șine pe podea, iar cineva din cămară spune că a adus o machetă.',
        'Ce văd: o văd desculță, oprită în hol, cu ochii pe luciul șinelor. Eu aș fi rămas pe scară și aș fi strigat din nou, pentru că metalul suna în întuneric.',
        'Povestitorul stă la persoana a III-a. Teama pornește de la zgomot. Ușurarea vine odată cu glasul.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Replica Eu am adus macheta ar rămâne vorbire directă. Indirect, verbul de spus intră înainte: a lămurit că a adus macheta. Descrierea stă pe ulița pustie, narațiunea pe coborâre, dialogul pe cele două glasuri.'
      }],
      tryThis: [
        'Pe întâmplarea Anei scrie trei enunțuri: ce stă scris, ce imagine vezi și ce ai fi făcut, cu pentru că. Imaginea începe cu o văd.',
        'Numește un reper de timp, un reper de loc, felul naratorului și emoția stârnită de zgomot. Arată bucata de descriere, bucata de narațiune și bucata de dialog.',
        'Treci la vorbire indirectă strigătul Mamă, tu ești? Păstrează faptele din scenă și nu adăuga un tren care nu este pe podea.'
      ].join('\n\n'),
      keyPoints: [
        'Recapitularea cere trei mișcări: faptele din scenă, imaginea cu o văd și fapta ta, prinse prin pentru că.',
        'Naratorul rămâne la persoana a III-a, iar momentele urcă de la trezire până la glasul din cămară.',
        'Teama se sprijină pe zgomotul metalic, iar ușurarea se sprijină pe răspunsul auzit din cămară.'
      ]
    }),
    lesson({
      id: 'sunete-sensuri',
      title: 'Litere, sunete și înțeles',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Sunet și sens',
        text: 'Literele se văd, sunetele se aud. Diftongul și triftongul se aud o dată. Hiatul se aude de două ori. Sensul se alege din enunț.'
      }],
      theory: [
        'Numărul literelor nu este mereu numărul sunetelor. Diftongul ține două vocale într-o silabă și contează un sunet. Triftongul ține trei vocale și tot un sunet dă. Hiatul le desparte în silabe, deci dă două sunete. Grupul ch se aude o dată.',
        'Teamă se scrie cu cinci semne: t, e, a, m și ă. Se aude în patru bucăți, fiindcă ea este diftong. Șine numără patru litere și tot atâtea sunete.',
        'Ochi se scrie o, c, h, i, dar se aude o, ch și i. Silabele lui sunt o-chi. La copii, cinci litere dau cinci sunete, fiindcă ii stă în hiat. Silabele sunt co-pi-i.',
        'La creioane, ioa este triftong. Din opt litere auzi șase: c, apoi r, e, ioa, n și e. Despărțirea este cre-ioa-ne.',
        'Sensul propriu și sensul figurat se citesc din enunț. Ulița era goală stă în sens propriu, fiindcă nu trecea nimeni. Gândul cufundat în teamă este figurat, fiindcă un gând nu stă în apă.',
        'Pentru teamă, sinonimul este frica, antonimul este curajul. Pentru goală, despre uliță, sinonimul este pustie, antonimul este plină.',
        'Omonimul repetă șirul de sunete, iar sensurile nu se leagă. Mai numește luna când merii înfloresc în luna mai. Mai este adverb când trenul aleargă mai repede spre gară.',
        'Vară numește anotimpul când mergi la bunici. Vară numește verișoara când Vara te vizitează sâmbăta. Dulce este polisemic: la ceai ține de gust, la amintire ține de o clipă dragă.',
        'La mână, locul bătăii schimbă rolul. În enunțul Mâna doare, cuvântul e substantiv și bătaia cade pe mâ. Când ciobanul mână oile către sat, cuvântul e verb și bătaia cade pe nă.'
      ].join('\n\n'),
      example: [
        'Teamă: cinci litere, patru sunete, diftongul ea. Ochi: patru litere, trei sunete, grupul ch. Copii: hiat și cinci sunete. Creioane: triftongul ioa și șase sunete.',
        'Ulița goală rămâne sens propriu. Gândul cufundat în teamă este figurat. Omonime sunt mai ca lună și mai ca adverb. Bătaia stă pe mâ la substantiv și pe nă la verb.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Vară, anotimpul, și vară, verișoara, repetă sunetele, dar sensurile nu se nasc unul din celălalt. Dulce la ceai și dulce la amintire rămân legate, deci e polisemie, nu omonimie. Șine nu pierde niciun sunet.'
      }],
      practice: [
        '1) Câte litere și câte sunete au teamă, ochi și creioane?',
        '2) Între teamă, copii și creioane, unde găsești diftongul, unde găsești hiatul și unde găsești triftongul?',
        '3) Pentru teamă, dă un cuvânt apropiat și un cuvânt opus. Construiește o propoziție în care mai este lună și alta în care mai este adverb.',
        '4) Construiește o propoziție în care dulce ține de gust și alta în care ține de o amintire. Arată silaba tare când mâna doare și când ciobanul mână oile.'
      ].join('\n\n'),
      answers: [
        'Teamă: cinci litere și patru sunete. Ochi: patru litere și trei sunete. Creioane: opt litere și șase sunete.',
        'Diftongul ea este în teamă. Hiatul ii este în copii. Triftongul ioa este în creioane.',
        'Sinonim: frică. Antonim: curaj. Lună: Merii înfloresc în luna mai. Adverb: Trenul aleargă mai repede spre gară.',
        'Gust: Ceaiul acesta este dulce. Amintire: Păstrez o amintire dulce de la bunici. La Mâna doare, accentul cade pe mâ. La verb, accentul cade pe nă.'
      ],
      mistakes: 'Nu lua hiatul drept un singur sunet și nu despica grupul ch. Mai nu e polisemic, dulce nu e omonim. La mână, bătaia nu stă pe aceeași silabă când cuvântul devine verb.',
      tryThis: 'Numără literele și sunetele la teamă, ochi și creioane. Arată diftongul, hiatul și triftongul. Dă apropiatul și opusul pentru teamă, apoi propoziții cu mai și cu dulce, și silaba tare.',
      keyPoints: [
        'Diftongul și triftongul se aud o dată, hiatul de două ori, iar ch o singură dată.',
        'La teamă sunetele sunt mai puține decât literele. La copii sunt egale. La creioane, ioa scoate două.',
        'Omonime rămân mai și vară. Polisemia stă la dulce. Accentul mută mână de la substantiv la verb.'
      ]
    }),
    lesson({
      id: 'compunere-gradina',
      title: 'Grădina bunicilor',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Tabloul scris de tine',
        text: 'Un tablou înfățișează un loc, nu chipul unui om. Compunerea cere patru elemente de peisaj, două figuri de stil și o emoție.'
      }],
      theory: [
        'Compunerea care închide anul este o descriere. Textul de pe bancă, la unii profesori, se numește În grădină și îl semnează Dimitrie Anghel. Este tablou, fiindcă arată un loc.',
        'Strofele lui Anghel nu se transcriu aici. La clasă, pe rândul deschis, numeri silabele, spui felul strofei și felul rimei, apoi cauți epitetul, apoi comparația, apoi personificarea și la urmă enumerația, ca la pastel.',
        'Compunerea ta mută grădina. Modelul scurt de mai jos rămâne doar o schemă. Cerința adună patru elemente de peisaj, o pereche de figuri de stil și emoția simțită în locul acela.',
        'În grădina bunicilor stau patru lucruri, spuse pe rând: teiul bătrân, apoi iarba moale, apoi banca de lemn, apoi lumina caldă. Acestea sunt piesele peisajului din model.',
        'Moale, lângă iarbă, lucrează ca epitet, fiindcă spune o însușire. Comparația apare când lumina caldă e pusă ca o lampă, fiindcă intră ca. Emoția aleasă în model este liniștea.',
        'Personificarea dă unei plante o faptă de om, de pildă teiul veghează peste bancă. Enumerația înșiră fără să explice: tei, iarbă, bancă, lumină. În textul tău alegi doar două figuri, nu toate patru.',
        'Un text de zece rânduri se poate deschide cu locul și cu ora. Apoi vin elementele, fiecare cu un detaliu văzut. Figurile stau în fraze, nu într-o listă goală. Emoția închide și se leagă de un element.',
        'Sub text scrii numele figurilor, ca să se vadă că le-ai ales tu. Grădina se poate schimba: un nuc, un gard, o fântână, un cuib. Teiul din model nu rămâne lângă lampa din model.',
        'La pastel ai învățat să numeri. Pe versul deschis la clasă repeți numărul de silabe, tipul de strofă și rima. În compunerea proprie nu numeri silabe, fiindcă scrii proză, nu strofă.',
        'Portretul ar fi înfățișat un om. Tabloul rămâne pe loc. De aceea textul lui Anghel se numește tablou, iar compunerea ta descrie grădina bunicilor cu vorbele tale.'
      ].join('\n\n'),
      example: [
        'În model, piesele sunt teiul, iarba, banca și lumina. Epitetul este moale. Comparația este ca o lampă. Emoția este liniștea.',
        'Textul lui Anghel este tablou, fiindcă arată un loc. Compunerea ta schimbă și locul, și figurile. Sub textul tău apar numele celor două figuri.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'O personificare de rezervă: banca așteaptă seara. O enumerație de rezervă: flori, pietre, umbră, apă. În textul tău lași doar două figuri și le numești dedesubt, lângă emoția aleasă.'
      }],
      tryThis: [
        'Scrie o descriere a grădinii bunicilor, de zece rânduri sau mai multe. Pune patru elemente de peisaj, o pereche de figuri, fiecare de alt fel, și emoția ta. Sub text, numește figurile.',
        'Lasă deoparte teiul și lampa din model. Încheie cu două lămuriri: textul lui Anghel este tablou, iar la clasă numeri silabele pe rândul deschis.'
      ].join('\n\n'),
      keyPoints: [
        'Compunerea de final descrie un loc: pui elemente de peisaj, două figuri și emoția ta.',
        'Poezia În grădină, semnată de Anghel, rămâne un tablou, fiindcă înfățișează locul.',
        'Grădina bunicilor se scrie cu vorbele tale, iar modelul cu lampa rămâne doar schemă.'
      ]
    }),
    lesson({
      id: 'lectura-vara',
      title: 'Ce iei cu tine vara',
      kind: 'lectura',
      boxes: [{
        type: 'regula',
        title: 'Două liste',
        text: 'Prima strânge operele din lecții. A doua e de vacanță și de clasa a VII-a. Tema are numele orizonturile lumii și ale cunoașterii.'
      }],
      theory: [
        'Anul lasă două liste de cărți. Poți alege și o carte neterminată, dacă spui ce vrei să descoperi.',
        'Prima listă strânge opere lucrate în lecții. Ion Creangă a scris Amintiri din copilărie. Anatole France a scris Cartea prietenului meu. Povestea Vrancei apare fără nume de autor.',
        'Constantin Chiriță a scris Cireșarii. Calistrat Hogaș a scris Amintiri dintr-o călătorie. Antoine de Saint-Exupéry a scris Micul prinț. Mark Twain a scris Prinț și cerșetor.',
        'Johanna Spyri a scris Heidi, fetița munților. Fabulele îi au pe Alecu Donici și pe La Fontaine. George Topîrceanu a scris Rapsodii de primăvară. Dimitrie Anghel a scris În grădină.',
        'Alexandru Vlahuță a scris România pitorească. George Șovu a scris Fascinații. Jules Verne a scris Douăzeci de mii de leghe sub mări.',
        'A doua listă e pentru vacanță, apoi și pentru clasa a VII-a. Tema care le strânge se numește orizonturile lumii și ale cunoașterii. Radu Tudoran a scris Toate pânzele sus.',
        'Grigore Băjenaru a scris Cișmigiu & Comp. Tot el a scris Bună dimineața, băieți! Marin Preda a scris Viața ca o pradă. Mihail Sadoveanu a scris Hanul Ancuței.',
        'Ion Minulescu a scris Corigent la limba română. Ioana Pârvulescu a scris Inocenții. Din poezii intră Mihai Eminescu și Nichita Stănescu. Alături stau Lucian Blaga și Magda Isanos.',
        'Vasile Alecsandri a scris Chirița în Iași. Intră și teatru semnat de Matei Vișniec. Fănuș Neagu a scris În văpaia lunii. Veronica D. Niculescu a scris O vară cu Isidor.',
        'Louis Sachar a scris Tabăra. Daniel Defoe a scris Robinson Crusoe. Jules Verne a scris și O călătorie spre centrul Pământului. Eric Linklater a scris Vântul din lună.',
        'Mimi Thebo a scris Ursoaica din vis. Lindsey Becker a scris Hoțul de stele. Laura Marx Fitzgerald a scris Theodora Tenpenny și tabloul pierdut. John Boyne a scris Băiatul cu pijamale în dungi.',
        'Lois Lowry a scris Darul lui Jonas. Alexandre Dumas a scris Cei trei muschetari. Alegi câte un titlu din fiecare listă. Spui motivul, locul lecturii și emoția.',
        'Dacă lectura nu e gata, notezi ce vrei să descoperi în fiecare carte. Răspunsul are șase rânduri sau opt. O frază luată de pe copertă nu se mută în textul tău.'
      ].join('\n\n'),
      example: [
        'Din prima listă iau Douăzeci de mii de leghe sub mări, fiindcă vreau submarinul Nautilus. Din lista de vacanță iau Robinson Crusoe, fiindcă vreau o insulă.',
        'Aș citi pe prispă, în vacanță. Curiozitatea este emoția pe care o aștept. Dacă lectura a rămas la jumătate, o spun și adaug ce vreau să aflu.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Din lecții poți lua Micul prinț, fiindcă vrei să vezi ce învață băiatul de la vulpe. Din vacanță poți lua Toate pânzele sus, fiindcă vrei o corabie. Locul poate fi hamacul. Emoția poate fi nerăbdarea. Dacă nu ai ajuns la final, scrii întrebarea cu care ai rămas.'
      }],
      tryThis: [
        'Din operele anului iei un titlu, din cărțile de vacanță iei altul. Pe șase rânduri, sau pe opt, scrii de ce, unde ai sta cu cartea și ce simți că te așteaptă.',
        'Pentru o carte nedusă la capăt, notezi descoperirea pe care o cauți. Coperta nu își mută fraza în răspunsul tău.'
      ].join('\n\n'),
      keyPoints: [
        'Anul lasă două liste: operele din lecții și cărțile de vacanță, împreună cu clasa a VII-a.',
        'Alegi câte un titlu și spui motivul, locul lecturii și emoția așteptată.',
        'O carte neterminată rămâne valabilă dacă scrii ce vrei să afli din ea.'
      ]
    })
  ]
};
