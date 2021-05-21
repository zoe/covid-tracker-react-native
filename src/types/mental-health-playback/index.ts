export type TTitle = 'NO_CHANGE' | 'LESS' | 'MORE' | '';

export interface IAnswer {
  label: string;
  title: TTitle;
  value: number;
}

export interface IInsight {
  activity_name: string;
  answers: IAnswer[];
  correlated_activities: string[];
  direction: 'higher' | 'lower';
  level_of_association: 'mildly' | 'moderately' | 'strongly';
  segment: string;
  user_answer?: TTitle;
}
