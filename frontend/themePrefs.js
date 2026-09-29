const KEY = 's10-appearance';

const DEFAULTS = {
  theme: 'dark',
  textSize: 'normal',
  readableFont: false,
  motion: true
};

function normalizeAppearance(raw = {}) {
  const theme = ['dark', 'light', 'system'].includes(raw.theme) ? raw.theme : DEFAULTS.theme;
  const textSize = ['normal', 'large', 'xlarge'].includes(raw.textSize) ? raw.textSize : DEFAULTS.textSize;
  const readableFont = raw.readableFont === true || raw.readableFont === '1';
  const motion = !(raw.motion === false || raw.motion === '0');
  return { theme, textSize, readableFont, motion };
}

function readAppearance() {
  try {
    return normalizeAppearance(JSON.parse(localStorage.getItem(KEY) || '{}'));
  } catch {
    return { ...DEFAULTS };
  }
}

function applyAppearance(raw) {
  const prefs = normalizeAppearance(raw);
  if (typeof document === 'undefined') return prefs;
  const root = document.documentElement;
  root.dataset.theme = prefs.theme;
  root.dataset.text = prefs.textSize;
  root.dataset.font = prefs.readableFont ? 'readable' : 'default';
  root.dataset.motion = prefs.motion ? 'on' : 'off';
  return prefs;
}

function saveAppearance(raw) {
  const prefs = applyAppearance(raw);
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    /* preferința de aspect nu e o dată personală, dar stocarea poate eșua */
  }
  return prefs;
}

function appearancePayload(prefs) {
  return {
    theme: prefs.theme,
    textSize: prefs.textSize,
    readableFont: prefs.readableFont ? '1' : '0',
    motion: prefs.motion ? '1' : '0'
  };
}

export {
  DEFAULTS,
  normalizeAppearance,
  readAppearance,
  applyAppearance,
  saveAppearance,
  appearancePayload
};
