// Lecțiile rămân originale (platter). Le așezăm în rafturi ca să se
// citească ca o lecție: teorie, exemplu, încearcă tu, recap.
//
// Câmpurile de mai jos sunt opționale. Lecțiile vechi nu le au, iar
// `splitPlatter` nu inventează `answers` sau `keyPoints`.
//
// @typedef {Object} Lesson
// @property {string} id
// @property {string} title
// @property {string} platter Textul integral, inclusiv pliabilele, fără `**`.
// @property {string} [theory]
// @property {string} [example]
// @property {string} [practice] Doar itemii numerotați, fără „Răspunsuri:”.
// @property {string} [mistakes]
// @property {string} [tryThis]
// @property {string} [recap] Calculat din `keyPoints` unite cu spațiu, când există.
// @property {string} [figure]
// @property {string[]} [formulas]
// @property {'limba'|'lectura'|'comunicare'|'redactare'|'recapitulare'} [kind] Doar română.
// @property {{type:'definitie'|'formula'|'regula'|'atentie', title?:string, text:string}[]} [boxes]
// @property {{title:string, text:string}[]} [extraExamples]
// @property {string[]} [answers] Răspunsurile de la practice, în ordine. Lungimea e egală cu numărul de itemi.
// @property {string[]} [keyPoints] 2–3 puncte „De reținut”.
// @property {{title:string, text:string}[]} [more]
// @property {string[]} [figures] Desene în plus. `figure` rămâne primul.
// @property {{key:string, lesson:string}[]} [seeAlso] Doar fișele EN8.

function splitPlatter(platter) {
  return String(platter || '')
    .split(/\n\n+/)
    .map(part => part.trim())
    .filter(Boolean);
}

function defaultTryThis(title) {
  return `Încearcă tu: închide ecranul douăzeci de secunde și spune cu voce tare ideea din „${title}”, apoi scrie un exemplu al tău, nu pe cel din lecție.`;
}

// Separă „Răspunsuri:” doar când sunt numerotate cu 1). Altfel nu ghicim.
function takeNumberedAnswers(practice) {
  const text = String(practice || '');
  const match = text.match(/(?:^|\n\n)Răspunsuri:\s*([\s\S]*)$/i);
  if (!match) return null;
  const body = match[1].trim();
  if (!body.startsWith('1)')) return null;
  const chunks = body.split(/\s*;\s*(?=\d+\))/);
  const answers = [];
  for (let index = 0; index < chunks.length; index += 1) {
    const part = chunks[index].match(/^(\d+)\)\s*([\s\S]*)$/);
    if (!part || Number(part[1]) !== index + 1) return null;
    answers.push(part[2].trim());
  }
  if (!answers.length) return null;
  return { practice: text.slice(0, match.index).trim(), answers };
}

function shapeLesson(lesson) {
  if (!lesson || typeof lesson !== 'object') return lesson;
  const parts = splitPlatter(lesson.platter);
  const exampleIdx = parts.findIndex(part => /exemplu lucrat|exemplu:/i.test(part));
  const theory = lesson.theory
    || (exampleIdx > 0 ? parts.slice(0, exampleIdx).join('\n\n') : (parts[0] || ''));
  const example = lesson.example
    || (exampleIdx >= 0 ? parts[exampleIdx] : (parts[1] || parts[0] || ''));
  const after = exampleIdx >= 0 ? parts.slice(exampleIdx + 1) : parts.slice(2);
  const fromPoints = Array.isArray(lesson.keyPoints) && lesson.keyPoints.length
    ? lesson.keyPoints.join(' ')
    : '';
  const recap = lesson.recap
    || fromPoints
    || after[after.length - 1]
    || 'Recap: spune ideea în două propoziții, cu cuvintele tale, fără să te uiți în text.';
  const middle = after.filter(part => part !== recap);
  const tryThis = lesson.tryThis || middle[0] || defaultTryThis(lesson.title || 'lecția');
  let practice = lesson.practice;
  let answers = lesson.answers;
  if (!Array.isArray(answers) && practice) {
    const split = takeNumberedAnswers(practice);
    if (split) {
      practice = split.practice;
      answers = split.answers;
    }
  }
  const shaped = {
    ...lesson,
    theory,
    example,
    tryThis,
    recap,
    glossary: Array.isArray(lesson.glossary) ? lesson.glossary : []
  };
  if (practice !== undefined) shaped.practice = practice;
  if (Array.isArray(answers)) shaped.answers = answers;
  return shaped;
}

// „Răspunsuri: 1) …; 2) …” e cheia, nu enunțul. O scoatem din textul public
// doar când e numerotată: forma veche („Răspunsuri: 15. 9.”) rămâne în
// exercițiu, unde elevul o vede și azi.
function dropNumberedAnswerBlock(text) {
  const raw = String(text ?? '');
  const parts = raw.split(/\n\n+/);
  const kept = parts.filter(part => !/^Răspunsuri:\s*1\)/i.test(part.trim()));
  if (kept.length === parts.length) return raw;
  return kept.map(part => part.trim()).filter(Boolean).join('\n\n');
}

function lessonForCatalog(lesson) {
  if (!lesson || typeof lesson !== 'object') return lesson;
  const answers = Array.isArray(lesson.answers)
    ? lesson.answers.map(item => String(item).trim()).filter(Boolean)
    : [];
  const next = { ...lesson };
  delete next.answers;
  if (!answers.length) return next;
  next.hasAnswers = true;
  if (typeof next.practice === 'string') {
    const split = takeNumberedAnswers(next.practice);
    next.practice = split ? split.practice : dropNumberedAnswerBlock(next.practice);
  }
  if (typeof next.platter === 'string') next.platter = dropNumberedAnswerBlock(next.platter);
  return next;
}

function unitsForCatalog(units) {
  return (units || []).map(unit => {
    if (!unit || typeof unit !== 'object') return unit;
    return {
      ...unit,
      lessons: (unit.lessons || []).map(lessonForCatalog)
    };
  });
}

function catalogWithoutAnswers(payload) {
  if (!payload || typeof payload !== 'object') return payload;
  const next = { ...payload };
  if (Array.isArray(payload.units)) next.units = unitsForCatalog(payload.units);
  if (Array.isArray(payload.guides)) {
    next.guides = payload.guides.map(guide => {
      if (!guide || typeof guide !== 'object') return guide;
      return { ...guide, units: unitsForCatalog(guide.units) };
    });
  }
  return next;
}

function shapeUnit(unit) {
  if (!unit) return unit;
  return {
    ...unit,
    lessons: (unit.lessons || []).map(shapeLesson),
    glossary: Array.isArray(unit.glossary) ? unit.glossary : collectGlossary(unit)
  };
}

function collectGlossary(unit) {
  const words = [];
  (unit.lessons || []).forEach(lesson => {
    (lesson.glossary || []).forEach(entry => words.push(entry));
  });
  return words.slice(0, 8);
}

module.exports = {
  shapeLesson,
  shapeUnit,
  splitPlatter,
  takeNumberedAnswers,
  lessonForCatalog,
  catalogWithoutAnswers
};
