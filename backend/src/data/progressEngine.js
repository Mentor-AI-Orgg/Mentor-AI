function yesterdayKey(from = new Date()) {
  const date = new Date(from);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

// Cumulative XP to reach each level. Level 1 starts at 0.
// First finished lesson (login 20 + chapter 20 + session 25) reaches level 2.
// Mythic cosmetics stay gated at level 5 (650 XP). After the table, +400 / level.
const XP_THRESHOLDS = [0, 60, 180, 360, 650, 900, 1200, 1550, 1950, 2400, 2900];
const XP_AFTER = 400;

function levelFromXp(xp) {
  const value = Math.max(0, Number(xp) || 0);
  const last = XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  let level = 1;
  let current = 0;
  let next = XP_THRESHOLDS[1] || XP_AFTER;

  if (value >= last) {
    const steps = Math.floor((value - last) / XP_AFTER);
    level = XP_THRESHOLDS.length + steps;
    current = last + steps * XP_AFTER;
    next = current + XP_AFTER;
  } else {
    for (let i = XP_THRESHOLDS.length - 1; i >= 0; i -= 1) {
      if (value >= XP_THRESHOLDS[i]) {
        level = i + 1;
        current = XP_THRESHOLDS[i];
        next = XP_THRESHOLDS[i + 1];
        break;
      }
    }
  }

  return {
    level,
    xp: value,
    xpIntoLevel: value - current,
    xpToNext: Math.max(0, next - value),
    nextLevelAt: next,
    levelSpan: next - current
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
  streak_day: { coins: 5, xp: 5 },
  chapter_test: { coins: 10, xp: 15 }
};

function lessonsUntilNext(xpToNext) {
  const left = Math.max(0, Number(xpToNext) || 0);
  const lesson = Math.max(1, Number(AWARDS.session_complete.xp) || 25);
  if (!left) return 0;
  return Math.ceil(left / lesson);
}

module.exports = {
  yesterdayKey,
  levelFromXp,
  touchStudy,
  AWARDS,
  XP_THRESHOLDS,
  XP_AFTER,
  lessonsUntilNext
};
