const { uniqueTargetId, resolveLessonId } = require('./lessonIdMap');

const LESSON_FIELDS = ['lesson', 'lessonId', 'point'];

function needsMigration(user, version) {
  return (Number(user && user.lessonMapVersion) || 0) < version;
}

function remapInChapter(value, subject, grade, chapterId, map) {
  if (typeof value !== 'string' || !value) return value;
  return resolveLessonId(subject, grade, chapterId, value, map) || value;
}

function remapPoints(points, subject, grade, chapterId, map) {
  const next = [];
  (points || []).forEach(point => {
    const mapped = remapInChapter(point, subject, grade, chapterId, map);
    if (mapped && !next.includes(mapped)) next.push(mapped);
  });
  return next;
}

function remapItem(item, subject, grade, chapterId, map) {
  if (!item || typeof item !== 'object') return;
  LESSON_FIELDS.forEach(field => {
    if (typeof item[field] === 'string') {
      item[field] = remapInChapter(item[field], subject, grade, chapterId, map);
    }
  });
  if (Array.isArray(item.items)) {
    item.items.forEach(child => remapItem(child, subject, grade, chapterId, map));
  }
}

function chapterFromStamp(stamp) {
  const match = String(stamp || '').match(/^(.*):\d{4}-\d{2}-\d{2}$/);
  return match ? match[1] : '';
}

function parseChapterKey(chapterKey) {
  const parts = String(chapterKey || '').split(':');
  if (parts.length < 3) return null;
  return { subject: parts[0], grade: parts[1], chapterId: parts.slice(2).join(':') };
}

function migrateSkillPoints(user, map) {
  const next = {};
  Object.entries(user.skillPoints || {}).forEach(([key, value]) => {
    const splitAt = key.indexOf(':');
    if (splitAt < 0) {
      next[key] = value;
      return;
    }
    const subject = key.slice(0, splitAt);
    const point = key.slice(splitAt + 1);
    const mapped = uniqueTargetId(subject, point, map);
    const newKey = `${subject}:${mapped || point}`;
    const row = {
      ...(value && typeof value === 'object' ? value : {}),
      ok: Number(value && value.ok) || 0,
      fail: Number(value && value.fail) || 0,
      label: mapped || (value && value.label) || point,
      subject: (value && value.subject) || subject
    };
    if (!next[newKey]) {
      next[newKey] = row;
      return;
    }
    next[newKey].ok += row.ok;
    next[newKey].fail += row.fail;
  });
  user.skillPoints = next;
}

function migrateSkillLog(user, map) {
  (user.skillLog || []).forEach(entry => {
    const subject = entry.subject || '';
    ['strengths', 'weaknesses'].forEach(field => {
      if (!Array.isArray(entry[field])) return;
      const next = [];
      entry[field].forEach(label => {
        if (typeof label !== 'string') {
          next.push(label);
          return;
        }
        const mapped = uniqueTargetId(subject, label, map) || label;
        if (!next.includes(mapped)) next.push(mapped);
      });
      entry[field] = next;
    });
  });
}

function migratePracticeSeen(user, map) {
  Object.entries(user.practiceSeen || {}).forEach(([chapterKey, row]) => {
    const chapter = parseChapterKey(chapterKey);
    if (!chapter || !row || !Array.isArray(row.points)) return;
    row.points = remapPoints(row.points, chapter.subject, chapter.grade, chapter.chapterId, map);
  });
}

function migratePracticeTests(user, map) {
  Object.entries(user.practiceTests || {}).forEach(([stamp, row]) => {
    const chapter = parseChapterKey(chapterFromStamp(stamp));
    if (!chapter || !row) return;
    remapItem(row, chapter.subject, chapter.grade, chapter.chapterId, map);
  });
}

function migrateSavedSessions(user, map) {
  (user.savedSessions || []).forEach(session => {
    if (!session) return;
    remapItem(session, session.subject || '', session.grade || '', session.chapterId || '', map);
  });
}

function migrateMistakeBoxes(user, map) {
  Object.values(user.mistakeBoxes || {}).forEach(card => {
    if (!card || typeof card !== 'object') return;
    const subject = card.subject || '';
    const grade = card.grade || '';
    const chapterId = card.chapterId || '';
    if (subject && grade && chapterId) {
      if (card.lessonId && card.lessonId !== chapterId) {
        card.lessonId = remapInChapter(card.lessonId, subject, grade, chapterId, map);
      }
      if (typeof card.skill === 'string') {
        card.skill = remapInChapter(card.skill, subject, grade, chapterId, map);
      }
      if (typeof card.lesson === 'string') {
        card.lesson = remapInChapter(card.lesson, subject, grade, chapterId, map);
      }
      return;
    }
    if (!subject) return;
    ['lessonId', 'skill', 'lesson'].forEach(field => {
      if (typeof card[field] !== 'string') return;
      const mapped = uniqueTargetId(subject, card[field], map);
      if (mapped) card[field] = mapped;
    });
  });
}

function replaceLessonAnchors(text, map) {
  return String(text || '').replace(/#lectie-([A-Za-z0-9_-]+)/g, (all, id) => {
    const subjects = new Set();
    Object.keys(map || {}).forEach(key => {
      if (key.endsWith(`:${id}`)) subjects.add(key.split(':')[0]);
    });
    if (subjects.size !== 1) return all;
    const mapped = uniqueTargetId([...subjects][0], id, map);
    return mapped ? `#lectie-${mapped}` : all;
  });
}

function migrateNotificationList(list, map) {
  (list || []).forEach(note => {
    if (!note || typeof note !== 'object') return;
    if (note.meta && typeof note.meta === 'object') {
      remapItem(
        note.meta,
        note.meta.subject || '',
        note.meta.grade || '',
        note.meta.chapterId || '',
        map
      );
    }
    if (typeof note.body === 'string') note.body = replaceLessonAnchors(note.body, map);
  });
}

function migrateUserLessonIds(user, { map, version } = {}) {
  if (!needsMigration(user, version)) return false;
  migratePracticeSeen(user, map);
  migratePracticeTests(user, map);
  migrateSavedSessions(user, map);
  migrateSkillPoints(user, map);
  migrateSkillLog(user, map);
  migrateMistakeBoxes(user, map);
  user.lessonMapVersion = version;
  return true;
}

module.exports = {
  needsMigration,
  migrateUserLessonIds,
  migrateNotificationList
};
