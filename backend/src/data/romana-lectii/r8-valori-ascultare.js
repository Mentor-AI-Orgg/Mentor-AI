'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  id: 'valori-ascultare',
  title: 'Valori și atitudini, ascultarea',
  inOwnWords: 'Atributiva și completiva directă se transcriu cel mai des. Lângă ele stau completiva indirectă și cea prepozițională. Tiparul textului se recunoaște pe scenă: narativ, descriptiv sau dialogat. Teatrele, grafica și broșura rămân în planul scurt.',
  toc: [
    'Ascultarea și teatrele',
    'Steaua fără nume',
    'Părțile de propoziție',
    'Grafica paginii',
    'Atributiva',
    'Completiva directă',
    'Trei tipare într-un text',
    'Completiva indirectă',
    'Completiva prepozițională',
    'Valori românești, scurt',
    'Recapitularea valorilor'
  ],
  glossary: [
    {
      term: 'didascalie',
      meaning: 'Indicația dintre paranteze: jocul actorului sau decorul.'
    },
    {
      term: 'băjenie',
      meaning: 'Cuvânt vechi pentru pribegie.'
    },
    {
      term: 'diletant',
      meaning: 'Om care lucrează într-un domeniu fără pregătirea lui de meserie.'
    }
  ],
  lessons: [
    lesson({
      id: 'ascultare',
      title: 'Asculți și verifici',
      kind: 'comunicare',
      boxes: [
        {
          type: 'definitie',
          title: 'Ascultare activă',
          text: 'Înțelegi punctul de vedere în contextul lui și îl pui lângă ce știi deja. Nu repeți tot ce ai auzit. Proba este scrisă.'
        }
      ],
      theory: [
        'Băjenie este un cuvânt vechi și înseamnă pribegie. Printre teatrele vechi stau Teatrul Mihai Eminescu din Oravița, 1817, Teatrul Ioan Slavici din Arad, 1874, și Teatrul Național Vasile Alecsandri din Iași, 1896.',
        'În București se numesc, între altele, Teatrul Național I.L. Caragiale, Bulandra, Nottara, Ion Creangă, Metropolis și Teatrul de Comedie.',
        'În 2016 se anunță premiera spectacolului O familie de artiști, în regia lui Alexander Hausvater. Oameni evacuați dintr-un cartier care trebuie dărâmat pentru o autostradă își transformă casa într-un muzeu al artelor.',
        'Repetițiile stau la Nottara. Premiera se joacă la Teatrul de Comedie. Hausvater spune că, dacă dispare cultura, dispare fiecare dintre noi. Florina Cercel numește spectacolul un protest față de dezinteresul pentru artiști.',
        'Victoria Cociaș spune că nu se evacuează doar trupa, se evacuează arta. Nottara se socotește teatru de turneu, teatru de băjenie.',
        'Sala Arcub nu a rămas disponibilă: imobilul din strada Batiștei a primit gradul I de risc seismic. Spectacolele merg la Comedie, la Teatrul Elisabeta, la Bulandra sau la Cercul Militar Național.',
        'Și piesa, și teatrul vorbesc despre o casă care își pierde locul. Afirmația de comentat, în 30–50 de cuvinte, pune răspunderea pe fiecare, nu doar pe o instituție.',
        'Teatrul poate fi și educativ, nu doar distracție, când îți arată o pierdere pe care o poți numi.'
      ].join('\n\n'),
      example: [
        'Oravița 1817, Arad 1874, Iași 1896. Băjenie înseamnă pribegie.',
        'Comentariu scurt: dacă o limbă și piesele ei nu mai sunt jucate, oamenii pierd o oglindă. Afirmația pune răspunderea pe fiecare. Eu o leg de premiera din 2016, de autostradă și de riscul seismic de pe Batiștei.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ipoteză: teatrul educă când numește o pierdere. Motivul: piesa și mutarea la Comedie vorbesc despre aceeași casă fără loc. Faptul: Batiștei are gradul I de risc seismic.'
        }
      ],
      tryThis: 'Notează cele trei teatre cu anul. Spune ce înseamnă băjenie. În 30–50 de cuvinte, comentează afirmația despre cultura care dispare, cu un fapt din lecție. Spune de ce spectacolul este legat de un protest.',
      keyPoints: [
        'Băjenie înseamnă pribegie. Oravița are teatru din 1817, Arad din 1874, Iași din 1896.',
        'Premiera din 2016 leagă o casă dărâmată pentru o autostradă de mutarea la Comedie.',
        'Batiștei are gradul I de risc seismic. Proba rămâne scrisă.'
      ]
    }),
    lesson({
      id: 'steaua-fara-nume',
      title: 'O stea găsită pe hârtie',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Dramatic',
          text: 'Numele stă înaintea replicii. Indicațiile de joc și de decor stau între paranteze. Vorbirea este dialog. Conflictul se joacă acum, nu îl povestește un narator.'
        }
      ],
      theory: [
        'Genul dramatic nu a fost compunere în lucrările citite. Metoda de caracterizare a fost. Mihail Sebastian a scris Steaua fără nume. Replicile nu se copiază aici.',
        'Faptele, pe scurt, din actul II, în aceeași seară, la profesor, într-un oraș de provincie. Camera este curată și săracă, cu cărți pe masă, pe scaune și pe jos. Pe fereastră se vede un cer de vară și munții.',
        'Profesorul are un catalog vechi, al lui Van Mersch, tipărit la Uppsala și Goteburg în 1763. Spune că are vreo sută cincizeci de ani și că este ieftină, un noroc. O caută de ani și a strâns bani din lecții.',
        'A calculat o stea care nu este la Hiparh, nici la Ptolomeu, nici la Kepler. La Herschel era o stea dublă, altceva. Herschel, 1738–1822, a descoperit planeta Uranus în 1781. Kepler, 1571–1630, a formulat legile mișcării planetelor.',
        'Diletant înseamnă om fără pregătirea de meserie a domeniului. Profesorul crede că o viziune mai largă este luată în râs: astrolog, șarlatan sau nebun.',
        'Necunoscuta întreabă cât de veche este cartea. Curiozitatea ei se vede din întrebare, deci indirect. Mai spune că se plictisește de aceiași oameni și că a mai fugit, dar s-a întors. Asta o spune ea însăși, deci direct.',
        'Pe cer, o stea mică la stânga, lângă a șasea din Ursa Mare, este Alcor. Steaua calculată de el este tot pe acolo și nu are încă nume. El vrea un nume de două silabe, care să meargă cu Alcor. Vega i s-ar fi părut frumos.',
        'Ideea principală: profesorul a calculat o stea care nu este în cataloagele vechi. Ideea secundară: femeia a plecat de plictiseală și, în seara aceasta, vede Ursa Mare. Cartea îi trebuie ca să verifice steaua.'
      ].join('\n\n'),
      example: [
        'Ce scrie: în camera săracă, profesorul vorbește despre un catalog din 1763 și despre o stea calculată, lângă Alcor, încă fără nume.',
        'Ce vezi: îi văd la masă, cu lampa pe o carte groasă și cu cerul în fereastră. Eu aș întreba de ce numele trebuie să aibă două silabe, pentru că el spune că Vega ar fi mers cu Alcor.',
        'Trăsătura lui este stăruința: a strâns bani ani de zile. Trăsătura ei este curiozitatea: întreabă vârsta cărții. Ambele se comentează pe fapt.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Secvență comentată: catalogul din 1763 și anii de căutare arată stăruința, nu eticheta silitor. Întrebarea despre vârsta cărții arată curiozitatea ei, fără să o numești curioasă și atât.'
        }
      ],
      tryThis: 'Spune patru trăsături ale textului dramatic. Formulează ideea principală și ideea secundară. Spune de ce a cumpărat cartea. Schițează caracterizarea profesorului: două date, două trăsături, două mijloace. Menționează Alcor, Vega și anul 1763.',
      keyPoints: [
        'Steaua fără nume se cunoaște din numele dinaintea replicii și din indicațiile de joc.',
        'Catalogul lui Van Mersch este din 1763. Steaua calculată stă lângă Alcor și încă n-are nume.',
        'Stăruința lui se vede în anii de căutare. Curiozitatea ei se vede în întrebare.'
      ]
    }),
    lesson({
      id: 'parti-propozitie',
      title: 'Funcția, cu toate constrângerile',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Toate condițiile',
          text: 'La itemul cu două enunțuri, fiecare ia punctul doar dacă funcția, cazul, tipul enunțului și semnul final sunt toate bune.'
        }
      ],
      theory: [
        'Subiectul simplu: El citește. Subiectul multiplu: Maria și Dan citesc. Subiectul inclus stă în desinență: Citești o poezie. Subiectul subînțeles lipsește la vedere: Citește o poezie.',
        'Predicatul verbal: El cântă. Hai cu noi este predicat verbal, interjecție predicativă. Predicatul nominal: El este un pianist. Ea a devenit doctor.',
        'Complementul direct: Copilul desenează o floare. Indirect: Mama le oferă copiilor un desen. Prepozițional: Profesorul ne vorbește despre teatru.',
        'De loc: aici, în Anglia. De mod: bine, cu prietenie. De timp: atunci, anul trecut. De cauză: De mândru ce era, nu ne-a ajutat. De scop: pentru victorie.',
        'Atributul stă lângă substantiv: cartea de poezii, al doilea copil. Apoziția, mențiune: Desenul surorii mele, Maria.',
        'Dacă subliniem o carte în Profesorul le-a arătat elevilor o carte, funcția este complement direct, iar elevilor este complement indirect. Le este pronume cu funcție de complement indirect.',
        'Este cartea de matematică a bunicului: este cartea este predicat nominal, de matematică și a bunicului sunt atribute. Ar fi ajuns actor este nominal. A însemnat cutia cu un creion este predicativ, dacă a însemna înseamnă a marca.',
        'Orașul doarme: oraș este subiect. Văd orașul: complement direct. Plec din oraș: circumstanțial de loc, acuzativ cu prepoziție.'
      ].join('\n\n'),
      example: [
        'Enunț interogativ, complement indirect, dativ: Cui i-a arătat profesorul cartea? Enunț asertiv, atribut în genitiv: Cartea bunicului este veche.',
        'Enunț negativ, complement direct: Nu a găsit catalogul. A ajuns actor este copulativ. A ajuns la teatru este predicativ, pentru că spune unde.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Citești o poezie. Subiectul este inclus în desinența -ești: tu. Nu este scris pe hârtie și totuși se înțelege. Nu îl căuta ca substantiv.'
        }
      ],
      practice: [
        '1) Construiește câte un enunț în care oraș este subiect și complement direct.',
        '2) Deosebește Ar fi ajuns actor de A ajuns la teatru.',
        '3) Spune funcția lui le în Profesorul le-a arătat elevilor o carte.',
        '4) Numește subiectul inclus din Citești.'
      ].join('\n\n'),
      answers: [
        'Orașul doarme. Văd orașul.',
        'primul este nominal, al doilea este predicativ și de loc',
        'complement indirect',
        'tu, în desinență'
      ],
      mistakes: 'A ajuns actor nu este predicativ doar pentru că verbul pare de mișcare. Numele predicativ arată o însușire sau o identitate, nu locul.',
      tryThis: 'Construiește un enunț interogativ cu complement indirect și unul asertiv cu atribut în genitiv, fiecare cu semnul potrivit.',
      keyPoints: [
        'Subiectul poate fi simplu, multiplu, inclus sau subînțeles.',
        'Este un pianist este predicat nominal. Cântă este predicat verbal.',
        'Le, lângă a arătat, este complement indirect. Punctul cere toate condițiile deodată.'
      ]
    }),
    lesson({
      id: 'grafica-text',
      title: 'Cum arată pagina',
      kind: 'comunicare',
      boxes: [
        {
          type: 'atentie',
          title: 'Nu ține loc de fapt',
          text: 'Grafica ajută prezentarea și nu se punctează la examen. Un titlu mare nu înlocuiește informația.'
        }
      ],
      theory: [
        'O pagină câștigă atenția prin font, mărime și culoare alese cu măsură, prin titlu scos în evidență, prin cuvinte-cheie cu aldine și printr-o imagine care chiar ține de subiect.',
        'La mijloacele digitale contează desenele, fotografiile, graficele, schemele și dimensiunea fontului. Scrisul de mână lizibil ține de caiet, nu de editor.',
        'Constelațiile, pe definiția folosită aici, sunt grupuri de stele unite de linii imaginare, ca niște hărți pe cer, în număr de 88. Sursa numită este Catherine D. Hughes.',
        'Profesorul din piesă caută o stea în Ursa Mare. Faptul legat de grafică este că un titlu mare nu înlocuiește catalogul și anul.',
        'Înainte de a rescrie, citești observația colegului și păstrezi doar ce îndreaptă o faptă greșită sau o neclaritate. Nu mărești fontul ca să ascunzi că nu ai un fapt.',
        'Două variante despre constelații pot spune același lucru: 88 de grupuri, linii imaginare între stele. Deosebirea de grafică poate fi titlul mare și o listă, față de un bloc compact.',
        'La o prezentare despre stea, anul catalogului și numele Ursa Mare stau în frază, nu doar în titlu. Colegul poate cere o listă. Tu păstrezi faptul și schimbi doar așezarea.',
        'Fontul mare ajută de la distanță. Nu umple pagina. Dacă tot textul este titlu, cititorul nu mai știe ce este informație și ce este decor.',
        'O schemă cu 88 de grupuri este utilă doar dacă lângă ea stă definiția: linii imaginare între stele. Fără definiție, cifra rămâne decor.'
      ].join('\n\n'),
      example: [
        'Asemănarea: ambele variante informează despre 88 de grupuri. Deosebirea: una are titlu și listă, cealaltă este un bloc.',
        'Elementele de bifat pentru o prezentare digitală sunt desenele, fotografiile, graficele, schemele și dimensiunea fontului. Lizibilitatea de mână rămâne la caiet.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Observație utilă: anul 1763 lipsește din titlu. O rescrii în frază, nu mărești fontul. Observație inutilă: pune titlul cu roșu, fără să îndrepți un fapt.'
        }
      ],
      tryThis: 'Spune ce este o constelație și câți astfel de grupuri numește lecția. Alege elementele digitale din listă și lasă deoparte scrisul de mână. Scrie cinci rânduri despre profesor, apoi marchează titlul și un cuvânt-cheie.',
      keyPoints: [
        'Constelațiile sunt grupuri de stele, 88 pe definiția folosită aici.',
        'La calculator contează imaginea, schema și mărimea fontului.',
        'Observația colegului se păstrează doar dacă îndreaptă textul.'
      ]
    }),
    lesson({
      id: 'atributiva',
      title: 'Atributiva, cu elementul de relație',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Atributivă',
          text: 'Face în frază treaba atributului. Se transcrie întreagă, cu elementul de relație, și i se spune felul exact: propoziție atributivă.'
        }
      ],
      theory: [
        'Algoritmul: numeri predicatele, desparți propozițiile, întrebi de la substantivul, pronumele sau numeralul determinat. Apare în aproape fiecare lucrare citită, alături de completiva directă.',
        'Planul propus de el era foarte bun: propus este atribut adjectival. Planul pe care l-a propus el era foarte bun: pe care l-a propus el este atributivă.',
        'Poate sta după regentă: Am vizitat locul unde am învățat. Poate sta înăuntrul regentei: Locul unde am învățat nu este departe.',
        'În Actorul care ne-a dat un autograf este celebru, care este pronume relativ și subiect în atributivă. Cartea despre care mi-ai zis determină un substantiv. Al doilea, care a vorbit, determină un numeral.',
        'Faptul că mi-a explicat m-a ajutat este introdusă prin că. Ziua când vom fi pe scenă este introdusă prin când.',
        'Dacă informația doar restrânge, nu pui virgulă: Am ascultat un singur cântec care are ritm. Dacă este în plus, pui virgulă: Am ascultat un singur cântec, care are ritm.',
        'Forme de îndreptat: vedeta al cărei cântec, nu a cărei, pentru că al se acordă cu cântecul. Albumele vechi pe care vrea să le vândă, cu pe, pentru că sunt complement direct.',
        'Artista despre care ți-am zis va veni, fără virgulă între subiect și predicat. Problema cărui coleg să-i ia un interviu: cărui este dativ, iar să-i se scrie cu cratimă.',
        'Atributul se poate desfășura: melodia lansată devine melodia care a fost lansată. La școală, atributiva poate sta într-o piesă. Metoda rămâne pe fraza din față. Replicile nu se lipesc.'
      ].join('\n\n'),
      example: [
        'Predicate în Locul unde am învățat nu este departe: am învățat și este. Atributiva: unde am învățat. Elementul: unde. Cuvântul determinat: locul. Fără virgulă, pentru că spune care loc.',
        'Piesa pe care am văzut-o ieri mi-a plăcut. Atributiva: pe care am văzut-o ieri. Ideea că plecăm diseară mi s-a părut bună: că plecăm diseară este atributivă introdusă prin conjuncție.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Un singur cântec care are ritm restrânge: care cântec. Un singur cântec, care are ritm adaugă o informație. Virgula schimbă sensul, nu este podoabă.'
        }
      ],
      practice: [
        '1) Transcrie atributiva din Locul unde am învățat nu este departe și spune cuvântul determinat.',
        '2) Corectează vedeta a cărei cântec.',
        '3) Transformă în atributivă grupul melodia lansată.',
        '4) Spune când se pune virgula înaintea atributivei.'
      ].join('\n\n'),
      answers: [
        'unde am învățat; locul',
        'vedeta al cărei cântec',
        'melodia care a fost lansată',
        'când informația este în plus, nu când restrânge'
      ],
      mistakes: 'Al se acordă cu obiectul posedat, nu cu posesorul. Să-i se scrie cu cratimă. Virgula între subiect și predicat, în Artista va veni, nu are ce căuta.',
      tryThis: 'Construiește o atributivă cu care și una cu că. Arată deosebirea de virgulă dintre cântecul care are ritm și cântecul, care are ritm.',
      keyPoints: [
        'Atributiva ține locul atributului și se transcrie cu elementul de relație.',
        'Virgula marchează informația în plus, nu pe cea care restrânge.',
        'Al se acordă cu obiectul posedat: al cărei cântec. Cărui coleg este dativul.'
      ]
    }),
    lesson({
      id: 'completiva-directa',
      title: 'Completiva directă, cea mai deasă',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Completivă directă',
          text: 'Face treaba complementului direct. Întrebarea pleacă de la verb: ce sau pe cine. După regentă, de obicei, nu ia virgulă.'
        }
      ],
      theory: [
        'Am aflat răspunsul: răspunsul este complement direct. Am aflat care este răspunsul și Am aflat că el a răspuns sunt completive directe.',
        'Determină un verb, o locuțiune verbală sau o interjecție predicativă: Am scris ce am reținut. Băgase de seamă că nu spuneai adevărul. Uite că am terminat.',
        'O introduc un pronume relativ, un adverb relativ sau o conjuncție: că, să, ca să, dacă. Știu să rezolv exercițiul.',
        'L-am anunțat unde vom merge mâine: unde este adverb relativ, iar subordonata rămâne completivă directă, pentru că întreb ce l-am anunțat.',
        'În Am văzut pe cine a întrebat, pe cine este și element de relație, și complement direct în subordonată. Dacă stă înainte, virgula este facultativă: De unde a venit, a uitat.',
        'În Uite că am ajuns și am adus aparatul pe care mi l-ai dat ieri sunt două completive directe, că am ajuns și și am adus aparatul, plus o atributivă, pe care mi l-ai dat. Nu sunt trei completive directe.',
        'Nu am aflat când începe piesa: când este adverb relativ, nu pronume. Am ascultat ce mi-ai spus conține completiva directă ce mi-ai spus.',
        'Regenta se recuperează din întrebare: ce nu i-am povestit, ce fac, ce m-a întrebat, ce a auzit. Virgula nu stă între am aflat și că.'
      ].join('\n\n'),
      example: [
        'Transcriere: că nu ești singur. Felul: completivă directă. Regenta: știi. Elementul: că.',
        'Nu i-am povestit cum am învățat să cânt. Completiva: cum am învățat să cânt. Elementul: cum. Fac ce mi-ai zis: ce mi-ai zis. M-a întrebat dacă am terminat: dacă am terminat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A auzit că l-ai lăudat. Completivă directă: că l-ai lăudat. Regenta: a auzit. Dacă pui virgulă înainte de că, semnul este în plus.'
        }
      ],
      practice: [
        '1) Transcrie completiva directă din Știu că plecăm și numește regenta.',
        '2) Spune câte completive directe are Uite că am ajuns și am adus aparatul pe care mi l-ai dat ieri.',
        '3) Spune ce fel este pe care mi l-ai dat în aceeași frază.',
        '4) Alege: când, în Nu am aflat când începe piesa, este pronume sau adverb.'
      ].join('\n\n'),
      answers: [
        'că plecăm; regenta este știu',
        'două',
        'atributivă',
        'adverb relativ'
      ],
      mistakes: 'Trei completive directe în fraza cu Uite este o numărare greșită. Atributiva de la final nu se numără la directe.',
      tryThis: 'Construiește o completivă directă cu că și una cu ce. Pune, apoi scoate, virgula din De unde a venit a uitat și spune când este îngăduită.',
      keyPoints: [
        'Completiva directă răspunde la ce sau pe cine și se transcrie întreagă.',
        'După regentă nu ia virgulă. Înaintea regentei, virgula este facultativă.',
        'În fraza cu Uite sunt două completive directe și o atributivă.'
      ]
    }),
    lesson({
      id: 'structuri-text',
      title: 'Narativ, descriptiv, dialogat',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Trei tipare',
          text: 'Narativul are personaje, succesiune, timp și spațiu. Descriptivul spune cum arată un loc sau un om. Dialogatul are replici. În același text pot sta mai multe secvențe.'
        }
      ],
      theory: [
        'La itemul despre tipar se spune ce se vede în text, nu definiția tocită. Textul dramatic, ca specie de compunere, a rămas în plan scurt. Trăsăturile lui se folosesc doar când textul din față este o piesă.',
        'O scrisoare pierdută, de I.L. Caragiale, a fost scrisă și jucată în 1884 și publicată în 1885, în Convorbiri literare. Replicile nu se copiază.',
        'Faptele, pe scurt: prefectul Tipătescu îl pune pe Pristanda să spună ce a fost aseară la Cațavencu, pentru că se grăbește. Pristanda a ascultat de pe gard. Înăuntru se juca cărți. O scrisoare era gata să fie citită. Un chibrit aruncat îl face pe Pristanda să alunece. Prefectul vrea să afle despre cine este scrisoarea.',
        'Zodia Cancerului sau vremea Ducăi-Vodă, de Mihail Sadoveanu, 1880–1961, a apărut în 1929. Hatmanul este cărunt, mai înalt decât domnul, cu vorba repezită. Solul nu a venit pe drumul așteptat. A fost ocolit și intră în Iași teafăr. Boierii vor să se răzvrătească, dar de la sfat până la faptă mai este cale.',
        'Cișmigiu & Comp., de Grigore Băjenaru, 1907–1986, a apărut în 1942. Naratorul se întoarce în parc după mulți ani. Pleca pe jos spre liceu. Nu întârzia decât când prima oră era grea. Trăsătura lui este punctualitatea, cu această excepție calculată.',
        'Secvența parcului este descriptivă. Drumul spre liceu este narativ. La Sadoveanu stau portretul, știrea despre sol și dialogul. La piesă stau și dialogul, și povestirea nopții.',
        'Pentru activitatea despre Viena, jurnalul spune că la șapte ani copilul știa românește și puțin franțuzește, că în 1888 era la Viena ca școlar și că de mic a intrat la clasele de vioară. Orașul este numit un amestec de limbi. Turnul amintit este cel al bisericii Sfântul Ștefan.',
        'Elementul comun dintre parcul din 1942 și Viena din 1888: un fost școlar măsoară un oraș prin amintire. Anii de ținut: 1884, 1885, 1929, 1942.'
      ].join('\n\n'),
      example: [
        'Textul despre șantaj și candidatură este narativ. Portretul impulsivității este descriptiv. Replicile sunt dialog.',
        'Ideea principală la Sadoveanu: solul ajunge teafăr, pe un drum ocolit. Ideea secundară: răzvrătirea este încă doar vorbă. La Băjenaru, punctualitatea are o excepție aleasă, ora grea.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Două trăsături narative din drumul spre liceu: un personaj și o succesiune. Descrierea parcului nu are deznodământ. Ea spune cum arată locul. Nu o eticheta narativă doar pentru că stă în același capitol.'
        }
      ],
      tryThis: 'Asociază rezumatul, portretul și replicile cu narativ, descriptiv și dialogat. Spune de ce povestește Pristanda, în 30–50 de cuvinte. Formulează ideea principală și pe cea secundară de la drumul solului. Notează anii 1884, 1885, 1929 și 1942.',
      keyPoints: [
        'Narativul are succesiune, descriptivul spune cum arată, dialogul are replici.',
        'O scrisoare pierdută a fost jucată în 1884 și publicată în 1885. Zodia Cancerului a apărut în 1929. Cișmigiu & Comp. a apărut în 1942.',
        'De la sfat până la faptă mai este cale. Naratorul din parc este punctual, cu întârzieri alese.'
      ]
    }),
    lesson({
      id: 'completiva-indirecta',
      title: 'Completiva indirectă, cui',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Completivă indirectă',
          text: 'Face treaba complementului indirect și răspunde la cui. Nu se introduce prin conjuncții subordonatoare. Elementul este, de obicei, cui.'
        }
      ],
      theory: [
        'Trimite e-mail colegului: colegului este complement indirect, dativ. Trimite e-mail cui ți-a scris: cui ți-a scris este completivă indirectă.',
        'Pronumele are rol dublu și stă în dativ ca element de relație. În Răspund cui m-a întrebat, cui este subiect în subordonată. În Nu răspund cui nu-i pasă, cui este complement indirect în subordonată.',
        'Stă, de obicei, după regentă și nu ia virgulă. Ofer o floare cui cântă. Dau sfaturi cui mă ascultă. M-am adresat cui era acolo.',
        'Restitui pixul cui l-a pierdut: cui este în dativ. Vând ce găsesc cui are nevoie conține o completivă indirectă, cui are nevoie, și o completivă directă, ce găsesc.',
        'În Dau cui are nevoie, cui nu este conjuncție. În Dau cui îmi cere lucrările este o singură completivă indirectă, nu două.',
        'Proverbul Avarul pierde mai mult decât cheltuiește cel darnic poate fi opinia unei compuneri. Opinia are ipoteză, două argumente și concluzie. Două completive indirecte se integrează în text, nu se lipesc la final ca etichetă.',
        'Oamenii aduc laude câștigătorului devine Oamenii aduc laude cui a câștigat. Găsitorului îi ofer recompensă devine Cui a găsit obiectul îi ofer recompensă.'
      ].join('\n\n'),
      example: [
        'Am întins o mână de ajutor cui mi-a cerut. Completiva indirectă: cui mi-a cerut. Regenta: am întins. Elementul: cui, pronume relativ, dativ.',
        'Scrie un răspuns cui a depus cererea. Juriul a înmânat diploma cui a câștigat locul întâi. Ambele au aceeași întrebare: cui.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Vând ce găsesc cui are nevoie. Directă: ce găsesc, întrebarea ce vând. Indirectă: cui are nevoie, întrebarea cui vând. Nu le pune pe amândouă sub același nume.'
        }
      ],
      practice: [
        '1) Transcrie completiva indirectă din Am cântat cui a venit.',
        '2) Spune de ce nu poate începe cu că.',
        '3) Câte completive indirecte are Dau cui îmi cere lucrările?',
        '4) Înlocuiește câștigătorului cu o completivă indirectă în Oamenii aduc laude câștigătorului.'
      ].join('\n\n'),
      answers: [
        'cui a venit',
        'nu se introduce prin conjuncție',
        'una',
        'Oamenii aduc laude cui a câștigat'
      ],
      mistakes: 'Cui nu este conjuncție. Două indirecte în Dau cui îmi cere lucrările este o numărare greșită.',
      tryThis: 'Transcrie completiva din Dă cartea înapoi cui ți-a împrumutat-o. Spune că Vând ce găsesc cui are nevoie are o directă și o indirectă.',
      keyPoints: [
        'Completiva indirectă răspunde la cui și nu se introduce prin conjuncție.',
        'Cui este pronume relativ în dativ. După regentă nu ia virgulă.',
        'Vând ce găsesc cui are nevoie are o directă și o indirectă.'
      ]
    }),
    lesson({
      id: 'completiva-prepozitionala',
      title: 'Mă gândesc că nu este directă',
      kind: 'limba',
      boxes: [
        {
          type: 'atentie',
          title: 'Nu o confunda',
          text: 'Știu că plec este completivă directă. Mă gândesc că plec este completivă prepozițională, pentru că verbul cere la.'
        }
      ],
      theory: [
        'Completiva prepozițională face treaba complementului prepozițional. Mă gândesc la examen: la examen este complement. Mă gândesc la ce materie voi da examen și Mă gândesc că voi da examen sunt ambele prepoziționale, nu directe.',
        'Întrebarea este la ce, de ce, despre ce, cu cine, nu ce am citit. Determină un verb, un adverb, un adjectiv sau o interjecție: S-a gândit unde să plece. Și-a dat seama că a greșit. Sunt dornici să obțină performanță. Vai de cine a întârziat.',
        'Stă, de obicei, după regentă și nu ia virgulă. În Se vorbește despre cine va fi ales, cine nu este în dativ. Este acuzativ cu despre.',
        'M-am întristat de plecarea sa nu conține o propoziție, ci un complement cu substantiv. Mă tot gândesc ce îmi cumpăr conține o completivă prepozițională. S-a mirat că a venit și că a vorbit conține două.',
        'Vă mulțumim pentru că ați participat este corect. Vă mulțumesc că ne-ați indicat drumul este și el corect: și că, și pentru că pot deschide această subordonată după a mulțumi.',
        'În fraza despre educația prin arta dramatică, care completează formele clasice este atributivă. În Teatrul îi determină pe oameni să privească altfel, să este conjuncție subordonatoare.',
        'Teatrul educativ pornește de la ideea că oamenii își schimbă purtarea uitându-se la alții. Personajele devin o oglindă. Întrebarea cui îi este de folos rămâne o completivă indirectă, separată.'
      ].join('\n\n'),
      example: [
        'Mă bucur de succesul lui devine Mă bucur că el a avut succes. A doua propoziție este completivă prepozițională. Elementul: că.',
        'Își aduce aminte de ce i-a spus bunica. Mi-e teamă să nu uit versurile. Se gândea care sfat este cel mai bun. Mă gândesc că voi pleca nu se etichetează directă.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Știu că voi da examen: directă, întrebarea ce știu. Mă gândesc că voi da examen: prepozițională, pentru că a se gândi cere la. Același că nu decide felul. Verbul îl decide.'
        }
      ],
      practice: [
        '1) Deosebește Știu că voi da examen de Mă gândesc că voi da examen.',
        '2) Transcrie completiva din Mi-e teamă să nu uit versurile.',
        '3) Este M-am întristat de plecarea sa o propoziție?',
        '4) Spune dacă mulțumesc că și mulțumesc pentru că sunt ambele corecte.'
      ].join('\n\n'),
      answers: [
        'prima este directă, a doua este prepozițională',
        'să nu uit versurile',
        'nu, este complement cu substantiv',
        'da, ambele sunt corecte'
      ],
      mistakes: 'Despre cine nu pune pronumele în dativ. De plecarea sa nu este propoziție, deci nu are fel de subordonată.',
      tryThis: 'Construiește o frază în care să avem mai multe inițiative să fie completivă prepozițională. Construiește și una în care același grup să fie completivă directă, schimbând verbul.',
      keyPoints: [
        'Mă gândesc că plec nu este completivă directă. Știu că plec este.',
        'Despre cine nu pune pronumele în dativ. De plecarea sa nu este propoziție.',
        'Mulțumesc că și mulțumesc pentru că sunt ambele corecte.'
      ]
    }),
    lesson({
      id: 'valori-lume',
      title: 'Patru nume și o broșură',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Asociere',
          text: 'La examen contează valoarea legată de un nume sau de un titlu și de un autor. Afișul și broșura nu sunt itemi. Nu inventa o operă.'
        }
      ],
      theory: [
        'Ziua Culturii Naționale este 15 ianuarie. Afișul grupează, la ore diferite, un concert, un spectacol și un documentar.',
        'Numele de pe afiș: Nicolae Grigorescu, Constantin Brâncuși, George Enescu, Ciprian Porumbescu, Matei Vișniec și Eugen Ionescu. În franceză, numele de scenă al lui Eugen Ionescu este Eugène Ionesco.',
        'Nichita Stănescu spunea că un catren frumos ar putea fi patru nume: Eminescu, Grigorescu, Enescu, Brâncuși. Le ții ca bancă de asociere, nu ca vers de memorat.',
        'Valoarea: o cultură se recunoaște prin oamenii și prin lucrările ei. Proiectul de grup este o broșură, Valori culturale românești.',
        'Rolurile sunt editorul textului, editorul imaginilor, traducătorul și tehnoredactorul. Traduci un fragment scurt într-o limbă studiată la școală, ca broșura să circule.',
        'Prezentarea orală nu este proba. Rămâne utilă doar dacă, la scris, poți spune de ce o lucrare contează.',
        'Pentru asociere, un model: valoarea este grija pentru o formă limpede. Numele este Constantin Brâncuși. Prezentarea, într-o frază: a căutat o formă simplă. Afișul din 15 ianuarie pune lângă el și pictura, și muzica, și teatrul.',
        'Dacă nu ai citit o operă, nu îi inventa titlul. Rămâi la numele de pe afiș și la valoarea pe care o poți spune în două rânduri. Broșura circulă doar dacă traducerea este o frază reală, nu un rând gol.'
      ].join('\n\n'),
      example: [
        'Broșura are patru roluri, nu un singur copil care face totul. Editorul scrie textul. Cel de imagini alege ilustrația. Traducătorul mută o frază. Tehnoredactorul așază pagina.',
        'Catrenul cu patru nume nu se așază ca poezie de copiat. Se folosește când legi o valoare de un creator.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Valoare: muzica care trece de o sală. Nume: George Enescu. Două rânduri: afișul din 15 ianuarie îl pune lângă pictură și teatru, deci cultura nu stă într-o singură artă.'
        }
      ],
      tryThis: 'Notează data de 15 ianuarie și cele șase nume de pe afiș. Spune cele patru nume din catren, fără să le așezi ca vers. Alege un nume și o valoare și scrie fraza de asociere. Împarte broșura în cele patru roluri.',
      keyPoints: [
        'Sărbătoarea culturii naționale cade în 15 ianuarie.',
        'Pe afiș stau Grigorescu, Brâncuși, Enescu, Porumbescu, Vișniec și Eugen Ionescu.',
        'La broșură lucrează patru roluri: text, imagini, traducere și așezare în pagină.'
      ]
    }),
    lesson({
      id: 'recap-valori',
      title: 'Patru feluri și un oraș',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Patru feluri',
          text: 'Atributiva stă lângă un nume. Directa răspunde la ce. Indirecta răspunde la cui. Prepoziționala stă după un verb care cere prepoziție.'
        }
      ],
      theory: [
        'Recapitularea nu este foaia cu puncte și nu este fișa de observare. Pe o scenă a noastră se văd toate cele patru feluri.',
        'Mara spune: Cartea pe care am luat-o din raft este despre un oraș. Știu că numele lui vine din două cuvinte. I-am scris cui m-a întrebat. Mă gândesc la ce voi vedea prima dată.',
        'Cartea pe care am luat-o este atributivă. Știu că numele lui vine este completivă directă. Cui m-a întrebat este completivă indirectă. La ce voi vedea este completivă prepozițională.',
        'Fapte de ținut, ca să le poți folosi într-un text explicativ: numele Ierusalim vine din ebraică, ir înseamnă oraș și shalom înseamnă pace.',
        'Orașul este reper pentru comunitatea iudaică, prin Zidul Plângerii, pentru cea creștină, prin Biserica Sfântului Mormânt, și pentru cea musulmană, prin Moscheea Al-Aqsa. Textul care le spune este explicativ, nu are momente de subiect.',
        'Pentru caracterizare, fără replici lipite: în Titanic Vals, de Tudor Mușatescu, o familie așteaptă o moștenire, iar una dintre femei se teme că banii pot lua altă cale. Trăsătura iese din teamă, deci indirect.',
        'Într-o povestire despre Calea Moșilor, tramvaiul trece prin mijloc, iar strada este numită frumoasă pentru că acolo se va locui. Pe care am întâlnit-o este atributivă. Pentru că vom locui aici este cauzală.',
        'La compunere, narativul de 150 de cuvinte are succesiune și două elemente de timp și de loc. Cauzala se reia în unitatea următoare.'
      ].join('\n\n'),
      example: [
        'Ce scrie: Mara are o carte despre un oraș al cărui nume leagă orașul de pace și în care trei locuri de rugăciune stau pentru trei comunități.',
        'Ce vezi: o văd cu cartea deschisă, iar în text sunt trei nume de lăcașuri. Eu aș căuta pe hartă Zidul, biserica și moscheea, pentru că textul le dă ca repere.',
        'Ir înseamnă oraș. Shalom înseamnă pace. Atributiva este pe care am luat-o din raft.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Completiva directă: că numele lui vine din două cuvinte. Elementul: că. Completiva indirectă: cui m-a întrebat. Elementul: cui. Nu le schimba între ele doar pentru că ambele au pronume.'
        }
      ],
      tryThis: 'Transcrie cele patru subordonate ale Marei și spune elementul fiecăreia. Spune ce înseamnă ir și shalom și numește cele trei repere. Răspunde adevărat sau fals: textul despre oraș este explicativ. Are momente de subiect. Numele leagă orașul de pace.',
      keyPoints: [
        'Atributiva stă lângă un nume, directa răspunde la ce, indirecta la cui, prepoziționala după un verb cu prepoziție.',
        'Ierusalim leagă ir, oraș, și shalom, pace.',
        'Cele trei repere sunt Zidul Plângerii, Biserica Sfântului Mormânt și Moscheea Al-Aqsa.'
      ]
    })
  ]
};
