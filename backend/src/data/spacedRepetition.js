const DAY = 24 * 60 * 60 * 1000;
const INTERVALS = [1, 3, 7, 21];

function rate(card = {}, correct = false, now = Date.now()) {
  const box = Math.max(0, Number(card.box) || 0);
  const streak = Math.max(0, Number(card.streak) || 0);
  if (!correct) {
    return { box: 0, streak: 0, due: now + INTERVALS[0] * DAY, retired: false };
  }
  const nextStreak = streak + 1;
  if (box >= INTERVALS.length - 1 && nextStreak >= 2) {
    return { box, streak: nextStreak, due: now, retired: true };
  }
  const nextBox = Math.min(box + 1, INTERVALS.length - 1);
  return {
    box: nextBox,
    streak: nextStreak,
    due: now + INTERVALS[nextBox] * DAY,
    retired: false
  };
}

function buildDeck(boxes = {}, now = Date.now(), limit = 10) {
  const cap = Math.max(0, Number(limit) || 0);
  return Object.entries(boxes)
    .filter(([, card]) => card && !card.retired && Number(card.due || 0) <= now)
    .sort((a, b) => Number(a[1].due) - Number(b[1].due) || String(a[0]).localeCompare(String(b[0])))
    .slice(0, cap)
    .map(([id, card]) => ({
      id,
      lesson: card.lesson || id,
      lessonId: card.lessonId || "",
      subject: card.subject || "",
      grade: card.grade || "",
      due: card.due,
      box: card.box || 0
    }));
}

module.exports = { rate, buildDeck, INTERVALS, DAY };
