// Lecțiile rămân originale (platter). Le așezăm în 4 rafturi ca să se
// citească ca o lecție: teorie, exemplu, încearcă tu, recap.

function splitPlatter(platter) {
  return String(platter || '')
    .split(/\n\n+/)
    .map(part => part.trim())
    .filter(Boolean);
}

function defaultTryThis(title) {
  return `Încearcă tu: închide ecranul douăzeci de secunde și spune cu voce tare ideea din „${title}”, apoi scrie un exemplu al tău, nu pe cel din lecție.`;
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
  const recap = lesson.recap
    || after[after.length - 1]
    || 'Recap: spune ideea în două propoziții, cu cuvintele tale, fără să te uiți în text.';
  const middle = after.filter(part => part !== recap);
  const tryThis = lesson.tryThis || middle[0] || defaultTryThis(lesson.title || 'lecția');
  return {
    ...lesson,
    theory,
    example,
    tryThis,
    recap,
    glossary: Array.isArray(lesson.glossary) ? lesson.glossary : []
  };
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

module.exports = { shapeLesson, shapeUnit, splitPlatter };
