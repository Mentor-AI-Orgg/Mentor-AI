import { confirmPasswordIssue, normalizeSecret } from '@shared/secretNormalize.js';

const USER_DELETES = new Set([
  'deleteContentBackward',
  'deleteContentForward',
  'deleteByCut',
  'deleteByDrag'
]);

function shouldKeepUsername(previous, next, inputType) {
  const prev = String(previous || '');
  const value = String(next ?? '');
  if (value.trim() !== '' || prev.trim().length < 2) return value;
  if (USER_DELETES.has(String(inputType || ''))) return value;
  return prev;
}

export { confirmPasswordIssue, normalizeSecret, shouldKeepUsername };
