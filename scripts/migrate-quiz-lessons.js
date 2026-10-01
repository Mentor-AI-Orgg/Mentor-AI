// Rescrie `lesson` și `point` din backend/src/data/quiz/ după LESSON_ID_MAP.
// Dacă folderul nu există, nu face nimic. La o împărțire alege partea principală
// și trece itemul în raport când ținta nu e unică.

const fs = require('fs');
const path = require('path');
const { LESSON_ID_MAP, resolveLessonKey } = require('../backend/src/data/lessonIdMap');

const QUIZ_DIR = path.join(__dirname, '..', 'backend', 'src', 'data', 'quiz');

function sourcesFor(id, map) {
  return Object.keys(map).filter(key => key.endsWith(`:${id}`));
}

function planReplacement(id, map) {
  const sources = sourcesFor(id, map);
  if (!sources.length) return null;
  const finals = [];
  for (const source of sources) {
    const resolved = resolveLessonKey(source, map);
    if (!resolved) return { report: `${id}: ciclu în hartă` };
    const nextId = resolved.key.split(':').pop();
    if (!finals.includes(nextId)) finals.push(nextId);
  }
  if (finals.length === 1) return { id: finals[0] };
  return {
    id: finals[0],
    report: `${id}: împărțire sau capitole diferite (${finals.join(', ')}); am ales partea principală ${finals[0]}`
  };
}

function rewriteField(source, field, map, report) {
  const pattern = new RegExp(`(${field}\\s*:\\s*)(['"])([^'"]+)\\2`, 'g');
  return source.replace(pattern, (all, prefix, quote, id) => {
    const plan = planReplacement(id, map);
    if (!plan || !plan.id || plan.id === id) {
      if (plan && plan.report && !plan.id) report.push(plan.report);
      return all;
    }
    if (plan.report) report.push(plan.report);
    return `${prefix}${quote}${plan.id}${quote}`;
  });
}

function walk(dir, files = []) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.js')) files.push(full);
  });
  return files;
}

function migrateQuizLessons(root = QUIZ_DIR, map = LESSON_ID_MAP) {
  if (!fs.existsSync(root)) {
    console.log('Nu există backend/src/data/quiz/. Nimic de migrat.');
    return { changed: 0, report: [] };
  }
  const report = [];
  let changed = 0;
  walk(root).forEach(file => {
    const source = fs.readFileSync(file, 'utf8');
    const fileReport = [];
    let next = rewriteField(source, 'lesson', map, fileReport);
    next = rewriteField(next, 'point', map, fileReport);
    if (next !== source) {
      fs.writeFileSync(file, next);
      changed += 1;
    }
    fileReport.forEach(line => report.push(`${path.relative(root, file)}: ${line}`));
  });
  report.forEach(line => console.log(line));
  console.log(changed ? `Am rescris ${changed} fișiere.` : 'Quiz-ul era deja aliniat cu harta.');
  return { changed, report };
}

if (require.main === module) migrateQuizLessons();

module.exports = { migrateQuizLessons, planReplacement };
