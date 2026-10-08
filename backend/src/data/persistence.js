// Persistență pe disc pentru toate store-urile in-memory.
//
// De ce fișier și nu o bază de date: aplicația rulează pe shared hosting
// (gazduire.net, CloudLinux + Passenger), unde procesul e oprit la fiecare
// deploy și când intră în idle. Acolo:
//   - Postgres nu este disponibil, doar MySQL;
//   - dependințele native (better-sqlite3) și motoarele Prisma sunt riscante,
//     pentru că `npm install` rulează pe server, cu resurse limitate.
// Un fișier JSON scris atomic nu are nicio dependință, funcționează oriunde și
// rezolvă exact problema: datele supraviețuiesc restartului. STORE=json rămâne
// implicit. STORE=mysql (mysql2, pur JS) scrie rânduri, nu tot fișierul;
// store-urile din memorie nu se schimbă.
//
// Modelul de salvare: la fiecare interval serializăm tot și scriem doar dacă
// s-a schimbat ceva față de ultima scriere. Așa nu trebuie să marcăm manual
// "dirty" în zeci de funcții, deci store-urile rămân neatinse în logica lor.
//
// Cifrarea copiilor bak1–bak3 nu stă pe această cale. După o scriere reușită,
// bytes-ul anterior se cifrează într-un timer, cel mult o dată la 15 minute.
// Fișierul principal rămâne scris sincron, înainte de ieșirea din saveNow.
//
// Un singur proces Passenger. Al doilea proces găsește mentor-ai.json.lock cu
// un pid viu și nu scrie, ca să nu calce datele primului. Lock-ul unui proces
// mort se preia la următoarea salvare.

const fs = require("fs");
const path = require("path");

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "..", "..", "data");
// Numele tehnic vechi al fișierului rămâne intenționat: o redenumire ar pierde datele.
const DATA_FILE = path.join(DATA_DIR, "mentor-ai.json");
const TEMP_FILE = `${DATA_FILE}.tmp`;
const LOCK_FILE = `${DATA_FILE}.lock`;
const AUTOSAVE_MS = 5000;
const DEFAULT_BACKUP_ROTATE_MS = 15 * 60 * 1000;
const FORMAT_VERSION = 1;

const collections = new Map(); // nume -> { snapshot(), restore(data) }

let lastSerialized = null;
let migrationDirty = false;
let autosaveTimer = null;
let backupTimer = null;
let pendingBackup = null;
let lastBackupAt = 0;
let lockWarned = false;
let loaded = false;
let mysqlBlocked = false;
let lastJsonBytes = null;

function backupRotateMs() {
  const raw = process.env.BACKUP_ROTATE_MS;
  if (raw === undefined || raw === "") return DEFAULT_BACKUP_ROTATE_MS;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_BACKUP_ROTATE_MS;
  return parsed;
}

function noteDirty() {
  migrationDirty = true;
}

// Fiecare store se înregistrează singur la require.
function register(name, handlers) {
  if (typeof handlers?.snapshot !== "function" || typeof handlers?.restore !== "function") {
    throw new Error(`Store-ul "${name}" trebuie să expună snapshot() și restore().`);
  }
  collections.set(name, handlers);
}

function serialize() {
  const data = { version: FORMAT_VERSION, savedAt: new Date().toISOString(), collections: {} };
  for (const [name, handlers] of collections.entries()) {
    data.collections[name] = handlers.snapshot();
  }
  return data;
}

// Comparăm ignorând `savedAt`, altfel orice serializare ar părea o schimbare.
function fingerprint(data) {
  return JSON.stringify({ version: data.version, collections: data.collections });
}

function backupPath(n) {
  return `${DATA_FILE}.bak${n}`;
}

function encryptedBackupPath(n) {
  return `${DATA_FILE}.bak${n}.enc`;
}

