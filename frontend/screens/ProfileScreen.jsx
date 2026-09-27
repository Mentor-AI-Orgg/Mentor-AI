import { useState, useEffect, useRef } from 'react';
import { MentorAPI } from '../apiClient.js';
import Leaderboard from '../components/Leaderboard.jsx';
import { useI18n } from '../i18n/index.jsx';
import { avatarIcon, itemEmoji } from '../appearance.js';
import LevelBar from '../components/LevelBar.jsx';
import ReportButton from '../components/ReportButton.jsx';
import { passwordHint } from '../passwordHint.js';

const CLASSES = ['5', '6', '7', '8'];

const FriendCard = ({ person, rank, actionLabel, onAction, disabled, onToast }) => (
  <article className={`friend-card ${rank != null ? 'has-rank' : ''}`}>
    {rank != null && <div className={`friend-rank ${rank <= 3 ? 'is-top' : ''}`}>{rank}</div>}
    <div className="friend-card-avatar">
      {person.avatarEmoji || itemEmoji(person.avatarId) || (avatarIcon(person.avatarId) ? <i className={`fas ${avatarIcon(person.avatarId)}`} /> : (person.name || 'E').charAt(0))}
    </div>
    <div>
      <strong>{person.name}</strong>
      <small>{person.title ? `${person.titleEmoji || ''} ${person.title} · `.trim() : ''}{person.username ? `@${person.username}` : 'fără username'} · clasa {person.class || '—'} · niv. {person.level} · {person.xp} XP</small>
    </div>
    {actionLabel && (
      <button type="button" className="ghost-button" onClick={onAction} disabled={disabled}>
        {actionLabel}
      </button>
    )}
    <ReportButton userId={person.id} onToast={onToast} />
  </article>
);

