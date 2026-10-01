// Instantaneul id-urilor de dinainte de orice unire. Se generează o singură dată.
// Nu îl regenera: testul de baseline compară cheile de azi cu acest fișier.

const fs = require('fs');
const path = require('path');
const { LESSONS } = require('../backend/src/data/gimnaziuLessons');
const { grade5Guide } = require('../backend/src/data/romana5Litera');
const { grade6Guide } = require('../backend/src/data/romana6Litera');
const { grade7Guide } = require('../backend/src/data/romana7Litera');
const { grade8Guide } = require('../backend/src/data/romana8Litera');
const { LESSONS_EN } = require('../backend/src/data/en8Lessons');

const OUT = path.join(__dirname, '..', 'tests', 'fixtures', 'lessonIds-baseline.json');

function collectLessonKeys() {
  const keys = [];
  Object.entries(LESSONS).forEach(([chapter, lessons]) => {
    (lessons || []).forEach(lesson => keys.push(`${chapter}:${lesson.id}`));
  });
  [[5, grade5Guide()], [6, grade6Guide()], [7, grade7Guide()], [8, grade8Guide()]].forEach(([grade, guide]) => {
    (guide.units || []).forEach(unit => {
      (unit.lessons || []).forEach(lesson => keys.push(`romana:${grade}:${unit.id}:${lesson.id}`));
    });
  });
  Object.entries(LESSONS_EN).forEach(([chapter, lessons]) => {
    (lessons || []).forEach(lesson => keys.push(`en:${chapter}:${lesson.id}`));
  });
  return keys.sort();
}

function main() {
  const keys = collectLessonKeys();
  if (keys.length !== 720 || new Set(keys).size !== keys.length) {
    console.error(`Instantaneul trebuie să aibă 720 de chei unice, am numărat ${keys.length}.`);
    process.exit(1);
  }
  if (fs.existsSync(OUT) && !process.argv.includes('--force')) {
    console.log(`${OUT} există. Nu îl regenerez.`);
    return;
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(keys, null, 2)}\n`);
  console.log(`Am scris ${keys.length} chei în ${OUT}.`);
}

if (require.main === module) main();

module.exports = { collectLessonKeys };
