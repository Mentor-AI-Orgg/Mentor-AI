import { formatRoDate } from '../userData.js';
import { useI18n } from '../i18n/index.jsx';
import { avatarIcon, itemEmoji } from '../appearance.js';
import { xpProgress } from '../xpProgress.js';
import { dailySlogan } from '../slogans.js';
import LevelBar from '../components/LevelBar.jsx';

const HomeScreen = ({ userData, onNavigate }) => {
  const { t, locale } = useI18n();
  const dateLabel = locale === 'en'
    ? new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
    : formatRoDate();
  const icon = avatarIcon(userData.avatarId);
  const bar = xpProgress(userData);
  const last = userData.lastStudy;
  const todayHint = last?.title
    ? t('home.todayContinue')
    : (userData.chaptersDone ? t('home.todayContinue') : t('home.todayStart'));
  const grade = userData.class || '5';

  return (
    <main className="home-page animate-fadeIn">
      <header className="home-header">
        <div>
          <div className="eyebrow">{dateLabel}</div>
          <h1 className="display-font home-title">{t('home.hello', { name: userData.name || t('home.studentFallback') })}</h1>
          <p className="home-role-tag">{userData.titleName ? `${userData.titleName} · ` : ''}{t('home.roleStudent')} · {t('home.gradeOnly', { grade })}</p>
          <p className="home-slogan">{dailySlogan()}</p>
        </div>
        <button onClick={() => onNavigate('profile')} className="home-avatar" aria-label={t('home.openProfile')}>
          {itemEmoji(userData.avatarId) || (icon ? <i className={`fas ${icon}`} /> : (userData.name || 'E').charAt(0).toUpperCase())}
        </button>
      </header>
      <section className="focus-card">
        <div>
          <div className="eyebrow">{t('home.focusEyebrow')}</div>
          <h2 className="display-font">{t('home.focusTitle')}<br />{t('home.focusTitle2')}</h2>
          <p>{todayHint}</p>
        </div>
        <div className="focus-actions">
          {last?.chapterId ? (
            <button
              type="button"
              onClick={() => onNavigate('learn', { subject: last.subject, grade: last.grade || grade, chapter: last.chapterId })}
              className="accent-button focus-action"
            >
              {t('home.continueChapter', { title: last.title || last.chapterId })} <i className="fas fa-play" />
            </button>
          ) : null}
          <button type="button" onClick={() => onNavigate('learn')} className="accent-button focus-action">
            {t('home.openLessons')} <i className="fas fa-arrow-up-right-from-square" />
          </button>
        </div>
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
        <LevelBar userData={userData} />
        <div className="stats-grid">
          <div className="stat-card"><span>{t('home.level')}</span><strong>{userData.level || 1}</strong><small>{t('home.nextXpShort', { count: bar.toNext })}</small></div>
          <div className="stat-card"><span>{t('home.streak')}</span><strong>{userData.streak || 0}</strong><small>{t('home.daysInARow')}</small></div>
          <div className="stat-card"><span>{t('home.coins')}</span><strong>{userData.coins || 0}</strong><small>{t('home.toSpend')}</small></div>
        </div>
      </section>
      <section className="home-quick">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{t('home.missionsEyebrow')}</div>
            <h2 className="display-font">{t('home.missionsTitle')}</h2>
          </div>
        </div>
        <div className="quick-grid">
          <button type="button" onClick={() => onNavigate('learn', { subject: 'romana', grade })} className="quick-card quick-aqua"><i className="fas fa-clone" /><span>{t('home.missionFlash')}</span><small>{t('home.learnHint')}</small></button>
          <button type="button" onClick={() => onNavigate('learn', { subject: 'matematica', grade })} className="quick-card quick-gold"><i className="fas fa-clipboard-check" /><span>{t('home.missionTest')}</span><small>{t('home.learnHint')}</small></button>
          <button type="button" onClick={() => onNavigate('learn')} className="quick-card quick-coral"><i className="fas fa-clock" /><span>{t('home.missionFocus')}</span><small>{t('home.learnHint')}</small></button>
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
          <button type="button" onClick={() => onNavigate('learn', { subject: 'romana', grade, track: null })} className="quick-card quick-aqua"><i className="fas fa-book" /><span>{t('onboarding.step3.romana')}</span><small>{t('home.learnHint')}</small></button>
          <button type="button" onClick={() => onNavigate('learn', { subject: 'matematica', grade, track: null })} className="quick-card quick-gold"><i className="fas fa-square-root-alt" /><span>{t('onboarding.step3.matematica')}</span><small>{t('home.learnHint')}</small></button>
          <button type="button" onClick={() => onNavigate('learn', { track: 'en', grade: 8, subject: 'matematica' })} className="quick-card quick-coral"><i className="fas fa-clipboard-check" /><span>{t('home.enTitle')}</span><small>{t('home.enHint')}</small></button>
          <button type="button" onClick={() => onNavigate('calendar')} className="quick-card quick-aqua"><i className="fas fa-calendar-check" /><span>{t('home.planRhythm')}</span><small>{t('home.seeCalendar')}</small></button>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
