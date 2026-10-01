'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f) {
  return romanaLesson(f);
}

module.exports = {
  lessons: [
    lesson({
      id: 'deschidere',
      title: 'Harta unității',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Cinci coduri',
          text: 'De ținut sunt 1.1 și 2.2, apoi 3.1, 4.5 și 5.1. Le numeri și iese cinci. Foaia le vestește. Ora curentă alege un singur titlu.'
        }
      ],
      theory: [
        'Foaia din deschiderea unității îți arată încotro mergi. Nu ține loc de oră predată. Titlurile vestite sunt propoziția, apoi enunțul, lucrul la dicționar, ideea și, la urmă, planul.',
        'Cinci coduri, adică 1.1, apoi 2.2, apoi 3.1, apoi 4.5, apoi 5.1, îți cer să pricepi, să scrii pe scurt și să îngrijești limba. Un cod nu se închide dintr-o ochire.',
        'Dacă printre titluri stă atributul, iar munca de azi este enunțul, atributul așteaptă. Îl lași până îi vine ceasul. Azi rămâi numai la enunț.',
        'Foaia vestește. Predarea o face ora. Dacă treci cu privirea peste toate titlurile, nu ai străbătut niciun popas. Notezi ce urmează și te oprești la tema zilei.',
        'La fel cu planul de idei. Poate sta scris pe foaie, însă dicționarul poate fi munca de azi. Planul așteaptă. Nu îl tratezi ca pe o treabă gata.',
        'Cele cinci coduri țin unitatea întreagă. 1.1, alături de 2.2, apoi 3.1, 4.5 și 5.1 nu se epuizează într-o singură oră. Fiecare titlu își are rândul.',
        'Un drum bun are ordine. Întâi privești traseul. Apoi alegi popasul zilei. La ieșire știi ce ai lucrat și ce a rămas pe mâine.',
        'Propoziția, enunțul și dicționarul sunt unelte de început. Ideea și planul vin mai încolo. Atributul este anunțat, dar nu se amestecă în tema curentă.',
        'Un coleg poate crede că a isprăvit unitatea dacă a citit foaia. A citit anunțul. Mâine ia titlul următor, nu toate deodată.'
      ].join('\n\n'),
      example: [
        'Ora de azi stă pe enunț. Titlul atributului se vede și el. Îl treci la popasurile de mai târziu și rămâi numai la enunț.',
        'Codurile 1.1 și 2.2, cu 3.1, 4.5 și 5.1, sunt scopul întregului drum. Citirea lor pe foaie nu înseamnă că le-ai și exersat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Azi se lucrează dicționarul. Planul de idei stă anunțat, dar îl amâni. În caiet notezi: azi dicționarul, planul mai târziu. Codurile rămân cinci.'
        }
      ],
      tryThis: [
        'Alcătuiește o propoziție în care intră harta, propoziția, enunțul, dicționarul, ideea și planul.',
        'Mai scrie una despre atribut, despre enunț și despre rând. Pune codul 1.1, codul 2.2, codul 3.1, codul 4.5 și codul 5.1. Arată că ai numărat cinci.',
      ].join('\n\n'),
      keyPoints: [
        'Foaia de deschidere vestește traseul. Ora predă un singur popas.',
        'Lista are cinci coduri: întâi 1.1, pe urmă 2.2, apoi 3.1, după aceea 4.5 și la capăt 5.1.',
        'Atributul anunțat așteaptă, dacă munca de azi este enunțul.'
      ]
    }),
    lesson({
      id: 'norma',
      title: 'Limba standard și abaterea',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Două forme',
          text: 'Forma standard o pricepe toată țara și intră în temă. Abaterea este grai de-acasă sau vorbă veche. O recunoști. Nu o iei în râs.'
        }
      ],
      theory: [
        'În caiet, forma cerută sună eu merg. Când auzi io merg, înțelegi cine vorbește și din ce loc vine graiul. Tema rămâne cu eu.',
        'Într-o povestire, vorba veche poate ieși din gura unui personaj, ca să i se audă ținutul. Nu urcă în titlu. Titlul stă pe forma înțeleasă de toată țara.',
        'Personajul își poate păstra io. Naratorul și tema ta stau pe forma standard. Dacă le amesteci, textul se vede neîngrijit.',
        'Abaterea nu este o stângăcie de care râzi. Este un semn de loc sau de vârstă a vorbirii. O notezi, apoi alegi forma cerută de temă.',
        'Propoziția de temă și replica personajului nu se scriu la fel. La temă: eu merg la școală. În gură de personaj: io merg. Titlul nu primește io.',
        'Când povestești tu întâmplarea, stai pe forma standard. Io apare doar când redai felul cuiva de a vorbi, nu când semnezi titlul ori tema.',
        'O bunică din poveste poate spune io, iar tu, în comentariu, scrii eu. Comentariul este temă. Replica este mască de grai.'
      ].join('\n\n'),
      example: [
        'În caiet pui eu merg la școală, fiindcă tema cere forma standard. În poveste, un bătrân poate rosti io merg, ca să i se audă graiul.',
        'Titlul poate fi Drum spre școală, fără io. Personajul își ține vorba. Tema nu o preia.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Naratorul scrie că băiatul a plecat dis-de-dimineață. Personajul zice: Io merg după apă. Prima frază ține de temă. A doua arată ținutul vorbitorului. Titlul nu o copiază.'
        }
      ],
      practice: [
        '1) În temă alegi eu merg sau io merg?',
        '2) Io merg poate sta în gura personajului, în titlu sau în amândouă?',
        '3) Ce este o abatere și cum o privești?',
        '4) Titlul Drum spre școală poate primi io?'
      ].join('\n\n'),
      answers: [
        'eu merg',
        'doar în gura personajului',
        'grai de-acasă sau vorbă veche, recunoscută fără râs',
        'nu'
      ],
      mistakes: 'Io nu intră în temă și nu intră în titlu. Nu râde de graiul de-acasă. Personajul îl poate păstra, ca să i se audă ținutul.',
      tryThis: [
        'Fă două propoziții. În cea de temă pune exact eu merg. În cea spusă de personaj pune exact io merg.',
        'Adaugă un titlu scurt, în forma standard, din care lipsește io.'
      ].join('\n\n'),
      keyPoints: [
        'Tema stă pe forma înțeleasă în toată țara, de pildă eu merg.',
        'Io rămâne doar în gura personajului. Titlul nu îl primește.',
        'Graiul de-acasă se recunoaște. Nu se ia în râs și nu se mută în temă.'
      ]
    }),
    lesson({
      id: 'puterea',
      title: 'Vorba poate ajuta sau răni',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'O secundă',
          text: 'Înainte să trimiți vorba, faci o pauză scurtă. Te întrebi dacă ea dă timp sau rănește. Alegi varianta care ajută.'
        }
      ],
      theory: [
        'Puterea unei vorbe stă în efect. Poate liniști. Același gând, rostit tare și cu răutate, poate răni. Se schimbă forma, nu omul.',
        'Colegul nu a isprăvit tema. Dacă îl numești lent, îl tai. Dacă îi acorzi un răgaz de două minute și rămâi lângă el, îi dai timp.',
        'Ana face pauza aceea. Apoi îi spune colegului că îi lasă două minute și că stă cu el. Vorba îi face loc să termine. Nu îl face de rușine.',
        'Gluma de după nu închide rana, dacă celălalt a rămas lovit. Râsul tău nu anulează vorba care a tăiat. Forma bună se alege dinainte.',
        'Pe scena aceasta lucrezi în trei timpi. Întâi redai faptele. Apoi spui ce imagine ai. La urmă alegi o faptă a ta și o legi prin pentru că.',
        'La clasă repeți timpii pe textul deschis. Nu sari direct la părere. Faptele vin înaintea hotărârii.',
        'Radu nu este gata să plece. Ioana face pauza, apoi îi spune că îi lasă două minute și că îl așteaptă lângă ușă. Vorba îl liniștește.',
        'Dacă Ioana l-ar numi pe Radu lent, l-ar răni. Răgazul de două minute este ajutor. Eticheta de lent este rană. Gluma nu o vindecă.',
        'Alege vorba pe care ai vrea să o auzi tu când întârzii. Ajutorul se măsoară în timp dat, nu în etichete.'
      ].join('\n\n'),
      example: [
        'Faptele: colegul nu a terminat tema. Ana îi lasă un răgaz de două minute și rămâne lângă el. Imaginea: tema stă între ei, iar Ana nu ridică tonul.',
        'Eu aș aștepta acele două minute, pentru că Ana tocmai i-a dat răgazul. Nu l-aș numi lent.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un coleg a uitat caietul. Vorba de ajutor: îi întinzi o foaie pentru două minute. Vorba care taie: îl numești neatent și râzi. Râsul nu repară eticheta.'
        }
      ],
      tryThis: [
        'Radu nu este gata de drum. Ioana îl așteaptă lângă ușă, cu un răgaz de două minute. Eticheta că este lent ar tăia.',
        'Scrie trei rânduri: faptele, imaginea, apoi ce ai face tu, legat prin pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Faci o pauză scurtă și alegi vorba care dă timp.',
        'Un răgaz de două minute ajută. Eticheta că este lent rănește.',
        'Gluma nu vindecă rana. Întâi faptele, apoi imaginea, apoi hotărârea cu pentru că.'
      ]
    }),
    lesson({
      id: 'afectiv',
      title: 'A înțelege, a exprima, răspunsul afectiv',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Legat de o faptă',
          text: 'Răspunsul afectiv este simțirea de după lectură, prinsă de o faptă din text. Mirarea fără faptă rămâne goală.'
        }
      ],
      theory: [
        'Vorbim ca să dăm o veste, să arătăm o emoție, să cerem iertare, să încurajăm ori să lămurim. După lectură, lauda goală nu ajunge. Arăți fragmentul care te-a oprit și lămurești mirarea.',
        'În snoavă, istețul întoarce socoteala și rostește prețul cu glas tare. Radu se miră, fiindcă el ar fi tăcut. Mirarea lui stă pe fapta aceasta, nu pe o laudă goală.',
        'Snoava sună plăcut. Mesajul rămâne serios: lăcomia se vede când prețul este spus pe față. O formă agreabilă nu golește mesajul.',
        'Lucrezi în trei timpi. Redai faptele. Spui imaginea. Alegi ce ai face și legi hotărârea prin pentru că. La clasă repeți timpii pe textul deschis.',
        'În altă întâmplare, o fată își cere iertare și dă motivul întârzierii. Mihai o îmbărbătează: a priceput. El se miră de adevărul rostit tare, fiindcă el ar fi tăcut.',
        'Și aici forma este blândă, iar mesajul este serios. Iertarea cerută, lămurirea și încurajarea sunt fapte de limbă. Mirarea se leagă de curajul de a spune adevărul.',
        'Dacă scrii doar că ți-a plăcut, nu ai răspuns afectiv. Dacă scrii că te-ai mirat de prețul rostit tare, pentru că tu ai fi tăcut, ai prins emoția de faptă.',
        'Informarea, emoția, scuza, încurajarea și lămurirea pot sta în același text. Le recunoști după ce face vorba, nu după cât de frumos sună.'
      ].join('\n\n'),
      example: [
        'Faptele: istețul întoarce socoteala și rostește prețul tare, iar Radu se miră, fiindcă el ar fi tăcut. Imaginea: socoteala între ei și uimirea lui Radu.',
        'Eu aș sta lângă Radu și aș tăcea, pentru că și el ar fi tăcut. Mesajul serios rămâne, chiar dacă snoava sună plăcut.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Faptele: fata lămurește întârzierea și cere iertare, iar Mihai o încurajează. Imaginea: adevărul spus tare. Eu aș spune că am priceput, pentru că iertarea a venit cu o lămurire.'
        }
      ],
      tryThis: [
        'Fata cere iertare și lămurește întârzierea. Mihai o încurajează. El se miră că adevărul a fost rostit tare.',
        'Scrie trei rânduri: faptele, imaginea, apoi ce ai face tu, prin pentru că. Prinde mirarea de o faptă, nu de formula că ți-a plăcut.'
      ].join('\n\n'),
      keyPoints: [
        'Răspunsul afectiv prinde emoția de o faptă, nu de lauda goală.',
        'Istețul rostește prețul tare. Radu se miră, fiindcă el ar fi tăcut.',
        'Forma poate suna plăcut sau blând. Mesajul poate rămâne serios.'
      ]
    }),
    lesson({
      id: 'canale',
      title: 'Unde ajunge vorba',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Canal',
          text: 'Canalul este drumul vorbei: un mesaj, un forum, chatul, o rețea ori un blog. Locul schimbă lungimea. Bunătatea rămâne aceeași.'
        }
      ],
      theory: [
        'Pe chat scrii puțin. Pe blog poți adăuga și motivul. Pe forum sau pe o rețea păstrezi aceeași grijă: nu rănești. Canalul nu îți dă voie să lovești.',
        'Textul este alcătuit de tine. Nu lipești o bucată gata făcută doar ca să pari isteț. O laudă luată de pe un site rămâne străină.',
        'Ioana vrea să îl îmbărbăteze pe un coleg. În chat scrie scurt: timpul nu s-a isprăvit, iar ea are încredere în el. Două vorbe, ale ei, ajung.',
        'Pe blog ar pune și pricina, tot cu vorbele ei. Ar spune că l-a văzut muncind. Nu ar copia o laudă găsită de-a gata.',
        'O laudă străină nu spune nimic despre colegul tău. De aceea Ioana nu o lipește. Se schimbă locul. Fapta lăudată rămâne a lui.',
        'Grija crește când textul rămâne scris. Pe chat, scurt nu înseamnă tăios. Pe blog, lung nu înseamnă copiat. Oriunde, regula este să nu rănești.',
        'Ca să încurajezi, pe chat folosești timp și cred. Pe blog folosești pentru că și încurajez. Ambele texte îți aparțin.',
        'Forum, rețea, chat și blog sunt uși diferite. Pe toate intră aceeași vorbă bună, scrisă de mâna ta.',
        'Înainte să trimiți, recitești o dată. Dacă fraza ar putea răni, o schimbi. Dacă este luată de pe un site, o scrii din nou, cu o faptă a colegului.',
        'Lungimea se alege după loc. Bunătatea nu se negociază. Un mesaj scurt și o pagină de blog pot spune același ajutor, dacă ambele sunt ale tale.'
      ].join('\n\n'),
      example: [
        'Chatul Ioanei sună așa: Încă ai timp. Eu cred în tine. Pe blog ar adăuga pricina, tot cu vorbele ei, fără o laudă luată de pe un site.',
        'Lauda copiată rămâne străină. Ea nu o lipește nici în chat, nici pe blog, nici pe forum.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pe forum, Radu scrie două rânduri: ai timp și eu cred în tine. Pe blog lămurește că a văzut munca. Nu ia o frază gata de pe un site ca să pară isteț.'
        }
      ],
      tryThis: [
        'Fă un mesaj scurt de chat. În el să apară timp, apoi cred. După aceea alcătuiește două fraze de blog, cu pentru că și cu încurajez.',
        'Nu lua o laudă de pe un site. Textele rămân ale tale.'
      ].join('\n\n'),
      keyPoints: [
        'Locul schimbă lungimea: chatul este scurt, blogul poate spune și pricina.',
        'Textul rămâne scris de tine. Lauda luată de pe un site este străină.',
        'Pe orice canal, vorba se abține să rănească.'
      ]
    }),
    lesson({
      id: 'lectura-continua',
      title: 'Citești până la capăt',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Firul întâi',
          text: 'Citești cerința, apoi întâmplarea până la punct. Vorba necunoscută se caută după fir, nu înainte. Dicționarul nu înlocuiește scena.'
        }
      ],
      theory: [
        'Lectura continuă înseamnă să nu te oprești la fiecare vorbă grea. La prima trecere cauți cine vorbește, ce urmărește și unde se rupe lucrul.',
        'Te așezi lângă oameni ca să vezi ce li se întâmplă. Dacă închizi volumul la prima vorbă necunoscută, pierzi întâmplarea.',
        'Întâmplarea lui Mihai: un flămând cere pâine, iar prețul cerut de vânzător este nedrept. Mihai parcurge întâi cerința și nu se oprește înainte de punct.',
        'O vorbă din primele rânduri îi este necunoscută. Volumul rămâne deschis. Abia după fir caută doar vorba care încă îi închide sensul.',
        'Trei timpi. Redai faptele. Spui imaginea. Alegi ce ai face și legi hotărârea prin pentru că. La clasă îi faci după ce ai dus textul până la capăt.',
        'La Ana, dialogul se citește întreg, după cerință, până la punct. O fată cere apă. Paznicul trântește poarta fără dreptate. O vorbă nouă se aude, dar Ana nu se oprește la ea.',
        'După fir, Ana caută în dicționar numai acea vorbă. Restul îl are: cine vrea apă, cine închide poarta, ce este nedrept.',
        'Dicționarul este al doilea pas. Primul este întâmplarea. Dacă schimbi ordinea, rămâi cu o definiție și fără poveste.',
        'Notează pe margine cine vrea ceva și cine se opune. Abia apoi încercuiești vorba grea. Așa firul rămâne întreg, iar căutarea rămâne scurtă.',
        'Dacă oprești cartea la primul obstacol, prețul nedrept și poarta închisă rămân necunoscute. Lectura continuă le păstrează în minte.'
      ].join('\n\n'),
      example: [
        'Faptele: pâinea este cerută de un flămând, iar vânzătorul pune un preț nedrept. Mihai ține volumul deschis până la punct.',
        'Imaginea: omul, pâinea, vânzătorul, Mihai și cartea. Eu aș sta lângă omul flămând, pentru că prețul este nedrept.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Faptele: fata vrea apă, paznicul închide poarta fără dreptate. Imaginea: poarta închisă și ulciorul. Eu aș deschide poarta, pentru că setea nu se judecă după o vorbă nouă.'
        }
      ],
      tryThis: [
        'Ana duce dialogul până la punct. Fata vrea apă. Paznicul închide poarta fără dreptate. Vorba nouă se caută după fir.',
        'Scrie trei rânduri: faptele, imaginea, apoi ce ai face tu, prin pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Cerința și firul merg înaintea dicționarului.',
        'Prima trecere urmărește vorbitorul, dorința și ruptură.',
        'Volumul nu se închide la o vorbă nouă. O cauți doar dacă sensul rămâne încuiat.'
      ]
    }),
    lesson({
      id: 'jurnal-dublu',
      title: 'Jurnalul dublu',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Două coloane',
          text: 'Desparți foaia cu o linie dreaptă. În stânga stau bucăți din text. În dreapta stă motivul. Coloana din dreapta nu rămâne goală.'
        }
      ],
      theory: [
        'Jurnalul dublu cere măcar trei bucăți în stânga: un citat scurt, o secvență sau o vorbă care te-a oprit. O singură vorbă nu ajunge.',
        'Coloana din dreapta primește pricina. Poate fi o idee, o emoție, o amintire, o punte spre altă materie ori o întrebare care te urmărește.',
        'Poți reveni asupra textului ca să alegi mai cu grijă. Jurnalul se ține din trei asemenea rânduri. Dacă dreapta este goală, ai o listă, nu un jurnal.',
        'Ana trasează linia. În stânga pune prețul uriaș, masa mică și vorba socoteală. Trei bucăți, nu una.',
        'În dreapta notează revolta: farfuria abia ținea mâncarea, iar nota de plată era uriașă. La matematică ar fi vrut să vadă calculul.',
        'Adaugă o amintire și o curiozitate. Dreapta se umple. Emoția, legătura cu matematica și amintirea stau fiecare lângă bucata ei.',
        'Scena de lucru, pe scurt: farfuria abia umplută, nota uriașă, Ana cere socoteala și se revoltă. Din ea alegi trei bucăți.',
        'La urmă, despre textul tău, închei cu eu aș și cu pentru că. Jurnalul arată și ce ai face, nu doar ce ai mutat în stânga.',
        'Citatul din stânga este scurt. Nu copia un alineat întreg. Dreapta trebuie să fie a ta, cu pricina alegerii.',
        'Dacă nu știi de ce ai ales o bucată, o schimbi. Jurnalul arată o alegere, nu o copie oarbă.'
      ].join('\n\n'),
      example: [
        'Faptele: Ana desparte foaia cu o linie dreaptă. În stânga stau prețul uriaș, masa mică și socoteala. În dreapta stă revolta: farfuria era săracă, nota era uriașă.',
        'Imaginea: foaia, linia, masa mică și prețul uriaș. Eu aș sta lângă Ana, pentru că socoteala nu se potrivește cu masa.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Stânga: farfurie mică, preț uriaș, a cerut socoteala. Dreapta: m-am mirat, la matematică aș verifica suma, îmi amintesc o notă neclară. Dreapta nu rămâne goală.'
        }
      ],
      tryThis: [
        'Trasează o linie dreaptă. Scena: farfuria abia umplută, nota uriașă, Ana cere socoteala și se revoltă.',
        'În stânga pui trei bucăți. În dreapta scrii pricina. La urmă: eu aș, apoi pentru că. Dreapta nu rămâne goală.'
      ].join('\n\n'),
      keyPoints: [
        'Stânga are măcar trei bucăți. Dreapta dă pricina și nu rămâne goală.',
        'Pricina poate fi idee, emoție, amintire, altă materie sau curiozitate.',
        'La Ana, masa mică stă lângă socoteala uriașă, iar la matematică ar cere calculul.'
      ]
    }),
    lesson({
      id: 'nedreptate',
      title: 'Iei atitudine și pentru altul',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Fără țipăt',
          text: 'Aperi pe cineva și când vina nu cade pe tine. Spui ce ai văzut, cu glas liniștit. Nu țipi. Cauți o ieșire dreaptă.'
        }
      ],
      theory: [
        'Atitudinea pentru altul înseamnă să aperi un om lovit pe nedrept, chiar dacă răul nu te-a atins pe tine. Dacă taci, nedreptatea rămâne în picioare.',
        'Numești fapta nedreaptă și cauți o ieșire dreaptă. Glasul stă jos. Strigătul nu face dovada mai tare.',
        'Un coleg este acuzat, fără temei, că el a rupt rigla. Tu știi că lemnul era crăpat dinainte. Nu ești tu cel pus sub învinuire. Totuși spui ce ai văzut.',
        'Ieșirea dreaptă: arăți rigla și ceri să fie controlată. Nu muți vina pe un alt nume. Pui faptul pe masă.',
        'Eroul drag din povești rămâne în amintire și prin apărarea altuia, nu numai prin poantă. Gestul cântărește cât gluma.',
        'Trei timpi. Redai faptele. Spui imaginea. Alegi ce ai face și legi hotărârea prin pentru că. La clasă repeți timpii pe textul deschis.',
        'O colegă este acuzată că a vărsat apa. Tu știi că paharul se spărsese mai devreme. Nu ești tu acuzată. Spui asta cu glas liniștit.',
        'Propui să ștergeți banca amândouă. Ajutorul nu ține loc de adevăr. Întâi spui de paharul spart dinainte. Apoi ștergeți.',
        'Istețul din snoavă face un gest înrudit: ia partea celui lovit pe nedrept și nu strigă. Rămâne fapta, nu doar zâmbetul.',
        'Verificarea riglei și ștersul băncii sunt căi drepte. Ambele pornesc de la ce ai văzut, nu de la o bănuială nouă.'
      ].join('\n\n'),
      example: [
        'Faptele: colegul este acuzat de rigla ruptă, însă tu știi că lemnul era crăpat dinainte. Ieșirea dreaptă este să arăți rigla, fără strigăt.',
        'Imaginea: rigla crăpată, colegul lângă ea. Eu aș întinde rigla fără să ridic glasul, pentru că spărtura era veche.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Faptele: colega este acuzată de apa de pe bancă, dar paharul se spărsese mai devreme. Imaginea: cioburi vechi. Eu aș spune asta încet și aș șterge banca împreună cu ea.'
        }
      ],
      tryThis: [
        'O colegă este acuzată de apa vărsată. Tu știi că paharul se spărsese mai devreme. Nu ești tu acuzată. Propui să ștergeți banca amândouă.',
        'Scrie trei rânduri: faptele, imaginea, apoi ce ai face tu, prin pentru că. Glasul rămâne liniștit.'
      ].join('\n\n'),
      keyPoints: [
        'Aperi și când răul nu este al tău. Tăcerea lasă nedreptatea în picioare.',
        'Rigla era crăpată dinainte. Paharul se spărsese mai devreme. O spui fără strigăt.',
        'Ieșirea dreaptă este controlul riglei sau ștersul băncii, nu o vină nouă.'
      ]
    }),
    lesson({
      id: 'personaj',
      title: 'Personaj sau persoană',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Două etichete',
          text: 'Personajul face fapte închipuite, într-o povestire născocită. Persoana a trăit sau trăiește și lasă un an, un oraș ori o meserie. Rolurile nu se amestecă.'
        }
      ],
      theory: [
        'La magazin nu dai de un personaj: el nu a avut viață în lumea reală. Persoana poate fi căutată într-o carte de istorie. Snoava nu este singurul ei loc.',
        'Este persoană omul dintr-o știre, omul din familia ta și cântărețul care este în viață. Poetul veacului al XIX-lea este și el persoană: are an și poate fi căutat.',
        'Istețul din snoavă, cel care răstoarnă o socoteală nedreaptă, este personaj. Unele povești îi spun Păcală. Nu are loc de naștere. Rămâne născocit.',
        'Bunicul care îți povestește snoava stă lângă tine, deci este persoană. Unul este făcut de povești. Celălalt trăiește. Etichetele stau despărțite.',
        'Folclorul născocește personaje. Eroul snoavei, fără niciun loc de naștere, rămâne personaj. Socoteala răsturnată nu îi dă viață reală.',
        'La o imagine, eticheta urmează ce se vede. Nici statuia, nici desenul din carte nu îl mută pe eroul născocit între oamenii reali.',
        'Mama trăiește acum, în orașul ei, și are o meserie: persoană. Cântărețul despre care vorbește știrea de azi este și el persoană. Statuia din poză nu schimbă eticheta eroului.',
        'Pe scena cu bunicul și cu istețul lucrezi în trei timpi. Redai faptele. Spui imaginea. Alegi ce ai face și legi hotărârea prin pentru că.',
        'La clasă repeți timpii pe textul deschis. Întâi desparți pe cine trăiește de cine este născocit. Abia apoi pui eticheta.'
      ].join('\n\n'),
      example: [
        'Faptele: bunicul stă lângă tine și spune o snoavă. Istețul, numit în unele povești Păcală, răstoarnă o socoteală nedreaptă și nu are loc de naștere.',
        'Imaginea: bunicul, istețul, socoteala. Eu aș asculta lângă bunic, pentru că el este aici, viu. Istețul rămâne personaj.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Poetul veacului al XIX-lea s-a născut într-un an cunoscut și poate fi căutat în istorie: persoană. Un desen cu Păcală nu îl trece între persoane. Imaginea nu mută eticheta.'
        }
      ],
      tryThis: [
        'Mama are oraș și meserie. Cântărețul din știrea de azi este în viață. Eroul de folclor face o faptă născocită. Statuia din poză nu îl trece între oameni reali.',
        'Scrie trei rânduri: faptele, imaginea, apoi ce ai face tu, prin pentru că. Pune eticheta potrivită fiecăruia.'
      ].join('\n\n'),
      keyPoints: [
        'Personajul este născocit. Persoana lasă un an, un oraș sau o meserie.',
        'Bunicul este persoană. Istețul snoavei, chiar dacă i se spune Păcală, este personaj.',
        'Statuia și desenul nu dau viață reală eroului fără loc de naștere.'
      ]
    }),
    lesson({
      id: 'replica',
      title: 'Cine a spus replica',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Contextul întâi',
          text: 'Replica aparține celui care o rostește. Nu o dai celui mai des întâlnit. Te uiți la vorba dinainte și la ce cere rândul nou.'
        }
      ],
      theory: [
        'Orice replică are un rostitor real. Nu câștigă rolul cu șirul cel mai lung. Câte rânduri are cineva nu îi dă și vorbele altuia.',
        'Poate fi o întrebare pusă de judecător, o mirare sau o scuză. Numele vine abia după rost. Contextul stă înaintea numelui.',
        'Judecătorul vrea să afle cine a intrat. Musafirul răspunde mirat. Mirarea vine după întrebare, deci primul rând este al judecătorului.',
        'Vânzătorul umple mai multe rânduri. Întrebarea nu este a lui. Scuza care urmează ține de cele petrecute, nu de cine a vorbit mai mult.',
        'Trei timpi. Redai faptele. Spui imaginea. Alegi ce ai face și legi hotărârea prin pentru că. La clasă repeți timpii pe dialogul deschis.',
        'La masă, Ana caută paharul printr-o întrebare. Radu răspunde cu o scuză. Scuza stă imediat după întrebare, deci îi aparține lui Radu.',
        'Ioana vorbește cel mai mult. Paharul nu a fost cerut de ea. Numele iese din context, nu din lungimea rolului.',
        'Dacă numeri rândurile și îl alegi pe cel mai vorbăreț, greșești. Întrebarea și răspunsul se țin unul de altul.',
        'Un dialog se citește perechi: cine întreabă, cine răspunde. Perechea bate socoteala rândurilor.',
        'Mirarea, scuza și întrebarea sunt rosturi, nu decor. Le legi de omul care le spune, apoi abia scrii numele.',
        'Dacă doi colegi aleg nume diferite, se uită din nou la rândul dinainte. Acolo stă dovada, nu în cine are textul mai lung.'
      ].join('\n\n'),
      example: [
        'Faptele: judecătorul vrea să afle cine a intrat, iar musafirul răspunde mirat. Vânzătorul are rânduri multe, dar întrebarea nu este a lui.',
        'Imaginea: judecătorul, musafirul, vânzătorul. Eu i-aș răspunde judecătorului, pentru că el a deschis vorba.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ana caută paharul. Radu spune că îi pare rău, fiindcă l-a mutat el. Ioana povestește lung despre masă, fără să ceară paharul. Scuza rămâne a lui Radu.'
        }
      ],
      tryThis: [
        'Ana caută paharul printr-o întrebare. Radu răspunde cu o scuză. Ioana are cele mai lungi replici, dar paharul nu a fost cerut de ea.',
        'Scrie trei rânduri: faptele, imaginea, apoi ce ai face tu, prin pentru că. Numele iese din context.'
      ].join('\n\n'),
      keyPoints: [
        'Rostitorul se ia din vorba dinainte, nu din lungimea rolului.',
        'Judecătorul deschide cu cine a intrat. Mirarea este a musafirului.',
        'Scuza pentru pahar este a lui Radu, deși Ioana vorbește mai mult.'
      ]
    }),
    lesson({
      id: 'alte-culturi',
      title: 'Istețul din alte povești',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Rol, nu nume',
          text: 'Istețul îi prinde pe zgârciți cu vorba. Nu este doar al nostru. Compari rolul. Nu spui că doi eroi sunt un singur om.'
        }
      ],
      theory: [
        'Prin Balcani umblă snoave în care apare Nastratin Hogea. Nu memorezi o viață de om. Reții că gluma înțeleaptă are frați și trece hotarul.',
        'În snoava de la noi, istețul pedepsește lăcomia printr-o socoteală întoarsă pe dos. Unele povești îl numesc Păcală. Fapta contează, nu un act de naștere.',
        'Rolul lui Nastratin Hogea se apropie de rolul istețului de la noi. Nu sunt unul și același om. Numele rămân deosebite. Spui doar că seamănă.',
        'Doi eroi apropiați au roluri apropiate. Amestecul de nume strică comparația. Păcală rămâne Păcală. Nastratin Hogea rămâne Nastratin Hogea.',
        'Trei timpi. Redai faptele. Spui imaginea. Alegi ce ai face și legi hotărârea prin pentru că. La clasă repeți timpii fără să reciți o biografie.',
        'Gluma înțeleaptă trece hotarul fiindcă lăcomia se pedepsește la fel: cu vorba, printr-o socoteală întoarsă. Locul se schimbă. Rolul se recunoaște.',
        'La noi, istețul îi prinde pe zgârciți prin vorbă. În snoavele balcanice, Nastratin Hogea poartă un rol vecin. Tu spui că seamănă. Nu spui că sunt una.',
        'O comparație bună are două nume și un rol comun. Dacă lipești numele, ai făcut din doi oameni unul care nu există.',
        'Nu cere nimeni anul nașterii lui Nastratin Hogea. Cere rolul: pedepsește lăcomia cu o socoteală întoarsă, ca istețul nostru.',
        'Păcală, când apare numele, rămâne al snoavei noastre. Nastratin Hogea rămâne al Balcanilor. Hotarul se trece prin glumă, nu printr-un singur nume.'
      ].join('\n\n'),
      example: [
        'Faptele: istețul pedepsește lăcomia printr-o socoteală întoarsă pe dos. Nastratin Hogea seamănă la rol. Ei nu sunt același om.',
        'Imaginea: istețul cu socoteala și Nastratin Hogea, fiecare cu numele lui. Eu aș sta lângă isteț, pentru că el întoarce socoteala.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Amândoi prind lăcomia cu vorba. Unul este istețul snoavei noastre, pe care unele povești îl numesc Păcală. Altul este Nastratin Hogea. Viața lor nu se învață pe dinafară.'
        }
      ],
      tryThis: [
        'Istețul de la noi îi prinde pe zgârciți cu vorba. Nastratin Hogea are un rol apropiat în Balcani. Numele rămân deosebite.',
        'Scrie trei rânduri: faptele, imaginea, apoi ce ai face tu, prin pentru că. Arată asemănarea de rol și păstrează numele despărțite.',
      ].join('\n\n'),
      keyPoints: [
        'Compari rolul istețului cu rolul lui Nastratin Hogea. Nu le amesteci numele.',
        'Lăcomia se pedepsește printr-o socoteală întoarsă. Gluma înțeleaptă trece hotarul.',
        'Nu memorezi o biografie. Spui că seamănă.'
      ]
    }),
    lesson({
      id: 'dictionar',
      title: 'Ce cauți în fiecare dicționar',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei uși',
          text: 'DEX dă sensul. DOOM verifică scrierea și rostirea. Dicționarul cultural, zis și enciclopedic, lămurește persoane, obiceiuri și cărți.'
        }
      ],
      theory: [
        'Dicționarul explicativ răspunde la înțeles. Fiecare cuvânt are articolul lui. În articol găsești titlul, clasa cuvântului și înțelesurile.',
        'La clasele mici, caseta de vocabular este același articol, doar mai scurt. Înțelesul se potrivește cu fraza. Nu îl apuci pe cel dintâi, din obișnuință.',
        'Carte poate fi un volum sau o piesă cu care joci. Când spui că deschizi volumul și cauți numărul 4, rămâne volumul. Piesa de joc nu încape.',
        'DOOM înseamnă dicționarul ortografic, ortoepic și morfologic. Acolo stau scrierea și rostirea. DEX este dicționarul de sensuri și dă înțelesul. Nu le schimbi una cu alta.',
        'Litera de care te îndoiești se verifică în DOOM, după norma de scriere. Tot acolo se verifică cratima. Istoria cuvântului nu ajută. Nici întrebarea despre ce simți.',
        'Înțelesul deja cunoscut rămâne pe loc. Se schimbă doar înfățișarea literelor. Cratima ține de formă, nu de emoție.',
        'Dicționarul cultural, zis enciclopedic, lămurește scurt un lucru de cultură: persoane, obiceiuri, cărți. Nu îl deschizi pentru cratima unui verb. Acolo stau lucruri și oameni, nu litere.',
        'Culegătorul de povești își are locul în dicționarul cultural. Pentru verbul a semăna deschizi dicționarul de cuvinte. Fiecare întrebare are ușa ei.'
      ].join('\n\n'),
      example: [
        'Când spui că deschizi volumul și cauți numărul 4, alegi sensul de volum. Sensul de piesă de joc nu încape. Cratima nesigură se caută în DOOM. Sensul rămâne cel din DEX.',
        'Culegătorul de povești stă în dicționarul cultural. Verbul a semăna stă în dicționarul de cuvinte.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Vrei să știi dacă un verb cere cratimă. Nu deschizi enciclopedia și nu întrebi ce simți. Deschizi DOOM. Sensul știut din DEX nu se mută odată cu litera.'
        }
      ],
      practice: [
        '1) Unde cauți cratima unui verb: în DOOM, în DEX sau în dicționarul cultural?',
        '2) Unde cauți un culegător de povești?',
        '3) Unde cauți verbul a semăna și ce îți dă DEX?',
        '4) Când deschizi volumul și cauți numărul 4, ce sens are carte: volumul sau piesa de joc?'
      ].join('\n\n'),
      answers: [
        'în DOOM',
        'în dicționarul cultural, zis și enciclopedic',
        'în dicționarul de cuvinte; DEX dă sensul',
        'volumul'
      ],
      mistakes: 'Nu schimba DOOM cu DEX. Cratima nu se caută după ce simți și nu se caută în dicționarul cultural. Nu lua primul sens din reflex.',
      tryThis: [
        'Scrie trei propoziții. În prima apar DEX, sensul și verbul a semăna. În a doua apar DOOM și cratima.',
        'În a treia apar dicționarul cultural, cel enciclopedic, și un culegător de povești. Spune ce sens alegi când deschizi volumul la numărul 4: volumul.'
      ].join('\n\n'),
      keyPoints: [
        'Articolul are titlu, felul cuvântului și sensuri. Sensul se alege după frază.',
        'DOOM ține scrierea, rostirea și cratima. DEX ține sensul.',
        'Oamenii de cultură stau în dicționarul enciclopedic. Verbul a semăna stă la cuvinte.'
      ]
    }),
    lesson({
      id: 'carte-film',
      title: 'Cartea și filmul',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'O deosebire clară',
          text: 'Pui chipul din lectură lângă chipul de pe ecran. Numești un gest sau o fire, cu o deosebire limpede. Nu te oprești la formula că ți-a plăcut.'
        }
      ],
      theory: [
        'Același erou poate ieși altfel pe ecran decât ți l-ai închipuit. Comparația pune chipul din lectură lângă chipul din film. Ajunge un singur punct, dacă este precis.',
        'Desenul pleacă de la fapta din text, nu de la o întâmplare. Portretul iese din fapte. O siluetă luată la nimereală nu este comparație.',
        'Ioana, după ce a citit, îl vede înalt, cu zâmbet. Pe ecran, același om este scund, cu fața serioasă, și aproape că nu scoate o vorbă. Asta este deosebirea.',
        'Lăcomia celuilalt nu se schimbă nici în volum, nici pe ecran. Ioana compară gestul. Nu se oprește la vorba că i-a plăcut. Ce a rămas la fel se spune separat.',
        'Trei timpi. Redai faptele. Spui imaginea. Alegi ce ai face și legi hotărârea prin pentru că. La clasă repeți timpii pe textul citit și pe scena văzută.',
        'La citit, Radu îi dă eroului grabă și o mână sus. Pe ecran, omul stă locului și tace. Deosebirea este graba față de tăcere.',
        'Blândețea fetei nu se schimbă nici în volum, nici pe ecran. Radu desenează după fapta din text, mâna ridicată, nu după o poză întâmplătoare.',
        'O comparație slabă spune doar că ți-a plăcut. Una bună numește un gest schimbat și, dacă există, o fire care a rămas.'
      ].join('\n\n'),
      example: [
        'Faptele: după lectură, Ioana îl vede înalt și zâmbitor. Pe ecran el este scund, serios, aproape mut. Imaginea: două chipuri ale aceluiași erou.',
        'Eu aș privi filmul lângă Ioana, pentru că pe ecran omul este scund și tăcut. Aș adăuga că lăcomia celuilalt a rămas.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Radu desenează eroul cu mâna ridicată, fiindcă așa face în text. În film, același erou stă nemișcat. Fata rămâne blândă în ambele. Comparația are o deosebire și o asemănare.'
        }
      ],
      tryThis: [
        'La citit, eroul lui Radu are grabă și mâna sus. Pe ecran stă locului și tace. Blândețea fetei nu se schimbă.',
        'Scrie trei rânduri: faptele, imaginea, apoi ce ai face tu, prin pentru că. Spune o deosebire limpede, nu doar că ți-a plăcut.'
      ].join('\n\n'),
      keyPoints: [
        'Compari un gest sau o fire și spui limpede ce s-a schimbat între lectură și ecran.',
        'La Ioana, eroul înalt și zâmbitor ajunge scund, serios și tăcut. Lăcomia celuilalt rămâne.',
        'Desenul pornește din fapta din text. Portretul nu se ia la nimereală.'
      ]
    }),
    lesson({
      id: 'enunt',
      title: 'Enunțul, tipurile și semnul final',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Semnul arată scopul',
          text: 'Enunțul este o vorbire întreagă. Stă între două pauze. La capăt are un semn, care arată scopul și intonația. Fără semn rămâne neterminat.'
        }
      ],
      theory: [
        'Asertivul dă o informație și se închide cu punct. Caietul este pe bancă, urmat de punct, spune o stare de fapt. Scopul este să înștiințeze.',
        'Interogativul întreabă și ia semnul întrebării. Adu caietul, închis cu semnul întrebării, nu mai este poruncă. Aceleași cuvinte au alt scop.',
        'Exclamativul arată o emoție și ia semnul exclamării. Ce caiet frumos, urmat de semnul exclamării, este exclamativ. Nu cere nimic. Arată uimire.',
        'Imperativul dă o poruncă și ia tot semnul exclamării. Adu caietul, urmat de semnul exclamării, este imperativ. Semnul coincide. Scopul diferă: emoție sau poruncă.',
        'Semnul poate muta scopul acelorași cuvinte. Adu caietul cu semnul exclamării este poruncă. Adu caietul cu semnul întrebării este întrebare. Fără semn, ambele rămân neterminate.',
        'La clasă recunoști tipul după scop, apoi pui semnul. Punctul ține de informare. Semnul întrebării ține de întrebare. Semnul exclamării ține de emoție și de poruncă, cu scop diferit.',
        'Intonația se aude. Semnul o fixează pe foaie. Dacă lipsește, cititorul nu știe dacă înștiințezi, întrebi, te miri sau poruncești.'
      ].join('\n\n'),
      example: [
        'Caietul este pe bancă, cu punct, este asertiv. Adu caietul, cu semnul exclamării, este imperativ. Ce caiet frumos, cu semnul exclamării, este exclamativ.',
        'Adu caietul, cu semnul întrebării, mută porunca în întrebare. Dacă nu pui niciun semn, enunțul rămâne neterminat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ușa este închisă, cu punct, înștiințează. Închide ușa, cu semnul exclamării, poruncește. Ce ușă grea, cu semnul exclamării, arată emoție. Închide ușa, cu semnul întrebării, întreabă.'
        }
      ],
      practice: [
        '1) Ce tip este Caietul este pe bancă, închis cu punct, și ce scop are?',
        '2) Ce tip este Adu caietul, urmat de semnul exclamării?',
        '3) Ce tip este Ce caiet frumos, cu semnul exclamării, și prin ce diferă de o poruncă?',
        '4) Ce devine Adu caietul dacă semnul de la urmă este semnul întrebării?'
      ].join('\n\n'),
      answers: [
        'asertiv; înștiințează',
        'imperativ',
        'exclamativ; arată uimire, nu dă o poruncă',
        'interogativ, adică întrebare'
      ],
      mistakes: 'Exclamativul și imperativul iau același semn, dar scopul diferă. Fără semn, enunțul rămâne neterminat. Semnul întrebării pus pe o poruncă îi mută scopul.',
      tryThis: [
        'Scrie patru enunțuri, fiecare cu semnul potrivit. Pentru informare: Caietul este pe bancă, cu punct. Pentru întrebare: Adu caietul, cu semnul întrebării.',
        'Pentru uimire: Ce caiet frumos, cu semnul exclamării. Pentru poruncă: Adu caietul, tot cu semnul exclamării.'
      ].join('\n\n'),
      keyPoints: [
        'Enunțul stă între două pauze și se închide cu semnul care îi arată scopul.',
        'Asertivul ia punctul. Interogativul ia semnul întrebării.',
        'Exclamativul și imperativul iau semnul exclamării: unul pentru uimire, altul pentru poruncă.'
      ]
    })
  ]
};
