// Clasa a VI-a, după manualul aprobat:
// Loredana Dorobăț, Lorelai Slavu, Violeta Nania,
// Limba și literatura română, clasa a VI-a, Litera, 2023, cod A1470,
// aprobat prin OM 5022/06.07.2023, conform OMEN 3393/28.02.2017.
//
// Aici este doar prima bucată: recapitularea inițială și Unitatea 1,
// Lumea de acasă, până la legendă. Proiectul, recapitularea și evaluarea
// unității vin în bucata următoare. Nu copiem fragmente, poezii, scrisori
// sau legende. Scena de care are nevoie copilul este scrisă în lecție.

function lesson(id, title, block) {
  const example = String(block.example || '').replace(/^Exemplu lucrat:\s*/i, '');
  const platter = [block.theory, `Exemplu lucrat: ${example}`, block.tryThis, block.recap].join('\n\n');
  return {
    id,
    title,
    platter,
    theory: block.theory,
    example,
    tryThis: block.tryThis,
    recap: block.recap
  };
}

const MANUAL = {
  code: 'A1470',
  title: 'Limba și literatura română. Manual pentru clasa a VI-a',
  author: 'Loredana Dorobăț, Lorelai Slavu, Violeta Nania',
  publisher: 'Grup Editorial Litera',
  year: 2023,
  isbn: '978-630-319-187-4',
  approval: 'Ordinul ministrului educației nr. 5022/06.07.2023',
  curriculum: 'OMEN nr. 3393/28.02.2017'
};

const COMPETENCIES = [
  { code: '1.3', text: 'Recunoaște locul, momentul și relația dintre cei care vorbesc.' },
  { code: '1.4', text: 'Poartă un dialog scurt, pe rând, cu gest și cu ton potrivit.' },
  { code: '2.3', text: 'Spune ce scrie într-un text narativ, ce vede și ce părere are, legată de o faptă.' },
  { code: '2.4', text: 'Stă pe text până la capăt și alege o bucată care îl oprește.' },
  { code: '3.1', text: 'Scrie o pagină de jurnal, o scrisoare sau o povestire la persoana I.' },
  { code: '3.3', text: 'Își recitește textul: ortografie, punctuație, așezare în pagină.' },
  { code: '3.4', text: 'Spune ce i-a ieșit bine la scris și ce mai are de îndreptat.' },
  { code: '4.2', text: 'Alege sensul după context: propriu, figurat, sinonim, omonim.' },
  { code: '4.3', text: 'Desparte în silabe și recunoaște diftongul, triftongul și hiatul.' },
  { code: '4.4', text: 'Scrie corect formele care se aud la fel, ca ea și ia.' },
  { code: '5.2', text: 'Recunoaște o valoare într-o legendă: curaj, adevăr, bunătate.' }
];

