import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted, uniqueEmail } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const deliver = nodeRequire('../backend/src/notify/deliver.js');
const { sendDueDigests } = nodeRequire('../backend/src/notify/parentActivity.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

describe('emailuri către părinte', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('nu trimite email la un mesaj de criză', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const spy = vi.spyOn(deliver, 'deliverMessage');
    const res = await created.agent.post('/api/chat').send({ message: 'sunt abuzat' });
    expect(res.status).toBe(200);
    expect(res.body.response).toContain('116 111');
    expect(spy).not.toHaveBeenCalled();
  });

  it('nu trimite email la logare și nici la mesajele către tutore', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const spy = vi.spyOn(deliver, 'deliverMessage');
    const login = await created.agent.post('/api/auth/login').send({
      email: created.username,
      password: 'Testpass1!'
    });
    expect(login.status).toBe(200);
    for (let n = 0; n < 10; n += 1) {
      const chat = await created.agent.post('/api/chat').send({ message: `întrebarea ${n} despre fracții` });
      expect(chat.status).toBe(200);
    }
    expect(spy).not.toHaveBeenCalled();
  });

  it('trimite un singur rezumat pe zi, fără textul copilului și fără note', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const phrase = `fraza-unica-${Date.now()}-copil`;
    await created.agent.post('/api/chat').send({ message: phrase });
    const activity = await created.agent.post('/api/economy/activity').send({
      type: 'chapter_test',
      note: phrase,
      meta: {
        chapterId: 'fractii',
        subject: 'matematica',
        grade: 5,
        correct: 8,
        total: 10,
        minutes: 25
      }
    });
    expect(activity.status).toBe(200);
    const spy = vi.spyOn(deliver, 'deliverMessage');
    const first = await sendDueDigests(new Date(), { force: true });
    const second = await sendDueDigests(new Date(), { force: true });
    expect(first).toHaveLength(1);
    expect(second).toHaveLength(0);
    expect(spy).toHaveBeenCalledTimes(1);
    const body = first[0].body;
    expect(body).toContain('8 din 10');
    expect(body).toContain('Fracții');
    expect(body).not.toContain(phrase);
    expect(body).toContain('/#/parinte');
    expect(body).toContain('/#/emailuri/');
  });

  it('oprește al patrulea email din aceeași zi către același părinte', async () => {
    const { app } = createApp({ autosave: false });
    const parentEmail = uniqueEmail('rezumat');
    const spy = vi.spyOn(deliver, 'deliverMessage');
    for (let n = 0; n < 4; n += 1) {
      const created = await registerGranted(app, { parentEmail });
      await created.agent.post('/api/economy/activity').send({
        type: 'learn_module',
        meta: { chapterId: 'fractii', subject: 'matematica', grade: 5, minutes: 5 }
      });
    }
    spy.mockClear();
    const sent = await sendDueDigests(new Date(), { force: true });
    expect(sent.length).toBe(3);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('nu schimbă emailul părintelui până la confirmare', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const next = uniqueEmail('nou');
    const logs = [];
    const original = console.log;
    console.log = (...args) => logs.push(args.map(item => String(item)).join(' '));
    let patched;
    try {
      patched = await created.agent.patch('/api/account/profile').send({ parentEmail: next });
    } finally {
      console.log = original;
    }
    expect(patched.status).toBe(200);
    expect(patched.body.user.parentEmail).toBe(created.parentEmail);
    expect(patched.body.user.parentEmailPending).toBe(next);
    const token = (logs.join('\n').match(/#\/email-nou\/([a-f0-9]+)/) || [])[1];
    expect(token).toBeTruthy();
    expect(authStore.findByUsername(created.username).profile.parentEmail).toBe(created.parentEmail);
    const confirm = await created.agent.post('/api/auth/parent-email/confirm').send({ token });
    expect(confirm.status).toBe(200);
    expect(authStore.findByUsername(created.username).profile.parentEmail).toBe(next);
  });
});
