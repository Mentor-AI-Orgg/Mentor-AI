// Secțiune separată: Evaluarea Națională, clasa a VIII-a.
// Orientare: OM nr. 4.730/18.08.2022 (programele de examen), aliniat la
// OMEN 3393/28.02.2017. Nu copiem anexele oficiale, manualele sau culegerile.
// Lecțiile sunt rezumate originale, cu exemple lucrate. Modelele de teste
// sunt originale, inspirate de structura probei, nu de un subiect publicat.

const { lessonsForEn } = require('./en8Lessons');
const { recommendedList } = require('./enPaperFactory');
const { shapeUnit } = require('./lessonShape');
const { glossaryFor } = require('./chapterGlossary');
const { dailyQuote, formatQuote } = require('./quotes');
const { listGeometryAtlas } = require('./geometryAtlas');

const EN_SOURCE = {
  authority: "Ministerul Educației",
  ordinance: "OM 4.730/18.08.2022",
  schoolOrdinance: "OMEN 3393/28.02.2017",
  published: "Monitorul Oficial nr. 842 bis / 2022",
  exam: "Evaluarea Națională pentru absolvenții clasei a VIII-a",
  disclaimer:
    "Rezumat propriu după programa de examen. Nu înlocuiește subiectele oficiale și nu reproduce culegeri sau manuale protejate. Modelele de teste se lucrează ca la examen: începi, stai minim o oră, apoi finalizezi. Baremul apare după predare."
};

const EN_SUBJECT_IDS = ["matematica", "romana"];

const EN_GUIDES = {
  matematica: {
    title: "Evaluare Națională · Matematică",
    howISeeIt:
      "Proba de matematică reunește tot gimnaziul, nu doar clasa a VIII-a. Elevul recunoaște mulțimi și numere, calculează cu litere, citește un grafic, leagă rapoarte de date și vede o figură în plan sau în spațiu. Scriem pe foaie: enunț, calcule, răspuns subliniat. Mentorul antrenează metoda, nu toceala unei formule.",
    units: [
      {
        id: "proba",
        title: "Cum arată proba de matematică",
        inOwnWords:
          "Două ore, trei subiecte de câte 30 de puncte, plus 10 din oficiu. Subiectul I e scurt și variat, II e algebră, III e geometrie. Predarea anticipată e permisă după o oră. Baremul acceptă orice metodă corectă. Începi testul, stai timpul de sală, apoi predai."
      },
      {
        id: "numere",
        title: "Mulțimi și numere la examen",
        inOwnWords:
          "Naturale, întregi, raționale, reale: recunoști mulțimea, compari, calculezi, scoți factori de sub radical. Un interval e o bucată de axă. La EN, un item scurt poate amesteca un procent cu un modul."
      },
      {
        id: "algebra-en",
        title: "Algebră: litere, ecuații, sisteme",
        inOwnWords:
          "Termeni asemenea, formule scurte, scoatere de factor, fracții cu litere. Ecuația întreabă care x face egalitatea adevărată; inecuația întreabă un interval. Sistemul are două necunoscute și două relații."
      },
      {
        id: "functii-en",
        title: "Funcții și lectură grafică",
        inOwnWords:
          "O funcție leagă un x de un f(x). Dreapta f(x)=ax+b se citește din tabel sau din grafic: intercept, pantă, puncte. La examen, adesea ți se dă desenul și trebuie să spui ce înseamnă."
      },
      {
        id: "date",
        title: "Rapoarte, proporții și date",
        inOwnWords:
          "Raport, proporție, mărimi direct sau invers proporționale, regula de trei. Dintr-un tabel sau un grafic cu bare citești frecvență, medie, mediană, modul, amplitudine — ce spune setul, nu doar cum se calculează."
      },
      {
        id: "geo-plana",
        title: "Geometrie plană de examen",
        inOwnWords:
          "Unghiuri, triunghi (congruență, asemănare, Pitagora, Thales), patrulatere, cerc. Desenezi, notezi datele, justifici o propoziție, apoi calculezi. Aria fără desen e o capcană."
      },
      {
        id: "geo-spatiu",
        title: "Geometrie în spațiu",
        inOwnWords:
          "Puncte, drepte, plane; paralelism și perpendicularitate. Prismă, piramidă, cilindru, con, trunchiuri, sferă. Aria și volumul au sens dacă vezi baza, înălțimea și desfășurarea."
      }
    ]
  },
  romana: {
    title: "Evaluare Națională · Limba și literatura română",
    howISeeIt:
      "Proba de română cere trei lucruri: să citești un text necunoscut și să dovedești că l-ai înțeles, să aplici limba pe acel text, apoi să scrii un text scurt cu plan. Nu se tocește un comentariu gata făcut. Se antrenează ochiul, norma și structura.",
    units: [
      {
        id: "proba-ro",
        title: "Cum arată proba de română",
        inOwnWords:
          "Text la prima vedere, itemi de înțelegere și de limbă, apoi o redactare (narativ, descriptiv sau argumentativ). Se punctează conținutul, organizarea, vocabularul și corectitudinea. Lucrarea ține două ore; predarea anticipată e după o oră."
      },
      {
        id: "receptare",
        title: "Text la prima vedere",
        inOwnWords:
          "Cauți temă, idee principală, detalii, ce e spus și ce se deduce. Textele pot fi literare sau nonliterare, continue sau cu tabel. Răspunsul stă în text, nu în ce ți-ar plăcea ție să însemne."
      },
      {
        id: "limba-en",
        title: "Limbă aplicată, ca la examen",
        inOwnWords:
          "Pe un fragment nou recunoști părți de vorbire, funcții sintactice, acorduri, vocabular (sinonime, antonime, sens în context) și punctuație. Norma (DOOM) e referință, nu capcană. Nu etichetezi din memorie, fără frază."
      },
      {
        id: "narativ",
        title: "Redactare narativă",
        inOwnWords:
          "O întâmplare are început, mijloc, sfârșit, personaje și un fir. La EN scrii scurt, vizibil, cu paragrafe. Nu începi din mijloc și nu închei cu „și-au trăit fericiți” dacă nu se potrivește."
      },
      {
        id: "descriptiv",
        title: "Redactare descriptivă",
        inOwnWords:
          "Descrii un loc, un obiect sau un portret: ce se vede, aude, simte, într-o ordine. Detaliile lucrează; adjectivele înșirate nu. Comparația și personificarea ajută dacă stau în frază, nu lipite."
      },
      {
        id: "argumentativ",
        title: "Redactare argumentativă",
        inOwnWords:
          "O părere + un motiv + un exemplu. Structură: teză, argumente, concluzie. Nu e o poveste și nu e o listă de sloganuri. Conectorii (pentru că, de exemplu, așadar) țin textul."
      },
      {
        id: "strategie",
        title: "Timp, plan și greșeli de evitat",
        inOwnWords:
          "Citești tot subiectul, subliniezi cerința, schițezi 5 rânduri, apoi scrii. La final, o recitire pentru acord și punctuație. Nu copiază enunțul. Nu lăsa redactarea pe ultimele zece minute."
      }
    ]
  }
};

