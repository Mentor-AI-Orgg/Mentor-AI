import { useState, useEffect, useCallback, useMemo } from 'react';
import { MentorAPI } from './apiClient.js';
import { STORAGE_KEY, defaultUserData } from './userData.js';
import { I18nProvider, useI18n } from './i18n/index.jsx';
import AdaptiveContainer from './components/AdaptiveContainer.jsx';
import FloatingLines from './components/FloatingLines.jsx';
import BottomNav from './components/BottomNav.jsx';
import Toast from './components/Toast.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import AuthScreen from './components/AuthScreen.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import RegisterScreen from './components/RegisterScreen.jsx';
import OnboardingScreen from './components/OnboardingScreen.jsx';
import { ProfessorScreen, LearnScreen } from './components/StudyScreens.jsx';
import ShopScreen from './components/ShopScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import SubscriptionsScreen from './screens/SubscriptionsScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import CalendarScreen from './screens/CalendarScreen.jsx';

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
    hasCompletedOnboarding: Boolean(user.hasCompletedOnboarding)
  };
}

function AppShell({ userData, setUserData }) {
  const { t } = useI18n();
  const [screen, setScreen] = useState('splash');
  const [navScreen, setNavScreen] = useState('home');
  const [toast, setToast] = useState(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleEconomyUpdate = useCallback((balance, equipped = {}, role = null, extra = {}) => {
    setUserData(prev => ({
      ...prev,
      coins: typeof balance === 'number' ? balance : prev.coins,
      avatarId: equipped.avatar || prev.avatarId,
      themeId: equipped.background || prev.themeId,
      voiceId: equipped.voice || prev.voiceId,
      role: role || prev.role,
      ...extra
    }));
  }, []);

  const handleAppearanceChange = useCallback((equipped = {}, inventory = []) => {
    setUserData(prev => ({
      ...prev,
      avatarId: equipped.avatar || prev.avatarId,
      themeId: equipped.background || prev.themeId,
      voiceId: equipped.voice || prev.voiceId,
      inventory
    }));
  }, []);

  const handleLanguageChange = useCallback(patch => {
    setUserData(prev => ({ ...prev, ...patch }));
  }, []);

  const handleSplashFinish = async () => {
    const session = await MentorAPI.me();
    if (!session.success) {
      setUserData(prev => ({ ...prev, isLoggedIn: false }));
      setScreen('auth');
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
      setOnboardingStep(1);
      setScreen('onboarding');
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

    setScreen('home');
    setNavScreen('home');
  };

  const handleLogin = async credentials => {
    const result = await MentorAPI.login(credentials);
    if (!result.success) {
      return { success: false, error: result.error };
    }

    const user = result.data.user || {};
    setUserData(prev => applyAccount(user, prev));

    if (!user.hasCompletedOnboarding) {
      setOnboardingStep(1);
      setScreen('onboarding');
      MentorAPI.claimReward({ type: 'login_bonus' }).then(rewardResult => {
        if (rewardResult.success) {
          handleEconomyUpdate(rewardResult.data.balance, {}, null, { firstLoginRewardClaimed: true });
        }
      });
      showToast(t('toast.welcome'), 'success');
      return { success: true };
    }

    setScreen('home');
    setNavScreen('home');

    MentorAPI.claimReward({ type: 'login_bonus' }).then(rewardResult => {
      if (rewardResult.success) {
        handleEconomyUpdate(rewardResult.data.balance, {}, null, { firstLoginRewardClaimed: true });
      }
    });
    showToast(t('toast.welcome'), 'success');
    return { success: true };
  };

  const handleLogout = async () => {
    await MentorAPI.logout();
    setUserData(prev => ({ ...prev, isLoggedIn: false, email: '', planId: 'free', coins: 0 }));
    setScreen('auth');
    setNavScreen('home');
    showToast(t('toast.loggedOut'), 'success');
  };

  const handleForgotPassword = async email => {
    const result = await MentorAPI.forgotPassword({ email });
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
      subject: formData.subject || 'matematica',
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
      subject: formData.subject || 'matematica',
      profile: formData.subject || 'matematica',
      role: 'student',
      parentEmail: formData.parentEmail || '',
      isLoggedIn: true
    }));
    setOnboardingStep(1);
    setScreen('onboarding');
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
      progress: 40
    },
    {
      step: 3,
      title: t('onboarding.step3.title'),
      desc: t('onboarding.step3.desc'),
      inputKey: 'subject',
      options: [
        { icon: 'fa-square-root-alt', label: t('onboarding.step3.matematica'), value: 'matematica' },
        { icon: 'fa-book', label: t('onboarding.step3.romana'), value: 'romana' }
      ],
      progress: 60
    },
    {
      step: 4,
      title: t('onboarding.step4.title'),
      desc: t('onboarding.step4.desc'),
      inputKey: 'exam',
      options: [
        { icon: 'fa-book-open', label: t('onboarding.step4.daily'), value: 'daily' },
        { icon: 'fa-clipboard-check', label: t('onboarding.step4.evaluare'), value: 'evaluare' }
      ],
      progress: 80
    },
    {
      step: 5,
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
        profile: onboardingData.subject || onboardingData.profile || 'matematica',
        subject: onboardingData.subject || 'matematica',
        hasCompletedOnboarding: true
      };
      await MentorAPI.updateProfile(payload);
      setUserData(prev => ({ ...prev, ...payload }));
      setScreen('home');
      setNavScreen('home');
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

  const handleNavigate = target => {
    setNavScreen(target);
    setScreen(target);
  };

  const handleSelectPlan = async (planId, billingCycle = 'monthly') => {
    const result = await MentorAPI.checkoutSubscription({
      plan_id: planId,
      billing_cycle: billingCycle,
      user_id: userData.email || 'demo_user',
      payment_method: 'card',
      card_last4: '4242',
      parent_email: userData.parentEmail || '',
      role: userData.role || 'student'
    });
    if (!result.success) {
      showToast(t('toast.planFailed'), 'warning');
      return { success: false };
    }
    if (result.data?.url) {
      window.location.href = result.data.url;
      return { success: true, redirect: true };
    }
    const status = result.data?.subscription?.status || 'active';
    setUserData(prev => ({
      ...prev,
      planId: result.data?.subscription?.planId || planId,
      planStatus: status
    }));
    if (status === 'pending_parent_review') {
      showToast(t('toast.planPending', { plan: planId }), 'warning');
    } else if (result.data?.mocked) {
      showToast(t('toast.planMocked', { plan: planId }), 'success');
    } else {
      showToast(planId === 'free' ? t('toast.planFree') : t('toast.planActive', { plan: planId }), 'success');
    }
    return { success: true, status };
  };

  const handleOnboardingSelect = value => {
    setOnboardingData(prev => ({ ...prev, [currentOnboarding.inputKey]: value }));
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'auth':
        return <AuthScreen onLogin={() => setScreen('login')} onRegister={() => setScreen('register')} />;
      case 'login':
        return <LoginScreen onBack={() => setScreen('auth')} onLogin={handleLogin} onForgotPassword={handleForgotPassword} />;
      case 'register':
        return <RegisterScreen onBack={() => setScreen('auth')} onContinue={handleRegister} onValidationError={message => showToast(message, 'warning')} />;
      case 'onboarding':
        return currentOnboarding.step === 1 ? (
          <main className="onboarding-page animate-fadeIn">
            <div className="onboarding-topline"><span>{t('onboarding.setup')}</span><span>01 / 05</span></div>
            <div className="onboarding-progress"><div style={{ width: currentOnboarding.progress + '%' }}></div></div>
            <div className="onboarding-copy">
              <div className="eyebrow">{t('onboarding.stepOf', { step: 1, total: 5 })}</div>
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
        return <ProfessorScreen userData={userData} />;
      case 'learn':
        return <LearnScreen userData={userData} onRewardClaim={data => handleEconomyUpdate(data?.balance, data?.equipped || {}, data?.role)} />;
      case 'shop':
        return <ShopScreen userData={userData} onBack={() => handleNavigate('home')} onCoinsChange={handleEconomyUpdate} onAppearanceChange={handleAppearanceChange} onRewardToast={showToast} />;
      case 'calendar':
        return <CalendarScreen onBack={() => handleNavigate('home')} />;
      case 'subscriptions':
        return <SubscriptionsScreen userData={userData} onBack={() => handleNavigate('home')} currentPlanId={userData.planId || 'free'} currentPlanStatus={userData.planStatus} onSelectPlan={handleSelectPlan} onToast={showToast} />;
      case 'profile':
        return (
          <ProfileScreen
            userData={userData}
            onBack={() => handleNavigate('home')}
            onLogout={handleLogout}
            onToast={showToast}
            onLanguageChange={handleLanguageChange}
          />
        );
      default:
        return <HomeScreen userData={userData} onNavigate={handleNavigate} />;
    }
  };

  const showNav = ['home', 'professor', 'learn', 'shop', 'calendar', 'subscriptions', 'profile'].includes(screen);

  return (
    <div className="app-shell">
      <AdaptiveContainer />
      <div className="app-background">
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
      </div>
      {renderScreen()}
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
  const locale = userData.uiLanguage || userData.language || 'ro';
  return (
    <I18nProvider locale={locale}>
      <AppShell userData={userData} setUserData={setUserData} />
    </I18nProvider>
  );
}
