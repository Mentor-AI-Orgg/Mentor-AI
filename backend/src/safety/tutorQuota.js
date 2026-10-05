// Întrebări către tutore: 10 pe minut și 60 pe oră, pe cont.
// Fereastra se resetează singură. Nu se blochează contul.
// Criza (116 111) nu trece pe aici: rămâne în chat.js, înainte de limită.

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const TUTOR_PER_MINUTE = 10;
const TUTOR_PER_HOUR = 60;
const MINUTE_MESSAGE = "Încearcă din nou peste un minut.";
const HOUR_MESSAGE = "Încearcă din nou peste o oră.";

const minutes = new Map();
const hours = new Map();

function limitsActive() {
  if (process.env.ENFORCE_TUTOR_LIMIT === "1") return true;
  if (process.env.NODE_ENV === "test" || process.env.VITEST === "true") return false;
  return true;
}

function windowOf(map, key, windowMs, now) {
  const row = map.get(key);
  if (!row || now - row.start >= windowMs) {
    const fresh = { start: now, count: 0 };
    map.set(key, fresh);
    return fresh;
  }
  return row;
}

function accountKey(req) {
  const email = req && req.auth && req.auth.email;
  if (email) return `cont:${String(email).trim().toLowerCase()}`;
  const ip = req && (req.ip || req.socket?.remoteAddress);
  return `ip:${ip || "necunoscut"}`;
}

function takeTutorQuestion(key, now = Date.now()) {
  const id = String(key || "necunoscut");
  const minute = windowOf(minutes, id, MINUTE_MS, now);
  const hour = windowOf(hours, id, HOUR_MS, now);
  if (minute.count >= TUTOR_PER_MINUTE) {
    return {
      ok: false,
      scope: "minute",
      retryAfter: Math.max(1, Math.ceil((minute.start + MINUTE_MS - now) / 1000)),
      message: MINUTE_MESSAGE
    };
  }
  if (hour.count >= TUTOR_PER_HOUR) {
    return {
      ok: false,
      scope: "hour",
      retryAfter: Math.max(1, Math.ceil((hour.start + HOUR_MS - now) / 1000)),
      message: HOUR_MESSAGE
    };
  }
  minute.count += 1;
  hour.count += 1;
  return { ok: true, minute: minute.count, hour: hour.count };
}

function guardTutorAsk(req, res, now = Date.now()) {
  if (!limitsActive()) return false;
  const result = takeTutorQuestion(accountKey(req), now);
  if (result.ok) return false;
  res.set("Retry-After", String(result.retryAfter));
  res.status(429).json({
    error: result.message,
    code: "rate_limited",
    retryAfter: result.retryAfter
  });
  return true;
}

function resetTutorQuota() {
  minutes.clear();
  hours.clear();
}

module.exports = {
  MINUTE_MS,
  HOUR_MS,
  TUTOR_PER_MINUTE,
  TUTOR_PER_HOUR,
  MINUTE_MESSAGE,
  HOUR_MESSAGE,
  accountKey,
  takeTutorQuestion,
  guardTutorAsk,
  resetTutorQuota
};
