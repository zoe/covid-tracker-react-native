import { EHealthProfileSection, THPScreenName } from './healthProfileQuestions';

type TNextScreenProps = {
  nextScreenName: THPScreenName | 'HPThankYou';
  buttonText: string;
  currentStep: number;
  previousScreenName: THPScreenName | 'HPAboutYou' | 'DashboardUK';
};
type INavigatorProps = Record<EHealthProfileSection, TNextScreenProps>;

export const MAX_STEPS_MALE = 15;
export const MAX_STEPS_FEMALE = 16;

// TODO: there must be a smarter way to combine male + female
export const NAVIGATOR_FEMALE: INavigatorProps = {
  ABOUT_YOU: {
    buttonText: 'Next: Family History',
    currentStep: 1,
    nextScreenName: 'HPFamilyHistory',
    previousScreenName: 'DashboardUK',
  },
  ALLERGIES_INTOLERANCES: {
    buttonText: 'Next: Cancer',
    currentStep: 5,
    nextScreenName: 'HPCancer',
    previousScreenName: 'HPImmuneSystem',
  },
  BLADDER_KIDNEYS: {
    buttonText: 'Next: Muscles, Bones and Joints',
    currentStep: 13,
    nextScreenName: 'HPMusclesBonesAndJoints',
    previousScreenName: 'HPGutDigestion',
  },
  BRAIN_NERVOUS_SYSTEM: {
    buttonText: 'Next: Lungs & Breathing',
    currentStep: 8,
    nextScreenName: 'HPLungsBreathing',
    previousScreenName: 'HPMentalHealthMood',
  },
  CANCER: {
    buttonText: 'Next: Mental Health & Mood',
    currentStep: 6,
    nextScreenName: 'HPMentalHealthMood',
    previousScreenName: 'HPAllergiesIntolerances',
  },
  FAMILY_HISTORY: {
    buttonText: 'Next: Your Behaviours',
    currentStep: 2,
    nextScreenName: 'HPYourBehaviours',
    previousScreenName: 'HPAboutYou',
  },
  GUT_DIGESTION: {
    buttonText: 'Next: Bladder & Kidneys',
    currentStep: 12,
    nextScreenName: 'HPBladderKidneys',
    previousScreenName: 'HPWomensHealth',
  },
  HEART_CIRCULATION: {
    buttonText: "Next: Women's Health",
    currentStep: 10,
    nextScreenName: 'HPWomensHealth',
    previousScreenName: 'HPLungsBreathing',
  },
  HORMONES_METABOLISM: {
    buttonText: 'Next: Skin, Hair & Nails',
    currentStep: 15,
    nextScreenName: 'HPSkinHairAndNails',
    previousScreenName: 'HPMusclesBonesAndJoints',
  },
  IMMUNE_SYSTEM: {
    buttonText: 'Next: Allergies & Intolerances',
    currentStep: 4,
    nextScreenName: 'HPAllergiesIntolerances',
    previousScreenName: 'HPYourBehaviours',
  },
  LUNGS_BREATHING: {
    buttonText: 'Next: Heart & Circulation',
    currentStep: 9,
    nextScreenName: 'HPHeartCirculation',
    previousScreenName: 'HPBrainNervousSystem',
  },
  MENTAL_HEALTH_MOOD: {
    buttonText: 'Next: Brain & Nervous System',
    currentStep: 7,
    nextScreenName: 'HPBrainNervousSystem',
    previousScreenName: 'HPCancer',
  },
  MUSCLES_BONES_AND_JOINTS: {
    buttonText: 'Next: Hormones & Metabolism',
    currentStep: 14,
    nextScreenName: 'HPHormonesMetabolism',
    previousScreenName: 'HPBladderKidneys',
  },
  SKIN_HAIR_AND_NAILS: {
    buttonText: 'Save and Finish',
    currentStep: 16,
    nextScreenName: 'HPThankYou',
    previousScreenName: 'HPHormonesMetabolism',
  },
  WOMENS_HEALTH: {
    buttonText: 'Next: Gut & Digestion',
    currentStep: 11,
    nextScreenName: 'HPGutDigestion',
    previousScreenName: 'HPHeartCirculation',
  },
  YOUR_BEHAVIOURS: {
    buttonText: 'Next: Immune System',
    currentStep: 3,
    nextScreenName: 'HPImmuneSystem',
    previousScreenName: 'HPFamilyHistory',
  },
};

