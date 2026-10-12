import { describe, expect, it } from 'vitest';
import { CHUNK_RELOAD_KEY } from '../frontend/chunkReload.js';
import { loadLazyModule } from '../frontend/lazyWithRetry.js';
import { manualChunk } from '../manualChunks.mjs';

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value))
  };
}

describe('import lazy cu o reîncercare', () => {
  it('ține React într-un singur chunk, nu și restul aplicației', () => {
    expect(manualChunk('/workspace/node_modules/react/index.js')).toBe('react');
    expect(manualChunk('/workspace/node_modules/react/jsx-runtime.js')).toBe('react');
    expect(manualChunk('/workspace/node_modules/react-dom/client.js')).toBe('react');
    expect(manualChunk('/workspace/node_modules/scheduler/index.js')).toBe('react');
    expect(manualChunk('/workspace/node_modules/@sentry/react/esm/index.js')).toBeUndefined();
    expect(manualChunk('/workspace/frontend/screens/LearnScreen.jsx')).toBeUndefined();
  });

  it('reușește din prima când modulul are default', async () => {
    const screen = () => null;
    let calls = 0;
    const mod = await loadLazyModule(
      () => {
        calls += 1;
        return Promise.resolve({ default: screen });
      },
      { storage: memoryStorage(), reload() {} }
    );
    expect(calls).toBe(1);
    expect(mod.default).toBe(screen);
  });

  it('încearcă încă o dată după un chunk gol, apoi reîncarcă o singură dată', async () => {
    const storage = memoryStorage();
    let calls = 0;
    let reloads = 0;
    const screen = () => null;
    const mod = await loadLazyModule(
      () => {
        calls += 1;
        if (calls === 1) return Promise.resolve(undefined);
        return Promise.resolve({ default: screen });
      },
      {
        storage,
        reload() {
          reloads += 1;
        }
      }
    );
    expect(mod.default).toBe(screen);
    expect(calls).toBe(2);
    expect(reloads).toBe(0);

    calls = 0;
    const pending = loadLazyModule(
      () => {
        calls += 1;
        return Promise.reject(
          new TypeError('Cannot read properties of undefined (reading "default")')
        );
      },
      {
        storage,
        reload() {
          reloads += 1;
        }
      }
    );
    let settled = false;
    pending.then(
      () => {
        settled = true;
      },
      () => {
        settled = true;
      }
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(calls).toBe(2);
    expect(reloads).toBe(1);
    expect(storage.getItem(CHUNK_RELOAD_KEY)).toBe('reloading');
    expect(settled).toBe(false);

    const done = memoryStorage();
    done.setItem(CHUNK_RELOAD_KEY, 'done');
    await expect(
      loadLazyModule(
        () =>
          Promise.reject(
            new TypeError('Failed to fetch dynamically imported module: /assets/LearnScreen.js')
          ),
        {
          storage: done,
          reload() {
            reloads += 1;
          }
        }
      )
    ).rejects.toThrow(/dynamically imported module/);
    expect(reloads).toBe(1);
  });

  it('nu reîncearcă o eroare care nu e de încărcare', async () => {
    let calls = 0;
    await expect(
      loadLazyModule(
        () => {
          calls += 1;
          return Promise.reject(new Error('Autentificare necesară.'));
        },
        {
          storage: memoryStorage(),
          reload() {
            throw new Error('nu reîncărca');
          }
        }
      )
    ).rejects.toThrow(/Autentificare/);
    expect(calls).toBe(1);
  });
});
