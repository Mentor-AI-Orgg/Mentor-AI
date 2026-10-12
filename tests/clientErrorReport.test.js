import { afterEach, describe, expect, it } from 'vitest';
import {
  CLIENT_BURST_MS,
  CLIENT_DEDUPE_MS,
  clientErrorPayload,
  handleWindowError,
  installClientErrorReporting,
  reportClientError,
  resetClientErrorReporting
} from '../frontend/clientErrorReport.js';

afterEach(() => {
  resetClientErrorReporting();
});

function callsOf() {
  const calls = [];
  const fetchImpl = (_url, opts) => {
    calls.push(JSON.parse(opts.body));
    return Promise.resolve({ ok: true });
  };
  return { calls, fetchImpl };
}

describe('raport unic din browser', () => {
  it('trimite o dată perechea limită + onerror și păstrează componenta', () => {
    const { calls, fetchImpl } = callsOf();
    const error = new Error('removeChild copil@example.com');
    error.name = 'NotFoundError';
    error.stack = [
      'NotFoundError: removeChild',
      '    at commitDeletion (https://suntde10.ro/assets/index-5tdgxzoN.js:41:120)',
      '    at commitMutationEffects (https://suntde10.ro/assets/index-5tdgxzoN.js:39:80)'
    ].join('\n');
    const sent = reportClientError(error, {
      componentStack: '\n    at HomeScreen (https://suntde10.ro/assets/HomeScreen-abc.js:10:2)\n    at App',
      hash: '#/parola/super-secret-token',
      ua: 'Mozilla/5.0 Chrome/120.0.0.0 Mobile Safari/537.36 [FBAN/FB4A;FBAV/1]'
    }, { fetch: fetchImpl, now: 1000 });
    expect(sent).toBe(true);

    const host = {};
    const again = handleWindowError({
      target: host,
      currentTarget: host,
      message: error.message,
      error,
      filename: 'https://suntde10.ro/assets/index-5tdgxzoN.js',
      lineno: 39,
      colno: 8
    }, { fetch: fetchImpl, now: 1000 + 1 });
    expect(again).toBe(false);
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe('NotFoundError');
    expect(calls[0].message).toContain('removeChild');
    expect(calls[0].message).toContain('[email]');
    expect(calls[0].message).not.toContain('copil@example.com');
    expect(calls[0].file).toBe('index-5tdgxzoN.js');
    expect(calls[0].line).toBe(41);
    expect(calls[0].column).toBe(120);
    expect(calls[0].hash).toBe('#/parola/[redactat]');
    expect(calls[0].ua).toBe('chrome+inapp');
    expect(calls[0].stack).toContain('HomeScreen-abc.js');
    expect(calls[0].stack).toContain('at App');
    expect(JSON.stringify(calls[0])).not.toContain('super-secret-token');
    expect(JSON.stringify(calls[0])).not.toContain('FBAN');
    expect(JSON.stringify(calls[0])).not.toContain('https://');
  });

  it('ține minte același mesaj două secunde, nu o eroare diferită', () => {
    const { calls, fetchImpl } = callsOf();
    const error = new Error('removeChild');
    error.name = 'NotFoundError';
    reportClientError(error, {}, { fetch: fetchImpl, now: 5000 });
    reportClientError(error, {}, { fetch: fetchImpl, now: 5000 + CLIENT_BURST_MS + 10 });
    expect(calls).toHaveLength(1);
    reportClientError(new Error('alt ecran'), {}, { fetch: fetchImpl, now: 5000 + CLIENT_BURST_MS + 20 });
    expect(calls).toHaveLength(2);
    reportClientError(error, {}, { fetch: fetchImpl, now: 5000 + CLIENT_DEDUPE_MS });
    expect(calls).toHaveLength(3);
  });

  it('ignoră resursele și chunk-ul pe window, dar limita poate raporta chunk-ul', () => {
    const { calls, fetchImpl } = callsOf();
    const host = {};
    expect(handleWindowError({
      target: {},
      currentTarget: host,
      message: 'imagine',
      filename: 'https://suntde10.ro/logo.png'
    }, { fetch: fetchImpl, now: 1 })).toBe(false);
    const chunk = new Error('Failed to fetch dynamically imported module: https://suntde10.ro/assets/Learn-abc.js');
    expect(handleWindowError({
      target: host,
      currentTarget: host,
      message: chunk.message,
      error: chunk,
      filename: 'https://suntde10.ro/assets/index.js',
      lineno: 2,
      colno: 3
    }, { fetch: fetchImpl, now: 2 })).toBe(false);
    expect(calls).toHaveLength(0);
    expect(reportClientError(chunk, {}, { fetch: fetchImpl, now: 3 })).toBe(true);
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe('Error');
    expect(calls[0].message).not.toContain('https://');
  });

  it('agăță o singură dată listener-ul de erori', () => {
    const listeners = [];
    const host = {
      addEventListener(type, fn) {
        listeners.push([type, fn]);
      }
    };
    installClientErrorReporting(host);
    installClientErrorReporting(host);
    expect(listeners).toEqual([['error', handleWindowError]]);
  });

  it('păstrează fișierul din primul cadru când lipsește componenta', () => {
    const payload = clientErrorPayload({
      name: 'Error',
      message: 'ecran gol',
      stack: '    at render (HomeScreen.jsx:12:4)'
    }, { hash: '#/acasa', ua: 'Mozilla/5.0 Version/17 Safari/605' });
    expect(payload.file).toBe('HomeScreen.jsx');
    expect(payload.line).toBe(12);
    expect(payload.column).toBe(4);
    expect(payload.hash).toBe('#/acasa');
    expect(payload.ua).toBe('safari');
  });
});