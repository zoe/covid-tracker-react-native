import Locales from './utils/Locales';

const Config = {
  i18nDir: 'assets/lang',
  defaultLocale: 'en',
};

const locales = new Locales(Config.i18nDir);
const defaultI18nKeys = locales.getI18nKeys(Config.defaultLocale);

export const compareLocale = (locale: string) => {
  const localeI18nKeys = locales.getI18nKeys(locale);

  if (defaultI18nKeys.length !== localeI18nKeys.length) {
    const additional = localeI18nKeys.filter((key: string) => !defaultI18nKeys.includes(key));
    console.log("[I18N] Doesn't exist in default:", additional);

    const missing = defaultI18nKeys.filter((key: string) => !localeI18nKeys.includes(key));
    console.log('[I18N] Missing from', locale, ':', missing);
  }
};
