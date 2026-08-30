import { useState, useEffect } from 'react';
import { MentorAPI } from '../apiClient.js';
import BorderGlow from '../components/BorderGlow.jsx';

const SubscriptionSkeleton = () => (
  <div className="surface skeleton-card" aria-hidden="true">
    <div className="skeleton skeleton-line medium"></div>
    <div className="skeleton skeleton-line short"></div>
    <div className="skeleton skeleton-line long"></div>
    <div className="skeleton skeleton-line long"></div>
  </div>
);

const resolveClientPlan = id => {
  const value = String(id || 'free').toLowerCase();
  if (['mentor', 'pro', 'premium', 'elite', 'unlimited'].includes(value)) return 'mentor';
  return 'free';
};

const SubscriptionsScreen = ({ userData, onBack, currentPlanId, currentPlanStatus, onSelectPlan, onToast }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(resolveClientPlan(currentPlanId));
  const [pendingPlanId, setPendingPlanId] = useState(null);
  const [checkingOutPlanId, setCheckingOutPlanId] = useState(null);
  const [parentEmail, setParentEmail] = useState(userData?.parentEmail || '');
  const [parentMessage, setParentMessage] = useState('Vreau planul Mentor, 50 lei pe lună, nelimitat.');
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
    const planId = resolveClientPlan(currentPlanId);
    setSelectedPlanId(planId);
    setPendingPlanId(currentPlanStatus === 'pending_parent_review' ? planId : null);
  }, [currentPlanId, currentPlanStatus]);

  const paid = subscriptions.find(plan => plan.id === 'mentor') || subscriptions.find(plan => Number(plan.priceMonthly) > 0);
  const free = subscriptions.find(plan => plan.id === 'free');

  const selectPlan = async planId => {
    if (planId === selectedPlanId && !pendingPlanId) return;
    if (!onSelectPlan) return;
    setCheckingOutPlanId(planId);
    const result = await onSelectPlan(planId, 'monthly');
    setCheckingOutPlanId(null);
    if (result?.success) {
      setSelectedPlanId(resolveClientPlan(planId));
      setPendingPlanId(result.status === 'pending_parent_review' ? resolveClientPlan(planId) : null);
    }
  };

  const sendParentReview = async () => {
    if (!parentEmail.trim()) return;
    setSendingReview(true);
    const result = await MentorAPI.sendParentReview({
      parent_email: parentEmail,
      plan_id: 'mentor',
      billing_cycle: 'monthly',
      role: 'student',
      message: parentMessage
    });
    setSendingReview(false);
    if (result.success) {
      onToast?.('Rezumatul a fost trimis către părinte.', 'success');
    } else {
      onToast?.('Nu am putut trimite mesajul acum. Încearcă din nou.', 'warning');
    }
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

  return (
    <div className="screen-page animate-fadeIn" aria-busy={loading}>
      <div className="subscription-topbar">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Abonament</div>
      </div>

      <div className="subscription-shell">
        {loading ? (
          <div className="grid gap-4" aria-label="Se încarcă abonamentul">
            <SubscriptionSkeleton />
          </div>
        ) : (
          <>
            {fallback && <div className="subscription-warning">Datele de abonament sunt din fallback local, backend-ul nu a răspuns.</div>}

            <section className="subscription-hero surface">
              <div className="subscription-hero-copy">
                <div className="eyebrow">Un singur plan</div>
                <h1 className="display-font subscription-title">Mentor, 50 lei pe lună. Nelimitat.</h1>
                <p className="subscription-subtitle">Nu mai există Pro, Premium sau Elite. Plătești 50 de lei și ai tot: mentor, lecții 5–8, foto-temă, flashcarduri, digest către părinte.</p>
                <div className="subscription-current-plan">
                  <span>Planul tău acum</span>
                  <strong>{selectedPlanId === 'mentor' ? 'Mentor (nelimitat)' : 'Gratuit (de încercare)'}</strong>
                </div>
              </div>
            </section>

            {paid && (
              <section className="subscription-grid subscription-grid-single">
                <div className={`subscription-card-shell featured-plan ${selectedPlanId === 'mentor' ? 'current-plan' : ''}`}>
                  <div className="subscription-ribbon">Nelimitat</div>
                  <BorderGlow
                    className="subscription-card"
                    edgeSensitivity={34}
                    glowColor="300 90 72"
                    backgroundColor="#17172E"
                    borderRadius={24}
                    glowRadius={48}
                    glowIntensity={1.15}
                    coneSpread={30}
                    animated={true}
                    colors={['#f472b6', '#c084fc', '#38bdf8']}
                    fillOpacity={0.5}
                  >
                    <div className="subscription-card-inner">
                      <div className="subscription-card-head">
                        <div>
                          <div className="subscription-pill">{paid.name}</div>
                          <div className="subscription-price">50 lei / lună</div>
                        </div>
                        <i className="fas fa-infinity subscription-icon"></i>
                      </div>
                      <p className="subscription-description">{paid.tagline || paid.description}</p>
                      <ul className="subscription-features">
                        {(paid.features || []).map(renderFeature)}
                      </ul>
                      {selectedPlanId === 'mentor' && pendingPlanId === 'mentor' && (
                        <div className="subscription-pending-badge"><i className="fas fa-clock" /> Așteaptă aprobarea părintelui</div>
                      )}
                      <button
                        type="button"
                        className="subscription-button is-featured"
                        onClick={() => selectPlan('mentor')}
                        disabled={(selectedPlanId === 'mentor' && pendingPlanId !== 'mentor') || checkingOutPlanId === 'mentor'}
                      >
                        {checkingOutPlanId === 'mentor'
                          ? 'Se activează...'
                          : selectedPlanId === 'mentor'
                            ? (pendingPlanId === 'mentor' ? 'În așteptare' : 'Plan activ')
                            : 'Activează Mentor — 50 lei'}
                      </button>
                    </div>
                  </BorderGlow>
                </div>
              </section>
            )}

            {free && selectedPlanId !== 'mentor' && (
              <section className="surface subscription-free-note">
                <div className="eyebrow">Contul gratuit</div>
                <p>Poți încerca lecțiile și mentorul fără plată. Când vrei totul fără plafon, treci pe Mentor.</p>
                <button type="button" className="ghost-button" onClick={() => selectPlan('free')} disabled={selectedPlanId === 'free'}>
                  {selectedPlanId === 'free' ? 'Ești pe gratuit' : 'Rămâi pe gratuit'}
                </button>
              </section>
            )}

            <section className="subscription-parent-review surface">
              <div>
                <div className="eyebrow">Părinte</div>
                <h2 className="display-font">Trimite prețul înainte să plătești.</h2>
                <p>Părintele nu are cont. Primește pe email că vrei planul Mentor, 50 lei / lună, nelimitat.</p>
              </div>
              <div className="subscription-parent-review-form">
                <input value={parentEmail} onChange={e => setParentEmail(e.target.value)} placeholder="Email părinte" />
                <textarea value={parentMessage} onChange={e => setParentMessage(e.target.value)} rows="3" placeholder="Mesaj pentru părinte" />
                <button type="button" className="accent-button" onClick={sendParentReview} disabled={sendingReview || !parentEmail.trim()}>{sendingReview ? 'Trimit...' : 'Trimite către părinte'}</button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsScreen;
