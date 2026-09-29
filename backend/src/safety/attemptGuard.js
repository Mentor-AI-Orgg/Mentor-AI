// Limite pe cont și pe emailul părintelui. Nu spun dacă un nume există.

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const WAIT_MS = [60 * 1000, 5 * 60 * 1000, 15 * 60 * 1000];

const logins = new Map();
const signupsByIp = new Map();
const signupsByParent = new Map();

function bucket(map, key, windowMs, now) {
  const row = map.get(key);
  if (!row || now - row.start >= windowMs) {
    const fresh = { start: now, count: 0 };
    map.set(key, fresh);
    return fresh;
  }
  return row;
}

function loginState(key, now = Date.now()) {
  const id = String(key || "").trim().toLowerCase();
  const row = logins.get(id) || {
    count: 0,
    lockedUntil: 0,
    hourStart: now,
    hourCount: 0,
    alertedOn: ""
  };
  if (now - row.hourStart >= HOUR_MS) {
    row.hourStart = now;
    row.hourCount = 0;
  }
  logins.set(id, row);
  if (row.lockedUntil > now) {
    return {
      locked: true,
      retryAfter: Math.ceil((row.lockedUntil - now) / 1000),
      alert: false,
      row
    };
  }
  return { locked: false, retryAfter: 0, alert: false, row };
}

function noteLoginFailure(key, now = Date.now()) {
  const state = loginState(key, now);
  if (state.locked) return state;
  const row = state.row;
  row.count += 1;
  row.hourCount += 1;
  let alert = false;
  if (row.count >= 5) {
    const step = Math.min(row.count - 5, WAIT_MS.length - 1);
    row.lockedUntil = now + WAIT_MS[step];
  }
  const day = new Date(now).toISOString().slice(0, 10);
  if (row.hourCount >= 10 && row.alertedOn !== day) {
    row.alertedOn = day;
    alert = true;
  }
  return {
    locked: row.count >= 5,
    retryAfter: row.count >= 5 ? Math.ceil(WAIT_MS[Math.min(row.count - 5, WAIT_MS.length - 1)] / 1000) : 0,
    alert,
    row
  };
}

function clearLoginFailures(key) {
  logins.delete(String(key || "").trim().toLowerCase());
}

function allowSignupIp(ip, now = Date.now()) {
  if (process.env.NODE_ENV === "test" && process.env.ENFORCE_LIMITS !== "1") return true;
  const row = bucket(signupsByIp, String(ip || "unknown"), HOUR_MS, now);
  if (row.count >= 5) return false;
  row.count += 1;
  return true;
}

function allowSignupParent(parentEmail, now = Date.now()) {
  const key = String(parentEmail || "").trim().toLowerCase();
  const row = bucket(signupsByParent, key, DAY_MS, now);
  if (row.count >= 3) return false;
  row.count += 1;
  return true;
}

module.exports = {
  loginState,
  noteLoginFailure,
  clearLoginFailures,
  allowSignupIp,
  allowSignupParent
};
