const ReadinessScreen = ({ userData, onNavigate }) => {
  const ready = userData.readiness;
  return (
    <main className="home-page">
      <button type="button" className="ghost-button" onClick={() => onNavigate('home')}>Înapoi acasă</button>
      {ready ? (
        <section className="readiness-card" aria-label={ready.label}>
          <p className="eyebrow">{ready.label}</p>
          <p className="readiness-score">{ready.percent}%</p>
          <p className="daily-lead">{ready.hint}</p>
          {ready.next && (
            <button
              type="button"
              className="ghost-button"
              onClick={() => onNavigate('learn', {
                subject: ready.next.subject,
                grade: ready.next.grade,
                chapter: ready.next.chapterId
              })}
            >
              La capitolul următor
            </button>
          )}
        </section>
      ) : (
        <p className="daily-lead">Progresul se calculează după lecțiile terminate.</p>
      )}
    </main>
  );
};

export default ReadinessScreen;
