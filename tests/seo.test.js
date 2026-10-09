import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

function read(relative) {
  return readFileSync(new URL(relative, import.meta.url), 'utf8');
}

function pngSize(buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

describe('seo', () => {
  it('robots.txt permite tot și indică sitemap-ul, nu pagina aplicației', async () => {
    const { app } = createApp({ autosave: false });
    const robots = await request(app).get('/robots.txt');
    expect(robots.status).toBe(200);
    expect(robots.headers['content-type']).toMatch(/text\/plain/);
    expect(robots.text).toContain('User-agent: *');
    expect(robots.text).toContain('Allow: /');
    expect(robots.text).toContain('Sitemap: https://suntde10.ro/sitemap.xml');
    expect(robots.text).not.toContain('Disallow: /');
    expect(robots.text).not.toContain('<html');
    expect(robots.text).not.toContain('id="root"');
  });

  it('sitemap.xml listează paginile publice ca XML', async () => {
    const { app } = createApp({ autosave: false });
    const sitemap = await request(app).get('/sitemap.xml');
    expect(sitemap.status).toBe(200);
    expect(sitemap.headers['content-type']).toMatch(/application\/xml/);
    expect(sitemap.text).toContain('<loc>https://suntde10.ro/</loc>');
    expect(sitemap.text).toContain('<loc>https://suntde10.ro/confidentialitate</loc>');
    expect(sitemap.text).toContain('<loc>https://suntde10.ro/termeni</loc>');
    expect(sitemap.text).not.toContain('<html');
    expect(sitemap.text).not.toContain('id="root"');
  });

  it('og.png e servit ca imagine 1200x630', async () => {
    const { app } = createApp({ autosave: false });
    const image = await request(app).get('/og.png').buffer(true).parse((res, callback) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => callback(null, Buffer.concat(chunks)));
    });
    expect(image.status).toBe(200);
    expect(image.headers['content-type']).toMatch(/image\/png/);
    expect(pngSize(image.body)).toEqual({ width: 1200, height: 630 });
  });

  it('index.html are canonical, carduri sociale, JSON-LD și text fără JavaScript', () => {
    const html = read('../frontend/index.html');
    expect(html).toContain('rel="canonical" href="https://suntde10.ro/"');
    expect(html).toContain('property="og:url" content="https://suntde10.ro/"');
    expect(html).toContain('property="og:image" content="https://suntde10.ro/og.png"');
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain('name="twitter:image" content="https://suntde10.ro/og.png"');
    expect(html).toMatch(/<meta name="description" content="[^"]*suntde10[^"]*"/);

    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(json).toBeTruthy();
    const data = JSON.parse(json[1]);
    const site = data['@graph'].find((node) => node['@type'] === 'WebSite');
    const product = data['@graph'].find((node) => [].concat(node['@type']).includes('EducationalApplication'));
    expect(site.name).toBe('Sunt de 10');
    expect(site.alternateName).toEqual(['suntde10', 'suntde10.ro', 'Sunt de 10 Zecița']);
    expect(site.url).toBe('https://suntde10.ro/');
    expect(product.name).toBe('Sunt de 10');
    expect(product.alternateName).toEqual(['suntde10', 'suntde10.ro', 'Sunt de 10 Zecița']);
    expect([].concat(product['@type'])).toEqual(expect.arrayContaining(['Organization', 'EducationalApplication']));

    expect(html).toContain('<h1>Sunt de 10 (suntde10)</h1>');
    expect(html).toContain('<noscript>');
    expect(html).toContain('class="seo-prerender"');
    expect(html).toContain('este aplicația gratuită de limba română și matematică');
  });
});
