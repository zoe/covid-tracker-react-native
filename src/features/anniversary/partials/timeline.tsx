import React from 'react';
import { StyleSheet, View } from 'react-native';

import TimelineNode from './timeline-node';
import TimelineCard from './timeline-card';

function Timeline() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <TimelineNode />
      <TimelineCard />
      <TimelineNode />
      <TimelineNode />
      <TimelineNode />
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
    backgroundColor: 'black',
    height: '100%',
    left: 16,
    position: 'absolute',
    width: 2,
  },
});

export default Timeline;
