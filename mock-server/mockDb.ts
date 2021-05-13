import config from './config';
import helpers from './helpers';
import { Assessment, Consent, CovidTest, DietStudy, Patient, StudyConsent } from './types';

const dbPath = './mock-server/db';

export default () => {
  const { bootstrap, get, save } = helpers(dbPath);
  const { patients, assessments, covidTests, dietStudies, consents, studyConsents } = config;

  bootstrap(config);

  return {
    assessments: {
      get: (assessmentId?: string) => get<Assessment>(assessments.path)(assessmentId),
      save: (assessmentId: string, assessment: Assessment): Assessment =>
        save<Assessment>(assessments.path)(assessmentId, assessment),
    },
    consents: {
      get: (testId?: string) => get<Consent>(consents.path)(testId),
      save: (testId: string, consent: Consent): Consent => save<Consent>(consents.path)(testId, consent),
    },
    covidTests: {
      get: (testId?: string) => get<CovidTest>(covidTests.path)(testId),
      save: (testId: string, test: CovidTest): CovidTest => save<CovidTest>(covidTests.path)(testId, test),
    },
    dietStudies: {
      get: (id?: string) => get<DietStudy>(dietStudies.path)(id),
      save: (id: string, dietStudy: DietStudy): DietStudy => save<DietStudy>(dietStudies.path)(id, dietStudy),
    },
    patients: {
      get: (patientId?: string) => get<Patient>(patients.path)(patientId),
      save: (patientId: string, patient: Patient) => save<Patient>(patients.path)(patientId, patient),
    },
    studyConsents: {
      get: (testId?: string) => get<StudyConsent>(studyConsents.path)(testId),
      save: (testId: string, studyConsent: StudyConsent): StudyConsent =>
        save<StudyConsent>(studyConsents.path)(testId, studyConsent),
    },
  };
};
