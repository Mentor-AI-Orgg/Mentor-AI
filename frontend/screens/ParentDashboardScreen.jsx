import { useState, useEffect, useCallback } from 'react';
import { MentorAPI } from '../apiClient.js';
import InvitationsPanel from '../components/InvitationsPanel.jsx';
import { DEFAULT_PARENT_NOTIFICATION_PREFERENCES } from '../userData.js';

const ParentDashboardScreen = ({ userData, onBack, onNavigate, showToast }) => {
  const [, setLoading] = useState(true);
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
    const result = await MentorAPI.getParentAnalytics({ parent_email: userData.email || 'demo_user' });
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

  // Legarea directă a dispărut: trimitem o invitație, iar copilul o acceptă.
  // Până atunci părintele nu vede nimic din datele lui.
  const inviteChild = async () => {
    if (!childEmail.trim()) return;
    setLinking(true);
    const result = await MentorAPI.inviteLink({ to_email: childEmail.trim(), kind: 'parent_child' });
    setLinking(false);
    if (result.success) {
      showToast?.('Invitație trimisă. Contul se conectează după ce copilul acceptă.', 'success');
      setChildEmail('');
    } else {
      showToast?.(result.error || 'Nu am putut trimite invitația.', 'warning');
    }
  };

  const savePreferences = async () => {
    setSavingPrefs(true);
    const result = await MentorAPI.updateParentPreferences({ parent_email: userData.email || 'demo_user', preferences });
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
    const result = await MentorAPI.requestTest({
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
    const result = await MentorAPI.requestAccessCode({
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
          <input value={childEmail} onChange={e => setChildEmail(e.target.value)} placeholder="Email-ul copilului" className="parent-connect-input" />
          <button type="button" className="accent-button" onClick={inviteChild} disabled={linking || !childEmail.trim()}>{linking ? 'Trimit...' : 'Trimite invitația'}</button>
        </div>
        <small className="field-hint">Copilul primește o invitație și trebuie să o accepte. Până atunci nu ai acces la datele lui.</small>
      </section>

      <section className="mx-5 mt-5 parent-metrics-grid">
        <div className="surface parent-metric-card"><span>Focus total</span><strong>{analytics?.analytics?.totalFocusMinutes || 0} min</strong><small>sesiuni: {analytics?.analytics?.focusSessions || 0}</small></div>
        <div className="surface parent-metric-card"><span>Studiu</span><strong>{analytics?.analytics?.totalStudyMinutes || 0} min</strong><small>activități: {analytics?.analytics?.studySessions || 0}</small></div>
        <div className="surface parent-metric-card"><span>AFK</span><strong>{riskLabel(analytics?.analytics?.afkRisk || 'low')}</strong><small>{analytics?.analytics?.afkMinutes || 0} min de la ultima activitate</small></div>
        <div className="surface parent-metric-card"><span>Copiat</span><strong>{riskLabel(analytics?.analytics?.copiedRisk || 'low')}</strong><small>semnal demonstrativ, nu o dovadă de copiat</small></div>
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

      <section className="mx-5 mt-5">
        <InvitationsPanel role="parent" onToast={showToast} onChange={loadAnalytics} />
      </section>

      <section className="mx-5 mt-5 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Conectare și abonamente</div>
        <h3 className="display-font">Păstrezi controlul pentru contul de familie.</h3>
        <p className="parent-subtitle">Poți deschide abonamentele, poți conecta încă un elev și vezi clar ce urmează în contul familiei.</p>
        <div className="learning-actions">
          <button type="button" className="ghost-button result-action" onClick={() => onNavigate('subscriptions')}>Vezi accesul gratuit</button>
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

export default ParentDashboardScreen;
