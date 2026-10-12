import { Suspense } from 'react';
import { lazyWithRetry } from '../lazyWithRetry.js';

const FloatingLines = lazyWithRetry(() => import('./FloatingLines.jsx'));

export default function AppBackground(props) {
  return (
    <Suspense fallback={null}>
      <FloatingLines {...props} />
    </Suspense>
  );
}
