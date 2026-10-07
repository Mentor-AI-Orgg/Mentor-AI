const { judgeAnswer } = require('../../../grading/answerJudge');

// Grupe de termeni pe care un copil îi încurcă: aceeași clasă de cuvinte,
// aceeași noțiune, greșeli frecvente. Variantele unei grile pleacă de aici.
const CATEGORIES = [
  ['par', 'impar', 'prim', 'compus', 'pătrat', 'triunghiular', 'natural', 'întreg', 'rațional', 'irațional', 'pozitiv', 'negativ'],
  ['unu', 'doi', 'trei', 'patru', 'cinci', 'șase', 'șapte', 'opt', 'nouă', 'zece'],
  ['adunare', 'scădere', 'înmulțire', 'împărțire'],
  ['adună', 'scade', 'înmulțește', 'împarte'],
  ['sumă', 'diferență', 'produs', 'cât'],
  ['numărător', 'numitor'],
  ['c.m.m.d.c.', 'c.m.m.m.c.'],
  ['arie', 'perimetru', 'volum', 'lungime'],
  ['triunghi', 'patrulater', 'cerc', 'dreptunghi', 'romb', 'pătrat', 'trapez', 'paralelogram'],
  ['prismă', 'piramidă', 'cilindru', 'con', 'sferă'],
  ['unghi ascuțit', 'unghi drept', 'unghi obtuz'],
  ['substantiv', 'adjectiv', 'verb', 'pronume', 'numeral', 'adverb', 'prepoziție', 'conjuncție', 'interjecție'],
  ['nominativ', 'acuzativ', 'genitiv', 'dativ', 'vocativ'],
  ['indicativ', 'conjunctiv', 'condițional', 'imperativ', 'infinitiv', 'gerunziu', 'participiu', 'supin'],
  ['prezent', 'imperfect', 'perfect compus', 'perfect simplu', 'mai-mult-ca-perfect', 'viitor'],
  ['metaforă', 'comparație', 'personificare', 'epitet', 'hiperbolă', 'enumerație', 'repetiție'],
  ['sinonim', 'antonim', 'omonim', 'paronim'],
  ['sinonime', 'antonime', 'omonime', 'paronime'],
  ['diftong', 'triftong', 'hiat'],
  ['subiect', 'predicat', 'atribut', 'complement'],
  ['cauzală', 'finală', 'temporală', 'concesivă', 'atributivă'],
  ['cauză', 'scop', 'concesie', 'timp', 'loc'],
  ['literar', 'nonliterar'],
  ['masculin', 'feminin', 'neutru'],
  ['singular', 'plural'],
  ['număr', 'cifră', 'valoare', 'cantitate', 'mărime'],
  ['poate', 'înseamnă', 'spune', 'arată', 'rămâne', 'schimbă', 'desparte', 'leagă'],
  ['direct proporțional', 'invers proporțional']
];

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function judgedWrong(correct, candidate) {
  const options = [correct, candidate, 'alt-răspuns', 'încă-unul'];
  const judged = judgeAnswer({
    given: candidate,
    answers: [correct],
    choices: options,
    letter: 'A'
  });
  return !judged.ok;
}

function groupsFor(word) {
  const key = fold(word);
  if (!key) return [];
  return CATEGORIES.filter(group => group.some(item => fold(item) === key));
}

function sameCategory(correct, candidate) {
  const key = fold(candidate);
  return groupsFor(correct).some(group => group.some(item => fold(item) === key));
}

function numberValue(text) {
  const raw = String(text || '').trim().replace(/\s/g, '').replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(raw)) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function nearNumbers(correct) {
  const n = numberValue(correct);
  if (n == null) return [];
  const step = Math.max(1, Math.round(Math.abs(n) * 0.1));
  const deltas = [1, -1, 2, -2, step, -step, step * 2, -(step * 2)];
  const out = [];
  deltas.forEach(delta => {
    const value = n + delta;
    if (value === n) return;
    const text = Number.isInteger(n) ? String(Math.trunc(value)) : String(Math.round(value * 100) / 100);
    if (numberValue(text) !== n) out.push(text);
  });
  return out;
}

function isNearNumber(correct, candidate) {
  const a = numberValue(correct);
  const b = numberValue(candidate);
  if (a == null || b == null || a === b) return false;
  return Math.abs(a - b) <= Math.max(2, Math.abs(a) * 0.25);
}

