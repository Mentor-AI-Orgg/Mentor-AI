import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { parseMath } from '../frontend/mathNotation.js';

const require = createRequire(import.meta.url);

function show(nodes) {
  return nodes.map(node => {
    if (node.kind === 'text') return node.value;
    if (node.kind === 'math') return show(parseMath(node.value));
    if (node.kind === 'group') return `(${show(parseMath(node.inner))})`;
    if (node.kind === 'frac') {
      const body = `{${show([node.num])}|${show([node.den])}}`;
      return node.sign ? `${node.sign}${body}` : body;
    }
    if (node.kind === 'pow') {
      const body = `(${show([node.base])})^${node.exp}`;
      return node.sign ? `${node.sign}${body}` : body;
    }
    return '';
  }).join('');
}

const draw = text => show(parseMath(text));

describe('math notation', () => {
  it('stacks a simple fraction and leaves the sentence around it', () => {
    expect(draw('O fracție 3/8 este subunitară.')).toBe('O fracție {3|8} este subunitară.');
  });

  it('draws a power and a fraction of powers', () => {
    expect(draw('(a/b)^n = a^n / b^n')).toBe('({a|b})^n = {(a)^n|(b)^n}');
    expect(draw('10^3')).toBe('(10)^3');
    expect(draw('1/(10^n)')).toBe('{1|(10)^n}');
  });

  it('keeps words, abbreviations and spaced subtraction', () => {
    expect(draw('pentru/sau și km/h')).toBe('pentru/sau și km/h');
    expect(draw('c.m.m.d.c.(12, 18) = 6')).toBe('c.m.m.d.c.(12, 18) = 6');
    expect(draw('5 − 1/6')).toBe('5 − {1|6}');
    expect(draw('http://exemplu')).toBe('http://exemplu');
  });

  it('puts the minus on a negative fraction and keeps mixed expressions', () => {
    expect(draw('−3/4')).toBe('−{3|4}');
    expect(draw('(p·a)/(p·b)')).toBe('{p·a|p·b}');
    expect(draw('(1/2 + 1/4) · 2')).toBe('({1|2} + {1|4}) · 2');
    expect(draw('(a + b)/n')).toBe('{a + b|n}');
  });

  it('does not turn lesson words into fractions', () => {
    const { FRACTII_LESSONS } = require('../backend/src/data/mate5Fractii.js');
    const { NATURALE_LESSONS } = require('../backend/src/data/mate5Naturale.js');
    const sides = [];
    let fractions = 0;
    const visit = node => {
      if (!node || node.kind !== 'frac') return;
      fractions += 1;
      [node.num, node.den].forEach(side => {
        if (side.kind === 'text' || side.kind === 'math') sides.push(side.value || '');
        if (side.kind === 'group') sides.push(side.inner || '');
        if (side.kind === 'math' || side.kind === 'group') parseMath(side.value || side.inner).forEach(visit);
        if (side.kind === 'frac' || side.kind === 'pow') visit(side.kind === 'pow' ? side.base : side);
      });
    };
    [...FRACTII_LESSONS, ...NATURALE_LESSONS].forEach(lesson => {
      ['theory', 'example', 'practice', 'mistakes', 'tryThis', 'recap', ...(lesson.formulas || [])].forEach(field => {
        const text = lesson[field] === undefined ? field : lesson[field];
        if (typeof text === 'string') parseMath(text).forEach(visit);
      });
    });
    const words = sides.filter(side => /[A-Za-zăâîșțĂÂÎȘȚ]{2,}/.test(side));
    expect(words).toEqual([]);
    expect(fractions).toBeGreaterThan(20);
  });
});
