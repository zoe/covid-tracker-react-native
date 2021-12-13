import {
  ECovidTestMechanismOptions,
  ECovidTestOmicronStatusOptions,
  ECovidTestResultOptions,
} from '@covid/core/user/dto/UserAPIContracts';

export type TCovidTest = {
  anti_n: string | null;
  anti_s: string | null;
  antibody_type_check: string | null;
  booked_via_gov: boolean;
  date_taken_between_end: string;
  date_taken_between_start: string;
  date_taken_specific: string;
  days_in_fridge: number | null;
  dualAntibodyResult: string;
  id: string;
  invited_to_test: boolean;
  is_rapid_test: boolean;
  location: string;
  location_other: string;
  mechanism: ECovidTestMechanismOptions;
  omicron_status: ECovidTestOmicronStatusOptions | null;
  patient: string;
  result: ECovidTestResultOptions | null;
  test_performed_by: string;
  time_of_test: string;
  trained_worker: string;
  type: ECovidTestType;
  version: string;
};

export enum ECovidTestType {
  Generic = 'generic',
  NHSStudy = 'nhs_study',
}

export type TCovidTestResponse = {
  id: string;
};
