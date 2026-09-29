import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(import.meta.dirname, '..');
const allowed = 'shared/mascot.json';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

describe('numele mascotei', () => {
  it('stă doar în shared/mascot.json', () => {
    const hits = [];
    for (const dir of ['frontend', 'backend', 'shared']) {
      for (const file of walk(join(root, dir))) {
        const rel = relative(root, file);
        if (rel === allowed) continue;
        const text = readFileSync(file, 'utf8');
        if (text.includes('Zecița')) hits.push(rel);
      }
    }
    expect(hits).toEqual([]);
  });
});
