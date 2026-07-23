const OnboardingScreen = ({ step, total, title, desc, options, selected, onSelect, onNext, onBack, isLast, progress }) => (
  <main className="onboarding-page animate-fadeIn">
    <div className="onboarding-topline"><span>CONFIGURARE</span><span>{String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}</span></div>
    <div className="onboarding-progress"><div style={{ width: `${progress}%` }}></div></div>
    <div className="onboarding-copy">
      <div className="eyebrow">Pasul {step} din {total}</div>
      <h1 className="display-font onboarding-title">{title}</h1>
      <p className="form-subtitle">{desc}</p>
    </div>
    <div className="onboarding-options">
      {options.map(option => (
        <button key={option.value} onClick={() => onSelect(option.value)} className={`onboarding-option ${selected === option.value ? 'selected' : ''}`} aria-pressed={selected === option.value}>
          <div className="onboarding-option-icon"><i className={`fas ${option.icon}`} /></div>
          <div className="onboarding-option-copy">
            <div className="onboarding-option-label">{option.label}</div>
            <div className="onboarding-option-hint">Personalizat pentru ritmul tău</div>
          </div>
          <div className="onboarding-check"><i className="fas fa-check" /></div>
        </button>
      ))}
    </div>

    <div className="onboarding-actions">
      <div className="onboarding-action-row">
        {step > 1 && (
          <button onClick={onBack} className="ghost-button onboarding-back"><i className="fas fa-arrow-left" /> Înapoi</button>
        )}
        <button onClick={onNext} disabled={!selected} className="accent-button onboarding-next">
          {isLast ? 'Începe călătoria' : 'Continuă'} <i className="fas fa-arrow-right" />
        </button>
      </div>
    </div>
  </main>
);

window.OnboardingScreen = OnboardingScreen;
