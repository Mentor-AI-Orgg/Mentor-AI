// Fraze de tip „cheie de răspunsuri”, pe textul deja trecut prin normalizeRo()
// (litere mici, fără diacritice). Lista se completează aici, cu id, re și reason.
//
// „Litera este c.” se prinde. „Litera este o variabilă.” nu: după literă
// trebuie să se termine fraza (punctuație sau sfârșit), nu să urmeze un cuvânt.

export const ANSWER_KEY_PATTERNS = [
  {
    id: 'litera-este',
    re: /litera (?:este|e) [a-e](?:[.!?,:;]|$)/,
    reason: 'cheie de răspunsuri: litera este a–e'
  },
  {
    id: 'varianta-corecta',
    re: /varianta corecta (?:este|e) [a-e](?:[.!?,:;]|$)/,
    reason: 'cheie de răspunsuri: varianta corectă este a–e'
  },
  {
    id: 'pe-pagina-numar',
    re: /pe pagina \d+/,
    reason: 'trimite la pagina din manual'
  },
  {
    id: 'pe-pagina',
    re: /pe pagina\b/,
    reason: 'trimite la pagină'
  },
  {
    id: 'la-pagina',
    re: /la pagina\b/,
    reason: 'trimite la pagină'
  },
  {
    id: 'din-manual',
    re: /din manual\b/,
    reason: 'trimite la manual'
  },
  {
    id: 'manualul-cere',
    re: /manualul cere/,
    reason: 'manualul cere un răspuns'
  },
  {
    id: 'in-manual',
    re: /\bin manual\b/,
    reason: 'trimite în manual'
  },
  {
    id: 'exercitiul-de-la',
    re: /exercitiul \d+ de la/,
    reason: 'trimite la exercițiul din manual'
  },
  {
    id: 'pagina-cere',
    re: /pagina cere/,
    reason: 'pagina din manual cere răspunsul'
  },
  {
    id: 'nu-cerem-versul',
    re: /nu cerem versul/,
    reason: 'cheie de răspunsuri: nu cerem versul'
  },
  {
    id: 'nu-cerem-citat',
    re: /nu cerem citat/,
    reason: 'cheie de răspunsuri: nu cerem citatul'
  },
  {
    id: 'nu-cerem-portret',
    re: /nu cerem portret/,
    reason: 'cheie de răspunsuri: nu cerem portretul'
  },
  {
    id: 'nu-cerem-dialog',
    re: /nu cerem dialog/,
    reason: 'cheie de răspunsuri: nu cerem dialogul'
  },
  {
    id: 'nu-cerem-descriere',
    re: /nu cerem descriere/,
    reason: 'cheie de răspunsuri: nu cerem descrierea'
  },
  {
    id: 'nu-cerem-textul',
    re: /nu cerem textul/,
    reason: 'cheie de răspunsuri: nu cerem textul'
  },
  {
    id: 'raspunsul-corect-exercitiu',
    re: /raspunsul corect la exercitiul/,
    reason: 'cheie de răspunsuri: răspunsul corect la exercițiu'
  }
];
