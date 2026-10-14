// Procentul pe lecție: câte răspunsuri corecte are elevul la întrebările lecției.
// Dacă nu există răspunsuri pe itemi, rămâne cel mai bun scor de test al lecției.
// Sub 60% lecția e de recapitulat.

const { getGuide } = require('./gimnaziuGuide');
const { getEnGuide } = require('./en8Guide');

const REVIEW_BELOW = 60;
const cache = new Map();

function keyOf(row) {
  return `${String(row.subject || '').toLowerCase()}:${String(row.grade || '')}:${String(row.chapterId || '')}:${String(row.lessonId || '')}`;
}

function percentOf(correct, total) {
  const top = Number(total) || 0;
  if (top <= 0) return null;
  const value = Math.round(((Number(correct) || 0) / top) * 100);
  return Math.max(0, Math.min(100, value));
}

function addGuide(rows, seen, guide, track, level) {
  (guide?.units || []).forEach(unit => {
    (unit.lessons || []).forEach(lesson => {
      const lessonId = String(lesson?.id || '');
      if (!lessonId) return;
      const row = {
        subject: String(guide.subject || '').toLowerCase(),
        grade: level,
        chapterId: String(unit.id || ''),
        chapterTitle: String(unit.title || ''),
        lessonId,
        title: String(lesson.title || lessonId),
        track
      };
      const key = keyOf(row);
      if (seen.has(key)) return;
      seen.add(key);
      rows.push(row);
    });
  });
}

function catalogFor(level) {
  if (cache.has(level)) return cache.get(level);
  const rows = [];
  const seen = new Set();
  ['matematica', 'romana'].forEach(subject => {
    addGuide(rows, seen, getGuide(subject, level), '', level);
    if (level >= 8) addGuide(rows, seen, getEnGuide(subject), 'en', level);
  });
  cache.set(level, rows);
  return rows;
}

function lessonMasteryFor(user, grade) {
  const level = Math.min(8, Math.max(5, Number(grade || user?.preferences?.className) || 5));
  const catalog = catalogFor(level);
  const buckets = new Map(catalog.map(row => [keyOf(row), {
    correct: 0,
    total: 0,
    sessions: new Map(),
    bestQuiz: null
  }]));

  Object.values(user?.practiceGates?.released || {}).forEach(row => {
    const lessonId = String(row?.lessonId || '');
    if (!lessonId) return;
    const rowGrade = String(row.grade || level);
    if (rowGrade !== String(level)) return;
    const bucket = buckets.get(keyOf({
      subject: row.subject,
      grade: rowGrade,
      chapterId: row.chapterId,
      lessonId
    }));
    if (!bucket) return;
    bucket.total += 1;
    if (row.ok) bucket.correct += 1;
    const sessionId = String(row.sessionId || '');
    if (!sessionId) return;
    const session = bucket.sessions.get(sessionId) || { correct: 0, total: 0 };
    session.total += 1;
    if (row.ok) session.correct += 1;
    bucket.sessions.set(sessionId, session);
  });

  (Array.isArray(user?.skillLog) ? user.skillLog : []).forEach(entry => {
    if (!entry || entry.kind !== 'test') return;
    const lessonId = String(entry.lessonId || '');
    if (!lessonId) return;
    const rowGrade = String(entry.grade || level);
    if (rowGrade !== String(level)) return;
    const bucket = buckets.get(keyOf({
      subject: entry.subject,
      grade: rowGrade,
      chapterId: entry.chapterId,
      lessonId
    }));
    if (!bucket) return;
    const pct = percentOf(entry.correct, entry.total);
    if (pct == null) return;
    if (bucket.bestQuiz == null || pct > bucket.bestQuiz) bucket.bestQuiz = pct;
  });

  const scored = [];
  catalog.forEach(row => {
    const bucket = buckets.get(keyOf(row));
    let best = bucket.bestQuiz;
    bucket.sessions.forEach(session => {
      const pct = percentOf(session.correct, session.total);
      if (pct == null) return;
      if (best == null || pct > best) best = pct;
    });
    const fromAnswers = bucket.total > 0 ? percentOf(bucket.correct, bucket.total) : null;
    const percent = fromAnswers != null ? fromAnswers : best;
    if (percent == null) return;
    scored.push({
      subject: row.subject,
      grade: row.grade,
      chapterId: row.chapterId,
      chapterTitle: row.chapterTitle,
      lessonId: row.lessonId,
      title: row.title,
      track: row.track,
      percent,
      review: percent < REVIEW_BELOW
    });
  });
  scored.sort((a, b) => Number(b.review) - Number(a.review));
  return scored;
}

module.exports = { lessonMasteryFor, REVIEW_BELOW };
