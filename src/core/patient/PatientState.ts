import { Profile } from '@covid/components/Collections/ProfileList';

export type PatientStateType = {
  patientId: string;
  profile: Profile;
  isHealthWorker: boolean;
  isNHSStudy: boolean;
  hasCompletedPatientDetails: boolean;
  hasBloodPressureAnswer: boolean;
  isFemale: boolean;
  isPeriodCapable: boolean;
  isReportedByAnother: boolean;
  isSameHousehold: boolean;
  shouldAskStudy: boolean;
  hasRaceEthnicityAnswer: boolean;
  hasPeriodAnswer: boolean;
  hasHormoneTreatmentAnswer: boolean;
  hasVitaminAnswer: boolean;
  hasAtopyAnswers: boolean;
  hasDiabetes: boolean;
  hasDiabetesAnswers: boolean;
  shouldAskExtendedDiabetes: boolean;
  hasHayfever: boolean;
  shouldShowUSStudyInvite: boolean;
  hasBloodGroupAnswer: boolean;
  hasSchoolGroup: boolean;
};

const initPatientState: PatientStateType = {
  patientId: '',
  hasHayfever: false,
  profile: {
    name: 'Bob',
    avatar_name: 'profile1',
    reported_by_another: false,
    id: '',
  },
  isHealthWorker: false,
  isNHSStudy: false,
  hasCompletedPatientDetails: true,
  hasBloodPressureAnswer: true,
  isFemale: false,
  isPeriodCapable: false,
  isReportedByAnother: false,
  isSameHousehold: false,
  shouldAskStudy: false,
  hasRaceEthnicityAnswer: true,
  hasPeriodAnswer: true,
  hasHormoneTreatmentAnswer: true,
  hasVitaminAnswer: true,
  hasAtopyAnswers: true,
  shouldShowUSStudyInvite: false,
  hasDiabetes: false,
  hasDiabetesAnswers: true,
  shouldAskExtendedDiabetes: false,
  hasBloodGroupAnswer: true,
  hasSchoolGroup: false,
};

export const getInitialPatientState = (patientId: string): PatientStateType => {
  return {
    ...initPatientState,
    patientId,
  } as PatientStateType;
};
