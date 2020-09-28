import config from './config';
import helpers from './helpers';
import { Patient, Assessment, CovidTest, Consent, StudyConsent, DietStudy } from './types';

const dbPath = './mock-server/db';

export default () => {
  const { bootstrap, get, save } = helpers(dbPath);
  const { patients, assessments, covidTests, dietStudies, consents, studyConsents } = config;

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
    dietStudies: {
      get: (id?: string) => get<DietStudy>(dietStudies.path)(id),
      save: (id: string, dietStudy: DietStudy): DietStudy => save<DietStudy>(dietStudies.path)(id, dietStudy),
    },
    covidTests: {
      get: (testId?: string) => get<CovidTest>(covidTests.path)(testId),
      save: (testId: string, test: CovidTest): CovidTest => save<CovidTest>(covidTests.path)(testId, test),
    },
    consents: {
      get: (testId?: string) => get<Consent>(consents.path)(testId),
      save: (testId: string, consent: Consent): Consent => save<Consent>(consents.path)(testId, consent),
    },
    studyConsents: {
      get: (testId?: string) => get<StudyConsent>(studyConsents.path)(testId),
      save: (testId: string, studyConsent: StudyConsent): StudyConsent =>
        save<StudyConsent>(studyConsents.path)(testId, studyConsent),
    },
  };
};
