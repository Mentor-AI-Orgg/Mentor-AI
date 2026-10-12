import { describe, expect, it } from 'vitest';
import {
  CHUNK_RELOAD_KEY,
  isChunkLoadError,
  noteChunkReloadBoot,
  reloadOnceForChunk
} from '../frontend/chunkReload.js';

function memoryStorage() {
  const data = new Map();
  return {
    getItem: key => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value))
  };
}

describe('reîncărcare după un chunk vechi', () => {
  it('recunoaște eșecul de import din Chrome, Firefox și Safari', () => {
    expect(isChunkLoadError(new Error('Failed to fetch dynamically imported module: https://suntde10.ro/assets/LearnScreen-abc.js'))).toBe(true);
    expect(isChunkLoadError(new Error('error loading dynamically imported module: /assets/ShopScreen-def.js'))).toBe(true);
    expect(isChunkLoadError(new Error('Importing a module script failed.'))).toBe(true);
    expect(isChunkLoadError(new Error('Unable to preload CSS for /assets/index-ghi.css'))).toBe(true);
    expect(isChunkLoadError({ name: 'ChunkLoadError', message: 'Loading chunk 7 failed.' })).toBe(true);
    expect(isChunkLoadError(new TypeError('Cannot read properties of undefined (reading "default")'))).toBe(true);
    expect(isChunkLoadError(new TypeError("undefined is not an object (evaluating 'mod.default')"))).toBe(true);
    expect(isChunkLoadError(new Error('Autentificare necesară.'))).toBe(false);
    expect(isChunkLoadError(new TypeError('Failed to fetch'))).toBe(false);
  });

  it('reîncarcă o dată, apoi lasă eroarea vizibilă', () => {
    const storage = memoryStorage();
    let reloads = 0;
    expect(reloadOnceForChunk(storage, () => { reloads += 1; })).toBe(true);
    expect(reloads).toBe(1);
    expect(storage.getItem(CHUNK_RELOAD_KEY)).toBe('reloading');
    expect(reloadOnceForChunk(storage, () => { reloads += 1; })).toBe(true);
    expect(reloads).toBe(1);

    noteChunkReloadBoot(storage);
    expect(storage.getItem(CHUNK_RELOAD_KEY)).toBe('done');
    expect(reloadOnceForChunk(storage, () => { reloads += 1; })).toBe(false);
    expect(reloads).toBe(1);
  });
});
