import Locales from './utils/Locales';

const Config = {
  i18nDir: 'assets/lang',
  defaultLocale: 'en',
};

const IGNORE_PREFIX = '__IGNORE__.';

const locales = new Locales(Config.i18nDir);
const defaultI18nKeys = locales.getI18nKeys(Config.defaultLocale);

export const compareLocale = (locale: string): number => {
  const localeI18nKeys = locales.getI18nKeys(locale);
  let errors = 0;

  const additional = localeI18nKeys.filter(
    (key: string) => !key.startsWith(IGNORE_PREFIX) && !defaultI18nKeys.includes(key)
  );
  console.log("[I18N] Doesn't exist in default:", additional);
  errors += additional.length;

  const missing = defaultI18nKeys.filter(
    (key: string) => !localeI18nKeys.includes(key) && !localeI18nKeys.includes(IGNORE_PREFIX + key)
  );
  console.log('[I18N] Missing from', locale, ':', missing);
  errors += missing.length;

  return errors;
};
