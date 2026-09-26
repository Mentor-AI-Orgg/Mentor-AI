// Clasa a VI-a, după manualul aprobat:
// Loredana Dorobăț, Lorelai Slavu, Violeta Nania,
// Limba și literatura română, clasa a VI-a, Litera, 2023, cod A1470,
// aprobat prin OM 5022/06.07.2023, conform OMEN 3393/28.02.2017.
//
// Aici sunt recapitularea inițială, Unitatea 1 (Lumea de acasă, cu proiectul)
// și Unitatea 2 (Pe tărâmul prieteniei). Nu copiem fragmente, poezii, scrisori
// sau legende. Scena de care are nevoie copilul este scrisă în lecție.
// Grilele de punctaj nu intră în lecții.

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
  { code: '1.1', text: 'Găsește informația importantă într-un mesaj ascultat sau citit.' },
  { code: '1.3', text: 'Recunoaște locul, momentul și relația dintre cei care vorbesc.' },
  { code: '1.4', text: 'Poartă un dialog scurt, pe rând, cu gest și cu ton potrivit.' },
  { code: '2.1', text: 'Recunoaște felul textului și momentele acțiunii.' },
  { code: '2.2', text: 'Spune pe scurt, cu cuvintele lui, ce s-a întâmplat și în ce ordine.' },
  { code: '2.3', text: 'Spune ce scrie într-un text narativ, ce vede și ce părere are, legată de o faptă.' },
  { code: '2.4', text: 'Stă pe text până la capăt și alege o bucată care îl oprește.' },
  { code: '3.1', text: 'Scrie o pagină de jurnal, o scrisoare sau o povestire la persoana I.' },
  { code: '3.3', text: 'Își recitește textul: ortografie, punctuație, așezare în pagină.' },
  { code: '3.4', text: 'Spune ce i-a ieșit bine la scris și ce mai are de îndreptat.' },
  { code: '4.1', text: 'Recunoaște verbul, modul, timpul și felul predicatului.' },
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
      'Unitatea 1 leagă casa de textul narativ: acțiune, timp, spațiu, autor, narator și personaje, apoi dialogul, scrisoarea, sensul cuvintelor, silaba și legenda. La final este proiectul despre casele scriitorilor. Scenele sunt în lecții. În unele manuale povestea casei este din Amintiri din copilărie, de Ion Creangă. La școală titlul poate fi altul.',
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
      'Valori etice în legende',
      'Proiect: Acasă la scriitorii români',
      'Recapitularea unității'
    ],
    glossary: [
      { term: 'narator', meaning: 'Vocea care povestește. La persoana I este și personaj.' },
      { term: 'omonim', meaning: 'Aceeași formă, sensuri care nu se leagă între ele, ca leul animal și leul ban.' },
      { term: 'legendă', meaning: 'Povestire scurtă care explică un lucru și amestecă o faptă reală cu una minunată.' },
      { term: 'casă memorială', meaning: 'Casa în care a trăit un scriitor și care s-a păstrat ca muzeu.' }
    ],
    lessons: [
      lesson('deschidere-acasa', 'Ce vei lucra despre casă', {
        theory: 'Deschiderea unității este harta, nu lecția gata făcută. Tema este lumea de acasă. Vei lucra textul narativ în proză, acțiunea, timpul și spațiul, apoi autorul, naratorul și personajele. La comunicare vei vedea locul, momentul și relația dintre interlocutori. La redactare vei scrie narativ, la persoana I, și o scrisoare. La construcția comunicării vei relua sensul, sinonimele, antonimele, omonimele și silaba. La interculturalitate vei căuta o valoare într-o legendă. Competențele sunt unsprezece: 1.3, 1.4, 2.3, 2.4, 3.1, 3.3, 3.4, 4.2, 4.3, 4.4 și 5.2. Proiectul tematic închide unitatea, după legendă.',
        example: 'Azi harta anunță textul narativ și scrisoarea. Silaba este pe hartă, dar o lucrezi când îi vine rândul. Cele unsprezece competențe rămân ținta unității, nu o lecție terminată dintr-o privire.',
        tryThis: 'Scrie două propoziții. În prima spune că tema este lumea de acasă și că azi lucrezi textul narativ. În a doua numește competențele 1.3, 1.4, 2.3, 2.4, 3.1, 3.3, 3.4, 4.2, 4.3, 4.4 și 5.2 și spune că sunt unsprezece.',
        recap: 'Harta unității anunță narativul, dialogul, scrisoarea, sensul cuvintelor, silaba și legenda. Competențele sunt 1.3, 1.4, 2.3, 2.4, 3.1, 3.3, 3.4, 4.2, 4.3, 4.4 și 5.2, iar proiectul tematic închide unitatea.'
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
      }),
      lesson('proiect-scriitori', 'Acasă la scriitorii români', {
        theory: 'Proiectul Acasă la scriitorii români se face în grup de patru sau cinci. Alegeți un scriitor și casa lui memorială. Stabiliți ce vreți să aflați, cine caută, în ce surse, până când și cum prezentați. Căutați în surse de încredere. Fiecare are o treabă. Alegeți forma: colaj, portofoliu sau prezentare. Uniți textul cu imagini. La urmă prezentați și ascultați ce vă spun colegii. Profesorul vă ajută, nu face proiectul în locul vostru. Un proiect bun are bibliografie, plan, tema dezvoltată, o argumentare, o vorbire limpede, ton și gest potrivite, materiale diverse și o idee a voastră. Casa Memorială Mihai Eminescu este la Ipotești, în județul Botoșani. În 1850 Gheorghe Eminovici a cumpărat moșia și a ridicat o casă cu trei camere: salonul familiei, biroul tatălui și dormitorul mamei și al fetelor. Familia a locuit acolo până în 1878. Raluca Eminovici a cumpărat o bisericuță de familie cu 250 de galbeni de la un om pe nume Murguleț. Biserica este din anii 1860. Casa lui Ion Creangă este numită Bojdeuca. Bojdeucă înseamnă o căsuță mică și simplă. A fost construită înainte de 1850, în mahalaua Țicău din Iași, numită și Valea Plângerei. Este primul muzeu memorial literar din România, deschis la 15 aprilie 1918. Adresa este Țicăul de Sus, numărul 4. Creangă a locuit acolo din vara lui 1872. Acolo a scris Poveștile și Amintiri din copilărie. Mihai Eminescu a locuit în aceeași casă o jumătate din anul 1876. În bucătărie sunt cuptorul, ca la casa din Humulești, o masă de lemn cu trei picioare, o icoană de la mama lui Creangă și portretul Tincăi Vartic. În camera de lucru sunt biroul cu pagini scrise de mâna lui Creangă, lampa, pana, călimara, scuturătoarea de nisip, o ladă care amintește de lada lui Eminescu și portretul făcut de V. Mușnețanu. Prispa privește spre Ciric și spre Sorogari.',
        example: 'Grupul alege Bojdeuca. Obiectivul este să spună unde este casa și ce obiecte stau în camera de lucru. Sursa este o pagină de muzeu. Forma este un portofoliu de patru foi. Ana caută anul 1918, Vlad caută obiectele, Lia desenează prispa, Radu spune textul. În camera de lucru ei numesc lampa, pana și călimara, pentru că lecția spune că acestea stau pe birou.',
        tryThis: 'Alege una dintre cele două case, Ipotești sau Bojdeuca. Scrie opt până la zece rânduri. Spune unde este casa, un an important și trei obiecte sau camere pe care le-ai găsit în lecție. Apoi fă planul grupului de patru: cine caută, ce sursă folosiți, ce formă are lucrarea și ce spuneți în ultima frază când prezentați. Nu copia un text de pe un site. Folosește faptele din lecție.',
        recap: 'Proiectul despre casa unui scriitor se planifică în grup, se caută în surse sigure și se prezintă cu text și imagine. La Ipotești, casa lui Eminescu are trei camere și a fost ridicată în 1850. Bojdeuca din Țicău este muzeu din 15 aprilie 1918, iar Creangă a scris acolo Amintiri din copilărie.'
      }),
      lesson('recap-acasa', 'Recapitularea despre casă', {
        theory: 'La închiderea unității repeți ce ai lucrat, pe o scenă scrisă aici. Joi seara, în camera mea, i-am scris mamei. I-am spus că am udat florile de pe pervaz și că eram bucuroasă. Pe masă stătea un caiet albastru. Naratorul spune eu, deci povestește la persoana I și este și personaj. Veselă este aproape de bucuroasă, deci sunt sinonime. Tristă este opusul lui bucuroasă, deci este antonim. Cuvântul cameră se desparte ca-me-ră. Fapta arată grija, pentru că florile aveau nevoie de apă și eu le-am udat. O scrisoare de recapitulare are locul și data în dreapta sus, o formulă de adresare cu virgulă, cuprinsul la persoana I, faptele în ordine, o emoție și două propoziții care descriu un loc. Din scena asta faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.',
        example: 'Ce scrie: Joi seara, în camera mea, i-am scris mamei că am udat florile și că eram bucuroasă. Ce vezi: Văd camera, caietul albastru și florile de pe pervaz. Eu aș fi semnat scrisoarea, pentru că i-am scris mamei și eram bucuroasă. Veselă este sinonimul lui bucuroasă. Cameră se desparte ca-me-ră. Naratorul este la persoana I.',
        tryThis: 'Scrie o scrisoare de 80–100 de cuvinte către un părinte. Pune locul și data în dreapta sus, formula Dragă mamă, sau Dragă tată, cu virgulă, persoana I, faptele în ordine, o emoție și două propoziții care descriu camera. Apoi, pe scena din lecție, scrie ce fel de narator este, un sinonim pentru bucuroasă, un antonim și despărțirea cuvântului cameră.',
        recap: 'Recapitularea unește persoana I, sinonimul, antonimul, silaba și valoarea, pe o scenă care stă în lecție. Scrisoarea păstrează locul, data, adresarea, emoția și o descriere scurtă.'
      })
    ]
  },
  {
    id: 'taramul-prieteniei',
    title: 'Pe tărâmul prieteniei',
    inOwnWords:
      'Unitatea 2 lucrează prietenia în proză, la persoana a III-a: momentele subiectului, dialogul, parafraza, rezumatul, vorbirea indirectă, verbul și o valoare din cultura populară. Scenele sunt în lecții. În unele manuale textul de deschidere este din Cireșarii, de Constantin Chiriță. La școală titlul poate fi altul. La final este proiectul despre o prietenie cunoscută.',
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
      { term: 'persoana a III-a', meaning: 'Naratorul observă fapta și nu spune eu.' },
      { term: 'rezumat', meaning: 'Spui pe scurt cine, ce face și când, cu cuvintele tale, în ordine.' },
      { term: 'copulă', meaning: 'Verbul a fi când leagă subiectul de un nume, ca în Ana este prietena mea.' }
    ],
    lessons: [
      lesson('deschidere-prietenie', 'Ce vei lucra despre prietenie', {
        theory: 'Unitatea Pe tărâmul prieteniei începe cu harta. Vei citi proză narativă la persoana a III-a, vei numi momentele subiectului și vei lucra dialogul. Vei parafraza, vei face un rezumat și vei trece vorbirea directă în vorbire indirectă. La verb vei deosebi verbul predicativ de cel auxiliar, apoi conjunctivul, condițional-optativul și predicatul nominal de cel verbal. La urmă cauți o valoare în cultura populară. Competențele acestei unități sunt douăsprezece: 1.1, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.3, 4.1, 4.2, 4.3 și 4.4. Constantin Chiriță a trăit între 1925 și 1991 și a scris proză pentru adolescenți. Cartea lui se numește Cireșarii. În ea poți întâlni pe Tic, pe câinele Țombi, pe Dan, pe Lucia, pe Maria, pe Ionel, pe Ursu și pe Victor. Nu ai nevoie de o pagină din carte ca să răspunzi aici. La școală textul de pe bancă poate avea alt titlu. Pașii rămân aceiași.',
        example: 'Harta anunță persoana a III-a, momentele subiectului, dialogul, rezumatul și verbul. Cireșarii este cartea lui Constantin Chiriță, iar Țombi este câinele. Cele douăsprezece competențe sunt ținta unității, nu o lecție gata făcută.',
        tryThis: 'Scrie două propoziții. În prima spune că tema este prietenia și că azi lucrezi narațiunea la persoana a III-a. În a doua numește competențele 1.1, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.3, 4.1, 4.2, 4.3 și 4.4 și spune că sunt douăsprezece. Mai scrie că Constantin Chiriță a trăit între 1925 și 1991, că a scris Cireșarii și că Țombi este câinele.',
        recap: 'Harta unității anunță persoana a III-a, momentele acțiunii, dialogul, rezumatul, verbul și o valoare din cultura populară. Competențele sunt 1.1, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.3, 4.1, 4.2, 4.3 și 4.4. Constantin Chiriță a scris Cireșarii.'
      }),
      lesson('persoana-trei', 'Naratorul care nu spune eu', {
        theory: 'La persoana a III-a, naratorul este obiectiv. El observă ce li se întâmplă personajelor și nu intră în faptă. Nu spune eu și nu este personajul principal. Schema este simplă: acțiunea stă într-un timp și într-un spațiu, naratorul povestește, personajele iau parte. Sâmbătă dimineața, în parc, Radu a găsit o minge sub bancă. Lia a venit și a întrebat dacă mingea este a lui. Radu i-a dat mingea. Naratorul nu spune eu. El doar vede ce fac Radu și Lia. Din scena asta faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.',
        example: 'Ce scrie: Sâmbătă dimineața, în parc, Radu a găsit o minge sub bancă, iar Lia a întrebat dacă este a lui. Radu i-a dat mingea. Ce vezi: Îi văd pe Radu și pe Lia lângă bancă, cu mingea între ei. Eu aș fi dat și eu mingea, pentru că Lia a întrebat al cui este și Radu a dat-o. Naratorul este la persoana a III-a, pentru că nu spune eu.',
        tryThis: 'Marți, în curtea școlii, Lia a găsit un caiet albastru. Radu i-a spus că este al lui. Lia i-a dat caietul. Naratorul nu spune eu. Scrie trei propoziții: ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu Îi văd. Spune de ce naratorul este la persoana a III-a.',
        recap: 'Naratorul la persoana a III-a este un observator: știe ce fac personajele și nu ia parte la faptă. Din scenă spui ce scrie, ce vezi și ce ai face tu, cu pentru că.'
      }),
      lesson('momente-subiect', 'Cinci momente ale acțiunii', {
        theory: 'Subiectul unei narațiuni are trei părți: situația inițială, succesiunea întâmplărilor și situația finală. Momentele sunt cinci. Expozițiunea spune cine, unde și când. Intriga este faptul care pornește încurcătura. Desfășurarea este partea cea mai lungă și ține ordinea timpului. Punctul culminant este clipa cu tensiunea cea mai mare. Deznodământul închide întâmplarea. Duminică, în curtea școlii, Ana și Vlad se jucau liniștiți cu o minge. Mingea a zburat peste gard, în grădina vecină. Au căutat o scară, au bătut la poartă și au așteptat. Vecinul a deschis poarta chiar când a sunat clopoțelul. Ana și Vlad au luat mingea și au mulțumit.',
        example: 'Ce scrie: Duminică, în curtea școlii, Ana și Vlad se jucau cu mingea, mingea a sărit gardul, au așteptat, vecinul a deschis când a sunat clopoțelul, iar ei au mulțumit. Ce vezi: Îi văd pe Ana și pe Vlad la gard, cu mingea în grădina vecină. Eu aș fi bătut și eu la poartă, pentru că mingea era dincolo de gard. Expozițiunea este jocul liniștit de duminică. Intriga este mingea peste gard. Desfășurarea este căutarea scării și așteptarea. Punctul culminant este poarta deschisă la auzul clopoțelului. Deznodământul este mingea luată și mulțumirea.',
        tryThis: 'Pe scena cu mingea din lecție, scrie cele cinci momente: expozițiunea, intriga, desfășurarea, punctul culminant și deznodământul. Apoi scrie un alt final, de opt până la zece rânduri. În finalul tău vecinul nu deschide poarta, iar Ana și Vlad găsesc o altă cale, tot la persoana a III-a.',
        recap: 'Cele cinci momente sunt expozițiunea, intriga, desfășurarea, punctul culminant și deznodământul. Expozițiunea așază cine, unde și când. Intriga pornește încurcătura. Desfășurarea este cea mai lungă. Punctul culminant este tensiunea maximă. Deznodământul închide.'
      }),
      lesson('dialog-literar', 'Dialogul din povestire', {
        theory: 'Dialogul este vorbirea dintre cel puțin două persoane. Emițătorul trimite mesajul, receptorul îl primește, apoi rolurile se schimbă. Comunicarea verbală stă în cuvinte. Cea nonverbală stă în gest, privire și față. Cea paraverbală stă în ton, viteză și pauză. În textul literar, linia de dialog stă la începutul fiecărei replici. Dialogul dă dinamism, arată personajul prin felul în care vorbește, arată și ce nu spune direct, arată relația dintre oameni și poate purta o emoție, o întrerupere sau o ezitare. Întrebarea se încheie cu semnul întrebării. Emoția puternică se încheie cu semnul exclamării.',
        example: '— Ai uitat sticla? întreabă Ana. — Da, răspunde Vlad. — Bea din a mea! spune Ana și îi întinde sticla. — Mulțumesc, zice Vlad, mai încet. Gestul sticlei întinse este nonverbal. Vocea mai înceată este paraverbală. Întrebarea are semn de întrebare, iar îndemnul are semn de exclamare.',
        tryThis: 'Scrie un dialog de patru replici despre un caiet uitat în clasă. Fiecare replică începe cu linia de dialog. Pune o întrebare, o replică cu semnul exclamării și un gest, de pildă cineva întinde caietul. Spune cine este emițător la prima replică și cine devine emițător la a doua.',
        recap: 'Dialogul schimbă rolul de emițător și de receptor. Linia de dialog deschide replica, gestul este nonverbal, iar tonul este paraverbal. Întrebarea și exclamația își păstrează semnele.'
      }),
      lesson('parafraza', 'Cu cuvintele tale', {
        theory: 'Parafraza spune același lucru cu cuvintele tale. Poate fi mai lungă decât bucata de la care pleci, pentru că lămurește un detaliu. Rezumatul este scurt și păstrează doar informația principală. Explicit este ce scrie direct. Implicit este ce înțelegi din fapte, fără să fie spus cu acele vorbe. Un băiat avea un caiet cu clei uscat pe pagină. Cleiul prinde doar dacă pagina este umedă. El a umezit pagina, a apăsat o poză și a lăsat caietul la soare. A doua zi poza stătea lipită. În text scrie că a lăsat caietul la soare. Nu scrie de ce. Poți înțelege că voia să se usuce lipitura. Mark Twain este pseudonimul lui Samuel Langhorne Clemens. A fost prieten cu Nikola Tesla. A brevetat trei invenții. Cea care a avut succes a fost un album în care pozele se lipeau singure: cleiul era uscat, umezeai pagina înainte, iar albumul s-a vândut în peste 25.000 de exemplare. Singurul film cu el a fost făcut de Thomas Edison și a fost folosit în Prinț și sărman, în 1909.',
        example: 'Explicit: băiatul a umezit pagina, pentru că în text scrie asta, și cleiul prinde doar pe pagina umedă. Implicit: a lăsat caietul la soare ca să se usuce lipitura, deși textul nu spune scopul. Parafrază: Băiatul a udat puțin pagina, a pus poza deasupra și a ținut-o la soare până a doua zi, când poza nu s-a mai dezlipit. Rezumat: Un băiat a lipit o poză cu clei uscat, umezind pagina. Mark Twain este numele de scriitor al lui Samuel Langhorne Clemens.',
        tryThis: 'Pe scena cu caietul, scrie o parafrază de patru propoziții, cu cuvintele tale, apoi un rezumat de o propoziție. Spune ce este explicit și ce este implicit. Mai scrie trei fapte: pseudonimul lui Samuel Langhorne Clemens, invenția care i-a reușit și cine a filmat singurul film cu el, în ce an și pentru care film.',
        recap: 'Parafraza lămurește cu cuvintele tale și poate fi mai lungă. Rezumatul păstrează doar ideea principală. Explicit este ce scrie. Implicit este ce înțelegi. Mark Twain este pseudonimul lui Samuel Langhorne Clemens.'
      }),
      lesson('rezumat', 'Cine, ce face, când', {
        theory: 'Ca să faci un rezumat, citești textul până la capăt, îl împarți în fragmente, scrii un plan de idei simple și apoi câte un paragraf scurt pentru fiecare idee. Păstrezi ordinea. Scrii la persoana a III-a, la prezent sau la perfect compus, cu cuvintele tale. Răspunzi la cine, ce face și când. Nu folosești cuvintele autor, narator și personaj. Luni dimineața, Eva a intrat în biblioteca școlii și a cerut o carte despre câini. Bibliotecara i-a dat un volum albastru. Marți, acasă, Eva a citit primul capitol la masă. Miercuri a pus în carte un semn de hârtie verde. Joi semnul nu mai era pe masă. Vineri l-a găsit în buzunarul ghiozdanului și l-a pus la loc. Sâmbătă a citit încă un capitol și i-a povestit fratelui doar ce citise. Duminică a dus cartea înapoi și i-a mulțumit bibliotecarei.',
        example: 'Plan: Eva ia cartea. Eva pierde semnul și îl găsește. Eva aduce cartea înapoi. Rezumat: Luni, Eva a împrumutat de la biblioteca școlii o carte despre câini. În zilele următoare a citit și a pierdut semnul verde, apoi l-a găsit în ghiozdan. Duminică a dus cartea înapoi și a mulțumit. Nu apar cuvintele autor, narator, personaj.',
        tryThis: 'Împarte scena Evei în trei idei. Scrie rezumatul în cinci propoziții, la persoana a III-a, în ordinea zilelor. Apoi strânge totul într-o singură propoziție care răspunde la cine, ce face și când. Nu folosi cuvintele autor, narator și personaj.',
        recap: 'Rezumatul păstrează ordinea, stă la persoana a III-a și spune cine, ce face și când, cu cuvintele tale. Nu folosești cuvintele autor, narator și personaj.'
      }),
      lesson('vorbire-indirecta', 'De la replică la relatare', {
        theory: 'Vorbirea directă repetă exact cuvintele. Are linie de dialog, adesea o întrebare sau o exclamație, verbe la persoana I sau a II-a, uneori imperativ. Verbele de declarație, ca zice, spune, grăi și întreabă, stau lângă replică și pot fi urmate de două puncte. Vocativul cheamă persoana pe nume. Vorbirea indirectă nu are linie de dialog și stă doar în propoziții enunțiative. Verbele trec la persoana a III-a. Imperativul devine conjunctiv: Vino! devine I-a spus să vină. După verbul de declarație pui că, să, ca să, dacă sau unde. Vocativul devine dativ sau acuzativ. Pașii sunt: scoți linia de dialog, schimbi persoana, scoți exclamațiile și adaugi verbul de declarație cu conjuncția. Perechea lucrată: — Când ai intrat? întreabă Laura. — Acum cinci minute, răspunde Ina. Devine: Laura a întrebat-o când a intrat. Ea i-a spus că a intrat acum cinci minute.',
        example: '— Unde ai pus mingea? întreabă Vlad. — Sub bancă, răspunde Ana. În vorbire indirectă: Vlad a întrebat-o pe Ana unde a pus mingea. Ana i-a spus că a pus-o sub bancă. Linia de dialog a dispărut, verbele sunt la persoana a III-a, iar întrebarea a devenit o propoziție enunțiativă cu unde.',
        tryThis: 'Transformă în vorbire indirectă dialogul acesta. — Când ai intrat? întreabă Laura. — Acum cinci minute, răspunde Ina. Apoi transformă și perechea: — Vino la poartă! îi spune Radu lui Mihai. — Vin acum, răspunde Mihai. Scrie ambele rezultate în propoziții, fără linie de dialog.',
        recap: 'Vorbirea directă păstrează cuvintele și linia de dialog. Vorbirea indirectă scoate linia, trece verbele la persoana a III-a și leagă replica prin că, să, ca să, dacă sau unde. Vino! devine i-a spus să vină.'
      }),
      lesson('verbul', 'Predicativ, auxiliar, timpuri', {
        theory: 'Verbul predicativ poate fi singur predicat verbal: Noi scriem. Verbul auxiliar nu poate fi singur predicat. A avea este auxiliar la perfectul compus: am scris. A vrea este auxiliar la viitor: voi scrie. A fi este auxiliar la viitorul anterior: voi fi scris. Indicativul arată o acțiune reală și este singurul mod cu toate timpurile: prezent, imperfect, perfect simplu, perfect compus, mai-mult-ca-perfect, viitor și viitor anterior. Imperativul dă un ordin, un sfat sau o rugăminte, doar la persoana a II-a, fără timp. Afirmativ: Cântă! Cântați! Negativ: Nu cânta! Nu cântați! Infinitivul este forma din dicționar, cu sau fără a: a vorbi. Participiul arată o acțiune suferită: cules, învățat. Viitorul standard este voi citi. Viitorul anterior este voi fi citit și arată o acțiune gata înaintea altei acțiuni viitoare. În vorbirea de toate zilele auzi am să citesc și o să citesc. În vorbirea populară auzi oi citi. Verbul a crea se conjugă ca a lucra: eu creez, tu creezi, el creează, noi creăm, voi creați, ei creează. Formele bune sunt trebuie, bănuie, scrii, copiază și creează. Nu se scriu trebuiesc, bănuiește, scri, copie sau crează. Place este prezentul, iar plăcea este imperfectul. Cuvântul am poate fi predicativ, ca în Eu am un caiet, sau auxiliar, ca în Eu am scris. La fel ai. În Eu sunt acasă, sunt este predicativ, pentru că poate fi înlocuit cu mă aflu. În voi fi citit, fi este auxiliar. Conjugarea schimbă verbul după mod, timp, persoană și număr.',
        example: 'Noi scriem: scriem este predicativ. Am scris: am este auxiliarul a avea. Voi scrie: voi este auxiliarul a vrea. Voi fi scris: fi este auxiliarul a fi. Viitorul standard al lui a citi este voi citi. Viitorul anterior este voi fi citit. Formele am să citesc și o să citesc sunt tot viitor, în vorbirea de toate zilele. Oi citi este forma populară. La a crea, persoana a III-a este creează. Place este prezent. Plăcea este imperfect.',
        tryThis: 'Spune ce fel de verb este scriem în Noi scriem și ce fel este am în am scris. Scrie viitorul standard, viitorul anterior, forma cu am să și forma populară pentru a citi, la persoana I. Conjugă a crea la indicativ prezent: eu, tu, el, noi, voi, ei. Alege forma bună și scrie doar pe ea: trebuie, bănuie, scrii, copiază, place pentru o acțiune de acum și creează.',
        recap: 'Verbul predicativ poate fi singur predicat, iar auxiliarul se sprijină pe alt verb: a avea, a vrea sau a fi. Indicativul are toate timpurile. La a crea scriem creează. Pentru o acțiune de acum scriem place, trebuie, bănuie, scrii și copiază.'
      }),
      lesson('conjunctiv', 'Acțiunea posibilă', {
        theory: 'Conjunctivul arată o acțiune posibilă, care se poate realiza. Marca lui este să. La persoana a III-a, în vorbirea de toate zilele, să poate cădea: Meargă unde o vrea! Mai auzi Doarmă, Fie, Plece, Facă. Prezentul se formează cu să și prezentul indicativului. A învăța: să învăț, să înveți, să învețe, să învățăm, să învățați, să învețe. A vrea: să vreau, să vrei, să vrea, să vrem, să vreți, să vrea. A culege: să culeg, să culegi, să culeagă, să culegem, să culegeți, să culeagă. A citi: să citesc, să citești, să citească, să citim, să citiți, să citească. Perfectul este să, plus fi, plus participiu: să fi învățat, aceeași formă la toate persoanele. Forma bună de la a avea este să aibă. Nu se scriu să aivă și să aibe. La persoana a II-a scrii doi de i: să fii, să știi, să ții, să vii, să devii, să susții, să deții, să reții, să revii, să previi, să redevii. La a crea și la a agrea scrii doi de e: să creez, să agreez. Am să citesc este viitorul indicativ din vorbirea de toate zilele, nu este conjunctiv. În propoziție, conjunctivul poate fi predicat verbal.',
        example: 'Să învețe și să citească sunt conjunctiv prezent, persoana a III-a. Să fi învățat este conjunctiv perfect. Să aibă este forma bună de la a avea. Să vii are doi de i. Să creez are doi de e. Am să citesc nu este conjunctiv, este viitor.',
        tryThis: 'Scrie conjunctivul prezent, persoana a III-a, pentru a învăța, a citi și a culege. Scrie conjunctivul perfect al verbului a învăța. Scrie formele să aibă, să fii, să vii și să creez. Mai scrie o propoziție în care spui că am să citesc este viitor, nu conjunctiv.',
        recap: 'Conjunctivul arată o acțiune posibilă și se recunoaște după să. Perfectul este să fi plus participiu. La persoana a II-a, să fii și să vii au doi de i, iar să creez are doi de e. Am să citesc este viitorul indicativului.'
      }),
      lesson('conditional-optativ', 'Dorința și condiția', {
        theory: 'Condițional-optativul arată o acțiune dorită sau o acțiune posibilă care depinde de o condiție. Prezentul se face cu auxiliarul a avea, formele aș, ai, ar, am, ați, ar, plus infinitivul: aș învăța, ai învăța, ar învăța, am învăța, ați învăța, ar învăța. Perfectul se face cu același auxiliar, plus fi, plus participiu: aș fi citit, ai fi citit, ar fi citit, am fi citit, ați fi citit, ar fi citit. Formele bune sunt ar tăcea, ți-ar plăcea, aș vedea și ar apărea. Nu se scriu ar tace, ți-ar place, aș vede sau ar apare. Există și forme răsturnate: mânca-l-ar, dormire-ai. Ai grijă la ortograme. C-am vine de la că am, iar cam înseamnă aproximativ. N-ai vine de la nu ai, iar nai este peștele. Ne-am vine de la noi am, iar neam înseamnă familia mare. V-ar vine de la vă ar, iar var este materialul de construit. M-ai vine de la mă ai, iar mai înseamnă încă. Prezentul poate vorbi despre acum sau despre mai târziu. Perfectul stă înaintea momentului vorbirii sau arată o faptă care nu s-a petrecut: Dacă aș fi ascultat, acum aș fi fost pe locul întâi.',
        example: 'Aș învăța este condițional prezent. Aș fi citit este condițional perfect. Ar tăcea, ți-ar plăcea, aș vedea și ar apărea sunt formele bune. În C-am spus eu, c-am înseamnă că am. În Neamul bunicii, neam înseamnă familie, fără liniuță. Dacă aș fi ascultat arată o condiție care nu s-a împlinit.',
        tryThis: 'Scrie condiționalul prezent și perfect pentru a învăța și pentru a citi, la persoana I și la persoana a III-a singular. Scrie formele bune ar tăcea, ți-ar plăcea, aș vedea și ar apărea. Scrie o propoziție cu c-am și una cu neam, și spune ce înseamnă fiecare. Încheie cu propoziția Dacă aș fi ascultat, acum aș fi fost pe locul întâi și spune că perfectul arată aici o faptă care nu s-a petrecut.',
        recap: 'Condițional-optativul arată o dorință sau o acțiune legată de o condiție. Prezentul este aș, ai, ar plus infinitiv. Perfectul este aș fi citit. Scriem ar tăcea, ți-ar plăcea, aș vedea și ar apărea. C-am nu este totuna cu cam, iar ne-am nu este totuna cu neam.'
      }),
      lesson('predicat-nominal', 'Copula și numele', {
        theory: 'Predicatul verbal este un verb predicativ: Copiii citesc. Predicatul nominal se face din copulă și nume predicativ. Verbul a fi este copulă, deci nepredicativ, când leagă subiectul de un nume: Andrei este corect. Ana este prietena mea. Numele predicativ răspunde la cum este sau cine este și poate fi adjectiv sau substantiv. Este simplu în Floarea este firavă. Este multiplu în Mihai este atent și prietenos. Se acordă cu subiectul: Elevul este silitor. Fetele sunt cuminți. Verbul a fi este predicativ când înseamnă a se afla, a exista, a costa sau a proveni și poate fi înlocuit. Bluza este 50 de lei înseamnă costă. El este în parc înseamnă se află. Cartea este și la noi înseamnă există. Marfa este din China înseamnă provine. Este auxiliar în Ar fi câștigat. În aceeași frază se pot amesteca. Campionii sunt pe podium este predicativ, pentru că sunt înseamnă se află. Cei trei sunt campioni este copulă plus nume predicativ. Caietul este 4 lei, deci costă, și este de matematică, deci copulă. Mărul este pe masă, deci se află, și este verde, deci copulă.',
        example: 'În Ana este prietena mea, este este copulă, iar prietena mea este nume predicativ și răspunde la cine este. În Bluza este 50 de lei, este este predicativ, pentru că înseamnă costă. În Ar fi câștigat, fi este auxiliar. În Mărul este pe masă și este verde, primul este înseamnă se află, al doilea este copulă, iar verde este nume predicativ.',
        tryThis: 'Scrie două propoziții în care a fi este copulă și numele predicativ răspunde la cum este sau la cine este. Scrie două propoziții în care a fi este predicativ: una cu sensul costă și una cu sensul se află. Scrie o propoziție cu a fi auxiliar, pe modelul Ar fi câștigat. Apoi desparte fraza Mărul este pe masă și este verde: spune care este este predicativ și care este copulă.',
        recap: 'Predicatul nominal este copula a fi plus numele predicativ. A fi este predicativ când înseamnă a se afla, a exista, a costa sau a proveni. A fi este auxiliar în forme ca ar fi câștigat.'
      }),
      lesson('cultura-populara', 'Ia și valoarea', {
        theory: 'Cultura este ansamblul valorilor materiale și spirituale ale unui popor. Cultura populară este folclorul născut din credințe și din tradiții. Valoarea este ceea ce merită prețuire, ca adevărul, binele și frumosul. Cuvinte apropiate sunt importanță, merit, preț și însemnătate. Regiuni cunoscute pentru portul popular sunt Dobrogea, Moldova, Bucovina, Maramureș, Transilvania, Crișana, Banatul, Oltenia și Muntenia. Pe ie sunt cusute semne ale soarelui, ale stelelor, ale pământului și ale florilor, trepte ale vieții, lupta dintre bine și rău, dragostea, hora și anotimpurile. Au purtat ia Principesa Ileana, Principesa Elena și Regina Maria, născută în casa de Edinburgh, din dinastia Saxa-Coburg și Gotha. Regina a făcut din ie un fel al ei de a se îmbrăca. Henri Matisse a pictat în 1940 tabloul La blouse roumaine, pornit de la o colecție de ii. În muzeu, Irina a văzut o ie albă. Pe mânecă era soarele cusut cu arnici roșu. Ghidul a spus că soarele de pe ie înseamnă viața. Irina a stat un minut în fața iei. Din scena asta faci trei pași: spui ce scrie, spui ce vezi, apoi spui ce ai face tu, cu pentru că.',
        example: 'Ce scrie: În muzeu, Irina a văzut o ie albă, cu soarele cusut cu arnici roșu pe mânecă, iar ghidul a spus că soarele înseamnă viața. Ce vezi: O văd pe Irina în fața iei albe, cu soarele roșu pe mânecă. Eu aș fi rămas și eu un minut, pentru că soarele era cusut pe mânecă și ghidul a spus că înseamnă viața. Valoarea de pe ie, în scena asta, este viața.',
        tryThis: 'Pe scena Irinei, scrie trei propoziții: ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu O văd. Spune ce valoare este cusută pe mânecă, după vorbele ghidului. Mai scrie trei regiuni în care se poartă ia, două nume de persoane din familiile regale care au purtat-o și anul în care Henri Matisse a pictat La blouse roumaine.',
        recap: 'Cultura populară păstrează credințe și tradiții, iar valoarea este ceea ce merită prețuire. Pe ie, soarele cusut poate însemna viața. Ia a fost purtată și de Regina Maria, iar Henri Matisse a pictat La blouse roumaine în 1940.'
      }),
      lesson('proiect-prietenii', 'Mari prietenii', {
        theory: 'Proiectul Mari prietenii se face în grup de patru sau cinci. Fiecare scrie un cuvânt legat de prietenie și inventează o definiție. În proiect intră definiția voastră, una sau două citate pe care le alegeți voi dintr-o carte, o prietenie cunoscută, imagini și un fel de prezentare care nu este o foaie citită. Stabiliți obiectivele. Faceți planul: cine ce caută, din ce sursă, ce formă are lucrarea și ce materiale vă trebuie. Căutați, uniți textul cu imaginile, prezentați și ascultați ce vă spun ceilalți. Charlie Chaplin și Albert Einstein au fost prieteni. I-a prezentat unul altuia Carl Laemmle, de la studioul Universal. Chaplin prețuia la Einstein calmul, energia minții, altruismul și sinceritatea. Nu copiați o poveste gata scrisă despre ei. Vă ajunge faptul că au fost prieteni și ce prețuia Chaplin.',
        example: 'Cuvântul grupului este loialitate. Definiția inventată: loialitatea este să rămâi lângă prieten și când îți este ușor, și când îți este greu. Prietenia aleasă este cea dintre Chaplin și Einstein, iar prezentarea este un dialog de două minute, nu o foaie citită. Ana spune definiția, Vlad spune cine i-a prezentat, Lia arată o imagine, Radu închide cu valoarea: sinceritatea.',
        tryThis: 'Scrie planul proiectului pentru un grup de patru. Pune un cuvânt al tău despre prietenie și o definiție inventată de tine, de două propoziții. Numește prietenia dintre Charlie Chaplin și Albert Einstein și spune cine i-a prezentat și două lucruri pe care Chaplin le prețuia la Einstein. Alege forma prezentării și împarte patru sarcini, câte una pentru fiecare coleg. Nu copia un citat. Scrie doar că citatul îl vei alege dintr-o carte.',
        recap: 'Proiectul despre prietenie pleacă de la un cuvânt și de la o definiție făcută de voi, apoi adaugă o prietenie cunoscută și o prezentare. Chaplin și Einstein au fost prieteni, iar Carl Laemmle i-a prezentat unul altuia.'
      }),
      lesson('recap-prietenie', 'Încheierea despre prietenie', {
        theory: 'Închei unitatea pe o scenă care stă aici. Miercuri, după ore, în fața școlii, Nora a căutat pe bancă un pix albastru. Nu l-a găsit în penar. Pavel a venit cu pixul în mână. — Este al tău? a întrebat-o Pavel. — Da, l-am uitat la ora de desen, a răspuns Nora. Pavel i-a dat pixul. Nora i-a mulțumit și a pus pixul în penar. Naratorul nu spune eu. Din scena asta faci trei pași, treci o replică în vorbire indirectă și faci un rezumat de cinci propoziții.',
        example: 'Ce scrie: Miercuri, după ore, Nora a căutat pixul, Pavel a întrebat dacă este al ei, iar apoi i l-a dat. Ce vezi: Îi văd pe Nora și pe Pavel lângă bancă, cu pixul albastru. Eu aș fi dat și eu pixul, pentru că Nora l-a căutat și a spus că l-a uitat. Vorbire indirectă: Pavel a întrebat-o pe Nora dacă pixul este al ei. Nora i-a spus că da, l-a uitat la ora de desen.',
        tryThis: 'Pe scena cu pixul, scrie trei propoziții: ce scrie, ce vezi și ce ai face tu, cu pentru că. Ce vezi începe cu Îi văd. Spune la ce persoană este naratorul. Transformă în vorbire indirectă întrebarea lui Pavel și răspunsul Norei. Apoi scrie un rezumat de cinci propoziții, la persoana a III-a, fără cuvintele autor, narator și personaj.',
        recap: 'Naratorul la persoana a III-a nu spune eu. Vorbirea indirectă scoate linia de dialog și leagă replica prin dacă sau că. Rezumatul păstrează ordinea și stă la persoana a III-a.'
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
      'A început manualul Litera pentru clasa a VI-a, cod A1470. În aplicație sunt recapitularea inițială, Unitatea 1, Lumea de acasă, cu proiectul despre casele scriitorilor, și Unitatea 2, Pe tărâmul prieteniei. Scena sau regula stă în lecție. Restul anului vine bucată cu bucată.',
    units: UNITS
  };
}

module.exports = {
  MANUAL,
  COMPETENCIES,
  UNITS,
  grade6Guide
};
