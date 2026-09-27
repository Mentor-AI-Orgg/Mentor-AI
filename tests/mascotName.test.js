import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '..');
const ALLOWED = new Set([path.join(root, 'shared/mascot.json')]);

function filesUnder(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'reports') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...filesUnder(full));
    else if (/\.(js|jsx|json|css|html|md|svg)$/.test(entry.name)) out.push(full);
  }
  return out;
}

describe('numele mascotei', () => {
  it('stă doar în shared/mascot.json', () => {
    const hits = [];
    for (const dir of ['frontend', 'backend', 'shared']) {
      for (const file of filesUnder(path.join(root, dir))) {
        if (ALLOWED.has(file)) continue;
        const text = fs.readFileSync(file, 'utf8');
        if (text.includes('Zecița')) hits.push(path.relative(root, file));
      }
    }
    expect(hits).toEqual([]);
    const name = JSON.parse(fs.readFileSync(path.join(root, 'shared/mascot.json'), 'utf8')).MASCOT_NAME;
    expect(name).toBe('Zecița');
  });
});
