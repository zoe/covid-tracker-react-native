import { Text } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

function TimelineFooter() {
  const { navigate } = useNavigation();
  const label = 'Join the ZOE COVID Symptom Study App today to help science';
  return (
    <View style={styles.container}>
      <Text rhythm={32} style={styles.header} textAlign="center" textClass="p">
        Check in soon to see how your personal timeline evolves!
      </Text>
      <TouchableOpacity
        accessible
        accessibilityRole="button"
        onPress={() => {
          Analytics.track(events.ANNIVERSARY_SHARE);
          navigate('Share', { label, sharable: 'TIMELINE' });
        }}
        style={styles.button}
      >
        <Text style={{ color: 'white' }} textAlign="center" textClass="pLight">
          Share your contribution
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0165B5',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
  },
  container: {
    marginBottom: 96,
    padding: 16,
  },
  header: {
    paddingHorizontal: 40,
  },
});

export default TimelineFooter;
