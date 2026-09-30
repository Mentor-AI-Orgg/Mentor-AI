/** Obiectivul săptămânii: 4 zile cu lecții, luni–duminică, aceleași chei ca streakDays. */

const WEEKLY_TARGET = 4;

function utcDayKey(date) {
  return date.toISOString().slice(0, 10);
}

function weeklyGoalFrom(streakDays, now = new Date()) {
  const instant = now instanceof Date ? now : new Date(now);
  const safe = Number.isNaN(instant.getTime()) ? new Date() : instant;
  const mondayOffset = (safe.getUTCDay() + 6) % 7;
  const start = new Date(Date.UTC(
    safe.getUTCFullYear(),
    safe.getUTCMonth(),
    safe.getUTCDate() - mondayOffset
  ));
  const have = new Set(Array.isArray(streakDays) ? streakDays : []);
  const days = [];
  for (let index = 0; index < 7; index += 1) {
    const cursor = new Date(start);
    cursor.setUTCDate(start.getUTCDate() + index);
    const key = utcDayKey(cursor);
    days.push({ key, on: have.has(key) });
  }
  const done = days.filter(item => item.on).length;
  return {
    week: days[0].key,
    target: WEEKLY_TARGET,
    done,
    reached: done >= WEEKLY_TARGET,
    days
  };
}

function dailyGoalFrom(streakDays, now = new Date()) {
  const instant = now instanceof Date ? now : new Date(now);
  const safe = Number.isNaN(instant.getTime()) ? new Date() : instant;
  const day = utcDayKey(safe);
  const done = Array.isArray(streakDays) && streakDays.includes(day);
  return { day, done };
}

export { WEEKLY_TARGET, weeklyGoalFrom, dailyGoalFrom };
