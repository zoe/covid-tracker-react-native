import env from 'react-native-config';

export default {
  amplitudeKey: env.AMPLITUDE_KEY,
  apiBase: env.API_URL,

  assessmentVersion: '2.1.0',
  consentVersionSE: 'v2',
  consentVersionUK: 'v2.1',
  consentVersionUS: 'v1',

  covidTestVersion: '2.2.0',

  healthStudyConsentVersionUK: 'v1.0',
  nursesConsentVersionUS: 'v2',

  patientVersion: '1.6.0',

  privacyPolicyVersionSE: 'v3.0',
  privacyPolicyVersionUK: 'v4.0',
  privacyPolicyVersionUS: 'v1.3',

  ukValidationStudyAdVersion: 'v2',
  ukValidationStudyConsentVersion: 'v3',

  vaccineRegistryAdVersion: 'v2',
  vaccineRegistryVersion: 'v1',

  vaccineVersion: '1.0.0',
};
