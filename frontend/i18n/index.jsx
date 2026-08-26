import { createContext, useCallback, useContext, useMemo } from 'react';
import ro from './locales/ro.json';
import en from './locales/en.json';
import { MENTOR_LOCALES, UI_LOCALES, resolveUiLocale, translate as translateMessage } from './translate.js';

const MESSAGES = { ro, en };

const I18nContext = createContext({
  locale: 'ro',
  t: (key) => key,
  uiLocales: UI_LOCALES,
  mentorLocales: MENTOR_LOCALES
});

export function I18nProvider({ locale = 'ro', children }) {
  const resolved = resolveUiLocale(locale);
  const t = useCallback((key, vars) => translateMessage(MESSAGES, resolved, key, vars), [resolved]);
  const value = useMemo(() => ({
    locale: resolved,
    t,
    uiLocales: UI_LOCALES,
    mentorLocales: MENTOR_LOCALES
  }), [resolved, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export { MESSAGES, UI_LOCALES, MENTOR_LOCALES };
