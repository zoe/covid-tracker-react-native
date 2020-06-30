export type CovidTest = {
  id: string; // Test schema version
  version: string; // Test schema version
  patient: string;

  result: string;
  mechanism: string;
  invited_to_test: boolean;
  trained_worker: string;
  location: string;
  location_other: string;
  date_taken_specific: string;
  date_taken_between_start: string;
  date_taken_between_end: string;
};

export type CovidTestResponse = {
  id: string;
};