const ProfileScreen = ({ userData, onBack, onLogout, onToast, onProfileSaved, onNavigate }) => {
  const { t } = useI18n();
  const [inbox, setInbox] = useState([]);
  const [skills, setSkills] = useState({ log: [], strengths: [], weaknesses: [] });
  const [friends, setFriends] = useState({ settings: { profilePrivate: true, acceptFriendRequests: true }, friends: [], incoming: [], outgoing: [], remainingToday: 10, dailyLimit: 10 });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [peer, setPeer] = useState(null);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [form, setForm] = useState({
    username: userData.username || '',
    class: String(userData.class || '5'),
    parentEmail: userData.parentEmail || ''
  });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [wardrobe, setWardrobe] = useState({ items: [], titles: [], inventory: [], equipped: {} });
  const [listOpen, setListOpen] = useState(false);
  const friendsListRef = useRef(null);
  const rankedFriends = [...(friends.friends || [])].sort((a, b) => (
    (Number(b.xp) || 0) - (Number(a.xp) || 0) || String(a.name || '').localeCompare(String(b.name || ''), 'ro')
  ));

  const wear = async (payload, extra = {}) => {
    const result = await MentorAPI.equipItem(payload);
    if (!result.success) {
      onToast?.(result.error || 'Nu am putut salva afișajul.', 'warning');
      return;
    }
    const name = result.data.summary?.titleName || extra.titleName || userData.titleName || '';
    onProfileSaved?.({
      ...userData,
      avatarId: result.data.equipped?.avatar || '',
      themeId: result.data.equipped?.background || '',
      titleId: result.data.equipped?.title || '',
      titleName: name
    });
    setWardrobe(prev => ({
      ...prev,
      titles: result.data.titles?.catalog || prev.titles,
      inventory: result.data.inventory || prev.inventory,
      equipped: result.data.equipped || prev.equipped
    }));
  };

  const openFriendsList = () => {
    setListOpen(true);
    requestAnimationFrame(() => {
      friendsListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const loadSocial = async () => {
    const pack = await MentorAPI.getFriends();
    if (pack.success) {
      setFriends(pack.data);
      if ((pack.data.incoming || []).length > 0) setListOpen(true);
    }
  };

  useEffect(() => {
    MentorAPI.getNotifications().then(result => {
      if (result.success) setInbox(result.data.inbox || []);
    });
    MentorAPI.getSkillHistory().then(result => {
      if (result.success) setSkills(result.data);
    });
    loadSocial();
    MentorAPI.getShopCatalog().then(async pack => {
      const summary = await MentorAPI.getEconomySummary({ class_name: userData.class || '', profile_name: userData.name || '' });
      setWardrobe({
        items: pack.data?.items || [],
        titles: summary.data?.summary?.titles?.catalog || pack.data?.titles || [],
        inventory: summary.data?.summary?.inventory || [],
        equipped: summary.data?.summary?.equipped || {}
      });
    });
  }, [userData.email]);

  const saveProfile = async () => {
    setSaving(true);
    const result = await MentorAPI.updateProfile(form);
    setSaving(false);
    if (!result.success) {
      onToast?.(result.error || 'Nu am putut salva profilul.', 'warning');
      return;
    }
    onProfileSaved?.(result.user);
    onToast?.('Profilul a fost salvat.', 'success');
  };

  const savePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) return;
    const hint = passwordHint(passwords.newPassword, form.username);
    if (!hint.ok) {
      onToast?.(hint.label, 'warning');
      return;
    }
    const result = await MentorAPI.changePassword(passwords);
    if (!result.success) {
      onToast?.(result.error || 'Nu am putut schimba parola.', 'warning');
      return;
    }
    setPasswords({ currentPassword: '', newPassword: '' });
    onToast?.('Parola a fost schimbată.', 'success');
  };

  const toggleSetting = async (key, value) => {
    const next = { ...friends.settings, [key]: value };
    const result = await MentorAPI.updateFriendSettings(next);
    if (!result.success) {
      onToast?.(result.error || 'Nu am putut salva setarea.', 'warning');
      return;
    }
    setFriends(prev => ({ ...prev, settings: result.data.settings }));
  };

  const runSearch = async event => {
    event?.preventDefault();
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const pack = await MentorAPI.searchStudents(query.trim());
    setResults(pack.data || []);
    setPeer(null);
  };

  const openPeer = async id => {
    const pack = await MentorAPI.getStudentProfile(id);
    if (!pack.success) {
      onToast?.(pack.error || 'Profil indisponibil.', 'warning');
      return;
    }
    setPeer(pack.data);
  };

  const addFriend = async id => {
    const result = await MentorAPI.sendFriendRequest(id);
    if (!result.success) {
      onToast?.(result.error || 'Nu am putut trimite cererea.', 'warning');
      return;
    }
    onToast?.(`Cerere trimisă. Mai ai ${result.data.remaining} azi.`, 'success');
    await loadSocial();
    if (peer?.id === id) openPeer(id);
    runSearch();
  };

  const respond = async (requestId, action) => {
    const result = await MentorAPI.respondFriendRequest(requestId, action);
    if (!result.success) {
      onToast?.(result.error || 'Nu am putut răspunde.', 'warning');
      return;
    }
    await loadSocial();
    setPeer(null);
  };

  const exportAccount = async () => {
    setExporting(true);
    const result = await MentorAPI.exportAccount();
    setExporting(false);
    if (!result.success) {
      onToast?.('Nu am putut exporta datele.', 'warning');
      return;
    }
    const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'suntde10-date.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    onToast?.('Datele au fost descărcate.', 'success');
  };

  const deleteAccount = async () => {
    if (deleteConfirm !== 'ȘTERGE') {
      onToast?.('Scrie ȘTERGE ca să confirmi.', 'warning');
      return;
    }
    if (!deletePassword) {
      onToast?.('Scrie parola ca să confirmi.', 'warning');
      return;
    }
    setDeleting(true);
    const result = await MentorAPI.deleteAccount({ password: deletePassword, confirm: 'ȘTERGE' });
    setDeleting(false);
    if (!result.success) {
      onToast?.('Nu am putut șterge contul.', 'warning');
      return;
    }
    onToast?.('Contul a fost șters.', 'success');
    onLogout();
  };

  return (
    <div className="screen-page animate-fadeIn">
      <div className="px-5 pt-6 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>{t('common.back')}</button>
        <div className="text-sm text-slate-400">{t('profile.title')}</div>
      </div>
      <div className="surface mx-5 mt-6 rounded-3xl p-5 shadow-xl profile-hero-card">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl gradient-primary flex items-center justify-center text-3xl">
            {itemEmoji(userData.avatarId) || (avatarIcon(userData.avatarId) ? <i className={`fas ${avatarIcon(userData.avatarId)}`} /> : (userData.name || 'M').charAt(0).toUpperCase())}
          </div>
          <div>
            <div className="text-xl font-extrabold">{userData.name || t('profile.defaultName')}</div>
            <div className="text-sm text-slate-400">{userData.username || t('profile.personalProfile')}</div>
            <div className="profile-role-pill">{userData.titleName ? `${wardrobe.titles.find(item => item.id === userData.titleId)?.emoji || ''} ${userData.titleName} · `.trim() : ''}{t('common.student')} · {t('home.level')} {userData.level || 1}</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="surface-soft rounded-3xl p-4 text-sm">
            <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">{t('home.coins')}</div>
            <div className="text-lg font-semibold">{userData.coins || 0}</div>
          </div>
          <div className="surface-soft rounded-3xl p-4 text-sm">
            <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">{t('home.streak')}</div>
            <div className="text-lg font-semibold">{t('profile.days', { count: userData.streak || 0 })}</div>
          </div>
          <div className="surface-soft rounded-3xl p-4 text-sm">
            <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">Puncte XP</div>
            <div className="text-lg font-semibold">{userData.xp || 0}</div>
          </div>
          <div className="surface-soft rounded-3xl p-4 text-sm">
            <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">{t('home.chapters')}</div>
            <div className="text-lg font-semibold">{userData.chaptersDone || 0}/{userData.chaptersTotal || 0}</div>
          </div>
          <div className="surface-soft rounded-3xl p-4 text-sm col-span-2">
            <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">Colecție magazin</div>
            <div className="text-lg font-semibold">
              {(wardrobe.inventory || []).length}/{wardrobe.items.length || 0} obiecte
              {userData.collection?.avatarsTotal ? ` · ${userData.collection.avatarsOwned || wardrobe.items.filter(item => item.category === 'avatar' && wardrobe.inventory.includes(item.id)).length}/${userData.collection.avatarsTotal} avataruri` : ''}
            </div>
          </div>
        </div>
        <LevelBar userData={userData} />
        <div className="profile-shortcut-row">
          <button type="button" className="accent-button" onClick={openFriendsList}>
            <i className="fas fa-user-group" /> Lista de prieteni ({rankedFriends.length})
          </button>
          <button type="button" className="ghost-button" onClick={() => onNavigate?.('calendar')}>
            <i className="fas fa-calendar-check" /> {t('nav.calendar')}
          </button>
        </div>
      </div>

      <section className="surface mx-5 mt-5 rounded-3xl p-5 profile-tool-card">
        <div className="eyebrow">Editează</div>
        <h3 className="display-font profile-tool-title">Datele tale de elev.</h3>
        <label className="field-label">Nume de utilizator
          <input className="field form-input" value={form.username} onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))} />
        </label>
        <small className="field-hint">Nu folosi numele tău real.</small>
        <label className="field-label">Clasă
          <select className="field form-input" value={form.class} onChange={e => setForm(prev => ({ ...prev, class: e.target.value }))}>
            {CLASSES.map(item => <option key={item} value={item}>Clasa a {item}-a</option>)}
          </select>
        </label>
        <label className="field-label">Email părinte
          <input className="field form-input" type="email" value={form.parentEmail} onChange={e => setForm(prev => ({ ...prev, parentEmail: e.target.value }))} />
        </label>
        <small className="field-hint">Adresa nouă primește un email. Până confirmă, rămâne cea veche.</small>
        <button type="button" className="accent-button profile-tool-action" onClick={saveProfile} disabled={saving}>
          {saving ? 'Salvez…' : 'Salvează profilul'}
        </button>
        <div className="profile-password-row">
          <label className="field-label">Parola actuală
            <input className="field form-input" type="password" value={passwords.currentPassword} onChange={e => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))} />
          </label>
          <label className="field-label">Parola nouă
            <input className="field form-input" type="password" value={passwords.newPassword} onChange={e => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))} />
          </label>
        </div>
        <ul className="password-checklist">
          <li className={passwordHint(passwords.newPassword, form.username).ok ? 'rule-ok' : 'rule-pending'}>
            <i className={`fas ${passwordHint(passwords.newPassword, form.username).ok ? 'fa-circle-check' : 'fa-circle'}`} /> {passwordHint(passwords.newPassword, form.username).label}
          </li>
        </ul>
        <button type="button" className="ghost-button profile-tool-action" onClick={savePassword}>Schimbă parola</button>
      </section>

      <section className="surface mx-5 mt-5 rounded-3xl p-5 profile-tool-card">
        <div className="eyebrow">Afișaj</div>
        <h3 className="display-font profile-tool-title">Ce se vede pe profil.</h3>
        <p className="profile-empty-note">Cumperi avatarul și fundalul din magazin. Titlurile se deblochează din faptă și alegi unul singur care te definește.</p>

        <h4 className="friend-subhead">Avatarul meu preferat</h4>
        <div className="favorite-grid">
          <button type="button" className={`favorite-chip ${!userData.avatarId ? 'is-on' : ''}`} onClick={() => wear({ slot: 'avatar', item_id: '' })}>
            <span className="favorite-emoji">{(userData.name || 'M').charAt(0).toUpperCase()}</span>
            <span>Inițiala</span>
          </button>
          {wardrobe.items.filter(item => item.category === 'avatar' && wardrobe.inventory.includes(item.id)).map(item => (
            <button key={item.id} type="button" className={`favorite-chip ${userData.avatarId === item.id ? 'is-on' : ''}`} onClick={() => wear({ item_id: item.id })}>
              <span className="favorite-emoji">{item.emoji}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        {wardrobe.items.filter(item => item.category === 'avatar' && wardrobe.inventory.includes(item.id)).length === 0 && (
          <p className="profile-empty-note">Nu ai încă un avatar cumpărat. Intră în Magazin.</p>
        )}

        <h4 className="friend-subhead">Fundalul meu preferat</h4>
        <div className="favorite-grid">
          <button type="button" className={`favorite-chip ${!userData.themeId ? 'is-on' : ''}`} onClick={() => wear({ slot: 'background', item_id: '' })}>
            <span className="favorite-emoji">🌙</span>
            <span>Implicit</span>
          </button>
          {wardrobe.items.filter(item => item.category === 'background' && wardrobe.inventory.includes(item.id)).map(item => (
            <button key={item.id} type="button" className={`favorite-chip ${userData.themeId === item.id ? 'is-on' : ''}`} style={item.accent ? { borderColor: item.accent } : undefined} onClick={() => wear({ item_id: item.id })}>
              <span className="favorite-emoji">{item.emoji}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        {wardrobe.items.filter(item => item.category === 'background' && wardrobe.inventory.includes(item.id)).length === 0 && (
          <p className="profile-empty-note">Nu ai încă un fundal cumpărat. Intră în Magazin.</p>
        )}

        <h4 className="friend-subhead">Titluri obținute</h4>
        {wardrobe.titles.filter(item => item.unlocked).length === 0 ? (
          <p className="profile-empty-note">Niciun titlu încă. Primul vine după primul capitol terminat.</p>
        ) : (
          <ul className="earned-titles">
            {wardrobe.titles.filter(item => item.unlocked).map(item => (
              <li key={item.id}>{item.emoji} {item.name} — {item.description}</li>
            ))}
          </ul>
        )}

        <h4 className="friend-subhead">Titlul meu preferat</h4>
        <p className="profile-empty-note">Unul singur, cel care te definește acum.</p>
        <div className="favorite-grid">
          <button type="button" className={`favorite-chip ${!userData.titleId ? 'is-on' : ''}`} onClick={() => wear({ title_id: '', slot: 'title' })}>
            <span className="favorite-emoji">—</span>
            <span>Fără titlu</span>
          </button>
          {wardrobe.titles.filter(item => item.unlocked).map(item => (
            <button key={item.id} type="button" className={`favorite-chip ${userData.titleId === item.id ? 'is-on' : ''}`} onClick={() => wear({ title_id: item.id, slot: 'title' }, { titleName: item.name })}>
              <span className="favorite-emoji">{item.emoji}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="surface mx-5 mt-5 rounded-3xl p-5 profile-tool-card">
        <div className="eyebrow">Setări</div>
        <h3 className="display-font profile-tool-title">Cine te poate găsi.</h3>
        <label className="settings-toggle">
          <input type="checkbox" checked={Boolean(friends.settings.profilePrivate)} onChange={e => toggleSetting('profilePrivate', e.target.checked)} />
          <span>Profil privat — nu apar la căutare și nici în clasament (în afară de tine).</span>
        </label>
        <label className="settings-toggle">
          <input type="checkbox" checked={friends.settings.acceptFriendRequests !== false} onChange={e => toggleSetting('acceptFriendRequests', e.target.checked)} />
          <span>Accept cereri de prietenie.</span>
        </label>
      </section>

      <section ref={friendsListRef} className="surface mx-5 mt-5 rounded-3xl p-5 profile-tool-card">
        <div className="friends-list-head">
          <div>
            <div className="eyebrow">Lista de prieteni</div>
            <h3 className="display-font profile-tool-title">Ordonată după XP, tot timpul.</h3>
          </div>
          <button type="button" className="ghost-button" onClick={() => setListOpen(open => !open)}>
            {listOpen ? 'Ascunde' : `Arată (${rankedFriends.length})`}
          </button>
        </div>
        {friends.incoming.length > 0 && (
          <p className="profile-empty-note">Ai {friends.incoming.length} {friends.incoming.length === 1 ? 'cerere' : 'cereri'} de prietenie.</p>
        )}
        {listOpen && (
          <div className="friends-list-panel">
            {friends.incoming.length > 0 && (
              <>
                <h4 className="friend-subhead">Cereri primite</h4>
                {friends.incoming.map(item => (
                  <FriendCard key={item.id} person={item.from} actionLabel="Acceptă" onAction={() => respond(item.id, 'accept')} onToast={onToast} />
                ))}
              </>
            )}
            {rankedFriends.length === 0 ? (
              <p className="profile-empty-note">Nu ai încă prieteni. Caută un nume mai jos și apasă Adaugă prieten.</p>
            ) : (
              <div className="friend-list">
                {rankedFriends.map((person, index) => (
                  <FriendCard
                    key={person.id}
                    person={person}
                    rank={index + 1}
                    actionLabel="Profil"
                    onAction={() => openPeer(person.id)}
                    onToast={onToast}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="surface mx-5 mt-5 rounded-3xl p-5 profile-tool-card">
        <div className="eyebrow">Prieteni</div>
        <h3 className="display-font profile-tool-title">Caută un nume sau un username.</h3>
        <p className="profile-empty-note">Poți trimite {friends.dailyLimit} cereri pe zi. Mai ai {friends.remainingToday} azi. Fără mesaje între voi — doar prietenie.</p>
        <form className="friend-search" onSubmit={runSearch}>
          <input className="field form-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Caută Ana sau @ana5" />
          <button type="submit" className="accent-button">Caută</button>
        </form>
        {results.length > 0 && (
          <div className="friend-list">
            {results.map(person => (
              <FriendCard
                key={person.id}
                person={person}
                actionLabel={person.friends ? 'Prieten' : person.outgoing ? 'Trimisă' : person.incoming ? 'Acceptă' : 'Adaugă prieten'}
                disabled={person.friends || person.outgoing}
                onAction={() => (person.incoming ? respond(person.incomingRequestId, 'accept') : addFriend(person.id))}
                onToast={onToast}
              />
            ))}
          </div>
        )}
        {peer && (
          <div className="peer-profile">
            {peer.private ? (
              <p>Acest profil este privat.</p>
            ) : (
              <>
                <strong>{peer.name}</strong>
                <span>@{peer.username || 'fără username'} · clasa {peer.class || '—'} · {peer.school || 'școală nespusă'}</span>
                <span>Nivel {peer.level} · {peer.xp} XP</span>
                {peer.friends ? <em>Sunteți prieteni.</em> : peer.outgoing ? <em>Cerere trimisă.</em> : peer.incoming ? (
                  <button type="button" className="accent-button" onClick={() => respond(peer.incomingRequestId, 'accept')}>Acceptă cererea</button>
                ) : (
                  <button type="button" className="accent-button" disabled={!peer.acceptFriendRequests} onClick={() => addFriend(peer.id)}>
                    {peer.acceptFriendRequests ? 'Adaugă prieten' : 'Nu acceptă cereri'}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </section>

      <div className="mx-5 mt-5 profile-tools-grid">
        <section className="surface rounded-3xl p-5 profile-tool-card">
          <div className="eyebrow">Istoric teste</div>
          <h3 className="display-font profile-tool-title">Note, puncte forte, de lucrat.</h3>
          {skills.strengths?.length > 0 && <p className="quiz-explain">Forte: {skills.strengths.join(', ')}</p>}
          {skills.weaknesses?.length > 0 && <p className="quiz-sample">Slabe: {skills.weaknesses.join(', ')}</p>}
          {(skills.log || []).length === 0 ? (
            <p className="profile-empty-note">După primul test sau set de flashcarduri, notele rămân aici.</p>
          ) : (
            <ul className="skill-log">
              {skills.log.map(entry => (
                <li key={entry.id}>
                  <strong>Nota {entry.gradeNote}</strong>
                  <span>{entry.kind === 'test' ? 'Test' : 'Flashcarduri'} · {entry.title || entry.chapterId} · {entry.correct}/{entry.total}</span>
                  {entry.weaknesses?.length > 0 && <small>De lucrat: {entry.weaknesses.join(', ')}</small>}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="surface rounded-3xl p-5 profile-tool-card">
          <div className="eyebrow">{t('profile.parentEyebrow')}</div>
          <h3 className="display-font profile-tool-title">{t('profile.parentTitle')}</h3>
          <p className="detector-demo-note">{t('profile.parentNote', { email: userData.parentEmail || t('profile.parentEmailMissing') })}</p>
          <div className="profile-inbox">
            {inbox.length === 0 ? (
              <p className="profile-empty-note">{t('profile.parentEmpty')}</p>
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
        <Leaderboard />
      </div>
      <div className="mx-5 mt-5 grid gap-3">
        <button type="button" onClick={exportAccount} className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition" disabled={exporting}>
          <i className="fas fa-download mr-2"></i>{exporting ? t('profile.exporting') : t('profile.export')}
        </button>
        {deleteOpen ? (
          <form
            className="surface rounded-3xl p-4 grid gap-3"
            onSubmit={event => {
              event.preventDefault();
              deleteAccount();
            }}
          >
            <p className="text-sm text-slate-300">Scrie parola și ȘTERGE. Contul și datele dispar.</p>
            <label className="field-label">Parola
              <input className="field form-input" type="password" autoComplete="current-password" value={deletePassword} onChange={event => setDeletePassword(event.target.value)} />
            </label>
            <label className="field-label">Confirmare
              <input className="field form-input" value={deleteConfirm} onChange={event => setDeleteConfirm(event.target.value)} placeholder="ȘTERGE" />
            </label>
            <button type="submit" className="accent-button" disabled={deleting}>
              {deleting ? t('profile.deleting') : 'Șterge definitiv'}
            </button>
          </form>
        ) : (
          <button type="button" onClick={() => setDeleteOpen(true)} className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">
            <i className="fas fa-trash mr-2"></i>{t('profile.delete')}
          </button>
        )}
        <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">{t('profile.privacy')}</a>
        <button type="button" onClick={onLogout} className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">
          <i className="fas fa-arrow-right-from-bracket mr-2"></i>{t('profile.logout')}
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
