export type TTitle = 'NO_CHANGE' | 'LESS' | 'MORE' | '';

export interface IAnswer {
  label: string;
  title: TTitle;
  value: number;
}

export interface IInsight {
  activity_name: string;
  answer_distribution: IAnswer[];
  anxiety: 'higher' | 'lower';
  correlated_activities: string[];
  level_of_association: 'mildly' | 'moderately' | 'strongly';
  segment: string;
  user_answer?: TTitle;
}

export interface IMHInsights {
  completed_feedback: boolean;
  insights: IInsight[];
}
