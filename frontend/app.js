const { useState, useEffect, useCallback } = React;
const STORAGE_KEY = 'mentor_ai_v3_data';
const BorderGlowComponent = window.BorderGlow || (() => null);
const AdaptiveContainerComponent = window.AdaptiveContainer || (() => null);

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

const HomeScreen = ({ userData, onNavigate }) => (
  <main className="home-page animate-fadeIn">
    <header className="home-header">
      <div>
        <div className="eyebrow">{formatRoDate()}</div>
        <h1 className="display-font home-title">Bună, {userData.name || 'Elev'}.</h1>
        <p className="home-role-tag">{userData.role === 'parent' ? 'Cont părinte' : userData.role === 'teacher' ? 'Cont profesor' : 'Cont elev'}</p>
      </div>
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
    <section className="home-quick"><div className="section-heading"><div><div className="eyebrow">Acces rapid</div><h2 className="display-font">Ce facem azi?</h2></div></div><div className="quick-grid"><button onClick={() => onNavigate('learn')} className="quick-card quick-aqua"><i className="fas fa-book-open" /><span>Învață ceva nou</span><small>Module adaptate</small></button><button onClick={() => onNavigate('calendar')} className="quick-card quick-coral"><i className="fas fa-calendar-check" /><span>Planifică-ți ritmul</span><small>Vezi calendarul</small></button><button onClick={() => onNavigate('shop')} className="quick-card quick-gold"><i className="fas fa-store" /><span>Shop</span><small>Daily free & items</small></button></div></section>
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

const SubscriptionsScreen = ({ userData, onBack, currentPlanId, currentPlanStatus, onSelectPlan, onToast }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(currentPlanId || 'free');
  const [pendingPlanId, setPendingPlanId] = useState(null);
  const [checkingOutPlanId, setCheckingOutPlanId] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [parentEmail, setParentEmail] = useState('');
  const [parentMessage, setParentMessage] = useState('Vreau să discutăm împreună despre prețuri și beneficii.');
  const [sendingReview, setSendingReview] = useState(false);

  useEffect(() => {
    const load = async () => {
      const result = await MentorAPI.getSubscriptions();
      setSubscriptions(result.data);
      setFallback(result.fallback);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    setSelectedPlanId(currentPlanId || 'free');
    setPendingPlanId(currentPlanStatus === 'pending_parent_review' ? currentPlanId : null);
  }, [currentPlanId, currentPlanStatus]);

  const glowPalette = {
    free: ['#38bdf8', '#60a5fa', '#8b5cf6'],
    pro: ['#f472b6', '#fb7185', '#f59e0b'],
    premium: ['#34d399', '#22c55e', '#38bdf8'],
    elite: ['#fbbf24', '#fb7185', '#f59e0b']
  };

  const planLabel = {
    free: 'Start',
    premium: 'Popular',
    pro: 'Pro',
    elite: 'Family'
  };

  const billingLabels = {
    monthly: '1 lună',
    quarterly: '3 luni',
    halfYear: '6 luni',
    yearly: '12 luni'
  };

  const comparisonRows = [
    {
      label: 'Răspunsuri AI',
      free: 'Fallback basic',
      pro: 'Gemini → Claude → Wolfram',
      premium: 'Fallback premium + claritate',
      elite: 'Consiliu complet + familie'
    },
    {
      label: 'Sesiuni ghidate',
      free: '2 pe zi',
      pro: 'Nelimitate + personalizare',
      premium: 'Nelimitate + personalizare',
      elite: 'Nelimitate + coordonare avansată'
    },
    {
      label: 'Plan de progres',
      free: 'General',
      pro: 'Ritmul tău',
      premium: 'Ritm + recalcul live',
      elite: 'Ritm + recalcul live'
    },
    {
      label: 'Memorie de studiu',
      free: 'Sesiunea curentă',
      pro: 'Repetiție inteligentă',
      premium: 'Repetiție avansată + sinteză',
      elite: 'Repetiție avansată + sinteză'
    },
    {
      label: 'Suport de pregătire',
      free: 'Standard',
      pro: 'Prioritate',
      premium: 'Prioritate + sesiuni premium',
      elite: 'Prioritate + sesiuni premium'
    },
    {
      label: 'Exerciții generate',
      free: '3 / săptămână',
      pro: '5 / săptămână',
      premium: 'Nelimitate',
      elite: 'Nelimitate'
    },
    {
      label: 'Traseu de învățare',
      free: 'Simplu',
      pro: 'Personalizat',
      premium: 'Personalizat + complet',
      elite: 'Personalizat + complet'
    },
    {
      label: 'Atenție pentru examen',
      free: 'Bază',
      pro: 'Intensiv',
      premium: 'Simulare completă',
      elite: 'Simulare completă'
    }
  ];

  const formatPlanPrice = plan => {
    const priceMap = {
      monthly: plan.priceMonthly,
      quarterly: plan.priceQuarterly,
      halfYear: plan.priceHalfYear,
      yearly: plan.priceYearly
    };
    const price = Number(priceMap[billingCycle] ?? plan.priceMonthly ?? 0);
    if (!price) return 'Gratis';
    return `${price} lei / ${billingLabels[billingCycle]}`;
  };

  const renderFeature = feature => {
    const item = typeof feature === 'string' ? { label: feature, included: true } : feature;
    return (
      <li key={item.label} className={item.included ? '' : 'not-included'}>
        <i className={`fas ${item.included ? 'fa-check-circle' : 'fa-circle-xmark'}`}></i>
        <span>{item.label}</span>
      </li>
    );
  };

  const selectPlan = async planId => {
    if (planId === selectedPlanId && !pendingPlanId) return;
    if (!onSelectPlan) return;
    setCheckingOutPlanId(planId);
    const result = await onSelectPlan(planId, billingCycle);
    setCheckingOutPlanId(null);
    // Nu presupunem că a mers -- reflectăm exact ce a răspuns backend-ul,
    // inclusiv statusul "în așteptare de aprobare din partea părintelui".
    if (result?.success) {
      setSelectedPlanId(planId);
      setPendingPlanId(result.status === 'pending_parent_review' ? planId : null);
    }
  };

  const sendParentReview = async () => {
    if (!parentEmail.trim()) return;
    setSendingReview(true);
    const result = await MentorAPI.sendParentReview({
      user_id: userData?.email || 'demo_user',
      parent_email: parentEmail,
      plan_id: selectedPlanId,
      billing_cycle: billingCycle,
      role: userData?.role || 'student',
      message: parentMessage
    });
    setSendingReview(false);
    if (result.success) {
      if (onToast) onToast('Rezumatul a fost trimis către părinte.', 'success');
    } else {
      if (onToast) onToast('Nu am putut trimite mesajul acum. Încearcă din nou.', 'warning');
    }
  };

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
                <div className="subscription-cycle-picker">
                  {Object.entries(billingLabels).map(([key, label]) => (
                    <button key={key} type="button" className={`subscription-cycle-pill ${billingCycle === key ? 'active' : ''}`} onClick={() => setBillingCycle(key)}>{label}</button>
                  ))}
                </div>
                <div className="subscription-hero-badges">
                  <span><i className="fas fa-shield-heart"></i> Sprijin premium</span>
                  <span><i className="fas fa-rocket"></i> Răspuns rapid</span>
                  <span><i className="fas fa-brain"></i> Memorie de studiu</span>
                </div>
                <div className="subscription-current-plan">
                  <span>Planul tău curent</span>
                  <strong>{planLabel[selectedPlanId] || 'Free'}</strong>
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
                <div key={plan.id} className={`subscription-card-shell ${plan.id === 'pro' ? 'featured-plan' : ''} ${selectedPlanId === plan.id ? 'current-plan' : ''}`}>
                  <div className="subscription-ribbon">{planLabel[plan.id] || 'Plan'}</div>
                  <BorderGlowComponent
                    className="subscription-card"
                    edgeSensitivity={34}
                    glowColor={plan.id === 'elite' ? '45 95 60' : plan.id === 'pro' ? '300 90 72' : plan.id === 'premium' ? '140 70 65' : '240 70 70'}
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
                          <div className="subscription-price">{formatPlanPrice(plan)}</div>
                        </div>
                        <i className={`fas ${plan.id === 'elite' ? 'fa-people-group' : 'fa-crown'} subscription-icon`}></i>
                      </div>
                      <p className="subscription-description">{plan.description || plan.tagline}</p>
                      <ul className="subscription-features">
                        {plan.features.map(renderFeature)}
                      </ul>
                      {selectedPlanId === plan.id && pendingPlanId === plan.id && (
                        <div className="subscription-pending-badge"><i className="fas fa-clock" /> Așteaptă aprobarea părintelui</div>
                      )}
                      <button
                        type="button"
                        className={`subscription-button ${plan.id === 'pro' ? 'is-featured' : ''}`}
                        onClick={() => selectPlan(plan.id)}
                        disabled={(selectedPlanId === plan.id && pendingPlanId !== plan.id) || checkingOutPlanId === plan.id}
                      >
                        {checkingOutPlanId === plan.id
                          ? 'Se activează...'
                          : selectedPlanId === plan.id
                            ? (pendingPlanId === plan.id ? 'În așteptare' : 'Plan activ')
                            : 'Alege planul'}
                      </button>
                    </div>
                  </BorderGlowComponent>
                </div>
              ))}
            </section>

            <section className="subscription-parent-review surface">
              <div>
                <div className="eyebrow">Părinte / profesor</div>
                <h2 className="display-font">Trimite prețurile înainte de abonare.</h2>
                <p>Poți cere o părere despre prețuri și beneficii direct din aplicație. Mesajul ajunge în inbox-ul mock și poate fi înlocuit cu email real mai târziu.</p>
              </div>
              <div className="subscription-parent-review-form">
                <input value={parentEmail} onChange={e => setParentEmail(e.target.value)} placeholder="Email părinte" />
                <textarea value={parentMessage} onChange={e => setParentMessage(e.target.value)} rows="3" placeholder="Mesaj pentru părinte" />
                <button type="button" className="accent-button" onClick={sendParentReview} disabled={sendingReview || !parentEmail.trim()}>{sendingReview ? 'Trimit...' : 'Trimite către părinte'}</button>
              </div>
            </section>

            <section className="subscription-compare surface">
              <div className="subscription-compare-copy">
                <div className="eyebrow">De ce să alegi un plan?</div>
                <h2 className="display-font">Vei vedea diferența în claritate, ritm și încredere.</h2>
                <p>Fiecare plan are o funcție clară: Free te ajută să începi, Pro te face să mergi constant, iar Premium te duce la un ritm mai performant și mai strategic.</p>
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
                  <div className="comparison-cell" role="columnheader">Free</div>
                  <div className="comparison-cell" role="columnheader">Pro</div>
                  <div className="comparison-cell" role="columnheader">Premium</div>
                  <div className="comparison-cell" role="columnheader">Elite</div>
                </div>
                {comparisonRows.map(row => (
                  <div className="comparison-row" role="row" key={row.label}>
                    <div className="comparison-cell comparison-cell-feature" role="cell"><strong>{row.label}</strong></div>
                    <div className="comparison-cell" role="cell">{row.free}</div>
                    <div className="comparison-cell" role="cell">{row.pro}</div>
                    <div className="comparison-cell" role="cell">{row.premium}</div>
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

const ProfileScreen = ({ userData, onBack, onLogout }) => {
  const [detectText, setDetectText] = useState('');
  const [detectLoading, setDetectLoading] = useState(false);
  const [detectResult, setDetectResult] = useState(null);
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    const loadInbox = async () => {
      const result = await window.MentorAPI.getNotifications();
      if (result.success) {
        setInbox(result.data.inbox || []);
      }
    };
    loadInbox();
  }, [userData.email]);

  const runDetector = async () => {
    if (!detectText.trim()) return;
    setDetectLoading(true);
    const result = await window.MentorAPI.detect({ text: detectText.trim() });
    if (result.success) {
      setDetectResult(result.data);
    } else {
      setDetectResult({ verdict: 'Detector indisponibil', ai_probability: 0 });
    }
    setDetectLoading(false);
  };

  return (
    <div className="screen-page animate-fadeIn">
      <div className="px-5 pt-6 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Profil</div>
      </div>
      <div className="surface mx-5 mt-6 rounded-3xl p-5 shadow-xl profile-hero-card">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl gradient-primary flex items-center justify-center text-3xl">{(userData.name || 'M').charAt(0).toUpperCase()}</div>
          <div>
            <div className="text-xl font-extrabold">{userData.name || 'Elev Mentor'}</div>
            <div className="text-sm text-slate-400">{userData.school || 'Profil personal'}</div>
            <div className="profile-role-pill">{userData.role === 'parent' ? 'Părinte' : userData.role === 'teacher' ? 'Profesor' : 'Elev'}</div>
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

      <div className="mx-5 mt-5 profile-tools-grid">
        <section className="surface rounded-3xl p-5 profile-tool-card">
          <div className="eyebrow">Detector AI</div>
          <h3 className="display-font profile-tool-title">Verifică dacă textul pare generat.</h3>
          <textarea
            className="profile-detector-input"
            rows="5"
            value={detectText}
            onChange={e => setDetectText(e.target.value)}
            placeholder="Lipește aici un text pentru detectare AI..."
          />
          <button type="button" className="accent-button profile-tool-action" onClick={runDetector} disabled={detectLoading || !detectText.trim()}>
            {detectLoading ? 'Analizez...' : 'Rulează detectorul'}
          </button>
          {detectResult && (
            <div className="profile-detector-result">
              <strong>{detectResult.verdict || 'Rezultat detector'}</strong>
              <span>Probabilitate AI: {Number(detectResult.ai_probability || 0).toFixed(0)}%</span>
            </div>
          )}
        </section>

        <section className="surface rounded-3xl p-5 profile-tool-card">
          <div className="eyebrow">Email mock</div>
          <h3 className="display-font profile-tool-title">Mesaje către părinte sau profesor.</h3>
          <div className="profile-inbox">
            {inbox.length === 0 ? (
              <p className="profile-empty-note">Nu există mesaje trimise încă. Folosește shop-ul sau abonamentele pentru recenzie.</p>
            ) : (
              inbox.slice(0, 3).map(message => (
                <article key={message.id} className="profile-inbox-item">
                  <strong>{message.subject}</strong>
                  <span>{message.body}</span>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="mx-5 mt-5">
        <window.Leaderboard userData={userData} />
      </div>
      <div className="mx-5 mt-5 grid gap-3">
        <button className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">Setări cont</button>
        <button className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">Preferințe limbă</button>
        <button type="button" onClick={onLogout} className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">
          <i className="fas fa-arrow-right-from-bracket mr-2"></i>Deconectează-te
        </button>
      </div>
    </div>
  );
};

const ParentDashboardScreen = ({ userData, onBack, onNavigate, showToast }) => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [childEmail, setChildEmail] = useState(userData.childEmail || '');
  const [preferences, setPreferences] = useState(DEFAULT_PARENT_NOTIFICATION_PREFERENCES);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [linking, setLinking] = useState(false);
  const [testForm, setTestForm] = useState({ subject: '', note: '', dueDate: '' });
  const [sendingTest, setSendingTest] = useState(false);
  const [accessCodeSent, setAccessCodeSent] = useState(false);
  const [sendingAccessCode, setSendingAccessCode] = useState(false);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    const result = await window.MentorAPI.getParentAnalytics({ parent_email: userData.email || 'demo_user' });
    if (result.success) {
      setAnalytics(result.data);
      setChildEmail(result.data?.analytics?.childEmail || userData.childEmail || '');
      setPreferences(result.data?.parent?.preferences?.notificationPreferences || DEFAULT_PARENT_NOTIFICATION_PREFERENCES);
    } else {
      setAnalytics(null);
    }
    setLoading(false);
  }, [userData.email, userData.childEmail]);

  useEffect(() => { loadAnalytics(); }, [loadAnalytics]);

  const connectChild = async () => {
    if (!childEmail.trim()) return;
    setLinking(true);
    const result = await window.MentorAPI.connectChildAccount({ parent_email: userData.email || 'demo_user', child_email: childEmail.trim() });
    setLinking(false);
    if (result.success) {
      setAnalytics(prev => prev ? { ...prev, analytics: { ...prev.analytics, linked: true, childEmail: childEmail.trim() } } : prev);
      await loadAnalytics();
      showToast?.('Contul de elev a fost conectat.', 'success');
    }
  };

  const savePreferences = async () => {
    setSavingPrefs(true);
    const result = await window.MentorAPI.updateParentPreferences({ parent_email: userData.email || 'demo_user', preferences });
    setSavingPrefs(false);
    if (result.success) {
      showToast?.('Preferințele de email au fost salvate.', 'success');
      await loadAnalytics();
    }
  };

  const riskLabel = value => (value === 'high' ? 'Ridicat' : value === 'medium' ? 'Mediu' : 'Scăzut');

  const requestTestForChild = async () => {
    const target = analytics?.analytics?.childEmail || '';
    if (!target) {
      showToast?.('Conectează întâi contul copilului.', 'warning');
      return;
    }
    setSendingTest(true);
    const result = await window.MentorAPI.requestTest({
      requester_email: userData.email || 'demo_user',
      requester_role: 'parent',
      student_email: target,
      subject: testForm.subject,
      note: testForm.note,
      due_date: testForm.dueDate
    });
    setSendingTest(false);
    if (result.success) {
      showToast?.('Testul a fost cerut copilului.', 'success');
      setTestForm(prev => ({ ...prev, note: '' }));
    } else {
      showToast?.('Nu am putut trimite cererea acum.', 'warning');
    }
  };

  // Trimite un cod de acces temporar prin SMS -- NICIODATĂ parola reală a
  // contului copilului. Un cod OTP care expiră rapid oferă același
  // rezultat practic (acces rapid, autorizat de copil/familie) fără
  // riscul de a stoca sau transmite o parolă în clar.
  const requestAccessCodeForChild = async () => {
    const target = analytics?.analytics?.childEmail || '';
    if (!target) {
      showToast?.('Conectează întâi contul copilului.', 'warning');
      return;
    }
    setSendingAccessCode(true);
    const result = await window.MentorAPI.requestAccessCode({
      parent_email: userData.email || 'demo_user',
      child_email: target
    });
    setSendingAccessCode(false);
    if (result.success && result.data?.ok) {
      setAccessCodeSent(true);
      showToast?.('Cod de acces trimis prin SMS.', 'success');
    } else {
      showToast?.('Nu am putut trimite codul acum.', 'warning');
    }
  };

  return (
    <div className="screen-page animate-fadeIn">
      <div className="px-5 pt-6 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Părinte</div>
      </div>

      <section className="mx-5 mt-6 surface rounded-3xl p-5 parent-hero-card">
        <div className="eyebrow">Cont de părinte</div>
        <h1 className="display-font parent-title">Analitică aprofundată pentru copil.</h1>
        <p className="parent-subtitle">Vezi timpul de focus, progresul, riscul de AFK, semnale de copiere și ultimele mesaje trimise către AI.</p>
        <div className="parent-connect-row">
          <input value={childEmail} onChange={e => setChildEmail(e.target.value)} placeholder="Email-ul elevului conectat" className="parent-connect-input" />
          <button type="button" className="accent-button" onClick={connectChild} disabled={linking || !childEmail.trim()}>{linking ? 'Conectez...' : 'Conectează elevul'}</button>
        </div>
      </section>

      <section className="mx-5 mt-5 parent-metrics-grid">
        <div className="surface parent-metric-card"><span>Focus total</span><strong>{analytics?.analytics?.totalFocusMinutes || 0} min</strong><small>sesiuni: {analytics?.analytics?.focusSessions || 0}</small></div>
        <div className="surface parent-metric-card"><span>Studiu</span><strong>{analytics?.analytics?.totalStudyMinutes || 0} min</strong><small>activități: {analytics?.analytics?.studySessions || 0}</small></div>
        <div className="surface parent-metric-card"><span>AFK</span><strong>{riskLabel(analytics?.analytics?.afkRisk || 'low')}</strong><small>{analytics?.analytics?.afkMinutes || 0} min de la ultima activitate</small></div>
        <div className="surface parent-metric-card"><span>Copiat</span><strong>{riskLabel(analytics?.analytics?.copiedRisk || 'low')}</strong><small>pe baza detectorului AI și a textelor analizate</small></div>
      </section>

      <section className="mx-5 mt-5 parent-analytics-grid">
        <div className="surface rounded-3xl p-5 parent-panel">
          <div className="eyebrow">Ultimele mesaje către AI</div>
          <h3 className="display-font">Ce i-a scris copilul AI-ului</h3>
          <div className="parent-message-list">
            {(analytics?.analytics?.mentorMessages || []).length === 0 ? <p className="profile-empty-note">Nu există mesaje încă.</p> : analytics.analytics.mentorMessages.map(item => <article key={item.id} className="parent-message-card"><strong>{item.note}</strong><small>{new Date(item.createdAt).toLocaleString('ro-RO')}</small></article>)}
          </div>
        </div>
        <div className="surface rounded-3xl p-5 parent-panel">
          <div className="eyebrow">Preferințe email</div>
          <h3 className="display-font">Numai aici setezi ce primești.</h3>
          <div className="parent-preferences-list">
            {[
              ['dailyDigest', 'Rezumat zilnic'],
              ['instantMessages', 'Mesaje instant'],
              ['weeklyReport', 'Raport săptămânal'],
              ['focusAlerts', 'Alerte focus / AFK']
            ].map(([key, label]) => (
              <label key={key} className="parent-toggle-row">
                <span>{label}</span>
                <input type="checkbox" checked={Boolean(preferences[key])} onChange={e => setPreferences(prev => ({ ...prev, [key]: e.target.checked }))} />
              </label>
            ))}
          </div>
          <button type="button" className="accent-button" onClick={savePreferences} disabled={savingPrefs}>{savingPrefs ? 'Salvez...' : 'Salvează preferințele'}</button>
        </div>
      </section>

      <section className="mx-5 mt-5 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Conectare și abonamente</div>
        <h3 className="display-font">Păstrezi controlul pentru contul de familie.</h3>
        <p className="parent-subtitle">Poți deschide abonamentele, poți conecta încă un elev și vezi clar ce urmează în contul familiei.</p>
        <div className="learning-actions">
          <button type="button" className="ghost-button result-action" onClick={() => onNavigate('subscriptions')}>Vezi abonamentele</button>
          <button type="button" className="ghost-button result-action" onClick={loadAnalytics}>Reîncarcă analitica</button>
        </div>
      </section>

      <section className="mx-5 mt-5 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Cere un test</div>
        <h3 className="display-font">Trimite o cerere de test copilului.</h3>
        <p className="parent-subtitle">Copilul primește o notificare și poate genera testul din secțiunea Învață.</p>
        <div className="teacher-test-form">
          <input value={testForm.subject} onChange={e => setTestForm(prev => ({ ...prev, subject: e.target.value }))} placeholder="Materie (ex: Matematică)" className="parent-connect-input" />
          <input type="date" value={testForm.dueDate} onChange={e => setTestForm(prev => ({ ...prev, dueDate: e.target.value }))} className="parent-connect-input" />
          <textarea value={testForm.note} onChange={e => setTestForm(prev => ({ ...prev, note: e.target.value }))} rows="2" placeholder="Mesaj pentru copil (opțional)" className="teacher-test-note" />
          <button type="button" className="accent-button" onClick={requestTestForChild} disabled={sendingTest || !analytics?.analytics?.childEmail}>{sendingTest ? 'Trimit...' : 'Trimite cererea'}</button>
        </div>
      </section>

      <section className="mx-5 mt-5 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Resurse pedagogice</div>
        <h3 className="display-font">Linkuri utile pentru a-ți susține copilul.</h3>
        <div className="teacher-links-list">
          <a href="https://www.manuale.edu.ro" target="_blank" rel="noreferrer" className="teacher-link-card">
            <strong>Manuale digitale (edu.ro)</strong>
            <span>Manualele oficiale, pe materie și clasă.</span>
            <i className="fas fa-arrow-up-right-from-square"></i>
          </a>
          <a href="https://ro.khanacademy.org" target="_blank" rel="noreferrer" className="teacher-link-card">
            <strong>Khan Academy România</strong>
            <span>Exerciții și explicații video, gratuite.</span>
            <i className="fas fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </section>

      <section className="mx-5 mt-5 mb-8 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Acces rapid</div>
        <h3 className="display-font">Cod de acces temporar prin SMS.</h3>
        <p className="parent-subtitle">Primești un cod cu 6 cifre, valabil 10 minute, pe telefonul tău. Nu este parola contului copilului — aceea rămâne doar a lui, din motive de siguranță.</p>
        <div className="learning-actions">
          <button type="button" className="accent-button" onClick={requestAccessCodeForChild} disabled={sendingAccessCode || !analytics?.analytics?.childEmail}>
            {sendingAccessCode ? 'Trimit...' : 'Trimite cod prin SMS'}
          </button>
        </div>
        {accessCodeSent && <small className="field-hint">Codul a fost trimis. Verifică SMS-ul de pe telefonul tău.</small>}
      </section>
    </div>
  );
};

const MONTH_NAMES_RO = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
const WEEKDAY_LABELS_RO = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'];

const CalendarScreen = ({ onBack }) => {
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [events, setEvents] = useState([]);
  const [connections, setConnections] = useState({ google: { connected: false }, notion: { connected: false } });
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [connecting, setConnecting] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // luni = 0

  const loadEvents = useCallback(async () => {
    setLoading(true);
    const result = await window.MentorAPI.getCalendarEvents({ month: month + 1, year });
    if (result.success) {
      setEvents(result.data.events || []);
      setConnections(result.data.connections || { google: { connected: false }, notion: { connected: false } });
      setOffline(false);
    } else {
      setEvents([]);
      setOffline(true);
    }
    setLoading(false);
  }, [month, year]);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  const eventsByDay = {};
  events.forEach(ev => {
    const day = Number(ev.date.slice(8, 10));
    if (!eventsByDay[day]) eventsByDay[day] = [];
    eventsByDay[day].push(ev);
  });

  const changeMonth = delta => {
    setCursor(prev => { const d = new Date(prev); d.setMonth(d.getMonth() + delta); return d; });
    setSelectedDay(null);
  };

  const connect = async provider => {
    setConnecting(provider);
    const result = await window.MentorAPI.connectCalendarProvider(provider);
    if (result.success) {
      setConnections(prev => ({ ...prev, [provider]: result.data.connection }));
      await loadEvents();
    }
    setConnecting('');
  };

  const disconnect = async provider => {
    await window.MentorAPI.disconnectCalendarProvider(provider);
    await loadEvents();
  };

  const addEvent = async () => {
    if (!selectedDay || !newTitle.trim()) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const result = await window.MentorAPI.addCalendarEvent({ date: dateStr, title: newTitle.trim(), type: 'custom' });
    if (result.success) {
      setEvents(prev => [...prev, result.data.event]);
      setNewTitle('');
    }
  };

  const removeEvent = async id => {
    await window.MentorAPI.deleteCalendarEvent(id);
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const todayKey = new Date();
  const isToday = day => todayKey.getFullYear() === year && todayKey.getMonth() === month && todayKey.getDate() === day;

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="screen-page animate-fadeIn">
      <div className="px-5 pt-6 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Calendar</div>
      </div>

      <div className="mx-5 mt-6 grid gap-4">
        <section className="surface calendar-connect-card">
          <div className="calendar-connect-head">
            <div className="eyebrow">Sincronizare</div>
            <h2 className="display-font">Conectează-ți calendarul</h2>
            <p className="form-subtitle" style={{ margin: '6px 0 0' }}>Leagă Google Calendar sau Notion Calendar și evenimentele se adaugă automat aici.</p>
          </div>
          <div className="calendar-connect-row">
            <div className={`calendar-provider ${connections.google?.connected ? 'connected' : ''}`}>
              <div className="calendar-provider-copy"><i className="fab fa-google"></i><span>Google Calendar</span></div>
              {connections.google?.connected ? (
                <button type="button" className="ghost-button" onClick={() => disconnect('google')}>Deconectează</button>
              ) : (
                <button type="button" className="accent-button" onClick={() => connect('google')} disabled={connecting === 'google'}>
                  {connecting === 'google' ? <i className="fas fa-spinner fa-spin" /> : 'Conectează'}
                </button>
              )}
            </div>
            <div className={`calendar-provider ${connections.notion?.connected ? 'connected' : ''}`}>
              <div className="calendar-provider-copy"><i className="fas fa-book-bookmark"></i><span>Notion Calendar</span></div>
              {connections.notion?.connected ? (
                <button type="button" className="ghost-button" onClick={() => disconnect('notion')}>Deconectează</button>
              ) : (
                <button type="button" className="accent-button" onClick={() => connect('notion')} disabled={connecting === 'notion'}>
                  {connecting === 'notion' ? <i className="fas fa-spinner fa-spin" /> : 'Conectează'}
                </button>
              )}
            </div>
          </div>
          {(connections.google?.mocked || connections.notion?.mocked) && (
            <p className="calendar-mock-note"><i className="fas fa-circle-info" /> Conectare mock — activă doar demonstrativ. Adaugă credențiale OAuth reale în backend pentru sincronizare live.</p>
          )}
        </section>

        <section className="surface calendar-card" aria-busy={loading}>
          <div className="calendar-card-head">
            <button type="button" className="ghost-button calendar-nav-btn" onClick={() => changeMonth(-1)}><i className="fas fa-chevron-left" /></button>
            <h2 className="display-font">{MONTH_NAMES_RO[month]} {year}</h2>
            <button type="button" className="ghost-button calendar-nav-btn" onClick={() => changeMonth(1)}><i className="fas fa-chevron-right" /></button>
          </div>

          {offline && <div className="subscription-warning">Nu s-a putut contacta backend-ul de calendar. Se afișează o grilă goală, locală.</div>}

          <div className="calendar-weekdays">
            {WEEKDAY_LABELS_RO.map(w => <span key={w}>{w}</span>)}
          </div>

          <div className="calendar-grid">
            {cells.map((day, i) => {
              if (day === null) return <div key={`pad-${i}`} className="calendar-cell calendar-cell-empty" />;
              const dayEvents = eventsByDay[day] || [];
              return (
                <button
                  key={day}
                  type="button"
                  className={`calendar-cell ${isToday(day) ? 'is-today' : ''} ${selectedDay === day ? 'is-selected' : ''} ${dayEvents.length ? 'has-events' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  <span className="calendar-cell-num">{day}</span>
                  {dayEvents.length > 0 && <span className="calendar-cell-dots">{dayEvents.slice(0, 3).map(e => <i key={e.id} className={`calendar-dot source-${e.source}`} />)}</span>}
                </button>
              );
            })}
          </div>
        </section>

        {selectedDay && (
          <section className="surface calendar-day-panel animate-fadeIn">
            <div className="calendar-day-panel-head">
              <h3 className="display-font">{selectedDay} {MONTH_NAMES_RO[month]}</h3>
              <button type="button" className="ghost-button" onClick={() => setSelectedDay(null)}><i className="fas fa-xmark" /></button>
            </div>
            <div className="calendar-day-events">
              {(eventsByDay[selectedDay] || []).length === 0 && <p className="calendar-empty-hint">Nicio activitate. Adaugă una mai jos.</p>}
              {(eventsByDay[selectedDay] || []).map(ev => (
                <div key={ev.id} className="calendar-event-row">
                  <span className={`calendar-dot source-${ev.source}`} />
                  <span className="calendar-event-title">{ev.title}</span>
                  {ev.source === 'manual' && <button type="button" className="calendar-event-remove" onClick={() => removeEvent(ev.id)}><i className="fas fa-trash" /></button>}
                </div>
              ))}
            </div>
            <div className="calendar-add-row">
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Ex: Test la fizică" onKeyDown={e => { if (e.key === 'Enter') addEvent(); }} />
              <button type="button" className="accent-button" onClick={addEvent} disabled={!newTitle.trim()}><i className="fas fa-plus" /></button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [screen, setScreen] = useState('splash');
  const [navScreen, setNavScreen] = useState('home');
  const [toast, setToast] = useState(null);
  const [authRole, setAuthRole] = useState('student');
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

  const routeByRole = role => {
    if (role === 'parent') return 'parent';
    if (role === 'teacher') return 'teacher';
    return 'home';
  };

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

  const handleSplashFinish = async () => {
    // Sursa de adevăr este sesiunea din backend, nu flagul din localStorage,
    // pe care oricine îl putea seta din consola browserului.
    const session = await MentorAPI.me();
    if (!session.success) {
      setUserData(prev => ({ ...prev, isLoggedIn: false }));
      setScreen('auth');
      return;
    }

    const role = session.user.role || 'student';
    setUserData(prev => ({ ...prev, isLoggedIn: true, role, email: session.user.email }));

    if (role === 'student' && !userData.hasCompletedOnboarding) {
      setOnboardingStep(1);
      setScreen('onboarding');
      return;
    }

    const nextScreen = routeByRole(role);
    setScreen(nextScreen);
    setNavScreen(nextScreen);
  };

  const handleLogin = async credentials => {
    const result = await MentorAPI.login(credentials);
    if (!result.success) {
      // LoginScreen afișează mesajul lângă formular.
      return { success: false, error: result.error };
    }

    const user = result.data.user || {};
    const role = user.role || 'student';
    setUserData(prev => ({
      ...prev,
      isLoggedIn: true,
      email: user.email || '',
      role,
      name: prev.name || (user.name || '').split(' ')[0] || ''
    }));

    const nextScreen = routeByRole(role);
    setScreen(nextScreen);
    setNavScreen(nextScreen);

    // Contul vine acum din sesiune, deci nu mai trimitem user_id.
    MentorAPI.claimReward({ type: 'login_bonus' }).then(rewardResult => {
      if (rewardResult.success) {
        handleEconomyUpdate(rewardResult.data.balance, {}, null, { firstLoginRewardClaimed: true });
      }
    });
    showToast('Bun venit!', 'success');
    return { success: true };
  };

  const handleLogout = async () => {
    await MentorAPI.logout();
    setUserData(prev => ({ ...prev, isLoggedIn: false, email: '', planId: 'free', coins: 0 }));
    setScreen('auth');
    setNavScreen('home');
    showToast('Te-ai deconectat.', 'success');
  };

  const handleForgotPassword = async email => {
    const result = await MentorAPI.forgotPassword({ email });
    // Răspunsul e identic și dacă adresa nu are cont, ca să nu confirmăm
    // cine este înregistrat.
    showToast(result.data?.message || 'Dacă adresa are un cont, vei primi instrucțiuni.', 'success');
  };

  const handleRegister = async formData => {
    const registration = await MentorAPI.register({
      email: formData.email,
      password: formData.password,
      role: formData.role || 'student',
      invite_code: formData.inviteCode || '',
      name: formData.name,
      username: formData.username,
      phone: formData.phone,
      school: formData.school,
      class: formData.class,
      subject: formData.subject,
      parentEmail: formData.role === 'student' ? (formData.parentEmail || '') : '',
      teacherEmail: formData.teacherEmail || ''
    });

    if (!registration.success) {
      showToast(registration.error || 'Nu am putut crea contul.', 'warning');
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
      class: formData.class || '',
      subject: formData.subject || '',
      role: formData.role || 'student',
      parentEmail: formData.role === 'student' ? (formData.parentEmail || '') : '',
      childEmail: formData.role === 'parent' ? (formData.parentEmail || '') : '',
      teacherEmail: formData.teacherEmail || '',
      isLoggedIn: true
    }));
    if (formData.role === 'parent') {
      setUserData(prev => ({ ...prev, hasCompletedOnboarding: true, role: 'parent', childEmail: formData.parentEmail || '' }));
      setScreen('parent');
      setNavScreen('parent');
      return { success: true };
    }
    if (formData.role === 'teacher') {
      setUserData(prev => ({ ...prev, hasCompletedOnboarding: true, role: 'teacher' }));
      setScreen('teacher');
      setNavScreen('teacher');
      return { success: true };
    }
    setOnboardingStep(1);
    setScreen('onboarding');
    return { success: true };
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
      showToast('Nu am putut activa planul acum. Încearcă din nou.', 'warning');
      return { success: false };
    }
    const status = result.data?.subscription?.status || 'active';
    setUserData(prev => ({
      ...prev,
      planId: result.data?.subscription?.planId || planId,
      planStatus: status
    }));
    if (status === 'pending_parent_review') {
      showToast(`Planul ${planId} așteaptă aprobarea părintelui.`, 'warning');
    } else {
      showToast(planId === 'free' ? 'Ai trecut pe planul Free.' : `Planul ${planId} este activ.`, 'success');
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
        return <AuthScreen onLogin={() => setScreen('login')} onRegisterRole={role => { setAuthRole(role); setScreen('register'); }} />;
      case 'login':
        return <LoginScreen onBack={() => setScreen('auth')} onLogin={handleLogin} onForgotPassword={handleForgotPassword} />;
      case 'register':
        return <RegisterScreen onBack={() => setScreen('auth')} onContinue={handleRegister} onValidationError={message => showToast(message, 'warning')} initialRole={authRole} />;
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
      case 'teacher':
        return <window.TeacherDashboard userData={userData} onNavigate={handleNavigate} showToast={showToast} />;
      case 'parent':
        return <ParentDashboardScreen userData={userData} onBack={() => handleNavigate('parent')} onNavigate={handleNavigate} showToast={showToast} />;
      case 'learn':
        return <LearnScreen userData={userData} onRewardClaim={data => handleEconomyUpdate(data?.balance, data?.equipped || {}, data?.role)} />;
      case 'shop':
        return <ShopScreen userData={userData} onBack={() => handleNavigate('home')} onCoinsChange={handleEconomyUpdate} onAppearanceChange={handleAppearanceChange} onRewardToast={showToast} />;
      case 'calendar':
        return <CalendarScreen onBack={() => handleNavigate('home')} />;
      case 'subscriptions':
        return <SubscriptionsScreen userData={userData} onBack={() => handleNavigate('home')} currentPlanId={userData.planId || 'free'} currentPlanStatus={userData.planStatus} onSelectPlan={handleSelectPlan} onToast={showToast} />;
      case 'profile':
        return <ProfileScreen userData={userData} onBack={() => handleNavigate('home')} onLogout={handleLogout} />;
      default:
        return <HomeScreen userData={userData} onNavigate={handleNavigate} />;
    }
  };

  const showNav = ['home', 'parent', 'teacher', 'professor', 'learn', 'shop', 'calendar', 'subscriptions', 'profile'].includes(screen);

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
      {showNav && <BottomNav active={navScreen} onNavigate={handleNavigate} role={userData.role || 'student'} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
