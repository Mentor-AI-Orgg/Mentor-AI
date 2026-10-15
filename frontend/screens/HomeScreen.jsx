import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { formatRoDate } from '../userData.js';
import { emitMascot } from '../mascot/mascotEvents.js';
import { dailyGoalFrom, weeklyGoalFrom } from '../weeklyGoal.js';
import { useI18n } from '../i18n/index.jsx';
import { avatarIcon, itemEmoji } from '../appearance.js';
import { xpProgress } from '../xpProgress.js';
import { lessonsLabel } from '../levelLessons.js';
import { dailySlogan } from '../slogans.js';
import QuoteCard from '../components/QuoteCard.jsx';
import Mascota from '../components/mascot/Mascota.jsx';
import { TEST_OPEN_ERROR } from '../testOpen.js';
import { curriculumParams, firstLessonExtras, homeLessonCta } from '../firstLesson.js';
import MascotPresence from '../components/mascot/MascotPresence.jsx';
import LevelBar from '../components/LevelBar.jsx';

const HomeScreen = ({ userData, onNavigate, onProgress }) => {
  const { t, locale } = useI18n();
  const [offer, setOffer] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [placementBusy, setPlacementBusy] = useState(false);
  const [placementError, setPlacementError] = useState('');
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [dueMistakes, setDueMistakes] = useState(0);
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
  const weekGoal = weeklyGoalFrom(streakDays);
  const dayGoal = dailyGoalFrom(streakDays);
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
    const streak = Number(userData.completionStreak || 0);
    const milestones = [3, 7, 14, 21, 30];
    if (new Date().getHours() >= 22) emitMascot('seara_tarziu');
    else if (milestones.includes(streak)) emitMascot('serie_zile', { n: streak });
    else emitMascot('prima_intrare_azi', { nume });
    return undefined;
  }, [userData.name, userData.username, userData.completionStreak]);

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
  const lessonCta = homeLessonCta(last);
  const serie = Number(userData.completionStreak) || 0;
  const freezes = Number.isFinite(userData.streakFreezes) ? userData.streakFreezes : 1;
  const serieShort = serie === 1 ? '1 zi' : `${serie} zile`;
  const freezeLabel = freezes > 0
    ? '1 înghețare disponibilă săptămâna aceasta'
    : 'Înghețarea săptămânii este folosită';
  const [openingLesson, setOpeningLesson] = useState(false);

  const dismissPraise = async () => {
    await MentorAPI.seePraise();
    if (onProgress) await onProgress();
  };

  const openLessonCta = async () => {
    if (lessonCta.mode === 'continue') {
      onNavigate('learn', continueExtras);
      return;
    }
    if (openingLesson) return;
    setOpeningLesson(true);
    const pack = await MentorAPI.getCurriculum(curriculumParams(userData));
    setOpeningLesson(false);
    onNavigate('learn', firstLessonExtras(userData, pack.success ? pack.data : null));
  };

  return (
    <main className="home-page animate-fadeIn">
      {userData.praiseNotice?.text && (
        <section className="praise-banner" role="status" aria-label="Laudă de la părinte">
          <p>{userData.praiseNotice.text}</p>
          <button type="button" className="ghost-button" onClick={dismissPraise}>Am văzut</button>
        </section>
      )}
      <p className="streak-compact" aria-label="Seria de zile">
        <span className="streak-compact-count">🔥 {serieShort}</span>
        <span className="streak-compact-freeze">
          🧊 {freezes > 0 ? '1' : '0'}
          <span className="visually-hidden">{freezeLabel}</span>
        </span>
      </p>
      {userData.streakFrozeYesterday && <p className="streak-freeze">Înghețarea a acoperit ieri.</p>}
      <p className="level-nudge" aria-label={lessonsLabel(bar.toNext, bar.nextLevel)}>
        <span>{lessonsLabel(bar.toNext, bar.nextLevel)}</span>
        <span className="progress-track progress-track-xp" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={bar.pct}>
          <span style={{ width: `${bar.pct}%` }} />
        </span>
      </p>
      <button type="button" className="challenge-card" onClick={() => onNavigate('provocare')}>
        <span className="eyebrow">O dată pe zi</span>
        <span className="challenge-card-title">Provocarea zilei</span>
      </button>
      <button type="button" className="accent-button home-start-cta" disabled={openingLesson} onClick={openLessonCta}>
        {openingLesson ? 'Se deschide…' : lessonCta.label}
      </button>
      <header className="home-header">
        <div className="home-intro">
          <MascotPresence mood="waving" message={t('home.hello', { name: userData.name || t('home.studentFallback') })} />
          <div className="home-intro-copy">
          <div className="eyebrow">{dateLabel}</div>
          <h1 className="display-font home-title">{t('home.hello', { name: userData.name || t('home.studentFallback') })}</h1>
          <p className="home-role-tag">{userData.titleName ? `${userData.titleName} · ` : ''}{t('home.roleStudent')} · {t('home.gradeOnly', { grade })}</p>
          {userData.timeBlocked && <Mascota mood="somnoros" size="md" message="Ai lucrat mult azi, ne vedem mâine!" />}
          {dueMistakes > 0 && (
            <p className="nudge-banner">
              Ai {dueMistakes} {dueMistakes === 1 ? 'exercițiu' : 'exerciții'} de recapitulat azi.{' '}
              <button type="button" className="ghost-button" onClick={() => onNavigate('caiet')}>Recapitulează</button>
            </p>
          )}
          <p className="home-slogan">{dailySlogan()}</p>
          <QuoteCard />
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
      {offer && !quiz && !result && (
        <section className="focus-card placement-offer">
          <Mascota mood="waving" size="md" />
          <p>Vrei să vedem de unde pornești? Sunt 10 întrebări scurte, cam 5 minute.</p>
          <div className="placement-choices">
            <button type="button" className="ghost-button" disabled={placementBusy} onClick={async () => {
              if (placementBusy) return;
              setPlacementBusy(true);
              setPlacementError('');
              const pack = await MentorAPI.placementQuestions('ambele');
              setPlacementBusy(false);
              if (pack.success && Array.isArray(pack.data?.questions) && pack.data.questions.length) {
                setQuiz(pack.data.questions);
                return;
              }
              setPlacementError(pack.error || TEST_OPEN_ERROR);
            }}>{placementBusy ? 'Se deschide…' : 'Da, hai!'}</button>
            <button type="button" className="ghost-button" disabled={placementBusy} onClick={async () => {
              if (placementBusy) return;
              setPlacementBusy(true);
              setPlacementError('');
              const pack = await MentorAPI.placementSkip();
              setPlacementBusy(false);
              if (!pack.success) {
                setPlacementError(pack.error || 'Nu am putut amâna testul. Încearcă din nou.');
                return;
              }
              setOffer(false);
            }}>Nu acum</button>
            {placementError && <p className="guide-error" role="alert">{placementError}</p>}
          </div>
        </section>
      )}
      {quiz && !result && (
        <section className="placement-quiz" aria-labelledby="placement-quiz-help">
          <p id="placement-quiz-help" className="placement-quiz-help">Pas cu pas, fără grabă. Poți lăsa goale întrebările pe care nu le știi.</p>
          {quiz.map(item => (
            <label key={item.id} className="placement-question">
              <span className="placement-prompt">{item.prompt}</span>
              <input className="field form-input" value={answers[item.id] || ''} aria-label={item.prompt} onChange={event => setAnswers(prev => ({ ...prev, [item.id]: event.target.value }))} />
            </label>
          ))}
          {placementError && <p className="guide-error" role="alert">{placementError}</p>}
          <button type="button" className="accent-button" disabled={placementBusy} onClick={async () => {
            if (placementBusy) return;
            setPlacementBusy(true);
            setPlacementError('');
            const pack = await MentorAPI.placementFinish({
              subject: 'ambele',
              answers: quiz.map(item => ({ id: item.id, given: answers[item.id] || '' }))
            });
            setPlacementBusy(false);
            if (pack.success) {
              setResult(pack.data);
              setOffer(false);
              return;
            }
            setPlacementError(pack.error || 'Nu am putut închide testul. Încearcă din nou.');
          }}>{placementBusy ? 'Se trimite…' : 'Gata'}</button>
        </section>
      )}
      {result && (
        <section className="focus-card">
          <p>Îți recomand să începi cu {result.startWith?.join(', ') || 'lecția care îți place'}.</p>
          {result.good?.length > 0 && <p>Merge deja bine la: {result.good.join(', ')}.</p>}
          <p>Insignă: {result.badge}.</p>
        </section>
      )}
      <section className="focus-card">
        <div>
          <div className="eyebrow">Obiectivul zilei</div>
          <h2 className="display-font">{dayGoal.done ? 'Gata pentru azi.' : 'O lecție.'}</h2>
          <p>{dayGoal.done ? 'Mâine te aștept din nou. Dacă mai ai chef, misiunile de jos sunt în plus.' : (last?.title ? `Continui „${last.title}”. Atât e destul pentru azi.` : 'Deschide o lecție de la clasa ta. Atât e destul pentru azi.')}</p>
        </div>
        <div className="focus-actions">
          <button
            type="button"
            onClick={() => onNavigate('learn', continueExtras)}
            className="accent-button focus-action"
          >
            {dayGoal.done ? 'Mai vreau o lecție' : (last?.title ? `Continuă „${last.title}”` : 'Deschide o lecție')} <i className="fas fa-play" />
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
        <div className={`day-goal ${dayGoal.done ? 'is-done' : ''}`}>
          <div className="eyebrow">Azi</div>
          <p>{dayGoal.done ? 'Ziua e făcută.' : 'Încă nu e făcută.'}</p>
        </div>
        <div className="week-goal">
          <div className="eyebrow">Obiectivul săptămânii</div>
          <p>{weekGoal.done} din {weekGoal.target} zile. Puțin, dar des.</p>
          <div className="streak-week" aria-label="Zilele din săptămâna aceasta">
            {weekGoal.days.map(day => (
              <span key={day.key} className={`streak-box ${day.on ? 'on' : ''}`} title={day.key} />
            ))}
          </div>
          <button type="button" className="ghost-button" onClick={() => onNavigate('ajutor')}>Ajutor</button>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><span>{t('home.level')}</span><strong>{userData.level || 1}</strong><small>{t('home.nextXpShort', { count: bar.toNext })}</small></div>
          <div className="stat-card"><span>{t('home.coins')}</span><strong>{userData.coins || 0}</strong><small>{t('home.toSpend')}</small></div>
        </div>
      </section>
      <section className="home-quick">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Dacă mai ai chef</div>
            <h2 className="display-font">Trei lucruri în plus.</h2>
            <p>Nu sunt obligatorii. Ziua e gata când ai deschis o lecție.</p>
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
          <button type="button" onClick={() => onNavigate('learn', { subject: 'romana', grade, track: null })} className="quick-card quick-aqua"><i className="fas fa-book" /><span>Limba română</span><small>Capitol + lecție</small></button>
          <button type="button" onClick={() => onNavigate('learn', { subject: 'matematica', grade, track: null })} className="quick-card quick-gold"><i className="fas fa-square-root-alt" /><span>Matematică</span><small>Capitol + test</small></button>
          <button type="button" onClick={() => onNavigate('learn', { track: 'en', grade: 8, subject: 'matematica' })} className="quick-card quick-coral"><i className="fas fa-clipboard-check" /><span>Evaluare Națională</span><small>Ca la examen + antrenament</small></button>
          <button type="button" onClick={() => onNavigate('calendar')} className="quick-card quick-aqua"><i className="fas fa-calendar-check" /><span>Calendar</span><small>Ritmul tău</small></button>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
