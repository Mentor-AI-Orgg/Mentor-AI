import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { formatRoDate } from '../userData.js';
import { emitMascot } from '../mascot/mascotEvents.js';
import { dailyGoalFrom, weeklyGoalFrom } from '../weeklyGoal.js';
import { useI18n } from '../i18n/index.jsx';
import { avatarIcon, itemEmoji } from '../appearance.js';
import { xpProgress } from '../xpProgress.js';
import Mascota from '../components/mascot/Mascota.jsx';
import MascotPresence from '../components/mascot/MascotPresence.jsx';
import LevelBar from '../components/LevelBar.jsx';

const HomeScreen = ({ userData, onNavigate }) => {
  const { t, locale } = useI18n();
  const [offer, setOffer] = useState(false);
  const [dueMistakes, setDueMistakes] = useState(0);
  const dateLabel = locale === 'en'
    ? new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
    : formatRoDate();
  const icon = avatarIcon(userData.avatarId);
  const bar = xpProgress(userData);
  const last = userData.lastStudy;
  const grade = userData.class || '5';
  const streakDays = userData.streakDays || [];
  const weekGoal = weeklyGoalFrom(streakDays);
  const dayGoal = dailyGoalFrom(streakDays);
  const name = userData.name || t('home.studentFallback');

  useEffect(() => {
    if (!userData?.isLoggedIn) return undefined;
    MentorAPI.mistakes().then(pack => {
      if (pack.success) setDueMistakes(pack.data.count || 0);
    });
    MentorAPI.placement().then(pack => {
      const row = pack.data?.placement;
      if (!pack.success || row?.finished) return;
      const skipped = Date.parse(row?.skippedAt || '');
      const week = 7 * 24 * 60 * 60 * 1000;
      if (!row?.skippedAt || (Number.isFinite(skipped) && Date.now() - skipped > week)) setOffer(true);
    });
    return undefined;
  }, [userData?.isLoggedIn]);

  useEffect(() => {
    const day = new Date().toISOString().slice(0, 10);
    if (sessionStorage.getItem('s10-hello-day') === day) return undefined;
    sessionStorage.setItem('s10-hello-day', day);
    const nume = userData.name || userData.username || '';
    const streak = Number(userData.streak || 0);
    const milestones = [3, 7, 14, 21, 30];
    if (new Date().getHours() >= 22) emitMascot('seara_tarziu');
    else if (milestones.includes(streak)) emitMascot('serie_zile', { n: streak });
    else emitMascot('prima_intrare_azi', { nume });
    return undefined;
  }, [userData.name, userData.username, userData.streak]);

  useEffect(() => {
    if (!dayGoal.done) return undefined;
    const key = `s10-day-goal-${dayGoal.day}`;
    try {
      if (localStorage.getItem(key) === '1') return undefined;
      localStorage.setItem(key, '1');
    } catch {
      return undefined;
    }
    emitMascot('obiectiv_zilnic');
    return undefined;
  }, [dayGoal.done, dayGoal.day]);

  useEffect(() => {
    if (!weekGoal.reached) return undefined;
    const key = `s10-week-goal-${weekGoal.week}`;
    try {
      if (localStorage.getItem(key) === '1') return undefined;
      localStorage.setItem(key, '1');
    } catch {
      return undefined;
    }
    emitMascot('obiectiv_saptamanal');
    return undefined;
  }, [weekGoal.reached, weekGoal.week]);

  const continueExtras = last?.chapterId
    ? { subject: last.subject, grade: last.grade || grade, chapter: last.chapterId, track: last.track || null }
    : { subject: 'matematica', grade };

  const dayBody = dayGoal.done
    ? t('home.dayDoneBody')
    : (last?.title ? t('home.dayContinueBody', { title: last.title }) : t('home.dayStartBody'));
  const dayAction = dayGoal.done
    ? t('home.moreLesson')
    : (last?.title ? t('home.continueLesson', { title: last.title }) : t('home.openLesson'));
  const reviewWord = dueMistakes === 1 ? t('home.reviewWordOne') : t('home.reviewWordMany');

  return (
    <main className="home-page animate-fadeIn">
      <header className="home-header">
        <div className="home-intro">
          <MascotPresence message="" />
          <div className="home-intro-copy">
            <div className="eyebrow">{dateLabel}</div>
            <h1 className="display-font home-title">{t('home.hello', { name })}</h1>
            <p className="home-role-tag">{userData.titleName ? `${userData.titleName} · ` : ''}{t('home.roleStudent')} · {t('home.gradeOnly', { grade })}</p>
            {userData.timeBlocked && <Mascota mood="somnoros" size="md" message={t('home.timeBlocked')} />}
            {dueMistakes > 0 && (
              <p className="nudge-banner">
                {t('home.reviewDue', { count: dueMistakes, word: reviewWord })}{' '}
                <button type="button" className="ghost-button" onClick={() => onNavigate('caiet')}>{t('home.reviewAction')}</button>
              </p>
            )}
            {userData.nudge?.body && (
              <p className="nudge-banner home-nudge" role="status">
                <i className="fas fa-bell" /> {userData.nudge.body}
              </p>
            )}
          </div>
        </div>
        <button onClick={() => onNavigate('profile')} className="home-avatar" aria-label={t('home.openProfile')}>
          {itemEmoji(userData.avatarId) || (icon ? <i className={`fas ${icon}`} /> : (userData.name || 'E').charAt(0).toUpperCase())}
        </button>
      </header>

      {offer && (
        <section className="focus-card placement-offer">
          <p>{t('home.placementLead')}</p>
          <div className="placement-choices">
            <button type="button" className="accent-button" onClick={() => onNavigate('placement')}>{t('home.placementYes')}</button>
            <button type="button" className="ghost-button" onClick={async () => {
              await MentorAPI.placementSkip();
              setOffer(false);
            }}>{t('home.placementLater')}</button>
          </div>
        </section>
      )}

      <section className="focus-card">
        <div>
          <div className="eyebrow">{t('home.dayEyebrow')}</div>
          <h2 className="display-font">{dayGoal.done ? t('home.dayDoneTitle') : t('home.dayOpenTitle')}</h2>
          <p>{dayBody}</p>
        </div>
        <div className="focus-actions">
          <button
            type="button"
            onClick={() => onNavigate('learn', continueExtras)}
            className="accent-button"
          >
            {dayAction} <i className="fas fa-play" />
          </button>
          <button type="button" onClick={() => onNavigate('learn', { subject: last?.subject || 'matematica', grade, chapter: last?.chapterId })} className="ghost-button">
            {t('home.todayTest')} <i className="fas fa-clipboard-check" />
          </button>
        </div>
      </section>

      <section className="progress-section">
        <div className="stats-grid">
          <div className="stat-card">
            <span>{t('home.level')}</span>
            <strong>{userData.level || 1}</strong>
            <small>{t('home.nextXpShort', { count: bar.toNext })}</small>
          </div>
          <div className="stat-card">
            <span>{t('home.streak')}</span>
            <strong>{userData.streak || 0}</strong>
            <small>{t('home.weekCount', { done: weekGoal.done, target: weekGoal.target })}</small>
            <div className="streak-week" aria-label={t('home.weekAria')}>
              {weekGoal.days.map(day => (
                <span key={day.key} className={`streak-box ${day.on ? 'on' : ''}`} title={day.key} />
              ))}
            </div>
          </div>
          <div className="stat-card">
            <span>{t('home.coins')}</span>
            <strong>{userData.coins || 0}</strong>
            <small>{t('home.toSpend')}</small>
          </div>
        </div>
        <LevelBar userData={userData} />
      </section>

      <section className="home-quick">
        <div className="quick-grid">
          <button type="button" onClick={() => onNavigate('learn', { subject: 'romana', grade, track: null })} className="quick-card quick-aqua"><i className="fas fa-book" /><span>{t('home.subjectRo')}</span><small>{t('home.subjectRoHint')}</small></button>
          <button type="button" onClick={() => onNavigate('learn', { subject: 'matematica', grade, track: null })} className="quick-card quick-gold"><i className="fas fa-square-root-alt" /><span>{t('home.subjectMath')}</span><small>{t('home.subjectMathHint')}</small></button>
          <button type="button" onClick={() => onNavigate('learn', { track: 'en', grade: 8, subject: 'matematica' })} className="quick-card quick-coral"><i className="fas fa-clipboard-check" /><span>{t('home.subjectEn')}</span><small>{t('home.subjectEnHint')}</small></button>
          <button type="button" onClick={() => onNavigate('calendar')} className="quick-card quick-aqua"><i className="fas fa-calendar-check" /><span>{t('nav.calendar')}</span><small>{t('home.calendarHint')}</small></button>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
