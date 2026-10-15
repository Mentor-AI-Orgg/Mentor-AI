import data from '@shared/mascot.json';

export const MASCOT_NAME = String(data.MASCOT_NAME || '').trim();

export function possessiveName(name = MASCOT_NAME) {
  if (String(name).endsWith('a')) return `${String(name).slice(0, -1)}ei`;
  return String(name);
}

export const STORY_TITLE = `Povestea ${possessiveName()}`;
