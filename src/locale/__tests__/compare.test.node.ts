import { compareLocale } from '../compare';

let mockedLocaleKeys: string[] = [];
jest.mock('../utils/Locales', () => ({
  __esModule: true,
  default: () => ({
    getI18nKeys: jest
      .fn()
      .mockImplementation((locale: string) => (locale === 'en' ? ['key1', 'key2', 'key3', 'key4'] : mockedLocaleKeys)),
  }),
}));

const mockedGlobalConsole = jest.spyOn(global.console, 'log').mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

it('should count an error for each locale key that does not exist in default', () => {
  mockedLocaleKeys = ['key1', 'key2', 'key3', 'key4', 'locale_key_1', 'locale_key_2'];
  expect(compareLocale('sv-SE')).toBe(2);
  expect(mockedGlobalConsole).toHaveBeenCalledTimes(2);
});

it('should count an error for each default key missing in the locale', () => {
  mockedLocaleKeys = ['key1', 'key3'];
  expect(compareLocale('sv-SE')).toBe(2);
  expect(mockedGlobalConsole).toHaveBeenCalledTimes(2);
});

it('should not count an error for ignored locale keys', () => {
  mockedLocaleKeys = ['key1', 'key2', 'key3', 'key4', '__IGNORE__.locale_key_1', '__IGNORE__.locale_key_2'];
  expect(compareLocale('sv-SE')).toBe(0);
  expect(mockedGlobalConsole).toHaveBeenCalledTimes(2);
});
