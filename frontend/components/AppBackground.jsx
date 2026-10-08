import { lazy, Suspense } from 'react';

const FloatingLines = lazy(() => import('./FloatingLines.jsx'));

export default function AppBackground(props) {
  return (
    <Suspense fallback={null}>
      <FloatingLines {...props} />
    </Suspense>
  );
}
