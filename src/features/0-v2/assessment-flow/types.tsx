import IconBoneJoints from '@assets/v2/svg/icon-bones-joints';
import IconHeadFace from '@assets/v2/svg/icon-head-and-face';
import IconMiscellaneous from '@assets/v2/svg/icon-miscellaneous';
import IconReproductive from '@assets/v2/svg/icon-reproductive';
import IconSkinNails from '@assets/v2/svg/icon-skin-and-nails';
import IconStomachGutBladder from '@assets/v2/svg/icon-stomach-gut-and-bladder';
import IconThoughtBubble from '@assets/v2/svg/icon-thought-bubble';
import IconThroatChestLungs from '@assets/v2/svg/icon-throat-chest-and-lungs';
import React, { ReactNode } from 'react';

export type TUsualSelfSymptomFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Rarely' | null;
export type TUsualSelfSymptomSeverity = 'low' | 'medium' | 'high' | null;
export type TUsualSelfSymptomIcon = 'smile' | 'sad' | 'tired';

export type TUsualSelfFrequentSymptom = {
  symptom?: string;
  name?: string;
  display_name: string;
  severity: TUsualSelfSymptomSeverity;
  frequency: TUsualSelfSymptomFrequency;
};

export type TUsualSelfFrequentOtherSymptom = {
  description: string;
  severity: TUsualSelfSymptomSeverity;
  frequency: TUsualSelfSymptomFrequency;
};

export const svgSymptomCategoryIconMap: { [id: number]: ReactNode } = {
  0: <IconMiscellaneous />,
  1: <IconHeadFace />,
  2: <IconThroatChestLungs />,
  3: <IconStomachGutBladder />,
  4: <IconBoneJoints />,
  5: <IconSkinNails />,
  6: <IconReproductive />,
  7: <IconThoughtBubble />,
};

export type TSymptomCategory = {
  display_name: string;
  name: string;
  id: number;
};

export type TFormSymptomItem = {
  state: boolean;
  name: string;
};

export type TFormSymptomCategory = {
  [id: string]: TFormSymptomItem;
};

export type TNewSymptomLocationFormInitValues = {
  [name: string]: TFormSymptomCategory;
};

export type TAssessment = {
  symptoms: TUsualSelfFrequentSymptom;
  other_symptoms: TUsualSelfFrequentOtherSymptom;
  reasons: string[];
  patient: string;
};

export type TBubbleSymptoms = {
  symptoms: TFrequentBubbleSymptom[];
  other_symptoms: TUsualSelfFrequentOtherSymptom[];
};

export type TFrequentBubbleSymptom = {
  id: number;
  symptom?: string;
  name?: string;
  display_name: string;
};
