import { useState, useMemo } from 'react';
import QuoteCard from './QuoteCard.jsx';
import { passwordHint } from '../passwordHint.js';
const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
const isUsernameShape = value => /^[A-Za-zĂÂÎȘȚăâîșț0-9][A-Za-zĂÂÎȘȚăâîșț0-9_.-]{1,18}[A-Za-zĂÂÎȘȚăâîșț0-9]$/.test(String(value || '').trim());

const FieldStatus = ({ touched, valid }) => {
  if (!touched) return null;
  return valid
    ? <i className="fas fa-circle-check field-status field-status-ok" aria-label="Câmp valid"></i>
    : <i className="fas fa-circle-xmark field-status field-status-bad" aria-label="Câmp invalid"></i>;
};

const RegisterScreen = ({ onBack, onContinue, onValidationError }) => {
  const [form, setForm] = useState({
    username: '', password: '', confirmPassword: '', class: '5', parentEmail: ''
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const markTouched = key => setTouched(prev => ({ ...prev, [key]: true }));

  const validators = useMemo(() => ({
    username: v => isUsernameShape(v),
    password: v => passwordHint(v, form.username).ok,
    confirmPassword: v => v && v === form.password,
    class: v => ['5', '6', '7', '8'].includes(String(v)),
    parentEmail: v => isValidEmail(v)
  }), [form.password, form.username]);

  const fieldValid = key => (validators[key] ? validators[key](form[key]) : true);
  const requiredFields = ['username', 'password', 'confirmPassword', 'class', 'parentEmail'];
  const allValid = requiredFields.every(fieldValid);

  const handleSubmit = async () => {
    setTouched(Object.fromEntries(requiredFields.map(key => [key, true])));
    setServerError('');
    if (!allValid) {
      const message = 'Verifică toate câmpurile marcate cu X înainte să continui.';
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
      <div className="brand-mark form-mark">10</div>
      <div className="eyebrow">Cont de elev</div>
      <h1 className="display-font form-title">Fă-ți un cont.</h1>
      <p className="form-subtitle">Îi trimitem un email părintelui tău. După ce confirmă, poți folosi tot ce e în aplicație. Până atunci poți citi lecțiile și face exerciții.</p>
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
              onBlur={() => markTouched('username')}
              placeholder="Ex: andrei_p"
              autoComplete="off"
              className={`field form-input ${touched.username ? (fieldValid('username') ? 'field-valid' : 'field-invalid') : ''}`}
            />
          </label>
          <small className="field-hint">Nu folosi numele tău real.</small>
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
          <small className="field-hint">Părintele tău va primi politica de confidențialitate. <a href="/privacy.html">Citește politica</a>.</small>
        </div>
      </div>

      {serverError && <div className="form-error" role="alert"><i className="fas fa-circle-exclamation"></i> {serverError}</div>}

      <button onClick={handleSubmit} className="accent-button form-submit" type="button" disabled={submitting}>
        {submitting ? 'Se creează contul...' : <>Continuă <i className="fas fa-arrow-right"></i></>}
      </button>
    </main>
  );
};

export default RegisterScreen;
