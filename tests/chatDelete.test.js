import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const memory = nodeRequire('../backend/src/memory/memoryStore.js');
const registry = nodeRequire('../backend/src/data/userDataRegistry.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

function emailOf(created) {
  return authStore.findByUsername(created.username).email;
}

async function ask(agent, conversationId, message) {
  const res = await agent.post('/api/chat').send({
    message,
    subject: 'matematica',
    class_level: 5,
    conversation_id: conversationId,
    language: 'ro'
  });
  expect(res.status).toBe(200);
  return res;
}

describe('ștergerea unei conversații', () => {
  it('o șterge doar pe a elevului, iar registrul GDPR nu mai exportă mesajele', async () => {
    const { app } = createApp({ autosave: false });
    const owner = await registerGranted(app);
    const other = await registerGranted(app);
    expect(owner.res.status).toBe(201);
    expect(other.res.status).toBe(201);
    const ownerEmail = emailOf(owner);
    const otherEmail = emailOf(other);
    const stamp = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const kept = `pastrat-${stamp}`;
    const gone = `sters-${stamp}`;
    const theirs = `altcineva-${stamp}`;

    await ask(owner.agent, kept, 'Ce este o fracție?');
    await ask(owner.agent, gone, 'Ce este o putere?');
    await ask(other.agent, theirs, 'Ce este un diftong?');
    expect(memory.exportForEmail(ownerEmail)[gone].length).toBeGreaterThan(0);
    expect(memory.exportForEmail(otherEmail)[theirs].length).toBeGreaterThan(0);
    const deletionsBefore = registry.listDeletions().length;

    const removed = await owner.agent.delete(`/api/chat/${gone}`);
    expect(removed.status).toBe(200);
    expect(removed.body).toEqual({ cleared: true, conversation_id: gone });

    const exported = registry.exportAll(ownerEmail).memory;
    expect(exported[gone]).toBeUndefined();
    expect(exported[kept].length).toBeGreaterThan(0);
    expect(memory.get(`${ownerEmail}::${gone}`)).toEqual([]);
    expect(memory.exportForEmail(otherEmail)[theirs].length).toBeGreaterThan(0);
    expect(registry.listDeletions()).toHaveLength(deletionsBefore);

    const again = await owner.agent.delete(`/api/chat/${gone}`);
    expect(again.status).toBe(200);
    expect(memory.exportForEmail(ownerEmail)[kept].length).toBeGreaterThan(0);

    const cross = await owner.agent.delete(`/api/chat/${theirs}`);
    expect(cross.status).toBe(200);
    expect(memory.get(`${otherEmail}::${theirs}`).length).toBeGreaterThan(0);
    expect(registry.exportAll(otherEmail).memory[theirs].length).toBeGreaterThan(0);

    const injected = await owner.agent.delete(
      `/api/chat/${encodeURIComponent(`${otherEmail}::${theirs}`)}`
    );
    expect(injected.status).toBe(400);
    expect(memory.get(`${otherEmail}::${theirs}`).length).toBeGreaterThan(0);

    const slash = await owner.agent.delete(`/api/chat/${encodeURIComponent('unu/doi')}`);
    expect(slash.status).toBe(400);
    const bad = await owner.agent.delete(`/api/chat/${encodeURIComponent('a\\b')}`);
    expect(bad.status).toBe(400);
    const newline = await owner.agent.delete(`/api/chat/${encodeURIComponent('a\nb')}`);
    expect(newline.status).toBe(400);
    const longId = 'x'.repeat(81);
    const tooLong = await owner.agent.delete(`/api/chat/${longId}`);
    expect(tooLong.status).toBe(400);

    const anon = await request(app).delete(`/api/chat/${kept}`);
    expect(anon.status).toBe(401);
    expect(memory.exportForEmail(ownerEmail)[kept].length).toBeGreaterThan(0);
  });
});
