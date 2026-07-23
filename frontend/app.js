const { useState, useEffect, useCallback } = React;
const STORAGE_KEY = 'mentor_ai_v3_data';
const BorderGlowComponent = window.BorderGlow || (() => null);
const AdaptiveContainerComponent = window.AdaptiveContainer || (() => null);

const defaultUserData = {
  name: '',
  surname: '',
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
  isLoggedIn: false,
  hasCompletedOnboarding: false
};

const formatRoDate = () => {
  const label = new Intl.DateTimeFormat('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const HomeScreen = ({ userData, onNavigate }) => (
  <main className="home-page animate-fadeIn">
    <header className="home-header">
      <div><div className="eyebrow">{formatRoDate()}</div><h1 className="display-font home-title">Bună, {userData.name || 'Elev'}.</h1></div>
      <button onClick={() => onNavigate('profile')} className="home-avatar" aria-label="Deschide profilul">{(userData.name || 'E').charAt(0).toUpperCase()}</button>
    </header>
    <section className="focus-card">
      <div><div className="eyebrow">Focusul zilei</div><h2 className="display-font">O sesiune mică.<br />Un pas mare.</h2><p>Ai un ritm de construit. Mentorul te ajută să începi fără presiune.</p></div>
      <button onClick={() => onNavigate('professor')} className="accent-button focus-action">Vorbește cu mentorul <i className="fas fa-arrow-up-right-from-square" /></button>
    </section>
    <section className="progress-section">
      <div className="section-heading"><div><div className="eyebrow">Progresul tău</div><h2 className="display-font">În creștere</h2></div><span className="progress-score">{userData.score || 0}<small>/100</small></span></div>
      <div className="progress-track"><div style={{ width: `${Math.min(userData.score || 0, 100)}%` }}></div></div>
      <div className="stats-grid"><div className="stat-card"><span>Nivel</span><strong>{userData.level}</strong><small>următorul pas</small></div><div className="stat-card"><span>Streak</span><strong>{userData.streak}</strong><small>zile la rând</small></div><div className="stat-card"><span>Coins</span><strong>{userData.coins}</strong><small>de cheltuit</small></div></div>
    </section>
    <section className="home-quick"><div className="section-heading"><div><div className="eyebrow">Acces rapid</div><h2 className="display-font">Ce facem azi?</h2></div></div><div className="quick-grid"><button onClick={() => onNavigate('learn')} className="quick-card quick-aqua"><i className="fas fa-book-open" /><span>Învață ceva nou</span><small>Module adaptate</small></button><button onClick={() => onNavigate('calendar')} className="quick-card quick-coral"><i className="fas fa-calendar-check" /><span>Planifică-ți ritmul</span><small>Vezi calendarul</small></button></div></section>
  </main>
);

const SubscriptionSkeleton = () => (
  <div className="surface skeleton-card" aria-hidden="true">
    <div className="skeleton skeleton-line medium"></div>
    <div className="skeleton skeleton-line short"></div>
    <div className="skeleton skeleton-line long"></div>
    <div className="skeleton skeleton-line long"></div>
    <div className="skeleton skeleton-line medium"></div>
  </div>
);

const SubscriptionsScreen = ({ onBack }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const load = async () => {
      const result = await MentorAPI.getSubscriptions();
      setSubscriptions(result.data);
      setFallback(result.fallback);
      setLoading(false);
    };
    load();
  }, []);

  const glowPalette = {
    starter: ['#8b5cf6', '#a78bfa', '#38bdf8'],
    pro: ['#f472b6', '#fb7185', '#f59e0b'],
    elite: ['#34d399', '#22c55e', '#38bdf8']
  };

  const planLabel = {
    starter: 'Beginner',
    pro: 'Popular',
    elite: 'Maxim'
  };

  const comparisonRows = [
    {
      label: 'Răspunsuri AI',
      starter: 'Bază',
      pro: 'Detaliate + adaptate',
      elite: 'Detaliate + strategice + avansate'
    },
    {
      label: 'Sesiuni ghidate',
      starter: '2 pe zi',
      pro: 'Nelimitate + personalizare',
      elite: 'Nelimitate + planizare avansată'
    },
    {
      label: 'Plan de progres',
      starter: 'General',
      pro: 'Ritmul tău',
      elite: 'Ritm + recalcul live'
    },
    {
      label: 'Memorie de studiu',
      starter: 'Fundamentală',
      pro: 'Repetiție inteligentă',
      elite: 'Repetiție de top + recapitulate'
    },
    {
      label: 'Suport de pregătire',
      starter: 'Standard',
      pro: 'Prioritate',
      elite: 'Prioritate + sesiuni premium'
    },
    {
      label: 'Exerciții generate',
      starter: '3 / săptămână',
      pro: '5 / săptămână',
      elite: 'Nelimitate'
    },
    {
      label: 'Traseu de învățare',
      starter: 'Simplu',
      pro: 'Personalizat',
      elite: 'Personalizat + complet'
    },
    {
      label: 'Atenție pentru examen',
      starter: 'Bază',
      pro: 'Intensiv',
      elite: 'Simulare completă'
    }
  ];

  return (
    <div className="screen-page animate-fadeIn" aria-busy={loading}>
      <div className="subscription-topbar">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Abonamente</div>
      </div>

      <div className="subscription-shell">
        {loading ? (
          <div className="grid gap-4" aria-label="Se încarcă abonamentele">
            <SubscriptionSkeleton />
            <SubscriptionSkeleton />
            <SubscriptionSkeleton />
          </div>
        ) : (
          <>
            {fallback && <div className="subscription-warning">Datele de abonamente sunt afișate din fallback local deoarece backend-ul nu a răspuns.</div>}

            <section className="subscription-hero surface">
              <div className="subscription-hero-copy">
                <div className="eyebrow">Upgrade-ul tău</div>
                <h1 className="display-font subscription-title">Alege nivelul care ridică ritmul de învățare.</h1>
                <p className="subscription-subtitle">Fiecare plan îți oferă acces la mentorul AI, sesiuni ghidate și un progres mai clar. Planul Pro este recomandat pentru performanță reală, în ritm constant.</p>
                <div className="subscription-hero-badges">
                  <span><i className="fas fa-shield-heart"></i> Sprijin premium</span>
                  <span><i className="fas fa-rocket"></i> Răspuns rapid</span>
                  <span><i className="fas fa-brain"></i> Memorie de studiu</span>
                </div>
              </div>
              <div className="subscription-hero-panel">
                <div className="subscription-hero-balance">
                  <small>Valoarea recomandată</small>
                  <strong>3x mai multă claritate</strong>
                </div>
                <div className="subscription-hero-stats">
                  <div>
                    <span>10+ limbi</span>
                    <strong>Răspunsuri personalizate</strong>
                  </div>
                  <div>
                    <span>24/7</span>
                    <strong>Disponibilitate</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="subscription-grid">
              {subscriptions.map(plan => (
                <div key={plan.id} className={`subscription-card-shell ${plan.id === 'pro' ? 'featured-plan' : ''}`}>
                  <div className="subscription-ribbon">{planLabel[plan.id] || 'Plan'}</div>
                  <BorderGlowComponent
                    className="subscription-card"
                    edgeSensitivity={34}
                    glowColor={plan.id === 'pro' ? '300 90 72' : plan.id === 'elite' ? '140 70 65' : '240 70 70'}
                    backgroundColor="#17172E"
                    borderRadius={24}
                    glowRadius={48}
                    glowIntensity={1.15}
                    coneSpread={30}
                    animated={true}
                    colors={glowPalette[plan.id] || ['#c084fc', '#f472b6', '#38bdf8']}
                    fillOpacity={0.5}
                  >
                    <div className="subscription-card-inner">
                      <div className="subscription-card-head">
                        <div>
                          <div className="subscription-pill">{plan.name}</div>
                          <div className="subscription-price">{plan.price}</div>
                        </div>
                        <i className="fas fa-crown subscription-icon"></i>
                      </div>
                      <p className="subscription-description">{plan.description}</p>
                      <ul className="subscription-features">
                        {plan.features.map((feature, index) => (
                          <li key={index}><i className="fas fa-check-circle"></i>{feature}</li>
                        ))}
                      </ul>
                      <button className={`subscription-button ${plan.id === 'pro' ? 'is-featured' : ''}`}>Alege planul</button>
                    </div>
                  </BorderGlowComponent>
                </div>
              ))}
            </section>

            <section className="subscription-compare surface">
              <div className="subscription-compare-copy">
                <div className="eyebrow">De ce să alegi un plan?</div>
                <h2 className="display-font">Vei vedea diferența în claritate, ritm și încredere.</h2>
                <p>Fiecare plan are o funcție clară: Starter te ajută să începi, Pro te face să mergi constant, Elite te duce la un ritm mai performant și mai strategic.</p>
              </div>
              <div className="subscription-compare-list">
                <div>
                  <strong>Mentor AI cu feedback</strong>
                  <span>Răspunsuri clare, adaptate la nivelul tău și la materia aleasă.</span>
                </div>
                <div>
                  <strong>Studii directionate</strong>
                  <span>Planuri scurte, profesionale și utile pentru fiecare zi, nu pentru "mai târziu".</span>
                </div>
                <div>
                  <strong>Progres vizibil</strong>
                  <span>Ai o stare de învățare mai organizată și așternut pe ritm real.</span>
                </div>
              </div>
            </section>

            <section className="subscription-comparison surface">
              <div className="subscription-comparison-head">
                <div>
                  <div className="eyebrow">Compară planurile</div>
                  <h2 className="display-font">Toate diferențele, într-un singur loc.</h2>
                </div>
                <div className="subscription-comparison-pill">Desktop-first layout</div>
              </div>

              <div className="comparison-table" role="table" aria-label="Tabel comparativ abonamente">
                <div className="comparison-row comparison-row-head" role="row">
                  <div className="comparison-cell comparison-cell-feature" role="columnheader">Funcție</div>
                  <div className="comparison-cell" role="columnheader">Starter</div>
                  <div className="comparison-cell" role="columnheader">Pro</div>
                  <div className="comparison-cell" role="columnheader">Elite</div>
                </div>
                {comparisonRows.map(row => (
                  <div className="comparison-row" role="row" key={row.label}>
                    <div className="comparison-cell comparison-cell-feature" role="cell"><strong>{row.label}</strong></div>
                    <div className="comparison-cell" role="cell">{row.starter}</div>
                    <div className="comparison-cell" role="cell">{row.pro}</div>
                    <div className="comparison-cell" role="cell">{row.elite}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

const ProfileScreen = ({ userData, onBack }) => (
  <div className="screen-page animate-fadeIn">
    <div className="px-5 pt-6 flex items-center justify-between">
      <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
      <div className="text-sm text-slate-400">Profil</div>
    </div>
    <div className="surface mx-5 mt-6 rounded-3xl p-5 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-3xl gradient-primary flex items-center justify-center text-3xl">M</div>
        <div>
          <div className="text-xl font-extrabold">{userData.name || 'Elev Mentor'}</div>
          <div className="text-sm text-slate-400">{userData.school || 'Profil personal'}</div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="surface-soft rounded-3xl p-4 text-sm">
          <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">Coins</div>
          <div className="text-lg font-semibold">{userData.coins}</div>
        </div>
        <div className="surface-soft rounded-3xl p-4 text-sm">
          <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">Streak</div>
          <div className="text-lg font-semibold">{userData.streak} zile</div>
        </div>
      </div>
    </div>
    <div className="mx-5 mt-5 grid gap-3">
      <button className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">Setări cont</button>
      <button className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">Preferințe limbă</button>
    </div>
  </div>
);

const CalendarScreen = ({ onBack }) => (
  <div className="screen-page animate-fadeIn">
    <div className="px-5 pt-6 flex items-center justify-between">
      <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
      <div className="text-sm text-slate-400">Calendar</div>
    </div>
    <div className="surface mx-5 mt-8 rounded-3xl p-5 text-slate-300">
      <div className="text-lg font-bold mb-2">Planificare săptămânală</div>
      <p className="text-sm leading-relaxed">Urmărește orele, testele și sesiunile importante. Această pagină va sincroniza datele de studiu și abonamentele pentru a-ți proteja progresul.</p>
    </div>
  </div>
);

const App = () => {
  const [screen, setScreen] = useState('splash');
  const [navScreen, setNavScreen] = useState('home');
  const [toast, setToast] = useState(null);
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultUserData;
  });
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleSplashFinish = () => {
    if (userData.isLoggedIn && userData.hasCompletedOnboarding) {
      setScreen('home');
      setNavScreen('home');
    } else {
      setScreen('auth');
    }
  };

  const handleLogin = () => {
    setUserData(prev => ({ ...prev, isLoggedIn: true }));
    setScreen('home');
    setNavScreen('home');
    showToast('Bun venit!', 'success');
  };

  const handleRegister = formData => {
    const nameParts = (formData.name || '').split(' ');
    setUserData(prev => ({
      ...prev,
      name: nameParts[0] || '',
      surname: nameParts.slice(1).join(' ') || '',
      school: formData.school || '',
      class: formData.class || '',
      isLoggedIn: true
    }));
    setOnboardingStep(1);
    setScreen('onboarding');
  };

  const onboardingSteps = [
    {
      step: 1,
      title: 'Cum te cheamă?',
      desc: 'Spune-mi cum vrei să te strig.',
      inputKey: 'name',
      options: [],
      progress: 20
    },
    {
      step: 2,
      title: 'Ce clasă ești?',
      desc: 'Vom personaliza conținutul pentru tine.',
      inputKey: 'class',
      options: [
        { icon: 'fa-child', label: 'Clasele V-VIII', value: 'gimnaziu' },
        { icon: 'fa-user-graduate', label: 'Clasele IX-XII', value: 'liceu' }
      ],
      progress: 40
    },
    {
      step: 3,
      title: 'Ce profil ai?',
      desc: 'Alegem materia principală pentru tine.',
      inputKey: 'profile',
      options: [
        { icon: 'fa-flask', label: 'Real', value: 'real' },
        { icon: 'fa-book', label: 'Uman', value: 'uman' }
      ],
      progress: 60
    },
    {
      step: 4,
      title: 'Ce examen urmează?',
      desc: 'Te ajutăm să te pregătești strategic.',
      inputKey: 'exam',
      options: [
        { icon: 'fa-clipboard-check', label: 'BAC', value: 'bac' },
        { icon: 'fa-book-open', label: 'Evaluare Națională', value: 'evaluare' }
      ],
      progress: 80
    },
    {
      step: 5,
      title: 'Câte ore poți învăța pe zi?',
      desc: 'Creăm un ritm potrivit pentru tine.',
      inputKey: 'dailyHours',
      options: [
        { icon: 'fa-clock', label: '30 minute', value: '0.5' },
        { icon: 'fa-clock', label: '1 oră', value: '1' },
        { icon: 'fa-clock', label: '2 ore', value: '2' }
      ],
      progress: 100
    }
  ];

  const currentOnboarding = onboardingSteps[onboardingStep - 1];

  const handleOnboardingNext = () => {
    if (onboardingStep >= onboardingSteps.length) {
      setUserData(prev => ({ ...prev, ...onboardingData, hasCompletedOnboarding: true }));
      setScreen('home');
      setNavScreen('home');
      showToast('Profilul tău este gata!', 'success');
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
        return <LoginScreen onBack={() => setScreen('auth')} onLogin={handleLogin} />;
      case 'register':
        return <RegisterScreen onBack={() => setScreen('auth')} onContinue={handleRegister} onValidationError={message => showToast(message, 'warning')} />;
      case 'onboarding':
        return currentOnboarding.step === 1 ? (
          <main className="onboarding-page animate-fadeIn">
            <div className="onboarding-topline"><span>CONFIGURARE</span><span>01 / 05</span></div>
            <div className="onboarding-progress"><div style={{ width: currentOnboarding.progress + '%' }}></div></div>
            <div className="onboarding-copy">
              <div className="eyebrow">Pasul 1 din 5</div>
              <h1 className="display-font onboarding-title">{currentOnboarding.title}</h1>
              <p className="form-subtitle">{currentOnboarding.desc}</p>
            </div>
            <input
              type="text"
              value={onboardingData.name || ''}
              onChange={e => setOnboardingData({ ...onboardingData, name: e.target.value })}
              className="field form-input"
              placeholder="Numele tău"
            />
            <div className="onboarding-actions"><div className="onboarding-action-row"><button
                onClick={() => {
                  if (!onboardingData.name) {
                    showToast('Te rog introdu numele tău.', 'warning');
                    return;
                  }
                  handleOnboardingNext();
                }}
                className="accent-button onboarding-next">
                Continuă <i className="fas fa-arrow-right"></i>
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
                showToast('Alege o opțiune pentru a continua.', 'warning');
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
        return <LearnScreen userData={userData} />;
      case 'calendar':
        return <CalendarScreen onBack={() => handleNavigate('home')} />;
      case 'subscriptions':
        return <SubscriptionsScreen onBack={() => handleNavigate('home')} />;
      case 'profile':
        return <ProfileScreen userData={userData} onBack={() => handleNavigate('home')} />;
      default:
        return <HomeScreen userData={userData} onNavigate={handleNavigate} />;
    }
  };

  const showNav = ['home', 'professor', 'learn', 'calendar', 'subscriptions', 'profile'].includes(screen);

  return (
    <div className="app-shell">
      <AdaptiveContainerComponent />
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
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
