'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  lessons: [
    lesson({
      id: 'deschidere-scoala',
      title: 'Harta școlii',
      kind: 'comunicare',
      boxes: [
        {
          type: 'atentie',
          title: 'Harta nu închide ora',
          text: 'Prima foaie îți arată traseul. Nu predă materia toată dintr-o dată. Punctajul și fișa de observare nu sunt ore.'
        }
      ],
      theory: [
        'Marea temă este cunoașterea, văzută ca un drum. Partea despre școală împrumută titlul unui cântec de studenți, Gaudeamus igitur. Strofele rămân necopiate.',
        'De aici pornești spre întâmplarea epică, spre vocea care povestește, spre omul care a scris și spre personaje. Mai departe stau portretul, anunțul și vorbirea.',
        'La construcție ajungi la frază. Propozițiile se pot alătura fără conector sau se pot prinde cu unul. Intră și conjuncția de coordonare.',
        'Mai sunt de deschis sensul scos din context, repetarea inutilă a unui înțeles și perechile care seamănă fără să coincidă.',
        'Codurile-țintă sunt paisprezece. Le iei pe grupuri: întâi 1.1 cu 1.2 și cu 1.3. Apoi grupul 2.1, 2.3, 2.4. Apoi grupul 3.1, 3.2, 3.4.',
        'Urmează grupul 4.1, 4.2, 4.4 și 4.5. Închide lista 5.1. Ele țin capitolul, nu o singură privire.',
        'Cuprinsul mai anunță cuvintele făcute cu afixe, cuvintele lipite, grupurile cu sens unic și termenii de specialitate. Le lași pentru orele care vin, în aceeași unitate.',
        'Mai apar alegerea între vorbă și scris, graiul de sat și deosebirile dintre regiuni.',
        'Închid lista sunetele, tăietura silabelor, apăsarea, limbile vecine și proiectul pe temă.',
        'Azi reteții doar câteva titluri: epic, anunț, frază, paronime, derivare, proiect. Dacă ai numai cuprinsul, ai busola. Ora începe când lucrezi un titlu, cu exemplele lui.',
        'Un titlu bifat pe hartă nu înseamnă lecția gata. Abia exercițiul deschide capitolul.'
      ].join('\n\n'),
      example: [
        'Gaudeamus igitur rămâne numele unui cântec, nu un text de lipit în caiet.',
        'Notezi cele paisprezece coduri, pe grupuri. Formarea cuvintelor și proiectul stau pentru orele următoare. Grila de puncte nu se predă.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Primul enunț anunță tema, școala, și lucrul de azi. Al doilea strânge codurile și spune câți sunt. Al treilea amână afixele și proiectul.'
        }
      ],
      tryThis: 'Fă trei enunțuri. Unul anunță tema, școala, și lucrul de azi: textul epic.\n\nAltul enumeră codurile pe grupuri, ca în lecție, și spune că sunt paisprezece.\n\nUltimul amână derivarea, compunerea și proiectul tematic și spune că foaia cu puncte nu este lecție.',
      keyPoints: [
        'Capitolul pornește cu o hartă: epic, anunț, vorbire, frază, context, dublare de sens, cuvinte asemănătoare.',
        'Sunt paisprezece coduri, grupate de la 1.1 până la 5.1, și ele țin toată unitatea.',
        'Afixele, compusele, sunetele și proiectul vin fiecare la rând. Grila nu se predă.'
      ]
    }),
    lesson({
      id: 'text-epic',
      title: 'Întâmplarea, conflictul și legătura dintre secvențe',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Text epic',
          text: 'Epicul este literar și se sprijină pe povestire: fapte așezate în ordine, personaje, semne de timp și de loc, plus o tensiune.'
        }
      ],
      theory: [
        'Cel care povestește înșiră întâmplările așa încât să se țină și logica, și timpul. Personajele nu au toate aceeași greutate.',
        'Tensiunea se numește conflict. Când apare între persoane, ori între o persoană și mediul din jur, conflictul este exterior. Când este o frământare între două stări, este interior.',
        'O secvență spune o singură întâmplare. Ca să le unești, folosești fie o privire înapoi, fie o înlănțuire.',
        'Privirea înapoi, numită retrospectivă, aduce în clipa povestirii un moment mai vechi. O faci prin amintire sau prin evocare.',
        'Înlănțuirea respectă ordinea faptelor. Semnele utile, luate separat, sunt la început. Urmează când. Urmează apoi. Urmează după aceea. Închide la final.',
        'Povestirea se poate amesteca cu un tablou, ca să iasă atmosfera, și cu schimbul de replici, ca să iasă ritmul.',
        'Dacă naratorul spune eu, povestirea este subiectivă. Dacă stă la persoana a III-a, este obiectivă.',
        'A ține piept cuiva are ca echivalent a i se opune. Variantele din exercițiu, spuse pe rând, sunt a i se opune, apoi a-l înfrunta, apoi a-l aprecia, apoi a-i vorbi. Cea bună este prima.',
        'Grigore Băjenaru a scris Cișmigiu & Comp. Cartea păstrează o amintire din liceu, legată de grădina Cișmigiu. La unele licee din București, șepcile de culori diferite îi deosebeau pe elevi. Culorile nu se înșiră aici.',
        'Un proverb, spus altfel, arată că dascălul deschide ușa, iar tu pășești singur. Tabloul Drumul spre școală este pictat de Albert Anker. Îl descrii doar dacă îl ai în față.',
        'Scena de lucru este a noastră. Într-o dimineață de miercuri, Doru stă la poarta școlii. Vârsta lui este 13 ani. Învață în clasa a VII-a. Rucsacul pe care îl poartă este albastru.',
        'În septembrie, Radu a întârziat. La aceeași poartă, Doru l-a așteptat. Replica lui a fost: Te aștept, nu e târziu. Azi Doru readuce acea dimineață în minte. Amintirea este retrospectiva.',
        'Frica că Radu rămâne afară este conflict interior. Înlănțuirea: așteaptă, își amintește, zâmbește, repetă replica. Naratorul nu spune eu, deci este obiectiv. Timpul: miercuri dimineața, cu amintirea din septembrie. Locul: poarta.'
      ].join('\n\n'),
      example: [
        'Ce este scris: miercuri, la poartă, un băiat. Are 13 ani. Învață în clasa a VII-a. Rucsacul este albastru. Își amintește întârzierea lui Radu din septembrie.',
        'Ce observi începe așa: Îl văd pe Doru. Stă la poartă. Rucsacul albastru îi stă pe umăr. Eu aș intra fără zăbavă, pentru că Radu a întârziat în septembrie, iar Doru a rămas să îl aștepte.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Patru verigi: așteptarea, amintirea din septembrie, zâmbetul, replica repetată. Naratorul nu intră cu eu în scenă, deci rămâne obiectiv.'
        }
      ],
      tryThis: 'Pe scena lui Doru notează ce este scris, ce observi și ce ai face, cu pentru că. Ce observi începe cu Îl văd. Spune timpul, locul și persoana naratorului.\n\nArată de ce amintirea este retrospectivă și de ce teama este conflict interior. Leagă faptele folosind, pe rând, la început, apoi după aceea și, la urmă, la final. Adaugă sensul lui a ține piept și cartea lui Grigore Băjenaru.',
      keyPoints: [
        'Epicul povestește în ordine, cu timp, loc și o tensiune, afară sau înăuntru.',
        'Retrospectiva readuce un moment vechi. Înlănțuirea merge cu la început, apoi, după aceea, la final.',
        'La poartă, naratorul este obiectiv. Echivalentul lui a ține piept cuiva este a i se opune.'
      ]
    }),
    lesson({
      id: 'autor-narator',
      title: 'Cine scrie, cine povestește, cine există doar în text',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei roluri',
          text: 'Omul real care scrie este autorul. Vocea pusă să povestească este naratorul. Ființa care trăiește doar în ficțiune este personajul.'
        }
      ],
      theory: [
        'Autorul născocește acțiunea, mesajul și figurile. El stă în afara textului.',
        'Naratorul arată locurile și înfățișează personajele. Dacă vorbește la persoana a III-a, este obiectiv. Dacă spune eu, este subiectiv.',
        'După rol, personajul poate fi principal, secundar, episodic sau figurant. După câți sunt, individual sau colectiv. După semn moral, pozitiv sau negativ.',
        'În Martin Eden, cartea lui Jack London, cineva întreabă sensul unor cuvinte scurte folosite la școală. Replicile nu se copiază.',
        'La noi, un elev întreabă ce înseamnă scurtătura mat. Răspunsul colegului: este prescurtarea pentru matematică. Cel care a pus întrebarea în lecție nu a scris lecția.',
        'Scena de roluri stă tot la poartă, miercuri dimineața. Doru așteaptă. Vârsta lui este 13 ani. Clasa lui este a VII-a. Poartă un rucsac albastru. Radu a întârziat.',
        'Replica lui Doru: Te aștept, nu e târziu. Apoi zâmbește. Așteptarea se sprijină pe el, deci este principal. Este și pozitiv, pentru că nu îl lasă pe coleg afară.',
        'Radu doar întârzie și este așteptat, deci este secundar. Portarul traversează curtea o dată și tace: rol episodic.',
        'Elevii din curte, luați împreună, fac un personaj colectiv. Doru nu a scris lecția. Vocea care povestește este obiectivă.',
        'Din scenă faci trei întrebări: ce este scris, ce observi, ce ai face, cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce este scris: la poartă stă Doru. Are 13 ani. Rucsacul este albastru. Îl așteaptă pe Radu. Replica sună Te aștept, nu e târziu.',
        'Ce observi: Îl văd pe Doru. Este la poartă. Îl văd și pe Radu, care a întârziat. Eu aș saluta portarul, pentru că trece o dată și tace.',
        'Doru este principal. Este și pozitiv. Radu este secundar. Curtea, laolaltă, este personaj colectiv. Autorul nu este Doru.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un figurant ar trece prin fundal fără să schimbe așteptarea. Portarul are totuși o trecere notată, fără replică, deci rămâne episodic.'
        }
      ],
      tryThis: 'Fă șase enunțuri, cu autor, narator, principal, secundar, episodic și colectiv. Arată, pe rând, de ce Doru este principal, de ce este pozitiv, de ce Radu anume este secundar și de ce portarul este anume episodic.\n\nSpune la ce persoană stă naratorul. Amintește, fără replica din carte, că în Martin Eden cineva caută sensul unor cuvinte scurte de la școală. Încheie cu cele trei întrebări. Ce observi începe cu Îl văd.',
      keyPoints: [
        'Autorul scrie în lumea reală. Naratorul povestește obiectiv la persoana a III-a sau subiectiv la persoana I.',
        'Personajul poate fi principal, secundar, episodic, colectiv, pozitiv sau negativ.',
        'La poartă, rolul lui Doru este principal, al lui Radu este secundar, iar portarul rămâne episodic.'
      ]
    }),
    lesson({
      id: 'caracterizare',
      title: 'Cum arăți un personaj',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Trei părți',
          text: 'Portretul scris are introducere, cuprins și încheiere. Ce se rostește este direct. Ce se vede din fapte, vorbe, haine sau purtare este indirect.'
        }
      ],
      theory: [
        'Caracterizarea arată chipul și firea și felul în care ele se dau pe față. O poate face naratorul, personajul despre sine sau un alt personaj.',
        'Calea indirectă se citește din faptă, purtare, felul de a vorbi, haine, mediu sau nume. Și povestirea, și dialogul pot lucra indirect.',
        'Introducerea dă scena și locul în întâmplare. Mai dă cine este: numele, vârsta. Mai dă statutul: rolul acasă sau la școală.',
        'Cuprinsul dă trăsăturile de chip, cu o secvență, apoi pe cele de fire, cu mijlocul și cu un exemplu. Urmează o comparație cu altcineva.',
        'Încheierea spune tipul. Mai spune valorile. Mai spune părerea ta. Cvintetul are cinci rânduri.',
        'Întâi un substantiv. Apoi două adjective. Apoi trei verbe. Apoi patru cuvinte care spun o părere. La urmă, un singur cuvânt moral: esența.',
        'Cvintetul lucrat pentru Doru, cu etichetă la fiecare rând. Rândul 1: Doru. Rândul 2: Răbdător, albastru. Rândul 3: Așteaptă, zâmbește, rămâne. Rândul 4: Prieten bun la poartă. Rândul 5: Loialitate.',
        'Direct, naratorul spune: Doru este un coleg răbdător. Indirect, răbdarea iese din așteptare. Vorbirea stă în replica Te aștept, nu e târziu. Haina stă în ghiozdanul albastru. Purtarea stă în zâmbet.',
        'Doru are 13 ani. Învață în clasa a VII-a. Este personaj principal. Radu este colegul care întârzie, deci secundar. Portarul trece o dată.',
        'Între 1881 și 1944 a trăit Ion Minulescu. A fost poet. A fost și prozator. În 1897, revista Povestea vorbei i-a tipărit primele versuri. Semnătura era (I. M.) Nirvan.',
        'A mers la Paris pentru drept. Poeții francezi i-au plăcut. A lăsat studiul. Întors acasă, a scris și versuri, și proză.',
        'Anul 1906 a adus, în Viața literară și artistică, versurile strânse apoi în Romanțe pentru mai târziu. Proza cea mai cunoscută anume este romanul autobiografic Corigent la limba română anume.',
        'Schițe și nuvele a mai strâns în Casa cu geamurile portocalii. Ideea de ținut, cu vorbele noastre: la scris rămâi singur cu foaia, iar la oral mai ai o voce.',
        'La clasă repeți pașii pe personajul din textul deschis, chiar dacă poartă alt nume.'
      ].join('\n\n'),
      example: [
        'Introducere: la poartă, Doru este principal. Are 13 ani. Învață în clasa a VII-a. Cuprins: enunțul Doru este un coleg răbdător este spus direct.',
        'Așteptarea, zâmbetul, ghiozdanul albastru și replica sunt indirecte. Radu întârzie. Doru rămâne. Încheiere: ține de tipul prietenului loial. Ultimul rând al cvintetului este Loialitate.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un cvintet nou, tot pe fapte: Coleg. Calm, prezent. Așteaptă, zâmbește, repetă. Stă lângă cel întârziat. Loialitate. Adjectivele se pot schimba. Vârsta, clasa și replica rămân.'
        }
      ],
      tryThis: 'Scrie portretul lui Doru, cel puțin 150 de cuvinte, numai cu faptele din lecție: rol principal, 13 ani, clasa a VII-a, ghiozdan albastru, așteptare, zâmbet, răbdare, replica și loialitatea.\n\nPune cele trei părți. Arată ce este spus direct și ce se vede indirect. Compară-l cu anume Radu într-o propoziție. Adaugă un cvintet anume. La final, trei fapte despre Minulescu: anii 1881–1944, semnătura (I. M.) Nirvan și anul 1906. Nu copia un paragraf din roman.',
      keyPoints: [
        'Ce se spune pe șleau este direct. Ce se deduce din faptă, vorbe, haine și purtare este indirect.',
        'Compunerea are trei părți. Cvintetul coboară de la un nume la un cuvânt moral anume.',
        'Doru este principal, răbdător și loial. Minulescu anume a trăit din 1881 până în 1944 și a semnat întâi (I. M.) Nirvan.'
      ]
    }),
    lesson({
      id: 'anuntul',
      title: 'Textul care spune ce, unde, când și cum',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Anunț',
          text: 'Anunțul este nonliterar și de interes public. Răspunde la patru întrebări: ce, unde, când și cum. Dacă datele stau în listă, textul este discontinuu.'
        }
      ],
      theory: [
        'Un text din afara literaturii privește realitatea. Poate da o informație, poate încerca să te convingă, poate stârni râsul sau poate avertiza.',
        'Cel continuu stă în paragrafe, fiecare cu un sens unitar. Cel discontinuu poate sta în listă sau în grafic. Poate sta în tabel, în articol de dicționar, pe fluturaș, în cuprins sau chiar într-un anunț.',
        'Anunțul se afișează în spațiul public. Se poate citi online, în ziar sau în revistă. Spune ce se întâmplă, unde, când și cum ajungi să participi.',
        'Datele de mai jos sunt ale unui program public, rescrise aici.',
        'Programul se numește Descoperiri la microscop. Îl anunță Muzeul Municipiului București. Îl susține Asociația Artelier D. Locul este Muzeul Victor Babeș. Cadrul este Școala Altfel 2019–2020.',
        'Temele sunt bacteriile și virușii, apoi bolile, remediile și igiena. Punctul de plecare este microscopul Zeiss-Jena al lui Victor Babeș.',
        'De la 24 februarie până la 7 martie, tema se numește Laboratorul fantastic. De la 8 martie până la 22 martie, tema se numește Inamicii mici și tari.',
        'Mărirea unor imagini ajunge până la 600.000 de ori. O întâlnire durează 60 de minute și se ține la Muzeul Victor Babeș.',
        'Te înscrii prin e-mail. Adresa este educatie@muzeulbucurestiului.ro. Răspunsul vine în zilele de lucru, adică de luni până vineri. Intervalul orar, separat, este 10:00–15:00.',
        'Vârsta primită este 6–14 ani. Un elev plătește 25 de lei. Cadrul didactic care însoțește grupul intră gratuit. Cifra de telefon de pe afișul școlii este acoperită, așa că nu o născocim.',
        'Felul textului: nonliterar. Nu este literar. Nu este descriptiv-literar. Nu este dialogat. Scopul este informarea, nu convingerea, râsul sau impresia.',
        'Tema: un program despre microscop. Vorbește și despre lumea nevăzută anume a microbilor. Informația o dă muzeul. Se adresează elevilor și profesorilor, nu doar părinților.',
        'Data, taxa și vârsta stau anume ca o listă. Nu stau ca o povestire. De aceea organizarea este discontinuă.'
      ].join('\n\n'),
      example: [
        'Ce: Descoperiri la microscop, 60 de minute. Mărirea ajunge la 600.000 de ori anume. Unde: Muzeul Victor Babeș.',
        'Când: întâi 24 februarie–7 martie, apoi 8–22 martie. Cadrul este Școala Altfel 2019–2020. Cum: mesaj la adresa muzeului, în zilele de lucru. Cost: 25 de lei de elev. Profesorul însoțitor nu plătește.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un târg de produse al școlii, scris tot ca anunț, răspunde la aceleași patru întrebări și poate avea o imagine lângă text. Un număr de telefon nu se născocește.'
        }
      ],
      tryThis: 'Fă un tabel cu Ce, Unde, Când și Cum pentru programul din lecție. Spune dacă textul este literar ori nonliterar. Spune scopul, cine informează și cui se adresează. Spune de ce este discontinuu.\n\nScrie apoi un anunț pentru un târg de produse al școlii, cu cele patru întrebări și cu o propoziție despre imagine. Nu inventa un telefon.',
      keyPoints: [
        'Anunțul este nonliterar și, pus în listă, discontinuu. Cere patru răspunsuri: ce, unde, când, cum.',
        'Descoperiri la microscop ține 60 de minute, la Muzeul Victor Babeș, în Școala Altfel 2019–2020.',
        'Elevul plătește 25 de lei. Profesorul însoțitor intră gratuit. Telefonul acoperit nu se inventează.'
      ]
    }),
    lesson({
      id: 'text-oral',
      title: 'Repetare, reformulare, fapt și opinie',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Trei legături',
          text: 'Ca un text spus să se înțeleagă, enunțurile se prind prin clasificare, prin reluare și prin reformulare. Faptul se poate verifica. Părerea nu.'
        }
      ],
      theory: [
        'Reluarea ia din nou un cuvânt sau o structură. Modelul sună așa: Perseverența este cheia succesului. Reluarea, pusă aparte: Jack a înțeles că perseverența este cheia succesului anume.',
        'Reformularea păstrează înțelesul și schimbă haina. Prima formă, singură: Părinții l-au dat pe Jack la cursul de matematică. A doua formă, cu alt început, tot singură: Jack a fost dat de părinți la cursul de matematică.',
        'Încă o pereche, cu același conținut. Întâi, singur: Orașul Iași este apreciat de turiști pentru obiectivele sale culturale. Apoi, așezat altfel și tot singur: Cultura orașului Iași, dată de obiectivele sale, este apreciată de turiști anume.',
        'Conectorii pragmatici leagă sensul anume. Într-adevăr confirmă. Pentru că explică. La fel face de aceea. Deși face o concesie. La fel face în ciuda.',
        'Dar arată că nu ești de acord. La fel face însă. Deci trage concluzia. La fel face așadar. De fapt limpezește. La fel face mai bine.',
        'Un fapt se poate controla. Exemplul de aici, singur: Bunicul lui Jack a urmat Facultatea de Medicină și a devenit medic.',
        'O opinie este ce crede cineva și nu se dovedește la fel. Exemplul de aici, tot singur: Cred că părinții lui Jack au procedat bine.',
        'Despre Jack păstrăm numai cinci lucruri, fiecare pe rând. Este băiatul. La matematică anume nu se descurca. Părinții l-au înscris anume la un curs. Tatăl i-a spus anume că perseverența este cheia succesului. Bunicul a anume devenit medic. Orice alt amănunt se lasă deoparte.',
        'Trei reformulări, despărțite. Școala a fost renovată de curând se poate spune și, cu alt început, De curând, cineva a renovat școala. Urmează alt enunț.',
        'Este permis să pui întrebări după eveniment se poate spune și, tot cu alt început, După eveniment ai voie să pui întrebări. Urmează încă unul.',
        'Cei care au de câștigat în urma școlii de vară sunt copiii se poate spune și, cu subiectul mutat, Copiii au de câștigat de pe urma școlii de vară.',
        'Povestirea orală notează unde, când și cine. Apoi ce urmează, în ordine. Apoi cum se încheie și ce mesaj rămâne.',
        'La scris rămâi singur cu foaia. La oral mai ai o voce. Asta este o părere legată de un fapt deja spus: probele sunt de două feluri.'
      ].join('\n\n'),
      example: [
        'Reluarea păstrează structura despre perseverență. Reformularea despre curs schimbă doar așezarea.',
        'Faptul: bunicul a ajuns medic. Părerea: cred că părinții au ales bine. Într-adevăr confirmă anume. Pentru că explică. Deși cedează. Dar opune. Deci încheie. De fapt limpezește.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Fapt despre evaluări: există o probă scrisă și una orală. Părere: proba orală îți mai lasă o voce. Prima se verifică. A doua rămâne o credință.'
        }
      ],
      tryThis: 'În patru sau cinci fraze, povestește o prezentare de cărți și reia o structură. Dialog de șase replici cu un coleg din altă țară: dar, deși, de fapt, pentru că, într-adevăr, fiecare o dată.\n\nReformulează cele trei enunțuri. Despre evaluări, un fapt și o părere. Trei fapte bune de-ale tale, două ale colegilor, o părere despre voluntariat. Opt până la zece rânduri cu un glob, o carte și un copil.',
      keyPoints: [
        'Reluarea ia din nou o structură. Reformularea schimbă haina și păstrează înțelesul.',
        'Faptul se verifică. Părerea rămâne o credință. La Jack nu se adaugă amănunte din afara listei.',
        'Într-adevăr confirmă, pentru că explică, deși cedează, dar opune, deci încheie, de fapt limpezește.'
      ]
    }),
    lesson({
      id: 'fraza',
      title: 'Propoziții principale legate prin virgulă sau prin conector',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Frază',
          text: 'Fraza este un enunț cu mai multe propoziții legate între ele. Cere măcar o propoziție care are sens singură. Câte predicate numeri, atâtea propoziții ai.'
        }
      ],
      theory: [
        'O propoziție comunică ceva și are un singur predicat. Enunțul poate fi dintr-una sau din mai multe. Dacă are una, este simplu. Dacă are măcar două, este complex.',
        'După scop, enunțul poate constata, poate întreba, poate exclama sau poate porunci. Numele sunt asertiv, interogativ, exclamativ și imperativ.',
        'Principala se înțelege singură. Secundara atârnă de altceva. Perechea scurtă se taie așa: Trebuie / să merg la școală. Prima bucată este principală. A doua este secundară.',
        'Coordonarea unește propoziții de același rang. Juxtapunerea le pune una lângă alta. Semnul poate fi virgula. Poate fi și punctul cu virgulă. Conectorul lipsește.',
        'Joncțiunea le prinde cu un conector. Lista, pe grupe scurte: și cu dar. Iar cu însă. Ci cu nici. Apoi or cu ori. Sau cu fie. La urmă deci și așadar.',
        'Analiza are cinci mișcări. Citești textul. Subliniezi predicatele. Marchezi conectorul sau semnul. Pui numere. Spui felul și raportul.',
        'Fraza de lucru, pe scheletul exemplului cu dulăul, stă singură: Rex, dulăul, apare din curte, se gudură și sare pe mine.',
        'Apare deschide prima propoziție. Virgula dinainte de se gudură este juxtapunere. Se gudură deschide a doua. Și deschide joncțiunea către a treia. Predicatul ei este sare. Toate trei sunt principale.',
        'Schema sună așa: principală, apoi juxtapunere, apoi principală, apoi joncțiune, apoi principală.',
        'În enunțul, luat singur, Știe ce a învățat la școală, dar nu vrea să spună stau ambele ranguri. Se bifează c. Știe anume este principală. Ce a învățat la școală anume este secundară. Dar leagă prin joncțiune altă principală, nu vrea. Să spună atârnă de vrea, deci este secundară.',
        'În enunțul, luat singur, A câștigat concursul, deci va merge în tabără anume raportul este coordonare prin anume joncțiune, fiindcă deci este conector. Se bifează b. Nu este juxtapunere. Nu este nici subordonare.',
        'În enunțul, luat singur, Umblam, răsfoiam cărți vechi, ne uitam la poze legătura este doar juxtapunere, prin virgule, fără anume conector. Se bifează b. Subordonarea, în bucata anume aceasta, se vede numai în perechea cu trebuie.'
      ].join('\n\n'),
      example: [
        'La Rex predicatele sunt apare, se gudură și sare. Virgula alătură. Și face joncțiunea. Rangul tuturor este de principală.',
        'Fraza cu știe amestecă rangurile, litera c. Fraza cu deci este joncțiune, litera b. Fraza cu umblam este juxtapunere, litera b.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Trebuie se înțelege singur, deci este principală. Să merg la școală nu se înțelege singur, deci este secundară. Subordonarea nu se lungește înainte de lecția ei.'
        }
      ],
      practice: [
        '1) La Rex, numește predicatele și schema.',
        '2) La Știe ce a învățat la școală, dar nu vrea să spună: numai principale, numai secundare sau ambele? Litera? Care propoziții sunt secundare?',
        '3) La A câștigat concursul, deci va merge în tabără: juxtapunere, joncțiune sau subordonare? Litera?',
        '4) La Umblam, răsfoiam cărți vechi, ne uitam la poze: joncțiune, juxtapunere sau ambele? În Trebuie / să merg la școală, care bucată este principală?'
      ].join('\n\n'),
      answers: [
        'apare, se gudură, sare; principală, juxtapunere, principală, joncțiune, principală',
        'ambele, litera c; ce a învățat la școală și să spună',
        'joncțiune, litera b',
        'numai juxtapunere, litera b; Trebuie'
      ],
      mistakes: 'Virgula fără conector nu se numește joncțiune. Deși deci leagă, raportul nu este subordonare. O secundară nu devine principală doar pentru că stă în frază.',
      tryThis: 'Analizează fraza cu Rex: subliniază predicatele, numerotează propozițiile și scrie schema. Apoi alege litera la cele trei întrebări.',
      keyPoints: [
        'Numărul predicatelor dă numărul propozițiilor. Fraza cere măcar o principală.',
        'Alăturarea fără conector este juxtapunere. Legătura prin și, dar sau deci este joncțiune.',
        'La Rex, cele trei propoziții sunt principale: virgula alătură, iar și face joncțiunea.'
      ]
    }),
    lesson({
      id: 'conjunctia',
      title: 'Conjuncția coordonatoare și virgula',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Unde stă virgula',
          text: 'Pui virgulă înaintea unei adversative sau concluzive care deschide propoziția următoare. Nu o pui înaintea unui și singur, nici înaintea unui sau singur.'
        }
      ],
      theory: [
        'Conjuncția nu se schimbă. Leagă părți de același fel, cum sunt subiectele, numele predicative, atributele ori complementele. Poate lega și propoziții.',
        'Cea simplă are un termen: și, dar, ci, ori sau sau. Cea compusă are mai mulți: ca să, fiindcă, așadar.',
        'Coordonatoarele unesc lucruri de același rang. Copulative: și, nici. Adversative: dar, iar, însă, ci, or. Disjunctive: ori, sau, fie. Concluzive: deci, așadar.',
        'Model de părți, singur: Ioana și Maria ascultă explicațiile. Aici și unește două subiecte. Sunt părți, nu două propoziții.',
        'Model de propoziții, singur: În timpul liber citesc sau mă plimb. Aici sau unește două propoziții.',
        'Model amestecat, singur: Îmi place și marea, dar prefer muntele. Aici și unește substantive. Dar unește propoziții.',
        'Virgula este obligatorie când adversativa deschide propoziția următoare. Model, singur: L-am așteptat, dar nu a venit.',
        'Când însă și deci stau în interior, nu le izolezi. Un model, singur: Nu știu ce s-a întâmplat, voi afla însă de la colegi. Alt model, tot singur: Am studiat deci până târziu anume.',
        'La perechile și… și, virgula stă înaintea celei de-a doua. La fel la sau… sau. Punctul cu virgulă marchează juxtapunerea.',
        'Completarea cu și, fără virgulă în față, fiindcă stă singur. Enunțul, singur: Toamna a venit cu alaiul ei de frunze și aduce vremea tristă.',
        'Cu virgulă înainte de concluzivă. Enunțul stă separat. Vacanța s-a terminat, deci mergem la școală.',
        'Fără virgulă înainte de sau. Enunțul, singur: În pauză discutăm sau ne plimbăm prin curtea școlii.',
        'Încă trei completări, fiecare cu virgulă înainte. Întâi: Am fost atentă la ore, însă am câteva neclarități. Apoi: Mi-am pregătit temele, așadar îmi pot face ghiozdanul. Apoi: Este soare afară, dar prefer să stau în casă pentru a citi.',
        'Îndreptări: nu pui virgulă după deci la început. O pui înainte de iar, de așadar și de însă. Nu o pui și după însă.'
      ].join('\n\n'),
      example: [
        'Ioana și Maria sunt două subiecte prinse cu și. Separat, citesc sau mă plimb sunt două propoziții prinse cu sau.',
        'Înainte de deci stă virgula. După deci, la început de enunț, cade. Înainte de și singur cade.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Deci, voi pleca în tabără mută virgula după concluzivă. Forma bună o lipește de propoziție. Însă care deschide propoziția primește virgula doar în față.'
        }
      ],
      practice: [
        '1) Completează cu și, deci sau sau, și spune unde stă virgula: frunze … vremea tristă; vacanța … la școală; în pauză … prin curte.',
        '2) Completează cu însă, așadar sau dar: la ore … neclarități; temele … ghiozdanul; soare … în casă pentru a citi.',
        '3) De ce un și singur și un sau singur nu cer virgulă, iar deci, însă, așadar și dar o cer când deschid propoziția următoare?',
        '4) Corectează virgula: Deci, voi pleca în tabără. Apoi enunțul cu iar fără virgulă. Apoi enunțul cu așadar fără virgulă. Apoi însă pus și după, nu doar înainte.'
      ].join('\n\n'),
      answers: [
        'și, fără virgulă în față',
        'deci, cu virgulă înainte; sau, fără virgulă; însă, cu virgulă înainte',
        'așadar; dar; fiindcă stau singure și nu deschid o adversativă sau o concluzivă',
        'Deci voi pleca în tabără. Separat: Toamna a sosit devreme anul acesta, iar ploile au început. Separat: Am terminat de citit cartea, așadar o voi duce la bibliotecă. Separat: Azi am renunțat la planurile mele, însă în viitor știu ce am de făcut.'
      ],
      mistakes: 'Nu lăsa virgulă după deci când el deschide enunțul. Nu încadra însă cu virgule. Nu pune virgulă înaintea unui și care stă singur.',
      tryThis: 'Scrie cele șase enunțuri cu conectorul potrivit. Îndreaptă cele patru forme. Adaugă două alăturări și trei conjuncții diferite.',
      keyPoints: [
        'Coordonatoarele sunt de patru feluri: copulative, adversative, disjunctive și concluzive.',
        'Și și nici adună. Dar, iar, însă, ci și or opun. Ori, sau și fie despart. Deci și așadar încheie.',
        'Virgula precedă adversativa și concluziva care deschid propoziția următoare, nu un și lăsat singur.'
      ]
    }),
    lesson({
      id: 'vocabular-context',
      title: 'Sensul se vede din context',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Lexic',
          text: 'Vocabularul, numit și lexic, adună toate cuvintele unei limbi. Înțelesul unui cuvânt se hotărăște abia în context.'
        }
      ],
      theory: [
        'Dacă un cuvânt are un singur sens, este monosemantic. Dacă are mai multe, este polisemantic.',
        'Sensul propriu este cel de toate zilele. Cel de bază rămâne oriunde contextul i se potrivește. Modelul, singur: Pasărea s-a rănit la aripă.',
        'Cel propriu secundar se naște dintr-o asemănare. Modelul, singur: Aripa avionului este mare. Cel figurat este neobișnuit și are valoare expresivă. Modelul, singur: Copiii sunt aripile părinților.',
        'Din șirul dat, un singur sens au șurubul, cercul, eprubeta și microscopul. Mai multe sensuri au floarea, planta, rece și nuca. Șirul întreg, ca să îl recunoști: floare, șurub, cerc, apoi eprubetă, microscop, apoi plantă, rece, nucă.',
        'Potriviri, una câte una. Țările au intrat în război: aici război înseamnă conflict. Alt enunț, singur: Ea este o stea de cinema. Aici stea înseamnă star.',
        'Alt enunț, singur: Are multă carte. Aici carte înseamnă învățătură. Alt enunț, singur: Bătrâna trece strada. Aici trece înseamnă traversează.',
        'La fereastră, sensul propriu este geamul camerei. Cel figurat este o deschidere către ceva. Modelul figurat, singur: Cartea este o fereastră.',
        'La oglindă, sensul propriu este anume obiectul în care te vezi. Cel figurat arată o stare. Modelul, singur: Ochii sunt o oglindă.',
        'La mână, sensul propriu este partea trupului. Cel figurat este ajutorul. Modelul, singur: Mi-a dat o mână de ajutor.',
        'La dinți, sensul propriu stă în gură. Cel figurat este ascuțișul. Modelul, singur: Dinții ferăstrăului.',
        'Pentru textul de 80–100 de cuvinte, pădure poate numi o mulțime deasă, nu anume doar copacii. Spini pot numi greutăți. Umeri pot numi sprijinul cuiva.',
        'A arde anume poate însemna a dori tare. A plânge anume poate însemna ploaie măruntă. Poate însemna și că un lucru pare anume trist, nu doar că un om varsă anume lacrimi.'
      ].join('\n\n'),
      example: [
        'Un singur sens: șurub, cerc, eprubetă, microscop. Mai multe: floare, plantă, rece, nucă.',
        'Aripă la pasăre este sens propriu de bază. Separat, aripa avionului este sens propriu secundar. Separat, copiii ca aripi sunt sens figurat. Război înseamnă conflict. Stea anume de cinema înseamnă star.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'O pădure de întrebări nu numește copaci. Spinii unui drum pot fi greutăți. Umerii pe care te sprijini pot fi un om. A arde de nerăbdare înseamnă a dori tare. Cerul plânge poate însemna o ploaie măruntă.'
        }
      ],
      practice: [
        '1) Din șirul floare, șurub, cerc, apoi eprubetă și microscop, apoi plantă, rece, nucă, care patru au un singur sens?',
        '2) Cu ce se potrivesc, pe rând, război, stea de cinema, multă carte și trece strada?',
        '3) Ce fel de sens au, fiecare singur, Pasărea s-a rănit la aripă, apoi Aripa avionului este mare, apoi Copiii sunt aripile părinților?',
        '4) Ce sens figurat au, în lecție, pădure, apoi spini, apoi umeri, apoi a arde și a plânge?'
      ].join('\n\n'),
      answers: [
        'șurub, cerc, eprubetă, microscop',
        'conflict; star; învățătură; traversează',
        'propriu de bază; propriu secundar; figurat',
        'mulțime deasă; greutăți; sprijin; a dori tare; ploaie măruntă sau tristețea unui lucru'
      ],
      mistakes: 'Aripa avionului nu este sens figurat: rămâne o asemănare cu aripa păsării, deci sens propriu secundar. Un cuvânt cu un singur sens nu primește al doilea doar ca să iasă exercițiul.',
      tryThis: 'Fă câte un enunț cu floare, cu plantă, cu rece și cu nucă, în câte două sensuri. Pentru fereastră, oglindă, mână și dinți scrie un enunț cu sens anume propriu și unul cu sens figurat.\n\nApoi un text de 80–100 de cuvinte cu cele cinci sensuri figurate din lecție.',
      keyPoints: [
        'Contextul fixează sensul: propriu de bază, propriu născut din asemănare sau figurat.',
        'Șurub, cerc, eprubetă și microscop au un singur sens. Floare, plantă, rece și nucă au mai multe.',
        'Război înseamnă conflict. Stea anume de cinema înseamnă star. Multă carte înseamnă anume învățătură. Trece strada înseamnă traversează.'
      ]
    }),
    lesson({
      id: 'pleonasm',
      title: 'Sinonime, omonime și termenul de prisos',
      kind: 'limba',
      boxes: [
        {
          type: 'atentie',
          title: 'Termen de prisos',
          text: 'Pleonasmul alătură doi termeni cu sens egal sau foarte apropiat. Al doilea nu aduce o veste nouă. Unele alăturări din literatură sunt voite: întăresc ideea.'
        }
      ],
      theory: [
        'Sinonimele diferă la formă și se apropie la sens, în aceeași clasă. Contextul le alege. Uriaș stă lângă enorm. Antonimele au sens opus. Înalt se opune lui scund.',
        'În context, la voce, caldă se apropie de blândă. La poveste, inedită se apropie de nouă. Respect se apropie de stimă. Teamă se apropie de frică.',
        'Omonimele țin forma și despart sensurile. Verb, enunț aparte: Duce geanta. Titlu, enunț aparte: Ducele a intrat în sală. Pădure, enunț aparte: Codul este de nepătruns. Reguli, enunț aparte: Codul școlii este scurt.',
        'Pieptănătura, enunț aparte: Și-a făcut un coc. Document, enunț aparte: Actul este semnat. Faptă, enunț aparte: Actul lui a fost curajos.',
        'Uniformă, enunț aparte: Când merg la școală, eu port uniforma. Port, enunț aparte: În port sunt multe vapoare. Dans, enunț aparte: Îmi place dansul popular românesc.',
        'Peniță, enunț aparte: Înainte se scria cu penița. Pană, enunț aparte: Tata are pană la mașină. Cutie, enunț aparte: A pus ochelarii în toc. Călcâi, enunț aparte: Pantofii au un toc înalt. Bucătărie, enunț aparte: Eu toc zarzavatul pentru ciorbă.',
        'Cuvintele care se aud la fel și se scriu altfel sunt omofone. Pronume: Ea vine. Luare: Ia cartea. Grup: Ele vin. Basm: Ielele dansează.',
        'Omografele păstrează literele și schimbă apăsarea. Háină, pe a, este paltonul. Haínă, pe i, înseamnă rea. Fórmă, pe for, este înfățișarea. Pe ă, cuvântul este verb: el dă o formă.',
        'Tórturi, pe tor, sunt prăjituri. Tortúri, pe tu, sunt nedreptăți. Isprăvi pe pră sunt fapte gata. Pe vi, același cuvânt înseamnă a termina.',
        'Într-o poezie știută, coborârea se întărește printr-un cuvânt care arată direcția în jos. Versul nu se copiază. Anul 1887: Vincent van Gogh pictează Autoportret.',
        'Îndreptări: scoți înainte, vieții, în două și diversificată. Limonada de lămâie, aversele de ploaie și a survolat peste dublează un sens deja aflat în cuvânt. A avansa, biografia, a se bifurca, gama și a survola spun deja acel sens.',
        'Pleonasme, pe rând: autoportretul propriu. Rezumatul pe scurt. Ceremonia solemnă. Amploarea mare.',
        'Nu sunt pleonasme, pe rând: A scris cel mai bine dintre toți. Apoi A învățat din propriile greșeli. Separat, am auzit cu urechile mele este o dublare de vorbire, uneori păstrată ca întărire.'
      ].join('\n\n'),
      example: [
        'Voce caldă se apropie de blândă. Autoportretul propriu este pleonasm. Háină este palton, haínă înseamnă rea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ajung biografiile scriitorilor, drumul care se bifurcă și gama de produse. Tabloul Autoportret este din 1887. Numele lui este de ajuns.'
        }
      ],
      practice: [
        '1) Dă sinonimul de context pentru voce caldă, pentru poveste inedită, pentru respect și pentru teamă.',
        '2) Unește antonimele, pe perechi: copil, a urca, puternic, îndrăzneț, fericit și leneș.',
        '3) Scoate termenul de prisos din A avansat înainte destul de repede, din biografiile vieții, din Drumul se bifurcă în două și din gama diversificată.',
        '4) Care dintre autoportretul propriu, cel mai bine, rezumatul pe scurt, propriile greșeli, ceremonia solemnă și amploarea mare sunt pleonasme? În ce an a pictat van Gogh Autoportret?'
      ].join('\n\n'),
      answers: [
        'blândă; nouă; stimă; frică',
        'adult, a coborî, slab, timid, trist, harnic',
        'A avansat destul de repede. Am citit biografii ale scriitorilor români. Drumul se bifurcă. O gamă de produse.',
        'autoportretul propriu, rezumatul pe scurt, ceremonia solemnă, amploarea mare; 1887'
      ],
      mistakes: 'Cel mai bine nu este pleonasm. Nici propriile greșeli. Háină și haínă își schimbă sensul prin apăsare.',
      tryThis: 'Enunțuri pentru port, dans, peniță, pană și pentru cele trei sensuri ale lui toc. Arată apăsarea la haină, formă, torturi și isprăvi.',
      keyPoints: [
        'Sinonimele se apropie, antonimele se opun, omonimele au o formă și sensuri nelegate.',
        'Pleonasmul dublează sensul. Autoportretul propriu este de prisos. Tabloul Autoportret este din 1887.'
      ]
    })
  ]
};
