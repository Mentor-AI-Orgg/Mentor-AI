const STORAGE_KEY = 'mentor_ai_v3_data';

const defaultUserData = {
  name: '',
  surname: '',
  planId: 'free',
  role: 'student',
  level: 1,
  xp: 0,
  coins: 0,
  streak: 0,
  score: 0,
  totalHours: 0,
  school: '',
  class: '',
  profile: '',
  exam: '',
  dailyHours: '',
  language: 'ro',
  uiLanguage: 'ro',
  parentEmail: '',
  childEmail: '',
  teacherEmail: '',
  avatarId: '',
  themeId: '',
  voiceId: '',
  firstLoginRewardClaimed: false,
  isLoggedIn: false,
  hasCompletedOnboarding: false
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

export { STORAGE_KEY, defaultUserData, DEFAULT_PARENT_NOTIFICATION_PREFERENCES, formatRoDate };
