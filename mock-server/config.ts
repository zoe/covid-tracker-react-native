import { DbConfig } from './types';

const config: DbConfig = {
  patients: {
    path: 'patients.json',
    defaultData: {
      '00000000-0000-0000-0000-000000000000': {
        id: '00000000-0000-0000-0000-000000000000',
        avatar_name: 'profile1',
        name: 'Me',
      },
    },
  },
  assessments: {
    path: 'assessments.json',
  },
  covidTests: {
    path: 'covid_tests.json',
  },
  dietStudies: {
    path: 'diet_studies.json',
  },
  consents: {
    path: 'consents.json',
  },
  studyConsents: {
    path: 'study_consents.json',
  },
};

export default config;
