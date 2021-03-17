import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';

import { TProgress, TTimelineEvent } from '../types';

import StudyCard from './study-card';
import TimelineNode from './timeline-node';
import TimelineCard from './timeline-card';
import Highlight from './highlight';

interface IProps {
  timelineEvents: TTimelineEvent[];
}

function Timeline({ timelineEvents }: IProps) {
  const progress: TProgress[] = ['COMPLETE', 'IN_PROGRESS', 'NOT_STARTED', 'NOT_STARTED'];
  const futureProgress: TProgress[] = ['NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED'];

  const getMappedTimelineEvent = (timelineEvent: TTimelineEvent): ReactNode => {
    switch (timelineEvent.eventType) {
      case 'COMPLETED_SCIENTIFIC_STUDY':
        return <Text>COMPLETED_SCIENTIFIC_STUDY</Text>;
      case 'PUBLISHED_SCIENTIFIC_DISCOVERY':
        return <Text>PUBLISHED_SCIENTIFIC_DISCOVERY</Text>;
      case 'SCIENTIFIC_DISCOVERY':
        return <Text>SCIENTIFIC_DISCOVERY</Text>;
      case 'SCIENTIFIC_FINDING':
        return <Text>SCIENTIFIC_FINDING</Text>;
      case 'SIGNED_UP':
        return <Text>SIGNED_UP</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {timelineEvents.map((timelineEvent, index) => {
        const key = `timeline-event-${index}`;
        return <View key={key}>{getMappedTimelineEvent(timelineEvent)}</View>;
      })}
      <TimelineNode />
      <TimelineCard />
      <StudyCard
        footerTitle="Footer title"
        progress={progress}
        studyType="ONGOING"
        subTitle="Sub title"
        title="Card title"
      />
      <TimelineNode />
      <Highlight iconName="plan" title="Highlight title" />
      <TimelineNode />
      <StudyCard
        footerTitle="Footer title"
        progress={futureProgress}
        studyType="FUTURE"
        subTitle="Sub title"
        title="Card title"
      />
      <TimelineNode />
      <TimelineNode />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  line: {
    backgroundColor: '#0165B5',
    height: '100%',
    left: 16,
    position: 'absolute',
    width: 2,
  },
});

export default Timeline;
