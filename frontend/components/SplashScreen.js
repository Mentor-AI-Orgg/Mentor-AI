const { useEffect } = React;

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-page animate-fadeIn">
      <div className="brand-mark splash-mark animate-splash">M</div>
      <div className="eyebrow">Un spațiu pentru idei</div>
      <div className="display-font splash-title">MENTOR<br /><span>AI</span></div>
      <div className="splash-rule"></div>
      <p className="splash-subtitle">Profesorul personal din buzunarul tău.</p>
      <div className="splash-meta"><span>10 limbi</span><span>Offline fallback</span><span>Ritm adaptiv</span></div>
    </div>
  );
};

window.SplashScreen = SplashScreen;
