import i18n from 'i18n-js';
import { mergeDeep } from 'immutable';
i18n.fallbacks = true;

const en = require('../../assets/lang/en.json');

i18n.translations = {
  en,
  'en-US': mergeDeep(en, require('../../assets/lang/en-US.json')),
  'sv-SE': require('../../assets/lang/sv-SE.json'),
};

export default i18n;
