function yesterdayKey(from = new Date()) {
  const date = new Date(from);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function levelFromXp(xp) {
  const value = Math.max(0, Number(xp) || 0);
  const thresholds = [0, 80, 200, 400, 650, 950, 1300, 1700, 2200, 2800, 3500];
  let level = 1;
  for (let i = thresholds.length - 1; i >= 0; i -= 1) {
    if (value >= thresholds[i]) {
      level = i + 1;
      break;
    }
  }
  const current = thresholds[level - 1] || 0;
  const next = thresholds[level] || current + 800;
  return {
    level,
    xp: value,
    xpIntoLevel: value - current,
    xpToNext: Math.max(0, next - value),
    nextLevelAt: next
  };
}

function touchStudy(user, todayKey) {
  if (!user.metrics) user.metrics = {};
  if (user.metrics.lastStudyDate === todayKey) {
    return { streak: user.metrics.streak || 0, firstToday: false };
  }
  if (user.metrics.lastStudyDate === yesterdayKey()) {
    user.metrics.streak = Math.max(1, (user.metrics.streak || 0) + 1);
  } else {
    user.metrics.streak = 1;
  }
  user.metrics.lastStudyDate = todayKey;
  return { streak: user.metrics.streak, firstToday: true };
}

const AWARDS = {
  login_bonus: { coins: 30, xp: 20 },
  chapter_open: { coins: 8, xp: 20 },
  session_complete: { coins: 15, xp: 25 },
  flashcards_5: { coins: 10, xp: 15 },
  focus_25: { coins: 12, xp: 10 },
  focus_50: { coins: 20, xp: 18 },
  mentor_message: { coins: 4, xp: 10 },
  streak_day: { coins: 5, xp: 5 }
};

module.exports = { yesterdayKey, levelFromXp, touchStudy, AWARDS };
