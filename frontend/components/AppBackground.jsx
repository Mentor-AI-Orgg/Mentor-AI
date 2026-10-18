import { Suspense } from 'react';
import { lazyWithRetry } from '../lazyWithRetry.js';
import { themeWash } from '../shopLook.js';

const FloatingLines = lazyWithRetry(() => import('./FloatingLines.jsx'));

export default function AppBackground({ washOnly = false, themeId, ...props }) {
  const wash = themeWash(themeId);
  return (
    <>
      {wash ? (
        <div
          className="shop-theme-wash"
          aria-hidden="true"
          style={{ '--theme-spot-a': wash[0], '--theme-spot-b': wash[1] }}
        />
      ) : null}
      {washOnly ? null : (
        <Suspense fallback={null}>
          <FloatingLines {...props} />
        </Suspense>
      )}
    </>
  );
}
