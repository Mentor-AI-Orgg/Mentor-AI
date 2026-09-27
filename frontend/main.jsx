import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AppErrorBoundary from './components/AppErrorBoundary.jsx';
import { applyAppearance, readAppearance } from './themePrefs.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import './BorderGlow.css';
import './tailwind.css';

applyAppearance(readAppearance());

if (import.meta.env.PROD && ('serviceWorker' in navigator)) {
  const hostOk = location.protocol === 'https:' || location.hostname === 'localhost';
  if (hostOk) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        registration.addEventListener('updatefound', () => {
          const worker = registration.installing;
          if (!worker) return;
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              window.dispatchEvent(new CustomEvent('s10-update'));
            }
          });
        });
      }).catch(() => {});
    });
  }
}

createRoot(document.getElementById('root')).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
