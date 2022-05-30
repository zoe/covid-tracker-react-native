import { TUsualSelfFrequentOtherSymptom, TUsualSelfFrequentSymptom } from '../../types';

const symptomsHaveSeverity = (symptoms: TUsualSelfFrequentSymptom[] | TUsualSelfFrequentOtherSymptom[]): boolean => {
  const symptomsWithoutSeverity = symptoms.filter(
    ({ severity }: TUsualSelfFrequentSymptom | TUsualSelfFrequentOtherSymptom) =>
      severity === null || severity === undefined,
  );
  return symptomsWithoutSeverity.length === 0;
};

export const isFormValid = (
  usualSymptoms: TUsualSelfFrequentSymptom[] | undefined,
  newAdditionalSymptoms: TUsualSelfFrequentSymptom[] | undefined,
  newAdditionalOtherSymptoms: TUsualSelfFrequentOtherSymptom[] | undefined,
): boolean => {
  const isValidAdditionalSymptoms = newAdditionalSymptoms ? symptomsHaveSeverity(newAdditionalSymptoms) : true;
  const isValidAdditionalOtherSymptoms = newAdditionalOtherSymptoms
    ? symptomsHaveSeverity(newAdditionalOtherSymptoms)
    : true;
  const isValidusualSymptoms = usualSymptoms ? symptomsHaveSeverity(usualSymptoms) : true;
  return isValidAdditionalSymptoms && isValidAdditionalOtherSymptoms && isValidusualSymptoms;
};

const cleanSymptoms = (data: TUsualSelfFrequentSymptom[]) => {
  return data.map((s) => {
    return {
      frequency: '',
      severity: s.severity,
      symptom: s.symptom !== undefined ? s.symptom : s.name,
    };
  });
};

const cleanUsualSymptoms = (data: TUsualSelfFrequentSymptom[]) => {
  return data.map((s) => ({
    frequency: s.frequency,
    severity: s.severity,
    symptom: s.symptom,
  }));
};

const cleanOtherSymptoms = (data: TUsualSelfFrequentOtherSymptom[]) => {
  return data.map((s) => ({
    description: s.description,
    frequency: '',
    severity: s.severity,
  }));
};

export const makeReport = (
  patientID: string,
  usualSymptoms: TUsualSelfFrequentSymptom[],
  uncheckedUsualSymptoms: TUsualSelfFrequentSymptom[],
  usualOtherSymptoms: TUsualSelfFrequentOtherSymptom[],
  uncheckedUsualOtherSymptoms: TUsualSelfFrequentOtherSymptom[],
  additionalSymptoms?: TUsualSelfFrequentSymptom[],
  additionalOtherSymptoms?: TUsualSelfFrequentOtherSymptom[],
) => {
  const uncheckedNames = uncheckedUsualSymptoms.map((unchecked) => unchecked.symptom);
  const uncheckedOtherNames = uncheckedUsualOtherSymptoms.map((unchecked) => unchecked.description);
  const reportUsualSymptoms = usualSymptoms.filter((usual) => !uncheckedNames.includes(usual.symptom));
  const reportUsualOtherSymptoms = usualOtherSymptoms.filter(
    (usualOther) => !uncheckedOtherNames.includes(usualOther.description),
  );

  let cleanedOtherAdditionalSymptoms: any[] = [];
  if (additionalOtherSymptoms !== undefined && additionalOtherSymptoms.length > 0) {
    cleanedOtherAdditionalSymptoms = cleanOtherSymptoms(additionalOtherSymptoms);
  }

  let cleanedAdditionalSymptoms: any[] = [];
  if (additionalSymptoms !== undefined && additionalSymptoms.length > 0) {
    cleanedAdditionalSymptoms = cleanSymptoms(additionalSymptoms);
  }

  return {
    other_symptoms: [...(reportUsualOtherSymptoms || []), ...(cleanedOtherAdditionalSymptoms || [])],
    patient: patientID,
    symptoms: [...cleanUsualSymptoms(reportUsualSymptoms), ...(cleanedAdditionalSymptoms || [])],
  };
};
