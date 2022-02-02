import { EHealthProfileSection, THPScreenName } from './healthProfileQuestions';

type TNextScreenProps = { nextScreenName: THPScreenName | 'HPThankYou'; buttonText: string; currentStep: number };
type INavigatorProps = Record<EHealthProfileSection, TNextScreenProps>;

export const MAX_STEPS_MALE = 15;
export const MAX_STEPS_FEMALE = 16;

// TODO: there must be a smarter way to combine male + female
export const NAVIGATOR_FEMALE: INavigatorProps = {
  ABOUT_YOU: {
    buttonText: 'Next: Family History',
    currentStep: 1,
    nextScreenName: 'HPFamilyHistory',
  },
  ALLERGIES_INTOLERANCES: {
    buttonText: 'Next: Mental Health & Mood',
    currentStep: 5,
    nextScreenName: 'HPMentalHealthMood',
  },
  BLADDER_KIDNEYS: {
    buttonText: 'Next: Muscles, Bones and Joints',
    currentStep: 12,
    nextScreenName: 'HPMusclesBonesAndJoints',
  },
  BRAIN_NERVOUS_SYSTEM: {
    buttonText: 'Next: Lungs & Breathing',
    currentStep: 7,
    nextScreenName: 'HPLungsBreathing',
  },
  CANCER: {
    buttonText: 'Next: Skin, Hair & Nails',
    currentStep: 15,
    nextScreenName: 'HPSkinHairAndNails',
  },
  FAMILY_HISTORY: {
    buttonText: 'Next: Your Behaviours',
    currentStep: 2,
    nextScreenName: 'HPYourBehaviours',
  },
  GUT_DIGESTION: {
    buttonText: 'Next: Bladder & Kidneys',
    currentStep: 11,
    nextScreenName: 'HPBladderKidneys',
  },
  HEART_CIRCULATION: {
    buttonText: "Next: Women's Health",
    currentStep: 9,
    nextScreenName: 'HPWomensHealth',
  },
  HORMONES_METABOLISM: { buttonText: 'Next: Cancer', currentStep: 14, nextScreenName: 'HPCancer' },
  IMMUNE_SYSTEM: {
    buttonText: 'Next: Allergies & Intolerances',
    currentStep: 4,
    nextScreenName: 'HPAllergiesIntolerances',
  },
  LUNGS_BREATHING: {
    buttonText: 'Next: Heart & Circulation',
    currentStep: 8,
    nextScreenName: 'HPHeartCirculation',
  },
  MENTAL_HEALTH_MOOD: {
    buttonText: 'Next: Brain & Nervous System',
    currentStep: 6,
    nextScreenName: 'HPBrainNervousSystem',
  },
  MUSCLES_BONES_AND_JOINTS: {
    buttonText: 'Next: Hormones & Metabolism',
    currentStep: 13,
    nextScreenName: 'HPHormonesMetabolism',
  },
  SKIN_HAIR_AND_NAILS: {
    buttonText: 'Submit',
    currentStep: 16,
    nextScreenName: 'HPThankYou',
  },
  WOMENS_HEALTH: {
    buttonText: 'Next: Your Behaviours',
    currentStep: 10,
    nextScreenName: 'HPYourBehaviours',
  },
  YOUR_BEHAVIOURS: {
    buttonText: 'Next: Immune System',
    currentStep: 3,
    nextScreenName: 'HPImmuneSystem',
  },
};

export const NAVIGATOR_MALE: INavigatorProps = {
  ABOUT_YOU: {
    buttonText: 'Next: Family History',
    currentStep: 1,
    nextScreenName: 'HPFamilyHistory',
  },
  ALLERGIES_INTOLERANCES: {
    buttonText: 'Next: Mental Health & Mood',
    currentStep: 5,
    nextScreenName: 'HPMentalHealthMood',
  },
  BLADDER_KIDNEYS: {
    buttonText: 'Next: Muscles, Bones and Joints',
    currentStep: 11,
    nextScreenName: 'HPMusclesBonesAndJoints',
  },
  BRAIN_NERVOUS_SYSTEM: {
    buttonText: 'Next: Lungs & Breathing',
    currentStep: 7,
    nextScreenName: 'HPLungsBreathing',
  },
  CANCER: {
    buttonText: 'Next: Skin, Hair & Nails',
    currentStep: 14,
    nextScreenName: 'HPSkinHairAndNails',
  },
  FAMILY_HISTORY: {
    buttonText: 'Next: Your Behaviours',
    currentStep: 2,
    nextScreenName: 'HPYourBehaviours',
  },
  GUT_DIGESTION: {
    buttonText: 'Next: Bladder & Kidneys',
    currentStep: 10,
    nextScreenName: 'HPBladderKidneys',
  },
  HEART_CIRCULATION: {
    buttonText: 'Next: Gut & Digestion',
    currentStep: 9,
    nextScreenName: 'HPGutDigestion',
  },
  HORMONES_METABOLISM: { buttonText: 'Next: Cancer', currentStep: 13, nextScreenName: 'HPCancer' },
  IMMUNE_SYSTEM: {
    buttonText: 'Next: Allergies & Intolerances',
    currentStep: 4,
    nextScreenName: 'HPAllergiesIntolerances',
  },
  LUNGS_BREATHING: {
    buttonText: 'Next: Heart & Circulation',
    currentStep: 8,
    nextScreenName: 'HPHeartCirculation',
  },
  MENTAL_HEALTH_MOOD: {
    buttonText: 'Next: Brain & Nervous System',
    currentStep: 6,
    nextScreenName: 'HPBrainNervousSystem',
  },
  MUSCLES_BONES_AND_JOINTS: {
    buttonText: 'Next: Hormones & Metabolism',
    currentStep: 12,
    nextScreenName: 'HPHormonesMetabolism',
  },
  SKIN_HAIR_AND_NAILS: {
    buttonText: 'Submit',
    currentStep: 15,
    nextScreenName: 'HPThankYou',
  },
  YOUR_BEHAVIOURS: {
    buttonText: 'Next: Immune System',
    currentStep: 3,
    nextScreenName: 'HPImmuneSystem',
  },
};
