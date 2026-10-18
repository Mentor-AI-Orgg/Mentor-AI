import fs from 'fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PASSWORD, registerGranted, uniqueEmail, uniqueUsername } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const { usernameIssue } = nodeRequire('../backend/src/safety/usernamePolicy.js');
const { rejectedNames } = nodeRequire('../backend/src/ops/auditUsernames.js');
const { findByUsername, flagRejectedUsernames } = nodeRequire('../backend/src/data/authStore.js');

const GOOD = [
  'ana_matei',
  'Ștefan10',
  'mihai.p',
  'Ioana_7',
  'vulpe.alba',
  '12ana',
  'analiza',
  'manipula',
  'violeta',
  'dracula',
  'canal',
  'sexta',
  'kitty',
  'morcov',
  'curcubeu',
  'analiza10',
  'essex10',
  'peacock1'
];

const BLOCKED = [
  ['prost', 'username_blocked'],
  ['pr0st', 'username_blocked'],
  ['p_r_o_s_t', 'username_blocked'],
  ['p.r.o.s.t', 'username_blocked'],
  ['prostttt', 'username_blocked'],
  ['PROST', 'username_blocked'],
  ['tampit', 'username_blocked'],
  ['t4mpit', 'username_blocked'],
  ['sex', 'username_blocked'],
  ['sexx', 'username_blocked'],
  ['cacat', 'username_blocked'],
  ['muie', 'username_blocked'],
  ['curva', 'username_blocked']
];

const CONTACT = [
  ['ana@mail.com', 'username_contact_info'],
  ['copil@exemplu.ro', 'username_contact_info'],
  ['www.site', 'username_contact_info'],
  ['httpx', 'username_contact_info'],
  ['ana.ro', 'username_contact_info'],
  ['ana.com', 'username_contact_info'],
  ['0722123456', 'username_contact_info'],
  ['0722.123.456', 'username_contact_info'],
  ['insta_ana', 'username_contact_info'],
  ['tiktok', 'username_contact_info'],
  ['snapchat', 'username_contact_info']
];

const RESERVED = [
  ['admin', 'username_reserved'],
  ['Adm1n', 'username_reserved'],
  ['aaadmin', 'username_reserved'],
  ['administrator', 'username_reserved'],
  ['moderator', 'username_reserved'],
  ['suntde10', 'username_reserved'],
  ['sunt_de_10', 'username_reserved'],
  ['sunt.de.10', 'username_reserved'],
  ['creator', 'username_reserved'],
  ['profesor', 'username_reserved'],
  ['parinte', 'username_reserved'],
  ['Părinte', 'username_reserved'],
  ['support', 'username_reserved'],
  ['ajutor', 'username_reserved']
];

const INVALID = [
  ['ab', 'username_too_short'],
  ['123ana', 'username_invalid_chars'],
  ['2012', 'username_invalid_chars'],
  ['vulpe-alba', 'username_invalid_chars'],
  ['ana matei', 'username_invalid_chars'],
  ['.ana', 'username_invalid_chars'],
  ['ana.', 'username_invalid_chars']
];

