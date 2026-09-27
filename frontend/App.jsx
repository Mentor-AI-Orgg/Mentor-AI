import { Component, lazy, Suspense, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { MentorAPI } from './apiClient.js';
import { STORAGE_KEY, defaultUserData } from './userData.js';
import { applyProgress, applyTheme } from './appearance.js';
import { I18nProvider, useI18n } from './i18n/index.jsx';
import { hashForRoute, parseAppHash } from './appRoutes.js';
import AdaptiveContainer from './components/AdaptiveContainer.jsx';
import FloatingLines from './components/FloatingLines.jsx';
import BottomNav from './components/BottomNav.jsx';
import Toast from './components/Toast.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import ResetPasswordScreen from './components/ResetPasswordScreen.jsx';
import RegisterScreen from './components/RegisterScreen.jsx';
import OnboardingScreen from './components/OnboardingScreen.jsx';
import { ProfessorScreen } from './components/StudyScreens.jsx';
import HomeScreen from './screens/HomeScreen.jsx';

const LearnScreen = lazy(() => import('./screens/LearnScreen.jsx'));
const ShopScreen = lazy(() => import('./components/ShopScreen.jsx'));
const SubscriptionsScreen = lazy(() => import('./screens/SubscriptionsScreen.jsx'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen.jsx'));
const CalendarScreen = lazy(() => import('./screens/CalendarScreen.jsx'));

class BackgroundSafe extends Component {
  constructor(props) {
    super(props);
    this.state = { ok: true };
  }

  static getDerivedStateFromError() {
    return { ok: false };
  }

  componentDidCatch() {}

  render() {
    return this.state.ok ? this.props.children : null;
  }
}

function applyAccount(user, prev = {}) {
  if (!user) return prev;
  return {
    ...prev,
    isLoggedIn: true,
    email: user.email || prev.email || '',
    role: 'student',
    name: user.name || prev.name || '',
    username: user.username || prev.username || '',
    school: user.school || prev.school || '',
    class: user.class || prev.class || '5',
    subject: user.subject || user.profile || prev.subject || 'matematica',
    profile: typeof user.profile === 'string' ? user.profile : (user.subject || prev.profile || 'matematica'),
    exam: user.exam || prev.exam || '',
    dailyHours: user.dailyHours || prev.dailyHours || '',
    parentEmail: user.parentEmail || prev.parentEmail || '',
    uiLanguage: user.uiLanguage || prev.uiLanguage || prev.language || 'ro',
    language: user.language || prev.language || 'ro',
    hasCompletedOnboarding: Boolean(user.hasCompletedOnboarding),
    avatarId: user.avatarId !== undefined ? user.avatarId : prev.avatarId,
    themeId: user.themeId !== undefined ? user.themeId : prev.themeId,
    titleId: user.titleId !== undefined ? user.titleId : prev.titleId,
    titleName: user.titleName !== undefined ? user.titleName : prev.titleName
  };
}

function AppShell({ userData, setUserData }) {
  const { t } = useI18n();
  const [screen, setScreen] = useState('splash');
  const [navScreen, setNavScreen] = useState('home');
  const [toast, setToast] = useState(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({});
  const [studyFocus, setStudyFocus] = useState({ subject: null, grade: null, chapter: null, track: null });
  const historySilent = useRef(false);
  const loggedInRef = useRef(Boolean(userData.isLoggedIn));
  loggedInRef.current = Boolean(userData.isLoggedIn);

  const writeHash = useCallback((target, extras = {}, mode = 'push') => {
    const hash = hashForRoute(target, extras);
    if (!hash || window.location.hash === hash) return;
    if (mode === 'replace') window.history.replaceState({ screen: target }, '', hash);
    else window.history.pushState({ screen: target }, '', hash);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    applyTheme(userData.themeId);
  }, [userData.themeId]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleEconomyUpdate = useCallback((balance, equipped = {}, role = null, extra = {}) => {
    let leveledTo = null;
    setUserData(prev => {
      const next = {
        ...prev,
        coins: typeof balance === 'number' ? balance : prev.coins,
        avatarId: equipped.avatar !== undefined ? (equipped.avatar || '') : prev.avatarId,
        themeId: equipped.background !== undefined ? (equipped.background || '') : prev.themeId,
        titleId: equipped.title !== undefined ? (equipped.title || extra.titleId || '') : (extra.titleId ?? prev.titleId),
        titleName: extra.titleName !== undefined ? extra.titleName : prev.titleName,
        role: role || prev.role,
        ...extra
      };
      if (next.level > (prev.level || 1)) leveledTo = next.level;
      applyTheme(next.themeId);
      return next;
    });
    if (leveledTo) showToast(`Ai urcat la nivelul ${leveledTo}!`, 'success');
  }, [showToast]);

  const syncEconomy = useCallback(async (patch = {}) => {
    const result = await MentorAPI.getEconomySummary({
      class_name: patch.class || userData.class || '',
      profile_name: patch.name || userData.name || ''
    });
    const summary = result.success ? result.data?.summary : null;
    if (!summary) return null;
    let leveledTo = null;
    setUserData(prev => {
      const next = applyProgress(summary, prev);
      if (next.level > (prev.level || 1)) leveledTo = next.level;
      applyTheme(next.themeId);
      return next;
    });
    if (leveledTo) showToast(`Ai urcat la nivelul ${leveledTo}!`, 'success');
    return summary;
  }, [userData.class, userData.name, showToast]);

  const handleAppearanceChange = useCallback((equipped = {}, inventory = [], extra = {}) => {
    setUserData(prev => {
      const next = {
        ...prev,
        avatarId: equipped.avatar !== undefined ? (equipped.avatar || '') : prev.avatarId,
        themeId: equipped.background !== undefined ? (equipped.background || '') : prev.themeId,
        titleId: equipped.title !== undefined ? (equipped.title || '') : prev.titleId,
        titleName: extra.titleName !== undefined ? extra.titleName : prev.titleName,
        inventory
      };
      applyTheme(next.themeId);
      return next;
    });
  }, []);

  const handleSplashFinish = async () => {
    const session = await MentorAPI.me();
    if (!session.success) {
      setUserData(prev => ({ ...prev, isLoggedIn: false }));
      const route = parseAppHash(window.location.hash);
      if (route.screen === 'reset') {
        setScreen('reset');
        return;
      }
      setScreen('welcome');
      writeHash('welcome', {}, 'replace');
      return;
    }

    let merged = null;
    setUserData(prev => {
      merged = applyAccount(session.user, prev);
      return merged;
    });

    const params = new URLSearchParams(window.location.search);
    const checkout = params.get('checkout');
    const calendarConnected = params.get('calendar_connected');
    const calendarError = params.get('calendar_error');
    if (checkout || calendarConnected || calendarError) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    const completed = Boolean(session.user.hasCompletedOnboarding) || Boolean(merged?.hasCompletedOnboarding);
    if (!completed) {
      const readyName = session.user.name || merged?.name || '';
      setOnboardingData(prev => ({ ...prev, name: readyName || prev.name }));
      setOnboardingStep(readyName ? 2 : 1);
      setScreen('onboarding');
      writeHash('onboarding', {}, 'replace');
      return;
    }

    if (calendarError) {
      showToast(t('toast.calendarError'), 'warning');
    }
    if (calendarConnected) {
      setScreen('calendar');
      setNavScreen('calendar');
      showToast(t('toast.calendarConnected'), 'success');
      return;
    }
    if (checkout === 'success') {
      const sub = await MentorAPI.getMySubscription();
      if (sub.success && sub.data?.subscription) {
        setUserData(prev => ({
          ...prev,
          planId: sub.data.subscription.planId || prev.planId,
          planStatus: sub.data.subscription.status || 'active'
        }));
      }
      setScreen('subscriptions');
      setNavScreen('subscriptions');
      showToast(t('toast.checkoutSuccess'), 'success');
      return;
    }
    if (checkout === 'cancel') {
      setScreen('subscriptions');
      setNavScreen('subscriptions');
      showToast(t('toast.checkoutCancel'), 'warning');
      return;
    }

    await syncEconomy();
    const route = parseAppHash(window.location.hash);
    if (route.kind === 'app') {
      if (route.extras) {
        setStudyFocus(prev => ({
          subject: route.extras.subject !== undefined ? route.extras.subject : prev.subject,
          grade: route.extras.grade || prev.grade,
          chapter: route.extras.chapter || null,
          track: route.extras.track !== undefined ? route.extras.track : prev.track
        }));
      }
      setNavScreen(route.navScreen || route.screen);
      setScreen(route.screen);
      return;
    }
    setScreen('home');
    setNavScreen('home');
    writeHash('home', {}, 'replace');
  };

  const handleLogin = async credentials => {
    const result = await MentorAPI.login(credentials);
    if (!result.success) {
      return { success: false, error: result.error };
    }

    const user = result.data.user || {};
    setUserData(prev => applyAccount(user, prev));

    if (!user.hasCompletedOnboarding) {
      setOnboardingData(prev => ({ ...prev, name: user.name || prev.name }));
      setOnboardingStep(user.name ? 2 : 1);
      setScreen('onboarding');
      writeHash('onboarding', {}, 'replace');
      MentorAPI.claimReward({ type: 'login_bonus' }).then(() => syncEconomy());
      showToast(t('toast.welcome'), 'success');
      return { success: true };
    }

    setScreen('home');
    setNavScreen('home');
    writeHash('home', {}, 'replace');

    await MentorAPI.claimReward({ type: 'login_bonus' }).catch(() => null);
    await syncEconomy();
    showToast(t('toast.welcome'), 'success');
    return { success: true };
  };

  const handleLogout = async () => {
    await MentorAPI.logout();
    setUserData(prev => ({ ...prev, isLoggedIn: false, email: '', planId: 'free', coins: 0 }));
    setScreen('welcome');
    setNavScreen('home');
    writeHash('welcome', {}, 'replace');
    showToast(t('toast.loggedOut'), 'success');
  };

  const handleForgotPassword = async email => {
    if (!String(email || '').trim()) {
      showToast(t('toast.forgotNeedEmail'), 'warning');
      return;
    }
    const result = await MentorAPI.forgotPassword({ email: String(email).trim() });
    if (!result.success) {
      showToast(result.error || t('toast.forgotFailed'), 'warning');
      return;
    }
    showToast(result.data?.message || t('toast.forgotPassword'), 'success');
  };

  const handleRegister = async formData => {
    const registration = await MentorAPI.register({
      email: formData.email,
      password: formData.password,
      role: 'student',
      name: formData.name,
      username: formData.username,
      phone: formData.phone,
      school: formData.school,
      class: formData.class || '5',
      parentEmail: formData.parentEmail || '',
      parental_consent: Boolean(formData.parentalConsent),
      privacy_accepted: Boolean(formData.privacyAccepted)
    });

    if (!registration.success) {
      showToast(registration.error || t('toast.registerFailed'), 'warning');
      return { success: false, error: registration.error, field: registration.field };
    }

    const nameParts = (formData.name || '').split(' ');
    setUserData(prev => ({
      ...prev,
      name: nameParts[0] || '',
      surname: nameParts.slice(1).join(' ') || '',
      email: formData.email || '',
      phone: formData.phone || '',
      username: formData.username || '',
      school: formData.school || '',
      class: formData.class || '5',
      role: 'student',
      parentEmail: formData.parentEmail || '',
      isLoggedIn: true
    }));
    setOnboardingData(prev => ({ ...prev, name: formData.name || prev.name, class: formData.class || prev.class }));
    setOnboardingStep(formData.name ? 2 : 1);
    setScreen('onboarding');
    writeHash('onboarding', {}, 'replace');
    return { success: true };
  };

  const onboardingSteps = useMemo(() => [
    {
      step: 1,
      title: t('onboarding.step1.title'),
      desc: t('onboarding.step1.desc'),
      inputKey: 'name',
      options: [],
      progress: 20
    },
    {
      step: 2,
      title: t('onboarding.step2.title'),
      desc: t('onboarding.step2.desc'),
      inputKey: 'class',
      options: [
        { icon: 'fa-seedling', label: t('onboarding.step2.grade5'), value: '5' },
        { icon: 'fa-puzzle-piece', label: t('onboarding.step2.grade6'), value: '6' },
        { icon: 'fa-compass', label: t('onboarding.step2.grade7'), value: '7' },
        { icon: 'fa-flag-checkered', label: t('onboarding.step2.grade8'), value: '8' }
      ],
      progress: 50
    },
    {
      step: 3,
      title: t('onboarding.step4.title'),
      desc: t('onboarding.step4.desc'),
      inputKey: 'exam',
      options: [
        { icon: 'fa-book-open', label: t('onboarding.step4.daily'), value: 'daily' },
        { icon: 'fa-clipboard-check', label: t('onboarding.step4.evaluare'), value: 'evaluare' }
      ],
      progress: 75
    },
    {
      step: 4,
      title: t('onboarding.step5.title'),
      desc: t('onboarding.step5.desc'),
      inputKey: 'dailyHours',
      options: [
        { icon: 'fa-clock', label: t('onboarding.step5.m30'), value: '0.5' },
        { icon: 'fa-clock', label: t('onboarding.step5.h1'), value: '1' },
        { icon: 'fa-clock', label: t('onboarding.step5.h2'), value: '2' }
      ],
      progress: 100
    }
  ], [t]);

  const currentOnboarding = onboardingSteps[onboardingStep - 1];

  const handleOnboardingNext = async () => {
    if (onboardingStep >= onboardingSteps.length) {
      const payload = {
        ...onboardingData,
        hasCompletedOnboarding: true
      };
      await MentorAPI.updateProfile(payload);
      setUserData(prev => ({ ...prev, ...payload }));
      await MentorAPI.claimReward({ type: 'login_bonus' });
      await syncEconomy({ class: payload.class, name: payload.name });
      setScreen('home');
      setNavScreen('home');
      writeHash('home', {}, 'replace');
      showToast(t('toast.onboardingDone'), 'success');
      return;
    }
    setOnboardingStep(prev => prev + 1);
  };

  const handleOnboardingBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(prev => prev - 1);
    } else {
      setScreen('register');
    }
  };

  const handleNavigate = (target, extras = {}) => {
    setStudyFocus(prev => ({
      subject: extras.subject !== undefined ? extras.subject : prev.subject,
      grade: extras.grade || prev.grade,
      chapter: extras.chapter || null,
      track: extras.track !== undefined ? extras.track : prev.track
    }));
    setNavScreen(target === 'calendar' ? 'calendar' : target);
    setScreen(target);
    if (!historySilent.current) writeHash(target, extras, 'push');
    if (target === 'home' || target === 'shop' || target === 'profile') {
      syncEconomy();
    }
  };
  const handleNavigateRef = useRef(handleNavigate);
  handleNavigateRef.current = handleNavigate;

  useEffect(() => {
    const onPop = () => {
      const route = parseAppHash(window.location.hash);
      historySilent.current = true;
      if (loggedInRef.current) {
        if (route.kind === 'app') {
          handleNavigateRef.current(route.screen, route.extras || {});
        } else {
          setScreen('home');
          setNavScreen('home');
        }
      } else if (route.kind === 'guest') {
        setScreen(route.screen);
        setNavScreen('home');
      } else {
        setScreen('welcome');
        setNavScreen('home');
      }
      historySilent.current = false;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleOnboardingSelect = value => {
    setOnboardingData(prev => ({ ...prev, [currentOnboarding.inputKey]: value }));
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} delay={userData.isLoggedIn ? 200 : 2500} />;
      case 'welcome':
        return (
          <WelcomeScreen
            onConnect={() => { setScreen('login'); writeHash('login'); }}
            onRegister={() => { setScreen('register'); writeHash('register'); }}
          />
        );
      case 'reset': {
        const token = parseAppHash(window.location.hash).extras?.token || '';
        return (
          <ResetPasswordScreen
            token={token}
            onDone={() => { setScreen('login'); writeHash('login'); }}
          />
        );
      }
      case 'login':
        return (
          <LoginScreen
            onBack={() => { setScreen('welcome'); writeHash('welcome'); }}
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onBack={() => { setScreen('welcome'); writeHash('welcome'); }}
            onContinue={handleRegister}
            onValidationError={message => showToast(message, 'warning')}
          />
        );
      case 'onboarding':
        return currentOnboarding.step === 1 ? (
          <main className="onboarding-page animate-fadeIn">
            <div className="onboarding-topline"><span>{t('onboarding.setup')}</span><span>01 / 04</span></div>
            <div className="onboarding-progress"><div style={{ width: currentOnboarding.progress + '%' }}></div></div>
            <div className="onboarding-copy">
              <div className="eyebrow">{t('onboarding.stepOf', { step: 1, total: 4 })}</div>
              <h1 className="display-font onboarding-title">{currentOnboarding.title}</h1>
              <p className="form-subtitle">{currentOnboarding.desc}</p>
            </div>
            <input
              type="text"
              value={onboardingData.name || ''}
              onChange={e => setOnboardingData({ ...onboardingData, name: e.target.value })}
              className="field form-input"
              placeholder={t('onboarding.namePlaceholder')}
            />
            <div className="onboarding-actions"><div className="onboarding-action-row"><button
                onClick={() => {
                  if (!onboardingData.name) {
                    showToast(t('onboarding.nameRequired'), 'warning');
                    return;
                  }
                  handleOnboardingNext();
                }}
                className="accent-button onboarding-next">
                {t('common.continue')} <i className="fas fa-arrow-right"></i>
              </button>
            </div></div>
          </main>
        ) : (
          <OnboardingScreen
            step={currentOnboarding.step}
            total={onboardingSteps.length}
            title={currentOnboarding.title}
            desc={currentOnboarding.desc}
            options={currentOnboarding.options}
            selected={onboardingData[currentOnboarding.inputKey]}
            onSelect={handleOnboardingSelect}
            onNext={() => {
              if (!onboardingData[currentOnboarding.inputKey]) {
                showToast(t('onboarding.optionRequired'), 'warning');
                return;
              }
              handleOnboardingNext();
            }}
            onBack={handleOnboardingBack}
            isLast={onboardingStep === onboardingSteps.length}
            progress={currentOnboarding.progress}
          />
        );
      case 'home':
        return <HomeScreen userData={userData} onNavigate={handleNavigate} />;
      case 'professor':
        return <ProfessorScreen userData={userData} studyFocus={studyFocus} onProgress={syncEconomy} />;
      case 'learn':
        return <LearnScreen userData={userData} studyFocus={studyFocus} onNavigate={handleNavigate} onRewardClaim={data => handleEconomyUpdate(data?.balance, data?.equipped || {}, data?.role, applyProgress(data?.summary || {}, {}))} onProgress={syncEconomy} />;
      case 'shop':
        return <ShopScreen userData={userData} onBack={() => handleNavigate('home')} onCoinsChange={handleEconomyUpdate} onAppearanceChange={handleAppearanceChange} onRewardToast={showToast} onProgress={syncEconomy} />;
      case 'calendar':
        return <CalendarScreen onBack={() => handleNavigate('home')} userData={userData} />;
      case 'subscriptions':
        return <SubscriptionsScreen onBack={() => handleNavigate('home')} />;
      case 'profile':
        return (
          <ProfileScreen
            userData={userData}
            onBack={() => handleNavigate('home')}
            onLogout={handleLogout}
            onToast={showToast}
            onProfileSaved={user => setUserData(prev => applyAccount(user, prev))}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <main className="screen-page animate-fadeIn">
            <header className="screen-header">
              <div className="eyebrow">Pagină lipsă</div>
              <h1 className="display-font screen-title">Nu am găsit ecranul.</h1>
              <p>Sesiunea e în regulă. Întoarce-te acasă sau la lecții.</p>
              <button type="button" className="accent-button" onClick={() => handleNavigate('home')}>Acasă</button>
            </header>
          </main>
        );
    }
  };

  const showNav = ['home', 'professor', 'learn', 'shop', 'profile', 'calendar'].includes(screen);

  return (
    <div className="app-shell">
      <AdaptiveContainer />
      <div className="app-background">
        <BackgroundSafe>
          <FloatingLines
            linesGradient={['#b9a7ff', '#6fd7ff', '#5a4fcf', '#5353b8']}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[6, 8, 10]}
            lineDistance={[5, 4, 3]}
            topWavePosition={{ x: 0.8, y: 0.25, rotate: -0.4 }}
            middleWavePosition={{ x: 1.0, y: -0.05, rotate: 0.2 }}
            bottomWavePosition={{ x: 2.0, y: -0.65, rotate: 0.4 }}
            animationSpeed={0.8}
            interactive={false}
            bendRadius={10}
            bendStrength={0.4}
            parallax={true}
            parallaxStrength={0.12}
          />
        </BackgroundSafe>
      </div>
      <Suspense fallback={<main className="screen-fallback">Se încarcă pagina…</main>}>
        {renderScreen()}
      </Suspense>
      {showNav && <BottomNav active={navScreen} onNavigate={handleNavigate} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default function App() {
  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultUserData, ...JSON.parse(saved) } : defaultUserData;
    } catch {
      return defaultUserData;
    }
  });
  return (
    <I18nProvider locale="ro">
      <AppShell userData={userData} setUserData={setUserData} />
    </I18nProvider>
  );
}
