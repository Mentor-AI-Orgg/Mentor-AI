// Jurnal de erori pe disc și alerte către ADMIN_EMAIL.
// Fără emailuri, tokenuri sau corpuri de cerere: doar tip, rută, cod și stack.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { logError } = require("../logger");

const HOUR_MS = 60 * 60 * 1000;
const DAY_ALERTS = 10;
const BACKUP_STALE_MS = 26 * HOUR_MS;
const RETENTION_MS = 30 * 24 * HOUR_MS;
const MAX_BYTES = 1024 * 1024;
const MAX_FILES = 5;

const state = {
  day: "",
  sentToday: 0,
  types: new Map(),
  smtpStreak: 0,
  alerting: false
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
  rollDay(now);
  const previous = state.types.get(key);
  if (previous && now - previous.windowStart < HOUR_MS) {
    previous.count += 1;
    return { sent: false, reason: "hour", count: previous.count };
  }
  const count = previous ? previous.count : 1;
  state.types.set(key, { windowStart: now, count: 1 });
  if (state.sentToday >= DAY_ALERTS) return { sent: false, reason: "day", count };
  if (!adminEmail()) return { sent: false, reason: "no_admin", count };
  state.sentToday += 1;
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
  if (newest && now - newest <= BACKUP_STALE_MS) return { sent: false, reason: "fresh" };
  return noteIncident({ type: "backup_stale", id: "backup", now });
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
  noteSmtpSuccess,
  noteSmtpFailure,
  checkBackupAge,
  watchOperations,
  logFile,
  DAY_ALERTS,
  HOUR_MS,
  BACKUP_STALE_MS
};
