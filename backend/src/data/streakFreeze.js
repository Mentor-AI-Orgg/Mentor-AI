// Seria de zile cu o înghețare pe săptămână. O zi intră în serie doar când
// elevul termină ceva. Dacă lipsește exact o zi și mai are înghețarea, o
// folosim singuri și seria nu se rupe.

const { addDays, weekKey } = require('../ops/bucharestDay');

function blankGuard() {
  return { count: 0, lastDay: '', week: '', freezes: 1, frozenDay: '' };
}

function settle(guard, today) {
  const week = weekKey(today);
  if (guard.week !== week) {
    guard.week = week;
    guard.freezes = 1;
  }
  if (!guard.lastDay) return guard;
  const yesterday = addDays(today, -1);
  const dayBefore = addDays(today, -2);
  if (guard.lastDay === today || guard.lastDay === yesterday) return guard;
  if (guard.lastDay === dayBefore && guard.freezes > 0 && guard.frozenDay !== yesterday) {
    guard.freezes -= 1;
    guard.frozenDay = yesterday;
    guard.lastDay = yesterday;
    return guard;
  }
  guard.count = 0;
  guard.lastDay = '';
  return guard;
}

function record(guard, today) {
  settle(guard, today);
  if (guard.lastDay === today) return guard;
  const yesterday = addDays(today, -1);
  if (guard.lastDay === yesterday && guard.count > 0) guard.count += 1;
  else guard.count = 1;
  guard.lastDay = today;
  return guard;
}

module.exports = { blankGuard, settle, record };
