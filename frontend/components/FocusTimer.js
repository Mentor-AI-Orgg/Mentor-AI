const { useState, useEffect, useRef, useCallback } = React;

const PRESETS = [
  { id: 'p15', label: '15 min', seconds: 15 * 60 },
  { id: 'p25', label: '25 min · Pomodoro', seconds: 25 * 60 },
  { id: 'p50', label: '50 min', seconds: 50 * 60 },
  { id: 'p60', label: '60 min', seconds: 60 * 60 }
];

const formatTime = totalSeconds => {
  const s = Math.max(0, Math.round(totalSeconds));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

const FocusTimer = ({ userData, onRewardClaim }) => {
  const [preset, setPreset] = useState(PRESETS[1]);
  const [remaining, setRemaining] = useState(PRESETS[1].seconds);
  const [running, setRunning] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [sessionsDone, setSessionsDone] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return undefined;
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setSessionsDone(s => s + 1);
          if (window.MentorAPI?.logActivity) {
            window.MentorAPI.logActivity({ user_id: userData?.email || 'demo_user', type: 'focus_session', note: `Focus completat: ${preset.label}`, meta: { minutes: Math.round(preset.seconds / 60) } });
          }
          if (preset.seconds >= 60 * 60) {
            window.MentorAPI.claimReward({
              user_id: userData?.email || 'demo_user',
              type: 'study_1h',
              hours: 1
            }).then(result => {
              if (result.success && typeof onRewardClaim === 'function') {
                onRewardClaim(result.data);
              }
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const selectPreset = useCallback(p => {
    setPreset(p);
    setRemaining(p.seconds);
    setRunning(false);
  }, []);

  const toggleRun = () => {
    if (remaining <= 0) { setRemaining(preset.seconds); }
    setRunning(prev => !prev);
  };

  const reset = () => {
    setRunning(false);
    setRemaining(preset.seconds);
  };

  const progressPct = Math.round(((preset.seconds - remaining) / preset.seconds) * 100);

  const TimerBody = (
    <>
      <div className="focus-timer-ring" style={{ '--progress': `${progressPct}%` }}>
        <span className="focus-timer-value">{formatTime(remaining)}</span>
        <span className="focus-timer-sub">{running ? 'în desfășurare' : remaining === 0 ? 'gata!' : 'în pauză'}</span>
      </div>
      <div className="focus-timer-controls">
        <button type="button" className="ghost-button" onClick={reset} aria-label="Resetează"><i className="fas fa-rotate-left" /></button>
        <button type="button" className="accent-button focus-timer-play" onClick={toggleRun}>
          <i className={`fas ${running ? 'fa-pause' : 'fa-play'}`} /> {running ? 'Pauză' : 'Start'}
        </button>
        <button
          type="button"
          className="ghost-button"
          onClick={() => setFocusMode(f => !f)}
          aria-label={focusMode ? 'Ieși din modul focus' : 'Mod focus'}
        >
          <i className={`fas ${focusMode ? 'fa-compress' : 'fa-expand'}`} />
        </button>
      </div>
    </>
  );

  return (
    <>
      <section className="focus-timer-card surface">
        <div className="focus-timer-head">
          <div>
            <div className="eyebrow">Cronometru · Mod Focus</div>
            <h3 className="display-font">Ține ritmul, pas cu pas.</h3>
          </div>
          <span className="learn-chip"><i className="fas fa-fire" /> {sessionsDone} sesiuni azi</span>
        </div>
        <div className="focus-timer-presets">
          {PRESETS.map(p => (
            <button
              key={p.id}
              type="button"
              className={`focus-preset-btn ${preset.id === p.id ? 'selected' : ''}`}
              onClick={() => selectPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
        {TimerBody}
      </section>

      {focusMode && (
        <div className="focus-overlay animate-fadeIn" role="dialog" aria-modal="true" aria-label="Mod focus">
          <button type="button" className="focus-overlay-exit ghost-button" onClick={() => setFocusMode(false)}>
            <i className="fas fa-compress" /> Ieși din focus
          </button>
          <div className="focus-overlay-body">
            <div className="eyebrow">Mod Focus</div>
            {TimerBody}
            <p className="focus-overlay-hint">Închide notificările și lasă o singură sarcină deschisă. Un pas mic, dar constant.</p>
          </div>
        </div>
      )}
    </>
  );
};

window.FocusTimer = FocusTimer;
