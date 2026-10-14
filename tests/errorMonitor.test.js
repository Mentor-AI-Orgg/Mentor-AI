import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

const nodeRequire = createRequire(import.meta.url);
const monitor = nodeRequire('../backend/src/ops/errorMonitor.js');
const assets = nodeRequire('../backend/src/ops/assetManifest.js');
const deliver = nodeRequire('../backend/src/notify/deliver.js');

describe('jurnal de erori și deploy', () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    SITE_PUBLIC: process.env.SITE_PUBLIC,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ERROR_LOG_DIR: process.env.ERROR_LOG_DIR
  };
  let spy;

  afterEach(() => {
    if (spy) spy.mockRestore();
    monitor.resetAlerts();
    process.env.NODE_ENV = previous.NODE_ENV;
    if (previous.SITE_PUBLIC === undefined) delete process.env.SITE_PUBLIC;
    else process.env.SITE_PUBLIC = previous.SITE_PUBLIC;
    if (previous.ADMIN_EMAIL === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = previous.ADMIN_EMAIL;
    if (previous.ERROR_LOG_DIR === undefined) delete process.env.ERROR_LOG_DIR;
    else process.env.ERROR_LOG_DIR = previous.ERROR_LOG_DIR;
    assets.setAssetManifestForTests(undefined);
  });

  function arm() {
    spy = vi.spyOn(deliver, 'deliverMessage').mockResolvedValue({ delivered: true, mocked: true });
    monitor.resetAlerts();
    process.env.ADMIN_EMAIL = 'admin@example.com';
    assets.setAssetManifestForTests({ files: ['index-abc.js'] });
  }

  it('limitează alertele la un tip pe oră și la 10 pe zi', async () => {
    arm();
    const start = Date.parse('2026-09-27T08:00:00Z');
    await monitor.noteIncident({ type: 'TypeError', id: 'id1', now: start });
    await monitor.noteIncident({ type: 'TypeError', id: 'id2', now: start + 1000 });
    expect(spy).toHaveBeenCalledTimes(1);
    const body = spy.mock.calls[0][0].body;
    expect(body).toContain('Tip: TypeError');
    expect(body).toContain('Apariții: 1');
    expect(body).toContain('Id: id1');
    expect(body).not.toContain('copil@example.com');
    await monitor.noteIncident({ type: 'TypeError', id: 'id3', now: start + monitor.HOUR_MS + 1 });
    expect(spy).toHaveBeenCalledTimes(2);

    monitor.resetAlerts();
    spy.mockClear();
    for (let i = 0; i < monitor.DAY_ALERTS; i += 1) {
      await monitor.noteIncident({ type: `E${i}`, id: `i${i}`, now: start });
    }
    expect(spy).toHaveBeenCalledTimes(monitor.DAY_ALERTS);
    await monitor.noteIncident({ type: 'E-overflow', id: 'overflow', now: start });
    expect(spy).toHaveBeenCalledTimes(monitor.DAY_ALERTS);
  });

  it('anunță SMTP după 3 eșecuri și backup-ul mai vechi de 26 de ore', async () => {
    arm();
    await monitor.noteSmtpFailure();
    await monitor.noteSmtpFailure();
    expect(spy).not.toHaveBeenCalled();
    await monitor.noteSmtpFailure();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].body).toContain('smtp_failed');
    await monitor.noteSmtpFailure();
    expect(spy).toHaveBeenCalledTimes(1);

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bak-'));
    const dataFile = path.join(dir, 'mentor-ai.json');
    const bak = `${dataFile}.bak1.enc`;
    fs.writeFileSync(bak, 'x');
    const old = new Date(Date.now() - monitor.BACKUP_STALE_MS - 60 * 1000);
    fs.utimesSync(bak, old, old);
    spy.mockClear();
    monitor.resetAlerts();
    await monitor.checkBackupAge({ dataFile, now: Date.now() });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].body).toContain('backup_stale');
    fs.utimesSync(bak, new Date(), new Date());
    spy.mockClear();
    monitor.resetAlerts();
    await monitor.checkBackupAge({ dataFile, now: Date.now() });
    expect(spy).not.toHaveBeenCalled();
  });

  it('răspunde cu id, fără stack, și nu scrie emailul în jurnal', async () => {
    arm();
    delete process.env.ADMIN_EMAIL;
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'errlog-'));
    process.env.ERROR_LOG_DIR = dir;
    process.env.NODE_ENV = 'production';
    process.env.SITE_PUBLIC = '1';
    const { app } = createApp({ autosave: false, probeErrors: true });
    const res = await request(app)
      .post('/api/__boom?email=copil@example.com')
      .send({ email: 'copil@example.com', password: 'secret' });
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('server_error');
    expect(res.body.id).toMatch(/^[0-9a-f]{8}$/);
    expect(res.body.stack).toBeUndefined();
    expect(JSON.stringify(res.body)).not.toContain('secret');
    expect(JSON.stringify(res.body)).not.toContain('copil@example.com');
    const log = fs.readFileSync(path.join(dir, 'errors.log'), 'utf8');
    expect(log).toContain(res.body.id);
    expect(log).toContain('/api/__boom');
    expect(log).not.toContain('copil@example.com');
    expect(log).not.toContain('secret');
    expect(log).not.toContain('?');
  });

  it('păstrează mesajul din browser, fără email, token sau UA brut', async () => {
    arm();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'clienterr-'));
    process.env.ERROR_LOG_DIR = dir;
    const { app } = createApp({ autosave: false });
    const huge = await request(app)
      .post('/api/client-error')
      .send({ message: 'x'.repeat(2100) });
    expect(huge.status).toBe(413);

    const stack = [
      'NotFoundError: removeChild copil@example.com',
      '    at commitDeletion (https://suntde10.ro/assets/index-5tdgxzoN.js:41:120)',
      '    at commitMutationEffects (https://suntde10.ro/assets/index-5tdgxzoN.js:39:80)',
      '    at f1 (https://suntde10.ro/assets/index-5tdgxzoN.js:10:1)',
      '    at f2 (https://suntde10.ro/assets/index-5tdgxzoN.js:11:1)',
      '    at f3 (https://suntde10.ro/assets/index-5tdgxzoN.js:12:1)',
      '    at f4 (https://suntde10.ro/assets/index-5tdgxzoN.js:13:1)',
      '    at f5 (https://suntde10.ro/assets/index-5tdgxzoN.js:14:1)'
    ].join('\n');
    const ok = await request(app).post('/api/client-error').send({
      message:
        'removeChild copil@example.com token=secret-token ababababababababababababababababababab password=hunter2',
      name: 'NotFoundError',
      file: 'https://suntde10.ro/assets/index-5tdgxzoN.js?token=secret-token',
      line: 41,
      column: 120,
      stack,
      hash: '#/parola/super-secret-token',
      ua: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36 [FBAN/FB4A;FBAV/1.0]',
      email: 'copil@example.com',
      password: 'secret',
      url: 'https://suntde10.ro/reset?token=secret-token'
    });
    expect(ok.status).toBe(200);
    expect(ok.body.ok).toBe(true);
    const again = await request(app).post('/api/client-error').send({
      message:
        'removeChild copil@example.com token=secret-token ababababababababababababababababababab password=hunter2',
      name: 'NotFoundError',
      file: 'index-5tdgxzoN.js',
      line: 39,
      column: 8
    });
    expect(again.status).toBe(200);

    const lines = fs.readFileSync(path.join(dir, 'errors.log'), 'utf8').trim().split('\n');
    expect(lines).toHaveLength(1);
    const entry = JSON.parse(lines[0]);
    expect(entry.message).toContain('removeChild');
    expect(entry.message).toContain('[email]');
    expect(entry.message).toContain('token=[redactat]');
    expect(entry.message).toContain('[hex]');
    expect(entry.message).toContain('password=[redactat]');
    expect(entry.name).toBe('NotFoundError');
    expect(entry.file).toBe('index-5tdgxzoN.js');
    expect(entry.line).toBe(41);
    expect(entry.column).toBe(120);
    expect(entry.hash).toBe('#/parola/[redactat]');
    expect(entry.ua).toBe('chrome+inapp');
    expect(entry.stack.split('\n')).toHaveLength(5);
    expect(entry.stack).toContain('index-5tdgxzoN.js:41:120');
    expect(entry.stack).not.toContain('f5');
    expect(entry.code).toBe('client_error');
    expect(entry.stale).toBe(true);
    expect(entry.foreign).toBeUndefined();
    expect(spy).not.toHaveBeenCalled();
    const log = lines[0];
    expect(log).not.toContain('copil@example.com');
    expect(log).not.toContain('secret-token');
    expect(log).not.toContain('hunter2');
    expect(log).not.toContain('Mozilla');
    expect(log).not.toContain('FBAN');
    expect(log).not.toContain('https://');
  });

  it('nu numără de două ori același raport din browser, în aceeași secundă', async () => {
    arm();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'clientdup-'));
    process.env.ERROR_LOG_DIR = dir;
    const start = Date.parse('2026-10-12T00:07:00Z');
    await monitor.reportClientError(
      {
        message: 'ecran gol',
        file: 'index-abc.js',
        line: 39
      },
      start
    );
    await monitor.reportClientError(
      {
        message: 'ecran gol',
        file: 'index-abc.js',
        line: 41
      },
      start + 1
    );
    expect(fs.readFileSync(path.join(dir, 'errors.log'), 'utf8').trim().split('\n')).toHaveLength(
      1
    );
    const saved = JSON.parse(fs.readFileSync(path.join(dir, 'alert-state.json'), 'utf8'));
    expect(saved.types.client_error.count).toBe(1);
    await monitor.reportClientError(
      {
        message: 'ecran gol',
        file: 'index-abc.js',
        line: 41
      },
      start + monitor.CLIENT_DEDUPE_MS + 1
    );
    expect(fs.readFileSync(path.join(dir, 'errors.log'), 'utf8').trim().split('\n')).toHaveLength(
      2
    );
    expect(spy.mock.calls[0][0].body).not.toContain('ecran gol');
  });

  it('scrie Script error. în jurnal și nu trimite email, apoi anunță eroarea reală', async () => {
    arm();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'opaque-'));
    process.env.ERROR_LOG_DIR = dir;
    const start = Date.parse('2026-10-14T06:00:00Z');
    const opaque = await monitor.reportClientError(
      {
        name: 'Error',
        message: 'Script error.',
        file: '',
        line: 0,
        column: 0,
        stack: '',
        hash: '#/lectii/matematica/5',
        ua: 'chrome+inapp'
      },
      start
    );
    expect(opaque).toEqual({ sent: false, reason: 'opaque' });
    const blank = await monitor.reportClientError(
      {
        message: '',
        file: '',
        line: 0,
        stack: '',
        hash: '#/start',
        ua: 'safari'
      },
      start + 5000
    );
    expect(blank).toEqual({ sent: false, reason: 'opaque' });
    expect(spy).not.toHaveBeenCalled();

    const real = await monitor.reportClientError(
      {
        message: 'ecran gol',
        name: 'TypeError',
        file: 'index-abc.js',
        line: 12,
        column: 3,
        stack: '    at render (index-abc.js:12:3)',
        hash: '#/cont'
      },
      start + 6000
    );
    expect(real.sent).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].body).toContain('client_error');
    expect(spy.mock.calls[0][0].body).not.toContain('Script error.');

    const lines = fs
      .readFileSync(path.join(dir, 'errors.log'), 'utf8')
      .trim()
      .split('\n')
      .map((row) => JSON.parse(row));
    expect(lines.filter((row) => row.opaque).map((row) => row.message)).toEqual([
      'Script error.',
      ''
    ]);
    expect(lines.find((row) => row.message === 'Script error.').hash).toBe('#/lectii/matematica/5');
    expect(lines.find((row) => row.message === 'ecran gol').opaque).toBeUndefined();
    expect(lines.find((row) => row.message === 'ecran gol').foreign).toBeUndefined();
    expect(lines.find((row) => row.message === 'ecran gol').stale).toBeUndefined();
    expect(lines.find((row) => row.message === 'ecran gol').file).toBe('index-abc.js');
  });

  it('jurnalizează scriptul străin și bundle-ul vechi, apoi anunță doar build-ul curent', async () => {
    arm();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'origin-'));
    process.env.ERROR_LOG_DIR = dir;
    const start = Date.parse('2026-10-14T08:00:00Z');
    const foreign = await monitor.reportClientError(
      {
        message: 'script injectat',
        name: 'Error',
        file: 'browser_declutter',
        line: 1,
        stack: '',
        hash: '#/acasa'
      },
      start
    );
    expect(foreign).toEqual({ sent: false, reason: 'foreign' });
    const extension = await monitor.reportClientError(
      {
        message: 'extensie',
        file: 'chrome-extension://abcd/content.js',
        line: 2
      },
      start + 1000
    );
    expect(extension).toEqual({ sent: false, reason: 'foreign' });
    const stale = await monitor.reportClientError(
      {
        message: 'bundle vechi',
        file: 'https://suntde10.ro/assets/index-5tdgxzoN.js',
        line: 41,
        stack: '    at commitDeletion (https://suntde10.ro/assets/index-5tdgxzoN.js:41:120)'
      },
      start + 2000
    );
    expect(stale).toEqual({ sent: false, reason: 'stale' });
    const oldTab = await monitor.reportClientError(
      {
        message: 'tab vechi',
        file: 'index-abc.js',
        line: 4,
        stack: '    at render (index-abc.js:4:1)',
        build: 'oldbuild99'
      },
      start + 3000
    );
    expect(oldTab).toEqual({ sent: false, reason: 'stale' });
    expect(spy).not.toHaveBeenCalled();

    const current = await monitor.reportClientError(
      {
        message: 'ecran gol',
        name: 'TypeError',
        file: 'index-abc.js',
        line: 12,
        stack: '    at render (index-abc.js:12:3)',
        build: 'dev'
      },
      start + 4000
    );
    expect(current.sent).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].body).toContain('client_error');
    expect(spy.mock.calls[0][0].body).not.toContain('browser_declutter');
    expect(spy.mock.calls[0][0].body).not.toContain('index-5tdgxzoN.js');

    const lines = fs
      .readFileSync(path.join(dir, 'errors.log'), 'utf8')
      .trim()
      .split('\n')
      .map((row) => JSON.parse(row));
    expect(lines.find((row) => row.file === 'browser_declutter')).toMatchObject({
      foreign: true,
      message: 'script injectat'
    });
    expect(lines.find((row) => row.file === 'content.js').foreign).toBe(true);
    expect(lines.find((row) => row.file === 'index-5tdgxzoN.js')).toMatchObject({
      stale: true,
      message: 'bundle vechi'
    });
    expect(lines.find((row) => row.message === 'tab vechi')).toMatchObject({
      stale: true,
      build: 'oldbuild99',
      file: 'index-abc.js'
    });
    const live = lines.find((row) => row.message === 'ecran gol');
    expect(live.foreign).toBeUndefined();
    expect(live.stale).toBeUndefined();
    expect(live.build).toBe('dev');
    expect(
      JSON.parse(fs.readFileSync(path.join(dir, 'alert-state.json'), 'utf8')).types.client_error
        .count
    ).toBe(1);
  });

  it('anunță o dată când aceeași eroare se repetă, apoi tace', async () => {
    arm();
    const start = Date.parse('2026-09-27T08:00:00Z');
    await monitor.noteIncident({ type: 'health_save_failed', id: 's0', now: start });
    expect(spy).toHaveBeenCalledTimes(1);
    for (let i = 2; i < monitor.REPEAT_AT; i += 1) {
      await monitor.noteIncident({ type: 'health_save_failed', id: `s${i}`, now: start + i });
    }
    expect(spy).toHaveBeenCalledTimes(1);
    await monitor.noteIncident({ type: 'health_save_failed', id: 'repeat', now: start + 50 });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[1][0].body).toContain(`Apariții: ${monitor.REPEAT_AT}`);
    await monitor.noteIncident({ type: 'health_save_failed', id: 'more', now: start + 60 });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('nu retrimite alerta de cădere după restart, în aceeași oră', async () => {
    arm();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'alert-'));
    process.env.ERROR_LOG_DIR = dir;
    process.env.NODE_ENV = 'production';
    const start = Date.parse('2026-09-27T08:00:00Z');
    await monitor.noteIncident({ type: 'uncaught_exception', id: 'c1', now: start });
    expect(spy).toHaveBeenCalledTimes(1);
    const saved = fs.readFileSync(path.join(dir, 'alert-state.json'), 'utf8');
    monitor.resetAlerts();
    fs.writeFileSync(path.join(dir, 'alert-state.json'), saved);
    spy.mockClear();
    await monitor.noteIncident({ type: 'uncaught_exception', id: 'c2', now: start + 1000 });
    expect(spy).not.toHaveBeenCalled();
  });

  it('anunță salvarea eșuată ca problemă de sănătate', async () => {
    arm();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'savefail-'));
    process.env.ERROR_LOG_DIR = dir;
    await monitor.noteSaveFailure(new Error('disc plin'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].body).toContain('health_save_failed');
    expect(spy.mock.calls[0][0].body).not.toContain('disc plin');
    const log = fs.readFileSync(path.join(dir, 'errors.log'), 'utf8');
    expect(log).toContain('health_save_failed');
    expect(log).toContain('persistence.save');
  });

  it('pornește deploy-ul doar după CI reușit', () => {
    spy = vi.spyOn(deliver, 'deliverMessage');
    const yml = fs.readFileSync(path.join(__dirname, '../.github/workflows/deploy.yml'), 'utf8');
    expect(yml).toContain('workflow_run');
    expect(yml).toContain("conclusion == 'success'");
    expect(yml).toContain('workflow_dispatch');
    expect(yml).not.toMatch(/push:\s*\n\s*branches:\s*\[main\]/);
    expect(yml).toContain('data/**');
    expect(yml).toContain('scripts/**');
    expect(yml).toContain('tests/**');
    expect(yml).toContain('*.md');
  });
});
