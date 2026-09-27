import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

async function parentOf(app, parentEmail) {
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
  await agent.post('/api/parent/magic/consume').send({ token });
  return agent;
}

describe('panoul părintelui', () => {
  it('arată progresul, nu conversațiile, și schimbă emailurile', async () => {
    const { app } = createApp({ autosave: false });
    const child = await registerGranted(app);
    const parent = await parentOf(app, child.parentEmail);
    const mine = await parent.get('/api/parent/me');
    const id = mine.body.children[0].id;
    const panel = await parent.get(`/api/parent/children/${id}/panel`);
    expect(panel.status).toBe(200);
    expect(panel.body.days).toHaveLength(7);
    expect(JSON.stringify(panel.body)).not.toMatch(/mesaj|chat|tutor/i);
    const cadence = await parent.post(`/api/parent/children/${id}/emails`).send({ cadence: 'off' });
    expect(cadence.body.emails).toBe('off');
    const limit = await parent.post(`/api/parent/children/${id}/limit`).send({ minutes: 30 });
    expect(limit.body.dailyLimit).toBe(30);
  });
});
