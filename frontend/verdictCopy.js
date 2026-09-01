export function formatScore(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value ?? '');
  if (Number.isInteger(n)) return String(n);
  return String(n).replace('.', ',');
}

export function verdictLabel(item = {}) {
  const verdict = String(item.verdict || '');
  if (item.skipped || verdict === 'empty') return 'fără răspuns';
  if (verdict === 'equivalent') return 'corect, altfel spus';
  if (verdict === 'exact') return 'corect';
  if (verdict === 'partial') return 'jumătate — merită o parte';
  if (verdict === 'near') return 'aproape — nu am punctat';
  if (item.ok) return 'corect';
  return 'nu am punctat';
}

export function verdictClass(item = {}) {
  const verdict = String(item.verdict || '');
  if (item.ok || verdict === 'exact' || verdict === 'equivalent') return 'ok';
  if (verdict === 'partial') return 'mid';
  return 'bad';
}
