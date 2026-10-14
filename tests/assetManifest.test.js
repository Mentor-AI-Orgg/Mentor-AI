import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const assets = nodeRequire('../backend/src/ops/assetManifest.js');

describe('manifestul bundle-ului curent', () => {
  const previous = process.env.ASSET_MANIFEST_PATH;

  afterEach(() => {
    assets.setAssetManifestForTests(undefined);
    if (previous === undefined) delete process.env.ASSET_MANIFEST_PATH;
    else process.env.ASSET_MANIFEST_PATH = previous;
  });

  it('citește fișierele build-ului servit și ignoră un manifest vechi', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'assets-'));
    const file = path.join(dir, 'asset-manifest.json');
    process.env.ASSET_MANIFEST_PATH = file;
    fs.writeFileSync(
      file,
      JSON.stringify({
        build: 'dev',
        files: ['index-abc.js', 'react-DXcH-vAE.js', '../etc/passwd', 'nume rau.js']
      })
    );
    expect([...assets.currentAssetNames()].sort()).toEqual(['index-abc.js', 'react-DXcH-vAE.js']);

    fs.writeFileSync(file, JSON.stringify({ build: 'oldbuild99', files: ['index-abc.js'] }));
    expect([...assets.currentAssetNames()]).toEqual([]);
  });
});
