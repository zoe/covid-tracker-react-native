export type VaccineResponse = {
  id: string;
};

export type DoseSymptomsResponse = {
  id: string;
};

export type VaccinePlanResponse = {
  id: string;
  patient: string;
};

export type VaccinePlansResponse = VaccinePlanResponse[];
