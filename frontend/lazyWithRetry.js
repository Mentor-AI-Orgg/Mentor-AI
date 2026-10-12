// Un import lazy eșuat (chunk vechi, sau modul fără .default) se încearcă
// încă o dată. Dacă pică și a doua oară, reîncărcăm pagina o singură dată.

import { lazy } from 'react';
import { isChunkLoadError, reloadOnceForChunk } from './chunkReload.js';

function defaultReload() {
  if (typeof window !== 'undefined' && window.location) window.location.reload();
}

export function loadLazyModule(importer, options = {}) {
  const load = () =>
    Promise.resolve()
      .then(importer)
      .then((mod) => {
        if (!mod || mod.default == null) {
          const error = new TypeError('Cannot read properties of undefined (reading "default")');
          error.name = 'ChunkLoadError';
          throw error;
        }
        return mod;
      });
  const again = (error) => {
    if (!isChunkLoadError(error)) throw error;
    return load();
  };
  return load()
    .catch(again)
    .catch((error) => {
      if (!isChunkLoadError(error)) throw error;
      const storage = Object.prototype.hasOwnProperty.call(options, 'storage')
        ? options.storage
        : typeof sessionStorage !== 'undefined'
          ? sessionStorage
          : null;
      const reload = Object.prototype.hasOwnProperty.call(options, 'reload')
        ? options.reload
        : defaultReload;
      if (reloadOnceForChunk(storage, reload)) return new Promise(() => {});
      throw error;
    });
}

export function lazyWithRetry(importer) {
  return lazy(() => loadLazyModule(importer));
}
