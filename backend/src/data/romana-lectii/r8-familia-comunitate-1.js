'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  lessons: [
    lesson({
      id: 'atitudini-orale',
      title: 'Asertivitate și o expoziție',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei atitudini',
          text: 'Asertivitatea spune părerea fără să o nege pe a celuilalt. Flexibilitatea adaptează. Negocierea încheie o înțelegere. Proba este scrisă.'
        }
      ],
      theory: [
        'În frază, ordinea este aceasta: a dat dovadă de asertivitate când a fost criticat, de flexibilitate când a înțeles intențiile reale, iar negocierea a încheiat un tratat favorabil comunității.',
        'Evenimentul din știrea audio: deschiderea spațiului Co Place, în Târgu Mureș, pe 5 iulie, de la ora 13:00. Anul nu este în transcriere, deci nu se inventează.',
        'Co Place ține într-un loc un spațiu de lucru comun și un magazin de concept. Scopul: părinții învață cum să gestioneze inteligența emoțională a copiilor, între 10 și 14 ani. Copilul află prin educație nonformală, cu jocuri.',
        'Calitățile numite: gândire pozitivă, empatie, abilități sociale, leadership, prezentare, cunoaștere de sine și încredere. Accesul este gratuit, cu formularul evenimentului. Articolul este semnat de Elena Polearus.',
        'Din câmpul inteligenței fac parte empatie, leadership și cunoaștere de sine.',
        'Cealaltă știre: proiectul Purtăm cultură, în engleză We Wear Culture, o expoziție virtuală de modă care adună 3.000 de ani de cultură vestimentară. Colaborează Muzeul Național al Țăranului Român și peste 180 de instituții.',
        'Colecția Haina țărănească are 27 de artefacte din portul tradițional. Sunetul vine din colecția Ethnophonie: doine, hore, învârtite, brâuri.',
        'Patru roluri de grup: conservatorul apără muzeul fizic, exuberantul apără muzeul virtual, criticul propune alt timp liber, optimistul arată folosul pentru cultura generală. Evaluarea cu inimioare nu este lecția.'
      ].join('\n\n'),
      example: [
        'Locul este Târgu Mureș, data este 5 iulie, ora 13:00, accesul este gratuit, scopul este gestionarea emoțiilor la 10–14 ani.',
        'Opinie scurtă: merită un muzeu virtual, pentru că poți vedea portul fără să muți haina din săli, iar textul dă cele 27 de artefacte. Expoziția are și sunet de doine, hore, învârtite și brâuri.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Asertivitate la critică: spui că expoziția virtuală ajută, fără să spui că muzeul fizic nu mai contează. Flexibilitate: asculți pe cel care vrea să meargă în sală. Negociere: stabiliți o vizită și o completare online.'
        }
      ],
      tryThis: 'Definește cele trei atitudini și completează fraza cu tratatul în ordinea din lecție. Completează locul, data, ora, accesul, scopul și vârstele. Notează 3.000 de ani, 180 de instituții, 27 de artefacte și cele patru piese muzicale. Nu inventa anul din Târgu Mureș.',
      keyPoints: [
        'Asertivitatea spune părerea și lasă loc și părerii celuilalt.',
        'Co Place, în Târgu Mureș, pe 5 iulie, la 13:00, este gratuit pentru copiii de 10–14 ani.',
        'We Wear Culture are 27 de artefacte și sunet din Ethnophonie. Anul lipsă nu se inventează.'
      ]
    }),
    lesson({
      id: 'interpretari-multiple',
      title: 'Mai multe citiri, aceeași seară',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Două citiri',
          text: 'Două citiri sunt bune dacă amândouă stau pe fapte din text. Liricul lasă citirea mai deschisă, pentru că nu fixează un singur deznodământ. Și epicul poate avea mai multe citiri.'
        }
      ],
      theory: [
        'La comentariul liric se cer tema, emoția, tabloul și figurile. Versul nu se lipește. Fragmentul de la școală poate fi din Sara pe deal, de Mihai Eminescu.',
        'Ce se poate spune fără strofă: tema adună seara la sat și iubirea. Cuvinte-cheie de ținut: seară, clopot, coasă, iubire. Un câmp este al satului. Altul este al muncii.',
        'Imaginile pot fi vizuale, auditive sau motorii. Sensul figurat stă în ideea că sufletul arde. O citire rămâne la munca de seară. Alta închide tabloul cu iubirea. Amândouă folosesc aceleași elemente.',
        'Versificația, ca fapt deja învățat pe acest text: catrene, rimă împerecheată, primul vers are 12 silabe. La teză numeri rândul deschis, chiar dacă strofa este alta.',
        'Scena de lucru este originală, ca să exersezi pașii fără să copiezi poemul. Seara, la marginea satului, o fată aude un clopot și vede oameni care urcă de la câmp cu uneltele pe umăr. Fumul stă pe vale.',
        'Prima citire: munca se încheie. A doua: iubirea închide tabloul, pentru că ea așteaptă pe cineva. Asemănarea: aceeași seară. Deosebirea: locul pe care îl dai sentimentului, la început sau la final.',
        'Figuri pe rânduri proprii. Personificare: Clopotul cheamă satul la odihnă. Epitet: clopot vechi. Metaforă: sufletul este pară, fără ca. Comparație: sufletul arde ca para, cu ca.'
      ].join('\n\n'),
      example: [
        'Ce scrie: seara adună uneltele, clopotul și o așteptare. Ce vezi: îi văd pe oameni urcând de la câmp, iar deasupra lor fumul stă pe vale.',
        'Eu aș nota întâi munca și apoi iubirea, pentru că scena le pune în această ordine. Tema este seara și așteptarea. Rima împerecheată și catrenul sunt fapte de versificație, nu un vers de copiat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Două scheme de colegi se aseamănă la tema serii și se deosebesc la locul iubirii. Una o pune la început, ca motiv al așteptării. Alta o pune la final, după coasă și clopot. Ambele stau pe fapte. Niciuna nu lipește strofa.'
        }
      ],
      tryThis: 'Spune tema, patru cuvinte-cheie și două câmpuri, pe scena serii. Numește o imagine vizuală, una auditivă și una motorie. Scrie două citiri, fiecare în două rânduri. Notează catrenul, rima împerecheată și cele 12 silabe, fără să copiezi versul.',
      keyPoints: [
        'Două citiri sunt bune dacă stau pe fapte din text.',
        'Sara pe deal adună seara, munca și iubirea. Catrene, rimă împerecheată, 12 silabe în primul vers.',
        'Sufletul arde este sens figurat. Versul nu se lipește.'
      ]
    }),
    lesson({
      id: 'baltagul',
      title: 'Vitoria pe drumul Dornelor',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Narativ',
          text: 'Are un narator, personaje, indici de timp și de spațiu și întâmplări în succesiune. Compunerea are cel puțin 150 de cuvinte. Patru trăsături se numesc. Două se arată pe fapte.'
        }
      ],
      theory: [
        'Romanul Baltagul, de Mihail Sadoveanu, a apărut în 1930. Sursa de inspirație este balada Miorița. Mottoul cere încă un câine. Versurile nu se lipesc. Eugen Lovinescu vede o reconstituire a acțiunii din baladă. Alexandru Paleologu leagă romanul de un mit.',
        'Faptele de ținut, pe scurt. Oamenii de sub brad sunt iuți, rabdă iarna, se bucură fără griji și țin datinile. Se feresc de alte neamuri. Așa era și Nechifor Lipan, care acum lipsește. Vitoria merge spre Dorna cu un năcaz pe care nu îl spune până la capăt.',
        'La Borca nimerește la o cumetrie. La Cruci, pe gheața Bistriței, dă de nuntă. Arată față liniștită, deși drumul ei este spre o datorie grea. Aproape de Dorne simte o arșiță lăuntrică, nu un vânt de afară. Are credința că aici i se va așeza viața altfel.',
        'Dornele sunt pâraie, munțișori și sate. Ideea principală: Vitoria trece prin datini în timp ce își ascunde năcazul și caută o rânduială nouă. Ideea secundară: un popas este de botez, altul de nuntă. Tema: comunitatea de sub brad și drumul ei interior.',
        'Forme literare: cumătrie se scrie cumetrie. Să se supuie se scrie să se supună. Rodină înseamnă darul pentru femeia care a născut. Bundiță este un cojoc scurt, fără mâneci. Lehuză este femeia din primele săptămâni după naștere.',
        'Coștei este săculeț. Nănaș este naș. Drușcă este fata care însoțește mireasa. Catrință este fusta sau șorțul din port. Vornicel este flăcăul care poftește oaspeții. Bârlog înseamnă vizuină.',
        'A cădea este polisemic. A căzut la o cumetrie înseamnă a nimerit la un botez. A căzut din picioare înseamnă a se prăbuși. Verbele sunt la persoana a III-a. Naratorul stă în afara întâmplării.',
        'Figuri, pe secvențe spuse în proză, nu pe fraza romanului. Venirea la adăpost ca fiara de codru este comparație. Un șir de verbe de la descălecat este enumerație. Frumoasă urare, cu adjectivul înainte, este inversiune. Limbă ascuțită este epitet.',
        'Scenă de lucru, ca să nu lipim romanul. Sâmbătă, pe un drum de munte, o femeie se oprește la o curte de sărbătoare, zâmbește și tot își ține mâna pe o scrisoare necitită. Zâmbetul nu șterge graba. Asta este caracterizare prin faptă.'
      ].join('\n\n'),
      example: [
        'Ce scrie: femeia trece pe la o sărbătoare și își ascunde graba. Ce vezi: o văd descălecând, cu o scrisoare în mânecă, în timp ce curtea râde.',
        'Eu aș întreba întâi cine lipsește, pentru că petrecerea nu ține loc de răspuns. Comparația este ca fiara de codru. Persoana relatărilor din roman este a III-a. Anul este 1930.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Arșița dinăuntru nu este vântul de afară. Este credința că viața i se va așeza la Dorna. Comentariul, în două rânduri, desparte senzația de vreme. Nu copiază peisajul.'
        }
      ],
      tryThis: 'Scrie formele cumetrie și să se supună. Dă sensul pentru lehuză, coștei, drușcă și vornicel. Fă două enunțuri cu a cădea, unul cu a nimeri și unul cu a se prăbuși. Formulează ideea principală și pe cea secundară. Spune de ce relatarea este obiectivă.',
      keyPoints: [
        'Baltagul apare în 1930 și pornește de la Miorița. Vitoria merge spre Dorna cu un năcaz nespus până la capăt.',
        'La Borca este cumetrie, la Cruci este nuntă. Arșița lăuntrică nu este vântul de afară.',
        'Naratorul este la persoana a III-a. Comparația, enumerația, inversiunea și epitetul se arată pe fapte, nu pe fraze copiate.'
      ]
    }),
    lesson({
      id: 'originalitate',
      title: 'Originalitatea și plagiatul',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Plagiat',
          text: 'Iei ideea, metoda sau textul altcuiva și le prezinți ca pe creația ta. Dreptul de autor ține de lege și de instanță. Plagiatul, pe textul acesta, îl judecă școala, editura sau asociația.'
        }
      ],
      theory: [
        'Instituțiile sancționează: penalizări, suspendare, chiar exmatriculare sau pierderea locului de muncă. Multe forme de plagiat nu sunt și încălcare a dreptului de autor. Sursa lămuririi este un articol de enciclopedie online.',
        'Ideea principală: plagiatul este luarea creației altuia și semnarea ei cu numele tău. Ideea secundară: sancțiunea, pe acest text, vine de la instituție, nu automat de la tribunal.',
        'Originalitatea are două fețe. Textul pe care îl scrii este al tău. Dacă iei o idee, indici sursa. A doua față: spui ideile într-un fel al tău, nu doar schimbi două cuvinte.',
        'La un text literar, originalitatea ține de viziune. La un comentariu, ține de judecata ta pe fapte, nu de un comentariu copiat. La un text științific, ține de demonstrație și de sursa indicată. La un text jurnalistic, ține de faptele verificate și de semnătură.',
        'Internetul ajunge repede la un text, lasă comparația între pagini și păstrează data. Dezavantaje: nu orice pagină este credibilă, textul se copiază ușor fără sursă, o pagină se poate schimba.',
        'Compunerea de 150–300 de cuvinte cere opinia despre rolul originalității într-un proiect, două argumente, un text studiat, conectori și structură. Textul studiat poate fi Baltagul, cu titlul și cu Sadoveanu, dacă spui că drumul Vitoriei este judecat de tine.',
        'Un fapt pe care îl poți folosi: ea își ascunde năcazul la cumetrie. Tu comentezi faptul. Nu semnezi o pagină găsită gata.'
      ].join('\n\n'),
      example: [
        'Deosebire: instanța judecă dreptul de autor. Școala judecă plagiatul, pe textul din lecție. Argument: un proiect este al tău când sursa stă la final și fraza este a ta.',
        'Conectori: în primul rând, de exemplu, așadar. În primul rând, sursa se scrie. De exemplu, titlul și autorul stau în frază. Așadar, două cuvinte schimbate nu fac un text al tău.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Comentariu original: Vitoria zâmbește la datină și totuși duce un năcaz. Judecata este a ta, pe fapt. Comentariu copiat: un paragraf luat de pe o pagină nesemnată, cu două adjective schimbate. Al doilea este plagiat.'
        }
      ],
      tryThis: 'Scrie definiția plagiatului și deosebirea față de dreptul de autor. Formulează ideea principală și pe cea secundară. Notează trei avantaje și trei dezavantaje ale internetului, cum sunt în lecție. Spune ce înseamnă originalitatea la un comentariu și la un text jurnalistic.',
      keyPoints: [
        'Plagiatul ia creația altuia și o semnează ca pe a ta. Dreptul de autor ține de lege.',
        'Pe textul din lecție, plagiatul ține de instituții, nu automat de tribunal.',
        'Originalitatea cere frază proprie și sursă indicată. Compunerea are 150–300 de cuvinte și un text studiat.'
      ]
    }),
    lesson({
      id: 'beneficii-lectura',
      title: 'De ce citim',
      kind: 'lectura',
      boxes: [
        {
          type: 'atentie',
          title: 'Întrebare retorică',
          text: 'Semnul întrebării din deschiderea articolului nu așteaptă răspunsul tău pe loc. Deschide ideea pe care textul o demonstrează.'
        }
      ],
      theory: [
        'Romeo Aurelian Ilie, în Arta de a fi librar, spune că rămân oameni fideli cărții tipărite. El îi numește oamenii cărții. Întrebarea lui: mai există librari care să îi îndrume. O informație de ținut: nu toți au părăsit cartea tipărită.',
        'A monitoriza are două sensuri: a supraveghea printr-un aparat și a îndruma o activitate. A evalua, lângă o creație literară, înseamnă a aprecia, nu a calcula un preț.',
        'Articolul lung este semnat de Roxana Bălan, 22 martie 2016. Cele zece beneficii, ca să poți alege două: creierul, empatia, stresul, memoria, somnul, atenția, gândirea analitică, imaginația, compasiunea și toleranța la neclar.',
        'Un studiu arată că activitățile intelectuale constante, între care cititul, au încetinit deteriorarea vieții cognitive cu 32 la sută. Robert S. Wilson spune că stimularea schimbă structura creierului. Cognitiv înseamnă legat de învățare. Neuropatologie studiază bolile sistemului nervos.',
        'Ficțiunea ajută empatia: te pui în pielea personajelor. Biblioterapia este tratament prin lecturi alese. Sinapsa este punctul de contact dintre doi neuroni. Ecranul de dinainte de somn îi spune creierului să se trezească.',
        'Atenția: 15–20 de minute dimineața, contra mai multor sarcini deodată. Gândirea analitică vine din întrebările despre personaje. Incertitudinea din ficțiune face parte și din viață.',
        'Portofoliul de o lună este proiect: jurnal, o carte, o schimbare, o prezentare de cel mult 10 minute. Narațiunea de 150–300 de cuvinte, o întâmplare într-o bibliotecă, cere succesiune și doi indici, unul de timp și unul de loc.'
      ].join('\n\n'),
      example: [
        'Autoarea este Roxana Bălan. Data din sursă este 22 martie 2016. Două motive: ficțiunea ajută empatia, iar 15–20 de minute dimineața ajută atenția.',
        'Narațiune scurtă: marți, în sala de lectură, s-a stins lumina și Irina a terminat capitolul la fereastră. Timp: marți. Loc: sala de lectură. A evalua cartea înseamnă a aprecia.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A monitoriza un aparat: supraveghere. A monitoriza un club de lectură: îndrumare. Aceeași formă, două sensuri. Lângă o operă, a evalua nu înseamnă a-i pune un preț.'
        }
      ],
      tryThis: 'Scrie numele Roxanei Bălan și anul 2016. Explică semnul întrebării. Notează două motive pentru care merită să citești. Fă două enunțuri cu a monitoriza. Spune că evaluează, lângă o creație, înseamnă a aprecia. Schițează o întâmplare de bibliotecă cu timp și loc.',
      keyPoints: [
        'Roxana Bălan publică articolul la 22 martie 2016. 32 la sută este cifra studiului, nu o cifră nouă.',
        'Beneficiile merg de la creier și empatie până la somn, atenție, analiză și toleranță la neclar.',
        'Întrebarea retorică deschide textul. A evalua o operă înseamnă a aprecia. Narațiunea are timp și loc.'
      ]
    }),
    lesson({
      id: 'jargon-argou',
      title: 'Jargon și argou',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Două registre',
          text: 'Jargonul este limbaj de meserie sau împrumut de paradă, cu arie mică. Argoul ascunde sensul, adesea ca să nu fie înțeles de ceilalți, și are conotație negativă. Amândouă sunt informale.'
        }
      ],
      theory: [
        'Nu le pui în compunerea îngrijită. Le recunoști ca să le lași afară din vocea argumentului. Jargonul de meserie stă la medici, juriști, informaticieni. Împrumuturile de paradă, ca darling, vor să impresioneze.',
        'Legaliza este numele dat jargonului juridic, cu termeni ca parte vătămată sau prescripție. Afacereza este numele dat jargonului de afaceri. Sursa este o emisiune de sfaturi de limbă.',
        'Argoul este folosit mai ales de grupuri care nu vor să fie înțelese. Îl pot folosi și elevii, tot ca să nu fie înțeleși. Față de jargon, conotația este negativă.',
        'A da pe goarnă înseamnă a divulga. Gabor înseamnă polițist. A mierli înseamnă a muri. Adminii sunt administratorii unei rețele: jargon de informatică, nu argou. Mitițica înseamnă închisoare. Nașpa înseamnă prost, nereușit.',
        'Ce marfă e acest film: argou, marfă însemnând aici ceva foarte bun. A ciordi înseamnă a fura. Madam, ce faci: jargon, un împrumut familiar. Rochiile astea sunt bestiale: argou, bestial însemnând extraordinar.',
        'Damele au plecat la teatru nu este argou. Damă, aici, stă aproape de limba îngrijită. La comedii, franțuzismele puse ca să pară elegante sunt jargon. Du reste, într-o replică, este jargon. Replicile nu se lipesc.',
        'Belețe, despre o fată, este argou și înseamnă fată atrăgătoare. Diriga este limbaj școlar informal. La examen, registrul compunerii rămâne îngrijit. Dacă se cere jargonul, el stă într-o replică, nu în concluzie.',
        'Zicala de lucru: când vorbești mult, aproape întotdeauna spui și ce n-ar trebui spus. Două argumente, în registru îngrijit. Un fapt posibil: cineva spune prea devreme un secret pe care putea să îl țină.'
      ].join('\n\n'),
      example: [
        'A dat pe goarnă: a divulgat. Adminii: jargon de informatică. Mitițica: închisoare. Marfă, despre un film: argou. Ciordit: furat. Madam: jargon. Bestiale: argou.',
        'Damele au plecat la teatru: nu este argou. Opinia, în registru îngrijit: vorba prea multă scapă un secret. Jargonul, dacă este cerut, stă într-o replică.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Colegul a zis că filmul e marfă. În argumentul tău scrii: filmul i s-a părut foarte bun. Marfă rămâne în replica lui, ca să arăți registrul, nu în concluzia despre zicală.'
        }
      ],
      practice: [
        '1) Ce înseamnă a da pe goarnă, mititica și a ciordi?',
        '2) Adminii sunt jargon sau argou?',
        '3) Damele au plecat la teatru este argou?',
        '4) Unde stă jargonul dacă foaia îl cere într-o compunere îngrijită?'
      ].join('\n\n'),
      answers: [
        'a divulga; închisoare; a fura',
        'jargon de informatică',
        'nu',
        'într-o replică, nu în concluzie'
      ],
      mistakes: 'Argoul și jargonul nu sunt formale. Damele au plecat la teatru nu se forțează în argou. Bestial, lăudând o rochie, nu înseamnă crud.',
      tryThis: 'Deosebește jargonul de argou cu definiția din lecție. Alege argou sau jargon la marfă, ciordit și madam. Spune că du reste este jargon, fără să copiezi replica.',
      keyPoints: [
        'Jargonul este limbaj de meserie sau împrumut de paradă. Argoul ascunde sensul.',
        'Goarnă înseamnă divulgare, mititica înseamnă închisoare, a ciordi înseamnă a fura.',
        'Damele au plecat la teatru nu este argou. Compunerea de examen stă în registru îngrijit.'
      ]
    })
  ]
};
