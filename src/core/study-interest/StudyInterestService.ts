import ApiClient from '@covid/core/api/ApiClient';
import {
  IStudyInterestCancelDTO,
  IStudyInterestModel,
  IStudyInterestRegisterDTO,
  IStudyInterestRegisteredResponse,
  IStudyInterestRegisterFeedback,
  TFeedbackRating,
} from '@covid/core/study-interest/StudyInterest.dto';

interface IStudyInterestService {
  getSummary(patientId: string): Promise<IStudyInterestModel[]>;
  registerInterest(patientId: string, studyKey: string): Promise<IStudyInterestRegisteredResponse>;
  cancelInterest(studyKey: string, patientId: string): Promise<void>;
}

const apiClient = new ApiClient();

class StudyInterestService implements IStudyInterestService {
  async getSummary(patientId: string): Promise<IStudyInterestModel[]> {
    return apiClient.get<IStudyInterestModel[]>(`/study_interest/summary/?patient_id=${patientId}`);
  }

  async registerInterest(patientId: string, studyKey: string): Promise<IStudyInterestRegisteredResponse> {
    return apiClient.post<IStudyInterestRegisterDTO, IStudyInterestRegisteredResponse>('/study_interest/', {
      patient_id: patientId,
      study_key: studyKey,
    });
  }

  async cancelInterest(patientId: string, studyKey: string): Promise<void> {
    await apiClient.delete<IStudyInterestCancelDTO, null>(`/study_interest/${studyKey}/cancel/`, {
      patient_id: patientId,
    });
  }

  async registerFeedback(rating: TFeedbackRating, comments: string): Promise<IStudyInterestRegisterFeedback> {
    return apiClient.post<IStudyInterestRegisterFeedback, IStudyInterestRegisterFeedback>('/feedback/', {
      comments,
      feature: 'study_hub',
      rating,
    });
  }
}

export const studyInterestService = new StudyInterestService();
