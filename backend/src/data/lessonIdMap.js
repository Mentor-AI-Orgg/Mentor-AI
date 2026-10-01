// Harta id-urilor vechi de lecție. Goală până la prima unire sau împărțire.
// Cheia este completă: matematica:8:algebric:ecuatie-grad2.
// La o împărțire valoarea este o listă, iar prima intrare este partea principală.

const LESSON_ID_MAP_VERSION = 1;

const LESSON_ID_MAP = {};

function asMap(map) {
  return map && typeof map === 'object' ? map : LESSON_ID_MAP;
}

function followKey(fullKey, map, stack) {
  if (stack.has(fullKey)) return { cycle: true };
  if (!Object.prototype.hasOwnProperty.call(map, fullKey)) {
    return { key: fullKey, keys: [fullKey] };
  }
  const target = map[fullKey];
  const parts = Array.isArray(target) ? target : [target];
  if (!parts.length || parts.some(part => typeof part !== 'string' || !part)) {
    return { cycle: true };
  }
  stack.add(fullKey);
  const keys = [];
  for (const part of parts) {
    const next = followKey(part, map, stack);
    if (!next || next.cycle) {
      stack.delete(fullKey);
      return { cycle: true };
    }
    next.keys.forEach(item => {
      if (!keys.includes(item)) keys.push(item);
    });
  }
  stack.delete(fullKey);
  return { key: keys[0], keys };
}

function resolveLessonKey(fullKey, map = LESSON_ID_MAP) {
  const source = asMap(map);
  if (!fullKey || !Object.prototype.hasOwnProperty.call(source, fullKey)) return null;
  const resolved = followKey(fullKey, source, new Set());
  if (!resolved || resolved.cycle) return null;
  return { key: resolved.key, keys: resolved.keys, moved: true };
}

function resolveLessonId(subject, grade, chapterId, id, map = LESSON_ID_MAP) {
  const resolved = resolveLessonKey(`${subject}:${grade}:${chapterId}:${id}`, map);
  if (!resolved) return null;
  const parts = resolved.key.split(':');
  return parts[parts.length - 1] || null;
}

function aliasesFor(subject, grade, chapterId, map = LESSON_ID_MAP) {
  const source = asMap(map);
  const prefix = `${subject}:${grade}:${chapterId}:`;
  const aliases = {};
  Object.keys(source).forEach(from => {
    if (!from.startsWith(prefix)) return;
    const resolved = resolveLessonKey(from, source);
    if (!resolved || !resolved.key.startsWith(prefix)) return;
    aliases[from.slice(prefix.length)] = resolved.key.slice(prefix.length);
  });
  return aliases;
}

function cycleInMap(map = LESSON_ID_MAP) {
  const source = asMap(map);
  return Object.keys(source).some(key => {
    const resolved = followKey(key, source, new Set());
    return !resolved || resolved.cycle;
  });
}

// Id-ul vechi se mută doar dacă toate capitolele materiei duc la aceeași lecție nouă.
function uniqueTargetId(subject, oldId, map = LESSON_ID_MAP) {
  const source = asMap(map);
  if (!subject || !oldId) return null;
  const suffix = `:${oldId}`;
  const targets = new Set();
  const sources = Object.keys(source).filter(key => key.startsWith(`${subject}:`) && key.endsWith(suffix));
  if (!sources.length) return null;
  for (const from of sources) {
    const resolved = resolveLessonKey(from, source);
    if (!resolved) return null;
    targets.add(resolved.key.split(':').pop());
  }
  if (targets.size !== 1) return null;
  return [...targets][0];
}

module.exports = {
  LESSON_ID_MAP_VERSION,
  LESSON_ID_MAP,
  resolveLessonKey,
  resolveLessonId,
  aliasesFor,
  cycleInMap,
  uniqueTargetId
};
