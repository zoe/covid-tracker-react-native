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
      eventType: 'SIGNED_UP',
      title: 'some title',
    },
    {
      date: 'some date string',
      eventType: 'SCIENTIFIC_FINDING',
      title: 'some title',
    },
    {
      date: 'some date string',
      eventType: 'SCIENTIFIC_DISCOVERY',
      title: 'some title',
    },
    {
      date: 'some date string',
      eventType: 'PUBLISHED_SCIENTIFIC_DISCOVERY',
      title: 'some title',
    },
    {
      date: 'some date string',
      eventType: 'COMPLETED_SCIENTIFIC_STUDY',
      title: 'some title',
    },
  ],
};
