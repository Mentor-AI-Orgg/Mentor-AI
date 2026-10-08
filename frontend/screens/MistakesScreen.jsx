import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import Mascota from '../components/mascot/Mascota.jsx';
import { MASCOT_NAME } from '../config/mascot.js';

function when(stamp) {
  const at = Number(stamp);
  if (!Number.isFinite(at)) return '';
  return new Date(at).toLocaleDateString('ro-RO');
}

const MistakesScreen = ({ onNavigate }) => {
  const [book, setBook] = useState(null);
  const [answer, setAnswer] = useState('');
  const [note, setNote] = useState('');

  const load = async () => {
    const pack = await MentorAPI.mistakes();
    if (pack.success) setBook(pack.data);
  };

  useEffect(() => {
    load();
  }, []);

  const current = book?.due?.[0] || null;

  const ask = item => {
    if (!item?.id) return;
    onNavigate?.('professor', {
      subject: item.subject || 'matematica',
      grade: item.grade || '5',
      chapter: item.lessonId ? { id: item.lessonId, title: item.lesson || '', subject: item.subject || 'matematica' } : null,
      tutorProblem: {
        source: 'mistake',
        id: item.id,
        prompt: item.prompt || '',
        lessonId: item.lessonId || '',
        lessonTitle: item.lesson || '',
        subject: item.subject || 'matematica',
        grade: item.grade || '5'
      }
    });
  };

  const submit = async () => {
    if (!current) return;
    const pack = await MentorAPI.reviewMistake({ itemId: current.id, answer });
    if (!pack.success) {
      setNote(pack.error || 'Nu am putut verifica.');
      return;
    }
    setAnswer('');
    setBook(pack.data);
    setNote(pack.data.message || (pack.data.correct ? 'Corect. Revine mai târziu.' : 'Încă nu. O ia de la început.'));
  };

  return (
    <main className="home-page animate-fadeIn">
      <header className="home-header">
        <div>
          <div className="eyebrow">Caietul de greșeli</div>
          <h1 className="display-font home-title">Ce merită repetat</h1>
          <p>Maximum 10 pe zi. Un exercițiu revine după 1, 3, 7 și apoi 21 de zile.</p>
        </div>
      </header>
      {note && (
        <section className="focus-card">
          {book && note.includes('Bob cu bob') && <Mascota mood="mandru" size="md" message={note} />}
          {!note.includes('Bob cu bob') && <p>{note}</p>}
        </section>
      )}
      {current && (
        <section className="placement-quiz">
          <div className="eyebrow">{current.lesson}</div>
          {current.prompt ? (
            <label className="placement-question">
              <span className="placement-prompt">{current.prompt}</span>
              <input className="field form-input" value={answer} placeholder="Răspunsul tău" aria-label="Răspunsul tău" onChange={event => setAnswer(event.target.value)} />
            </label>
          ) : (
            <p className="placement-quiz-help">Deschide lecția și reia ideea.</p>
          )}
          <div className="focus-actions">
            {current.prompt && <button type="button" className="accent-button" onClick={submit}>Verifică</button>}
            {current.lessonId && (
              <button type="button" className="ghost-button" onClick={() => onNavigate('learn', {
                subject: current.subject || 'matematica',
                grade: current.grade || '5',
                chapter: current.lessonId
              })}>Deschide lecția</button>
            )}
            <button type="button" className="accent-button" onClick={() => ask(current)}>
              Nu înțeleg – întreab-o pe {MASCOT_NAME}
            </button>
          </div>
        </section>
      )}
      {!current && (
        <div className="empty-with-mascot">
          <Mascota mood="sleepy" size="md" message="Nimic de recapitulat azi." />
          <p className="nudge-banner">Nimic de recapitulat azi.</p>
        </div>
      )}
      {(book?.groups || []).map(group => (
        <section key={group.lesson} className="focus-card">
          <h2 className="display-font">{group.lesson}</h2>
          <ul>
            {group.items.map(item => (
              <li key={item.id}>
                {item.ready ? 'De recapitulat azi' : `Revine pe ${when(item.due)}`}
                {item.prompt ? <span> · {item.prompt}</span> : null}
                {item.lessonId && (
                  <>
                    {' · '}
                    <button type="button" className="ghost-button" onClick={() => onNavigate('learn', {
                      subject: group.subject || item.subject || 'matematica',
                      grade: group.grade || item.grade || '5',
                      chapter: item.lessonId
                    })}>Deschide lecția</button>
                  </>
                )}
                {' · '}
                <button type="button" className="ghost-button" onClick={() => ask({
                  ...item,
                  subject: item.subject || group.subject,
                  grade: item.grade || group.grade,
                  lesson: item.lesson || group.lesson
                })}>
                  Nu înțeleg – întreab-o pe {MASCOT_NAME}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <button type="button" className="ghost-button" onClick={() => onNavigate('home')}>Înapoi acasă</button>
    </main>
  );
};

export default MistakesScreen;
