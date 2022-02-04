import { EFieldType } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { THealthProfileScreens } from '@covid/features/health-profile/data/healthProfileQuestions';

export const healthProfileGutDisgestionQuestions: Partial<THealthProfileScreens> = {
  GUT_DIGESTION: {
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
        propertyName: 'prior_gut_condition_treatment_diagnosis',
        question: 'Have you ever received treatment, or been diagnosed by a doctor, for any gut related conditions?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'prior_gut_condition_treatment_diagnosis',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.MULTISELECT,
        items: [
          {
            label: 'Irritable bowel syndrome',
            name: 'prior_gut_diagnosis_ibs',
            testID: 'prior_gut_diagnosis_ibs',
          },
          {
            label: 'Chronic diarrhoea',
            name: 'prior_gut_diagnosis_chronic_diarrhoea',
            testID: 'prior_gut_diagnosis_chronic_diarrhoea',
          },
          {
            label: 'Chronic constipation',
            name: 'prior_gut_diagnosis_chronic_constipation',
            testID: 'prior_gut_diagnosis_chronic_constipation',
          },
          {
            label: 'Food intolerance',
            name: 'prior_gut_diagnosis_food_intolerance',
            testID: 'prior_gut_diagnosis_food_intolerance',
          },
          {
            label: 'Celiac disease',
            name: 'prior_gut_diagnosis_celiac_disease',
            testID: 'prior_gut_diagnosis_celiac_disease',
          },
          {
            label: 'Acid reflux',
            name: 'prior_gut_diagnosis_acid_reflux',
            testID: 'prior_gut_diagnosis_acid_reflux',
          },
          {
            label: "Crohn's disease",
            name: 'prior_gut_diagnosis_crohns_disease',
            testID: 'prior_gut_diagnosis_crohns_disease',
          },
          {
            label: 'Ulcerative colitis',
            name: 'prior_gut_diagnosis_ulcerative_colitis',
            testID: 'prior_gut_diagnosis_ulcerative_colitis',
          },
          {
            label: 'Gastric / duodenal ulcer',
            name: 'prior_gut_diagnosis_gastric_duodenal_ulcer',
            testID: 'prior_gut_diagnosis_gastric_duodenal_ulcer',
          },
          {
            label: 'Diverticulitis or diverticulosis',
            name: 'prior_gut_diagnosis_diverticulitis_or_diverticulosis',
            testID: 'prior_gut_diagnosis_diverticulitis_or_diverticulosis',
          },
          {
            label: 'Chronic liver disease or cirrhosis',
            name: 'prior_gut_diagnosis_chronic_liver_disease_or_cirrhosis',
            testID: 'prior_gut_diagnosis_chronic_liver_disease_or_cirrhosis',
          },
          {
            label: 'Abdominal bloating and distension',
            name: 'prior_gut_diagnosis_abdominal_bloating_and_distension',
            testID: 'prior_gut_diagnosis_abdominal_bloating_and_distension',
          },
          {
            label: 'Other',
            name: 'prior_gut_diagnosis_other',
            testID: 'prior_gut_diagnosis_other',
          },
          {
            label: 'Prefer not to say',
            name: 'prior_gut_diagnosis_pfnts',
            testID: 'prior_gut_diagnosis_pfnts',
          },
        ],
        placeholder: null,
        pnts: false,
        propertyName: 'prior_gut_diagnosis_multiselect',
        question: 'Which of the following conditions were you diagnosed with or treated for?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPGutDigestion',
    testID: 'health-profile-gut-digestion-screen',
    title: 'Gut & Digestion',
  },
};
