'use strict';

const MANUAL = {
  "code": "A1249",
  "title": "Limba și literatura română. Manual pentru clasa a V-a",
  "author": "Marilena Pavelescu",
  "publisher": "Editura Litera",
  "year": 2022,
  "isbn": "978-606-33-9056-2",
  "approval": "Ordinul ministrului educației nr. 4065/16.06.2022",
  "curriculum": "OMEN nr. 3393/28.02.2017",
  "sourceUrl": "https://manuale.edu.ro/manuale/Clasa%20a%20V-a/Limba%20si%20literatura%20romana/R1JVUCBFRElUT1JJQUwg/A1249.pdf"
};

const COMPETENCIES = [
  {
    "code": "1",
    "text": "Participarea la interacțiuni verbale în diverse situații de comunicare, prin receptarea și producerea textului oral."
  },
  {
    "code": "1.1",
    "text": "Identificarea temei, a unor informații esențiale și de detaliu, a intențiilor de comunicare explicite și/sau a comportamentelor care exprimă emoții din texte narative, monologate sau dialogate."
  },
  {
    "code": "1.2",
    "text": "Prezentarea orală, pe baza unor repere date de profesor, a unor informații și a unor idei, exprimând opinii, emoții și sentimente prin participarea la discuții pe teme familiare, de interes sau pornind de la textele ascultate/citite."
  },
  {
    "code": "1.3",
    "text": "Identificarea unor elemente paraverbale și nonverbale, în funcție de situația de comunicare."
  },
  {
    "code": "1.4",
    "text": "Realizarea unei interacțiuni verbale cu doi interlocutori, folosind strategii simple de ascultare activă și manifestând un comportament comunicativ politicos față de interlocutor(i)."
  },
  {
    "code": "2",
    "text": "Receptarea textului scris de diverse tipuri."
  },
  {
    "code": "2.1",
    "text": "Identificarea informațiilor importante din texte literare și nonliterare, continue, discontinue și multimodale."
  },
  {
    "code": "2.2",
    "text": "Identificarea temei și a ideilor principale și secundare din texte diverse."
  },
  {
    "code": "2.3",
    "text": "Formularea unui răspuns personal și/sau a unui răspuns creativ pe marginea unor texte de diferite tipuri, pe teme familiare."
  },
  {
    "code": "2.4",
    "text": "Manifestarea interesului și focalizarea atenției în timpul lecturii unor texte pe teme familiare."
  },
  {
    "code": "2.5",
    "text": "Observarea comportamentelor și a atitudinilor de lectură, identificând aspectele care necesită îmbunătățire."
  },
  {
    "code": "3",
    "text": "Redactarea textului scris de diverse tipuri."
  },
  {
    "code": "3.1",
    "text": "Redactarea unui text scurt pe teme familiare, având în vedere etapele procesului de scriere și structurile specifice, pentru a comunica idei și informații sau pentru a relata experiențe trăite sau imaginate."
  },
  {
    "code": "3.2",
    "text": "Redactarea, individual și/sau în echipă, a unui text simplu, pe o temă familiară, cu integrarea unor imagini, desene, scheme."
  },
  {
    "code": "3.3",
    "text": "Analizarea constantă a propriului scris/a unor texte diverse din punctul de vedere al corectitudinii, al lizibilității, al coerenței și al clarității."
  },
  {
    "code": "3.4",
    "text": "Observarea atitudinilor manifestate în procesul redactării unui text, identificând aspectele care necesită îmbunătățire."
  },
  {
    "code": "4",
    "text": "Utilizarea corectă, adecvată și eficientă a limbii în procesul comunicării orale și scrise."
  },
  {
    "code": "4.1",
    "text": "Utilizarea achizițiilor sintactice și morfologice de bază ale limbii române standard pentru înțelegerea și exprimarea corectă a intențiilor comunicative."
  },
  {
    "code": "4.2",
    "text": "Aplicarea achizițiilor lexicale și semantice de bază, în procesul de înțelegere și de exprimare corectă a intențiilor comunicative."
  },
  {
    "code": "4.3",
    "text": "Monitorizarea propriei pronunții și scrieri și a pronunției și scrierii celorlalți, valorificând achizițiile fonetice de bază."
  },
  {
    "code": "4.4",
    "text": "Respectarea normelor ortografice și ortoepice în utilizarea structurilor fonetice, lexicale și sintactico-morfologice în interacțiunea verbală."
  },
  {
    "code": "4.5",
    "text": "Utilizarea competenței lingvistice în corelație cu gândirea logică/analogică, în procesul de învățare pe tot parcursul vieții."
  },
  {
    "code": "5",
    "text": "Exprimarea identității lingvistice și culturale proprii în context național și internațional."
  },
  {
    "code": "5.1",
    "text": "Asocierea unor experiențe proprii de viață și de lectură cu acelea provenind din alte culturi."
  },
  {
    "code": "5.2",
    "text": "Identificarea unor valori culturale promovate în textele autorilor români din diferite perioade istorice."
  }
];

const UNITS = [
  require('./r5-evaluare-initiala'),
  require('./r5-cuvinte'),
  require('./r5-cartea'),
  require('./r5-povestirea'),
  require('./r5-prietenia'),
  require('./r5-natura'),
  require('./r5-trepte'),
  require('./r5-eroi')
];

function grade5Guide() {
  return {
    title: "Limba română, clasa a V-a",
    restored: true,
    manual: MANUAL,
    competencies: COMPETENCIES,
    howISeeIt: "Temele sunt cele din programa clasei a V-a. Fiecare lecție își poartă scena sau regula, așa că un copil poate citi, își poate face imaginea și poate răspunde fără să aibă în față o anumită pagină de manual. La școală repetă aceiași pași pe textul deschis, oricare ar fi editura.",
    units: UNITS
  };
}

module.exports = {
  MANUAL,
  COMPETENCIES,
  UNITS,
  grade5Guide
};
