import { ImageSourcePropType } from 'react-native';

export enum EStudyKey {
  GUT_MICROBIOME_CANCER_DEVELOPMENT = 'gut_microbiome_cancer_development',
  IMMUNE_HEALTH_HEART_DISEASE = 'immune_health_heart_disease',
  SIGNS_DEMENTIA_CHANGES_COGNITION = 'signs_dementia_changes_cognition',
}

export type TBackendStudy = {
  id: string;
  interest_count: number;
  key: EStudyKey;
  patient_is_interested: boolean;
};

type TExternalResource = {
  id: string;
  imageSource?: ImageSourcePropType;
  title: string;
  url: string;
};

type TScientist = {
  imageSource?: ImageSourcePropType;
  location: string;
  name: string;
  title: string;
};

export type TFrontendStudy = {
  blog: string;
  cardColor: string;
  commitment: string;
  externalResources?: TExternalResource[];
  organiser: string;
  researchFocus: string;
  scientist: TScientist;
  orderIndex: number;
  title: string;
  whatDoINeed: string;
  whatsInvolved: string;
  whoCanJoin: string;
};

export type TStudy = TBackendStudy & TFrontendStudy;
export type TStudies = { EStudyKey: TStudy } | {};
