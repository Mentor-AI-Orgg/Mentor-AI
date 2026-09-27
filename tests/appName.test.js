import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '..');

const ALLOW = [
  {
    file: 'backend/src/config.js',
    reason: 'comentariul spune de ce rămâne data/mentor-ai.json'
  }
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (/\.(js|jsx|html|json|css|md)$/.test(name)) out.push(full);
  }
  return out;
}

describe('numele aplicației', () => {
  it('nu mai arată Mentor AI în interfață, în backend sau în fișierele publice', () => {
    const files = [
      ...walk(path.join(root, 'frontend')),
      ...walk(path.join(root, 'backend/src')),
      ...walk(path.join(root, 'frontend/public'))
    ];
    const hits = [];
    for (const file of files) {
      const rel = path.relative(root, file);
      const text = fs.readFileSync(file, 'utf8');
      if (!/Mentor AI|Mentor-AI|MentorAI/.test(text)) continue;
      const allowed = ALLOW.some(item => item.file === rel && text.includes('mentor-ai.json'));
      if (!allowed) hits.push(rel);
    }
    expect(hits).toEqual([]);
  });
});
