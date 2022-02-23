import { EFieldType } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { THealthProfileScreens } from '@covid/features/health-profile/data/healthProfileQuestions';

export const healthProfileBladderKidneysQuestions: Partial<THealthProfileScreens> = {
  BLADDER_KIDNEYS: {
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
        propertyName: 'has_kidney_disease',
        question: 'Have you ever been diagnosed with kidney or urinary diseases?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'has_kidney_disease',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.MULTISELECT,
        items: [
          {
            label: 'Chronic Kidney Disease CKD (e.g. incl. with diabetes and high blood pressure)',
            name: 'prior_kidney_or_urinary_diagnosis_ckd',
            testID: 'prior_kidney_or_urinary_diagnosis_ckd',
          },
          {
            label: 'Kidney stones',
            name: 'prior_kidney_or_urinary_diagnosis_kidney_stones',
            testID: 'prior_kidney_or_urinary_diagnosis_kidney_stones',
          },
          {
            label: 'Kidney infection',
            name: 'prior_kidney_or_urinary_diagnosis_kidney_infection',
            testID: 'prior_kidney_or_urinary_diagnosis_kidney_infection',
          },
          {
            label: 'Acute kidney injury (AKI)',
            name: 'prior_kidney_or_urinary_diagnosis_aki',
            testID: 'prior_kidney_or_urinary_diagnosis_aki',
          },
          {
            label: 'Bladder or Urinary Tract Infection (UTI)',
            name: 'prior_kidney_or_urinary_diagnosis_uti',
            testID: 'prior_kidney_or_urinary_diagnosis_uti',
          },
          {
            label: 'Overactive bladder',
            name: 'prior_kidney_or_urinary_diagnosis_overactive_bladder',
            testID: 'prior_kidney_or_urinary_diagnosis_overactive_bladder',
          },
          {
            label: 'Benign prostatic hypertrophy',
            name: 'prior_kidney_or_urinary_diagnosis_benign_prostatic_hypertrophy',
            testID: 'prior_kidney_or_urinary_diagnosis_benign_prostatic_hypertrophy',
          },
          {
            label: 'Other kidney or urinary diseases',
            name: 'prior_kidney_or_urinary_diagnosis_other',
            testID: 'prior_kidney_or_urinary_diagnosis_other',
          },
          {
            label: 'Prefer not to say',
            name: 'prior_kidney_or_urinary_diagnosis_pfnts',
            testID: 'prior_kidney_or_urinary_diagnosis_pfnts',
          },
        ],
        placeholder: null,
        pnts: false,
        propertyName: 'prior_kidney_or_urinary_diagnosis_multiselect',
        question: 'Please specify',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPBladderKidneys',
    testID: 'health-profile-bladder-kidneys-screen',
    title: 'Bladder & Kidneys',
  },
};
