import QuoteCard from './QuoteCard.jsx';

const TRUST_LINE = 'Lecții originale, pe programă. Tu scrii. Nota e după predare. Părintele vede progresul.';

const STEPS = [
  { n: '1', title: 'Citești o lecție', text: 'Pe înțelesul tău, cu exemplu lucrat. Nu e copie din manual.' },
  { n: '2', title: 'Încerci singur', text: 'Test de 10 itemi sau flashcarduri A–D. Scrii tu. Nota vine la final.' },
  { n: '3', title: 'Vezi unde ai greșit', text: 'Apoi întrebi mentorul: îți explică altfel, nu îți face tema.' }
];

const FEATURES = [
  { icon: 'fa-book-open', title: 'Română și matematică', text: 'Clasele 5–8. Capitole, lecții, recapitulare.' },
  { icon: 'fa-clipboard-check', title: 'Teste și flashcarduri', text: 'De la ușor la greu. Itemii nu se repetă.' },
  { icon: 'fa-flag-checkered', title: 'Evaluare Națională', text: 'Începi testul, stai ca la examen, apoi vezi baremul. Părintele primește nota.' },
  { icon: 'fa-comments', title: 'Mentor când te blochezi', text: 'Îți dă primul pas și un exemplu nou. Nu îți dă rezolvarea gata.' }
];

const WelcomeScreen = ({ onConnect, onRegister }) => (
  <main className="welcome-page animate-fadeIn">
    <div className="welcome-mark" aria-hidden="true">M</div>
    <p className="welcome-slogan">{TRUST_LINE}</p>
    <h1 className="display-font welcome-title">Mentor AI</h1>
    <p className="welcome-lead">
      Aplicația ta de gimnaziu la <strong>română</strong> și <strong>matematică</strong>.
      Înveți, încerci, greșești, mai încerci, <strong className="welcome-succeed">reușești</strong>.
      Complet gratuit.
    </p>
    <QuoteCard />

    <p className="welcome-pitch">
      Nu e un chat care îți face tema. E un loc unde lucrezi tu, iar mentorul te ajută când te blochezi.
    </p>

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

    <p className="welcome-free">Fără abonament. Fără plăți. Magazinul folosește doar monede câștigate din învățare.</p>
    <p className="welcome-parent">Pentru părinți: elevul își face cont. Voi primiți pe email nota și ce a răspuns — fără cont și fără pagină în aplicație.</p>

    <button type="button" className="accent-button welcome-connect" onClick={onConnect}>
      Am deja cont <i className="fas fa-arrow-right" />
    </button>
    <button type="button" className="welcome-register" onClick={onRegister}>
      Prima dată aici? <strong>Creează contul</strong>
    </button>
  </main>
);

export default WelcomeScreen;
