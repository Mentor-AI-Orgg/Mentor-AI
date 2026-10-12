// După un deploy, tabul vechi află id-ul nou și se reîncarcă la următoarea rută
// sigură. Nu întrerupe o lecție, un test sau un formular cu răspunsuri nesalvate.

import { parseAppHash } from './appRoutes.js';

export const UPDATE_PENDING_KEY = 's10-update-pending';
export const UPDATE_RELOAD_KEY = 's10-build-reload';
export const UPDATE_POLL_MS = 5 * 60 * 1000;
export const UPDATE_GAP_MS = 15 * 1000;

export const CLIENT_BUILD = String(import.meta.env.VITE_BUILD_ID || 'dev');

const FORM_SCREENS = new Set([
  'login',
  'register',
  'onboarding',
  'reset',
  'consent',
  'parent',
  'rename'
]);

function storageGet(storage, key) {
  try {
    return storage ? storage.getItem(key) : null;
  } catch {
    return null;
  }
}

function storageSet(storage, key, value) {
  try {
    if (storage) storage.setItem(key, value);
  } catch {
    /* modul privat */
  }
}

function storageRemove(storage, key) {
  try {
    if (storage) storage.removeItem(key);
  } catch {
    /* modul privat */
  }
}

export function routeBlocksUpdate(hash) {
  const route = parseAppHash(hash);
  if (FORM_SCREENS.has(route.screen)) return true;
  if (route.kind === 'anchor') return true;
  if (route.screen !== 'learn') return false;
  const extras = route.extras || {};
  return Boolean(extras.lessonId || extras.chapter || extras.track === 'en');
}

export function noteRemoteBuild(remote, clientBuild, storage) {
  const id = String(remote || '').trim();
  if (!id) return false;
  if (id === clientBuild) {
    storageRemove(storage, UPDATE_PENDING_KEY);
    return false;
  }
  storageSet(storage, UPDATE_PENDING_KEY, id);
  return true;
}

export function maybeApplyUpdate({ hash, storage, clientBuild, reload }) {
  const pending = storageGet(storage, UPDATE_PENDING_KEY);
  if (!pending) return false;
  if (pending === clientBuild) {
    storageRemove(storage, UPDATE_PENDING_KEY);
    return false;
  }
  if (storageGet(storage, UPDATE_RELOAD_KEY) === pending) return false;
  if (routeBlocksUpdate(hash)) return false;
  storageSet(storage, UPDATE_RELOAD_KEY, pending);
  storageRemove(storage, UPDATE_PENDING_KEY);
  if (typeof reload === 'function') reload();
  return true;
}

export async function fetchRemoteBuild(fetchImpl) {
  if (typeof fetchImpl !== 'function') return '';
  try {
    const response = await fetchImpl('/api/health', { cache: 'no-store' });
    if (!response || !response.ok) return '';
    const data = await response.json();
    return String((data && data.build) || '').trim();
  } catch {
    return '';
  }
}

export function createUpdateController({ storage, clientBuild, reload, fetchImpl }) {
  let lastCheck = 0;
  return {
    async check(at = Date.now()) {
      if (lastCheck && at - lastCheck < UPDATE_GAP_MS) return false;
      lastCheck = at;
      const remote = await fetchRemoteBuild(fetchImpl);
      return noteRemoteBuild(remote, clientBuild, storage);
    },
    onRoute(hash) {
      return maybeApplyUpdate({ hash, storage, clientBuild, reload });
    }
  };
}

export async function reloadIfUpdatedBuild({ storage, reload, fetchImpl, clientBuild }) {
  let remote = storageGet(storage, UPDATE_PENDING_KEY) || '';
  if (!remote) {
    remote = await fetchRemoteBuild(fetchImpl);
    if (remote) noteRemoteBuild(remote, clientBuild, storage);
  }
  if (!remote || remote === clientBuild) return false;
  if (storageGet(storage, UPDATE_RELOAD_KEY) === remote) return false;
  storageSet(storage, UPDATE_RELOAD_KEY, remote);
  storageRemove(storage, UPDATE_PENDING_KEY);
  if (typeof reload === 'function') reload();
  return true;
}

export function installAppUpdate(target) {
  const host = target || (typeof window !== 'undefined' ? window : null);
  if (!host || host.__s10AppUpdate || typeof host.addEventListener !== 'function') return;
  host.__s10AppUpdate = true;
  const controller = createUpdateController({
    storage: host.sessionStorage,
    clientBuild: CLIENT_BUILD,
    reload: () => host.location && host.location.reload(),
    fetchImpl: typeof host.fetch === 'function' ? host.fetch.bind(host) : null
  });
  const run = () => {
    controller.check().catch(() => {});
  };
  run();
  if (typeof host.setInterval === 'function') host.setInterval(run, UPDATE_POLL_MS);
  host.addEventListener('visibilitychange', () => {
    if (!host.document || host.document.visibilityState === 'visible') run();
  });
  host.addEventListener('focus', run);
  const onRoute = () => controller.onRoute(host.location && host.location.hash);
  host.addEventListener('hashchange', onRoute);
  host.addEventListener('popstate', onRoute);
  const history = host.history;
  if (history && !history.__s10Wrapped) {
    ['pushState', 'replaceState'].forEach((method) => {
      const original = history[method];
      if (typeof original !== 'function') return;
      history[method] = function wrappedHistory(...args) {
        const result = original.apply(this, args);
        onRoute();
        return result;
      };
    });
    history.__s10Wrapped = true;
  }
}
