import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const persistence = nodeRequire('../backend/src/data/persistence.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');
const memory = nodeRequire('../backend/src/memory/memoryStore.js');
const retention = nodeRequire('../backend/src/config/retention.js');

describe('persistență', () => {
  let lockChild = null;

  afterEach(() => {
    delete process.env.BACKUP_KEY;
    delete process.env.BACKUP_ROTATE_MS;
    persistence.flushDeferredBackup();
    if (lockChild && !lockChild.killed) lockChild.kill();
    lockChild = null;
  });

  it('scrie modificarea pe disc și păstrează contul', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    expect(created.res.status).toBe(201);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '6';
    const user = economy.ensureUser(account.email);
    user.xp = 42;

    const saved = persistence.saveNow();
    expect(saved.saved).toBe(true);

    const parsed = JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
    expect(parsed.collections.auth.accounts[account.email].profile.class).toBe('6');
    expect(parsed.collections.economy.users[account.email].xp).toBe(42);
    expect(parsed.collections.auth.accounts[account.email].profile.username).toBe(created.username);
  });

  it('scurtează memoria tutorului la încărcare și nu atinge contul sau progresul', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '7';
    const user = economy.ensureUser(account.email);
    user.xp = 17;
    expect(persistence.saveNow().saved).toBe(true);

    const oldId = `${account.email}::vechi`;
    const freshId = `${account.email}::nou`;
    const parsed = JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
    parsed.collections.memory[oldId] = [{
      role: 'user',
      content: 'text-vechi',
      timestamp: Date.now() - retention.TUTOR_MEMORY_MS - retention.DAY_MS,
      metadata: {}
    }];
    parsed.collections.memory[freshId] = [{
      role: 'user',
      content: 'text-nou',
      timestamp: Date.now(),
      metadata: {}
    }];
    fs.writeFileSync(persistence.DATA_FILE, JSON.stringify(parsed));

    const loaded = persistence.load();
    expect(loaded.loaded).toBe(true);
    expect(memory.get(oldId)).toEqual([]);
    expect(memory.get(freshId)[0].content).toBe('text-nou');
    expect(authStore.findByUsername(created.username).profile.class).toBe('7');
    expect(economy.getUser(account.email).xp).toBe(17);

    const saved = persistence.saveNow();
    expect(saved.saved).toBe(true);
    const again = JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
    expect(again.collections.memory[oldId]).toBeUndefined();
    expect(again.collections.memory[freshId][0].content).toBe('text-nou');
    expect(again.collections.auth.accounts[account.email].profile.class).toBe('7');
    expect(again.collections.auth.accounts[account.email].profile.username).toBe(created.username);
    expect(again.collections.economy.users[account.email].xp).toBe(17);
    expect(JSON.stringify(again.collections.memory)).not.toContain('text-vechi');
  });

  it('nu cifrează backup-ul pe calea de scriere', async () => {
    process.env.BACKUP_KEY = 'cheie-de-test-pentru-backup';
    process.env.BACKUP_ROTATE_MS = '0';
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    expect(persistence.saveNow().saved).toBe(true);
    account.profile.class = '8';
    expect(persistence.saveNow().saved).toBe(true);

    const encPath = `${persistence.DATA_FILE}.bak1.enc`;
    fs.rmSync(encPath, { force: true });
    expect(fs.existsSync(encPath)).toBe(false);
    const onDisk = JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
    expect(onDisk.collections.auth.accounts[account.email].profile.class).toBe('8');

    expect(persistence.flushDeferredBackup().flushed).toBe(true);
    expect(fs.existsSync(encPath)).toBe(true);
    const { decrypt } = nodeRequire('../backend/src/ops/backupCrypto.js');
    const opened = JSON.parse(decrypt(fs.readFileSync(encPath)).toString('utf8'));
    const backedUp = opened.collections.auth.accounts[account.email];
    expect(backedUp.profile.username).toBe(created.username);
    expect(backedUp.profile.class).not.toBe('8');
  });

  it('nu suprascrie fișierul cât timp alt proces ține lock-ul', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '5';
    expect(persistence.saveNow().saved).toBe(true);

    const child = spawn('sleep', ['30']);
    lockChild = child;
    fs.writeFileSync(persistence.LOCK_FILE, JSON.stringify({ pid: child.pid }));
    account.profile.class = '8';
    const blocked = persistence.saveNow();
    expect(blocked.saved).toBe(false);
    expect(blocked.reason).toBe('locked');
    const parsed = JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
    expect(parsed.collections.auth.accounts[account.email].profile.class).toBe('5');

    child.kill();
    await new Promise(resolve => child.on('exit', resolve));
    const saved = persistence.saveNow();
    expect(saved.saved).toBe(true);
    const after = JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
    expect(after.collections.auth.accounts[account.email].profile.class).toBe('8');
  });
});
