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

function bucharestClock(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Bucharest',
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).formatToParts(date);
  const pick = type => parts.find(part => part.type === type)?.value || '';
  let hour = Number(pick('hour'));
  if (hour === 24) hour = 0;
  return {
    hour,
    minute: pick('minute') || '00',
    day: `${pick('year')}-${pick('month')}-${pick('day')}`
  };
}

function isLateHour(hour) {
  return hour >= 22 || hour < 6;
}

function nightKey(date = new Date()) {
  const clock = bucharestClock(date);
  return clock.hour < 6 ? addDays(clock.day, -1) : clock.day;
}

function lateActivityNote(at, now = new Date()) {
  if (!at) return '';
  const when = new Date(at);
  if (Number.isNaN(when.getTime())) return '';
  const clock = bucharestClock(when);
  if (!isLateHour(clock.hour)) return '';
  const today = bucharestClock(now);
  const hm = `${String(clock.hour).padStart(2, '0')}:${clock.minute}`;
  const yesterday = addDays(today.day, -1);
  let whenWord = '';
  if (clock.day === today.day && clock.hour < 6 && today.hour >= 6) whenWord = 'ieri';
  else if (clock.day === today.day) whenWord = 'azi';
  else if (clock.day === yesterday) whenWord = 'ieri';
  else return '';
  return `Activitate târzie: ${whenWord} la ${hm}`;
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

module.exports = { dayKey, addDays, weekKey, bucharestClock, isLateHour, nightKey, lateActivityNote };
