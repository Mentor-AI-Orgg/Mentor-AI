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
const { grade5Guide } = require('./romana5Litera');
const { grade6Guide } = require('./romana6Litera');
const { grade7Guide } = require('./romana7Litera');
const { grade8Guide } = require('./romana8Litera');
const { shapeUnit } = require('./lessonShape');
const { glossaryFor } = require('./chapterGlossary');
const { dailyQuote, formatQuote } = require('./quotes');
const { listGeometryAtlas } = require('./geometryAtlas');

const SOURCE = {
  authority: "Ministerul Educației",
  ordinance: "OMEN 3393/28.02.2017",
  published: "Monitorul Oficial nr. 164 bis / 07.03.2017",
  portal: "https://www.edu.ro/Ordin_ministru_3393_2017",
  textbooks: "https://www.manuale.edu.ro/",
  disclaimer:
    "La clasa a V-a, româna urmează cuprinsul manualului Litera, A1249. La clasa a VI-a, manualul Litera, A1470, este parcurs până la capăt: recapitularea inițială, Unitățile 1–6 și încheierea anului. La clasa a VII-a, manualul Litera, A1732, cuprinde recapitularea inițială, Unitatea 1 până la capăt, Unitatea 2 până la capăt, Unitatea 3, Tărâmul sentimentelor, până la capăt, Unitatea 4, Lumea teatrului, până la capăt, Unitatea 5, Călător prin lume, până la capăt, Unitatea 6, Privind către mine, până la capăt, și recapitularea finală. La clasa a VIII-a, manualul Litera, A1954, cuprinde testul inițial, Unitatea 1, Călătoria, Unitatea 2, O lume plină de sentimente, Unitatea 3, Valori și atitudini, până la recapitulare, Unitatea 4, Tradiție și inovație, până la turismul cultural, și Unitatea 5, Modele și antimodele, până la recapitulare. Planul principal ține itemii care aduc puncte la Evaluarea Națională: figurile, fonetica, ortografia cuvintelor străine, derivarea, compunerea, conversiunea, mesajul liric și caracterizarea, pe lângă atributivă, completivă și celelalte subordonate din programă. Planul secundar păstrează, scurt, turismul cultural, gestul și tonul, Ziua Eroilor și recenzia ca gen. Textul lecțiilor e un rezumat propriu: nu copiem fragmentele și exercițiile. Unitatea 6 așteaptă."
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
    5: grade5Guide(),
    6: grade6Guide(),
    7: grade7Guide(),
    8: grade8Guide()
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
    quote: formatQuote(dailyQuote()),
    units: (entry.units || []).map(unit => shapeUnit({
      ...unit,
      lessons: Array.isArray(unit.lessons) && unit.lessons.length
        ? unit.lessons
        : lessonsFor(sid, g, unit.id),
      glossary: Array.isArray(unit.glossary) && unit.glossary.length
        ? unit.glossary
        : glossaryFor(sid, g, unit.id)
    })),
    atlas: sid === 'matematica' ? listGeometryAtlas(g) : null
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
  const manualLine = guide.manual
    ? `Manual de structură: ${guide.manual.title}, ${guide.manual.author}, ${guide.manual.publisher}, ${guide.manual.year}, aprobat prin ${guide.manual.approval}. Nu cita fragmente din el.`
    : "";
  return [
    `Ești mentor doar pentru gimnaziu (clasele 5–8), materiile Limba și literatura română și Matematică.`,
    `Elevul este în clasa a ${guide.grade}-a, materia: ${guide.subject === "romana" ? "Limba și literatura română" : "Matematică"}.`,
    `Cum stă materia acum: ${guide.howISeeIt}`,
    manualLine,
    guide.units.length
      ? `Unități, în ordinea cuprinsului, rezumate aici, nu citate din manual:\n${units}`
      : "Nu există încă unități pentru clasa asta. Nu inventa un manual.",
    `Dacă întrebarea e din altă materie sau de liceu, spune politicos că aici lucrăm doar română și matematică de gimnaziu și propune o punte (de exemplu: un text de fizică se poate citi ca text explicativ la română; o formulă de liceu se reduce la ce știe deja din clasa lui).`,
    `Nu copia lecții din manuale. Explică cu cuvintele tale, cu un exemplu cotidian, apoi o întrebare ghidată.`,
    SOURCE.disclaimer
  ].filter(Boolean).join("\n");
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
