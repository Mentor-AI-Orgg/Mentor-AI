// Ghid intern pentru Mentor AI, clasele 5–8, doar Română și Matematică.
//
// Sursa de orientare: programa școlară oficială aprobată prin
// OMEN nr. 3393/28.02.2017 (Ministerul Educației), publicată în
// Monitorul Oficial nr. 164 bis / 07.03.2017. Am citit programele
// de Limba și literatura română și de Matematică pentru gimnaziu
// de pe site-uri ale ministerului / inspectoratelor (edu.ro, ISJ).
//
// Nu copiem manuale de pe manuale.edu.ro și nu reluăm textul
// programelor. Mai jos sunt rezumate în cuvintele noastre: ce am
// înțeles că trebuie să știe un elev, pe ani, ca mentorul să
// ghideze fără să predea dintr-un manual anume.

const { lessonsFor } = require('./gimnaziuLessons');

const SOURCE = {
  authority: "Ministerul Educației",
  ordinance: "OMEN 3393/28.02.2017",
  published: "Monitorul Oficial nr. 164 bis / 07.03.2017",
  portal: "https://www.edu.ro/Ordin_ministru_3393_2017",
  textbooks: "https://www.manuale.edu.ro/",
  disclaimer:
    "Rezumat propriu după programa oficială. Nu înlocuiește manualul ales de școală și nu reproduce text protejat."
};

const GRADES = [5, 6, 7, 8];
const SUBJECT_IDS = ["matematica", "romana"];

const SUBJECT_ALIASES = {
  matematica: "matematica",
  mate: "matematica",
  math: "matematica",
  mathematics: "matematica",
  romana: "romana",
  română: "romana",
  romanian: "romana",
  "limba romana": "romana",
  "limba română": "romana",
  llr: "romana"
};

function normalizeGrade(value) {
  const raw = String(value == null ? "" : value).trim().toLowerCase();
  if (!raw) return 5;
  const digits = raw.match(/[5-8]/);
  if (digits) return Number(digits[0]);
  if (raw.includes("viii") || raw.includes("8")) return 8;
  if (raw.includes("vii") || raw.includes("7")) return 7;
  if (raw.includes("vi") || raw.includes("6")) return 6;
  if (raw.includes("v") || raw === "5") return 5;
  return 5;
}

function normalizeSubject(value) {
  const raw = String(value == null ? "" : value).trim().toLowerCase();
  if (!raw) return "matematica";
  if (SUBJECT_ALIASES[raw]) return SUBJECT_ALIASES[raw];
  if (raw.includes("rom")) return "romana";
  if (raw.includes("mate") || raw.includes("math")) return "matematica";
  return "matematica";
}

