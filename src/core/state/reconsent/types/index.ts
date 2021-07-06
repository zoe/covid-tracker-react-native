export type TDisease =
  | 'research_consent_dementia'
  | 'research_consent_cardiovascular_diseases'
  | 'research_consent_cancer'
  | 'research_consent_joint_and_bone_diseases'
  | 'research_consent_mental_health'
  | 'research_consent_womens_health'
  | 'research_consent_vision_and_hearing_conditions'
  | 'research_consent_autoimmune_conditions'
  | 'research_consent_skin_conditions'
  | 'research_consent_lung_diseases'
  | 'research_consent_neurological_conditions';

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
