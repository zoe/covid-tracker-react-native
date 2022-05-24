import { TPatientData } from '@covid/core/patient/PatientData';

export const nullOrUndefined = (value: any): boolean => value === null || value === undefined;

/* Represents whether the current patient is a primary or secondary patient */
export const isPrimaryPatient = (patientData: TPatientData): boolean =>
  patientData.profile?.reported_by_another !== true;
