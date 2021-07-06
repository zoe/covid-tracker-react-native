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

export type TFeedbackId =
  | 'im_only_interested_in_fighting_covid_19_right_now'
  | 'commercial_purposes'
  | 'the_disease_or_disorder_i_care_about_isnt_listed'
  | 'its_too_much_effort'
  | 'i_dont_feel_informed_enough'
  | 'i_dont_think_i_can_make_a_real_impact'
  | 'other';

export type TFeedbackData = {
  [key in TFeedbackId]?: string;
};

export type TReconsentState = {
  diseasePreferences: TDiseasePreferencesData;
  feedbackData: TFeedbackData;
};

export type TUpdateFeedbackAction = {
  feedbackId: TFeedbackId;
  value: string | undefined;
};
