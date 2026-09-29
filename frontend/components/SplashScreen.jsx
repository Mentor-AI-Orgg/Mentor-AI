import { useEffect } from 'react';
import { useI18n } from '../i18n/index.jsx';

const SplashScreen = ({ onFinish, delay = 2500 }) => {
  const { t } = useI18n();
  useEffect(() => {
    const timer = setTimeout(onFinish, delay);
    return () => clearTimeout(timer);
  }, [onFinish, delay]);

  return (
    <div className="splash-page animate-fadeIn">
      <div className="brand-mark splash-mark animate-splash">10</div>
      <div className="eyebrow">{t('splash.eyebrow')}</div>
      <div className="display-font splash-title">SUNT<br /><span>10</span></div>
      <div className="splash-rule"></div>
      <p className="splash-subtitle">{t('splash.subtitle')}</p>
      <div className="splash-meta"><span>{t('splash.meta1')}</span><span>{t('splash.meta2')}</span><span>{t('splash.meta3')}</span></div>
    </div>
  );
};

export default SplashScreen;
