import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'frontend/public/emblema.png');
const outDir = path.join(root, 'frontend/public/icons');
const NAVY = { r: 8, g: 20, b: 42, alpha: 1 };

async function icon(size, { scale = 1, opaque = false } = {}) {
  const inner = Math.max(1, Math.round(size * scale));
  const resized = await sharp(source)
    .resize(inner, inner, { fit: 'contain', background: NAVY })
    .png()
    .toBuffer();
  const composed = await sharp({
    create: { width: size, height: size, channels: 4, background: NAVY }
  }).composite([{ input: resized, gravity: 'centre' }]).png().toBuffer();
  if (!opaque) return composed;
  return sharp(composed).flatten({ background: '#08142A' }).png().toBuffer();
}

await mkdir(outDir, { recursive: true });

const files = [
  ['icon-192.png', await icon(192)],
  ['icon-512.png', await icon(512)],
  ['icon-maskable-512.png', await icon(512, { scale: 0.8 })],
  ['apple-touch-icon.png', await icon(180, { opaque: true })],
  ['favicon-32.png', await icon(32)]
];

await Promise.all(files.map(([name, data]) => writeFile(path.join(outDir, name), data)));

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <image width="32" height="32" href="data:image/png;base64,${files[4][1].toString('base64')}"/>
</svg>
`;
await writeFile(path.join(outDir, 'favicon.svg'), svg);
console.log('icons written to frontend/public/icons');
