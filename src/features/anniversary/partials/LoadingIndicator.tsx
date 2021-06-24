import { Text } from '@covid/components';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.activityIcon}>
        <ActivityIndicator color="#0165B5" size="small" />
      </View>
      <Text style={{ color: '#0165B5' }} textAlign="center" textClass="pXSmallMedium">
        {`Loading your\nTimeline`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIcon: {
    marginBottom: 8,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
});

export default LoadingIndicator;
