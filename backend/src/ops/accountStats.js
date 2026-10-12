// Numere de conturi, fără date personale. Ziua se încheie la miezul nopții
// în Europe/Bucharest. Activitatea e ultima dintre lastActiveAt și lastLoginAt.

const TZ = "Europe/Bucharest";
const DAY_MS = 24 * 60 * 60 * 1000;

const ACTIVITY_NOTE =
  "Ultima autentificare era deja salvată. Activitatea dintre autentificări se notează de acum, cel mult o dată pe oră.";

function zonedParts(date, options) {
  const bag = {};
  for (const part of new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...options }).formatToParts(date)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  return bag;
}

function bucharestOffsetMs(date) {
  const parts = zonedParts(date, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });
  let hour = Number(parts.hour);
  let day = Number(parts.day);
  if (hour === 24) hour = 0;
  const asUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, day, hour, Number(parts.minute), Number(parts.second));
  return asUtc - date.getTime();
}

function bucharestYmd(date) {
  const parts = zonedParts(date, { year: "numeric", month: "2-digit", day: "2-digit" });
  return { y: Number(parts.year), m: Number(parts.month), d: Number(parts.day) };
}

function addCalendarDays(ymd, delta) {
  const shifted = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d + delta));
  return { y: shifted.getUTCFullYear(), m: shifted.getUTCMonth() + 1, d: shifted.getUTCDate() };
}

function startOfBucharestDay(date, daysBack = 0) {
  const ymd = addCalendarDays(bucharestYmd(date), -daysBack);
  const utcMidnight = Date.UTC(ymd.y, ymd.m - 1, ymd.d);
  let guess = utcMidnight;
  for (let i = 0; i < 4; i += 1) {
    const next = utcMidnight - bucharestOffsetMs(new Date(guess));
    if (next === guess) return guess;
    guess = next;
  }
  return guess;
}

function stamp(value) {
  const at = Date.parse(value || "");
  return Number.isFinite(at) ? at : null;
}

function latestStamp(left, right) {
  const stamps = [stamp(left), stamp(right)].filter(item => item != null);
  if (!stamps.length) return "";
  return new Date(Math.max(...stamps)).toISOString();
}

function isDeleted(account) {
  if (!account || typeof account !== "object") return true;
  if (account.deleted === true) return true;
  if (account.deletedAt || account.erasedAt) return true;
  return false;
}

function dedupeAccounts(accounts) {
  const byEmail = new Map();
  for (const account of accounts || []) {
    if (isDeleted(account)) continue;
    const email = String(account.email || "").trim().toLowerCase();
    if (!email) continue;
    const previous = byEmail.get(email);
    if (!previous) {
      byEmail.set(email, {
        email,
        role: account.role || "student",
        createdAt: account.createdAt || "",
        lastLoginAt: account.lastLoginAt || "",
        lastActiveAt: account.lastActiveAt || ""
      });
      continue;
    }
    const created = [stamp(previous.createdAt), stamp(account.createdAt)].filter(item => item != null);
    const roleSource = (stamp(account.createdAt) || 0) >= (stamp(previous.createdAt) || 0) ? account : previous;
    byEmail.set(email, {
      email,
      role: roleSource.role || previous.role || "student",
      createdAt: created.length ? new Date(Math.min(...created)).toISOString() : "",
      lastLoginAt: latestStamp(previous.lastLoginAt, account.lastLoginAt),
      lastActiveAt: latestStamp(previous.lastActiveAt, account.lastActiveAt)
    });
  }
  return [...byEmail.values()];
}

function activityAt(account) {
  const stamps = [stamp(account.lastActiveAt), stamp(account.lastLoginAt)].filter(item => item != null);
  if (!stamps.length) return null;
  return Math.max(...stamps);
}

function percent(part, whole) {
  if (!whole) return null;
  return Math.round((part / whole) * 1000) / 10;
}

function accountStats(accounts, now = Date.now()) {
  const moment = new Date(now);
  const today = startOfBucharestDay(moment, 0);
  const days7 = startOfBucharestDay(moment, 6);
  const days30 = startOfBucharestDay(moment, 29);
  const rows = dedupeAccounts(accounts);
  const counts = { total: rows.length, students: 0, parents: 0, other: 0 };
  const created = { today: 0, days7: 0, days30: 0 };
  const active = { today: 0, days7: 0, days30: 0 };
  let returning = 0;
  let cohort = 0;
  let retained = 0;

  for (const account of rows) {
    if (account.role === "student") counts.students += 1;
    else if (account.role === "parent") counts.parents += 1;
    else counts.other += 1;

    const born = stamp(account.createdAt);
    if (born != null && born >= today) created.today += 1;
    if (born != null && born >= days7) created.days7 += 1;
    if (born != null && born >= days30) created.days30 += 1;

    const seen = activityAt(account);
    const active7 = seen != null && seen >= days7;
    if (seen != null && seen >= today) active.today += 1;
    if (active7) active.days7 += 1;
    if (seen != null && seen >= days30) active.days30 += 1;

    if (born != null && born < now - DAY_MS && active7) returning += 1;
    if (born != null && born < days7) {
      cohort += 1;
      if (active7) retained += 1;
    }
  }

  return {
    timezone: TZ,
    ...counts,
    newAccounts: created,
    active,
    returning,
    retention: { cohort, active: retained, percent: percent(retained, cohort) },
    activityNote: ACTIVITY_NOTE
  };
}

module.exports = {
  TZ,
  ACTIVITY_NOTE,
  startOfBucharestDay,
  dedupeAccounts,
  accountStats
};
