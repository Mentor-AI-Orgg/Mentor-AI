import { mkdirSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import { mascotSvg } from '../shared/mascotArt.js';

const dir = new URL('../frontend/public/icons/', import.meta.url);
mkdirSync(dir, { recursive: true });

const inner = mascotSvg({ mood: 'salut', size: 'sm' })
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '');

function frame(size, pad) {
  const scale = (size - pad * 2) / 64;
  const y = (size - 40 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#08142A"/>
    <g transform="translate(${pad} ${y}) scale(${scale})">${inner}</g>
  </svg>`;
}

function writePng(svg, name) {
  const png = new Resvg(svg).render().asPng();
  writeFileSync(new URL(name, dir), png);
}

writePng(frame(192, 28), 'icon-192.png');
writePng(frame(512, 70), 'icon-512.png');
writePng(frame(512, 128), 'icon-maskable-512.png');
writePng(frame(180, 24), 'apple-touch-icon.png');
writePng(frame(32, 2), 'favicon-32.png');
writeFileSync(new URL('favicon.svg', dir), frame(32, 2));
console.log('iconițe scrise în frontend/public/icons');
