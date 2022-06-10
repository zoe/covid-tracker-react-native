import ApiClient from '@covid/core/api/ApiClient';
import { IMHInsights } from '@covid/features/mental-health-playback/types';

const apiClient = new ApiClient();

export const getMentalHealthInsights = () => apiClient.get<IMHInsights>('/mental_health_insight/');

export const postMentalHealthFeedback = (rating: number, comments: string) =>
  apiClient.post('/feedback/', {
    comments,
    feature: 'mental_health_insights',
    rating,
  });
