export interface IAnswer {
  label: string;
  title: string;
  value: number;
}

export interface IInsight {
  activity_name: string;
  answers: IAnswer[];
  correlated_activities: string[];
  direction: 'higher' | 'lower';
  level_of_association: 'mildly' | 'moderately' | 'strongly';
  segment: string;
}