function normalizeEnSubject(value) {
  const raw = String(value == null ? "" : value).trim().toLowerCase();
  if (raw.includes("rom")) return "romana";
  return "matematica";
}

function getEnGuide(subject) {
  const sid = normalizeEnSubject(subject);
  const entry = EN_GUIDES[sid];
  return {
    track: "en",
    subject: sid,
    grade: 8,
    exam: "evaluare",
    source: EN_SOURCE,
    title: entry.title,
    howISeeIt: entry.howISeeIt,
    completablePractice: false,
    trainingAvailable: true,
    quote: formatQuote(dailyQuote()),
    papersNote:
      "Modelele A–C sunt originale. „Alt model” amestecă aceleași tipuri de item cu variante noi (numere și texte schimbate), inspirate de structura publică CNPEE, nu copiate din culegeri. Dificultatea e de examen: dacă știi programa, poți lua 10. Antrenamentul EN (mai jos) e separat: exerciții scurte, fără cronometrul probei.",
    units: (entry.units || []).map(unit => shapeUnit({
      ...unit,
      lessons: lessonsForEn(sid, unit.id),
      glossary: glossaryFor(sid, 8, unit.id, 'en')
    })),
    papers: recommendedList(sid),
    atlas: sid === 'matematica' ? listGeometryAtlas(8) : null
  };
}

function listEnCatalog() {
  return {
    track: "en",
    source: EN_SOURCE,
    exam: "evaluare",
    grade: 8,
    subjects: [
      { id: "matematica", name: { ro: "Matematică EN", en: "National Assessment Maths" }, icon: "fa-square-root-alt" },
      { id: "romana", name: { ro: "Română EN", en: "National Assessment Romanian" }, icon: "fa-book" }
    ],
    guides: EN_SUBJECT_IDS.map(subject => {
      const guide = getEnGuide(subject);
      return {
        track: "en",
        subject,
        grade: 8,
        title: guide.title,
        howISeeIt: guide.howISeeIt,
        units: guide.units.map(unit => ({
          id: unit.id,
          title: unit.title,
          inOwnWords: unit.inOwnWords,
          lessons: unit.lessons
        })),
        papers: guide.papers,
        completablePractice: false
      };
    })
  };
}

function enCounts() {
  return EN_SUBJECT_IDS.reduce((acc, subject) => {
    const guide = getEnGuide(subject);
    acc[subject] = {
      chapters: guide.units.length,
      lessons: guide.units.reduce((sum, unit) => sum + (unit.lessons || []).length, 0),
      papers: (guide.papers || []).length
    };
    return acc;
  }, {});
}

module.exports = {
  EN_SOURCE,
  EN_SUBJECT_IDS,
  EN_GUIDES,
  normalizeEnSubject,
  getEnGuide,
  listEnCatalog,
  enCounts
};
