import { formatRoDate } from '../userData.js';
import { useI18n } from '../i18n/index.jsx';
import { avatarIcon } from '../appearance.js';
import { dailySlogan } from '../slogans.js';

const HomeScreen = ({ userData, onNavigate }) => {
  const { t, locale } = useI18n();
  const dateLabel = locale === 'en'
    ? new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
    : formatRoDate();
  const icon = avatarIcon(userData.avatarId);
  const xpInto = Number(userData.xpIntoLevel || 0);
  const xpNeed = Number(userData.xpToNext || 80) + xpInto || 80;
  const xpPct = Math.min(100, Math.round((xpInto / Math.max(1, xpNeed)) * 100));
  const todayHint = userData.chaptersDone
    ? t('home.todayContinue')
    : t('home.todayStart');

  return (
    <main className="home-page animate-fadeIn">
      <header className="home-header">
        <div>
          <div className="eyebrow">{dateLabel}</div>
          <h1 className="display-font home-title">{t('home.hello', { name: userData.name || t('home.studentFallback') })}</h1>
          <p className="home-role-tag">{userData.titleName ? `${userData.titleName} · ` : ''}{t('home.roleStudent')} · {t('home.gradeOnly', { grade: userData.class || '5' })}</p>
          <p className="home-slogan">{dailySlogan()}</p>
        </div>
        <button onClick={() => onNavigate('profile')} className="home-avatar" aria-label={t('home.openProfile')}>
          {icon ? <i className={`fas ${icon}`} /> : (userData.name || 'E').charAt(0).toUpperCase()}
        </button>
      </header>
      <section className="focus-card">
        <div>
          <div className="eyebrow">{t('home.focusEyebrow')}</div>
          <h2 className="display-font">{t('home.focusTitle')}<br />{t('home.focusTitle2')}</h2>
          <p>{todayHint}</p>
        </div>
        <button onClick={() => onNavigate('learn')} className="accent-button focus-action">{t('home.talkMentor')} <i className="fas fa-arrow-up-right-from-square" /></button>
      </section>
      <section className="progress-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{t('home.progressEyebrow')}</div>
            <h2 className="display-font">{t('home.progressTitle')}</h2>
          </div>
          <span className="progress-score">{userData.chaptersDone || 0}<small>/{userData.chaptersTotal || 10} {t('home.chapters')}</small></span>
        </div>
        <div className="progress-track"><div style={{ width: `${Math.min(userData.score || 0, 100)}%` }}></div></div>
        <p className="home-xp-line">{t('home.level')} {userData.level || 1} · {userData.xp || 0} XP · {t('home.nextXp', { count: userData.xpToNext || 80 })}</p>
        <div className="progress-track progress-track-xp"><div style={{ width: `${xpPct}%` }}></div></div>
        <div className="stats-grid">
          <div className="stat-card"><span>{t('home.level')}</span><strong>{userData.level || 1}</strong><small>{t('home.nextStep')}</small></div>
          <div className="stat-card"><span>{t('home.streak')}</span><strong>{userData.streak || 0}</strong><small>{t('home.daysInARow')}</small></div>
          <div className="stat-card"><span>{t('home.coins')}</span><strong>{userData.coins || 0}</strong><small>{t('home.toSpend')}</small></div>
        </div>
      </section>
      <section className="home-quick">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{t('home.quickEyebrow')}</div>
            <h2 className="display-font">{t('home.quickTitle')}</h2>
          </div>
        </div>
        <div className="quick-grid">
          <button onClick={() => onNavigate('learn', { subject: 'romana', grade: userData.class || '5' })} className="quick-card quick-aqua"><i className="fas fa-book" /><span>{t('onboarding.step3.romana')}</span><small>{t('home.learnHint')}</small></button>
          <button onClick={() => onNavigate('learn', { subject: 'matematica', grade: userData.class || '5' })} className="quick-card quick-gold"><i className="fas fa-square-root-alt" /><span>{t('onboarding.step3.matematica')}</span><small>{t('home.learnHint')}</small></button>
          <button onClick={() => onNavigate('calendar')} className="quick-card quick-coral"><i className="fas fa-calendar-check" /><span>{t('home.planRhythm')}</span><small>{t('home.seeCalendar')}</small></button>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
