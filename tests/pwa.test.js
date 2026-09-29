import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

function read(relative) {
  return readFileSync(new URL(relative, import.meta.url), 'utf8');
}

function pngInfo(relative) {
  const buf = readFileSync(new URL(relative, import.meta.url));
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
    colorType: buf[25]
  };
}

describe('pwa', () => {
  it('manifestul descrie Sunt de 10 și iconițele de pe ecran', () => {
    const manifest = JSON.parse(read('../frontend/public/manifest.webmanifest'));
    expect(manifest.name).toBe('Sunt de 10');
    expect(manifest.short_name).toBe('Sunt de 10');
    expect(manifest.lang).toBe('ro');
    expect(manifest.id).toBe('/');
    expect(manifest.start_url).toBe('/');
    expect(manifest.scope).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.orientation).toBe('portrait');
    expect(manifest.background_color).toBe('#08142A');
    expect(manifest.theme_color).toBe('#08142A');
    expect(manifest.icons.map((icon) => `${icon.sizes}:${icon.purpose}`)).toEqual([
      '192x192:any',
      '512x512:any',
      '512x512:maskable'
    ]);
    expect(pngInfo('../frontend/public/icons/icon-192.png')).toMatchObject({ width: 192, height: 192 });
    expect(pngInfo('../frontend/public/icons/icon-512.png')).toMatchObject({ width: 512, height: 512 });
    expect(pngInfo('../frontend/public/icons/icon-maskable-512.png')).toMatchObject({ width: 512, height: 512 });
    expect(pngInfo('../frontend/public/icons/apple-touch-icon.png')).toEqual({ width: 180, height: 180, colorType: 2 });
    expect(pngInfo('../frontend/public/icons/favicon-32.png')).toMatchObject({ width: 32, height: 32 });
    expect(read('../frontend/public/icons/favicon.svg')).toContain('data:image/png;base64,');
  });

  it('service worker-ul lasă /api/ în pace și salvează doar fișiere statice', () => {
    const sw = read('../frontend/public/sw.js');
    expect(sw).toContain('const DISABLE = false');
    expect(sw).toContain("const CACHE = 'sd10-static-v1'");
    expect(sw).toContain("path.startsWith('/api/')");
    expect(sw).toContain("path.startsWith('/parinte')");
    expect(sw).toContain("path.startsWith('/creator')");
    expect(sw).toContain('Set-Cookie');
    expect(sw).toContain('Authorization');
    const puts = sw.match(/cache\.put/g) || [];
    expect(puts).toHaveLength(1);
    const putAt = sw.indexOf('cache.put');
    const guard = sw.slice(Math.max(0, putAt - 450), putAt);
    expect(guard).toContain('isStaticAsset');
    expect(guard).toContain('status !== 200');
    expect(guard).toContain('Set-Cookie');
    expect(read('../frontend/public/offline.html')).toContain(
      'Nu ai internet acum. Lecțiile se încarcă din nou când revine conexiunea.'
    );
    expect(read('../backend/src/middleware/comingSoon.js')).not.toContain('sw.js');
  });

  it('înălțimea 100vh are perechea dvh imediat după', () => {
    const css = read('../frontend/styles.css');
    const matches = [...css.matchAll(/(\d+)vh/g)].filter((match) => css[match.index - 1] !== 'd');
    expect(matches.length).toBeGreaterThan(0);
    for (const match of matches) {
      const after = css.slice(match.index, match.index + 160);
      expect(after).toContain(`${match[1]}dvh`);
    }
  });

  it('pagina principală poate fi instalată, fără zoom blocat', () => {
    const html = read('../frontend/index.html');
    expect(html).toContain('viewport-fit=cover');
    expect(html).not.toContain('maximum-scale');
    expect(html).not.toContain('user-scalable');
    expect(html).toContain('rel="manifest" href="/manifest.webmanifest"');
    expect(html).toContain('name="theme-color" content="#08142A"');
    expect(html).toContain('content="#F7F9FC"');
    expect(html).toContain('apple-mobile-web-app-title');
    expect(html).toContain('Sunt de 10');
    expect(html).toContain('class="min-h-dvh"');
    const main = read('../frontend/main.jsx');
    expect(main).toContain('import.meta.env.PROD');
    expect(main).toContain("register('/sw.js')");
    expect(main).toContain('Există o versiune nouă. Reîncarcă');
    expect(main).toContain("addEventListener('click'");
    const app = read('../backend/src/app.js');
    expect(app).toContain('rel === "sw.js" || rel === "manifest.webmanifest"');
    expect(app).toContain('immutable');
  });
});
