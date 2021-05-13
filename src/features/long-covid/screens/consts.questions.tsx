import i18n from '@covid/locale/i18n';

export const defaultState = {
    had_covid: null,
    duration: null,
    restriction: null,

    // checkboxes
    problems_thinking_and_communicating: null,
    mood_changes: null,
    poor_sleep: null,
    body_aches: null,
    muscle_aches: null,
    skin_rashes: null,
    bone_or_joint_pain: null,
    headaches: null,
    light_headed: null,
    altered_taste_or_smell: null,
    breathing_problems: null,
    heart_problems: null,
    abdominal_pain_diarrhoea: null,
    other: null,

    // back to dropdowns
    at_least_one_vaccine: false,
    ongoing_symptom_week_before_first_vaccine: null,
    symptom_change_2_weeks_after_first_vaccine: null,

    // Rapid fire symtpom changes
    symptom_change_headache: null,

    // comments at end
    symptom_change_comments: null,

};

export const dropdownItemsQ1 = [
    { value: 'YES_TEST', label: i18n.t('long-covid.q1-a1') },
    { value: 'YES_ADVICE', label: i18n.t('long-covid.q1-a2') },
    { value: 'YES_SUSPICION', label: i18n.t('long-covid.q1-a3') },
    { value: 'NO', label: i18n.t('long-covid.q1-a4') },
    { value: 'UNSURE', label: i18n.t('long-covid.q1-a5') },
    { value: 'DECLINE_TO_SAY', label: i18n.t('long-covid.q1-a6') },
];

export const dropdownItemsQ2 = [
    { value: 'LESS_THAN_TWO_WEEKS', label: i18n.t('long-covid.q2-a1') },
    { value: '2_TO_3_WEEKS', label: i18n.t('long-covid.q2-a2') },
    { value: '4_TO_12_WEEKS', label: i18n.t('long-covid.q2-a3') },
    { value: 'MORE_THAN_12_WEEKS', label: i18n.t('long-covid.q2-a4') },
];

export const dropdownItemsQ3 = [
    { value: 'LESS_THAN_TWO_WEEKS', label: i18n.t('long-covid.q3-a1') },
    { value: '1_TO_3_DAYS', label: i18n.t('long-covid.q3-a2') },
    { value: '4_TO_6_DAYS', label: i18n.t('long-covid.q3-a3') },
    { value: '7_TO_13_DAYS', label: i18n.t('long-covid.q3-a4') },
    { value: '2_TO_3_WEEKS', label: i18n.t('long-covid.q3-a5') },
    { value: '4_TO_12_WEEKS', label: i18n.t('long-covid.q3-a6') },
    { value: 'MORE_THAN_12_WEEKS', label: i18n.t('long-covid.q3-a7') },
];

export const checkBoxQuestions4To17 = [];

export const dropdownItemsQ18 = [
    { value: true, label: i18n.t('long-covid.q18-a1') },
    { value: false, label: i18n.t('long-covid.q18-a2') },
];

export const dropdownItemsQ19 = [
    { value: 'YES', label: i18n.t('long-covid.q19-a1') },
    { value: 'NO', label: i18n.t('long-covid.q19-a2') },
    { value: 'NOT_SURE', label: i18n.t('long-covid.q19-a3') },
];

export const dropdownItemsSymptomsChange = [
    { value: 'YES_ALL_BETTER', label: i18n.t('long-covid.symptoms-change-a1') },
    { value: 'YES_SOME_BETTER', label: i18n.t('long-covid.symptoms-change-a2') },
    { value: 'NO_CHANGE', label: i18n.t('long-covid.symptoms-change-a3') },
    { value: 'YES_SOME_WORSE', label: i18n.t('long-covid.symptoms-change-a4') },
    { value: 'YES_ALL_WORSE', label: i18n.t('long-covid.symptoms-change-a5') },
    { value: 'SOME_IMPROVED', label: i18n.t('long-covid.symptoms-change-a6') },
    { value: 'NOT_YET_TWO_WEEKS', label: i18n.t('long-covid.symptoms-change-a7') },
    { value: 'OTHER', label: i18n.t('long-covid.symptoms-change-a8') },
];



