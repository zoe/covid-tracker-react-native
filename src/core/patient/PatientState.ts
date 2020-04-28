import { AvatarName } from '../../utils/avatar';

export type PatientProfile = {
  name: string;
  avatarName: AvatarName;
  isPrimaryPatient: boolean;
};

export type PatientStateType = {
  patientId: string;
  profile: PatientProfile;
  isHealthWorker: boolean;
  hasCompletePatientDetails: boolean;
  hasBloodPressureAnswer: boolean;
  isFemale: boolean;
  isReportedByAnother: boolean;
  isSameHousehold: boolean;
  shouldAskLevelOfIsolation: boolean;
  shouldAskStudy: boolean;
  hasRaceAnswer: boolean;
};

const initPatientState = {
  profile: {
    name: 'Bob',
    avatarName: 'profile1',
    isPrimaryPatient: true,
  },
  isHealthWorker: false,
  hasCompletePatientDetails: true,
  hasBloodPressureAnswer: true,
  isFemale: false,
  isReportedByAnother: false,
  isSameHousehold: false,
  shouldAskLevelOfIsolation: false,
  shouldAskStudy: false,
  hasRaceAnswer: true,
} as Partial<PatientStateType>;

export const getInitialPatientState = (patientId: string): PatientStateType => {
  return {
    ...initPatientState,
    patientId,
  } as PatientStateType;
};
