import { useEffect, useMemo, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const CATEGORY_META = {
  daily: { label: 'Daily Free', icon: 'fa-gift' },
  avatar: { label: 'Avatar', icon: 'fa-user-astronaut' },
  background: { label: 'Fundal', icon: 'fa-panorama' },
  voice: { label: 'Voce AI', icon: 'fa-volume-high' },
  boost: { label: 'Boost', icon: 'fa-bolt' }
};

const formatCoins = value => Number(value || 0).toLocaleString('ro-RO');

const ShopRewardCard = ({ reward, loading, onClaim, claimState }) => {
  const [flashcardCount, setFlashcardCount] = useState(5);
  const [studyHours, setStudyHours] = useState(1);
  const [referrals, setReferrals] = useState(3);
  const [topic, setTopic] = useState('');

  const claimButton = () => {
    if (reward.action === 'flashcards_5') {
      return (
        <div className="shop-inline-form">
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Subiectul lecției (opțional)" />
          <input type="number" min="5" max="100" value={flashcardCount} onChange={e => setFlashcardCount(Number(e.target.value) || 0)} />
          <button type="button" className="accent-button" disabled={loading || claimState.claimed || flashcardCount < 5} onClick={() => onClaim('flashcards_5', { correct_count: flashcardCount, topic })}>
            {claimState.claimed ? 'Claim-uit' : 'Claim reward'}
          </button>
        </div>
      );
    }
    if (reward.action === 'study_1h') {
      return (
        <div className="shop-inline-form">
          <input type="number" min="1" step="0.25" value={studyHours} onChange={e => setStudyHours(Number(e.target.value) || 0)} />
          <button type="button" className="accent-button" disabled={loading || claimState.claimed || studyHours < 1} onClick={() => onClaim('study_1h', { hours: studyHours })}>
            {claimState.claimed ? 'Claim-uit' : 'Claim reward'}
          </button>
        </div>
      );
    }
    if (reward.action === 'referral_3') {
      return (
        <div className="shop-inline-form">
          <input type="number" min="3" value={referrals} onChange={e => setReferrals(Number(e.target.value) || 0)} />
          <button type="button" className="accent-button" disabled={loading || claimState.claimed || referrals < 3} onClick={() => onClaim('referral_3', { referrals })}>
            {claimState.claimed ? 'Claim-uit' : 'Claim reward'}
          </button>
        </div>
      );
    }
    if (reward.action === 'jackpot_monthly') {
      return (
        <button type="button" className="accent-button" disabled={loading || claimState.claimed || !reward.eligible} onClick={() => onClaim('jackpot_monthly', {})}>
          {claimState.claimed ? 'Claim-uit' : reward.eligible ? 'Ia jackpotul' : 'Nu e ziua jackpotului'}
        </button>
      );
    }
    return (
      <button type="button" className="accent-button" disabled={loading || claimState.claimed} onClick={() => onClaim(reward.action, {})}>
        {claimState.claimed ? 'Claim-uit' : 'Claim reward'}
      </button>
    );
  };

  return (
    <div className={`shop-reward-card surface ${claimState.claimed ? 'is-claimed' : ''}`}>
      <div className="shop-reward-head">
        <div>
          <div className="eyebrow">{claimState.label}</div>
          <h3 className="display-font">{reward.title}</h3>
        </div>
        <div className="shop-reward-coins"><i className="fas fa-coins" /> {formatCoins(reward.coins)}</div>
      </div>
      <p>{reward.subtitle}</p>
      {reward.action === 'test_completed' && (
        <div className="shop-inline-form">
          <button type="button" className="ghost-button" disabled={loading || claimState.claimed} onClick={() => onClaim('test_completed', {})}>Am dat testul</button>
          <button type="button" className="accent-button" disabled={loading || claimState.claimed} onClick={() => onClaim('test_perfect', {})}>Am luat 10</button>
        </div>
      )}
      {reward.action !== 'test_completed' && claimButton()}
      {claimState.message && <small className="shop-reward-message">{claimState.message}</small>}
    </div>
  );
};

const ShopItemCard = ({ item, owned, equipped, onBuy, buying }) => {
  const isEquipped = equipped === item.id;
  return (
    <div className={`shop-item-card surface ${owned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}`}>
      <div className="shop-item-head">
        <div className="shop-item-badge">{item.rarity}</div>
        <div className="shop-item-price"><i className="fas fa-coins" /> {formatCoins(item.price)}</div>
      </div>
      <div className="shop-item-visual">
        <div className="shop-item-emoji">{item.emoji || (item.category === 'avatar' ? '🧑‍🚀' : item.category === 'background' ? '🎨' : item.category === 'voice' ? '🎙️' : '🎁')}</div>
      </div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <div className="shop-item-footer">
        <span>{CATEGORY_META[item.category]?.label || item.category}</span>
        <button type="button" className="accent-button" disabled={owned || buying} onClick={() => onBuy(item.id)}>
          {owned ? (isEquipped ? 'Echipat' : 'Cumpărat') : buying ? '...' : 'Cumpără'}
        </button>
      </div>
    </div>
  );
};

const ShopScreen = ({ userData, onBack, onCoinsChange, onAppearanceChange, onRewardToast }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [catalog, setCatalog] = useState(null);
  const [category, setCategory] = useState('daily');
  const [claiming, setClaiming] = useState(false);
  const [buyingId, setBuyingId] = useState('');
  const [parentEmail, setParentEmail] = useState(userData.parentEmail || '');
  const [parentMessage, setParentMessage] = useState('');
  const [parentSending, setParentSending] = useState(false);

  const load = async () => {
    setRefreshing(true);
    const [summaryResult, catalogResult] = await Promise.all([
      MentorAPI.getEconomySummary({
        user_id: userData.email || 'demo_user',
        role: userData.role || 'student',
        parent_email: userData.parentEmail || '',
        teacher_email: userData.teacherEmail || '',
        streak: userData.streak || 0,
        hours_today: userData.totalHours || 0,
        coins: userData.coins || 0,
        class_name: userData.class || '',
        profile_name: userData.name || ''
      }),
      MentorAPI.getShopCatalog()
    ]);
    if (summaryResult.success) {
      setSummary(summaryResult.data.summary);
      if (typeof onCoinsChange === 'function' && summaryResult.data.summary) {
        onCoinsChange(summaryResult.data.summary.balance, summaryResult.data.summary.equipped, summaryResult.data.summary.role);
      }
    }
    if (catalogResult.success) {
      setCatalog(catalogResult.data);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { load(); }, [userData.email]);

  useEffect(() => {
    if (userData.parentEmail) setParentEmail(userData.parentEmail);
  }, [userData.parentEmail]);

  const ownedItems = new Set(summary?.inventory || []);
  const claimedRewards = summary?.dailyClaims || [];
  const rewardsById = useMemo(() => Object.fromEntries((claimedRewards || []).map(reward => [reward.id, reward])), [claimedRewards]);
  const selectedCategory = category === 'daily' ? 'daily-rewards' : category;
  const items = useMemo(() => {
    if (!catalog) return [];
    if (selectedCategory === 'daily-rewards') return [];
    return (catalog.items || []).filter(item => item.category === selectedCategory);
  }, [catalog, selectedCategory]);

  const handleClaim = async (type, payload) => {
    setClaiming(true);
    const result = await MentorAPI.claimReward({ user_id: userData.email || 'demo_user', type, ...payload });
    setClaiming(false);
    if (result.success) {
      if (typeof onCoinsChange === 'function') {
        onCoinsChange(result.data.balance, summary?.equipped || {}, summary?.role || userData.role || 'student');
      }
      await load();
      if (onRewardToast) onRewardToast(`Ai primit ${result.data.earned} monede.`);
      return;
    }
    if (onRewardToast) onRewardToast('Recompensa nu poate fi claim-uită acum.', 'warning');
  };

  const handleBuy = async itemId => {
    setBuyingId(itemId);
    const result = await MentorAPI.buyShopItem({ user_id: userData.email || 'demo_user', item_id: itemId });
    setBuyingId('');
    if (result.success) {
      if (typeof onCoinsChange === 'function') {
        onCoinsChange(result.data.balance, result.data.equipped || {}, summary?.role || userData.role || 'student');
      }
      if (typeof onAppearanceChange === 'function') {
        onAppearanceChange(result.data.equipped || {}, result.data.inventory || []);
      }
      await load();
      if (onRewardToast) onRewardToast('Obiect cumpărat cu succes.');
      return;
    }
    if (onRewardToast) onRewardToast('Nu ai destule monede pentru obiectul ales.', 'warning');
  };

  const sendParentReview = async () => {
    setParentSending(true);
    const result = await MentorAPI.sendParentReview({
      user_id: userData.email || 'demo_user',
      parent_email: parentEmail,
      plan_id: userData.planId || 'free',
      billing_cycle: 'monthly',
      role: userData.role || 'student',
      message: parentMessage
    });
    setParentSending(false);
    if (result.success) {
      if (onRewardToast) onRewardToast('Recapitularea prețurilor a fost trimisă părintelui.');
      return;
    }
    if (onRewardToast) onRewardToast('Nu am putut trimite recenzia către părinte.', 'warning');
  };

  const jackpotReward = rewardsById['jackpot-monthly'];

  return (
    <main className="screen-page shop-page animate-fadeIn">
      <div className="shop-topbar">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Shop</div>
      </div>

      <section className="surface shop-hero">
        <div>
          <div className="eyebrow">Magazinul tău</div>
          <h1 className="display-font shop-title">Câștigă, economisește și personalizează aplicația.</h1>
          <p className="shop-subtitle">Daily free, bonusuri pentru învățare și obiecte cosmetice pe care le poți cumpăra cu monede. Elite Family Pack începe de la 5000 de monede.</p>
        </div>
        <div className="shop-balance-card">
          <span>Monede disponibile</span>
          <strong>{formatCoins(summary?.balance ?? userData.coins ?? 0)}</strong>
          <small>{summary?.role === 'student' ? 'cont elev' : summary?.role === 'parent' ? 'cont părinte' : 'cont profesor'}</small>
        </div>
      </section>

      <section className="shop-section surface">
        <div className="shop-section-head">
          <div>
            <div className="eyebrow">Daily Free</div>
            <h2 className="display-font">Recompensele care te țin conectat.</h2>
          </div>
          <span className="shop-chip"><i className="fas fa-gift" /> Jackpot lunar: {jackpotReward?.subtitle || 'verifică ziua random'}</span>
        </div>
        <div className="shop-rewards-grid">
          {(summary?.dailyClaims || []).map(reward => (
            <ShopRewardCard
              key={reward.id}
              reward={reward}
              loading={claiming}
              claimState={{
                claimed: reward.claimed,
                label: reward.action === 'login_bonus' ? 'Daily Free' : reward.action === 'streak_bonus' ? 'Streak' : reward.action === 'test_completed' ? 'Test' : reward.action === 'test_perfect' ? 'Perfect' : reward.action === 'flashcards_5' ? 'Flashcards' : reward.action === 'study_1h' ? 'Focus' : reward.action === 'referral_3' ? 'Referral' : 'Jackpot',
                message: reward.eligible === false && reward.action === 'jackpot_monthly' ? 'Nu e ziua jackpotului luna asta.' : ''
              }}
              onClaim={handleClaim}
            />
          ))}
        </div>
      </section>

      <section className="shop-section surface">
        <div className="shop-section-head">
          <div>
            <div className="eyebrow">Catalog</div>
            <h2 className="display-font">Avatar, fundal, voce AI și boost-uri.</h2>
          </div>
          <button type="button" className="ghost-button" onClick={load} disabled={refreshing}>{refreshing ? 'Se actualizează...' : 'Actualizează'}</button>
        </div>
        <div className="shop-tabs">
          {['daily', 'avatar', 'background', 'voice', 'boost'].map(key => (
            <button key={key} type="button" className={`shop-tab ${category === key ? 'active' : ''}`} onClick={() => setCategory(key)}>
              {CATEGORY_META[key].label}
            </button>
          ))}
        </div>

        <div className="shop-grid">
          {items.map(item => (
            <ShopItemCard
              key={item.id}
              item={item}
              owned={ownedItems.has(item.id)}
              equipped={summary?.equipped?.[item.category]}
              buying={buyingId === item.id}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </section>

      <section className="shop-section surface shop-parent-review">
        <div className="shop-section-head">
          <div>
            <div className="eyebrow">Părinte / profesor</div>
            <h2 className="display-font">Trimite un rezumat înainte de abonament.</h2>
          </div>
          <span className="shop-chip"><i className="fas fa-envelope" /> email mock</span>
        </div>
        <p className="shop-subtitle">Poți trimite părintelui sau profesorului un rezumat cu prețurile abonamentelor și ce include fiecare nivel.</p>
        <div className="shop-parent-form">
          <input value={parentEmail} onChange={e => setParentEmail(e.target.value)} placeholder="Email părinte" />
          <input value={parentMessage} onChange={e => setParentMessage(e.target.value)} placeholder="Mesaj opțional pentru recenzie" />
          <button type="button" className="accent-button" onClick={sendParentReview} disabled={parentSending || !parentEmail.trim()}>
            {parentSending ? 'Se trimite...' : 'Trimite rezumatul'}
          </button>
        </div>
        <div className="shop-notes">
          <div><strong>Cont elev</strong><span>Poate primi bonusuri și notificări către părinte.</span></div>
          <div><strong>Cont părinte</strong><span>Primește rapoarte despre progres și abonamente.</span></div>
          <div><strong>Cont profesor</strong><span>Primește sumarul clasei. Detectorul de text este doar o demonstrație euristică.</span></div>
        </div>
      </section>

      {loading && <div className="shop-loading-note">Se încarcă datele magazinului...</div>}
    </main>
  );
};

export default ShopScreen;
