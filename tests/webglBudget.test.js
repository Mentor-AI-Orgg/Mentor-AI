import fs from 'node:fs';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { acquire, limit, release, resetBudget, shouldRender3D } from '../frontend/components/geo/webglBudget.js';

const root = path.resolve(__dirname, '..');

describe('buget WebGL', () => {
  beforeEach(() => resetBudget());
  afterEach(() => vi.unstubAllGlobals());

  it('scoate pe cel mai vechi când trece de limită', () => {
    vi.stubGlobal('navigator', { deviceMemory: 8, hardwareConcurrency: 8 });
    const evicted = [];
    acquire('a', () => evicted.push('a'));
    acquire('b', () => evicted.push('b'));
    acquire('c', () => evicted.push('c'));
    expect(limit()).toBeLessThanOrEqual(2);
    if (limit() === 2) {
      expect(evicted).toEqual(['a']);
      release('b');
      acquire('d', () => evicted.push('d'));
      expect(evicted).toEqual(['a']);
    }
  });

  it('limita 1 pe dispozitiv slab', () => {
    vi.stubGlobal('navigator', { deviceMemory: 2, hardwareConcurrency: 8 });
    resetBudget();
    expect(limit()).toBe(1);
    const evicted = [];
    acquire('a', () => evicted.push('a'));
    acquire('b', () => evicted.push('b'));
    expect(evicted).toEqual(['a']);
    vi.unstubAllGlobals();
  });

  it('3D pornește doar la apăsare, cât e vizibil', () => {
    expect(shouldRender3D({ flat: false, spinning: false, visible: true })).toBe(false);
    expect(shouldRender3D({ flat: true, spinning: true, visible: true })).toBe(false);
    expect(shouldRender3D({ flat: false, spinning: true, visible: false })).toBe(false);
    expect(shouldRender3D({ flat: false, spinning: true, visible: true })).toBe(true);
  });

  it('three nu mai intră în pachetul principal', () => {
    const files = [
      'frontend/App.jsx',
      'frontend/main.jsx',
      'frontend/components/GeoFigure.jsx',
      'frontend/components/AppBackground.jsx'
    ];
    for (const file of files) {
      const text = fs.readFileSync(path.join(root, file), 'utf8');
      expect(text).not.toMatch(/from\s+['"]three['"]/);
      expect(text).not.toMatch(/import\s+\w+\s+from\s+['"][^'"]*GeoSolid/);
      expect(text).not.toMatch(/import\s+\w+\s+from\s+['"][^'"]*FloatingLines/);
    }
    const css = fs.readFileSync(path.join(root, 'frontend/styles.css'), 'utf8');
    const solid = fs.readFileSync(path.join(root, 'frontend/components/GeoSolid.jsx'), 'utf8');
    expect(css).not.toContain('touch-action: none');
    expect(solid).not.toContain('touch-action: none');
    expect(solid).toContain("touchAction = 'pan-y'");
  });
});
