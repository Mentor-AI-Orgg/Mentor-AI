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

// Testul de capitol stă în banda programei (treptele 4–8), nu pe încălzirea 1–3.
// Rampa e scurtă: câteva trepte, apoi tavanul. Nota dorită urcă tavanul,
// dar nu coboară testul la itemii de primar.
const TEST_BAND = {
  1: [4, 5],
  2: [4, 5],
  3: [4, 6],
  4: [5, 7],
  5: [5, 7],
  6: [6, 8],
  7: [6, 8],
  8: [6, 8]
};

function chapterTestPlan(count, maxLevel) {
  const want = Math.max(0, Number(count) || 0);
  if (!want) return [];
  let start = 4;
  let top = 8;
  if (maxLevel) {
    const raw = Math.min(8, Math.max(1, Number(maxLevel) || 1));
    const band = TEST_BAND[raw] || [5, 8];
    start = band[0];
    top = band[1];
  }
  if (want === 1) return [top];
  return Array.from({ length: want }, (_, i) => Math.round(start + ((i / (want - 1)) * (top - start))));
}

module.exports = { TARGET_NOTES, normalizeTargetNote, maxLevelForNote, levelPlan, chapterTestPlan };
