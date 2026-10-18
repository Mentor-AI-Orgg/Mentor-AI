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

const SUNDAY = new Date('2026-10-18T16:30:00.000Z');
const SUNDAY_EARLY = new Date('2026-10-18T15:30:00.000Z');
const SUNDAY_LATER = new Date('2026-10-18T17:00:00.000Z');
const MONDAY = new Date('2026-10-19T16:30:00.000Z');

async function studentWithActivity(app) {
  const created = await registerGranted(app);
  const activity = await created.agent.post('/api/economy/activity').send({
    type: 'learn_module',
    meta: { chapterId: 'fractii', subject: 'matematica', grade: 5, minutes: 5 }
  });
  expect(activity.status).toBe(200);
  return created;
}

describe('plafonul rezumatului', () => {
  beforeEach(() => {
    mailBudget.resetForTests();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mailBudget.resetForTests();
  });

  it('nu trimite înainte de 19, apoi împarte restul pe zile fără dubluri', async () => {
    const { app } = createApp({ autosave: false });
    persistence.saveNow();
    expect(persistence.thisProcessWrites()).toBe(true);
    const first = await studentWithActivity(app);
    const second = await studentWithActivity(app);
    const early = await sendDueDigests(SUNDAY_EARLY, { budget: 1 });
    expect(early).toHaveLength(0);
    const sunday = await sendDueDigests(SUNDAY, { budget: 1 });
    expect(sunday).toHaveLength(1);
    const again = await sendDueDigests(SUNDAY_LATER, { budget: 1 });
    expect(again).toHaveLength(0);
    const monday = await sendDueDigests(MONDAY, { budget: 1 });
    expect(monday).toHaveLength(1);
    expect(monday[0].username).not.toBe(sunday[0].username);
    const names = [sunday[0].username, monday[0].username].sort();
    expect(names).toEqual([first.username, second.username].sort());
    const sentUser = economy.getUser(authStore.findByUsername(sunday[0].username).email);
    expect(sentUser.digestWeek).toBe('2026-10-18');
    expect(mailBudget.snapshot().digestSent).toBe(1);
    expect(mailBudget.bucharestMidnightAfter(SUNDAY)).toBe(Date.parse('2026-10-18T21:00:00.000Z'));
    const oldMarker = economy.getUser(authStore.findByUsername(second.username).email);
    oldMarker.digestWeek = "";
    oldMarker.digestSentOn = "2026-10-18";
    const repeat = await sendDueDigests(new Date("2026-10-20T16:30:00.000Z"), { budget: 5 });
    expect(repeat.map(row => row.username)).not.toContain(second.username);
  });

  it('la plafonul căsuței oprește lotul și lasă linkurile să încerce', async () => {
    const { app } = createApp({ autosave: false });
    persistence.saveNow();
    const created = [];
    for (let n = 0; n < 3; n += 1) created.push(await studentWithActivity(app));
    let calls = 0;
    vi.spyOn(deliver, 'deliverMessage').mockImplementation(async () => {
      calls += 1;
      if (calls === 2) return { mocked: false, delivered: false, quota: true, error: 'smtp_quota' };
      return { mocked: false, delivered: true, channel: 'email' };
    });
    const first = await sendDueDigests(SUNDAY, { budget: 10 });
    expect(first).toHaveLength(1);
    expect(calls).toBe(2);
    const later = await sendDueDigests(SUNDAY_LATER, { budget: 10 });
    expect(later).toHaveLength(0);
    expect(calls).toBe(2);
    const monday = await sendDueDigests(MONDAY, { budget: 10 });
    expect(monday.map(row => row.username)).not.toContain(first[0].username);
    expect(monday.length).toBe(2);
    expect(created).toHaveLength(3);
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

  it('un al doilea proces nu retrimite rezumatul', async () => {
    const { app } = createApp({ autosave: false });
    persistence.saveNow();
    await studentWithActivity(app);
    vi.spyOn(persistence, 'thisProcessWrites').mockReturnValue(false);
    const sent = await sendDueDigests(SUNDAY, { budget: 5 });
    expect(sent).toHaveLength(0);
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
      expect(mailBudget.quotaBlocked(SUNDAY_LATER)).toBe(true);
      expect(mailBudget.quotaBlocked(MONDAY)).toBe(false);
      expect(mailBudget.isQuotaError({ responseCode: 550, message: 'user unknown' })).toBe(false);
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
