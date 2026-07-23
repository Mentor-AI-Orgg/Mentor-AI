const { useEffect } = React;

const getDeviceMode = width => {
  if (width < 680) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const buildContainerConfig = width => {
  const mode = getDeviceMode(width);

  if (mode === 'mobile') {
    return {
      mode,
      shellMax: '100%',
      contentMax: '100%',
      sidePad: '16px',
      sectionPad: '16px'
    };
  }

  if (mode === 'tablet') {
    return {
      mode,
      shellMax: '980px',
      contentMax: '920px',
      sidePad: '20px',
      sectionPad: '20px'
    };
  }

  return {
    mode,
    shellMax: '1280px',
    contentMax: '1120px',
    sidePad: '28px',
    sectionPad: '32px'
  };
};

const AdaptiveContainer = () => {
  useEffect(() => {
    const setViewportVars = () => {
      const width = window.innerWidth;
      const config = buildContainerConfig(width);

      document.documentElement.style.setProperty('--app-shell-max', config.shellMax);
      document.documentElement.style.setProperty('--app-content-max', config.contentMax);
      document.documentElement.style.setProperty('--app-side-pad', config.sidePad);
      document.documentElement.style.setProperty('--app-section-pad', config.sectionPad);
      document.documentElement.dataset.deviceMode = config.mode;
    };

    setViewportVars();
    window.addEventListener('resize', setViewportVars);
    return () => window.removeEventListener('resize', setViewportVars);
  }, []);

  return null;
};

window.AdaptiveContainer = AdaptiveContainer;