function readBackupFile(file) {
  const { backupKeyConfigured, decrypt } = require("../ops/backupCrypto");
  const raw = fs.readFileSync(file);
  if (file.endsWith(".enc")) {
    if (!backupKeyConfigured()) throw new Error("BACKUP_KEY lipsește");
    return decrypt(raw).toString("utf8");
  }
  return raw.toString("utf8");
}

function backupDue() {
  if (backupTimer) return true;
  if (!lastBackupAt) return true;
  return Date.now() - lastBackupAt >= backupRotateMs();
}

// Copiază generațiile și scrie bak1 din bytes deja citiți, nu din fișierul
// care tocmai a fost înlocuit. Așa o scriere proastă nu devine singura copie.
function rotateBackupsFrom(bytes) {
  try {
    const { backupKeyConfigured, encrypt } = require("../ops/backupCrypto");
    if (backupKeyConfigured()) {
      if (fs.existsSync(encryptedBackupPath(2))) fs.renameSync(encryptedBackupPath(2), encryptedBackupPath(3));
      if (fs.existsSync(encryptedBackupPath(1))) fs.renameSync(encryptedBackupPath(1), encryptedBackupPath(2));
      fs.writeFileSync(encryptedBackupPath(1), encrypt(bytes));
      for (const n of [1, 2, 3]) {
        if (fs.existsSync(backupPath(n))) fs.rmSync(backupPath(n));
      }
      return true;
    }
    if (fs.existsSync(backupPath(2))) fs.renameSync(backupPath(2), backupPath(3));
    if (fs.existsSync(backupPath(1))) fs.renameSync(backupPath(1), backupPath(2));
    fs.writeFileSync(backupPath(1), bytes);
    return true;
  } catch (error) {
    console.error(`[persistence] backup eșuat: ${error.message}`);
    return false;
  }
}

function runDeferredBackup() {
  backupTimer = null;
  const bytes = pendingBackup;
  pendingBackup = null;
  if (!bytes) return { flushed: false };
  const ok = rotateBackupsFrom(bytes);
  if (ok) lastBackupAt = Date.now();
  return { flushed: ok };
}

function queueBackup(bytes) {
  if (!backupDue()) return;
  pendingBackup = bytes;
  if (backupTimer) return;
  backupTimer = setTimeout(runDeferredBackup, 0);
  if (typeof backupTimer.unref === "function") backupTimer.unref();
}

function flushDeferredBackup() {
  if (backupTimer) {
    clearTimeout(backupTimer);
    backupTimer = null;
  }
  return runDeferredBackup();
}

function pidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  if (pid === process.pid) return true;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}

function writeLock() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(LOCK_FILE, JSON.stringify({ pid: process.pid, at: new Date().toISOString() }));
}

// Soft-guard: un al doilea proces Node nu are voie să rescrie fișierul.
// Passenger trebuie configurat cu un singur proces. Dacă pid-ul din lock a
// murit (restart), preluăm lock-ul și scriem mai departe.
function acquireWriteLock() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const fd = fs.openSync(LOCK_FILE, "wx");
    fs.writeFileSync(fd, JSON.stringify({ pid: process.pid, at: new Date().toISOString() }));
    fs.closeSync(fd);
    lockWarned = false;
    return { ok: true };
  } catch (error) {
    if (error.code !== "EEXIST") {
      console.error(`[persistence] nu am putut lua lock-ul: ${error.message}`);
      return { ok: false, reason: "error" };
    }
  }

  let current = null;
  try {
    current = JSON.parse(fs.readFileSync(LOCK_FILE, "utf8"));
  } catch {
    current = null;
  }
  if (current && pidAlive(current.pid) && current.pid !== process.pid) {
    if (!lockWarned) {
      console.error(
        `[persistence] procesul ${current.pid} ține deja datele. Nu scriu peste ${path.basename(DATA_FILE)}. Passenger trebuie un singur proces Node.`
      );
      lockWarned = true;
    }
    return { ok: false, reason: "locked", pid: current.pid };
  }
  try {
    writeLock();
    lockWarned = false;
    return { ok: true, replaced: true };
  } catch (error) {
    console.error(`[persistence] nu am putut prelua lock-ul: ${error.message}`);
    return { ok: false, reason: "error" };
  }
}

