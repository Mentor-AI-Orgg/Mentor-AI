const EnPaperView = ({ paper, onClose }) => {
  if (!paper) return null;

  return (
    <section className="en-paper-sheet surface" aria-label={paper.title}>
      <header className="en-paper-head">
        <div>
          <div className="eyebrow">Model recomandat · doar pe foaie</div>
          <h3 className="display-font en-paper-title">{paper.title}</h3>
          <p className="en-paper-meta">Timp orientativ: {paper.duration} · {paper.oficiu} puncte din oficiu · Nu se completează în aplicație</p>
        </div>
        <button type="button" className="ghost-button result-action" onClick={onClose}>
          Închide testul <i className="fas fa-times" />
        </button>
      </header>
      <p className="en-paper-lock"><i className="fas fa-ban" /> {paper.hint}</p>
      {(paper.blocks || []).map(block => (
        <article key={block.label} className="en-paper-block">
          <h4>{block.label}{block.points ? ` · ${block.points} puncte` : ''}</h4>
          {block.intro ? <p className="en-paper-intro">{block.intro}</p> : null}
          <ol className="en-paper-items">
            {(block.items || []).map(entry => (
              <li key={`${block.label}-${entry.n}`} className={entry.n === 0 ? 'en-paper-passage' : 'en-paper-item'}>
                {entry.n === 0 ? (
                  <div className="en-paper-text">{entry.prompt}</div>
                ) : (
                  <>
                    <strong className="en-paper-n">{entry.n}.</strong>
                    <div>
                      <p>{entry.prompt}</p>
                      {entry.points ? <small>{entry.points} puncte{entry.lines ? ` · ${entry.lines}` : ''}</small> : null}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>
        </article>
      ))}
      <p className="en-paper-foot">Gata. Răspunsurile rămân pe foaia ta. Aplicația nu primește, nu notează și nu salvează rezolvarea acestui model.</p>
    </section>
  );
};

export default EnPaperView;
