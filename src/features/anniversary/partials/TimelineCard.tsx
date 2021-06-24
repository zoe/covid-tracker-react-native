import { Icon, Link, Text } from '@covid/components';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

function TimelineCard() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon iconName="star" iconSize={18} />
        <Text style={{ marginLeft: 12 }} textClass="pBold">
          Timeline card
        </Text>
      </View>
      <Text style={styles.body} textClass="h5Light">
        First to identify loss of smell & taste as a key symptom of COVID
      </Text>
      <Link linkText="More details" onPress={() => null} style={{ marginBottom: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginBottom: 24,
    marginTop: 12,
  },
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
});

export default TimelineCard;
