import React from 'react';
import { View, StyleSheet } from 'react-native';

import { QuoteMarks } from '@assets';

function SpeechCard() {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.arrow, styles.shadow]} />
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.quotes}>
          <QuoteMarks />
        </View>
        <View />
      </View>
      <View style={styles.arrow} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    width: '100%',
  },
  quotes: {
    marginBottom: 16,
  },
  arrow: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 16,
    top: 8,
    left: 48,
    transform: [{ rotate: '45deg' }],
    width: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default SpeechCard;
