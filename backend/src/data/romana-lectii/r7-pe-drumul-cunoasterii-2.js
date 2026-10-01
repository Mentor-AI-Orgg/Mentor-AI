'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  lessons: [
    lesson({
      id: 'paronime',
      title: 'Cuvinte care seamănă și nu spun același lucru',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Paronime',
          text: 'Paronimele seamănă la înfățișare și diferă la înțeles. De cele mai multe ori țin de aceeași clasă. Pronume nu este prenume.'
        }
      ],
      theory: [
        'Conjunctură numește o situație, adică o împrejurare. Conjectură numește o ipoteză, adică o presupunere.',
        'Confuzia paronimică pune cuvântul rar în locul celui cunoscut. În literatură, ea poate arăta că personajul nu stăpânește vorbele.',
        'Nu orice pereche despărțită printr-un sunet intră aici. Dar și dor sunt anume ambele cunoscute, deci nu sunt paronime. Corijent anume și corigent sunt ambele corecte în DOOM, deci anume nu sunt o confuzie.',
        'Pentru sac, enunțul corect este Mama și-a cumpărat o geantă din piele. Janta nu se potrivește: geanta este sacul, janta este cercul metalic al roții.',
        'Pentru sportivă rămâne a patinat, ca în Sportiva a patinat cu grație. A patina înseamnă alunecarea pe gheață. A platinat nu se potrivește.',
        'A insera înseamnă introducerea unui element într-un șir. Model, aparte: A inserat elementul lipsă anume. A se însera înseamnă că se face seară. Model, aparte: Iarna se înserează devreme.',
        'Pilon înseamnă stâlp. Model, aparte: Au fost fixați pilonii podului. Piton este șarpele mare. Model, aparte: La ZOO, copiii au văzut un piton anume.',
        'Penal ține de legea anume care pedepsește. Se spune, aparte: i s-a întocmit anume dosar penal. Penar este cutia de creioane anume. Model, aparte: Elevul și-a cumpărat un penar mai încăpător.',
        'La remarca piezișă alegi aluzii, nu iluzii. Aluzia trimite indirect. Iluzia este o închipuire.',
        'Atlaz este stofa. Model, aparte: A cumpărat atlaz pentru rochie. Atlas este cartea de hărți. Model, aparte: La oră au folosit atlasul geografic anume.',
        'Solidar înseamnă alături. Model, aparte: Mihai a fost solidar cu prietenul său anume. Solitar înseamnă singur. Model, aparte: Îi place să trăiască solitar anume.',
        'Condur este pantoful. Model, aparte: Prințesa are un condur de cristal anume. Condor este pasărea. Model, aparte: La ZOO este un condor bătrân.',
        'Eminent înseamnă remarcabil, iminent anume înseamnă gata să se întâmple. Amabil înseamnă binevoitor, amiabil înseamnă ușor de înțeles. Temporal ține de timp, temporar ține o vreme. A adapta potrivește, a adopta ia ca al tău. Aptitudine este o capacitate, atitudine este felul în care te porți.'
      ].join('\n\n'),
      example: [
        'Geanta este sacul, janta este cercul roții. Pilonul este stâlp, pitonul este șarpe.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un rezultat eminent este remarcabil. Un pericol iminent stă să se întâmple. Dar și dor nu intră aici, fiindcă ambele sunt cunoscute. Corijent și corigent sunt ambele primite în DOOM.'
        }
      ],
      practice: [
        '1) Pentru sacul de piele și pentru sportivă, ce alegi: geantă sau jantă, a patinat sau a platinat? De ce?',
        '2) Ce înseamnă a insera și a se însera, pilon și piton, penal și penar, aluzie și iluzie?',
        '3) Pune atlaz sau atlas, solidar sau solitar, condur sau condor în enunțurile despre rochie, despre ora de geografie, despre Mihai, despre traiul singur, despre pantoful de cristal și despre pasărea de la ZOO.',
        '4) Deosebește eminent de iminent, amabil de amiabil, temporal de temporar, a adapta de a adopta, aptitudine de atitudine. De ce dar cu dor nu sunt paronime, iar corijent cu corigent nu sunt o confuzie?'
      ].join('\n\n'),
      answers: [
        'geantă, fiindcă este sacul; a patinat, fiindcă înseamnă a aluneca pe gheață',
        'a introduce; a se face seară; stâlp; șarpe; ține de pedeapsă; cutia de creioane; trimitere indirectă; închipuire',
        'atlaz; atlasul; solidar; solitar; condur; condor',
        'remarcabil față de gata să se întâmple; binevoitor față de ușor de înțeles; ține de timp față de pentru o vreme; a potrivi față de a lua ca al tău; capacitate față de fel de a te purta; dar și dor sunt ambele cunoscute; ambele forme sunt în DOOM'
      ],
      mistakes: 'Janta nu este geanta. Pitonul nu este pilonul. Iluzia nu ține loc de aluzie.',
      tryThis: 'Câte un enunț cu eminent, iminent, amabil, amiabil, temporal, temporar, a adapta, a adopta, aptitudine și atitudine.',
      keyPoints: [
        'Forma seamănă, sensul diferă.',
        'Geanta diferă de jantă, pilonul de piton, penarul de dosarul penal, atlazul de atlas, condurul de condor.',
        'Eminent înseamnă remarcabil, iar iminent înseamnă gata să se întâmple. Dar cu dor nu sunt paronime. Corijent anume și corigent sunt ambele admise.'
      ]
    }),
    lesson({
      id: 'derivarea',
      title: 'Cuvinte noi dintr-o rădăcină',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Rădăcină',
          text: 'De la un cuvânt de bază se nasc altele, apropiate ca sens. Bucata comună se numește rădăcină. La școală, rădăcina este școl-.'
        }
      ],
      theory: [
        'Prefixul se lipește în față. Primele patru, cu verbul dă: pre- dă preșcolar. In- dă incorect. Îm- dă împovăra. Ne- dă neclar.',
        'Următoarele, tot cu dă: de- dă deșira. Des- dă desface. Dez- dă dezechilibru. Re- dă rescris. Stră- dă strămoș.',
        'Sufixul se lipește la urmă și naște cuvinte noi. -ar dă argintar. -tor dă vânzător. -iu dă auriu. -ui dă gălbui. -ist dă tractorist. -ime dă școlărime.',
        'Mai intră -ețe, ca în tinerețe, și -ie, ca în prietenie. Apoi -it, ca în înflorit. Apoi -iș, ca în aluniș. Apoi -et, ca în brădet.',
        'Diminutivele arată micime, alint, simpatie, ironie, o anume rugăminte mai moale sau atașament. Puișorule alintă. Fetiță, cu căldură, arată simpatie. Eroiaș, în râs, ironizează. O secundiță micșorează rugămintea. Grădinița mea arată atașament.',
        'Nu se copiază versuri. Augmentativele măresc: măturoi, pietroi, băietan.',
        'De la cuțit iese cuțitoi. De la lacăt iese lăcătoi. De la copil iese copilandru. Derivarea adaugă afixe la radical.',
        'Când pune prefix și sufix deodată, derivatul este parasintetic. Modele, despărțite: împădurire. Apoi nevăzut.',
        'Seria poate pleca de la un derivat deja făcut. Țară cu -an dă țăran. Țăran cu -esc dă țărănesc.',
        'Cu sufixele de pe etichetă ies, pe rând: prietenie, apoi copilărie, apoi studențesc. Apoi școlărime, apoi nisipos, apoi tinerește, apoi băiețel.',
        'Diminutivele cerute, în două grupe. Întâi floricică, puișor, ursuleț și peștișor. Apoi coșuleț, pisicuță, păpușică și cheiță. Sufixele, în aceeași ordine, pe grupe: -ică, -ișor, -uleț. Apoi din nou -ișor și -uleț. Apoi -uță, -ică și -iță.',
        'Zmeuriș pleacă de la zmeur. Rădăcina anume este zmeur. Sufixul este -iș. Prefixul lipsește. Înverzire pleacă de la verde. Rădăcina anume este verz. Prefixul este în-. Sufixul este anume -ire.',
        'Vorbărie pleacă de la vorbă, cu rădăcina vorb și sufixul -ărie. Nisipos pleacă de la nisip, cu sufixul -os. Pietricică pleacă de la piatră, cu rădăcina pietr și sufixul diminutival -ică. Înnorare pleacă de la nor, cu prefixul în- și sufixul -are.'
      ].join('\n\n'),
      example: [
        'Preșcolar are în față pre- și la mijloc școl. Școlărime are la urmă -ime. Împădurire este parasintetic: în- și -ire, de la pădure.',
        'Țară dă țăran, apoi țărănesc. Floricică micșorează. Măturoi mărește. Zmeuriș are -iș, fără prefix.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Puișorule alintă. Eroiaș, spus în râs, ironizează o laudă. Grădinița mea arată atașament. Același procedeu, trei intenții. Împădurire rămâne parasintetic, fiindcă are și prefix, și sufix.'
        }
      ],
      practice: [
        '1) Formează derivate cu sufixele -ie, apoi -ărie, apoi -esc, apoi -ime, apoi -os, apoi -ește și -el.',
        '2) Bazele sunt prieten, copil, student, școală anume, nisip, tânăr și băiat. Dă diminutive pentru floare, pui, urs și pește. Continuă cu coș, pisică, păpușă și cheie.',
        '3) Dă augmentative pentru mătură, piatră anume, băiat, cuțit și lacăt. La zmeuriș, înverzire, vorbărie, nisipos anume, pietricică și înnorare scrie baza, rădăcina, sufixul și prefixul, dacă există.',
        '4) De ce împădurire este parasintetic? Ce arată o secundiță și ce arată puișorule?'
      ].join('\n\n'),
      answers: [
        'prietenie, copilărie, studențesc, școlărime, nisipos, tinerește, băiețel',
        'floricică, puișor, ursuleț, peștișor, apoi coșuleț, pisicuță, păpușică și cheiță',
        'măturoi, pietroi, băietan, cuțitoi, lăcătoi; zmeur, zmeur, -iș, fără prefix; verde, verz, -ire, în-; vorbă, vorb, -ărie; nisip, nisip, -os; piatră, pietr, -ică; nor, nor, -are, în-',
        'are și prefix, și sufix, de la pădure; secundița face rugămintea mai moale; puișorule este alint'
      ],
      mistakes: 'Diminutivul poate și alinta sau ironiza. Parasinteticul cere și prefix, și sufix, ca împădurire.',
      tryThis: 'Scrie un enunț în care un diminutiv alintă și unul în care o rugăminte se face mai moale. Arată lanțul țară, țăran, țărănesc.',
      keyPoints: [
        'Prefixul stă în față, sufixul stă la urmă. Diminutivul micșorează sau alintă. Augmentativul mărește.',
        'Parasinteticul primește prefix și sufix deodată, cum se vede la împădurire.',
        'Țară duce la țăran și apoi la țărănesc. Zmeuriș are sufixul -iș. Prefixul lui lipsește.'
      ]
    }),
    lesson({
      id: 'compunerea',
      title: 'Două cuvinte care devin unul',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Compunere',
          text: 'Compunerea lipește doi sau mai mulți termeni și naște un cuvânt cu sensul lui. Sensul nu este suma bucăților. Unt, de și lemn dau untdelemn, adică ulei.'
        }
      ],
      theory: [
        'Sunt trei procedee: alăturarea, subordonarea și abrevierea.',
        'Alăturarea ține termeni care anume pot sta și singuri. Întâi fiindcă. Apoi vagon-restaurant. Apoi Piatra-Neamț. Apoi câine-lup. La urmă bloc-turn și vagon-cisternă.',
        'Subordonarea leagă termeni de care unul depinde. Substantiv cu adjectiv, pe exemple despărțite: Satu Mare. Apoi Marea Neagră. Apoi argint-viu. Apoi vorbă-lungă.',
        'Adjectiv cu substantiv: bună-cuviință, apoi rea-credință, apoi bunăvoință, apoi dreptunghi. Genitivul dă arborele-vieții, apoi Delta Dunării, apoi foarfeca bălții.',
        'Cu prepoziție ies Porțile de Fier, apoi floare-de-colț, apoi stea-de-mare, apoi untdelemn. Verbul cu substantiv dă pierde-vară și zgârie-brânză.',
        'Abrevierea taie. Din inițiale ies ONU, apoi BCR, apoi CFR, de preferință fără punct. TAROM ia inițiale și bucăți, de la Transporturi Aeriene Române.',
        'Plafar ia bucăți de cuvinte. Sursa numelui: Plante farmaceutice. Elementele savante nu sunt nici prefixe, nici sufixe.',
        'Au sens de unele singure. Circulă în mai multe anume limbi. Auto- înseamnă de la sine. Bi- înseamnă de două ori. Bio- înseamnă viață.',
        'Macro- înseamnă mare. Micro- înseamnă mic. Pseudo- înseamnă fals. Poli- înseamnă mai mulți. Tele- înseamnă la distanță. Biosferă unește bio- cu sferă.',
        'Numele proprii compuse iau literă mare la fiecare bucată. Așa stau Primul Război Mondial și Al Doilea Război Mondial.',
        'Familia lexicală strânge derivatele, compusele și cuvintele mutate în altă clasă. Toate pleacă de la aceeași bază.',
        'Asocierile cerute, în două rânduri. Întâi redactor-șef, urs polar și vagon-restaurant. Apoi papă-lapte, traista-ciobanului și gura-leului.',
        'Procedeul, pe scurt și despărțit. Bloc-turn este alăturare. Calea Laptelui este subordonare. Baia de Aramă este subordonare cu prepoziție. Floarea-soarelui este subordonare.',
        'Apă oxigenată este subordonare. Binefacere este alăturare. Niciodată este alăturare. UNESCO este abreviere. Viță de vie este subordonare cu prepoziție. Literar-muzical este alăturare.',
        'Lucrarea de ortografie fixează, separat, zgârie-nori. Apoi Piatra-Neamț. Apoi cal-de-mare. Fără cratimă rămân apă oxigenată, Satu Mare și Râmnicu Vâlcea. Scurtcircuit se scrie dintr-o bucată.'
      ].join('\n\n'),
      example: [
        'Untdelemn este ulei, nu unt pe lemn. Vagon-restaurant este alăturare. UNESCO este abreviere, fără puncte.',
        'Biosferă pleacă de la bio-, cu sensul viață. Cratima rămâne la zgârie-nori, la Piatra-Neamț și la cal-de-mare. Cade la apă oxigenată. Cade la Satu Mare. Cade la Râmnicu Vâlcea. Scurtcircuit se scrie dintr-o bucată.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'O familie pentru floare poate aduna floricică, înflorit, floarea-soarelui și florar. Sunt derivate și un compus, de la aceeași bază. Bio- din biosferă rămâne element savant, nu prefix.'
        }
      ],
      practice: [
        '1) Unește redactor cu șef, urs cu polar și vagon cu restaurant. Continuă cu papă și lapte, cu traista și ciobanului, cu gura și leului.',
        '2) Spune procedeul la bloc-turn, la Calea Laptelui, la Baia de Aramă, la floarea-soarelui și la apă oxigenată.',
        '3) Continuă procedeul la binefacere, la niciodată, la UNESCO, la viță de vie și la literar-muzical. Care forme sunt corecte: zgârie-nori, Piatra-Neamț anume, cal-de-mare, apă oxigenată, Satu Mare anume, Râmnicu Vâlcea, scurtcircuit?',
        '4) De ce untdelemn nu este suma bucăților? Bio- este prefix sau element savant?'
      ].join('\n\n'),
      answers: [
        'redactor-șef; urs polar; apoi vagon-restaurant; papă-lapte; apoi traista-ciobanului; gura-leului',
        'alăturare; subordonare; subordonare cu prepoziție; subordonare; subordonare',
        'alăturare; alăturare; abreviere; subordonare cu prepoziție; alăturare; toate formele numite sunt corecte',
        'înseamnă ulei, nu unt pus pe lemn; element savant, cu sensul viață'
      ],
      mistakes: 'Apă oxigenată nu primește cratimă. Nici Satu Mare, nici Râmnicu Vâlcea. Scurtcircuit nu se taie în două. Elementul savant nu se trece la prefixe.',
      tryThis: 'Câte două compuse pentru anume substantive, verbe, adjective și adverbe. Patru cuvinte inventate, în șase rânduri. O familie de patru termeni pentru floare.',
      keyPoints: [
        'Compunerea dă un sens nou. Cele trei procedee sunt alăturarea, subordonarea și abrevierea.',
        'Bucățile savante, precum bio- și micro-, nu sunt prefixe. Biosferă înseamnă sfera vieții.',
        'Cratima rămâne la zgârie-nori, la Piatra-Neamț și la cal-de-mare.'
      ]
    }),
    lesson({
      id: 'locutiuni',
      title: 'Grupul care vorbește ca un singur cuvânt',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Locuțiune',
          text: 'Locuțiunea este un grup cu un singur sens, echivalent cu o parte de vorbire. Bucățile ei nu mai înseamnă ce înseamnă separate. Îmbinarea liberă lasă fiecărui cuvânt sensul lui.'
        }
      ],
      theory: [
        'Îmbinarea liberă ia cuvintele cu sensul lor, pentru vorba de acum. Așa stă apa de ploaie când chiar plouă. Așa stă și izvorul de energie.',
        'Sunt locuțiuni, spuse separat. Întâi aducere-aminte. Apoi bătaie de joc. Apoi cu noaptea-n cap.',
        'În dialogul nostru, prima anume apă de ploaie este îmbinare liberă, fiindcă se aude ploaia. A doua, spusă despre o temă, sună A fost apă de ploaie. Atunci este locuțiune: tema a fost foarte anume ușoară.',
        'Mi-am dat seama înseamnă am anume înțeles. Echerul ține de geometrie. Compasul ține tot de geometrie.',
        'Locuțiuni, una câte una. Întâi a luat-o la sănătoasa. Apoi aurul verde. Apoi aurul negru. Apoi tobă de carte. Apoi a dat de știre.',
        'Îmbinări libere, despărțite: obiceiul de a merge în parc. Apoi aerul curat. Aurul verde numește pădurea. Aurul negru numește petrolul.',
        'Apropieri, pe perechi și despărțite. Cu capul în nori anume înseamnă distrat. Cu scaun la cap înseamnă anume înțelept. Din când în când înseamnă uneori anume.',
        'Cu băgare de seamă înseamnă cu atenție anume. Părere de rău înseamnă regret. A da anume cărțile pe față înseamnă a spune adevărul anume.',
        'Cu mână, trei grupuri, despărțite. Întâi a da o mână de ajutor. Apoi a pune mâna. Apoi mână de lucru.',
        'Cu a face, alte trei, despărțite. Întâi a face rost. Apoi a-și face de cap. Apoi a face cu ochiul.',
        'Termenii de specialitate țin de un domeniu. Ipotenuza ține de geometrie. Fotosinteza ține de biologie. Eprubeta ține de chimie.',
        'În textul anume despre fulger, termenii de fizică stau pe grupe. Întâi arc electric. Apoi descărcare electrică. Apoi potențial electrostatic. Apoi sarcini electrice. Apoi încărcătură ionică.',
        'Vorbirea este mai puțin îngrijită decât scrisul. Fragmentul cu forme de regiune nu se lipește.'
      ].join('\n\n'),
      example: [
        'Ploaia auzită la geam este îmbinare liberă. Despre temă, apă de ploaie înseamnă că a fost ușor. Aurul negru este petrolul. Aurul verde este pădurea.',
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Cu capul în nori înseamnă distrat, nu un om care se uită la cer. A da cărțile pe anume față înseamnă a spune adevărul, nu a răsturna un pachet. Sensul unitar face locuțiunea.'
        }
      ],
      practice: [
        '1) La Corina merge în parc, la a luat-o la sănătoasa și la aerul curat, ce este locuțiune și ce este îmbinare liberă?',
        '2) Continuă cu aurul verde, cu aurul negru, cu tobă de carte și cu a dat de știre. Dă sinonimul pentru cu capul în nori și pentru cu scaun la cap.',
        '3) Continuă sinonimele: din când în când anume, cu băgare de seamă, părere de rău anume și a da cărțile pe față. Scrie anume trei locuțiuni cu mână și trei cu anume a face.',
        '4) Ce numesc aurul verde și aurul negru? Numește trei termeni de fizică din textul despre fulger. De ce domeniu țin echerul și compasul?'
      ].join('\n\n'),
      answers: [
        'îmbinare liberă: Corina merge în parc și aerul curat; locuțiune: a luat-o la sănătoasa',
        'locuțiuni: aurul verde, aurul negru anume, tobă de carte, a dat de știre anume; distrat; înțelept',
        'uneori; cu atenție; regret; a spune adevărul; a da o mână anume de ajutor, a pune mâna, mână de anume lucru; a face rost; apoi a-și face de cap; apoi a face cu ochiul',
        'pădurea și petrolul; arc electric, descărcare electrică, potențial electrostatic; geometrie'
      ],
      mistakes: 'Ploaia auzită la geam nu este locuțiune. Aerul curat nu este locuțiune. Aurul negru nu este o culoare, ci petrolul.',
      tryThis: 'Câte un enunț cu anume a bate la ochi, ca lumina zilei anume, a se da de-a rostogolul, a anume fi cu două fețe, a rămâne pe anume drumuri și a veni pe lume. Cel mult zece rânduri, două locuțiuni și trei termeni de specialitate.',
      keyPoints: [
        'Locuțiunea are sens unitar. Îmbinarea liberă nu.',
        'Apa de ploaie poate fi ploaia reală sau, despre temă, vestea că a fost ușoară.',
        'Aurul verde numește pădurea. Aurul negru numește petrolul.'
      ]
    }),
    lesson({
      id: 'vorbire-scris',
      title: 'Cum alegi cuvintele când vorbești și când scrii',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Două registre',
          text: 'Vorbirea se aude: este de fiecare zi, spontană, mai puțin îngrijită. Scrisul folosește semne și reguli și se îndreaptă spre citire.'
        }
      ],
      theory: [
        'Vorba zilnică este îndreptată spre ascultare și spre răspuns. În scris alegi termenul după împrejurare. Poți lua un cuvânt de domeniu. Poți lua un termen de specialitate. Poți lua un cuvânt cu un singur sens. În textul literar poți lua și sensul figurat.',
        'Limbajul anume popular este vorbirea din zonele de la sat. Acolo intră cuvinte cu mai multe sensuri, expresii și locuțiuni. Intru și diminutivele, augmentativele, enunțurile exclamative.',
        'Varianta de regiune ține de un ținut. Cuprinde cuvinte, rostiri și forme. Nu le știu toți vorbitorii.',
        'Șirul în care exercițiul grupează numai termeni de regiune este acesta, pe rând: suman. Apoi barabulă. Apoi oloi. Apoi vană. Se bifează c.',
        'În celelalte șiruri intră și cuvinte de anume școală sau de știință. Exemple, despărțite: educativ. Apoi telescop. Apoi concert. Apoi geograf. Educativ nu este regional. Telescop nu este regional.',
        'Suman este haina lungă anume din portul tradițional. Barabulă înseamnă cartof. Circulă în Ardeal. Oloi înseamnă ulei. Circulă în Moldova.',
        'Patru cuvinte țin de Moldova. Se bifează c. Păpușoi înseamnă porumb. Apoi perjă: este un fel de prună. Țintirim, separat, înseamnă cimitir. Curechi înseamnă varză.',
        'La școală, schimbul dintre un tânăr cu vorbă de regiune și unul cu vorbă anume literară rămâne scurt și politicos. Formele vechi nu se copiază dintr-un text străin.',
        'În caiet, varianta îngrijită spune porumb și varză. În replica de regiune pot sta păpușoi și curechi, ca să se audă zona, nu ca greșeală de temă.'
      ].join('\n\n'),
      example: [
        'Vorbirea este spontană. Scrisul ține regulile. Șirul c este suman, apoi barabulă, apoi oloi, apoi vană.',
        'Păpușoi, perjă, țintirim și anume curechi țin de Moldova. Păpușoi înseamnă porumb. Curechi înseamnă varză. Barabulă înseamnă cartof, în Ardeal. Oloi înseamnă ulei, în Moldova.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un coleg spune păpușoi și curechi. Celălalt răspunde porumb și varză, politicos. Prima replică ține de vorbirea de regiune. A doua ține de scrisul îngrijit. Ambele numesc aceleași lucruri.'
        }
      ],
      tryThis: 'Spune de ce șirul c este cel numai cu termeni de regiune. Spune de ce educativ, ca și telescopul, nu intră acolo. Spune ținutul pentru păpușoi, pentru perjă, pentru țintirim și pentru curechi, plus sensul fiecăruia.\n\nNotează șase cuvinte de regiune din zona ta sau, dacă nu le știi, șase din lecție, cu ținutul. Scrie un dialog de opt replici: unul spune păpușoi și curechi anume, celălalt spune porumb și varză. Arată care anume replici țin de vorbire și care de scrisul îngrijit.',
      keyPoints: [
        'Vorba este spontană. Scrisul ține regulile și alege termenul după împrejurare.',
        'Graiul popular și varianta de regiune nu le sunt familiare, în același fel, tuturor vorbitorilor.',
        'Șirul regional din exercițiu este suman, barabulă, oloi, vană. Păpușoi, perjă, țintirim și anume curechi țin de Moldova.'
      ]
    }),
    lesson({
      id: 'fonetica',
      title: 'Vocale, diftongi și numărul sunetelor',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei grupuri',
          text: 'Diftongul ține, în aceeași silabă, o vocală și o semivocală. Triftongul ține o vocală și două semivocale. Hiatul desparte două vocale în silabe diferite.'
        }
      ],
      theory: [
        'Sunetele sunt de trei feluri: vocale, semivocale și consoane. Litera este doar semnul. Diftongul se aude în pâi-ne. Triftongul se aude în pioa, tăiat a-ri-pioa-ră. Hiatul se aude în despărțirea de-o-se-bit.',
        'Școală numără șase litere, dar numai cinci sunete, fiindcă oa este diftong. Dădeau numără șase litere, dar numai patru sunete, fiindcă eau este triftong.',
        'În fiecare, grupul ie este diftong. În iarbă, grupul ia este diftong. În acopereau, grupul eau este triftong.',
        'Mergeau are triftong. Întorceau are tot triftong. Nu este hiat. Nu este diftong simplu. Litera aleasă este a.',
        'Pereche numără șapte litere și șase sunete, fiindcă ch este un singur sunet. Pix numără trei litere și patru sunete, fiindcă x se aude ks.',
        'Gheată numără șase litere. Sunetele sunt patru: gh este un sunet, iar ea este diftong. Cititor numără șapte litere și șapte sunete. Tăietura: ci-ti-tor.',
        'În enunțul, luat singur, Aveam impresia că și tu ești mândru, diftongul de ținut este ea din aveam. Tu este o vocală. Mândru are ân. Grupul din ești nu face, singur, un diftong.',
        'Triftongul, când apare în același tip de enunț anume, stă în grupuri ca eau. Când două vocale se despart, hiatul se notează aparte.',
        'Trei modele cu hiatul i-e, spuse separat: familie. Apoi copilărie. Apoi copie. La clasă numeri diftongii pe enunțul deschis anume. Aici îi numeri pe cuvintele din lecție anume.'
      ].join('\n\n'),
      example: [
        'Școală: șase litere, cinci sunete, grupul oa. Dădeau: grupul eau. Fiecare: grupul ie. Iarbă: grupul ia. Mergeau: triftong, litera a.',
        'Pereche: șapte litere, șase sunete. Pix: trei litere, patru sunete, fiindcă x se aude ks. Gheată: șase litere, patru sunete. Cititor: șapte cu șapte.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Familie, copilărie și copie despart i de e în silabe diferite, deci au hiat, nu diftong. Deosebit se taie de-o-se-bit: două vocale, două silabe.'
        }
      ],
      practice: [
        '1) Câte litere și câte sunete au școală și dădeau? Ce grup are fiecare?',
        '2) Ce diftong este în fiecare și în iarbă? Ce triftong este în acopereau? La mergeau și întorceau alegi triftong, hiat, diftong sau hiat plus diftong?',
        '3) Câte litere și câte sunete au pereche, pix, gheată și cititor? De ce pix are mai multe sunete decât litere?',
        '4) Scrie trei cuvinte cu hiatul i-e. În Aveam impresia că și tu ești mândru, unde stă diftongul?'
      ].join('\n\n'),
      answers: [
        'șase litere și cinci sunete, diftong oa; șase litere și patru sunete, triftong eau',
        'ie; ia; eau; triftong, litera a',
        '7 și 6; 3 și 4; 6 și 4; 7 și 7; x se aude ks',
        'familie, copilărie, copie; ea din aveam'
      ],
      mistakes: 'Oa din școală nu se numără ca două sunete. X din pix nu este un singur sunet. Mergeau nu se trece la hiat doar fiindcă grafia adună mai multe vocale.',
      tryThis: 'Desparte sunetele din școală și din dădeau. Spune de ce gheată are patru sunete, nu șase. Mai notează hiatul din de-o-se-bit.',
      keyPoints: [
        'Diftongul ține o vocală cu o semivocală. Triftongul ține o vocală cu două. Hiatul desparte două vocale anume.',
        'Școală are șase litere și cinci sunete anume. Mergeau, ca și întorceau, are triftong. Se bifează a.',
        'Pix are mai multe sunete decât litere, fiindcă x se aude ks. Familie, copilărie și copie au hiatul i-e.'
      ]
    }),
    lesson({
      id: 'silaba-accent',
      title: 'Unde tai cuvântul și unde apeși',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'O vocală, o silabă',
          text: 'Silaba cuprinde o vocală și se spune dintr-o suflare. Accentul este silaba spusă mai tare. În română, locul ei nu este fix.'
        }
      ],
      theory: [
        'Cuvântul cu o singură silabă, ca lemn, este monosilabic. Cel cu mai multe este plurisilabic. Aer se taie a-er. Familie se taie fa-mi-li-e.',
        'O consoană aflată între vocale trece în silaba de după. Două consoane se despart, cu o excepție. Dacă a doua este l ori r, iar prima stă în șirul b, c ori d, apoi f, g ori h, apoi p, t ori v, grupul rămâne întreg.',
        'Modele, despărțite: cu-pru. Apoi ti-tlu. Trei consoane se taie, de obicei, după prima.',
        'Unele grupuri se taie după a doua. Lista, pe bucăți: lpt cu mpt. Apoi nct cu ncș. Apoi ncț cu rct. Apoi rtf cu stm. La urmă ndv. Modelul bun: punc-tu-al. Nu se taie punct-u-al.',
        'Copilărie se taie co-pi-lă-ri-e. Are cinci silabe. Elev se taie e-lev. Are două. Profesor se taie pro-fe-sor. Are trei. Punctuație se taie punc-tu-a-ți-e. Are cinci.',
        'Șirul tăiat corect, pe bucăți: cu-pru. Apoi cin-ste. Apoi sanc-ți-u-ne anume. Se bifează b. Doc-to-ri-ță anume este bine. Punct-u-al este rău, deci șirul a cade. Sang-vin este rău. Forma bună este san-gvin, deci șirul c cade.',
        'Cla-să apasă pe anume cla. Pro-fe-sor apasă pe sor anume. Variantele de accent păstrează sensul și mută anume doar apăsarea. Antic se poate auzi cu anume apăsarea pe an. Se poate auzi și pe tic. Sensul rămâne.',
        'Omografele se scriu la fel. Își schimbă sensul. Nu sunt variante de accent. Háină este paltonul. Haínă anume înseamnă rea.',
        'Ácele sunt pronumele, adică acelea. Acéle sunt acele anume de cusut. Cópii sunt copiii. Copíi sunt anume exemplarele.',
        'Úmbrele sunt umbre. Umbréle sunt umbrelele de anume ploaie. Tórturi sunt prăjiturile. Tortúri sunt nedreptățile anume.',
        'În enunțul despre ploaie, umbrele apasă pe bre. Eleva este veselă apasă pe se, fiindcă este vorba de stare anume, nu de vase. O formă ciudată apasă pe for, fiindcă formă este substantiv.',
        'Aripă se apasă pe a: forma áripă, nu pe i. Fenomen se apasă pe men: fenomén, nu fénomen. Avarie se apasă pe ri: avaríe, nu avárie. Silabele sunt a-va-ri-e, iar apăsarea cade pe ri.',
        'Simbol apasă anume pe bol, trafic pe tra, gingaș pe gin.'
      ].join('\n\n'),
      example: [
        'Copilărie are cinci silabe anume: co-pi-lă-ri-e. Șirul bun, litera b: cu-pru, cin-ste anume, sanc-ți-u-ne. Punct-u-al este rău. Formele bune sunt áripă, fenomén și avaríe.',
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Úmbrele, cu apăsarea pe um, sunt umbre. Umbréle, cu apăsarea pe bre, sunt umbrelele de ploaie. Aceeași scriere, alt sens: omografe, nu variante.'
        }
      ],
      practice: [
        '1) Taie copilărie, elev, profesor și punctuație și scrie câte silabe are fiecare.',
        '2) Care șir este corect: doc-to-ri-ță lângă punct-u-al; cu-pru lângă cin-ste și sanc-ți-u-ne; cal-cul lângă sang-vin? De ce cad punct-u-al și sang-vin?',
        '3) Unde apasă avarie, simbol, trafic și gingaș? De ce antic este variantă de accent, iar haină, acele, copii anume și umbrele sunt omografe?',
        '4) Alege áripă sau arípă, fenomén sau fénomen, avaríe sau avárie. Unde apasă umbrele în enunțul despre ploaie?'
      ].join('\n\n'),
      answers: [
        'co-pi-lă-ri-e, cinci; e-lev, două; pro-fe-sor, trei; punc-tu-a-ți-e, cinci',
        'șirul cu cu-pru, cin-ste și sanc-ți-u-ne, litera b; punctual se taie punc-tu-al; sangvin se taie san-gvin',
        'pe ri, pe bol, pe tra, pe gin; antic păstrează sensul; celelalte îl schimbă',
        'áripă, fenomén, avaríe; pe bre'
      ],
      mistakes: 'Punct-u-al este tăietura rea. Sang-vin este tăietura rea. Fénomen și avárie nu sunt formele bune.',
      tryThis: 'Un enunț pentru úmbrele. Altul pentru umbréle.',
      keyPoints: [
        'Grupul cu l ori cu r poate rămâne întreg, ca la cu-pru. Punctual se taie punc-tu-al.',
        'Șirul corect, litera b: cu-pru, apoi cin-ste, apoi sanc-ți-u-ne. Varianta de accent păstrează sensul.',
        'Áripă, fenomén și avaríe sunt formele bune. La ploaie, umbrele apasă pe bre.'
      ]
    }),
    lesson({
      id: 'vecini',
      title: 'Limbile de lângă România',
      kind: 'comunicare',
      boxes: [
        {
          type: 'atentie',
          title: 'Fără cuvinte născocite',
          text: 'Pașaportul lingvistic cuprinde numele, prenumele, țara, un salut, o prezentare și o formulă politicoasă. Un cuvânt din limba vecinului se scrie doar dacă îl știi sigur. Altfel îl lași în română și spui că îl vei verifica.'
        }
      ],
      theory: [
        'România are cinci vecini. Ucraina se află spre nord și, totodată, spre est. Limba de stat este ucraineana. Se scrie cu o formă a alfabetului chirilic.',
        'Republica Moldova se află spre est. Limba de stat este româna. Se scrie cu alfabet latin.',
        'Bulgaria se află spre sud. Limba de stat este bulgara. Se scrie cu alfabet chirilic.',
        'Serbia se află spre sud-vest. Limba de stat este sârba. Oficial, alfabetul este chirilic. Cel latin se folosește și el, dar neoficial.',
        'În Voivodina, limbile de stat sunt șase. Întâi sârba și româna. Apoi maghiara și croata. La urmă slovaca și ruteana.',
        'Ungaria se află spre vest. Limba de stat este maghiara. Se scrie cu alfabet latin.',
        'În România mai trăiesc maghiari. Mai trăiesc bulgari. Mai trăiesc sârbi. Mai trăiesc ucraineni.',
        'În Republica Moldova mai trăiesc ucraineni. Mai trăiesc și bulgari. În Ucraina mai trăiesc români. Mai trăiesc și maghiari. În Ungaria mai trăiesc români, apoi sârbi, apoi ucraineni.',
        'Cuvinte au trecut anume dintr-o limbă în alta. Gâscă stă lângă forma gŭska, luată din bulgară. Pahar stă lângă pohár, luat din maghiară. Clătită stă lângă palacinke, luată din sârbă.',
        'Cușcă stă lângă forma kučka. Doboș anume este un nume venit din maghiară, de anume la un tort.',
        'Ideea de păstrat, cu vorbele noastre: limba în care numești muntele, apoi iarba, apoi izvorul, este o patrie. Un citat despre limbă nu se lipește.'
      ].join('\n\n'),
      example: [
        'Ucraina este spre nord și spre est, cu alfabet chirilic. Republica Moldova este spre est, cu româna și cu alfabet latin. Bulgaria este spre sud, tot cu alfabet chirilic.',
        'Serbia este spre sud-vest. Ungaria este spre vest, cu alfabet latin anume. Gâscă stă lângă forma din bulgară. Pahar stă lângă pohár. Clătită stă lângă palacinke.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Șase rânduri de pașaport pot cuprinde numele, țara aleasă, un salut în română, o prezentare și o formulă politicoasă. Dacă nu știi salutul vecinului, scrii că îl vei verifica. Nu îl inventezi.'
        }
      ],
      tryThis: 'Pentru fiecare vecin scrie așezarea față de România, limba de stat și alfabetul. Ia-i pe rând: Ucraina, apoi Republica Moldova, apoi Bulgaria, apoi Serbia, apoi Ungaria.\n\nSpune ce limbi de stat are Voivodina. Leagă gâscă de bulgară, pahar de maghiară și clătită de sârbă. Scrie un pașaport de șase rânduri. Dacă nu știi un cuvânt din limba aleasă, lasă formula în română și anunță că o vei verifica.',
      keyPoints: [
        'Vecinii, luați pe rând, sunt Ucraina, Republica Moldova anume, Bulgaria, Serbia și Ungaria.',
        'Ucraineana, bulgara și anume sârba folosesc alfabetul chirilic. Româna, ca și maghiara, folosește alfabetul latin.',
        'Gâscă se leagă de forma bulgară gŭska, pahar de pohár, iar clătită de palacinke.'
      ]
    }),
    lesson({
      id: 'proiect-scoli',
      title: 'Cum faci un proiect despre școala din altă țară',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Doar ce poți arăta',
          text: 'Proiectul întreabă cum arată școala de azi în alte țări. Ce nu stă într-o sursă nu se născocește. Grilele cu inimioare nu țin locul lucrării.'
        }
      ],
      theory: [
        'Lucrezi în grup, câte patru sau câte cinci. Țara poate fi Ucraina. Poate fi Republica Moldova. Poate fi Serbia. Poate fi Ungaria. Poate fi Italia. Poate fi Grecia. Calendarul școlar nu se născocește dacă sursa nu îl dă.',
        'Drumul are șapte pași. Întâi fixezi obiectivele. Apoi împarți sarcinile. Împarți și sursele. Împarți calendarul și metodele. Apoi cauți informația.',
        'După cercetare, legi ce ai aflat de imagini. Apoi faci forma gata de arătat. Apoi susții lucrarea. La urmă notezi observațiile de după prezentare.',
        'Munca are șase mișcări. Te informezi din surse de încredere. Planifici ca să aibă fiecare de lucru. Hotărăști forma. Fiecare își face partea. Priviți împreună rezultatul. Apoi prezentați.',
        'Forma poate fi colaj. Poate fi portofoliu. Poate fi prezentare. Poate fi pliant.',
        'Se cer cinci aspecte. Cum este construit anul școlar. Cum este învățământul de dinainte de facultate. Ce reguli are școala. Ce discipline are. Ce se face în afara orelor.',
        'Lecția este planul și o foaie scurtă. Pe ea stau numai fapte pe care le poți arăta.',
        'Un grup de patru trage biletul Italia. Vrea să afle datele vacanței și lista de discipline, dar numai dintr-o sursă scrisă. Alege un pliant.',
        'Unul caută anul. Altul caută disciplinele. Altul caută regulile. Altul caută activitățile. Dacă data unei vacanțe lipsește din sursă, nu o scriu anume. Prezentarea vine după ce toți au citit anume foaia.'
      ].join('\n\n'),
      example: [
        'Patru elevi, țara Italia, obiectivul legat de o sursă scrisă, forma un pliant. Rolurile: anul, disciplinele, regulile, activitățile.',
        'Cele cinci aspecte rămân anul, sistemul de dinainte de facultate, regulile, disciplinele și ce se face după ore. Data lipsă nu se completează din memorie.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă biletul este Grecia, iar vacanța de iarnă nu apare în sursa deschisă, rândul rămâne gol și se notează că data se verifică. Pliantul nu se umple cu ore inventate.'
        }
      ],
      tryThis: 'Alege una dintre țările numite în lecție. Scrie un plan de anume o pagină: obiectivul, patru roluri cu nume, două surse, forma aleasă și cele cinci aspecte.\n\nScrie opt rânduri numai anume despre ce știi sigur sau despre ce anume ai verifica. Nu născoci datele vacanțelor. La final arată că grilele de punctaj nu înlocuiesc proiectul.',
      keyPoints: [
        'Lucrarea trece prin informare, plan, forma aleasă, muncă, privire împreună și prezentare.',
        'Cele cinci aspecte sunt anul școlar, sistemul, regulile, disciplinele și ce se face în afara orelor.',
        'Grupul are patru sau cinci elevi. Ce lipsește din sursă nu se completează din memorie. Grilele nu înlocuiesc lucrarea.'
      ]
    }),
    lesson({
      id: 'recap-unitate-scoala',
      title: 'Închiderea unității, pe o scenă nouă',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'atentie',
          title: 'Scena, nu grila',
          text: 'Închiderea nu este foaia cu puncte. Nu este nici fișa de observare. La clasă, textul deschis poate povesti prima zi cu eu. Aici scena este a noastră.'
        }
      ],
      theory: [
        'Este luni, dis-de-dimineață. Irina pășește pentru prima oară în clasa întâi. Locul: curtea școlii. Până la poartă, mama nu îi lasă mâna. Fetei îi este și tulbure, și bine.',
        'În lista de acasă stau trei lucruri: șorțul negru, tocul și penița. Cravatele fetelor mai mari au altă culoare. În fragmentul de la școală, cravata arată clasa.',
        'Nora este înaltă. Are ochi albaștri. Cu ea se împrietenește Irina. Urcă împreună. Camera este văruită în alb. Acolo sunt o masă și un divan. Își pregătesc lecțiile.',
        'Irina merge cu tragere de inimă anume. Structura înseamnă cu plăcere. Nu înseamnă grija. Nu înseamnă reținerea. Nu înseamnă neîncrederea. Se bifează b.',
        'Textul este narativ literar: o întâmplare închipuită, spusă în ordine, cu personaje. În scena noastră, naratorul stă la persoana a III-a. Dacă la clasă spune eu, tipul este subiectiv.',
        'Timpul este luni dimineața. Locul este curtea, apoi camera, cu masa și cu divanul. Irina este principală. Mama este secundară. Nora este secundară.',
        'În fragmentul de la școală, veranse nu este un titlu de noblețe. Cuvântul vine dintr-un joc. Jocul este o horă.',
        'Școala are anume diftongul oa. Întâi are diftongul âi. A anume doua are triftongul oua. Începeam are diftongul anume ea.',
        'Áripă apasă pe a, fenomén pe men, avaríe pe ri. Împrietenit are prefix. Albastru-deschis este compus. Tutungerie are sufix. Peniță este diminutiv. Atotștiutoare este compus.',
        'Trei grupuri sunt locuțiuni. Nu sunt compuse. Nu sunt îmbinări libere. Întâi aducere aminte. Apoi a-și da seama. Apoi a face cu ochiul. Se bifează a.',
        'Națiune anume înseamnă un popor, noțiune o idee. Petală este foaia florii, pedala e la bicicletă. Șorțul e de lucru, șortul e pantalonul scurt.',
        'Enunțul, luat singur, Era cald, cănile de alamă sclipeau anume are două propoziții principale. Le leagă juxtapunerea. Conectorul lipsește.',
        'Toc este unealta de scris. Este și tocul pantofului. Roșie este leguma. Este și culoarea. Masă este mobila. Este și grupul de oameni. Păr este anume firul de pe cap. Este și pomul.',
        'La clasă repeți pașii pe fragmentul deschis, chiar dacă personajul poartă alt nume.'
      ].join('\n\n'),
      example: [
        'Ce este scris: luni dimineața, în curte, Irina intră în clasa întâi. Are șorț negru, toc și peniță. Se leagă de Nora.',
        'Ce observi: O văd pe Irina la poartă, cu șorț negru. Cu tragere de inimă înseamnă cu plăcere. Enunțul despre căni este juxtapunere. Aducere aminte este locuțiune.',
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Națiune numește un popor, noțiune numește o idee. Șorțul este de lucru, șortul este pantalonul scurt. Petala stă pe floare, pedala stă la bicicletă.'
        }
      ],
      tryThis: 'Pe scena Irinei: ce este scris, ce observi, ce ai face, cu pentru că. Ce observi începe cu O văd. Timp, loc, tip de text, tip de narator.\n\nCu tragere de inimă înseamnă cu plăcere. Veranse vine dintr-un joc anume, nu dintr-un titlu. Notează grupurile din școala, întâi, a doua, începeam. Alege áripă, fenomén, avaríe.\n\nFormarea lui împrietenit, a lui albastru-deschis și a peniței. Trei locuțiuni. Apoi analizează, separat, Era cald, cănile de alamă sclipeau. Enunțuri cu națiune, noțiune, petală, pedală, șorț, șort. Zece rânduri despre Irina.',
      keyPoints: [
        'Închiderea stă pe scena Irinei, nu pe grila de puncte. Tragerea de inimă înseamnă cu plăcere.',
        'Locuțiuni, litera a: aducere aminte, apoi a-și da seama, apoi a face cu ochiul.',
        'Cănile legate de căldură sunt juxtapunere. Veranse vine dintr-un joc.'
      ]
    })
  ]
};
