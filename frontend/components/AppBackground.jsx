import { lazy, Suspense, useEffect, useState } from 'react';

const FloatingLines = lazy(() => import('./FloatingLines.jsx'));

function skipBackground() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true;
  if (document.documentElement.dataset.motion === 'off') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 720px)').matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  return coarse || narrow || saveData;
}

export default function AppBackground(props) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(!skipBackground());
  }, []);
  if (!on) return null;
  return (
    <Suspense fallback={null}>
      <FloatingLines {...props} />
    </Suspense>
  );
}
