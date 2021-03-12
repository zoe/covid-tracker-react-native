import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '@covid/components';

function TimelineNode() {
  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <View style={styles.node} />
        <Text textClass="pSmallBold">Timeline node title</Text>
      </View>
      <Text textClass="h5Light" style={styles.body}>
        You signed up for the COVID Symptom App
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 11,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  node: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 12,
    marginRight: 12,
    width: 12,
  },
  body: {
    marginBottom: 48,
    marginLeft: 24,
    marginTop: 8,
  },
});

export default TimelineNode;
