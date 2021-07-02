export type TDiseasePreference = {
  IconComponent?: React.ComponentType<any>;
  name: string;
};

export interface IDiseasePreferencesData {
  diabetes: boolean;
  cvd: boolean;
}
