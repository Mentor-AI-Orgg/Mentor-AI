import { dailySlogan } from '../slogans.js';

const FEATURES = [
  { icon: 'fa-book-open', title: 'Lecții pe capitole', text: 'Română și mate, 5–8, pe înțelesul tău.' },
  { icon: 'fa-clipboard-check', title: 'Teste cât vrei', text: 'După fiecare lecție, un test nou până prinzi tot capitolul.' },
  { icon: 'fa-layer-group', title: 'Flashcarduri cu 4 variante', text: 'Teorie. Alegi. Vezi instant dacă ai nimerit.' },
  { icon: 'fa-comments', title: 'Mentor la nevoie', text: 'Îți explică altfel, mai pe îndelete, cu alt exemplu.' }
];

const WelcomeScreen = ({ onConnect, onRegister }) => (
  <main className="welcome-page animate-fadeIn">
    <div className="welcome-mark" aria-hidden="true">M</div>
    <p className="welcome-slogan">{dailySlogan()}</p>
    <h1 className="display-font welcome-title">Mentor AI</h1>
    <p className="welcome-lead">Gimnaziu, română și matematică. Înveți, încerci, greșești, mai încerci. Fără abonament.</p>
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
    <button type="button" className="accent-button welcome-connect" onClick={onConnect}>
      Conectare <i className="fas fa-arrow-right" />
    </button>
    <button type="button" className="welcome-register" onClick={onRegister}>
      N-ai cont? <strong>Creează-l aici</strong>
    </button>
  </main>
);

export default WelcomeScreen;
