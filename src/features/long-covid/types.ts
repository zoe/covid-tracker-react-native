export type LongCovidQuestionPageOneData = {
    had_covid: string|null;
    duration: string|null;
    restriction: string|null;

    // checkboxes
    problems_thinking_and_communicating: boolean|null;
    mood_changes: boolean|null;
    poor_sleep: boolean|null;
    body_aches: boolean|null;
    muscle_aches: boolean|null;
    skin_rashes: boolean|null;
    bone_or_joint_pain: boolean|null;
    headaches: boolean|null;
    light_headed: boolean|null;
    altered_taste_or_smell: boolean|null;
    breathing_problems: boolean|null;
    heart_problems: boolean|null;
    abdominal_pain_diarrhoea: boolean|null;
    other: string|null;

    // Q18
    at_least_one_vaccine: boolean|null;
    ongoing_symptom_week_before_first_vaccine: string|null;

    // Q20
    symptom_change_2_weeks_after_first_vaccine: string|null;

    //Q21 - list of rapid fire symptom changes
    symptom_change_headache: string|null;

    symptom_change_comments: string|null;
};