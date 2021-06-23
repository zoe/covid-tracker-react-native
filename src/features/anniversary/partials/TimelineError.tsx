import { Icon, Text } from '@covid/components';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

function TimelineError() {
  return (
    <View style={styles.container}>
      <Icon iconName="processed-none" iconSize={24} iconStyle={{ color: '#0165B5' }} />
      <Text style={{ color: '#0165B5' }}>Error loading Timeline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
});

export default TimelineError;
