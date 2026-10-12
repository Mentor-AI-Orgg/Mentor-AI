import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

export default function ModerationScreen({ onOpenStats }) {
  const [state, setState] = useState({ reports: [], log: [], error: '' });

  async function load() {
    const result = await MentorAPI.moderationReports();
    if (!result.success) {
      setState({ reports: [], log: [], error: 'Panoul e doar pentru creator.' });
      return;
    }
    setState({ reports: result.data.reports || [], log: result.data.log || [], error: '' });
  }

  useEffect(() => { load(); }, []);

  async function act(id, action) {
    const result = await MentorAPI.moderate(id, action);
    if (!result.success) return;
    await load();
  }

  return (
    <main className="screen-page animate-fadeIn">
      <header className="screen-header">
        <div className="eyebrow">Creator</div>
        <h1 className="display-font screen-title">Moderare</h1>
        {onOpenStats && (
          <button type="button" className="ghost-button" onClick={onOpenStats}>Statistici conturi</button>
        )}
      </header>
      {state.error && <p className="mx-5">{state.error}</p>}
      <section className="mx-5 grid gap-3">
        {state.reports.map(report => (
          <article key={report.id} className="surface rounded-3xl p-4">
            <strong>{report.reason}</strong>
            <p>{report.note}</p>
            <div className="grid gap-2">
              <button type="button" className="ghost-button" onClick={() => act(report.id, 'rename')}>Cere alt nume</button>
              <button type="button" className="ghost-button" onClick={() => act(report.id, 'hide')}>Ascunde din clasament</button>
              <button type="button" className="ghost-button" onClick={() => act(report.id, 'suspend')}>Suspendă</button>
              <button type="button" className="ghost-button" onClick={() => act(report.id, 'erase')}>Șterge contul</button>
              <button type="button" className="ghost-button" onClick={() => act(report.id, 'close')}>Închide raportul</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
