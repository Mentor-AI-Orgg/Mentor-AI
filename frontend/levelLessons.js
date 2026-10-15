const LESSON_XP = 25;

function lessonsUntilNext(xpToNext) {
  const left = Math.max(0, Number(xpToNext) || 0);
  if (!left) return 0;
  return Math.ceil(left / LESSON_XP);
}

function lessonsLabel(xpToNext, nextLevel) {
  const count = lessonsUntilNext(xpToNext);
  const noun = count === 1 ? 'lecție' : 'lecții';
  const level = Math.max(1, Number(nextLevel) || 2);
  return `Mai ai ${count} ${noun} până la nivelul ${level}`;
}

export { LESSON_XP, lessonsUntilNext, lessonsLabel };
