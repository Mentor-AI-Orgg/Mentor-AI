import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const detail = nodeRequire('../backend/src/ops/clientErrorDetail.js');

describe('detalii raport browser', () => {
  it('lasă mesajul citibil și taie secretele', () => {
    const report = detail.sanitizeClientReport({
      message: 'ecran gol pentru copil@example.com token=abc 0722123456',
      name: 'TypeError',
      file: 'App.jsx',
      line: 4,
      column: 2,
      hash: '#/acasa',
      ua: 'Mozilla/5.0 Firefox/120.0',
      stack: '    at App (App.jsx:4:2)'
    });
    expect(report.message).toContain('ecran gol');
    expect(report.message).toContain('[email]');
    expect(report.message).toContain('token=[redactat]');
    expect(report.message).toContain('[telefon]');
    expect(report.message).not.toContain('copil@example.com');
    expect(report.ua).toBe('firefox');
    expect(report.hash).toBe('#/acasa');
  });

  it('recunoaște browserul și webview-ul, fără UA brut', () => {
    expect(detail.coarseUserAgent('Mozilla/5.0 Version/17.0 Safari/605.1.15')).toBe('safari');
    expect(detail.coarseUserAgent('Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0')).toBe('edge');
    expect(detail.coarseUserAgent('Mozilla/5.0 Chrome/120.0.0.0 Mobile Safari/537.36 Instagram 300')).toBe('chrome+inapp');
    expect(detail.coarseUserAgent('Mozilla/5.0 Version/17.0 Safari/605 Instagram')).toBe('safari+inapp');
    expect(detail.coarseUserAgent('chrome+inapp')).toBe('chrome+inapp');
    expect(detail.coarseUserAgent('necunoscut')).toBe('other');
    expect(detail.sanitizeHash('#/profil/parola')).toBe('#/profil/parola');
    expect(detail.sanitizeHash('#/parinte')).toBe('#/parinte');
    expect(detail.sanitizeHash('#/acord/token-secret')).toBe('#/acord/[redactat]');
    expect(detail.sanitizeHash('#/parinte/magic')).toBe('#/parinte/[redactat]');
  });
});
