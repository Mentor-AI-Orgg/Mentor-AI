const { useCallback, useEffect, useState } = React;

const PEDAGOGICAL_LINKS = [
  { title: 'Manuale digitale (edu.ro)', url: 'https://www.manuale.edu.ro', desc: 'Manualele oficiale, pe materie și clasă.' },
  { title: 'Khan Academy România', url: 'https://ro.khanacademy.org', desc: 'Exerciții și explicații video, gratuite, pe multe materii.' },
  { title: 'Digitaliada', url: 'https://www.digitaliada.ro', desc: 'Resurse și platformă de educație digitală pentru profesori.' },
  { title: 'LiveResq', url: 'https://www.livresq.com', desc: 'Creezi lecții interactive, fără cod, de partajat cu clasa.' }
];

const riskLabel = value => (value === 'high' ? 'Ridicat' : value === 'medium' ? 'Mediu' : 'Scăzut');

const TeacherDashboard = ({ userData, onNavigate, showToast }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [studentEmail, setStudentEmail] = useState('');
  const [testForm, setTestForm] = useState({ studentEmail: '', subject: userData.subject || '', note: '', dueDate: '' });
  const [sendingTest, setSendingTest] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await window.MentorAPI.getTeacherAnalytics({ teacher_email: userData.email || 'demo_user' });
    if (result.success) setData(result.data);
    setLoading(false);
  }, [userData.email]);

  useEffect(() => { load(); }, [load]);

  // Varianta veche scria activitate direct în contul elevului
  // (`user_id: studentEmail`), adică profesorul putea modifica datele oricărui
  // cont doar știindu-i adresa. Rutele folosesc acum identitatea din sesiune,
  // deci apelul acela nu mai are efect asupra elevului.
  //
  // Legarea corectă are nevoie de o invitație pe care elevul o acceptă;
  // urmează în PR-ul de consimțământ. Până atunci elevul își pune emailul
  // profesorului la înregistrare, iar aici doar explicăm asta, ca să nu lăsăm
  // un buton care pretinde că a făcut ceva.
  const connectStudent = async () => {
    showToast?.('Legarea directă a fost dezactivată. Elevul te adaugă punând emailul tău la înregistrare.', 'warning');
  };

  const requestTest = async () => {
    if (!testForm.studentEmail.trim()) return;
    setSendingTest(true);
    const result = await window.MentorAPI.requestTest({
      requester_email: userData.email || 'demo_user',
      requester_role: 'teacher',
      student_email: testForm.studentEmail.trim(),
      subject: testForm.subject,
      note: testForm.note,
      due_date: testForm.dueDate
    });
    setSendingTest(false);
    if (result.success) {
      showToast?.('Testul a fost cerut elevului.', 'success');
      setTestForm(prev => ({ ...prev, note: '' }));
    } else {
      showToast?.('Nu am putut trimite cererea acum.', 'warning');
    }
  };

  const roster = data?.roster || [];
  const classSummary = data?.classSummary || { studentCount: 0, classAverageFocusMinutes: 0, atRiskCount: 0 };

  return (
    <div className="screen-page animate-fadeIn">
      <div className="px-5 pt-6 flex items-center justify-between">
        <div className="text-sm text-slate-400">Profesor</div>
        <button onClick={load} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-rotate mr-2"></i>Reîncarcă</button>
      </div>

      <section className="mx-5 mt-6 surface rounded-3xl p-5 parent-hero-card">
        <div className="eyebrow">Cont de profesor{userData.subject ? ` · ${userData.subject}` : ''}</div>
        <h1 className="display-font parent-title">Clasa ta, dintr-o privire.</h1>
        <p className="parent-subtitle">Vezi progresul elevilor conectați, ceri teste rapid și ai acces la resurse pedagogice utile — fără să te amesteci cu profilul unui elev.</p>
        <div className="parent-connect-row">
          <input value={studentEmail} onChange={e => setStudentEmail(e.target.value)} placeholder="Email elev de adăugat la clasă" className="parent-connect-input" />
          <button type="button" className="accent-button" onClick={connectStudent} disabled={!studentEmail.trim()}>Adaugă elev</button>
        </div>
        <small className="field-hint">Legarea prin invitație acceptată de elev urmează. Deocamdată elevul te adaugă punând emailul tău la înregistrare.</small>
      </section>

      <section className="mx-5 mt-5 parent-metrics-grid teacher-metrics-grid">
        <div className="surface parent-metric-card"><span>Elevi conectați</span><strong>{classSummary.studentCount}</strong><small>în clasa ta</small></div>
        <div className="surface parent-metric-card"><span>Focus mediu</span><strong>{classSummary.classAverageFocusMinutes} min</strong><small>pe elev</small></div>
        <div className="surface parent-metric-card"><span>Risc ridicat</span><strong>{classSummary.atRiskCount}</strong><small>AFK sau copiere</small></div>
      </section>

      <section className="mx-5 mt-5 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Roster clasă</div>
        <h3 className="display-font">Cum stă fiecare elev.</h3>
        {loading ? (
          <p className="profile-empty-note">Se încarcă...</p>
        ) : roster.length === 0 ? (
          <p className="profile-empty-note">Niciun elev conectat încă. Adaugă un email de elev mai sus, sau cere-i elevului să pună emailul tău la înregistrare.</p>
        ) : (
          <div className="teacher-roster-list">
            {roster.map(student => (
              <article key={student.email} className="teacher-roster-row">
                <div className="teacher-roster-name">
                  <strong>{student.name}</strong>
                  <small>{student.className || 'fără clasă'} · streak {student.streak}</small>
                </div>
                <div className="teacher-roster-stats">
                  <span>Focus: {student.totalFocusMinutes} min</span>
                  <span>AFK: {riskLabel(student.afkRisk)}</span>
                  <span>Copiat: {riskLabel(student.copiedRisk)}</span>
                </div>
                <button
                  type="button"
                  className="ghost-button teacher-roster-test-btn"
                  onClick={() => setTestForm(prev => ({ ...prev, studentEmail: student.email }))}
                >
                  Cere test <i className="fas fa-arrow-right"></i>
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-5 mt-5 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Cere un test</div>
        <h3 className="display-font">Trimite o cerere de test unui elev.</h3>
        <p className="parent-subtitle">Elevul primește o notificare și poate genera testul din secțiunea Învață.</p>
        <div className="teacher-test-form">
          <input value={testForm.studentEmail} onChange={e => setTestForm(prev => ({ ...prev, studentEmail: e.target.value }))} placeholder="Email elev" className="parent-connect-input" />
          <input value={testForm.subject} onChange={e => setTestForm(prev => ({ ...prev, subject: e.target.value }))} placeholder="Materie (ex: Matematică)" className="parent-connect-input" />
          <input type="date" value={testForm.dueDate} onChange={e => setTestForm(prev => ({ ...prev, dueDate: e.target.value }))} className="parent-connect-input" />
          <textarea value={testForm.note} onChange={e => setTestForm(prev => ({ ...prev, note: e.target.value }))} rows="2" placeholder="Mesaj pentru elev (opțional)" className="teacher-test-note" />
          <button type="button" className="accent-button" onClick={requestTest} disabled={sendingTest || !testForm.studentEmail.trim()}>{sendingTest ? 'Trimit...' : 'Trimite cererea'}</button>
        </div>
      </section>

      <section className="mx-5 mt-5 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Resurse pedagogice</div>
        <h3 className="display-font">Linkuri utile pentru pregătirea lecțiilor.</h3>
        <div className="teacher-links-list">
          {PEDAGOGICAL_LINKS.map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="teacher-link-card">
              <strong>{link.title}</strong>
              <span>{link.desc}</span>
              <i className="fas fa-arrow-up-right-from-square"></i>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-5 mt-5 mb-8 surface rounded-3xl p-5 parent-panel">
        <div className="eyebrow">Cont</div>
        <h3 className="display-font">Gestionează abonamentul clasei.</h3>
        <div className="learning-actions">
          <button type="button" className="ghost-button result-action" onClick={() => onNavigate?.('subscriptions')}>Vezi abonamentele</button>
        </div>
      </section>
    </div>
  );
};

window.TeacherDashboard = TeacherDashboard;
