import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(import.meta.dirname, '..');

// Numele tehnic vechi rămâne la fișierul de date și la copiile lui.
// O redenumire ar pierde conturile și backup-urile deja făcute.
const TECHNICAL = [
  {
    file: 'backend/src/data/persistence.js',
    reason: 'data/mentor-ai.json păstrează numele tehnic vechi'
  },
  {
    file: 'backend/src/ops/backup.js',
    reason: 'copiile zilnice folosesc același nume tehnic ca fișierul de date'
  }
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function hits(text) {
  const found = [];
  const re = /Mentor[\s-]?AI/gi;
  let match = re.exec(text);
  while (match) {
    const token = match[0];
    const around = text.slice(Math.max(0, match.index - 12), match.index + token.length + 24);
    const technicalFile = /mentor-ai(?:\.json|-)/i.test(around);
    if (!technicalFile) found.push(token);
    match = re.exec(text);
  }
  return found;
}

describe('numele aplicației', () => {
  it('nu mai scrie Mentor AI în ce vede utilizatorul', () => {
    const files = [
      ...walk(join(root, 'frontend')),
      ...walk(join(root, 'backend/src')),
      ...walk(join(root, 'frontend/public'))
    ];
    const problems = [];
    for (const file of files) {
      if (!/\.(js|jsx|html|json|css|svg|md)$/.test(file)) continue;
      const rel = relative(root, file);
      const found = hits(readFileSync(file, 'utf8'));
      if (found.length) problems.push(`${rel}: ${found.join(', ')}`);
    }
    expect(problems).toEqual([]);
  });

  it('ține minte de ce rămân numele tehnice', () => {
    expect(TECHNICAL.every(item => item.reason.length > 10)).toBe(true);
    for (const item of TECHNICAL) {
      const text = readFileSync(join(root, item.file), 'utf8');
      expect(text).toMatch(/mentor-ai/i);
    }
  });
});
