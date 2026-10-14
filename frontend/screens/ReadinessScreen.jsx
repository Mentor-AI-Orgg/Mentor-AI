function openLesson(onNavigate, row) {
  onNavigate('learn', {
    subject: row.subject,
    grade: row.grade,
    chapter: row.chapterId,
    lessonId: row.lessonId,
    track: row.track === 'en' ? 'en' : null
  });
}

function LessonRows({ items, onNavigate }) {
  return (
    <ul className="lesson-mastery-list">
      {items.map(row => (
        <li key={`${row.subject}:${row.chapterId}:${row.lessonId}`}>
          <button
            type="button"
            className={`lesson-mastery-row${row.review ? ' is-review' : ''}`}
            onClick={() => openLesson(onNavigate, row)}
          >
            <span className="lesson-mastery-copy">
              <span className="lesson-mastery-title">{row.title}</span>
              {row.chapterTitle ? <small>{row.chapterTitle}</small> : null}
            </span>
            <span className="lesson-mastery-pct">{row.percent}%</span>
            {row.review ? <em className="lesson-review">de recapitulat</em> : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

const ReadinessScreen = ({ userData, onNavigate }) => {
  const ready = userData.readiness;
  const lessons = Array.isArray(userData.lessonMastery) ? userData.lessonMastery : [];
  const review = lessons.filter(row => row.review);
  const rest = lessons.filter(row => !row.review);
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
      <section className="readiness-card" aria-label="Pe lecții">
        <p className="eyebrow">Pe lecții</p>
        {lessons.length === 0 ? (
          <p className="daily-lead">Procentul pe lecție apare după ce răspunzi la întrebările ei.</p>
        ) : (
          <>
            {review.length > 0 && <p className="daily-lead">Sub 60% e de recapitulat.</p>}
            {review.length > 0 && <LessonRows items={review} onNavigate={onNavigate} />}
            {rest.length > 0 && <LessonRows items={rest} onNavigate={onNavigate} />}
          </>
        )}
      </section>
    </main>
  );
};

export default ReadinessScreen;
