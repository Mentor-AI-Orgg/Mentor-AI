import { useEffect } from 'react';
import { formatRoDate } from '../userData.js';
import { emitMascot } from '../mascot/mascotEvents.js';
import { useI18n } from '../i18n/index.jsx';
import { avatarIcon, itemEmoji } from '../appearance.js';
import { xpProgress } from '../xpProgress.js';
import { dailySlogan } from '../slogans.js';
import QuoteCard from '../components/QuoteCard.jsx';
import Mascota from '../components/mascot/Mascota.jsx';
import LevelBar from '../components/LevelBar.jsx';

const HomeScreen = ({ userData, onNavigate }) => {
  const { t, locale } = useI18n();
  const dateLabel = locale === 'en'
    ? new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
    : formatRoDate();
  const icon = avatarIcon(userData.avatarId);
  const bar = xpProgress(userData);
  const last = userData.lastStudy;
  const grade = userData.class || '5';
  const missions = userData.missions?.items || [
    { id: 'chapter', label: 'Deschide un capitol', done: false },
    { id: 'flash', label: '5 flashcarduri', done: false },
    { id: 'test', label: 'Un test de capitol', done: false }
  ];
  const streakDays = userData.streakDays || [];
  const today = new Date();
  const boxes = Array.from({ length: 7 }, (_, index) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - index));
    const key = d.toISOString().slice(0, 10);
    return { key, on: streakDays.includes(key) };
  });

  useEffect(() => {
    const day = new Date().toISOString().slice(0, 10);
    if (sessionStorage.getItem('s10-hello-day') === day) return undefined;
    sessionStorage.setItem('s10-hello-day', day);
    const nume = userData.name || userData.username || '';
    if (new Date().getHours() >= 22) emitMascot('seara_tarziu');
    else emitMascot('prima_intrare_azi', { nume });
    return undefined;
  }, [userData.name, userData.username]);

  const continueExtras = last?.chapterId
    ? { subject: last.subject, grade: last.grade || grade, chapter: last.chapterId, track: last.track || null }
    : { subject: 'matematica', grade };

  return (
    <main className="home-page animate-fadeIn">
      <header className="home-header">
        <div>
          <div className="eyebrow">{dateLabel}</div>
          <h1 className="display-font home-title">{t('home.hello', { name: userData.name || t('home.studentFallback') })}</h1>
          <p className="home-role-tag">{userData.titleName ? `${userData.titleName} · ` : ''}{t('home.roleStudent')} · {t('home.gradeOnly', { grade })}</p>
          <p className="home-slogan">{dailySlogan()}</p>
          <Mascota mood="salut" size="lg" message={t('home.hello', { name: userData.name || t('home.studentFallback') })} />
          <QuoteCard />
          {userData.nudge?.body && (
            <p className="nudge-banner home-nudge" role="status">
              <i className="fas fa-bell" /> {userData.nudge.body}
            </p>
          )}
        </div>
        <button onClick={() => onNavigate('profile')} className="home-avatar" aria-label={t('home.openProfile')}>
          {itemEmoji(userData.avatarId) || (icon ? <i className={`fas ${icon}`} /> : (userData.name || 'E').charAt(0).toUpperCase())}
        </button>
      </header>
      <section className="focus-card">
        <div>
          <div className="eyebrow">Azi, concret</div>
          <h2 className="display-font">Un capitol.<br />Un test.</h2>
          <p>{last?.title ? `Continui „${last.title}”, apoi un test scurt pe aceeași idee.` : 'Deschide un capitol de la clasa ta, citește o lecție, apoi dă testul.'}</p>
        </div>
        <div className="focus-actions">
          <button
            type="button"
            onClick={() => onNavigate('learn', continueExtras)}
            className="accent-button focus-action"
          >
            {last?.title ? `Continuă „${last.title}”` : 'Deschide lecțiile'} <i className="fas fa-play" />
          </button>
          <button type="button" onClick={() => onNavigate('learn', { subject: last?.subject || 'matematica', grade, chapter: last?.chapterId })} className="ghost-button focus-action">
            Testul de azi <i className="fas fa-clipboard-check" />
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
        <div className="streak-week" aria-label="Zile la rând, ultimele 7">
          {boxes.map(box => (
            <span key={box.key} className={`streak-box ${box.on ? 'on' : ''}`} title={box.key} />
          ))}
          <small>{userData.streak || 0} zile la rând</small>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><span>{t('home.level')}</span><strong>{userData.level || 1}</strong><small>{t('home.nextXpShort', { count: bar.toNext })}</small></div>
          <div className="stat-card"><span>{t('home.streak')}</span><strong>{userData.streak || 0}</strong><small>{t('home.daysInARow')}</small></div>
          <div className="stat-card"><span>{t('home.coins')}</span><strong>{userData.coins || 0}</strong><small>{t('home.toSpend')}</small></div>
        </div>
      </section>
      <section className="home-quick">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Misiuni de azi</div>
            <h2 className="display-font">Trei lucruri mici.</h2>
          </div>
        </div>
        <ul className="mission-list">
          {missions.map(item => (
            <li key={item.id} className={item.done ? 'done' : ''}>
              <i className={`fas ${item.done ? 'fa-check-circle' : 'fa-circle'}`} /> {item.label}
            </li>
          ))}
        </ul>
        <div className="quick-grid">
          <button type="button" onClick={() => onNavigate('learn', { subject: 'romana', grade, track: null })} className="quick-card quick-aqua"><i className="fas fa-book" /><span>Română</span><small>Capitol + lecție</small></button>
          <button type="button" onClick={() => onNavigate('learn', { subject: 'matematica', grade, track: null })} className="quick-card quick-gold"><i className="fas fa-square-root-alt" /><span>Matematică</span><small>Capitol + test</small></button>
          <button type="button" onClick={() => onNavigate('learn', { track: 'en', grade: 8, subject: 'matematica' })} className="quick-card quick-coral"><i className="fas fa-clipboard-check" /><span>Evaluare Națională</span><small>Ca la examen + antrenament</small></button>
          <button type="button" onClick={() => onNavigate('calendar')} className="quick-card quick-aqua"><i className="fas fa-calendar-check" /><span>Calendar</span><small>Ritmul tău</small></button>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
