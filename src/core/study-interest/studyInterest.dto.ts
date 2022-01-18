export interface IStudyInterestModel {
  id: string;
  key: string;
  interest_count: number;
  patient_is_interested: boolean;
}

export interface IStudyInterestRegisterDTO {
  patient_id: string;
  study_key: string;
}

export interface IStudyInterestRegisteredResponse {
  patient_id: string;
}

export interface IStudyInterestCancelDTO {
  patient_id: string;
}

export type TFeedbackRating = 1 | 5;

export interface IStudyInterestRegisterFeedback {
  feature: string;
  rating: TFeedbackRating;
  comments: string;
}
