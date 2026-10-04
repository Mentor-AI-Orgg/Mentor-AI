const { listChapterQuestions, listPoints, chapterKey } = require('./practiceBank');
const { listChapterExercises, listExercisePoints, publicExercise, questionAsExercise } = require('./exerciseBank');
const { getGuide, normalizeGrade, normalizeSubject } = require('./gimnaziuGuide');
const { lessonsFor } = require('./gimnaziuLessons');
const { generateMany } = require('./itemGenerator');
const { normalizeTargetNote, maxLevelForNote, levelPlan, chapterTestPlan } = require('./targetGrade');

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
    lesson: item.lesson || '',
    question: item.question,
    options: mixed.map(entry => entry.text),
    correct: mixed.findIndex(entry => entry.index === item.correct),
    explain: item.explain,
    level: item.level || 1,
    review
  };
}

function lessonCoverage(subject, grade, chapterId, seenIds) {
  const lessons = lessonsFor(subject, grade, chapterId) || [];
  const items = [
    ...listChapterQuestions(subject, grade, chapterId),
    ...listChapterExercises(subject, grade, chapterId)
  ];
  const idsByLesson = new Map();
  items.forEach(item => {
    if (!item.lesson) return;
    if (!idsByLesson.has(item.lesson)) idsByLesson.set(item.lesson, []);
    idsByLesson.get(item.lesson).push(String(item.id));
  });
  const seen = new Set((seenIds || []).map(String));
  let hit = 0;
  lessons.forEach(lesson => {
    const ids = idsByLesson.get(lesson.id) || [];
    if (ids.some(id => seen.has(id))) hit += 1;
  });
  return { seen: hit, total: lessons.length };
}

function chapterLevelPlan(want, maxLevel) {
  if (maxLevel) return levelPlan(want, maxLevel).map(level => Math.min(8, Math.max(1, level)));
  return Array.from({ length: want }, (_, index) => Math.min(8, index + 1));
}

function pickOne(candidates, usedLessons, seenLessons) {
  if (!candidates.length) return null;
  const freshLesson = candidates.filter(item => item.lesson && !usedLessons.has(item.lesson));
  const pool = freshLesson.length ? freshLesson : candidates;
  const unseen = pool.filter(item => item.lesson && !seenLessons.has(item.lesson));
  const bucket = unseen.length ? unseen : pool;
  return bucket[Math.floor(Math.random() * bucket.length)];
}

