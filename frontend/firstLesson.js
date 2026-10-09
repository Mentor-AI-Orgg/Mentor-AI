import { normalizeGrade, normalizeSubject } from './curriculum.js';

export function lessonIntent(user = {}) {
  const grade = normalizeGrade(user.class || user.className || user.grade);
  const subject = normalizeSubject(user.subject || user.profile || 'matematica');
  if (String(user.exam || '') === 'evaluare') {
    return { track: 'en', subject, grade: 8 };
  }
  return { track: null, subject, grade };
}

export function firstUnitFromGuide(guide) {
  const units = Array.isArray(guide?.units) ? guide.units : [];
  const unit = units.find(item => item && item.id);
  if (!unit) return null;
  const lesson = (Array.isArray(unit.lessons) ? unit.lessons : []).find(item => item && item.id);
  return {
    chapterId: String(unit.id),
    lessonId: lesson ? String(lesson.id) : '',
    title: String(lesson?.title || unit.title || '')
  };
}

export function firstLessonExtras(user, guide) {
  const intent = lessonIntent(user);
  const first = firstUnitFromGuide(guide);
  return {
    subject: intent.subject,
    grade: intent.track === 'en' ? 8 : intent.grade,
    track: intent.track === 'en' ? 'en' : null,
    chapter: first?.chapterId || null,
    lessonId: first?.lessonId || null
  };
}

export function homeLessonCta(lastStudy) {
  if (lastStudy && lastStudy.chapterId) {
    return { label: 'Continuă de unde ai rămas', mode: 'continue' };
  }
  return { label: 'Începe prima lecție', mode: 'first' };
}

export function curriculumParams(user) {
  const intent = lessonIntent(user);
  if (intent.track === 'en') return { subject: intent.subject, track: 'en' };
  return { subject: intent.subject, class_level: intent.grade };
}
