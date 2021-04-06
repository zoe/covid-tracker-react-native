import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';

function TimelineFooter() {
  const { navigate } = useNavigation();
  const label = 'Join the ZOE COVID Symptom Study App today to help science';
  return (
    <View style={styles.container}>
      <Text style={styles.header} textAlign="center" textClass="p" rhythm={32}>
        Check in soon to see how your personal timeline evolves!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Analytics.track(events.ANNIVERSARY_SHARE);
          navigate('Share', { sharable: 'TIMELINE', label });
        }}>
        <Text textClass="pLight" textAlign="center" style={{ color: 'white' }}>
          Share your contribution
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 96,
  },
  header: {
    paddingHorizontal: 40,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0165B5',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
  },
});

export default TimelineFooter;
