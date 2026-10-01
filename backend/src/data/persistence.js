// Persistență pe disc pentru toate store-urile in-memory.
//
// De ce fișier și nu o bază de date: aplicația rulează pe shared hosting
// (gazduire.net, CloudLinux + Passenger), unde procesul e oprit la fiecare
// deploy și când intră în idle. Acolo:
//   - Postgres nu este disponibil, doar MySQL;
//   - dependințele native (better-sqlite3) și motoarele Prisma sunt riscante,
//     pentru că `npm install` rulează pe server, cu resurse limitate.
// Un fișier JSON scris atomic nu are nicio dependință, funcționează oriunde și
// rezolvă exact problema: datele supraviețuiesc restartului. Când volumul
// crește, aici este singurul loc de înlocuit cu MySQL (`mysql2` e pur JS, deci
// merge și pe hostingul actual).
//
// Modelul de salvare: la fiecare interval serializăm tot și scriem doar dacă
// s-a schimbat ceva față de ultima scriere. Așa nu trebuie să marcăm manual
// "dirty" în zeci de funcții, deci store-urile rămân neatinse în logica lor.

const fs = require("fs");
const path = require("path");

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "..", "..", "data");
// Numele tehnic vechi al fișierului rămâne intenționat: o redenumire ar pierde datele.
const DATA_FILE = path.join(DATA_DIR, "mentor-ai.json");
const TEMP_FILE = `${DATA_FILE}.tmp`;
const AUTOSAVE_MS = 5000;
const FORMAT_VERSION = 1;

const collections = new Map(); // nume -> { snapshot(), restore(data) }

let lastSerialized = null;
let autosaveTimer = null;
let loaded = false;

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

function rotateBackups() {
  try {
    const { backupKeyConfigured, encrypt } = require("../ops/backupCrypto");
    if (backupKeyConfigured()) {
      if (fs.existsSync(encryptedBackupPath(2))) fs.renameSync(encryptedBackupPath(2), encryptedBackupPath(3));
      if (fs.existsSync(encryptedBackupPath(1))) fs.renameSync(encryptedBackupPath(1), encryptedBackupPath(2));
      fs.writeFileSync(encryptedBackupPath(1), encrypt(fs.readFileSync(DATA_FILE)));
      for (const n of [1, 2, 3]) {
        if (fs.existsSync(backupPath(n))) fs.rmSync(backupPath(n));
      }
      return;
    }
    if (fs.existsSync(backupPath(2))) fs.renameSync(backupPath(2), backupPath(3));
    if (fs.existsSync(backupPath(1))) fs.renameSync(backupPath(1), backupPath(2));
    fs.copyFileSync(DATA_FILE, backupPath(1));
  } catch (error) {
    console.error(`[persistence] backup eșuat: ${error.message}`);
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
      const parsed = JSON.parse(readBackupFile(file));
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

function load() {
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
function saveNow() {
  if (!collections.size) return { saved: false, reason: "nothing_registered" };

  const data = serialize();
  const current = fingerprint(data);
  if (current === lastSerialized) return { saved: false, reason: "unchanged" };

  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    // Backup-ul e copia de DINAINTE de scriere. Dacă noul fișier e ilizibil,
    // bak1 rămâne ultima versiune bună, nu un duplicat al fișierului stricat.
    if (fs.existsSync(DATA_FILE)) rotateBackups();
    fs.writeFileSync(TEMP_FILE, JSON.stringify(data), "utf8");
    fs.renameSync(TEMP_FILE, DATA_FILE);
    lastSerialized = current;
    return { saved: true, bytes: Buffer.byteLength(JSON.stringify(data)) };
  } catch (error) {
    console.error(`[persistence] salvare eșuată: ${error.message}`);
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

// Copie de dinainte de migrarea id-urilor de lecție. Nu se șterge și nu se rescrie.
function lessonMapBackup(version) {
  const dest = `${DATA_FILE}.pre-lectii-v${version}`;
  if (fs.existsSync(dest)) return { saved: false, reason: "exists", path: dest };
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
  register,
  load,
  saveNow,
  startAutosave,
  stopAutosave,
  isLoaded: () => loaded,
  mapToObject,
  stripRemovedCollections,
  migrateFile,
  lessonMapBackup,
  restoreMap,
  restoreArray,
  restoreObject
};
