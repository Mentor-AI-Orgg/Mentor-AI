import { useEffect, useMemo, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { shopItemVisible } from '../shopLook.js';
import LevelBar from './LevelBar.jsx';
import Mascota from './mascot/Mascota.jsx';

const CATEGORY_META = {
  avatar: { label: 'Avatar', icon: 'fa-user-astronaut' },
  background: { label: 'Fundal', icon: 'fa-panorama' },
  titles: { label: 'Titluri', icon: 'fa-award' }
};

const RARITY_RO = {
  Common: 'Obișnuit',
  Rare: 'Rar',
  Epic: 'Epic',
  Legendary: 'Legendar',
  Mythic: 'Mitic'
};

const REWARD_LABEL = {
  login_bonus: 'Prima logare',
  streak_bonus: 'Serie',
  flashcards_5: 'Flashcarduri',
  study_1h: 'Concentrare',
  jackpot_monthly: 'Premiul lunii'
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
          {claimState.claimed ? 'Primit' : reward.eligible ? 'Ia premiul' : 'Nu e ziua premiului'}
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

function visualStyle(item) {
  const wash = Array.isArray(item.wash) && item.wash.length >= 2 ? item.wash : null;
  if (wash) {
    return {
      background: `radial-gradient(circle at 50% 46%, #08142A 0 34%, transparent 35%), linear-gradient(160deg, ${wash[0]}, ${wash[1]})`
    };
  }
  if (item.accent) return { color: item.accent };
  return undefined;
}

const ShopItemCard = ({ item, owned, equipped, onBuy, onEquip, buying, equipping, userLevel }) => {
  const isEquipped = equipped === item.id;
  const needsLevel = Number(item.minLevel || 0);
  const locked = !owned && needsLevel > 0 && Number(userLevel || 1) < needsLevel;
  const closed = !owned && item.saleOpen === false;
  return (
    <div className={`shop-item-card surface ${owned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''} ${locked ? 'is-locked' : ''}`}>
      <div className="shop-item-head">
        <div className="shop-item-badges">
          <div className="shop-item-badge">{locked ? `Nivel ${needsLevel}` : (RARITY_RO[item.rarity] || item.rarity)}</div>
          {item.badge ? <div className="shop-limited-badge">{item.badge}</div> : null}
        </div>
        <div className="shop-item-price"><i className="fas fa-coins" /> {formatCoins(item.price)}</div>
      </div>
      <div className={`shop-item-visual${item.wash ? ' has-wash' : ''}`} style={visualStyle(item)}>
        <span className="shop-item-emoji">{item.emoji || '✨'}</span>
      </div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      {item.untilLabel ? <p className="shop-until">{item.untilLabel}</p> : null}
      {locked && <small className="shop-voice-note">Mitic de la nivelul {needsLevel}. Continuă să înveți — nu se cumpără cu lei.</small>}
      <div className="shop-item-footer">
        <span>{CATEGORY_META[item.category]?.label || item.category}</span>
        {owned ? (
          <button type="button" className="accent-button" disabled={isEquipped || equipping} onClick={() => onEquip(item)}>
            {isEquipped ? 'Pe profil' : equipping ? '...' : 'Poartă'}
          </button>
        ) : (
          <button type="button" className="accent-button" disabled={buying || locked || closed} onClick={() => onBuy(item)}>
            {closed ? 'S-a încheiat' : locked ? `Nivel ${needsLevel}` : buying ? '...' : 'Cumpără'}
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
        <span>Din faptă, nu cu monede.</span>
      )}
    </div>
  </div>
);

const ShopScreen = ({ userData, onBack, onCoinsChange, onAppearanceChange, onRewardToast, onProgress }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [catalog, setCatalog] = useState(null);
  const [category, setCategory] = useState('avatar');
  const [claiming, setClaiming] = useState(false);
  const [buyingId, setBuyingId] = useState('');
  const [equippingId, setEquippingId] = useState('');
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
        nextLevelAt: next.nextLevelAt,
        levelSpan: next.levelSpan,
        score: next.score,
        chaptersDone: next.chaptersDone,
        chaptersTotal: next.chaptersTotal,
        ...(next.chapters ? { chapters: next.chapters } : {}),
        ...(Array.isArray(next.titles?.unlocked) ? { unlockedTitleIds: next.titles.unlocked } : {}),
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

  const ownedItems = new Set(summary?.inventory || []);
  const claimedRewards = summary?.dailyClaims || [];
  const rewardsById = useMemo(() => Object.fromEntries((claimedRewards || []).map(reward => [reward.id, reward])), [claimedRewards]);
  const items = useMemo(() => {
    if (!catalog) return [];
    const owned = new Set(summary?.inventory || []);
    return (catalog.items || []).filter(item => item.category === category && shopItemVisible(item, owned.has(item.id)));
  }, [catalog, category, summary]);

  const handleClaim = async type => {
    setClaiming(true);
    const result = await MentorAPI.claimReward({ type });
    setClaiming(false);
    if (result.success) {
      if (result.data.summary) pushSummary(result.data.summary);
      else await load();
      if (onRewardToast) onRewardToast(`Ai primit ${result.data.earned} monede de studiu.`);
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
        const bought = result.data.summary;
      onCoinsChange(result.data.balance, result.data.equipped || {}, summary?.role || userData.role || 'student', {
          avatarId: result.data.equipped?.avatar,
          themeId: result.data.equipped?.background,
          titleId: result.data.equipped?.title,
          titleName: bought?.titleName,
          ...(bought?.level != null ? { level: bought.level } : {}),
          ...(bought?.chapters ? { chapters: bought.chapters } : {}),
          ...(Array.isArray(bought?.titles?.unlocked) ? { unlockedTitleIds: bought.titles.unlocked } : {})
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
      if (onRewardToast) onRewardToast(`Mitic de la nivelul ${result.data.minLevel}. Acum ești nivelul ${result.data.level}.`, 'warning');
      return;
    }
    if (result.data?.reason === 'sale_ended') {
      if (onRewardToast) onRewardToast(result.data.message || 'Ediția de Halloween s-a închis pe 31 octombrie. Ce ai cumpărat rămâne la tine.', 'warning');
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
      role: 'student'
    });
    setParentSending(false);
    if (result.success) {
      setDeliveryNote(result.data?.mocked === false && result.data?.delivered ? 'trimis' : 'salvat în inbox');
      if (onRewardToast) onRewardToast(result.data?.mocked === false && result.data?.delivered ? 'Mesajul a fost trimis părinților.' : 'Mesajul e în inbox. Emailul real pornește când există chei pe server.');
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
          <p className="shop-subtitle">Plătești cu monede de studiu — nu cu lei. Le iei din capitole, teste, flashcarduri, concentrare și mentor. Mitic cere nivelul 5.</p>
        </div>
        <div className="shop-balance-card">
          <span>Monede de studiu</span>
          <strong>{formatCoins(summary?.balance ?? userData.coins ?? 0)}</strong>
          <LevelBar userData={summary || userData} compact />
        </div>
      </section>

      <section className="shop-section surface">
        <div className="shop-section-head">
          <div>
            <div className="eyebrow">Zilnic</div>
            <h2 className="display-font">Le iei din învățare, nu din buzunar.</h2>
          </div>
          <span className="shop-chip"><i className="fas fa-gift" /> Premiul lunii: {jackpotReward?.subtitle || 'o zi din lună'}</span>
        </div>
        <div className="shop-rewards-grid">
          {(summary?.dailyClaims || []).map(reward => (
            <ShopRewardCard
              key={reward.id}
              reward={reward}
              loading={claiming}
              claimState={{
                claimed: reward.claimed,
                label: REWARD_LABEL[reward.action] || 'Recompensă',
                message: reward.eligible === false && reward.action === 'jackpot_monthly' ? 'Nu e ziua premiului luna asta.' : ''
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
          {['avatar', 'background', 'titles'].map(key => (
            <button key={key} type="button" className={`shop-tab ${category === key ? 'active' : ''}`} onClick={() => setCategory(key)}>
              {CATEGORY_META[key].label}
            </button>
          ))}
        </div>

        {category === 'titles' ? (
          <div className="shop-grid">
            {(summary?.titles?.catalog || catalog?.titles || []).length === 0 && (
              <div className="shop-empty empty-with-mascot">
                <Mascota mood="encouraging" size="md" />
                <p>Titlurile apar după o faptă: prima lecție, un test, o serie de zile.</p>
              </div>
            )}
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
            {items.length === 0 && (
              <div className="shop-empty empty-with-mascot">
                <Mascota mood="sleepy" size="md" />
                <p>Catalogul e gol acum. Reîncearcă sau schimbă tab-ul.</p>
              </div>
            )}
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
            <h2 className="display-font">Spune-i că Sunt de 10 e gratuită.</h2>
          </div>
          <span className="shop-chip"><i className="fas fa-envelope" /> {deliveryNote || 'un mesaj'}</span>
        </div>
        <p className="shop-subtitle">Părintele salvat în cont primește fiecare activitate. De aici îi poți trimite o dată pe zi mesajul fix că Sunt de 10 este gratuită. Nu se poate scrie o adresă sau un text liber.</p>
        <div className="shop-parent-form">
          <button type="button" className="accent-button" onClick={sendParentReview} disabled={parentSending}>
            {parentSending ? 'Se trimite...' : 'Spune-i că este gratuit'}
          </button>
        </div>
        <div className="shop-notes">
          <div><strong>Monede de studiu</strong><span>Nu sunt lei. Se cheltuie doar pe avatar și fundal.</span></div>
          <div><strong>Cum le iei</strong><span>Logare 30, capitol 8, sesiune 15, flashcarduri 10, test 10, concentrare 12–20, mentor 4, serie 5. Premiul lunii 50.</span></div>
          <div><strong>Mitic</strong><span>Ultima raritate se cumpără de la nivelul 5 în sus.</span></div>
        </div>
      </section>

      {pendingItem && (
        <div className="shop-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="shop-confirm-title">
          <div className="shop-confirm-card surface">
            <h3 id="shop-confirm-title" className="display-font">Confirmă cumpărarea</h3>
            <p>Vrei să cumperi <strong>{pendingItem.name}</strong> pentru {formatCoins(pendingItem.price)} monede de studiu?</p>
            {pendingItem.untilLabel ? <p>{pendingItem.untilLabel}.</p> : null}
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
