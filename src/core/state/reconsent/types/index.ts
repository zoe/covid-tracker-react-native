export type TDiseaseId =
  | 'research_consent_dementia'
  | 'research_consent_cardiovascular_diseases'
  | 'research_consent_cancer'
  | 'research_consent_joint_and_bone_diseases'
  | 'research_consent_mental_health'
  | 'research_consent_nutrition_and_gut_health'
  | 'research_consent_womens_health'
  | 'research_consent_vision_and_hearing_conditions'
  | 'research_consent_autoimmune_conditions'
  | 'research_consent_skin_conditions'
  | 'research_consent_lung_diseases'
  | 'research_consent_neurological_conditions'
  | 'prefer_not_to_say';

export type TDiseasePreferencesData = {
  [key in TDiseaseId]?: boolean;
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

export type TReturnScreenName = 'Dashboard' | 'Menu' | 'Studies';

export type TStateReconsent = {
  diseasePreferences: TDiseasePreferencesData;
  feedbackData: TFeedbackData;
  returnScreenName?: TReturnScreenName;
};

export type TUpdateReturnScreenNameAction = {
  returnScreenName: TReturnScreenName;
};

export type TUpdateFeedbackAction = {
  feedbackId: TFeedbackId;
  value: string | undefined;
};

export type TUpdateDiseasePreferenceAction = {
  diseaseId: TDiseaseId;
  value: boolean;
};

export type TSetDiseasePreferencesAction = {
  diseasePreferences: TDiseasePreferencesData;
};
