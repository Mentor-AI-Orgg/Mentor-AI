function rng(seed) {
  let a = (Number(seed) >>> 0) || 1;
  return function next() {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromHex(hex) {
  const n = parseInt(String(hex || '1'), 16);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function newSeed() {
  return Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
}

function int(rand, min, max) {
  return min + Math.floor(rand() * (max - min + 1));
}

function pick(rand, list) {
  return list[Math.floor(rand() * list.length)];
}

function shuffle(rand, list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function uniqueOptions(rand, correct, wrongs) {
  const pool = [];
  const seen = new Set([String(correct)]);
  for (const item of wrongs) {
    const text = String(item);
    if (!seen.has(text)) {
      seen.add(text);
      pool.push(text);
    }
  }
  let guard = 0;
  while (pool.length < 3 && guard < 40) {
    guard += 1;
    const n = Number(correct);
    const extra = Number.isFinite(n)
      ? String(n + (guard + int(rand, 1, 9)) * (guard % 2 ? 1 : -1))
      : `${String(correct).slice(0, 18)} · ${pool.length + 2}`;
    if (extra && !seen.has(extra) && extra !== String(correct)) {
      seen.add(extra);
      pool.push(extra);
    }
  }
  if (pool.length < 3) return null;
  return [String(correct), ...pool.slice(0, 3)];
}

module.exports = { rng, seedFromHex, newSeed, int, pick, shuffle, gcd, lcm, uniqueOptions };
