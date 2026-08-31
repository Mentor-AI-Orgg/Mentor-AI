import { useEffect, useRef, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const LETTERS = ['A', 'B', 'C', 'D'];
const HOLD_MS = 6000;

const EnPaperView = ({ paper, onClose, session: initialSession }) => {
  const [session, setSession] = useState(initialSession || null);
  const [waitLabel, setWaitLabel] = useState('');
  const [reveals, setReveals] = useState({});
  const [holding, setHolding] = useState(null);
  const [holdPct, setHoldPct] = useState(0);
  const [error, setError] = useState('');
  const holdRef = useRef(null);

  useEffect(() => {
    if (!paper?.id) return undefined;
    MentorAPI.openEnPaper({ paper_id: paper.id }).then(result => {
      if (result.success) setSession(result.data.session);
    });
    return undefined;
  }, [paper?.id]);

  useEffect(() => {
    if (!session || session.unlocked) {
      setWaitLabel('');
      return undefined;
    }
    const tick = () => {
      const left = Math.max(0, (session.waitMs || 0) - (Date.now() - (session.clientAt || Date.now())));
      if (left <= 0) {
        setSession(prev => (prev ? { ...prev, unlocked: true, waitMs: 0 } : prev));
        setWaitLabel('');
        return;
      }
      const min = Math.floor(left / 60000);
      const sec = Math.floor((left % 60000) / 1000);
      setWaitLabel(`${min}:${String(sec).padStart(2, '0')}`);
    };
    setSession(prev => (prev && !prev.clientAt ? { ...prev, clientAt: Date.now() } : prev));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [session]);

  const stopHold = () => {
    if (holdRef.current) clearInterval(holdRef.current);
    holdRef.current = null;
    setHolding(null);
    setHoldPct(0);
  };

  const startHold = (blockLabel, n) => {
    if (holding) return;
    setError('');
    setHolding(`${blockLabel}:${n}`);
    const started = Date.now();
    holdRef.current = setInterval(async () => {
      const pct = Math.min(100, ((Date.now() - started) / HOLD_MS) * 100);
      setHoldPct(pct);
      if (pct < 100) return;
      stopHold();
      const result = await MentorAPI.revealEnBarem({ paper_id: paper.id, block: blockLabel, n });
      if (!result.success) {
        setError(result.error || 'Baremul nu e gata. Lucrează pe foaie, apoi încearcă din nou.');
        return;
      }
      setReveals(prev => ({ ...prev, [`${blockLabel}:${n}`]: result.data }));
    }, 80);
  };

  if (!paper) return null;

  return (
    <section className="en-paper-sheet surface" aria-label={paper.title}>
      <header className="en-paper-head">
        <div>
          <div className="eyebrow">Model EN · doar pe foaie · 4 variante</div>
          <h3 className="display-font en-paper-title">{paper.title}</h3>
          <p className="en-paper-meta">Timp orientativ: {paper.duration} · {paper.oficiu} puncte din oficiu · Nu se completează în aplicație</p>
        </div>
        <button type="button" className="ghost-button result-action" onClick={onClose}>
          Închide testul <i className="fas fa-times" />
        </button>
      </header>
      <p className="en-paper-lock"><i className="fas fa-ban" /> {paper.hint}</p>
      <p className="quote-card quote-inline">„Nu lăsa pe mâine ce poți face azi.” — proverb</p>

      {(paper.blocks || []).map(block => (
        <article key={block.label} className="en-paper-block">
          <h4>{block.label}{block.points ? ` · ${block.points} puncte` : ''}</h4>
          {block.intro ? <p className="en-paper-intro">{block.intro}</p> : null}
          <ol className="en-paper-items">
            {(block.items || []).map((entry, idx) => {
              const key = `${block.label}:${entry.n}`;
              const shown = reveals[key];
              const isPassage = entry.n === 0 || entry.kind === 'passage' || entry.passage;
              return (
                <li key={`${block.label}-${entry.n}-${idx}`} className={isPassage ? 'en-paper-passage' : 'en-paper-item'}>
                  {isPassage ? (
                    <div className="en-paper-text">{entry.prompt}</div>
                  ) : (
                    <>
                      <strong className="en-paper-n">{entry.n}.</strong>
                      <div>
                        <p>{entry.prompt}</p>
                        {entry.points ? <small>{entry.points} puncte{entry.lines ? ` · ${entry.lines}` : ''}</small> : null}
                        {entry.choices?.length > 0 && (
                          <ol className="en-choices">
                            {entry.choices.map((choice, choiceIndex) => (
                              <li key={`${key}-${choiceIndex}`}>
                                <span>{LETTERS[choiceIndex]}.</span> {choice}
                              </li>
                            ))}
                          </ol>
                        )}
                        {entry.kind !== 'write' && (
                          <div className="en-barem-gate">
                            {!session?.unlocked ? (
                              <small>Baremul acestui item se deblochează după timpul de lucru pe foaie{waitLabel ? ` (${waitLabel})` : ''}.</small>
                            ) : shown ? (
                              <div className="en-barem-card">
                                {shown.letter ? <p><strong>Varianta din barem: {shown.letter}</strong></p> : null}
                                {shown.explain ? <p>{shown.explain}</p> : null}
                                {shown.steps?.length > 0 && (
                                  <ol className="quiz-steps">
                                    {shown.steps.map((step, stepIndex) => <li key={`${key}-s-${stepIndex}`}>{step}</li>)}
                                  </ol>
                                )}
                                {shown.ideas?.length > 0 && (
                                  <ul className="en-barem-ideas">
                                    {shown.ideas.map((idea, ideaIndex) => <li key={`${key}-i-${ideaIndex}`}>{idea}</li>)}
                                  </ul>
                                )}
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="ghost-button en-hold-btn"
                                onMouseDown={() => startHold(block.label, entry.n)}
                                onMouseUp={stopHold}
                                onMouseLeave={stopHold}
                                onTouchStart={() => startHold(block.label, entry.n)}
                                onTouchEnd={stopHold}
                              >
                                {holding === key ? `Ține apăsat… ${Math.round(holdPct)}%` : 'Ține 6 secunde ca să desfaci DOAR acest item'}
                              </button>
                            )}
                          </div>
                        )}
                        {entry.kind === 'write' && (
                          <div className="en-barem-gate">
                            {!session?.unlocked ? (
                              <small>Ideile de barem (nu un text gata) se deschid după timpul de lucru.</small>
                            ) : shown ? (
                              <div className="en-barem-card">
                                <p>{shown.explain}</p>
                                <ul className="en-barem-ideas">
                                  {(shown.ideas || []).map((idea, ideaIndex) => <li key={`${key}-w-${ideaIndex}`}>{idea}</li>)}
                                </ul>
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="ghost-button en-hold-btn"
                                onMouseDown={() => startHold(block.label, entry.n)}
                                onMouseUp={stopHold}
                                onMouseLeave={stopHold}
                                onTouchStart={() => startHold(block.label, entry.n)}
                                onTouchEnd={stopHold}
                              >
                                {holding === key ? `Ține apăsat… ${Math.round(holdPct)}%` : 'Ține 6 secunde pentru ideile de barem (nu un text gata)'}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </article>
      ))}
      {error ? <p className="guide-error">{error}</p> : null}
      <p className="en-paper-foot">Nu există „arată toate răspunsurile”. Un item pe rând, după ce ai scris pe foaie. Compunerea are doar idei, nu un model de copiat.</p>
    </section>
  );
};

export default EnPaperView;
