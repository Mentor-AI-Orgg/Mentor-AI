const SEEN_KEY = 's10-late-night';

function zoneName() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch {
    return '';
  }
}

function localDay(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function previousDay(day) {
  const [year, month, date] = String(day).split('-').map(Number);
  const utc = new Date(Date.UTC(year, month - 1, date - 1));
  const y = utc.getUTCFullYear();
  const m = String(utc.getUTCMonth() + 1).padStart(2, '0');
  const d = String(utc.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isLateHour(hour) {
  return hour >= 22 || hour < 6;
}

function lateDecision({ now = new Date(), timeZone, serverLate = false, serverNight = '' } = {}) {
  const zone = timeZone === undefined ? zoneName() : timeZone;
  if (zone === 'Europe/Bucharest') {
    const hour = now.getHours();
    const day = localDay(now);
    return {
      late: isLateHour(hour),
      night: hour < 6 ? previousDay(day) : day,
      source: 'local'
    };
  }
  return {
    late: Boolean(serverLate),
    night: String(serverNight || ''),
    source: 'server'
  };
}

function memory(storage) {
  if (storage) return storage;
  try {
    return typeof sessionStorage !== 'undefined' ? sessionStorage : null;
  } catch {
    return null;
  }
}

function seenNight(night, storage) {
  const box = memory(storage);
  if (!box || !night) return false;
  try {
    return box.getItem(SEEN_KEY) === night;
  } catch {
    return false;
  }
}

function rememberNight(night, storage) {
  const box = memory(storage);
  if (!box || !night) return;
  try {
    box.setItem(SEEN_KEY, night);
  } catch {
    /* sesiunea rămâne fără memorie; cardul poate apărea din nou */
  }
}

export { SEEN_KEY, isLateHour, lateDecision, seenNight, rememberNight, zoneName };
