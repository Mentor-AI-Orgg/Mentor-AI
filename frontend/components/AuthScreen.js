const AuthScreen = ({ onLogin, onRegister }) => (
  <main className="auth-page animate-fadeIn">
    <div className="auth-intro">
      <div className="brand-mark auth-mark">M</div>
      <div className="eyebrow">Mentor AI / 03</div>
      <h1 className="display-font auth-title">Învață cu direcție.</h1>
      <p className="auth-subtitle">Un mentor personal care transformă întrebările tale în progres real.</p>
    </div>

    <div className="auth-panel">
      <div className="auth-panel-label">Începe în câteva secunde</div>
      <div className="auth-providers">
      <button onClick={onRegister} className="ghost-button auth-provider">
        <i className="fab fa-google text-[#ea4335]"></i> Continuă cu Google
      </button>
      <button onClick={onRegister} className="ghost-button auth-provider">
        <i className="fab fa-apple"></i> Continuă cu Apple
      </button>
      <button onClick={onRegister} className="ghost-button auth-provider">
        <i className="fab fa-microsoft text-[#00a4ef]"></i> Continuă cu Microsoft
      </button>
      </div>

      <div className="auth-divider"><span>sau folosește emailul</span></div>
      <button onClick={onRegister} className="accent-button auth-primary"><i className="fas fa-arrow-right"></i> Creează cont cu Email</button>
      <button onClick={onLogin} className="auth-login">Ai deja cont? <strong>Conectează-te</strong></button>
    </div>

    <p className="auth-legal">Prin continuare, accepți <a href="#">Termenii</a> și <a href="#">Politica de confidențialitate</a>.</p>
  </main>
);

window.AuthScreen = AuthScreen;
