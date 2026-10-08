import MathText from './MathText.jsx';
import Mascota from './mascot/Mascota.jsx';
import { verdictClass, verdictLabel } from '../verdictCopy.js';
import { MASCOT_NAME } from '../config/mascot.js';

function reviewMood(items) {
  const tones = items.map(verdictClass);
  if (tones.length && tones.every(tone => tone === 'ok')) return 'celebrating';
  if (tones.some(tone => tone === 'ok')) return 'proud';
  return 'encouraging';
}

function reviewLine(items) {
  const tones = items.map(verdictClass);
  if (tones.length && tones.every(tone => tone === 'ok')) return 'Le-ai nimerit. Dacă vrei, mai deschidem una.';
  if (tones.some(tone => tone === 'ok')) return 'Unele au ieșit. Pe celelalte le luăm pe rând.';
  return 'Hai să le luăm pe rând. Aici se lămurește.';
}

function ReviewItem({ item, index, onOpenLesson, onOpenNotebook, onAsk }) {
  const tone = verdictClass(item);
  const correct = item.correct || item.sample || '';
  const right = tone === 'ok';
  return (
    <li className={`test-review-item ${tone}`}>
      <div className="test-review-badge">
        <i className={`fas ${right ? 'fa-check' : tone === 'mid' ? 'fa-minus' : 'fa-xmark'}`} aria-hidden="true" />
        {verdictLabel(item)}
      </div>
      <p className="test-review-prompt">
        <strong>Exercițiul {index + 1}. </strong>
        <MathText text={item.prompt || ''} />
      </p>
      {Array.isArray(item.choices) && item.choices.length > 0 && (
        <ul className="test-review-choices">
          {item.choices.map((choice) => {
            const picked = choice && choice === item.given;
            const answer = choice && correct && choice === correct;
            const mark = answer ? 'is-correct' : picked ? 'is-wrong' : '';
            return (
              <li key={choice} className={mark}>
                <MathText text={choice} />
                {answer && <em> corect</em>}
                {picked && !answer && <em> răspunsul tău</em>}
              </li>
            );
          })}
        </ul>
      )}
      <p className="test-review-line">
        <span>Răspunsul tău</span>
        <MathText text={item.given || '—'} />
      </p>
      <p className="test-review-line">
        <span>Răspunsul corect</span>
        <MathText text={correct || '—'} />
      </p>
      {item.explain && (
        <p className="quiz-explain">
          <MathText text={item.explain} />
        </p>
      )}
      {item.steps?.length > 0 && (
        <ol className="quiz-steps">
          {item.steps.map((step, stepIndex) => (
            <li key={`${item.id}-step-${stepIndex}`}>
              <MathText text={step} />
            </li>
          ))}
        </ol>
      )}
      {item.rubric && (
        <div className="writing-barem">
          <strong>Am citit foaia · {item.rubric.total}/{item.rubric.max} · nota {item.rubric.note10}</strong>
          <ul>
            {(item.rubric.criteria || []).map((row) => (
              <li key={row.id}>
                <span>{row.label}</span> <em>{row.points}/{row.max}</em> — {row.note}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="test-review-actions">
        {item.lessonId && typeof onOpenLesson === 'function' && (
          <button type="button" className="ghost-button" onClick={() => onOpenLesson(item.lessonId)}>
            Deschide lecția
          </button>
        )}
        {typeof onOpenNotebook === 'function' && (
          <button type="button" className="ghost-button" onClick={onOpenNotebook}>
            Caietul de greșeli
          </button>
        )}
        {typeof onAsk === 'function' && (
          <button type="button" className="accent-button" onClick={() => onAsk(item)}>
            Nu înțeleg – întreab-o pe {MASCOT_NAME}
          </button>
        )}
      </div>
    </li>
  );
}

export default function TestReview({ items = [], onOpenLesson, onOpenNotebook, onAsk }) {
  if (!items.length) return null;
  return (
    <section className="test-review" aria-label="Revizuirea testului">
      <div className="test-review-head">
        <Mascota mood={reviewMood(items)} size="md" />
        <div>
          <h4 className="display-font">Revizuire</h4>
          <p>{reviewLine(items)}</p>
        </div>
      </div>
      <ol className="test-review-list">
        {items.map((item, index) => (
          <ReviewItem
            key={item.id || index}
            item={item}
            index={index}
            onOpenLesson={onOpenLesson}
            onOpenNotebook={onOpenNotebook}
            onAsk={onAsk}
          />
        ))}
      </ol>
    </section>
  );
}
