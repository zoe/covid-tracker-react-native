import { Patient, Assessment } from './types';
import fs = require('fs');

const dbObjects: { [x: string]: { path: string; defaultData?: unknown } } = {
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
};

export default () => {
  Object.values(dbObjects).forEach((dbObject) => {
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
      get: (patientId?: string) => get<Patient>(dbObjects.patients.path)(patientId),
      save: (patientId: string, patient: Patient) => save<Patient>(dbObjects.patients.path)(patientId, patient),
    },
    assessments: {
      get: (assessmentId?: string) => get<Assessment>(dbObjects.assessments.path)(assessmentId),
      save: (assessmentId: string, assessment: Assessment): Assessment =>
        save<Assessment>(dbObjects.assessments.path)(assessmentId, assessment),
    },
  };
};
