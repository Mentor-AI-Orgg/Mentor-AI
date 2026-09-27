import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { normalizeAppearance } from '../frontend/themePrefs.js';

const css = readFileSync(new URL('../frontend/styles.css', import.meta.url), 'utf8');
const lines = readFileSync(new URL('../frontend/components/FloatingLines.jsx', import.meta.url), 'utf8');
const faces = readFileSync(new URL('../frontend/public/fonts/faces.css', import.meta.url), 'utf8');

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

  it('paleta din logo stă în variabilele CSS', () => {
    expect(css).toContain('--bg: #08142A');
    expect(css).toContain('--primary: #44D6D7');
    expect(css).toContain('--success: #93FC09');
    expect(css).toMatch(/:root\[data-theme="light"\][\s\S]*--primary: #0E8C96/);
    expect(css).toContain('.lesson-platter p { margin: 0 0 10px; color: var(--text); line-height: 1.85; font-size: 16px; }');
    expect(css).not.toMatch(/font-size:\s*(?:9|10|11)px/);
  });

  it('fundalul animat nu mai folosește violetul vechi', () => {
    expect(lines).not.toContain('#b9a7ff');
    expect(lines).toContain('#44D6D7');
    expect(faces).toContain("font-family: 'Lexend'");
    expect(faces).toContain('lexend-latin-400-normal.woff2');
  });
});
