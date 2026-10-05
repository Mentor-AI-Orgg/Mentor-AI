// Jurnal de erori pe disc și alerte către ADMIN_EMAIL.
// Fără emailuri, tokenuri sau corpuri de cerere: doar tip, rută, cod și stack.
// O alertă pe tip într-o oră, încă una dacă același tip se repetă, maxim 10 pe zi.
// Starea se ține pe disc în producție, ca un restart în buclă să nu trimită iar.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { logError } = require("../logger");

const HOUR_MS = 60 * 60 * 1000;
const DAY_ALERTS = 10;
const REPEAT_AT = 8;
const BACKUP_STALE_MS = 26 * HOUR_MS;
const RETENTION_MS = 30 * 24 * HOUR_MS;
const MAX_BYTES = 1024 * 1024;
const MAX_FILES = 5;

const state = {
  day: "",
  sentToday: 0,
  types: new Map(),
  smtpStreak: 0,
  alerting: false,
  hydrated: false,
  hooksInstalled: false
};

function newId() {
  return crypto.randomBytes(4).toString("hex");
}

function logDirectory() {
  return process.env.ERROR_LOG_DIR || path.join(__dirname, "..", "..", "..", "logs");
}

function logFile() {
  return path.join(logDirectory(), "errors.log");
}

function resetAlerts() {
  state.day = "";
  state.sentToday = 0;
  state.types = new Map();
  state.smtpStreak = 0;
  state.alerting = false;
  state.hydrated = false;
  if (process.env.ERROR_LOG_DIR) {
    try {
      fs.rmSync(stateFile(), { force: true });
    } catch {
      /* fișierul de stare lipsește */
    }
  }
}

function persistEnabled() {
  if (!process.env.ERROR_LOG_DIR && (process.env.NODE_ENV === "test" || process.env.VITEST === "true")) {
    return false;
  }
  return Boolean(process.env.ERROR_LOG_DIR) || process.env.NODE_ENV === "production";
}

function stateFile() {
  return path.join(logDirectory(), "alert-state.json");
}

function hydrateAlerts() {
  if (state.hydrated) return;
  state.hydrated = true;
  if (!persistEnabled()) return;
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(stateFile(), "utf8"));
  } catch {
    return;
  }
  if (!parsed || typeof parsed !== "object") return;
  state.day = String(parsed.day || "");
  state.sentToday = Number(parsed.sentToday) || 0;
  const types = parsed.types && typeof parsed.types === "object" ? parsed.types : {};
  state.types = new Map(Object.entries(types).map(([key, row]) => [key, {
    windowStart: Number(row && row.windowStart) || 0,
    count: Number(row && row.count) || 0,
    repeatSent: Boolean(row && row.repeatSent)
  }]));
}

function persistAlerts() {
  if (!persistEnabled()) return;
  const types = {};
  for (const [key, row] of state.types) {
    types[key] = {
      windowStart: row.windowStart,
      count: row.count,
      repeatSent: Boolean(row.repeatSent)
    };
  }
  try {
    const dir = logDirectory();
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(stateFile(), JSON.stringify({ day: state.day, sentToday: state.sentToday, types }));
  } catch {
    /* discul nu oprește procesul */
  }
}

function adminEmail() {
  return String(process.env.ADMIN_EMAIL || "").trim();
}

function pruneOld(dir) {
  const cutoff = Date.now() - RETENTION_MS;
  let names = [];
  try {
    names = fs.readdirSync(dir);
  } catch {
    return;
  }
  names.forEach(name => {
    if (!name.startsWith("errors.log")) return;
    const full = path.join(dir, name);
    try {
      if (fs.statSync(full).mtimeMs < cutoff) fs.unlinkSync(full);
    } catch {
      /* fișierul a dispărut între timp */
    }
  });
}

