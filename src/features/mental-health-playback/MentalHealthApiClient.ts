import ApiClient from '@covid/core/api/ApiClient';
import { IMHInsights } from '@covid/features/mental-health-playback/types';

interface IMentalHealthApiClient {
  getInsights(): Promise<IMHInsights>;
  feedback(rating: number, comments: string): Promise<any>;
}

const apiClient = new ApiClient();

class MentalHealthApiClient implements IMentalHealthApiClient {
  getInsights() {
    return apiClient.get<IMHInsights>('/mental_health_insight/');
  }

  feedback(rating: number, comments: string) {
    return apiClient.post('/feedback/', {
      comments,
      feature: 'mental_health_insights',
      rating,
    });
  }
}

export const mentalHealthApiClient = new MentalHealthApiClient();
