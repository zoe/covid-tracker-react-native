export type TBadge =
  | 'GENERAL'
  | 'SYMPTOMS'
  | 'TWO_PEOPLE'
  | 'SEVERITY'
  | 'TEST_RESULTS'
  | 'VACCINATION_STATUS'
  | 'VACCINE_SIDE_EFFECTS'
  | 'HESITANCY'
  | 'DIET_AND_LIFESTYLE'
  | 'MENTAL_HEALTH';

export type TReportedEvent = {
  eventBadge: TBadge;
  eventName: string;
};

export type TProgress = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE' | 'FUTURE';

export type TEvent =
  | 'HIGHLIGHT'
  | 'FINDING'
  | 'NODE'
  | 'STUDY'

export type TStudy = 'ONGOING' | 'FUTURE';

export type TTimelineEvent = {
  date: string;
  eventType: TEvent;
  externalLink?: string;
  externalLinkText?: string;
  ongoing?: TStudy;
  progress?: TProgress[];
  subTitle?: string;
  summary?: string;
  title: string;
};

export interface ITimeline {
  reportedEvents: TReportedEvent[];
  timelineEvents: TTimelineEvent[];
}
