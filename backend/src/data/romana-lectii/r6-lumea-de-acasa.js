'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f){return romanaLesson(f);}

module.exports = {
  id: 'lumea-de-acasa',
  title: 'Lumea de acasă',
  inOwnWords: 'Casa se leagă de textul narativ: fapta, timpul, locul, autorul, naratorul și personajele. Urmează dialogul, scrisoarea, sensul cuvintelor, silaba și legenda. Proiectul despre casele scriitorilor închide unitatea. Scenele de lucru stau în lecții. Despre Amintiri din copilărie, de Ion Creangă, păstrăm faptele, fără citat.',
  toc: [
    'Ce vei lucra despre casă',
    'Textul narativ literar. Acțiune, timp, spațiu',
    'Narațiunea la persoana I. Autor, narator, personaje',
    'Contextul de comunicare',
    'Tiparul textual narativ',
    'Scrisoarea',
    'Cuvântul: formă și sens',
    'Omonime și cuvinte polisemantice',
    'Diftong, triftong, hiat',
    'Despărțirea în silabe',
    'Valori etice în legende',
    'Proiect: Acasă la scriitorii români',
    'Recapitularea unității'
  ],
  glossary: [
    {
      term: 'narator',
      meaning: 'Vocea care povestește. La persoana I este și personaj.'
    },
    {
      term: 'omonim',
      meaning: 'Aceeași formă, sensuri care nu se leagă între ele, ca leul animal și leul ban.'
    },
    {
      term: 'legendă',
      meaning: 'Povestire scurtă care explică un lucru și amestecă o faptă reală cu una minunată.'
    },
    {
      term: 'casă memorială',
      meaning: 'Casa în care a trăit un scriitor și care s-a păstrat ca muzeu.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-acasa',
      title: 'Ce vei lucra despre casă',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Harta unității',
          text: 'Tema este lumea de acasă. Harta arată drumul, nu predă totul dintr-o dată. Silaba, scrisoarea și legenda își așteaptă ora. Unsprezece coduri rămân ținta.'
        }
      ],
      theory: [
        'Deschiderea nu este lecția terminată. Este harta. Azi reții ce urmează și în ce ordine, ca să nu amesteci povestirea cu scrisoarea sau cu silaba.',
        'La citire începi cu textul narativ în proză. Urmărești faptele legate, locul și clipa. Apoi desparți omul care a scris de vocea care povestește și de cei care apar în întâmplare.',
        'Tiparul narativ vine după voce. Înveți să îl recunoști între alte feluri de a scrie. Legenda închide lectura: explică un lucru și poartă o valoare.',
        'La comunicare notezi unde stau cei care vorbesc, când vorbesc și ce legătură au. Locul, clipa și relația schimbă mesajul, chiar dacă vorbele par aceleași.',
        'La redactare compui o povestire la persoana I și o scrisoare cu părțile așezate la locul lor. Una spune o faptă. Cealaltă se adresează cuiva anume.',
        'La construcția limbii revii asupra înțelesului. Apropi sinonimele, opui antonimele și desparți omonimele. Apoi lucrezi diftongul, triftongul, hiatul și tăierea în silabe.',
        'La interculturalitate cauți într-o legendă binele, adevărul, curajul sau bunătatea. Valoarea se vede în faptă, nu într-o etichetă pusă la început.',
        'Codurile de antrenat sunt unsprezece. În primul grup stau 1.3 și 1.4. În al doilea, 2.3 și 2.4. În al treilea, 3.1, apoi 3.3 și 3.4.',
        'Al patrulea grup adună 4.2, 4.3 și 4.4. La capăt stă 5.2. Dacă sari un cod, harta rămâne tăiată. Le numeri pe toate înainte să spui că le știi.',
        'Proiectul tematic vine după legendă și închide unitatea. Alegi casa unui scriitor, cauți în surse sigure și arăți rezultatul cu text și cu imagine.',
        'Dialogul, scrisoarea, sensul cuvintelor și silaba stau pe aceeași hartă. Nu le lucrezi în aceeași oră. Harta doar le anunță, ca să știi ce vine.'
      ].join('\n\n'),
      example: [
        'Harta de azi pune în față povestirea și scrisoarea. Silaba este anunțată, însă o tai abia la lecția ei. Unsprezece coduri rămân scopul întregii unități.',
        'Numără 1.3 cu 1.4, perechea 2.3 și 2.4, apoi 3.1 cu 3.3 și 3.4, apoi 4.2 cu 4.3 și 4.4, și adaugă 5.2. Ajungi la unsprezece.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă lucrezi azi doar silaba, ai sărit harta. Silaba are ora ei, după sens și după omonime. Proiectul nu se face înainte de legendă.'
        }
      ],
      tryThis: [
        'Scrie trei propoziții. În prima numești tema, lumea de acasă, și lucrul de azi: textul narativ.',
        'În a doua grupează codurile: 1.3 cu 1.4, 2.3 cu 2.4, 3.1 cu 3.3 și 3.4, 4.2 cu 4.3 și 4.4, apoi 5.2. Spune că sunt unsprezece.',
        'În a treia arată că proiectul vine după legendă și că silaba își așteaptă lecția, nu se rezolvă odată cu harta.'
      ].join('\n\n'),
      keyPoints: [
        'Harta anunță narativul, dialogul, scrisoarea, sensul, silaba și legenda, fiecare la rândul lui.',
        'Unsprezece coduri, de la grupul 1.3 și 1.4 până la 5.2, spun ce antrenezi.',
        'Proiectul despre casa unui scriitor închide drumul, după legendă.'
      ]
    }),

    lesson({
      id: 'narativ-acasa',
      title: 'Acțiunea, timpul și spațiul',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei întrebări',
          text: 'Narativul înșiră fapte. Locul răspunde la unde. Clipa răspunde la când. Dacă nimic nu se schimbă, ai o descriere, nu o povestire.'
        }
      ],
      theory: [
        'Textul narativ leagă întâmplări în ordine. Poate sta în proză sau în versuri. Proza umple rândul. Versul îl taie. În ambele, fapta înaintează de la o mișcare la alta.',
        'Acțiunea este mulțimea faptelor legate, nu o singură propoziție. Este tot ce se petrece de la prima mișcare până la ultima. Dacă scoți o verigă, firul se rupe.',
        'Indiciile de loc arată unde se petrece fapta: o odaie, o prispă, o curte. Le cauți în nume de cameră, în obiecte și în drumul personajului.',
        'Indiciile de timp arată când. Pot fi mari, ca un anotimp, sau mici, ca o dimineață pusă înăuntrul unei duminici. Clipa mică nu anulează clipa mare. O precizează.',
        'Personajele nu au același rol. Unul ține firul. Altul ajută. Un al treilea doar trece. Fără o ființă care face ceva, întâmplarea nu pornește.',
        'Dacă tabloul stă pe loc și nimeni nu schimbă nimic, textul descrie. Descrierea arată cum este un lucru. Narativul arată ce se întâmplă cu el.',
        'Ion Creangă a scris Amintiri din copilărie. Copilăria lui stă în casa părinților, la Humulești. Poznele de care pomenește mama țin de anotimpul cald.',
        'Acele pozne nu țin de iarnă și nu țin de slujba din biserică. Aici nu se lipește un rând din carte. Păstrăm locul, anotimpul și faptul că mama le pomenește.',
        'Scenă de lucru, scrisă pentru lecție. Într-o duminică, pe la amiază, în odaia cu cuptor, Mara răstoarnă cana. Laptele curge pe masă. Mama trece cârpa înainte de masă. Mara pune cana pe raft.',
        'Din scena aceasta faci trei pași, în trei propoziții. Întâi spui fapta. Apoi spui ce vezi, cu verbul văd. La urmă spui ce ai face tu și legi motivul prin pentru că.',
        'Primul pas ține de acțiune. Al doilea ține de loc și de obiecte. Al treilea te pune în scenă, dar nu schimbă ce s-a întâmplat. Motivul arată de ce ai alege acea faptă.'
      ].join('\n\n'),
      example: [
        'Fapta: duminică, înainte de amiază, în odaia cu cuptor, Mara răstoarnă cana, iar mama șterge blatul. Imaginea: văd odaia, laptele pe lemn și cana răsturnată, cu Mara lângă mama ei.',
        'Eu aș fi adus cârpa, pentru că blatul trebuia să fie curat până la amiază. Humulești este satul casei părintești. Poznele pomenite de mamă țin de vară. Cana este a lecției.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Masa era lungă și udă este descriere: nimic nu se schimbă. Mara pune cana pe raft este narativ: apare o faptă nouă, după șters. Le desparți după verb, nu după lungime.'
        }
      ],
      tryThis: [
        'Sâmbătă, după cină, pe prispă, un băiat lasă caietul pe bancă și se întoarce după el. Trei propoziții: întâi fapta, apoi imaginea, la urmă alegerea ta, legată prin pentru că.',
        'Imaginea pornește cu Văd. Mai arată că volumul Amintiri din copilărie așază casa copilului la Humulești. Poznele de care pomenește mama țin de vară.'
      ].join('\n\n'),
      keyPoints: [
        'Narativul leagă fapte în ordine. Descrierea lasă lucrurile pe loc.',
        'Locul răspunde la unde. Timpul răspunde la când, chiar când clipa mică stă înăuntrul alteia.',
        'La Humulești stă casa din amintirile lui Creangă. Din scena lecției spui fapta, ce vezi și ce ai face, cu pentru că.'
      ]
    }),

    lesson({
      id: 'autor-narator',
      title: 'Autor, narator, personaje',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei roluri',
          text: 'Autorul este omul din viață. Naratorul este vocea din text. Personajul trăiește în întâmplare. La persoana I, vocea și personajul se suprapun.'
        }
      ],
      theory: [
        'Autorul scrie cartea și rămâne în afara ei. Poți afla când a trăit și unde. Nu îl confunzi cu cel care spune eu în text. Viața lui nu este, automat, firul povestirii.',
        'Naratorul este vocea căreia autorul îi încredințează povestirea. Dacă spune eu, el este și personaj. Vede doar ce poate vedea el. De aceea nararea la persoana I este subiectivă.',
        'La persoana a III-a, vocea stă deoparte, ca un martor care nu intră în faptă. Nu spune eu. Poate cuprinde mai multe personaje. Această narare se numește obiectivă.',
        'În lumea textului trăiesc personajele. Ele pot fi oameni. Pot fi și animale, lucruri sau fenomene, dacă fac ceva în întâmplare. Un nor care doar stă nu intră în rol.',
        'Cel principal străbate momentele importante și ține firul. Cel secundar contează, dar nu duce singur povestea. Fără el, unele scene ar fi mai sărace, însă firul ar putea continua.',
        'Cel episodic intră într-o secvență sau în două, apoi iese. Figurantul este doar numit, fără o faptă a lui. Dacă îi dai o acțiune, nu mai este figurant.',
        'Personajul individual este o singură ființă. Cel colectiv este un grup care lucrează ca un întreg. Clasa care tace deodată este colectivă. Un elev cu o faptă a lui rămâne individual.',
        'Ion Creangă este autorul volumului Amintiri din copilărie. Nică spune eu, deci povestește dinăuntru. Este narator subiectiv și, totodată, personajul care ține firul.',
        'Nu lipim un citat din carte. Faptul de ținut: autorul este Creangă, vocea este a lui Nică, persoana este întâia, iar privirea este a unui copil din întâmplare.',
        'În scena cu cana, Mara spune că ea a răsturnat laptele. Ea face fapta. Mama, care șterge, ajută firul, fără să îl țină singură: rol secundar. Vecina, doar pomenită la poartă, este figurant.',
        'Ca să nu încurci rolurile, întrebi trei lucruri. Cine a scris cartea? Cine spune eu sau el? Cine face fapta, cine ajută și cine este doar numit?'
      ].join('\n\n'),
      example: [
        'Creangă stă în afara cărții: este autorul. Nică folosește eu, deci vocea lui este la persoana I și el este personajul principal.',
        'Mara face fapta cu cana. Mama, cu cârpa, este secundară. Vecina de la poartă, fără o acțiune a ei, rămâne figurant. Clasa, dacă ar intra ca grup, ar fi personaj colectiv.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă textul spune el a șters masa, vocea este la persoana a III-a și stă în afara faptei: narator obiectiv. Autorul tot nu intră în odaie. El a scris, nu a șters.'
        }
      ],
      tryThis: [
        'Scrie patru propoziții. Pune în ele rolul de autor și pe cel de narator, persoana I, apoi rolul principal, pe cel secundar și pe figurant.',
        'Arată rolul lui Ion Creangă pentru volumul Amintiri din copilărie. Explică de ce vocea lui Nică este subiectivă. La cană, arată cine face fapta și cine este doar numit.'
      ].join('\n\n'),
      keyPoints: [
        'Autorul trăiește în afara textului. Naratorul povestește. La persoana I, vocea este și personaj, deci subiectivă.',
        'Principalul ține firul. Secundarul ajută. Episodicul intră puțin. Figurantul este doar numit.',
        'Nică, în amintirile lui Creangă, este voce la persoana I și personaj principal. Creangă rămâne autorul.'
      ]
    }),

    lesson({
      id: 'context-comunicare',
      title: 'Locul, momentul, relația',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Contextul',
          text: 'Mesajul iese într-un loc, într-o clipă, între oameni care au o legătură. Fără aceste trei, vorbele rămân fără sprijin.'
        }
      ],
      theory: [
        'Comunicarea schimbă informații, idei și impresii. Are nevoie de cel puțin doi oameni și de un context. Fără context, aceeași vorbă poate fi salut, poruncă sau glumă.',
        'Contextul cuprinde locul, clipa, pe cei care vorbesc, ce știu în comun și felul în care se raportează unul la altul. Relația de acasă nu este relația de la oră.',
        'Ca schimbul să meargă, fiecare trece pe rând din rolul de emițător în cel de receptor. Cine tace tot timpul nu închide schimbul. Cine vorbește fără să asculte îl rupe.',
        'Vorba alcătuiește comunicarea verbală. Fața, privirea, ținuta și distanța dintre corpuri alcătuiesc comunicarea nonverbală. Le citești odată cu vorba, nu după ce ai uitat-o.',
        'Pe chip se citesc șase emoții de bază: bucuria, tristețea, surpriza, frica, dezgustul și furia. O încruntare nu este automat furie. O legi de situație.',
        'Paraverbalul stă în viteză, în ton, în volum și în pauză. Aceeași propoziție, spusă încet sau tare, nu poartă același mesaj. Pauza poate cântări cât o frază.',
        'O întrebare întreagă acoperă cine, cum, ce, când și unde. Dacă lipsește unul, celălalt ghicește. Ghicirea nu ține loc de mesaj limpede.',
        'Barierele opresc mesajul. Zgomotul acoperă vocea. Neascultarea lasă vorbele în aer. Distanța prea mare face semnul greu de văzut și vorba greu de auzit.',
        'Scenă de lucru. În salon, un copil lovește o tobă lângă un musafir. Musafirul nu prinde salutul. Mama îi cere copilului să iasă cu toba.',
        'Locul este salonul. Bariera este zgomotul. Relația îi leagă pe mamă, pe copil și pe musafir. Toba nu este personaj principal. Este obstacolul.',
        'Trei pași, ca la textul narativ. Spui fapta. Spui ce vezi, cu văd. Spui ce ai face tu și legi prin pentru că. La urmă numești locul, clipa, relația și bariera.'
      ].join('\n\n'),
      example: [
        'Fapta: toba din salon acoperă salutul, iar mama îl trimite pe copil afară. Imaginea: văd încăperea, instrumentul, copilul și oaspetele cu palma la ureche.',
        'Aș fi pus toba jos, pentru că oaspetele pierde salutul. Locul este salonul. Relația este de gazdă și de musafir. Bariera este zgomotul, nu lipsa de cuvinte.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă mama spune același îndemn în șoaptă, paraverbalul se schimbă: volumul e mic, tonul poate fi ferm. Vorbele rămân. Mesajul nu mai este țipat, dar tot cere ieșirea.'
        }
      ],
      tryThis: [
        'La ora opt, pe holul școlii, două colege discută tema, însă soneria le acoperă. Una are zâmbetul pe față. Cealaltă își încruntă sprâncenele.',
        'Trei propoziții: fapta, imaginea, alegerea ta legată prin pentru că. Imaginea pornește cu Văd. Numește locul, clipa, relația și bariera. Spune ce emoție citești pe chipul încruntat.'
      ].join('\n\n'),
      keyPoints: [
        'Contextul adună locul, clipa, pe cei care vorbesc și relația dintre ei.',
        'Vorba este verbală. Chipul și distanța sunt nonverbale. Tonul, volumul și pauza sunt paraverbale.',
        'Zgomotul, neascultarea și distanța prea mare pot opri mesajul înainte să ajungă.'
      ]
    }),

    lesson({
      id: 'tipar-narativ',
      title: 'Cinci tipare, unul narativ',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'După scop',
          text: 'Narativul povestește. Descrierea arată. Dialogul dă replici. Explicația învață, în pași. Argumentul susține o părere cu un motiv.'
        }
      ],
      theory: [
        'Tiparul textual este felul în care așezi ideile, după ce vrei să obții. Nu îl alegi după lungime. Îl alegi după scop. Aici lucrezi cinci feluri.',
        'Lista are cinci nume. Le cheamă narativ și descriptiv, apoi dialogat, apoi explicativ și argumentativ. La item spui numele și arăți semnul din text.',
        'Tiparul narativ spune întâmplări. Are un narator, subiectiv sau obiectiv. Are semne de loc, semne de timp, personaje și verbe de mișcare. Verbul arată că ceva se schimbă.',
        'Tiparul descriptiv arată cum arată un loc, un lucru sau o ființă. Stă pe loc. Nu cere o întâmplare nouă. Poate intra într-o povestire, dar singur nu înaintează acțiunea.',
        'Tiparul dialogat înșiră replici. Întrebarea și răspunsul stau față în față. Auzi două voci, nu una care povestește despre ele. Două puncte și linia de dialog sunt semne, când textul le are.',
        'Tiparul explicativ te învață ceva, în pași. Spune cum se face un lucru, în ordine. Nu cere să fii de acord. Cere să înțelegi și să poți repeta pașii.',
        'Tiparul argumentativ susține o părere și îi dă un motiv. Pentru că leagă părerea de motiv. Fără motiv, rămâne o simplă afirmație, nu un argument.',
        'Ion Popescu-Gopo a realizat filmul Maria Mirabela. În el, actorii stau lângă desene animate. Oache trimite la apă. Scăpărici trimite la foc. Omide trimite la aer.',
        'Legătura dintre nume și element este o informație despre film. Nu este povestea filmului și nu este un tipar narativ. O ții minte ca fapt, separat de scena pe care o scrii tu.',
        'Într-o compunere poți trece de la un tipar la altul. O povestire poate conține două replici și o descriere scurtă. La item, numești tiparul dominant și semnul lui.',
        'Ca să exersezi, scrii câte o propoziție pentru fiecare nume. În cea narativă pui un indice de timp. În cea argumentativă pui pentru că. În cea explicativă pui doi pași.'
      ].join('\n\n'),
      example: [
        'Mara răstoarnă cana, apoi mama șterge blatul: tipar narativ, cu faptă și personaje. Blatul era ud și alb: tipar descriptiv. Unde pui cana? Pe raft: tipar dialogat.',
        'Ca să cureți laptele, iei cârpa și treci blatul: tipar explicativ. Blatul se șterge repede, pentru că laptele pătează lemnul: tipar argumentativ.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Oache ține de apă, Scăpărici de foc, Omide de aer, în filmul lui Popescu-Gopo. Dacă povestești cum a fost făcut filmul, ai informație. Dacă spui că Mara a șters masa, ai narativ.'
        }
      ],
      tryThis: [
        'Pentru fiecare dintre cele cinci tipare, compune câte o propoziție. La cea care povestește, adaugă un reper de timp.',
        'Mai arată, despre filmul Maria Mirabela, că Oache ține de apă, Scăpărici de foc, iar Omide de aer. Spune că aceasta este o informație despre film, nu povestea lui.'
      ].join('\n\n'),
      keyPoints: [
        'Cele cinci feluri de a scrie se despart după scop: a povesti, a arăta, a da replici, a învăța, a convinge.',
        'Narativul are narator, timp, loc, personaje și verbe care mișcă fapta.',
        'În filmul lui Popescu-Gopo, Oache ține de apă, Scăpărici de foc, iar Omide de aer. Este un fapt despre film.'
      ]
    }),

    lesson({
      id: 'scrisoare',
      title: 'Părțile scrisorii',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Unde stă fiecare parte',
          text: 'Sus, în dreapta, stau locul și data. Adresarea stă la mijloc și se termină cu virgulă. Încheierea și semnătura stau jos, în dreapta. P.S. adaugă ce ai uitat.'
        }
      ],
      theory: [
        'Scrisoarea este o vorbire pusă pe hârtie și trimisă cuiva. Nu este o compunere despre un om. I se adresează lui. De aceea are formule pe care povestirea nu le cere.',
        'În colțul din dreapta, sus, scrii localitatea și data. Nu le pui la stânga. Nu le amesteci cu adresarea. Cititorul vede întâi de unde și când pleacă mesajul.',
        'Formula de adresare stă la mijloc, deasupra cuprinsului, și se încheie cu virgulă. Poți scrie Dragă mamă, Dragul meu prieten, sau Stimată doamnă. Virgula face parte din formulă.',
        'Cuprinsul are trei mișcări: o introducere scurtă, faptele și o încheiere. Introducerea spune de ce scrii. Faptele vin în ordine. Încheierea din cuprins nu se confundă cu formula de la final.',
        'Formula de încheiere stă în dreapta, după cuprins. Poți folosi Cu drag, sau Cu respect. Semnătura vine imediat sub ea, tot în dreapta. Nu semnezi la stânga și nu uiți numele.',
        'Post-scriptumul, notat P.S., adaugă o informație uitată. Stă după semnătură. Nu ține loc de cuprins. Dacă tot ce contează este deja în scrisoare, poți să nu îl pui.',
        'Felurile întâlnite aici sunt cinci: una în familie, una de felicitare, una între prieteni, una de recomandare și una prin care mulțumești. Felul se vede din relație și din scop, nu din numărul de rânduri.',
        'Ion Creangă i-a trimis o scrisoare lui Mihai Eminescu. A scris-o din Iași. Data ține de luna decembrie, anul 1877. I se adresa cu Bădie Mihai.',
        'Nu lipim acea scrisoare aici. Recunoaștem localitatea, data și felul în care îl numește. Adresarea arată o relație apropiată, nu o formulă rece.',
        'La 29 iunie 1933, regina Maria se adresează țării și poporului. Ajunsese la 17 ani. Se născuse în Anglia și s-a străduit să devină româncă. I s-a spus Mama tuturor.',
        'În acel text pomenește castelul de la Bran și Balcicul. Părțile se recunosc după loc, dată, adresare și încheiere. Rândurile reginei nu se copiază în lecție.'
      ].join('\n\n'),
      example: [
        'Sus, în dreapta: Sibiu, 12 martie. La mijloc: Dragă bunicule, Cuprins: Trenul a sosit la timp. Mâine vedem cetatea. Jos, în dreapta: Cu bine, apoi semnătura Irina.',
        'P.S. Am strecurat în plic un bilet de tramvai. Sunt de față localitatea, data, adresarea cu virgulă, cuprinsul, încheierea și semnătura. Biletul stă în P.S., fiindcă fusese uitat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă semnezi la stânga și pui data sub adresare, părțile nu mai stau la locul lor. Data și localitatea urcă în dreapta. Semnătura coboară sub Cu drag, tot în dreapta.'
        }
      ],
      tryThis: [
        'Din tabăra de la munte, scrie-i bunicului. Sus, în dreapta, pune orașul și ziua. La mijloc, Dragă bunicule, cu virgulă.',
        'În mijloc pui trei propoziții. Jos pui Cu drag, numele tău și un adaos P.S. dintr-o singură propoziție. Nu relua textul reginei Maria și nici scrisoarea lui Creangă către Eminescu.'
      ].join('\n\n'),
      keyPoints: [
        'Localitatea și data stau sus, în dreapta. Adresarea, cu virgulă, stă la mijloc. Încheierea și semnătura stau jos, în dreapta.',
        'P.S. adaugă doar ce ai uitat. Scrisoarea poate fi de familie, de felicitare, între prieteni, de recomandare sau de mulțumire.',
        'Din Iași, în decembrie 1877, Creangă îl numește pe Eminescu Bădie Mihai. Regina Maria scrie către țară la 29 iunie 1933.'
      ]
    }),

    lesson({
      id: 'vocabular-sens',
      title: 'Forma, sensul, contextul',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Două fețe',
          text: 'Forma este cum se aude cuvântul. Sensul este ce înțelegi. Enunțul din jur, adică contextul, alege sensul potrivit.'
        }
      ],
      theory: [
        'Limba vorbită se construiește din sunete. Iese pe loc și se îndreaptă spre ureche. Limba scrisă se construiește din semne și ține reguli. Una se aude. Cealaltă se vede.',
        'Vocabularul este mulțimea cuvintelor unei limbi. Nu stă pe loc. Intră cuvinte noi. Ies unele vechi. Sensurile se mută în timp, chiar dacă forma rămâne.',
        'Cuvântul are două fețe. Forma este șirul de sunete. Sensul este înțelesul. Două forme pot duce la înțelesuri apropiate. O formă poate duce la înțelesuri care nu se leagă.',
        'Sinonimele au înțeles apropiat și formă diferită. Trist și mâhnit stau aproape. Nu sunt mereu schimbabile în orice enunț, dar sensul lor se învecinează.',
        'Antonimele au înțeles opus. Vesel se opune lui trist. Opoziția se verifică în același fel de context: o stare față de altă stare, nu un obiect față de o stare.',
        'Omonimele au aceeași formă, dar înțelesurile nu se leagă. Părul din cap și părul din livadă doar seamănă la auz. Unul nu explică pe celălalt.',
        'Contextul este enunțul în care stă cuvântul. El alege sensul. Fără enunț, păr poate fi fir sau pom. Cu enunțul, alegi fără să ghicești la întâmplare.',
        'Sensul propriu de bază este cel obișnuit. Când rupi o floare, floare este planta din grădină. Sensul propriu secundar vine dintr-o asemănare. Pe must, floarea este pielița.',
        'Sensul figurat este expresiv. Când fata este floarea mamei, floarea laudă fata, nu numește o plantă. Figuratul se sprijină pe un salt, nu pe sensul din grădină spus mai frumos.',
        'Cuvinte ieșite din uzul de azi: ieniceri, buzdugan, pârcălab, cușmă. Cuvinte intrate mai târziu: laptop, mouse, metrou. Cunoscute de toți, și vechi, și încă vii: pom, sobă, fruct.',
        'La un item spui întâi relația: sinonim, antonim sau omonim. Apoi dai enunțul. La floare, spui dacă sensul este de bază, secundar sau figurat.'
      ].join('\n\n'),
      example: [
        'Mâhnit stă lângă trist: sens apropiat, formă alta. Vesel stă în față: sens opus. Dacă spui că tunzi părul, te gândești la fire. Dacă culegi pere, te gândești la pom.',
        'Floare, lângă a rupt, este planta. Floare, lângă must, este pielița. Floare, lângă fată și mamă, este laudă. Laptop a intrat târziu. Pârcălab a ieșit din vorbirea de azi. Pom îl știe oricine.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Mouse, lângă calculator, este cuvânt nou. Sobă rămâne cunoscută de toți. Cușmă ține de cuvintele vechi. Aceeași grilă: nou, comun, ieșit din uz. Nu le amesteci după cât de lung este cuvântul.'
        }
      ],
      practice: [
        '1) Construiește o propoziție în care trist și mâhnit apar ca sinonime.',
        '2) Construiește o propoziție în care vesel și trist apar ca antonime.',
        '3) Scrie două enunțuri cu păr: unul pentru fire, unul pentru pom.',
        '4) Pentru floare, dă trei enunțuri: sensul obișnuit, cel de pe must și cel de laudă. Spune unde pui laptop și unde pui pârcălab.'
      ].join('\n\n'),
      answers: [
        'Eram trist, adică mâhnit, după plecare.',
        'Ieri era vesel, azi este trist.',
        'Tunde părul. Culege pere din păr.',
        'A rupt o floare: bază. Mustul a făcut floare: secundar. Fata este floarea mamei: figurat. Laptop la cuvinte noi. Pârcălab la cuvinte vechi.'
      ],
      mistakes: 'Nu pune omonimele lângă sinonime. Firele și pomul nu se explică unul prin altul. Sensul figurat nu este sensul de bază spus mai frumos. Este o mutare.',
      tryThis: 'Alege un cuvânt vechi, ieniceri sau buzdugan, și unul nou, laptop sau metrou. Arată că pom, sobă și fruct rămân cunoscute. Spune cum alegi sensul lui floare când lipsește enunțul și când enunțul este dat.',
      keyPoints: [
        'Forma se aude. Sensul se înțelege. Enunțul din jur alege înțelesul.',
        'Cele apropiate sunt sinonime. Cele opuse sunt antonime. Cele care doar seamănă la auz sunt omonime.',
        'Floare poate fi plantă, pieliță pe must sau laudă. Laptop e nou. Pârcălab e vechi. Pom e comun.'
      ]
    }),

    lesson({
      id: 'omonime',
      title: 'Omonime și polisemie',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei înrudiri',
          text: 'Omonimele nu își explică sensurile unul prin altul. Polisemia le leagă. Omofonele coincid la auz. Omografele coincid la scriere și se despart prin accent.'
        }
      ],
      theory: [
        'Două omonime au o singură înfățișare, dar sensurile lor pornesc din locuri diferite. Leu numește fiara. Leu numește și moneda. De la animal nu ajungi la ban printr-o asemănare.',
        'Când ambele țin de aceeași clasă morfologică, le numim lexicale. Dacă formele flexionate coincid peste tot, sunt totale. Ban și bani merg și la monedă, și la dregătorul medieval.',
        'Parțialele nu păstrează aceleași forme. Pentru cerb spui coarne. Pentru pateu spui cornuri. Baza seamănă, pluralul nu, deci perechea este parțială.',
        'Mai sunt patru perechi de același fel. Panglica face benzi, grupul face bande. Omul care conduce face ghizi, cartea face ghiduri. Omul face romani, cartea face romane. Brațul face coate, unghiul face coturi.',
        'Când clasele morfologice diferă, omonimele se numesc lexico-gramaticale. În Eu port o ie, port este verb. În enunțul cu vapoare, port este substantiv. Sună la fel. Rolul nu.',
        'Omofonele coincid la auz și diferă la scriere. Pronumele se scrie ea. Verbul se scrie ia. Le desparți după rolul din enunț și după litera de la început.',
        'Omografele au aceeași scriere, însă accentul le desparte la citire. Cu accentul pe prima silabă, haină este haina de pe cuier, substantiv. Cu accentul mutat, adjectivul înseamnă crud.',
        'Polisemia strânge mai multe sensuri înrudite sub una și aceeași formă. Verbul a ridica acoperă înălțarea, construirea, săltarea și creșterea.',
        'Despre măr, crud vrea să spună necopt. Despre vârstă, vrea să spună fraged. Despre vânt, vrea să spună rău. Sensurile se țin de asprime sau de ceva neajuns la capăt, deci nu sunt omonime.',
        'Proba scurtă: dacă poți explica un sens prin celălalt, ai polisemie. Dacă o iei de la zero, ai omonimie. Apoi verifici dacă partea de vorbire rămâne aceeași.',
        'Pluralul decide între total și parțial. Forme identice în toată seria înseamnă totale. Plurale diferite înseamnă parțiale, cum se vede la corn.'
      ].join('\n\n'),
      example: [
        'În Ea ia creionul, pronumele și verbul sunt omofone. Haina de pe cuier este substantiv. Fapta haină, cu accentul mutat, este adjectiv și înseamnă crudă.',
        'Coarnele stau pe cerb. Cornurile stau în pungă: pereche parțială. Când elicopterul se ridică, sensul este înălțare. Când oamenii ridică o casă, sensul este construire. Un măr crud nu este copt.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ban și bani merg la fel pentru monedă și pentru dregător: omonime totale. Roman, romani este omul. Roman, romane este cartea: parțiale. Nu le pui în aceeași cutie doar fiindcă forma de bază seamănă.'
        }
      ],
      practice: [
        '1) În Ea ia creionul, ce este ea și ce este ia?',
        '2) Corn la cerb și corn la pateu sunt omonime totale sau parțiale? De ce?',
        '3) Ce înseamnă a ridica în Elicopterul s-a ridicat și în Au ridicat o casă?',
        '4) Ce înseamnă crud despre un măr și despre un vânt? Sensurile sunt legate sau nelegate?'
      ].join('\n\n'),
      answers: [
        'ea este pronume, ia este verb',
        'parțiale, fiindcă pluralul este coarne la cerb și cornuri la pateu',
        's-a înălțat; au construit',
        'necopt; rău; sensurile sunt legate, deci polisemie'
      ],
      mistakes: 'Nu numi omonim orice cuvânt cu două sensuri. La a ridica, sensurile se leagă. Ea și ia nu se scriu la fel. Adjectivul haină nu este haina de pe cuier.',
      tryThis: 'Compune enunțuri pentru banul-monedă, pentru portul cu vapoare, pentru coarne și pentru cornuri. Dă a ridica o dată ca înălțare și o dată ca construire. Spune ce înseamnă crud când vorbim despre vârstă.',
      keyPoints: [
        'Aceeași formă cu sensuri nelegate dă omonime. Totalele se flexionează la fel. Parțialele își schimbă pluralul.',
        'Omofonele coincid la auz și diferă în scriere. Omografele coincid în scriere și se despart prin accent.',
        'La a ridica, sensurile rămân legate: înălțare, construire, săltare, creștere. Asta este polisemie.'
      ]
    }),

    lesson({
      id: 'diftong-hiat',
      title: 'Diftong, triftong, hiat',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'În aceeași silabă sau nu',
          text: 'În diftong stau o vocală și o semivocală, împreună. În triftong, semivocalele sunt două. Hiatul le pune în silabe vecine.'
        }
      ],
      theory: [
        'Sunetul este ce pronunți. Litera este semnul scris. Numărul de litere nu este, mereu, numărul de sunete. De aceea numeri separat, înainte să desparți.',
        'A, ă, â și î nu devin niciodată semivocale. Fiecare poate ține, singură, o silabă. E, i, o și u sunt vocale când sunt pline, adică atunci când țin silaba.',
        'E, i, o și u devin semivocale când sunetul lor slăbește și nu mai poate ține singur o silabă. Stau lipite de o vocală. Consoanele au nevoie de o vocală ca să intre într-o silabă.',
        'Diftongul adună, în aceeași silabă, o vocală și o semivocală. În câine, despărțirea este câi-ne. Grupul âi este diftongul. Nu îl tai în două.',
        'Triftongul adună, tot într-o silabă, o vocală și două semivocale. Aripioară se desparte a-ri-pioa-ră. În silaba pioa, triftongul este ioa: i și a sunt semivocale, o este vocala.',
        'Hiatul este două vocale alăturate, puse în silabe diferite. Idee se desparte i-de-e. Cele două e de la final nu stau în aceeași silabă. Între ele este hiat.',
        'Litera x nu se aude la fel peste tot. În excursie se aude ks. În examen se aude gz. O notezi după cuvânt, nu după o regulă unică.',
        'Sunetul k se poate scrie în trei feluri: cu c, cu k sau cu q. Alegi forma învățată a cuvântului. Nu schimbi litera doar fiindcă sunetul este același.',
        'Grupurile ce și ci, ge și gi, apoi che, chi, ghe și ghi pot reda un singur sunet. Se întâmplă când grupul stă înaintea unei vocale, în silaba ei, cum se vede la geană.',
        'Două sunete apar dacă urmează o consoană sau dacă grupul este, el singur, o silabă. În cer, după ce vine r. În chenar, che este o silabă întreagă. În ambele, e se aude ca vocală.',
        'Proba: dacă e sau i doar anunță sunetul consoanei și stă cu vocala următoare, numeri un sunet. Dacă e sau i este vocala silabei, numeri două.'
      ].join('\n\n'),
      example: [
        'La câine, tăietura câi-ne păstrează diftongul âi. La aripioară, tăietura a-ri-pioa-ră păstrează triftongul ioa, în silaba pioa. La idee, tăietura i-de-e lasă hiat între e-uri.',
        'Sunetul de la începutul lui excursie este ks. La examen, x dă gz. Geană pornește cu un singur sunet, iar cer pornește cu două, fiindcă după ce vine o consoană.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Chenar se desparte che-nar. Che face singur silaba, deci che se aude în două sunete. Nu îl trata ca pe ge din geană, unde grupul stă înaintea vocalei, în aceeași silabă.'
        }
      ],
      practice: [
        '1) Desparte câine și spune care este diftongul.',
        '2) Desparte aripioară și spune care este triftongul.',
        '3) Desparte idee și arată unde este hiatul.',
        '4) Cum se aude x în excursie și în examen? Geană începe cu câte sunete? Cer?'
      ].join('\n\n'),
      answers: [
        'câi-ne; diftongul âi',
        'a-ri-pioa-ră; triftongul ioa',
        'i-de-e; hiat între cele două e',
        'ks în excursie, gz în examen; geană un sunet; cer două sunete'
      ],
      mistakes: 'Nu tăia diftongul âi din câine. Nu lipi cele două e din idee. Nu crede că x se aude mereu ks. În examen se aude gz.',
      tryThis: 'Arată despărțirile lui câine, aripioară și idee și numește grupul. Arată și pronunția lui x: ks la excursie, gz la examen. Compară începutul lui geană cu începutul lui cer.',
      keyPoints: [
        'Diftongul stă într-o silabă: vocală plus semivocală. Triftongul adaugă încă o semivocală. Hiatul desparte vocalele.',
        'În câi-ne, âi este diftong. În a-ri-pioa-ră, ioa este triftong. În i-de-e, e-e este hiat.',
        'X dă ks sau gz, după cuvânt. Ce, ge și che dau un sunet ori două, în funcție de silabă.'
      ]
    }),

    lesson({
      id: 'silabe-reguli',
      title: 'Cum desparți în silabe',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'O vocală, o silabă',
          text: 'Silaba se rostește dintr-o dată și are o vocală. Cuvântul cu o silabă este monosilabic. Cel cu două sau mai multe este plurisilabic.'
        }
      ],
      theory: [
        'Pom are o silabă, deci este monosilabic. Cameră se taie ca-me-ră, deci este plurisilabic. Diftongul și triftongul țin locul unei vocale când numeri silabele.',
        'Consoana singură, prinsă între vocale, trece la silaba din dreapta. Așa se taie po-diș, ra-ză și ma-și-nă. Nu o lași în urma vocalei, dacă nu mai are pereche.',
        'Două consoane se despart, de regulă. Activ se taie ac-tiv. Simbol se taie sim-bol. Fiecare consoană rămâne lângă vocala ei.',
        'Excepția: a doua literă din grup este l sau r, iar cea dintâi stă în șirul b, c, d și f, alături de g, h, apoi p, t și v. Grupul nu se taie. Vezi ca-blu și co-dru, apoi ti-tlu și li-tru.',
        'La trei consoane, tăietura cade de obicei după cea dintâi. Aspru devine as-pru. Cinste devine cin-ste. Prima închide silaba dinainte. Celelalte două deschid silaba următoare.',
        'Unele grupuri de trei se taie după a doua consoană. Le ții pe bucăți: lpt, mpt și nct, apoi ncș cu ncț, apoi rct, rtf, stm și ndv. De aici vin sculp-tu-ră, punc-te, jert-fă și arc-tic.',
        'Când vocalele stau în hiat, le desparți. Când după o vocală urmează un diftong ori un triftong, tăietura cade înaintea grupului. Idee rămâne i-de-e.',
        'Cratima de la capătul rândului nu se pune și la începutul rândului nou. Nu începi rândul cu o literă rămasă singură. Regulile de silabă și regula de rând merg împreună.',
        'Seria bună, dintre cele întâlnite des, este arc-tic, apoi func-ți-e, apoi or-to-gra-fi-e. Le scrii cu cratima la locul tăieturii, nu într-un bloc.',
        'Pi-a-tră nu este bun, fiindcă rupe diftongul ia. Corect este pia-tră. Su-bi-ect rupe diftongul ie. Corect este su-biect. Fiin-ță lipește hiatul. Corect este fi-in-ță.',
        'Opt cuvinte de control: candelabru dă can-de-la-bru, creastă dă creas-tă, aspru dă as-pru, suplu dă su-plu. Mapă dă ma-pă, jertfă dă jert-fă, fiică dă fi-i-că, tavă dă ta-vă.',
      ].join('\n\n'),
      example: [
        'Podiș se taie po-diș, o consoană trece mai departe. Cablu se taie ca-blu, fiindcă bl rămâne împreună. Aspru se taie as-pru, după prima din trei.',
        'Sculptură se taie sculp-tu-ră, fiindcă lpt se taie după a doua. Arctic se taie arc-tic. Funcție se taie func-ți-e. Ortografie se taie or-to-gra-fi-e. Idee se taie i-de-e.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Suplu se taie su-plu, ca și cablu: p stă în șirul care păstrează l. Jertfă se taie jert-fă, nu jer-tfă, fiindcă rtf este excepție și se taie după a doua consoană.'
        }
      ],
      practice: [
        '1) Desparte candelabru și suplu. De ce grupul cu l sau cu r rămâne întreg?',
        '2) Desparte aspru și jertfă. Unde tai la trei consoane și unde este excepția?',
        '3) Notează tăietura bună pentru arctic, funcție și ortografie. Arată greșeala din pi-a-tră și din fiin-ță.',
        '4) Desparte mapă, tavă, creastă și fiică.'
      ].join('\n\n'),
      answers: [
        'can-de-la-bru; su-plu; l sau r stă cu b, c, d, f și, mai departe, cu g, h, p, t, v',
        'as-pru, după prima; jert-fă, după a doua, fiindcă rtf este excepție',
        'arc-tic, func-ți-e, or-to-gra-fi-e; pi-a-tră rupe diftongul; fiin-ță lipește hiatul',
        'ma-pă; ta-vă; creas-tă; fi-i-că'
      ],
      mistakes: 'Nu tăia cablu în cab-lu. Nu tăia sculptură după prima consoană din lpt. Nu lăsa o literă singură pe rândul următor și nu repeta cratima acolo.',
      tryThis: 'Taie, pe rând, candelabru și creastă, apoi aspru cu suplu, apoi mapă, jertfă, fiică și tavă. Spune regula pentru fiecare. Notează arc-tic, func-ți-e și or-to-gra-fi-e. Arată greșeala din pi-a-tră și din fiin-ță.',
      keyPoints: [
        'Consoana singură trece la dreapta. Două consoane se despart, iar grupul cu l sau r rămâne întreg doar în excepție.',
        'La trei consoane, tai de obicei după cea dintâi. La lpt, nct, rct, rtf și la celelalte excepții, tai după a doua.',
        'Tăieturile bune sunt arc-tic, func-ți-e și or-to-gra-fi-e. Pi-a-tră rupe diftongul. Fiin-ță lipește hiatul.'
      ]
    }),

    lesson({
      id: 'legenda',
      title: 'Legenda și valoarea',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Explică și minunează',
          text: 'Legenda este o povestire scurtă care arată de unde a apărut ceva. Lângă o faptă plauzibilă pune o minune.'
        }
      ],
      theory: [
        'Legenda este un text narativ scurt. Poate sta în proză sau în versuri. Arată de unde vine un lucru, o ființă, un ținut sau o ispravă de erou.',
        'Semnul ei este amestecul. O întâmplare plauzibilă stă lângă o minune. Dacă scoți minunea, rămâne o întâmplare. Dacă scoți fapta, rămâne o vrăjă fără rost.',
        'Cauți patru valori: binele, adevărul, curajul, bunătatea. Nu le anunți într-o etichetă. Le arăți prin alegerea personajului, când are ceva de pierdut.',
        'Cea istorică pornește de la un război ori de la un domn. Faptul de istorie este punctul de sprijin. Minunea vine peste el, fără să șteargă numele.',
        'Cea mitologică dă o poveste unui animal, unei plante, unui munte sau unui astru. Întrebi ce lucru din natură capătă explicație. Răspunsul este tema.',
        'Cea religioasă spune o faptă de sfânt. Valoarea stă în gestul lui, nu în lungimea textului. O recunoști după cine face binele și după ce se schimbă în jur.',
        'Povestea Vrancei explică un nume de ținut. În ea intră Ștefan cel Mare și Vrâncioaia. O ții minte ca legendă istorică, legată de un loc și de un domn.',
        'În alte tradiții se explică sarea mării sau drumul unui pescar până la palatul din valuri. Sunt tot legende: un lucru capătă o poveste, iar minunea stă lângă faptă. Nu le lipim aici.',
        'Scena de lucru este a noastră. Satul avea o fântână cu apă dulce. O fată îi întinde unui drumeț sarea care îi mai rămăsese, doar un pumn. A doua zi, apa fântânii era sărată, iar lângă ghizd stătea o cană plină.',
        'Textul explică sarea din fântână. Minunea este schimbarea apei. Fapta plauzibilă este darul. Valoarea este bunătatea, fiindcă fata dă ce îi mai rămăsese.',
        'Trei pași. Spui fapta. Spui imaginea, cu văd. Spui alegerea ta și o legi prin pentru că. La urmă spui ce anume explică textul și ce valoare poartă gestul.'
      ].join('\n\n'),
      example: [
        'Fapta: fata îi întinde drumețului pumnul de sare rămas, iar a doua zi apa din fântână s-a sărat și lângă ghizd stă o cană plină. Imaginea: văd fântâna, fata, omul de pe drum și cana.',
        'Aș fi dat și eu din sare, pentru că era ultima și omul era pe drum. Textul explică sarea din fântână. Valoarea este bunătatea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă fântâna rămâne dulce și nimeni nu dă nimic, nu ai legendă: lipsește și explicația, și minunea. Darul fără schimbarea apei este doar o faptă bună. Minunea fără dar este doar o veste ciudată.'
        }
      ],
      tryThis: [
        'La liziera pădurii, un băiat stinge un foc mic cu haina lui. În ziua următoare, pe pârjol răsare un copac cu frunza roșie.',
        'Trei propoziții: fapta, imaginea, alegerea ta legată prin pentru că. Imaginea pornește cu Văd. Spune ce anume explică textul și ce valoare poartă gestul băiatului.'
      ].join('\n\n'),
      keyPoints: [
        'Legenda dă o explicație și pune o minune lângă o faptă plauzibilă.',
        'Felurile ei sunt istoric, mitologic și religios. Povestea Vrancei îl are pe Ștefan cel Mare și pe Vrâncioaia.',
        'Curajul, adevărul, binele și bunătatea se citesc în gest, nu într-o etichetă goală.'
      ]
    }),

    lesson({
      id: 'proiect-scriitori',
      title: 'Acasă la scriitorii români',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Grupul și casa',
          text: 'Lucrați câte patru sau câte cinci. Grupul își alege scriitorul și muzeul din casa lui. Profesorul îndrumă. Nu scrie el lucrarea.'
        }
      ],
      theory: [
        'Proiectul se numește Acasă la scriitorii români. Lucrați în grup, de patru sau de cinci. Alegeți un scriitor și casa în care a trăit, păstrată apoi ca muzeu.',
        'Stabiliți întrebarea, pe cel care caută, sursa, termenul și felul în care arătați rezultatul.',
        'Căutați doar în surse de încredere. Fiecare primește o sarcină clară. La urmă vorbiți și ascultați ce spun colegii.',
        'Forma poate fi colaj, portofoliu sau o prezentare orală. Legați textul de imagini, ca să se vadă și casa, nu doar numele ei.',
        'O lucrare reușită arată bibliografia și planul. Tema este dezvoltată și are o argumentare. Vorbirea este limpede. Tonul și gestul se potrivesc. Materialele sunt diverse. Ideea vă aparține.',
        'Muzeul din casa lui Mihai Eminescu stă la Ipotești, județul Botoșani. Gheorghe Eminovici, în anul 1850, cumpără moșia și construiește casa.',
        'Casa are trei încăperi. Una este salonul familiei. Alta este biroul tatălui. A treia este dormitorul mamei și al fetelor. Până în 1878, familia rămâne în acea casă.',
        'Raluca Eminovici cumpără o bisericuță pentru familie. Prețul este de 250 de galbeni. Vânzătorul se numește Murguleț. Lăcașul ține de anii 1860.',
        'Casa lui Ion Creangă poartă numele Bojdeuca. Prin bojdeucă se înțelege o căsuță mică, simplă. Clădirea datează dinaintea anului 1850. Stă în mahalaua Țicău a Iașiului, zisă și Valea Plângerei.',
        'Este întâiul muzeu literar memorial din România. Deschiderea a avut loc la 15 aprilie 1918. Adresa: Țicăul de Sus, numărul 4. Creangă se mută aici în vara anului 1872.',
        'În această casă scrie Poveștile și volumul Amintiri din copilărie. În 1876, Eminescu petrece acolo jumătate de an, în casa lui Creangă.',
        'Bucătăria păstrează un cuptor, asemenea celui de la Humulești, și o masă din lemn, cu trei picioare. Lângă ele stau icoana primită de la mama scriitorului și chipul Tincăi Vartic.',
        'În camera de lucru, pe birou, stau file scrise de mâna lui Creangă, lampa, pana și călimara. Mai sunt scuturătoarea de nisip și o ladă. Lada amintește de cea a lui Eminescu.',
        'Portretul din cameră este lucrat de V. Mușnețanu. De pe prispă se văd Ciric și Sorogari. Faptele de mai sus intră în proiect. Nu le lua dintr-o pagină găsită la întâmplare.'
      ].join('\n\n'),
      example: [
        'Grupul ia Bojdeuca. Vrea locul casei și obiectele din odaia de scris. Izvorul este site-ul muzeului. Lucrarea are patru foi, ca un portofoliu.',
        'Ana reține 1918. Vlad notează obiectele. Lia desenează prispa. Radu rostește textul. Pe birou ajung lampa, pana și călimara, pentru că lecția le pune acolo.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'La Ipotești, trei încăperi ajung pentru un plan scurt: salonul familiei, biroul tatălui, dormitorul mamei și al fetelor. Anul de ținut este 1850. Galbenii și numele Murguleț țin de bisericuță, nu de casa cu trei camere.'
        }
      ],
      tryThis: [
        'Alege Ipotești sau Bojdeuca. În opt sau zece rânduri, dă locul casei, un an de ținut minte și trei obiecte ori camere din lecție.',
        'Schițează apoi un grup de patru: cine caută, ce izvor folosiți, ce formă ia lucrarea și cu ce frază închideți prezentarea. Nu lua textul dintr-o pagină găsită la întâmplare.'
      ].join('\n\n'),
      keyPoints: [
        'Grupul își face planul, caută în izvoare sigure și arată rezultatul prin text împreună cu imagini.',
        'La Ipotești, casa lui Eminescu are trei încăperi. A fost ridicată în 1850, pe moșia luată de Gheorghe Eminovici.',
        'În Țicău, Bojdeuca a devenit muzeu la 15 aprilie 1918. Acolo a scris Creangă Amintiri din copilărie. În 1876, Eminescu a stat în ea o jumătate de an.'
      ]
    }),

    lesson({
      id: 'recap-acasa',
      title: 'Recapitularea despre casă',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Ce legi la final',
          text: 'Pe o scenă scurtă legi persoana I, sinonimul, antonimul, silaba și valoarea. Scrisoarea își păstrează locul, data, adresarea și semnătura.'
        }
      ],
      theory: [
        'La închiderea unității nu o iei de la zero. Reiei, pe o scenă scrisă aici, vocea, sensul, silaba, scrisoarea și valoarea. Fiecare intră o dată, cu semnul lui.',
        'Scena de recapitulare. Joi, când se întunecă, eu stau la masa din camera mea. Îi scriu mamei că florile de la fereastră au primit apă și că mă simt bucuroasă. Caietul de pe masă este albastru.',
        'Naratorul spune eu. Vorbește la persoana I, deci vocea este și personaj. Nu este autorul unui volum. Este vocea acestei scene. Privirea este a celui care scrie, deci este subiectivă.',
        'Veselă stă aproape de bucuroasă, deci sunt sinonime: sens apropiat, formă diferită. Tristă stă în față, deci este antonimul. Nu le confunzi cu omonimele, fiindcă sensurile se leagă prin opoziție sau prin apropiere.',
        'Cuvântul cameră se taie ca-me-ră. Are trei silabe. Consoana dintre vocale trece la dreapta. Dacă scrii cam-eră, ai rupt regula și ai lipit greșit.',
        'Fapta arată grija. Florile aveau nevoie de apă, iar eu le-am udat. Valoarea nu se anunță printr-un titlu. Se vede în gest, ca în legendă.',
        'Scrisoarea de recapitulare își păstrează părțile. Sus, în dreapta, stau localitatea și data. Adresarea, cu virgulă, este Dragă mamă. Dacă scrii tatălui, formula devine Dragă tată.',
        'Cuprinsul este la persoana I. Faptele vin în ordine. Apare o emoție. Două propoziții descriu camera, deci intră și tiparul descriptiv, scurt, lângă cel narativ.',
        'Încheierea stă jos, în dreapta, de pildă Cu drag, iar semnătura vine sub ea. Dacă ai uitat un lucru, îl pui la P.S., nu îl ascunzi în mijlocul descrierii.',
        'Trei pași pe scena lecției. Spui fapta. Spui imaginea, cu văd. Spui alegerea ta și o legi prin pentru că. Apoi adaugi tipul de narator, un sinonim, un antonim și tăietura lui cameră.',
        'Dacă îți iese scrisoarea și îți ies și cele patru etichete, unitatea stă pe picioare: casă, voce, sens, silabă, valoare.'
      ].join('\n\n'),
      example: [
        'Fapta: joi, la lăsarea serii, din camera mea, îi scriu mamei despre florile udate și despre bucuria mea. Imaginea: văd odaia, caietul albastru și florile de la fereastră.',
        'Aș fi pus semnătura, pentru că scrisoarea era pentru mamă și mă simțeam bucuroasă. Veselă stă lângă bucuroasă. Tristă i se opune. Cameră se taie ca-me-ră. Vocea este la persoana I.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă descrii doar caietul albastru și nu spui că l-ai scris mamei, rămâi la descriere. Narativul cere fapta: udatul și scrisul. Silaba lui cameră nu ține loc de întâmplare.'
        }
      ],
      tryThis: [
        'Către un părinte, compune o scrisoare de 80 până la 100 de cuvinte. Sus și la dreapta pui localitatea împreună cu data. Adresarea, cu virgulă, este Dragă mamă. Dacă scrii tatălui, formula devine Dragă tată.',
        'Vorbești la persoana I, cu faptele așezate în ordine, cu o emoție și cu două propoziții despre cum arată camera. Pe scena lecției, spune tipul de narator, un sinonim al lui bucuroasă, un antonim și tăietura din cameră.'
      ].join('\n\n'),
      keyPoints: [
        'La final se întâlnesc persoana I, perechea de sinonime, antonimul, tăietura în silabe și valoarea.',
        'Bucuroasă se apropie de veselă și se opune lui tristă. Cameră se taie ca-me-ră.',
        'Scrisoarea păstrează locul, data, adresarea cu virgulă, emoția și o descriere scurtă a camerei.'
      ]
    })
  ]
};
