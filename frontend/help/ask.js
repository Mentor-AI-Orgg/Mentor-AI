import { fold } from './articles.js';
import { MASCOT_NAME } from '../config/mascot.js';

const APP_FAQ = [
  {
    id: 'setari',
    keys: ['setări', 'setările', 'unde sunt setările', 'unde găsesc setările', 'profil privat', 'cereri de prietenie'],
    answer: 'Setările sunt în profil, la „Cine te poate găsi”: profil privat și dacă accepți cereri de prietenie.',
    screen: 'profile',
    extras: { section: 'setari' }
  },
  {
    id: 'tema',
    keys: ['temă', 'cum schimb tema', 'schimb tema', 'tema întunecată', 'tema luminoasă', 'ca telefonul', 'aspect'],
    answer: 'Tema se schimbă din profil, la Aspect: întunecată, luminoasă sau ca telefonul. Acolo sunt și mărimea textului și animațiile.',
    screen: 'profile',
    extras: { section: 'tema' }
  },
  {
    id: 'clasament',
    keys: ['clasament', 'clasamentul', 'unde e clasamentul', 'locul meu', 'după xp'],
    answer: 'Clasamentul e în profil, mai jos. E după XP, tot timpul. Dacă profilul e privat, se vede locul și punctajul, fără nume.',
    screen: 'profile',
    extras: { section: 'clasament' }
  },
  {
    id: 'prieteni',
    keys: ['prieten', 'prieteni', 'adaugă un prieten', 'adaugă prieten', 'cum adaug un prieten', 'cod de prieten', 'cerere de prietenie'],
    answer: 'Prietenii se adaugă din profil: cauți un nume sau trimiți codul de prieten. Poți trimite câteva cereri pe zi.',
    screen: 'profile',
    extras: { section: 'prieteni' }
  },
  {
    id: 'lectii',
    keys: ['lecție', 'lecții', 'unde sunt lecțiile', 'capitol', 'capitole', 'română sau matematică', 'deschid o lecție'],
    answer: 'Lecțiile sunt la Lecții: alegi limba română sau matematică, apoi clasa și capitolul. Butonul Continuă de pe prima pagină te duce înapoi unde ai rămas.',
    screen: 'learn',
    extras: {}
  },
  {
    id: 'caiet',
    keys: ['caiet', 'caietul', 'greșeli', 'recapitulează', 'de repetat'],
    answer: 'Caietul strânge greșelile de la exerciții. Îl deschizi de pe prima pagină, când scrie că ai de recapitulat.',
    screen: 'caiet',
    extras: {}
  },
  {
    id: 'calendar',
    keys: ['calendar', 'ritm', 'zilele din săptămână', 'orar'],
    answer: 'Calendarul e ecranul cu ritmul tău: zilele în care ai lucrat și orarul, dacă l-ai pus.',
    screen: 'calendar',
    extras: {}
  },
  {
    id: 'magazin',
    keys: ['magazin', 'monede', 'avatar', 'fundal', 'cumpăr'],
    answer: 'Magazinul e locul cu avataruri și fundaluri, plătite cu monedele din lecții.',
    screen: 'shop',
    extras: {}
  },
  {
    id: 'tutore',
    keys: ['tutore', 'mentor', 'întreb tutorele', 'chat', 'unde e tutorele', MASCOT_NAME.toLowerCase()],
    answer: `${MASCOT_NAME} e tutorele, pe ecranul Mentor. Acolo o întrebi despre lecție. Mesajele acelea nu pleacă la părinte.`,
    screen: 'professor',
    extras: {}
  },
  {
    id: 'en',
    keys: ['evaluare națională', 'evaluarea națională', 'subiecte en', 'simulare'],
    answer: 'Evaluarea Națională e la Lecții, cardul separat de capitolele pe clase. Acolo sunt antrenamentul scurt și simularea.',
    screen: 'learn',
    extras: { track: 'en', subject: 'matematica', grade: '8' }
  },
  {
    id: 'parola',
    keys: ['parolă', 'schimb parola', 'parola nouă', 'am uitat parola din profil'],
    answer: 'Parola se schimbă din profil, la Datele tale de elev: parola actuală, apoi cea nouă.',
    screen: 'profile',
    extras: { section: 'parola' }
  },
  {
    id: 'cont',
    keys: ['username', 'nume de utilizator', 'schimb clasa', 'clasa mea', 'editează profilul'],
    answer: 'Numele de utilizator și clasa se schimbă din profil, la Datele tale de elev.',
    screen: 'profile',
    extras: { section: 'cont' }
  },
  {
    id: 'parinte',
    keys: ['email părinte', 'emailul părintelui', 'părinte', 'rezumat părinte'],
    answer: 'Emailul părintelui e în profil, la Datele tale de elev. Rezumatul pe care îl vede e mai jos, la zona de părinte din profil.',
    screen: 'profile',
    extras: { section: 'parinte' }
  },
  {
    id: 'progres',
    keys: ['progresul', 'unde e progresul', 'ecranul de progres', 'pregatit pentru evaluare'],
    answer: 'Progresul e în profil, la scurtătura Progres. Acolo vezi cât ai parcurs din clasa ta.',
    screen: 'progres',
    extras: {}
  },
  {
    id: 'acasa',
    keys: ['acasă', 'prima pagină', 'obiectivul zilei', 'obiectivul săptămânii', 'unde e acasă'],
    answer: 'Prima pagină e Acasă. Acolo sunt obiectivul zilei, obiectivul săptămânii și butonul Continuă.',
    screen: 'home',
    extras: {}
  },
  {
    id: 'ajutor',
    keys: ['ajutor', 'unde e ajutorul', 'cum funcționează'],
    answer: 'Ajutorul e pagina asta. Poți întreba despre setări, temă, clasament, prieteni, lecții, caiet sau calendar.',
    screen: 'ajutor',
    extras: {}
  }
];