function rotate(file) {
  let size = 0;
  try {
    size = fs.statSync(file).size;
  } catch {
    return;
  }
  if (size < MAX_BYTES) return;
  const oldest = `${file}.${MAX_FILES - 1}`;
  if (fs.existsSync(oldest)) fs.unlinkSync(oldest);
  for (let i = MAX_FILES - 2; i >= 1; i -= 1) {
    const src = `${file}.${i}`;
    if (fs.existsSync(src)) fs.renameSync(src, `${file}.${i + 1}`);
  }
  fs.renameSync(file, `${file}.1`);
}

function appendLog(line) {
  const dir = logDirectory();
  fs.mkdirSync(dir, { recursive: true });
  pruneOld(dir);
  const file = logFile();
  rotate(file);
  fs.appendFileSync(file, `${line}\n`);
}

function rollDay(now) {
  const day = new Date(now).toISOString().slice(0, 10);
  if (state.day !== day) {
    state.day = day;
    state.sentToday = 0;
  }
}

async function sendAlert({ type, count, id }) {
  const to = adminEmail();
  if (!to || state.alerting) return { sent: false, reason: "no_admin" };
  state.alerting = true;
  try {
    const { deliverMessage } = require("../notify/deliver");
    const body = [
      `Tip: ${String(type || "Error").slice(0, 80)}`,
      `Apariții: ${Number(count) || 1}`,
      `Id: ${String(id || "").slice(0, 16)}`
    ].join("\n");
    await deliverMessage({
      to,
      subject: "Sunt de 10: eroare pe server",
      body
    });
    return { sent: true };
  } finally {
    state.alerting = false;
  }
}

async function noteIncident({ type, id, now = Date.now() }) {
  const key = String(type || "Error").slice(0, 80);
  hydrateAlerts();
  rollDay(now);
  const previous = state.types.get(key);
  if (previous && now - previous.windowStart < HOUR_MS) {
    previous.count += 1;
    if (previous.count === REPEAT_AT && !previous.repeatSent) {
      previous.repeatSent = true;
      if (state.sentToday >= DAY_ALERTS || !adminEmail()) {
        persistAlerts();
        return {
          sent: false,
          reason: state.sentToday >= DAY_ALERTS ? "day" : "no_admin",
          count: previous.count
        };
      }
      state.sentToday += 1;
      persistAlerts();
      await sendAlert({ type: key, count: previous.count, id });
      return { sent: true, reason: "repeat", count: previous.count };
    }
    persistAlerts();
    return { sent: false, reason: "hour", count: previous.count };
  }
  const count = previous ? previous.count : 1;
  state.types.set(key, { windowStart: now, count: 1, repeatSent: false });
  if (state.sentToday >= DAY_ALERTS) {
    persistAlerts();
    return { sent: false, reason: "day", count };
  }
  if (!adminEmail()) {
    persistAlerts();
    return { sent: false, reason: "no_admin", count };
  }
  state.sentToday += 1;
  persistAlerts();
  await sendAlert({ type: key, count, id });
  return { sent: true, count };
}

function reportError({ id, status, route, code, stack }) {
  const entry = {
    at: new Date().toISOString(),
    id: String(id || newId()).slice(0, 16),
    status: Number(status) || 500,
    route: String(route || "/").split("?")[0],
    code: String(code || "Error").slice(0, 80),
    stack: String(stack || "").split("\n").slice(0, 12).join("\n")
  };
  appendLog(logError(entry));
  return noteIncident({ type: entry.code, id: entry.id });
}

function reportClientError({ message, file, line }) {
  const id = newId();
  const entry = {
    at: new Date().toISOString(),
    id,
    status: 0,
    route: "/api/client-error",
    code: "client_error",
    message: String(message || "").slice(0, 300),
    file: String(file || "").slice(0, 80),
    line: Number(line) || 0
  };
  appendLog(logError(entry));
  return noteIncident({ type: "client_error", id });
}

