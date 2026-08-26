import { useState, useEffect } from 'react';
import { MentorAPI } from '../apiClient.js';
import BorderGlow from '../components/BorderGlow.jsx';

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
                  <BorderGlow
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
                  </BorderGlow>
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
                  <span>Planuri scurte, profesionale și utile pentru fiecare zi, nu pentru «mai târziu».</span>
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

export default SubscriptionsScreen;
