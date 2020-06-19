import { AvatarName } from '@covid/utils/avatar';

export type PatientProfile = {
  name: string;
  avatarName: AvatarName;
  isPrimaryPatient: boolean;
};

export type PatientStateType = {
  patientId: string;
  profile: PatientProfile;
  isHealthWorker: boolean;
  hasCompletedPatientDetails: boolean;
  hasBloodPressureAnswer: boolean;
  isFemale: boolean;
  isPeriodCapable: boolean;
  isReportedByAnother: boolean;
  isSameHousehold: boolean;
  shouldAskLevelOfIsolation: boolean;
  shouldAskStudy: boolean;
  shouldAskLifestyleQuestion: boolean;
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
};

const initPatientState = {
  profile: {
    name: 'Bob',
    avatarName: 'profile1',
    isPrimaryPatient: true,
  },
  isHealthWorker: false,
  hasCompletedPatientDetails: true,
  hasBloodPressureAnswer: true,
  isFemale: false,
  isPeriodCapable: false,
  isReportedByAnother: false,
  isSameHousehold: false,
  shouldAskLevelOfIsolation: false,
  shouldAskStudy: false,
  shouldAskLifestyleQuestion: false,
  hasRaceEthnicityAnswer: true,
  hasPeriodAnswer: true,
  hasHormoneTreatmentAnswer: true,
  hasVitaminAnswer: true,
  hasAtopyAnswers: true,
  shouldShowUSStudyInvite: false,
  hasDiabetes: false,
  hasDiabetesAnswers: true,
  shouldAskExtendedDiabetes: false,
} as Partial<PatientStateType>;

export const getInitialPatientState = (patientId: string): PatientStateType => {
  return {
    ...initPatientState,
    patientId,
  } as PatientStateType;
};
