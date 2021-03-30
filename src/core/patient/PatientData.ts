import { PatientStateType } from '@covid/core/patient/PatientState';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { Profile } from '@covid/core/profile/ProfileService';

export type PatientData = {
  patientId: string;
  patientState: PatientStateType;
  patientInfo?: PatientInfosRequest;
  profile?: Profile;
};
