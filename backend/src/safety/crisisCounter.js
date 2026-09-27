// Câte mesaje de criză au apărut într-o zi. Fără cine și fără text.

const persistence = require("../data/persistence");

const COUNTS = {};

function dayKey(now = new Date()) {
  return new Date(now).toISOString().slice(0, 10);
}

function bumpCrisis(now = new Date()) {
  const day = dayKey(now);
  COUNTS[day] = (COUNTS[day] || 0) + 1;
  return { day, count: COUNTS[day] };
}

function crisisCount(now = new Date()) {
  return COUNTS[dayKey(now)] || 0;
}

persistence.register("crisis", {
  snapshot: () => ({ counts: { ...COUNTS } }),
  restore: data => {
    for (const key of Object.keys(COUNTS)) delete COUNTS[key];
    Object.assign(COUNTS, data?.counts || {});
  }
});

module.exports = { bumpCrisis, crisisCount };
