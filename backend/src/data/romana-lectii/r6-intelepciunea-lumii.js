'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f){return romanaLesson(f);}

module.exports = {
  id: 'intelepciunea-lumii',
  title: 'Din înțelepciunea lumii',
  inOwnWords: 'Unitatea adună fabula, personificarea, dicția, textul explicativ, substantivul, cazurile, pronumele, subiectul și proverbul. Scenele stau scrise în lecții. Fabula de la început poate purta titlul Teiul și stejarii, de Alecu Donici. La clasă titlul poate fi altul. La final vine proiectul despre personaje cu tâlc.',
  toc: [
    'Harta unității',
    'Fabula',
    'Personificarea și dialogul',
    'Dicția',
    'Textul explicativ',
    'Substantivul',
    'Cele cinci cazuri',
    'Pronumele personal',
    'Pronumele reflexiv',
    'Subiectul și acordul',
    'Proverbul',
    'Proiect: Personaje cu tâlc',
    'Recapitularea unității'
  ],
  glossary: [
    {
      term: 'fabulă',
      meaning: 'Povestire scurtă, cu animale sau plante, care lasă o învățătură.'
    },
    {
      term: 'personificare',
      meaning: 'Figura de stil prin care un lucru sau un animal primește o faptă de om.'
    },
    {
      term: 'proverb',
      meaning: 'Învățătură scurtă, născută din experiență, adesea cu ritm.'
    }
  ],
  lessons: [
    lesson({
      id: 'deschidere-intelepciune',
      title: 'Ce vei lucra despre înțelepciune',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Harta unității',
          text: 'Fabula stă lângă personificare. Dicția stă lângă textul care explică. Substantivul, cazurile și pronumele vin cu subiectul. Proverbul închide drumul. Codurile sunt cincisprezece.'
        }
      ],
      theory: [
        'Din înțelepciunea lumii se deschide cu o hartă, nu cu un text deja parcurs. Vezi ce urmează și în ce ordine. Titlul de pe bancă poate fi altul. Pașii de lucru rămân la locul lor.',
        'Vei citi o fabulă: o povestire scurtă din care rămâne o învățătură. Lângă ea recunoști personificarea. O plantă, un animal sau un lucru primește o faptă de om.',
        'La vorbire lucrezi dicția, ca să fii auzit și priceput. La scris lucrezi textul explicativ. El arată cum se petrece un fenomen și din ce pricină.',
        'Gramatica reia substantivul. Cazurile sunt cinci: întâi nominativul, apoi acuzativul. Urmează genitivul. Dativul și vocativul închid șirul. După ele vin pronumele personal și forma de politețe.',
        'Pronumele reflexiv arată că fapta se întoarce asupra celui care o face. Subiectul se caută și când lipsește din enunț: e subînțeles ori e inclus în verb.',
        'La interculturalitate cauți tâlcul unui proverb. E o vorbă scurtă, născută din experiență. O legi de o faptă văzută, nu de un titlu care nu stă în față.',
        'Codurile unității sunt cincisprezece. Din grupul 1 reții 1.1 și 1.2, apoi 1.3 împreună cu 1.4. Din grupul 2 reții 2.1, apoi 2.3 și 2.4.',
        'Din grupul 3 reții 3.2, alături de 3.3 și de 3.4. Din grupul 4 reții 4.1 cu 4.2, apoi 4.4 și 4.5. La capăt stă 5.1. Le numeri pe toate.',
        'Codurile sunt ținta întregului drum. Nu țin loc de o lecție gata făcută și nu se memorează orbește. Fiecare se leagă de un lucru: citești, vorbești, scrii sau desparți o propoziție.',
        'Harta nu îți dă scena gata. Scenele stau în lecții, scrise aici. La clasă textul poate purta alt nume. Întrebările despre faptă, imagine și alegere rămân aceleași.'
      ].join('\n\n'),
      example: [
        'Harta pune fabula lângă dicție, textul explicativ lângă substantiv și proverbul la capăt. Cele cincisprezece coduri sunt ținta drumului, nu o lecție terminată.',
        'Dacă sari 4.4 sau 5.1, șirul rămâne tăiat. Le spui pe grupe, apoi verifici că ai ajuns la cincisprezece.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Grupul 1 ține de citit și de înțeles. Grupul 2 ține de vorbire. Grupul 3 și grupul 4 țin de scris și de limba din propoziție. 5.1 închide lista. Fără unul, nu mai sunt cincisprezece.'
        }
      ],
      tryThis: [
        'Scrie trei propoziții. În prima arăți că tema e înțelepciunea și că lucrul de azi e fabula.',
        'În a doua grupezi codurile: 1.1 cu 1.2, 1.3 cu 1.4, apoi 2.1, 2.3 și 2.4, apoi 3.2, 3.3 și 3.4, apoi 4.1, 4.2, 4.4, 4.5 și la urmă 5.1. Spui că sunt cincisprezece.',
        'În a treia arăți că titlul de pe bancă poate diferi, iar pașii rămân aceiași.'
      ].join('\n\n'),
      keyPoints: [
        'Harta unește fabula, vorbirea clară, textul explicativ, gramatica și proverbul.',
        'Cincisprezece coduri, de la grupul 1.1 până la 5.1, spun ce antrenezi în unitate.',
        'Titlul de la clasă poate diferi. Pașii de citire și de analiză rămân la locul lor.'
      ]
    }),
    lesson({
      id: 'fabula',
      title: 'Întâmplarea și morala',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Fabula',
          text: 'Fabula e o povestire scurtă, în versuri ori în proză. Lasă o învățătură prin animale, plante sau lucruri. Are întâmplare și morală.'
        }
      ],
      theory: [
        'Cuvântul pornește din latină. Întâmplarea e pusă pe seama unor făpturi care, de fel, nu țin predici. Din fapta lor rămâne o lecție pentru oameni.',
        'Morala poate sta scrisă la vedere. Poate fi doar înțeleasă din ce se întâmplă. Timpul și locul sunt largi: scena poate cădea oriunde și oricând.',
        'Personajul poartă o mască: trăsătura pe care o vezi din prima. Prin ea stă un fel de om. Poate fi viclean sau naiv. Poate fi harnic, leneș ori mândru. Defectul e luat în râs ca să se îndrepte.',
        'Dialogul arată ce crede fiecare și grăbește fapta. Pe Esop lumea îl ține de întemeietor al acestui gen. În Franța, Jean de La Fontaine a pus defectele oamenilor în spinarea unor animale.',
        'La noi au scris fabule Donici și Pann. Li se alătură Grigore Alexandrescu. Mai departe apar Topîrceanu, cu prenumele George, apoi Arghezi, Tudor, și Pavelescu, Cincinat.',
        'Donici, pe prenumele Alecu, a trăit din 1806 până în 1865. Cu fratele Petrache a învățat la școala militară, în Sankt Petersburg. Cele două volume au ieșit în anii 1840 și 1842.',
        'În ele stau texte de el și tălmăciri. Lovea năravurile stricate. Între titluri sunt Antereul lui Arvinte și Musca la arat. Mai apar Racul, broasca și știuca, apoi Doi câini.',
        'În fabula cu teiul și stejarii, teiul, încă mic, crește între stejari deja înalți. Vijelia arată că statura mare nu te scapă de furtună. Versurile nu se transcriu.',
        'Scena de lucru e alta. În grădina de lângă deal, dovleacul de pe sol s-a lăudat către nuc. Spunea că nucul cuprinde satul din înălțime, iar el rămâne lipit de pământ.',
        'A bătut un vânt puternic. Crengile de sus ale nucului s-au frânt. Dovleacul a ieșit neatins. Morala: cine stă aproape de pământ poate scăpa tocmai când cei ridicați se prăbușesc.',
        'Din scenă notezi trei lucruri. Întâi ce stă scris. Apoi ce vezi, cu ochii tăi. La urmă ce ai face, legat prin pentru că.'
      ].join('\n\n'),
      example: [
        'Scrisul: dovleacul s-a lăudat că nucul vede satul de sus, vântul a frânt crengile înalte, iar dovleacul a rămas întreg. Privirea: Văd grădina, dovleacul jos și nucul ciuntit.',
        'Eu aș fi rămas lângă gard, jos, pentru că vântul i-a luat nucului crengile de sus, iar dovleacul n-a pățit nimic. Donici a trăit din 1806 până în 1865.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Teiul mic de lângă stejarii înalți repetă aceeași idee, fără versuri copiate. Furtuna nu întreabă cât de sus ești. Masca mândriei cade odată cu crengile.'
        }
      ],
      tryThis: [
        'Pe scena dovleacului scrie trei propoziții: scrisul, privirea și fapta ta, cu pentru că. Privirea începe cu Văd.',
        'Formulează morala. Spune la ce folosesc cele două părți. Notează anii lui Donici, 1806 și 1865, anii volumelor, 1840 și 1842, și rolul lui Esop, socotit întemeietor.'
      ].join('\n\n'),
      keyPoints: [
        'Fabula desparte întâmplarea de morală și pune o mască pe un tip de om.',
        'Esop e socotit întemeietorul genului, iar Donici a publicat volume în 1840 și în 1842.',
        'Dovleacul rămâne întreg, nucul își pierde crengile: locul de jos poate feri.'
      ]
    }),
    lesson({
      id: 'personificare',
      title: 'Lucruri care vorbesc',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Personificarea',
          text: 'Personificarea împrumută unei plante, unui animal, unui lucru sau unui fenomen o faptă omenească. Poate vorbi. Poate să se teamă, să se laude sau să ceară.'
        }
      ],
      theory: [
        'În fabulă, personajele vin dintre făpturile mute. Adesea se înfruntă două câte două, iar titlul le anunță, cum fac leul și măgarul.',
        'Dialogul e felul în care își spun părerea, replică după replică. Uneori apare monologul adresat: cineva vorbește singur, către altcineva, și astfel își arată firea.',
        'Când replicile se țin lanț, textul pare o scenetă. Poți spune cine întreabă, cine răspunde și ce trăsătură iese la iveală.',
        'Personificarea nu e orice descriere. Dacă trestia doar se îndoaie, fără voie de om, rămâne o plantă. Dacă întreabă, se laudă sau se teme, deja poartă o faptă omenească.',
        'Pe malul apei, trestia a vrut să știe de ce salcia se ridică atât. Salcia a zis că doar de sus zărește cursul apei. Nu transcriem vorbele ca pe un citat. Păstrăm fapta.',
        'A suflat vântul. Salcia s-a îndoit și a atins solul. Trestia s-a lăsat jos o clipă, apoi s-a îndreptat. Cine se pleacă poate să se ridice. Cine se ține țeapăn ajunge la pământ.',
        'Întrebarea și răspunsul fac dialog. Faptul că două plante vorbesc face personificare. Vântul grăbește întâmplarea, iar morala iese din ce rămâne în picioare.',
        'Din scenă notezi scrisul, apoi privirea, apoi fapta ta, legată prin pentru că. Privirea poate începe cu Le văd, ca să arăți ambele plante.',
        'Aceeași probă se mută pe lucruri de pe bancă. Un creion și o gumă pot vorbi, se pot certa sau se pot lăuda. Însușirea de om e personificarea. Morala o scrii tu, într-o propoziție.'
      ].join('\n\n'),
      example: [
        'Scrisul: trestia a cercetat înălțimea salciei, vântul a culcat salcia, trestia s-a lăsat și apoi s-a ridicat. Privirea: Le văd la mal, una îndoită, cealaltă din nou dreaptă.',
        'Aș fi stat lângă trestie, pentru că vântul a trântit salcia. Faptul că plantele vorbesc e personificare. Schimbul de replici e dialog.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă guma spune că ea repară greșeala, iar creionul se laudă că el scrie totul, amândouă au primit o faptă de om. Replicile lor sunt dialog. Morala poate fi: fără ștersătură, greșeala rămâne.'
        }
      ],
      tryThis: [
        'Pune față în față un creion și o gumă, în patru replici. Fiecare începe cu liniuța de dialog. Într-una se întreabă, în alta se răspunde.',
        'Numește fapta de om pe care le-ai dat-o, adică locul personificării. Închide cu morala ta, într-o singură propoziție.',
        'Pe scena trestiei scrie privirea, începând cu Le văd, și fapta ta, cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Personificarea se vede când planta, animalul sau lucrul face o faptă de om.',
        'Dialogul poartă părerile și grăbește scena. Monologul adresat dă firea pe față.',
        'Trestia se ridică după vânt, salcia ajunge la sol: cine se pleacă poate să revină.'
      ]
    }),
    lesson({
      id: 'dictie',
      title: 'Să te audă și să te înțeleagă',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Dicția',
          text: 'Dicția e rostirea limpede și corectă a unui text. Scopul e să fii auzit și priceput. Intră sunetul, pauza și tonul.'
        }
      ],
      theory: [
        'Un sunet înghițit schimbă cuvântul. Șase, spus pe fugă, poate părea alt număr. De aceea rostești întâi rar, apoi mai repede, fără să tai litere.',
        'O frământare de limbă e antrenamentul. O spui o dată încet, ca să așezi fiecare sunet. A doua oară grăbești, dar șirul rămâne întreg.',
        'Modelul de lucru sună așa: Șase șoareci șuieră sub șifonier. Rar, se aude șase, nu un ș pierdut. Mai repede, tot rămân șase șoareci, nu un grup neclar.',
        'Tonul duce înțelesul. Prima propoziție poate fi liniștită. A doua poate fi mirată: Sub șifonier? Aceeași vorbă, alt ton, altă întrebare pentru cel care ascultă.',
        'În clasă, cine întreabă e emițător. Cine ascultă e receptor. La replica următoare rolurile se schimbă. Dacă vorbești tot tu, celălalt nu mai e emițător.',
        'Când un cuvânt îți e necunoscut, îl rupi în bucăți și îl spui rar. Nu îl ascunzi după penar sau după un caiet. Colegul din ultima bancă trebuie să îl audă.',
        'Înainte de o rostire, citești în gând și marchezi sunetele grele: ș, ț, grupurile de consoane. La virgulă lași o pauză scurtă. La punct lași o pauză mai lungă.',
        'Volumul ajunge până în spatele clasei, fără țipăt. Accentul cade pe cuvântul care poartă ideea. Dacă înghiți finalul, mesajul se rupe.',
        'La un dialog, notezi tonul pe replică: liniștit, mirat, hotărât. Apoi spui cine e emițător la prima replică și cine preia rolul la a doua.',
        'Proba e simplă. Un coleg repetă ce a înțeles. Dacă a auzit alt cuvânt, o iei de la capăt, rar, apoi iar mai repede.'
      ].join('\n\n'),
      example: [
        'Șase șoareci șuieră sub șifonier. Spus rar, șase rămâne șase. Spus a doua oară, mai repede, șirul nu pierde niciun șoarece.',
        'Ton liniștit la prima propoziție, ton mirat la Sub șifonier? Cine întreabă e emițător. Cine răspunde devine emițător la replica lui.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Cuvântul necunoscut de la istorie se spune pe bucăți: întâi rar, apoi în propoziție. Dacă îl acoperi cu mâna sau îl sari, receptorul rămâne fără idee. Emițătorul are datoria sunetului întreg.'
        }
      ],
      tryThis: [
        'Compune două rânduri care se poticnesc în sunetul ș. Arată rostirea înceată, apoi rostirea grăbită.',
        'Alcătuiește patru replici în jurul unui termen greu de la istorie. Una sună liniștit, alta sună mirat.',
        'La prima replică numește emițătorul. La a doua arată cine preia rolul.'
      ].join('\n\n'),
      keyPoints: [
        'Dicția înseamnă sunet întreg, pauză la locul ei și un ton care se înțelege.',
        'Frământarea se spune rar, apoi mai repede, fără sunete înghițite.',
        'Emițătorul și receptorul își pot schimba rolul de la o replică la alta.'
      ]
    }),
    lesson({
      id: 'text-explicativ',
      title: 'Ce, de ce, cum',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Textul explicativ',
          text: 'Explicativul te lămurește asupra unui proces, a unui fenomen sau a unei probleme. Întreabă ce e, din ce pricină apare și în ce fel decurge.'
        }
      ],
      theory: [
        'Ține de textele care informează. Cel care scrie se retrage: nu se pune pe sine în centru, iar faptele pot fi verificate. Tonul nu se încinge și nu povestește o întâmplare a lui.',
        'Verbul stă la persoana a treia. Timpul e prezentul indicativului. Vorbele rămân pe tema aleasă. Impresia de moment nu își are locul aici.',
        'Pricina se leagă prin pentru că, prin deoarece, prin fiindcă ori prin deci. Unul dintre ele trebuie să se vadă, ca să nu rămână cauza ascunsă.',
        'Poți așeza alături un desen, un tabel sau o schemă. Ele sprijină rândurile. Nu le înlocuiesc.',
        'Intră aici articolul din dicționar și foaia din cutia unui medicament. Intră și instrucțiunile, proba de laborator și rețeta. Toate arată pași sau pricini.',
        'Curcubeul ține de optică. Se ivește când lumina Soarelui dă peste stropi de apă și se desparte în culori. La mijloc stau refracția, reflexia și difuzia.',
        'De la marginea exterioară către interior vin roșu, oranj și galben. După ele, verde. Apoi albastru, indigo și violet. Ca să nu le încurci, ții minte ROGVAIV.',
        'Newton, cu prenumele Isaac, a ales șapte culori, după zilele dintr-o săptămână. Unda cea mai lungă din șir e a roșului. Cea mai scurtă e a violetului.',
        'Dintr-o probă simplă se vede o pricină. Oțetul amestecat cu bicarbonat de sodiu dă dioxid de carbon. Balonul pus la gura sticlei se umflă, căci se naște gazul.',
        'Paranteza rotundă adaugă o lămurire scurtă, nu o idee nouă. Sublinirea oprește un cuvânt de care atârnă înțelesul. Poți scrie după el, în paranteză, că merită subliniat.',
        'Despre curcubeu, textul tău spune ce este, din ce pricină apare și cum se înșiră culorile. Are prezent, persoana a treia, un conector de cauză și șirul ROGVAIV.'
      ].join('\n\n'),
      example: [
        'Curcubeul se ivește pentru că lumina Soarelui se desparte în stropii de apă. Dinspre afară către interior, culorile urmează ROGVAIV (șir de ținut minte).',
        'Verbele sunt la prezent, persoana a treia. Refracția poate fi marcată ca vorbă de bază, fiindcă dă numele fenomenului. Balonul crește, deoarece apare dioxidul de carbon.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'O rețetă e tot text explicativ: persoana a III-a, pași, o cauză. Aluatul crește deoarece drojdia produce gaz. Paranteza poate preciza timpul, iar un cuvânt ca dospire poate fi marcat ca important.'
        }
      ],
      tryThis: [
        'Alcătuiește vreo șaptezeci până la nouăzeci de cuvinte despre curcubeu. Acoperă trei întrebări: ce este, din ce pricină se ivește, cum se înșiră culorile.',
        'Ține persoana a treia și prezentul. Pune pentru că și o paranteză rotundă. Alege un cuvânt de bază și notează după el, în paranteză, că e de subliniat.',
        'Include și șirul ROGVAIV, dinspre marginea exterioară către interior.'
      ].join('\n\n'),
      keyPoints: [
        'Explicația folosește persoana a treia, prezentul și un ton neutru, iar pricina rămâne la vedere.',
        'ROGVAIV ține culorile de la marginea din afară spre interior. Roșul are unda cea mai lungă.',
        'Paranteza adaugă o precizare. Subliniera oprește un cuvânt care poartă ideea.'
      ]
    }),
    lesson({
      id: 'substantiv',
      title: 'Numele lucrurilor',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Substantivul',
          text: 'Substantivul e partea de vorbire care își schimbă forma. Numește ființe, lucruri, fenomene din natură, simțăminte și stări.'
        }
      ],
      theory: [
        'Cel comun dă nume unei clase întregi, de pildă copil sau casă, apoi floare sau bucurie. Cel propriu numește un singur exemplar și cere literă mare: Craiova, Andrei, Dunărea.',
        'Genul se vede cu proba un-doi și cu proba o-două. La masculin iei un pom, apoi doi pomi. La feminin, o floare și două flori. La neutru, un album față de două albume.',
        'La ființe, tată și mamă sunt cuvinte diferite. Girafa, elefantul și fluturele, epicene, folosesc un singur cuvânt. Urs și ursoaică, rață și rățoi se deosebesc prin sunete adăugate.',
        'Numărul e ori singular, ca la o carte, ori plural, ca la cărți. Articolul hotărât arată un lucru știut și se lipește la urmă: pomul, floarea. Cel nehotărât stă în față și e cuvânt de sine stătător: un pom, o floare, niște copii.',
        'Unele păstrează aceeași haină și la plural: genunchi, pui, unchi, nume. La corn ai trei forme: coarne, cornuri și corni.',
        'Două plurale pot fi amândouă corecte, de pildă coperte cu coperți sau tuneluri cu tunele.',
        'Forme bune de ținut minte: salate, chibrituri, succese.',
        'N-are plural grupul defectiv de plural: istorie și geografie, lapte și miere, aur, aramă, cupru. Li se adaugă curaj, cinste, caș, milă, oxigen și orez.',
        'N-are singular grupul defectiv de singular: icre și câlți, aplauze și plete, rechizite. La fel blugi, grâne, ochelari și pantaloni.',
        'Colectivul sună a singular, dar strânge mai mulți: roi și armată, cârd și cireadă. Apoi popor, echipă și mulțime. Se poate construi și cu sunete, precum muncitorime, brădet sau păpuriș.',
        'Când e subiect, acordul stă la singular, ca în Echipa a câștigat. Dacă alături apare un plural care numește membrii, sunt bune amândouă variantele: O mulțime de fete a venit și forma cu au venit.',
        'De la om până la oameni crește cel mai tare numărul literelor. Doar zi, împreună cu zilele de luni până vineri, la feminin, se încheie în i.'
      ].join('\n\n'),
      example: [
        'Împăratul: comun, gen masculin, număr singular, articol hotărât, anume l. Ca nume propriu stă Dunărea. Lapte n-are plural. Ochelari n-are singular.',
        'În Echipa a câștigat, colectivul ține predicatul la singular. Merg și O mulțime de fete a venit, și varianta cu au venit. Pentru corn, cornuri și coarne sunt două plurale.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Și aceste perechi au ambele plurale corecte: căpșune cu căpșuni, apoi cireșe cu cireși. Niveluri stă lângă nivele. Coarde stă lângă corzi. Bobi stă lângă boabe, iar roți lângă roate. Girafa e epicen. Ursoaică adaugă sunete față de urs. Forme bune sunt și aragazuri, înghețate, ciocolate.'
        }
      ],
      practice: [
        '1) Desparte împăratul: fel, gen, număr și felul articolului. Adaugă un nume propriu scris cu majusculă.',
        '2) Fă două coloane. Într-una: lapte, miere, curaj, orez. În cealaltă: ochelari, plete, blugi, aplauze. Spune care grup n-are plural și care n-are singular.',
        '3) Notează Echipa a câștigat și arată numărul predicatului. Mai dă două plurale corecte ale lui corn.',
        '4) Scrie pluralul bun pentru salată, pentru chibrit și pentru succes.'
      ].join('\n\n'),
      answers: [
        'comun, masculin, singular, articol hotărât l. Propriu, de pildă Dunărea.',
        'lapte, miere, curaj, orez: defectiv de plural. ochelari, plete, blugi, aplauze: defectiv de singular.',
        'Predicatul stă la singular, fiindcă echipa e colectiv. Două plurale: coarne și cornuri.',
        'salate, chibrituri, succese.'
      ],
      mistakes: 'Nu pune plural la lapte sau la curaj. Nu pune singular la ochelari sau la blugi. Echipa nu cere predicat la plural doar fiindcă adună oameni.',
      tryThis: 'Mai scrie o pereche de epicene și o pereche cu sunete adăugate. Arată că O mulțime de fete a venit și varianta cu au venit pot sta amândouă.',
      keyPoints: [
        'Substantivul își schimbă genul, numărul și articolul, iar numele propriu cere literă mare.',
        'Cine e defectiv duce lipsă de un număr. Colectivul, pus subiect, cere predicat la singular.',
        'Dacă lângă colectiv stă un plural al membrilor, predicatul poate sta și la plural.'
      ]
    }),
    lesson({
      id: 'cazuri',
      title: 'Cinci forme, cinci roluri',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Cazul',
          text: 'Cazul e haina substantivului: prin ea se vede rolul din propoziție. Sunt cinci haine, de la nominativ până la vocativ.'
        }
      ],
      theory: [
        'La nominativ, substantivul poate fi subiect. Îl întrebi cu cine. Poate fi și nume predicativ. Atunci îl întrebi cu cine este, cu cum este sau cu ce este.',
        'Elevul este în clasă: subiect. Mihai este elev: nume predicativ.',
        'La acuzativ, atributul poate sta cu prepoziție: o pădure de stejari. Complementul: Bunicul citește ziarul. Împrejurarea: Au plecat în pădure.',
        'Prepoziția nu se schimbă după gen sau după număr. Leagă atributul de cuvântul lămurit.',
        'Un termen au cu, de, în, la și lângă. Mai mulți termeni au de la, apoi de pe lângă, despre și înspre.',
        'Genitivul e atribut substantival genitival. Îl întrebi cu al cui, cu a cui, cu ai cui sau cu ale cui. În florile vecinilor sunt bine îngrijite, vecinilor stă la genitiv.',
        'Articolul genitival se potrivește cu substantivul centru. Al și ai țin de masculin. A și ale țin de feminin. La poveștile minunate ale copilăriei, ale se leagă de povești.',
        'La echipamentul al băiatului, al se leagă de echipament. Grupul al băiatului e genitiv.',
        'Dativul e complement. Îl întrebi cu cui. Model: Lui Andrei i-am făcut observație. Forme corecte: mamei și colegei, familiei și vitrinei.',
        'Mai sunt corecte floarei și copilului, mingii și bărcii. De la Olga faci Olgăi. De la Ion faci lui Ion.',
        'Vocativul e chemarea. Nu primește funcție sintactică și se desparte prin virgulă. La masculin: băiete și băieților. La feminin: fato, fată și fetelor.',
        'Model fără determinant: Treci la tablă, Radule. Cu determinant, virgula închide tot grupul, ca în Dragă mamă, îți scriu.',
        'Substantivul poate sta în centrul grupului, ca la copacii albi sau la dansul fulgilor. Poate sta și lângă alt cuvânt: atribut în grupul fulgii de nea, complement în enunțul citește cartea.'
      ].join('\n\n'),
      example: [
        'Elevul citește: elevul stă la nominativ și e subiect. Mihai este elev: elev e nume predicativ, tot la nominativ. În citește ziarul, ziarul e complement, la acuzativ.',
        'În florile vecinilor, vecinilor stă la genitiv. Lui Andrei i-am făcut observație: grupul e la dativ. Fetelor, a sosit rochia: fetelor cheamă, deci e vocativ și n-are rol sintactic. De la are doi termeni.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Poveștile minunate ale copilăriei: ale e articol genitival, acordat cu poveștile. Echipamentul al băiatului: al se acordă cu echipamentul. Aceeași regulă, alt gen.'
        }
      ],
      practice: [
        '1) Scrie un enunț în care nominativul e subiect și unul în care e nume predicativ. Spune rolul, pe rând.',
        '2) Scrie un acuzativ cu prepoziția cu și un genitiv cu articolul ale. Numește rolul la acuzativ și la genitiv.',
        '3) Dă forma de dativ pentru mamă, pentru floare, pentru copil și pentru Olga. Pune un vocativ cu Radule, după virgulă, și arată că nu are rol sintactic.',
        '4) Spune ce rol are dativul. Mai arată că de la e prepoziție cu mai mulți termeni, iar cu are unul singur.'
      ].join('\n\n'),
      answers: [
        'Elevul citește: elevul, subiect. Mihai este elev: elev, nume predicativ. Ambele sunt nominativ.',
        'Plec cu rucsacul: rucsacul, acuzativ. Poveștile ale copilăriei: ale copilăriei, atribut genitival.',
        'mamei, floarei, copilului, Olgăi. Treci la tablă, Radule: vocativ, fără funcție sintactică.',
        'Dativul e complement și răspunde la cui. De la e compusă. Cu e simplă.'
      ],
      mistakes: 'Nu lăsa vocativul lipit de restul frazei. Virgula desparte chemarea, iar dacă are determinanți, desparte tot grupul. Dativul lui floare e floarei, nu o formă după modelul masculin.',
      tryThis: 'Construiește încă un genitiv cu al, pe modelul echipamentului, și un vocativ cu Dragă mamă, în care virgula închide tot grupul.',
      keyPoints: [
        'La nominativ ai fie subiect, fie nume predicativ. Acuzativul vine des împreună cu o prepoziție.',
        'Genitivul se întreabă cu al cui, dativul cu cui, iar articolul genitival urmează centrul.',
        'Vocativul e o chemare. Stă după virgulă și nu primește rol în propoziție.'
      ]
    }),
    lesson({
      id: 'pronume-personal',
      title: 'Ține locul numelui',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Pronumele personal',
          text: 'Pronumele stă în locul unui nume. Cel personal arată cine vorbește, cine ascultă ori despre cine e vorba.'
        }
      ],
      theory: [
        'Pentru cine vorbește ai eu și noi. Pentru cine ascultă ai tu și voi. Pentru cine e pomenit ai el cu ea, apoi ei cu ele. Genul se deslușește la persoana a treia.',
        'Nominativul cu accent dă eu și noi, tu și voi, la urmă el, ea, ei, ele. Acuzativul cu accent dă mine și noi, tine și voi, apoi aceleași forme de persoana a treia.',
        'Formele scurte se pot lipi cu cratimă: mă cu ne, te cu vă, îl cu o, îi cu le. Apar în ne-a dat și în l-a ascultat. Pot sta și dezlipite, ca în îți scriu.',
        'Dativul cu accent: mie cu nouă, ție cu vouă, apoi lui, ei și lor. Dativul scurt: îmi cu ne, îți cu vă, apoi îi și le. Centru poate fi doar forma cu accent, ca în Ei au înțeles.',
        'Scrierea urmează sensul. Mie îmi plac romanele, căci mie e dativul cu accent. Mi-e înseamnă îmi este. V-a dus înseamnă vă a dus. Separat, l-a văzut privește o persoană, iar la văzut ar fi un loc. Mi-a scris păstrează auxiliarul. Mia ar fi un număr.',
        'L-aș nu e laș. Ne-a nu e nea. V-ar nu e var.',
        'Anticiparea pune cliticul înaintea numelui: L-am chemat pe Andrei. Reluarea îl pune după nume: Fetei i-a dat premiul.',
        'La politețe, persoana a doua are dumneata, scurt d-ta, și dumneavoastră, scurt dv., dvs. sau d-voastră. Dumitale e dativ-genitiv la singular. Chiar pentru o persoană, verbul stă la plural: Dumneavoastră sunteți amabil.',
        'Persoana a treia: dumnealui, dumneaei, dumnealor. Mai puțin ceremonios: dânsul, dânsa, dânșii, dânsele. Respectul maxim se scrie cu literă mare și fără cratimă, de pildă Excelența Sa sau Maiestatea Sa.'
      ].join('\n\n'),
      example: [
        'Eu e nominativ, persoana întâi. Mine e acuzativ cu accent, mă e clitic. Mie îmi plac cărțile: alegi mie, nu mi-e, fiindcă urmează îmi plac.',
        'L-am chemat pe Andrei dublează dinainte, deci e anticipare. Fetei i-a dat premiul reia numele, deci e reluare. Dumneavoastră sunteți gata: verbul e la plural. Dânsul e mai puțin ceremonios decât dumnealui.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Diftongul ie se aude în iel, în ia și în iele. Triftongul stă în ieu și în iei. Ca roluri: subiect în El este colegul meu, complement în Pe ea am văzut-o, împrejurare în Mergem la ei.'
        }
      ],
      practice: [
        '1) Notează nominativul și dativul cu accent la persoana întâi singular și la persoana a doua singular.',
        '2) Păstrează doar varianta corectă: Mie îmi plac sau Mi-e îmi plac, V-a dus sau Va dus, L-a văzut sau La văzut, Mi-a scris sau Mia scris.',
        '3) Construiește o anticipare, după chipul lui L-am chemat pe Andrei, și o reluare, după chipul lui Fetei i-a dat premiul.',
        '4) Arată de ce dumneavoastră ia verbul la plural și dă o propoziție cu sunteți. Compară respectul lui dânsul cu cel al lui dumnealui.'
      ].join('\n\n'),
      answers: [
        'eu și mie; tu și ție.',
        'Corecte, pe rând: Mie îmi plac. Apoi V-a dus. Apoi L-a văzut. La urmă Mi-a scris.',
        'Anticipare: L-am strigat pe Andrei. Reluare: Fetei i-a înmânat premiul.',
        'Dumneavoastră sunteți gata: pluralul rămâne chiar pentru o persoană. Dânsul e mai puțin ceremonios decât dumnealui.'
      ],
      mistakes: 'Nu scrie mi-e când urmează îmi plac: acolo trebuie mie. Nu lăsa la în loc de l-a când e vorba de o persoană. Dumneavoastră nu se acordă cu ești.',
      tryThis: 'Mai deosebește l-aș de laș și ne-a de nea, fiecare într-un enunț scurt. Spune funcția lui ei în Ei au înțeles.',
      keyPoints: [
        'Pronumele personal are forme cu accent și forme scurte, iar scrierea se hotărăște după sens.',
        'Mie nu ține loc de mi-e, l-a nu ține loc de la, mi-a nu ține loc de mia. Dubla exprimare e anticipare sau reluare.',
        'Dumneavoastră e o formă de respect și cere verbul la plural, chiar dacă vorbești cu unul singur.'
      ]
    }),
    lesson({
      id: 'pronume-reflexiv',
      title: 'Aceeași persoană cu verbul',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Pronumele reflexiv',
          text: 'Pronumele reflexiv arată că fapta se întoarce spre cel care o face. Persoana și numărul coincid cu ale verbului. Îl găsești la acuzativ și la dativ, nu în altă parte.'
        }
      ],
      theory: [
        'Forme numai ale lui are la persoana a treia, fără deosebire de gen. La acuzativ stau sine și se, plus s- lipit cu cratimă. La dativ stau sie și sieși, plus își și și-.',
        'La persoana întâi și la a doua împrumută formele scurte ale pronumelui personal. Totuși persoana și numărul trebuie să fie ale verbului. Altfel nu mai e reflexiv.',
        'În Mă plictisesc, mă și verbul sunt persoana întâi, deci mă e reflexiv. În Mă plictisești, mă rămâne persoana întâi, iar verbul e persoana a doua, deci mă e pronume personal.',
        'Proba e scurtă. Vezi cine face fapta și asupra cui cade. Dacă e aceeași persoană, ai reflexiv. Dacă e altcineva, ai personal.',
        'S-a insistat lipește pronumele de auxiliar. Colega sa arată a cui e colega, a lui sau a ei. Aici sa e adjectiv pronominal. Nu le scrii la fel.',
        'Nu s-au hotărât păstrează pronumele lângă auxiliar. Vii sau pleci: sau leagă două variante și nu e pronume. S-ar părea păstrează condiționalul.',
        'Mulți sar peste micul-dejun: sar e verbul a sări, nu condiționalul s-ar. Sensul hotărăște dacă pui cratimă.',
        'În Mă întreb, mă e reflexiv, fiindcă eu mă întreb pe mine. În Te cheamă, te e personal, fiindcă te strigă altcineva.',
        'În Își face griji, își e reflexiv, la persoana a treia, dativ. În Te uiți în oglindă, te e reflexiv, fiindcă tu ești cel care se uită.'
      ].join('\n\n'),
      example: [
        'Mă plictisesc: reflexiv, persoana întâi, singular, acuzativ, formă scurtă. Mă plictisești: pronume personal, fiindcă cele două persoane nu se suprapun.',
        'S-a insistat lipește pronumele de auxiliar. Colega sa e adjectivul de posesie. Sar peste micul-dejun e verbul a sări. În Își face griji, pronumele e reflexiv, la persoana a treia și la dativ.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Te uiți în oglindă: tu și te sunteți aceeași persoană, deci reflexiv. Te cheamă mama: te e persoana a II-a, iar verbul ține de mama, deci personal. Aceeași formă, rol diferit.'
        }
      ],
      practice: [
        '1) Alege scrierea bună: S-a insistat sau Sa insistat. Apoi Colega sa sau Colega s-a. Apoi Vii sau pleci sau Vii s-au pleci.',
        '2) Alege între S-ar părea și Sar părea, apoi între Mulți sar și Mulți s-ar peste micul-dejun. Spune de ce.',
        '3) Fă patru enunțuri scurte. Unul folosește se la persoana a treia. Altul pune vă la dativ. Al treilea folosește își. Ultimul are mă reflexiv.',
        '4) Explică de ce pronumele din Mă plictisesc e reflexiv, iar cel din Mă plictisești e personal.'
      ].join('\n\n'),
      answers: [
        'S-a insistat. Colega sa. Vii sau pleci.',
        'S-ar părea, fiindcă e condițional. Mulți sar, fiindcă e verbul a sări, nu s-ar.',
        'Se spală. Vă spuneți povești. Își face griji. Mă întreb.',
        'La Mă plictisesc, pronumele și verbul sunt ambele la persoana întâi. La Mă plictisești, pronumele e la persoana întâi, iar verbul e la persoana a doua.'
      ],
      mistakes: 'Nu pune cratimă la sar când e vorba de a sări. Nu lipi sa de verb când arăți posesia: colega sa rămâne fără cratimă. Reflexivul cere aceeași persoană cu verbul.',
      tryThis: 'Mai scrie un enunț în care te e reflexiv și unul în care te e personal, pe modelul oglinzii și al chemării.',
      keyPoints: [
        'Reflexivul se suprapune, ca persoană și ca număr, peste verb și stă la acuzativ ori la dativ.',
        'Mă plictisesc e reflexiv. Mă plictisești e personal, fiindcă persoanele nu se suprapun.',
        'S-a lipește un pronume de auxiliar, sa arată posesia, iar sar e verbul a sări.'
      ]
    }),
    lesson({
      id: 'subiect-acord',
      title: 'Cine face și cum se acordă',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Subiectul',
          text: 'Subiectul spune cine înfăptuiește predicatul verbal sau cui i se dă însușirea din cel nominal. Cazul lui e nominativul.'
        }
      ],
      theory: [
        'Poate fi substantiv comun: Școlarii sunt în clase. Poate fi nume propriu: Dunărea izvorăște din Munții Pădurea Neagră. Poate fi pronume, model El este premiant, sau numeral, model Trei sunt cei care au confirmat.',
        'Cel simplu are un singur termen, de pildă Băieții aleargă. Cel multiplu are mai mulți termeni, de pildă Băieții și fetele aleargă. La multiplu, predicatul trece la plural.',
        'Când nu e scris, ai două feluri. Cel subînțeles a fost numit mai devreme și revine prin verb la persoana a treia. Întâi: Fetele au sosit devreme. Urmează, cu subiectul tot ele: Au luat înghețată.',
        'Cel inclus se citește din terminația verbului, la persoana întâi sau a doua. Am luat examenul. Cine? Eu. Nu e scris, dar terminația îl arată.',
        'Între subiect și predicat e o legătură în ambele sensuri. Predicatul cere subiectului nominativul. Subiectul cere predicatului același număr și aceeași persoană.',
        'Dacă pronumele sunt de persoane diferite, persoana întâi trece înaintea celorlalte. Persoana a doua trece înaintea persoanei a treia. De aici iese forma verbului.',
        'Forme bune, în altă ordine decât o listă oarbă. Copiii sar coarda. Păsările zboară spre sud. Fata merge în excursie. În alt enunț, fetele și băieții sunt în parc.',
        'Alt șir, tot cu acordul potrivit: mama și tata ne-au sfătuit, fetele merg în tabără, noi vom participa. Ei fuseseră strigați. Andrei citea.',
        'Noi și ei vom recita, fiindcă noi, persoana întâi, are întâietate. Nu scrii vor, deși ei ar cere persoana a treia. Persoana întâi câștigă.'
      ].join('\n\n'),
      example: [
        'Băieții aleargă: un singur termen, substantiv, nominativ. Când se adaugă și fetele, termenii sunt mai mulți, iar verbul trece la plural.',
        'După Fetele au sosit, propoziția Au luat înghețată lasă subiectul subînțeles: tot fetele. Am luat examenul îl include pe eu. Noi și ei vom recita, nu vor: persoana întâi are întâietate.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Tu și ei cântați, nu cântă: persoana a doua trece înaintea celei de-a treia. Eu și tu plecăm, nu plecați: persoana întâi trece înainte. Aceeași scară.'
        }
      ],
      practice: [
        '1) Construiește un subiect cu un termen și unul cu mai mulți. La al doilea, spune numărul predicatului.',
        '2) La fetele sosite devreme, spune cine a luat înghețata, deși numele nu se repetă. În Am luat examenul, spune cine e inclus în verb.',
        '3) Alege forma potrivită: Copiii sar sau sare coarda. Fata merge sau merg în excursie. Fetele și băieții sunt sau este în parc. Păsările zboară.',
        '4) Completează: Noi și ei vom sau vor recita. Ei fuseseră sau fusese strigați. Andrei citea sau citeau. Spune de ce lângă noi și ei stă vom.'
      ].join('\n\n'),
      answers: [
        'Băieții aleargă, simplu. Băieții și fetele aleargă, multiplu, predicat la plural.',
        'Subînțeles: fetele. Inclus: eu.',
        'sar, merge, sunt, zboară.',
        'vom recita, fuseseră, citea. Vom, fiindcă noi, persoana I, are prioritate față de ei.'
      ],
      mistakes: 'Nu pui vor lângă noi și ei. Persoana I trece înainte. Nu căuta un subiect scris în Am luat examenul: e inclus în terminație. La multiplu, predicatul nu rămâne la singular.',
      tryThis: 'Mai scrie un enunț cu tu și ei, în care persoana a II-a trece înainte, și unul cu mama și tata, cu predicatul la plural.',
      keyPoints: [
        'Subiectul stă la nominativ. Poate avea un termen sau mai mulți, poate fi subînțeles ori inclus în verb.',
        'Acordul predicatului urmărește persoana și numărul. Când termenii sunt mai mulți, verbul stă la plural.',
        'La persoane amestecate, persoana întâi trece înainte, iar persoana a doua trece înaintea celei de-a treia.'
      ]
    }),
    lesson({
      id: 'proverbe',
      title: 'O învățătură scurtă',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Proverbul',
          text: 'Proverbul vine din latinescul proverbium. E o povață a poporului, scoasă din trăire, rostită pe scurt, deseori cu cadență sau cu rimă.'
        }
      ],
      theory: [
        'Nu e nevoie de o amintire din altă parte. Îți ajunge scena de mai jos. O legi de o faptă, nu de un titlu care nu stă în față.',
        'Într-o duminică, la prima oră, Radu a zăbovit în pat. Autobuzul din fața școlii a plecat fără el. A luat-o la fugă prin curte și tot a intrat cel din urmă la antrenament.',
        'Antrenorul i-a amintit vorba Cine se scoală de dimineață departe ajunge. Proverbul nu povestește dimineața lui Radu. O judecă. Întârzierea și locul ultim sunt fapta. Vorba e tâlcul.',
        'Poți folosi și alte proverbe, spuse întregi. Unul: Apa trece, pietrele rămân. Altul: Cu o floare nu se face primăvară. Încă unul: Buturuga mică răstoarnă carul mare.',
        'Despre nărav: Lupul își schimbă părul, dar năravul ba. Despre răbdare: Toamna se numără bobocii. Despre amânare: Nu lăsa pe mâine ce poți face azi. Despre ajutor: Unde-s doi, puterea crește.',
        'Ca să alegi bine, cauți fapta, nu un cuvânt izolat. Radu a pierdut dimineața și a ajuns la urmă. I se potrivește vorba despre sculatul de dimineață, nu cea despre lup.',
        'Apa trece, pietrele rămân s-ar lega de ce dăinuie după o furtună de vorbe. Cu o floare nu se face primăvară s-ar lega de o singură ispravă luată drept obicei.',
        'Buturuga mică răstoarnă carul mare arată că un lucru mărunt poate opri un lucru mare. Vorba despre lup arată că înfățișarea se schimbă, iar năravul rămâne.',
        'Toamna se numără bobocii cere răbdare până la rezultat. Unde-s doi, puterea crește cere ajutor, nu lucru de unul singur. Fiecare proverb își are fapta.',
        'Din scena lui Radu notezi scrisul, apoi privirea, apoi fapta ta, legată prin pentru că. Privirea începe cu Îl văd. La urmă spui proverbul potrivit și motivul.'
      ].join('\n\n'),
      example: [
        'Scrisul: duminică, Radu a zăbovit în așternut, a pierdut autobuzul și a intrat ultimul la antrenament. Privirea: Îl văd alergând prin curte, iar autobuzul e deja dus.',
        'Aș fi potrivit ceasul din ajun, pentru că a zăbovit și a sosit la urmă. Vorba care i se potrivește e Cine se scoală de dimineață departe ajunge.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă un coleg amână tema până a doua zi și o ratează, se potrivește Nu lăsa pe mâine ce poți face azi. Nu se potrivește vorba despre lup, fiindcă aici nu e vorba de un nărav ascuns, ci de o treabă lăsată pe mai târziu.'
        }
      ],
      tryThis: [
        'Pe scena lui Radu notează scrisul, privirea și fapta ta, legate prin pentru că. Privirea începe cu Îl văd.',
        'Spune ce proverb i se potrivește și din ce faptă. Mai transcrie întregi trei proverbe, fiecare pe rând: Apa trece, pietrele rămân. Apoi Buturuga mică răstoarnă carul mare. Apoi Nu lăsa pe mâine ce poți face azi.'
      ].join('\n\n'),
      keyPoints: [
        'Proverbul e o povață scurtă, scoasă din trăire, și se lipește de o faptă anume.',
        'Întârzierea lui Radu se judecă prin vorba despre cine se scoală de dimineață departe ajunge.',
        'Altă faptă cere alt proverb: amânarea cere vorba despre mâine, nu pe cea despre lup.'
      ]
    }),
    lesson({
      id: 'proiect-fabule',
      title: 'Personaje cu tâlc',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Proiectul',
          text: 'Personaje cu tâlc se lucrează împreună. Adunați perechi puse față în față, apoi le arătați prin text și prin imagine. Povața o formulați voi.'
        }
      ],
      theory: [
        'Perechile vin din fabule, din cărțile pe care le aveți voi. Nu preluați o fabulă deja scrisă și nu copiați versuri. Vă ajung perechea, trăsătura și o prezentare făcută de grup.',
        'Puteți alege o bandă desenată. Puteți alege un poster. Puteți alege o broșură. Nu e de ajuns o foaie citită cu voce tare, fără imagine.',
        'În fabulă, masca poate întruchipa un defect. Poate întruchipa și o calitate. Masca e trăsătura care sare în ochi și ține loc de un fel de om.',
        'Lupul poartă, de cele mai multe ori, cruzimea și vorba călcată în picioare. Vulpea se cunoaște după viclenie și după vorba care convinge.',
        'Leul întruchipează puterea: când crudă, când lesne de păcălit. Măgarul adună simplitatea și nemulțumirea. Nu e obligatoriu să luați chiar aceste patru măști. Sunt modele.',
        'Puteți alege o pereche a voastră din lumea celor care nu vorbesc de fel. Important e contrastul: un defect lângă o calitate, sau două defecte care se ciocnesc.',
        'Un grup poate lua vulpea și corbul, fără să copieze o fabulă gata făcută. Vulpea rămâne masca vicleniei. Corbul e masca celui pe care lauda îl doboară.',
        'Stabiliți rolurile înainte să desenați. Cine caută perechea. Cine desenează măștile. Cine scrie textul. Cine prezintă în fața clasei.',
        'Povața o formulați voi, în două propoziții, din trăsăturile alese. Nu o copiați dintr-o carte. Posterul, banda sau broșura trebuie să se înțeleagă și fără o explicație lungă.',
        'La prezentare, fiecare spune ce a făcut. Măștile se numesc pe trăsătură, nu doar pe animal. Opoziția se vede din prima privire.'
      ].join('\n\n'),
      example: [
        'Grupul alege vulpea și corbul și lasă versurile necitate. Vulpea rămâne masca vicleniei. Corbul e cel doborât prin laudă. Suportul e un poster.',
        'Ana notează trăsăturile. Vlad face desenul măștilor. Lia formulează povața într-o propoziție. Radu vorbește în fața clasei. Patru oameni, patru treburi.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Lupul și mielul pot sta pe o broșură. Lupul poartă cruzimea și vorba nerespectată. Mielul poartă nevinovăția. Morala, scrisă de grup: cine are puterea nu are dreptate doar fiindcă vorbește tare.'
        }
      ],
      tryThis: [
        'Schițează planul unui grup de patru. Alege două făpturi mute, puse față în față.',
        'Spune, într-o propoziție, ce mască poartă fiecare. Poți lua trăsături din lecție sau o pereche gândită de tine. Alege suportul: bandă desenată, poster ori broșură.',
        'Împarte câte o treabă fiecăruia. Versurile rămân necopiate. Povața o scrii tu, în două propoziții.'
      ].join('\n\n'),
      keyPoints: [
        'Proiectul strânge perechi puse față în față și le arată prin cuvinte și prin desen.',
        'Masca din fabulă arată un defect ori o calitate. Lupul, vulpea, leul și măgarul sunt doar modele.',
        'Povața o scrie grupul. Versurile unei fabule deja scrise nu se copiază.'
      ]
    }),
    lesson({
      id: 'recap-intelepciune',
      title: 'Încheierea despre înțelepciune',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Scena de încheiere',
          text: 'Încheierea stă pe o scenă scrisă aici. Pui laolaltă o chemare, un nume colectiv și un proverb. Nu cauți un scor și nu cauți o foaie de puncte.'
        }
      ],
      theory: [
        'Dis-de-dimineață, în curtea școlii, antrenorul le-a strigat fetelor că au sosit înaintea orei. Meciul fusese câștigat de echipă. Un caiet stătea deschis pe bancă.',
        'Chiar lângă file se putea citi Cine se scoală de dimineață departe ajunge. Scena aceasta ajunge. Nu e nevoie de un text din altă parte.',
        'Din scenă notezi scrisul, apoi privirea, apoi fapta ta, legată prin pentru că. Privirea începe cu Le văd, fiindcă sunt mai multe fete.',
        'Fetelor e vocativ. Chemarea se desparte prin virgulă și n-are funcție sintactică. Antrenorul le strigă. În strigătul de chemare, fetele nu sunt subiect.',
        'Echipa e substantiv colectiv: formă de singular, înțeles de grup. În Echipa a câștigat, predicatul rămâne la singular. Nu îl treci la plural doar fiindcă în echipă sunt mai mulți.',
        'Proverbul de pe caiet judecă fapta celor care au venit devreme. Nu e o fabulă: n-are întâmplare cu măști și n-are dialog de animale. E o povață scurtă, scoasă din experiență.',
        'Dicția strigătului contează. Fetelor trebuie auzit până în spatele curții, cu sunetul întreg. Cine strigă e emițător. Fetele, cât ascultă, sunt receptori.',
        'Dacă ai spune doar ați venit, fără fetelor, n-ai mai avea vocativ. Dacă ai spune echipele au câștigat, ai schimba numărul și n-ai mai avea colectivul la singular.',
        'Morala scenei o poți formula tu, într-o propoziție, din fapta celor care au venit devreme și din rezultatul echipei. Nu o copia din caietul de pe bancă. O legi cu pentru că.',
        'Unitatea se închide astfel: o scenă, un caz, un acord și un proverb. Fabula, personificarea și textul explicativ au rămas în lecțiile lor. Aici le recunoști doar dacă scena le cere.'
      ].join('\n\n'),
      example: [
        'Scrisul: dis-de-dimineață, antrenorul a strigat în curte că fetele au sosit devreme, iar echipa câștigase. Privirea: Le văd adunate lângă el, cu caietul deschis pe bancă.',
        'Aș fi sosit și eu înainte de oră, pentru că echipa câștigase, iar pe caiet stă vorba despre dimineață. Fetelor e vocativ. Echipa e subiect colectiv și predicatul stă la singular.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă pe caiet ar sta Unde-s doi, puterea crește, proverbul s-ar lega de echipă, nu de ora sosirii. Vorba despre dimineață se leagă de cine a venit devreme. Fapta alege proverbul.'
        }
      ],
      tryThis: [
        'Pe scena din curte notează scrisul, privirea și fapta ta, legate prin pentru că. Privirea începe cu Le văd.',
        'Arată cazul lui Fetelor. Explică de ce predicatul de lângă echipă stă la singular. Spune ce proverb e lângă caiet.',
        'Închide cu o povață a ta, de o propoziție, legată de o faptă din scenă.'
      ].join('\n\n'),
      keyPoints: [
        'Încheierea pune laolaltă curtea, o chemare, un nume de grup și un proverb.',
        'Fetelor se desparte prin virgulă. În Echipa a câștigat, verbul rămâne la singular.',
        'Vorba de pe caiet se leagă de fetele venite devreme, nu de un titlu care lipsește.'
      ]
    })
  ]
};