function recordMailCode(code) {
  const safe = String(code || "").trim();
  if (!/^[A-Za-z0-9_]{1,40}$/.test(safe)) return;
  let line = "";
  try {
    line = logError({ at: new Date().toISOString(), code: safe });
  } catch {
    return;
  }
  if (process.env.NODE_ENV === "test" && !process.env.ERROR_LOG_DIR) return;
  try {
    appendLog(line);
  } catch {
    /* discul nu oprește trimiterea */
  }
}

function noteSmtpSuccess() {
  state.smtpStreak = 0;
}

function noteSmtpFailure() {
  if (state.alerting) return Promise.resolve({ sent: false, reason: "alerting" });
  state.smtpStreak += 1;
  if (state.smtpStreak === 3) return noteIncident({ type: "smtp_failed", id: "smtp" });
  return Promise.resolve({ sent: false, reason: "streak", count: state.smtpStreak });
}

function latestBackupMs(dataFile) {
  const dailyDir = path.join(path.dirname(dataFile), "..", "backups");
  if (fs.existsSync(dailyDir)) {
    let newest = 0;
    for (const name of fs.readdirSync(dailyDir)) {
      if (!name.endsWith(".json.gz.enc")) continue;
      try {
        const mtime = fs.statSync(path.join(dailyDir, name)).mtimeMs;
        if (mtime > newest) newest = mtime;
      } catch {
        /* fișierul a dispărut între timp */
      }
    }
    return newest;
  }
  let newest = 0;
  [1, 2, 3].forEach(n => {
    [`${dataFile}.bak${n}.enc`, `${dataFile}.bak${n}`].forEach(file => {
      try {
        const mtime = fs.statSync(file).mtimeMs;
        if (mtime > newest) newest = mtime;
      } catch {
        /* copia asta lipsește */
      }
    });
  });
  return newest;
}

function checkBackupAge({ dataFile, now = Date.now() } = {}) {
  const newest = latestBackupMs(dataFile);
  if (newest && now - newest <= BACKUP_STALE_MS) return Promise.resolve({ sent: false, reason: "fresh" });
  return noteIncident({ type: "backup_stale", id: "backup", now });
}

function noteSaveFailure(error) {
  return reportError({
    status: 500,
    route: "persistence.save",
    code: "health_save_failed",
    stack: error && error.stack ? error.stack : String((error && error.message) || "")
  });
}

function onProcessFault(code, exitAfter) {
  return (error) => {
    const stack = error && error.stack ? error.stack : String(error || "");
    const pending = reportError({
      status: 500,
      route: "process",
      code,
      stack
    });
    if (!exitAfter) {
      Promise.resolve(pending).catch(() => {});
      return;
    }
    Promise.resolve(pending).catch(() => {}).finally(() => {
      setTimeout(() => process.exit(1), 400).unref();
    });
  };
}

function installProcessAlerts() {
  if (state.hooksInstalled) return;
  if (process.env.NODE_ENV === "test" || process.env.VITEST === "true") return;
  state.hooksInstalled = true;
  process.on("uncaughtException", onProcessFault("uncaught_exception", true));
  process.on("unhandledRejection", onProcessFault("unhandled_rejection", false));
}

function watchOperations(dataFile) {
  checkBackupAge({ dataFile }).catch(() => {});
  const timer = setInterval(() => {
    checkBackupAge({ dataFile }).catch(() => {});
  }, HOUR_MS);
  if (typeof timer.unref === "function") timer.unref();
  return timer;
}

module.exports = {
  newId,
  resetAlerts,
  noteIncident,
  reportError,
  reportClientError,
  recordMailCode,
  noteSmtpSuccess,
  noteSmtpFailure,
  noteSaveFailure,
  installProcessAlerts,
  checkBackupAge,
  watchOperations,
  logFile,
  DAY_ALERTS,
  REPEAT_AT,
  HOUR_MS,
  BACKUP_STALE_MS
};
