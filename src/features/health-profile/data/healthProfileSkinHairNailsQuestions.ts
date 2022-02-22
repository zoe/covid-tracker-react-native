import { EFieldType } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { THealthProfileScreens } from '@covid/features/health-profile/data/healthProfileQuestions';

export const healthProfileSkinHairNailsQuestions: Partial<THealthProfileScreens> = {
  SKIN_HAIR_AND_NAILS: {
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
        propertyName: 'prior_skin_condition_diagnosis',
        question: 'Have you ever been diagnosed with a skin condition?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'prior_skin_condition_diagnosis',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.MULTISELECT,
        items: [
          {
            label: 'Venous leg ulcers',
            name: 'prior_skin_diagnosis_venous_leg_ulcers',
            testID: 'prior_skin_diagnosis_venous_leg_ulcers',
          },
          {
            label: 'Arterial leg ulcers',
            name: 'prior_skin_diagnosis_arterial_leg_ulcers',
            testID: 'prior_skin_diagnosis_arterial_leg_ulcers',
          },
          {
            label: 'Unknown leg ulcers',
            name: 'prior_skin_diagnosis_unknown_leg_ulcers',
            testID: 'prior_skin_diagnosis_unknown_leg_ulcers',
          },
          {
            label: 'Eczema',
            name: 'prior_skin_diagnosis_eczema',
            testID: 'prior_skin_diagnosis_eczema',
          },
          {
            label: 'Psoriasis',
            name: 'prior_skin_diagnosis_psoriasis',
            testID: 'prior_skin_diagnosis_psoriasis',
          },
          {
            label: 'Acne',
            name: 'prior_skin_diagnosis_acne',
            testID: 'prior_skin_diagnosis_acne',
          },
          {
            label: 'Thinning hair / baldness',
            name: 'prior_skin_diagnosis_thinning_hair_or_baldness',
            testID: 'prior_skin_diagnosis_thinning_hair_or_baldness',
          },
          {
            label: 'Cold sores',
            name: 'prior_skin_diagnosis_cold_sores',
            testID: 'prior_skin_diagnosis_cold_sores',
          },
          {
            label: 'Herpes zosters',
            name: 'prior_skin_diagnosis_herpes_zosters',
            testID: 'prior_skin_diagnosis_herpes_zosters',
          },
          {
            label: 'Alopecia',
            name: 'prior_skin_diagnosis_alopecia',
            testID: 'prior_skin_diagnosis_alopecia',
          },
          {
            label: 'Other skin conditions',
            name: 'prior_skin_diagnosis_other',
            testID: 'prior_skin_diagnosis_other',
          },
          {
            label: 'Prefer not to say',
            name: 'prior_skin_diagnosis_pfnts',
            testID: 'prior_skin_diagnosis_pfnts',
          },
        ],
        placeholder: null,
        pnts: false,
        propertyName: 'prior_skin_diagnosis_multiselect',
        question: 'Which of the following were you diagnosed with?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPSkinHairAndNails',
    testID: 'health-profile-skin-hair-nails-screen',
    title: 'Skin, Hair & Nails',
  },
};
