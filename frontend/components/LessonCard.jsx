import { useEffect, useState } from 'react';
import MascotPresence from './mascot/MascotPresence.jsx';
import GeoFigure from './GeoFigure.jsx';
import MathText from './MathText.jsx';
import { splitLessonParagraphs } from '../lessonParagraphs.js';
import { lessonHref, lessonMinutes, splitBold } from '../lessonText.js';

function RichInline({ text }) {
  return splitBold(text).map((piece, index) => (
    piece.strong
      ? <strong key={`${index}-b`}><MathText text={piece.text} /></strong>
      : <MathText key={`${index}-t`} text={piece.text} />
  ));
}

function LessonProse({ label, text, className }) {
  const parts = splitLessonParagraphs(text);
  if (!parts.length) return null;
  return (
    <div className={className || undefined}>
      {parts.map((part, index) => (
        <p key={`${label}-${index}`}>
          {index === 0 && label ? <strong>{label} </strong> : null}
          <RichInline text={part} />
        </p>
      ))}
    </div>
  );
}

function figureKindsOf(entry) {
  const kinds = [];
  if (entry.figure) kinds.push(entry.figure);
  (entry.figures || []).forEach(kind => {
    if (kind && !kinds.includes(kind)) kinds.push(kind);
  });
  return kinds;
}

function LessonFigures({ entry, open }) {
  const kinds = figureKindsOf(entry);
  if (!open || !kinds.length) return null;
  return kinds.map((kind, index) => (
    <GeoFigure
      key={`${kind}-${index}`}
      kind={kind}
      formulas={index === 0 ? entry.formulas : undefined}
    />
  ));
}

function FormulaBox({ entry }) {
  if (figureKindsOf(entry).length || !entry.formulas?.length) return null;
  return (
    <aside className="lesson-box lesson-box-formula">
      <strong>Formule.</strong>
      <ul className="lesson-formula-list">
        {entry.formulas.map(row => (
          <li key={row}><MathText text={row} /></li>
        ))}
      </ul>
    </aside>
  );
}

function LessonBoxes({ entry }) {
  if (!entry.boxes?.length) return null;
  return entry.boxes.map((box, index) => (
    <aside key={`${box.title || box.type || 'box'}-${index}`} className={`lesson-box lesson-box-${box.type || 'regula'}`}>
      {box.title ? <strong>{box.title}. </strong> : null}
      {box.text ? <RichInline text={box.text} /> : null}
    </aside>
  ));
}

function isRestructured(entry) {
  return Boolean(
    entry.keyPoints?.length
    || entry.boxes?.length
    || entry.extraExamples?.length
    || entry.answers?.length
    || entry.hasAnswers
    || entry.more?.length
    || entry.seeAlso?.length
    || entry.figures?.length
    || entry.kind
  );
}

function AnswerList({ answers }) {
  return (
    <p>
      {answers.map((answer, index) => (
        <span key={`${index}-${answer}`}>
          {index ? '; ' : null}
          {index + 1}) <MathText text={String(answer)} />
        </span>
      ))}
    </p>
  );
}

function AnswerFold({ entry, loadAnswers }) {
  const initial = Array.isArray(entry.answers) && entry.answers.length ? entry.answers : null;
  const [answers, setAnswers] = useState(initial);
  const [phase, setPhase] = useState(initial ? 'ready' : 'idle');
  if (!initial && !entry.hasAnswers) return null;
  const openAnswers = event => {
    if (!event.currentTarget.open || answers || phase === 'loading') return;
    if (typeof loadAnswers !== 'function') {
      setPhase('error');
      return;
    }
    setPhase('loading');
    Promise.resolve(loadAnswers())
      .then(next => {
        if (Array.isArray(next) && next.length) {
          setAnswers(next);
          setPhase('ready');
          return;
        }
        setPhase('error');
      })
      .catch(() => setPhase('error'));
  };
  return (
    <details className="lesson-fold" onToggle={openAnswers}>
      <summary>Vezi răspunsurile</summary>
      {answers ? <AnswerList answers={answers} /> : (
        <p>{phase === 'error' ? 'Nu am putut aduce răspunsurile. Închide și deschide din nou.' : 'Le aduc…'}</p>
      )}
    </details>
  );
}

