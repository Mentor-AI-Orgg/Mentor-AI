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
      <p className="form-subtitle">Am trimis un email părintelui tău. Până confirmă, poți citi lecțiile și face exerciții. Dacă nu apare în inbox, să se uite și în Spam. Fără acel link, contul nu se confirmă.</p>
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
      <p className="field-hint">Contul este deja deschis. Puteți confirma sau spune că nu l-ați creat. Un cont vechi rămas în așteptare se șterge după 14 zile. <a href="/confidentialitate">Politica de confidențialitate</a>.</p>
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

const EMAIL_CHOICES = [
  {
    cadence: 'weekly',
    label: 'Săptămânal',
    note: 'Duminică, de la ora 19 (ora României): un email cu lecțiile, minutele și testele adunate până atunci. Nu pleacă dacă n-a lucrat.'
  },
  {
    cadence: 'daily',
    label: 'Zilnic',
    note: 'În fiecare zi, de la ora 19 (ora României): un email cu lecțiile, minutele și testele de la ultimul rezumat. Nu pleacă dacă n-a lucrat. După trimitere, lista se golește.'
  },
  {
    cadence: 'off',
    label: 'Fără emailuri',
    note: 'Nu mai primești rezumatul de activitate. Îl vezi în continuare aici.'
  }
];

const LIMIT_CHOICES = [
  {
    minutes: 0,
    label: 'Fără limită',
    note: 'Copilul poate lucra oricât. Nu apare mesajul că a lucrat destul.'
  },
  {
    minutes: 30,
    label: '30 min/zi',
    note: 'La 30 de minute de cronometru și teste azi, pe prima pagină vede că a lucrat destul. Poate continua; a doua zi o ia de la capăt.'
  },
  {
    minutes: 60,
    label: '60 min/zi',
    note: 'La 60 de minute de cronometru și teste azi, pe prima pagină vede că a lucrat destul. Poate continua; a doua zi o ia de la capăt.'
  },
  {
    minutes: 90,
    label: '90 min/zi',
    note: 'La 90 de minute de cronometru și teste azi, pe prima pagină vede că a lucrat destul. Poate continua; a doua zi o ia de la capăt.'
  }
];

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
      {children.map(child => {
        const panel = panels[child.id];
        const fresh = (panel?.milestones || []).filter(item => !item.praised);
        return (
        <section key={child.id} className="surface rounded-3xl p-5 profile-tool-card">
          <h2>{child.username}</h2>
          {panel?.readiness && (
            <p className="readiness-parent">
              <strong>{panel.readiness.label}: {panel.readiness.percent}%</strong>
              {' '}{panel.readiness.hint}
            </p>
          )}
          {panel?.lateNote && <p className="late-note">{panel.lateNote}</p>}
          {Array.isArray(panel?.lessonMastery) && panel.lessonMastery.length > 0 && (
            <div className="lesson-mastery-parent">
              <p>Pe lecții</p>
              <ul className="lesson-mastery-list">
                {panel.lessonMastery.map(item => (
                  <li key={`${item.subject}:${item.chapterId}:${item.lessonId}`} className={`lesson-mastery-row${item.review ? ' is-review' : ''}`}>
                    <span className="lesson-mastery-copy">
                      <span className="lesson-mastery-title">{item.title}</span>
                      {item.chapterTitle ? <small>{item.chapterTitle}</small> : null}
                    </span>
                    <span className="lesson-mastery-pct">{item.percent}%</span>
                    {item.review ? <em className="lesson-review">de recapitulat</em> : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {fresh.map(item => (
            <div key={item.id} className="parent-praise">
              <p>{item.label}</p>
              <div className="parent-praise-actions">
                <button type="button" className="ghost-button" aria-label="Laudă cu aplauze" onClick={() => MentorAPI.parentPraise(child.id, { milestoneId: item.id, emoji: 'clap' }).then(load)}>👏</button>
                <button type="button" className="ghost-button" aria-label="Laudă cu inimă" onClick={() => MentorAPI.parentPraise(child.id, { milestoneId: item.id, emoji: 'heart' }).then(load)}>❤️</button>
              </div>
            </div>
          ))}
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
          <div className="onboarding-actions parent-controls">
            <button type="button" className="ghost-button" onClick={() => download(child)}>Descarcă datele</button>
            <div className="parent-choices">
              <p className="parent-choices-title">Emailuri</p>
              <p className="parent-choices-lead">Cu mai mulți copii, aceeași adresă primește într-o zi cel mult trei rezumate.</p>
              {EMAIL_CHOICES.map(choice => (
                <div key={choice.cadence} className="parent-choice">
                  <button
                    type="button"
                    className={child.emails === choice.cadence ? 'accent-button' : 'ghost-button'}
                    aria-pressed={child.emails === choice.cadence}
                    aria-describedby={`email-${child.id}-${choice.cadence}`}
                    onClick={() => MentorAPI.parentEmails(child.id, { cadence: choice.cadence }).then(load)}
                  >
                    {choice.label}
                  </button>
                  <p id={`email-${child.id}-${choice.cadence}`} className="parent-choice-note">{choice.note}</p>
                </div>
              ))}
            </div>
            <div className="parent-choices">
              <p className="parent-choices-title">Timp în aplicație</p>
              {LIMIT_CHOICES.map(choice => (
                <div key={choice.minutes} className="parent-choice">
                  <button
                    type="button"
                    className={Number(child.dailyLimit) === choice.minutes ? 'accent-button' : 'ghost-button'}
                    aria-pressed={Number(child.dailyLimit) === choice.minutes}
                    aria-describedby={`limit-${child.id}-${choice.minutes}`}
                    onClick={() => MentorAPI.parentLimit(child.id, choice.minutes).then(load)}
                  >
                    {choice.label}
                  </button>
                  <p id={`limit-${child.id}-${choice.minutes}`} className="parent-choice-note">{choice.note}</p>
                </div>
              ))}
            </div>
            <button type="button" className="ghost-button" onClick={() => MentorAPI.parentFriends(child.id, { enabled: panels[child.id]?.friendsEnabled === false }).then(load)}>
              {panels[child.id]?.friendsEnabled === false ? 'Pornește prietenii' : 'Oprește prietenii'}
            </button>
            <button type="button" className="ghost-button" onClick={() => MentorAPI.parentPrivacy(child.id).then(load)}>Profil privat: da</button>
          </div>
          <p className="field-hint">Retragerea acordului șterge contul copilului și datele. Nu e o oprire temporară.</p>
          <label className="field-label">
            Ca să ștergi contul și să retragi acordul, scrie ȘTERGE. Contul și datele dispar.
            <input className="field form-input" value={confirm} onChange={event => setConfirm(event.target.value)} />
          </label>
          <button type="button" className="ghost-button" onClick={() => remove(child)}>Șterge contul și retrage acordul</button>
        </section>
        );
      })}
      {note && <p className="field-hint" role="status">{note}</p>}
    </main>
  );
};

export { ConsentWaitScreen, ConsentScreen, ParentScreen };
