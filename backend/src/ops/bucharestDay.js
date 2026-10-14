// Ziua de calendar la București. Seria și provocarea se închid la miezul nopții
// de acolo, nu la UTC.

function dayKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Bucharest',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const pick = type => parts.find(part => part.type === type)?.value || '';
  return `${pick('year')}-${pick('month')}-${pick('day')}`;
}

function addDays(day, amount) {
  const [year, month, date] = String(day).split('-').map(Number);
  const utc = new Date(Date.UTC(year, month - 1, date + amount));
  const y = utc.getUTCFullYear();
  const m = String(utc.getUTCMonth() + 1).padStart(2, '0');
  const d = String(utc.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function weekKey(day) {
  const [year, month, date] = String(day).split('-').map(Number);
  const current = new Date(Date.UTC(year, month - 1, date));
  const weekday = current.getUTCDay() || 7;
  current.setUTCDate(current.getUTCDate() + 4 - weekday);
  const weekYear = current.getUTCFullYear();
  const start = new Date(Date.UTC(weekYear, 0, 1));
  const week = Math.ceil((((current - start) / 86400000) + 1) / 7);
  return `${weekYear}-W${String(week).padStart(2, '0')}`;
}

module.exports = { dayKey, addDays, weekKey };
