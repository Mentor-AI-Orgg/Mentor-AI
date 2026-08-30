import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

const PASSWORD = 'Testpass1!';
let app;

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

async function registerStudent(overrides = {}) {
  const email = overrides.email || uniqueEmail('elev');
  const agent = request.agent(app);
  const parentEmail = uniqueEmail('parinte');
  const res = await agent.post('/api/auth/register').send({
    email,
    password: PASSWORD,
    role: 'student',
    name: overrides.name || 'Ana Test',
    username: overrides.username || `ana${Math.random().toString(16).slice(2, 6)}`,
    school: 'Școala Test',
    class: '5',
    parentEmail,
    parental_consent: true,
    privacy_accepted: true
  });
  expect(res.status).toBe(201);
  return { agent, email, username: res.body.user.username };
}

describe('friends and profile edit', () => {
  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('lets a student edit name, class and parent email', async () => {
    const { agent, email } = await registerStudent({ name: 'Mara' });
    const parent = uniqueEmail('parinte-nou');
    const res = await agent.patch('/api/account/profile').send({
      name: 'Mara Nouă',
      class: '6',
      school: 'Liceul Test',
      parentEmail: parent
    });
    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe('Mara Nouă');
    expect(res.body.user.class).toBe('6');
    expect(res.body.user.parentEmail).toBe(parent);
    expect(res.body.user.email).toBe(email);
  });

  it('hides a private profile from search and blocks the request', async () => {
    const ana = await registerStudent({ name: 'Ana Public', username: `pub${Date.now().toString(16).slice(-4)}` });
    const ion = await registerStudent({ name: 'Ion Privat', username: `prv${Date.now().toString(16).slice(-4)}` });
    await ion.agent.patch('/api/friends/settings').send({ profilePrivate: true, acceptFriendRequests: true });

    const found = await ana.agent.get('/api/friends/search').query({ q: ion.username });
    expect(found.status).toBe(200);
    expect(found.body.results).toHaveLength(0);

    const visible = await ion.agent.get('/api/friends/search').query({ q: ana.username });
    expect(visible.body.results[0]?.username).toBe(ana.username);
  });

  it('sends at most 10 friend requests per day', async () => {
    const sender = await registerStudent({ name: 'Sender', username: `snd${Date.now().toString(16).slice(-4)}` });
    const ids = [];
    for (let i = 0; i < 10; i += 1) {
      const peer = await registerStudent({ name: `Peer ${i}`, username: `p${i}${Date.now().toString(16).slice(-3)}` });
      const search = await sender.agent.get('/api/friends/search').query({ q: peer.username });
      expect(search.body.results[0]?.id).toBeTruthy();
      ids.push(search.body.results[0].id);
      const sent = await sender.agent.post('/api/friends/request').send({ user_id: search.body.results[0].id });
      expect(sent.status).toBe(201);
    }
    const extra = await registerStudent({ name: 'Peer Extra', username: `pex${Date.now().toString(16).slice(-4)}` });
    const extraSearch = await sender.agent.get('/api/friends/search').query({ q: extra.username });
    const blocked = await sender.agent.post('/api/friends/request').send({ user_id: extraSearch.body.results[0].id });
    expect(blocked.status).toBe(429);
    expect(ids).toHaveLength(10);
  });

  it('accepts a request and becomes friends', async () => {
    const left = await registerStudent({ name: 'Left', username: `lft${Date.now().toString(16).slice(-4)}` });
    const right = await registerStudent({ name: 'Right', username: `rgt${Date.now().toString(16).slice(-4)}` });
    const search = await left.agent.get('/api/friends/search').query({ q: right.username });
    await left.agent.post('/api/friends/request').send({ user_id: search.body.results[0].id });
    const inbox = await right.agent.get('/api/friends/me');
    expect(inbox.body.incoming).toHaveLength(1);
    const accept = await right.agent.post('/api/friends/respond').send({
      request_id: inbox.body.incoming[0].id,
      action: 'accept'
    });
    expect(accept.status).toBe(200);
    const after = await left.agent.get('/api/friends/me');
    expect(after.body.friends.some(item => item.username === right.username)).toBe(true);
  });

  it('lists friends ordered by XP, highest first', async () => {
    const me = await registerStudent({ name: 'Eu', username: `me${Date.now().toString(16).slice(-4)}` });
    const low = await registerStudent({ name: 'Puține XP', username: `low${Date.now().toString(16).slice(-4)}` });
    const high = await registerStudent({ name: 'Multe XP', username: `hi${Date.now().toString(16).slice(-4)}` });

    await high.agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '5', chapterId: 'high-a', title: 'High A' }
    });
    await high.agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '5', chapterId: 'high-b', title: 'High B' }
    });

    const findAndAdd = async (agent, username) => {
      const search = await agent.get('/api/friends/search').query({ q: username });
      expect(search.body.results[0]?.id).toBeTruthy();
      const sent = await agent.post('/api/friends/request').send({ user_id: search.body.results[0].id });
      expect(sent.status).toBe(201);
    };

    await findAndAdd(me.agent, low.username);
    await findAndAdd(me.agent, high.username);

    const lowInbox = await low.agent.get('/api/friends/me');
    await low.agent.post('/api/friends/respond').send({ request_id: lowInbox.body.incoming[0].id, action: 'accept' });
    const highInbox = await high.agent.get('/api/friends/me');
    await high.agent.post('/api/friends/respond').send({ request_id: highInbox.body.incoming[0].id, action: 'accept' });

    const list = await me.agent.get('/api/friends/me');
    expect(list.body.friends).toHaveLength(2);
    expect(list.body.friends[0].username).toBe(high.username);
    expect(list.body.friends[1].username).toBe(low.username);
    expect(list.body.friends[0].xp).toBeGreaterThan(list.body.friends[1].xp);
  });
});
