import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import {
  PREVIEW_COOKIE,
  previewToken
} from '../backend/src/middleware/comingSoon.js';

const nodeRequire = createRequire(import.meta.url);
const persistence = nodeRequire('../backend/src/data/persistence.js');
const config = nodeRequire('../backend/src/config.js');

const PASSWORD = 'Testpass1!';
const AI_KEYS = ['OPENAI_KEY', 'CLAUDE_KEY', 'GEMINI_KEY', 'WOLFRAM_KEY', 'MATHPIX_APP_ID', 'MATHPIX_APP_KEY'];

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

function hashToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

async function registerStudent(app, overrides = {}) {
  const email = overrides.email || uniqueEmail('elev');
  const parentEmail = overrides.parentEmail || uniqueEmail('parinte');
  const username = overrides.username || `u${Math.random().toString(16).slice(2, 8)}`;
  const agent = request.agent(app);
  const res = await agent.post('/api/auth/register').send({
    email,
    password: PASSWORD,
    role: 'student',
    name: overrides.name || 'Ana Test',
    username,
    school: overrides.school || 'Școala Test',
    class: overrides.class || '6',
    phone: overrides.phone || '0712345678',
    parentEmail,
    parental_consent: true,
    privacy_accepted: true
  });
  expect(res.status).toBe(201);
  return { agent, email, parentEmail, username };
}

