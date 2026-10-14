import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const ZONE_LABEL = { up: 'Urcă', down: 'Coboară', stay: 'Rămâne' };

const LeagueScreen = ({ onNavigate }) => {
  const [board, setBoard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    MentorAPI.getLeague().then(result => {
      if (!alive) return;
      if (!result.success || !result.data) {
        setError(result.error || 'Nu am putut deschide liga.');
        return;
      }
      setBoard(result.data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const tierNote = board?.tierId === 'diamant'
    ? 'Din Diamant nu se mai urcă.'
    : (board?.tierId === 'bronz' ? 'Din Bronz nu se coboară.' : '');

  return (
    <main className="home-page daily-page">
      <button type="button" className="ghost-button" onClick={() => onNavigate('home')}>Înapoi acasă</button>
      {!board && !error && <p className="daily-lead">Se deschide liga…</p>}
      {error && <p className="guide-error" role="alert">{error}</p>}
      {board && (
        <section className="streak-hero" aria-label="Liga săptămânii">
          <p className="eyebrow">Liga săptămânii</p>
          <h1 className="display-font daily-title">{board.tier}</h1>
          <p className="daily-lead">{board.daysLabel}. XP-ul tău săptămâna asta: {board.weekXp}.</p>
          <p className="daily-lead">Primele 5 urcă săptămâna viitoare. Ultimele 5 coboară, dar nu sub Bronz.</p>
          {tierNote && <p className="daily-lead">{tierNote}</p>}
          {!board.joined && <p className="daily-lead">{board.message}</p>}
          {board.joined && (
            <ol className="rank-list">
              {(board.rows || []).map(row => (
                <li key={`${row.place}-${row.nickname}`} className={`league-row is-${row.zone}${row.self ? ' is-self' : ''}`}>
                  <span className="league-name">{row.place}. {row.nickname}{row.self ? ' (tu)' : ''}</span>
                  <span className="league-meta">{row.xp} XP · {ZONE_LABEL[row.zone] || 'Rămâne'}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}
    </main>
  );
};

export default LeagueScreen;
