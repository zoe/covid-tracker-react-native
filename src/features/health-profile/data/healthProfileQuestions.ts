import { TItemCheckbox } from '@covid/components/inputsRedesigned/MultiSelectField';
import { THealthProfileRequest } from '@covid/core/user/dto/UserAPIContracts';
import { EFieldType, TItemRadio } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { healthProfileAboutYouQuestions } from '@covid/features/health-profile/data/healthProfileAboutYouQuestions';
import { healthProfileAllergiesIntolerancesQuestions } from '@covid/features/health-profile/data/healthProfileAllergiesIntolerancesQuestions';
import { healthProfileBrainNervousSystemQuestions } from '@covid/features/health-profile/data/healthProfileBrainNervousSystemQuestions';
import { healthProfileFamilyHistoryQuestions } from '@covid/features/health-profile/data/healthProfileFamilyHistoryQuestions';
import { healthProfileHeartCirculationQuestions } from '@covid/features/health-profile/data/healthProfileHeartCirculationQuestions';
import { healthProfileImmuneSystemQuestions } from '@covid/features/health-profile/data/healthProfileImmuneSystemQuestions';
import { healthProfileLungsBreathingQuestions } from '@covid/features/health-profile/data/healthProfileLungsBreathingQuestions';
import { healthProfileMentalHealthMoodQuestions } from '@covid/features/health-profile/data/healthProfileMentalHealthMoodQuestions';
import { healthProfileWomensHealthQuestions } from '@covid/features/health-profile/data/healthProfileWomensHealthQuestions';
import { healthProfileYourBehavioursQuestions } from '@covid/features/health-profile/data/healthProfileYourBehavioursQuestions';
import { IHeightData } from '@covid/features/patient/fields/HeightQuestion';
import { IWeightData } from '@covid/features/patient/fields/WeightQuestion';
import { KeyboardType } from 'react-native';

import { healthProfileBladderKidneysQuestions } from './healthProfileBladderKidneysQuestions';
import { healthProfileCancerQuestions } from './healthProfileCancerQuestions';
import { healthProfileGutDisgestionQuestions } from './healthProfileGutDigestionQuestions';
import { healthProfileHormonesMetabolismQuestions } from './healthProfileHormonesMetabolismQuestions';
import { healthProfileMusclesBonesJointsQuestions } from './healthProfileMusclesBonesJointsQuestions';
import { healthProfileSkinHairNailsQuestions } from './healthProfileSkinHairNailsQuestions';

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
  dependsOnProperty: THealthProfilePropertyName | null;
  dependsOnPropertyValue: (string | boolean | null)[] | null;
  description: string | null;
  keyboardType?: KeyboardType;
  maxValue?: number;
  minValue?: number;
  placeholder: string | null;
  pnts: boolean;
  question: string;
  required: boolean;
  showNewTag: boolean;
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
      propertyName: THeightWeightPropertyName;
    }
  | {
      fieldType: EFieldType.TIME;
      items: null;
      propertyName: THealthProfilePropertyName;
    }
  | {
      fieldType: EFieldType.HEIGHT;
      items: null;
      propertyName: THeightWeightPropertyName;
    }
  | {
      fieldType: EFieldType.POSTCODE;
      items: null;
      propertyName: THealthProfilePropertyName;
    }
  | {
      fieldType: EFieldType.IMMUNODEFICIENCY;
      items: TItemCheckbox[];
      propertyName: THealthProfilePropertyName;
    };

type THealthProfileQuestion = TFieldTypeProps & ICommonProps;

export type THealthProfileScreens = {
  [key in EHealthProfileSection]: {
    description: string | null;
    hideWhyWeAskLink: boolean;
    questions: THealthProfileQuestion[];
    screenName?: THPScreenName;
    testID: string;
    title: string;
  };
};

// only used for isEditing logic
type THeightWeightPropertyName = 'height_field' | 'weight_field';

// TODO: add all multiselect property names
export const MULTI_SELECT_PROPERTY_NAMES = [
  'prior_immunodeficiency_diagnosis_multiselect',
  'prior_allergy_diagnosis_multiselect',
  'food_allergies_multiselect',
  'food_allergies_symptoms_multiselect',
  'food_intolerances_multiselect',
  'prior_psychiatric_condition_multiselect',
  'prior_neurological_diagnosis_multiselect',
  'prior_breathing_and_lung_diagnosis_multiselect',
  'prior_cardiovascular_diagnosis_multiselect',
  'prior_womens_health_diagnosis_multiselect',
  'pcos_symptoms_multiselect',
  'menopausal_symptoms_multiselect',
  'hormone_treatment_multiselect',
  'prior_gut_diagnosis_multiselect',
  'prior_kidney_or_urinary_diagnosis_multiselect',
  'prior_bone_or_joint_diagnosis_multiselect',
  'prior_diabetes_multiselect',
  'prior_endocrine_diagnosis_multiselect',
  'prior_cancer_diagnosis_multiselect',
  'prior_skin_diagnosis_multiselect',
] as const;

type TMultiSelectPropertyName = typeof MULTI_SELECT_PROPERTY_NAMES[number];
type THealthProfileFields = {
  [key in (TMultiSelectPropertyName | THeightWeightPropertyName) | keyof THealthProfileRequest]: string;
};

export type THealthProfilePropertyName = keyof THealthProfileRequest | TMultiSelectPropertyName;

export interface IHealthProfileFormData extends IHeightData, IWeightData, THealthProfileFields {}

export const healthProfileScreens: THealthProfileScreens = {
  ...healthProfileAboutYouQuestions,
  ...healthProfileFamilyHistoryQuestions,
  ...healthProfileYourBehavioursQuestions,
  ...healthProfileImmuneSystemQuestions,
  ...healthProfileAllergiesIntolerancesQuestions,
  ...healthProfileMentalHealthMoodQuestions,
  ...healthProfileBrainNervousSystemQuestions,
  ...healthProfileLungsBreathingQuestions,
  ...healthProfileHeartCirculationQuestions,
  ...healthProfileWomensHealthQuestions,
  ...healthProfileGutDisgestionQuestions,
  ...healthProfileBladderKidneysQuestions,
  ...healthProfileMusclesBonesJointsQuestions,
  ...healthProfileHormonesMetabolismQuestions,
  ...healthProfileCancerQuestions,
  ...healthProfileSkinHairNailsQuestions,
};
