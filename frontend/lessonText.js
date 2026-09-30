export function countWords(text) {
  const plain = String(text || '').replace(/\*\*([^*]+)\*\*/g, '$1');
  return (plain.match(/\S+/g) || []).filter(word => /[\p{L}\p{N}]/u.test(word)).length;
}

export function visibleWordCount(entry) {
  const parts = [];
  (entry.boxes || []).forEach(box => parts.push(box.title, box.text));
  if (Array.isArray(entry.formulas) && entry.formulas.length) parts.push(entry.formulas.join('\n'));
  parts.push(entry.theory, entry.example, entry.practice, entry.mistakes, entry.tryThis);
  if (Array.isArray(entry.keyPoints) && entry.keyPoints.length) parts.push(entry.keyPoints.join(' '));
  else parts.push(entry.recap);
  return countWords(parts.filter(Boolean).join('\n'));
}

export function lessonMinutes(entry) {
  return Math.max(1, Math.ceil(visibleWordCount(entry) / 150));
}

/** `**text**` devine bold. Un `**` neînchis rămâne text simplu. */
export function splitBold(text) {
  const source = String(text || '');
  const parts = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let match = re.exec(source);
  while (match) {
    if (match.index > last) parts.push({ strong: false, text: source.slice(last, match.index) });
    parts.push({ strong: true, text: match[1] });
    last = match.index + match[0].length;
    match = re.exec(source);
  }
  if (last < source.length || !parts.length) parts.push({ strong: false, text: source.slice(last) });
  return parts.filter(part => part.text);
}

export function lessonIdFromHash(hash) {
  const raw = String(hash || '');
  const pathMatch = raw.match(/\/lectie-([^/]+)$/);
  const bareMatch = raw.match(/^#lectie-([^/]+)$/);
  const token = (pathMatch || bareMatch)?.[1] || '';
  if (!token) return '';
  try {
    return decodeURIComponent(token);
  } catch {
    return token;
  }
}

export function resolveAnchorId(lessons, aliases, rawId) {
  if (!rawId) return '';
  const list = lessons || [];
  if (list.some(lesson => lesson.id === rawId)) return rawId;
  const next = aliases && aliases[rawId];
  if (next && list.some(lesson => lesson.id === next)) return next;
  return '';
}

export function lessonHref(ref) {
  const lesson = ref?.lesson || '';
  const [subject, grade, chapter] = String(ref?.key || '').split(':');
  if (!subject || !grade || !chapter || !lesson) return `#lectie-${encodeURIComponent(lesson)}`;
  return `#/lectii/${encodeURIComponent(subject)}/${encodeURIComponent(grade)}/${encodeURIComponent(chapter)}/lectie-${encodeURIComponent(lesson)}`;
}
