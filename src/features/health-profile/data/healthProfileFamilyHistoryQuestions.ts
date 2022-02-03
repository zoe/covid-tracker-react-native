import { EFieldType } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { THealthProfileScreens } from '@covid/features/health-profile/data/healthProfileQuestions';

export const healthProfileFamilyHistoryQuestions: Partial<THealthProfileScreens> = {
  FAMILY_HISTORY: {
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
        propertyName: 'parents_or_siblings_had_cardiovascular_disease',
        question:
          'Have any of your parents or siblings had cardiovascular disease? Examples of cardiovascular disease include stroke, heart attack, heart disease, or angina.',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.YESNO,
        items: null,
        placeholder: null,
        pnts: true,
        propertyName: 'parents_or_siblings_had_diabetes',
        question: 'Have any of your parents or siblings had diabetes?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.YESNO,
        items: null,
        placeholder: null,
        pnts: true,
        propertyName: 'parents_or_siblings_had_cancer',
        question: 'Have any of your parents or siblings had cancer?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPFamilyHistory',
    testID: 'health-profile-family-history-screen',
    title: 'Family History',
  },
};
