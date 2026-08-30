import { useState, useEffect } from 'react';
import { MentorAPI } from '../apiClient.js';
import Leaderboard from '../components/Leaderboard.jsx';
import { useI18n } from '../i18n/index.jsx';
import { avatarIcon } from '../appearance.js';

const ProfileScreen = ({ userData, onBack, onLogout, onToast, onLanguageChange, onNavigate }) => {
  const { t, uiLocales, mentorLocales } = useI18n();
  const [detectText, setDetectText] = useState('');
  const [detectLoading, setDetectLoading] = useState(false);
  const [detectResult, setDetectResult] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [skills, setSkills] = useState({ log: [], strengths: [], weaknesses: [] });
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadInbox = async () => {
      const result = await MentorAPI.getNotifications();
      if (result.success) {
        setInbox(result.data.inbox || []);
      }
    };
    const loadSkills = async () => {
      const result = await MentorAPI.getSkillHistory();
      if (result.success) setSkills(result.data);
    };
    loadInbox();
    loadSkills();
  }, [userData.email]);

  const runDetector = async () => {
    if (!detectText.trim()) return;
    setDetectLoading(true);
    const result = await MentorAPI.detect({ text: detectText.trim() });
    if (result.success) {
      setDetectResult(result.data);
    } else {
      setDetectResult({ verdict: 'Detector indisponibil', ai_probability: 0 });
    }
    setDetectLoading(false);
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
    link.download = 'mentor-ai-date.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    onToast?.('Datele au fost descărcate.', 'success');
  };

  const deleteAccount = async () => {
    if (!window.confirm('Ștergi definitiv contul și toate datele asociate? Acțiunea nu poate fi anulată.')) return;
    if (!window.confirm('Ultima confirmare: vrei să ștergi acest cont acum?')) return;
    setDeleting(true);
    const result = await MentorAPI.deleteAccount();
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
            {avatarIcon(userData.avatarId) ? <i className={`fas ${avatarIcon(userData.avatarId)}`} /> : (userData.name || 'M').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-xl font-extrabold">{userData.name || t('profile.defaultName')}</div>
            <div className="text-sm text-slate-400">{userData.school || t('profile.personalProfile')}</div>
            <div className="profile-role-pill">{t('common.student')} · {t('home.level')} {userData.level || 1}</div>
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
            <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">XP</div>
            <div className="text-lg font-semibold">{userData.xp || 0}</div>
          </div>
          <div className="surface-soft rounded-3xl p-4 text-sm">
            <div className="text-slate-400 uppercase tracking-[0.2em] mb-1">{t('home.chapters')}</div>
            <div className="text-lg font-semibold">{userData.chaptersDone || 0}/{userData.chaptersTotal || 0}</div>
          </div>
        </div>
        <div className="profile-shortcut-row">
          <button type="button" className="ghost-button" onClick={() => onNavigate?.('calendar')}>
            <i className="fas fa-calendar-check" /> {t('nav.calendar')}
          </button>
          <button type="button" className="ghost-button" onClick={() => onNavigate?.('subscriptions')}>
            <i className="fas fa-unlock" /> {t('nav.subscriptions')}
          </button>
        </div>
      </div>

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
          <div className="eyebrow">Detector demo</div>
          <h3 className="display-font profile-tool-title">Euristică locală, nu un detector real.</h3>
          <p className="detector-demo-note">Scorul folosește lungimea cuvintelor, termeni academici și un jitter aleator. Nu este GPTZero și nu trebuie folosit ca dovadă că un text a fost generat de AI.</p>
          <textarea
            className="profile-detector-input"
            rows="5"
            value={detectText}
            onChange={e => setDetectText(e.target.value)}
            placeholder="Lipește aici un text pentru scorul demonstrativ..."
          />
          <button type="button" className="accent-button profile-tool-action" onClick={runDetector} disabled={detectLoading || !detectText.trim()}>
            {detectLoading ? 'Analizez...' : 'Rulează demonstrația'}
          </button>
          {detectResult && (
            <div className="profile-detector-result">
              <strong>{detectResult.verdict || 'Rezultat demonstrativ'}</strong>
              <span>Scor demonstrativ: {Number(detectResult.ai_probability || 0).toFixed(0)}% · nu este o probă</span>
              {detectResult.disclaimer && <small>{detectResult.disclaimer}</small>}
            </div>
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
        <section className="surface rounded-3xl p-5 profile-tool-card">
          <div className="eyebrow">{t('profile.languageEyebrow')}</div>
          <h3 className="display-font profile-tool-title">{t('profile.languageTitle')}</h3>
          <label className="field-label">{t('profile.uiLanguage')}
            <select
              className="field form-input"
              value={userData.uiLanguage || userData.language || 'ro'}
              onChange={e => onLanguageChange?.({ uiLanguage: e.target.value })}
            >
              {uiLocales.map(code => (
                <option key={code} value={code}>{t(`languages.${code}`)}</option>
              ))}
            </select>
          </label>
          <label className="field-label">{t('profile.mentorLanguage')}
            <select
              className="field form-input"
              value={userData.language || 'ro'}
              onChange={e => onLanguageChange?.({ language: e.target.value })}
            >
              {mentorLocales.map(code => (
                <option key={code} value={code}>{t(`languages.${code}`)}</option>
              ))}
            </select>
          </label>
        </section>
      </div>
      <div className="mx-5 mt-5">
        <Leaderboard userData={userData} />
      </div>
      <div className="mx-5 mt-5 grid gap-3">
        <button type="button" onClick={exportAccount} className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition" disabled={exporting}>
          <i className="fas fa-download mr-2"></i>{exporting ? t('profile.exporting') : t('profile.export')}
        </button>
        <button type="button" onClick={deleteAccount} className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition" disabled={deleting}>
          <i className="fas fa-trash mr-2"></i>{deleting ? t('profile.deleting') : t('profile.delete')}
        </button>
        <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">{t('profile.privacy')}</a>
        <button type="button" onClick={onLogout} className="surface rounded-3xl p-4 text-left hover:bg-[#29285d] transition">
          <i className="fas fa-arrow-right-from-bracket mr-2"></i>{t('profile.logout')}
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
