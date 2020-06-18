export type LifestyleRequest = {
  id: string;
  version: string; // document/schema version
  patient: string; //	Patient id

  weight_change: string;
  weight_change_pounds: number;
  weight_change_kg: number;
  diet_change: string;
  snacking_change: string;
  activity_change: string;
  alcohol_change: string;
};
