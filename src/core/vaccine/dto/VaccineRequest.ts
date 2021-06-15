import i18n from '@covid/locale/i18n';

export type VaccineRequest = {
  id: string;
  version: string; // document/schema version
  patient: string; //	Patient id

  vaccine_type: VaccineTypes;
  brand: VaccineBrands | null;
  placebo: PlaceboStatus | null;
  doses: Partial<Dose>[];
  description: string; // eg 'mRNA'
};

export type Dose = {
  id: string;
  vaccine: string;
  location: VaccineLocations;
  sequence: number;
  date_taken_specific: string;
  brand: VaccineBrands | null;
  description: string; // eg 'mRNA'
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
  bruising: boolean;
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
  MODERNA = 'moderna',
  JOHNSON = 'johnson',
  NOT_SURE = 'not_sure',
}

export const vaccineBrandDisplayName = {
  [VaccineBrands.PFIZER]: 'Pfizer/BioNTech',
  [VaccineBrands.ASTRAZENECA]: 'Oxford/Astrazeneca',
  [VaccineBrands.MODERNA]: 'Moderna',
  [VaccineBrands.JOHNSON]: 'Johnson and Johnson',
  [VaccineBrands.NOT_SURE]: i18n.t('vaccines.your-vaccine.name-i-dont-know'),
};

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
