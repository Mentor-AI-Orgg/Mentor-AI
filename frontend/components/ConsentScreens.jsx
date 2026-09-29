import { useCallback, useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import Mascota from './mascot/Mascota.jsx';

const ConsentWaitScreen = ({ parentEmail = '', onOpenLessons }) => {
  const [note, setNote] = useState('');
  const [email, setEmail] = useState(parentEmail || '');
  const [busy, setBusy] = useState(false);

  const resend = async () => {
    setBusy(true);
    const result = await MentorAPI.resendConsent();
    setBusy(false);
    if (!result.success) {
      setNote(result.error || 'Nu am putut retrimite emailul.');
      return;
    }
    setNote(result.data?.already ? 'Părintele a confirmat deja.' : 'Am trimis din nou emailul.');
  };

  const saveEmail = async () => {
    setBusy(true);
    const result = await MentorAPI.setConsentParentEmail({ parentEmail: email.trim() });
    setBusy(false);
    setNote(result.success ? 'Am trimis emailul la adresa nouă.' : (result.error || 'Nu am putut salva adresa.'));
  };

  return (
    <main className="form-page animate-fadeIn">
      <Mascota mood="explica" size="md" />
      <div className="eyebrow">Aproape gata</div>
      <h1 className="display-font form-title">Contul tău așteaptă confirmarea părintelui</h1>
      <p className="form-subtitle">Am trimis un email părintelui tău. Până confirmă, poți citi lecțiile și face exerciții.</p>
      {parentEmail ? <p className="field-hint">Emailul părintelui: {parentEmail}</p> : null}
      <label className="field-label">
        Alt email de părinte
        <input className="field form-input" type="email" value={email} onChange={event => setEmail(event.target.value)} />
      </label>
      <div className="onboarding-actions">
        <button type="button" className="accent-button" onClick={resend} disabled={busy}>Retrimite emailul</button>
        <button type="button" className="ghost-button" onClick={saveEmail} disabled={busy || !email.trim()}>Trimite la adresa asta</button>
        <button type="button" className="ghost-button" onClick={onOpenLessons}>Citește lecțiile</button>
      </div>
      {note && <p className="field-hint" role="status">{note}</p>}
    </main>
  );
};

const ConsentScreen = ({ token = '' }) => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');

  useEffect(() => {
    let ignore = false;
    MentorAPI.peekConsent(token).then(result => {
      if (ignore) return;
      if (!result.success) setError(result.error || 'Linkul nu mai este valabil.');
      else setInfo(result.data);
    });
    return () => { ignore = true; };
  }, [token]);

  const choose = async action => {
    setError('');
    const result = await MentorAPI.confirmConsent({ token, action });
    if (!result.success) {
      setError(result.error || 'Linkul nu mai este valabil.');
      return;
    }
    setDone(action === 'refuse' ? 'Am șters contul și datele.' : 'Mulțumim. Contul copilului este confirmat.');
  };

  return (
    <main className="form-page animate-fadeIn">
      <div className="eyebrow">Pentru părinte</div>
      <h1 className="display-font form-title">Confirmați contul copilului</h1>
      <p className="form-subtitle">Sunt de 10 este gratuită, fără reclame și fără inteligență artificială plătită. Păstrăm numele de utilizator, clasa, progresul și emailul dumneavoastră. Profilul este privat de la început.</p>
      {info?.username ? <p>Cont: {info.username}, clasa {info.class}.</p> : null}
      <p className="field-hint">Dacă nu confirmați în 14 zile, contul și datele se șterg automat. <a href="/confidentialitate">Politica de confidențialitate</a>.</p>
      {done ? <p role="status">{done}</p> : (
        <div className="onboarding-actions">
          <button type="button" className="accent-button" onClick={() => choose('grant')}>Confirm și sunt de acord</button>
          <button type="button" className="ghost-button" onClick={() => choose('refuse')}>Nu am creat eu acest cont / Refuz</button>
        </div>
      )}
      {error && <div className="form-error" role="alert">{error}</div>}
    </main>
  );
};

