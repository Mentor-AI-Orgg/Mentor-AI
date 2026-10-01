import HelpPanel from '../components/HelpPanel.jsx';

const HelpScreen = ({ onBack, onNavigate }) => (
  <main className="screen-page animate-fadeIn">
    <header className="screen-header">
      <button type="button" className="ghost-button" onClick={onBack}>Înapoi</button>
    </header>
    <HelpPanel heading="Cum funcționează" onNavigate={onNavigate} />
  </main>
);

export default HelpScreen;
