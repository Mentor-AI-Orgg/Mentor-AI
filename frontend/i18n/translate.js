export const UI_LOCALES = ['ro', 'en'];
export const MENTOR_LOCALES = ['ro', 'en', 'fr', 'de', 'es', 'it', 'ru', 'hu', 'tr', 'zh', 'ja'];

export function getByPath(object, path) {
  return path.split('.').reduce((current, key) => (
    current && typeof current === 'object' ? current[key] : undefined
  ), object);
}

export function interpolate(template, vars = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => (
    vars[key] == null ? `{${key}}` : String(vars[key])
  ));
}

export function resolveUiLocale(locale) {
  const normalized = String(locale || 'ro').slice(0, 2).toLowerCase();
  return UI_LOCALES.includes(normalized) ? normalized : 'ro';
}

export function translate(messages, locale, key, vars) {
  const ui = resolveUiLocale(locale);
  const table = messages[ui] || messages.ro;
  const value = getByPath(table, key) ?? getByPath(messages.ro, key) ?? key;
  return interpolate(value, vars);
}