function chooseForLevel(pool, level, excluded, used, usedLessons, seenLessons, allowSecondary, floor = 1) {
  const open = pool.filter(item => {
    if (used.has(item.id) || excluded.has(item.id)) return false;
    if (!allowSecondary && item.secondary) return false;
    return true;
  });
  const ceiling = Math.min(8, Number(level) || 1);
  const minLevel = Math.min(ceiling, Math.max(1, Number(floor) || 1));
  let candidates = open.filter(item => (Number(item.level) || 1) === ceiling && ceiling >= minLevel);
  if (!candidates.length) {
    const lower = open.filter(item => {
      const lv = Number(item.level) || 1;
      return lv <= ceiling && lv >= minLevel;
    });
    if (lower.length) {
      const best = Math.max(...lower.map(item => Number(item.level) || 1));
      candidates = lower.filter(item => (Number(item.level) || 1) === best);
    }
  }
  return pickOne(candidates, usedLessons, seenLessons);
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
  seenQuestionIds = [],
  lessonId = '',
  count,
  targetNote
}) {
  const sid = normalizeSubject(subject);
  const g = normalizeGrade(grade);
  const cid = resolveChapterId(sid, g, chapterId, topic);
  const isTest = kind === 'test';
  const lesson = String(lessonId || '');
  const target = lesson ? null : normalizeTargetNote(targetNote);
  const maxLevel = lesson ? null : maxLevelForNote(target);
  const questions = listChapterQuestions(sid, g, cid);
  const exercises = listChapterExercises(sid, g, cid);
  const excluded = new Set((excludeIds || []).map(String));
  const seen = new Set((seenPoints || []).map(String));
  const seenLessons = new Set();
  const idToLesson = new Map();
  [...questions, ...exercises].forEach(item => {
    if (item.lesson) idToLesson.set(String(item.id), item.lesson);
  });
  (seenQuestionIds || []).forEach(id => {
    const name = idToLesson.get(String(id));
    if (name) seenLessons.add(name);
  });

  const points = isTest ? listExercisePoints(sid, g, cid) : listPoints(sid, g, cid);
  const defaultCount = lesson ? (isTest ? 5 : 8) : (isTest ? 10 : 8);
  const want = Math.max(1, Number(count) || defaultCount);
  const picked = [];
  const used = new Set();
  const usedLessons = new Set();
  let reviewMode = false;

  if (lesson && !isTest) {
    let pool = questions.filter(item => item.lesson === lesson && !excluded.has(item.id));
    if (!pool.length) {
      pool = questions.filter(item => item.lesson === lesson);
      reviewMode = pool.length > 0;
    }
    pool.sort((a, b) => (a.level || 99) - (b.level || 99));
    pool.slice(0, want).forEach(item => {
      used.add(item.id);
      picked.push(publicCard(item, reviewMode || seen.has(item.point)));
    });
  } else if (lesson && isTest) {
    const grids = questions.filter(item => item.lesson === lesson).map(questionAsExercise);
    let pool = [...exercises, ...grids].filter(item => item.lesson === lesson && !excluded.has(item.id));
    if (!pool.length) {
      pool = [...exercises, ...grids].filter(item => item.lesson === lesson);
      reviewMode = pool.length > 0;
    }
    pool.sort((a, b) => (a.level || 99) - (b.level || 99));
    pool.slice(0, want).forEach(item => {
      used.add(item.id);
      const reviewCard = reviewMode || seen.has(item.point);
      picked.push(publicExercise(item, reviewCard));
    });
  } else {
    const rawPool = isTest ? exercises : questions;
    const plan = isTest ? chapterTestPlan(want, maxLevel) : chapterLevelPlan(want, maxLevel);
    const skillFloor = isTest ? Math.min(...plan) : 1;
    const pool = maxLevel && !isTest
      ? rawPool.filter(item => (Number(item.level) || 1) <= maxLevel && !item.secondary)
      : rawPool.filter(item => !item.secondary && (!isTest || (Number(item.level) || 1) >= skillFloor));
    plan.forEach(level => {
      if (picked.length >= want) return;
      const item = chooseForLevel(pool, level, excluded, used, usedLessons, seenLessons, false, skillFloor);
      if (!item) return;
      used.add(item.id);
      if (item.lesson) usedLessons.add(item.lesson);
      const reviewCard = seen.has(item.point);
      picked.push(isTest ? publicExercise(item, reviewCard) : publicCard(item, reviewCard));
    });
    if (picked.length < want) {
      const rest = (isTest ? chapterTestPlan(want, maxLevel) : chapterLevelPlan(want, maxLevel)).slice(picked.length);
      const generated = generateMany({
        kind: isTest ? 'test' : 'flashcards',
        subject: sid,
        grade: g,
        chapterId: cid,
        startLevel: Math.min(8, picked.length + 1),
        levels: rest,
        excludeIds: [...excluded, ...used]
      }, want - picked.length);
      generated.forEach(item => {
        const card = isTest
          ? publicExercise({ ...item, level: item.level }, false)
          : publicCard(item, false);
        picked.push(card);
      });
    }
  }

  picked.sort((a, b) => (a.level || 99) - (b.level || 99));
  const afterPoints = new Set([...seen, ...picked.map(card => card.point)]);
  const seenIds = [...(seenQuestionIds || []), ...picked.map(card => card.id)];
  return {
    subject: sid,
    grade: g,
    chapterId: cid,
    lessonId: lesson,
    kind,
    targetNote: target,
    maxLevel,
    cards: picked,
    coverage: {
      seen: Math.min(points.length, afterPoints.size),
      total: Math.max(1, points.length),
      complete: points.length > 0 && points.every(point => afterPoints.has(point) || seen.has(point)),
      lessons: lessonCoverage(sid, g, cid, seenIds)
    },
    review: reviewMode || (picked.length > 0 && picked.every(card => card.review) && seen.size >= points.length),
    infinite: !lesson,
    key: chapterKey(sid, g, cid)
  };
}

module.exports = { pickPractice, resolveChapterId, shuffle };