function tryLoadBackup() {
  const files = [];
  for (const n of [1, 2, 3]) {
    files.push(encryptedBackupPath(n));
    files.push(backupPath(n));
  }
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    try {
      const text = readBackupFile(file);
      const parsed = JSON.parse(text);
      if (parsed?.version !== FORMAT_VERSION) continue;
      const restored = [];
      for (const [name, handlers] of collections.entries()) {
        const slice = parsed.collections?.[name];
        if (slice === undefined) continue;
        handlers.restore(slice);
        restored.push(name);
      }
      lastSerialized = fingerprint(serialize());
      console.warn(`[persistence] am restaurat din ${path.basename(file)}`);
      return { loaded: true, restored, savedAt: parsed.savedAt, reason: "backup" };
    } catch {
      // următorul backup
    }
  }
  return null;
}

const REMOVED_COLLECTIONS = ["subscriptions", "links"];

function stripRemovedCollections(parsed) {
  if (!parsed || typeof parsed !== "object" || !parsed.collections) return false;
  let changed = false;
  for (const name of REMOVED_COLLECTIONS) {
    if (Object.prototype.hasOwnProperty.call(parsed.collections, name)) {
      delete parsed.collections[name];
      changed = true;
    }
  }
  const connections = parsed.collections.calendar && parsed.collections.calendar.connections;
  if (connections && Object.keys(connections).length) {
    parsed.collections.calendar.connections = {};
    changed = true;
  }
  return changed;
}

// Șterge datele funcțiilor scoase (abonamente, invitații, tokenuri de calendar
// extern). Copiază fișierul înainte, o singură dată pe zi.
function migrateFile(file = DATA_FILE) {
  if (!fs.existsSync(file)) return { migrated: false, reason: "no_file" };
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return { migrated: false, reason: "unreadable" };
  }
  if (!stripRemovedCollections(parsed)) return { migrated: false, reason: "clean" };
  const stamp = new Date().toISOString().slice(0, 10);
  const backup = `${file}.pre-t12-${stamp}`;
  if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);
  fs.writeFileSync(file, JSON.stringify(parsed));
  return { migrated: true, backup };
}

