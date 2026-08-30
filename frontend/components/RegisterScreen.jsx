import { useState, useMemo } from 'react';

// Cuvinte care nu au voie într-un nume de utilizator public (afișat pe
// leaderboard etc.). Listă minimă de pornire -- de extins pe măsură ce
// aplicația crește, ideal cu o listă întreținută separat, nu hardcodată.
const FORBIDDEN_USERNAME_WORDS = [
  'prost', 'idiot', 'nesimtit', 'nesimțit', 'handicapat', 'retardat',
  'sex', 'porno', 'drog', 'nazist', 'hitler', 'admin', 'moderator',
  'fuck', 'shit', 'bitch', 'nigger', 'whore'
];

const containsForbiddenWord = value => {
  const normalized = (value || '').toLowerCase();
  return FORBIDDEN_USERNAME_WORDS.some(word => normalized.includes(word));
};

const PASSWORD_RULES = [
  { key: 'length', label: 'Minim 8 caractere', test: v => v.length >= 8 },
  { key: 'upper', label: 'O literă mare', test: v => /[A-ZĂÂÎȘȚ]/.test(v) },
  { key: 'digit', label: 'O cifră', test: v => /[0-9]/.test(v) },
  { key: 'special', label: 'Un caracter special', test: v => /[^A-Za-z0-9ĂÂÎȘȚăâîșț]/.test(v) }
];

const isPasswordValid = value => PASSWORD_RULES.every(rule => rule.test(value || ''));
const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
const isValidPhone = value => /^0\d{9}$/.test((value || '').replace(/\s/g, ''));

// FieldStatus arată un check verde / X roșu lângă fiecare câmp, live, în
// loc de un singur alert generic la final -- exact ce lipsea în UX-ul vechi.
const FieldStatus = ({ touched, valid }) => {
  if (!touched) return null;
  return valid
    ? <i className="fas fa-circle-check field-status field-status-ok" aria-label="Câmp valid"></i>
    : <i className="fas fa-circle-xmark field-status field-status-bad" aria-label="Câmp invalid"></i>;
};