const GUIDES = {
  matematica: {
    5: {
      title: "Matematică, clasa a V-a",
      howISeeIt:
        "Anul ăsta e podul de la aritmetica din primar către gimnaziu. Elevul trebuie să se simtă stăpân pe numerele naturale, apoi să treacă la fracții fără panică și să recunoască figuri simple. Lucrăm intuitiv: mai întâi desen, estimare, exemplu din viață, abia apoi formulă.",
      units: [
        {
          id: "naturale",
          title: "Numere naturale și calcule",
          inOwnWords:
            "Citire, scriere, comparare, puteri, paranteze, metode aritmetice (reducere la unitate, mers invers). Divizibilitate: ce se împarte exact la 2, 3, 5, 9, 10; numere prime versus compuse."
        },
        {
          id: "fractii",
          title: "Fracții ordinare și zecimale",
          inOwnWords:
            "O fracție e o parte dintr-un întreg. Amplificare/simplificare, adunare cu numitor comun, procente ca „din o sută”. Zecimalele sunt aceeași idee scrisă cu virgulă; media aritmetică e un prim pas spre statistica simplă."
        },
        {
          id: "geometrie",
          title: "Figuri, unghiuri, măsurători",
          inOwnWords:
            "Punct, dreaptă, segment, unghi (ascuțit, drept, obtuz). Perimetru, aria pătratului și a dreptunghiului, volumul cubului și al cutiei. Transformăm metri, centimetri, litre fără să amestecăm unitățile."
        }
      ]
    },
    6: {
      title: "Matematică, clasa a VI-a",
      howISeeIt:
        "Apar mulțimile, rapoartele și numerele cu semn. Geometria începe să aibă reguli, nu doar desene: paralele, triunghi, Pitagora văzută ca verificare, nu ca ritual.",
      units: [
        {
          id: "multimi",
          title: "Mulțimi și divizibilitate",
          inOwnWords:
            "Ce înseamnă „aparține”, reuniune, intersecție. Descompunere în factori primi ca să găsim c.m.m.d.c. și c.m.m.m.c. fără ghicit."
        },
        {
          id: "proportii",
          title: "Rapoarte, proporții, regula de trei",
          inOwnWords:
            "Un raport compară două mărimi. Dacă sunt direct proporționale, cresc împreună; dacă sunt invers, una crește când cealaltă scade. Regula de trei e doar o proporție cu un loc gol."
        },
        {
          id: "intregi-rationale",
          title: "Numere întregi și raționale",
          inOwnWords:
            "Minusul e direcție pe axă (temperatura, debit). Modulul e distanța până la zero. Aceleași operații, dar cu semne. Ecuații simple de tipul „ce plus 5 face 12”."
        },
        {
          id: "triunghi",
          title: "Unghiuri, cerc, triunghi",
          inOwnWords:
            "Unghiuri opuse la vârf, paralele tăiate de o secantă, cerc (rază, coardă, diametru). Triunghi: clasificare, suma unghiurilor 180°, linii importante, congruență, Pitagora pe triplete care se verifică."
        }
      ]
    },
    7: {
      title: "Matematică, clasa a VII-a",
      howISeeIt:
        "Spațiul numeric se lărgește la reale: apar iraționalele și radicalii. Algebra capătă sisteme. Geometria se leagă: patrulatere, cerc, Thales, asemănare, apoi trigonometrie ușoară în triunghiul dreptunghic.",
      units: [
        {
          id: "reale",
          title: "Numere reale și radicali",
          inOwnWords:
            "Rădăcina pătrată „desface” un pătrat. Unele numere nu se scriu frumos ca fracție — le numim iraționale. Calculăm cu reale, raționalizăm un numitor simplu, folosim medii."
        },
        {
          id: "ecuati",
          title: "Ecuații și sisteme liniare",
          inOwnWords:
            "O ecuație e un cântar: ce faci într-o parte faci și în cealaltă. Un sistem e două cântare cu aceleași necunoscute. Substituție sau reducere, apoi verificăm în enunțul real."
        },
        {
          id: "date",
          title: "Date în plan",
          inOwnWords:
            "Perechi de numere ca puncte pe axe. Tabele și grafice care arată o dependență, nu doar „niște numere”."
        },
        {
          id: "geo7",
          title: "Patrulater, cerc, asemănare, metrică",
          inOwnWords:
            "Paralelogram, dreptunghi, romb, pătrat, trapez — proprietăți, perimetre, arii. În cerc: unghi înscris, tangente, lungimea cercului, aria discului. Thales și asemănarea ca „aceeași formă, altă scară”. Pitagora cu demonstrația așteptată la acest nivel, plus sinus/cosinus/tangentă pe unghi ascuțit."
        }
      ]
    },
    8: {
      title: "Matematică, clasa a VIII-a",
      howISeeIt:
        "Anul Evaluării Naționale. Calculul trece pe litere, apar funcția de gradul I și geometria în spațiu. Mentorul ține elevul pe înțelegere, nu pe tocit formule de arii și volume.",
      units: [
        {
          id: "intervale",
          title: "Intervale și inecuații",
          inOwnWords:
            "Un interval e o bucată de axă. Inecuația întreabă „pentru ce x rămâne adevărat?”, nu „care e singurul x”."
        },
        {
          id: "algebric",
          title: "Calcul algebric",
          inOwnWords:
            "Termeni asemenea, formule scurte de tip (a±b)² și diferență de pătrate, scoatere de factor, fracții cu litere, ecuația de gradul II doar cât cere programa de gimnaziu."
        },
        {
          id: "functii",
          title: "Funcții și statistici simple",
          inOwnWords:
            "O funcție leagă un x de un f(x). Dreapta f(x)=ax+b se citește din grafic. La date: medie, mediană, modul, amplitudine — ce spune setul, nu doar cum se calculează."
        },
        {
          id: "spatiu",
          title: "Geometrie în spațiu",
          inOwnWords:
            "Puncte, drepte, plane; paralelism și perpendicularitate; piramidă, prismă, cilindru, con, trunchiuri, sferă. Aria și volumul au sens doar dacă elevul vede desfășurarea și înălțimea, nu un șir de litere."
        }
      ]
    }
  },
  romana: {
    5: {
      title: "Limba și literatura română, clasa a V-a",
      howISeeIt:
        "Tema anului, în mintea mea: „eu și lumea mea apropiată”. Elevul învață să asculte, să povestească, să citească un text scurt și să scrie câteva paragrafe curate. Gramatica e în slujba comunicării, nu un catalog de etichete.",
      units: [
        {
          id: "oral",
          title: "Vorbire și ascultare",
          inOwnWords:
            "Să înțeleagă un mesaj auzit, să povestească ceva cunoscut, să întrebe și să răspundă fără să se piardă. Tonul, pauza și privirea contează la fel de mult ca vorbele."
        },
        {
          id: "lectura",
          title: "Lectură: narațiune, descriere, explicație",
          inOwnWords:
            "Caută ideea principală, personaj, timp, loc. Deosebește o poveste de o listă sau de o bandă desenată. Personificarea și comparația se recunosc, nu se tocesc ca definiții goale."
        },
        {
          id: "redactare",
          title: "Scriere în pași",
          inOwnWords:
            "Idei → plan → text cu început, cuprins, sfârșit. Povestire scurtă, autoportret, descrierea unui loc, notițe. Ortografia e respect, nu pedepsă."
        },
        {
          id: "limba5",
          title: "Cum e construită limba",
          inOwnWords:
            "Propoziție simplă/dezvoltată, predicat verbal, subiect, atribut. Verb (indicativ, imperativ), substantiv, articol, pronume personal, adjectiv, numeral. Vocale, silabe, sinonime și antonime. Dicționarul e unelte, nu mobilă."
        },
        {
          id: "inter5",
          title: "Cine sunt, de unde vin",
          inOwnWords:
            "Identitate personală și națională, ideea de carte românească de-a lungul timpului, modele din legende — fără predici, cu exemple pe care elevul le poate povesti."
        }
      ]
    },
    6: {
      title: "Limba și literatura română, clasa a VI-a",
      howISeeIt:
        "Cercul se lărgește: „eu și lumea din jur”. Textul e mai lung, apare rezumatul, scrisoarea, jurnalul. Gramatica adaugă complementele și cazurile ca să explice de ce o virgulă sau un pronume stă acolo.",
      units: [
        {
          id: "oral6",
          title: "Rezumat oral și dialog",
          inOwnWords:
            "Să spună pe scurt ce a auzit, să treacă de la monolog la dialog, să-și susțină o părere pe o temă din viața clasei."
        },
        {
          id: "lectura6",
          title: "Lectură mai atentă",
          inOwnWords:
            "Texte continue, tabele, știri, e-mail. Elevul compară ce e spus clar cu ce se deduce. Portretul și narațiunea la persoana I sau a III-a se recunosc după indicii, nu după etichetă."
        },
        {
          id: "redactare6",
          title: "Scrisoare, jurnal, blog",
          inOwnWords:
            "Scrie pentru un destinatar real: e-mail, jurnal, o întâmplare cu momente. Descrie o emoție sau un fenomen, nu doar „era frumos”."
        },
        {
          id: "limba6",
          title: "Predicat nominal, complement, caz",
          inOwnWords:
            "„Este” + nume predicativ. Complement direct/indirect, circumstanțiale de loc, timp, mod. Verb la conjunctiv și condițional. Substantivul își schimbă forma după rol. Diftong, triftong, hiat — ca să despartă corect în silabe. Sens propriu și figurat, omonime."
        },
        {
          id: "inter6",
          title: "Limba română în lume",
          inOwnWords:
            "Româna nu trăiește doar în clasă: vorbitori din alte țări, valori din cultura populară, legende ale altor popoare comparate cu ale noastre."
        }
      ]
    },
    7: {
      title: "Limba și literatura română, clasa a VII-a",
      howISeeIt:
        "„Orizonturile lumii”: elevul distinge epic, liric, dramatic, scrie caracterizări și recenzii, iar fraza (coordonarea) înlocuiește propoziția izolată.",
      units: [
        {
          id: "oral7",
          title: "Prezentare în fața clasei",
          inOwnWords:
            "Să sintetizeze, să dea exemple, să-și controleze vocea și timpul. Să recunoască când gesturile încurcă mesajul."
        },
        {
          id: "lectura7",
          title: "Tipuri de texte literare",
          inOwnWords:
            "Epic / liric / dramatic se recunosc după ce se întâmplă, cine vorbește, dacă e acțiune sau stare. Compară două puncte de vedere pe același text."
        },
        {
          id: "redactare7",
          title: "Caracterizare, recenzie, cerere",
          inOwnWords:
            "Personajul se construiește din fapte și vorbe, nu din adjective înșirate. Apare cererea, interviul, jurnalul de călătorie — texte cu un scop clar."
        },
        {
          id: "limba7",
          title: "Fraza și îmbogățirea vocabularului",
          inOwnWords:
            "Propoziții legate prin și, dar, deci… Atribut realizat în mai multe feluri, cauză și scop. Forme nepersonale ale verbului. Pronume posesiv, demonstrativ, relativ. Derivare, compunere, familie lexicală; evită pleonasmul și confuzia de paronime. Limbaj popular versus termeni de specialitate."
        },
        {
          id: "inter7",
          title: "Mitologie și vecini culturali",
          inOwnWords:
            "Mituri românești, culturi din jurul României, ideea că limba se schimbă când oamenii se întâlnesc."
        }
      ]
    },
    8: {
      title: "Limba și literatura română, clasa a VIII-a",
      howISeeIt:
        "„Reflecții asupra lumii” plus pregătirea pentru Evaluarea Națională: lectură atentă a unui text necunoscut, limbă aplicată, apoi un text scris scurt și organizat. Mentorul antrenează gândirea, nu recitarea unor comentarii gata făcute.",
      units: [
        {
          id: "oral8",
          title: "Argumentare și dezbatere",
          inOwnWords:
            "O părere are nevoie de un motiv și, dacă e cazul, de o sursă. Elevul continuă ideea altcuiva fără să o strice și deosebește informația de intenție."
        },
        {
          id: "lectura8",
          title: "Evaluarea unui text",
          inOwnWords:
            "Temă, motive, idei; ce e esențial și ce e ornament. Texte literare și nonliterare, tabele, afișe. Nu cerem „autorul vrea să transmită” ca formulă magică, ci dovezi din text."
        },
        {
          id: "redactare8",
          title: "Text argumentativ și creativ",
          inOwnWords:
            "Structură vizibilă, paragraf cu o idee, exemple. La EN, elevul scrie fie despre un text, fie un text scurt creativ — ambele cer plan, nu inspirație de moment."
        },
        {
          id: "limba8",
          title: "Fraza complexă, pregătire EN",
          inOwnWords:
            "Se reiau și se leagă noțiunile din anii anteriori: acorduri, cazuri, vocabular, punctuație. Norma (DOOM) e referință, nu capcană. Exersăm pe texte noi, ca la examen."
        },
        {
          id: "inter8",
          title: "Noi și ceilalți",
          inOwnWords:
            "Modele din literatura lumii, valori românești văzute din afară, relații culturale — ca să iasă din „doar ce e în manualul meu”."
        }
      ]
    }
  }
};

