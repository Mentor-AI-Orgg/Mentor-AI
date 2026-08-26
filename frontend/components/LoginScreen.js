const { useState } = React;

const LoginScreen = ({ onBack, onLogin, onForgotPassword }) => {
  // Câmpurile erau complet nelegate de state: fără `value`, fără `onChange`,
  // iar butonul loga necondiționat, orice scriai. Acum formularul trimite
  // efectiv credențialele către /api/auth/login.
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
    // La succes, componenta părinte schimbă ecranul; aici tratăm doar eșecul.
    if (result && !result.success) {
      setError(result.error || 'Email sau parolă incorecte.');
    }
  };

  return (
    <main className="form-page animate-fadeIn">
      <button onClick={onBack} className="back-link" type="button"><i className="fas fa-arrow-left"></i> Înapoi</button>
      <div className="brand-mark form-mark">M</div>
      <div className="eyebrow">Bine ai revenit</div>
      <h1 className="display-font form-title">Intră în spațiul tău.</h1>
      <p className="form-subtitle">Continuă de unde ai rămas și păstrează-ți ritmul.</p>

      <form className="form-fields" onSubmit={submit}>
        <label className="field-label">Email
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
        <label className="field-label">Parolă
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Parola ta"
            className="field form-input"
            required
          />
        </label>

        {error && <div className="form-error" role="alert"><i className="fas fa-circle-exclamation"></i> {error}</div>}

        <button type="submit" className="accent-button form-submit" disabled={!canSubmit}>
          {loading ? 'Se conectează...' : <>Conectează-te <i className="fas fa-arrow-right"></i></>}
        </button>
      </form>

      <button className="forgot-link" type="button" onClick={() => onForgotPassword(email.trim())}>
        Ai uitat parola?
      </button>
      <p className="auth-legal">
        <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Politica de confidențialitate</a>
        {' · '}
        <a href="/terms.html" target="_blank" rel="noopener noreferrer">Termeni</a>
      </p>
    </main>
  );
};

window.LoginScreen = LoginScreen;