describe('regresie PR #70', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    delete process.env.SITE_CLOSED;
    delete process.env.SITE_PUBLIC;
    delete process.env.PREVIEW_PASSWORD;
    delete process.env.PREVIEW_COOKIE_SECRET;
    for (const key of AI_KEYS) {
      delete process.env[key];
      config[key] = '';
    }
  });

  it('refuză orice parolă de creator când PREVIEW_PASSWORD lipsește', async () => {
    process.env.SITE_CLOSED = '1';
    delete process.env.PREVIEW_PASSWORD;
    const { app } = createApp({ autosave: false });
    const posted = await request(app).post('/creator').type('form').send({ password: 'orice-parola-ghicita' });
    expect(posted.status).toBe(401);
    expect(posted.text).toContain('În curând');
  });

  it('primește parola de creator doar prin POST, nu din adresă', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'parola-corecta';
    const { app } = createApp({ autosave: false });

    for (const url of ['/?acces=parola-corecta', '/?password=parola-corecta', '/creator?password=parola-corecta']) {
      const fromUrl = await request(app).get(url);
      expect(fromUrl.status).toBe(200);
      expect(fromUrl.text).toContain('În curând');
      expect(fromUrl.headers['set-cookie'] || []).not.toEqual(
        expect.arrayContaining([expect.stringContaining(PREVIEW_COOKIE)])
      );
    }

    const agent = request.agent(app);
    const ok = await agent.post('/creator').type('form').send({ password: 'parola-corecta' });
    expect(ok.status).toBe(303);
    const opened = await agent.get('/');
    expect(opened.text).not.toMatch(/În curând/);
  });

  it('nu acceptă un cookie de previzualizare semnat cu alt secret', async () => {
    process.env.SITE_CLOSED = '1';
    process.env.PREVIEW_PASSWORD = 'parola-corecta';
    process.env.PREVIEW_COOKIE_SECRET = 'secret-adevarat-treizeci-si-doi!!';
    const { app } = createApp({ autosave: false });

    process.env.PREVIEW_COOKIE_SECRET = 'secret-fals-complet-diferit-32!!';
    const forged = previewToken();
    process.env.PREVIEW_COOKIE_SECRET = 'secret-adevarat-treizeci-si-doi!!';

    const page = await request(app).get('/').set('Cookie', `${PREVIEW_COOKIE}=${forged}`);
    expect(page.text).toContain('În curând');
  });

  it('lasă goale valorile PASSWORD, SECRET și KEY din .env.example', () => {
    const file = path.join(process.cwd(), 'backend', '.env.example');
    const text = fs.readFileSync(file, 'utf8');
    const assignments = text.split('\n').filter(line => /^[A-Z0-9_]*(?:PASSWORD|SECRET|KEY)[A-Z0-9_]*=/.test(line));
    expect(assignments.length).toBeGreaterThan(0);
    for (const line of assignments) {
      const value = line.slice(line.indexOf('=') + 1).trim();
      expect(value, line).toBe('');
    }
    expect(text).not.toContain('suntde10-creator');
  });

  it('trimite recenzia părintelui doar la adresa salvată, o dată pe zi, fără textul clientului', async () => {
    const { app } = createApp({ autosave: false });
    const phrase = `fraza-unica-${Date.now()}-client`;
    const attacker = uniqueEmail('atacator');
    const { agent, parentEmail } = await registerStudent(app);

    const first = await agent.post('/api/economy/parent-review').send({
      parent_email: attacker,
      message: phrase,
      plan_id: 'premium',
      billing_cycle: 'yearly'
    });
    expect(first.status).toBe(200);
    expect(first.body.ok).toBe(true);
    expect(first.body.email.to).toBe(parentEmail);
    expect(first.body.email.to).not.toBe(attacker);
    expect(first.body.preview.body).not.toContain(phrase);
    expect(first.body.preview.subject).not.toContain(phrase);
    expect(JSON.stringify(first.body)).not.toContain(attacker);
    expect(JSON.stringify(first.body)).not.toContain(phrase);

    const second = await agent.post('/api/economy/parent-review').send({
      parent_email: attacker,
      message: phrase
    });
    expect(second.body.ok).toBe(false);
    expect(JSON.stringify(second.body)).not.toContain(phrase);
    expect(JSON.stringify(second.body)).not.toContain(attacker);
  });

  it('răspunde la criză cu 116 111 și 112, fără să treacă prin tutore', async () => {
    const { app } = createApp({ autosave: false });
    const { agent } = await registerStudent(app);
    const res = await agent.post('/api/chat').send({
      message: 'sunt abuzat si nu stiu ce sa fac',
      language: 'ro',
      subject: 'romana',
      class_level: 6
    });
    expect(res.status).toBe(200);
    expect(res.body.response).toContain('116 111');
    expect(res.body.response).toContain('112');
    expect(res.body.engine_used).toBe('crisis_help');
    expect(res.body.engine_used).not.toBe('lectii');
  });

  it('caută colegi doar după username exact și ascunde datele de pe card și din clasament', async () => {
    const { app } = createApp({ autosave: false });
    const ion = await registerStudent(app, {
      name: 'Ion Privat',
      username: `ion${Date.now().toString(16).slice(-4)}`,
      school: 'Școala Stejar',
      class: '7',
      phone: '0722000111'
    });
    const ana = await registerStudent(app, { name: 'Ana Public', username: `ana${Date.now().toString(16).slice(-4)}` });

    const me = await ion.agent.get('/api/friends/me');
    expect(me.body.settings.profilePrivate).toBe(true);

    const byName = await ana.agent.get('/api/friends/search').query({ q: 'Ion' });
    expect(byName.body.results).toEqual([]);
    const bySchool = await ana.agent.get('/api/friends/search').query({ q: 'Stejar' });
    expect(bySchool.body.results).toEqual([]);

    const found = await ana.agent.get('/api/friends/search').query({ q: ion.username });
    expect(found.body.results).toHaveLength(1);
    const card = found.body.results[0];
    expect(card.school ?? '').toBe('');
    expect(card.class ?? '').toBe('');
    expect(card.grade).toBeUndefined();
    expect(card.className).toBeUndefined();
    expect(card.fullName).toBeUndefined();
    expect(card.email).toBeUndefined();
    expect(card.phone).toBeUndefined();
    expect(JSON.stringify(card)).not.toContain('Ion Privat');
    expect(JSON.stringify(card)).not.toContain(ion.email);
    expect(JSON.stringify(card)).not.toContain('Școala Stejar');
    expect(JSON.stringify(card)).not.toContain('0722000111');

    await ion.agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    const board = await request(app).get('/api/leaderboard');
    expect(board.status).toBe(200);
    const packed = JSON.stringify(board.body);
    expect(packed).not.toContain(ion.username);
    expect(packed).not.toContain(ion.email);
    expect(packed).not.toContain('Ion Privat');
    expect(packed).not.toContain('Școala Stejar');
  });

  it('resetează parola la fel pentru un cont existent și unul inexistent, o singură dată, și închide sesiunile', async () => {
    const { app } = createApp({ autosave: false });
    const { agent, email } = await registerStudent(app);
    const missing = uniqueEmail('lipsa');

    const known = await request(app).post('/api/auth/forgot-password').send({ email });
    const unknown = await request(app).post('/api/auth/forgot-password').send({ email: missing });
    expect(known.status).toBe(unknown.status);
    expect(known.body).toEqual(unknown.body);

    const notes = await agent.get('/api/economy/notifications');
    const body = (notes.body.inbox || []).map(item => item.body || '').join('\n');
    const token = (body.match(/#\/parola\/([a-f0-9]+)/) || [])[1];
    expect(token).toBeTruthy();

    persistence.saveNow();
    const saved = JSON.parse(fs.readFileSync(persistence.DATA_FILE, 'utf8'));
    const resets = saved.collections.auth.resets;
    expect(resets[token]).toBeUndefined();
    expect(resets[hashToken(token)]).toBeTruthy();
    expect(JSON.stringify(resets)).not.toContain(token);

    const reset = await request(app).post('/api/auth/reset-password').send({ token, password: 'Nouapass1!' });
    expect(reset.status).toBe(200);
    const oldSession = await agent.get('/api/auth/me');
    expect(oldSession.status).toBe(401);
    const reused = await request(app).post('/api/auth/reset-password').send({ token, password: 'AltaPass1!' });
    expect(reused.status).toBe(400);
  });

  it('refuză linkul de resetare după 45 de minute', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-06-01T08:00:00.000Z'));
    const { app } = createApp({ autosave: false });
    const { agent, email } = await registerStudent(app);

    await request(app).post('/api/auth/forgot-password').send({ email });
    const notes = await agent.get('/api/economy/notifications');
    const body = (notes.body.inbox || []).map(item => item.body || '').join('\n');
    const token = (body.match(/#\/parola\/([a-f0-9]+)/) || [])[1];
    expect(token).toBeTruthy();

    vi.setSystemTime(new Date('2026-06-01T08:45:01.000Z'));
    const late = await request(app).post('/api/auth/reset-password').send({ token, password: 'Nouapass1!' });
    expect(late.status).toBe(400);
  });

  it('nu cheamă niciun furnizor AI când cheile sunt setate', async () => {
    for (const key of AI_KEYS) {
      process.env[key] = 'valoare-falsa';
      config[key] = 'valoare-falsa';
    }
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
      throw new Error('fetch nu trebuie apelat');
    });
    const moduleSpy = vi.spyOn(nodeRequire('../backend/src/providers/fetchWithTimeout.js'), 'fetchWithTimeout').mockImplementation(() => {
      throw new Error('fetchWithTimeout nu trebuie apelat');
    });

    const { app } = createApp({ autosave: false });
    const { agent } = await registerStudent(app);
    const res = await agent.post('/api/chat').send({
      message: 'Ce este o fracție?',
      language: 'ro',
      subject: 'matematica',
      class_level: 5
    });
    expect(res.status).toBe(200);
    expect(res.body.engine_used).toBe('lectii');
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(moduleSpy).not.toHaveBeenCalled();
  });
});
