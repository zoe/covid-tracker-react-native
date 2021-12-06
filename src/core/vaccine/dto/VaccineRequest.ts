import i18n from '@covid/locale/i18n';

export type TVaccineRequest = {
  id: string;
  version: string; // document/schema version
  patient: string; //	Patient id
  doses: TDose[];

  // These are deprecated fields; this data now lives on the Dose itself
  description?: string; // eg 'mRNA'
  vaccine_type?: EVaccineTypes;
  brand?: EVaccineBrands | null;
  placebo?: EPlaceboStatus | null;
  mechanism?: EVaccineMechanisms;
};

export enum EVaccineLocations {
  GP = 'gp',
  CARE_HOME = 'care_home',
  HOME = 'home',
  VAC_CENTRE = 'vac_centre',
  PHARMACY = 'pharmacy',
  HOSPITAL = 'hospital',
  OTHER = 'other',
}

export type TDose = {
  id: string;
  vaccine: string;
  vaccine_type?: EVaccineTypes;
  location: EVaccineLocations | null;
  sequence: number;
  date_taken_specific: string;
  brand: EVaccineBrands | null;
  description: string; // eg 'mRNA'
  batch_number: string | null;
  placebo?: EPlaceboStatus;
  mechanism?: EVaccineMechanisms | null;
};

export type TDoseSymptomsRequest = {
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
  bleeding_injection_site: boolean;
  metallic_taste: boolean;
  other: string;
};

export enum EVaccineTypes {
  COVID_TRIAL = 'covid_trial', // deprecated - not actively used
  COVID_VACCINE = 'covid_vaccine',
  SEASONAL_FLU = 'flu_seasonal',
}

export enum EVaccineMechanisms {
  ARM_INJECTION = 'arm_injection',
  NASAL_SPRAY = 'nasal_spray',
  DONT_KNOW = 'dont_know',
}

export enum EVaccineBrands {
  PFIZER = 'pfizer',
  ASTRAZENECA = 'astrazeneca',
  MODERNA = 'moderna',
  JOHNSON = 'johnson',
  TRIAL = 'vaccine_trial',
  NOT_SURE = 'not_sure',
}

export const vaccineBrandDisplayName = {
  [EVaccineBrands.PFIZER]: 'Pfizer/BioNTech',
  [EVaccineBrands.ASTRAZENECA]: 'Oxford/AstraZeneca',
  [EVaccineBrands.MODERNA]: 'Moderna',
  [EVaccineBrands.JOHNSON]: 'Johnson & Johnson',
  [EVaccineBrands.TRIAL]: i18n.t('vaccines.your-vaccine.name-trial-short'),
  [EVaccineBrands.NOT_SURE]: i18n.t('vaccines.your-vaccine.name-i-dont-know'),
};

export enum EPlaceboStatus {
  YES = 'yes',
  NO = 'no',
  UNSURE = 'unsure',
}
