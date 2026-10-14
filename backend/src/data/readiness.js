// Progresul din capitolele terminate și din acuratețea testelor.
// La clasa a VIII-a lista e programa de Evaluare Națională.
// La 5–7 e programa clasei.

const { getGuide } = require('./gimnaziuGuide');
const { getEnGuide } = require('./en8Guide');

const GRADE_NAME = { 5: 'a V-a', 6: 'a VI-a', 7: 'a VII-a', 8: 'a VIII-a' };
const cache = new Map();

function unitsFor(grade) {
  const level = Math.min(8, Math.max(5, Number(grade) || 5));
  if (cache.has(level)) return cache.get(level);
  const subjects = level >= 8
    ? ['matematica', 'romana'].map(subject => ({ subject, units: getEnGuide(subject).units || [] }))
    : ['matematica', 'romana'].map(subject => ({ subject, units: getGuide(subject, level).units || [] }));
  const list = subjects.flatMap(entry => entry.units.map(unit => ({
    subject: entry.subject,
    grade: level,
    id: String(unit.id),
    title: String(unit.title || unit.id)
  })));
  cache.set(level, list);
  return list;
}

function accuracyFor(practiceTests, key) {
  let correct = 0;
  let total = 0;
  Object.entries(practiceTests || {}).forEach(([stamp, test]) => {
    if (!stamp.startsWith(`${key}:`)) return;
    correct += Number(test?.score) || 0;
    total += Number(test?.total) || 0;
  });
  if (total <= 0) return null;
  return Math.max(0, Math.min(1, correct / total));
}

function readinessFor(user, grade) {
  const level = Math.min(8, Math.max(5, Number(grade || user?.preferences?.className) || 5));
  const units = unitsFor(level);
  const chapters = user?.chapters || {};
  const tests = user?.practiceTests || {};
  const scored = units.map(unit => {
    const key = `${unit.subject}:${unit.grade}:${unit.id}`;
    const done = Boolean(chapters[key] && chapters[key].status === 'done');
    const accuracy = accuracyFor(tests, key);
    let score = 0;
    if (done && accuracy == null) score = 0.75;
    else if (done) score = 0.5 + 0.5 * accuracy;
    else if (accuracy != null) score = 0.5 * accuracy;
    return { ...unit, done, score };
  });
  const total = scored.length || 1;
  const done = scored.filter(unit => unit.done).length;
  const percent = Math.round((scored.reduce((sum, unit) => sum + unit.score, 0) / total) * 100);
  const nextUnit = scored.find(unit => !unit.done) || null;
  const exam = level >= 8;
  return {
    exam,
    label: exam ? 'Pregătit pentru Evaluare' : `Progres la clasa ${GRADE_NAME[level]}`,
    percent,
    done,
    total: scored.length,
    next: nextUnit ? {
      title: nextUnit.title,
      subject: nextUnit.subject,
      grade: nextUnit.grade,
      chapterId: nextUnit.id
    } : null,
    hint: nextUnit ? `Următorul capitol: ${nextUnit.title}` : 'Ai parcurs capitolele din listă.'
  };
}

module.exports = { readinessFor, unitsFor, GRADE_NAME };
