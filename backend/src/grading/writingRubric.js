// Barem de profesor pentru redactări scurte, în spiritul EN
// (OM 4.730/2022: încadrare, conținut, organizare, stil, corectitudine).
// Nu e un eseu-model. Spune ce s-a văzut și ce lipsește, ca la clasă.

const CONNECTORS = [
  'pentru ca', 'pentru că', 'deoarece', 'asadar', 'așadar', 'deci', 'apoi',
  'intai', 'întâi', 'dupa', 'după', 'in schimb', 'în schimb', 'totusi', 'totuși',
  'astfel', 'de exemplu', 'in concluzie', 'în concluzie'
];

function wordsOf(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function scoreBand(value, max) {
  return Math.max(0, Math.min(max, Math.round(value)));
}

function gradeWriting(text, exercise = {}) {
  const raw = String(text || '').trim();
  const words = wordsOf(raw);
  const folded = fold(raw);
  const minWords = Number(exercise.minWords) || 8;
  const tokens = (exercise.tokens || []).map(fold).filter(Boolean);
  const answers = (exercise.answers || []).map(fold).filter(Boolean);
  const anchors = [...new Set([...tokens, ...answers.filter(a => a.length >= 3)])];

  const hasAnchor = anchors.length
    ? anchors.some(token => folded.includes(token))
    : words.length >= minWords;
  const enoughWords = words.length >= minWords;
  const tooShort = words.length > 0 && words.length < Math.max(4, Math.floor(minWords * 0.6));

  const cerinta = tooShort ? 1 : (hasAnchor && enoughWords ? 6 : hasAnchor || enoughWords ? 4 : words.length ? 2 : 0);

  const unique = new Set(words.map(fold)).size;
  const richness = words.length ? unique / words.length : 0;
  const continut = scoreBand(
    (hasAnchor ? 4 : 1) + (enoughWords ? 2 : 0) + (richness > 0.55 ? 2 : richness > 0.4 ? 1 : 0),
    8
  );

  const paragraphs = raw.split(/\n+/).filter(p => p.trim()).length;
  const hasConnector = CONNECTORS.some(c => folded.includes(fold(c)));
  const hasStop = /[.!?…]/.test(raw);
  const organizare = scoreBand((paragraphs > 1 ? 2 : 1) + (hasConnector ? 2 : 0) + (hasStop ? 2 : 0), 6);

  const longWords = words.filter(w => w.length >= 6).length;
  const stil = scoreBand((richness > 0.6 ? 2 : 1) + (longWords >= 2 ? 2 : 1) + (hasConnector ? 1 : 0), 5);

  const allCaps = raw.length > 12 && raw === raw.toUpperCase();
  const repeats = words.length - unique;
  const corect = scoreBand(5 - (allCaps ? 2 : 0) - (repeats > words.length * 0.35 ? 1 : 0) - (!hasStop && words.length >= 8 ? 1 : 0), 5);

  const criteria = [
    { id: 'cerinta', label: 'Încadrare în cerință', max: 6, points: cerinta, note: hasAnchor ? 'Ai atins ce cere enunțul.' : 'Revino la cerință: ce anume ți s-a cerut?' },
    { id: 'continut', label: 'Conținut / idei', max: 8, points: continut, note: enoughWords ? 'Se vede o idee, nu doar un cuvânt.' : 'Mai dezvoltă. Baremul vrea ideea, nu un titlu.' },
    { id: 'organizare', label: 'Organizare', max: 6, points: organizare, note: hasConnector ? 'Firul se leagă (pentru că / apoi / deci).' : 'Leagă frazele: întâi… apoi… deci…' },
    { id: 'stil', label: 'Stil și vocabular', max: 5, points: stil, note: richness > 0.55 ? 'Cuvintele nu se tot repetă.' : 'Schimbă un cuvânt tocit cu unul mai potrivit.' },
    { id: 'corect', label: 'Corectitudine', max: 5, points: corect, note: hasStop ? 'Punctuația ajută ochiul.' : 'Pune un punct. Profesorul citește cu vocea ta.' }
  ];

  const total = criteria.reduce((sum, row) => sum + row.points, 0);
  const max = 30;
  const note10 = Math.max(1, Math.min(10, Math.round((total / max) * 10)));
  const ok = total >= 16 && hasAnchor && !tooShort;

  const teacher = ok
    ? `Ca la clasă: merită. Ai ${total} din ${max} pe barem (cam nota ${note10}). Ține ce merge și lungește ideea unde e subțire.`
    : `Ca la clasă: nu e încă. Ai ${total} din ${max}. Baremul caută cerința, o idee dezvoltată și un fir, nu o compunere-model de copiat.`;

  return {
    total,
    max,
    note10,
    ok,
    criteria,
    teacher,
    sampleHint: (exercise.steps || []).length
      ? exercise.steps.join(' · ')
      : 'Plan pe ciornă. Cerința. Două idei. Un capăt. Recitește acordul.'
  };
}

function isWritingItem(exercise) {
  if (!exercise) return false;
  return Boolean(exercise.long) || Number(exercise.minWords) >= 5;
}

module.exports = { gradeWriting, isWritingItem };
