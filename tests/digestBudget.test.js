import { createRequire } from 'node:module';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const deliver = nodeRequire('../backend/src/notify/deliver.js');
const { sendDueDigests } = nodeRequire('../backend/src/notify/parentActivity.js');
const mailBudget = nodeRequire('../backend/src/notify/mailBudget.js');
const persistence = nodeRequire('../backend/src/data/persistence.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const errorMonitor = nodeRequire('../backend/src/ops/errorMonitor.js');
const nodemailer = nodeRequire('nodemailer');

const SUNDAY_EARLY = new Date('2026-10-18T15:30:00.000Z');
const SUNDAY = new Date('2026-10-18T16:30:00.000Z');
const SUNDAY_LATER = new Date('2026-10-18T17:00:00.000Z');
const MONDAY = new Date('2026-10-19T16:30:00.000Z');
const TUESDAY = new Date('2026-10-20T16:30:00.000Z');

const ACCEPTED = { mocked: false, delivered: true, channel: 'email' };

async function studentWithActivity(app) {
  const created = await registerGranted(app);
  const activity = await created.agent.post('/api/economy/activity').send({
    type: 'learn_module',
    meta: { chapterId: 'fractii', subject: 'matematica', grade: 5, minutes: 5 }
  });
  expect(activity.status).toBe(200);
  return created;
}

describe('rezumatul și plafonul căsuței', () => {
  beforeEach(() => {
    mailBudget.resetForTests();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mailBudget.resetForTests();
  });

  it('nu trimite înainte de 19 și nu repetă o trimitere reușită în aceeași săptămână', async () => {
    const { app } = createApp({ autosave: false });
    persistence.saveNow();
    expect(persistence.thisProcessWrites()).toBe(true);
    const first = await studentWithActivity(app);
    const second = await studentWithActivity(app);
    vi.spyOn(deliver, 'deliverMessage').mockResolvedValue(ACCEPTED);
    expect(await sendDueDigests(SUNDAY_EARLY)).toHaveLength(0);
    const wanted = new Set([first.username, second.username]);
    const sunday = (await sendDueDigests(SUNDAY)).filter(row => wanted.has(row.username));
    expect(sunday).toHaveLength(2);
    expect((await sendDueDigests(SUNDAY_LATER)).filter(row => wanted.has(row.username))).toHaveLength(0);
    const marked = economy.getUser(authStore.findByUsername(first.username).email);
    expect(marked.digestWeek).toBe('2026-10-18');
    expect(marked.digestSentOn).toBe('2026-10-18');
    marked.digestWeek = '';
    const repeat = await sendDueDigests(TUESDAY);
    expect(repeat.map(row => row.username)).not.toContain(first.username);
    expect(repeat.map(row => row.username)).not.toContain(second.username);
  });

  it('la refuzul căsuței oprește seara și reia a doua zi doar pe cine nu a primit', async () => {
    const { app } = createApp({ autosave: false });
    persistence.saveNow();
    const created = [];
    for (let n = 0; n < 3; n += 1) created.push(await studentWithActivity(app));
    const parents = new Set(created.map(row => row.parentEmail));
    const names = new Set(created.map(row => row.username));
    let calls = 0;
    vi.spyOn(deliver, 'deliverMessage').mockImplementation(async ({ to }) => {
      if (!parents.has(to)) return ACCEPTED;
      calls += 1;
      if (calls === 2) return { mocked: false, delivered: false, quota: true, error: 'smtp_quota' };
      return ACCEPTED;
    });
    const first = (await sendDueDigests(SUNDAY)).filter(row => names.has(row.username));
    expect(first).toHaveLength(1);
    expect(calls).toBe(2);
    expect((await sendDueDigests(SUNDAY_LATER)).filter(row => names.has(row.username))).toHaveLength(0);
    expect(calls).toBe(2);
    const monday = (await sendDueDigests(MONDAY)).filter(row => names.has(row.username));
    expect(monday).toHaveLength(2);
    expect(monday.map(row => row.username)).not.toContain(first[0].username);
    expect(created.map(row => row.username).sort()).toEqual(
      [first[0].username, ...monday.map(row => row.username)].sort()
    );
    vi.restoreAllMocks();
    mailBudget.noteQuota(SUNDAY);
    const magic = await deliver.deliverMessage({
      to: 'parinte@example.com',
      subject: 'Intrare',
      body: 'link',
      action: 'parent_magic'
    });
    expect(magic.mocked).toBe(true);
    expect(magic.quota).toBeUndefined();
  });

  it('un eșec care nu e plafon nu marchează trimis și se reia la tic-ul următor', async () => {
    const { app } = createApp({ autosave: false });
    persistence.saveNow();
    const created = await studentWithActivity(app);
    let calls = 0;
    vi.spyOn(deliver, 'deliverMessage').mockImplementation(async ({ to }) => {
      if (to !== created.parentEmail) return ACCEPTED;
      calls += 1;
      if (calls === 1) return { mocked: false, delivered: false, error: 'smtp_450' };
      return ACCEPTED;
    });
    expect((await sendDueDigests(SUNDAY)).filter(row => row.username === created.username)).toHaveLength(0);
    const again = (await sendDueDigests(SUNDAY_LATER)).filter(row => row.username === created.username);
    expect(again.map(row => row.username)).toEqual([created.username]);
    expect(economy.getUser(authStore.findByUsername(created.username).email).digestWeek).toBe('2026-10-18');
  });

  it('un al doilea proces nu retrimite rezumatul', async () => {
    const { app } = createApp({ autosave: false });
    persistence.saveNow();
    await studentWithActivity(app);
    vi.spyOn(deliver, 'deliverMessage').mockResolvedValue(ACCEPTED);
    vi.spyOn(persistence, 'thisProcessWrites').mockReturnValue(false);
    expect(await sendDueDigests(SUNDAY)).toHaveLength(0);
  });

  it('recunoaște plafonul SMTP și nu pornește alerta', async () => {
    const previous = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      from: process.env.SMTP_FROM
    };
    process.env.SMTP_HOST = '127.0.0.1';
    process.env.SMTP_PORT = '2525';
    process.env.SMTP_FROM = 'test@example.com';
    const alert = vi.spyOn(errorMonitor, 'noteSmtpFailure');
    vi.spyOn(nodemailer, 'createTransport').mockReturnValue({
      sendMail: async () => {
        const error = new Error('550 Your account has reached its sending limit');
        error.responseCode = 550;
        error.response = '550 Your account has reached its sending limit';
        throw error;
      },
      close() {}
    });
    try {
      const delivery = await deliver.sendEmail({
        to: 'parinte@example.com',
        subject: 'Rezumat',
        body: 'text',
        action: 'digest'
      });
      expect(delivery).toMatchObject({ delivered: false, quota: true, error: 'smtp_quota' });
      expect(alert).not.toHaveBeenCalled();
      const until = mailBudget.snapshot().quotaUntil;
      expect(until).toBe(mailBudget.bucharestMidnightAfter(new Date()));
      expect(mailBudget.quotaBlocked(new Date(until - 1000))).toBe(true);
      expect(mailBudget.quotaBlocked(new Date(until + 1000))).toBe(false);
      mailBudget.resetForTests();
      mailBudget.noteQuota(SUNDAY);
      expect(mailBudget.quotaBlocked(SUNDAY_LATER)).toBe(true);
      expect(mailBudget.quotaBlocked(MONDAY)).toBe(false);
      expect(mailBudget.isQuotaError({ responseCode: 550, message: 'user unknown' })).toBe(false);
      expect(mailBudget.bucharestMidnightAfter(SUNDAY)).toBe(Date.parse('2026-10-18T21:00:00.000Z'));
    } finally {
      if (previous.host == null) delete process.env.SMTP_HOST;
      else process.env.SMTP_HOST = previous.host;
      if (previous.port == null) delete process.env.SMTP_PORT;
      else process.env.SMTP_PORT = previous.port;
      if (previous.from == null) delete process.env.SMTP_FROM;
      else process.env.SMTP_FROM = previous.from;
    }
  });
});