const UNITS = [
  {
    id: 'recapitulare-initiala',
    title: 'Recapitulare inițială',
    inOwnWords:
      'Înainte de unități, repeți cum citești o scenă și cum scrii o pagină de jurnal. Scena este în lecție. În unele manuale prima pagină vine din Cuore, de Edmondo de Amicis, iar a doua este o poezie despre un pisoi. La școală titlul poate fi altul.',
    toc: [
      'Pagina de jurnal și prima zi',
      'Indicii de timp și de spațiu',
      'Silaba, sunetul și enunțul',
      'Banda desenată scurtă'
    ],
    glossary: [
      { term: 'pagină de jurnal', meaning: 'O zi scrisă la persoana I, cu data, o formulă de adresare și emoția trăită.' },
      { term: 'indice', meaning: 'Cuvântul care arată când sau unde se petrece fapta.' }
    ],
    lessons: [
      lesson('jurnal-prima-zi', 'Pagina de jurnal', {
        theory: 'Pagina de jurnal este textul în care consemnezi o experiență reală, la persoana I. Notezi ziua și data. Folosești o formulă de adresare, ca Dragă jurnalule. Verbele stau la prezent și la perfect compus. Spui ce s-a întâmplat și ce ai simțit. În text intră și o secvență descriptivă scurtă. Luni, 15 septembrie, Mara a intrat în clasa a VI-a cu ghiozdanul nou. În clasă mirosea a cretă. Ea era bucuroasă și un pic speriată. A pus pe bancă un caiet albastru. Din scena asta faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.',
        example: 'Ce scrie: Luni, 15 septembrie, Mara a intrat în clasa a VI-a cu ghiozdanul nou și a pus pe bancă un caiet albastru. Ce vezi: O văd pe Mara în clasă, cu ghiozdanul nou și cu caietul albastru. Eu aș fi salutat un coleg, pentru că ea era bucuroasă și un pic speriată.',
        tryThis: 'Scrie o pagină de jurnal de 100–120 de cuvinte despre prima ta zi de școală. Pune data, formula Dragă jurnalule, persoana I, un verb la perfect compus, un verb la prezent și o descriere de două propoziții. La final scrie: Eu aș ..., pentru că ..., despre o faptă din textul tău.',
        recap: 'Pagina de jurnal notează ziua, data și o formulă de adresare, spune o experiență reală la persoana I și amestecă prezentul cu perfectul compus. Din scenă faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.'
      }),
      lesson('indicii-recap', 'Timpul, spațiul și firul', {
        theory: 'Înțelegerea textului începe cu cine, unde, când și ce iese. Indicele de timp arată când. Indicele de spațiu arată unde. Tema este numele scurt al întâmplării. Ideea principală este o propoziție: cine face ce. Comparația se recunoaște la cuvântul ca. Duminică dimineața, în grădina de lângă casă, un pisoi mic a intrat printre uluci. Era cât o floare, dar avea mustăți lungi. Fata i-a dat lapte cald și l-a numit Arpagic, pentru că era mic. Din scena asta faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.',
        example: 'Ce scrie: Duminică dimineața, în grădina de lângă casă, un pisoi mic a intrat printre uluci, iar fata i-a dat lapte cald și l-a numit Arpagic. Ce vezi: Văd grădina, ulucile, pisoiul mic și cana cu lapte. Eu aș fi lăsat și eu un pic de lapte, pentru că pisoiul era mic.',
        tryThis: 'Sâmbătă seara, pe prispa casei, băiatul a găsit o mănușă udă. Era rece ca gheața. A pus-o la sobă. Scrie trei propoziții: ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu Văd. Spune și care este comparația.',
        recap: 'Indicele de timp spune când, indicele de spațiu spune unde, tema este numele scurt, iar ideea principală spune cine face ce. Comparația stă la cuvântul ca, iar părerea ta se leagă de o faptă prin pentru că.'
      }),
      lesson('recap-constructie', 'Silaba, sunetul și enunțul', {
        theory: 'Silaba se rostește dintr-o dată și are o vocală. Vacanța are trei silabe: va-can-ța. Dimineață are patru: di-mi-nea-ță. Teatru are două: tea-tru. Litera este semnul, sunetul este ce auzi. În duceam, grupul ce se aude un sunet, deci sunt mai multe litere decât sunete. Câmpul lexical al școlii adună cuvinte ca ghiozdan, caiet și bancă. Enunțul asertiv spune o faptă și se încheie cu punct. Enunțul exclamativ arată o emoție puternică și se încheie cu semnul exclamării. Ca să îl faci interogativ, pui o întrebare și semnul întrebării. Subiectul spune cine face acțiunea. Atributul stă lângă un substantiv și spune care. La grade, pozitivul este forma simplă, comparativul de superioritate pune mai, iar superlativul pune cel mai.',
        example: 'Vacanța se desparte va-can-ța, dimineață se desparte di-mi-nea-ță, iar teatru se desparte tea-tru. Ghiozdan, caiet și bancă țin de câmpul școlii. Azi începe școala este asertiv. Ce zi lungă! este exclamativ și devine Ce zi este azi? Musafirul a intrat: musafirul este subiect. Musafirul mic: mic este atribut. Laptele cald este pozitiv, laptele mai cald este comparativ de superioritate, iar laptele cel mai cald este superlativ.',
        tryThis: 'Desparte în silabe vacanța, dimineață și teatru și scrie câte silabe are fiecare. Scrie trei cuvinte din câmpul școlii, un enunț asertiv, un enunț exclamativ și întrebarea făcută din el. Mai scrie o propoziție în care musafir este subiect și una în care musafir este atribut, apoi lapte la pozitiv, la comparativ de superioritate și la superlativ.',
        recap: 'Silaba are o vocală, litera nu este totuna cu sunetul, iar câmpul lexical strânge cuvintele aceleiași teme. Enunțul asertiv se încheie cu punct, cel exclamativ cu semnul exclamării, subiectul face acțiunea, iar atributul stă lângă substantiv.'
      }),
      lesson('banda-scurta', 'Trei cadre', {
        theory: 'Banda desenată scurtă spune o întâmplare în cadre, în ordine. În cadru stă desenul. În bulă stă vorba. Lângă o mișcare poți pune un sunet, ca poc sau miau. Ultimul cadru închide întâmplarea. Trei cadre ajung: intrarea, fapta, încheierea.',
        example: 'Cadrul 1: pisoiul intră în grădină, bula spune Miau. Cadrul 2: fata pune lapte, lângă cană scrie clip. Cadrul 3: pisoiul rămâne, bula spune Rămâi. Ordinea este intrare, faptă, încheiere.',
        tryThis: 'Desenează trei cadre despre pisoiul din grădină. În fiecare cadru pune o bulă scurtă. În al doilea cadru pune și un sunet de mișcare. Ultimul cadru arată că pisoiul rămâne.',
        recap: 'Banda desenată scurtă are cadre în ordine, o bulă pentru vorbă și un sunet pentru mișcare. Trei cadre ajung: intrarea, fapta și încheierea.'
      })
    ]
  },
  {
    id: 'lumea-de-acasa',
    title: 'Lumea de acasă',
    inOwnWords:
      'Unitatea 1 leagă casa de textul narativ: acțiune, timp, spațiu, autor, narator și personaje, apoi dialogul, scrisoarea, sensul cuvintelor, silaba și legenda. Scenele sunt în lecții. În unele manuale povestea casei este din Amintiri din copilărie, de Ion Creangă. Proiectul și evaluarea unității vin în bucata următoare. La școală titlul poate fi altul.',
    toc: [
      'Textul narativ literar. Acțiune, timp, spațiu',
      'Narațiunea la persoana I. Autor, narator, personaje',
      'Contextul de comunicare',
      'Tiparul textual narativ',
      'Scrisoarea',
      'Cuvântul: formă și sens',
      'Omonime și cuvinte polisemantice',
      'Diftong, triftong, hiat',
      'Despărțirea în silabe',
      'Valori etice în legende'
    ],
    glossary: [
      { term: 'narator', meaning: 'Vocea care povestește. La persoana I este și personaj.' },
      { term: 'omonim', meaning: 'Aceeași formă, sensuri care nu se leagă între ele, ca leul animal și leul ban.' },
      { term: 'legendă', meaning: 'Povestire scurtă care explică un lucru și amestecă o faptă reală cu una minunată.' }
    ],
    lessons: [
      lesson('deschidere-acasa', 'Ce vei lucra despre casă', {
        theory: 'Deschiderea unității este harta, nu lecția gata făcută. Tema este lumea de acasă. Vei lucra textul narativ în proză, acțiunea, timpul și spațiul, apoi autorul, naratorul și personajele. La comunicare vei vedea locul, momentul și relația dintre interlocutori. La redactare vei scrie narativ, la persoana I, și o scrisoare. La construcția comunicării vei relua sensul, sinonimele, antonimele, omonimele și silaba. La interculturalitate vei căuta o valoare într-o legendă. Competențele sunt unsprezece: 1.3, 1.4, 2.3, 2.4, 3.1, 3.3, 3.4, 4.2, 4.3, 4.4 și 5.2. Proiectul tematic și evaluarea stau în bucata următoare, nu le bifezi azi.',
        example: 'Azi harta anunță textul narativ și scrisoarea. Silaba este pe hartă, dar o lucrezi când îi vine rândul. Cele unsprezece competențe rămân ținta unității, nu o lecție terminată dintr-o privire.',
        tryThis: 'Scrie două propoziții. În prima spune că tema este lumea de acasă și că azi lucrezi textul narativ. În a doua numește competențele 1.3, 1.4, 2.3, 2.4, 3.1, 3.3, 3.4, 4.2, 4.3, 4.4 și 5.2 și spune că sunt unsprezece.',
        recap: 'Harta unității anunță narativul, dialogul, scrisoarea, sensul cuvintelor, silaba și legenda. Competențele sunt 1.3, 1.4, 2.3, 2.4, 3.1, 3.3, 3.4, 4.2, 4.3, 4.4 și 5.2, iar proiectul vine mai târziu.'
      }),
      lesson('narativ-acasa', 'Acțiunea, timpul și spațiul', {
        theory: 'Textul narativ este textul în care întâmplările urmează una după alta, în ordine. Poate fi în proză sau în versuri. Acțiunea este totalitatea întâmplărilor. Indiciile de spațiu arată unde. Indiciile de timp arată când, inclusiv un moment secundar. Personajele au roluri diferite. Dacă nu se schimbă nimic, textul este doar o descriere. În Amintiri din copilărie, de Ion Creangă, copilăria stă în casa părintească din Humulești, iar năzdrăvăniile pomenite de mamă țin de vară, nu de iarnă și nu de biserică. Duminică dimineața, în bucătăria de acasă, Mara a vărsat laptele. Mama a șters masa înainte de prânz. Mara a pus cana la loc. Din scena asta faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.',
        example: 'Ce scrie: Duminică dimineața, în bucătăria de acasă, Mara a vărsat laptele, iar mama a șters masa înainte de prânz. Ce vezi: Văd bucătăria, masa udă, cana și pe Mara lângă mamă. Eu aș fi șters și eu masa, pentru că laptele era vărsat înainte de prânz.',
        tryThis: 'Sâmbătă seara, pe prispă, băiatul a uitat caietul, apoi s-a întors după el. Scrie trei propoziții: ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu Văd. Mai scrie o propoziție în care spui că, în Amintiri din copilărie, casa copilăriei este la Humulești, iar năzdrăvăniile pomenite de mamă țin de vară.',
        recap: 'Textul narativ înșiră întâmplări legate, acțiunea este totalitatea lor, spațiul spune unde, iar timpul spune când. În Amintiri din copilărie casa este la Humulești, iar din scena din lecție spui ce scrie, ce vezi și ce ai face tu, cu pentru că.'
      }),
      lesson('autor-narator', 'Autor, narator, personaje', {
        theory: 'Autorul este omul real care scrie textul și stă în afara lui. Naratorul este vocea căreia autorul îi dă rolul să povestească. La persoana I, naratorul este și personaj, deci este subiectiv: vede cu ochii lui. La persoana a III-a, naratorul este obiectiv, ca un observator care nu intră în faptă. Personajele există în lumea textului. Pot fi oameni, animale, obiecte sau fenomene. Personajul principal ține toate momentele. Cel secundar contează, dar nu ține tot firul. Cel episodic apare într-o secvență sau în două. Figurantul este doar pomenit. Personajul individual este unul singur. Personajul colectiv este un grup care lucrează ca unul, de pildă clasa. Ion Creangă este autorul Amintirilor din copilărie. Nică povestește la persoana I, deci este narator subiectiv și personaj principal. În bucătărie, Mara spune: Eu am vărsat laptele. Mama șterge. Vecina este doar pomenită.',
        example: 'Ion Creangă este autorul, în afara cărții. Nică spune eu, deci este narator la persoana I și personaj principal. Mara spune Eu am vărsat laptele, deci și ea este narator-personaj în scena noastră. Mama, care șterge, este personaj secundar. Vecina doar pomenită este figurant.',
        tryThis: 'Scrie patru propoziții. În ele folosește cuvintele autor, narator, persoana I, principal, secundar și figurant. Spune cine este Ion Creangă față de Amintiri din copilărie și de ce Nică este narator subiectiv. Arată, pe scena cu laptele, cine face fapta și cine este doar pomenit.',
        recap: 'Autorul scrie și stă în afara textului, naratorul povestește, iar la persoana I naratorul este și personaj. Personajul principal ține firul, secundarul ajută, episodic apare puțin, iar figurantul este doar numit.'
      }),
      lesson('context-comunicare', 'Locul, momentul, relația', {
        theory: 'Comunicarea este schimbul de informații, idei și impresii între cel puțin două persoane, într-un context. Contextul are loc, moment, interlocutori, cunoștințe comune și relația dintre ei. Ca să iasă, fiecare este pe rând emițător și receptor. Comunicarea verbală folosește cuvintele. Cea nonverbală folosește fața, privirea, corpul și distanța. Emoțiile de bază citite pe față sunt bucuria, tristețea, surpriza, frica, dezgustul și furia. Comunicarea paraverbală este viteza, tonul, volumul și pauza. O întrebare completă răspunde la cine, cum, ce, când și unde. Zgomotul, neascultarea și distanța prea mare sunt bariere. În salon, un copil bate toba lângă un musafir. Musafirul nu aude salutul. Mama îi spune copilului să iasă. Din scena asta faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.',
        example: 'Ce scrie: În salon, copilul bate toba, musafirul nu aude salutul, iar mama îi spune să iasă. Ce vezi: Văd salonul, toba, copilul și musafirul cu mâna la ureche. Eu aș fi lăsat toba jos, pentru că musafirul nu aude salutul.',
        tryThis: 'Pe hol, la ora 8, două colege vorbesc despre temă, dar soneria acoperă vocea. Una zâmbește, cealaltă se încruntă. Scrie trei propoziții: ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu Văd. Numește locul, momentul, relația și bariera.',
        recap: 'Contextul de comunicare are loc, moment, interlocutori și relația dintre ei. Vorba este verbală, fața este nonverbală, tonul este paraverbal, iar zgomotul poate opri mesajul.'
      }),
      lesson('tipar-narativ', 'Cinci tipare, unul narativ', {
        theory: 'Tiparul textual este felul în care scrii, după scop. Sunt cinci: narativ, descriptiv, dialogat, explicativ și argumentativ. Tiparul narativ povestește întâmplări, are un narator subiectiv sau obiectiv, indicii de spațiu și de timp, personaje și verbe care mișcă fapta. Tiparul descriptiv arată cum este un loc sau un lucru. Tiparul dialogat înșiră replici. Tiparul explicativ te învață ceva, în pași. Tiparul argumentativ susține o părere cu un motiv. Ion Popescu-Gopo a făcut filmul Maria Mirabela, în care actorii stau lângă desene animate. Oache, Scăpărici și Omide trimit la apă, la foc și la aer. Asta este o informație despre film, nu povestea însăși.',
        example: 'Mara a vărsat laptele, apoi mama a șters masa este tipar narativ: sunt faptă, timp și personaje. Masa era udă și albă este tipar descriptiv. Unde pui cana? Pe raft este tipar dialogat. Ca să ștergi laptele, iei cârpa, apoi treci masa este tipar explicativ. Masa se șterge repede, pentru că laptele pătează este tipar argumentativ.',
        tryThis: 'Scrie câte o propoziție pentru fiecare tipar: narativ, descriptiv, dialogat, explicativ și argumentativ. În propoziția narativă pune un indice de timp. Mai scrie că Oache, Scăpărici și Omide, din filmul Maria Mirabela, trimit la apă, la foc și la aer.',
        recap: 'Cele cinci tipare sunt narativ, descriptiv, dialogat, explicativ și argumentativ. Tiparul narativ povestește, cu narator, timp, spațiu, personaje și verbe de mișcare.'
      }),
      lesson('scrisoare', 'Părțile scrisorii', {
        theory: 'Scrisoarea este o comunicare scrisă, trimisă cuiva. În colțul din dreapta sus stau locul și data. Formula de adresare stă la mijloc, sus, și se încheie cu virgulă: Dragă mamă, Dragul meu prieten, Stimată doamnă. Conținutul are introducere, cuprins și încheiere. Formula de încheiere stă în dreapta, după conținut: Cu drag, Cu respect. Semnătura vine imediat sub ea. Post-scriptumul, scris P.S., adaugă o informație uitată. O scrisoare poate fi familială, de felicitare, amicală, de recomandare sau de recunoștință. Ion Creangă i-a scris lui Mihai Eminescu din Iași, în decembrie 1877, și i se adresa cu Bădie Mihai. Regina Maria a scris la 29 iunie 1933 către țară și popor. Venise la 17 ani, era născută englezoaică și a lucrat să fie româncă. A fost numită Mama tuturor. În scrisoare pomenește castelul de la Bran și Balcicul. Nu copiem scrisorile. Le recunoaștem după părți.',
        example: 'În dreapta sus: Brașov, 3 octombrie. La mijloc: Dragă bunico, În cuprins: Am ajuns bine și mâine mergem pe munte. În dreapta: Cu drag, apoi semnătura Ana. P.S. Ți-am pus în plic o frunză. Locul, data, adresarea, cuprinsul, încheierea și semnătura sunt toate prezente.',
        tryThis: 'Scrie o scrisoare dintr-o tabără la munte, către un bunic. Pune locul și data în dreapta sus, formula Dragă bunicule, cu virgulă, trei propoziții în cuprins, formula Cu drag, semnătura ta și un P.S. de o propoziție. Nu copia o scrisoare gata făcută.',
        recap: 'Scrisoarea are loc și dată în dreapta sus, o formulă de adresare cu virgulă, cuprins, încheiere, semnătură și, dacă ai uitat ceva, P.S. Creangă i-a scris lui Eminescu din Iași, în decembrie 1877, iar Regina Maria a scris către țară la 29 iunie 1933.'
      }),
      lesson('vocabular-sens', 'Forma, sensul, contextul', {
        theory: 'Limba vorbită se face din sunete, este spontană și se îndreaptă spre ascultare. Limba scrisă se face din semne și ține reguli. Vocabularul este totalitatea cuvintelor unei limbi și se mișcă: apar cuvinte noi, dispar unele vechi, iar sensurile se schimbă. Cuvântul are formă, adică sunete, și sens, adică înțeles. Sinonimele au sens apropiat și formă diferită, ca trist și mâhnit. Antonimele au sens opus, ca vesel și trist. Omonimele au aceeași formă și sensuri care nu se leagă, ca părul din cap și părul pom. Contextul este enunțul în care stă cuvântul și alege sensul. Sensul propriu de bază este cel obișnuit, ca în A rupt o floare. Sensul propriu secundar vine dintr-o asemănare, ca în Mustul a făcut floare. Sensul figurat este expresiv, ca în Fata este floarea mamei. Cuvinte vechi sunt ieniceri, buzdugan, pârcălab și cușmă. Cuvinte noi sunt laptop, mouse și metrou. Cunoscute de toți rămân pom, sobă și fruct.',
        example: 'Trist și mâhnit sunt sinonime. Vesel este antonimul lui trist. În Tunde părul, păr înseamnă firele de pe cap. În Culege pere, păr înseamnă pomul. Floarea din grădină este sens de bază. Floarea de pe must este sens secundar. Floarea mamei este sens figurat. Laptop este cuvânt nou. Pârcălab este cuvânt vechi. Pom este cunoscut de toți.',
        tryThis: 'Scrie o propoziție cu sinonimele trist și mâhnit, una cu antonimele vesel și trist și două cu păr, una pentru fire și una pentru pom. Mai scrie floare cu sens de bază, cu sens secundar și cu sens figurat. Pune laptop la cuvinte noi și pârcălab la cuvinte vechi.',
        recap: 'Cuvântul are formă și sens, iar contextul alege sensul. Sinonimele se apropie, antonimele se opun, omonimele doar seamănă la formă, iar sensul poate fi de bază, secundar sau figurat.'
      }),
      lesson('omonime', 'Omonime și polisemie', {
        theory: 'Omonimele sunt cuvinte cu aceeași formă și cu sensuri care nu se leagă. Leu poate fi animalul sau banul. Omonimele lexicale țin de aceeași parte de vorbire. Cele totale se schimbă la fel în toată flexiunea, ca ban și bani, fie că este moneda, fie că este dregătorul din Evul Mediu. Cele parțiale nu au aceleași forme: corn, coarne la cerb și corn, cornuri la pateu. Mai sunt bandă, benzi la panglică și bandă, bande la grup. Ghid, ghizi la om și ghid, ghiduri la carte. Roman, romani la om și roman, romane la carte. Cot, coate la braț și cot, coturi la unghi. Omonimele lexico-gramaticale sunt părți de vorbire diferite: Eu port o ie și În port sunt vapoare. Omofonele se aud la fel și se scriu diferit: ea este pronume, ia este verb. Omografele se scriu la fel și se pronunță diferit: haină, substantiv, este haina, iar haină, adjectiv, înseamnă crud. Cuvântul polisemantic are mai multe sensuri legate. A ridica poate însemna a înălța, a construi, a sălta sau a crește. Polisemia arată că limba este bogată. Crud, despre un fruct, înseamnă necopt. Despre o vârstă, înseamnă fraged. Despre un vânt, înseamnă rău.',
        example: 'Ea ia creionul: ea este pronume, ia este verb. Haină nouă pe cuier este substantiv. O faptă haină este adjectiv și înseamnă crudă. Cerbul are coarne, iar în pungă sunt cornuri. Elicopterul s-a ridicat înseamnă s-a înălțat. Au ridicat o casă înseamnă au construit. Mărul crud este necopt.',
        tryThis: 'Scrie propoziții cu ea și ia, cu haină substantiv și haină adjectiv, cu coarne și cornuri, cu ban monedă și cu port substantiv. Mai scrie a ridica cu sensul a înălța și cu sensul a construi. Spune ce înseamnă crud despre un fruct și despre un vânt.',
        recap: 'Omonimele au aceeași formă și sensuri nelegate, omofonele se aud la fel și se scriu diferit, iar omografele se scriu la fel și se pronunță diferit. Cuvântul polisemantic își schimbă sensul, dar sensurile rămân legate, ca la a ridica.'
      }),
      lesson('diftong-hiat', 'Diftong, triftong, hiat', {
        theory: 'Sunetul este ce pronunți. Litera este semnul. Vocalele a, ă și î sunt mereu vocale și pot face singure o silabă. Și e, i, o, u sunt vocale când sunt pline. Semivocalele e, i, o, u se aud mai slab și nu fac singure silabă. Consoanele au nevoie de o vocală. Diftongul este o vocală și o semivocală în aceeași silabă, ca în câi-ne. Triftongul este o vocală și două semivocale în aceeași silabă, ca pioa în a-ri-pioa-ră. Hiatul este două vocale alăturate, în silabe diferite, ca în i-de-e. Litera x se aude ks în excursie și gz în examen. Sunetul k se poate scrie c, k sau q. Grupurile ce, ci, ge, gi, che, chi, ghe, ghi redau un sunet când înaintea vocalei stau în aceeași silabă, ca la începutul lui geană. Redau două sunete când după ele vine o consoană sau când fac singure silaba, ca în cer și în chenar.',
        example: 'Câine se desparte câi-ne, iar âi este diftong. Aripioară se desparte a-ri-pioa-ră, iar pioa este triftong. Idee se desparte i-de-e, iar e-e este hiat. Excursie începe cu sunetul ks. Examen începe cu gz. Geană începe cu un sunet, iar cer începe cu două.',
        tryThis: 'Desparte câine, aripioară și idee. Spune unde este diftongul, unde este triftongul și unde este hiatul. Mai scrie că x se aude ks în excursie și gz în examen și că geană începe cu un sunet, iar cer cu două.',
        recap: 'Diftongul unește o vocală cu o semivocală, triftongul unește o vocală cu două semivocale, iar hiatul desparte două vocale în silabe diferite. X se aude ks sau gz, iar ce, ci, ge, gi se aud un sunet sau două, după silabă.'
      }),
      lesson('silabe-reguli', 'Cum desparți în silabe', {
        theory: 'Silaba are o vocală și se rostește dintr-o dată. Cuvântul monosilabic are o silabă, ca pom. Cel plurisilabic are două sau mai multe, ca ca-me-ră. O consoană între vocale trece în silaba următoare: po-diș, ra-ză, ma-și-nă. Două consoane se despart: ac-tiv, sim-bol. Excepție: dacă a doua consoană este l sau r, iar prima este b, c, d, f, g, h, p, t sau v, grupul rămâne întreg: ca-blu, co-dru, ti-tlu, li-tru. Trei consoane se despart, de regulă, după prima: as-pru, cin-ste. Excepție, după a doua consoană, la grupurile lpt, mpt, nct, ncș, ncț, rct, rtf, stm și ndv: sculp-tu-ră, punc-te, jert-fă, arc-tic. Două vocale alăturate se despart. Dacă după o vocală vine un diftong sau un triftong, tai după vocală. Liniuța de despărțire se scrie doar la capăt de rând și nu se repetă pe rândul următor. Nu lași o singură literă pe rândul următor. Seria corectă dintre cele patru obișnuite este arc-tic, func-ți-e, or-to-gra-fi-e. Pi-a-tră rupe diftongul. Su-bi-ect rupe diftongul ie. Fiin-ță lipește hiatul.',
        example: 'Podiș se desparte po-diș. Cablu se desparte ca-blu, pentru că bl rămâne împreună. Aspru se desparte as-pru. Sculptură se desparte sculp-tu-ră, pentru că lpt se taie după a doua consoană. Arctic se desparte arc-tic. Funcție se desparte func-ți-e. Ortografie se desparte or-to-gra-fi-e. Idee se desparte i-de-e.',
        tryThis: 'Desparte și spune regula pentru candelabru, creastă, aspru, suplu, mapă, jertfă, fiică și tavă. Apoi scrie seria corectă: arc-tic, func-ți-e, or-to-gra-fi-e. Spune de ce pi-a-tră și fiin-ță nu sunt bune.',
        recap: 'O consoană trece mai departe, două consoane se despart, iar bl, br și celelalte grupuri cu l sau r rămân întregi. Trei consoane se taie după prima, în afară de lpt, nct, rct, rtf și celelalte grupuri din excepție, care se taie după a doua.'
      }),
      lesson('legenda', 'Legenda și valoarea', {
        theory: 'Legenda este un text narativ scurt, în proză sau în versuri, care explică de unde a apărut un lucru, o ființă, un loc sau o faptă de erou. Amestecă o întâmplare care putea fi reală cu un element minunat. Valorile pe care le cauți sunt binele, adevărul, curajul și bunătatea. Legenda istorică pleacă de la un război sau de la un domnitor. Legenda mitologică explică un animal, o plantă, un munte sau un astru. Legenda religioasă spune o faptă de sfânt. În unele manuale, Povestea Vrancei explică un nume de ținut și îi are în vedere pe Ștefan cel Mare și pe Vrâncioaia. Alte popoare spun de ce marea este sărată sau cum un pescar a ajuns la palatul mării. Nu copiem acele povești. Scena noastră este alta. În sat era o fântână cu apă dulce. O fată i-a dat unui drumeț ultimul pumn de sare. A doua zi fântâna era sărată, iar drumețul lăsase o cană plină. Din scena asta faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.',
        example: 'Ce scrie: Fata i-a dat drumețului ultimul pumn de sare, iar a doua zi fântâna era sărată și lângă ea stătea o cană plină. Ce vezi: Văd fântâna, fata, drumețul și cana. Eu aș fi împărțit și eu sarea, pentru că era ultimul pumn și drumețul era pe drum.',
        tryThis: 'La marginea pădurii, un băiat a oprit un foc mic cu haina lui. A doua zi, în locul ars, a răsărit un copac cu frunza roșie. Scrie trei propoziții: ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu Văd. Spune ce explică această legendă și ce valoare arată fapta băiatului.',
        recap: 'Legenda explică un lucru și amestecă fapta cu un element minunat. Poate fi istorică, mitologică sau religioasă, iar valoarea se vede în faptă: curaj, adevăr sau bunătate.'
      })
    ]
  }
];

function grade6Guide() {
  return {
    title: 'Limba și literatura română, clasa a VI-a',
    restored: true,
    manual: MANUAL,
    competencies: COMPETENCIES,
    howISeeIt:
      'A început manualul Litera pentru clasa a VI-a, cod A1470. În aplicație sunt recapitularea inițială și Unitatea 1, Lumea de acasă, până la legendă. Scena sau regula stă în lecție. Restul anului vine bucată cu bucată.',
    units: UNITS
  };
}

module.exports = {
  MANUAL,
  COMPETENCIES,
  UNITS,
  grade6Guide
};
