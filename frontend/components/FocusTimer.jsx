import { useState, useEffect, useRef, useCallback } from 'react';
import { MentorAPI } from '../apiClient.js';

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

const focusStorageKey = email => `mentor_focus_timer_${email || 'anon'}`;

const loadFocusState = email => {
  try {
    const raw = localStorage.getItem(focusStorageKey(email));
    if (!raw) return null;
    const saved = JSON.parse(raw);
    const found = PRESETS.find(p => p.id === saved.presetId) || PRESETS[1];
    let remaining = Number(saved.remaining);
    if (!Number.isFinite(remaining)) remaining = found.seconds;
    let running = Boolean(saved.running);
    let sessionsDone = Number(saved.sessionsDone) || 0;
    if (running && saved.savedAt) {
      const elapsed = Math.floor((Date.now() - Number(saved.savedAt)) / 1000);
      remaining -= elapsed;
      if (remaining <= 0) {
        remaining = 0;
        running = false;
        sessionsDone += 1;
      }
    }
    return { preset: found, remaining: Math.max(0, remaining), running, sessionsDone };
  } catch {
    return null;
  }
};

const FocusTimer = ({ userData, onRewardClaim }) => {
  const email = userData?.email || 'anon';
  const restored = loadFocusState(email) || {
    preset: PRESETS[1],
    remaining: PRESETS[1].seconds,
    running: false,
    sessionsDone: 0
  };
  const [preset, setPreset] = useState(restored.preset);
  const [remaining, setRemaining] = useState(restored.remaining);
  const [running, setRunning] = useState(restored.running);
  const [focusMode, setFocusMode] = useState(false);
  const [sessionsDone, setSessionsDone] = useState(restored.sessionsDone);
  const intervalRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running) return undefined;
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          if (!completedRef.current) {
            completedRef.current = true;
            setSessionsDone(s => s + 1);
            MentorAPI.recordProgress({
              type: 'focus_session',
              note: `Focus completat: ${preset.label}`,
              meta: { minutes: Math.round(preset.seconds / 60) }
            }).then(result => {
              if (result.success && typeof onRewardClaim === 'function') {
                onRewardClaim({
                  balance: result.data.summary?.balance,
                  equipped: result.data.summary?.equipped || {},
                  role: result.data.summary?.role,
                  summary: result.data.summary
                });
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

  useEffect(() => {
    localStorage.setItem(focusStorageKey(email), JSON.stringify({
      presetId: preset.id,
      remaining,
      running,
      savedAt: Date.now(),
      sessionsDone
    }));
  }, [email, preset.id, remaining, running, sessionsDone]);

  const selectPreset = useCallback(p => {
    completedRef.current = false;
    setPreset(p);
    setRemaining(p.seconds);
    setRunning(false);
  }, []);

  const toggleRun = () => {
    if (remaining <= 0) {
      completedRef.current = false;
      setRemaining(preset.seconds);
    }
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
            <h3 className="display-font">O singură treabă, un interval.</h3>
          </div>
          <span className="learn-chip"><i className="fas fa-fire" /> {sessionsDone} sesiuni azi</span>
        </div>
        <p className="focus-timer-why">Te pune să stai pe temă, test sau lectură, fără să sari pe altceva. La 25 sau 50 de minute terminate, primești monede și XP.</p>
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

export default FocusTimer;
