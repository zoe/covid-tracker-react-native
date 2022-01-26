import { TItemCheckbox } from '@covid/components/inputsRedesigned/MultiSelectField';
import { KeyboardType } from 'react-native';

import { EFieldType, TItemRadio } from '../components/HealthProfileQuestionCard';

export enum EHealthProfileSection {
  ABOUT_YOU = 'ABOUT_YOU',
  WOMENS_HEALTH = 'WOMENS_HEALTH',
  MENTAL_HEALTH_MOOD = 'MENTAL_HEALTH_MOOD',
  YOUR_BEHAVIOURS = 'YOUR_BEHAVIOURS',
  GUT_DIGESTION = 'GUT_DIGESTION',
  BLADDER_KIDNEYS = 'BLADDER_KIDNEYS',
  CANCER = 'CANCER',
  LUNGS_BREATHING = 'LUNGS_BREATHING',
  MUSCLES_BONES_AND_JOINTS = 'MUSCLES_BONES_AND_JOINTS',
  BRAIN_NERVOUS_SYSTEM = 'BRAIN_NERVOUS_SYSTEM',
  HEART_CIRCULATION = 'HEART_CIRCULATION',
  FAMILY_HISTORY = 'FAMILY_HISTORY',
  HORMONES_METABOLISM = 'HORMONES_METABOLISM',
  ALLERGIES_INTOLERANCES = 'ALLERGIES_INTOLERANCES',
  IMMUNE_SYSTEM = 'IMMUNE_SYSTEM',
  SKIN_HAIR_AND_NAILS = 'SKIN_HAIR_AND_NAILS',
}

export const screenMappings = {
  HPAllergiesIntolerances: EHealthProfileSection.ALLERGIES_INTOLERANCES,
  HPBladderKidneys: EHealthProfileSection.BLADDER_KIDNEYS,
  HPBrainNervousSystem: EHealthProfileSection.BRAIN_NERVOUS_SYSTEM,
  HPCancer: EHealthProfileSection.CANCER,
  HPFamilyHistory: EHealthProfileSection.FAMILY_HISTORY,
  HPGutDigestion: EHealthProfileSection.GUT_DIGESTION,
  HPHeartCirculation: EHealthProfileSection.HEART_CIRCULATION,
  HPHormonesMetabolism: EHealthProfileSection.HORMONES_METABOLISM,
  HPImmuneSystem: EHealthProfileSection.IMMUNE_SYSTEM,
  HPLungsBreathing: EHealthProfileSection.LUNGS_BREATHING,
  HPMentalHealthMood: EHealthProfileSection.MENTAL_HEALTH_MOOD,
  HPMusclesBonesAndJoints: EHealthProfileSection.MUSCLES_BONES_AND_JOINTS,
  HPSkinHairAndNails: EHealthProfileSection.SKIN_HAIR_AND_NAILS,
  HPWomensHealth: EHealthProfileSection.WOMENS_HEALTH,
  HPYourBehaviours: EHealthProfileSection.YOUR_BEHAVIOURS,
};

export type THPScreenName = keyof typeof screenMappings;

interface ICommonProps {
  question: string;
  required: boolean;
  pnts: boolean;
  dependsOnProperty: THealthProfilePropertyName | null;
  dependsOnPropertyValue: (string | boolean | null)[] | null;
  description: string | null;
  showNewTag: boolean;
  keyboardType: KeyboardType | null;
  placeholder: string | null;
}

type TFieldTypeProps =
  | {
      fieldType: EFieldType.RADIO;
      items: TItemRadio[];
      propertyName: THealthProfilePropertyName;
    }
  | {
      fieldType: EFieldType.MULTISELECT;
      items: TItemCheckbox[];
      propertyName: THealthProfilePropertyName;
    }
  | {
      fieldType: EFieldType.TEXT;
      items: null;
      propertyName: THealthProfilePropertyName;
    }
  | {
      fieldType: EFieldType.YESNO;
      items: null;
      propertyName: THealthProfilePropertyName;
    }
  | {
      fieldType: EFieldType.WEIGHT;
      items: null;
      propertyName: null;
    }
  | {
      fieldType: EFieldType.HEIGHT;
      items: null;
      propertyName: null;
    };

type THealthProfileQuestion = TFieldTypeProps & ICommonProps;

type THealthProfileScreens = {
  [key in EHealthProfileSection]: {
    description: string | null;
    hideWhyWeAskLink: boolean;
    questions: THealthProfileQuestion[];
    screenName?: THPScreenName;
    testID: string;
    title: string;
  };
};

// TODO: get list from Thomas
export type THealthProfilePropertyName =
  | 'gender'
  | 'gender_identity'
  | 'is_twin'
  | 'parents_or_siblings_had_cardiovascular_disease'
  | 'has_cancer'
  | 'parents_or_siblings_had_diabetes'
  | 'postcode'
  | 'race'
  | 'twin_type'
  | 'yb_physical_activity_frequency'
  | 'year_of_birth'
  | 'pcos'
  | 'pcos_1'
  | 'pcos_2';

