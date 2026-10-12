import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it } from 'vitest';
import { buildStamp } from '../buildStamp.mjs';
import { CHUNK_RELOAD_KEY } from '../frontend/chunkReload.js';
import { loadLazyModule } from '../frontend/lazyWithRetry.js';
import {
  UPDATE_GAP_MS,
  UPDATE_PENDING_KEY,
  UPDATE_POLL_MS,
  UPDATE_RELOAD_KEY,
  createUpdateController,
  fetchRemoteBuild,
  installAppUpdate,
  maybeApplyUpdate,
  noteRemoteBuild,
  reloadIfUpdatedBuild,
  routeBlocksUpdate
} from '../frontend/appUpdate.js';

const nodeRequire = createRequire(import.meta.url);
const { currentBuildId, readBuildFile } = nodeRequire('../backend/src/ops/buildId.js');
const BUILD_FILE = path.join(process.cwd(), 'frontend', 'dist', 'build-id.json');

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key)
  };
}

function withBuildFile(contents, fn) {
  mkdirSync(path.dirname(BUILD_FILE), { recursive: true });
  let previous = null;
  try {
    previous = readFileSync(BUILD_FILE, 'utf8');
  } catch {
    previous = null;
  }
  if (contents == null) rmSync(BUILD_FILE, { force: true });
  else writeFileSync(BUILD_FILE, contents);
  try {
    return fn();
  } finally {
    if (previous == null) rmSync(BUILD_FILE, { force: true });
    else writeFileSync(BUILD_FILE, previous);
  }
}

describe('id-ul de build', () => {
  afterEach(() => {
    delete process.env.BUILD_ID;
  });

  it('preferă BUILD_ID, apoi primele 12 caractere din GITHUB_SHA', () => {
    expect(buildStamp({ BUILD_ID: 'release-1', GITHUB_SHA: 'a'.repeat(40) })).toBe('release-1');
    expect(buildStamp({ GITHUB_SHA: '0123456789abcdef0123456789abcdef01234567' })).toBe(
      '0123456789ab'
    );
    expect(buildStamp({ BUILD_ID: 'are spațiu', GITHUB_SHA: 'scurt' })).toBe('dev');
    expect(buildStamp({})).toBe('dev');
  });

  it('în teste rămâne dev, iar fișierul din dist se citește separat', () => {
    withBuildFile(JSON.stringify({ build: 'fromfile12' }), () => {
      expect(currentBuildId()).toBe('dev');
      expect(readBuildFile()).toBe('fromfile12');
    });
    process.env.BUILD_ID = 'release-1';
    expect(currentBuildId()).toBe('release-1');
    withBuildFile('nu-i-json', () => expect(readBuildFile()).toBe(''));
    withBuildFile(JSON.stringify({ build: '../etc/passwd' }), () =>
      expect(readBuildFile()).toBe('')
    );
    withBuildFile(JSON.stringify({ build: 'a'.repeat(50) }), () => {
      expect(readBuildFile()).toBe('a'.repeat(40));
    });
  });

  it('în afara testelor publică id-ul scris la build', () => {
    withBuildFile(JSON.stringify({ build: 'fromfile12' }), () => {
      const result = spawnSync(
        process.execPath,
        ['-e', "process.stdout.write(require('./backend/src/ops/buildId.js').currentBuildId())"],
        {
          encoding: 'utf8',
          env: { ...process.env, NODE_ENV: 'production', VITEST: '', BUILD_ID: '' }
        }
      );
      expect(result.status).toBe(0);
      expect(result.stdout).toBe('fromfile12');
    });
  });

  it('vite pune același id în client și în dist/build-id.json', async () => {
    const { default: config } = await import('../vite.config.mjs');
    const plugin = config.plugins.find((item) => item && item.name === 'write-build-id');
    expect(config.define['import.meta.env.VITE_BUILD_ID']).toBe(JSON.stringify(buildStamp()));
    withBuildFile(null, () => {
      plugin.closeBundle();
      expect(JSON.parse(readFileSync(BUILD_FILE, 'utf8')).build).toBe(buildStamp());
    });
  });
});

