export type CovidTest = {
    id: string; // Test schema version
    version: string; // Test schema version
    patient_id: string;

    result: string;
    mechanism: string;
    date_taken_specific: string;
    date_taken_between_start: string;
    date_taken_between_end: string;
}

export type CovidTestResponse = {
  id: string;
};