import * as scrubModule from '@shared/sentryScrub.js';

const scrubSentryEvent = scrubModule.scrubSentryEvent || scrubModule.default?.scrubSentryEvent;

function sampleRate() {
  const raw = import.meta.env.VITE_SENTRY_SAMPLE_RATE;
  if (raw === undefined || raw === '') return 0.25;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) return 0.25;
  return parsed;
}

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return;
  import('@sentry/react').then(Sentry => {
    Sentry.init({
      dsn,
      sendDefaultPii: false,
      tracesSampleRate: 0,
      sampleRate: sampleRate(),
      maxBreadcrumbs: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      beforeBreadcrumb() {
        return null;
      },
      beforeSend(event) {
        return scrubSentryEvent ? scrubSentryEvent(event) : null;
      }
    });
  }).catch(() => {});
}

export function captureSentryException(error) {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn || !error) return;
  import('@sentry/react').then(Sentry => {
    const scrubbed = new Error(String(error && error.message || 'eroare').slice(0, 300));
    Sentry.captureException(scrubbed);
  }).catch(() => {});
}
