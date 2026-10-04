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

function clampLevel(level) {
  const n = Number(level);
  if (!Number.isFinite(n) || n === 0) return 0;
  if (n < 1) return 1;
  if (n > 8) return 8;
  return n;
}

function makeId(meta, seed) {
  const mark = meta.kind === 'test' ? 't' : 'f';
  const level = clampLevel(meta.level);
  const lv = level > 0 ? `:${level}` : '';
  return `g:${mark}:${meta.subject}:${meta.grade}:${meta.chapterId}${lv}:${seed}`;
}

function materialize(meta) {
  const level = clampLevel(meta.level);
  const scoped = { ...meta, level };
  const rand = rng(seedFromHex(scoped.seed));
  const built = scoped.subject === 'romana'
    ? generateRomana(scoped.chapterId, scoped.kind, rand, level, scoped.grade)
    : generateMath(scoped.chapterId, scoped.kind, rand, level);
  if (!built || !itemLooksSound(built, scoped.kind)) return null;
  return {
    ...built,
    id: makeId(scoped, scoped.seed),
    generated: true,
    level: level || built.level || 1
  };
}

function uglyNumber(value) {
  if (!Number.isFinite(value)) return true;
  if (Number.isInteger(value)) return false;
  return Math.abs(value - Math.round(value)) >= 1e-9;
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
  const answers = (item.answers || []).map(value => String(value).trim()).filter(Boolean);
  if (!String(item.prompt || '').trim() || !answers.length) return false;
  if (item.numeric) {
    const value = Number(item.numeric.value);
    if (!Number.isFinite(value) || uglyNumber(value)) return false;
  }
  return true;
}

function sameItem(a, b) {
  if (!a || !b) return false;
  if (a.prompt && a.prompt !== b.prompt) return false;
  if (a.question && a.question !== b.question) return false;
  if (a.options) return JSON.stringify(a.options) === JSON.stringify(b.options) && a.correct === b.correct;
  return JSON.stringify(a.answers || []) === JSON.stringify(b.answers || []);
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
    level: clampLevel(Number(level) || 0)
  };
  for (let i = 0; i < 48; i += 1) {
    const seed = newSeed();
    const item = materialize({ ...meta, seed });
    if (!item || excluded.has(item.id)) continue;
    const again = materialize({ ...meta, seed });
    if (!sameItem(item, again)) continue;
    return item;
  }
  const seed = newSeed();
  const last = materialize({ ...meta, seed });
  if (!last || !sameItem(last, materialize({ ...meta, seed }))) return null;
  return last;
}

function surface(item) {
  return String((item && (item.prompt || item.question)) || '').replace(/\s+/g, ' ').trim();
}

function generateMany(opts, count) {
  const exclude = [...(opts.excludeIds || [])];
  const seen = new Set();
  const out = [];
  const want = Math.max(0, Number(count) || 0);
  const start = Math.max(1, Number(opts.startLevel) || 1);
  const plan = Array.isArray(opts.levels) && opts.levels.length
    ? opts.levels
    : Array.from({ length: want }, (_, i) => start + i);
  for (let i = 0; i < want; i += 1) {
    const level = clampLevel(Number(plan[i] || plan[plan.length - 1] || start) || 1);
    let item = null;
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const candidate = generateOne({ ...opts, excludeIds: exclude, level });
      if (!candidate) break;
      const text = surface(candidate);
      if (text && seen.has(text)) {
        exclude.push(candidate.id);
        continue;
      }
      item = candidate;
      break;
    }
    if (!item) item = generateOne({ ...opts, excludeIds: exclude, level });
    if (!item) break;
    exclude.push(item.id);
    const text = surface(item);
    if (text) seen.add(text);
    out.push({ ...item, level });
  }
  return out;
}

module.exports = { isGenId, parseGenId, fromGeneratedId, generateOne, generateMany, materialize, itemLooksSound };
