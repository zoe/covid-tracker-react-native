import { IInsight } from '@covid/types/mental-health-playback';

export interface IMentalHealthPlayback {
  insights: IInsight[];
  loading: boolean;
}

export interface IInsightsDict {
  [key: string]: IInsight;
}
