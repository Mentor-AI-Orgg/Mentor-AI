const DAY = 24 * 60 * 60 * 1000;
const INTERVALS = [1, 3, 7, 21];
const STUDY_GAPS = { 1: 1, 2: 3, 3: 7, 4: 21, 5: 60 };
const STUDY_RESULTS = new Set(['nu', 'aproape', 'stiam']);

function addDays(day, count) {
  const [year, month, date] = String(day || '').split('-').map(Number);
  const next = new Date(Date.UTC(year, (month || 1) - 1, (date || 1) + count));
  return next.toISOString().slice(0, 10);
}

function rateStudy(entry = {}, result, today, mode) {
  const known = Number(entry.b) >= 1;
  const current = known ? Math.min(5, Math.max(1, Number(entry.b))) : 0;
  let box;
  if (!known) box = result === 'stiam' ? 2 : 1;
  else if (result === 'nu') box = 1;
  else if (result === 'aproape') box = current;
  else if (mode === 'extra') box = current;
  else box = Math.min(5, current + 1);
  const keepDue = mode === 'extra' && result === 'stiam' && known;
  const due = keepDue
    ? (entry.due || today)
    : addDays(today, result === 'stiam' ? STUDY_GAPS[box] : 1);
  return {
    b: box,
    due,
    n: (Number(entry.n) || 0) + 1,
    w: (Number(entry.w) || 0) + (result === 'nu' ? 1 : 0),
    last: today
  };
}

function sortDue(list) {
  return list.slice().sort((a, b) => (
    Number(a.box) - Number(b.box)
    || String(a.due).localeCompare(String(b.due))
    || String(a.id).localeCompare(String(b.id))
  ));
}

function roundRobin(list, cap) {
  const groups = new Map();
  list.forEach(item => {
    const key = item.lesson || '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  const out = [];
  const keys = [...groups.keys()];
  while (out.length < cap) {
    let moved = false;
    keys.forEach(key => {
      const bucket = groups.get(key);
      if (out.length < cap && bucket.length) {
        out.push(bucket.shift());
        moved = true;
      }
    });
    if (!moved) break;
  }
  return out;
}

function buildStudyDeck({ cards = [], boxes = {}, today, mode = 'chapter', max }) {
  const cap = Math.max(0, Number(max) || (mode === 'lesson' ? 12 : 20));
  const due = [];
  const fresh = [];
  const later = [];
  cards.forEach(card => {
    const saved = boxes[card.id];
    if (!saved || !(Number(saved.b) >= 1)) {
      fresh.push(card);
      return;
    }
    const row = { ...card, box: Number(saved.b), due: saved.due || '' };
    if (String(saved.due || '') <= String(today || '')) due.push(row);
    else later.push(row);
  });
  const spread = mode === 'chapter' || mode === 'extra';
  const dueOrdered = spread ? roundRobin(sortDue(due), cap) : sortDue(due);
  const freshOrdered = spread ? roundRobin(fresh, 8) : fresh.slice(0, 8);
  const laterOrdered = mode === 'extra' ? (spread ? roundRobin(sortDue(later), cap) : sortDue(later)) : [];
  return [...dueOrdered, ...freshOrdered, ...laterOrdered].slice(0, cap);
}

function replayOnce(queue, card, result) {
  if (result !== 'nu' || !card || card.replayed) return queue;
  return [...queue, { ...card, replayed: true }];
}

function rate(card = {}, correct = false, now = Date.now(), mode) {
  if (STUDY_RESULTS.has(correct)) return rateStudy(card, correct, now, mode);
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
  if (boxes && (Array.isArray(boxes.cards) || typeof boxes.mode === 'string')) {
    return buildStudyDeck(boxes);
  }
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

module.exports = { rate, buildDeck, INTERVALS, DAY, STUDY_GAPS, replayOnce, addDays };
