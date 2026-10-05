import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { generateKeyPairSync } from 'node:crypto';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const persistence = nodeRequire('../backend/src/data/persistence.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const { decrypt } = nodeRequire('../backend/src/ops/backupCrypto.js');
const backup = nodeRequire('../backend/src/ops/backup.js');

const KEY = 'cheie-de-test-pentru-backup';
const EMAIL = 'copil-secret@example.com';

function pair() {
  return generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
}

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 's10-backup-'));
}

describe('backup criptat', () => {
  afterEach(() => {
    delete process.env.BACKUP_KEY;
    delete process.env.BACKUP_ROTATE_MS;
  });

  it('nu lasă numele în clar și poate restaura fișierul stricat', async () => {
    process.env.BACKUP_KEY = KEY;
    process.env.BACKUP_ROTATE_MS = '0';
    const { app } = createApp({ autosave: false });
    const username = 'zmeubackupqq';
    const created = await registerGranted(app, { username });
    expect(created.res.status).toBe(201);
    expect(persistence.saveNow().saved).toBe(true);
    authStore.findByUsername(username).profile.class = '8';
    expect(persistence.saveNow().saved).toBe(true);
    fs.rmSync(`${persistence.DATA_FILE}.bak1.enc`, { force: true });
    expect(fs.existsSync(`${persistence.DATA_FILE}.bak1.enc`)).toBe(false);
    expect(persistence.flushDeferredBackup().flushed).toBe(true);

    const enc = fs.readFileSync(`${persistence.DATA_FILE}.bak1.enc`);
    expect(enc.subarray(0, 4).toString()).toBe('S10B');
    expect(enc.toString('utf8')).not.toContain(username);
    expect(decrypt(enc).toString('utf8')).toContain(username);

    process.env.BACKUP_KEY = 'alta-cheie-de-test-123';
    expect(() => decrypt(enc)).toThrow();
    process.env.BACKUP_KEY = KEY;

    fs.writeFileSync(persistence.DATA_FILE, '{', 'utf8');
    const restored = persistence.load();
    expect(restored.loaded).toBe(true);
    expect(restored.reason).toBe('backup');
    expect(authStore.findByUsername(username)).toBeTruthy();
  });

  it('închide și deschide copia zilnică, iar un octet schimbat o strică', () => {
    const keys = pair();
    const plain = Buffer.from(JSON.stringify({
      collections: { auth: { accounts: { [EMAIL]: { role: 'student' } } } }
    }));
    const packed = backup.encryptPayload(plain, keys.publicKey, '2026-09-29T03:30:00.000Z');
    expect(packed.bytes.toString('utf8')).not.toContain(EMAIL);
    const opened = backup.decryptPayload(packed.bytes, keys.privateKey);
    expect(opened.plain.equals(plain)).toBe(true);
    expect(opened.header.sha256).toBe(packed.sha256);

    const tampered = Buffer.from(packed.bytes);
    tampered[tampered.length - 8] ^= 0xff;
    expect(() => backup.decryptPayload(tampered, keys.privateKey)).toThrow();
  });

  it('păstrează 14 copii de zi și 4 de duminică', () => {
    const dir = tempDir();
    const sundays = [];
    const days = [];
    const cursor = new Date(Date.UTC(2024, 0, 1));
    while (sundays.length < 6 || days.length < 20) {
      const iso = cursor.toISOString().slice(0, 10);
      if (cursor.getUTCDay() === 0) sundays.push(iso);
      else days.push(iso);
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    for (const date of [...sundays, ...days]) {
      fs.writeFileSync(path.join(dir, `mentor-ai-${date}.json.gz.enc`), 'x');
    }
    const result = backup.rotateBackupFiles(dir);
    const left = fs.readdirSync(dir);
    const dateOf = name => name.match(/(\d{4}-\d{2}-\d{2})/)[1];
    const sundayLeft = left.filter(name => backup.isSunday(dateOf(name)));
    expect(left).toHaveLength(18);
    expect(sundayLeft).toHaveLength(4);
    expect(left.filter(name => !backup.isSunday(dateOf(name)))).toHaveLength(14);
    expect(result.removed.length).toBe(sundays.length + days.length - 18);
  });

  it('șterge conturile șterse după data copiei', () => {
    const gone = 'sters@example.com';
    const kept = 'ramas@example.com';
    const data = {
      collections: {
        auth: { accounts: { [gone]: { role: 'student' }, [kept]: { role: 'student' } } },
        economy: { users: { [gone]: { xp: 3 }, [kept]: { xp: 1 } } }
      }
    };
    const result = backup.applyDeletionRegistry(data, [
      { userIdHash: backup.emailHash(gone), at: '2026-09-29T12:00:00.000Z' },
      { userIdHash: backup.emailHash(kept), at: '2026-09-01T12:00:00.000Z' }
    ], '2026-09-28T03:30:00.000Z');
    expect(result.removed).toEqual([gone]);
    expect(result.data.collections.auth.accounts[gone]).toBeUndefined();
    expect(result.data.collections.auth.accounts[kept]).toBeTruthy();
    expect(result.data.collections.economy.users[gone]).toBeUndefined();
  });

  it('șterge copiile pre- mai vechi de 35 de zile și le lasă pe cele noi', () => {
    const dir = tempDir();
    const oldName = 'mentor-ai.json.pre-t1-vechi';
    const newName = 'mentor-ai.json.pre-t7-nou';
    fs.writeFileSync(path.join(dir, oldName), '{}');
    fs.writeFileSync(path.join(dir, newName), '{}');
    const old = new Date(Date.now() - backup.PRE_KEEP_MS - 60 * 1000);
    fs.utimesSync(path.join(dir, oldName), old, old);
    const removed = backup.purgePreCopies(dir);
    expect(removed).toEqual([oldName]);
    expect(fs.existsSync(path.join(dir, newName))).toBe(true);
    expect(fs.existsSync(path.join(dir, oldName))).toBe(false);
  });

  it('nu are o cheie privată în repo', () => {
    const skip = new Set(['node_modules', '.git', 'dist', 'coverage']);
    function walk(dir) {
      for (const name of fs.readdirSync(dir)) {
        if (skip.has(name)) continue;
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          walk(full);
          continue;
        }
        if (!name.endsWith('.pem') && !name.endsWith('.key')) continue;
        expect(fs.readFileSync(full, 'utf8')).not.toContain('PRIVATE KEY');
      }
    }
    walk(path.resolve('.'));
    const keygen = fs.readFileSync('scripts/backup-keygen.mjs', 'utf8');
    expect(keygen).toContain('4096');
    expect(keygen).toContain('backup-private.pem');
  });
});
