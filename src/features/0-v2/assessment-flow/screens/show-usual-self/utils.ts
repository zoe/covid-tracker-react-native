import { TUsualSelfFrequentSymptom } from '../../types';

export const makeAssessment = (
  patientID: string,
  usualSymptoms?: TUsualSelfFrequentSymptom[],
  otherSymptoms?: any,
) => ({
  other_symptoms: otherSymptoms || [],
  patient: patientID,
  reasons: [],
  symptoms: usualSymptoms || [],
});
