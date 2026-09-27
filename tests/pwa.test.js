import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '..');

describe('aplicația pe telefon', () => {
  it('manifestul e valid și iconițele există', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(root, 'frontend/public/manifest.webmanifest'), 'utf8'));
    expect(manifest.name).toBe('Sunt de 10');
    expect(manifest.short_name).toBe('Sunt de 10');
    expect(manifest.lang).toBe('ro');
    expect(manifest.display).toBe('standalone');
    expect(manifest.orientation).toBe('portrait');
    expect(manifest.background_color).toBe('#08142A');
    expect(manifest.theme_color).toBe('#08142A');
    expect(manifest.start_url).toBe('/');
    for (const icon of manifest.icons) {
      const file = path.join(root, 'frontend/public', icon.src);
      expect(fs.existsSync(file)).toBe(true);
    }
    expect(fs.existsSync(path.join(root, 'frontend/public/icons/apple-touch-icon.png'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'frontend/public/icons/favicon.svg'))).toBe(true);
  });

  it('service worker-ul nu cache-uiește datele copilului', () => {
    const sw = fs.readFileSync(path.join(root, 'frontend/public/sw.js'), 'utf8');
    expect(sw).toContain("path.startsWith('/api/')");
    expect(sw).toContain('sd10-static-v1');
    expect(sw).toContain('cache.put');
    expect(sw).not.toMatch(/cache\.put\([\s\S]{0,80}\/api\//);
    const staticFn = sw.slice(sw.indexOf('function isStaticAsset'), sw.indexOf('function shouldHandle'));
    expect(staticFn).toContain('/assets/');
    expect(staticFn).not.toContain('/api/');
  });

  it('fiecare 100vh are rezervă dvh pe linia următoare', () => {
    const css = fs.readFileSync(path.join(root, 'frontend/styles.css'), 'utf8').split('\n');
    for (let i = 0; i < css.length; i += 1) {
      if (!css[i].includes('100vh')) continue;
      expect(css[i + 1] || '').toMatch(/100dvh/);
    }
    expect(css.join('\n')).toContain('58dvh');
    expect(css.join('\n')).toContain('40dvh');
  });
});
