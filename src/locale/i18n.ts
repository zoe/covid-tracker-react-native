import i18n from 'i18n-js';

i18n.fallbacks = true;
i18n.translations = {
  en: require('@assets/lang/en.json'),
  es: require('@assets/lang/es.json'),
  'en-US': require('@assets/lang/en-US.json'),
  'sv-SE': require('@assets/lang/sv-SE.json'),
};

export default i18n;
