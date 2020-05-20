import { compareLocale } from '../src/locale/compare';

const args = process.argv;
const locale: string = args.length > 1 ? args[2] : '';

console.log('[I18N] Locale:', locale);
compareLocale(locale);