const RegisterScreen = ({ onBack, onContinue, onValidationError }) => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', username: '', password: '', confirmPassword: '',
    role: 'student', school: '', class: '5', parentEmail: '',
    parentalConsent: false, privacyAccepted: false
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const markTouched = key => setTouched(prev => ({ ...prev, [key]: true }));

  const validators = useMemo(() => ({
    name: v => (v || '').trim().length >= 3,
    phone: v => isValidPhone(v),
    email: v => isValidEmail(v),
    username: v => (v || '').trim().length >= 3 && !containsForbiddenWord(v),
    password: v => isPasswordValid(v),
    confirmPassword: v => v && v === form.password,
    school: v => (v || '').trim().length >= 2,
    class: v => ['5', '6', '7', '8'].includes(String(v)),
    parentEmail: v => isValidEmail(v) && v.trim().toLowerCase() !== (form.email || '').trim().toLowerCase(),
    parentalConsent: v => v === true,
    privacyAccepted: v => v === true
  }), [form.password, form.email]);

  const fieldValid = key => (validators[key] ? validators[key](form[key]) : true);

  const requiredFields = ['name', 'phone', 'email', 'username', 'password', 'confirmPassword', 'school', 'class', 'parentEmail', 'parentalConsent', 'privacyAccepted'];
  const allValid = requiredFields.every(fieldValid);

  const handleSubmit = async () => {
    setTouched(Object.fromEntries(requiredFields.map(key => [key, true])));
    setServerError('');
    if (!allValid) {
      const message = 'Verifică toate câmpurile marcate cu X înainte să continui.';
      if (onValidationError) onValidationError(message); else alert(message);
      return;
    }

    // Contul se creează pe server, deci pot apărea erori pe care validarea din
    // browser nu le poate prinde: email deja folosit, email părinte invalid.
    setSubmitting(true);
    const result = await onContinue(form);
    setSubmitting(false);
    if (result && !result.success) {
      setServerError(result.error || 'Nu am putut crea contul.');
      if (result.field) setTouched(prev => ({ ...prev, [result.field]: true }));
    }
  };

  const studentFields = [
    { key: 'name', label: 'Nume complet', type: 'text', placeholder: 'Ex: Andrei Popescu', autoComplete: 'name', hint: 'Minim 3 caractere.' },
    { key: 'phone', label: 'Număr de telefon', type: 'tel', placeholder: '07xx xxx xxx', autoComplete: 'tel', hint: 'Format românesc, 10 cifre.' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'nume@email.com', autoComplete: 'email' },
    { key: 'username', label: 'Nume de utilizator (public, pe leaderboard)', type: 'text', placeholder: 'Ex: andrei_p', autoComplete: 'off', hint: 'Fără cuvinte nepotrivite.' },
    { key: 'school', label: 'Școala', type: 'text', placeholder: 'Școala Gimnazială nr. 1', autoComplete: 'off' },
    {
      key: 'class',
      label: 'Clasa',
      type: 'select',
      options: [
        { value: '5', label: 'Clasa a V-a' },
        { value: '6', label: 'Clasa a VI-a' },
        { value: '7', label: 'Clasa a VII-a' },
        { value: '8', label: 'Clasa a VIII-a' }
      ]
    }
  ];

  return (
    <main className="form-page animate-fadeIn">
      <button onClick={onBack} className="back-link"><i className="fas fa-arrow-left"></i> Înapoi</button>
      <div className="brand-mark form-mark">M</div>
      <div className="eyebrow">Cont de elev</div>
      <h1 className="display-font form-title">Hai să te cunoaștem.</h1>
      <p className="form-subtitle">Mentor AI este doar pentru elevi. Părintele primește pe email tot ce faci aici, fără să-și facă cont.</p>

      <div className="form-fields">
        {studentFields.map(field => (
          <div key={field.key}>
            <label className="field-label">
              <span className="field-label-row">
                {field.label}
                <FieldStatus touched={Boolean(touched[field.key])} valid={fieldValid(field.key)} />
              </span>
              {field.type === 'select' ? (
                <select
                  value={form[field.key]}
                  onChange={e => setField(field.key, e.target.value)}
                  onBlur={() => markTouched(field.key)}
                  className={`field form-input ${touched[field.key] ? (fieldValid(field.key) ? 'field-valid' : 'field-invalid') : ''}`}
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={e => setField(field.key, e.target.value)}
                  onBlur={() => markTouched(field.key)}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  className={`field form-input ${touched[field.key] ? (fieldValid(field.key) ? 'field-valid' : 'field-invalid') : ''}`}
                />
              )}
            </label>
            {field.hint && <small className="field-hint">{field.hint}</small>}
            {touched[field.key] && !fieldValid(field.key) && field.key === 'username' && containsForbiddenWord(form.username) && (
              <small className="field-hint field-hint-bad">Numele de utilizator conține un cuvânt care nu este permis.</small>
            )}
          </div>
        ))}

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
            {PASSWORD_RULES.map(rule => (
              <li key={rule.key} className={rule.test(form.password) ? 'rule-ok' : 'rule-pending'}>
                <i className={`fas ${rule.test(form.password) ? 'fa-circle-check' : 'fa-circle'}`}></i> {rule.label}
              </li>
            ))}
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
              Email părinte / tutore
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
          <small className="field-hint">Obligatoriu și diferit de emailul tău. Părintele nu își face cont: primește pe acest email tot ce faci în aplicație.</small>
        </div>

        <label className={`consent-check ${touched.parentalConsent && !fieldValid('parentalConsent') ? 'consent-check-invalid' : ''}`}>
          <input
            type="checkbox"
            checked={form.parentalConsent}
            onChange={e => setField('parentalConsent', e.target.checked)}
            onBlur={() => markTouched('parentalConsent')}
          />
          <span>Un părinte sau tutore își dă acordul pentru crearea acestui cont de elev. <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Detalii în politica de confidențialitate</a>.</span>
        </label>

        <label className={`consent-check ${touched.privacyAccepted && !fieldValid('privacyAccepted') ? 'consent-check-invalid' : ''}`}>
          <input
            type="checkbox"
            checked={form.privacyAccepted}
            onChange={e => setField('privacyAccepted', e.target.checked)}
            onBlur={() => markTouched('privacyAccepted')}
          />
          <span>Am citit și accept <a href="/privacy.html" target="_blank" rel="noopener noreferrer">politica de confidențialitate</a> și <a href="/terms.html" target="_blank" rel="noopener noreferrer">termenii de utilizare</a>.</span>
        </label>
      </div>

      {serverError && <div className="form-error" role="alert"><i className="fas fa-circle-exclamation"></i> {serverError}</div>}

      <button onClick={handleSubmit} className="accent-button form-submit" disabled={submitting}>
        {submitting ? 'Se creează contul...' : <>Continuă <i className="fas fa-arrow-right"></i></>}
      </button>
    </main>
  );
};

export default RegisterScreen;
