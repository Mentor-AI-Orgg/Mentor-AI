// După un deploy, un tab deschis cere încă fișierele vechi, cu hash.
// Reîncărcăm o singură dată ca să luăm indexul nou. A doua oară rămâne ecranul de eroare.

export const CHUNK_RELOAD_KEY = 's10-chunk-reload';

export function isChunkLoadError(error) {
  const name = String(error && error.name || '');
  const message = String(error && (error.message || error) || '');
  if (name === 'ChunkLoadError') return true;
  return /Failed to fetch dynamically imported module/i.test(message)
    || /error loading dynamically imported module/i.test(message)
    || /Importing a module script failed/i.test(message)
    || /Unable to preload CSS/i.test(message)
    || /Loading chunk [\w-]+ failed/i.test(message);
}

export function noteChunkReloadBoot(storage) {
  if (!storage) return;
  try {
    if (storage.getItem(CHUNK_RELOAD_KEY) === 'reloading') {
      storage.setItem(CHUNK_RELOAD_KEY, 'done');
    }
  } catch {
    /* modul privat poate bloca sessionStorage */
  }
}

export function reloadOnceForChunk(storage, reload) {
  if (!storage) return false;
  try {
    const state = storage.getItem(CHUNK_RELOAD_KEY);
    if (state === 'done') return false;
    if (state === 'reloading') return true;
    storage.setItem(CHUNK_RELOAD_KEY, 'reloading');
  } catch {
    return false;
  }
  if (typeof reload === 'function') reload();
  return true;
}

export function installChunkReload() {
  if (typeof window === 'undefined') return;
  noteChunkReloadBoot(window.sessionStorage);
  window.addEventListener('vite:preloadError', (event) => {
    const started = reloadOnceForChunk(window.sessionStorage, () => window.location.reload());
    if (started) event.preventDefault();
  });
}
