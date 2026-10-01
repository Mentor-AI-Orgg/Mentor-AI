'use strict';
const { romanaLesson } = require('../lessonBuilder');
function lesson(f){return romanaLesson(f);}
module.exports = {
  id: 'taramul-prieteniei',
  title: 'Pe tărâmul prieteniei',
  inOwnWords: 'Unitatea 2 leagă prietenia de proză narativă la persoana a III-a. Lucrezi momentele subiectului, dialogul, parafraza, rezumatul și trecerea la vorbirea indirectă. La verb deosebești predicativul de auxiliar, apoi conjunctivul, condițional-optativul și predicatul nominal. O valoare vine din cultura populară. Scenele stau în lecții. Constantin Chiriță și Cireșarii pot apărea la deschidere, iar titlul de la clasă poate fi altul. Închiderea este proiectul despre o prietenie cunoscută.',
  toc: [
    'Harta unității',
    'Narațiunea la persoana a III-a',
    'Momentele subiectului',
    'Dialogul în textul literar',
    'Parafraza și informația implicită',
    'Rezumatul',
    'Vorbirea directă și indirectă',
    'Verbul predicativ și auxiliar',
    'Conjunctivul',
    'Condițional-optativul',
    'Predicatul nominal',
    'Valori în cultura populară',
    'Proiect: Mari prietenii',
    'Recapitularea unității'
  ],
  glossary: [
    {
      term: 'persoana a III-a',
      meaning: 'Naratorul observă fapta și nu spune eu.'
    },
    {
      term: 'rezumat',
      meaning: 'Spui pe scurt cine, ce face și când, cu cuvintele tale, în ordine.'
    },
    {
      term: 'copulă',
      meaning: 'Verbul a fi când leagă subiectul de un nume, ca în Ana este prietena mea.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-prietenie',
      title: 'Ce vei lucra despre prietenie',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Harta unității',
        text: 'Drumul începe cu o hartă. Narațiunea stă la persoana a III-a. Urmează momentele, dialogul, parafraza, rezumatul, verbul și o valoare.'
      }],
      theory: [
        'Unitatea Pe tărâmul prieteniei se deschide cu harta, nu cu un text gata comentat. Harta îți arată, în ordine, ce citești și ce exersezi.',
        'Lectura este de proză narativă. Povestitorul rămâne la persoana a III-a, în afara faptei. Vei pune nume momentelor subiectului și vei deschide dialogul.',
        'La scris spui o bucată cu vorbele tale, strângi un rezumat și muți o replică din vorbire directă în vorbire indirectă.',
        'La verb deosebești forma predicativă de auxiliar. Apoi recunoști conjunctivul, condițional-optativul și predicatul nominal față de cel verbal.',
        'Închiderea de conținut caută o valoare în cultura populară. Competențele vizate sunt douăsprezece. Ele fixează ținta unității, nu douăsprezece lecții separate.',
        'Codurile se împart în grupe. Întâi stau 1.1 și 1.4. Apoi vin 2.1, 2.2, 2.3 și 2.4. Urmează 3.1 și 3.3. La urmă stau 4.1, 4.2, 4.3 și 4.4.',
        'Anii lui Constantin Chiriță sunt 1925–1991. Proza lui se adresează adolescenților. Titlul de care ții seama aici este Cireșarii.',
        'În carte îi poți întâlni pe Tic și pe câinele Țombi. Mai apar Dan, Lucia și Maria. Grupul îi cuprinde și pe Ionel, pe Ursu și pe Victor.',
        'Ca să răspunzi, nu îți trebuie o bucată deschisă din volum. La clasă, textul așezat pe bancă poate purta un alt titlu. Ordinea pașilor rămâne aceeași.',
        'Harta nu ține loc de exercițiu. Ea așază temele, ca să recunoști sarcina când o întâlnești. Numele din Cireșarii rămân repere, iar Țombi rămâne câinele.'
      ].join('\n\n'),
      example: [
        'Pe hartă stau persoana a III-a, momentele, dialogul, rezumatul și lucrul la verb. Volumul Cireșarii este al lui Constantin Chiriță. Țombi e câinele din grup.',
        'Douăsprezece competențe fixează ținta întregii unități. Niciun cod, luat singur, nu închide o lecție.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă pe bancă stă alt titlu, repeți aceeași ordine: citești, numeri momentele, lucrezi dialogul. Numele din Cireșarii rămân repere, nu o scenă de copiat.'
      }],
      tryThis: [
        'Fă două enunțuri. Primul spune că prietenia este tema și că lucrul de azi este narațiunea la persoana a III-a.',
        'Al doilea enunț enumeră codurile și spune că sunt douăsprezece: 1.1 cu 1.4, grupul de la 2.1 la 2.4, apoi 3.1 și 3.3, la urmă 4.1, 4.2, 4.3 și 4.4.',
        'Mai notează anii 1925 și 1991, titlul Cireșarii și faptul că Țombi este câinele.'
      ].join('\n\n'),
      keyPoints: [
        'Harta leagă persoana a III-a de momente, de dialog, de parafrază, de rezumat și de verb.',
        'Sunt douăsprezece coduri: 1.1, 1.4, seria 2, apoi 3.1, 3.3 și seria 4.',
        'Chiriță a trăit din 1925 până în 1991 și a scris Cireșarii. Țombi este câinele. Titlul de la clasă poate diferi.'
      ]
    }),
    lesson({
      id: 'persoana-trei',
      title: 'Naratorul care nu spune eu',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Persoana a III-a',
        text: 'Naratorul este obiectiv. Privește fapta din afară, nu spune eu și nu este eroul principal.'
      }],
      theory: [
        'La persoana a III-a, povestitorul rămâne un observator. Notează ce li se întâmplă oamenilor din scenă și nu pășește în întâmplare.',
        'Nu folosește eu. Nu se pune pe sine în rolul celui mai important. El vede, iar ceilalți fac.',
        'Schema are trei piese. Fapta se petrece într-un timp și într-un loc. Naratorul povestește. Personajele iau parte.',
        'Scena de lucru: într-o sâmbătă, dis-de-dimineață, în parc, Radu dă peste o minge aflată sub o bancă.',
        'Lia se apropie și îl întreabă dacă mingea îi aparține. Radu i-o dă. Povestitorul nu spune eu. El doar înregistrează gesturile lor.',
        'Din scenă faci trei pași. Întâi spui ce stă scris. Apoi spui ce observi. La urmă spui ce ai face tu, legat cu pentru că.',
        'Pasul din mijloc începe cu Îi văd, ca să arăți că tu privești, iar naratorul rămâne în afară.',
        'Dacă în text apare eu ca voce care trăiește fapta, nu mai ești la persoana a III-a. Aici eu lipsește, deci persoana se păstrează.',
        'Obiectiv înseamnă că naratorul nu își amestecă voința în gestul lui Radu. El lasă fapta să se vadă.',
        'Aceiași trei pași se aplică și pe o scenă nouă, cu alte obiecte, dacă povestitorul tot nu spune eu.'
      ].join('\n\n'),
      example: [
        'Ce scrie: sâmbătă dimineața, în parc, Radu găsește mingea sub bancă, Lia întreabă al cui este obiectul, iar el i-l înmânează.',
        'Ce vezi: Îi văd lângă bancă pe Radu, împreună cu Lia, mingea stând între ei. Aș fi înapoiat mingea, pentru că întrebarea Liei a fost al cui este, iar Radu a oferit-o. Vocea tace pe eu, deci stă la persoana a III-a.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă textul ar începe cu Am găsit mingea, vocea ar intra în faptă. Formularea Radu a găsit mingea lasă povestitorul în afară.'
      }],
      tryThis: [
        'Marți, în curtea școlii, Lia găsește un caiet albastru. Radu îi spune că este al lui. Lia îi înapoiază caietul. Vocea nu folosește eu.',
        'Alcătuiește trei enunțuri: ce stă scris, ce observi, apoi ce ai alege tu. Motivul îl legi cu pentru că. Rândul din mijloc începe cu Îi văd. Arată de ce povestitorul este la persoana a III-a.'
      ].join('\n\n'),
      keyPoints: [
        'Naratorul obiectiv vede fapta și nu ia parte la ea. Eu lipsește, iar el nu este eroul.',
        'Fapta are timp și loc, povestitorul relatează, personajele acționează.',
        'Din scenă spui ce stă scris, ce observi și ce ai face, cu pentru că. Observația începe cu Îi văd.'
      ]
    }),
    lesson({
      id: 'momente-subiect',
      title: 'Cinci momente ale acțiunii',
      kind: 'lectura',
      boxes: [{
        type: 'regula',
        title: 'Cinci momente',
        text: 'Subiectul are situație inițială, șirul întâmplărilor și situație finală. Momentele sunt cinci: expozițiune, intrigă, desfășurare, punct culminant, deznodământ.'
      }],
      theory: [
        'Expozițiunea așază cine ia parte, unde se petrece fapta și când. Este cadrul, înainte de încurcătură.',
        'Intriga este faptul care pornește încurcătura. Fără ea, întâmplarea ar rămâne liniștită.',
        'Desfășurarea este bucata cea mai lungă. Ține ordinea timpului: un gest după altul, până crește tensiunea.',
        'Punctul culminant adună clipa în care tensiunea ajunge la vârf. Deznodământul pune capăt întâmplării și lasă lucrurile așezate.',
        'Scena cade într-o duminică. Locul este curtea școlii. Ana și Vlad joacă liniștiți, având o minge.',
        'Mingea zboară peste gard și cade în grădina de alături. Cei doi caută o scară, bat la poartă și așteaptă.',
        'Vecinul deschide poarta tocmai când se aude clopoțelul. Ana și Vlad iau mingea și mulțumesc.',
        'Jocul liniștit de duminică este expozițiunea. Mingea dincolo de gard este intriga. Căutarea scării și așteptarea sunt desfășurarea.',
        'Poarta deschisă odată cu clopoțelul este punctul culminant. Mingea recuperată și mulțumirea sunt deznodământul.',
        'Poți schimba doar finalul, dacă păstrezi persoana a III-a. Faptele de până la poartă rămân ale scenei.',
        'Cele trei părți mari rămân situația de la început, șirul faptelor și situația de la sfârșit. Cele cinci momente stau înăuntrul lor și se spun în ordine.',
        'Când scrii finalul nou, expozițiunea și intriga rămân. Schimbi doar calea de după așteptare, văzută din afară, fără eu. Opt până la zece rânduri ajung.'
      ].join('\n\n'),
      example: [
        'Ce scrie: duminică, în curte, Ana și Vlad joacă mingea, mingea sare gardul, ei așteaptă, vecinul deschide la clopoțel, iar ei mulțumesc.',
        'Ce vezi: Îi văd la gard pe Ana, alături de Vlad, mingea stând în grădina de alături. Aș fi bătut la poartă, pentru că mingea ajunsese dincolo. Cele cinci momente urmează ordinea de mai sus.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă vecinul nu deschide, deznodământul se mută. Intriga rămâne mingea peste gard. Se schimbă doar calea prin care mingea se întoarce.'
      }],
      tryThis: [
        'Pe scena mingii, scrie cele cinci momente, de la expozițiune până la deznodământ.',
        'Apoi compune un alt sfârșit, de opt până la zece rânduri. Poarta rămâne închisă, iar Ana și Vlad aleg o cale nouă. Păstrează persoana a III-a.'
      ].join('\n\n'),
      keyPoints: [
        'Expozițiunea dă cine, unde și când. Intriga aprinde încurcătura. Desfășurarea este partea cea mai lungă.',
        'Punctul culminant adună tensiunea maximă. Deznodământul închide fapta.',
        'La mingea din curte, gardul este intriga, iar clopoțelul cade în punctul culminant.'
      ]
    }),
    lesson({
      id: 'dialog-literar',
      title: 'Dialogul din povestire',
      kind: 'lectura',
      boxes: [{
        type: 'definitie',
        title: 'Dialog',
        text: 'Este schimbul de vorbe între minimum două persoane. Cel care trimite mesajul este emițătorul. Cel care îl primește este receptorul. Apoi rolurile se inversează.'
      }],
      theory: [
        'Canalul verbal folosește cuvinte. Canalul nonverbal folosește gestul, privirea și fața. Canalul paraverbal folosește tonul, viteza și pauza.',
        'În textul literar, linia de dialog deschide fiecare replică. Fără ea, cititorul nu vede unde începe vorba nouă.',
        'Dialogul dă dinamism. Arată omul prin felul în care vorbește și arată și ce nu spune de-a dreptul.',
        'Mai arată legătura dintre oameni. Poate duce o emoție, poate tăia vorba sau poate lăsa o ezitare.',
        'O întrebare își pune la capăt semnul întrebării. O emoție puternică își pune la capăt semnul exclamării.',
        'Scena sticlei: Ana întreabă dacă sticla a fost uitată. Vlad confirmă scurt. Ana îl îndeamnă să bea din sticla ei și i-o întinde. Vlad mulțumește, cu glasul mai jos.',
        'În scris, replicile arată așa. — Ai uitat sticla? întreabă Ana. — Da, zice Vlad. — Bea din sticla mea! spune Ana și i-o întinde. — Îți mulțumesc, răspunde Vlad, cu vocea mai joasă.',
        'Sticla întinsă este gest, deci nonverbal. Glasul coborât ține de paraverbal. Întrebarea poartă semnul întrebării, îndemnul poartă semnul exclamării.',
        'La prima replică, Ana este emițător, iar Vlad este receptor. La a doua, Vlad devine emițător, iar Ana ascultă.',
        'Un dialog de patru replici are nevoie de o întrebare, de un semn de exclamare și de un gest vizibil, de pildă un obiect întins.',
        'Rolurile nu stau fixe: cine a ascultat poate răspunde și devine, pentru o clipă, emițător.'
      ].join('\n\n'),
      example: [
        'Linia de dialog deschide fiecare vorbă despre sticlă. Gestul sticlei întinse este nonverbal. Vocea mai joasă este paraverbală.',
        'Ana pornește ca emițător. La replica următoare, rolul trece la Vlad. Semnele de întrebare și de exclamare rămân la locul lor.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă cineva întinde un caiet și tace o clipă înainte să vorbească, gestul este nonverbal, iar pauza este paraverbală. Cuvintele rămân canalul verbal.'
      }],
      tryThis: [
        'Compune patru replici despre un caiet lăsat în clasă. Linia de dialog deschide fiecare replică.',
        'Include o întrebare, o replică încheiată prin exclamație și un gest, cum ar fi caietul întins de cineva. Arată cine emite prima dată și cine preia rolul la replica următoare.'
      ].join('\n\n'),
      keyPoints: [
        'Dialogul schimbă rolul de emițător cu cel de receptor. Linia de dialog deschide replica.',
        'Cuvântul este verbal, gestul este nonverbal, tonul este paraverbal.',
        'Întrebarea își păstrează semnul întrebării. Emoția puternică își păstrează semnul exclamării.'
      ]
    }),
    lesson({
      id: 'parafraza',
      title: 'Cu cuvintele tale',
      kind: 'redactare',
      boxes: [{
        type: 'definitie',
        title: 'Parafrază și rezumat',
        text: 'Parafraza reia același înțeles cu vorbele tale. Poate lămuri un detaliu, așa că poate depăși lungimea de plecare. Rezumatul oprește doar ideea de bază.'
      }],
      theory: [
        'Explicit este ce stă scris de-a dreptul. Implicit este ce înțelegi din fapte, fără ca acele vorbe să fie puse în text.',
        'Un băiat avea un caiet, iar pe o foaie cleiul era uscat. Cleiul prinde numai dacă foaia este umedă.',
        'El umezește foaia, apasă o poză deasupra și lasă caietul la soare. A doua zi poza stă lipită.',
        'Textul spune că a lăsat caietul la soare. Nu spune scopul. Poți înțelege că voia ca lipitura să se usuce. Asta este informația implicită.',
        'Umezirea foii este explicită, pentru că este scrisă, și pentru că cleiul cere umezeală.',
        'O parafrază poate suna așa: băiatul a udat puțin foaia, a pus poza peste ea și a lăsat caietul în soare. A doua zi poza rămăsese lipită.',
        'Rezumatul se strânge într-o idee: un băiat a fixat o poză folosind clei uscat, după o umezire a foii.',
        'Pseudonimul lui Samuel Langhorne Clemens este Mark Twain. Prietenia lui cu Nikola Tesla este un fapt. A înregistrat trei brevete.',
        'Brevetul cu succes a fost un album: pozele se prindeau fără alt lipici umed. Cleiul era deja uscat, foaia se umezea înainte, iar vânzarea a trecut de 25.000 de exemplare.',
        'Un singur film îl arată, iar autorul peliculei este Thomas Edison. Pelicula a intrat în Prinț și sărman, anul fiind 1909.'
      ].join('\n\n'),
      example: [
        'Explicit: băiatul umezește foaia, fiindcă textul o spune și fiindcă cleiul cere umezeală. Implicit: soarele avea rostul să usuce lipitura, deși scopul nu este scris.',
        'Parafraza lungește puțin scena. Rezumatul o reduce la fixarea pozei. Mark Twain este numele sub care a scris Samuel Langhorne Clemens.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă scrii doar A lipit o poză, ai un rezumat. Dacă adaugi umezeala, soarele și a doua zi, ai o parafrază. Scopul soarelui rămâne implicit.'
      }],
      tryThis: [
        'Pe scena caietului, scrie o parafrază de patru propoziții, cu vorbele tale, apoi un rezumat de o propoziție. Desparte ce este explicit de ce este implicit.',
        'Mai notează trei fapte: ce pseudonim a folosit Samuel Langhorne Clemens, ce invenție i-a reușit și cine a realizat singurul film cu el, plus anul și titlul filmului.'
      ].join('\n\n'),
      keyPoints: [
        'Parafraza lămurește cu vorbele tale și poate depăși lungimea bucății de plecare. Rezumatul păstrează ideea de bază.',
        'Explicit este ce stă scris. Implicit este ce deduci, cum este rostul soarelui la lipitură.',
        'Twain este pseudonimul lui Clemens. Albumul cu clei uscat a trecut de 25.000 de exemplare. Edison a filmat în 1909 pentru Prinț și sărman.'
      ]
    }),
    lesson({
      id: 'rezumat',
      title: 'Cine, ce face, când',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Pașii rezumatului',
        text: 'Citești până la capăt, tai textul în fragmente, faci un plan de idei simple și scrii câte un paragraf scurt pentru fiecare idee.'
      }],
      theory: [
        'Ordinea întâmplării rămâne neschimbată. Persoana este a III-a. Timpul poate fi prezentul sau perfectul compus. Vorbele sunt ale tale.',
        'Enunțul spune cine, ce face și când. În rezumat nu apar cuvintele autor, narator și personaj.',
        'Scena Evei ține o săptămână. Luni dimineața, Eva intră în biblioteca școlii și cere o carte despre câini. Bibliotecara îi dă un volum albastru.',
        'Marți, acasă, Eva citește primul capitol, la masă. Miercuri așază în volum un semn verde, tăiat din hârtie.',
        'Joi, semnul verde lipsește de pe masă. Vineri îl găsește în buzunarul ghiozdanului și îl pune la loc.',
        'Sâmbătă citește încă un capitol și îi povestește fratelui doar ce citise. Duminică duce cartea înapoi și îi mulțumește bibliotecarei.',
        'Planul poate avea trei idei. Eva primește cartea. Eva rătăcește semnul, apoi îl află. Eva înapoiază cartea.',
        'Un rezumat scurt: luni, Eva ia de la biblioteca școlii un volum despre câini. În zilele de după citește, rătăcește semnul verde și îl află în ghiozdan. Duminică aduce volumul înapoi și mulțumește.',
        'În aceste rânduri nu apar autor, narator, personaj. Ordinea zilelor rămâne de la luni spre duminică.',
        'Dacă aduni totul într-o singură propoziție, tot spui cine, ce face și când: într-o săptămână, Eva citește o carte despre câini, luată luni și adusă înapoi duminică.',
        'Fragmentul se alege după o schimbare clară: cartea pleacă, semnul se rătăcește, cartea se întoarce. Fiecare idee primește apoi câteva rânduri.'
      ].join('\n\n'),
      example: [
        'Plan: Eva ia cartea. Eva rătăcește semnul verde și îl află în ghiozdan. Eva aduce volumul înapoi.',
        'Rezumatul stă la persoana a III-a, în ordinea zilelor, și nu folosește autor, narator, personaj.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'O propoziție ajunge: Eva a citit, între luni și duminică, o carte despre câini împrumutată de la școală. Cine, ce face și când stau toate trei în ea.'
      }],
      tryThis: [
        'Taie scena Evei în trei idei. Redactează cinci propoziții de rezumat, la persoana a III-a, urmând zilele pe rând.',
        'Apoi adună totul într-o singură propoziție. Ea trebuie să spună cine, ce face și când. Evită autor, narator și personaj.'
      ].join('\n\n'),
      keyPoints: [
        'Rezumatul ține ordinea și persoana a III-a. Spune cine, ce face și când, în vorbele tale.',
        'Se scrie la prezent sau la perfect compus. Lipsesc autor, narator și personaj.',
        'La Eva, cartea albastră pleacă luni și se întoarce duminică, iar semnul verde se rătăcește la mijloc.'
      ]
    }),
    lesson({
      id: 'vorbire-indirecta',
      title: 'De la replică la relatare',
      kind: 'redactare',
      boxes: [{
        type: 'regula',
        title: 'Două vorbiri',
        text: 'Vorbirea directă repetă vorbele așa cum au fost spuse. Vorbirea indirectă le povestește, fără linie de dialog, în propoziții enunțiative.'
      }],
      theory: [
        'Vorbirea directă păstrează linia de dialog. Adesea are o întrebare sau o exclamație. Verbele stau la persoana I ori a II-a. Uneori apare imperativul.',
        'Lângă replică stau verbe de declarație: zice, spune, grăi, întreabă. După ele pot veni două puncte. Vocativul strigă omul pe nume.',
        'În relatare, verbele ajung la persoana a III-a. Imperativul se preface în conjunctiv. Din Vino iese formula i-a spus să vină.',
        'Conjuncția stă lângă verbul de declarație: că, să, ca să, dacă sau unde. Numele strigat trece la dativ ori la acuzativ.',
        'Lucrezi în patru pași. Linia de dialog iese. Persoana se schimbă. Exclamațiile ies. Intră verbul de declarație, împreună cu conjuncția.',
        'Perechea lucrată sună, în direct: — Când ai intrat? întreabă Laura. — Cu cinci minute în urmă, răspunde Ina.',
        'Aceeași pereche, în indirect: Laura a întrebat-o pe Ina în ce moment a intrat. Ina i-a răspuns că intrarea avusese loc cu cinci minute înainte.',
        'Alt model, tot cu linie: — Unde ai lăsat mingea? îl întreabă Vlad pe Ana. — Sub bancă, zice ea.',
        'Relatarea: Vlad a întrebat-o pe Ana în ce loc a lăsat mingea. Ana i-a răspuns că o pusese sub bancă. Linia lipsește. Verbele au ajuns la persoana a III-a. Întrebarea s-a făcut enunț, legat prin unde.',
        'La un îndemn, Radu îi cere lui Mihai să vină la poartă, iar Mihai răspunde că vine acum. Nicio linie nu rămâne.'
      ].join('\n\n'),
      example: [
        'Vlad a vrut să afle de la Ana locul mingii, legat prin unde. Ea i-a răspuns, legat prin că, că mingea stătea sub bancă.',
        'Vino la poartă se spune, în relatare, Radu i-a spus lui Mihai să vină la poartă. Mihai i-a răspuns că vine acum.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă replica este Vino, imperativul nu se copiază. Devine conjunctiv: i-a spus să vină. Persoana a II-a dispare odată cu linia.'
      }],
      tryThis: [
        'Treci în vorbire indirectă dialogul acesta, în propoziții, fără linie de dialog. — Când ai intrat? întreabă Laura. — Cu cinci minute în urmă, răspunde Ina.',
        'Apoi trece și perechea următoare. — Vino la poartă! îi cere Radu lui Mihai. — Vin acum, zice Mihai. Ambele rezultate stau în propoziții, fără linie de dialog.'
      ].join('\n\n'),
      keyPoints: [
        'Vorbirea directă păstrează vorbele și linia de dialog. Vorbirea indirectă le scoate și trece verbele la persoana a III-a.',
        'Legătura folosește că, să, ca să, dacă ori unde. Din Vino iese i-a spus să vină.',
        'Vocativul cheamă pe nume. În relatare, numele trece la dativ sau la acuzativ.'
      ]
    }),
    lesson({
      id: 'verbul',
      title: 'Predicativ, auxiliar, timpuri',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Două roluri',
        text: 'Un verb predicativ poate purta singur predicatul verbal. Un auxiliar nu poate. Are nevoie de sprijin: a avea, a vrea sau a fi.'
      }],
      theory: [
        'Modelul predicativ este Noi scriem: scriem poate sta singur. La perfectul compus, a avea este auxiliar, ca în am scris.',
        'La viitor, a vrea este auxiliar, ca în voi scrie. La viitorul anterior, a fi este auxiliar, ca în voi fi scris.',
        'Indicativul prezintă o acțiune reală. Doar el adună toate timpurile: prezentul cu imperfectul, perfectul simplu cu cel compus, mai-mult-ca-perfectul, apoi viitorul și viitorul anterior.',
        'Imperativul cere un ordin, dă un sfat sau formulează o rugăminte. Rămâne la persoana a II-a, fără timp. Forma da: Cântă și Cântați. Forma nu: Nu cânta și Nu cântați.',
        'Infinitivul este forma de dicționar, cu a sau fără, ca a vorbi. Participiul numește o acțiune suferită: cules, învățat.',
        'La a citi, forma standard de viitor este voi citi. Forma anterioară este voi fi citit: fapta e gata înaintea altei fapte din viitor.',
        'Vorbind ca în toate zilele, auzi am să citesc, dar și o să citesc. În registrul popular auzi oi citi. Toate trei țin de viitor.',
        'Verbul a crea urmează tiparul lui a lucra. La singular: eu creez, tu creezi, el creează. La plural: noi creăm, voi creați, ei creează.',
        'Formele îngrijite sunt trebuie și bănuie, apoi scrii, copiază, creează. Nu sunt bune trebuiesc și bănuiește, nici scri, copie, crează.',
        'Pentru o acțiune de acum scrii place. Plăcea este imperfectul. Cuvântul am este predicativ în Eu am un caiet și auxiliar în Eu am scris. La fel se judecă ai.',
        'În Eu sunt acasă, sunt ține locul lui mă aflu, deci este predicativ. La voi fi citit, cuvântul fi este auxiliar. Apoi conjugarea modifică verbul după mod, timp, persoană și număr.',
      ].join('\n\n'),
      example: [
        'Noi scriem: scriem poartă predicatul, deci este predicativ. Am scris: am este auxiliar, de la a avea. Voi scrie: voi este auxiliar, de la a vrea. Voi fi scris: fi este auxiliar, de la a fi.',
        'La a citi, persoana I are patru viitoruri: voi citi, apoi voi fi citit, apoi am să citesc, apoi oi citi. La a crea, pentru el scrii creează. Place ține de prezent. Plăcea ține de imperfect.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'În Eu am un caiet, am poate sta singur ca predicat, deci este predicativ. În Eu am scris, am nu are sens fără scris, deci este auxiliar.'
      }],
      practice: [
        '1) În Noi scriem, ce rol are scriem? În am scris, ce rol are am?',
        '2) Pentru a citi, la persoana I, dă forma standard de viitor, forma anterioară, forma cu am să și forma din registrul popular.',
        '3) Dă indicativul prezent al lui a crea, pe rând: eu, tu, el, apoi noi, voi, ei.',
        '4) Alege forma bună pentru o acțiune de acum: trebuie sau trebuiesc, bănuie sau bănuiește, place sau plăcea, creează sau crează.'
      ].join('\n\n'),
      answers: [
        'scriem este predicativ. am este auxiliarul a avea.',
        'voi citi; voi fi citit; am să citesc; oi citi.',
        'eu creez, tu creezi, el creează; la plural: noi creăm, voi creați, ei creează.',
        'trebuie, bănuie, place, creează.'
      ],
      mistakes: 'Evită trebuiesc, bănuiește, scri, copie și crează. Plăcea nu ține de prezent. În voi fi citit, fi nu e predicativ.',
      tryThis: 'Spune rolul lui scriem și al lui am. Dă cele patru viitoruri ale lui a citi la persoana I, conjugarea lui a crea și formele trebuie, bănuie, scrii, copiază, place, creează.',
      keyPoints: [
        'Predicativul poate fi singur predicat. Auxiliarul se sprijină pe a avea, pe a vrea sau pe a fi.',
        'Doar indicativul strânge toate timpurile. La a crea, pentru el se scrie creează.',
        'Pentru o acțiune de acum se scriu place, trebuie, bănuie, scrii și copiază. Oi citi este viitorul popular.'
      ]
    }),
    lesson({
      id: 'conjunctiv',
      title: 'Acțiunea posibilă',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Marca să',
        text: 'Conjunctivul numește o acțiune posibilă, una care se poate împlini. Marca obișnuită este să. În propoziție poate lucra drept predicat verbal.'
      }],
      theory: [
        'La persoana a III-a, când vorbim ca în toate zilele, să poate cădea. Auzi Meargă unde o vrea. Se mai aud Doarmă, Fie, Plece și Facă.',
        'Prezentul se formează din să și din prezentul indicativului. La a învăța, singularul este să învăț, să înveți, să învețe. Pluralul este să învățăm, să învățați, să învețe.',
        'La a vrea, singularul este să vreau, să vrei, să vrea. Pluralul este să vrem, să vreți, să vrea.',
        'La a culege, singularul este să culeg, să culegi, să culeagă. Pluralul este să culegem, să culegeți, să culeagă.',
        'La a citi, singularul este să citesc, să citești, să citească. Pluralul este să citim, să citiți, să citească.',
        'Perfectul se face din să, din fi și din participiu. Forma să fi învățat este aceeași la toate persoanele.',
        'De la a avea, forma îngrijită este să aibă. Formele să aivă și să aibe nu se folosesc.',
        'Persoana a II-a cere doi de i. Întâi să fii și să știi, apoi să ții și să vii. Urmează să devii, să susții și să deții. Mai departe să reții, să revii, să previi și să redevii.',
        'Și a crea, și a agrea cer doi de e, în să creez și în să agreez.',
        'Șirul am să citesc ține de viitorul indicativ, așa cum se aude în toate zilele. Nu este conjunctiv, deși are să în el.'
      ].join('\n\n'),
      example: [
        'Să învețe, ca și să citească, stau la conjunctiv prezent, la persoana a III-a. Perfectul se vede în să fi învățat.',
        'Forma îngrijită de la a avea este să aibă. Să vii poartă doi de i. Să creez poartă doi de e. Șirul am să citesc rămâne viitor, nu conjunctiv.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'În Meargă unde o vrea, să a căzut, dar modul rămâne conjunctiv. În Am să citesc, să nu marchează conjunctivul, ci un viitor al indicativului.'
      }],
      practice: [
        '1) La conjunctiv prezent, persoana a III-a, dă formele pentru a învăța, pentru a citi și pentru a culege.',
        '2) Scrie conjunctivul perfect al verbului a învăța.',
        '3) Notează să aibă. Notează și să fii, să vii, să creez. Spune câți de i au să fii și să vii și câți de e are să creez.',
        '4) Ce mod și ce timp este am să citesc?'
      ].join('\n\n'),
      answers: [
        'să învețe; să citească; să culeagă.',
        'să fi învățat.',
        'să aibă; să fii și să vii poartă doi de i; să creez poartă doi de e.',
        'Este viitorul indicativului, din vorbirea de toate zilele, nu conjunctiv.'
      ],
      mistakes: 'Să aivă și să aibe nu se folosesc. Să fii și să vii cer doi de i, iar să creez cere doi de e. Șirul am să citesc nu se trece la conjunctiv.',
      tryThis: 'Dă persoana a III-a la prezent pentru a învăța, pentru a citi și pentru a culege, apoi perfectul lui a învăța. Notează să aibă. Notează și să fii, să vii, să creez. Încheie spunând, într-o propoziție, că șirul am să citesc este viitor, nu conjunctiv.',
      keyPoints: [
        'Conjunctivul numește o acțiune posibilă. De regulă, îl recunoști după să.',
        'La perfect, formula este să fi urmat de participiu, aceeași la toate persoanele.',
        'Să fii și să vii poartă doi de i. Să creez poartă doi de e. Șirul am să citesc ține de viitorul indicativului.'
      ]
    }),
    lesson({
      id: 'conditional-optativ',
      title: 'Dorința și condiția',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Condițional-optativ',
        text: 'Numește o faptă dorită sau o faptă posibilă, legată de o condiție. Prezentul poate privi clipa de acum sau o clipă de mai târziu.'
      }],
      theory: [
        'Prezentul lipește infinitivul de auxiliarul a avea. Formele auxiliarului sunt aș, ai, ar, apoi am, ați, ar.',
        'La a învăța, grupul de singular sună aș învăța, ai învăța, ar învăța. Grupul de plural sună am învăța, ați învăța, ar învăța.',
        'Perfectul ia același auxiliar, apoi fi, apoi participiul. La a citi, persoana I este aș fi citit, persoana a II-a este ai fi citit, persoana a III-a este ar fi citit.',
        'La plural, persoana I este am fi citit, persoana a II-a este ați fi citit, iar persoana a III-a este iarăși ar fi citit.',
        'Formele bune se scriu ar tăcea și ți-ar plăcea. La fel, aș vedea și ar apărea. Nu sunt bune ar tace și ți-ar place. Nici aș vede, nici ar apare.',
        'Există și forme răsturnate, ca mânca-l-ar și dormire-ai. Ortogramele cer atenție, pentru că liniuța schimbă sensul.',
        'C-am se citește că am. Cam, fără liniuță, înseamnă aproximativ. N-ai se citește nu ai. Nai, într-un cuvânt, este peștele.',
        'Ne-am se citește noi am. Neam, fără liniuță, numește familia mare. V-ar se citește vă ar. Var, fără liniuță, este materialul de construit.',
        'M-ai se citește mă ai. Mai, scris dintr-o bucată, înseamnă încă. În enunțul C-am spus eu, grupul c-am înseamnă că am. În sintagma Neamul bunicii, neam înseamnă familie și nu ia liniuță.',
        'Perfectul poate sta înaintea clipei în care vorbești sau poate arăta o faptă rămasă nefăcută. Dacă aș fi ascultat, aș fi ocupat acum locul întâi: condiția a rămas neîmplinită.'
      ].join('\n\n'),
      example: [
        'Aș învăța ține de condiționalul prezent. Aș fi citit ține de condiționalul perfect. Formele îngrijite, luate câte două, sunt ar tăcea cu ți-ar plăcea, apoi aș vedea cu ar apărea.',
        'Grupul c-am, din enunțul C-am spus eu, înseamnă că am. Cuvântul neam, din Neamul bunicii, înseamnă familie. Dacă aș fi ascultat arată o condiție rămasă nefăcută.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'N-ai un caiet înseamnă nu ai. Nai, fără liniuță, este peștele. V-ar plăcea vine din vă ar. Var, fără liniuță, este materialul de construit.'
      }],
      practice: [
        '1) Pentru a învăța, dă condiționalul prezent și pe cel perfect, la eu și la el.',
        '2) Pentru a citi, dă condiționalul prezent și pe cel perfect, la eu și la el.',
        '3) Alege formele bune: ar tăcea sau ar tace, ți-ar plăcea sau ți-ar place, aș vedea sau aș vede, ar apărea sau ar apare.',
        '4) Ce înseamnă c-am în C-am spus eu și ce înseamnă neam în Neamul bunicii?'
      ].join('\n\n'),
      answers: [
        'aș învăța; ar învăța; aș fi învățat; ar fi învățat.',
        'aș citi; ar citi; aș fi citit; ar fi citit.',
        'ar tăcea; ți-ar plăcea; aș vedea; ar apărea.',
        'c-am înseamnă că am. neam înseamnă familia mare, fără liniuță.'
      ],
      mistakes: 'Ar tace, ți-ar place, aș vede și ar apare nu se folosesc. C-am diferă de cam. Ne-am diferă de neam. N-ai nu numește peștele, iar v-ar nu numește varul.',
      tryThis: 'Pentru a învăța și pentru a citi, dă prezentul și perfectul, la eu și la el. Notează formele îngrijite ar tăcea, ți-ar plăcea, aș vedea, ar apărea. Fă un enunț cu c-am și unul cu neam și spune sensul fiecăruia. Încheie cu Dacă aș fi ascultat, aș fi ocupat acum locul întâi și arată că perfectul vorbește aici despre o faptă rămasă nefăcută.',
      keyPoints: [
        'Condițional-optativul arată o dorință sau o faptă legată de o condiție.',
        'Prezentul lipește aș, ai, ar de infinitiv. Perfectul are forma aș fi citit.',
        'Formele îngrijite sunt ar tăcea, ți-ar plăcea, aș vedea, ar apărea. C-am diferă de cam. Ne-am diferă de neam.'
      ]
    }),
    lesson({
      id: 'predicat-nominal',
      title: 'Copula și numele',
      kind: 'limba',
      boxes: [{
        type: 'definitie',
        title: 'Predicat nominal',
        text: 'Unește copula cu numele predicativ. Verbul a fi devine copulă când leagă subiectul de un nume. Numele răspunde la cum este ori la cine este.'
      }],
      theory: [
        'Predicatul verbal este un verb predicativ. Modelul este Copiii citesc. Aici nu există copulă.',
        'A fi lucrează ca copulă, deci nepredicativ, în Andrei este corect și în Ana este prietena mea. În a doua propoziție, prietena mea este numele și răspunde la cine este.',
        'Numele predicativ poate fi un adjectiv ori un substantiv. Un singur nume stă în Floarea este firavă. Două nume stau în Mihai este atent și prietenos.',
        'Acordul se face cu subiectul, ca în Elevul este silitor și în Fetele sunt cuminți.',
        'A fi devine predicativ la sensul a se afla, la sensul a exista, la sensul a costa ori la sensul a proveni, când poate fi schimbat cu aceste verbe.',
        'Bluza este 50 de lei are sensul costă. El este în parc are sensul se află. Cartea este și la noi are sensul există. Marfa este din China are sensul provine.',
        'A fi este auxiliar în Ar fi câștigat. Aici fi nu leagă un nume și nu poate fi înlocuit cu se află.',
        'În aceeași frază, rolurile se pot amesteca. Campionii sunt pe podium rămâne predicativ, fiindcă sunt are sensul se află. Cei trei sunt campioni rămâne copulă plus nume.',
        'Caietul, la 4 lei, are sensul costă. Legat de matematică, același verb este copulă. Mărul, pe masă, are sensul se află. Legat de verde, același verb este copulă, iar verde este numele.',
        'Ca să alegi, întrebi dacă a fi se poate înlocui. Dacă da, este predicativ. Dacă doar leagă un nume, este copulă.'
      ].join('\n\n'),
      example: [
        'În Ana este prietena mea, este lucrează ca copulă, iar prietena mea răspunde la întrebarea cine este. La bluza de 50 de lei, este are sensul costă, deci rolul este predicativ.',
        'În Ar fi câștigat, fi are rol de auxiliar. La mărul de pe masă, primul este are sensul se află. La verde, forma a doua lucrează ca copulă, iar verde este numele.',
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Caietul este 4 lei folosește este cu sensul costă, deci predicativ. Caietul este de matematică leagă un nume, deci copulă. Aceeași frază poate avea ambele roluri.'
      }],
      practice: [
        '1) În Ana este prietena mea, ce rol are este și la ce întrebare răspunde prietena mea?',
        '2) Ce sens are este în Bluza este 50 de lei și ce sens are este în El este în parc?',
        '3) Ce rol are fi în Ar fi câștigat?',
        '4) Desparte Mărul este pe masă și este verde: care este are rol predicativ și care este copulă?'
      ].join('\n\n'),
      answers: [
        'este lucrează ca copulă. prietena mea este numele și răspunde la cine este.',
        'În prima, este înseamnă costă. În a doua, este înseamnă se află. Ambele sunt predicative.',
        'fi este auxiliar.',
        'Este de pe masă are rol predicativ, fiindcă are sensul se află. Al doilea este este copulă, iar verde este numele.'
      ],
      mistakes: 'Nu orice este este copulă. Dacă înseamnă costă, se află, există sau provine, este predicativ. În Ar fi câștigat, fi este auxiliar, nu nume predicativ.',
      tryThis: 'Fă două enunțuri în care a fi este copulă, iar numele răspunde la cum este ori la cine este. Fă două enunțuri în care a fi este predicativ: unul cu sensul costă, altul cu sensul se află. Fă un enunț cu a fi auxiliar, după modelul Ar fi câștigat. Apoi desparte Mărul este pe masă și este verde și spune care este are rol predicativ și care este copulă.',
      keyPoints: [
        'Predicatul nominal unește copula a fi cu numele, adjectiv ori substantiv, pus de acord cu subiectul.',
        'A fi ia rol predicativ la sensurile a se afla, a exista, a costa și a proveni.',
        'A fi ia rol de auxiliar în șiruri ca ar fi câștigat. Într-o singură frază, rolurile se pot amesteca.'
      ]
    }),
    lesson({
      id: 'cultura-populara',
      title: 'Ia și valoarea',
      kind: 'comunicare',
      boxes: [{
        type: 'definitie',
        title: 'Valoare',
        text: 'Cultura strânge valorile de bunuri și cele de spirit, proprii unui popor. Folclorul ieșit din credințe și din tradiții este cultura populară. Valoarea este lucrul demn de prețuire.'
      }],
      theory: [
        'Printre valori stau adevărul, binele și frumosul. Lângă ele merg importanță, merit, preț și însemnătate.',
        'Portul popular este cunoscut în mai multe regiuni. Întâi Dobrogea, Moldova și Bucovina. Apoi Maramureș, Transilvania și Crișana. La urmă Banatul, Oltenia și Muntenia.',
        'Pe ie se cosesc semne. Se văd soarele, stelele, pământul, florile. Se mai văd treptele vieții, lupta binelui cu răul, dragostea, hora, anotimpurile.',
        'Au purtat ia Principesa Ileana și Principesa Elena. A purtat-o și Regina Maria. Ea s-a născut în casa Edinburgh. Dinastia ei este Saxa-Coburg și Gotha.',
        'Regina a ales ia ca fel propriu de a se îmbrăca. Nu rămânea un costum de sărbătoare, pus o singură dată.',
        'În 1940, Henri Matisse a pictat La blouse roumaine. Punctul de plecare a fost o colecție de ii.',
        'Scena de lucru stă în muzeu. Irina vede o ie albă. Pe mânecă, soarele este cusut cu arnici roșu.',
        'Ghidul spune că soarele cusut pe ie are sensul vieții. Irina rămâne un minut dinaintea iei.',
        'Din scenă faci trei pași: spui ce stă scris, spui ce observi, apoi spui ce ai alege tu. Motivul îl legi cu pentru că. Rândul din mijloc începe cu O văd.',
        'Valoarea cusută pe mânecă, după vorbele ghidului, este viața. Ea se reține ca fapt al scenei, nu ca un vers de copiat.'
      ].join('\n\n'),
      example: [
        'Ce scrie: în muzeu, Irina vede o ie albă, cu soarele cusut în arnici roșu pe mânecă, iar ghidul spune că soarele înseamnă viața.',
        'Observația: O văd dinaintea iei albe pe Irina, soarele roșu stând pe mânecă. Aș fi zăbovit un minut, pentru că semnul era cusut acolo și ghidul i-a dat sensul de viață.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă numești doar pânza albă, ai un fapt. Dacă adaugi că soarele înseamnă viața, ai valoarea. Anul tabloului lui Matisse rămâne 1940.'
      }],
      tryThis: [
        'Pe scena Irinei, alcătuiește trei enunțuri: ce stă scris, ce observi, apoi ce ai alege tu. Motivul îl legi cu pentru că. Rândul din mijloc începe cu O văd.',
        'Spune ce valoare stă cusută pe mânecă, după vorbele ghidului. Mai dă trei regiuni unde se poartă ia, două nume regale care au purtat ia și anul tabloului La blouse roumaine, pictat de Henri Matisse.'
      ].join('\n\n'),
      keyPoints: [
        'Cultura populară ține credințe și tradiții. Valoarea este lucrul demn de prețuire, cum sunt adevărul, binele și frumosul.',
        'Pe ie, soarele cusut poate avea sensul vieții. Printre purtătoare a fost și Regina Maria.',
        'Tabloul La blouse roumaine, din 1940, este al lui Henri Matisse și pleacă de la o colecție de ii.'
      ]
    }),
    lesson({
      id: 'proiect-prietenii',
      title: 'Mari prietenii',
      kind: 'comunicare',
      boxes: [{
        type: 'regula',
        title: 'Proiectul',
        text: 'Mari prietenii se lucrează în echipă de patru sau de cinci. Fiecare alege un cuvânt despre prietenie și născocește o definiție.'
      }],
      theory: [
        'În proiect stă definiția voastră. Mai stau unul sau două citate alese de voi dintr-o carte, o prietenie știută, imagini și o prezentare care nu se citește de pe foaie.',
        'Întâi fixați obiectivele. Apoi întocmiți planul: cine caută ce, din care sursă, ce chip are lucrarea și de ce materiale aveți nevoie.',
        'Apoi căutați, lipiți textul de imagini, prezentați și ascultați ce vă spun ceilalți. Ascultarea ține de proiect, nu este o pauză.',
        'Charlie Chaplin și Albert Einstein au legat o prietenie. Cel care i-a pus față în față a fost Carl Laemmle, de la studioul Universal.',
        'La Einstein, Chaplin prețuia calmul și energia minții, apoi altruismul și sinceritatea.',
        'Nu luați o poveste deja scrisă despre ei. Vă ajunge faptul prieteniei și lucrurile prețuite de Chaplin.',
        'Citatul nu se ia de-a gata dintr-un rezumat. Îl veți alege voi dintr-o carte. Aici scrii doar că îl vei alege, fără să lipești un rând străin.',
        'Un model de cuvânt este loialitate. Definiția născocită: loialitatea înseamnă să stai lângă prieten și la bine, și la greu.',
        'Prezentarea poate fi un dialog care ține două minute, nu citirea unei foi. Ana rostește definiția. Vlad spune cine i-a apropiat. Lia aduce o imagine. Radu închide pe valoarea sincerității.',
        'Pentru un grup de patru, fiecare primește o sarcină. Forma se alege înainte, ca materialele să fie clare.'
      ].join('\n\n'),
      example: [
        'Cuvântul grupului este loialitate. Prietenia aleasă îi leagă pe Chaplin și pe Einstein. Prezentarea este un dialog de două minute.',
        'Ana dă definiția, Vlad spune că i-a prezentat Carl Laemmle, Lia aduce imaginea, Radu închide cu sinceritatea.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'Dacă grupul are cinci membri, a cincea sarcină poate fi notarea a ce spun colegii după prezentare. Obiectivul, sursa și materialele rămân în plan.'
      }],
      tryThis: [
        'Întocmește planul pentru o echipă de patru. Alege un cuvânt propriu despre prietenie și născocește o definiție, în două propoziții.',
        'Numește legătura dintre Charlie Chaplin și Albert Einstein. Spune cine i-a apropiat și două lucruri prețuite de Chaplin la Einstein.',
        'Alege chipul prezentării și împarte patru sarcini, câte una de coleg. Nu lipi un citat. Notează doar că citatul îl vei lua dintr-o carte.'
      ].join('\n\n'),
      keyPoints: [
        'Proiectul pornește dintr-un cuvânt și din definiția voastră, apoi aduce o prietenie știută și o prezentare care nu se citește de pe foaie.',
        'Planul arată cine caută, din care sursă, ce chip are lucrarea și ce materiale trebuie.',
        'Chaplin și Einstein au fost prieteni. Carl Laemmle i-a prezentat. Chaplin prețuia calmul, energia minții, altruismul și sinceritatea.'
      ]
    }),
    lesson({
      id: 'recap-prietenie',
      title: 'Încheierea despre prietenie',
      kind: 'recapitulare',
      boxes: [{
        type: 'regula',
        title: 'Trei lucrări pe o scenă',
        text: 'Unitatea se închide pe scena pixului. Parcurgi cei trei pași, muți o replică în vorbire indirectă și redactezi un rezumat de cinci propoziții.'
      }],
      theory: [
        'Scena stă aici, nu într-un volum deschis. Miercuri, după ore, în fața școlii, Nora caută pe bancă un pix albastru. Nu îl găsește în penar.',
        'Pavel sosește ținând pixul. Întreabă dacă îi aparține. Nora confirmă: l-a uitat la desen. Pavel i-l dă. Nora mulțumește și îl așază în penar.',
        'Cu linie de dialog, schimbul arată așa. — Pixul ăsta e al tău? a întrebat Pavel. — Da, l-am lăsat la desen, a zis Nora.',
        'Naratorul nu spune eu. El vede banca, penarul și pixul. Nora și Pavel fac gesturile. De aceea povestirea stă la persoana a III-a.',
        'Cei trei pași rămân aceiași. Spui ce stă scris. Spui ce observi, cu începutul Îi văd. Spui ce ai face tu, legat cu pentru că.',
        'Trecerea în relatare scoate linia. Pavel a întrebat-o pe Nora dacă pixul îi aparține. Nora i-a răspuns că îl uitase la desen.',
        'Conjuncția dacă leagă întrebarea. Conjuncția că leagă răspunsul. Verbele stau la persoana a III-a.',
        'Rezumatul păstrează ordinea: căutarea, întrebarea, pixul dat, mulțumirea, pixul pus în penar. Stă la persoana a III-a.',
        'În cele cinci propoziții nu apar autor, narator și personaj. Răspunzi la cine, ce face și când: miercuri, după ore, Nora își recuperează pixul cu ajutorul lui Pavel.',
        'Unitatea se închide pe această scenă. Persoana a III-a, vorbirea indirectă și rezumatul se verifică aici, pe fapte scrise în lecție.'
      ].join('\n\n'),
      example: [
        'Ce scrie: miercuri, după ore, Nora caută pixul, Pavel întreabă dacă îi aparține, apoi i-l dă. Ce vezi: Îi văd lângă bancă pe Nora și pe Pavel, pixul albastru fiind între ei.',
        'Aș fi înapoiat pixul, pentru că Nora îl căuta și a spus că îl uitase. În relatare, Pavel întreabă dacă pixul îi aparține, iar Nora spune că l-a lăsat la desen.'
      ].join('\n\n'),
      extraExamples: [{
        title: 'Încă un exemplu',
        text: 'O propoziție de rezumat: miercuri, după ore, Pavel i-a înapoiat Norei pixul albastru uitat la desen. Cine, ce face și când stau împreună, fără autor, narator, personaj.'
      }],
      tryThis: [
        'Pe scena pixului, alcătuiește trei enunțuri: ce stă scris, ce observi, apoi ce ai alege tu. Motivul îl legi cu pentru că. Rândul din mijloc pornește prin Îi văd. Arată persoana naratorului.',
        'Mută întrebarea lui Pavel și răspunsul Norei în vorbire indirectă. Apoi redactează cinci propoziții de rezumat, la persoana a III-a, fără autor, fără narator și fără personaj.',
      ].join('\n\n'),
      keyPoints: [
        'La persoana a III-a, naratorul nu folosește eu. El privește, iar Nora și Pavel fac fapta.',
        'Relatarea indirectă scoate linia de dialog. Replica se leagă prin dacă sau prin că.',
        'Rezumatul ține ordinea și persoana a III-a. Nu folosește autor, narator, personaj.'
      ]
    })
  ]
};
