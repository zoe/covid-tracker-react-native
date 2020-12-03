export type VaccineRequest = {
  id: string;
  version: string; // document/schema version
  patient: string; //	Patient id

  taken: boolean;
};
