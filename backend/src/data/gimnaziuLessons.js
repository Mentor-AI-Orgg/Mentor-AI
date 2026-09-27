// Lecții originale, „pe tavă”, după programa 5–8 (OMEN 3393/2017).
// Nu copiem manuale. Fiecare lecție: idee + exemplu lucrat + ce să reții.
// La clasa a V-a, cuprinsul manualului Litera A1259 stă în mate5Naturale.js,
// mate5Fractii.js și mate5Geometrie.js.

const { NATURALE_LESSONS } = require('./mate5Naturale');
const { FRACTII_LESSONS } = require('./mate5Fractii');
const { GEOMETRIE_LESSONS } = require('./mate5Geometrie');
const { MULTIMI_LESSONS } = require('./mate6Multimi');
const { PROPORTII_LESSONS } = require('./mate6Proportii');
const { NUMERE_LESSONS } = require('./mate6Numere');
const { GEOMETRIE6_LESSONS } = require('./mate6Geometrie');
const { REALE_LESSONS } = require('./mate7Reale');
const { ECUATII_LESSONS } = require('./mate7Ecuatii');
const { DATE_LESSONS } = require('./mate7Date');
const { GEO7_LESSONS } = require('./mate7Geometrie');
const { INTERVALE_LESSONS } = require('./mate8Intervale');
const { ALGEBRIC_LESSONS } = require('./mate8Algebric');
const { FUNCTII_LESSONS } = require('./mate8Functii');
const { SPATIU_LESSONS } = require('./mate8Spatiu');

function lesson(id, title, ...paragraphs) {
  let extra = {};
  const last = paragraphs[paragraphs.length - 1];
  if (last && typeof last === 'object' && !Array.isArray(last)) {
    extra = last;
    paragraphs = paragraphs.slice(0, -1);
  }
  return { id, title, platter: paragraphs.join('\n\n'), ...extra };
}

const LESSONS = {
  'matematica:5:naturale': NATURALE_LESSONS,
  'matematica:5:fractii': FRACTII_LESSONS,
  'matematica:5:geometrie': GEOMETRIE_LESSONS,
  'matematica:6:multimi': MULTIMI_LESSONS,
  'matematica:6:proportii': PROPORTII_LESSONS,
  'matematica:6:intregi-rationale': NUMERE_LESSONS,
  'matematica:6:triunghi': GEOMETRIE6_LESSONS,
  'matematica:7:reale': REALE_LESSONS,
  'matematica:7:ecuati': ECUATII_LESSONS,
  'matematica:7:date': DATE_LESSONS,
  'matematica:7:geo7': GEO7_LESSONS,
  'matematica:8:intervale': INTERVALE_LESSONS,
  'matematica:8:algebric': ALGEBRIC_LESSONS,
  'matematica:8:functii': FUNCTII_LESSONS,
  'matematica:8:spatiu': SPATIU_LESSONS
};

function lessonsFor(subject, grade, chapterId) {
  const key = `${String(subject || '').toLowerCase()}:${String(grade || '')}:${String(chapterId || '')}`;
  return LESSONS[key] ? LESSONS[key].slice() : [];
}

module.exports = { LESSONS, lessonsFor, lesson };
