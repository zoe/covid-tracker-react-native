export type TUsualSelfSymptomFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Rarely';
export type TUsualSelfSymptomSeverity = 'low' | 'medium' | 'high';
export type TUsualSelfSymptomIcon = 'smile' | 'sad' | 'tired';

export type TUsualSelfFrequentSymptom = {
  symptom: string;
  severity: TUsualSelfSymptomSeverity;
  frequency: TUsualSelfSymptomFrequency;
};

export type TUsualSelfFrequentOtherSymptom = {
  description: string;
  severity: TUsualSelfSymptomSeverity;
  frequency: TUsualSelfSymptomFrequency;
};
