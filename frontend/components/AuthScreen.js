const AuthScreen = ({ onLogin, onRegisterRole }) => (
  <main className="auth-page animate-fadeIn">
    <div className="auth-intro">
      <div className="brand-mark auth-mark">M</div>
      <div className="eyebrow">Mentor AI / 03</div>
      <h1 className="display-font auth-title">Învață cu direcție.</h1>
      <p className="auth-subtitle">Un mentor personal care transformă întrebările tale în progres real.</p>
    </div>

    <div className="auth-panel">
      <div className="auth-panel-label">Alege tipul de cont</div>
      <div className="auth-role-grid">
        <button onClick={() => onRegisterRole('student')} className="ghost-button auth-role-card">
          <i className="fas fa-user-graduate"></i>
          <strong>Elev</strong>
          <span>Învață, acumulează monede și urmărește progresul.</span>
        </button>
        <button onClick={() => onRegisterRole('teacher')} className="ghost-button auth-role-card">
          <i className="fas fa-chalkboard-user"></i>
          <strong>Profesor</strong>
          <span>Folosește mentorul și vezi analizele clasei.</span>
        </button>
        <button onClick={() => onRegisterRole('parent')} className="ghost-button auth-role-card">
          <i className="fas fa-people-roof"></i>
          <strong>Părinte</strong>
          <span>Primești analitică și notificări despre elev.</span>
        </button>
      </div>
      <div className="auth-divider"><span>sau continuă cu emailul</span></div>
      <div className="auth-providers">
      <button onClick={() => onRegisterRole('student')} className="ghost-button auth-provider">
        <i className="fab fa-google text-[#ea4335]"></i> Continuă cu Google
      </button>
      <button onClick={() => onRegisterRole('student')} className="ghost-button auth-provider">
        <i className="fab fa-apple"></i> Continuă cu Apple
      </button>
      <button onClick={() => onRegisterRole('student')} className="ghost-button auth-provider">
        <i className="fab fa-microsoft text-[#00a4ef]"></i> Continuă cu Microsoft
      </button>
      </div>

      <div className="auth-divider"><span>sau folosește emailul</span></div>
      <button onClick={() => onRegisterRole('student')} className="accent-button auth-primary"><i className="fas fa-arrow-right"></i> Creează cont cu Email</button>
      <button onClick={onLogin} className="auth-login">Ai deja cont? <strong>Conectează-te</strong></button>
    </div>

    <p className="auth-legal">Prin continuare, accepți <a href="/terms.html" target="_blank" rel="noopener noreferrer">Termenii</a> și <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Politica de confidențialitate</a>.</p>
  </main>
);

window.AuthScreen = AuthScreen;
