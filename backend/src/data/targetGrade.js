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

module.exports = { TARGET_NOTES, normalizeTargetNote, maxLevelForNote, levelPlan };
