// Nota pe care o vrea copilul (5–10) → tavanul treptelor de dificultate.
// Un 10 nu înseamnă doar itemi grei: la examen iei 10 dacă faci bine și
// ușoarele. Tavanul urcă; baza rămâne.

const TARGET_NOTES = [5, 6, 7, 8, 9, 10];

const MAX_LEVEL = {
  5: 2,
  6: 3,
  7: 4,
  8: 5,
  9: 6,
  10: 8
};

function normalizeTargetNote(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Math.round(Number(value));
  if (!TARGET_NOTES.includes(n)) return null;
  return n;
}

function maxLevelForNote(note) {
  const n = normalizeTargetNote(note);
  if (!n) return null;
  return MAX_LEVEL[n];
}

function levelPlan(count, maxLevel) {
  const want = Math.max(0, Number(count) || 0);
  const max = Math.max(1, Number(maxLevel) || 1);
  if (!want) return [];
  if (want === 1) return [max];
  return Array.from({ length: want }, (_, i) => 1 + Math.round((i / (want - 1)) * (max - 1)));
}

// Testul de capitol nu coboară sub treapta 6: acolo e deja problema de capitol,
// nu încălzirea. Nota 5 stă pe treapta 6 (un procedeu, doi pași).
// Nota 10 stă doar pe treapta 8 (doi procedee, mai mulți pași).
// Între ele tavanul urcă: 6 → 6–7, 7 → 7, 8–9 → 7–8.
const TEST_BAND = {
  1: [6, 6],
  2: [6, 6],
  3: [6, 7],
  4: [7, 7],
  5: [7, 8],
  6: [7, 8],
  7: [8, 8],
  8: [8, 8]
};

function chapterTestPlan(count, maxLevel) {
  const want = Math.max(0, Number(count) || 0);
  if (!want) return [];
  let start = 6;
  let top = 8;
  if (maxLevel) {
    const raw = Math.min(8, Math.max(1, Number(maxLevel) || 1));
    const band = TEST_BAND[raw] || [6, 8];
    start = band[0];
    top = band[1];
  }
  if (want === 1) return [top];
  return Array.from({ length: want }, (_, i) => Math.round(start + ((i / (want - 1)) * (top - start))));
}

module.exports = { TARGET_NOTES, normalizeTargetNote, maxLevelForNote, levelPlan, chapterTestPlan };
