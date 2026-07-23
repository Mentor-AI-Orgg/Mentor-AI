const { useState } = React;

const RegisterScreen = ({ onBack, onContinue, onValidationError }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', school: '', class: '', password: '' });

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      const message = 'Completează numele și emailul!';
      if (onValidationError) onValidationError(message);
      else alert(message);
      return;
    }
    onContinue(form);
  };

  return (
    <main className="form-page animate-fadeIn">
      <button onClick={onBack} className="back-link"><i className="fas fa-arrow-left"></i> Înapoi</button>
      <div className="brand-mark form-mark">M</div>
      <div className="eyebrow">Profilul tău de învățare</div>
      <h1 className="display-font form-title">Hai să te cunoaștem.</h1>
      <p className="form-subtitle">Câteva detalii ne ajută să-ți construim un ritm potrivit.</p>

      <div className="form-fields">
        {[
          { key: 'name', label: 'Nume complet', type: 'text', placeholder: 'Ex: Andrei Popescu', autoComplete: 'name' },
          { key: 'phone', label: 'Număr de telefon', type: 'tel', placeholder: '07xx xxx xxx', autoComplete: 'tel' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'nume@email.com', autoComplete: 'email' },
          { key: 'school', label: 'Școala / Liceul', type: 'text', placeholder: 'Liceul Teoretic „Mihai Eminescu”', autoComplete: 'off' },
          { key: 'class', label: 'Clasa', type: 'text', placeholder: 'Ex: a XII-a A', autoComplete: 'off' },
          { key: 'password', label: 'Parolă', type: 'password', placeholder: 'Minim 8 caractere', autoComplete: 'new-password' }
        ].map(field => (
          <div key={field.key}>
            <label className="field-label">{field.label}
            <input
              type={field.type}
              value={form[field.key]}
              onChange={e => setForm({ ...form, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              className="field form-input"
              minLength={field.key === 'password' ? 8 : undefined}
              required={field.key === 'name' || field.key === 'email'}
            />
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="accent-button form-submit">Continuă <i className="fas fa-arrow-right"></i></button>
    </main>
  );
};

window.RegisterScreen = RegisterScreen;
