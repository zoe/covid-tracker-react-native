export type TEvent =
  | 'SIGNED_UP'
  | 'COMPLETED_SCIENTIFIC_STUDY'
  | 'SCIENTIFIC_FINDING'
  | 'SCIENTIFIC_DISCOVERY'
  | 'PUBLISHED_SCIENTIFIC_DISCOVERY';

export type TStudy = 'ONGOING' | 'FUTURE';

interface ITimelineEvent {
  date: string;
  eventType: TEvent;
  title: string;
  subTitle: string;
  summary: string;
  externalLink: string;
  externalLinkText: string;
  onging: TStudy;
  //       // Not relevant to MVP but in design so worth planning for?
  //       progress: number, // Seems to be a progress bar? Data on mvp won't support this
  //       yourContribution: string
}

// data types/shape:
// array of items that look like:
//   {
//       date: string,  // for MVP string as 'Month Year' from BE is fine, saves faff? It'll be ordered by date in json
//       eventType: TimelineEventType,
//       title: string,
//       subTitle: string,
//       summary: string,
//       externalLink: string,
//       externalLinkText: string,
//       onging: boolean
//       // Not relevant to MVP but in design so worth planning for?
//       progress: number, // Seems to be a progress bar? Data on mvp won't support this
//       yourContribution: string
//   }

export const dummyData = {
  timeline_data: [
    {
      date: 'March 2020',
      eventType: 'SIGNED_UP',
      title: 'You Began Reporting',
      ongoing: false,
    },
    {
      date: 'April 2020',
      eventType: 'COMPLETED_SCIENTIFIC_STUDY',
      title: 'Skin Rash as a key symptom of COVID',
      subTitle: 'Findings Published',
      ongoing: false,
    },
    {
      date: 'May 2020',
      eventType: 'SCIENTIFIC_FINDING',
      title: 'Risk of COVID-19 in front-line health-care workers vs the general community',
      summary: 'Front-line healthcare workers with adequate PPE still have 3x higher risk of catching COVID',
      externalLink: 'More details',
      externalLinkText: 'https://zoe.com/blog/123/',
      ongoing: false,
    },
  ],
};
