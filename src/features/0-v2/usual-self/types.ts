import { TUsualSelfSymptomFrequency, TUsualSelfSymptomSeverity } from '../assessment-flow/types';

export type TSymptomDisplayType = 'multi_select' | 'single_select' | 'text';

export type TSubSymptom = {
  id: number;
  name: string;
  display_name: string;
  category: number;
};

export type TSymptom = {
  id: number;
  name: string;
  display_name: string;
  display_type: TSymptomDisplayType;
  category: number;
  symptoms: TSubSymptom[];
};

export type TSymptomCategory = {
  id: number;
  name: string;
  display_name: string;
  display_type: TSymptomDisplayType;
  symptoms: TSymptom[];
};

export type TUsualSelfSymptom = {
  name: string;
  frequency: TUsualSelfSymptomFrequency;
  severity: TUsualSelfSymptomSeverity;
};

export type TUsualSelfOtherSymptom = {
  description: string;
  frequency: string;
  severity: string;
};

export type TUsualSelf = {
  patient: string;
  symptoms: TUsualSelfSymptom[];
  other_symptoms: TUsualSelfOtherSymptom[];
};

export type TAssessment = {
  patient: string;
  symptoms: TUsualSelfSymptom[];
  other_symptoms: TUsualSelfOtherSymptom[];
  reasons?: string[];
};

export type TSymptomReason = {
  id: number;
  name: string;
  display_name: string;
};

export const SYMPTOM_FREQUENCY_LABELS = [
  { label: 'Rarely', selected: false },
  { label: 'Monthly', selected: false },
  { label: 'Weekly', selected: false },
  { label: 'Daily', selected: false },
];

export const SYMPTOM_SEVERITY_LABELS = [
  { label: 'Low', selected: false },
  { label: 'Medium', selected: false },
  { label: 'High', selected: false },
];