describe('reîncărcare când s-a publicat o versiune nouă', () => {
  it('lasă calendarul și acasă, și ține lecția, testul și formularele', () => {
    expect(routeBlocksUpdate('#/calendar')).toBe(false);
    expect(routeBlocksUpdate('#/acasa')).toBe(false);
    expect(routeBlocksUpdate('#/lectii/matematica/6')).toBe(false);
    expect(routeBlocksUpdate('#/magazin')).toBe(false);
    expect(routeBlocksUpdate('#/lectii/matematica/6/naturale')).toBe(true);
    expect(routeBlocksUpdate('#/lectii/matematica/5/naturale/lectie-adunarea')).toBe(true);
    expect(routeBlocksUpdate('#/lectie-adunarea')).toBe(true);
    expect(routeBlocksUpdate('#/en')).toBe(true);
    expect(routeBlocksUpdate('#/conectare')).toBe(true);
    expect(routeBlocksUpdate('#/cont')).toBe(true);
    expect(routeBlocksUpdate('#/onboarding')).toBe(true);
    expect(routeBlocksUpdate('#/parola/token')).toBe(true);
    expect(routeBlocksUpdate('#/acord/token')).toBe(true);
    expect(routeBlocksUpdate('#/parinte')).toBe(true);
    expect(routeBlocksUpdate('#/nume-nou')).toBe(true);
  });

  it('reîncarcă o singură dată, la prima rută liberă', () => {
    const storage = memoryStorage();
    let reloads = 0;
    const reload = () => {
      reloads += 1;
    };
    expect(noteRemoteBuild('dev', 'dev', storage)).toBe(false);
    expect(storage.getItem(UPDATE_PENDING_KEY)).toBe(null);
    expect(noteRemoteBuild('abc123def456', 'dev', storage)).toBe(true);
    expect(
      maybeApplyUpdate({
        hash: '#/lectii/matematica/6/naturale',
        storage,
        clientBuild: 'dev',
        reload
      })
    ).toBe(false);
    expect(reloads).toBe(0);
    expect(storage.getItem(UPDATE_PENDING_KEY)).toBe('abc123def456');
    expect(maybeApplyUpdate({ hash: '#/calendar', storage, clientBuild: 'dev', reload })).toBe(
      true
    );
    expect(reloads).toBe(1);
    expect(storage.getItem(UPDATE_RELOAD_KEY)).toBe('abc123def456');
    expect(storage.getItem(UPDATE_PENDING_KEY)).toBe(null);

    storage.setItem(UPDATE_PENDING_KEY, 'abc123def456');
    expect(maybeApplyUpdate({ hash: '#/acasa', storage, clientBuild: 'dev', reload })).toBe(false);
    expect(reloads).toBe(1);
  });

  it('nu uită actualizarea dacă health nu răspunde, și nu întreabă mai des de 15s', async () => {
    const storage = memoryStorage();
    storage.setItem(UPDATE_PENDING_KEY, 'abc123def456');
    let fetches = 0;
    const controller = createUpdateController({
      storage,
      clientBuild: 'dev',
      reload() {},
      fetchImpl: async () => {
        fetches += 1;
        if (fetches === 1) throw new Error('offline');
        return { ok: true, json: async () => ({ build: 'abc123def456' }) };
      }
    });
    expect(await controller.check(1_000)).toBe(false);
    expect(storage.getItem(UPDATE_PENDING_KEY)).toBe('abc123def456');
    expect(await controller.check(1_000 + 1_000)).toBe(false);
    expect(fetches).toBe(1);
    expect(await controller.check(1_000 + UPDATE_GAP_MS)).toBe(true);
    expect(fetches).toBe(2);
    expect(await fetchRemoteBuild(async () => ({ ok: false }))).toBe('');
    expect(
      await fetchRemoteBuild(async () => {
        throw new Error('offline');
      })
    ).toBe('');
  });

  it('la eșec de chunk reîncarcă dacă serverul are alt build', async () => {
    const storage = memoryStorage();
    storage.setItem(UPDATE_PENDING_KEY, 'abc123def456');
    let calls = 0;
    let reloads = 0;
    const pending = loadLazyModule(
      () => {
        calls += 1;
        return Promise.reject(
          new TypeError('Cannot read properties of undefined (reading "default")')
        );
      },
      {
        storage,
        clientBuild: 'dev',
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
    expect(settled).toBe(false);
    expect(storage.getItem(UPDATE_RELOAD_KEY)).toBe('abc123def456');
    expect(storage.getItem(CHUNK_RELOAD_KEY)).toBe(null);

    const fresh = memoryStorage();
    let seenCache = '';
    calls = 0;
    reloads = 0;
    const fromHealth = loadLazyModule(
      () => {
        calls += 1;
        return Promise.reject(
          new Error('Failed to fetch dynamically imported module: /assets/x.js')
        );
      },
      {
        storage: fresh,
        clientBuild: 'oldbundle111',
        async fetch(url, options) {
          seenCache = options.cache;
          expect(url).toBe('/api/health');
          return { ok: true, json: async () => ({ build: 'abc123def456' }) };
        },
        reload() {
          reloads += 1;
        }
      }
    );
    fromHealth.then(
      () => {},
      () => {}
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(calls).toBe(2);
    expect(reloads).toBe(1);
    expect(seenCache).toBe('no-store');
    expect(fresh.getItem(UPDATE_RELOAD_KEY)).toBe('abc123def456');
    expect(fresh.getItem(CHUNK_RELOAD_KEY)).toBe(null);

    fresh.setItem(UPDATE_PENDING_KEY, 'abc123def456');
    calls = 0;
    const again = loadLazyModule(
      () => {
        calls += 1;
        return Promise.reject(
          new Error('Failed to fetch dynamically imported module: /assets/x.js')
        );
      },
      {
        storage: fresh,
        clientBuild: 'oldbundle111',
        reload() {
          reloads += 1;
        }
      }
    );
    again.then(
      () => {},
      () => {}
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(calls).toBe(2);
    expect(reloads).toBe(2);
    expect(fresh.getItem(CHUNK_RELOAD_KEY)).toBe('reloading');
  });

  it('verifică la revenirea în tab și reîncarcă din pushState', async () => {
    const storage = memoryStorage();
    const listeners = {};
    let reloads = 0;
    let fetches = 0;
    let intervals = 0;
    const realNow = Date.now;
    let now = 1_000_000;
    Date.now = () => now;
    const host = {
      sessionStorage: storage,
      location: {
        hash: '#/lectii/matematica/6/naturale',
        reload() {
          reloads += 1;
        }
      },
      document: { visibilityState: 'visible' },
      history: {
        pushState() {},
        replaceState() {}
      },
      fetch: async () => {
        fetches += 1;
        return { ok: true, json: async () => ({ build: 'abc123def456' }) };
      },
      setInterval(fn, ms) {
        intervals += 1;
        expect(fn).toEqual(expect.any(Function));
        expect(ms).toBe(UPDATE_POLL_MS);
        return intervals;
      },
      addEventListener(type, fn) {
        listeners[type] = fn;
      }
    };
    try {
      installAppUpdate(host);
      installAppUpdate(host);
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      expect(intervals).toBe(1);
      expect(fetches).toBe(1);
      expect(storage.getItem(UPDATE_PENDING_KEY)).toBe('abc123def456');
      expect(reloads).toBe(0);
      host.history.pushState();
      expect(reloads).toBe(0);

      host.location.hash = '#/calendar';
      host.history.pushState();
      expect(reloads).toBe(1);
      expect(storage.getItem(UPDATE_RELOAD_KEY)).toBe('abc123def456');

      now += UPDATE_GAP_MS;
      host.document.visibilityState = 'hidden';
      listeners.visibilitychange();
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      expect(fetches).toBe(1);
      host.document.visibilityState = 'visible';
      listeners.visibilitychange();
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      expect(fetches).toBe(2);
      listeners.focus();
      now += UPDATE_GAP_MS;
      listeners.focus();
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      expect(fetches).toBe(3);
      expect(host.history.__s10Wrapped).toBe(true);
    } finally {
      Date.now = realNow;
    }
  });

  it('reîncarcă din health chiar dacă ruta e ocupată, când chunk-ul nu există', async () => {
    const storage = memoryStorage();
    let reloads = 0;
    const updated = await reloadIfUpdatedBuild({
      storage,
      clientBuild: 'dev',
      reload() {
        reloads += 1;
      },
      fetchImpl: async () => ({ ok: true, json: async () => ({ build: 'abc123def456' }) })
    });
    expect(updated).toBe(true);
    expect(reloads).toBe(1);
    const again = await reloadIfUpdatedBuild({
      storage,
      clientBuild: 'dev',
      reload() {
        reloads += 1;
      },
      fetchImpl: async () => ({ ok: true, json: async () => ({ build: 'abc123def456' }) })
    });
    expect(again).toBe(false);
    expect(reloads).toBe(1);
  });
});
