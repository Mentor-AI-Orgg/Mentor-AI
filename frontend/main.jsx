import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initSentry } from './sentry.js';
import AppErrorBoundary from './components/AppErrorBoundary.jsx';
import { applyAppearance, readAppearance } from './themePrefs.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

applyAppearance(readAppearance());
import './BorderGlow.css';
import './tailwind.css';

function showUpdateBanner(registration) {
  if (document.getElementById('sw-update')) return;
  const bar = document.createElement('div');
  bar.id = 'sw-update';
  bar.className = 'sw-update';
  bar.setAttribute('role', 'status');
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Există o versiune nouă. Reîncarcă';
  button.addEventListener('click', () => {
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
    if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    else window.location.reload();
  });
  bar.append(button);
  document.body.append(bar);
}

function registerServiceWorker() {
  if (!import.meta.env.PROD) return;
  if (!('serviceWorker' in navigator)) return;
  const local = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (location.protocol !== 'https:' && !local) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      const announce = () => showUpdateBanner(registration);
      if (registration.waiting && navigator.serviceWorker.controller) announce();
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) announce();
        });
      });
    }).catch(() => {});
  });
}

initSentry();
registerServiceWorker();

createRoot(document.getElementById('root')).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
