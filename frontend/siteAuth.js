const SITE_AUTH_KEY = 'mentor_site_auth';

export const SITE_GATE_MESSAGE =
  'Site-ul cere o parolă de acces (cea din DirectAdmin, nu parola contului). Completează fereastra browserului sau introdu-o aici, apoi conectează-te din nou.';

export const ABORT_MESSAGE =
  'Conectarea s-a întrerupt. Browserul aștepta parola de acces a site-ului și cererea a expirat. Completează fereastra „Sign in” (userul și parola de staging), apoi apasă din nou Conectează-te.';

export const isAbortError = error =>
  Boolean(error) && (error.name === 'AbortError' || /signal is aborted/i.test(String(error.message || '')));

export const humanizeFetchError = error => {
  if (isAbortError(error)) return ABORT_MESSAGE;
  return error?.message || 'Cererea a eșuat.';
};

export const isSiteGateBody = text => /acces restricționat/i.test(String(text || ''));

export const encodeSiteAuth = (user, password) => {
  const pair = `${String(user)}:${String(password)}`;
  if (typeof btoa === 'function') return btoa(pair);
  return globalThis.Buffer.from(pair, 'utf8').toString('base64');
};

export const readStoredSiteAuth = storage => {
  try {
    return storage?.getItem?.(SITE_AUTH_KEY) || '';
  } catch {
    return '';
  }
};

export const writeStoredSiteAuth = (storage, token) => {
  try {
    storage?.setItem?.(SITE_AUTH_KEY, token);
    return true;
  } catch {
    return false;
  }
};

export const siteAuthHeaders = storage => {
  const token = readStoredSiteAuth(storage);
  return token ? { Authorization: `Basic ${token}` } : {};
};

export const askAndStoreSiteAuth = storage => {
  if (typeof window === 'undefined' || typeof window.prompt !== 'function') return false;
  const user = window.prompt('Userul de acces al site-ului (STAGING_AUTH_USER din DirectAdmin, nu emailul de elev):');
  if (!user) return false;
  const password = window.prompt('Parola de acces a site-ului (STAGING_AUTH_PASSWORD):');
  if (password == null || password === '') return false;
  return writeStoredSiteAuth(storage, encodeSiteAuth(user.trim(), password));
};
