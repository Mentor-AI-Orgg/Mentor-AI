import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { normalizeAppearance } from '../frontend/themePrefs.js';

const css = readFileSync(new URL('../frontend/styles.css', import.meta.url), 'utf8');
const lines = readFileSync(new URL('../frontend/components/FloatingLines.jsx', import.meta.url), 'utf8');
const app = readFileSync(new URL('../frontend/App.jsx', import.meta.url), 'utf8');
const faces = readFileSync(new URL('../frontend/public/fonts/faces.css', import.meta.url), 'utf8');

function channel(hex, shift) {
  return parseInt(hex.slice(1), 16) >> shift & 255;
}

function linear(value) {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function contrast(a, b) {
  const lum = hex => 0.2126 * linear(channel(hex, 16)) + 0.7152 * linear(channel(hex, 8)) + 0.0722 * linear(channel(hex, 0));
  const hi = Math.max(lum(a), lum(b));
  const lo = Math.min(lum(a), lum(b));
  return (hi + 0.05) / (lo + 0.05);
}

describe('aspect', () => {
  it('normalizează tema, mărimea, fontul și animațiile', () => {
    expect(normalizeAppearance({})).toEqual({
      theme: 'dark',
      textSize: 'normal',
      readableFont: false,
      motion: true
    });
    expect(normalizeAppearance({
      theme: 'light',
      textSize: 'xlarge',
      readableFont: '1',
      motion: '0'
    })).toEqual({
      theme: 'light',
      textSize: 'xlarge',
      readableFont: true,
      motion: false
    });
    expect(normalizeAppearance({ theme: 'roz', textSize: 'uriaș' }).theme).toBe('dark');
  });

  it('ține paleta din emblemă în variabile și textul lecțiilor la cel puțin 16px', () => {
    expect(css).toContain('--bg: #08142A');
    expect(css).toContain('--primary: #44D6D7');
    expect(css).toContain('--success: #93FC09');
    expect(css).toMatch(/html\[data-theme="light"\][\s\S]*--primary: #0C7C86/);
    expect(css).toContain('.lesson-platter p { margin: 0 0 10px; color: var(--text); line-height: 1.85; font-size: 1rem; }');
    expect(css).not.toMatch(/font-size:\s*(?:9|10|11)px/);
    expect(contrast('#FFFFFF', '#08142A')).toBeGreaterThan(4.5);
    expect(contrast('#A9B8D0', '#08142A')).toBeGreaterThan(4.5);
    expect(contrast('#08142A', '#44D6D7')).toBeGreaterThan(4.5);
    expect(contrast('#FFFFFF', '#0C7C86')).toBeGreaterThan(4.5);
    expect(contrast('#1F2937', '#F7F9FC')).toBeGreaterThan(4.5);
    expect(contrast('#4B5563', '#FFFFFF')).toBeGreaterThan(4.5);
  });

  it('mută fundalul animat pe turcoaz, bleumarin și lime', () => {
    expect(lines).not.toContain('#b9a7ff');
    expect(app).not.toContain('#b9a7ff');
    expect(lines).toContain('#44D6D7');
    expect(lines).toContain('#93FC09');
    expect(faces).toContain("font-family: 'Lexend'");
    expect(faces).toContain('lexend-latin-400-normal.woff2');
  });
});
