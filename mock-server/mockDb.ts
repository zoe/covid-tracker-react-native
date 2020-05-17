import config from './config';
import { Patient, Assessment, CovidTest } from './types';
import fs = require('fs');

export default () => {
  Object.values(config).forEach((dbObject) => {
    const { path, defaultData } = dbObject;
    fs.exists(path, (exists) => {
      if (exists) {
        return;
      }

      fs.writeFile(path, JSON.stringify(defaultData ?? {}, null, ' '), () => {});
    });
  });

  const getObject = <T>(path: string): { [x: string]: T } => JSON.parse(fs.readFileSync(path, 'utf-8'));

  const get = <T>(path: string) => (id?: string): T | T[] =>
    id === undefined ? Object.values(getObject<T>(path)) : getObject<T>(path)[id];

  const save = <T>(path: string) => (id: string, newData: T): T => {
    const data = getObject<T>(path);
    data[id] = { ...newData };
    fs.writeFileSync(path, JSON.stringify(data, null, ' '), 'utf-8');
    return newData;
  };

  return {
    patients: {
      get: (patientId?: string) => get<Patient>(config.patients.path)(patientId),
      save: (patientId: string, patient: Patient) => save<Patient>(config.patients.path)(patientId, patient),
    },
    assessments: {
      get: (assessmentId?: string) => get<Assessment>(config.assessments.path)(assessmentId),
      save: (assessmentId: string, assessment: Assessment): Assessment =>
        save<Assessment>(config.assessments.path)(assessmentId, assessment),
    },
    covidTests: {
      get: (testId?: string) => get<CovidTest>(config.covidTests.path)(testId),
      save: (testId: string, test: CovidTest): CovidTest => save<CovidTest>(config.covidTests.path)(testId, test),
    },
  };
};
