const { ensureUser, getUser, getTodayKey } = require('./economyStore');

const PHOTO_DAILY_LIMIT = 3;

function getPhotoDay(user) {
  const today = getTodayKey();
  if (!user.enPhotoDay || user.enPhotoDay.date !== today) {
    user.enPhotoDay = { date: today, used: 0 };
  }
  return user.enPhotoDay;
}

function photoStatus(userId) {
  const user = ensureUser(userId);
  const day = getPhotoDay(user);
  return {
    used: Number(day.used) || 0,
    remaining: Math.max(0, PHOTO_DAILY_LIMIT - (Number(day.used) || 0)),
    limit: PHOTO_DAILY_LIMIT,
    date: day.date
  };
}

function consumePhotoSlot(userId) {
  const status = photoStatus(userId);
  if (status.remaining <= 0) {
    return { ok: false, error: `Ai folosit cele ${PHOTO_DAILY_LIMIT} poze de azi. Mâine ai din nou ${PHOTO_DAILY_LIMIT} — ca să rămână app-ul gratuit.`, ...status };
  }
  const user = ensureUser(userId);
  const day = getPhotoDay(user);
  day.used = (Number(day.used) || 0) + 1;
  return { ok: true, ...photoStatus(userId) };
}

require('./userDataRegistry').register('fotografii', {
  exportFor(email) {
    const user = getUser(email);
    const day = user?.enPhotoDay;
    if (!day) return { zi: '', folosite: 0 };
    return { zi: day.date || '', folosite: Number(day.used) || 0 };
  },
  eraseFor(email) {
    const user = getUser(email);
    if (user) delete user.enPhotoDay;
  }
});

module.exports = { PHOTO_DAILY_LIMIT, photoStatus, consumePhotoSlot };
