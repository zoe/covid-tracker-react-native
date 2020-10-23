import { API_URL, AMPLITUDE_KEY } from 'react-native-dotenv';

export default {
  apiBase: API_URL,
  amplitudeKey: AMPLITUDE_KEY,

  assessmentVersion: '2.0.0',
  patientVersion: '1.6.0',
  covidTestVersion: '1.2.0',
  dietStudyVersion: '1.0.0',

  nursesConsentVersionUS: 'v2',
  consentVersionUS: 'v1',
  consentVersionUK: 'v2.1',
  consentVersionSE: 'v2',

  privacyPolicyVersionUS: 'v1.3',
  privacyPolicyVersionUK: 'v3.0',
  privacyPolicyVersionSE: 'v3.0',

  ukValidationStudyConsentVersion: 'v3',
  ukValidationStudyAdVersion: 'v2',

  vaccineRegistryVersion: 'v1',
  vaccineRegistryAdVersion: 'v2',
  dietStudyBeyondCovidConsentVersion: 'v1',
};
