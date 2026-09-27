import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AppErrorBoundary from './components/AppErrorBoundary.jsx';
import { applyAppearance, readAppearance } from './themePrefs.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import './BorderGlow.css';
import './tailwind.css';

applyAppearance(readAppearance());

createRoot(document.getElementById('root')).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