const ParentScreen = ({ token = '' }) => {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [children, setChildren] = useState(null);
  const [panels, setPanels] = useState({});
  const [confirm, setConfirm] = useState('');

  const load = useCallback(async () => {
    const result = await MentorAPI.parentMe();
    if (!result.success) return;
    const list = result.data.children || [];
    setChildren(list);
    const next = {};
    for (const child of list) {
      const panel = await MentorAPI.parentPanel(child.id);
      if (panel.success) next[child.id] = panel.data;
    }
    setPanels(next);
  }, []);

  useEffect(() => {
    if (token) return undefined;
    load();
    return undefined;
  }, [token, load]);

  useEffect(() => {
    if (!token) return undefined;
    let ignore = false;
    MentorAPI.parentConsume({ token }).then(result => {
      if (ignore) return;
      if (!result.success) setNote(result.error || 'Linkul nu mai este valabil.');
      else load();
    });
    return () => { ignore = true; };
  }, [token, load]);

  const askLink = async event => {
    event.preventDefault();
    const result = await MentorAPI.parentMagic({ email: email.trim() });
    setNote(result.success ? (result.data?.message || 'Dacă există un cont, primești un link.') : (result.error || 'Nu am putut trimite linkul.'));
  };

  const download = async child => {
    const result = await MentorAPI.parentExport(child.id);
    if (!result.success) {
      setNote(result.error || 'Nu am putut descărca datele.');
      return;
    }
    const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'suntde10-date.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const remove = async child => {
    if (confirm !== 'ȘTERGE') {
      setNote('Scrie ȘTERGE ca să confirmi. Retragerea acordului șterge contul și datele.');
      return;
    }
    const result = await MentorAPI.parentDelete(child.id, { confirm: 'ȘTERGE' });
    setNote(result.success ? 'Contul și datele au fost șterse.' : (result.error || 'Nu am putut șterge contul.'));
    if (result.success) load();
  };

  if (!children) {
    return (
      <main className="form-page animate-fadeIn">
        <div className="eyebrow">Părinte</div>
        <h1 className="display-font form-title">Intră în zona de părinte</h1>
        <p className="form-subtitle">Scrie emailul. Primești un link valabil 15 minute. Nu îți faci parolă.</p>
        <form className="form-fields" onSubmit={askLink}>
          <label className="field-label">
            Email
            <input className="field form-input" type="email" value={email} onChange={event => setEmail(event.target.value)} required />
          </label>
          <button type="submit" className="accent-button form-submit">Trimite linkul</button>
        </form>
        {note && <p className="field-hint" role="status">{note}</p>}
      </main>
    );
  }

  return (
    <main className="form-page animate-fadeIn">
      <div className="eyebrow">Părinte</div>
      <h1 className="display-font form-title">Copiii tăi</h1>
      {children.length === 0 && <p>Nu mai este niciun cont legat de emailul tău.</p>}
      {children.map(child => (
        <section key={child.id} className="surface rounded-3xl p-5 profile-tool-card">
          <h2>{child.username}</h2>
          <p>Clasa {child.class}. Înscris la {child.createdAt ? new Date(child.createdAt).toLocaleDateString('ro-RO') : '—'}. Lecții în ultimele 7 zile: {child.lessonsLast7Days}.</p>
          <p>Profil privat: {child.profilePrivate ? 'da' : 'nu'}.</p>
          {panels[child.id] && (
            <>
              <p>Ultimele 7 zile: {panels[child.id].days.map(day => `${day.day.slice(5)} ${day.lessons} lecții, ${day.minutes} min`).join(' · ') || 'încă nimic'}.</p>
              {panels[child.id].chapters.length > 0 && <p>Capitole: {panels[child.id].chapters.map(item => item.title).join(', ')}.</p>}
              {panels[child.id].mistakes.length > 0 && (
                <p>
                  Unde greșește des: {panels[child.id].mistakes.map(item => item.title).join(', ')}.
                  {panels[child.id].mistakes.filter(item => item.lessonId).map(item => (
                    <a key={`${item.lessonId}-${item.title}`} href={`#/lectii/${item.subject || 'matematica'}/${item.grade || '8'}/${item.lessonId}`}> Vezi lecția {item.title}.</a>
                  ))}
                </p>
              )}
              {panels[child.id].en.length > 0 && <p>Evaluare Națională: {panels[child.id].en.map(item => item.title).join(', ')}.</p>}
              <p>Prieteni: {panels[child.id].friends.map(person => person.username).filter(Boolean).join(', ') || 'niciunul'}.</p>
            </>
          )}
          <div className="onboarding-actions">
            <button type="button" className="ghost-button" onClick={() => download(child)}>Descarcă datele</button>
            {['weekly', 'daily', 'off'].map(cadence => (
              <button
                key={cadence}
                type="button"
                className={child.emails === cadence ? 'accent-button' : 'ghost-button'}
                aria-pressed={child.emails === cadence}
                onClick={() => MentorAPI.parentEmails(child.id, { cadence }).then(load)}
              >
                {cadence === 'weekly' ? 'Săptămânal' : cadence === 'daily' ? 'Zilnic' : 'Fără emailuri'}
              </button>
            ))}
            {[0, 30, 60, 90].map(minutes => (
              <button
                key={minutes}
                type="button"
                className={Number(child.dailyLimit) === minutes ? 'accent-button' : 'ghost-button'}
                aria-pressed={Number(child.dailyLimit) === minutes}
                onClick={() => MentorAPI.parentLimit(child.id, minutes).then(load)}
              >
                {minutes ? `${minutes} min/zi` : 'Fără limită'}
              </button>
            ))}
            <button type="button" className="ghost-button" onClick={() => MentorAPI.parentFriends(child.id, { enabled: panels[child.id]?.friendsEnabled === false }).then(load)}>
              {panels[child.id]?.friendsEnabled === false ? 'Pornește prietenii' : 'Oprește prietenii'}
            </button>
            <button type="button" className="ghost-button" onClick={() => MentorAPI.parentPrivacy(child.id).then(load)}>Profil privat: da</button>
          </div>
          <label className="field-label">
            Ca să ștergi contul sau să retragi acordul, scrie ȘTERGE. Contul și datele dispar.
            <input className="field form-input" value={confirm} onChange={event => setConfirm(event.target.value)} />
          </label>
          <button type="button" className="ghost-button" onClick={() => remove(child)}>Șterge contul</button>
          <button type="button" className="ghost-button" onClick={() => remove(child)}>Retrage acordul</button>
        </section>
      ))}
      {note && <p className="field-hint" role="status">{note}</p>}
    </main>
  );
};

export { ConsentWaitScreen, ConsentScreen, ParentScreen };
