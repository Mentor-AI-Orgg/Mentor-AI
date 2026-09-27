import fs from 'node:fs';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const persistence = nodeRequire('../backend/src/data/persistence.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const { decrypt } = nodeRequire('../backend/src/ops/backupCrypto.js');

const KEY = 'cheie-de-test-pentru-backup';

describe('backup criptat', () => {
  afterEach(() => {
    delete process.env.BACKUP_KEY;
  });

  it('nu lasă numele în clar și poate restaura fișierul stricat', async () => {
    process.env.BACKUP_KEY = KEY;
    const { app } = createApp({ autosave: false });
    const username = 'zmeubackupqq';
    const created = await registerGranted(app, { username });
    expect(created.res.status).toBe(201);
    expect(persistence.saveNow().saved).toBe(true);
    authStore.findByUsername(username).profile.class = '8';
    expect(persistence.saveNow().saved).toBe(true);

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
});
