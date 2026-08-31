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
  return {
    kind: parts[1] === 't' ? 'test' : 'flashcards',
    subject: parts[2],
    grade: parts[3],
    chapterId: parts.slice(4, -1).join(':'),
    seed
  };
}

function makeId(meta, seed) {
  const mark = meta.kind === 'test' ? 't' : 'f';
  return `g:${mark}:${meta.subject}:${meta.grade}:${meta.chapterId}:${seed}`;
}

function materialize(meta) {
  const rand = rng(seedFromHex(meta.seed));
  const built = meta.subject === 'romana'
    ? generateRomana(meta.chapterId, meta.kind, rand)
    : generateMath(meta.chapterId, meta.kind, rand);
  if (!built) return null;
  return {
    ...built,
    id: makeId(meta, meta.seed),
    generated: true
  };
}

function fromGeneratedId(id) {
  const meta = parseGenId(id);
  if (!meta) return null;
  return materialize(meta);
}

function generateOne({ kind, subject, grade, chapterId, excludeIds = [] }) {
  const excluded = new Set((excludeIds || []).map(String));
  const meta = { kind, subject: String(subject), grade: String(grade), chapterId: String(chapterId) };
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
  for (let i = 0; i < want; i += 1) {
    const item = generateOne({ ...opts, excludeIds: exclude });
    if (!item) break;
    exclude.push(item.id);
    out.push({ ...item, level: item.level || i + 1 });
  }
  return out;
}

module.exports = { isGenId, parseGenId, fromGeneratedId, generateOne, generateMany, materialize };
