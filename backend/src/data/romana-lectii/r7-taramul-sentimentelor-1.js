'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = { lessons: [
  lesson({
    id: 'deschidere-sentimente',
    title: 'Harta emoțiilor',
    kind: 'comunicare',
    boxes: [{
      type: 'definitie',
      title: 'Harta unității',
      text: 'Drumul pornește de la emoție și ajunge la o tradiție. Codurile de pe hartă sunt douăsprezece. Grila cu puncte nu predă în locul lecției.'
    }],
    theory: [
      'Unitatea Tărâmul sentimentelor se deschide cu o hartă de lucru. Citești text liric și separi emoția care trece repede de sentimentul care durează.',
      'Apoi vin versul, strofa, rima și figurile de stil. Ca fapte, reții poezia Atât de fragedă, a lui Mihai Eminescu, și balada Nunta Zamfirei, a lui George Coșbuc.',
      'Strofele rămân în carte. La oral schimbi intonația, ca să se audă o emoție. Descrii întâi obiectiv, apoi subiectiv.',
      'La scris, textul se așază după situația de comunicare. Limbajul, părțile și scopul se potrivesc cu cine citește.',
      'Gramatica reia substantivul, cele cinci cazuri, prepoziția și adjectivul. La adjectiv urmărești gradele, topica și felul combinării.',
      'La interculturalitate afli ce sunt Sânzienele, ținute pe 24 iunie. Închiderea este lucrarea Lada cu sentimente și tradiții românești.',
      'Codurile sunt douăsprezece. Primele șase sunt 1.2, 1.4, 2.1, 2.3, 2.4 și 2.5. Următoarele șase sunt 3.1, 3.3, 4.1, 4.4, 4.5 și 5.1.',
      'Nici grila cu puncte, nici fișa de observare nu țin loc de lecție. Ele măsoară munca, nu predau conținutul.',
      'La clasă, poemul de pe bancă poate purta alt titlu. Ordinea de lucru nu se schimbă: citești, spui faptele, lași strofa netranscrisă.',
      'Harta nu îți dă un comentariu gata făcut. Îți arată unde stă fiecare temă, ca să o recunoști când apare într-un exercițiu.',
      'Atât de fragedă se reține ca poezie de iubire, cu vocea îndrăgostitului. Nunta Zamfirei se reține ca baladă de nuntă. În ambele spui autorul și tema.',
      'Când un exercițiu cere o competență, cauți codul și legi sarcina de el. Nu adăuga o a treisprezecea, fiindcă harta are douăsprezece.',
      'Lucrarea de la final leagă un sentiment de o tradiție românească. Sânzienele pot fi tradiția aleasă, dacă folosești data de 24 iunie și faptele pe care le ai.'
    ].join('\n\n'),
    example: [
      'Harta adună liricul, rima, figurile, tonul, descrierea, substantivul, adjectivul și sărbătoarea din 24 iunie.',
      'Sunt douăsprezece coduri, de la 1.2 până la 5.1. Balada lui Coșbuc se spune prin fapte, nu prin versuri copiate.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Dacă pe bancă stă alt titlu de poezie, pașii nu se schimbă: spui tema, vocea și o figură, fără să copiezi rândurile.'
    }],
    tryThis: [
      'Alcătuiește trei propoziții. Prima arată tema, emoția, și faptul că azi lucrezi un text liric.',
      'A doua enumeră codurile 1.2, 1.4, 2.1, 2.3, 2.4, 2.5, apoi 3.1, 3.3, 4.1, 4.4, 4.5 și 5.1, și spune că totalul este douăsprezece.',
      'A treia arată că grila cu puncte nu ține loc de lecție și că strofele rămân netranscrise.'
    ].join('\n\n'),
    keyPoints: [
      'Harta leagă liricul, versificația, figurile, balada, tonul, descrierea și gramatica.',
      'Codurile sunt douăsprezece, iar grila cu puncte nu predă.',
      'Strofele din Atât de fragedă și din Nunta Zamfirei nu se transcriu.'
    ]
  }),
  lesson({
    id: 'text-liric',
    title: 'Vocea care simte nu este autorul',
    kind: 'lectura',
    boxes: [{
      type: 'definitie',
      title: 'Text liric',
      text: 'Spune emoții, sentimente, gânduri, idei și aspirații dintr-o privire subiectivă. Vocea din text este ficțională și nu se confundă cu autorul.'
    }],
    theory: [
      'Privirea subiectivă stă la persoana întâi, una sau mai multe, când tonul este de mărturisire, și la persoana a doua. Lumea textului este inventată, ieșită din imaginația scriitorului.',
      'Poate vorbi îndrăgostitul, cel care contemplă natura, călătorul, copilul sau omul de geniu. Vocea există numai înăuntrul textului, nu în biografia autorului.',
      'O emoție ține puțin și își schimbă tăria. Lista: frica și bucuria, furia, tristețea, dezgustul, surpriza. Un sentiment rămâne: dragostea, afecțiunea, fericirea, ura, durerea.',
      'Anii lui Mihai Eminescu sunt 1850–1889. A scris poezie, proză și jurnalism. Debutul, la 16 ani, este poemul La mormântul lui Aron Pumnul.',
      'Revista Familia, sub Iosif Vulcan, i-a tipărit apoi De-aș avea. Cât a trăit, a scos doar volumul Poesii.',
      'Restul operei a stat în manuscris, până când criticul George Călinescu a scos-o la iveală. Temele, fără strofă, sunt istoria, cosmosul, filozofia, timpul, natura, iubirea și folclorul.',
      'Poemul Atât de fragedă ține de iubire. Vorbește îndrăgostitul, nu autorul. Se aude persoana întâi, iar ființa iubită este strigată la persoana a doua.',
      'Creștet numește vârful capului. Sintagma din creștet până în tălpi acoperă trupul întreg, de sus în jos. A spăși, forma de azi a ispăși, înseamnă suferința pentru o greșeală. Pururi înseamnă veșnic, totdeauna.',
      'Portretul scris de tine îți aparține. Nu este o copie. Tabloul Dans la țară, semnat de Auguste Renoir, se descrie numai când îl vezi. Nu născoci fețele.',
      'Scena de lucru înlocuiește poemul. Într-o seară de duminică stau la geam și o privesc pe o fată îmbrăcată în alb. Lampa dă lumină caldă. Mărturisesc că liniștea ei îmi este dragă.',
      'Bucuria este emoția scurtă. Dragostea este sentimentul care rămâne. Eu sunt vocea, îndrăgostitul din text, nu autorul lecției.',
      'Trei pași ies din scenă: ce este scris, ce observi, ce ai face tu, legate cu pentru că. Rândul cu ce observi începe prin O văd.',
      'Howard Gardner a descris opt feluri de inteligență. Clasa poate face echipe care lucrează același poem pe drumuri diferite. Nu devin opt lecții aparte.',
      'Întâi: lingvistică, logico-matematică, naturalistă, vizual-spațială. Apoi: corporal-chinestezică, muzical-ritmică, intrapersonală, interpersonală.'
    ].join('\n\n'),
    example: [
      'Ce scrie: seară de duminică, la geam, o fată în alb, iar eu spun că liniștea ei îmi este dragă. Ce vezi: O văd la geam, cu rochie albă.',
      'Aș ține lampa aprinsă, pentru că lumina e caldă și ea rămâne la geam. Vocea este a îndrăgostitului. Anii sunt 1850–1889.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Bucuria se stinge repede, ca o lumină aprinsă o clipă. Dragostea rămâne. Una este emoție, cealaltă este sentiment.'
    }],
    tryThis: [
      'Pe scena serii, fă trei rânduri: ce stă scris, ce observi și ce ai face, cu pentru că. Rândul din mijloc începe cu O văd.',
      'Arată persoana și ipostaza vocii, apoi de ce nu este autorul. Pune o emoție lângă un sentiment.',
      'Notează anii lui Eminescu, volumul din viață și o temă. Schițează, în 30–50 de cuvinte, un portret în care pui floarea, gestul și simbolul pe care le alegi. Enumeră cele opt inteligențe, fără să le prefaci în opt teme.'
    ].join('\n\n'),
    keyPoints: [
      'Liricul spune trăiri dintr-o privire subiectivă, iar vocea din text nu este autorul.',
      'Emoția trece. Sentimentul rămâne. Eminescu, între 1850 și 1889, a tipărit în viață doar Poesii.',
      'Cele opt inteligențe ale lui Gardner sunt căi pe același poem, nu opt lecții.'
    ]
  }),
  lesson({
    id: 'versificatie',
    title: 'Versul, măsura, strofa și rima',
    kind: 'lectura',
    boxes: [{
      type: 'regula',
      title: 'Numără, nu copia',
      text: 'Versul înseamnă un rând de poezie. Măsura numără silabele. Strofa le grupează. Rima apropie sunetele finale, de la ultima vocală accentuată.'
    }],
    theory: [
      'Versificația, zisă și prozodie, este meșteșugul prin care se construiesc versurile. Muzica lor iese din rând, din numărul de silabe, din strofă, din rimă și din ritm.',
      'Măsura scurtă înseamnă 5–6 silabe sau 7–8. Medie: 9–11. Lungă: 12–18. Între strofe rămâne un rând gol, numit blanc.',
      'Două rânduri fac un distih, trei o terțină, patru un catren, cinci un cvintet, șase o sextină.',
      'Tiparul abab este rimă încrucișată: rândul 1 cu 3, rândul 2 cu 4. Tiparul aabb este împerecheată. Tiparul aaaa este monorimă. Tiparul abba este îmbrățișată.',
      'Rima imperfectă ține vocalele accentuate și schimbă consoanele. Semirima, cu tiparul abcb, amestecă rânduri rimante și rânduri fără rimă.',
      'Ritmul înseamnă o succesiune regulată de silabe accentuate și neaccentuate. Versurile albe nu au nici rimă, nici ritm regulat.',
      'Modelul numărat aici este o propoziție de exercițiu, nu un citat. Roua urcă pe o frunză are opt silabe: rou-a, ur-că, pe, o, frun-ză. Măsura este scurtă.',
      'Într-un catren cu aceeași măsură și cu abab, finalul primului rând se aude cu al treilea, iar al doilea cu al patrulea. La clasă numeri rândul deschis după aceeași regulă.',
      'Nu stabilim aici silabele unui rând care nu este numărat în lecția aceasta. Bucata din Rochia, de Magda Isanos, este catren. Bucata din Mărțișor, de Ion Pillat, este și ea catren.',
      'Bucata din Terține, de George Topîrceanu, este terțină. La Atât de fragedă, Mihai Eminescu folosește rimă încrucișată: finalurile se aud din două în două.',
      'La Trecut-au anii, rima îmbrățișează. La Revedere, rima se împerechează. Aceste fapte se spun fără a transcrie strofele.'
    ].join('\n\n'),
    example: [
      'Roua urcă pe o frunză are 8 silabe, deci măsură scurtă. Un catren abab înseamnă rimă încrucișată.',
      'Rochia, ca și Mărțișor, este catren. Terține este terțină. La Trecut-au anii rima îmbrățișează. La Revedere rima se împerechează. Versurile albe rămân fără rimă.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Dacă două finaluri se aseamănă doar prin vocala accentuată, iar consoanele diferă, rima este imperfectă. Tiparul abcb este semirimă.'
    }],
    tryThis: [
      'Numără silabele din Roua urcă pe o frunză și arată că măsura este scurtă. Spune câte rânduri au distihul, terțina, catrenul, cvintetul și sextina.',
      'Lămurește tiparele abab, aabb, aaaa și abba. Compune un catren al tău, câte 8 silabe pe rând, cu rimă împerecheată, despre toamnă. Nu lua versuri din cărți.',
      'Ca fapte: Rochia este catren, Mărțișor este catren, Terține este terțină, Atât de fragedă încrucișează, Trecut-au anii îmbrățișează, Revedere împerechează.'
    ].join('\n\n'),
    keyPoints: [
      'Până la 8 silabe măsura este scurtă, între 9 și 11 este medie, între 12 și 18 este lungă.',
      'Catrenul are patru rânduri. abab încrucișează, aabb împerechează, abba îmbrățișează.',
      'Și Rochia, și Mărțișor sunt catrene. Terține este terțină. Versurile albe rămân nerimate.'
    ]
  }),
  lesson({
    id: 'figuri-stil',
    title: 'Epitetul, comparația, personificarea',
    kind: 'lectura',
    boxes: [{
      type: 'definitie',
      title: 'Figură de stil',
      text: 'Mută înțelesul de bază al unui cuvânt, ca imaginea să lovească mai tare. Imaginea poate fi de văz, de auz sau de miros.'
    }],
    theory: [
      'Epitetul aduce în față o însușire, la substantiv sau la verb. Comparația așază doi termeni unul lângă altul, pe o asemănare.',
      'Personificarea dă unui lucru, sau unui fenomen, trăsături omenești. Enumerația pune în șir termeni despre același obiect.',
      'Repetiția ia din nou un cuvânt, un grup ori un enunț, ca să apese pe o idee sau pe un sentiment. Nu aduce o știre nouă. Stăruie.',
      'Figurile se pot uni. Epitetul personificator și determină, și împrumută o trăsătură de om. Exemplu făcut aici: fereastra veghetoare.',
      'Pe scena noastră, fără strofă din carte: fereastra tăcută este epitet. Seara e lină ca o apă este comparație. Seara îmbrățișează fereastra este personificare.',
      'Lampă, geam, tăcere este enumerație. Stai, stai lângă geam este repetiție și apasă pe stăruință.',
      'Interpretarea are cinci pași. Întâi citești și fixezi tema, plus cuvintele-cheie. Apoi găsești figura și spui ce spun cuvintele ei.',
      'Arăți ce numește și ce emoție, sau ce atmosferă, se naște. Alegi tipul imaginii: văz, auz sau miros. La urmă legi semnificația de pașii dinainte.',
      'Tema scenei este liniștea de duminică. Cuvântul-cheie este lampa. Seara îmbrățișează fereastra este personificare și imagine de văz. Înseamnă că seara veghează lângă geam.',
      'Strofele din volume nu se transcriu. Le recunoști pe textul deschis cu aceleași definiții. Tabloul Peisaj de toamnă cu un cârd de curcani, semnat de Jean-François Millet, se descrie numai când îl vezi. Nu născoci culorile.'
    ].join('\n\n'),
    example: [
      'Fereastra tăcută este epitet. Lină ca o apă este comparație. Seara îmbrățișează fereastra este personificare de văz.',
      'Lampă, geam, tăcere este enumerație. Stai, stai este repetiție. Fereastra veghetoare este epitet personificator.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Copacul plânge frunze este o personificare inventată pentru exercițiu. Imaginea este de văz, iar emoția este o tristețe liniștită.'
    }],
    tryThis: [
      'Pe scena cu lampa, inventează pe rând un epitet, o comparație, o personificare, o enumerație și o repetiție.',
      'Ce imagine dă Seara îmbrățișează fereastra și ce emoție lasă? Parcurge cinci pași: tema, figura, obiectul numit, felul imaginii, sensul.',
      'Compune două rânduri noi, cu un copac care plânge, și numește figura personificare. Nu lua versuri din cărți.'
    ].join('\n\n'),
    keyPoints: [
      'Epitetul scoate o însușire, comparația apropie doi termeni, personificarea dă trăsături de om.',
      'Enumerația înșiră, repetiția stăruie, iar epitetul personificator le poate face pe amândouă.',
      'Cei cinci pași ai interpretării sunt tema, figura, emoția, tipul imaginii și sensul.'
    ]
  }),
  lesson({
    id: 'nunta-zamfirei',
    title: 'O nuntă de baladă, spusă cu faptele ei',
    kind: 'lectura',
    boxes: [{
      type: 'regula',
      title: 'Baladă, nu strofă',
      text: 'George Coșbuc a scris balada Nunta Zamfirei. Reții nunta, mirii, hora și cele două planuri. Versurile nu se lipesc.'
    }],
    theory: [
      'Faptul central este o nuntă. Mireasa este Zamfira, mirele este Viorel. Numele sună a poveste românească și se potrivesc între ele, nu sunt nume de cancelarie.',
      'Ordinea întâmplării: vestea pleacă până hăt departe. Nuntașii sosesc în zori. Alaiul se ivește către amiază. După cununie se joacă hora.',
      'La horă, lumea se prinde de mâini, face câte trei pași într-o parte și în cealaltă, se adună în cerc și lovește pământul în tact.',
      'Jocul după tilinci este un dans din zona Năsăudului. Planul social cuprinde opincile, portul de sat, vătaful care duce alaiul, starostele care rostește orațiile, muzicanții și drumul plin.',
      'Planul de basm cuprinde musafiri veniți din foarte multe țări, regi și soarele, care lasă impresia că se oprește ca să privească jocul.',
      'Rândul cu care începe balada nu măsoară o hartă și nu spune ora. Spațiul și timpul rămân largi, fără cifre. Variantele sunt o indicație cu cifre, un timp fix, mărimea Pământului sau lipsa de precizie. Buna este ultima.',
      'Roșeața și zăpăceala născute din dragoste arată ce simt mirii, nu haina și nu frumusețea jocului. Strofa dintâi este o sextină, iar ultimul ei rând este mai scurt.',
      'Rima acestei sextine unește două rânduri la început și trei la mijloc, apoi ultimul rând se întoarce la sunetul dintâi. Silabele se numără la clasă, pe strofa deschisă.',
      'Imaginea soarelui, spusă cu vorbele tale: bucuria jocului e așa de mare, încât și soarele pare un privitor oprit.',
      'În fragment, identitatea națională adună hora, opincile, vătaful, starostele, portul de sat și dansul din zona Năsăudului.',
      'A peți înseamnă a cere mâna unei fete. Crăime numește fie țara unui crai, fie o mulțime de crai. Purpura este roșul închis și, odată cu el, stofa scumpă de acea culoare.',
      'Rădvanul este trăsura închisă, de lux, pe care o trag caii. A starosti înseamnă a ține nunta și a rosti orațiile. Treascul este un mic tun de sărbătoare. Iatacul este odaia unde se doarme. Vătaful duce alaiul.',
      'Două tablouri: Hora la Aninoasa, pictată de Theodor Aman, și Mireasa, pictată de Abraham Solomon. Le privești la vedere.'
    ].join('\n\n'),
    example: [
      'Mirii sunt Zamfira și Viorel. Hora merge în cerc, cu pași într-o parte și în cealaltă. Jocul după tilinci vine din zona Năsăudului.',
      'În planul social stau opincile și vătaful. În planul de basm stau musafiri din multe țări. Începutul lasă locul larg. Roșeața din dragoste este emoția mirilor. A peți înseamnă a cere mâna.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Rădvanul este trăsura închisă, de lux. Iatacul este odaia de dormit. Vătaful duce alaiul, starostele spune orațiile. Niciun termen nu cere un vers copiat.'
    }],
    tryThis: [
      'Notează tema, mirii și două etape. Desparte un element social de unul de basm. Arată de ce începutul nu este o hartă și ce emoție poartă roșeața din dragoste.',
      'Scrie că strofa întâi este sextină și că rândul din urmă este mai scurt. În 30–50 de cuvinte, lămurește de ce soarele pare oprit.',
      'Dă patru semne de identitate națională și sensul pentru a peți, rădvan, a starosti, vătaf. Apoi povestește, în 120–150 de cuvinte, că ești la nuntă: aerul, oamenii, o întâmplare. Fără strofe.'
    ].join('\n\n'),
    keyPoints: [
      'Balada lui Coșbuc urmărește nunta Zamfirei cu Viorel, de la veste până la horă.',
      'Lumea satului aduce opinci, port, vătaf și staroste. Lumea basmului aduce musafiri de departe și soarele oprit în privire.',
      'Hora, opincile și dansul cu tilincă, din ținutul Năsăudului, arată identitatea. Versurile rămân în carte.'
    ]
  }),
  lesson({
    id: 'intonatie',
    title: 'Aceeași propoziție, altă emoție',
    kind: 'comunicare',
    boxes: [{
      type: 'definitie',
      title: 'Trei canale',
      text: 'Emoția trece prin cuvinte, prin corp și prin voce. Cuvântul este verbal. Gestul și mimica sunt nonverbale. Melodia și tăria vocii sunt paraverbale.'
    }],
    theory: [
      'Când textul este o poezie, și măsura, rima și ritmul pot duce o emoție. În dialog, o recunoști după împrejurare și după starea trupului celui care vorbește.',
      'Semnul de la capăt schimbă desenul frazei. Pleci în tabără la munte, închisă cu punct, constată un fapt. Cu semnul întrebării, aceeași frază întreabă. Cu semnul exclamării, miră sau arată bucurie puternică.',
      'Enunțul Vântul bate foarte puternic poate purta tristețe când glasul coboară și se rărește. Poate purta dezamăgire când apeși pe foarte și lași o pauză.',
      'Urcată la final, ca o întrebare, poate purta uimire. Spusă încet, fără un accent tare, poate purta resemnare.',
      'Gestul completează. Umeri lăsați stau lângă tristețe. Sprâncene ridicate stau lângă uimire. Nu desena fețe din imaginație. Le joci în clasă, după un context spus de tine.',
      'Două persoane pot rosti aceeași frază, una cu bucurie și alta cu îngrijorare. Hotărăsc melodia, pauza și corpul, nu doar vorbele.',
      'Într-un dialog notat, marchezi unde glasul urcă și unde coboară. Urcarea seamănă cu întrebarea. Coborârea seamănă cu oboseala sau cu tristețea.',
      'Contextul se spune înainte de gest. Dacă furtuna amână drumul la munte, exclamarea nu mai este bucurie, ci mirare amestecată cu necaz.',
      'În scris, intonația nu înlocuiește punctuația. Semnul îți arată conturul, iar vocea îl umple cu emoția aleasă.'
    ].join('\n\n'),
    example: [
      'Fraza despre tabăra la munte constată cu punct, întreabă cu semnul întrebării și miră cu semnul exclamării.',
      'Spus rar, cu umerii jos, Vântul bate foarte puternic poate fi tristețe. Cu glasul urcat la final, poate fi uimire. Vocea ține de paraverbal. Fața ține de nonverbal.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Dacă apeși foarte și apoi taci o clipă, Vântul bate foarte puternic sună a dezamăgire. Aproape în șoaptă, fără accent, sună a resemnare.'
    }],
    tryThis: [
      'Scrie de trei ori fraza despre tabăra la munte: o dată cu punct, o dată întrebând, o dată cu exclamație. Spune rolul fiecărui semn.',
      'Pentru Vântul bate foarte puternic, arată vocea de tristețe, de dezamăgire, de uimire și de resemnare. Lângă fiecare, un gest.',
      'Scrie opt replici între Mara și Nora, la geam: una bucuroasă, alta îngrijorată. Marchează două urcări de voce și două coborâri.'
    ].join('\n\n'),
    keyPoints: [
      'Punctul constată, întrebarea întreabă, exclamarea miră sau bucură tare.',
      'Melodia vocii este paraverbală. Gestul și mimica sunt nonverbale.',
      'Schimbând melodia și pauza, aceeași frază poate fi tristețe, dezamăgire, uimire sau resemnare.'
    ]
  }),
  lesson({
    id: 'descriere',
    title: 'Obiectiv, apoi subiectiv',
    kind: 'redactare',
    boxes: [{
      type: 'regula',
      title: 'Două descrieri',
      text: 'Varianta obiectivă dă fapte, la persoana a treia, fără figuri. Varianta subiectivă adaugă impresia și emoția, mai ales la persoana întâi.'
    }],
    theory: [
      'Descrierea arată cum este o ființă, un obiect sau un peisaj. Cea obiectivă rămâne la date reale și la un limbaj neutru.',
      'Cea subiectivă aduce impresiile tale, emoții și sentimente, într-un limbaj expresiv. Emoția o produce cel care descrie, nu lucrul singur.',
      'Un portret poate cuprinde ochii, gura, nasul, apoi sprâncenele și obrajii, expresia, haina, felul în care stă capul și emoția chipului.',
      'Tabloul Țărancă din Muscel, lucrare a lui Nicolae Grigorescu, se privește numai când îl ai dinainte. Nu născoci ce este pe pânză. Un personaj dintr-o imagine de carte se ia din imaginea văzută, nu din închipuire.',
      'Portretul de lucru are datele aici. Nora are păr negru, prins, ochi albaștri, nas drept și obraji liniștiți. Șade pe scaun, cu capul ușor aplecat, și poartă șorț alb.',
      'Expresia este calmă. Aceasta este varianta obiectivă, la persoana a treia, fără figură. În aceste fapte nu există comparație.',
      'Aceeași față, spusă subiectiv: liniștea Norei îmi amintește de lampa de duminică, iar când o privesc mă bucur. Persoana întâi și comparația schimbă tipul.',
      'La clasă, pe rândurile deschise, cauți piesele de portret și figura cu aceleași întrebări. Aici le cauți la Nora.',
      'Dacă descrii obiectiv o persoană dragă pe care o vezi, rămâi la ochi, gură, haină și poziția capului. Dacă nu este lângă tine, îți iei chipul din oglindă și spui că textul este obiectiv.',
      'Nu amesteca tipurile în același rând: un fapt neutru lângă o comparație cu eu. Le scrii separat, întâi obiectiv, apoi subiectiv.'
    ].join('\n\n'),
    example: [
      'Obiectiv: Nora are păr negru, ochi albaștri, șorț alb și capul aplecat. Comparația lipsește.',
      'Subiectiv: liniștea ei îmi amintește de lampă și mă bucur. Persoana întâi plus comparația fac textul subiectiv. Emoția vine de la cel care scrie.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Obiectiv: șorțul este alb, scaunul este simplu, capul stă ușor aplecat. Subiectiv: albul șorțului mi se pare lin ca lumina de duminică. Doar a doua frază are emoție.'
    }],
    tryThis: [
      'Scrie întâi portretul obiectiv al Norei, numai cu datele din lecție, la persoana a treia, fără figuri.',
      'Apoi scrie varianta subiectivă, la persoana întâi: o emoție plus o comparație. Arată cine produce emoția.',
      'Mai fă, obiectiv, opt rânduri despre o persoană dragă din fața ta: ochi, gură, haină, cap. Dacă lipsește, ia-ți fața din oglindă și numește lucrarea descriere obiectivă.'
    ].join('\n\n'),
    keyPoints: [
      'Textul obiectiv stă la persoana a treia, cu fapte și fără figuri.',
      'Textul subiectiv stă mai ales la persoana întâi și poartă emoția celui care descrie.',
      'La Nora reții părul, ochii, nasul, șorțul alb, capul aplecat și calmul.'
    ]
  }),
  lesson({
    id: 'asezare-text',
    title: 'Pagina se așază după situație',
    kind: 'comunicare',
    boxes: [{
      type: 'regula',
      title: 'După situație',
      text: 'Textul scris se organizează după cine citește și de ce. O narațiune sau o descriere are introducere, cuprins și încheiere.'
    }],
    theory: [
      'Drumul scrierii are cinci opriri: te pregătești, faci ciorna, revizuiești, editezi, publici. Limbajul se potrivește și cu tema, și cu felul textului.',
      'Un blog cere scop, temă, impresii ale tale și o recomandare către cititor. Ca să arăți textul, poți folosi o diagramă, un grafic sau un tabel.',
      'Mai ai la îndemână laptopul, tableta, tabla interactivă, un editor, un program de slide-uri sau un navigator. Informația se urmărește mai ușor dacă o poți căuta și dacă o poți pune în față.',
      'Două texte despre aceeași zonă se citesc ca fapte, nu ca bucăți de copiat. Țara Oașului stă în nord-vest, este microregiune și este depresiune.',
      'Relieful urcă în munți cu păduri de fag, de paltin, de stejar și de arțar, apoi coboară spre dealuri și câmpie. Din vremuri vechi au trăit aici dacii liberi.',
      'Se intră dinspre Satu Mare sau dinspre Sighetu Marmației. Venind din Maramureș, pe la Huta Certeze, cobori de la circa 600 de metri până pe la 200.',
      'Ce ține de loc: portul, cântecul, dansul, datinile, oamenii gospodari. Un text sprijinit pe relief, pe înălțime și pe arbori vrea să informeze un turist.',
      'Un text sprijinit pe port, pe cântec și pe gazde vrea să arate ce nu se repetă. Tema este aceeași, nord-vestul. Accentul diferă.',
      'Sursele sunt un ghid de drum și o notiță de călător. Nu se copiază paragrafele. Un plan de tabără de creație, pe două zile, poate folosi doar aceste fapte.',
      'Ziua întâi: drumeție și vizită la un meșteșugar. Ziua a doua: atelier de port sau de cântec. Vin elevi. Nu pune ore sau prețuri care nu stau în sursă.',
      'O descriere a unui loc care te-a mișcat cere cele trei părți. La sfârșit notezi că ai controlat un semn de punctuație.',
      'Un text liric se poate arăta prin diagramă, prin editor sau prin slide-uri, cu autorul, titlul, o idee și o imagine. Alegi două mijloace și spui ce pui în ele.'
    ].join('\n\n'),
    example: [
      'Țara Oașului stă în nord-vest. Pe la Huta Certeze cobori de la circa 600 de metri la 200. Textul de relief informează. Textul de port arată ce e unic.',
      'Blogul adaugă o impresie și o recomandare. Scrierea trece prin pregătire, ciornă, revizuire, editare și publicare.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Două slide-uri despre aceeași zonă: unul cu munți, fag și cei 600 de metri, altul cu port și cântec. Tema e comună. Accentul diferă. Orele lipsă nu se scriu.'
    }],
    tryThis: [
      'Fă un tabel cu zona, așezarea, relieful, un semn de originalitate și o impresie, numai din faptele lecției. Spune scopul textului de relief și scopul textului de port.',
      'Schițează primele două zile de tabără în Țara Oașului: program, cine vine, o drumeție, un atelier.',
      'Scrie 100–150 de cuvinte despre un loc care te-a mișcat, cu trei părți. La final, arată că ai verificat un semn. Alege două mijloace, dintre diagramă, editor și slide-uri, ca să arăți un text liric, cu autorul, titlul, o idee și o imagine.'
    ].join('\n\n'),
    keyPoints: [
      'Textul se așază după situație. Are cinci etape de lucru și trei părți. Blogul mai cere impresie și recomandare.',
      'Microregiunea Țara Oașului stă în nord-vest. Coborârea de la Huta Certeze duce de la circa 600 de metri spre 200.',
      'Relieful poate fi spus ca informație. Portul și datinile pot fi spuse ca unicitate. Orele absente nu se născocesc.'
    ]
  }),
  lesson({
    id: 'substantiv',
    title: 'Comun, propriu, colectiv',
    kind: 'limba',
    boxes: [{
      type: 'definitie',
      title: 'Substantivul',
      text: 'Este flexibil și pune nume pe ființe, lucruri, fenomene, sentimente și stări. Poate numi o clasă sau un singur exemplar, simplu ori compus.'
    }],
    theory: [
      'Floare și masă sunt comune. Nora este propriu. Propoziția de lucru este Nora a pus floarea pe masă: doar Nora este propriu. Floarea și masa rămân comune.',
      'Simple sunt casă, pom, copil. Compuse sunt gura-leului și floare-de-colț. Genurile: masculin, feminin, neutru.',
      'La ființe, genul poate veni din două cuvinte, cum sunt tată și mamă, sau dintr-un sufix moțional. Perechi: gâscă cu gâscan, rață cu rățoi, țăran cu țărancă, bunic cu bunică, urs cu ursoaică, prinț cu prințesă.',
      'Alte perechi cerute: croitor cu croitoreasă, pictor cu pictoriță, lup cu lupoaică, român cu româncă, bucătar cu bucătăreasă, oltean cu olteancă, curcă cu curcan, duce cu ducesă.',
      'Numărul este singular ori plural.',
      'Nu au plural, sunt singularia tantum: aur, curaj, lapte, miere. Nu au singular, sunt pluralia tantum: aplauze și câlți.',
      'Colectivul arată un grup, deși forma este de singular: roi, armată, cârd, cireadă, apoi brădet, aluniș, școlărime, flotă, echipă, stol.',
      'Nu intra aici tinerei, pădurar, părinți, colegi. Tinerețe numește o vârstă, nu un grup. Derivări: de la tânăr iese tineret, de la școlar iese școlărime, de la brad iese brădet, de la alun iese aluniș, de la muncitor iese muncitorime.',
      'Iubire: feminin, singular. Vis: neutru, singular. Marinar: masculin, singular. Nebunie se trage din nebun plus sufixul -ie.',
      'Cu articol hotărât, din lista dată, stau floarea-soarelui, sentimentele, răufăcătorul și steaua. Fără acest articol, scrise așa: câine-lup, bloc, emoție, bunăstare, bunăvoință.',
      'O locuțiune substantivală este un grup care lucrează ca un substantiv. Părere de rău înseamnă regret. Tragere de inimă înseamnă plăcere. Ținere de minte înseamnă memorie.',
      'Aduceri-aminte înseamnă amintiri. Strângere în brațe înseamnă îmbrățișare. Băgare de seamă înseamnă atenție. Din verbe ies luare la rost și scăpare din vedere. Mai ies învățare de minte, dare de seamă, luare de cuvânt și facere de bine.',
      'Se îndreaptă workshop-uri spre workshopuri și non-violență spre nonviolență.',
      'Baia-Mare se scrie Baia Mare. Post scriptum se scrie post-scriptum. Week-end se scrie weekend. Lung metraj se scrie lungmetraj.'
    ].join('\n\n'),
    example: [
      'Nora este nume propriu, floarea este nume comun. Miere stă fără plural. Stol este colectiv, părinți nu. Iubire este feminin, singular. De la tânăr iese tineret.',
      'Aduceri-aminte înseamnă amintiri. Baia Mare nu ia cratimă. Weekend stă într-un cuvânt. Post-scriptum ia cratimă.'
    ].join('\n\n'),
    extraExamples: [{
      title: 'Încă un exemplu',
      text: 'Din a face bine iese facere de bine. Rămân scrise bine bloc-turn, Târgu-Neamț, ex-premier și design.'
    }],
    practice: [
      '1) În Nora a pus floarea pe masă, numește propriul și cele comune.',
      '2) Ce gen și ce număr au iubire, apoi vis și marinar?',
      '3) Ce colectiv formezi de la tânăr, școlar și brad, și de ce părinți nu este colectiv?',
      '4) Cum se scriu corect Baia-Mare, week-end și post scriptum?'
    ].join('\n\n'),
    answers: [
      'Propriu: Nora. Comune: floarea și masa.',
      'Feminin singular, neutru singular, masculin singular.',
      'Tineret, școlărime, brădet. Părinți numește mai multe persoane, nu un grup într-o formă de singular.',
      'Baia Mare, weekend, post-scriptum.'
    ],
    mistakes: 'Tinerețe nu numește un grup, ci o vârstă. Părinți și colegi nu sunt colective. Miere nu primește plural. Baia Mare nu ia cratimă.',
    tryThis: [
      'Fă perechea moțională: gâscă, rață, țăran, bunic, urs, prinț.',
      'Păstrează colectivele din brădet, tinerei, flotă, pădurar, școlărime, părinți, echipă, colegi. Dintre câine-lup, floarea-soarelui, emoție și steaua, scrie formele cu articol hotărât. Dă sensul lui băgare de seamă, al lui aduceri-aminte și al expresiei părere de rău.'
    ].join('\n\n'),
    keyPoints: [
      'Substantivul numește o clasă sau un exemplar și poate fi simplu ori compus.',
      'Colectivul are chip de singular și înțeles de plural, ca stol, tineret și brădet. Miere stă numai la singular.',
      'Se scriu bine Baia Mare și weekend, apoi lungmetraj, workshopuri, nonviolență, post-scriptum.'
    ]
  })
]};
