import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const numberFormat = new Intl.NumberFormat('ro-RO');
const percentFormat = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 1 });

function formatCount(value) {
  return numberFormat.format(Number(value) || 0);
}

export default function OwnerStatsScreen({ onBack }) {
  const [state, setState] = useState({ status: 'loading', stats: null });

  useEffect(() => {
    let cancelled = false;
    MentorAPI.adminStats().then((result) => {
      if (cancelled) return;
      if (!result.success) {
        setState({ status: 'denied', stats: null });
        return;
      }
      setState({ status: 'ready', stats: result.data });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === 'loading') {
    return (
      <main className="screen-page">
        <p>Se încarcă numerele…</p>
      </main>
    );
  }

  if (state.status !== 'ready' || !state.stats) {
    return (
      <main className="screen-page">
        <h1 className="display-font screen-title">Pagina e doar pentru creator.</h1>
        <p>Intră mai întâi pe /creator, cu parola de previzualizare.</p>
      </main>
    );
  }

  const stats = state.stats;
  const retention = stats.retention || {};
  const retentionText =
    retention.percent == null
      ? 'Încă nu sunt conturi create de cel puțin 7 zile.'
      : `${percentFormat.format(retention.percent)}% din conturile create de cel puțin 7 zile au fost active în ultimele 7 zile.`;

  return (
    <main className="screen-page animate-fadeIn">
      <header className="screen-header">
        <div className="eyebrow">Creator</div>
        <h1 className="display-font screen-title">Câți folosesc aplicația</h1>
        <p>Doar numere. Fără nume și fără emailuri.</p>
        {onBack && (
          <button type="button" className="ghost-button" onClick={onBack}>
            Înapoi la moderare
          </button>
        )}
      </header>
      <section className="mx-5 grid gap-3">
        <article className="surface rounded-3xl p-4">
          <h2 className="display-font">Conturi</h2>
          <p>
            Total <strong>{formatCount(stats.total)}</strong>
          </p>
          <p>
            Elevi <strong>{formatCount(stats.students)}</strong>
          </p>
          <p>
            Părinți <strong>{formatCount(stats.parents)}</strong>
          </p>
          {stats.other > 0 && (
            <p>
              Altele <strong>{formatCount(stats.other)}</strong>
            </p>
          )}
        </article>
        <article className="surface rounded-3xl p-4">
          <h2 className="display-font">Conturi noi</h2>
          <p>
            Azi <strong>{formatCount(stats.newAccounts?.today)}</strong>
          </p>
          <p>
            Ultimele 7 zile <strong>{formatCount(stats.newAccounts?.days7)}</strong>
          </p>
          <p>
            Ultimele 30 de zile <strong>{formatCount(stats.newAccounts?.days30)}</strong>
          </p>
        </article>
        <article className="surface rounded-3xl p-4">
          <h2 className="display-font">Activi</h2>
          <p>
            Azi <strong>{formatCount(stats.active?.today)}</strong>
          </p>
          <p>
            7 zile <strong>{formatCount(stats.active?.days7)}</strong>
          </p>
          <p>
            30 de zile <strong>{formatCount(stats.active?.days30)}</strong>
          </p>
        </article>
        <article className="surface rounded-3xl p-4">
          <h2 className="display-font">Revin</h2>
          <p>
            Conturi create de mai mult de o zi și active în ultimele 7 zile:{' '}
            <strong>{formatCount(stats.returning)}</strong>
          </p>
          <p>{retentionText}</p>
        </article>
        <p>{stats.activityNote}</p>
      </section>
    </main>
  );
}
