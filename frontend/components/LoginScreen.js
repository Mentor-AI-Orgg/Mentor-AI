const LoginScreen = ({ onBack, onLogin }) => (
  <main className="form-page animate-fadeIn">
    <button onClick={onBack} className="back-link"><i className="fas fa-arrow-left"></i> Înapoi</button>
    <div className="brand-mark form-mark">M</div>
    <div className="eyebrow">Bine ai revenit</div>
    <h1 className="display-font form-title">Intră în spațiul tău.</h1>
    <p className="form-subtitle">Continuă de unde ai rămas și păstrează-ți ritmul.</p>

    <div className="form-fields">
    <label className="field-label">Email sau telefon<input type="text" autoComplete="username" placeholder="nume@email.com" className="field form-input" /></label>
    <label className="field-label">Parolă<input type="password" autoComplete="current-password" placeholder="Parola ta" className="field form-input" /></label>
    </div>
    <button onClick={onLogin} className="accent-button form-submit">Conectează-te <i className="fas fa-arrow-right"></i></button>
    <button className="forgot-link">Ai uitat parola?</button>
  </main>
);

window.LoginScreen = LoginScreen;
