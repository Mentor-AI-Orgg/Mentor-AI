import { createRequire } from 'node:module';
import { existsSync, mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const { migrateFile } = require('../backend/src/data/persistence.js');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, out = []) {
  readdirSync(dir).forEach(name => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  });
  return out;
}

describe('cod scos', () => {
  it('nu mai are stripe, twilio sau mockClaude în backend/src', () => {
    const blob = walk(join(root, 'backend/src'))
      .filter(file => file.endsWith('.js'))
      .map(file => readFileSync(file, 'utf8'))
      .join('\n');
    expect(blob).not.toMatch(/stripe/i);
    expect(blob).not.toMatch(/twilio/i);
    expect(blob).not.toMatch(/mockClaude/);
    expect(existsSync(join(root, 'backend/src/routes/calendar.js'))).toBe(true);
  });

  it('șterge abonamentele și invitațiile din fișier, după o copie', () => {
    const dir = mkdtempSync(join(tmpdir(), 't12-'));
    const file = join(dir, 'mentor-ai.json');
    writeFileSync(file, JSON.stringify({
      version: 1,
      collections: {
        subscriptions: { a: 1 },
        links: { b: 2 },
        calendar: { events: { elev: [] }, connections: { elev: { google: { accessToken: 'secret' } } } },
        auth: { ok: true }
      }
    }));
    const result = migrateFile(file);
    expect(result.migrated).toBe(true);
    expect(existsSync(result.backup)).toBe(true);
    const backup = JSON.parse(readFileSync(result.backup, 'utf8'));
    expect(backup.collections.subscriptions.a).toBe(1);
    const next = JSON.parse(readFileSync(file, 'utf8'));
    expect(next.collections.subscriptions).toBeUndefined();
    expect(next.collections.links).toBeUndefined();
    expect(next.collections.auth.ok).toBe(true);
    expect(next.collections.calendar.events.elev).toEqual([]);
    expect(next.collections.calendar.connections).toEqual({});
    expect(JSON.stringify(next)).not.toContain('secret');
  });
});
