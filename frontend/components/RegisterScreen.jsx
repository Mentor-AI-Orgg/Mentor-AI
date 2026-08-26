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

const RegisterScreen = ({ onBack, onContinue, onValidationError, initialRole = 'student' }) => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', username: '', password: '', confirmPassword: '',
    role: initialRole, school: '', class: '', subject: '', parentEmail: '', teacherEmail: '', childEmail: '',
    inviteCode: '', parentalConsent: false, privacyAccepted: false
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const markTouched = key => setTouched(prev => ({ ...prev, [key]: true }));

  // Validatori per câmp, în funcție de rol -- fiecare intrare devine
  // relevantă doar dacă e efectiv afișată pentru rolul curent.
  const validators = useMemo(() => ({
    name: v => (v || '').trim().length >= 3,
    phone: v => isValidPhone(v),
    email: v => isValidEmail(v),
    username: v => (v || '').trim().length >= 3 && !containsForbiddenWord(v),
    password: v => isPasswordValid(v),
    confirmPassword: v => v && v === form.password,
    school: v => form.role !== 'student' || (v || '').trim().length >= 2,
    class: v => form.role !== 'student' || (v || '').trim().length >= 1,
    subject: v => form.role !== 'teacher' || (v || '').trim().length >= 2,
    parentEmail: v => (form.role !== 'parent' && form.role !== 'student') || isValidEmail(v),
    // Contul de profesor vede analitica mai multor elevi, deci serverul cere
    // un cod de invitație. Îl validăm doar ca prezență; corectitudinea o
    // stabilește backend-ul.
    inviteCode: v => form.role !== 'teacher' || (v || '').trim().length > 0,
    parentalConsent: v => form.role !== 'student' || v === true,
    privacyAccepted: v => v === true
  }), [form.role, form.password]);

  const fieldValid = key => (validators[key] ? validators[key](form[key]) : true);

  // Câmpurile efectiv necesare diferă pe rol: un profesor nu are clasă/
  // școală de elev, un părinte nu are nici clasă/școală, nici materie.
  const requiredByRole = {
    student: ['name', 'phone', 'email', 'username', 'password', 'confirmPassword', 'school', 'class', 'parentEmail', 'parentalConsent', 'privacyAccepted'],
    teacher: ['name', 'phone', 'email', 'username', 'password', 'confirmPassword', 'subject', 'inviteCode', 'privacyAccepted'],
    parent: ['name', 'phone', 'email', 'username', 'password', 'confirmPassword', 'parentEmail', 'privacyAccepted']
  };

  const requiredFields = requiredByRole[form.role] || requiredByRole.student;
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
    // browser nu le poate prinde: email deja folosit, cod de invitație greșit.
    setSubmitting(true);
    const result = await onContinue(form);
    setSubmitting(false);
    if (result && !result.success) {
      setServerError(result.error || 'Nu am putut crea contul.');
      if (result.field) setTouched(prev => ({ ...prev, [result.field]: true }));
    }
  };

  const fieldLabels = {
    student: [
      { key: 'name', label: 'Nume complet', type: 'text', placeholder: 'Ex: Andrei Popescu', autoComplete: 'name', hint: 'Minim 3 caractere.' },
      { key: 'phone', label: 'Număr de telefon', type: 'tel', placeholder: '07xx xxx xxx', autoComplete: 'tel', hint: 'Format românesc, 10 cifre.' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'nume@email.com', autoComplete: 'email' },
      { key: 'username', label: 'Nume de utilizator (public, pe leaderboard)', type: 'text', placeholder: 'Ex: andrei_p', autoComplete: 'off', hint: 'Fără cuvinte nepotrivite.' },
      { key: 'school', label: 'Școala / Liceul', type: 'text', placeholder: 'Liceul Teoretic „Mihai Eminescu”', autoComplete: 'off' },
      { key: 'class', label: 'Clasa', type: 'text', placeholder: 'Ex: a XII-a A', autoComplete: 'off' }
    ],
    teacher: [
      { key: 'name', label: 'Nume complet', type: 'text', placeholder: 'Ex: Prof. Ioana Marin', autoComplete: 'name', hint: 'Minim 3 caractere.' },
      { key: 'phone', label: 'Număr de telefon', type: 'tel', placeholder: '07xx xxx xxx', autoComplete: 'tel', hint: 'Format românesc, 10 cifre.' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'nume@email.com', autoComplete: 'email' },
      { key: 'username', label: 'Nume de utilizator', type: 'text', placeholder: 'Ex: prof_marin', autoComplete: 'off', hint: 'Fără cuvinte nepotrivite.' },
      { key: 'subject', label: 'Materia predată', type: 'text', placeholder: 'Ex: Matematică', autoComplete: 'off', hint: 'Folosită ca să vezi analitica elevilor tăi pe materie.' }
    ],
    parent: [
      { key: 'name', label: 'Nume complet', type: 'text', placeholder: 'Ex: Maria Popescu', autoComplete: 'name', hint: 'Minim 3 caractere.' },
      { key: 'phone', label: 'Număr de telefon', type: 'tel', placeholder: '07xx xxx xxx', autoComplete: 'tel', hint: 'Pe acest număr primești codurile de acces prin SMS.' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'nume@email.com', autoComplete: 'email' },
      { key: 'username', label: 'Nume de utilizator', type: 'text', placeholder: 'Ex: maria_p', autoComplete: 'off', hint: 'Fără cuvinte nepotrivite.' }
    ]
  };

  const roleFields = fieldLabels[form.role] || fieldLabels.student;

  return (
    <main className="form-page animate-fadeIn">
      <button onClick={onBack} className="back-link"><i className="fas fa-arrow-left"></i> Înapoi</button>
      <div className="brand-mark form-mark">M</div>
      <div className="eyebrow">Profilul tău de învățare</div>
      <h1 className="display-font form-title">Hai să te cunoaștem.</h1>
      <p className="form-subtitle">Câteva detalii ne ajută să-ți construim un ritm potrivit.</p>

      <div className="form-fields">
        <label className="field-label">Tip cont
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="field form-input"
          >
            <option value="student">Elev</option>
            <option value="parent">Părinte</option>
            <option value="teacher">Profesor</option>
          </select>
        </label>

        {roleFields.map(field => (
          <div key={field.key}>
            <label className="field-label">
              <span className="field-label-row">
                {field.label}
                <FieldStatus touched={Boolean(touched[field.key])} valid={fieldValid(field.key)} />
              </span>
              <input
                type={field.type}
                value={form[field.key]}
                onChange={e => setField(field.key, e.target.value)}
                onBlur={() => markTouched(field.key)}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className={`field form-input ${touched[field.key] ? (fieldValid(field.key) ? 'field-valid' : 'field-invalid') : ''}`}
              />
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

        {form.role === 'student' && (
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
            <small className="field-hint">Obligatoriu. Trimitem o invitație de conectare; părintele nu vede datele tale până o acceptă.</small>
          </div>
        )}
        {form.role === 'student' && (
          <label className="field-label">Email profesor (opțional)
            <input
              type="email"
              value={form.teacherEmail}
              onChange={e => setField('teacherEmail', e.target.value)}
              placeholder="ex: profesor@email.com"
              className="field form-input"
            />
          </label>
        )}
        {form.role === 'teacher' && (
          <div>
            <label className="field-label">
              <span className="field-label-row">
                Cod de invitație
                <FieldStatus touched={Boolean(touched.inviteCode)} valid={fieldValid('inviteCode')} />
              </span>
              <input
                type="text"
                value={form.inviteCode}
                onChange={e => setField('inviteCode', e.target.value)}
                onBlur={() => markTouched('inviteCode')}
                placeholder="Codul primit de la administrator"
                autoComplete="off"
                className={`field form-input ${touched.inviteCode ? (fieldValid('inviteCode') ? 'field-valid' : 'field-invalid') : ''}`}
              />
            </label>
            <small className="field-hint">Conturile de profesor se creează doar prin invitație, pentru că au acces la analitica elevilor.</small>
          </div>
        )}
        {form.role === 'parent' && (
          <div>
            <label className="field-label">
              <span className="field-label-row">
                Email elev conectat
                <FieldStatus touched={Boolean(touched.parentEmail)} valid={fieldValid('parentEmail')} />
              </span>
              <input
                type="email"
                value={form.parentEmail}
                onChange={e => setField('parentEmail', e.target.value)}
                onBlur={() => markTouched('parentEmail')}
                placeholder="ex: elev@email.com"
                className={`field form-input ${touched.parentEmail ? (fieldValid('parentEmail') ? 'field-valid' : 'field-invalid') : ''}`}
              />
            </label>
            <small className="field-hint">Vei putea vedea analitica acestui cont și primi coduri de acces prin SMS, niciodată parola contului.</small>
          </div>
        )}

        {form.role === 'student' && (
          <label className={`consent-check ${touched.parentalConsent && !fieldValid('parentalConsent') ? 'consent-check-invalid' : ''}`}>
            <input
              type="checkbox"
              checked={form.parentalConsent}
              onChange={e => setField('parentalConsent', e.target.checked)}
              onBlur={() => markTouched('parentalConsent')}
            />
            <span>Un părinte sau tutore își dă acordul pentru crearea acestui cont de elev. <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Detalii în politica de confidențialitate</a>.</span>
          </label>
        )}

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
