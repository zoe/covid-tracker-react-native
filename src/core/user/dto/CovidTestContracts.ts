export type CovidTest = {
  id: string; // Test schema version
  version: string; // Test schema version
  patient: string;
  type: CovidTestType;

  result: string;
  mechanism: string;
  invited_to_test: boolean;
  trained_worker: string;
  location: string;
  location_other: string;
  date_taken_specific: string;
  date_taken_between_start: string;
  date_taken_between_end: string;
  days_in_fridge: number | null;
  time_of_test: string;
  is_rapid_test: boolean;
};

export enum CovidTestType {
  Generic = 'generic',
  NHSStudy = 'nhs_study',
}

export type CovidTestResponse = {
  id: string;
};
