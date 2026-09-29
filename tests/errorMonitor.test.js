import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

const nodeRequire = createRequire(import.meta.url);
const monitor = nodeRequire('../backend/src/ops/errorMonitor.js');
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
  });

  function arm() {
    spy = vi.spyOn(deliver, 'deliverMessage').mockResolvedValue({ delivered: true, mocked: true });
    monitor.resetAlerts();
    process.env.ADMIN_EMAIL = 'admin@example.com';
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

  it('respinge un raport din browser mai mare de 2 KB și ignoră câmpurile în plus', async () => {
    arm();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'clienterr-'));
    process.env.ERROR_LOG_DIR = dir;
    const { app } = createApp({ autosave: false });
    const huge = await request(app).post('/api/client-error').send({ message: 'x'.repeat(2100) });
    expect(huge.status).toBe(413);

    const ok = await request(app).post('/api/client-error').send({
      message: 'ecran gol',
      file: 'App.jsx',
      line: 4,
      email: 'copil@example.com',
      password: 'secret',
      url: 'https://suntde10.ro/reset?token=secret-token'
    });
    expect(ok.status).toBe(200);
    expect(ok.body.ok).toBe(true);
    const log = fs.readFileSync(path.join(dir, 'errors.log'), 'utf8');
    expect(log).not.toContain('ecran gol');
    expect(log).toContain('[redactat]');
    expect(log).toContain('App.jsx');
    expect(log).not.toContain('copil@example.com');
    expect(log).not.toContain('secret-token');
    expect(log).not.toContain('secret');
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
