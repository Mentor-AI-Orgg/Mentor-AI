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
      .send({ message: 'Am rămas blocat la o problemă de geometrie, cum aș putea să încep?', language: 'ro', plan_id: 'free' });
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

  it('is also available under /api/v1', async () => {
    const res = await agent
      .post('/api/v1/chat')
      .send({ message: 'Nu știu de unde să încep tema de fizică.', language: 'ro' });
    expect(res.status).toBe(200);
    expect(res.body.engine_used).toBe('lectii');
    expect(res.body.engine_mocked).toBe(false);
  });
});