describe('nume de utilizator', () => {
  it('acoperă cel puțin 40 de cazuri: bune, urâte, contact, rezervate, excepții', () => {
    const cases = [
      ...GOOD.map(name => [name, '']),
      ...BLOCKED,
      ...CONTACT,
      ...RESERVED,
      ...INVALID
    ];
    expect(cases.length).toBeGreaterThanOrEqual(40);
    for (const [name, code] of cases) {
      const issue = usernameIssue(name);
      if (!code) {
        expect(issue, name).toBeNull();
      } else {
        expect(issue?.code, name).toBe(code);
        expect(issue?.error, name).toMatch(/\S/);
      }
    }
  });

  it('respinge la înscriere și la schimbarea din profil, cu codul potrivit', async () => {
    const { app } = createApp({ autosave: false });
    const samples = [
      ['pr0st', 'username_blocked'],
      ['admin', 'username_reserved'],
      ['0722000111', 'username_contact_info'],
      ['123ana', 'username_invalid_chars']
    ];
    for (const [username, code] of samples) {
      const res = await request(app).post('/api/auth/register').send({
        username,
        password: PASSWORD,
        confirmPassword: PASSWORD,
        class: '6',
        parentEmail: uniqueEmail('parinte')
      });
      expect(res.status, username).toBe(400);
      expect(res.body.field).toBe('username');
      expect(res.body.code).toBe(code);
      expect(res.body.error).toBe(usernameIssue(username).error);
    }

    const created = await registerGranted(app, { username: 'ana_matei' });
    expect(created.res.status).toBe(201);
    const other = await registerGranted(app, { username: 'mihai.p' });
    expect(other.res.status).toBe(201);

    const bad = await created.agent.patch('/api/account/profile').send({ username: 'cacat' });
    expect(bad.status).toBe(400);
    expect(bad.body.code).toBe('username_blocked');
    expect(bad.body.field).toBe('username');

    const taken = await created.agent.patch('/api/account/profile').send({ username: 'mihai.p' });
    expect(taken.status).toBe(409);
    expect(taken.body.code).toBe('username_taken');
    expect(taken.body.error).toBe('Numele mihai.p e deja folosit, încearcă mihai.p123.');
    expect(taken.body.suggestions[0]).toBe('mihai.p123');

    const check = await request(app).post('/api/auth/username-check').send({ username: 'Ștefan10' });
    expect(check.status).toBe(200);
    expect(check.body.ok).toBe(true);

    const ugly = await request(app).post('/api/auth/username-check').send({ username: 'pr0st' });
    expect(ugly.body).toMatchObject({ ok: false, code: 'username_blocked' });
  });

  it('cere alt nume la logare și închide prietenii și clasamentul', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app, { username: 'vulpe_alba' });
    const account = findByUsername('vulpe_alba');
    account.profile.username = 'prost';
    account.mustRename = false;

    await created.agent.post('/api/auth/logout');
    const login = await created.agent.post('/api/auth/login').send({
      email: 'prost',
      password: PASSWORD
    });
    expect(login.status).toBe(200);
    expect(login.body.user.mustRename).toBe(true);

    const friends = await created.agent.get('/api/friends/me');
    expect(friends.status).toBe(409);
    expect(friends.body.code).toBe('username_required');

    const board = await created.agent.get('/api/leaderboard');
    expect(board.status).toBe(409);
    expect(board.body.code).toBe('username_required');
  });

  it('nu arată un nume respins altor copii și îl listează fără email', async () => {
    const { app } = createApp({ autosave: false });
    const viewer = await registerGranted(app, { username: uniqueUsername('bufnita') });
    const hidden = await registerGranted(app, { username: 'iepure_bun' });
    const account = findByUsername('iepure_bun');
    account.profile.username = 'curva';
    account.mustRename = false;
    expect(flagRejectedUsernames()).toBeGreaterThanOrEqual(1);

    const search = await viewer.agent.get('/api/friends/search').query({ q: 'curva' });
    expect(search.status).toBe(200);
    expect(search.body.results).toEqual([]);

    const rows = rejectedNames([
      { role: 'student', profile: { username: 'curva' } },
      { role: 'student', profile: { username: 'ana_matei' } },
      { role: 'parent', profile: { username: '' }, email: 'parinte@example.com' }
    ]);
    expect(rows).toEqual([{ username: 'curva', code: 'username_blocked' }]);
    expect(JSON.stringify(rows)).not.toMatch(/@/);
    expect(hidden.res.status).toBe(201);
  });

  it('formularul nu mai ține lista de cuvinte în browser', () => {
    const source = fs.readFileSync('frontend/components/RegisterScreen.jsx', 'utf8');
    expect(source).toMatch(/checkUsername/);
    expect(source).not.toMatch(/isUsernameShape|blockedWords|pr0st/);
  });
});
