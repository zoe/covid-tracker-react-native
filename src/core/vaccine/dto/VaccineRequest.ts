export type VaccineRequest = {
  id: string;
  version: string; // document/schema version
  patient: string; //	Patient id

  vaccine_type: VaccineTypes;
  brand: VaccineBrands | null;
  placebo: PlaceboStatus | null;
  doses: Partial<Dose>[];
  name: string;
};

export type VaccinePlanRequest = {
  id?: string;
  patient: string; //	Patient ID

  plan: string;

  reason_religion: boolean;
  reason_personal_belief: boolean;
  reason_pregnancy_breastfeeding: boolean;
  reason_safety: boolean;
  reason_knowledge: boolean;
  reason_illness: boolean;
  reason_availability: boolean;
  reason_unnecessary: boolean;
  reason_efficacy: boolean;
  reason_bad_reaction: boolean;
  reason_pfnts: boolean;

  other: string;
};

export type Dose = {
  id: string;
  vaccine: string;
  location: VaccineLocations;
  sequence: number;
  date_taken_specific: string;
  batch_number: string;
};

export type DoseSymptomsRequest = {
  id: string;
  patient: string; //	Patient ID
  dose: string; // Dose ID
  pain: boolean;
  redness: boolean;
  swelling: boolean;
  swollen_armpit_glands: boolean;
  warmth: boolean;
  itch: boolean;
  tenderness: boolean;
  other: string;
};

export enum VaccineTypes {
  COVID_TRIAL = 'covid_trial',
  COVID_VACCINE = 'covid_vaccine',
  SEASONAL_FLU = 'flu_seasonal',
}

export enum VaccineBrands {
  PFIZER = 'pfizer',
  ASTRAZENECA = 'astrazeneca',
}

export enum PlaceboStatus {
  YES = 'yes',
  NO = 'no',
  UNSURE = 'unsure',
}

export enum VaccineLocations {
  GP = 'gp',
  CARE_HOME = 'care_home',
  HOME = 'home',
  VAC_CENTRE = 'vac_centre',
  PHARMACY = 'pharmacy',
  HOSPITAL = 'hospital',
  OTHER = 'other',
}