function sharedEnding(correct, candidate, size) {
  const a = fold(correct);
  const b = fold(candidate);
  if (a.length <= size || b.length <= size) return false;
  return a.slice(-size) === b.slice(-size);
}

function rankScore(correct, word, inChapter) {
  const gap = Math.abs(fold(correct).length - fold(word).length);
  let score = gap;
  if (sameCategory(correct, word) && inChapter) score -= 20;
  else if (sameCategory(correct, word)) score -= 14;
  if (isNearNumber(correct, word)) score -= 16;
  if (sharedEnding(correct, word, 4)) score -= 6;
  else if (sharedEnding(correct, word, 3)) score -= 4;
  if (!inChapter && !sameCategory(correct, word) && !isNearNumber(correct, word)) score += 6;
  if (gap > 6) score += 3;
  return score;
}

function usable(correct, word, seen) {
  const form = fold(word);
  if (!form || seen.has(form) || form === fold(correct)) return false;
  if (!judgedWrong(correct, word)) return false;
  seen.add(form);
  return true;
}

function take(correct, ranked, accept, seen, limit) {
  const picked = [];
  ranked.forEach(row => {
    if (picked.length >= limit) return;
    if (!accept(row.word)) return;
    if (!usable(correct, row.word, seen)) return;
    picked.push(row.word);
  });
  return picked;
}

function closeWrongs(correct, poolWords, oldWrongs) {
  const chapterSet = new Set((poolWords || []).map(word => fold(word)));
  const numeric = numberValue(correct) != null;
  const groups = groupsFor(correct).slice().sort((a, b) => {
    const hits = group => group.filter(item => chapterSet.has(fold(item))).length;
    return hits(b) - hits(a);
  });
  const fromGroups = groups.length ? groups[0] : [];
  const sameKind = (poolWords || []).filter(word => (numberValue(word) != null) === numeric);
  const words = [...fromGroups, ...(numeric ? nearNumbers(correct) : []), ...sameKind];
  const ranked = words
    .filter(word => word && fold(word) && fold(word) !== fold(correct))
    .map(word => ({ word, score: rankScore(correct, word, chapterSet.has(fold(word))) }))
    .sort((a, b) => a.score - b.score || fold(a.word).localeCompare(fold(b.word), 'ro'));
  const seen = new Set([fold(correct)]);
  const category = take(correct, ranked, word => sameCategory(correct, word), seen, 3);
  if (category.length >= 2 && category.length < 3) {
    const rest = take(
      correct,
      ranked,
      word => sharedEnding(correct, word, 3),
      seen,
      3 - category.length
    );
    if (category.length + rest.length >= 3) return [...category, ...rest].slice(0, 3);
  }
  if (category.length >= 3) return category;
  seen.clear();
  seen.add(fold(correct));
  const numbers = numeric ? take(correct, ranked, word => isNearNumber(correct, word), seen, 3) : [];
  if (numbers.length >= 3) return numbers;
  const oldEnd = (oldWrongs || []).filter(word => sharedEnding(correct, word, 3)).length;
  if (oldEnd === 0) {
    seen.clear();
    seen.add(fold(correct));
    const endings = take(
      correct,
      ranked,
      word => sharedEnding(correct, word, 3) && Math.abs(fold(correct).length - fold(word).length) <= 4,
      seen,
      3
    );
    if (endings.length >= 3) return endings;
  }
  return [];
}

function retuneCard(item, pool) {
  if (!item || !Array.isArray(item.options) || item.options.length !== 4) return item;
  if (item.challenge) return item;
  const tunable = Boolean(item.secondary) || String(item.id || '').startsWith('g:');
  if (!tunable) return item;
  const correctIndex = Number(item.correct) || 0;
  const correct = item.options[correctIndex];
  if (!correct) return item;
  const poolWords = (pool || [])
    .filter(other => other && other.secondary && other.id !== item.id && other.options)
    .map(other => other.options[other.correct])
    .filter(word => word && String(word).length <= 28);
  const oldWrongs = item.options.filter((_, index) => index !== correctIndex);
  const wrongs = closeWrongs(correct, poolWords, oldWrongs);
  if (wrongs.length < 3) return item;
  return { ...item, options: [correct, ...wrongs], correct: 0 };
}

module.exports = { retuneCard, closeWrongs, sameCategory, isNearNumber };
