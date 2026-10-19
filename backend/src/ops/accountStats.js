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

function blankSlice() {
  return {
    active: { today: 0, days7: 0, days30: 0 },
    returning: 0,
    cohort: 0,
    retained: 0
  };
}

function publishSlice(slice) {
  return {
    active: slice.active,
    returning: slice.returning,
    retention: {
      cohort: slice.cohort,
      active: slice.retained,
      percent: percent(slice.retained, slice.cohort)
    }
  };
}

function tallyActivity(slice, { born, seen, today, days7, days30, now }) {
  const active7 = seen != null && seen >= days7;
  if (seen != null && seen >= today) slice.active.today += 1;
  if (active7) slice.active.days7 += 1;
  if (seen != null && seen >= days30) slice.active.days30 += 1;
  if (born != null && born < now - DAY_MS && active7) slice.returning += 1;
  if (born != null && born < days7) {
    slice.cohort += 1;
    if (active7) slice.retained += 1;
  }
}

function accountStats(accounts, now = Date.now()) {
  const moment = new Date(now);
  const today = startOfBucharestDay(moment, 0);
  const days7 = startOfBucharestDay(moment, 6);
  const days30 = startOfBucharestDay(moment, 29);
  const rows = dedupeAccounts(accounts);
  const counts = { total: rows.length, students: 0, parents: 0, other: 0 };
  const created = { today: 0, days7: 0, days30: 0 };
  const everyone = blankSlice();
  const students = blankSlice();
  const parents = blankSlice();

  for (const account of rows) {
    if (account.role === "student") counts.students += 1;
    else if (account.role === "parent") counts.parents += 1;
    else counts.other += 1;

    const born = stamp(account.createdAt);
    if (born != null && born >= today) created.today += 1;
    if (born != null && born >= days7) created.days7 += 1;
    if (born != null && born >= days30) created.days30 += 1;

    const seen = activityAt(account);
    const mark = { born, seen, today, days7, days30, now };
    tallyActivity(everyone, mark);
    if (account.role === "student") tallyActivity(students, mark);
    else if (account.role === "parent") tallyActivity(parents, mark);
  }

  const all = publishSlice(everyone);
  return {
    timezone: TZ,
    ...counts,
    newAccounts: created,
    active: all.active,
    returning: all.returning,
    retention: all.retention,
    roles: {
      student: publishSlice(students),
      parent: publishSlice(parents)
    },
    activityNote: ACTIVITY_NOTE
  };
}

const XP_BOARD_LIMIT = 100;

function cleanNickname(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text || text.includes("@")) return "";
  return text.slice(0, 40);
}

function studentIdentity(account) {
  const profile = account && account.profile && typeof account.profile === "object" ? account.profile : {};
  return cleanNickname(profile.username) || cleanNickname(profile.name);
}

function collectStudents(accounts) {
  const byEmail = new Map();
  for (const account of accounts || []) {
    if (isDeleted(account)) continue;
    const email = String(account.email || "").trim().toLowerCase();
    if (!email) continue;
    const previous = byEmail.get(email);
    const incoming = studentIdentity(account);
    if (!previous) {
      byEmail.set(email, {
        email,
        role: account.role || "student",
        createdAt: account.createdAt || "",
        lastActiveAt: account.lastActiveAt || "",
        nickname: incoming
      });
      continue;
    }
    const newer = (stamp(account.createdAt) || 0) >= (stamp(previous.createdAt) || 0);
    const roleSource = newer ? account : previous;
    const created = [stamp(previous.createdAt), stamp(account.createdAt)].filter(item => item != null);
    byEmail.set(email, {
      email,
      role: roleSource.role || previous.role || "student",
      createdAt: created.length ? new Date(Math.min(...created)).toISOString() : "",
      lastActiveAt: latestStamp(previous.lastActiveAt, account.lastActiveAt),
      nickname: newer ? incoming || previous.nickname : previous.nickname || incoming
    });
  }
  return [...byEmail.values()].filter(row => row.role === "student");
}

function asXp(value) {
  const xp = Number(value);
  if (!Number.isFinite(xp) || xp < 0) return 0;
  return xp;
}

function xpLeaderboard(accounts, xpByEmail = () => 0) {
  const ranked = collectStudents(accounts)
    .map(student => ({
      nickname: student.nickname,
      xp: asXp(typeof xpByEmail === "function" ? xpByEmail(student.email) : 0),
      lastActiveAt: stamp(student.lastActiveAt) != null ? new Date(stamp(student.lastActiveAt)).toISOString() : null
    }))
    .sort((a, b) => b.xp - a.xp || a.nickname.localeCompare(b.nickname, "ro"));
  return {
    xpSummary: {
      over0: ranked.filter(row => row.xp > 0).length,
      over100: ranked.filter(row => row.xp > 100).length,
      over500: ranked.filter(row => row.xp > 500).length
    },
    xpLeaderboard: ranked.slice(0, XP_BOARD_LIMIT).map((row, index) => ({
      rank: index + 1,
      nickname: row.nickname,
      xp: row.xp,
      lastActiveAt: row.lastActiveAt
    }))
  };
}

module.exports = {
  TZ,
  ACTIVITY_NOTE,
  XP_BOARD_LIMIT,
  startOfBucharestDay,
  dedupeAccounts,
  accountStats,
  xpLeaderboard
};
