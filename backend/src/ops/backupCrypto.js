// Backup-urile de pe disc sunt cifrate cu AES-256-GCM.
// Cheia nu stă în fișier: vine din BACKUP_KEY, la fiecare citire.

const crypto = require("crypto");

const MAGIC = Buffer.from("S10B");

function backupKey() {
  return String(process.env.BACKUP_KEY || "").trim();
}

function backupKeyConfigured() {
  return backupKey().length >= 16;
}

function derive(secret, salt) {
  return crypto.scryptSync(secret, salt, 32);
}

function encrypt(plaintext) {
  const secret = backupKey();
  if (!backupKeyConfigured()) {
    throw new Error("BACKUP_KEY lipsește sau e prea scurtă.");
  }
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", derive(secret, salt), iv);
  const body = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([MAGIC, Buffer.from([1]), salt, iv, tag, body]);
}

function decrypt(buffer) {
  const secret = backupKey();
  if (!backupKeyConfigured()) {
    throw new Error("BACKUP_KEY lipsește sau e prea scurtă.");
  }
  const bytes = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  if (bytes.length < 4 + 1 + 16 + 12 + 16 || !bytes.subarray(0, 4).equals(MAGIC) || bytes[4] !== 1) {
    throw new Error("Fișierul nu este un backup Sunt de 10.");
  }
  const salt = bytes.subarray(5, 21);
  const iv = bytes.subarray(21, 33);
  const tag = bytes.subarray(33, 49);
  const body = bytes.subarray(49);
  const decipher = crypto.createDecipheriv("aes-256-gcm", derive(secret, salt), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(body), decipher.final()]);
}

module.exports = { backupKeyConfigured, encrypt, decrypt };
