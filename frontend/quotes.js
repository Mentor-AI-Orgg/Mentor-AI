const QUOTES = [
  { text: 'Nu lăsa pe mâine ce poți face azi.', by: 'proverb' },
  { text: 'Călătoria de o mie de mile începe cu un singur pas.', by: 'Lao Tzu' },
  { text: 'Nu contează cât de încet mergi, atâta timp cât nu te oprești.', by: 'Confucius' },
  { text: 'Cel care mută un munte începe prin a căra pietre mici.', by: 'Confucius' },
  { text: 'Fă ce poți, cu ce ai, acolo unde ești.', by: 'Theodore Roosevelt' },
  { text: 'Succesul e suma eforturilor mici, repetate zi de zi.', by: 'Robert Collier' },
  { text: 'Nu trebuie să fii grozav ca să începi, dar trebuie să începi ca să fii grozav.', by: 'Zig Ziglar' },
  { text: 'Cunoașterea e putere.', by: 'Francis Bacon' },
  { text: 'Practica face măiestria.', by: 'proverb' },
  { text: 'Nu ești învins până nu renunți.', by: 'proverb' },
  { text: 'Greșelile sunt dovada că încerci.', by: 'proverb de lucru' },
  { text: 'Cel mai bun moment să plantezi un copac a fost acum douăzeci de ani. Al doilea cel mai bun e acum.', by: 'proverb chinez' },
  { text: 'Un copil, un profesor, un pix și o carte pot schimba lumea.', by: 'Malala Yousafzai' },
  { text: 'Învață ca și cum ai trăi veșnic.', by: 'Mahatma Gandhi' },
  { text: 'Nu am eșuat. Am găsit mii de feluri care nu funcționează.', by: 'Thomas Edison' },
  { text: 'Mintea e ca o parașută: funcționează când e deschisă.', by: 'Frank Zappa' },
  { text: 'Nu visuri lungi. Un pas mic, astăzi.', by: 'Mentor AI' },
  { text: 'Nu renunța. Greșeala de azi e antrenamentul de mâine.', by: 'Mentor AI' },
  { text: 'Hai încă o problemă. Creierul tău colecționează stele.', by: 'Mentor AI' },
  { text: 'Fii curajos, chiar și atunci când ți-e un pic teamă.', by: 'proverb de lucru' }
];

const GRADE_QUOTES = {
  high: [
    { text: 'Ai făcut treaba. Ține ritmul, nu doar nota.', by: 'Mentor AI' },
    { text: 'Succesul e suma eforturilor mici, repetate zi de zi.', by: 'Robert Collier' },
    { text: 'Cunoașterea e putere. Ai arătat că o folosești.', by: 'Francis Bacon' }
  ],
  good: [
    { text: 'Ești pe drum. Încă un pas și se vede.', by: 'Mentor AI' },
    { text: 'Nu contează cât de încet mergi, atâta timp cât nu te oprești.', by: 'Confucius' },
    { text: 'Practica face măiestria.', by: 'proverb' }
  ],
  ok: [
    { text: 'Nota e un semnal, nu o sentință. Mai încearcă același capitol.', by: 'Mentor AI' },
    { text: 'Greșelile sunt dovada că încerci.', by: 'proverb de lucru' },
    { text: 'Cel care mută un munte începe prin a căra pietre mici.', by: 'Confucius' }
  ],
  low: [
    { text: 'Nu ești învins până nu renunți.', by: 'proverb' },
    { text: 'Nu am eșuat. Am găsit mii de feluri care nu funcționează.', by: 'Thomas Edison' },
    { text: 'Nu renunța. Greșeala de azi e antrenamentul de mâine.', by: 'Mentor AI' }
  ]
};

function gradeBand(grade) {
  const n = Number(grade);
  if (!Number.isFinite(n)) return 'ok';
  if (n >= 9) return 'high';
  if (n >= 7) return 'good';
  if (n >= 5) return 'ok';
  return 'low';
}

function indexFromSeed(seed, length) {
  const n = Number(seed);
  const i = Number.isFinite(n) ? Math.abs(Math.floor(n)) : 0;
  return i % Math.max(1, length);
}

function quoteFor(seed = Date.now()) {
  return QUOTES[indexFromSeed(seed, QUOTES.length)];
}

function quoteForGrade(grade, seed) {
  const band = GRADE_QUOTES[gradeBand(grade)] || GRADE_QUOTES.ok;
  const raw = seed != null ? Number(seed) : Math.round(Number(grade) * 10);
  return band[indexFromSeed(raw, band.length)] || band[0];
}

function dailyQuote() {
  const key = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash + key.charCodeAt(i) * (i + 5)) % QUOTES.length;
  return QUOTES[hash];
}

function formatQuote(entry) {
  if (!entry) return '';
  return `„${entry.text}” — ${entry.by}`;
}

export { QUOTES, GRADE_QUOTES, gradeBand, quoteFor, quoteForGrade, dailyQuote, formatQuote };
