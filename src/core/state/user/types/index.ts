import { TPatientData } from '@covid/core/patient/PatientData';

export type TStateUser = {
  ask_for_rating: boolean;
  authorizations: string[];
  country_code: string;
  currentPatient: TPatientData;
  is_tester: boolean;
  language_code: string;
  patients: string[];
  pii: string;
  push_tokens: string[];
  username: string;
};
