import { useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import QuoteCard from './QuoteCard.jsx';

const LoginScreen = ({ onBack, onLogin, onForgotPassword }) => {
  const { t } = useI18n();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Autofill-ul scrie în DOM înainte să ajungă în starea React. Butonul
  // citește valoarea din câmp, altfel „Ai uitat parola?” se oprește.
  const usernameNow = () => String(emailRef.current?.value ?? email).trim();
  const passwordNow = () => String(passwordRef.current?.value ?? password);

  const submit = async (event) => {
    event.preventDefault();
    const name = usernameNow();
    const secret = passwordNow();
    if (!name) {
      setError(t('login.needEmail'));
      return;
    }
    if (!secret || loading) return;
    if (name !== email) setEmail(name);
    if (secret !== password) setPassword(secret);
    setError('');
    setLoading(true);
    const result = await onLogin({ email: name, password: secret });
    setLoading(false);
    if (result && !result.success) {
      setError(result.error || t('login.error'));
    }
  };

  return (
    <main className="form-page animate-fadeIn">
      <button onClick={onBack} className="back-link" type="button">
        <i className="fas fa-arrow-left"></i> {t('common.back')}
      </button>
      <img className="app-emblem form-emblem" src="/emblema.png" alt="Sunt de 10" />
      <div className="eyebrow">{t('login.eyebrow')}</div>
      <h1 className="display-font form-title">{t('login.title')}</h1>
      <p className="form-subtitle">{t('login.subtitle')}</p>
      <QuoteCard />

      <form className="form-fields" onSubmit={submit}>
        <label className="field-label">
          {t('login.email')}
          <input
            ref={emailRef}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            placeholder="numele tău de utilizator"
            className="field form-input"
            required
          />
        </label>
        <label className="field-label">
          {t('login.password')}
          <input
            ref={passwordRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder={t('login.passwordPlaceholder')}
            className="field form-input"
            required
          />
        </label>

        {error && (
          <div className="form-error" role="alert">
            <i className="fas fa-circle-exclamation"></i> {error}
          </div>
        )}

        <button type="submit" className="accent-button form-submit" disabled={loading}>
          {loading ? (
            t('login.submitting')
          ) : (
            <>
              {t('login.submit')} <i className="fas fa-arrow-right"></i>
            </>
          )}
        </button>
      </form>

      <button
        className="forgot-link"
        type="button"
        onClick={() => {
          const name = usernameNow();
          if (!name) {
            setError(t('login.needEmail'));
            return;
          }
          if (name !== email) setEmail(name);
          onForgotPassword(name);
        }}
      >
        {t('login.forgot')}
      </button>
      <p className="auth-legal">
        <a href="/confidentialitate" target="_blank" rel="noopener noreferrer">
          {t('auth.privacy')}
        </a>
        {' · '}
        <a href="/termeni" target="_blank" rel="noopener noreferrer">
          {t('auth.terms')}
        </a>
      </p>
    </main>
  );
};

export default LoginScreen;
