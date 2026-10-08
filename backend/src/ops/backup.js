// Copie zilnică: gzip, apoi AES-256-GCM cu o cheie nouă la fiecare fișier.
// Cheia AES e înfășurată cu cheia publică RSA-OAEP (SHA-256).
// Cheia privată nu e citită aici și nu are ce căuta pe server.

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const MAGIC = Buffer.from("S10R");
const VERSION = 1;
const DAY_MS = 24 * 60 * 60 * 1000;
const PRE_KEEP_MS = 35 * DAY_MS;
const STALE_MS = 26 * 60 * 60 * 1000;

function dataDir() {
  return process.env.DATA_DIR || path.join(__dirname, "..", "..", "..", "data");
}

function backupDir(explicit) {
  if (explicit) return explicit;
  return path.join(dataDir(), "..", "backups");
}

function dataFile() {
  return path.join(dataDir(), "mentor-ai.json");
}

function loadPublicKey(explicit) {
  if (explicit) return String(explicit);
  const fromEnv = String(process.env.BACKUP_PUBLIC_KEY || "").trim().replace(/\\n/g, "\n");
  if (fromEnv) return fromEnv;
  const file = path.join(__dirname, "..", "..", "backup-public.pem");
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  return "";
}

function publicKeyConfigured() {
  return loadPublicKey().includes("BEGIN PUBLIC KEY");
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function isSunday(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay() === 0;
}

function encryptPayload(plaintext, publicKeyPem, createdAt = new Date().toISOString()) {
  const plain = Buffer.isBuffer(plaintext) ? plaintext : Buffer.from(plaintext);
  const sha256 = crypto.createHash("sha256").update(plain).digest("hex");
  const gzipped = zlib.gzipSync(plain);
  const aesKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, iv);
  cipher.setAAD(Buffer.from(`${createdAt}\n${sha256}`, "utf8"));
  const body = Buffer.concat([cipher.update(gzipped), cipher.final()]);
  const tag = cipher.getAuthTag();
  const wrappedKey = crypto.publicEncrypt({
    key: publicKeyPem,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256"
  }, aesKey);
  const header = Buffer.from(JSON.stringify({
    v: VERSION,
    createdAt,
    sha256,
    wrappedKey: wrappedKey.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64")
  }), "utf8");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(header.length, 0);
  return { bytes: Buffer.concat([MAGIC, Buffer.from([VERSION]), len, header, body]), createdAt, sha256 };
}

function decryptPayload(buffer, privateKeyPem) {
  const bytes = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  if (bytes.length < 10 || !bytes.subarray(0, 4).equals(MAGIC) || bytes[4] !== VERSION) {
    throw new Error("Fișierul nu este o copie Sunt de 10.");
  }
  const headerLen = bytes.readUInt32BE(5);
  if (headerLen < 2 || headerLen > 1024 * 1024 || bytes.length < 9 + headerLen) {
    throw new Error("Antet invalid.");
  }
  let header;
  try {
    header = JSON.parse(bytes.subarray(9, 9 + headerLen).toString("utf8"));
  } catch {
    throw new Error("Antet invalid.");
  }
  const body = bytes.subarray(9 + headerLen);
  let aesKey;
  try {
    aesKey = crypto.privateDecrypt({
      key: privateKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256"
    }, Buffer.from(header.wrappedKey, "base64"));
  } catch {
    throw new Error("Nu am putut deschide cheia copiei.");
  }
  const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey, Buffer.from(header.iv, "base64"));
  decipher.setAAD(Buffer.from(`${header.createdAt}\n${header.sha256}`, "utf8"));
  decipher.setAuthTag(Buffer.from(header.tag, "base64"));
  let gzipped;
  try {
    gzipped = Buffer.concat([decipher.update(body), decipher.final()]);
  } catch {
    throw new Error("Copia a fost modificată.");
  }
  const plain = zlib.gunzipSync(gzipped);
  const actual = crypto.createHash("sha256").update(plain).digest("hex");
  if (actual !== header.sha256) throw new Error("Suma nu se potrivește.");
  return { plain, header };
}

function listBackupFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .map(name => {
      const match = name.match(/^mentor-ai-(\d{4}-\d{2}-\d{2})\.json\.gz\.enc$/);
      if (!match) return null;
      return { name, date: match[1], sunday: isSunday(match[1]) };
    })
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function rotateBackupFiles(dir) {
  const files = listBackupFiles(dir);
  const keep = new Set([
    ...files.filter(file => !file.sunday).slice(0, 14).map(file => file.name),
    ...files.filter(file => file.sunday).slice(0, 4).map(file => file.name)
  ]);
  const removed = [];
  for (const file of files) {
    if (keep.has(file.name)) continue;
    fs.rmSync(path.join(dir, file.name));
    removed.push(file.name);
  }
  return { kept: [...keep], removed };
}

function purgePreCopies(dir, now = Date.now(), keepMs = PRE_KEEP_MS) {
  if (!fs.existsSync(dir)) return [];
  const removed = [];
  for (const name of fs.readdirSync(dir)) {
    if (!name.includes(".pre-")) continue;
    const full = path.join(dir, name);
    let stat;
    try {
      stat = fs.statSync(full);
    } catch {
      continue;
    }
    if (!stat.isFile() || now - stat.mtimeMs <= keepMs) continue;
    fs.rmSync(full);
    removed.push(name);
  }
  return removed;
}

function emailHash(email) {
  return crypto.createHash("sha256").update(String(email || "").trim().toLowerCase()).digest("hex");
}

function stripRemovedAccounts(node, emails) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (let i = node.length - 1; i >= 0; i -= 1) {
      const item = node[i];
      if (!item || typeof item !== "object") continue;
      const id = String(item.email || item.userId || item.user_id || "").trim().toLowerCase();
      if (id && emails.has(id)) node.splice(i, 1);
      else stripRemovedAccounts(item, emails);
    }
    return;
  }
  for (const key of Object.keys(node)) {
    if (emails.has(String(key).trim().toLowerCase())) {
      delete node[key];
      continue;
    }
    stripRemovedAccounts(node[key], emails);
  }
}

function applyDeletionRegistry(data, registry, backupAt) {
  const cutoff = Date.parse(backupAt || "");
  const hashes = new Set();
  for (const row of registry || []) {
    if (!row?.userIdHash) continue;
    const at = Date.parse(row.at || "");
    if (Number.isFinite(cutoff) && Number.isFinite(at) && at <= cutoff) continue;
    hashes.add(row.userIdHash);
  }
  const accounts = data?.collections?.auth?.accounts;
  const removed = [];
  if (accounts && typeof accounts === "object") {
    for (const email of Object.keys(accounts)) {
      if (!hashes.has(emailHash(email))) continue;
      removed.push(email);
    }
  }
  if (removed.length) stripRemovedAccounts(data, new Set(removed.map(email => email.toLowerCase())));
  return { data, removed };
}

function readSource(options = {}) {
  if (options.plaintext !== undefined) return Buffer.from(options.plaintext);
  if (require("../data/storeMode").storeMode() === "mysql") {
    const persistence = require("../data/persistence");
    if (!persistence.isLoaded()) {
      require("../data/loadUserStores");
      persistence.load();
    }
    return Buffer.from(persistence.exportJson());
  }
  const file = options.dataFile || dataFile();
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file);
}

function createBackup(options = {}) {
  const key = loadPublicKey(options.publicKey);
  if (!key.includes("BEGIN PUBLIC KEY")) throw new Error("BACKUP_PUBLIC_KEY lipsește");
  const source = readSource(options);
  if (!source) throw new Error("nu există fișierul de date");
  const now = options.now ? new Date(options.now) : new Date();
  const dir = backupDir(options.backupDir);
  fs.mkdirSync(dir, { recursive: true });
  const packed = encryptPayload(source, key, now.toISOString());
  const name = `mentor-ai-${formatDate(now)}.json.gz.enc`;
  const file = path.join(dir, name);
  fs.writeFileSync(file, packed.bytes);
  const rotation = rotateBackupFiles(dir);
  const purged = purgePreCopies(options.preDir || dataDir(), now.getTime());
  return {
    file,
    bytes: packed.bytes.length,
    createdAt: packed.createdAt,
    sha256: packed.sha256,
    removed: rotation.removed,
    purged
  };
}

