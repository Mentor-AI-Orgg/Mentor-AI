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

const INCLUDED = [
  'Mentor AI la română și matematică, clasele 5–8',
  'Întrebări nelimitate către mentor',
  'Capitole, flashcarduri și sesiuni de focus',
  'Magazin cosmetic cu monede din învățare',
  'Email către părinte la activitatea copilului'
];

const SubscriptionsScreen = ({ onBack }) => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await MentorAPI.getSubscriptions();
      const next = (result.data || []).find(entry => entry.id === 'free') || result.data?.[0] || null;
      setPlan(next);
      setLoading(false);
    };
    load();
  }, []);

  const features = plan?.features?.length
    ? plan.features.map(feature => (typeof feature === 'string' ? feature : feature.label)).filter(Boolean)
    : INCLUDED;

  return (
    <div className="screen-page animate-fadeIn" aria-busy={loading}>
      <div className="subscription-topbar">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition" type="button">
          <i className="fas fa-arrow-left mr-2"></i>Înapoi
        </button>
        <div className="text-sm text-slate-400">Acces</div>
      </div>

      <div className="subscription-shell">
        {loading ? (
          <div className="grid gap-4" aria-label="Se încarcă accesul">
            <SubscriptionSkeleton />
          </div>
        ) : (
          <>
            <section className="subscription-hero surface">
              <div className="subscription-hero-copy">
                <div className="eyebrow">Fără abonament</div>
                <h1 className="display-font subscription-title">Aplicația este gratuită.</h1>
                <p className="subscription-subtitle">
                  Nu există plan de 50 de lei, nici Pro, Premium sau Elite. Tot mentorul — lecții, chat, flashcarduri, magazin cosmetic — e inclus, fără card.
                </p>
                <div className="subscription-hero-badges">
                  <span><i className="fas fa-unlock"></i> Acces complet</span>
                  <span><i className="fas fa-coins"></i> Monede doar în magazin</span>
                  <span><i className="fas fa-envelope"></i> Părintele primește email</span>
                </div>
                <div className="subscription-current-plan">
                  <span>Planul tău</span>
                  <strong>Gratuit</strong>
                </div>
              </div>
              <div className="subscription-hero-panel">
                <div className="subscription-hero-balance">
                  <small>Preț</small>
                  <strong>0 lei / lună</strong>
                </div>
                <div className="subscription-hero-stats">
                  <div>
                    <span>Clase</span>
                    <strong>5–8, română și mate</strong>
                  </div>
                  <div>
                    <span>Plată</span>
                    <strong>Niciuna</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="subscription-grid subscription-grid-free">
              <div className="subscription-card-shell current-plan featured-plan">
                <div className="subscription-ribbon">Inclus</div>
                <BorderGlow
                  className="subscription-card"
                  edgeSensitivity={34}
                  glowColor="240 70 70"
                  backgroundColor="#17172E"
                  borderRadius={24}
                  glowRadius={48}
                  glowIntensity={1.15}
                  coneSpread={30}
                  animated={true}
                  colors={['#38bdf8', '#60a5fa', '#8b5cf6']}
                  fillOpacity={0.5}
                >
                  <div className="subscription-card-inner">
                    <div className="subscription-card-head">
                      <div>
                        <div className="subscription-pill">{plan?.name || 'Gratuit'}</div>
                        <div className="subscription-price">Gratis</div>
                      </div>
                      <i className="fas fa-heart subscription-icon"></i>
                    </div>
                    <p className="subscription-description">{plan?.tagline || plan?.description || 'Mentorul de gimnaziu, fără abonament.'}</p>
                    <ul className="subscription-features">
                      {features.map(label => (
                        <li key={label}>
                          <i className="fas fa-check-circle"></i>
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="subscription-button" disabled>
                      Deja activ
                    </button>
                  </div>
                </BorderGlow>
              </div>
            </section>

            <section className="subscription-compare surface">
              <div className="subscription-compare-copy">
                <div className="eyebrow">Ce înseamnă gratuit</div>
                <h2 className="display-font">Înveți, nu plătești.</h2>
                <p>
                  Monedele din magazin nu sunt bani reali. Servesc doar la avataruri și teme. Părintele nu trebuie să aprobe niciun plan — primește emailuri despre ce faci tu în aplicație.
                </p>
              </div>
              <div className="subscription-compare-list">
                <div>
                  <strong>Mentor fără limită de întrebări</strong>
                  <span>Același lanț de răspuns pentru toți elevii. Nu se deblochează un „consiliu AI” cu bani.</span>
                </div>
                <div>
                  <strong>Lecții pe capitole</strong>
                  <span>Română și matematică, clasele 5–8, explicate cu cuvintele mentorului.</span>
                </div>
                <div>
                  <strong>Magazin de joacă</strong>
                  <span>Câștigi monede din învățare și le cheltui pe aspect, nu pe acces.</span>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsScreen;
