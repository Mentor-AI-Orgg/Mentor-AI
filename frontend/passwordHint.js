function passwordHint(password, username = '') {
  const value = String(password || '');
  const name = String(username || '').trim().toLowerCase();
  if (!value) return { ok: false, label: 'Minim 8 caractere. Poți scrie o frază.' };
  if (value.length < 8) return { ok: false, label: 'Prea scurtă. Mai scrie.' };
  if (name && value.trim().toLowerCase() === name) {
    return { ok: false, label: 'Alege o parolă care nu e la fel cu numele de utilizator.' };
  }
  if (value.includes(' ') || value.length >= 12) return { ok: true, label: 'Bună. O frază e greu de ghicit.' };
  return { ok: true, label: 'E ok.' };
}

export { passwordHint };
