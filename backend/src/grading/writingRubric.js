// Barem de profesor: citește textul copilului, nu o grilă goală.
// Spirit OM 4.730/2022. Nu e un eseu-model de copiat.

const CONNECTORS = [
  'pentru ca', 'pentru că', 'deoarece', 'asadar', 'așadar', 'deci', 'apoi',
  'intai', 'întâi', 'dupa', 'după', 'in schimb', 'în schimb', 'totusi', 'totuși',
  'astfel', 'de exemplu', 'in concluzie', 'în concluzie'
];

const STOP = new Set([
  'si', 'și', 'sau', 'un', 'o', 'la', 'de', 'din', 'pe', 'cu', 'in', 'în',
  'a', 'ai', 'am', 'e', 'este', 'ca', 'că', 'ce', 'mai', 'nu', 'da', 'se', 'sa', 'să'
]);

function wordsOf(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function scoreBand(value, max) {
  return Math.max(0, Math.min(max, Math.round(value)));
}

function clip(text, max = 90) {
  const raw = String(text || '').replace(/\s+/g, ' ').trim();
  if (raw.length <= max) return raw;
  return `${raw.slice(0, max - 1)}…`;
}

function sentencesOf(text) {
  return String(text || '')
    .split(/(?<=[.!?…])\s+|\n+/)
    .map(part => part.trim())
    .filter(Boolean);
}

function mostRepeated(words) {
  const counts = {};
  words.forEach(word => {
    const key = fold(word).replace(/[^a-zăâîșț]+/gi, '');
    if (key.length < 4 || STOP.has(key)) return;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .filter(([, n]) => n >= 3)
    .sort((a, b) => b[1] - a[1])[0] || null;
}

function buildReading({ raw, words, exercise, hasAnchor, enoughWords, tooShort, hasConnector, hasStop, allCaps, sentences, repeat }) {
  const reading = [];
  const prompt = clip(exercise.prompt || '', 70);

  if (!raw) {
    reading.push({ quote: '', comment: 'Foaia e goală. Nu am ce citi. Scrie două fraze, cu vocea ta.' });
    return reading;
  }

  if (tooShort) {
    reading.push({
      quote: clip(raw, 60),
      comment: `Am citit tot. E un titlu, nu un text. Cerința cere o idee, nu un cuvânt${prompt ? ` — „${prompt}”` : ''}.`
    });
    return reading;
  }

  if (sentences[0]) {
    reading.push({
      quote: clip(sentences[0]),
      comment: hasAnchor
        ? 'Prima frază atinge cerința. De aici se poate construi.'
        : 'Încep aici, dar încă nu văd ce cere enunțul. Revino la întrebare înainte de a lungea.'
    });
  }

  if (sentences.length >= 2) {
    reading.push({
      quote: clip(sentences[sentences.length - 1]),
      comment: hasConnector
        ? 'Capătul se leagă de început (apoi / pentru că / deci). Firul se aude.'
        : 'Ultima frază e acolo, dar saltul dintre idei e gol. Pune un „apoi” sau un „pentru că”.'
    });
  } else if (enoughWords) {
    reading.push({
      quote: clip(raw, 80),
      comment: 'E un singur bloc. Taie în două: o faptă, apoi de ce sau ce urmează.'
    });
  }

  if (repeat) {
    const [word, n] = repeat;
    reading.push({
      quote: word,
      comment: `Cuvântul «${word}» apare de ${n} ori. Profesorul se plictisește. Schimbă unul.`
    });
  }

  if (allCaps) {
    reading.push({ quote: clip(raw, 40), comment: 'Totul e cu majuscule. Se citește ca un strigăt, nu ca o redactare.' });
  } else if (!hasStop && words.length >= 8) {
    reading.push({ quote: clip(raw, 70), comment: 'Fără punct, citesc dintr-o răsuflare. Pune un punct. Ochiul are nevoie de pauză.' });
  }

  if (hasAnchor && enoughWords && hasConnector && hasStop) {
    reading.push({
      quote: clip(sentences[0] || raw, 70),
      comment: 'Se citește ca un text de clasă: cerință, idee, fir. Recitește acordul o dată și gata.'
    });
  }

  return reading.slice(0, 4);
}

function teacherVoice({ total, max, note10, ok, raw, sentences, hasAnchor, tooShort, reading }) {
  const quote = clip((sentences[0] || raw || '').trim(), 70);
  if (!raw) {
    return `Ca la clasă: foaia e albă. Baremul (cerință, idee, fir) nu are pe ce pune puncte.`;
  }
  if (tooShort) {
    return `Ca la clasă: am citit «${quote}». Nu e încă. Baremul vrea o idee dezvoltată, nu o etichetă.`;
  }
  if (ok) {
    return `Ca la clasă: am citit «${quote}». Merită — ${total} din ${max} (cam nota ${note10}). Ține ce merge; unde e subțire, lungește cu un exemplu al tău.`;
  }
  if (!hasAnchor) {
    return `Ca la clasă: am citit «${quote}». Fraza e a ta, dar nu răspunde la cerință. Întoarce-te la enunț, apoi rescrie prima propoziție.`;
  }
  const tip = reading.find(row => row.comment && !/merită|se citește ca un text/i.test(row.comment));
  return `Ca la clasă: am citit «${quote}». Ai ${total} din ${max}. ${tip ? tip.comment : 'Mai scrie un capăt și un „pentru că”.'}`;
}

function gradeWriting(text, exercise = {}) {
  const raw = String(text || '').trim();
  const words = wordsOf(raw);
  const folded = fold(raw);
  const minWords = Number(exercise.minWords) || 8;
  const tokens = (exercise.tokens || []).map(fold).filter(Boolean);
  const answers = (exercise.answers || []).map(fold).filter(Boolean);
  const anchors = [...new Set([...tokens, ...answers.filter(a => a.length >= 3)])];

  const hasAnchor = anchors.length
    ? anchors.some(token => folded.includes(token))
    : words.length >= minWords;
  const enoughWords = words.length >= minWords;
  const tooShort = words.length > 0 && words.length < Math.max(4, Math.floor(minWords * 0.6));
  const sentences = sentencesOf(raw);

  const cerinta = tooShort ? 1 : (hasAnchor && enoughWords ? 6 : hasAnchor || enoughWords ? 4 : words.length ? 2 : 0);

  const unique = new Set(words.map(fold)).size;
  const richness = words.length ? unique / words.length : 0;
  const continut = scoreBand(
    (hasAnchor ? 4 : 1) + (enoughWords ? 2 : 0) + (richness > 0.55 ? 2 : richness > 0.4 ? 1 : 0),
    8
  );

  const paragraphs = raw.split(/\n+/).filter(p => p.trim()).length;
  const hasConnector = CONNECTORS.some(c => folded.includes(fold(c)));
  const hasStop = /[.!?…]/.test(raw);
  const organizare = scoreBand((paragraphs > 1 ? 2 : 1) + (hasConnector ? 2 : 0) + (hasStop ? 2 : 0), 6);

  const longWords = words.filter(w => w.length >= 6).length;
  const stil = scoreBand((richness > 0.6 ? 2 : 1) + (longWords >= 2 ? 2 : 1) + (hasConnector ? 1 : 0), 5);

  const allCaps = raw.length > 12 && raw === raw.toUpperCase();
  const repeats = words.length - unique;
  const corect = scoreBand(5 - (allCaps ? 2 : 0) - (repeats > words.length * 0.35 ? 1 : 0) - (!hasStop && words.length >= 8 ? 1 : 0), 5);
  const repeat = mostRepeated(words);

  const criteria = [
    {
      id: 'cerinta',
      label: 'Încadrare în cerință',
      max: 6,
      points: cerinta,
      note: hasAnchor
        ? (sentences[0] ? `În «${clip(sentences[0], 50)}» se vede cerința.` : 'Ai atins ce cere enunțul.')
        : 'Revino la cerință: ce anume ți s-a cerut?'
    },
    {
      id: 'continut',
      label: 'Conținut / idei',
      max: 8,
      points: continut,
      note: enoughWords ? 'Se vede o idee, nu doar un cuvânt.' : 'Mai dezvoltă. Baremul vrea ideea, nu un titlu.'
    },
    {
      id: 'organizare',
      label: 'Organizare',
      max: 6,
      points: organizare,
      note: hasConnector ? 'Firul se leagă (pentru că / apoi / deci).' : 'Leagă frazele: întâi… apoi… deci…'
    },
    {
      id: 'stil',
      label: 'Stil și vocabular',
      max: 5,
      points: stil,
      note: repeat
        ? `«${repeat[0]}» se tot întoarce. Schimbă un cuvânt.`
        : (richness > 0.55 ? 'Cuvintele nu se tot repetă.' : 'Schimbă un cuvânt tocit cu unul mai potrivit.')
    },
    {
      id: 'corect',
      label: 'Corectitudine',
      max: 5,
      points: corect,
      note: hasStop ? 'Punctuația ajută ochiul.' : 'Pune un punct. Profesorul citește cu vocea ta.'
    }
  ];

  const total = criteria.reduce((sum, row) => sum + row.points, 0);
  const max = 30;
  const note10 = Math.max(1, Math.min(10, Math.round((total / max) * 10)));
  const ok = total >= 16 && hasAnchor && !tooShort;
  const reading = buildReading({
    raw, words, exercise, hasAnchor, enoughWords, tooShort, hasConnector, hasStop, allCaps, sentences, repeat
  });
  const teacher = teacherVoice({ total, max, note10, ok, raw, sentences, hasAnchor, tooShort, reading });

  return {
    total,
    max,
    note10,
    ok,
    criteria,
    reading,
    teacher,
    sampleHint: (exercise.steps || []).length
      ? exercise.steps.join(' · ')
      : 'Plan pe ciornă. Cerința. Două idei. Un capăt. Recitește acordul.'
  };
}

function isWritingItem(exercise) {
  if (!exercise) return false;
  return Boolean(exercise.long) || Number(exercise.minWords) >= 5;
}

module.exports = { gradeWriting, isWritingItem };
