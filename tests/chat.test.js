import { describe, it, expect, beforeAll } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

let app;
let agent;

describe('chat fallback chain', () => {
  beforeAll(async () => {
    ({ app } = createApp({ autosave: false }));
    const created = await registerGranted(app);
    expect(created.res.status).toBe(201);
    agent = created.agent;
  });

  it('returns a mocked engine when no provider keys are set', async () => {
    const res = await agent
      .post('/api/chat')
      .send({
        message: 'Am rămas blocat la o problemă de geometrie, cum aș putea să încep?',
        language: 'ro',
        plan_id: 'free'
      });
    expect(res.status).toBe(200);
    expect(res.body.response).toBeTruthy();
    expect(res.body.engine_mocked).toBe(false);
    expect(res.body.engine_used).toBe('lectii');
  });

  it('answers a normal “ce este” question instead of the old scaffolding wall', async () => {
    const res = await agent
      .post('/api/chat')
      .send({ message: 'Ce este o fracție oarecare?', language: 'ro' });
    expect(res.status).toBe(200);
    expect(res.body.engine_used).not.toBe('scaffolding_guard');
    expect(String(res.body.response || '')).not.toMatch(/nu pot să-ți dau „pe tavă”/i);
  });

  it('ține minte tema chatului la o urmare scurtă, dar nu o inventează în alt chat', async () => {
    const first = await agent.post('/api/chat').send({
      message: 'prezintă-mi ce este un diftong',
      subject: 'romana',
      class_level: 6,
      conversation_id: 'diftong-urmare',
      language: 'ro'
    });
    expect(first.status).toBe(200);
    expect(first.body.response).toMatch(/diftong/i);

    const example = await agent.post('/api/chat').send({
      message: 'dă-mi un exemplu',
      subject: 'romana',
      class_level: 6,
      conversation_id: 'diftong-urmare',
      language: 'ro'
    });
    expect(example.status).toBe(200);
    expect(example.body.engine_used).toBe('lectii');
    expect(example.body.response).toMatch(/diftong/i);
    expect(example.body.response).toMatch(/c[aâ]ine|exemplu/i);

    const shorter = await agent.post('/api/chat').send({
      message: 'explică mai pe scurt',
      subject: 'romana',
      class_level: 6,
      conversation_id: 'diftong-urmare',
      language: 'ro'
    });
    expect(shorter.status).toBe(200);
    expect(shorter.body.response).toMatch(/diftong/i);
    expect(shorter.body.response).toMatch(/pe scurt/i);

    const fresh = await agent.post('/api/chat').send({
      message: 'dă-mi un exemplu',
      subject: 'romana',
      class_level: 6,
      conversation_id: 'chat-fara-tema',
      language: 'ro'
    });
    expect(fresh.status).toBe(200);
    expect(fresh.body.response).toMatch(/Spune cu un cuvânt/);
    expect(fresh.body.response).not.toMatch(/c[aâ]ine/);
  });

  it('„Nu am înțeles” coboară aceeași lecție de câte ori e apăsat', async () => {
    const opened = await agent.post('/api/chat').send({
      message: 'prezintă-mi ce este un diftong',
      subject: 'romana',
      class_level: 6,
      conversation_id: 'diftong-neclar',
      language: 'ro'
    });
    expect(opened.status).toBe(200);
    expect(opened.body.response).toMatch(/diftong/i);

    const replies = [];
    for (let index = 0; index < 3; index += 1) {
      const res = await agent.post('/api/chat').send({
        message: 'Nu am înțeles',
        subject: 'romana',
        class_level: 6,
        conversation_id: 'diftong-neclar',
        language: 'ro'
      });
      expect(res.status).toBe(200);
      expect(res.body.engine_used).toBe('lectii');
      expect(res.body.response).toMatch(/diftong/i);
      expect(res.body.response.length).toBeLessThan(opened.body.response.length);
      replies.push(res.body.response);
    }
    expect(new Set(replies).size).toBe(3);
    expect(replies[1].length).toBeLessThan(replies[0].length);

    const empty = await agent.post('/api/chat').send({
      message: 'Nu am înțeles',
      subject: 'romana',
      class_level: 6,
      conversation_id: 'chat-fara-neclar',
      language: 'ro'
    });
    expect(empty.status).toBe(200);
    expect(empty.body.response).toMatch(/Spune cu un cuvânt/);
    expect(empty.body.response).not.toMatch(/Diftong, triftong/);
  });

  it('is also available under /api/v1', async () => {
    const res = await agent
      .post('/api/v1/chat')
      .send({ message: 'Nu știu de unde să încep tema de fizică.', language: 'ro' });
    expect(res.status).toBe(200);
    expect(res.body.engine_used).toBe('lectii');
    expect(res.body.engine_mocked).toBe(false);
  });
});