export const NAVIGATOR_MALE: INavigatorProps = {
  ABOUT_YOU: {
    buttonText: 'Next: Family History',
    currentStep: 1,
    nextScreenName: 'HPFamilyHistory',
    previousScreenName: 'DashboardUK',
  },
  ALLERGIES_INTOLERANCES: {
    buttonText: 'Next: Cancer',
    currentStep: 5,
    nextScreenName: 'HPCancer',
    previousScreenName: 'HPImmuneSystem',
  },
  BLADDER_KIDNEYS: {
    buttonText: 'Next: Muscles, Bones and Joints',
    currentStep: 12,
    nextScreenName: 'HPMusclesBonesAndJoints',
    previousScreenName: 'HPGutDigestion',
  },
  BRAIN_NERVOUS_SYSTEM: {
    buttonText: 'Next: Lungs & Breathing',
    currentStep: 8,
    nextScreenName: 'HPLungsBreathing',
    previousScreenName: 'HPMentalHealthMood',
  },
  CANCER: {
    buttonText: 'Next: Mental Health & Mood',
    currentStep: 6,
    nextScreenName: 'HPMentalHealthMood',
    previousScreenName: 'HPAllergiesIntolerances',
  },
  FAMILY_HISTORY: {
    buttonText: 'Next: Your Behaviours',
    currentStep: 2,
    nextScreenName: 'HPYourBehaviours',
    previousScreenName: 'HPAboutYou',
  },
  GUT_DIGESTION: {
    buttonText: 'Next: Bladder & Kidneys',
    currentStep: 11,
    nextScreenName: 'HPBladderKidneys',
    previousScreenName: 'HPHeartCirculation',
  },
  HEART_CIRCULATION: {
    buttonText: 'Next: Gut & Digestion',
    currentStep: 10,
    nextScreenName: 'HPGutDigestion',
    previousScreenName: 'HPLungsBreathing',
  },
  HORMONES_METABOLISM: {
    buttonText: 'Next: Skin, Hair & Nails',
    currentStep: 14,
    nextScreenName: 'HPSkinHairAndNails',
    previousScreenName: 'HPMusclesBonesAndJoints',
  },
  IMMUNE_SYSTEM: {
    buttonText: 'Next: Allergies & Intolerances',
    currentStep: 4,
    nextScreenName: 'HPAllergiesIntolerances',
    previousScreenName: 'HPYourBehaviours',
  },
  LUNGS_BREATHING: {
    buttonText: 'Next: Heart & Circulation',
    currentStep: 9,
    nextScreenName: 'HPHeartCirculation',
    previousScreenName: 'HPBrainNervousSystem',
  },
  MENTAL_HEALTH_MOOD: {
    buttonText: 'Next: Brain & Nervous System',
    currentStep: 7,
    nextScreenName: 'HPBrainNervousSystem',
    previousScreenName: 'HPCancer',
  },
  MUSCLES_BONES_AND_JOINTS: {
    buttonText: 'Next: Hormones & Metabolism',
    currentStep: 13,
    nextScreenName: 'HPHormonesMetabolism',
    previousScreenName: 'HPBladderKidneys',
  },
  SKIN_HAIR_AND_NAILS: {
    buttonText: 'Save and Finish',
    currentStep: 15,
    nextScreenName: 'HPThankYou',
    previousScreenName: 'HPHormonesMetabolism',
  },
  YOUR_BEHAVIOURS: {
    buttonText: 'Next: Immune System',
    currentStep: 3,
    nextScreenName: 'HPImmuneSystem',
    previousScreenName: 'HPFamilyHistory',
  },
};
