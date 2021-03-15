import React from 'react';
import { StyleSheet, View } from 'react-native';

import StudyCard from './study-card';
import TimelineNode from './timeline-node';
import TimelineCard from './timeline-card';
import { TProgress } from './progress-bar';
import Highlight from './highlight';

function Timeline() {
  const progress: TProgress[] = ['COMPLETE', 'IN_PROGRESS', 'NOT_STARTED', 'NOT_STARTED'];
  const futureProgress: TProgress[] = ['FUTURE', 'NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED'];
  return (
    <View style={styles.container}>
      <View style={styles.line} />
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
