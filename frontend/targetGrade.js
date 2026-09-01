const STORAGE_KEY = 'mentor_target_note';
export const TARGET_NOTES = [5, 6, 7, 8, 9, 10];

export function readSavedTargetNote() {
  try {
    const n = Number(localStorage.getItem(STORAGE_KEY));
    if (TARGET_NOTES.includes(n)) return n;
  } catch {
    /* storage blocat */
  }
  return null;
}

export function saveTargetNote(note) {
  if (!TARGET_NOTES.includes(Number(note))) return;
  try {
    localStorage.setItem(STORAGE_KEY, String(note));
  } catch {
    /* storage blocat */
  }
}
