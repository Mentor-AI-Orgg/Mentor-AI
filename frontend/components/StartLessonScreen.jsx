import { useState } from 'react';
import Mascota from './mascot/Mascota.jsx';
import { MentorAPI } from '../apiClient.js';
import { curriculumParams, firstLessonExtras } from '../firstLesson.js';

const StartLessonScreen = ({ userData, onStart, onLater }) => {
  const [busy, setBusy] = useState(false);

  const start = async () => {
    if (busy) return;
    setBusy(true);
    const pack = await MentorAPI.getCurriculum(curriculumParams(userData));
    const extras = firstLessonExtras(userData, pack.success ? pack.data : null);
    setBusy(false);
    onStart(extras);
  };

  return (
    <main className="onboarding-page animate-fadeIn">
      <div className="onboarding-copy">
        <Mascota mood="waving" size="lg" />
        <h1 className="display-font onboarding-title">Hai să începem cu prima lecție!</h1>
        <p className="form-subtitle">O lecție scurtă, de la clasa ta. Poți reveni oricând acasă.</p>
      </div>
      <div className="onboarding-actions">
        <button type="button" className="accent-button onboarding-next" disabled={busy} onClick={start}>
          {busy ? 'Se deschide…' : 'Hai să începem cu prima lecție!'}
        </button>
        <button type="button" className="ghost-button onboarding-back" onClick={onLater}>Mai târziu</button>
      </div>
    </main>
  );
};

export default StartLessonScreen;
