import { useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { passwordHint } from '../passwordHint.js';

const ResetPasswordScreen = ({ token = '', onDone }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const result = await MentorAPI.resetPassword({ token, password });
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Linkul nu mai este valabil.');
      return;
    }
    setDone(true);
  };

  return (
    <main className="auth-page animate-fadeIn">
      <div className="eyebrow">Parolă nouă</div>
      <h1 className="display-font">Alege o parolă nouă.</h1>
      {done ? (
        <>
          <p>Parola a fost schimbată. Conectează-te cu ea. Sesiunile vechi s-au închis.</p>
          <button type="button" className="accent-button" onClick={onDone}>Mergi la conectare</button>
        </>
      ) : (
        <form onSubmit={submit}>
          <label>
            Parolă nouă
            <input
              type="password"
              className="field form-input"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </label>
          <p className={passwordHint(password).ok ? 'field-hint' : 'field-hint'}>{passwordHint(password).label}</p>
          {error ? <div className="form-error" role="alert">{error}</div> : null}
          <button type="submit" className="accent-button form-submit" disabled={loading || !passwordHint(password).ok}>
            {loading ? 'Se salvează…' : 'Salvează parola'}
          </button>
        </form>
      )}
    </main>
  );
};

export default ResetPasswordScreen;
