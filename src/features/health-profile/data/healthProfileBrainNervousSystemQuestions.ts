import { EFieldType } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { THealthProfileScreens } from '@covid/features/health-profile/data/healthProfileQuestions';

export const healthProfileBrainNervousSystemQuestions: Partial<THealthProfileScreens> = {
  BRAIN_NERVOUS_SYSTEM: {
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
        propertyName: 'prior_neurological_condition_diagnosis',
        question:
          'Have you ever been diagnosed with a neurological condition (affecting your brain or nervous system)?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'prior_neurological_condition_diagnosis',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.MULTISELECT,
        items: [
          {
            label: 'Migraine',
            name: 'prior_neurological_diagnosis_migraine',
            testID: 'prior_neurological_diagnosis_migraine',
          },
          {
            label: 'Cluster headaches',
            name: 'prior_neurological_diagnosis_cluster_headaches',
            testID: 'prior_neurological_diagnosis_cluster_headaches',
          },
          {
            label: 'Tension headaches',
            name: 'prior_neurological_diagnosis_tension_headaches',
            testID: 'prior_neurological_diagnosis_tension_headaches',
          },
          {
            label: 'Amyotrophic Lateral Sclerosis (Motor Neurone disease)',
            name: 'prior_neurological_diagnosis_als',
            testID: 'prior_neurological_diagnosis_als',
          },
          {
            label: "Parkinson's Disease",
            name: 'prior_neurological_diagnosis_parkinsons',
            testID: 'prior_neurological_diagnosis_parkinsons',
          },
          {
            label: 'Multiple sclerosis (MS)',
            name: 'prior_neurological_diagnosis_ms',
            testID: 'prior_neurological_diagnosis_ms',
          },
          {
            label: 'Meningitis',
            name: 'prior_neurological_diagnosis_meningitis',
            testID: 'prior_neurological_diagnosis_meningitis',
          },
          {
            label: 'Epilepsy',
            name: 'prior_neurological_diagnosis_epilepsy',
            testID: 'prior_neurological_diagnosis_epilepsy',
          },
          {
            label: "Alzheimer's dementia",
            name: 'prior_neurological_diagnosis_alzheimers_dementia',
            testID: 'prior_neurological_diagnosis_alzheimers_dementia',
          },
          {
            label: 'Lewy Body dementia',
            name: 'prior_neurological_diagnosis_lewy_body_dementia',
            testID: 'prior_neurological_diagnosis_lewy_body_dementia',
          },
          {
            label: 'Vascular dementia',
            name: 'prior_neurological_diagnosis_vascular_dementia',
            testID: 'prior_neurological_diagnosis_vascular_dementia',
          },
          {
            label: 'Mixed dementia (unsure)',
            name: 'prior_neurological_diagnosis_mixed_dementia',
            testID: 'prior_neurological_diagnosis_mixed_dementia',
          },
          {
            label: 'Mild cognitive impairment',
            name: 'prior_neurological_diagnosis_mild_cognitive_impairment',
            testID: 'prior_neurological_diagnosis_mild_cognitive_impairment',
          },
          {
            label: 'Other neurological conditions',
            name: 'prior_neurological_diagnosis_other',
            testID: 'prior_neurological_diagnosis_other',
          },
          {
            label: 'Prefer not to say',
            name: 'prior_neurological_diagnosis_pfnts',
            testID: 'prior_neurological_diagnosis_pfnts',
          },
        ],
        placeholder: null,
        pnts: false,
        propertyName: 'prior_neurological_diagnosis_multiselect',
        question: 'Which of the following conditions were you diagnosed with?',
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
        pnts: false,
        propertyName: 'increasing_confusion_or_memory_loss_over_last_year',
        question:
          'During the past 12 months, have you experienced confusion or memory loss that is happening more often or is getting worse?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'increasing_confusion_or_memory_loss_over_last_year',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.RADIO,
        items: [
          {
            label: 'Not at all',
            value: 'none',
          },
          {
            label: 'A little',
            value: 'little',
          },
          {
            label: 'A lot',
            value: 'lot',
          },
        ],
        placeholder: null,
        pnts: false,
        propertyName: 'memory_loss_day_to_day_affect',
        question: 'To what extent does memory loss currently affect your day-to-day life?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPBrainNervousSystem',
    testID: 'health-profile-brain-nervous-system-screen',
    title: 'Brain & Nervous System',
  },
};
