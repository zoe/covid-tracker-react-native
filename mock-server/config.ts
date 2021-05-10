import { DbConfig } from './types';

const config: DbConfig = {
  assessments: {
    path: 'assessments.json',
  },
  consents: {
    path: 'consents.json',
  },
  covidTests: {
    path: 'covid_tests.json',
  },
  dietStudies: {
    path: 'diet_studies.json',
  },
  patients: {
    defaultData: {
      '00000000-0000-0000-0000-000000000000': {
        avatar_name: 'profile1',
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Me',
      },
    },
    path: 'patients.json',
  },
  studyConsents: {
    path: 'study_consents.json',
  },
};

export default config;
