import { useEffect, useMemo, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const CATEGORY_META = {
  daily: { label: 'Zilnic', icon: 'fa-gift' },
  avatar: { label: 'Avatar', icon: 'fa-user-astronaut' },
  background: { label: 'Fundal', icon: 'fa-panorama' },
  titles: { label: 'Titluri', icon: 'fa-award' }
};

const AUTO_ACTIONS = new Set(['flashcards_5', 'study_1h', 'streak_bonus']);

const formatCoins = value => Number(value || 0).toLocaleString('ro-RO');

const ShopRewardCard = ({ reward, loading, onClaim, claimState }) => {
  const automatic = AUTO_ACTIONS.has(reward.action);
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
      {automatic ? (
        <p className="shop-auto-note">{claimState.claimed ? 'Primit astăzi, din învățare.' : 'Se acordă singur când înveți — nu se poate revendica de aici.'}</p>
      ) : reward.action === 'jackpot_monthly' ? (
        <button type="button" className="accent-button" disabled={loading || claimState.claimed || !reward.eligible} onClick={() => onClaim('jackpot_monthly')}>
          {claimState.claimed ? 'Primit' : reward.eligible ? 'Ia jackpotul' : 'Nu e ziua jackpotului'}
        </button>
      ) : (
        <button type="button" className="accent-button" disabled={loading || claimState.claimed} onClick={() => onClaim(reward.action)}>
          {claimState.claimed ? 'Primit' : 'Primește'}
        </button>
      )}
      {claimState.message && <small className="shop-reward-message">{claimState.message}</small>}
    </div>
  );
};

const ShopItemCard = ({ item, owned, equipped, onBuy, onEquip, buying, equipping, userLevel }) => {
  const isEquipped = equipped === item.id;
  const needsLevel = Number(item.minLevel || 0);
  const locked = !owned && needsLevel > 0 && Number(userLevel || 1) < needsLevel;
  return (
    <div className={`shop-item-card surface ${owned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''} ${locked ? 'is-locked' : ''}`}>
      <div className="shop-item-head">
        <div className="shop-item-badge">{locked ? `Nivel ${needsLevel}` : item.rarity}</div>
        <div className="shop-item-price"><i className="fas fa-coins" /> {formatCoins(item.price)}</div>
      </div>
      <div className="shop-item-visual" style={item.accent ? { color: item.accent } : undefined}>
        <span className="shop-item-emoji">{item.emoji || '✨'}</span>
      </div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      {locked && <small className="shop-voice-note">Mythic: ai nevoie de nivelul {needsLevel}. Continuă să înveți, nu se cumpără cu lei.</small>}
      <div className="shop-item-footer">
        <span>{CATEGORY_META[item.category]?.label || item.category}</span>
        {owned ? (
          <button type="button" className="accent-button" disabled={isEquipped || equipping} onClick={() => onEquip(item)}>
            {isEquipped ? 'Pe profil' : equipping ? '...' : 'Poartă'}
          </button>
        ) : (
          <button type="button" className="accent-button" disabled={buying || locked} onClick={() => onBuy(item)}>
            {locked ? `Nivel ${needsLevel}` : buying ? '...' : 'Cumpără'}
          </button>
        )}
      </div>
    </div>
  );
};

const TitleCard = ({ item, equipped, onEquip, equipping }) => (
  <div className={`shop-item-card surface ${item.unlocked ? 'owned' : ''} ${equipped ? 'equipped' : ''}`}>
    <div className="shop-item-head">
      <div className="shop-item-badge">{item.unlocked ? 'Deblocat' : 'Blocat'}</div>
    </div>
    <div className="shop-item-visual"><span className="shop-item-emoji">{item.emoji || '🏅'}</span></div>
    <h4>{item.name}</h4>
    <p>{item.description}</p>
    <div className="shop-item-footer">
      <span>Titlu</span>
      {item.unlocked ? (
        <button type="button" className="accent-button" disabled={equipped || equipping} onClick={() => onEquip(item.id)}>
          {equipped ? 'Pe profil' : 'Poartă'}
        </button>
      ) : (
        <span>Se deblochează din faptă, nu cu monede.</span>
      )}
    </div>
  </div>
);

