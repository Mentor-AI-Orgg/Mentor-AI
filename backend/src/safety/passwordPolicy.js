// Parolă pentru copii: minim 8 caractere, fără reguli de simboluri.
// Se refuză parola egală cu numele de utilizator și cele mai folosite parole.

const SEEDS = [
  '123456', 'password', '123456789', '12345678', '12345', '1234567', 'qwerty',
  'abc123', 'password1', '111111', '123123', 'admin', 'letmein', 'welcome',
  'monkey', 'login', 'princess', 'dragon', 'master', 'hello', 'freedom',
  'whatever', 'qwerty123', 'trustno1', 'parola', 'parola123', 'sunt10', 'elev',
  'elev123', 'romania', 'bucuresti', 'fotbal', 'iloveyou', 'sunshine', 'shadow',
  'ashley', 'bailey', 'passw0rd', 'password123', '000000', '654321', 'superman',
  'qazwsx', 'michael', 'football', 'baseball', 'mustang', 'access', 'shadow1',
  'charlie', 'donald', 'batman', 'starwars', 'google', 'internet', 'computer',
  'magazin', 'scoala', 'familia', 'mama123', 'tata123', 'pisica', 'caine',
  'android', 'samsung', 'linkedin', 'liverpool', 'chelsea', 'arsenal'
];

function expand(seeds) {
  const out = new Set();
  const add = value => {
    const key = String(value || '').trim().toLowerCase();
    if (key.length >= 4) out.add(key);
  };
  seeds.forEach(add);
  seeds.forEach(seed => {
    add(`${seed}!`);
    add(`${seed}123`);
    add(`${seed}1234`);
    for (let n = 0; n <= 20; n += 1) add(`${seed}${n}`);
  });
  let n = 0;
  while (out.size < 1000 && n < 5000) {
    add(`qwerty${n}`);
    add(`letmein${n}`);
    add(`welcome${n}`);
    n += 1;
  }
  return out;
}

const COMMON = expand(SEEDS);

function sameName(password, username) {
  const left = String(password || '').trim().toLowerCase();
  const right = String(username || '').trim().toLowerCase();
  return Boolean(left && right && left === right);
}

function passwordError(password, username = '') {
  const value = String(password || '');
  if (value.length < 8) return 'Parola trebuie să aibă minim 8 caractere.';
  if (sameName(value, username)) return 'Alege o parolă care nu e la fel cu numele de utilizator.';
  if (COMMON.has(value.trim().toLowerCase())) return 'Parola asta e prea cunoscută. Alege alta.';
  return null;
}

function passwordStrength(password) {
  const value = String(password || '');
  if (!value) return { level: 'empty', label: '' };
  if (value.length < 8) return { level: 'short', label: 'Prea scurtă. Mai scrie.' };
  if (COMMON.has(value.trim().toLowerCase())) return { level: 'weak', label: 'Prea cunoscută. Alege alta.' };
  if (value.includes(' ') || value.length >= 12) return { level: 'good', label: 'Bună. O frază e greu de ghicit.' };
  return { level: 'ok', label: 'E ok.' };
}

module.exports = {
  passwordError,
  passwordStrength,
  commonPasswordCount: () => COMMON.size
};
