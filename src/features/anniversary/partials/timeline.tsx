import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';

import TimelineNode from './timeline-node';

function Timeline() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <TimelineNode />
      <TimelineNode />
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
    width: 4,
  },
});

export default Timeline;
