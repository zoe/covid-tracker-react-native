export type VaccineResponse = {
  id: string;
};

export type DoseSymptomsResponse = {
  id: string;
};

export type VaccinePlanResponse = {
  id: string;
  patient_id: string;
};

export type VaccinePlansResponse = VaccinePlanResponse[];
