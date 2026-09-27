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

  it('rejects parent and teacher signup', async () => {
    for (const role of ['parent', 'teacher']) {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: uniqueEmail(role),
          password: PASSWORD,
          role,
          privacy_accepted: true
        });
      expect(res.status).toBe(403);
      expect(res.body.field).toBe('role');
      expect(res.body.code).toBe('students_only');
    }
  });

  it('emails the parent when the student account is created', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: uniqueEmail('notify'),
        password: PASSWORD,
        role: 'student',
        name: 'Ionel Test',
        parentEmail: uniqueEmail('parinte'),
        parental_consent: true,
        privacy_accepted: true
      });
    expect(res.status).toBe(201);
    expect(res.body.parentNotified).toBe(true);
  });

  it('emails the parent when the student logs in', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: studentEmail, password: PASSWORD });
    expect(res.status).toBe(200);
    expect(res.body.parentNotified).toBe(true);
  });

  it('emails the parent when the student logs an activity', async () => {
    const res = await studentAgent
      .post('/api/economy/activity')
      .send({ type: 'mentor_message', note: 'Cât face 2+2?' });
    expect(res.status).toBe(200);
    expect(res.body.parentNotified).toBe(true);
    expect(res.body.parentNotify.delivery.mocked).toBe(true);
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

  it('does not ask for a site-wide staging password', async () => {
    const home = await request(app).get('/');
    expect(home.text).not.toMatch(/Acces restricționat/);
    expect(home.headers['www-authenticate']).toBeUndefined();
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: studentEmail, password: 'Wrongpass1!' });
    expect(login.text).not.toMatch(/Acces restricționat/);
    expect(login.body.error).toMatch(/Email sau parolă/i);
  });

  it('resets the password from a one-time link and closes the old session', async () => {
    const forgot = await request(app).post('/api/auth/forgot-password').send({ email: studentEmail });
    expect(forgot.body.success).toBe(true);
    expect(forgot.body.message).toMatch(/Dacă adresa/);
    const notes = await studentAgent.get('/api/economy/notifications');
    const body = (notes.body.inbox || []).map(item => item.body || '').join('\n');
    const token = (body.match(/#\/parola\/([a-f0-9]+)/) || [])[1];
    expect(token).toBeTruthy();

    const reset = await request(app).post('/api/auth/reset-password').send({ token, password: 'Nouapass1!' });
    expect(reset.status).toBe(200);
    const oldSession = await studentAgent.get('/api/auth/me');
    expect(oldSession.status).toBe(401);
    const reused = await request(app).post('/api/auth/reset-password').send({ token, password: 'AltaPass1!' });
    expect(reused.status).toBe(400);
    const fresh = await request(app).post('/api/auth/login').send({ email: studentEmail, password: 'Nouapass1!' });
    expect(fresh.status).toBe(200);
  });
});
