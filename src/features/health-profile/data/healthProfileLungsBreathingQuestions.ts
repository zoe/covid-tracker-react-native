import { EFieldType } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { THealthProfileScreens } from '@covid/features/health-profile/data/healthProfileQuestions';

export const healthProfileLungsBreathingQuestions: Partial<THealthProfileScreens> = {
  LUNGS_BREATHING: {
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
        propertyName: 'prior_breathing_and_lung_condition_diagnosis',
        question: 'Have you ever been diagnosed with breathing and lung conditions by a doctor?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'prior_breathing_and_lung_condition_diagnosis',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.MULTISELECT,
        items: [
          {
            label: 'Asthma',
            name: 'prior_breathing_and_lung_diagnosis_asthma',
            testID: 'prior_breathing_and_lung_diagnosis_asthma',
          },
          {
            label: 'Sleep apnea',
            name: 'prior_breathing_and_lung_diagnosis_sleep_apnea',
            testID: 'prior_breathing_and_lung_diagnosis_sleep_apnea',
          },
          {
            label: 'COPD/ephysema/chronic bronchitis',
            name: 'prior_breathing_and_lung_diagnosis_copd_emphysema_bronchitis',
            testID: 'prior_breathing_and_lung_diagnosis_copd_emphysema_bronchitis',
          },
          {
            label: 'Lung disease',
            name: 'prior_breathing_and_lung_diagnosis_lung_disease',
            testID: 'prior_breathing_and_lung_diagnosis_lung_disease',
          },
          {
            label: 'Other',
            name: 'prior_breathing_and_lung_diagnosis_other',
            testID: 'prior_breathing_and_lung_diagnosis_other',
          },
          {
            label: 'Prefer not to say',
            name: 'prior_breathing_and_lung_diagnosis_pfnts',
            testID: 'prior_breathing_and_lung_diagnosis_pfnts',
          },
        ],
        placeholder: null,
        pnts: false,
        propertyName: 'prior_breathing_and_lung_diagnosis_multiselect',
        question: 'Which of the following breathing and lung conditions were you diagnosed with?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPLungsBreathing',
    testID: 'health-profile-lungs-breathing-screen',
    title: 'Lungs & Breathing',
  },
};
