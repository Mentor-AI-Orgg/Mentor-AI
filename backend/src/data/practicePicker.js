const { listChapterQuestions, listPoints, chapterKey } = require('./practiceBank');
const { getGuide, normalizeGrade, normalizeSubject } = require('./gimnaziuGuide');

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function publicCard(item, review = false) {
  const pairs = item.options.map((text, index) => ({ text, index }));
  const mixed = shuffle(pairs);
  return {
    id: item.id,
    point: item.point,
    question: item.question,
    options: mixed.map(entry => entry.text),
    correct: mixed.findIndex(entry => entry.index === item.correct),
    explain: item.explain,
    review
  };
}

function resolveChapterId(subject, grade, chapterId, topic) {
  if (chapterId) return String(chapterId);
  const guide = getGuide(subject, grade);
  const match = (guide.units || []).find(unit => {
    const title = String(unit.title || '').toLowerCase();
    const needle = String(topic || '').toLowerCase();
    return title === needle || title.includes(needle) || needle.includes(title);
  });
  return match ? match.id : (guide.units[0] && guide.units[0].id) || '';
}

function pickPractice({
  subject,
  grade,
  chapterId,
  topic = '',
  kind = 'flashcards',
  excludeIds = [],
  seenPoints = [],
  count
}) {
  const sid = normalizeSubject(subject);
  const g = normalizeGrade(grade);
  const cid = resolveChapterId(sid, g, chapterId, topic);
  const pool = listChapterQuestions(sid, g, cid);
  const points = listPoints(sid, g, cid);
  const want = Math.min(kind === 'test' ? 6 : 6, Math.max(3, Number(count) || (kind === 'test' ? 5 : 6)));
  const excluded = new Set((excludeIds || []).map(String));
  const seen = new Set((seenPoints || []).map(String));

  const freshPoint = pool.filter(item => !seen.has(item.point) && !excluded.has(item.id));
  const freshId = pool.filter(item => !excluded.has(item.id) && seen.has(item.point));
  const rest = pool.filter(item => excluded.has(item.id) || (seen.has(item.point) && !freshPoint.includes(item)));

  const ordered = [...shuffle(freshPoint), ...shuffle(freshId), ...shuffle(rest.length ? rest : pool)];
  const picked = [];
  const used = new Set();
  for (const item of ordered) {
    if (used.has(item.id)) continue;
    used.add(item.id);
    picked.push(publicCard(item, seen.has(item.point) && !freshPoint.some(entry => entry.id === item.id)));
    if (picked.length >= want) break;
  }

  const afterPoints = new Set([...seen, ...picked.map(card => card.point)]);
  return {
    subject: sid,
    grade: g,
    chapterId: cid,
    kind,
    cards: picked,
    coverage: {
      seen: Math.min(points.length, afterPoints.size),
      total: Math.max(1, points.length),
      complete: points.length > 0 && points.every(point => afterPoints.has(point) || seen.has(point))
    },
    review: picked.every(card => card.review) && seen.size >= points.length,
    key: chapterKey(sid, g, cid)
  };
}

module.exports = { pickPractice, resolveChapterId, shuffle };