const ShopScreen = ({ userData, onBack, onCoinsChange, onAppearanceChange, onRewardToast, onProgress }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [catalog, setCatalog] = useState(null);
  const [category, setCategory] = useState('daily');
  const [claiming, setClaiming] = useState(false);
  const [buyingId, setBuyingId] = useState('');
  const [equippingId, setEquippingId] = useState('');
  const [parentEmail, setParentEmail] = useState(userData.parentEmail || '');
  const [parentMessage, setParentMessage] = useState('');
  const [parentSending, setParentSending] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const [deliveryNote, setDeliveryNote] = useState('');

  const pushSummary = next => {
    if (!next) return;
    setSummary(next);
    if (typeof onCoinsChange === 'function') {
      onCoinsChange(next.balance, next.equipped, next.role, {
        coins: next.balance,
        streak: next.streak,
        xp: next.xp,
        level: next.level,
        xpToNext: next.xpToNext,
        xpIntoLevel: next.xpIntoLevel,
        score: next.score,
        chaptersDone: next.chaptersDone,
        chaptersTotal: next.chaptersTotal,
        avatarId: next.equipped?.avatar,
        themeId: next.equipped?.background,
        titleId: next.equipped?.title,
        titleName: next.titleName
      });
    }
  };

  const load = async () => {
    setRefreshing(true);
    const [summaryResult, catalogResult] = await Promise.all([
      MentorAPI.getEconomySummary({
        class_name: userData.class || '',
        profile_name: userData.name || ''
      }),
      MentorAPI.getShopCatalog()
    ]);
    if (summaryResult.success) {
      pushSummary(summaryResult.data.summary);
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

  const handleClaim = async type => {
    setClaiming(true);
    const result = await MentorAPI.claimReward({ type });
    setClaiming(false);
    if (result.success) {
      if (result.data.summary) pushSummary(result.data.summary);
      else await load();
      if (onRewardToast) onRewardToast(`Ai primit ${result.data.earned} monede.`);
      onProgress?.();
      return;
    }
    if (onRewardToast) onRewardToast(result.data?.message || 'Recompensa nu poate fi primită acum.', 'warning');
  };

  const handleBuy = async itemId => {
    setBuyingId(itemId);
    const result = await MentorAPI.buyShopItem({ item_id: itemId });
    setBuyingId('');
    setPendingItem(null);
    if (result.success) {
      if (typeof onCoinsChange === 'function') {
        onCoinsChange(result.data.balance, result.data.equipped || {}, summary?.role || userData.role || 'student', {
          avatarId: result.data.equipped?.avatar,
          themeId: result.data.equipped?.background,
          titleId: result.data.equipped?.title,
          titleName: result.data.summary?.titleName
        });
      }
      if (typeof onAppearanceChange === 'function') {
        onAppearanceChange(result.data.equipped || {}, result.data.inventory || [], { titleName: result.data.summary?.titleName });
      }
      await load();
      if (onRewardToast) onRewardToast('Obiect cumpărat. Îl vezi pe Home și în profil.');
      return;
    }
    if (result.data?.reason === 'level_required') {
      if (onRewardToast) onRewardToast(`Mythic de la nivelul ${result.data.minLevel}. Acum ești nivelul ${result.data.level}.`, 'warning');
      return;
    }
    if (onRewardToast) onRewardToast('Nu ai destule monede de studiu pentru obiectul ales.', 'warning');
  };

  const applyEquip = result => {
    if (typeof onCoinsChange === 'function') {
      onCoinsChange(result.data.summary?.balance ?? summary?.balance, result.data.equipped || {}, summary?.role || userData.role || 'student', {
        avatarId: result.data.equipped?.avatar,
        themeId: result.data.equipped?.background,
        titleId: result.data.equipped?.title,
        titleName: result.data.summary?.titleName || result.data.titles?.catalog?.find(item => item.id === result.data.equipped?.title)?.name || ''
      });
    }
    if (typeof onAppearanceChange === 'function') {
      onAppearanceChange(result.data.equipped || {}, result.data.inventory || summary?.inventory || [], {
        titleName: result.data.summary?.titleName
      });
    }
  };

  const handleEquipItem = async item => {
    setEquippingId(item.id);
    const result = await MentorAPI.equipItem({ item_id: item.id });
    setEquippingId('');
    if (!result.success) {
      if (onRewardToast) onRewardToast('Nu am putut pune obiectul pe profil.', 'warning');
      return;
    }
    applyEquip(result);
    await load();
    if (onRewardToast) onRewardToast(`${item.name} e acum pe profil.`);
  };

  const handleEquipTitle = async titleId => {
    setEquippingId(titleId);
    const result = await MentorAPI.equipItem({ title_id: titleId, slot: 'title' });
    setEquippingId('');
    if (!result.success) {
      if (onRewardToast) onRewardToast('Titlul nu e deblocat încă.', 'warning');
      return;
    }
    applyEquip(result);
    await load();
    if (onRewardToast) onRewardToast('Titlul e pe profil.');
  };

  const sendParentReview = async () => {
    setParentSending(true);
    const result = await MentorAPI.sendParentReview({
      parent_email: parentEmail,
      role: 'student',
      message: parentMessage
    });
    setParentSending(false);
    if (result.success) {
      setDeliveryNote(result.data?.mocked === false && result.data?.delivered ? 'email trimis' : 'email mock');
      if (onRewardToast) onRewardToast(result.data?.mocked === false && result.data?.delivered ? 'Mesajul a fost trimis pe email.' : 'Mesajul a fost salvat în inbox (email mock).');
      return;
    }
    if (onRewardToast) onRewardToast('Nu am putut trimite mesajul către părinte.', 'warning');
  };

  const jackpotReward = rewardsById['jackpot-monthly'];

  return (
    <main className="screen-page shop-page animate-fadeIn">
      <div className="shop-topbar">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Magazin</div>
      </div>

      <section className="surface shop-hero">
        <div>
          <div className="eyebrow">Magazinul tău</div>
          <h1 className="display-font shop-title">Câștigă din învățare și personalizează aplicația.</h1>
          <p className="shop-subtitle">Plătești cu monede de studiu — nu cu lei. Le iei din capitole, teste, flashcarduri, focus și mentor. Mythic cere nivelul 5.</p>
        </div>
        <div className="shop-balance-card">
          <span>Monede de studiu</span>
          <strong>{formatCoins(summary?.balance ?? userData.coins ?? 0)}</strong>
          <small>{summary?.xp || userData.xp || 0} XP · nivel {summary?.level || userData.level || 1}</small>
        </div>
      </section>

      <section className="shop-section surface">
        <div className="shop-section-head">
          <div>
            <div className="eyebrow">Zilnic</div>
            <h2 className="display-font">Recompense verificate de server.</h2>
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
                label: reward.action === 'login_bonus' ? 'Prima logare' : reward.action === 'streak_bonus' ? 'Streak' : reward.action === 'flashcards_5' ? 'Flashcarduri' : reward.action === 'study_1h' ? 'Focus' : 'Jackpot',
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
            <h2 className="display-font">Avatar și fundal se cumpără. Titlurile se câștigă.</h2>
          </div>
          <button type="button" className="ghost-button" onClick={load} disabled={refreshing}>{refreshing ? 'Se actualizează...' : 'Actualizează'}</button>
        </div>
        <div className="shop-tabs">
          {['daily', 'avatar', 'background', 'titles'].map(key => (
            <button key={key} type="button" className={`shop-tab ${category === key ? 'active' : ''}`} onClick={() => setCategory(key)}>
              {CATEGORY_META[key].label}
            </button>
          ))}
        </div>

        {category === 'titles' ? (
          <div className="shop-grid">
            {(summary?.titles?.catalog || catalog?.titles || []).map(item => (
              <TitleCard
                key={item.id}
                item={item}
                equipped={(summary?.titles?.equipped || summary?.equipped?.title) === item.id}
                equipping={equippingId === item.id}
                onEquip={handleEquipTitle}
              />
            ))}
          </div>
        ) : (
          <div className="shop-grid">
            {items.map(item => (
              <ShopItemCard
                key={item.id}
                item={item}
                owned={ownedItems.has(item.id)}
                equipped={summary?.equipped?.[item.category]}
                buying={buyingId === item.id}
                equipping={equippingId === item.id}
                onBuy={item => setPendingItem(item)}
                onEquip={handleEquipItem}
                userLevel={summary?.level || userData.level || 1}
              />
            ))}
          </div>
        )}
      </section>

      <section className="shop-section surface shop-parent-review">
        <div className="shop-section-head">
          <div>
            <div className="eyebrow">Părinte</div>
            <h2 className="display-font">Spune-i că mentorul e gratuit.</h2>
          </div>
          <span className="shop-chip"><i className="fas fa-envelope" /> {deliveryNote || 'email'}</span>
        </div>
        <p className="shop-subtitle">Părintele primește un singur rezumat pe zi când înveți. De aici îi poți trimite un mesaj scurt: nu există abonament de plătit.</p>
        <div className="shop-parent-form">
          <input value={parentEmail} onChange={e => setParentEmail(e.target.value)} placeholder="Email părinte" />
          <input value={parentMessage} onChange={e => setParentMessage(e.target.value)} placeholder="Mesaj opțional" />
          <button type="button" className="accent-button" onClick={sendParentReview} disabled={parentSending || !parentEmail.trim()}>
            {parentSending ? 'Se trimite...' : 'Trimite mesajul'}
          </button>
        </div>
        <div className="shop-notes">
          <div><strong>Monede de studiu</strong><span>Nu sunt lei. Se cheltuie doar pe avatar și fundal.</span></div>
          <div><strong>Cum le iei</strong><span>Logare 30, capitol 8, sesiune 15, flashcarduri 10, test 10, focus 12–20, mentor 4, streak 5. Jackpot lunar 50.</span></div>
          <div><strong>Mythic</strong><span>Ultima raritate se cumpără de la nivelul 5 în sus.</span></div>
        </div>
      </section>

      {pendingItem && (
        <div className="shop-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="shop-confirm-title">
          <div className="shop-confirm-card surface">
            <h3 id="shop-confirm-title" className="display-font">Confirmă cumpărarea</h3>
            <p>Vrei să cumperi <strong>{pendingItem.name}</strong> pentru {formatCoins(pendingItem.price)} monede de studiu?</p>
            <div className="shop-confirm-actions">
              <button type="button" className="ghost-button" onClick={() => setPendingItem(null)} disabled={Boolean(buyingId)}>Anulează</button>
              <button type="button" className="accent-button" onClick={() => handleBuy(pendingItem.id)} disabled={Boolean(buyingId)}>
                {buyingId ? 'Se cumpără...' : 'Cumpără'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <div className="shop-loading-note">Se încarcă datele magazinului...</div>}
    </main>
  );
};

export default ShopScreen;
