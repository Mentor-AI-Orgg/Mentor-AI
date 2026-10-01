'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f) {
  return romanaLesson(f);
}

module.exports = {
  id: 'ferestre-spre-viitor',
  title: 'Ferestre spre viitor',
  inOwnWords: 'Unitatea 6 lucrează textul argumentativ, textul auxiliar, atitudinile din grup, inteligența emoțională, stilul și sintaxa propoziției. Apoi vin personalitățile din diaspora și proiectul despre o descoperire. Scenele sunt în lecții. Deschiderea poate pleca de la Jules Verne. La școală titlul poate fi altul. Grilele de punctaj nu sunt lecții.',
  toc: [
    'Harta unității',
    'Textul argumentativ',
    'Textul auxiliar',
    'Atitudini și emoții',
    'Stilul',
    'Drumeția, trei texte',
    'Subiectul și predicatul',
    'Atributul și complementele',
    'Diaspora',
    'Descoperiri care au schimbat lumea',
    'Recapitularea unității'
  ],
  glossary: [
    {
      term: 'text argumentativ',
      meaning: 'Text în care o părere este susținută cu argumente, ca să convingă.'
    },
    {
      term: 'diaspora',
      meaning: 'Un grup etnic aflat în afara granițelor țării de origine.'
    },
    {
      term: 'inteligență emoțională',
      meaning: 'Capacitatea de a înțelege emoțiile tale și pe ale celorlalți și de a le spune potrivit.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-ferestre',
      title: 'Ce vei lucra despre viitor',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Harta unității',
          text: 'Drumul trece prin argumentare, text ajutător, atitudini, emoție, stil, sintaxă, diaspora și un proiect. Cele zece competențe sunt ținta, nu o lecție deja scrisă.'
        }
      ],
      theory: [
        'Ferestre spre viitor pornește de la hartă. Înveți să recunoști un text argumentativ și, separat, un text auxiliar, care stă lângă textul mare și îl lămurește.',
        'La comunicare exersezi interesul, curiozitatea, implicarea și cooperarea. După aceea pui o emoție pe numele ei, nu o lași doar simțită.',
        'La redactare, cuvintele se potrivesc cu tema și cu situația. Ce sună bine între prieteni poate fi nepotrivit când scrii pentru clasă.',
        'La gramatică reiei sintaxa propoziției. Lucrezi subiectul, predicatul, atributul, complementul și circumstanțialele, fiecare cu întrebarea lui.',
        'La interculturalitate legi limba română de personalități românești din diaspora. Oamenii au dus limba și țara cu ei, dincolo de graniță.',
        'Închiderea este un proiect de grup, despre o descoperire aleasă. Spui cine a făcut-o și ce a schimbat în jur.',
        'Competențele vizate sunt zece. Începutul listei este 1.3, apoi 1.4. Din grupa a doua intră 2.1, 2.4 și 2.5.',
        'Mai sunt 3.1 și 3.3. La urmă stau 4.1, 4.5 și 5.2. Dacă numeri codurile, ajungi la zece, nu la nouă.',
        'Harta anunță, pe stații, argumentarea, emoția, stilul, sintaxa, diaspora și proiectul legat de descoperiri. Codurile arată unde vrea să ajungă unitatea.',
        'La clasă, titlul textului de pe bancă poate fi altul. Pașii de lucru rămân aceiași: recunoști, numești, apoi scrii cu vorbele tale.'
      ].join('\n\n'),
      example: [
        'Pe hartă, azi, stația este textul argumentativ. Emoția, stilul, sintaxa, diaspora și proiectul rămân pentru lecțiile următoare.',
        'Ținta nu este o foaie gata umplută. Ținta sunt cele zece coduri, de la 1.3 și 1.4 până la 4.5 și 5.2, cu 2.1, 2.4, 2.5, 3.1 și 3.3 la mijloc.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă notezi doar argumentarea și uiți sintaxa, harta este pe jumătate. Diaspora și proiectul despre descoperiri închid unitatea. Codurile rămân zece.'
        }
      ],
      tryThis: 'Scrie două propoziții. În prima arăți că tema este o fereastră către viitor și că astăzi te ocupi de textul argumentativ. În a doua enumeri codurile 1.3 și 1.4, apoi 2.1, 2.4, 2.5, apoi 3.1 și 3.3, apoi 4.1, 4.5 și 5.2, și spui că sunt zece.',
      keyPoints: [
        'Harta trece prin argumentare, text auxiliar, atitudini, stil, sintaxă, diaspora și proiect.',
        'Competențele numărate sunt zece, grupate pe codurile date în lecție.',
        'Titlul de la clasă se poate schimba. Pașii de lucru rămân.'
      ]
    }),

    lesson({
      id: 'text-argumentativ',
      title: 'O părere și dovezile ei',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei piese',
          text: 'Ipoteza deschide, argumentele țin cuprinsul, concluzia închide. Conectorii arată rolul: pornesc părerea, ordonează dovezile sau trag încheierea.'
        }
      ],
      theory: [
        'Un text argumentativ susține o părere despre fapte, oameni sau întâmplări. Argumentele și dovezile o țin, fie ca demonstrație, fie ca încercare de a convinge.',
        'Structura are trei trepte. La început stă ipoteza, adică părerea. O poți porni prin părerea mea este că, prin în opinia mea ori prin din punctul meu de vedere.',
        'La mijloc vin argumentele, pentru sau împotriva. Le ordonezi cu în primul rând, cu în al doilea rând, cu mai întâi și cu apoi.',
        'La final revii asupra părerii, după argumente. Închiderea folosește în concluzie, deci sau așadar.',
        'Scriitorul francez Jules Verne a trăit din 1828 până în 1905 și este precursor al literaturii științifico-fantastice. Cartea din 1863 se numește Cinci săptămâni în balon.',
        'Contractul seriei Călătorii extraordinare a ținut douăzeci de ani. Volumele de tehnică privesc epoca lui.',
        'Din 1868 este Copiii căpitanului Grant. Din 1873 este Ocolul Pământului în optzeci de zile. Din 1876 este Mihail Strogoff. Din 1884 este Steaua Sudului. Din 1899 este Vulcanul de aur.',
        'Alte volume închipuie lumi. Anul 1865 ține de De la Pământ la Lună. Anul 1870 ține de Douăzeci de mii de leghe sub mări. Anul 1886 ține de Robur Cuceritorul.',
        'Un articol pentru școală apropie socotelile romanului din 1865 de zborul real în jurul Lunii. Comanda primei nave care a înconjurat Luna a fost a lui Frank Borman.',
        'Capsula: circa 9000 kg, aluminiu, 4 metri. Decolarea stă cam la 100 de mile de punctul lui Verne. Amerizarea: cam două mile și jumătate, în Pacific. Aluminiul modern apare la vreo 20 de ani după carte. Verne vedea ghiulele din tunuri. NASA a prins modulele de rachete.',
        'Asemănarea nu este întâmplare. Dovezile sunt materialul de aluminiu și punctul de revenire, aflat lângă zona romanului. Închiderea este așadar.',
        'Luni, la română, Mara spune că o poveste poate apărea înainte ca invenția să existe. Întâi amintește anul 1865 și drumul spre Lună. Apoi zborul real. Încheie cu așadar.'
      ].join('\n\n'),
      example: [
        'Scrisul scenei: luni, la română, Mara dă o părere, două sprijinuri și închide cu așadar. Vederea: o văd în clasă, luni, vorbind despre povești și despre invenții.',
        'Aș fi adăugat anul 1870, fiindcă atunci iese Douăzeci de mii de leghe sub mări. Mara pomenise doar 1865. Ipoteza: părerea mea este că. Închiderea: așadar.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ipoteză: părerea mea este că romanul din 1865 a mers înaintea zborului. În primul rând, capsula reală este din aluminiu. În al doilea rând, amerizarea cade foarte aproape de zona din carte. Așadar, socotelile nu par o întâmplare.'
        }
      ],
      tryThis: [
        'Pe scena Marei redai în trei propoziții ce este scris, ce vezi și ce ai face, legate cu pentru că. Propoziția despre ce vezi pornește cu O văd. Numește ipoteza, cele două sprijinuri și încheierea.',
        'Notează anul volumului De la Pământ la Lună, materialul capsulei și câți metri are în înălțime. Compune apoi, în 100 până la 120 de cuvinte, o argumentare despre o invenție care te ajută: o ipoteză, două argumente, o concluzie și măcar doi conectori din lecție. Intră în text anul 1865 sau anul 1870.'
      ].join('\n\n'),
      keyPoints: [
        'Argumentarea are ipoteză, argumente și concluzie, fiecare cu conectorii lui.',
        'Verne, între 1828 și 1905, a scris și despre tehnica vremii, și despre lumi închipuite.',
        'La Mara, părerea se deschide, se sprijină de două ori și se închide cu așadar.'
      ]
    }),

    lesson({
      id: 'text-auxiliar',
      title: 'Textul care stă lângă textul mare',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Text auxiliar',
          text: 'Este notița, caseta sau fragmentul pus alături, ca să lămurească textul mare. Nu îl înlocuiește. Îl face mai clar.'
        }
      ],
      theory: [
        'Textul mare, aici, este articolul despre Jules Verne. Alături stau o notiță cu un submarin și o trimitere spre romanul din 1870, Douăzeci de mii de leghe sub mări.',
        'Pe Nautilus, căpitanul Nemo ține o bibliotecă, iar profesorul Aronnax povestește. Nemo dă volumul bibliotecii: douăsprezece mii de cărți.',
        'Volumele țin de știință, de morală, de literatură. Limbile stau amestecate, nu pe rafturi separate. Cele de știință sunt cele mai multe.',
        'Aronnax dă peste Fondatorii astronomiei, scrisă de Joseph Bertrand și apărută în 1865. Deducția lui: Nautilus nu putea fi gata mai devreme de anul acela.',
        'A doua deducție: viața lui Nemo sub apă ține cel mult trei ani. Sala nu se descrie aici. Rămân cuvintele și concluzia.',
        'Palisandru este un lemn de esență exotică, tare și închis la culoare. Divan este o canapea joasă, unde te poți întinde.',
        'Capodoperă este o operă de vârf. Balistică este știința traiectoriei unui proiectil.',
        'Indicativul SSN-571 aparține lui Nautilus, întâiul submarin operațional cu propulsie nucleară și întâiul care a trecut scufundat pe la Polul Nord. Data este 3 august 1958.',
        'La început, comanda a avut-o Eugene Parks Wilkinson. Din greacă, nautilus i-a dat lui Jules Verne, în 1870, numele submarinului, iar mai târziu și altor nave numite USS Nautilus.',
        'Scena de lucru se mută. Joi, în biblioteca școlii, Radu ia de pe raft o carte despre Lună. Un ziar vechi stă lângă ea.',
        'Îi spune Irinei motivul: vrea să vadă zborul închipuit de cineva, dinainte de rachetă. Ziarul rămâne text ajutător, lipit de volum.',
        'Trei timpi ies din scenă: ce este scris, ce vezi, apoi fapta ta, legată prin pentru că.'
      ].join('\n\n'),
      example: [
        'Scrisul: joi, la biblioteca școlii, Radu alege cartea despre Lună, cu ziarul vechi alături, și îi explică Irinei de ce o ia. Vederea: îl văd cu volumul în mână.',
        'Aș fi desfăcut ziarul, fiindcă era lângă carte, iar volumul despre Lună fusese deja ales. Auxiliarul explică textul mare, nu îl șterge.',
        'Biblioteca din roman are douăsprezece mii de volume. Bertrand este din 1865. Polul Nord, trecut scufundat, ține de 3 august 1958.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ziarul vechi de lângă cartea despre Lună este text auxiliar: nu înlocuiește volumul, îl lămurește. Dacă Radu ia doar cartea, notița de alături rămâne necitită.'
        }
      ],
      tryThis: [
        'Pentru scena lui Radu, trei propoziții: ce este scris, ce vezi, ce ai face, cu pentru că. Ce vezi pornește cu Îl văd. Definește textul auxiliar, spune câte volume dă Nemo și din ce an este Bertrand.',
        'Dă sensul pentru palisandru, pentru divan, pentru capodoperă și pentru balistică. Pune data de la Polul Nord și numele comandantului. În opt rânduri inventariază o sală de elevi pe un vas: patru obiecte, fiecare cu folosul lui, de la cel mai de trebuință la cel mai puțin de trebuință.'
      ].join('\n\n'),
      keyPoints: [
        'Auxiliarul stă lângă textul mare și îl limpezește, fără să îi ia locul.',
        'Cartea lui Bertrand, din 1865, arată că Nautilus nu e mai vechi de atât, iar anii sub apă sunt cel mult trei.',
        'Data de 3 august 1958 marchează trecerea scufundată a lui SSN-571 pe la Polul Nord. Comanda de la început: Eugene Parks Wilkinson.'
      ]
    }),

    lesson({
      id: 'atitudini-emotii',
      title: 'Interes, cooperare și emoția pe nume',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Patru atitudini',
          text: 'Te oprești la temă: interes. Pui o întrebare: curiozitate. Intri în faptă: implicare. Împarți treaba: cooperare.'
        }
      ],
      theory: [
        'În comunicare, atitudinile nu sunt la fel. În grup arăți interes față de părerile altora, plus atenție, implicare și cooperare.',
        'Prin inteligență emoțională înțelegi emoțiile tale și pe ale celorlalți și le poți conduce. Nu înseamnă să nu simți. Înseamnă să știi ce simți și ce faci apoi.',
        'Îți știi sentimentele: aceasta este autocunoașterea. Ții în frâu o trăire care te-ar lovi pe tine sau pe altcineva: aceasta este autostăpânirea. Înțelegi ce simte celălalt: aceasta este empatia.',
        'În aceeași capacitate intră motivația, colaborarea și lucrul în echipă. Nu stau despărțite de emoție.',
        'O emoție este o trăire de tărie mijlocie, care nu ține mult. Poate fi pozitivă sau negativă. Intră tristețea și supărarea, apoi disprețul, bucuria și furia. Urmează dezgustul, teama, surprinderea, rușinea, durerea.',
        'La avizier, în pauză, Lia vede afișul pentru concursul Școala viitorului. Întreabă data probei de machete. Radu spune că proba este sâmbătă și că pot lucra împreună. Lia răspunde că vine și aduce cartonul.',
        'Curiozitatea este întrebarea. Interesul este oprirea la afiș. Implicarea este vin și eu. Cooperarea este treaba făcută împreună. Patru fapte, patru nume.',
        'În bucătărie, seara, mama îi spune lui Vlad că a doua zi tabăra pleacă fără el: locurile s-au terminat. El simte teamă și tristețe și spune că vrea să rămână cu ai lui. Mama îl ia în brațe.',
        'Brațele mamei sunt empatie. În ziua următoare, Vlad îl felicită pe colegul primit în tabără. După tristețe, felicitarea este autostăpânire.',
        'Când pierzi un concurs pentru care ai muncit mult, atitudinea potrivită este aceasta: rămâi pe loc, spui regretul și îl feliciți pe câștigător.',
        'Dacă pleci în tăcere și refuzi podiumul, emoția rămâne nespusă. Nu se vede că ai înțeles ce simți.',
        'Hector Malot, în Singur pe lume, arată un copil căruia îi este teamă să fie luat de acasă. Replicile nu se transcriu. Scenele tale sunt Lia și Vlad.'
      ].join('\n\n'),
      example: [
        'Lia se oprește la afiș: interes. Întreabă de sâmbătă: curiozitate. Spune vin și eu: implicare. Primește lucrul împreună: cooperare.',
        'Vlad, în bucătărie, poartă teamă și tristețe. Îmbrățișarea mamei este empatie. Felicitarea de a doua zi este autostăpânire. După o înfrângere, spui tristețea și îl feliciți pe câștigător.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'După un concurs pierdut, rămâi lângă podium, spui că îți pare rău și îl feliciți pe câștigător. Plecarea fără un cuvânt lasă tristețea nespusă. Locul al doilea rămâne un loc, pentru că ai muncit.'
        }
      ],
      tryThis: 'Despre concursul Școala viitorului scrie patru enunțuri, în ordinea interes, curiozitate, implicare, cooperare. La Vlad numește două emoții și fapta prin care mama arată empatie. Hotărăște cum stai după un concurs pierdut și sprijină alegerea cu două motive din lecție: munca multă și faptul că locul al doilea rămâne un loc.',
      keyPoints: [
        'Cele patru atitudini de grup se văd în fapte, nu doar în intenție.',
        'Să îți cunoști emoția, să o ții în frâu și să o citești la celălalt: aceasta este inteligența emoțională.',
        'După ce pierzi, spui ce simți și îl feliciți pe cel care a câștigat.'
      ]
    }),

    lesson({
      id: 'stilul',
      title: 'Cuvântul potrivit locului',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Patru cerințe',
          text: 'Tema cere adecvare. Sensul exact cere proprietate. Limba standard și situația cer puritate. Ideea ta, nu fraza gata făcută, cere originalitate.'
        }
      ],
      theory: [
        'Stilul este felul tău de a spune lucrurile, cu uneltele limbii. Nu este o podoabă pusă la urmă. Este alegerea cuvântului care se potrivește.',
        'Când ești adecvat la temă, folosești cuvintele-cheie ale ei. Se leagă scrisul, ținta ta și efectul asupra cititorului.',
        'Proprietatea cere ca fiecare termen să redea ideea exact, nu aproximativ. Un cuvânt vag mută tema în altă parte.',
        'Puritatea, împreună cu adecvarea la situație, cere limba standard, un limbaj potrivit locului și o exprimare corectă. La școală nu scrii cum alint acasă.',
        'Originalitatea înseamnă o idee a ta, spusă în felul tău. Nu este o frază luată de-a gata și lipită pe afiș.',
        'Pentru haina de marinar, forma bună este marinar. Marinel, marinal și mariner nu țin de limba standard.',
        'Învățat, cu carte: acesta este procopsit. Spus zâmbind către cineva care tot încurcă un cuvânt, sensul din context este ironic, iar lauda rămâne doar de formă.',
        'Forma de la școală este îi stă bine. Îi șade bine ține de vorbirea veche sau de cea populară. Mamițo este alintare. În clasă spui mamă.',
        'O schiță cunoscută amestecă tocmai formele acestea. La clasă rămân formele potrivite. Replicile schiței nu se reiau.',
        'Afișul unei expoziții de invenții poartă titlul, locul, ziua, ora și un slogan făcut de tine. Termenii exacți sunt invenție, machetă și expoziție. Nu schimba tema pe o vorbă vagă.',
        'Dacă pe afiș scrie doar petrecere, tema s-a pierdut. Cititorul trebuie să vadă că vine la invenții.'
      ].join('\n\n'),
      example: [
        'Fiindcă tema este invenția, afișul anunță expoziție de invenții, nu o simplă petrecere. Pentru haină, termenul exact este marinar. Procopsit, în ironie, nu laudă pe bune.',
        'La școală se potrivește îi stă bine. Sloganul Un obiect, o întrebare este al tău dacă l-ai făcut pentru expoziția din curte, vineri, ora 11.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Afiș: Expoziție de invenții, curtea școlii, vineri, ora 11. Slogan făcut de tine. Machetă și invenție rămân termenii exacți. Marinel pe afiș ar fi forma greșită.'
        }
      ],
      tryThis: 'Dă forma bună pentru haina de marinar și explică procopsit când sensul este ironic. Pentru o propoziție de la școală hotărăște care formă stă: îi stă bine sau îi șade bine. Fă apoi afișul expoziției de invenții, cu titlu, loc, zi, oră și sloganul tău. În două rânduri arată adecvarea la temă și un termen exact.',
      keyPoints: [
        'Cuvântul de stil se potrivește cu tema, cu sensul exact și cu situația.',
        'În limba standard spui marinar. În clasă, formele sunt îi stă bine și mamă.',
        'Sloganul făcut de tine este originalitatea. Fraza copiată nu este.'
      ]
    }),

    lesson({
      id: 'drumetie',
      title: 'Trei popasuri de scris',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei tipare',
          text: 'Întâi narațiunea, cel mult 100 de cuvinte. Apoi descrierea, între 70 și 90. La urmă explicația, cu pași, cauză și concluzie.'
        }
      ],
      theory: [
        'Drumeția de redactare cere trei tipare deja cunoscute. Nu le amesteci în același popas. Le scrii pe rând și abia apoi le poți uni.',
        'Popasul întâi este narațiune și nu trece de 100 de cuvinte. Are personaje și o întâmplare. Pune și un reper de timp, și unul de spațiu.',
        'Popasul al doilea este o descriere, de la 70 până la 90 de cuvinte. Alegi un loc, pui detalii și perechi de substantiv cu adjectiv.',
        'Popasul al treilea este un text explicativ despre fulger: pași, o cauză, o concluzie. Nu este poveste cu eroi. Este o lămurire.',
        'Norul se încarcă cu electricitate. Urmează descărcarea, între nori sau între nor și sol. Acea descărcare se numește fulger.',
        'Ochiul primește lumina aproape pe loc. Sunetul întârzie și poartă numele de tunet. De aceea vezi fulgerul mai devreme decât auzi tunetul.',
        'Încheierea explicației: lumina este mai rapidă decât sunetul. Fără această încheiere, rămâi cu o listă de pași.',
        'Cele trei bucăți se pot uni într-o poveste cu titlu, de 100 până la 150 de cuvinte. Narațiunea duce, descrierea oprește privirea, explicația lămurește fulgerul.',
        'Nu lua un peisaj gata făcut. Poteca dintre școală și pădure poate fi locul tău. Luminișul este al tău.',
        'Model scurt de narațiune: sâmbătă, ora 8, plecarea din curtea școlii către pădure. Are timp, spațiu și o plecare.',
        'Model scurt de descriere: în luminiș, iarbă verde și un fag înalt. Sunt două perechi de substantiv cu adjectiv.',
        'Model scurt de explicație: fulgerul se arată înaintea tunetului, fiindcă lumina ajunge mai repede decât sunetul. Sunt cauză și concluzie.'
      ].join('\n\n'),
      example: [
        'Narațiune: sâmbătă la ora 8 am ieșit din curtea școlii, către pădure. Descriere: luminișul ține iarbă verde și un fag înalt.',
        'Explicație: fulgerul se vede întâi, tunetul se aude după, pentru că lumina câștigă cursa cu sunetul. Titlul leagă popasurile, iar fiecare își păstrează tiparul.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Patru pași, pe scurt: nor încărcat, descărcare, lumină imediată, sunet întârziat. Concluzia stă separat: lumina o ia înaintea sunetului. Dacă lipsește concluzia, textul nu este încă explicație.'
        }
      ],
      tryThis: [
        'Redactează popasurile pe rând. Narațiunea nu trece de 100 de cuvinte. Plecarea este sâmbătă, ora 8, din curtea școlii către pădure.',
        'Luminișul se descrie în 70 până la 90 de cuvinte, cu două epitete. Despre fulger scrii șase până la opt rânduri: cei patru pași și încheierea, anume că lumina ajunge înaintea sunetului. Adaugă un titlu.'
      ].join('\n\n'),
      keyPoints: [
        'Trei popasuri, trei tipare: narațiune, descriere, explicație, fiecare cu limita ei de întindere.',
        'Descărcarea este fulgerul, sunetul de după este tunetul, iar lumina o ia înainte.',
        'Poteca dintre școală și pădure poate fi locul tău. Nu copia un peisaj străin.'
      ]
    }),

    lesson({
      id: 'sintaxa-principale',
      title: 'Subiectul și predicatul, din nou',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Două părți principale',
          text: 'Subiectul și predicatul se cer unul pe altul: interdependență. Atributul, complementul și circumstanțialul stau în subordonare, nu în același raport.'
        }
      ],
      theory: [
        'Părțile principale sunt subiectul și predicatul. Unul îl cheamă pe celălalt.',
        'Subiectul se exprimă prin substantiv, prin pronume sau prin numeral. Poate lipsi din enunț: stă inclus în terminația verbului ori se subînțelege din context.',
        'Un verb predicativ este predicat verbal. Verbul copulativ a fi, împreună cu numele predicativ, este predicat nominal.',
        'Subordonarea leagă substantivul de atributul lui. Aceeași subordonare leagă verbul de complement sau de circumstanțial.',
        'Fragmentul, tăiat în propoziții. Prima: Irina s-a trezit dis-de-dimineață. A doua: Plouă. A treia: Fetița stă la fereastră. Admiră stropii rebeli.',
        'A patra: Seamănă cu niște lacrimi de nori. A cincea: Ea știe cum se formează ploaia. A șasea: vrea să își imagineze altceva. A șaptea: scopul este să treacă timpul mai repede.',
        'Numărătoarea predicatelor dă zece: s-a trezit, apoi plouă, apoi stă, admiră, seamănă, apoi știe, se formează, apoi vrea, să își imagineze și să treacă.',
        'Exprimate sunt Irina, fetița, ea, ploaia și timpul. La plouă nu există subiect, căci verbul este impersonal.',
        'La seamănă, stropii se subînțeleg. La vrea și la să își imagineze se subînțelege ea. La să treacă, subiectul este timpul.',
        'Circumstanțial de timp, dis-de-dimineață, determină s-a trezit. Circumstanțial de loc, la fereastră, determină stă.',
        'Complement direct, stropii, determină admiră. Complement prepozițional, cu niște lacrimi, determină seamănă. Atribut adjectival: rebeli. Atribut substantival prepozițional: de nori.',
        'În Florile sunt roșii, subiectul este florile, iar roșii este nume predicativ. Subiect multiplu are enunțul Fetele și băieții susțin aceleași probe sportive.',
        'La Am ascultat părerile tuturor, subiectul nu este scris: este inclus, persoana I, eu, în terminația verbului.',
        'Grupa verbelor predicative: a sosit, apoi au înflorit, apoi se vor juca, apoi zâmbește și face. Grupa nominală: sunt parfumate și delicate, apoi sunt bucuroși, apoi să fim fericiți.',
        'Numele predicative sunt adjective. Multiplu este unul: parfumate și delicate.',
        'Pluralul vârfurile cere învăluite. Pluralul articolele cere nu îndeplinesc. Două subiecte, ploaia și vântul, cer mi-au stricat. Masculinul plural, pentru băieții și fetele, cere interesați.'
      ].join('\n\n'),
      example: [
        'Predicatele, pe grupuri: s-a trezit și plouă, apoi stă cu admiră și seamănă, apoi știe cu se formează, apoi vrea cu să își imagineze și cu să treacă.',
        'Subiect este florile. Subiect multiplu sunt fetele și băieții. Subiect inclus are am ascultat. Predicat nominal, cu nume predicativ multiplu: sunt parfumate și delicate.',
        'Acordul bun dă învăluite, nu îndeplinesc, mi-au stricat și interesați.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A sosit primăvara: predicat verbal, a sosit, subiect primăvara. Florile sunt parfumate și delicate: predicat nominal, cu nume predicativ multiplu. Plouă rămâne fără subiect.'
        }
      ],
      practice: [
        '1) Câte predicate are fragmentul despre Irina? Scrie-le pe cele zece.',
        '2) Ce subiect are plouă? Ce se subînțelege la seamănă?',
        '3) Florile, în Florile sunt roșii, este subiect sau nume predicativ? Unde este subiectul multiplu?',
        '4) Desparte a sosit primăvara de florile sunt parfumate și delicate. Ce formă cer vârfurile?'
      ].join('\n\n'),
      answers: [
        'zece, pe grupuri: s-a trezit și plouă, apoi stă cu admiră și seamănă, apoi știe cu se formează, apoi vrea cu să își imagineze și cu să treacă',
        'niciunul, verbul este impersonal; stropii',
        'subiect; roșii este nume predicativ; enunțul cu fetele și băieții',
        'a sosit este predicat verbal; sunt parfumate și delicate este predicat nominal; învăluite'
      ],
      mistakes: 'Nu căuta subiect la plouă. Două subiecte duc predicatul la plural, deci mi-au stricat, nu mi-a stricat. Pentru băieții și fetele, forma este interesați.',
      tryThis: 'Arată cine se subînțelege la vrea și, separat, la să își imagineze, apoi subiectul lui să treacă. Alege forma pentru articolele, pentru ploaia și vântul și pentru băieții și fetele.',
      keyPoints: [
        'Cele două părți principale se cheamă una pe alta. Subiectul poate fi scris, inclus sau doar subînțeles.',
        'Verbul predicativ dă predicatul verbal. A fi plus numele predicativ dă predicatul nominal.',
        'Subiectul multiplu cere pluralul. Verbul plouă rămâne fără subiect.'
      ]
    }),

    lesson({
      id: 'sintaxa-secundare',
      title: 'Atribut, complement, circumstanțial',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Lângă cine stă',
          text: 'Lângă un nume stă atributul. Lângă verb, complementul răspunde la ce sau la cui. La unde, când și cum răspunde circumstanțialul.'
        }
      ],
      theory: [
        'După subiect și predicat vin atributul, complementul și circumstanțialul. Atributul ține de un substantiv, de un pronume sau de un numeral.',
        'Felurile lui sunt adjectival, substantival prepozițional, substantival genitival, pronominal prepozițional și pronominal genitival.',
        'Atributul adjectival interesantă stă în enunțul Am citit o carte interesantă. Plăcerea fetei este de a citi. Aici fetei este genitival de substantiv, iar de a citi este nume predicativ.',
        'La două fete rămase în clasă, atributul numeral este două. Grupul în clasă este circumstanțial de loc.',
        'Vestea se taie: Am primit cu bine vestea. Urmează grupul de la tine, atribut pronominal prepozițional. Cu bine este circumstanțial de mod.',
        'La schimbarea de cărți, genitival de substantiv este schimbării. Prepozițional de substantiv este de cărți. Nume predicativ este genială.',
        'Propoziția cu Le-am spus, cu părinților mei și cu cumpărarea unei cărți are două complemente directe și un indirect.',
        'O carte este directul lui voi cumpăra. Propoziția cu că este directul lui am spus, fiindcă răspunde la ce le-am spus. Părinților este indirectul. Le- doar îl dublează.',
        'Școala își schimbă rolul. Subiect: Școala și-a deschis porțile. Cu despre: complement prepozițional. Direct: Am văzut noua școală. De loc: Eu locuiesc lângă școală. Genitival: școlii, în Porțile școlii. Cu pentru: pentru școală, lângă uniforme.',
        'Despre stă la copilărie. La stă când te gândești la tine. Pentru stă la flori pentru mama. Cu stă la concursul cu un atlet. Din stă separat: din prezentarea ta nu iese imaginea satului.',
        'Vacanță. Timp: în vacanța de vară, în zilele frumoase, de dimineața până seara, în fiecare dimineață. Loc: la bunici, acolo, pe ulițele satului. Mod: cu plăcere și împreună cu prietenii mei.',
        'Mod cu substantiv. Am pășit fără teamă. Apoi Merge ca o barcă, legănată. Apoi Am ales cu grijă cadoul. La final, comparația: Fata este mai vorbăreață decât sora.',
        'Lista de adverbe: lin, apoi încet, apoi rapid, apoi tare. Timp cu prepoziție: Peste o săptămână plecăm. Alt enunț: În tinerețe a călătorit.'
      ].join('\n\n'),
      example: [
        'Adjectival: interesantă. Genitival: fetei. Numeral: două. Pronominal prepozițional: de la tine. Mod: cu plăcere. Timp: în fiecare dimineață.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Peste o săptămână plecăm: săptămână stă într-un circumstanțial de timp. Am pășit lin: lin este circumstanțial de mod, adverb. Pentru școală, lângă uniforme, rămâne atribut, nu complement.'
        }
      ],
      practice: [
        '1) Ce fel de atribut este interesantă, ce fel este fetei și ce fel este două?',
        '2) La Le-am spus, la părinților și la o carte, câte directe și câte indirecte sunt? De ce le- nu mai adaugă un indirect?',
        '3) Ce funcție are școală când își deschide porțile, când este văzută, când stai lângă ea și în porțile școlii?',
        '4) Alege despre, la sau cu, pe rânduri separate. Întâi vorbim mereu ... copilărie. Apoi mă gândesc ... tine. La urmă nu pot concura ... un atlet.'
      ].join('\n\n'),
      answers: [
        'adjectival; substantival genitival; numeral',
        'două directe, un indirect; le- doar îl dublează pe părinților',
        'subiect; complement direct; circumstanțial de loc; atribut substantival genitival',
        'despre; la; cu'
      ],
      mistakes: 'Forma le- nu este un al doilea complement indirect. Atributul nu determină verbul. Un circumstanțial de loc nu se lipește de substantiv ca și cum ar fi atribut.',
      tryThis: 'Fă un enunț în care săptămână este circumstanțial de timp și unul în care lin este circumstanțial de mod. Spune rolul lui cu bine la veste și rolul lui genială la schimbarea de cărți.',
      keyPoints: [
        'Atributul se lipește de un nume și își ia felul din forma acelui determinant.',
        'La ce răspunde complementul direct, la cui cel indirect, iar cel cu prepoziție își arată legătura.',
        'Dublura le- nu înmulțește indirectul. Unde, când și cum țin de circumstanțial.'
      ]
    }),

    lesson({
      id: 'diaspora',
      title: 'Români care au dus țara cu ei',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Două noțiuni',
          text: 'Personalitatea are aptitudini, autoritate, prestigiu și o contribuție de preț. Diaspora este grupul etnic trăitor dincolo de granița țării de origine.'
        }
      ],
      theory: [
        'Personalitatea este omul cu aptitudini rare, cu autoritate, cu prestigiu și cu o contribuție de preț în societate, în cultură sau în știință.',
        'Nadia Comăneci este gimnastă și a primit, la Jocurile Olimpice, prima notă de 10. La nai cântă și compune Gheorghe Zamfir, muzician.',
        'Biolog, medic și inventatoare a fost Ana Aslan. Compozitor și muzician a fost George Enescu. Inventator și pionier în aerodinamică a fost Henri Coandă. Sculptor modern a fost Constantin Brâncuși.',
        'Dinu Lipatti s-a născut în București, pe 19 martie 1917. George Enescu i-a fost naș de botez. În 1922, o fotografie îi arată pe amândoi.',
        'La chitară și la flaut cânta bunicul, Constantin Lipatti. Tatăl ar fi vrut vioară. Dinu rămânea legat de pian. A ajuns pianist și compozitor.',
        'Factura lucrărilor este neoclasică, cu influențe franceze și românești. Din pian se văd virtuozul și emoția.',
        'Locul nașterii lui George Enescu este Liveni-Vârnav, cătun între dealurile Dorohoiului. Actul poartă data de 9 august 1881 și notează nașterea ca fiind alaltăieri.',
        'Stilul vechi dă ziua de 7. Stilul nou dă ziua de 19. Data de 19 este cea nouă.',
        'Întâi, se spune, și-a făcut singur o vioară, din șindrilă și din sârme. A probat și un strujan de porumb. Abia apoi părinții i-au cumpărat o vioară mică.',
        'Primele lecții, după ureche, le-a luat de la lăutarul Lae Chioru, din Dorohoi. În copilăria aceasta se văd talentul și pasiunea.',
        'După anii din străinătate, a spus că a luat cu el dealurile, văile și pădurile Moldovei, așa că nu le-a părăsit. Frazele lui despre muzică nu se lipesc aici.',
        'Li se potrivesc patru cuvinte: talent, emoție, pasiune, virtuoz. La Enescu, talentul și pasiunea. La Lipatti, virtuozul și emoția.'
      ].join('\n\n'),
      example: [
        'Nota 10, întâi la Jocurile Olimpice, este a gimnastei Nadia Comăneci. Naiul este al lui Gheorghe Zamfir. Medicina și invenția sunt ale Anei Aslan. Compoziția este a lui George Enescu. Aerodinamica este a lui Henri Coandă. Sculptura modernă este a lui Constantin Brâncuși.',
        'Data lui Lipatti este 19 martie 1917, iar nașul este Enescu. Liveni-Vârnav este locul lui Enescu, iar 19 ține de stilul nou. Lecțiile după ureche vin de la Lae Chioru.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Copil, Enescu încearcă o vioară din șindrilă și sârme, apoi un strujan. Părinții cumpără o vioară mică. Fapta arată pasiune, înainte de lecțiile după ureche date de Lae Chioru.'
        }
      ],
      tryThis: [
        'Asociază domeniul fiecăruia: întâi Nadia Comăneci, apoi Gheorghe Zamfir, apoi Ana Aslan, apoi George Enescu, apoi Henri Coandă, apoi Constantin Brâncuși. Pentru Dinu Lipatti dă ziua nașterii, nașul și instrumentul ales în locul viorii.',
        'Pentru Enescu dă locul nașterii, rostul zilei de 19 pe stil nou și numele celui de la care a învățat după ureche. În opt rânduri povestește despre unul singur: o faptă de copil și unul dintre cuvintele talent, pasiune, virtuoz. La final, definește diaspora.'
      ].join('\n\n'),
      keyPoints: [
        'Dincolo de granița țării de origine, grupul etnic se numește diaspora. Contribuția face personalitatea.',
        'Lipatti, 19 martie 1917, a rămas la pian. Nașul a fost Enescu.',
        'Din Liveni-Vârnav, lecțiile după ureche i-au venit de la Lae Chioru. Moldova a plecat cu el.'
      ]
    }),

    lesson({
      id: 'proiect-descoperiri',
      title: 'O descoperire care a schimbat lumea',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Fișa proiectului',
          text: 'În grup există un lider. Notați autorul, istoricul scurt, impactul, opera unde se vede și modul de prezentare.'
        }
      ],
      theory: [
        'Lucrul este de grup și are un lider. Nu copiați un articol gata scris. Faptele de mai jos se spun cu vorbele voastre.',
        'Viața oamenilor s-a schimbat prin foc, prin unelte de piatră, prin roată, prin curent electric, prin tipar, prin telefon, prin radio, prin automobil, prin vaccinuri, prin computer și prin internet.',
        'La telefon, brevetul lui Alexander Graham Bell este din 1876. Telefonul mobil apare aproape un secol mai târziu.',
        'La bec, Thomas Edison a ridicat un sistem de iluminat: generator, cabluri, bec cu filament de carbon. Pentru sistem, anul notat este 1876. Pentru lampa lui, brevetul american este din 1879.',
        'Dacă se cere anul sistemului, scrii 1876 și precizezi că este anul înregistrat pentru sistem. Anul 1879 rămâne al brevetului.',
        'La avion, zmeiele sunt între cele mai vechi obiecte care zboară, cam din anul 200 înainte de Hristos, în China.',
        'Data lui Traian Vuia este 18 martie 1906: primul zbor cu motor propriu, al unui aparat mai greu decât aerul, ridicat de el însuși.',
        'Trei numere țin istoricul: rularea de circa 50 de metri, zborul de 12 metri, înălțimea de 1 metru.',
        'LGP-30, din 1956, a fost întâiul computer personal. Prețul: 47000 de dolari, cam 414000 de dolari azi.',
        'Internetul este rețeaua de pe tot globul, folosită zilnic de miliarde de oameni. Cercetătorii au fost mai mulți. Cel creditat aici cu invenția este Lawrence Roberts.',
        'Din secolul al XIX-lea, Jules Verne a închipuit submarine și drumuri spre Lună. Romanul din 1870 l-a influențat pe Simon Lake, pionier al submarinelor.',
        'Român din Ardeal, Hermann Oberth a căpătat de la mamă De la Pământ la Lună, a știut-o pe dinafară. Cifrele le-a controlat, iar corecte erau doar o parte. Curiozitatea i-a crescut.',
        'Pe la 14 ani a făcut un model de rachetă. Singur a ajuns la arderea pe etape. Combustibilul consumat ușurează racheta, rezervorul gol nu mai folosește, deci etapele se desprind.',
        'Poate intra la personalitățile care au lucrat și peste graniță. Submarinul din textul tău poate trimite la romanul din 1870. Racheta poate trimite la romanul din 1865.'
      ].join('\n\n'),
      example: [
        'Alegerea grupului este avionul, iar lider este Ana. Pentru 18 martie 1906, numele din lecție este Traian Vuia. Trei numere fac istoricul scurt: 50 de metri la rulare, 12 metri în zbor, 1 metru înălțime.',
        'Impact: s-a ridicat, cu motorul lui, un aparat mai greu decât aerul. Cartea este un roman de Jules Verne despre zbor. Forma de prezentare este un afiș.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'La bec, 1876 este anul notat pentru sistemul cu generator, cabluri și filament de carbon. 1879 este brevetul american al lămpii. Dacă amesteci anii, istoricul scurt se strică.'
        }
      ],
      tryThis: [
        'Alege unul dintre telefon, bec, avion, computer și internet. În opt până la zece rânduri spune cine este autorul, care an din lecție îl legi, impactul într-o singură propoziție și, dacă se potrivește, o carte a lui Verne.',
        'La bec pune amândoi anii, 1876 și 1879, cu rostul fiecăruia. La Vuia pune data și cele trei numere. În șase rânduri aparte arată de ce Hermann Oberth poate sta la personalitățile din diaspora: Ardealul, cartea de la mamă, cifrele verificate, racheta pe etape.'
      ].join('\n\n'),
      keyPoints: [
        'Fișa spune autorul descoperirii, vremea, schimbarea adusă și cartea în care apare.',
        'Brevetul lui Bell este din 1876. La bec, sistemul ține de 1876, iar lampa de 1879.',
        'Zborul lui Vuia este la 18 martie 1906. Oberth a controlat cifrele lui Verne și a gândit etapele rachetei.'
      ]
    }),

    lesson({
      id: 'recap-ferestre',
      title: 'Încheierea despre viitor',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Ce se leagă',
          text: 'Încheierea pune la un loc o părere argumentată, un atribut, o emoție și circumstanțiale de loc și de timp. Scena este scrisă aici.'
        }
      ],
      theory: [
        'Unitatea se închide pe o scenă scrisă aici, nu pe un text adus din altă parte. Vineri dimineața, Irina stă la fereastra clasei și își spune o părere.',
        'Părerea ei: orașul viitorului are nevoie de liniște. Deschiderea este părerea mea este că. Aceasta este ipoteza.',
        'Argumentul: lectura copiilor merge mai bine în lipsa zgomotului. Conectorul este în primul rând. Un singur sprijin ajunge în scena aceasta.',
        'Încheie spunând că ar așeza parcuri printre blocuri. Conectorul de închidere este așadar. Ipoteza, argumentul și concluzia stau în trei replici scurte.',
        'Pe masă stătea o machetă mică. Mică este atribut adjectival: stă lângă substantivul machetă și arată o însușire.',
        'La fereastră este circumstanțial de loc. Răspunde la unde stă Irina. Vineri dimineața este circumstanțial de timp. Răspunde la când vorbește.',
        'Irina era bucuroasă. Bucuroasă este emoție și, în același timp, nume predicativ, pe lângă era. Emoția are nume, nu rămâne doar un zâmbet.',
        'Din scenă lucrezi în trei timpi. Notezi ce este scris. Spui ce vezi. La urmă spui fapta ta, legată prin pentru că.',
        'Ce vezi pornește cu O văd. Fapta ta se leagă de liniște sau de macheta mică, nu de o idee adusă din afara scenei.',
        'Descrierea de după scenă ține un oraș al viitorului și are între 70 și 100 de cuvinte. Pune minimum cinci atribute. Locul cere două circumstanțiale. Timpul cere alte două.',
        'Atributul stă lângă un nume, ca mică lângă machetă. Circumstanțialul de loc răspunde la unde. Cel de timp răspunde la când, ca vineri dimineața.',
        'Dacă în descriere lipsește emoția, recapitularea rămâne doar gramatică. Bucuria Irinei arată că emoția se numește, cum ai făcut la atitudini.'
      ].join('\n\n'),
      example: [
        'Ce este scris: vineri dimineața, la fereastră, Irina dă o părere, un argument și închide prin așadar, lângă o machetă mică. Vederea: o văd la geam, iar macheta stă pe masă.',
        'Aș fi așezat o bancă pe machetă, fiindcă Irina vorbea despre liniște, iar macheta era mică. Bucuria este emoția. Mică rămâne atribut adjectival.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ipoteză: părerea mea este că. Argument: în primul rând. Concluzie: așadar. Loc: la fereastră. Timp: vineri dimineața. Atribut: mică. Emoție și nume predicativ: bucuroasă.'
        }
      ],
      tryThis: [
        'Pentru Irina, trei propoziții: ce este scris, ce vezi, ce ai face, cu pentru că. Ce vezi pornește cu O văd. Apoi identifici ipoteza, argumentul, concluzia, atributul, emoția.',
        'Adaugă o descriere despre un oraș al viitorului, lungă de 70 până la 100 de cuvinte. Pune măcar cinci atribute. Locul cere două circumstanțiale. Timpul cere alte două.'
      ].join('\n\n'),
      keyPoints: [
        'Închiderea adună o părere cu argument, un atribut și o emoție spusă pe nume.',
        'Vorbirea Irinei este vineri dimineața, la fereastră, despre liniște, lângă o machetă mică.',
        'Atributul este mică. Locul este la fereastră. Timpul este vineri dimineața. Emoția este bucuroasă.'
      ]
    })
  ]
};
