'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f){return romanaLesson(f);}

module.exports = {
  id: 'tablouri-de-poveste',
  title: 'Tablouri de poveste',
  inOwnWords: 'Unitatea lucrează descrierea, pastelul, epitetul, enumerația, versificația, afișul, știrea, ascultarea activă, adjectivul și mărțișorul. Scenele stau în lecții. Pastelul de deschidere poate fi Rapsodii de primăvară, de George Topîrceanu, iar titlul de la școală poate fi altul. La final vine proiectul despre un ținut de poveste.',
  toc: [
    'Harta unității',
    'Pastelul',
    'Epitetul și enumerația',
    'Versificația',
    'Afișul',
    'Știrea',
    'Ascultarea activă',
    'Textul descriptiv',
    'Adjectivul',
    'Funcțiile adjectivului',
    'Mărțișorul',
    'Proiect: Ținuturi de poveste',
    'Recapitularea unității'
  ],
  glossary: [
    {
      term: 'pastel',
      meaning: 'Poezie care descrie un colț de natură și emoția celui care privește.'
    },
    {
      term: 'epitet',
      meaning: 'Însușire deosebită, pusă lângă un substantiv sau un verb, ca să învie imaginea.'
    },
    {
      term: 'mărțișor',
      meaning: 'Șnur alb și roșu, purtat de 1 martie, la venirea primăverii.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-tablouri',
      title: 'Ce vei lucra despre tablouri',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Harta unității',
          text: 'Descrierea în versuri, figurile, rima, afișul, știrea, adjectivul și mărțișorul stau pe aceeași hartă. Codurile sunt douăsprezece. Un alt titlu la clasă nu schimbă pașii.'
        }
      ],
      theory: [
        'Unitatea Tablouri de poveste se deschide cu harta lucrului. Nu este un rezumat de memorat. Este lista opririlor pe care le parcurgi, una câte una, până la proiect.',
        'Prima oprire este un text care descrie și stă în versuri. Din el recunoști pastelul. Apoi recunoști epitetul și enumerația: însușirea deosebită și șirul de termeni de același fel.',
        'Mai departe numeri silabele unui rând. Spui ce fel de strofă ai și ce fel de rimă leagă finalurile. Măsura, strofa și rima fac împreună versificația.',
        'Două texte de informare se deosebesc clar. Afișul se pune la vedere și anunță un eveniment. Știrea relatează o faptă de actualitate și nu stă în picioare fără sursă.',
        'Ascultarea activă se exersează când cineva îți povestește. Arăți că ai primit mesajul. Nu întrerupi și pui o întrebare care lămurește, nu una care schimbă subiectul.',
        'La redactare scrii tu o descriere. Dacă prinzi un cadru, iese un tablou. Dacă prinzi trăsăturile unei persoane, iese un portret. Planul vine înaintea formei finale.',
        'La gramatică revii la adjectiv. Vezi acordul cu substantivul, gradele de comparație și funcția din propoziție. Adjectivul poate fi atribut sau nume predicativ.',
        'La interculturalitate afli de ce, în prima zi de martie, se poartă un șnur alb și roșu. Obiceiul se numește mărțișor și are legături și în afara țării.',
        'Competențele vizate sunt douăsprezece. Le grupezi așa: 1.2 cu 1.4, apoi 2.1, 2.3, 2.4 și 2.5, apoi 3.1 cu 3.3, apoi 4.1, 4.4 și 4.5, iar la capăt 5.1.',
        'Codurile țin de toată unitatea, nu de o lecție încheiată dinainte. La școală, textul de pe bancă poate purta alt titlu. Întrebările rămân: ce vezi, ce figură recunoști, ce scrii tu.'
      ].join('\n\n'),
      example: [
        'Pe hartă apar, în ordine, pastelul, epitetul, versificația, știrea, adjectivul și mărțișorul.',
        'Douăsprezece coduri arată ținta. Nicio oprire nu le acoperă pe toate de una singură. Titlul de la clasă poate diferi, iar metoda rămâne.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Azi marchezi doar pastelul. Notezi că rima și știrea vin după, adjectivul stă la gramatică, iar mărțișorul închide obiceiul. Lista tot are douăsprezece coduri, de la 1.2 până la 5.1.'
        }
      ],
      tryThis: 'Formulează două enunțuri. Primul arată că tema zilei este tabloul și că începi cu pastelul. Al doilea grupează codurile 1.2 cu 1.4, apoi 2.1, 2.3, 2.4, 2.5, apoi 3.1 cu 3.3, apoi 4.1, 4.4 și 4.5, încheind cu 5.1. Precizează că totalul este douăsprezece.',
      keyPoints: [
        'Harta adună descrierea, figurile, rima, afișul, știrea, adjectivul și obiceiul din martie.',
        'Douăsprezece coduri, de la 1.2 până la 5.1, țin de unitate, nu de o lecție singură.',
        'Un titlu diferit la clasă lasă aceeași metodă: recunoști, numeri, compari, apoi scrii.'
      ]
    }),
    lesson({
      id: 'pastelul',
      title: 'Tabloul și emoția',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Pastel',
          text: 'Versuri despre anotimp, fenomen, interior sau un petec de natură, împreună cu sentimentul privitorului. La noi, termenul a intrat prin Vasile Alecsandri.',
        }
      ],
      theory: [
        'Textul descriptiv literar arată felul unui lucru, al unui spațiu sau al unei ființe. Poate sta în proză ori în versuri. Nu întinde o întâmplare. Se oprește asupra felului de a fi.',
        'Tabloul prinde un cadru, din casă sau de afară. Portretul prinde trăsături de corp ori de caracter. Deosebirea se vede din obiect: un loc sau o persoană.',
        'Pastelul este o operă scrisă în versuri. Poate lua un anotimp, un fenomen, un interior ori un colț de natură. Odată cu priveliștea trece și sentimentul celui care privește.',
        'Cuvântul a venit din franceză, unde numea o pictură făcută cu creioane moi, în culori. În literatura de la noi, Vasile Alecsandri a pus termenul în circulație.',
        'Într-un pastel găsești figuri de stil, imagini artistice, sens figurat și culori. Lângă ele stau perechi formate dintr-un nume și un adjectiv. Cel care scrie își arată sentimentul, nu doar inventarul.',
        'George Topîrceanu a trăit din 1886 până în 1937. A fost poet și prozator, dar și memorialist, publicist și traducător. La 19 ani a debutat în liceu și semna G. Top.',
        'A tipărit Balade vesele și parodii originale. Migdale amare iese în 1928. Scrisori fără adresă iese în 1930. Pirin-Planina iese în 1936. Romanul Minunile Sfântului Sinoe, rămas neterminat, apare în 1938, după moartea sa.',
        'Poezia Rapsodii de primăvară, a aceluiași autor, este un pastel despre primăvară. Rândurile ei nu se copiază aici. În unele tablouri, paner numește un coș mic, împletit, ogeac numește hornul, iar miozotis este o floare măruntă de munte, albastră, roșie sau albă.',
        'Scena de lucru este alta. Luni, dimineața, iarba din grădina școlii era udă și de un verde intens. Pe o ramură de cireș se vedeau flori albe. Un băiat a zis că primăvara îi dă chef să alerge.',
        'Din scenă reții trei lucruri: ce stă scris, ce observi, apoi o faptă a ta, legată prin pentru că. Se arată un loc, deci ai tablou, nu portret. Emoția este bucuria de a alerga.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: luni dimineața, iarba din grădina școlii era udă, pe cireș se vedeau flori albe, iar băiatul avea chef să alerge.',
        'Ce observi: Văd grădina, iarba udă și cireșul înflorit. Eu aș fi ieșit în curte, pentru că verdele și vorba băiatului chemau la alergat. Este tablou. George Topîrceanu a trăit din 1886 până în 1937.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă textul ar spune că băiatul este înalt și răbdător, ai avea portret. Aici locul este centrul, deci tablou. Panerul ar fi un coș, ogeacul un horn, miozotisul o floare de munte.'
        }
      ],
      tryThis: 'Pentru grădina școlii, formulează trei enunțuri, în ordine: conținutul, observația (pornește cu Văd) și o faptă pe care ai face-o, legată cu pentru că. Precizează tablou sau portret și emoția. Adaugă că Vasile Alecsandri a adus termenul pastel în literatura noastră și că volumul Migdale amare, de George Topîrceanu, a ieșit în 1928.',
      keyPoints: [
        'Tabloul arată un loc, portretul arată o persoană, iar pastelul leagă natura în versuri de o emoție.',
        'Vasile Alecsandri a adus termenul din pictura franceză. Topîrceanu, 1886–1937, a scris Rapsodii de primăvară.',
        'În grădina școlii, florile albe și chef de alergat fac un tablou, nu un portret.'
      ]
    }),
    lesson({
      id: 'epitet-enumeratie',
      title: 'Însușirea și șirul',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Două figuri',
          text: 'Epitetul pune o însușire neobișnuită lângă un nume sau un verb. Enumerația așază elemente din aceeași clasă. Între ele stă virgula, iar înaintea ultimului poate sta și ori sau.',
        }
      ],
      theory: [
        'Figurile de stil scot cuvântul din înțelesul lui de toate zilele, ca imaginea să se vadă mai clar. Imaginile pot fi vizuale, auditive sau olfactive: vezi, auzi sau miroși.',
        'Epitetul lipește de un nume sau de un verb o însușire ieșită din comun. Cel mai des este un adjectiv. Nu orice adjectiv ajunge epitet. Trebuie să schimbe privirea, nu doar să informeze.',
        'Epitetul postpus stă după cuvânt: vânt mătăsos. Cel antepus stă înainte: limpede dimineață. Cel simplu are un singur termen: lac liniștit. Cel dublu are doi: rouă rece și clară.',
        'Epitetul multiplu adună mai mulți termeni: o seară lungă, cenușie și liniștită. Cel cromatic numește o culoare neașteptată: cer arămiu. Cel personificator dă și o faptă de om: pârâu grăbit.',
        'Apă rece spune o însușire obișnuită, de termometru. Glas rece este epitet, fiindcă vocea nu are grade de frig. Piatră grea este obișnuită. Tăcere grea este epitet. Copil treaz este obișnuit. Oraș treaz este epitet.',
        'Un epitet se poate desface în comparație. Păr auriu devine păr ca aurul. Cuvântul ca aduce al doilea termen la vedere. Imaginea rămâne, dar legătura se spune pe șleau.',
        'Enumerația pune la rând elemente din aceeași clasă, pentru a întări ideea ori pentru a da detalii.',
        'Pui virgulă între elemente. Capătul șirului se poate uni cu și, ori cu sau. Un șir fără virgulă se citește greu.',
        'Copilul a zărit, lângă gard, trei flori: ghiocei, viorele și păpădii. Deasupra plutea un nor visător. Șirul de flori este enumerație. Nor visător este epitet personificator, fiindcă norul pare să viseze.',
        'Din scenă reții trei lucruri: ce stă scris, ce observi, apoi o faptă a ta, legată prin pentru că. Figurile se numesc pe text, nu din memorie goală. Fiecare exemplu scurt stă lângă un substantiv.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: ghiocei, viorele și păpădii creșteau lângă gard, iar sus plutea un nor visător.',
        'Ce observi: Văd ulucile, florile mărunte și norul de deasupra. Eu aș fi rămas lângă ele, pentru că șirul era la îndemână. Vânt mătăsos este postpus. Limpede dimineață este antepus.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Frunze de smarald este epitet cromatic. Pădure somnoroasă este personificator. Lalele, narcise și toporași fac o enumerație: virgule între primele, și înaintea ultimei.'
        }
      ],
      tryThis: [
        'Alcătuiște patru grupuri: epitet după substantiv, epitet înaintea substantivului, unul de culoare și unul care dă o faptă de om. Treci păr auriu în comparație, folosind ca.',
        'Înșiră trei flori, cu virgule, și pune și doar înaintea ultimei. La gard, notează ce observi (pornește cu Văd) și o faptă a ta, cu pentru că. Explică de ce glas rece este epitet, iar apă rece rămâne o însușire obișnuită.'
      ].join('\n\n'),
      keyPoints: [
        'Epitetul mută privirea: stă înainte sau după cuvânt și poate fi simplu, dublu, multiplu, cromatic sau personificator.',
        'Apă rece informează. Glas rece imaginează. Comparația cu ca desface epitetul în doi termeni.',
        'Enumerația ține termenii de același fel, cu virgulă, iar și sau sau leagă doar capătul șirului.'
      ]
    }),
    lesson({
      id: 'versificatie',
      title: 'Vers, strofă, rimă',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Cinci piese',
          text: 'Versificația, numită și prozodie, lucrează cu versul, strofa, măsura, rima și ritmul. Măsura este numărul de silabe. Rima potrivește finalurile.'
        }
      ],
      theory: [
        'Versificația este tehnica rândurilor de poezie și dă muzicalitatea textului. I se mai spune prozodie. Cele cinci piese se numără separat, apoi se pun laolaltă.',
        'Versul este un rând. Măsura lui este numărul de silabe, nu numărul de cuvinte. Măsura scurtă înseamnă cinci sau șase silabe, ori șapte sau opt. Media ține de la nouă la unsprezece. Lunga ține de la doisprezece la optsprezece.',
        'Strofa grupează două sau mai multe rânduri. Între strofe se lasă un rând gol. Două rânduri fac un distih. Trei fac o terțină. Patru fac un catren. Cinci fac un cvintet. Șase rânduri alcătuiesc o sextină.',
        'Potrivirea de la finalul rândurilor, de la ultima vocală accentuată, se numește rimă. Nu ajunge să semene prima literă. Contează sunetul de la capăt.',
        'Într-un catren, rima împerecheată are schema aabb. Rima încrucișată are schema abab. Rima îmbrățișată are schema abba. Monorima are schema aaaa: toate finalurile sună la fel.',
        'Ritmul înseamnă o cadență: silabe accentuate și silabe slabe, repetate regulat. Rândurile albe rămân fără potrivire la final și fără cadență fixă. Lipsesc ambele, nu doar rima.',
        'Catrenul de lucru are patru rânduri, deci este catren. Primul rând numără nouă silabe, deci măsură medie. Finalul blând se potrivește cu pământ. Finalul privighetoare se potrivește cu înverzitoare.',
        'Pentru că primul rând se leagă de al treilea, iar al doilea de al patrulea, schema este abab. Rima este încrucișată. Rândurile nu se copiază aici. Rămân măsura, schema și perechile de finaluri.',
        'Rândul care spune că un copil iese pe pământ se desparte co-pi-lul, ie-se, pe, pă-mânt. Sunt șapte silabe. Șapte înseamnă măsură scurtă, nu medie și nu lungă.',
        'Un distih ar avea doar două rânduri, fără perechea a treia și a patra. O terțină ar avea trei. Versul alb ar lăsa finalurile fără potrivire și fără cadență regulată.'
      ].join('\n\n'),
      example: [
        'Patru rânduri fac un catren. Nouă silabe la primul rând înseamnă măsură medie. Schema abab este rimă încrucișată: blând cu pământ, privighetoare cu înverzitoare.',
        'Șapte silabe la rândul despre copil și pământ înseamnă măsură scurtă. Un distih s-ar opri la două rânduri. Versurile albe nu rimează.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă toate cele patru finaluri ar suna la fel, schema ar fi aaaa, monorimă. Dacă primul s-ar potrivi cu al patrulea și al doilea cu al treilea, schema ar fi abba, rimă îmbrățișată.'
        }
      ],
      tryThis: 'Notează strofa catrenului de lucru, schema de rimă și câte silabe are primul rând. Arată perechea finalului blând. Definește distihul, terțina și versul alb, fiecare într-o propoziție. Din despărțirea co-pi-lul, ie-se, pe, pă-mânt spune numărul de silabe și dacă măsura e scurtă, medie ori lungă.',
      keyPoints: [
        'Versul este rândul, măsura este numărul de silabe, strofa le grupează, rima le potrivește la final.',
        'Catrenul de lucru are nouă silabe la primul rând și schema abab, deci rimă încrucișată.',
        'Șapte silabe înseamnă măsură scurtă. Rândurile albe nu au nici potrivire, nici cadență fixă.'
      ]
    }),
    lesson({
      id: 'afisul',
      title: 'O veste pusă la vedere',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Afiș',
          text: 'Text tipărit, așezat la vedere, care anunță o întâmplare. Poate uni desenul cu mesajul sau poate rămâne doar desen. Menirea lui este publicitatea.'
        }
      ],
      theory: [
        'Afișul, numit și poster, se tipărește și se așază unde trece lumea. Anunță un eveniment, nu povestește pe larg. Poate uni o imagine cu un mesaj. Poate fi și numai imagine, dacă mesajul se înțelege din desen.',
        'Rolul lui este publicitatea: vrea să fie văzut și să cheme la faptă. Nu înlocuiește o știre, fiindcă nu răspunde pe rând la cine, ce, unde și când într-un text continuu.',
        'Felurile des întâlnite sunt afișul de informare, cel pentru spectacole, cel motivațional și cel de modă. Alegi felul după ce vrei să obții: o prezență, un bilet, un îndemn sau o privire asupra hainelor.',
        'Când îl faci, stabilești întâi publicul. Apoi fixezi o idee clară, spusă scurt. Grafica vine după: fundalul, literele, culorile și ilustrația. La urmă alegi locul, fiindcă de el depinde câți trecători îl observă.',
        'Piesele unui afiș reușit sunt un desen sugestiv, titlul întâmplării, cine organizează, unde, în ce zi și la ce oră, plus un slogan. Sponsorii intră dacă există. Fără oră sau fără loc, anunțul rămâne incomplet.',
        'Sloganul este o propoziție scurtă, ușor de reținut. Nu repetă tot anunțul. Imaginea ține de idee: un tei mic pentru o plantare, nu un desen oarecare pus doar ca să umple golul.',
        'Modelul se cheamă Plantăm tei. Școala cheamă elevii în curte, luni, la ora 10. Sloganul ales este Un tei pentru curte, iar desenul arată un tei mic.',
        'Aici stau titlul, cine cheamă, locul, ziua, ora, sloganul, desenul și publicul. Dacă scoți ora, oamenii nu știu când să vină. Dacă scoți locul, nu știu unde.',
        'Nu copiezi un afiș gata făcut. Îi iei doar lista de piese și o umpli cu faptele tale. Literele mari ajută de la distanță. Nu țin loc de dată.'
      ].join('\n\n'),
      example: [
        'Plantăm tei este numele. Școala organizează, curtea este locul, luni la ora 10 este momentul.',
        'Sloganul Un tei pentru curte stă lângă desenul unui tei mic. Publicul sunt elevii. Afișul este complet.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un afiș pentru o recitare în sală ar pune data, ora, numele sălii și un slogan de o propoziție. Fără oră, anunțul rămâne incomplet, chiar dacă desenul este frumos.'
        }
      ],
      tryThis: 'Schițează un afiș pentru expoziția de desene cu tema primăvara. Treci titlul, cine organizează, unde se ține, ziua, ora și un slogan de o singură propoziție. Spune ce desen ai alege și cui i se adresează. Nu relua un model gata tipărit.',
      keyPoints: [
        'Afișul anunță un eveniment la vedere și poate uni imaginea cu textul.',
        'Complet înseamnă titlu, cine cheamă, unde, zi, oră, slogan și un desen legat de idee.',
        'Locul unde îl pui decide câți oameni îl văd. Un desen fără dată nu cheamă pe nimeni.'
      ]
    }),
    lesson({
      id: 'stirea',
      title: 'Cine, ce, unde, când',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei părți',
          text: 'Introducerea dă cine, ce, unde și când. Corpul adaugă detalii. Încheierea fixează ideea. Fără sursă, relatarea nu este știre.'
        }
      ],
      theory: [
        'Știrea spune, pe scurt, fapte, întâmplări sau idei de azi. Publicul are interes pentru ele, iar mesajul circulă prin mijloace de informare. Nu este o părere lungă și nu este un afiș.',
        'Întrebările sunt șase: ce s-a întâmplat, cine a luat parte, unde, când, din ce motiv și în ce fel. Dacă lipsește una, cititorul rămâne cu o gaură. Titlul prinde esența și cheamă ochiul, prin îngroșare, prin culoare sau prin majusculă.',
        'Scurt nu înseamnă automat știre. Nici o știre nu trebuie să fie foarte scurtă. Contează actualitatea și interesul, nu doar numărul de rânduri. O întâmplare veche, fără legătură cu publicul, nu intră aici.',
        'Are trei etaje. Partea de început, căreia i se spune și capul știrii, strânge cine, ce, unde și când. La mijloc stau amănuntele. Fraza de închidere oprește ideea, fără un subiect nou.',
        'O știre bună este coerentă: spune un singur lucru. Este concisă: mult în puține cuvinte. Este clară: se înțelege din prima citire. Trei calități, nu una singură.',
        'O relatare fără sursă nu este știre. Cine declară se prezintă cu numele și cu funcția. Nu ajunge un a spus cineva. Cititorul trebuie să știe cine a declarat și din ce rol.',
        'Cuvântul echinocțiu vine din latină. Aequus înseamnă egal, nox înseamnă noapte. Este clipa în care ziua ține cât noaptea. Știrea de lucru nu este despre acest cuvânt. Este despre o plantare.',
        'Luni, ora 10, elevii din clasa a VI-a au sădit trei tei în curtea școlii. Ana Pop, directoarea, a declarat că plantarea marchează începutul primăverii. Sursa numită este anunțul școlii.',
        'Introducerea ține cine, ce, unde și când. De ce stă în vorbele directoarei. Cum este plantarea însăși, anunțată de școală. Titlul poate fi scurt: Trei tei în curtea școlii.'
      ].join('\n\n'),
      example: [
        'Cine a sădit: elevii clasei a VI-a, iar Ana Pop a vorbit ca directoarea. Fapta: trei tei. Locul: curtea. Momentul: luni, ora 10.',
        'Motivul: începutul primăverii. Felul: plantare anunțată de școală. Primele patru răspunsuri țin de introducere. Sursa rămâne anunțul școlii.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Titlul Trei tei, luni, în curte spune esența. Dacă lipsește anunțul școlii, textul rămâne o poveste de clasă, nu o știre. Funcția, directoarea, stă lângă numele Ana Pop.'
        }
      ],
      tryThis: 'La plantarea teilor, notează cine, ce, unde, când, motivul, felul și sursa. Propune un titlu scurt. Apoi compune o știre nouă, între 60 și 80 de cuvinte, despre ceva petrecut în curtea școlii: un început, două amănunte și o frază de încheiere. Pune un nume lângă funcție și indică sursa.',
      keyPoints: [
        'Cele șase întrebări, de la cine până la cum, stau pe o sursă.',
        'Are introducere, corp și încheiere. Este coerentă, concisă și clară.',
        'Ana Pop este numită cu funcția de directoarea. Sursa plantării este anunțul școlii.'
      ]
    }),
    lesson({
      id: 'ascultare-activa',
      title: 'Întâi asculți',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Ascultare activă',
          text: 'Primești mesajul și lucrezi cu ideile. Arăți interes, lași timp, eviți întreruperea, pui o întrebare care lămurește și ai răbdare. Pasivă este cea care nu dă niciun semn.'
        }
      ],
      theory: [
        'Comunicăm ca să învățăm unii de la alții. Ca să iasă schimbul, îți trebuie vorbire, scris, tăcere, ascultare și prezență lângă celălalt. Lipsește una, și mesajul se rupe.',
        'Ascultarea ocupă partea cea mai mare. Mesajul nu ajunge dacă nu este primit. Poți vorbi limpede și totuși să nu fii înțeles, dacă celălalt este deja la altă idee.',
        'Ascultarea pasivă îl lasă pe vorbitor fără semn că a fost auzit. Taci, dar nu arăți că urmărești. Celălalt nu știe dacă să continue sau să se oprească.',
        'Când asculți activ, primești mesajul și lucrezi cu ideile lui. Nu repeți mecanic tot ce ai auzit. Arăți că ai prins firul și că vrei să îl lămurești.',
        'Semnele se văd: interes, răbdare, timp lăsat celuilalt, o întrebare care lămurește, un semn de încurajare și empatie. Întreruperea lipsește. Nu le declari doar, le arăți.',
        'Ideea de ținut minte este simplă: vorbitorul bun este întâi un ascultător bun. Dacă nu auzi ce ți se spune, răspunsul tău pleacă din altă poveste.',
        'Marți, pe hol, Radu i-a povestit Liei că și-a pierdut caietul de română. Lia l-a privit până la capăt. Întrebarea ei a fost despre ultimul loc în care Radu văzuse caietul. El a indicat banca de la geografie.',
        'Lia dă două semne de ascultare activă. Întâi nu taie vorba. Apoi pune o întrebare care îl ajută pe Radu să caute, nu una care schimbă subiectul spre alt caiet.',
        'Din scenă reții trei lucruri: ce stă scris, ce observi, apoi o faptă a ta, legată prin pentru că. Ce observi, la persoane, începe cu Îi văd. Empatia nu înseamnă să vorbești tu în locul lui.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: pe hol, Radu îi spune Liei de caietul pierdut, iar ea întreabă de ultimul loc, fără să-i taie vorba.',
        'Ce observi: Îi văd față în față, pe hol. Eu aș fi căutat banca de la geografie, pentru că acolo a indicat el. Felul Liei de a asculta este activ.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă Lia ar fi spus imediat și eu mi-am pierdut pixul, ascultarea ar fi devenit pasivă. Subiectul ar fi sărit de la caietul lui la lucrul ei, fără o întrebare de lămurire.'
        }
      ],
      tryThis: 'Pentru hol, fă trei enunțuri: conținutul, observația (pornește cu Îi văd) și o faptă a ta, cu pentru că. Numește două semne ale ascultării Liei. Apoi compune patru replici în care tu asculți: lași vorba întreagă și pui o întrebare care lămurește.',
      keyPoints: [
        'Mesajul ajunge doar dacă este primit. Ascultarea ocupă partea cea mai mare din schimb.',
        'Activ înseamnă interes, timp, fără întrerupere, plus o întrebare care lămurește.',
        'Lia nu taie vorba și întreabă de ultimul loc. Vorbitorul bun începe prin a asculta.'
      ]
    }),
    lesson({
      id: 'text-descriptiv',
      title: 'Cum scrii un tablou',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Patru pași',
          text: 'Stabilești tema și perspectiva. Numi elementele prin substantive și le dai trăsături prin adjective. Apoi pui o figură și o emoție. Ciorna se recitește înainte de forma finală.'
        }
      ],
      theory: [
        'Textul descriptiv prezintă un anotimp, un fenomen, un lucru, un personaj ori un loc, afară sau în casă. Are trăsături generale și trăsături particulare. Nu se mulțumește cu un singur cuvânt de etichetă.',
        'O găsești în proză și în versuri, dar și în știință sau în reclamă. În toate, cineva arată cum este ceva. Schimbă doar scopul: emoție, informație sau convingere.',
        'Cadrul ține de tablou. Persoana ține de portret. Dacă amesteci fără să vrei, cititorul nu știe dacă privește curtea sau chipul. Alegi unul și rămâi la el.',
        'Pașii de lucru sunt clari. Întâi fixezi tema. Apoi alegi de unde privești: dintr-o parte sau din cealaltă, de sus spre jos, ori din față către fundal. Ordinea privirii ține textul unit.',
        'Elementele primesc substantive. Trăsăturile lor primesc adjective. Fără nume, cadrul este gol. Fără adjective, cadrul este o listă seacă.',
        'Limbajul viu cere puțin, dar anume: un epitet, un șir enumerativ, o comparație introdusă de ca și o personificare. Nu le înghesui pe toate în aceeași propoziție. Le distribui.',
        'Spui și o emoție, la persoana potrivită. Înainte de varianta gata, faci un plan, treci o ciornă și o recitești. Recitirea prinde repetițiile și locul uitat.',
        'În curtea școlii, prim-planul este un cireș cu flori albe. Fundalul este gardul verde. Sus, cerul rămâne limpede. Emoția numită este liniștea. Albe, lângă flori, este epitet cromatic.',
        'Cele trei elemente, gard, cireș și cer, pot intra într-un șir, dacă le legi cu virgule. Textul rămâne tablou, fiindcă descrie un loc, nu o persoană. Perspectiva merge din față spre fundal, apoi în sus.'
      ].join('\n\n'),
      example: [
        'Tema este curtea primăvara. Privirea pornește de la cireș, trece la gard și urcă la cer.',
        'Albul florilor este epitet de culoare. Dacă pui gardul, cireșul și cerul în șir, ai enumerație. Emoția rămâne liniștea. Centrul este locul, deci tablou.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Plan scurt: tema este curtea, privirea este din mijlocul aleii, elementele sunt cireșul, gardul și cerul. Abia după plan vine ciorna. Forma finală se scrie după ce recitești.'
        }
      ],
      tryThis: 'Compune 80 până la 100 de cuvinte despre un loc, primăvara, cu titlu. Stai la persoana I. Pune un plan apropiat și unul depărtat, un epitet, un șir de termeni și două emoții. Înainte de varianta gata, două rânduri de plan: tema, punctul din care privești și elementele.',
      keyPoints: [
        'Descrierea dă substantive pentru elemente și adjective pentru trăsături, în proză sau în versuri.',
        'Tabloul ține cadrul, portretul ține omul. Perspectiva poate merge din prim-plan spre fundal.',
        'Planul și ciorna vin înaintea formei finale. O emoție închide tabloul, nu îl înlocuiește.'
      ]
    }),
    lesson({
      id: 'adjectivul',
      title: 'Însușirea și gradele',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Acord',
          text: 'Adjectivul își potrivește genul, numărul și cazul cu substantivul. Articolul demonstrativ face la fel. Cel mai rămâne un singur grup, nu se taie.'
        }
      ],
      theory: [
        'Adjectivul este o parte de vorbire flexibilă. Arată însușirea unui obiect și stă pe lângă un substantiv.',
        'După fel, poate fi propriu-zis, ca bun, dulce, frumos, sau venit din participiu, ca citită, desenată, scrisă.',
        'Patru înfățișări are înalt: înalt, înaltă, înalți, înalte. Trei are drag: drag, dragă, dragi. Două au mare și mari, iar separat vechi și veche.',
        'Unele nu se schimbă deloc: gri, roz, bej, cumsecade, oranj, vivace.',
        'Potrivirea privește genul, numărul și cazul. De obicei stă după nume: stele strălucitoare. Dacă trece în fața numelui, ia el articolul hotărât, ca în strălucitoarele stele.',
        'Legătura prin cel, cea, cei, cele se numește articol demonstrativ, de pildă fata cea harnică. La masculin ai cel, celui, cei, celor. La feminin ai cea, celei, cele, celor. Și articolul se potrivește: la copiii cei cuminți, la florile cele roșii.',
        'Scrii cel mai într-un singur șir, nu ce-l mai. La dativ, băiatului celui neastâmpărat cere celui, nu cel. La genitiv-dativ feminin, elevei celei silitoare cere celei, nu cea.',
        'Gradele măsoară intensitatea. La pozitiv nu compari nimic, ca în miresme plăcute. Egalitatea spune la fel de catifelate. Superioritatea spune mai dulce. Inferioritatea spune mai puțin dulce.',
        'Superlativul relativ de superioritate sună cele mai frumoase. De inferioritate sună cea mai puțin dulce. Absolut de superioritate sună foarte strălucitoare. De inferioritate sună foarte puțin dulce.',
        'Nu se graduează cele care sunt deja pe treapta de comparație: optim, minim, maxim, suprem, ultim, inferior, superior. Nici cele care au deja maximul în sens: complet, uriaș, unic. Nici cele care nu intră în comparație: acvatic, viu, moldovean.',
        'La plural, formele bune sunt prietene dragi și dragile prietene. Dragele prietene nu se folosește. Formele cu ș sunt ficși, ortodocși și perplecși. Nu scrie fixi, ortodoxi, perplexi. La naționalități și la confuzie, z-ul rămâne: chinezi, englezi, confuzi.',
        'La plural mai apar fete dragi și cetățeni chinezi, apoi sfinți ortodocși, bătrâni cumsecade, dinți ficși și fluturi zglobii.',
      ].join('\n\n'),
      example: [
        'Frumos este propriu-zis și are patru forme. Citită vine din participiu. În grupul fata cea harnică, cea este articol demonstrativ, de feminin, singular.',
        'Miresme plăcute nu compară: pozitiv. Cele mai frumoase urcă la superlativul relativ de superioritate. Foarte strălucitoare este absolut. Pentru dar, forma bună este cel mai neprețuit.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Băiatului celui neastâmpărat cere celui, fiindcă substantivul este în dativ. Elevei celei silitoare cere celei. Ce-l mai taie grupul și nu se acceptă.'
        }
      ],
      practice: [
        '1) Câte forme de flexiune au înalt, drag, mare și gri?',
        '2) Pune articolul demonstrativ potrivit în fata ... harnică și în florile ... roșii.',
        '3) Treci adjectivul dulce prin trei grade: comparativ de superioritate, superlativ relativ de superioritate, superlativ absolut.',
        '4) La fiecare pereche, păstrează varianta corectă: între cel mai și ce-l mai, între dragile prietene și dragele prietene, între ficși și fixi, între chinezi și chineji. Apoi pluralul pentru o fată dragă și pentru un dinte fix.'
      ].join('\n\n'),
      answers: [
        'înalt are patru, drag are trei, mare are două, gri este invariabil',
        'cea, cele',
        'mai dulce, cel mai dulce, foarte dulce',
        'cel mai, dragile prietene, ficși, chinezi; fete dragi, dinți ficși'
      ],
      mistakes: 'Ce-l mai taie grupul. Cel mai rămâne întreg. Dragele nu ține loc de dragi. La dativ, cel se schimbă în celui sau celei.',
      tryThis: 'Pune stele strălucitoare și strălucitoarele stele în câte o propoziție. Spune de ce la băiatului stă celui, nu cel.',
      keyPoints: [
        'Adjectivul arată o însușire, se acordă cu substantivul și poate fi variabil sau invariabil.',
        'Pozitivul, comparativul și superlativul măsoară intensitatea. Unele adjective nu primesc grade.',
        'Cel mai stă într-un cuvânt. Articolul demonstrativ își schimbă forma odată cu numele.'
      ]
    }),
    lesson({
      id: 'adjectiv-functii',
      title: 'Lângă nume sau după este',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Adjunct sau centru',
          text: 'Adjunctul este atribut sau nume predicativ. Centrul poate căpăta un complement ori un circumstanțial. Numele predicativ se leagă prin a fi.'
        }
      ],
      theory: [
        'Adjectivul, în propoziție, joacă rol de adjunct ori de centru. Adjunctul stă pe lângă alt cuvânt și îl lămurește. Centrul este el însuși punctul de care se leagă alte cuvinte.',
        'Rolul de adjunct are două fețe. Una este atributul adjectival: stă la substantiv și se întreabă cu ce fel de. Exemplu: flori înmiresmate, unde înmiresmate este atribut.',
        'Numele predicativ arată caracteristica subiectului. Se leagă prin verbul copulativ a fi. Propoziția Copacii sunt înfloriți îl are pe înfloriți ca nume predicativ.',
        'Acordul numelui predicativ cu subiectul privește genul, numărul și cazul. Copacii este masculin plural, deci înfloriți stă la fel. Nu îl lași la singular dacă subiectul este plural.',
        'Când este centru, lângă el poate sta un substantiv precedat de prepoziție. Adaosul poate fi complement. Modele: capabilă de performanță, dornic de reușită.',
        'Același tip de adaos poate fi circumstanțial, ca în clar ca o oglindă. Aici clar este centru, iar ca o oglindă arată felul, deci circumstanțial.',
        'Plin poate fi și adjunct, și centru. În câmpia este plină, plină este nume predicativ, deci adjunct. În plină de flori, plină este centru, iar de flori este complementul lui.',
        'În enunțul cu bănuți galbeni, plină spune cum este câmpia, deci nume predicativ, iar galbeni stă pe lângă bănuți, deci atribut. Două funcții, pe cuvinte diferite.',
        'În Vântul blând, blând este atribut, fiindcă stă lângă substantiv și răspunde la ce fel de. Nu este nume predicativ: lipsește verbul a fi.',
        'La Sora este atentă la detalii, atentă ține și de nume predicativ, și de centru. Grupul la detalii este complementul ei, nu un adaos pus la întâmplare după verb.'
      ].join('\n\n'),
      example: [
        'Înfloriți, după sunt, dă caracteristica subiectului copacii și se potrivește la masculin plural.',
        'Înmiresmate, lângă flori, este atribut. Grupul ca o oglindă, lângă clar, este circumstanțial. Grupul de reușită, lângă dornic, este complement.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Bănuții galbeni s-au deschis: galbeni este atribut. Bănuții sunt galbeni: galbeni este nume predicativ. Același adjectiv își schimbă funcția când apare a fi.'
        }
      ],
      practice: [
        '1) Construiește două enunțuri cu galben: în primul este atribut, în al doilea este nume predicativ.',
        '2) Fă un enunț în care plin este, deodată, nume predicativ și centru, urmat de un complement.',
        '3) La Vântul blând mângâie obrajii, ce funcție are blând?',
        '4) Spune cu cine se acordă numele predicativ și dă genul și numărul lui înfloriți din Copacii sunt înfloriți.'
      ].join('\n\n'),
      answers: [
        'Bănuții galbeni s-au deschis. Bănuții sunt galbeni.',
        'Câmpia este plină de flori.',
        'atribut adjectival',
        'cu subiectul; masculin plural'
      ],
      mistakes: 'Dacă adjectivul stă lângă substantiv fără verbul a fi, este atribut, nu nume predicativ. La detalii, lângă atentă, este complementul adjectivului. Nu îl muta la verb doar fiindcă stă la final.',
      tryThis: 'Construiește o propoziție cu dornic de reușită și spune care cuvânt este centru și care grup este complement. Mai spune de ce înfloriți se acordă cu copacii.',
      keyPoints: [
        'Atributul stă lângă substantiv. Numele predicativ stă după a fi și spune cum este subiectul.',
        'Adjectivul centru poate primi un complement, ca de reușită, sau un circumstanțial, ca o oglindă.',
        'Plin schimbă rolul: adjunct în câmpia este plină, centru în plină de flori.'
      ]
    }),
    lesson({
      id: 'martisorul',
      title: 'Șnurul alb și roșu',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Mărțișor',
          text: 'Obicei de primăvară, pe 1 martie. Șnurul împletește două fire, alb și roșu. Numele lunii martie, în grai, vine din latină.'
        }
      ],
      theory: [
        'Mărțișorul e un obicei românesc de primăvară, legat de credințe despre câmp și rod. Nu este doar un obiect de pus la vedere. Marchează începutul unui ciclu de lucru în livadă.',
        'Cuvântul e numele popular al lui martie și are origine latină. În Antichitatea romană, anul începea la 1 martie, iar luna purta numele zeului Marte. Sărbătoarea stă în prima zi a lunii.',
        'Șnurul răsucește două fire: unul alb, altul roșu. Roșul trimite la foc, la sânge și la soare. Albul trimite la apa curată. Cele două culori stau împreună, nu separat.',
        'Pe alocuri, șnurul stă pe mână, ca brățară, luna întreagă. I se mai spune mărțiguș. În anumite zone, de Sfinții 40 de mucenici, în ziua de 9 martie, șnurul pleacă de pe încheietură.',
        'Unii îl țin până sosesc primele berze ori până copacii înfloresc. Semnul nu este o dată fixă pentru toți. Este un semn din natură: pasărea sau floarea.',
        'În săpături din țară au ieșit pietre de râu, vopsite alb și roșu. Au peste opt mii de ani. Culorile de pe șnur au, așadar, o vechime mult mai mare decât obiceiul de azi.',
        'În Bulgaria, obiectul se numește martenitsa. Îl poartă oamenii și, câteodată, animalele, crezând că sănătatea ține tot anul. Aceeași pereche de culori, alt nume.',
        'Sărbătoarea mai apare la aromâni și la meglenoromâni, precum și în Macedonia și în Albania. Nu este închisă într-o singură țară. Firul alb-roșu circulă în mai multe comunități.',
        'Scena de lucru: în curtea școlii, pe 1 martie, Irina a căpătat un șnur alb cu roșu. L-a legat de mână și l-a ținut până la venirea berzelor.',
        'Din scenă reții trei lucruri: ce stă scris, ce observi, apoi o faptă a ta, legată prin pentru că. Ce observi, la o persoană, începe cu O văd. Culorile se spun pe fir, nu dintr-o poveste goală.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: pe 1 martie, în curtea școlii, Irina și-a prins de încheietură șnurul alb cu roșu și l-a ținut până au venit berzele.',
        'Ce observi: O văd în curte, cu firele pe mână. Eu aș fi purtat și eu firul, pentru că data era 1 martie. Firele erau albe și roșii. Soarele stă în roșu, apa stă în alb.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă Irina ar scoate șnurul la 9 martie, ar urma obiceiul din unele zone, de Sfinții 40 de mucenici. În Bulgaria, același obiect se numește martenitsa.'
        }
      ],
      tryThis: 'Pentru Irina, trei enunțuri: conținutul, observația (pornește cu O văd) și o faptă a ta, cu pentru că. Spune sensul roșului și al albului, până când a ținut șnurul și numele bulgăresc al obiceiului. Adaugă că, în unele zone, șnurul se scoate la 9 martie.',
      keyPoints: [
        'La 1 martie se poartă firul alb lângă firul roșu. Soarele stă în roșu, apa stă în alb.',
        'În unele zone se scoate la 9 martie. Alții îl țin până la berze sau până la flori.',
        'În Bulgaria se numește martenitsa. Pietre vopsite alb și roșu au peste opt mii de ani.'
      ]
    }),
    lesson({
      id: 'proiect-tinuturi',
      title: 'Ținuturi de poveste',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Grupul',
          text: 'Lucrați în patru sau cinci la Ținuturi de poveste din țara mea. Liderul coordonează, secretarul notează ideile și sursele, raportorul prezintă.'
        }
      ],
      theory: [
        'Proiectul numit Ținuturi de poveste din țara mea se lucrează în grup. Intrați patru sau cinci. Fiecare are un rol văzut, nu doar un nume pe copertă.',
        'Liderul ține grupul împreună și împarte sarcinile. Secretarul scrie ideile și sursele. Raportorul prezintă rezultatul în fața clasei. Al patrulea poate căuta imagini sau verifica faptele.',
        'Spuneți locul văzut, momentul, ce v-a atras, materialele de care aveți nevoie și de unde luați informația. Fără răspuns la sursă, descrierea rămâne o părere.',
        'Ordinea este informare, plan, alegerea formei, lucru, apoi propria privire asupra rezultatului. Nu săriți la afiș înainte să știți faptele. Privirea finală spune ce a ieșit și ce ați schimba.',
        'Puteți alege colaj, portofoliu, afiș ori o prezentare. Forma se potrivește cu ce aveți: imagini, text scurt sau vorbire. Nu reluați un ghid. Textul descriptiv îl compuneți voi, la persoana I.',
        'Dacă nu aveți încă o călătorie, porniți de la faptele de mai jos. Pietrele Doamnei, rezervație, stau în Suceava, lângă Câmpulung Moldovenesc.',
        'Legenda vorbește despre doamna Elena, soția lui Petru Rareș. Anul 1541 cade în timpul celei de-a doua domnii a lui. Familia s-ar fi adăpostit în Munții Rarău, ferindu-se de o năvală a tătarilor.',
        'Stânci uriașe ar fi acoperit locul unde era averea. De atunci, stâncile se numesc ale Doamnei. Anul și numele sunt fapte de legendă, de spus ca legendă, nu ca reportaj sigur.',
        'Valea Izei este în Maramureș. Iza pornește de pe versantul nord-vestic al Munților Rodnei, cam la 1200 de metri. Bazinul depășește 1300 de kilometri pătrați.',
        'Apa merge către Tisa, dinspre sud-est către nord-vest, și străbate defileul Surduc. De-a lungul văii vezi porți sculptate, biserici din lemn și Mănăstirea Bârsana.'
      ].join('\n\n'),
      example: [
        'Grupul alege Valea Izei. Ana conduce, Vlad notează, Radu prezintă, Lia aduce o imagine de la Mănăstirea Bârsana. Aleg afișul.',
        'În text apare epitetul apă limpede și șirul porți, biserici, mănăstire. Faptele vin din lecție, nu dintr-un ghid reluat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pentru Pietrele Doamnei, județul este Suceava, anul de legendă este 1541, iar obiectul văzut ar fi o stâncă. Epitetul poate fi stâncă uriașă. Enumerația poate fi stânci, pădure și potecă.'
        }
      ],
      tryThis: 'Alegi între Pietrele Doamnei și Valea Izei. Scrii opt până la zece rânduri, la persoana I, cu un epitet și cu o enumerație. Menționezi județul sau regiunea, un an ori o cifră aflată în lecție, plus un lucru pe care l-ai zări acolo. Apoi planul pentru patru: cine conduce, cine notează, cine prezintă, ce formă are lucrarea și care este sursa. Nu relua un text de pe un site.',
      keyPoints: [
        'Grupul are lider, secretar și raportor. Puteți alege colaj, portofoliu, afiș ori prezentare.',
        'Pietrele Doamnei sunt în Suceava, lângă Câmpulung Moldovenesc, și legenda le leagă de doamna Elena, în 1541.',
        'Valea Izei este în Maramureș. Izvorul stă în Munții Rodnei, iar pe vale este Mănăstirea Bârsana.'
      ]
    }),
    lesson({
      id: 'recap-tablouri',
      title: 'Încheierea despre tablouri',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'atentie',
          title: 'Trei semne',
          text: 'Pe aceeași scenă cauți tabloul, epitetul, enumerația și gradul adjectivului. Apoi spui o faptă a ta, legată prin pentru că.'
        }
      ],
      theory: [
        'Închei unitatea pe o scenă scrisă aici, nu pe un text copiat din altă parte. Miercuri, dimineața, iarba din grădina bunicii era moale și verde. Pe masă erau un mărțișor alb cu roșu, ghiocei și viorele.',
        'Bunica a zis că aceste flori sunt cele mai timpurii. M-a cuprins liniștea. Scena unește un loc, o emoție și câteva obiecte de primăvară. Este tablou, fiindcă grădina este centrul.',
        'Verde, lângă iarbă, este epitet cromatic: numește culoarea. Moale, pus după iarbă, este epitet postpus. Ambele stau lângă același substantiv și se citesc separat.',
        'Șirul de pe masă este enumerație: ghiocei, viorele și mărțișor. Între termeni stă virgula, iar și leagă ultimul. Nu sunt trei propoziții. Sunt trei obiecte de același fel, văzute împreună.',
        'Grupul cele mai timpurii ține de superlativul relativ de superioritate. Bunica nu spune doar că florile sunt timpurii. Spune că, dintre cele știute, acestea stau pe treapta de sus.',
        'Din scenă reții trei lucruri: ce stă scris, ce observi, apoi o faptă a ta, legată prin pentru că. Ce observi începe cu Văd. Emoția, liniștea, se spune după fapte, nu în locul lor.',
        'Ca să scrii opt rânduri despre aceeași grădină, rămâi la persoana I. Pui un titlu. Alegi un prim-plan, masa, și un fundal, iarba. Adaugi două emoții, nu una repetată de două ori.',
        'Mărțișorul din scenă are fir alb lângă fir roșu. Soarele stă în roșu, apa stă în alb, cum ai văzut la obicei. Nu dezvolți toată istoria. Ajunge șnurul lângă flori.',
        'Dacă ai confunda tabloul cu portretul, ai descrie bunica, nu grădina. Aici persoana doar vorbește. Locul rămâne subiectul descrierii.',
        'Recapitularea nu cere definiții înșirate. Cere să numești, pe text, epitetul, enumerația și gradul. Apoi scrii tu, cu plan scurt înainte de rândurile finale.'
      ].join('\n\n'),
      example: [
        'Ce stă scris: miercuri dimineața, iarba din grădina bunicii era moale și verde, iar pe masă se vedeau un mărțișor, ghiocei și viorele.',
        'Ce observi: Văd iarba, masa și șnurul alb-roșu lângă flori. Eu aș fi legat șnurul la mână, pentru că era alb cu roșu, iar florile păreau cele mai timpurii. Emoția mea este liniștea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Titlu posibil: Masa din grădină. Prim-plan: șnurul. Fundal: iarba moale. Două emoții: liniște și bucurie. Gradul din vorbele bunicii rămâne superlativ relativ de superioritate.'
        }
      ],
      tryThis: 'Pentru grădina bunicii, trei enunțuri: conținutul, observația (pornește cu Văd) și o faptă a ta, cu pentru că. Numește un epitet, șirul de pe masă și gradul din vorbele bunicii. Apoi opt rânduri despre aceeași grădină, la persoana I, cu titlu și cu două emoții.',
      keyPoints: [
        'Scena unește un tablou, epitetul cromatic verde, epitetul postpus moale și o enumerație.',
        'Grupul cele mai timpurii urcă la superlativul relativ de superioritate, în vorbele bunicii despre flori.',
        'Descrierea ta stă la persoana I, cu titlu și cu două emoții, după ce spui ce vezi.'
      ]
    })
  ]
};
