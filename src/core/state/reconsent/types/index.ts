export type TDisease =
  | 'dementia'
  | 'cardiovascular_diseases'
  | 'cancer'
  | 'joint_and_bone_diseases'
  | 'mental_health'
  | 'womens_health'
  | 'vision_and_hearing_conditions'
  | 'autoimmune_conditions'
  | 'skin_conditions'
  | 'lung_diseases'
  | 'neurological_conditions';

export type TDiseasePreferencesData = {
  [key in TDisease]?: boolean;
};

export interface IReconsent {
  diseasePreferences: TDiseasePreferencesData;
}
