import { readdirSync, existsSync, readFileSync } from 'fs';
import { parse, join } from 'path';

type DirectoryName = string;
type FilePath = string;
type Translations = object;
type Locale = string;

const JSON_EXT = '.json';
const EMPTY_STRING = '';

const listTranslationFiles = (dir: string): string[] => {
  return readdirSync(dir) || [];
};

const listLocales = (dir: string) => {
  return listTranslationFiles(dir).map((file) => parse(file).name);
};

const flattenKeys = (obj: object, prefix: string = EMPTY_STRING): any => {
  const keys = Object.entries(obj).map((pair: [string, string | object]) => {
    const [key, value] = pair;
    if (typeof value == 'string') {
      return prefix + key;
    } else if (value instanceof Object) {
      return flattenKeys(value, key + '.');
    }
    return prefix + key;
  });
  return keys.flat();
};

export default class Locales {
  localeDir: string;
  locales: object;

  constructor(localeDir: DirectoryName) {
    if (this.isDir(localeDir)) {
      this.localeDir = localeDir;
      this.locales = listLocales(this.localeDir);
    } else {
      throw new Error(`Can't find locale directory: ${localeDir}`);
    }
  }

  private isDir(dir: DirectoryName): boolean {
    return existsSync(dir);
  }

  private isFile(file: FilePath): boolean {
    return existsSync(file);
  }

  private getLocaleFile(locale: Locale): Translations {
    const filePath = join(this.localeDir, locale + JSON_EXT);
    // console.log('[LOCALE] filePath:', filePath);
    return this.isFile(filePath) ? JSON.parse(readFileSync(filePath).toString()) : {};
  }

  public getI18nKeys(locale: Locale) {
    const localeFile = this.getLocaleFile(locale);
    const keys = flattenKeys(localeFile);
    return keys;
  }
}
