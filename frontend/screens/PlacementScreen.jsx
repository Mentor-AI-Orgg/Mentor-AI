import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { useI18n } from '../i18n/index.jsx';

const PlacementScreen = ({ onNavigate }) => {
  const { t } = useI18n();
  const [questions, setQuestions] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    MentorAPI.placementQuestions('ambele').then(pack => {
      if (!live) return;
      if (pack.success && pack.data?.questions?.length) {
        setQuestions(pack.data.questions);
        return;
      }
      setError(t('home.placementEmpty'));
      setQuestions([]);
    });
    return () => {
      live = false;
    };
  }, [t]);

  const finish = async () => {
    const pack = await MentorAPI.placementFinish({
      subject: 'ambele',
      answers: (questions || []).map(item => ({ id: item.id, given: answers[item.id] || '' }))
    });
    if (pack.success) setResult(pack.data);
    else setError(pack.error || t('home.placementEmpty'));
  };

  const current = questions?.[index];
  const topics = result?.startWith?.join(', ') || t('home.placementResultFallback');

  return (
    <main className="home-page animate-fadeIn">
      <header className="home-header">
        <div>
          <button type="button" className="screen-back" onClick={() => onNavigate('home')}>
            <i className="fas fa-arrow-left" /> {t('common.back')}
          </button>
          <h1 className="display-font home-title">{t('home.placementTitle')}</h1>
        </div>
      </header>

      {error && (
        <section className="focus-card">
          <p>{error}</p>
        </section>
      )}

      {result && (
        <section className="focus-card">
          <p>{t('home.placementResult', { topics })}</p>
          {result.good?.length > 0 && <p>{t('home.placementGood', { topics: result.good.join(', ') })}</p>}
          <p>{t('home.placementBadge', { badge: result.badge })}</p>
          <div className="focus-actions">
            <button type="button" className="accent-button" onClick={() => onNavigate('home')}>{t('nav.home')}</button>
          </div>
        </section>
      )}

      {!result && current && (
        <section className="focus-card">
          <div className="eyebrow">{t('home.placementStep', { current: index + 1, total: questions.length })}</div>
          <p>{t('home.placementHint')}</p>
          <h2 className="display-font">{current.prompt}</h2>
          <label className="field-label">
            {t('home.placementAnswer')}
            <input
              className="field form-input"
              value={answers[current.id] || ''}
              onChange={event => setAnswers(prev => ({ ...prev, [current.id]: event.target.value }))}
            />
          </label>
          <div className="focus-actions">
            {index > 0 && (
              <button type="button" className="ghost-button" onClick={() => setIndex(value => value - 1)}>{t('home.placementBack')}</button>
            )}
            {index < questions.length - 1 ? (
              <button type="button" className="accent-button" onClick={() => setIndex(value => value + 1)}>{t('home.placementNext')}</button>
            ) : (
              <button type="button" className="accent-button" onClick={finish}>{t('home.placementDone')}</button>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default PlacementScreen;
