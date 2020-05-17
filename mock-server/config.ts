const config: { [x: string]: { path: string; defaultData?: unknown } } = {
  patients: {
    path: './mock-server/patients.json',
    defaultData: {
      '00000000-0000-0000-0000-000000000000': {
        id: '00000000-0000-0000-0000-000000000000',
        avatar_name: 'profile1',
        name: 'Me',
      },
    },
  },
  assessments: {
    path: './mock-server/assassments.json',
  },
  covidTests: {
    path: './mock-server/covid_tests.json',
  },
};

export default config;
