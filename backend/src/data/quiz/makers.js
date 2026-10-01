function flash({
  id,
  lesson,
  level,
  question,
  options,
  correct,
  explain,
  point,
  secondary,
  trap
}) {
  return {
    id,
    point: point || lesson,
    question,
    options,
    correct,
    explain,
    lesson,
    level,
    secondary: secondary || undefined,
    trap: trap || undefined
  };
}

function written({
  id,
  lesson,
  level,
  prompt,
  answers,
  explain,
  point,
  hint,
  numeric,
  tokens,
  steps,
  long,
  minWords,
  choices,
  match,
  secondary,
  trap
}) {
  return {
    id,
    point: point || lesson,
    prompt,
    answers: (answers || []).slice(),
    explain,
    hint: hint || '',
    numeric: numeric || null,
    tokens: tokens || [],
    long: Boolean(long),
    minWords: Number(minWords) || 0,
    steps: Array.isArray(steps) ? steps.slice() : [],
    level,
    lesson,
    choices: choices || undefined,
    match: match || undefined,
    secondary: secondary || undefined,
    trap: trap || undefined
  };
}

module.exports = { flash, written };
