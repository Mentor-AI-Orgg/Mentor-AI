import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { MASCOT_NAME } from '../config/mascot.js';
import { MASCOT_MESSAGES } from '../i18n/mascotMessages.js';
import Mascota, { MOODS } from '../components/mascot/Mascota.jsx';
import HelpPanel from '../components/HelpPanel.jsx';

const THEMES = [
  { id: 'dark', label: 'Temă închisă' },
  { id: 'light', label: 'Temă deschisă' }
];

const CreatorMascotScreen = () => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    let cancelled = false;
    MentorAPI.creatorStatus().then(pack => {
      if (!cancelled) setAllowed(Boolean(pack.success));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (allowed === null) {
    return <main className="screen-page"><p>Se verifică accesul de creator…</p></main>;
  }

  if (!allowed) {
    return (
      <main className="screen-page">
        <h1 className="display-font screen-title">Pagina e doar pentru creator.</h1>
        <p>Intră mai întâi pe /creator, cu parola de previzualizare.</p>
      </main>
    );
  }

  return (
    <main className="screen-page animate-fadeIn creator-mascot">
      <header className="screen-header">
        <div className="eyebrow">Creator</div>
        <h1 className="display-font screen-title">{MASCOT_NAME}</h1>
        <p>
          Numele de acum este {MASCOT_NAME}. Ca să-l schimbi, editează
          {' '}
          <code>shared/mascot.json</code>
          {' '}
          și repornește aplicația.
        </p>
      </header>
      {THEMES.map(theme => (
        <section key={theme.id} className="theme-stage" data-theme={theme.id}>
          <h2 className="display-font">{theme.label}</h2>
          <div className="mood-grid">
            {MOODS.map(mood => (
              <figure key={`${theme.id}-${mood}`}>
                <div className="mood-pair">
                  <Mascota mood={mood} size="lg" />
                  <Mascota mood={mood} size="sm" />
                </div>
                <figcaption>{mood} · 240 px și 32 px</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
      <section className="surface help-article">
        <h2 className="display-font">Câte un mesaj din fiecare categorie</h2>
        <ul className="mission-list">
          {Object.entries(MASCOT_MESSAGES).map(([id, pack]) => (
            <li key={id}>
              <strong>{id}</strong>
              {' · '}
              {pack.mood}
              {': '}
              {pack.lines[0]}
            </li>
          ))}
        </ul>
      </section>
      <HelpPanel heading="Panoul de ajutor, așa cum îl vede copilul" />
    </main>
  );
};

export default CreatorMascotScreen;
