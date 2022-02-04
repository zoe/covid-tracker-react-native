import { EFieldType } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { THealthProfileScreens } from '@covid/features/health-profile/data/healthProfileQuestions';

export const healthProfileImmuneSystemQuestions: Partial<THealthProfileScreens> = {
  IMMUNE_SYSTEM: {
    description: null,
    hideWhyWeAskLink: false,
    questions: [
      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.YESNO,
        items: null,
        placeholder: null,
        pnts: true,
        propertyName: 'prior_immunodeficiency_condition_diagnosis',
        question: 'Have you ever been diagnosed with an immunodeficiency?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'prior_immunodeficiency_condition_diagnosis',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.IMMUNODEFICIENCY,
        items: [
          {
            label: 'Primary immunodeficiency (from birth)',
            name: 'prior_immunodeficiency_diagnosis_primary',
            testID: 'prior_immunodeficiency_diagnosis_primary',
          },
          {
            label: 'Immunodeficiency due to medication',
            name: 'prior_immunodeficiency_diagnosis_due_to_medication',
            testID: 'prior_immunodeficiency_diagnosis_due_to_medication',
          },
          {
            label: 'Acquired immunodeficiency (e.g. HIV)',
            name: 'prior_immunodeficiency_diagnosis_acquired',
            testID: 'prior_immunodeficiency_diagnosis_acquired',
          },
          {
            label: 'Other',
            name: 'prior_immunodeficiency_diagnosis_other_boolean', // NOTE: boolean in name - not saved to backend, but text field used instead within custom component
            testID: 'prior_immunodeficiency_diagnosis_other_boolean',
          },
          {
            label: 'Prefer not to say',
            name: 'prior_immunodeficiency_diagnosis_pfnts',
            testID: 'prior_immunodeficiency_diagnosis_pfnts',
          },
        ],
        placeholder: null,
        pnts: false,
        propertyName: 'prior_immunodeficiency_diagnosis_multiselect',
        question: 'Which of the following were you diagnosed with?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPImmuneSystem',
    testID: 'health-profile-immune-system-screen',
    title: 'Immune System',
  },
};
