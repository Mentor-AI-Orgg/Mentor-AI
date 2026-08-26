import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

const PASSWORD = 'Testpass1!';
let app;
let studentAgent;
let studentEmail;

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

describe('auth', () => {
  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
    studentAgent = request.agent(app);
    studentEmail = uniqueEmail('elev');
  });

  it('refuses student signup without parental consent', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: uniqueEmail('nocon'),
        password: PASSWORD,
        role: 'student',
        parentEmail: uniqueEmail('parinte'),
        privacy_accepted: true
      });
    expect(res.status).toBe(400);
    expect(res.body.field).toBe('parental_consent');
  });

  it('registers a student and returns the current session', async () => {
    const res = await studentAgent
      .post('/api/auth/register')
      .send({
        email: studentEmail,
        password: PASSWORD,
        role: 'student',
        name: 'Ana Test',
        parentEmail: uniqueEmail('parinte'),
        parental_consent: true,
        privacy_accepted: true
      });
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe(studentEmail);
    expect(res.body.user.role).toBe('student');
  });

  it('rejects a duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: studentEmail,
        password: PASSWORD,
        role: 'student',
        parentEmail: uniqueEmail('parinte'),
        parental_consent: true,
        privacy_accepted: true
      });
    expect(res.status).toBe(409);
  });

  it('rejects teacher signup without the invite code', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: uniqueEmail('prof'),
        password: PASSWORD,
        role: 'teacher',
        privacy_accepted: true
      });
    expect(res.status).toBe(403);
    expect(res.body.field).toBe('invite_code');
  });

  it('exposes the session at /api/auth/me', async () => {
    const res = await studentAgent.get('/api/auth/me');
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(studentEmail);
  });

  it('rejects a wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: studentEmail, password: 'Wrongpass1!' });
    expect(res.status).toBe(401);
  });

  it('rejects /me without a session cookie', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });
});