function loadFromJson() {
  loaded = true;
  migrateFile();
  if (!fs.existsSync(DATA_FILE)) {
    return { loaded: false, reason: "no_file" };
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (error) {
    const backup = `${DATA_FILE}.corupt-${Date.now()}`;
    try { fs.renameSync(DATA_FILE, backup); } catch (renameError) { /* nimic de făcut */ }
    console.error(`[persistence] fișier ilizibil, mutat în ${path.basename(backup)}: ${error.message}`);
    const recovered = tryLoadBackup();
    if (recovered) return recovered;
    return { loaded: false, reason: "corrupt" };
  }

  if (parsed?.version !== FORMAT_VERSION) {
    console.warn(`[persistence] versiune de format necunoscută (${parsed?.version}), pornesc pe curat.`);
    return { loaded: false, reason: "version_mismatch" };
  }

  const collectionKeys = parsed.collections && typeof parsed.collections === "object"
    ? Object.keys(parsed.collections)
    : [];
  if (collectionKeys.length === 0) {
    console.error("[persistence] fișier fără colecții, încerc backup.");
    const recovered = tryLoadBackup();
    if (recovered) return recovered;
    return { loaded: false, reason: "empty" };
  }

  const restored = [];
  for (const [name, handlers] of collections.entries()) {
    const slice = parsed.collections?.[name];
    if (slice === undefined) continue;
    try {
      handlers.restore(slice);
      restored.push(name);
    } catch (error) {
      console.error(`[persistence] nu am putut restaura "${name}": ${error.message}`);
    }
  }

  lastSerialized = fingerprint(serialize());
  return { loaded: true, restored, savedAt: parsed.savedAt };
}

// Scriere atomică: întâi într-un fișier temporar, apoi rename. Rename este
// atomic pe același filesystem, deci un restart în timpul scrierii nu poate
// lăsa în urmă un fișier pe jumătate scris.
function saveJsonNow() {
  if (!collections.size) return { saved: false, reason: "nothing_registered" };

  const lock = acquireWriteLock();
  if (!lock.ok) return { saved: false, reason: lock.reason || "locked" };

  const data = serialize();
  const current = fingerprint(data);
  if (!migrationDirty && current === lastSerialized) return { saved: false, reason: "unchanged" };

  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const json = JSON.stringify(data);
    // Backup-ul e copia de dinainte de scriere, cifrată după ce write-ul a
    // reușit, în afara acestui apel. Citirea se face doar când rotația e
    // scadentă (cel mult o dată la 15 minute), nu la fiecare salvare.
    let previous = null;
    if (backupDue() && fs.existsSync(DATA_FILE)) {
      try { previous = fs.readFileSync(DATA_FILE); } catch { previous = null; }
    }
    fs.writeFileSync(TEMP_FILE, json, "utf8");
    fs.renameSync(TEMP_FILE, DATA_FILE);
    lastSerialized = current;
    migrationDirty = false;
    if (previous) queueBackup(previous);
    return { saved: true, bytes: Buffer.byteLength(json) };
  } catch (error) {
    console.error(`[persistence] salvare eșuată: ${error.message}`);
    try {
      require("../ops/errorMonitor").noteSaveFailure(error);
    } catch {
      /* jurnalul nu oprește salvarea */
    }
    return { saved: false, reason: "error", error: error.message };
  }
}

function startAutosave() {
  if (autosaveTimer) return;
  autosaveTimer = setInterval(saveNow, AUTOSAVE_MS);
  // `unref` ca intervalul să nu țină procesul în viață de unul singur.
  autosaveTimer.unref();
}

function stopAutosave() {
  if (autosaveTimer) clearInterval(autosaveTimer);
  autosaveTimer = null;
}

// --- ajutoare pentru store-uri ---
// Restaurarea trebuie să mute datele în containerele EXISTENTE, nu să le
// înlocuiască: modulele au deja referințe la ele.

function mapToObject(map) {
  return Object.fromEntries(map.entries());
}

function restoreMap(map, data) {
  map.clear();
  for (const [key, value] of Object.entries(data || {})) {
    map.set(key, value);
  }
}

function restoreArray(array, data) {
  array.length = 0;
  if (Array.isArray(data)) array.push(...data);
}

function restoreObject(target, data) {
  for (const key of Object.keys(target)) delete target[key];
  Object.assign(target, data || {});
}

function usingMysql() {
  return require("./storeMode").storeMode() === "mysql";
}

function loadFromMysql() {
  loaded = true;
  const store = require("./mysql/store");
  let read;
  try {
    read = store.readDocument();
  } catch (error) {
    mysqlBlocked = true;
    console.error(`[persistence] MySQL: ${error.message}`);
    try { require("../ops/errorMonitor").noteSaveFailure(error); } catch { /* jurnalul nu oprește pornirea */ }
    if (process.env.NODE_ENV === "production") process.exit(1);
    return { loaded: false, reason: "mysql_error", error: error.message, source: "mysql" };
  }
  if (!read) {
    store.rememberEmpty();
    return { loaded: false, reason: "no_data", source: "mysql" };
  }
  const parsed = read.document;
  const restored = [];
  for (const [name, handlers] of collections.entries()) {
    const slice = parsed.collections?.[name];
    if (slice === undefined) continue;
    try {
      handlers.restore(slice);
      restored.push(name);
    } catch (error) {
      console.error(`[persistence] nu am putut restaura "${name}": ${error.message}`);
    }
  }
  store.markDrift(serialize());
  lastSerialized = fingerprint(serialize());
  return { loaded: true, restored, savedAt: parsed.savedAt, source: "mysql" };
}

