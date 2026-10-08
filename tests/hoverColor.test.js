import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const FRONTEND = join(import.meta.dirname, '../frontend');
const SOURCE_EXT = new Set(['.css', '.jsx', '.js']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'dist' || name === 'node_modules') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (SOURCE_EXT.has(name.slice(name.lastIndexOf('.')))) out.push(path);
  }
  return out;
}

function hsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const light = (max + min) / 2;
  const delta = max - min;
  if (!delta) return { h: 0, s: 0, l: light };
  const sat = light > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue;
  if (max === rn) hue = ((gn - bn) / delta) + (gn < bn ? 6 : 0);
  else if (max === gn) hue = ((bn - rn) / delta) + 2;
  else hue = ((rn - gn) / delta) + 4;
  return { h: hue * 60, s: sat, l: light };
}

function hexBytes(hex) {
  const raw = hex.replace('#', '');
  const full = raw.length === 3
    ? raw.split('').map(ch => ch + ch).join('')
    : raw.slice(0, 6);
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16)
  ];
}

/** Indigo, violet, purple, lavender, fuchsia. Teal and navy stay out. */
function isPurpleFamily(r, g, b) {
  const { h, s, l } = hsl(r, g, b);
  if (s < 0.18 || l < 0.08 || l > 0.97) return false;
  return h >= 230 && h <= 325;
}

function purpleTokens(text) {
  const hits = [];
  const named = /(?:hover:[^\s"'`]*?(?:purple|violet|indigo|fuchsia|lavender)|(?:purple|violet|indigo|fuchsia|lavender)-\d{2,3})/ig;
  const hex = /#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/ig;
  const rgb = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/ig;
  let match;
  while ((match = named.exec(text))) hits.push(match[0]);
  while ((match = hex.exec(text))) {
    const bytes = hexBytes(match[0]);
    if (bytes && isPurpleFamily(...bytes)) hits.push(match[0]);
  }
  while ((match = rgb.exec(text))) {
    const channels = [Number(match[1]), Number(match[2]), Number(match[3])];
    if (isPurpleFamily(...channels)) hits.push(match[0]);
  }
  return hits;
}

function cssHoverBodies(css) {
  const bodies = [];
  const rule = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = rule.exec(css))) {
    const selector = match[1];
    if (!selector.includes(':hover')) continue;
    if (/hover\s*:\s*none/.test(selector) && !selector.includes(':hover')) continue;
    bodies.push(match[2]);
  }
  return bodies;
}

describe('hover-ul nu trece pe mov', () => {
  it('niciun control nu își schimbă hover-ul pe violet, indigo, lavandă sau fuchsia', () => {
    const problems = [];
    for (const file of walk(FRONTEND)) {
      const text = readFileSync(file, 'utf8');
      const rel = file.slice(FRONTEND.length + 1);
      if (rel.endsWith('.css')) {
        for (const body of cssHoverBodies(text)) {
          const hits = purpleTokens(body);
          if (hits.length) problems.push(`${rel}: ${hits.join(', ')}`);
        }
        continue;
      }
      const utility = /hover:[^\s"'`)]+/g;
      let match;
      while ((match = utility.exec(text))) {
        const hits = purpleTokens(match[0]);
        if (hits.length) problems.push(`${rel}: ${match[0]}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it('butonul principal rămâne pe culoarea lui, iar cardurile mov își păstrează movul de repaus', () => {
    const css = readFileSync(join(FRONTEND, 'styles.css'), 'utf8');
    expect(css).not.toContain('#cbbdff');
    expect(css).not.toContain('#29285d');
    expect(css).toContain('.accent-button:hover');
    expect(css).toMatch(/\.accent-button:hover\s*\{[^}]*background:\s*var\(--primary\)/);
    expect(css).toContain('.module-violet');
    const profile = readFileSync(join(FRONTEND, 'screens/ProfileScreen.jsx'), 'utf8');
    expect(profile).not.toMatch(/hover:bg-\[#29285d\]/);
    expect(profile).toContain('surface-action');
  });
});
