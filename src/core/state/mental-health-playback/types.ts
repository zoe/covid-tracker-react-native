import { IInsight, IMHInsights } from '@covid/features/mental-health-playback/types';

export interface IMentalHealthPlayback {
  mh_insights: IMHInsights;
  loading: boolean;
}

export interface IInsightsDict {
  [key: string]: IInsight;
}
