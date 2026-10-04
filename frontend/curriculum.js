export const GRADES = [5, 6, 7, 8];

export const SUBJECTS = [
  { id: 'matematica', labelRo: 'Matematică', labelEn: 'Mathematics', icon: 'fa-square-root-alt' },
  { id: 'romana', labelRo: 'Limba română', labelEn: 'Romanian', icon: 'fa-book' }
];

export function normalizeGrade(value) {
  const raw = String(value == null ? '' : value);
  const match = raw.match(/[5-8]/);
  return match ? Number(match[0]) : 5;
}

export function normalizeSubject(value) {
  const raw = String(value == null ? '' : value).toLowerCase();
  if (raw.includes('rom')) return 'romana';
  return 'matematica';
}

export function gradeLabel(grade, locale = 'ro') {
  const g = normalizeGrade(grade);
  return locale === 'en' ? `Grade ${g}` : `Clasa a ${g}-a`;
}

export function subjectLabel(subject, locale = 'ro') {
  const sid = normalizeSubject(subject);
  const item = SUBJECTS.find(entry => entry.id === sid);
  return locale === 'en' ? item.labelEn : item.labelRo;
}