function LegacyBody({ entry }) {
  const tryLabel = entry.practice || entry.mistakes ? 'Învață și tu.' : 'Încearcă tu.';
  const recapLabel = entry.practice || entry.mistakes ? 'Recapitulare.' : 'Recap.';
  return (
    <>
      <LessonProse label="Teorie." text={entry.theory} />
      <LessonProse label="Exemplu." text={entry.example} />
      {entry.practice ? <LessonProse label="Exersează." text={entry.practice} className="lesson-practice" /> : null}
      {entry.mistakes ? <LessonProse label="Greșeli frecvente." text={entry.mistakes} className="lesson-mistakes" /> : null}
      <LessonProse label={tryLabel} text={entry.tryThis} className="lesson-try" />
      <LessonProse label={recapLabel} text={entry.recap} />
      {!entry.theory && (entry.platter || '').split(/\n\n+/).map((para, paraIndex) => (
        <p key={`${entry.id}-${paraIndex}`}>{para}</p>
      ))}
    </>
  );
}

function RichBody({ entry, loadAnswers }) {
  return (
    <>
      <LessonProse label="Teorie." text={entry.theory} />
      <LessonProse label="Exemplu lucrat." text={entry.example} />
      {(entry.extraExamples || []).map((example, index) => (
        <details key={`${example.title || 'exemplu'}-${index}`} className="lesson-fold">
          <summary>{example.title || 'Încă un exemplu'}</summary>
          <LessonProse label="" text={example.text} />
        </details>
      ))}
      {entry.practice ? <LessonProse label="Exersează." text={entry.practice} className="lesson-practice" /> : null}
      <AnswerFold entry={entry} loadAnswers={loadAnswers} />
      {entry.mistakes ? <LessonProse label="Greșeli frecvente." text={entry.mistakes} className="lesson-mistakes" /> : null}
      <LessonProse label="Încearcă tu." text={entry.tryThis} className="lesson-try" />
      {entry.keyPoints?.length ? (
        <div className="lesson-keypoints">
          <strong>De reținut.</strong>
          <ul>
            {entry.keyPoints.map(point => (
              <li key={point}><RichInline text={point} /></li>
            ))}
          </ul>
        </div>
      ) : (
        <LessonProse label="Recapitulare." text={entry.recap} />
      )}
      {(entry.more || []).map((item, index) => (
        <details key={`${item.title || 'more'}-${index}`} className="lesson-fold">
          <summary>{item.title || 'Vezi mai mult'}</summary>
          <LessonProse label="" text={item.text} />
        </details>
      ))}
      {entry.seeAlso?.length ? (
        <div className="lesson-seealso">
          <strong>Lecțiile complete:</strong>
          <ul>
            {entry.seeAlso.map(ref => (
              <li key={`${ref.key}:${ref.lesson}`}>
                <a href={lessonHref(ref)}>{String(ref.lesson || '').replace(/-/g, ' ')}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default function LessonCard({ entry, lessonIndex, initiallyOpen = false, forceOpen = false, onQuiz, onCards, cardsDue = 0, onProblem, loadAnswers }) {
  const [open, setOpen] = useState(initiallyOpen || forceOpen);
  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);
  const minutes = lessonMinutes(entry);
  return (
    <li className="lesson-platter-item">
      <details
        id={`lectie-${entry.id}`}
        className="lesson-card lesson-platter"
        open={open}
        onToggle={event => setOpen(event.currentTarget.open)}
      >
        <summary>
          <span className="lesson-card-title">Lecția {lessonIndex + 1}. {entry.title}</span>
          <span className="lesson-card-time">~{minutes} min</span>
        </summary>
        <div className="lesson-card-body">
          {open ? <MascotPresence compact /> : null}
          <LessonFigures entry={entry} open={open} />
          <LessonBoxes entry={entry} />
          <FormulaBox entry={entry} />
          {isRestructured(entry) ? <RichBody entry={entry} loadAnswers={loadAnswers} /> : <LegacyBody entry={entry} />}
          {(onQuiz || onCards || onProblem) ? (
            <div className="lesson-card-actions">
              {onQuiz ? (
                <button type="button" className="ghost-button lesson-quiz-button" onClick={onQuiz}>
                  Verifică-te la lecția asta
                </button>
              ) : null}
              {onCards ? (
                <button type="button" className="ghost-button lesson-quiz-button" onClick={onCards}>
                  Flashcard-uri la lecția asta
                  {cardsDue > 0 ? <em className="lesson-due-mark">{cardsDue} de repetat</em> : null}
                </button>
              ) : null}
              {onProblem ? (
                <button type="button" className="ghost-button lesson-quiz-button" onClick={onProblem}>
                  Problemă pas cu pas
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </details>
    </li>
  );
}
