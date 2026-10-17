import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const persistence = nodeRequire('../backend/src/data/persistence.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const registry = nodeRequire('../backend/src/data/userDataRegistry.js');
const monitor = nodeRequire('../backend/src/ops/errorMonitor.js');
const deliver = nodeRequire('../backend/src/notify/deliver.js');

function readDisk() {
  return JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
}

function writeDisk(doc) {
  fs.writeFileSync(persistence.DATA_FILE, JSON.stringify(doc));
}

function addFakeStudents(doc, count) {
  const accounts = doc.collections.auth.accounts;
  const emails = [];
  for (let i = 0; i < count; i += 1) {
    const email = `extra.${i}.${Math.random().toString(16).slice(2)}@example.com`;
    accounts[email] = {
      email,
      role: 'student',
      profile: { username: `ex${i}${Math.random().toString(16).slice(2, 6)}` }
    };
    emails.push(email);
  }
  return emails;
}

describe('garda de scriere', () => {
  const previousAdmin = process.env.ADMIN_EMAIL;
  let snapshot = null;
  let lockChild = null;
  let mailSpy = null;

  beforeEach(() => {
    snapshot = fs.existsSync(persistence.DATA_FILE) ? fs.readFileSync(persistence.DATA_FILE) : null;
    mailSpy = vi.spyOn(deliver, 'deliverMessage').mockResolvedValue({ delivered: true, mocked: true });
    monitor.resetAlerts();
  });

  afterEach(() => {
    delete process.env.BACKUP_KEY;
    delete process.env.BACKUP_ROTATE_MS;
    delete process.env.PERSISTENCE_EXIT_ON_LOCK;
    if (previousAdmin === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = previousAdmin;
    persistence.flushDeferredBackup();
    if (lockChild && lockChild.exitCode == null && !lockChild.killed) lockChild.kill();
    lockChild = null;
    fs.rmSync(persistence.LOCK_FILE, { force: true });
    for (const n of [1, 2, 3]) {
      fs.rmSync(`${persistence.DATA_FILE}.bak${n}`, { force: true });
      fs.rmSync(`${persistence.DATA_FILE}.bak${n}.enc`, { force: true });
    }
    persistence.resumeWriter();
    if (snapshot) {
      fs.writeFileSync(persistence.DATA_FILE, snapshot);
      persistence.load();
    }
    snapshot = null;
    if (mailSpy) mailSpy.mockRestore();
    monitor.resetAlerts();
  });

  it('pune revizie, savedAt și instanță în fișier și în lock', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '6';
    const before = persistence.writerStatus().revision;
    const saved = persistence.saveNow();
    expect(saved.saved).toBe(true);
    expect(saved.revision).toBe(before + 1);

    const disk = readDisk();
    expect(disk.revision).toBe(saved.revision);
    expect(disk.instanceId).toBe(persistence.writerStatus().instanceId);
    expect(disk.savedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(disk.collections.auth.accounts[account.email].profile.class).toBe('6');

    const lock = JSON.parse(fs.readFileSync(persistence.LOCK_FILE, 'utf8'));
    expect(lock.pid).toBe(process.pid);
    expect(lock.instanceId).toBe(disk.instanceId);
    expect(Number.isFinite(Date.parse(lock.heartbeat))).toBe(true);

    expect(persistence.saveNow().reason).toBe('unchanged');
    expect(readDisk().revision).toBe(saved.revision);
  });

  it('refuză scrierea unui proces rămas în urmă și alertează o singură dată', async () => {
    process.env.ADMIN_EMAIL = 'admin@example.com';
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '5';
    expect(persistence.saveNow().saved).toBe(true);

    const disk = readDisk();
    disk.revision += 5;
    disk.collections.auth.accounts[account.email].profile.class = '5';
    writeDisk(disk);
    account.profile.class = '8';

    const refused = persistence.saveNow();
    expect(refused.saved).toBe(false);
    expect(refused.reason).toBe('stale_revision');
    expect(refused.stopped).toBe(true);
    expect(persistence.writerStatus().exitRequested).toBe(true);
    expect(persistence.writerStatus().stopped).toBe(true);

    const kept = readDisk();
    expect(kept.revision).toBe(disk.revision);
    expect(kept.collections.auth.accounts[account.email].profile.class).toBe('5');

    expect(persistence.saveNow().reason).toBe('stopped');
    expect(mailSpy).toHaveBeenCalledTimes(1);
    const alert = mailSpy.mock.calls[0][0];
    expect(alert.body).toContain('stale_revision');
    expect(JSON.stringify(alert)).not.toContain(account.email);
    expect(JSON.stringify(alert)).not.toContain(created.username);
  });

  it('refuză fișierul scris de alt proces după încărcare, chiar la aceeași revizie', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '5';
    expect(persistence.saveNow().saved).toBe(true);

    const disk = readDisk();
    disk.instanceId = 'proces-strain';
    disk.collections.auth.accounts[account.email].profile.class = '5';
    writeDisk(disk);
    account.profile.class = '7';

    const refused = persistence.saveNow();
    expect(refused.reason).toBe('foreign_instance');
    expect(refused.stopped).toBe(true);
    expect(readDisk().collections.auth.accounts[account.email].profile.class).toBe('5');
    expect(readDisk().instanceId).toBe('proces-strain');
    expect(persistence.saveNow().reason).toBe('stopped');
  });

  it('refuză un fișier ilizibil în loc să îl acopere', () => {
    if (!fs.existsSync(persistence.DATA_FILE)) {
      fs.writeFileSync(persistence.DATA_FILE, JSON.stringify({ version: 1, revision: 1, collections: { auth: { accounts: {} } } }));
      persistence.load();
    }
    fs.writeFileSync(persistence.DATA_FILE, '{', 'utf8');
    const refused = persistence.saveNow();
    expect(refused.reason).toBe('unreadable');
    expect(refused.stopped).toBe(true);
    expect(fs.readFileSync(persistence.DATA_FILE, 'utf8')).toBe('{');
  });

  it('refuză scăderea neanunțată a conturilor', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '6';
    expect(persistence.saveNow().saved).toBe(true);

    const disk = readDisk();
    const extras = addFakeStudents(disk, 6);
    disk.collections.auth.accounts[account.email].profile.class = '6';
    writeDisk(disk);
    account.profile.class = '8';

    const refused = persistence.saveNow();
    expect(refused.reason).toBe('shrink');
    expect(refused.stopped).toBe(true);
    const kept = readDisk();
    expect(kept.collections.auth.accounts[account.email].profile.class).toBe('6');
    expect(kept.collections.auth.accounts[extras[0]]).toBeTruthy();
    expect(persistence.saveNow().reason).toBe('stopped');
  });

  it('refuză și o scădere mică, dacă trece de 2%', async () => {
    const { app } = createApp({ autosave: false });
    await registerGranted(app);
    expect(persistence.saveNow().saved || persistence.saveNow().reason === 'unchanged').toBe(true);

    const disk = readDisk();
    const accounts = {};
    for (let i = 0; i < 10; i += 1) {
      const email = `ratio${i}@example.com`;
      accounts[email] = { email, role: 'student', profile: { username: `rt${i}aa` } };
    }
    disk.collections.auth.accounts = accounts;
    writeDisk(disk);
    persistence.load();

    const doc = JSON.parse(persistence.exportJson());
    const victim = 'ratio0@example.com';
    delete doc.collections.auth.accounts[victim];
    const refused = persistence.importDocument(doc);
    expect(refused.saved).toBe(false);
    expect(refused.reason).toBe('shrink');
    expect(readDisk().collections.auth.accounts[victim].role).toBe('student');
  });

  it('lasă ștergerea anunțată să scadă conturile', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    expect(persistence.saveNow().saved).toBe(true);

    const disk = readDisk();
    const extras = addFakeStudents(disk, 8);
    writeDisk(disk);
    persistence.resumeWriter();
    persistence.load();
    for (const email of extras) authStore.deleteAccount(email);
    const saved = persistence.saveNow();
    expect(saved.saved).toBe(true);
    const after = readDisk();
    for (const email of extras) expect(after.collections.auth.accounts[email]).toBeUndefined();
    expect(after.collections.auth.accounts[account.email]).toBeTruthy();

    registry.eraseAll(account.email);
    const parent = authStore.findAccount(created.parentEmail);
    if (parent && parent.role === 'parent' && !(parent.children || []).length) {
      registry.eraseAll(created.parentEmail);
    }
    const erased = persistence.saveNow();
    expect(erased.saved).toBe(true);
    expect(readDisk().collections.auth.accounts[account.email]).toBeUndefined();
  });

  it('nu rotește bak-ul peste o copie cu mai multe conturi', async () => {
    process.env.BACKUP_ROTATE_MS = '0';
    delete process.env.BACKUP_KEY;
    for (const n of [1, 2, 3]) {
      fs.rmSync(`${persistence.DATA_FILE}.bak${n}`, { force: true });
      fs.rmSync(`${persistence.DATA_FILE}.bak${n}.enc`, { force: true });
    }
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    expect(persistence.saveNow().saved).toBe(true);
    account.profile.class = '6';
    expect(persistence.saveNow().saved).toBe(true);
    expect(persistence.flushDeferredBackup().flushed).toBe(true);

    const bakPath = `${persistence.DATA_FILE}.bak1`;
    const bak = JSON.parse(fs.readFileSync(bakPath, 'utf8'));
    const marker = 'bak-mare@example.com';
    bak.collections.auth.accounts[marker] = {
      email: marker,
      role: 'student',
      profile: { username: 'bakmare' }
    };
    fs.writeFileSync(bakPath, JSON.stringify(bak));

    account.profile.class = '7';
    expect(persistence.saveNow().saved).toBe(true);
    expect(persistence.flushDeferredBackup().flushed).toBe(false);
    expect(JSON.parse(fs.readFileSync(bakPath, 'utf8')).collections.auth.accounts[marker].role).toBe('student');

    for (const n of [1, 2, 3]) fs.rmSync(`${persistence.DATA_FILE}.bak${n}`, { force: true });
    account.profile.class = '8';
    expect(persistence.saveNow().saved).toBe(true);
    expect(persistence.flushDeferredBackup().flushed).toBe(true);
    expect(fs.existsSync(bakPath)).toBe(true);
  });

  it('păstrează copia zilnică pre-t1', () => {
    const source = fs.readFileSync(path.join(root, 'backend/src/app.js'), 'utf8');
    expect(source).toContain('pre-t1-');
  });

  it('nu preia lock-ul cât timp pulsul e proaspăt, chiar dacă procesul e mort', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '5';
    expect(persistence.saveNow().saved).toBe(true);

    const child = spawn('sleep', ['30']);
    lockChild = child;
    await new Promise((resolve, reject) => {
      child.once('error', reject);
      child.once('spawn', resolve);
    });
    child.kill();
    await new Promise(resolve => child.once('exit', resolve));
    lockChild = null;

    fs.writeFileSync(persistence.LOCK_FILE, JSON.stringify({
      pid: child.pid,
      instanceId: 'vechi',
      heartbeat: new Date().toISOString(),
      at: new Date().toISOString()
    }));
    account.profile.class = '8';
    const blocked = persistence.saveNow();
    expect(blocked.saved).toBe(false);
    expect(blocked.reason).toBe('locked');
    expect(blocked.stopped).toBeUndefined();
    expect(readDisk().collections.auth.accounts[account.email].profile.class).toBe('5');

    fs.writeFileSync(persistence.LOCK_FILE, JSON.stringify({
      pid: child.pid,
      instanceId: 'vechi',
      heartbeat: new Date(Date.now() - 60 * 1000).toISOString(),
      at: new Date(Date.now() - 60 * 1000).toISOString()
    }));
    const saved = persistence.saveNow();
    expect(saved.saved).toBe(true);
    expect(readDisk().collections.auth.accounts[account.email].profile.class).toBe('8');
  });

  it('al doilea proces care nu ia lock-ul nu scrie și se oprește', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '5';
    expect(persistence.saveNow().saved).toBe(true);
    const before = fs.readFileSync(persistence.DATA_FILE);

    fs.writeFileSync(persistence.LOCK_FILE, JSON.stringify({
      pid: process.pid,
      instanceId: 'titular',
      heartbeat: new Date().toISOString(),
      at: new Date().toISOString()
    }));

    const stores = path.join(root, 'backend/src/data/loadUserStores.js');
    const persistencePath = path.join(root, 'backend/src/data/persistence.js');
    const resultPath = path.join(persistence.DATA_DIR, 'second-writer-result.json');
    fs.rmSync(resultPath, { force: true });
    const script = `
      delete process.env.VITEST;
      process.env.NODE_ENV = 'production';
      process.env.PERSISTENCE_EXIT_ON_LOCK = '1';
      process.env.STORE = 'json';
      process.env.ADMIN_EMAIL = '';
      const fs = require('fs');
      require(${JSON.stringify(stores)});
      const persistence = require(${JSON.stringify(persistencePath)});
      persistence.load();
      const result = persistence.saveNow();
      fs.writeFileSync(${JSON.stringify(resultPath)}, JSON.stringify({
        saved: result.saved,
        reason: result.reason,
        stopped: Boolean(result.stopped)
      }));
      process.exit(result && result.stopped ? 1 : 0);
    `;
    const env = { ...process.env, NODE_ENV: 'production', STORE: 'json', ADMIN_EMAIL: '', ERROR_LOG_DIR: persistence.DATA_DIR };
    delete env.VITEST;
    const child = spawnSync(process.execPath, ['-e', script], {
      env,
      encoding: 'utf8',
      timeout: 60000
    });
    expect(child.status, child.stderr || child.stdout || '').toBe(1);
    const reported = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
    expect(reported).toMatchObject({ saved: false, reason: 'second_instance', stopped: true });
    expect(fs.readFileSync(persistence.DATA_FILE).equals(before)).toBe(true);
    expect(readDisk().collections.auth.accounts[account.email].profile.class).toBe('5');
  });

  it('în teste, lock-ul străin nu oprește definitiv scrierea', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.profile.class = '5';
    expect(persistence.saveNow().saved).toBe(true);

    const child = spawn('sleep', ['30']);
    lockChild = child;
    await new Promise(resolve => child.once('spawn', resolve));
    fs.writeFileSync(persistence.LOCK_FILE, JSON.stringify({ pid: child.pid }));
    account.profile.class = '8';
    const blocked = persistence.saveNow();
    expect(blocked.reason).toBe('locked');
    expect(persistence.writerStatus().stopped).toBe(false);

    process.env.PERSISTENCE_EXIT_ON_LOCK = '1';
    const stopped = persistence.saveNow();
    expect(stopped.reason).toBe('second_instance');
    expect(stopped.stopped).toBe(true);
    expect(readDisk().collections.auth.accounts[account.email].profile.class).toBe('5');
    expect(persistence.saveNow().reason).toBe('stopped');

    delete process.env.PERSISTENCE_EXIT_ON_LOCK;
    persistence.resumeWriter();
    child.kill();
    await new Promise(resolve => child.once('exit', resolve));
    lockChild = null;
    fs.rmSync(persistence.LOCK_FILE, { force: true });
    const saved = persistence.saveNow();
    expect(saved.saved).toBe(true);
    expect(readDisk().collections.auth.accounts[account.email].profile.class).toBe('8');
  });
});
