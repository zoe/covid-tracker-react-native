import { IInsight, IMHInsights } from '@covid/types/mental-health-playback';

export interface IMentalHealthPlayback {
  mh_insights: IMHInsights;
  loading: boolean;
}

export interface IInsightsDict {
  [key: string]: IInsight;
}
