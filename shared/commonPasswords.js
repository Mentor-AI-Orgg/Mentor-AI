// Lista de parole prea cunoscute, aceeași pe server și în formular.
// Se extinde din câteva semințe ca să acopere variantele cu cifre.

const SEEDS = [
  "123456", "password", "123456789", "12345678", "12345", "1234567", "qwerty",
  "abc123", "password1", "111111", "123123", "admin", "letmein", "welcome",
  "monkey", "login", "princess", "dragon", "master", "hello", "freedom",
  "whatever", "qwerty123", "trustno1", "parola", "parola123", "sunt10", "elev",
  "elev123", "romania", "bucuresti", "fotbal", "iloveyou", "sunshine", "shadow",
  "ashley", "bailey", "passw0rd", "password123", "000000", "654321", "superman",
  "qazwsx", "michael", "football", "baseball", "mustang", "access", "shadow1",
  "charlie", "donald", "batman", "starwars", "google", "internet", "computer",
  "magazin", "scoala", "familia", "mama123", "tata123", "pisica", "caine",
  "android", "samsung", "linkedin", "liverpool", "chelsea", "arsenal"
];

function expand(seeds) {
  const out = new Set();
  const add = value => {
    const key = String(value || "").trim().toLowerCase();
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

function isCommonPassword(password) {
  return COMMON.has(String(password || "").trim().toLowerCase());
}

function commonPasswordCount() {
  return COMMON.size;
}

module.exports = { isCommonPassword, commonPasswordCount };
