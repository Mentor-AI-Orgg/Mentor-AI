// Căsuța are plafonul ei. Când SMTP îl anunță, rezumatul se oprește până
// la miezul nopții pe ora București și nu mai reîncearcă în aceeași zi.
// Linkurile și resetările nu trec pe aici: ele încearcă oricum.

const state = {
  quotaUntil: 0
};

function dayParts(now) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });
  return Object.fromEntries(fmt.formatToParts(now).map(part => [part.type, part.value]));
}

function bucharestMidnightAfter(now = new Date()) {
  const today = dayParts(now);
  const [year, month, day] = [today.year, today.month, today.day].map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + 1));
  const date = next.toISOString().slice(0, 10);
  for (const offset of [3, 2]) {
    const instant = new Date(Date.parse(`${date}T00:00:00Z`) - offset * 3600 * 1000);
    const got = dayParts(instant);
    if (`${got.year}-${got.month}-${got.day}` === date && got.hour === "00" && got.minute === "00") {
      return instant.getTime();
    }
  }
  return now.getTime() + 6 * 3600 * 1000;
}

function quotaBlocked(now = new Date()) {
  return state.quotaUntil > now.getTime();
}

function noteQuota(now = new Date()) {
  const until = bucharestMidnightAfter(now);
  if (until > state.quotaUntil) state.quotaUntil = until;
  return state.quotaUntil;
}

function isQuotaError(error) {
  const text = `${error && error.response ? error.response : ""} ${error && error.message ? error.message : ""}`;
  if (/quota|sending limit|daily limit|too many (?:emails|messages)|mailbox .*limit/i.test(text)) return true;
  const code = Number(error && error.responseCode);
  return code === 452 || code === 552;
}

function snapshot() {
  return { quotaUntil: state.quotaUntil };
}

function restore(data = {}) {
  state.quotaUntil = Number(data.quotaUntil) || 0;
}

function resetForTests() {
  state.quotaUntil = 0;
}

module.exports = {
  quotaBlocked,
  noteQuota,
  isQuotaError,
  bucharestMidnightAfter,
  snapshot,
  restore,
  resetForTests
};
