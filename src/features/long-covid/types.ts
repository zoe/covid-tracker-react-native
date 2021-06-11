export interface ILongCovid {
  id?: string | null;
  patient?: string | null;
  had_covid: string | null;
  duration: string | null;
  restriction: string | null;

  // checkboxes
  problems_thinking_and_communicating: boolean;
  mood_changes: boolean;
  poor_sleep: boolean;
  body_aches: boolean;
  muscle_aches: boolean;
  skin_rashes: boolean;
  bone_or_joint_pain: boolean;
  headaches: boolean;
  light_headed: boolean;
  altered_taste_or_smell: boolean;
  breathing_problems: boolean;
  heart_problems: boolean;
  abdominal_pain_diarrhoea: boolean;
  other_checkbox?: boolean; // For display only - not BE model
  other: string | null;

  // Q18
  at_least_one_vaccine: string | null;
  ongoing_symptom_week_before_first_vaccine: string | null;

  // Q20
  symptom_change_2_weeks_after_first_vaccine: string | null;

  // Q21 - list of rapid fire symptom changes
  symptom_change_headache: string | null;
  symptom_change_smell: string | null;
  symptom_change_voice: string | null;
  symptom_change_cough: string | null;
  symptom_change_appetite: string | null;
  symptom_change_sore_throat: string | null;
  symptom_change_chest_pain: string | null;
  symptom_change_fatigue: string | null;
  symptom_change_muscle_joint_pain: string | null;
  symptom_change_abdominal_pain: string | null;
  symptom_change_diarrhoea: string | null;
  symptom_change_fever: string | null;

  symptom_change_comments: string | null;
}