function latestBackup(options = {}) {
  const dir = backupDir(options.backupDir);
  const files = listBackupFiles(dir);
  if (!files.length) return null;
  const newest = files[0];
  const full = path.join(dir, newest.name);
  const stat = fs.statSync(full);
  const ageMs = Date.now() - stat.mtimeMs;
  return {
    file: full,
    name: newest.name,
    date: newest.date,
    bytes: stat.size,
    createdAt: stat.mtime.toISOString(),
    ageMs,
    ageHours: ageMs / 3600000
  };
}

function runScheduledBackup(options = {}) {
  const inTest = process.env.NODE_ENV === "test" || process.env.VITEST === "true";
  if (inTest && !options.inline) return { ok: true, skipped: true, reason: "test" };
  const now = options.now ? new Date(options.now) : new Date();
  if (!loadPublicKey(options.publicKey).includes("BEGIN PUBLIC KEY")) {
    return { ok: false, reason: "BACKUP_PUBLIC_KEY lipsește" };
  }
  const dir = backupDir(options.backupDir);
  const name = `mentor-ai-${formatDate(now)}.json.gz.enc`;
  const existing = path.join(dir, name);
  if (!options.force && fs.existsSync(existing)) {
    return { ok: true, skipped: true, reason: "today", file: existing };
  }
  const source = readSource(options);
  if (!source) return { ok: false, reason: "nu există fișierul de date" };
  try {
    return { ok: true, ...createBackup({ ...options, now, plaintext: source }) };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

let backupTimer = null;
let backupKick = null;
let missingKeyLogged = false;

function startDailyBackup() {
  if (backupTimer || backupKick) return { started: false, reason: "already" };
  if (process.env.NODE_ENV === "test" || process.env.VITEST === "true") {
    return { started: false, reason: "test" };
  }
  const tick = () => {
    const result = runScheduledBackup();
    if (result.ok) {
      if (!result.skipped && result.file) console.log(`[backup] copie ${path.basename(result.file)}`);
      return;
    }
    if (String(result.reason || "").includes("BACKUP_PUBLIC_KEY")) {
      if (!missingKeyLogged) {
        missingKeyLogged = true;
        console.error(`[backup] ${result.reason}`);
      }
      return;
    }
    console.error(`[backup] ${result.reason}`);
    try {
      require("./errorMonitor").noteIncident({ type: "backup_failed", id: "backup" }).catch(() => {});
    } catch {
      /* alerta nu oprește aplicația */
    }
  };
  // În afara cererilor: la 45s după pornire, apoi la 30 de minute.
  // Dacă fișierul zilei (ora României) există, nu se mai scrie.
  backupKick = setTimeout(() => {
    backupKick = null;
    tick();
    backupTimer = setInterval(tick, 30 * 60 * 1000);
    if (typeof backupTimer.unref === "function") backupTimer.unref();
  }, 45 * 1000);
  if (typeof backupKick.unref === "function") backupKick.unref();
  return { started: true };
}

function ensureRecentBackup(options = {}) {
  if (process.env.NODE_ENV === "test" && !options.force) {
    return { ok: true, skipped: true, reason: "test" };
  }
  if (!loadPublicKey(options.publicKey).includes("BEGIN PUBLIC KEY")) {
    return { ok: false, reason: "BACKUP_PUBLIC_KEY lipsește" };
  }
  const latest = latestBackup(options);
  if (!options.force && latest && latest.ageMs < STALE_MS) return { ok: true, skipped: true, ...latest };
  const source = readSource(options);
  if (!source) return { ok: false, reason: "nu există fișierul de date" };
  try {
    return { ok: true, ...createBackup({ ...options, plaintext: source }) };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

if (require.main === module) {
  try {
    const result = createBackup();
    process.stdout.write(`Copie ${path.basename(result.file)} ${result.bytes} octeți\n`);
  } catch (error) {
    process.stderr.write(`Backup eșuat: ${error.message}\n`);
    process.exit(1);
  }
}

module.exports = {
  MAGIC,
  STALE_MS,
  PRE_KEEP_MS,
  loadPublicKey,
  publicKeyConfigured,
  formatDate,
  isSunday,
  encryptPayload,
  decryptPayload,
  rotateBackupFiles,
  purgePreCopies,
  applyDeletionRegistry,
  emailHash,
  createBackup,
  latestBackup,
  runScheduledBackup,
  startDailyBackup,
  ensureRecentBackup,
  backupDir
};
