import { EFieldType } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import { THealthProfileScreens } from '@covid/features/health-profile/data/healthProfileQuestions';

export const healthProfileMusclesBonesJointsQuestions: Partial<THealthProfileScreens> = {
  MUSCLES_BONES_AND_JOINTS: {
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
        propertyName: 'prior_bone_or_joint_condition_diagnosis',
        question:
          'Have you ever been diagnosed with a bone or joint condition (affecting your muscles, joints and ligaments)?',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: 'prior_bone_or_joint_condition_diagnosis',
        dependsOnPropertyValue: ['yes'],
        description: null,
        fieldType: EFieldType.MULTISELECT,
        items: [
          {
            label: 'Rheumatoid arthritis',
            name: 'prior_bone_or_joint_diagnosis_rheumatoid_arthritis',
            testID: 'prior_bone_or_joint_diagnosis_rheumatoid_arthritis',
          },
          {
            label: 'Osteoporosis',
            name: 'prior_bone_or_joint_diagnosis_osteoporosis',
            testID: 'prior_bone_or_joint_diagnosis_osteoporosis',
          },
          {
            label: 'Osteoarthritis',
            name: 'prior_bone_or_joint_diagnosis_osteoarthritis',
            testID: 'prior_bone_or_joint_diagnosis_osteoarthritis',
          },
          {
            label: 'Hip fracture',
            name: 'prior_bone_or_joint_diagnosis_hip_fracture',
            testID: 'prior_bone_or_joint_diagnosis_hip_fracture',
          },
          {
            label: 'Ankylosing Spondylitis',
            name: 'prior_bone_or_joint_diagnosis_ankylosing_spondylitis',
            testID: 'prior_bone_or_joint_diagnosis_ankylosing_spondylitis',
          },
          {
            label: 'Tendonitis',
            name: 'prior_bone_or_joint_diagnosis_tendonitis',
            testID: 'prior_bone_or_joint_diagnosis_tendonitis',
          },
          {
            label: 'Hip replacement',
            name: 'prior_bone_or_joint_diagnosis_hip_replacement',
            testID: 'prior_bone_or_joint_diagnosis_hip_replacement',
          },
          {
            label: 'Knee replacement',
            name: 'prior_bone_or_joint_diagnosis_knee_replacement',
            testID: 'prior_bone_or_joint_diagnosis_knee_replacement',
          },
          {
            label: 'Vertebral fracture',
            name: 'prior_bone_or_joint_diagnosis_vertebral_fracture',
            testID: 'prior_bone_or_joint_diagnosis_vertebral_fracture',
          },
          {
            label: 'Gout',
            name: 'prior_bone_or_joint_diagnosis_gout',
            testID: 'prior_bone_or_joint_diagnosis_gout',
          },
          {
            label: 'Other connective tissue disease',
            name: 'prior_bone_or_joint_diagnosis_other_connective_tissue',
            testID: 'prior_bone_or_joint_diagnosis_other_connective_tissue',
          },
          {
            label: 'Other',
            name: 'prior_bone_or_joint_diagnosis_other',
            testID: 'prior_bone_or_joint_diagnosis_other',
          },
          {
            label: 'Prefer not to say',
            name: 'prior_bone_or_joint_diagnosis_pfnts',
            testID: 'prior_bone_or_joint_diagnosis_pfnts',
          },
        ],
        placeholder: null,
        pnts: false,
        propertyName: 'prior_bone_or_joint_diagnosis_multiselect',
        question: 'Which of the following conditions were you diagnosed with?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPMusclesBonesAndJoints',
    testID: 'health-profile-muscles-bones-joints-screen',
    title: 'Muscles, Bones & Joints',
  },
};
