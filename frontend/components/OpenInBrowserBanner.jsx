import { useState } from 'react';
import { shouldShowBrowserBanner } from '../inAppBrowser.js';

const DISMISS_KEY = 's10-browser-banner';

function readDismissed() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

const OpenInBrowserBanner = () => {
  const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  const [visible, setVisible] = useState(() => shouldShowBrowserBanner(ua, readDismissed()));
  if (!visible) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* bannerul dispare oricum pentru vizita asta */
    }
    setVisible(false);
  };

  return (
    <div className="browser-banner" role="status">
      <p>Pentru o experiență mai bună, deschide în browser. Apasă ⋮, apoi „Deschide în browser”.</p>
      <button type="button" className="ghost-button" onClick={dismiss}>Am înțeles</button>
    </div>
  );
};

export default OpenInBrowserBanner;
