import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

const PASSWORD = 'Testpass1!';
let app;
let agent;

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

describe('chat fallback chain', () => {
  beforeAll(async () => {
    ({ app } = createApp({ autosave: false }));
    agent = request.agent(app);
    const email = uniqueEmail('chat');
    const register = await agent.post('/api/auth/register').send({
      email,
      password: PASSWORD,
      role: 'student',
      parentEmail: uniqueEmail('parinte'),
      parental_consent: true,
      privacy_accepted: true
    });
    expect(register.status).toBe(201);
  });

  it('returns a mocked engine when no provider keys are set', async () => {
    const res = await agent
      .post('/api/chat')
      .send({ message: 'Am rămas blocat la o problemă de geometrie, cum aș putea să încep?', language: 'ro', plan_id: 'free' });
    expect(res.status).toBe(200);
    expect(res.body.response).toBeTruthy();
    expect(res.body.engine_mocked).toBe(true);
    expect(String(res.body.engine_used || '')).toMatch(/mock/i);
  });

  it('is also available under /api/v1', async () => {
    const res = await agent
      .post('/api/v1/chat')
      .send({ message: 'Nu știu de unde să încep tema de fizică.', language: 'ro' });
    expect(res.status).toBe(200);
    expect(res.body.engine_mocked).toBe(true);
  });
});
