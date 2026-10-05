import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import ReportButton from './ReportButton.jsx';

const LeaderboardSkeleton = () => (
  <div className="leaderboard-list" aria-hidden="true">
    {[0, 1, 2, 3, 4].map(i => (
      <div className="leaderboard-row leaderboard-row-skeleton" key={i}>
        <div className="skeleton skeleton-avatar"></div>
        <div className="leaderboard-row-copy">
          <div className="skeleton skeleton-line medium"></div>
          <div className="skeleton skeleton-line short"></div>
        </div>
        <div className="skeleton skeleton-pill"></div>
      </div>
    ))}
  </div>
);

const RANK_ICONS = { 1: 'fa-trophy', 2: 'fa-medal', 3: 'fa-award' };

const LeaderboardRow = ({ entry }) => {
  const locked = Boolean(entry.private);
  const emoji = !locked && entry.avatarEmoji ? entry.avatarEmoji : '';
  const badges = locked ? [] : (Array.isArray(entry.badges) ? entry.badges.slice(0, 2) : []);
  return (
    <div className={`leaderboard-row ${entry.isCurrentUser ? 'is-current-user' : ''}`}>
      <div className={`leaderboard-rank ${entry.rank <= 3 ? `rank-${entry.rank}` : ''}`}>
        {RANK_ICONS[entry.rank] ? <i className={`fas ${RANK_ICONS[entry.rank]}`} /> : entry.rank}
      </div>
      <div className={`leaderboard-avatar ${emoji ? 'is-emoji' : ''} ${locked ? 'is-lock' : ''}`} aria-hidden="true">
        {locked ? <i className="fas fa-lock" /> : (emoji || entry.initials || (entry.name || '?').charAt(0))}
      </div>
      <div className="leaderboard-row-copy">
        <strong>{locked ? 'Profil privat' : entry.name}{!locked && entry.title ? ` · ${entry.titleEmoji || ''} ${entry.title}` : ''}{entry.isCurrentUser && <span className="leaderboard-you-tag">Tu</span>}</strong>
        {badges.length > 0 && (
          <span className="leaderboard-badges">
            {badges.map(badge => (
              <span key={badge.id || badge.label} className={`leaderboard-badge badge-${badge.id || 'play'}`}>{badge.label}</span>
            ))}
          </span>
        )}
        <small>{locked ? 'Loc și punctaj' : (entry.class || `Nivel ${entry.level || 1}`)}{locked ? '' : ` · streak ${entry.streak || 0}z`}</small>
      </div>
      <div className="leaderboard-xp"><i className="fas fa-bolt" /> {entry.xp?.toLocaleString?.('ro-RO') || entry.xp}</div>
      {!entry.isCurrentUser && !locked && <ReportButton userId={entry.id} />}
    </div>
  );
};

const Leaderboard = () => {
  const [state, setState] = useState({ loading: true, entries: [], offline: false });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const result = await MentorAPI.getLeaderboard({ limit: 8 });
      if (cancelled) return;
      const entries = result.data || [];
      setState({ loading: false, entries, offline: Boolean(result.fallback) });
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="leaderboard-card surface" aria-busy={state.loading}>
      <div className="leaderboard-head">
        <div>
          <div className="eyebrow">Clasament · tot timpul</div>
          <h3 className="display-font">După XP, fără reset</h3>
        </div>
        <i className="fas fa-ranking-star leaderboard-head-icon" />
      </div>

      {state.loading ? (
        <LeaderboardSkeleton />
      ) : state.offline ? (
        <>
          <div className="leaderboard-offline-note">
            <i className="fas fa-satellite-dish" /> Clasamentul e momentan indisponibil (server offline).
          </div>
          <LeaderboardSkeleton />
        </>
      ) : state.entries.length === 0 ? (
        <div className="leaderboard-offline-note">
          <i className="fas fa-users" /> Nu sunt încă elevi în clasament. XP-ul vine din activitate, iar numele afișat este un pseudonim.
        </div>
      ) : (
        <div className="leaderboard-list">
          {state.entries.map(entry => <LeaderboardRow key={entry.id || entry.rank} entry={entry} />)}
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
