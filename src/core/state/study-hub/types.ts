import { EStudyKey, TStudies } from '@covid/features/study-hub/types';

export enum EInteraction {
  SHOW_INTEREST = 'SHOW_INTEREST',
  VISIT_DETAILS_SCREEN = 'VISIT_DETAILS_SCREEN',
  VISIT_LIST_SCREEN = 'VISIT_LIST_SCREEN',
}

export type TStudyHubInteraction = {
  interaction: EInteraction;
  timestamp: number;
};

export type TStateStudyHub = {
  studies: TStudies;
  studyHubInteractions: TStudyHubInteraction[];
};

export type TUpdateStudyInterestAction = {
  studyKey: EStudyKey;
  patientIsInterested: boolean;
};
