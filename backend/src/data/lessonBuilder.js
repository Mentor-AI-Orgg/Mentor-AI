// Un singur builder pentru lecțiile rescrise. Helperele vechi `lesson()`
// rămân în fișierele de capitol până la etapa lor.
//
// mathLesson și romanaLesson primesc câmpurile pe nume. Construiesc obiectul
// complet și `platter`-ul: scot `**`, păstrez „Exemplu lucrat:” și, când există
// `answers`, adaug „Răspunsuri: 1) …; 2) …”. `recap` se calculează din
// `keyPoints` (unite cu spațiu), ca mentorul să citească la fel ca azi.

function stripPlatter(text) {
  return String(text || '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function exampleText(example) {
  return String(example || '').replace(/^Exemplu lucrat:\s*/i, '');
}

function recapText(fields) {
  if (Array.isArray(fields.keyPoints) && fields.keyPoints.length) {
    return fields.keyPoints.join(' ');
  }
  return fields.recap || '';
}

function answersLine(answers) {
  if (!Array.isArray(answers) || !answers.length) return '';
  return `Răspunsuri: ${answers.map((answer, index) => `${index + 1}) ${String(answer).trim()}`).join('; ')}`;
}

function blockLines(items) {
  return (items || []).map(item => [item.title, item.text].filter(Boolean).join('\n')).filter(Boolean);
}

function withDefined(lesson, fields) {
  [
    'practice', 'mistakes', 'figure', 'figures', 'formulas', 'boxes',
    'extraExamples', 'answers', 'keyPoints', 'more', 'seeAlso', 'kind'
  ].forEach(key => {
    if (fields[key] !== undefined && fields[key] !== '') lesson[key] = fields[key];
  });
  return lesson;
}

function mathLesson(fields = {}) {
  const example = exampleText(fields.example);
  const recap = recapText(fields);
  const rich = (fields.boxes && fields.boxes.length)
    || (fields.extraExamples && fields.extraExamples.length)
    || (fields.answers && fields.answers.length)
    || (fields.more && fields.more.length);
  const core = [
    fields.theory,
    `Exemplu lucrat: ${example}`,
    fields.practice ? `Exersează: ${fields.practice}` : '',
    fields.mistakes ? `Greșeli frecvente: ${fields.mistakes}` : '',
    fields.tryThis,
    recap
  ];
  let platter;
  if (!rich) {
    platter = stripPlatter(core.filter(Boolean).join('\n\n'));
  } else {
    const parts = [
      ...blockLines(fields.boxes),
      fields.theory,
      `Exemplu lucrat: ${example}`,
      ...blockLines(fields.extraExamples),
      fields.practice ? `Exersează: ${fields.practice}` : '',
      answersLine(fields.answers),
      fields.mistakes ? `Greșeli frecvente: ${fields.mistakes}` : '',
      fields.tryThis,
      recap,
      ...blockLines(fields.more)
    ];
    platter = stripPlatter(parts.filter(Boolean).join('\n\n'));
  }
  return withDefined({
    id: fields.id,
    title: fields.title,
    platter,
    theory: fields.theory || '',
    example,
    tryThis: fields.tryThis || '',
    recap
  }, fields);
}

function romanaLesson(fields = {}) {
  const example = exampleText(fields.example);
  const recap = recapText(fields);
  const rich = (fields.boxes && fields.boxes.length)
    || (fields.extraExamples && fields.extraExamples.length)
    || (fields.answers && fields.answers.length)
    || (fields.more && fields.more.length)
    || fields.practice
    || fields.mistakes;
  let platter;
  if (!rich) {
    platter = stripPlatter([fields.theory, `Exemplu lucrat: ${example}`, fields.tryThis, recap].join('\n\n'));
  } else {
    platter = stripPlatter([
      ...blockLines(fields.boxes),
      fields.theory,
      `Exemplu lucrat: ${example}`,
      ...blockLines(fields.extraExamples),
      fields.practice ? `Exersează: ${fields.practice}` : '',
      answersLine(fields.answers),
      fields.mistakes ? `Greșeli frecvente: ${fields.mistakes}` : '',
      fields.tryThis,
      recap,
      ...blockLines(fields.more)
    ].filter(Boolean).join('\n\n'));
  }
  return withDefined({
    id: fields.id,
    title: fields.title,
    platter,
    theory: fields.theory || '',
    example,
    tryThis: fields.tryThis || '',
    recap
  }, fields);
}

module.exports = { mathLesson, romanaLesson, stripPlatter };
