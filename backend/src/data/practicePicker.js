const { listChapterQuestions, listPoints, chapterKey } = require('./practiceBank');
const { listChapterExercises, listExercisePoints, publicExercise } = require('./exerciseBank');
const { getGuide, normalizeGrade, normalizeSubject } = require('./gimnaziuGuide');
const { generateMany } = require('./itemGenerator');
const { normalizeTargetNote, maxLevelForNote, levelPlan } = require('./targetGrade');

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
    level: item.level || 1,
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
  count,
  targetNote
}) {
  const sid = normalizeSubject(subject);
  const g = normalizeGrade(grade);
  const cid = resolveChapterId(sid, g, chapterId, topic);
  const isTest = kind === 'test';
  const target = normalizeTargetNote(targetNote);
  const maxLevel = maxLevelForNote(target);
  const rawPool = isTest ? listChapterExercises(sid, g, cid) : listChapterQuestions(sid, g, cid);
  const pool = maxLevel
    ? rawPool.filter(item => (Number(item.level) || 1) <= maxLevel)
    : rawPool;
  const points = isTest ? listExercisePoints(sid, g, cid) : listPoints(sid, g, cid);
  const want = isTest ? Math.max(1, Number(count) || 10) : Math.max(1, Number(count) || 8);
  const excluded = new Set((excludeIds || []).map(String));
  const seen = new Set((seenPoints || []).map(String));

  const freshPoint = pool.filter(item => !seen.has(item.point) && !excluded.has(item.id));
  const freshId = pool.filter(item => !excluded.has(item.id) && seen.has(item.point));

  const byLevel = list => list.slice().sort((a, b) => (a.level || 99) - (b.level || 99));
  const ordered = byLevel([...freshPoint, ...freshId]);
  const picked = [];
  const used = new Set();
  for (const item of ordered) {
    if (used.has(item.id) || excluded.has(item.id)) continue;
    used.add(item.id);
    const reviewCard = seen.has(item.point) && !freshPoint.some(entry => entry.id === item.id);
    picked.push(isTest ? publicExercise(item, reviewCard) : publicCard(item, reviewCard));
    if (picked.length >= want) break;
  }
  if (picked.length < want) {
    const generated = generateMany({
      kind: isTest ? 'test' : 'flashcards',
      subject: sid,
      grade: g,
      chapterId: cid,
      startLevel: picked.length + 1,
      levels: maxLevel ? levelPlan(want, maxLevel).slice(picked.length) : undefined,
      excludeIds: [...excluded, ...used]
    }, want - picked.length);
    generated.forEach(item => {
      const card = isTest
        ? publicExercise({ ...item, level: item.level }, false)
        : publicCard(item, false);
      picked.push(card);
    });
  }
  picked.sort((a, b) => (a.level || 99) - (b.level || 99));

  const afterPoints = new Set([...seen, ...picked.map(card => card.point)]);
  return {
    subject: sid,
    grade: g,
    chapterId: cid,
    kind,
    targetNote: target,
    maxLevel,
    cards: picked,
    coverage: {
      seen: Math.min(points.length, afterPoints.size),
      total: Math.max(1, points.length),
      complete: points.length > 0 && points.every(point => afterPoints.has(point) || seen.has(point))
    },
    review: picked.every(card => card.review) && seen.size >= points.length,
    infinite: true,
    key: chapterKey(sid, g, cid)
  };
}

module.exports = { pickPractice, resolveChapterId, shuffle };
