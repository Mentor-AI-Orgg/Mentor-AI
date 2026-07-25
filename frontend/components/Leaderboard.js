const { useEffect, useState } = React;

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

const LeaderboardRow = ({ entry }) => (
  <div className={`leaderboard-row ${entry.isCurrentUser ? 'is-current-user' : ''}`}>
    <div className={`leaderboard-rank ${entry.rank <= 3 ? `rank-${entry.rank}` : ''}`}>
      {RANK_ICONS[entry.rank] ? <i className={`fas ${RANK_ICONS[entry.rank]}`} /> : entry.rank}
    </div>
    <div className="leaderboard-avatar">{entry.initials || (entry.name || '?').charAt(0)}</div>
    <div className="leaderboard-row-copy">
      <strong>{entry.name}{entry.isCurrentUser && <span className="leaderboard-you-tag">Tu</span>}</strong>
      <small>{entry.class || `Nivel ${entry.level || 1}`} · streak {entry.streak || 0}z</small>
    </div>
    <div className="leaderboard-xp"><i className="fas fa-bolt" /> {entry.xp?.toLocaleString?.('ro-RO') || entry.xp}</div>
  </div>
);

const Leaderboard = ({ userData }) => {
  const [state, setState] = useState({ loading: true, entries: [], offline: false });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const result = await window.MentorAPI.getLeaderboard({
        limit: 8,
        name: userData?.name ? `${userData.name} ${userData.surname || ''}`.trim() : '',
        xp: userData?.xp || 0,
        streak: userData?.streak || 0,
        level: userData?.level || 1
      });
      if (cancelled) return;
      const entries = result.data || [];
      setState({ loading: false, entries, offline: result.fallback || entries.length === 0 });
    };
    load();
    return () => { cancelled = true; };
  }, [userData?.name, userData?.xp, userData?.streak, userData?.level]);

  return (
    <section className="leaderboard-card surface" aria-busy={state.loading}>
      <div className="leaderboard-head">
        <div>
          <div className="eyebrow">Clasament</div>
          <h3 className="display-font">Cei mai buni elevi</h3>
        </div>
        <i className="fas fa-ranking-star leaderboard-head-icon" />
      </div>

      {state.loading ? (
        <LeaderboardSkeleton />
      ) : state.offline ? (
        <>
          <div className="leaderboard-offline-note">
            <i className="fas fa-satellite-dish" /> Clasamentul e momentan indisponibil (server offline sau fără date). Se afișează un placeholder.
          </div>
          <LeaderboardSkeleton />
        </>
      ) : (
        <div className="leaderboard-list">
          {state.entries.map(entry => <LeaderboardRow key={entry.id || entry.rank} entry={entry} />)}
        </div>
      )}
    </section>
  );
};

window.Leaderboard = Leaderboard;
