// Același id în bundle-ul din browser și în fișierul citit de server după deploy.

export function buildStamp(env = process.env) {
  const explicit = String(env.BUILD_ID || '').trim();
  if (/^[A-Za-z0-9._-]{1,40}$/.test(explicit)) return explicit;
  const sha = String(env.GITHUB_SHA || '').trim();
  if (/^[A-Za-z0-9]{7,40}$/.test(sha)) return sha.slice(0, 12);
  return 'dev';
}