export const healthProfileScreens: THealthProfileScreens = {
  ABOUT_YOU: {
    description: 'These are the details you shared with us when you joined the study. Are they still correct?',
    hideWhyWeAskLink: true,
    questions: [
      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.TEXT,
        items: null,
        keyboardType: 'numeric',
        placeholder: 'Year',
        pnts: false,
        propertyName: 'year_of_birth',
        question: 'What year were you born?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.WEIGHT,
        items: null,
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: null,
        question: 'What is your current body weight?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.HEIGHT,
        items: null,
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: null,
        question: 'What is your current height?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.TEXT,
        items: null,
        keyboardType: null,
        placeholder: 'Postcode',
        pnts: false,
        propertyName: 'postcode',
        question: 'Your postcode?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.RADIO,
        items: [
          { label: 'Male', value: '1' },
          { label: 'Female', value: '0' },
          { label: 'Intersex', value: '3' },
          { label: 'Prefer not to say', value: '2' },
        ],
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: 'gender',
        question: 'What sex were you assigned at birth?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.RADIO,
        items: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Intersex', value: 'intersex' },
          { label: 'Prefer not to say', value: 'pnts' },
        ],
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: 'gender_identity',
        question: 'What gender do you most identify with?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.RADIO,
        items: [
          { label: 'English, Welsh, Scottish, Northern Irish, Irish', value: 'english_welsh_etc' },
          { label: 'Other white background', value: 'other_white' },
          { label: 'Indian', value: 'indian' },
          { label: 'Pakistani', value: 'pakistani' },
        ],
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: 'race',
        question: 'Which of the following best describes your ethnicity?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.YESNO,
        items: null,
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: 'is_twin',
        question: 'Are you a twin?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: 'is_twin',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.RADIO,
        items: [
          { label: 'Identical', value: 'identical' },
          { label: 'Non-identical', value: 'non-identical' },
        ],
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: 'twin_type',
        question: 'Which type of twin?',
        required: true,
        showNewTag: false,
      },

      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.MULTISELECT,
        items: [
          { label: 'pcos 1', name: 'pcos_1', testID: 'pcos_1' },
          { label: 'pcos 2', name: 'pcos_2', testID: 'pcos_1' },
        ],
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: 'pcos',
        question: 'PCOS?',
        required: true,
        showNewTag: false,
      },
    ],
    testID: 'health-profile-about-you-screen',
    title: 'About You',
  },
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
        keyboardType: null,
        placeholder: null,
        pnts: true,
        propertyName: 'has_cancer',
        question:
          'Have any of your parents or siblings had cardiovascular disease? Examples of cardiovascular disease include stroke, heart attack, heart disease, or angina.',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'parents_or_siblings_had_cardiovascular_disease',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.YESNO,
        items: null,
        keyboardType: null,
        placeholder: null,
        pnts: true,
        propertyName: 'parents_or_siblings_had_diabetes',
        question: 'Have any of your parents or siblings had diabetes?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPFamilyHistory',
    testID: 'health-profile-family-history-screen',
    title: 'Family History',
  },
  WOMENS_HEALTH: {
    description: null,
    hideWhyWeAskLink: false,
    questions: [
      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.MULTISELECT,
        items: [
          { label: 'Acne that needs medical advice', name: 'wh_pcos_symptom_acne', testID: 'wh_pcos_symptom_acne' },
          {
            label: 'Irregular periods',
            name: 'wh_pcos_symptom_irregular_periods',
            testID: 'wh_pcos_symptom_irregular_periods',
          },
          { label: 'Excessive hair', name: 'wh_pcos_symptom_excessive_hair', testID: 'wh_pcos_symptom_excessive_hair' },
          { label: 'Hair thinning', name: 'wh_pcos_symptom_hair_thinning', testID: 'wh_pcos_symptom_hair_thinning' },
          {
            label: 'Polycystic ovaries shown by a scan',
            name: 'wh_pcos_symptom_polycystic_ovaries_scan',
            testID: 'wh_pcos_symptom_polycystic_ovaries_scan',
          },
          {
            label: 'Prefer not to say',
            name: 'wh_pcos_symptom_pnts',
            testID: 'wh_pcos_symptom_pnts',
          },
        ],
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: 'pcos',
        question: 'Which PCOS symptoms do you have?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPWomensHealth',
    testID: 'health-profile-womens-health-screen',
    title: "Women's Health",
  },
  YOUR_BEHAVIOURS: {
    description: null,
    hideWhyWeAskLink: false,
    questions: [
      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.RADIO,
        items: [
          { label: 'Less than once a week', value: 'less_than_once_a_week' },
          { label: 'Once a week', value: 'once_a_week' },
        ],
        keyboardType: null,
        placeholder: null,
        pnts: false,
        propertyName: 'yb_physical_activity_frequency',
        question:
          'How frequently have you typically engaged in physical activity that raises your heart rate and lasts for 20 minutes at a time?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPYourBehaviours',
    testID: 'health-profile-your-behaviours-screen',
    title: 'Your Behaviours',
  },
};
