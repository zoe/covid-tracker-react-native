import { compareLocale } from '../src/locale/compare';

const args = process.argv;
const locale: string = args.length > 2 ? args[2] : '';

console.log('[I18N] Locale:', locale);
const errors = compareLocale(locale);
console.log('[I18N] Errors:', errors);

process.exit(errors ? 1 : 0);
