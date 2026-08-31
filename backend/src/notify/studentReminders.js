// Un singur mesaj pe zi, scurt și jucăuș. Fără spam:
// întâi o dată importantă, apoi o lecție neterminată, apoi un punct slab.

const calendarStore = require('../data/calendarStore');

const WEEKDAY_RO = ['luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă', 'duminică'];

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, n) {
  const next = new Date(date);
  next.setDate(next.getDate() + n);
  return next;
}

function pickUpcomingImportant(events, now = new Date()) {
  const today = todayKey(now);
  const tomorrow = todayKey(addDays(now, 1));
  return (events || [])
    .filter(ev => ev && ev.type !== 'orar' && ev.date && (ev.important || ev.type === 'important'))
    .filter(ev => ev.date === today || ev.date === tomorrow)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.time).localeCompare(String(b.time)))[0] || null;
}

function pickOrarToday(events, now = new Date()) {
  const weekday = (now.getDay() + 6) % 7;
  const hour = now.getHours() * 60 + now.getMinutes();
  return (events || [])
    .filter(ev => ev && ev.type === 'orar' && Number(ev.weekday) === weekday && ev.time)
    .filter(ev => {
      const [h, m] = String(ev.time).split(':').map(Number);
      const start = (h || 0) * 60 + (m || 0);
      return start - hour <= 90 && start - hour >= -15;
    })[0] || null;
}

function buildNudge({ user, summary, events, now = new Date() }) {
  const important = pickUpcomingImportant(events, now);
  if (important) {
    const when = important.date === todayKey(now) ? 'azi' : 'mâine';
    return {
      key: `imp:${important.date}:${important.id || important.title}`,
      subject: when === 'azi' ? 'Azi e important.' : 'Mâine e important.',
      body: `Psst. ${when === 'azi' ? 'Azi' : 'Mâine'} e „${important.title}”${important.time ? `, la ${important.time}` : ''}. Pune ghiozdanul din vreme.`
    };
  }

  const orar = pickOrarToday(events, now);
  if (orar) {
    return {
      key: `orar:${todayKey(now)}:${orar.id || orar.title}`,
      subject: 'Ora ta.',
      body: `Azi, ${WEEKDAY_RO[(now.getDay() + 6) % 7]}, la ${orar.time} ai „${orar.title}” în orar. Creion ascuțit.`
    };
  }

  const openChapter = Object.values(user?.chapters || {}).find(row => row && row.status && row.status !== 'done');
  if (openChapter?.title || openChapter?.chapterId) {
    const title = openChapter.title || openChapter.chapterId;
    return {
      key: `cap:${openChapter.chapterId || title}`,
      subject: 'O lecție te așteaptă.',
      body: `Ai lăsat „${title}” deschis. Un paragraf, și e al tău.`
    };
  }

  const weak = (summary?.weaknesses && summary.weaknesses[0]) || null;
  if (weak) {
    return {
      key: `weak:${weak}`,
      subject: 'Un punct de lucrat.',
      body: `La „${weak}” te-ai mai împiedicat. 5 minute, un exemplu, gata.`
    };
  }

  const mission = (summary?.missions?.items || []).find(item => !item.done);
  if (mission) {
    return {
      key: `mis:${todayKey(now)}:${mission.id}`,
      subject: 'Un pas mic azi.',
      body: `${mission.label}. Nu e temă de trei ore — e un pas, apoi te joci.`
    };
  }

  return null;
}

function issueStudentNudge(userId, { user, summary, now } = {}) {
  const { ensureUser, pushNotification, getNotifications } = require('../data/economyStore');
  const account = user || ensureUser(userId);
  const day = todayKey(now || new Date());
  const inbox = getNotifications(userId).inbox || [];
  const todayNudge = inbox.find(note => note.channel === 'nudge' && String(note.createdAt || '').slice(0, 10) === day);
  if (todayNudge) {
    return { already: true, nudge: { subject: todayNudge.subject, body: todayNudge.body, id: todayNudge.id } };
  }

  const events = calendarStore.getEvents(userId);
  const { getSkillHistory } = require('../data/economyStore');
  const skills = getSkillHistory(userId);
  const draft = buildNudge({
    user: account,
    summary: { ...(summary || {}), weaknesses: skills.weaknesses },
    events,
    now: now || new Date()
  });
  if (!draft) return { already: false, nudge: null };
  if (account.lastNudgeKey === draft.key && account.lastNudgeDay === day) {
    return { already: true, nudge: null };
  }

  const note = pushNotification(userId, userId, draft.subject, draft.body, 'nudge', { mocked: true, delivered: true });
  account.lastNudgeDay = day;
  account.lastNudgeKey = draft.key;
  return { already: false, nudge: { id: note.id, subject: draft.subject, body: draft.body } };
}

module.exports = {
  buildNudge,
  issueStudentNudge,
  pickUpcomingImportant,
  pickOrarToday,
  todayKey
};
