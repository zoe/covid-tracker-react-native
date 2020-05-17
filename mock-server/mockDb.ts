import config from './config';
import helpers from './helpers';
import { Patient, Assessment, CovidTest } from './types';

const dbPath = './mock-server/db';

export default () => {
  const { bootstrap, get, save } = helpers(dbPath);
  const { patients, assessments, covidTests } = config;

  bootstrap(config);

  return {
    patients: {
      get: (patientId?: string) => get<Patient>(patients.path)(patientId),
      save: (patientId: string, patient: Patient) => save<Patient>(patients.path)(patientId, patient),
    },
    assessments: {
      get: (assessmentId?: string) => get<Assessment>(assessments.path)(assessmentId),
      save: (assessmentId: string, assessment: Assessment): Assessment =>
        save<Assessment>(assessments.path)(assessmentId, assessment),
    },
    covidTests: {
      get: (testId?: string) => get<CovidTest>(covidTests.path)(testId),
      save: (testId: string, test: CovidTest): CovidTest => save<CovidTest>(covidTests.path)(testId, test),
    },
  };
};
