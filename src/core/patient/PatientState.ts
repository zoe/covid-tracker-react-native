import { Profile } from '@covid/core/profile/ProfileService';

export type PatientStateType = {
  patientId: string;
  profile: Profile;
  isHealthWorker: boolean;
  hasCompletedPatientDetails: boolean;
  hasBloodPressureAnswer: boolean;
  isFemale: boolean;
  isPeriodCapable: boolean;
  isReportedByAnother: boolean;
  isSameHousehold: boolean;
  shouldAskStudy: boolean;
  hasRaceEthnicityAnswer: boolean;
  hasAtopyAnswers: boolean;
  hasDiabetes: boolean;
  hasDiabetesAnswers: boolean;
  shouldAskExtendedDiabetes: boolean;
  hasHayfever: boolean;
  shouldShowUSStudyInvite: boolean;
  hasBloodGroupAnswer: boolean;
  hasSchoolGroup: boolean;
  isMinor: boolean;
  shouldShowVaccineList: boolean;
};

const initPatientState: PatientStateType = {
  hasAtopyAnswers: true,
  hasBloodGroupAnswer: true,
  hasBloodPressureAnswer: true,
  hasCompletedPatientDetails: true,
  hasDiabetes: false,
  hasDiabetesAnswers: true,
  hasHayfever: false,
  hasRaceEthnicityAnswer: true,
  hasSchoolGroup: false,
  isFemale: false,
  isHealthWorker: false,
  isMinor: false,
  isPeriodCapable: false,
  isReportedByAnother: false,
  isSameHousehold: false,
  patientId: '',
  profile: {
    avatar_name: 'profile1',
    id: '',
    name: 'Bob',
    reported_by_another: false,
  },
  shouldAskExtendedDiabetes: false,
  shouldAskStudy: false,
  shouldShowUSStudyInvite: false,
  shouldShowVaccineList: false,
};

export const getInitialPatientState = (patientId: string): PatientStateType => {
  return {
    ...initPatientState,
    patientId,
  } as PatientStateType;
};

export const isMinorAge = (yearOfBirth: number): boolean => {
  const age = new Date().getFullYear() - yearOfBirth;
  return age >= 0 && age < 20;
};
