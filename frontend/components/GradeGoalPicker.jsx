import { useState } from 'react';
import { TARGET_NOTES, readSavedTargetNote, saveTargetNote } from '../targetGrade.js';

const GradeGoalPicker = ({ kind = 'test', onPick, onCancel }) => {
  const [chosen, setChosen] = useState(() => readSavedTargetNote() || 8);
  const label = kind === 'flashcards' ? 'flashcardurile' : 'testul';

  return (
    <div className="grade-goal animate-fadeIn">
      <p className="grade-goal-q">Dacă ai da un test acum, ce notă ți-ai dori?</p>
      <p className="quiz-coverage">Alegem {label} pe măsura notei. Un 10 are și greu, și ușor făcut bine — nu doar itemi imposibili.</p>
      <div className="grade-goal-notes" role="group" aria-label="Nota dorită">
        {TARGET_NOTES.map(note => (
          <button
            key={note}
            type="button"
            className={`grade-goal-note ${chosen === note ? 'selected' : ''}`}
            onClick={() => setChosen(note)}
          >
            {note}
          </button>
        ))}
      </div>
      <div className="learning-actions">
        {typeof onCancel === 'function' && (
          <button type="button" className="ghost-button" onClick={onCancel}>Înapoi</button>
        )}
        <button
          type="button"
          className="accent-button"
          onClick={() => {
            saveTargetNote(chosen);
            onPick(chosen);
          }}
        >
          Vreau nota {chosen}
        </button>
      </div>
    </div>
  );
};

export default GradeGoalPicker;
