import { useState, useMemo } from 'react';
import QuoteCard from './QuoteCard.jsx';
import Mascota from './mascot/Mascota.jsx';
import { passwordHint } from '../passwordHint.js';
import { MentorAPI } from '../apiClient.js';
const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
const USERNAME_HINT = 'Alege alt nume. Nu folosi numele tău real, cuvinte urâte sau date de contact.';
const TERMS_MESSAGE = 'Trebuie să fii de acord cu termenii și politica de confidențialitate.';
const MISMATCH_MESSAGE = 'Parolele nu coincid.';
const EMAIL_MESSAGE = 'Adresa de email nu este validă.';

const FieldStatus = ({ touched, valid }) => {
  if (!touched) return null;
  return valid
    ? <i className="fas fa-circle-check field-status field-status-ok" aria-label="Câmp valid"></i>
    : <i className="fas fa-circle-xmark field-status field-status-bad" aria-label="Câmp invalid"></i>;
};

const RegisterScreen = ({ onBack, onContinue, onValidationError }) => {
  const [form, setForm] = useState({
    username: '', password: '', confirmPassword: '', class: '5', parentEmail: '', acceptTerms: false
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [usernameOk, setUsernameOk] = useState(false);
  const [usernameMsg, setUsernameMsg] = useState('');

  const setField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (key === 'username') {
      setUsernameOk(false);
      setUsernameMsg('');
    }
  };
  const markTouched = key => setTouched(prev => ({ ...prev, [key]: true }));

  const reviewUsername = async value => {
    const name = String(value || '').trim();
    if (name.length < 3) {
      setUsernameOk(false);
      setUsernameMsg(USERNAME_HINT);
      return USERNAME_HINT;
    }
    const result = await MentorAPI.checkUsername(name);
    const ok = Boolean(result.ok);
    const message = ok ? '' : (result.error || USERNAME_HINT);
    setUsernameOk(ok);
    setUsernameMsg(message);
    return message;
  };

  const validators = useMemo(() => ({
    username: () => usernameOk,
    password: v => passwordHint(v, form.username).ok,
    confirmPassword: v => v && v === form.password,
    class: v => ['5', '6', '7', '8'].includes(String(v)),
    parentEmail: v => isValidEmail(v),
    acceptTerms: v => v === true
  }), [form.password, form.username, usernameOk]);

  const fieldValid = key => (validators[key] ? validators[key](form[key]) : true);
  const requiredFields = ['username', 'password', 'confirmPassword', 'class', 'parentEmail', 'acceptTerms'];

  const handleSubmit = async () => {
    setTouched(Object.fromEntries(requiredFields.map(key => [key, true])));
    setServerError('');
    const nameError = await reviewUsername(form.username);
    const password = passwordHint(form.password, form.username);
    const problems = [
      nameError,
      password.ok ? '' : password.label,
      form.confirmPassword && form.confirmPassword === form.password ? '' : MISMATCH_MESSAGE,
      isValidEmail(form.parentEmail) ? '' : EMAIL_MESSAGE,
      form.acceptTerms ? '' : TERMS_MESSAGE
    ].filter(Boolean);
    if (problems.length) {
      const message = problems[0];
      if (onValidationError) onValidationError(message); else alert(message);
      return;
    }

    setSubmitting(true);
    const result = await onContinue(form);
    setSubmitting(false);
    if (result && !result.success) {
      setServerError(result.error || 'Nu am putut crea contul.');
      if (result.field) setTouched(prev => ({ ...prev, [result.field]: true }));
    }
  };

  return (
    <main className="form-page animate-fadeIn">
      <button onClick={onBack} className="back-link" type="button"><i className="fas fa-arrow-left"></i> Înapoi</button>
      <img className="app-emblem form-emblem" src="/emblema.png" alt="Sunt de 10" />
      <div className="eyebrow">Cont de elev</div>
      <h1 className="display-font form-title">Fă-ți un cont.</h1>
      <p className="form-subtitle">Pui emailul părintelui. Contul se deschide imediat. Părintele primește vești când înveți, fără să confirme contul.</p>
      <QuoteCard />

      <div className="form-fields">
        <div>
          <label className="field-label">
            <span className="field-label-row">
              Nume de utilizator
              <FieldStatus touched={Boolean(touched.username)} valid={fieldValid('username')} />
            </span>
            <input
              type="text"
              value={form.username}
              onChange={e => setField('username', e.target.value)}
              onBlur={() => { markTouched('username'); reviewUsername(form.username); }}
              placeholder="Ex: andrei_p"
              autoComplete="off"
              className={`field form-input ${touched.username ? (fieldValid('username') ? 'field-valid' : 'field-invalid') : ''}`}
            />
          </label>
          <small className="field-hint">{usernameMsg || 'Nu folosi numele tău real.'}</small>
        </div>

        <div>
          <label className="field-label">
            <span className="field-label-row">
              Clasa
              <FieldStatus touched={Boolean(touched.class)} valid={fieldValid('class')} />
            </span>
            <select
              value={form.class}
              onChange={e => setField('class', e.target.value)}
              onBlur={() => markTouched('class')}
              className={`field form-input ${touched.class ? (fieldValid('class') ? 'field-valid' : 'field-invalid') : ''}`}
            >
              <option value="5">Clasa a V-a</option>
              <option value="6">Clasa a VI-a</option>
              <option value="7">Clasa a VII-a</option>
              <option value="8">Clasa a VIII-a</option>
            </select>
          </label>
        </div>

        <div>
          <label className="field-label">
            <span className="field-label-row">
              Parolă
              <FieldStatus touched={Boolean(touched.password)} valid={fieldValid('password')} />
            </span>
            <input
              type="password"
              value={form.password}
              onChange={e => setField('password', e.target.value)}
              onBlur={() => markTouched('password')}
              placeholder="Parola ta"
              autoComplete="new-password"
              className={`field form-input ${touched.password ? (fieldValid('password') ? 'field-valid' : 'field-invalid') : ''}`}
            />
          </label>
          <ul className="password-checklist">
            <li className={passwordHint(form.password, form.username).ok ? 'rule-ok' : 'rule-pending'}>
              <i className={`fas ${passwordHint(form.password, form.username).ok ? 'fa-circle-check' : 'fa-circle'}`}></i> {passwordHint(form.password, form.username).label}
            </li>
          </ul>
        </div>

        <div>
          <label className="field-label">
            <span className="field-label-row">
              Confirmă parola
              <FieldStatus touched={Boolean(touched.confirmPassword)} valid={fieldValid('confirmPassword')} />
            </span>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={e => setField('confirmPassword', e.target.value)}
              onBlur={() => markTouched('confirmPassword')}
              placeholder="Rescrie parola"
              autoComplete="new-password"
              className={`field form-input ${touched.confirmPassword ? (fieldValid('confirmPassword') ? 'field-valid' : 'field-invalid') : ''}`}
            />
          </label>
        </div>

        <div>
          <label className="field-label">
            <span className="field-label-row">
              Emailul părintelui
              <FieldStatus touched={Boolean(touched.parentEmail)} valid={fieldValid('parentEmail')} />
            </span>
            <input
              type="email"
              value={form.parentEmail}
              onChange={e => setField('parentEmail', e.target.value)}
              onBlur={() => markTouched('parentEmail')}
              placeholder="ex: parinte@email.com"
              className={`field form-input ${touched.parentEmail ? (fieldValid('parentEmail') ? 'field-valid' : 'field-invalid') : ''}`}
            />
          </label>
          <small className="field-hint">Aici vin rezumatul de pe email și intrarea în zona de părinte. <a href="/confidentialitate" target="_blank" rel="noopener noreferrer">Citește politica</a>.</small>
        </div>

        <div>
          <label className={`consent-check ${touched.acceptTerms && !fieldValid('acceptTerms') ? 'consent-check-invalid' : ''}`}>
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={e => setField('acceptTerms', e.target.checked)}
              onBlur={() => markTouched('acceptTerms')}
            />
            <span>
              Am citit și sunt de acord cu <a href="/termeni" target="_blank" rel="noopener noreferrer">Termenii</a> și <a href="/confidentialitate" target="_blank" rel="noopener noreferrer">Politica de confidențialitate</a>.
            </span>
          </label>
          {touched.acceptTerms && !fieldValid('acceptTerms') && (
            <small className="field-hint field-hint-bad">{TERMS_MESSAGE}</small>
          )}
        </div>
      </div>

      {(Boolean(serverError && serverError.includes('nume de utilizator')) || (Boolean(touched.username) && !usernameOk && Boolean(usernameMsg))) && (
        <Mascota mood="explica" size="sm" message="Alege alt nume. Nu folosi numele tău real." />
      )}
      {serverError && <div className="form-error" role="alert"><i className="fas fa-circle-exclamation"></i> {serverError}</div>}

      <button onClick={handleSubmit} className="accent-button form-submit" type="button" disabled={submitting}>
        {submitting ? 'Se creează contul...' : <>Continuă <i className="fas fa-arrow-right"></i></>}
      </button>
    </main>
  );
};

export default RegisterScreen;
