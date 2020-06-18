export type LifestyleRequest = {
  id: string;
  version: string; // document/schema version
  patient: string; //	Patient id

  weight_change: string;
  diet_change: string;
  snacking_change: string;
  activity_change: string;
  alcohol_change: string;
};
