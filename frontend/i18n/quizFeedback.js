const LINES = {
  corect: ['Bravo, ai lucrat atent!', 'Asta e. Ai ținut pasul.'],
  echivalent: ['Ai spus-o altfel, și e bine.', 'Aceeași idee, altă formă. Bravo.'],
  aproape: ['Aproape! Refă doar ultimul pas.', 'Ești foarte aproape. Mai un pas.'],
  jumatate: ['Ai prins o parte. Hai să vedem restul.', 'Jumătate e un început bun.'],
  gresit: ['Ai încercat, asta contează. Uite pasul care lipsește:', 'Nu încă. Hai să vedem împreună de ce.'],
  gol: ['Scrie un răspuns, chiar scurt.', 'Încearcă o variantă. Apoi vedem.']
};

function bucket(verdict, ok) {
  const name = String(verdict || '');
  if (name === 'empty') return 'gol';
  if (name === 'equivalent') return 'echivalent';
  if (name === 'near') return 'aproape';
  if (name === 'partial') return 'jumatate';
  if (ok || name === 'exact') return 'corect';
  return 'gresit';
}

function hash(seed) {
  const text = String(seed || 'item');
  let value = 0;
  for (let i = 0; i < text.length; i += 1) value = (value * 33 + text.charCodeAt(i)) % 997;
  return value;
}

export function effortLine(verdict, seed, ok = false) {
  const list = LINES[bucket(verdict, ok)];
  return list[hash(seed) % list.length];
}
