'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f) {
  return romanaLesson(f);
}

module.exports = {
  lessons: [
    lesson({
      id: 'stil',
      title: 'Firească, scurtă, armonioasă',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Stylos',
          text: 'Stilul vine de la grecescul stylos. E felul în care scrii și vorbești. Când ideile stau bine, textul se citește cu plăcere.'
        }
      ],
      theory: [
        'Stilul e un chip anume de a te rosti, cu uneltele limbii. Trei calități le ai deja. Adecvarea: vorbele se potrivesc cu tema, cu intenția și cu efectul asupra cititorului.',
        'Proprietatea: un cuvânt spune exact ideea. Puritatea, împreună cu potrivirea la situație, cere limba standard, registrul bun și forma corectă. Fără ele, fraza sună străin de locul în care stă.',
        'Mai sunt cinci. Originalitatea arată ideea într-un chip nou și ține de creativitatea autorului. Varietatea schimbă vorba, ca să nu repeți mereu același cuvânt. Naturalețea sună firesc și armonios.',
        'Eufonia e armonia sunetelor puse laolaltă. Ca s-o păstrezi, ocolești repetarea supărătoare, pleonasmul, cacofonia și dezacordul. Concizia lasă numai termenii de care ai nevoie și nu iese din temă.',
        'Trei texte de-ale noastre. A: Toamna, copacii îngălbenesc. Sună natural și e scurt. B: Zâna toamnă așază pe copaci o mantie ruginie, apoi pleacă împreună cu frunzele. E original, fiindcă anotimpul devine persoană, și are varietate.',
        'C: Pe fațadă, panoul repetă motivul cu păun. Informează, e scurt și natural. Eufonia se vede când sunetele nu se ciocnesc: îngălbenesc stă bine. Cacofonia ar fi o ciocnire de tipul ca ca, pe care o eviți.',
        'La clasă, aceleași întrebări cad pe trei fragmente: o poezie cu un vultur, o proză cu un vultur și un text despre panouri neoromânești. Poezia și proza pot mișca, fiindcă au imagine. Textul despre panouri doar informează.',
        'Fapte din strada bucureșteană, în Enigma Otiliei, de George Călinescu. Casele sunt scunde. Aproape niciuna nu are un cat peste parter. Varietatea o aduc, de obicei, zidari veniți din Italia. Ferestrele par mari față de clădirile joase.',
        'Frontoanele amintesc de Grecia, ogivele sunt din var ori din lemn dat cu vopsea. Umezeala desprinde varul. Lemnul se umflă când se usucă. Strada imită, strâmb, una italiană. Casa are un cat, iar parterul e scund.',
        'Geamurile, pătrate, stau acoperite cu o hârtie care lasă lumina și imită vitraliul unei catedrale. Inspirația e arhitectura italiană. Dezghioca înseamnă a coji. Ciubucăria e ornamentul în relief de pe zid.',
        'Frontonul e triunghiul de deasupra unei intrări. Vitraliul e geamul colorat. Autorul alege termenii aceștia fiindcă numesc piesa exact. Asta e proprietatea. Podoabă, în loc de ciubucărie, pierde piesa. La textul tău, tai o repetare dacă ai pus-o.'
      ].join('\n\n'),
      example: [
        'Toamna, copacii îngălbenesc e natural și scurt. Zâna toamnă e originală. Eufonia cere armonie și ocolește ciocnirea de sunete.',
        'În Enigma Otiliei, casa are un cat, iar parterul e scund. Geamurile stau sub hârtie. Strada se inspiră din Italia. A dezghioca înseamnă a coji.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pleonasmul ar fi a coborî în jos. Cacofonia ar fi ca calul. Concizia taie vorba de prisos. Originalitatea face din toamnă o persoană, nu doar un anotimp.'
        }
      ],
      tryThis: 'Dă definiția pentru originalitate, naturalețe, eufonie, varietate și concizie. La textele A, B și C, numește câte două calități. Spune trei piese ale străzii din Enigma Otiliei și sensul lui dezghioca, al ciubucăriei, al frontonului și al vitraliului.',
      keyPoints: [
        'Originalitatea arată ideea într-un chip nou. Naturalețea sună firesc. Concizia lasă numai ce trebuie.',
        'Eufonia e armonia sunetelor. Varietatea schimbă vorba, ca să nu repeți același cuvânt.',
        'Casa din fragmentul bucureștean are un cat, iar geamurile imită vitraliul prin hârtie.'
      ]
    }),
    lesson({
      id: 'secvente',
      title: 'Narațiune, explicație, descriere, dialog',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Patru întrebări',
          text: 'Narativ: cine, ce face, când, unde. Explicativ: ce se lămurește și de ce. Descriptiv: ce și cum. Dialogat: cine discută și despre ce.'
        }
      ],
      theory: [
        'Textul e un întreg: enunțuri prinse logic. În el pot intra bucăți narative, explicative, descriptive și dialogate. Le poți uni într-o poveste de drum, fiecare cu întrebările ei.',
        'Bucata narativă spune, la persoana I sau a III-a, întâmplări așezate în timp și în spațiu. Întrebi cine, ce face, când, unde. Bucata explicativă dă lămuriri. Întrebi ce se explică, de cine și din ce pricină.',
        'Bucata descriptivă arată cadrul ori trăsăturile unui om, ale unui lucru sau ale unui peisaj. Întrebi ce, cum și cine descrie. Bucata dialogată redă discuția. Întrebi cine vorbește, despre cine și despre ce.',
        'În Pe drumuri de munte, Calistrat Hogaș pune un călător la persoana I. E iarmaroc de Duminica Mare. Călătorul cere ajutorul lui Tasache Crăcăuanu, geambaș cu renume. Treaba: un cal potrivit cu punga.',
        'Geambașul vinde cai ori mijlocește tocmeala. Hipologul cunoaște anatomia calului și fiziologia lui. Lecția îi dă lui Tasache ambele nume. În seara acelei duminici, aduce în ogradă o iapă mică, slabă.',
        'Călătorul îi spune Pisicuța, pentru că aducea a mâță. Mersul de la început e gebea: lin, fără sărituri. Tasache promite că grăunțele și săceala, adică țesala, o schimbă în două săptămâni. Mai spune că e de rasă.',
        'Peste două săptămâni, iapa e castanie: nări largi, bot mic, cap fin, ochi negri și vii, coamă deasă, gât tare, piept lat, trup iute. Dârlogul e cureaua frâului. Odisee înseamnă drum lung, cu peripeții.',
        'Fragmentul are narațiune, are descriere și are dialog. Lămurirea nu e acolo. O scrii tu: din ce pricină hrana și țesala, în paisprezece zile, îndreaptă un cal firav. Grăunțele dau putere. Țesala curăță părul. Nu copia frazele fragmentului.'
      ].join('\n\n'),
      example: [
        'Naratorul lui Hogaș stă la persoana I. Iapa sosește în seara de Duminica Mare. Numele Pisicuța vine din faptul că era mică și slabă.',
        'Mersul dintâi e gebea. Peste paisprezece zile e castanie și are ochi negri. Stau trei feluri de text, iar lămurirea nu e printre ele.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Lămurire de adăugat: un cal slab, hrănit și țesălat două săptămâni, prinde mușchi și luciu. Narațiunea spune cine o primește. Descrierea spune cum arată după aceea. Dialogul e vorba lui Tasache despre rasă.'
        }
      ],
      tryThis: 'Spune întrebările celor patru bucăți. Pentru Hogaș: cine e naratorul, când primește iapa, de ce o numește Pisicuța și ce bucată lipsește. Scrie o lămurire de patru rânduri despre grăunțe și țesală.',
      keyPoints: [
        'Narativul spune cine, ce face, când și unde. Lămurirea spune de ce. Descrierea spune cum.',
        'Dialogul redă discuția. Cele patru se pot uni într-un singur text de drum.',
        'La Hogaș, iapa Pisicuța vine în seara de Duminica Mare. Lămuririle lipsesc, nu narațiunea.'
      ]
    }),
    lesson({
      id: 'adverb',
      title: 'Loc, timp, mod și semnele din față',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Neflexibil',
          text: 'Adverbul nu-și schimbă forma. Spune cum e o acțiune, o stare sau o însușire și în ce împrejurare se petrece fapta.'
        }
      ],
      theory: [
        'Unele adverbe sunt dintr-o bucată: acasă ori bine, apoi destul. Tot simple: azi și mâine, ieri, aici sau acolo. Altele se scriu cu cratimă: azi-noapte, astă-vară, după-amiază.',
        'Locul îl dau aici, acolo și dincolo, apoi departe, aproape, sus, jos. Timpul se spune cu atunci și cu astăzi, cu acum sau cu ieri. Mai intră mâine, târziu, devreme, odată, totdeauna.',
        'Felul îl arată așa, bine și ușor, apoi încet, alene, repede. Fără funcție stau numai și doar, chiar, mai. Tot așa decât, prea și cam. Se numesc semiadverbe.',
        'Stau, de obicei, înaintea verbului. În O să tot mergi, tot e semiadverb. La fel cam, în S-au cam supărat, și mai, în Te mai gândești. Unele au devenit mărci. Nu, ba da ori ba nu pot sta singure, ca enunț.',
        'Dialogul cu filmul are cinci enunțuri. Întâi întrebarea despre drumeția cu colegii. Apoi Nu. Apoi propunerea de film. Apoi Da. La urmă Voi merge. Fiecare bucată, chiar de un cuvânt, e enunț.',
        'Formare. Bineînțeles e compus. Românește poartă sufixul -ește. Fatalmente poartă sufixul -mente. Altfel e compus, ca și astă-vară. Chiorâș poartă sufixul -âș. Deodată se scrie împreună și înseamnă pe neașteptate. Ușurel e diminutiv.',
        'De-a pururi are ca pereche totdeauna. De jur împrejur are ca pereche pretutindeni. Locuțiunea cu de-a sila numește o faptă silită. Cealaltă, pe neașteptate, se schimbă cu deodată. Rămân adverbe sau locuțiuni.',
        'În enunțul cu exercițiul rezolvat repede, ușor e adjectiv, iar repede e adverb de mod. Lângă alunecă, pe panta abruptă, ușor e adverb de mod. Când toamna e preferata mea, cuvântul e substantiv, subiect.',
        'Când viile se culeg toamna, toamna e adverb de timp. Pe un buștean, cuvântul e substantiv. În dormea buștean, e adverb de mod și înseamnă dus, nemișcat.',
        'O dată, două cuvinte, numără o singură ocurență. Odată, un cuvânt, înseamnă cândva. Demult, legat, trimite departe în trecut. Defel, legat, înseamnă deloc și cere propoziție negativă. De fel ține de firea cuiva. Altădată numește un alt timp. Altă dată numește o altă zi. Bineînțeles, deloc, totuna și întruna se scriu legate.',
      ].join('\n\n'),
      example: [
        'Azi-noapte e compus. Cam, lângă supărat, stă fără rol sintactic. În vorbirea despre film numeri cinci bucăți, fiecare un enunț.',
        'Lângă exercițiu, ușor e adjectiv. Lângă alunecă, ușor e adverb. Lângă cules, toamna ține de timp. În dormea buștean, buștean ține de mod. Odată înseamnă cândva. O dată numără.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'De-a pururi se schimbă cu totdeauna. Pe neașteptate se schimbă cu deodată. Românește are sufixul -ește. Chiorâș are sufixul -âș. Ușurel e diminutiv.'
        }
      ],
      practice: [
        '1) Desparte simplele de compuse în șirul acasă, bine, azi-noapte, astă-vară.',
        '2) Spune felul pentru aici, ieri și repede.',
        '3) În cele două enunțuri cu ușor, spune valoarea lui ușor și a lui repede.',
        '4) Scrie sensul pentru o dată și pentru odată.'
      ].join('\n\n'),
      answers: [
        'Simple: acasă, bine. Compuse: azi-noapte, astă-vară.',
        'Aici e de loc. Ieri e de timp. Repede e de mod.',
        'Lângă exercițiu, ușor e adjectiv, iar repede e adverb de mod. Lângă alunecă, ușor e adverb de mod.',
        'O dată înseamnă o singură ocurență. Odată înseamnă cândva sau de mult.'
      ],
      mistakes: 'Odată nu se desparte când înseamnă cândva. O dată, în două cuvinte, numără. Semiadverbele, ca doar și cam, nu primesc funcție de circumstanțial.',
      tryThis: 'Cu câte un enunț, arată că numai și cam stau fără funcție. Câte enunțuri are dialogul despre film? Dă o pereche pentru de-a pururi și una pentru pe neașteptate. Ce valoare are toamna lângă cules și buștean în dormea buștean?',
      keyPoints: [
        'Nu se schimbă și spune loc, timp sau fel. Compusele poartă cratimă.',
        'Semiadverbele, precum doar, chiar și cam, nu au funcție sintactică.',
        'Odată înseamnă cândva. O dată numără. Dormea buștean are adverb de mod.'
      ]
    }),
    lesson({
      id: 'grade-adverb',
      title: 'Mai repede, foarte repede, pentru mâine',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Cine are grade',
          text: 'Gradele stau la adverbele de mod și la unele de loc, dacă se pot măsura. Mâine, dimineața, acasă și acum rămân fără grade: numesc un timp sau un loc fix.'
        }
      ],
      theory: [
        'Nu orice adverb are grade. Pozitivul e repede. Superioritatea se spune mai repede. Egalitatea are trei formule, spuse separat: la fel de, apoi tot așa de, apoi tot atât de, fiecare cu repede. Inferioritatea: mai puțin repede.',
        'Relativul de vârf e cel mai repede. Relativul de jos e cel mai puțin repede. Absolutul de vârf e foarte repede. Absolutul de jos e foarte puțin repede. La ușor, urcarea e mai ușor, iar foarte ușor e absolut.',
        'În El strigă tare, tare, forma rămâne la pozitiv, iar dublarea doar îngroașă. La fel de mult, în dojana aceea, ține de egalitate. Foarte tare, lângă mingea lovită, e absolut de superioritate. Mai încet, când Andrei aleargă, urcă un grad.',
        'Se măsoară bine, greu, frumos, rar și prietenește, plus departe și jos. Poți urca bine, departe sau jos punând mai în față. Rămân fixe mâine, dimineața, acasă și acum.',
        'Ca loc: Acolo este un parc. Ca timp: Mâine vom merge la școală. Ca mod: Desenează foarte frumos. Ca nume predicativ: Tema este pentru mâine. Ca atribut: Cartea de azi a fost interesantă. La fel, Casa din stânga este a noastră.',
        'Poate sta pe verb, ca în A ajuns acasă. Pe adjectiv: în Sara era destul de tristă, destul de apasă pe tristă. Pe adverb: în A mers destul de încet, destul de apasă pe încet.',
        'Foarte des: des e de timp, foarte e marca absolutului. Agale e de mod. Amintirile sunt pentru totdeauna: nume predicativ. A rămas pentru totdeauna: timp. În jur: loc. Mai demult: tot timp.',
        'În Lecția de azi, grupul de azi e atribut. Când tema e pentru mâine, grupul e nume predicativ. Din stânga, la casa aceea, e atribut. Încetișor e de mod. Dublarea repede, repede îngroașă și lasă pozitivul pe loc.'
      ].join('\n\n'),
      example: [
        'Mai încet urcă, deci e comparativ de superioritate. Foarte tare e absolut. La fel de mult ține de egalitate. Dublarea tare, tare nu schimbă pozitivul, doar îl îngroașă.',
        'Mâine rămâne fără grade. Bine are. În Tema este pentru mâine, grupul e nume predicativ. În Cartea de azi, de azi e atribut. Destul de, lângă tristă, stă pe adjectiv.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Cel mai puțin repede e superlativ relativ de inferioritate. Foarte puțin repede e superlativ absolut de inferioritate. Departe are grade. Acum nu are, fiindcă e un timp fix.'
        }
      ],
      practice: [
        '1) Dă pozitivul lui ușor, apoi comparativul de superioritate și absolutul de superioritate.',
        '2) Spune gradul pentru tare, tare, pentru la fel de mult și pentru mai încet.',
        '3) Care dintre mâine, bine, acasă, rar, acum, departe primesc grade și care nu?',
        '4) Dă funcția lui agale și a lui pentru mâine din Tema este pentru mâine.'
      ].join('\n\n'),
      answers: [
        'Ușor. Mai ușor. Foarte ușor.',
        'Tare, tare e pozitiv, cu intensitate întărită. La fel de mult e comparativ de egalitate. Mai încet e comparativ de superioritate.',
        'Cu grade: bine, rar, departe. Fără grade: mâine, acasă, acum.',
        'Agale e circumstanțial de mod. Pentru mâine, în Tema este pentru mâine, e nume predicativ.'
      ],
      mistakes: 'Repetarea tare, tare nu urcă adverbul la superlativ. Rămâne pozitiv. Mâine, acasă și acum nu primesc mai sau foarte, fiindcă nu se măsoară.',
      tryThis: 'Arată pe ce stă adverbul în A ajuns acasă, apoi în Sara era destul de tristă, apoi în A mers destul de încet. Ce funcție au de azi, în Lecția de azi, și încetișor? Construiește un mod la superlativ relativ de inferioritate.',
      keyPoints: [
        'Gradele sunt pozitiv, comparativ și superlativ. Mai încet e comparativ de superioritate.',
        'Foarte tare e absolut. Dublarea tare nu urcă gradul.',
        'Fără grade: mâine, acasă, acum. Cu grade: bine, rar, departe. Poate fi și nume predicativ.',
      ]
    }),
    lesson({
      id: 'interjectie',
      title: 'Of, hai și cucurigu',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Neflexibilă',
          text: 'Interjecția nu se schimbă. Spune stări, îndemnuri sau imită sunete. Imitațiile se numesc onomatopee. După ea stă virgula sau semnul exclamării.'
        }
      ],
      theory: [
        'Cele simple au un singur corp. Din tabel: stop și of, marș și măi, apoi oh, poc, tralala. Piu-piu se învață între exemple, ca sunet. Cele cu două corpuri legate sunt compuse.',
        'Compuse, tot din tabel: hodoronc-tronc și cip-cirip, apoi țop-țop, cioca-boca. Mai sunt hei-rup, tic-tac, pâș-pâș și mac-mac. Cratima și cele două bucăți le dau de gol. Un singur corp, fără cratimă, rămâne simplu.',
        'După sens, propriu-zisele sunt de patru feluri. Pentru stare: of și vai, ah, ura. Pentru senzație: brr și hapciu, au. Pentru adresare: bă și mă, bre. Pentru atenție: uite și iată. Onomatopeele imită ciocănitul, pisica, ploaia: cioc-cioc, miau, pic-pic. Mai sunt zvârr, trosc, pleosc, fâș-fâș, cucurigu.',
        'Ah, of și vai țin de stare. Bre, la fel ca măi, se adresează cuiva. Uite cere atenție. Trosc-pleosc copiază un zgomot. Brr ține de senzație. Din tabel reții stop și of, apoi marș cu măi, apoi oh și poc. Tralala închide șirul. Compusele se învață pe perechi: țop-țop cu cioca-boca, hei-rup cu tic-tac, apoi pâș-pâș, hodoronc-tronc și mac-mac.',
        'Când întâlnești un animal, varianta politicoasă e o adresare sau o scuză. Na, urmat de un obiect, oferă ceva. Numele animalului plus hai e un îndemn. Desenul rămâne al tău. Tu spui dacă replica e o scuză, o oferire ori un îndemn.',
        'Semnul de după interjecție e virgula, când fraza continuă, sau semnul exclamării, când exclamația se închide. Of, ce drum lung, și Of! sunt ambele corecte, după cât de tare se rupe vorba. Pentru ciocănit: cioc-cioc. Pentru pisică: miau. Pentru ploaie: pic-pic.'
      ].join('\n\n'),
      example: [
        'Of ține de stare. Bre se adresează. Uite cere atenție. Trosc-pleosc copiază zgomotul. Brr ține de senzație.',
        'Două corpuri au țop-țop și mac-mac. Unul singur au stop, apoi of, apoi măi. Semnul următor poate fi virgulă sau exclamație.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Na, un măr: oferire. Hai, pisico: îndemn. Măi, iartă-mă: adresare și scuză. Cucurigu imită cocoșul. Hodoronc-tronc are două corpuri, deci e compusă.'
        }
      ],
      practice: [
        '1) Grupează ah, of și vai, apoi bre cu măi, apoi uite, apoi trosc-pleosc, apoi brr, după ce exprimă fiecare.',
        '2) Împarte în simple și compuse: stop, of, țop-țop, măi, mac-mac, hodoronc-tronc.',
        '3) Imită, cu câte un cuvânt, ciocănitul, pisica și ploaia.',
        '4) Spune ce semn poate sta după of și de ce.'
      ].join('\n\n'),
      answers: [
        'Ah, of și vai: stare. Bre și măi: adresare. Uite: atenție. Trosc-pleosc: onomatopee. Brr: senzație.',
        'Simple: stop, of, măi. Compuse: țop-țop, mac-mac, hodoronc-tronc.',
        'Cioc-cioc, miau, pic-pic.',
        'Virgula, dacă fraza continuă, sau semnul exclamării, dacă exclamația se închide.'
      ],
      mistakes: 'O interjecție compusă nu se scrie ca două simple despărțite de spațiu. Țop-țop ține cratima. Onomatopeea imită un sunet, nu numește o stare.',
      tryThis: 'Compune trei vorbe către un animal. Prima cere iertare. A doua dă ceva, cu na. A treia îndeamnă, cu hai. Pune exclamația după fiecare. Notează rolul fiecărei replici.',
      keyPoints: [
        'Nu-și schimbă forma. Poate ține de o stare, de o senzație, de o chemare, de atenție ori de un zgomot.',
        'Un singur corp, ca of sau măi, e simplă. Două corpuri, ca țop-țop ori hodoronc-tronc, sunt compuse.',
        'Onomatopeea copiază un zgomot. După ea poate sta virgula, dacă fraza merge mai departe, sau exclamația.'
      ]
    }),
    lesson({
      id: 'interjectie-predicativa',
      title: 'Hai, buf și stop',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Ține loc de verb',
          text: 'Interjecția predicativă are funcția de predicat verbal. Exemplu: Hai la film. Altul: Pisica țuști pe lângă noi. Onomatopeea poate fi și ea predicat.'
        }
      ],
      theory: [
        'Unele interjecții se poartă ca un verb. Li se spune predicative. Haide cu noi în parc e predicat verbal și îndemn. Na un măr din livada mea e predicat verbal și oferire.',
        'Uite ce frumos a desenat e tot predicat verbal. La șoricel, chiț-chiț din gaura de după sobă e onomatopee predicativă și predicat. Cartea buf de pe birou: buf e la fel, predicat.',
        'Pe pârtie, noi toți țuști cu săniuțele. Aici țuști e onomatopee predicativă și predicat verbal. Poți înlocui verbul și păstra funcția. Behăitul oii devine bee: Oița bee. Bocănitul bunicului devine boc-boc.',
        'Cotcodăcitul găinilor devine cotcodac. Zborul păsărilor devine zbrr. Funcția rămâne predicat verbal. Din interjecții se fac verbe, prin sufixe. De la fâș iese a fâșâi. De la ham iese a hămăi. De la mac iese a măcăi. De la vâj iese a vâjâi.',
        'De la pleosc iese a pleoscăi. De la boc iese a bocăni. De la bâzz iese a bâzâi. De la tic-tac iese a ticăi. Interjecția, singură, poate rămâne predicat, fără să devină verb.',
        'Stop își schimbă clasa. După la, în enunțul despre mașina care nu a oprit, e substantiv. Când deschide Stop, nu puteți trece, e interjecție predicativă.',
        'De își schimbă clasa. În rochia de mătase, de leagă și e prepoziție. Când deschide De, nu toți sunt ajutați ca tine, arată resemnarea.',
        'O își schimbă clasa. În exclamația O, ce carte interesantă, e interjecție. În Am văzut-o pe Maria, e pronume. Abia în Am citit o carte despre călătorii devine articol nehotărât.',
        'Piesa se cheamă Înșir-te, mărgărite. Autorul e Victor Eftimiu. Acolo, strigătele de veghe sunt onomatopee. Hai și măi sunt de adresare sau de îndemn. Replicile nu se copiază.'
      ].join('\n\n'),
      example: [
        'Hai la film e predicat verbal. Buf, la fel ca țuști, e onomatopee predicativă. La oiță, bee ține locul verbului și tot e predicat.',
        'După la, stop e substantiv. La început de frază, în Stop, nu puteți trece, e interjecție. O din exclamație e interjecție, din Am văzut-o e pronume, din Am citit o carte e articol.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Găinile cotcodac păstrează predicatul, fără verbul cotcodăcesc. A hămăi vine de la ham. A ticăi vine de la tic-tac. Stop după la rămâne substantiv, ca numele unui semn rutier.'
        }
      ],
      practice: [
        '1) Pentru Haide, Na, buf și țuști, spune felul și funcția.',
        '2) Înlocuiește behăie și zboară cu interjecții și spune ce funcție rămâne.',
        '3) Spune valoarea lui stop în Mașina nu a oprit la stop și în Stop, nu puteți trece.',
        '4) Ce e o când stă în O, ce carte? Ce e în Am văzut-o pe Maria? Ce e în Am citit o carte?'
      ].join('\n\n'),
      answers: [
        'Haide și Na sunt interjecții predicative, cu rol de predicat. Buf, ca și țuști, e onomatopee predicativă și tot predicat.',
        'Oița bee. Păsările zbrr. Funcția rămâne predicat verbal.',
        'După la, stop e substantiv. Singur, cu semnul exclamării, stop e interjecție predicativă.',
        'O din exclamația despre carte e interjecție. O din Am văzut-o e pronume. O din Am citit o carte e articol nehotărât.'
      ],
      mistakes: 'Stop de după la nu e predicat. E substantiv. O din Am citit o carte nu e interjecție. E articol. Funcția se judecă în enunț, nu după literă.',
      tryThis: 'Fă verbul de la fâș, apoi de la ham și de la mac. Continuă cu vâj, cu pleosc, cu boc, cu bâzz și cu tic-tac. Ce e de în rochia de mătase? Ce e în De, nu toți? Scrie două interjecții predicative și una de stare.',
      keyPoints: [
        'Interjecția predicativă ține locul verbului și e predicat: hai, na, uite, buf, țuști.',
        'Stop lângă la e substantiv. Stop singur, cu semnul exclamării, e interjecție.',
        'Litera o își schimbă rolul: exclamație, pronume ori articol, după fraza din jur.'
      ]
    }),
    lesson({
      id: 'vecini-cultura',
      title: 'Cinci cărți de vizită',
      kind: 'comunicare',
      boxes: [
        {
          type: 'atentie',
          title: 'Fără datină născocită',
          text: 'Cartea de vizită se umple numai cu fapte din lecție. Dacă nu cunoști o datină a vecinilor, scrii că o cauți. Nu inventezi un obicei.'
        }
      ],
      theory: [
        'Oamenii seamănă la fire. Cultura îi desparte. Poți încuviința ori te poți îndoi, însă aduci un fapt cultural, nu o vorbă goală. Mai jos stă cartea de vizită a fiecărei țări.',
        'La Ungaria, salutul e Jo napot. Capitala se cheamă Budapesta. Drapelul are roșu, alb și verde. Se vorbește maghiara. Numele de reținut: Franz Liszt. La masă: gulaș și kürtőskalács.',
        'La Ucraina, salutul e Dobrii deni. Capitala se cheamă Kiev. Culorile sunt albastru și galben. Limba e ucraineana. Numele: Taras Șevcenko. Unele grafii scriu Șevcenco. Bucata: vareniki.',
        'La Bulgaria, salutul e Dobăr den. Capitala se cheamă Sofia. Culorile: alb, apoi verde și roșu. Limba e bulgara. Numele: Țvetan Todorov. Bucata: lutenița.',
        'La Serbia, salutul e Dobar dan. Capitala se cheamă Belgrad. Culorile: roșu, apoi albastru și alb. Limba e sârba. Numele: Nikola Tesla. Unele grafii scriu Nicola. Forma din lecție rămâne Nikola Tesla. Bucata: ajvarul.',
        'La Republica Moldova, salutul e Bună ziua. Capitala se cheamă Chișinău. Culorile: roșu, galben, albastru. Limba e româna. Numele: Eugen Doga. Bucata: sarmale cu mămăligă. România, pe același tipar, are capitala la București, drapel albastru cu galben și roșu, limba română.',
        'Asemănări de verificat. Moldova și România folosesc limba română și un salut românesc. Culorile roșu, galben, albastru apar și la Chișinău. Ucraina, ca și Bulgaria, începe salutul printr-o urare, dar fiecare o spune în graiul ei.',
        'Nu născoci o datină necitită. Când o cunoști, o legi de locul unde ai citit-o. Când n-o cunoști, notezi că urmează s-o cauți. Un domeniu de influență, deja aici, e bucătăria: gulaș, vareniki, luteniță, ajvar, sarmale. Muzica stă lângă Liszt și lângă Doga, tot din lecție.'
      ].join('\n\n'),
      example: [
        'Ungaria: Budapesta și Jo napot. Ucraina: Kiev. Bulgaria: Sofia.',
        'Serbia: Belgrad și Nikola Tesla. Republica Moldova: Chișinău, limba română, Eugen Doga. România: București.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'România și Republica Moldova se întâlnesc la limba română și la salutul Bună ziua. Culorile roșu, galben și albastru apar la amândouă. Nu adăuga un dans pe care nu l-ai citit.'
        }
      ],
      tryThis: 'Pentru fiecare dintre cele cinci țări vecine, trei rânduri: salut, capitală, limbă, un nume și o mâncare. Adaugă o asemănare cu România. Completează capitala, culorile și limba României.',
      keyPoints: [
        'Capitalele de reținut: Budapesta, Kiev, Sofia, Belgrad și Chișinău, fiecare la țara ei.',
        'La Chișinău se vorbește româna, iar numele de reținut e Eugen Doga. La Belgrad, numele e Nikola Tesla.',
        'România are capitala la București. O datină necunoscută se caută, nu se inventează.'
      ]
    }),
    lesson({
      id: 'proiect-ghid',
      title: 'Ghidul unei țări, în grup',
      kind: 'comunicare',
      boxes: [
        {
          type: 'atentie',
          title: 'Șase etape',
          text: 'Obiective, plan, cercetare, îmbinare, susținere, părerile colegilor. Grila cu inimi nu înlocuiește ghidul. Ce nu e într-o sursă citită nu se scrie.'
        }
      ],
      theory: [
        'Proiectul poartă numele Călătorie multiculturală. Grupul are patru membri, iar câteodată un al cincilea. Produsul e un ghid de turism pentru țara scoasă la sorți, împreună cu cultura ei.',
        'Biletele pot aduce România ori Bulgaria. Apoi vin Grecia și Italia. Lista mai cuprinde Franța, Spania, Portugalia, la urmă Ungaria. Nu adăuga o țară din afara listei.',
        'Ghidul spune cum ajungi, dă cuvinte uzuale, cazare, obiective, datini, oameni cunoscuți și bucate. Pașii de lucru sunt șase. Grila cu inimi nu e lecția.',
        'Întâi fixați ținta. Apoi împărțiți sarcinile, sursele, forma ghidului și materialele. Cercetați. Uniți produsul. Îl spuneți colegilor. La capăt ascultați ce părere au.',
        'Planul de Ungaria ia doar fapte deja spuse. Capitala e Budapesta. Salutul e Jo napot. Limba e maghiara. Numele e Franz Liszt. Bucata e gulașul. Dacă o adresă de cazare nu e într-o sursă citită, nu o scrieți. Spuneți că o căutați.',
        'Rolurile, la patru, se pot împărți așa. Unul caută locul. Altul caută salutul și limba. Altul caută o personalitate. Altul caută o bucată. Al cincilea, dacă există, leagă rubricile și pregătește susținerea.',
        'Cinci rubrici: drumul, salutul, un obiectiv, o tradiție, o bucată. Pentru Ungaria, Moldova sau altă țară din cărțile de vizită, folosești faptele deja spuse. Pentru Grecia, Italia, Franța, Spania sau Portugalia, scrii doar ce ai citit.',
        'Susținerea nu înlocuiește cercetarea. Părerile colegilor vin la urmă și pot cere o corectură, dacă o rubrică n-are sursă. Grila cu inimi rămâne o fișă de observare, nu textul ghidului.'
      ].join('\n\n'),
      example: [
        'Grupul numără patru persoane, iar uneori cinci. Biletele pot fi România sau Bulgaria, apoi Grecia, apoi Italia. Mai departe: Franța ori Spania. La capăt, Portugalia ori Ungaria.',
        'În produs intră drumul, urarea, locurile de văzut, datinile și mâncarea. Fișa cu inimi nu ține loc de text. Pentru Ungaria, capitala din lecție e Budapesta, iar salutul e Jo napot.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Plan de Ungaria, numai din lecție: capitala Budapesta, salutul Jo napot, limba maghiară, personalitatea Franz Liszt, bucata gulaș. La cazare scrii că o cauți, dacă n-ai citit o adresă.'
        }
      ],
      tryThis: 'Alege în scris o țară de pe lista dată. Împarte munca la patru. Parcurge cei șase pași și scrie cinci rubrici. Fără adresă citită, la cazare notezi că o vei căuta. Fișa cu inimi nu ține loc de ghid.',
      keyPoints: [
        'Lucrați câte patru, uneori câte cinci, la un ghid de turism. Țara se trage dintr-un bilet.',
        'Rubricile acoperă drumul, urarea, locurile, datinile și masa. Pașii se încheie cu părerile colegilor.',
        'Un fapt necitit nu se născocește. Fișa cu inimi rămâne în afara textului.'
      ]
    }),
    lesson({
      id: 'recap-calator',
      title: 'Fesul, hamalii și o barcă pe lac',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'atentie',
          title: 'Nu e grila',
          text: 'Recapitularea stă pe scenă și pe fapte. Grila notată cu 60 de puncte nu e lecția. Nici fișa de observare. Litera pentru fes e b.'
        }
      ],
      theory: [
        'La clasă poți avea Tartarin din Tarascon. Autorul e Alphonse Daudet. Alt text posibil: un Sherlock tânăr, în Gheața neagră, scrisă de Andrew Lane. Frazele nu se copiază. Mai jos stau faptele lui Tartarin.',
        'Traversarea ține trei zile. Vaporul se numește Le Zouave și merge din Franța spre Algeria. Naratorul vorbește cititorilor, iar faptele lui Tartarin stau la persoana a III-a. Trei zile e urmărit fesul roșu. La plecare pare semeț. Când vasul saltă, fesul pare mirat.',
        'După-amiaza zilei a treia: sună clopotul, marinarul aleargă. Barbassou, căpitanul, comandă sala mașinilor înainte, apoi înapoi, apoi stop. Tartarin crede într-o scufundare, iese înarmat pe punte și vede rada Algerului, nu un naufragiu.',
        'Orașul alb e pe colină, deasupra unei ape adânci, liniștite. Oamenii smulg prelata de pe bagaje. El îi crede pirați și cheamă la arme. Căpitanul îl lămurește: pirații au dispărut. Sunt hamali, cărăuși de bagaje pe uscat.',
        'El se liniștește doar pe jumătate. Mâna îi stă pe pumnal. E lăudăros și sperios. Barbassou e calm și practic.',
        'Punctul culminant e spaima de scufundare, urmată de fuga spre cărăuși. Deznodământul e vorba căpitanului. Semnul din deschidere e fesul, litera b. Pumnalul arată teama de la capăt. Nu e obiectul privit trei zile.',
        'Secvențe: narațiunea drumului, descrierea Algerului, dialogul cu căpitanul. Scenă a noastră, pentru adverb și interjecție. Duminică, în zori, Mara stă în barcă pe lac. Unchiul pescuiește agale. Apa e foarte liniștită. Lângă trestie strigă stop. O rață trece mac-mac.',
        'Mara spune că tema este pentru mâine. Lecția de azi se face aici. Agale e de mod și circumstanțial. Foarte marchează absolutul. Dimineața e de timp, aici e de loc. Pentru mâine e nume predicativ. De azi e atribut.',
        'Stop e interjecție predicativă, deci predicat verbal. Mac-mac e onomatopee predicativă. O, singură înaintea unei mirări, e interjecție, nu articol, în scena asta. Dublarea repede, repede doar îngroașă.',
        'Proba cu stop substantiv: Barca nu a oprit la stop. Pagina ta vine după: o scrii la persoana I și pui o descriere, măcar douăzeci de cuvinte. Din barcă faci trei pași, ce e scris, ce vezi, ce ai face, cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce e scris: duminică, pe lac, unchiul pescuiește agale. Lângă trestie strigă stop. Ce vezi: îi văd în barcă. Pe lângă ei trece o rață, mac-mac. Eu aș opri barca mai devreme, pentru că a strigat stop.',
        'Fesul lui Tartarin e litera b. Hamalii duc bagajele. Agale e circumstanțial de mod. Stop e predicat verbal. Pentru mâine poate fi nume predicativ. Vaporul se numește Le Zouave și ține trei zile.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Barca nu a oprit la stop: aici stop e substantiv. Stop, strigă unchiul: aici stop e predicat. Mac-mac e onomatopee predicativă. Foarte, lângă liniștită, marchează superlativul absolut.'
        }
      ],
      tryThis: 'Din scena bărcii, fă cei trei pași. Rândul cu ce vezi pornește de la Îi văd. Dă rolul lui agale, apoi al grupului pentru mâine, apoi al grupului de azi. La Tartarin: durata, vaporul, fesul, litera b și cine cară bagajele.',
      keyPoints: [
        'În trei zile, pe Le Zouave, Tartarin ajunge la Alger și ia cărăușii drept pirați. Fesul poartă litera b.',
        'În barcă, agale e adverb de mod, stop e interjecție predicativă, iar mac-mac e onomatopee.',
        'Pentru mâine poate fi nume predicativ. Foaia cu puncte nu ține loc de recapitulare.'
      ]
    })
  ]
};
