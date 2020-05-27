import { compareLocale } from './compare';

describe('i18n tests', () => {
  it('i18n strings should be complete', () => {
    const locales = ['sv-SE'];
    locales.forEach((locale) => {
      const numErrors = compareLocale(locale);
      expect(numErrors).toBe(0);
    });
  });
});
