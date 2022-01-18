export enum EDiabetesOralMedsFieldnames {
  BIGUANIDE = 'diabetes_oral_biguanide',
  SULFONYLUREA = 'diabetes_oral_sulfonylurea',
  DPP4 = 'diabetes_oral_dpp4',
  MEGLITINIDES = 'diabetes_oral_meglitinides',
  THIAZOLIDNEDIONES = 'diabetes_oral_thiazolidinediones',
  ORAL_SGLT2 = 'diabetes_oral_sglt2',
  OTHER_MED_NOT_LISTED = 'diabetes_oral_other_medication_not_listed',
}

export interface IDiabetesOralMedsData {
  diabetesOralMeds: EDiabetesOralMedsFieldnames[];
  diabetesOralOtherMedicationNotListed: boolean;
  diabetesOralOtherMedication?: string;
}