function saveMysql() {
  if (mysqlBlocked) return { saved: false, reason: "mysql_error" };
  if (!collections.size) return { saved: false, reason: "nothing_registered" };
  const store = require("./mysql/store");
  const data = serialize();
  const current = fingerprint(data);
  if (!migrationDirty && !store.hasDrift() && current === lastSerialized) {
    return { saved: false, reason: "unchanged" };
  }
  const previous = backupDue() ? lastJsonBytes : null;
  try {
    const result = store.writeCollections(data.collections, {
      force: Boolean(migrationDirty || store.hasDrift()),
      savedAt: data.savedAt,
      replaceAll: false
    });
    if (!result.saved) {
      if (result.reason === "unchanged") {
        migrationDirty = false;
        lastSerialized = current;
      }
      return result;
    }
    lastSerialized = current;
    migrationDirty = false;
    const json = JSON.stringify(data);
    lastJsonBytes = Buffer.from(json);
    if (previous) queueBackup(previous);
    return { saved: true, bytes: Buffer.byteLength(json), rows: result.rows, source: "mysql" };
  } catch (error) {
    console.error(`[persistence] salvare MySQL eșuată: ${error.message}`);
    try { require("../ops/errorMonitor").noteSaveFailure(error); } catch { /* jurnalul nu oprește salvarea */ }
    return { saved: false, reason: "error", error: error.message };
  }
}

function load() {
  if (usingMysql()) return loadFromMysql();
  return loadFromJson();
}

function saveNow() {
  if (usingMysql()) return saveMysql();
  return saveJsonNow();
}

function exportJson() {
  return JSON.stringify(serialize());
}

function importDocument(parsed) {
  if (!parsed || parsed.version !== FORMAT_VERSION) return { saved: false, reason: "version_mismatch" };
  const restored = [];
  for (const [name, handlers] of collections.entries()) {
    const slice = parsed.collections?.[name];
    if (slice === undefined) continue;
    handlers.restore(slice);
    restored.push(name);
  }
  migrationDirty = true;
  const saved = saveNow();
  return { ...saved, restored };
}

function close() {
  if (!usingMysql()) return;
  try { require("./mysql/store").close(); } catch { /* firul era deja oprit */ }
}

// Copie de dinainte de migrarea id-urilor de lecție. Nu se șterge și nu se rescrie.
function lessonMapBackup(version) {
  const dest = `${DATA_FILE}.pre-lectii-v${version}`;
  if (fs.existsSync(dest)) return { saved: false, reason: "exists", path: dest };
  if (usingMysql()) {
    const document = require("./mysql/store").lastReadDocument();
    if (!document) return { saved: false, reason: "no_file", path: dest };
    try {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, JSON.stringify(document));
      return { saved: true, path: dest };
    } catch (error) {
      console.error(`[persistence] copia pre-lectii-v${version} a eșuat: ${error.message}`);
      return { saved: false, reason: "error", path: dest };
    }
  }
  if (!fs.existsSync(DATA_FILE)) return { saved: false, reason: "no_file", path: dest };
  try {
    fs.copyFileSync(DATA_FILE, dest);
    return { saved: true, path: dest };
  } catch (error) {
    console.error(`[persistence] copia pre-lectii-v${version} a eșuat: ${error.message}`);
    return { saved: false, reason: "error", path: dest };
  }
}

module.exports = {
  DATA_FILE,
  DATA_DIR,
  LOCK_FILE,
  register,
  load,
  saveNow,
  noteDirty,
  flushDeferredBackup,
  startAutosave,
  stopAutosave,
  isLoaded: () => loaded,
  mapToObject,
  stripRemovedCollections,
  migrateFile,
  lessonMapBackup,
  restoreMap,
  restoreArray,
  restoreObject,
  exportJson,
  importDocument,
  close,
  serialize
};
