import { useEffect, useState } from 'react';
import Mascota from './mascot/Mascota.jsx';

const FEATURES = [
  { icon: 'fa-book-open', title: 'Lecții pe programă', text: 'Câte un capitol, pe înțelesul tău, la română și la matematică.' },
  { icon: 'fa-clipboard-check', title: 'Exerciții cu explicații', text: 'Încerci singur. Dacă greșești, vezi de ce, pas cu pas.' },
  { icon: 'fa-flag-checkered', title: 'Evaluare Națională', text: 'La clasa a VIII-a te poți antrena pe subiecte în format de examen.' },
  { icon: 'fa-shoe-prints', title: 'Puțin în fiecare zi', text: 'Puțin în fiecare zi te duce departe.' }
];

const STEPS = [
  { n: '1', title: 'Îți faci cont', text: 'Cu un nume de utilizator. Nu cu numele tău real.' },
  { n: '2', title: 'Părintele confirmă', text: 'Primește un email și apasă pe link.' },
  { n: '3', title: 'Înveți în ritmul tău', text: 'Lecție cu lecție, fără grabă.' }
];

const QUESTIONS = [
  { q: 'E gratuit?', a: 'Da. Nu sunt reclame și nu există abonament.' },
  { q: 'De ce trebuie emailul părintelui?', a: 'Ca să confirme contul. Fără confirmare poți citi lecțiile, dar nu poți folosi prietenii sau clasamentul.' },
  { q: 'Merge pe telefon?', a: 'Da. O deschizi în browser, pe telefon sau pe calculator.' },
  { q: 'Ce clase acoperă?', a: 'Clasele V–VIII, română și matematică.' },
  { q: 'Cine îmi vede numele?', a: 'Profilul e privat din start. Alți copii nu îți văd numele până nu alegi tu altfel.' }
];

const WelcomeScreen = ({ onConnect, onRegister, onParent }) => {
  const [contact, setContact] = useState('');

  useEffect(() => {
    let alive = true;
    fetch('/api/legal-contact')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (alive && data && typeof data.contact === 'string') setContact(data.contact.trim());
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return (
    <main className="welcome-page animate-fadeIn">
      <header className="welcome-bar">
        <strong className="display-font">Sunt de 10</strong>
        <nav className="welcome-nav" aria-label="Intrare">
          <button type="button" className="ghost-button" onClick={onConnect}>Intră în cont</button>
          <button type="button" className="ghost-button" onClick={onRegister}>Creează cont</button>
          <button type="button" className="ghost-button" onClick={onParent}>Sunt părinte</button>
        </nav>
      </header>

      <section className="welcome-hero">
        <div className="welcome-mark" aria-hidden="true">10</div>
        <h1 className="display-font welcome-title">Mate și română pentru clasele V–VIII, pe înțelesul tău</h1>
        <p className="welcome-lead">Lecții după programa școlară, exerciții și un tutore care te ajută pas cu pas. Gratuit.</p>
        <div className="welcome-mascot-slot"><Mascota mood="salut" size="lg" /></div>
        <button type="button" className="accent-button welcome-connect" onClick={onRegister}>Începe gratuit</button>
      </section>

      <section>
        <h2 className="display-font welcome-section-title">Ce găsești</h2>
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

      <section>
        <h2 className="display-font welcome-section-title">Cum funcționează</h2>
        <ol className="welcome-steps" aria-label="Cum funcționează">
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

      <section className="welcome-parent">
        <h2 className="display-font welcome-section-title">Pentru părinți</h2>
        <p>E gratuit, fără reclame. Nu vindem date. Profilurile sunt private din start. Părintele confirmă contul și poate cere oricând ștergerea datelor.</p>
        <p>
          <a href="/privacy.html">Politica de confidențialitate</a>
          {' · '}
          <a href="/terms.html">Termeni</a>
        </p>
      </section>

      <section>
        <h2 className="display-font welcome-section-title">Întrebări frecvente</h2>
        {QUESTIONS.map(item => (
          <details key={item.q} className="welcome-faq">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>

      <button type="button" className="accent-button welcome-connect" onClick={onRegister}>Începe gratuit</button>
      <footer className="welcome-foot">
        <a href="/privacy.html">Confidențialitate</a>
        <a href="/terms.html">Termeni</a>
        {contact ? <a href={contact.includes('@') ? `mailto:${contact}` : '/privacy.html'}>{contact}</a> : <a href="/privacy.html">Contact</a>}
      </footer>
    </main>
  );
};

export default WelcomeScreen;
