import { useEffect, useState } from 'react';
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
    || entry.more?.length
    || entry.seeAlso?.length
    || entry.figures?.length
    || entry.kind
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

function RichBody({ entry }) {
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
      {entry.answers?.length ? (
        <details className="lesson-fold">
          <summary>Vezi răspunsurile</summary>
          <p>
            {entry.answers.map((answer, index) => (
              <span key={`${index}-${answer}`}>
                {index ? '; ' : null}
                {index + 1}) <MathText text={String(answer)} />
              </span>
            ))}
          </p>
        </details>
      ) : null}
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

export default function LessonCard({ entry, lessonIndex, initiallyOpen = false, forceOpen = false }) {
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
          <LessonFigures entry={entry} open={open} />
          <LessonBoxes entry={entry} />
          <FormulaBox entry={entry} />
          {isRestructured(entry) ? <RichBody entry={entry} /> : <LegacyBody entry={entry} />}
        </div>
      </details>
    </li>
  );
}
