import {
  Brain,
  Cancer,
  Cell,
  EyeEar,
  Female,
  Gut,
  Heart,
  Immune,
  Joint,
  LightBulb,
  Lungs,
  Neuron,
} from '@assets/icons/svgIcons';
import { TDiseasePreference } from '@covid/features/reconsent/types';

export const diseasePreferences: TDiseasePreference[] = [
  {
    IconComponent: Brain,
    name: 'research_consent_dementia',
  },
  {
    IconComponent: Heart,
    name: 'research_consent_cardiovascular_diseases',
  },
  {
    IconComponent: Cancer,
    name: 'research_consent_cancer',
  },
  {
    IconComponent: Joint,
    name: 'research_consent_joint_and_bone_diseases',
  },
  {
    IconComponent: LightBulb,
    name: 'research_consent_mental_health',
  },
  {
    IconComponent: Gut,
    name: 'research_consent_nutrition_and_gut_health',
  },
  {
    IconComponent: Female,
    name: 'research_consent_womens_health',
  },
  {
    IconComponent: EyeEar,
    name: 'research_consent_vision_and_hearing_conditions',
  },
  {
    IconComponent: Immune,
    name: 'research_consent_autoimmune_conditions',
  },
  {
    IconComponent: Cell,
    name: 'research_consent_skin_conditions',
  },
  {
    IconComponent: Lungs,
    name: 'research_consent_lung_diseases',
  },
  {
    IconComponent: Neuron,
    name: 'research_consent_neurological_conditions',
  },
  {
    name: 'prefer_not_to_say',
  },
];
