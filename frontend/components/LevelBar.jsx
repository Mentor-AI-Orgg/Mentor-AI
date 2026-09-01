import { xpProgress } from '../xpProgress.js';
import { useI18n } from '../i18n/index.jsx';

const LevelBar = ({ userData, compact = false }) => {
  const { t } = useI18n();
  const bar = xpProgress(userData);

  return (
    <div className={`level-bar ${compact ? 'is-compact' : ''}`}>
      <div className="level-bar-meta">
        <strong>{t('home.level')} {bar.level}</strong>
        <span>{t('home.xpInLevel', { into: bar.into, span: bar.span })}</span>
        <strong>{t('home.level')} {bar.nextLevel}</strong>
      </div>
      <div
        className="progress-track progress-track-xp"
        role="progressbar"
        aria-label={t('home.levelBarLabel', { level: bar.level, next: bar.nextLevel })}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={bar.pct}
      >
        <div style={{ width: `${bar.pct}%` }} />
      </div>
      {!compact && (
        <p className="home-xp-line">
          {t('home.totalXp', { count: bar.xp })} · {t('home.nextXp', { count: bar.toNext, next: bar.nextLevel })}
        </p>
      )}
    </div>
  );
};

export default LevelBar;
