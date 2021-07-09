import env from 'react-native-config';

export default {
  amplitudeKey: env.AMPLITUDE_KEY,
  apiBase: env.API_URL,

  assessmentVersion: '2.1.0',
  consentVersionSE: 'v2',
  consentVersionUK: 'v2.1',
  consentVersionUS: 'v1',

  covidTestVersion: '1.2.0',

  // TODO: Update! https://www.notion.so/joinzoe/Product-Eng-Board-ca9e8b1b8926481f8c94cb01a88d567d?p=c301ee89dee24511b87acef8e36b0879
  diseaseResearchConsentVersionUK: 'TBD',
  diseaseResearchPrivacyPolicyVersionUK: 'TBD',

  nursesConsentVersionUS: 'v2',

  patientVersion: '1.6.0',

  privacyPolicyVersionSE: 'v3.0',

  privacyPolicyVersionUK: 'v3.0',
  privacyPolicyVersionUS: 'v1.3',

  ukValidationStudyAdVersion: 'v2',
  ukValidationStudyConsentVersion: 'v3',

  vaccineRegistryAdVersion: 'v2',
  vaccineRegistryVersion: 'v1',

  vaccineVersion: '1.0.0',
};
