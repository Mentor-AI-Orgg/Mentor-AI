import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import QuoteCard from './QuoteCard.jsx';

const LoginScreen = ({ onBack, onLogin, onForgotPassword }) => {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim() && password && !loading;

  const submit = async event => {
    event.preventDefault();
    if (!canSubmit) return;
    setError('');
    setLoading(true);
    const result = await onLogin({ email: email.trim(), password });
    setLoading(false);
    if (result && !result.success) {
      setError(result.error || t('login.error'));
    }
  };

  return (
    <main className="form-page animate-fadeIn">
      <button onClick={onBack} className="back-link" type="button"><i className="fas fa-arrow-left"></i> {t('common.back')}</button>
      <div className="brand-mark form-mark">M</div>
      <div className="eyebrow">{t('login.eyebrow')}</div>
      <h1 className="display-font form-title">{t('login.title')}</h1>
      <p className="form-subtitle">{t('login.subtitle')}</p>
      <QuoteCard />

      <form className="form-fields" onSubmit={submit}>
        <label className="field-label">{t('login.email')}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
            placeholder="nume@email.com"
            className="field form-input"
            required
          />
        </label>
        <label className="field-label">{t('login.password')}
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder={t('login.passwordPlaceholder')}
            className="field form-input"
            required
          />
        </label>

        {error && <div className="form-error" role="alert"><i className="fas fa-circle-exclamation"></i> {error}</div>}

        <button type="submit" className="accent-button form-submit" disabled={!canSubmit}>
          {loading ? t('login.submitting') : <>{t('login.submit')} <i className="fas fa-arrow-right"></i></>}
        </button>
      </form>

      <button
        className="forgot-link"
        type="button"
        onClick={() => {
          if (!email.trim()) {
            setError(t('login.needEmail'));
            return;
          }
          onForgotPassword(email.trim());
        }}
      >
        {t('login.forgot')}
      </button>
      <p className="auth-legal">
        <a href="/privacy.html" target="_blank" rel="noopener noreferrer">{t('auth.privacy')}</a>
        {' · '}
        <a href="/terms.html" target="_blank" rel="noopener noreferrer">{t('auth.terms')}</a>
      </p>
    </main>
  );
};

export default LoginScreen;
