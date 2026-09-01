const { rng, seedFromHex, newSeed } = require('./itemRng');
const { generateMath } = require('./generateMath');
const { generateRomana } = require('./generateRomana');

function isGenId(id) {
  return String(id || '').startsWith('g:');
}

function parseGenId(id) {
  const parts = String(id || '').split(':');
  if (parts[0] !== 'g' || parts.length < 6) return null;
  const seed = parts[parts.length - 1];
  if (!/^[0-9a-f]{6,12}$/i.test(seed)) return null;
  let level = 0;
  let chapterEnd = parts.length - 1;
  if (/^[1-8]$/.test(parts[parts.length - 2])) {
    level = Number(parts[parts.length - 2]);
    chapterEnd -= 1;
  }
  if (chapterEnd < 5) return null;
  return {
    kind: parts[1] === 't' ? 'test' : 'flashcards',
    subject: parts[2],
    grade: parts[3],
    chapterId: parts.slice(4, chapterEnd).join(':'),
    seed,
    level
  };
}

function makeId(meta, seed) {
  const mark = meta.kind === 'test' ? 't' : 'f';
  const lv = Number(meta.level) > 0 ? `:${Number(meta.level)}` : '';
  return `g:${mark}:${meta.subject}:${meta.grade}:${meta.chapterId}${lv}:${seed}`;
}

function materialize(meta) {
  const rand = rng(seedFromHex(meta.seed));
  const built = meta.subject === 'romana'
    ? generateRomana(meta.chapterId, meta.kind, rand, meta.level)
    : generateMath(meta.chapterId, meta.kind, rand, meta.level);
  if (!built || !itemLooksSound(built, meta.kind)) return null;
  return {
    ...built,
    id: makeId(meta, meta.seed),
    generated: true,
    level: Number(meta.level) || built.level || 1
  };
}

function itemLooksSound(item, kind) {
  if (!item) return false;
  if (kind === 'flashcards' || item.options) {
    const options = item.options || [];
    if (options.length !== 4) return false;
    if (new Set(options.map(value => String(value).trim())).size !== 4) return false;
    const idx = Number(item.correct);
    return Number.isInteger(idx) && idx >= 0 && idx < 4 && Boolean(String(options[idx]).trim());
  }
  const answers = item.answers || [];
  if (!String(item.prompt || '').trim() || !answers.length) return false;
  if (item.numeric && !Number.isFinite(Number(item.numeric.value))) return false;
  return true;
}

function fromGeneratedId(id) {
  const meta = parseGenId(id);
  if (!meta) return null;
  return materialize(meta);
}

function generateOne({ kind, subject, grade, chapterId, excludeIds = [], level }) {
  const excluded = new Set((excludeIds || []).map(String));
  const meta = {
    kind,
    subject: String(subject),
    grade: String(grade),
    chapterId: String(chapterId),
    level: Number(level) || 0
  };
  for (let i = 0; i < 48; i += 1) {
    const seed = newSeed();
    const item = materialize({ ...meta, seed });
    if (item && !excluded.has(item.id)) return item;
  }
  return materialize({ ...meta, seed: newSeed() });
}

function generateMany(opts, count) {
  const exclude = [...(opts.excludeIds || [])];
  const out = [];
  const want = Math.max(0, Number(count) || 0);
  const start = Math.max(1, Number(opts.startLevel) || 1);
  for (let i = 0; i < want; i += 1) {
    const level = start + i;
    const item = generateOne({ ...opts, excludeIds: exclude, level });
    if (!item) break;
    exclude.push(item.id);
    out.push({ ...item, level });
  }
  return out;
}

module.exports = { isGenId, parseGenId, fromGeneratedId, generateOne, generateMany, materialize, itemLooksSound };
