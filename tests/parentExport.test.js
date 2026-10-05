import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

async function parentAgent(app, parentEmail) {
  const logs = [];
  const original = console.log;
  console.log = (...args) => logs.push(args.map(item => String(item)).join(' '));
  try {
    await request(app).post('/api/parent/magic').send({ email: parentEmail });
  } finally {
    console.log = original;
  }
  const token = (logs.join('\n').match(/#\/parinte\/([a-f0-9]+)/) || [])[1];
  const agent = request.agent(app);
  const consume = await agent.post('/api/parent/magic/consume').send({ token });
  return { agent, consume };
}

describe('exportul părintelui', () => {
  it('nu include conversațiile cu tutorele', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const phrase = `zmeututore ${created.username} secretul conversatiei`;
    const chat = await created.agent.post('/api/chat').send({
      message: phrase,
      subject: 'matematica',
      class_level: '5'
    });
    expect(chat.status).toBe(200);

    const own = await created.agent.get('/api/account/export');
    expect(own.status).toBe(200);
    expect(JSON.stringify(own.body.conversatii)).toContain(phrase);

    const parent = await parentAgent(app, created.parentEmail);
    expect(parent.consume.status).toBe(200);
    const mine = await parent.agent.get('/api/parent/me');
    const childId = mine.body.children[0].id;
    const exported = await parent.agent.get(`/api/parent/children/${childId}/export`);
    expect(exported.status).toBe(200);
    expect(exported.body.conversatii).toBeUndefined();
    expect(JSON.stringify(exported.body)).not.toContain(phrase);
    const notes = (exported.body.economie?.activitate || []).filter(item => item.tip === 'mentor_message');
    expect(notes.length).toBeGreaterThan(0);
    expect(notes.every(item => !('nota' in item))).toBe(true);
    expect(exported.body.cont.utilizator).toBe(created.username);
  });
});