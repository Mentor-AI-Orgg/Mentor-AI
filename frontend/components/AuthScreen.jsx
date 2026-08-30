import { useI18n } from '../i18n/index.jsx';

const AuthScreen = ({ onLogin, onRegister }) => {
  const { t } = useI18n();
  return (
    <main className="auth-page animate-fadeIn">
      <div className="auth-intro">
        <div className="brand-mark auth-mark">M</div>
        <div className="eyebrow">{t('auth.eyebrow')}</div>
        <h1 className="display-font auth-title">{t('auth.title')}</h1>
        <p className="auth-subtitle">{t('auth.subtitle')}</p>
      </div>

      <div className="auth-panel">
        <div className="auth-panel-label">{t('auth.studentsOnly')}</div>
        <p className="auth-parent-note">{t('auth.parentEmailNote')}</p>
        <div className="auth-providers">
        <button onClick={onRegister} className="ghost-button auth-provider">
          <i className="fab fa-google text-[#ea4335]"></i> {t('auth.google')}
        </button>
        <button onClick={onRegister} className="ghost-button auth-provider">
          <i className="fab fa-apple"></i> {t('auth.apple')}
        </button>
        <button onClick={onRegister} className="ghost-button auth-provider">
          <i className="fab fa-microsoft text-[#00a4ef]"></i> {t('auth.microsoft')}
        </button>
        </div>

        <div className="auth-divider"><span>{t('auth.orUseEmail')}</span></div>
        <button onClick={onRegister} className="accent-button auth-primary"><i className="fas fa-arrow-right"></i> {t('auth.createEmail')}</button>
        <button onClick={onLogin} className="auth-login">{t('auth.haveAccount')} <strong>{t('auth.signIn')}</strong></button>
      </div>

      <p className="auth-legal">{t('auth.legal')} <a href="/terms.html" target="_blank" rel="noopener noreferrer">{t('auth.terms')}</a> · <a href="/privacy.html" target="_blank" rel="noopener noreferrer">{t('auth.privacy')}</a>.</p>
    </main>
  );
};

export default AuthScreen;
