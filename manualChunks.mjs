// React stă într-un singur chunk, importat direct de ecranul principal și de
// ecranele lazy. Altfel chunk-ul lecției îl ia din bundle-ul de intrare, iar
// browserul din Facebook/Instagram poate evalua acel modul de două ori:
// useState vede un dispatcher gol (React #321).

export function manualChunk(id) {
  const norm = String(id || '').replace(/\\/g, '/');
  if (
    norm.includes('/node_modules/react/') ||
    norm.includes('/node_modules/react-dom/') ||
    norm.includes('/node_modules/scheduler/')
  ) {
    return 'react';
  }
  return undefined;
}