const SUBJECT_WORDS = [
  'ecuatie', 'ecuatii', 'fractie', 'fractii', 'procent', 'perimetru', 'teorema', 'pitagora',
  'radical', 'ipotenuza', 'bisectoare', 'cateta', 'paralelogram', 'polinom', 'inmultire',
  'impartire', 'geometrie', 'algebra', 'probabilitate', 'arie', 'aria', 'metafora', 'epitet',
  'nuvela', 'genitiv', 'ortografie', 'cratima', 'propozitie', 'subordonata', 'morfologie',
  'sintaxa', 'literatura', 'naratiune', 'adunare', 'scadere'
];

const BROAD_SUBJECT = ['matematica', 'mate', 'romana', 'gramatica'];

const TUTOR = {
  answer: `Asta e o întrebare de matematică sau de limba română. O luăm cu ${MASCOT_NAME}, tutorele, nu de aici.`,
  screen: 'professor',
  extras: {}
};

function normalize(text) {
  return fold(text).replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

function levenshtein(left, right) {
  const a = String(left);
  const b = String(right);
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  if (a.length > 24 || b.length > 24) return 99;
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const saved = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = saved;
    }
  }
  return row[b.length];
}

function close(token, word) {
  if (token === word) return true;
  if (token.length < 4 || word.length < 4) return false;
  if (Math.abs(token.length - word.length) > 2) return false;
  const limit = Math.max(token.length, word.length) >= 7 ? 2 : 1;
  return levenshtein(token, word) <= limit;
}

function tokensOf(text) {
  return text.split(' ').filter(token => token.length >= 3);
}

function hasWord(text, words) {
  const tokens = text.split(' ');
  return words.some(word => tokens.some(token => close(token, word) || token === word));
}

function scoreEntry(query, entry) {
  const tokens = tokensOf(query);
  let best = 0;
  for (const raw of entry.keys) {
    const phrase = normalize(raw);
    if (!phrase) continue;
    if (phrase.length >= 4 && (query === phrase || query.includes(phrase))) {
      best = 1;
      continue;
    }
    const parts = phrase.split(' ').filter(part => part.length >= 4);
    if (!parts.length) continue;
    const hits = parts.filter(part => tokens.some(token => close(token, part))).length;
    best = Math.max(best, hits / parts.length);
  }
  return best;
}

function subjectQuestion(query) {
  const specific = hasWord(query, SUBJECT_WORDS);
  const broad = hasWord(query, BROAD_SUBJECT);
  const solve = /\b(cum se|explica|rezolv|calcul|ce inseamna|ce este|ce e|formula|demonstre|nu inteleg|ajuta|problema|exerciti)\b/.test(query);
  return { specific, broad, solve };
}

function askApp(query) {
  const text = normalize(query);
  if (!text) return null;
  const subject = subjectQuestion(text);
  if ((subject.specific || subject.broad) && subject.solve) {
    return { id: 'materie', ...TUTOR };
  }
  let best = null;
  let bestScore = 0;
  for (const entry of APP_FAQ) {
    const score = scoreEntry(text, entry);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  if (best && bestScore >= 0.66 && !(subject.specific && bestScore < 1)) {
    return {
      id: best.id,
      answer: best.answer,
      screen: best.screen,
      extras: best.extras || {}
    };
  }
  if (subject.specific || (subject.broad && subject.solve)) {
    return { id: 'materie', ...TUTOR };
  }
  return {
    id: 'necunoscut',
    answer: 'Pot răspunde despre aplicație: setări, temă, clasament, prieteni, lecții, caiet, calendar sau magazin. Scrie pe scurt ce cauți.',
    screen: '',
    extras: {}
  };
}

export { APP_FAQ, askApp, normalize };
