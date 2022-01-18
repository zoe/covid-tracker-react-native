import { IMHInsights } from '@covid/features/mental-health-playback/types';

export type TStateMentalHealthPlayback = {
  mh_insights: IMHInsights;
  loading: boolean;
};
