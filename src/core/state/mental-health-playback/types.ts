import { IInsight } from '@covid/types/mental-health-playback';

export interface IMentalHealthPlayback {
  insights: IInsight[];
}

export interface IInsightsDict {
  [key: string]: IInsight;
}
