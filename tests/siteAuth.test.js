import { describe, it, expect } from 'vitest';
import {
  ABORT_MESSAGE,
  encodeSiteAuth,
  humanizeFetchError,
  isAbortError,
  isSiteGateBody,
  readStoredSiteAuth,
  siteAuthHeaders,
  writeStoredSiteAuth
} from '../frontend/siteAuth.js';

describe('siteAuth', () => {
  it('detects Chrome abort text as a timeout, not a bad password', () => {
    const error = new Error('signal is aborted without reason');
    error.name = 'AbortError';
    expect(isAbortError(error)).toBe(true);
    expect(humanizeFetchError(error)).toBe(ABORT_MESSAGE);
    expect(humanizeFetchError(error)).not.toMatch(/signal is aborted/i);
  });

  it('treats the staging gate body as site auth, not a login failure', () => {
    expect(isSiteGateBody('Acces restricționat.')).toBe(true);
    expect(isSiteGateBody(JSON.stringify({ error: 'Email sau parolă incorecte.' }))).toBe(false);
  });

  it('stores Basic Auth for later API calls', () => {
    const storage = new Map();
    const fake = {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value)
    };
    writeStoredSiteAuth(fake, encodeSiteAuth('mentor', 'secret'));
    expect(readStoredSiteAuth(fake)).toBe(encodeSiteAuth('mentor', 'secret'));
    expect(siteAuthHeaders(fake).Authorization).toMatch(/^Basic /);
  });
});
