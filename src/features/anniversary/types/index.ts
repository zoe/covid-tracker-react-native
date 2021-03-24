export type TBadge =
  | 'GENERAL'
  | 'DAILY_HEALTH'
  | 'TWO_PEOPLE'
  | 'SYMPTOMS'
  | 'TEST_RESULTS'
  | 'VACCINATION_STATUS'
  | 'VACCINE_SIDE_EFFECTS'
  | 'HESITANCY'
  | 'DIET_AND_LIFESTYLE'
  | 'MENTAL_HEALTH';

export type TReportedEvent = {
  id: TBadge;
  text: string;
};

export type TProgress = 'NOT_STARTED' | 'DISCOVERY' | 'DATA_COLLECTION' | 'ANALYSIS' | 'COMPLETED';

export type TEvent = 'HIGHLIGHT' | 'FINDING' | 'NODE' | 'STUDY';

export type TStudy = 'ONGOING' | 'FUTURE';

export type TTimelineEvent = {
  date: string;
  event_type: TEvent;
  external_link?: string | null;
  external_link_text?: string | null;
  ongoing?: TStudy | null;
  progress?: TProgress[] | null;
  sub_title?: string | null;
  summary?: string | null;
  title: string | null;
};

export type TTimelineNode = {
  node: TTimelineEvent;
};

export interface ITimeline {
  badges: TReportedEvent[];
  items: TTimelineNode[];
}
