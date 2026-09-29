import legal from '@shared/legal.json';

/** Link de contact doar când operatorul a pus un email adevărat în shared/legal.json. */
export function contactLink(email) {
  const value = String(email || '').trim();
  if (!value.includes('@') || value.startsWith('[')) return null;
  return `mailto:${value}`;
}

const FEATURES = [
  {
    icon: 'fa-book-open',
    title: 'Lecții pe capitole',
    text: 'Fiecare capitol din programa școlară, explicat pe înțelesul tău.'
  },
  {
    icon: 'fa-pen',
    title: 'Exerciții cu explicații',
    text: 'Încerci singur. Dacă greșești, vezi de ce și mai încerci.'
  },
  {
    icon: 'fa-flag-checkered',
    title: 'Evaluarea Națională',
    text: 'Pregătire pentru clasa a VIII-a, în ritmul tău.'
  },
  {
    icon: 'fa-heart',
    title: 'Puțin în fiecare zi',
    text: 'Puțin în fiecare zi te duce departe.'
  }
];

const STEPS = [
  { n: '1', title: 'Îți faci cont', text: 'Cu un nume de utilizator. Fără emailul tău.' },
  { n: '2', title: 'Părintele confirmă', text: 'Primește un email și confirmă contul.' },
  { n: '3', title: 'Înveți pas cu pas', text: 'În ritmul tău, lecție cu lecție.' }
];

const FAQ = [
  { q: 'E gratuit?', a: 'Da. Nu cerem bani și nu punem reclame.' },
  { q: 'De ce trebuie emailul părintelui?', a: 'Ca să confirme contul. Tu nu îți pui adresa de email.' },
  { q: 'Merge pe telefon?', a: 'Da. Poți învăța de pe telefon sau de pe calculator.' },
  { q: 'Ce clase acoperă?', a: 'Matematică și română, pentru clasele V–VIII.' },
  {
    q: 'Cine îmi poate șterge datele?',
    a: 'Părintele confirmă contul și poate cere oricând ștergerea datelor.'
  }
];

const WelcomeScreen = ({ onConnect, onRegister, onParent }) => {
  const contact = contactLink(legal.contactEmail);

  return (
    <main className="welcome-page animate-fadeIn">
      <header className="welcome-top">
        <p className="welcome-logo display-font" aria-label="Sunt de 10">
          <span className="welcome-logo-word">SUNT</span>
          <span className="welcome-logo-ten">10</span>
        </p>
        <nav className="welcome-nav" aria-label="Cont">
          <button type="button" className="ghost-button welcome-nav-login" onClick={onConnect}>
            Intră în cont
          </button>
          <button type="button" className="accent-button welcome-nav-signup" onClick={onRegister}>
            Creează cont
          </button>
          <button type="button" className="welcome-nav-parent" onClick={onParent}>
            Sunt părinte
          </button>
        </nav>
      </header>

      <section className="welcome-hero" aria-labelledby="welcome-hero-title">
        <h1 id="welcome-hero-title" className="display-font welcome-title">
          Mate și română pentru clasele V–VIII, pe înțelesul tău
        </h1>
        <p className="welcome-lead">
          Lecții după programa școlară, exerciții și un tutore care te ajută pas cu pas. Gratuit.
        </p>
        {/* Loc rezervat pentru furnicuță, starea salut. Etapa 2 o desenează aici. */}
        <div className="welcome-mascot-slot" data-mascot-mood="salut" aria-hidden="true" />
        <button type="button" className="accent-button welcome-start" onClick={onRegister}>
          Începe gratuit
        </button>
      </section>

      <section className="welcome-block" aria-labelledby="welcome-find">
        <h2 id="welcome-find">Ce găsești aici</h2>
        <ul className="welcome-features">
          {FEATURES.map(item => (
            <li key={item.title}>
              <i className={`fas ${item.icon}`} aria-hidden="true" />
              <span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="welcome-block" aria-labelledby="welcome-how">
        <h2 id="welcome-how">Cum funcționează</h2>
        <ol className="welcome-steps">
          {STEPS.map(step => (
            <li key={step.n}>
              <span className="welcome-step-n" aria-hidden="true">{step.n}</span>
              <span>
                <strong>{step.title}</strong>
                <small>{step.text}</small>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="welcome-block" aria-labelledby="welcome-parents-title">
        <h2 id="welcome-parents-title">Pentru părinți</h2>
        <p>
          Gratuit, fără reclame. Nu vindem datele. Profilurile sunt private din start.
          Părintele confirmă contul și poate cere oricând ștergerea datelor.
        </p>
        <p className="welcome-legal-links">
          <a href="/confidentialitate">Politica de confidențialitate</a>
          <a href="/termeni">Termeni</a>
        </p>
      </section>

      <section className="welcome-block" aria-labelledby="welcome-faq-title">
        <h2 id="welcome-faq-title">Întrebări frecvente</h2>
        <div className="welcome-faq">
          {FAQ.map(item => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="welcome-footer">
        <button type="button" className="accent-button welcome-start" onClick={onRegister}>
          Începe gratuit
        </button>
        <nav className="welcome-footer-links" aria-label="Informații">
          <a href="/confidentialitate">Confidențialitate</a>
          <a href="/termeni">Termeni</a>
          {contact ? <a href={contact}>Contact</a> : null}
        </nav>
      </footer>
    </main>
  );
};

export default WelcomeScreen;
