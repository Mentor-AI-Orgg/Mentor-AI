const STORAGE_KEY = 'mentor_ai_v3_data';

const defaultUserData = {
  name: '',
  surname: '',
  planId: 'free',
  role: 'student',
  level: 1,
  xp: 0,
  xpToNext: 60,
  xpIntoLevel: 0,
  nextLevelAt: 60,
  levelSpan: 60,
  coins: 0,
  streak: 0,
  completionStreak: 0,
  streakFreezes: 1,
  streakFrozeYesterday: false,
  readiness: null,
  praiseNotice: null,
  score: 0,
  chaptersDone: 0,
  chaptersTotal: 10,
  chapters: {},
  savedSessions: [],
  totalHours: 0,
  school: '',
  class: '5',
  subject: 'matematica',
  profile: 'matematica',
  exam: '',
  dailyHours: '',
  language: 'ro',
  uiLanguage: 'ro',
  parentEmail: '',
  childEmail: '',
  teacherEmail: '',
  avatarId: '',
  themeId: '',
  titleId: '',
  titleName: '',
  voiceId: '',
  firstLoginRewardClaimed: false,
  isLoggedIn: false,
  username: '',
  hasCompletedOnboarding: false,
  lastStudy: null
};

const DEFAULT_PARENT_NOTIFICATION_PREFERENCES = {
  dailyDigest: true,
  instantMessages: false,
  weeklyReport: true,
  focusAlerts: true
};

const formatRoDate = () => {
  const label = new Intl.DateTimeFormat('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const PRIVATE_FIELDS = ['email', 'phone', 'parentEmail', 'parentEmailPending', 'school', 'name', 'surname', 'fullName'];

function toStoredUser(data = {}) {
  const next = { ...data };
  PRIVATE_FIELDS.forEach(key => {
    delete next[key];
  });
  return next;
}

function cleanStoredUser(data = {}) {
  return toStoredUser({ ...defaultUserData, ...data });
}

export {
  STORAGE_KEY,
  defaultUserData,
  DEFAULT_PARENT_NOTIFICATION_PREFERENCES,
  formatRoDate,
  toStoredUser,
  cleanStoredUser,
  PRIVATE_FIELDS
};
