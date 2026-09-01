import { describe, it, expect } from 'vitest';
import { ATLAS, listGeometryAtlas, figureIds } from '../backend/src/data/geometryAtlas.js';
import { getGuide } from '../backend/src/data/gimnaziuGuide.js';
import { getBundle, scoreAttempt } from '../backend/src/data/enPaperFactory.js';

describe('geometry atlas and EN subject III', () => {
  it('covers plane and space figures from the gimnaziu program', () => {
    const ids = figureIds();
    expect(ids.length).toBeGreaterThanOrEqual(36);
    [
      'square', 'rectangle', 'rhombus', 'parallelogram', 'trapezoid',
      'triangle-right', 'triangle-equilateral', 'circle', 'hexagon',
      'cube', 'box3d', 'prism-tri', 'pyramid', 'tetrahedron',
      'cylinder', 'cone', 'frustum', 'sphere', 'planes'
    ].forEach(id => {
      expect(ids).toContain(id);
    });
    ATLAS.forEach(entry => {
      expect(entry.name.length).toBeGreaterThan(2);
      expect(entry.formulas.length).toBeGreaterThan(0);
      expect(entry.info.length).toBeGreaterThan(20);
      expect(['plane', 'space']).toContain(entry.kind);
    });
    const full = listGeometryAtlas(8);
    expect(full.plane.length).toBeGreaterThanOrEqual(20);
    expect(full.space.length).toBeGreaterThanOrEqual(12);
    const grade5 = listGeometryAtlas(5);
    expect(grade5.all.every(entry => entry.fromGrade <= 5)).toBe(true);
    expect(getGuide('matematica', 7).atlas.plane.some(entry => entry.id === 'rhombus')).toBe(true);
  });

  it('scores Subject III by result only and then exposes the full solution', () => {
    const ok = scoreAttempt('en-mate-a', [
      { block: 'Subiectul III', n: 5, parts: { a: '10 cm', b: '24' } },
      { block: 'Subiectul III', n: 6, parts: { a: '236 cm²', b: '240 cm³' } }
    ]);
    const items = ok.items.filter(item => item.kind === 'en-parts' && (item.n === 5 || item.n === 6));
    expect(items).toHaveLength(2);
    expect(items.every(item => item.ok)).toBe(true);
    expect(items[0].points).toBe(5);
    expect(items[0].solution).toMatch(/Pitagora|catet/i);
    expect(items[1].solution).toMatch(/volum|236|240/i);

    const miss = scoreAttempt('en-mate-a', [
      { block: 'Subiectul III', n: 5, parts: { a: '14', b: '24' } }
    ]);
    const first = miss.items.find(item => item.n === 5 && item.kind === 'en-parts');
    expect(first.ok).toBe(false);
    expect(first.points).toBe(3);
    expect(first.parts[0].ok).toBe(false);
    expect(first.parts[1].ok).toBe(true);

    const publicPaper = getBundle('en-mate-a').public;
    expect(JSON.stringify(publicPaper)).not.toMatch(/Rezolvare completă|BC² = AB²/);
  });
});
