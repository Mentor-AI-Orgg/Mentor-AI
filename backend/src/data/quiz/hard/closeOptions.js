const { judgeAnswer } = require('../../../grading/answerJudge');

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function judgedWrong(correct, candidate) {
  const options = [correct, candidate, 'alt-răspuns', 'încă-unul'];
  const judged = judgeAnswer({
    given: candidate,
    answers: [correct],
    choices: options,
    letter: 'A'
  });
  return !judged.ok;
}

function rank(correct, words) {
  const target = fold(correct);
  return words
    .filter(word => word && fold(word) !== target)
    .map(word => {
      const form = fold(word);
      const lenGap = Math.abs(form.length - target.length);
      const tail = target.slice(-3);
      const head = target.slice(0, 2);
      const shareTail = tail && form.endsWith(tail) ? 0 : 2;
      const shareHead = head && form.startsWith(head) ? 0 : 1;
      return { word, score: lenGap + shareTail + shareHead };
    })
    .sort((a, b) => a.score - b.score || a.word.localeCompare(b.word, 'ro'));
}

function closeWrongs(correct, pool) {
  const picked = [];
  const seen = new Set([fold(correct)]);
  rank(correct, pool).forEach(row => {
    if (picked.length >= 3) return;
    const form = fold(row.word);
    if (seen.has(form)) return;
    if (!judgedWrong(correct, row.word)) return;
    seen.add(form);
    picked.push(row.word);
  });
  return picked;
}

function retuneCard(item, pool) {
  if (!item || !item.secondary || !Array.isArray(item.options) || item.options.length !== 4) return item;
  const correct = item.options[item.correct];
  if (!correct) return item;
  const words = (pool || [])
    .filter(other => other && other.secondary && other.lesson === item.lesson && other.id !== item.id)
    .map(other => other.options && other.options[other.correct])
    .filter(Boolean);
  const wrongs = closeWrongs(correct, words);
  if (wrongs.length < 3) return item;
  return { ...item, options: [correct, ...wrongs], correct: 0 };
}

module.exports = { retuneCard, closeWrongs };
