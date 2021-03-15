import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon, Link, Text } from '@covid/components';

function TimelineCard() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon iconName="star" iconSize={18} />
        <Text textClass="pBold" style={{ marginLeft: 12 }}>
          Timeline card
        </Text>
      </View>
      <Text textClass="h5Light" style={styles.body}>
        First to identify loss of smell & taste as a key symptom of COVID
      </Text>
      <Link linkText="More details" onPress={() => null} style={{ marginBottom: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 48,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    marginBottom: 24,
    marginTop: 12,
  },
});

export default TimelineCard;
