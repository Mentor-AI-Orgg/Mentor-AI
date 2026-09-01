import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

function when(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });
}

const ParentReportScreen = ({ token }) => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    MentorAPI.parentReport(token).then(result => {
      if (!alive) return;
      if (result.success) setReport(result.data);
      else setError(result.error || 'Linkul nu e valid.');
    });
    return () => { alive = false; };
  }, [token]);

  return (
    <main className="form-page parent-report animate-fadeIn">
      <div className="eyebrow">Pentru părinte</div>
      <h1 className="display-font form-title">Progresul copilului</h1>
      {!report && !error && <p className="form-subtitle">Încarc rezumatul…</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {report && (
        <>
          <p className="form-subtitle">
            {report.student.name}
            {report.student.className ? `, clasa a ${report.student.className}-a` : ''}.
            Nivel {report.level}
            {report.streak ? ` · ${report.streak} zile la rând` : ''}.
          </p>
          {report.lastStudy ? <p className="quiz-coverage">Ultima lecție: {report.lastStudy}</p> : null}
          <p className="quiz-explain">{report.note}</p>
          {report.strengths?.length > 0 && <p className="quiz-explain">Ține bine: {report.strengths.join(', ')}</p>}
          {report.weaknesses?.length > 0 && <p className="quiz-sample">De lucrat: {report.weaknesses.join(', ')}</p>}
          <h2 className="parent-report-h">Ultimele teste</h2>
          {(report.tests || []).length === 0 && <p className="quiz-coverage">Încă nu e un test predat.</p>}
          <ol className="quiz-review-list">
            {(report.tests || []).map((row, index) => (
              <li key={`${row.at}-${index}`}>
                <strong>{row.title} · nota {row.grade}</strong>
                <p>{row.kind}{row.subject ? ` · ${row.subject}` : ''} · {when(row.at)}</p>
                {row.weaknesses?.length > 0 && <p className="quiz-sample">Slab: {row.weaknesses.join(', ')}</p>}
              </li>
            ))}
          </ol>
          {(report.enPapers || []).length > 0 && (
            <>
              <h2 className="parent-report-h">Evaluare Națională</h2>
              <ul className="quiz-review-list">
                {report.enPapers.map(row => (
                  <li key={row.id}><strong>{row.title}</strong><p>{when(row.at)}</p></li>
                ))}
              </ul>
            </>
          )}
          {(report.chapters || []).length > 0 && (
            <>
              <h2 className="parent-report-h">Capitole</h2>
              <ul className="quiz-review-list">
                {report.chapters.map(row => (
                  <li key={row.title}><strong>{row.title}</strong><p>{row.status}</p></li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default ParentReportScreen;