function getGuide(subject, grade) {
  const sid = normalizeSubject(subject);
  const g = normalizeGrade(grade);
  const entry = GUIDES[sid][g];
  return {
    subject: sid,
    grade: g,
    source: SOURCE,
    ...entry,
    units: (entry.units || []).map(unit => ({
      ...unit,
      lessons: lessonsFor(sid, g, unit.id)
    }))
  };
}

function listCatalog() {
  return {
    source: SOURCE,
    grades: GRADES,
    subjects: [
      { id: "matematica", name: { ro: "Matematică", en: "Mathematics" }, icon: "fa-square-root-alt" },
      { id: "romana", name: { ro: "Limba și literatura română", en: "Romanian language and literature" }, icon: "fa-book" }
    ],
    guides: SUBJECT_IDS.flatMap(subject =>
      GRADES.map(grade => {
        const guide = getGuide(subject, grade);
        return {
          subject,
          grade,
          title: guide.title,
          howISeeIt: guide.howISeeIt,
          units: guide.units
        };
      })
    )
  };
}

function buildMentorContext(subject, grade) {
  const guide = getGuide(subject, grade);
  const units = guide.units.map(unit => `- ${unit.title}: ${unit.inOwnWords}`).join("\n");
  return [
    `Ești mentor doar pentru gimnaziu (clasele 5–8), materiile Limba și literatura română și Matematică.`,
    `Elevul este în clasa a ${guide.grade}-a, materia: ${guide.subject === "romana" ? "Limba și literatura română" : "Matematică"}.`,
    `Cum înțeleg eu programa (${SOURCE.ordinance}): ${guide.howISeeIt}`,
    `Unități, rezumate de mine, nu citate din manual:`,
    units,
    `Dacă întrebarea e din altă materie sau de liceu, spune politicos că aici lucrăm doar română și matematică de gimnaziu și propune o punte (de exemplu: un text de fizică se poate citi ca text explicativ la română; o formulă de liceu se reduce la ce știe deja din clasa lui).`,
    `Nu copia lecții din manuale. Explică cu cuvintele tale, cu un exemplu cotidian, apoi o întrebare ghidată.`,
    SOURCE.disclaimer
  ].join("\n");
}

module.exports = {
  SOURCE,
  GRADES,
  SUBJECT_IDS,
  GUIDES,
  normalizeGrade,
  normalizeSubject,
  getGuide,
  listCatalog,
  buildMentorContext
};
