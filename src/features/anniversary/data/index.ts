import { ITimeline } from '../types';

export const timelineData: ITimeline = {
  reportedEvents: [
    {
      eventBadge: 'GENERAL',
      eventName: 'Demographics & general health',
    },
    {
      eventBadge: 'SYMPTOMS',
      eventName: 'Symptoms',
    },
    {
      eventBadge: 'TWO_PEOPLE',
      eventName: 'For two people',
    },
    {
      eventBadge: 'SEVERITY',
      eventName: 'Covid severity',
    },
    {
      eventBadge: 'TEST_RESULTS',
      eventName: 'Test results',
    },
    {
      eventBadge: 'VACCINATION_STATUS',
      eventName: 'Vaccine status',
    },
    {
      eventBadge: 'VACCINE_SIDE_EFFECTS',
      eventName: 'Vaccine side effects',
    },
    {
      eventBadge: 'HESITANCY',
      eventName: 'Vaccine hesitancy',
    },
    {
      eventBadge: 'DIET_AND_LIFESTYLE',
      eventName: 'Diet & Lifestyle',
    },
    {
      eventBadge: 'MENTAL_HEALTH',
      eventName: 'Mental Health',
    },
  ],
  timelineEvents: [
    {
      date: 'some date string',
      eventType: 'NODE',
      title: 'You started reporting',
    },
    {
      date: 'some date string',
      eventType: 'NODE',
      title: 'Your reports led to',
      subTitle: '3 key scientific findings'
    },
    {
      date: 'some date string',
      eventType: 'FINDING',
      title: 'Scientific finding',
      subTitle: 'First to identify loss of smell & taste as a key symptom of COVID',
      externalLink: 'http:...',
      externalLinkText: 'Read more',
    },
    {
      date: 'some date string',
      eventType: 'STUDY',
      ongoing: 'ONGOING',
      progress: ['COMPLETE', 'COMPLETE', 'IN_PROGRESS', 'NOT_STARTED'],
      subTitle: 'What protective factors helped people stay mentally resilient during the pandemic?',
      summary: 'We’re collecting data. Keep contributing!',
      title: 'Ongoing study',
    },
    {
      date: 'some date string',
      eventType: 'STUDY',
      ongoing: 'FUTURE',
      progress: ['NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED'],
      subTitle: 'What is the impact of the pandemic on the nation\'s sleep habits and quality?',
      summary: 'Stay with us to contribute!',
      title: 'Coming soon',
    },
    {
      date: 'some date string',
      eventType: 'HIGHLIGHT',
      title: 'Help us with future discoveries',
      ongoing: 'FUTURE',
    },
    {
      date: 'some date string',
      eventType: 'HIGHLIGHT',
      title: 'Keep reporting to unlock more discoveries',
      ongoing: 'ONGOING',
    }
  ],
};
