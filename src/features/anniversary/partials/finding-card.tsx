import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon, Link, Text } from '@covid/components';

import { TTimelineEvent } from '../types';

interface IProps {
  timelineEvent: TTimelineEvent;
}

function FindingCard({ timelineEvent }: IProps) {
  const { title, subTitle, externalLinkText } = timelineEvent;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon iconName="Lightbulb" iconSize={18} />
        <Text textClass="pBold" style={{ marginLeft: 12 }}>
          {title}
        </Text>
      </View>
      <Text textClass="h5Light" style={styles.body}>
        {subTitle}
      </Text>
      {externalLinkText && <Link linkText={externalLinkText} onPress={() => null} style={{ marginBottom: 8 }} />}
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

export default FindingCard;
