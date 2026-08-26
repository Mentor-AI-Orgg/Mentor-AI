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

function load() {
  loaded = true;
  if (!fs.existsSync(DATA_FILE)) {
    return { loaded: false, reason: "no_file" };
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (error) {
    // Un fișier corupt nu trebuie să împiedice pornirea aplicației. Îl punem
    // deoparte, ca să poată fi inspectat, și pornim pe curat.
    const backup = `${DATA_FILE}.corupt-${Date.now()}`;
    try { fs.renameSync(DATA_FILE, backup); } catch (renameError) { /* nimic de făcut */ }
    console.error(`[persistence] fișier ilizibil, mutat în ${path.basename(backup)}: ${error.message}`);
    return { loaded: false, reason: "corrupt" };
  }

  if (parsed?.version !== FORMAT_VERSION) {
    console.warn(`[persistence] versiune de format necunoscută (${parsed?.version}), pornesc pe curat.`);
    return { loaded: false, reason: "version_mismatch" };
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
  restoreMap,
  restoreArray,
  restoreObject
};
