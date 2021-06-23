import { Text } from '@covid/components';
import { TTimelineEvent } from '@covid/features/anniversary/types';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import FindingCard from './FindingCard';
import Highlight from './Highlight';
import StudyCard from './StudyCard';
import TimelineNode from './TimelineNode';

interface IProps {
  timelineEvents: TTimelineEvent[];
}

function Timeline({ timelineEvents }: IProps) {
  const { grid } = useTheme();
  const getMappedTimelineEvent = (timelineEvent: TTimelineEvent): React.ReactNode => {
    switch (timelineEvent.event_type) {
      case 'FINDING':
        return <FindingCard timelineEvent={timelineEvent} />;
      case 'HIGHLIGHT':
        return <Highlight timelineEvent={timelineEvent} />;
      case 'NODE':
        return <TimelineNode timelineEvent={timelineEvent} />;
      case 'SUMMARY_NODE':
        return <TimelineNode dateFormat="MMMM YYYY" timelineEvent={timelineEvent} />;
      case 'STUDY':
        return <StudyCard timelineEvent={timelineEvent} />;
      default:
        return null;
    }
  };
  return (
    <>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text rhythm={24} textClass="h4">
          You are making a major impact!
        </Text>
      </View>

      <View style={[styles.container, { paddingHorizontal: grid.gutter }]}>
        <View style={styles.line} />
        {timelineEvents.map((timelineEvent, index) => {
          const key = `timeline-event-${index}`;
          return <View key={key}>{getMappedTimelineEvent(timelineEvent)}</View>;
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    backgroundColor: '#0165B5',
    height: '100%',
    left: 32,
    position: 'absolute',
    top: 4,
    width: 2,
  },
});

export default Timeline;
