// Citește răspunsul copilului pe lângă barem: acceptă forme echivalente
// (unități, x = …, virgulă, fracție) și explică de ce punctează sau nu.
// Nu e un model de copiat — e judecata de profesor.

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/,/g, '.')
    .replace(/[–—−]/g, '-')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/°/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(text, max = 80) {
  const raw = String(text || '').replace(/\s+/g, ' ').trim();
  if (raw.length <= max) return raw;
  return `${raw.slice(0, max - 1)}…`;
}

function compact(text) {
  return fold(text).replace(/[^a-z0-9./+-]/g, '');
}

function stripUnits(text) {
  return fold(text)
    .replace(/\bx\s*=\s*/g, '')
    .replace(/\b(lei|cm2|cm|mm|km|ml|ore|ora|secunde|s|grade|puncte|elevi|numere|saci)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseOneNumber(chunk) {
  const s = stripUnits(chunk);
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (frac && Number(frac[2]) !== 0) return Number(frac[1]) / Number(frac[2]);
  if (/^-?\d+(?:\.\d+)?$/.test(s)) return Number(s);
  return null;
}

function candidateNumbers(text) {
  const s = stripUnits(text);
  const found = [];
  const re = /-?\d+(?:\.\d+)?(?:\s*\/\s*-?\d+(?:\.\d+)?)?/g;
  let match = re.exec(s);
  while (match) {
    const value = parseOneNumber(match[0]);
    if (Number.isFinite(value)) found.push(value);
    match = re.exec(s);
  }
  return found;
}

function closeEnough(a, b, tolerance = 0) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  const tol = Math.max(Number(tolerance) || 0, 1e-9);
  return Math.abs(a - b) <= tol;
}

function numberHit(given, target, tolerance = 0) {
  const want = Number(target);
  if (!Number.isFinite(want)) return false;
  const whole = parseOneNumber(given);
  if (closeEnough(whole, want, tolerance)) return true;
  const nums = candidateNumbers(given);
  if (!nums.length) return false;
  if (nums.length === 1) return closeEnough(nums[0], want, tolerance);
  return closeEnough(nums[nums.length - 1], want, tolerance) || closeEnough(nums[0], want, tolerance);
}

function numberSetEqual(given, expected) {
  const a = [...new Set(candidateNumbers(given))].sort((x, y) => x - y);
  const b = [...new Set(candidateNumbers(expected))].sort((x, y) => x - y);
  if (!a.length || a.length !== b.length) return false;
  return a.every((value, index) => closeEnough(value, b[index], 1e-9));
}

const YES = /^(da|yes|adevarat|corect|apartine|e inauntru|inauntru)\b/;
const NO = /^(nu|no|fals|nu apartine|in afara)\b/;

function yesNoHit(given, expected) {
  const g = fold(given);
  const e = fold(expected);
  if (YES.test(g) && YES.test(e)) return true;
  if (NO.test(g) && NO.test(e)) return true;
  return false;
}

function textHit(given, expected) {
  const g = fold(given);
  const e = fold(expected);
  if (!e) return false;
  if (g === e || compact(g) === compact(e)) return true;
  if (e.length >= 6 && (g.includes(e) || e.includes(g))) return true;
  if (yesNoHit(g, e)) return true;
  if (numberSetEqual(g, e) && candidateNumbers(e).length >= 2) return true;
  return false;
}

function letterOfChoice(choices, given) {
  const list = Array.isArray(choices) ? choices : [];
  const raw = String(given || '').trim().toUpperCase();
  if (/^[A-D]$/.test(raw)) return raw;
  const idx = list.findIndex(choice => textHit(given, choice) || numberHit(given, parseOneNumber(choice) ?? NaN, 1e-9));
  return idx >= 0 ? 'ABCD'[idx] : '';
}

function judgeAnswer(payload = {}) {
  const given = String(payload.given == null ? '' : payload.given).trim();
  const answers = (payload.answers || []).map(String).filter(Boolean);
  const tokens = (payload.tokens || []).map(fold).filter(Boolean);
  const choices = payload.choices || [];
  const letter = String(payload.letter || '').trim().toUpperCase();
  const explain = String(payload.explain || '').replace(/\s+/g, ' ').trim();
  const sample = answers[0] || (letter && choices['ABCD'.indexOf(letter)]) || letter || '';
  const numeric = payload.numeric && Number.isFinite(Number(payload.numeric.value))
    ? { value: Number(payload.numeric.value), tolerance: Number(payload.numeric.tolerance) || 0 }
    : null;

  if (!given) {
    return {
      ok: false,
      credit: 0,
      kind: 'empty',
      teacher: 'Foaia e goală la acest item. Nu am ce judeca. Scrie răspunsul, chiar scurt.',
      sample
    };
  }

  const expected = [...answers];
  if (letter) expected.push(letter);
  if (letter && choices['ABCD'.indexOf(letter)]) expected.push(String(choices['ABCD'.indexOf(letter)]));

  const pickedLetter = letterOfChoice(choices, given);
  if (letter && pickedLetter && pickedLetter === letter) {
    const sameForm = fold(given) === fold(letter) || fold(given) === fold(sample);
    return {
      ok: true,
      credit: 1,
      kind: sameForm ? 'exact' : 'equivalent',
      teacher: sameForm
        ? `Am punctat. «${clip(given)}» e varianta din barem.`
        : `Am punctat. Ai scris «${clip(given)}», iar baremul are ${letter}${sample ? ` (${clip(sample)})` : ''}. E aceeași valoare, doar altfel spus.`,
      sample: sample || letter
    };
  }

  for (const answer of expected) {
    if (textHit(given, answer)) {
      const exact = fold(given) === fold(answer);
      return {
        ok: true,
        credit: 1,
        kind: exact ? 'exact' : 'equivalent',
        teacher: exact
          ? `Am punctat. «${clip(given)}» e ce cere baremul.`
          : `Am punctat, deși nu e identic. Tu: «${clip(given)}». Baremul: «${clip(answer)}». E aceeași idee, altă formulare.`,
        sample: answer
      };
    }
    const asNumber = parseOneNumber(answer);
    if (Number.isFinite(asNumber) && numberHit(given, asNumber, numeric ? numeric.tolerance : 1e-9)) {
      return {
        ok: true,
        credit: 1,
        kind: fold(given) === fold(answer) ? 'exact' : 'equivalent',
        teacher: `Am punctat. «${clip(given)}» e același rezultat ca «${clip(answer)}» din barem (altă scriere: unitate, x = …, virgulă sau fracție).`,
        sample: answer
      };
    }
  }

  if (numeric && numberHit(given, numeric.value, numeric.tolerance)) {
    return {
      ok: true,
      credit: 1,
      kind: 'equivalent',
      teacher: `Am punctat. Numărul tău «${clip(given)}» e ${numeric.value}, ca în barem.`,
      sample: sample || String(numeric.value)
    };
  }

  if (tokens.length) {
    const g = fold(given);
    const hit = tokens.filter(token => g.includes(token));
    if (hit.length === tokens.length) {
      return {
        ok: true,
        credit: 1,
        kind: 'equivalent',
        teacher: `Am punctat. În «${clip(given)}» se văd ideile din barem (${hit.join(', ')}), chiar dacă fraza e a ta.`,
        sample
      };
    }
    if (hit.length && numeric && numberHit(given, numeric.value, numeric.tolerance || 0)) {
      return {
        ok: true,
        credit: 1,
        kind: 'equivalent',
        teacher: `Am punctat. Ai numărul din barem și o parte din idei. E destul.`,
        sample
      };
    }
    if (hit.length && !numeric) {
      return {
        ok: false,
        credit: 0.5,
        kind: 'partial',
        teacher: `Am dat jumătate. În «${clip(given)}» se vede «${hit.join(', ')}», dar lipsește ${tokens.filter(t => !hit.includes(t)).join(', ')}. Baremul întreg: «${clip(sample)}».${explain ? ` ${clip(explain, 140)}` : ''}`,
        sample
      };
    }
  }

  if (numeric && candidateNumbers(given).length) {
    const got = candidateNumbers(given).pop();
    const want = numeric.value;
    const gap = Math.abs(got - want);
    if (gap > 0 && gap <= Math.max(2, Math.abs(want) * 0.2)) {
      return {
        ok: false,
        credit: 0,
        kind: 'near',
        teacher: `Nu am punctat. Ai scris «${clip(given)}» (iau ${got}), baremul vrea ${want}. Ești aproape — refă ultimul pas, nu tot exercițiul.${explain ? ` ${clip(explain, 140)}` : ''}`,
        sample: sample || String(want)
      };
    }
  }

  return {
    ok: false,
    credit: 0,
    kind: 'wrong',
    teacher: `Nu am punctat. Tu: «${clip(given)}». Baremul: «${clip(sample)}». Nu e aceeași valoare și nu e o reformulare a ei.${explain ? ` ${clip(explain, 160)}` : ''}`,
    sample
  };
}

module.exports = { judgeAnswer, fold, parseOneNumber, numberHit, letterOfChoice };
