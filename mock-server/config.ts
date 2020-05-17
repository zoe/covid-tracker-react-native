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
    path: 'assassments.json',
  },
  covidTests: {
    path: 'covid_tests.json',
  },
};

export default config;
