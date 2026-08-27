import { useI18n } from '../i18n/index.jsx';

const AuthScreen = ({ onLogin, onRegisterRole }) => {
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
        <div className="auth-panel-label">{t('auth.chooseRole')}</div>
        <div className="auth-role-grid">
          <button onClick={() => onRegisterRole('student')} className="ghost-button auth-role-card">
            <i className="fas fa-user-graduate"></i>
            <strong>{t('common.student')}</strong>
            <span>{t('auth.studentDesc')}</span>
          </button>
          <button onClick={() => onRegisterRole('teacher')} className="ghost-button auth-role-card">
            <i className="fas fa-chalkboard-user"></i>
            <strong>{t('common.teacher')}</strong>
            <span>{t('auth.teacherDesc')}</span>
          </button>
          <button onClick={() => onRegisterRole('parent')} className="ghost-button auth-role-card">
            <i className="fas fa-people-roof"></i>
            <strong>{t('common.parent')}</strong>
            <span>{t('auth.parentDesc')}</span>
          </button>
        </div>
        <div className="auth-divider"><span>{t('auth.orEmail')}</span></div>
        <div className="auth-providers">
        <button onClick={() => onRegisterRole('student')} className="ghost-button auth-provider">
          <i className="fab fa-google text-[#ea4335]"></i> {t('auth.google')}
        </button>
        <button onClick={() => onRegisterRole('student')} className="ghost-button auth-provider">
          <i className="fab fa-apple"></i> {t('auth.apple')}
        </button>
        <button onClick={() => onRegisterRole('student')} className="ghost-button auth-provider">
          <i className="fab fa-microsoft text-[#00a4ef]"></i> {t('auth.microsoft')}
        </button>
        </div>

        <div className="auth-divider"><span>{t('auth.orUseEmail')}</span></div>
        <button onClick={() => onRegisterRole('student')} className="accent-button auth-primary"><i className="fas fa-arrow-right"></i> {t('auth.createEmail')}</button>
        <button onClick={onLogin} className="auth-login">{t('auth.haveAccount')} <strong>{t('auth.signIn')}</strong></button>
      </div>

      <p className="auth-legal">{t('auth.legal')} <a href="/terms.html" target="_blank" rel="noopener noreferrer">{t('auth.terms')}</a> · <a href="/privacy.html" target="_blank" rel="noopener noreferrer">{t('auth.privacy')}</a>.</p>
    </main>
  );
};

export default AuthScreen;
